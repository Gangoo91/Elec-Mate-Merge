/**
 * Module 4 · Section 4 — Functional and operational testing
 * AM2 day-prep — AM2 Phase C (inspection, testing, certification)
 * Live tests done safely: switches, sockets, RCDs and protective devices proven to operate.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Functional and Operational Testing | AM2 Module 4.4 | Elec-Mate';
const DESCRIPTION =
  'Live AM2 functional testing — switches, sockets, RCDs and protective devices proven to operate within limits.';

const AM2Module4Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Perform functional testing of lighting, power, and motor circuits',
    'Carry out RCD testing and confirm trip times within specified limits',
    'Check polarity and operation of switches, sockets, and protective devices',
    'Demonstrate functional testing confidently to an assessor',
    'Record functional results correctly on certification',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'functional-vs-insulation',
      question: "What's the difference between insulation resistance and functional testing?",
      options: [
        'Insulation resistance checks safety of wiring; functional testing checks operation of equipment and circuits',
        'Insulation resistance checks operation of switches; functional testing checks cable insulation values',
        'They are two names for exactly the same test carried out at different voltages',
        'Insulation resistance is a live test; functional testing is always carried out dead',
      ],
      correctIndex: 0,
      explanation:
        'Insulation resistance tests the safety and integrity of cable insulation, while functional testing confirms that circuits and equipment operate correctly as designed.',
    },
    {
      id: 'rcd-failure',
      question: "What's the required action if an RCD fails to trip within the permitted time?",
      options: [
        'Re-test until it eventually passes, then record the best result',
        'Record non-compliance and fail the RCD test',
        'Ignore it provided the manual test button still operates',
        'Halve the rated residual current and record the new trip time',
      ],
      correctIndex: 1,
      explanation:
        'If an RCD fails to trip within BS 7671 specified times, it must be recorded as non-compliant and the test marked as a failure. The RCD requires investigation or replacement.',
    },
    {
      id: 'testing-completeness',
      question: 'Why is it important to test every lighting switch combination?',
      options: [
        'To confirm your voltage tester is working correctly',
        'To check the insulation resistance of each switch drop',
        'To ensure all switching functions operate correctly as designed',
        'To measure the earth fault loop impedance at each switch',
      ],
      correctIndex: 2,
      explanation:
        'Every switching combination must be tested to confirm correct wiring and operation. Missing any combination could hide wiring errors that compromise safety or functionality.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between insulation resistance and functional testing?",
      options: [
        'Functional testing measures cable insulation; insulation resistance proves switch operation',
        'Insulation resistance checks safety of wiring; functional testing checks operation of equipment',
        'Both confirm the same thing, so only one needs to be carried out on each circuit',
        'Insulation resistance is recorded in milliseconds; functional testing is recorded in ohms',
      ],
      correctAnswer: 1,
      explanation:
        'Insulation resistance tests electrical safety of cable insulation, while functional testing verifies that circuits and equipment operate correctly as designed.',
    },
    {
      id: 2,
      question: 'What must be tested on every lighting circuit?',
      options: [
        'Only the first switch on each circuit, to save time',
        'Only the lamps that are visible from the consumer unit',
        'Every switching combination and lamp operation',
        'Only the two-way switches, as one-way switches cannot be miswired',
      ],
      correctAnswer: 2,
      explanation:
        'All switches (one-way, two-way, intermediate) and their combinations must be tested to confirm correct operation and lamp control.',
    },
    {
      id: 3,
      question: 'Which device is tested at 1×IΔn under A4:2026?',
      options: [
        'Isolator',
        'MCB',
        'Fuse',
        'RCD/RCBO',
      ],
      correctAnswer: 3,
      explanation:
        'A4:2026 deleted the 5×IΔn test — RCDs and RCBOs are now verified by a single AC test at 1×IΔn.',
    },
    {
      id: 4,
      question: 'What unit are RCD trip times recorded in?',
      options: [
        'Milliseconds (ms)',
        'Seconds (s)',
        'Minutes (min)',
        'Microseconds (us)',
      ],
      correctAnswer: 0,
      explanation:
        'RCD trip times are measured and recorded in milliseconds (ms) as per BS 7671 requirements.',
    },
    {
      id: 5,
      question: 'What happens if an RCD fails to trip within limits?',
      options: [
        'It still passes provided the trip time is within twice the limit',
        'Record non-compliance and fail the test',
        'It is acceptable as long as the manual test button works',
        'Record it as satisfactory but note it for the next inspection',
      ],
      correctAnswer: 1,
      explanation:
        'If an RCD fails to trip within the required time limits, it must be recorded as non-compliant and the test marked as failed.',
    },
    {
      id: 6,
      question: 'Which statement about functional testing is correct?',
      options: [
        'It can be skipped if all the dead and live electrical tests have passed',
        'It only needs to be carried out on socket circuits, not lighting circuits',
        'It can be replaced by a second insulation resistance test',
        'It is mandatory and proves correct operation that electrical tests cannot confirm',
      ],
      correctAnswer: 3,
      explanation:
        'Functional testing is mandatory and cannot be skipped. It proves that circuits operate correctly, which electrical tests alone cannot confirm.',
    },
    {
      id: 7,
      question: 'Why must you test every lighting switch combination?',
      options: [
        'To confirm the insulation resistance of each lighting point',
        'To measure the prospective fault current at every switch',
        'To check the polarity of the neutral conductor at the lamp',
        'To ensure all switching functions operate correctly as designed',
      ],
      correctAnswer: 3,
      explanation:
        'Testing every switch combination ensures correct wiring and operation of all lighting control functions as per the design.',
    },
    {
      id: 8,
      question: 'What test tool can be used to check socket polarity?',
      options: [
        'Polarity tester or plug-in socket tester',
        'Earth fault loop impedance tester only',
        'Insulation resistance tester set to 500 V',
        'Clamp meter set to measure load current',
      ],
      correctAnswer: 0,
      explanation:
        'Polarity testers or plug-in socket testers can quickly verify correct polarity and supply presence at socket outlets.',
    },
    {
      id: 9,
      question: 'What function must you confirm in motor circuits?',
      options: [
        'Only that the motor draws its rated current at full load',
        'Only that the supply voltage is present at the starter',
        'Start and stop controls, and overload reset operation',
        'Only the insulation resistance of the motor windings',
      ],
      correctAnswer: 2,
      explanation:
        'Motor circuits require testing of start/stop controls, overload protection operation, and correct reset functionality for safety.',
    },
    {
      id: 10,
      question: "What's the final step after functional testing?",
      options: [
        'Remove all the protective devices for inspection',
        'Disconnect the main earthing conductor for a final check',
        'Leave installation in a safe state',
        'Re-run the dead tests with the supply energised',
      ],
      correctAnswer: 2,
      explanation:
        'After functional testing, the installation must be left in a safe state with all systems operating normally and safely.',
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
            eyebrow="Module 4 · Section 4"
            title="Functional and Operational Testing"
            description="After insulation resistance, continuity, Zs, and RCD tests, you must carry out functional and operational testing to confirm that the installation performs as intended."
            tone="yellow"
          />

          <TLDR
            points={[
              'Functional testing proves the install actually works — switches control the right loads, RCDs trip, motors start and stop, sockets are live with correct polarity.',
              'RCD verification under A4:2026: single AC test at 1×IΔn + manual button. The 5×IΔn test was deleted from Appendix 3 / Table 3A.',
              'Trip times at 1×IΔn (A4:2026): ≤ 300 ms general non-delay; delay "S" type 130–500 ms. There is no separate 40 ms additional-protection limit — A4:2026 deleted Table 3A and the 5×IΔn/40 ms test. Reg 415.1.1 simply recognises 30 mA RCDs as additional protection; it states no trip-time figure.',
              'Reg 411.3.3 (RCD on socket-outlets ≤ 32 A) and Reg 411.3.4 (RCD on luminaires in dwellings) — both mean every relevant circuit gets the trip test.',
              'Every switching combination — one-way, two-way, intermediate. Skipping a combination hides a wiring error.',
            ]}
          />

          <CommonMistake
            title="Functional Testing is Mandatory"
            whatHappens={
              <>
                Assessors want to see you approach this like you would on-site: check, operate, and
                confirm every circuit behaves as designed. Skipping or rushing these checks is a
                common reason candidates lose marks.
              </>
            }
            doInstead={
              <>
                Functional testing cannot be skipped even if all electrical tests pass. It proves
                real-world operation and safety — operate every switch, prove every socket, run
                every RCD trip test.
              </>
            }
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ContentEyebrow>What is Functional Testing?</ContentEyebrow>

          <ConceptBlock
            title="1. What is Functional Testing?"
            plainEnglish="Functional testing confirms the installation operates as intended. It goes beyond electrical tests — checks real-world usability and operational safety."
            onSite="Key Principle: Proving that circuits and equipment actually work correctly in practice, not just that they pass electrical measurements."
          >
            <p>
              <strong>Functional Testing Covers:</strong> Correct operation of switches and
              accessories. RCD/RCBO operation and trip times. Protective devices operating
              correctly. Functional operation of motors or specialist equipment. Polarity
              verification at outlets.
            </p>
            <p>
              <strong>Why It's Essential:</strong> Confirms installation works as designed.
              Identifies wiring errors not found in electrical tests. Proves safety systems operate
              correctly. Demonstrates professional competence to assessor. Required for
              certification completion.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3 (RCD verification redrafted at A4:2026)"
            clause="The requirements for RCD testing have been changed and Table 3A (Time/current performance criteria for RCDs) in Appendix 3 has been deleted. Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness."
            meaning={
              <>
                This is the big one for AM2 functional testing. A4:2026 deleted Table 3A and the
                whole 5×IΔn row that went with it. <strong>One AC test at 1×IΔn</strong> plus the
                manual button is the entire RCD verification routine — regardless of Type AC, A or
                B. Whatever your MFT auto-runs at ½×IΔn pre-test isn't part of what you record.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 643.3 / Reg 643.8 / Appendix 3"
          />

          <div className="my-6">
            <VideoCard
              url={videos.circuitBreakersDontProtectPeople.url}
              title={videos.circuitBreakersDontProtectPeople.title}
              channel={videos.circuitBreakersDontProtectPeople.channel}
              duration={videos.circuitBreakersDontProtectPeople.duration}
              topic="Why we test RCDs at 1×IΔn on AM2 day"
              caption={
                <>
                  The Engineering Mindset on why an MCB cannot protect a person — and why the RCD
                  must trip within the BS 7671 limits when you push 1×IΔn on AM2 day. The principle
                  behind the trip-time test, before you reach for the meter.
                </>
              }
            />
          </div>

          <ConceptBlock
            title="2. Key Functional Tests in AM2"
            plainEnglish="Lighting + power + motors + RCDs — the four buckets of functional testing on the day, each with its own tick-list."
          >
            <p>
              <strong>Lighting Circuits:</strong> Operate switches (one-way, two-way, intermediate).
              Confirm correct lamps switch on/off. Test all switching combinations. Verify no
              cross-switching errors.
            </p>
            <p>
              <strong>Power Circuits:</strong> Test socket outlets (correct polarity, supply
              present). Ring/radial continuity verified, now prove operational. Cooker circuit:
              confirm supply at control unit. Switched spurs: test switching function.
            </p>
            <p>
              <strong>Motor Circuits:</strong> Confirm DOL starter operation. Test stop/start
              controls. Verify overload protection resets. Check emergency stop functions.
            </p>
            <p>
              <strong>RCD/RCBO Testing:</strong> Trip test at 1×IΔn (A4:2026 deleted the 5×IΔn test
              — single AC test only). Must trip within limits (ms). Manual test button operation.
              Reset function verification.
            </p>
            <p>
              <strong>Detailed RCD Testing Requirements — Standard RCD (30mA):</strong> 1×IΔn test
              (30mA): Should trip but may take up to 300ms (general-purpose). Manual test: Must
              operate and cut supply. A4:2026 — 5×IΔn test deleted from the verification routine.
            </p>
            <p>
              <strong>Recording Requirements:</strong> Record actual trip times in milliseconds.
              Note if RCD fails to trip within limits. Include manual test button operation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.3.3"
            clause="Regulation 411.3.3 has been revised and now applies to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary."
            meaning={
              <>
                A4:2026 raised the socket-outlet RCD threshold from 20 A to <strong>32 A</strong>.
                Every socket-outlet ≤ 32 A on the AM2 rig needs RCD additional protection (≤ 30 mA).
                The risk-assessment exception only applies in non-dwellings — you can't risk-assess
                your way out of an RCD on a domestic socket. Functional test the trip on every one
                of those circuits.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 411.3.3"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.3.4"
            clause="Regulation 411.3.4 requires that, within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning={
              <>
                New at A4:2026 — every lighting circuit in a dwelling now needs 30 mA RCD additional
                protection. On the AM2 rig that means the lighting circuit gets the same 1×IΔn trip
                test as the socket circuits, recorded in ms on the schedule. Don't fall into the old
                pre-A4 habit of skipping lighting because "it's only luminaires".
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 411.3.4"
          />

          <CommonMistake
            title="3. Common Candidate Errors (NET Guidance)"
            whatHappens={
              <>
                <strong>Testing Omissions:</strong> Not testing all lighting switching combinations.
                Forgetting to function-test sockets after electrical tests. Not carrying out 1×IΔn
                RCD test on every RCD-protected circuit. Failing to test motor start/stop controls.
                <strong> Recording and Procedure Errors:</strong> Recording RCD trip times
                incorrectly or in wrong units. Rushing through tests without systematic approach.
                Not explaining procedures to assessor. Leaving installation in unsafe state after
                testing.
              </>
            }
            doInstead={
              <>
                Work through each circuit type with a systematic tick-list. Operate every switch
                combination. Run the 1×IΔn trip test on every RCD. Record trip times in milliseconds
                as you go and verbalise each step to the assessor.
              </>
            }
          />

          <CommonMistake
            title="Pushing the 5× button because muscle memory says you should"
            whatHappens={
              <>
                You ran the 1×IΔn trip test, got 28 ms — fine. Then habit kicks in and you reach for
                the 5× button to "double-check". You log a 12 ms result at 5×IΔn. Assessor pulls you
                up: A4:2026 deleted Table 3A from Appendix 3 and the 5×IΔn AC verification went with
                it. You've cited a deleted test on a brand-new EIC.
              </>
            }
            doInstead={
              <>
                One AC test at 1×IΔn, record the trip time in ms, press the manual button to confirm
                operation. Done. If your MFT auto-runs a ½×IΔn pre-check (RCD must NOT trip), that's
                a meter feature, not a separate row on the schedule. Some old training materials
                still reference 5× — they're out of date.
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

          <SectionRule />

          <ConceptBlock
            title="4. Assessor Expectations"
            plainEnglish="Methodical operation, clear commentary, correct instruments and accurate recording — that's the bar."
          >
            <p>
              <strong>Professional Approach:</strong> Operate switches and devices methodically, not
              randomly. Talk through what you are testing and why. Use correct instruments for
              RCD/functional testing. Demonstrate understanding of each test purpose.
            </p>
            <p>
              <strong>Technical Requirements:</strong> Record results in correct units (ms for
              RCDs). Leave installation in a safe state after functional tests. Complete all
              required test combinations. Verify results against BS 7671 requirements.
            </p>
            <p>
              <strong>What Assessors Specifically Look For — Systematic Testing:</strong> Logical
              sequence of testing. Complete coverage of all circuits. Proper use of test equipment.
            </p>
            <p>
              <strong>Professional Communication:</strong> Clear explanation of each test.
              Identification of any issues found. Demonstration of problem-solving skills.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="5. Comprehensive Practical Guidance"
            plainEnglish="Per-circuit-type checklists for lighting, sockets, RCDs and motors — plus the time-management habits that keep the day on track."
          >
            <p>
              <strong>Lighting Circuit Testing:</strong> Always test every switching combination —
              don't assume. Check one-way, two-way, and intermediate switches. Verify correct lamp
              control from all switch positions.
            </p>
            <p>
              <strong>Socket Testing:</strong> Use polarity tester or plug-in tester. Confirm supply
              present and correct polarity. Test all sockets on ring/radial circuits.
            </p>
            <p>
              <strong>RCD Testing Procedure:</strong> Test at 1×IΔn with appropriate RCD tester
              (A4:2026: 5×IΔn test deleted). Press manual test button operation. Record trip times
              accurately in milliseconds.
            </p>
            <p>
              <strong>Motor Circuit Testing:</strong> Check start and stop controls operate
              correctly. Confirm overloads reset correctly. Verify emergency stop functions.
            </p>
            <p>
              <strong>Efficient Testing:</strong> Work steadily — rushing causes missed checks.
              Follow a systematic sequence for each circuit type. Record results immediately — don't
              rely on memory.
            </p>
            <p>
              <strong>Professional Approach:</strong> Explain each test to the assessor as you
              proceed. Handle all equipment with confidence and care. Leave installation safe and
              operational.
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
            plainEnglish="Two failures and one success that show what assessors mark down."
          >
            <p>
              <strong>Example 1: Incomplete Switch Testing.</strong> Candidate did full electrical
              tests but didn't test two-way switching. Assessor flagged incomplete — lost marks.
              Lesson: Every switching combination must be tested. Missing any combination could hide
              wiring errors.
            </p>
            <p>
              <strong>Example 2: Incomplete RCD Testing.</strong> Candidate did the 1×IΔn trip test
              but missed the manual test button on a circuit's RCBO. Incomplete — lost marks.
              Lesson: The full 1×IΔn + manual test sequence is mandatory under A4:2026. Missing a
              step = incomplete certification.
            </p>
            <p>
              <strong>Example 3: Professional Excellence.</strong> Candidate tested all lighting
              switching combinations, RCDs, sockets, and motor circuit methodically. Full marks.
              Lesson: Systematic, complete testing with clear communication demonstrates
              professional competence.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Advanced Functional Testing Techniques"
            plainEnglish="Troubleshooting failed tests + professional documentation = the difference between a competent candidate and an exceptional one."
          >
            <p>
              <strong>Troubleshooting Failed Tests:</strong> RCD fails to trip — check test
              equipment, verify connections. Switch doesn't control lamp — verify switching wiring.
              Motor won't start — check control circuit, overloads. Socket tester shows fault —
              investigate wiring errors.
            </p>
            <p>
              <strong>Professional Documentation:</strong> Record actual test results, not expected
              values. Note any deviations or failures clearly. Include environmental conditions if
              relevant. Sign and date all functional test records.
            </p>
            <p>
              <strong>Industry Best Practices:</strong> Professional electricians use functional
              testing to verify that installations will operate safely and reliably in service. This
              testing phase often reveals issues that purely electrical tests miss, making it
              essential for both AM2 success and real-world competence.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section Summary — Key Takeaways"
            plainEnglish="Five things to walk away with from this section."
          >
            <p>
              Functional and operational testing proves that circuits and devices actually work.
            </p>
            <p>
              Test all switching combinations, RCDs at 1×IΔn (A4:2026: 5×IΔn deleted), and motor
              controls.
            </p>
            <p>Record results accurately in correct units (ms for RCD trip times).</p>
            <p>Leave installation in safe operational state after testing.</p>
            <p>Skipping functional tests is an easy way to lose marks.</p>
            <p>
              <strong>Next Steps:</strong> You have now completed essential testing procedures. The
              next section will cover identifying and reporting non-compliances.
            </p>
          </ConceptBlock>

          <Scenario
            title="Two-way landing light only works from one switch"
            situation={
              <>
                AM2 rig two-way lighting circuit. You've passed continuity, IR, polarity, RCD trip.
                You operate the downstairs switch — light comes on. Operate the upstairs switch —
                nothing. Both switches operated again from upstairs first — same. The light works
                from one switch but not the other.
              </>
            }
            whatToDo={
              <>
                Don't sign it off as functional. Re-isolate, lift the switch fronts and check the
                strappers — the most common cause is a strapper landed on the common terminal
                instead of L1, or both strappers swapped between the two switches. Re-energise, test
                every combination: down/up, up/down, both up, both down. All four states must light
                or extinguish the lamp correctly. Record the fix on the EIC alterations / commentary
                section, re-test, sign off only when every combination works.
              </>
            }
            whyItMatters={
              <>
                A two-way wired wrong is a classic NET test rig fault. Assessors plant it because
                they want to see whether you're functional-testing every combination, or just
                clicking the first switch and assuming the rest. Spot it, fix it, document it = full
                marks. Sign it off as working from one switch = fail.
              </>
            }
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question:
                  'A4:2026 deleted the 5×IΔn test — but my MFT still has the button. Should I push it?',
                answer:
                  "No. The button still exists on most MFTs because the meters are sold internationally and earlier amendments allowed it. Under BS 7671:2018+A4:2026 Reg 643.3 and Reg 643.8, RCD verification is the single AC test at 1×IΔn plus the manual button. That's all you record. Pushing 5× isn't dangerous, but the result has no place on the schedule and citing it on AM2 marks you down for using a deleted test.",
              },
              {
                question: 'What about the 40 ms figure — does it still apply under A4:2026?',
                answer:
                  'No. 40 ms was the maximum trip time for the old 5×IΔn test in the deleted Appendix 3 Table 3A — it was never a 1×IΔn figure. A4:2026 deleted Table 3A and the 5×IΔn test entirely. Under BS 7671:2018+A4:2026 (Reg 643.8 NOTE) RCD effectiveness is verified by a single AC test at the rated residual operating current (1×IΔn): a general non-delay RCD must disconnect within 300 ms maximum, and a delay "S" type between 130 ms and 500 ms. Reg 415.1.1 only recognises 30 mA RCDs as additional protection; it states no trip-time figure. You will commonly measure ~25–40 ms in the real world, but that is typical performance, not the regulatory limit — record the actual measured trip time and compare it to 300 ms.',
              },
              {
                question: 'Reg 411.5.3 — Ra × IΔn ≤ 50 V. Where does that apply?',
                answer:
                  "TT systems (Reg 411.5.3): the earth electrode resistance Ra × the rated residual operating current of the RCD must not exceed 50 V. For a 30 mA RCD: Ra × 0.03 ≤ 50, so Ra ≤ 1666 Ω. In practice you aim much lower (typically ≤ 200 Ω) because soil conditions vary. AM2 rigs are usually TN-C-S so this rarely applies — but if your rig's TT, this is the figure on the EIC's earthing arrangements section.",
              },
              {
                question: 'Do I have to test every socket on a ring final, or just one?',
                answer:
                  'Every accessible socket gets a polarity check and a supply-present check (use a plug-in tester or socket tester). The continuity and Zs tests already verified the conductors as a whole, but functional testing is per-accessory. If a socket has its polarity reversed at the terminations, the ring tests pass but the socket is unsafe — only a per-socket polarity check catches it.',
              },
              {
                question: 'Reg 421.1.7 — AFDDs. Are they required on AM2?',
                answer:
                  "A4:2026 Reg 421.1.7 *recommends* AFDDs (arc fault detection devices) — it doesn't mandate them on most circuits. If the AM2 rig has AFDDs fitted you'll functional-test them with the manual button (same as RCDs), and the IR test needs the two-stage method (Reg 643.3.3) because the AFDD electronics will skew a single-shot 500 V test. The wording is 'recommending' — so the EIC notes the recommendation, not a non-compliance if absent.",
              },
              {
                question: "What's the phase sequence test for, and when does it apply?",
                answer:
                  "Three-phase only. You verify L1 → L2 → L3 rotation is the same throughout the install (Reg 643.9), so a motor connected via a socket spins the right way. Most AM2 rigs are single-phase domestic so this won't apply. If yours is three-phase, use a phase rotation meter at the origin and at any three-phase outlet and confirm the sequence matches.",
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Functional testing is mandatory — electrical tests prove safety, functional tests prove the install works.',
              'A4:2026 RCD verification: single AC test at 1×IΔn + manual button. NO 5×IΔn (deleted from Appendix 3).',
              'Trip time limits at 1×IΔn — 300 ms general non-delay / 130–500 ms delay "S" type. No separate 40 ms additional-protection limit (A4:2026 deleted Table 3A and the 5×IΔn/40 ms test); Reg 415.1.1 states no trip-time figure.',
              'Reg 411.3.3 — RCD on every socket-outlet ≤ 32 A. Reg 411.3.4 — RCD on every dwelling lighting circuit. Both get the 1×IΔn trip test.',
              'Test every switching combination — one-way, two-way, intermediate. Skipping any combination hides a wiring error.',
              'Per-socket polarity check on every outlet — ring continuity does not catch a reversed socket.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Functional and Operational Testing" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Recording Test Results
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Non-Compliances
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module4Section4;
