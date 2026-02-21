import type { RoomType, PropertyType } from '@/types/siteVisit';

export interface RoomTypeDefinition {
  type: RoomType;
  label: string;
  icon: string; // Lucide icon name
  propertyTypes: PropertyType[];
}

export const ROOM_TYPES: RoomTypeDefinition[] = [
  // Residential
  { type: 'kitchen', label: 'Kitchen', icon: 'CookingPot', propertyTypes: ['residential'] },
  { type: 'living_room', label: 'Living Room', icon: 'Sofa', propertyTypes: ['residential'] },
  {
    type: 'dining_room',
    label: 'Dining Room',
    icon: 'UtensilsCrossed',
    propertyTypes: ['residential'],
  },
  { type: 'bedroom_1', label: 'Bedroom 1', icon: 'Bed', propertyTypes: ['residential'] },
  { type: 'bedroom_2', label: 'Bedroom 2', icon: 'Bed', propertyTypes: ['residential'] },
  { type: 'bedroom_3', label: 'Bedroom 3', icon: 'Bed', propertyTypes: ['residential'] },
  { type: 'bedroom_4', label: 'Bedroom 4', icon: 'Bed', propertyTypes: ['residential'] },
  { type: 'bathroom', label: 'Bathroom', icon: 'Bath', propertyTypes: ['residential'] },
  { type: 'en_suite', label: 'En-suite', icon: 'ShowerHead', propertyTypes: ['residential'] },
  { type: 'hallway', label: 'Hallway', icon: 'DoorOpen', propertyTypes: ['residential'] },
  { type: 'landing', label: 'Landing', icon: 'Stairs', propertyTypes: ['residential'] },
  { type: 'loft', label: 'Loft', icon: 'Home', propertyTypes: ['residential'] },
  { type: 'garage', label: 'Garage', icon: 'Warehouse', propertyTypes: ['residential'] },
  {
    type: 'garden_external',
    label: 'Garden / External',
    icon: 'Trees',
    propertyTypes: ['residential'],
  },
  { type: 'utility', label: 'Utility', icon: 'WashingMachine', propertyTypes: ['residential'] },
  {
    type: 'study_office',
    label: 'Study / Office',
    icon: 'Monitor',
    propertyTypes: ['residential'],
  },
  { type: 'conservatory', label: 'Conservatory', icon: 'Sun', propertyTypes: ['residential'] },

  // Commercial
  { type: 'office_space', label: 'Office Space', icon: 'Monitor', propertyTypes: ['commercial'] },
  { type: 'server_room', label: 'Server Room', icon: 'Server', propertyTypes: ['commercial'] },
  {
    type: 'plant_room',
    label: 'Plant Room',
    icon: 'Cog',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    type: 'warehouse',
    label: 'Warehouse',
    icon: 'Warehouse',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    type: 'loading_bay',
    label: 'Loading Bay',
    icon: 'Truck',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    type: 'retail_floor',
    label: 'Retail Floor',
    icon: 'ShoppingBag',
    propertyTypes: ['commercial'],
  },
  { type: 'reception', label: 'Reception', icon: 'DoorOpen', propertyTypes: ['commercial'] },
  {
    type: 'commercial_toilets',
    label: 'Toilets',
    icon: 'Bath',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    type: 'break_room',
    label: 'Break Room',
    icon: 'Coffee',
    propertyTypes: ['commercial', 'industrial'],
  },
  { type: 'board_room', label: 'Board Room', icon: 'Presentation', propertyTypes: ['commercial'] },
  { type: 'open_plan', label: 'Open Plan', icon: 'LayoutGrid', propertyTypes: ['commercial'] },
  {
    type: 'corridor',
    label: 'Corridor',
    icon: 'MoveHorizontal',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    type: 'stairwell',
    label: 'Stairwell',
    icon: 'Stairs',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    type: 'lift_shaft',
    label: 'Lift Shaft',
    icon: 'ArrowUpDown',
    propertyTypes: ['commercial', 'industrial'],
  },
  { type: 'car_park', label: 'Car Park', icon: 'Car', propertyTypes: ['commercial', 'industrial'] },
  { type: 'roof', label: 'Roof', icon: 'Home', propertyTypes: ['commercial', 'industrial'] },

  // Industrial
  { type: 'factory_floor', label: 'Factory Floor', icon: 'Factory', propertyTypes: ['industrial'] },
  { type: 'clean_room', label: 'Clean Room', icon: 'Sparkles', propertyTypes: ['industrial'] },
  {
    type: 'hazardous_area',
    label: 'Hazardous Area',
    icon: 'TriangleAlert',
    propertyTypes: ['industrial'],
  },
  { type: 'control_room', label: 'Control Room', icon: 'Monitor', propertyTypes: ['industrial'] },
  {
    type: 'compressor_room',
    label: 'Compressor Room',
    icon: 'Gauge',
    propertyTypes: ['industrial'],
  },
  { type: 'switch_room', label: 'Switch Room', icon: 'Zap', propertyTypes: ['industrial'] },
  {
    type: 'transformer_room',
    label: 'Transformer Room',
    icon: 'Zap',
    propertyTypes: ['industrial'],
  },
  { type: 'loading_dock', label: 'Loading Dock', icon: 'Truck', propertyTypes: ['industrial'] },
  { type: 'cold_store', label: 'Cold Store', icon: 'Snowflake', propertyTypes: ['industrial'] },
  { type: 'workshop', label: 'Workshop', icon: 'Wrench', propertyTypes: ['industrial'] },
  { type: 'welding_bay', label: 'Welding Bay', icon: 'Flame', propertyTypes: ['industrial'] },

  // Always available
  {
    type: 'custom',
    label: 'Other',
    icon: 'Plus',
    propertyTypes: ['residential', 'commercial', 'industrial'],
  },
];

/**
 * Returns room types filtered by property type.
 * If no propertyType is provided, returns all room types.
 */
export function getRoomTypesForProperty(propertyType?: PropertyType): RoomTypeDefinition[] {
  if (!propertyType) return ROOM_TYPES;
  return ROOM_TYPES.filter((rt) => rt.propertyTypes.includes(propertyType));
}

export function getRoomLabel(type: RoomType): string {
  return ROOM_TYPES.find((r) => r.type === type)?.label ?? type;
}
