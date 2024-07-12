const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Port for TLS (587) or SSL (465)
    secure: false, // Set to true if using SSL
    auth: {
        user: process.env.EMAIL_USERNAME, // Your Gmail email address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail password
    },
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${process.env.REACT_APP_FRONTEND_URL}/verify/${verificationToken}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error; // Propagate the error up to handle it in the route or controller
    }
};

module.exports = {
    sendVerificationEmail,
};
