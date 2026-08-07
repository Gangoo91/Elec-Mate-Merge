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
  /*
   * Both insulation readings, not just line-to-neutral.
   *
   * 643.3.1 requires the measurement between (a) live conductors AND (b) live
   * conductors and the protective conductor. Only (a) was being judged — the
   * line-to-earth reading, which is the one that speaks to fault protection,
   * was recorded and never looked at. The check even listed
   * `insulationLiveEarth` in its `fields`, so the grid marked a cell the rule
   * had never read.
   *
   * Table 64 minimums are the same for both: 1.0 MΩ at 500 V DC, or 0.5 MΩ at
   * 250 V DC for SELV/PELV.
   */
  const IR_READINGS: { field: 'insulationLiveNeutral' | 'insulationLiveEarth'; label: string }[] = [
    { field: 'insulationLiveNeutral', label: 'Line–neutral' },
    { field: 'insulationLiveEarth', label: 'Line–earth' },
  ];

  for (const { field, label } of IR_READINGS) {
    const raw = result[field];
    if (!raw) continue;
    const ir = parseFloat(String(raw).replace('>', '').trim());
    if (isNaN(ir)) continue;

    const description = result.circuitDescription?.toLowerCase() || '';
    // The band comes from the recorded test voltage — 250 V DC is the SELV/PELV
    // test and the only one with a 0.5 MΩ minimum. Reading the description for
    // "selv" was a guess at a fact the schedule already holds.
    const testVoltage = parseFloat(String(result.insulationTestVoltage ?? '').replace(/[^\d.]/g, ''));
    const isSELV = testVoltage === 250;
    const hasElectronics = ['control', 'data', 'electronic', 'smart'].some((k) =>
      description.includes(k)
    );

    const minRequired = isSELV ? 0.5 : 1.0;
    const regulationNote = isSELV
      ? '0.5MΩ minimum for SELV/PELV circuits, tested at 250V DC'
      : '1.0MΩ minimum for circuits up to 500V, tested at 500V DC';

    if (ir < minRequired) {
      warnings.push({
        severity: 'critical',
        title: `${label} Insulation Below Minimum`,
        fields: [field],
        description: `${label} insulation of ${raw}MΩ is below the BS 7671 Table 64 minimum of ${minRequired}MΩ (${regulationNote}).`,
        regulation: 'BS 7671 Regulation 643.3.2 & Table 64',
        suggestion: hasElectronics
          ? 'Investigate: moisture ingress, damaged insulation, or the wrong test voltage. Where connected electronic equipment could influence the reading, disconnect it (or test before connection) per Reg 643.3.3 and retest — the Table 64 minimum still applies.'
          : 'Investigate: moisture ingress, damaged insulation, or the wrong test voltage. Rectify before energising the circuit.',
      });
    } else if (ir < 2.0 && !isSELV) {
      warnings.push({
        severity: 'warning',
        title: `${label} Insulation Low`,
        fields: [field],
        description: `${label} insulation of ${raw}MΩ meets the Table 64 minimum but is relatively low. Industry guidance — not a BS 7671 requirement — is to investigate anything below 2MΩ.`,
        regulation: 'Guidance — the BS 7671 minimum is Table 64 (Reg 643.3.2)',
        suggestion:
          'Monitor over time. Readings often improve after initial energisation as moisture dissipates.',
      });
    }
  }

  // Check polarity
  if (result.polarity === '✗') {
    warnings.push({
      severity: 'critical',
      title: 'Incorrect Polarity Detected',
      fields: ['polarity'],
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
          fields: ['r1r2'],
          description: `R1+R2 of ${result.r1r2}Ω is high for a ring final circuit.`,
          regulation: 'Elec-Mate check — threshold is ours, not BS 7671 (continuity: Reg 643.2)',
          suggestion: 'Check ring continuity and verify all connections are secure.',
        });
      }
    }
  }

  return warnings;
};
