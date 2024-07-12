import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';  // Updated to point to your backend server

export const searchFlights = async (departureCity, destinationCity, departureDate, returnDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/flights`, {
      params: {
        originLocationCode: departureCity,
        destinationLocationCode: destinationCity,
        departureDate: departureDate.toISOString().split('T')[0],
        returnDate: returnDate ? returnDate.toISOString().split('T')[0] : null,
        adults: 1,
        travelClass: 'ECONOMY',
        nonStop: false,
        max: 5
      },
      headers: {
        // No need to pass Authorization header here, as proxy server (backend) handles it
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
