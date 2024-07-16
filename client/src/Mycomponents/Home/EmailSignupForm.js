    import React, { useState } from 'react';
    import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
    import toast from 'react-hot-toast';

    const EmailSignupForm = ({ onSwitchToMobile }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

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

        const handleEmailSubmit = async (event) => {
            event.preventDefault();

            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const response = await fetch(`${backendUrl}/api/signup/email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    toast.success('Verification email sent! Please check your inbox.');
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Failed to send verification email.');
                }
            } catch (error) {
                console.error('Error signing up with email:', error);
                toast.error('Failed to sign up with email.');
            }
        };

        return (
            <div className="max-w-md mx-auto mt-8">
                <form onSubmit={handleEmailSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-medium mt-2">
                        CONTINUE
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a onClick={onSwitchToMobile} href="#" className="text-blue-500 text-sm font-medium cursor-pointer">
                        Login/Signup with Mobile
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
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
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
                    By proceeding, you agree to MakeMyTrip's{' '}
                    <a href="/" className="text-blue-500">Privacy Policy</a>
                    ,{' '}
                    <a href="/" className="text-blue-500">User Agreement</a>{' '}
                    and{' '}
                    <a href="/" className="text-blue-500">T&Cs</a>
                </p>
            </div>
        );
    };

    export default EmailSignupForm;
