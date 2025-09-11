// BS 7671 Appendix 1 Diversity Factor Calculations
import { CalculationError, validateInput } from '../utils/calculatorUtils';

export interface CircuitLoad {
  id: string;
  type: 'lighting' | 'small-power' | 'water-heating' | 'space-heating' | 'motor' | 'cooker' | 'shower' | 'socket-outlet';
  designCurrent: number;
  installedPower: number; // kW
  quantity: number;
  location: 'domestic' | 'commercial' | 'industrial';
}

export interface DiversityResult {
  totalInstalledLoad: number; // kW
  totalDesignCurrent: number; // A
  diversifiedLoad: number; // kW
  diversifiedCurrent: number; // A
  overallDiversityFactor: number;
  breakdownByType: {
    type: string;
    installedLoad: number;
    diversityFactor: number;
    diversifiedLoad: number;
  }[];
  complianceNotes: string[];
}

// BS 7671 Table A1 - Diversity factors
const diversityFactors = {
  lighting: {
    domestic: 0.66,
    commercial: 0.9,
    industrial: 0.9
  },
  'small-power': {
    domestic: 0.4, // First 10A at 100%, remainder at 40%
    commercial: 0.75,
    industrial: 0.8
  },
  'water-heating': {
    domestic: 1.0,
    commercial: 1.0,
    industrial: 1.0
  },
  'space-heating': {
    domestic: 1.0, // 100% of largest unit + 75% of remainder
    commercial: 0.75,
    industrial: 0.8
  },
  motor: {
    domestic: 1.0,
    commercial: 0.8, // Largest at 100%, remainder at 80%
    industrial: 0.8
  },
  cooker: {
    domestic: 0.6, // First 10A at 100%, remainder at 30%
    commercial: 0.8,
    industrial: 0.8
  },
  shower: {
    domestic: 1.0,
    commercial: 1.0,
    industrial: 1.0
  },
  'socket-outlet': {
    domestic: 0.4, // Complex calculation per BS 7671
    commercial: 0.75,
    industrial: 0.8
  }
};

export const calculateDiversity = (circuits: CircuitLoad[], voltage: number = 230): DiversityResult => {
  validateInput(voltage, 200, 440, 'Voltage');

  if (circuits.length === 0) {
    throw new CalculationError('At least one circuit is required', 'NO_CIRCUITS');
  }

  const breakdownByType: DiversityResult['breakdownByType'] = [];
  const complianceNotes: string[] = [];
  let totalInstalledLoad = 0;
  let totalDiversifiedLoad = 0;

  // Group circuits by type
  const circuitsByType = circuits.reduce((acc, circuit) => {
    if (!acc[circuit.type]) acc[circuit.type] = [];
    acc[circuit.type].push(circuit);
    return acc;
  }, {} as Record<string, CircuitLoad[]>);

  // Calculate diversity for each circuit type
  Object.entries(circuitsByType).forEach(([type, typeCircuits]) => {
    const installedLoad = typeCircuits.reduce((sum, circuit) => sum + circuit.installedPower, 0);
    const location = typeCircuits[0].location;
    
    let diversityFactor = diversityFactors[type as keyof typeof diversityFactors]?.[location] || 1.0;
    let diversifiedLoad = installedLoad * diversityFactor;

    // Apply special diversity rules per BS 7671
    if (type === 'small-power' && location === 'domestic') {
      // First 10A at 100%, remainder at 40%
      const firstTenAmps = Math.min(10 * voltage / 1000, installedLoad);
      const remainder = Math.max(0, installedLoad - firstTenAmps);
      diversifiedLoad = firstTenAmps + (remainder * 0.4);
      diversityFactor = diversifiedLoad / installedLoad;
    } else if (type === 'cooker' && location === 'domestic') {
      // First 10A at 100%, remainder at 30%
      const firstTenAmps = Math.min(10 * voltage / 1000, installedLoad);
      const remainder = Math.max(0, installedLoad - firstTenAmps);
      diversifiedLoad = firstTenAmps + (remainder * 0.3);
      diversityFactor = diversifiedLoad / installedLoad;
    } else if (type === 'space-heating') {
      // Largest unit at 100%, remainder at 75%
      const sortedLoads = typeCircuits.map(c => c.installedPower).sort((a, b) => b - a);
      const largestLoad = sortedLoads[0] || 0;
      const remainderLoad = sortedLoads.slice(1).reduce((sum, load) => sum + load, 0);
      diversifiedLoad = largestLoad + (remainderLoad * 0.75);
      diversityFactor = diversifiedLoad / installedLoad;
    }

    totalInstalledLoad += installedLoad;
    totalDiversifiedLoad += diversifiedLoad;

    breakdownByType.push({
      type,
      installedLoad,
      diversityFactor,
      diversifiedLoad
    });

    // Add compliance notes
    if (diversityFactor < 1.0) {
      complianceNotes.push(`${type}: Applied ${(diversityFactor * 100).toFixed(0)}% diversity factor per BS 7671 Table A1`);
    }
  });

  // Calculate currents
  const totalDesignCurrent = (totalInstalledLoad * 1000) / voltage;
  const diversifiedCurrent = (totalDiversifiedLoad * 1000) / voltage;
  const overallDiversityFactor = totalDiversifiedLoad / totalInstalledLoad;

  // Add general compliance notes
  complianceNotes.push('Diversity calculations comply with BS 7671 Appendix 1');
  
  if (overallDiversityFactor < 0.6) {
    complianceNotes.push('High diversity applied - verify load patterns match typical usage');
  }

  return {
    totalInstalledLoad: Math.round(totalInstalledLoad * 100) / 100,
    totalDesignCurrent: Math.round(totalDesignCurrent * 10) / 10,
    diversifiedLoad: Math.round(totalDiversifiedLoad * 100) / 100,
    diversifiedCurrent: Math.round(diversifiedCurrent * 10) / 10,
    overallDiversityFactor: Math.round(overallDiversityFactor * 100) / 100,
    breakdownByType,
    complianceNotes
  };
};

// Helper function for common domestic installation
export const calculateDomesticDiversity = (
  lightingLoad: number,
  socketLoad: number,
  cookerLoad: number = 0,
  showerLoad: number = 0,
  additionalLoads: { type: string; load: number }[] = []
): DiversityResult => {
  const circuits: CircuitLoad[] = [];

  if (lightingLoad > 0) {
    circuits.push({
      id: 'lighting',
      type: 'lighting',
      designCurrent: (lightingLoad * 1000) / 230,
      installedPower: lightingLoad,
      quantity: 1,
      location: 'domestic'
    });
  }

  if (socketLoad > 0) {
    circuits.push({
      id: 'sockets',
      type: 'socket-outlet',
      designCurrent: (socketLoad * 1000) / 230,
      installedPower: socketLoad,
      quantity: 1,
      location: 'domestic'
    });
  }

  if (cookerLoad > 0) {
    circuits.push({
      id: 'cooker',
      type: 'cooker',
      designCurrent: (cookerLoad * 1000) / 230,
      installedPower: cookerLoad,
      quantity: 1,
      location: 'domestic'
    });
  }

  if (showerLoad > 0) {
    circuits.push({
      id: 'shower',
      type: 'shower',
      designCurrent: (showerLoad * 1000) / 230,
      installedPower: showerLoad,
      quantity: 1,
      location: 'domestic'
    });
  }

  additionalLoads.forEach((load, index) => {
    circuits.push({
      id: `additional-${index}`,
      type: load.type as any,
      designCurrent: (load.load * 1000) / 230,
      installedPower: load.load,
      quantity: 1,
      location: 'domestic'
    });
  });

  return calculateDiversity(circuits);
};