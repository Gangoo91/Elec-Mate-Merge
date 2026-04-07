/**
 * Fire Alarm Equipment Database
 *
 * Contains UK fire alarm control panels and detectors with verified specifications
 * from manufacturer documentation. All data sourced from official product pages.
 *
 * Standards Reference:
 * - BS 5839-1:2025 Fire detection and fire alarm systems for buildings
 * - BS EN 54 Fire detection and fire alarm systems
 *
 * UK Market Manufacturers:
 * - Advanced Electronics (UK market leader)
 * - Morley-IAS (Honeywell brand)
 * - Gent (Honeywell brand)
 * - Hochiki (Premium quality)
 * - Apollo Fire Detectors (Most common UK)
 * - Kentec Electronics (Budget-friendly)
 * - C-TEC (UK manufacturer)
 * - Notifier (Large systems)
 * - Eaton (Commercial)
 * - Aico (Domestic/HMO - Ei Electronics brand)
 */

export type PanelType =
  | 'conventional'
  | 'addressable'
  | 'analogue-addressable'
  | 'wireless'
  | 'hybrid';

export type DetectorProtocol =
  | 'apollo-discovery'
  | 'apollo-xp95'
  | 'apollo-soteria'
  | 'hochiki-esp'
  | 'hochiki-alg'
  | 'gent-s-quad'
  | 'morley-ias'
  | 'system-sensor'
  | 'notifier-opal'
  | 'conventional'
  | 'wireless'
  | 'multi-protocol'
  | 'aico-radiolink'
  | 'aico-smartlink'
  | 'fike-twinflex'
  | 'hyfire-wireless'
  | 'ems-firecell'
  | 'zeta';

export interface FireAlarmPanel {
  id: string;
  manufacturer: string;
  model: string;
  productCode?: string;
  panelType: PanelType;
  protocol: DetectorProtocol;
  loopCapacity: number; // Number of loops (0 for conventional)
  zoneCapacity: number; // Number of zones
  deviceCapacity?: number; // Max devices per loop (addressable)
  networkable: boolean; // Can be networked with other panels
  maxNetworkPanels?: number; // Max panels in network
  repeatersSupport: boolean;
  graphicDisplaySupport: boolean;
  causeEffectProgramming: boolean;
  approvals: string[]; // EN54, LPCB, etc.
  features: string[];
  notes?: string;
  // Power specs (for battery calculation auto-fill)
  quiescentCurrent?: number; // mA - standby current draw
  alarmCurrent?: number; // mA - full alarm current draw
  batteryAh?: number; // Recommended battery capacity
  yearIntroduced?: number; // For "NEW" badge
}

export interface FireAlarmDetector {
  id: string;
  manufacturer: string;
  model: string;
  productCode?: string;
  type:
    | 'optical-smoke'
    | 'ionisation-smoke'
    | 'heat-fixed'
    | 'heat-ror'
    | 'multi-sensor'
    | 'beam'
    | 'aspirating'
    | 'flame'
    | 'co'
    | 'call-point'
    | 'sounder'
    | 'sounder-beacon'
    | 'visual-alarm';
  protocol: DetectorProtocol;
  addressable: boolean;
  coverage?: string; // e.g., "100m² typical"
  sensitivity?: string; // Sensitivity range
  approvals: string[];
  features: string[];
  notes?: string;
}

/**
 * Fire Alarm Control Panels Database
 */
export const FIRE_ALARM_PANELS: FireAlarmPanel[] = [
  // ============================================
  // ADVANCED ELECTRONICS - UK Market Leader
  // ============================================
  {
    id: 'advanced-mxpro5-1',
    manufacturer: 'Advanced',
    model: 'MxPro 5 1-Loop',
    productCode: 'MX-5101',
    panelType: 'analogue-addressable',
    protocol: 'multi-protocol',
    loopCapacity: 1,
    zoneCapacity: 200,
    deviceCapacity: 200,
    networkable: true,
    maxNetworkPanels: 200,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: [
      'Multi-protocol',
      'Touch screen',
      'USB upload',
      'Event log 10000',
      'Network redundancy',
    ],
    notes: 'Supports Apollo, Hochiki, System Sensor protocols',
    quiescentCurrent: 180,
    alarmCurrent: 650,
    batteryAh: 7.2,
  },
  {
    id: 'advanced-mxpro5-2',
    manufacturer: 'Advanced',
    model: 'MxPro 5 2-Loop',
    productCode: 'MX-5202',
    panelType: 'analogue-addressable',
    protocol: 'multi-protocol',
    loopCapacity: 2,
    zoneCapacity: 200,
    deviceCapacity: 200,
    networkable: true,
    maxNetworkPanels: 200,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: [
      'Multi-protocol',
      'Touch screen',
      'USB upload',
      'Event log 10000',
      'Network redundancy',
    ],
    notes: 'Supports Apollo, Hochiki, System Sensor protocols',
    quiescentCurrent: 250,
    alarmCurrent: 850,
    batteryAh: 12,
  },
  {
    id: 'advanced-mxpro5-4',
    manufacturer: 'Advanced',
    model: 'MxPro 5 4-Loop',
    productCode: 'MX-5404',
    panelType: 'analogue-addressable',
    protocol: 'multi-protocol',
    loopCapacity: 4,
    zoneCapacity: 200,
    deviceCapacity: 200,
    networkable: true,
    maxNetworkPanels: 200,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: [
      'Multi-protocol',
      'Touch screen',
      'USB upload',
      'Event log 10000',
      'Network redundancy',
    ],
    notes: 'Ideal for medium-large installations',
  },
  {
    id: 'advanced-mxpro5-8',
    manufacturer: 'Advanced',
    model: 'MxPro 5 8-Loop',
    productCode: 'MX-5808',
    panelType: 'analogue-addressable',
    protocol: 'multi-protocol',
    loopCapacity: 8,
    zoneCapacity: 200,
    deviceCapacity: 200,
    networkable: true,
    maxNetworkPanels: 200,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: [
      'Multi-protocol',
      'Touch screen',
      'USB upload',
      'Event log 10000',
      'Network redundancy',
    ],
    notes: 'Large installation capability',
  },
  {
    id: 'advanced-quickzone-4',
    manufacturer: 'Advanced',
    model: 'QuickZone 4',
    productCode: 'QZ-4',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 4,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Budget friendly', 'Simple installation', 'LED indicators'],
    notes: 'Ideal for small premises',
  },
  {
    id: 'advanced-quickzone-8',
    manufacturer: 'Advanced',
    model: 'QuickZone 8',
    productCode: 'QZ-8',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 8,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Budget friendly', 'Simple installation', 'LED indicators'],
    notes: 'Ideal for small-medium premises',
  },

  // ============================================
  // MORLEY-IAS (Honeywell)
  // ============================================
  {
    id: 'morley-dxc1',
    manufacturer: 'Morley-IAS',
    model: 'DXc1 Single Loop',
    productCode: 'DXC1-40',
    panelType: 'analogue-addressable',
    protocol: 'morley-ias',
    loopCapacity: 1,
    zoneCapacity: 40,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Colour touch screen', 'USB programming', 'EN54-13 remote'],
    notes: 'Popular commercial panel',
  },
  {
    id: 'morley-dxc2',
    manufacturer: 'Morley-IAS',
    model: 'DXc2 Two Loop',
    productCode: 'DXC2-40',
    panelType: 'analogue-addressable',
    protocol: 'morley-ias',
    loopCapacity: 2,
    zoneCapacity: 40,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Colour touch screen', 'USB programming', 'EN54-13 remote'],
    notes: 'Medium installations',
  },
  {
    id: 'morley-dxc4',
    manufacturer: 'Morley-IAS',
    model: 'DXc4 Four Loop',
    productCode: 'DXC4-40',
    panelType: 'analogue-addressable',
    protocol: 'morley-ias',
    loopCapacity: 4,
    zoneCapacity: 40,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Colour touch screen', 'USB programming', 'EN54-13 remote'],
    notes: 'Large commercial installations',
  },
  {
    id: 'morley-horizon-1',
    manufacturer: 'Morley-IAS',
    model: 'Horizon 1 Loop',
    productCode: 'HRZ-1E',
    panelType: 'analogue-addressable',
    protocol: 'morley-ias',
    loopCapacity: 1,
    zoneCapacity: 99,
    deviceCapacity: 159,
    networkable: true,
    maxNetworkPanels: 127,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Large network capability', 'Colour display', 'Comprehensive logging'],
    notes: 'High-end commercial/industrial',
  },

  // ============================================
  // GENT (Honeywell)
  // ============================================
  {
    id: 'gent-vigilon-1',
    manufacturer: 'Gent',
    model: 'Vigilon Single Loop',
    productCode: '?"VIG-1-NC',
    panelType: 'analogue-addressable',
    protocol: 'gent-s-quad',
    loopCapacity: 1,
    zoneCapacity: 250,
    deviceCapacity: 250,
    networkable: true,
    maxNetworkPanels: 200,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB', 'VdS'],
    features: ['S-Quad protocol', 'Colour graphics', 'Ethernet networking'],
    notes: 'Premium quality system',
  },
  {
    id: 'gent-vigilon-2',
    manufacturer: 'Gent',
    model: 'Vigilon Two Loop',
    productCode: 'VIG-2-NC',
    panelType: 'analogue-addressable',
    protocol: 'gent-s-quad',
    loopCapacity: 2,
    zoneCapacity: 250,
    deviceCapacity: 250,
    networkable: true,
    maxNetworkPanels: 200,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB', 'VdS'],
    features: ['S-Quad protocol', 'Colour graphics', 'Ethernet networking'],
    notes: 'Premium quality system',
  },
  {
    id: 'gent-compact-1',
    manufacturer: 'Gent',
    model: 'Compact 1 Loop',
    productCode: '?"S4-34401',
    panelType: 'analogue-addressable',
    protocol: 'gent-s-quad',
    loopCapacity: 1,
    zoneCapacity: 99,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: false,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['S-Quad protocol', 'Compact size', 'Cost effective'],
    notes: 'Budget-friendly Gent option',
  },

  // ============================================
  // HOCHIKI
  // ============================================
  {
    id: 'hochiki-latitude-1',
    manufacturer: 'Hochiki',
    model: 'L@titude Single Loop',
    productCode: 'LAT-1',
    panelType: 'analogue-addressable',
    protocol: 'hochiki-esp',
    loopCapacity: 1,
    zoneCapacity: 128,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 127,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['ESP protocol', 'Touch screen', 'Graphic mimic support'],
    notes: 'High quality Japanese engineering',
  },
  {
    id: 'hochiki-latitude-2',
    manufacturer: 'Hochiki',
    model: 'L@titude Two Loop',
    productCode: 'LAT-2',
    panelType: 'analogue-addressable',
    protocol: 'hochiki-esp',
    loopCapacity: 2,
    zoneCapacity: 128,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 127,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['ESP protocol', 'Touch screen', 'Graphic mimic support'],
    notes: 'Medium-large installations',
  },
  {
    id: 'hochiki-latitude-4',
    manufacturer: 'Hochiki',
    model: 'L@titude Four Loop',
    productCode: 'LAT-4',
    panelType: 'analogue-addressable',
    protocol: 'hochiki-esp',
    loopCapacity: 4,
    zoneCapacity: 128,
    deviceCapacity: 127,
    networkable: true,
    maxNetworkPanels: 127,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['ESP protocol', 'Touch screen', 'Graphic mimic support'],
    notes: 'Large installations',
  },
  {
    id: 'hochiki-firescape',
    manufacturer: 'Hochiki',
    model: 'FIREscape+ 1 Loop',
    productCode: 'FIRESCAPE-1',
    panelType: 'analogue-addressable',
    protocol: 'hochiki-esp',
    loopCapacity: 1,
    zoneCapacity: 64,
    deviceCapacity: 126,
    networkable: false,
    repeatersSupport: true,
    graphicDisplaySupport: false,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Integrated emergency lighting control', 'ESP protocol'],
    notes: 'Combined fire alarm and emergency lighting',
  },

  // ============================================
  // KENTEC ELECTRONICS
  // ============================================
  {
    id: 'kentec-syncro-1',
    manufacturer: 'Kentec',
    model: 'Syncro AS 1 Loop',
    productCode: 'KA11020M2',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 1,
    zoneCapacity: 126,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Touch screen option', 'Cost effective'],
    notes: 'Popular budget-friendly addressable panel',
  },
  {
    id: 'kentec-syncro-2',
    manufacturer: 'Kentec',
    model: 'Syncro AS 2 Loop',
    productCode: 'KA11040M2',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 2,
    zoneCapacity: 252,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Touch screen option', 'Cost effective'],
    notes: 'Medium installations',
  },
  {
    id: 'kentec-syncro-4',
    manufacturer: 'Kentec',
    model: 'Syncro AS 4 Loop',
    productCode: 'KA11080M2',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 4,
    zoneCapacity: 504,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Touch screen option', 'Cost effective'],
    notes: 'Large installations',
  },
  {
    id: 'kentec-sigma-cp-4',
    manufacturer: 'Kentec',
    model: 'Sigma CP 4 Zone',
    productCode: 'K11040M2',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 4,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Budget friendly', 'Simple', 'Reliable'],
    notes: 'Small premises',
  },
  {
    id: 'kentec-sigma-cp-8',
    manufacturer: 'Kentec',
    model: 'Sigma CP 8 Zone',
    productCode: 'K11080M2',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 8,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Budget friendly', 'Simple', 'Reliable'],
    notes: 'Small-medium premises',
  },

  // ============================================
  // C-TEC
  // ============================================
  {
    id: 'ctec-xfp-1',
    manufacturer: 'C-TEC',
    model: 'XFP 1 Loop',
    productCode: 'XFP501/X',
    panelType: 'analogue-addressable',
    protocol: 'apollo-xp95',
    loopCapacity: 1,
    zoneCapacity: 99,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo XP95/Discovery compatible', 'Touch screen', 'UK made'],
    notes: 'UK manufactured quality',
  },
  {
    id: 'ctec-xfp-2',
    manufacturer: 'C-TEC',
    model: 'XFP 2 Loop',
    productCode: 'XFP502/X',
    panelType: 'analogue-addressable',
    protocol: 'apollo-xp95',
    loopCapacity: 2,
    zoneCapacity: 198,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo XP95/Discovery compatible', 'Touch screen', 'UK made'],
    notes: 'Medium installations',
  },
  {
    id: 'ctec-cfp-4',
    manufacturer: 'C-TEC',
    model: 'CFP 4 Zone',
    productCode: 'CFP704-4',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 4,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['UK made', 'Relay outputs', 'Compact'],
    notes: 'Budget-friendly conventional',
  },
  {
    id: 'ctec-cfp-8',
    manufacturer: 'C-TEC',
    model: 'CFP 8 Zone',
    productCode: 'CFP708-4',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 8,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['UK made', 'Relay outputs', 'Compact'],
    notes: 'Budget-friendly conventional',
  },

  // ============================================
  // NOTIFIER (Honeywell)
  // ============================================
  {
    id: 'notifier-id3000-2',
    manufacturer: 'Notifier',
    model: 'ID3000 2 Loop',
    productCode: 'ID3002',
    panelType: 'analogue-addressable',
    protocol: 'notifier-opal',
    loopCapacity: 2,
    zoneCapacity: 159,
    deviceCapacity: 159,
    networkable: true,
    maxNetworkPanels: 99,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB', 'FM'],
    features: ['OPAL protocol', 'Colour display', 'Large event log'],
    notes: 'Premium commercial/industrial',
  },
  {
    id: 'notifier-id3000-4',
    manufacturer: 'Notifier',
    model: 'ID3000 4 Loop',
    productCode: 'ID3004',
    panelType: 'analogue-addressable',
    protocol: 'notifier-opal',
    loopCapacity: 4,
    zoneCapacity: 159,
    deviceCapacity: 159,
    networkable: true,
    maxNetworkPanels: 99,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB', 'FM'],
    features: ['OPAL protocol', 'Colour display', 'Large event log'],
    notes: 'Large installations',
  },
  {
    id: 'notifier-nfs-320',
    manufacturer: 'Notifier',
    model: 'NFS-320 SLC',
    productCode: 'NFS-320',
    panelType: 'analogue-addressable',
    protocol: 'notifier-opal',
    loopCapacity: 1,
    zoneCapacity: 99,
    deviceCapacity: 159,
    networkable: true,
    maxNetworkPanels: 103,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'UL', 'FM'],
    features: ['FLASHSCAN technology', 'VeriFire Tools programming'],
    notes: 'International standard panel',
  },

  // ============================================
  // EATON
  // ============================================
  {
    id: 'eaton-cf3000-1',
    manufacturer: 'Eaton',
    model: 'CF3000 1 Loop',
    productCode: 'CF3000-1',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 1,
    zoneCapacity: 126,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Colour touch screen', 'Ethernet'],
    notes: 'Commercial grade',
  },
  {
    id: 'eaton-cf3000-2',
    manufacturer: 'Eaton',
    model: 'CF3000 2 Loop',
    productCode: 'CF3000-2',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 2,
    zoneCapacity: 252,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Colour touch screen', 'Ethernet'],
    notes: 'Medium-large installations',
  },
  {
    id: 'eaton-mf9000-4',
    manufacturer: 'Eaton',
    model: 'MF9000 4 Zone',
    productCode: 'MF9404',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 4,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Cost effective', 'Simple installation'],
    notes: 'Small premises',
  },
  {
    id: 'eaton-mf9000-8',
    manufacturer: 'Eaton',
    model: 'MF9000 8 Zone',
    productCode: 'MF9408',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 8,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Cost effective', 'Simple installation'],
    notes: 'Small-medium premises',
  },

  // ============================================
  // APOLLO (Panels)
  // ============================================
  {
    id: 'apollo-xplorer-1',
    manufacturer: 'Apollo',
    model: 'XPLorer 1 Loop',
    productCode: 'XP1-1',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 1,
    zoneCapacity: 126,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Native Discovery protocol', 'Touch screen', 'USB config'],
    notes: 'Apollo native panel',
  },
  {
    id: 'apollo-xplorer-2',
    manufacturer: 'Apollo',
    model: 'XPLorer 2 Loop',
    productCode: 'XP1-2',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 2,
    zoneCapacity: 252,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Native Discovery protocol', 'Touch screen', 'USB config'],
    notes: 'Apollo native panel - medium installations',
  },

  // ============================================
  // AICO (Ei Electronics) - Domestic/HMO
  // BS 5839-6 Grade D Systems
  // ============================================
  {
    id: 'aico-ei1000g',
    manufacturer: 'Aico',
    model: 'Ei1000G SmartLINK Gateway',
    productCode: 'Ei1000G',
    panelType: 'wireless',
    protocol: 'aico-smartlink',
    loopCapacity: 0,
    zoneCapacity: 12,
    deviceCapacity: 12,
    networkable: true,
    maxNetworkPanels: 1,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['BS 5839-6'],
    features: ['SmartLINK app', 'Real-time monitoring', 'Remote notifications', 'Data logging'],
    notes: 'Smart home integration gateway for Ei3000 series - HMO/domestic',
  },
  {
    id: 'aico-ei414',
    manufacturer: 'Aico',
    model: 'Ei414 Fire/CO Alarm Interface',
    productCode: 'Ei414',
    panelType: 'wireless',
    protocol: 'aico-radiolink',
    loopCapacity: 0,
    zoneCapacity: 24,
    deviceCapacity: 24,
    networkable: true,
    maxNetworkPanels: 1,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['BS 5839-6'],
    features: ['Relay outputs', 'Monitored inputs', 'Telecare compatible', 'Volt-free contacts'],
    notes: 'Interface for connecting to telecare/warden call systems',
  },
  {
    id: 'aico-ei450',
    manufacturer: 'Aico',
    model: 'Ei450 RadioLINK Alarm Controller',
    productCode: 'Ei450',
    panelType: 'wireless',
    protocol: 'aico-radiolink',
    loopCapacity: 0,
    zoneCapacity: 12,
    deviceCapacity: 12,
    networkable: true,
    maxNetworkPanels: 1,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['BS 5839-6'],
    features: ['Locate function', 'Test button', 'Hush function', 'Battery powered'],
    notes: 'Handheld controller for RadioLINK+ systems',
  },
  {
    id: 'aico-ei168rc',
    manufacturer: 'Aico',
    model: 'Ei168RC RadioLINK+ Base',
    productCode: 'Ei168RC',
    panelType: 'wireless',
    protocol: 'aico-radiolink',
    loopCapacity: 0,
    zoneCapacity: 12,
    deviceCapacity: 12,
    networkable: true,
    maxNetworkPanels: 1,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['BS 5839-6'],
    features: ['House coding', 'Interconnection base', 'Easy retrofit'],
    notes: 'Converts hard-wired alarms to wireless interconnection',
  },

  // ============================================
  // FIKE ELECTRONICS
  // ============================================
  {
    id: 'fike-twinflex-pro-2',
    manufacturer: 'Fike',
    model: 'Twinflex Pro 2 Zone',
    productCode: '505-0002',
    panelType: 'conventional',
    protocol: 'fike-twinflex',
    loopCapacity: 0,
    zoneCapacity: 2,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Two-wire technology', 'Reduced cable costs', 'Simple programming'],
    notes: 'Two-wire conventional — halves cable runs',
  },
  {
    id: 'fike-twinflex-pro-4',
    manufacturer: 'Fike',
    model: 'Twinflex Pro 4 Zone',
    productCode: '505-0004',
    panelType: 'conventional',
    protocol: 'fike-twinflex',
    loopCapacity: 0,
    zoneCapacity: 4,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Two-wire technology', 'Reduced cable costs', 'Simple programming'],
    notes: 'Two-wire conventional — halves cable runs',
  },
  {
    id: 'fike-twinflex-pro-8',
    manufacturer: 'Fike',
    model: 'Twinflex Pro 8 Zone',
    productCode: '505-0008',
    panelType: 'conventional',
    protocol: 'fike-twinflex',
    loopCapacity: 0,
    zoneCapacity: 8,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Two-wire technology', 'Reduced cable costs', 'Simple programming'],
    notes: 'Two-wire conventional — small-medium premises',
  },
  {
    id: 'fike-duocel-1',
    manufacturer: 'Fike',
    model: 'Duocel 1 Loop',
    productCode: '505-1001',
    panelType: 'analogue-addressable',
    protocol: 'fike-twinflex',
    loopCapacity: 1,
    zoneCapacity: 128,
    deviceCapacity: 128,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Touch screen', 'Graphic mimic', 'Two-wire loop option'],
    notes: 'Addressable panel with two-wire loop capability',
  },
  {
    id: 'fike-duocel-2',
    manufacturer: 'Fike',
    model: 'Duocel 2 Loop',
    productCode: '505-1002',
    panelType: 'analogue-addressable',
    protocol: 'fike-twinflex',
    loopCapacity: 2,
    zoneCapacity: 256,
    deviceCapacity: 128,
    networkable: true,
    maxNetworkPanels: 32,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Touch screen', 'Graphic mimic', 'Two-wire loop option'],
    notes: 'Medium-large installations',
  },

  // ============================================
  // HYFIRE (Wireless)
  // ============================================
  {
    id: 'hyfire-hfw-p-01',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless 1 Loop',
    productCode: 'HFW-P-01',
    panelType: 'wireless',
    protocol: 'hyfire-wireless',
    loopCapacity: 1,
    zoneCapacity: 64,
    deviceCapacity: 240,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'EN54-25', 'LPCB'],
    features: ['Fully wireless', 'Mesh networking', 'No cable required', 'Battery powered devices'],
    notes: 'Leading UK wireless fire alarm system — heritage/retrofit',
  },
  {
    id: 'hyfire-hfw-p-02',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless 2 Loop',
    productCode: 'HFW-P-02',
    panelType: 'wireless',
    protocol: 'hyfire-wireless',
    loopCapacity: 2,
    zoneCapacity: 128,
    deviceCapacity: 240,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'EN54-25', 'LPCB'],
    features: ['Fully wireless', 'Mesh networking', 'No cable required'],
    notes: 'Larger wireless installations',
  },
  {
    id: 'hyfire-hfw-translator',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless Translator',
    productCode: 'HFW-TL-01',
    panelType: 'hybrid',
    protocol: 'hyfire-wireless',
    loopCapacity: 0,
    zoneCapacity: 32,
    deviceCapacity: 240,
    networkable: true,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-25'],
    features: ['Adds wireless to existing panels', 'Any panel compatible', 'Zone input/output'],
    notes: 'Translator gateway — adds wireless devices to any conventional/addressable panel',
  },

  // ============================================
  // EMS (FireCell Wireless)
  // ============================================
  {
    id: 'ems-firecell-panel',
    manufacturer: 'EMS',
    model: 'FireCell Wireless Panel',
    productCode: 'FC-P-01',
    panelType: 'wireless',
    protocol: 'ems-firecell',
    loopCapacity: 1,
    zoneCapacity: 64,
    deviceCapacity: 128,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'EN54-25', 'LPCB'],
    features: ['Wireless mesh', 'Hybrid capable', '10-year battery life', 'Supervised link'],
    notes: 'Professional wireless fire alarm — heritage and listed buildings',
  },
  {
    id: 'ems-firecell-hybrid',
    manufacturer: 'EMS',
    model: 'FireCell Hybrid Panel',
    productCode: 'FC-HP-01',
    panelType: 'hybrid',
    protocol: 'ems-firecell',
    loopCapacity: 1,
    zoneCapacity: 64,
    deviceCapacity: 128,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'EN54-25', 'LPCB'],
    features: ['Wired + wireless devices', 'Mixed installations', 'Phased migration'],
    notes: 'Mix wired and wireless — ideal for extensions to existing systems',
  },

  // ============================================
  // ZETA ALARMS
  // ============================================
  {
    id: 'zeta-simplicity-2',
    manufacturer: 'Zeta',
    model: 'Simplicity 2 Zone',
    productCode: 'S2-CP',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 2,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Budget friendly', 'LED indicators', 'Simple wiring'],
    notes: 'Entry-level conventional panel',
  },
  {
    id: 'zeta-simplicity-4',
    manufacturer: 'Zeta',
    model: 'Simplicity 4 Zone',
    productCode: 'S4-CP',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 4,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Budget friendly', 'LED indicators', 'Simple wiring'],
    notes: 'Small premises',
  },
  {
    id: 'zeta-infinity-8',
    manufacturer: 'Zeta',
    model: 'Infinity 8 Zone',
    productCode: 'INF-8',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 8,
    networkable: false,
    repeatersSupport: false,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Repeater output', 'Programmable', 'Relay outputs'],
    notes: 'Medium premises',
  },
  {
    id: 'zeta-infinity-16',
    manufacturer: 'Zeta',
    model: 'Infinity 16 Zone',
    productCode: 'INF-16',
    panelType: 'conventional',
    protocol: 'conventional',
    loopCapacity: 0,
    zoneCapacity: 16,
    networkable: false,
    repeatersSupport: true,
    graphicDisplaySupport: false,
    causeEffectProgramming: false,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Repeater output', 'Programmable', 'Relay outputs'],
    notes: 'Larger conventional installations',
  },
  {
    id: 'zeta-fyreye-mkii-1',
    manufacturer: 'Zeta',
    model: 'Fyreye MKII 1 Loop',
    productCode: 'FE-MKII-1',
    panelType: 'analogue-addressable',
    protocol: 'zeta',
    loopCapacity: 1,
    zoneCapacity: 126,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Touch screen', 'USB programming', 'Cost effective addressable'],
    notes: 'Budget-friendly addressable panel',
  },
  {
    id: 'zeta-fyreye-mkii-2',
    manufacturer: 'Zeta',
    model: 'Fyreye MKII 2 Loop',
    productCode: 'FE-MKII-2',
    panelType: 'analogue-addressable',
    protocol: 'zeta',
    loopCapacity: 2,
    zoneCapacity: 252,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Touch screen', 'USB programming', 'Cost effective addressable'],
    notes: 'Medium installations',
  },

  // ============================================
  // ARGUS
  // ============================================
  {
    id: 'argus-vega-lite',
    manufacturer: 'Argus',
    model: 'Vega Lite 1 Loop',
    productCode: 'VG-L1',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 1,
    zoneCapacity: 126,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 8,
    repeatersSupport: true,
    graphicDisplaySupport: false,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4'],
    features: ['Apollo protocol', 'Compact design', 'Cost effective'],
    notes: 'Budget Apollo-compatible panel',
  },
  {
    id: 'argus-vega-pro-1',
    manufacturer: 'Argus',
    model: 'Vega Pro 1 Loop',
    productCode: 'VG-P1',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 1,
    zoneCapacity: 126,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Touch screen', 'Graphic mimic support'],
    notes: 'Full-featured Apollo-compatible panel',
  },
  {
    id: 'argus-vega-pro-2',
    manufacturer: 'Argus',
    model: 'Vega Pro 2 Loop',
    productCode: 'VG-P2',
    panelType: 'analogue-addressable',
    protocol: 'apollo-discovery',
    loopCapacity: 2,
    zoneCapacity: 252,
    deviceCapacity: 126,
    networkable: true,
    maxNetworkPanels: 16,
    repeatersSupport: true,
    graphicDisplaySupport: true,
    causeEffectProgramming: true,
    approvals: ['EN54-2', 'EN54-4', 'LPCB'],
    features: ['Apollo protocol', 'Touch screen', 'Graphic mimic support'],
    notes: 'Medium-large installations',
  },
];

/**
 * Fire Alarm Detectors Database (common detector types)
 */
export const FIRE_ALARM_DETECTORS: FireAlarmDetector[] = [
  // Apollo Discovery (most common UK)
  {
    id: 'apollo-discovery-optical',
    manufacturer: 'Apollo',
    model: 'Discovery Optical Smoke',
    productCode: '58000-600',
    type: 'optical-smoke',
    protocol: 'apollo-discovery',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB'],
    features: ['360° optical chamber', 'High immunity to false alarms'],
    notes: 'Most common UK detector',
  },
  {
    id: 'apollo-discovery-heat',
    manufacturer: 'Apollo',
    model: 'Discovery Heat A1R',
    productCode: '58000-400',
    type: 'heat-ror',
    protocol: 'apollo-discovery',
    addressable: true,
    coverage: '50m² typical',
    approvals: ['EN54-5', 'LPCB'],
    features: ['Rate of rise detection', 'A1R classification'],
    notes: 'For kitchens, dusty areas',
  },
  {
    id: 'apollo-discovery-multi',
    manufacturer: 'Apollo',
    model: 'Discovery Multisensor',
    productCode: '58000-700',
    type: 'multi-sensor',
    protocol: 'apollo-discovery',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-5', 'EN54-7', 'LPCB'],
    features: ['Combined smoke and heat', 'Drift compensation'],
    notes: 'Best for varied fire risks',
  },
  {
    id: 'apollo-xp95-optical',
    manufacturer: 'Apollo',
    model: 'XP95 Optical Smoke',
    productCode: '55000-600',
    type: 'optical-smoke',
    protocol: 'apollo-xp95',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB'],
    features: ['Legacy XP95 protocol', 'Widely installed'],
    notes: 'For existing XP95 systems',
  },
  {
    id: 'apollo-soteria-optical',
    manufacturer: 'Apollo',
    model: 'Soteria Optical Smoke',
    productCode: 'SOT-OP',
    type: 'optical-smoke',
    protocol: 'apollo-soteria',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB'],
    features: ['Open protocol', 'Advanced analytics'],
    notes: 'Latest Apollo technology',
  },

  // Hochiki
  {
    id: 'hochiki-alg-en-optical',
    manufacturer: 'Hochiki',
    model: 'ALG-EN Optical Smoke',
    productCode: 'ALG-EN',
    type: 'optical-smoke',
    protocol: 'hochiki-esp',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB'],
    features: ['ESP protocol', 'High sensitivity'],
    notes: 'Premium quality',
  },
  {
    id: 'hochiki-atj-en-heat',
    manufacturer: 'Hochiki',
    model: 'ATJ-EN Heat',
    productCode: 'ATJ-EN',
    type: 'heat-ror',
    protocol: 'hochiki-esp',
    addressable: true,
    coverage: '50m² typical',
    approvals: ['EN54-5', 'LPCB'],
    features: ['ESP protocol', 'Rate of rise'],
    notes: 'For harsh environments',
  },
  {
    id: 'hochiki-acc-en-multi',
    manufacturer: 'Hochiki',
    model: 'ACC-EN Multisensor',
    productCode: 'ACC-EN',
    type: 'multi-sensor',
    protocol: 'hochiki-esp',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-5', 'EN54-7', 'LPCB'],
    features: ['ESP protocol', 'Optical + Heat'],
    notes: 'Premium multisensor',
  },

  // Call Points
  {
    id: 'apollo-discovery-mcp',
    manufacturer: 'Apollo',
    model: 'Discovery Manual Call Point',
    productCode: '58100-950',
    type: 'call-point',
    protocol: 'apollo-discovery',
    addressable: true,
    approvals: ['EN54-11', 'LPCB'],
    features: ['Resettable element', 'Weatherproof option'],
    notes: 'Standard call point',
  },
  {
    id: 'hochiki-ccp-e-mcp',
    manufacturer: 'Hochiki',
    model: 'CCP-E Manual Call Point',
    productCode: 'CCP-E',
    type: 'call-point',
    protocol: 'hochiki-esp',
    addressable: true,
    approvals: ['EN54-11', 'LPCB'],
    features: ['Resettable', 'Short circuit isolator'],
    notes: 'ESP protocol call point',
  },
  {
    id: 'kac-mcp-conv',
    manufacturer: 'KAC',
    model: 'W1A Conventional MCP',
    productCode: 'W1A-R680SG-K013',
    type: 'call-point',
    protocol: 'conventional',
    addressable: false,
    approvals: ['EN54-11'],
    features: ['Break glass', 'Resettable options'],
    notes: 'Budget conventional',
  },

  // Sounders
  {
    id: 'apollo-discovery-sounder',
    manufacturer: 'Apollo',
    model: 'Discovery Sounder',
    productCode: '58000-001',
    type: 'sounder',
    protocol: 'apollo-discovery',
    addressable: true,
    approvals: ['EN54-3'],
    features: ['32 tones', 'Adjustable volume'],
    notes: 'Addressable sounder',
  },
  {
    id: 'apollo-conv-sounder',
    manufacturer: 'Apollo',
    model: 'Conventional Sounder',
    productCode: '55000-001',
    type: 'sounder',
    protocol: 'conventional',
    addressable: false,
    approvals: ['EN54-3'],
    features: ['Multiple tones', 'High output'],
    notes: 'Standard sounder',
  },
  {
    id: 'hochiki-chq-wsb-sounder-beacon',
    manufacturer: 'Hochiki',
    model: 'CHQ-WSB Sounder Beacon',
    productCode: 'CHQ-WSB',
    type: 'sounder-beacon',
    protocol: 'hochiki-esp',
    addressable: true,
    approvals: ['EN54-3', 'EN54-23'],
    features: ['Combined sounder and beacon', 'Multiple colours'],
    notes: 'Wall mounted',
  },

  // Visual Alarm Devices
  {
    id: 'apollo-vad-red',
    manufacturer: 'Apollo',
    model: 'Addressable VAD Red',
    productCode: '58000-005',
    type: 'visual-alarm',
    protocol: 'apollo-discovery',
    addressable: true,
    approvals: ['EN54-23'],
    features: ['Wall or ceiling mount', 'High intensity'],
    notes: 'Visual alarm device',
  },
  {
    id: 'hochiki-chq-ab-beacon',
    manufacturer: 'Hochiki',
    model: 'CHQ-AB Beacon',
    productCode: 'CHQ-AB',
    type: 'visual-alarm',
    protocol: 'hochiki-esp',
    addressable: true,
    approvals: ['EN54-23'],
    features: ['Multiple flash rates', 'Colour options'],
    notes: 'Addressable beacon',
  },

  // ============================================
  // AICO (Ei Electronics) - Domestic/HMO Alarms
  // BS 5839-6 Grade D Compliant
  // ============================================

  // Ei3000 Series - Mains Powered with 10-year Lithium Backup
  {
    id: 'aico-ei3016',
    manufacturer: 'Aico',
    model: 'Ei3016 Optical Smoke Alarm',
    productCode: 'Ei3016',
    type: 'optical-smoke',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 14604', 'BS 5839-6'],
    features: [
      '10-year sealed lithium battery',
      'Mains powered',
      'AudioLINK+',
      'RadioLINK+ compatible',
      'Easi-fit base',
    ],
    notes: 'Premium domestic optical smoke alarm - HMO compliant',
  },
  {
    id: 'aico-ei3014',
    manufacturer: 'Aico',
    model: 'Ei3014 Heat Alarm',
    productCode: 'Ei3014',
    type: 'heat-fixed',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Kitchen/garage',
    approvals: ['BS EN 14604', 'BS 5839-6'],
    features: [
      '10-year sealed lithium battery',
      'Mains powered',
      'AudioLINK+',
      'RadioLINK+ compatible',
      'Easi-fit base',
    ],
    notes: 'For kitchens and garages where smoke alarms not suitable',
  },
  {
    id: 'aico-ei3018',
    manufacturer: 'Aico',
    model: 'Ei3018 CO Alarm',
    productCode: 'Ei3018',
    type: 'co',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 50291-1', 'BS 5839-6'],
    features: [
      '10-year sealed lithium battery',
      'Mains powered',
      'AudioLINK+',
      'RadioLINK+ compatible',
      'LCD display',
    ],
    notes: 'Carbon monoxide alarm with interconnection',
  },
  {
    id: 'aico-ei3024',
    manufacturer: 'Aico',
    model: 'Ei3024 Multi-Sensor Fire Alarm',
    productCode: 'Ei3024',
    type: 'multi-sensor',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 14604', 'BS 5839-6'],
    features: [
      '10-year sealed lithium battery',
      'Mains powered',
      'AudioLINK+',
      'RadioLINK+ compatible',
      'Optical + heat',
    ],
    notes: 'Multi-sensor for reduced false alarms - ideal for hallways',
  },
  {
    id: 'aico-ei3028',
    manufacturer: 'Aico',
    model: 'Ei3028 Multi-Sensor Fire/CO Alarm',
    productCode: 'Ei3028',
    type: 'multi-sensor',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 14604', 'BS EN 50291-1', 'BS 5839-6'],
    features: [
      '10-year sealed lithium battery',
      'Mains powered',
      'AudioLINK+',
      'RadioLINK+ compatible',
      'Fire + CO detection',
    ],
    notes: 'Combined fire and CO detection in one unit',
  },

  // Ei600 Series - Battery Powered (10-year sealed lithium)
  {
    id: 'aico-ei650',
    manufacturer: 'Aico',
    model: 'Ei650 Optical Smoke Alarm',
    productCode: 'Ei650',
    type: 'optical-smoke',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 14604', 'BS 5839-6'],
    features: [
      '10-year sealed lithium battery',
      'Battery only',
      'RadioLINK+ compatible',
      'Test/hush button',
    ],
    notes: 'Battery-only optical smoke alarm - no mains required',
  },
  {
    id: 'aico-ei650irf',
    manufacturer: 'Aico',
    model: 'Ei650iRF Optical Smoke Alarm with RadioLINK+',
    productCode: 'Ei650iRF',
    type: 'optical-smoke',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 14604', 'BS 5839-6'],
    features: ['10-year sealed lithium battery', 'Built-in RadioLINK+', 'No module needed'],
    notes: 'Battery smoke alarm with built-in wireless interconnect',
  },
  {
    id: 'aico-ei603trf',
    manufacturer: 'Aico',
    model: 'Ei603TRF Heat Alarm with RadioLINK+',
    productCode: 'Ei603TRF',
    type: 'heat-fixed',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Kitchen/garage',
    approvals: ['BS EN 14604', 'BS 5839-6'],
    features: ['10-year sealed lithium battery', 'Built-in RadioLINK+', 'No module needed'],
    notes: 'Battery heat alarm with built-in wireless interconnect',
  },
  {
    id: 'aico-ei208',
    manufacturer: 'Aico',
    model: 'Ei208 CO Alarm',
    productCode: 'Ei208',
    type: 'co',
    protocol: 'conventional',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 50291-1'],
    features: ['7-year sealed lithium battery', 'LCD display', 'Test button', 'Memory feature'],
    notes: 'Standalone CO alarm - best seller',
  },
  {
    id: 'aico-ei208irf',
    manufacturer: 'Aico',
    model: 'Ei208iRF CO Alarm with RadioLINK+',
    productCode: 'Ei208iRF',
    type: 'co',
    protocol: 'aico-radiolink',
    addressable: false,
    coverage: 'Single room',
    approvals: ['BS EN 50291-1'],
    features: ['10-year sealed lithium battery', 'Built-in RadioLINK+', 'LCD display'],
    notes: 'CO alarm with wireless interconnect',
  },

  // ============================================
  // GENT S-Quad Detectors
  // ============================================
  {
    id: 'gent-s-quad-optical',
    manufacturer: 'Gent',
    model: 'S-Quad Optical Smoke',
    productCode: 'S4-710',
    type: 'optical-smoke',
    protocol: 'gent-s-quad',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB', 'VdS'],
    features: ['S-Quad protocol', 'Drift compensation', 'Dual LED indication'],
    notes: 'Premium Gent detector',
  },
  {
    id: 'gent-s-quad-heat',
    manufacturer: 'Gent',
    model: 'S-Quad Heat A1R',
    productCode: 'S4-720',
    type: 'heat-ror',
    protocol: 'gent-s-quad',
    addressable: true,
    coverage: '50m² typical',
    approvals: ['EN54-5', 'LPCB', 'VdS'],
    features: ['S-Quad protocol', 'Rate of rise', 'A1R classification'],
    notes: 'For kitchens and dusty environments',
  },
  {
    id: 'gent-s-quad-multi',
    manufacturer: 'Gent',
    model: 'S-Quad Multisensor',
    productCode: 'S4-715',
    type: 'multi-sensor',
    protocol: 'gent-s-quad',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-5', 'EN54-7', 'LPCB', 'VdS'],
    features: ['S-Quad protocol', 'Optical + thermal', 'Advanced algorithms'],
    notes: 'Premium multisensor — false alarm reduction',
  },
  {
    id: 'gent-s-quad-mcp',
    manufacturer: 'Gent',
    model: 'S-Quad Manual Call Point',
    productCode: 'S4-34800',
    type: 'call-point',
    protocol: 'gent-s-quad',
    addressable: true,
    approvals: ['EN54-11', 'LPCB'],
    features: ['Resettable element', 'Built-in isolator'],
    notes: 'S-Quad protocol call point',
  },
  {
    id: 'gent-s-quad-sounder',
    manufacturer: 'Gent',
    model: 'S-Quad Sounder',
    productCode: 'S4-34410',
    type: 'sounder',
    protocol: 'gent-s-quad',
    addressable: true,
    approvals: ['EN54-3'],
    features: ['32 tones', 'Volume control', 'Addressable'],
    notes: 'S-Quad sounder base',
  },

  // ============================================
  // MORLEY-IAS Detectors
  // ============================================
  {
    id: 'morley-mi-ptse-optical',
    manufacturer: 'Morley-IAS',
    model: 'MI-PTSE Optical Smoke',
    productCode: 'MI-PTSE-S2I',
    type: 'optical-smoke',
    protocol: 'morley-ias',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB'],
    features: ['Built-in isolator', 'Drift compensation'],
    notes: 'Morley-IAS protocol detector',
  },
  {
    id: 'morley-mi-ptse-heat',
    manufacturer: 'Morley-IAS',
    model: 'MI-PTSE Heat A1R',
    productCode: 'MI-PTSE-H2I',
    type: 'heat-ror',
    protocol: 'morley-ias',
    addressable: true,
    coverage: '50m² typical',
    approvals: ['EN54-5', 'LPCB'],
    features: ['Built-in isolator', 'Rate of rise'],
    notes: 'For kitchens and plant rooms',
  },
  {
    id: 'morley-mi-ptse-multi',
    manufacturer: 'Morley-IAS',
    model: 'MI-PTSE Multisensor',
    productCode: 'MI-PTSE-MS2I',
    type: 'multi-sensor',
    protocol: 'morley-ias',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-5', 'EN54-7', 'LPCB'],
    features: ['Built-in isolator', 'Optical + thermal'],
    notes: 'Reduces false alarms',
  },

  // ============================================
  // NOTIFIER OPAL Detectors
  // ============================================
  {
    id: 'notifier-opal-optical',
    manufacturer: 'Notifier',
    model: 'OPAL Optical Smoke',
    productCode: 'NFX-OPT',
    type: 'optical-smoke',
    protocol: 'notifier-opal',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'LPCB', 'FM'],
    features: ['OPAL protocol', 'FlashScan technology', 'Drift compensation'],
    notes: 'Premium Notifier detector',
  },
  {
    id: 'notifier-opal-heat',
    manufacturer: 'Notifier',
    model: 'OPAL Heat A1R',
    productCode: 'NFX-HEAT',
    type: 'heat-ror',
    protocol: 'notifier-opal',
    addressable: true,
    coverage: '50m² typical',
    approvals: ['EN54-5', 'LPCB', 'FM'],
    features: ['OPAL protocol', 'FlashScan technology'],
    notes: 'For harsh environments',
  },
  {
    id: 'notifier-opal-multi',
    manufacturer: 'Notifier',
    model: 'OPAL Multisensor',
    productCode: 'NFX-SMT3',
    type: 'multi-sensor',
    protocol: 'notifier-opal',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-5', 'EN54-7', 'LPCB', 'FM'],
    features: ['OPAL protocol', 'Triple criteria detection', 'Advanced algorithms'],
    notes: 'Premium false alarm immunity',
  },

  // ============================================
  // SYSTEM SENSOR (Conventional)
  // ============================================
  {
    id: 'system-sensor-2351e-optical',
    manufacturer: 'System Sensor',
    model: '2351E Optical Smoke',
    productCode: '2351E',
    type: 'optical-smoke',
    protocol: 'conventional',
    addressable: false,
    coverage: '100m² typical',
    approvals: ['EN54-7'],
    features: ['Budget friendly', 'Dual LED', 'Remote indicator option'],
    notes: 'Very common conventional detector',
  },
  {
    id: 'system-sensor-5251e-heat',
    manufacturer: 'System Sensor',
    model: '5251E Heat A1R',
    productCode: '5251E',
    type: 'heat-ror',
    protocol: 'conventional',
    addressable: false,
    coverage: '50m² typical',
    approvals: ['EN54-5'],
    features: ['Rate of rise', 'Budget friendly'],
    notes: 'Common conventional heat detector',
  },
  {
    id: 'system-sensor-5251eh-heat-fixed',
    manufacturer: 'System Sensor',
    model: '5251EH Fixed Heat 60°C',
    productCode: '5251EH',
    type: 'heat-fixed',
    protocol: 'conventional',
    addressable: false,
    coverage: '50m² typical',
    approvals: ['EN54-5'],
    features: ['Fixed temperature 60°C', 'Budget friendly'],
    notes: 'Fixed temperature heat detector',
  },

  // ============================================
  // BEAM DETECTORS
  // ============================================
  {
    id: 'fireray-5000',
    manufacturer: 'FFE',
    model: 'Fireray 5000',
    productCode: 'FR5000',
    type: 'beam',
    protocol: 'conventional',
    addressable: false,
    coverage: '5-100m range',
    sensitivity: 'Adjustable 25-50% obscuration',
    approvals: ['EN54-12', 'LPCB'],
    features: ['Self-aligning', 'Motorised alignment', 'Reflective beam'],
    notes: 'For warehouses, atria, large open spaces — single-ended reflective',
  },
  {
    id: 'fireray-3000',
    manufacturer: 'FFE',
    model: 'Fireray 3000',
    productCode: 'FR3000',
    type: 'beam',
    protocol: 'conventional',
    addressable: false,
    coverage: '5-50m range',
    sensitivity: 'Adjustable',
    approvals: ['EN54-12'],
    features: ['Manual alignment', 'Budget friendly', 'Reflective beam'],
    notes: 'Budget beam detector — smaller spaces',
  },

  // ============================================
  // ASPIRATING SYSTEMS (VESDA / ICAM)
  // ============================================
  {
    id: 'vesda-e-vea',
    manufacturer: 'Xtralis (Honeywell)',
    model: 'VESDA-E VEA',
    productCode: 'VEA-040',
    type: 'aspirating',
    protocol: 'conventional',
    addressable: false,
    coverage: '2,000m² max',
    sensitivity: '0.0003-6.25% obs/m',
    approvals: ['EN54-20', 'LPCB'],
    features: ['40 sampling points', 'Individual point identification', 'Cloud monitoring'],
    notes: 'Premium aspirating system — data centres, clean rooms, heritage',
  },
  {
    id: 'vesda-e-vep',
    manufacturer: 'Xtralis (Honeywell)',
    model: 'VESDA-E VEP',
    productCode: 'VEP-A10',
    type: 'aspirating',
    protocol: 'conventional',
    addressable: false,
    coverage: '800m² max',
    sensitivity: '0.005-20% obs/m',
    approvals: ['EN54-20', 'LPCB'],
    features: ['4 pipe inlets', 'Addressable pipe identification', 'Ethernet'],
    notes: 'Mid-range aspirating — commercial and industrial',
  },
  {
    id: 'vesda-e-veu',
    manufacturer: 'Xtralis (Honeywell)',
    model: 'VESDA-E VEU',
    productCode: 'VEU-A10',
    type: 'aspirating',
    protocol: 'conventional',
    addressable: false,
    coverage: '400m² max',
    sensitivity: '0.005-20% obs/m',
    approvals: ['EN54-20', 'LPCB'],
    features: ['Single pipe', 'Compact', 'Budget VESDA'],
    notes: 'Entry-level VESDA — small server rooms, archives',
  },
  {
    id: 'xtralis-icam-ifs',
    manufacturer: 'Xtralis (Honeywell)',
    model: 'ICAM IFS',
    productCode: 'IFS-1',
    type: 'aspirating',
    protocol: 'conventional',
    addressable: false,
    coverage: '1,600m² max',
    sensitivity: '0.015-6.25% obs/m',
    approvals: ['EN54-20'],
    features: ['Industrial grade', 'Multi-channel', 'Harsh environments'],
    notes: 'Industrial aspirating — factories, chemical plants',
  },

  // ============================================
  // HYFIRE Wireless Detectors
  // ============================================
  {
    id: 'hyfire-hfw-w-01-optical',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless Optical Smoke',
    productCode: 'HFW-W-01',
    type: 'optical-smoke',
    protocol: 'hyfire-wireless',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-7', 'EN54-25', 'LPCB'],
    features: ['Fully wireless', '5-year battery', 'Mesh networking'],
    notes: 'Wireless optical detector — no cable required',
  },
  {
    id: 'hyfire-hfw-w-02-heat',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless Heat A1R',
    productCode: 'HFW-W-02',
    type: 'heat-ror',
    protocol: 'hyfire-wireless',
    addressable: true,
    coverage: '50m² typical',
    approvals: ['EN54-5', 'EN54-25', 'LPCB'],
    features: ['Fully wireless', '5-year battery', 'Rate of rise'],
    notes: 'Wireless heat detector',
  },
  {
    id: 'hyfire-hfw-w-03-multi',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless Multisensor',
    productCode: 'HFW-W-03',
    type: 'multi-sensor',
    protocol: 'hyfire-wireless',
    addressable: true,
    coverage: '100m² typical',
    approvals: ['EN54-5', 'EN54-7', 'EN54-25', 'LPCB'],
    features: ['Fully wireless', '5-year battery', 'Optical + thermal'],
    notes: 'Wireless multisensor',
  },
  {
    id: 'hyfire-hfw-cp-01',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless Call Point',
    productCode: 'HFW-CP-01',
    type: 'call-point',
    protocol: 'hyfire-wireless',
    addressable: true,
    approvals: ['EN54-11', 'EN54-25', 'LPCB'],
    features: ['Fully wireless', 'Resettable', '5-year battery'],
    notes: 'Wireless manual call point',
  },
  {
    id: 'hyfire-hfw-sb-01',
    manufacturer: 'Hyfire',
    model: 'HFW Wireless Sounder Beacon',
    productCode: 'HFW-SB-01',
    type: 'sounder-beacon',
    protocol: 'hyfire-wireless',
    addressable: true,
    approvals: ['EN54-3', 'EN54-23', 'EN54-25'],
    features: ['Fully wireless', 'Multiple tones', 'Red/white beacon'],
    notes: 'Wireless sounder/beacon combined',
  },

  // Accessories
  {
    id: 'aico-ei3000mrf',
    manufacturer: 'Aico',
    model: 'Ei3000MRF RadioLINK+ Module',
    productCode: 'Ei3000MRF',
    type: 'sounder',
    protocol: 'aico-radiolink',
    addressable: false,
    approvals: ['BS 5839-6'],
    features: ['Adds RadioLINK+ to Ei3000 series', 'House coding', 'Easy fit'],
    notes: 'Wireless interconnect module for Ei3000 alarms',
  },
  {
    id: 'aico-ei170rf',
    manufacturer: 'Aico',
    model: 'Ei170RF Alarm Relay Module',
    productCode: 'Ei170RF',
    type: 'sounder',
    protocol: 'aico-radiolink',
    addressable: false,
    approvals: ['BS 5839-6'],
    features: [
      'Volt-free relay output',
      'RadioLINK+ compatible',
      'Interface to third-party systems',
    ],
    notes: 'Relay module for external signalling',
  },
  {
    id: 'aico-ei159',
    manufacturer: 'Aico',
    model: 'Ei159 Remote Test Switch',
    productCode: 'Ei159',
    type: 'call-point',
    protocol: 'conventional',
    addressable: false,
    approvals: ['BS 5839-6'],
    features: ['Remote testing', 'Mains powered', 'LED indicator'],
    notes: 'Wall-mounted remote test switch for hard-to-reach alarms',
  },
  {
    id: 'aico-ei128',
    manufacturer: 'Aico',
    model: 'Ei128 Deaf Alarm Accessory',
    productCode: 'Ei128',
    type: 'visual-alarm',
    protocol: 'conventional',
    addressable: false,
    approvals: ['BS 5446-3'],
    features: ['Strobe light', 'Vibrating pad', 'Interconnects with Aico alarms'],
    notes: 'For deaf and hard of hearing - includes strobe and vibrating pad',
  },
];

// ============================================
// SEARCH & HELPER FUNCTIONS
// ============================================

/**
 * Get estimated power specs for a panel based on type and capacity
 * Used when manufacturer-specific data isn't available
 */
export function getEstimatedPowerSpecs(panel: FireAlarmPanel): { quiescentCurrent: number; alarmCurrent: number; batteryAh: number } {
  // If panel has manufacturer specs, use those
  if (panel.quiescentCurrent && panel.alarmCurrent) {
    return { quiescentCurrent: panel.quiescentCurrent, alarmCurrent: panel.alarmCurrent, batteryAh: panel.batteryAh || 7.2 };
  }

  // Estimate based on panel type and loop capacity
  if (panel.panelType === 'conventional') {
    const zones = panel.zoneCapacity || 4;
    return {
      quiescentCurrent: 50 + (zones * 10), // ~50mA base + 10mA per zone
      alarmCurrent: 200 + (zones * 50), // ~200mA base + 50mA per zone
      batteryAh: zones <= 4 ? 3.2 : zones <= 8 ? 7.2 : 12,
    };
  }

  if (panel.panelType === 'wireless') {
    return { quiescentCurrent: 80, alarmCurrent: 300, batteryAh: 3.2 };
  }

  // Addressable/analogue-addressable
  const loops = panel.loopCapacity || 1;
  return {
    quiescentCurrent: 120 + (loops * 80), // ~120mA base + 80mA per loop
    alarmCurrent: 500 + (loops * 250), // ~500mA base + 250mA per loop
    batteryAh: loops <= 1 ? 7.2 : loops <= 2 ? 12 : loops <= 4 ? 17 : 24,
  };
}

/**
 * BS 5839-1:2025 Design Intelligence Functions
 */

/** Suggest minimum detector count based on floor area and ceiling height */
export function suggestDetectorCount(floorAreaM2: number, ceilingHeightM: number = 2.7): { count: number; reason: string } {
  // BS 5839-1 Table 2: flat ceiling ≤3m = 100m2 per point detector
  // >3m to 6m = reduced coverage, >6m = not suitable for point detectors
  let coveragePerDetector = 100;
  if (ceilingHeightM > 6) {
    return { count: Math.ceil(floorAreaM2 / 200), reason: `Ceiling >6m — consider beam/aspirating detectors. Point coverage estimated at 200m2.` };
  } else if (ceilingHeightM > 4.5) {
    coveragePerDetector = 70;
  } else if (ceilingHeightM > 3) {
    coveragePerDetector = 85;
  }
  const count = Math.ceil(floorAreaM2 / coveragePerDetector);
  return { count, reason: `Based on ${coveragePerDetector}m2 per detector at ${ceilingHeightM}m ceiling height (BS 5839-1 Table 2)` };
}

/** Suggest minimum call point count from floors */
export function suggestCallPointCount(numberOfFloors: number): { count: number; reason: string } {
  // BS 5839-1: MCP at every final exit + every floor at stair landing
  // Minimum 2 per floor (1 at stair, 1 at exit) for floors with exits
  const count = Math.max(2, numberOfFloors * 2);
  return { count, reason: `Minimum ${count} MCPs — at least one per floor at stairway and one at each final exit (BS 5839-1 Clause 16)` };
}

/** Suggest minimum zone count from floors */
export function suggestZoneCount(numberOfFloors: number): { count: number; reason: string } {
  // BS 5839-1: each floor should be a separate zone as minimum
  const count = Math.max(1, numberOfFloors);
  return { count, reason: `Minimum ${count} zones — at least one per floor (BS 5839-1 Clause 12)` };
}

/** Suggest system grade from premises type */
export function suggestGrade(premisesType: string): { grade: string; reason: string } {
  // BS 5839-6 Grade D only applies to individual dwellings
  if (premisesType === 'HMO') {
    return { grade: 'D', reason: 'HMO — Grade D (mains-powered with battery backup) per BS 5839-6 for individual flats, with Grade A communal system' };
  }
  // All commercial/institutional premises need Grade A
  return { grade: 'A', reason: 'Grade A recommended — BS EN 54 compliant panel and devices (BS 5839-1)' };
}

/** Check for compliance warnings */
export function getDesignWarnings(formData: any): { field: string; message: string }[] {
  const warnings: { field: string; message: string }[] = [];

  // Category vs premises mismatch
  if (formData.premisesType === 'Care Home' && formData.systemCategory === 'M') {
    warnings.push({ field: 'systemCategory', message: 'Care homes should not use Category M — L1 or L2 recommended' });
  }
  if (formData.premisesType === 'Hospital' && !['L1', 'L2'].includes(formData.systemCategory)) {
    warnings.push({ field: 'systemCategory', message: 'Healthcare premises should use L1 or L2 for life safety' });
  }

  // Sleeping accommodation without VADs
  if (formData.occupancyType === 'Sleeping' && !formData.plannedVADs) {
    warnings.push({ field: 'plannedVADs', message: 'BS 5839-1:2025 requires VADs in sleeping areas for hearing-impaired occupants' });
  }

  // Detector spacing too wide for ceiling height
  const spacing = parseFloat(formData.detectorSpacing);
  const ceiling = parseFloat(formData.ceilingHeight);
  if (spacing && ceiling && ceiling > 3 && spacing > 5.3) {
    warnings.push({ field: 'detectorSpacing', message: `Spacing ${spacing}m may be too wide for ${ceiling}m ceiling — BS 5839-1 recommends reduced spacing above 3m` });
  }

  // Category L1 without optical smoke
  if (formData.systemCategory === 'L1' && !formData.plannedOpticalSmoke && !formData.plannedMultiSensor) {
    warnings.push({ field: 'plannedOpticalSmoke', message: 'L1 (full coverage) requires smoke or multi-sensor detectors in all areas' });
  }

  // Category M without call points
  if (formData.systemCategory === 'M' && !formData.plannedCallPoints) {
    warnings.push({ field: 'plannedCallPoints', message: 'Category M (manual) requires manual call points — no detectors is acceptable but MCPs are mandatory' });
  }

  // HMO without Grade D or above
  if (formData.premisesType === 'HMO' && !formData.systemGrade) {
    warnings.push({ field: 'systemGrade', message: 'HMO premises require a system grade to be specified — typically Grade D in flats with Grade A communal' });
  }

  // No FRA reference (mandatory for G1)
  if (!formData.fraReference) {
    warnings.push({ field: 'fraReference', message: 'Fire Risk Assessment reference is mandatory — the design must be based on the FRA' });
  }

  // Floor area entered but no detectors planned
  if (parseFloat(formData.floorArea) > 0 && !formData.plannedOpticalSmoke && !formData.plannedHeat && !formData.plannedMultiSensor && formData.systemCategory !== 'M') {
    warnings.push({ field: 'plannedOpticalSmoke', message: 'Floor area specified but no detectors planned — add planned detector quantities' });
  }

  return warnings;
}

/**
 * Search panels by query string
 */
export function searchPanels(query: string): FireAlarmPanel[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return FIRE_ALARM_PANELS;

  return FIRE_ALARM_PANELS.filter((panel) => {
    const searchText =
      `${panel.manufacturer} ${panel.model} ${panel.productCode || ''}`.toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Find a specific panel by manufacturer and model
 */
export function findPanel(manufacturer: string, model: string): FireAlarmPanel | null {
  return (
    FIRE_ALARM_PANELS.find(
      (p) =>
        p.manufacturer.toLowerCase() === manufacturer.toLowerCase() &&
        p.model.toLowerCase() === model.toLowerCase()
    ) || null
  );
}

/**
 * Find a panel by ID
 */
export function findPanelById(id: string): FireAlarmPanel | null {
  return FIRE_ALARM_PANELS.find((p) => p.id === id) || null;
}

/**
 * Get all panels by manufacturer
 */
export function getPanelsByManufacturer(manufacturer: string): FireAlarmPanel[] {
  return FIRE_ALARM_PANELS.filter(
    (p) => p.manufacturer.toLowerCase() === manufacturer.toLowerCase()
  );
}

/**
 * Get all panels by type
 */
export function getPanelsByType(panelType: PanelType): FireAlarmPanel[] {
  return FIRE_ALARM_PANELS.filter((p) => p.panelType === panelType);
}

/**
 * Get unique manufacturer list
 */
export function getPanelManufacturers(): string[] {
  const manufacturers = new Set(FIRE_ALARM_PANELS.map((p) => p.manufacturer));
  return Array.from(manufacturers).sort();
}

/**
 * Get panels grouped by manufacturer
 */
export function getPanelsGroupedByManufacturer(): Record<string, FireAlarmPanel[]> {
  return FIRE_ALARM_PANELS.reduce(
    (acc, panel) => {
      if (!acc[panel.manufacturer]) {
        acc[panel.manufacturer] = [];
      }
      acc[panel.manufacturer].push(panel);
      return acc;
    },
    {} as Record<string, FireAlarmPanel[]>
  );
}

/**
 * Get panel defaults for auto-fill
 */
export function getPanelDefaults(panelId: string): {
  networkType: string;
  zonesCount: number;
  loopCapacity: number;
  deviceCapacity: number;
  protocol: string;
} | null {
  const panel = findPanelById(panelId);
  if (!panel) return null;

  return {
    networkType:
      panel.panelType === 'conventional'
        ? 'conventional'
        : panel.panelType === 'addressable' || panel.panelType === 'analogue-addressable'
          ? 'addressable'
          : panel.panelType === 'wireless'
            ? 'wireless'
            : 'networked',
    zonesCount: panel.zoneCapacity,
    loopCapacity: panel.loopCapacity,
    deviceCapacity: panel.deviceCapacity || 0,
    protocol: panel.protocol,
  };
}

/**
 * Search detectors by query string
 */
export function searchDetectors(query: string): FireAlarmDetector[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return FIRE_ALARM_DETECTORS;

  return FIRE_ALARM_DETECTORS.filter((detector) => {
    const searchText =
      `${detector.manufacturer} ${detector.model} ${detector.productCode || ''} ${detector.type}`.toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get detectors by protocol (for panel compatibility)
 */
export function getDetectorsByProtocol(protocol: DetectorProtocol): FireAlarmDetector[] {
  return FIRE_ALARM_DETECTORS.filter(
    (d) => d.protocol === protocol || d.protocol === 'conventional'
  );
}

/**
 * Get compatible detectors for a panel
 */
export function getCompatibleDetectors(panelId: string): FireAlarmDetector[] {
  const panel = findPanelById(panelId);
  if (!panel) return [];

  // Multi-protocol panels support multiple detector types
  if (panel.protocol === 'multi-protocol') {
    return FIRE_ALARM_DETECTORS.filter(
      (d) =>
        d.protocol === 'apollo-discovery' ||
        d.protocol === 'apollo-xp95' ||
        d.protocol === 'apollo-soteria' ||
        d.protocol === 'hochiki-esp' ||
        d.protocol === 'system-sensor' ||
        d.protocol === 'conventional'
    );
  }

  // Hyfire wireless panels support all Hyfire wireless devices
  if (panel.protocol === 'hyfire-wireless') {
    return FIRE_ALARM_DETECTORS.filter(
      (d) => d.protocol === 'hyfire-wireless' || d.protocol === 'conventional'
    );
  }

  // EMS FireCell panels support FireCell wireless devices
  if (panel.protocol === 'ems-firecell') {
    return FIRE_ALARM_DETECTORS.filter(
      (d) => d.protocol === 'ems-firecell' || d.protocol === 'conventional'
    );
  }

  // Aico RadioLINK and SmartLINK are compatible with each other
  if (panel.protocol === 'aico-radiolink' || panel.protocol === 'aico-smartlink') {
    return FIRE_ALARM_DETECTORS.filter(
      (d) =>
        d.protocol === 'aico-radiolink' ||
        d.protocol === 'aico-smartlink' ||
        d.protocol === 'conventional'
    );
  }

  // Get detectors matching the panel's protocol
  return FIRE_ALARM_DETECTORS.filter(
    (d) => d.protocol === panel.protocol || d.protocol === 'conventional'
  );
}

/**
 * Get Aico domestic alarms (BS 5839-6 Grade D)
 */
export function getAicoDomesticAlarms(): FireAlarmDetector[] {
  return FIRE_ALARM_DETECTORS.filter(
    (d) =>
      d.manufacturer === 'Aico' &&
      (d.type === 'optical-smoke' ||
        d.type === 'heat-fixed' ||
        d.type === 'multi-sensor' ||
        d.type === 'co')
  );
}

/**
 * Get Aico system devices (interfaces, modules, controllers)
 */
export function getAicoSystemDevices(): (FireAlarmPanel | FireAlarmDetector)[] {
  const panels = FIRE_ALARM_PANELS.filter((p) => p.manufacturer === 'Aico');
  const modules = FIRE_ALARM_DETECTORS.filter(
    (d) =>
      d.manufacturer === 'Aico' &&
      (d.type === 'sounder' || d.type === 'call-point' || d.type === 'visual-alarm')
  );
  return [...panels, ...modules];
}
