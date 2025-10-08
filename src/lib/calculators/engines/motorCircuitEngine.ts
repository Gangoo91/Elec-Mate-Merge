// BS 7671:2018+A3:2024 - Motor Circuit Design
// Section 552 - Rotating Machines

export interface MotorCircuitDesign {
  motorRating: number; // kW
  voltage: number;
  phases: 'single' | 'three';
  fullLoadCurrent: number; // FLC
  startingCurrent: number; // Typically 6-8x FLC
  designCurrent: number; // For cable sizing
  cableSize: number;
  cpcSize: number;
  protectionDevice: {
    type: 'motor-starter' | 'mccb' | 'fuse';
    rating: number;
    curve?: string;
    overloadSetting: number; // % of FLC
    breakingCapacity: number; // kA
  };
  starterType: 'DOL' | 'star-delta' | 'soft-start' | 'VSD';
  voltageDropAtStart: number; // %
  voltageDropAtRun: number; // %
  compliant: boolean;
  regulations: string[];
  recommendations: string[];
}

// Typical motor full load currents (approximate values)
const MOTOR_FLC_THREE_PHASE_400V = {
  0.37: 1.1,
  0.55: 1.6,
  0.75: 2.0,
  1.1: 2.7,
  1.5: 3.5,
  2.2: 5.0,
  3.0: 6.5,
  4.0: 8.5,
  5.5: 11.5,
  7.5: 15.0,
  11: 22.0,
  15: 30.0,
  18.5: 36.0,
  22: 43.0,
  30: 57.0,
  37: 70.0,
  45: 85.0,
  55: 104.0,
  75: 140.0,
  90: 168.0,
  110: 205.0
};

export function calculateMotorCircuit(params: {
  motorRating: number; // kW
  voltage: number;
  phases: 'single' | 'three';
  powerFactor?: number;
  efficiency?: number;
  startingMethod?: 'DOL' | 'star-delta' | 'soft-start' | 'VSD';
  cableLength?: number;
  ambientTemp?: number;
}): MotorCircuitDesign {
  const {
    motorRating,
    voltage,
    phases,
    powerFactor = 0.85,
    efficiency = 0.90,
    startingMethod = 'DOL',
    cableLength = 10,
    ambientTemp = 30
  } = params;

  // Calculate Full Load Current
  let fullLoadCurrent: number;
  if (phases === 'three') {
    // Use lookup table for common motors
    fullLoadCurrent = MOTOR_FLC_THREE_PHASE_400V[motorRating as keyof typeof MOTOR_FLC_THREE_PHASE_400V] 
      || (motorRating * 1000) / (Math.sqrt(3) * voltage * powerFactor * efficiency);
  } else {
    fullLoadCurrent = (motorRating * 1000) / (voltage * powerFactor * efficiency);
  }

  // Calculate starting current based on starting method
  let startingCurrent: number;
  let startingMultiplier: number;
  
  switch (startingMethod) {
    case 'DOL':
      startingMultiplier = 6.5; // Direct-on-line: 6-8x FLC
      break;
    case 'star-delta':
      startingMultiplier = 2.2; // Star-delta: ~33% of DOL
      break;
    case 'soft-start':
      startingMultiplier = 3.5; // Soft-start: 3-4x FLC
      break;
    case 'VSD':
      startingMultiplier = 1.5; // Variable speed drive: 1.5-2x FLC
      break;
  }
  
  startingCurrent = fullLoadCurrent * startingMultiplier;

  // Design current for cable sizing (Reg 552.1.1)
  // Cable must handle starting current without excessive voltage drop
  const designCurrent = fullLoadCurrent * 1.25; // 125% of FLC minimum

  // Select cable size based on design current
  // (Simplified - in reality, use full cable capacity tables with correction factors)
  let cableSize: number;
  if (designCurrent <= 16) cableSize = 2.5;
  else if (designCurrent <= 20) cableSize = 4;
  else if (designCurrent <= 25) cableSize = 6;
  else if (designCurrent <= 32) cableSize = 10;
  else if (designCurrent <= 40) cableSize = 16;
  else if (designCurrent <= 54) cableSize = 25;
  else if (designCurrent <= 68) cableSize = 35;
  else if (designCurrent <= 84) cableSize = 50;
  else if (designCurrent <= 105) cableSize = 70;
  else if (designCurrent <= 125) cableSize = 95;
  else cableSize = 120;

  // CPC sizing (typically same as live conductor or 1-2 sizes smaller)
  const cpcSize = cableSize >= 16 ? cableSize / 2 : cableSize;

  // Protection device selection (Reg 552.1.2)
  let protectionDevice: MotorCircuitDesign['protectionDevice'];
  
  if (motorRating <= 5.5) {
    // Small motors: RCBO or motor-rated MCB
    protectionDevice = {
      type: 'motor-starter',
      rating: Math.ceil(fullLoadCurrent * 1.5), // 150% for motor starting
      curve: 'D', // Type D for motor inrush
      overloadSetting: fullLoadCurrent * 1.15, // 115% FLC
      breakingCapacity: 6 // kA
    };
  } else {
    // Larger motors: MCCB with adjustable overload
    protectionDevice = {
      type: 'mccb',
      rating: Math.ceil(fullLoadCurrent * 1.5),
      overloadSetting: fullLoadCurrent * 1.15,
      breakingCapacity: 10 // kA
    };
  }

  // Calculate voltage drop at starting
  const resistance = 7.41 / (cableSize / 2.5); // Approximation based on 2.5mm² = 7.41 mΩ/m
  const voltageDropStart = (startingCurrent * resistance * cableLength * 2) / 1000;
  const voltageDropStartPercent = (voltageDropStart / voltage) * 100;

  // Calculate voltage drop at running
  const voltageDropRun = (fullLoadCurrent * resistance * cableLength * 2) / 1000;
  const voltageDropRunPercent = (voltageDropRun / voltage) * 100;

  // Check compliance
  const regulations: string[] = ['BS 7671 Section 552'];
  const recommendations: string[] = [];
  let compliant = true;

  // Reg 525 - Voltage drop limits
  if (voltageDropRunPercent > 5) {
    compliant = false;
    recommendations.push('Voltage drop at running exceeds 5% - increase cable size');
  }

  // Reg 552.1.1 - Starting current considerations
  if (voltageDropStartPercent > 15 && startingMethod === 'DOL') {
    recommendations.push('Consider star-delta or soft-start to reduce starting voltage drop');
  }

  // Overload protection coordination (Reg 552.1.2)
  if (protectionDevice.overloadSetting < fullLoadCurrent * 1.05) {
    recommendations.push('Overload setting may cause nuisance tripping');
  }

  return {
    motorRating,
    voltage,
    phases,
    fullLoadCurrent: Number(fullLoadCurrent.toFixed(2)),
    startingCurrent: Number(startingCurrent.toFixed(2)),
    designCurrent: Number(designCurrent.toFixed(2)),
    cableSize,
    cpcSize,
    protectionDevice,
    starterType: startingMethod,
    voltageDropAtStart: Number(voltageDropStartPercent.toFixed(2)),
    voltageDropAtRun: Number(voltageDropRunPercent.toFixed(2)),
    compliant,
    regulations,
    recommendations
  };
}

// Get recommended starting method based on motor size
export function recommendStartingMethod(motorRating: number): {
  method: 'DOL' | 'star-delta' | 'soft-start' | 'VSD';
  reason: string;
} {
  if (motorRating <= 4) {
    return {
      method: 'DOL',
      reason: 'Small motor - Direct-on-Line starting is cost-effective and simple'
    };
  } else if (motorRating <= 15) {
    return {
      method: 'star-delta',
      reason: 'Medium motor - Star-Delta reduces starting current to ~33% of DOL'
    };
  } else if (motorRating <= 30) {
    return {
      method: 'soft-start',
      reason: 'Larger motor - Soft-start provides controlled acceleration'
    };
  } else {
    return {
      method: 'VSD',
      reason: 'Large motor - VSD offers energy efficiency and precise control'
    };
  }
}
