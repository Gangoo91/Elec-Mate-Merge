/**
 * UK Solar Panel Database 2025/2026
 *
 * Comprehensive database of popular UK MCS-certified solar panels.
 * Used for auto-filling panel specifications on Solar PV certificates.
 *
 * Data sources: MCS database, manufacturer specifications
 */

export interface SolarPanel {
  id: string;
  make: string;
  model: string;
  wattage: number;              // Wp
  efficiency: number;           // %
  voc: number;                  // Open circuit voltage (V)
  isc: number;                  // Short circuit current (A)
  vmp: number;                  // Voltage at max power (V)
  imp: number;                  // Current at max power (A)
  dimensions: {
    length: number;             // mm
    width: number;              // mm
    depth: number;              // mm
  };
  weight: number;               // kg
  cellType: 'mono' | 'poly' | 'mono-perc' | 'hjt' | 'topcon' | 'bifacial';
  cells: number;                // Number of cells (e.g., 60, 72, 108, 120, 144)
  warranty: {
    product: number;            // Years
    performance: number;        // Years
  };
  mcsCertified: boolean;
  tempCoeffVoc: number;         // %/°C (negative)
  tempCoeffIsc: number;         // %/°C (positive)
  tempCoeffPmax: number;        // %/°C (negative)
  yearIntroduced?: number;
  notes?: string;
}

/**
 * UK MCS-Certified Solar Panel Database
 * Includes best-selling and popular models as of 2025/2026
 */
export const SOLAR_PANELS: SolarPanel[] = [
  // ========== JA SOLAR ==========
  {
    id: 'ja-solar-jam54s30-410mr',
    make: 'JA Solar',
    model: 'JAM54S30-410/MR',
    wattage: 410,
    efficiency: 21.3,
    voc: 37.21,
    isc: 13.98,
    vmp: 31.04,
    imp: 13.21,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Popular UK residential panel. Half-cell technology.'
  },
  {
    id: 'ja-solar-jam54s31-415gr',
    make: 'JA Solar',
    model: 'JAM54S31-415/GR',
    wattage: 415,
    efficiency: 21.5,
    voc: 37.82,
    isc: 13.89,
    vmp: 31.55,
    imp: 13.15,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.26,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2024,
    notes: 'N-type TOPCon technology. Higher efficiency.'
  },
  {
    id: 'ja-solar-jam72s30-545mr',
    make: 'JA Solar',
    model: 'JAM72S30-545/MR',
    wattage: 545,
    efficiency: 21.2,
    voc: 49.62,
    isc: 13.98,
    vmp: 41.40,
    imp: 13.16,
    dimensions: { length: 2278, width: 1134, depth: 35 },
    weight: 28.4,
    cellType: 'mono-perc',
    cells: 144,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Large format for commercial installations.'
  },

  // ========== LONGI ==========
  {
    id: 'longi-lr5-54hph-410m',
    make: 'LONGi',
    model: 'LR5-54HPH-410M',
    wattage: 410,
    efficiency: 21.3,
    voc: 37.60,
    isc: 13.82,
    vmp: 31.30,
    imp: 13.10,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.34,
    yearIntroduced: 2023,
    notes: 'Hi-MO 5 series. Market leading manufacturer.'
  },
  {
    id: 'longi-lr5-54htb-420m',
    make: 'LONGi',
    model: 'LR5-54HTB-420M',
    wattage: 420,
    efficiency: 21.8,
    voc: 38.20,
    isc: 13.92,
    vmp: 31.80,
    imp: 13.21,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2024,
    notes: 'Hi-MO 6 series. N-type TOPCon technology.'
  },
  {
    id: 'longi-lr5-72hph-550m',
    make: 'LONGi',
    model: 'LR5-72HPH-550M',
    wattage: 550,
    efficiency: 21.3,
    voc: 50.10,
    isc: 13.95,
    vmp: 41.70,
    imp: 13.19,
    dimensions: { length: 2278, width: 1134, depth: 35 },
    weight: 28.0,
    cellType: 'mono-perc',
    cells: 144,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.34,
    yearIntroduced: 2023,
    notes: 'Hi-MO 5 large format for commercial.'
  },

  // ========== TRINA SOLAR ==========
  {
    id: 'trina-vertex-s-tsm-de09r08-420',
    make: 'Trina Solar',
    model: 'Vertex S+ TSM-DE09R.08 420W',
    wattage: 420,
    efficiency: 21.8,
    voc: 38.20,
    isc: 13.98,
    vmp: 31.80,
    imp: 13.21,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.8,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2024,
    notes: 'N-type Vertex S+ series. Popular UK choice.'
  },
  {
    id: 'trina-vertex-s-tsm-neg9r28-430',
    make: 'Trina Solar',
    model: 'Vertex S+ NEG9R.28 430W',
    wattage: 430,
    efficiency: 22.3,
    voc: 38.80,
    isc: 14.05,
    vmp: 32.40,
    imp: 13.27,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 22.0,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 15, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.28,
    yearIntroduced: 2025,
    notes: 'Latest N-type TOPCon with 30 year warranty.'
  },
  {
    id: 'trina-vertex-tsm-deg21c20-600',
    make: 'Trina Solar',
    model: 'Vertex TSM-DEG21C.20 600W',
    wattage: 600,
    efficiency: 21.8,
    voc: 51.80,
    isc: 14.70,
    vmp: 43.30,
    imp: 13.86,
    dimensions: { length: 2384, width: 1134, depth: 35 },
    weight: 32.0,
    cellType: 'mono-perc',
    cells: 150,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Large format commercial panel. 210mm cells.'
  },

  // ========== CANADIAN SOLAR ==========
  {
    id: 'canadian-solar-hiku6-cs6r-415ms',
    make: 'Canadian Solar',
    model: 'HiKu6 CS6R-415MS',
    wattage: 415,
    efficiency: 21.5,
    voc: 37.90,
    isc: 13.90,
    vmp: 31.50,
    imp: 13.17,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.3,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Popular residential panel. Excellent reliability.'
  },
  {
    id: 'canadian-solar-hiku7-cs7n-680tb-ag',
    make: 'Canadian Solar',
    model: 'HiKu7 CS7N-680TB-AG',
    wattage: 680,
    efficiency: 22.5,
    voc: 53.20,
    isc: 16.25,
    vmp: 44.60,
    imp: 15.25,
    dimensions: { length: 2384, width: 1303, depth: 35 },
    weight: 37.5,
    cellType: 'bifacial',
    cells: 132,
    warranty: { product: 15, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.28,
    yearIntroduced: 2024,
    notes: 'N-type bifacial. +5-30% rear side gain.'
  },

  // ========== JINKO SOLAR ==========
  {
    id: 'jinko-tiger-neo-jkm415n-54hl4r-v',
    make: 'Jinko Solar',
    model: 'Tiger Neo JKM415N-54HL4R-V',
    wattage: 415,
    efficiency: 21.53,
    voc: 37.45,
    isc: 14.01,
    vmp: 31.19,
    imp: 13.31,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.26,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2023,
    notes: 'N-type Tiger Neo. Very popular in UK market.'
  },
  {
    id: 'jinko-tiger-neo-jkm430n-54hl4r-b',
    make: 'Jinko Solar',
    model: 'Tiger Neo JKM430N-54HL4R-B',
    wattage: 430,
    efficiency: 22.30,
    voc: 38.05,
    isc: 14.32,
    vmp: 31.85,
    imp: 13.50,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'bifacial',
    cells: 108,
    warranty: { product: 15, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2024,
    notes: 'Bifacial N-type. Up to 25% rear side gain.'
  },
  {
    id: 'jinko-tiger-pro-jkm555m-72hl4-v',
    make: 'Jinko Solar',
    model: 'Tiger Pro JKM555M-72HL4-V',
    wattage: 555,
    efficiency: 21.55,
    voc: 49.74,
    isc: 14.15,
    vmp: 41.49,
    imp: 13.38,
    dimensions: { length: 2278, width: 1134, depth: 35 },
    weight: 28.0,
    cellType: 'mono-perc',
    cells: 144,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Large format. Good for ground mount arrays.'
  },

  // ========== SUNPOWER ==========
  {
    id: 'sunpower-maxeon-3-spr-max3-400',
    make: 'SunPower',
    model: 'Maxeon 3 SPR-MAX3-400',
    wattage: 400,
    efficiency: 22.60,
    voc: 75.60,
    isc: 6.65,
    vmp: 65.00,
    imp: 6.15,
    dimensions: { length: 1690, width: 1046, depth: 40 },
    weight: 19.0,
    cellType: 'hjt',
    cells: 104,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.032,
    tempCoeffPmax: -0.27,
    yearIntroduced: 2022,
    notes: 'Premium IBC cells. Industry-leading warranty.'
  },
  {
    id: 'sunpower-maxeon-6-spr-max6-440',
    make: 'SunPower',
    model: 'Maxeon 6 SPR-MAX6-440',
    wattage: 440,
    efficiency: 22.80,
    voc: 64.50,
    isc: 8.65,
    vmp: 55.00,
    imp: 8.00,
    dimensions: { length: 1812, width: 1046, depth: 40 },
    weight: 20.5,
    cellType: 'hjt',
    cells: 66,
    warranty: { product: 40, performance: 40 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.030,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2024,
    notes: 'Latest Maxeon. 40 year warranty! Premium.'
  },

  // ========== Q CELLS ==========
  {
    id: 'qcells-qpeak-duo-bl-g11s-400',
    make: 'Q CELLS',
    model: 'Q.PEAK DUO BL-G11S 400',
    wattage: 400,
    efficiency: 20.6,
    voc: 37.15,
    isc: 13.66,
    vmp: 30.95,
    imp: 12.92,
    dimensions: { length: 1722, width: 1134, depth: 32 },
    weight: 21.0,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.050,
    tempCoeffPmax: -0.34,
    yearIntroduced: 2022,
    notes: 'All-black aesthetic. Q.ANTUM technology.'
  },
  {
    id: 'qcells-qpeak-duo-ml-g11s-425',
    make: 'Q CELLS',
    model: 'Q.PEAK DUO ML-G11S 425',
    wattage: 425,
    efficiency: 21.9,
    voc: 38.00,
    isc: 14.10,
    vmp: 31.65,
    imp: 13.43,
    dimensions: { length: 1722, width: 1134, depth: 32 },
    weight: 21.3,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2024,
    notes: 'N-type TOPCon. German quality.'
  },

  // ========== HYUNDAI ==========
  {
    id: 'hyundai-hie-s400vg',
    make: 'Hyundai',
    model: 'HiE-S400VG',
    wattage: 400,
    efficiency: 20.7,
    voc: 37.25,
    isc: 13.62,
    vmp: 30.85,
    imp: 12.97,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2022,
    notes: 'Backed by Hyundai brand. Good value.'
  },
  {
    id: 'hyundai-his-s420vi',
    make: 'Hyundai',
    model: 'HiS-S420VI',
    wattage: 420,
    efficiency: 21.7,
    voc: 38.10,
    isc: 13.95,
    vmp: 31.70,
    imp: 13.25,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'topcon',
    cells: 108,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2024,
    notes: 'N-type upgrade. Better temperature coefficient.'
  },

  // ========== REC ==========
  {
    id: 'rec-alpha-pure-r-rec410aa-pure-r',
    make: 'REC',
    model: 'Alpha Pure-R REC410AA',
    wattage: 410,
    efficiency: 21.6,
    voc: 45.20,
    isc: 11.55,
    vmp: 38.00,
    imp: 10.79,
    dimensions: { length: 1730, width: 1099, depth: 30 },
    weight: 19.5,
    cellType: 'hjt',
    cells: 120,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.032,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2023,
    notes: 'HJT technology. Excellent low-light performance.'
  },
  {
    id: 'rec-alpha-pure-rx-rec430aa-pure-rx',
    make: 'REC',
    model: 'Alpha Pure-RX REC430AA',
    wattage: 430,
    efficiency: 22.3,
    voc: 46.00,
    isc: 11.90,
    vmp: 38.65,
    imp: 11.13,
    dimensions: { length: 1730, width: 1099, depth: 30 },
    weight: 19.8,
    cellType: 'hjt',
    cells: 120,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.030,
    tempCoeffPmax: -0.25,
    yearIntroduced: 2024,
    notes: 'Latest Alpha. Lead-free, recyclable design.'
  },

  // ========== SHARP ==========
  {
    id: 'sharp-nu-jc415b',
    make: 'Sharp',
    model: 'NU-JC415B',
    wattage: 415,
    efficiency: 21.2,
    voc: 37.80,
    isc: 13.92,
    vmp: 31.45,
    imp: 13.20,
    dimensions: { length: 1722, width: 1134, depth: 35 },
    weight: 21.5,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Japanese quality. Black frame aesthetic.'
  },

  // ========== PHONO SOLAR ==========
  {
    id: 'phono-solar-ps410m6h-20u',
    make: 'Phono Solar',
    model: 'PS410M6H-20/U',
    wattage: 410,
    efficiency: 21.2,
    voc: 37.50,
    isc: 13.85,
    vmp: 31.25,
    imp: 13.12,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Budget-friendly. Good value for money.'
  },

  // ========== RISEN ==========
  {
    id: 'risen-rsm40-8-410m',
    make: 'Risen',
    model: 'RSM40-8-410M',
    wattage: 410,
    efficiency: 21.2,
    voc: 37.45,
    isc: 13.90,
    vmp: 31.15,
    imp: 13.16,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'mono-perc',
    cells: 108,
    warranty: { product: 12, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.27,
    tempCoeffIsc: 0.048,
    tempCoeffPmax: -0.35,
    yearIntroduced: 2023,
    notes: 'Titan S series. Competitive pricing.'
  },

  // ========== 2025 NEW MODELS ==========

  // JA Solar DeepBlue 4.0 Pro N-type (2025)
  {
    id: 'ja-solar-jam54d40-455',
    make: 'JA Solar',
    model: 'JAM54D40-455/GB',
    wattage: 455,
    efficiency: 22.8,
    voc: 38.92,
    isc: 14.80,
    vmp: 32.65,
    imp: 13.94,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2025,
    notes: 'DeepBlue 4.0 Pro with n-type TOPCon. 30-year performance warranty.'
  },

  // LONGi Hi-MO X7 (2025)
  {
    id: 'longi-hi-mo-x7-460',
    make: 'LONGi',
    model: 'LR5-54HTH-460M',
    wattage: 460,
    efficiency: 23.0,
    voc: 38.50,
    isc: 15.10,
    vmp: 32.25,
    imp: 14.26,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'n-type-hpbc',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.043,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2025,
    notes: 'Hi-MO X7 with HPBC technology. Industry-leading efficiency.'
  },

  // Jinko Tiger Neo N-type 445W (2025)
  {
    id: 'jinko-tiger-neo-445-n',
    make: 'Jinko Solar',
    model: 'JKM445N-54HL4-B',
    wattage: 445,
    efficiency: 22.5,
    voc: 38.40,
    isc: 14.65,
    vmp: 32.10,
    imp: 13.86,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2025,
    notes: 'Tiger Neo with all-black aesthetic. Premium residential.'
  },

  // Canadian Solar TOPBiHiKu7 455W (2025)
  {
    id: 'canadian-solar-topbihiku7-455',
    make: 'Canadian Solar',
    model: 'CS7N-455TB-AG',
    wattage: 455,
    efficiency: 22.7,
    voc: 38.75,
    isc: 14.85,
    vmp: 32.45,
    imp: 14.02,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 22.0,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2025,
    notes: 'Bifacial TOPCon. Up to 25% rear gain. Premium tier.'
  },

  // Q CELLS Q.TRON BLK-G11+ 420W (2025)
  {
    id: 'qcells-qtron-blk-g11-420',
    make: 'Q CELLS',
    model: 'Q.TRON BLK-G11+ 420',
    wattage: 420,
    efficiency: 21.8,
    voc: 38.20,
    isc: 13.95,
    vmp: 32.00,
    imp: 13.12,
    dimensions: { length: 1722, width: 1134, depth: 32 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.26,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.32,
    yearIntroduced: 2025,
    notes: 'Q.TRON with TOPCon. German-engineered. All-black.'
  },

  // SunPower Maxeon 7 (2025)
  {
    id: 'sunpower-maxeon-7-440',
    make: 'SunPower',
    model: 'Maxeon 7 440W',
    wattage: 440,
    efficiency: 24.1,
    voc: 41.50,
    isc: 13.45,
    vmp: 34.80,
    imp: 12.64,
    dimensions: { length: 1690, width: 1046, depth: 40 },
    weight: 19.0,
    cellType: 'ibc',
    cells: 66,
    warranty: { product: 40, performance: 40 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.029,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2025,
    notes: 'Industry-leading efficiency. 40-year warranty. Premium residential.'
  },

  // REC Alpha Pure-RX 470W (2025)
  {
    id: 'rec-alpha-pure-rx-470',
    make: 'REC',
    model: 'Alpha Pure-RX 470',
    wattage: 470,
    efficiency: 22.8,
    voc: 42.50,
    isc: 14.02,
    vmp: 35.80,
    imp: 13.13,
    dimensions: { length: 1821, width: 1130, depth: 30 },
    weight: 22.5,
    cellType: 'n-type-hjt',
    cells: 132,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.036,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2025,
    notes: 'Alpha Pure-RX with heterojunction. Lead-free soldering.'
  },

  // Hyundai HiE-S500LG (2025)
  {
    id: 'hyundai-hie-s500lg',
    make: 'Hyundai',
    model: 'HiE-S500LG',
    wattage: 500,
    efficiency: 22.5,
    voc: 45.20,
    isc: 14.05,
    vmp: 38.10,
    imp: 13.12,
    dimensions: { length: 2094, width: 1038, depth: 35 },
    weight: 26.0,
    cellType: 'n-type-topcon',
    cells: 132,
    warranty: { product: 15, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2025,
    notes: 'Large format panel for commercial. Korean quality.'
  },

  // Trina Vertex S+ NEG21C.20 (2025)
  {
    id: 'trina-vertex-s-plus-neg21c-445',
    make: 'Trina Solar',
    model: 'TSM-NEG21C.20 445W',
    wattage: 445,
    efficiency: 22.5,
    voc: 38.65,
    isc: 14.58,
    vmp: 32.40,
    imp: 13.73,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.8,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2025,
    notes: 'Vertex S+ with latest TOPCon. 30-year output warranty.'
  },

  // Meyer Burger White 420W (2025) - European manufactured
  {
    id: 'meyer-burger-white-420',
    make: 'Meyer Burger',
    model: 'White 420W',
    wattage: 420,
    efficiency: 21.8,
    voc: 42.80,
    isc: 12.45,
    vmp: 36.20,
    imp: 11.60,
    dimensions: { length: 1767, width: 1041, depth: 35 },
    weight: 20.0,
    cellType: 'n-type-hjt',
    cells: 120,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.035,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2025,
    notes: 'Made in Germany. Premium European quality. Heterojunction.'
  },

  // Aiko BlackHole A-60 (2025) - ABC technology
  {
    id: 'aiko-blackhole-a60-460',
    make: 'Aiko',
    model: 'A-60-ABH-460',
    wattage: 460,
    efficiency: 23.6,
    voc: 39.10,
    isc: 14.90,
    vmp: 32.85,
    imp: 14.01,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'n-type-abc',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.042,
    tempCoeffPmax: -0.27,
    yearIntroduced: 2025,
    notes: 'All Back Contact technology. No front gridlines. Premium aesthetic.'
  },

  // DAS Solar N-type 445W (2025)
  {
    id: 'das-solar-dm108n-445',
    make: 'DAS Solar',
    model: 'DM108N-445W-FB',
    wattage: 445,
    efficiency: 22.4,
    voc: 38.45,
    isc: 14.65,
    vmp: 32.20,
    imp: 13.82,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.045,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2025,
    notes: 'N-type TOPCon. Full black aesthetic. Growing UK presence.'
  },

  // ========== 2026 NEW MODELS ==========

  // JA Solar DeepBlue 5.0 480W (2026)
  {
    id: 'ja-solar-jam54d45-480',
    make: 'JA Solar',
    model: 'JAM54D45-480/GB',
    wattage: 480,
    efficiency: 23.8,
    voc: 39.45,
    isc: 15.40,
    vmp: 33.10,
    imp: 14.50,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.043,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2026,
    notes: 'DeepBlue 5.0 with enhanced TOPCon. Latest generation.'
  },

  // LONGi Hi-MO 9 475W (2026)
  {
    id: 'longi-hi-mo-9-475',
    make: 'LONGi',
    model: 'LR5-54HPH-475M',
    wattage: 475,
    efficiency: 24.0,
    voc: 39.20,
    isc: 15.35,
    vmp: 32.90,
    imp: 14.44,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'n-type-hpbc',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.042,
    tempCoeffPmax: -0.28,
    yearIntroduced: 2026,
    notes: 'Hi-MO 9 with next-gen HPBC. Record-breaking efficiency.'
  },

  // Trina Vertex N 460W (2026)
  {
    id: 'trina-vertex-n-460',
    make: 'Trina Solar',
    model: 'TSM-NEG22C.20 460W',
    wattage: 460,
    efficiency: 23.2,
    voc: 39.10,
    isc: 14.90,
    vmp: 32.80,
    imp: 14.02,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.8,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.043,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2026,
    notes: 'Vertex N latest generation. Enhanced low-light performance.'
  },

  // Jinko Tiger Neo 2.0 460W (2026)
  {
    id: 'jinko-tiger-neo-2-460',
    make: 'Jinko Solar',
    model: 'JKM460N-54HL5-B',
    wattage: 460,
    efficiency: 23.3,
    voc: 39.25,
    isc: 14.85,
    vmp: 32.95,
    imp: 13.96,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.24,
    tempCoeffIsc: 0.043,
    tempCoeffPmax: -0.29,
    yearIntroduced: 2026,
    notes: 'Tiger Neo 2.0 with improved cell technology. All-black premium.'
  },

  // Canadian Solar HiHero 470W (2026)
  {
    id: 'canadian-solar-hihero-470',
    make: 'Canadian Solar',
    model: 'CS7L-470MS-HH',
    wattage: 470,
    efficiency: 23.5,
    voc: 39.40,
    isc: 15.10,
    vmp: 33.05,
    imp: 14.22,
    dimensions: { length: 1762, width: 1134, depth: 30 },
    weight: 22.0,
    cellType: 'n-type-hjt',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.040,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2026,
    notes: 'HiHero series with heterojunction. Premium efficiency tier.'
  },

  // Q CELLS Q.TRON-G2 435W (2026)
  {
    id: 'qcells-qtron-g2-435',
    make: 'Q CELLS',
    model: 'Q.TRON-G2 BLK 435',
    wattage: 435,
    efficiency: 22.6,
    voc: 38.65,
    isc: 14.28,
    vmp: 32.40,
    imp: 13.43,
    dimensions: { length: 1722, width: 1134, depth: 32 },
    weight: 21.5,
    cellType: 'n-type-topcon',
    cells: 108,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.25,
    tempCoeffIsc: 0.044,
    tempCoeffPmax: -0.30,
    yearIntroduced: 2026,
    notes: 'Q.TRON G2 with enhanced durability. German engineering.'
  },

  // REC Alpha Pure-RX2 485W (2026)
  {
    id: 'rec-alpha-pure-rx2-485',
    make: 'REC',
    model: 'Alpha Pure-RX2 485',
    wattage: 485,
    efficiency: 23.5,
    voc: 43.10,
    isc: 14.28,
    vmp: 36.30,
    imp: 13.36,
    dimensions: { length: 1821, width: 1130, depth: 30 },
    weight: 22.5,
    cellType: 'n-type-hjt',
    cells: 132,
    warranty: { product: 25, performance: 25 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.035,
    tempCoeffPmax: -0.25,
    yearIntroduced: 2026,
    notes: 'Alpha Pure-RX2 next generation. Industry-leading temperature coefficient.'
  },

  // SunPower Maxeon 8 460W (2026)
  {
    id: 'sunpower-maxeon-8-460',
    make: 'SunPower',
    model: 'Maxeon 8 460W',
    wattage: 460,
    efficiency: 24.8,
    voc: 42.20,
    isc: 13.85,
    vmp: 35.50,
    imp: 12.96,
    dimensions: { length: 1690, width: 1046, depth: 40 },
    weight: 19.5,
    cellType: 'ibc',
    cells: 66,
    warranty: { product: 40, performance: 40 },
    mcsCertified: true,
    tempCoeffVoc: -0.22,
    tempCoeffIsc: 0.028,
    tempCoeffPmax: -0.25,
    yearIntroduced: 2026,
    notes: 'World-leading 24.8% efficiency. 40-year complete warranty.'
  },

  // Aiko Comet 2.0 480W (2026)
  {
    id: 'aiko-comet-2-480',
    make: 'Aiko',
    model: 'A-60-ABC-480',
    wattage: 480,
    efficiency: 24.2,
    voc: 39.65,
    isc: 15.35,
    vmp: 33.25,
    imp: 14.44,
    dimensions: { length: 1722, width: 1134, depth: 30 },
    weight: 21.0,
    cellType: 'n-type-abc',
    cells: 108,
    warranty: { product: 25, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.22,
    tempCoeffIsc: 0.041,
    tempCoeffPmax: -0.26,
    yearIntroduced: 2026,
    notes: 'Comet 2.0 ABC technology. Zero busbar visible. Ultimate aesthetic.'
  },

  // Meyer Burger Glass 435W (2026)
  {
    id: 'meyer-burger-glass-435',
    make: 'Meyer Burger',
    model: 'Glass 435W',
    wattage: 435,
    efficiency: 22.5,
    voc: 43.40,
    isc: 12.72,
    vmp: 36.70,
    imp: 11.85,
    dimensions: { length: 1767, width: 1041, depth: 35 },
    weight: 20.5,
    cellType: 'n-type-hjt',
    cells: 120,
    warranty: { product: 30, performance: 30 },
    mcsCertified: true,
    tempCoeffVoc: -0.23,
    tempCoeffIsc: 0.034,
    tempCoeffPmax: -0.25,
    yearIntroduced: 2026,
    notes: 'Made in Germany. Glass-glass bifacial. 30-year warranty.'
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get unique list of panel makes
 */
export function getPanelMakes(): string[] {
  const makes = new Set(SOLAR_PANELS.map(p => p.make));
  return Array.from(makes).sort();
}

/**
 * Get models for a specific make
 */
export function getPanelModels(make: string): string[] {
  return SOLAR_PANELS
    .filter(p => p.make.toLowerCase() === make.toLowerCase())
    .map(p => p.model);
}

/**
 * Find panel by make and model
 */
export function findPanel(make: string, model: string): SolarPanel | undefined {
  return SOLAR_PANELS.find(
    p => p.make.toLowerCase() === make.toLowerCase() &&
         p.model.toLowerCase() === model.toLowerCase()
  );
}

/**
 * Find panel by ID
 */
export function findPanelById(id: string): SolarPanel | undefined {
  return SOLAR_PANELS.find(p => p.id === id);
}

/**
 * Search panels by text query
 */
export function searchPanels(query: string): SolarPanel[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return SOLAR_PANELS.filter(p =>
    p.make.toLowerCase().includes(q) ||
    p.model.toLowerCase().includes(q) ||
    `${p.make} ${p.model}`.toLowerCase().includes(q) ||
    p.wattage.toString().includes(q)
  ).slice(0, 15); // Limit to 15 results
}

/**
 * Get panels grouped by manufacturer
 */
export function getPanelsGroupedByManufacturer(): Record<string, SolarPanel[]> {
  const grouped: Record<string, SolarPanel[]> = {};

  for (const panel of SOLAR_PANELS) {
    if (!grouped[panel.make]) {
      grouped[panel.make] = [];
    }
    grouped[panel.make].push(panel);
  }

  // Sort by manufacturer name
  const sortedGrouped: Record<string, SolarPanel[]> = {};
  Object.keys(grouped).sort().forEach(key => {
    sortedGrouped[key] = grouped[key];
  });

  return sortedGrouped;
}

/**
 * Get display label for a panel
 */
export function getPanelLabel(panel: SolarPanel): string {
  return `${panel.make} ${panel.model}`;
}

/**
 * Get panel defaults for auto-fill
 */
export function getPanelDefaults(panelId: string): {
  wattage: number;
  voc: number;
  isc: number;
  vmp: number;
  imp: number;
  efficiency: number;
  mcsCertified: boolean;
} | null {
  const panel = findPanelById(panelId);
  if (!panel) return null;

  return {
    wattage: panel.wattage,
    voc: panel.voc,
    isc: panel.isc,
    vmp: panel.vmp,
    imp: panel.imp,
    efficiency: panel.efficiency,
    mcsCertified: panel.mcsCertified,
  };
}

/**
 * Calculate array capacity
 * @param panelWattage Wp per panel
 * @param panelCount Number of panels
 * @returns kWp
 */
export function calculateArrayCapacity(panelWattage: number, panelCount: number): number {
  return Math.round((panelWattage * panelCount) / 10) / 100; // Round to 2 decimal places
}

/**
 * Calculate string Voc
 * @param vocPerPanel Voc per panel (V)
 * @param panelsInSeries Number of panels in series
 * @returns String Voc (V)
 */
export function calculateStringVoc(vocPerPanel: number, panelsInSeries: number): number {
  return Math.round(vocPerPanel * panelsInSeries * 100) / 100;
}

/**
 * Calculate string Isc for parallel strings
 * @param iscPerPanel Isc per panel (A)
 * @param stringsInParallel Number of parallel strings
 * @returns Total Isc (A)
 */
export function calculateStringIsc(iscPerPanel: number, stringsInParallel: number): number {
  return Math.round(iscPerPanel * stringsInParallel * 100) / 100;
}

/**
 * Estimate annual yield for UK installations
 * @param capacityKwp System capacity in kWp
 * @param orientation Panel orientation
 * @param tiltAngle Tilt angle in degrees
 * @param shadingFactor Shading factor (0-1)
 * @returns Estimated annual yield in kWh
 */
export function estimateAnnualYield(
  capacityKwp: number,
  orientation: string = 'South',
  tiltAngle: number = 35,
  shadingFactor: number = 1
): number {
  // Base UK yield: ~850 kWh/kWp for optimal south-facing 35° tilt
  const baseYield = 850;

  // Orientation factors (relative to south)
  const orientationFactors: Record<string, number> = {
    'South': 1.00,
    'South-East': 0.96,
    'South-West': 0.96,
    'East': 0.85,
    'West': 0.85,
    'North-East': 0.65,
    'North-West': 0.65,
    'North': 0.55,
  };

  // Tilt angle factor (optimal is ~35° for UK)
  let tiltFactor = 1;
  if (tiltAngle < 15) tiltFactor = 0.90;
  else if (tiltAngle > 50) tiltFactor = 0.92;
  else if (tiltAngle < 25 || tiltAngle > 45) tiltFactor = 0.96;

  const orientationFactor = orientationFactors[orientation] || 0.85;

  const yield_ = capacityKwp * baseYield * orientationFactor * tiltFactor * shadingFactor;

  return Math.round(yield_);
}

/**
 * Get panel database count
 */
export function getPanelCount(): number {
  return SOLAR_PANELS.length;
}
