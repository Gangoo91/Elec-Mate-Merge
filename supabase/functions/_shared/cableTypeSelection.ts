// Intelligent Cable Type Selection Logic
// Determines the most appropriate cable type based on installation context

import { CableType } from './bs7671-data/cableCapacities.ts';

export interface CableSelectionContext {
  loadType: string;
  location?: 'inside' | 'outside' | 'underground' | 'loft' | 'plant-room' | 'data-center';
  cableRun?: string;
  mechanicalProtection?: boolean;
  fireProtection?: 'none' | 'fire-alarm' | 'escape-route' | 'fire-compartment';
  ambientTemp?: number;
}

export interface CableSelection {
  cableType: CableType;
  reason: string;
  alternatives?: CableType[];
}

export const selectOptimalCableType = (context: CableSelectionContext): CableSelection => {
  const { loadType, location, cableRun, mechanicalProtection, fireProtection, ambientTemp } = context;

  // Priority 1: Fire protection requirements (fire alarms and emergency lighting only)
  if (fireProtection === 'fire-alarm') {
    // Check if it's actually a fire circuit, not just any circuit with fire protection setting
    const isActualFireCircuit = loadType.toLowerCase().includes('fire') || 
                                (loadType.toLowerCase().includes('emergency') && loadType.toLowerCase().includes('light'));
    
    if (isActualFireCircuit) {
      return {
        cableType: 'pvc-single', // FP200 equivalent in our system
        reason: 'BS 5839 requires fire-resistant cable for fire alarm and emergency lighting circuits',
        alternatives: ['xlpe-single']
      };
    }
    // If fireProtection is set but load isn't actually fire-related, fall through to other logic
  }

  if (fireProtection === 'escape-route' || fireProtection === 'fire-compartment') {
    return {
      cableType: 'xlpe-single', // Better fire performance
      reason: 'Fire-rated cable required for circuits in escape routes and fire compartments',
      alternatives: ['pvc-single']
    };
  }

  // Priority 2: Underground/outdoor installations
  if (location === 'underground') {
    return {
      cableType: 'swa',
      reason: 'SWA armoured cable required for underground burial (mechanical protection and moisture resistance)',
      alternatives: []
    };
  }

  if (location === 'outside') {
    return {
      cableType: 'swa',
      reason: 'SWA armoured cable required for outdoor installation (UV and weather protection)',
      alternatives: ['xlpe-twin-earth']
    };
  }

  // Priority 3: High temperature environments
  if (ambientTemp && ambientTemp > 40) {
    return {
      cableType: 'xlpe-twin-earth',
      reason: `XLPE insulation rated to 90°C suitable for ${ambientTemp}°C ambient temperature`,
      alternatives: ['xlpe-single']
    };
  }

  if (location === 'plant-room') {
    return {
      cableType: 'xlpe-single',
      reason: 'XLPE cable recommended for plant rooms with elevated temperatures',
      alternatives: ['xlpe-twin-earth']
    };
  }

  // Priority 4: Low smoke environments
  if (location === 'data-center') {
    return {
      cableType: 'xlpe-single', // LSF/LSOH equivalent
      reason: 'Low smoke cables required for data centers and enclosed IT spaces',
      alternatives: []
    };
  }

  // Priority 5: Mechanical protection requirements
  if (mechanicalProtection && !cableRun?.includes('conduit') && !cableRun?.includes('trunking')) {
    return {
      cableType: 'swa',
      reason: 'SWA armoured cable provides mechanical protection without additional conduit',
      alternatives: ['pvc-twin-earth']
    };
  }

  // Priority 6: Installation method suitability
  if (cableRun?.includes('conduit') || cableRun?.includes('trunking')) {
    return {
      cableType: 'pvc-single',
      reason: 'Single core cables are most suitable for conduit and trunking installations',
      alternatives: ['xlpe-single']
    };
  }

  if (cableRun?.includes('tray') || cableRun?.includes('ladder') || cableRun?.includes('basket')) {
    return {
      cableType: 'swa',
      reason: 'SWA cables recommended for cable tray installations (better support and protection)',
      alternatives: ['xlpe-twin-earth', 'pvc-twin-earth']
    };
  }

  // Priority 7: Loft installations
  if (location === 'loft') {
    if (cableRun?.includes('insulation')) {
      return {
        cableType: 'xlpe-twin-earth',
        reason: 'XLPE cable recommended when cable may contact thermal insulation (better heat dissipation)',
        alternatives: ['pvc-twin-earth']
      };
    }
    return {
      cableType: 'pvc-twin-earth',
      reason: 'Standard T&E suitable for loft installations clear of insulation',
      alternatives: ['xlpe-twin-earth']
    };
  }

  // Default: Standard domestic protected routes
  if (location === 'inside' || !location) {
    if (cableRun === 'clipped-direct' || !cableRun) {
      return {
        cableType: 'pvc-twin-earth',
        reason: 'Cost-effective PVC Twin & Earth suitable for protected internal routes',
        alternatives: ['xlpe-twin-earth']
      };
    }
  }

  // Fallback
  return {
    cableType: 'pvc-twin-earth',
    reason: 'Standard cable type for general domestic installations',
    alternatives: ['xlpe-twin-earth']
  };
};

// Load type specific cable requirements
export const getLoadTypeRequirements = (loadType: string): Partial<CableSelectionContext> => {
  const lower = loadType.toLowerCase();
  
  if (lower.includes('fire') && lower.includes('alarm')) {
    return { fireProtection: 'fire-alarm' };
  }
  
  // Emergency lighting requires fire-rated cable (FP200 Gold)
  if (lower.includes('emergency') && lower.includes('light')) {
    return { fireProtection: 'fire-alarm' }; // Use fire-alarm to trigger FP200
  }
  
  // Outdoor socket detection - requires SWA and minimum 2.5mm²
  if (lower.includes('outdoor') && lower.includes('socket')) {
    return { location: 'outside', mechanicalProtection: true };
  }
  
  if (lower.includes('outdoor') || lower.includes('garden') || lower.includes('outside')) {
    return { location: 'outside' };
  }
  
  if (lower.includes('ev') || lower.includes('charger')) {
    return { location: 'outside', mechanicalProtection: true };
  }
  
  if (lower.includes('heat') && lower.includes('pump')) {
    return { location: 'outside', mechanicalProtection: true };
  }
  
  if (lower.includes('underground')) {
    return { location: 'underground' };
  }
  
  return {};
};
