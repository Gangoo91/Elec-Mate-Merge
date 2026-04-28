import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  AmendmentBadge,
  CommonMistake,
  ConceptBlock,
  ContentEyebrow,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegBadge,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm6s2-visual-precedes-testing',
    question:
      'You arrive on site to verify a new consumer unit change. The board is energised. According to BS 7671:2018+A4:2026, what is the correct sequence?',
    options: [
      'De-energise, run all dead tests, then perform a visual inspection at the end',
      'Carry out a visual inspection FIRST (Reg 642.2), preferably with the installation isolated, then proceed to dead tests, then live tests',
      'Live tests first, dead tests next, visual at the end as a sense-check',
      'Visual inspection is only required where dead-test results suggest a problem',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642.2 is unambiguous: the visual inspection shall be carried out PRIOR to testing, normally with the installation disconnected from the supply. The sequence is fixed for a reason — half the defects an inspector finds (missing labels, wrong cable colours, loose terminations, no CPC at an accessory) are visible without an instrument. Skipping the visual to "save time" is the single most common audit failure. Reg 643 then sets the testing sequence (continuity, IR, polarity, Zs, RCD).',
  },
  {
    id: 'm6s2-schedule-of-inspection-purpose',
    question:
      'What is the actual function of the Schedule of Inspection on an EIC under BS 7671:2018+A4:2026?',
    options: [
      'A list of optional checks the inspector may perform if time permits',
      'A formal record demonstrating that every applicable item required by Reg 642.2 has been inspected and either passed, failed, or marked not applicable — with the inspector taking professional responsibility for each tick',
      'A summary printed by the test instrument automatically',
      'A marketing document for the customer',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 6 (model forms) plus Reg 642.2 make the Schedule of Inspection part of the EIC. Each numbered item (1.0 through 17.0+ in A4) corresponds to a specific group of regulations. A tick is a professional declaration that the requirement was checked and met; a cross declares non-compliance; N/A declares the item does not apply. Leaving items blank invalidates the cert — there is no "did not check" option in the schema.',
  },
  {
    id: 'm6s2-afdd-item-4-23',
    question:
      'Under A4:2026, item 4.23 of the Schedule of Inspection asks the inspector to verify what?',
    options: [
      'AFDD presence on every final circuit, regardless of premises type',
      'AFDD presence on AC final circuits supplying socket-outlets up to 32 A in higher-risk residential buildings (HRRBs), care homes, HMOs and similar — per Reg 421.1.7',
      'AFDD presence only on three-phase boards',
      'AFDD operational test result, not its physical presence',
    ],
    correctIndex: 1,
    explanation:
      'Reg 421.1.7 (A4) requires AFDD additional protection on AC final circuits supplying socket-outlets rated up to 32 A in specific premises: higher-risk residential buildings (purpose-built blocks of flats over 18 m or 7 storeys), HMOs, care homes, and certain other higher-risk occupancies. Item 4.23 of the Schedule of Inspection is the new tick-box that records compliance. For ordinary single-family dwellings AFDDs are recommended (NOTE in 421.1.7) but not mandatory — the schedule then expects N/A.',
  },
  {
    id: 'm6s2-514-circuit-chart',
    question:
      'During inspection of a domestic CU change, the inspector finds the consumer unit has all RCBOs labelled correctly but no circuit chart inside the cover or at the origin. What action is correct?',
    options: [
      'No action — Reg 514 only requires labels on the devices themselves',
      'Issue the EIC and add the circuit chart later',
      'Treat as non-compliance with Reg 514.9 — a circuit chart, table or schedule shall be provided at every distribution board; the EIC schedule of inspection cannot tick item 7.1 until it is in place',
      'A circuit chart is only required for three-phase boards',
    ],
    correctIndex: 2,
    explanation:
      'Reg 514.9.1 requires that a durable copy of the certificate, together with a chart, table or schematic showing the type and composition of each circuit, the means of identification of devices for protection, isolation and switching, and information enabling protective devices to be identified, shall be provided at the origin. Item 7.1 (Identification — Section 514) on the Schedule of Inspection cannot be ticked without it. The schedule of test results (printed list of circuits) on the EIC does NOT replace the on-site chart — both are required.',
  },
  {
    id: 'm6s2-cable-colour-table-51',
    question:
      'You are inspecting a 2026 install. A three-phase distribution circuit uses red / yellow / blue conductor identification throughout. Per BS 7671 Table 51 cable colours, what is the correct call?',
    options: [
      'Pass — red / yellow / blue is the current harmonised standard',
      'Pass — colours are aesthetic only and not part of inspection',
      'Fail — Table 51 (harmonised colours since 2004) requires brown / black / grey for L1 / L2 / L3 in three-phase AC; red/yellow/blue is the pre-harmonised standard and must not be used in new installations. Where mixed colours occur from alteration to existing, durable warning notices are required at every distribution board',
      'Fail — but only if the cables are surface-mounted',
    ],
    correctIndex: 2,
    explanation:
      'Table 51 mandates brown (L1), black (L2), grey (L3), blue (N) and green-and-yellow (CPC). Red/yellow/blue is the pre-2004 BS 7671 colour scheme and is non-compliant on any new installation. Reg 514.14 requires a durable warning notice at the origin and at any distribution board where old-and-new colours coexist after an alteration. Item 7.4 on the Schedule of Inspection (warning notice — non-standard colours) is the explicit tick. A4 has not changed the harmonised colours but it has tightened the warning-notice requirements where dual-colour systems appear.',
  },
  {
    id: 'm6s2-bonding-omission',
    question:
      'During inspection of a bathroom rewire, the inspector finds the property has 30 mA RCD on every bathroom circuit, all disconnection times are met, BUT the incoming cold-water plastic pipe is connected via a copper tail under the sink and no main bonding has been run to that copper tail. What is the correct call?',
    options: [
      'Pass — RCDs are present so no bonding required',
      'Pass — plastic incoming pipe means there is no extraneous-conductive-part requiring bonding',
      'Wait — verify with continuity test (Reg 643.2.2) whether the copper section is still an extraneous-conductive-part by measuring resistance to earth at the MET; if below 23 kΩ at 230 V it is extraneous and main bonding under Reg 411.3.1.2 / 544.1.1 is required',
      'Fail — main bonding is always required to every metal pipe regardless',
    ],
    correctIndex: 2,
    explanation:
      'A pipe is an extraneous-conductive-part only if it can introduce a potential (typically earth potential) into the installation. The text-book test is the Reg 643.2.2 / GN3 procedure: measure the resistance between the suspect part and the MET. If the value is at or above 23 kΩ (calculated for touch voltage no more than 50 V at 230 V) it is not extraneous — bonding can be omitted. Below that, bond. The plastic incoming section breaks the earth path only IF the metal section beyond it is not extraneous through some other route (e.g. structural metal contact). The schedule of inspection (item 4.5 main protective bonding) forces this thinking before any tick goes on the cert.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Reg 642.2 places visual inspection BEFORE testing for one principal reason. Which reason most accurately captures the regulation's intent?",
    options: [
      'It saves the inspector time at the end of the day',
      'Visual inspection identifies defects (damage, wrong components, missing labels, incorrect connections) that could make subsequent live testing dangerous OR could already explain a fault — sequencing it first protects the inspector and prevents wasted instrument time',
      'The order is purely administrative',
      'Live testing must come first to confirm the supply is present',
    ],
    correctAnswer: 1,
    explanation:
      'The Reg 642.2 ordering is a safety-critical sequencing rule. A live test on a circuit with a missing CPC, an incorrectly wired socket, or a damaged enclosure can injure the inspector and damage the test instrument. Doing the visual first lets the inspector identify and rectify safety issues before any energised test, AND lets them mark items as already failed without wasting test time. Reg 642.3 then requires the testing sequence of Reg 643 — itself ordered (continuity, IR, polarity, Zs, RCD) so that a faulty circuit fails on a benign test before a punishing one.',
  },
  {
    id: 2,
    question:
      'The Schedule of Inspection on an A4:2026 EIC contains item 4.23. Which of the following is the correct tick rule for a single-family dwelling EICR?',
    options: [
      'Tick — AFDD always required',
      'Cross — AFDD missing means non-compliant',
      'N/A — Reg 421.1.7 mandates AFDDs only in higher-risk premises (HRRBs, care homes, HMOs etc.); for ordinary dwellings AFDD is recommended (NOTE) but not mandatory, so item 4.23 is N/A',
      'Leave blank — N/A is not permitted',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 421.1.7 lists the premises where AFDDs SHALL be installed: higher-risk residential buildings, care homes, houses in multiple occupation and similar. Single-family dwellings are not in scope of the mandate; the NOTE expresses a recommendation only. The schedule of inspection schema permits N/A and that is the correct entry — leaving blank invalidates the cert; ticking falsely declares compliance with a regulation that does not apply.',
  },
  {
    id: 3,
    question:
      'A new domestic CU is found to have one circuit labelled "Cooker" but actually feeding the shower, and another labelled "Shower" feeding the cooker. The cables, RCBOs and protective devices are otherwise correct. What is the correct inspection action?',
    options: [
      'Code C3 only — labels are aesthetic',
      'No action — the circuits work',
      'Code C2 — incorrect identification breaches Reg 514.1.1; an emergency isolator pulled for the labelled circuit will leave the actual circuit live, presenting a real shock risk to the next person to work on it. Item 7.1 on the schedule of inspection cannot be ticked',
      'Code C1 only if the cables are unsafe',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 514.1.1 requires identification to enable safe isolation. Wrong labels create a foreseeable shock hazard: the next electrician (or homeowner) will isolate the wrong way and assume safety. GN3 typically codes mislabelling as C2 (potentially dangerous). The schedule of inspection item for Section 514 identification cannot be ticked. The correction is a label swap — quick fix, but the cert cannot issue until done.',
  },
  {
    id: 4,
    question:
      'Reg 642.5 requires the designer / installer to provide what to the person ordering the verification, before completion of the EIC?',
    options: [
      'A copy of BS 7671 itself',
      'Only the design data',
      "Information necessary for inspection and testing — including circuit charts, certificates of equipment used in the installation (Declarations of Conformity, BS / BS EN markings) and manufacturer's instructions for items needing them",
      "The installer's qualifications only",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 642.5 places a duty on the designer / contractor to provide information sufficient to allow inspection and testing to be carried out. In practice that is the circuit chart (Reg 514.9), product certificates and DoCs for the consumer unit / RCBOs / AFDDs / EV charger / PV inverter / SPDs, and manufacturer's installation instructions where the standard refers to them (e.g. EV chargers per Section 722). Without this info-pack the inspector cannot complete the schedule of inspection — items relating to manufacturer ratings, AFDDs, SPDs and equipment selection cannot be evidenced.",
  },
  {
    id: 5,
    question:
      'A skilled person (electrically) per BS 7671 Part 2 is defined how, and why does the definition matter for the Schedule of Inspection?',
    options: [
      'Anyone who has done a 1-day course; they sign the cert and that is the end of it',
      'A person who possesses, as appropriate to the nature of the electrical work, technical knowledge or sufficient experience to enable them to avoid dangers which electricity may create — and the EIC declarations (designer / constructor / inspector) are LEGAL signatures only valid where the signatory is competent for the scope of work declared',
      'Only the customer counts as a skilled person',
      'A skilled person is anyone with insurance',
    ],
    correctAnswer: 1,
    explanation:
      'Part 2 (Definitions) of BS 7671 defines the skilled (electrically) person and the instructed person separately. The EIC declarations under Reg 644 are professional sign-offs: the designer takes responsibility for design, the constructor for construction, the inspector for inspection-and-test. Each must be competent for the scope. Where a single person signs all three, that one signature carries all three duties. EAWR 1989 Reg 16 (and HSWA) sit behind this — competent person duty is statutory, BS 7671 is the technical evidence framework.',
  },
  {
    id: 6,
    question:
      'A junior inspector finds a 32 A radial circuit with twin terminations at the socket — two 2.5 mm² conductors crammed into one terminal, neither fully clamped. What is the correct schedule-of-inspection treatment?',
    options: [
      'Leave it — RCD will catch any fault',
      'Code C2 against item 7.5 (connections of conductors); refer to Reg 526 — every connection shall be accessible for inspection, mechanically and electrically sound, and not impose appreciable mechanical strain. A loose / overstuffed terminal is a fire risk and a source of pulse-loading on the OPD',
      'Code C3 only — connections are aesthetic',
      'Issue the EIC and recommend the customer arrange a re-terminate',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 526 (Connections) is one of the most-often-failed parts of an EICR. Loose terminations cause arcing, heating and intermittent operation. Item 7.5 of the Schedule of Inspection is "connections of live conductors" / "connections of protective conductors" depending on layout, and a loose double-stuffed terminal fails it. GN3 typically codes C2; if there is visible heat damage / discolouration C1 is also defensible. The reg does not have an "RCD will catch it" exception — a series arc fault may not draw enough residual current to operate an RCD until it has caused a fire.',
  },
  {
    id: 7,
    question:
      'On a TT-supply property the inspector verifies the earth electrode resistance is 87 Ω, with a 100 mA Type S RCD upstream. Schedule of inspection item 4.4 (earthing arrangement). Pass or fail?',
    options: [
      'Fail — anything over 50 Ω is automatic fail',
      'Pass-with-evidence — Reg 542.2.4 sets no fixed maximum; the requirement is Ra × IΔn ≤ 50 V (Reg 411.5.3 b). 87 × 0.1 = 8.7 V which is well under 50 V; the value is high but acceptable provided the electrode connection is sound, the conductor is appropriately sized per Reg 543, and stability is reasonable',
      'Pass without further checks',
      'Fail — TT systems must always have Ra ≤ 1 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 542.2.4 deliberately avoids a fixed Ra ceiling because the figure depends on the upstream device. The mandatory test is Ra × IΔn ≤ 50 V from Reg 411.5.3 limb b — for a 100 mA RCD that gives Ra ≤ 500 Ω; for a 30 mA it gives Ra ≤ 1667 Ω. Item 4.4 of the schedule of inspection is the tick, supported by the test result on the schedule of test results. GN3 also asks for stability evidence (the soil dries in summer); a 200 Ω electrode in summer is fine for 30 mA but would fail with a 300 mA upstream.',
  },
  {
    id: 8,
    question:
      'Reg 642.1 requires the designer to provide design data to the inspector. Which of the following is NOT typically part of the design-data package the inspector needs to complete the schedule of inspection?',
    options: [
      'Maximum demand and diversity calculations',
      'Earthing arrangement and Ze assumed at design stage',
      'Detailed CAD drawings of the building envelope including HVAC ductwork',
      'Cable sizes, types and reference methods used; protective device types, ratings and assumed Zs(max); list of distribution and final circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 642.1 lists the design data: maximum demand, system earthing arrangement, type and rating of incoming protective devices, type and composition of circuits, prospective fault current, Ze, types and locations of protective devices etc. HVAC ductwork is a building-envelope concern handled by Part L / Part F of the Building Regulations and the M&E coordination drawings — not a BS 7671 design-data requirement. The inspector uses 642.1 data to set up tests (e.g. predicted Zs against measured Zs) and to complete the schedule of inspection where the tick depends on a designed value being met.',
  },
];

const faqItems = [
  {
    question:
      'How does the BS 7671:2018+A4:2026 Schedule of Inspection differ from older versions?',
    answer:
      'A4 expanded the schedule with explicit AFDD items (4.23 — presence in scope premises per Reg 421.1.7), updated TN-C-S nomenclature (TN-C-S (PNB) is now an explicit option), refined the SPD items (Section 443), and tightened the EV-charging items (Section 722 — confirmation of no PEN in EV circuits on TN, open-PEN protection, RCD type). The structure remains 17+ numbered groups, but the granularity has increased — there are more specific tick-boxes corresponding to A4 changes. Always use the latest model form from Appendix 6; older forms cannot capture A4 compliance correctly.',
  },
  {
    question:
      'If an item on the schedule of inspection is N/A, do I still have to write something or can I leave it blank?',
    answer:
      'Never blank. Every item must have a positive entry — tick (compliant), cross (non-compliant) or N/A (not applicable). A blank field is an audit failure: it suggests either negligence (not checked) or evasion (avoiding a no). The model form in Appendix 6 explicitly anticipates N/A entries — most domestic EICs have several (no IT system, no RLV, no special locations beyond bathroom, etc.). Writing N/A is a positive declaration that the inspector considered the item and concluded it does not apply.',
  },
  {
    question:
      'Where does the Schedule of Inspection sit in relation to the Schedule of Test Results?',
    answer:
      'They are two separate schedules attached to the same EIC. The Schedule of Inspection (Section 642 / Appendix 6) is the visual / non-instrument record — items 1.0 through 17.0+ covering the regulations from Sections 131, 411, 421, 514, 543, 544 etc. The Schedule of Test Results (Section 643 / Appendix 6) is the instrument record — Ze, Zs, R1+R2, IR readings, RCD operating times, polarity. Both are required by Reg 644 for an EIC to be valid; one without the other is incomplete. On an EICR (periodic, BS 7671:2018+A4:2026 model) the structure is similar but observations replace ticks where defects are found.',
  },
  {
    question: 'Who can sign the inspection portion of an EIC? Can a level-3 apprentice sign it?',
    answer:
      "No. Reg 644 requires the inspector to be competent (skilled person electrically per Part 2 — sufficient knowledge / experience to avoid danger). A level-3 apprentice is, by definition, still demonstrating competence and would be classed as an instructed person under supervision. The signing inspector must be qualified for the scope (typically City & Guilds 2391 / 2392 / EAL inspection-and-testing, or equivalent), insured, and willing to take legal responsibility. Apprentices may carry out tests under direct supervision, but the signature on the cert is the supervising inspector's, not the apprentice's.",
  },
  {
    question:
      'Do I need to physically remove the consumer unit cover during a domestic EICR inspection?',
    answer:
      'Yes. GN3 (Section 4) and the Schedule of Inspection items relating to connection quality (7.5 / 7.6), cable identification (7.4), correct device ratings (4.6), and presence of warning notices (7.4) cannot be evidenced without removing the cover. The CU must be safely isolated first. There is no "look at the front and tick the boxes" version of an EICR — that is a fee-based fraud and has been prosecuted under Trading Standards. The model form in Appendix 6 is structured around the assumption that interior visual is performed.',
  },
  {
    question:
      'How do I handle inspection of a Section 514 warning notice that is missing on a property with mixed harmonised / pre-harmonised cable colours?',
    answer:
      'Reg 514.14 requires durable warning notices at the origin AND at every distribution board where old and new colours coexist. If notices are missing, code C2 (potentially dangerous) — the next electrician will not know to expect old colours and may misidentify a conductor. Item 7.4 on the schedule of inspection cannot be ticked. The fix is provide and fit appropriate notices (BS 7671 Annex A wording) before issuing the EIC / EICR, or report a defect on the EICR for the customer to address. Plastic engraved notices are durable; printed paper labels are not.',
  },
  {
    question:
      'Reg 642.5 — what equipment certificates do I actually need to see on a typical 2026 domestic install?',
    answer:
      "For a typical CU change with EV: consumer unit BS EN 61439-3 DoC, each RCBO / MCB / RCCB / AFDD BS EN 61009 / 61008 / 62606 markings (the on-device markings count, but the manufacturer's declaration of conformity is the back-up), the EV charger declaration of conformity to Section 722-relevant standards (BS EN IEC 61851-1 etc.) plus the manufacturer's installation manual stating internal DC fault detection, the SPD product spec to BS EN 61643-11 if fitted, and any solar PV / battery certificates if part of scope. Reg 642.5 places the duty on the contractor to provide these to the inspector; absence prevents item 6.0 (selection of equipment) being ticked.",
  },
  {
    question:
      'What is the difference between an inspection finding "C2" and "C3" — and where is that defined?',
    answer:
      'GN3 (Inspection and Testing) defines the EICR observation codes: C1 (danger present, immediate action required), C2 (potentially dangerous, urgent action required), C3 (improvement recommended), and FI (further investigation required). Codes are NOT inside BS 7671 itself — they are in GN3. C1 means someone is at risk now (live exposed parts, open earthing connection on a PME). C2 means a fault would create danger (no main bond, missing cover, wrong cable colours with no warning). C3 is non-compliance without immediate risk (e.g. older RCDs of type AC where Type A is now expected). FI is when you need more time / instruments. A satisfactory overall is impossible with any C1 or C2 outstanding.',
  },
  {
    question: 'Does the inspector have to verify every single connection, or can they sample?',
    answer:
      'Sampling is permitted on EICRs (periodic) per GN3, with the sample size based on duty-holder risk assessment, history and condition observed. The sample percentage MUST be recorded on the cert. On an EIC (initial verification of a new install) every accessible connection forming part of the new work must be inspected — sampling is not appropriate because the inspector is signing the install into existence. The schedule of inspection on an EICR includes a "Extent and limitations" section where the sample percentage and any inaccessible parts are recorded — this is binding context for every tick on the schedule.',
  },
];

const BS7671Module6Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Visual Inspection & Schedule of Inspection | BS 7671:2018+A4:2026 | Module 6.2',
    description:
      'How BS 7671:2018+A4:2026 Section 642 sequences inspection before testing — the Schedule of Inspection items 1.0 through 17.0+, the new AFDD item 4.23, Section 514 identification, bonding inspection, cable colour rules and competence.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Updated for A4:2026"
            title="Visual inspection and testing responsibilities"
            description="Section 642 places visual inspection BEFORE testing for a reason. The Schedule of Inspection in Appendix 6 is the inspector's professional signature on every applicable regulation — this section walks the items 1.0 through 17.0+ and what each one really checks, including the new AFDD item 4.23."
            actions={
              <>
                <RegBadge>642.1</RegBadge>
                <RegBadge>642.2</RegBadge>
                <RegBadge>643.1</RegBadge>
                <AmendmentBadge regs={['421.1.7']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 642.2 fixes the order: visual inspection FIRST (de-energised wherever possible), then testing per Reg 643. The visual catches half the defects before any instrument is connected.',
              'The Schedule of Inspection in Appendix 6 contains 17+ numbered groups of items — every applicable item must have a positive entry (tick / cross / N/A). Blank fields invalidate the cert.',
              'A4:2026 introduced item 4.23 (AFDD presence per Reg 421.1.7), explicit TN-C-S (PNB) options, refined Section 514 identification items and tightened EV / SPD items.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the correct sequence of initial verification per Reg 642.2 / 643 and explain why visual inspection precedes testing.',
              'Walk the Schedule of Inspection items 1.0 through 17.0+ and identify which BS 7671 sections each item evidences — including the new A4 item 4.23 (AFDD).',
              'Apply Section 514 identification requirements (circuit chart 514.9, warning notices 514.14, equipment labels 514.1.1) on a real EICR and code mislabelling correctly.',
              'Distinguish a main protective bonding requirement (Reg 411.3.1.2 / 544.1.1) from a supplementary bonding requirement (Reg 415.2.1) and use the Reg 643.2.2 23 kΩ test to decide whether a metal part is extraneous.',
              'Verify cable colour identification against Table 51 (harmonised colours since 2004) and apply Reg 514.14 warning notices where pre-harmonised colours appear.',
              'Apply Reg 642.5 — collect manufacturer declarations of conformity, equipment certificates and installation instructions before completing the schedule of inspection.',
              'Define skilled person (electrically) per Part 2 and explain how that competence requirement maps to the EIC declaration signatures under Reg 644.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Sequence — visual then test (Reg 642.2)</ContentEyebrow>

          <ConceptBlock
            title="Why visual must precede testing"
            plainEnglish="A visual inspection is faster, safer and catches defects that would either fail a test anyway or could damage a test instrument. BS 7671 fixes this order in Reg 642.2 — it is not a recommendation, it is a requirement."
            onSite="Imagine plugging an MFT into a socket that is wired with line and earth swapped, with the breaker in the neutral. The visual would have caught the wrong cable colours at the CU; running an Ra test live first instead might have put 230 V onto the case of your instrument."
          >
            <p>
              Reg 642.2 reads: the visual inspection shall normally be carried out PRIOR to testing
              and shall normally be done with the installation disconnected from the supply. The
              ordering protects the inspector and prevents instrument damage; the disconnection
              requirement reflects that most schedule-of-inspection items can be checked dead and
              should be. After the visual is complete and any defects rectified, the testing
              sequence in Reg 643 takes over: continuity of CPCs and bonding (643.2), insulation
              resistance (643.3), polarity (643.4), Ze and Zs (643.7), RCD operation (643.8) — in an
              order designed to fail benignly before stressing a circuit.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.2 — Visual inspection"
            clause="The visual inspection shall be made to confirm that the electrical equipment which is part of the fixed installation is: (i) in compliance with the safety requirements of the relevant equipment standards (e.g. CE / UKCA marking, BS / BS EN compliance and accompanied where required by the relevant DoC), (ii) correctly selected and erected in accordance with this Standard, (iii) not visibly damaged or defective so as to impair safety. The visual inspection shall normally be done prior to testing and normally with the installation disconnected from the supply."
            meaning="Three pillars: equipment standards (right product), application (right install per BS 7671), condition (no damage). All three must be visually evidenced before a single test is run. The phrase 'normally disconnected' permits energised live-feed checks (e.g. presence of supply at origin, voltage measurement before isolation) but the bulk of the inspection is dead."
            cite="BS 7671:2018+A4:2026, Reg 642.2 (p.184)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The Schedule of Inspection — items 1.0 through 17.0+</ContentEyebrow>

          <VideoCard
            url={videos.scheduleOfInspections.url}
            title={videos.scheduleOfInspections.title}
            channel={videos.scheduleOfInspections.channel}
            duration={videos.scheduleOfInspections.duration}
            topic="Watch · Schedule of Inspection walkthrough"
            caption="Craig Wiltshire walks the items 1.0 to 17.0+ that the inspector ticks during initial verification, with practical examples drawn from real installations — exactly the schedule structure unpacked below."
          />

          <SectionRule />

          <ConceptBlock
            title="What the schedule actually is"
            plainEnglish="Appendix 6 of BS 7671 contains the model forms for the EIC and the Minor Works cert. Every model form has a Schedule of Inspection — a numbered list of items grouped by topic, where the inspector ticks compliance, crosses non-compliance, or marks N/A."
            onSite="The structure (in summary): 1.0 condition of consumer unit / distribution board, 2.0 service position items, 3.0 supply parameters, 4.0 distribution-board level items (RCDs, AFDDs, devices), 5.0 origin / installation main earthing, 6.0 selection of circuit conductors, 7.0 identification, 8.0 cables and conductors fixed wiring, 9.0 isolation and switching, 10.0 onwards covers the rest — protective conductors, bonding, accessories, special locations etc. through to declarations 17.0+."
          >
            <p>
              The schedule is the legal record that the inspector applied their mind to every
              applicable area of BS 7671 covered by Section 642. Some items repeat the same
              regulation in different contexts (e.g. RCD additional protection appears under both
              dwelling-final-circuit items and special-location items) because the cert needs to
              record where the regulation is being relied on. The numbering is not arbitrary — it
              corresponds to the order an inspector physically walks an installation: from the
              service position inwards.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Item 4.23 — AFDD presence (NEW in A4)"
            plainEnglish="Reg 421.1.7 (A4) makes AFDDs mandatory in higher-risk premises — purpose-built blocks of flats over 18 m / 7 storeys (HRRBs), care homes, HMOs and similar — for AC final circuits supplying socket-outlets up to 32 A. Item 4.23 is the explicit tick-box for that compliance."
            onSite="On a typical single-family dwelling EICR the entry is N/A (with a note 'not in scope of Reg 421.1.7 — recommended only'). On an HRRB EICR the entry MUST be a tick (or a cross if absent — and a cross at item 4.23 typically codes C2 because the install does not meet a current statutory standard for an at-risk occupancy). A4 has not made AFDDs universal; it has made them mandatory in fire-vulnerable buildings where arc-fault ignition risk is high."
          >
            <p>
              Reg 421.1.7 has its own NOTE that recommends AFDDs in other premises but stops short
              of mandating. Item 4.23 of the schedule of inspection mirrors that distinction — tick
              / cross is reserved for in-scope premises; N/A is the correct entry elsewhere with a
              note explaining why the regulation is not engaged. A common error is to leave 4.23
              blank on a domestic EIC because the inspector is unsure — N/A is the right answer,
              supported by a one-line note about premises type.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7 — AFDD provision (UPDATED IN A4)"
            clause="Arc fault detection devices (AFDDs) conforming to BS EN 62606 shall be provided in single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in (i) higher-risk residential buildings, (ii) houses in multiple occupation, (iii) purpose-built student accommodation, (iv) care homes. NOTE: AFDDs are recommended in other premises."
            meaning="The 'shall' applies to the four scoped premises types only. Item 4.23 of the schedule of inspection records compliance for those premises. For ordinary single-family dwellings the entry is N/A with a note — the recommendation in the NOTE does not generate a non-compliance."
            cite="BS 7671:2018+A4:2026, Reg 421.1.7 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Identification — Section 514 in detail</ContentEyebrow>

          <ConceptBlock
            title="Reg 514.9 — circuit charts and schedules at every distribution board"
            plainEnglish="Every DB or CU must have, at the origin or inside the cover, a chart / table / schedule listing each circuit, the type and rating of its protective device, and the means of identifying that device. The model EIC printed by an MFT does NOT replace this — both are required."
            onSite="On a CU change: a printed circuit list inside the inner cover, laminated, listing way 1, way 2, way 3 etc. with circuit description, MCB / RCBO type and rating, cable size, protected length. On a 3-phase DB: a fold-out schematic plus circuit table. Reg 514.9 is item 7.1 on the schedule of inspection."
          >
            <p>
              Reg 514.9.1 lists what the chart must contain: number and type of circuits, types and
              rated currents of protective devices, type and composition of circuits, means of
              identification, results of fault loop impedance / RCD test where required, plus a
              schematic where the layout is complex. Reg 514.9.2 requires a durable copy of the
              certificate to be kept at the origin where reasonable. In practice that means a clear
              pocket inside the consumer unit door, or a folder in the meter box.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 514.14 — warning notices for non-standard colours"
            plainEnglish="Where harmonised (post-2004) and pre-harmonised colours coexist in the same installation — typical on any property altered after 2004 — durable warning notices shall be fitted at the origin AND at every distribution board affected."
            onSite="Required wording (BS 7671 Annex A): 'CAUTION — This installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration or repair that all conductors are correctly identified.' Engraved plastic, drilled and screwed; printed paper labels are not durable enough. Item 7.4 on the schedule of inspection ticks this."
          >
            <p>
              The spirit of 514.14 is foreseeable safety: an electrician arrives on a property
              expecting brown / black / grey, finds red / yellow / blue inside a part-rewired floor,
              and the warning notice triggers verification before any work proceeds. Absence of the
              notice on an installation with mixed colours is typically C2 on an EICR — the risk is
              misidentification leading to incorrect isolation. The notice is required even if the
              installation has only one circuit of legacy colours mixed in.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 514.1 — equipment / circuit / device identification"
            plainEnglish="Every device for protection, isolation and switching shall be identified to enable safe operation. That is the basis for circuit labels, MCB labels at the way, switch labels, isolator labels, contactor labels."
            onSite="A consumer unit way labelled 'cooker' but actually feeding the shower is a Reg 514.1.1 failure — the next person to isolate will do it wrong. GN3 typically codes C2 for incorrect labelling because the foreseeable harm is shock to the next worker. Item 7.1 on the schedule of inspection cannot be ticked. Same applies to MET labels, bond labels, and emergency-stop labels in commercial work."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Cable colours — Table 51 and the 23 kΩ test</ContentEyebrow>

          <ConceptBlock
            title="Reg 514.3 / Table 51 — harmonised cable colours"
            plainEnglish="Brown (L1), black (L2), grey (L3), blue (N), green-and-yellow (CPC). These have been the BS 7671 colours since 31 March 2004 (transitional) and 1 April 2006 (mandatory). Anything else on a 2026 install is a non-compliance unless explained by alteration of an older system."
            onSite="A4:2026 has clarified rather than rewritten Table 51 — the table now expresses identification at terminations as the binding requirement, allowing single-core sleeves where multi-core cores need re-identifying (e.g. blue used as a switched line in a 3-core flex must be over-sleeved brown at both ends; black used as a phase in 6491X likewise)."
          >
            <p>
              Reg 514.6 covers conductor identification at terminations: where colour-coding is not
              feasible (e.g. SY / SWA armoured cables with numbered cores) the cores are identified
              by sleeves or numbered ferrules at every termination. The schedule of inspection asks
              the inspector to verify identification AT terminations (item 7.3) — not just along the
              run. This is why a quick visual at each accessible point is part of the schedule of
              inspection in addition to the headline cable colour.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <ConceptBlock
            title="Bonding inspection — main vs supplementary"
            plainEnglish="Main protective bonding (Reg 411.3.1.2, sized per Reg 544.1.1) ties extraneous-conductive-parts entering the building (gas, water, structural metalwork, oil) to the MET. Supplementary bonding (Reg 415.2.1) ties together exposed and extraneous parts within a location to keep touch voltage safe under fault."
            onSite="The decision tree on every EICR: (1) is the pipe at the boundary metal? if no, no main bond required for it. (2) is it extraneous? — Reg 643.2.2 / GN3 23 kΩ test: measure resistance to MET, if it is at or above 23 kΩ at 230 V it is not extraneous. (3) if extraneous, fit main bond per Reg 544.1.1 sizing (typically 10 mm² for standard domestic; check fault-current calc for larger services). For supplementary in bathrooms, Reg 701.415.2 lets you OMIT if all three: disconnection times met, 30 mA RCD on every circuit, extraneous parts reliably bonded back to MET."
          >
            <p>
              The schedule of inspection groups bonding under item 4.5 (main protective bonding),
              item 4.5.1 / 4.5.2 / 4.5.3 (water / gas / oil / structural / lightning protection),
              and item 5.0 (supplementary equipotential bonding where required). The inspector
              records the size of each bond, the connection method (clamp to BS 951), and the
              continuity test result (Reg 643.2.1 R2 measurement). A bond that physically exists but
              reads above 0.05 Ω at the clamp is functionally non-existent — connection quality
              under Reg 526 is the gating concern.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Equipment ratings, connections and Reg 526</ContentEyebrow>

          <ConceptBlock
            title="Reg 526 — connections of conductors"
            plainEnglish="Every connection between conductors and other equipment shall provide durable electrical continuity AND adequate mechanical strength AND protection. Loose, mis-clamped or oversized terminations fail this regulation."
            onSite="Items 7.5 and 7.6 of the schedule of inspection ('connections of live conductors' / 'connections of protective conductors') are the most-failed items on EICRs in domestic stock. Look for: terminal screws not torqued, conductors not fully inserted, two cores into a single-conductor terminal, ferrules used where unsuitable, conductor strands clipped to fit, evidence of arcing / discolouration. Each is an audit failure of Reg 526."
          >
            <p>
              Reg 526.5 (accessibility) requires that every connection, except those in
              factory-encapsulated joints, must be accessible for inspection, testing and
              maintenance. A buried junction box (single skin of plasterboard, no access cover)
              fails this test. Reg 526.6 forbids appreciable mechanical strain on terminations. Reg
              526.9 requires conductor preparation (strip length, insertion depth) to meet the
              terminal manufacturer's design — too short and the clamp grips insulation; too long
              and the bare conductor extends beyond the protective enclosure.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Equipment ratings — design vs as-installed"
            plainEnglish="The design specifies cable size, protective device type and rating, conductor temperature rating. The inspector verifies the installed equipment matches. Mismatches (Type C MCB where Type B was designed, oversized fuse swapped in for convenience, RCBO type wrong for load) are non-compliances under Reg 643."
            onSite="Item 6.0 (selection of equipment) on the schedule of inspection cross-checks the protective device against the cable size and load. A 32 A Type B on 1.5 mm² T&E is wrong: 1.5 mm² has Iz around 18-20 A on Reference Method C. The wrong device blew the design out of compliance. A common audit-trap: someone replaced an RCBO with a same-rating MCB and lost the RCD additional protection on the circuit."
          />

          <SectionRule />

          <ContentEyebrow>
            Reg 642.5 — equipment certificates and manufacturer's instructions
          </ContentEyebrow>

          <ConceptBlock
            title="The information pack the inspector needs before signing"
            plainEnglish="Reg 642.5 places a duty on the designer / contractor to provide the inspector with the information necessary to complete the inspection. That includes equipment DoCs, BS / BS EN standard markings, manufacturer's installation instructions, system parameters and circuit chart."
            onSite="On a typical 2026 domestic CU change with EV: gather (a) consumer unit DoC to BS EN 61439-3, (b) RCBO / AFDD product DoCs to BS EN 61009 / 62606, (c) EV charger product DoC + installation manual confirming Section 722 compliance and DC fault detection method, (d) SPD product DoC to BS EN 61643-11 if fitted. File a copy with the EIC. Without this pack item 6.0 on the schedule cannot be ticked and Reg 642.5 is not met."
          >
            <p>
              Reg 642.5 is often skipped on small jobs because the contractor and inspector are the
              same person. The duty still applies — the contractor self provides the information
              pack in a folder for the customer at handover. On notified work (Part P / BPG schemes)
              this pack feeds the BPG documentation. On a commercial install with separate designer
              / contractor / inspector the pack is the literal handover.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.5 — Information for inspection and testing"
            clause="The person responsible for the design of the installation shall make available to the person carrying out the inspection and testing the information required by Regulation 642.1, together with the names and addresses of those persons responsible. Manufacturer's instructions for any equipment incorporated in the installation, where these contain information necessary for the safety of installation, inspection or testing, shall also be made available."
            meaning="Two duties: design data (642.1) and manufacturer's instructions (642.5). The phrase 'shall also be made available' means physically available to the inspector at the time of inspection. A handwritten note 'see manual on supplier's website' does not satisfy the regulation; the relevant pages must be accessible on site."
            cite="BS 7671:2018+A4:2026, Reg 642.5 (p.185)"
          />

          <SectionRule />

          <ContentEyebrow>Competence — who can inspect</ContentEyebrow>

          <ConceptBlock
            title="Skilled person (electrically) — Part 2 definition"
            plainEnglish="A skilled person electrically, per BS 7671 Part 2, possesses the technical knowledge or sufficient experience appropriate to the work being undertaken to enable them to AVOID DANGERS that electricity may create. The bar is competence-for-scope, not a generic certificate."
            onSite="A 2391-certified inspector with 10 years' domestic EICR experience is skilled for domestic EICRs. Put them on a 480 V three-phase industrial inspection with VSDs and they may be an instructed person under supervision, not skilled, for that scope. The signing inspector takes responsibility for being skilled FOR THE ACTUAL WORK declared on the cert. Reg 644 makes this explicit through the declarations panel — three signatures (designer / constructor / inspector) any of which can be the same person provided they are competent for that role."
          >
            <p>
              EAWR 1989 Reg 16 (and the supporting HSE memorandum) extends the BS 7671 competence
              requirement into law: 'no person shall be engaged in any work activity where technical
              knowledge or experience is necessary to prevent danger or, where appropriate, injury,
              unless he possesses such knowledge or experience'. A wrong signature on an EIC — by
              someone not competent for the scope — is not just a BS 7671 issue; it is potentially a
              criminal offence under EAWR Reg 16 if injury results.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The instructed person — the apprentice / trainee role"
            plainEnglish="Part 2 also defines an instructed person: someone advised or supervised by a skilled person to enable them to avoid dangers electricity may create. Apprentices, trainees and recently-qualified electricians may carry out tests under supervision but the signature on the cert is the supervising inspector's."
            onSite="On a typical domestic EICR run by a small firm: senior electrician arrives, runs the visual, supervises the apprentice on Ze / Zs / IR / RCD tests, reviews the readings, makes the coding calls, signs the cert. The apprentice has 'carried out tests' — which is fine — but has not 'completed the verification' which remains the senior's professional act. The apprentice's name does not go on the cert as inspector."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the visual to save time"
            whatHappens="Inspector arrives, plugs the MFT in, runs Ze / Zs / IR straight off the bat to 'get the numbers'. Misses a pre-harmonised cable colour run that no warning notice covers, misses a missing CPC at a downlight (the test passes because the existing R1+R2 path is via metal trunking), misses three loose RCBO terminations. EICR comes back 'satisfactory'. Six months later one of the loose terminations causes a kitchen fire."
            doInstead="Reg 642.2 sequence is non-negotiable. Do the visual FIRST, dead, with the consumer unit cover off. Tick the schedule of inspection from item 1.0 down. Only AFTER the visual is complete, defects identified and rectified or recorded, do you go to instruments. The visual catches half the defects on most properties — that is the regulation's whole point."
          />

          <CommonMistake
            title="Leaving schedule items blank rather than writing N/A"
            whatHappens="Inspector ticks items they know apply, leaves the rest blank because 'we don't have an IT system / RLV / sauna / fountain'. Audit reveals 12 blank entries on the schedule. Cert is rejected; insurer challenges the inspection in a later claim because the inspector cannot demonstrate the items were considered."
            doInstead="Every applicable item is tick / cross. Every NON-applicable item is N/A with a brief note ('no IT system on site', 'no special locations beyond bathroom', 'AFDDs not in scope of Reg 421.1.7 — domestic single-family dwelling'). N/A is a positive declaration that the inspector considered the regulation and concluded it does not apply — that is what the model form expects."
          />

          <CommonMistake
            title="Missing or wrong cable-colour warning notice"
            whatHappens="Property has been part-rewired in 2010; bedrooms are post-harmonisation brown / black, downstairs is still red / yellow / black with red sleeving on neutrals. There is no warning notice anywhere. Subsequent electrician isolates 'the brown' at a junction expecting it to be a phase, gets a shock from a still-live red conductor that the tester did not flag because there was no notice to alert anyone to the dual scheme."
            doInstead="Reg 514.14 requires durable warning notices at the origin AND at every affected DB whenever harmonised and pre-harmonised colours coexist. Engraved plastic, screwed in place, BS 7671 Annex A wording. Item 7.4 of the schedule of inspection cannot be ticked without it. Code C2 if missing on EICR — the foreseeable harm is shock from misidentification. Fix the notices before issuing the cert."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="EICR of a 1990s 4-bed semi with two later alterations"
            situation="Property: 1990s build with a 1996 CU, kitchen rewired in 2008 (post-harmonisation), bathroom rewired in 2018 with RCBOs and modern accessories. Customer wants an EICR for a re-mortgage. You arrive and the existing electrician's last cert is from 2014, marked satisfactory."
            whatToDo="Run the visual FIRST (Reg 642.2). Expect to find: pre-harmonised colours upstairs in original-build circuits, post-harmonised in kitchen/bath. CHECK for warning notices at origin AND at the CU (Reg 514.14) — likely missing. Verify circuit chart at CU is current and matches actual layout (Reg 514.9). Confirm main bonding to gas and water at the meter positions, with conductors sized per Reg 544.1.1 (10 mm² typical for standard domestic). Confirm RCD additional protection scope: Reg 411.3.3 sockets, Reg 411.3.4 (A4) lighting circuits in dwelling. Schedule of inspection item 4.23 — N/A (not HRRB / HMO / care home)."
            whyItMatters="An EICR on a property with mixed cable colours and incomplete identification is a documentation exercise as much as a testing exercise. Most C2 codes on this kind of property come from the visual / schedule-of-inspection side — missing notices, missing circuit charts, mislabelled ways — not from instrument readings. Get the visual right and the cert is defensible."
          />

          <Scenario
            title="Initial verification of a new-build flat in a 22-storey HRRB"
            situation="New-build apartment, 22-storey purpose-built block (HRRB). EIC required for handover. Consumer unit is fully RCBO-protected, EV charging point in basement parking is on a separate dedicated supply, AFDD-protected ring final and lighting circuits per developer spec."
            whatToDo="Schedule of inspection items: 4.23 (AFDD presence) MUST be ticked — Reg 421.1.7 mandates AFDDs in HRRBs on socket-outlet circuits up to 32 A. Confirm BS EN 62606 marking on each AFDD device. Verify Reg 411.3.4 (A4) on lighting circuits — every dwelling lighting circuit on 30 mA RCD (RCBO is the normal route). Identification (Section 514) — full circuit chart, all RCBOs labelled, warning notices fitted (post-harmonised colours throughout but warning notices for non-electricians per Reg 514.10 still required). Reg 642.5 information pack — collect AFDD product DoCs, RCBO DoCs, CU DoC, hand to building owner with EIC."
            whyItMatters="HRRBs are the highest-stakes A4 inspection scenario. Item 4.23 absent or wrong on this kind of cert is a serious finding — the regulation was created in response to fire-vulnerable building risk, and an inspector who waved through an HRRB without AFDDs has signed off non-compliance that could be quoted in a coroner's inquest. The schedule of inspection is the inspector's primary defensive document — every tick traceable to a regulation, every N/A explained."
          />

          <SectionRule />

          <ContentEyebrow>
            Worked example — walking the schedule on a typical CU change
          </ContentEyebrow>

          <ConceptBlock
            title="From cover off to cert signed in twelve checks"
            plainEnglish="A standard CU change inspection ticks roughly 50-60 items on the schedule. The good news is most are quick — many are visible the moment the cover comes off. Walking the items in order matches the order an inspector physically moves around the equipment."
            onSite="The 12-step schedule walkthrough most domestic inspectors use as a mental checklist: (1) origin / cut-out condition, (2) meter and tails, (3) main switch / RCD layout, (4) labels and circuit chart, (5) RCBO / MCB selection per circuit, (6) AFDDs item 4.23 (N/A on dwelling), (7) main bonds gas / water / structural — sizes and clamps, (8) supplementary bonding in bathroom (omit-or-fit decision), (9) cable colours and identification, (10) accessory connections sample (Reg 526), (11) special locations Section 701 / 702 / 703 / 705 / 711 / 717 / 722 etc as applicable, (12) declarations and equipment certificates pack per Reg 642.5."
          >
            <p>
              <strong>1. Origin condition (item 1.0).</strong> Cut-out fuse intact, cover sealed,
              tails sized correctly (typically 25 mm² for 100 A).{' '}
              <strong>2. Meter and tails.</strong>
              Smart meter or analogue, tails brown / blue at meter, henley block configuration if
              present. <strong>3. Main switch / RCD layout (item 4.x).</strong> RCBOs on every way
              (modern domestic), correct ratings vs designed cable sizes.{' '}
              <strong>4. Labels and chart (item 7.x).</strong> Circuit chart inside cover, all RCBOs
              labelled, cross-check against actual circuits.{' '}
              <strong>5. RCBO selection (item 6.0).</strong>
              Right type for the load (Type A standard, Type B for
              EV-without-internal-DC-detection).
              <strong>6. AFDDs (item 4.23).</strong> For a single-family dwelling: N/A with note.
              For HRRB / HMO / care home: tick if present.{' '}
              <strong>7. Main bonds (item 4.5).</strong>
              10 mm² G/Y to gas meter inlet (within 600 mm), 10 mm² G/Y to water service entry,
              clamps to BS 951. <strong>8. Supplementary bonding (item 5.x).</strong> Apply Reg
              701.415.2 omit-or-fit decision in bathroom.{' '}
              <strong>9. Cable colours (item 7.3 / 7.4).</strong> Verify Table 51 colours, fit
              warning notices if mixed. <strong>10. Accessory connections (item 7.5 / 7.6).</strong>{' '}
              Sample sockets, switches, JBs; torque, insertion depth, no strain.{' '}
              <strong>11. Special locations.</strong> Bathroom zones, kitchen, garden socket,
              outbuildings — apply Section 701 onwards.
              <strong>12. Reg 642.5 pack.</strong> File DoCs, manufacturer instructions, hand pack
              to customer with EIC.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Inspector's quick reference</ContentEyebrow>

          <ConceptBlock
            title="The four pillars of inspection compliance"
            plainEnglish="Sequence (Reg 642.2 — visual first), Coverage (every applicable schedule item ticked, crossed or N/A — never blank), Evidence (Reg 642.5 information pack to hand), Competence (skilled person electrically per Part 2, signature under Reg 644)."
            onSite="If a customer / auditor / insurer challenges the cert, your defence sits on those four pillars. The Schedule of Inspection itself is the visible record of pillars 1-3; the signatory's competence is pillar 4. Get any one wrong and the cert is structurally weak even if the underlying installation is sound. Get all four right and you have a document that stands up to challenge."
          >
            <p>
              The schedule of inspection is not paperwork bureaucracy — it is the audit-trail record
              of the inspector's professional act. Every tick is a statement under Reg 644 that the
              regulation in question was checked and met. Every cross is a recorded non-compliance
              demanding correction or coding (EICR). Every N/A is a positive declaration that the
              regulation does not apply. The inspector who walks the items in order, supports each
              tick with evidence, and uses N/A explicitly where applicable produces certs that hold
              up at audit, in court, and on follow-up inspections years later.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Reg 642.2: visual inspection BEFORE testing, normally with the installation disconnected. Reg 643 then orders the testing sequence (continuity, IR, polarity, Zs, RCD).',
              'Schedule of Inspection (Appendix 6) — items 1.0 through 17.0+ — every applicable item must have a positive entry (tick / cross / N/A). Blank fields invalidate the cert.',
              'A4:2026 introduced item 4.23 — AFDD presence per Reg 421.1.7 in HRRBs, HMOs, care homes and PBSA. Single-family dwellings are N/A with a note.',
              'Section 514 identification: circuit charts (Reg 514.9), warning notices for mixed colours (Reg 514.14), accurate device labels (Reg 514.1.1) — items 7.x on the schedule.',
              'Bonding inspection: main per Reg 411.3.1.2 / 544.1.1, supplementary per Reg 415.2.1, with the Reg 643.2.2 23 kΩ test deciding extraneous status.',
              'Reg 642.5 — equipment DoCs and manufacturer instructions must be available to the inspector. Reg 644 — signatures by skilled persons (Part 2 definition) competent for the scope declared.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Sequence of tests
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module6Section2;
