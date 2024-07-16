import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast'; // Import react-hot-toast

const MobileSignupForm = ({ onSwitchToEmail }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleGoogleLoginSuccess = async (response) => {
        console.log('Google Login Success:', response);
        setIsLoggedIn(true);
        toast.success('Successfully logged in with Google!');

        const token = response.credential;

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/google/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                const data = await response.json();
                const jwtToken = data.token;

                localStorage.setItem('jwtToken', jwtToken);
                console.log('Token successfully sent to backend and JWT received');
            } else {
                console.error('Failed to send token to backend');
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google Login Failed:', error);
    };

    const handleMobileSubmit = async (event) => {
        event.preventDefault();

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/signup/mobile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber }),
            });

            if (response.ok) {
                toast.success('OTP sent successfully!'); // Replace with actual success message handling
                setIsOtpSent(true);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Failed to send OTP.');
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/signup/mobile/verifyotp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber, otp }),
            });
    
            if (response.ok) {
                const data = await response.json();
                const jwtToken = data.token;
    
                // Store JWT token in localStorage or cookies
                localStorage.setItem('jwtToken', jwtToken);
    
                toast.success('Logged in successfully with mobile number!');
                setIsLoggedIn(true);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to verify OTP.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify OTP.');
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-8">
            {!isOtpSent ? (
                <form onSubmit={handleMobileSubmit}>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <div className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300">
                                <img src="https://flagcdn.com/w20/in.png" alt="India flag" className="w-5 h-3 mr-2" />
                                <span className="text-gray-500">+91</span>
                                <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            <input
                                type="tel"
                                id="mobile"
                                className="flex-grow px-3 py-2 focus:outline-none"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-medium mt-2">
                        SEND OTP
                    </button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-medium mt-2">
                        VERIFY OTP
                    </button>
                </form>
            )}

            <div className="text-center mt-4">
                <a onClick={onSwitchToEmail} href="#" className="text-blue-500 text-sm font-medium cursor-pointer">
                    Login/Signup with Email
                </a>
            </div>

            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">Or Login/Signup With</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'} // Adjust as needed
                        isSignedIn={true} // Keep user signed in after authentication
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="p-2 border border-gray-300 rounded-full"
                            >
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                            </button>
                        )}
                    />
                </GoogleOAuthProvider>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
                By proceeding, you agree to MakeMyTrip's <a href="/" className="text-blue-500">Privacy Policy</a>, <a href="/" className="text-blue-500">User Agreement</a> and <a href="/" className="text-blue-500">T&Cs</a>
            </p>
        </div>
    );
};

export default MobileSignupForm;
