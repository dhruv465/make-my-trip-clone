import React, { useEffect, useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";

const SearchBody = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(40000); // Assuming 10000 as the maximum price for example
  const [value, setValue] = useState(max);
  const [isValueChanged, setIsValueChanged] = useState(false);

  const filters = [
    { label: "Hide Nearby Airports", price: "₹ 6,317" },
    { label: "Refundable Fares", price: "₹ 12,996" },
    { label: "Air India", price: "₹ 16,040", icon: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png?v=19" },
    { label: "Afternoon Departure", price: "₹ 12,289" },
  ];

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/flights`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setFlights(data);
          setFilteredFlights(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
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
    setFilteredFlights(flights); // Reset filtered flights to all flights
    setValue(max); // Reset slider value to maximum
    setIsValueChanged(false); // Reset value changed flag
  };

  const FlightCard = ({ _id, airline, departure, arrival, duration, price, stops, button }) => (
    <div className="bg-white p-4 rounded-sm shadow-md mb-4 text-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{airline}</span>
        <span className="text-xs text-gray-500">{duration}</span>
        <span className="font-bold">₹{price}</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="text-left">
          <p className="font-bold">{departure.time}</p>
          <p className="text-xs text-gray-500">{departure.city}</p>
        </div>
        <div className="flex-1 px-2">
          <div className="relative">
            <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
            <div className="bg-blue-500 w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-xs text-center text-blue-500 mt-1">{stops}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{arrival.time} {arrival.nextDay && <span className="text-xs text-red-500">+1</span>}</p>
          <p className="text-xs text-gray-500">{arrival.city}</p>
        </div>
      </div>

      <div className="flex justify-end items-center">
        {button}
      </div>

      <div className="bg-orange-100 text-orange-800 p-1.5 mt-2 text-xs rounded">
        Re Check-in of Baggage required
      </div>
    </div>
  );

  const bookNow = (id) => {
    console.log(`Booking flight with ID: ${id}`);
    // Add logic to handle booking
  };

  return (
    <div className="min-h-screen lg:-mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl lg:text-white font-bold mb-6">
            Flights from Pune to Mumbai, and back
            {isValueChanged && ` within ₹${value}`}
          </h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="bg-white shadow rounded-sm overflow-hidden">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Popular Filters</h2>
                  <div className="space-y-2">
                    {filters.map((filter, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                          <span className="ml-2 text-sm text-gray-700">
                            {filter.icon && (
                              <img src={filter.icon} alt="" className="inline-block w-4 h-4 mr-2" />
                            )}
                            {filter.label}
                          </span>
                        </label>
                        <span className="text-sm text-gray-600">{filter.price}</span>
                      </div>
                    ))}
                    <p className="text-sm text-blue-600 cursor-pointer">+ 4 more</p>
                  </div>

                  <h2 className="text-lg font-semibold mt-6 mb-4">Price Range</h2>
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
                      <RxCrossCircled 
                      color='blue'
                      size={20}
                      />
                        Clear Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-4/5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  {filteredFlights.map(flight => (
                    <FlightCard
                      key={flight._id}
                      _id={flight._id}
                      airline="Akasa Air" // or any logic to determine the airline
                      departure={{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), city: flight.departureCity }}
                      arrival={{
                        time: new Date(new Date().getTime() + Math.random() * (5 * 60 * 60 * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        city: flight.destinationCity
                      }}
                      duration={`${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 59) + 1}m`}
                      price={flight.price.toLocaleString()}
                      stops="1 stop via Ahme..."
                      button={
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() => bookNow(flight._id)}
                        >
                          Book Now
                        </button>
                      }
                    />
                  ))}
                </div>
                <div className="p-4">
                  <h2 className="text-base font-semibold mb-2 bg-white p-4 rounded-sm shadow">Mumbai → Pune Thu, 18 Jul</h2>
                  <FlightCard
                    airline="Akasa Air, IndiGo"
                    departure={{ time: "21:25", city: "Mumbai" }}
                    arrival={{ time: "04:05", city: "Pune", nextDay: true }}
                    duration="06h 40m"
                    price="5,012"
                    stops="1 stop via Ahme..."
                    button={
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => bookNow("1")} // Example ID
                      >
                        Book Now
                      </button>
                    }
                  />
                  <FlightCard
                    airline="IndiGo"
                    departure={{ time: "21:25", city: "Mumbai" }}
                    arrival={{ time: "04:05", city: "Pune", nextDay: true }}
                    duration="06h 40m"
                    price="5,494"
                    stops="1 stop via Ahme..."
                    button={
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => bookNow("2")} // Example ID
                      >
                        Book Now
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBody;
