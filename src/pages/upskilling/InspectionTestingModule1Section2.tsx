import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod1-s2-renumbering',
    question:
      'A scheme auditor pulls an EICR you signed in May 2026 and flags Reg 641.1 cited in the observations. Why is that a defect?',
    options: [
      'Reg 641.1 is fine — it is a long-standing and still-valid Part 6 reference.',
      'A4:2026 restructured Part 6, so Reg 641.1 does not exist in the certificate’s edition.',
      'Reg 641.1 applies only to industrial installations, not domestic ones like this.',
      'Reg 641.1 has been renumbered to Reg 510.1 and the citation should read that.',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 (in force 15 April 2026) restructured Part 6 to align with CENELEC. The old Chapter 61 (Initial verification) and Chapter 62 (Periodic) numbering is gone — the current equivalents are Chapter 64 (Reg 641 / 642 / 643 / 644) for initial and Chapter 65 (Reg 651 / 652 / 653) for periodic. Citations on a current certificate must reference the in-force numbers; pre-A4 reg numbers on an A4-edition certificate are a defective citation regardless of how familiar they are.',
  },
  {
    id: 'mod1-s2-643-1-order',
    question:
      'You are tempted to do polarity (643.6) at the same accessory while you take the IR reading (643.3) — saves walking the circuit twice. What does Reg 643.1 say?',
    options: [
      "Order is at the inspector's discretion provided every test is eventually completed.",
      'Reg 643.2 to 643.6 must be carried out in that order before the installation is energised.',
      'Reg 643.1 applies only to initial verification, not to periodic inspection work.',
      'Polarity may be done at any time after IR, including in parallel with the IR test.',
    ],
    correctIndex: 1,
    explanation:
      "Reg 643.1 is explicit: continuity → IR → separation → floor/wall → polarity is a mandatory sequence, not a stylistic preference. The order matters because each test's validity depends on its predecessor — an IR reading on a circuit with broken CPC continuity hides the real fault, and a polarity check in parallel with IR risks the IR test going through a path the polarity has not yet confirmed.",
  },
  {
    id: 'mod1-s2-250v-followup',
    question:
      'You disconnected an LED driver and a Type 2 SPD for the 500 V IR test (both correct under Reg 643.3.3 first sentence). After reconnecting them, what does A4:2026 require?',
    options: [
      'Nothing further — the primary 500 V IR test on the disconnected circuit is sufficient.',
      'A 250 V DC test between live conductors and the earthed protective conductor, after reconnection.',
      'A repeat 500 V IR test with the sensitive equipment left connected this time.',
      'A continuity check on the SPD alone, with no further insulation testing required.',
    ],
    correctIndex: 1,
    explanation:
      'A4 introduced the two-stage protocol: primary 500 V DC test with sensitive equipment disconnected, then a 250 V DC follow-up after reconnection between live conductors and the earthed protective conductor. Reg 643.3.3 second sentence makes this mandatory; minimum acceptable insulation is 1 MΩ. The schedule has a column for it; missing it is a defective certificate.',
  },
  {
    id: 'mod1-s2-max-zs-column',
    question:
      'The schedule of circuit details has a max-permitted-Zs entry of 1.10 Ω for a B32 circuit. BS 7671 Table 41.3 gives 1.37 Ω for the same device at 70 °C. Your measured Zs is 1.25 Ω. Compliant?',
    options: [
      '1.25 Ω is below 1.37 Ω in Table 41.3, so the circuit passes against the table value.',
      '1.25 Ω exceeds the 1.10 Ω design value in the max-permitted-Zs column, so it fails.',
      'Average 1.10 Ω and 1.37 Ω to give 1.235 Ω, against which 1.25 Ω is borderline.',
      'Use whichever of the two values is higher, so 1.37 Ω applies and it passes.',
    ],
    correctIndex: 1,
    explanation:
      "Reg 643.7 / 411 verifies against the column value when the designer has set a tighter limit, not the BS 7671 table value. A4:2026 introduced the explicit max-permitted-Zs column on the Schedule of Circuit Details specifically so the designer's tighter limit (reserving headroom for temperature rise, special-location disconnection times, or selectivity) is the verification benchmark. Defaulting to Table 41 when the column has a tighter value defeats the design.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671:2018+A4:2026 has restructured Part 6. Which two chapters now hold the substantive requirements for initial verification and periodic inspection respectively?',
    options: [
      'Chapter 64 (initial verification) and Chapter 65 (periodic inspection and testing)',
      'Chapter 61 (initial verification) and Chapter 62 (periodic inspection and testing)',
      'Chapter 70 (initial verification) and Chapter 71 (periodic inspection and testing)',
      'Chapter 41 (initial verification) and Chapter 53 (periodic inspection and testing)',
    ],
    correctAnswer: 0,
    explanation:
      'A4:2026 completely renumbered Part 6 to align with the CENELEC standard. The old Chapter 61 / 62 numbering is gone. Chapter 64 is now Initial verification (the old 61 territory) and Chapter 65 is now Periodic inspection and testing (the old 62 territory). Pre-A4 references to 61.x / 62.x are no longer correct.',
  },
  {
    id: 2,
    question:
      'What does Reg 643.1 of BS 7671 require regarding the order of pre-energisation tests?',
    options: [
      'The order is at the inspector’s discretion provided all tests are eventually completed',
      'Live tests are carried out first, with the dead tests following after energisation',
      'Only continuity is mandatory before energisation; the rest may be done afterwards',
      'Reg 643.2 to 643.6 shall, where relevant, be done in that order before energisation',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.1 is explicit: the tests of Reg 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. The order matters because each test’s validity depends on the previous test’s result — you cannot trust an insulation resistance reading on a circuit whose continuity is unverified.',
  },
  {
    id: 3,
    question: 'Reg 643.2.1 (continuity) requires which two limbs?',
    options: [
      'Continuity of every protective conductor on every circuit, plus continuity of every live conductor on every circuit',
      'Continuity of bonding conductors only',
      'Continuity of every protective conductor (and bonding) on every circuit, plus continuity of live conductors on ring final circuits only',
      'Continuity of CPCs by visual inspection',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.2.1 splits the duty: protective conductor and protective bonding continuity is required on every circuit by resistance measurement; live conductor continuity is additionally required for ring final circuits.',
  },
  {
    id: 4,
    question:
      'Reg 643.3.3 of A4:2026 prescribes a specific test where connected equipment was disconnected for the main insulation resistance test. What is it?',
    options: [
      'A 250 V DC test between live conductors and the earthed protective conductor, after reconnection',
      'A 500 V DC insulation test taken between the two live conductors only',
      'A 1000 V AC dielectric strength (flash) test across the reconnected equipment',
      'A polarity check carried out at the reconnected equipment terminals',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.3.3 second sentence: following connection of equipment that was disconnected for the prior insulation test, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement. This is mandatory after re-connection.',
  },
  {
    id: 5,
    question: 'Where does Reg 642.1 say inspection sits in the workflow?',
    options: [
      'After all testing is complete, as a final documentary check of the work',
      'In parallel with the live testing phase to save a second visit to each accessory',
      'Inspection precedes testing, normally with that part disconnected from the supply',
      'At the discretion of the duty holder, who decides when inspection takes place',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 642.1 is unambiguous: inspection precedes testing, and is normally carried out with the installation disconnected from the supply. The visual / documented inspection finds the things you would otherwise miss until they failed under test, and protects the inspector during the testing phase.',
  },
  {
    id: 6,
    question:
      'A4:2026 introduced an explicit reference to AFDD operational indication on the inspection. Which regulations cluster around AFDD verification?',
    options: ['411.3.4 only', '434.1 and 643.7', '514.9 alone', '421.1.7, 532.6 and 651.2(e)'],
    correctAnswer: 3,
    explanation:
      'BS 7671 ties AFDD verification to three regulations: 421.1.7 (the recommendation to install AFDDs to mitigate fire risk), 532.6 (selection / location), and 651.2(e) (confirmation of operational indication during periodic inspection). All three are referenced together in the inspection schedules.',
  },
  {
    id: 7,
    question:
      'Reg 644.4 of BS 7671 requires a specific recommendation to be recorded on the EIC. What is it?',
    options: [
      'The recommended interval between initial verification and the first periodic inspection',
      'The recommended replacement date for the consumer unit and its protective devices',
      'The recommended manufacturer for the protective devices used on each circuit',
      'The recommended maximum measured Zs limit to be applied to each final circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 644.4 places a record duty: the recommendation for the interval between initial verification and the first periodic inspection — itself made by the designer under Reg 134.2.2 — shall be recorded on the EIC. Reg 653.4 carries the equivalent duty into the EICR.',
  },
  {
    id: 8,
    question:
      'Reg 652.2 of BS 7671 permits periodic inspection and testing to be replaced by an alternative regime. What is the regime, and what conditions apply?',
    options: [
      'Continuous monitoring and maintenance by skilled persons under an effective management system',
      'Annual self-certification by the duty holder in place of any inspection by a third party',
      'A reduction to visual inspection only once the installation passes its first 10 years',
      'No replacement regime is permitted; periodic inspection and testing is always required',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 652.2 permits (it uses "may", not "shall") that periodic inspection and testing may be replaced by an adequate regime of continuous monitoring and maintenance by one or more skilled persons competent in such work, provided the installation is under an effective management system for preventative maintenance in normal use. Common in major industrial / commercial estates with permanent in-house teams.',
  },
  {
    id: 9,
    question:
      'Reg 643.7.3.201 in A4:2026 references which earlier regulation, importing its requirements into the test programme?',
    options: [
      'Reg 411.3.2 (disconnection times)',
      'Reg 543.1 (CPC sizing)',
      'Reg 434.1 (prospective fault current Ips determination)',
      'Reg 522.6 (cable installation)',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.7.3.201 introduces the requirements of Reg 434.1 into the testing section. This means designers and inspectors must include determination of prospective short-circuit current and prospective earth fault current at the origin and other relevant points as part of the test programme.',
  },
  {
    id: 10,
    question:
      'An EICR has been completed. Reg 651.4 requires what specific recording duty regarding defects?',
    options: [
      'Photograph every defect found and attach the images to the issued EICR',
      'A verbal handover of the findings to the duty holder on site is sufficient',
      'Only C1 (danger present) defects need to be formally recorded in the report',
      'Details of any damage, deterioration, defects or dangerous conditions shall be recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 651.4: details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report. Combined with Reg 653.1 (the EICR shall be produced on completion of the periodic inspection and testing, based on the Appendix 6 model), this gives the full documentary duty.',
  },
];

const InspectionTestingModule1Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'BS 7671 testing requirements overview | I&T Module 1.2 | Elec-Mate',
    description:
      'Part 6 restructured: Chapters 64 / 65 / 642 / 643. The 11 numbered tests of Reg 643.x in the order Reg 643.1 fixes them. A4:2026 changes — schedule columns, AFDD, max permitted Zs, and the renumbering trap.',
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
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2"
            title="BS 7671 testing requirements overview"
            description="Part 6 of BS 7671:2018+A4:2026 — restructured, renumbered, and the source of every test on the schedule. Chapters 64 and 65, Reg 643.x in sequence, and the A4 changes you must apply from 15 April 2026."
            tone="yellow"
          />

          <TLDR
            points={[
              'Part 6 of BS 7671 has been completely restructured in A4:2026 to align with the CENELEC standard. Chapter 64 = Initial verification (was Chapter 61). Chapter 65 = Periodic inspection and testing (was Chapter 62). Old reg numbers like 641.1 / 641.7 / 650.1 are gone.',
              'Reg 643.1: the tests of Reg 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. The sequence is mandatory, not stylistic.',
              'The Reg 643 test set: 643.2 continuity, 643.3 insulation resistance, 643.4 separation (SELV/PELV), 643.5 floor and wall resistance, 643.6 polarity, 643.7 earth electrode resistance / earth fault loop / prospective fault current, 643.8 RCD operation, 643.9 phase sequence, 643.10 functional checks (main switch, OCPDs, RCDs), 643.11 voltage drop where relevant. Schedule each one against the specific Reg.',
              'Inspection (Reg 642) precedes testing (Reg 643). Reg 642.1 puts inspection first and normally with the supply disconnected. Reg 642.3 gives the formal — but not exhaustive — checklist of items to check.',
              'A4:2026 brought Part 6 into line with new technical chapters: AFDD verification (421.1.7 / 532.6 / 651.2(e)), TN-C-S (PNB) recognition, max permitted Zs column on the schedule of circuit details, and updated Appendix 6 model forms. Pre-A4 forms are not appropriate for work signed off after 15 October 2026.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the structure of Part 6 in BS 7671:2018+A4:2026 and explain what each chapter covers',
              'Reproduce the Reg 643.1 mandatory test sequence and explain why each test’s validity depends on its predecessor',
              'Identify each numbered test in Reg 643.x by regulation number and stated purpose',
              'Apply Reg 642.1 (inspection precedes testing) and Reg 642.3 (inspection checklist scope) on a real installation',
              'Distinguish initial verification (Chapter 64 → EIC / MEIWC) from periodic inspection (Chapter 65 → EICR) at every stage of the workflow',
              'Apply A4:2026 changes correctly — AFDD verification, TN-C-S framing, max permitted Zs column, and the new model forms in Appendix 6',
            ]}
          />

          <ContentEyebrow>The structure of Part 6</ContentEyebrow>

          <ConceptBlock
            title="Part 6 in A4:2026 — completely restructured"
            plainEnglish="A4:2026 reorganised Part 6 from the ground up to align with the CENELEC standard for inspection and testing. The old Chapter 61 (Initial verification) and Chapter 62 (Periodic inspection) numbering is gone. Practitioners holding pre-A4 paperwork will see references to 641.1, 641.7, 650.1, 651.x — these no longer match the regulation numbers in force."
            onSite="When you read older training materials, IET Guidance Notes, or competent person scheme audit checklists, check the edition. A reference to &lsquo;Reg 641.1&rsquo; is a pre-A4 reference. The equivalent in A4:2026 sits in Chapter 64."
          >
            <p>The current structure of Part 6 is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Chapter 64 — Initial verification.</strong> Covers Reg 641 (general /
                application), Reg 642 (inspection), Reg 643 (testing — the substantive test
                sequence), and Reg 644 (certification: EIC, MEIWC).
              </li>
              <li>
                <strong>Chapter 65 — Periodic inspection and testing.</strong> Covers Reg 651
                (general — inspection scope and competence), Reg 652 (frequency of periodic
                inspection and testing), and Reg 653 (reporting — production of the EICR).
              </li>
              <li>
                <strong>Appendix 6 — Model forms.</strong> The actual EIC, MEIWC, EICR, schedules of
                inspection and schedules of test results, plus a non-mandatory checklist of
                inspection items. A4 simplified the schedule of inspections and added the
                non-mandatory checklist.
              </li>
            </ul>
            <p>
              Within Chapter 64 the substantive test obligations live at Reg 643.x. That is where
              the practical &ldquo;what tests must I run&rdquo; question is answered. Within Chapter
              65 the operational obligations live at Reg 651.4 (recording defects), Reg 651.5
              (competence) and Reg 652.1 (frequency). Together these are the day-to-day regulations
              you reference on every job.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.1 (Inspection)"
            clause={
              <>
                Inspection shall precede testing and shall normally be done with that part of the
                installation under inspection disconnected from the supply.
              </>
            }
            meaning="Two duties in one sentence. Inspection comes first — visual / documentary verification of selection and erection. The supply is normally disconnected — both because some inspection items cannot be checked on a live installation, and because the inspector is about to be inside the board."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1 (General)"
            clause={
              <>
                The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out and
                the results compared with relevant criteria. Measuring instruments and monitoring
                equipment and methods shall be chosen in accordance with the relevant parts of BS EN
                61557 or other equipment providing no lesser degree of performance and safety. The
                tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that
                order before the installation is energized.
              </>
            }
            meaning="The mandatory test list and the mandatory order. 643.2 continuity → 643.3 insulation resistance → 643.4 separation → 643.5 floor / wall → 643.6 polarity, all before energisation. 643.7 onwards may be carried out live. Equipment must be BS EN 61557 compliant or equivalent."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Reg 643 test sequence — what each test verifies</ContentEyebrow>

          <ConceptBlock
            title="643.2 Continuity of conductors — every protective conductor, every bonding conductor, plus live conductors on ring finals"
            plainEnglish="The first test in the sequence. Reg 643.2.1 requires verification of the continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, including the main and supplementary bonding, by a measurement of resistance. The continuity of every protective conductor of every circuit shall be verified by a measurement of resistance. For ring final circuits, every live conductor must also be verified."
            onSite="This is the test that gets you R1 + R2 (Method 1) or R2 (Method 2) for each circuit. Module 3 §1 covers the practical methods. The point here is that the sequence requires it first, because every subsequent test (insulation resistance, polarity, Zs verification) assumes the protective conductor is electrically present."
          >
            <p>
              The instrument required by GN3 is a low-resistance ohmmeter or multifunction tester
              capable of resolving below 0.1&nbsp;Ω with lead-resistance compensation. A multimeter
              on the lowest ohms range is not adequate, and a buzzer is wrong for the regulation —
              the reg requires &ldquo;measurement of resistance&rdquo;, which is a numeric value,
              not a beep.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.3 Insulation resistance — between live conductors, and between live and the protective conductor"
            plainEnglish="Reg 643.3.1 requires the insulation resistance to be measured (a) between live conductors, and (b) between live conductors and the protective conductor connected to the earthing arrangement. During (b), L and N may be connected together. Acceptance values are in Table 64."
          >
            <p>
              A4:2026 redrafted 643.3 specifically to address connected equipment. Reg 643.3.3 first
              sentence: where connected equipment is likely to influence the measurement or be
              damaged by the test, the test shall be applied prior to connection of that equipment.
              Reg 643.3.3 second sentence: following re-connection of that equipment, a test at
              250&nbsp;V DC shall be applied between live conductors and the protective conductor
              connected to the earthing arrangement.
            </p>
            <p>
              The 250&nbsp;V DC follow-up is a new compliance step in A4 territory. It exists
              because LED drivers, surge devices, AFDDs and modern electronic loads cannot tolerate
              the 500&nbsp;V DC primary insulation test, but their connected state still needs to be
              verified. The two-stage protocol — primary test disconnected, follow-up at 250 V DC
              after reconnection — is now the prescribed method.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.4 Protection by SELV, PELV or electrical separation — verified by insulation resistance"
            plainEnglish="Where separation of live parts has been used as the protective measure (SELV per Section 414, PELV per Section 414, or electrical separation per Section 413), the separation must be confirmed by measurement of insulation resistance, with values per Table 64. A SELV / PELV system tested at 250 V DC requires a minimum 1 MΩ per Reg 643.3.2."
          >
            <p>
              In practice 643.4 only applies when one of those protective measures has been chosen
              for the installation or part of it (typical examples: a 12&nbsp;V garden lighting
              system fed from a SELV transformer, a battery system as a SELV source, or an
              isolating-transformer-fed shaver socket as electrical separation). On a routine
              ADS-protected mains installation, 643.4 simply does not bite.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.5 Floor and wall resistance — narrow scope, important when it applies"
            plainEnglish="Reg 643.5.1 applies only where Reg 418 (non-conducting location, earth-free local equipotential bonding, or similar specialist protective measures) applies. The measurements verify that floor and wall surfaces have the high resistance the protective measure depends on. For the average commercial / domestic installation this test is not invoked."
          />

          <ConceptBlock
            title="643.6 Polarity — verified before energisation"
            plainEnglish="Where relevant, the polarity of the supply at the origin shall be verified before energisation per Reg 643.6. On TN systems this is checked at the cut-out / origin. On every final circuit, polarity is verified at every accessory: line conductors connected to the line terminals of devices, single-pole switches in the line conductor and not the neutral, fuses and circuit-breakers in the line conductor."
          >
            <p>
              Polarity is the single most common defect in pre-A4 installations carried out by
              non-competent persons. A reversed polarity at a socket means the appliance switch
              breaks the neutral, leaving the line conductor live to chassis. Reg 643.6 makes
              polarity verification a pre-energisation requirement specifically because the
              consequence of getting it wrong is that downstream protection cannot do its job.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.7 Earth electrode resistance, earth fault loop impedance, and prospective fault current"
            plainEnglish="The 643.7 cluster covers three measurements: (a) electrode resistance RA where a TT or similar electrode-based earthing arrangement is used (Reg 643.7.2); (b) earth fault loop impedance Zs verifying that disconnection times will be met (Reg 643.7.1); and (c) prospective fault current Ipf measured, calculated or determined at the origin and other relevant points (Reg 643.7.3.201)."
          >
            <p>
              The 643.7 cluster is where R1 + R2 from 643.2 starts paying off. Zs at the furthest
              point of every circuit can be calculated as Ze + (R1 + R2) corrected for operating
              temperature, then verified by direct measurement on a representative sample. The
              measured Zs is compared against the maximum permitted Zs from Table 41 — and, in
              A4:2026, against the explicit max-permitted-Zs column on the schedule of circuit
              details where the design specified a tighter limit than the BS 7671 table.
            </p>
            <p>
              Reg 643.7.3.201 imports Reg 434.1 into the test phase: the prospective short-circuit
              current and prospective earth fault current shall be measured, calculated or
              determined at the origin and at other relevant points. The Ipf at the origin sits on
              the EIC; Ipf at distribution boards downstream sits on the schedule of circuit details
              so that breaking capacity can be verified for every protective device.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.8 RCD operation — type-correct testing, trip times and additional protection"
            plainEnglish="Where RCDs have been provided as part of automatic disconnection of supply or as additional protection, Reg 643.8 requires their effectiveness to be verified by test. The test is type-appropriate (AC, A, F, B as fitted), at the rated residual operating current and at five times rated where additional protection is claimed."
          >
            <p>
              A4:2026 modified RCD testing requirements alongside the 643.3 redraft. Modern
              multifunction testers handle the type-correct test sequence automatically when the RCD
              type is selected at the meter. The acceptance criterion remains the manufacturer’s
              specified trip time (typically &lt;&nbsp;300&nbsp;ms at I&Delta;n for general-use,
              &lt;&nbsp;40&nbsp;ms at 5&times;I&Delta;n for additional protection).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.9 Phase sequence — verified on three-phase installations"
            plainEnglish="On three-phase installations, Reg 643.9 requires that phase sequence is maintained throughout. Reversed phase sequence on a three-phase motor reverses rotation, with consequences ranging from spoiled product on a production line to a genuine safety event on a hoist or pump."
          />

          <ConceptBlock
            title="643.10 Functional checks — main switch, OCPDs, RCDs operate as intended"
            plainEnglish="Reg 643.10 requires functional checks of the operation of the main switch, manual operation of circuit-breakers and RCDs to prove disconnection, and operation of any other functional element of the installation that depends on it operating reliably. This is the test that confirms the breakers actually break."
          >
            <p>
              Functional testing closes the loop on the test sequence. You have verified continuity,
              insulation, polarity, Zs and RCD operation electrically; the functional check confirms
              that the actual physical devices operate when commanded. Manual operation of the main
              switch, manual operation of every protective device, and any specific functional
              checks the design called for (interlocks, emergency stops, changeover sequences)
              belong here.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="643.11 Voltage drop — verified by calculation, not normally by measurement"
            plainEnglish="Reg 643.11 covers verification of voltage drop. The note in Part 6 is explicit: verification of voltage drop is not normally required during initial verification — it is normally a calculated value from the design phase. Where it is verified, the limits in Section 525 (typically 3 % for lighting, 5 % for other circuits) apply."
          />

          {/* The 643.x test sequence diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Reg 643.x — the test sequence in the order Reg 643.1 fixes
            </h4>
            <svg
              viewBox="0 0 800 480"
              className="w-full h-auto"
              role="img"
              aria-label="The Reg 643.x test sequence in the order Reg 643.1 fixes. Tests 643.2 to 643.6 are pre-energisation (continuity, insulation resistance, separation, floor and wall resistance, polarity). Tests 643.7 onwards are post-energisation (earth fault loop and electrode, RCD operation, phase sequence, functional checks, voltage drop)."
            >
              {/* Pre-energisation block */}
              <rect
                x="20"
                y="20"
                width="760"
                height="220"
                rx="12"
                fill="rgba(34,197,94,0.04)"
                stroke="rgba(34,197,94,0.25)"
                strokeWidth="1.5"
              />
              <text x="40" y="45" fill="#22C55E" fontSize="12" fontWeight="bold">
                PRE-ENERGISATION (Reg 643.2 → 643.6 in order)
              </text>
              <text x="40" y="62" fill="rgba(255,255,255,0.5)" fontSize="10">
                Supply isolated, locked off. Each test’s validity depends on the previous test’s
                pass.
              </text>

              {/* Test boxes — pre-energisation */}
              <g>
                <rect
                  x="40"
                  y="80"
                  width="130"
                  height="60"
                  rx="8"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.4"
                />
                <text
                  x="105"
                  y="100"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.2
                </text>
                <text x="105" y="115" textAnchor="middle" fill="white" fontSize="10">
                  Continuity
                </text>
                <text
                  x="105"
                  y="130"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  CPCs, bonding, ring
                </text>
              </g>
              <g>
                <rect
                  x="180"
                  y="80"
                  width="130"
                  height="60"
                  rx="8"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.4"
                />
                <text
                  x="245"
                  y="100"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.3
                </text>
                <text x="245" y="115" textAnchor="middle" fill="white" fontSize="10">
                  Insulation resistance
                </text>
                <text
                  x="245"
                  y="130"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  L–L, L–E + 250 V DC
                </text>
              </g>
              <g>
                <rect
                  x="320"
                  y="80"
                  width="130"
                  height="60"
                  rx="8"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.4"
                />
                <text
                  x="385"
                  y="100"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.4
                </text>
                <text x="385" y="115" textAnchor="middle" fill="white" fontSize="10">
                  Separation
                </text>
                <text
                  x="385"
                  y="130"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  SELV / PELV / sep.
                </text>
              </g>
              <g>
                <rect
                  x="460"
                  y="80"
                  width="130"
                  height="60"
                  rx="8"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.4"
                />
                <text
                  x="525"
                  y="100"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.5
                </text>
                <text x="525" y="115" textAnchor="middle" fill="white" fontSize="10">
                  Floor / wall R
                </text>
                <text
                  x="525"
                  y="130"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Reg 418 only
                </text>
              </g>
              <g>
                <rect
                  x="600"
                  y="80"
                  width="160"
                  height="60"
                  rx="8"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.4"
                />
                <text
                  x="680"
                  y="100"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.6
                </text>
                <text x="680" y="115" textAnchor="middle" fill="white" fontSize="10">
                  Polarity
                </text>
                <text
                  x="680"
                  y="130"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Origin + every accessory
                </text>
              </g>

              {/* Sequence arrows */}
              <line
                x1="170"
                y1="110"
                x2="180"
                y2="110"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="180,110 174,107 174,113" fill="rgba(255,255,255,0.4)" />
              <line
                x1="310"
                y1="110"
                x2="320"
                y2="110"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="320,110 314,107 314,113" fill="rgba(255,255,255,0.4)" />
              <line
                x1="450"
                y1="110"
                x2="460"
                y2="110"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="460,110 454,107 454,113" fill="rgba(255,255,255,0.4)" />
              <line
                x1="590"
                y1="110"
                x2="600"
                y2="110"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="600,110 594,107 594,113" fill="rgba(255,255,255,0.4)" />

              {/* Pre-energisation note */}
              <rect
                x="40"
                y="160"
                width="720"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.04)"
                stroke="rgba(34,197,94,0.18)"
                strokeWidth="1"
              />
              <text x="60" y="180" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reg 643.1 is explicit: 643.2 to 643.6 in this order, before the installation is
                energised.
              </text>
              <text x="60" y="198" fill="rgba(255,255,255,0.55)" fontSize="9.5">
                Why the order matters: insulation resistance reads on a circuit with broken CPC
                continuity will hide the real fault.
              </text>
              <text x="60" y="212" fill="rgba(255,255,255,0.55)" fontSize="9.5">
                Polarity check at end is the last sanity step before live tests are added.
              </text>

              {/* Post-energisation block */}
              <rect
                x="20"
                y="260"
                width="760"
                height="200"
                rx="12"
                fill="rgba(251,191,36,0.04)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1.5"
              />
              <text x="40" y="285" fill="#FBBF24" fontSize="12" fontWeight="bold">
                POST-ENERGISATION (Reg 643.7 → 643.11)
              </text>
              <text x="40" y="302" fill="rgba(255,255,255,0.5)" fontSize="10">
                Order is less prescriptive but logically driven: live tests, then RCDs, then phase
                sequence, then functional, then voltage drop.
              </text>

              <g>
                <rect
                  x="40"
                  y="320"
                  width="140"
                  height="60"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="110"
                  y="340"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.7
                </text>
                <text x="110" y="355" textAnchor="middle" fill="white" fontSize="10">
                  RA / Zs / Ipf
                </text>
                <text
                  x="110"
                  y="370"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Loop, electrode, fault
                </text>
              </g>
              <g>
                <rect
                  x="190"
                  y="320"
                  width="120"
                  height="60"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="250"
                  y="340"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.8
                </text>
                <text x="250" y="355" textAnchor="middle" fill="white" fontSize="10">
                  RCD operation
                </text>
                <text
                  x="250"
                  y="370"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Type-correct, ×1, ×5
                </text>
              </g>
              <g>
                <rect
                  x="320"
                  y="320"
                  width="120"
                  height="60"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="380"
                  y="340"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.9
                </text>
                <text x="380" y="355" textAnchor="middle" fill="white" fontSize="10">
                  Phase sequence
                </text>
                <text
                  x="380"
                  y="370"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  3-phase only
                </text>
              </g>
              <g>
                <rect
                  x="450"
                  y="320"
                  width="160"
                  height="60"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="530"
                  y="340"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.10
                </text>
                <text x="530" y="355" textAnchor="middle" fill="white" fontSize="10">
                  Functional checks
                </text>
                <text
                  x="530"
                  y="370"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Main sw + OCPDs + RCDs
                </text>
              </g>
              <g>
                <rect
                  x="620"
                  y="320"
                  width="140"
                  height="60"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="690"
                  y="340"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  643.11
                </text>
                <text x="690" y="355" textAnchor="middle" fill="white" fontSize="10">
                  Voltage drop
                </text>
                <text
                  x="690"
                  y="370"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Calc only, normally
                </text>
              </g>

              {/* Footer note */}
              <rect
                x="40"
                y="400"
                width="720"
                height="40"
                rx="8"
                fill="rgba(251,191,36,0.04)"
                stroke="rgba(251,191,36,0.18)"
                strokeWidth="1"
              />
              <text x="400" y="420" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Each test result is recorded against the specific Reg on the Schedule of Test
                Results — measured value, not just pass / fail.
              </text>
              <text
                x="400"
                y="434"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Equipment: BS EN 61557 compliant or equivalent (Reg 643.1).
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Inspection — Reg 642 in detail</ContentEyebrow>

          <ConceptBlock
            title="Reg 642.2 — what the inspection is verifying"
            plainEnglish="Reg 642.2 says the inspection shall verify that the installed electrical equipment (a) complies with Section 511, (b) is correctly selected and erected in accordance with BS 7671 and manufacturers’ instructions, and (c) is not visibly damaged or defective so as to impair safety."
          >
            <p>
              Section 511 covers compliance with the relevant standards — equipment carries the
              right marks, the right approvals, the right ratings. &ldquo;Mark or certification
              furnished by the installer or the manufacturer&rdquo; is permitted evidence (642.2(a)
              note). Selection and erection per BS 7671 and manufacturers’ instructions is the broad
              umbrella under which the rest of the inspection sits. Visible damage / defect is the
              on-the-day check.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 642.3 — the formal checklist (not exhaustive)"
            plainEnglish="Reg 642.3 gives a formal — but not exhaustive — list of items to be checked during inspection. GN3 makes the &lsquo;not exhaustive&rsquo; point explicitly: inspectors may need to check additional items beyond those listed where appropriate to the installation."
            onSite="The Appendix 6 schedule of inspections is the practical embodiment of Reg 642.3. A4:2026 simplified the schedule and added a non-mandatory checklist of inspection items as guidance (not required to be issued with the certificate)."
          >
            <p>
              The 642.3 list covers, broadly: connection of conductors; identification of
              conductors; routing of cables in safe zones; selection of conductors for
              current-carrying capacity and voltage drop; presence and correct rating of protective
              devices; selection of equipment and protective measures appropriate to external
              influences; identification of circuits, fuses, switches and terminals; presence of
              warning notices and labels; presence of diagrams, instructions and schematics;
              protection against electric shock; protection against thermal effects; protection
              against overcurrent; isolation and switching; condition of accessories including
              socket-outlets, switches and joint boxes (Reg 651.2(e)).
            </p>
            <p>
              When formulating bespoke schedules for larger or complex installations, GN3 is
              explicit: the bespoke schedule shall be based on the requirements of Reg 642.3 — it is
              not a free-form template.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Periodic inspection — Chapter 65</ContentEyebrow>

          <ConceptBlock
            title="Reg 651 — purpose, recording duty and competence"
            plainEnglish="Chapter 65 opens with Reg 651: the purpose of periodic inspection and testing (verify the installation remains in a satisfactory condition for continued use), the recording duty (Reg 651.4: details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report), and the competence requirement (Reg 651.5: shall be carried out by one or more skilled persons competent in such work)."
          >
            <p>
              The recording duty in Reg 651.4 is the source of the EICR classification codes (C1,
              C2, C3, FI). The codes themselves come from Appendix 6 model forms; the duty to record
              the defect comes from the regulation. A defect not recorded is a regulatory failure
              regardless of whether the inspector spotted it — and a defect spotted but not recorded
              is the regulatory failure that scheme operators most often pursue.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.4"
            clause={
              <>
                Details of any damage, deterioration, defects or dangerous conditions shall be
                recorded in a report.
              </>
            }
            meaning="Mandatory recording of every defect identified. Combined with Reg 653.1 (an EICR shall be produced upon completion of the periodic inspection and testing of an existing installation), this gives the full documentary obligation. The EICR is the report. The classification codes are how you make the report intelligible to the duty holder."
          />

          <ConceptBlock
            title="Reg 652 — frequency of periodic inspection and testing"
            plainEnglish="Reg 652.1 sets out that the frequency of periodic inspection and testing shall be determined by considering: type of installation and equipment, use and operation, frequency and quality of maintenance, external influences, previous certificates and reports. GN3 supplements this with the recommended maximum intervals (10 years owner-occupied domestic, 5 years rented domestic / commercial, 3 years industrial, 1 year swimming pool, 3 months construction site)."
          >
            <p>
              These are <em>maximum</em> intervals — the inspector is required to apply judgement.
              GN3 makes the point that Reg 652.1 gives guidance but does not remove the inspector’s
              obligation to make a reasonable and informed decision. A 10-year interval is the
              default for an owner-occupied dwelling in benign external influences with documented
              maintenance; it is not the mandatory interval for every dwelling.
            </p>
            <p>
              Reg 652.2 permits replacement of periodic inspection by an adequate regime of
              continuous monitoring and maintenance, where the installation is under an effective
              management system for preventative maintenance in normal use, and the monitoring is by
              skilled persons competent in such work. This is the route taken by major industrial /
              data centre / hospital estates with permanent in-house teams. The clause uses
              &ldquo;may&rdquo;, not &ldquo;shall&rdquo; — it permits the alternative; it does not
              require it.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 5-year EICR on a small commercial unit with patchy records"
            situation="You attend an EICR. The previous inspection was 5 years ago. The previous EICR is on file but is Amendment 2 vintage (pre-A4). The installation has had two CU changes since but the records are incomplete. The supply is TN-C-S; AFDDs were not fitted at the previous inspection but are recommended for the type of premises by Reg 421.1.7."
            whatToDo="Run the inspection under A4:2026 — that is the edition in force. The previous EICR is a useful reference for what changed but does not bind your present judgement. Apply Reg 642.3 inspection checklist with the A4 additions: AFDD operational indication (651.2(e) cluster), max permitted Zs from the schedule of circuit details, RCD type-correct testing (Type AC vs A), TN-C-S framing including PNB where present. Record AFDD absence as C3 (improvement recommended) by default — Reg 421.1.7 is recommendatory not mandatory — unless local risk factors push it to C2. Issue the EICR per Reg 653.1 using the A4 model form."
            whyItMatters="An EICR signed under the wrong edition is a defective document. From 15 October 2026 only A4:2026 applies to new certification. Pre-A4 model forms — including the schedule of inspections without the new columns — do not satisfy Reg 644.1 / 653.1. The duty holder relying on your EICR for letting compliance, insurance or HSE purposes inherits the defect."
          />

          <SectionRule />

          <ContentEyebrow>A4:2026 — the changes that hit Part 6 directly</ContentEyebrow>

          <ConceptBlock
            title="The A4 changes that affect every test schedule"
            plainEnglish="A4:2026 is in force from 15 April 2026. A3:2024 is withdrawn from 15 October 2026. A4 reorganised Part 6 (already covered) and changed several technical requirements that show up directly on the schedule of test results and schedule of circuit details."
            onSite="If you are using a tester or job-management package, confirm it has been updated for A4 model forms before signing certificates. The schedule columns are different — using a pre-A4 form for an A4 inspection produces an incomplete certificate."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>AFDD verification.</strong> Reg 421.1.7 (recommendation) + Reg 532.6
                (selection) + Reg 651.2(e) (operational indication). The Schedule of Circuit Details
                now has a column for AFDD where one is fitted. Verification at periodic inspection
                includes confirming the AFDD shows correct operational indication and is capable of
                being tested per manufacturer instructions.
              </li>
              <li>
                <strong>TN-C-S (PNB) recognition.</strong> A4 explicitly recognises the TN-C-S
                Protective Neutral Bonding (PNB) variant — common in some commercial supply
                arrangements — alongside the standard TN-C-S PME. The schedule of circuit details
                accommodates the distinction.
              </li>
              <li>
                <strong>Maximum permitted Zs column.</strong> A4 introduced an explicit
                max-permitted-Zs column on the Schedule of Circuit Details. Where the design
                specifies a tighter Zs than the BS 7671 Table 41 maximum, that tighter design value
                goes in the column — and the verification under Reg 643.7 / 411 is against the
                column value, not the table value.
              </li>
              <li>
                <strong>Reg 643.3 redraft.</strong> The 250 V DC follow-up test after equipment
                reconnection (covered above). Pre-A4 testers / forms did not have a column or
                workflow for this; A4-aware ones do.
              </li>
              <li>
                <strong>Appendix 6 model forms.</strong> EIC, MEIWC, EICR templates updated.
                Schedule of Inspections simplified. New non-mandatory checklist of inspection items
                added (guidance, not required to be issued with the certificate).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Quoting pre-A4 reg numbers (641.1, 641.7, 650.1) on A4 certificates"
            whatHappens="Inspector trained on Amendment 2 / 3 holds onto the old chapter numbers out of habit. EICR is signed with reference to Reg 641.1. Reviewer / scheme auditor flags the certificate because Reg 641.1 does not exist in the edition the certificate is supposed to be against. The certificate is now defective — the citation is wrong."
            doInstead="Update the cheat sheet you carry on the van. The substantive duty has not changed dramatically — it is the same test sequence in essence — but the regulation numbers have. Initial verification = Chapter 64, Reg 643.x. Periodic inspection = Chapter 65, Reg 651.x / 652.x / 653.x. Reference these on the certificate and in any observations."
          />

          <CommonMistake
            title="Skipping the 250 V DC follow-up after re-connecting electronic equipment"
            whatHappens="The primary 500 V insulation resistance test was correctly done with electronic loads (LED drivers, AFDDs, surge devices) disconnected. After reconnection, no follow-up test is performed. The schedule has no entry showing the connected-state insulation has been verified. A4 Reg 643.3.3 is unsatisfied; the certificate is defective."
            doInstead="After reconnecting any equipment that was disconnected for the primary IR test, run a 250 V DC test between live conductors and the protective conductor connected to the earthing arrangement, and record the result. Any reading less than 1 MΩ is a fail and triggers an investigation. This is now a routine part of the workflow on every IR test that involved disconnecting equipment."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <CommonMistake
            title="Treating the Reg 643.1 sequence as advisory"
            whatHappens="Inspector skips polarity (643.6) on existing accessories on a periodic inspection because &lsquo;they were polarity-checked at install&rsquo;. A reversed polarity has been introduced by a non-electrician adding a fused spur five years previously. The fault is missed. A subsequent appliance failure reveals the reversed polarity downstream."
            doInstead="Reg 643.1 says &ldquo;the tests of 643.2 to 643.6, where relevant, shall be carried out in that order&rdquo;. &lsquo;Where relevant&rsquo; means relevant to the installation, not relevant to the inspector’s opinion of likelihood. On every periodic inspection that includes work on, or sampling of, accessories, polarity is verified. The cost is seconds with a multifunction tester; the cost of missing it is the next deceased appliance — or the next deceased user."
          />

          <SectionRule />

          <ContentEyebrow>The certification side — Reg 644 and Reg 653</ContentEyebrow>

          <ConceptBlock
            title="Reg 644 — Certification for initial verification"
            plainEnglish="Reg 644 covers the EIC and MEIWC. Reg 644.3 requires inclusion of the extent of work, the Schedule(s) of Inspection, and the Schedule(s) of Circuit Details and Test Results based on the Appendix 6 models. Reg 644.4 requires the recommendation for the interval to the first periodic inspection (made by the designer under Reg 134.2.2) to be recorded on the EIC. Reg 644.5 covers compilation and authentication — by skilled person(s) competent to verify compliance with BS 7671."
          >
            <p>
              Reg 644.5 explicitly permits the certificate to be compiled and signed or
              authenticated by more than one person — for example, a separate designer, constructor
              and inspector. Each person signs for the parts of the work for which they are
              competent. This is the regulatory mechanism for the standard three-signature EIC
              workflow on larger jobs.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 653 — Reporting for periodic inspection and testing"
            plainEnglish="Reg 653.1 requires that, upon completion of the periodic inspection and testing of an existing installation, an Electrical Installation Condition Report shall be produced based on the model in Appendix 6. Reg 653.4 requires the recommended interval to the next periodic inspection to be recorded on the EICR (the periodic equivalent of Reg 644.4). Reg 653.5 requires the Report to be compiled and authenticated by a skilled person competent in such work."
          >
            <p>
              Reg 653.1 was modified in A4:2026 — the wording &ldquo;now requires&rdquo; in the
              standard’s amendment notes flags that the Appendix 6 notes for the person producing
              the report shall be taken into account when producing the EICR. Practitioners shall
              ensure they are using the A4 edition — the previous editions did not require those
              notes to be applied.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Part 6 in A4:2026 is restructured. Initial verification = Chapter 64 (Reg 641 / 642 / 643 / 644). Periodic inspection = Chapter 65 (Reg 651 / 652 / 653). Pre-A4 reg numbers (641.1, 641.7, 650.1) do not exist in the current edition.',
              'Reg 643.1 fixes the order: 643.2 continuity → 643.3 IR → 643.4 separation → 643.5 floor/wall → 643.6 polarity, all before energisation. 643.7 onwards may be live.',
              'Reg 642.1: inspection precedes testing, normally with the supply disconnected. Reg 642.3 gives the formal but non-exhaustive checklist.',
              'Reg 643.3.3 (A4): after re-connecting equipment that was disconnected for the primary IR test, run a 250 V DC test between live conductors and earth and record it.',
              'Reg 651.4: every defect / damage / deterioration / dangerous condition is recorded in the report. Reg 651.5: skilled persons competent in such work — same competence test as initial verification.',
              'Reg 652.1: inspection frequency is judged on type, use, maintenance, external influences, prior records — not a fixed mandatory interval. Reg 652.2 permits replacement by continuous monitoring under an effective management system.',
              'A4 changes that hit the schedule directly: AFDD verification (421.1.7 / 532.6 / 651.2(e)), max permitted Zs column, TN-C-S (PNB) recognition, updated Appendix 6 model forms.',
              'BS 7671:2018+A4:2026 in force 15 April 2026; A3:2024 withdrawn 15 October 2026. Check edition on every certificate, every form, every tester firmware.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why was Part 6 renumbered? My old certificates all reference 641.1 / 641.7 / 650.1.',
                answer:
                  'A4:2026 brought Part 6 into alignment with the CENELEC standard for inspection and testing. The technical content is largely the same — what changed is the chapter and regulation numbers. Pre-A4 references map approximately: old Chapter 61 → new Chapter 64; old Chapter 62 → new Chapter 65; old 641.1 (every installation inspected and tested) → 134.2 + 643.x in current edition. Update your reference materials and certificate templates; old reg numbers on a current EIC are technically a defective citation.',
              },
              {
                question:
                  'Reg 643.1 says &lsquo;where relevant&rsquo; — when is a test not relevant?',
                answer:
                  'Reg 643.4 (separation) is not relevant if SELV / PELV / electrical separation is not the protective measure used. Reg 643.5 (floor / wall resistance) is not relevant unless Reg 418 applies. Reg 643.9 (phase sequence) is not relevant on single-phase installations. The other tests are essentially always relevant to a fixed installation under BS 7671. &lsquo;Not relevant&rsquo; is a narrow technical exclusion, not a convenience exit — and on the schedule of test results, the entry is &lsquo;N/A&rsquo; with the reason, not blank.',
              },
              {
                question:
                  'Do I need to do a 250 V DC follow-up on every circuit, or only where I disconnected equipment?',
                answer:
                  'Reg 643.3.3 second sentence is conditional: it applies following connection of equipment that was disconnected for the prior insulation test. If you ran the 500 V IR test with everything connected (because the equipment can tolerate it), there is no disconnection-and-reconnection step and no 643.3.3 follow-up needed. If you disconnected anything for the primary IR — LED drivers, AFDDs, surge devices, dimmers — the follow-up is mandatory after reconnection.',
              },
              {
                question:
                  'A4:2026 has an explicit max-permitted-Zs column. When is it different from the Table 41 value?',
                answer:
                  'The Table 41.3 / 41.5 max Zs is the BS 7671 default for a given protective device and disconnection time. The design max permitted Zs (the new A4 column) is what the designer specified, which may be tighter — for example where the designer has reserved headroom for cable temperature rise, or where a special location requires a more aggressive disconnection time. The verification at Reg 643.7 / 411 is against the design value where one is recorded; against the Table 41 value otherwise. Always check the column before assuming Table 41 applies.',
              },
              {
                question:
                  'GN3 is non-statutory. Does that mean I can ignore the recommended maximum intervals?',
                answer:
                  'You can depart from them, but you have to justify the departure. Reg 652.1 requires the inspector to apply judgement; GN3 supplies the standard benchmarks (10 years owner-occupied domestic, 5 years rented / commercial, etc.). A departure to a longer interval would have to be supported by external influences, condition of the installation, and the management regime. A departure to a shorter interval rarely needs justification. Departures from GN3 maximum intervals to longer intervals are flagged routinely by scheme operators and rarely defended successfully.',
              },
              {
                question:
                  'What is the difference between the Schedule of Inspections and the Schedule of Test Results, and when do I use each?',
                answer:
                  'The Schedule of Inspections records the visual / documentary inspection findings under Reg 642.2 / 642.3 — selection and erection compliance, identification, presence of warning notices, condition of accessories, etc. The Schedule of Test Results records the numeric test values under Reg 643.x — continuity, IR, Zs, RCD trip times, prospective fault current. Both schedules are required for every EIC and every EICR. A4:2026 simplified the Schedule of Inspections format and added a non-mandatory checklist as guidance.',
              },
              {
                question:
                  'Reg 652.2 lets me replace periodic inspection with continuous monitoring. Can I use this on a normal commercial estate?',
                answer:
                  'Only if the conditions are met: an effective management system for preventative maintenance in normal use, an adequate regime of continuous monitoring, and skilled persons competent in such work doing the monitoring. This is realistic for a hospital estate with a 24/7 in-house team and condition-monitoring software. It is not realistic for a small commercial unit with a part-time facilities manager. The clause uses &ldquo;may&rdquo;, not &ldquo;shall&rdquo; — it permits the alternative when justified, it does not authorise skipping periodic inspection on convenience grounds.',
              },
              {
                question: 'Where does AFDD verification sit in the test sequence?',
                answer:
                  'AFDD verification on initial verification is part of the inspection (Reg 642.3 — presence and correct rating of protective devices) and the functional check (Reg 643.10). AFDD verification on periodic inspection is anchored by Reg 651.2(e) cluster — confirmation of operational indication. Where AFDDs are not fitted but are recommended by Reg 421.1.7 for the type of premises, the absence is recorded as an observation on the EICR — typically C3 (improvement recommended), unless local risk factors push it to C2.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="BS 7671 testing requirements overview — Module 1.2"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-1/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Test equipment and calibration
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule1Section2;
