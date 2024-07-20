import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdFlightTakeoff } from 'react-icons/md';
import { LiaHotelSolid, LiaTrainSolid, LiaBusSolid, LiaCarSolid } from 'react-icons/lia';
import { MdMapsHomeWork } from 'react-icons/md';
import { TbBeach } from 'react-icons/tb';
import { CiMedicalClipboard } from 'react-icons/ci';
import { RiCurrencyLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';

const SearchForm = () => {
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
  const [departureCities, setDepartureCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/flights/cities`);
        setDepartureCities(response.data.departureCities);
        setDestinationCities(response.data.destinationCities);
      } catch (error) {
        console.error('Error fetching cities', error);
      }
    };

    fetchCities();
  }, []);

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
    setReturnDate(null);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      departureCity,
      destinationCity,
      departureDate: departureDate.toISOString(),
      returnDate: returnDate ? returnDate.toISOString() : '',
      selectedFare,
    }).toString();

    navigate(`/search-results?${params}`);
  };

  return (
    <div className="mx-auto py-8 sm:py-12 lg:py-32">
      <div className="p-4 sm:px-6 lg:p-6">
        <div className="container mx-auto bg-white rounded-md shadow-lg max-w-7xl">
          <div className="text-center bg-white shadow-lg -mt-8 rounded-md overflow-x-auto">
            <div className="relative flex justify-between items-center space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 p-3 border-b-2 border-gray-200">
              {[
                { href: "#flights", title: "Flights", icon: <MdFlightTakeoff size={25} />, selected: true },
                { href: "#hotels", title: "Hotels", icon: <LiaHotelSolid size={25} /> },
                { href: "#homestays", title: "Homestays & Villas", icon: <MdMapsHomeWork size={25} /> },
                { href: "#holiday-packages", title: "Holiday Packages", icon: <TbBeach size={25} /> },
                { href: "#trains", title: "Trains", icon: <LiaTrainSolid size={25} /> },
                { href: "#buses", title: "Buses", icon: <LiaBusSolid size={25} /> },
                { href: "#cabs", title: "Cabs", icon: <LiaCarSolid size={25} /> },
                { href: "#forex", title: "Forex Card & Currency", icon: <RiCurrencyLine size={25} /> },
                { href: "#travel-insurance", title: "Travel Insurance", icon: <CiMedicalClipboard size={25} /> },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  title={item.title}
                  className={`flex flex-col items-center min-w-[60px] p-2 rounded-md transition-colors duration-300 relative
          ${item.selected ? 'text-blue-500' : 'text-gray-600 hover:bg-blue-50'}`}
                >
                  {item.icon}
                  <span className="mt-1 text-xs sm:text-sm">{item.title}</span>
                  {item.selected && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" style={{ bottom: '-11px' }}></div>
                  )}
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
            <div className="mb-4 flex flex-wrap gap-4">
              <label className="inline-flex items-center cursor-pointer">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border rounded-md p-2">
              {/* From Section */}
              <div className="flex flex-col items-start lg:border-r pr-4">
                <div className="text-gray-500">From</div>
                <div className="text-lg font-bold relative w-full">
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full text-gray-700 bg-white rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-none focus:border-transparent cursor-pointer"
                  >
                    <option value="" disabled>Select City or Airport</option>
                    {departureCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>

                </div>
              </div>

              {/* To Section */}
              <div className="flex flex-col items-start lg:border-r pr-4">
                <div className="text-gray-500">To</div>
                <div className="text-lg font-bold relative w-full">
                  <select
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    className="w-full text-gray-700 bg-white rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-none focus:border-transparent cursor-pointer"
                  >
                    <option value="" className="rounded-md" disabled>Select City or Airport</option>
                    {destinationCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>

                </div>
              </div>

              {/* Departure Section */}
              <div className="flex flex-col items-start lg:border-r">
                <div className="text-gray-500">Departure</div>
                <DatePicker
                  selected={departureDate}
                  onChange={handleDepartureDateChange}
                  className="border-none w-full focus:outline-none text-xl font-bold"
                />
                <div className="text-sm text-gray-500">Select a date</div>
              </div>

              {/* Return Section */}
              <div className="flex flex-col items-start lg:border-r">
                <div className="text-gray-500">Return</div>
                <DatePicker
                  selected={returnDate}
                  onChange={handleReturnDateChange}
                  className="border-none w-full focus:outline-none text-xl font-bold"
                  minDate={new Date(departureDate.getTime() + 24 * 60 * 60 * 1000)}
                />
                <div className="text-sm text-gray-500">Select a return date</div>
              </div>

              {/* Travelers & Class Section */}
              <div className="flex flex-col items-start" onClick={toggleModal}>
                <div className="text-gray-500">Travelers & Class</div>
                <div className="text-xl font-bold">{adults + children + infants} Travelers</div>
                <div className="text-sm text-gray-500">{travelClass}</div>
              </div>
            </div>

            <div className="mt-6 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <h2 className="font-semibold text-sm">Select a special fare</h2>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-md mt-2">
                  EXTRA SAVINGS
                </span>
              </div>

              {/* Special Fares Selection */}
              {['Regular', 'Student', 'Senior Citizen', 'Doctor and Nurses'].map((fare, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-center border rounded-md p-2 cursor-pointer ${selectedFare === index + 1 ? 'bg-blue-50' : ''}`}
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

            <div className="absolute inset-x-0 flex items-center mt-3 justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full sm:w-auto sm:px-8">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Travelers & Class Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-75 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
    </div>
  );
}

export default SearchForm;
