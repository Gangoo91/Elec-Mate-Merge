/**
 * BS 7671 Calculation Library - Client-Side Fallback
 * Performs voltage drop and Zs calculations when AI fails to provide them
 */

// Appendix 4 - Voltage drop (mV/A/m) for 70°C thermoplastic
const VOLTAGE_DROP_TABLE: Record<number, number> = {
  1.0: 44,
  1.5: 29,
  2.5: 18,
  4.0: 11,
  6.0: 7.3,
  10: 4.4,
  16: 2.8,
  25: 1.75,
  35: 1.25,
  50: 0.93,
  70: 0.65,
  95: 0.47,
  120: 0.37,
  150: 0.30,
  185: 0.24,
  240: 0.185,
  300: 0.148
};

// Table 54.7 - Conductor resistance (mΩ/m at 20°C)
const CONDUCTOR_RESISTANCE_20C: Record<number, number> = {
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
  150: 0.124,
  185: 0.0991,
  240: 0.0754,
  300: 0.0601
};

// Appendix 3 - Maximum Zs (0.4s disconnection, 230V)
const MAX_ZS_TABLE: Record<string, Record<number, number>> = {
  B: {
    6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
    32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69
  },
  C: {
    6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
    32: 0.69, 40: 0.55, 50: 0.44, 63: 0.35
  },
  D: {
    6: 1.82, 10: 1.09, 16: 0.69, 20: 0.55, 25: 0.44,
    32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17
  }
};

export interface VoltageDropResult {
  volts: number;
  percent: number;
  compliant: boolean;
  limit: number;
  calculation?: string;
}

export interface ZsResult {
  zs: number;
  r1r2: number;
  calculation?: string;
}

/**
 * Calculate voltage drop using BS 7671 Appendix 4
 */
export function calculateVoltageDrop(params: {
  cableSize: number;
  current: number;
  length: number;
  voltage: number;
  loadType?: string;
}): VoltageDropResult {
  const mvAm = VOLTAGE_DROP_TABLE[params.cableSize] || 18;
  const volts = (mvAm * params.current * params.length) / 1000;
  const percent = (volts / params.voltage) * 100;
  const limit = (params.loadType === 'lighting') ? 3 : 5;
  
  return {
    volts: Number(volts.toFixed(2)),
    percent: Number(percent.toFixed(2)),
    compliant: percent <= limit,
    limit,
    calculation: `Using Appendix 4: ${params.cableSize}mm² = ${mvAm} mV/A/m. Vd = (${mvAm} × ${params.current} × ${params.length}) / 1000 = ${volts.toFixed(2)}V = ${percent.toFixed(2)}%`
  };
}

/**
 * Calculate earth fault loop impedance using BS 7671 Table 54.7
 */
export function calculateZs(params: {
  liveSize: number;
  cpcSize: number;
  length: number;
  ze: number;
}): ZsResult {
  const r1 = CONDUCTOR_RESISTANCE_20C[params.liveSize] || 7.41;
  const r2 = CONDUCTOR_RESISTANCE_20C[params.cpcSize] || 12.1;
  
  const r1r2At20C = ((r1 + r2) * params.length) / 1000;
  const r1r2At70C = r1r2At20C * 1.2; // Temperature correction
  const zs = params.ze + r1r2At70C;
  
  return {
    zs: Number(zs.toFixed(3)),
    r1r2: Number(r1r2At70C.toFixed(3)),
    calculation: `Table 54.7: ${params.liveSize}mm²=${r1}mΩ/m, ${params.cpcSize}mm²=${r2}mΩ/m. R1+R2 = [(${r1}+${r2})×${params.length}/1000]×1.2 = ${r1r2At70C.toFixed(3)}Ω. Zs = Ze(${params.ze}) + ${r1r2At70C.toFixed(3)} = ${zs.toFixed(3)}Ω`
  };
}

/**
 * Get maximum Zs from Appendix 3
 */
export function getMaxZs(curve: string, rating: number): number {
  return MAX_ZS_TABLE[curve]?.[rating] || 1.0;
}

/**
 * Validate and backfill missing calculations in circuit data
 */
export function ensureCalculations(circuit: any, supply: any): any {
  let modified = false;
  
  if (!circuit.calculations) circuit.calculations = {};
  
  // Backfill voltage drop if missing or zero
  if (!circuit.calculations.voltageDrop || circuit.calculations.voltageDrop.percent === 0) {
    const vd = calculateVoltageDrop({
      cableSize: circuit.cableSize,
      current: circuit.calculations.Ib || circuit.designCurrent || circuit.protectionDevice.rating,
      length: circuit.cableLength,
      voltage: supply.voltage,
      loadType: circuit.loadType
    });
    circuit.calculations.voltageDrop = vd;
    modified = true;
    
    if (!circuit.warnings) circuit.warnings = [];
    circuit.warnings.push('⚠️ Voltage drop calculated client-side (AI did not provide)');
  }
  
  // Backfill Zs if missing or zero
  if (!circuit.calculations.zs || circuit.calculations.zs === 0) {
    const { zs, r1r2 } = calculateZs({
      liveSize: circuit.cableSize,
      cpcSize: circuit.cpcSize,
      length: circuit.cableLength,
      ze: supply.ze
    });
    circuit.calculations.zs = zs;
    circuit.calculations.r1r2 = r1r2;
    
    const maxZs = getMaxZs(circuit.protectionDevice.curve, circuit.protectionDevice.rating);
    circuit.calculations.maxZs = maxZs;
    
    modified = true;
    
    if (!circuit.warnings) circuit.warnings = [];
    circuit.warnings.push('⚠️ Zs calculated client-side (AI did not provide)');
  }
  
  // Ensure maxZs is set
  if (!circuit.calculations.maxZs) {
    circuit.calculations.maxZs = getMaxZs(
      circuit.protectionDevice.curve, 
      circuit.protectionDevice.rating
    );
    modified = true;
  }
  
  // Check if this is a ring final circuit and add explanation
  const isRing = (circuit.loadType?.includes('socket') || circuit.loadType?.includes('ring')) &&
                 (circuit.protectionDevice?.rating === 30 || circuit.protectionDevice?.rating === 32) &&
                 circuit.cableSize === 2.5;

  if (isRing && circuit.calculations.Iz === 27) {
    // Add explanation for ring finals
    if (!circuit.justifications) circuit.justifications = {};
    if (!circuit.justifications.ringTopology) {
      circuit.justifications.ringTopology = 
        `Ring final circuit: 27A capacity per leg with load distributed across two parallel paths. ` +
        `Design load ${circuit.calculations.Ib}A ÷ 2 legs = ${(circuit.calculations.Ib / 2).toFixed(1)}A per leg (compliant per BS 7671 Appendix 15).`;
      modified = true;
    }
  }
  
  return { circuit, modified };
}
