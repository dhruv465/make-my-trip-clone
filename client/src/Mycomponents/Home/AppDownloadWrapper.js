import React from 'react';

const AppDownloadWrapper = () => {
  return (
    <div className="bg-white h-48 p-8 rounded-lg drop-shadow-2xl max-w-6xl mx-auto pt-10 ">
      <div className="flex items-center justify-between">
        <div className="flex-grow mr-4">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-yellow-500 text-2xl">🎁</span>
            <h3 className="text-xl font-bold">Download App Now !</h3>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Use code <span className="font-bold">WELCOMEMMT</span> and get <span className="font-bold">FLAT 12% OFF*</span> on your first domestic flight booking
          </p>
          <div className="flex items-center">
            <div className="flex items-center border rounded-l-md px-2 py-1 bg-gray-100">
              <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_mmt_ui_assets/in_v2.png" alt="Flag" className="w-5 h-3 mr-1" />
              <span className="text-sm font-semibold">+91 —</span>
            </div>
            <input
              type="text"
              placeholder="Enter Mobile number"
              className="flex border-t border-b py-1 px-2 focus:outline-none text-sm"
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded-r-md hover:bg-blue-600 transition duration-300 text-sm">
              GET APP LINK
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4 ">
          <div className="flex flex-col space-y-2">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Google Play" className="h-12" />
            <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" className="h-9" />
          </div>
          <img src="https://promos.makemytrip.com/Growth/Images/B2C/dt_app_download_qr.png" alt="QR Code" className="w-20 h-20" />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadWrapper;