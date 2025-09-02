// BS 7671 18th Edition compliant transformer calculations

export interface TransformerInputs {
  primaryVoltage: number;
  secondaryVoltage: number;
  kvaRating: number;
  powerFactor: number;
  phase: 'single' | 'three';
  frequency: number;
  percentImpedance: number;
  rPercent?: number;
  xPercent?: number;
  sourceFaultLevel?: number;
  ambientTemp?: number;
  altitude?: number;
  harmonics?: boolean;
  tapPosition?: number;
  connectionType?: string;
}

export interface TransformerResults {
  // Basic ratios
  voltageRatio: number;
  currentRatio: number;
  transformerType: 'step-up' | 'step-down' | 'isolation';
  
  // Currents
  primaryRatedCurrent: number;
  secondaryRatedCurrent: number;
  primaryFullLoadCurrent: number;
  secondaryFullLoadCurrent: number;
  
  // Power calculations
  kw: number;
  kva: number;
  kvar: number;
  
  // Fault calculations
  transformerFaultCurrent: number;
  combinedFaultCurrent?: number;
  
  // Performance
  voltageRegulation: number;
  efficiency: number;
  copperLoss: number;
  ironLoss: number;
  totalLoss: number;
  
  // Inrush
  inrushCurrent: number;
  inrushDuration: number;
  
  // Derating
  temperatureDerating?: number;
  altitudeDerating?: number;
  harmonicDerating?: number;
  
  // Recommendations
  recommendations: string[];
  warnings: string[];
}

export function calculateTransformer(inputs: TransformerInputs): TransformerResults {
  const {
    primaryVoltage,
    secondaryVoltage,
    kvaRating,
    powerFactor,
    phase,
    frequency,
    percentImpedance,
    rPercent = percentImpedance * 0.3, // Typical R/X ratio
    xPercent = percentImpedance * 0.95,
    sourceFaultLevel,
    ambientTemp = 40,
    altitude = 0,
    harmonics = false,
    tapPosition = 0,
    connectionType = 'Dyn11'
  } = inputs;

  // Basic ratios
  const voltageRatio = primaryVoltage / secondaryVoltage;
  const currentRatio = 1 / voltageRatio;
  const transformerType: 'step-up' | 'step-down' | 'isolation' = 
    voltageRatio > 1.1 ? 'step-down' : 
    voltageRatio < 0.9 ? 'step-up' : 'isolation';

  // Current calculations
  const phaseMultiplier = phase === 'three' ? Math.sqrt(3) : 1;
  const primaryRatedCurrent = (kvaRating * 1000) / (primaryVoltage * phaseMultiplier);
  const secondaryRatedCurrent = (kvaRating * 1000) / (secondaryVoltage * phaseMultiplier);
  
  // Power calculations
  const kw = kvaRating * powerFactor;
  const kvar = kvaRating * Math.sin(Math.acos(powerFactor));
  
  const primaryFullLoadCurrent = primaryRatedCurrent * powerFactor;
  const secondaryFullLoadCurrent = secondaryRatedCurrent * powerFactor;

  // Fault current calculations (BS 7671)
  const impedanceBase = (secondaryVoltage * secondaryVoltage) / (kvaRating * 1000);
  const transformerImpedance = (percentImpedance / 100) * impedanceBase;
  const transformerFaultCurrent = secondaryVoltage / (Math.sqrt(3) * transformerImpedance);
  
  let combinedFaultCurrent: number | undefined;
  if (sourceFaultLevel) {
    const sourceImpedance = (secondaryVoltage * secondaryVoltage) / (sourceFaultLevel * 1000000);
    const totalImpedance = sourceImpedance + transformerImpedance;
    combinedFaultCurrent = secondaryVoltage / (Math.sqrt(3) * totalImpedance);
  }

  // Efficiency and losses (realistic values based on rating)
  let efficiency: number;
  let copperLoss: number;
  let ironLoss: number;

  if (kvaRating <= 25) {
    efficiency = Math.min(0.95, 0.88 + (kvaRating / 250)); // Small transformers: 88-95%
    copperLoss = kvaRating * 0.035;
    ironLoss = kvaRating * 0.015;
  } else if (kvaRating <= 500) {
    efficiency = Math.min(0.975, 0.92 + (kvaRating / 1250)); // Medium: 92-97.5%
    copperLoss = kvaRating * 0.025;
    ironLoss = kvaRating * 0.010;
  } else {
    efficiency = Math.min(0.985, 0.96 + (kvaRating / 5000)); // Large: 96-98.5%
    copperLoss = kvaRating * 0.015;
    ironLoss = kvaRating * 0.008;
  }

  const totalLoss = copperLoss + ironLoss;

  // Voltage regulation
  const voltageRegulation = (rPercent * powerFactor + xPercent * Math.sin(Math.acos(powerFactor))) / 100;

  // Inrush current (BS 7671 typical values)
  const inrushCurrent = primaryRatedCurrent * (kvaRating < 100 ? 12 : kvaRating < 500 ? 10 : 8);
  const inrushDuration = 0.1; // seconds

  // Derating factors
  let temperatureDerating: number | undefined;
  let altitudeDerating: number | undefined;
  let harmonicDerating: number | undefined;

  if (ambientTemp > 40) {
    temperatureDerating = Math.max(0.8, 1 - ((ambientTemp - 40) * 0.01));
  }

  if (altitude > 1000) {
    altitudeDerating = Math.max(0.9, 1 - ((altitude - 1000) / 10000));
  }

  if (harmonics) {
    harmonicDerating = 0.86; // K-factor derating
  }

  // Recommendations and warnings
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // Protection recommendations
  if (kvaRating >= 500) {
    recommendations.push("Consider differential protection for transformers ≥500kVA");
  }
  
  if (transformerFaultCurrent > 25000) {
    recommendations.push("High fault current - verify switchgear rating");
  }

  if (voltageRegulation > 0.05) {
    warnings.push("High voltage regulation - consider tap changer");
  }

  if (inrushCurrent > primaryRatedCurrent * 15) {
    recommendations.push("High inrush current - consider soft-start or pre-insertion resistors");
  }

  // Temperature warnings
  if (temperatureDerating && temperatureDerating < 0.9) {
    warnings.push("High ambient temperature requires derating");
  }

  if (altitudeDerating && altitudeDerating < 0.95) {
    warnings.push("High altitude installation requires derating");
  }

  if (harmonics) {
    recommendations.push("K-factor rated transformer recommended for harmonic loads");
  }

  // BS 7671 specific recommendations
  if (phase === 'three' && connectionType.includes('N')) {
    recommendations.push("Neutral earthing required for Yn connections (BS 7671 411.3)");
  }

  if (kvaRating >= 1000) {
    recommendations.push("Oil containment required for oil-filled transformers >1MVA (BS 7671)");
  }

  return {
    voltageRatio,
    currentRatio,
    transformerType,
    primaryRatedCurrent,
    secondaryRatedCurrent,
    primaryFullLoadCurrent,
    secondaryFullLoadCurrent,
    kw,
    kva: kvaRating,
    kvar,
    transformerFaultCurrent,
    combinedFaultCurrent,
    voltageRegulation,
    efficiency,
    copperLoss,
    ironLoss,
    totalLoss,
    inrushCurrent,
    inrushDuration,
    temperatureDerating,
    altitudeDerating,
    harmonicDerating,
    recommendations,
    warnings
  };
}

// Common transformer presets
export const transformerPresets = {
  voltages: {
    primary: [
      { value: '11000', label: '11kV' },
      { value: '6600', label: '6.6kV' },
      { value: '3300', label: '3.3kV' },
      { value: '1000', label: '1kV' },
      { value: '415', label: '415V' },
      { value: '230', label: '230V' }
    ],
    secondary: [
      { value: '415', label: '415V' },
      { value: '230', label: '230V' },
      { value: '110', label: '110V' },
      { value: '24', label: '24V' },
      { value: '12', label: '12V' }
    ]
  },
  kvaRatings: [
    { value: '5', label: '5 kVA' },
    { value: '10', label: '10 kVA' },
    { value: '25', label: '25 kVA' },
    { value: '50', label: '50 kVA' },
    { value: '100', label: '100 kVA' },
    { value: '200', label: '200 kVA' },
    { value: '315', label: '315 kVA' },
    { value: '500', label: '500 kVA' },
    { value: '800', label: '800 kVA' },
    { value: '1000', label: '1 MVA' },
    { value: '1600', label: '1.6 MVA' },
    { value: '2500', label: '2.5 MVA' }
  ],
  connections: [
    { value: 'Dyn11', label: 'Dyn11 (Star-Delta)' },
    { value: 'Dd0', label: 'Dd0 (Delta-Delta)' },
    { value: 'Yyn0', label: 'Yyn0 (Star-Star)' },
    { value: 'Yz11', label: 'Yz11 (Star-Zigzag)' }
  ],
  impedances: [
    { value: '4', label: '4% (Small)' },
    { value: '6', label: '6% (Medium)' },
    { value: '8', label: '8% (Large)' },
    { value: '10', label: '10% (Very Large)' }
  ]
};