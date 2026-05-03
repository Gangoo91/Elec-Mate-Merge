/**
 * Module 5 · Section 1 · Subsection 3 — IET Guidance Note 3 — what it adds
 * Maps to C&G 2365-03 / Unit 304 / LO2 / AC 2.3, 2.4 + LO4 / AC 4.1
 *   AC 2.3 — "identify the relevant documents associated with the inspection, testing and commissioning of an electrical installation"
 *   AC 2.4 — "specify the information required by the inspector to conduct the initial verification"
 *   AC 4.1 — "state the tests to be carried out on an electrical installation in accordance with BS 7671 and IET Guidance Note 3"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 2.2, 2.3
 *
 * GN3 sits alongside BS 7671 — the "how" to BS 7671's "what". This Sub
 * walks the structure of GN3 (current 9th Edition 2022 + A4 update) and
 * shows where to look for test methods, model schedules, frequency tables,
 * and worked examples.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'IET Guidance Note 3 — what it adds | Level 3 Module 5.1.3 | Elec-Mate';
const DESCRIPTION =
  'Guidance Note 3 (GN3, 9th Edition + A4 update) — the IET\'s practical companion to BS 7671 Part 6. Test sequences, model schedules, worked examples, frequency tables, and where to look for what.';

const checks = [
  {
    id: 'm5-s1-sub3-gn3-status',
    question: 'GN3 has what legal status relative to BS 7671?',
    options: [
      'GN3 is a statutory document with the force of law.',
      'GN3 is a non-statutory IET publication that provides practical guidance on how to comply with BS 7671 Part 6 — it expands on test methods, sequences, acceptance criteria and frequency tables.',
      'GN3 supersedes BS 7671.',
      'GN3 only applies to commercial installations.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 is published by the IET as practical guidance. It is not statutory and does not replace BS 7671. It is the recognised practitioner reference for HOW to verify and inspect installations to BS 7671. Where BS 7671 says "verify continuity", GN3 tells you the methods (R1+R2, R2-only, the three-part ring test) and the acceptable readings.',
  },
  {
    id: 'm5-s1-sub3-frequency',
    question: 'GN3 contains a frequency table for periodic inspection. For an owner-occupied dwelling the recommendation is typically:',
    options: [
      'Every 12 months.',
      'Every 10 years, OR on change of occupancy — whichever is sooner.',
      'Every 25 years.',
      'No periodic inspection required.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 Table 3.2 (frequency of periodic inspection) gives 10 years for owner-occupied domestic, OR change of occupancy, whichever sooner. Rented domestic = 5 years (now reinforced by the Electrical Safety Standards in the Private Rented Sector regulations). Commercial = 5 years generally. Industrial = 3 years. Special locations have shorter intervals — caravans/marinas annual.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'GN3 Section 5 contains:',
    options: [
      'A model Schedule of Inspections that practitioners may use as a template.',
      'The legal definition of "duty holder".',
      'Cable sizing tables.',
      'Lightning protection design guidance.',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 Section 5 holds the model Schedule of Inspections — a practical template that mirrors and expands on the BS 7671 Appendix 6 form. Practitioners can use it directly, adapt it for their own forms, or use it as a cross-check that scheme-branded forms cover all required items.',
  },
  {
    id: 2,
    question: 'When the GN3 inspection-and-testing checklist refers to "periodic testing" activities, the checklist applies:',
    options: [
      'Only to one-off works.',
      'Specifically to periodic inspection and testing intervals — it is intended for use during periodic verification rather than initial verification.',
      'To both initial and periodic verification interchangeably.',
      'Only to commercial installations.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 makes a distinction between checklists for initial verification (Section 5) and periodic inspection (Section 3). Mixing them up is a common error. The periodic checklist is designed around the EICR coding framework (C1/C2/C3/FI) and asks "what is the condition NOW?" rather than "does this comply with the design?". The initial verification checklist asks the latter.',
  },
  {
    id: 3,
    question: 'GN3 9th Edition + A4 update is the current edition. What changed in the A4 update relative to earlier editions?',
    options: [
      'Nothing — guidance notes do not get amendment updates.',
      'GN3 was updated to align with BS 7671:2018+A4:2026 — including the simplified RCD test method (single AC at 1×IΔn under Reg 643.7.3), AFDD recommendations under Reg 421.1.7, and updated Table 41.3 maximum Zs values.',
      'GN3 was withdrawn.',
      'GN3 was merged with GN1.',
    ],
    correctAnswer: 1,
    explanation:
      'IET guidance notes get amendment updates to align with BS 7671 amendments. GN3 9th Edition 2022 was updated to follow A4:2026. Practitioners should ensure they are working from the current edition — using older editions risks applying superseded test methods (notably the old multi-test RCD sequence with Table 3A values).',
  },
  {
    id: 4,
    question: 'GN3 specifies the four-terminal earth tester for measuring earth electrode resistance because:',
    options: [
      'It is more expensive.',
      'It separates current and potential connections (C1/P1, C2/P2), reducing measurement error from lead resistance and giving a direct reading of the electrode-plus-soil resistance.',
      'It uses less power.',
      'It is required only for TT systems.',
    ],
    correctAnswer: 1,
    explanation:
      'The four-terminal arrangement injects current via C1/C2 and measures voltage via P1/P2. This separates current and voltage paths so the resistance of the test leads does not appear in the reading. Two-terminal earth resistance measurements are unreliable for low resistances. GN3 mandates the four-terminal arrangement.',
  },
  {
    id: 5,
    question: 'When carrying out an earth electrode test under GN3 guidance, parallel metallic paths (bonded water/gas services, adjacent earthing systems) should be:',
    options: [
      'Ignored.',
      'Isolated or disconnected before the test, so test current is not diverted through them and the reading reflects the electrode resistance alone.',
      'Tested separately and added to the result.',
      'Used to amplify the reading.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3: "the tester shall ensure that current is not diverted through parallel metallic paths such as bonded metallic water/gas services, adjacent earthing systems, or other conductors. If such paths exist they shall be isolated or disconnected before the test." Otherwise the electrode resistance reading is artificially low because some test current returns via the parallel path.',
  },
  {
    id: 6,
    question: 'GN3 advice on when to carry out earth electrode testing:',
    options: [
      'Only in summer.',
      'Ideally in least-favourable ground conditions — for example when soil is frozen or very dry — to obtain conservative results.',
      'Only after rain.',
      'There is no recommended time.',
    ],
    correctAnswer: 1,
    explanation:
      'Soil resistivity varies with moisture and temperature. Testing in least-favourable conditions gives a conservative (worst-case) reading. GN3 cites frozen and very dry soil as examples of least-favourable conditions. This matters in TT systems where the electrode is the fault current path — designing on a damp summer reading and then having a frozen January where Zs is too high to trip the protective device is the failure mode this guidance is meant to prevent.',
  },
  {
    id: 7,
    question: 'GN3 dynamic risk assessment requirement:',
    options: [
      'Risk assessment is done once at the start and never revisited.',
      'If unexpected issues are discovered during inspection and testing, the person carrying out the work shall perform a dynamic risk assessment to determine immediate actions, any change to test sequence, and the need for additional precautions.',
      'Risk assessments are only needed for live working.',
      'Risk assessment is the client\'s responsibility.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 explicitly requires dynamic risk assessment on discovery of unexpected issues. Verification work routinely turns up things the original design didn\'t anticipate — degraded equipment, undocumented alterations, mis-coloured conductors, energised parts you didn\'t expect to be live. The dynamic risk assessment lets you stop, reassess, change approach if needed, and document the decision.',
  },
  {
    id: 8,
    question: 'The information the inspector needs to conduct initial verification (per Reg 642.1 and GN3) does NOT include:',
    options: [
      'Maximum demand and ADS arrangement.',
      'The number and type of live conductors.',
      'Earthing system (TN-S/TN-C-S/TT) and Ze.',
      'The cost of the original installation work.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Reg 642.1 lists the information needed for verification: maximum demand, number and type of live conductors, earthing arrangement, type and rating of overcurrent protective devices, RCD types and IΔn values, prospective short-circuit at origin, type of supply, conductor type and cross-section, lengths and routes for circuits being tested. Cost is irrelevant. Designer drawings, schedules, and as-built records are required to confirm the installation matches the design intent.',
  },
];

const faqs = [
  {
    question: 'Do I need to buy GN3 or can I just use BS 7671?',
    answer:
      'BS 7671 tells you WHAT to verify; GN3 tells you HOW. You can verify a simple installation with BS 7671 alone if you already know the methods. For anyone doing inspection and testing as a regular part of their work — and definitely for anyone studying for 2391, 2394, or 2395 — GN3 is essentially required reading. The combination of BS 7671 + GN3 + the IET On-Site Guide is the standard practitioner library.',
  },
  {
    question: 'Why does GN3 contain so many examples of test instruments?',
    answer:
      'Because instrument selection and fitness-for-purpose is part of the inspector\'s competence. GN3 illustrates the types of instruments needed (low-resistance ohmmeter to BS EN 61557-4, insulation tester to BS EN 61557-2, loop impedance tester to BS EN 61557-3, RCD tester to BS EN 61557-6, earth electrode tester to BS EN 61557-5) so inspectors can verify their kit is appropriate. HSE GS38 also covers test leads and probe safety.',
  },
  {
    question: 'GN3 references "the test sequence" — is this the same as BS 7671 Reg 643.1?',
    answer:
      'Yes — GN3 expands on the BS 7671 Reg 643.1 sequence with the rationale, the practical methods, and the acceptance criteria for each step. It also covers the periodic testing sequence which differs in approach (more sampling, more visual, less complete dead-test) — covered in GN3 Chapter 3.',
  },
  {
    question: 'What about IET On-Site Guide vs GN3?',
    answer:
      'On-Site Guide (OSG) is a more compact practitioner reference focused on common domestic and small commercial situations — quick reference for cable sizes, common circuits, standard arrangements. GN3 is the deeper inspection-and-testing-specific reference. For Level 3 you need both, but GN3 is the load-bearing document for Unit 304 / 607 / 302.',
  },
  {
    question: 'GN3 Chapter 2 vs Chapter 3 vs Chapter 5 — what is the layout?',
    answer:
      'GN3 9th Edition 2022 (A4 update) layout: Chapter 1 introduction, Chapter 2 initial verification (the deep dive on Reg 641-644), Chapter 3 periodic inspection (EICR methodology and coding), Chapter 4 inspection and testing of equipment, Chapter 5 model forms and worked examples (the Schedule of Inspections template). Plus appendices with frequency tables, sample certificates, Zs maximums, and instrument standards.',
  },
  {
    question: 'How do I keep GN3 current with BS 7671 amendments?',
    answer:
      'IET republishes GN3 with each BS 7671 amendment. The current edition (9th Edition 2022 + A4 update) aligns with BS 7671:2018+A4:2026. When a new amendment is published, check IET communications and the IET shop for the updated guidance note. Working from a superseded edition risks applying out-of-date test methods (most importantly the simplified A4 RCD test versus the older multi-test method).',
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 3"
            title="IET Guidance Note 3 — what it adds"
            description="GN3 9th Edition 2022 (A4 update) — the IET's practical companion to BS 7671 Part 6. Test methods, model forms, frequency tables, and the dynamic risk assessment requirement."
            tone="emerald"
          />

          <TLDR
            points={[
              'GN3 is non-statutory IET guidance that provides practical detail on HOW to comply with BS 7671 Part 6.',
              'Current edition: 9th Edition 2022 + A4 update — aligned to BS 7671:2018+A4:2026 including the simplified RCD test method.',
              'GN3 contains the model Schedule of Inspections (Section 5), test methods (Chapter 2), periodic inspection methodology (Chapter 3), and frequency tables.',
              'Reg 642.1 + GN3 list the information the inspector needs BEFORE testing — supply characteristics, ADS arrangement, conductor data, Ze.',
              'GN3 mandates dynamic risk assessment when unexpected issues surface during testing — re-evaluate the approach, document the decision.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the legal status of GN3 relative to BS 7671 (non-statutory practical guidance).',
              'Identify the GN3 chapter structure and what each chapter covers.',
              'Locate the model Schedule of Inspections in GN3 Section 5.',
              'Cite the GN3 frequency table values for typical installation types.',
              'Explain the four-terminal earth electrode test rationale per GN3.',
              'Describe the GN3 dynamic risk assessment requirement and when it applies.',
              'List the information required for initial verification per Reg 642.1 and GN3.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>What GN3 is and is not</ContentEyebrow>

          <ConceptBlock
            title="The 'how' to BS 7671's 'what'"
            plainEnglish="BS 7671 specifies WHAT to verify and the acceptance criteria. GN3 explains HOW — the methods, the instruments, the sequence rationale, the model forms, the worked examples. They are designed to be used together."
            onSite="Working from BS 7671 alone for inspection and testing is theoretically possible but practically unwise. GN3 turns the regulation language into procedure. For Unit 304 study and for working as an electrician, GN3 should be on the bench alongside the regs book."
          >
            <p>The relationship in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 Reg 643.2 says</strong> "the continuity of conductors shall be
                verified by a measurement of resistance".
              </li>
              <li>
                <strong>GN3 Chapter 2 explains</strong> the R1+R2 method (line and CPC linked
                together at the CU, walk to the far end, read), the R2-only method (long lead from
                the MET, read between MET and far-end CPC), the three-part ring final method
                (end-to-end, then L-N cross-connection, then L-CPC cross-connection), how to null
                the leads, what the expected readings are for typical cable sizes, and what to
                do when readings do not match expectation.
              </li>
            </ul>
            <p>
              GN3 is a non-statutory IET publication. It does not have the force of law. But it
              is widely accepted as the standard of practice — what a competent person should
              know and apply. Using its methods and acceptance criteria is the safe route to
              demonstrating BS 7671 compliance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Reference and status (paraphrased)"
            clause="Guidance Note 3 provides additional practical notes on initial verification and periodic testing beyond BS 7671, including recommended test sequences, record keeping, interpretation of results, and handling of live testing where necessary. These notes are intended as a practical companion to BS 7671 Part 6."
            meaning={
              <>
                GN3's self-stated role: practical companion to Part 6. It does not invent new
                requirements (those come from BS 7671) but it tells you the recommended methods
                and acceptable practice. Where Part 6 says "verify", GN3 shows you how. Where Part
                6 sets a numerical threshold (1 MΩ IR for example), GN3 explains the test method
                that gets you to that number reliably.
              </>
            }
            cite="Source: IET Guidance Note 3, 9th Edition 2022 (A4 update), Chapter 1 — paraphrased."
          />

          <SectionRule />

          <ContentEyebrow>Inside GN3 — chapter map</ContentEyebrow>

          <ConceptBlock
            title="GN3 chapter structure and where to look"
            plainEnglish="GN3 is organised by activity: Chapter 2 covers initial verification, Chapter 3 covers periodic inspection, Chapter 4 covers equipment testing, Chapter 5 holds the model forms. Memorise the layout — finding the right page fast is half the value."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 1 — Introduction.</strong> Scope, definitions, status of the
                guidance, relationship to BS 7671.
              </li>
              <li>
                <strong>Chapter 2 — Initial verification.</strong> The deep dive on Reg 641-644.
                Test methods, sequence, acceptance criteria, instrument requirements, leads to
                HSE GS38, calibration. This is where you find HOW to do every test in the BS 7671
                sequence.
              </li>
              <li>
                <strong>Chapter 3 — Periodic inspection.</strong> EICR methodology — sampling,
                visual inspection, what to test (and what to skip), C1/C2/C3/FI coding rubric,
                report production. Includes the frequency table.
              </li>
              <li>
                <strong>Chapter 4 — Inspection and testing of equipment.</strong> Specific
                equipment and special-location considerations. Bonding to extraneous parts,
                electrode systems, RCD/RCBO testing in detail.
              </li>
              <li>
                <strong>Chapter 5 — Model forms and worked examples.</strong> The model Schedule
                of Inspections, model Schedule of Test Results, fully completed example
                certificates. Use these as templates and as cross-checks.
              </li>
              <li>
                <strong>Appendices.</strong> Frequency tables (3.2 etc.), maximum Zs values
                cross-referenced to A4:2026, instrument BS EN standards reference, calibration
                guidance.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — model Schedule of Inspections (Section 5)"
            clause="Practitioners are recommended to use the model Schedule of Inspections shown in Section 5 of Guidance Note 3 as a basis for recording inspections during the erection and testing stages, adapting as necessary for project specifics."
            meaning={
              <>
                The GN3 Section 5 model is the recognised template. Scheme apps and paper forms
                are typically based on it. Using it (or a scheme derivation of it) means you cover
                all the BS 7671 Reg 642.3 items by default. Adapting for project specifics is
                expected — add Part 7 special-location items where relevant, add bespoke items
                for unusual installations.
              </>
            }
            cite="Source: IET Guidance Note 3, 9th Edition 2022 (A4 update), Section 5."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Information required before testing — Reg 642.1</ContentEyebrow>

          <ConceptBlock
            title="What you need to know BEFORE you can verify"
            plainEnglish="Reg 642.1 requires the inspector to have specific information before starting verification — the supply characteristics, the ADS arrangement, the design data, the as-built records. Without it, you can\'t apply the correct acceptance criteria."
            onSite="Get the design pack from the contractor: single-line diagram, schedule of circuits, designer\'s calculations for Ze and Zs, type-test data for protective devices. If you didn\'t design the install, you need this from whoever did."
          >
            <p>The information set required for initial verification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maximum demand</strong> of the installation, in kVA or A — to confirm
                supply and protective devices are adequately sized.
              </li>
              <li>
                <strong>Number and type of live conductors</strong> — single-phase 2-wire,
                three-phase 3-wire / 4-wire, plus any control circuits.
              </li>
              <li>
                <strong>Earthing system</strong> at the origin — TN-S, TN-C-S (PME / PNB), or TT —
                determines the ADS arrangement and the Ze contribution.
              </li>
              <li>
                <strong>Ze</strong> — the external earth fault loop impedance at the origin, from
                supply declaration or measurement.
              </li>
              <li>
                <strong>Prospective short-circuit current</strong> at the origin — for protective
                device breaking-capacity verification.
              </li>
              <li>
                <strong>Type and rating of overcurrent protective devices</strong> at the origin
                and for each circuit.
              </li>
              <li>
                <strong>RCD types and IΔn values</strong> where additional protection is provided.
              </li>
              <li>
                <strong>Conductor types, sizes, lengths and routes</strong> for each circuit
                being verified — to compute expected R1+R2 and confirm Zs.
              </li>
              <li>
                <strong>Designer\'s declared compliance arrangements</strong> — including any
                departures from BS 7671 with documented justification.
              </li>
              <li>
                <strong>As-built drawings and circuit charts</strong> — particularly important for
                periodic inspection of an installation altered over time.
              </li>
            </ul>
            <p>
              Without this information you cannot meaningfully verify. A measured Zs of 0.42 Ω is
              meaningless until you know it should be compared against Table 41.3 for a Type B 32 A
              device (1.37 Ω corrected to 1.10 Ω with the 0.8 multiplier — easy pass). Get the
              data first, then test.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Starting verification without the design data"
            whatHappens={
              <>
                You arrive on a 16-circuit commercial install. No design pack provided. You start
                the dead-test sequence — readings look fine. You sign the EIC based on what
                appears to be a passing set of measurements. Six months later a circuit trips
                spuriously and the duty holder calls. Investigation reveals the protective device
                rating was wrong for the load — a 32 A MCB on a 4 mm² cable run that
                actually only supports 27 A given the install method. The Zs measurement was
                technically a pass but the device was incorrectly selected at design stage.
                Without the design data you couldn\'t catch the design fault — you only verified
                the install matched what was on site, not that the design was right.
              </>
            }
            doInstead={
              <>
                Always get the design data before verification. Single-line diagram, circuit
                schedule, Ze and Zs design values, protective device data with breaking capacity,
                cable sizing calculations. Cross-check the data against what is installed BEFORE
                the dead-test sequence. If the design data is missing or inconsistent, escalate
                — do not proceed with a verification that cannot validate the design intent. The
                EIC has space for "departures from BS 7671" but no space for "designer didn\'t
                provide the data so I made it up".
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="GN3 frequency tables — periodic intervals"
            plainEnglish="GN3 Table 3.2 gives the recommended maximum periods between periodic inspections. Domestic owner-occupied 10 years, rented domestic 5 years (now reinforced by the Electrical Safety Standards in the Private Rented Sector regulations 2020), commercial 5 years, industrial 3 years. Special locations have shorter intervals — caravans / marinas annually."
            onSite="Set the next inspection date on the EIC / EICR per Table 3.2 — adjusted by professional judgement for the specific installation. A heavily-used commercial industrial bakery isn't on a 5-year cycle; bring it forward. A lightly-used office storeroom isn't on a 3-year cycle; the table is a starting point, not a rigid rule."
          >
            <p>Common Table 3.2 maximum intervals (in years unless stated):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic — owner-occupied.</strong> 10 years OR change of occupancy,
                whichever sooner.
              </li>
              <li>
                <strong>Domestic — rented (private rental sector).</strong> 5 years (mandatory
                under the Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020 — landlord duty, criminal offence not to comply).
              </li>
              <li>
                <strong>Commercial.</strong> 5 years OR change of occupancy.
              </li>
              <li>
                <strong>Industrial.</strong> 3 years.
              </li>
              <li>
                <strong>Educational establishments.</strong> 5 years.
              </li>
              <li>
                <strong>Hospitals (Group 1).</strong> 5 years; Group 2 critical care areas
                annual or per local clinical engineering policy.
              </li>
              <li>
                <strong>Hotels / pubs / restaurants.</strong> 5 years.
              </li>
              <li>
                <strong>Construction sites.</strong> 3 months (rapid environment changes,
                deterioration accelerated).
              </li>
              <li>
                <strong>Caravans (touring).</strong> Annually.
              </li>
              <li>
                <strong>Caravan parks / marinas.</strong> Annually.
              </li>
              <li>
                <strong>Petrol stations.</strong> Annually.
              </li>
              <li>
                <strong>Swimming pools.</strong> Annually.
              </li>
              <li>
                <strong>Cinemas / theatres.</strong> 1-3 years per use intensity.
              </li>
              <li>
                <strong>Places of public entertainment.</strong> Per local licensing requirements,
                often annual.
              </li>
            </ul>
            <p>
              The interval set is the inspector's decision recorded as a "reasonable and informed
              decision" — must be defensible if challenged. Where you set shorter than the table,
              note the rationale (high use, hostile environment, changes since last inspection).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="GN3 instrument standards — what your kit must comply with"
            plainEnglish="Each test instrument category has a BS EN standard that defines its accuracy, safety, and test method. GN3 references these so the inspector can confirm their kit is fit for purpose. Calibration is the second half — instruments drift and must be verified annually."
            onSite="Check the back of every test instrument for the BS EN reference. Check the calibration sticker for the next-due date. An instrument out of calibration is not fit for verification — readings are unsupported. Most schemes audit calibration; expired calibration is a finding."
          >
            <p>Instrument standards referenced by GN3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 61557-1.</strong> General requirements for electrical safety in
                low-voltage distribution systems up to 1 kV AC and 1.5 kV DC. The umbrella
                standard.
              </li>
              <li>
                <strong>BS EN 61557-2.</strong> Insulation resistance testers. Test voltage,
                accuracy, output current limits.
              </li>
              <li>
                <strong>BS EN 61557-3.</strong> Loop impedance testers. No-trip and high-current
                methods, accuracy, fault loop measurement.
              </li>
              <li>
                <strong>BS EN 61557-4.</strong> Low-resistance ohmmeters (continuity testers).
                Test current at least 200 mA, open-circuit voltage 4-24 V, accuracy.
              </li>
              <li>
                <strong>BS EN 61557-5.</strong> Earth electrode resistance testers. Four-terminal
                method, AC test current to avoid polarisation, accuracy.
              </li>
              <li>
                <strong>BS EN 61557-6.</strong> RCD testers. Test current waveforms (AC, A, F, B
                type compatibility), trip-time accuracy, no-trip current verification.
              </li>
              <li>
                <strong>BS EN 61557-9.</strong> Insulation fault location systems.
              </li>
              <li>
                <strong>BS EN 61557-10.</strong> Multifunction measuring instruments. Combines
                several functions; each must meet the corresponding individual standard.
              </li>
              <li>
                <strong>HSE GS38.</strong> Test leads, probes, and accessories — fused leads,
                4 mm exposed metal max, no live clip terminations, finger barriers, prove-test-prove
                method.
              </li>
            </ul>
            <p>
              Calibration: typically annual via UKAS-accredited laboratory (or manufacturer
              service centre). Some scheme rules accept user-verification against a calibrated
              reference but this is not the equivalent of formal calibration. Keep certificates
              for at least the next two calibration cycles.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="GN3 measured-vs-tabulated — the 0.8 multiplier and conductor temperature"
            plainEnglish="BS 7671 Table 41.3 max Zs values assume conductors at full operating temperature (typically 70°C for thermoplastic, 90°C for thermosetting). Real-world site measurements happen at ambient (15-20°C). Conductors are colder, so resistance is lower, so measured Zs is lower than it would be at operating temperature. GN3 mandates a 0.8 multiplier on the tabulated value to derive a realistic ambient-temperature comparison limit."
            onSite="Always apply the 0.8 multiplier when comparing site-measured Zs against Table 41.3. B32 max 1.37 Ω becomes 1.10 Ω at ambient. Reading 1.05 Ω = pass; reading 1.20 Ω = fail (even though it's below the raw tabulated value). This catches marginal installations that would fail at operating temperature."
          >
            <p>Why the 0.8 multiplier exists:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductor resistance varies with temperature.</strong> Copper temperature
                coefficient is approximately 0.004/°C. A conductor at 70°C has roughly 20% higher
                resistance than the same conductor at 20°C.
              </li>
              <li>
                <strong>Table 41.3 assumes operating temperature.</strong> The maximum Zs values
                are designed to ensure ADS works under fault, when conductors heat rapidly.
              </li>
              <li>
                <strong>Site testing happens cold.</strong> Verification typically occurs before
                circuits are loaded, so conductors are at ambient.
              </li>
              <li>
                <strong>0.8 multiplier compensates.</strong> 1.0 / 1.20 ≈ 0.83, rounded to 0.8 by
                BS 7671 for simplicity. Applied to the tabulated value gives the ambient-temperature
                acceptance limit.
              </li>
              <li>
                <strong>Alternative — temperature correction calculation.</strong> Where ambient
                differs significantly from 20°C, a more precise calculation can be done per BS 7671
                Appendix 3. The 0.8 multiplier is the practical shortcut.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="GN3 dynamic risk assessment — the in-test reset"
            plainEnglish="Verification regularly turns up things the design didn't anticipate — degraded equipment, undocumented alterations, mis-coloured conductors, energised parts you didn't expect to be live. GN3 explicitly requires a dynamic risk assessment on discovery of any unexpected issue. Stop, reassess, change approach if needed, document the decision."
            onSite="Don't 'just push through' surprises. The moment something doesn't match the design or your expectation, stop. New isolation needed? Different test method? Additional precautions? Make the decision, document it, then proceed. The few minutes lost are nothing compared with the consequences of pushing through and discovering you've energised a defect or exposed yourself to a live conductor that should have been dead."
          >
            <p>Common in-test surprises requiring dynamic risk assessment:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Found a circuit live that should be dead.</strong> Re-isolate, identify
                the unexpected source (cross-wired CPC, backfeed from another circuit, supply
                from a separate distribution panel not on the design), document, then proceed.
              </li>
              <li>
                <strong>IR reading suspiciously high (open neutral?) or low (incipient fault).</strong>
                Investigate before proceeding to live tests — energising into a fault is the
                failure mode this guidance prevents.
              </li>
              <li>
                <strong>Found a special location not on the design.</strong> A bathroom converted
                to a wet room, a swimming pool added in an extension, a livestock pen built onto
                an outbuilding. Add the Part 7 inspection items, reassess Zs limits, RCD type.
              </li>
              <li>
                <strong>Found undocumented protective device.</strong> An RCD added by a previous
                installer, an SPD retrofitted, an AFDD on one circuit. Verify type / rating, add
                to the test plan.
              </li>
              <li>
                <strong>Found wrong conductor colours / mixed colours.</strong> Reg 514.14 notice
                check, polarity verification, careful documentation.
              </li>
              <li>
                <strong>Found a fault during testing.</strong> Reg 643.1 — remedy and restart from
                the relevant point in the sequence, do not just patch and continue.
              </li>
            </ul>
            <p>
              Document the dynamic risk assessment in the project file: what was found, what was
              decided, what changed in the test plan, what the rationale was. This protects the
              inspector and provides a record if anything is later questioned.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="GN3 vs IET On-Site Guide vs BS 7671 — the practitioner triangle"
            plainEnglish="BS 7671 is the regulation. GN3 is the inspection-and-testing-specific guidance. The IET On-Site Guide (OSG) is the more compact practitioner reference focused on common domestic / small commercial situations. Use all three together — each fills a different role."
            onSite="OSG on the van for quick reference (cable sizes for common domestic circuits, standard arrangements). GN3 in the bag for site verification work (test methods, frequency tables, model schedules). BS 7671 on the office shelf and digital for design-stage work and any unusual situation. Don't try to substitute one for another — they're written for different uses."
          >
            <p>The practitioner triangle in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:2018+A4:2026 — the regulation book.</strong> 600+ pages of
                regulations covering design, construction, inspection, testing. Comprehensive but
                heavy reading. The technical floor.
              </li>
              <li>
                <strong>GN3 9th Edition 2022 + A4 update — inspection and testing guidance.</strong>
                The "how to" for Part 6. Test methods, model forms, frequency tables, worked
                examples, instrument standards.
              </li>
              <li>
                <strong>IET On-Site Guide (OSG) current edition — practitioner reference.</strong>
                Cable size tables for common circuits, standard arrangements (radial, ring,
                lighting), quick reference for the everyday electrician.
              </li>
              <li>
                <strong>Other Guidance Notes.</strong> GN1 (selection and erection), GN2 (isolation
                and switching), GN4 (protection against fire), GN5 (protection against electric
                shock), GN6 (protection against overcurrent), GN7 (special locations), GN8
                (earthing and bonding). Each addresses a specific Part of BS 7671 in depth.
              </li>
              <li>
                <strong>Code of Practice for In-Service Inspection and Testing of Electrical
                Equipment (PAT).</strong> Different scope — equipment testing, not installation
                verification. Don't confuse with GN3.
              </li>
            </ul>
            <p>
              For Level 3 / Unit 304 study and practice, the triangle of BS 7671 + GN3 + OSG is the
              minimum library. Add GN1 / GN2 / GN8 as deepening references when you start working
              independently on more complex installations.
            </p>
          </ConceptBlock>

          <Scenario
            title="Using GN3 to interpret an unexpected reading"
            situation={
              <>
                During initial verification of a small office, you measure Zs at the far end of
                lighting circuit L4 (Type B 10 A) as 4.42 Ω. You glance at the BS 7671 Table
                41.3 maximum (4.37 Ω). The reading is over the maximum by 0.05 Ω. Pass or fail?
              </>
            }
            whatToDo={
              <>
                Open GN3 Chapter 2 — measured-versus-tabulated comparison. Tabulated maxima in
                Table 41.3 assume conductor at full operating temperature (70°C for thermoplastic).
                Measured values at ambient (typically 15-20°C) are LOWER than they would be at
                operating temperature. GN3 mandates the 0.8 multiplier on the tabulated value for
                comparison with measured: 4.37 × 0.8 = 3.50 Ω. Your reading of 4.42 Ω is well
                above 3.50 Ω. FAIL. Investigate: cable run too long, joint resistance, undersized
                conductors, or terminations not properly tightened. Remedy and retest. Do not
                certify until Zs is below 3.50 Ω at ambient.
              </>
            }
            whyItMatters={
              <>
                Without GN3 you might naively compare 4.42 against 4.37 and conclude "marginal
                fail by 0.05 Ω, probably OK". With GN3 you apply the correct multiplier and see
                the reading is about 25% over the corrected limit — a real fault. The 0.8
                multiplier is in BS 7671 Appendix 3 too, but GN3 walks you through the
                application. This is a typical example of why GN3 is essential alongside BS 7671 —
                it makes the regulation usable.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 6 restructure (alignment with CENELEC)"
            clause={
              <>
                BS 7671 Part 6 (Inspection and testing) has been completely restructured in the
                2018+A4:2026 edition. This restructuring includes changes to regulation
                numbering to align Part 6 with the CENELEC standard for inspection and testing.
                Users should not rely on pre-A4 regulation numbers when consulting Part 6.
              </>
            }
            meaning={
              <>
                The renumbering of Part 6 means GN3 9th Edition + A4 update is essential — older
                editions of GN3 reference the pre-A4 numbering scheme and will mislead the
                inspector trying to cross-reference. Always work from the current GN3 edition
                alongside the current BS 7671 edition.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6 restructure note."
          />

          <InlineCheck
            id="m5-s1-sub3-part6-restructure"
            question="What practical impact does the A4:2026 Part 6 restructure have for an inspector who already owns GN3 8th Edition?"
            options={[
              "None — guidance notes are timeless.",
              "The 8th Edition references pre-A4 regulation numbering and pre-A4 RCD test sequences (½×, 1×, 1×IΔn). The inspector should upgrade to the 9th Edition + A4 update to align with the renumbered Part 6 and the single-current AC RCD test at 1×IΔn.",
              "The 8th Edition is now illegal to use.",
              "Only the front cover changed.",
            ]}
            correctIndex={1}
            explanation="Part 6 was renumbered in A4:2026 to align with the CENELEC inspection and testing standard, and the RCD verification method was simplified to a single AC test at 1×IΔn. Pre-A4 GN3 editions reference the old numbering and the deleted multi-test sequence — current practice requires the updated edition."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'GN3 = non-statutory IET practical guidance. Companion to BS 7671 Part 6. Current edition: 9th 2022 + A4 update.',
              'Chapter 2 = initial verification methods. Chapter 3 = periodic inspection (EICR). Chapter 5 = model forms. Memorise the layout.',
              'GN3 Section 5 model Schedule of Inspections is the recognised template — scheme forms derive from it.',
              'Reg 642.1 + GN3 list information needed BEFORE testing: supply data, ADS arrangement, design calculations, as-built drawings.',
              'Earth electrode testing (GN3): use four-terminal tester, isolate parallel paths, test in least-favourable conditions where possible.',
              'GN3 mandates dynamic risk assessment on discovery of unexpected issues during testing.',
              'Apply the GN3 0.8 multiplier when comparing MEASURED Zs (at ambient) against tabulated A4:2026 Table 41.3 maximums (which assume operating temperature).',
              'Working from a superseded GN3 edition risks applying out-of-date test methods — notably the old multi-test RCD sequence superseded by the A4:2026 simplified single AC test.',
            ]}
          />

          <Quiz title="GN3 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 BS 7671 Part 6 in detail
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Scheme certification chain
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
