import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapViewer from './components/MapViewer';
import { Category } from './types';
import { MOCK_PINS } from './constants';

const App: React.FC = () => {
  // Initialize with all categories selected
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(Object.values(Category));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredPins = useMemo(() => {
    return MOCK_PINS.filter(pin => selectedCategories.includes(pin.category));
  }, [selectedCategories]);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      <Navbar />
      
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar */}
        <Sidebar 
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
        />
        
        {/* Main Map Area */}
        <main className="flex-1 relative h-full">
            <MapViewer pins={filteredPins} />
        </main>
      </div>
    </div>
  );
};

export default App;