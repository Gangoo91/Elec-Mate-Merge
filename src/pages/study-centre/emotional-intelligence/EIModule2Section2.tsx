import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Zap,
  Brain,
  AlertTriangle,
  Link2,
  Lightbulb,
  RefreshCcw,
  HelpCircle,
  Eye,
  BookOpen,
  Target,
  Shield,
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
    question:
      'In the trigger-response chain (stimulus → thought → emotion → behaviour), which step offers the greatest opportunity for intervention?',
    options: [
      'Stimulus — you can always change the external event',
      'Thought — reappraising the event changes the emotional outcome',
      'Emotion — you can choose to feel differently instantly',
      'Behaviour — you can only act after the emotion has fully run its course',
    ],
    correctIndex: 1,
    explanation:
      'While you often cannot control the stimulus and cannot directly choose your emotions, you can change your interpretation (thought) of the event. Cognitive reappraisal at the thought stage alters the emotional response before it fully forms, which in turn changes the behavioural outcome.',
  },
  {
    question:
      'In Albert Ellis\'s ABC Model, what does the "B" stand for, and why is it the most important element?',
    options: [
      'Behaviour — because actions determine outcomes',
      'Beliefs — because your interpretation of the event determines the emotional consequence',
      'Biology — because emotions are purely physical reactions',
      'Balance — because emotional equilibrium is the goal',
    ],
    correctIndex: 1,
    explanation:
      'The "B" stands for Beliefs — the thoughts, interpretations, and assumptions you hold about the Activating event. Ellis argued that it is not the event itself (A) that causes the emotional Consequence (C), but your Beliefs (B) about the event. Changing irrational or unhelpful beliefs changes the emotional outcome.',
  },
  {
    question:
      'Viktor Frankl wrote: "Between stimulus and response there is a space." What does he mean by "space"?',
    options: [
      'A physical distance you should maintain from the trigger',
      'The brief moment of awareness where you can choose your response rather than reacting automatically',
      'The time it takes for the brain to fully shut down the amygdala',
      'A relaxation technique involving controlled breathing',
    ],
    correctIndex: 1,
    explanation:
      'Frankl\'s "space" refers to the moment of conscious awareness between an event and your reaction. In that space, you have the freedom to choose how you respond — rather than being driven by automatic, habitual patterns. Expanding this space through self-awareness is one of the core skills of emotional intelligence.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is it realistic to pause and think about my triggers in the middle of a busy site?',
    answer:
      'Yes, because the pause does not need to be long. A single breath — roughly three seconds — is enough to create a gap between the trigger and your response. You are not stopping work to meditate; you are briefly noticing your emotional state before you react. With practice, this becomes automatic. Elite athletes do the same thing under far greater time pressure: they recognise a trigger, pause internally, and choose their response. The goal is not to analyse every emotion in real time, but to avoid the most damaging automatic reactions.',
  },
  {
    question: 'What if I cannot identify what triggered me until much later?',
    answer:
      'That is completely normal, especially when you are first developing this skill. Many people only recognise their triggers hours after the event — in the van on the way home, or lying in bed that evening. The important thing is to reflect at all. Over time, the gap between the trigger and your awareness of it will shrink. Keeping a brief trigger diary (even just a note on your phone: "Tuesday — snapped when asked to redo work — felt disrespected") speeds up this process dramatically.',
  },
  {
    question: 'Are some people just more easily triggered than others?',
    answer:
      "Yes — and the reasons are both biological and biographical. Some people have a more reactive amygdala (the brain's threat-detection system), which means they respond more quickly and intensely to perceived threats. But life experience also plays a major role. If you grew up in an environment where criticism was frequent, you may be more sensitive to criticism as an adult. The good news is that trigger sensitivity is not fixed. By understanding your triggers and practising cognitive reappraisal, you can gradually reduce their power over you.",
  },
  {
    question: 'How is the ABC Model different from just "thinking positively"?',
    answer:
      'The ABC Model is not about forcing positive thoughts or pretending everything is fine. It is about examining whether your automatic interpretation of an event (your Belief) is accurate, rational, and helpful. Sometimes your negative interpretation is correct — and the appropriate response is to address the problem directly. The ABC Model simply ensures that you check your interpretation before acting on it, rather than assuming your first thought is always the truth. It is about thinking accurately, not thinking positively.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What is the correct order of the trigger-response chain?',
    options: [
      'Emotion → Stimulus → Behaviour → Thought',
      'Stimulus → Thought → Emotion → Behaviour',
      'Thought → Stimulus → Behaviour → Emotion',
      'Behaviour → Emotion → Thought → Stimulus',
    ],
    correctAnswer: 1,
    explanation:
      'The trigger-response chain follows the sequence: Stimulus (the external event) → Thought (your interpretation of it) → Emotion (the feeling that arises from your interpretation) → Behaviour (your outward action). Understanding this chain reveals where you can intervene.',
  },
  {
    id: 2,
    question:
      'Which of the following is the most common workplace trigger across construction research?',
    options: [
      'Having too much free time',
      'Receiving excessive praise',
      'Feeling disrespected or undermined',
      'Working in comfortable conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Research consistently identifies perceived disrespect as one of the strongest emotional triggers in the workplace, particularly in construction where professional competence and trade identity are closely linked to self-worth.',
  },
  {
    id: 3,
    question: 'In Albert Ellis\'s ABC Model, the "A" stands for:',
    options: ['Anger', 'Activating event', 'Automatic thought', 'Affirmation'],
    correctAnswer: 1,
    explanation:
      'A = Activating event (the trigger), B = Beliefs (your interpretation), C = Consequences (the emotional and behavioural result). Ellis argued that B is the critical factor, not A.',
  },
  {
    id: 4,
    question:
      'Two electricians receive the same critical feedback from a supervisor. One feels motivated to improve; the other feels humiliated. According to the ABC Model, the difference is explained by:',
    options: [
      'The supervisor used different words with each person',
      'One electrician is inherently more emotional than the other',
      'Their different beliefs and interpretations of the feedback',
      'The time of day the feedback was given',
    ],
    correctAnswer: 2,
    explanation:
      'The ABC Model specifically predicts that the same Activating event (A) can lead to different Consequences (C) depending on the Beliefs (B) each person holds. One electrician may believe "feedback helps me grow", while the other may believe "criticism means I am incompetent".',
  },
  {
    id: 5,
    question:
      'Which cognitive reappraisal strategy involves asking "What would I tell a friend in this situation?"',
    options: ['Catastrophising', 'Perspective-taking', 'Avoidance', 'Suppression'],
    correctAnswer: 1,
    explanation:
      'Perspective-taking is a cognitive reappraisal technique where you step outside your own viewpoint and consider how you would advise a friend facing the same situation. This often reveals that your initial interpretation is harsher on yourself than it would be on someone else.',
  },
  {
    id: 6,
    question:
      'Viktor Frankl\'s insight about the "space between stimulus and response" suggests that:',
    options: [
      'We have no control over our emotional responses',
      'There is always a moment of choice between what happens to us and how we respond',
      'Emotional responses should be suppressed completely',
      'Triggers only affect weak-minded individuals',
    ],
    correctAnswer: 1,
    explanation:
      'Frankl, writing from his experience in concentration camps, observed that even in the most extreme circumstances, humans retain the ability to choose their response. The "space" is the moment of awareness where choice exists — and self-awareness is the skill that expands that space.',
  },
  {
    id: 7,
    question: 'A trigger diary is useful because it:',
    options: [
      'Eliminates all emotional triggers permanently',
      'Proves that other people are always at fault',
      'Helps you identify patterns in what triggers you and how you typically respond',
      'Replaces the need for self-awareness entirely',
    ],
    correctAnswer: 2,
    explanation:
      'A trigger diary does not eliminate triggers, but it reveals patterns — recurring situations, people, or themes that consistently provoke strong emotional responses. Once you see the pattern, you can prepare for it, reappraise it, or develop a healthier response strategy.',
  },
  {
    id: 8,
    question: 'Cognitive reappraisal differs from emotional suppression in that:',
    options: [
      'Reappraisal ignores the emotion entirely; suppression confronts it',
      'Reappraisal changes the interpretation before the emotion fully forms; suppression tries to block an emotion already in progress',
      'Suppression is healthier and more effective than reappraisal',
      'Reappraisal and suppression are identical processes',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive reappraisal works upstream — by changing your interpretation of the event, you alter the emotional response before it fully develops. Suppression works downstream — the emotion has already formed and you try to hold it in. Research by James Gross consistently shows that reappraisal is healthier and more effective than suppression.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Describe the four-step trigger-response chain: stimulus, thought, emotion, behaviour',
  'Identify at least five common emotional triggers in construction workplaces',
  "Apply Albert Ellis's ABC Model to separate events from interpretations",
  'Explain why the same event can produce different emotional responses in different people',
  'Design a personal trigger diary to map recurring emotional patterns',
  'Use cognitive reappraisal to interrupt automatic emotional reactions',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function EIModule2Section2() {
  useSEO({
    title: 'Recognising Emotional Triggers | Module 2: Self-Awareness',
    description:
      "The trigger-response chain, common workplace triggers, Albert Ellis's ABC Model, event vs interpretation, and breaking automatic emotional patterns.",
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
            <Zap className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 2
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recognising Emotional Triggers
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding what sets off your emotional responses, why the same event affects people
            differently, and how to interrupt automatic reaction patterns.
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
                  Triggers follow a chain: stimulus &rarr; thought &rarr; emotion &rarr; behaviour
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  It is your interpretation of an event, not the event itself, that determines your
                  emotional response
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Albert Ellis&rsquo;s ABC Model provides a framework for examining triggers
                  objectively
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Cognitive reappraisal can break the automatic link between trigger and reaction
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
                  Unrecognised triggers lead to automatic reactions that damage relationships and
                  safety
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Construction sites are high-pressure environments full of potential trigger
                  situations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Understanding your triggers gives you power to choose your response instead of
                  being controlled by it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Mapping personal triggers helps you prepare for recurring situations rather than
                  being ambushed by them
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
        {/*  SECTION 01 — The Trigger-Response Chain                     */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Trigger-Response Chain</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              When something triggers an emotional response, it can feel instantaneous &mdash; as
              though the event and the reaction happen simultaneously. But in reality, every
              emotional reaction follows a chain of four steps, and understanding this chain is the
              key to gaining control over your responses.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Four-Step Chain</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Stimulus (The Event)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Something happens in your external environment. A colleague criticises your
                      work. A client changes the specification for the third time. The material
                      delivery does not arrive. The stimulus is neutral — it is simply an event that
                      occurs.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Thought (Your Interpretation)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Your brain instantly interprets the event based on your past experiences,
                      beliefs, and expectations. This happens so fast that it usually feels
                      automatic. &ldquo;They do not respect my work,&rdquo; or &ldquo;This always
                      happens to me,&rdquo; or &ldquo;The client does not know what they
                      want.&rdquo; This interpretation — not the event itself — determines what you
                      feel.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Emotion (What You Feel)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Based on your interpretation, an emotional response arises. If you interpreted
                      the criticism as disrespectful, you feel angry or humiliated. If you
                      interpreted it as helpful, you feel grateful or motivated. The emotion flows
                      directly from the thought, not from the event.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Behaviour (Your Response)</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      The emotion drives an action — snapping back, withdrawing, slamming tools
                      down, sending an angry text, or calmly addressing the issue. In a triggered
                      reaction, this step feels involuntary. But once you see the chain, you realise
                      that the behaviour is the end product of a sequence you can interrupt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  The Critical Insight: Thought Is the Leverage Point
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                You often cannot control the stimulus &mdash; other people&rsquo;s behaviour,
                unexpected problems, and site disruptions are part of working life. You cannot
                directly control your emotions either &mdash; you cannot simply decide not to feel
                angry. But you <em>can</em> examine and change your thought &mdash; your
                interpretation of the event.
              </p>
              <p className="text-white text-sm leading-relaxed">
                This is not about &ldquo;thinking positively&rdquo; or pretending everything is
                fine. It is about checking whether your automatic interpretation is accurate,
                complete, and helpful. Often, our first thought in a triggering situation is a
                worst-case interpretation that may not reflect reality. By catching and examining
                that thought, you change the emotional outcome &mdash; and therefore the behaviour.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Construction Example</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Stimulus:</strong> The site manager sends you a text at 7 AM saying,
                &ldquo;We need to talk about yesterday&rsquo;s work.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Automatic thought:</strong> &ldquo;I am in trouble. Something must be wrong.
                They are going to criticise me.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Emotion:</strong> Anxiety, dread, defensiveness.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Behaviour:</strong> You arrive on site already tense, braced for conflict.
                When the manager starts speaking, you interrupt defensively before they can even
                finish their sentence.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Alternative thought:</strong> &ldquo;That text could mean anything &mdash;
                they might have a question, want to change the schedule, or even want to commend
                something. I will wait until I hear what they have to say.&rdquo; This
                interpretation produces calm instead of anxiety, and patience instead of
                defensiveness. Same stimulus, completely different outcome.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Common Workplace Triggers                      */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Common Workplace Triggers</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              While emotional triggers are personal &mdash; what triggers you may not trigger
              someone else &mdash; research on workplace conflict and occupational psychology has
              identified several categories that are consistently reported across industries, and
              construction in particular. Recognising these common triggers helps you prepare for
              them rather than being caught off guard.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Five Major Trigger Categories
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <p className="text-white text-sm font-medium">1. Perceived Disrespect</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Feeling that your competence, time, or contribution is not valued. In the
                    electrical trade, this is often the strongest trigger because professional
                    identity is closely linked to skill and workmanship.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Site examples:</strong> Another trade working over or damaging your
                    installation. A client questioning your professional judgement. Being spoken to
                    dismissively by a project manager. Having your completed work inspected without
                    being informed or consulted.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <p className="text-white text-sm font-medium">
                      2. Criticism and Negative Feedback
                    </p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Any feedback that suggests your work is not good enough. Even when the feedback
                    is valid and well-intended, it can trigger defensiveness, shame, or anger
                    &mdash; especially if it touches on something you already feel insecure about.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Site examples:</strong> A supervisor pointing out a wiring error. A
                    failed inspection. A colleague suggesting a better method for something you have
                    always done a particular way.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <p className="text-white text-sm font-medium">
                      3. Time Pressure and Unrealistic Deadlines
                    </p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Feeling that you are being asked to do more than is physically possible in the
                    available time, or that corners are being cut at the expense of quality and
                    safety.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Site examples:</strong> Being told a three-day job must be completed in
                    two. Multiple last-minute variations piling up. Waiting for other trades to
                    finish while your deadline stays fixed.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <p className="text-white text-sm font-medium">4. Perceived Unfairness</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Feeling that rules, rewards, or treatment are applied inconsistently. Humans
                    have a deep-seated sensitivity to unfairness, and perceived injustice is one of
                    the fastest routes to anger.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Site examples:</strong> Colleagues getting preferred shifts or easier
                    jobs. Being blamed for problems caused by someone else. Health and safety rules
                    enforced selectively. Overtime distributed unevenly.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <p className="text-white text-sm font-medium">5. Lack of Control or Autonomy</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Feeling that you have no say over decisions that directly affect your work.
                    Self-Determination Theory (Deci &amp; Ryan) identifies autonomy as a fundamental
                    human need, and threats to it reliably provoke emotional responses.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Site examples:</strong> Being micromanaged by someone who does not
                    understand electrical work. Having your methods dictated by a non-technical
                    manager. Schedule changes imposed without consultation. Not being involved in
                    design decisions that affect your installation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Why the Same Trigger Affects People Differently
              </h3>
              <p className="text-white text-sm leading-relaxed">
                No single event is universally triggering. A comment that sends one person into a
                rage may barely register with another. This is because triggers are personal &mdash;
                they are connected to your individual history, values, beliefs, and sensitivities.
                If you grew up in an environment where criticism was harsh and frequent, you may be
                more sensitive to any form of negative feedback as an adult. If autonomy is one of
                your core values, being micromanaged may be far more triggering for you than it is
                for a colleague who values security above autonomy. Understanding <em>why</em> you
                are triggered, not just <em>that</em> you are triggered, is essential for developing
                effective coping strategies.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Albert Ellis's ABC Model                       */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Albert Ellis&rsquo;s ABC Model</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In the 1950s, psychologist Albert Ellis developed Rational Emotive Behaviour Therapy
              (REBT), one of the earliest forms of cognitive-behavioural therapy. At the heart of
              REBT is the ABC Model &mdash; a simple but transformative framework for understanding
              why we react the way we do.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The ABC Framework</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">A &mdash; Activating Event</p>
                  <p className="text-white text-xs leading-relaxed">
                    The external event or situation that occurs. This is the trigger &mdash; the
                    objective, observable thing that happened. For example: &ldquo;The site manager
                    told me to redo the containment run in the corridor.&rdquo; At this stage, we
                    are describing only what happened, with no interpretation attached.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">B &mdash; Beliefs</p>
                  <p className="text-white text-xs leading-relaxed">
                    Your beliefs, thoughts, and interpretations about the event. This is where the
                    meaning-making happens &mdash; and it is the step that determines everything
                    that follows. Your beliefs might be rational (&ldquo;The containment was not
                    level; I will redo it properly&rdquo;) or irrational (&ldquo;He is always
                    picking on me; nothing I do is ever good enough&rdquo;).
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">C &mdash; Consequences</p>
                  <p className="text-white text-xs leading-relaxed">
                    The emotional and behavioural consequences that flow from your beliefs. If your
                    belief (B) is rational, the consequence (C) is proportionate: mild frustration,
                    a resolve to fix it, moving on. If your belief (B) is irrational, the
                    consequence (C) is disproportionate: rage, resentment, an aggressive
                    confrontation, or sulking for the rest of the day.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  The Core Principle: A Does Not Cause C &mdash; B Does
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Ellis&rsquo;s revolutionary insight was that most people assume the Activating event
                (A) directly causes the emotional Consequence (C). &ldquo;He told me to redo my work
                &mdash; that is why I am angry.&rdquo; But Ellis demonstrated that it is the Belief
                (B) &mdash; your interpretation of the event &mdash; that actually produces the
                emotional response.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                This is not merely a philosophical distinction. It means that while you cannot
                always change what happens to you (A), and you cannot directly control your emotions
                (C), you <em>can</em> examine and change your beliefs (B) &mdash; and by doing so,
                change the emotional outcome.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Ellis identified several common irrational beliefs that amplify emotional reactions.
                These include <strong>demandingness</strong> (&ldquo;things <em>must</em> go the way
                I expect&rdquo;), <strong>catastrophising</strong> (&ldquo;this is the worst thing
                that could happen&rdquo;), <strong>low frustration tolerance</strong>
                (&ldquo;I cannot stand this&rdquo;), and <strong>global rating</strong>
                (&ldquo;because this went wrong, I am a failure&rdquo;). Learning to recognise these
                patterns in your own thinking is a powerful self-awareness skill.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Construction Example: The ABC Model in Action
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>A (Activating Event):</strong> During an end-of-day walkthrough, the
                electrical project manager notes that some of your cable clipping does not meet the
                specified spacing and asks you to redo it tomorrow.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">Irrational Belief Path</p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>B:</strong> &ldquo;He is singling me out. I have been doing this for
                    years and never had a complaint. He obviously does not rate me as an
                    electrician.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>C:</strong> Anger, humiliation, resentment. You barely speak to the PM
                    for the rest of the week. Your motivation drops. You start looking for faults in
                    his management to justify your resentment.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-white text-xs font-semibold mb-2">Rational Belief Path</p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>B:</strong> &ldquo;Fair enough &mdash; the clipping was not to spec on
                    that section. It was a long day and I rushed the last stretch. I will sort it
                    first thing tomorrow.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>C:</strong> Mild frustration, acceptance, resolve to fix it. You address
                    it the next morning, move on, and the working relationship remains intact.
                  </p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                The Activating event was identical in both scenarios. The emotional and behavioural
                outcomes were dramatically different &mdash; entirely because of the Beliefs applied
                to the event.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Event vs Interpretation                        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Event vs Interpretation</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              One of the most powerful self-awareness skills is the ability to separate what
              actually happened from the story your mind tells about it. We do this so automatically
              that most people never realise there is a gap between the raw event and their
              interpretation of it. Learning to see that gap is transformative.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Same Event, Different Interpretations
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-4">
                To demonstrate how powerfully interpretation shapes emotional experience, consider
                these scenarios where the same objective event produces entirely different emotional
                responses depending on the meaning assigned to it:
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">
                    Scenario 1: The Unreturned Call
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Event:</strong> You call your supervisor to discuss a query about a job
                    and they do not call back for three hours.
                  </p>
                  <ul className="text-white text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation A:</strong> &ldquo;They are ignoring me because they
                        do not think my work is important.&rdquo; &rarr; Feeling: resentment, hurt
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation B:</strong> &ldquo;They must be busy — they will call
                        when they can.&rdquo; &rarr; Feeling: patience, mild frustration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation C:</strong> &ldquo;Maybe they did not get my message.
                        I will send a text to follow up.&rdquo; &rarr; Feeling: neutral, proactive
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">
                    Scenario 2: The Changed Plan
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Event:</strong> You arrive on site to find that the job you were
                    assigned has been given to another electrician and you have been moved to a
                    different task.
                  </p>
                  <ul className="text-white text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation A:</strong> &ldquo;They do not trust me with that
                        job. I am being sidelined.&rdquo; &rarr; Feeling: anger, insecurity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation B:</strong> &ldquo;Priorities must have changed
                        overnight. These things happen on big builds.&rdquo; &rarr; Feeling:
                        acceptance, mild annoyance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation C:</strong> &ldquo;This new task might be more
                        challenging and interesting. Let me find out more.&rdquo; &rarr; Feeling:
                        curiosity, openness
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/5 rounded-lg p-3 border border-rose-500/20">
                  <p className="text-rose-400 text-xs font-semibold mb-2">
                    Scenario 3: The Quiet Colleague
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    <strong>Event:</strong> A colleague you usually chat with on the way to the
                    canteen barely speaks during the walk today.
                  </p>
                  <ul className="text-white text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation A:</strong> &ldquo;Have I done something to upset
                        them? They must be angry with me.&rdquo; &rarr; Feeling: anxiety, self-doubt
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation B:</strong> &ldquo;They seem preoccupied. Maybe they
                        have something on their mind.&rdquo; &rarr; Feeling: concern, empathy
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-1.5 flex-shrink-0" />
                      <span>
                        <strong>Interpretation C:</strong> &ldquo;Everyone has quiet days. It is
                        probably nothing to do with me.&rdquo; &rarr; Feeling: neutral, unbothered
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Principle</p>
                  <p className="text-white text-sm leading-relaxed">
                    In every one of these scenarios, the external event was identical. What changed
                    was the interpretation &mdash; the story the person told themselves about what
                    the event meant. This is the heart of cognitive-behavioural psychology: your
                    emotions respond to your interpretation of reality, not to reality itself.
                    Self-awareness means learning to notice the moment of interpretation and asking,
                    &ldquo;Is that the only way to read this situation?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Mapping Your Personal Triggers                 */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Mapping Your Personal Triggers</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Understanding trigger categories in theory is useful, but the real power comes from
              mapping your own specific triggers &mdash; the recurring situations, people, and
              themes that consistently provoke strong emotional responses in <em>your</em> life. A
              trigger diary is the most effective tool for this.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Trigger Diary</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A trigger diary is a brief, structured record of emotionally significant moments. It
                does not need to be a lengthy journal entry &mdash; a few sentences in a notes app
                on your phone is enough. The purpose is to collect data about your own emotional
                patterns so that you can begin to see recurring themes.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                For each entry, record four things:
              </p>
              <ol className="text-white text-sm space-y-2 list-decimal list-inside">
                <li className="leading-relaxed">
                  <strong>The situation:</strong> What happened? Describe the event factually,
                  without interpretation. (&ldquo;The PM asked me to redo the cable management in
                  zone three.&rdquo;)
                </li>
                <li className="leading-relaxed">
                  <strong>The emotion:</strong> What did you feel? Be as specific as possible.
                  (&ldquo;Humiliated and defensive.&rdquo;)
                </li>
                <li className="leading-relaxed">
                  <strong>The thought:</strong> What was your automatic interpretation? (&ldquo;He
                  is implying I do not know what I am doing.&rdquo;)
                </li>
                <li className="leading-relaxed">
                  <strong>The behaviour:</strong> What did you do? (&ldquo;I argued back and said it
                  met the specification, then felt resentful for the rest of the day.&rdquo;)
                </li>
              </ol>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Looking for Patterns</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                After a week or two of recording trigger events, review your entries and look for
                recurring themes. Common patterns include:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Person patterns:</strong> Are your triggers concentrated around specific
                    individuals? Does one particular colleague or manager consistently provoke
                    strong reactions?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Theme patterns:</strong> Is there a recurring theme — criticism,
                    control, fairness, respect — that connects otherwise different situations?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Time patterns:</strong> Are your triggers worse at certain times of day,
                    on certain days of the week, or when you are tired, hungry, or stressed by
                    something outside of work?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Historical patterns:</strong> Do your triggers connect to earlier
                    experiences? A strong reaction to criticism at work might echo experiences of
                    harsh criticism in childhood or during your apprenticeship.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">Practical Tip</p>
              <p className="text-white text-sm leading-relaxed">
                You do not need to record every emotional moment of your day. Focus on the
                <strong> high-intensity</strong> reactions &mdash; the times when your emotional
                response felt disproportionate to the event, or when you look back and think,
                &ldquo;I wish I had handled that differently.&rdquo; These are the entries that
                reveal your most significant trigger patterns.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Breaking the Automatic Pattern                 */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Breaking the Automatic Pattern</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Understanding your triggers is the first step. The second step is learning to
              interrupt the automatic link between trigger and reaction. Two key approaches help you
              do this: cognitive reappraisal and Viktor Frankl&rsquo;s concept of the space between
              stimulus and response.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCcw className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Cognitive Reappraisal</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Cognitive reappraisal is the process of deliberately re-evaluating the meaning of an
                event in order to change your emotional response. It is the practical application of
                the ABC Model &mdash; once you recognise that your Belief (B) is driving your
                Consequence (C), you can consciously examine whether that belief is accurate and
                helpful, and replace it with a more balanced interpretation if it is not.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Stanford psychologist James Gross has spent decades studying emotion regulation
                strategies. His research consistently shows that cognitive reappraisal is one of the
                healthiest and most effective strategies, outperforming both suppression (trying to
                bottle up the emotion) and avoidance (trying to escape the triggering situation).
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Practical reappraisal questions you can ask yourself in a triggering moment:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;What is the evidence for my interpretation? Am I sure that is what they
                    meant?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;Is there another way to read this situation that is equally or more
                    plausible?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;What would I tell a friend who described this exact situation to
                    me?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;Will this matter in a week? A month? A year?&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;Am I assuming intent that may not be there?&rdquo;</span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Viktor Frankl&rsquo;s Insight: The Space Between Stimulus and Response
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Viktor Frankl was an Austrian psychiatrist and Holocaust survivor. In his profoundly
                influential book <em>Man&rsquo;s Search for Meaning</em> (1946), written after his
                liberation from concentration camps, he described an observation that has become one
                of the most quoted principles in psychology and leadership:
              </p>
              <p className="text-white text-sm leading-relaxed italic mb-3">
                &ldquo;Between stimulus and response there is a space. In that space is our freedom
                to choose our response. In our response lies our growth and our freedom.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Frankl&rsquo;s insight is that even in the most extreme circumstances &mdash; even
                when everything external has been taken from you &mdash; the ability to choose your
                internal response remains. That &ldquo;space&rdquo; is the moment of awareness
                between the trigger and your reaction, and self-awareness is what expands it.
              </p>
              <p className="text-white text-sm leading-relaxed">
                In practical terms, the space might be as brief as a single breath. But in that
                breath, you can ask yourself: &ldquo;How do I want to respond to this?&rdquo; rather
                than allowing the habitual reaction to fire on autopilot. Every time you exercise
                that choice, the space becomes a little wider and a little easier to find.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Putting It All Together: A Construction Example
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                You have been working hard all morning to get a section of trunking installed
                neatly. A colleague walks past, looks at it, and says, &ldquo;Is that how you are
                doing it?&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Without self-awareness:</strong> Your automatic interpretation fires
                instantly: &ldquo;He thinks it is rubbish.&rdquo; Anger rises. You snap back,
                &ldquo;What is wrong with it then?&rdquo; The interaction becomes hostile. You both
                feel worse.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>With self-awareness:</strong> You notice the trigger (a comment about your
                work). You feel the initial surge of emotion (defensiveness). You recognise the
                space &mdash; that brief moment before you respond. You ask yourself: &ldquo;Am I
                sure he is criticising? Could it be a genuine question?&rdquo; You take a breath and
                reply, &ldquo;Yeah, this is the approach I am going with. Why, would you do it
                differently?&rdquo; The conversation becomes collaborative rather than combative.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Same stimulus. Different thought. Different emotion. Different behaviour. Different
                outcome. That is the power of recognising your triggers.
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Emotional triggers are not the enemy &mdash; they are data. Every trigger tells
                    you something about what you value, what you fear, and what you need. By mapping
                    your triggers, examining your automatic interpretations, and practising
                    cognitive reappraisal, you transform reactive patterns into chosen responses.
                    The goal is not to stop feeling &mdash; it is to stop feeling controlling you.
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
            <Link to="../ei-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../ei-module-2-section-3">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
