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
  },

  /**
   * UK Industry Standard Timescales (1 electrician, 8-hour days)
   * Based on NICEIC/NAPIT/JIB guidance and industry practice
   */
  timescaleBenchmarks: {
    // Domestic rewires (full strip-out, first-fix, second-fix, testing)
    rewire_1bed: { 
      days: 3.5, 
      labourHours: 28, 
      pointsRange: '12-18',
      description: '1-bed flat full rewire (1 electrician)' 
    },
    rewire_2bed: { 
      days: 5, 
      labourHours: 40, 
      pointsRange: '18-25',
      description: '2-bed house full rewire (1 electrician)' 
    },
    rewire_3bed: { 
      days: 6, 
      labourHours: 48, 
      pointsRange: '25-35',
      description: '3-bed house full rewire (1 electrician)' 
    },
    rewire_4bed: { 
      days: 8, 
      labourHours: 64, 
      pointsRange: '35-45',
      description: '4-bed house full rewire (1 electrician)' 
    },
    rewire_5bed: { 
      days: 10, 
      labourHours: 80, 
      pointsRange: '45-60',
      description: '5-bed house full rewire (1 electrician)' 
    },
    
    // Common individual jobs
    consumer_unit_change: { 
      days: 0.5, 
      labourHours: 4, 
      description: 'Consumer unit upgrade inc testing & certification' 
    },
    socket_add_surface: { 
      hours: 1.5, 
      labourHours: 1.5, 
      description: 'Additional socket (surface-mounted run)' 
    },
    socket_add_chased: { 
      hours: 2.5, 
      labourHours: 2.5, 
      description: 'Additional socket (chased into wall)' 
    },
    light_point_add: { 
      hours: 2, 
      labourHours: 2, 
      description: 'Additional light point' 
    },
    cooker_circuit: { 
      hours: 4, 
      labourHours: 4, 
      description: 'New cooker circuit from consumer unit' 
    },
    shower_circuit: { 
      hours: 5, 
      labourHours: 5, 
      description: 'New shower circuit from consumer unit' 
    },
    ev_charger: { 
      days: 0.5, 
      labourHours: 4, 
      description: 'EV charger installation (DNO notified)' 
    },
    outside_light: { 
      hours: 3, 
      labourHours: 3, 
      description: 'External lighting circuit' 
    },
    smoke_alarm_system: { 
      hours: 6, 
      labourHours: 6, 
      description: 'Interlinked smoke/heat alarm system (typical house)' 
    }
  },

  /**
   * Commercial Project Timescales (1 electrician, 8-hour days)
   * Based on commercial kitchen fit-outs and standard commercial tasks
   */
  commercialBenchmarks: {
    // Commercial kitchen fit-outs (full installation)
    kitchen_small: { 
      days: 8, 
      labourHours: 64, 
      description: 'Small commercial kitchen (café/takeaway)' 
    },
    kitchen_medium: { 
      days: 12, 
      labourHours: 96, 
      description: 'Medium commercial kitchen (restaurant)' 
    },
    kitchen_large: { 
      days: 18, 
      labourHours: 144, 
      description: 'Large commercial kitchen (hotel/catering)' 
    },
    
    // Individual commercial tasks
    db_board_3phase: { 
      hours: 12, 
      labourHours: 12, 
      description: '3-phase distribution board installation' 
    },
    swa_per_10m: { 
      hours: 2, 
      labourHours: 2, 
      description: 'SWA installation per 10m (including glands)' 
    },
    motor_circuit_3phase: { 
      hours: 4, 
      labourHours: 4, 
      description: '3-phase motor connection' 
    },
    cold_room_circuit: { 
      hours: 5, 
      labourHours: 5, 
      description: 'Cold room circuit + control wiring' 
    },
    emergency_lighting: { 
      hoursPerFitting: 0.75, 
      description: 'Emergency light fitting installation' 
    },
    commercial_lighting_circuit: { 
      hoursPerFitting: 1.5, 
      description: 'Commercial lighting circuit per fitting' 
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

⏱️ UK INDUSTRY STANDARD TIMESCALES (1 ELECTRICIAN, 8-hour days):

DOMESTIC REWIRES (strip-out, first-fix, second-fix, testing):
- 1-bed flat: 3-4 days (28-32 labour hours)
- 2-bed house: 4-5 days (32-40 labour hours)
- 3-bed house: 5-7 days (40-56 labour hours)
- 4-bed house: 7-9 days (56-72 labour hours)
- 5-bed house: 9-12 days (72-96 labour hours)

INDIVIDUAL JOBS (1 electrician):
- Consumer unit change: 0.5 days (4 hours inc testing)
- Additional socket (surface): 1.5 hours
- Additional socket (chased): 2.5 hours
- Additional light point: 2 hours
- New cooker circuit: 4 hours
- New shower circuit: 5 hours
- EV charger install: 0.5 days (4 hours)
- External lighting: 3 hours
- Smoke alarm system: 6 hours

🏭 COMMERCIAL PROJECT TIMESCALES (1 electrician, 8-hour days):

COMMERCIAL KITCHENS:
- Small (café/takeaway): 6-8 days (48-64 hours)
- Medium (restaurant): 10-14 days (80-112 hours)
- Large (hotel/catering): 16-20 days (128-160 hours)

COMMERCIAL INDIVIDUAL TASKS:
- 3-phase DB board installation: 1-1.5 days (8-12 hours)
- 30kW+ oven/cooker SWA circuit: 0.75-1 day (6-8 hours)
- 3-phase motor circuit (extraction): 0.5-1 day (4-8 hours)
- Cold room circuit + control: 0.5-0.75 day (4-6 hours) per unit
- Commercial lighting circuit: 1-2 hours per fitting
- Emergency lighting: 0.75 hours per fitting

⚠️ COMMERCIAL ≠ DOMESTIC: Don't apply domestic timescales to commercial work.
A restaurant kitchen is NOT 5× a domestic kitchen - it's different equipment, not more of the same.

⚠️ NOTE: If quoting for a 2-person team, halve the elapsed days but keep labour hours the same.
Labour hours = what you charge for. Elapsed days = how long you're on site.

⚠️ If your labour estimate exceeds these benchmarks by >20%, review your timescales!

If your estimate is significantly higher than these benchmarks, review your pricing and timescales!`;
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

/**
 * Validate timescales against UK industry benchmarks
 */
export function validateTimescales(estimate: any, query: string): string[] {
  const warnings: string[] = [];
  const queryLower = query.toLowerCase();
  const totalDays = estimate.timescales?.totalDays || 0;
  const totalHours = estimate.labour?.totalHours || 0;
  
  // Check domestic rewires (1 electrician benchmarks)
  if (queryLower.includes('rewire')) {
    if (queryLower.includes('1 bed') || queryLower.includes('1-bed')) {
      if (totalHours > 32) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 1-bed rewire - typical is 28-32 hours (1 electrician)`);
      }
    } else if (queryLower.includes('2 bed') || queryLower.includes('2-bed')) {
      if (totalHours > 40) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 2-bed rewire - typical is 32-40 hours (1 electrician)`);
      }
    } else if (queryLower.includes('3 bed') || queryLower.includes('3-bed')) {
      if (totalHours > 56) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 3-bed rewire - typical is 40-56 hours (1 electrician)`);
      }
    } else if (queryLower.includes('4 bed') || queryLower.includes('4-bed')) {
      if (totalHours > 72) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 4-bed rewire - typical is 56-72 hours (1 electrician)`);
      }
    } else if (queryLower.includes('5 bed') || queryLower.includes('5-bed')) {
      if (totalHours > 96) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 5-bed rewire - typical is 72-96 hours (1 electrician)`);
      }
    }
  }
  
  // Check commercial kitchen timescales (1 electrician benchmarks)
  if ((queryLower.includes('kitchen') || queryLower.includes('restaurant') || queryLower.includes('café')) && 
      (queryLower.includes('commercial') || queryLower.includes('3 phase') || queryLower.includes('extraction'))) {
    if (queryLower.includes('small') || queryLower.includes('café') || queryLower.includes('takeaway')) {
      if (totalHours > 64) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for small commercial kitchen - typical is 48-64 hours`);
      }
    } else if (queryLower.includes('medium') || queryLower.includes('restaurant')) {
      if (totalHours > 112) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for medium commercial kitchen - typical is 80-112 hours`);
      }
    } else if (queryLower.includes('large') || queryLower.includes('hotel') || queryLower.includes('catering')) {
      if (totalHours > 160) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for large commercial kitchen - typical is 128-160 hours`);
      }
    } else {
      // Generic commercial kitchen
      if (totalHours > 112) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high - typical commercial kitchen is 80-112 hours for restaurants`);
      }
    }
      if (totalHours > 56) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 3-bed rewire - typical is 40-56 hours (1 electrician)`);
      }
    } else if (queryLower.includes('4 bed') || queryLower.includes('4-bed')) {
      if (totalHours > 72) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 4-bed rewire - typical is 56-72 hours (1 electrician)`);
      }
    } else if (queryLower.includes('5 bed') || queryLower.includes('5-bed')) {
      if (totalHours > 96) {
        warnings.push(`⚠️ ${totalHours} labour hours seems high for 5-bed rewire - typical is 72-96 hours (1 electrician)`);
      }
    }
  }
  
  // Check consumer unit change
  if ((queryLower.includes('consumer unit') || queryLower.includes('cu change')) && 
      !queryLower.includes('rewire')) {
    if (totalDays > 1 || totalHours > 8) {
      warnings.push(`⚠️ ${totalDays} days seems high for consumer unit change - typical is 0.5 days (4 hours)`);
    }
  }
  
  // Check labour hours vs days consistency (1 electrician = 8 hours per day)
  if (totalDays > 0 && totalHours > 0) {
    const expectedHoursMin = totalDays * 6; // Allow some variation (6 hours/day minimum)
    const expectedHoursMax = totalDays * 10; // Allow some variation (10 hours/day maximum)
    
    if (totalHours < expectedHoursMin) {
      warnings.push(`⚠️ Labour hours (${totalHours}h) seem low for ${totalDays} days - check if days calculated correctly`);
    } else if (totalHours > expectedHoursMax) {
      warnings.push(`⚠️ Labour hours (${totalHours}h) seem high for ${totalDays} days - typical is 8 hours/day for 1 electrician`);
    }
  }
  
  return warnings;
}
