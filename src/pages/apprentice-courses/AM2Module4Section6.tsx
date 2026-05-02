/**
 * Module 4 · Section 6 — Time management during testing
 * AM2 day-prep — AM2 Phase C (inspection, testing, certification)
 * Working safely and accurately under the clock — no rushed readings, no blank certificates.
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

const TITLE = 'Time Management During Testing | AM2 Module 4.6 | Elec-Mate';
const DESCRIPTION =
  'Working safely and accurately under the AM2 testing clock — no rushed readings, no blank certificates, no book answers.';

const AM2Module4Section6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'time-blanks',
      question:
        "Which is better if time runs out — leaving blanks or writing 'perfect' textbook results?",
      options: [
        'Write perfect textbook results',
        'Leave blanks rather than fake answers',
        'Guess realistic values',
        'Copy from previous tests',
      ],
      correctIndex: 1,
      explanation:
        'Leave blanks. Fake/book answers = fail. Assessors can spot unrealistic perfect results.',
    },
    {
      id: 'rcd-failure',
      question:
        'What do assessors do if you fail to record RCD results because you ran out of time?',
      options: [
        'Give partial marks',
        'Allow extra time',
        'Mark as incomplete → lose marks, likely fail paperwork section',
        'Accept verbal explanation',
      ],
      correctIndex: 2,
      explanation:
        'Incomplete RCD results mean lost marks and likely failure of the paperwork section.',
    },
    {
      id: 'continuity-first',
      question: 'Which test must be carried out before insulation resistance?',
      options: ['Polarity test', 'RCD test', 'Continuity test', 'Earth fault loop test'],
      correctIndex: 2,
      explanation:
        'Continuity tests must be completed before insulation resistance to ensure circuit integrity.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Roughly how long is allocated for AM2 testing and certification?',
      options: ['2.5 hours', '3.5 hours', '4.5 hours', '5 hours'],
      correctAnswer: 1,
      explanation: 'AM2 testing and certification is allocated approximately 3.5 hours total.',
    },
    {
      id: 2,
      question: 'Which is worse: incomplete results or fake/book answers?',
      options: [
        'Incomplete results',
        'Fake/book answers',
        'Both are equally bad',
        'Neither affects the result',
      ],
      correctAnswer: 1,
      explanation:
        'Fake or book answers will result in failure. Incomplete but honest results are better than fabricated perfect answers.',
    },
    {
      id: 3,
      question: 'How much time should be set aside for paperwork?',
      options: ['10-20 minutes', '30-40 minutes', '50-60 minutes', 'No specific time needed'],
      correctAnswer: 1,
      explanation:
        '30-40 minutes should be allocated for completing all certification paperwork properly.',
    },
    {
      id: 4,
      question: "What's the risk of leaving results until the end?",
      options: [
        'Better organization',
        'More accurate results',
        'Running out of time and rushed/illegible entries',
        'No risk at all',
      ],
      correctAnswer: 2,
      explanation:
        'Leaving all recording until the end risks running out of time and producing rushed, illegible paperwork.',
    },
    {
      id: 5,
      question: 'Which test must be carried out before insulation resistance?',
      options: [
        'RCD testing',
        'Continuity testing',
        'Polarity testing',
        'Earth fault loop testing',
      ],
      correctAnswer: 1,
      explanation:
        'Continuity testing must be completed before insulation resistance testing to ensure circuit integrity.',
    },
    {
      id: 6,
      question: "What's a common mistake with RCD testing under time pressure (A4:2026)?",
      options: [
        'Testing too slowly',
        'Skipping the manual test button after the 1×IΔn trip test',
        'Using wrong instruments',
        'Testing at wrong current',
      ],
      correctAnswer: 1,
      explanation:
        'Under A4:2026 the 5×IΔn test was deleted. Candidates often forget to press the manual test button after completing the 1×IΔn trip test.',
    },
    {
      id: 7,
      question: 'Why is it better to record results circuit-by-circuit?',
      options: [
        'Easier to check later',
        'Prevents rushed recording at the end',
        'Required by regulations',
        'Looks more professional',
      ],
      correctAnswer: 1,
      explanation:
        'Recording results as you go prevents the risk of running out of time and having to rush all paperwork at the end.',
    },
    {
      id: 8,
      question: 'True or false: You can pass AM2 if you skip functional testing.',
      options: [
        'True - electrical tests are sufficient',
        'False - functional tests are mandatory',
        'True - if time runs out',
        'False - unless approved by assessor',
      ],
      correctAnswer: 1,
      explanation:
        'Functional testing is mandatory and cannot be skipped. All required tests must be completed.',
    },
    {
      id: 9,
      question: "What's the golden rule if running out of time?",
      options: [
        'Work faster',
        'Skip less important tests',
        'Keep work safe - incomplete but safe is better than rushed and unsafe',
        'Ask for extension',
      ],
      correctAnswer: 2,
      explanation:
        'Safety must never be compromised. Incomplete but safe work is always better than rushed, unsafe shortcuts.',
    },
    {
      id: 10,
      question: 'Give one strategy to manage time during AM2 testing.',
      options: [
        'Work as fast as possible',
        'Record results circuit-by-circuit as you go',
        'Skip detailed checks',
        'Focus only on major tests',
      ],
      correctAnswer: 1,
      explanation:
        'Recording results immediately as you test each circuit prevents time-consuming paperwork sessions at the end.',
    },
  ];

  const learningOutcomes = [
    'Break down AM2 testing into manageable stages',
    'Prioritise safety and completeness under exam conditions',
    'Recognise common time-management mistakes candidates make',
    'Apply strategies to stay on track without rushing',
    'Understand what assessors expect in terms of pacing and documentation',
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
            eyebrow="Module 4 · Section 6"
            title="Time Management During Testing"
            description="Inspection and testing in AM2 is heavily time-pressured. You'll have around 3.5 hours to complete the full sequence of tests and fill in all paperwork. Poor pacing means incomplete results, rushed certificates, or unsafe shortcuts."
            tone="yellow"
          />

          <p className="text-ios-body text-white leading-relaxed">
            The assessor wants to see you work methodically, safely, and efficiently — not rushing,
            but not stalling either. In real life, electricians are expected to test thoroughly and
            still hand over jobs on time.
          </p>

          <TLDR
            points={[
              "Roughly 3.5 hours for the testing + certification block. Pace it; don't sprint.",
              'Record results circuit-by-circuit, not at the end — leaving paperwork to last is the #1 reason candidates fail this section.',
              'Reserve 30-40 minutes for paperwork at the end (EIC + Schedule of Inspections + Schedule of Test Results).',
              'Golden rule under pressure: keep work safe. Incomplete + safe beats rushed + unsafe — every assessor agrees.',
              'Assessors mark your method, not your speed. Steady, systematic, talking through each step earns more marks than racing.',
            ]}
          />

          <CommonMistake
            title="Time Pressure vs Safety"
            whatHappens={
              <>
                Never compromise safety for speed. Unsafe shortcuts or rushed work will result in
                automatic AM2 failure, regardless of time constraints.
              </>
            }
            doInstead={
              <>
                Incomplete but safe work is always better than rushed, unsafe practices. Assessors
                prioritise safety over completion.
              </>
            }
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ContentEyebrow>Why Time Management Matters</ContentEyebrow>

          <ConceptBlock
            title="1. Why Time Management Matters"
            plainEnglish="Testing is marked on procedure AND paperwork. Run out of time and you fail on either side. Pace yourself instead."
          >
            <p>
              <strong>Consequences of Poor Time Management:</strong> Testing is marked on both
              procedure and paperwork. Running out of time = incomplete tests, missing results,
              blank certificates. Rushing = unsafe shortcuts, missed steps, "book answers".
              Incomplete paperwork can drag strong candidates below pass threshold.
            </p>
            <p>
              <strong>Benefits of Good Time Management:</strong> Complete all required tests safely.
              Accurate, legible certification paperwork. Professional, methodical approach
              demonstrated. Reduced stress and better decision-making.
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
            source="BS 7671:2018+A4:2026 — Reg 644.4"
            clause="The person or persons responsible for the design, construction and verification of the installation shall issue the Certificate, which takes account of their respective responsibilities, to the person ordering the work, together with the records mentioned in Regulation 644.3. The recommendation for the interval between initial verification and the first periodic inspection shall be recorded on the Certificate."
            meaning={
              <>
                The reg that ties testing to paperwork. Reg 644.4 makes it clear: the test results
                AND the certificate together are the deliverable. On AM2 day, running out of time on
                the certificate is the same as not finishing the test — Reg 644.4 isn't satisfied
                without both. That's why "30-40 minutes for paperwork" gets its own time block.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 644.3 / 644.4"
          />

          <ConceptBlock
            title="2. Typical Time Breakdown (approx 3.5 hrs)"
            plainEnglish="These timings are guidelines based on NET experience. Use them as targets to pace yourself, but prioritise safety and completeness over speed."
          >
            <p>
              <strong>Visual inspection &amp; preparation:</strong> 20-30 mins.
            </p>
            <p>
              <strong>Continuity tests (CPC, ring):</strong> 40-50 mins.
            </p>
            <p>
              <strong>Insulation resistance:</strong> 20 mins.
            </p>
            <p>
              <strong>Polarity checks:</strong> 20 mins.
            </p>
            <p>
              <strong>Earth fault loop &amp; PSC/PSCC:</strong> 30-40 mins.
            </p>
            <p>
              <strong>RCD testing:</strong> 30 mins.
            </p>
            <p>
              <strong>Functional testing:</strong> 30 mins.
            </p>
            <p>
              <strong>Paperwork completion:</strong> 30-40 mins.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="3. Common Time Mistakes (NET findings)"
            whatHappens={
              <>
                <strong>Top 5 Time Management Failures:</strong> 1. Spending too long setting up
                first tests — panicking later. 2. Not recording results as they go — trying to write
                everything at the end. 3. Over-checking one circuit while neglecting others. 4.
                Rushing at the end — missing manual RCD test button or functional checks. 5. Poor
                handwriting slowing down paperwork.
              </>
            }
            doInstead={
              <>
                Set test-block targets, record as you go, share attention across all circuits, leave
                30-40 minutes for paperwork, and practise legible recording under pressure.
              </>
            }
          />

          <ConceptBlock
            title="4. Assessor Expectations"
            plainEnglish="Steady, systematic, talking through what you're doing, recording as you go, leaving the install safe — that's the bar."
          >
            <p>
              <strong>What Assessors Want to See:</strong> Work steady and systematic — no
              shortcuts. Talk through what you are doing (shows confidence and keeps you focused).
              Record results circuit-by-circuit, not all at the end. Leave circuits safe if
              incomplete. Unsafe = fail.
            </p>
            <p>
              <strong>Professional Qualities Demonstrated:</strong> Methodical approach under
              pressure. Clear communication and commentary. Organised documentation practices.
              Safety prioritised over speed.
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
            source="BS 7671:2018+A4:2026 — Reg 651.1"
            clause="Where required, periodic inspection and testing of every electrical installation shall be carried out in accordance with Regulations…"
            meaning={
              <>
                Reg 651.1 sets the principle — every install gets periodic re-inspection. Reg 652.1
                explains that the frequency depends on type of installation, use, maintenance regime
                and external influences. On AM2 day this matters because the recommended interval
                you write on the EIC under Reg 644.4 has to be defensible — you can't just guess.
                Domestic dwellings: typically 10 years. Commercial: 5 years. Industrial / harsher
                environments: 3 years or shorter. Match the figure on the EIC to the figure on the
                periodic inspection notice (Reg 514.12.1).
              </>
            }
            cite="BS 7671:2018+A4:2026 Chapter 65 (Reg 651.1 / 652.1 / 653.1)"
          />

          <SectionRule />

          <ConceptBlock
            title="5. Practical Strategies for Success"
            plainEnglish="Plan, record, stay calm, organise — four habit clusters that turn time pressure into a manageable rhythm."
          >
            <p>
              <strong>Planning Strategies:</strong> Have a plan: Break tasks into stages with time
              targets. Check off sequence: Use the GN3 order like a checklist. Don't over-engineer:
              Professional standard is enough.
            </p>
            <p>
              <strong>Recording Strategies:</strong> Record immediately: Enter values as you test,
              not afterwards. Work cleanly: Avoid wasted time untangling leads. Clear handwriting:
              Practice legible recording under pressure.
            </p>
            <p>
              <strong>Mental Strategies:</strong> Stay calm: Panic leads to skipped steps and unsafe
              practice. Focus on one circuit: Complete each fully before moving on. Commentary: Talk
              through actions to maintain focus.
            </p>
            <p>
              <strong>Equipment Strategies:</strong> Organised setup: Keep tools and leads tidy.
              Pre-check equipment: Verify operation before starting. Backup plans: Know alternative
              test methods.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Real-world Examples"
            plainEnglish="Three failures and one parallel from professional practice — all rooted in time-management habits."
          >
            <p>
              <strong>Example 1: Ring Continuity Obsession.</strong> Candidate spent 45 mins just on
              ring continuity, re-checking measurements multiple times. Ran out of time, left RCD
              tests incomplete — fail. Lesson: Don't chase perfection on one test at the expense of
              completing all requirements.
            </p>
            <p>
              <strong>Example 2: Paperwork Left Until End.</strong> Candidate tested correctly but
              left all paperwork until the end. Results rushed, illegible, several mistakes — lost
              easy marks. Lesson: Record results immediately while values are fresh in memory.
            </p>
            <p>
              <strong>Example 3: Methodical Success.</strong> Candidate kept to time blocks,
              recorded as they went, talked through each stage clearly. Completed all tests and
              paperwork on time — pass. Success factor: Disciplined time management and immediate
              recording.
            </p>
            <p>
              <strong>Example 4: Real-world Parallel.</strong> In real work, a contractor failed a
              NICEIC audit because test sheets were incomplete. Same issue in AM2 = marks lost.
              Reality: Incomplete documentation fails in both AM2 and professional practice.
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
            title="Advanced Time Management Techniques"
            plainEnglish="Five minutes of pre-test prep saves twenty later. Efficient recording habits save another ten. Practise both."
          >
            <p>
              <strong>Pre-Test Preparation (5-10 mins investment saves 20+ mins later):</strong> Set
              up test equipment systematically in logical order. Check all instruments are
              calibrated and functioning. Organise test leads and accessories within easy reach.
              Review circuit schedules and understand the installation layout. Plan your testing
              sequence based on circuit accessibility.
            </p>
            <p>
              <strong>Efficient Recording Methods:</strong> Use consistent abbreviations that you
              practise beforehand. Record readings immediately after each individual test.
              Double-check critical values as you write them down. Keep certificates organised and
              easily accessible. Use pencil for initial readings, pen for final confirmed results.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Troubleshooting Time Issues"
            plainEnglish="Common problems on AM2 day and the standard answers — keep these to hand so you don't lose minutes problem-solving."
          >
            <p>
              <strong>Problem: Test equipment malfunction.</strong> Solution: Always have backup
              instruments and check equipment functionality before starting formal testing.
            </p>
            <p>
              <strong>Problem: Unexpected circuit complexities.</strong> Solution: Spend adequate
              time on visual inspection to understand the installation layout fully.
            </p>
            <p>
              <strong>Problem: Illegible handwriting under pressure.</strong> Solution: Practice
              writing test results clearly and consider using block capitals for critical values.
            </p>
            <p>
              <strong>Problem: Forgetting test sequences.</strong> Solution: Create a personal
              checklist and stick rigidly to GN3 testing order.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Frequently Asked Questions"
            plainEnglish="Five questions candidates always ask about timing — and the straight answers."
          >
            <p>
              <strong>Q1: Can I ask for extra time if I'm running behind?</strong> No — the schedule
              is fixed. AM2 assessments run to strict timelines that cannot be extended.
            </p>
            <p>
              <strong>Q2: Should I speed up if I see I'm running out of time?</strong> No — unsafe
              shortcuts = fail. Prioritise safety over completion every time.
            </p>
            <p>
              <strong>Q3: Can I skip functional tests if I've done electrical tests?</strong> No —
              functional tests are mandatory. All prescribed tests must be completed.
            </p>
            <p>
              <strong>Q4: Do I lose marks for working slowly but completing everything?</strong> Not
              directly, but you risk running out of time for later tests or paperwork.
            </p>
            <p>
              <strong>Q5: What's the golden rule if you're behind schedule?</strong> Keep work safe.
              Incomplete but safe is always better than rushed and unsafe.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Summary — Method, not speed"
            plainEnglish="Time management in AM2 testing is about method, not speed. Tests in correct sequence, results recorded as you go, safe steady pace, certificates fully completed and legible — that's the bar."
          >
            <p>Tests completed in correct sequence.</p>
            <p>Results recorded as you go.</p>
            <p>Safe, steady pace without rushing.</p>
            <p>Certificates fully completed and legible.</p>
            <p>
              Remember: you're not only being tested on knowledge — you're being tested on how you
              work under pressure.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Sprinting through the dead tests to 'save time' for paperwork"
            whatHappens={
              <>
                You're 40 minutes in. Continuity tests done in 25 minutes (the time block was
                40-50). You skip ahead — IR, polarity, Ze — all rushed. Numbers look right at a
                glance. You hit live testing, push the 1×IΔn RCD button, get a 12 ms result. Looks
                good. You move on. Two hours later when you sit down for paperwork, you realise you
                missed two circuits' R1+R2 readings entirely and one IR was at the wrong test
                voltage.
              </>
            }
            doInstead={
              <>
                Hit your time targets, but don't run under them. The 40-50 minute continuity block
                exists because that's how long thorough continuity testing actually takes —
                end-to-end ring tests, R1+R2 at every accessory on radial circuits, nullified leads,
                values logged in the schedule. Banking time at the start by skipping steps means
                going back to refill the schedule from memory. Memory is wrong.
              </>
            }
          />

          <CommonMistake
            title="Trying to fit the wrong amendment's time blocks into A4:2026 testing"
            whatHappens={
              <>
                You watched a YouTube walkthrough from 2022. The presenter ran 5×IΔn RCD tests as
                part of his time budget. You allocate that same time block. On the day you're
                following A4:2026 (no 5×IΔn) so the RCD slot finishes faster — but you've allocated
                the slow time AND you spend extra minutes second-guessing whether you should be
                running 5× too. Net effect: confusion, wasted minutes, weak documentation.
              </>
            }
            doInstead={
              <>
                Plan from the A4:2026 routine: continuity → ring continuity → IR (500 V DC, ≥1 MΩ) →
                polarity → Ze (TT: earth electrode) → energise → Zs → PFC → RCD (single 1×IΔn AC
                test + manual button) → phase sequence (3-ph only) → functional. The RCD block is
                shorter under A4:2026. Use the saved time on paperwork — that's where most marks are
                lost.
              </>
            }
          />

          <Scenario
            title="20 minutes left, RCD trip test still to do on three circuits"
            situation={
              <>
                You're 3 hours 10 minutes into the 3.5 hour block. Continuity done, IR done, Zs done
                on all circuits. RCD trip tests still outstanding on three RCBOs. Paperwork is half
                filled in — schedule of test results has continuity and IR rows complete, but Zs and
                RCD rows are blank. You feel the pressure rising.
              </>
            }
            whatToDo={
              <>
                Slow down deliberately. The RCD test is fast — single AC test at 1×IΔn + manual
                button per RCBO. Three of them = about 6 minutes if you're methodical. Do them one
                at a time, write the trip time straight onto the schedule (don't try to remember
                three figures). That leaves you 14 minutes for the EIC header + schedule of
                inspections + signatures. If something goes wrong on a trip test, RECORD THE FIGURE
                — you'd rather hand in a complete schedule with one non-compliant RCD than a
                half-blank schedule that suggests you ran out of time.
              </>
            }
            whyItMatters={
              <>
                Panicking burns minutes. So does trying to remember three trip times while writing.
                Steady method beats sprinting every time. A complete schedule with one logged
                non-compliance is a passable EIC; a half-blank schedule is automatic paperwork
                failure.
              </>
            }
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'Is 3.5 hours really enough? It feels tight.',
                answer:
                  "It is enough — if you record as you go. Most candidates who run out of time aren't slow at testing; they're slow because they tried to memorise multiple readings and only filled in the schedule at the end. Record the value the moment the meter shows it. Then the schedule is finished when the testing finishes, and you've got 30-40 minutes for the EIC header, signatures and schedule of inspections.",
              },
              {
                question: "Can I ask the assessor for help if I'm stuck?",
                answer:
                  "You can ask for clarification on instructions or the rig layout, but not for help on what to do next. Assessors observe; they don't coach during the test. If you're stuck, fall back to GN3 sequence — it's the same on every rig. The published order of tests is the safety net for moments when your head goes blank.",
              },
              {
                question: 'What if my MFT runs out of battery mid-test?',
                answer:
                  "Have a backup. Charge the MFT the night before, pack a spare set of test leads, and check both before the test starts. If your MFT dies anyway, tell the assessor immediately — most centres have spares. Do NOT 'borrow' another candidate's meter or carry on with a meter you can't fully trust. Stopping for a tool swap is fine; cracking on with dodgy kit is fail-grade unsafe.",
              },
              {
                question: 'Should I memorise A4:2026 figures or look them up on the day?',
                answer:
                  "Memorise the common ones: B6 = 7.28 Ω, B16 = 2.73 Ω, B32 = 1.37 Ω, B40 = 1.09 Ω. RCD trip ≤ 300 ms (general-purpose) / ≤ 200 ms (Type S) / ≤ 40 ms (additional protection per Reg 415.1.1). IR ≥ 1 MΩ at 500 V DC. The 0.8 rule. Looking these up burns minutes you don't have. Some centres allow Table 41.3 on the bench for reference — confirm with your centre, but don't rely on it.",
              },
              {
                question: "If I'm running ahead, should I slow down?",
                answer:
                  'No — bank the time for paperwork. Most candidates underestimate how long the EIC + schedule of inspections takes, especially with three signature blocks (Reg 644.4: designer, constructor, inspector) and the recommended-interval entry. If you finish testing in 2 hours 50 minutes instead of 3 hours, those 10 minutes are gold for double-checking units and catching missed entries.',
              },
              {
                question: "What's the recommended next-inspection interval I write on the EIC?",
                answer:
                  'Reg 644.4 says to record it. The figure depends on installation type (Reg 652.1) — domestic dwellings typically 10 years, commercial 5 years, industrial / construction site shorter. AM2 rigs are usually treated as domestic-equivalent: write 10 years (or whatever your centre states). Match it to the periodic inspection notice (Reg 514.12.1) so the EIC and the on-site notice agree.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Roughly 3.5 hours total. Record results circuit-by-circuit — leaving paperwork to the end is the #1 fail point.',
              'Reserve 30-40 minutes for the EIC + Schedule of Inspections + Schedule of Test Results.',
              'Golden rule: incomplete + safe beats rushed + unsafe. Every assessor agrees.',
              'A4:2026 routine is shorter than older guides suggest (no 5×IΔn). Plan from current regs, not 2022 walkthroughs.',
              'Reg 644.4 ties testing to certification — running out of time on the EIC is the same as not finishing the test.',
              'Memorise A4:2026 figures: B32 Zsmax = 1.37 Ω · IR ≥ 1 MΩ at 500 V · RCD trip ≤ 300 ms / 200 ms / 40 ms.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Section 6: Time Management Quiz" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Non-Compliances
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5: Fault Diagnosis
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module4Section6;
