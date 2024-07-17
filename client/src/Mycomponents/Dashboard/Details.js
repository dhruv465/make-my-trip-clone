import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Details = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing localStorage, etc.
    localStorage.removeItem('jwtToken');
    setBookings([]); // Clear bookings state upon logout
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="flex items-center gap-1 text-2xl font-semibold mb-4">
        <span>
          <svg width="20px" height="20px" viewBox="0 0 24 24" id="_24x24_On_Light_Recent" data-name="24x24/On Light/Recent" xmlns="http://www.w3.org/2000/svg">
            <rect id="view-box" width="24" height="24" fill="none" />
            <path id="Shape" d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)" fill="#141124" />
          </svg>
        </span>
        Booking history
      </h2>
      {bookings.length === 0 ? (
        <p>Login to see recent books</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-gray-100 p-4 rounded-md mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">
                Your recent flight from {booking.flightDetails.departure.city} to {booking.flightDetails.arrival.city}
              </h3>
              <div className="text-sm text-gray-500 mb-2">{formatDate(booking.bookingDate)}</div>
            </div>
            <div className="mt-2">
              <div className="flex flex-wrap items-center">
                <div className="w-full sm:w-1/2">
                  <p className="mt-1">
                    <strong>Departure:</strong> {booking.flightDetails.departure.city} at {booking.flightDetails.departure.time}
                  </p>
                </div>
                <div className="w-full sm:w-1/2">
                  <p className="mt-1">
                    <strong>Arrival:</strong> {booking.flightDetails.arrival.city} at {booking.flightDetails.arrival.time}
                  </p>
                </div>
              </div>
              <p className="mt-2">
                <strong>Price:</strong> ${booking.flightDetails.price}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Details;
