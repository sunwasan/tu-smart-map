import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-sm z-50 flex items-center px-4 lg:px-8 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Mock Logo - Using a circle for simplicity if no image asset */}
        <div className="w-10 h-10 bg-tu-red rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-tu-yellow shadow-md">
            TU
        </div>
        <div className="flex flex-col">
            <h1 className="text-lg font-bold text-tu-dark leading-tight tracking-tight">
                THAMMASAT UNIVERSITY
            </h1>
            <span className="text-xs font-semibold text-tu-red tracking-[0.2em]">
                INTERACTIVE MAPS
            </span>
        </div>
      </div>
      
      <div className="ml-auto flex gap-4">
        <button className="hidden md:block px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-tu-red transition-colors">
            Campuses
        </button>
        <button className="hidden md:block px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-tu-red transition-colors">
            Help
        </button>
        <button className="bg-tu-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
            Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;