// Shared utility functions for electrical calculators

export const parseNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const parsed = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
};

export const formatNumber = (value: number, decimals: number = 1): string => {
  return Number(value).toFixed(decimals);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const roundTo = (value: number, decimals: number = 1): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export const withUnits = (value: number, unit: string, decimals: number = 1): string => {
  return `${formatNumber(value, decimals)}${unit}`;
};

// Standard protective device ratings in accordance with BS EN 60898
export const standardDeviceRatings = [
  1, 2, 3, 4, 6, 8, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600
];

export const getNextStandardRating = (current: number): number | null => {
  return standardDeviceRatings.find(rating => rating >= current) || null;
};

export const getPreviousStandardRating = (current: number): number | null => {
  const ratings = [...standardDeviceRatings].reverse();
  return ratings.find(rating => rating <= current) || null;
};

// Voltage levels commonly used in UK electrical installations
export const standardVoltages = {
  singlePhase: [230, 240],
  threePhase: [400, 415],
  lv: [230, 400, 415],
  mv: [3300, 6600, 11000, 33000],
  hv: [66000, 132000, 275000, 400000]
};

// Common power factor values for different load types
export const typicalPowerFactors = {
  resistive: 1.0,
  incandescent: 1.0,
  led: 0.9,
  fluorescent: 0.85,
  motor: 0.8,
  welding: 0.7,
  domestic: 0.95,
  commercial: 0.9,
  industrial: 0.85
};

// Cable size validation
export const isValidCableSize = (size: number): boolean => {
  const standardSizes = [
    0.5, 0.75, 1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630, 800, 1000
  ];
  return standardSizes.includes(size);
};

// Temperature range validation
export const getTemperatureRange = (installationMethod: 'air' | 'soil') => {
  return installationMethod === 'air' 
    ? { min: -10, max: 80, standard: 30 }
    : { min: 5, max: 65, standard: 20 };
};

// Convert between units
export const convertUnits = {
  mmToInch: (mm: number) => mm / 25.4,
  inchToMm: (inch: number) => inch * 25.4,
  mToFt: (m: number) => m * 3.28084,
  ftToM: (ft: number) => ft / 3.28084,
  kwToHp: (kw: number) => kw * 1.34102,
  hpToKw: (hp: number) => hp / 1.34102,
  celsiusToFahrenheit: (c: number) => (c * 9/5) + 32,
  fahrenheitToCelsius: (f: number) => (f - 32) * 5/9
};

// Error handling for calculations
export class CalculationError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'CalculationError';
  }
}

export const validateInput = (value: number, min: number, max: number, name: string): void => {
  if (isNaN(value)) {
    throw new CalculationError(`${name} must be a valid number`, 'INVALID_NUMBER');
  }
  if (value < min || value > max) {
    throw new CalculationError(`${name} must be between ${min} and ${max}`, 'OUT_OF_RANGE');
  }
};

// BS 7671 specific utilities
export const bs7671 = {
  // Diversity factors for different load types
  diversityFactors: {
    lighting: 0.9,
    smallPower: 0.75,
    waterHeating: 1.0,
    spaceHeating: 0.75,
    motors: 0.8,
    domestic: 0.6
  },
  
  // Maximum Zs values for different protective devices
  maxZsValues: {
    // Type B MCBs at 230V
    'B6': 7.67,
    'B10': 4.60,
    'B16': 2.87,
    'B20': 2.30,
    'B25': 1.84,
    'B32': 1.44,
    'B40': 1.15,
    'B50': 0.92,
    'B63': 0.73
  },
  
  // Ring circuit requirements
  ringCircuit: {
    maxFloorArea: 100, // m²
    maxCableLength: 106, // m
    standardCableSize: 2.5, // mm²
    standardProtection: 32 // A
  }
};