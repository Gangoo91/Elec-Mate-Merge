export interface CircuitTemplate {
  type: string;
  label: string;
  description: string;
  defaults: {
    protectiveDeviceType: string;
    protectiveDeviceRating: string;
    protectiveDeviceKaRating: string;
    liveConductorSize: string;
    cpcSize: string;
    cableType: string;
    referenceMethod: string;
    installationMethod: string;
  };
}

export const protectiveDeviceTypes = [
  { value: 'mcb-b', label: 'MCB Type B', description: 'General purpose circuits' },
  { value: 'mcb-c', label: 'MCB Type C', description: 'Motor and inductive loads' },
  { value: 'mcb-d', label: 'MCB Type D', description: 'High inrush current loads' },
  { value: 'rcbo', label: 'RCBO', description: 'Combined MCB and RCD protection' },
  { value: 'fuse', label: 'Fuse', description: 'Traditional fuse protection' },
];

export const protectiveDeviceRatings = [
  { value: '6', label: '6A', typical: ['Lighting circuits'] },
  { value: '10', label: '10A', typical: ['Lighting circuits', 'Small power'] },
  { value: '16', label: '16A', typical: ['Small power circuits'] },
  { value: '20', label: '20A', typical: ['Radial socket circuits'] },
  { value: '25', label: '25A', typical: ['Large radial circuits'] },
  { value: '32', label: '32A', typical: ['Ring circuits', 'Cooker circuits'] },
  { value: '40', label: '40A', typical: ['Shower circuits', 'Large appliances'] },
  { value: '45', label: '45A', typical: ['Large shower circuits'] },
  { value: '50', label: '50A', typical: ['Large cooker circuits'] },
];

export const cableTypeOptions = [
  { value: 'twin-earth', label: 'Twin & Earth (T&E)', description: 'Standard domestic cable' },
  { value: 'swa', label: 'Steel Wire Armoured (SWA)', description: 'External/industrial use' },
  { value: 'fp200', label: 'FP200', description: 'Fire resistant cable' },
  { value: 'singles', label: 'Single Core Cables', description: 'Conduit/trunking installation' },
  { value: 'flex', label: 'Flexible Cable', description: 'Flexible connections' },
  { value: 'mi', label: 'Mineral Insulated (MI)', description: 'High temperature applications' },
];

export const circuitTemplates: CircuitTemplate[] = [
  {
    type: 'lighting',
    label: '💡 Lighting Circuit',
    description: 'Standard lighting circuit with 1.5mm² T&E cable',
    defaults: {
      protectiveDeviceType: 'mcb-b',
      protectiveDeviceRating: '6',
      protectiveDeviceKaRating: '6',
      liveConductorSize: '1.5',
      cpcSize: '1.0',
      cableType: 'twin-earth',
      referenceMethod: 'C',
      installationMethod: 'embedded-masonry',
    },
  },
  {
    type: 'ring-socket',
    label: '🔌 Ring Socket Circuit',
    description: 'Standard 13A socket ring circuit with 2.5mm² T&E cable',
    defaults: {
      protectiveDeviceType: 'mcb-b',
      protectiveDeviceRating: '32',
      protectiveDeviceKaRating: '6',
      liveConductorSize: '2.5',
      cpcSize: '1.5',
      cableType: 'twin-earth',
      referenceMethod: 'C',
      installationMethod: 'embedded-masonry',
    },
  },
  {
    type: 'radial-socket',
    label: '🔌 Radial Socket Circuit',
    description: 'Radial socket circuit with 2.5mm² T&E cable',
    defaults: {
      protectiveDeviceType: 'mcb-b',
      protectiveDeviceRating: '20',
      protectiveDeviceKaRating: '6',
      liveConductorSize: '2.5',
      cpcSize: '1.5',
      cableType: 'twin-earth',
      referenceMethod: 'C',
      installationMethod: 'embedded-masonry',
    },
  },
  {
    type: 'cooker',
    label: '🍳 Cooker Circuit',
    description: 'Cooker circuit with 6.0mm² T&E cable',
    defaults: {
      protectiveDeviceType: 'mcb-b',
      protectiveDeviceRating: '32',
      protectiveDeviceKaRating: '6',
      liveConductorSize: '6.0',
      cpcSize: '2.5',
      cableType: 'twin-earth',
      referenceMethod: 'C',
      installationMethod: 'embedded-masonry',
    },
  },
  {
    type: 'shower',
    label: '🚿 Shower Circuit',
    description: 'Shower circuit with 10mm² T&E cable',
    defaults: {
      protectiveDeviceType: 'mcb-b',
      protectiveDeviceRating: '40',
      protectiveDeviceKaRating: '6',
      liveConductorSize: '10',
      cpcSize: '4.0',
      cableType: 'twin-earth',
      referenceMethod: 'C',
      installationMethod: 'embedded-masonry',
    },
  },
  {
    type: 'ev-charging',
    label: '🚗 EV Charging Circuit',
    description: 'EV charging point with 6.0mm² T&E cable',
    defaults: {
      protectiveDeviceType: 'rcbo',
      protectiveDeviceRating: '32',
      protectiveDeviceKaRating: '6',
      liveConductorSize: '6.0',
      cpcSize: '6.0',
      cableType: 'twin-earth',
      referenceMethod: 'C',
      installationMethod: 'embedded-masonry',
    },
  },
];

export const referenceMethodOptions = [
  {
    value: 'A',
    label: 'A',
    description: 'Cables enclosed in conduit or trunking in a thermally insulated wall',
  },
  {
    value: 'B',
    label: 'B',
    description: 'Cables enclosed in conduit or trunking in/on a wall/floor',
  },
  { value: 'C', label: 'C', description: 'Clipped direct [includes cables direct in masonry]' },
  { value: 'D', label: 'D', description: 'Cables laid in conduit or in cable duct under ground' },
  { value: 'E', label: 'E', description: 'Free air on perforated cable tray [multi-core cables]' },
  { value: 'F', label: 'F', description: 'Free air on perforated cable tray [single-core cables]' },
  { value: 'G', label: 'G', description: 'Free air, flat [spaced by 1 cable diameter]' },
  {
    value: '100',
    label: '100',
    description: 'T&E on wooden joist or above ceiling with up to 100mm thermal insulation',
  },
  {
    value: '101',
    label: '101',
    description: 'T&E on wooden joist or above ceiling with more than 100mm thermal insulation',
  },
  {
    value: '102',
    label: '102',
    description: 'T&E in stud wall with more than 100mm thermal insulation, touching inner wall',
  },
  {
    value: '103',
    label: '103',
    description:
      'T&E in stud wall with more than 100mm thermal insulation, not touching inner wall',
  },
  { value: 'M', label: 'M', description: 'Mixed - multiple cables' },
  { value: 'N/A', label: 'N/A', description: 'N/A' },
  { value: 'LIM', label: 'LIM', description: 'LIM' },
];

// Helper function to get current carrying capacity
// BS 7671 Table 4D1A — PVC thermoplastic 70°C, copper conductors
// Methods A-G use conservative (lowest sub-method) values
// Methods 100-103 are IET domestic T&E approximations
export const getCurrentCarryingCapacity = (cableSize: string, referenceMethod: string): number => {
  const capacityTable: { [key: string]: { [method: string]: number } } = {
    '1.0': {
      A: 11,
      B: 13,
      C: 15,
      D: 13,
      E: 17,
      F: 19,
      G: 22,
      '100': 13,
      '101': 10,
      '102': 9,
      '103': 11,
    },
    '1.5': {
      A: 14,
      B: 17,
      C: 19,
      D: 17,
      E: 22,
      F: 24,
      G: 29,
      '100': 17,
      '101': 13,
      '102': 12,
      '103': 14,
    },
    '2.5': {
      A: 18,
      B: 23,
      C: 27,
      D: 23,
      E: 30,
      F: 32,
      G: 39,
      '100': 24,
      '101': 18,
      '102': 16,
      '103': 20,
    },
    '4.0': {
      A: 24,
      B: 30,
      C: 36,
      D: 30,
      E: 40,
      F: 43,
      G: 52,
      '100': 32,
      '101': 24,
      '102': 22,
      '103': 27,
    },
    '6.0': {
      A: 31,
      B: 38,
      C: 46,
      D: 38,
      E: 51,
      F: 54,
      G: 66,
      '100': 41,
      '101': 31,
      '102': 28,
      '103': 34,
    },
    '10': {
      A: 42,
      B: 52,
      C: 63,
      D: 52,
      E: 70,
      F: 75,
      G: 90,
      '100': 57,
      '101': 43,
      '102': 39,
      '103': 47,
    },
    '16': {
      A: 56,
      B: 69,
      C: 85,
      D: 69,
      E: 94,
      F: 100,
      G: 119,
      '100': 76,
      '101': 57,
      '102': 52,
      '103': 63,
    },
    '25': {
      A: 73,
      B: 89,
      C: 112,
      D: 89,
      E: 119,
      F: 127,
      G: 151,
      '100': 101,
      '101': 76,
      '102': 69,
      '103': 84,
    },
  };

  return capacityTable[cableSize]?.[referenceMethod] || 0;
};

// Helper function to get recommended CPC size based on live conductor (for T&E cables)
export const getRecommendedCpcSize = (liveConductorSize: string): string => {
  const cpcTable: { [key: string]: string } = {
    '1.0': '1.0',
    '1.5': '1.0', // T&E cable: 1.5mm² live, 1.0mm² CPC
    '2.5': '1.5', // T&E cable: 2.5mm² live, 1.5mm² CPC
    '4.0': '1.5', // T&E cable: 4.0mm² live, 1.5mm² CPC
    '6.0': '2.5', // T&E cable: 6.0mm² live, 2.5mm² CPC
    '10': '4.0', // T&E cable: 10mm² live, 4.0mm² CPC
    '16': '6.0', // SWA cable: equal CPC for larger sizes
    '25': '6.0',
    '35': '10',
    '50': '16',
  };

  return cpcTable[liveConductorSize] || liveConductorSize;
};
