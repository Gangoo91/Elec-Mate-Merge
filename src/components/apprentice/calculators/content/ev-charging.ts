import type { CalculatorContent } from './types';

/**
 * EV charging — grounded against BS 7671:2018+A4:2026 Section 722.
 * 30 mA RCD + PEN-fault provisions verified against facets where possible.
 */
export const evChargingContent: CalculatorContent = {
  slug: 'ev-charging',
  governingStandards: ['BS 7671', 'Approved Document S'],

  whyItMatters: [
    'An EV charge point is a continuous, high, often outdoor load — it needs its own circuit sized with the 1.25 factor and protected to BS 7671 Section 722.',
    'On a TN-C-S (PME) supply, an open PEN conductor can put dangerous voltage on the car body; Section 722 requires PEN-fault detection/disconnection or an alternative means (e.g. an earth electrode).',
    'Additional protection by a 30 mA RCD is required, and the installation must also protect against DC residual current (Type A + 6 mA DC detection, or Type B).',
    'Above the DNO notification thresholds the connection must be notified or applied for before energising.',
  ],

  whenToCheck: [
    'Sizing the supply: is there spare capacity after diversity, or is a DNO upgrade needed?',
    'Choosing the earthing arrangement and PEN-fault provision for an outdoor point on PME',
    'Selecting RCD type — Type A with 6 mA DC detection, or Type B',
    'Checking voltage drop and Zs on the (often long) final circuit to the charger',
  ],

  commonMistakes: [
    'Using a plain Type AC RCD — not permitted; DC residual current must be handled',
    'Ignoring the PME/PEN risk on an outdoor charge point',
    'Forgetting the 1.25 continuous-load factor when sizing the cable and device',
    'Overlooking DNO notification (G98/G99/G100) for the added load',
  ],

  workedExample: {
    scenario: '7.4 kW single-phase home charge point, 230 V.',
    inputs: [
      { label: 'Charger power', value: '7.4 kW' },
      { label: 'Supply', value: '230 V, 1-phase' },
      { label: 'Continuous-load factor', value: '×1.25' },
    ],
    steps: [
      'Ib = P ÷ V = 7400 ÷ 230 = 32.2 A',
      'Design for continuous load: 32.2 × 1.25 = 40.2 A',
      'Select a 40 A protective device + suitably rated cable',
      'Provide 30 mA RCD with DC fault protection (Type A + 6 mA, or Type B)',
    ],
    result: 'Ib ≈ 32 A → 40 A circuit with Type A (6 mA DC) RCD and PEN-fault provision on PME.',
  },

  standards: [
    {
      standard: 'Approved Document S',
      citation: 'Approved Document S (2021) §6.2 — the technical requirements for a charge point',
      clauseText:
        'Building Regulations Part S applies in England. Each electric vehicle charge point should meet ALL of the following: (a) be designed and installed as described in BS EN 61851; (b) have a MINIMUM NOMINAL RATED OUTPUT OF 7 kW; (c) be fitted with a universal (untethered) socket — a tethered point is acceptable only in exceptional circumstances such as a self-build where the vehicle requirements are already known; (d) be fitted with an indicator showing charging status, using lights or a visual display; (e) be a minimum of a Mode 3 specialised system running from a DEDICATED CIRCUIT, or equivalent, as defined in BS EN IEC 61851-1; (f) meet the requirements of BS 7671; and (g) meet the requirements of the IET Code of Practice: Electric Vehicle Charging Equipment Installation. NOTE: Approved Document S expressly gives NO guidance on electrical or fire safety — it points to Approved Document B, Approved Document P and the Electricity at Work Regulations 1989 (HSE HSR25) for that.',
      tableRefs: ['Approved Document S §6.2'],
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 722 — Electric vehicle charging installations',
      clauseText:
        'EV charging installations must meet the additional requirements of Section 722, including additional protection by a 30 mA RCD, protection against DC residual current, and measures against a PEN conductor fault where a PME (TN-C-S) earth is used for an outdoor charge point.',
      tableRefs: ['Section 722', 'Regulation 722.411.4.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 722.411.4.1 — the PME options, all FOUR that remain',
      clauseText:
        'A PME earthing facility shall not be used for a charge point located outdoors, or reasonably expected to charge a vehicle outdoors, unless one of the following applies. (a) was DELETED at A2:2022. (b) An installation earth electrode, with a main protective bonding conductor complying with Reg 544.1.1, whose resistance holds the voltage between the main earthing terminal and Earth to 70 V RMS or less on an open-circuit PEN fault — see Annex A722.3. (c) A device that disconnects the vehicle from the live conductors AND from protective earth within 5 s when the voltage between the cpc and Earth exceeds 70 V RMS; it need not operate if the voltage exceeds 70 V for less than 4 s, shall provide isolation, shall be selected per Table 537.4, and can only be reset once the voltage is back below 70 V. (d) A device that disconnects within 5 s when the UTILISATION voltage at the charging point, line to neutral, is greater than 253 V RMS or less than 207 V RMS, resettable only within 207–253 V. (e) An alternative device to (c) or (d) which does not result in a lesser degree of safety. Equivalent means of functionality may be built into the charging equipment.',
      tableRefs: [
        'Reg 722.411.4.1',
        'Annex A722.3',
        'Annex A722.4',
        'Table 537.4',
        'Reg 543.3.3.101(b)',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Part 2 definitions + Reg 531.3.3 — where the 6 mA figure comes from',
      clauseText:
        'The 6 mA number is defined in Part 2, not invented by installers. A Residual direct current detecting device (RDC-DD) is a “detection device having at least the functionality of detection and evaluation of 6 mA DC residual currents and switching of the monitored circuit”; a Residual direct current protective device (RDC-PD) is a “protective device with integrated AC, pulsating DC and 6 mA DC detection, evaluation and mechanical switching”. Reg 531.3.3 NOTE 1 explains why it matters: for an RCD Type A, tripping is achieved for residual pulsating direct currents superimposed on a smooth direct current only UP TO 6 mA. Beyond that the Type A can be blinded — hence Type A plus 6 mA DC detection, or a Type B.',
      tableRefs: ['Part 2 (RDC-DD, RDC-PD)', 'Reg 531.3.3'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 722.421.1.7.201 — AFDDs are NOT required',
      clauseText:
        'AFDDs are not required for circuits supplying EV charging equipment conforming to BS EN 61851 series that incorporate socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2. Worth knowing before pricing one in.',
      tableRefs: ['Reg 722.421.1.7.201'],
    },
    {
      standard: 'BS 7671',
      citation: 'Annex A722.3 NOTE 1 — the 200 Ω cap on the EV earth electrode',
      clauseText:
        'Where the earth-electrode route (condition (b) of Reg 722.411.4.1) is used instead of a voltage-monitoring device, Annex A722.3 gives the formula for the required resistance — and caps it: “Earth electrodes with a resistance above 200 Ω may be unstable.” Where the three-phase formula leads to a value exceeding 200 Ω, the maximum value of RA,EV should be taken as 200 Ω. An electrode is not an automatic escape from the PME restriction; it has to actually hold the 70 V condition and be stable.',
      tableRefs: ['Annex A722.3', 'Reg 722.411.4.1(b)'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      // Checked against the printed regulations (Desktop/BS7671_ocr.pdf) on 2026-08-09.
      //
      // VERIFIED word-for-word — Reg 722.411.4.1: a PME earthing facility shall not
      // be used for a charge point located outdoors (or reasonably expected to charge
      // a vehicle outdoors) unless one of FOUR remaining options applies:
      //   (a) DELETED by A2:2022 — anything citing it is out of date;
      //   (b) an installation earth electrode holding the MET-to-Earth voltage to
      //       70 V RMS or less on an open-circuit PEN fault (see Annex A722.3);
      //   (c) a device disconnecting the vehicle from live conductors AND protective
      //       earth within 5 s when that voltage exceeds 70 V RMS;
      //   (d) a device disconnecting within 5 s when the UTILISATION voltage leaves
      //       the 207–253 V RMS band — a common product implementation;
      //   (e) an alternative device to (c) or (d) of no lesser safety.
      // This file previously stopped at (c), which understates the options available.
      //
      // CORROBORATED — the 30 mA RCD requirement appears in the Section 722 figure,
      // annotated "30 mA RCD" against Reg 722.531.3.101.
      //
      // NOT CONFIRMED — the DC residual current (6 mA d.c.) provision. The OCR of
      // this copy jumps from Reg 722.511.101 straight to Annex A722, so the body of
      // 722.531.3.101 is not present to read. It needs checking against a clean copy
      // or the facets before this file is marked verified.
      'Reg 722.411.4.1 (PME / PEN fault, 70 V, 5 s, option (a) deleted at A2:2022) verified word-for-word against the printed A4:2026 text. The 30 mA RCD is corroborated by the Section 722 figure citing Reg 722.531.3.101. Reg 722.421.1.7.201 (AFDDs not required) and Annex A722.3 NOTE 1 (200 Ω cap on RA,EV) added, both verified word-for-word. ⚠️ The full option list in 722.411.4.1 was also incomplete here — it ran (a) deleted, then (b) and (c), and STOPPED. The printed text carries (d) as well (a device disconnecting within 5 s when the utilisation voltage leaves the 207–253 V RMS band) and (e) (an alternative device to (c) or (d) of no lesser safety). Omitting them makes the PME restriction look more limiting than it is, and (d) is a common product implementation. All four remaining options are now stated verbatim. The 6 mA DC figure is now substantiated from the sources that ARE readable — the Part 2 definitions of RDC-DD and RDC-PD, and Reg 531.3.3 NOTE 1 (a Type A trips on pulsating DC superimposed on smooth DC only up to 6 mA) — rather than from 722.531.3.101 itself, whose clause body is still missing from the available OCR. That specific clause reference remains unconfirmed here, which is why this file stays needs-review. G98/G99 thresholds match the engine. APPROVED DOCUMENT S (2021) \u00a76.2 added from Desktop/hav/ApprovedDocS-EV-charging-2021.pdf \u2014 the held source was previously unused by ANY calculator despite being directly on point. It sets a 7 kW minimum nominal rated output, an untethered socket by default, a charging-status indicator, and Mode 3 on a dedicated circuit; and it expressly disclaims giving any electrical or fire safety guidance, pointing instead to Approved Documents B and P and the EAWR 1989. Part S is England only.',
  },
};
