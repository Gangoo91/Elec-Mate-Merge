/**
 * UK Solar Inverter Database 2025/2026
 *
 * Comprehensive database of popular UK MCS-certified inverters.
 * Used for auto-filling inverter specifications on Solar PV certificates.
 *
 * Data sources: MCS database, manufacturer specifications
 */

import { InverterType, PhaseType } from '@/types/solar-pv';

export interface SolarInverter {
  id: string;
  make: string;
  model: string;
  type: InverterType;
  ratedPowerAc: number;         // kW AC output
  ratedPowerDc: number;         // kW DC input
  phases: PhaseType;
  mpptCount: number;
  mpptVoltageMin: number;       // V
  mpptVoltageMax: number;       // V
  maxInputVoltage: number;      // V
  maxInputCurrent: number;      // A per MPPT
  maxOutputCurrent: number;     // A AC
  efficiency: number;           // % (European efficiency)
  dimensions: {
    width: number;              // mm
    height: number;             // mm
    depth: number;              // mm
  };
  weight: number;               // kg
  ipRating: string;             // e.g., IP65
  warranty: number;             // Years
  mcsCertified: boolean;
  g98g99Compliant: boolean;
  batteryCompatible: boolean;
  hybridCapable: boolean;
  wifi: boolean;
  ethernet: boolean;
  monitoring: string;           // App/portal name
  yearIntroduced?: number;
  notes?: string;
}

/**
 * UK MCS-Certified Solar Inverter Database
 * Includes best-selling and popular models as of 2025/2026
 */
export const SOLAR_INVERTERS: SolarInverter[] = [
  // ========== SOLAREDGE ==========
  {
    id: 'solaredge-se3000h',
    make: 'SolarEdge',
    model: 'SE3000H',
    type: 'string',
    ratedPowerAc: 3.0,
    ratedPowerDc: 4.05,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 380,
    mpptVoltageMax: 480,
    maxInputVoltage: 480,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 14.0,
    efficiency: 99.2,
    dimensions: { width: 370, height: 505, depth: 137 },
    weight: 9.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2021,
    notes: 'HD-Wave technology. Requires optimisers. 12 year warranty.'
  },
  {
    id: 'solaredge-se4000h',
    make: 'SolarEdge',
    model: 'SE4000H',
    type: 'string',
    ratedPowerAc: 4.0,
    ratedPowerDc: 5.4,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 380,
    mpptVoltageMax: 480,
    maxInputVoltage: 480,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 18.0,
    efficiency: 99.2,
    dimensions: { width: 370, height: 505, depth: 137 },
    weight: 9.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2021,
    notes: 'Popular residential size. HD-Wave technology.'
  },
  {
    id: 'solaredge-se5000h',
    make: 'SolarEdge',
    model: 'SE5000H',
    type: 'string',
    ratedPowerAc: 5.0,
    ratedPowerDc: 6.75,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 380,
    mpptVoltageMax: 480,
    maxInputVoltage: 480,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 22.0,
    efficiency: 99.2,
    dimensions: { width: 370, height: 505, depth: 137 },
    weight: 9.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2021,
    notes: 'Popular 5kW residential. Optimiser-based system.'
  },
  {
    id: 'solaredge-se6000h',
    make: 'SolarEdge',
    model: 'SE6000H',
    type: 'string',
    ratedPowerAc: 6.0,
    ratedPowerDc: 8.1,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 380,
    mpptVoltageMax: 480,
    maxInputVoltage: 480,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 28.0,
    efficiency: 99.2,
    dimensions: { width: 370, height: 505, depth: 137 },
    weight: 9.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2021,
    notes: 'Largest single phase HD-Wave.'
  },
  {
    id: 'solaredge-se10k-rws',
    make: 'SolarEdge',
    model: 'SE10K-RWS',
    type: 'hybrid',
    ratedPowerAc: 10.0,
    ratedPowerDc: 13.5,
    phases: 'three',
    mpptCount: 1,
    mpptVoltageMin: 380,
    mpptVoltageMax: 800,
    maxInputVoltage: 800,
    maxInputCurrent: 25.0,
    maxOutputCurrent: 16.0,
    efficiency: 98.3,
    dimensions: { width: 540, height: 480, depth: 205 },
    weight: 26.0,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2022,
    notes: 'Three phase hybrid with backup. StorEdge compatible.'
  },

  // ========== ENPHASE ==========
  {
    id: 'enphase-iq7plus',
    make: 'Enphase',
    model: 'IQ7+',
    type: 'micro',
    ratedPowerAc: 0.295,
    ratedPowerDc: 0.360,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 27,
    mpptVoltageMax: 48,
    maxInputVoltage: 60,
    maxInputCurrent: 12.0,
    maxOutputCurrent: 1.28,
    efficiency: 97.5,
    dimensions: { width: 212, height: 175, depth: 30 },
    weight: 1.08,
    ipRating: 'IP67',
    warranty: 25,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: false,
    ethernet: false,
    monitoring: 'Enlighten',
    yearIntroduced: 2018,
    notes: 'Per-panel microinverter. 25 year warranty. Requires Envoy.'
  },
  {
    id: 'enphase-iq8plus',
    make: 'Enphase',
    model: 'IQ8+',
    type: 'micro',
    ratedPowerAc: 0.300,
    ratedPowerDc: 0.384,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 20,
    mpptVoltageMax: 54,
    maxInputVoltage: 60,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 1.30,
    efficiency: 97.5,
    dimensions: { width: 212, height: 175, depth: 30 },
    weight: 1.13,
    ipRating: 'IP67',
    warranty: 25,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: false,
    ethernet: false,
    monitoring: 'Enlighten',
    yearIntroduced: 2022,
    notes: 'Latest IQ8 series. Grid-forming capability. Requires Envoy.'
  },
  {
    id: 'enphase-iq8m',
    make: 'Enphase',
    model: 'IQ8M',
    type: 'micro',
    ratedPowerAc: 0.330,
    ratedPowerDc: 0.420,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 24,
    mpptVoltageMax: 54,
    maxInputVoltage: 60,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 1.43,
    efficiency: 97.5,
    dimensions: { width: 212, height: 175, depth: 30 },
    weight: 1.13,
    ipRating: 'IP67',
    warranty: 25,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: false,
    ethernet: false,
    monitoring: 'Enlighten',
    yearIntroduced: 2022,
    notes: 'Higher power IQ8. For 400-450W panels.'
  },

  // ========== GIVENERGU ==========
  {
    id: 'givenergy-gen3-3.6kw',
    make: 'GivEnergy',
    model: 'Gen 3 Hybrid 3.6kW',
    type: 'hybrid',
    ratedPowerAc: 3.6,
    ratedPowerDc: 4.8,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 150,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 16.0,
    efficiency: 97.6,
    dimensions: { width: 516, height: 440, depth: 180 },
    weight: 23.0,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2023,
    notes: 'UK brand. Excellent app. Works with GivEnergy batteries.'
  },
  {
    id: 'givenergy-gen3-5kw',
    make: 'GivEnergy',
    model: 'Gen 3 Hybrid 5kW',
    type: 'hybrid',
    ratedPowerAc: 5.0,
    ratedPowerDc: 6.6,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 150,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 22.0,
    efficiency: 97.6,
    dimensions: { width: 516, height: 440, depth: 180 },
    weight: 24.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2023,
    notes: 'Popular 5kW hybrid. Excellent for domestic installations.'
  },
  {
    id: 'givenergy-gen3-6kw',
    make: 'GivEnergy',
    model: 'Gen 3 Hybrid 6kW',
    type: 'hybrid',
    ratedPowerAc: 6.0,
    ratedPowerDc: 8.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 150,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 26.5,
    efficiency: 97.6,
    dimensions: { width: 516, height: 440, depth: 180 },
    weight: 25.0,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2023,
    notes: 'Largest single phase Gen 3.'
  },
  {
    id: 'givenergy-aio-3kw',
    make: 'GivEnergy',
    model: 'All-in-One 3kW',
    type: 'hybrid',
    ratedPowerAc: 3.0,
    ratedPowerDc: 4.0,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 150,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 13.5,
    efficiency: 97.5,
    dimensions: { width: 600, height: 950, depth: 210 },
    weight: 98.0,
    ipRating: 'IP21',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2022,
    notes: 'Inverter + 9.5kWh battery in one unit. Indoor only.'
  },

  // ========== SOLIS ==========
  {
    id: 'solis-s6-gr1p3k',
    make: 'Solis',
    model: 'S6-GR1P3K',
    type: 'string',
    ratedPowerAc: 3.0,
    ratedPowerDc: 4.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 14.5,
    efficiency: 97.5,
    dimensions: { width: 350, height: 405, depth: 140 },
    weight: 13.0,
    ipRating: 'IP66',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: false,
    monitoring: 'SolisCloud',
    yearIntroduced: 2022,
    notes: 'Popular budget option. Good reliability.'
  },
  {
    id: 'solis-s6-gr1p4k',
    make: 'Solis',
    model: 'S6-GR1P4K',
    type: 'string',
    ratedPowerAc: 4.0,
    ratedPowerDc: 5.4,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 19.0,
    efficiency: 97.5,
    dimensions: { width: 350, height: 405, depth: 140 },
    weight: 13.5,
    ipRating: 'IP66',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: false,
    monitoring: 'SolisCloud',
    yearIntroduced: 2022,
    notes: 'Good 4kW option. Dual MPPT.'
  },
  {
    id: 'solis-s6-gr1p5k',
    make: 'Solis',
    model: 'S6-GR1P5K',
    type: 'string',
    ratedPowerAc: 5.0,
    ratedPowerDc: 6.75,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 24.0,
    efficiency: 97.5,
    dimensions: { width: 350, height: 405, depth: 140 },
    weight: 14.0,
    ipRating: 'IP66',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: false,
    monitoring: 'SolisCloud',
    yearIntroduced: 2022,
    notes: 'Best-selling Solis model. Excellent value.'
  },
  {
    id: 'solis-s6-eh1p5k-l',
    make: 'Solis',
    model: 'S6-EH1P5K-L',
    type: 'hybrid',
    ratedPowerAc: 5.0,
    ratedPowerDc: 7.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 24.0,
    efficiency: 97.0,
    dimensions: { width: 475, height: 455, depth: 185 },
    weight: 21.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'SolisCloud',
    yearIntroduced: 2023,
    notes: 'Hybrid version. Compatible with LV batteries.'
  },

  // ========== HUAWEI ==========
  {
    id: 'huawei-sun2000-3ktl-l1',
    make: 'Huawei',
    model: 'SUN2000-3KTL-L1',
    type: 'string',
    ratedPowerAc: 3.0,
    ratedPowerDc: 4.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 11.0,
    maxOutputCurrent: 14.5,
    efficiency: 98.4,
    dimensions: { width: 365, height: 365, depth: 145 },
    weight: 11.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: false,
    monitoring: 'FusionSolar',
    yearIntroduced: 2021,
    notes: 'Very high efficiency. Compact design.'
  },
  {
    id: 'huawei-sun2000-4ktl-l1',
    make: 'Huawei',
    model: 'SUN2000-4KTL-L1',
    type: 'string',
    ratedPowerAc: 4.0,
    ratedPowerDc: 6.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 11.0,
    maxOutputCurrent: 19.0,
    efficiency: 98.4,
    dimensions: { width: 365, height: 365, depth: 145 },
    weight: 11.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: false,
    monitoring: 'FusionSolar',
    yearIntroduced: 2021,
    notes: 'Popular 4kW. Compatible with LUNA2000 batteries.'
  },
  {
    id: 'huawei-sun2000-5ktl-l1',
    make: 'Huawei',
    model: 'SUN2000-5KTL-L1',
    type: 'string',
    ratedPowerAc: 5.0,
    ratedPowerDc: 7.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 11.0,
    maxOutputCurrent: 23.5,
    efficiency: 98.4,
    dimensions: { width: 365, height: 365, depth: 145 },
    weight: 11.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: false,
    monitoring: 'FusionSolar',
    yearIntroduced: 2021,
    notes: 'Best-selling Huawei. Excellent monitoring app.'
  },
  {
    id: 'huawei-sun2000-6ktl-l1',
    make: 'Huawei',
    model: 'SUN2000-6KTL-L1',
    type: 'string',
    ratedPowerAc: 6.0,
    ratedPowerDc: 9.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 11.0,
    maxOutputCurrent: 28.5,
    efficiency: 98.4,
    dimensions: { width: 365, height: 365, depth: 145 },
    weight: 11.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: false,
    monitoring: 'FusionSolar',
    yearIntroduced: 2021,
    notes: 'Largest single phase Huawei residential.'
  },

  // ========== FOX ESS ==========
  {
    id: 'fox-ess-h1-3.7',
    make: 'Fox ESS',
    model: 'H1-3.7',
    type: 'hybrid',
    ratedPowerAc: 3.7,
    ratedPowerDc: 5.2,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 550,
    maxInputVoltage: 580,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 16.5,
    efficiency: 97.0,
    dimensions: { width: 480, height: 460, depth: 180 },
    weight: 22.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fox ESS Cloud',
    yearIntroduced: 2022,
    notes: 'Good budget hybrid. Works with Fox batteries.'
  },
  {
    id: 'fox-ess-h1-5.0',
    make: 'Fox ESS',
    model: 'H1-5.0',
    type: 'hybrid',
    ratedPowerAc: 5.0,
    ratedPowerDc: 6.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 550,
    maxInputVoltage: 580,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 22.0,
    efficiency: 97.0,
    dimensions: { width: 480, height: 460, depth: 180 },
    weight: 23.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fox ESS Cloud',
    yearIntroduced: 2022,
    notes: 'Popular 5kW hybrid. Good value for money.'
  },
  {
    id: 'fox-ess-h1-6.0',
    make: 'Fox ESS',
    model: 'H1-6.0',
    type: 'hybrid',
    ratedPowerAc: 6.0,
    ratedPowerDc: 7.8,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 550,
    maxInputVoltage: 580,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 26.5,
    efficiency: 97.0,
    dimensions: { width: 480, height: 460, depth: 180 },
    weight: 24.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fox ESS Cloud',
    yearIntroduced: 2022,
    notes: 'Largest Fox single phase hybrid.'
  },

  // ========== SMA ==========
  {
    id: 'sma-sunny-boy-3.0',
    make: 'SMA',
    model: 'Sunny Boy 3.0',
    type: 'string',
    ratedPowerAc: 3.0,
    ratedPowerDc: 3.15,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 150,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 10.0,
    maxOutputCurrent: 14.5,
    efficiency: 97.2,
    dimensions: { width: 460, height: 357, depth: 122 },
    weight: 9.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2019,
    notes: 'German quality. Very reliable. Industry standard.'
  },
  {
    id: 'sma-sunny-boy-4.0',
    make: 'SMA',
    model: 'Sunny Boy 4.0',
    type: 'string',
    ratedPowerAc: 4.0,
    ratedPowerDc: 4.2,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 10.0,
    maxOutputCurrent: 19.0,
    efficiency: 97.2,
    dimensions: { width: 460, height: 357, depth: 122 },
    weight: 9.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2019,
    notes: 'Dual MPPT. ShadeFix optimisation.'
  },
  {
    id: 'sma-sunny-boy-5.0',
    make: 'SMA',
    model: 'Sunny Boy 5.0',
    type: 'string',
    ratedPowerAc: 5.0,
    ratedPowerDc: 5.25,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 10.0,
    maxOutputCurrent: 24.0,
    efficiency: 97.2,
    dimensions: { width: 460, height: 357, depth: 122 },
    weight: 10.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2019,
    notes: 'Best-selling SMA. Proven reliability.'
  },
  {
    id: 'sma-sunny-boy-6.0',
    make: 'SMA',
    model: 'Sunny Boy 6.0',
    type: 'string',
    ratedPowerAc: 6.0,
    ratedPowerDc: 6.3,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 10.0,
    maxOutputCurrent: 28.5,
    efficiency: 97.2,
    dimensions: { width: 460, height: 357, depth: 122 },
    weight: 10.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2019,
    notes: 'Largest single phase Sunny Boy.'
  },
  {
    id: 'sma-sunny-tripower-10.0',
    make: 'SMA',
    model: 'Sunny Tripower 10.0',
    type: 'string',
    ratedPowerAc: 10.0,
    ratedPowerDc: 15.0,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 188,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 18.0,
    maxOutputCurrent: 16.1,
    efficiency: 98.4,
    dimensions: { width: 460, height: 610, depth: 206 },
    weight: 28.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2020,
    notes: 'Premium three phase. ShadeFix included.'
  },

  // ========== FRONIUS ==========
  {
    id: 'fronius-primo-3.0-1',
    make: 'Fronius',
    model: 'Primo 3.0-1',
    type: 'string',
    ratedPowerAc: 3.0,
    ratedPowerDc: 4.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 12.0,
    maxOutputCurrent: 14.4,
    efficiency: 98.0,
    dimensions: { width: 431, height: 645, depth: 204 },
    weight: 21.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fronius Solar.web',
    yearIntroduced: 2020,
    notes: 'Austrian quality. Excellent monitoring. SnapINverter.'
  },
  {
    id: 'fronius-primo-4.0-1',
    make: 'Fronius',
    model: 'Primo 4.0-1',
    type: 'string',
    ratedPowerAc: 4.0,
    ratedPowerDc: 6.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 12.0,
    maxOutputCurrent: 19.2,
    efficiency: 98.0,
    dimensions: { width: 431, height: 645, depth: 204 },
    weight: 21.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fronius Solar.web',
    yearIntroduced: 2020,
    notes: 'Popular 4kW. Dynamic Peak Manager MPP tracking.'
  },
  {
    id: 'fronius-primo-5.0-1',
    make: 'Fronius',
    model: 'Primo 5.0-1',
    type: 'string',
    ratedPowerAc: 5.0,
    ratedPowerDc: 7.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 12.0,
    maxOutputCurrent: 24.0,
    efficiency: 98.1,
    dimensions: { width: 431, height: 645, depth: 204 },
    weight: 21.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fronius Solar.web',
    yearIntroduced: 2020,
    notes: 'Best-selling Fronius residential. Premium quality.'
  },
  {
    id: 'fronius-symo-10.0-3-m',
    make: 'Fronius',
    model: 'Symo 10.0-3-M',
    type: 'string',
    ratedPowerAc: 10.0,
    ratedPowerDc: 15.0,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 200,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 27.0,
    maxOutputCurrent: 16.1,
    efficiency: 98.1,
    dimensions: { width: 431, height: 645, depth: 204 },
    weight: 34.8,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'Fronius Solar.web',
    yearIntroduced: 2018,
    notes: 'Three phase commercial. Excellent reliability.'
  },

  // ========== GROWATT ==========
  {
    id: 'growatt-min-5000tl-x',
    make: 'Growatt',
    model: 'MIN 5000TL-X',
    type: 'string',
    ratedPowerAc: 5.0,
    ratedPowerDc: 6.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 500,
    maxInputVoltage: 550,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 25.0,
    efficiency: 97.6,
    dimensions: { width: 370, height: 440, depth: 145 },
    weight: 15.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: false,
    monitoring: 'ShinePhone',
    yearIntroduced: 2021,
    notes: 'Budget-friendly. Good for simple installations.'
  },
  {
    id: 'growatt-sph-5000tl3-bh-up',
    make: 'Growatt',
    model: 'SPH 5000TL3 BH-UP',
    type: 'hybrid',
    ratedPowerAc: 5.0,
    ratedPowerDc: 7.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 100,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 13.0,
    maxOutputCurrent: 25.0,
    efficiency: 97.5,
    dimensions: { width: 500, height: 490, depth: 195 },
    weight: 24.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'ShinePhone',
    yearIntroduced: 2022,
    notes: 'Hybrid version with backup capability.'
  },

  // ========== 2024-2025 NEW MODELS ==========

  // SolarEdge Home Wave (2024)
  {
    id: 'solaredge-se6000h-wave',
    make: 'SolarEdge',
    model: 'SE6000H-WAVE',
    type: 'string',
    ratedPowerAc: 6.0,
    ratedPowerDc: 8.1,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 380,
    mpptVoltageMax: 480,
    maxInputVoltage: 480,
    maxInputCurrent: 18.0,
    maxOutputCurrent: 27.0,
    efficiency: 99.5,
    dimensions: { width: 370, height: 505, depth: 137 },
    weight: 10.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2024,
    notes: 'Latest HD-Wave technology. Enhanced efficiency. Requires P505 optimisers.'
  },

  // SolarEdge Home Hub 2 (2024)
  {
    id: 'solaredge-home-hub-5kw',
    make: 'SolarEdge',
    model: 'Home Hub 5kW',
    type: 'hybrid',
    ratedPowerAc: 5.0,
    ratedPowerDc: 7.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 100,
    mpptVoltageMax: 500,
    maxInputVoltage: 600,
    maxInputCurrent: 15.0,
    maxOutputCurrent: 24.0,
    efficiency: 98.8,
    dimensions: { width: 440, height: 695, depth: 185 },
    weight: 26.5,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'mySolarEdge',
    yearIntroduced: 2024,
    notes: 'Integrated backup capability. Works with SolarEdge Home Battery.'
  },

  // Enphase IQ8M (2024)
  {
    id: 'enphase-iq8m-72',
    make: 'Enphase',
    model: 'IQ8M-72-M-UK',
    type: 'micro',
    ratedPowerAc: 0.366,
    ratedPowerDc: 0.440,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 27,
    mpptVoltageMax: 55,
    maxInputVoltage: 60,
    maxInputCurrent: 12.0,
    maxOutputCurrent: 1.52,
    efficiency: 97.5,
    dimensions: { width: 212, height: 175, depth: 30 },
    weight: 1.08,
    ipRating: 'IP67',
    warranty: 25,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: false,
    wifi: false,
    ethernet: false,
    monitoring: 'Enphase App',
    yearIntroduced: 2024,
    notes: 'Mid-power microinverter for 340-460W panels. Requires IQ Gateway.'
  },

  // Enphase IQ8P (2024)
  {
    id: 'enphase-iq8p-72',
    make: 'Enphase',
    model: 'IQ8P-72-M-UK',
    type: 'micro',
    ratedPowerAc: 0.384,
    ratedPowerDc: 0.460,
    phases: 'single',
    mpptCount: 1,
    mpptVoltageMin: 27,
    mpptVoltageMax: 55,
    maxInputVoltage: 60,
    maxInputCurrent: 13.0,
    maxOutputCurrent: 1.60,
    efficiency: 97.5,
    dimensions: { width: 212, height: 175, depth: 30 },
    weight: 1.08,
    ipRating: 'IP67',
    warranty: 25,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: false,
    wifi: false,
    ethernet: false,
    monitoring: 'Enphase App',
    yearIntroduced: 2024,
    notes: 'High-power microinverter for 360-500W panels. Requires IQ Gateway.'
  },

  // GivEnergy Gen 3 (2024)
  {
    id: 'givenergy-gen3-3.6kw',
    make: 'GivEnergy',
    model: 'GIV-HY-3.6-1P-Gen3',
    type: 'hybrid',
    ratedPowerAc: 3.6,
    ratedPowerDc: 5.4,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 16.4,
    efficiency: 97.8,
    dimensions: { width: 450, height: 598, depth: 152 },
    weight: 22.0,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2024,
    notes: 'Gen 3 platform with improved efficiency. Fan-less design.'
  },

  // GivEnergy Gen 3 5kW (2024)
  {
    id: 'givenergy-gen3-5kw',
    make: 'GivEnergy',
    model: 'GIV-HY-5.0-1P-Gen3',
    type: 'hybrid',
    ratedPowerAc: 5.0,
    ratedPowerDc: 7.5,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 22.8,
    efficiency: 98.0,
    dimensions: { width: 450, height: 598, depth: 152 },
    weight: 23.0,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2024,
    notes: 'Gen 3 platform. Works with 2.6kWh & 9.5kWh batteries.'
  },

  // GivEnergy Gen 3 6kW (2024)
  {
    id: 'givenergy-gen3-6kw',
    make: 'GivEnergy',
    model: 'GIV-HY-6.0-1P-Gen3',
    type: 'hybrid',
    ratedPowerAc: 6.0,
    ratedPowerDc: 9.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 16.0,
    maxOutputCurrent: 27.3,
    efficiency: 98.2,
    dimensions: { width: 450, height: 598, depth: 152 },
    weight: 24.0,
    ipRating: 'IP65',
    warranty: 12,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2024,
    notes: 'UK designed and engineered. Gen 3 platform.'
  },

  // GivEnergy 3-Phase (2024)
  {
    id: 'givenergy-gen3-10kw-3p',
    make: 'GivEnergy',
    model: 'GIV-HY-10.0-3P-Gen3',
    type: 'hybrid',
    ratedPowerAc: 10.0,
    ratedPowerDc: 15.0,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 125,
    mpptVoltageMax: 850,
    maxInputVoltage: 1000,
    maxInputCurrent: 18.0,
    maxOutputCurrent: 16.0,
    efficiency: 98.4,
    dimensions: { width: 516, height: 700, depth: 200 },
    weight: 36.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'GivEnergy Portal',
    yearIntroduced: 2024,
    notes: 'Three-phase hybrid. G99 compliant for larger systems.'
  },

  // Huawei SUN2000-6KTL-M1 (2024)
  {
    id: 'huawei-sun2000-6ktl-m2',
    make: 'Huawei',
    model: 'SUN2000-6KTL-M2',
    type: 'string',
    ratedPowerAc: 6.0,
    ratedPowerDc: 9.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 140,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 26.1,
    efficiency: 98.6,
    dimensions: { width: 365, height: 515, depth: 145 },
    weight: 12.5,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: false,
    monitoring: 'FusionSolar',
    yearIntroduced: 2024,
    notes: 'M2 series with battery-ready capability. Works with LUNA2000 batteries.'
  },

  // Huawei SUN2000-8KTL-M2 (2024)
  {
    id: 'huawei-sun2000-8ktl-m2',
    make: 'Huawei',
    model: 'SUN2000-8KTL-M2',
    type: 'string',
    ratedPowerAc: 8.0,
    ratedPowerDc: 12.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 140,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 36.4,
    efficiency: 98.65,
    dimensions: { width: 365, height: 515, depth: 145 },
    weight: 13.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: false,
    monitoring: 'FusionSolar',
    yearIntroduced: 2024,
    notes: 'Larger M2 model for bigger domestic/small commercial.'
  },

  // Solis S6-GR1P6K-M (2024)
  {
    id: 'solis-s6-gr1p6k-m',
    make: 'Solis',
    model: 'S6-GR1P6K-M',
    type: 'string',
    ratedPowerAc: 6.0,
    ratedPowerDc: 9.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 80,
    mpptVoltageMax: 560,
    maxInputVoltage: 600,
    maxInputCurrent: 16.0,
    maxOutputCurrent: 28.5,
    efficiency: 98.1,
    dimensions: { width: 345, height: 490, depth: 146 },
    weight: 10.8,
    ipRating: 'IP66',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: false,
    monitoring: 'SolisCloud',
    yearIntroduced: 2024,
    notes: 'S6 series with enhanced MPPT range. Compact design.'
  },

  // Solis S6-EH1P6K-L-UK (2024 Hybrid)
  {
    id: 'solis-s6-eh1p6k-l-uk',
    make: 'Solis',
    model: 'S6-EH1P6K-L-UK',
    type: 'hybrid',
    ratedPowerAc: 6.0,
    ratedPowerDc: 9.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 90,
    mpptVoltageMax: 520,
    maxInputVoltage: 600,
    maxInputCurrent: 16.0,
    maxOutputCurrent: 28.5,
    efficiency: 97.9,
    dimensions: { width: 450, height: 650, depth: 180 },
    weight: 28.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'SolisCloud',
    yearIntroduced: 2024,
    notes: 'UK-specific hybrid with EPS backup. Works with LFP batteries.'
  },

  // Fox ESS H3 6.0 (2024)
  {
    id: 'fox-ess-h3-6.0',
    make: 'Fox ESS',
    model: 'H3-6.0-E',
    type: 'hybrid',
    ratedPowerAc: 6.0,
    ratedPowerDc: 10.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 120,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 16.0,
    maxOutputCurrent: 26.0,
    efficiency: 97.5,
    dimensions: { width: 483, height: 675, depth: 163 },
    weight: 27.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'FoxCloud',
    yearIntroduced: 2024,
    notes: 'H3 series with enhanced battery charging capability.'
  },

  // Fox ESS H3 8.0 (2024)
  {
    id: 'fox-ess-h3-8.0',
    make: 'Fox ESS',
    model: 'H3-8.0-E',
    type: 'hybrid',
    ratedPowerAc: 8.0,
    ratedPowerDc: 12.0,
    phases: 'single',
    mpptCount: 2,
    mpptVoltageMin: 120,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 18.0,
    maxOutputCurrent: 36.4,
    efficiency: 97.8,
    dimensions: { width: 483, height: 675, depth: 163 },
    weight: 28.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'FoxCloud',
    yearIntroduced: 2024,
    notes: 'Higher power H3 for larger systems.'
  },

  // SMA Sunny Tripower X 12 (2025)
  {
    id: 'sma-stp-x-12',
    make: 'SMA',
    model: 'Sunny Tripower X 12',
    type: 'string',
    ratedPowerAc: 12.0,
    ratedPowerDc: 18.0,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 175,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 20.0,
    maxOutputCurrent: 19.2,
    efficiency: 98.5,
    dimensions: { width: 460, height: 610, depth: 175 },
    weight: 26.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2025,
    notes: 'Next-generation Tripower X series for commercial.'
  },

  // SMA Sunny Tripower X 15 (2025)
  {
    id: 'sma-stp-x-15',
    make: 'SMA',
    model: 'Sunny Tripower X 15',
    type: 'string',
    ratedPowerAc: 15.0,
    ratedPowerDc: 22.5,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 175,
    mpptVoltageMax: 800,
    maxInputVoltage: 1000,
    maxInputCurrent: 22.0,
    maxOutputCurrent: 24.0,
    efficiency: 98.6,
    dimensions: { width: 460, height: 610, depth: 175 },
    weight: 27.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Sunny Portal',
    yearIntroduced: 2025,
    notes: 'Premium three-phase for commercial applications.'
  },

  // Fronius Tauro ECO 50-3-D (2024)
  {
    id: 'fronius-tauro-eco-50',
    make: 'Fronius',
    model: 'Tauro ECO 50-3-D',
    type: 'string',
    ratedPowerAc: 50.0,
    ratedPowerDc: 75.0,
    phases: 'three',
    mpptCount: 3,
    mpptVoltageMin: 200,
    mpptVoltageMax: 1000,
    maxInputVoltage: 1100,
    maxInputCurrent: 32.0,
    maxOutputCurrent: 72.0,
    efficiency: 98.8,
    dimensions: { width: 725, height: 1070, depth: 302 },
    weight: 71.0,
    ipRating: 'IP66',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: true,
    monitoring: 'Fronius Solar.web',
    yearIntroduced: 2024,
    notes: 'Commercial inverter for large rooftop & ground-mount systems.'
  },

  // Growatt MOD 8000TL3-X (2024)
  {
    id: 'growatt-mod-8000tl3-x',
    make: 'Growatt',
    model: 'MOD 8000TL3-X',
    type: 'string',
    ratedPowerAc: 8.0,
    ratedPowerDc: 12.0,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 180,
    mpptVoltageMax: 850,
    maxInputVoltage: 1100,
    maxInputCurrent: 12.5,
    maxOutputCurrent: 13.0,
    efficiency: 98.4,
    dimensions: { width: 470, height: 520, depth: 225 },
    weight: 24.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: false,
    hybridCapable: false,
    wifi: true,
    ethernet: false,
    monitoring: 'ShinePhone',
    yearIntroduced: 2024,
    notes: 'MOD series three-phase for commercial use.'
  },

  // Growatt SPH 6000TL3 BH-UP (2024 Hybrid)
  {
    id: 'growatt-sph-6000tl3-bh-up',
    make: 'Growatt',
    model: 'SPH 6000TL3 BH-UP',
    type: 'hybrid',
    ratedPowerAc: 6.0,
    ratedPowerDc: 9.0,
    phases: 'three',
    mpptCount: 2,
    mpptVoltageMin: 120,
    mpptVoltageMax: 550,
    maxInputVoltage: 600,
    maxInputCurrent: 14.0,
    maxOutputCurrent: 10.0,
    efficiency: 97.8,
    dimensions: { width: 516, height: 700, depth: 200 },
    weight: 35.0,
    ipRating: 'IP65',
    warranty: 10,
    mcsCertified: true,
    g98g99Compliant: true,
    batteryCompatible: true,
    hybridCapable: true,
    wifi: true,
    ethernet: true,
    monitoring: 'ShinePhone',
    yearIntroduced: 2024,
    notes: 'Three-phase hybrid with backup capability.'
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get unique list of inverter makes
 */
export function getInverterMakes(): string[] {
  const makes = new Set(SOLAR_INVERTERS.map(i => i.make));
  return Array.from(makes).sort();
}

/**
 * Get models for a specific make
 */
export function getInverterModels(make: string): string[] {
  return SOLAR_INVERTERS
    .filter(i => i.make.toLowerCase() === make.toLowerCase())
    .map(i => i.model);
}

/**
 * Find inverter by make and model
 */
export function findInverter(make: string, model: string): SolarInverter | undefined {
  return SOLAR_INVERTERS.find(
    i => i.make.toLowerCase() === make.toLowerCase() &&
         i.model.toLowerCase() === model.toLowerCase()
  );
}

/**
 * Find inverter by ID
 */
export function findInverterById(id: string): SolarInverter | undefined {
  return SOLAR_INVERTERS.find(i => i.id === id);
}

/**
 * Search inverters by text query
 */
export function searchInverters(query: string): SolarInverter[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return SOLAR_INVERTERS.filter(i =>
    i.make.toLowerCase().includes(q) ||
    i.model.toLowerCase().includes(q) ||
    `${i.make} ${i.model}`.toLowerCase().includes(q) ||
    i.ratedPowerAc.toString().includes(q) ||
    i.type.toLowerCase().includes(q)
  ).slice(0, 15); // Limit to 15 results
}

/**
 * Get inverters grouped by manufacturer
 */
export function getInvertersGroupedByManufacturer(): Record<string, SolarInverter[]> {
  const grouped: Record<string, SolarInverter[]> = {};

  for (const inverter of SOLAR_INVERTERS) {
    if (!grouped[inverter.make]) {
      grouped[inverter.make] = [];
    }
    grouped[inverter.make].push(inverter);
  }

  // Sort by manufacturer name
  const sortedGrouped: Record<string, SolarInverter[]> = {};
  Object.keys(grouped).sort().forEach(key => {
    sortedGrouped[key] = grouped[key];
  });

  return sortedGrouped;
}

/**
 * Get display label for an inverter
 */
export function getInverterLabel(inverter: SolarInverter): string {
  return `${inverter.make} ${inverter.model}`;
}

/**
 * Get inverter defaults for auto-fill
 */
export function getInverterDefaults(inverterId: string): {
  ratedPowerAc: number;
  ratedPowerDc: number;
  mpptCount: number;
  mpptVoltageRange: string;
  maxInputVoltage: number;
  maxInputCurrent: number;
  efficiency: number;
  phases: PhaseType;
  type: InverterType;
  mcsCertified: boolean;
  g98g99Compliant: boolean;
  batteryCompatible: boolean;
} | null {
  const inverter = findInverterById(inverterId);
  if (!inverter) return null;

  return {
    ratedPowerAc: inverter.ratedPowerAc,
    ratedPowerDc: inverter.ratedPowerDc,
    mpptCount: inverter.mpptCount,
    mpptVoltageRange: `${inverter.mpptVoltageMin}-${inverter.mpptVoltageMax}V`,
    maxInputVoltage: inverter.maxInputVoltage,
    maxInputCurrent: inverter.maxInputCurrent,
    efficiency: inverter.efficiency,
    phases: inverter.phases,
    type: inverter.type,
    mcsCertified: inverter.mcsCertified,
    g98g99Compliant: inverter.g98g99Compliant,
    batteryCompatible: inverter.batteryCompatible,
  };
}

/**
 * Filter inverters by capacity range
 */
export function getInvertersByCapacity(minKw: number, maxKw: number): SolarInverter[] {
  return SOLAR_INVERTERS.filter(
    i => i.ratedPowerAc >= minKw && i.ratedPowerAc <= maxKw
  );
}

/**
 * Get hybrid inverters only
 */
export function getHybridInverters(): SolarInverter[] {
  return SOLAR_INVERTERS.filter(i => i.type === 'hybrid' || i.hybridCapable);
}

/**
 * Get micro inverters only
 */
export function getMicroInverters(): SolarInverter[] {
  return SOLAR_INVERTERS.filter(i => i.type === 'micro');
}

/**
 * Get inverter database count
 */
export function getInverterCount(): number {
  return SOLAR_INVERTERS.length;
}

/**
 * Check if inverter supports array configuration
 * @param inverterId Inverter ID
 * @param stringVoc Total string Voc
 * @param stringIsc Total string Isc per MPPT
 * @returns Compatibility check result
 */
export function checkInverterCompatibility(
  inverterId: string,
  stringVoc: number,
  stringIsc: number
): {
  compatible: boolean;
  warnings: string[];
  errors: string[];
} {
  const inverter = findInverterById(inverterId);
  if (!inverter) {
    return { compatible: false, warnings: [], errors: ['Inverter not found'] };
  }

  const warnings: string[] = [];
  const errors: string[] = [];

  // Check voltage
  if (stringVoc > inverter.maxInputVoltage) {
    errors.push(`String Voc (${stringVoc}V) exceeds max input voltage (${inverter.maxInputVoltage}V)`);
  }

  if (stringVoc < inverter.mpptVoltageMin) {
    errors.push(`String Voc (${stringVoc}V) below minimum MPPT voltage (${inverter.mpptVoltageMin}V)`);
  }

  if (stringVoc > inverter.mpptVoltageMax) {
    warnings.push(`String Voc (${stringVoc}V) above optimal MPPT range (${inverter.mpptVoltageMax}V) - may limit output`);
  }

  // Check current
  if (stringIsc > inverter.maxInputCurrent) {
    errors.push(`String Isc (${stringIsc}A) exceeds max input current (${inverter.maxInputCurrent}A)`);
  }

  return {
    compatible: errors.length === 0,
    warnings,
    errors,
  };
}
