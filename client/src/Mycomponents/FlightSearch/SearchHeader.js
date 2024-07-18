import React from 'react';
import Header from '../Home/Header';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Extract parameters from URL
  const departureCity = params.get('departureCity') || '';
  const destinationCity = params.get('destinationCity') || '';
  const departureDate = params.get('departureDate') ? new Date(params.get('departureDate')) : null;
  const returnDate = params.get('returnDate') ? new Date(params.get('returnDate')) : null;
  const selectedFare = params.get('selectedFare') || '';

  // For demonstration purposes
  console.log('Parameters:', {
    departureCity,
    destinationCity,
    departureDate,
    returnDate,
    selectedFare,
  });

  return (
    <>
      <Header />
      <div className="flex justify-center bg-gray-900 lg:h-56">
        <div className="w-full max-w-6xl mt-4 px-4 lg:px-0">
          <div className="p-4 rounded-lg shadow-lg">
            {/* Trip Details Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="w-full lg:w-auto">
                <label htmlFor="fromCity" className="block text-blue-400 text-xs font-bold mb-1">
                  FROM
                </label>
                <input id="fromCity" className="bg-gray-700 text-white px-4 py-2 rounded-md w-full" type="text" value={departureCity} readOnly />
              </div>
              <div className="w-full lg:w-auto">
                <label htmlFor="toCity" className="block text-blue-400 text-xs font-bold mb-1">
                  TO
                </label>
                <input id="toCity" className="bg-gray-700 text-white px-4 py-2 rounded-md w-full" type="text" value={destinationCity} readOnly />
              </div>
              <div className="w-full lg:w-auto">
                <label htmlFor="departure" className="block text-blue-400 text-xs font-bold mb-1">
                  DEPART
                </label>
                <input id="departure" className="bg-gray-700 text-white px-4 py-2 rounded-md w-full" type="text" value={departureDate ? departureDate.toDateString() : ''} readOnly />
              </div>
              <div className="w-full lg:w-auto">
                <label htmlFor="return" className="block text-blue-400 text-xs font-bold mb-1">
                  RETURN
                </label>
                <input id="return" className="bg-gray-700 text-white px-4 py-2 rounded-md w-full" type="text" value={returnDate ? returnDate.toDateString() : ''} readOnly />
              </div>
              <div className="w-full lg:w-auto">
                <label htmlFor="travellerAndClass" className="block text-blue-400 text-xs font-bold mb-1">
                  PASSENGERS & CLASS
                </label>
                <input id="travellerAndClass" className="bg-gray-700 text-white px-4 py-2 rounded-md w-full" type="text" value={`Total Travelers, ${selectedFare}`} readOnly />
              </div>
              <button className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full lg:w-auto lg:mt-6" disabled>
                SEARCH
              </button>
            </div>
            {/* Fare Type Section */}
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
              <span className="text-gray-400 text-sm">Fare Type:</span>
              <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-0 lg:space-x-4">
                {['Regular', 'Student', 'Senior Citizen', 'Armed Forces', 'Doctor and Nurses'].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="fareType"
                      value={option}
                      className="form-radio text-blue-500"
                      checked={option === selectedFare}
                      readOnly
                    />
                    <span className="text-white text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Flights, error, and loading sections remain unchanged */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
