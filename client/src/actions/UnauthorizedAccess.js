import React from 'react';

const UnauthorizedAccess = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-[10000000] min-w-0">

      <div
        className="absolute inset-0 bg-[url('http://1.bp.blogspot.com/-_nW7TmIkEWw/T3SZ9EjpeLI/AAAAAAAADcw/jhYv2i9hE30/s1600/1.PNG')] 
        bg-no-repeat bg-center bg-contain sm:bg-cover md:bg-auto lg:bg-contain xl:bg-auto"
      ></div>
      <div className="relative text-center p-4">
        <button
          onClick={() => window.location.href = '/'}
          className="mt-20 px-4 py-2 bg-blue-50 text-black underline rounded-full hover:bg-blue-100 "
        >
          Go Back to Main Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;