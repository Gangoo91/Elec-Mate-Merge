/**
 * UK Electrical Materials Pricing - 2025 Trade Prices
 * Accurate CEF/TLC/Rexel trade prices (January 2025)
 * Prices exclude VAT
 * 
 * This mirrors the frontend constants but is available in edge functions
 */

export const UK_TRADE_PRICING_2025 = {
  cables: {
    '1.5mm_te': { perMetre: 0.80, per100m: 80, description: '1.5mm² Twin & Earth' },
    '2.5mm_te': { perMetre: 0.98, per100m: 98, description: '2.5mm² Twin & Earth' },
    '4mm_te': { perMetre: 1.45, per100m: 145, description: '4mm² Twin & Earth' },
    '6mm_te': { perMetre: 2.20, per100m: 220, description: '6mm² Twin & Earth' },
    '10mm_te': { perMetre: 3.90, per100m: 390, description: '10mm² Twin & Earth' },
    '16mm_te': { perMetre: 6.50, per100m: 650, description: '16mm² Twin & Earth' },
    '2.5mm_swa': { perMetre: 3.50, per50m: 175, description: '2.5mm² 3-core SWA' },
    '4mm_swa': { perMetre: 4.80, per50m: 240, description: '4mm² 3-core SWA' },
    '6mm_swa': { perMetre: 6.20, per50m: 310, description: '6mm² 3-core SWA' },
    '10mm_swa': { perMetre: 9.50, per50m: 475, description: '10mm² 3-core SWA' }
  },
  
  consumerUnits: {
    '8way_rcbo': { price: 165, description: '8-way RCBO consumer unit (Hager/Schneider)' },
    '10way_rcbo': { price: 200, description: '10-way RCBO consumer unit (Hager/Schneider)' },
    '12way_rcbo': { price: 250, description: '12-way RCBO consumer unit (Hager/Schneider)' },
    '16way_rcbo': { price: 320, description: '16-way RCBO consumer unit (Hager/Schneider)' },
    '18way_rcbo': { price: 360, description: '18-way RCBO consumer unit (Hager/Schneider)' }
  },
  
  accessories: {
    double_socket: { price: 3.20, description: 'Double socket outlet (typical quality)' },
    single_socket: { price: 2.80, description: 'Single socket outlet (typical quality)' },
    light_switch_1gang: { price: 3.50, description: '1-gang light switch (typical quality)' },
    light_switch_2gang: { price: 4.50, description: '2-gang light switch (typical quality)' },
    rcbo_32a: { price: 27.50, description: 'RCBO 32A (Hager/Schneider)' },
    rcbo_40a: { price: 28.50, description: 'RCBO 40A (Hager/Schneider)' },
    back_box_35mm: { price: 0.80, description: '35mm back box' },
    back_box_47mm: { price: 1.20, description: '47mm back box' },
    swa_gland_20mm: { price: 10.00, description: '20mm SWA gland (CW/MK)' },
    swa_gland_25mm: { price: 12.50, description: '25mm SWA gland (CW/MK)' }
  },

  labourRates: {
    rewire_per_point: { min: 85, typical: 100, max: 120, description: 'Full rewire labour per point' },
    consumer_unit_change: { min: 350, typical: 450, max: 600, description: 'Consumer unit replacement inc testing' },
    socket_add: { min: 65, typical: 85, max: 110, description: 'Add additional socket' },
    light_point_add: { min: 55, typical: 75, max: 95, description: 'Add light point' },
    cooker_circuit: { min: 150, typical: 200, max: 280, description: 'New cooker circuit from CU' },
    shower_circuit: { min: 180, typical: 250, max: 350, description: 'New shower circuit from CU' }
  },

  benchmarks: {
    domestic_rewire_3bed: {
      materials_min: 1200,
      materials_max: 1800,
      description: '3-bedroom house full rewire - materials only'
    },
    consumer_unit_upgrade: {
      materials_min: 200,
      materials_max: 350,
      description: 'Consumer unit upgrade to RCBO board'
    },
    additional_socket: {
      materials_min: 15,
      materials_max: 25,
      description: 'Single additional socket - materials only'
    }
  }
};

/**
 * Format trade pricing as a prompt string for AI
 */
export function formatTradePricingPrompt(): string {
  return `⚠️ CRITICAL: ALWAYS USE THESE ACCURATE UK TRADE PRICES (CEF/TLC 2025):

📦 CABLES (per metre, trade price ex-VAT):
- 1.5mm² T&E: £0.80/m (£80/100m)
- 2.5mm² T&E: £0.98/m (£98/100m)
- 4mm² T&E: £1.45/m (£145/100m)
- 6mm² T&E: £2.20/m (£220/100m)
- 10mm² T&E: £3.90/m (£390/100m)
- 16mm² T&E: £6.50/m (£650/100m)
- 2.5mm² 3-core SWA: £3.50/m
- 4mm² 3-core SWA: £4.80/m
- 6mm² 3-core SWA: £6.20/m
- 10mm² 3-core SWA: £9.50/m

🔌 CONSUMER UNITS (complete RCBO boards, trade price):
- 8-way RCBO board: £165
- 10-way RCBO board: £200
- 12-way RCBO board: £250
- 16-way RCBO board: £320
- 18-way RCBO board: £360

🔧 ACCESSORIES (typical quality, trade price):
- Double socket: £3.20
- Single socket: £2.80
- 1-gang light switch: £3.50
- 2-gang light switch: £4.50
- RCBO 32A: £27.50
- RCBO 40A: £28.50
- 35mm back box: £0.80
- 47mm back box: £1.20
- 20mm SWA gland: £10.00
- 25mm SWA gland: £12.50

⚠️ PRICING RULES:
1. ALWAYS use the above trade prices for standard items
2. Only use database prices for SPECIALIST/UNUSUAL items not listed above
3. If using database prices, they are LIST PRICES - apply 40% discount for trade
4. Include 10% cable waste allowance
5. Include 5% materials contingency

✅ TYPICAL JOB BENCHMARKS (materials only):
- 3-bed house full rewire: £1,200-1,800
- Consumer unit upgrade: £200-350
- Additional socket: £15-25
- Light point: £12-20
- New cooker circuit: £80-150
- New shower circuit: £100-180

If your estimate is significantly higher than these benchmarks, review your pricing!`;
}

/**
 * Validate pricing against benchmarks
 */
export function validatePricing(estimate: any): string[] {
  const warnings: string[] = [];
  
  // Check consumer unit pricing
  const cuItems = estimate.materials?.items?.filter((i: any) => 
    i.description.toLowerCase().includes('consumer unit') || 
    i.description.toLowerCase().includes('board')
  ) || [];
  
  cuItems.forEach((cu: any) => {
    if (cu.unitPrice > 400) {
      warnings.push(`⚠️ Consumer unit price £${cu.unitPrice.toFixed(2)} is high - typical trade is £165-360`);
    }
  });
  
  // Check cable pricing (2.5mm T&E should be ~£0.98/m)
  const cableItems = estimate.materials?.items?.filter((i: any) => 
    i.description.toLowerCase().includes('2.5mm') && 
    i.description.toLowerCase().includes('t&e')
  ) || [];
  
  cableItems.forEach((cable: any) => {
    if (cable.unit === 'metres' && cable.unitPrice > 2.00) {
      warnings.push(`⚠️ Cable price £${cable.unitPrice.toFixed(2)}/m seems high - 2.5mm T&E trade is £0.98/m`);
    }
  });
  
  // Check RCBO pricing
  const rcboItems = estimate.materials?.items?.filter((i: any) => 
    i.description.toLowerCase().includes('rcbo')
  ) || [];
  
  rcboItems.forEach((rcbo: any) => {
    if (rcbo.unitPrice > 40) {
      warnings.push(`⚠️ RCBO price £${rcbo.unitPrice.toFixed(2)} is high - typical trade is £27.50-28.50`);
    }
  });
  
  return warnings;
}
