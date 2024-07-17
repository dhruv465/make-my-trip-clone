const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/connectDB'); // Assuming your database connection function
const router = require('./routes/index'); // Import your routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize OAuth2Client
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);


// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this matches your React frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Default route
app.get('/', (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});

// Endpoint to handle Google OAuth token
app.use('/api', router); // Mount all routes under /api


// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});
