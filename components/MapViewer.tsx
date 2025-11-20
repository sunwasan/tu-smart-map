
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { INITIAL_SCALE, MAX_SCALE, MIN_SCALE, MAP_IMAGE_URL, FALLBACK_MAP_URL } from '../constants';
import { PinData, ViewState } from '../types';
import PinMarker from './PinMarker';

interface MapViewerProps {
  pins: PinData[];
}

const MAP_WIDTH = 2000; // Fixed width for high resolution rendering
const MAP_ASPECT_RATIO = 1.82; // Approximate aspect ratio of the map

const MapViewer: React.FC<MapViewerProps> = ({ pins }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState<ViewState>({
    scale: INITIAL_SCALE,
    translation: { x: 0, y: 0 },
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  
  // State to handle map image source, falling back if needed
  const [currentMapUrl, setCurrentMapUrl] = useState(MAP_IMAGE_URL);

  // Center the map on initial load
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const mapHeight = MAP_WIDTH / MAP_ASPECT_RATIO;
      
      // Calculate center position
      const startX = (width - MAP_WIDTH * INITIAL_SCALE) / 2;
      const startY = (height - mapHeight * INITIAL_SCALE) / 2;

      setViewState({
        scale: INITIAL_SCALE,
        translation: { x: startX, y: startY },
      });
    }
  }, []);

  // Handle Zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const scaleSensitivity = 0.001;
    const delta = -e.deltaY * scaleSensitivity;
    const newScale = Math.min(Math.max(MIN_SCALE, viewState.scale + delta), MAX_SCALE);

    // Calculate cursor position relative to container
    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Zoom towards cursor logic
    // 1. Get mouse position in "world" coordinates before zoom
    const worldX = (cursorX - viewState.translation.x) / viewState.scale;
    const worldY = (cursorY - viewState.translation.y) / viewState.scale;

    // 2. Calculate new translation to keep world point under mouse
    const newTx = cursorX - worldX * newScale;
    const newTy = cursorY - worldY * newScale;

    setViewState({
      scale: newScale,
      translation: { x: newTx, y: newTy },
    });
  }, [viewState]);

  // Attach non-passive wheel listener to prevent browser zoom
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPan({ x: e.clientX - viewState.translation.x, y: e.clientY - viewState.translation.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setViewState((prev) => ({
      ...prev,
      translation: {
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      },
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setViewState(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, MAX_SCALE) }));
  };

  const zoomOut = () => {
    setViewState(prev => ({ ...prev, scale: Math.max(prev.scale / 1.2, MIN_SCALE) }));
  };

  const resetView = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const mapHeight = MAP_WIDTH / MAP_ASPECT_RATIO;
      const startX = (width - MAP_WIDTH * INITIAL_SCALE) / 2;
      const startY = (height - mapHeight * INITIAL_SCALE) / 2;
      
      setViewState({ scale: INITIAL_SCALE, translation: { x: startX, y: startY } });
    } else {
      setViewState({ scale: INITIAL_SCALE, translation: { x: 0, y: 0 } });
    }
  };

  const handleImageError = () => {
    console.warn(`Failed to load map from ${currentMapUrl}, switching to fallback.`);
    if (currentMapUrl !== FALLBACK_MAP_URL) {
        setCurrentMapUrl(FALLBACK_MAP_URL);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100 select-none group">
      {/* Map Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="origin-top-left transition-transform duration-75 ease-linear will-change-transform"
          style={{
            transform: `translate(${viewState.translation.x}px, ${viewState.translation.y}px) scale(${viewState.scale})`,
          }}
        >
          <div className="relative inline-block">
            <img
              src={currentMapUrl}
              alt="Thammasat University Map"
              className="pointer-events-none max-w-none shadow-2xl"
              draggable={false}
              style={{ width: `${MAP_WIDTH}px` }} 
              onError={handleImageError}
            />
            
            {/* Render Pins Layer */}
            <div className="absolute inset-0">
              {pins.map((pin) => (
                <PinMarker key={pin.id} pin={pin} scale={viewState.scale} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-50">
        <button onClick={zoomIn} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 active:bg-gray-100 text-gray-700 transition-all">
          <Plus size={20} />
        </button>
        <button onClick={zoomOut} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 active:bg-gray-100 text-gray-700 transition-all">
          <Minus size={20} />
        </button>
        <button onClick={resetView} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 active:bg-gray-100 text-tu-red transition-all" title="Reset View">
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Info Overlay */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-medium text-gray-500 pointer-events-none">
        Drag to Pan • Scroll to Zoom
      </div>
    </div>
  );
};

export default MapViewer;
