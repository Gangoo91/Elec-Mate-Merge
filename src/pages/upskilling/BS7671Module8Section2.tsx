import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm8s2-app6-scope',
    question:
      'Which BS 7671 appendix contains the model forms for the Schedule of Inspection, Schedule of Test Results and Schedule of Circuit Details?',
    options: [
      'Appendix 3 — Time/current characteristics',
      'Appendix 4 — Current-carrying capacity',
      'Appendix 6 — Model forms for certification and reporting',
      'Appendix 17 — Energy efficiency',
    ],
    correctIndex: 2,
    explanation:
      'Appendix 6 of BS 7671:2018+A4:2026 holds every model form an installer or inspector uses on the day — EIC, MEIWC, EICR, plus the three schedules: Schedule of Inspection, Schedule of Test Results and Schedule of Circuit Details. The forms are designed to be reproduced (or supplied via certification software) provided that the information conveyed is no less than the model.',
  },
  {
    id: 'm8s2-643-sequence',
    question:
      'Reg 642.3 hands you off to Section 643 for the test sequence on initial verification. Which order is correct for tests applied BEFORE the supply is connected?',
    options: [
      'Insulation resistance, polarity, Zs, RCD time',
      'Continuity of protective conductors, ring final-circuit continuity, insulation resistance, polarity (dead test), then earth-electrode resistance where applicable',
      'Zs, Ze, R1+R2, RCD time, polarity',
      'Phase rotation, then RCD time, then continuity',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.1 onwards sets the dead-test sequence: continuity of protective conductors and main equipotential bonding (643.2.1), continuity of ring final-circuit conductors (643.2.2), insulation resistance (643.3), polarity by dead test (643.6), then earth-electrode resistance where the installation has its own electrode (643.7.2). Live tests — Ze, prospective fault current, Zs, RCD operating time, phase rotation — only follow once the dead-test results are recorded and acceptable.',
  },
  {
    id: 'm8s2-soi-items',
    question:
      "On the model Schedule of Inspection (Appendix 6), each row corresponds to one item from the inspection schedule (e.g. '1.0 Methods of protection against electric shock'). What is the inspector's tick recording?",
    options: [
      'That the item was tested using a calibrated MFT',
      'That the item was visually inspected and found to comply with BS 7671 — or that it is N/A or has been raised as an observation',
      'That the customer agreed the work',
      'That the cable size is correct',
    ],
    correctIndex: 1,
    explanation:
      'The Schedule of Inspection is the visual / non-instrument check. A tick records that the item was inspected and complies with the in-force edition of BS 7671. Items that do not apply (e.g. supplementary bonding in a non-special-location property where it is not required) are marked N/A. Items that fail inspection generate an observation that is then coded on the certificate.',
  },
  {
    id: 'm8s2-test-result-zs',
    question:
      'On the Schedule of Test Results, the inspector records Ze, R1+R2 and Zs for each circuit. What is the relationship the form is asking the inspector to verify?',
    options: [
      'Ze = Zs + R1+R2',
      'Zs ≈ Ze + (R1+R2), with measured Zs cross-checked against the maximum permitted Zs for the protective device',
      'Zs = R1 × R2',
      'Zs is independent of Ze and R1+R2',
    ],
    correctIndex: 1,
    explanation:
      "The earth-fault loop impedance for a final circuit is approximately the impedance from the supply to the consumer's earthing terminal (Ze) plus the impedance of the line and protective conductors of the circuit (R1+R2). Zs measured at the furthest point should agree with Ze + R1+R2 within tolerance, and the figure is then compared to the maximum permitted Zs for the protective device per Reg 411.4.4 / Appendix 3 / OSG App I.",
  },
  {
    id: 'm8s2-a4-tn-c-s-pnb',
    question:
      'The A4:2026 model forms restructure the system earthing dropdown. Which option below was added in A4 to the schedule of circuit details for the supply system?',
    options: [
      'TN-S (separate earth electrode)',
      'TN-C-S (PNB — Protective Neutral Bonding)',
      'IT (no earth)',
      'TN-C (PEN throughout the consumer installation)',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 explicitly distinguishes TN-C-S (PME — Protective Multiple Earthing) from TN-C-S (PNB — Protective Neutral Bonding). PNB is a TN-C-S where there is a single connection between neutral and earth, typically at the supply transformer or origin of the installation, rather than the multiple connections that characterise PME. The new dropdown forces designers to declare which they have, because the fault-analysis and PEN-failure consequences differ.',
  },
  {
    id: 'm8s2-afdd-column',
    question:
      'The A4:2026 Schedule of Test Results adds a new column at the right-hand side. What does it record?',
    options: [
      'The cost of the protective device',
      'The presence and rated current of an Arc Fault Detection Device (AFDD) per Reg 421.1.7, where fitted',
      'The colour of the cable',
      "The customer's signature",
    ],
    correctIndex: 1,
    explanation:
      'A4 adds an AFDD column to the Schedule of Test Results. Where Reg 421.1.7 mandates or recommends AFDDs (HMOs, care homes, student accommodation, purpose-built sleeping accommodation), the column records that the device is present, its rated current, and that it has been operationally tested. Where AFDD is not fitted, the cell records "N/A" — but the burden of justification under Reg 120.3 sits with the designer.',
  },
  {
    id: 'm8s2-osg-zs',
    question:
      'Where would a working electrician most quickly find the maximum permitted Zs values for a Type B 32 A MCB?',
    options: [
      'BS 7671 Appendix 1 — British Standards',
      'IET On-Site Guide (OSG), Appendix I — Maximum permitted Zs for protective devices',
      'BS EN 61009',
      'GN5 — Protection against electric shock',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 itself prints the Zs maxima in Appendix 3 (Tables 41.2 to 41.4) at 230 V at conductor temperature. The IET On-Site Guide reproduces these in Appendix I in a format optimised for site reference, alongside Appendix F (cable-rating correction factors) and Appendix G (voltage-drop tables). For commercial installations the Electricians Guide to the Building Regulations and GN3 also reference the same numbers.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An inspector arrives at a commercial fit-out to issue an EIC. They have the EIC itself, but the contractor has only handed over a Schedule of Test Results. What is the cert pack still missing?',
    options: [
      'Nothing — the EIC and Schedule of Test Results are sufficient',
      'The Schedule of Inspection (visual checks) and the Schedule of Circuit Details — both are required to accompany an EIC under Appendix 6',
      'Just the customer signature',
      'A separate building-control notification',
    ],
    correctAnswer: 1,
    explanation:
      'Per Appendix 6 of BS 7671:2018+A4:2026, the Electrical Installation Certificate (EIC) must be accompanied by the Schedule of Inspection and the Schedule of Test Results. The Schedule of Circuit Details (which lists every circuit, conductor sizes, OPDs, RCDs, reference method) is the third document in the pack — it is the engineering record that lets the next inspector make sense of the test results. Issuing an EIC without the schedules is incomplete and the cert is not defensible.',
  },
  {
    id: 2,
    question:
      'On the Schedule of Inspection, item 1.0 reads "Methods of protection against electric shock". The inspector is checking item 1.1 — basic protection. Which on-site checks are part of that item?',
    options: [
      'Insulation-resistance test at 500 V DC',
      'Visual inspection: insulation of live parts intact, barriers / enclosures (IP rating) appropriate, obstacles where used, placing out of reach where used',
      'Zs measurement at every accessory',
      'RCD operating-time test at 5 IΔn',
    ],
    correctAnswer: 1,
    explanation:
      'The Schedule of Inspection is the VISUAL / non-instrument check. Item 1.1 (basic protection) verifies the Section 416 methods are in place — insulation, barriers/enclosures, obstacles, placing out of reach. The corresponding instrument tests (insulation resistance, Zs, RCD) live on the Schedule of Test Results. Both schedules are required and they cross-reference each other.',
  },
  {
    id: 3,
    question:
      'A Schedule of Test Results column requires the inspector to record "Maximum permitted Zs". Where does that figure come from for a Type C 16 A MCB on a TN-C-S supply at 230 V?',
    options: [
      'It is left blank — only measured Zs is recorded',
      'BS 7671 Appendix 3 Table 41.3 (Type C MCBs), corrected for conductor temperature; OSG Appendix I gives the same values pre-corrected for site use',
      'The MCB packaging only',
      'It is calculated by dividing 230 V by the MCB rating',
    ],
    correctAnswer: 1,
    explanation:
      'Maximum permitted Zs values are tabulated in BS 7671 Appendix 3 (Tables 41.2 Type B, 41.3 Type C, 41.4 Type D, plus the equivalent BS 88-3 fuse and BS 3036 rewireable fuse tables). The OSG Appendix I reprints these in field-friendly form. The number entered is the maximum at the operating temperature assumed — measured Zs (which is taken at ambient) must be below approximately 0.8 of the tabulated value to leave thermal margin (GN3 advises this 80% rule of thumb).',
  },
  {
    id: 4,
    question:
      'A4:2026 changes the Schedule of Circuit Details. Which combination of NEW columns / fields is correctly listed?',
    options: [
      'Cable colour, cable manufacturer, postcode',
      'TN-C-S (PNB) option in supply system, AFDD column with rated current, maximum permitted Zs column, reference method column, SPD type column, "supplied from" cross-reference',
      "A column for the customer's phone number",
      'A column for VAT number only',
    ],
    correctAnswer: 1,
    explanation:
      'A4 reshapes the schedules to capture the new technical requirements: (a) a TN-C-S (PNB) option in the supply-system dropdown so PME and PNB are reported separately, (b) an AFDD column for Reg 421.1.7, (c) a maximum-permitted-Zs column so the design figure sits next to the measured Zs, (d) an explicit reference-method column (so cable-rating assumptions are visible on the cert), (e) an SPD type column (Type 1 / 2 / 3 / 1+2 / 2+3) per Section 443, and (f) a "supplied from" cross-reference so distribution circuits can be traced through the schedule.',
  },
  {
    id: 5,
    question:
      "Reg 642.3 states that testing shall be carried out as specified in Section 643. What is the inspector's primary obligation when filling the Schedule of Test Results?",
    options: [
      'Record only the values that pass; omit any failing test',
      'Apply the Reg 643 test sequence in order, record every required measured value, and code any deviation as an observation on the certificate',
      'Skip the dead tests and rely on live tests only',
      'Test only the circuits the customer asks about',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 642.3 makes the link explicit: testing is carried out in accordance with Section 643, in the prescribed sequence (643.1 onwards), and every required measurement is entered on the Schedule of Test Results. Omitting a value (e.g. leaving the Zs column blank) is itself a failure — the cert is incomplete. Deviations from BS 7671 are recorded under Reg 120.3 with justification; failures generate observations on the certificate (C1 / C2 / C3 / FI on an EICR).',
  },
  {
    id: 6,
    question:
      'An EICR is being produced for a 1990s domestic property. The inspector finds that one circuit has no measurable Zs at the furthest point because the lampholder enclosure provides no test point. What goes on the Schedule of Test Results?',
    options: [
      'Leave the Zs column blank without comment',
      'Estimate Zs by adding R1+R2 (measured at the consumer unit) to Ze and record that figure with a note in the observations explaining the calculation, plus an FI ("Further Investigation") observation if access cannot be safely obtained',
      'Mark the circuit as failing without further work',
      'Record an arbitrary value within tolerance',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 permits a calculated Zs (Ze + R1+R2) where direct measurement at the furthest point is impractical. The calculation is recorded with a clear note. If access to the relevant accessory cannot be safely obtained on the day, an FI observation flags the limitation so the next inspection picks it up. Leaving fields blank or fabricating values is neither.',
  },
  {
    id: 7,
    question:
      'The IET Code of Practice for Electrical Energy Storage Systems is referenced for installations under Section 826 of A4:2026. What is its status relative to BS 7671?',
    options: [
      'It supersedes BS 7671',
      'It is a non-statutory but defensible code that supplements BS 7671 — designers cite it on the cert as the basis for design decisions on battery energy storage',
      'It is a legal requirement under HSWA',
      'It applies only to large industrial installations',
    ],
    correctAnswer: 1,
    explanation:
      'The IET Code of Practice for Electrical Energy Storage Systems (3rd edition) is non-statutory guidance that complements Section 826 of BS 7671. It addresses ventilation, fire separation, location, signage and isolation requirements that BS 7671 does not fully cover for battery energy storage systems (BESS). Citing it on a cert (under "design standards used") is the standard route for demonstrating that the installation has been designed to current best practice.',
  },
  {
    id: 8,
    question:
      'Which combination of UK working tools should the field electrician carry, in priority order, for cert work and EICRs?',
    options: [
      'Just BS 7671 itself',
      'BS 7671:2018+A4:2026 + IET On-Site Guide (Appendix I — Zs maxima, Appendix F — correction factors, Appendix G — voltage drop) + GN3 (Inspection & Testing) — plus manufacturer literature for protective devices and AFDDs',
      'Building Regulations Part P only',
      'A pocket calculator and Wikipedia',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 is the standard. The OSG is the field-friendly companion (cable selection, Zs lookups, voltage-drop tables). GN3 is the IET's Inspection & Testing Guidance Note — it explains the Reg 643 sequence in operational terms and sets out the EICR coding methodology in Section K. Manufacturer literature is needed because RCD type, AFDD compatibility, surge co-ordination and Zs maxima for non-MCB devices live in the data sheet, not the standard.",
  },
];

const faqItems = [
  {
    question: 'How many schedules accompany an Electrical Installation Certificate (EIC)?',
    answer:
      'Three. (1) Schedule of Inspection — the visual / non-instrument checklist with items 1.0 through 17.0+ covering protective measures, system earthing, cabling, accessories, special locations and energy efficiency. (2) Schedule of Test Results — the measured values: Ze, R1+R2, Zs, IR, RCD operating time, polarity, phase rotation, AFDD presence (A4). (3) Schedule of Circuit Details — circuit description, conductor csa, OPD type and rating, RCD type and rating, reference method, SPD type, supplied-from cross-reference. All three are required by Appendix 6 of BS 7671:2018+A4:2026.',
  },
  {
    question: 'Do I have to use the BS 7671 model forms exactly, or can I use my own software?',
    answer:
      'Appendix 6 explicitly permits reproduction in any format, provided the information conveyed is no less than that of the model forms. Certification software (NICEIC Certplus, NAPIT eCert, Elec-Mate, ElectricalCertificates.co.uk, etc.) all use BS 7671-compliant layouts. The risk with bespoke or in-house forms is omission — A4 added several columns (AFDD, max permitted Zs, reference method, SPD type, supplied-from), and a form that pre-dates A4 will not capture them. Always verify your form set is on the A4:2026 edition before issuing certs after 15 April 2026.',
  },
  {
    question: 'Why does A4:2026 split TN-C-S into PME and PNB?',
    answer:
      'TN-C-S (PME) — Protective Multiple Earthing — has multiple connections between neutral and earth along the network, typical of UK distribution. TN-C-S (PNB) — Protective Neutral Bonding — has a single connection point, more common at private generation, sub-station fed installations and some industrial / agricultural sites. The fault-analysis differs: PME tolerates an open PEN further upstream because of the multiple electrode connections; PNB does not. A4 recognises that conflating them on certs hides relevant design information, so the dropdown now offers both explicitly.',
  },
  {
    question:
      'How is the Reg 643 test sequence reflected in the order of columns on the Schedule of Test Results?',
    answer:
      "The columns roughly follow the Reg 643 sequence reading left-to-right: continuity (R1, R2, R1+R2), insulation resistance, polarity by dead test, earth-electrode resistance where applicable, then the live tests — Ze (typically once at origin), Zs at each circuit's furthest point, RCD operating time at IΔn and 5 IΔn, phase rotation. The form is designed so that filling it row-by-row gives you the audit trail Reg 643 demands.",
  },
  {
    question:
      'What does the inspector record in the polarity column when working on a single-phase final circuit?',
    answer:
      'A tick (✓), confirming polarity is correct. Polarity is verified twice — once by the dead test before energising (Reg 643.6) and again by the live test once the supply is connected (Reg 643.6.2). The Schedule of Test Results captures the result; the Schedule of Inspection captures the visual check (item 1.0 / cabling) that the line/neutral/CPC are correctly terminated at every accessory. A reverse-polarity discovery on energising is C1 (danger present, immediate action) on an EICR.',
  },
  {
    question:
      'What is the difference between IR (insulation resistance) values recorded at the Schedule of Test Results and the GN3 acceptance criteria?',
    answer:
      'BS 7671 Table 64 (in Section 643) requires IR ≥ 1.0 MΩ for SELV/PELV and ≥ 1.0 MΩ for LV circuits at 500 V DC test voltage (with all switches closed and equipment that may be damaged disconnected). GN3 reinforces that values < 100 MΩ should be investigated even where they pass — degradation in service often shows long before the 1 MΩ threshold is crossed. Record the actual reading in the column, not just "PASS".',
  },
  {
    question: 'How do I record an N/A item on the Schedule of Inspection?',
    answer:
      'Items that do not apply to the installation (e.g. supplementary equipotential bonding in a domestic kitchen, presence of an earth electrode in a TN-S installation, presence of a generating set) are marked N/A. Avoid blanket N/A entries — each one should have a defensible reason. On a cert audit, an N/A on item 5.0 (Cabling) immediately raises the question: "what cables, then?" so use it deliberately.',
  },
  {
    question:
      'Are Best Practice Guides (BPGs) and the IET Code of Practice on Electrical Energy Storage legally binding?',
    answer:
      'No. BPGs from the IET / Electrical Safety First / NICEIC and IET Codes of Practice are non-statutory guidance. BS 7671 itself is also non-statutory — but compliance with BS 7671 is the benchmark courts and HSE use to assess whether the EAWR 1989 / HSWA 1974 statutory duties were discharged. BPGs and CoPs add another evidence layer: citing the IET CoP for EESS on a Section 826 cert demonstrates that a designer has reached for the recognised supplementary guidance, which is a strong defensive position if the install is later challenged.',
  },
  {
    question:
      'On an EICR, do I tick every item on the Schedule of Inspection or only the items that fail?',
    answer:
      "Every item. The Schedule of Inspection on an EICR records the inspector's opinion on every applicable line item — typically using ✓ (complies), N/A (not applicable), LIM (limitation, see notes), or referencing an observation number for items that fail. Failed items generate observations on the EICR itself, each with a single classification code (C1, C2, C3 or FI per GN3 Section K). A blank cell is not acceptable — it suggests the inspector did not look.",
  },
];

const BS7671Module8Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Schedules, checklists and reference charts | BS 7671:2018+A4:2026 | Module 8.2',
    description:
      'How to fill the BS 7671 schedules — Schedule of Inspection, Schedule of Test Results, Schedule of Circuit Details — including A4:2026 changes (AFDD column, TN-C-S (PNB), max permitted Zs, reference method, SPD type), the Reg 643 test sequence and the working tools (OSG, GN3, BPGs, IET CoP) every site electrician needs.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2 · Updated for A4:2026"
            title="Schedules, checklists and reference charts"
            description="Every cert is only as good as the schedules attached to it. The Schedule of Inspection, Schedule of Test Results and Schedule of Circuit Details — what each row records, how A4:2026 reshapes the columns, and how the Reg 643 test sequence drives the order in which they get filled."
            actions={
              <>
                <RegBadge>App 6</RegBadge>
                <RegBadge>642.3</RegBadge>
                <RegBadge>643.1</RegBadge>
                <AmendmentBadge regs={['421.1.7', '722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Three schedules accompany every EIC: Schedule of Inspection (visual checklist, items 1.0 through 17.0+), Schedule of Test Results (measured values — Ze, Zs, R1+R2, IR, RCD, polarity, phase rotation), Schedule of Circuit Details (the engineering record).',
              'A4:2026 reshapes the schedules: TN-C-S (PNB) added to the supply dropdown, new AFDD column (Reg 421.1.7), maximum permitted Zs column, explicit reference method column, SPD type column, and a "supplied from" cross-reference field.',
              'Reg 642.3 hands testing off to Section 643. The Reg 643 sequence — dead tests first (continuity, IR, polarity, electrode resistance), then live tests (Ze, Zs, RCD, phase rotation) — drives the order in which the Schedule of Test Results is filled.',
              'Working tools: BS 7671 itself, IET On-Site Guide (App I — Zs maxima, App F — correction factors, App G — voltage drop), GN3 (Inspection & Testing), manufacturer literature, IET CoP for EESS, and Best Practice Guides — all non-statutory but cite-able and defensible.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the three schedules that accompany an EIC and state which BS 7671 appendix defines the model forms.',
              'Walk the Schedule of Inspection items 1.0 through 17.0+ and state what each row visually records (covered in detail in Module 6 §2).',
              'Fill a Schedule of Test Results from Ze through R1+R2, Zs, IR, RCD operating time, polarity and phase rotation in the Reg 643 sequence (covered in detail in Module 6 §3).',
              'Identify the A4:2026 changes to the model forms — TN-C-S (PNB) supply option, AFDD column, max permitted Zs column, reference method column, SPD type column, supplied-from field.',
              'Cross-reference the IET On-Site Guide (Appendix I — Zs, Appendix F — correction factors, Appendix G — voltage drop), GN3 (Inspection & Testing) and manufacturer literature when filling a schedule on site.',
              'Distinguish statutory law (EAWR 1989 / HSWA 1974) from non-statutory guidance (BS 7671, GN3, OSG, BPGs, IET CoP for EESS) and explain how each fits in the defensibility chain.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three schedules — what each one is for</ContentEyebrow>

          <ConceptBlock
            title="Schedule of Inspection — the visual / non-instrument checklist"
            plainEnglish="Items 1.0 through 17.0+. Each row is a visual check the inspector performs by eye, by hand or with simple measurement (e.g. enclosure IP rating, presence of CPC, accessory selection, signage)."
            onSite="The schedule is the disciplined walk-through. You start at the origin (item 1.0 — methods of protection against electric shock) and work outwards through the installation. Every row gets ✓, N/A, LIM or an observation reference. A blank cell is not an option — it tells the next inspector you did not look."
          >
            <p>
              Item 1.0 covers methods of protection against electric shock — basic protection
              (Section 416), fault protection (Section 411), additional protection (Section 415).
              Item 2.0 covers prevention of mutual detrimental influence. Item 3.0 covers
              identification (cabling, distribution boards, conductors). Items 4.0 to 6.0 cover
              cabling, conductor connections and protection against overcurrent. Items 7.0 onwards
              cover specific protective measures, special locations (Part 7), and energy efficiency
              (added in A4 as item 17.0). The detailed item-by-item walk-through is in Module 6 §2.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <ConceptBlock
            title="Schedule of Test Results — the measured-values record"
            plainEnglish="The instrument-test record. Ze at origin, R1+R2 per circuit, Zs at the furthest point of every circuit, insulation resistance, RCD operating time at IΔn and 5 IΔn, polarity by dead and live test, and phase rotation on three-phase distributions."
            onSite="The test column order roughly follows the Reg 643 sequence. Fill the dead-test columns left-to-right before energising; fill the live-test columns once the supply is connected. Tick polarity at every accessory not just the DB."
          >
            <p>
              Each row of the Schedule of Test Results corresponds to one circuit on the Schedule of
              Circuit Details. The columns capture Ze (taken once at the origin and propagated to
              every row), R1, R2 and R1+R2 (measured per circuit by short-circuit-and-test or
              wandering-lead method), insulation resistance (live-to-earth, live-to-live, neutral-
              to-earth as required), polarity, Zs, RCD operating time at IΔn and 5 IΔn (and where
              required at IΔn × 0.5 to verify non-trip), and phase rotation. The Reg 643 sequence
              and acceptance criteria are covered in detail in Module 6 §3.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <ConceptBlock
            title="Schedule of Circuit Details — the engineering record"
            plainEnglish="The 'how it was designed' document. Circuit description, line conductor csa, CPC csa, reference method, OPD type and rating, RCD type and rating, SPD type, AFDD presence, supplied-from cross-reference."
            onSite="This is the schedule the next inspector reads first. If the test results look anomalous, the engineering record on the Circuit Details schedule explains why — e.g. why the kitchen ring is 4 mm² (long run, voltage-drop driven), why the EV charger is on a Type A RCBO not Type AC (built-in 6 mA DC detection), why the upstairs lighting circuit has an SPD Type 2 (rural exposure)."
          >
            <p>
              The Schedule of Circuit Details on A4:2026 is materially richer than its A2 / A3
              predecessor. The new columns force the designer to publish the assumptions: reference
              method (so cable rating is auditable against Appendix 4), SPD type per Section 443,
              maximum permitted Zs (so the design figure sits next to the measured value), AFDD
              presence per Reg 421.1.7, and a supplied-from cross-reference so distribution boards
              can be traced through the schedule. A4 schedule changes are in §3 of this module.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>
            The Reg 643 test sequence — and how it drives the schedule
          </ContentEyebrow>

          <ConceptBlock
            title="Reg 642.3 hands you off to Section 643"
            plainEnglish="Reg 642.3 says testing on initial verification shall be carried out as specified in Section 643. Section 643 is the playbook — what to test, in what order, against what acceptance criteria."
            onSite="Working through Section 643 sequentially also fills the Schedule of Test Results sequentially. The form is designed for this — column order roughly mirrors test order. Skip a step, leave a blank, and the cert is incomplete."
          >
            <p>
              The headline order is dead tests first, live tests second. Reg 643.2.1 covers
              continuity of protective conductors and main equipotential bonding. Reg 643.2.2 covers
              continuity of ring final-circuit conductors (the three-test ring sequence). Reg 643.3
              covers insulation resistance — typically 500 V DC test voltage on LV circuits, 250 V
              on SELV/PELV. Reg 643.4 covers protection by SELV / PELV / electrical separation. Reg
              643.5 covers basic protection by barriers / enclosures applied during erection. Reg
              643.6 covers polarity by dead test. Reg 643.7.2 covers earth-electrode resistance (TT
              or TN-installations with their own electrode).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.3 — Initial verification: testing"
            clause="Testing of an initial verification shall be carried out in accordance with Section 643. The tests of Section 643, where relevant, shall be carried out in the prescribed sequence."
            meaning="The sequence isn't optional. Reg 642.3 mandates not just that the tests are done, but that they're done in the order Section 643 sets out — because the early tests (continuity, IR, polarity) protect against energising a circuit that would damage instruments or people during the later live tests."
            cite="BS 7671:2018+A4:2026, Reg 642.3"
          />

          <ConceptBlock
            title="Live tests follow once the dead tests pass"
            plainEnglish="Energise. Then Ze (Reg 643.7.3), then prospective fault current (Reg 643.7.4), then Zs at every circuit's furthest point (Reg 643.7.5), then RCD operating time at IΔn and 5 IΔn (Reg 643.8), then phase rotation on three-phase (Reg 643.9), then functional testing of switchgear, controls and interlocks (Reg 643.10)."
            onSite="The Schedule of Test Results columns line up with this order. Once the dead-test side of the form is complete, you energise, take Ze at origin, and propagate that figure across every row before walking the property to fill the Zs, RCD time and (where applicable) phase-rotation columns."
          >
            <p>
              Ze is measured at the origin with the installation isolated from the supply earth and
              the means of earthing reconnected via the test instrument. Prospective fault current
              (PFC) is measured at the origin and recorded as the higher of prospective short-
              circuit current and prospective earth-fault current. Zs at the furthest point of each
              circuit is then either measured directly or calculated as Ze + (R1+R2) — both methods
              are accepted by GN3 provided the calculation is clearly noted. RCD operating time is
              measured at IΔn (must operate within 300 ms for Type AC/A general, 40 ms for Type S up
              to 5 IΔn — see BS EN 61008/61009) and at 5 IΔn (must operate within 40 ms).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>A4:2026 schedule changes — the new columns</ContentEyebrow>

          <ConceptBlock
            title="TN-C-S (PNB) added to the supply-system dropdown"
            plainEnglish="A4 splits TN-C-S into PME (Protective Multiple Earthing — multiple N-PE connections, typical UK DNO supply) and PNB (Protective Neutral Bonding — single N-PE connection, more typical of private generation, agricultural and sub-station fed installations)."
            onSite="The choice matters for fault analysis. PME tolerates an open PEN further upstream because the multiple electrode connections share the elevated potential; PNB has only the one connection point and a broken PEN above that point puts the entire CPC system at risk. The dropdown forces the designer to declare what's actually there, which means the cert holder has to know — not assume."
          />

          <ConceptBlock
            title="AFDD column (Reg 421.1.7)"
            plainEnglish="A new column on the Schedule of Test Results records the presence and rated current of any Arc Fault Detection Device. Where AFDD is mandated (HMOs, care homes, student accommodation, purpose-built sleeping accommodation), the column records the device. Where it isn't fitted, the column records 'N/A' — but the burden of justification rests with the designer per Reg 120.3."
            onSite="AFDD presence is a yes/no on the form, but the design rationale (why fitted / why omitted) belongs on the certificate's design declaration. A4 also adds AFDD operational testing to the live-test sequence — push the test button, confirm trip."
          >
            <p>
              Reg 421.1.7 (added in A4) recommends — and in some occupancies mandates — Arc Fault
              Detection Devices on AC final circuits up to 32 A. The recommendation hardens to a
              "shall" in higher-risk sleeping-accommodation occupancies. The cert column, the design
              declaration and the operational test together form the AFDD compliance trail.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Maximum permitted Zs column"
            plainEnglish="A4 adds a column for the design (maximum permitted) Zs alongside the measured Zs. The two figures sit next to each other on the form, so the inspector's compliance check is at-a-glance: measured ≤ max permitted, with margin."
            onSite="The design figure comes from BS 7671 Appendix 3 (Tables 41.2 / 41.3 / 41.4 for Type B / C / D MCBs, plus the BS 88-3 fuse and BS 3036 rewireable fuse tables) — or OSG App I. Apply the GN3 80% rule: measured Zs at ambient should be ≤ 0.8 × tabulated Zs at operating temperature, to leave thermal margin."
          />

          <ConceptBlock
            title="Reference method column"
            plainEnglish="A4 adds an explicit column for the reference installation method (Reference Method A through G of Appendix 4 — clipped direct, conduit, trunking, buried, etc.). Cable rating depends on the method, so publishing it on the cert makes the rating audit-able."
            onSite="A 2.5 mm² T&E clipped direct (Method C) has Iz ≈ 27 A (depending on grouping and ambient). The same cable in conduit on insulation (Method 102) drops to ≈ 19 A. The Schedule of Circuit Details column closes the loophole where a designer claimed a method on paper that didn't match site reality."
          >
            <p>
              The reference methods are listed in Appendix 4 Table 4A2 of BS 7671. The OSG Appendix
              F provides the field-friendly cross-reference plus correction factors for grouping
              (Cg), ambient temperature (Ca), and thermal insulation (Ci). Ca × Cg × Ci applied to
              Iz tabulated gives the design Iz; Iz must equal or exceed In, and In must equal or
              exceed Ib, per Reg 433.1.1.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="SPD type column and supplied-from cross-reference"
            plainEnglish="A4 adds an SPD type column (Type 1 / 2 / 3 / 1+2 / 2+3) per Section 443 — so the cert records the surge-protection arrangement. A4 also adds a 'supplied from' cross-reference so distribution boards can be traced through the schedule by their parent circuit."
            onSite="SPD column: Type 1 for direct-strike protection at origin (taller commercial / industrial), Type 2 at consumer units / distribution boards (the default LV install), Type 3 close to sensitive loads, with Type 1+2 and 2+3 combination devices common in modern UK CUs. Supplied-from: every sub-board's row points to the originating circuit ID on the parent board's schedule, so the chain is followable."
          >
            <p>
              The supplied-from field plugs a long-standing gap in EICRs of larger installations.
              Without it, a sub-board's circuit details sat in isolation and the chain back to the
              origin had to be reconstructed from drawings (if they existed). With it, every row has
              an upstream parent and the cert pack tells its own story.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />
          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>UK working tools — what to actually carry</ContentEyebrow>

          <ConceptBlock
            title="IET On-Site Guide (OSG) — the field companion"
            plainEnglish="The OSG is BS 7671 Appendix 3 / Appendix 4 reformatted for field use. Appendix I — Zs maxima for protective devices. Appendix F — cable-rating correction factors. Appendix G — voltage drop tables."
            onSite="OSG App I is the table you reach for first. Type B 32 A on a 230 V TN at conductor temperature: Zs(max) = 1.37 Ω. The OSG also gives the un-corrected (ambient temperature) figure of 1.10 Ω — applying the GN3 80% rule of thumb. App F: 70°C copper to 90°C XLPE conversion factors. App G: voltage drop in mV / A / m for every cable size — direct lookup for compliance with Reg 525.1."
          >
            <p>
              The OSG is updated to reflect each amendment of BS 7671. The current edition (OSG to
              BS 7671:2018+A4:2026) reproduces the amended Appendix 3 tables with the A4 changes
              built in, plus a new appendix on AFDDs and updated guidance on EV charging in TN-C-S.
              Carrying the wrong-edition OSG on site is a small but real risk — verify the amendment
              level on the cover before quoting Zs maxima from it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="GN3 — Guidance Note 3, Inspection & Testing"
            plainEnglish="GN3 is the IET's operational guidance on Section 643. It sets out the test sequence in plain language, the acceptance criteria for each test, and the EICR observation-coding methodology in Section K (C1 / C2 / C3 / FI)."
            onSite="GN3 is the document the inspector reaches for when asked 'why is this a C2 not a C3?' Section K of GN3 lays out the codes with worked examples. It also covers the calculated-Zs method (Ze + R1+R2) for circuits where direct measurement isn't safe or practical, and the IR limits at conductor temperature."
          />

          <ConceptBlock
            title="Manufacturer literature — RCDs, AFDDs, MCBs"
            plainEnglish="The standard gives generic Zs maxima for a Type B MCB at 230 V. The manufacturer's data sheet gives the actual figure for that specific device — and for non-MCB protective devices (Type B RCDs for EV, Type 1+2 SPDs, AFDDs) it's the only reliable source."
            onSite="Wylex, Hager, MK, Schneider, ABB, Eaton — all publish device characteristics including I²t, magnetic let-through, surge withstand, and (for AFDDs) compatibility with parallel devices on the same busbar. Cite the manufacturer in the cert's design declaration when the device choice matters — e.g. 'AFDD per Reg 421.1.7, Hager XEC610 per manufacturer data sheet rev 03.2026.'"
          >
            <p>
              For RCD type selection on EV charging circuits (Reg 722.531.3.101), manufacturer data
              is mandatory: the spec sheet states whether the charger has built-in 6 mA DC fault
              detection, which determines whether Type A or Type B RCD is required upstream.
              Choosing the wrong type without consulting manufacturer literature is one of the most
              common A4-era cert defects.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="IET Code of Practice for Electrical Energy Storage Systems (EESS)"
            plainEnglish="A non-statutory but widely-cited code that sits alongside Section 826 of A4:2026. Covers BESS (battery energy storage) location, ventilation, fire separation, signage, isolation and inspection requirements that BS 7671 alone does not fully address."
            onSite="On a Section 826 cert (PV with battery, off-grid systems, hybrid solar storage), cite the IET CoP for EESS in the design declaration — e.g. 'Designed in accordance with BS 7671:2018+A4:2026 and IET Code of Practice for Electrical Energy Storage Systems, 3rd edition.' This shows the design has reached for the recognised supplementary guidance, which is the defensive position if the install is later challenged."
          />

          <ConceptBlock
            title="Best Practice Guides (BPGs) — IET / Electrical Safety First / NICEIC"
            plainEnglish="Short, focused guides on specific high-risk topics: BPG3 (Replacing a consumer unit), BPG4 (Inspection & testing), BPG5 (PME and TT supplies), BPG7 (Periodic inspection — domestic), and the Electrical Safety First Best Practice Guide on EV charging."
            onSite="BPGs are non-statutory but defensible. They condense the practical 'how to do this safely on the day' guidance into 4-12 page documents written for working electricians. Citing a BPG in the cert's design declaration is the same evidential move as citing the IET CoP for EESS — it shows the work has been done against recognised practice."
          >
            <p>
              The legal status chain is: EAWR 1989 / HSWA 1974 (statutory law) → BS 7671 (the
              non-statutory benchmark courts use to assess statutory compliance) → GN3 / OSG (IET
              guidance on applying BS 7671) → BPGs / IET CoPs (focused supplementary guidance) →
              manufacturer literature (binding for device-specific compliance). The cert's
              defensibility is the cumulative weight of every link in that chain that you cite.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>How to fill a Schedule of Test Results — step by step</ContentEyebrow>

          <ConceptBlock
            title="From Ze at the origin to phase rotation at the furthest sub-board"
            plainEnglish="A walk-through. Eight ordered steps that move you from instrument-on-the-bench to a fully-completed schedule, in the Reg 643 sequence."
            onSite="This is the order to actually walk the job. Do dead tests first — the live tests rely on the dead tests passing. Record every value in the column even if it 'looks fine' — the cert's defensibility is the audit trail, not the inspector's recall."
          >
            <p>
              <strong>1. Setup.</strong> MFT calibrated within 12 months, leads under test (lead
              null on continuity, IR self-test). Photograph the calibration certificate or
              instrument display before starting. <strong>2. Continuity (Reg 643.2.1).</strong> R1 +
              R2 at the consumer unit by short-circuit-and-test (line and CPC linked at the consumer
              unit, low-resistance ohmmeter at each accessory) or by wandering lead. R2 alone for
              protective conductors / supplementary bonding.{' '}
              <strong>3. Ring final- circuit continuity (Reg 643.2.2).</strong> The three-test ring
              sequence — end-to-end continuity of L, N, CPC; cross-link L to N and verify uniform
              low resistance at every accessory; cross-link L to CPC and verify the same.{' '}
              <strong>4. Insulation resistance (Reg 643.3).</strong> 500 V DC, line-to-earth,
              line-to-line (with all switches closed and electronic equipment disconnected). Record
              actual reading, not just "PASS".{' '}
              <strong>5. Polarity by dead test (Reg 643.6).</strong> At every accessory.{' '}
              <strong>6. Earth-electrode resistance (Reg 643.7.2).</strong> Where the installation
              has its own electrode (TT, or TN-installations with a private electrode for telecoms /
              lightning protection). Three-pole or stake-and-loop method.
              <strong> 7. Energise. Live tests.</strong> Ze at origin, PFC, Zs at every circuit's
              furthest point, RCD operating time at IΔn and 5 IΔn (and at IΔn × 0.5 to verify
              non-trip where required), phase rotation on three-phase.{' '}
              <strong>8. Sign and schedule.</strong> Cross-check measured Zs against max permitted
              Zs (A4 column), cross-check measured RCD time against device standard, code any
              deviation as an observation, sign the cert.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            The relationship between the schedules and the Reg 643 sequence
          </ContentEyebrow>

          <ConceptBlock
            title="Schedule of Inspection drives Reg 643.5; Schedule of Test Results drives Reg 643.2 onwards"
            plainEnglish="The two schedules aren't independent — they map onto different parts of Section 643. The Schedule of Inspection is largely Reg 643.5 (basic protection by barriers / enclosures applied during erection) plus the visual ratification of protective measures from Sections 411 / 412 / 414 / 415. The Schedule of Test Results is Reg 643.2 onwards — the instrumented tests."
            onSite="The two schedules cross-reference each other. If a circuit's Zs measurement on the test schedule is anomalous, the inspection schedule's item 1.0 (methods of protection) and item 4.0 (cabling) are where the visual investigation starts."
          >
            <p>
              An EICR inspector reads both schedules together. Schedule of Inspection item 1.0
              ticked but Schedule of Test Results Zs over the limit? That's a contradiction the
              inspector has to resolve before signing — typically by re-inspecting item 1.0 (visual
              condition of CPC terminations, presence of bonding, integrity of the means of
              earthing) and re-measuring the test result. The cert is the integrated view; the
              schedules are the working papers behind it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Issuing an EIC with only one schedule attached"
            whatHappens="Contractor hands the customer the EIC plus the Schedule of Test Results. The Schedule of Inspection (visual) and Schedule of Circuit Details (engineering record) are missing. Customer's insurer / mortgage provider rejects the cert pack — installation is treated as un-certified for insurance purposes despite being physically complete."
            doInstead="Every EIC requires all three schedules per Appendix 6. Use certification software that auto-generates the full pack, and verify the export before issuing. The three schedules are not optional — they are the cert."
          />

          <CommonMistake
            title="Using the wrong cert version (pre-A4 schedules on a post-A4 install)"
            whatHappens="Installer issues an EIC after 15 April 2026 using A2 / A3 model forms. The A4-mandated columns — TN-C-S (PNB), AFDD, max permitted Zs, reference method, SPD type, supplied-from — are absent. The cert is technically incomplete; an inspector reviewing it later cannot verify A4 compliance from the document alone."
            doInstead="Verify the cert software is on the A4:2026 model forms before 15 April 2026. NICEIC, NAPIT, ECA and all major certification platforms publish the changeover date. If your software hasn't updated, raise it with the provider — issuing pre-A4 forms after the in-force date is itself a Reg 120.3 deviation that needs justifying."
          />

          <CommonMistake
            title="Leaving Schedule of Test Results columns blank"
            whatHappens="Inspector finishes the day having taken every reading but transcribed only some onto the schedule. Polarity column blank on three circuits. R2 blank where R1+R2 was measured directly. RCD operating-time at 5 IΔn missing because 'it tripped fine.' On audit, the cert is incomplete — a blank cell tells the next inspector the test was not done, not that it was done and forgotten."
            doInstead="Every required cell gets a value. If a measurement is N/A for the circuit (e.g. RCD time on an MCB-only circuit), enter N/A, not blank. If a measurement was taken but cannot be transcribed for a defensible reason (instrument failure mid-test), record that as an observation with a follow-up FI code. Blank is never the answer."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Commercial fit-out — full cert pack for a 200 m² office refurbishment"
            situation="Contractor has rewired a tenant's office in a multi-tenant commercial building. Single-phase TN-S supply from the landlord's MET, new sub-main to a tenant DB with 18 ways, mix of socket / lighting / data / HVAC final circuits, AFDDs on socket circuits per the building owner's specification (above the Reg 421.1.7 mandate). 12 calendar days from energise to handover."
            whatToDo="Issue the cert pack as: (1) Electrical Installation Certificate signed by the designer, constructor and inspector; (2) Schedule of Inspection — every applicable item 1.0 through 17.0+ ticked, with N/A on items not relevant (e.g. supplementary bonding, item 8.0 special locations); (3) Schedule of Test Results — every circuit on its own row, full dead-test column complete (continuity, IR, polarity), Ze at origin, Zs at each circuit's furthest point, RCD operating time at IΔn and 5 IΔn for every RCD-protected circuit, AFDD operational test result; (4) Schedule of Circuit Details — every circuit with conductor csa, OPD type and rating, RCD type and rating, reference method, SPD type, AFDD presence, supplied-from cross-reference to the sub-main."
            whyItMatters="A commercial fit-out cert is a planning-permission, building-control, insurance and lease document at the same time. Each of those parties reads a different schedule first — the building owner's surveyor reads the Schedule of Circuit Details to verify the engineering matches the agreed design; the insurer reads the Schedule of Inspection to verify visual compliance; the next inspector (typically at lease-end EICR) reads the Schedule of Test Results to verify the measured values. All three schedules complete and consistent = the cert is unchallengeable. Any one missing or inconsistent = months of follow-up correspondence."
          />

          <Scenario
            title="Residential EICR on a 2008 domestic property with mixed observations"
            situation="Inspector visits a 4-bed detached house, 14-way Wylex CU split-load (RCD on the right-hand bank only), TN-C-S supply, original 2008 installation with later additions (kitchen rewire 2017, EV charger 2024, garage outbuilding 2023). Eight observations identified during the survey: lighting circuit on the non-RCD bank (no 30 mA additional protection), kitchen ring final continuity reading suggests one socket reverse-polarity, EV charger upstream RCD is Type AC (charger spec sheet states integrated 6 mA DC detection — Type A would be correct), garage CPC continuity to outbuilding 4.2 Ω (out of spec for Reg 411.5.3 RCD-on-TT condition), three accessories with damaged faceplates, no AFDD on socket circuits, supplementary bonding present in bathroom but undocumented on schedule, SPD absent."
            whatToDo="Issue the EICR as: (1) EICR with overall classification (likely 'unsatisfactory' on the strength of the C2 observations); (2) Schedule of Inspection with every item ticked, N/A or LIM as appropriate, with observation numbers cross-referenced to (3) the observations table on the EICR — each observation coded (C1 reverse polarity → immediate, C2 lighting circuit on non-RCD + EV Type AC → potentially dangerous, C3 no SPD + no AFDD → improvement recommended, FI undocumented bonding → further investigation); (4) Schedule of Test Results — every circuit measured, anomalies highlighted in the observations, calculated Zs noted where direct measurement was impractical."
            whyItMatters="A 2008 install can't be EICR'd against 2008 BS 7671 — the EICR records compliance with the in-force edition (A4:2026). The C codes reflect risk under today's standard, and the schedules are the working evidence. If the customer challenges any code, the schedules are what you point at. If the customer's insurer asks 'why C2 on the lighting circuit?', the answer is 'item 1.3 of the Schedule of Inspection (additional protection by RCD on socket-outlet circuits and (A4) on luminaire circuits in domestic premises), cross-referenced to observation 2 of the EICR, with the lighting circuit on the non-RCD bus on the Schedule of Test Results.' The chain is the cert's defensibility."
          />

          <SectionRule />

          <ContentEyebrow>
            Putting it all together — the cert pack as a single document
          </ContentEyebrow>

          <ConceptBlock
            title="EIC + 3 schedules = one defensible record"
            plainEnglish="The cert and its schedules don't make sense in isolation. The cert summarises; the Schedule of Inspection visualises; the Schedule of Test Results measures; the Schedule of Circuit Details engineers. Read together, they are a complete account of the installation."
            onSite="Treat the cert pack as the deliverable, not the cert alone. Bind / staple them together. Number the pages. Include the design declaration, the test instrument calibration certificate reference, and any supplementary documentation (e.g. risk assessment for a Reg 411.3.3(b) socket exception, IET CoP citation for a Section 826 BESS install). One PDF, one folder, one record."
          >
            <p>
              The discipline is the same on every job, scaled up or down by complexity. A simple
              MEIWC has a built-in single-page schedule. An EIC has three separate schedules. A
              large multi-DB commercial cert has three schedules per board with a master cross-
              reference. The form scales; the content discipline does not. Every required cell
              filled, every observation cross-referenced, every assumption (reference method, SPD
              type, AFDD presence, manufacturer data) declared. That is the cert pack the insurer,
              the next inspector, the building owner and (in the worst case) the court read.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Three schedules accompany every EIC per Appendix 6 of BS 7671:2018+A4:2026 — Schedule of Inspection (visual), Schedule of Test Results (measured values), Schedule of Circuit Details (engineering record). All three are required.',
              'A4:2026 reshapes the schedules: TN-C-S (PNB) added to supply dropdown, new AFDD column (Reg 421.1.7), max permitted Zs column, explicit reference method column, SPD type column, supplied-from cross-reference.',
              'Reg 642.3 mandates the Section 643 test sequence — dead tests first (continuity, IR, polarity, electrode resistance), then live tests (Ze, PFC, Zs, RCD time, phase rotation). The schedule columns mirror that order.',
              'Working tools: BS 7671 + IET On-Site Guide (App I Zs maxima, App F correction factors, App G voltage drop) + GN3 (Inspection & Testing) + manufacturer literature + IET CoP for EESS + Best Practice Guides. All non-statutory but each layer adds defensibility.',
              'Every required cell on every schedule gets a value — ✓, N/A, LIM, observation reference, or measured number. A blank cell is never the answer.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-8-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.3 Amendment 4 highlights
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module8Section2;
