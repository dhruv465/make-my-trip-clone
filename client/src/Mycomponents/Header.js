import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import logo from '../assets/makemytrip.png';
import { FaUser } from 'react-icons/fa';
import UserLogIn from '../modals/UserLogIn';
import LogoutModal from '../modals/LogoutModal';
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const handleLoginSuccess = () => {
            fetchUserData();
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);

        return () => {
            window.removeEventListener('loginSuccess', handleLoginSuccess);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        setLogoutOpen(false);
    };

    const getTwoLetterName = (name) => {
        if (!name) return '';
        const [firstName, lastName] = name.split(' ');
        return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
    };

    return (
        <div className="overflow-hidden">
            <Disclosure as="nav" className="bg-white shadow-lg">
                {({ open: menuOpen }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {menuOpen ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className="flex flex-1 items-center lg:justify-between justify-center sm:items-stretch sm:justify-between">
                                    <div className="flex items-center cursor-pointer">
                                        <img className="h-10 w-auto" src={logo} alt="Make My Trip" />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {user ? (
                                                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLogoutOpen(true)}>
                                                    <div className="h-8 w-8 mr-2 rounded-full bg-green-300 flex justify-center items-center">
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
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-black text-md leading-tight">
                                                            {user.name}
                                                        </span>
                                                    </div>
                                                    <div className="">
                                                        <FaAngleDown />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <div className="h-8 w-8 mr-2 rounded-full bg-green-300 flex justify-center items-center">
                                                        <FaUser size={20} />
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <button
                                                            className="text-black text-xs leading-tight"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            Login or
                                                            <br />
                                                            Create Account
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                <div className="bg-blue-50 p-3 rounded-md m-2 flex items-center space-x-2 cursor-pointer">
                                    {user ? (
                                        <div className="flex items-center space-x-2" onClick={() => setLogoutOpen(true)}>
                                            <div className="h-8 w-8 mr-2 rounded-full bg-green-300 flex justify-center items-center">
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
                                            <div className="flex flex-col items-center">
                                                <span className="text-black text-md leading-tight">
                                                    {user.name}
                                                </span>
                                            </div>
                                            <div className="absolute flex right-7" onClick={() => setLogoutOpen(true)}>
                                                <FaAngleDown />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <div className="h-8 w-8 mr-2 rounded-full bg-green-300 flex justify-center items-center">
                                                <FaUser size={20} />
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <button
                                                    className="text-black text-xs leading-tight"
                                                    onClick={() => setOpen(true)}
                                                >
                                                    Login or
                                                    <br />
                                                    Create Account
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DisclosurePanel>
                        <UserLogIn open={open} setOpen={setOpen} />
                        <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} handleLogout={handleLogout} />
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default Header;
