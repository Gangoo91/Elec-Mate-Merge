// Common circuit descriptions based on BS 7671 typical installations

export interface CircuitDescriptionCategory {
  category: string;
  items: string[];
}

export const circuitDescriptions: CircuitDescriptionCategory[] = [
  {
    category: 'Lighting Circuits',
    items: [
      'Lighting - Ground Floor',
      'Lighting - First Floor',
      'Lighting - Second Floor',
      'Lighting - Loft',
      'Lighting - Landing',
      'Lighting - Hallway',
      'Lighting - Outdoor',
      'Lighting - Garden',
      'Lighting - Garage',
      'Lighting - Shed',
    ],
  },
  {
    category: 'Socket Circuits',
    items: [
      'Sockets - Kitchen',
      'Sockets - Living Room',
      'Sockets - Dining Room',
      'Sockets - Bedroom 1',
      'Sockets - Bedroom 2',
      'Sockets - Bedroom 3',
      'Sockets - Study',
      'Sockets - Utility',
      'Sockets - Garage',
      'Sockets - Bathroom',
      'Sockets - En-suite',
      'Sockets - Conservatory',
    ],
  },
  {
    category: 'Ring Circuits',
    items: [
      'Ring - Ground Floor',
      'Ring - First Floor',
      'Ring - Kitchen',
      'Ring - Living Areas',
    ],
  },
  {
    category: 'Cooking Appliances',
    items: [
      'Cooker',
      'Oven',
      'Hob',
      'Cooker/Oven',
      'Built-in Oven',
      'Built-in Hob',
    ],
  },
  {
    category: 'Water Heating',
    items: [
      'Electric Shower',
      'Immersion Heater',
      'Water Heater',
      'Instant Water Heater',
    ],
  },
  {
    category: 'Heating & Ventilation',
    items: [
      'Boiler',
      'Central Heating Controls',
      'Underfloor Heating',
      'Storage Heaters',
      'Ventilation',
      'Extractor Fan',
      'Air Conditioning',
    ],
  },
  {
    category: 'EV & Outdoor',
    items: [
      'Electric Vehicle Charger',
      'EV Charging Point',
      'Garden Equipment',
      'Pond Pump',
      'Hot Tub',
      'Sauna',
    ],
  },
  {
    category: 'Safety & Security',
    items: [
      'Smoke Alarms',
      'Fire Alarm System',
      'Security System',
      'Door Bell',
      'Gate Control',
      'CCTV System',
    ],
  },
  {
    category: 'Other Circuits',
    items: [
      'Spare',
      'Spare Way',
      'Washing Machine',
      'Tumble Dryer',
      'Dishwasher',
      'Fridge/Freezer',
      'Towel Rail',
      'Shaver Socket',
      'Data Cabinet',
      'Server Equipment',
    ],
  },
];

// Flatten all descriptions into a single array for easy searching
export const allCircuitDescriptions: string[] = circuitDescriptions.flatMap(
  (category) => category.items
);
