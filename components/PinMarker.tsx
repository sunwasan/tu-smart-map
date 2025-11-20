
import React, { useState } from 'react';
import { MapPin, Car, Calendar, Zap, SquareParking } from 'lucide-react';
import { PinData, Category } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { getLocationInsight } from '../services/geminiService';

interface PinMarkerProps {
  pin: PinData;
  scale: number; // Inverse scale to keep pin size constant visually
}

const PinMarker: React.FC<PinMarkerProps> = ({ pin, scale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const getIcon = () => {
    switch (pin.category) {
      case Category.EVENT: return <Calendar size={16} />;
      case Category.TRANSPORTATION: return <Car size={16} />;
      case Category.GOGO_STATION: return <Zap size={16} />;
      case Category.PARKING: return <SquareParking size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  const handleFetchInsight = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAi(true);
    const insight = await getLocationInsight(pin.title, pin.category);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer z-20 transition-transform duration-200"
      style={{
        left: `${pin.coordinate.x}%`,
        top: `${pin.coordinate.y}%`,
        transform: `translate(-50%, -100%) scale(${1 / scale})`, // Counter-scale to keep pin size consistent
        transformOrigin: 'bottom center'
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      {/* Tooltip / Popup */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 w-64 bg-white rounded-lg shadow-xl p-4 border border-gray-100 z-50 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-tu-dark text-sm">{pin.title}</h3>
                <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                >
                    ×
                </button>
            </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${CATEGORY_COLORS[pin.category].replace('text-white', 'text-opacity-90 bg-opacity-90')}`}>
            {pin.category}
          </span>
          <p className="text-xs text-gray-600 mt-2">{pin.description}</p>
          
          {/* Gemini Integration */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            {!aiInsight ? (
                 <button 
                 onClick={handleFetchInsight}
                 disabled={loadingAi}
                 className="flex items-center gap-1 text-[10px] text-tu-red font-semibold hover:underline"
               >
                 {loadingAi ? 'Asking AI...' : '✨ Ask AI for a tip'}
               </button>
            ) : (
                <p className="text-[10px] text-tu-red italic bg-red-50 p-2 rounded border border-red-100">
                    " {aiInsight} "
                </p>
            )}
          </div>
          
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white"></div>
        </div>
      )}

      {/* Pin Icon */}
      <div className={`p-2 rounded-full shadow-lg border-2 border-white ${CATEGORY_COLORS[pin.category]} hover:scale-110 transition-transform`}>
        {getIcon()}
      </div>
      {/* Shadow on map */}
      <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px] mt-1"></div>
    </div>
  );
};

export default PinMarker;
