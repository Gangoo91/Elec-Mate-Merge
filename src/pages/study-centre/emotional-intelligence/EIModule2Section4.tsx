import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  Activity,
  Wind,
  RefreshCcw,
  Quote,
  HelpCircle,
  Brain,
  Heart,
  Sun,
  Moon,
  Lightbulb,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions                                              */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question: 'What is the purpose of a daily emotional check-in?',
    options: [
      'To diagnose mental health conditions',
      'To briefly notice and label your current emotional state so you can respond to it consciously',
      'To suppress negative emotions before they affect your work',
      'To record everything that happened during the day in detail',
    ],
    correctIndex: 1,
    explanation:
      'A daily emotional check-in is a brief, purposeful pause to notice what you are feeling and label it. It takes only a few seconds and its purpose is to bring unconscious emotional states into awareness so you can choose how to respond, rather than being driven by emotions you have not recognised.',
  },
  {
    question: "Gibbs' Reflective Cycle has six stages. What is the correct order?",
    options: [
      'Evaluation, Description, Feelings, Action Plan, Analysis, Conclusion',
      'Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan',
      'Feelings, Analysis, Description, Conclusion, Evaluation, Action Plan',
      'Action Plan, Conclusion, Analysis, Evaluation, Feelings, Description',
    ],
    correctIndex: 1,
    explanation:
      "Gibbs' Reflective Cycle follows six stages in order: Description (what happened?), Feelings (what were you thinking and feeling?), Evaluation (what was good and bad?), Analysis (what sense can you make of it?), Conclusion (what else could you have done?), and Action Plan (what will you do next time?).",
  },
  {
    question:
      'Viktor Frankl argued that the "space between stimulus and response" is where our freedom lies. What is the key self-awareness skill needed to access that space?',
    options: [
      'The ability to suppress all emotions instantly',
      'The ability to pause and notice your internal state before reacting automatically',
      'The ability to avoid all triggering situations completely',
      'The ability to predict what other people will do',
    ],
    correctIndex: 1,
    explanation:
      "Frankl's insight is that we can choose our response rather than reacting automatically — but only if we can pause and notice what is happening internally. That moment of noticing (self-awareness) is what creates the space. Every technique in this section — check-ins, body scanning, breathing, and reflective practice — is designed to strengthen that capacity to pause and notice.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I do not have time for daily self-awareness practices. What is the minimum that works?',
    answer:
      'The minimum effective dose is remarkably small. Three emotional check-ins per day — each lasting five to ten seconds — are enough to build meaningful self-awareness over time. You do not need to meditate, journal, or set aside dedicated time. Simply ask yourself "What am I feeling right now?" at three anchor points: morning, midday, and evening. That is thirty seconds total. If you can add one body scan per day (two minutes in the van) and one brief reflection in the evening (one minute while brushing your teeth), you are investing less than four minutes a day in a skill that will improve every relationship and decision you make.',
  },
  {
    question: 'Body scanning feels strange and I struggle to notice anything. Is it still working?',
    answer:
      "Yes. Difficulty noticing bodily sensations is extremely common when you first start, especially if you have spent years ignoring or overriding your body's signals (which is common in physically demanding trades). Think of it like training a new muscle — at first you cannot feel it working, but the neural pathways are forming. Keep practising, and after a week or two you will start noticing sensations you previously missed. Some people find it helpful to start with the hands (where sensation is most accessible) and work outward from there.",
  },
  {
    question: 'Is reflective practice the same as overthinking or dwelling on the past?',
    answer:
      'No — and this distinction is crucial. Reflective practice is structured, time-limited, and forward-looking. You describe what happened, explore what you felt, evaluate what went well and what did not, analyse why, draw a conclusion, and create an action plan. The process takes a few minutes and ends with a concrete intention for next time. Overthinking, by contrast, is unstructured, open-ended, and backward-looking — replaying the same event repeatedly without reaching any conclusion or action. If your reflection leads to a plan, it is healthy practice. If it leads to a spiral, it is rumination.',
  },
  {
    question: 'How long does it take to build self-awareness as a genuine habit?',
    answer:
      'Research on habit formation (Lally et al., 2010) suggests that it takes an average of 66 days for a new behaviour to become automatic, though the range is wide — from 18 to 254 days depending on the person and the complexity of the habit. The good news is that emotional check-ins are simple behaviours, which tend to form into habits more quickly. Most people who practise daily check-ins consistently for three to four weeks report that the habit begins to feel natural and automatic. The key is consistency — doing it every day, even imperfectly, rather than doing it perfectly once a week.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The recommended three-checkpoint daily emotional check-in occurs at which moments?',
    options: [
      'Before breakfast, after lunch, and before bed',
      'Morning (in the van), midday (lunch break), and evening (driving home)',
      'Only when something goes wrong during the day',
      'Every hour on the hour throughout the working day',
    ],
    correctAnswer: 1,
    explanation:
      'The three-checkpoint approach anchors the check-in to natural transitions in the working day: the morning commute (before arriving on site), the lunch break (midday pause), and the evening commute (end of day reflection). These moments already have natural pauses, making the habit easier to maintain.',
  },
  {
    id: 2,
    question: 'During a body scan, the primary goal is to:',
    options: [
      'Diagnose physical illness or injury',
      'Relax every muscle to the point of sleep',
      'Notice physical sensations without judgement, using them as data about your emotional state',
      'Tense each muscle group as hard as possible then release',
    ],
    correctAnswer: 2,
    explanation:
      'A body scan is about noticing — bringing awareness to physical sensations (tension, tightness, warmth, heaviness) without trying to change them or judge them. The purpose is to gather data about your emotional state through its physical expression in the body.',
  },
  {
    id: 3,
    question: 'The three-minute breathing space from MBSR/MBCT involves which three steps?',
    options: [
      'Inhale deeply, hold your breath, exhale slowly',
      'Awareness (notice current experience), Gathering (focus on the breath), Expanding (widen awareness to the whole body)',
      'Count to ten, visualise a calm place, open your eyes',
      'Breathe through the left nostril, then the right, then both',
    ],
    correctAnswer: 1,
    explanation:
      'The three-minute breathing space has three distinct phases: (1) Awareness — noticing your current thoughts, feelings, and bodily sensations; (2) Gathering — narrowing attention to the physical sensation of breathing; (3) Expanding — widening awareness from the breath to the whole body and the broader environment.',
  },
  {
    id: 4,
    question: "Gibbs' Reflective Cycle was developed by:",
    options: [
      'Daniel Goleman in 1995',
      'Viktor Frankl in 1946',
      'Graham Gibbs in 1988',
      'Jon Kabat-Zinn in 1979',
    ],
    correctAnswer: 2,
    explanation:
      'Graham Gibbs published his Reflective Cycle in 1988 as part of his book "Learning by Doing". It was designed to support experiential learning by providing a structured framework for reflecting on experiences.',
  },
  {
    id: 5,
    question:
      'In Gibbs\' Reflective Cycle, which stage asks "What sense can you make of the situation?"',
    options: ['Description', 'Evaluation', 'Analysis', 'Conclusion'],
    correctAnswer: 2,
    explanation:
      'The Analysis stage is where you make sense of the experience by drawing on theory, prior experience, and broader context. It goes deeper than Evaluation (which simply judges what was good and bad) by asking why things happened the way they did.',
  },
  {
    id: 6,
    question:
      'Viktor Frankl\'s book "Man\'s Search for Meaning" (1946) draws primarily on his experiences during:',
    options: [
      'The Vietnam War',
      'The Great Depression of the 1930s',
      'The Holocaust and his time in Nazi concentration camps',
      'His work as a university professor in Vienna',
    ],
    correctAnswer: 2,
    explanation:
      'Frankl was an Austrian psychiatrist who survived multiple Nazi concentration camps, including Auschwitz and Dachau. His book describes his experiences and the psychological insights he gained, including the observation that humans retain the freedom to choose their attitude in any circumstances.',
  },
  {
    id: 7,
    question: 'Jon Kabat-Zinn is the founder of:',
    options: [
      'Rational Emotive Behaviour Therapy (REBT)',
      'The Johari Window',
      'Mindfulness-Based Stress Reduction (MBSR)',
      'The Dunning-Kruger effect',
    ],
    correctAnswer: 2,
    explanation:
      'Jon Kabat-Zinn founded the Mindfulness-Based Stress Reduction (MBSR) programme at the University of Massachusetts Medical Centre in 1979. MBSR brought mindfulness practices from Buddhist contemplative traditions into mainstream Western medicine and psychology.',
  },
  {
    id: 8,
    question:
      'Which of the following best describes the purpose of an "action plan" stage in reflective practice?',
    options: [
      'To punish yourself for what went wrong',
      'To identify a specific, concrete intention for how you will handle a similar situation next time',
      'To forget the experience and move on without thinking about it again',
      'To write a formal report for your supervisor',
    ],
    correctAnswer: 1,
    explanation:
      'The action plan stage is forward-looking and practical. It translates the insight gained from reflection into a specific intention: "Next time this happens, I will..." This closes the reflective loop by connecting past experience to future behaviour, which is the whole purpose of reflective practice.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Implement a three-checkpoint daily emotional check-in tailored to the construction working day',
  'Perform a two-minute body scan to identify physical signals of emotional states',
  'Practise the three-minute breathing space from MBSR/MBCT as a mindful pause',
  "Apply all six stages of Gibbs' Reflective Cycle to reflect on an emotional experience",
  "Explain Viktor Frankl's concept of the space between stimulus and response",
  'Design a personal self-awareness action plan that connects daily habits to long-term growth',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function EIModule2Section4() {
  useSEO({
    title: 'Building Self-Awareness Habits | Module 2: Self-Awareness',
    description:
      "Daily emotional check-ins, body scanning, mindful pauses, Gibbs' Reflective Cycle, Viktor Frankl's insight, and building a personal self-awareness action plan.",
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
            <Link to="../ei-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Self-Awareness
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Sparkles className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 4
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Self-Awareness Habits
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Practical daily habits and structured reflection techniques that turn self-awareness
            from an abstract concept into a concrete, sustainable practice.
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
                  Three brief check-ins per day (morning, midday, evening) build self-awareness over
                  time
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Body scanning uses physical sensations to detect emotions before your conscious
                  mind labels them
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Gibbs&rsquo; Reflective Cycle provides a six-stage structure for learning from
                  emotional experiences
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Viktor Frankl&rsquo;s &ldquo;space&rdquo; between stimulus and response is where
                  self-awareness lives
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
                  Self-awareness is a skill that atrophies without practice — daily habits keep it
                  active
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Brief, consistent practices are more effective than occasional deep reflection
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  These techniques are designed to fit into a construction worker&rsquo;s schedule
                  with no extra time needed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Building habits now creates the foundation for Module 3: Self-Regulation
                </span>
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
        {/*  SECTION 01 — Daily Emotional Check-Ins                      */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Daily Emotional Check-Ins</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              A daily emotional check-in is the simplest and most impactful self-awareness habit you
              can build. It requires no equipment, no extra time, and no special training &mdash;
              just the willingness to pause briefly and ask yourself an honest question. The
              three-checkpoint approach anchors the practice to natural transitions in your working
              day, making it easy to remember and sustain.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Three Checkpoints</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">Morning Check-In (In the Van)</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>When:</strong> During your morning commute, before you arrive on site.
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Ask:</strong> &ldquo;How am I feeling this morning? What mood am I
                    carrying from home? Is there anything on my mind that might affect how I
                    interact with people today?&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Why:</strong> Most people arrive on site already carrying an emotional
                    state from their home life &mdash; a stressful morning with the children, an
                    argument with a partner, poor sleep, or simply being in a good or bad mood. If
                    you do not recognise this, it leaks into your interactions without your
                    knowledge. An electrician who is already irritable from a bad night&rsquo;s
                    sleep is far more likely to snap at the first minor frustration on site.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Example label:</strong> &ldquo;I am feeling tense and short-tempered
                    this morning. I did not sleep well. I need to be aware that my fuse is shorter
                    than usual today.&rdquo;
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">Midday Check-In (Lunch Break)</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>When:</strong> During your lunch break, ideally in the first minute
                    after sitting down.
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Ask:</strong> &ldquo;What has been my dominant emotion this morning? Has
                    anything shifted my mood since I arrived? Did I react to anything in a way I
                    wish I had not?&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Why:</strong> The midday check-in catches emotional shifts that have
                    occurred during the morning. Perhaps you started the day in a good mood but an
                    interaction with the project manager left you frustrated. Or perhaps you were
                    dreading a particular task that turned out to be straightforward, leaving you
                    feeling relieved and confident.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Example label:</strong> &ldquo;I have been feeling increasingly
                    frustrated this morning because the delivery was late and it has thrown off my
                    programme. I need to let go of that frustration and refocus on what I can
                    control this afternoon.&rdquo;
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">
                      Evening Check-In (Driving Home)
                    </p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>When:</strong> During your evening commute, before you walk through your
                    front door.
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Ask:</strong> &ldquo;What emotion stands out from today? What triggered
                    it? Am I carrying anything from work that I should leave in the van rather than
                    take home?&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Why:</strong> The evening check-in serves two purposes. First, it builds
                    your understanding of emotional patterns by linking events to emotions over
                    time. Second, it creates a boundary between work and home &mdash; a moment to
                    consciously set down any stress, frustration, or negativity from the day so that
                    it does not contaminate your home life.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Example label:</strong> &ldquo;I am feeling satisfied today &mdash; the
                    consumer unit installation went well and the client was pleased. But I am still
                    carrying some tension from the disagreement with the plumber this morning. I am
                    going to leave that in the van.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Making It Stick</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The biggest challenge with emotional check-ins is not doing them &mdash; it is
                remembering to do them. Habit research (James Clear, <em>Atomic Habits</em>, 2018)
                shows that the most reliable way to build a new habit is to attach it to an existing
                one. Here are practical anchors for construction workers:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Morning:</strong> &ldquo;When I start the van engine, I check in with
                    myself.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Midday:</strong> &ldquo;When I open my lunch box, I check in with
                    myself.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Evening:</strong> &ldquo;When I turn off the van engine at home, I check
                    in with myself.&rdquo;
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                These anchors use the &ldquo;habit stacking&rdquo; technique: attaching the new
                behaviour to something you already do every day, at the same time, in the same
                context. Over three to four weeks, the check-in becomes automatic.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Body Scanning                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Body Scanning</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              As we covered in Section 1, your body registers emotions before your conscious mind
              labels them. A body scan is a systematic technique for tuning into these physical
              signals &mdash; noticing areas of tension, discomfort, heaviness, or warmth that may
              indicate an underlying emotional state. The full body scan used in mindfulness
              programmes can take 20 to 45 minutes, but the version here is designed for the
              realities of a construction worker&rsquo;s day: it takes approximately two minutes and
              can be done sitting in the van, on a break, or in any quiet moment.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                The Two-Minute Body Scan (Construction Version)
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Settle (15 seconds)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Sit comfortably. Close your eyes if you feel comfortable doing so, or soften
                      your gaze. Take two slow, deep breaths to signal to your nervous system that
                      you are pausing.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Head and Face (20 seconds)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Notice your forehead &mdash; is it furrowed or relaxed? Your jaw &mdash; is it
                      clenched or loose? Your neck &mdash; is it tight or easy? Simply notice
                      without trying to change anything.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      Shoulders and Arms (20 seconds)
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Are your shoulders raised up towards your ears (a classic stress signal)? Is
                      there tension across your upper back? Are your hands clenched or open?
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Chest and Stomach (20 seconds)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Is your chest tight or open? Is your breathing shallow or deep? Is there any
                      churning or heaviness in your stomach? The chest and gut are two of the
                      body&rsquo;s most reliable emotional barometers.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">5</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Legs and Feet (20 seconds)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Are your legs restless or still? Is there tension in your thighs? Are you
                      bouncing your feet (a common anxiety signal)? Can you feel the ground beneath
                      you?
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">6</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Label (15 seconds)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Based on what you noticed, label your overall emotional state. &ldquo;My
                      shoulders are up and my jaw is tight &mdash; I am feeling tense, probably
                      anxious about this afternoon&rsquo;s inspection.&rdquo; Open your eyes and
                      continue your day with this awareness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">When to Use the Body Scan</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The body scan works best as a complement to your emotional check-ins, but you can
                also use it as a standalone tool in specific situations:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Before a stressful task:</strong> A quick scan before a complex
                    installation or a difficult client meeting gives you data about your current
                    state.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>After a conflict or frustrating event:</strong> Scanning your body after
                    a tense interaction helps you identify and process the residual physical
                    tension.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>When you feel &ldquo;off&rdquo; but cannot name why:</strong> Sometimes
                    you know something is not right but cannot pinpoint the feeling. The body scan
                    often reveals the answer through physical sensations.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Mindful Pauses                                 */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Mindful Pauses</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The three-minute breathing space is one of the most widely taught techniques in
              Mindfulness-Based Stress Reduction (MBSR) and Mindfulness-Based Cognitive Therapy
              (MBCT). MBSR was developed by Jon Kabat-Zinn at the University of Massachusetts
              Medical Centre in 1979, and has since been the subject of hundreds of clinical studies
              demonstrating its effectiveness for stress reduction, emotional regulation, and
              wellbeing.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wind className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  The Three-Minute Breathing Space
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                The breathing space has three distinct phases, each lasting approximately one
                minute. Think of it as an hourglass shape: you start wide (noticing your whole
                experience), narrow to a single focus (the breath), then widen again (to the whole
                body and beyond).
              </p>
              <div className="space-y-3">
                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">
                    Phase 1: Awareness (1 minute)
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Pause whatever you are doing. Take a deliberate, upright posture. Ask yourself:
                    &ldquo;What is going on for me right now?&rdquo; Notice your thoughts (without
                    trying to change them), your feelings (labelling them if you can), and your
                    bodily sensations (scanning briefly for areas of tension or discomfort). You are
                    not trying to fix anything &mdash; you are simply becoming aware of your current
                    experience.
                  </p>
                </div>
                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">
                    Phase 2: Gathering (1 minute)
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Narrow your attention to a single focus: the physical sensation of breathing.
                    Feel the breath entering through your nostrils, the rise and fall of your chest
                    or abdomen. If your mind wanders (which it will), gently bring it back to the
                    breath without judgement. This phase calms the nervous system and creates a
                    grounding anchor.
                  </p>
                </div>
                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">
                    Phase 3: Expanding (1 minute)
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Widen your attention from the breath to the whole body. Feel your body as a
                    whole &mdash; your posture, the contact between your feet and the floor, the
                    sensations in your face and hands. Then expand further to take in your
                    surroundings &mdash; the sounds around you, the temperature, the space you are
                    in. You are re-entering your day with a wider, calmer awareness.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Adapting the Breathing Space for Site Use
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                You do not need a quiet room or a meditation cushion. The breathing space was
                specifically designed to be used in everyday situations, including high-pressure
                environments. Here are practical adaptations for construction professionals:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>In the van:</strong> Do the full three minutes before starting the
                    engine after your lunch break. Windows up, radio off, eyes closed or softened.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>On site:</strong> A one-minute version works when you are about to enter
                    a stressful situation. One breath for awareness, one for gathering, one for
                    expanding. Nobody around you even needs to know you are doing it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>After a trigger:</strong> If something has wound you up, step away for
                    three minutes (go to the van, the welfare unit, or outside). Use the breathing
                    space to reset before you respond.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">The Science Behind It</p>
                  <p className="text-white text-sm leading-relaxed">
                    Focused breathing activates the parasympathetic nervous system (the &ldquo;rest
                    and digest&rdquo; system), which counteracts the sympathetic nervous system (the
                    &ldquo;fight or flight&rdquo; system). Research published in{' '}
                    <em>Frontiers in Human Neuroscience</em> shows that just three minutes of
                    focused breathing reduces cortisol levels, lowers heart rate, and increases
                    activity in the prefrontal cortex &mdash; the part of the brain responsible for
                    rational decision-making and emotional regulation. You are not just calming
                    down; you are literally shifting which part of your brain is in charge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Gibbs' Reflective Cycle                        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Gibbs&rsquo; Reflective Cycle</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Published by Graham Gibbs in 1988 as part of his book <em>Learning by Doing</em>, the
              Reflective Cycle is a six-stage framework for structured reflection on experience. It
              is widely used in healthcare, education, and professional development because it
              provides a clear, repeatable process for extracting learning from any experience
              &mdash; especially emotionally significant ones.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Six Stages</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCcw className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">1. Description</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>What happened?</strong> Describe the situation factually, without
                    judgement or interpretation. Stick to the observable facts: who was involved,
                    what was said or done, when and where it happened.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">2. Feelings</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>What were you thinking and feeling?</strong> Be honest about your
                    emotional experience during the event. What did you feel before, during, and
                    after? Use the emotional granularity skills from Section 1 to be as precise as
                    possible.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">3. Evaluation</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>What was good and bad about the experience?</strong> Make a judgement
                    about what went well and what did not. This is a factual assessment, not a blame
                    exercise.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">4. Analysis</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>What sense can you make of the situation?</strong> This is the deepest
                    stage. Why did things happen the way they did? What factors were at play? Can
                    you connect this experience to anything you have learned about emotional
                    triggers, the ABC Model, or the Johari Window?
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">5. Conclusion</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>What else could you have done?</strong> Looking back, what alternatives
                    were available? What would have happened if you had responded differently? What
                    have you learned about yourself from this experience?
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-rose-400" />
                    <p className="text-white text-sm font-medium">6. Action Plan</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>If this happened again, what would you do?</strong> Create a specific,
                    concrete intention for next time. &ldquo;Next time I feel criticised in front of
                    the team, I will take a breath, remind myself that feedback is data not an
                    attack, and ask a clarifying question before responding.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Worked Example: Reflecting on a Difficult Interaction
              </h3>
              <div className="space-y-3 text-white text-sm">
                <div>
                  <p className="text-rose-400 text-xs font-semibold mb-1">1. Description</p>
                  <p className="leading-relaxed">
                    During a site walkthrough on Tuesday, the project manager pointed out that my
                    cable routing in the ground-floor corridor was not as neat as the specification
                    required and asked me to redo a section. Two other electricians were present.
                  </p>
                </div>
                <div>
                  <p className="text-rose-400 text-xs font-semibold mb-1">2. Feelings</p>
                  <p className="leading-relaxed">
                    I felt a rush of anger and humiliation. My face went hot. I felt singled out and
                    disrespected, especially because it was said in front of colleagues. Underneath
                    the anger, there was also embarrassment &mdash; I knew the section was not my
                    best work.
                  </p>
                </div>
                <div>
                  <p className="text-rose-400 text-xs font-semibold mb-1">3. Evaluation</p>
                  <p className="leading-relaxed">
                    What went badly: I responded defensively, saying &ldquo;It meets the
                    specification&rdquo; before properly looking at the section in question. This
                    came across as argumentative. What went well: I did not escalate further, and I
                    eventually agreed to redo the work.
                  </p>
                </div>
                <div>
                  <p className="text-rose-400 text-xs font-semibold mb-1">4. Analysis</p>
                  <p className="leading-relaxed">
                    My trigger was being criticised in front of others &mdash; a pattern I recognise
                    from Section 2 (perceived disrespect). My automatic belief (ABC Model) was
                    &ldquo;He is trying to make me look bad in front of the team.&rdquo; In reality,
                    he was probably just doing his job and the presence of my colleagues was
                    incidental, not deliberate.
                  </p>
                </div>
                <div>
                  <p className="text-rose-400 text-xs font-semibold mb-1">5. Conclusion</p>
                  <p className="leading-relaxed">
                    I could have taken a breath before responding (using Frankl&rsquo;s space
                    between stimulus and response). I could have looked at the section first and
                    then responded factually: &ldquo;Fair enough &mdash; I will sort that tomorrow
                    morning.&rdquo; This would have preserved my professionalism and the working
                    relationship.
                  </p>
                </div>
                <div>
                  <p className="text-rose-400 text-xs font-semibold mb-1">6. Action Plan</p>
                  <p className="leading-relaxed">
                    Next time I receive criticism in front of others, I will: (a) take one breath
                    before responding, (b) look at the issue being raised before saying anything,
                    and (c) respond to the content of the feedback, not the feeling of
                    embarrassment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Viktor Frankl's Insight                        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Viktor Frankl&rsquo;s Insight</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              We introduced Viktor Frankl&rsquo;s observation about the &ldquo;space between
              stimulus and response&rdquo; in Section 2. In this section, we explore how to
              <em> practise</em> expanding that space &mdash; how to make it wider and more
              accessible, even in high-pressure moments.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Quote className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm leading-relaxed italic mb-2">
                    &ldquo;Between stimulus and response there is a space. In that space is our
                    freedom to choose our response. In our response lies our growth and our
                    freedom.&rdquo;
                  </p>
                  <p className="text-rose-400 text-xs font-semibold">
                    &mdash; Viktor Frankl, <em>Man&rsquo;s Search for Meaning</em> (1946)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Frankl&rsquo;s Context</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Viktor Frankl was an Austrian psychiatrist who survived four Nazi concentration
                camps between 1942 and 1945, including Auschwitz. His wife, parents, and brother all
                perished. In the most dehumanising circumstances imaginable, Frankl observed that
                some prisoners maintained their dignity, compassion, and inner freedom while others
                did not.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                His conclusion was profound: even when everything external has been stripped away
                &mdash; freedom, comfort, family, health &mdash; the one thing that cannot be taken
                from you is your ability to choose your <em>attitude</em> towards your
                circumstances. The guards could control what happened to him (the stimulus), but
                they could not control his response. In that gap &mdash; that space &mdash; lay his
                freedom.
              </p>
              <p className="text-white text-sm leading-relaxed">
                If Frankl could find that space in a concentration camp, then finding it during a
                frustrating day on a construction site is certainly possible. The challenge is not
                the principle but the practice.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">How to Expand the Space</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Every technique covered in this module contributes to expanding the space between
                stimulus and response:
              </p>
              <ul className="text-white text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Emotional labelling</strong> (Section 1) creates a micro-pause. The act
                    of naming what you feel inserts a moment of cognition between the trigger and
                    your reaction. &ldquo;I notice I am feeling angry&rdquo; creates space; &ldquo;I
                    AM ANGRY&rdquo; does not.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Trigger recognition</strong> (Section 2) gives you early warning. When
                    you know your triggers, you can see them coming and prepare your response rather
                    than being ambushed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>The ABC Model</strong> (Section 2) gives you a framework for examining
                    your interpretation before acting on it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Body scanning</strong> (this section) provides physical early-warning
                    signals that an emotion is building before it reaches full intensity.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>The breathing space</strong> (this section) gives you a concrete
                    technique for creating physical and mental pause in the moment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Gibbs&rsquo; Reflective Cycle</strong> (this section) helps you learn
                    from experiences after the fact, so you are better prepared next time.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">The One-Breath Practice</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The simplest way to practise expanding Frankl&rsquo;s space is the one-breath
                practice. When you notice a trigger, take <strong>one deliberate breath</strong>
                before responding. Not three breaths. Not a minute of meditation. Just one
                conscious, intentional breath.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                During that single breath, ask yourself one question: &ldquo;
                <em>How do I want to respond to this?</em>&rdquo; Not &ldquo;How do I feel like
                responding?&rdquo; (which is the automatic reaction) but &ldquo;How do I{' '}
                <em>want</em> to respond?&rdquo; (which is the conscious choice).
              </p>
              <p className="text-white text-sm leading-relaxed">
                This practice is invisible to others, takes less than three seconds, and can be done
                in any situation. Over weeks and months of practice, the one-breath pause becomes
                instinctive &mdash; the space expands, and your freedom to choose your response
                grows with it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Your Self-Awareness Action Plan                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Your Self-Awareness Action Plan</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              You have now covered the complete self-awareness toolkit: understanding emotions,
              recognising triggers, identifying blind spots, and building daily habits. The
              challenge is not learning these techniques &mdash; it is making them stick. This
              section provides a structured action plan for integrating self-awareness into your
              daily working life, starting today.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Week-by-Week Implementation Plan
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">Week 1: Emotional Check-Ins</p>
                  <p className="text-white text-xs leading-relaxed">
                    Start with the three-checkpoint daily check-in (morning, midday, evening). Focus
                    only on this habit for the first week. Use the habit-stacking anchors (van
                    engine on, lunch box open, van engine off at home). Label your emotion with the
                    most precise word you can find. Do not try to change anything yet &mdash; just
                    notice.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">Week 2: Add Body Scanning</p>
                  <p className="text-white text-xs leading-relaxed">
                    Continue the daily check-ins and add one body scan per day. The best time is
                    during a natural pause &mdash; sitting in the van before arriving on site, or
                    during the first minute of your lunch break. Two minutes is enough. Notice what
                    your body is telling you and connect the physical sensations to emotional
                    labels.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">
                    Week 3: Add Trigger Awareness
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Continue the check-ins and body scanning. Begin noticing your emotional triggers
                    as they occur. When you have a strong emotional reaction, mentally note:
                    &ldquo;I have been triggered.&rdquo; If possible, make a brief note on your
                    phone (the trigger diary from Section 2). At the end of the week, review your
                    notes for patterns.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">
                    Week 4: Add the One-Breath Pause
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Continue all previous practices. When you notice a trigger, practise the
                    one-breath pause before responding. Ask yourself: &ldquo;How do I <em>want</em>
                    to respond?&rdquo; At the end of the week, use Gibbs&rsquo; Reflective Cycle to
                    reflect on one significant emotional experience from the week.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Making Habits Stick: Key Principles
              </h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Start ridiculously small.</strong> A five-second check-in is better than
                    no check-in. A two-minute body scan is better than a twenty-minute one you never
                    do. Lower the bar until it is impossible not to step over it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Anchor to existing habits.</strong> Attach the new behaviour to
                    something you already do every day (starting the van, opening the lunch box,
                    brushing your teeth).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Never miss twice.</strong> Missing one day does not break the habit.
                    Missing two in a row starts to. If you forget on Monday, make sure you do it on
                    Tuesday.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Track simply.</strong> A tick on a calendar or a brief note on your
                    phone is enough. You do not need an app or a journal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Be patient.</strong> Habit research (Lally et al., 2010) shows an
                    average of 66 days for a behaviour to become automatic. Give yourself at least
                    two months before judging whether a practice is &ldquo;working&rdquo;.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Connecting to Module 3: Self-Regulation
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Self-awareness is the foundation. Self-regulation is the next floor of the building.
                In Module 3, you will learn what to <em>do</em> with the awareness you have
                developed here &mdash; how to manage difficult emotions, maintain composure under
                pressure, and channel emotional energy productively rather than destructively.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Everything you have learned in Module 2 feeds directly into Module 3. The emotional
                labelling, trigger recognition, body scanning, and breathing techniques you practise
                now will become the foundation of your self-regulation toolkit. The stronger your
                self-awareness, the more effective your self-regulation will be.
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Self-awareness is not a one-off insight &mdash; it is a daily practice. Like
                    physical fitness, it improves with consistent effort and degrades with neglect.
                    The techniques in this section require minutes, not hours, and they fit
                    seamlessly into a construction worker&rsquo;s day. The greatest risk is not that
                    these practices are too difficult &mdash; it is that they are too simple to take
                    seriously. Start small, start today, and let consistency do the work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../ei-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../ei-module-3">
              Continue to Module 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
