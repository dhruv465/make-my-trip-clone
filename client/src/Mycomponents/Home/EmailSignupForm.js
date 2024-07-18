import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const EmailSignupForm = ({ onClose }) => {
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

                // Emit custom event for successful login
                const loginEvent = new CustomEvent('loginSuccess', { detail: data.user });
                window.dispatchEvent(loginEvent);

                console.log('Token successfully sent to backend and JWT received');

                // Close the login modal
                onClose();

                setTimeout(() => {
                    window.location.reload();
                }, 500); // 500ms delay to allow the modal to close smoothly


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Proceed with your API call to login the user
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const jwtToken = data.token;

                localStorage.setItem('jwtToken', jwtToken);
                toast.success('User successfully logged in!');

                // Emit custom event for successful login
                const loginEvent = new CustomEvent('loginSuccess', { detail: data.user });
                window.dispatchEvent(loginEvent);

                console.log('Token successfully sent to backend and JWT received');

                // Close the login modal
                onClose();

                setTimeout(() => {
                    window.location.reload();
                }, 500); // 500ms delay to allow the modal to close smoothly

            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Failed to log in. Please try again.');
        }
    };



    return (
        <div className="max-w-md mx-auto mt-2">
            <h2 className="text-2xl font-bold mb-6">Log in</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your registered email id"
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Continue
                </button>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or register yourself with
                        </span>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
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
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
                By proceeding, you agree to MakeMyTrip's Terms and Privacy
            </p>
        </div>
    );
};

export default EmailSignupForm;
