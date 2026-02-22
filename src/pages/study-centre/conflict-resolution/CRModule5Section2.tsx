import { ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';
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
    id: 'cr-5-2-check1',
    question:
      'An angry client is shouting at an electrician on site about a mark left on their newly painted wall. The electrician feels their own anger rising. According to de-escalation principles, what should the electrician do FIRST?',
    options: [
      'Explain immediately that the mark was not their fault and was probably caused by the plasterer',
      'Shout back to establish authority and show they will not be pushed around',
      'Manage their own emotional state first — controlled breathing, lowered voice, slower speech — before attempting to respond to the client',
      'Walk off site immediately without saying anything',
    ],
    correctIndex: 2,
    explanation:
      "The first priority in any de-escalation is managing your own emotional state. If you respond while your own amygdala is activated — when your heart rate is elevated, your voice is rising, and your body is tensing — you will escalate the situation, not de-escalate it. Controlled breathing (slow inhale through the nose, slow exhale through the mouth) activates the parasympathetic nervous system and lowers your heart rate within seconds. Deliberately lowering your voice and slowing your speech sends a calming signal to both your own brain and the other person's. Only once you are in a regulated emotional state should you attempt to address the client's concerns. This sequence — self-regulation first, then engagement — is the foundation of all effective de-escalation.",
  },
  {
    id: 'cr-5-2-check2',
    question:
      "George Thompson's LEAPS model (from Verbal Judo) stands for Listen, Empathise, Ask, Paraphrase, Summarise. Why is the order of these steps important?",
    options: [
      'It is not important — you can use the steps in any order as long as you cover all five',
      'The order follows the natural de-escalation sequence: first you make the other person feel heard (Listen, Empathise), then you gather information (Ask, Paraphrase), then you confirm mutual understanding (Summarise)',
      'The order is based on alphabetical convenience and has no practical significance',
      'The steps are designed to be used simultaneously rather than sequentially',
    ],
    correctIndex: 1,
    explanation:
      'The LEAPS sequence is deliberately ordered to follow the natural de-escalation process. You start with listening and empathising because a person in emotional distress needs to feel heard before they can engage rationally. Trying to ask questions or gather information while someone is still emotionally flooded will be perceived as interrogation or dismissal. Once the person feels acknowledged (through listening and empathising), their emotional intensity naturally reduces, creating space for rational dialogue. Only then do you ask questions (to understand the specifics), paraphrase (to confirm your understanding), and summarise (to establish a shared view of the situation). Skipping the first two steps — which many people do because they want to jump straight to problem-solving — typically results in escalation rather than resolution.',
  },
  {
    id: 'cr-5-2-check3',
    question:
      'A site foreman becomes increasingly aggressive towards an electrician, raising his voice, standing too close, and making personal insults. The electrician has tried to de-escalate but the foreman is getting worse. What should the electrician do?',
    options: [
      'Continue trying to de-escalate — persistence always works eventually',
      "Match the foreman's aggression to show they are not intimidated",
      'Remove themselves from the situation immediately, document what happened, and report the behaviour through the appropriate channels',
      'Apologise and accept whatever the foreman is demanding to end the confrontation',
    ],
    correctIndex: 2,
    explanation:
      "When someone becomes aggressive — raised voice, physical intimidation, personal insults — de-escalation has failed and continuing to engage carries genuine risk. The electrician's priority shifts from resolving the conflict to ensuring their own safety. Removing yourself from the situation is not weakness or avoidance — it is the only appropriate response to aggression. After leaving, the electrician should document exactly what happened (date, time, location, what was said, any witnesses), report the behaviour to the site manager or principal contractor, and if the behaviour constitutes threatening or harassing conduct, consider whether it should be reported to the police. No work dispute justifies tolerating aggressive or threatening behaviour.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What is the amygdala hijack and why does it matter in conflict situations?',
    answer:
      "The amygdala hijack is a term coined by psychologist Daniel Goleman to describe what happens when the amygdala — the brain's threat detection centre — takes over from the prefrontal cortex (the rational, decision-making part of the brain). When someone perceives a threat (which can be a physical threat, a verbal attack, or even a perceived challenge to their competence or status), the amygdala triggers the fight-or-flight response: heart rate increases, adrenaline surges, muscles tense, and the rational brain goes partially offline. In this state, a person literally cannot think clearly, process complex information, or make good decisions. This is why trying to reason with someone who is emotionally flooded does not work — their rational brain is temporarily unavailable. De-escalation works by reducing the perceived threat level, which allows the amygdala to stand down and the prefrontal cortex to re-engage.",
  },
  {
    question: 'Does de-escalation mean I have to agree with the other person?',
    answer:
      'Absolutely not. De-escalation is about reducing emotional intensity so that a productive conversation becomes possible — it is not about agreeing, surrendering, or admitting fault. Acknowledging someone\'s emotion ("I can see you are really frustrated about this") is not the same as agreeing they are right. You can fully validate someone\'s emotional experience while completely disagreeing with their position on the facts. In fact, effective de-escalation often leads to a better outcome for you, because once the other person is calm, they are more likely to listen to your perspective, consider your evidence, and reach a reasonable resolution. Engaging with someone while they are angry, by contrast, almost always results in a worse outcome for everyone.',
  },
  {
    question: 'What if I am the one who is angry — how do I de-escalate myself?',
    answer:
      'Self-regulation is the foundation of all conflict management. If you recognise that you are becoming emotionally hijacked — your heart rate is rising, your voice is getting louder, your thoughts are becoming hostile — the first step is physical: slow, controlled breathing. Breathe in for four counts through your nose, hold for four counts, breathe out for six counts through your mouth. This activates the parasympathetic nervous system and begins to counteract the adrenaline response within 30 to 60 seconds. The second step is cognitive: notice your thoughts without acting on them. "I notice I am feeling angry" is very different from "I am angry." The third step is behavioural: slow down. Speak more slowly, move more slowly, and create physical space. If you cannot regulate yourself in the moment, use the 24-hour rule: explain that you need time to consider the situation and will respond tomorrow. Walking away to calm down is not avoidance — it is self-management.',
  },
  {
    question: 'How long does it typically take for someone to calm down from an amygdala hijack?',
    answer:
      'The acute physiological response — the surge of adrenaline and cortisol that characterises the fight-or-flight reaction — typically lasts 20 to 30 minutes. During this period, the person is physically unable to engage in fully rational thought. Their heart rate is elevated, their muscles are tense, and their prefrontal cortex is partially offline. This is why the 24-hour rule exists for non-urgent conflicts: even after the acute response subsides, residual stress hormones can affect judgement and emotional regulation for hours. The practical implication is clear: if someone is in full amygdala hijack, you cannot resolve the underlying conflict in that moment. The only realistic goal is to reduce the emotional temperature enough to agree to continue the conversation later. Trying to reach a resolution while someone is in this state will almost always fail and may make things worse.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'De-escalation is best defined as:',
    options: [
      'Winning an argument by being calmer than the other person',
      'Reducing emotional intensity to a level where productive conversation and problem-solving become possible',
      'Avoiding all conflict by agreeing with whatever the other person says',
      "Using authority or power to silence the other person's complaints",
    ],
    correctAnswer: 1,
    explanation:
      'De-escalation is specifically about reducing emotional intensity — bringing the temperature down — so that both parties can engage in rational, productive dialogue. It is not about winning, avoiding, or suppressing conflict. The underlying issue still needs to be resolved, but it cannot be resolved while one or both parties are in an emotionally heightened state. De-escalation creates the conditions for resolution; it is not a substitute for resolution. This distinction is important because many people confuse de-escalation with capitulation. You can de-escalate a situation while maintaining your position entirely — the goal is to change the emotional dynamic, not the factual one.',
  },
  {
    id: 2,
    question:
      'In George Thompson\'s LEAPS model, what does the "E" stand for, and why does it come before "Ask"?',
    options: [
      '"Explain" — you should explain your position before asking questions',
      '"Empathise" — acknowledging the other person\'s emotional state before gathering information, because people cannot engage rationally until they feel heard',
      '"Evaluate" — you should evaluate the situation before taking action',
      '"Escalate" — sometimes you need to escalate before you can de-escalate',
    ],
    correctAnswer: 1,
    explanation:
      'The "E" in LEAPS stands for "Empathise" — acknowledging and validating the other person\'s emotional experience. It comes before "Ask" because emotional validation must precede information gathering. When someone is upset, frustrated, or angry, they need to feel that their emotional state has been acknowledged before they can shift into a more rational, problem-solving mode. If you skip empathy and go straight to asking questions ("What happened? When did this start? What do you want me to do?"), the other person will perceive this as cold, dismissive, or interrogative. A simple empathy statement — "I can see this has been really frustrating for you" — costs nothing, takes seconds, and dramatically changes the dynamic of the conversation.',
  },
  {
    id: 3,
    question:
      'During the amygdala hijack, the fight-or-flight response means that a person in emotional distress:',
    options: [
      'Is thinking more clearly than usual because adrenaline sharpens focus',
      'Is temporarily unable to engage in fully rational thought because the prefrontal cortex is partially offline',
      'Is choosing to be irrational and could stop if they wanted to',
      'Is in no different cognitive state than normal — the amygdala hijack is a myth',
    ],
    correctAnswer: 1,
    explanation:
      "During an amygdala hijack, the brain's threat response system takes priority over the rational, decision-making prefrontal cortex. This is a genuine neurological event, not a choice. The person's heart rate increases, adrenaline floods the system, muscles tense, and higher-order cognitive functions — nuanced thinking, empathy, perspective-taking, impulse control — are temporarily impaired. This is why you cannot reason with someone who is emotionally flooded: the part of their brain that processes reasoning is partially offline. Understanding this neuroscience is practically important because it changes your strategy. Instead of trying to present logical arguments to someone in fight-or-flight mode, you focus on reducing the perceived threat level so their rational brain can come back online.",
  },
  {
    id: 4,
    question:
      'An electrician is dealing with an upset client. Which of the following is the most effective de-escalation statement?',
    options: [
      '"You need to calm down before I can help you"',
      '"I can see you are really frustrated about this, and I want to understand what has happened so we can sort it out"',
      '"This is not my fault — you agreed to the terms"',
      '"Everyone has this problem, it is not a big deal"',
    ],
    correctAnswer: 1,
    explanation:
      'Option B is effective because it combines three de-escalation elements: it acknowledges the emotion ("I can see you are really frustrated"), it expresses genuine interest ("I want to understand what has happened"), and it signals a collaborative intent ("so we can sort it out"). Option A ("You need to calm down") is one of the most counterproductive things you can say to someone who is upset — it invalidates their emotion and is almost universally perceived as dismissive or condescending. Option C is defensive and positions the conversation as adversarial. Option D minimises the client\'s concern and is likely to increase their frustration. The key principle is: acknowledge the emotion, show genuine interest, and signal collaboration.',
  },
  {
    id: 5,
    question: 'The 24-hour rule in de-escalation refers to:',
    options: [
      'A legal requirement to respond to complaints within 24 hours',
      'The practice of waiting 24 hours before responding to non-urgent conflicts, allowing emotions to subside and rational thought to return',
      'A rule that all de-escalation attempts must be completed within 24 hours',
      'The maximum time you should spend trying to de-escalate before giving up entirely',
    ],
    correctAnswer: 1,
    explanation:
      'The 24-hour rule is a practical de-escalation technique based on the neuroscience of emotional regulation. After an emotionally charged interaction, stress hormones (adrenaline and cortisol) take time to dissipate — the acute response lasts 20 to 30 minutes, but residual effects can persist for hours. By waiting 24 hours before responding to a non-urgent conflict, you ensure that both you and the other party have returned to a fully rational state. The response you draft at 10pm in anger will almost always be different from the response you compose at 10am the following day. This rule applies to non-urgent situations only — safety issues, time-critical problems, and situations involving immediate financial risk should be addressed promptly. But for the vast majority of construction disputes, waiting a day produces a better outcome.',
  },
  {
    id: 6,
    question:
      'Which of the following techniques helps change the emotional state of an angry person during a face-to-face confrontation?',
    options: [
      'Maintaining strong eye contact and standing your ground without moving',
      'Changing the physical environment — moving to a private area, offering a drink, sitting down — because changing the physical state changes the emotional state',
      'Speaking louder to show confidence and authority',
      'Folding your arms and leaning back to show you are relaxed',
    ],
    correctAnswer: 1,
    explanation:
      'Changing the physical environment is a powerful de-escalation technique because physical and emotional states are closely linked. When someone is angry, their body is primed for confrontation: standing, tense, possibly in a public space where they feel they have an audience. Moving the conversation to a private area removes the audience effect and reduces the pressure to perform. Offering a drink introduces a mundane, non-threatening activity that breaks the confrontational dynamic. Sitting down changes the body posture from combative (standing, tense) to more relaxed. Each of these physical changes sends signals to the brain that the threat level is reducing, which helps de-activate the amygdala response. The principle is simple: you cannot feel furious while sitting in a quiet room holding a cup of tea.',
  },
  {
    id: 7,
    question:
      'When should an electrician abandon de-escalation and remove themselves from a situation?',
    options: [
      'When the client disagrees with them about any aspect of the work',
      "When the client's behaviour becomes aggressive, threatening, or physically intimidating, despite attempts at de-escalation",
      'When the client raises their voice even slightly above normal speaking volume',
      'De-escalation should never be abandoned — persistence always works eventually',
    ],
    correctAnswer: 1,
    explanation:
      'De-escalation has limits, and recognising those limits is essential for personal safety. If a person becomes physically aggressive (clenched fists, invading personal space, blocking exits), verbally threatening (making threats of harm, using intimidating language), or personally abusive despite your attempts to de-escalate, the situation has moved beyond the scope of de-escalation. Your priority shifts from resolving the conflict to ensuring your own safety. Removing yourself is not failure or avoidance — it is the only appropriate response to aggression. After leaving, document the incident in detail and report it through the appropriate channels. It is important to distinguish between someone who is upset or frustrated (which can usually be de-escalated) and someone who is aggressive or threatening (which requires withdrawal).',
  },
  {
    id: 8,
    question:
      'An electrician receives an angry text message from a client at 9pm about an invoice query. The electrician feels their own anger rising as they read it. According to de-escalation principles, the best response is:',
    options: [
      'Reply immediately with a detailed defence of the invoice while the issue is fresh',
      'Apply the 24-hour rule: acknowledge receipt briefly ("Thanks for your message, I\'ll review this and come back to you tomorrow"), then draft a considered response the following day',
      "Block the client's number and refuse to communicate further",
      'Forward the message to social media to get sympathy from other tradespeople',
    ],
    correctAnswer: 1,
    explanation:
      'This is a textbook case for the 24-hour rule. The electrician is emotionally activated (anger rising), the client is emotionally activated (angry text), and the issue is non-urgent (an invoice query, not a safety emergency). Responding immediately in this emotional state will almost certainly produce a message that escalates the conflict rather than resolving it. The professional approach is to send a brief, neutral acknowledgement — "Thanks for your message, I will review this and come back to you tomorrow morning" — which validates the client\'s communication without engaging with the substance of the dispute. The following day, with emotions settled and rational thought restored, the electrician can compose a measured, professional response that addresses the invoice query factually and constructively.',
  },
];

export default function CRModule5Section2() {
  useSEO({
    title: 'De-escalation Techniques | Conflict Resolution Module 5.2',
    description:
      'Verbal Judo LEAPS model, the amygdala hijack, step-by-step de-escalation, the 24-hour rule, and knowing when to walk away.',
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
            <Link to="../cr-module-5">
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
            <ShieldCheck className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            De-escalation Techniques
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Verbal Judo, the amygdala hijack, step-by-step de-escalation, the 24-hour rule, and
            knowing when to walk away
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>De-escalation</strong> means reducing emotional intensity before attempting
                resolution &mdash; you cannot solve problems while people are in fight-or-flight
              </li>
              <li>
                <strong>LEAPS</strong> (Listen, Empathise, Ask, Paraphrase, Summarise) is a proven
                de-escalation framework from George Thompson&rsquo;s Verbal Judo
              </li>
              <li>
                <strong>The amygdala hijack</strong> makes rational thought temporarily impossible
                &mdash; you must wait for it to pass
              </li>
              <li>
                <strong>The 24-hour rule:</strong> for non-urgent conflicts, wait a day before
                responding
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Escalated conflicts on construction sites can become
                physically dangerous
              </li>
              <li>
                <strong>Resolution quality:</strong> Decisions made in anger are almost always worse
                than decisions made calmly
              </li>
              <li>
                <strong>Relationships:</strong> How you handle the heat of a moment defines the
                long-term relationship
              </li>
              <li>
                <strong>Reputation:</strong> The electrician who stays calm under pressure earns
                lasting professional respect
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain what de-escalation is and why it must precede any attempt at conflict resolution',
              "Apply George Thompson's LEAPS model (Listen, Empathise, Ask, Paraphrase, Summarise) to construction scenarios",
              'Describe the amygdala hijack and explain why rational dialogue is impossible during fight-or-flight',
              'Demonstrate the step-by-step de-escalation process: self-regulation, acknowledgement, and environment change',
              'Apply the 24-hour rule appropriately to non-urgent conflicts',
              'Recognise when de-escalation has failed and removal from the situation is the only appropriate response',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What De-escalation Is
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                De-escalation is the deliberate process of reducing the emotional intensity of a
                conflict to a level where productive conversation and problem-solving become
                possible. It is not about resolving the underlying issue &mdash; that comes later.
                It is not about agreeing with the other person or surrendering your position. It is
                specifically and exclusively about bringing the emotional temperature down from a
                level where rational dialogue is impossible to a level where it becomes possible.
                Think of it as the pre-condition for resolution rather than the resolution itself.
              </p>

              <p>
                George Thompson, a former English professor who became a police officer and then a
                communications specialist, developed a system called <strong>Verbal Judo</strong>{' '}
                that has become the most widely used de-escalation framework in law enforcement,
                healthcare, and conflict management worldwide. His core insight was that in any
                confrontation, you have a choice: you can use force (physical, verbal, or
                positional) to impose your will, or you can use communication to redirect the other
                person&rsquo;s energy towards a constructive outcome. His framework,{' '}
                <strong>LEAPS</strong>, provides a simple, memorable process that works in virtually
                any confrontational situation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The LEAPS Model (George Thompson, Verbal Judo)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">L</span>
                    <span>
                      <strong>Listen:</strong> Give the other person your full, undivided attention.
                      Let them speak without interrupting. Demonstrate that you are listening
                      through eye contact, nodding, and brief verbal acknowledgements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">E</span>
                    <span>
                      <strong>Empathise:</strong> Acknowledge their emotional state without
                      judgement. &ldquo;I can see this has been really frustrating for you.&rdquo;
                      This is not agreement &mdash; it is validation of their experience.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">A</span>
                    <span>
                      <strong>Ask:</strong> Once the emotional intensity has reduced, ask open
                      questions to understand the specifics. &ldquo;Help me understand exactly what
                      happened.&rdquo; &ldquo;What would a good outcome look like for you?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">P</span>
                    <span>
                      <strong>Paraphrase:</strong> Repeat back what you have heard in your own words
                      to confirm understanding. &ldquo;So if I understand correctly, the main issue
                      is...&rdquo; This shows you have genuinely listened and catches any
                      misunderstandings early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">S</span>
                    <span>
                      <strong>Summarise:</strong> Bring the conversation together by summarising the
                      situation, the key concerns, and the agreed next steps. &ldquo;OK, so the
                      situation is X, the main concern is Y, and we have agreed to Z.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Amygdala Hijack
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                To understand why de-escalation works, you need to understand what happens in the
                brain during conflict. The <strong>amygdala</strong> is a small, almond-shaped
                structure deep in the brain that functions as the body&rsquo;s threat detection
                system. When it perceives a threat &mdash; and this includes social threats like
                being criticised, challenged, or disrespected, not just physical danger &mdash; it
                triggers the <strong>fight-or-flight response</strong>. Heart rate increases.
                Adrenaline and cortisol flood the system. Muscles tense. Blood flow is redirected
                away from the digestive system and towards the major muscle groups. And crucially,
                the
                <strong> prefrontal cortex</strong> &mdash; the part of the brain responsible for
                rational thought, impulse control, empathy, and complex decision-making &mdash; is
                partially deactivated.
              </p>

              <p>
                Daniel Goleman, the psychologist who popularised the concept of emotional
                intelligence, called this the <strong>&ldquo;amygdala hijack&rdquo;</strong>. It is
                not a metaphor &mdash; it is a description of a real neurological event. When
                someone is in full amygdala hijack, they are physiologically incapable of the kind
                of nuanced, empathetic, flexible thinking that conflict resolution requires. They
                cannot see your perspective. They cannot weigh multiple options. They cannot
                separate their emotional reaction from the factual situation. They are operating on
                a primitive survival programme that evolved to protect them from predators, not to
                resolve invoice disputes.
              </p>

              <p>
                This is the fundamental reason why you cannot reason with someone who is emotionally
                flooded. It is not that they are choosing to be irrational &mdash; they are
                temporarily neurologically incapable of being rational. The prefrontal cortex is
                offline. The part of the brain that would normally evaluate your logical argument,
                consider your evidence, and weigh your perspective is not available. Trying to
                present a rational case to someone in amygdala hijack is like trying to have a
                conversation with someone who is asleep: the equipment required to process your
                message is not currently operational. This understanding should fundamentally change
                how you approach someone who is angry, upset, or aggressive. Your first task is not
                to resolve the issue &mdash; it is to help their prefrontal cortex come back online.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Step-by-Step De-escalation
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Step 1: Stay calm &mdash; manage yourself first.</strong> Before you can
                de-escalate anyone else, you must regulate your own emotional state. If your own
                amygdala is activated, you will escalate the situation no matter what words you use.
                Your body language, tone of voice, and micro-expressions will betray your emotional
                state even if your words are carefully chosen. The technique is simple and
                physiologically effective: controlled breathing. Breathe in slowly through your nose
                for a count of four. Hold for a count of four. Breathe out slowly through your mouth
                for a count of six (the longer exhale is important because it activates the vagus
                nerve and the parasympathetic &ldquo;rest and digest&rdquo; system). Simultaneously,
                deliberately lower your voice volume and slow your speech. Your voice is both a
                signal to the other person (a calm, low voice is subconsciously reassuring) and a
                feedback mechanism for your own brain (hearing yourself speak calmly reinforces your
                own calm state).
              </p>

              <p>
                <strong>Step 2: Acknowledge the emotion.</strong> Once you are in a regulated state,
                your first communication to the other person should acknowledge their emotional
                experience. This is not agreement &mdash; it is validation. &ldquo;I can see you are
                really frustrated about this&rdquo; is a statement of observation, not a concession.
                It tells the other person that their experience has been noticed and that you take
                it seriously. This is profoundly powerful because the core driver of most escalation
                is the feeling of not being heard. When a person feels their emotion has been
                acknowledged, the intensity of that emotion naturally begins to reduce. They no
                longer need to amplify their signal to make you pay attention &mdash; you are
                already paying attention.
              </p>

              <p>
                <strong>Step 3: Create space &mdash; change the physical environment.</strong>
                Physical and emotional states are deeply connected, and changing the physical
                context of a confrontation can dramatically change the emotional dynamic. If the
                argument is happening in a public area (on site, in front of other workers, in the
                client&rsquo;s living room with family members watching), the person may feel
                pressure to perform, to maintain face, to not back down in front of an audience.
                Moving the conversation to a private area removes this pressure. Offering a drink
                &mdash; tea, coffee, water &mdash; introduces a mundane, non-threatening activity
                that interrupts the confrontational pattern. Sitting down changes the body posture
                from combative (standing, tense, chest out) to relaxed (seated, shoulders lowered,
                hands occupied with a mug). Each of these changes sends unconscious signals to the
                brain that the threat level is reducing, which helps the amygdala stand down.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  5-Step De-escalation Process
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">1</span>
                    <span>
                      <strong>Self-regulate:</strong> Controlled breathing, lower voice, slower
                      speech, open body language. Get yourself calm first.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">2</span>
                    <span>
                      <strong>Acknowledge emotion:</strong> &ldquo;I can see you are really
                      frustrated about this.&rdquo; Validation, not agreement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">3</span>
                    <span>
                      <strong>Change the environment:</strong> Move to a private area, offer a
                      drink, sit down. Physical change triggers emotional change.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">4</span>
                    <span>
                      <strong>Use LEAPS:</strong> Listen fully, empathise, ask open questions,
                      paraphrase to confirm understanding, summarise agreed next steps.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">5</span>
                    <span>
                      <strong>Find common ground:</strong> &ldquo;We both want this job done
                      right&rdquo; &mdash; reframe from adversarial to collaborative.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Questions Not Statements
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most practical de-escalation skills is replacing statements with
                questions. Statements during conflict tend to be positional, defensive, or
                accusatory: &ldquo;You are wrong about that.&rdquo; &ldquo;That is not what we
                agreed.&rdquo; &ldquo;I already explained this.&rdquo; Each of these statements
                closes down the conversation and invites the other person to push back. Questions,
                by contrast, open up the conversation and invite the other person to engage:
                &ldquo;Help me understand what happened from your perspective.&rdquo; &ldquo;What
                would a good outcome look like for you?&rdquo; &ldquo;Can you walk me through what
                you were expecting?&rdquo;
              </p>

              <p>
                The shift from statements to questions is powerful because it changes the dynamic of
                the interaction from adversarial to collaborative. When you make a statement, you
                are asserting your position, and the other person&rsquo;s natural response is to
                assert theirs. The result is a positional battle that entrenches both parties. When
                you ask a question, you are inviting the other person to share information, which
                makes them feel heard and respected. It also gives you data &mdash; you may discover
                that the other person&rsquo;s concern is entirely different from what you assumed,
                or that there has been a genuine misunderstanding that is easy to resolve.
              </p>

              <p>
                Finding common ground is another crucial technique. In any conflict, there is almost
                always a shared objective buried beneath the opposing positions. A client who is
                complaining about the position of socket outlets and an electrician who is defending
                the installation both share the same fundamental goal: they both want the job done
                right. A subcontractor who is disputing a programme change and a main contractor who
                is insisting on it both share the goal of getting the project completed
                successfully. Explicitly identifying and stating this common ground &mdash;
                &ldquo;We both want this kitchen to look brilliant, so let us work out how to get
                there&rdquo; &mdash; reframes the conversation from two people fighting against each
                other to two people working together against a shared problem.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Statements vs Questions: Construction Examples
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Instead of:</strong> &ldquo;You are wrong about that.&rdquo;
                      <strong> Try:</strong> &ldquo;Help me understand how you see it
                      differently.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Instead of:</strong> &ldquo;That is not what we agreed.&rdquo;
                      <strong> Try:</strong> &ldquo;Can we go back to the original agreement and
                      look at it together?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Instead of:</strong> &ldquo;I already told you the price.&rdquo;
                      <strong> Try:</strong> &ldquo;What part of the pricing would you like me to
                      clarify?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Instead of:</strong> &ldquo;That is not my fault.&rdquo;
                      <strong> Try:</strong> &ldquo;What do you think happened, and how can we sort
                      it out?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Knowing When to Walk Away
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                De-escalation is a powerful set of techniques, but it has limits. There are
                situations where de-escalation will not work, and continuing to try is not only
                futile but potentially dangerous. If a person becomes physically aggressive &mdash;
                clenching fists, invading your personal space, blocking your exit, throwing objects
                &mdash; de-escalation has failed and your priority shifts immediately from resolving
                the conflict to ensuring your own safety. If a person makes direct threats of harm,
                de-escalation has failed. If a person is under the influence of alcohol or drugs to
                the point where they cannot engage rationally, de-escalation is unlikely to succeed.
                In any of these situations, the only appropriate response is to remove yourself.
              </p>

              <p>
                The <strong>24-hour rule</strong> is a de-escalation technique for non-urgent
                conflicts that recognises the neurological reality of the amygdala hijack. The acute
                fight-or-flight response lasts 20 to 30 minutes, but the residual effects of stress
                hormones can affect judgement, emotional regulation, and communication for hours
                afterwards. The 24-hour rule is simple: for any conflict that is not urgent (not a
                safety issue, not time-critical, not causing immediate financial damage), wait 24
                hours before responding. The angry email you want to send at 10pm will look very
                different in the light of the following morning. The sharp response you want to text
                to an unreasonable client will seem excessive once the adrenaline has dissipated.
                This is not avoidance &mdash; it is strategic timing.
              </p>

              <p>
                Construction-specific scenarios where these principles apply are common. The angry
                client on site who discovers something they are unhappy about: stay calm,
                acknowledge their frustration, suggest looking at it together after a cup of tea,
                and use LEAPS to understand the real concern. The aggressive foreman who blames your
                work for a delay: attempt de-escalation first, but if they become threatening,
                remove yourself and report the behaviour. The unexpectedly high invoice that
                generates an angry phone call: listen fully, empathise with the surprise, and
                suggest reviewing the breakdown together the following day when both parties have
                had time to prepare. In every case, the principle is the same: reduce the emotional
                temperature first, then address the substance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has equipped you with the science and practical techniques of
                de-escalation &mdash; bringing the emotional temperature down before attempting to
                resolve the underlying issue. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>De-escalation precedes resolution.</strong> You cannot solve problems
                    while people are emotionally flooded. Reducing intensity is the first step.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The LEAPS model works.</strong> Listen, Empathise, Ask, Paraphrase,
                    Summarise. The order matters &mdash; validation before information gathering.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The amygdala hijack is real.</strong> During fight-or-flight, the
                    rational brain is partially offline. You cannot reason with someone in this
                    state.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-regulation comes first.</strong> Controlled breathing, lower voice,
                    slower speech. You cannot de-escalate others if you are escalated yourself.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Change the environment.</strong> Moving to a private area, offering a
                    drink, and sitting down all reduce emotional intensity through physical state
                    change.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Know when to walk away.</strong> If de-escalation fails and behaviour
                    becomes aggressive or threatening, remove yourself and report the incident.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will explore
                  building professional relationships &mdash; the long-term strategy for preventing
                  conflict through trust, credibility, reliability, and networking. You will learn
                  the Trust Equation and how to apply it as a tradesperson.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Contracts &amp; Agreements
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5-section-3">
              Next: Building Professional Relationships
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
