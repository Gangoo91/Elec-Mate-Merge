/**
 * Industrial Protective Device Selection Logic
 * Determines appropriate protective device types for industrial installations
 * with high fault levels, high current circuits, and motor protection
 */

export interface DeviceSelectionCriteria {
  installationType: 'domestic' | 'commercial' | 'industrial';
  designCurrent: number;  // Ib or Id (A)
  pscc?: number;  // Prospective short-circuit current (kA)
  loadType: string;
  requiresRCD: boolean;
  phases: string;
}

export interface DeviceSelectionResult {
  recommendedType: 'MCB' | 'RCBO' | 'BS88' | 'MCCB';
  recommendedCurve?: 'B' | 'C' | 'D' | 'gG' | 'aM';
  recommendedKaRating: number;
  reasoning: string;
  alternativeOptions?: string[];
}

/**
 * Select appropriate protective device based on installation criteria
 */
export function selectProtectiveDevice(criteria: DeviceSelectionCriteria): DeviceSelectionResult {
  const { installationType, designCurrent, pscc, loadType, requiresRCD, phases } = criteria;
  
  // ===================================
  // INDUSTRIAL INSTALLATIONS
  // ===================================
  if (installationType === 'industrial') {
    // High fault level (PSCC > 16kA) → BS88 HRC fuses mandatory
    if (pscc && pscc > 16) {
      return {
        recommendedType: 'BS88',
        recommendedCurve: 'gG',
        recommendedKaRating: 80,
        reasoning: `BS88 HRC fuse selected for high fault level (PSCC ${pscc}kA > 16kA). Breaking capacity 80kA per Reg 434.5.2. Standard MCBs (6-10kA) insufficient.`,
        alternativeOptions: [
          'Consider MCCB with 50kA+ rating if operational flexibility needed',
          'Red-spot board with BS88 fuses is industrial standard'
        ]
      };
    }
    
    // Very high current (>400A) → MCCB required
    if (designCurrent > 400) {
      return {
        recommendedType: 'MCCB',
        recommendedKaRating: 50,
        reasoning: `MCCB selected for very high current circuit (Ib ${designCurrent}A > 400A). BS88 fuses available up to 1250A but MCCB offers adjustable trip settings.`,
        alternativeOptions: [
          'BS88 fuse up to 1250A if simple protection acceptable',
          'Electronic MCCB for motor protection with adjustable thermal/magnetic settings'
        ]
      };
    }
    
    // High current (125A-400A) → BS88 fuse or MCCB
    if (designCurrent > 125) {
      return {
        recommendedType: 'BS88',
        recommendedCurve: 'gG',
        recommendedKaRating: 80,
        reasoning: `BS88 HRC fuse selected for high current circuit (Ib ${designCurrent}A). Breaking capacity 80kA, suitable for industrial distribution.`,
        alternativeOptions: [
          'MCCB (25-50kA) if adjustable settings or metering required',
          'BS88 aM-type fuse for motor circuits with high inrush'
        ]
      };
    }
    
    // Motor circuits → Type D MCB or BS88 aM fuse
    if (loadType.toLowerCase().includes('motor')) {
      if (designCurrent > 63) {
        return {
          recommendedType: 'BS88',
          recommendedCurve: 'aM',
          recommendedKaRating: 80,
          reasoning: `BS88 aM-type fuse selected for industrial motor protection (Ib ${designCurrent}A). Tolerates motor starting inrush (typically 5-8× FLC).`,
          alternativeOptions: [
            'BS88 gG-type with appropriate rating for general motor protection',
            'MCCB with electronic trip for precise motor overload protection'
          ]
        };
      }
      
      return {
        recommendedType: requiresRCD ? 'RCBO' : 'MCB',
        recommendedCurve: 'D',
        recommendedKaRating: 25,
        reasoning: `Type D MCB selected for industrial motor circuit (Ib ${designCurrent}A). Curve D tolerates motor inrush (typically 10-20× In). Breaking capacity 25kA for industrial.`,
        alternativeOptions: [
          'Type C MCB acceptable for smaller motors',
          'BS88 aM fuse for very high inrush applications'
        ]
      };
    }
    
    // Standard industrial circuits (up to 125A) → MCB/RCBO with higher ka rating
    return {
      recommendedType: requiresRCD ? 'RCBO' : 'MCB',
      recommendedCurve: 'C',
      recommendedKaRating: 25,
      reasoning: `Type C ${requiresRCD ? 'RCBO' : 'MCB'} selected for industrial circuit (Ib ${designCurrent}A). Breaking capacity 25kA per industrial requirements (Reg 434.5.2).`,
      alternativeOptions: [
        'Type B for purely resistive loads',
        'BS88 fuse for critical distribution circuits'
      ]
    };
  }
  
  // ===================================
  // COMMERCIAL INSTALLATIONS
  // ===================================
  if (installationType === 'commercial') {
    // High fault level (PSCC > 10kA) → Consider BS88 or higher ka MCBs
    if (pscc && pscc > 10) {
      return {
        recommendedType: 'BS88',
        recommendedCurve: 'gG',
        recommendedKaRating: 80,
        reasoning: `BS88 HRC fuse selected for high fault level (PSCC ${pscc}kA > 10kA). Breaking capacity 80kA. Standard commercial MCBs (10kA) may be marginal.`,
        alternativeOptions: [
          'MCB with 16kA+ rating if appropriate size available',
          'MCCB for circuits >125A with adjustable settings'
        ]
      };
    }
    
    // High current commercial (>125A) → BS88 or MCCB
    if (designCurrent > 125) {
      return {
        recommendedType: 'BS88',
        recommendedCurve: 'gG',
        recommendedKaRating: 80,
        reasoning: `BS88 fuse selected for high current commercial circuit (Ib ${designCurrent}A > 125A). Cost-effective for distribution boards.`,
        alternativeOptions: [
          'MCCB if metering or adjustable protection required'
        ]
      };
    }
    
    // Standard commercial → MCB/RCBO with 16kA rating
    return {
      recommendedType: requiresRCD ? 'RCBO' : 'MCB',
      recommendedCurve: 'C',
      recommendedKaRating: 16,
      reasoning: `Type C ${requiresRCD ? 'RCBO' : 'MCB'} selected for commercial circuit (Ib ${designCurrent}A). Breaking capacity 16kA per commercial requirements (Reg 434.5.2).`,
      alternativeOptions: [
        'Type B for lighting/resistive loads',
        'Type D for small motor loads'
      ]
    };
  }
  
  // ===================================
  // DOMESTIC INSTALLATIONS
  // ===================================
  return {
    recommendedType: requiresRCD ? 'RCBO' : 'MCB',
    recommendedCurve: 'B',
    recommendedKaRating: 10,
    reasoning: `Type B ${requiresRCD ? 'RCBO' : 'MCB'} selected for domestic circuit (Ib ${designCurrent}A). Breaking capacity 10kA per domestic requirements (Reg 434.5.2).`,
    alternativeOptions: [
      'Type C for circuits with high inrush (e.g., kitchen appliances)',
      '6kA rating acceptable if PSCC assessment confirms <6kA'
    ]
  };
}

/**
 * Validate breaking capacity against PSCC
 */
export function validateBreakingCapacity(
  deviceKaRating: number,
  pscc: number
): { compliant: boolean; message: string } {
  if (deviceKaRating >= pscc) {
    return {
      compliant: true,
      message: `Breaking capacity (${deviceKaRating}kA) exceeds PSCC (${pscc}kA) - compliant per Reg 434.5.2`
    };
  }
  
  return {
    compliant: false,
    message: `CRITICAL: Breaking capacity (${deviceKaRating}kA) less than PSCC (${pscc}kA) - device cannot safely interrupt fault current (Reg 434.5.2)`
  };
}

/**
 * Get recommended ka rating based on installation type
 */
export function getRecommendedKaRating(installationType: string): number {
  switch (installationType) {
    case 'industrial':
      return 25;
    case 'commercial':
      return 16;
    case 'domestic':
    default:
      return 10;
  }
}
