
import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';

// Check test result values with ring circuit specific validation
export const checkTestValues = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  const isRing = isRingCircuit(result);

  // Enhanced insulation resistance check per BS 7671 Table 61
  if (result.insulationLiveNeutral) {
    const irString = result.insulationLiveNeutral.replace('>', '').trim();
    const ir = parseFloat(irString);
    
    if (!isNaN(ir)) {
      const description = result.circuitDescription?.toLowerCase() || '';
      const isSELV = description.includes('selv') || description.includes('pelv') || description.includes('12v') || description.includes('24v');
      const hasElectronics = description.includes('control') || description.includes('data') || description.includes('electronic') || description.includes('smart');
      
      // BS 7671 Table 61 minimum values
      let minRequired = 1.0; // Default for circuits ≤500V
      let regulationNote = '1.0MΩ minimum for circuits up to 500V AC/DC';
      
      if (isSELV) {
        minRequired = 0.25;
        regulationNote = '0.25MΩ minimum for SELV/PELV circuits (tested at 250V)';
      } else if (hasElectronics && ir >= 0.5) {
        // Special case: circuits with electronic equipment may accept 0.5MΩ if equipment isolated
        warnings.push({
          severity: 'info',
          title: 'Insulation Resistance for Electronic Equipment',
          description: `${result.insulationLiveNeutral}MΩ meets minimum for circuits with electronic equipment (0.5MΩ) but is below standard 1.0MΩ requirement.`,
          regulation: 'BS 7671 Regulation 612.3.2 & Table 61',
          suggestion: 'Verify sensitive electronic equipment was isolated during test. If not isolated, retest with equipment disconnected or accept lower value if manufacturer permits.'
        });
        // Don't add critical warning, just the info
      } else if (ir < minRequired) {
        warnings.push({
          severity: 'critical',
          title: 'Insulation Resistance Below Minimum',
          description: `${result.insulationLiveNeutral}MΩ is below BS 7671 Table 61 minimum of ${minRequired}MΩ (${regulationNote}).`,
          regulation: 'BS 7671 Regulation 612.3.2 & Table 61',
          suggestion: 'Investigate cause: moisture ingress, damaged insulation, or incorrect test voltage. Rectify before energising circuit.'
        });
      } else if (ir < 2.0 && !isSELV && !hasElectronics) {
        // Warning for borderline values (not critical but worth investigating)
        warnings.push({
          severity: 'warning',
          title: 'Low Insulation Resistance',
          description: `${result.insulationLiveNeutral}MΩ meets minimum but is relatively low. Good practice is ≥2MΩ for most circuits.`,
          regulation: 'BS 7671 Regulation 612.3.2',
          suggestion: 'Monitor insulation resistance over time. Values typically improve after initial energisation as moisture dissipates.'
        });
      }
    }
  }

  // Check polarity
  if (result.polarity === '✗') {
    warnings.push({
      severity: 'critical',
      title: 'Incorrect Polarity Detected',
      description: 'Incorrect polarity is a serious safety hazard.',
      regulation: 'BS 7671 Regulation 612.6',
      suggestion: 'Correct polarity before energising circuit. Check all connections.'
    });
  }

  // Ring circuit specific R1+R2 validation
  if (isRing && result.r1r2) {
    const r1r2Value = parseFloat(result.r1r2);
    if (!isNaN(r1r2Value)) {
      // For ring circuits, R1+R2 should be approximately quarter of the loop resistance
      if (r1r2Value > 1.67) {
        warnings.push({
          severity: 'warning',
          title: 'High R1+R2 for Ring Circuit',
          description: `R1+R2 of ${result.r1r2}Ω is high for a ring final circuit.`,
          regulation: 'BS 7671 Appendix 15',
          suggestion: 'Check ring continuity and verify all connections are secure.'
        });
      }
    }
  }

  return warnings;
};
