
import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';

// Check earthing and bonding requirements with ring circuit considerations
export const checkEarthingRequirements = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  // Check CPC size relative to live conductor with enhanced logic
  if (result.liveSize && result.cpcSize) {
    const liveSize = parseFloat(result.liveSize.replace('mm', ''));
    const cpcSizeStr = result.cpcSize.toLowerCase();
    const description = result.circuitDescription?.toLowerCase() || '';
    const wiringType = result.typeOfWiring?.toLowerCase() || '';
    
    // Special cases where CPC validation differs
    const isSWA = wiringType.includes('swa') || wiringType.includes('armoured') || description.includes('swa') || description.includes('armoured');
    const isConduit = wiringType.includes('conduit') || wiringType.includes('trunking') || description.includes('conduit') || description.includes('trunking');
    const isRing = description.includes('ring') || result.type?.toLowerCase().includes('ring');
    
    // SWA cables - armour provides CPC
    if (isSWA && (cpcSizeStr.includes('armour') || cpcSizeStr.includes('armor'))) {
      warnings.push({
        severity: 'info',
        title: 'SWA Armour as CPC',
        description: 'Cable armour is being used as CPC. Ensure armour continuity is maintained and properly terminated with glands.',
        regulation: 'BS 7671 Regulation 543.2.1',
        suggestion: 'Verify SWA glands are correctly fitted, armour is continuous, and earthing tags are securely connected.'
      });
      return warnings; // Skip standard CPC sizing check
    }
    
    // Conduit/trunking as CPC
    if (isConduit && (cpcSizeStr.includes('conduit') || cpcSizeStr.includes('trunking'))) {
      warnings.push({
        severity: 'info',
        title: 'Conduit/Trunking as CPC',
        description: 'Metal conduit/trunking is being used as CPC. Ensure electrical continuity is maintained throughout.',
        regulation: 'BS 7671 Regulation 543.2.6',
        suggestion: 'Verify all conduit joints are mechanically and electrically sound. Test continuity of conduit path.'
      });
      return warnings; // Skip standard CPC sizing check
    }
    
    const cpcSize = parseFloat(result.cpcSize.replace('mm', ''));

    if (!isNaN(liveSize) && !isNaN(cpcSize)) {
      // Standard twin and earth combinations - fully compliant
      const isStandardTwinAndEarth = (
        (liveSize === 1.0 && cpcSize === 1.0) ||
        (liveSize === 1.5 && cpcSize === 1.0) ||
        (liveSize === 2.5 && cpcSize === 1.5) ||
        (liveSize === 4.0 && cpcSize === 1.5) ||
        (liveSize === 6.0 && cpcSize === 2.5) ||
        (liveSize === 10.0 && cpcSize === 4.0) ||
        (liveSize === 16.0 && cpcSize === 6.0)
      );

      if (isStandardTwinAndEarth) {
        return warnings; // Compliant - no warnings
      }

      // Ring circuits - special CPC rules (Appendix 15)
      if (isRing) {
        // Ring circuit CPC can be same size as live conductors or calculated
        if (cpcSize >= liveSize) {
          return warnings; // Compliant for ring circuit
        }
        // For ring circuits with smaller CPC, apply (R1+R2)/4 rule
        warnings.push({
          severity: 'warning',
          title: 'Ring Circuit CPC Sizing',
          description: `CPC ${result.cpcSize} is smaller than live conductor ${result.liveSize} in ring circuit. Verify (R1+R2) ≤ 1.67Ω compliance.`,
          regulation: 'BS 7671 Appendix 15',
          suggestion: 'For ring circuits with reduced CPC, end-to-end resistance must meet requirements. Check (R1+R2) measurement is acceptable.'
        });
        return warnings;
      }

      // BS 7671 Table 54.7 - Minimum CPC sizes for single core cables
      let minCpcSize = 0;
      if (liveSize <= 16) {
        minCpcSize = liveSize;
      } else if (liveSize <= 35) {
        minCpcSize = 16;
      } else {
        minCpcSize = liveSize / 2;
      }

      if (cpcSize < minCpcSize) {
        warnings.push({
          severity: 'critical',
          title: 'CPC Undersized per Table 54.7',
          description: `${result.cpcSize} CPC is below Table 54.7 minimum of ${minCpcSize}mm² for ${result.liveSize} live conductor.`,
          regulation: 'BS 7671 Regulation 543.1.3 & Table 54.7',
          suggestion: `Minimum CPC: ${minCpcSize}mm² for single-core cables. Consider using standard twin and earth cable or increase CPC size. For very large conductors (>35mm²), adiabatic equation may permit smaller CPC.`
        });
      }
    }
  }

  return warnings;
};
