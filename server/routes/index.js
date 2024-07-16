const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Joi = require('joi');
const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');
const { OAuth2Client } = require('google-auth-library');
const { sendOTP } = require('../services/smsService');
const router = express.Router();
const Flight = require('../models/Flight');
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const clientId = 'WKAMP1ibp0JPOF4CPoKygURpDanG3ouT';
const clientSecret = 'GwnqvBtGmDwUSSCn';
let accessToken = null;

// Middleware to enable CORS
router.use(cors());

// Middleware to parse JSON bodies
router.use(express.json());

// Function to generate OTP
function generateOTP() {
    const otpLength = 6;
    const otp = Math.floor(100000 + Math.random() * 900000).toString().substring(0, otpLength);
    return otp;
}

// Validation schema using Joi
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    mobileNumber: Joi.string().regex(/^\d{10}$/), // Mobile number should not be required here
    otp: Joi.string().length(6), // OTP can be optional depending on your flow
});

// POST /api/signup/email
router.post('/signup/email', async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists. Please login.' });
        }

        const verificationToken = uuid();
        await sendVerificationEmail(email, verificationToken);

        user = new User({
            email,
            password, // You should hash the password here
            verificationToken,
            name: email.split('@')[0],
        });

        await user.save(); // Note: The user is saved but not yet verified

        res.status(200).json({ message: 'Verification email sent!' });
    } catch (error) {
        console.error('Error signing up with email:', error);
        res.status(500).json({ message: 'Failed to sign up with email.' });
    }
});

// Verify email
router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // Generate JWT token after verification
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: jwtToken, user });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Failed to verify email.' });
    }
});

// POST /api/signup/mobile
router.post('/signup/mobile', async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        // Format mobile number to E.164 format (+countryCode + number)
        const formattedMobileNumber = `+91${mobileNumber}`;

        // Generate OTP
        const OTP = generateOTP();

        // Send OTP using Twilio 
        await sendOTP(formattedMobileNumber, OTP); // Ensure formatted number is passed

        // Save mobile number and OTP for verification
        const user = new User({
            name: 'Mobile User', // Placeholder value for name
            email: `mobile_${Date.now()}@example.com`, // Placeholder value for email
            mobileNumber: formattedMobileNumber,
            otp: OTP,
        });
        await user.save();

        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error('Error signing up with mobile:', error);
        res.status(500).json({ message: 'Failed to sign up with mobile.' });
    }
});

// POST /api/verify/mobile
router.post('/signup/mobile/verifyotp', async (req, res) => {
    const { mobileNumber, otp } = req.body;

    try {
        const user = await User.findOne({ mobileNumber, otp });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or mobile number.' });
        }

        // Optionally mark user as verified or proceed with login logic
        user.isVerified = true; // Example: Mark user as verified
        await user.save();

        // Generate JWT token after verification
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: jwtToken, user });
    } catch (error) {
        console.error('Error verifying mobile:', error);
        res.status(500).json({ message: 'Failed to verify mobile.' });
    }
});

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

// POST /api/google/token
router.post('/google/token', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const googleId = payload['sub'];

        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({
                googleId,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                isVerified: true,
            });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: jwtToken, user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).send('Token verification failed');
    }
});

// GET /api/user
router.get('/user', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

// Route to get all flight details
router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
