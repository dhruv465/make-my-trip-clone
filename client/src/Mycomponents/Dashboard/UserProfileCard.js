import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileCard = () => {
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [user, setUser] = useState(null);

    const getTwoLetterName = (name) => {
        if (!name) return '';
        const [firstName, lastName] = name.split(' ');
        return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            if (!jwtToken) {
                console.error('JWT token not found in localStorage');
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {user ? (
                <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 flex justify-between items-center">
                    <h2 className="text-white font-bold text-lg">{user.name}</h2>
                    {user.picture ? (
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 flex items-center justify-center bg-green-300 rounded-full text-white">
                            {getTwoLetterName(user.name)}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 flex justify-between items-center">
                    <h2 className="text-white font-bold text-lg">PERSONAL PROFILE</h2>
                    <div className="bg-white rounded-full p-2">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                </div>
            )}

            <div className="mt-auto pt-4 ">
                <button className="px-6 py-2 text-sm text-white bg-red-600 m-2 rounded-full drop-shadow-md float-right">
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default UserProfileCard;
