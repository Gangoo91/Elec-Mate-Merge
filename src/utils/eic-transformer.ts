import { EICCircuitData, EICScheduleOfTests, AgentCircuitOutput } from "@/types/eic-integration";

// BS 7671 Table I1 - Conductor resistances (mΩ/m at 20°C)
const CONDUCTOR_RESISTANCE: Record<string, number> = {
  "1.0": 18.1,
  "1.5": 12.1,
  "2.5": 7.41,
  "4.0": 4.61,
  "6.0": 3.08,
  "10.0": 1.83,
  "16.0": 1.15,
  "25.0": 0.727,
  "35.0": 0.524,
  "50.0": 0.387,
  "70.0": 0.268,
  "95.0": 0.193,
  "120.0": 0.153,
  "150.0": 0.124,
  "185.0": 0.0991,
  "240.0": 0.0754,
};

// BS 7671 Appendix 3 - Max Zs values (Ω) at 0.4s for common protective devices
const MAX_ZS_VALUES: Record<string, Record<number, number>> = {
  "B": {
    6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
  },
  "C": {
    6: 3.83, 10: 2.30, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72, 40: 0.57, 50: 0.46, 63: 0.36
  },
  "D": {
    6: 1.92, 10: 1.15, 16: 0.72, 20: 0.57, 25: 0.46, 32: 0.36, 40: 0.29, 50: 0.23, 63: 0.18
  },
};

/**
 * Calculate expected R1+R2 value based on cable sizes and length
 * Using BS 7671 Table I1 conductor resistances
 */
export function calculateExpectedR1R2(
  liveSize: string,
  cpcSize: string,
  lengthMeters: number
): number {
  const r1 = CONDUCTOR_RESISTANCE[liveSize] || 0;
  const r2 = CONDUCTOR_RESISTANCE[cpcSize] || 0;
  
  // R1+R2 = (r1 + r2) × length × temperature factor (1.38 for 70°C)
  const r1r2 = ((r1 + r2) / 1000) * lengthMeters * 1.38;
  
  return parseFloat(r1r2.toFixed(3));
}

/**
 * Get max Zs for protective device from BS 7671 Appendix 3
 */
export function getMaxZsForDevice(
  deviceType: string,
  curve: string,
  rating: number
): number {
  const curveUpper = curve.toUpperCase();
  
  if (deviceType.includes("RCD") || deviceType.includes("RCBO")) {
    // RCD/RCBO max Zs = 230V / (5 × IΔn) typically
    // For 30mA: 230 / (5 × 0.03) = 1533Ω (very high, earth path still needed)
    return 200; // Practical limit for basic protection
  }
  
  if (MAX_ZS_VALUES[curveUpper]?.[rating]) {
    return MAX_ZS_VALUES[curveUpper][rating];
  }
  
  // Default safe value if not in table
  return 0.5;
}

/**
 * Map load type to circuit description
 */
export function mapLoadTypeToCircuitDescription(loadType: string, customDescription?: string): string {
  if (customDescription) return customDescription;

  const descriptions: Record<string, string> = {
    "lighting": "Lighting Circuit",
    "power": "Power Sockets",
    "cooker": "Cooker Circuit",
    "shower": "Electric Shower",
    "immersion": "Immersion Heater",
    "heating": "Electric Heating",
    "smoke-alarm": "Smoke Alarm System",
    "security": "Security System",
    "ev-charger": "EV Charging Point",
    "heat-pump": "Heat Pump",
  };

  return descriptions[loadType] || "General Circuit";
}

/**
 * Get BS Standard based on protective device type
 */
function getBSStandard(deviceType: string): string {
  const standards: Record<string, string> = {
    'MCB': 'BS EN 60898',
    'RCBO': 'BS EN 61009',
    'BS88': 'BS 88-2',
    'BS88-2': 'BS 88-2',
    'BS88-3': 'BS 88-3',
    'MCCB': 'BS EN 60947-2',
    'BS1361': 'BS 1361',
    'BS3036': 'BS 3036',
    'HRC': 'BS 88-2',
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

/**
 * Transform AI agent outputs to EIC Schedule of Tests format
 */
export function transformAgentOutputToEIC(
  circuits: AgentCircuitOutput[],
  installationDetails: {
    address: string;
    designerName: string;
    conversationId: string;
  }
): EICScheduleOfTests {
  const eicCircuits: EICCircuitData[] = circuits.map((circuit) => {
    const liveSize = circuit.cableSize.replace(/mm²?/gi, "");
    const cpcSize = circuit.cpcSize.replace(/mm²?/gi, "");
    const lengthM = circuit.cableLength;
    
    // Calculate expected values
    const expectedR1R2 = calculateExpectedR1R2(liveSize, cpcSize, lengthM);
    const expectedZs = expectedR1R2 + 0.35; // Add typical Ze (0.35Ω for TNS)
    
    // Determine protective device details
    const deviceParts = circuit.protectiveDevice.split(" ");
    const deviceType = deviceParts[0] || "MCB";
    const curve = circuit.protectiveDeviceCurve || deviceParts[1]?.charAt(0) || "B";
    const rating = circuit.protectiveDeviceRating;
    
    const maxZs = circuit.maxZs || getMaxZsForDevice(deviceType, curve, rating);
    
    // Reference method mapping
    const refMethodMap: Record<string, string> = {
      "A1": "A1 (Enclosed conduit in thermally insulated wall)",
      "A2": "A2 (Enclosed conduit on wall)",
      "B": "B (Enclosed in conduit on wall)",
      "C": "C (Direct in thermal insulation)",
      "100": "100 (Clipped direct)",
      "101": "101 (On cable tray)",
      "102": "102 (Clipped direct horizontal)",
      "103": "103 (Clipped direct vertical)",
    };
    
    // Use actual kaRating from circuit data, or default to 6kA
    const kaRating = circuit.protectiveDeviceKaRating ?? 6;
    // Detect ring circuit from either flag or topology
    const isRing = circuit.isRingCircuit || circuit.circuitTopology === 'ring';
    // Get actual RCD rating if available
    const rcdRatingValue = circuit.rcdRating ? `${circuit.rcdRating}mA` : '30mA';

    const eicCircuit: EICCircuitData = {
      circuitNumber: `C${circuit.circuitNumber}`,
      phaseType: circuit.phases === "three" ? "three" : "single",
      circuitDescription: mapLoadTypeToCircuitDescription(circuit.loadType, circuit.description),
      referenceMethod: refMethodMap[circuit.installationMethod] || circuit.installationMethod,
      pointsServed: circuit.loadType === "lighting" ? "Multiple" : "As designed",
      liveSize: `${liveSize}mm²`,
      cpcSize: `${cpcSize}mm²`,
      protectiveDeviceType: deviceType,
      protectiveDeviceCurve: curve,
      protectiveDeviceRating: `${rating}A`,
      protectiveDeviceKaRating: `${kaRating}kA`,
      bsStandard: getBSStandard(deviceType),

      // Expected test values
      r1r2: `${expectedR1R2.toFixed(3)}Ω (expected)`,
      insulationTestVoltage: circuit.phases === "single" ? "500V DC" : "500V DC",
      insulationResistance: "≥1.0MΩ (min), expect >50MΩ",
      polarity: "Correct (verify on-site)",
      zs: `${expectedZs.toFixed(3)}Ω (expected)`,
      maxZs: `${maxZs.toFixed(2)}Ω`,
      pfc: "To be tested",
      functionalTesting: "To be tested",
    };

    // Ring circuit fields
    if (isRing) {
      const ringR1Expected = (CONDUCTOR_RESISTANCE[liveSize] / 1000) * lengthM * 1.38;
      eicCircuit.ringR1 = `${ringR1Expected.toFixed(3)}Ω (expected)`;
      eicCircuit.ringRn = `${ringR1Expected.toFixed(3)}Ω (expected)`;
      eicCircuit.ringR2 = `${((CONDUCTOR_RESISTANCE[cpcSize] / 1000) * lengthM * 1.38).toFixed(3)}Ω (expected)`;
      eicCircuit.ringContinuityLive = "To be tested";
      eicCircuit.ringContinuityNeutral = "To be tested";
    }

    // RCD fields
    if (circuit.rcdProtection) {
      eicCircuit.rcdRating = rcdRatingValue;
      eicCircuit.rcdOneX = "To be tested (≤300ms)";
      eicCircuit.rcdTestButton = "To be tested";
    }

    // AFDD fields
    if (circuit.afddRequired) {
      eicCircuit.afddTest = "To be tested";
    }

    return eicCircuit;
  });
  
  return {
    installationId: installationDetails.conversationId,
    installationAddress: installationDetails.address,
    designerName: installationDetails.designerName,
    designDate: new Date().toISOString().split("T")[0],
    circuits: eicCircuits,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
}
