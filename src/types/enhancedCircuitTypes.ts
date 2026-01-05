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
  { value: 'A1', label: 'A1', description: 'Single-core non-armoured, touching' },
  { value: 'A2', label: 'A2', description: 'Single-core non-armoured, spaced' },
  { value: 'B1', label: 'B1', description: 'Multi-core in conduit/trunking' },
  { value: 'B2', label: 'B2', description: 'Single-core in conduit/trunking' },
  { value: 'C', label: 'C', description: 'Multi-core clipped direct/embedded' },
  { value: 'D1', label: 'D1', description: 'Multi-core in duct in ground' },
  { value: 'D2', label: 'D2', description: 'Multi-core direct buried' },
  { value: 'E', label: 'E', description: 'Multi-core in free air' },
  { value: 'F', label: 'F', description: 'Single-core in free air, touching' },
  { value: 'G', label: 'G', description: 'Single-core in free air, spaced' },
];

// Helper function to get current carrying capacity
export const getCurrentCarryingCapacity = (cableSize: string, referenceMethod: string): number => {
  const capacityTable: { [key: string]: { [method: string]: number } } = {
    '1.0': { 'A1': 11, 'A2': 13, 'B1': 13, 'B2': 15, 'C': 15, 'D1': 13, 'D2': 14, 'E': 17, 'F': 19, 'G': 22 },
    '1.5': { 'A1': 14, 'A2': 17, 'B1': 17, 'B2': 19, 'C': 19, 'D1': 17, 'D2': 18, 'E': 22, 'F': 24, 'G': 29 },
    '2.5': { 'A1': 18, 'A2': 24, 'B1': 23, 'B2': 26, 'C': 26, 'D1': 23, 'D2': 25, 'E': 30, 'F': 32, 'G': 39 },
    '4.0': { 'A1': 24, 'A2': 32, 'B1': 30, 'B2': 34, 'C': 35, 'D1': 30, 'D2': 33, 'E': 40, 'F': 43, 'G': 52 },
    '6.0': { 'A1': 31, 'A2': 41, 'B1': 38, 'B2': 43, 'C': 46, 'D1': 38, 'D2': 42, 'E': 51, 'F': 54, 'G': 66 },
    '10': { 'A1': 42, 'A2': 57, 'B1': 52, 'B2': 59, 'C': 63, 'D1': 52, 'D2': 57, 'E': 70, 'F': 75, 'G': 90 },
    '16': { 'A1': 56, 'A2': 76, 'B1': 69, 'B2': 79, 'C': 85, 'D1': 69, 'D2': 76, 'E': 94, 'F': 100, 'G': 119 },
    '25': { 'A1': 73, 'A2': 101, 'B1': 89, 'B2': 104, 'C': 112, 'D1': 89, 'D2': 99, 'E': 119, 'F': 127, 'G': 151 },
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
    '10': '4.0',  // T&E cable: 10mm² live, 4.0mm² CPC
    '16': '6.0',  // SWA cable: equal CPC for larger sizes
    '25': '6.0',
    '35': '10',
    '50': '16',
  };
  
  return cpcTable[liveConductorSize] || liveConductorSize;
};