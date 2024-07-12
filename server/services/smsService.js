require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio');
const client = twilio(accountSid, authToken);

async function sendOTP(mobileNumber, otp) {
    try {
        const message = await client.messages.create({
            body: `Your OTP for verification is: ${otp}`,
            to: `+${mobileNumber}`,
            from: '+15734982140' // Replace with your Twilio phone number
        });

        console.log(`OTP sent successfully to ${mobileNumber}`);
        return message;
    } catch (error) {
        console.error(`Error sending OTP to ${mobileNumber}:`, error);
        throw new Error('Failed to send OTP');
    }
}

module.exports = { sendOTP };
