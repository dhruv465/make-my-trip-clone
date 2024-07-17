import React from 'react';

const UserProfileCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 flex justify-between items-center">
        <h2 className="text-white font-bold text-lg">PERSONAL PROFILE</h2>
        <div className="bg-white rounded-full p-2">
          <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {['Profile', 'Login Details', 'Save Travellers', 'Logged In Devices', 'Logout'].map((item, index) => (
          <a key={index} href="#" className="flex items-center px-6 py-3 hover:bg-gray-50">
            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span className="text-gray-700">{item}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserProfileCard;