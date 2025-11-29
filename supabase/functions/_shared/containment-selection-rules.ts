/**
 * Advanced Containment Selection Rules for Commercial and Industrial Installations
 * Granular decision logic for trunking, tray, basket, conduit, ladder selection
 */

export interface ContainmentOption {
  type: string;
  material: 'steel' | 'aluminum' | 'PVC' | 'galvanised-steel' | 'plastic';
  applications: string[];
  bestFor: string;
  ipRating?: string;
  fireRating?: string;
  costRating: 'low' | 'medium' | 'high';
  notes?: string;
}

// ============================================================================
// COMMERCIAL CONTAINMENT OPTIONS
// ============================================================================

export const COMMERCIAL_CONTAINMENT: Record<string, ContainmentOption> = {
  'steel-trunking': {
    type: 'steel trunking',
    material: 'steel',
    applications: ['fire-rated routes', 'high-traffic corridors', 'escape routes', 'plant rooms'],
    bestFor: 'Fire-rated areas requiring robust protection',
    fireRating: 'Can contribute to fire compartmentation',
    ipRating: 'IP40 standard, IP54+ with gaskets',
    costRating: 'high',
    notes: 'Mandatory for fire escape routes and fire-rated compartments per BS EN 50085'
  },
  'pvc-trunking': {
    type: 'PVC trunking',
    material: 'PVC',
    applications: ['office areas', 'retail spaces', 'non-fire-rated routes', 'retrofit installations'],
    bestFor: 'Cost-effective office and retail installations',
    ipRating: 'IP40 standard',
    costRating: 'low',
    notes: 'Not suitable for fire escape routes. Easy to modify. Available in white for aesthetic installations.'
  },
  'dado-trunking': {
    type: 'dado trunking',
    material: 'PVC',
    applications: ['offices', 'meeting rooms', 'floor box distribution'],
    bestFor: 'Office fit-out with power and data distribution at desk height',
    ipRating: 'IP40',
    costRating: 'medium',
    notes: 'Separate compartments for power and data. Allows easy modification.'
  },
  'perforated-cable-tray': {
    type: 'perforated cable tray',
    material: 'steel',
    applications: ['ceiling voids', 'above suspended ceilings', 'plant rooms', 'distribution routes'],
    bestFor: 'High-capacity overhead routes with ventilation and easy access',
    ipRating: 'None (open system)',
    costRating: 'medium',
    notes: 'Excellent cooling for loaded cables. Easy to add/remove cables. Perforations aid fire suppression systems.'
  },
  'cable-basket': {
    type: 'cable basket',
    material: 'steel',
    applications: ['ceiling voids', 'data centres', 'areas requiring frequent modification'],
    bestFor: 'Flexible commercial installations with regular cable changes',
    ipRating: 'None (open system)',
    costRating: 'medium',
    notes: 'Lightweight, easy to modify, excellent cooling. Popular in commercial offices and data centres.'
  },
  'steel-conduit': {
    type: 'steel conduit',
    material: 'steel',
    applications: ['singles in fire-rated areas', 'concealed runs', 'visible commercial areas'],
    bestFor: 'Fire-rated and aesthetically sensitive commercial areas',
    ipRating: 'IP54 with appropriate fittings',
    costRating: 'high',
    notes: 'Provides excellent mechanical protection. Time-consuming to install. Difficult to modify.'
  },
  'pvc-conduit': {
    type: 'PVC conduit',
    material: 'PVC',
    applications: ['concealed runs in non-fire-rated areas', 'false ceiling voids'],
    bestFor: 'Cost-effective concealed runs in low-risk commercial areas',
    ipRating: 'IP54 with appropriate fittings',
    costRating: 'low',
    notes: 'Not suitable for fire escape routes. Easier to work than steel conduit.'
  }
};

// ============================================================================
// INDUSTRIAL CONTAINMENT OPTIONS
// ============================================================================

export const INDUSTRIAL_CONTAINMENT: Record<string, ContainmentOption> = {
  'cable-ladder': {
    type: 'cable ladder',
    material: 'galvanised-steel',
    applications: ['heavy cable runs (50mm²+)', 'long distribution routes', 'cable basements', 'outdoor gantries'],
    bestFor: 'Heavy-duty industrial installations with large grouped cables',
    ipRating: 'None (open system)',
    costRating: 'high',
    notes: 'Designed for very heavy loads. Excellent cooling. Easy access for maintenance. Suitable for outdoor use when galvanised.'
  },
  'heavy-duty-tray': {
    type: 'heavy-duty perforated tray',
    material: 'galvanised-steel',
    applications: ['motor circuits', 'grouped SWA cables', 'harsh environments', 'outdoor installations'],
    bestFor: 'Robust industrial installations with multiple SWA cables',
    ipRating: 'None (open system)',
    costRating: 'high',
    notes: 'Thicker gauge than commercial tray (1.5mm-2.5mm). Hot-dip galvanised for corrosion resistance.'
  },
  'galvanised-conduit': {
    type: 'galvanised steel conduit',
    material: 'galvanised-steel',
    applications: ['singles in harsh environments', 'corrosive areas', 'outdoor machinery', 'chemical plants'],
    bestFor: 'Harsh industrial environments requiring corrosion protection',
    ipRating: 'IP65+ with appropriate fittings',
    costRating: 'high',
    notes: 'Hot-dip galvanised for maximum corrosion resistance. Use explosion-proof fittings in hazardous areas (ATEX).'
  },
  'cable-tray-outdoor': {
    type: 'outdoor cable tray',
    material: 'galvanised-steel',
    applications: ['outdoor industrial routes', 'between buildings', 'cable bridges'],
    bestFor: 'Weather-resistant outdoor cable routing',
    ipRating: 'None (open system, weather-resistant)',
    costRating: 'high',
    notes: 'Hot-dip galvanised. Use cover for extreme weather protection. Designed to drain water.'
  },
  'cable-cleats-swa': {
    type: 'clipped direct with SWA cleats',
    material: 'steel',
    applications: ['individual SWA runs', 'short distances', 'machinery connections'],
    bestFor: 'Simple point-to-point SWA installations',
    ipRating: 'N/A (cable provides protection)',
    costRating: 'low',
    notes: 'Use LSF (Low Smoke & Fume) cleats in fire-rated areas. Spacing per cable weight and route.'
  },
  'flexible-conduit': {
    type: 'flexible metal conduit',
    material: 'galvanised-steel',
    applications: ['machinery connections', 'vibration areas', 'motor terminations'],
    bestFor: 'Industrial machinery with vibration or movement',
    ipRating: 'IP54+ with liquid-tight fittings',
    costRating: 'medium',
    notes: 'Use liquid-tight flexible conduit for wet areas. Must be properly bonded for earth continuity.'
  },
  'cable-basket-industrial': {
    type: 'industrial cable basket',
    material: 'galvanised-steel',
    applications: ['overhead routes', 'mezzanine areas', 'easy-access maintenance routes'],
    bestFor: 'Industrial areas requiring frequent cable modifications',
    ipRating: 'None (open system)',
    costRating: 'medium',
    notes: 'Heavier gauge than commercial basket. Suitable for SWA and singles. Good cooling properties.'
  }
};

// ============================================================================
// DATA CABLE CONTAINMENT OPTIONS
// ============================================================================

export const DATA_CONTAINMENT: Record<string, ContainmentOption> = {
  'cable-basket-data': {
    type: 'cable basket (data-specific)',
    material: 'steel',
    applications: ['data centres', 'comms rooms', 'above suspended ceilings'],
    bestFor: 'High-density structured cabling with frequent changes',
    ipRating: 'None (open system)',
    costRating: 'medium',
    notes: 'MUST be segregated 300mm from power cables. Excellent for Cat6/Cat6a/fibre. TIA-942 compliant.'
  },
  'plastic-trunking-data': {
    type: 'plastic trunking (data)',
    material: 'plastic',
    applications: ['office areas', 'surface-mounted data routes', 'retail spaces'],
    bestFor: 'Aesthetic surface-mounted data cable routes',
    ipRating: 'IP40',
    costRating: 'low',
    notes: 'Separate from power trunking. White finish for office environments. Easy to modify.'
  },
  'raised-floor': {
    type: 'raised floor containment',
    material: 'steel',
    applications: ['data centres', 'control rooms', 'trading floors'],
    bestFor: 'High-density data centres with underfloor cooling',
    ipRating: 'N/A',
    costRating: 'high',
    notes: 'Allows segregation from overhead power. Facilitates airflow for cooling. TIA-942 recommended for data centres.'
  },
  'overhead-cable-tray-data': {
    type: 'overhead cable tray (data)',
    material: 'steel',
    applications: ['data centres', 'comms rooms', 'IT equipment areas'],
    bestFor: 'Overhead structured cabling separated from power',
    ipRating: 'None (open system)',
    costRating: 'medium',
    notes: 'Install on opposite side of room from power tray or maintain 300mm separation. Perforated for cooling.'
  }
};

// ============================================================================
// CONTAINMENT SELECTION FUNCTIONS
// ============================================================================

/**
 * Select optimal containment for commercial installations
 */
export function selectCommercialContainment(
  circuitContext: {
    loadType: string;
    cableType: string;
    location: string;
    fireRated: boolean;
    dataCable: boolean;
  }
): { containment: string; reason: string; material: string } {
  const { loadType, cableType, location, fireRated, dataCable } = circuitContext;

  // Data cables get specific containment
  if (dataCable || loadType.toLowerCase().includes('data')) {
    if (location.includes('data centre') || location.includes('comms room')) {
      return {
        containment: 'cable basket (data-specific) with 300mm power segregation',
        reason: 'Data centre structured cabling per TIA-942',
        material: 'steel'
      };
    }
    return {
      containment: 'plastic trunking (separate from power) or cable basket',
      reason: 'Data cables require segregation from power per BS EN 50174',
      material: 'plastic'
    };
  }

  // Fire-rated areas
  if (fireRated || location.includes('escape route') || location.includes('fire compartment')) {
    return {
      containment: 'steel trunking',
      reason: 'Fire-rated containment required for escape routes',
      material: 'steel'
    };
  }

  // LSZH singles need enclosure
  if (cableType.includes('LSZH single')) {
    if (location.includes('ceiling void') || location.includes('suspended ceiling')) {
      return {
        containment: 'perforated cable tray',
        reason: 'Overhead distribution with excellent cooling and access',
        material: 'steel'
      };
    }
    if (location.includes('office')) {
      return {
        containment: 'PVC trunking (office areas) or steel trunking (high-traffic)',
        reason: 'Cost-effective office distribution',
        material: 'PVC'
      };
    }
    return {
      containment: 'steel trunking',
      reason: 'Standard commercial containment for LSZH singles',
      material: 'steel'
    };
  }

  // SWA doesn't need containment
  if (cableType.includes('SWA')) {
    return {
      containment: 'clipped direct or on cable tray',
      reason: 'SWA provides own mechanical protection',
      material: 'N/A'
    };
  }

  // Default commercial
  return {
    containment: 'perforated cable tray or cable basket',
    reason: 'Flexible commercial containment for easy modifications',
    material: 'steel'
  };
}

/**
 * Select optimal containment for industrial installations
 */
export function selectIndustrialContainment(
  circuitContext: {
    loadType: string;
    cableType: string;
    cableSize: number;
    location: string;
    outdoor: boolean;
    corrosive: boolean;
    vibration: boolean;
  }
): { containment: string; reason: string; material: string } {
  const { loadType, cableType, cableSize, location, outdoor, corrosive, vibration } = circuitContext;

  // Machinery with vibration
  if (vibration || loadType.toLowerCase().includes('machinery') || loadType.toLowerCase().includes('motor')) {
    if (cableType.includes('Flexible')) {
      return {
        containment: 'liquid-tight flexible conduit',
        reason: 'Flexible containment for moving machinery',
        material: 'galvanised-steel'
      };
    }
  }

  // Corrosive environments
  if (corrosive || location.includes('chemical') || location.includes('corrosive')) {
    if (cableType.includes('single')) {
      return {
        containment: 'galvanised steel conduit with IP65+ fittings',
        reason: 'Corrosion protection for harsh industrial environments',
        material: 'galvanised-steel'
      };
    }
    return {
      containment: 'hot-dip galvanised heavy-duty tray',
      reason: 'Corrosion-resistant containment for grouped cables',
      material: 'galvanised-steel'
    };
  }

  // Large cables (50mm²+) need heavy-duty support
  if (cableSize >= 50) {
    return {
      containment: 'cable ladder',
      reason: 'Heavy-duty support for large cables (50mm²+)',
      material: 'galvanised-steel'
    };
  }

  // Outdoor industrial
  if (outdoor) {
    if (cableType.includes('SWA')) {
      return {
        containment: 'clipped direct or outdoor cable tray (galvanised)',
        reason: 'Weather-resistant outdoor installation',
        material: 'galvanised-steel'
      };
    }
    return {
      containment: 'galvanised steel conduit (weatherproof)',
      reason: 'Protected outdoor installation',
      material: 'galvanised-steel'
    };
  }

  // SWA standard
  if (cableType.includes('SWA')) {
    if (cableSize >= 25) {
      return {
        containment: 'heavy-duty perforated tray or cable ladder',
        reason: 'Heavy-duty support for grouped SWA cables',
        material: 'galvanised-steel'
      };
    }
    return {
      containment: 'clipped direct with SWA cleats',
      reason: 'Simple SWA installation with mechanical support',
      material: 'steel'
    };
  }

  // LSZH singles in industrial
  if (cableType.includes('LSZH single')) {
    return {
      containment: 'heavy-duty steel conduit or cable tray',
      reason: 'Industrial containment for singles per BS 7671 Reg 521.5.1',
      material: 'galvanised-steel'
    };
  }

  // Default industrial
  return {
    containment: 'heavy-duty perforated tray or cable basket',
    reason: 'Standard industrial containment for robust support',
    material: 'galvanised-steel'
  };
}
