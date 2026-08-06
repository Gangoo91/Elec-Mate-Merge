// Battery Backup Runtime Calculator - Core Logic
// Referenced against BS 7671:2018+A4:2026 Chapter 57 (Stationary secondary batteries),
// Section 560 (Safety services) and Appendix 9 Table 9A (conductor resistance).
//
// NOTE ON SCOPE (Reg 570.1): Chapter 57 gives requirements for stationary secondary battery
// installations used as a source of supply. It does NOT apply to batteries wholly within
// pluggable UPS to BS EN IEC 62040, central safety power supplies to BS EN 50171, fire
// detection/alarm to BS 5839, alarm systems to BS EN 50132, machinery to BS EN IEC 60204, or
// emergency lighting to BS 5266. Those systems follow their own product standards.

import { standardDeviceRatings } from '@/lib/calculators/bs7671-data';

export interface BatteryChemistry {
  name: string;
  defaultDoD: number;
  peukertExponent: number;
  maxCRate: number;
  chargeEfficiency: number;
  // Capacity lost per °C below the 25 °C reference. Only ever applied as a LOSS — see
  // TEMP_DERATING_CEILING below.
  temperatureCoeff: number; // %/°C below 25°C
  minChargeRate: number;
  maxChargeRate: number;
}

export interface InverterType {
  name: string;
  efficiency: number;
  defaultHeadroom: number;
  description: string;
}

export interface LoadPreset {
  name: string;
  watts: number;
  dutyCycle: number;
  surgeMultiplier: number;
  category: 'essential' | 'important' | 'convenience';
  description: string;
}

export interface BatteryInputs {
  mode: 'runtime' | 'sizing';

  // Battery configuration
  chemistry: string;
  nominalVoltage: number;
  capacityAh: number;
  seriesStrings: number;
  parallelStrings: number;
  customDoD?: number;
  customPeukert?: number;

  // Environmental
  ambientTemp: number;
  batteryHealth: number; // 70-100%

  // Loads
  loads: Array<{
    name: string;
    watts: number;
    dutyCycle: number;
    surgeMultiplier: number;
    priority: 'essential' | 'important' | 'convenience';
  }>;

  // Inverter
  inverterType: string;
  customEfficiency?: number;
  customHeadroom?: number;

  // DC system
  dcCableLength: number;
  maxVoltDrop: number;

  // For sizing mode
  requiredRuntime?: number;
}

export interface CalculationResults {
  // Load analysis
  averagePower: number;
  peakPower: number;
  surgePower: number;
  loadsByPriority: {
    essential: number;
    important: number;
    convenience: number;
  };

  // Battery bank
  bankVoltage: number;
  bankCapacityAh: number;
  bankEnergyWh: number;
  usableEnergyWh: number;

  // DC calculations
  dcCurrent: number;
  cRate: number;
  effectiveCapacity: number;

  // Results
  runtime: number; // hours
  requiredAh?: number; // for sizing mode

  // Inverter sizing
  recommendedWatts: number;
  recommendedVA: number;
  surgeCapability: number;

  // Charging
  recommendedChargeAmps: number;
  rechargeTime: number;

  // DC protection
  recommendedFuse: number;
  recommendedCableSize: string;
  actualVoltDrop: number;

  // Status and warnings
  warnings: string[];
  recommendations: string[];
  complianceNotes: string[];
}

// Chemistry database
export const BATTERY_CHEMISTRIES: Record<string, BatteryChemistry> = {
  'lead-acid-flooded': {
    name: 'Lead-Acid Flooded',
    defaultDoD: 0.5,
    peukertExponent: 1.3,
    maxCRate: 0.2,
    chargeEfficiency: 0.85,
    temperatureCoeff: 0.5,
    minChargeRate: 0.05,
    maxChargeRate: 0.15,
  },
  'lead-acid-agm': {
    name: 'Lead-Acid AGM/GEL',
    defaultDoD: 0.5,
    peukertExponent: 1.2,
    maxCRate: 0.3,
    chargeEfficiency: 0.88,
    temperatureCoeff: 0.3,
    minChargeRate: 0.05,
    maxChargeRate: 0.2,
  },
  'lithium-lfp': {
    name: 'Lithium LFP',
    defaultDoD: 0.8,
    peukertExponent: 1.05,
    maxCRate: 1.0,
    chargeEfficiency: 0.95,
    temperatureCoeff: 0.1,
    minChargeRate: 0.2,
    maxChargeRate: 0.5,
  },
  'lithium-nmc': {
    name: 'Lithium NMC',
    defaultDoD: 0.8,
    peukertExponent: 1.1,
    maxCRate: 2.0,
    chargeEfficiency: 0.93,
    temperatureCoeff: 0.2,
    minChargeRate: 0.2,
    maxChargeRate: 0.7,
  },
};

// Inverter types
export const INVERTER_TYPES: Record<string, InverterType> = {
  'line-interactive': {
    name: 'Line Interactive',
    efficiency: 0.92,
    defaultHeadroom: 0.25,
    description: 'Good for most applications',
  },
  'online-double': {
    name: 'Online Double Conversion',
    efficiency: 0.88,
    defaultHeadroom: 0.2,
    description: 'Continuous protection',
  },
  transformerless: {
    name: 'Transformerless',
    efficiency: 0.95,
    defaultHeadroom: 0.25,
    description: 'High efficiency',
  },
};

// Load presets
export const LOAD_PRESETS: LoadPreset[] = [
  {
    name: 'LED Light 10W',
    watts: 10,
    dutyCycle: 1.0,
    surgeMultiplier: 1.0,
    category: 'essential',
    description: 'Emergency lighting',
  },
  {
    name: 'Wi-Fi Router',
    watts: 12,
    dutyCycle: 1.0,
    surgeMultiplier: 1.2,
    category: 'important',
    description: 'Network connectivity',
  },
  {
    name: 'Desktop PC',
    watts: 150,
    dutyCycle: 0.6,
    surgeMultiplier: 1.5,
    category: 'important',
    description: 'Office workstation',
  },
  {
    name: 'Laptop',
    watts: 65,
    dutyCycle: 0.8,
    surgeMultiplier: 1.0,
    category: 'important',
    description: 'Portable computer',
  },
  {
    name: 'Fridge/Freezer',
    watts: 120,
    dutyCycle: 0.3,
    surgeMultiplier: 4.0,
    category: 'essential',
    description: 'Food preservation',
  },
  {
    name: 'Sump Pump',
    watts: 600,
    dutyCycle: 0.1,
    surgeMultiplier: 6.0,
    category: 'essential',
    description: 'Flood prevention',
  },
  {
    name: 'Security System',
    watts: 25,
    dutyCycle: 1.0,
    surgeMultiplier: 1.0,
    category: 'essential',
    description: 'Alarm panel + cameras',
  },
  {
    name: 'Server Rack 1U',
    watts: 200,
    dutyCycle: 1.0,
    surgeMultiplier: 2.0,
    category: 'essential',
    description: 'Critical IT equipment',
  },
  {
    name: 'Heating Circulator',
    watts: 80,
    dutyCycle: 0.4,
    surgeMultiplier: 3.0,
    category: 'important',
    description: 'Central heating pump',
  },
];

// FIX (consolidation): this file previously inlined its own fuse-size list which contained 5 A
// and 13 A — neither is a standard BS 88 fuse rating (13 A is the BS 1362 plug fuse). Now taken
// from the shared BS 7671 dataset so it cannot drift again.
const STANDARD_FUSE_SIZES = standardDeviceRatings.bs88;

// Peukert gain ceiling.
// Peukert's equation has no BS 7671 source, and extrapolating it to very light loads manufactures
// capacity the cell does not have. Manufacturers publish a longest rate (typically C100) that is
// only about 1.15–1.25 × the C20 figure. BS 7671 Reg 570.5.1 requires battery capacity to be
// selected on "charge time and discharge time" and "battery charge and discharge profiles" —
// i.e. the manufacturer's published discharge data, not an unbounded exponent. Gain is therefore
// capped here; losses at high discharge rates remain uncapped.
const MAX_PEUKERT_GAIN = 1.25;

// Temperature factor ceiling.
// temperatureCoeff describes capacity LOST below the 25 °C reference. The model previously ran
// the same straight line upwards, awarding extra capacity for heat without limit. BS 7671
// Reg 570.6.3 (and its NOTE) treats temperature as something to be controlled to stay inside the
// manufacturer's range — heat is a damage mechanism, not a capacity bonus. Capped at 1.0.
const TEMP_DERATING_CEILING = 1.0;

// Conductor operating-temperature correction.
// The resistances below are Appendix 9 Table 9A copper values at 20 °C. Volt drop has to be
// assessed at conductor operating temperature, so the 20 °C resistance is multiplied by the
// standard 1.20 correction (the same factor used to predict R1+R2 at operating temperature).
const CONDUCTOR_TEMP_CORRECTION = 1.2;

// Cable sizes and current ratings.
// resistance = mΩ/m at 20 °C, BS 7671 Appendix 9 Table 9A (copper).
// ⚠️ `rating` here is a bare tabulated figure with NO correction factors applied. Real DC cable
// selection must apply the Appendix 4 correction factors for ambient temperature (Ca), grouping
// (Cg) and thermal insulation (Ci) for the actual reference method — see the compliance notes
// emitted below.
const DC_CABLE_RATINGS = [
  { csa: '1.5mm²', rating: 16, resistance: 12.1 },
  { csa: '2.5mm²', rating: 21, resistance: 7.41 },
  { csa: '4mm²', rating: 28, resistance: 4.61 },
  { csa: '6mm²', rating: 36, resistance: 3.08 },
  { csa: '10mm²', rating: 50, resistance: 1.83 },
  { csa: '16mm²', rating: 68, resistance: 1.15 },
  { csa: '25mm²', rating: 89, resistance: 0.727 },
  { csa: '35mm²', rating: 110, resistance: 0.524 },
  { csa: '50mm²', rating: 134, resistance: 0.387 },
];

export function calculateBatteryBackup(inputs: BatteryInputs): CalculationResults {
  const chemistry = BATTERY_CHEMISTRIES[inputs.chemistry];
  const inverterType = INVERTER_TYPES[inputs.inverterType];

  if (!chemistry || !inverterType) {
    throw new Error('Invalid chemistry or inverter type');
  }

  const warnings: string[] = [];
  const recommendations: string[] = [];
  const complianceNotes: string[] = [];

  // Calculate load analysis
  const totalWatts = inputs.loads.reduce((sum, load) => sum + load.watts * load.dutyCycle, 0);
  const peakWatts = inputs.loads.reduce((sum, load) => sum + load.watts, 0);
  const surgeWatts = inputs.loads.reduce((sum, load) => sum + load.watts * load.surgeMultiplier, 0);

  const loadsByPriority = {
    essential: inputs.loads
      .filter((l) => l.priority === 'essential')
      .reduce((sum, load) => sum + load.watts * load.dutyCycle, 0),
    important: inputs.loads
      .filter((l) => l.priority === 'important')
      .reduce((sum, load) => sum + load.watts * load.dutyCycle, 0),
    convenience: inputs.loads
      .filter((l) => l.priority === 'convenience')
      .reduce((sum, load) => sum + load.watts * load.dutyCycle, 0),
  };

  // Battery bank configuration
  const bankVoltage = inputs.nominalVoltage * inputs.seriesStrings;
  const bankCapacityAh = inputs.capacityAh * inputs.parallelStrings;
  const bankEnergyWh = bankVoltage * bankCapacityAh;

  // Environmental adjustments
  // FIX: clamped at 1.0. Previously this ran linearly and unbounded in both directions, so a
  // warm battery room was credited with extra capacity (Reg 570.6.3 — temperature is controlled
  // to protect the battery, it is not a capacity bonus).
  const tempDerating = Math.max(
    0,
    Math.min(
      TEMP_DERATING_CEILING,
      1 + (chemistry.temperatureCoeff * (inputs.ambientTemp - 25)) / 100
    )
  );
  const healthFactor = inputs.batteryHealth / 100;
  const doD = inputs.customDoD || chemistry.defaultDoD;
  const peukertExp = inputs.customPeukert || chemistry.peukertExponent;

  // DC current calculation — the inverter draws the AC load plus its own losses from the bank.
  const efficiency = inputs.customEfficiency || inverterType.efficiency;
  const dcLoadWatts = efficiency > 0 ? totalWatts / efficiency : 0;
  const dcCurrent = bankVoltage > 0 ? dcLoadWatts / bankVoltage : 0;
  const cRate = bankCapacityAh > 0 ? dcCurrent / bankCapacityAh : 0;

  // Peukert adjustment (assuming C20 reference)
  // FIX: gain capped at MAX_PEUKERT_GAIN. Unclamped, a light load produced an effectiveCapacity
  // far above nameplate — capacity that does not exist. Losses at high discharge remain uncapped.
  const referenceRate = bankCapacityAh / 20; // C20
  const peukertFactor =
    dcCurrent > 0
      ? Math.min(MAX_PEUKERT_GAIN, Math.pow(referenceRate / dcCurrent, peukertExp - 1))
      : MAX_PEUKERT_GAIN;
  const effectiveCapacity = bankCapacityAh * peukertFactor;

  // Usable energy (DC side of the inverter)
  const usableEnergyWh = bankVoltage * effectiveCapacity * doD * tempDerating * healthFactor;

  // Runtime calculation
  // FIX: inverter efficiency was missing. usableEnergyWh is DC-side energy but totalWatts is the
  // AC load, so dividing one by the other silently assumed a 100% efficient inverter and
  // over-stated runtime by 5–14%. Runtime = usable DC energy ÷ (AC load ÷ inverter efficiency).
  // This now agrees with the sizing branch below and with the published formula
  // Runtime = (Ah × V × efficiency) ÷ load.
  const runtime = dcLoadWatts > 0 ? usableEnergyWh / dcLoadWatts : 0;

  // Sizing mode calculation
  let requiredAh: number | undefined;
  if (inputs.mode === 'sizing' && inputs.requiredRuntime) {
    const requiredEnergyWh = totalWatts * inputs.requiredRuntime;
    requiredAh =
      requiredEnergyWh /
      (bankVoltage * doD * efficiency * tempDerating * healthFactor * peukertFactor);
  }

  // Inverter sizing
  const headroom = inputs.customHeadroom || inverterType.defaultHeadroom;
  const recommendedWatts = Math.ceil(peakWatts * (1 + headroom));
  // FIX: was × 1.2 with the comment "Assume 0.8 PF". VA = W ÷ PF, so 0.8 PF is × 1.25 — the old
  // multiplier corresponded to 0.833 PF and under-sized the inverter by 4%.
  const ASSUMED_POWER_FACTOR = 0.8;
  const recommendedVA = Math.ceil(recommendedWatts / ASSUMED_POWER_FACTOR);
  const surgeCapability = surgeWatts;

  // Charging calculations
  const recommendedChargeAmps = bankCapacityAh * chemistry.minChargeRate;
  const maxChargeAmps = bankCapacityAh * chemistry.maxChargeRate;
  const energyToRestore = bankEnergyWh * doD;
  const rechargeTime =
    energyToRestore / (bankVoltage * recommendedChargeAmps * chemistry.chargeEfficiency);

  // DC protection and cabling
  const maxDcCurrent = dcCurrent * 1.25; // 125% for protection
  const recommendedFuse =
    STANDARD_FUSE_SIZES.find((size) => size >= maxDcCurrent) ??
    STANDARD_FUSE_SIZES[STANDARD_FUSE_SIZES.length - 1];

  // Cable sizing
  // FIX (Reg 433.1.1 — Ib ≤ In ≤ Iz): the cable was previously checked against the design current
  // Ib alone, which skips the device step and can leave the protective device rated above the
  // cable. The tabulated rating is now compared with the selected device rating In.
  // FIX: volt drop is evaluated at conductor operating temperature (Table 9A resistance is 20 °C).
  const largestCable = DC_CABLE_RATINGS[DC_CABLE_RATINGS.length - 1];
  let recommendedCableSize = `> ${largestCable.csa} — specialist DC design required`;
  let actualVoltDrop = 0;
  let cableFound = false;

  for (const cable of DC_CABLE_RATINGS) {
    const rOperating = cable.resistance * CONDUCTOR_TEMP_CORRECTION;
    const drop = ((2 * inputs.dcCableLength * dcCurrent * rOperating) / (1000 * bankVoltage)) * 100;
    if (drop <= inputs.maxVoltDrop && recommendedFuse <= cable.rating) {
      recommendedCableSize = cable.csa;
      actualVoltDrop = drop;
      cableFound = true;
      break;
    }
  }

  if (!cableFound) {
    // Report the volt drop of the largest listed size so the figure shown is real, not a placeholder.
    actualVoltDrop =
      ((2 *
        inputs.dcCableLength *
        dcCurrent *
        largestCable.resistance *
        CONDUCTOR_TEMP_CORRECTION) /
        (1000 * bankVoltage)) *
      100;
    warnings.push(
      `No listed DC cable satisfies both the ${recommendedFuse} A device rating and the ${inputs.maxVoltDrop}% volt drop target — size the DC cabling by specific design.`
    );
  }

  // Generate warnings and recommendations
  if (cRate > chemistry.maxCRate) {
    warnings.push(
      `C-rate (${cRate.toFixed(2)}C) exceeds recommended maximum (${chemistry.maxCRate}C) for ${chemistry.name}`
    );
    recommendations.push('Consider larger battery bank or higher voltage system to reduce current');
  }

  if (doD > 0.5 && inputs.chemistry.includes('lead-acid')) {
    warnings.push('Deep discharge (>50%) will significantly reduce lead-acid battery life');
    recommendations.push('Consider lithium batteries for deep cycling applications');
  }

  if (inputs.parallelStrings > 3) {
    warnings.push('Multiple parallel strings (>3) can cause balancing issues');
    recommendations.push('Use battery balancers or consider higher voltage system');
  }

  if (actualVoltDrop > inputs.maxVoltDrop) {
    warnings.push(
      `Voltage drop (${actualVoltDrop.toFixed(1)}%) exceeds target (${inputs.maxVoltDrop}%)`
    );
    recommendations.push('Use larger cable size or reduce cable length');
  }

  if (inputs.ambientTemp < 10) {
    warnings.push('Low ambient temperature will reduce battery capacity and runtime');
    recommendations.push('Consider battery heating or insulation in cold environments');
  }

  // Compliance notes — BS 7671:2018+A4:2026 Chapter 57 (stationary secondary batteries) and
  // Section 560 (safety services). Chapter 57 was introduced by A4:2026; see the scope note at
  // the top of this file for what it excludes.
  complianceNotes.push('AC circuits: Follow BS 7671 for protection, cable sizing, and earthing');
  complianceNotes.push(
    'Chapter 57 applies to stationary secondary batteries supplying an installation. Reg 570.1 excludes batteries wholly inside pluggable UPS (BS EN IEC 62040), central safety power supplies (BS EN 50171), fire alarm (BS 5839) and emergency lighting (BS 5266) systems.'
  );
  complianceNotes.push(
    'Reg 570.6.1.1.1: The battery installation shall conform to the relevant parts of the BS EN IEC 62485 series.'
  );
  complianceNotes.push(
    // FIX: previously stated only for lead-acid. Reg 570.6.3 requires the location or enclosure of
    // stationary secondary batteries to be adequately ventilated irrespective of chemistry.
    "Reg 570.6.3 and 570.6.7.202: The location or enclosure shall be adequately ventilated for ALL stationary secondary batteries regardless of chemistry, taking account of the manufacturer's instructions and safety data sheets. Ventilation shall not itself create a hazard and may need to discharge outdoors."
  );
  complianceNotes.push(
    'Reg 570.6.3 NOTE: Heating or cooling may also be needed to hold the battery inside the temperature range the manufacturer specifies.'
  );
  complianceNotes.push(
    'Reg 570.6.2.2: Where an RCD protects the AC supply circuit it shall be Type B to BS EN 62423 or BS EN 60947-2, unless the PCE provides at least simple separation between AC and DC sides, simple separation is provided by separate transformer windings, or the PCE manufacturer states Type B is not required.'
  );
  complianceNotes.push(
    'Reg 570.6.2.1.201: Battery connections shall have basic protection by insulation or enclosure, or be arranged so parts with more than 120 V between them cannot be touched simultaneously.'
  );
  complianceNotes.push(
    'Reg 570.6.5: Every power circuit connecting to the battery shall have means of isolation conforming to Section 462 — likely required at both ends of the circuit.'
  );
  complianceNotes.push(
    // FIX: the DC OCPD note previously invented a "within 0.5 m of battery terminals" rule that
    // BS 7671 does not state. Replaced with the actual Chapter 57 requirement.
    'Reg 570.6.7.201: Fuses in DC battery circuits shall be accessible only by key or tool, or removable only after opening a means of isolation suitable for on-load DC isolation.'
  );
  complianceNotes.push(
    'DC cable sizing: the tabulated ratings used here carry no correction factors. Apply the BS 7671 Appendix 4 factors for ambient temperature (Ca), grouping (Cg) and thermal insulation (Ci) for the actual reference method before accepting a size.'
  );
  complianceNotes.push(
    'Reg 560.6.12: An uninterruptible power system shall conform to BS EN 50171 in addition to the BS EN IEC 62040 series.'
  );
  complianceNotes.push(
    'Reg 570.6.8.201/.202/.203: Warning notices are required at the origin, at remote metering positions and at each board fed from the battery; at every access point to a battery room or enclosure ("live parts can remain energised after isolation"); and on all PCE ("isolate both AC and DC sides before servicing").'
  );

  if (inputs.chemistry.includes('lead-acid')) {
    complianceNotes.push(
      // FIX: previously cited "BS 7671 Sect 721", which is Electrical Installations in Caravans
      // and Motor Caravans — nothing to do with batteries.
      'Lead-acid: gas evolution must be considered at selection (Reg 570.5.1). Batteries that can evolve flammable or combustible gases shall be sited at a safe distance from equipment liable to arc, spark or flame in normal use (Reg 570.6.7.202). Electrolyte containment follows the BS EN IEC 62485 series.'
    );
  } else {
    complianceNotes.push(
      "Lithium: adequate ventilation is still required (Reg 570.6.3) — it is not a lead-acid-only measure. Follow the manufacturer's spacing, thermal-management and fire-separation instructions (Reg 570.6.7)."
    );
  }

  complianceNotes.push(
    'Reg 570.6.7.203: In dwellings the battery location shall take account of the manufacturer’s instructions and PAS 63100. In other premises location and fire protection follow the fire strategy for the premises.'
  );
  complianceNotes.push(
    'Testing: Regular battery and UPS testing per IET Code of Practice for EESS'
  );
  complianceNotes.push(
    'Labelling: All DC circuits must be clearly labelled with voltage and polarity'
  );

  return {
    averagePower: totalWatts,
    peakPower: peakWatts,
    surgePower: surgeWatts,
    loadsByPriority,
    bankVoltage,
    bankCapacityAh,
    bankEnergyWh,
    usableEnergyWh,
    dcCurrent,
    cRate,
    effectiveCapacity,
    runtime,
    requiredAh,
    recommendedWatts,
    recommendedVA,
    surgeCapability,
    recommendedChargeAmps: Math.min(recommendedChargeAmps, maxChargeAmps),
    rechargeTime,
    recommendedFuse,
    recommendedCableSize,
    actualVoltDrop,
    warnings,
    recommendations,
    complianceNotes,
  };
}

// Helper functions for UI
export function formatRuntime(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  } else if (hours < 24) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  } else {
    const d = Math.floor(hours / 24);
    const h = Math.round(hours % 24);
    return h > 0 ? `${d}d ${h}h` : `${d}d`;
  }
}

export function getChemistryColor(chemistry: string): string {
  if (chemistry.includes('lithium')) return 'elec-yellow';
  if (chemistry.includes('agm')) return 'blue';
  return 'orange';
}

export function getStatusColor(
  value: number,
  goodThreshold: number,
  warningThreshold: number
): 'success' | 'warning' | 'error' {
  if (value >= goodThreshold) return 'success';
  if (value >= warningThreshold) return 'warning';
  return 'error';
}
