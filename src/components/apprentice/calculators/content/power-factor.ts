import type { CalculatorContent } from './types';

/**
 * Power factor — fundamental theory (no governing standard).
 */
export const powerFactorContent: CalculatorContent = {
  slug: 'power-factor',
  // Was 'none'. The arithmetic is not governed by BS 7671 and there is no
  // minimum power factor in the Regs — but this content now carries real BS 7671
  // citations for applying it (equipment selection, cable sizing, capacitors),
  // and `GoverningStandard` is explicit that a 'none' tool must not carry any.
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Power factor is the ratio of real power (kW, the useful work) to apparent power (kVA, what the supply actually carries) — cosφ = kW ÷ kVA.',
    'A poor power factor means more current flows for the same useful output, so cables and transformers run hotter and supplies are sized larger than the kW alone suggests.',
    'Many commercial tariffs charge for kVA (or penalise low power factor), so a poor figure costs money directly.',
    'Inductive loads (motors, fluorescent gear, transformers) drag the power factor down and make the current lag the voltage; correction (capacitors) brings it back up.',
    'A capacitive load does the opposite — the current leads the voltage, giving a leading power factor, which is what over-correction produces.',
  ],

  whenToCheck: [
    'Comparing a load’s kW rating with the kVA the supply must carry',
    'Diagnosing why measured current is higher than the kW implies',
    'Assessing whether power-factor correction would pay back',
    'Sizing supplies for inductive-heavy installations',
  ],

  commonMistakes: [
    'Treating kW and kVA as the same — they only match at unity power factor',
    'Forgetting that current scales with 1/pf for a given kW',
    'Confusing displacement power factor with true power factor where harmonics are present',
    'Ignoring kVA-based charges on commercial tariffs',
    'Over-correcting: adding capacitors past unity pushes the power factor leading, which brings voltage rise and resonance risk. A leading power factor is corrected by removing capacitance, never by adding more.',
  ],

  workedExample: {
    scenario: 'A load drawing 10 kW with a power factor of 0.8.',
    inputs: [
      { label: 'Real power (P)', value: '10 kW' },
      { label: 'Power factor', value: '0.8' },
    ],
    steps: [
      'S = P ÷ pf = 10 ÷ 0.8 = 12.5 kVA',
      'Reactive Q = √(S² − P²) = √(12.5² − 10²) = 7.5 kVAr',
      'At 0.8 pf the supply carries 12.5 kVA for 10 kW of useful power',
    ],
    result: 'S = 12.5 kVA, Q = 7.5 kVAr — 25% more apparent power than the real load.',
  },

  /*
    Moved here from the "BS 7671 Regs at a Glance" block that PowerFactorCalculator
    rendered itself. It was the only calculator carrying its own citation list, so
    this content sat outside the grounded layer that every other calculator uses
    and outside the citation checks that run against it.

    Citations were rewritten against BS 7671:2018+A4:2026. What was here before:
      512.1.2 "power factor and efficiency" — 512.1.2 is headed "Current";
        efficiency is not a BS 7671 equipment-selection criterion at all. The
        index entry for "Power factor" points at 331.1(l) and 512.1.4.
      525 "must account for active and reactive power" — 525 is headed "Voltage
        drop in consumers' installations" and says nothing about reactive power.
        The load-power-factor correction of mV/A/m is Appendix 4 Section 6.2, and
        Section 6 is explicitly optional ("where a more accurate assessment ...
        the following methods may be used") and approximate.
      523 "not reduced current from poor PF" — poor power factor RAISES the
        current for a given kW (I = P / (V cos φ)); it never reduces it.
      534 "capacitor banks" — Section 534 is headed "Devices for protection
        against overvoltage" (SPDs). The capacitor regulations are 416.2.5 and 559.7.

    BS 7671 does not govern the power-factor arithmetic itself and sets no
    minimum power factor. These are the regulations that touch on it.
  */
  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 331.1(l)',
      clauseText:
        'Power factor is one of the equipment characteristics that shall be assessed for harmful effects on other equipment or the supply. No numerical limit is set.',
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 512.1.2',
      clauseText:
        'Current: equipment shall be suitable for the design current, taking into account any capacitive and inductive effects.',
    },
    {
      standard: 'BS 7671',
      citation: 'Section 523',
      clauseText:
        'Current-carrying capacities of cables. Size on the actual design current: a poorer power factor means MORE current for the same kW, not less.',
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 4, Section 6.2',
      clauseText:
        'Voltage drop (Section 525) may optionally be refined for load power factor by multiplying the tabulated mV/A/m by cos φ for conductors up to 16 mm². It is an approximation, not a requirement.',
      tableRefs: ['Appendix 4'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 416.2.5',
      clauseText:
        'Where a capacitor that may retain a dangerous charge after switch-off sits behind a barrier or in an enclosure, a warning label shall be provided.',
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 559.7',
      clauseText:
        'Compensation capacitors (lighting installations): total capacitance over 0.5 µF shall only be used with discharge resistors, and capacitors and their marking shall be to BS EN 61048.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory. kW/kVA/kVAr relationships exact; no governing standard.',
  },
};
