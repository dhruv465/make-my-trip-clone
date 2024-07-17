import React from 'react';
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast'; // Import toast for notifications

const BookingModal = ({ open, flightDetails, closeModal, onPayNow }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
          <IoClose size={25} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Complete your booking</h2>
        <div className="mb-4">
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Airline:</strong> {flightDetails.airline}</p>
            <p><strong>Departure:</strong> {flightDetails.departure.time} from {flightDetails.departure.city}</p>
            <p><strong>Arrival:</strong> {flightDetails.arrival.time} in {flightDetails.arrival.city}</p>
            <p><strong>Duration:</strong> {flightDetails.duration}</p>
            <p><strong>Price:</strong> ₹{flightDetails.price}</p>
            <p><strong>Stops:</strong> {flightDetails.stops}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={onPayNow}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
