import React, { useState } from 'react';
import { MdFlightTakeoff } from 'react-icons/md';
import { LiaHotelSolid, LiaTrainSolid, LiaBusSolid, LiaCarSolid } from 'react-icons/lia';
import { MdMapsHomeWork } from 'react-icons/md';
import { TbBeach } from 'react-icons/tb';
import { CiMedicalClipboard } from 'react-icons/ci';
import { RiCurrencyLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function SearchForm() {
  const [selectedFare, setSelectedFare] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('Economy/Premium Economy');
  const [infantError, setInfantError] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [flights, setFlights] = useState([]);

  const handleFareSelection = (index) => {
    setSelectedFare(index);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const applySelections = () => {
    if (infants > adults) {
      setInfantError('Infants should not exceed the number of adults.');
      return;
    }
    setIsModalOpen(false);
  };

  const handleInfantSelection = (count) => {
    if (count > adults) {
      setInfantError('Infants should not exceed the number of adults.');
    } else {
      setInfantError('');
      setInfants(count);
    }
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    setReturnDate(date); // Adjust return date automatically to departure date
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/flights', {
        params: {
          originLocationCode: departureCity,
          destinationLocationCode: destinationCity,
          departureDate: departureDate.toISOString().split('T')[0],
          returnDate: returnDate ? returnDate.toISOString().split('T')[0] : undefined,
          adults,
          children,
          infants,
          travelClass: travelClass.replace('/', '_').toUpperCase(),
        }
      });
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  return (
    <div className="mx-auto lg:py-32 sm:py-14 py-14">
      <div className="lg:p-6 p-4">
        <form onSubmit={handleSearch}>
          <div className="container shadow-lg mx-auto bg-white py-11 rounded-md max-w-7xl px-6 lg:px-8 sm:block">
            <div className="text-center bg-white shadow-lg -mt-20 p-3 mb-3 rounded-md sm:block">
              <div className="flex space-x-16 items-center">
                <a href="#flights" title="Flights" className="flex flex-col items-center text-blue-500 pr-3">
                  <MdFlightTakeoff size={25} />
                  <span className="mt-1 text-sm">Flights</span>
                </a>
                <a href="#hotels" title="Hotels" className="flex flex-col items-center pr-3">
                  <LiaHotelSolid size={25} />
                  <span className="mt-1 text-sm">Hotels</span>
                </a>
                <a href="#homestays" title="Homestays & Villas" className="flex flex-col items-center pr-3">
                  <MdMapsHomeWork size={25} />
                  <span className="mt-1 text-sm">Homestays & Villas</span>
                </a>
                <a href="#holiday-packages" title="Holiday Packages" className="flex flex-col items-center pr-3">
                  <TbBeach size={25} />
                  <span className="mt-1 text-sm">Holiday Packages</span>
                </a>
                <a href="#trains" title="Trains" className="flex flex-col items-center pr-3">
                  <LiaTrainSolid size={25} />
                  <span className="mt-1 text-sm">Trains</span>
                </a>
                <a href="#buses" title="Buses" className="flex flex-col items-center pr-3">
                  <LiaBusSolid size={25} />
                  <span className="mt-1 text-sm">Buses</span>
                </a>
                <a href="#cabs" title="Cabs" className="flex flex-col items-center pr-3">
                  <LiaCarSolid size={25} />
                  <span className="mt-1 text-sm">Cabs</span>
                </a>
                <a href="#forex" title="Forex Card & Currency" className="flex flex-col items-center">
                  <RiCurrencyLine size={25} />
                  <span className="mt-1 text-sm">Forex Card & Currency</span>
                </a>
                <a href="#travel-insurance" title="Travel Insurance" className="flex flex-col items-center pr-20">
                  <CiMedicalClipboard size={25} />
                  <span className="mt-1 text-sm">Travel Insurance</span>
                </a>
              </div>
            </div>

            <div className="mb-4 cursor-pointer flex flex-wrap">
              <label className="inline-flex items-center cursor-pointer ">
                <input type="radio" className="form-radio peer" name="tripType" value="oneWay" />
                <span className="ml-2 peer-checked:bg-blue-50 peer-checked:font-bold peer-checked:text-black px-2 py-1 text-xs rounded-full">One Way</span>
              </label>
              <label className="inline-flex items-center ml-6 cursor-pointer">
                <input type="radio" className="form-radio peer" name="tripType" value="roundTrip" />
                <span className="ml-2 peer-checked:bg-blue-50 peer-checked:font-bold peer-checked:text-black px-2 py-1 text-sm rounded-full">Round Trip</span>
              </label>
              <label className="inline-flex items-center ml-6 cursor-pointer">
                <input type="radio" className="form-radio peer" name="tripType" value="multiCity" />
                <span className="ml-2 peer-checked:bg-blue-50 peer-checked:font-bold peer-checked:text-black px-2 py-1 text-sm rounded-full">Multi City</span>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-5 border-lack rounded-md p-2 cursor-pointer ">
              {/* From Section */}
              <div className="flex flex-col items-start lg:border-r md: ">
                <div className="text-gray-500">From</div>
                <div className="text-xl font-bold">
                  <input
                    type="text"
                    placeholder="Enter City or Airport"
                    className="border-none focus:outline-none right-2  w-48 text-ellipsis line-clamp-1"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-500 "></div>
              </div>

              {/* To Section */}
              <div className="flex flex-col items-start lg:border-r  ml-4">
                <div className="text-gray-500">To</div>
                <div className="text-xl font-bold">
                  <input
                    type="text"
                    placeholder="Enter City or Airport"
                    className="border-none focus:outline-none right-2 w-48 text-ellipsis line-clamp-1"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-500 "></div>
              </div>

              {/* Departure Section */}
              <div className="flex flex-col items-start lg:border-r">
                <div className="text-gray-500">Departure <span className="absolute text-blue-500 justify-center items-center"><IoIosArrowDown /></span></div>
                <div className="text-xl font-bold">
                  <DatePicker
                    selected={departureDate}
                    onChange={handleDepartureDateChange}
                    className="border-none w-52 focus:outline-none right-2"
                  />
                </div>
                <div className="text-sm text-gray-500">Select a date</div>
              </div>

              {/* Return Section */}
              <div className="flex flex-col items-start lg:border-r">
                <div className="text-gray-500">Return<span className="absolute text-blue-500 justify-center items-center"><IoIosArrowDown /></span></div>
                <div className="text-xl font-bold">
                  <DatePicker
                    selected={returnDate}
                    onChange={handleReturnDateChange}
                    className="border-none focus:outline-none w-52 right-2"
                    minDate={new Date(departureDate.getTime() + 24 * 60 * 60 * 1000)}
                  />
                </div>
                <div className="text-sm text-gray-500">Select a return date</div>
              </div>

              {/* Travelers & Class Section */}
              <div className="flex flex-col items-start" onClick={toggleModal}>
                <div className="text-gray-500">Travelers & Class <span className="absolute text-blue-500 justify-center items-center"><IoIosArrowDown /></span></div>
                <div className="text-2xl font-bold">{adults + children + infants} Travelers</div>
                <div className="text-sm text-gray-500">{travelClass}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 p-2 cursor-pointer">
              <div className="m-3">
                <h2 className="font-semibold flex items-center mt-2 text-sm">Select a special fare</h2>
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-md mb-3">
                  EXTRA SAVINGS
                </span>
              </div>

              {/* Special Fares Selection */}
              {['Regular', 'Student', 'Senior Citizen', 'Doctor and Nurses'].map((fare, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-center border rounded-md pl-4 pr-4 h-12 mt-4 ml-2 cursor-pointer ${selectedFare === index + 1 ? 'bg-blue-50' : ''
                    }`}
                  onClick={() => handleFareSelection(index + 1)}
                >
                  <input
                    type="radio"
                    className="form-radio"
                    name="fare"
                    checked={selectedFare === index + 1}
                    onChange={() => handleFareSelection(index + 1)}
                  />
                  <div>
                    <div className="text-sm font-semibold">{fare}</div>
                    <div className="text-xs text-gray-500">{fare === 'Regular' ? 'Regular fares' : `up to ${fare === 'Senior Citizen' ? '6000' : '600'} off`}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 flex items-center justify-center">
              <button type="submit" className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full lg:w-1/12">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal for Travelers & Class Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">ADULTS (12y+)</label>
              <div className="flex">
                {[...Array(10).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => setAdults(i + 1)}
                    className={`px-3 py-1 border-r border-t border-b last:border-r-0 first:rounded-l last:rounded-r ${adults === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">CHILDREN (2y - 12y)</label>
              <div className="flex">
                {[...Array(7).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => setChildren(i)}
                    className={`px-3 py-1 border-r border-t border-b last:border-r-0 first:rounded-l last:rounded-r ${children === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                      }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">INFANTS (below 2y)</label>
              <div className="flex">
                {[...Array(7).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => handleInfantSelection(i)}
                    className={`px-3 py-1 border-r border-t border-b last:border-r-0 first:rounded-l last:rounded-r ${infants === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                      }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              {infantError && <div className="text-red-500 text-sm mt-2">{infantError}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">CHOOSE TRAVEL CLASS</label>
              <div className="flex flex-col space-y-2">
                {['Economy/Premium Economy', 'Premium Economy', 'Business'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setTravelClass(cls)}
                    className={`px-3 py-2 border rounded-md text-left ${travelClass === cls ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                      }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={applySelections} className="bg-blue-500 text-white px-6 py-2 rounded-md w-full">
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Flights Results */}
      <div className="mt-10">
        {flights.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
            <ul>
              {flights.map((flight, index) => (
                <li key={index} className="mb-4 border p-4 rounded">
                  <div>Airline: {flight.airline}</div>
                  <div>Price: {flight.price.total}</div>
                  <div>Departure: {flight.departure.iataCode} at {flight.departure.at}</div>
                  <div>Arrival: {flight.arrival.iataCode} at {flight.arrival.at}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No flights found.</div>
        )}
      </div>
    </div>
  );
}
