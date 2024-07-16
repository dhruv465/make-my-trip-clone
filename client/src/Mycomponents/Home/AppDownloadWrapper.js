import React from 'react';

const AppDownloadWrapper = () => {
  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-xl max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex-1 w-full lg:w-auto">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500 text-3xl">📱</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Download App Now!</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Use code <span className="font-bold">WELCOMEMMT</span> and get <span className="font-bold">FLAT 12% OFF*</span> on your first domestic flight booking
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mb-4 space-y-2 w-full lg:max-w-xl">
            <div className="flex items-center w-full">
              <div className="flex items-center border-t border-b border-l rounded-l-md px-2 py-1 w-32">
                <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_mmt_ui_assets/in_v2.png" alt="Flag" className="w-6 h-4 mr-1" />
                <span className="font-semibold">+91 —</span>
              </div>
              <input
                type="text"
                placeholder="Enter Mobile number"
                className="flex-grow border-t border-b border-r py-1 px-2 focus:outline-none w-full"
              />
            </div>
            <button className="text-blue-500 border border-blue-500 px-4 py-1 rounded-md transition duration-300 hover:bg-blue-50 w-full sm:w-auto">
              GET APP LINK
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col space-y-2 items-center sm:items-start">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Google Play" className="h-10 sm:h-12" />
            <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" className="h-8 sm:h-9" />
          </div>
          <img src="https://promos.makemytrip.com/Growth/Images/B2C/dt_app_download_qr.png" alt="QR Code" className="w-20 h-20" />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadWrapper;
