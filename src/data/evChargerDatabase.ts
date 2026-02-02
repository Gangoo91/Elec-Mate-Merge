/**
 * UK EV Charger Database 2025/2026
 *
 * Comprehensive database of popular UK EV chargers with technical specifications.
 * Used for auto-filling charger details on EV charging certificates.
 *
 * Data sources: Manufacturer specifications, OZEV approved installer lists
 */

export type RCDType = 'Type A' | 'Type B' | 'Type A + 6mA DC';
export type SocketType = 'Type 1' | 'Type 2' | 'CCS' | 'CHAdeMO';
export type ConnectionType = 'tethered' | 'socketed' | 'both';
export type LoadManagementType =
  | 'ct-clamp'
  | 'dynamic'
  | 'tariff-sync'
  | 'solar-integration'
  | 'eco-mode'
  | 'load-balancing'
  | 'power-boost'
  | 'scheduled'
  | 'v2g';

export interface EVCharger {
  id: string;
  make: string;
  model: string;
  powerOptions: number[]; // kW
  phases: number[]; // 1 or 3
  current: number; // A
  socketType: SocketType;
  connection: ConnectionType;
  rcdType: RCDType;
  rcdIntegral: boolean;
  smartEnabled: boolean;
  loadManagement: LoadManagementType[];
  ozevApproved: boolean;
  recommendedCable: number; // mm²
  notes?: string;
}

/**
 * UK EV Charger Database
 * Includes best-selling and popular models as of 2025/2026
 */
export const EV_CHARGERS: EVCharger[] = [
  // ========== OHME ==========
  {
    id: 'ohme-home-pro',
    make: 'Ohme',
    model: 'Home Pro',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'tariff-sync'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Best for Octopus/Agile tariffs. Top-rated smart charging.'
  },
  {
    id: 'ohme-epod',
    make: 'Ohme',
    model: 'ePod',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'socketed',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'tariff-sync'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Socketed version of Home Pro. Universal socket.'
  },

  // ========== MYENERGI ==========
  {
    id: 'myenergi-zappi-v2.1',
    make: 'Myenergi',
    model: 'Zappi V2.1',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['ct-clamp', 'solar-integration', 'eco-mode'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'UK bestseller. Best for solar PV. Made in UK. Eco+ mode for solar surplus.'
  },

  // ========== EASEE ==========
  {
    id: 'easee-one',
    make: 'Easee',
    model: 'One',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'socketed',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Nordic design. Excellent for multi-unit installations.'
  },
  {
    id: 'easee-home',
    make: 'Easee',
    model: 'Home',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Tethered cable version. Phase switching capability.'
  },

  // ========== WALLBOX ==========
  {
    id: 'wallbox-pulsar-max',
    make: 'Wallbox',
    model: 'Pulsar Max',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['power-boost', 'dynamic'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Compact design. Voice control compatible. Power Boost feature.'
  },
  {
    id: 'wallbox-pulsar-plus',
    make: 'Wallbox',
    model: 'Pulsar Plus',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Popular compact charger. Alexa/Google compatible.'
  },
  {
    id: 'wallbox-commander-2',
    make: 'Wallbox',
    model: 'Commander 2',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['power-boost', 'dynamic', 'scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Premium model with touchscreen display.'
  },

  // ========== ANDERSEN ==========
  {
    id: 'andersen-a2',
    make: 'Andersen',
    model: 'A2',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['solar-integration', 'scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Premium Danish design. Customisable wood/metal finishes.'
  },
  {
    id: 'andersen-a3',
    make: 'Andersen',
    model: 'A3',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['solar-integration', 'scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Premium model with larger capacity cable management.'
  },

  // ========== POD POINT ==========
  {
    id: 'podpoint-solo-3s',
    make: 'Pod Point',
    model: 'Solo 3S',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Simple and reliable. Available tethered or socketed.'
  },

  // ========== TESLA ==========
  {
    id: 'tesla-wall-connector-gen3',
    make: 'Tesla',
    model: 'Wall Connector Gen 3',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: false, // Requires external RCD
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Best for Tesla vehicles. Wi-Fi enabled. May require separate RCD.'
  },

  // ========== EVBOX ==========
  {
    id: 'evbox-elvi',
    make: 'EVBox',
    model: 'Elvi',
    powerOptions: [7.4, 11, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Commercial grade. Robust for high-use environments.'
  },

  // ========== ZAPTEC ==========
  {
    id: 'zaptec-go-2',
    make: 'Zaptec',
    model: 'Go 2',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Norwegian design. Very future-proof with OTA updates.'
  },
  {
    id: 'zaptec-pro',
    make: 'Zaptec',
    model: 'Pro',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'socketed',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Commercial model. Great for workplaces and flats.'
  },

  // ========== SYNC EV ==========
  {
    id: 'syncev-syncev',
    make: 'Sync EV',
    model: 'SyncEV',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Budget-friendly option. Reliable basic charger.'
  },

  // ========== ROLEC ==========
  {
    id: 'rolec-wallpod-ev',
    make: 'Rolec',
    model: 'WallPod EV',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: false,
    loadManagement: [],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Commercial focused. Simple and robust.'
  },
  {
    id: 'rolec-zura',
    make: 'Rolec',
    model: 'Zura',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Smart residential charger from Rolec.'
  },

  // ========== SIMPSON & PARTNERS ==========
  {
    id: 'simpson-partners-charge',
    make: 'Simpson & Partners',
    model: 'Charge',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'UK designed and made. Premium finish.'
  },

  // ========== EO ==========
  {
    id: 'eo-mini-pro-3',
    make: 'EO',
    model: 'Mini Pro 3',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Compact design. Good value smart charger.'
  },
  {
    id: 'eo-hub',
    make: 'EO',
    model: 'Hub',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'socketed',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Multi-point solution for workplaces.'
  },

  // ========== INDRA ==========
  {
    id: 'indra-smart-pro',
    make: 'Indra',
    model: 'Smart PRO',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['solar-integration', 'v2g'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'V2G capable. Future-proof for vehicle-to-grid.'
  },

  // ========== HYPERVOLT ==========
  {
    id: 'hypervolt-home-3',
    make: 'Hypervolt',
    model: 'Home 3',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'solar-integration', 'scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'App-focused with excellent software. Open API.'
  },

  // ========== PROJECT EV ==========
  {
    id: 'project-ev-pro',
    make: 'Project EV',
    model: 'Pro',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Affordable smart charger. Good installer margins.'
  },

  // ========== BG SYNCBOX ==========
  {
    id: 'bg-syncbox',
    make: 'BG',
    model: 'SyncBox',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'From British General. Wholesaler favourite.'
  },

  // ========== SEVADIS ==========
  {
    id: 'sevadis-garo',
    make: 'Sevadis',
    model: 'Garo GLB',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Commercial grade. OCPP compliant.'
  },

  // ========== EVA ==========
  {
    id: 'eva-scotland',
    make: 'EVA Scotland',
    model: 'Home',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Scottish manufacturer. Local support.'
  },

  // ========== ALFA POWER ==========
  {
    id: 'alfa-power-7kw',
    make: 'Alfa Power',
    model: 'AC 7kW',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Budget option. Basic smart features.'
  },

  // ========== CHARGEPOINT ==========
  {
    id: 'chargepoint-home-flex',
    make: 'ChargePoint',
    model: 'Home Flex',
    powerOptions: [7.4, 11],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: false,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'US brand in UK market. Large network ecosystem.'
  },

  // ========== ABB ==========
  {
    id: 'abb-terra-ac',
    make: 'ABB',
    model: 'Terra AC',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A + 6mA DC',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic', 'load-balancing'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'Premium commercial grade. Very reliable.'
  },

  // ========== SCHNEIDER ==========
  {
    id: 'schneider-evlink-home',
    make: 'Schneider',
    model: 'EVlink Home',
    powerOptions: [7.4],
    phases: [1],
    current: 32,
    socketType: 'Type 2',
    connection: 'tethered',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['scheduled'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'From trusted electrical brand. Good warranty.'
  },

  // ========== HAGER ==========
  {
    id: 'hager-witty',
    make: 'Hager',
    model: 'Witty',
    powerOptions: [7.4, 22],
    phases: [1, 3],
    current: 32,
    socketType: 'Type 2',
    connection: 'both',
    rcdType: 'Type A',
    rcdIntegral: true,
    smartEnabled: true,
    loadManagement: ['dynamic'],
    ozevApproved: true,
    recommendedCable: 6,
    notes: 'From Hager electrical. Compact design.'
  }
];

/**
 * Get unique list of charger makes
 */
export function getChargerMakes(): string[] {
  const makes = new Set(EV_CHARGERS.map(c => c.make));
  return Array.from(makes).sort();
}

/**
 * Get models for a specific make
 */
export function getChargerModels(make: string): string[] {
  return EV_CHARGERS
    .filter(c => c.make.toLowerCase() === make.toLowerCase())
    .map(c => c.model);
}

/**
 * Find charger by make and model
 */
export function findCharger(make: string, model: string): EVCharger | undefined {
  return EV_CHARGERS.find(
    c => c.make.toLowerCase() === make.toLowerCase() &&
         c.model.toLowerCase() === model.toLowerCase()
  );
}

/**
 * Search chargers by text query
 */
export function searchChargers(query: string): EVCharger[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return EV_CHARGERS.filter(c =>
    c.make.toLowerCase().includes(q) ||
    c.model.toLowerCase().includes(q) ||
    `${c.make} ${c.model}`.toLowerCase().includes(q)
  ).slice(0, 10); // Limit to 10 results
}

/**
 * Get display label for a charger
 */
export function getChargerLabel(charger: EVCharger): string {
  return `${charger.make} ${charger.model}`;
}

/**
 * Get power options display string
 */
export function getPowerOptionsLabel(charger: EVCharger): string {
  if (charger.powerOptions.length === 1) {
    return `${charger.powerOptions[0]}kW`;
  }
  return charger.powerOptions.map(p => `${p}kW`).join(' / ');
}

/**
 * Calculate current from power
 * Single phase: I = P(kW) × 1000 / 230V
 * Three phase: I = P(kW) × 1000 / (√3 × 400V)
 */
export function calculateCurrentFromPower(powerKW: number, phases: number): number {
  if (phases === 1) {
    return Math.round(powerKW * 1000 / 230);
  } else {
    return Math.round(powerKW * 1000 / (Math.sqrt(3) * 400));
  }
}

/**
 * Calculate power from current
 * Single phase: P = I × 230V / 1000
 * Three phase: P = I × √3 × 400V / 1000
 */
export function calculatePowerFromCurrent(currentA: number, phases: number): number {
  if (phases === 1) {
    return Math.round(currentA * 230 / 100) / 10; // Round to 1 decimal
  } else {
    return Math.round(currentA * Math.sqrt(3) * 400 / 100) / 10;
  }
}
