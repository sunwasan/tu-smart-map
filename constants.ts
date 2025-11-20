
import { Category, PinData } from './types';

// Primary map path. Using absolute path /src/map.jpg to ensure it resolves from root
export const MAP_IMAGE_URL = 'https://raw.githubusercontent.com/sunwasan/map-tu/refs/heads/main/map.jpg';
// Fallback map in case the local file is missing or path is incorrect
export const FALLBACK_MAP_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Thammasat_University_Rangsit_Campus_Map_2015.png/2560px-Thammasat_University_Rangsit_Campus_Map_2015.png';

export const INITIAL_SCALE = 0.6; // Start slightly zoomed out to see more of the campus
export const MIN_SCALE = 0.3;
export const MAX_SCALE = 4;

export const MOCK_PINS: PinData[] = [
  // EVENTS
  {
    id: '1',
    title: 'Main Stadium (Asian Games)',
    description: 'Major sports venue & concerts',
    category: Category.EVENT,
    coordinate: { x: 13, y: 72 }, // Bottom left area
  },
  {
    id: '10',
    title: 'Freshy Games Night',
    description: 'Student activity center event',
    category: Category.EVENT,
    coordinate: { x: 65, y: 35 }, // Near gymnasium
  },
  
  // PARKING
  {
    id: '7',
    title: 'TU Hospital Parking',
    description: 'Visitor parking structure',
    category: Category.PARKING,
    coordinate: { x: 12, y: 18 }, // Top left hospital area
  },

  // GOGO STATIONS (Expanded to ~10)
  {
    id: 'g1',
    title: 'Chiang Rak Gate (Check A)',
    description: 'Main entrance station',
    category: Category.GOGO_STATION,
    coordinate: { x: 22, y: 88 },
  },
  {
    id: 'g2',
    title: 'Inter-Zone Station',
    description: 'Central transfer hub',
    category: Category.GOGO_STATION,
    coordinate: { x: 38, y: 52 },
  },
  {
    id: 'g3',
    title: 'SC1 Station',
    description: 'Science Complex 1',
    category: Category.GOGO_STATION,
    coordinate: { x: 53, y: 46 },
  },
  {
    id: 'g4',
    title: 'SC3 Station',
    description: 'Science Complex 3',
    category: Category.GOGO_STATION,
    coordinate: { x: 58, y: 48 },
  },
  {
    id: 'g5',
    title: 'Engineering Station',
    description: 'Faculty of Engineering',
    category: Category.GOGO_STATION,
    coordinate: { x: 35, y: 32 },
  },
  {
    id: 'g6',
    title: 'Architecture Station',
    description: 'Faculty of Architecture',
    category: Category.GOGO_STATION,
    coordinate: { x: 30, y: 25 },
  },
  {
    id: 'g7',
    title: 'SIIT Station',
    description: 'Sirindhorn International Institute',
    category: Category.GOGO_STATION,
    coordinate: { x: 25, y: 22 },
  },
  {
    id: 'g8',
    title: 'Hospital Station',
    description: 'Thammasat University Hospital',
    category: Category.GOGO_STATION,
    coordinate: { x: 15, y: 20 },
  },
  {
    id: 'g9',
    title: 'Green Canteen Station',
    description: 'Main food center',
    category: Category.GOGO_STATION,
    coordinate: { x: 45, y: 40 },
  },
  {
    id: 'g10',
    title: 'LCT Station',
    description: 'Learning Center',
    category: Category.GOGO_STATION,
    coordinate: { x: 68, y: 42 },
  },

  // TRANSPORTATION (Motorcycle ~5, Van 1, Bus 4, EV Bus 6)
  // Van (1)
  {
    id: 't1',
    title: 'Inter-Zone Van Station',
    description: 'Vans to Victory Monument/Rangsit',
    category: Category.TRANSPORTATION,
    coordinate: { x: 36, y: 54 },
  },
  // Motorcycle (5)
  {
    id: 't2',
    title: 'Moto: Chiang Rak 1',
    description: 'Gate 1 Motorcycle Taxi',
    category: Category.TRANSPORTATION,
    coordinate: { x: 24, y: 86 },
  },
  {
    id: 't3',
    title: 'Moto: Chiang Rak 2',
    description: 'Gate 2 Motorcycle Taxi',
    category: Category.TRANSPORTATION,
    coordinate: { x: 28, y: 82 },
  },
  {
    id: 't4',
    title: 'Moto: Hospital',
    description: 'Hospital Entrance Moto',
    category: Category.TRANSPORTATION,
    coordinate: { x: 12, y: 22 },
  },
  {
    id: 't5',
    title: 'Moto: Inter Zone',
    description: 'Central Moto Stand',
    category: Category.TRANSPORTATION,
    coordinate: { x: 34, y: 56 },
  },
  {
    id: 't6',
    title: 'Moto: Green Canteen',
    description: 'Canteen Moto Stand',
    category: Category.TRANSPORTATION,
    coordinate: { x: 47, y: 42 },
  },
  // Bus (4)
  {
    id: 't7',
    title: 'Bus Stop: Main Entrance',
    description: 'Public Bus Stop',
    category: Category.TRANSPORTATION,
    coordinate: { x: 20, y: 85 },
  },
  {
    id: 't8',
    title: 'Bus Stop: Rector Bldg',
    description: 'Executive Building Stop',
    category: Category.TRANSPORTATION,
    coordinate: { x: 40, y: 10 },
  },
  {
    id: 't9',
    title: 'Bus Stop: SC Building',
    description: 'Science Complex Stop',
    category: Category.TRANSPORTATION,
    coordinate: { x: 52, y: 44 },
  },
  {
    id: 't10',
    title: 'Bus Stop: Asian Games',
    description: 'Dormitory Zone C Stop',
    category: Category.TRANSPORTATION,
    coordinate: { x: 10, y: 65 },
  },
  // EV Bus (6)
  {
    id: 't11',
    title: 'EV Bus: LCT',
    description: 'Learning Center Stop',
    category: Category.TRANSPORTATION,
    coordinate: { x: 60, y: 48 },
  },
  {
    id: 't12',
    title: 'EV Bus: Library',
    description: 'Puey Library Stop',
    category: Category.TRANSPORTATION,
    coordinate: { x: 75, y: 45 },
  },
  {
    id: 't13',
    title: 'EV Bus: Comm Arts',
    description: 'Faculty of JC',
    category: Category.TRANSPORTATION,
    coordinate: { x: 80, y: 30 },
  },
  {
    id: 't14',
    title: 'EV Bus: SIIT',
    description: 'SIIT Main Building',
    category: Category.TRANSPORTATION,
    coordinate: { x: 28, y: 24 },
  },
  {
    id: 't15',
    title: 'EV Bus: Dome',
    description: 'Dome Administration',
    category: Category.TRANSPORTATION,
    coordinate: { x: 42, y: 14 },
  },
  {
    id: 't16',
    title: 'EV Bus: West Complex',
    description: 'Gymnasium & Pool',
    category: Category.TRANSPORTATION,
    coordinate: { x: 15, y: 75 },
  },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.EVENT]: 'bg-tu-red text-white',
  [Category.TRANSPORTATION]: 'bg-blue-500 text-white',
  [Category.GOGO_STATION]: 'bg-tu-yellow text-black',
  [Category.PARKING]: 'bg-gray-700 text-white',
};
