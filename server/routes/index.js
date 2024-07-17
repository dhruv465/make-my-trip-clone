const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Joi = require('joi');
const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const Flight = require('../models/Flight');
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const Booking = require('../models/Booking'); // Import Booking model

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
                console.error('JWT verification error:', err);
                return res.sendStatus(403); // Forbidden
            }

            req.user = user;
            next();
        });
    } else {
        console.error('Authorization header missing');
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

// POST /api/flights
router.get('/flights', async (req, res) => {
    const { departureCity, destinationCity, departureDate, returnDate } = req.query;

    try {
        let query = {
            departureCity: { $regex: new RegExp(departureCity, 'i') },
            destinationCity: { $regex: new RegExp(destinationCity, 'i') }
        };

        // Parse dates into Date objects
        const parsedDepartureDate = departureDate ? new Date(departureDate) : null;
        const parsedReturnDate = returnDate ? new Date(returnDate) : null;

        if (parsedDepartureDate) {
            // Adjust parsedDepartureDate to start of day (00:00:00) in UTC to avoid timezone discrepancies
            parsedDepartureDate.setUTCHours(0, 0, 0, 0);
            query.departureDate = { $gte: parsedDepartureDate };
        }

        if (parsedReturnDate) {
            // Adjust parsedReturnDate to end of day (23:59:59) in UTC to avoid timezone discrepancies
            parsedReturnDate.setUTCHours(23, 59, 59, 999);
            query.returnDate = { $lte: parsedReturnDate };
        }

        const flights = await Flight.find(query);

        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Failed to fetch flights' });
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


// POST /api/bookings 
router.post('/bookings', authenticateJWT, async (req, res) => {
    const { userId } = req.user; // Extract userId from authenticated request
    const { flightId, flightDetails } = req.body;

    try {
        const booking = new Booking({
            userId: userId,
            flightId: flightId,
            flightDetails: flightDetails,
        });

        await booking.save();
        res.status(201).json({ message: 'Your flight booked successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});

// GET /api/bookings - Fetch bookings for authenticated user
router.get('/bookings', authenticateJWT, async (req, res) => {
    const { userId } = req.user;

    try {
        const bookings = await Booking.find({ userId }).populate('flightId');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
});



module.exports = router;
