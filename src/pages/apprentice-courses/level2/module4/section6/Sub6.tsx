/**
 * Module 4 · Section 6 · Sub 6 — Record test results
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.6
 *   AC 6.6 — "Record test results"
 *
 * Frame: BS 7671 Reg 642.4 (recording) and Section 644 (certification) require
 * every test result to be recorded. The Schedule of Test Results (STR) is the
 * per-circuit form; the Schedule of Inspections summarises visual checks; the
 * Electrical Installation Certificate (EIC) or Minor Works Certificate (MEIWC)
 * is the top-level signed document. All three together form the handover pack.
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

const TITLE = 'Record test results | Level 2 Module 4.6.6 | Elec-Mate';
const DESCRIPTION =
  'The Schedule of Test Results, Schedule of Inspections and Electrical Installation Certificate — what every column captures, the legal status of each form, and the handover pack that proves the installation is safe to energise.';

const checks = [
  {
    id: 'm4-s6-sub6-form-trio',
    question:
      'A new domestic CU swap-out has been completed. Which combination of forms is needed for handover per BS 7671?',
    options: [
      'Just an EIC.',
      'Just an STR.',
      'Electrical Installation Certificate (EIC) + Schedule of Inspections + Schedule of Test Results — the three together form the complete certification pack required by Section 644 for new installations and significant alterations.',
      'Minor Electrical Installation Works Certificate only.',
    ],
    correctIndex: 2,
    explanation:
      'A CU swap-out is a major alteration and requires the full EIC + Schedule of Inspections + Schedule of Test Results trio. The EIC is the top-level signed certificate that ties the package together. The Schedule of Inspections records the visual inspection items. The Schedule of Test Results records every test reading per circuit. Minor Works Certificate (MEIWC) is for small additions or alterations to existing circuits — not for a new CU. See Sub 8 for column-by-column STR walk-through.',
  },
  {
    id: 'm4-s6-sub6-eic-blank-fields',
    question:
      'On the EIC for a new domestic install, the "Designer", "Constructor" and "Inspector" boxes can be filled in by:',
    options: [
      'The customer.',
      'The same person if they did all three roles, or different people if the work was split between specialists. Each role-holder signs their own box. The certificate is invalidated if the signatures are forged or if a role is left blank when the work was actually carried out.',
      'Anyone present at handover.',
      'Must always be three different people.',
    ],
    correctIndex: 1,
    explanation:
      'The EIC has separate signed declarations for designer, constructor (installer) and inspector. The same competent person can hold all three (common on a small domestic job done by a single electrician). On a larger project they may be different — e.g. consulting engineer designs, contractor installs, third-party inspects. Each must sign their own box. Forging or leaving blanks creates an invalid certificate.',
  },
  {
    id: 'm4-s6-sub6-defect-correction',
    question:
      'During final testing of a new install, a circuit fails the IR test (reads 0.6 MΩ). What does Reg 644.1.1 require?',
    options: [
      'Issue the EIC with a note that the circuit fails IR.',
      'For a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. So you fix the IR defect, retest, then issue the EIC. You cannot issue a clean EIC for an installation with a known defect.',
      'Issue the EIC and fix the defect at the next visit.',
      'Issue an EICR instead of an EIC.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644.1.1 verbatim: "For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued." The EIC certifies the installation is safe at handover — issuing one for an installation with a known IR fault would be a misrepresentation. Find the fault, fix it, retest, then issue the certificate with all clean readings. The corrective work itself does not need a separate certificate; it\'s part of the original installation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Reg 642.4 — recording requirements:',
    options: [
      'Optional.',
      'Test results shall be recorded. The recording forms part of the certification process and the records shall be retained for the lifetime of the installation (or as required by the contracting party). The Schedule of Test Results is the standard form.',
      'Only required for installations over 100 kW.',
      'Only required for periodic inspections.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 642.4 (paraphrased): every test result must be recorded as part of the certification. The Schedule of Test Results captures the per-circuit data; the Schedule of Inspections captures the visual inspection results; the EIC ties them together with declarations and signatures. Records must be retained — Part P of the Building Regulations and various scheme requirements typically require lifetime retention by the customer and at least six years by the contractor.',
  },
  {
    id: 2,
    question: 'When is a Minor Electrical Installation Works Certificate (MEIWC) used instead of an EIC?',
    options: [
      'For new CU installations.',
      'For minor additions or alterations to an existing circuit (e.g. adding a single socket on an existing ring) that do NOT require a new circuit. New circuits, CU replacements and major alterations require an EIC + Schedule of Inspections + STR.',
      'For three-phase installations only.',
      'Whenever the customer prefers it.',
    ],
    correctAnswer: 1,
    explanation:
      'MEIWC is for minor work on existing circuits — adding a socket to a ring, adding a light fitting to a lighting circuit, replacing a damaged accessory like-for-like. The MEIWC is a single-page form that captures the test results for the altered portion only. Anything that adds a new circuit, replaces a CU, or makes a major change to the installation requires the full EIC trio.',
  },
  {
    id: 3,
    question: 'Per-circuit columns on the IET model Schedule of Test Results include all of the following except:',
    options: [
      'Circuit number, description, type of wiring.',
      'Customer\'s pet name and birthday.',
      'CSA of conductors, max Zs, OCPD type/rating, RCBO IΔn.',
      'R1+R2, IR readings (L-L / L-E / N-E), polarity tick, Zs measured, RCD trip times.',
    ],
    correctAnswer: 1,
    explanation:
      'Standard STR columns are technical data per circuit: identification (number, description, wiring type, reference method), cable data (CSA L+CPC), protective device (type, rating, IΔn for RCBOs), max Zs (from Table 41.3), and the test results (R1+R2, ring final readings, IR L-L / L-E / N-E, polarity, Zs measured, RCD trip time, AFDD test where fitted). No personal information goes on the STR.',
  },
  {
    id: 4,
    question: 'Modern multifunction testers can download test data to a phone or PC. Does this replace the requirement to complete an STR?',
    options: [
      'Yes — the download is sufficient.',
      'No — the STR is the regulatory document. The instrument download is a useful audit trail and a way to capture test data at the point of testing, but the completed STR with all required fields and signatures is what satisfies Reg 642.4 and Section 644. Most professionals use the download to populate the STR rather than as a standalone replacement.',
      'Yes, provided the download is digitally signed.',
      'Only for periodic inspections.',
    ],
    correctAnswer: 1,
    explanation:
      'The completed STR (paper or PDF) with all the required columns and the inspector\'s signature is the regulatory deliverable. Instrument downloads are a useful working tool — they capture readings without manual transcription and provide a defendable audit trail of what the meter actually measured — but they do not satisfy the formal certification requirement on their own. Most certification software (NICEIC Online, ElecCert, EasyCert) imports instrument downloads to auto-populate the STR fields, which the inspector then reviews and signs.',
  },
  {
    id: 5,
    question: 'A circuit on the STR has Zs (calc) = 0.75 Ω from the dead test continuity values, and Zs (measured) = 0.78 Ω from the live test at the far end of the circuit. What does this slight difference mean?',
    options: [
      'A serious fault.',
      'Normal — the live Zs measurement includes some additional impedance from the protective device internal contacts and from any small leakage paths at the time of the live measurement. A 0.03 Ω difference is well within the expected agreement between the two methods.',
      'The instrument is faulty.',
      'The cable is too small.',
    ],
    correctAnswer: 1,
    explanation:
      'The dead-test calculation (Ze + R1+R2 from continuity readings) and the live-test measurement (Zs measured directly at the far end with a loop tester after first energisation) should agree to within ~0.05-0.10 Ω. Small differences come from contact resistance variations, lead nulling differences, and the live measurement\'s sensitivity to brief leakage paths. Both readings go on the STR; if they disagree by more than ~0.2 Ω, investigate.',
  },
  {
    id: 6,
    question: 'The Schedule of Inspections records:',
    options: [
      'Per-circuit test readings.',
      'Visual inspection items at the installation level — connection of conductors, identification of conductors, presence of required diagrams and labels, presence of barriers / enclosures / SPDs / RCDs, suitability of equipment for the location, etc. A tick-list grouped by category.',
      'Only the results of the IR test.',
      'Only the customer\'s contact details.',
    ],
    correctAnswer: 1,
    explanation:
      'The Schedule of Inspections is the visual check list. Items include: connection of live conductors, identification of conductors, route of cables, selection of conductors for current-carrying capacity and voltage drop, connection of accessories, presence of fire barriers and enclosures, presence of warning notices and labels, presence of diagrams and instructions, presence of fault protection (RCDs etc.), connection of single-pole devices in line, polarity, methods of safe isolation. Each item is ticked, marked N/A or marked with a comment.',
  },
  {
    id: 7,
    question: 'The EIC has a section for "Departures from BS 7671". What goes there?',
    options: [
      'Nothing — departures are not allowed.',
      'Any deliberate deviation from a BS 7671 requirement that the designer judges acceptable for the specific installation, with justification. E.g. omitting an RCD on a non-dwelling socket-outlet under the Reg 411.3.3 risk-assessment exception. Each departure must be documented with reasoning.',
      'Only used for three-phase installations.',
      'Customer complaints.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 recognises that not every installation can or should comply with every numerical requirement of every regulation. The "Departures" section of the EIC is where the designer documents any deviation, with reasoning, so the customer and any future inspector understands why. Common examples: socket-outlet without RCD under the documented risk-assessment exception (Reg 411.3.3), overlong cable run accepted with reduced disconnection time, equipment fitted in a special location with mitigating measures. Each departure must be agreed by the duty-holder and recorded.',
  },
  {
    id: 8,
    question: 'After issue of the EIC, copies should be:',
    options: [
      'Filed in the contractor\'s office and forgotten.',
      'Provided to the customer (full pack — EIC + Schedule of Inspections + STR), retained by the contractor (typically minimum six years), and uploaded to any applicable Competent Person Scheme (NICEIC, NAPIT, Stroma, ECA etc.) within the scheme\'s required notification window — typically 30 days for Part P-notifiable work.',
      'Returned to BS 7671 headquarters.',
      'Posted on the side of the consumer unit only.',
    ],
    correctAnswer: 1,
    explanation:
      'Three copies typically: customer (handover pack — they need it for any sale of the property and for any future EICR), contractor (file copy, retained for at least six years for liability purposes, often longer), and CPS (Competent Person Scheme registration if the installation is Part P notifiable in England and Wales — the scheme generates the Building Control Compliance Certificate that the customer also needs). Some schemes auto-upload from the contractor\'s software; others require manual entry within 30 days.',
  },
];

const faqs = [
  {
    question: 'Is a hand-written STR still acceptable, or must it be digital?',
    answer:
      'Hand-written is still acceptable provided every required field is legible and the inspector\'s signature is genuine. Digital (PDF or via certification software) has become standard for most contractors because it auto-validates field completeness, integrates with instrument downloads and removes legibility issues. Both are equally valid in regulatory terms. Some Competent Person Schemes mandate digital upload — check your scheme\'s requirements.',
  },
  {
    question: 'What if I make a mistake on a paper STR — can I just cross it out and re-write?',
    answer:
      'Yes — single line through the error, write the correct value alongside, initial the correction. Do not use correction fluid (Tippex) or scribble out — both invalidate the document for legal purposes. Multiple errors on the same form may warrant restarting the form; small corrections are fine.',
  },
  {
    question: 'The customer wants me to leave Zs blank because the test was not done. Is that OK?',
    answer:
      'No — every required field must be filled. If a Zs measurement was genuinely not possible (e.g. circuit not yet energised, equipment that prevents the test), record "Not Tested" with a reason on the form, not blank. Leaving blanks creates ambiguity for future inspectors and may invalidate the certificate. Reg 644.1.1 also requires defects to be corrected before EIC issue — if Zs was not measured because the circuit isn\'t safe to energise, that\'s a defect that needs fixing first.',
  },
  {
    question: 'How long do records need to be kept?',
    answer:
      'For the customer: lifetime of the installation (they need it for any sale, EICR, or insurance claim). For the contractor: at least six years per the Limitation Act (for civil liability), but most professional indemnity insurers and Competent Person Schemes require longer — 10 to 25 years is common. For Building Control: at least the period required by the local authority. In practice, most professional contractors retain test records indefinitely on cloud storage given how cheap that has become.',
  },
  {
    question: 'What if the customer loses their copy of the EIC and needs another?',
    answer:
      'Issue a duplicate from your file copy. Do NOT re-test and issue a new EIC — that would be a different certificate with a different test date and could mislead a future inspector. Mark the duplicate "DUPLICATE — copy of original certificate dated [date]". Most certification software auto-generates duplicates from the original record.',
  },
  {
    question: 'Where does the AFDD test result go on the STR?',
    answer:
      'A4:2026 introduced AFDD requirements for higher-risk installations. The IET model STR has been updated to include AFDD columns — typically a tick that the device test facility was operated per manufacturer\'s instructions, plus a free-text note for any abnormal result. Older STR forms may not have a dedicated AFDD column — in that case, document AFDD test in the Notes column or on the Schedule of Inspections under "Additional protection devices".',
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 6"
            title="Record test results"
            description="The Schedule of Test Results, Schedule of Inspections and Electrical Installation Certificate — the three forms that turn a successful test sequence into a defensible handover pack."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Reg 642.4 and Section 644 require all test results to be recorded and certified. The Schedule of Test Results (STR) is the per-circuit form; the Schedule of Inspections is the visual checklist; the Electrical Installation Certificate (EIC) is the top-level signed document.',
              'For new installations and major alterations: full EIC + Schedule of Inspections + STR. For minor alterations (single socket added, like-for-like accessory swap): a Minor Electrical Installation Works Certificate (MEIWC) on its own.',
              'Per Reg 644.1.1, any defect or omission revealed during testing must be corrected before the Certificate is issued. You cannot sign off an EIC for an installation with known faults.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the three IET model forms (EIC, Schedule of Inspections, STR) and explain when each is used.',
              'Know when a Minor Electrical Installation Works Certificate (MEIWC) is appropriate and when a full EIC pack is required.',
              'Complete every standard column on the Schedule of Test Results for a domestic circuit.',
              'Cross-reference STR readings against Schedule of Inspections items and EIC declarations.',
              'Cite Reg 642.4 (recording) and Reg 644.1.1 (defects must be corrected before certification).',
              'Manage record-keeping per the contractor\'s, customer\'s and Competent Person Scheme\'s retention requirements.',
              'Issue duplicate certificates correctly and handle paper-form corrections per industry practice.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The three forms — what each one captures</ContentEyebrow>

          <ConceptBlock
            title="EIC + Schedule of Inspections + Schedule of Test Results"
            plainEnglish="EIC = the signed top-level certificate. Schedule of Inspections = visual checks. STR = test readings per circuit. The three are issued together as a handover pack."
            onSite="On a new install or CU swap, all three. On a single-socket addition, MEIWC instead. On a periodic inspection, EICR (Electrical Installation Condition Report) instead — but the test recording underneath is still on a Schedule of Test Results."
          >
            <p>The three forms in the standard certification pack:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Form</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Captures</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">When used</div>

                <div>Electrical Installation Certificate (EIC)</div>
                <div>Top-level: address, designer / constructor / inspector signed declarations, supply characteristics, departures, recommendations, next inspection due date</div>
                <div>New installations + major alterations</div>

                <div>Schedule of Inspections</div>
                <div>Visual checklist: connection / identification of conductors, presence of devices, labels, barriers, fault protection, polarity, isolation methods</div>
                <div>Always paired with EIC</div>

                <div>Schedule of Test Results (STR)</div>
                <div>Per-circuit readings: continuity (R1+R2), ring final readings, IR (L-L/L-E/N-E), polarity tick, Zs (calc + measured), RCD trip times, AFDD test</div>
                <div>Always paired with EIC; also used for EICR data capture</div>

                <div>Minor Electrical Installation Works Certificate (MEIWC)</div>
                <div>Single page: identification of altered portion, test readings for that portion, signed declaration</div>
                <div>Minor additions / alterations only — NOT for new circuits or CU replacements</div>

                <div>Electrical Installation Condition Report (EICR)</div>
                <div>Periodic inspection report: extent of inspection, observations, classifications (C1/C2/C3/FI), recommended next inspection</div>
                <div>Periodic inspection of an existing installation; uses the STR for test data</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                {
                  form: 'Electrical Installation Certificate (EIC)',
                  captures: 'Top-level: address, signed declarations (designer/constructor/inspector), supply characteristics, departures, recommendations',
                  when: 'New installations + major alterations',
                },
                {
                  form: 'Schedule of Inspections',
                  captures: 'Visual checklist: conductor connection / identification, presence of devices, labels, barriers, fault protection, polarity',
                  when: 'Always paired with EIC',
                },
                {
                  form: 'Schedule of Test Results (STR)',
                  captures: 'Per-circuit: continuity, ring readings, IR, polarity, Zs (calc+measured), RCD trip times, AFDD test',
                  when: 'Always paired with EIC; also used for EICR',
                },
                {
                  form: 'Minor Works Certificate (MEIWC)',
                  captures: 'Single page: altered portion identification, test readings, signed declaration',
                  when: 'Minor alterations — NOT new circuits or CU swaps',
                },
                {
                  form: 'Electrical Installation Condition Report (EICR)',
                  captures: 'Periodic report: observations, classifications (C1/C2/C3/FI), recommended next inspection',
                  when: 'Periodic inspection of an existing installation',
                },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Form</div>
                  <div className="text-white/90 mt-0.5 font-semibold">{row.form}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Captures</div>
                  <div className="text-white/80 mt-0.5">{row.captures}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">When</div>
                  <div className="text-white/80 mt-0.5">{row.when}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (Defect correction prior to certification) — verbatim"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                The EIC certifies the installation is safe and compliant at the moment of issue.
                You cannot issue a clean EIC for an installation with a known IR fault, a
                non-compliant Zs, a missing CPC continuity, or any other defect identified during
                testing. Fix first, retest, then certify. This is the regulatory backbone of the
                "test then certify" sequence — without it, the certificate becomes a meaningless
                tick-box exercise.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>STR — column-by-column overview</ContentEyebrow>

          <ConceptBlock
            title="What every column on the STR captures"
            plainEnglish="Per-circuit row with around 16 columns covering identification, cable data, protective device data, test readings and notes. See Sub 8 for full column-by-column walk-through with worked example."
            onSite="Modern certification software auto-populates many fields from instrument downloads. Always review the auto-filled values for sanity before signing — a wrong-units error or an instrument glitch can introduce nonsense values that the software will accept without question."
          >
            <p>The standard column groups on the IET model STR:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification:</strong> circuit number, description (e.g.
                "Kitchen ring final"), location.
              </li>
              <li>
                <strong>Wiring data:</strong> type of wiring (e.g. "T&E"), reference method (BS
                7671 Appendix 4 codes — 100/101/102/A-G), CSA of L conductor (mm²), CSA of CPC
                (mm²).
              </li>
              <li>
                <strong>Protective device data:</strong> type and rating of OCPD (e.g. "B32 RCBO
                BS EN 61009"), max Zs from Table 41.3 for that device, IΔn for RCBOs (e.g. 30 mA),
                RCD type (AC, A, F, B), AFDD presence and type if fitted.
              </li>
              <li>
                <strong>Continuity readings:</strong> R1+R2 from cross-connection or radial test;
                r1, rn, r2 for ring finals.
              </li>
              <li>
                <strong>IR readings:</strong> L-L (or L1-N for single-phase), L-E, N-E (or
                combined L+N to E if linked).
              </li>
              <li>
                <strong>Polarity:</strong> tick or P/F.
              </li>
              <li>
                <strong>Zs measured:</strong> live test reading at the far end of the circuit
                after first energisation.
              </li>
              <li>
                <strong>RCD data:</strong> trip time at 1 × IΔn (and at 5 × IΔn if reported by
                the instrument, though no longer regulatory acceptance under A4:2026).
              </li>
              <li>
                <strong>AFDD test:</strong> tick or P/F that the manufacturer\'s test facility was
                operated successfully (where AFDDs are fitted).
              </li>
              <li>
                <strong>Notes / limitations:</strong> any observations, limitations of the test,
                equipment that was disconnected, etc.
              </li>
            </ol>
            <p>
              Sub 8 walks through every column with a fully worked example for a 32 A Type B
              RCBO ring final.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EIC — top-level certificate sections</ContentEyebrow>

          <ConceptBlock
            title="What goes on the EIC itself"
            plainEnglish="Header (address, dates, contractor / customer), supply characteristics (system type, Ze, PFC), declarations (designer / constructor / inspector), departures from BS 7671, comments, recommended next inspection date, signatures."
            onSite="The EIC is the legal document. Get the address right, get the signatures right, get the next-inspection date right (typically 10 years for domestic, shorter for higher-risk installations or rented properties)."
          >
            <p>The principal sections of an EIC:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Details of the client / installation:</strong> address, occupier name,
                use of installation (domestic / commercial / industrial).
              </li>
              <li>
                <strong>Extent of installation covered:</strong> "complete installation" or
                "alteration to ground floor lighting circuit and addition of new EV charger
                circuit" — be specific.
              </li>
              <li>
                <strong>Supply characteristics:</strong> nominal voltage, frequency, prospective
                fault current at origin, Ze, system earthing arrangement (TN-S / TN-C-S / TT /
                IT). Number of phases.
              </li>
              <li>
                <strong>Designer declaration:</strong> "I, being the person responsible for the
                design ... certify ..." Signed and dated.
              </li>
              <li>
                <strong>Constructor declaration:</strong> "I, being the person responsible for
                the construction ..." Signed and dated. Same person can sign as designer +
                constructor on small jobs.
              </li>
              <li>
                <strong>Inspector declaration:</strong> "I, being the person responsible for the
                inspection and testing ..." Signed and dated.
              </li>
              <li>
                <strong>Departures from BS 7671:</strong> any deliberate deviation, with reasoning.
              </li>
              <li>
                <strong>Comments / recommendations:</strong> anything the customer or future
                inspector needs to know — e.g. "RCD on socket-outlet circuit C5 omitted under
                Reg 411.3.3 risk-assessment exception; risk assessment dated [date] held by
                client".
              </li>
              <li>
                <strong>Next inspection due:</strong> typically 10 years for domestic owner-occupied,
                5 years for rented dwellings, shorter for higher-risk environments. Set per IET GN3
                guidance.
              </li>
              <li>
                <strong>Schedules:</strong> reference to the attached Schedule of Inspections and
                Schedule of Test Results.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.4 (Recording, paraphrased)"
            clause="The results of every test required by this Chapter shall be recorded and the records retained as part of the certification of the installation. The certification shall include the Schedule of Test Results (STR), the Schedule of Inspections, and the Electrical Installation Certificate (EIC) for new installations or major alterations, or the Minor Electrical Installation Works Certificate (MEIWC) for minor alterations to an existing installation."
            meaning={
              <>
                Every test result you take is part of the regulatory record. The form (STR plus
                Schedule of Inspections plus EIC for new work; MEIWC for minor work) is
                prescribed; the contents are your test data plus the supporting context. Records
                are part of the certification, not optional companion documents.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.4 and Section 644 (paraphrased)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Storage and distribution</ContentEyebrow>

          <ConceptBlock
            title="Three copies and where they go"
            plainEnglish="Customer copy. Contractor file copy. Competent Person Scheme copy (for Part P notifiable work in England and Wales)."
            onSite="Cloud storage has made retention easy. Most certification software auto-files, auto-uploads to your CPS and emails the customer a PDF on completion."
          >
            <p>Copies and recipients:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer:</strong> full pack — EIC + Schedule of Inspections + STR.
                They need it for: any future EICR (so the inspector can compare current readings
                against the original installation values), property sale (solicitors increasingly
                ask for current EIC), insurance claim (proof the installation was certified at
                the time of an incident).
              </li>
              <li>
                <strong>Contractor:</strong> file copy retained per Limitation Act (six years
                minimum for civil liability) and per professional indemnity insurance (often 10-25
                years). Cloud storage of PDFs is standard practice.
              </li>
              <li>
                <strong>Competent Person Scheme:</strong> upload within scheme\'s notification
                window for Part P notifiable work (England / Wales). Typically 30 days. The
                scheme generates the Building Control Compliance Certificate that goes to the
                customer in addition to the EIC.
              </li>
            </ul>
            <p>
              For non-Part P work (e.g. minor maintenance, commercial installations not subject
              to building control), the CPS upload is not required but contractor / customer
              copies still are.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="STR vs SoI vs EIC — the three-document chain"
            plainEnglish="The Electrical Installation Certificate is the top-level signed declaration; the Schedule of Inspections is the visual checklist; the Schedule of Test Results is the per-circuit measurements. Each has a different purpose, a different signer relationship, and covers different aspects of the install."
            onSite="On a new install or major alteration: all three. On a single-socket addition: MEIWC alone. On a periodic inspection: EICR (with STR underneath for the test data). Get the form right for the job or the certification is invalid."
          >
            <p>The three-document chain explained:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Installation Certificate (EIC).</strong> The top-level signed
                document. Captures: address, supply characteristics (system type, Ze, PFC),
                designer / constructor / inspector declarations (each separately signed), any
                departures from BS 7671 with reasoning, comments, recommended next inspection
                date. Signed by the competent persons in each role (often the same person on
                small jobs). Issued for new installations and major alterations.
              </li>
              <li>
                <strong>Schedule of Inspections.</strong> The visual checklist. Captures: tick
                items confirming connection of conductors, identification of conductors, presence
                of warning notices and labels, presence of fault and additional protection,
                methods of safe isolation, polarity verification at the installation level, etc.
                Always paired with the EIC. Signed by the inspector.
              </li>
              <li>
                <strong>Schedule of Test Results (STR).</strong> The per-circuit measurements.
                Captures: continuity readings (R1+R2 for radials, r1/rn/r2 plus R1+R2 for
                rings), insulation resistance readings (L-L, L-E, N-E), polarity per circuit,
                Zs (calc and measured), RCD trip times, AFDD test where fitted. Always paired
                with EIC. Signed by the inspector.
              </li>
              <li>
                <strong>Minor Electrical Installation Works Certificate (MEIWC).</strong> The
                single-page form for minor alterations to existing circuits — adding a single
                socket on an existing ring, replacing a damaged accessory like-for-like.
                Captures the test results for the altered portion only. Signed by the
                installer. NOT for new circuits or CU replacements.
              </li>
              <li>
                <strong>Electrical Installation Condition Report (EICR).</strong> The periodic
                inspection report — used to assess the condition of an existing installation
                rather than to certify new work. Captures: extent of inspection, observations
                with C1/C2/C3/FI classifications, recommended next inspection. Uses the STR for
                test data capture. Signed by the inspector.
              </li>
            </ul>
            <p>
              On a domestic CU swap (major alteration) — full EIC + Schedule of Inspections +
              STR. On a single-socket spur added to an existing ring — MEIWC alone. On a
              tenanted property's 5-year periodic inspection — EICR with STR data underneath.
              Mixing up which form goes when is a sign-off error that invalidates the
              certification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Instrument download workflow — modern MFTs to PDF/CSV export"
            plainEnglish="Modern multifunction testers (Megger MFT1741, Fluke 1664FC, Kewtech KT65DL) can download captured test data via Bluetooth or USB. The download populates the STR automatically, eliminating manual transcription errors but introducing new ones from auto-import."
            onSite="The download is a useful working tool. The signed STR (paper or PDF) is the regulatory deliverable. Always REVIEW the auto-populated values before signing — instrument glitches and unit mismatches can introduce nonsense values that the certification software accepts silently."
          >
            <p>The typical instrument-to-STR workflow:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>On-site capture:</strong> meter records each test result with circuit
                ID, test type, value, time, and meter serial. Some meters let you assign
                results to circuits by labelling on the spot; others batch results and you
                assign post-test.
              </li>
              <li>
                <strong>Phone or tablet sync:</strong> manufacturer apps (Megger Powersuite
                Pro, Fluke Connect, Kewtech KEWPER) sync the meter via Bluetooth and store the
                results in a job folder. Photos and notes can be attached to each circuit.
              </li>
              <li>
                <strong>Certification software import:</strong> NICEIC Online, ElecCert,
                EasyCert, ElectricalCertificateSoftware etc. import the meter data and
                auto-populate the STR fields. The inspector reviews and adds any missing data
                (visual check items, departures, comments).
              </li>
              <li>
                <strong>Inspector review and sign:</strong> CRITICAL step. Review every
                auto-imported value for sense — does R1+R2 of 4.5 Ω make sense for a 25 m
                kitchen ring? (No — 30× expected; check the meter wasn't reading mΩ when the
                form expects Ω.) The inspector's signature certifies the data is correct.
              </li>
              <li>
                <strong>Issue and store:</strong> PDF generated, emailed to customer, uploaded
                to the Competent Person Scheme (NICEIC, NAPIT, Stroma, ECA), filed in the
                contractor's archive.
              </li>
            </ol>
            <p>
              The big productivity gain: 30-50% time saving on a typical CU swap-out compared
              to manual STR completion. The big risk: the auto-import process can introduce
              wrong-units errors, transposed circuit numbers, or stale data from the previous
              job. Inspector review before signing is the firewall.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Recording limitations — when the install can't be fully tested and how to flag it"
            plainEnglish="Some installations can't be fully tested at the time of certification — sealed enclosures, sleeping rooms with patients, customer access restrictions, equipment that can't be safely disconnected. The STR has a Notes / Limitations column for exactly these cases."
            onSite="Never leave a field blank. Document explicitly what was NOT tested and why. A future inspector reading the STR five years from now needs to know what's been verified and what hasn't."
          >
            <p>Common limitations and how to document them:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sealed enclosures.</strong> Some accessories (sealed industrial
                enclosures, hospital theatre IPS panels) cannot be opened during routine
                certification without breaking IP seals. Document: "Limitation: enclosure not
                opened — visual inspection only via inspection window per manufacturer
                guidance."
              </li>
              <li>
                <strong>Sleeping rooms or occupied medical environments.</strong> Cannot
                disturb patients or sleeping residents to test polarity at every accessory.
                Document: "Limitation: testing of accessories in rooms 12-15 deferred to
                next scheduled maintenance window per ward sister's request; sample testing
                completed."
              </li>
              <li>
                <strong>Customer access restrictions.</strong> Customer has not provided keys
                to certain rooms or storage areas. Document: "Limitation: garage / outhouse /
                store room not accessed at first visit due to no key available; testing
                deferred to follow-up visit."
              </li>
              <li>
                <strong>Equipment that cannot be disconnected.</strong> Process-critical
                equipment that the customer cannot afford to take offline (e.g. a server, an
                MRI scanner, a computer-controlled production line). Document: "Limitation:
                IR test on circuit X not performed because the connected equipment could not
                be disconnected at the time of testing; visual inspection of cabling and
                terminations completed; periodic re-test recommended at next scheduled outage."
              </li>
              <li>
                <strong>Concealed cabling.</strong> Cables behind plaster, in walls, in floors
                cannot be visually inspected. Document: "Cable type and reference method
                determined by accessory inspection and voltage drop calculation; visual
                inspection limited to terminations at accessible accessories."
              </li>
              <li>
                <strong>Plaster / concrete drying time.</strong> A new install through freshly
                plastered walls may give borderline IR readings due to residual moisture.
                Document: "Initial IR readings within Table 64 minimum but lower than expected
                due to plaster moisture; re-test recommended at 6 months after dry-out for
                comparison."
              </li>
            </ul>
            <p>
              All limitations go in the STR Notes column for the affected circuit AND in the
              EIC Comments / Recommendations section at the top level. Set a follow-up date in
              your scheduling system — most limitations should be resolved by a follow-up visit
              within a defined window.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Customer hand-over pack — what goes in, who keeps a copy, scheme upload"
            plainEnglish="The hand-over pack is what the customer takes away — and what they (or a future buyer's solicitor, or an insurance investigator after a fire) will look at to understand what was certified. It's a complete, signed, dated, defensible record of the work."
            onSite="Don't skimp on hand-over. The customer needs the full pack — printed and PDF — plus a brief verbal walk-through of what's important: where the consumer unit is, how the RCDs work, what the test buttons are for, when the next inspection is due."
          >
            <p>Standard hand-over pack contents for a new install or CU swap:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Installation Certificate (EIC)</strong> with all
                declarations signed and dated.
              </li>
              <li>
                <strong>Schedule of Inspections</strong> with every applicable item ticked or
                noted.
              </li>
              <li>
                <strong>Schedule of Test Results (STR)</strong> with every per-circuit row
                completed.
              </li>
              <li>
                <strong>Building Control Compliance Certificate</strong> (for Part P
                notifiable work in England / Wales) — generated by the Competent Person
                Scheme after upload, posted to the customer separately by the scheme.
              </li>
              <li>
                <strong>Operational instructions for the customer</strong> — typically a
                written summary (or verbal walk-through with leaflet backup) covering: location
                of CU and main isolator; how the RCDs work and their monthly test routine; any
                special features (SPDs, AFDDs, smart switches with manuals); maintenance
                expectations; next inspection due date.
              </li>
              <li>
                <strong>As-built drawings</strong> where applicable — circuit schedules, panel
                schedules, single-line diagrams for larger commercial installations. Often
                affixed inside the CU door for the simplest residential cases.
              </li>
              <li>
                <strong>Manufacturer's manuals</strong> for any equipment installed (RCBOs,
                AFDDs, EV chargers, smart switches, SPDs).
              </li>
            </ul>
            <p>
              <strong>Distribution:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer:</strong> printed copy at hand-over plus PDF emailed for
                their records. They need it for any future EICR, property sale, insurance
                claim. Lifetime retention from their side.
              </li>
              <li>
                <strong>Contractor:</strong> file copy retained per Limitation Act (six years
                minimum for civil liability) and per professional indemnity insurer
                requirements (often 10-25 years). Cloud storage of PDFs is standard.
              </li>
              <li>
                <strong>Competent Person Scheme:</strong> upload within scheme's notification
                window (typically 30 days) for Part P notifiable work in England / Wales. The
                scheme generates the Building Control Compliance Certificate that goes to the
                customer.
              </li>
              <li>
                <strong>Building Control:</strong> for non-CPS notifiable work, direct
                notification to the local authority Building Control office.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Issuing the EIC with a known defect uncorrected"
            whatHappens={
              <>
                You complete testing on a domestic install and find one circuit has a marginal
                IR reading of 0.8 MΩ (below the 1 MΩ minimum). The customer is pressing for the
                certificate so they can move in. You decide to issue the EIC with a comment in
                the notes section — "IR on circuit C7 below 1 MΩ; recommend further investigation".
                Three months later the customer\'s insurance refuses a claim for an electrical
                fire on circuit C7 because the EIC noted a known defect that was not corrected
                — and your professional indemnity is now in question because issuing a certificate
                for an installation with a known IR defect breaches Reg 644.1.1.
              </>
            }
            doInstead={
              <>
                Find the IR fault, correct it, retest. Only then issue the EIC, with all readings
                clean. If the customer is pressing for handover, explain that the certificate
                cannot be issued for an installation with known defects (Reg 644.1.1) and that
                the only path to handover is fixing the defect. Most defects (back-box pinch,
                damaged cable section) can be fixed in an hour. The conversation about delaying
                handover by an hour is much shorter than the conversation about defending a
                certificate that should never have been issued.
              </>
            }
          />

          <Scenario
            title="Completing the certification pack for a domestic CU swap"
            situation={
              <>
                You have completed a domestic CU swap-out. 8 circuits, single-phase, TN-C-S, all
                RCBOs (Type A 30 mA), measured Ze = 0.30 Ω at the MET. All dead tests pass; live
                tests pass; RCD trip times all between 22 ms and 35 ms (well within 300 ms).
                Customer is the home-owner. Property is owner-occupied, no rented portion. You
                are NICEIC registered.
              </>
            }
            whatToDo={
              <>
                <strong>Schedule of Test Results:</strong> per circuit (8 rows) — record circuit
                number, description ("Kitchen ring final" etc.), wiring type (T&E), reference
                method (typically 100 or 101 for clipped direct or in stud wall), CSA L+CPC,
                OCPD type and rating (B32 etc.), RCBO IΔn (30 mA Type A), max Zs from Table 41.3
                (1.37 Ω for B32, 2.73 Ω for B16, etc.), R1+R2 (or r1/rn/r2 for rings), IR
                readings (L-L, L-E, N-E), polarity tick, Zs measured (live test), RCD trip time.
                <br />
                <br />
                <strong>Schedule of Inspections:</strong> tick every applicable item — connection
                of live conductors, identification of conductors with sleeving and labels,
                connection of single-pole devices in line, polarity verified, presence of fault
                protection (RCDs verified), presence of additional protection (30 mA RCDs on
                socket circuits per Reg 411.3.3), presence of warning notices and labels at the
                CU, presence of diagrams and instructions, methods of safe isolation marked.
                <br />
                <br />
                <strong>EIC:</strong> address, occupier, "Major alteration — Consumer unit
                replacement to existing installation", supply characteristics (230 V, 50 Hz,
                single-phase, TN-C-S, Ze = 0.30 Ω, PFC = X kA, IR (the 250 V follow-up reading)
                = X MΩ). Designer / constructor / inspector all signed by you (single competent
                person job). Departures: none. Comments: any client-relevant notes (e.g.
                "Existing wiring retained downstream of CU; condition assessed as satisfactory
                during the alteration but full EICR recommended within five years"). Next
                inspection due: 10 years (owner-occupied domestic).
                <br />
                <br />
                <strong>Distribution:</strong> customer pack (printed and emailed); contractor
                file (cloud); NICEIC online portal upload within 30 days for Part P
                Building Control notification.
              </>
            }
            whyItMatters={
              <>
                The certification pack is what survives the install. Five, ten, twenty years
                from now, the customer\'s solicitor at sale, the next electrician\'s EICR, or an
                insurance investigator after an incident will pick up that EIC and need to make
                sense of it. Complete fields, sensible numbers, signed declarations, attached
                schedules — all of it has to be defensible.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 642.4 + Section 644 require recording of every test result. The Schedule of Test Results (STR) is the per-circuit form; the Schedule of Inspections is the visual checklist; the Electrical Installation Certificate (EIC) is the top-level signed document.',
              'For new installations and major alterations: full EIC + Schedule of Inspections + STR pack. For minor alterations (single socket on existing ring): MEIWC alone.',
              'Reg 644.1.1: any defect or omission revealed during testing must be CORRECTED before the EIC is issued. You cannot certify an installation with known faults.',
              'EIC sections: address, supply characteristics, designer/constructor/inspector declarations (each signed), departures from BS 7671, comments, next inspection due date, schedules attached.',
              'STR per-circuit columns: identification, wiring data (CSA L+CPC, reference method), OCPD data (type/rating/max Zs), RCBO data (IΔn), continuity (R1+R2 / r1+rn+r2), IR (L-L/L-E/N-E), polarity, Zs measured, RCD trip time, AFDD test.',
              'Three copies typically: customer (full pack); contractor (file copy retained ≥ 6 years); Competent Person Scheme (upload within 30 days for Part P notifiable work in England/Wales).',
              'Modern instrument downloads auto-populate STRs but do not replace them. The signed STR/EIC pack is the regulatory deliverable; the download is an audit trail.',
              'Never leave fields blank — record "Not Tested" with a reason if a measurement was not possible. Single-line corrections with initials are acceptable on paper forms; never use Tippex or scribbles.',
            ]}
          />

          <Quiz title="Recording test results — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.5 Test functionality
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.7 AMD2 dead-test sequence end-to-end
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
