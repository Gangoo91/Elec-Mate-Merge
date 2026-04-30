/**
 * Module 7 · Section 2 — Coping with nerves and pressure
 * AM2 day-prep — Cross-cutting exam strategy
 * Keeping a clear head on AM2 day so nerves don't make you skip a step like re-prove on safe isolation.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
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
} from '@/components/study-centre/learning';

const TITLE = 'Coping with Nerves and Pressure | AM2 Module 7.2 | Elec-Mate';
const DESCRIPTION =
  'Keeping a clear head on AM2 day — practical ways to settle nerves so you do not skip a step like re-prove on safe isolation.';

const AM2Module7Section2 = () => {
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
      id: 'nerve-effects',
      question:
        'What happens if you miss out the re-prove step in safe isolation because of nerves?',
      options: [
        'Minor mark deduction',
        'Warning from assessor',
        'Automatic failure',
        'No consequence',
      ],
      correctIndex: 2,
      explanation:
        'Missing the re-prove step in safe isolation is a safety-critical error that results in automatic AM2 failure.',
    },
    {
      id: 'daily-practice',
      question: 'Why is practising safe isolation every day before AM2 a good strategy?',
      options: [
        'To memorise the steps',
        'To make the process automatic so nerves are less likely to cause mistakes',
        'To impress the assessor',
        "It's not necessary",
      ],
      correctIndex: 1,
      explanation:
        'Daily practice makes safe isolation automatic, reducing the likelihood that nerves will cause you to miss critical steps.',
    },
    {
      id: 'assessor-marking',
      question: 'True or false: Assessors fail candidates just for looking nervous.',
      options: [
        'True - they mark on appearance',
        'False - they only mark the work quality and safety',
        'True - confidence is marked',
        'False - but nerves always affect marks',
      ],
      correctIndex: 1,
      explanation:
        'Assessors only mark your work quality and safety compliance, not your emotional state or appearance.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Why do nerves cause mistakes in AM2?',
      options: [
        'They make you think too much',
        'They cause physical reactions like shaking and brain fog that affect performance',
        'They make the exam harder',
        'They distract other candidates',
      ],
      correctAnswer: 1,
      explanation:
        'Nerves create physical and mental reactions like shaking hands, brain fog, and rushing, which directly affect your ability to work safely and methodically.',
    },
    {
      id: 2,
      question: 'What happens if you skip a safe isolation step due to nerves?',
      options: [
        'You lose a few marks',
        'You get a warning',
        "It's an automatic fail",
        'Nothing happens',
      ],
      correctAnswer: 2,
      explanation:
        'Safety-critical tasks like safe isolation cannot be skipped - missing the re-prove step results in automatic failure.',
    },
    {
      id: 3,
      question: 'How can daily practice reduce nerves?',
      options: [
        'It makes you faster',
        'It makes procedures feel automatic and natural',
        'It impresses the assessor',
        'It guarantees a pass',
      ],
      correctAnswer: 1,
      explanation:
        'Daily practice makes procedures automatic, so nerves are less likely to cause you to forget or skip important steps.',
    },
    {
      id: 4,
      question: 'Why should you avoid high-sugar energy drinks before AM2?',
      options: [
        "They're not allowed in the exam",
        'They cause shakes and crashes mid-assessment',
        'They make you too energetic',
        "They're expensive",
      ],
      correctAnswer: 1,
      explanation:
        'High sugar or energy drinks can cause physical shakes and energy crashes during the assessment, making it harder to work steadily.',
    },
    {
      id: 5,
      question: 'What technique can you use if you feel panic rising?',
      options: [
        'Work faster to catch up',
        'Step back for 10 seconds and use controlled breathing',
        'Ask the assessor for help',
        'Copy what other candidates are doing',
      ],
      correctAnswer: 1,
      explanation:
        'Controlled breathing - step back, inhale slowly through your nose, exhale through your mouth - helps reset your focus when panic rises.',
    },
    {
      id: 6,
      question: 'Why should you break the exam into smaller tasks?',
      options: [
        'To work faster',
        'To reduce overwhelm and focus on the next step',
        'To impress the assessor',
        'To copy other candidates',
      ],
      correctAnswer: 1,
      explanation:
        'Breaking the 8.5-hour install into chunks (mark out, containment, wiring, terminations) reduces overwhelm and helps maintain focus.',
    },
    {
      id: 7,
      question: 'True or false: Assessors fail candidates just for looking nervous.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        "False - assessors don't mark nerves, they mark your work. They only fail you if nerves cause unsafe or incomplete work.",
    },
    {
      id: 8,
      question: "What's the danger of watching other candidates during AM2?",
      options: [
        'You might copy their mistakes',
        'It distracts you from your own work and adds unnecessary pressure',
        "It's not allowed",
        'It slows you down',
      ],
      correctAnswer: 1,
      explanation:
        "Comparing your speed with other candidates adds unnecessary stress. The assessor only marks your work, not how quickly you're moving compared to others.",
    },
    {
      id: 9,
      question: 'Give an example of positive self-talk you could use:',
      options: [
        "I'm failing this",
        'Everyone else is faster than me',
        "I know the process, I've trained for this",
        'This is too hard',
      ],
      correctAnswer: 2,
      explanation:
        "Positive self-talk like 'I know the process, I've trained for this' helps stop panic spirals and maintains confidence.",
    },
    {
      id: 10,
      question: 'Which is safer: being slow but safe, or rushing and unsafe?',
      options: [
        'Rushing and unsafe',
        'Slow but safe',
        'Both are the same',
        'It depends on the task',
      ],
      correctAnswer: 1,
      explanation:
        "Being slightly slow but safe still earns marks. Rushing and being unsafe leads to instant failure. NET's marking system rewards steady, professional behaviour.",
    },
  ];

  const learningOutcomes = [
    'Explain how nerves can affect performance in AM2 and identify the risks if they are not managed',
    'Use practical strategies before and during the exam to control stress and stay focused',
    'Apply breathing, pacing, and positive routines to reduce anxiety and prevent panic',
    'Show professionalism under exam pressure by working safely and methodically',
    'Build confidence that nerves will not stop you demonstrating your competence',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2"
            title="Coping with Nerves and Pressure"
            description="Every candidate feels nervous walking into AM2 - it's the industry's benchmark test and there's pressure to pass first time. NET assessors know this and expect you to feel under stress. What they are measuring is not whether you look calm, but whether you can still work safely, methodically, and professionally under pressure."
            tone="yellow"
          />

          <TLDR
            points={[
              'Nerves are normal — assessors expect them. They’re marking whether you still work safely under pressure, not whether you look calm.',
              'Sleep, food, water, and a familiar tool kit do more for your nerves than any last-minute revision.',
              'Slow down deliberately on safety-critical steps — isolation, prove-tester, energising. Speed kills marks here.',
              'If you mess up a section, reset and continue — the day isn’t over because one criterion went red.',
            ]}
          />

          <ConceptBlock title="Managing Nerves is Essential for AM2 Success">
            <p>
              <strong className="text-red-300">Critical.</strong> If nerves make you rush, skip
              safety procedures, or forget critical steps, marks are lost instantly. Safety-critical
              errors due to panic result in automatic failure. Assessors expect you to work safely
              and methodically under pressure — this is a core competency being tested in AM2.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Why Nerves Matter">
            <p>
              Nerves create physical and mental reactions that can directly affect your performance:
            </p>
            <p>
              <strong className="text-red-400">Physical Effects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Shaking hands make terminations sloppy or unsafe</li>
              <li>Sweating can affect grip on tools and instruments</li>
              <li>Increased heart rate affects fine motor control</li>
            </ul>
            <p>
              <strong className="text-orange-400">Mental Effects:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>Brain fog causes forgotten steps in safe isolation</li>
              <li>Memory lapses in GN3 test sequences</li>
              <li>Negative self-talk leads to loss of focus</li>
            </ul>
            <p>
              <strong className="text-yellow-400">Behavioural Consequences:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-yellow-400/70">
              <li>
                Rushing increases errors like bare copper, missing CPC sleeving, or wrong paperwork
                entries
              </li>
              <li>Skipping safety steps due to time pressure</li>
              <li>Poor decision making under stress</li>
            </ul>
            <p>
              <strong className="text-green-400">Key Point.</strong> NET's marking system rewards
              steady, professional behaviour. Being slightly slow but safe still earns marks;
              rushing and unsafe = instant fail.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ConceptBlock title="Strategies to Reduce Nerves Before Exam">
            <p>
              The way you prepare in the days leading up to AM2 will directly influence your stress
              level on the day.
            </p>
            <p>
              <strong>1. Preparation Builds Confidence.</strong> Practise safe isolation daily and
              run through testing procedures until they feel automatic. The more natural the task
              feels, the less nerves will interfere.
            </p>
            <p>
              <strong className="text-blue-400">Daily Practice Routine:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Safe isolation sequence every morning</li>
              <li>GN3 testing procedures until automatic</li>
              <li>Termination techniques with proper tools</li>
              <li>Paperwork completion under time pressure</li>
            </ul>
            <p>
              <strong>2. Sleep and Rest.</strong> Avoid last-minute all-night revision. A tired
              candidate makes more mistakes than a calm, rested one.
            </p>
            <p>
              <strong className="text-green-400">Sleep Strategy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>7-8 hours sleep for 3 nights before AM2</li>
              <li>No cramming after 8pm the night before</li>
              <li>Light revision only on exam morning</li>
            </ul>
            <p>
              <strong>3. Fuel Your Body.</strong> Eat a balanced meal before the exam. High sugar or
              energy drinks can cause shakes and crashes mid-assessment.
            </p>
            <p>
              <strong className="text-purple-400">Nutrition Plan:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-purple-400/70">
              <li>Complex carbohydrates for sustained energy</li>
              <li>Avoid caffeine overdose or energy drinks</li>
              <li>Bring healthy snacks for breaks</li>
              <li>Stay hydrated but not over-hydrated</li>
            </ul>
            <p>
              <strong>4. Plan Your Arrival.</strong> Get to the centre early so you're not rushing,
              which adds unnecessary stress.
            </p>
            <p>
              <strong className="text-orange-400">Arrival Strategy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>Arrive 30 minutes early minimum</li>
              <li>Plan route and check travel times</li>
              <li>Have backup transport arrangements</li>
              <li>Use extra time to settle and focus</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock title="Techniques During Exam">
            <p>When nerves hit during AM2, you need quick techniques to keep control.</p>
            <p>
              <strong className="text-blue-400">Controlled Breathing.</strong> If panic rises, step
              back for 10 seconds, inhale slowly through your nose, exhale slowly through your
              mouth. This resets your focus. 4-7-8 Technique: Inhale for 4, hold for 7, exhale for
              8.
            </p>
            <p>
              <strong className="text-green-400">Break Tasks into Chunks.</strong> Instead of
              thinking about an 8.5-hour install, focus on the next step: mark out, containment,
              wiring, terminations. One section at a time reduces overwhelm.
            </p>
            <p>
              <strong className="text-purple-400">Positive Self-Talk.</strong> Replace "I'm messing
              this up" with "I know the process, I've trained for this." Simple but stops panic
              spirals. "I can do this safely and methodically."
            </p>
            <p>
              <strong className="text-orange-400">Ignore Others.</strong> Don't compare your speed
              with other candidates. The assessor only marks your work, not relative performance.
              Focus on your own professional standard.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Assessor Expectations">
            <p>NET assessors don't mark nerves — they mark your work. They expect you to:</p>
            <p>
              <strong className="text-green-400">Professional Behaviour:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Work steadily and safely, even if you look anxious</li>
              <li>Maintain calm, methodical approach under pressure</li>
              <li>Show competence through actions, not appearance</li>
            </ul>
            <p>
              <strong className="text-blue-400">Safety Compliance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Keep to procedure (safe isolation, GN3 sequence) without skipping</li>
              <li>Never compromise safety due to time pressure</li>
              <li>Complete all safety-critical steps in correct order</li>
            </ul>
            <p>
              <strong className="text-purple-400">Time Management.</strong> Complete sections within
              the set time without rushing. Quality and safety take priority over speed.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong className="text-blue-400">Think of AM2 Like a Real Job Handover.</strong>{' '}
              On-site, you may feel pressure from deadlines or customers, but you wouldn't skip
              earthing or rush unsafe terminations to finish quicker. Treat AM2 the same way — safe,
              steady, professional.
            </p>
            <p>
              <strong>Practical things you can do:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mental Checklists.</strong> Make checklists in your head: safe isolation
                steps, test order. Stick to them regardless of nerves.
              </li>
              <li>
                <strong>If You Get Stuck.</strong> Don't freeze. Move on, complete another part, and
                come back later.
              </li>
              <li>
                <strong>Record Results.</strong> Write down test results as you go so you don't
                forget under pressure.
              </li>
              <li>
                <strong>Stay Hydrated.</strong> Dehydration increases stress. Keep water with you
                throughout the assessment.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Real-World Examples">
            <p>
              <strong className="text-red-400">Failure Examples:</strong>
            </p>
            <p>
              <strong className="text-red-400">Example 1.</strong> Candidate skipped re-proving
              tester in safe isolation due to nerves — instant fail.
            </p>
            <p>
              <strong className="text-red-400">Example 2.</strong> Candidate felt behind on time in
              the install section, rushed SWA glanding, armour not earthed — marks lost.
            </p>
            <p>
              <strong className="text-green-400">Success Examples:</strong>
            </p>
            <p>
              <strong className="text-green-400">Example 3.</strong> Candidate paused for breathing,
              slowed pace, completed all sections safely — passed comfortably.
            </p>
            <p>
              <strong className="text-green-400">Example 4.</strong> On-site, an electrician under
              deadline pressure maintained safety standards despite client pressure. Same approach
              in AM2 = success.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: Will assessors fail me just for looking nervous?</strong> No — they only
              fail you if nerves cause unsafe or incomplete work.
            </p>
            <p>
              <strong>Q2: What if I forget steps in testing because of panic?</strong> Pause,
              breathe, reset. Assessors prefer slow but correct over rushed and wrong.
            </p>
            <p>
              <strong>Q3: Should I copy other candidates' pace?</strong> No — focus only on your own
              work. Comparing speeds adds unnecessary stress.
            </p>
            <p>
              <strong>Q4: Is feeling anxious normal?</strong> Yes — every candidate feels it. The
              difference is how you manage it.
            </p>
            <p>
              <strong>Q5: What's the best way to reduce nerves overall?</strong> Consistent practice
              until procedures become automatic — especially safe isolation and GN3 testing.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>
              Nerves are normal in AM2, but you must control them. NET wants to see that you can:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Stay safe and methodical under pressure</li>
              <li>Use breathing, chunking, and positive self-talk to reset focus</li>
              <li>Avoid rushing or skipping steps due to panic</li>
              <li>Treat the exam like a professional job handover</li>
              <li>Remember: Safe and steady will pass; rushed and unsafe will fail</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Key Takeaway.</strong> NET assessors understand
              that you will feel nervous. What they're testing is your ability to work safely and
              professionally despite those nerves — just like you would on a real job site under
              pressure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Hands shaking on the proving unit"
            situation={
              <>
                Section C. The assessor stops talking and gestures at the rig. You pick up the
                tester and your hands have started shaking. You can feel everyone watching. Your
                mind has gone blank on which conductor combination to test first.
              </>
            }
            whatToDo={
              <>
                Stop. Take a breath. Put the tester down for ten seconds. Say to yourself out loud:
                "prove the tester first". Pick up the proving unit. The procedure takes over once
                you start it. Assessors don’t fail you for visible nerves — they fail you for
                skipping steps. Slow is fine. Frozen is fine for ten seconds. Skipping a prove is
                not.
              </>
            }
            whyItMatters={
              <>
                Adrenaline shrinks working memory. The fix is muscle memory — practise the isolation
                sequence so often it runs without thinking. Then nerves can shake your hands but not
                your procedure.
              </>
            }
          />

          <CommonMistake
            title="Trying to look calm by speeding up"
            whatHappens={
              <>
                You feel nervous and decide if you just power through quickly, the moment will be
                over. Speed introduces errors — over-stripped conductors, missed steps, sloppy
                paperwork. You fail not because you couldn’t do it, but because you tried to outrun
                the nerves.
              </>
            }
            doInstead={
              <>
                Deliberately slow down on the safety-critical steps. Talk yourself through them out
                loud — assessors will accept you narrating the procedure. Speed comes back naturally
                once the first ten minutes have settled.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Will the assessor mark me down if I look nervous?',
                answer:
                  'No. They expect nervousness. They’re marking your work, not your composure. As long as you keep working safely and methodically, the result is the same.',
              },
              {
                question: 'Can I take a break if I’m struggling?',
                answer:
                  'Yes — within reason. A few minutes outside the rig to compose yourself is fine. The section clock keeps running, so plan it into your time. A coffee and a deep breath beats a panicked half-hour.',
              },
              {
                question: 'What if I make a mistake mid-section?',
                answer:
                  'Acknowledge it, fix it if you can within the section, move on. One NYC criterion is recoverable; abandoning the rest of the section because of one mistake is not.',
              },
              {
                question: 'Should I eat before the assessment?',
                answer:
                  'Yes. Slow-release carbs, water, no alcohol the night before. Low blood sugar makes nerves worse and decision-making slower. Bring a snack for the breaks.',
              },
              {
                question: 'I had a bad mock — does that mean I’ll fail AM2?',
                answer:
                  'No. Most candidates have at least one bad mock. Use the feedback, fix the gap, and book the real thing only when your last two mocks have been clean.',
              },
              {
                question: 'How do I keep going if Section A goes badly?',
                answer:
                  'Each section is marked separately. A weak Section A doesn’t doom the rest. Reset, eat at lunch, treat Section B as a fresh start. The day-two candidates who recover are the ones who don’t carry yesterday’s frustration to today’s rig.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Nerves are expected — assessors mark on procedure, not appearance.',
              'Adrenaline shrinks working memory — muscle memory is the antidote. Practise the safety steps until they’re automatic.',
              'Slow down deliberately on isolation, prove-tester, energising. Speed loses marks here.',
              'Eat properly the night before. Sleep, water, slow-release carbs. Caffeine in moderation.',
              'A few minutes of fresh air mid-section beats a panicked half-hour at the rig.',
              'One NYC criterion isn’t the end — reset and carry on. Each section is scored separately.',
              'Talk yourself through safety procedures out loud if it helps. Assessors accept it.',
              'Don’t book the real assessment until your last two mocks are clean.',
            ]}
          />

          <Quiz
            questions={quizQuestions}
            title="Test Your Knowledge: Coping with Nerves and Pressure"
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module7/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Knowledge Test Practice
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module7/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Safety-first Approach
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module7Section2;
