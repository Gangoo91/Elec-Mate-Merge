import type { CalculatorContent } from './types';

/**
 * Battery / electrical energy storage (EESS) — connection + BS 7671 editorial.
 */
export const batteryStorageContent: CalculatorContent = {
  slug: 'battery-storage',
  // BS 7671:2018+A4:2026 Chapter 57 is now THE home for stationary secondary battery
  // requirements (Reg 551.8 was deleted and redirected to it). Reg 570.6.1.1.1 makes the
  // BS EN IEC 62485 series normative and Reg 570.6.7.203 brings PAS 63100 in for dwellings,
  // so both belong in the governing list — they were previously omitted.
  governingStandards: [
    'BS 7671 Chapter 57',
    'BS EN IEC 62485 series',
    'PAS 63100',
    'ENA EREC G98',
    'ENA EREC G99',
    'MCS',
  ],

  whyItMatters: [
    'Usable storage is always less than the nameplate kWh — depth of discharge, round-trip efficiency and temperature all eat into it, so size to usable energy, not the label.',
    'A storage inverter is a form of generation for connection purposes: up to 16 A/phase (≈3.68 kW) it connects under G98; above that, G99 applies before energising.',
    'Lithium chemistries (LiFePO₄) give deeper discharge and far more cycles than lead-acid — the right chemistry depends on cycle life and budget, not just capacity.',
    'Domestic GB installs of battery storage are currently 0%-rated for VAT (to 31 March 2027).',
    'BS 7671:2018+A4:2026 added Chapter 57 for stationary secondary batteries used as a source of supply — and it treats the battery as a generating set rather than a load (Reg 551.7.2.1), which is what puts it on the supply side of the final-circuit devices, on its own dedicated circuit.',
  ],

  whenToCheck: [
    'Sizing a bank for a target daily autonomy or self-consumption',
    'When the inverter output crosses the G98/G99 threshold',
    'Choosing chemistry on cycle life and depth of discharge, not just kWh',
    'Siting outdoors/garage — apply the temperature derating to capacity',
  ],

  commonMistakes: [
    'Quoting nameplate kWh as usable — apply depth of discharge and round-trip efficiency',
    'Assuming G98 when the inverter exceeds the 16 A/phase threshold',
    'Ignoring cold-temperature capacity loss for outdoor installs',
    'Comparing lithium and lead-acid on £/kWh capacity alone, not £/kWh-cycle',
  ],

  workedExample: {
    scenario: '8 kWh/day demand, 1 day autonomy, LiFePO₄ (95% DoD, 98% efficiency), 20% reserve.',
    inputs: [
      { label: 'Daily demand', value: '8 kWh' },
      { label: 'Autonomy + reserve', value: '1 day + 20%' },
      { label: 'DoD / efficiency', value: '95% / 98%' },
    ],
    steps: [
      'Required (usable) = 8 × 1 × 1.2 = 9.6 kWh',
      'Allow for round-trip efficiency: 9.6 ÷ 0.98 ≈ 9.8 kWh',
      'Total capacity = usable ÷ DoD = 9.8 ÷ 0.95 ≈ 10.3 kWh',
    ],
    result: '≈ 10.3 kWh installed for ~9.6 kWh usable.',
  },

  standards: [
    {
      standard: 'ENA EREC G98',
      citation: 'ENA EREC G98 / G99 — storage inverter connection',
      clauseText:
        'A storage system that can export is treated as generation for connection: up to and including 16 A per phase connects under G98 (notify); above that, G99 application and agreement are required before connection.',
    },
    // Previously this pointed readers at the IET Code of Practice for Electrical Energy Storage
    // Systems as the source of detail, with no mention of the chapter that actually governs.
    // A4:2026 deleted Reg 551.8 and moved the stationary battery requirements into Chapter 57.
    {
      standard: 'BS 7671',
      citation: 'BS 7671:2018+A4:2026 Chapter 57 — stationary secondary batteries',
      clauseText:
        'Chapter 57 is the governing chapter for a stationary secondary battery installation (Regulation 551.8 was deleted and its requirements moved here). Reg 570.6.1.1.1 requires conformance to the relevant parts of the BS EN IEC 62485 series. Reg 570.6.2.2: where an RCD is used for protection of the AC supply circuit it shall be of Type B to BS EN 62423 or BS EN 60947-2, unless (a) the PCE provides at least simple separation between the AC and DC sides, or (b) at least simple separation is provided between the PCE and the RCD by separate windings of a transformer, or (c) the PCE does not require a Type B RCD as stated by its manufacturer. Reg 570.6.3 requires the location or enclosure to be adequately ventilated taking account of the manufacturer’s instructions. Reg 570.6.4 requires determination of the battery prospective fault current to account for the contribution of both the battery AND the PCE which charges it. Reg 570.6.5 requires every power circuit connecting to the battery to have appropriate means of isolation conforming to Section 462 — the note adds that isolation is likely to be required at BOTH ends of the power circuit. Regs 570.6.8.201 to 570.6.8.203 require the warning notices.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671:2018+A4:2026 Reg 551.7.2.1 — connection point',
      clauseText:
        'A stationary secondary battery in accordance with Chapter 57 is considered a generating set and not a load, so it is installed on the supply side of all the protective devices for the final circuits of a distribution board, on its own dedicated circuit. Where an installation is supplied from more than one source, Reg 826.1.1.4 requires a main switch suitable for isolation for each source plus a durable warning notice.',
    },
    {
      standard: 'PAS 63100',
      citation: 'BS 7671:2018+A4:2026 Reg 570.6.7.203 — batteries in dwellings',
      clauseText:
        'Stationary secondary batteries in dwellings shall be installed in a suitable location taking account of the manufacturer’s instructions and PAS 63100. In other premises the location of storage batteries and the fire protection requirements shall be selected taking into account the fire strategy for the premises.',
    },
    /*
      Added from the source (Desktop/hav/MCS-MIS3012-2025-Battery.pdf, Issue 1.0).
      The file already declared 'MCS' in governingStandards but cited no MCS clause
      at all — claiming a standard governs the tool while saying nothing about what
      it actually requires.
    */
    {
      standard: 'MCS',
      citation: 'MCS MIS 3012:2025 Issue 1.0 — Battery storage installation standard',
      clauseText:
        'Specifies the requirements for MCS contractors undertaking the supply, design, installation, set to work and commissioning of electrical energy storage systems (EESS) for permanent buildings, with a maximum power output of up to 50 kW (\u00a71). It must be read in conjunction with the IET Code of Practice for Electrical Energy Storage Systems — MIS 3012 sets the contractor requirements, the Code of Practice carries the design detail.',
      tableRefs: ['MIS 3012 \u00a71'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Chapter 57 clauses (570.6.1.1.1, 570.6.2.2, 570.6.3, 570.6.4, 570.6.5, 570.6.7.203, 570.6.8.201–203), Reg 551.7.2.1 and Reg 826.1.1.4 re-read line-by-line against the printed BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf). Every regulation number resolves to the clause claimed. TWO CORRECTIONS made on that read: (1) “applies irrespective of the nominal voltage and irrespective of capacity” was removed — the word “irrespective” appears nowhere in Chapter 57, and the scope in Reg 570.1 in fact carries six express EXCLUSIONS (batteries inside products covered by product standards, and those wholly within BS EN [IEC] 62040 pluggable UPS, BS EN 50171 central safety power supplies, BS 5839 fire alarm, BS EN 50132 alarm, BS EN [IEC] 60204 machinery and BS 5266 emergency lighting systems); (2) Reg 570.6.2.2 has THREE exceptions to the Type B RCD requirement, not the one previously stated. MIS 3012:2025 Issue 1.0 from Desktop/hav. PAS 63100 is cited only as Reg 570.6.7.203 cites it — its own content is not held and is not quoted. G98/G99 thresholds match the engine. VAT 0% domestic GB per HMRC relief — a tax matter, not BS 7671.',
  },
};
