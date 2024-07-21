import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Header from '../Mycomponents/Home/Header';
import Details from '../Mycomponents/Dashboard/Details';
import UserProfileCard from '../Mycomponents/Dashboard/UserProfileCard';

const Dashboard = () => {



  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Check if user is logged in based on token presence in localStorage
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    // If user is not logged in, redirect to main page
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]); // Include navigate function in dependencies to avoid missing updates

  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing localStorage, etc.
    localStorage.removeItem('jwtToken');
    navigate('/'); // Navigate to main page upon logout
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8">
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <UserProfileCard />
          </div>
          <div className="w-full lg:w-1/2">
            <Details />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
