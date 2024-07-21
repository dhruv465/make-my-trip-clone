import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RxCrossCircled } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import BookingModal from '../../modals/BookingModal';
import UserLogIn from '../../modals/UserLogIn';

const SearchBody = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(40000);
  const [value, setValue] = useState(max);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const location = useLocation();
  // Extract cities from search params
  const params = new URLSearchParams(location.search);
  const departureCity = params.get('departureCity');
  const destinationCity = params.get('destinationCity');


  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/flights`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setFlights(data);
          filterFlights(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, [location.search]);

  const filterFlights = (flights) => {
    const params = new URLSearchParams(location.search);
    const departureCity = params.get('departureCity');
    const destinationCity = params.get('destinationCity');

    const filtered = flights.filter(flight =>
      (!departureCity || flight.departureCity === departureCity) &&
      (!destinationCity || flight.destinationCity === destinationCity) 
      
    );

    setFilteredFlights(filtered);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
    setIsValueChanged(true);
  };

  const handleSearch = () => {
    const newFilteredFlights = flights.filter(flight => flight.price <= value);
    setFilteredFlights(newFilteredFlights);
  };

  const handleClearFilter = () => {
    setFilteredFlights(flights);
    setValue(max);
    setIsValueChanged(false);
  };

  const bookNow = (flight) => {
    if (!isLoggedIn) {
      setOpenLogin(true);
    } else {
      setSelectedFlight(flight);
      setOpenBooking(true);
    }
  };

  const closeBookingModal = () => {
    setOpenBooking(false);
  };

  const handlePayNow = async () => {
    console.log('Proceeding to payment with flight:', selectedFlight);

    const loadingId = toast.loading('Processing payment...');

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bookings`,
        {
          flightId: selectedFlight._id,
          flightDetails: {
            airline: selectedFlight.airline,
            departure: selectedFlight.departure,
            arrival: selectedFlight.arrival,
            duration: selectedFlight.duration,
            price: selectedFlight.price,
            stops: selectedFlight.stops,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.message);

      setOpenBooking(false);
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const FlightCard = ({ flight }) => (
    <div className="bg-white p-4 rounded-sm shadow-md mb-4 text-sm relative">
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 p-1.5 text-xs rounded">
        {new Date(flight.departureDate).toLocaleDateString()}
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{flight.airline}</span>
        <span className="text-xs text-gray-500">{flight.duration}</span>
        <span className="font-bold">₹{flight.price.toLocaleString()}</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="text-left">
          <p className="font-bold">{flight.departure.time}</p>
          <p className="text-xs text-gray-500">{flight.departure.city}</p>
        </div>
        <div className="flex-1 px-2">
          <div className="relative">
            <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
            <div className="bg-blue-500 w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-xs text-center text-blue-500 mt-1">{flight.stops}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{flight.arrival.time} {flight.arrival.nextDay && <span className="text-xs text-red-500">+1</span>}</p>
          <p className="text-xs text-gray-500">{flight.arrival.city}</p>
        </div>
      </div>

      <div className="flex justify-end items-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs"
          onClick={() => bookNow(flight)}
        >
          Book Now
        </button>
      </div>

      <div className="bg-orange-100 text-orange-800 p-1.5 mt-2 text-xs rounded">
        Re Check-in of Baggage required
      </div>
    </div>
  );

  const headingText = departureCity && destinationCity
    ? `Flights from ${departureCity} to ${destinationCity}`
    : 'Flight Details';

  return (
    <div className="min-h-screen lg:-mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl lg:text-white font-bold mb-6">
            {headingText}

            {isValueChanged && ` within ₹${value}`}
          </h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="bg-white shadow rounded-sm overflow-hidden">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Popular Filters</h2>

                  <div className="mb-4">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={value}
                      onChange={handleChange}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-600">₹{min}</span>
                      <span className="text-sm text-gray-600">₹{max}</span>
                    </div>
                    {isValueChanged && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">₹{value}</span>
                      </div>
                    )}
                  </div>

                  {isValueChanged && (
                    <div className="flex justify-end mt-4 gap-2">
                      <button
                        onClick={handleSearch}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                      >
                        Search
                      </button>
                      <button
                        onClick={handleClearFilter}
                        className="flex justify-center items-center gap-1 bg-blue-50 text-gray-800 px-4 py-2 rounded-full text-sm"
                      >
                        <RxCrossCircled color='blue' size={20} />
                        Clear Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-4/5">
              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  {filteredFlights.length > 0 ? (
                    filteredFlights.map(flight => (
                      <FlightCard
                        key={flight._id}
                        flight={{
                          _id: flight._id,
                          airline: "Akasa Air",
                          departure: { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), city: flight.departureCity },
                          arrival: {
                            time: new Date(new Date().getTime() + Math.random() * (5 * 60 * 60 * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            city: flight.destinationCity,
                            nextDay: Math.random() > 0.5
                          },
                          duration: `${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 59) + 1}m`,
                          price: flight.price,
                          stops: "1 stop via Ahme...",
                          departureDate: flight.departureDate 
                        }}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 text-lg h-56 content-center">
                      No flights found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserLogIn open={openLogin} setOpen={setOpenLogin} closeModal={() => setOpenLogin(false)} onSuccessLogin={() => setIsLoggedIn(true)} />
      <BookingModal open={openBooking} flightDetails={selectedFlight} closeModal={closeBookingModal} onPayNow={handlePayNow} />
    </div>
  );
};

export default SearchBody;
