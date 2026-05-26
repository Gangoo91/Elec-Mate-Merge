/**
 * Module 2 · Section 4 — Completing paperwork under pressure
 * AM2 day-prep — AM2 Phase A (H&S, safe isolation, RAMS, paperwork)
 * Certificates, test sheets and RAMS — neat, accurate, finished on time, with measured values not book answers.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  LearningOutcomes,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
  RegsCallout,
} from '@/components/study-centre/learning';

const TITLE = 'Completing Paperwork Under Pressure | AM2 Module 2.4 | Elec-Mate';
const DESCRIPTION =
  'Certificates, test sheets and RAMS finished neatly on the clock — measured values not book answers, with no boxes left blank.';

const AM2Module2Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 'book-answers-fail',
      question: "Why are 'book answer' test results not acceptable in AM2?",
      options: [
        "Assuming that negative events are specifically directed at you when they may not be",
        "They don't reflect measured values - assessors check consistency with actual installation",
        "Digital Addressable Lighting Interface - individual luminaire control",
        "Making good of plaster, decoration and disposal of old materials",
      ],
      correctIndex: 1,
      explanation:
        "Book answers show you've copied values rather than actually measuring them. Assessors cross-check results with your actual installation.",
    },
    {
      id: 'earth-fault-loop',
      question: "What's wrong with writing '0.00 Ω' for earth fault loop impedance?",
      options: [
        'The client or their appointed representative (engineer/architect)',
        'The metalwork becomes live and dangerous',
        'Higher operating frequency eliminates flicker and improves efficacy',
        'Unrealistic value - indicates copying, not measuring',
      ],
      correctIndex: 3,
      explanation:
        '0.00 Ω is physically impossible for Zs measurements. Real circuits always have some impedance, even if very low.',
    },
    {
      id: 'blank-vs-false',
      question:
        "If you can't finish all test results, what's better: leaving blanks or writing book answers?",
      options: [
        'Vertical cables between floors',
        'Leave blanks safe - false values = fail',
        'Start with parallel sections first',
        'Identification and organization',
      ],
      correctIndex: 1,
      explanation:
        "Leaving blanks may lose marks but won't cause automatic failure. False or unrealistic values can result in complete section failure.",
    },
    {
      id: 'time-allocation',
      question: 'How much time is allocated for testing and paperwork together in AM2?',
      options: [
        'A single insulated conductor in conduit in a thermally insulated wall.',
        'About 3.5 hours for testing and documentation combined',
        'Prevent unauthorised access and clearly indicate hazards',
        'Physiological and safety needs (levels 1 and 2)',
      ],
      correctIndex: 1,
      explanation:
        'You have approximately 3.5 hours for the inspection, testing, and documentation phase - time management is crucial.',
    },
    {
      id: 'legal-consequences',
      question:
        "In real industry work, what's the consequence of incomplete electrical certificates?",
      options: [
        'Enclosing small-scale asbestos removal tasks such as removing lagging from pipes',
        'Prospective fault current, earth fault loop impedance, cable sizing, voltage drop',
        'Close the door immediately, remove the wedge, and report the issue',
        'Liability issues, invalid certificates, and potential disciplinary action',
      ],
      correctIndex: 3,
      explanation:
        'Incomplete or inaccurate certificates create legal liability, invalidate the work certification, and can lead to serious disciplinary consequences.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Name two types of paperwork you'll complete in AM2:",
      options: [
        'Automatic lighting activation during security events for deterrence',
        'Risk Assessments and Method Statements (RAMS), Electrical Installation Certificate (EIC)',
        'Correct type, properly tightened, and providing earth continuity where required',
        'That the ground is firm, level and capable of supporting the tower',
      ],
      correctAnswer: 1,
      explanation:
        "You'll complete RAMS documentation, EIC certificates, inspection & testing sheets, and schedule of test results.",
    },
    {
      id: 2,
      question: "Why are 'book answers' a fail in AM2 paperwork?",
      options: [
        "Single-point grounding, typically at the patch panel end",
        "Emergency code that silently alerts authorities while appearing to disarm",
        "They don't reflect actual measured values - assessors check consistency",
        "Supply leading reactive current to offset lagging current",
      ],
      correctAnswer: 2,
      explanation:
        "Assessors compare your documented results with the actual installation. Book answers show you haven't actually measured anything.",
    },
    {
      id: 3,
      question: 'How much time is allocated for testing and paperwork together?',
      options: [
        'Air removes heat faster than mass can store it',
        'To ensure accuracy and compliance with standards',
        'Distinguishing between honest errors and reckless behaviour',
        'About 3.5 hours for testing and documentation combined',
      ],
      correctAnswer: 3,
      explanation:
        'The inspection, testing and documentation phase has approximately 3.5 hours total - requiring careful time management.',
    },
    {
      id: 4,
      question: "What's wrong with writing '0.00 Ω' for Zs?",
      options: [
        'Unrealistic value - indicates copying, not measuring',
        'Cross-connection method for confirming ring continuity',
        'Internal components (plug, seat, cage) that control flow',
        'Watching someone similar to you succeed at a task',
      ],
      correctAnswer: 0,
      explanation:
        '0.00 Ω is physically impossible for earth fault loop impedance. Real measurements always show some impedance value.',
    },
    {
      id: 5,
      question: 'True or false: Leaving blanks is better than writing false values:',
      options: [
        'False - complete everything',
        'True - false values can cause section failure',
        'True - blanks show honesty',
        'False - estimates are acceptable',
      ],
      correctAnswer: 1,
      explanation:
        'Leaving blanks may lose marks but false/unrealistic values can result in complete section failure.',
    },
    {
      id: 6,
      question: "What's the consequence of illegible handwriting in AM2?",
      options: [
        "A splice using alignment fixtures and index-matching gel",
        "Cannot be functionally tested in the field",
        "Lost marks - assessors can't mark what they can't read",
        "When live conductors make contact with earth or earthed metalwork",
      ],
      correctAnswer: 2,
      explanation:
        'If assessors cannot read your entries clearly, they cannot award marks regardless of whether the content might be correct.',
    },
    {
      id: 7,
      question: 'When should you record test results - at the end or as you go?',
      options: [
        'RCD and MCB in a single device',
        'Burn gel sachets and trauma dressings',
        'Individual panel optimization',
        'As you go - prevents rushing and mistakes',
      ],
      correctAnswer: 3,
      explanation:
        'Recording results as you test prevents rushing at the end, reduces errors, and ensures nothing is forgotten.',
    },
    {
      id: 8,
      question: 'Which unit would you record insulation resistance in?',
      options: [
        'MΩ (megohms)',
        'kΩ (kilohms)',
        'Ω (ohms)',
        'mΩ (milliohms)',
      ],
      correctAnswer: 0,
      explanation:
        'Insulation resistance values are typically very high and are measured and recorded in megohms (MΩ).',
    },
    {
      id: 9,
      question: 'What happens if you omit polarity test results?',
      options: [
        'Earthing and automatic disconnection',
        'Section can fail - polarity is a mandatory test',
        '70-95% depending on size and type',
        'Permit to work details and compliance with site procedures',
      ],
      correctAnswer: 1,
      explanation:
        'Polarity testing is mandatory under BS 7671. Omitting these results can result in section failure regardless of other work quality.',
    },
    {
      id: 10,
      question: 'Why is completing paperwork correctly critical in industry as well as AM2?',
      options: [
        'The current intended to flow under normal conditions',
        'May to September (the active season), with surveys typically starting at dusk',
        'Legal liability, insurance validity, and regulatory compliance',
        'Maximum 50% fill for cable management and future additions',
      ],
      correctAnswer: 2,
      explanation:
        'Proper documentation is legally required, affects insurance validity, ensures regulatory compliance, and provides legal protection.',
    },
  ];

  const learningOutcomes = [
    'Accurately complete electrical installation certificates (EICs), test result sheets, and other documents',
    'Record results clearly, with realistic measured values that reflect actual testing',
    'Manage time effectively to complete paperwork alongside practical tasks',
    'Recognise the paperwork errors that cause marks to be lost in AM2',
    'Apply efficient strategies to document under pressure without mistakes',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4"
            title="Completing Paperwork Under Pressure"
            description="Accurate completion of certificates, test sheets, and RAMS forms within AM2 time limits - critical skills for passing AM2 and real-world electrical work."
            tone="yellow"
          />

          <TLDR
            points={[
              'Paperwork is part of the marked assessment, not an admin afterthought.',
              'Falsifying readings (e.g. inventing a Zs because you didn’t have time to test it) is a critical fail and could mean criminal liability in real life.',
              'Every blank field is a Not Yet Competent. Tick boxes, signatures, dates and sheet references all count.',
              'Build paperwork into your time plan — Section B is 3.5 hours and most of the back half is documentation.',
            ]}
          />

          <ConceptBlock title="Paperwork Failure = Assessment Failure">
            <p>
              <strong className="text-red-300">Critical.</strong> In the AM2, paperwork is not an
              afterthought — it's part of the assessment. Candidates must complete certificates,
              test sheets, and RAMS forms accurately and efficiently within the strict time limit.
              Many otherwise competent electricians fail because their documentation is rushed,
              incomplete, or unrealistic.
            </p>
            <p>
              In real life, poor paperwork means liability, invalid certificates, and disciplinary
              issues. In AM2, it means lost marks and possible failure.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Types of Paperwork You'll Complete">
            <p>
              <strong>Risk Assessments and Method Statements (RAMS).</strong> Pre-work planning
              documentation showing hazard identification and safe working procedures. Must be
              task-specific and realistic for the actual work being undertaken.
            </p>
            <p>
              <strong>Inspection &amp; Testing Sheets.</strong> Records of visual inspection and
              electrical testing results. Must contain actual measured values, not theoretical or
              'book' answers.
            </p>
            <p>
              <strong>Electrical Installation Certificate (EIC).</strong> Formal certification that
              installation complies with BS 7671. Legal document requiring complete and accurate
              information in all sections.
            </p>
            <p>
              <strong>Schedule of Test Results.</strong> Detailed test measurements for each
              circuit. Values must be consistent with actual installation and realistic for the
              circuit types.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="NET Testing Procedures">
            <p>
              <strong className="text-elec-yellow">Initial Verification Tests (EIC):</strong>
            </p>
            <p>
              <strong>1. Continuity of Protective Conductors.</strong> Test all CPC connections
              including main and supplementary bonding.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record actual measured resistance values</li>
              <li>Check R1+R2 values for each circuit</li>
              <li>Document bonding conductor continuity</li>
            </ul>
            <p>
              <strong>2. Continuity of Ring Final Circuits.</strong> End-to-end and cross-connection
              tests for socket circuits.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record live-neutral, live-earth, neutral-earth values</li>
              <li>Calculate and verify (R1+R2)/4 values</li>
              <li>Document any interconnections found</li>
            </ul>
            <p>
              <strong>3. Insulation Resistance.</strong> Minimum 1MΩ at 500V DC between live
              conductors and earth.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test between live and neutral conductors</li>
              <li>Test between live conductors and earth</li>
              <li>Record values in MΩ, never as &gt;999MΩ</li>
            </ul>
            <p>
              <strong>4. Polarity Testing.</strong> Verify correct connections at switches, sockets
              and accessories.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Check switch line connections</li>
              <li>Verify socket outlet polarity</li>
              <li>Confirm protective device arrangements</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Live Testing &amp; Documentation:</strong>
            </p>
            <p>
              <strong>5. Earth Fault Loop Impedance (Zs).</strong> Verify disconnection times meet
              BS 7671 requirements.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure actual Zs at each outlet</li>
              <li>Compare with maximum permitted values</li>
              <li>Never record 0.00Ω — always shows measurable value</li>
            </ul>
            <p>
              <strong>6. RCD Operation Testing.</strong> Test trip times at x1, x5 rated current and
              ramp testing.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record trip time at 1×IΔn (A4:2026 — 5×IΔn test deleted)</li>
              <li>Document ramp test results</li>
              <li>Test mechanical operation button</li>
            </ul>
            <p>
              <strong>7. Voltage and Phase Sequence.</strong> Supply voltage verification and
              three-phase rotation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record actual supply voltages</li>
              <li>Verify phase rotation for 3-phase supplies</li>
              <li>Check voltage balance between phases</li>
            </ul>
            <p>
              <strong>8. Functional Testing.</strong> Operation of switches, isolators and control
              devices.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test all switching and control functions</li>
              <li>Verify emergency stop operations</li>
              <li>Document any operational limitations</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Complete Documentation Package">
            <p>
              <strong className="text-elec-yellow">Design Stage Documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design calculations and load assessments</li>
              <li>Cable sizing and protection coordination</li>
              <li>Circuit schedules and distribution board layouts</li>
              <li>Installation method statements and routing</li>
              <li>Special location considerations (BS 7671 sections)</li>
              <li>Earthing and bonding arrangements</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Installation Stage Records:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Installation method verification records</li>
              <li>Material compliance certificates (CE marking)</li>
              <li>Progressive inspection records and hold points</li>
              <li>Amendment records and design variations</li>
              <li>Risk assessments and method statements</li>
              <li>Non-conformance reports and rectifications</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Handover Documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete test results and certificates (EIC/EICR)</li>
              <li>Operation and maintenance manuals</li>
              <li>As-built drawings and updated schedules</li>
              <li>Manufacturer warranties and technical data</li>
              <li>Periodic inspection recommendations and intervals</li>
              <li>Building Regulations compliance notifications</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Legal Framework">
            <p>
              <strong>Building Regulations Part P.</strong> Mandatory for notifiable electrical work
              in dwellings and certain other premises.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Special locations (bathrooms, kitchens) require notification</li>
              <li>New circuits and consumer unit changes</li>
              <li>Outdoor electrical installations and garden supplies</li>
              <li>Certificate submission to Building Control within 30 days</li>
            </ul>
            <p>
              <strong>BS 7671:2018+A4:2026 Requirements.</strong> IET Wiring Regulations compliance
              verification and documentation standards.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design verification and calculation documentation</li>
              <li>Installation method compliance verification</li>
              <li>Protection coordination and discrimination</li>
              <li>RCD protection requirements (Section 411)</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">
                NET Testing Standards &amp; AM2 Requirements.
              </strong>{' '}
              National Electrical Testing requirements ensure competency in documentation and
              testing procedures.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AM2 practical assessment documentation standards</li>
              <li>Portfolio evidence compilation requirements</li>
              <li>Health and safety documentation standards</li>
              <li>Time-limited documentation completion skills</li>
              <li>Realistic test result recording techniques</li>
              <li>Industry-standard certificate completion</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pre-Paperwork Checklist">
            <p>
              <strong>Before You Start:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Check all paperwork is provided and complete</li>
              <li>Understand the installation you're certifying</li>
              <li>Have testing equipment calibrated and ready</li>
              <li>Plan your testing sequence to match paperwork</li>
              <li>Ensure pen (not pencil) is available</li>
            </ul>
            <p>
              <strong>Time Management Strategy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Allocate specific time for documentation</li>
              <li>Record results immediately after each test</li>
              <li>Don't leave all paperwork until the end</li>
              <li>Allow buffer time for final checks</li>
              <li>Practice timing on blank forms beforehand</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Paperwork Mistakes">
            <p>
              <strong className="text-elec-yellow">Critical Errors to Avoid:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Missing or illegible entries</li>
              <li>Recording "perfect" values instead of measured ones</li>
              <li>Mixing up insulation resistance vs continuity values</li>
              <li>Forgetting polarity results</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Format and Technical Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Not completing all sections of certificates</li>
              <li>Using the wrong units or symbols</li>
              <li>Inconsistent measurement formats</li>
              <li>Missing signatures and dates</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Why Realistic Values Matter.</strong> Assessors
              are experienced electricians who know what realistic test results look like. They can
              spot copied or "book" values immediately. Values like "999.9 MΩ" for insulation
              resistance or "0.00 Ω" for earth fault loop impedance are red flags that indicate you
              haven't actually performed the tests.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Time Pressure in AM2">
            <p>
              <strong>Assessment Structure.</strong> Paperwork is completed during the inspection
              &amp; testing stage of the AM2 assessment.
            </p>
            <p>
              <strong>Time Allocation.</strong> About 3.5 hours for testing and documentation
              combined — no separate paperwork time.
            </p>
            <p>
              <strong>Common Problem.</strong> Candidates who don't pace themselves often run out of
              time or rush at the end.
            </p>
            <p>
              <strong className="text-orange-400">Time Management Reality.</strong> With
              approximately 3.5 hours to complete inspection, testing AND all documentation, you
              cannot afford to leave paperwork until the end. Successful candidates integrate
              documentation into their testing process, recording results immediately after each
              test.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Strategies for Success">
            <p>
              <strong>Pre-Assessment Preparation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Practice certificates beforehand — fill in blank EICs and test sheets until it's
                second nature
              </li>
              <li>Time yourself completing full certificate sets to build muscle memory</li>
              <li>Familiarize yourself with typical test result ranges for common installations</li>
            </ul>
            <p>
              <strong>During Assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record results as you go — don't wait until the end of the section</li>
              <li>Be neat and legible — if assessors can't read it, you lose marks</li>
              <li>Use standard units (Ω, MΩ, V, A) consistently throughout</li>
              <li>Check every box before submission — blanks lose marks</li>
            </ul>
            <p>
              <strong>Quality Control:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cross-check measurements against installation reality</li>
              <li>Ensure values are consistent across different test sheets</li>
              <li>
                Verify all mandatory tests are recorded (continuity, insulation, polarity, etc.)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Real-world Examples">
            <p>
              <strong className="text-red-400">Example 1: Polarity Omission.</strong> Candidate
              completed all tests but rushed paperwork. Missed filling in the polarity results.
              Despite excellent practical work, the section failed due to incomplete mandatory test
              records.
            </p>
            <p>
              <strong className="text-red-400">Example 2: Book Value Detection.</strong> Candidate
              wrote down "ideal textbook" insulation resistance values (999 MΩ). Assessor checked
              actual meter logs — values didn't match the recorded results. Automatic fail for false
              documentation.
            </p>
            <p>
              <strong className="text-green-400">Example 3: Integrated Approach.</strong> Candidate
              filled paperwork as they tested, kept documentation neat and consistent with actual
              measurements. Passed comfortably with high marks across all assessment criteria.
            </p>
            <p>
              <strong className="text-amber-400">Example 4: Industry Consequences.</strong> In
              industry, an electrician signed off an incomplete EIC without proper test results.
              Work was later audited by building control — disciplinary action taken and
              professional reputation damaged.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: Can I use pencil in AM2 paperwork?</strong> No — all paperwork must be
              completed in pen for legal certification requirements.
            </p>
            <p>
              <strong>Q2: Will assessors allow small mistakes?</strong> Minor slips may not fail
              you, but repeated or major omissions will. Quality and accuracy are assessed
              holistically.
            </p>
            <p>
              <strong>Q3: Do I need to write explanations for test results?</strong> No, just
              accurate measured values in the correct boxes. Over-explanation can waste valuable
              time.
            </p>
            <p>
              <strong>Q4: What happens if I don't complete the paperwork in time?</strong> Marks are
              lost proportionally. Incomplete documentation may tip you below the pass threshold
              despite good practical work.
            </p>
            <p>
              <strong>Q5: Can I bring pre-filled paperwork?</strong> No — all paperwork must be
              completed during the assessment to demonstrate competency under exam conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>Paperwork is as important as the practical work. You must:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Fill in all sections (RAMS, test sheets, certificates) completely and accurately
              </li>
              <li>Record realistic, measured values that reflect actual testing performed</li>
              <li>Work neatly and legibly — illegible entries cannot be marked</li>
              <li>Manage your time effectively — don't leave documentation until the end</li>
            </ul>
            <p>
              <strong className="text-red-400">
                Remember: Failing paperwork = failing the AM2, even if your installation work is
                flawless.
              </strong>
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 641.1"
            clause="Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met."
            meaning={
              <>
                Inspection and testing isn’t just a Section B exercise — it’s a regulatory
                requirement for every installation. Your AM2 paperwork has to record what you
                tested, what you measured, and the certificate confirms the install meets BS 7671.
                Blank readings break the regulation. Made-up readings break the law.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 641.1."
          />

          <Scenario
            title="Twenty minutes left and the certificate is half done"
            situation={
              <>
                End of Section B. You’ve done all the tests and recorded readings on a rough sheet,
                but the formal Electrical Installation Certificate is only half-completed. The clock
                shows twenty minutes. The candidate next to you has already handed in.
              </>
            }
            whatToDo={
              <>
                Don’t panic-fill. Work through it methodically: schedule of inspections (tick what
                you actually inspected, leave the rest blank rather than tick everything to be
                safe), schedule of test results (transcribe from your rough sheet — never make a
                number up), then declarations and signatures. If you genuinely run out of time, hand
                in what you’ve honestly completed. A blank field loses one criterion. A fabricated
                reading is a critical fail.
              </>
            }
            whyItMatters={
              <>
                The assessor cross-checks your readings against the rig. They know what the loop
                impedance should be at each accessory. Inventing values doesn’t just fail you — it’s
                grounds to invalidate the whole sitting.
              </>
            }
          />

          <CommonMistake
            title="Filling in the certificate as you go and not cross-referencing the test sheet"
            whatHappens={
              <>
                You jot Zs values straight onto the certificate during testing, then the rough sheet
                says something different at the end. The assessor spots the mismatch and you’ve got
                no clean trail.
              </>
            }
            doInstead={
              <>
                Use one rough sheet for live test results, then transcribe to the certificate at the
                end. Cross-check before you sign. One source of truth, transcribed once, signed
                once.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Can I take the certificate home and finish it?',
                answer:
                  'No. Section B is the certification time. Whatever isn’t done by the end of the section is marked as it stands.',
              },
              {
                question: 'What if I accidentally write the wrong reading?',
                answer:
                  'Cross it out with a single line, write the correct value next to it, initial the correction. Don’t use Tippex or scribble. Auditable corrections are fine; obscured corrections are not.',
              },
              {
                question: 'Do I sign as designer, installer and inspector?',
                answer:
                  'On AM2 you are typically all three for the simulated installation. Sign each declaration with the same name and date. The candidate brief tells you which boxes to tick.',
              },
              {
                question: 'How important is handwriting?',
                answer:
                  'Important. If the assessor can’t read your figures, they can’t mark them. Block capitals for names and addresses, neat numbers in the test boxes.',
              },
              {
                question: 'What’s the difference between EIC and Minor Works?',
                answer:
                  'An Electrical Installation Certificate (EIC) covers a new installation or significant addition. A Minor Electrical Installation Works Certificate (MEIWC) covers small alterations to an existing circuit. AM2 typically uses an EIC plus a Schedule of Test Results.',
              },
              {
                question: 'Should I record values to two decimal places?',
                answer:
                  'Match the precision of your instrument. Most modern testers display to two decimal places — record what you read. Don’t round to "neat" numbers.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Paperwork is part of the marked assessment — treat it like installation work.',
              'BS 7671 Reg 641.1 makes inspection and testing a legal requirement, with the certificate as the evidence.',
              'Falsifying readings is a critical fail and can have legal consequences in real work.',
              'Use one rough test sheet, then transcribe to the formal certificate. Cross-check before signing.',
              'Cross-check against the rig — assessors know what the readings should be.',
              'Blank fields are NYCs. Made-up entries are critical fails. Honest gaps beat dishonest fills.',
              'Block capitals for names, neat figures for readings, single-line strikethrough with initials for corrections.',
              'Plan paperwork time into Section B from the start — at least 45 minutes for the full EIC and schedules.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Knowledge Check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 3</div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Continue to Section 5
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module2Section4;
