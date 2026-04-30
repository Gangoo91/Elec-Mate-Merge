/**
 * Module 4 · Section 5 — Identifying and reporting non-compliances
 * AM2 day-prep — AM2 Phase C (inspection, testing, certification)
 * Spot it, classify it, write it down — non-compliances explained in plain language to the assessor.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import OhmsCalculator from '@/components/apprentice-courses/OhmsCalculator';
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

const TITLE = 'Identifying and Reporting Non-Compliances | AM2 Module 4.5 | Elec-Mate';
const DESCRIPTION =
  'Spot AM2 non-compliances against BS 7671, classify them, record them clearly and explain to the assessor exactly what is wrong.';

const AM2Module4Section5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Define what a non-compliance is in the context of BS 7671',
    'Identify common installation faults and unsafe practices',
    'Interpret test results that fall outside permitted values',
    'Record non-compliances clearly and accurately on certification',
    'Explain to an assessor why something is non-compliant',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'rcd-non-compliance',
      question: 'If an RCD fails to trip within limits at 1×IΔn, is that a non-compliance?',
      options: [
        'No, as long as the manual test button works',
        'Yes — it must be recorded as failing BS 7671 requirements',
        'Only if it fails by more than 50%',
        'It depends on the installation type',
      ],
      correctIndex: 1,
      explanation:
        'Any RCD that fails to trip within BS 7671 specified times at 1×IΔn (A4:2026: the 5×IΔn test is deleted) is non-compliant and must be recorded as such.',
    },
    {
      id: 'minimum-insulation',
      question: "What's the minimum acceptable insulation resistance value in AM2?",
      options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '200 MΩ'],
      correctIndex: 1,
      explanation:
        'The minimum acceptable insulation resistance for most circuits is 1 MΩ as specified in BS 7671. Values below this indicate insulation failure.',
    },
    {
      id: 'assessment-failure',
      question: 'True or false: You fail AM2 if you find a non-compliance.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        "False. You're expected to find and report non-compliances. You fail if you miss obvious defects or fail to record them correctly.",
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Define a non-compliance in electrical installation terms.',
      options: [
        'Any electrical fault',
        "Any part that doesn't meet BS 7671, manufacturer's instructions, or specification",
        'Only safety-critical faults',
        'Minor workmanship issues only',
      ],
      correctAnswer: 1,
      explanation:
        "A non-compliance is any part of an installation that does not meet the requirements of BS 7671, manufacturer's instructions, or the installation specification.",
    },
    {
      id: 2,
      question: 'Give one example of a visual non-compliance.',
      options: [
        'High Zs reading',
        'RCD trip time too slow',
        'Exposed copper or unsleeved CPC',
        'Low insulation resistance',
      ],
      correctAnswer: 2,
      explanation:
        'Visual non-compliances include exposed copper, unsleeved CPCs, damaged insulation, poor workmanship, or incorrect polarity that can be seen during inspection.',
    },
    {
      id: 3,
      question: "What's the minimum acceptable insulation resistance in AM2?",
      options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '10 MΩ'],
      correctAnswer: 1,
      explanation:
        'BS 7671 specifies a minimum insulation resistance of 1 MΩ for most electrical circuits. Values below this indicate insulation failure.',
    },
    {
      id: 4,
      question: 'What does it mean if socket polarity is reversed?',
      options: [
        "Socket won't work",
        'Live and neutral conductors are connected incorrectly',
        'Earth is missing',
        'Voltage is too low',
      ],
      correctAnswer: 1,
      explanation:
        'Reversed polarity means the live and neutral conductors are swapped, which can create safety hazards as switches may not isolate the live conductor.',
    },
    {
      id: 5,
      question: "What's the maximum trip time at 1×IΔn for a 30 mA RCD (A4:2026)?",
      options: ['40 ms', '300 ms', '1000 ms', 'No limit'],
      correctAnswer: 1,
      explanation:
        'At 1×IΔn (30mA), a general-purpose RCD must trip within 300ms. A4:2026 deleted the 5×IΔn test from the verification routine.',
    },
    {
      id: 6,
      question: 'Under A4:2026, which RCD verification test was deleted?',
      options: ['1×IΔn', '½×IΔn', '5×IΔn', 'Manual test button'],
      correctAnswer: 2,
      explanation:
        'A4:2026 deleted the 5×IΔn AC test. RCDs are now verified by a single AC test at 1×IΔn plus the manual test button.',
    },
    {
      id: 7,
      question: 'If a Zs result is higher than BS 7671 maximum, what must you do?',
      options: [
        'Ignore it if close',
        'Record it as non-compliant',
        'Test again and hope for better result',
        'Adjust the reading',
      ],
      correctAnswer: 1,
      explanation:
        'Any Zs reading that exceeds BS 7671 maximum values for the protective device must be recorded as non-compliant.',
    },
    {
      id: 8,
      question: 'True or false: You fail AM2 if you find a non-compliance.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False. Finding and correctly reporting non-compliances demonstrates professional competence. You fail if you miss obvious defects.',
    },
    {
      id: 9,
      question: "What's the correct way to report a missing CPC?",
      options: [
        "Write 'earth missing'",
        "Write 'CPC not connected at socket outlet'",
        "Don't record minor issues",
        "Just mark as 'fault'",
      ],
      correctAnswer: 1,
      explanation:
        "Use specific, technical language like 'CPC not connected at socket outlet' rather than vague terms like 'earth missing'.",
    },
    {
      id: 10,
      question: 'What happens if you ignore an obvious defect in AM2?',
      options: [
        'Nothing if tests pass',
        'Minor mark deduction',
        'Fail the assessment section',
        'Get a second chance',
      ],
      correctAnswer: 2,
      explanation:
        'Ignoring obvious defects shows lack of professional competence and will result in failing the assessment section.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5"
            title="Identifying and Reporting Non-Compliances"
            description="It's not enough to complete an installation and test it - you must also be able to identify when something does not comply with BS 7671 or the specification."
            tone="yellow"
          />

          <TLDR
            points={[
              "Non-compliance = anything that doesn't meet BS 7671:2018+A4:2026, manufacturer's instructions or the spec. AM2 rigs have planted defects — assessor wants you to FIND them.",
              'Three lenses on every circuit: visual inspection, test result vs reg limit, functional test. Use all three.',
              'Memorise the A4:2026 limits: B32 Zsmax = 1.37 Ω (apply 0.8 → 1.10 Ω cold), IR ≥ 1 MΩ at 500 V, RCD trip ≤ 300 ms at 1×IΔn.',
              "Report specifically: 'CPC unsleeved at socket-outlet S2 in kitchen' — not 'earth missing'. Cite the reg, state the measured value.",
              'Finding faults = professional competence. Hiding them = fail. Leave the install safe even with non-compliances logged.',
            ]}
          />

          <CommonMistake
            title="Missing Defects = Assessment Failure"
            whatHappens={
              <>
                Assessors are looking for your ability to spot faults, interpret test results, and
                apply regulation-based judgement. Candidates who ignore obvious defects or record
                incorrect results will fail this section.
              </>
            }
            doInstead={
              <>
                Professional competence includes identifying problems, not just completing tasks.
                Find faults, name them in technical language, cite the BS 7671 requirement that
                isn't met, and record the measured value.
              </>
            }
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ContentEyebrow>What is a Non-Compliance?</ContentEyebrow>

          <ConceptBlock
            title="1. What is a Non-Compliance?"
            plainEnglish="Any part of an installation that does not meet the requirements of BS 7671, manufacturer's instructions, or the installation specification."
            onSite="Key Principle: Non-compliances can range from safety-critical issues to workmanship standards that affect professional quality."
          >
            <p>
              <strong>Safety-Critical Non-Compliances:</strong> Missing or disconnected CPC. Exposed
              copper or damaged insulation. Incorrect polarity. Zs values exceeding BS 7671
              maximums. RCDs failing to trip within required times.
            </p>
            <p>
              <strong>Design Non-Compliances:</strong> Incorrect cable size for load. Inadequate
              circuit protection. Missing RCD protection where required. Insufficient IP rating for
              location.
            </p>
            <p>
              <strong>Workmanship Non-Compliances:</strong> Poor workmanship (crooked accessories).
              Overfilled trunking or conduit. Inadequate cable support. Missing labels or
              identification.
            </p>
            <p>
              <strong>Testing Non-Compliances:</strong> Insulation resistance below 1 MΩ. Continuity
              readings too high. RCD trip times outside limits. Functional testing failures.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ConceptBlock
            title="2. How to Identify Non-Compliances"
            plainEnglish="Visual inspection + test result analysis + functional checks — three lenses, every circuit gets all three."
          >
            <p>
              <strong>Visual Inspection:</strong> Before energising — systematic visual checks.
              Damage to cables or accessories. Missing or incorrect sleeving. Poor alignment and
              workmanship.
            </p>
            <p>
              <strong>Test Results:</strong> Compare readings with BS 7671 limits. Zs values vs
              maximum permitted. Insulation resistance &lt; 1 MΩ. RCD trip times outside limits.
            </p>
            <p>
              <strong>Functional Checks:</strong> Circuits not operating as intended. Switches not
              controlling correct loads. RCDs not tripping when tested. Incorrect socket polarity.
            </p>
            <p>
              <strong>Step-by-Step Approach:</strong> 1. Pre-energisation visual inspection. 2. Dead
              testing and measurement comparison. 3. Live testing against BS 7671 limits. 4.
              Functional testing verification. 5. Final compliance review.
            </p>
            <p>
              <strong>Critical Reference Points:</strong> BS 7671:2018+A4:2026 maximum Zs tables
              (Table 41.3). RCD trip time requirements. Minimum insulation resistance values.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="3. Common Non-Compliances in AM2 (NET Guidance)"
            whatHappens={
              <>
                <strong>Most Common Faults Found:</strong> CPC unsleeved or disconnected. Socket
                polarity reversed. Broken ring final circuit. Circuits not labelled at distribution
                board. <strong>Test Result Failures:</strong> Zs above permitted value for
                protective device. Insulation resistance below 1 MΩ. RCD trip times out of range.
                Continuity values indicating breaks.
              </>
            }
            doInstead={
              <>
                Sleeve every CPC. Verify polarity at every accessory. Run end-to-end ring
                continuity. Label every circuit at the DB. Compare every measured value against the
                BS 7671 limit and record both side-by-side.
              </>
            }
          />

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.5.3"
            clause="Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms); IΔn is the rated residual operating current of the RCD."
            meaning={
              <>
                The TT system test. If the rig is TT, you measure Ra (earth electrode + protective
                conductor) and check Ra × IΔn ≤ 50 V. For a 30 mA RCD that means Ra ≤ 1666 Ω in
                theory — in practice every guidance source pushes you to ≤ 200 Ω because soil
                conditions vary across seasons. A reading above 200 Ω on a 30 mA RCD is a
                non-compliance you record on the EIC even if it meets the 50 V calculation.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 411.5.3 / Table 41.5"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.6"
            clause="Electrical equipment likely to cause high temperatures or electric arcs shall be placed or guarded so as to minimize the risk of ignition of flammable materials. Where the temperature of an exposed part of electrical equipment is likely to cause injury to persons or livestock that part shall be so located or guarded as to prevent accidental contact therewith."
            meaning={
              <>
                Workmanship reg. Crooked accessories, loose terminations, unprotected hot surfaces,
                inadequate cable support — these aren't test-result faults but they're still BS 7671
                non-compliances. AM2 rigs plant workmanship defects (over-tight cable straps,
                missing grommets, accessories not flush) and the assessor wants to see you flag them
                with a reg reference, not just the test results.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 134.1.x — Workmanship"
          />

          <div className="my-6">
            <h3 className="text-ios-headline font-semibold text-elec-yellow mb-3">
              Try the calculator — measured Zs vs Table 41.3 max (Zsmax)
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3">
              BS 7671 A4:2026 Table 41.3 maxima (B-curve, 230 V, 0.4 s): B6 ≈ 7.28 Ω · B16 ≈ 2.73 Ω
              · B32 ≈ 1.37 Ω · B40 ≈ 1.09 Ω. Acceptance at verification: measured Zs must be at or
              below 0.8 × Table 41.3 max (e.g. B32 → 1.10 Ω) to allow for cold-vs-hot correction. A
              measurement above 0.8 × max but below max = C2 on EICR (potentially dangerous). Plug
              U0 = 230 V and your measured Zs into V and R to back out the prospective fault current
              the device must clear.
            </p>
            <OhmsCalculator />
          </div>

          <SectionRule />

          <ConceptBlock
            title="4. How to Report Non-Compliances"
            plainEnglish="Specific, measured, located, referenced — that's what good reporting looks like. Vague descriptions like 'earth missing' lose marks; 'CPC not connected at socket outlet in kitchen' earns them."
          >
            <p>
              <strong>Professional Reporting Principles:</strong> Record clearly on certificate or
              defect report. Use correct technical terminology. Don't guess results — state measured
              values. State the non-compliance, not the correction.
            </p>
            <p>
              <strong>What to Include in Reports:</strong> Specific location of non-compliance.
              Actual measured values where applicable. BS 7671 requirement that is not met. Clear
              description of the defect.
            </p>
            <p>
              <strong>Poor Reporting Examples:</strong> "Earth missing" — too vague, no location
              specified. "Ring fault" — no detail about nature of fault. "RCD broken" — no test data
              or specific failure.
            </p>
            <p>
              <strong>Good Reporting Examples:</strong> "CPC not connected at socket outlet in
              kitchen" — specific, clear, located. "Ring final broken at consumer unit — L
              conductor" — specific conductor and location. "RCD trip time 380ms at 1×IΔn — exceeds
              300ms limit" — measured value and standard referenced.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="5. Assessor Expectations"
            plainEnglish="Find faults, record realistic numbers, explain why each one breaks the regs, and leave the install safe."
          >
            <p>
              <strong>Professional Competence:</strong> Candidate spots and records obvious faults.
              Explains why result is non-compliant with BS 7671. Records test results realistically,
              not "perfect" numbers. Demonstrates understanding of safety implications.
            </p>
            <p>
              <strong>Safety Awareness:</strong> Leaves installation safe, even if faults
              identified. Prioritises safety-critical non-compliances. Shows understanding of
              consequences. Demonstrates regulatory knowledge.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="6. Comprehensive Practical Guidance"
            plainEnglish="Memorise the limits, look for visual clues, sense-check every reading, and never hide a fault."
          >
            <p>
              <strong>Know the Limits:</strong> Memorise maximum Zs values for common MCBs at
              A4:2026 — B32=1.37Ω, B20=2.19Ω, B16=2.74Ω (Cmin = 0.95 applied). RCD trip limit
              (A4:2026): single AC test at 1×IΔn must trip within 300ms for 30mA devices (the 5×IΔn
              test was deleted at A4:2026). Minimum insulation resistance: 1MΩ for most circuits.
            </p>
            <p>
              <strong>Visual Inspection Tips:</strong> Check CPCs visually — assessors always look
              for sleeving. Look for obvious damage, poor workmanship, missing labels. Check
              accessibility and IP ratings for locations.
            </p>
            <p>
              <strong>Test Result Analysis:</strong> Work logically — if reading looks wrong,
              re-test. Record as non-compliant if still outside limits. Compare all readings with BS
              7671 requirements.
            </p>
            <p>
              <strong>Professional Approach:</strong> Don't cover up — never hide or ignore defects.
              Recording them shows competence, not failure. Explain findings clearly to assessor.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock
            title="Real-World Examples"
            plainEnglish="Two failures and one success showing what assessors mark down."
          >
            <p>
              <strong>Example 1: Missed High Zs Reading.</strong> Candidate measured Zs of 2.5 Ω on
              a B32 breaker (A4:2026 Table 41.3 limit 1.37 Ω exceeded). Failed to report — lost
              marks. Lesson: Always compare measured values with BS 7671 limits. High Zs values
              indicate potentially dangerous earth fault loop impedance.
            </p>
            <p>
              <strong>Example 2: Ignored Polarity Error.</strong> Candidate found socket polarity
              reversed, but didn't note it. Assessor flagged — fail. Lesson: Even seemingly minor
              defects must be recorded. Reversed polarity creates serious safety hazards.
            </p>
            <p>
              <strong>Example 3: Correct RCD Documentation.</strong> Candidate recorded RCD trip
              time at 1×IΔn = 280ms plus manual test button operation. Correctly recorded as pass —
              full marks. Lesson: Accurate recording of actual measured values, even when within
              limits, demonstrates professional competence under A4:2026.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section Summary — Key Takeaways"
            plainEnglish="Six things to walk away with from this section."
          >
            <p>Identifying and reporting non-compliances proves professional competence.</p>
            <p>Visual checks, test results, and functional tests must be interpreted correctly.</p>
            <p>Record non-compliances accurately using clear, technical language.</p>
            <p>Note realistic values, not hidden or "book answers".</p>
            <p>Leave installation safe, even with faults recorded.</p>
            <p>Failing to report faults is a common reason candidates don't pass.</p>
            <p>
              <strong>Next Steps:</strong> You're now ready to move on to Section 6, where we'll
              cover time management during testing — a critical skill for AM2 success.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Quoting limits from before A4:2026"
            whatHappens={
              <>
                You spot a planted defect — Zs reads 1.40 Ω on a B32. You write "exceeds 1.44 Ω
                limit" because that's what your textbook said. Assessor reads it: the figure 1.44 Ω
                is the pre-A4 number. The current limit is 1.37 Ω. Your reasoning is right (it's
                non-compliant) but you've cited the wrong figure — and now your professional
                judgement looks shaky on a brand-new EIC.
              </>
            }
            doInstead={
              <>
                Lock in the A4:2026 figures before AM2 day: B-curve at 230 V — B6 ≈ 7.28 Ω · B16 ≈
                2.74 Ω · <strong>B32 = 1.37 Ω</strong> · B40 ≈ 1.09 Ω. Then apply the 0.8 rule for
                cold-vs-hot correction: measured cold Zs on a B32 must be ≤ 0.8 × 1.37 = 1.10 Ω.
                Your 1.40 Ω reading is a non-compliance under both the table max AND the 0.8 rule —
                state both.
              </>
            }
          />

          <Scenario
            title="The CPC at one socket-outlet has no green/yellow sleeving"
            situation={
              <>
                You're on visual inspection of the AM2 rig before energising. At socket-outlet S3,
                the CPC inside the back box is bare copper — no green/yellow sleeve over the bared
                conductor. R1+R2 readings on that circuit are fine (0.45 Ω). All other accessories
                are sleeved correctly.
              </>
            }
            whatToDo={
              <>
                Don't pretend you didn't see it. Record the non-compliance: "CPC unsleeved at
                socket-outlet S3 — Reg 514.4.2 / Reg 134.1.1 not satisfied. Visual non-compliance,
                test results otherwise satisfactory." On a real EICR this would be a C2 (potentially
                dangerous — exposed copper at the back of a metal accessory). Sleeve it before you
                sign off the EIC, re-inspect, then complete the certification. Recording the find,
                the fix and the re-inspection earns full marks.
              </>
            }
            whyItMatters={
              <>
                Unsleeved CPCs are one of the three most-planted defects on AM2 rigs (alongside
                reversed polarity at one socket, and a high Zs from a deliberately long CPC). The
                assessor isn't testing whether you can wire a perfect circuit — they're testing
                whether you can SPOT a defect that a real customer would never notice. Miss it and
                you've certified a sub-standard install.
              </>
            }
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'Do I fail AM2 if the rig has a fault?',
                answer:
                  'No — opposite. The rig is supposed to have planted faults, and the assessor expects you to find them. You fail if you miss obvious defects, ignore them, or record dishonest results. Finding the fault, naming it, citing the relevant reg and recording the measured value = professional competence = pass marks. Hiding it = fail.',
              },
              {
                question: 'How specific does the wording need to be?',
                answer:
                  "Specific enough that someone arriving at the install tomorrow would know exactly which accessory and what's wrong. 'Earth missing' = vague, lost marks. 'CPC not connected at socket-outlet S2 in kitchen — Reg 543.3.1 not satisfied' = specific, with a reg, with a location. Use the rig's circuit/accessory references (S1, S2, L1, L2 etc.) — they're there for exactly this reason.",
              },
              {
                question: 'C1 / C2 / C3 — do those classifications apply to AM2?',
                answer:
                  "Those are EICR classifications (Reg 653 / Appendix 6) — for periodic inspection of an existing installation. AM2 is initial verification, so technically you're producing an EIC not an EICR. But the same logic applies — C1 = danger present, C2 = potentially dangerous, C3 = improvement recommended. On AM2 you fix everything before signing, so a planted defect gets recorded, fixed, re-tested, and the final EIC reads compliant. The reasoning still earns marks.",
              },
              {
                question:
                  'If a Zs reading is above 0.8 × table max but below the table max, is it a fail?',
                answer:
                  "On AM2 day, yes — the 0.8 rule (also called the rule of thumb) is the cold-vs-hot acceptance criterion in GN3 and IET guidance. Measured Zs on a cold cable should be ≤ 0.8 × Table 41.3 max so the device still trips when the cable warms up under load. Above 0.8 × max but below table max is a non-compliance you record and fix. On a real EICR, that's typically a C2.",
              },
              {
                question: "I found a fault that I can't fix in the time available. What do I do?",
                answer:
                  "Record it as a non-compliance on the EIC. Leave the affected circuit ISOLATED (lock-off, warning notice). Don't sign the certificate as compliant for that circuit — Reg 644.4 says you can't certify what isn't compliant. Sign off the rest of the install if it's compliant, list the defective circuit on the EIC's deviations / departures section, and note the action required. Honesty + safety > finishing the form.",
              },
              {
                question:
                  "Reg 421.1.7 (AFDDs) — if there's no AFDD on the rig, is that a non-compliance?",
                answer:
                  "No. A4:2026 Reg 421.1.7 'has been introduced recommending the installation of arc fault detection devices' — recommending, not mandating, on most circuits. An installation without AFDDs is still compliant. You'd note the recommendation on the EIC for circuits where the customer might benefit (e.g. circuits feeding sleeping accommodation in HMOs) but absence of AFDDs isn't a non-compliance to record as a fault.",
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Non-compliance = anything that doesn't meet BS 7671:2018+A4:2026, manufacturer's instructions or the spec.",
              'A4:2026 figures only — B32 Zsmax = 1.37 Ω (NOT 1.44), apply 0.8 rule → 1.10 Ω cold.',
              'Three lenses: visual inspection, test result vs reg limit, functional test. Use all three on every circuit.',
              "Specific reporting: location + accessory + measured value + reg cited. 'CPC unsleeved at S3 — Reg 514.4.2' beats 'earth missing'.",
              'TT systems: Reg 411.5.3 — Ra × IΔn ≤ 50 V. Aim for Ra ≤ 200 Ω in practice on a 30 mA RCD.',
              'Finding faults = professional competence = marks. Hiding them = fail. Fix what you find, re-test, sign only when compliant.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Identifying and Reporting Non-Compliances" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Functional Testing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Time Management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module4Section5;
