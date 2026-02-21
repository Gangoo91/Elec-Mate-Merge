import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BarChart3,
  SmilePlus,
  GraduationCap,
  RefreshCw,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question:
      'A training provider distributes feedback forms at the end of a toolbox talk and receives positive ratings. Which level of Kirkpatrick\u2019s model has been evaluated?',
    options: [
      'Level 1 — Reaction',
      'Level 2 — Learning',
      'Level 3 — Behaviour',
      'Level 4 — Results',
    ],
    correctIndex: 0,
    explanation:
      'Feedback forms completed immediately after a training event measure Level 1 — Reaction. They tell you whether participants enjoyed the training and found it relevant, but they do not tell you whether anyone actually learned anything, changed their behaviour, or achieved measurable outcomes.',
  },
  {
    question:
      'An assessor gives a knowledge test before and after a safe isolation refresher course and compares the scores. Which Kirkpatrick level is this?',
    options: [
      'Level 1 — Reaction',
      'Level 2 — Learning',
      'Level 3 — Behaviour',
      'Level 4 — Results',
    ],
    correctIndex: 1,
    explanation:
      'Pre/post testing measures Level 2 — Learning. Comparing scores before and after the training demonstrates whether knowledge has increased. However, it does not confirm whether the learner will apply that knowledge on the job (Level 3) or whether it leads to measurable organisational outcomes (Level 4).',
  },
  {
    question:
      'A company discovers that despite running annual safe isolation training, the number of near-miss incidents has not decreased. At which Kirkpatrick level has evaluation failed?',
    options: [
      'Level 1 — the training was not enjoyable',
      'Level 2 — the training did not teach the right content',
      'Level 3 — learners did not transfer the training to on-site behaviour',
      'Level 4 — the measurement tools are wrong',
    ],
    correctIndex: 2,
    explanation:
      'If training is being delivered and knowledge is being tested (Levels 1 and 2) but near-miss incidents remain unchanged, the most likely failure point is Level 3 — Behaviour. Learners are not transferring what they learned in training to their actual work on site. This is the level where most training evaluation fails, because it requires observation and follow-up weeks or months after the training event.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Do I really need to evaluate at all four levels?',
    answer:
      'Ideally, yes — but the reality is that most organisations struggle to get beyond Levels 1 and 2. The important thing is to be aware of all four levels and to push evaluation as far as is practicable. Even if you cannot measure Level 4 (Results) for every training event, being conscious that Level 1 (Reaction) is insufficient will improve your evaluation practice. Start by adding Level 2 (pre/post knowledge checks) to your current training, then look for opportunities to assess Level 3 (on-site behaviour change) through observation and discussion a few weeks after training.',
  },
  {
    question: 'Why do most organisations stop at Level 1?',
    answer:
      'Because Level 1 is cheap, quick, and easy. Handing out feedback forms takes five minutes and produces satisfying numerical data ("92% rated the training as good or excellent"). Levels 3 and 4 require sustained follow-up, site visits, data collection, and analysis over weeks or months — which takes time, money, and organisational commitment. There is also a psychological factor: Level 1 data is almost always positive (people tend to rate training favourably immediately after it), which makes training providers and managers feel good. Level 3 data can be uncomfortable — it might reveal that expensive training made no difference to on-site behaviour.',
  },
  {
    question: 'How long after training should I check for behaviour change?',
    answer:
      'Research suggests that the optimal window for assessing Level 3 behaviour change is between 4 and 12 weeks after the training event. Checking too soon (within the first week) risks measuring the "novelty effect" — learners are still thinking about the training and are more likely to demonstrate the new behaviour. Checking too late (after 6 months or more) makes it difficult to attribute any changes specifically to the training, as other factors will have intervened. A practical approach is to conduct a brief observation or check-in at 4 weeks and again at 12 weeks.',
  },
  {
    question:
      'Can Kirkpatrick\u2019s model be applied to informal mentoring, not just formal training?',
    answer:
      'Absolutely. The four levels are not limited to classroom training events. If you are mentoring an apprentice on cable management techniques, you can evaluate at all four levels. Level 1: Does the apprentice find your guidance helpful and clear? Level 2: Can they now explain the principles of good cable management? Level 3: Are they actually applying those principles on site when you are not watching? Level 4: Has the quality of their installations improved measurably (fewer snag list items, fewer remedial visits)? Applying the model to mentoring helps you move beyond "did they enjoy the session?" to "did it actually make a difference?".',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which level of Kirkpatrick\u2019s model answers the question "Did they enjoy it?"',
    options: [
      'Level 1 — Reaction',
      'Level 2 — Learning',
      'Level 3 — Behaviour',
      'Level 4 — Results',
    ],
    correctAnswer: 0,
    explanation:
      'Level 1 (Reaction) measures participants\u2019 immediate response to the training: Did they find it useful? Was it well delivered? Did they enjoy it? This is the most commonly measured level but provides the least evidence of training effectiveness.',
  },
  {
    id: 2,
    question: 'A pre-test and post-test comparison measures which Kirkpatrick level?',
    options: [
      'Level 1 — Reaction',
      'Level 2 — Learning',
      'Level 3 — Behaviour',
      'Level 4 — Results',
    ],
    correctAnswer: 1,
    explanation:
      'Pre/post testing measures Level 2 — Learning. By comparing what participants knew before the training with what they know afterwards, you can determine whether the training successfully increased knowledge or skills.',
  },
  {
    id: 3,
    question:
      'A supervisor observes an electrician six weeks after a refresher course to see if they are applying what they learned. This is evaluation at:',
    options: [
      'Level 1 — Reaction',
      'Level 2 — Learning',
      'Level 3 — Behaviour',
      'Level 4 — Results',
    ],
    correctAnswer: 2,
    explanation:
      'Observing whether learners apply training on the job weeks after the event measures Level 3 — Behaviour. This is the critical level that connects learning to workplace practice, and it is where most evaluation falls down.',
  },
  {
    id: 4,
    question:
      'A company measures that rework costs have decreased by 15% since implementing a new training programme. This is evaluation at:',
    options: [
      'Level 1 — Reaction',
      'Level 2 — Learning',
      'Level 3 — Behaviour',
      'Level 4 — Results',
    ],
    correctAnswer: 3,
    explanation:
      'Measuring tangible organisational outcomes such as reduced rework, fewer incidents, or improved customer satisfaction is Level 4 — Results. This is the most powerful evidence of training effectiveness but also the most difficult to measure and attribute directly to training.',
  },
  {
    id: 5,
    question: 'Why is it a problem if evaluation stops at Level 1?',
    options: [
      'Because Level 1 data is always inaccurate',
      'Because enjoying training does not mean you learned anything or will change your behaviour',
      'Because Level 1 is too expensive to implement',
      'Because feedback forms are illegal',
    ],
    correctAnswer: 1,
    explanation:
      'The fundamental limitation of Level 1 is that reaction does not predict learning or behaviour change. Research consistently shows that people can enjoy a training session, rate it highly, and still not learn anything or change their on-site behaviour. Level 1 tells you about the training experience, not its effectiveness.',
  },
  {
    id: 6,
    question: 'Kirkpatrick\u2019s model was first published in:',
    options: ['1979', '1959', '1999', '2010'],
    correctAnswer: 1,
    explanation:
      'Donald Kirkpatrick first published his four-level model in 1959 as a series of articles in the US Training and Development Journal. Despite being over sixty years old, the model remains the most widely used framework for training evaluation worldwide.',
  },
  {
    id: 7,
    question: 'Which of the following is the best example of a Level 3 evaluation method?',
    options: [
      'A feedback form completed immediately after training',
      'A written test at the end of the training day',
      'A site observation four weeks after training to check if new practices are being applied',
      'A review of company accident statistics for the past year',
    ],
    correctAnswer: 2,
    explanation:
      'Level 3 (Behaviour) requires observing whether learners have transferred training to their workplace practice. A site observation four weeks after training specifically checks whether the new behaviours taught in training are being applied on the job — which is the core question at Level 3.',
  },
  {
    id: 8,
    question:
      'A company spends thousands of pounds on annual training but never checks whether on-site behaviour changes. The biggest risk is:',
    options: [
      'The training might be too expensive',
      'The trainers might not be qualified',
      'The company is investing in training that may not be making any difference to safety or quality',
      'The apprentices might complain about the training',
    ],
    correctAnswer: 2,
    explanation:
      'Without evaluating at Level 3 (Behaviour) or Level 4 (Results), an organisation has no way of knowing whether its training investment is actually improving performance, reducing incidents, or increasing quality. The company could be spending significant money on training that makes people feel good (Level 1) but changes nothing on site.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Describe the four levels of Kirkpatrick\u2019s training evaluation model and what each measures',
  'Explain why Level 1 (Reaction) is insufficient as the sole measure of training effectiveness',
  'Design evaluation methods for Levels 2 and 3 in an electrical training context',
  'Identify why most training evaluation fails at Level 3 (Behaviour) and how to address this',
  'Give construction-specific examples of Level 4 (Results) outcomes',
  'Apply Kirkpatrick\u2019s model to evaluate both formal training and informal mentoring activities',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function MDModule4Section3() {
  useSEO({
    title:
      'Kirkpatrick\u2019s Four Levels of Training Evaluation | Module 4: Assessment & Evaluation',
    description:
      'Reaction, Learning, Behaviour, Results — evaluating training effectiveness beyond happy sheets using Kirkpatrick\u2019s four-level model for electrical mentors.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assessment &amp; Evaluation
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <BarChart3 className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 4 &middot; SECTION 3
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Kirkpatrick&rsquo;s Four Levels of Training Evaluation
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Moving beyond &ldquo;happy sheets&rdquo; to evaluate whether training actually changes
            behaviour and delivers measurable outcomes on site.
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Level 1 (Reaction): Did they enjoy it? &mdash; feedback forms, verbal responses
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Level 2 (Learning): Did they learn? &mdash; pre/post tests, knowledge checks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Level 3 (Behaviour): Are they doing it on the job? &mdash; observation weeks later
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Level 4 (Results): What was the measurable outcome? &mdash; reduced rework, fewer
                  incidents
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Most training evaluation stops at Level 1, which tells you nothing about
                  effectiveness
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Companies invest thousands in training without checking if it changes on-site
                  behaviour
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Mentors who understand evaluation can demonstrate the value of their development
                  work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>Poor evaluation leads to repeating ineffective training year after year</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — Level 1: Reaction                              */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Level 1 &mdash; Reaction: &ldquo;Did They Enjoy It?&rdquo;
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Donald Kirkpatrick first published his four-level model in 1959 as a series of
              articles in the US <em>Training and Development Journal</em>. Despite being over sixty
              years old, it remains the most widely used framework for evaluating training
              effectiveness worldwide. The model is deceptively simple: four levels, each building
              on the one before, each progressively harder to measure but progressively more
              meaningful.
            </p>

            <p className="text-white text-base leading-relaxed">
              Level 1 asks the most basic evaluation question:{' '}
              <strong>how did participants react to the training?</strong> Did they find it
              relevant? Was the trainer engaging? Did they feel the time was well spent? This is
              measured through feedback forms (often called &ldquo;happy sheets&rdquo; or
              &ldquo;smile sheets&rdquo;), verbal feedback at the end of a session, or post-training
              surveys.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <SmilePlus className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Common Level 1 Methods</h3>
              </div>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Feedback forms:</strong> Rating scales (1&ndash;5 or 1&ndash;10) on
                    aspects such as content relevance, trainer knowledge, pace, and facilities.
                    Quick to complete, easy to analyse, but highly susceptible to social
                    desirability bias.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Verbal feedback:</strong> Asking participants at the end of a session
                    what they found most and least useful. More spontaneous than forms but harder to
                    record and analyse systematically.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Net Promoter Score:</strong> &ldquo;On a scale of 0&ndash;10, how likely
                    are you to recommend this training to a colleague?&rdquo; A single metric that
                    captures overall satisfaction.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elec-yellow text-sm font-semibold mb-2">
                    Limitations of Relying Solely on Level 1
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Level 1 data is seductive because it is almost always positive &mdash; people
                    tend to rate training favourably when asked immediately afterwards. But research
                    consistently shows that <strong>reaction does not predict learning</strong>. A
                    participant can thoroughly enjoy a training session, rate it five stars, and
                    still not learn anything meaningful or change their behaviour on site.
                    Conversely, challenging, uncomfortable training that receives mediocre reaction
                    scores may produce the deepest learning. If your entire evaluation strategy is
                    Level 1, you are measuring the quality of the experience, not the quality of the
                    outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 02 — Level 2: Learning                              */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Level 2 &mdash; Learning: &ldquo;Did They Learn?&rdquo;
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Level 2 moves beyond how participants <em>felt</em> about the training to ask whether
              they actually <strong>learned</strong> anything. Did their knowledge increase? Did
              they acquire new skills? Can they now do something they could not do before? This is a
              fundamentally more meaningful question than Level 1, because it measures the direct
              output of the training event.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Methods for Evaluating Learning
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                The most robust approach is <strong>pre/post testing</strong>: administer a
                knowledge test or practical assessment before the training begins, then administer
                the same (or an equivalent) test afterwards. The difference in scores represents the
                learning gain attributable to the training. Other Level 2 methods include:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Knowledge checks:</strong> Short quizzes during or after the training to
                    test comprehension of key concepts. These can be formal or informal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Practical demonstrations:</strong> Asking learners to demonstrate a
                    skill they have been taught &mdash; for example, performing a safe isolation
                    procedure after a refresher session.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Case studies or scenarios:</strong> Presenting learners with a realistic
                    scenario and asking them to apply what they have learned to solve it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Comparing before and after:</strong> If the training involves a
                    practical skill, comparing the quality of work before and after the training
                    (e.g. the neatness of cable management, the accuracy of test readings).
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Level 2 Is Necessary but Not Sufficient
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Level 2 confirms that learning has occurred, but it does not confirm that the
                learner will apply that learning in their actual work. A learner might score 100% on
                a post-training knowledge test about safe isolation but still take shortcuts on site
                because of time pressure, habit, or peer influence. This is the gap between knowing
                and doing, and it is why evaluation must continue to Level 3.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Think of it this way: after a safe isolation refresher, an electrician can correctly
                describe the safe isolation procedure, list all the required steps, and explain why
                each step matters. That is Level 2 &mdash; they have learned. But will they actually
                prove dead with a voltage indicator <em>every single time</em> on a busy site with a
                tight deadline? That is Level 3 &mdash; behaviour.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Level 3: Behaviour                             */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Level 3 &mdash; Behaviour: &ldquo;Are They Doing It on the Job?&rdquo;
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Level 3 is where training evaluation becomes genuinely meaningful &mdash; and where
              most evaluation falls down. This level asks:{' '}
              <strong>has the training changed what people actually do on the job?</strong> Not what
              they know, not how they feel about the training, but whether their observable
              workplace behaviour has changed as a result of what they learned.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Why Level 3 Is Where Most Evaluation Fails
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Measuring behaviour change is significantly harder than measuring reaction or
                learning. It requires returning to the workplace weeks or months after the training
                event and observing whether the new behaviours are being applied. This takes time,
                effort, and organisational commitment that many employers are unwilling or unable to
                provide.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                There are also multiple reasons why learning (Level 2) might not transfer to
                behaviour (Level 3):
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Time pressure:</strong> The learner knows the correct procedure but
                    takes shortcuts because the site programme demands speed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Peer influence:</strong> The learner&rsquo;s colleagues do not follow
                    the trained procedure, creating social pressure to conform to existing practices
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Lack of reinforcement:</strong> No one follows up after training to
                    encourage and support the new behaviour
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Environmental barriers:</strong> The workplace does not support the new
                    behaviour (e.g. the correct tools are not available)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Methods for Evaluating Behaviour Change
              </h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Workplace observation:</strong> A mentor, supervisor, or assessor visits
                    the site 4&ndash;12 weeks after training and observes whether the trained
                    behaviours are being applied
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Peer feedback:</strong> Colleagues report on whether they have noticed
                    changes in the learner&rsquo;s working practices
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Supervisor reports:</strong> Line managers or site supervisors provide
                    structured feedback on whether behaviours have changed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Self-assessment:</strong> The learner reflects on whether and how they
                    have applied the training (less reliable but still useful when combined with
                    other methods)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: Safe Isolation Refresher
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                A company runs an annual safe isolation refresher for all its electricians. The
                training receives excellent Level 1 scores (&ldquo;very relevant, well
                delivered&rdquo;) and all participants pass the Level 2 knowledge check. But six
                weeks later, a site manager observes two electricians working on a circuit without
                proving dead first.
              </p>
              <p className="text-white text-sm leading-relaxed">
                This is a Level 3 failure &mdash; the training increased knowledge but did not
                change behaviour. The company now needs to investigate <em>why</em>: Is it time
                pressure? Peer culture (&ldquo;we never bother on a small job&rdquo;)? Lack of
                available voltage indicators? Understanding the barrier to behaviour change is
                essential because simply repeating the same training will produce the same result.
                The issue is not knowledge &mdash; it is transfer.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Level 4: Results                               */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Level 4 &mdash; Results: &ldquo;What Was the Measurable Outcome?&rdquo;
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Level 4 is the ultimate test of training effectiveness:{' '}
              <strong>
                did the training produce measurable outcomes that matter to the organisation?
              </strong>{' '}
              This is where training connects to business results &mdash; reduced rework, fewer
              incidents, improved first-time fix rates, higher customer satisfaction, lower costs,
              increased productivity.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Examples of Level 4 Outcomes in Construction
                </h3>
              </div>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Reduced rework:</strong> After a cable management training programme,
                    snag list items related to cable routing decrease by 30% over six months
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Fewer incidents:</strong> After enhanced safe isolation training with
                    Level 3 follow-up, near-miss reports related to live working decrease from 12
                    per quarter to 3 per quarter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Improved first-time fix rates:</strong> After a fault-finding training
                    programme, the percentage of call-backs requiring a second visit drops from 15%
                    to 5%
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Customer satisfaction:</strong> After a communication skills programme
                    for domestic electricians, positive customer review scores increase from 4.2 to
                    4.7 out of 5
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Cost savings:</strong> After a material wastage awareness programme,
                    cable wastage per project decreases by 20%, saving the company an estimated
                    &pound;15,000 per year
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">The Attribution Challenge</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The biggest difficulty with Level 4 evaluation is attribution: how do you know the
                improved results were caused by the training rather than by other factors? If
                near-miss incidents decreased after a training programme, was it because of the
                training, or because the company also hired a new health and safety manager, or
                because the types of projects changed, or simply because of seasonal variation?
              </p>
              <p className="text-white text-sm leading-relaxed">
                In practice, perfect attribution is rarely possible. What you can do is gather
                converging evidence: if Level 2 shows learning occurred, Level 3 shows behaviour
                changed, and Level 4 shows results improved, it is reasonable to conclude that the
                training contributed to the outcome &mdash; even if you cannot prove it was the sole
                cause. This is why evaluating at multiple levels is so important: each level
                strengthens the evidence chain.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: The Cost of Stopping at Level 1
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                An electrical contractor spends &pound;25,000 per year on external training courses
                for its workforce. Every course receives positive feedback forms (Level 1). The
                company proudly reports that &ldquo;95% of participants rated training as good or
                excellent.&rdquo; But no one checks whether knowledge has increased (Level 2),
                whether on-site practices have changed (Level 3), or whether the company&rsquo;s
                rework rates, incident rates, or customer satisfaction scores have improved (Level
                4).
              </p>
              <p className="text-white text-sm leading-relaxed">
                Three years and &pound;75,000 later, the company&rsquo;s rework rate is unchanged,
                incident reports have not decreased, and customer complaints about quality remain
                constant. The training <em>felt</em> effective because the Level 1 data was
                positive, but it <em>was not</em> effective because it did not change behaviour or
                results. The company would have been better served by spending less on training and
                more on post-training follow-up, observation, and reinforcement &mdash; in other
                words, investing in Levels 3 and 4 rather than repeating Level 1.
              </p>
            </div>

            {/* Kirkpatrick Framework Summary Box */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Kirkpatrick&rsquo;s Four Levels &mdash; Summary (Kirkpatrick, 1959)
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0">
                    <span className="text-rose-400 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Reaction</p>
                    <p className="text-white text-xs leading-relaxed">
                      Did participants enjoy the training? Was it relevant? Measured by feedback
                      forms, verbal responses. Easy to collect, but does not predict effectiveness.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0">
                    <span className="text-rose-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Learning</p>
                    <p className="text-white text-xs leading-relaxed">
                      Did knowledge or skills increase? Measured by pre/post tests, demonstrations,
                      knowledge checks. Confirms learning occurred but not that it will transfer.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0">
                    <span className="text-rose-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Behaviour</p>
                    <p className="text-white text-xs leading-relaxed">
                      Are learners applying the training on the job? Measured by workplace
                      observation, peer feedback, supervisor reports weeks after training. Where
                      most evaluation fails.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0">
                    <span className="text-rose-400 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Results</p>
                    <p className="text-white text-xs leading-relaxed">
                      Did the training produce measurable organisational outcomes? Reduced rework,
                      fewer incidents, improved quality, cost savings. Hardest to measure and
                      attribute.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── FAQs ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quiz ────────────────────────────────────────────────── */}
        <Quiz questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:text-white hover:bg-white/5 touch-manipulation min-h-[44px]"
          >
            <Link to="../md-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../md-module-4-section-4">
              Assessment Decisions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
