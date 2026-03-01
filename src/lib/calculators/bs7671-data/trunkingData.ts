// Trunking, cable tray and cable basket sizing data
// Based on standard UK manufacturer dimensions and BS 7671 Regulation 522.8.1

export interface TrunkingSize {
  label: string;
  width: number; // mm
  height: number; // mm
  internalArea: number; // mm² (usable internal area)
  material: 'pvc' | 'steel';
  type: 'mini' | 'maxi' | 'standard';
}

export interface CableTraySize {
  label: string;
  width: number; // mm
  type: 'perforated' | 'basket';
}

export interface CableCSA {
  type: string; // 'singles-pvc', 'twin-earth', 'swa'
  typeLabel: string;
  size: number; // mm² conductor
  overallDiameter: number; // mm (for round cables)
  overallWidth?: number; // mm (for flat cables)
  overallHeight?: number; // mm (for flat cables)
  crossSectionalArea: number; // mm² (actual space taken)
}

// ──── PVC Mini Trunking ────
export const pvcMiniTrunking: TrunkingSize[] = [
  {
    label: '16 × 16mm PVC Mini',
    width: 16,
    height: 16,
    internalArea: 196,
    material: 'pvc',
    type: 'mini',
  },
  {
    label: '25 × 16mm PVC Mini',
    width: 25,
    height: 16,
    internalArea: 310,
    material: 'pvc',
    type: 'mini',
  },
  {
    label: '38 × 16mm PVC Mini',
    width: 38,
    height: 16,
    internalArea: 476,
    material: 'pvc',
    type: 'mini',
  },
  {
    label: '38 × 25mm PVC Mini',
    width: 38,
    height: 25,
    internalArea: 750,
    material: 'pvc',
    type: 'mini',
  },
  {
    label: '50 × 25mm PVC Mini',
    width: 50,
    height: 25,
    internalArea: 1000,
    material: 'pvc',
    type: 'mini',
  },
];

// ──── PVC Maxi Trunking ────
export const pvcMaxiTrunking: TrunkingSize[] = [
  {
    label: '50 × 50mm PVC Maxi',
    width: 50,
    height: 50,
    internalArea: 1900,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '75 × 50mm PVC Maxi',
    width: 75,
    height: 50,
    internalArea: 2900,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '75 × 75mm PVC Maxi',
    width: 75,
    height: 75,
    internalArea: 4400,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '100 × 50mm PVC Maxi',
    width: 100,
    height: 50,
    internalArea: 3900,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '100 × 75mm PVC Maxi',
    width: 100,
    height: 75,
    internalArea: 5900,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '100 × 100mm PVC Maxi',
    width: 100,
    height: 100,
    internalArea: 7900,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '150 × 50mm PVC Maxi',
    width: 150,
    height: 50,
    internalArea: 5900,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '150 × 75mm PVC Maxi',
    width: 150,
    height: 75,
    internalArea: 9000,
    material: 'pvc',
    type: 'maxi',
  },
  {
    label: '150 × 100mm PVC Maxi',
    width: 150,
    height: 100,
    internalArea: 12100,
    material: 'pvc',
    type: 'maxi',
  },
];

// ──── Steel Trunking ────
export const steelTrunking: TrunkingSize[] = [
  {
    label: '50 × 50mm Steel',
    width: 50,
    height: 50,
    internalArea: 1800,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '75 × 50mm Steel',
    width: 75,
    height: 50,
    internalArea: 2800,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '75 × 75mm Steel',
    width: 75,
    height: 75,
    internalArea: 4200,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '100 × 50mm Steel',
    width: 100,
    height: 50,
    internalArea: 3700,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '100 × 75mm Steel',
    width: 100,
    height: 75,
    internalArea: 5700,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '100 × 100mm Steel',
    width: 100,
    height: 100,
    internalArea: 7600,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '150 × 50mm Steel',
    width: 150,
    height: 50,
    internalArea: 5700,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '150 × 75mm Steel',
    width: 150,
    height: 75,
    internalArea: 8700,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '150 × 100mm Steel',
    width: 150,
    height: 100,
    internalArea: 11700,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '150 × 150mm Steel',
    width: 150,
    height: 150,
    internalArea: 17700,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '200 × 100mm Steel',
    width: 200,
    height: 100,
    internalArea: 15800,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '225 × 75mm Steel',
    width: 225,
    height: 75,
    internalArea: 13200,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '225 × 150mm Steel',
    width: 225,
    height: 150,
    internalArea: 27000,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '300 × 75mm Steel',
    width: 300,
    height: 75,
    internalArea: 17800,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '300 × 100mm Steel',
    width: 300,
    height: 100,
    internalArea: 24000,
    material: 'steel',
    type: 'standard',
  },
  {
    label: '300 × 150mm Steel',
    width: 300,
    height: 150,
    internalArea: 36400,
    material: 'steel',
    type: 'standard',
  },
];

// ──── Cable Tray ────
export const cableTrayWidths: CableTraySize[] = [
  { label: '75mm Perforated Tray', width: 75, type: 'perforated' },
  { label: '100mm Perforated Tray', width: 100, type: 'perforated' },
  { label: '150mm Perforated Tray', width: 150, type: 'perforated' },
  { label: '225mm Perforated Tray', width: 225, type: 'perforated' },
  { label: '300mm Perforated Tray', width: 300, type: 'perforated' },
  { label: '450mm Perforated Tray', width: 450, type: 'perforated' },
  { label: '600mm Perforated Tray', width: 600, type: 'perforated' },
  { label: '750mm Perforated Tray', width: 750, type: 'perforated' },
  { label: '900mm Perforated Tray', width: 900, type: 'perforated' },
];

// ──── Cable Basket ────
export const cableBasketWidths: CableTraySize[] = [
  { label: '100mm Cable Basket', width: 100, type: 'basket' },
  { label: '150mm Cable Basket', width: 150, type: 'basket' },
  { label: '200mm Cable Basket', width: 200, type: 'basket' },
  { label: '300mm Cable Basket', width: 300, type: 'basket' },
  { label: '400mm Cable Basket', width: 400, type: 'basket' },
  { label: '500mm Cable Basket', width: 500, type: 'basket' },
];

// ──── Cable Cross-Sectional Areas ────
// Singles PVC (6491X) — circular cross-section
export const singlesPvc: CableCSA[] = [
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 1.0,
    overallDiameter: 2.9,
    crossSectionalArea: 6.6,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 1.5,
    overallDiameter: 3.2,
    crossSectionalArea: 8.0,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 2.5,
    overallDiameter: 3.9,
    crossSectionalArea: 11.9,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 4.0,
    overallDiameter: 4.5,
    crossSectionalArea: 15.9,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 6.0,
    overallDiameter: 5.2,
    crossSectionalArea: 21.2,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 10.0,
    overallDiameter: 6.6,
    crossSectionalArea: 34.2,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 16.0,
    overallDiameter: 7.9,
    crossSectionalArea: 49.0,
  },
  {
    type: 'singles-pvc',
    typeLabel: 'Singles PVC (6491X)',
    size: 25.0,
    overallDiameter: 9.7,
    crossSectionalArea: 73.9,
  },
];

// Twin & Earth flat (6242Y) — uses width × height for CSA
export const twinAndEarth: CableCSA[] = [
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 1.0,
    overallDiameter: 0,
    overallWidth: 8.0,
    overallHeight: 5.6,
    crossSectionalArea: 44.8,
  },
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 1.5,
    overallDiameter: 0,
    overallWidth: 9.0,
    overallHeight: 6.3,
    crossSectionalArea: 56.7,
  },
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 2.5,
    overallDiameter: 0,
    overallWidth: 11.0,
    overallHeight: 7.3,
    crossSectionalArea: 80.3,
  },
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 4.0,
    overallDiameter: 0,
    overallWidth: 12.5,
    overallHeight: 8.5,
    crossSectionalArea: 106.3,
  },
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 6.0,
    overallDiameter: 0,
    overallWidth: 14.5,
    overallHeight: 9.5,
    crossSectionalArea: 137.8,
  },
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 10.0,
    overallDiameter: 0,
    overallWidth: 17.5,
    overallHeight: 11.5,
    crossSectionalArea: 201.3,
  },
  {
    type: 'twin-earth',
    typeLabel: 'Twin & Earth (6242Y)',
    size: 16.0,
    overallDiameter: 0,
    overallWidth: 21.5,
    overallHeight: 13.5,
    crossSectionalArea: 290.3,
  },
];

// SWA (Steel Wire Armoured) — circular cross-section
export const swa: CableCSA[] = [
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 1.5,
    overallDiameter: 11.5,
    crossSectionalArea: 103.9,
  },
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 2.5,
    overallDiameter: 12.5,
    crossSectionalArea: 122.7,
  },
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 4.0,
    overallDiameter: 13.5,
    crossSectionalArea: 143.1,
  },
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 6.0,
    overallDiameter: 15.0,
    crossSectionalArea: 176.7,
  },
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 10.0,
    overallDiameter: 17.5,
    crossSectionalArea: 240.5,
  },
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 16.0,
    overallDiameter: 20.0,
    crossSectionalArea: 314.2,
  },
  {
    type: 'swa',
    typeLabel: 'SWA (BS 5467)',
    size: 25.0,
    overallDiameter: 23.0,
    crossSectionalArea: 415.5,
  },
];

// ──── Helpers ────

export type ContainmentType = 'pvc-trunking' | 'steel-trunking' | 'cable-tray' | 'cable-basket';

export const containmentTypeOptions = [
  { value: 'pvc-trunking' as const, label: 'PVC Trunking' },
  { value: 'steel-trunking' as const, label: 'Steel Trunking' },
  { value: 'cable-tray' as const, label: 'Cable Tray' },
  { value: 'cable-basket' as const, label: 'Cable Basket' },
];

export const getTrunkingSizes = (containment: ContainmentType): TrunkingSize[] => {
  switch (containment) {
    case 'pvc-trunking':
      return [...pvcMiniTrunking, ...pvcMaxiTrunking];
    case 'steel-trunking':
      return steelTrunking;
    default:
      return [];
  }
};

export const allCableTypes: CableCSA[] = [...singlesPvc, ...twinAndEarth, ...swa];

export const cableTypeOptions = [
  { value: 'singles-pvc', label: 'Singles PVC (6491X)' },
  { value: 'twin-earth', label: 'Twin & Earth (6242Y)' },
  { value: 'swa', label: 'SWA (BS 5467)' },
];

export const getCableSizeOptions = (cableType: string) => {
  return allCableTypes
    .filter((c) => c.type === cableType)
    .map((c) => ({ value: c.size.toString(), label: `${c.size}mm²` }));
};

export const getCableCSA = (cableType: string, size: number): CableCSA | undefined => {
  return allCableTypes.find((c) => c.type === cableType && c.size === size);
};
