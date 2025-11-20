
export enum Category {
  EVENT = 'Event',
  TRANSPORTATION = 'Transportation',
  GOGO_STATION = 'Gogo Station',
  PARKING = 'Parking Lot'
}

export interface Coordinate {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface PinData {
  id: string;
  title: string;
  description: string;
  category: Category;
  coordinate: Coordinate;
}

export interface ViewState {
  scale: number;
  translation: { x: number; y: number };
}
