/**
 * UK Electrical Materials Pricing - 2025
 * Trade prices from CEF/TLC/Rexel (January 2025)
 * Prices exclude VAT
 */

export const UK_MATERIALS_PRICING_2025 = {
  cables: {
    '1.5mm_te': { perMetre: 0.80, per100m: 80, supplier: 'CEF/TLC', description: '1.5mm² Twin & Earth' },
    '2.5mm_te': { perMetre: 0.98, per100m: 98, supplier: 'CEF/TLC', description: '2.5mm² Twin & Earth' },
    '4mm_te': { perMetre: 1.45, per100m: 145, supplier: 'CEF/TLC', description: '4mm² Twin & Earth' },
    '6mm_te': { perMetre: 2.20, per100m: 220, supplier: 'CEF/TLC', description: '6mm² Twin & Earth' },
    '10mm_te': { perMetre: 3.90, per100m: 390, supplier: 'CEF/TLC', description: '10mm² Twin & Earth' },
    '16mm_te': { perMetre: 6.50, per100m: 650, supplier: 'CEF/TLC', description: '16mm² Twin & Earth' },
    '2.5mm_swa': { perMetre: 3.50, per50m: 175, supplier: 'CEF/TLC', description: '2.5mm² 3-core SWA' },
    '4mm_swa': { perMetre: 4.80, per50m: 240, supplier: 'CEF/TLC', description: '4mm² 3-core SWA' },
    '6mm_swa': { perMetre: 6.20, per50m: 310, supplier: 'CEF/TLC', description: '6mm² 3-core SWA' },
    '10mm_swa': { perMetre: 9.50, per50m: 475, supplier: 'CEF/TLC', description: '10mm² 3-core SWA' }
  },
  
  consumerUnits: {
    '8way_rcbo': { min: 150, typical: 165, max: 180, brand: 'Hager/Schneider', description: '8-way RCBO consumer unit' },
    '10way_rcbo': { min: 180, typical: 200, max: 220, brand: 'Hager/Schneider', description: '10-way RCBO consumer unit' },
    '12way_rcbo': { min: 220, typical: 250, max: 280, brand: 'Hager/Schneider', description: '12-way RCBO consumer unit' },
    '16way_rcbo': { min: 280, typical: 320, max: 350, brand: 'Hager/Schneider', description: '16-way RCBO consumer unit' },
    '18way_rcbo': { min: 320, typical: 360, max: 400, brand: 'Hager/Schneider', description: '18-way RCBO consumer unit' }
  },
  
  accessories: {
    'double_socket': { min: 2.50, typical: 3.20, max: 8.50, range: 'budget to premium' },
    'single_socket': { min: 2.00, typical: 2.80, max: 7.00, range: 'budget to premium' },
    'light_switch_2gang': { min: 2.80, typical: 4.50, max: 12.00 },
    'light_switch_1gang': { min: 2.20, typical: 3.50, max: 9.00 },
    'rcbo_40a': { min: 25, typical: 28.50, max: 35, brand: 'Hager/Schneider' },
    'rcbo_32a': { min: 24, typical: 27.50, max: 33, brand: 'Hager/Schneider' },
    'swa_gland_20mm': { typical: 10.00, brand: 'CW/MK' },
    'swa_gland_25mm': { typical: 12.50, brand: 'CW/MK' }
  }
};

export type CableSizeKey = keyof typeof UK_MATERIALS_PRICING_2025.cables;
export type ConsumerUnitKey = keyof typeof UK_MATERIALS_PRICING_2025.consumerUnits;
export type AccessoryKey = keyof typeof UK_MATERIALS_PRICING_2025.accessories;
