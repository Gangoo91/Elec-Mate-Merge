import {
  ArrowLeft,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Brain,
  FileText,
  AlertTriangle,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cbt-link',
    question:
      "According to Aaron Beck's Cognitive Behavioural Therapy model, what is the fundamental link that drives emotional responses?",
    options: [
      'Events directly cause emotions — the same event produces the same emotion in everyone',
      'Thoughts (cognitions) mediate between events and emotions — it is your interpretation that determines your emotional response',
      'Emotions cause thoughts — you feel first and think second',
      'Behaviour determines both thoughts and emotions — changing what you do changes how you think and feel',
    ],
    correctIndex: 1,
    explanation:
      "Beck's CBT model is built on the principle that it is not the event itself that determines your emotional response, but your interpretation of that event. The same situation — such as failing an EICR — can produce very different emotions depending on how you think about it. If you think 'I am a terrible electrician,' you will feel shame and despair. If you think 'This is useful feedback that will help me improve,' you will feel motivated. The event is identical; the emotional response is completely different because the thought (cognition) between event and emotion is different.",
  },
  {
    id: 'abc-model',
    question:
      "In Ellis's ABC Model, what does the 'B' stand for, and why is it the most important element?",
    options: [
      'Behaviour — because changing behaviour changes everything else',
      'Beliefs — because your beliefs about the activating event determine the consequences (emotional and behavioural)',
      'Biology — because physiological responses drive emotional reactions',
      'Balance — because maintaining emotional balance prevents negative consequences',
    ],
    correctIndex: 1,
    explanation:
      "In Ellis's ABC Model, B stands for Beliefs — the thoughts, interpretations, and assumptions you hold about the Activating event (A). B is the most important element because it is the filter through which the event is processed before it produces Consequences (C — your emotional and behavioural response). Two people can experience the same Activating event and have completely different Consequences because their Beliefs about the event differ. This is why cognitive reframing targets B: by changing your beliefs about the event, you change the emotional and behavioural consequences.",
  },
  {
    id: 'distortion-type',
    question:
      'An electrician thinks "I failed one EICR, so I am clearly terrible at my job." Which cognitive distortion is this?',
    options: ['Mind reading', 'Catastrophising', 'Overgeneralisation', 'Personalisation'],
    correctIndex: 2,
    explanation:
      'This is overgeneralisation — taking a single negative event (failing one EICR) and extending it into a general, sweeping conclusion (being terrible at the job). Overgeneralisation is characterised by words like "always," "never," "everything," and "clearly" — language that converts a specific instance into a universal rule. A balanced thought would be: "I failed this particular EICR, which means there is something specific I need to learn or improve on this type of installation. It does not mean I am bad at my job overall."',
  },
];

const faqs = [
  {
    question: 'Is cognitive reframing just "positive thinking"?',
    answer:
      'No, and this is an important distinction. Positive thinking involves replacing negative thoughts with artificially positive ones ("Everything is fine! This is great!"), which often feels forced and dishonest. Cognitive reframing involves replacing distorted, unbalanced thoughts with accurate, balanced ones. A balanced thought may still acknowledge difficulty, disappointment, or frustration — but it does so without the distortion. For example, instead of reframing "I failed the EICR" as "Everything is wonderful!" (positive thinking), you reframe it as "I failed this particular EICR, which is disappointing but also provides specific information about what I need to improve" (balanced reframing). The reframed thought is not artificially positive; it is simply more accurate and less distorted.',
  },
  {
    question: 'How long does it take to get better at recognising cognitive distortions?',
    answer:
      'Most people start noticing their own distortions within one to two weeks of learning about them. The key turning point is when you begin to catch distortions in real time — during or shortly after the thought occurs, rather than only in retrospect. This typically takes two to four weeks of regular practice. Using thought records accelerates the process because they train you to systematically examine your thoughts rather than accepting them at face value. Over time (typically two to three months of consistent practice), the process becomes increasingly automatic — you begin to notice and challenge distortions almost as quickly as they arise.',
  },
  {
    question: 'Can I use thought records on my phone instead of on paper?',
    answer:
      'Yes. The medium does not matter; what matters is the structured process of recording and examining your thoughts. Many people find that a notes app on their phone is more practical than a paper notebook, particularly on site where carrying a journal is impractical. The critical elements are: (1) recording the situation, (2) identifying the automatic thought, (3) noting the emotion and its intensity, (4) listing evidence for and against the thought, and (5) writing a balanced alternative. Whether you do this on paper, on your phone, in a spreadsheet, or in a dedicated CBT app, the therapeutic benefit comes from the process of structured examination, not the format.',
  },
  {
    question: 'What if my negative thought is actually accurate — not a distortion?',
    answer:
      'Sometimes negative thoughts are accurate assessments of a genuine problem, and in these cases, the appropriate response is problem-solving rather than cognitive reframing. For example, if you think "I do not have enough knowledge to safely work on three-phase industrial systems," and this is genuinely true, the answer is not to reframe the thought but to get the training. The skill is in distinguishing between accurate negative assessments (which require action) and distorted negative thinking (which requires reframing). Thought records help with this distinction because the "evidence for and against" columns force you to test the thought against reality rather than simply accepting or rejecting it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "According to Beck's CBT model, what is the primary target for changing emotional responses?",
    options: [
      'The external event or situation that triggered the emotion',
      'The automatic thoughts and interpretations between the event and the emotion',
      'The physiological stress response in the body',
      'The behaviour that follows the emotional response',
    ],
    correctAnswer: 1,
    explanation:
      "Beck's CBT model identifies automatic thoughts — the rapid, often unconscious interpretations we make about events — as the primary target for changing emotional responses. While you cannot always control the events that happen to you, and while physiological responses and behaviours are also important, the most effective point of intervention is the cognitive level: changing how you interpret and think about events changes the emotional response they produce.",
  },
  {
    id: 2,
    question:
      'An electrician thinks: "The client is going to complain about every single thing I do." Which cognitive distortion is this?',
    options: ['Catastrophising', 'Personalisation', 'Mind reading', 'Black-and-white thinking'],
    correctAnswer: 2,
    explanation:
      'This is mind reading — assuming you know what another person is thinking or going to do, without evidence. The electrician is predicting the client\'s behaviour based on an assumption, not on actual information. Mind reading often leads to defensive or avoidant behaviour that can actually create the very outcome you feared. A balanced alternative would be: "I do not know how the client will respond. I will focus on doing quality work and address any concerns if and when they arise."',
  },
  {
    id: 3,
    question: 'Which of the following is an example of catastrophising?',
    options: [
      '"I made a mistake on this circuit, so I need to fix it before testing."',
      '"If I fail this inspection, I will lose my business, my house, and everything I have worked for."',
      '"The client seems unhappy, so I should ask what is wrong."',
      '"I found an error in my calculations, which means I need to recalculate."',
    ],
    correctAnswer: 1,
    explanation:
      'Catastrophising involves taking a single event (failing an inspection) and rapidly escalating it to the worst possible outcome (losing business, house, and everything). The thought leaps from a specific, manageable problem to a total, irreversible disaster without considering the many intermediate steps, alternative outcomes, or coping resources available. The other options represent proportionate, balanced thinking about problems — acknowledging the issue and focusing on a practical response.',
  },
  {
    id: 4,
    question: "In Ellis's ABC Model, what do A, B, and C stand for?",
    options: [
      'Action, Behaviour, Consequence',
      'Activating event, Beliefs, Consequences',
      'Awareness, Balance, Change',
      'Assessment, Behaviour, Cognition',
    ],
    correctAnswer: 1,
    explanation:
      "Ellis's ABC Model stands for: A = Activating event (the situation or trigger), B = Beliefs (your thoughts, interpretations, and assumptions about the event), and C = Consequences (the emotional and behavioural results). The model's key insight is that A does not directly cause C — B mediates between them. By changing B (your beliefs about the event), you change C (the emotional and behavioural consequences).",
  },
  {
    id: 5,
    question: 'What is the correct sequence of steps in a thought record?',
    options: [
      'Emotion, thought, evidence, balanced thought, situation',
      'Situation, automatic thought, emotion, evidence for, evidence against, balanced thought',
      'Trigger, response, reflection, action plan',
      'Event, feeling, behaviour, outcome',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence for a thought record is: (1) Situation — what happened, when, where, who was involved; (2) Automatic thought — what went through your mind; (3) Emotion — what you felt and how intense it was (0-100%); (4) Evidence for — what facts support the automatic thought; (5) Evidence against — what facts contradict the automatic thought; and (6) Balanced thought — a more accurate, proportionate thought that accounts for all the evidence. This structured process forces you to examine your thoughts critically rather than accepting them at face value.',
  },
  {
    id: 6,
    question:
      'An electrician thinks: "I should be faster at wiring boards by now." Which cognitive distortion does this represent?',
    options: ['Mind reading', 'Overgeneralisation', 'Should statement', 'Personalisation'],
    correctAnswer: 2,
    explanation:
      'This is a "should statement" — an arbitrary, self-imposed rule about how things ought to be. Should statements create guilt and frustration because they set standards that may not be realistic, evidence-based, or fair. The word "should" implies that there is a fixed, universal standard for how fast someone ought to be, which is rarely the case. A balanced alternative: "I am progressing at my own pace. Speed comes with experience, and I am faster now than I was six months ago."',
  },
  {
    id: 7,
    question: 'What is the key difference between cognitive reframing and positive thinking?',
    options: [
      'There is no meaningful difference — both involve thinking more positively',
      'Cognitive reframing replaces distorted thoughts with accurate, balanced ones; positive thinking replaces negative thoughts with artificially positive ones',
      'Positive thinking is evidence-based; cognitive reframing is not',
      'Cognitive reframing only works for minor problems; positive thinking works for major ones',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive reframing replaces distorted, unbalanced thoughts with thoughts that are accurate and proportionate — which may still acknowledge difficulty and negative aspects, but do so without distortion. Positive thinking replaces negative thoughts with artificially positive ones regardless of accuracy, which often feels forced and unsustainable. A reframed thought is not necessarily positive; it is simply more balanced and accurate than the distorted original.',
  },
  {
    id: 8,
    question:
      'An electrician blames himself for a project delay that was actually caused by the plumber finishing late. Which cognitive distortion is this?',
    options: [
      'Catastrophising',
      'Black-and-white thinking',
      'Overgeneralisation',
      'Personalisation',
    ],
    correctAnswer: 3,
    explanation:
      'This is personalisation — taking personal responsibility for something that was not your fault or was primarily caused by external factors. Personalisation involves attributing blame to yourself for events that were outside your control, or over-estimating your role in a negative outcome. The plumber finishing late caused the delay, not the electrician. A balanced thought: "The delay was caused by the plumber running over schedule. That was not within my control. My work was completed on time."',
  },
];

export default function RSMModule3Section3() {
  useSEO({
    title: 'Cognitive Strategies & Reframing | RSM Module 3.3',
    description:
      "Beck's CBT, cognitive distortions, Ellis's ABC Model, cognitive reframing, thought records, and construction-specific examples.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Lightbulb className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cognitive Strategies &amp; Reframing
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            How your thoughts shape your emotions, common thinking traps in construction, and
            practical techniques for reframing unhelpful thought patterns
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>CBT:</strong> Beck showed that thoughts mediate between events and emotions
              </li>
              <li>
                <strong>ABC Model:</strong> Activating event &rarr; Beliefs &rarr; Consequences
                (Ellis)
              </li>
              <li>
                <strong>Reframing:</strong> Identify the distortion, challenge it, replace with a
                balanced thought
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Accuracy:</strong> Distorted thinking leads to disproportionate emotional
                reactions
              </li>
              <li>
                <strong>Performance:</strong> Catastrophising and mind reading waste energy and
                impair decision-making
              </li>
              <li>
                <strong>Resilience:</strong> Reframing is one of the most powerful tools for
                long-term stress management
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Beck's CBT model and the link between thoughts, feelings, and behaviour",
              'Identify six common cognitive distortions and recognise them in construction-specific scenarios',
              "Apply Ellis's ABC Model to analyse how beliefs mediate between events and emotional consequences",
              'Demonstrate the cognitive reframing process: identify, challenge, and replace distorted thoughts',
              'Complete a thought record with all six components for a workplace scenario',
              'Distinguish between cognitive reframing and positive thinking, explaining why accuracy matters more than positivity',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Beck's CBT — The Thought-Feeling Link */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Beck&rsquo;s CBT &mdash; The Thought-Feeling Link
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Aaron T. Beck</strong>, an American psychiatrist working at the University
                of Pennsylvania, developed Cognitive Behavioural Therapy (CBT) in the 1960s and
                1970s. His foundational work, published formally in 1976, proposed a radical idea at
                the time: that psychological distress is not caused directly by events, but by the{' '}
                <em>way we think about</em> those events.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Core Principle of CBT:</strong> It is not
                  the situation itself that determines how you feel &mdash; it is your{' '}
                  <em>interpretation</em> of the situation. The same event can produce completely
                  different emotional responses in different people, or in the same person at
                  different times, because the emotional response is driven by the thought
                  (cognition) that sits between the event and the feeling.
                </p>
              </div>

              <p>
                Beck identified that people in psychological distress tend to have{' '}
                <strong>automatic thoughts</strong> &mdash; rapid, often unconscious interpretations
                of events that are characteristically negative, distorted, and self-defeating. These
                thoughts arise so quickly that people often do not notice them; they experience the
                emotional result (anxiety, anger, shame) without recognising the thought that
                produced it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The CBT Triangle</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Beck proposed that thoughts, feelings, and behaviours are interconnected in a
                  cycle. Each one influences the other two:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Thoughts</strong> influence your <strong>feelings</strong> (thinking
                      &ldquo;I am going to fail&rdquo; produces anxiety)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Feelings</strong> influence your <strong>behaviour</strong> (anxiety
                      leads to avoidance or procrastination)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Behaviour</strong> reinforces your <strong>thoughts</strong> (avoiding
                      the task confirms the belief that it was too difficult, making the thought
                      stronger next time)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-3">
                  The good news is that this cycle works in both directions. By changing one element
                  &mdash; particularly the thought &mdash; you can change the entire cycle. This is
                  the basis of cognitive reframing: change the thought, and the feeling and
                  behaviour follow.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white mb-2">
                  <strong>Event:</strong> An EICR report comes back with several C2 (potentially
                  dangerous) observations.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">Distorted Response</p>
                    <p className="text-xs text-white/80">
                      <strong>Thought:</strong> &ldquo;I am a terrible electrician. I cannot even
                      get a basic EICR right.&rdquo;
                      <br />
                      <strong>Feeling:</strong> Shame, despair, anxiety
                      <br />
                      <strong>Behaviour:</strong> Avoids taking on similar work, loses confidence
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-1">Balanced Response</p>
                    <p className="text-xs text-white/80">
                      <strong>Thought:</strong> &ldquo;The C2 observations are useful feedback. I
                      need to review these specific areas and improve my approach for next
                      time.&rdquo;
                      <br />
                      <strong>Feeling:</strong> Mild frustration, motivation
                      <br />
                      <strong>Behaviour:</strong> Reviews the observations, researches the issues,
                      improves
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  The event is identical in both cases. The emotional and behavioural response is
                  entirely different because the <em>thought</em> between event and emotion is
                  different. This is the power of cognitive strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Common Cognitive Distortions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Common Cognitive Distortions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beck identified a range of <strong>cognitive distortions</strong> &mdash; systematic
                errors in thinking that produce inaccurate, negatively biased interpretations of
                events. Everyone engages in cognitive distortions to some degree, but under stress
                they become more frequent, more intense, and harder to recognise. Learning to
                identify these distortions in your own thinking is the first step towards
                challenging and correcting them.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">1. Catastrophising</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Jumping to the worst possible outcome and treating it as the most likely
                    outcome. Catastrophising takes a problem and rapidly escalates it to a disaster,
                    skipping over all the intermediate steps and alternative outcomes.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">On site:</strong> &ldquo;I failed this EICR.
                      The client will complain. They will leave a bad review. I will lose all my
                      customers. My business will fail. I will lose my house.&rdquo; In reality, a
                      failed EICR is a specific, manageable problem with clear remedial steps.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">2. Black-and-White Thinking</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Also called all-or-nothing thinking. Viewing situations in only two categories
                    rather than on a continuum. Everything is either perfect or a complete failure;
                    there is no middle ground, no partial success, no grey area.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">On site:</strong> &ldquo;If this
                      installation is not absolutely perfect, it is rubbish.&rdquo; In reality, work
                      exists on a spectrum from compliant through to excellent. A competent
                      installation that meets BS 7671 is not &ldquo;rubbish&rdquo; simply because it
                      is not flawless.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">3. Mind Reading</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Assuming you know what other people are thinking or feeling without any actual
                    evidence. Mind reading often leads to defensive or avoidant behaviour based on
                    imagined rather than actual attitudes.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">On site:</strong> &ldquo;The client is going
                      to complain about everything I do. They clearly think I do not know what I am
                      doing.&rdquo; In reality, you have no evidence of what the client thinks. They
                      might be perfectly satisfied but simply quiet, or they might be distracted by
                      their own concerns entirely unrelated to your work.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">4. Personalisation</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Taking personal responsibility for events that are not your fault, or
                    attributing excessive blame to yourself for outcomes that were influenced by
                    many factors. Personalisation makes you the centre of blame for things that are
                    outside your control.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">On site:</strong> &ldquo;The project is
                      behind schedule. It must be because I am too slow.&rdquo; In reality, the
                      delay is caused by multiple factors: late material deliveries, other trades
                      running over, design changes, and weather. Your work may have been completed
                      on time.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">5. Overgeneralisation</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Taking a single event and generalising it into a universal rule. Characterised
                    by words like &ldquo;always,&rdquo; &ldquo;never,&rdquo;
                    &ldquo;everything,&rdquo; and &ldquo;everyone.&rdquo; One negative experience
                    becomes proof of a permanent, unchangeable pattern.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">On site:</strong> &ldquo;I made a mistake on
                      this circuit. I always make mistakes. I will never be good enough.&rdquo; In
                      reality, one mistake on one circuit is a single, specific event that does not
                      define your overall competence.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">6. Should Statements</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Imposing arbitrary rules on yourself (or others) about how things
                    &ldquo;should&rdquo; be, &ldquo;must&rdquo; be, or &ldquo;ought&rdquo; to be.
                    Should statements create guilt, frustration, and resentment because they set
                    standards that are often unrealistic, inflexible, or based on comparison rather
                    than evidence.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">On site:</strong> &ldquo;I should be faster
                      at wiring boards by now. Other sparks my age are much quicker.&rdquo; In
                      reality, speed varies based on experience, the specific type of board, working
                      conditions, and individual approach. There is no universal
                      &ldquo;should&rdquo; for wiring speed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Ellis's ABC Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Ellis&rsquo;s ABC Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Albert Ellis</strong>, working alongside (and sometimes in competition with)
                Beck, developed Rational Emotive Behaviour Therapy (REBT) in the 1950s and 1960s.
                His ABC Model provides a clear, practical framework for understanding how beliefs
                mediate between events and emotional responses. While Beck focused on automatic
                thoughts, Ellis focused on the broader belief systems that generate those thoughts.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The ABC Model</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-white text-sm font-bold flex-shrink-0">
                      A
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Activating Event</p>
                      <p className="text-sm text-white/80">
                        The external event or situation that triggers the process. This is the
                        objective reality of what happened &mdash; stripped of interpretation. For
                        example: &ldquo;The client phoned and said they were unhappy with the
                        work.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-white text-sm font-bold flex-shrink-0">
                      B
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Beliefs</p>
                      <p className="text-sm text-white/80">
                        Your thoughts, interpretations, assumptions, and beliefs about the
                        activating event. This is the critical mediating step &mdash; the filter
                        through which you process the event. For example: &ldquo;They think I am
                        incompetent. This is going to destroy my reputation. I should never have
                        taken this job.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-white text-sm font-bold flex-shrink-0">
                      C
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Consequences</p>
                      <p className="text-sm text-white/80">
                        The emotional and behavioural results that follow from your beliefs. These
                        are not caused directly by A; they are caused by B. For example: feeling
                        anxious and ashamed (emotional consequence) and avoiding the client&rsquo;s
                        calls (behavioural consequence).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The critical insight of the ABC Model is that <strong>A does not cause C</strong>.
                Most people assume that the event (A) directly causes their emotional response (C).
                Ellis showed that B &mdash; your beliefs about the event &mdash; is the true cause
                of C. This means that by changing B, you can change C without needing to change A
                (which is often outside your control).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: The ABC Model in Action
                  </p>
                </div>
                <div className="space-y-2 mt-3">
                  <p className="text-sm text-white/80">
                    <strong className="text-rose-400">A (Activating Event):</strong> A client phones
                    to say they are unhappy with the position of two sockets.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        Distorted Beliefs &rarr; Harmful Consequences
                      </p>
                      <p className="text-xs text-white/80">
                        <strong>B:</strong> &ldquo;They think I am useless. They are going to leave
                        a terrible review. Everyone will find out.&rdquo;
                        <br />
                        <strong>C:</strong> Anxiety, shame, defensive anger. Avoids calling back.
                        Lies awake worrying.
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-green-400 mb-1">
                        Balanced Beliefs &rarr; Constructive Consequences
                      </p>
                      <p className="text-xs text-white/80">
                        <strong>B:</strong> &ldquo;The client has a preference about socket
                        positions. This is a minor issue that I can resolve quickly.&rdquo;
                        <br />
                        <strong>C:</strong> Mild inconvenience but no distress. Calls back promptly,
                        arranges to adjust the sockets, relationship maintained.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Cognitive Reframing — The Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Cognitive Reframing &mdash; The Process
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cognitive reframing is the practical application of everything covered so far. It is
                the process of identifying a distorted thought, challenging it against evidence, and
                replacing it with a more balanced, accurate thought. This is not about
                &ldquo;thinking positively&rdquo; &mdash; it is about{' '}
                <strong>thinking accurately</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Three-Step Reframing Process
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-white text-sm font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Identify the Distortion</p>
                      <p className="text-sm text-white/80">
                        Catch the automatic thought and name the distortion. Ask yourself:
                        &ldquo;What just went through my mind?&rdquo; and then &ldquo;Which
                        distortion is this?&rdquo; Simply naming the distortion (&ldquo;That is
                        catastrophising&rdquo;) creates immediate distance between you and the
                        thought.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-white text-sm font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Challenge the Thought</p>
                      <p className="text-sm text-white/80">
                        Test the thought against evidence. Ask: &ldquo;What is the actual evidence
                        for this thought? What is the evidence against it? What would I say to a
                        colleague who told me they were thinking this? Is there another way to look
                        at this situation?&rdquo; The goal is not to dismiss the thought but to
                        examine it critically rather than accepting it at face value.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-white text-sm font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Replace with a Balanced Thought
                      </p>
                      <p className="text-sm text-white/80">
                        Formulate a new thought that accounts for all the evidence &mdash; both for
                        and against. The balanced thought is not artificially positive; it is simply
                        more accurate and proportionate than the distorted original. It acknowledges
                        the difficulty while also acknowledging context, nuance, and your ability to
                        cope.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Reframing in Practice: Three Construction Examples
                  </p>
                </div>
                <div className="space-y-4 mt-3">
                  <div>
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Example 1: Catastrophising
                    </p>
                    <p className="text-xs text-white/80">
                      <strong>Distorted:</strong> &ldquo;The EICR failure means I am terrible at my
                      job. My career is over.&rdquo;
                      <br />
                      <strong>Challenge:</strong> Have I always failed EICRs? No &mdash; I have
                      passed many. Is one failure the end of a career? No &mdash; every experienced
                      electrician encounters failures. What would I tell a mate who said this? I
                      would tell them to learn from it and move on.
                      <br />
                      <strong>Balanced:</strong> &ldquo;This EICR has highlighted specific areas I
                      need to review. It is frustrating, but it is also a learning opportunity. One
                      failure does not define my competence.&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Example 2: Mind Reading
                    </p>
                    <p className="text-xs text-white/80">
                      <strong>Distorted:</strong> &ldquo;The client is going to complain about
                      everything I do. They clearly think I do not know what I am doing.&rdquo;
                      <br />
                      <strong>Challenge:</strong> What actual evidence do I have that the client
                      thinks this? None &mdash; I am guessing. Have they actually complained? No. Is
                      there another explanation for their behaviour? They might be stressed about
                      the project cost, distracted by personal issues, or simply quiet by nature.
                      <br />
                      <strong>Balanced:</strong> &ldquo;I do not actually know what the client
                      thinks. I will focus on doing quality work and communicate clearly. If they
                      have concerns, I will address them when they arise.&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Example 3: Should Statement
                    </p>
                    <p className="text-xs text-white/80">
                      <strong>Distorted:</strong> &ldquo;I should be faster at this. Other
                      electricians my age would have finished by now.&rdquo;
                      <br />
                      <strong>Challenge:</strong> Says who? What evidence is there for a universal
                      speed standard? Am I comparing myself to a real person or an imagined ideal?
                      Does speed matter more than quality?
                      <br />
                      <strong>Balanced:</strong> &ldquo;I am working at my own pace, which produces
                      quality results. Speed comes with experience and familiarity with this
                      specific type of work. I am faster now than I was a year ago, and that
                      trajectory matters more than an arbitrary comparison.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Thought Records */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Thought Records
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A thought record is the formal, structured version of cognitive reframing. It is the
                primary tool used in CBT for developing the habit of examining your thoughts rather
                than accepting them at face value. While the three-step reframing process described
                above can be done mentally in real time, thought records are best completed in
                writing (on paper, on your phone, or in any notes app) either during or shortly
                after the triggering event.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Six Columns of a Thought Record
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400">1. Situation</p>
                    <p className="text-xs text-white/80">
                      What happened? When? Where? Who was involved? Describe the facts of the
                      situation objectively, as if a camera were recording it.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400">2. Automatic Thought</p>
                    <p className="text-xs text-white/80">
                      What thought went through your mind? What was the first thing you said to
                      yourself? Write it down exactly, in the words you actually thought.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400">3. Emotion</p>
                    <p className="text-xs text-white/80">
                      What emotion did you feel? Rate its intensity from 0 to 100%. Name the
                      specific emotion (not &ldquo;bad&rdquo; but &ldquo;anxious,&rdquo;
                      &ldquo;angry,&rdquo; &ldquo;ashamed,&rdquo; etc.).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400">4. Evidence For</p>
                    <p className="text-xs text-white/80">
                      What facts support the automatic thought? Be honest &mdash; there may be some
                      genuine evidence. List only observable facts, not feelings or assumptions.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400">5. Evidence Against</p>
                    <p className="text-xs text-white/80">
                      What facts contradict the automatic thought? What would a trusted colleague
                      say? Are there alternative explanations? Have you handled similar situations
                      successfully before?
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400">6. Balanced Thought</p>
                    <p className="text-xs text-white/80">
                      Write a new thought that accounts for all the evidence &mdash; both for and
                      against. Rate your belief in this new thought (0-100%) and re-rate the
                      intensity of the original emotion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Completed Example: Thought Record
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    <strong className="text-rose-400">Situation:</strong> Tuesday, 2:30pm. Received
                    a phone call from a client saying the kitchen lights are not working properly,
                    two weeks after I completed the installation.
                  </p>
                  <p className="text-white/80">
                    <strong className="text-rose-400">Automatic Thought:</strong> &ldquo;I have done
                    a terrible job. I am losing my touch. The client will never hire me again and
                    will tell everyone I am unreliable.&rdquo;
                  </p>
                  <p className="text-white/80">
                    <strong className="text-rose-400">Emotion:</strong> Anxiety (75%), Shame (60%)
                  </p>
                  <p className="text-white/80">
                    <strong className="text-rose-400">Evidence For:</strong> The lights are not
                    working correctly. I did install them. The client has a genuine issue.
                  </p>
                  <p className="text-white/80">
                    <strong className="text-rose-400">Evidence Against:</strong> I have completed
                    hundreds of installations with no callbacks. Faults can develop after
                    installation for many reasons (faulty component, power surge, user error). The
                    client called me directly, which suggests they trust me enough to fix it. One
                    callback does not mean I am &ldquo;losing my touch.&rdquo;
                  </p>
                  <p className="text-white/80">
                    <strong className="text-rose-400">Balanced Thought:</strong> &ldquo;A callback
                    is inconvenient but normal in this trade. I will go back, diagnose the issue,
                    and fix it promptly. This is how you maintain client relationships. One issue
                    does not erase hundreds of successful installations.&rdquo;
                  </p>
                  <p className="text-white/80">
                    <strong className="text-rose-400">Re-rated Emotion:</strong> Anxiety (25%),
                    Shame (10%)
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="border-l-2 border-green-500/50 pl-4 mt-8">
                <p className="text-sm font-medium text-white mb-3">Key Takeaways</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      CBT shows that thoughts mediate between events and emotions &mdash; change the
                      thought, change the feeling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Six common distortions: catastrophising, black-and-white thinking, mind
                      reading, personalisation, overgeneralisation, should statements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Ellis&rsquo;s ABC Model: Activating event &rarr; Beliefs &rarr; Consequences
                      &mdash; change B to change C
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Cognitive reframing: identify the distortion, challenge with evidence, replace
                      with a balanced thought
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Thought records provide a structured framework for developing the reframing
                      habit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Reframing is about accuracy, not positivity &mdash; a balanced thought
                      acknowledges difficulty without distortion
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-3-section-4">
              Next: Problem-Focused vs Emotion-Focused Coping
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
