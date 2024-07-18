import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/makemytrip.png';
import { FaUser } from 'react-icons/fa';
import UserLogIn from '../../modals/UserLogIn';
import LogoutModal from '../../modals/LogoutModal';
import { FaAngleDown } from "react-icons/fa";
import { MdFlightTakeoff, MdSpaceDashboard } from 'react-icons/md';
import { LiaHotelSolid } from 'react-icons/lia';
import { useLocation, useNavigate } from 'react-router-dom'; 

const Header = () => {
    const [open, setOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showIcons, setShowIcons] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook

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
        const handleLoginSuccess = (event) => {
            setUser(event.detail);
            setOpen(false); // Close the modal on login success
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);

        return () => {
            window.removeEventListener('loginSuccess', handleLoginSuccess);
        };
    }, []);

    useEffect(() => {
        fetchUserData();

        // Check if it's the main page (home page)
        const isMainPage = location.pathname === '/'; // Adjust the condition based on your routing setup

        // Only add scroll listener if it's the main page
        if (isMainPage) {
            window.addEventListener('scroll', handleScroll);
            // Initial check in case initial position needs icons to be shown
            handleScroll();
        } else {
            // Set showIcons to true for other pages
            setShowIcons(true);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]); // Update effect when location.pathname changes

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

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;

        if (scrollPosition > scrollThreshold) {
            setShowIcons(true);
        } else {
            setShowIcons(false);
        }
    };

    const navigateToMainPage = () => {
        navigate('/');
    };

    const handleFlightsClick = () => {
        navigateToMainPage();
    };

    const handleHotelsClick = () => {
        navigateToMainPage();
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-lg">
            <Disclosure as="nav">
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
                                    <div className="flex items-center cursor-pointer gap-8">
                                        <img className="h-10 w-auto" src={logo} alt="Make My Trip" />

                                        <div className={`hidden sm:ml-6 sm:block transition-opacity ${showIcons ? 'opacity-100' : 'opacity-0'}`}>
                                            {showIcons && (
                                                <div className="flex space-x-4">
                                                    <div onClick={handleFlightsClick} className="flex flex-col items-center text-blue-500 pr-3 cursor-pointer">
                                                        <MdFlightTakeoff size={25} />
                                                        <span className="mt-1 text-sm">Flights</span>
                                                    </div>
                                                    <div onClick={handleHotelsClick} className="flex flex-col items-center pr-3 cursor-pointer">
                                                        <LiaHotelSolid size={25} />
                                                        <span className="mt-1 text-sm">Hotels</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {user ? (
                                                <div className="flex justify-between items-center space-x-4">
                                                    <div className="flex items-center space-x-2 cursor-pointer bg-blue-50 rounded-full py-2 px-4 shadow-md text-blue-500" onClick={handleDashboardClick}>
                                                        <MdSpaceDashboard size={25} />
                                                        <span className="text-black text-xs leading-tight">Dashboard</span>
                                                    </div>
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
                                <div onClick={handleFlightsClick} className="flex gap-3  rounded-md px-3 py-2 text-base font-medium cursor-pointer">
                                    <MdFlightTakeoff size={25} />
                                    <span className="mt-1 text-sm">Flights</span>
                                </div>
                                <div onClick={handleHotelsClick} className="flex gap-3  rounded-md px-3 py-2 text-base font-medium cursor-pointer">
                                    <LiaHotelSolid size={25} />
                                    <span className="mt-1 text-sm">Hotels</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-md m-2 flex items-center space-x-2 cursor-pointer">
                                    {user ? (
                                        <div className="sm:block justify-between items-center space-y-4">
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
                                            <div className="flex items-center space-x-2" onClick={handleDashboardClick}>
                                                <MdSpaceDashboard size={25} />
                                                <div className="flex flex-col items-center">
                                                    <span className="text-black text-md leading-tight">Dashboard</span>
                                                </div>
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
                        <UserLogIn open={open} setOpen={setOpen} onClose={() => setOpen(false)} />
                        <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} handleLogout={handleLogout} />
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default Header;
