/**
 * UK Electrical Materials Pricing - 2025
 * Trade prices from CEF/TLC/Rexel (January 2025)
 * Prices exclude VAT
 */

export const UK_MATERIALS_PRICING_2025 = {
  cables: {
    '1.5mm_te': {
      perMetre: 0.8,
      per100m: 80,
      supplier: 'CEF/TLC',
      description: '1.5mm² Twin & Earth',
    },
    '2.5mm_te': {
      perMetre: 0.98,
      per100m: 98,
      supplier: 'CEF/TLC',
      description: '2.5mm² Twin & Earth',
    },
    '4mm_te': {
      perMetre: 1.45,
      per100m: 145,
      supplier: 'CEF/TLC',
      description: '4mm² Twin & Earth',
    },
    '6mm_te': {
      perMetre: 2.2,
      per100m: 220,
      supplier: 'CEF/TLC',
      description: '6mm² Twin & Earth',
    },
    '10mm_te': {
      perMetre: 3.9,
      per100m: 390,
      supplier: 'CEF/TLC',
      description: '10mm² Twin & Earth',
    },
    '16mm_te': {
      perMetre: 6.5,
      per100m: 650,
      supplier: 'CEF/TLC',
      description: '16mm² Twin & Earth',
    },
    '2.5mm_swa': {
      perMetre: 3.5,
      per50m: 175,
      supplier: 'CEF/TLC',
      description: '2.5mm² 3-core SWA',
    },
    '4mm_swa': { perMetre: 4.8, per50m: 240, supplier: 'CEF/TLC', description: '4mm² 3-core SWA' },
    '6mm_swa': { perMetre: 6.2, per50m: 310, supplier: 'CEF/TLC', description: '6mm² 3-core SWA' },
    '10mm_swa': {
      perMetre: 9.5,
      per50m: 475,
      supplier: 'CEF/TLC',
      description: '10mm² 3-core SWA',
    },
  },

  consumerUnits: {
    '8way_rcbo': {
      min: 150,
      typical: 165,
      max: 180,
      brand: 'Hager/Schneider',
      description: '8-way RCBO consumer unit',
    },
    '10way_rcbo': {
      min: 180,
      typical: 200,
      max: 220,
      brand: 'Hager/Schneider',
      description: '10-way RCBO consumer unit',
    },
    '12way_rcbo': {
      min: 220,
      typical: 250,
      max: 280,
      brand: 'Hager/Schneider',
      description: '12-way RCBO consumer unit',
    },
    '16way_rcbo': {
      min: 280,
      typical: 320,
      max: 350,
      brand: 'Hager/Schneider',
      description: '16-way RCBO consumer unit',
    },
    '18way_rcbo': {
      min: 320,
      typical: 360,
      max: 400,
      brand: 'Hager/Schneider',
      description: '18-way RCBO consumer unit',
    },
  },

  accessories: {
    double_socket: { min: 2.5, typical: 3.2, max: 8.5, range: 'budget to premium' },
    single_socket: { min: 2.0, typical: 2.8, max: 7.0, range: 'budget to premium' },
    light_switch_2gang: { min: 2.8, typical: 4.5, max: 12.0 },
    light_switch_1gang: { min: 2.2, typical: 3.5, max: 9.0 },
    rcbo_40a: { min: 25, typical: 28.5, max: 35, brand: 'Hager/Schneider' },
    rcbo_32a: { min: 24, typical: 27.5, max: 33, brand: 'Hager/Schneider' },
    swa_gland_20mm: { typical: 10.0, brand: 'CW/MK' },
    swa_gland_25mm: { typical: 12.5, brand: 'CW/MK' },
  },

  solar: {
    // H07RN-F Rubber Flex (3-Core) — per metre, ex VAT
    // Sources: CEF (confirmed 2.5mm @ £3.07), Essential Supplies, YESSS Electrical
    h07rnf: {
      '1.0mm_3c': {
        perMetre: 1.55,
        supplier: 'CEF/TLC',
        description: 'H07RN-F 1.0mm² 3-core rubber flex',
      },
      '1.5mm_3c': {
        perMetre: 1.85,
        supplier: 'CEF/TLC',
        description: 'H07RN-F 1.5mm² 3-core rubber flex',
      },
      '2.5mm_3c': {
        perMetre: 3.07,
        supplier: 'CEF',
        description: 'H07RN-F 2.5mm² 3-core rubber flex',
      },
      '4.0mm_3c': {
        perMetre: 4.5,
        supplier: 'CEF/TLC',
        description: 'H07RN-F 4.0mm² 3-core rubber flex',
      },
      '6.0mm_3c': {
        perMetre: 5.85,
        supplier: 'CEF/TLC',
        description: 'H07RN-F 6.0mm² 3-core rubber flex',
      },
      '10.0mm_3c': {
        perMetre: 9.5,
        supplier: 'CEF/TLC',
        description: 'H07RN-F 10.0mm² 3-core rubber flex',
      },
    },

    // Solar DC Cable (H1Z2Z2-K) — per metre, ex VAT
    // Sources: CEF (100m drums), Superlec Direct, TradeSparky
    dcCable: {
      '4mm_single': {
        perMetre: 0.79,
        supplier: 'CEF',
        description: '4mm² H1Z2Z2-K solar DC cable (UV rated)',
      },
      '6mm_single': {
        perMetre: 1.18,
        supplier: 'CEF',
        description: '6mm² H1Z2Z2-K solar DC cable (most common domestic PV)',
      },
      '10mm_single': {
        perMetre: 1.85,
        supplier: 'CEF/Superlec',
        description: '10mm² H1Z2Z2-K solar DC cable (longer runs / commercial)',
      },
    },

    // MC4 Connectors & Solar Accessories — ex VAT
    // Sources: TLC Direct, Sunstore, 12 Volt Planet, Plug In Solar
    mc4: {
      connector_pair: { price: 1.25, description: 'MC4 connector pair (male + female)' },
      y_branch_pair: { price: 5.0, description: 'MC4 Y-branch connector pair' },
      crimping_tool: { price: 28.0, description: 'MC4 crimping tool (ratchet)' },
      inline_fuse_holder: { price: 7.5, description: 'MC4 inline fuse holder (15A/20A)' },
      warning_labels_set: { price: 5.0, description: 'Solar PV warning labels set (BS 7671)' },
      dc_cable_clips_100: { price: 9.15, description: 'DC cable clips UV (pack of 100)' },
    },

    // Isolators — ex VAT
    // Sources: TLC Direct (Contactum), CEF (MCG/Projoy), Bimble Solar
    isolators: {
      dc_32a_1000v: { price: 28.0, description: 'DC isolator 32A 1000V (rotary, IP66)' },
      dc_32a_1500v: { price: 32.0, description: 'DC isolator 32A 1500V (rotary, IP66)' },
      ac_40a_3phase: { price: 22.0, description: 'AC isolator 40A (3-phase, IMO Stag)' },
      ac_20a_1phase: { price: 18.0, description: 'AC isolator 20A (single-phase)' },
      firemans_switch_dc: {
        price: 125.0,
        description: "Fireman's switch DC (motorised disconnect, Eaton SOL30)",
      },
    },

    // Mounting Hardware — ex VAT
    // Sources: City Plumbing (Fastensol), Renew Store, Plug In Solar
    mounting: {
      roof_hook_tile: { price: 4.0, description: 'Roof hook (tile, Fastensol) — each' },
      roof_hook_slate: { price: 4.8, description: 'Roof hook (slate, Fastensol) — each' },
      rail_2100mm: { price: 10.0, description: 'Mounting rail 2.1m (aluminium)' },
      rail_4200mm: { price: 17.0, description: 'Mounting rail 4.2m (aluminium)' },
      mid_clamp: { price: 1.5, description: 'Mid clamp (adjustable)' },
      end_clamp: { price: 1.8, description: 'End clamp (adjustable)' },
      rail_splice: { price: 1.8, description: 'Rail splice/joiner' },
      flashing_kit_tile: { price: 4.2, description: 'Flashing kit (tile, SolarFlash)' },
      flashing_kit_slate: { price: 4.5, description: 'Flashing kit (slate)' },
    },

    // SPDs & Protection — ex VAT
    // Sources: Electrical4Less, CEF, Toolstation, Screwfix, JSG Solutions
    protection: {
      dc_spd_type2: { price: 95.0, description: 'DC SPD Type 2 (1000V)' },
      dc_spd_type1_2: { price: 180.0, description: 'DC SPD Type 1+2 (1000V)' },
      ac_spd_type2: { price: 18.0, description: 'AC SPD Type 2 (BG Fortress/Axiom)' },
      dc_fuse_15a: { price: 3.5, description: 'DC fuse 15A gPV (10x38mm, 1000V)' },
      dc_fuse_holder: { price: 3.5, description: 'DC fuse holder (10x38mm, 1000V)' },
      generation_meter: { price: 35.0, description: 'Generation meter MID (Eastron SDM120)' },
    },

    // Earthing & Bonding (Solar-specific) — ex VAT
    // Sources: Click4Electrics, Stevenson Plumbing, Electrical4Less
    earthing: {
      earth_6mm_per_m: { perMetre: 1.2, description: '6mm² green/yellow earth cable (6491X)' },
      earth_10mm_per_m: { perMetre: 1.7, description: '10mm² green/yellow earth cable (6491X)' },
      frame_earthing_lug: { price: 1.5, description: 'Frame earthing lug (stainless)' },
      earthing_busbar_6way: { price: 12.0, description: 'Earthing busbar (6-way, DIN rail)' },
      bonding_conductor_4mm_per_m: {
        perMetre: 0.7,
        description: 'Equipotential bonding conductor 4mm² (6491X)',
      },
    },
  },
};

export type CableSizeKey = keyof typeof UK_MATERIALS_PRICING_2025.cables;
export type ConsumerUnitKey = keyof typeof UK_MATERIALS_PRICING_2025.consumerUnits;
export type AccessoryKey = keyof typeof UK_MATERIALS_PRICING_2025.accessories;
export type SolarSection = keyof typeof UK_MATERIALS_PRICING_2025.solar;
