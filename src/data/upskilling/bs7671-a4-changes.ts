/**
 * BS 7671:2018+A4:2026 — audit checklist of substantive changes from A3:2024.
 *
 * Source of truth for the 18th Edition course uplift. Every entry must be
 * rendered somewhere in the matching module's content (with an
 * <AmendmentBadge> nearby) before that module's rewrite ships.
 *
 * Seeded from the Introduction to Amendment 4:2026 (BS 7671:2018+A4:2026,
 * pages 17–25). Verified against Supabase `bs7671_facets` table (edition_id
 * 41c1f30d-4f1a-432f-9e2d-61b91290149f) by `scripts/verify-a4-changes.ts`.
 */

export type ChangeType = 'new' | 'modified' | 'deleted' | 'reorganised';

export type ApprenticePrimitive =
  | 'AmendmentDiff'
  | 'RegsCallout'
  | 'TLDR'
  | 'ConceptBlock'
  | 'AppendixTable';

export type ModuleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface A4Change {
  /** Stable id used to grep across JSX (e.g. <AmendmentBadge changeId="..." />). */
  id: string;
  /** Reg / table / appendix references, in BS 7671 numbering. */
  regNumbers: string[];
  changeType: ChangeType;
  module: ModuleNumber;
  /**
   * Section number within the module that should carry this change (1-indexed).
   * If the module's section list changes, update this — the verification script
   * cross-references this against rendered files.
   */
  section: number;
  /** Pre-A4 wording / behaviour. `null` for genuinely net-new content. */
  was: string | null;
  /** Post-A4 wording / behaviour. */
  now: string;
  /** Why A4 added or modified it — what risk or gap closed. */
  rationale: string;
  /** Which apprentice editorial primitive should carry this in the rewrite. */
  apprenticePrimitive: ApprenticePrimitive;
  /** Concrete checks for "this change is taught" — used by self-check grep. */
  acceptanceCriteria: string[];
  /**
   * C&G 2382 / 5357 Unit 022 AC codes this change touches. Pulled from
   * `bs7671-lo-acs.ts`. Best-effort mapping — most A4 changes hit a single
   * AC because LO/AC granularity is coarse vs the reg level.
   */
  acCodes?: string[];
  /** Populated by `scripts/verify-a4-changes.ts` after a Supabase round-trip. */
  facetRowIds?: string[];
}

export const A4_2026_EDITION_CODE = '2018+A4:2026' as const;
export const A4_2026_EDITION_ID = '41c1f30d-4f1a-432f-9e2d-61b91290149f' as const;
export const A4_2026_RELEASE_DATE = '2026-04-15' as const;
export const A3_WITHDRAWN_DATE = '2026-10-15' as const;

export const BS7671_A4_CHANGES: A4Change[] = [
  /* ── Module 1 — Scope, object and fundamental principles ─────────── */
  {
    id: 'a4-133-1-3-recording',
    acCodes: ['1.3'],
    regNumbers: ['133.1.3'],
    changeType: 'modified',
    module: 1,
    section: 4,
    was: 'Selection of equipment — generic suitability requirement.',
    now: 'Certain usage of equipment must now be recorded on the appropriate electrical certification specified in Part 6.',
    rationale:
      'Closes a traceability gap — equipment selection decisions now have a paper trail on the cert, so periodic inspectors can see what was specified and why.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: [
      'M1 mentions 133.1.3 with the recording requirement',
      'Cross-link to M6 cert form fields exists',
    ],
  },

  /* ── Module 3 — General characteristics (Chapter 31) ─────────────── */
  {
    id: 'a4-312-2-1-1-pnb',
    acCodes: ['3.1'],
    regNumbers: ['312.2.1.1'],
    changeType: 'new',
    module: 3,
    section: 2,
    was: null,
    now: 'New PNB (protective neutral bonding) figure and requirements added — distinct from TN-C-S, used where the supply transformer neutral is bonded to the consumer means of earthing on-site.',
    rationale:
      'PNB had been growing on UK distribution networks (especially for new commercial/industrial supplies) without an explicit BS 7671 figure — A4 codifies the arrangement so designers can specify it correctly and inspectors can record it.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M3 has a PNB ConceptBlock distinct from TN-C-S',
      'PNB figure is rendered (or described) on mobile without horizontal scroll',
      'M6 cert-form section reflects new PNB checkbox',
    ],
  },

  /* ── Module 4 — Protection for safety (Chapter 41/42/43/44) ──────── */
  {
    id: 'a4-411-3-1-2-insulating',
    acCodes: ['4.1', '4.2'],
    regNumbers: ['411.3.1.2'],
    changeType: 'modified',
    module: 4,
    section: 1,
    was: 'All metallic pipes entering a building required protective equipotential bonding.',
    now: 'Metallic pipes entering the building having an insulating section at their point of entry need not be connected to the protective equipotential bonding.',
    rationale:
      'Most modern utility pipes (water, gas) now enter through an insulating section. Bonding to a deliberately-isolated section gave no additional safety and risked introducing a fault path.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M4 covers the insulating-section exception with site-realistic example'],
  },
  {
    id: 'a4-411-3-2-2-disconnection-times',
    acCodes: ['4.1', '4.2'],
    regNumbers: ['411.3.2.2'],
    changeType: 'modified',
    module: 4,
    section: 1,
    was: 'Maximum disconnection times in Table 41.1 applied to a narrower set of final circuits.',
    now: 'Table 41.1 disconnection times now apply to final circuits rated up to 63 A with one or more socket-outlets and final circuits rated up to 32 A supplying only fixed connected current-using equipment.',
    rationale:
      'Aligns BS 7671 with the higher-rated socket circuits common in commercial premises (commercial kitchens, workshop power) so the same shock-protection logic applies up the rating range.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M4 covers new 63A / 32A thresholds with worked example'],
  },
  {
    id: 'a4-411-3-3-32a-socket-exception',
    acCodes: ['4.1', '4.2'],
    regNumbers: ['411.3.3'],
    changeType: 'modified',
    module: 4,
    section: 1,
    was: 'RCD protection required for socket-outlets up to 20 A; limited exceptions.',
    now: 'Now applies to socket-outlets with a rated current not exceeding 32 A. Other than for a dwelling, a documented risk assessment may determine that RCD protection is not necessary.',
    rationale:
      'Lifts the threshold to match modern 32A commando sockets (workshops, EV charge points) and gives commercial designers a structured exception via documented risk assessment — but not in dwellings.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: [
      'M4 covers 32A socket exception',
      'Risk-assessment exception clearly NOT applicable to dwellings',
    ],
  },
  {
    id: 'a4-411-3-4-luminaire-rcd-domestic',
    acCodes: ['4.1', '4.2'],
    regNumbers: ['411.3.4'],
    changeType: 'new',
    module: 4,
    section: 1,
    was: null,
    now: 'Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires.',
    rationale:
      'Closes a long-known gap — domestic lighting circuits were the most common non-RCD-protected final circuit, yet luminaires (especially exterior, bathroom, downlights) routinely fail to earth and create shock hazards. 30 mA RCD is now mandatory.',
    apprenticePrimitive: 'RegsCallout',
    acceptanceCriteria: [
      'M4 has a RegsCallout quoting 411.3.4 verbatim',
      'Scenario block covers domestic light circuit on RCBO vs split-load CU',
      'M9 mock exam has a question on 411.3.4',
    ],
  },
  {
    id: 'a4-411-4-3-pen-no-switching',
    acCodes: ['4.2'],
    regNumbers: ['411.4.3'],
    changeType: 'modified',
    module: 4,
    section: 1,
    was: 'PEN conductor switching was discouraged.',
    now: 'No switching or isolating device shall be inserted in a PEN conductor.',
    rationale:
      'A switched PEN can leave the consumer’s metallic parts at line potential during a fault. A4 makes the prohibition absolute rather than advisory.',
    apprenticePrimitive: 'RegsCallout',
    acceptanceCriteria: ['M4 has a CommonMistake on switching the PEN'],
  },
  {
    id: 'a4-411-6-it-systems-reorganised',
    acCodes: ['4.1', '4.2'],
    regNumbers: ['411.6', '411.6.3.1', '411.6.3.2', '411.6.4', '411.6.5'],
    changeType: 'reorganised',
    module: 4,
    section: 2,
    was: '411.6 contained 411.6.3.1, 411.6.3.2, an earlier 411.6.4 and no 411.6.5.',
    now: '411.6 reorganised. 411.6.3.1 and 411.6.3.2 deleted; 411.6.4 redrafted; new 411.6.5 inserted.',
    rationale:
      'IT systems are uncommon in UK general installations but increasingly used in critical/medical contexts — A4 tightens the requirements and removes the legacy parallel sub-clauses.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: ['M4 walks the new IT-system structure'],
  },
  {
    id: 'a4-419-ads-not-feasible',
    acCodes: ['4.1', '4.2'],
    regNumbers: ['419'],
    changeType: 'new',
    module: 4,
    section: 1,
    was: null,
    now: 'New Regulation group 419 inserted where automatic disconnection of supply (per 411.3.2) is not feasible — e.g. electronic equipment with limited short-circuit current.',
    rationale:
      'Modern electronics (inverters, DC-side PV, lab supplies) can’t deliver enough fault current to operate a conventional MCB. 419 gives the designer an alternative protection route rather than forcing an unachievable disconnection time.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M4 introduces 419 with a concrete electronics scenario (PV / inverter or similar)',
    ],
  },
  {
    id: 'a4-421-1-7a-high-rise',
    acCodes: ['4.1'],
    regNumbers: ['421.1.7(a)'],
    changeType: 'modified',
    module: 4,
    section: 3,
    was: 'Older wording referencing tall residential buildings.',
    now: 'Now reads: High rise residential buildings.',
    rationale:
      'Aligns terminology with the post-Grenfell Building Safety Act and BS 9991/9999 fire-strategy framework.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M4 references the high-rise residential terminology'],
  },
  {
    id: 'a4-422-2-escape-route-cables',
    acCodes: ['4.1'],
    regNumbers: ['422.2', '422.2.1'],
    changeType: 'modified',
    module: 4,
    section: 3,
    was: 'Cables in protected escape routes were narrowly restricted.',
    now: 'Cables meeting 422.2.1 may be installed in a protected corridor; cables in a fire-resisting enclosure are now deemed outside the protected escape route. 422.2.1 lists permitted cables.',
    rationale:
      'Brings BS 7671 in line with BS 9991/9999 fire-strategy thinking — fire-resisting enclosure decouples the cable risk from the corridor risk.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M4 covers permitted cables list', 'Cross-link to App 13 in M8'],
  },
  {
    id: 'a4-434-2-1-inherently-scc-proof',
    acCodes: ['4.1'],
    regNumbers: ['434.2.1'],
    changeType: 'modified',
    module: 4,
    section: 4,
    was: 'Conductor selection per 434.2.1 used legacy phrasing for protected conductors.',
    now: 'Term "inherently short-circuit and earth-fault proof" introduced for conductor selection and erection under 434.2.1.',
    rationale:
      'Standardises a term that was already in IEC parlance and used by manufacturers — gives designers a recognised category to specify.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M4 introduces the SCC/earth-fault-proof term with examples'],
  },
  {
    id: 'a4-444-annex-b443-deleted',
    acCodes: ['4.1'],
    regNumbers: ['444', 'Annex B443'],
    changeType: 'deleted',
    module: 4,
    section: 5,
    was: 'Annex B443 (electromagnetic disturbances) provided informative guidance.',
    now: 'Annex B443 deleted.',
    rationale:
      'Content superseded by referenced product standards and harmonised European EMC guidance — removing reduces duplication.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M4 notes Annex B443 deletion'],
  },

  /* ── Module 5 — Selection and erection (Ch 51/52/53/54/55, 57 NEW) ─ */
  {
    id: 'a4-table-51-pe-fe-bonding',
    acCodes: ['5.1', '5.2'],
    regNumbers: ['Table 51', '514'],
    changeType: 'modified',
    module: 5,
    section: 1,
    was: 'Table 51 listed core-identification colours for protective and functional conductors only.',
    now: 'Table 51 revised to include identification for: combined protective and functional earthing conductor; combined protective and functional bonding conductor; functional bonding conductor. Note added: neither the designation FE nor green-and-yellow should be used to identify a functional bonding conductor.',
    rationale:
      'Modern installations (ICT, generation, EV) use functional earthing/bonding — A4 prevents these being mis-identified as protective bonding.',
    apprenticePrimitive: 'AppendixTable',
    acceptanceCriteria: [
      'M5 renders revised Table 51 columns',
      'CommonMistake: don’t use green/yellow for FE bonding',
    ],
  },
  {
    id: 'a4-521-10-202-collapse',
    acCodes: ['5.1'],
    regNumbers: ['521.10.202'],
    changeType: 'modified',
    module: 5,
    section: 2,
    was: 'Wiring system support requirements without a specific premature-collapse note.',
    now: 'Wiring systems shall be supported such that they will not be liable to premature collapse. A note explains the intent — supports must survive long enough to allow occupants to escape during a fire.',
    rationale:
      'Codifies the post-Grenfell expectation — cable supports (especially metal clips on plastic) must not fail early in a fire.',
    apprenticePrimitive: 'RegsCallout',
    acceptanceCriteria: ['M5 covers metal-clip-vs-plastic-clip premature-collapse worked example'],
  },
  {
    id: 'a4-522-walls-table-52-1',
    acCodes: ['5.1'],
    regNumbers: ['522', 'Table 52.1'],
    changeType: 'modified',
    module: 5,
    section: 2,
    was: 'Wall/partition cable requirements scattered across 522 sub-clauses.',
    now: 'Cable-in-wall-or-partition requirements consolidated into Table 52.1.',
    rationale: 'Reduces lookup time for a very common installation question.',
    apprenticePrimitive: 'AppendixTable',
    acceptanceCriteria: ['M5 renders Table 52.1 with mobile-friendly horizontal scroll'],
  },
  {
    id: 'a4-536-4-202-load-curtailment',
    acCodes: ['5.2'],
    regNumbers: ['536.4.202'],
    changeType: 'modified',
    module: 5,
    section: 3,
    was: 'Coordination between LV switchgear assembly and overload protective device — narrow conditions.',
    now: 'Redrafted. Now covers coordination between low-voltage switchgear/controlgear assembly and the overload protective device, with load curtailment as one of the conditions to be satisfied.',
    rationale:
      'Modern smart panels actively curtail load during fault conditions — A4 recognises this in the coordination logic.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M5 covers load-curtailment coordination logic'],
  },
  {
    id: 'a4-537-4-2-firefighter-switch',
    acCodes: ['5.2'],
    regNumbers: ['537.4.2', '537.4.4'],
    changeType: 'modified',
    module: 5,
    section: 4,
    was: 'Firefighter’s switches required at fixed locations defined by fixed criteria; 537.4.2.1 listed mandatory cases.',
    now: 'Firefighter’s switches now required in locations specified by the fire engineer to support the building’s fire strategy. Examples include outdoor lighting at high voltage and indoor discharge lighting above low voltage. 537.4.2.1 deleted; 537.4.4 modified slightly.',
    rationale:
      'Hand the call to the fire engineer who owns the overall building strategy — BS 7671 stops prescribing where switches go and starts requiring engineering judgement.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M5 explains fire engineer specifies firefighter switch locations'],
  },
  {
    id: 'a4-545-ict-functional-earthing',
    acCodes: ['5.2'],
    regNumbers: ['545'],
    changeType: 'new',
    module: 5,
    section: 4,
    was: null,
    now: 'New Section 545 introduced — functional earthing and functional equipotential bonding for information and communication technology (ICT) equipment and systems (including broadcast/comms). Covers minimum cross-sectional area, identification, electrical continuity, combined PE+FE conductors, main FE terminal, and equipotential bonding ring conductors.',
    rationale:
      'ICT installations had been improvising functional earthing — A4 gives a single normative reference.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M5 has a Section 545 ConceptBlock with min CSA, identification, FE terminal',
    ],
  },
  {
    id: 'a4-551-7-1-bidirectional-energy',
    acCodes: ['5.2'],
    regNumbers: ['551.7.1'],
    changeType: 'modified',
    module: 5,
    section: 5,
    was: 'Generating-set protection covered unidirectional energy flow; no explicit RCD load-side prohibition.',
    now: 'Redrafted. New indent (c) requires a suitable protective device where energy flow is bidirectional. New indent (d) prohibits connecting a source to the load side of an RCD under certain conditions.',
    rationale:
      'PV, batteries, V2G chargers all feed back into the supply — BS 7671 must protect both directions, and connecting a source to the load-side of an RCD bypasses the residual-current logic entirely.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: [
      'M5 covers bidirectional protection device requirement',
      'CommonMistake: source connected to load side of RCD',
      'Cross-link to PV/battery sections',
    ],
  },
  {
    id: 'a4-551-7-2-split',
    acCodes: ['5.2'],
    regNumbers: ['551.7.2', '551.7.2.1', '551.7.2.2'],
    changeType: 'modified',
    module: 5,
    section: 5,
    was: '551.7.2 was a single regulation covering generating-set parallel-supply requirements.',
    now: 'Redrafted into two regulations. 551.7.2.1 requires the generating set on the supply side of all protective devices and treats stationary batteries (Chapter 57) as a generating set, not a load. 551.7.2.2 sets requirements for LV switchgear when the set is used in parallel with another source via LV switchgear.',
    rationale:
      'Splitting clarifies the parallel-supply case (which is now the dominant pattern with on-site PV/storage) and binds the new Chapter 57 batteries into the generating-set framework.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M5 explains supply-side placement and battery-as-source treatment'],
  },
  {
    id: 'a4-chapter-57-batteries',
    acCodes: ['5.2'],
    regNumbers: ['Chapter 57', '57'],
    changeType: 'new',
    module: 5,
    section: 7,
    was: null,
    now: 'New Chapter 57 — stationary secondary batteries. Covers requirements for stationary battery installations whose designed purpose is storage and supply of electrical installations. Excludes batteries inside product-safety-standard equipment (UPSs, fire/emergency lighting central systems).',
    rationale:
      'Domestic and commercial storage is now mainstream (PV+battery, BESS, off-grid hybrid). A4 gives stationary batteries a dedicated chapter rather than treating them as ad-hoc generators.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M5 has a dedicated Chapter 57 section',
      'Scenario covering domestic PV+battery install',
      'M9 mock exam has 2–3 Chapter 57 questions',
    ],
  },

  /* ── Module 6 — Inspection, testing, certification (Ch 64/65) ────── */
  {
    id: 'a4-653-periodic-inspection-notes',
    acCodes: ['6.2'],
    regNumbers: ['653.1', '653.2'],
    changeType: 'modified',
    module: 6,
    section: 4,
    was: 'Condition Report did not mandate the App 6 person-producing-the-report notes; recipient guidance not required; photographic appendices not explicitly permitted.',
    now: '653.1 requires the App 6 notes for the person producing the report to be taken into account on the Condition Report. 653.2 requires the report to include guidance for the recipient(s) based on the App 6 model. Note added: photographic and/or thermographic images may be appended.',
    rationale:
      'Codifies what good inspectors were already doing — gives the recipient (often a non-technical homeowner) a clear interpretation, and gives inspectors permission to attach photos/thermal images as evidence.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M6 covers App 6 notes integration and photo/thermographic attachments'],
  },
  {
    id: 'a4-eicr-form-fields',
    acCodes: ['6.1', '6.2'],
    regNumbers: [
      'App 6 (EICR)',
      'AFDD item 4.23',
      'AFDD col 30',
      'TN-C-S (PNB)',
      'reference method',
      'max permitted Zs',
      'SPD type/board',
      'Supplied from',
      'max demand kVA/A',
      'Section D safety alerts',
      'Consumer’s means of isolation',
    ],
    changeType: 'modified',
    module: 6,
    section: 5,
    was: 'EICR model form: no AFDD inspection item or test column; no PNB checkbox; no reference-method or max permitted Zs columns; no SPD-type-per-board field; no "Supplied from" or maximum demand fields; no Section D safety-alerts disclaimer; "Consumer’s isolator" wording; FI marked as unsatisfactory.',
    now: 'EICR model form additions and changes: AFDD inspection item 4.23 + test results column 30; TN-C-S (PNB) earthing arrangement option; reference-method column in circuit details; maximum permitted Zs column in circuit details; SPD type per board (T1/T2/T3/N/A); "Supplied from" field per board; maximum demand (kVA/A) field; safety alerts/product recalls disclaimer in Section D; luminaire RCD reflected via item 5.12 (411.3.4); "Consumer’s means of isolation" replaces "Consumer’s isolator"; code FI no longer needs to be marked as unsatisfactory.',
    rationale:
      'The cert-form additions are the single biggest practical change for working sparks. Every EICR/EIC the app generates must reflect these.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: [
      'M6 has AmendmentDiff blocks for each form-field change',
      'Cert app screenshots/markup reflect new fields',
      'M9 mock exam has questions on AFDD col 30, PNB checkbox, FI usage change',
    ],
  },

  /* ── Module 7 — Special installations (Part 7) ───────────────────── */
  {
    id: 'a4-section-710-medical-revision',
    acCodes: ['7.1', '7.2'],
    regNumbers: ['710'],
    changeType: 'modified',
    module: 7,
    section: 4,
    was: 'Group 2 medical locations covered without explicit independent-supply requirements; no dedicated Schedule of Test Results for supplementary protective equipotential bonding resistance.',
    now: 'Major revision. Independent supplies in group 2 medical locations now explicitly required. New Schedule of Test Results for recording supplementary protective equipotential bonding conductor resistance.',
    rationale:
      'Group 2 medical (operating theatres, ICU) lose-of-supply risk is life-critical — A4 makes the redundancy and the bonding-test record mandatory.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M7 has a Section 710 block with independent-supply + bonding test record',
    ],
  },
  {
    id: 'a4-section-716-poe',
    acCodes: ['7.1', '7.2'],
    regNumbers: ['716'],
    changeType: 'new',
    module: 7,
    section: 7,
    was: null,
    now: 'New Section 716 — Power over Ethernet. Covers distribution of ELV DC power using balanced data cables and accessories per BS EN 50173-1, with power feeding sourcing equipment per BS EN IEC 62368-3. Includes design, erection, verification of telecom infrastructure for combined data + ELV DC power feeding, plus reuse of existing telecom infrastructure for ELV DC distribution.',
    rationale:
      'PoE is now mainstream (cameras, access points, lighting controls, displays) — it had no normative BS 7671 home until A4.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M7 has a Section 716 block with concrete PoE example (camera/access point)',
      'M9 mock exam has 2–3 questions on PoE',
    ],
  },

  /* ── Module 8 — Reference materials and Amendment 4 (2026) ───────── */
  {
    id: 'a4-chapter-81-energy-efficiency',
    acCodes: ['8.1'],
    regNumbers: ['Chapter 81'],
    changeType: 'new',
    module: 8,
    section: 2,
    was: null,
    now: 'New Chapter 81 — energy efficiency in low-voltage electrical installations. Refers the reader to the Building Regulations (England/Wales, Scotland, Northern Ireland) and to BS HD 60364-8-1:2019 (Low voltage electrical installations Part 8-1: Functional aspects — Energy efficiency).',
    rationale:
      'Replaces the deleted Appendix 17. Energy efficiency moves from informative appendix to a normative chapter.',
    apprenticePrimitive: 'ConceptBlock',
    acceptanceCriteria: [
      'M8 has a Chapter 81 block with the BS HD 60364-8-1 reference',
      'Cross-link to A4-deletion entry for App 17',
      'M9 mock exam has 2–3 Chapter 81 questions',
    ],
  },
  {
    id: 'a4-appendix-4-buried-cables',
    acCodes: ['8.2', '8.3'],
    regNumbers: ['App 4', 'Table 4A2', 'Table 4D4A', 'Table 4E4A', 'Table 4H4A', 'Table 4J4A'],
    changeType: 'modified',
    module: 8,
    section: 4,
    was: 'Buried-cable reference methods used a single set of current-carrying capacities regardless of conduit/duct vs direct-soil contact.',
    now: 'Reference methods for buried cables updated. Distinct methods and current-carrying capacities now apply based on whether the cable is in direct contact with soil or enclosed within a conduit/duct. Tables 4A2, 4D4A, 4E4A, 4H4A and 4J4A revised to reflect this.',
    rationale:
      'Direct-burial vs duct have different thermal environments — pretending they were equivalent oversized some installs and undersized others. A4 fixes this.',
    apprenticePrimitive: 'AppendixTable',
    acceptanceCriteria: [
      'M8 renders revised buried-cable reference methods',
      'Worked example contrasting direct-soil vs duct',
    ],
  },
  {
    id: 'a4-appendix-6-model-forms',
    acCodes: ['8.2', '8.3'],
    regNumbers: ['App 6'],
    changeType: 'modified',
    module: 8,
    section: 5,
    was: 'App 6 condition-report notes used legacy ordering; signature wording was generic; FI was treated as unsatisfactory.',
    now: 'App 6 redrafted: notes for the person producing the condition report rearranged for clarity; signatures confirmed as those of the person(s) executing the inspection/testing and authorising the report for issue; code FI no longer needs to be marked as unsatisfactory.',
    rationale:
      'Aligns the model forms with how reports are actually issued and reduces over-reporting of FI as unsatisfactory (a common false negative).',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: [
      'M8 covers FI-no-longer-unsatisfactory rule',
      'Cross-link to M6 cert form section',
    ],
  },
  {
    id: 'a4-appendix-13-escape-routes',
    acCodes: ['8.2'],
    regNumbers: ['App 13'],
    changeType: 'modified',
    module: 8,
    section: 6,
    was: 'App 13 (Escape routes and fire protection) used pre-Grenfell guidance.',
    now: 'First part redrafted to take account of BS 9991 and BS 9999, and a fire safety strategy prepared by the fire engineer based on appropriate guidance.',
    rationale:
      'Brings BS 7671 fire-strategy guidance into line with the current building-fire-safety standards.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: ['M8 references BS 9991/9999 and fire-engineer strategy'],
  },
  {
    id: 'a4-appendix-17-deleted',
    acCodes: ['8.2'],
    regNumbers: ['App 17'],
    changeType: 'deleted',
    module: 8,
    section: 2,
    was: 'Appendix 17 (Informative) — Energy efficiency.',
    now: 'Deleted. Energy efficiency content promoted to the new (normative) Chapter 81.',
    rationale: 'Promotion from informative to normative — App 17 is no longer needed.',
    apprenticePrimitive: 'AmendmentDiff',
    acceptanceCriteria: [
      'M8 covers App 17 deletion',
      'M9 mock exam has at least one question on App 17 (negative — "which appendix has been deleted")',
    ],
  },
];

/** Quick lookup helpers ─────────────────────────────────────────────── */

export function changesForModule(module: ModuleNumber): A4Change[] {
  return BS7671_A4_CHANGES.filter((c) => c.module === module);
}

export function changeForReg(regNumber: string): A4Change | undefined {
  return BS7671_A4_CHANGES.find((c) => c.regNumbers.includes(regNumber));
}

export function changesByType(type: ChangeType): A4Change[] {
  return BS7671_A4_CHANGES.filter((c) => c.changeType === type);
}
