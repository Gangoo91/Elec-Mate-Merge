import { ArrowLeft, UserCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'cr-1-4-check1',
    question:
      'An electrician receives an aggressive text message from a client accusing them of overcharging. Their immediate reaction is a racing heart, clenched jaw, and an urge to fire back an equally aggressive reply. Which part of the brain is driving this response?',
    options: [
      'The prefrontal cortex — the rational decision-making centre',
      "The amygdala — the brain's threat detection centre, which triggers the fight, flight, or freeze response before the rational brain has time to engage",
      'The hippocampus — the memory centre',
      'The cerebellum — the motor control centre',
    ],
    correctIndex: 1,
    explanation:
      "The amygdala is a small, almond-shaped structure in the brain's limbic system that functions as the body's threat detection centre. When it perceives a threat — including social threats like aggressive messages — it triggers the sympathetic nervous system response (fight, flight, or freeze) before the prefrontal cortex (the rational, decision-making part of the brain) has time to engage. This is why you feel the physical symptoms (racing heart, muscle tension, adrenaline) before you have consciously decided how to respond. Understanding this mechanism is crucial because it explains why your first impulse in a conflict is almost always wrong for professional situations — it is a survival response, not a professional response.",
  },
  {
    id: 'cr-1-4-check2',
    question:
      'An electrician arrives at a client\'s property and notices the client is not making eye contact and seems distant. The electrician immediately thinks: "They are going to complain about my work. They are probably planning to withhold payment." According to Argyris\'s ladder of inference, at which rung has the electrician made their critical error?',
    options: [
      "Observation — they should not have noticed the client's behaviour at all",
      'The interpretation and assumption rungs — they have moved from observable data (no eye contact) to an interpretation (client is unhappy) to an assumption (about work complaints and payment) without checking',
      'The action rung — they should act immediately rather than thinking',
      'There is no error — the electrician is being professionally cautious',
    ],
    correctIndex: 1,
    explanation:
      'The electrician\'s error occurs at the interpretation and assumption rungs of the ladder of inference. The observable data is limited: the client is not making eye contact and seems distant. There are dozens of possible explanations for this behaviour — the client might be tired, distracted by a personal problem, feeling unwell, on the phone, or simply not a naturally outgoing person. The electrician has jumped from this limited observation to a specific interpretation (the client is unhappy with their work) and then to a specific assumption (they are planning to withhold payment). These are not supported by the data. The professional response is to test the interpretation by asking a neutral question: "Is everything okay?" or "Shall we have a quick chat about how the job is going?"',
  },
  {
    id: 'cr-1-4-check3',
    question:
      'An electrician is catastrophising about a snagging list: "This client is going to destroy my reputation. I will never work in this area again. My business is finished." Which cognitive distortion technique would be most helpful for challenging these thoughts?',
    options: [
      'Ignoring the thoughts completely and suppressing the anxiety',
      'Accepting the catastrophic predictions as likely outcomes and planning accordingly',
      'Reality testing — asking "What is the actual evidence? What is the most likely outcome? How many similar situations have I handled before without these consequences?"',
      'Agreeing with the client immediately to prevent any negative outcome',
    ],
    correctIndex: 2,
    explanation:
      'Reality testing is the most effective technique for challenging catastrophic thinking. Catastrophising involves jumping to the worst possible outcome and treating it as the most likely outcome. Reality testing forces you to examine the actual evidence: Has a snagging list ever actually destroyed your reputation? How many clients have you worked for successfully? What percentage of snagging items are genuinely serious versus cosmetic? What is the most likely outcome — that you address the snags professionally, the client is satisfied, and the job concludes normally? Almost always, the most likely outcome is far less dramatic than the catastrophic prediction. This does not mean ignoring legitimate concerns — it means proportioning your emotional response to the actual probability of the feared outcome.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is the fight, flight, or freeze response harmful?',
    answer:
      'No — it is an essential survival mechanism that has kept humans alive for hundreds of thousands of years. The problem is not the response itself but the context in which it is activated. In a genuine physical emergency, the fight-flight-freeze response is exactly what you need: adrenaline, increased heart rate, heightened awareness, and rapid decision-making. The issue is that the amygdala cannot distinguish between a physical threat (a falling scaffold) and a social threat (an aggressive email from a client). It triggers the same physiological response for both. In professional conflict situations, this survival response is counterproductive because it bypasses the rational brain that you actually need to handle the situation well. The skill is not in eliminating the response but in creating enough of a pause for your prefrontal cortex to re-engage before you act.',
  },
  {
    question: 'How long does the amygdala hijack typically last?',
    answer:
      'The initial surge of adrenaline and cortisol from an amygdala hijack typically lasts 20 to 30 minutes. During this period, your body is in a heightened state of physiological arousal — elevated heart rate, shallow breathing, muscle tension, reduced blood flow to the prefrontal cortex (which impairs rational thinking). This is why the advice to "count to ten" has some scientific basis — even a brief pause allows the initial spike to begin subsiding. However, the full return to baseline can take up to 2 hours, which is why it is generally unwise to have a significant conflict conversation when you are still physiologically activated. If possible, take a break, walk around, or do something physical before engaging with the issue. Your decision-making quality will be markedly better.',
  },
  {
    question: 'Can I control which rung of the ladder of inference I stop at?',
    answer:
      'You cannot prevent your brain from climbing the ladder — making inferences from data is how human cognition works. What you can control is whether you treat your inferences as facts or as hypotheses. The critical intervention is at the interpretation and assumption rungs: when you notice yourself making an interpretation ("the client seems unhappy") or an assumption ("they are going to complain"), you can deliberately pause and ask: "Is this the only possible interpretation? What else might explain what I am observing? Do I have enough data to be confident in this conclusion?" This practice, sometimes called "checking your ladder," converts automatic assumptions into testable hypotheses. Instead of acting on your assumption, you check it — which usually involves asking a question rather than making a statement.',
  },
  {
    question: 'Are cognitive distortions a sign of mental illness?',
    answer:
      'No. Cognitive distortions are normal patterns of thinking that every human being engages in to some degree. They are mental shortcuts (heuristics) that the brain uses to process information quickly, and in many everyday situations they work well enough. They become problematic when they are frequent, intense, and resistant to correction — when a person consistently catastrophises, mind-reads, or engages in all-or-nothing thinking in a way that causes them significant distress or impairs their functioning. Cognitive Behavioural Therapy (CBT) was developed specifically to help people identify and challenge unhelpful thought patterns, but the basic skill of recognising and questioning your own thinking is available to everyone. It is a professional skill, not a therapeutic one.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The amygdala hijack, a term coined by Daniel Goleman, describes:',
    options: [
      'A deliberate strategy for winning arguments',
      "The process by which the brain's threat detection centre (the amygdala) triggers a fight, flight, or freeze response before the rational brain (prefrontal cortex) can engage",
      'A negotiation technique used in mediation',
      'A type of cognitive bias that affects memory',
    ],
    correctAnswer: 1,
    explanation:
      'Daniel Goleman, author of "Emotional Intelligence" (1995), coined the term "amygdala hijack" to describe what happens when the amygdala — the brain\'s primitive threat detection centre — triggers an immediate emotional and physiological response to a perceived threat before the prefrontal cortex (the rational, executive function part of the brain) has time to process the situation and formulate a considered response. This is why you feel your heart racing, your muscles tensing, and your emotions surging before you have consciously decided how to respond. The response evolved to protect us from physical threats but is triggered equally by social threats such as conflict, criticism, and confrontation.',
  },
  {
    id: 2,
    question: 'The three primary responses triggered by the amygdala in a conflict situation are:',
    options: [
      'Think, plan, and execute',
      'Fight (aggressive confrontation), flight (withdrawal and avoidance), and freeze (paralysis and inaction)',
      'Listen, reflect, and respond',
      'Observe, interpret, and act',
    ],
    correctAnswer: 1,
    explanation:
      'The three primary responses are fight (confronting the threat aggressively), flight (escaping or avoiding the threat), and freeze (becoming paralysed and unable to act). In professional conflict situations, these manifest differently than in physical emergencies. Fight looks like snapping back with an aggressive reply, raising your voice, or making threats. Flight looks like walking away from a conversation, not returning phone calls, or agreeing to anything just to end the interaction. Freeze looks like going blank in a meeting, being unable to articulate your position, or simply doing nothing when action is required. Recognising which response you default to is the first step towards developing more effective conflict behaviours.',
  },
  {
    id: 3,
    question:
      'Chris Argyris developed the ladder of inference in 1990. The correct sequence of rungs, from bottom to top, is:',
    options: [
      'Belief → Action → Conclusion → Assumption → Interpretation → Data → Observation',
      'Action → Belief → Data → Interpretation → Conclusion',
      'Observable data → Selected data → Interpretation → Assumption → Conclusion → Belief → Action',
      'Feeling → Thinking → Acting → Reviewing',
    ],
    correctAnswer: 2,
    explanation:
      'The ladder of inference describes the unconscious process by which we move from raw observation to action. Starting from the bottom: (1) Observable data — what actually happened. (2) Selected data — the portion of data we pay attention to (influenced by our existing beliefs). (3) Interpretation — the meaning we assign to the selected data. (4) Assumption — the conclusions we draw based on our interpretation. (5) Conclusion — the broader implications we derive. (6) Belief — the generalised view we form. (7) Action — what we do based on our beliefs. The critical insight is that this process happens instantaneously and unconsciously — we are usually unaware that we have climbed the ladder until we are already at the top, acting on beliefs that may be based on incomplete or misinterpreted data.',
  },
  {
    id: 4,
    question:
      'An electrician thinks: "The client did not reply to my message within 2 hours. They are obviously unhappy with my work and are going to leave a bad review." This is an example of which cognitive distortion?',
    options: [
      'Catastrophising — jumping to the worst possible outcome',
      'Mind-reading — assuming you know what another person is thinking without evidence',
      'Personalising — assuming a neutral event is specifically about you',
      'All of the above — this thought contains elements of mind-reading, catastrophising, and personalising',
    ],
    correctAnswer: 3,
    explanation:
      "This thought contains three cognitive distortions simultaneously, which is common — distortions rarely occur in isolation. Mind-reading: the electrician is assuming they know the client's mental state (unhappy with the work) without any evidence. Catastrophising: they are jumping to the worst possible outcome (a bad review) rather than considering more likely explanations. Personalising: they are assuming the lack of reply is specifically about them and their work, rather than considering that the client might be busy, at work, driving, or simply not checking their phone. This combination of distortions is particularly damaging because each one reinforces the others, creating a self-amplifying cycle of negative thinking that can affect how the electrician behaves when they next interact with the client.",
  },
  {
    id: 5,
    question:
      'Viktor Frankl wrote: "Between stimulus and response there is a space. In that space is our freedom and our power to choose our response." In the context of conflict resolution, "the space" refers to:',
    options: [
      'The physical distance between you and the other person',
      'The time gap between receiving a complaint and responding to it',
      'The pause between your emotional reaction to a conflict trigger and your chosen behavioural response — the moment where you can engage your rational brain rather than reacting on autopilot',
      'The gap between the quoted price and the actual price',
    ],
    correctAnswer: 2,
    explanation:
      'Frankl\'s insight — developed through his experiences as a psychiatrist and Holocaust survivor — is that human beings have the unique capacity to choose their response to any situation, no matter how difficult. "The space" is the psychological pause between stimulus (the conflict trigger — the aggressive message, the unpaid invoice, the snagging list) and response (your behaviour — what you actually say and do). In practice, this space may be only a few seconds, but it is the most important few seconds in any conflict interaction. During this pause, you can shift from amygdala-driven reaction (fight, flight, or freeze) to prefrontal cortex-driven response (considered, professional, strategic). Developing the ability to widen this space — through awareness, breathing, and deliberate cognitive engagement — is the foundation of emotional self-regulation in conflict.',
  },
  {
    id: 6,
    question:
      'An electrician who always responds to conflict by immediately backing down, agreeing with the other person, and abandoning their own position is most likely defaulting to which response?',
    options: [
      'Fight — aggressive confrontation',
      'Flight — escape and avoidance, manifesting as immediate capitulation to end the uncomfortable interaction',
      'Freeze — paralysis and inability to act',
      'A healthy, balanced conflict response',
    ],
    correctAnswer: 1,
    explanation:
      'Immediately backing down and abandoning your position is a form of the flight response. The person is not physically running away, but they are psychologically fleeing the discomfort of the conflict by surrendering as quickly as possible. The goal is not to reach a good outcome — it is to make the uncomfortable situation stop. This pattern is common among people who experienced conflict as frightening or punishing in childhood, or who have been socialised to believe that standing up for themselves is aggressive or rude. The long-term consequence is that they consistently accept unfair outcomes, accumulate resentment, and teach others that their boundaries can be pushed without resistance. Developing the ability to hold your position calmly — without either fleeing or fighting — is a learnable skill.',
  },
  {
    id: 7,
    question: 'The "reflexive loop" in the ladder of inference describes:',
    options: [
      'The physical reflex response to danger',
      'The process by which our existing beliefs influence which data we select and how we interpret it, creating a self-reinforcing cycle that confirms our existing views',
      'The loop of communication between two people in conflict',
      'The habit of reflecting on past conflicts',
    ],
    correctAnswer: 1,
    explanation:
      'The reflexive loop is one of the most important aspects of the ladder of inference. It describes how the beliefs we form at the top of the ladder feed back down to influence which data we select at the bottom. If you already believe that a particular client is difficult, you will unconsciously notice and select data that confirms this belief (a delayed reply, a slightly curt tone) whilst ignoring data that contradicts it (their timely payments, their positive comments to neighbours). This creates a self-reinforcing cycle: your beliefs shape what you notice, what you notice confirms your beliefs. Breaking the reflexive loop requires deliberately seeking out data that contradicts your existing beliefs — a practice that psychologists call "disconfirmation seeking."',
  },
  {
    id: 8,
    question:
      'An electrician wants to improve their conflict response. The most effective first step is:',
    options: [
      'Reading as many books about conflict as possible',
      'Avoiding all conflict situations to prevent negative outcomes',
      'Reflecting on their last three conflicts — identifying their emotional reaction, their default behavioural response, and whether a different approach would have produced a better outcome',
      'Attending an assertiveness training course immediately',
    ],
    correctAnswer: 2,
    explanation:
      "Self-reflection on recent, real conflicts is the most effective starting point because it provides concrete, personal data rather than abstract theory. By reviewing three recent conflicts, the electrician can identify patterns: Do I consistently fight, flee, or freeze? Do I climb the ladder of inference and act on assumptions? Do I catastrophise, mind-read, or personalise? What were the actual outcomes, and would a different response have produced a better result? This reflection converts theory into personal insight — which is far more motivating and actionable than reading about someone else's experience. Books, courses, and training are all valuable, but they are most effective when built on a foundation of honest self-assessment.",
  },
];

export default function CRModule1Section4() {
  useSEO({
    title: 'Understanding Your Default Response | Conflict Resolution Module 1.4',
    description:
      'Fight, flight, or freeze, the ladder of inference, cognitive distortions in conflict, and understanding the gap between stimulus and response.',
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
            <Link to="../cr-module-1">
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
            <UserCheck className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Understanding Your Default Response
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Fight, flight, or freeze, the ladder of inference, cognitive distortions in conflict,
            and the gap between stimulus and response
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Your brain&rsquo;s threat response</strong> (fight, flight, freeze)
                activates before your rational mind engages
              </li>
              <li>
                <strong>The ladder of inference</strong> (Argyris, 1990) shows how we leap from
                observation to action based on untested assumptions
              </li>
              <li>
                <strong>Cognitive distortions</strong> &mdash; catastrophising, mind-reading,
                personalising &mdash; distort your perception of conflict
              </li>
              <li>
                <strong>Viktor Frankl:</strong> Between stimulus and response is a space &mdash; and
                in that space lies your freedom to choose
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Self-awareness:</strong> Knowing your default response is the foundation for
                changing it
              </li>
              <li>
                <strong>Better decisions:</strong> Understanding the amygdala hijack helps you pause
                before reacting
              </li>
              <li>
                <strong>Accuracy:</strong> Catching cognitive distortions prevents you from
                responding to imagined threats
              </li>
              <li>
                <strong>Professionalism:</strong> The ability to choose your response separates
                reactive tradespeople from professional ones
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain why self-awareness is the foundational skill for effective conflict management',
              'Describe the fight, flight, and freeze responses and how each manifests in professional trade disputes',
              "Walk through the rungs of Argyris's ladder of inference and identify where errors typically occur",
              'Name four common cognitive distortions (catastrophising, mind-reading, personalising, all-or-nothing thinking) with trade-specific examples',
              "Explain Frankl's concept of the space between stimulus and response and its application to conflict",
              'Conduct a self-assessment by reflecting on your last three conflicts to identify your default patterns',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Self-Awareness as Foundation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Self-Awareness as Foundation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before you can change how you handle conflict, you need to understand how you
                currently handle it. This is not as obvious as it sounds. Most people believe they
                respond to conflict rationally and proportionately &mdash; it is always the{' '}
                <em>other person</em> who is being unreasonable. But research consistently shows
                that human conflict behaviour is largely habitual and unconscious. We react on
                autopilot, using the same patterns we have used for years, without examining whether
                those patterns are actually serving us well.
              </p>

              <p>
                In Section 2, we explored the Thomas-Kilmann model and its five conflict styles. You
                may already have a sense of which style you default to &mdash; whether you tend to
                compete, collaborate, compromise, avoid, or accommodate. But knowing your TKI
                default is only the beginning. Underneath your behavioural style are deeper
                patterns: how your body responds to perceived threats, how your mind processes
                conflict-related information, and how your thinking patterns shape your perception
                of what is actually happening. These deeper patterns &mdash; the amygdala hijack,
                the ladder of inference, and cognitive distortions &mdash; operate below conscious
                awareness and have a profound influence on your behaviour.
              </p>

              <p>
                Self-awareness in conflict is not navel-gazing. It is a practical,
                performance-enhancing skill. An electrician who understands that they default to
                avoidance can catch themselves doing it and make a conscious choice to engage. An
                electrician who recognises their tendency to catastrophise can challenge the
                catastrophic thought before it drives their behaviour. An electrician who knows they
                are experiencing an amygdala hijack can pause for 60 seconds before responding to an
                aggressive message. Each of these interventions is only possible with
                self-awareness.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Fight, Flight, or Freeze */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Fight, Flight, or Freeze &mdash; Your Body&rsquo;s Conflict Response
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When you perceive a threat &mdash; whether it is a physical danger or a social one
                like an aggressive client message &mdash; your brain&rsquo;s{' '}
                <strong>amygdala</strong> activates the sympathetic nervous system before your
                conscious mind has time to assess the situation. This is what psychologist{' '}
                <strong>Daniel Goleman</strong> famously called the{' '}
                <strong>&ldquo;amygdala hijack&rdquo;</strong> in his 1995 book{' '}
                <em>Emotional Intelligence</em>. The amygdala triggers a cascade of physiological
                changes: adrenaline and cortisol flood your bloodstream, your heart rate increases,
                your muscles tense, blood flow redirects away from your prefrontal cortex (the
                rational thinking centre) and towards your major muscle groups. Your body is
                preparing you to fight the threat, flee from it, or freeze in place.
              </p>

              <p>
                In a genuine physical emergency &mdash; a scaffold collapse, an electrical arc
                flash, a vehicle about to hit you &mdash; this response is lifesaving. The problem
                is that the amygdala cannot distinguish between physical threats and social ones. An
                aggressive text message from a client triggers the same physiological response as a
                physical danger. Your body floods with the same stress hormones, your rational brain
                is equally suppressed, and your behaviour is equally reactive. The result is that
                your first impulse in a conflict &mdash; the one that arrives before your thinking
                brain engages &mdash; is almost always inappropriate for a professional context.
              </p>

              <p>
                In trade disputes, the three responses manifest in predictable ways.{' '}
                <strong>Fight</strong> looks like firing back an aggressive reply to a text, raising
                your voice during a site disagreement, making threats (&ldquo;I&rsquo;ll stop the
                job right now&rdquo;), or becoming sarcastic and belittling. <strong>Flight</strong>{' '}
                looks like agreeing to anything just to end the conversation, not returning
                difficult phone calls, capitulating on legitimate charges, or leaving a job rather
                than addressing a problem. <strong>Freeze</strong> looks like going blank during a
                site meeting, being unable to articulate your position when challenged, staring at
                an aggressive email without being able to formulate a response, or simply doing
                nothing when action is required.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How Fight, Flight, and Freeze Manifest in Trade Disputes
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Fight:</strong> Aggressive replies, raised voice, threats to stop
                      work, sarcasm, personal attacks, confrontational body language (pointed
                      finger, invading personal space)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Flight:</strong> Immediate capitulation, not returning calls, agreeing
                      to unreasonable demands, avoiding the client/contractor, leaving jobs
                      unfinished rather than confronting the problem
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Freeze:</strong> Going blank in meetings, inability to respond to
                      challenges, staring at a difficult email for hours, paralysis when a quick
                      decision is needed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Ladder of Inference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Ladder of Inference
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1990, organisational theorist <strong>Chris Argyris</strong> (Harvard Business
                School) published a model he called the <strong>ladder of inference</strong>, which
                describes the unconscious mental process by which human beings move from raw
                observation to action. The model has become one of the most widely used frameworks
                in conflict resolution, leadership development, and organisational learning. Its
                power lies in making visible a process that is normally invisible &mdash; the chain
                of inferences that occurs in milliseconds between seeing something and acting on it.
              </p>

              <p>
                The ladder has seven rungs, from bottom to top: <strong>(1) Observable data</strong>{' '}
                &mdash; the raw reality of what is happening. <strong>(2) Selected data</strong>{' '}
                &mdash; the portion of reality you pay attention to (you cannot process everything,
                so you select). <strong>(3) Interpretation</strong> &mdash; the meaning you assign
                to the selected data. <strong>(4) Assumption</strong> &mdash; the broader
                conclusions you draw from your interpretation. <strong>(5) Conclusion</strong>{' '}
                &mdash; the judgement you form about the situation or person.{' '}
                <strong>(6) Belief</strong> &mdash; the generalised view that becomes part of how
                you see the world. <strong>(7) Action</strong> &mdash; what you do based on your
                beliefs.
              </p>

              <p>
                The most dangerous aspect of the ladder is the <strong>reflexive loop</strong>: your
                existing beliefs at the top of the ladder feed back down to influence which data you
                select at the bottom. If you already believe a particular client is difficult, you
                will unconsciously notice the data that confirms this belief (a delayed reply, a
                slightly curt tone) and ignore data that contradicts it (their timely payments,
                their positive comments to your work). This creates a self-reinforcing cycle that
                makes your beliefs increasingly resistant to revision.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Ladder of Inference &mdash; Construction Example
                </p>
                <ul className="text-base text-white space-y-2">
                  <li>
                    <strong>1. Observable data:</strong> The client reads the invoice and frowns.
                  </li>
                  <li>
                    <strong>2. Selected data:</strong> You notice the frown but not that they were
                    squinting at small text without their reading glasses.
                  </li>
                  <li>
                    <strong>3. Interpretation:</strong> &ldquo;They are unhappy with the
                    price.&rdquo;
                  </li>
                  <li>
                    <strong>4. Assumption:</strong> &ldquo;They think I have overcharged
                    them.&rdquo;
                  </li>
                  <li>
                    <strong>5. Conclusion:</strong> &ldquo;They are going to dispute the
                    invoice.&rdquo;
                  </li>
                  <li>
                    <strong>6. Belief:</strong> &ldquo;Clients always try to beat down the
                    price.&rdquo;
                  </li>
                  <li>
                    <strong>7. Action:</strong> You defensively justify the price before the client
                    has said a word &mdash; which actually creates the conflict you were trying to
                    avoid.
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The entire chain &mdash; from frown to defensive justification &mdash; happens in
                  seconds. At every rung above observation, the electrician is adding meaning that
                  is not supported by the data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Cognitive Distortions in Conflict */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Cognitive Distortions in Conflict
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cognitive distortions are systematic errors in thinking that cause you to perceive
                reality inaccurately. First identified by psychiatrist <strong>Aaron Beck</strong>{' '}
                in the 1960s and further developed by his student <strong>David Burns</strong> in
                the 1980s, cognitive distortions are central to Cognitive Behavioural Therapy (CBT).
                Everyone experiences them to some degree, but in conflict situations &mdash; when
                emotions are heightened and the amygdala is activated &mdash; they become
                particularly intense and influential.
              </p>

              <p>
                <strong>Catastrophising</strong> is jumping to the worst possible outcome and
                treating it as the most likely outcome. In trade disputes, catastrophising sounds
                like: &ldquo;This client is going to destroy my reputation online.&rdquo; &ldquo;If
                I challenge the main contractor, I will never work for them again.&rdquo;
                &ldquo;This snagging list means my work is substandard and I should not be in
                business.&rdquo; In reality, the vast majority of client interactions end
                satisfactorily, most main contractors value reliable subcontractors who communicate
                professionally, and snagging lists are a normal part of the construction process.
              </p>

              <p>
                <strong>Mind-reading</strong> is assuming you know what another person is thinking
                or feeling without asking them. In conflict, mind-reading sounds like: &ldquo;The
                client thinks I am too expensive.&rdquo; &ldquo;The site manager is deliberately
                trying to make me look bad.&rdquo; &ldquo;The other electrician is jealous of my
                contract.&rdquo; In each case, you are attributing a specific mental state to
                someone based on your own anxiety rather than their actual words or behaviour. The
                antidote is simple but requires courage: ask.
              </p>

              <p>
                <strong>Personalising</strong> is assuming that a neutral event is specifically
                about you. A client who is in a bad mood when you arrive is not necessarily unhappy
                with your work &mdash; they might have had a difficult morning, received bad news,
                or be dealing with an unrelated problem. <strong>All-or-nothing thinking</strong> is
                seeing situations in binary extremes: a client who raises one concern is
                &ldquo;impossible to please,&rdquo; a colleague who disagrees once is &ldquo;always
                against me,&rdquo; a single mistake means &ldquo;I am useless.&rdquo; Reality is
                almost always more nuanced than these extremes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Challenging Cognitive Distortions: Three Questions
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;What is the actual evidence?&rdquo;</strong> &mdash; Not what
                      you feel, not what you fear, but what specific, observable data supports your
                      conclusion?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;What is the most likely outcome?&rdquo;</strong> &mdash; Not
                      the worst possible outcome, but the most probable one based on past experience
                      and available data?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;Is there another way to interpret this?&rdquo;</strong> &mdash;
                      What are three alternative explanations for what you are observing, none of
                      which involve a negative intention towards you?
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Gap Between Stimulus and Response */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Gap Between Stimulus and Response
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everything in this section leads to a single, transformative idea articulated by{' '}
                <strong>Viktor Frankl</strong>, the Austrian psychiatrist and Holocaust survivor
                whose experiences in Nazi concentration camps led him to develop{' '}
                <strong>logotherapy</strong> &mdash; a form of existential psychotherapy based on
                the premise that human beings can find meaning even in the most extreme suffering.
                Frankl&rsquo;s insight about the space between stimulus and response has become one
                of the most widely quoted ideas in psychology, leadership, and conflict resolution.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Viktor Frankl</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Between stimulus and response there is a space. In that space is our
                    freedom and our power to choose our response. In our response lies our growth
                    and our freedom.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Viktor Frankl, <em>Man&rsquo;s Search for Meaning</em> (1946)
                </p>
              </div>

              <p>
                In the context of conflict resolution for tradespeople, this idea is profoundly
                practical. The &ldquo;stimulus&rdquo; is the conflict trigger: the aggressive text
                message, the unpaid invoice, the unfair snagging list, the dismissive site manager.
                The &ldquo;response&rdquo; is your behaviour: what you actually say and do. Between
                these two events is a space &mdash; it might be only a few seconds, but it is the
                most important space in any conflict interaction. In that space, you have the
                freedom to choose: will you react from your amygdala (fight, flight, or freeze), or
                will you respond from your prefrontal cortex (considered, professional, strategic)?
              </p>

              <p>
                Developing this space is not about suppressing your emotions or pretending you are
                not upset. It is about creating enough of a pause for your rational brain to
                re-engage before you act. Practical techniques for widening the space include:
                taking three slow breaths before responding to a difficult message, physically
                stepping away from a heated conversation for 60 seconds, writing a reply but waiting
                30 minutes before sending it, and asking yourself the three questions for
                challenging cognitive distortions. Each of these creates the time your prefrontal
                cortex needs to override the amygdala&rsquo;s initial reaction.
              </p>

              <p>
                The self-assessment component of this section asks you to reflect on your last three
                conflicts &mdash; any disagreements, disputes, or difficult conversations. For each
                one, consider: What was the trigger? What was my immediate emotional reaction? What
                did I actually do? Was my response effective, or did it make things worse? What
                would I do differently now? This reflection is not about self-criticism. It is about
                building the self-awareness that makes the space between stimulus and response
                visible &mdash; and usable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Self-Assessment: Your Last Three Conflicts
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What was the trigger?</strong> What specific event, message, or
                      behaviour started the conflict?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What was your immediate reaction?</strong> Did you feel anger (fight),
                      anxiety (flight), or paralysis (freeze)?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What did you actually do?</strong> Did you confront, avoid, or
                      accommodate? Did you respond immediately or after reflection?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What was the outcome?</strong> Was the conflict resolved, avoided, or
                      escalated? Are you satisfied with how it ended?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>What would you do differently?</strong> With the benefit of hindsight,
                      what alternative response might have produced a better outcome?
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has explored the internal landscape of conflict &mdash; what happens
                inside your brain and mind when you encounter a disagreement. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-awareness is the foundation.</strong> You cannot change a pattern
                    you are not aware of. Understanding your default conflict response is the
                    essential first step.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The amygdala hijack</strong> (Goleman, 1995) triggers fight, flight, or
                    freeze before your rational brain engages. This is why your first impulse in
                    conflict is almost always wrong for professional situations.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The ladder of inference</strong> (Argyris, 1990) shows how we leap from
                    observation to action through untested assumptions. The reflexive loop means our
                    existing beliefs shape what data we even notice.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Cognitive distortions</strong> &mdash; catastrophising, mind-reading,
                    personalising, all-or-nothing thinking &mdash; distort your perception of
                    conflict. They can be challenged with three questions: What is the evidence?
                    What is the most likely outcome? Is there another interpretation?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Frankl&rsquo;s space</strong> between stimulus and response is where
                    your freedom to choose lies. Widening this space through breathing, pausing, and
                    cognitive engagement transforms reactive behaviour into professional response.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The self-assessment exercise</strong> &mdash; reflecting on your last
                    three conflicts &mdash; converts theory into personal insight and identifies
                    your specific areas for development.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> Module 2 will build on this
                  foundation by exploring communication techniques for difficult conversations
                  &mdash; active listening, Nonviolent Communication (Rosenberg), the Crucial
                  Conversations framework, and the distinction between assertiveness and aggression.
                </p>
              </div>
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
