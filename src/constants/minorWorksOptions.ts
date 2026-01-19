/**
 * Minor Works Certificate - Centralised Options
 * All dropdown options for the Minor Works certificate form
 */

import type { SelectOption } from '@/components/ui/mobile-select-picker';

// ============================================================================
// Protection Device Types (expanded from 7 to 14+)
// ============================================================================

export const PROTECTIVE_DEVICE_TYPES: SelectOption[] = [
  // MCB Types
  { value: 'mcb-type-a', label: 'MCB Type A', description: 'Very sensitive to overload (rarely used in UK)' },
  { value: 'mcb-type-b', label: 'MCB Type B', description: 'Standard - trips at 3-5x rated current' },
  { value: 'mcb-type-c', label: 'MCB Type C', description: 'Motor starting - trips at 5-10x rated current' },
  { value: 'mcb-type-d', label: 'MCB Type D', description: 'High inrush - trips at 10-20x rated current' },
  // RCBO Types
  { value: 'rcbo-type-ac', label: 'RCBO Type AC', description: 'AC residual currents only (basic)' },
  { value: 'rcbo-type-a', label: 'RCBO Type A', description: 'AC + pulsating DC (recommended)' },
  { value: 'rcbo-type-f', label: 'RCBO Type F', description: 'For VFDs/inverters (high frequency)' },
  { value: 'rcbo-type-b', label: 'RCBO Type B', description: 'All residual currents incl. smooth DC' },
  // Fuses
  { value: 'fuse-bs88', label: 'Fuse BS 88', description: 'HRC fuse - industrial/commercial' },
  { value: 'fuse-bs3036', label: 'Fuse BS 3036', description: 'Rewireable fuse (semi-enclosed)' },
  { value: 'fuse-bs1361', label: 'Fuse BS 1361', description: 'Cartridge fuse - cut-out/consumer unit' },
  { value: 'fuse-bs1362', label: 'Fuse BS 1362', description: 'Plug-top cartridge fuse' },
  // Other
  { value: 'mccb', label: 'MCCB', description: 'Moulded Case Circuit Breaker' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// Grouped version for better UX
export const PROTECTIVE_DEVICE_GROUPS = {
  mcb: {
    label: 'MCB (Miniature Circuit Breaker)',
    options: PROTECTIVE_DEVICE_TYPES.filter(o => o.value.startsWith('mcb-')),
  },
  rcbo: {
    label: 'RCBO (RCD + MCB Combined)',
    options: PROTECTIVE_DEVICE_TYPES.filter(o => o.value.startsWith('rcbo-')),
  },
  fuse: {
    label: 'Fuses',
    options: PROTECTIVE_DEVICE_TYPES.filter(o => o.value.startsWith('fuse-')),
  },
  other: {
    label: 'Other',
    options: PROTECTIVE_DEVICE_TYPES.filter(o => ['mccb', 'other'].includes(o.value)),
  },
};

// ============================================================================
// BS (EN) Standards
// ============================================================================

export const BS_EN_STANDARDS: SelectOption[] = [
  { value: 'BS EN 60898', label: 'BS EN 60898', description: 'MCBs for household and similar' },
  { value: 'BS EN 61009', label: 'BS EN 61009', description: 'RCBOs' },
  { value: 'BS EN 61008', label: 'BS EN 61008', description: 'RCDs without overcurrent protection' },
  { value: 'BS 3036', label: 'BS 3036', description: 'Semi-enclosed (rewireable) fuses' },
  { value: 'BS 1361', label: 'BS 1361', description: 'Cartridge fuses for AC circuits' },
  { value: 'BS 88', label: 'BS 88', description: 'HRC fuses' },
  { value: 'BS EN 62423', label: 'BS EN 62423', description: 'Type F and Type B RCDs' },
];

// ============================================================================
// Device Ratings (Amps) - expanded
// ============================================================================

export const DEVICE_RATINGS: SelectOption[] = [
  { value: '3', label: '3A', description: 'Lighting/small loads' },
  { value: '5', label: '5A', description: 'Lighting circuits' },
  { value: '6', label: '6A', description: 'Lighting circuits' },
  { value: '10', label: '10A', description: 'Small power circuits' },
  { value: '13', label: '13A', description: 'Ring final/radial' },
  { value: '16', label: '16A', description: 'Immersion/small appliances' },
  { value: '20', label: '20A', description: 'Radial/water heater' },
  { value: '25', label: '25A', description: 'Storage heater' },
  { value: '32', label: '32A', description: 'Cooker/ring final/EV charger' },
  { value: '40', label: '40A', description: 'Cooker/shower 9.5kW' },
  { value: '45', label: '45A', description: 'Cooker/shower 10.5kW' },
  { value: '50', label: '50A', description: 'Large cooker/shower' },
  { value: '63', label: '63A', description: 'Sub-main/large loads' },
  { value: '80', label: '80A', description: 'Main switch/sub-main' },
  { value: '100', label: '100A', description: 'Main switch/large sub-main' },
  { value: '125', label: '125A', description: 'Main incomer' },
];

// Common ratings highlighted for quick selection
export const COMMON_DEVICE_RATINGS = ['6', '16', '20', '32', '40'];

// ============================================================================
// Breaking Capacity (kA) - expanded from 4 to 8
// ============================================================================

export const BREAKING_CAPACITIES: SelectOption[] = [
  { value: '3', label: '3kA', description: 'Residential (far from transformer)' },
  { value: '6', label: '6kA', description: 'Standard domestic' },
  { value: '10', label: '10kA', description: 'Enhanced domestic/light commercial' },
  { value: '15', label: '15kA', description: 'Commercial' },
  { value: '16', label: '16kA', description: 'Commercial' },
  { value: '20', label: '20kA', description: 'Industrial/near transformer' },
  { value: '25', label: '25kA', description: 'Industrial' },
  { value: '50', label: '50kA', description: 'Heavy industrial' },
];

// ============================================================================
// Supply Voltages - expanded from 3 to 7+
// ============================================================================

export const SUPPLY_VOLTAGES: SelectOption[] = [
  { value: '230V', label: '230V', description: 'Single phase AC (standard UK)' },
  { value: '400V', label: '400V', description: 'Three phase AC' },
  { value: '110V', label: '110V', description: 'Site/CTE reduced voltage' },
  { value: '24V DC', label: '24V DC', description: 'SELV/control circuits' },
  { value: '12V DC', label: '12V DC', description: 'SELV lighting/garden' },
  { value: '48V DC', label: '48V DC', description: 'Telecoms/DC systems' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// ============================================================================
// Cable Types - expanded from 5 to 13
// ============================================================================

export const CABLE_TYPES: SelectOption[] = [
  // Domestic/General
  { value: 'twin-earth', label: 'Twin & Earth', description: '6242Y - Standard domestic wiring' },
  { value: '3-core-earth', label: '3 Core + Earth', description: '6243Y - 2-way switching/3-phase' },
  { value: 'flex', label: 'Flex', description: 'Flexible cord for appliances' },
  // Singles
  { value: 'singles-pvc', label: 'Singles PVC', description: 'Single core in conduit/trunking' },
  { value: 'singles-lsf', label: 'Singles LSF', description: 'Low Smoke & Fume singles' },
  // Armoured
  { value: 'swa-pvc', label: 'SWA PVC', description: 'Steel Wire Armoured - PVC insulated' },
  { value: 'swa-xlpe', label: 'SWA XLPE', description: 'Steel Wire Armoured - XLPE (higher temp)' },
  { value: 'armoured-singles', label: 'Armoured Singles', description: 'Large armoured single conductors' },
  // Specialty
  { value: 'micc', label: 'MICC', description: 'Mineral Insulated Copper Clad (Pyro)' },
  { value: 'fire-resistant', label: 'Fire Resistant', description: 'FP200/fire alarm cables' },
  { value: 'data-cable', label: 'Data Cable', description: 'Cat5e/Cat6/fibre' },
  { value: 'coax', label: 'Coax', description: 'TV/satellite coaxial' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// Grouped cable types for better UX
export const CABLE_TYPE_GROUPS = {
  domestic: {
    label: 'Domestic/General',
    options: CABLE_TYPES.filter(o => ['twin-earth', '3-core-earth', 'flex'].includes(o.value)),
  },
  singles: {
    label: 'Singles (Conduit/Trunking)',
    options: CABLE_TYPES.filter(o => o.value.startsWith('singles-')),
  },
  armoured: {
    label: 'Armoured',
    options: CABLE_TYPES.filter(o => o.value.includes('swa') || o.value === 'armoured-singles'),
  },
  specialty: {
    label: 'Specialty',
    options: CABLE_TYPES.filter(o => ['micc', 'fire-resistant', 'data-cable', 'coax', 'other'].includes(o.value)),
  },
};

// ============================================================================
// Installation Methods - expanded from 5 to 14
// ============================================================================

export const INSTALLATION_METHODS: SelectOption[] = [
  { value: 'clipped-direct', label: 'Clipped Direct', description: 'On surface (Ref Method C)' },
  { value: 'surface-conduit', label: 'Surface Conduit', description: 'Conduit on surface (Ref Method B)' },
  { value: 'concealed-conduit', label: 'Concealed Conduit', description: 'In thermally insulated wall (Ref Method A)' },
  { value: 'surface-trunking', label: 'Surface Trunking', description: 'Trunking on surface (Ref Method B)' },
  { value: 'flush-trunking', label: 'Flush Trunking', description: 'Trunking in wall/floor (Ref Method B)' },
  { value: 'cable-tray', label: 'Cable Tray', description: 'Perforated tray (Ref Method C/E)' },
  { value: 'cable-basket', label: 'Cable Basket', description: 'Wire mesh tray (Ref Method E)' },
  { value: 'under-plaster', label: 'Under Plaster', description: 'Cables in plaster (Ref Method A)' },
  { value: 'thermally-insulated', label: 'Thermally Insulated', description: 'Surrounded by insulation (Ref Method 100)' },
  { value: 'accessible-floor', label: 'Accessible Floor Void', description: 'Raised floor (Ref Method C)' },
  { value: 'ceiling-void', label: 'Ceiling Void', description: 'Above ceiling (Ref Method C)' },
  { value: 'buried-direct', label: 'Buried Direct', description: 'Direct in ground (Ref Method D)' },
  { value: 'in-duct', label: 'In Duct', description: 'Underground duct (Ref Method D)' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// ============================================================================
// Reference Methods (BS 7671 Table 4A2)
// ============================================================================

export const REFERENCE_METHODS: SelectOption[] = [
  { value: 'A', label: 'Method A', description: 'Enclosed in conduit in thermally insulated wall' },
  { value: 'B', label: 'Method B', description: 'Enclosed in conduit/trunking on wall' },
  { value: 'C', label: 'Method C', description: 'Clipped direct to wall/ceiling/tray' },
  { value: 'D', label: 'Method D', description: 'Buried direct in ground' },
  { value: 'E', label: 'Method E', description: 'Free air/cable ladder/tray (spaced)' },
  { value: 'F', label: 'Method F', description: 'Free air/cable tray (touching)' },
  { value: 'G', label: 'Method G', description: 'Spaced from surface (cleats)' },
  { value: '100', label: 'Method 100', description: 'Enclosed in thermal insulation (derated)' },
  { value: '101', label: 'Method 101', description: 'In contact with thermal insulation on one side' },
  { value: '102', label: 'Method 102', description: 'Surrounded by thermal insulation - heavily derated' },
  { value: '103', label: 'Method 103', description: 'In building void - partially surrounded by insulation' },
];

// ============================================================================
// Conductor Sizes (mm²) - expanded from 6 to 15
// ============================================================================

export const CONDUCTOR_SIZES: SelectOption[] = [
  { value: '0.5', label: '0.5mm²', description: 'Signal/control cables' },
  { value: '0.75', label: '0.75mm²', description: 'Flexible cord (light duty)' },
  { value: '1.0', label: '1.0mm²', description: 'Lighting circuits' },
  { value: '1.5', label: '1.5mm²', description: 'Lighting circuits (standard)' },
  { value: '2.5', label: '2.5mm²', description: 'Socket circuits (standard)' },
  { value: '4.0', label: '4.0mm²', description: 'Immersion/high load radial' },
  { value: '6.0', label: '6.0mm²', description: 'Cooker/EV charger/shower' },
  { value: '10.0', label: '10.0mm²', description: 'Large shower/cooker/sub-main' },
  { value: '16.0', label: '16.0mm²', description: 'Sub-mains/earthing' },
  { value: '25.0', label: '25.0mm²', description: 'Sub-mains/main bonding' },
  { value: '35.0', label: '35.0mm²', description: 'Main tails' },
  { value: '50.0', label: '50.0mm²', description: 'Main tails/large sub-main' },
  { value: '70.0', label: '70.0mm²', description: 'Large installation mains' },
  { value: '95.0', label: '95.0mm²', description: 'Commercial mains' },
  { value: '120.0', label: '120.0mm²', description: 'Large commercial mains' },
];

// Grouped by typical use
export const CONDUCTOR_SIZE_GROUPS = {
  lighting: {
    label: 'Lighting',
    options: CONDUCTOR_SIZES.filter(o => ['1.0', '1.5'].includes(o.value)),
  },
  power: {
    label: 'Power Circuits',
    options: CONDUCTOR_SIZES.filter(o => ['2.5', '4.0', '6.0', '10.0'].includes(o.value)),
  },
  submains: {
    label: 'Sub-mains',
    options: CONDUCTOR_SIZES.filter(o => ['16.0', '25.0', '35.0'].includes(o.value)),
  },
  mains: {
    label: 'Main Cables',
    options: CONDUCTOR_SIZES.filter(o => parseFloat(o.value) >= 50),
  },
  other: {
    label: 'Other',
    options: CONDUCTOR_SIZES.filter(o => parseFloat(o.value) < 1),
  },
};

// ============================================================================
// RCD Ratings (IΔn) - expanded from 3 to 6
// ============================================================================

export const RCD_RATINGS: SelectOption[] = [
  { value: '10', label: '10mA', description: 'Medical locations/enhanced protection' },
  { value: '30', label: '30mA', description: 'Personal protection (standard)' },
  { value: '100', label: '100mA', description: 'Fire protection' },
  { value: '300', label: '300mA', description: 'Fire protection/TT systems' },
  { value: '500', label: '500mA', description: 'Equipment protection' },
  { value: '1000', label: '1A', description: 'Main switch/discrimination' },
];

// ============================================================================
// RCD Types
// ============================================================================

export const RCD_TYPES: SelectOption[] = [
  { value: 'AC', label: 'Type AC', description: 'Sinusoidal AC only - basic' },
  { value: 'A', label: 'Type A', description: 'AC + pulsating DC (recommended)' },
  { value: 'F', label: 'Type F', description: 'Type A + high frequency (VFDs)' },
  { value: 'B', label: 'Type B', description: 'All including smooth DC (EV chargers)' },
];

// ============================================================================
// Test Equipment Models (grouped by manufacturer)
// ============================================================================

export const TEST_EQUIPMENT: SelectOption[] = [
  // Fluke
  { value: 'Fluke 1664 FC', label: 'Fluke 1664 FC', description: 'Full MFT with wireless' },
  { value: 'Fluke 1663', label: 'Fluke 1663', description: 'Full MFT' },
  { value: 'Fluke 1662', label: 'Fluke 1662', description: 'Basic MFT' },
  // Megger
  { value: 'Megger MFT1741', label: 'Megger MFT1741', description: 'Premium MFT' },
  { value: 'Megger MFT1730', label: 'Megger MFT1730', description: 'Standard MFT' },
  { value: 'Megger MFT1721', label: 'Megger MFT1721', description: 'Basic MFT' },
  { value: 'Megger MFT1835', label: 'Megger MFT1835', description: 'Advanced MFT' },
  // Kewtech
  { value: 'Kewtech KT66DL', label: 'Kewtech KT66DL', description: 'Premium MFT with Bluetooth' },
  { value: 'Kewtech KT65DL', label: 'Kewtech KT65DL', description: 'Full MFT' },
  { value: 'Kewtech KT64DL', label: 'Kewtech KT64DL', description: 'Standard MFT' },
  { value: 'Kewtech KT63DL', label: 'Kewtech KT63DL', description: 'Basic MFT' },
  // Metrel
  { value: 'Metrel MI 3152', label: 'Metrel MI 3152', description: 'EurotestXC' },
  { value: 'Metrel MI 3155', label: 'Metrel MI 3155', description: 'EurotestXD' },
  // Seaward
  { value: 'Seaward Apollo 600', label: 'Seaward Apollo 600', description: 'Full MFT' },
  { value: 'Seaward Apollo 500', label: 'Seaward Apollo 500', description: 'Standard MFT' },
  // Other
  { value: 'other', label: 'Other', description: 'Specify model in serial number field' },
];

export const TEST_EQUIPMENT_GROUPS = {
  fluke: {
    label: 'Fluke',
    options: TEST_EQUIPMENT.filter(o => o.value.startsWith('Fluke')),
  },
  megger: {
    label: 'Megger',
    options: TEST_EQUIPMENT.filter(o => o.value.startsWith('Megger')),
  },
  kewtech: {
    label: 'Kewtech',
    options: TEST_EQUIPMENT.filter(o => o.value.startsWith('Kewtech')),
  },
  metrel: {
    label: 'Metrel',
    options: TEST_EQUIPMENT.filter(o => o.value.startsWith('Metrel')),
  },
  seaward: {
    label: 'Seaward',
    options: TEST_EQUIPMENT.filter(o => o.value.startsWith('Seaward')),
  },
  other: {
    label: 'Other',
    options: TEST_EQUIPMENT.filter(o => o.value === 'other'),
  },
};

// ============================================================================
// Earthing Arrangements
// ============================================================================

export const EARTHING_ARRANGEMENTS: SelectOption[] = [
  { value: 'TN-C-S', label: 'TN-C-S (PME)', description: 'Combined neutral/earth in supply, separate in installation' },
  { value: 'TN-S', label: 'TN-S', description: 'Separate neutral and protective conductors throughout' },
  { value: 'TT', label: 'TT', description: 'Installation earth electrode independent of supply' },
  { value: 'IT', label: 'IT', description: 'Isolated or impedance earthed supply' },
];

// ============================================================================
// Earthing/Bonding Conductor Sizes
// ============================================================================

export const EARTHING_CONDUCTOR_SIZES: SelectOption[] = [
  { value: '6', label: '6mm²', description: 'Supplementary bonding' },
  { value: '10', label: '10mm²', description: 'Standard main bonding/earthing' },
  { value: '16', label: '16mm²', description: 'Main earthing (PME)' },
  { value: '25', label: '25mm²', description: 'Large installation earthing' },
  { value: '35', label: '35mm²', description: 'Commercial installation' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// ============================================================================
// Work Types
// ============================================================================

export const WORK_TYPES: SelectOption[] = [
  { value: 'addition', label: 'Addition to Existing Circuit', description: 'Adding socket/light to existing circuit' },
  { value: 'alteration', label: 'Alteration to Existing Circuit', description: 'Modifying existing circuit' },
  { value: 'replacement', label: 'Replacement of Equipment', description: 'Like-for-like replacement' },
  { value: 'new', label: 'New Circuit', description: 'Installing new circuit' },
  { value: 'repair', label: 'Repair', description: 'Fault repair' },
  { value: 'other', label: 'Other', description: 'Specify in description' },
];

// ============================================================================
// Qualification Levels (expanded)
// ============================================================================

export const QUALIFICATION_LEVELS: SelectOption[] = [
  { value: 'nvq3', label: 'NVQ Level 3', description: 'Electrical Installation' },
  { value: 'nvq3-2357', label: 'City & Guilds 2357', description: 'NVQ Diploma in Installing' },
  { value: 'city-guilds-2391', label: 'City & Guilds 2391', description: 'Inspection & Testing' },
  { value: 'city-guilds-2382', label: 'City & Guilds 2382', description: 'BS 7671 Requirements' },
  { value: 'city-guilds-2394', label: 'City & Guilds 2394', description: 'Initial Verification' },
  { value: 'city-guilds-2395', label: 'City & Guilds 2395', description: 'Periodic Inspection' },
  { value: 'eal-level3', label: 'EAL Level 3', description: 'Electrical Installation' },
  { value: 'eal-2391', label: 'EAL 2391 Equivalent', description: 'Inspection & Testing' },
  { value: 'am2', label: 'AM2/AM2S', description: 'Assessment of Competence' },
  { value: 'jib-approved', label: 'JIB Approved Electrician', description: 'JIB grade card holder' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// ============================================================================
// Scheme Providers (expanded)
// ============================================================================

export const SCHEME_PROVIDERS: SelectOption[] = [
  { value: 'niceic', label: 'NICEIC', description: 'National Inspection Council' },
  { value: 'napit', label: 'NAPIT', description: 'National Assoc. of Professional Inspectors' },
  { value: 'elecsa', label: 'ELECSA', description: 'Electrical Self-Assessment' },
  { value: 'stroma', label: 'Stroma', description: 'Stroma Certification' },
  { value: 'bpec', label: 'BPEC', description: 'Building & Prof. Eng. Competence' },
  { value: 'certass', label: 'Certass', description: 'Certification Assurance' },
  { value: 'oftec', label: 'OFTEC', description: 'Oil Firing Technical Association' },
  { value: 'eca', label: 'ECA', description: 'Electrical Contractors Association' },
  { value: 'select', label: 'SELECT', description: 'Scotland - SELECT registered' },
  { value: 'none', label: 'None', description: 'Not registered with a scheme' },
  { value: 'other', label: 'Other', description: 'Specify in notes' },
];

// ============================================================================
// Insulation Test Voltages
// ============================================================================

export const INSULATION_TEST_VOLTAGES: SelectOption[] = [
  { value: '250V', label: '250V', description: 'SELV/PELV circuits' },
  { value: '500V', label: '500V', description: 'Standard (up to 500V)' },
  { value: '1000V', label: '1000V', description: '>500V circuits' },
];

// ============================================================================
// Smart Defaults - Quick circuit presets
// ============================================================================

export interface SmartDefault {
  id: string;
  label: string;
  emoji: string;
  description: string;
  values: {
    protectiveDeviceType?: string;
    protectiveDeviceRating?: string;
    liveConductorSize?: string;
    cpcSize?: string;
    cableType?: string;
    installationMethod?: string;
    referenceMethod?: string;
    protectionRcbo?: boolean;
    protectionRcd?: boolean;
    rcdIdn?: string;
    rcdType?: string;
  };
}

export const SMART_DEFAULTS: SmartDefault[] = [
  {
    id: 'lighting',
    label: 'Lighting',
    emoji: '💡',
    description: '6A MCB B, 1.5mm² T&E',
    values: {
      protectiveDeviceType: 'mcb-type-b',
      protectiveDeviceRating: '6',
      liveConductorSize: '1.5',
      cpcSize: '1.0',
      cableType: 'twin-earth',
      installationMethod: 'ceiling-void',
      referenceMethod: 'C',
    },
  },
  {
    id: 'sockets',
    label: 'Sockets',
    emoji: '🔌',
    description: '32A RCBO A, 2.5mm² T&E',
    values: {
      protectiveDeviceType: 'rcbo-type-a',
      protectiveDeviceRating: '32',
      liveConductorSize: '2.5',
      cpcSize: '1.5',
      cableType: 'twin-earth',
      installationMethod: 'under-plaster',
      referenceMethod: 'A',
      protectionRcbo: true,
      rcdIdn: '30',
      rcdType: 'A',
    },
  },
  {
    id: 'cooker',
    label: 'Cooker',
    emoji: '🍳',
    description: '32A MCB B, 6.0mm² T&E',
    values: {
      protectiveDeviceType: 'mcb-type-b',
      protectiveDeviceRating: '32',
      liveConductorSize: '6.0',
      cpcSize: '2.5',
      cableType: 'twin-earth',
      installationMethod: 'under-plaster',
      referenceMethod: 'A',
    },
  },
  {
    id: 'shower',
    label: 'Shower',
    emoji: '🚿',
    description: '40A RCBO A, 10.0mm² T&E',
    values: {
      protectiveDeviceType: 'rcbo-type-a',
      protectiveDeviceRating: '40',
      liveConductorSize: '10.0',
      cpcSize: '4.0',
      cableType: 'twin-earth',
      installationMethod: 'ceiling-void',
      referenceMethod: 'C',
      protectionRcbo: true,
      rcdIdn: '30',
      rcdType: 'A',
    },
  },
  {
    id: 'ev-charger',
    label: 'EV Charger',
    emoji: '🚗',
    description: '32A RCBO A, 6.0mm² T&E',
    values: {
      protectiveDeviceType: 'rcbo-type-a',
      protectiveDeviceRating: '32',
      liveConductorSize: '6.0',
      cpcSize: '2.5',
      cableType: 'twin-earth',
      installationMethod: 'clipped-direct',
      referenceMethod: 'C',
      protectionRcbo: true,
      rcdIdn: '30',
      rcdType: 'A',
    },
  },
];

// ============================================================================
// Helper function to get flat options list from grouped options
// ============================================================================

export function flattenGroups(groups: { [key: string]: { label: string; options: SelectOption[] } }): SelectOption[] {
  return Object.values(groups).flatMap(g => g.options);
}
