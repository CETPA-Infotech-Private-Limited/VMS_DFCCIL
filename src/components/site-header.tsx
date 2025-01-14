import React from 'react';
import { Link } from 'react-router';
import { logo } from '@/assets/image/images';

const SiteHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky -top-2 sm:top-0 w-full z-50 border-b-4 border-red-600 h-[70px]">
      <div className="px-4 sm:px-6 py-2 flex items-center justify-between container">
        <div className="flex items-center space-x-4">
          <img src={logo} className="w-20 h-auto" />
          <Link to="/home" className="text-xl font-semibold  hidden sm:flex">
            <div className="flex flex-col text-primary">
              <span>Dedicated Freight Corridor Corporation of India Limited</span>
              <span className="text-sm text-black">A Govt. of India (Ministry of Railways) Enterprise</span>
            </div>
          </Link>
          <Link to="/home" className="text-2xl  font-semibold text-primary sm:hidden">
            <span className="text-primary">DFCCIL</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
