import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  Zap,
  Users,
  RefreshCw,
  Target,
  Lightbulb,
  ShieldAlert,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'brain-pathways',
    question:
      "According to LeDoux's research, why does the amygdala sometimes trigger an emotional response before the prefrontal cortex has finished processing?",
    options: [
      'Because the amygdala is more important than the prefrontal cortex',
      'Because the direct pathway from thalamus to amygdala is faster than the cortical route',
      'Because the prefrontal cortex only processes positive emotions',
      'Because the amygdala and prefrontal cortex are in different hemispheres',
    ],
    correctIndex: 1,
    explanation:
      "LeDoux's research showed that there are two pathways: a fast, direct route from the thalamus to the amygdala (the 'low road') and a slower route through the cortex (the 'high road'). The fast route means the amygdala can trigger a fight-or-flight response before the rational brain has had time to fully assess the situation.",
  },
  {
    id: 'ekman-emotions',
    question: "Which of the following is NOT one of Ekman's six universal emotions?",
    options: ['Anger', 'Jealousy', 'Disgust', 'Surprise'],
    correctIndex: 1,
    explanation:
      "Ekman's six universal emotions are happiness, sadness, fear, anger, surprise, and disgust. Jealousy is a more complex emotion that combines elements of several basic emotions. Ekman identified these six because they are recognised across all cultures and have distinct facial expressions.",
  },
  {
    id: 'cognitive-triangle',
    question: 'In the cognitive triangle (from CBT), which three elements are interconnected?',
    options: [
      'Past, present, and future',
      'Thoughts, emotions, and behaviours',
      'Id, ego, and superego',
      'Perception, understanding, and management',
    ],
    correctIndex: 1,
    explanation:
      "The cognitive triangle, developed from Aaron Beck's cognitive model, shows that thoughts, emotions, and behaviours are all interconnected. Changing any one element affects the other two. This is a foundational concept in cognitive behavioural therapy and a practical tool for developing emotional intelligence.",
  },
];

const faqs = [
  {
    question: 'Can I really control my amygdala hijack response?',
    answer:
      "You cannot prevent the initial amygdala response — it happens in milliseconds, before your rational brain is even aware of the trigger. However, you can learn to recognise when a hijack is happening and use techniques to engage your prefrontal cortex more quickly. The six-second pause (the time it takes for the initial neurochemical surge to pass), deep breathing, and labelling the emotion ('I am feeling angry') all help the rational brain regain control. With practice, the gap between the emotional trigger and your conscious response shortens, giving you more choice in how you react. This is one of the most practically useful skills you will learn in this course.",
  },
  {
    question: 'Are emotions always a problem in the workplace?',
    answer:
      'Absolutely not. Emotions are essential to effective functioning — they provide critical information about our environment, motivate action, and enable social connection. Fear alerts you to danger. Anger signals that a boundary has been crossed. Happiness reinforces positive behaviours. The problem is not emotions themselves but unmanaged emotions — reactions that are disproportionate, misdirected, or suppressed until they explode. Emotional intelligence is not about eliminating emotions; it is about understanding them and channelling them productively. An electrician who feels a flash of concern when a test result looks wrong is experiencing a useful emotion — it is protecting them and others.',
  },
  {
    question: 'Is emotional contagion always negative?',
    answer:
      'No, emotional contagion works in both directions. Positive emotions spread just as readily as negative ones. A foreman who arrives on site with genuine energy and optimism can lift the mood of an entire team. A colleague who stays calm during a crisis helps others stay calm too. Research by Hatfield, Cacioppo and Rapson shows that we unconsciously mimic the facial expressions, vocal patterns, and body language of those around us, which in turn triggers corresponding emotions in ourselves. This means that by consciously managing your own emotional state, you can positively influence those around you. Leaders with high EI understand this and use it deliberately.',
  },
  {
    question: 'Why do some people seem to handle pressure better than others?',
    answer:
      'The answer lies partly in the relative strength of their prefrontal cortex pathways compared to their amygdala reactivity. People who handle pressure well have typically developed stronger neural connections between their prefrontal cortex and their limbic system, allowing their rational brain to modulate emotional responses more effectively. This is not fixed at birth — it develops through experience, training, and deliberate practice. Resilience research shows that exposure to manageable stressors (with adequate support) actually strengthens these pathways. This is why experienced tradespeople often seem calmer under pressure — years of navigating stressful situations have literally rewired their brains to respond more effectively.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary role of the amygdala in emotional processing?',
    options: [
      'Logical reasoning and planning',
      'Acting as an emotional alarm system that detects threats',
      'Storing long-term memories',
      'Controlling voluntary muscle movements',
    ],
    correctAnswer: 1,
    explanation:
      "The amygdala acts as the brain's emotional alarm system. It processes incoming sensory information and triggers rapid emotional responses, particularly to perceived threats. It can activate the fight-flight-freeze response before the rational brain has finished processing the situation.",
  },
  {
    id: 2,
    question:
      'Which researcher identified the six universal emotions through cross-cultural studies?',
    options: ['Daniel Goleman', 'Joseph LeDoux', 'Paul Ekman', 'Aaron Beck'],
    correctAnswer: 2,
    explanation:
      'Paul Ekman conducted pioneering cross-cultural research in the 1960s and 1970s, demonstrating that six basic emotions — happiness, sadness, fear, anger, surprise, and disgust — are universally recognised across all human cultures, including isolated tribes with no exposure to Western media.',
  },
  {
    id: 3,
    question: 'What did Goleman mean by the term "amygdala hijack"?',
    options: [
      'A medical condition where the amygdala is damaged',
      'When the emotional brain overrides the rational brain, causing an impulsive reaction',
      'A technique for improving memory recall',
      'The process of learning new emotional responses',
    ],
    correctAnswer: 1,
    explanation:
      'An amygdala hijack occurs when the emotional brain (specifically the amygdala) overrides the rational brain (the prefrontal cortex), triggering an intense, often disproportionate emotional response. Goleman coined the term in his 1995 book to describe situations where we react emotionally before our rational mind can intervene.',
  },
  {
    id: 4,
    question:
      'How long does the cortisol and adrenaline surge from an amygdala hijack typically last?',
    options: ['About 6 seconds', 'About 20 minutes', 'About 2 hours', 'About 24 hours'],
    correctAnswer: 1,
    explanation:
      'The cortisol and adrenaline surge from an amygdala hijack typically takes about 20 minutes to fully subside. This is why it is so important to pause before responding in a heated situation — your neurochemistry is literally working against rational decision-making for those 20 minutes.',
  },
  {
    id: 5,
    question: 'Which of the following is NOT part of the fight-flight-freeze response?',
    options: [
      'Increased heart rate and blood pressure',
      'Blood diverted away from the digestive system',
      'Enhanced logical reasoning and problem-solving',
      'Release of adrenaline and cortisol',
    ],
    correctAnswer: 2,
    explanation:
      'During the fight-flight-freeze response, the body prioritises survival over higher-order thinking. Blood is diverted from the digestive system to the muscles, heart rate increases, and stress hormones flood the system. Logical reasoning and problem-solving are actually impaired during this response — the prefrontal cortex is essentially taken offline.',
  },
  {
    id: 6,
    question: 'What is emotional contagion?',
    options: [
      'A mental health disorder that spreads through physical contact',
      'The tendency for emotions to spread from person to person through social interaction',
      'A technique used in therapy to transfer positive emotions to patients',
      'The process by which the amygdala communicates with the prefrontal cortex',
    ],
    correctAnswer: 1,
    explanation:
      "Emotional contagion, researched by Hatfield, Cacioppo and Rapson, describes the tendency for emotions to spread from person to person through social interaction. We unconsciously mimic others' facial expressions, vocal tones, and body language, which triggers corresponding emotions in ourselves. This is why one stressed person can affect an entire team.",
  },
  {
    id: 7,
    question:
      'In the cognitive triangle, what happens when you change your thoughts about a situation?',
    options: [
      'Nothing changes — thoughts are separate from emotions and behaviours',
      'Only your emotions change, not your behaviours',
      'Both your emotions and behaviours are likely to change as well',
      'Your behaviours change but your emotions remain the same',
    ],
    correctAnswer: 2,
    explanation:
      'The cognitive triangle shows that thoughts, emotions, and behaviours are all interconnected. Changing any one element affects the other two. This is the foundation of cognitive behavioural therapy (CBT) and a practical tool for emotional regulation. By reframing your thoughts about a situation, you can change how you feel and how you behave.',
  },
  {
    id: 8,
    question:
      "According to LeDoux's dual-pathway model, what are the two routes by which sensory information reaches the amygdala?",
    options: [
      'The conscious route and the unconscious route',
      'The visual route and the auditory route',
      'The fast, direct route (thalamus to amygdala) and the slow, cortical route (thalamus to cortex to amygdala)',
      'The left-brain route and the right-brain route',
    ],
    correctAnswer: 2,
    explanation:
      "LeDoux identified two pathways: the fast 'low road' (thalamus directly to amygdala) which enables rapid emotional responses, and the slower 'high road' (thalamus to cortex to amygdala) which allows for more considered, rational processing. The fast route is why you can feel afraid before you consciously know what frightened you.",
  },
];

export default function EIModule1Section2() {
  useSEO({
    title: 'The Science Behind Emotions | EI Module 1.2',
    description:
      "Understanding the neurological basis of emotions including the amygdala, prefrontal cortex, Ekman's six universal emotions, the amygdala hijack, fight-flight-freeze, emotional contagion, and the cognitive triangle.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Brain className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Science Behind Emotions
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the neurological basis of emotions and how they affect behaviour on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Amygdala:</strong> Your emotional alarm system &mdash; fast but imprecise
              </li>
              <li>
                <strong>Prefrontal cortex:</strong> Your rational manager &mdash; slower but wiser
              </li>
              <li>
                <strong>Ekman:</strong> 6 universal emotions recognised across all cultures
              </li>
              <li>
                <strong>Hijack:</strong> When emotions override logic &mdash; lasts ~20 minutes
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Awareness:</strong> Understanding the science helps you recognise when
                emotions are driving behaviour
              </li>
              <li>
                <strong>Control:</strong> You cannot manage what you do not understand
              </li>
              <li>
                <strong>Teams:</strong> Emotions spread through groups &mdash; knowing this is power
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the roles of the amygdala and prefrontal cortex in emotional processing',
              "List Ekman's six universal emotions and their functions",
              "Explain Goleman's concept of the amygdala hijack",
              'Describe the fight-flight-freeze response and its effects on site',
              'Define emotional contagion and how it spreads through teams',
              'Apply the cognitive triangle to workplace situations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Brain's Emotional Architecture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Brain&rsquo;s Emotional Architecture
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                To understand emotional intelligence, you first need to understand how emotions are
                generated in the brain. The emotional brain is not a single structure but a network
                of interconnected regions, each playing a specific role in how you experience,
                process and respond to emotions. Two structures are particularly important: the{' '}
                <strong>amygdala</strong> and the <strong>prefrontal cortex</strong>.
              </p>

              <p>
                The <strong>limbic system</strong> is the collective name for the brain structures
                responsible for emotional processing, memory formation, and motivation. It sits deep
                within the brain, beneath the cerebral cortex, and evolved long before our higher
                cognitive abilities. At the heart of the limbic system is the{' '}
                <strong>amygdala</strong> &mdash; a small, almond-shaped cluster of nuclei that acts
                as the brain&rsquo;s emotional alarm system.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">The Two Key Players</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">
                        The Amygdala (Emotional Alarm)
                      </p>
                    </div>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Detects potential threats in milliseconds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Triggers the fight-flight-freeze response</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Processes emotions before you are consciously aware</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Fast but imprecise &mdash; prone to false alarms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Essential for survival, but can override rational thought</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">
                        The Prefrontal Cortex (Rational Manager)
                      </p>
                    </div>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Located at the front of the brain, behind the forehead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Responsible for planning, reasoning, and decision-making</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Regulates the amygdala&rsquo;s emotional responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Slower but more accurate and nuanced</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Can be overridden by the amygdala under extreme stress</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The neuroscientist <strong>Joseph LeDoux</strong> at New York University made a
                critical discovery about how these two structures interact. He found that sensory
                information from the outside world (what you see, hear, smell) reaches the brain
                through the <strong>thalamus</strong>, which acts as a relay station. From the
                thalamus, the information travels along two separate pathways:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  LeDoux&rsquo;s Dual Pathways
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-rose-400">
                        The Fast Route (Low Road): Thalamus &rarr; Amygdala
                      </p>
                      <p className="text-sm text-white">
                        A direct, rapid pathway that allows the amygdala to receive a rough
                        impression of the stimulus and react almost instantly. This is why you can
                        jump back from something that looks like a snake before your conscious mind
                        has identified what it is. Speed comes at the cost of accuracy &mdash; the
                        signal is crude and can lead to false alarms.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-rose-400">
                        The Slow Route (High Road): Thalamus &rarr; Cortex &rarr; Amygdala
                      </p>
                      <p className="text-sm text-white">
                        A longer pathway that routes through the cortex for detailed analysis before
                        reaching the amygdala. This allows for a more considered, accurate
                        assessment of the situation. It is slower (by a few hundred milliseconds)
                        but far more precise. This is the pathway that tells you the
                        &ldquo;snake&rdquo; was actually a coiled rope.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                This dual-pathway system explains why emotional reactions can sometimes feel
                involuntary &mdash; because in a very real sense, they are. The amygdala can trigger
                a response before the prefrontal cortex has had time to assess the situation
                rationally. On a construction site, this manifests as snapping at a colleague before
                thinking, freezing during a near-miss, or feeling a surge of anger when someone
                questions your work. The emotional brain acts first; the rational brain catches up.
              </p>

              <p>
                The good news is that the prefrontal cortex can be strengthened through practice.
                Emotional intelligence training is, at a neurological level, about building stronger
                and faster connections between the prefrontal cortex and the amygdala &mdash; giving
                your rational brain a better chance of modulating the emotional response before it
                takes over. This is neuroplasticity in action.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Ekman's Six Universal Emotions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Ekman&rsquo;s Six Universal Emotions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In the 1960s and 1970s, the American psychologist <strong>Paul Ekman</strong>{' '}
                conducted pioneering cross-cultural research that changed our understanding of
                emotions. He travelled to remote communities around the world &mdash; including the
                Fore people of Papua New Guinea, who had no exposure to Western media or culture
                &mdash; and discovered that certain emotions are{' '}
                <strong>universally recognised</strong> across all human societies.
              </p>

              <p>
                Ekman identified <strong>six basic emotions</strong> that are innate, universal, and
                each associated with a distinct facial expression. These are not learned responses
                but biological programmes that evolved because they serve essential survival
                functions. Understanding these six emotions is foundational to emotional
                intelligence because they are the building blocks from which all more complex
                emotional experiences are constructed.
              </p>

              {/* Emotions Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-1">Happiness</p>
                  <p className="text-sm text-white mb-2">
                    Signals safety, reward and social connection. Promotes approach behaviour and
                    strengthens social bonds. Characterised by genuine (Duchenne) smiling.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">On site:</strong> The satisfaction of
                    completing a complex installation, the camaraderie of a good team, pride when an
                    apprentice passes their assessment.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-1">Sadness</p>
                  <p className="text-sm text-white mb-2">
                    Signals loss or disappointment. Promotes reflection, slows down activity, and
                    signals to others that support is needed. Characterised by lowered facial
                    features.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">On site:</strong> Hearing about a
                    colleague&rsquo;s bereavement, watching a long-standing team break up at the end
                    of a project, redundancy or job loss.
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-400 mb-1">Fear</p>
                  <p className="text-sm text-white mb-2">
                    Signals danger or threat. Triggers the fight-flight-freeze response and
                    heightens alertness. Prepares the body to escape or defend. Characterised by
                    widened eyes and open mouth.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">On site:</strong> A near-miss with a falling
                    object, working at height for the first time, fear of redundancy or financial
                    insecurity.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">Anger</p>
                  <p className="text-sm text-white mb-2">
                    Signals a perceived injustice, boundary violation, or obstacle. Mobilises energy
                    for action. Can be constructive (asserting boundaries) or destructive
                    (aggression). Characterised by lowered brows and tightened jaw.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">On site:</strong> Being blamed for another
                    trade&rsquo;s mistake, discovering substandard work covered up, feeling
                    disrespected by a client or main contractor.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-cyan-400 mb-1">Surprise</p>
                  <p className="text-sm text-white mb-2">
                    Signals an unexpected event. Interrupts current activity and refocuses attention
                    on the new stimulus. Brief duration &mdash; quickly transitions into another
                    emotion. Characterised by raised eyebrows and open mouth.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">On site:</strong> Discovering hidden services
                    behind a wall, an unexpected design change, finding out you have won a major
                    contract.
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-1">Disgust</p>
                  <p className="text-sm text-white mb-2">
                    Signals contamination or moral violation. Promotes avoidance and rejection.
                    Originally evolved to protect us from spoiled food and disease, now also applies
                    to moral transgressions. Characterised by wrinkled nose and raised upper lip.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">On site:</strong> Working in contaminated
                    conditions, witnessing unsafe practices that endanger others, discovering
                    someone has deliberately falsified test results.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important:</strong> Every emotion has a
                  function. There are no &ldquo;bad&rdquo; emotions &mdash; only emotions that are
                  poorly understood or mismanaged. Fear keeps you safe. Anger protects your
                  boundaries. Sadness signals that you need support. The goal of emotional
                  intelligence is not to eliminate any of these emotions but to understand them,
                  recognise them when they arise, and channel them productively.
                </p>
              </div>

              <p>
                Ekman later expanded his list to include additional emotions such as contempt,
                shame, guilt, embarrassment and amusement. However, the original six remain the most
                widely referenced in EI training because they are the most clearly defined,
                universally recognised, and practically useful for building emotional awareness.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Amygdala Hijack */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            The Amygdala Hijack
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daniel Goleman coined the term <strong>&ldquo;amygdala hijack&rdquo;</strong> in his
                1995 book to describe a phenomenon that every person has experienced: a moment when
                the emotional brain completely overrides the rational brain, causing an intense,
                often disproportionate reaction that you later regret.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Amygdala Hijack Defined</p>
                </div>
                <p className="text-sm text-white">
                  An amygdala hijack occurs when the amygdala perceives a threat (real or imagined)
                  and triggers an overwhelming emotional response before the prefrontal cortex can
                  intervene with rational thought. The result is an impulsive reaction &mdash;
                  shouting, storming off, saying something you cannot take back, or freezing when
                  you need to act. The &ldquo;hijack&rdquo; is the amygdala taking control away from
                  the prefrontal cortex.
                </p>
              </div>

              <p>Three conditions characterise an amygdala hijack:</p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Strong emotional reaction</p>
                      <p className="text-sm text-white">
                        The response is intense and feels overwhelming &mdash; a surge of anger,
                        panic, or distress that floods the body.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Sudden onset</p>
                      <p className="text-sm text-white">
                        The reaction happens almost instantaneously. There is no gradual build-up
                        &mdash; it feels like a switch has been flipped.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Later realisation</p>
                      <p className="text-sm text-white">
                        Afterwards, when the rational brain catches up, you recognise that your
                        response was disproportionate to the situation. You think, &ldquo;Why did I
                        react like that?&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                When an amygdala hijack occurs, the body is flooded with <strong>cortisol</strong>{' '}
                (the stress hormone) and <strong>adrenaline</strong> (epinephrine). These
                neurochemicals prepare the body for emergency action but impair higher-order
                thinking, empathy and impulse control. Critically, this neurochemical surge takes
                approximately <strong>20 minutes to fully subside</strong>. This means that for 20
                minutes after a hijack, your brain is chemically incapable of its best rational
                thinking.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Examples of Amygdala Hijack
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      A near-miss on site triggers a freeze response &mdash; you stand motionless
                      for several seconds before your rational brain kicks in and you move to safety
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      A supervisor criticises your work in front of the team, and you snap back with
                      an aggressive response before you have had time to consider whether the
                      criticism was valid
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      A client demands work be redone for the third time, and you feel a surge of
                      rage that makes you want to walk off the job
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      You receive an unexpected phone call with bad news while on site, and suddenly
                      you cannot concentrate on the task in front of you
                    </span>
                  </div>
                </div>
              </div>

              <p>
                Understanding the amygdala hijack is one of the most practically valuable concepts
                in emotional intelligence. Once you know what is happening neurologically, you can
                begin to develop strategies for managing it. The most important strategy is simply{' '}
                <strong>pausing</strong>. Even a six-second pause (the time it takes for the initial
                surge to begin subsiding) can be enough to allow the prefrontal cortex to start
                regulating the response. In later modules, you will learn specific techniques for
                managing hijacks, including deep breathing, cognitive reframing, and the &ldquo;name
                it to tame it&rdquo; approach developed by psychiatrist Daniel Siegel.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Fight, Flight and Freeze on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Fight, Flight and Freeze on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The fight-flight-freeze response is the body&rsquo;s automatic, hard-wired reaction
                to perceived danger. It evolved tens of thousands of years ago to help our ancestors
                survive immediate physical threats &mdash; predators, tribal conflicts, natural
                disasters. The problem is that this same system activates in response to modern
                workplace stressors, even when there is no physical danger.
              </p>

              <p>
                When the amygdala detects a threat, it triggers the{' '}
                <strong>sympathetic nervous system</strong>, which initiates a cascade of
                physiological changes designed to prepare the body for emergency action:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Physical Symptoms of the Stress Response
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Increased heart rate and blood pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Rapid, shallow breathing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Muscles tense, ready for action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Sweating increases (palms, forehead)</span>
                    </li>
                  </ul>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Blood diverted from digestion to muscles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Pupils dilate (tunnel vision)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Adrenaline and cortisol flood the system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Prefrontal cortex function is impaired</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                These physical changes manifest as three distinct behavioural responses, each of
                which shows up regularly on construction sites:
              </p>

              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Fight</p>
                  <p className="text-sm text-white mb-2">
                    The body mobilises for confrontation. Energy surges, muscles tense, and
                    aggression increases. In a construction context, fight does not necessarily mean
                    physical violence (though that does occur). More commonly it manifests as verbal
                    aggression, defensiveness, blaming others, raising your voice, or becoming
                    confrontational.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">Example:</strong> A foreman discovers that a
                    subcontractor has installed something incorrectly. Instead of addressing it
                    calmly, they launch into a tirade in front of the whole site. The emotional
                    response overwhelms the rational one.
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-400 mb-2">Flight</p>
                  <p className="text-sm text-white mb-2">
                    The body prepares to escape the threat. In a modern workplace, flight rarely
                    means literally running away. Instead, it shows up as avoidance &mdash; walking
                    away from difficult conversations, calling in sick to avoid a stressful
                    situation, procrastinating on tasks that feel overwhelming, or withdrawing
                    socially.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">Example:</strong> An electrician knows they
                    need to raise a safety concern with the site manager but keeps putting it off
                    because the thought of the conversation makes them anxious. The avoidance
                    behaviour is a flight response.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Freeze</p>
                  <p className="text-sm text-white mb-2">
                    The body becomes immobilised. This response evolved for situations where neither
                    fighting nor fleeing was viable &mdash; playing dead or remaining still to avoid
                    detection. In the workplace, freeze manifests as being unable to think, speak,
                    or act. You go blank in a meeting, your mind empties during a confrontation, or
                    you stand motionless after a near-miss.
                  </p>
                  <p className="text-xs text-white">
                    <strong className="text-rose-400">Example:</strong> During a site inspection, an
                    inspector asks a question you were not expecting. Your mind goes completely
                    blank. You know the answer, but in that moment of stress, you cannot access it.
                    This is a freeze response.
                  </p>
                </div>
              </div>

              <p>
                Recognising which response pattern you tend towards is an important part of
                developing emotional intelligence. Some people are predominantly fighters (they get
                confrontational under stress), some are flighters (they avoid and withdraw), and
                some are freezers (they shut down). Knowing your pattern is the first step to
                managing it. In Module 3 (Self-Regulation), you will learn specific techniques for
                each response type.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Emotional Contagion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Emotional Contagion
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emotional contagion is one of the most fascinating and practically relevant concepts
                in emotional intelligence. Researched extensively by{' '}
                <strong>Elaine Hatfield, John Cacioppo and Richard Rapson</strong>, it describes the
                tendency for emotions to spread from person to person through social interaction
                &mdash; much like a virus spreads through a population.
              </p>

              <p>
                The mechanism is largely unconscious. When we interact with someone, we
                automatically and involuntarily mimic their facial expressions, vocal tone, body
                posture and gestures. This mimicry then triggers the corresponding emotion in
                ourselves through a process called <strong>afferent feedback</strong> &mdash; the
                act of making a facial expression or adopting a body posture sends signals back to
                the brain that produce the associated emotion. Put simply: when you unconsciously
                mirror someone&rsquo;s frown, your brain starts to feel what that frown represents.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">How Emotional Contagion Works</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm text-white">
                      <strong>Mimicry:</strong> You unconsciously mirror the facial expressions,
                      tone, and body language of those around you
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm text-white">
                      <strong>Afferent feedback:</strong> Your brain interprets the mimicked
                      expressions and begins generating the corresponding emotion
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm text-white">
                      <strong>Convergence:</strong> Over time, the emotions of the group begin to
                      align &mdash; people in close proximity start to feel similar emotions
                    </p>
                  </div>
                </div>
              </div>

              <p>
                This process has profound implications for construction teams. Consider these
                scenarios:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  <p className="text-xs font-medium text-red-400 mb-2">Negative Contagion</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>
                      A foreman arrives on site stressed and irritable. By mid-morning, the entire
                      team is on edge &mdash; short-tempered, making more mistakes, and less willing
                      to help each other.
                    </li>
                    <li>
                      One person&rsquo;s anxiety about a deadline spreads through the team, creating
                      a panicked atmosphere where everyone rushes and quality drops.
                    </li>
                    <li>
                      A colleague&rsquo;s cynicism about the company gradually infects those around
                      them, eroding morale and engagement.
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                  <p className="text-xs font-medium text-green-400 mb-2">Positive Contagion</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>
                      A site manager who starts the Monday briefing with genuine enthusiasm and a
                      clear plan sets the tone for a productive week.
                    </li>
                    <li>
                      An electrician who stays calm and focused during a problem encourages others
                      to approach it rationally rather than panicking.
                    </li>
                    <li>
                      Someone who genuinely thanks colleagues for their help creates a culture where
                      people look out for each other.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The EI Implication:</strong> Once you understand
                  emotional contagion, you realise that{' '}
                  <strong>
                    managing your own emotional state is not just personal &mdash; it is a team
                    responsibility
                  </strong>
                  . Your mood, your energy, and your attitude are contagious. If you are a
                  supervisor, foreman, or any kind of team leader, your emotional state has a
                  disproportionate effect because people unconsciously look to authority figures as
                  emotional barometers. This is one of the most compelling reasons for developing
                  emotional intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Cognitive Triangle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            The Cognitive Triangle
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The cognitive triangle is one of the most powerful and practical tools you will
                encounter in this course. It comes from{' '}
                <strong>cognitive behavioural therapy (CBT)</strong>, developed by the American
                psychiatrist <strong>Aaron Beck</strong> in the 1960s, and it provides a simple
                framework for understanding how thoughts, emotions and behaviours interact.
              </p>

              <p>
                The core principle is straightforward: <strong>thoughts</strong>,{' '}
                <strong>emotions</strong> and <strong>behaviours</strong> are all interconnected.
                Each one influences and is influenced by the other two. A change in any one element
                will produce changes in the others. This means that by changing how you{' '}
                <em>think</em> about a situation, you can change how you <em>feel</em> about it and
                how you <em>act</em> in response.
              </p>

              {/* Cognitive Triangle Visual */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-4 text-center">
                  The Cognitive Triangle
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <p className="text-sm font-bold text-rose-400 mb-1">Thoughts</p>
                    <p className="text-xs text-white">
                      What you tell yourself about the situation. Your interpretation, assumptions,
                      and beliefs.
                    </p>
                  </div>
                  <div className="text-center p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <p className="text-sm font-bold text-rose-400 mb-1">Emotions</p>
                    <p className="text-xs text-white">
                      What you feel in response to your thoughts. The emotional state that arises.
                    </p>
                  </div>
                  <div className="text-center p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <p className="text-sm font-bold text-rose-400 mb-1">Behaviours</p>
                    <p className="text-xs text-white">
                      What you do in response to your thoughts and emotions. Your actions and
                      reactions.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white text-center mt-3">
                  Each element influences the other two. Change one, and the others shift.
                </p>
              </div>

              <p>Let us see how this works with a construction example:</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-3">Before (Unhelpful Cycle)</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-white">Situation:</p>
                      <p className="text-xs text-white">
                        The site manager criticises your cable routing in front of the team.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Thought:</p>
                      <p className="text-xs text-white">
                        &ldquo;He&rsquo;s trying to make me look stupid. He always picks on my work.
                        He&rsquo;s got it in for me.&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Emotion:</p>
                      <p className="text-xs text-white">Anger, humiliation, resentment</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Behaviour:</p>
                      <p className="text-xs text-white">
                        Snap back aggressively, become hostile for the rest of the day, complain to
                        colleagues, do the minimum required
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-3">After (Reframed Cycle)</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-white">Situation:</p>
                      <p className="text-xs text-white">
                        Same situation &mdash; site manager criticises your cable routing.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Thought:</p>
                      <p className="text-xs text-white">
                        &ldquo;He might have a point. I&rsquo;ll take a proper look. If he&rsquo;s
                        wrong, I&rsquo;ll explain my reasoning calmly.&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Emotion:</p>
                      <p className="text-xs text-white">
                        Mild frustration, but also curiosity and professionalism
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Behaviour:</p>
                      <p className="text-xs text-white">
                        Review the routing objectively, have a calm conversation, either correct the
                        issue or explain your reasoning, maintain the working relationship
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The situation is identical. The only thing that changed was the{' '}
                <strong>thought</strong> &mdash; the interpretation. But that single change
                transformed the emotion and the behaviour. This is the power of the cognitive
                triangle: it gives you a point of intervention. You may not be able to control the
                situation, but you can always choose how you <em>think</em> about it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Practical Application</p>
                </div>
                <p className="text-sm text-white">
                  Next time you notice a strong emotional reaction at work, pause and ask yourself:{' '}
                  <em>&ldquo;What am I telling myself about this situation?&rdquo;</em> Identify the
                  thought, then ask: <em>&ldquo;Is there another way to interpret this?&rdquo;</em>{' '}
                  This simple practice &mdash; noticing the thought, questioning it, and considering
                  alternatives &mdash; is the foundation of cognitive reframing and one of the most
                  effective emotional regulation strategies available. You will practise this
                  extensively in Modules 2 and 3.
                </p>
              </div>

              <p>
                The cognitive triangle is not about positive thinking or pretending everything is
                fine. It is about accurate thinking &mdash; making sure your interpretation of a
                situation is realistic rather than distorted by anger, fear or past experiences.
                Sometimes the situation genuinely is unfair, and your anger is justified. The
                cognitive triangle helps you respond effectively even then, by separating the
                emotional reaction from the considered response.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-1-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
