import React from 'react';

const Explore = () => {
    return (
        <div className="relative mt-4 lg:mt-0 mx-3">
            {/* Overlay component */}
            <div className="absolute lg:bottom-0 left-1 right-1 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2 bg-white lg:rounded-full rounded-lg shadow-md py-2 px-4 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 sm:px-2 sm:py-3">

                {/* Where2Go */}
                <div className="flex items-center space-x-2">
                    <img src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png" alt="Where2Go" className="w-6 h-6" />
                    <span className="text-sm font-medium">Where2Go</span>
                </div>

                {/* Insurance */}
                <div className="flex items-center  space-x-2">
                    <img src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png" alt="Insurance" className="w-6 h-6" />
                    <div>
                        <span className="text-sm font-medium">Insurance</span>
                        <p className="text-xs text-gray-500">For International Trips</p>
                    </div>
                </div>

                {/* Explore International Flights */}
                <div className="flex items-center  space-x-2">
                    <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png" alt="Explore International Flights" className="w-6 h-6" />
                    <div>
                        <span className="text-sm font-medium">Explore International Flights</span>
                        <p className="text-xs text-gray-500">Cheapest Flights to Paris, Bali, Tokyo & more</p>
                    </div>
                </div>

                {/* MICE */}
                <div className="flex items-center  space-x-2">
                    <img src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png" alt="MICE" className="w-6 h-6" />
                    <div>
                        <span className="text-sm font-medium">MICE</span>
                        <p className="text-xs text-gray-500">Offsites, Events & Meetings</p>
                    </div>
                </div>

                {/* Gift Cards */}
                <div className="flex items-center  space-x-2">
                    <img src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png" alt="Gift Cards" className="w-6 h-6" />
                    <span className="text-sm font-medium">Gift Cards</span>
                </div>
            </div>

            {/* Explore More text */}
            <div className="absolute top-0 right-0 text-white p-2">
                <span className="text-sm">Explore More</span>
                <span className="ml-1">▼</span>
            </div>
        </div>
    );
};

export default Explore;
