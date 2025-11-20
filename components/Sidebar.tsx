
import React from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { MapPin, Car, Calendar, Zap, SquareParking, Filter } from 'lucide-react';

interface SidebarProps {
  selectedCategories: Category[];
  toggleCategory: (category: Category) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategories, toggleCategory, isOpen, setIsOpen }) => {
  
  const getIcon = (category: Category) => {
    switch (category) {
      case Category.EVENT: return <Calendar size={18} />;
      case Category.TRANSPORTATION: return <Car size={18} />;
      case Category.GOGO_STATION: return <Zap size={18} />;
      case Category.PARKING: return <SquareParking size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className={`fixed top-24 left-4 z-40 lg:hidden ${isOpen ? 'hidden' : 'block'}`}>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-tu-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:w-80 border-r border-gray-200 flex flex-col pt-16`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-tu-dark">Explorer</h2>
            <button 
                onClick={() => setIsOpen(false)} 
                className="lg:hidden text-gray-400 hover:text-gray-600"
            >
                ×
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">Select categories to view on the map.</p>

          <div className="space-y-3">
            {Object.values(Category).map((category) => {
              const isSelected = selectedCategories.includes(category);
              // Extract bg color class for the indicator
              const colorClass = CATEGORY_COLORS[category].split(' ')[0]; 

              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 border ${
                    isSelected 
                      ? 'bg-gray-50 border-gray-300 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? colorClass + ' text-white' : 'bg-gray-200 text-gray-400'}`}>
                        {getIcon(category)}
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-gray-800' : 'text-gray-400'}`}>
                        {category}
                    </span>
                  </div>
                  
                  {/* Checkmark or visual indicator */}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-tu-red' : 'border-gray-300'
                  }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-tu-red" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="mt-auto p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Legend</h3>
            <div className="text-xs text-gray-600 space-y-1">
                <p>Click a pin to see details.</p>
                <p>Use mouse wheel to zoom.</p>
                <p>Drag to explore the campus.</p>
            </div>
        </div>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
