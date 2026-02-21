import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Wind,
  Brain,
  Heart,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'gross-strategy',
    question:
      "According to James Gross's research, which emotional regulation strategy is generally most effective?",
    options: [
      'Response modulation (suppressing the outward expression)',
      'Situation selection (avoiding triggering situations entirely)',
      'Cognitive change / reappraisal (reframing the meaning before the emotion fully forms)',
      'Attentional deployment (distracting yourself from the trigger)',
    ],
    correctIndex: 2,
    explanation:
      "Cognitive change (reappraisal) is consistently found to be the most effective regulation strategy because it intervenes at the appraisal stage — before the full emotional response has formed. Gross's research shows that strategies which intervene earlier in the emotion generation process tend to be more effective and less costly than those which try to modify the response after it has already occurred.",
  },
  {
    id: '90-second-rule',
    question:
      'What is the approximate duration of the chemical lifespan of an emotion, according to Jill Bolte Taylor?',
    options: ['30 seconds', '90 seconds', '5 minutes', '20 minutes'],
    correctIndex: 1,
    explanation:
      'Jill Bolte Taylor, a Harvard-trained neuroanatomist, identified that the chemical process of an emotion — from trigger to the flushing of stress hormones through the bloodstream — takes approximately 90 seconds. After that initial 90-second window, any remaining emotional response is being sustained by your own thinking patterns, not by the original chemical cascade.',
  },
  {
    id: 'suppression-vs-regulation',
    question: 'What is the key difference between suppression and healthy emotional regulation?',
    options: [
      'Suppression is faster and more effective in the long term',
      'Healthy regulation requires medication; suppression does not',
      'Suppression blocks the expression but not the experience; regulation manages both the experience and the expression',
      'There is no meaningful difference — both achieve the same outcome',
    ],
    correctIndex: 2,
    explanation:
      "Suppression attempts to block the outward expression of an emotion while the internal experience continues unabated — this actually increases physiological stress. Healthy regulation manages both the internal experience and the external expression, leading to reduced stress, better relationships, and improved wellbeing. Gross and John's 2003 research confirmed that habitual suppressors experience more negative emotion, not less.",
  },
];

const faqs = [
  {
    question: 'Does self-regulation mean I should never show emotions at work?',
    answer:
      'No. Self-regulation is about choosing appropriate expression, not eliminating emotion. Showing genuine concern when a colleague is injured, enthusiasm when a project goes well, or even measured frustration when safety standards are being ignored — these are all appropriate emotional expressions. The goal is to ensure your emotional expression is proportionate, constructive, and aligned with your values and professional standards. A self-regulated person still feels everything; they simply choose how and when to express it, rather than being controlled by their impulses.',
  },
  {
    question: 'How long does it take to get better at self-regulation?',
    answer:
      'Research suggests noticeable improvement within two to four weeks of consistent practice. Like any skill, self-regulation develops with repetition. Neuroplasticity research confirms that practising regulation techniques — such as breathing exercises, cognitive reappraisal, and the pause-before-responding habit — physically strengthens the neural pathways in the prefrontal cortex that are responsible for impulse control and emotional management. You will not become perfectly regulated overnight, but most people report that even small, consistent efforts produce meaningful changes in how they handle stress, conflict, and frustration within the first month.',
  },
  {
    question: 'What if I have already reacted badly — is it too late?',
    answer:
      "It is never too late to regulate. Acknowledging a poor reaction and course-correcting is itself an act of self-regulation — and often a powerful one. Saying something like, 'I reacted badly earlier and I want to apologise — that was not how I wanted to handle it' demonstrates emotional maturity and builds trust. In fact, the ability to recognise when you have lost control, take responsibility, and repair the situation is one of the most advanced self-regulation skills there is. Every experienced electrician has had moments where they have snapped under pressure; what separates those with high emotional intelligence is their willingness to own it and make it right.",
  },
  {
    question: 'Can breathing techniques really make a difference in a high-pressure situation?',
    answer:
      'Yes. Research from Stanford University, led by Dr Andrew Huberman, demonstrates that the physiological sigh — a double inhale through the nose followed by a long exhale through the mouth — can measurably reduce stress and heart rate in a single breath cycle. This is not a placebo effect; it works because the extended exhale activates the parasympathetic nervous system via the vagus nerve, directly counteracting the fight-or-flight response. Box breathing (used by Navy SEALs, special forces, and emergency services worldwide) has been shown to reduce cortisol levels and restore cognitive function within two to three minutes. These techniques are discreet enough to use anywhere — on site, in a meeting, in the van — without anyone knowing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT one of Goleman's five self-regulation competencies?",
    options: ['Self-control', 'Empathy', 'Conscientiousness', 'Adaptability'],
    correctAnswer: 1,
    explanation:
      "Empathy is one of Goleman's five domains of emotional intelligence, but it is not one of the five self-regulation competencies. The five self-regulation competencies are: self-control, trustworthiness, conscientiousness, adaptability, and innovation.",
  },
  {
    id: 2,
    question:
      "In James Gross's process model of emotion regulation, which strategy involves changing the meaning of a situation?",
    options: [
      'Situation selection',
      'Attentional deployment',
      'Cognitive change (reappraisal)',
      'Response modulation',
    ],
    correctAnswer: 2,
    explanation:
      "Cognitive change, also known as reappraisal, involves changing the meaning you assign to a situation in order to alter its emotional impact. For example, reframing a client's complaint as valuable feedback rather than a personal attack changes the emotional response before it fully forms.",
  },
  {
    id: 3,
    question:
      'According to Gross and John (2003), what happens to people who habitually suppress their emotions?',
    options: [
      'They experience less negative emotion over time',
      'They develop stronger relationships due to appearing calm',
      'They experience increased physiological stress, more negative emotion, and reduced wellbeing',
      'They become better at managing emotions in the long term',
    ],
    correctAnswer: 2,
    explanation:
      "Gross and John's 2003 research found that habitual suppressors actually experience more negative emotion (not less), higher physiological stress responses, poorer memory, and reduced relationship quality. Suppression is a costly strategy because it blocks the expression but not the underlying emotional experience, creating internal tension that accumulates over time.",
  },
  {
    id: 4,
    question:
      'After the initial 90-second chemical cascade of an emotion, what sustains the emotional state according to Jill Bolte Taylor?',
    options: [
      'Continued release of stress hormones from the adrenal glands',
      'Your own thinking patterns and the stories you tell yourself',
      'The physical environment you are in',
      'Unresolved childhood experiences',
    ],
    correctAnswer: 1,
    explanation:
      'According to Jill Bolte Taylor, the neurochemical process of an emotion completes within approximately 90 seconds. After that, any continued emotional state is being maintained by your own thinking — the internal narrative, the replaying of events, the catastrophising. This means that after the initial 90 seconds, you have a genuine choice about whether to continue feeding the emotion or to let the chemicals flush and move forward.',
  },
  {
    id: 5,
    question: 'What is the correct breathing pattern for box breathing?',
    options: [
      'Inhale 4 seconds, exhale 8 seconds',
      'Inhale 4 seconds, hold 4 seconds, exhale 4 seconds, hold 4 seconds',
      'Inhale 7 seconds, hold 4 seconds, exhale 8 seconds',
      'Double inhale through the nose, long exhale through the mouth',
    ],
    correctAnswer: 1,
    explanation:
      'Box breathing follows a 4-4-4-4 pattern: inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. The name comes from the four equal sides, like a box. The last option describes the physiological sigh (Huberman), not box breathing. The 4-7-8 technique uses a different ratio entirely.',
  },
  {
    id: 6,
    question:
      'Why does the physiological sigh (double inhale, long exhale) reduce stress so quickly?',
    options: [
      'It increases oxygen to the brain, making you think more clearly',
      'The extended exhale activates the parasympathetic nervous system via the vagus nerve',
      'It forces you to stop talking, which prevents conflict',
      'It reduces blood pressure by slowing the heart rate directly',
    ],
    correctAnswer: 1,
    explanation:
      "The physiological sigh works primarily because the extended exhale stimulates the vagus nerve, which activates the parasympathetic nervous system — the body's 'rest and digest' mode. This directly counteracts the sympathetic 'fight or flight' response. The double inhale maximises the reinflation of the lung's alveoli, and the long exhale then shifts the autonomic balance towards calm. Dr Andrew Huberman's research at Stanford confirmed this can occur within a single breath cycle.",
  },
  {
    id: 7,
    question:
      'An electrician is shouted at by a site manager for a mistake they did not make. According to the self-regulation principles in this section, what is the most emotionally intelligent response?',
    options: [
      'Shout back immediately to assert dominance and defend their reputation',
      'Suppress all emotion, say nothing, and walk away without addressing it',
      'Allow the initial 90-second chemical response to pass, use a breathing technique, then address the situation calmly and factually',
      'Report the site manager to HR immediately without any direct conversation',
    ],
    correctAnswer: 2,
    explanation:
      'The most emotionally intelligent response combines several self-regulation strategies: allowing the initial neurochemical cascade to pass (the 90-second rule), using a breathing technique to activate the parasympathetic response, and then addressing the situation calmly with facts. Shouting back is reactive, suppressing everything is harmful, and escalating to HR without any direct conversation avoids the situation rather than managing it.',
  },
  {
    id: 8,
    question:
      "Which of Gross's five emotion regulation strategies intervenes earliest in the emotion generation process?",
    options: [
      'Cognitive change',
      'Response modulation',
      'Situation selection',
      'Attentional deployment',
    ],
    correctAnswer: 2,
    explanation:
      "Situation selection is the earliest-intervening strategy in Gross's process model because it occurs before you even encounter the emotional stimulus. It involves choosing whether to enter or avoid a situation that is likely to trigger an emotional response. For example, choosing not to attend a meeting where you know a confrontational colleague will be present is situation selection. The strategies then proceed in order: situation modification, attentional deployment, cognitive change, and finally response modulation (the latest intervention).",
  },
];

export default function EIModule3Section1() {
  useSEO({
    title: 'Managing Your Reactions | EI Module 3.1',
    description:
      "Goleman's self-regulation competencies, James Gross's emotional regulation framework, suppression vs healthy regulation, the 90-second rule, and breathing techniques for the workplace.",
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
            <Link to="../ei-module-3">
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
            <ShieldCheck className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Your Reactions
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how emotions are regulated, why suppression fails, and practical
            techniques for choosing your response under pressure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Framework:</strong> Goleman identifies five self-regulation competencies
              </li>
              <li>
                <strong>Science:</strong> Gross&rsquo;s five strategies &mdash; earlier intervention
                is more effective
              </li>
              <li>
                <strong>Key fact:</strong> Emotions have a 90-second chemical lifespan
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Unregulated reactions on site cause accidents and conflict
              </li>
              <li>
                <strong>Reputation:</strong> How you react defines how people see you professionally
              </li>
              <li>
                <strong>Wellbeing:</strong> Suppressing emotions increases stress; regulation
                reduces it
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe Goleman's five self-regulation competencies with workplace examples",
              "Explain James Gross's process model of emotion regulation and its five strategies",
              'Distinguish between suppression and healthy emotional regulation using research evidence',
              'Apply the 90-second rule to manage initial emotional reactions on site',
              'Demonstrate three breathing techniques (box breathing, physiological sigh, 4-7-8) and explain their neurological basis',
              'Identify which regulation strategies are most effective and why early intervention matters',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Goleman's Self-Regulation Competencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Goleman&rsquo;s Self-Regulation Competencies
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In Module 1, you learned about Daniel Goleman&rsquo;s five domains of emotional
                intelligence. Self-regulation is the second domain, and Goleman considers it one of
                the most critical for workplace success. He defines self-regulation as the ability
                to manage disruptive emotions and impulses &mdash; not by eliminating them, but by
                channelling them constructively.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Core Principle:</strong> Self-regulation is not
                  about suppressing emotions &mdash; it is about choosing how and when to express
                  them. A self-regulated person still feels anger, frustration, anxiety, and
                  disappointment. The difference is that they have developed the capacity to pause
                  between stimulus and response, giving themselves the space to choose a
                  constructive path forward.
                </p>
              </div>

              <p>
                Goleman breaks self-regulation into five distinct competencies. Each one represents
                a specific skill that can be developed through awareness and practice. Understanding
                these competencies gives you a framework for identifying which areas of
                self-regulation are your strengths and which need development.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Self-Control</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The ability to manage disruptive emotions and impulses effectively. Self-control
                    does not mean becoming emotionless; it means maintaining composure under
                    pressure and avoiding impulsive actions that you would later regret. People with
                    strong self-control can think clearly even when they are emotionally activated,
                    and they channel their energy into productive responses rather than reactive
                    ones.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A client challenges your
                      workmanship in front of other trades. Rather than becoming defensive or
                      aggressive, you take a breath, acknowledge their concern, and calmly walk them
                      through the work to demonstrate it meets the required standard. Your composure
                      under challenge actually increases the client&rsquo;s confidence in you.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Trustworthiness</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Maintaining standards of honesty and integrity. Trustworthy people are
                    transparent about their intentions, admit their mistakes, and act in accordance
                    with their stated values even when it is uncomfortable or costly to do so. In
                    construction, where trust is the foundation of every working relationship,
                    trustworthiness is essential for long-term success.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> You discover a wiring
                      error that would pass inspection but does not meet best practice. Rather than
                      covering it up, you flag it, correct it, and document the change. This costs
                      you time in the short term but builds a reputation that earns you future work.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Conscientiousness</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Taking responsibility for your own performance. Conscientious people are
                    organised, careful, and follow through on commitments. They hold themselves to
                    high standards and take ownership of their work without needing external
                    supervision. In the trades, conscientiousness is what separates someone who does
                    the job from someone who does the job right.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> You finish an installation
                      and notice a minor cosmetic issue that the client probably would not spot. You
                      fix it anyway, because your personal standard demands it. You do not need
                      someone checking your work to know it should be done properly.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Adaptability</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Flexibility in handling change. Adaptable people adjust their approach when
                    circumstances shift, rather than rigidly clinging to the original plan. They see
                    change as a challenge to be navigated rather than a threat to be resisted. In
                    construction, where plans change daily and no two jobs are identical,
                    adaptability is not optional &mdash; it is a survival skill.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The architect changes the
                      lighting layout after you have already run first fix cables. Rather than
                      complaining or resisting, you assess the impact, communicate the time and cost
                      implications clearly, and get on with the revised work efficiently.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Innovation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Being comfortable with new ideas, approaches, and information. Innovative
                    self-regulators do not cling to &ldquo;the way we have always done it&rdquo;
                    &mdash; they remain open to better methods, new technologies, and fresh
                    perspectives. This competency connects self-regulation to growth, because it
                    requires managing the discomfort that naturally accompanies change and
                    unfamiliarity.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A younger apprentice
                      suggests a different routing method that you have not used before. Rather than
                      dismissing it because it is unfamiliar, you consider it on its merits, try it
                      on a small section, and adopt it when it proves effective.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These five competencies work together as a system. Self-control gives you the pause.
                Trustworthiness ensures your behaviour aligns with your values. Conscientiousness
                drives your standards. Adaptability allows you to flex with circumstances.
                Innovation keeps you growing. Together, they create a professional who can be relied
                upon under pressure &mdash; which is exactly the kind of person clients, colleagues,
                and employers want to work with.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: James Gross's Emotional Regulation Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            James Gross&rsquo;s Emotional Regulation Strategies
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While Goleman gives us the &ldquo;what&rdquo; of self-regulation (the competencies
                to develop), Stanford psychologist <strong>James Gross</strong> gives us the
                &ldquo;how&rdquo; &mdash; a detailed scientific model of how emotions are generated
                and, crucially, where in the process we can intervene to regulate them.
              </p>

              <p>
                Gross&rsquo;s <strong>process model of emotion regulation</strong> (1998) is one of
                the most influential frameworks in the field. It identifies five distinct strategies
                for regulating emotions, arranged in order from earliest to latest intervention in
                the emotion generation process. The key insight is that strategies which intervene
                earlier tend to be more effective and less psychologically costly than those which
                intervene later.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Five Strategies (Earliest to Latest)
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Situation Selection</p>
                      <p className="text-sm text-white">
                        Choosing whether to enter or avoid a situation that is likely to trigger an
                        emotional response. This is the earliest possible intervention &mdash; you
                        prevent the emotion from occurring by not encountering the trigger at all.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">Example:</strong> You know that a
                        particular subcontractor always winds you up. When you have a choice about
                        which site to work on, you choose one where they are not present.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Situation Modification</p>
                      <p className="text-sm text-white">
                        Altering the situation to change its emotional impact. You are already in
                        the situation, but you change something about it to reduce the likelihood or
                        intensity of the emotional response.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">Example:</strong> A meeting is becoming
                        heated. Rather than letting it escalate, you suggest a ten-minute break so
                        everyone can cool down before continuing the discussion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Attentional Deployment</p>
                      <p className="text-sm text-white">
                        Directing your attention towards or away from the emotional stimulus. This
                        includes techniques like distraction (shifting your focus to something else)
                        and concentration (focusing intently on a non-emotional aspect of the
                        situation).
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">Example:</strong> While waiting for
                        difficult test results on an installation, you focus your attention on
                        preparing for the next task rather than dwelling on what might go wrong.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Cognitive Change (Reappraisal)
                      </p>
                      <p className="text-sm text-white">
                        Changing the meaning you assign to a situation in order to alter its
                        emotional impact. This is the strategy that research consistently identifies
                        as the most effective for everyday regulation. By reframing how you
                        interpret an event, you change the emotion it produces &mdash; before the
                        full emotional response has formed.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">Example:</strong> A client complains about
                        the pace of work. Instead of interpreting it as a personal attack (which
                        triggers anger), you reframe it as a sign that the client cares about the
                        project and wants it done well (which triggers understanding). The situation
                        has not changed, but your emotional response has.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Response Modulation</p>
                      <p className="text-sm text-white">
                        Influencing the emotional response after it has already been generated. This
                        is the latest-stage intervention and includes techniques like suppression
                        (hiding your emotional expression), relaxation techniques (calming the
                        physiological response), and substance use (alcohol, drugs &mdash; an
                        unhealthy strategy). Because it intervenes after the emotion has already
                        formed, it tends to be the most costly strategy.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">Example:</strong> You are already furious
                        about a decision that has been made. You cannot change the decision, and you
                        have already had the emotional reaction. You use deep breathing to calm your
                        physiological response before responding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The critical takeaway from Gross&rsquo;s model is that{' '}
                <strong>earlier intervention is generally better</strong>. If you can avoid a
                triggering situation entirely (situation selection), that is the most efficient
                strategy. If you are already in the situation, modifying it or redirecting your
                attention is more effective than trying to suppress your response after the fact.
                And cognitive reappraisal &mdash; changing the meaning of the situation &mdash; is
                the sweet spot for most real-world scenarios because it is practical, powerful, and
                does not require you to avoid situations altogether.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Construction Reality Check</p>
                </div>
                <p className="text-sm text-white">
                  On a building site, you often cannot select or modify the situation &mdash; you
                  are assigned to the site, working with the people who are there, dealing with
                  whatever problems arise. This makes cognitive reappraisal your most powerful
                  everyday tool. When you cannot change the situation, change the way you think
                  about it. We will explore reappraisal in much more detail in Section 2 of this
                  module.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Suppression vs Healthy Regulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Suppression vs Healthy Regulation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important distinctions in emotional regulation research is between{' '}
                <strong>suppression</strong> and <strong>healthy regulation</strong>. They might
                look similar from the outside &mdash; in both cases, the person appears calm and
                controlled &mdash; but the internal experience and long-term consequences are
                fundamentally different.
              </p>

              <p>
                <strong>Suppression</strong> is the attempt to block the outward expression of an
                emotion. You are still feeling the emotion intensely on the inside, but you are
                forcing yourself not to show it. It is response modulation at its most basic: hide
                what you are feeling. In the construction industry, this is often wrapped up in
                phrases like &ldquo;man up&rdquo;, &ldquo;get on with it&rdquo;, or &ldquo;leave
                your problems at the gate&rdquo;.
              </p>

              <p>
                <strong>Healthy regulation</strong>, by contrast, manages both the internal
                experience and the external expression. A regulated person does not just hide what
                they are feeling &mdash; they actively work to understand it, process it, and choose
                an appropriate response. The emotion is acknowledged, not denied; managed, not
                masked.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Gross &amp; John (2003): The Cost of Suppression
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  In a landmark study, James Gross and Oliver John examined the long-term effects of
                  habitual suppression compared to habitual reappraisal. Their findings were clear
                  and concerning:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Habitual suppressors experienced <strong>more negative emotion</strong>, not
                      less &mdash; suppression blocks the expression but not the experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Suppression increased <strong>physiological stress responses</strong>{' '}
                      including elevated blood pressure and cortisol levels
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Suppressors had <strong>poorer memory</strong> for events during which they
                      were suppressing &mdash; the cognitive effort of hiding emotions consumes
                      mental resources
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Suppression <strong>damaged relationships</strong> because others sensed
                      inauthenticity &mdash; people can tell when someone is hiding their true
                      feelings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Habitual reappraisers, by contrast, experienced{' '}
                      <strong>more positive emotion</strong>, better relationships, and higher
                      overall wellbeing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-red-400 mb-2">Suppression (Harmful)</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Blocks outward expression only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Internal emotional experience continues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Increases physiological stress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Consumes cognitive resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Damages relationships over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Emotions accumulate and eventually explode</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-green-400 mb-2">
                    Healthy Regulation (Effective)
                  </p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Manages both experience and expression</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Acknowledges and processes the emotion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Reduces physiological stress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Preserves cognitive function</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Strengthens relationships through authenticity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Emotions are processed and released healthily</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    The &ldquo;Manning Up&rdquo; Problem in Construction
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The construction industry has a long tradition of emotional suppression. Phrases
                  like &ldquo;man up&rdquo;, &ldquo;stop being soft&rdquo;, and &ldquo;just get on
                  with it&rdquo; have been part of site culture for generations. While resilience is
                  genuinely important in a demanding physical job, there is a critical difference
                  between resilience and suppression:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Resilience</strong> means acknowledging difficulty, processing your
                      response, and continuing forward with purpose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Suppression</strong> means pretending the difficulty does not affect
                      you, pushing it down, and hoping it goes away
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The construction industry has some of the highest rates of mental health
                  difficulties and suicide of any sector in the UK. While the causes are complex and
                  multifaceted, a culture that encourages suppression rather than healthy regulation
                  is a significant contributing factor. Learning to regulate emotions properly is
                  not &ldquo;soft&rdquo; &mdash; it is essential for long-term health, safety, and
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: The 90-Second Rule and Cortisol Cooldown */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The 90-Second Rule and Cortisol Cooldown
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most liberating discoveries in neuroscience comes from{' '}
                <strong>Dr Jill Bolte Taylor</strong>, a Harvard-trained neuroanatomist who studied
                the brain from the inside when she experienced a massive stroke in 1996. Her
                recovery and subsequent research led her to identify what she calls the{' '}
                <strong>90-second rule</strong> &mdash; a finding that fundamentally changes how we
                understand emotional reactions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Jill Bolte Taylor:</strong>{' '}
                  <em>
                    &ldquo;When a person has a reaction to something in their environment, there is
                    a 90-second chemical process that happens in the body; after that, any remaining
                    emotional response is just the person choosing to stay in that emotional loop.
                    Something triggers an automatic response, and chemicals are flushed through your
                    body which puts you on full alert. For 90 seconds you can watch the process
                    happening, you can feel it happening, and then it passes. After that, if you
                    continue to feel fear, anger, and so on, you need to look at the thoughts that
                    you are thinking that are re-stimulating the circuit.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                Here is what happens neurologically when you are triggered. An emotional stimulus
                &mdash; being shouted at, receiving bad news, witnessing something that angers you
                &mdash; activates the amygdala, which triggers the hypothalamus-pituitary- adrenal
                (HPA) axis. Stress hormones including cortisol and adrenaline are released into the
                bloodstream. Your heart rate increases, your muscles tense, your breathing becomes
                shallow, and your cognitive function narrows (this is the &ldquo;tunnel
                vision&rdquo; of the fight-or-flight response).
              </p>

              <p>
                This entire chemical cascade &mdash; from trigger to the flushing of these chemicals
                through the bloodstream and out of the body &mdash; takes approximately{' '}
                <strong>90 seconds</strong>. After that 90-second window, the chemicals have
                completed their cycle. Any continuing emotional state is being maintained not by the
                chemicals, but by your own <strong>thinking patterns</strong> &mdash; the stories
                you are telling yourself, the replaying of the event, the catastrophising about
                consequences.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Practical Implication</p>
                <p className="text-sm text-white mb-3">
                  If you can simply <strong>observe</strong> the 90-second chemical process without
                  feeding it with additional thoughts, the emotion will naturally dissipate. This
                  does not mean the emotion was not real or valid &mdash; it means that the
                  <em> automatic, chemical</em> part of it has a finite duration. After 90 seconds,
                  you have a genuine choice about how to proceed.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>0-90 seconds:</strong> The chemical cascade is running. Feel it. Do
                      not fight it. Do not act on it. Just observe.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After 90 seconds:</strong> The chemicals have flushed. If the emotion
                      persists, it is being sustained by your thoughts. This is where you can
                      intervene with reappraisal and breathing techniques.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                There is also a longer cooldown to be aware of. After a significant amygdala hijack
                &mdash; a major emotional reaction where the fight-or-flight system has fully
                activated &mdash; it takes approximately <strong>20 minutes</strong> for the
                cortisol and adrenaline to fully clear your system and for your prefrontal cortex
                (the rational thinking part of your brain) to come back fully online.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The 90 Seconds After Being Shouted At
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A site manager storms over and publicly berates you for something that was not
                  your fault. Here is what happens and how to apply the 90-second rule:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Seconds 0-10:</strong> Your amygdala fires. Heart rate spikes. Face
                      flushes. Jaw clenches. The urge to shout back is intense.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Seconds 10-30:</strong> Adrenaline and cortisol flood your system.
                      Your thinking narrows. You want to defend, attack, or flee.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Seconds 30-60:</strong> If you have not escalated, the peak intensity
                      begins to subside. The chemicals are being processed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Seconds 60-90:</strong> The chemical cascade completes. If you have
                      not fed the fire with angry thoughts, you now have access to clearer thinking.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After 90 seconds:</strong> You can now respond calmly: &ldquo;I
                      understand you are frustrated. Can we look at this together so we can sort it
                      out?&rdquo; This response is only possible because you waited out the chemical
                      cascade.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The 90-second rule does not mean you should time your emotions with a stopwatch. It
                means you should know that the intense, overwhelming, <em>automatic</em> part of any
                emotional reaction has a natural expiry date. If you can ride out those 90 seconds
                without making it worse &mdash; without shouting back, storming off, sending an
                angry message, or making a decision you will regret &mdash; the chemical storm will
                pass and you will be able to think clearly again. This knowledge alone is
                transformative.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Breathing Techniques for the Workplace */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Breathing Techniques for the Workplace
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Breathing is the one autonomic nervous system function that is also under voluntary
                control. This makes it a unique bridge between the automatic (involuntary) stress
                response and your conscious ability to regulate it. When you deliberately change
                your breathing pattern, you directly influence your heart rate, blood pressure,
                cortisol levels, and state of arousal. This is not relaxation pseudoscience &mdash;
                it is well-established <strong>vagal nerve physiology</strong>.
              </p>

              <p>
                The <strong>vagus nerve</strong> is the longest cranial nerve in the body, running
                from the brainstem through the neck, thorax, and abdomen. It is the main component
                of the parasympathetic nervous system &mdash; the &ldquo;rest and digest&rdquo;
                counterpart to the sympathetic &ldquo;fight or flight&rdquo; system. When you extend
                your exhale relative to your inhale, you stimulate the vagus nerve, which activates
                the parasympathetic response and directly reduces stress. This is why all effective
                breathing techniques share one common feature:{' '}
                <strong>the exhale is at least as long as the inhale</strong>.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Technique 1: Box Breathing (4-4-4-4)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Also known as square breathing or tactical breathing, box breathing is used by
                    Navy SEALs, special forces, elite athletes, and emergency services worldwide.
                    Its effectiveness is backed by extensive military and clinical research.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">4s</p>
                      <p className="text-xs text-white">Inhale</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">4s</p>
                      <p className="text-xs text-white">Hold</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">4s</p>
                      <p className="text-xs text-white">Exhale</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">4s</p>
                      <p className="text-xs text-white">Hold</p>
                    </div>
                  </div>
                  <p className="text-sm text-white">
                    <strong>How to practise:</strong> Breathe in through your nose for 4 seconds.
                    Hold your breath for 4 seconds (do not tense; just pause). Exhale slowly through
                    your mouth for 4 seconds. Hold the empty breath for 4 seconds. Repeat for 4
                    cycles. You can do this silently in the van before a difficult meeting, at your
                    workstation during a stressful moment, or even while walking between tasks on
                    site.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Technique 2: The Physiological Sigh (Huberman, Stanford)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Discovered by Dr Andrew Huberman at Stanford University, the physiological sigh
                    is the fastest known method for reducing stress in real time. Unlike box
                    breathing, which takes several minutes to achieve its full effect, the
                    physiological sigh can reduce stress measurably in a{' '}
                    <strong>single breath cycle</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">1</p>
                      <p className="text-xs text-white">Quick inhale through nose</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">2</p>
                      <p className="text-xs text-white">Second quick inhale on top (sniff)</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">3</p>
                      <p className="text-xs text-white">Long, slow exhale through mouth</p>
                    </div>
                  </div>
                  <p className="text-sm text-white">
                    <strong>Why it works:</strong> The double inhale maximally reinflates the tiny
                    air sacs (alveoli) in the lungs, which tend to collapse when you are stressed
                    and breathing shallowly. The extended exhale then activates the vagus nerve,
                    shifting the autonomic nervous system from sympathetic (fight or flight) to
                    parasympathetic (rest and digest). Huberman&rsquo;s research shows this is
                    something humans and animals do naturally during sleep &mdash; the controlled,
                    deliberate version can be used silently during a confrontation, while driving,
                    or in any situation where you need to calm down quickly without anyone noticing.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Technique 3: The 4-7-8 Technique
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Popularised by Dr Andrew Weil and based on the yogic practice of pranayama, the
                    4-7-8 technique is particularly effective for calming anxiety and preparing for
                    sleep. The extended hold and exhale create a strong parasympathetic activation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">4s</p>
                      <p className="text-xs text-white">Inhale through nose</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">7s</p>
                      <p className="text-xs text-white">Hold breath</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-rose-400">8s</p>
                      <p className="text-xs text-white">Exhale through mouth</p>
                    </div>
                  </div>
                  <p className="text-sm text-white">
                    <strong>How to practise:</strong> Inhale quietly through your nose for 4
                    seconds. Hold your breath for 7 seconds. Exhale completely through your mouth
                    for 8 seconds (making a gentle whooshing sound). Repeat for 4 cycles. The long
                    exhale ratio (twice the length of the inhale) makes this particularly effective
                    for activating the parasympathetic response. This technique is best used in
                    situations where you have some privacy, as the extended hold and audible exhale
                    are more noticeable than box breathing or the physiological sigh.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Which Technique Should I Use When?
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Immediate stress, need to stay discreet:</strong> Physiological sigh
                      &mdash; one breath cycle, completely silent, nobody will notice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Preparing for a difficult conversation or task:</strong> Box breathing
                      &mdash; 2-3 minutes in the van or a quiet spot before you go in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>End of a stressful day, winding down:</strong> 4-7-8 technique &mdash;
                      ideal for the commute home or before sleep
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>During a confrontation:</strong> Physiological sigh between sentences
                      &mdash; buys you time and calms you simultaneously
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Box Breathing Before a Difficult Meeting
                  </p>
                </div>
                <p className="text-sm text-white">
                  You are about to walk into a meeting where you know the main contractor is going
                  to challenge you on a delay that was not your fault. You can feel the tension
                  building. Before you open the door, you sit in the van for two minutes and run
                  through four cycles of box breathing: inhale 4, hold 4, exhale 4, hold 4. By the
                  time you walk in, your heart rate has dropped, your thinking has cleared, and you
                  are able to present your case calmly and factually. The meeting goes well because
                  you entered it regulated, not reactive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> You cannot control what
                  happens to you, but you can control how you respond. Self-regulation is a skill
                  that improves with practice. The science is clear: suppression is harmful,
                  regulation is effective, and the tools to regulate your emotions are simple,
                  discreet, and available to you right now.
                </p>
              </div>

              <p>
                In this section, you have covered a substantial amount of ground. Let us consolidate
                the key concepts before you move on to the next section on impulse control.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Concepts to Remember</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Goleman&rsquo;s five competencies</strong> &mdash; self-control,
                      trustworthiness, conscientiousness, adaptability, and innovation &mdash;
                      provide the framework for what self-regulation looks like in practice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Gross&rsquo;s five strategies</strong> &mdash; situation selection,
                      situation modification, attentional deployment, cognitive change, and response
                      modulation &mdash; show you <em>where</em> to intervene in the emotion
                      generation process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Earlier intervention is better</strong> &mdash; cognitive reappraisal
                      (changing the meaning of a situation) is more effective than response
                      modulation (trying to control your reaction after the fact)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Suppression is harmful</strong> &mdash; it increases stress, damages
                      relationships, and reduces cognitive function. Healthy regulation manages both
                      the experience and the expression
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The 90-second rule</strong> &mdash; the automatic chemical cascade of
                      an emotion lasts about 90 seconds. After that, your thinking is sustaining the
                      emotion. Ride out the 90 seconds before you respond
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Breathing techniques work</strong> &mdash; box breathing, the
                      physiological sigh, and the 4-7-8 technique all activate the parasympathetic
                      nervous system via the vagus nerve, giving you a direct, physical way to
                      regulate stress
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will build on this foundation by exploring impulse control
                and thinking before acting &mdash; including the STOP technique, the 10-10-10 rule,
                and cognitive reappraisal strategies that you can use immediately in your work and
                personal life.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">A Note on Practice:</strong> Reading about these
                  techniques is only the first step. To develop genuine self-regulation ability, you
                  need to <em>practise</em> them regularly &mdash; not just when you are stressed,
                  but when you are calm. This builds the neural pathways so that when a crisis hits,
                  the techniques are automatic rather than something you have to remember under
                  pressure. Try box breathing once a day for the next week, even if you are not
                  stressed. You will be surprised how quickly it becomes second nature.
                </p>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-3-section-2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
