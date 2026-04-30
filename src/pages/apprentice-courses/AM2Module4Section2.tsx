/**
 * Module 4 · Section 2 — Safe use of test instruments (GS38 compliance)
 * AM2 day-prep — AM2 Phase C (inspection, testing, certification)
 * GS38-compliant probes and leads, prove-test-prove every time, and the unsafe practices that fail you.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe Use of Test Instruments (GS38 Compliance) | AM2 Module 4.2 | Elec-Mate';
const DESCRIPTION =
  'GS38-compliant probes and leads, prove-test-prove every time — and the test-instrument habits that earn instant fails.';

const AM2Module4Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'State the GS38 requirements for test instruments and leads',
    'Prove test equipment before and after use correctly',
    'Use voltage indicators safely for live/dead testing',
    'Avoid unsafe practices that lead to instant fails',
    'Understand exactly what assessors are looking for when you use test equipment',
    'Handle multifunction testers safely and competently',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'probe-exposure',
      question: 'How much of the probe tip should be exposed under GS38?',
      options: ['1-2 mm maximum', '2-4 mm maximum', '5-10 mm maximum', 'Any length is acceptable'],
      correctIndex: 1,
      explanation:
        'GS38 requires probe tips to have only 2-4 mm of metal exposed to minimise risk of accidental contact.',
    },
    {
      id: 'lead-zeroing',
      question: 'Why must leads be zeroed before a continuity test?',
      options: [
        'To check battery level',
        'To remove resistance of the leads from the measurement',
        'To calibrate the display',
        "It's not necessary",
      ],
      correctIndex: 1,
      explanation:
        'Lead resistance must be removed from measurements to ensure accurate continuity readings.',
    },
    {
      id: 'proving-sequence',
      question: 'What is the correct proving sequence for safe isolation?',
      options: [
        'Test circuit only',
        'Prove tester -> Test circuit -> Re-prove tester',
        'Re-prove tester -> Test circuit -> Prove tester',
        'Test circuit -> Prove tester',
      ],
      correctIndex: 1,
      explanation:
        'The safe sequence is: prove tester on known live source, test the circuit, then re-prove on known live source.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is GS38 and why is it important?',
      options: [
        'A British Standard for electrical testing',
        'HSE guidance for electrical test equipment safety',
        'A type of test instrument',
        'An electrical regulation',
      ],
      correctAnswer: 1,
      explanation:
        'GS38 is HSE (Health and Safety Executive) guidance that specifies safety requirements for electrical test equipment to prevent accidents and injuries.',
    },
    {
      id: 2,
      question: 'How much probe tip exposure is allowed under GS38?',
      options: ['1 mm maximum', '2-4 mm maximum', '5-8 mm maximum', '10 mm maximum'],
      correctAnswer: 1,
      explanation:
        'GS38 specifies that probe tips should have only 2-4 mm of metal exposed to minimise the risk of accidental short circuits.',
    },
    {
      id: 3,
      question: 'Why must test leads be fused?',
      options: [
        'To protect the instrument display',
        'To protect against overcurrent and short circuit faults',
        'To improve accuracy',
        'To meet CAT ratings',
      ],
      correctAnswer: 1,
      explanation:
        'Fused leads protect both the user and equipment from dangerous overcurrents that could occur during fault conditions.',
    },
    {
      id: 4,
      question: 'What is the purpose of finger barriers on test probes?',
      options: [
        'To improve grip',
        'To prevent fingers slipping onto live conductors',
        'To make probes look professional',
        'To protect the probe tips',
      ],
      correctAnswer: 1,
      explanation:
        'Finger barriers prevent accidental contact with live parts if hands slip down the probe during testing.',
    },
    {
      id: 5,
      question: 'What is the correct sequence for proving a voltage tester?',
      options: [
        'Test circuit then prove on known live source',
        'Prove on known live -> Test circuit -> Re-prove on known live',
        'Test circuit only',
        'Prove once at start of day',
      ],
      correctAnswer: 1,
      explanation:
        'The safe proving sequence ensures the tester is working before and after testing to confirm reliable dead indication.',
    },
    {
      id: 6,
      question: 'Why must tester leads be zeroed before continuity testing?',
      options: [
        'To check the battery',
        'To remove the resistance of the test leads from readings',
        'To set the display to zero',
        'To calibrate the instrument',
      ],
      correctAnswer: 1,
      explanation:
        'Zeroing removes the inherent resistance of the test leads to ensure accurate low-resistance measurements.',
    },
    {
      id: 7,
      question: 'True or false: You can tape over damaged leads to continue using them in AM2.',
      options: [
        'True - tape repairs are acceptable',
        'False - damaged leads must not be used',
        'True - if tape is electrical grade',
        'False - only in emergencies',
      ],
      correctAnswer: 1,
      explanation:
        'Damaged leads must never be used in AM2 or real work - tape repairs are not acceptable and will result in immediate failure.',
    },
    {
      id: 8,
      question: 'What CAT rating category should test instruments meet?',
      options: [
        'CAT I only',
        'CAT II for most electrical work',
        'CAT III or higher depending on application',
        'Any CAT rating is fine',
      ],
      correctAnswer: 2,
      explanation:
        "CAT III or appropriate category rating ensures instruments can safely handle the electrical environment they're used in.",
    },
    {
      id: 9,
      question: 'What is the assessor looking for when you handle test equipment?',
      options: [
        'Speed of testing',
        'GS38 compliance and safe handling procedures',
        'Expensive equipment',
        'Perfect numerical results',
      ],
      correctAnswer: 1,
      explanation:
        'Assessors primarily evaluate GS38 compliance, safe handling, and proper procedures rather than speed or specific results.',
    },
    {
      id: 10,
      question: 'What is the consequence of failing to re-prove a voltage tester?',
      options: [
        'Minor mark deduction',
        'Warning from assessor',
        'Automatic failure of AM2 assessment',
        'No consequence',
      ],
      correctAnswer: 2,
      explanation:
        'Failing to re-prove the tester after testing is considered unsafe practice and results in automatic AM2 failure.',
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
            eyebrow="Module 4 · Section 2"
            title="Safe Use of Test Instruments (GS38 Compliance)"
            description="In AM2, you will use a range of test instruments (multifunction testers, voltage indicators, continuity testers). These must be used safely and correctly in line with HSE GS38 and BS 7671 requirements. Unsafe use of test equipment can cause serious injury and will result in an automatic fail."
            tone="yellow"
          />

          <TLDR
            points={[
              'GS38 is HSE guidance — probes shrouded with 2-4 mm of metal exposed, fused leads, finger barriers, no taped repairs. Anything less = instant fail.',
              'Six-step safe isolation: Identify → Isolate → Secure → Prove → Test → Re-prove. The two prove steps bookend the test for a reason.',
              'MFT: confirm range BEFORE connecting. 500 V DC for IR, low resistance for continuity. Reset to voltage mode after each test.',
              'Two-pole voltage indicator + dedicated proving unit is the standard NET combination on AM2 day.',
              'Forgetting to re-prove after the dead test = automatic fail — that step catches a tester that died during the job.',
            ]}
          />

          <CommonMistake
            title="GS38 Compliance is Non-Negotiable"
            whatHappens={
              <>
                Using non-compliant leads, damaged equipment, or skipping proving steps will result
                in automatic AM2 failure. HSE GS38 requirements protect lives and must be followed
                exactly.
              </>
            }
            doInstead={
              <>
                Unsafe practices with test equipment have caused serious injuries and deaths in the
                electrical industry. Assessors will stop the test immediately if unsafe practices
                are observed.
              </>
            }
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ContentEyebrow>GS38 Requirements for Test Instruments</ContentEyebrow>

          <ConceptBlock
            title="1. GS38 Requirements for Test Instruments"
            plainEnglish="GS38 is the HSE guidance every electrician must follow when using test gear. The probes, leads and instruments themselves all have to meet specific compliance criteria — anything less than this on AM2 day is an instant fail."
          >
            <p>
              <strong>Test Probes Must Be:</strong> Shrouded tips, with only 2-4 mm of metal
              exposed. Finger barriers or insulated handles. In good condition with no damage.
            </p>
            <p>
              <strong>Test Leads Must Be:</strong> Fused, rated for the system voltage. In good
              condition (no cracks, damage, or taped repairs). Appropriate length for safe working.
            </p>
            <p>
              <strong>Instruments Must Be:</strong> Category rated (CAT II / CAT III depending on
              use). Regularly calibrated and in good working order. Suitable for the intended
              application.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <SectionRule />

          <ConceptBlock
            title="2. Complete Safe Isolation Procedure — six steps in strict order"
            plainEnglish="This is the complete safe isolation procedure as per HSE GS38 and BS 7671. Every step must be completed in order. Skipping any step or changing the sequence = instant AM2 failure."
            onSite="Practise this until it's a reflex. Identify, isolate, secure, prove, test, re-prove. The two prove steps bookend the test — that's what catches a tester that's gone faulty during the job."
          >
            <p>
              <strong>Step 1 — IDENTIFY the Circuit/Supply to be Isolated.</strong> Clearly identify
              which circuit or supply needs to be made safe for work. Use circuit charts, labels,
              and visual inspection. AM2 Actions: Check circuit labels and documentation. Verify
              circuit routes and connections. Confirm the scope of isolation required. Identify all
              sources of supply.
            </p>
            <p>
              <strong>Step 2 — ISOLATE the Circuit/Supply.</strong> Switch off the circuit using
              appropriate isolation devices. Turn off MCBs, remove fuses, or operate isolator
              switches. AM2 Actions: Switch off appropriate MCB/isolator. Remove fuses where
              applicable. Ensure all supply sources are isolated. Check isolation device is in OFF
              position.
            </p>
            <p>
              <strong>Step 3 — SECURE the Isolation.</strong> Prevent accidental re-energisation by
              locking off the isolation device and/or removing fuses completely. AM2 Actions: Apply
              lock-off device if available. Remove fuses and keep them with you. Place warning
              notices if required. Ensure others cannot accidentally re-energise.
            </p>
            <p>
              <strong>Step 4 — PROVE the Voltage Tester on Known Live Source.</strong> Test your
              voltage indicator on a proving unit or known live source to confirm it's working
              correctly. AM2 Critical Requirements: Use proving unit or reliable known live source.
              Confirm clear positive voltage indication. Must be demonstrated to assessor. Check
              tester is functioning correctly.
            </p>
            <p>
              <strong>Step 5 — TEST for Dead at the Point of Work.</strong> Test between all
              conductors at the exact point where work will be carried out to confirm no voltage is
              present. AM2 Test Points (All Must Show Dead): Line to Neutral (L-N). Line to Earth
              (L-E). Neutral to Earth (N-E). Between all conductors if 3-phase.
            </p>
            <p>
              <strong>Step 6 — RE-PROVE the Voltage Tester on Known Live Source.</strong> Return to
              the known live source and re-test to confirm your voltage indicator is still working
              correctly. AM2 Critical — This Confirms: Voltage tester has not failed during testing.
              "Dead" readings were genuine, not due to faulty tester. Safe to proceed with work.
              Forgetting this step = automatic failure.
            </p>
            <p>
              <strong>Safe Isolation Complete — Now Safe to Work.</strong> Only after completing ALL
              6 steps in sequence is it safe to begin work on the isolated circuit. The circuit is
              now proven dead and isolated. Maintain the isolation throughout your work, and follow
              the same proving sequence before re-energising.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.7.3.1"
            clause="Where protective measures are used which require a knowledge of earth fault loop impedance, the relevant impedances shall be measured, or determined by an alternative method. An electrical continuity test shall be carried out according to Regulation 643.2 before carrying out the earth fault loop impedance measurement. The measured earth fault loop impedance shall comply with Chapter 41."
            meaning={
              <>
                The reg literally says continuity <strong>before</strong> loop impedance — that's
                why you can't reach for the Zs button until R1+R2 has come back clean. If the CPC
                has a break, your Zs reading would be meaningless (and you'd be passing fault
                current through your test leads in the wrong place). Continuity is the gate that
                opens the rest of the test sequence.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 643.7.3.1 / Chapter 41"
          />

          <SectionRule />

          <ConceptBlock
            title="3. Using a Multifunction Tester (MFT) Safely"
            plainEnglish="The MFT is the workhorse of AM2 testing. Setting it up correctly before each test — and resetting it after — keeps you safe and gives you readings the assessor will trust."
          >
            <p>
              <strong>Pre-Test Procedures:</strong> Select the correct test range (e.g., insulation
              resistance 500V DC, continuity low resistance). Confirm leads are in the correct
              sockets before testing. Check lead condition and probe compliance. Zero leads before
              continuity resistance tests.
            </p>
            <p>
              <strong>During Testing:</strong> Use appropriate test probes or clips for stable
              readings. Maintain safe hand positions behind finger barriers. Allow readings to
              stabilise before recording. Reset to safe mode when switching functions.
            </p>
            <p>
              <strong>Key MFT Safety Points for AM2:</strong> Always check function selector before
              connecting to circuit. Use appropriate test voltage for the circuit being tested.
              Never force connections — use appropriate test accessories. Switch back to voltage
              mode when test complete. Explain your actions to the assessor as you work.
            </p>
          </ConceptBlock>

          <div className="my-6">
            <VideoCard
              url={videos.insulationResistanceAmd2.url}
              title={videos.insulationResistanceAmd2.title}
              channel={videos.insulationResistanceAmd2.channel}
              duration={videos.insulationResistanceAmd2.duration}
              topic="Insulation resistance test on AM2 day · A4:2026"
              caption={
                <>
                  Craig Wiltshire walks the IR test under the latest amendment — 500 V DC for the
                  standard 230 V circuit, 250 V DC where electronics are connected (Reg 643.3), 1 MΩ
                  minimum. Watch the conductor combinations he tests: L-N, L-E, N-E.
                </>
              }
            />
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3.3"
            clause="Where connected equipment is likely to influence the measurement or result of the test, or be damaged, the test shall be applied prior to the connection of such equipment, in accordance with Table 64. Following connection of the equipment, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement. The insulation resistance shall have a value of at least 1 MΩ."
            meaning={
              <>
                A4:2026 redrafted this. Two-stage method: <strong>500 V DC</strong> with electronics
                disconnected (per Table 64), then <strong>250 V DC</strong> live-to-CPC with
                everything reconnected — minimum 1 MΩ at the lower voltage. That's how you cover
                circuits where SPDs / RCBOs / electronic dimmers can't be cleanly removed without
                tearing the rig apart. Document both readings on the schedule.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 643.3.3 / Table 64"
          />

          <SectionRule />

          <ConceptBlock
            title="4. Voltage Indicators & Proving Units — NET AM2 Standards"
            plainEnglish="The two-pole voltage indicator + proving unit pair is the standard combination on AM2. Approved indicator with GS38 probes, dedicated proving unit with a clear output indication — and the proving sequence stays exactly the same every time."
          >
            <p>
              <strong>Approved Voltage Indicators — Two-Pole Voltage Indicators:</strong> Most
              common in NET AM2 centres. LED or LCD display. GS38 compliant probes essential.
              Battery or capacitive operation.
            </p>
            <p>
              <strong>Approved Voltage Indicators — Approved Socket Testers:</strong> 13A socket
              testing units. RCD test functionality. Polarity and earth testing. Must meet GS38
              standards.
            </p>
            <p>
              <strong>Standard Proving Units:</strong> Usually 230V AC output. Self-contained
              battery operation. Clear indication of output status. Regular functionality checks
              required.
            </p>
            <p>
              <strong>Alternative Proving Sources:</strong> Known live socket outlets. Designated
              test points. Distribution board indicators. Must be reliable and safe.
            </p>
            <p>
              <strong>Detailed Proving Procedure for AM2 — Step 1: Initial Prove.</strong> Check
              proving unit is functional. Insert voltage indicator probes. Verify clear positive
              indication. Note voltage reading if displayed. Demonstrate to assessor.
            </p>
            <p>
              <strong>Step 2: Circuit Testing.</strong> Test L-N at point of work. Test L-E at point
              of work. Test N-E at point of work. Ensure no voltage indication. Verify circuit is
              dead.
            </p>
            <p>
              <strong>Step 3: Re-prove.</strong> Return to proving unit. Re-test voltage indicator.
              Verify positive indication again. Confirm tester still functional. Complete procedure
              record.
            </p>
            <p>
              <strong>NET AM2 Critical: Missing any step = Automatic Failure.</strong> Assessors
              will specifically watch for the complete sequence. Shortcuts or assumptions about
              equipment functionality are not acceptable.
            </p>
            <p>
              <strong>Common Proving Errors — Equipment Issues:</strong> Using non-GS38 compliant
              indicators. Assuming proving unit is working. Not checking battery levels. Using
              damaged proving units.
            </p>
            <p>
              <strong>Common Proving Errors — Procedure Failures:</strong> Skipping initial or final
              prove. Not testing all conductor combinations. Rushing through the sequence. Failing
              to demonstrate to assessor.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="my-6">
            <VideoCard
              url={videos.zeTest.url}
              title={videos.zeTest.title}
              channel={videos.zeTest.channel}
              duration={videos.zeTest.duration}
              topic="Ze (external earth fault loop) test on AM2"
              caption={
                <>
                  Craig Wiltshire shows the Ze test on a single-phase supply at the origin —
                  disconnect the main earth, test L to incoming earth. Your measured Ze feeds the
                  PFC calculation below (PFC = U0 / Ze) — the next thing the assessor expects you to
                  record on the EIC.
                </>
              }
            />
          </div>

          <div className="my-6">
            <h3 className="text-ios-headline font-semibold text-elec-yellow mb-3">
              Try the calculator — PFC / PSCC from Ze (V = IR)
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3">
              Most multifunction testers display PFC alongside Ze. Check the maths with Ohm's Law:
              PFC = U0 / Ze. Worked: U0 = 230 V, Ze = 0.35 Ω (typical TN-C-S declared) → PFC ≈ 657 A
              at the origin. Enter your measured Ze as resistance R and U0 = 230 V to read the
              prospective fault current. Compare against every protective device's Icn / Ics rating.
            </p>
            <OhmsCalculator />
          </div>

          <CommonMistake
            title="5. Unsafe Practices That Cause Instant Fails"
            whatHappens={
              <>
                <strong>Equipment-Related Fails:</strong> Using damaged or taped-up leads. Using
                probes with long exposed metal tips. Non-GS38 compliant equipment. Uncalibrated or
                suspect instruments. <strong>Procedure-Related Fails:</strong> Failing to
                prove/re-prove the tester. Holding probes dangerously (fingers over barriers).
                Applying incorrect voltage or current range. Working one-handed while holding
                instruments incorrectly.
              </>
            }
            doInstead={
              <>
                Any unsafe practice with test equipment will result in immediate assessment
                termination and failure. Inspect kit, demonstrate the proving sequence, and use
                CAT-rated instruments with shrouded probes every time.
              </>
            }
          />

          <ConceptBlock
            title="What the Assessor is Looking For"
            plainEnglish="Equipment compliance + safe working + professional competence + assessment excellence — those four boxes need ticking."
          >
            <p>
              <strong>Equipment Compliance:</strong> GS38-compliant leads/probes in use. Proper
              inspection of equipment before use. Appropriate CAT-rated instruments. No damaged or
              makeshift equipment.
            </p>
            <p>
              <strong>Safe Working Practices:</strong> Correct proving sequence demonstrated. Safe
              hand positions maintained. Methodical approach to testing. Awareness of electrical
              hazards.
            </p>
            <p>
              <strong>Professional Competence:</strong> Confident handling of instruments. Clear
              explanation of procedures. Realistic and logical results. Proper documentation of
              readings.
            </p>
            <p>
              <strong>Assessment Excellence:</strong> Following GN3 procedures exactly.
              Demonstrating rather than describing. Managing time effectively. Maintaining
              professionalism throughout.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="6. Practical Guidance for AM2 Success"
            plainEnglish="Inspect kit first, prove on a known source, hold probes safely, reset to safe mode, store leads tidily — habits that turn into easy marks."
          >
            <p>
              <strong>Before You Start:</strong> Inspect your kit first. Check leads, fuses, and
              probe tips. Verify calibration dates. Plan your testing sequence.
            </p>
            <p>
              <strong>During Testing:</strong> Always use proving unit or known live source. Hold
              probes safely behind finger barriers. Explain procedures as you work. Allow readings
              to stabilise.
            </p>
            <p>
              <strong>After Testing:</strong> Reset to safe mode (voltage). Switch tester off
              safely. Store leads properly. Record all results accurately.
            </p>
            <p>
              <strong>Key Success Tips:</strong> Practice test routines — make proving tester and
              lead checks a habit. Never rush — methodical and safe is better than fast. If readings
              seem wrong, re-check settings and prove the tester. Communicate with the assessor —
              explain what you're doing and why.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Real-World Examples"
            plainEnglish="Three failures and one success that show exactly what assessors are watching for."
          >
            <p>
              <strong>Example 1: Non-GS38 Leads.</strong> Candidate used non-GS38 leads with 20 mm
              exposed metal. Assessor stopped the test immediately. Automatic Fail. Lesson: Always
              check probe tip exposure before starting. Only 2-4mm is acceptable.
            </p>
            <p>
              <strong>Example 2: Forgot Re-proving.</strong> Candidate forgot to re-prove tester
              after safe isolation sequence. Automatic Fail. Lesson: The proving sequence is Prove —
              Test — Re-prove. All three steps are mandatory.
            </p>
            <p>
              <strong>Example 3: Proper Procedure.</strong> Candidate zeroed continuity leads before
              testing and explained procedure to assessor. Full Marks. Lesson: Demonstrating
              knowledge through proper procedure and clear communication earns top marks.
            </p>
            <p>
              <strong>Example 4: Real-Life Consequence.</strong> In real life, an electrician used a
              damaged probe, which arced and caused serious burns. Same unsafe practice in AM2 =
              fail. Lesson: GS38 requirements exist to prevent real injuries. Assessors treat safety
              breaches very seriously.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section Summary — Key Takeaways"
            plainEnglish="Five things to walk away with from this section."
          >
            <p>
              Safe use of test instruments is non-negotiable in AM2 — GS38 compliance protects
              lives.
            </p>
            <p>Probes must have shrouded tips (2-4 mm exposed), fused leads, and no damage.</p>
            <p>
              Proving sequence is mandatory: Prove — Test — Re-prove (skipping any step = fail).
            </p>
            <p>Assessors observe safe, confident, GS38-compliant use of instruments.</p>
            <p>Any unsafe practice with test equipment results in instant assessment failure.</p>
            <p>
              <strong>Next Steps:</strong> You're now ready to move on to Module 4 Section 3, where
              we'll cover the specific testing procedures and measurement techniques required for
              AM2 assessment success.
            </p>
          </ConceptBlock>

          <Scenario
            title="Mid-test, the proving unit's LED won't light"
            situation={
              <>
                You've isolated, locked off, proved on the unit (worked), tested L-N / L-E / N-E at
                the point of work — all dead, good. You return to re-prove and the proving unit's
                LED won't light. Battery indicator is fine on the voltage indicator. Five minutes
                left in this test block.
              </>
            }
            whatToDo={
              <>
                Don't skip the re-prove and don't crack on. Tell the assessor what you've found. Try
                a known live source instead — a working socket-outlet on a different circuit, or a
                designated test point at the rig's distribution board. If the indicator shows
                voltage there, it has stayed functional and your "dead" reading at the point of work
                stands. If it doesn't, you've just discovered the indicator failed during the test —
                re-isolate, swap to a backup tester, and run the whole proving sequence again.
              </>
            }
            whyItMatters={
              <>
                The re-prove step exists for exactly this scenario. A tester that goes faulty
                between Step 4 and Step 6 would have given you a false "dead" reading at the point
                of work. Skipping the re-prove because the proving unit looks broken means you
                cannot rule out a tester failure — and you'd be cracking on into a circuit you
                haven't actually proved dead.
              </>
            }
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'What is GS38 actually — is it law, or guidance?',
                answer:
                  "It's HSE guidance, not statute. But HSE Guidance Note GS38 ('Electrical test equipment for use on low-voltage electrical systems') sits underneath the Electricity at Work Regulations 1989 — and EAWR is law. Failing to use GS38-compliant gear is treated as failing to meet EAWR Reg 4 (working dead) and Reg 16 (technical knowledge / supervision). Assessors apply it as a hard rule on AM2 day because that's how the industry treats it.",
              },
              {
                question: 'Why 2-4 mm of exposed metal? Where does that figure come from?',
                answer:
                  "GS38 paragraph 7. Long enough to make a reliable contact on a busbar or terminal screw, short enough that you can't bridge two adjacent live parts with one probe. 2 mm is the lower limit (won't bite through tarnish), 4 mm is the upper limit (any more and you risk shorting line-to-line at a meter cabinet). Some new probes have spring-loaded shrouds that retract on press — they meet the spirit of the reg even though more metal is briefly exposed during use.",
              },
              {
                question:
                  'Can I use a multimeter for proving dead, or does it have to be a dedicated voltage indicator?',
                answer:
                  "GS38 strongly favours a dedicated two-pole voltage indicator (BS EN 61243-3). A multimeter on V-AC has more failure modes — wrong range, internal fuse blown, leads in the wrong sockets all give a false zero. Voltage indicators are designed so the indication only goes off if voltage is genuinely absent, not because the user's set the wrong dial. NET centres expect a dedicated indicator on AM2 day.",
              },
              {
                question: 'Is CAT III enough for AM2, or do I need CAT IV?',
                answer:
                  "CAT III is fine for the AM2 testing rig — the rig simulates a domestic / small commercial installation, downstream of the meter and distributor's cut-out. CAT IV is for the supply origin / metering side / distribution boards directly fed from the supply. On AM2 day, anything CAT III at 600 V or 1000 V covers what you'll meet. Check the markings on the meter and the leads — both have to be at least CAT III rated.",
              },
              {
                question:
                  'The MFT auto-runs a ½×IΔn no-trip check before the 1×IΔn test — do I record that?',
                answer:
                  "No. The ½×IΔn auto-check is a pre-test confirmation that the RCD won't nuisance trip — it's a function of the meter, not part of the verification routine in Reg 643.8. A4:2026's RCD verification is the single AC test at 1×IΔn plus the manual button. Record the trip time at 1×IΔn (in ms) and the manual button operation. The pre-test ½× isn't a row on the schedule.",
              },
              {
                question:
                  'What if my leads have a small nick in the insulation but still work fine?',
                answer:
                  "Bin them. GS38 doesn't allow taped or 'still working' leads — and AM2 is the worst place to find out it's not fine. Exposed copper at the tail end of a lead can flash to earth, to your hand, or to an adjacent terminal. Spare leads are cheap; the assessor seeing damaged leads is an instant fail. Inspect every lead and fuse before the test starts as part of your kit check.",
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'GS38 is the bar — shrouded probes (2-4 mm exposed), fused leads, finger barriers, no taped repairs, CAT III minimum.',
              'Six-step safe isolation: Identify → Isolate → Secure → Prove → Test → Re-prove. Skip any step = automatic fail.',
              'Two-pole voltage indicator + dedicated proving unit is the AM2 standard. Not a multimeter on V-AC.',
              'MFT discipline: confirm the function selector BEFORE connecting, reset to voltage mode AFTER each test.',
              'Re-prove on a known live source after the dead test — that step catches a tester that died during the job.',
              'Continuity-before-loop is mandated by Reg 643.7.3.1 — never reach for the Zs button until R1+R2 is clean.',
            ]}
          />

          <Quiz questions={quizQuestions} title="GS38 Compliance and Test Instrument Safety" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Test Sequence
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Testing Procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module4Section2;
