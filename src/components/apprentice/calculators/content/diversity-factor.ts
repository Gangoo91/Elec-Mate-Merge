import type { CalculatorContent } from './types';

/**
 * Diversity — IET On-Site Guide design aid (not a BS 7671 regulation).
 */
export const diversityFactorContent: CalculatorContent = {
  slug: 'diversity-factor',
  governingStandards: ['IET On-Site Guide'],

  whyItMatters: [
    'Not every load runs at full power at the same time, so applying diversity gives a realistic maximum demand instead of a wastefully large connected total.',
    'Diversity allowances differ by load type and premises — lighting, socket circuits, cooking and heating each have their own treatment in the IET On-Site Guide.',
    'Under-applying diversity oversizes the supply, main cable and switchgear; over-applying it risks overloading them.',
    'Diversity is guidance for sizing the supply — it does not reduce the rating any individual circuit must have.',
  ],

  whenToCheck: [
    'Estimating maximum demand for a consumer unit or distribution board',
    'Sizing the main switch, tails and supply',
    'Deciding whether the existing supply has spare capacity for a new load',
    'For mixed domestic/commercial premises with different diversity rules',
  ],

  commonMistakes: [
    'Applying diversity to a circuit’s own protective device rating (it’s for the supply, not the circuit)',
    'Using domestic diversity allowances for a commercial/industrial installation',
    'Forgetting some loads (e.g. EV chargers, heat pumps) get little or no diversity',
    'Double-counting diversity already built into a sub-board’s figure',
  ],

  workedExample: {
    scenario: 'Domestic board: lighting 1 kW, sockets 6 kW, cooker 12 kW (illustrative diversity).',
    inputs: [
      { label: 'Lighting (×0.66)', value: '0.66 kW' },
      { label: 'Sockets (100% largest + 40% of every other)', value: 'per OSG' },
      { label: 'Cooker (first 10 A + 30% rem., +5 A if socket)', value: 'per OSG' },
    ],
    steps: [
      'Apply the On-Site Guide allowance to each load category',
      'Sum the diversified figures to get the maximum demand',
      'Size the supply and main device to that demand',
    ],
    result: 'Diversified maximum demand is well below the connected total — size the supply to it.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 311.1 — the duty, which BS 7671 does not quantify',
      clauseText:
        'For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined. In determining the maximum demand of an installation or part thereof, diversity may be taken into account. BS 7671 publishes NO diversity allowances — it permits diversity and leaves the figures to the designer. Everything numeric below is IET On-Site Guide guidance.',
      tableRefs: ['Reg 311.1'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'On-Site Guide Table A2 — allowances for diversity, all ten rows',
      clauseText:
        'Columns are: individual household installations (including individual dwellings of a block) / small shops, stores, offices and business premises / small hotels, boarding houses, guest houses etc. (1) Lighting: 66% / 90% / 75% of total current demand. (2) Heating and final circuits not listed in the table: 100% of total current demand up to 10 A + 50% of any demand in excess of 10 A / 100% f.l. of largest appliance + 75% f.l. of remaining / 100% f.l. of largest + 80% f.l. of second largest + 60% f.l. of remaining. (3) Cooking appliances: 10 A + 30% f.l. of connected cooking appliances in excess of 10 A + 5 A if a socket-outlet is incorporated in the control unit / 100% f.l. of largest + 80% f.l. of second largest + 60% f.l. of remaining / same as shops. (4) Motors, other than lift motors: not applicable / 100% f.l. of largest motor + 80% f.l. of second largest + 60% f.l. of remaining / 100% f.l. of largest motor + 50% f.l. of remaining. (5) Water heaters, instantaneous type: 100% f.l. of largest + 100% f.l. of second largest + 25% f.l. of remaining, in all three premises types. (6) Water heaters, thermostatically controlled, (7) floor warming installations and (8) thermal storage space heating installations: NO DIVERSITY ALLOWABLE in any premises type. (9) Standard arrangement of final circuits per Appendix H: 100% of the current demand of the largest circuit + 40% / 50% / 50% of every other circuit. (10) Socket-outlets other than those in row 9, and stationary equipment other than listed above: 100% of the largest point of utilization + 40% / 70% of every other point; for hotels, + 75% of every other point in main rooms (dining rooms etc.) and + 40% of every other point of utilization.',
      tableRefs: ['OSG Table A2'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'Notes to Table A2 — and the one that limits the whole calculation',
      clauseText:
        '* An instantaneous water heater is, in this context, a water heater of any loading that heats water only while the tap is turned on and therefore uses electricity intermittently. † “It is important to ensure that distribution boards or consumer units are of sufficient rating to take the total load connected to them WITHOUT the application of any diversity.” That note is the On-Site Guide’s own statement of what BS 7671 Reg 536.4.202 requires: a diversified figure sizes the supply, it does not license a board rated below the connected load.',
      tableRefs: ['OSG Table A2 Notes', 'BS 7671 Reg 536.4.202'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'On-Site Guide Appendix A — the Guide’s own health warning on Table A2',
      clauseText:
        'Quoted from Appendix A: “The information and values given in this appendix are intended only for guidance, because it is impossible to specify the appropriate allowances for diversity for every type of installation and such allowances call for special knowledge and experience. THE RECOMMENDATIONS IN TABLE A2 HAVE NOT BEEN UPDATED FOR SOME TIME, AND DO NOT NECESSARILY ALIGN WITH MODERN LOADS AND USAGES. The values given in Table A2, therefore, may be increased or decreased as decided by the installation designer concerned. No guidance is given for blocks of residential dwellings, large hotels or industrial and large commercial premises; such installations should be assessed on a case-by-case basis.” EV chargers and heat pumps are exactly the modern loads that warning is about.',
      tableRefs: ['OSG Appendix A'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'On-Site Guide Appendix A — the method rule people get wrong',
      clauseText:
        'The Table A2 allowances are applied to the TOTAL current demand of all the equipment supplied by the installation. Quoted: “The current demand of the installation should NOT be assessed by adding the current demands of the individual final circuits obtained as outlined above.” In Table A2 the allowances are expressed either as percentages of the current demand or, where followed by “f.l.” (full load), as percentages of the rated full load current of the current-using equipment. An alternative method — adding the diversified demands of individual circuits and then applying a further allowance — is permitted, but then Table A2 shall NOT be used and the values chosen are the designer’s responsibility. The current demand of any final circuit that is a standard circuit arrangement complying with Appendix H is the rated current of its overcurrent protective device.',
      tableRefs: ['OSG Appendix A', 'OSG Appendix H'],
    },
    {
      standard: 'IET On-Site Guide',
      citation:
        'On-Site Guide — the OTHER diversity: rated diversity factor (RDF) and group rated current (Ing)',
      clauseText:
        'A different quantity with a confusingly similar name, and the one that actually protects the board. A device’s rated current In is set by its product standard, usually in free air without adjacent devices — conditions that “differ significantly from the conditions in a consumer unit or distribution board conforming to BS EN [IEC] 61439-3”. The GROUP rated current takes account of the thermal interactions when several outgoing circuits deliver current at the same time. The group rated current (Ing) or rated diversity factor de-rating value (RDF) should be declared by the assembly manufacturer and applied where adjacent devices are simultaneously and continuously loaded, that is: Ing ≥ Ib, or Inc × RDF ≥ Ib — where Ing is the group rated current, Inc is the rated current of a circuit (which may be the device In), and Ib is the design current of the circuit. The Guide ties this straight back to BS 7671 Reg 536.4.202: the current rating of an assembly circuit may be LOWER than the device’s own rated current once installed in the assembly, so the manufacturer’s ratings and instructions shall be taken into account.',
      tableRefs: ['BS EN IEC 61439-3', 'BS 7671 Reg 536.4.202', 'BS 7671 Reg 536.4.201'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Table A2 read directly from the IET On-Site Guide (\u007e/Desktop/untitled folder/OnSiteGuide_ocr.pdf, the edition aligned to BS 7671:2018+A4:2026 \u2014 it references the new Chapter 57). \u26a0\ufe0f The table is landscape and the OCR text layer renders it as gibberish, so pages 151\u2013152 were RENDERED AS IMAGES and read visually rather than trusted from pdftotext \u2014 the same discipline the App 4 Iz tables require. All ten rows and all three premises columns are transcribed above, with both notes. Three things this adds that the previous single-paragraph entry did not have: the actual numbers; the Guide\u2019s own warning that Table A2 \u201chas not been updated for some time and does not necessarily align with modern loads and usages\u201d (which is the honest answer on EV and heat-pump loads); and the method rule that Table A2 applies to the TOTAL demand and must NOT be applied circuit-by-circuit. Reg 311.1 and Reg 536.4.202 verified separately against the printed BS 7671. RDF / Ing added: the On-Site Guide\u2019s rated-diversity-factor rule for consumer units to BS EN [IEC] 61439-3, a completely different quantity from the Table A2 allowances despite the shared word. \u26a0\ufe0f Surfaced from the bs7671_facets OSG rows but VERIFIED against the PDF first, and the facet was WRONG: it rendered the inequality as \u2018Ing > Ib / (Inc \u00d7 RDF)\u2019 where the printed Guide reads \u2018Ing \u2265 Ib, or Inc \u00d7 RDF \u2265 Ib\u2019. Another demonstration that RAG rows are leads and the document is the tiebreaker. \u26a0\ufe0f The Table A2 numeric values are NOT in bs7671_facets at all \u2014 searches for the percentages, \u2018cooking\u2019 and \u2018largest appliance\u2019 return zero OSG rows \u2014 so those numbers could only come from the PDF.',
  },
};
