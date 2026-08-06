import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';

// Check test result values with ring circuit specific validation
export const checkTestValues = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  const isRing = isRingCircuit(result);

  // Insulation resistance check per BS 7671 Table 64 (Reg 643.3.2).
  //
  // Table 64 acceptance values (A4:2026):
  //   SELV / PELV                     — 250 V DC test,  minimum 0.5 MΩ
  //   Circuits ≤ 500 V (not SELV/PELV) — 500 V DC test,  minimum 1.0 MΩ
  //   Circuits > 500 V                — 1000 V DC test, minimum 1.0 MΩ
  //
  // There is NO lower acceptance value for circuits containing electronic
  // equipment. Reg 643.3.3 only allows the test to be applied BEFORE such
  // equipment is connected (or the equipment to be disconnected) — it never
  // relaxes the Table 64 minimum.
  if (result.insulationLiveNeutral) {
    const irString = result.insulationLiveNeutral.replace('>', '').trim();
    const ir = parseFloat(irString);

    if (!isNaN(ir)) {
      const description = result.circuitDescription?.toLowerCase() || '';
      // The band comes from the recorded test voltage — 250 V DC is the
      // SELV/PELV test and the only one with a 0.5 MΩ minimum. Searching the
      // description for "selv" or "12v" was a guess at a fact the schedule
      // already holds, and it disagreed with `testValidation`, which applied
      // 1.0 MΩ to everything: the same 0.7 MΩ reading was compliant in one
      // engine and a failure in the other. Both now read the same field.
      const testVoltage = parseFloat(
        String(result.insulationTestVoltage ?? '').replace(/[^\d.]/g, '')
      );
      const isSELV = testVoltage === 250;
      const hasElectronics =
        description.includes('control') ||
        description.includes('data') ||
        description.includes('electronic') ||
        description.includes('smart');

      // BS 7671 Table 64 minimum values
      let minRequired = 1.0; // Default for circuits ≤500V
      let regulationNote = '1.0MΩ minimum for circuits up to 500V, tested at 500V DC';

      if (isSELV) {
        minRequired = 0.5;
        regulationNote = '0.5MΩ minimum for SELV/PELV circuits, tested at 250V DC';
      }

      if (ir < minRequired) {
        warnings.push({
          severity: 'critical',
          title: 'Insulation Resistance Below Minimum',
          description: `${result.insulationLiveNeutral}MΩ is below BS 7671 Table 64 minimum of ${minRequired}MΩ (${regulationNote}).`,
          regulation: 'BS 7671 Regulation 643.3.2 & Table 64',
          suggestion: hasElectronics
            ? 'Investigate cause: moisture ingress, damaged insulation, or incorrect test voltage. Where connected electronic equipment could influence the reading, disconnect it (or test before connection) per Reg 643.3.3 and retest — the Table 64 minimum still applies. Rectify before energising circuit.'
            : 'Investigate cause: moisture ingress, damaged insulation, or incorrect test voltage. Rectify before energising circuit.',
        });
      } else if (ir < 2.0 && !isSELV) {
        // Warning for borderline values (not critical but worth investigating)
        warnings.push({
          severity: 'warning',
          title: 'Low Insulation Resistance',
          description: `${result.insulationLiveNeutral}MΩ meets the Table 64 minimum but is relatively low. Industry guidance (not a BS 7671 requirement) is to investigate anything below 2MΩ.`,
          regulation: 'Guidance — BS 7671 minimum is Table 64 (Reg 643.3.2)',
          suggestion:
            'Monitor insulation resistance over time. Values typically improve after initial energisation as moisture dissipates.',
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
      regulation: 'BS 7671 Regulation 643.6',
      suggestion: 'Correct polarity before energising circuit. Check all connections.',
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
          regulation: 'Elec-Mate check — threshold is ours, not BS 7671 (continuity: Reg 643.2)',
          suggestion: 'Check ring continuity and verify all connections are secure.',
        });
      }
    }
  }

  return warnings;
};
