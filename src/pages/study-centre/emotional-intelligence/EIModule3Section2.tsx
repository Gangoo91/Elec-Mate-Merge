import {
  ArrowLeft,
  ArrowRight,
  Timer,
  CheckCircle,
  HelpCircle,
  Brain,
  Smartphone,
  Target,
  Pause,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'marshmallow-outcome',
    question:
      "In the follow-up studies to Mischel's marshmallow experiment, children who demonstrated greater impulse control (waited for the second marshmallow) were found to have which outcomes decades later?",
    options: [
      'Higher levels of creativity and artistic ability',
      'Better academic results, higher incomes, healthier relationships, and lower rates of substance misuse',
      'Higher IQ scores but no difference in emotional wellbeing',
      'Greater physical fitness and lower body mass index only',
    ],
    correctIndex: 1,
    explanation:
      "The longitudinal follow-up studies to Mischel's original 1972 experiment tracked participants over 30+ years. Those who waited for the second marshmallow had significantly better SAT scores, higher educational attainment, healthier BMIs, better stress management, stronger relationships, and higher incomes. Impulse control in childhood was a stronger predictor of adult success than IQ.",
  },
  {
    id: 'stop-technique',
    question: 'What does the acronym STOP stand for in the STOP technique for impulse control?',
    options: [
      'Sit, Think, Observe, Plan',
      'Stop, Take a breath, Observe, Proceed',
      'Slow down, Think it over, Organise, Perform',
      'Stand still, Take stock, Open up, Proceed with caution',
    ],
    correctIndex: 1,
    explanation:
      'STOP stands for: Stop (pause what you are doing), Take a breath (activate parasympathetic response), Observe (notice what you are feeling, thinking, and what is happening around you), Proceed (choose a deliberate response rather than an impulsive reaction). It is a rapid intervention that can be completed in under 30 seconds.',
  },
  {
    id: '10-10-10-rule',
    question: 'What is the purpose of the 10-10-10 rule developed by Suzy Welch?',
    options: [
      'To wait 10 minutes, 10 hours, and 10 days before making any decision',
      'To spend 10 seconds on breathing, 10 seconds on observation, and 10 seconds on planning',
      'To create temporal distance by asking how you will feel about a decision in 10 minutes, 10 months, and 10 years',
      'To count to 10 three times before responding to a provocation',
    ],
    correctIndex: 2,
    explanation:
      "Suzy Welch's 10-10-10 rule asks three questions: How will I feel about this in 10 minutes? 10 months? 10 years? By projecting your decision across three time horizons, you create psychological distance from the impulsive, short-term emotional reaction and gain perspective on the longer-term consequences of your actions.",
  },
];

const faqs = [
  {
    question: 'Is impulse control the same as being indecisive?',
    answer:
      'No. Impulse control and indecisiveness are fundamentally different. Impulse control means deliberately pausing before acting to ensure your response is thoughtful rather than reactive. Indecisiveness means being unable to make a decision even when you have had time to think. A person with strong impulse control can still be decisive — they simply take a moment to ensure their decision is based on rational evaluation rather than emotional reaction. In construction, the best foremen and project managers are both decisive and controlled: they make quick decisions when needed, but they do not make rash decisions driven by frustration or anger.',
  },
  {
    question: 'How do I practise impulse control without seeming slow or hesitant?',
    answer:
      'The pause required for impulse control is often invisible to others. A physiological sigh takes one breath cycle — nobody notices. The STOP technique takes under 30 seconds. Saying "Let me think about that for a moment" before responding to a difficult question is not hesitation; it is professionalism. In fact, research shows that people who pause briefly before responding are perceived as more thoughtful, competent, and trustworthy than those who fire back immediately. The goal is not to delay unnecessarily but to create a tiny gap between stimulus and response — often just a few seconds — that allows your prefrontal cortex to engage before your amygdala takes over.',
  },
  {
    question: 'What if the situation genuinely requires an immediate response?',
    answer:
      'In genuine emergencies — a safety incident, an electrical fault, a falling object — immediate action is appropriate and necessary. Impulse control is not about slowing down in emergencies; it is about not treating every frustrating email, difficult conversation, or professional disagreement as though it were an emergency. The vast majority of situations that feel urgent are actually just uncomfortable, and they benefit from even a brief pause. The more you practise impulse control in low-stakes situations, the better your automatic responses become in high-stakes ones — because your trained brain defaults to a more considered response even under pressure.',
  },
  {
    question: 'I sent an angry message last week and regretted it. What should I do now?',
    answer:
      'Acknowledging the regret is itself an act of emotional intelligence. The best course of action is to address it directly: contact the person, acknowledge that your message was written in the heat of the moment, apologise for the tone, and restate your actual concern calmly. Most people respect this enormously because it takes courage. Then use the experience as a learning moment: implement the 24-hour rule for future digital communications when you are emotionally activated. Write the message if you need to process the emotion, but save it as a draft and revisit it the next day before sending. You will almost always rewrite it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What was the key finding from Walter Mischel's marshmallow experiment and its follow-up studies?",
    options: [
      'Children who ate the marshmallow immediately were more intelligent',
      'Impulse control in childhood predicted academic, financial, and relationship success decades later',
      'There was no significant difference in outcomes between the two groups',
      'The children who waited were more likely to develop anxiety disorders',
    ],
    correctAnswer: 1,
    explanation:
      "Mischel's longitudinal follow-up studies demonstrated that children who were able to delay gratification (wait for the second marshmallow) had significantly better life outcomes across multiple domains — including higher SAT scores, better stress management, lower rates of substance misuse, and stronger relationships — up to 30 years later.",
  },
  {
    id: 2,
    question: 'What is the third step in the STOP technique?',
    options: [
      'Organise your thoughts',
      'Open up to others',
      'Observe what you are feeling, thinking, and what is happening',
      'Overcome the urge to react',
    ],
    correctAnswer: 2,
    explanation:
      'The STOP technique follows four steps: Stop (pause), Take a breath (parasympathetic activation), Observe (notice your feelings, thoughts, bodily sensations, and the situation around you), Proceed (choose a deliberate response). Observation is the critical third step because it creates self-awareness of your internal state before you act.',
  },
  {
    id: 3,
    question:
      "According to Suzy Welch's 10-10-10 rule, what three time horizons should you consider?",
    options: [
      '10 seconds, 10 minutes, 10 hours',
      '10 minutes, 10 months, 10 years',
      '10 days, 10 weeks, 10 months',
      '10 hours, 10 days, 10 weeks',
    ],
    correctAnswer: 1,
    explanation:
      'The 10-10-10 rule uses three time horizons: 10 minutes (immediate emotional impact), 10 months (medium-term consequences), and 10 years (long-term significance). By projecting across these three horizons, you gain temporal distance from the immediate emotional impulse and can evaluate the true importance of the decision.',
  },
  {
    id: 4,
    question: 'What is cognitive reappraisal, and why is it effective for impulse control?',
    options: [
      'Ignoring the emotional response entirely and pretending it does not exist',
      'Reframing the meaning of a situation to change the emotional response before it fully forms',
      'Repeating positive affirmations until the negative emotion goes away',
      'Analysing the situation logically without considering emotions at all',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive reappraisal involves reframing or reinterpreting the meaning of a situation in order to change its emotional impact. It is effective because it intervenes at the appraisal stage of emotion generation — before the full emotional response has formed. Research by Ochsner and Gross (2005) using fMRI scanning confirmed that reappraisal reduces activity in the amygdala (the emotional response centre) while increasing activity in the prefrontal cortex (rational evaluation).',
  },
  {
    id: 5,
    question:
      'Why is text-based communication (WhatsApp, email) particularly high-risk for impulsive responses?',
    options: [
      'Text messages are legally binding in ways that verbal communication is not',
      'Text lacks tone, facial expression, and body language cues, increasing the likelihood of misinterpretation, and messages create a permanent record',
      'People read text messages more carefully than they listen to verbal communication',
      'Text-based communication is slower, giving people more time to get angry',
    ],
    correctAnswer: 1,
    explanation:
      'Text-based communication removes the vast majority of emotional context — tone of voice, facial expression, body language, and pacing — that helps us accurately interpret meaning. Research shows that people tend to interpret ambiguous text messages more negatively than intended. Combined with the permanent, shareable, screenshot-able nature of written messages, this makes impulsive text responses particularly risky for professional relationships.',
  },
  {
    id: 6,
    question:
      'An electrician receives a late-night WhatsApp message from a client complaining about a minor issue. They feel angry and want to fire back. What is the most emotionally intelligent response?',
    options: [
      'Reply immediately to show they are responsive and professional',
      'Block the client to avoid further confrontation',
      'Draft a response but do not send it — apply the 24-hour rule and reply the next day when calm',
      'Forward the message to colleagues to get validation for their anger',
    ],
    correctAnswer: 2,
    explanation:
      'Applying the 24-hour rule is the most emotionally intelligent response. Writing the reply (without sending it) allows you to process the emotion, while waiting until the next day ensures you respond from a regulated state rather than a reactive one. Most people who apply this rule find they completely rewrite their response the next morning. Replying immediately risks escalation; blocking is avoidance; forwarding to colleagues is gossip.',
  },
  {
    id: 7,
    question:
      "In Ochsner and Gross's 2005 fMRI study on cognitive reappraisal, what did brain scans show when participants successfully reappraised negative images?",
    options: [
      'Increased activity in both the amygdala and prefrontal cortex',
      'Decreased activity in the prefrontal cortex and increased amygdala activity',
      'Decreased amygdala activity and increased prefrontal cortex activity',
      'No significant changes in brain activity',
    ],
    correctAnswer: 2,
    explanation:
      "Ochsner and Gross's landmark fMRI study showed that when participants successfully used cognitive reappraisal, activity in the amygdala (the brain's emotional alarm system) decreased while activity in the prefrontal cortex (responsible for rational evaluation and executive function) increased. This provides direct neurological evidence that reappraisal physically changes the brain's emotional processing — it is not just a thinking exercise.",
  },
  {
    id: 8,
    question:
      'Which of the following best describes the relationship between impulse control and professional reputation?',
    options: [
      'Impulse control has no measurable impact on professional reputation',
      'Strong impulse control is only important for managers and leaders, not tradespeople',
      'Every impulsive reaction either builds or erodes your professional reputation, and the effects are cumulative',
      'Impulse control matters initially but becomes less important as you gain experience',
    ],
    correctAnswer: 2,
    explanation:
      'Professional reputation is built through consistent behaviour over time. Every interaction — every response to pressure, every reaction to a mistake, every reply to a difficult message — either reinforces or undermines how others perceive you. A single impulsive outburst can undo months of good work, while consistent, measured responses build a reputation for reliability and professionalism. This applies equally to apprentices and managing directors.',
  },
];

export default function EIModule3Section2() {
  useSEO({
    title: 'Impulse Control & Thinking Before Acting | EI Module 3.2',
    description:
      "Mischel's marshmallow experiment, the STOP technique, 10-10-10 rule, cognitive reappraisal, and digital impulse control strategies for construction professionals.",
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
            <Timer className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Impulse Control &amp; Thinking Before Acting
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Building the capacity to pause between stimulus and response using proven psychological
            techniques and real-world construction strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Research:</strong> Mischel&rsquo;s marshmallow experiment proves impulse
                control predicts life success
              </li>
              <li>
                <strong>Tools:</strong> STOP technique, 10-10-10 rule, cognitive reappraisal
              </li>
              <li>
                <strong>Key risk:</strong> Digital communication amplifies impulsive mistakes
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career:</strong> One impulsive outburst can undo months of good work
              </li>
              <li>
                <strong>Relationships:</strong> Measured responses build trust; reactive ones erode
                it
              </li>
              <li>
                <strong>Safety:</strong> Impulsive decisions on site can have permanent consequences
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the adult implications of Mischel's marshmallow experiment findings",
              'Apply the STOP technique to create a pause between stimulus and response',
              "Use Suzy Welch's 10-10-10 rule to evaluate decisions across three time horizons",
              'Demonstrate cognitive reappraisal using practical before-and-after reframing',
              'Identify the risks of impulsive digital communication and apply the 24-hour rule',
              'Build a personal impulse control toolkit using multiple complementary techniques',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Marshmallow Experiment and Adult Implications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Marshmallow Experiment and Adult Implications
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1972, psychologist <strong>Walter Mischel</strong> at Stanford University
                conducted one of the most famous experiments in the history of psychology. The setup
                was simple: a child was placed in a room with a single marshmallow (or other treat)
                on the table in front of them. They were told they could eat the marshmallow now, or
                if they waited for the researcher to return (approximately 15 minutes), they would
                receive two marshmallows.
              </p>

              <p>
                Some children ate the marshmallow immediately. Others tried to wait but gave in
                after a few minutes. And some managed to delay gratification for the full 15
                minutes, earning the second treat. The experiment itself was interesting, but it was
                the <strong>follow-up studies</strong> that made it revolutionary.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">30+ Years of Follow-Up Data</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Mischel and his team tracked the participants over the following decades. The
                  children who demonstrated greater impulse control &mdash; those who waited for the
                  second marshmallow &mdash; showed consistently better outcomes across multiple
                  life domains:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Academic performance:</strong> On average, 210 points higher on SAT
                      scores
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Career success:</strong> Higher incomes, greater educational
                      attainment, more advanced career positions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Relationships:</strong> More stable, satisfying personal relationships
                      and stronger social networks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Health:</strong> Healthier BMIs, lower rates of substance misuse,
                      better stress management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Key finding:</strong> Impulse control was a stronger predictor of
                      adult success than IQ
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The adult implications are profound. Impulse control is not just about resisting
                marshmallows &mdash; it is about the ability to delay gratification, tolerate
                discomfort, and choose long-term benefit over short-term relief. In the workplace,
                this translates directly to every situation where you face a choice between an
                immediate impulsive reaction and a more considered response.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Construction Example: The Modern Marshmallow Test
                </p>
                <p className="text-sm text-white mb-3">
                  Every day on site, you face adult versions of the marshmallow test:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Resisting the urge to cut corners on a job to save time (short-term relief vs
                      long-term quality and reputation)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Not firing back when someone criticises your work unfairly (immediate
                      emotional satisfaction vs professional relationship)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Completing your paperwork properly rather than rushing it (boring task now vs
                      problems later)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Investing time in studying for qualifications rather than taking the easier
                      path (effort now vs career progression later)
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The encouraging news from Mischel&rsquo;s later work is that impulse control is not
                fixed. Unlike some traits that are largely genetic, the ability to delay
                gratification and control impulses can be strengthened through deliberate practice
                and specific techniques &mdash; which is exactly what the rest of this section will
                teach you.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The STOP Technique */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The STOP Technique
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The STOP technique is one of the most practical impulse control tools available. It
                is widely used in cognitive behavioural therapy, mindfulness-based stress reduction
                programmes, and professional development training. Its power lies in its simplicity
                &mdash; four steps that can be completed in under 30 seconds, creating the critical
                pause between stimulus and response that prevents impulsive reactions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Pause className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Four Steps of STOP</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/30 text-white text-lg font-bold flex-shrink-0">
                      S
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Stop</p>
                      <p className="text-sm text-white">
                        Physically pause whatever you are doing. If you are about to speak, close
                        your mouth. If you are about to type, take your hands off the keyboard. If
                        you are about to march over to someone, plant your feet. The physical act of
                        stopping interrupts the momentum of the impulsive reaction. It does not need
                        to be dramatic or visible &mdash; it can be as subtle as pausing
                        mid-sentence to &ldquo;gather your thoughts&rdquo;.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/30 text-white text-lg font-bold flex-shrink-0">
                      T
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Take a Breath</p>
                      <p className="text-sm text-white">
                        Take one deliberate breath. A physiological sigh (double inhale, long
                        exhale) is ideal because it activates the parasympathetic nervous system in
                        a single cycle. Alternatively, one slow, deep breath through the nose and
                        out through the mouth achieves a similar effect. This is not a relaxation
                        exercise &mdash; it is a neurological intervention that begins shifting your
                        autonomic state from reactive to regulated.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/30 text-white text-lg font-bold flex-shrink-0">
                      O
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Observe</p>
                      <p className="text-sm text-white">
                        Notice what is happening &mdash; both internally and externally. Internally:
                        What am I feeling right now? Where do I feel it in my body? What thoughts
                        are running through my mind? Externally: What is actually happening in this
                        situation? What are the facts (not my interpretation)? What does the other
                        person appear to be feeling? This observational step creates self-awareness
                        and prevents you from acting on assumptions rather than reality.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/30 text-white text-lg font-bold flex-shrink-0">
                      P
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Proceed</p>
                      <p className="text-sm text-white">
                        Choose a deliberate, considered response. The word &ldquo;proceed&rdquo; is
                        intentional &mdash; it implies forward movement with purpose, not avoidance
                        or retreat. Having paused, breathed, and observed, you now have the
                        information and the composure to respond in a way that aligns with your
                        values and professional standards rather than your emotional impulse.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Scenario: STOP Before Confronting a Mistake
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You discover that someone on your team has wired a section incorrectly, and it
                  will need to be ripped out and redone. Your first impulse is to march over and
                  demand to know what they were thinking. Here is STOP in action:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>S &mdash; Stop:</strong> You catch yourself mid-stride. You plant your
                      feet and pause.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>T &mdash; Take a breath:</strong> One physiological sigh. Heart rate
                      begins to settle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>O &mdash; Observe:</strong> I am angry. My jaw is clenched. I want to
                      blame them. But &mdash; was the drawing unclear? Did I brief them properly?
                      Could this have been an honest misunderstanding?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>P &mdash; Proceed:</strong> You walk over calmly and say, &ldquo;I
                      have noticed the wiring on that section does not match the drawing. Can we
                      have a look at it together?&rdquo; The situation is addressed without
                      humiliation, and the working relationship stays intact.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The entire STOP process took less than 30 seconds. Nobody watching would have
                noticed anything unusual. But the difference between the impulsive response (public
                confrontation, damaged relationship, defensive colleague) and the regulated response
                (calm enquiry, collaborative problem-solving, trust maintained) is enormous &mdash;
                and it compounds over time as your reputation for measured professionalism grows.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: The 10-10-10 Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            The 10-10-10 Rule
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 10-10-10 rule was developed by business journalist <strong>Suzy Welch</strong>{' '}
                as a decision-making framework that creates temporal distance from impulsive
                reactions. It is simple to remember, quick to apply, and remarkably effective at
                shifting perspective from short-term emotional impulse to long-term rational
                evaluation.
              </p>

              <p>
                The framework asks three questions about any decision or action you are about to
                take:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Three Time Horizons</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-rose-400 mb-1">10</p>
                    <p className="text-xs font-medium text-rose-400 mb-1">Minutes</p>
                    <p className="text-xs text-white">
                      How will I feel about this in 10 minutes? This captures the immediate
                      emotional response &mdash; the satisfaction of venting, the relief of
                      avoidance, the rush of confrontation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-rose-400 mb-1">10</p>
                    <p className="text-xs font-medium text-rose-400 mb-1">Months</p>
                    <p className="text-xs text-white">
                      How will I feel about this in 10 months? This introduces medium-term
                      consequences &mdash; the impact on relationships, reputation, career
                      trajectory, and ongoing working dynamics.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-rose-400 mb-1">10</p>
                    <p className="text-xs font-medium text-rose-400 mb-1">Years</p>
                    <p className="text-xs text-white">
                      How will I feel about this in 10 years? This provides ultimate perspective
                      &mdash; will this matter at all? Is this worth risking my career or a valued
                      relationship over?
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The power of 10-10-10 lies in the way it forces you to zoom out from the intense,
                narrow focus of the immediate emotional moment. When you are angry, the current
                situation feels like the most important thing in the world. But when you project
                forward &mdash; 10 months, 10 years &mdash; most situations shrink dramatically in
                significance, and the <em>way you handle them</em> becomes far more important than
                the situations themselves.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Construction Example: Sending an Angry WhatsApp
                </p>
                <p className="text-sm text-white mb-3">
                  A main contractor has blamed your team for a delay that was actually caused by
                  their own poor coordination. You are furious and want to fire back with a blunt
                  WhatsApp message setting the record straight. Apply 10-10-10:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>10 minutes:</strong> Sending the message will feel satisfying. You
                      will feel vindicated and righteous. The adrenaline will give you a brief sense
                      of power.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>10 months:</strong> The message has been screenshot and shared. Your
                      reputation with this contractor is damaged. They have moved to a different
                      subcontractor for their next three projects. You have lost significant future
                      revenue.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>10 years:</strong> You cannot even remember what the original delay
                      was about. But the damaged relationship closed doors that would have been
                      valuable to your business.
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The 10-10-10 analysis makes the choice clear: the 10-minute emotional payoff is
                  not worth the 10-month and 10-year consequences. A better approach is to wait,
                  calm down, and then address the issue factually &mdash; either by phone or in a
                  measured written response.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Cognitive Reappraisal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Cognitive Reappraisal
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cognitive reappraisal is the single most well-researched and effective emotion
                regulation strategy for everyday situations. It involves{' '}
                <strong>reframing the meaning of a situation</strong> in order to change the
                emotional response it produces. You are not denying the facts of the situation or
                pretending it does not matter &mdash; you are changing your interpretation of what
                it means.
              </p>

              <p>
                The neurological basis for reappraisal was demonstrated in a landmark 2005 study by{' '}
                <strong>Kevin Ochsner and James Gross</strong> at Columbia and Stanford
                Universities. Using fMRI brain scanning, they showed that when participants
                successfully used cognitive reappraisal, activity in the <strong>amygdala</strong>{' '}
                (the emotional alarm centre) decreased while activity in the{' '}
                <strong>prefrontal cortex</strong> (the rational thinking centre) increased. In
                other words, reappraisal physically changes how the brain processes an emotional
                situation &mdash; it is not just a mental trick.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Mechanism:</strong> The emotional meaning of
                  an event is not inherent in the event itself &mdash; it is created by your
                  interpretation. Two people can experience the exact same situation and have
                  completely different emotional responses because they interpret it differently. By
                  deliberately choosing a different interpretation, you change the emotion at its
                  source, before the full response has formed. This is why reappraisal is more
                  effective than suppression: it changes the <em>experience</em>, not just the{' '}
                  <em>expression</em>.
                </p>
              </div>

              <p>
                Here are practical reappraisal techniques with construction-specific examples,
                showing the before (impulsive interpretation) and after (reappraised
                interpretation):
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-xs font-medium text-rose-400 mb-2">
                    Scenario 1: Client Complaint
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-red-400 mb-1">Before (Impulsive)</p>
                      <p className="text-sm text-white">
                        &ldquo;They are questioning my competence. They do not respect my work. I
                        need to defend myself.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Anger, defensiveness</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-green-400 mb-1">After (Reappraised)</p>
                      <p className="text-sm text-white">
                        &ldquo;They care about the quality of the work in their home. Their concern
                        is an opportunity to demonstrate my professionalism.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Understanding, confidence</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-xs font-medium text-rose-400 mb-2">
                    Scenario 2: Design Change
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-red-400 mb-1">Before (Impulsive)</p>
                      <p className="text-sm text-white">
                        &ldquo;They have changed the design again. They are wasting my time. Nobody
                        respects my effort.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Frustration, resentment</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-green-400 mb-1">After (Reappraised)</p>
                      <p className="text-sm text-white">
                        &ldquo;Design changes are normal in construction. This variation is
                        additional work that I can price. It is a business opportunity.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Acceptance, pragmatism</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-xs font-medium text-rose-400 mb-2">
                    Scenario 3: Colleague Criticism
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-red-400 mb-1">Before (Impulsive)</p>
                      <p className="text-sm text-white">
                        &ldquo;They are undermining me in front of others. This is personal. I need
                        to put them in their place.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Anger, humiliation</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-green-400 mb-1">After (Reappraised)</p>
                      <p className="text-sm text-white">
                        &ldquo;They might be having a bad day. Their feedback, however poorly
                        delivered, might contain something useful. My response will define how
                        others see me.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Curiosity, composure</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-xs font-medium text-rose-400 mb-2">
                    Scenario 4: Apprentice Mistake
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-red-400 mb-1">Before (Impulsive)</p>
                      <p className="text-sm text-white">
                        &ldquo;They have messed up again. They are not listening. I am wasting my
                        time training them.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Exasperation, contempt</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      <p className="text-xs font-medium text-green-400 mb-1">After (Reappraised)</p>
                      <p className="text-sm text-white">
                        &ldquo;Making mistakes is how people learn. I made the same mistakes at
                        their stage. This is a teaching opportunity that will make them better in
                        the long run.&rdquo;
                      </p>
                      <p className="text-xs text-white mt-1">Emotion: Patience, purpose</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Notice that reappraisal does not involve lying to yourself or pretending everything
                is fine. The situation is still challenging. The difference is that you are choosing
                an interpretation that produces a more useful emotional response &mdash; one that
                enables you to respond constructively rather than react destructively.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Digital Impulse Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Digital Impulse Control
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In the modern construction industry, much of our communication happens digitally
                &mdash; WhatsApp groups, emails, text messages, social media. While digital
                communication offers speed and convenience, it also creates a{' '}
                <strong>significantly higher risk for impulsive mistakes</strong> than face-to-face
                interaction. Understanding why this is the case, and having specific strategies to
                manage it, is essential for any professional.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Why Digital Communication Is High-Risk
                  </p>
                </div>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>No tone or body language:</strong> Research shows that 55% of
                      communication is body language, 38% is tone of voice, and only 7% is the
                      actual words (Mehrabian). Text removes 93% of the context.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Negativity bias in reading:</strong> Studies show that people tend to
                      interpret ambiguous text messages more negatively than they were intended. A
                      neutral message gets read as cold; a slightly firm message gets read as
                      aggressive.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Instant delivery, permanent record:</strong> Unlike verbal
                      communication, digital messages arrive instantly (no time to reconsider) and
                      create a permanent record that can be screenshot, forwarded, and used against
                      you.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>No social cues:</strong> In person, you can see the other
                      person&rsquo;s reaction and adjust in real time. In text, you send the message
                      and lose all control of how it lands.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Late-night vulnerability:</strong> Many impulsive messages are sent
                      late at night when fatigue reduces impulse control and emotional regulation is
                      at its lowest.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    The 24-Hour Rule for Emotional Messages
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The 24-hour rule is simple: if you are emotionally activated (angry, frustrated,
                  hurt, insulted), do not send a digital message until at least 24 hours have
                  passed. Here is how to apply it:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 1:</strong> Write the message if you need to (this helps process
                      the emotion) but <em>save it as a draft</em>. Do not press send.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 2:</strong> Sleep on it. Your cortisol levels will be lower in
                      the morning, and your prefrontal cortex will be functioning at full capacity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3:</strong> Read your draft the next day. In the vast majority of
                      cases, you will rewrite it completely. The core concern will still be
                      addressed, but the tone will be professional rather than reactive.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 4:</strong> If the issue is complex or emotional, pick up the
                      phone instead. Voice communication restores tone and allows real-time
                      adjustment &mdash; and it does not create a screenshot-able written record.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: The 10pm WhatsApp Complaint
                </p>
                <p className="text-sm text-white">
                  It is 10pm. You have just finished a long day on site. A client sends a WhatsApp
                  message complaining about something minor &mdash; maybe a small mark on a wall, or
                  a socket plate that is not perfectly level. You are tired, frustrated, and your
                  first impulse is to fire back with something like, &ldquo;I have been working 12
                  hours on your job today and this is the thanks I get?&rdquo; Instead, you apply
                  the 24-hour rule: you put the phone down, go to sleep, and reply the next morning
                  with a calm, professional message acknowledging their concern and offering to
                  rectify it on your next visit. The client feels heard. Your professionalism is
                  intact. The relationship is stronger, not weaker. And you have avoided a message
                  that could have been screenshot and shared, potentially costing you referrals and
                  reputation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">When to Phone Instead of Text</p>
                <p className="text-sm text-white mb-3">
                  As a general rule, move from text to phone whenever:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>The conversation involves any form of conflict or disagreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>You are emotionally activated (angry, hurt, frustrated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>The topic is nuanced and could easily be misinterpreted in text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The exchange has gone back and forth more than three times without resolution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      You would not want the message to be read aloud in a courtroom or by your
                      employer
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 06: Building Your Impulse Control Toolkit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Building Your Impulse Control Toolkit
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Impulse control is not a
                  single skill but a toolkit of complementary techniques. The most effective
                  approach is to have multiple strategies available and to match the technique to
                  the situation. No single method works in every context, but together they give you
                  the capacity to pause, think, and choose your response in any scenario.
                </p>
              </div>

              <p>
                Throughout this section, you have learned five distinct approaches to impulse
                control, each suited to different situations and moments:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Your Impulse Control Toolkit</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The Marshmallow Mindset:</strong> Recognise that delaying
                      gratification and tolerating short-term discomfort leads to better long-term
                      outcomes in career, finances, relationships, and health
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>STOP Technique:</strong> Stop, Take a breath, Observe, Proceed &mdash;
                      a rapid 30-second intervention for in-the-moment impulse control
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>10-10-10 Rule:</strong> Project forward across three time horizons to
                      gain perspective on the true significance of a decision or action
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cognitive Reappraisal:</strong> Reframe the meaning of the situation
                      to change the emotional response before it fully forms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>24-Hour Rule:</strong> For digital communication when emotionally
                      activated &mdash; draft, sleep, review, send (or phone instead)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Impulse Control and Professional Reputation
                </p>
                <p className="text-sm text-white">
                  Your professional reputation is not built in single dramatic moments &mdash; it is
                  built through the accumulation of hundreds of small reactions over time. Every
                  time you respond calmly to provocation, address a problem constructively rather
                  than reactively, or choose to phone rather than send an angry text, you are adding
                  to your reputation as someone who can be trusted under pressure. In construction,
                  where word of mouth is everything and the industry is smaller than you think, this
                  reputation is one of your most valuable professional assets. Impulse control is
                  not just about managing emotions &mdash; it is about building the career you want.
                </p>
              </div>

              <p>
                In the next section, we will explore adaptability and handling change &mdash;
                another crucial self-regulation skill for an industry where no two days are the same
                and the only constant is that plans will change.
              </p>
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../ei-module-3-section-3">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
