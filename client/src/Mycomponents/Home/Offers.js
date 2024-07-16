import React from 'react';

const Offers = () => {
    return (
        <div className="flex justify-center items-center p-2 mx-3">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto lg:mt-14 mt-72">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Offers</h2>
                    <a href="/" className="text-blue-500 font-semibold flex items-center">
                        VIEW ALL
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                    <button className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full whitespace-nowrap">ON 1st BOOKING</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">All Offers</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Bank Offers</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Flights</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Hotels</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Holidays</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Trains</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Cabs</button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap">Bus</button>
                </div>

                <div className="max-w-md mx-auto lg:grid lg:grid-cols-2 gap-6 items-center md:max-w-full">
                    <div className="md:flex bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="md:shrink-0">
                            <img className="h-48 w-full object-cover md:h-full md:w-48"
                                src="https://promos.makemytrip.com/notification/xhdpi//new-user-116x116-05062024.jpg"
                                alt="Flight offer" />
                        </div>
                        <div className="p-8">
                            <div className="text-xs text-gray-500 mb-1 text-right">T&C's APPLY</div>
                            <h3 className="text-lg font-bold mb-2">For Your 1st Int'l Flight Booking:</h3>
                            <p className="text-sm mb-4">Grab FLAT 10% OFF*, code: WELCOMEMMT.</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Code: WELCOMEMMT</span>
                                <a href="/" className="text-blue-500 font-semibold">VIEW DETAILS</a>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="md:shrink-0">
                            <img className="h-48 w-full object-cover md:h-full md:w-48"
                                src="https://promos.makemytrip.com/notification/xhdpi//Welcome-Holidays-190922@2x.jpg"
                                alt="Holiday offer" />
                        </div>
                        <div className="p-8">
                            <div className="text-xs text-gray-500 mb-1 text-right">T&C's APPLY</div>
                            <h3 className="text-lg font-bold mb-2">For Your 1st Holiday Booking!</h3>
                            <p className="text-sm mb-4">Up to 30% OFF*</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Code: WELCOMEMMT</span>
                                <a href="/" className="text-blue-500 font-semibold">VIEW DETAILS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;