import type { RoomType, PropertyType } from '@/types/siteVisit';

export interface RoomTemplate {
  propertyType: PropertyType;
  label: string;
  rooms: { roomType: RoomType; roomName: string }[];
}

const TEMPLATES: RoomTemplate[] = [
  {
    propertyType: 'residential',
    label: '3 Bed Semi',
    rooms: [
      { roomType: 'hallway', roomName: 'Hallway' },
      { roomType: 'living_room', roomName: 'Living Room' },
      { roomType: 'kitchen', roomName: 'Kitchen' },
      { roomType: 'bedroom', roomName: 'Bedroom 1' },
      { roomType: 'bedroom', roomName: 'Bedroom 2' },
      { roomType: 'bedroom', roomName: 'Bedroom 3' },
      { roomType: 'bathroom', roomName: 'Bathroom' },
      { roomType: 'landing', roomName: 'Landing' },
      { roomType: 'loft', roomName: 'Loft' },
    ],
  },
  {
    propertyType: 'residential',
    label: '2 Bed Flat',
    rooms: [
      { roomType: 'hallway', roomName: 'Hallway' },
      { roomType: 'living_room', roomName: 'Living Room' },
      { roomType: 'kitchen', roomName: 'Kitchen' },
      { roomType: 'bedroom', roomName: 'Bedroom 1' },
      { roomType: 'bedroom', roomName: 'Bedroom 2' },
      { roomType: 'bathroom', roomName: 'Bathroom' },
    ],
  },
  {
    propertyType: 'residential',
    label: '4 Bed Detached',
    rooms: [
      { roomType: 'hallway', roomName: 'Hallway' },
      { roomType: 'living_room', roomName: 'Living Room' },
      { roomType: 'dining_room', roomName: 'Dining Room' },
      { roomType: 'kitchen', roomName: 'Kitchen' },
      { roomType: 'utility', roomName: 'Utility Room' },
      { roomType: 'bedroom', roomName: 'Bedroom 1' },
      { roomType: 'bedroom', roomName: 'Bedroom 2' },
      { roomType: 'bedroom', roomName: 'Bedroom 3' },
      { roomType: 'bedroom', roomName: 'Bedroom 4' },
      { roomType: 'en_suite', roomName: 'En-Suite' },
      { roomType: 'bathroom', roomName: 'Bathroom' },
      { roomType: 'landing', roomName: 'Landing' },
      { roomType: 'garage', roomName: 'Garage' },
      { roomType: 'garden_external', roomName: 'Garden / External' },
    ],
  },
  {
    propertyType: 'commercial',
    label: 'Small Office',
    rooms: [
      { roomType: 'reception', roomName: 'Reception' },
      { roomType: 'office', roomName: 'Office 1' },
      { roomType: 'office', roomName: 'Office 2' },
      { roomType: 'kitchen', roomName: 'Kitchen' },
      { roomType: 'toilet', roomName: 'Toilet' },
      { roomType: 'server_room', roomName: 'Server Room' },
    ],
  },
  {
    propertyType: 'industrial',
    label: 'Small Workshop',
    rooms: [
      { roomType: 'workshop', roomName: 'Workshop' },
      { roomType: 'office', roomName: 'Office' },
      { roomType: 'toilet', roomName: 'Toilet' },
      { roomType: 'store', roomName: 'Store Room' },
      { roomType: 'switch_room', roomName: 'Switch Room' },
      { roomType: 'plant_room', roomName: 'Plant Room' },
    ],
  },
];

export function getTemplatesForProperty(propertyType?: PropertyType): RoomTemplate[] {
  if (!propertyType) return TEMPLATES;
  return TEMPLATES.filter((t) => t.propertyType === propertyType);
}
