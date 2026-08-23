import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Multiple-Choice Question Banks - MOET Module 7 Section 1.1';
const DESCRIPTION =
  'How to use question banks properly for the ST1426 EPA knowledge test: retrieval practice, spaced and interleaved revision, reading a multiple-choice question, and the wrong-answer workflow.';

const quickCheckQuestions = [
  {
    id: 'why-practice-testing',
    question:
      'Why does answering practice questions generally build stronger recall than re-reading your notes?',
    options: [
      'Because it forces you to retrieve the answer from memory, which strengthens the memory itself',
      'Because question banks contain the exact questions used in the real assessment',
      'Because reading notes is only useful for practical assessments',
      'Because it takes less time overall than reading',
    ],
    correctIndex: 0,
    explanation:
      'Re-reading feels productive because the material looks familiar, but familiarity is not the same as recall. Retrieving an answer under your own steam is the effort that strengthens the memory and shows you honestly whether you know something.',
  },
  {
    id: 'stem-first',
    question:
      'You open a question and immediately start scanning the four options. What should you have done first?',
    options: [
      'Read the stem carefully and predicted your own answer before looking at the options',
      'Counted how many options mention a number',
      'Eliminated the longest option, as it is usually a distractor',
      'Checked how many marks the question is worth',
    ],
    correctIndex: 0,
    explanation:
      'Reading the options first lets the distractors do your thinking for you — a plausible wrong answer can capture you before you have decided anything. Read the stem, work out what you think the answer is, then look for it among the options.',
  },
  {
    id: 'interleaving',
    question:
      'You have four topics to revise this week. Which pattern is likely to produce stronger long-term recall?',
    options: [
      'Mix all four topics within each session, revisiting them across the week',
      'One topic per evening, then never return to it',
      'Spend the whole week on the topic you already score highest in',
      'Do nothing all week, then one long session on the Sunday',
    ],
    correctIndex: 0,
    explanation:
      'Mixing topics (interleaving) forces you to work out which idea applies before you apply it — the same job the real test sets you, because its questions arrive in no helpful order. Blocking one topic per night feels smoother but the fluency fades quickly.',
  },
  {
    id: 'wrong-answer-loop',
    question: 'After getting a question wrong in a question bank, the most valuable next step is to:',
    options: [
      'Read the explanation, log the topic, and schedule a retest of that topic later',
      'Note the correct letter so you recognise it if the question comes round again',
      'Move straight on to keep your momentum and your average up',
      'Delete the question from your bank so it stops lowering your score',
    ],
    correctIndex: 0,
    explanation:
      'A wrong answer is the most useful piece of feedback a question bank can give you. Reading the explanation tells you why you were wrong; logging the topic turns it into a revision task; retesting later proves the gap has actually closed rather than just being papered over.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which best describes the "testing effect" as it applies to your EPA knowledge test revision?',
    options: [
      'The act of retrieving information in a test strengthens your memory of it more than restudying does',
      'Candidates who sit more tests are given easier questions',
      'Test scores always rise on a second attempt regardless of study',
      'Testing is only useful at the very end of a revision programme',
    ],
    correctAnswer: 0,
    explanation:
      'Pulling an answer out of memory is itself a learning event — it is harder than re-reading, and that difficulty is what makes it stick. This is why a question bank is a study tool, not just a scoring tool.',
  },
  {
    id: 2,
    question:
      'You score 92% on a topic you enjoy and 54% on one you find dull. Where should the next few sessions go?',
    options: [
      'Mainly on the 54% topic, with short maintenance passes on the stronger one',
      'On the 92% topic, to push it towards 100%',
      'Equally on both, because all topics carry the same weight',
      'On neither — take a break until your confidence recovers',
    ],
    correctAnswer: 0,
    explanation:
      'Marks are far easier to gain where you are weak than where you are already strong. Practising only your strong topics is one of the most common forms of revision self-sabotage: it feels good and moves your overall score very little.',
  },
  {
    id: 3,
    question:
      'A question stem asks for the action that "should be taken first". Two options are both correct actions. What does this tell you?',
    options: [
      'The question is testing sequence or priority — you must pick the one that comes before the other',
      'The question is faulty and should be reported to the invigilator',
      'Either answer will be accepted as correct',
      'You should choose the longer of the two options',
    ],
    correctAnswer: 0,
    explanation:
      'Words such as "first", "best", "most" and "primary" signal a most-correct question. Several options may be defensible in isolation; your job is to rank them against the exact wording of the stem.',
  },
  {
    id: 4,
    question: 'What is the correct use of the "flag" function during a question bank session?',
    options: [
      'Select your best answer, flag the question, move on, and return to flagged items at the end',
      'Flag a question and leave it unanswered so it stands out clearly',
      'Flag every question you are less than fully certain about, however small the doubt',
      'Flag questions you got right so you can enjoy reviewing them',
    ],
    correctAnswer: 0,
    explanation:
      'Flagging is a bookmark, not a substitute for an answer. Always commit to your best option first — if you run out of time, a flagged blank scores nothing while a flagged guess might score.',
  },
  {
    id: 5,
    question:
      'Which revision pattern reflects spaced practice for someone working full time on the tools?',
    options: [
      'Short, regular sessions across the week, revisiting topics after a gap of days',
      'One long session every third weekend covering everything',
      'Continuous revision every evening on a single topic until it is perfect',
      'All revision packed into the seven days before the assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Spacing means returning to material after you have started to forget it — the effortful recall is what consolidates it. Short regular sessions also fit realistically around shifts, callouts and travel, so they actually happen.',
  },
  {
    id: 6,
    question:
      'You have narrowed a question to two options and you have already spent well over your average time on it. What is the best move?',
    options: [
      'Choose the better of the two, flag it, and move on',
      'Keep working until you are certain which of the two is correct',
      'Leave it blank and come back only if you finish early',
      'Change your approach and re-read all four options twice more',
    ],
    correctAnswer: 0,
    explanation:
      'Once elimination has done its work, extra time rarely converts a 50/50 into certainty — but it definitely costs you time on questions you could answer outright. Commit, flag, move on.',
  },
  {
    id: 7,
    question: 'What is the main risk of repeatedly drilling the same small set of bank questions?',
    options: [
      'You begin recognising questions rather than understanding the underlying principle',
      'The bank stops recording your progress after several attempts',
      'Your reading speed drops over time',
      'It counts against you in the real assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Recognition memory is fragile and question-shaped. Once you can answer an item from the shape of its wording, it has stopped teaching you anything — the real test will phrase the same principle differently and the recognition will not transfer.',
  },
  {
    id: 8,
    question:
      'In the wrong-answer workflow taught in this module, when can you treat a weak topic as genuinely repaired?',
    options: [
      'When you have answered fresh questions on it correctly on two separate occasions, days apart',
      'As soon as you have read the explanation and understood it',
      'When you have got one further question on it right immediately afterwards',
      'When the topic no longer appears in your recent results',
    ],
    correctAnswer: 0,
    explanation:
      'Understanding an explanation proves comprehension, not retention, and an immediate retest is answered from short-term memory. Beating the topic twice, on different days and with different questions, is evidence the knowledge has actually settled.',
  },
  {
    id: 9,
    question: 'Which of the following is NOT a sensible use of a question bank?',
    options: [
      'Memorising which answers were correct so you can reproduce them later',
      'Diagnosing which topics need revision before you plan your week',
      'Building familiarity with how questions are phrased',
      'Practising the discipline of reading the stem before the options',
    ],
    correctAnswer: 0,
    explanation:
      'Banks are diagnostic and formative — they show you what you do not know and give you reps at the reading skill. Memorising answers produces a score that rises while your actual knowledge stands still.',
  },
  {
    id: 10,
    question: 'The night before an invigilated knowledge test, the most useful thing you can do is:',
    options: [
      'Light review of your logged weak topics, then a full night of sleep',
      'A long final cramming session covering every module',
      'Two back-to-back full mock tests to build stamina',
      'Nothing at all — avoid thinking about the assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Sleep consolidates what you have already learned; late cramming trades that consolidation for a small amount of fragile new material and arrives with you tired. A light skim of your own weak-topic log is reassurance without the cost.',
  },
  {
    id: 11,
    question: 'You reach the end of the paper with time remaining. The best use of that time is to:',
    options: [
      'Check every question has an answer, then revisit flagged items with specific doubts',
      'Change any answer that now feels uncertain',
      'Re-read every question from the beginning in full',
      'Submit immediately to avoid second-guessing yourself',
    ],
    correctAnswer: 0,
    explanation:
      'A blank scores nothing, so completeness comes first. After that, revisit only the flagged items — and only change an answer where you can point to a concrete reason, such as having misread a word in the stem.',
  },
  {
    id: 12,
    question: 'What does "predict before you look" mean when working through a question?',
    options: [
      'Decide what you think the answer is from the stem alone, then find it among the options',
      'Guess which option letter is statistically most likely',
      'Predict your final score before starting the paper',
      'Read the explanation before attempting the question',
    ],
    correctAnswer: 0,
    explanation:
      'Forming your own answer first turns a recognition task into a recall task and immunises you against well-written distractors. If your prediction is sitting there among the options, that is strong confirmation; if it is not, slow down and re-read the stem.',
  },
];

const faqs = [
  {
    question: 'How many questions should I be doing in a session?',
    answer:
      'Quality of review matters more than volume. A focused block of questions that you then review properly — reading every explanation, logging every miss — is worth far more than double the number rattled through for a score. If you are running out of energy for the review, the block was too long.',
  },
  {
    question: 'Should I use question banks from the start or only near the end?',
    answer:
      'From the start. Using questions early is not "testing before you are ready" — it is how you find out what to study. Early sessions will feel uncomfortable because your scores will be low, but they point your revision at real gaps rather than at whatever you happen to enjoy reading.',
  },
  {
    question: 'I understood the explanation, so why did I get a similar question wrong a week later?',
    answer:
      'Understanding an explanation in the moment is comprehension, not retention. The material only becomes durable once you have retrieved it yourself, from memory, after a gap. That is exactly why the workflow in this section asks you to retest a logged topic on a later day rather than immediately.',
  },
  {
    question: 'Is it cheating to look at the explanation before answering?',
    answer:
      'It is not cheating, but it wastes the question. Once you have seen the explanation, that item can never test you again — you will recognise it. Answer first, commit to your choice, and only then open the explanation. If you genuinely have no idea, answer anyway and mark it as a guess.',
  },
  {
    question: 'My scores have plateaued. What should I change?',
    answer:
      'A plateau usually means you have stopped meeting material you find hard. Check three things: are you drawing from fresh questions rather than repeating familiar ones; are you weighting your sessions towards logged weak topics; and are you mixing topics within a session rather than blocking one at a time. Changing any of these usually moves the plateau.',
  },
  {
    question: 'How do I revise with an irregular shift pattern?',
    answer:
      "Anchor revision to events rather than to clock times — a set of questions with your first brew of the day, a review of yesterday's misses before bed. Short and reliable beats long and aspirational. Flashcards fill the awkward gaps that are too short for a full block: waiting for a lift, sitting in the van, waiting on a permit.",
  },
];

const MOETModule7Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Multiple-Choice Question Banks
          </h1>
          <p className="text-white">
            How to use practice questions as a study tool — not just a score — when preparing for the
            EPA knowledge test
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Answer, don&apos;t re-read:</strong> retrieval builds memory, familiarity
                does not
              </li>
              <li className="pl-1">
                <strong>Space and mix:</strong> short regular sessions, several topics in each
              </li>
              <li className="pl-1">
                <strong>Stem first:</strong> predict your answer before you look at the options
              </li>
              <li className="pl-1">
                <strong>Work your misses:</strong> explanation, log the topic, beat it twice
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Maintenance Technician Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>ST1426:</strong> the knowledge test is one component of your EPA
              </li>
              <li className="pl-1">
                <strong>Format:</strong> multiple-choice, sat under invigilation
              </li>
              <li className="pl-1">
                <strong>Shift-friendly:</strong> revision must survive callouts and nights
              </li>
              <li className="pl-1">
                <strong>In this module:</strong> question banks, timed mocks and flashcards
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You&apos;ll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why answering questions beats re-reading notes for durable recall',
              'Build a spaced, interleaved revision pattern around a working week',
              'Read a multiple-choice question stem before the options and predict the answer',
              'Eliminate distractors and handle "best" or "most correct" phrasing',
              'Manage time and use flagging without leaving questions unanswered',
              'Run the wrong-answer workflow: explanation, log the topic, retest until beaten twice',
              'Set a realistic revision cadence for the final weeks before the assessment',
              'Recognise self-sabotage patterns such as bank-memorising and comfort revision',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Answering Questions Beats Re-reading
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The instinctive way to revise is to open the notes and read them again. It is
              comfortable, it takes no decisions, and after an hour you feel like you have covered a
              lot of ground. The problem is that the feeling is unreliable. Re-reading produces
              <em> familiarity</em> — a sense that you have seen this before — and your brain is
              happy to accept familiarity as evidence that you know something. On the day, the
              assessment does not ask whether the material looks familiar. It asks you to produce an
              answer.
            </p>
            <p>
              Answering a practice question does something structurally different. It forces you to
              go and find the information yourself, without the page in front of you. That act of
              retrieval is effortful, and the effort is the point: pulling a fact out of memory makes
              that fact easier to pull out next time. This is usually called the testing effect, and
              it is the single most useful idea in this whole module. A question bank is not a marking
              machine you visit at the end of revision — it is the revision.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Two Ways to Spend Thirty Minutes
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        How it feels at the time
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        What it leaves behind
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Re-reading the notes</td>
                      <td className="border border-white/10 px-3 py-2">
                        Smooth, productive, low effort
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Recognition of the page; little independent recall
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Highlighting and copying</td>
                      <td className="border border-white/10 px-3 py-2">
                        Busy and tidy; the notes look impressive
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Mostly a handwriting exercise unless you close the book
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Answering questions, then reviewing
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Uncomfortable, slower, exposes gaps
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Stronger recall plus an honest map of what you do not know
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              There is a second benefit that matters just as much. A question bank gives you honest
              feedback. When you re-read, nothing contradicts you; when you answer, the bank tells you
              plainly which topics you have not got. Most candidates who are surprised on assessment
              day were not short of study hours — they were short of accurate information about where
              those hours should have gone.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Two Jobs a Question Bank Does
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Learning:</strong> every retrieval strengthens the memory, whether you get
                  the question right or wrong
                </li>
                <li className="pl-1">
                  <strong>Diagnosis:</strong> your pattern of misses tells you what next week&apos;s
                  revision should be about
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                Both jobs are lost if you treat the bank as an exam you must impress. Nobody is
                marking your practice sessions. A low score in week one is information, not a verdict.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> if a revision method never makes you uncomfortable, it is
              probably not doing much. Close the notes and answer something.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Spacing and Interleaving in a Working Week
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two further ideas turn practice questions from useful into powerful, and both of them
              suit a maintenance technician&apos;s life better than the alternative. The first is
              <strong> spacing</strong>: spreading your practice out rather than bunching it. The
              second is <strong>interleaving</strong>: mixing topics within a session rather than
              doing one topic at a time until it is finished.
            </p>
            <p>
              Spacing works because forgetting is part of learning. If you revisit a topic immediately,
              the answer is still sitting in short-term memory and no real retrieval happens. If you
              revisit it after a few days, when the edges have started to blur, you have to do genuine
              work to bring it back — and that work is what makes it stick for longer. Counter-intuitively,
              the session that feels harder is the one that pays.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Blocked Versus Interleaved — the Same Four Topics
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pattern</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What you do</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Blocked</td>
                      <td className="border border-white/10 px-3 py-2">
                        Monday topic A, Tuesday topic B, Wednesday topic C, Thursday topic D
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Feels fluent within a session; fades quickly and never practises choosing
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interleaved</td>
                      <td className="border border-white/10 px-3 py-2">
                        A little of A, B, C and D in every session, all week
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Feels choppier; builds the skill of identifying what a question is really about
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Interleaving matters for a specific reason. In the real knowledge test, questions do not
              arrive grouped under helpful headings. One question is about safe isolation, the next
              about a fault symptom, the next about a maintenance record. Half the work is deciding
              which piece of knowledge the question is asking for — and if you have only ever
              practised topic by topic, you have never rehearsed that decision. Mixed practice makes
              the choosing itself routine.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                A Realistic Week on the Tools
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Weekday mornings:</strong> a short mixed set of questions before you start —
                  small enough that a bad night&apos;s sleep does not kill it
                </li>
                <li className="pl-1">
                  <strong>Dead time:</strong> flashcards while waiting for a permit, a lift, or the
                  kettle. Minutes, not hours
                </li>
                <li className="pl-1">
                  <strong>One evening midweek:</strong> a longer block weighted towards the topics in
                  your weak-topic log
                </li>
                <li className="pl-1">
                  <strong>Weekend:</strong> a timed mock under proper conditions, followed by a full
                  review of every question
                </li>
                <li className="pl-1">
                  <strong>Rolling back:</strong> each session includes a few questions on topics you
                  last saw a week or two ago
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                The Trap of the Grand Plan
              </p>
              <p className="text-sm text-white">
                Revision timetables that assume two clean hours every evening do not survive contact
                with callouts, overtime and night shifts. The first missed evening becomes two, and
                the plan is abandoned along with the revision. Build a plan around your worst realistic
                week, not your best one — a short session you actually complete beats a long one you
                keep postponing.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> little and often, mixed together, returning to things after
              a gap. That sentence is most of the science.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How to Read a Multiple-Choice Question
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A multiple-choice question has two parts: the <strong>stem</strong> — the question
              itself, including any scenario — and the <strong>options</strong>, of which one is the
              key and the rest are distractors. Distractors are not random filler. They are written to
              look attractive to someone with a partial understanding: a right answer to a slightly
              different question, a true statement that does not answer what was asked, a common
              misconception stated confidently.
            </p>
            <p>
              This is why the order in which you read matters so much. If you read the options first,
              a well-built distractor gets to make its case before you have formed any view of your
              own, and you end up choosing between someone else&apos;s four suggestions instead of
              recalling what you know.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Four-Step Read
              </p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">
                  <strong>Read the stem fully.</strong> All of it, including the scenario. Note the
                  qualifying words — first, best, most, least, primary, not, except
                </li>
                <li className="pl-1">
                  <strong>Predict the answer.</strong> Before your eyes drop to the options, decide
                  what you think the answer is, even roughly
                </li>
                <li className="pl-1">
                  <strong>Look for your prediction.</strong> If it is sitting there, that is strong
                  confirmation. If it is not, slow down — you have probably misread the stem
                </li>
                <li className="pl-1">
                  <strong>Eliminate deliberately.</strong> Cross off what you can positively rule out
                  and choose between what is left
                </li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Reading the Qualifying Words
              </h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Wording</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        What it is actually asking
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;What should be done <strong>first</strong>?&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Sequence. Several options may be correct actions; only one comes before the
                        others
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;The <strong>most</strong> likely cause&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Probability. Rare-but-possible causes are the distractors
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;The <strong>primary</strong> purpose&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Main function. Secondary benefits are true but not the answer
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;Which is <strong>not</strong> ...&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Inverted. Three options are correct statements; you want the odd one out
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;<strong>Least</strong> appropriate&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Also inverted. Easy to answer backwards when you are rushing
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Inverted stems catch out more candidates than any other single feature, and they catch
              them for a predictable reason: under time pressure your eye skips small words. If you
              take one habit away from this section, make it the habit of pausing on
              <em> not</em>, <em>except</em> and <em>least</em>.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Eliminating Distractors
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Rule out what is plainly wrong first.</strong> Even removing one option
                  improves your odds if you end up guessing
                </li>
                <li className="pl-1">
                  <strong>Watch for true-but-irrelevant.</strong> An option can be a perfectly correct
                  statement and still not answer the stem
                </li>
                <li className="pl-1">
                  <strong>Check the scope of the words.</strong> Options built on &quot;always&quot;
                  or &quot;never&quot; are worth testing against a single counter-example
                </li>
                <li className="pl-1">
                  <strong>Prefer the safe-practice answer.</strong> Where two options are otherwise
                  balanced, the one that isolates, verifies or protects people is rarely the wrong
                  instinct
                </li>
                <li className="pl-1">
                  <strong>Do not count letters.</strong> There is no reliable pattern in which letter
                  is correct, and looking for one wastes attention
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Answering the Question You Expected</p>
              <p className="text-sm text-white">
                A common failure is recognising a topic in the stem, deciding you know what is being
                asked, and answering from that assumption without finishing the sentence. It usually
                happens on familiar material, which is what makes it dangerous — confidence is exactly
                what stops you re-reading. If a question feels obvious, that is the moment to check
                the last line of the stem before you commit.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> stem first, predict, then look. Almost every avoidable mark
              lost in a multiple-choice test is lost in the reading, not the knowing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Time, Flagging and Keeping Moving
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ST1426 knowledge test is sat under invigilation with a fixed time limit, so pacing
              is a skill in its own right — and it is a skill you should be practising in your bank
              sessions long before you sit a full timed mock. Check the exact format, duration and
              conditions with your training provider or end-point assessment organisation, then work
              out your own average time per question and rehearse against it.
            </p>
            <p>
              Whatever the numbers turn out to be, the shape of good pacing is always the same. Most
              questions take less than your average; a handful take considerably more. The job is to
              bank time on the quick ones so it is there for the slow ones — which means answering
              briskly when you know something, rather than admiring your own certainty.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Using the Flag Properly
              </h3>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">
                  <strong>Always answer before you flag.</strong> A flag is a bookmark, not a
                  placeholder. If time runs out, an answered question can still score
                </li>
                <li className="pl-1">
                  <strong>Flag sparingly.</strong> If you flag everything you are less than certain
                  about, your review list becomes the whole paper and the flag stops meaning anything
                </li>
                <li className="pl-1">
                  <strong>Flag with a reason.</strong> &quot;Down to two options&quot; or &quot;need
                  to re-read the stem&quot; is a useful flag; vague unease is not
                </li>
                <li className="pl-1">
                  <strong>Return with fresh eyes.</strong> Later questions sometimes jog the fact you
                  needed earlier
                </li>
                <li className="pl-1">
                  <strong>Change only with cause.</strong> Switch your answer when you can name what
                  you got wrong first time — not because it now feels odd
                </li>
              </ol>
            </div>

            <p>
              Practise flagging in your untimed bank sessions too. Habits formed calmly are the ones
              that survive under pressure; a technique you have only read about will not be available
              to you on the day. Section 7.1.2 takes pacing and exam-condition practice much further —
              this section is about making the underlying habits automatic first.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                When a Question Stalls You
              </h3>
              <p className="text-sm text-white">
                Set yourself a private ceiling — roughly double your average time — and treat hitting
                it as a signal rather than a failure. Eliminate what you can, take the better of what
                remains, flag it and move. The mark you lose by guessing one question is small; the
                marks you lose by running out of time on questions you knew are not.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> never leave a question blank, and never let one question
              spend another question&apos;s time.
            </p>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Wrong-Answer Workflow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Everything so far has been preparation for this. The value in a question bank is
              concentrated almost entirely in what you do with the questions you got wrong — and the
              most common mistake candidates make is glancing at the score, feeling briefly bad about
              it, and starting another set. That converts a diagnostic tool into a mood generator.
            </p>
            <p>
              Instead, run every miss through the same four steps. It takes longer than moving on, and
              it is the reason your second month of revision will be worth more than your first.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Four Steps</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">
                  <strong>Read the explanation properly.</strong> Not just which option was right —
                  why the one you chose was wrong. Those are different pieces of information, and the
                  second one is the useful one
                </li>
                <li className="pl-1">
                  <strong>Classify the miss.</strong> Was it a knowledge gap, a misreading, a rushed
                  guess, or a genuine confusion between two similar ideas? The fix differs for each
                </li>
                <li className="pl-1">
                  <strong>Log the topic, not the question.</strong> Write down the underlying subject
                  — the principle being tested — rather than the specific item. Your log becomes your
                  revision plan
                </li>
                <li className="pl-1">
                  <strong>Retest until beaten twice.</strong> Come back to that topic with fresh
                  questions on a later day. Two clean passes on separate days before you consider it
                  closed
                </li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Classifying the Miss — and the Fix
              </h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type of miss</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How you spot it</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What fixes it</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Knowledge gap</td>
                      <td className="border border-white/10 px-3 py-2">
                        The explanation contains something you have never met
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Go back to the course material, then retest the topic
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misreading</td>
                      <td className="border border-white/10 px-3 py-2">
                        You knew it; you answered a different question
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Technique, not content — slow the stem read, watch qualifying words
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confusion between ideas</td>
                      <td className="border border-white/10 px-3 py-2">
                        You keep swapping two similar terms or procedures
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Study them side by side and write down the distinguishing feature
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rushed guess</td>
                      <td className="border border-white/10 px-3 py-2">
                        You cannot remember choosing the answer
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Shorter sessions; the last few questions of a long block are usually junk
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lucky right</td>
                      <td className="border border-white/10 px-3 py-2">
                        Correct, but you guessed it
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Log it as a miss anyway — the score flattered you
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              That last row deserves a moment. Marking your guesses as you go — even a small dot next
              to anything you were not sure of — is one of the highest-value habits in this section.
              Without it, your recorded score quietly overstates what you know, and the topics that
              will fail you on the day are the ones hiding behind lucky answers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Weak-Topic Log</h3>
              <p className="text-sm text-white mb-3">
                A page in a notebook is enough. One line per topic, with a date each time you beat it.
                Something like:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Topic:</strong> the principle, in your own words
                </li>
                <li className="pl-1">
                  <strong>Why missed:</strong> gap, misread, confusion, guess
                </li>
                <li className="pl-1">
                  <strong>Beaten:</strong> two dates, days apart, on fresh questions
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                When you sit down to revise and cannot decide what to do, the log decides for you.
                That alone removes one of the biggest sources of wasted revision time.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> a question you got wrong and worked through is worth more
              than ten you got right. Treat your misses as the syllabus.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 06 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Building a Cadence for the Final Weeks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As your assessment date approaches, the balance of your revision should shift. Early on,
              you are learning material and using questions to find gaps. Later, you are consolidating
              and rehearsing the conditions. The mix changes; the underlying loop — answer, review,
              log, retest — does not.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                How the Mix Shifts
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Emphasis</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        What a session looks like
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Early</td>
                      <td className="border border-white/10 px-3 py-2">Coverage and diagnosis</td>
                      <td className="border border-white/10 px-3 py-2">
                        Untimed questions across all topics; long, careful review of every miss
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Middle</td>
                      <td className="border border-white/10 px-3 py-2">Repair</td>
                      <td className="border border-white/10 px-3 py-2">
                        Sessions weighted to the weak-topic log; occasional timed sets to build pace
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final weeks</td>
                      <td className="border border-white/10 px-3 py-2">Consolidation and rehearsal</td>
                      <td className="border border-white/10 px-3 py-2">
                        Timed mocks under proper conditions; mixed sets; flashcards for retention
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final days</td>
                      <td className="border border-white/10 px-3 py-2">Confidence and rest</td>
                      <td className="border border-white/10 px-3 py-2">
                        Light mixed practice, a skim of the log, no new material, protected sleep
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Notice that the volume does not spike at the end. Cramming in the final week is a
              response to anxiety rather than a revision strategy: it displaces sleep, it generates
              fragile material that will not survive the night, and it tends to reopen topics you had
              already closed. If your final week feels frantic, the problem is usually that the middle
              weeks were too comfortable.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Using the Resources in This Module Together
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Question banks</strong> — your everyday tool. Mixed topics, honest review,
                  misses logged
                </li>
                <li className="pl-1">
                  <strong>Timed mock tests</strong> — periodic rehearsal of the real conditions,
                  covered in the next subsection
                </li>
                <li className="pl-1">
                  <strong>Flashcards</strong> — for the definitions and facts that must be instant,
                  and for filling short gaps in the working day
                </li>
                <li className="pl-1">
                  <strong>Your weak-topic log</strong> — the thread that ties all three together and
                  decides where the next session goes
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> aim for a cadence you could sustain for months, then trust
              it. Consistency beats intensity, and it is the only thing that survives a bad week at
              work.
            </p>
          </div>
        </section>

        {/* Section 07 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Assessment-Day Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              By the time you sit the knowledge test, the learning is done. What is left is
              performance — making sure you actually collect the marks you have earned. Almost all of
              that comes down to arriving in reasonable condition and having a first-pass plan you do
              not have to invent on the spot.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Night Before</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Light review of your weak-topic log only — no new material</li>
                  <li className="pl-1">
                    Sleep is revision. It is when the day&apos;s learning is consolidated
                  </li>
                  <li className="pl-1">
                    Bag packed, ID and any permitted equipment ready, route and time confirmed
                  </li>
                  <li className="pl-1">
                    Check what you are allowed to take in — confirm with your provider, do not assume
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On the Day</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Eat something. Low blood sugar reads as anxiety</li>
                  <li className="pl-1">Arrive early enough that traffic cannot become a factor</li>
                  <li className="pl-1">
                    Avoid the pre-test huddle where everyone lists what they have not revised
                  </li>
                  <li className="pl-1">
                    Read the on-screen or written instructions properly before you start
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                First Pass, Then Review Pass
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>First pass:</strong> work through in order, answering everything. Commit and
                  flag rather than stalling
                </li>
                <li className="pl-1">
                  <strong>Completeness check:</strong> before anything else, confirm nothing is
                  unanswered
                </li>
                <li className="pl-1">
                  <strong>Review pass:</strong> revisit flagged items, re-reading each stem from the
                  beginning
                </li>
                <li className="pl-1">
                  <strong>Discipline on changes:</strong> only switch an answer when you can say what
                  you got wrong the first time
                </li>
              </ul>
            </div>

            <p>
              If your mind goes blank, stop for a few seconds rather than pushing harder. Slow breaths,
              shoulders down, then read the current question again from the start. Blanking is a stress
              response, not a sign that the knowledge has gone, and it passes faster if you stop
              feeding it. Focus on the question in front of you rather than the paper as a whole.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> you cannot learn anything useful on the morning of the
              assessment, but you can definitely lose marks by arriving tired, late or rushed. Protect
              the basics.
            </p>
          </div>
        </section>

        {/* Section 08 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Ways Candidates Sabotage Their Own Revision
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              These patterns are common, they feel productive from the inside, and every one of them
              produces a rising practice score alongside flat actual knowledge. Recognising yourself in
              one of them is not a criticism — it is the cheapest correction available to you.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Bank-memorising instead of understanding
                </h3>
                <p className="text-sm text-white">
                  You work the same set of questions repeatedly until you can answer them quickly. The
                  score climbs. But you are now recognising items, not applying principles, and
                  recognition does not transfer to differently-worded questions. The test for this:
                  can you explain <em>why</em> the answer is right without looking? If not, you have
                  memorised the item, not the idea. Draw from fresh questions, and when you do repeat
                  a set, leave a long enough gap that you cannot recall it.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Only practising your strong topics
                </h3>
                <p className="text-sm text-white">
                  Working on what you are good at is pleasant and your average looks healthy, which is
                  precisely why it is so common. But the marks available in a topic you already score
                  highly in are few, and the marks available in the topic you keep avoiding are many.
                  Let the weak-topic log choose your sessions instead of your mood.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Score-watching instead of reviewing
                </h3>
                <p className="text-sm text-white">
                  Finishing a set, noting the percentage and immediately starting another is the
                  fastest way to burn through a question bank without learning from it. The review is
                  where the learning happens. If you only have twenty minutes, do fewer questions and
                  review them properly rather than more questions and none.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Peeking at the explanation first
                </h3>
                <p className="text-sm text-white">
                  Reading the explanation before committing to an answer feels efficient and destroys
                  the question&apos;s value permanently — you will recognise it ever after and it can
                  never test you again. Commit first, however unsure you are, and mark it as a guess.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Marathon sessions before a deadline
                </h3>
                <p className="text-sm text-white">
                  Attention degrades sharply after the first stretch, so the tail of a very long
                  session is mostly rushed guessing — which then contaminates your data about which
                  topics are weak. Several short sessions across a week beat one long one, and they
                  also give you the spacing that makes the material stick.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Waiting until you &quot;feel ready&quot; to start questions
                </h3>
                <p className="text-sm text-white">
                  Some candidates read for weeks before attempting any questions, on the grounds that
                  it would be discouraging to score badly. This gets it backwards: questions are how
                  you find out what to read. Start early, expect low scores, and let the results
                  direct the reading.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">A Quick Honesty Check</p>
              <p className="text-sm text-white">
                Ask yourself two questions at the end of each week. Could I explain my three weakest
                topics out loud, to someone else, without notes? And did my sessions this week go where
                my misses were, or where my comfort was? Two honest answers will tell you more about
                your readiness than any practice percentage.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> a rising practice score is only meaningful if it comes from
              questions you have not seen before. Everything else is measuring your memory of the
              bank.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Using Question Banks" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-2">
              Next: Timed Mock Tests
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule7Section1_1;
