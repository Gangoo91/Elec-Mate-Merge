import type { RoomType } from '@/types/siteVisit';

export interface RoomTypeDefinition {
  type: RoomType;
  label: string;
  icon: string; // Lucide icon name
}

export const ROOM_TYPES: RoomTypeDefinition[] = [
  { type: 'kitchen', label: 'Kitchen', icon: 'CookingPot' },
  { type: 'living_room', label: 'Living Room', icon: 'Sofa' },
  { type: 'dining_room', label: 'Dining Room', icon: 'UtensilsCrossed' },
  { type: 'bedroom_1', label: 'Bedroom 1', icon: 'Bed' },
  { type: 'bedroom_2', label: 'Bedroom 2', icon: 'Bed' },
  { type: 'bedroom_3', label: 'Bedroom 3', icon: 'Bed' },
  { type: 'bedroom_4', label: 'Bedroom 4', icon: 'Bed' },
  { type: 'bathroom', label: 'Bathroom', icon: 'Bath' },
  { type: 'en_suite', label: 'En-suite', icon: 'ShowerHead' },
  { type: 'hallway', label: 'Hallway', icon: 'DoorOpen' },
  { type: 'landing', label: 'Landing', icon: 'Stairs' },
  { type: 'loft', label: 'Loft', icon: 'Home' },
  { type: 'garage', label: 'Garage', icon: 'Warehouse' },
  { type: 'garden_external', label: 'Garden / External', icon: 'Trees' },
  { type: 'utility', label: 'Utility', icon: 'WashingMachine' },
  { type: 'study_office', label: 'Study / Office', icon: 'Monitor' },
  { type: 'conservatory', label: 'Conservatory', icon: 'Sun' },
  { type: 'custom', label: 'Custom', icon: 'Plus' },
];

export function getRoomLabel(type: RoomType): string {
  return ROOM_TYPES.find((r) => r.type === type)?.label ?? type;
}
