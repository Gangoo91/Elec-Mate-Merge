// EIC Schedule Generator
// Electrical Installation Certificate - Schedule of Test Results
// BS 7671:2018+A3:2024

import { EICCircuitData, EICScheduleOfTests } from '@/types/eic-integration';

export interface MultiCircuitDesign {
  installationId: string;
  circuits: CircuitDesign[];
  consumerUnit: {
    incomingSupply: {
      voltage: number;
      Ze: number;
      earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
    };
  };
}

export interface CircuitDesign {
  circuitNumber: number;
  name: string;
  loadType: string;
  phases: string;
  cableSize: number;
  cpcSize: number;
  cableLength: number;
  protectionDevice: {
    type: string;
    curve?: string;
    rating: number;
    kaRating: number;
  };
  rcdProtected: boolean;
  rcdRating?: number; // RCD rating in mA (30, 100, 300)
  afddRequired?: boolean;
  circuitTopology?: 'ring' | 'radial'; // For socket circuits
  isRingCircuit?: boolean; // Alternative flag for ring circuits
  calculationResults: {
    zs: number;
    maxZs: number;
    installationMethod?: string;
  };
}

export interface ProjectInfo {
  leadElectrician?: string;
  projectName?: string;
}

export interface SiteInfo {
  propertyAddress?: string;
}

// BS 7671 Reference Method Codes — maps installation descriptions to IET cert codes
const INSTALLATION_METHOD_CODES: Record<string, string> = {
  // Direct reference method codes (pass-through)
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  M: 'M',
  'N/A': 'N/A',
  LIM: 'LIM',
  '100': '100',
  '101': '101',
  '102': '102',
  '103': '103',
  // Legacy sub-method codes → map to simplified letter
  A1: 'A',
  A2: 'A',
  B1: 'B',
  B2: 'B',
  D1: 'D',
  D2: 'D',
  // Common description strings → reference method
  'Clipped Direct': 'C',
  'clipped-direct': 'C',
  'clipped direct': 'C',
  'In Conduit': 'B',
  'in-conduit': 'B',
  'in conduit': 'B',
  'In Trunking': 'B',
  'in-trunking': 'B',
  'in trunking': 'B',
  'Buried Direct': 'D',
  buried: 'D',
  'buried-direct': 'D',
  'enclosed-in-wall': 'A',
  'on-wall': 'B',
  'free-air': 'E',
  'free air': 'E',
  'Method A': 'A',
  'Method B': 'B',
  'Method C': 'C',
  'Method D': 'D',
  'Method E': 'E',
  'Method F': 'F',
  'Method G': 'G',
};

// BS Standard based on protective device type
function getBSStandard(deviceType: string): string {
  const standards: Record<string, string> = {
    MCB: 'BS EN 60898',
    RCBO: 'BS EN 61009',
    BS88: 'BS 88-2',
    'BS88-2': 'BS 88-2',
    'BS88-3': 'BS 88-3',
    MCCB: 'BS EN 60947-2',
    BS1361: 'BS 1361',
    BS3036: 'BS 3036',
    HRC: 'BS 88-2',
  };
  // Check for device type (case-insensitive)
  const upperType = deviceType?.toUpperCase() || '';
  for (const [key, value] of Object.entries(standards)) {
    if (upperType.includes(key.toUpperCase())) {
      return value;
    }
  }
  return 'BS EN 60898'; // Default to MCB standard
}

function getReferenceMethodCode(method?: string): string {
  if (!method) return 'C'; // Default to clipped direct
  return INSTALLATION_METHOD_CODES[method] || 'C';
}

function getPointsServed(loadType: string): number {
  const pointsMap: Record<string, number> = {
    lighting: 10,
    socket: 8,
    cooker: 1,
    shower: 1,
    immersion: 1,
    heating: 1,
    'ev-charger': 1,
    motor: 1,
  };
  return pointsMap[loadType.toLowerCase()] || 1;
}

// Calculate expected R1+R2 based on cable sizes and length
export function calculateExpectedR1R2(liveSize: number, cpcSize: number, length: number): string {
  // BS 7671 Table 9A - Conductor resistance (mΩ/m at 20°C)
  const CONDUCTOR_RESISTANCE: Record<number, number> = {
    1.0: 18.1,
    1.5: 12.1,
    2.5: 7.41,
    4.0: 4.61,
    6.0: 3.08,
    10: 1.83,
    16: 1.15,
    25: 0.727,
    35: 0.524,
    50: 0.387,
    70: 0.268,
    95: 0.193,
    120: 0.153,
  };

  const r1 = CONDUCTOR_RESISTANCE[liveSize] || 0;
  const r2 = CONDUCTOR_RESISTANCE[cpcSize] || 0;
  const r1r2 = ((r1 + r2) * length) / 1000; // Convert to Ω

  // Apply 1.2 multiplier for operating temperature (conductor at 70°C)
  const r1r2At70C = r1r2 * 1.2;

  return `${r1r2At70C.toFixed(3)}Ω`;
}

export function generateEICSchedule(
  multiCircuit: MultiCircuitDesign,
  projectInfo: ProjectInfo,
  siteInfo: SiteInfo
): EICScheduleOfTests {
  const circuits: EICCircuitData[] = multiCircuit.circuits.map((circuit, index) => {
    const deviceType = circuit.protectionDevice?.type ?? 'MCB';
    // Detect ring circuit from either flag or topology
    const isRing = circuit.isRingCircuit || circuit.circuitTopology === 'ring';
    // Get actual RCD rating or default to 30mA
    const rcdRatingValue = circuit.rcdRating ? `${circuit.rcdRating}mA` : '30mA';

    const baseCircuit: EICCircuitData = {
      circuitNumber: String(index + 1),
      phaseType: circuit.phases.includes('three') ? 'three' : 'single',
      circuitDescription: circuit.name,
      referenceMethod: getReferenceMethodCode(circuit.calculationResults.installationMethod),
      pointsServed: String(getPointsServed(circuit.loadType)),
      liveSize: `${circuit.cableSize ?? 2.5}`,
      cpcSize: `${circuit.cpcSize ?? 1.5}`,
      protectiveDeviceType: deviceType,
      protectiveDeviceCurve: circuit.protectionDevice?.curve ?? 'B',
      protectiveDeviceRating: String(circuit.protectionDevice?.rating ?? 6),
      protectiveDeviceKaRating: String(circuit.protectionDevice?.kaRating ?? 6),
      bsStandard: getBSStandard(deviceType),

      // Pre-calculated expected values
      r1r2: calculateExpectedR1R2(circuit.cableSize, circuit.cpcSize, circuit.cableLength),
      insulationTestVoltage: '500V DC',
      insulationResistance: '≥1.0 MΩ (expected)',
      polarity: 'Correct (verify on-site)',
      zs: String(circuit.calculationResults.zs),
      maxZs: String(circuit.calculationResults.maxZs),

      // To be tested on-site
      pfc: 'To be tested',
      functionalTesting: 'To be completed',
    };

    // Add ring circuit fields if applicable
    if (isRing) {
      baseCircuit.ringR1 = 'To be tested';
      baseCircuit.ringRn = 'To be tested';
      baseCircuit.ringR2 = 'To be tested';
      baseCircuit.ringContinuityLive = 'To be tested';
      baseCircuit.ringContinuityNeutral = 'To be tested';
    }

    // Add RCD fields if applicable
    if (circuit.rcdProtected) {
      baseCircuit.rcdRating = rcdRatingValue;
      baseCircuit.rcdOneX = '< 200ms @ 1x IΔn';
      baseCircuit.rcdTestButton = 'To be tested';
    }

    // Add AFDD if required
    if (circuit.afddRequired) {
      baseCircuit.afddTest = 'To be tested';
    }

    return baseCircuit;
  });

  return {
    installationId: multiCircuit.installationId,
    installationAddress: siteInfo.propertyAddress || '',
    designerName: projectInfo.leadElectrician || '',
    designDate: new Date().toISOString(),
    circuits,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
}
