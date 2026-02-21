import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Heart,
  Brain,
  Eye,
  Activity,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Star,
  MessageCircle,
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
    question: 'According to Goleman, which three competencies make up emotional self-awareness?',
    options: [
      'Empathy, social skills, motivation',
      'Emotional awareness, accurate self-assessment, self-confidence',
      'Self-regulation, optimism, adaptability',
      'Influence, teamwork, conflict management',
    ],
    correctIndex: 1,
    explanation:
      'Goleman identified emotional awareness (recognising your emotions as they occur), accurate self-assessment (knowing your strengths and limits), and self-confidence (a strong sense of self-worth) as the three self-awareness competencies.',
  },
  {
    question: 'What does Lisa Feldman Barrett mean by "emotional granularity"?',
    options: [
      'The idea that emotions are genetically hardwired from birth',
      'The ability to make fine-grained distinctions between similar emotional states',
      'The theory that all emotions are variations of happiness or sadness',
      'The principle that emotions cannot be measured scientifically',
    ],
    correctIndex: 1,
    explanation:
      'Emotional granularity is the ability to construct precise emotional experiences using a rich vocabulary, rather than relying on broad labels such as "fine" or "stressed". People with high granularity can distinguish frustration from disappointment, or anxiety from excitement.',
  },
  {
    question:
      'Dan Siegel coined the phrase "name it to tame it". What does neuroscience research show this achieves?',
    options: [
      'It increases amygdala activation and heightens the emotion',
      'It has no measurable neurological effect',
      'It reduces amygdala activation and engages the prefrontal cortex',
      'It only works for positive emotions, not negative ones',
    ],
    correctIndex: 2,
    explanation:
      'UCLA neuroimaging research by Lieberman et al. (2007) demonstrated that putting feelings into words (affect labelling) reduces amygdala reactivity and increases activity in the right ventrolateral prefrontal cortex, effectively calming the emotional response.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I build an emotional vocabulary if I have always just said "fine"?',
    answer:
      'Start small. Keep a list of emotion words on your phone — even ten to fifteen words beyond "fine" makes a difference. Each day, pick the word that best describes your current feeling. Over time, your brain becomes better at distinguishing subtle emotional states. Resources like Plutchik\'s Wheel or a simple feelings chart in the break room can help. The goal is not to become a poet — it is to give yourself more accurate data about your inner world.',
  },
  {
    question: 'Are physical signals of emotion reliable, or do I risk misreading my body?',
    answer:
      'Physical signals are valuable data but not infallible. A tight chest might indicate anxiety, but it could also mean you drank too much coffee or are coming down with a cold. The key is to treat bodily sensations as a cue to pause and reflect, not as a definitive diagnosis. Over time, you will learn your own patterns — your body\'s specific "tells" for different emotions — and your readings will become more accurate.',
  },
  {
    question: 'Is self-awareness the same as overthinking or navel-gazing?',
    answer:
      'No. Healthy self-awareness is brief, purposeful, and action-oriented. You check in with yourself (a few seconds), label what you feel (one or two words), and decide how to respond. Overthinking or rumination, by contrast, involves replaying events endlessly without reaching a conclusion. If your self-reflection leads to clearer decisions and calmer responses, you are practising self-awareness. If it leads to spiralling worry, you have crossed into rumination — and that is the cue to redirect your attention outward.',
  },
  {
    question: 'How do I start building emotional awareness if it feels unnatural?',
    answer:
      'Begin with anchored moments — times that already have a natural pause. For example, check in with yourself during the morning van journey before arriving on site, during your lunch break, and during the drive home. Ask: "What am I feeling right now, and where do I feel it in my body?" You do not need to journal or meditate for twenty minutes. Even five seconds of honest labelling ("I feel tense — my shoulders are tight") counts. Consistency matters more than duration.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT one of Goleman's three self-awareness competencies?",
    options: ['Emotional awareness', 'Accurate self-assessment', 'Empathy', 'Self-confidence'],
    correctAnswer: 2,
    explanation:
      "Empathy belongs to Goleman's social awareness domain, not the self-awareness domain. The three self-awareness competencies are emotional awareness, accurate self-assessment, and self-confidence.",
  },
  {
    id: 2,
    question: "Lisa Feldman Barrett's theory of constructed emotion argues that:",
    options: [
      'Emotions are universal and identical across all cultures',
      'The brain actively constructs emotional experiences from sensory data, past experience, and context',
      'Emotions are purely physical reactions with no cognitive component',
      'Only six basic emotions exist in the human brain',
    ],
    correctAnswer: 1,
    explanation:
      "Barrett's theory proposes that emotions are not hardwired reflexes but are constructed by the brain using interoceptive signals, prior experience, and the current situational context. This is why different people can have different emotional responses to the same event.",
  },
  {
    id: 3,
    question: "How many primary emotions does Plutchik's Wheel of Emotions identify?",
    options: ['4', '6', '8', '12'],
    correctAnswer: 2,
    explanation:
      "Plutchik's model identifies eight primary emotions arranged in four opposing pairs: joy-sadness, trust-disgust, fear-anger, and surprise-anticipation. Each primary emotion varies in intensity from mild to extreme.",
  },
  {
    id: 4,
    question: 'Antonio Damasio\'s "somatic marker hypothesis" suggests that:',
    options: [
      'Emotions are irrelevant to rational decision-making',
      'Bodily sensations associated with emotions guide our decisions and judgements',
      'The body and mind operate completely independently',
      'Physical symptoms always indicate illness, not emotion',
    ],
    correctAnswer: 1,
    explanation:
      'Damasio demonstrated that bodily sensations ("somatic markers") linked to past emotional experiences help us make rapid, intuitive decisions. Without access to these markers, people struggle to make even simple everyday choices.',
  },
  {
    id: 5,
    question: 'According to Dan Siegel\'s "name it to tame it" concept, labelling an emotion:',
    options: [
      'Amplifies the emotional response by focusing attention on it',
      'Has no neurological effect whatsoever',
      'Reduces amygdala activation and engages the prefrontal cortex',
      'Only works for positive emotions like joy and excitement',
    ],
    correctAnswer: 2,
    explanation:
      "Neuroimaging research shows that affect labelling (putting a name to a feeling) reduces amygdala reactivity and increases engagement of the prefrontal cortex, effectively calming the brain's threat-detection system.",
  },
  {
    id: 6,
    question:
      'An electrician notices their jaw is clenched and their fists are tight while a client criticises their work. This physical awareness is an example of:',
    options: [
      'The Dunning-Kruger effect',
      'Somatic awareness — the body signalling an emotional state',
      'Cognitive distortion',
      'Emotional suppression',
    ],
    correctAnswer: 1,
    explanation:
      'Recognising physical tension as a signal of underlying anger or defensiveness is somatic awareness in action. The body often registers an emotion before the conscious mind labels it, so tuning into physical signals provides an early-warning system.',
  },
  {
    id: 7,
    question:
      'Why is "I\'m fine" an inadequate emotional label according to the concept of emotional granularity?',
    options: [
      'Because it is grammatically incorrect',
      'Because it is too granular and overly specific',
      'Because it is too vague to provide useful data about your actual emotional state',
      'Because emotions should never be described using words',
    ],
    correctAnswer: 2,
    explanation:
      'Saying "I\'m fine" collapses a wide range of possible emotional states into one meaningless label. High emotional granularity means distinguishing between, for example, "I\'m frustrated", "I\'m disappointed", or "I\'m apprehensive" — each of which points to a different cause and a different helpful response.',
  },
  {
    id: 8,
    question: "Which of Plutchik's opposing emotion pairs is correct?",
    options: ['Joy and anger', 'Trust and surprise', 'Fear and anger', 'Disgust and anticipation'],
    correctAnswer: 2,
    explanation:
      'Plutchik arranged his eight primary emotions in four opposing pairs: joy-sadness, trust-disgust, fear-anger, and surprise-anticipation. Fear and anger sit opposite each other on the wheel because they represent contrasting survival responses — withdrawal versus confrontation.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  "Explain Goleman's three self-awareness competencies and how each applies to working life",
  'Define emotional granularity and describe why a richer emotional vocabulary improves self-awareness',
  "Identify the eight primary emotions on Plutchik's Wheel and their opposing pairs",
  'Recognise common physical signals of different emotions in your own body',
  'Apply the "name it to tame it" technique to reduce emotional reactivity',
  'Use emotional labelling and brief check-ins as daily self-awareness practices',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function EIModule2Section1() {
  useSEO({
    title: 'Understanding Your Emotions | Module 2: Self-Awareness',
    description:
      'Goleman\'s self-awareness competencies, emotional granularity, Plutchik\'s Wheel of Emotions, physical signals of emotion, and the "name it to tame it" technique.',
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
            <Heart className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 1
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Understanding Your Emotions
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Developing the ability to recognise, name, and understand your emotional states is the
            foundation upon which every other emotional intelligence skill is built.
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
                  Self-awareness has three competencies: emotional awareness, accurate
                  self-assessment, and self-confidence
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  A richer emotional vocabulary (granularity) lets you respond more precisely to how
                  you really feel
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Your body sends physical signals of emotion before your conscious mind catches up
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>Naming an emotion reduces its intensity &mdash; "name it to tame it"</span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Unrecognised emotions drive impulsive decisions that affect safety and
                  relationships on site
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Accurate self-assessment helps you know when to ask for help and when to back
                  yourself
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Emotional awareness is the gateway to self-regulation, empathy, and effective
                  teamwork
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Construction professionals with high self-awareness report lower stress and better
                  working relationships
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
        {/*  SECTION 01 — Goleman's Self-Awareness Competencies          */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Goleman&rsquo;s Self-Awareness Competencies
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In his landmark 1995 book{' '}
              <em>Emotional Intelligence: Why It Can Matter More Than IQ</em>, Daniel Goleman
              identified self-awareness as the first and most fundamental domain of emotional
              intelligence. Without the ability to recognise what you are feeling while you are
              feeling it, every other EI skill &mdash; self-regulation, motivation, empathy, social
              skills &mdash; is built on shaky ground. Goleman broke self-awareness into three
              distinct competencies, each of which plays a vital role in how you navigate your
              working life.
            </p>

            {/* Competency 1 */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Competency 1: Emotional Awareness
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Emotional awareness is the ability to recognise your emotions as they occur and
                understand how they influence your thoughts and actions. It is the real-time
                monitoring of your inner emotional landscape &mdash; noticing that you are becoming
                frustrated <em>during</em> a difficult conversation, not two hours later when you
                replay it in the van on the way home.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                On a construction site, emotional awareness might look like this: you are halfway
                through a complex consumer unit change when the main contractor radios to say the
                building inspector has arrived a day early. You notice your stomach tighten and your
                jaw clench. Instead of snapping at the apprentice handing you cable, you pause and
                think, &ldquo;I am feeling pressured and anxious because I was not expecting this
                inspection today.&rdquo; That recognition &mdash; catching the emotion in real time
                &mdash; is emotional awareness in action.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Without emotional awareness, the anxiety would still be there, but it would express
                itself as irritability, rushed work, or a short temper. The emotion does not
                disappear just because you fail to recognise it; it simply drives your behaviour
                from behind the scenes, like an invisible hand on the steering wheel.
              </p>
            </div>

            {/* Competency 2 */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Competency 2: Accurate Self-Assessment
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Accurate self-assessment is an honest understanding of your strengths and
                limitations. It means knowing what you do well and where you have gaps &mdash;
                without the distortion of ego, denial, or imposter syndrome. A person with accurate
                self-assessment can say, &ldquo;I am excellent at first fix but I still need more
                practice with three-phase distribution boards,&rdquo; without feeling diminished or
                defensive.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                In the electrical trade, accurate self-assessment has direct safety implications. An
                apprentice who overestimates their ability might attempt a task they are not yet
                competent to perform safely. A qualified electrician who underestimates their skill
                might hesitate on decisions they are perfectly capable of making, slowing down the
                team and eroding their own confidence over time.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Goleman found that leaders with accurate self-assessment actively seek feedback, are
                willing to admit mistakes, and know when to ask for help. On site, this translates
                to the electrician who says, &ldquo;I have not done a fire alarm install on this
                system before &mdash; can you walk me through it?&rdquo; rather than bluffing their
                way through and risking a costly or dangerous error.
              </p>
            </div>

            {/* Competency 3 */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Competency 3: Self-Confidence</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Self-confidence, in Goleman&rsquo;s framework, is not arrogance or bravado. It is a
                strong and realistic sense of your own worth and capabilities, grounded in accurate
                self-assessment. A self-confident person can make decisions under uncertainty, voice
                an unpopular opinion when they believe it is correct, and handle criticism without
                their sense of self collapsing.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Consider the electrician who notices that a design specification seems incorrect. A
                person with healthy self-confidence would raise the concern with the project
                manager, even if it meant questioning a more senior professional. A person lacking
                self-confidence might stay silent, thinking, &ldquo;They probably know better than
                me &mdash; I must be missing something.&rdquo; In the worst case, that silence leads
                to a faulty installation.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Self-confidence grows from experience, but also from honest self-knowledge. When you
                know your strengths through accurate self-assessment, you trust your competence in
                those areas. When you know your limits, you feel confident asking for support rather
                than seeing it as a weakness.
              </p>
            </div>

            {/* Goleman quote highlight box */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm leading-relaxed italic mb-2">
                    &ldquo;If you don&rsquo;t have self-awareness, if you are not able to manage
                    your distressing emotions, if you can&rsquo;t have empathy and have effective
                    relationships, then no matter how smart you are, you are not going to get very
                    far.&rdquo;
                  </p>
                  <p className="text-rose-400 text-xs font-semibold">&mdash; Daniel Goleman</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Emotional Granularity                          */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Emotional Granularity: Beyond &ldquo;Fine&rdquo;
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              How often do you answer &ldquo;How are you?&rdquo; with a single word &mdash;
              &ldquo;fine&rdquo;, &ldquo;good&rdquo;, &ldquo;alright&rdquo;, or perhaps
              &ldquo;stressed&rdquo;? For most people in the construction industry, the emotional
              vocabulary ends there. But neuroscientist Lisa Feldman Barrett has demonstrated that
              this imprecision comes at a real cost.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Barrett&rsquo;s Theory of Constructed Emotion
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                In her 2017 book <em>How Emotions Are Made: The Secret Life of the Brain</em>,
                Barrett challenged the classical view that emotions are hardwired, universal
                reflexes triggered by specific brain circuits. Instead, she proposed that the brain
                <em> constructs</em> emotions on the fly, combining three ingredients: interoceptive
                signals from the body (heart rate, breathing, gut sensations), past experience (what
                happened last time you felt this way), and the current context (what is happening
                around you right now).
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                This means that the same bodily sensation &mdash; a racing heart, for instance
                &mdash; can be constructed as excitement before a football match, anxiety before a
                job interview, or anger during an argument, depending on the context and the
                concepts your brain has available. The more emotional concepts (words, categories,
                distinctions) your brain can draw on, the more precisely it can construct and
                identify what you are feeling.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Barrett calls this precision <strong>emotional granularity</strong>. People with
                high emotional granularity do not just feel &ldquo;bad&rdquo; &mdash; they
                distinguish between feeling disappointed, resentful, overwhelmed, apprehensive, or
                dejected. Each label points to a different cause and suggests a different response.
                People with low granularity lump everything together as &ldquo;stressed&rdquo; or
                &ldquo;fine&rdquo;, which leaves them with fewer options for responding effectively.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Why &ldquo;Fine&rdquo; and &ldquo;Stressed&rdquo; Are Not Enough
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Imagine two electricians who both say they feel &ldquo;stressed&rdquo;. The first is
                actually feeling <em>overwhelmed</em> because they have too many tasks and not
                enough hours. The solution is to prioritise, delegate, or renegotiate deadlines. The
                second is actually feeling <em>anxious</em> because they are about to carry out a
                task they have not done before and are worried about making a mistake. The solution
                is to seek guidance, review the procedure, or ask a more experienced colleague to
                supervise.
              </p>
              <p className="text-white text-sm leading-relaxed">
                If both electricians label their feeling as &ldquo;stressed&rdquo;, neither gets
                useful information about what to do next. The word &ldquo;stressed&rdquo; is like a
                check-engine light &mdash; it tells you something is wrong but gives you no idea
                what. A more granular label is like a diagnostic code that points to the specific
                issue.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">Construction Example</p>
              <p className="text-white text-sm leading-relaxed">
                You arrive on site and discover that a wall has been plastered over the back boxes
                you installed yesterday. You feel a surge of emotion. &ldquo;Stressed&rdquo; is too
                vague. What are you actually feeling? <strong>Frustrated</strong> &mdash; because
                your work has been undone. <strong>Disrespected</strong> &mdash; because nobody
                consulted you.
                <strong> Anxious</strong> &mdash; because you are now behind schedule. Each of these
                labels suggests a different conversation and a different action. Frustration might
                lead you to speak with the plasterer calmly. Feeling disrespected might lead you to
                raise the coordination issue with the site manager. Anxiety about the schedule might
                lead you to reprioritise your tasks for the day. Without granularity, you might
                simply snap at someone &mdash; which addresses none of the underlying causes.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Building Your Emotional Vocabulary
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Research consistently shows that people who use a wider range of emotion words
                report better wellbeing, make more nuanced decisions, and recover from setbacks more
                quickly. You do not need to become a psychologist &mdash; expanding your working
                vocabulary from five or six words to twenty or thirty makes a meaningful difference.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Here are some distinctions worth practising:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Instead of &ldquo;angry&rdquo;: irritated, frustrated, resentful, furious,
                    indignant, bitter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Instead of &ldquo;sad&rdquo;: disappointed, dejected, melancholy, lonely,
                    grief-stricken, regretful
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Instead of &ldquo;scared&rdquo;: nervous, apprehensive, anxious, terrified,
                    uneasy, dread
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Instead of &ldquo;happy&rdquo;: content, proud, relieved, grateful, elated,
                    hopeful
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Plutchik's Wheel of Emotions                   */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Plutchik&rsquo;s Wheel of Emotions</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In 1980, psychologist Robert Plutchik published his psychoevolutionary theory of
              emotion, which remains one of the most widely used frameworks for understanding the
              structure of human emotions. His model takes the form of a three-dimensional wheel (or
              cone), with eight primary emotions arranged in four opposing pairs. Each primary
              emotion varies in intensity, and adjacent emotions can combine to form complex
              &ldquo;dyads&rdquo;.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                The Eight Primary Emotions (Four Opposing Pairs)
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Joy &harr; Sadness</p>
                  <p className="text-white text-xs leading-relaxed">
                    The spectrum from elation and contentment through to grief and despair. Joy
                    drives approach behaviour; sadness signals loss and prompts withdrawal or
                    reflection.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Trust &harr; Disgust</p>
                  <p className="text-white text-xs leading-relaxed">
                    Trust facilitates cooperation and bonding; disgust drives rejection and
                    avoidance. Both are crucial for social functioning on a busy site.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Fear &harr; Anger</p>
                  <p className="text-white text-xs leading-relaxed">
                    Fear prompts withdrawal or freezing in the face of danger; anger prompts
                    confrontation and boundary-setting. Both are survival responses.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Surprise &harr; Anticipation
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Surprise responds to the unexpected; anticipation prepares for what is coming.
                    Together they govern how we orient to new and future events.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Intensity Levels</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Each primary emotion exists on a spectrum of intensity. Plutchik visualised this as
                petals on a flower, with the most intense version at the centre and the mildest
                version at the outer edge. Understanding these intensity levels is another way to
                increase your emotional granularity:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Anger:</strong> annoyance (mild) &rarr; anger (moderate) &rarr; rage
                    (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Fear:</strong> apprehension (mild) &rarr; fear (moderate) &rarr; terror
                    (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Joy:</strong> serenity (mild) &rarr; joy (moderate) &rarr; ecstasy
                    (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Sadness:</strong> pensiveness (mild) &rarr; sadness (moderate) &rarr;
                    grief (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Trust:</strong> acceptance (mild) &rarr; trust (moderate) &rarr;
                    admiration (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Disgust:</strong> boredom (mild) &rarr; disgust (moderate) &rarr;
                    loathing (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Surprise:</strong> distraction (mild) &rarr; surprise (moderate) &rarr;
                    amazement (intense)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Anticipation:</strong> interest (mild) &rarr; anticipation (moderate)
                    &rarr; vigilance (intense)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Why This Matters for Electricians
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Understanding the wheel gives you a map for your emotional landscape. Instead of
                thinking, &ldquo;I feel bad,&rdquo; you can locate yourself more precisely: &ldquo;I
                feel annoyance, not rage &mdash; this is mild anger, and it is manageable.&rdquo;
                Or: &ldquo;I am not just nervous, I am experiencing apprehension about
                tomorrow&rsquo;s EICR on the old hospital building, which is the mild end of
                fear.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                This precision matters because the appropriate response to annoyance is different
                from the appropriate response to rage. The coping strategy for mild apprehension
                (preparation, familiarisation) is different from the strategy for terror (step back,
                get support). Plutchik&rsquo;s Wheel gives you a vocabulary and a framework for
                making these distinctions quickly and naturally.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Physical Signals of Emotions                   */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Physical Signals of Emotions</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Your body and your emotions are not separate systems &mdash; they are deeply
              intertwined. Long before your conscious mind labels a feeling, your body is already
              responding to it. Learning to read these physical signals is one of the most practical
              self-awareness skills you can develop, because your body is often the first to know
              what you are feeling.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Body&ndash;Mind Connection</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Neuroscientist Antonio Damasio spent decades studying the relationship between
                bodily sensations and decision-making. His &ldquo;somatic marker hypothesis&rdquo;
                (1994) proposes that emotions create physical markers in the body &mdash; changes in
                heart rate, muscle tension, breathing, gut sensations &mdash; and that these markers
                play a crucial role in guiding our decisions.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Damasio studied patients with damage to the ventromedial prefrontal cortex, which
                connects emotional processing to bodily sensation. These patients had intact logical
                reasoning but could not &ldquo;feel&rdquo; the emotional weight of their decisions.
                The result was devastating: they made objectively terrible choices in their personal
                and financial lives, despite being able to analyse options rationally. The takeaway
                is striking &mdash; we need our body&rsquo;s emotional signals to make good
                decisions, not just our logic.
              </p>
              <p className="text-white text-sm leading-relaxed">
                For electricians, this has direct practical implications. The &ldquo;gut
                feeling&rdquo; that something is not right with an installation &mdash; that nagging
                sense that you should double-check something &mdash; is often a somatic marker
                drawing on your accumulated experience. Learning to notice and trust these signals,
                rather than dismiss them, can improve both your decision-making and your safety.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Common Physical Signals by Emotion
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Anxiety / Fear</p>
                  <p className="text-white text-xs leading-relaxed">
                    Tight chest, shallow rapid breathing, churning stomach, sweaty palms, restless
                    legs, dry mouth, racing heart. You might notice these before a difficult client
                    meeting or when you discover a potential fault during testing.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Anger / Frustration</p>
                  <p className="text-white text-xs leading-relaxed">
                    Clenched jaw, tight fists, tension across the shoulders and upper back, flushed
                    face, increased heart rate, a feeling of heat or pressure building. Common when
                    your work is undone by another trade or when you feel disrespected on site.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Sadness / Disappointment</p>
                  <p className="text-white text-xs leading-relaxed">
                    Heavy limbs, fatigue or low energy, a lump in the throat, slumped posture,
                    desire to withdraw. You might notice these after receiving critical feedback on
                    your work or missing out on a role you wanted.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Excitement / Joy</p>
                  <p className="text-white text-xs leading-relaxed">
                    Lightness in the chest, increased energy, smiling (even involuntarily), open
                    posture, a sense of warmth. You might notice these when a complex installation
                    goes perfectly or when you pass a certification exam.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Construction Example: Reading Your Body on Site
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                You are working on a high-value domestic rewire. The homeowner keeps coming to check
                on you every twenty minutes, peering over your shoulder and asking questions. You
                notice your shoulders have crept up towards your ears, your breathing has become
                shallow, and there is a tightness in your chest.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Before you snap, &ldquo;Can you just let me get on with it?&rdquo;, you pause and
                read those physical signals. The tension in your shoulders and the shallow breathing
                are telling you that you feel <em>pressured</em> and possibly <em>irritated</em>.
                But underneath that, there might also be <em>anxiety</em> &mdash; you want to do a
                good job and being watched makes you self-conscious.
              </p>
              <p className="text-white text-sm leading-relaxed">
                By reading your body first, you now have more options. You could take a deep breath
                to release the physical tension. You could address the homeowner&rsquo;s underlying
                concern (&ldquo;I can see you want to make sure everything is going well &mdash; let
                me give you a quick update every couple of hours&rdquo;). You have moved from
                reacting to responding, and that shift started with noticing what your body was
                telling you.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Emotional Awareness in Action                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Emotional Awareness in Action</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Understanding the theory of emotional awareness is valuable, but it only becomes
              useful when you put it into practice. This section covers three evidence-based
              techniques that you can start using immediately: emotional labelling, the &ldquo;name
              it to tame it&rdquo; concept, and practical check-in routines.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Emotional Labelling</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Emotional labelling is the deliberate practice of putting a word or short phrase to
                what you are feeling. It sounds deceptively simple, but decades of research confirm
                that it is one of the most powerful emotional regulation strategies available. The
                process has three steps:
              </p>
              <ol className="text-white text-sm space-y-2 list-decimal list-inside">
                <li className="leading-relaxed">
                  <strong>Notice</strong> &mdash; Pause and turn your attention inward. What are you
                  feeling right now? Check your body for physical signals.
                </li>
                <li className="leading-relaxed">
                  <strong>Name</strong> &mdash; Choose the most accurate word or phrase you can. Aim
                  for specificity: &ldquo;frustrated because the materials did not arrive&rdquo; is
                  better than &ldquo;annoyed&rdquo;, which is better than &ldquo;bad&rdquo;.
                </li>
                <li className="leading-relaxed">
                  <strong>Note</strong> &mdash; Briefly acknowledge the feeling without judging it.
                  &ldquo;I notice I am feeling frustrated&rdquo; rather than &ldquo;I should not
                  feel this way.&rdquo;
                </li>
              </ol>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  &ldquo;Name It to Tame It&rdquo; &mdash; Dan Siegel
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Psychiatrist Dan Siegel coined the memorable phrase &ldquo;name it to tame it&rdquo;
                to describe what happens neurologically when you label an emotion. The principle is
                supported by a landmark UCLA study led by Matthew Lieberman (2007), which used fMRI
                brain scanning to observe what happens when people put feelings into words.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                The research found that when participants viewed images designed to trigger
                emotional responses, their amygdala (the brain&rsquo;s threat-detection centre)
                showed strong activation. But when the same participants were asked to label the
                emotion they were feeling &mdash; to say &ldquo;I feel angry&rdquo; or &ldquo;I feel
                afraid&rdquo; &mdash; their amygdala activity <em>decreased</em> while activity in
                the right ventrolateral prefrontal cortex (an area associated with processing and
                regulating emotions) <em>increased</em>.
              </p>
              <p className="text-white text-sm leading-relaxed">
                In plain language: naming what you feel calms down the alarm system and engages the
                thinking part of your brain. This is not a metaphor or a motivational technique
                &mdash; it is a measurable neurological process. The act of translating a raw
                feeling into a word creates a tiny gap between the emotion and your response, giving
                you just enough space to choose your next action rather than reacting on autopilot.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Journaling and Check-In Practices
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                While formal journaling is not realistic for most people on a construction site, a
                brief emotional check-in at key moments during the day can build your self-awareness
                significantly over time. Here is a simple three-checkpoint approach:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Morning (in the van):</strong> Before you arrive on site, ask yourself,
                    &ldquo;How am I feeling this morning? What mood am I carrying from home?&rdquo;
                    This takes five seconds and prevents you from unconsciously dumping your home
                    mood onto your colleagues.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Midday (lunch break):</strong> During your break, ask, &ldquo;What has
                    been my dominant emotion this morning? Has anything shifted my mood?&rdquo; This
                    helps you catch patterns you might otherwise miss.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Evening (driving home):</strong> Ask, &ldquo;What emotion stands out
                    from today? What triggered it?&rdquo; This brief reflection builds your
                    understanding of your emotional patterns over days and weeks.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Construction Example: Catching Fatigue Disguised as Irritability
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                It is Thursday afternoon of a long week. You have been on site since seven every
                morning, and overtime has eaten into your evenings. A colleague asks you a perfectly
                reasonable question about which circuit a socket is on, and you feel a spike of
                annoyance. Your instinct is to snap, &ldquo;Just trace it yourself.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                But if you pause and label what you are really feeling, you might recognise that you
                are not actually annoyed with your colleague. You are <em>exhausted</em>. The
                irritability is fatigue wearing a mask. Once you recognise this, your response
                changes. Instead of snapping, you might say, &ldquo;Give me a moment &mdash; I am
                running on empty today. Let me check that for you in a minute.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                That tiny shift &mdash; from reacting to a false label (&ldquo;I am annoyed at this
                person&rdquo;) to responding to the true one (&ldquo;I am exhausted and my tolerance
                is low&rdquo;) &mdash; protects the working relationship and gives you more accurate
                information about what you actually need (rest, not fewer questions).
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Key Takeaways                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Key Takeaways</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">What We Covered</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Goleman&rsquo;s three competencies</strong> &mdash; emotional awareness
                    (recognising emotions as they happen), accurate self-assessment (honest
                    understanding of strengths and limits), and self-confidence (a grounded sense of
                    capability and self-worth).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Emotional granularity</strong> &mdash; Lisa Feldman Barrett&rsquo;s
                    research shows that a richer emotional vocabulary helps your brain construct
                    more precise emotional experiences, leading to better regulation and
                    decision-making.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Plutchik&rsquo;s Wheel</strong> &mdash; eight primary emotions in four
                    opposing pairs, each varying in intensity from mild to extreme. The wheel
                    provides a practical map for locating your emotional state.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Physical signals</strong> &mdash; your body registers emotions before
                    your conscious mind does. Learning to read physical cues (tight chest, clenched
                    jaw, churning stomach) provides an early-warning system for emotional states.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Somatic markers</strong> &mdash; Antonio Damasio demonstrated that
                    bodily sensations linked to past emotional experiences guide our decisions. Gut
                    feelings are not irrational &mdash; they are compressed experience.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>&ldquo;Name it to tame it&rdquo;</strong> &mdash; Dan Siegel&rsquo;s
                    principle, supported by Lieberman&rsquo;s UCLA research, shows that labelling
                    emotions reduces amygdala activation and engages the prefrontal cortex, calming
                    the brain&rsquo;s threat response.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Self-awareness is the foundation of all emotional intelligence. You cannot
                    manage what you cannot recognise. By building your emotional vocabulary, tuning
                    into your body&rsquo;s signals, and practising brief daily check-ins, you create
                    the foundation for every other EI skill &mdash; from regulating your reactions
                    to understanding the emotions of those around you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Practical Next Steps</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This week:</strong> practise the three-checkpoint emotional check-in
                    (morning, midday, evening) using the most precise emotional label you can find.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This fortnight:</strong> pick one emotion you commonly label vaguely
                    (e.g. &ldquo;stressed&rdquo;) and identify at least three more precise
                    alternatives you could use instead.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> choose one physical signal to pay attention to
                    (e.g. shoulder tension) and notice whenever it appears during your working day.
                    What emotion does it usually signal?
                  </span>
                </li>
              </ul>
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
            <Link to="../ei-module-2-section-2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
