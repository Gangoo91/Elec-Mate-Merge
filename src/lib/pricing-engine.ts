// Pricing Engine - Legal public data sources for UK electrical work
// Based on: JIB rates, public supplier prices, government indices, market research

import { MARKET_RATES_2025 } from './constants/pricing-2025';

// ============================================================================
// MATERIAL PRICING (Based on public supplier catalogues - Sept 2025)
// ============================================================================

export const MATERIAL_PRICES = {
  // Cable (per metre) - Screwfix/CEF public pricing
  cable: {
    '1.0mm_twin_earth': { price: 0.42, supplier: 'Screwfix' },
    '1.5mm_twin_earth': { price: 0.58, supplier: 'Screwfix' },
    '2.5mm_twin_earth': { price: 0.95, supplier: 'CEF' },
    '4mm_twin_earth': { price: 1.45, supplier: 'CEF' },
    '6mm_twin_earth': { price: 2.20, supplier: 'CEF' },
    '10mm_twin_earth': { price: 3.85, supplier: 'TLC Direct' },
    '16mm_twin_earth': { price: 6.20, supplier: 'TLC Direct' },
    '2.5mm_3core_earth': { price: 1.35, supplier: 'CEF' },
    '4mm_3core_earth': { price: 2.10, supplier: 'CEF' },
    '6mm_3core_earth': { price: 3.45, supplier: 'TLC Direct' },
    '10mm_3core_earth': { price: 5.95, supplier: 'TLC Direct' },
  },

  // Protection devices
  mcb: {
    'type_b_6a': { price: 4.50, supplier: 'Screwfix' },
    'type_b_10a': { price: 4.50, supplier: 'Screwfix' },
    'type_b_16a': { price: 4.50, supplier: 'Screwfix' },
    'type_b_32a': { price: 4.80, supplier: 'Screwfix' },
    'type_b_40a': { price: 5.20, supplier: 'CEF' },
    'type_c_16a': { price: 5.20, supplier: 'CEF' },
    'type_c_32a': { price: 5.50, supplier: 'CEF' },
    'type_c_40a': { price: 6.20, supplier: 'CEF' },
  },

  rcbo: {
    'type_b_6a_30ma': { price: 18.50, supplier: 'Screwfix' },
    'type_b_16a_30ma': { price: 18.50, supplier: 'Screwfix' },
    'type_b_32a_30ma': { price: 19.50, supplier: 'CEF' },
    'type_b_40a_30ma': { price: 22.00, supplier: 'CEF' },
  },

  rcd: {
    '30ma_63a_double_pole': { price: 28.00, supplier: 'Screwfix' },
    '30ma_80a_double_pole': { price: 32.00, supplier: 'CEF' },
    '100ma_63a_time_delay': { price: 45.00, supplier: 'CEF' },
  },

  // Accessories
  accessories: {
    'metal_clad_socket_single': { price: 3.80, supplier: 'Screwfix' },
    'metal_clad_socket_double': { price: 4.50, supplier: 'Screwfix' },
    'metal_clad_switch_1gang': { price: 2.90, supplier: 'Screwfix' },
    'metal_clad_switch_2gang': { price: 3.40, supplier: 'Screwfix' },
    'plastic_socket_double': { price: 1.95, supplier: 'Screwfix' },
    'plastic_switch_1gang': { price: 1.20, supplier: 'Screwfix' },
    'ceiling_rose': { price: 1.80, supplier: 'Screwfix' },
    'cooker_switch_45a': { price: 8.50, supplier: 'Screwfix' },
    'fused_spur_13a': { price: 3.20, supplier: 'Screwfix' },
  },

  // Consumer units
  consumer_units: {
    '6way_metal_dual_rcd': { price: 85.00, supplier: 'Screwfix' },
    '10way_metal_dual_rcd': { price: 110.00, supplier: 'CEF' },
    '12way_metal_dual_rcd': { price: 135.00, supplier: 'CEF' },
    '16way_metal_rcbo': { price: 180.00, supplier: 'TLC Direct' },
  },

  // Installation materials
  sundries: {
    'metal_back_box_single': { price: 0.65, supplier: 'Screwfix' },
    'metal_back_box_double': { price: 0.85, supplier: 'Screwfix' },
    'plastic_conduit_20mm_per_m': { price: 0.95, supplier: 'Screwfix' },
    'metal_conduit_20mm_per_m': { price: 2.40, supplier: 'CEF' },
    'cable_clips_100pack': { price: 2.50, supplier: 'Screwfix' },
    'grommets_100pack': { price: 3.20, supplier: 'Screwfix' },
    'junction_box_20a': { price: 1.80, supplier: 'Screwfix' },
    'junction_box_30a': { price: 2.40, supplier: 'CEF' },
    'earth_clamp': { price: 1.20, supplier: 'Screwfix' },
    'wago_connectors_5pack': { price: 4.50, supplier: 'Screwfix' },
  },
};

// ============================================================================
// LABOUR RATES (JIB 2025/26 published rates)
// ============================================================================

export const LABOUR_RATES = {
  // Base hourly rates by qualification (JIB 2025)
  hourly: {
    apprentice_year1: 12.21, // National Living Wage
    apprentice_year2: 13.50,
    apprentice_year3: 15.00,
    improver: 22.00,
    electrician: 28.00,
    approved_electrician: 32.00,
    technician: 38.00,
    supervisor: 45.00,
  },

  // Typical day rates (8 hours + overheads)
  daily: {
    electrician: 280.00, // £35/hr equivalent
    approved_electrician: 320.00, // £40/hr equivalent
  },

  // Overhead multipliers for different business structures
  overheadMultipliers: {
    sole_trader: 1.15, // 15% overhead
    small_company: 1.35, // 35% overhead
    medium_company: 1.50, // 50% overhead
    large_contractor: 1.65, // 65% overhead
  },
};

// ============================================================================
// INSTALLATION TIME ESTIMATES (Industry averages)
// ============================================================================

export const INSTALLATION_TIMES = {
  // In hours
  circuit_installation: {
    socket_radial_per_outlet: 0.5,
    socket_ring_per_outlet: 0.4,
    lighting_per_point: 0.3,
    cooker_circuit: 2.0,
    shower_circuit: 3.0,
    immersion_circuit: 1.5,
    ev_charger_circuit: 4.0,
  },

  consumer_unit: {
    replacement_like_for_like: 4.0,
    replacement_upgrade: 6.0,
    new_installation: 5.0,
  },

  testing: {
    full_eicr_per_circuit: 0.3,
    new_circuit_test: 0.5,
    pat_test_per_item: 0.05,
  },

  first_fix: {
    per_socket_point: 0.4,
    per_light_point: 0.25,
    per_switch: 0.2,
  },

  second_fix: {
    per_socket_point: 0.3,
    per_light_point: 0.2,
    per_switch: 0.15,
  },
};

// ============================================================================
// COMPLEXITY MULTIPLIERS
// ============================================================================

export const COMPLEXITY_FACTORS = {
  access: {
    easy: 1.0, // Surface mount, accessible
    standard: 1.2, // Some chasing/ducting
    difficult: 1.5, // Extensive chasing, loft work
    very_difficult: 2.0, // Listed building, restricted access
  },

  building_type: {
    new_build: 1.0,
    modern_house: 1.1,
    older_property: 1.3,
    listed_building: 1.8,
    commercial: 1.4,
    industrial: 1.6,
  },

  urgency: {
    standard: 1.0,
    priority: 1.2,
    emergency: 1.5,
  },
};

// ============================================================================
// PROFIT MARGINS (Industry standards)
// ============================================================================

export const PROFIT_MARGINS = {
  materials: 0.20, // 20% markup on materials
  labour: 0.15, // 15% profit on labour
  minimum_call_out: 75.00, // Minimum charge for any job
};

// ============================================================================
// PRICING CALCULATION ENGINE
// ============================================================================

export interface PricingInput {
  jobType: string;
  materials: Array<{
    category: keyof typeof MATERIAL_PRICES;
    item: string;
    quantity: number;
  }>;
  labourHours: number;
  region: keyof typeof MARKET_RATES_2025.regionalMultipliers;
  complexity: keyof typeof COMPLEXITY_FACTORS.access;
  buildingType: keyof typeof COMPLEXITY_FACTORS.building_type;
  urgency?: keyof typeof COMPLEXITY_FACTORS.urgency;
  businessType?: keyof typeof LABOUR_RATES.overheadMultipliers;
}

export interface PricingBreakdown {
  materials: {
    subtotal: number;
    items: Array<{
      name: string;
      quantity: number;
      unitPrice: number;
      total: number;
      supplier: string;
    }>;
  };
  labour: {
    hours: number;
    baseRate: number;
    regionalRate: number;
    complexityAdjusted: number;
    total: number;
  };
  markup: {
    materialsMarkup: number;
    labourMarkup: number;
    total: number;
  };
  subtotal: number;
  vat: number;
  total: number;
  breakdown: string;
}

export function calculateJobPrice(input: PricingInput): PricingBreakdown {
  // 1. Calculate materials cost
  let materialsSubtotal = 0;
  const materialItems: PricingBreakdown['materials']['items'] = [];

  input.materials.forEach((mat) => {
    const category = MATERIAL_PRICES[mat.category] as Record<string, { price: number; supplier: string }>;
    if (category && mat.item in category) {
      const item = category[mat.item];
      const total = item.price * mat.quantity;
      materialsSubtotal += total;
      
      materialItems.push({
        name: mat.item.replace(/_/g, ' '),
        quantity: mat.quantity,
        unitPrice: item.price,
        total: total,
        supplier: item.supplier,
      });
    }
  });

  // 2. Calculate labour cost
  const baseLabourRate = LABOUR_RATES.hourly.electrician;
  const regionalMultiplier = MARKET_RATES_2025.regionalMultipliers[input.region];
  const regionalRate = baseLabourRate * regionalMultiplier;
  
  const complexityMultiplier = COMPLEXITY_FACTORS.access[input.complexity];
  const buildingMultiplier = COMPLEXITY_FACTORS.building_type[input.buildingType];
  const urgencyMultiplier = input.urgency ? COMPLEXITY_FACTORS.urgency[input.urgency] : 1.0;
  
  const adjustedRate = regionalRate * complexityMultiplier * buildingMultiplier * urgencyMultiplier;
  const businessMultiplier = input.businessType 
    ? LABOUR_RATES.overheadMultipliers[input.businessType]
    : LABOUR_RATES.overheadMultipliers.small_company;
  
  const labourTotal = adjustedRate * input.labourHours * businessMultiplier;

  // 3. Apply markups
  const materialsMarkup = materialsSubtotal * PROFIT_MARGINS.materials;
  const labourMarkup = labourTotal * PROFIT_MARGINS.labour;
  const totalMarkup = materialsMarkup + labourMarkup;

  // 4. Calculate totals
  const subtotal = materialsSubtotal + labourTotal + totalMarkup;
  const finalSubtotal = Math.max(subtotal, PROFIT_MARGINS.minimum_call_out);
  const vat = finalSubtotal * 0.20;
  const total = finalSubtotal + vat;

  // 5. Generate breakdown text
  const breakdown = generateBreakdownText({
    materialsSubtotal,
    materialItems,
    labourHours: input.labourHours,
    baseRate: baseLabourRate,
    regionalRate,
    adjustedRate: adjustedRate * businessMultiplier,
    labourTotal,
    materialsMarkup,
    labourMarkup,
    subtotal: finalSubtotal,
    vat,
    total,
    region: input.region,
  });

  return {
    materials: {
      subtotal: materialsSubtotal,
      items: materialItems,
    },
    labour: {
      hours: input.labourHours,
      baseRate: baseLabourRate,
      regionalRate: regionalRate,
      complexityAdjusted: adjustedRate * businessMultiplier,
      total: labourTotal,
    },
    markup: {
      materialsMarkup,
      labourMarkup,
      total: totalMarkup,
    },
    subtotal: finalSubtotal,
    vat,
    total,
    breakdown,
  };
}

function generateBreakdownText(data: any): string {
  return `
**Materials Breakdown:**
${data.materialItems.map((item: any) => 
  `- ${item.name}: ${item.quantity}x £${item.unitPrice.toFixed(2)} = £${item.total.toFixed(2)} (${item.supplier})`
).join('\n')}
Materials subtotal: £${data.materialsSubtotal.toFixed(2)}

**Labour Breakdown:**
- Base rate: £${data.baseRate.toFixed(2)}/hr
- Regional rate (${data.region}): £${data.regionalRate.toFixed(2)}/hr
- With complexity/overheads: £${data.adjustedRate.toFixed(2)}/hr
- Hours: ${data.labourHours}
Labour total: £${data.labourTotal.toFixed(2)}

**Markup:**
- Materials markup (20%): £${data.materialsMarkup.toFixed(2)}
- Labour markup (15%): £${data.labourMarkup.toFixed(2)}

**Totals:**
- Subtotal: £${data.subtotal.toFixed(2)}
- VAT (20%): £${data.vat.toFixed(2)}
- **Total: £${data.total.toFixed(2)}**
`.trim();
}

// ============================================================================
// QUICK ESTIMATE HELPERS
// ============================================================================

export function estimateSocketCircuit(
  numSockets: number,
  region: keyof typeof MARKET_RATES_2025.regionalMultipliers,
  complexity: keyof typeof COMPLEXITY_FACTORS.access = 'standard'
): PricingBreakdown {
  const cableLength = numSockets * 5; // Estimate 5m per socket
  
  return calculateJobPrice({
    jobType: 'socket_circuit',
    materials: [
      { category: 'cable', item: '2.5mm_twin_earth', quantity: cableLength },
      { category: 'mcb', item: 'type_b_32a', quantity: 1 },
      { category: 'accessories', item: 'metal_clad_socket_double', quantity: numSockets },
      { category: 'sundries', item: 'metal_back_box_double', quantity: numSockets },
      { category: 'sundries', item: 'cable_clips_100pack', quantity: 1 },
    ],
    labourHours: INSTALLATION_TIMES.circuit_installation.socket_ring_per_outlet * numSockets + 1,
    region,
    complexity,
    buildingType: 'modern_house',
  });
}

export function estimateShowerInstall(
  showerKw: number,
  cableRun: number,
  region: keyof typeof MARKET_RATES_2025.regionalMultipliers,
  complexity: keyof typeof COMPLEXITY_FACTORS.access = 'standard'
): PricingBreakdown {
  const cableSize = showerKw >= 9.5 ? '10mm_twin_earth' : '6mm_twin_earth';
  const mcbSize = showerKw >= 9.5 ? 'type_b_40a' : 'type_b_32a';
  
  return calculateJobPrice({
    jobType: 'shower_circuit',
    materials: [
      { category: 'cable', item: cableSize, quantity: cableRun },
      { category: 'mcb', item: mcbSize, quantity: 1 },
      { category: 'accessories', item: 'cooker_switch_45a', quantity: 1 },
      { category: 'sundries', item: 'cable_clips_100pack', quantity: 1 },
    ],
    labourHours: INSTALLATION_TIMES.circuit_installation.shower_circuit,
    region,
    complexity,
    buildingType: 'modern_house',
  });
}

export function estimateConsumerUnitReplacement(
  numWays: number,
  region: keyof typeof MARKET_RATES_2025.regionalMultipliers,
  upgradeType: 'like_for_like' | 'upgrade' = 'upgrade'
): PricingBreakdown {
  const cuType = numWays <= 6 ? '6way_metal_dual_rcd' : 
                 numWays <= 10 ? '10way_metal_dual_rcd' : '12way_metal_dual_rcd';
  
  return calculateJobPrice({
    jobType: 'consumer_unit_replacement',
    materials: [
      { category: 'consumer_units', item: cuType, quantity: 1 },
      { category: 'sundries', item: 'earth_clamp', quantity: 2 },
    ],
    labourHours: upgradeType === 'like_for_like' 
      ? INSTALLATION_TIMES.consumer_unit.replacement_like_for_like
      : INSTALLATION_TIMES.consumer_unit.replacement_upgrade,
    region,
    complexity: 'standard',
    buildingType: 'modern_house',
  });
}
