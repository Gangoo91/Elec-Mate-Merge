/**
 * Emergency Luminaire Database
 *
 * Contains 30+ UK emergency lighting products with verified specifications
 * from manufacturer datasheets. All data sourced from official product
 * documentation for accuracy.
 *
 * Standards Reference:
 * - BS 5266-1:2016 Emergency lighting
 * - BS EN 1838:2013 Lighting applications - Emergency lighting
 * - BS EN 60598-2-22 Luminaires for emergency lighting
 */

export type LuminaireType =
  | 'bulkhead'
  | 'twin-spot'
  | 'recessed'
  | 'surface'
  | 'exit-sign'
  | 'exit-box'
  | 'strip'
  | 'downlight';

export type LuminaireCategory =
  | 'escape-route'
  | 'open-area'
  | 'high-risk'
  | 'standby';

export type BatteryType =
  | 'NiCd'      // Nickel Cadmium
  | 'NiMH'      // Nickel Metal Hydride
  | 'LiFePO4'   // Lithium Iron Phosphate
  | 'Li-ion';   // Lithium Ion

export type MountingType =
  | 'surface'
  | 'recessed'
  | 'ceiling'
  | 'wall'
  | 'suspended';

export interface EmergencyLuminaire {
  id: string;
  make: string;
  model: string;
  productCode?: string;
  luminaireType: LuminaireType;
  category: LuminaireCategory;
  lightOutput: number;            // lumens (emergency mode)
  mainsPower?: number;            // lumens (mains mode, if maintained)
  wattage: number;
  batteryType: BatteryType;
  ratedDuration: 60 | 180;        // minutes (1hr or 3hr)
  maintained: boolean;            // can operate as normal lighting
  selfTest: boolean;              // auto-test capability
  addressable: boolean;           // DALI/addressable
  mountingType: MountingType;
  ipRating: string;               // IP20, IP65, etc.
  ikRating?: string;              // IK08, IK10 etc.
  viewingDistance?: number;       // metres (for exit signs)
  maxSpacing?: number;            // metres between luminaires
  colourTemp?: number;            // Kelvin (e.g., 6500)
  dimensions?: string;            // L x W x H mm
  weight?: number;                // kg
  warranty?: number;              // years
  notes?: string;
}

/**
 * Emergency Luminaire Database
 *
 * All specifications verified from manufacturer datasheets and product pages.
 * Sources include:
 * - ansell-lighting.com
 * - eaton.com
 * - thornlighting.co.uk
 * - channelsafety.co.uk
 * - hochikieurope.com
 * - esp-uk.com
 * - mackwell.com
 * - kosnic.com
 * - legrand.com
 */
export const EMERGENCY_LUMINAIRES: EmergencyLuminaire[] = [
  // ============================================
  // ANSELL LIGHTING - UK Market Leader
  // ============================================
  {
    id: 'ansell-guardian-3m',
    make: 'Ansell',
    model: 'Guardian AGLED/3M',
    productCode: 'AGLED/3M',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 167,
    wattage: 3,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    ikRating: 'IK08',
    viewingDistance: 18,
    colourTemp: 6500,
    warranty: 3,
    notes: 'Ultra-slim design, quick release gear tray'
  },
  {
    id: 'ansell-raven-escape',
    make: 'Ansell',
    model: 'Raven Escape Route',
    productCode: 'ARLED/3NM/ER',
    luminaireType: 'downlight',
    category: 'escape-route',
    lightOutput: 128,
    wattage: 3,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP65',
    maxSpacing: 15,
    colourTemp: 6500,
    dimensions: '110mm diameter',
    warranty: 3,
    notes: 'High performance optic, 150mm cable pre-wired'
  },
  {
    id: 'ansell-raven-open',
    make: 'Ansell',
    model: 'Raven Open Area',
    productCode: 'ARLED/3NM/OA',
    luminaireType: 'downlight',
    category: 'open-area',
    lightOutput: 128,
    wattage: 3,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP65',
    colourTemp: 6500,
    dimensions: '110mm diameter',
    warranty: 3,
    notes: 'Open area lens, 43° beam angle'
  },
  {
    id: 'ansell-falcon',
    make: 'Ansell',
    model: 'Falcon',
    productCode: 'AFALED/3NM/ST/IP65',
    luminaireType: 'downlight',
    category: 'escape-route',
    lightOutput: 150,
    wattage: 3,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    maxSpacing: 19.6,
    colourTemp: 6500,
    warranty: 3,
    notes: 'Ultra-low profile, BESA mounting option'
  },
  {
    id: 'ansell-owl-twin',
    make: 'Ansell',
    model: 'Owl Twin Spot High Output',
    productCode: 'ATSLED/3NM/ST/HO',
    luminaireType: 'twin-spot',
    category: 'open-area',
    lightOutput: 706,
    wattage: 3.3,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'ceiling',
    ipRating: 'IP66',
    ikRating: 'IK08',
    colourTemp: 6500,
    warranty: 5,
    notes: 'Industrial grade, 60° beam angle'
  },
  {
    id: 'ansell-raptor-twin',
    make: 'Ansell',
    model: 'Raptor Twin Spot HO',
    productCode: 'ARAP/HO/1/W',
    luminaireType: 'twin-spot',
    category: 'open-area',
    lightOutput: 500,
    wattage: 3,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'wall',
    ipRating: 'IP65',
    warranty: 3,
    notes: 'Adjustable spot heads'
  },

  // ============================================
  // EATON - Commercial Grade
  // ============================================
  {
    id: 'eaton-safelite-20m',
    make: 'Eaton',
    model: 'SafeLite SL 20m',
    productCode: 'SL2MNM65E1C3A',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 60,
    wattage: 2.7,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'wall',
    ipRating: 'IP42',
    viewingDistance: 20,
    dimensions: '270 x 119 x 49',
    warranty: 2,
    notes: 'ISO 7010 compliant legends available'
  },
  {
    id: 'eaton-safelite-30m',
    make: 'Eaton',
    model: 'SafeLite SL 30m',
    productCode: 'SL3MNM65E1C3A',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 100,
    wattage: 3.5,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'wall',
    ipRating: 'IP42',
    viewingDistance: 30,
    dimensions: '371 x 170 x 62',
    warranty: 2,
    notes: 'Large format exit sign'
  },
  {
    id: 'eaton-safelite-cg-s',
    make: 'Eaton',
    model: 'SafeLite CG-S',
    productCode: 'SLCGS',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 200,
    wattage: 3,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: true,
    mountingType: 'wall',
    ipRating: 'IP65',
    ikRating: 'IK07',
    viewingDistance: 20,
    warranty: 3,
    notes: 'Central battery compatible, 850°C glow wire'
  },
  {
    id: 'eaton-atlantic-led',
    make: 'Eaton',
    model: 'Atlantic LED',
    productCode: 'ATLLED',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 150,
    wattage: 3,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    warranty: 2,
    notes: 'All-round emergency safety light'
  },

  // ============================================
  // THORN LIGHTING - Industrial Range
  // ============================================
  {
    id: 'thorn-voyager-solid',
    make: 'Thorn',
    model: 'Voyager Solid',
    productCode: '96634863',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 180,
    wattage: 3.4,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    viewingDistance: 23,
    dimensions: '280 x 130 x 71',
    weight: 0.68,
    warranty: 3,
    notes: 'High power options for 20m ceiling heights'
  },
  {
    id: 'thorn-voyager-fit',
    make: 'Thorn',
    model: 'Voyager Fit',
    productCode: 'VYGFIT',
    luminaireType: 'recessed',
    category: 'escape-route',
    lightOutput: 120,
    wattage: 2.7,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP40',
    warranty: 3,
    notes: 'Only 80mm ceiling void required'
  },
  {
    id: 'thorn-voyager-style',
    make: 'Thorn',
    model: 'Voyager Style',
    productCode: 'VYGSTYLE',
    luminaireType: 'surface',
    category: 'escape-route',
    lightOutput: 150,
    wattage: 2.7,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP40',
    warranty: 3,
    notes: 'Ultra-slim 37mm depth'
  },
  {
    id: 'thorn-voyager-one',
    make: 'Thorn',
    model: 'Voyager One',
    productCode: 'VYGONE',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 160,
    wattage: 2.7,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    viewingDistance: 30,
    warranty: 3,
    notes: 'Click-in legends, outdoor suitable'
  },

  // ============================================
  // CHANNEL SAFETY SYSTEMS - Quality UK Brand
  // ============================================
  {
    id: 'channel-razor-hang',
    make: 'Channel Safety',
    model: 'Razor Hanging',
    productCode: 'RAZOR-H',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 80,
    wattage: 2,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'suspended',
    ipRating: 'IP40',
    viewingDistance: 28,
    weight: 0.8,
    warranty: 3,
    notes: 'SELV via suspension wires'
  },
  {
    id: 'channel-razor-recessed',
    make: 'Channel Safety',
    model: 'Razor Recessed',
    productCode: 'RAZOR-R',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 80,
    wattage: 2,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP40',
    viewingDistance: 26,
    weight: 0.8,
    warranty: 3,
    notes: 'Ultra slim-line design'
  },
  {
    id: 'channel-brook2',
    make: 'Channel Safety',
    model: 'Brook 2',
    productCode: 'BK/M3/LED/2',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 170,
    wattage: 3,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    warranty: 3,
    notes: 'Robust polycarbonate construction'
  },
  {
    id: 'channel-milan',
    make: 'Channel Safety',
    model: 'Milan 15W',
    productCode: 'E-MILAN-MW-M3',
    luminaireType: 'bulkhead',
    category: 'open-area',
    lightOutput: 285,
    mainsPower: 1200,
    wattage: 15,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    ikRating: 'IK10',
    warranty: 3,
    notes: 'Microwave sensor option'
  },

  // ============================================
  // HOCHIKI - Fire System Integration
  // ============================================
  {
    id: 'hochiki-firescape-lite-er',
    make: 'Hochiki',
    model: 'FIREscape Lite Escape',
    productCode: 'FSLT-ER',
    luminaireType: 'downlight',
    category: 'escape-route',
    lightOutput: 120,
    wattage: 2,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP20',
    warranty: 3,
    notes: 'Pre-packed kit with transformer'
  },
  {
    id: 'hochiki-firescape-lite-oa',
    make: 'Hochiki',
    model: 'FIREscape Lite Open Area',
    productCode: 'FSLT-OA',
    luminaireType: 'downlight',
    category: 'open-area',
    lightOutput: 120,
    wattage: 2,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP20',
    warranty: 3,
    notes: 'Wide beam distribution'
  },
  {
    id: 'hochiki-firescape-exit-20m',
    make: 'Hochiki',
    model: 'FIREscape Exit 20m',
    productCode: 'EL-20D',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 100,
    wattage: 2.5,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: true,
    mountingType: 'wall',
    ipRating: 'IP40',
    viewingDistance: 20,
    warranty: 10,
    notes: 'FIREscape+ compatible, bi-colour status LED'
  },
  {
    id: 'hochiki-firescape-exit-40m',
    make: 'Hochiki',
    model: 'FIREscape Exit 40m',
    productCode: 'EL-40D',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 150,
    wattage: 3,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: true,
    mountingType: 'wall',
    ipRating: 'IP40',
    viewingDistance: 40,
    warranty: 10,
    notes: 'Dynamic exit signage, route blocking capable'
  },

  // ============================================
  // ESP - Budget-Friendly
  // ============================================
  {
    id: 'esp-duceri-3w',
    make: 'ESP',
    model: 'Duceri 3W',
    productCode: 'D1010WH',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 100,
    mainsPower: 120,
    wattage: 3,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    colourTemp: 5500,
    dimensions: '345 x 110 x 60',
    warranty: 3,
    notes: 'SMD 2835 LED lamp'
  },
  {
    id: 'esp-duceri-5w',
    make: 'ESP',
    model: 'Duceri 5W',
    productCode: 'D1011WH',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 190,
    mainsPower: 208,
    wattage: 5,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    colourTemp: 5500,
    dimensions: '345 x 110 x 60',
    warranty: 3,
    notes: '3.6V 1800mAH battery'
  },
  {
    id: 'esp-duceri-14w',
    make: 'ESP',
    model: 'Duceri 14W Circular',
    productCode: 'DUCERI14',
    luminaireType: 'bulkhead',
    category: 'open-area',
    lightOutput: 285,
    wattage: 14,
    batteryType: 'NiCd',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'ceiling',
    ipRating: 'IP65',
    colourTemp: 5500,
    warranty: 3,
    notes: 'High power circular bulkhead'
  },
  {
    id: 'esp-duceri-flush',
    make: 'ESP',
    model: 'Duceri 4W Flush',
    productCode: 'EMDLEDWMFLUSH',
    luminaireType: 'recessed',
    category: 'escape-route',
    lightOutput: 100,
    wattage: 4,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP20',
    warranty: 3,
    notes: 'Flush ceiling mounted'
  },

  // ============================================
  // MACKWELL - Central Battery Specialist
  // ============================================
  {
    id: 'mackwell-xylux-ld5',
    make: 'Mackwell',
    model: 'Xylux LD5',
    productCode: '9001610',
    luminaireType: 'downlight',
    category: 'escape-route',
    lightOutput: 140,
    wattage: 2,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: true,
    mountingType: 'recessed',
    ipRating: 'IP40',
    weight: 0.246,
    warranty: 3,
    notes: 'SmartCharge NiMH technology, DALI AutoTest'
  },
  {
    id: 'mackwell-xylux-lr',
    make: 'Mackwell',
    model: 'Xylux LR',
    productCode: 'XYLUX-LR',
    luminaireType: 'recessed',
    category: 'escape-route',
    lightOutput: 130,
    wattage: 2,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: true,
    mountingType: 'recessed',
    ipRating: 'IP40',
    warranty: 3,
    notes: 'Central battery compatible, articulated design'
  },
  {
    id: 'mackwell-xylux-bhdx',
    make: 'Mackwell',
    model: 'Xylux BHDX High Output',
    productCode: 'XYLUX-BHDX',
    luminaireType: 'bulkhead',
    category: 'high-risk',
    lightOutput: 1100,
    wattage: 8,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: false,
    selfTest: true,
    addressable: true,
    mountingType: 'surface',
    ipRating: 'IP65',
    warranty: 3,
    notes: 'High-risk task area lighting'
  },

  // ============================================
  // KOSNIC - Cost-Effective
  // ============================================
  {
    id: 'kosnic-mulu-5w',
    make: 'Kosnic',
    model: 'Mulu 5W',
    productCode: 'MUL0105-BLK',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 40,
    mainsPower: 190,
    wattage: 5,
    batteryType: 'NiMH',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: false,
    mountingType: 'surface',
    ipRating: 'IP65',
    colourTemp: 6500,
    warranty: 5,
    notes: '30,000 hours LED life'
  },
  {
    id: 'kosnic-orda-3w',
    make: 'Kosnic',
    model: 'Orda II 3W Twin Spot',
    productCode: 'ORDA-3W',
    luminaireType: 'twin-spot',
    category: 'open-area',
    lightOutput: 350,
    wattage: 3,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: false,
    selfTest: false,
    addressable: false,
    mountingType: 'ceiling',
    ipRating: 'IP65',
    ikRating: 'IK10',
    colourTemp: 6500,
    warranty: 4,
    notes: '110° beam angle, adjustable heads'
  },
  {
    id: 'kosnic-orda-6w',
    make: 'Kosnic',
    model: 'Orda II 6W Twin Spot',
    productCode: 'ORDA-6W',
    luminaireType: 'twin-spot',
    category: 'open-area',
    lightOutput: 600,
    wattage: 6,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'ceiling',
    ipRating: 'IP65',
    ikRating: 'IK10',
    colourTemp: 6500,
    warranty: 4,
    notes: '40,000 hours LED life'
  },
  {
    id: 'kosnic-belum',
    make: 'Kosnic',
    model: 'Belum Exit Sign',
    productCode: 'EESN01',
    luminaireType: 'exit-sign',
    category: 'escape-route',
    lightOutput: 40,
    wattage: 2,
    batteryType: 'LiFePO4',
    ratedDuration: 180,
    maintained: true,
    selfTest: true,
    addressable: false,
    mountingType: 'wall',
    ipRating: 'IP20',
    colourTemp: 6500,
    viewingDistance: 20,
    warranty: 3,
    notes: 'ISO 7010 compliant legends'
  },

  // ============================================
  // LEGRAND - Wide Range
  // ============================================
  {
    id: 'legrand-xlight-360-100',
    make: 'Legrand',
    model: 'X-Light 360 100lm',
    productCode: 'XL360-100',
    luminaireType: 'recessed',
    category: 'escape-route',
    lightOutput: 100,
    wattage: 1,
    batteryType: 'NiMH',
    ratedDuration: 60,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP40',
    warranty: 2,
    notes: 'ECO designed, NF environment certified'
  },
  {
    id: 'legrand-xlight-360-200',
    make: 'Legrand',
    model: 'X-Light 360 200lm',
    productCode: 'XL360-200',
    luminaireType: 'recessed',
    category: 'escape-route',
    lightOutput: 200,
    wattage: 1.5,
    batteryType: 'NiMH',
    ratedDuration: 60,
    maintained: true,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP40',
    warranty: 2,
    notes: 'Higher output version'
  },
  {
    id: 'legrand-kickspot',
    make: 'Legrand',
    model: 'Kickspot 320lm',
    productCode: '062564',
    luminaireType: 'recessed',
    category: 'open-area',
    lightOutput: 320,
    wattage: 0.6,
    batteryType: 'NiMH',
    ratedDuration: 60,
    maintained: false,
    selfTest: false,
    addressable: false,
    mountingType: 'recessed',
    ipRating: 'IP40',
    warranty: 2,
    notes: 'NF C 71-800 compliant, 2.2Ah battery'
  },
  {
    id: 'legrand-eco-bulkhead',
    make: 'Legrand',
    model: 'ECO2 Bulkhead',
    productCode: '062514',
    luminaireType: 'bulkhead',
    category: 'escape-route',
    lightOutput: 45,
    wattage: 0.6,
    batteryType: 'NiCd',
    ratedDuration: 60,
    maintained: false,
    selfTest: false,
    addressable: false,
    mountingType: 'ceiling',
    ipRating: 'IP40',
    warranty: 2,
    notes: 'Budget ECO range, 5hr BAEH option'
  },
];

/**
 * Search luminaires by query string
 * Searches make, model, and product code
 */
export function searchLuminaires(query: string): EmergencyLuminaire[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return EMERGENCY_LUMINAIRES;

  return EMERGENCY_LUMINAIRES.filter(luminaire => {
    const searchText = `${luminaire.make} ${luminaire.model} ${luminaire.productCode || ''}`.toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Find a specific luminaire by make and model
 */
export function findLuminaire(make: string, model: string): EmergencyLuminaire | null {
  return EMERGENCY_LUMINAIRES.find(
    l => l.make.toLowerCase() === make.toLowerCase() &&
         l.model.toLowerCase() === model.toLowerCase()
  ) || null;
}

/**
 * Find a luminaire by ID
 */
export function findLuminaireById(id: string): EmergencyLuminaire | null {
  return EMERGENCY_LUMINAIRES.find(l => l.id === id) || null;
}

/**
 * Get all luminaires by type
 */
export function getLuminairesByType(type: LuminaireType): EmergencyLuminaire[] {
  return EMERGENCY_LUMINAIRES.filter(l => l.luminaireType === type);
}

/**
 * Get all luminaires by category
 */
export function getLuminairesByCategory(category: LuminaireCategory): EmergencyLuminaire[] {
  return EMERGENCY_LUMINAIRES.filter(l => l.category === category);
}

/**
 * Get all luminaires by manufacturer
 */
export function getLuminairesByMake(make: string): EmergencyLuminaire[] {
  return EMERGENCY_LUMINAIRES.filter(
    l => l.make.toLowerCase() === make.toLowerCase()
  );
}

/**
 * Get unique manufacturer list
 */
export function getManufacturers(): string[] {
  const makes = new Set(EMERGENCY_LUMINAIRES.map(l => l.make));
  return Array.from(makes).sort();
}

/**
 * Get luminaires grouped by manufacturer
 */
export function getLuminairesGroupedByMake(): Record<string, EmergencyLuminaire[]> {
  return EMERGENCY_LUMINAIRES.reduce((acc, luminaire) => {
    if (!acc[luminaire.make]) {
      acc[luminaire.make] = [];
    }
    acc[luminaire.make].push(luminaire);
    return acc;
  }, {} as Record<string, EmergencyLuminaire[]>);
}

/**
 * Get suitable luminaires for a given category and duration
 */
export function getSuitableLuminaires(
  category: LuminaireCategory,
  minDuration: 60 | 180
): EmergencyLuminaire[] {
  return EMERGENCY_LUMINAIRES.filter(
    l => l.category === category && l.ratedDuration >= minDuration
  );
}
