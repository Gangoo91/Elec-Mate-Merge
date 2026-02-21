import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Shield,
  AlertTriangle,
  BookOpen,
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
    question: 'In the DESC model, what does the "E" stand for, and why is it important?',
    options: [
      "Evaluate — it asks you to judge the other person's behaviour",
      'Express — it asks you to share how the situation affects you or the team',
      'Escalate — it asks you to involve a manager if the problem continues',
      'Expect — it asks you to state what you expect to happen next',
    ],
    correctIndex: 1,
    explanation:
      'The "E" in DESC stands for Express. This step is critical because it shifts the conversation from blame to impact. By expressing how the situation affects you or the team — using "I" statements rather than "you" accusations — you keep the conversation collaborative rather than adversarial.',
  },
  {
    question:
      'What is the key difference between assertive communication and aggressive communication?',
    options: [
      'Assertive communication avoids all conflict; aggressive communication creates it',
      'Assertive communication is louder; aggressive communication is quieter',
      "Assertive communication respects both parties' needs; aggressive communication prioritises only your own",
      'There is no real difference — they are two words for the same thing',
    ],
    correctIndex: 2,
    explanation:
      "The fundamental distinction is one of respect. Assertive communication respects both your own needs and the other person's rights and feelings. Aggressive communication prioritises your needs at the expense of the other person, often using intimidation, blame, or disrespect to get what you want.",
  },
  {
    question:
      'Which of Cialdini\'s six principles of influence does this scenario demonstrate: "The last three sites we worked on used LED panels in the corridors — it\'s becoming the industry standard"?',
    options: ['Reciprocity', 'Authority', 'Social proof', 'Scarcity'],
    correctIndex: 2,
    explanation:
      'This is social proof — the principle that people look to what others are doing to guide their own decisions. By referencing what other sites have done, you are showing the client that this approach is widely adopted and trusted, which reduces their perceived risk.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What if I try assertive communication and it does not work?',
    answer:
      'Assertive communication is not a guarantee that you will always get what you want — it is a guarantee that you will communicate with integrity and respect. Sometimes the other person will still disagree, refuse, or become defensive. When this happens, you have still achieved something important: you have stated your position clearly, maintained your self-respect, and modelled professional behaviour. If the situation remains unresolved, you can escalate through proper channels knowing you handled your part well. Over time, consistently assertive communication builds a reputation that makes people more likely to listen to you and take your concerns seriously.',
  },
  {
    question: 'How do I handle written communication when English is not my first language?',
    answer:
      'Written communication is challenging for everyone — native English speakers misfire with tone in messages just as often. The core principle applies regardless of language ability: when the topic is sensitive or emotional, choose a richer communication channel. Phone calls are better than text messages because your tone of voice carries warmth, sincerity, and nuance that words alone cannot convey. If you must write, keep sentences short and clear, use straightforward language, and avoid sarcasm or humour that might be misread. Ask a trusted colleague to read important messages before you send them. Many of the best communicators on site are people who speak few words but choose them carefully.',
  },
  {
    question: "Is using Cialdini's principles manipulative?",
    answer:
      'The difference between influence and manipulation lies in intent and transparency. Ethical influence involves helping people make decisions that genuinely serve their interests — you are sharing useful information, building trust, and offering honest recommendations. Manipulation, by contrast, involves deliberately misleading people or exploiting their vulnerabilities for your own benefit. When you tell a client that LED panels are becoming the industry standard because they genuinely are, that is ethical social proof. When you fabricate urgency to pressure someone into a decision they would not otherwise make, that crosses into manipulation. The test is simple: would you be comfortable if the other person knew exactly what you were doing and why?',
  },
  {
    question: 'How do I influence someone who has more authority or experience than me?',
    answer:
      'Influencing upward requires a different approach from influencing peers or subordinates, but the EI principles are the same. First, build credibility by consistently delivering quality work and keeping your commitments — this is the foundation of all influence. Second, understand their priorities and pressures. A project manager under budget pressure will respond differently from one under time pressure. Third, frame your suggestions in terms of their goals, not yours. Instead of "I think we should change the cable route", try "I have found a route that could save us two days on the programme and avoid clashing with the plumbing — would you like me to show you?" You are offering a solution to their problem, not creating a new one.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which communication style is aligned with emotional intelligence?',
    options: [
      'Passive — avoiding conflict at all costs',
      'Aggressive — ensuring your needs are always met first',
      "Assertive — respecting both your own needs and the other person's",
      'Passive-aggressive — expressing displeasure indirectly',
    ],
    correctAnswer: 2,
    explanation:
      "Assertive communication is the EI-aligned approach because it requires self-awareness (knowing what you need), self-regulation (expressing it calmly), empathy (considering the other person's perspective), and social skill (communicating effectively). It respects both parties.",
  },
  {
    id: 2,
    question: 'What are the four steps of the DESC model in the correct order?',
    options: [
      'Discuss, Evaluate, Suggest, Conclude',
      'Describe, Express, Specify, Consequences',
      'Define, Explain, Solve, Check',
      'Detect, Explain, State, Confirm',
    ],
    correctAnswer: 1,
    explanation:
      'DESC stands for Describe (the situation objectively), Express (how it affects you), Specify (what you need), and Consequences (positive outcomes of change, or negative outcomes of continuing). It provides a clear, respectful structure for difficult conversations.',
  },
  {
    id: 3,
    question: 'Why is written communication considered a high EI-risk channel?',
    options: [
      'Because people cannot read very well',
      'Because written messages take too long to compose',
      'Because tone, body language, and facial expression are absent, leading to negativity bias',
      'Because autocorrect changes the meaning of messages',
    ],
    correctAnswer: 2,
    explanation:
      'Written communication strips away all the non-verbal cues that carry emotional meaning — tone of voice, facial expression, body language, and timing. Research shows that readers tend to interpret ambiguous written messages more negatively than the sender intended, a phenomenon known as negativity bias in text communication.',
  },
  {
    id: 4,
    question: 'What is the "24-hour rule" for written messages?',
    options: [
      'You must reply to all messages within 24 hours',
      'You should wait 24 hours before sending any emotional or reactive message',
      'All project communications must be documented within 24 hours',
      'Written messages expire after 24 hours if not read',
    ],
    correctAnswer: 1,
    explanation:
      'The 24-hour rule states that if you feel a strong emotional reaction to a message, you should wait at least 24 hours before responding. This allows the amygdala hijack to subside, the prefrontal cortex to re-engage, and you to compose a measured response rather than a reactive one that you may regret.',
  },
  {
    id: 5,
    question:
      "Which of Cialdini's principles is demonstrated when you help a subcontractor with their cable pulls before asking them to accommodate your containment route?",
    options: ['Authority', 'Scarcity', 'Reciprocity', 'Commitment and consistency'],
    correctAnswer: 2,
    explanation:
      'This is reciprocity — the principle that people feel obligated to return favours. By helping the subcontractor first, you create a sense of goodwill and mutual obligation that makes them more willing to help you in return. This is one of the most powerful and ethical influence strategies on site.',
  },
  {
    id: 6,
    question: 'A passive communicator on site is most likely to:',
    options: [
      'Shout at colleagues when they disagree',
      'Agree to unreasonable demands to avoid confrontation, then feel resentful',
      'Clearly state their needs while respecting others',
      'Use sarcasm and backhanded compliments to express displeasure',
    ],
    correctAnswer: 1,
    explanation:
      "Passive communicators avoid confrontation by agreeing to things they do not want to do, suppressing their opinions, and prioritising others' needs over their own. This often leads to resentment, burnout, and eventually an explosive outburst when the suppressed emotions become overwhelming.",
  },
  {
    id: 7,
    question: 'When should you phone instead of text or email on a construction project?',
    options: [
      'Only when the internet is down',
      'When the topic is sensitive, emotional, or likely to be misunderstood',
      'Only for emergencies',
      'Phone calls are outdated — text is always better',
    ],
    correctAnswer: 1,
    explanation:
      'Phone calls should be preferred whenever the topic is sensitive, emotional, involves criticism or feedback, could be easily misunderstood, or requires real-time negotiation. The richer communication channel (voice with tone, pace, and warmth) dramatically reduces the risk of misinterpretation.',
  },
  {
    id: 8,
    question: 'What is the primary difference between influence and manipulation?',
    options: [
      'Influence is for managers; manipulation is for everyone else',
      'Influence is verbal; manipulation is written',
      "Influence serves both parties' genuine interests; manipulation exploits others for your own gain",
      'There is no difference — they are synonyms',
    ],
    correctAnswer: 2,
    explanation:
      "Influence and manipulation both involve changing someone's behaviour or thinking, but they differ fundamentally in intent and ethics. Influence is transparent and serves genuine interests — the other person benefits from the decision. Manipulation is deceptive and self-serving — it exploits vulnerabilities or creates false conditions to benefit only the manipulator.",
  },
];

export default function EIModule5Section1() {
  useSEO({
    title: 'Communication & Influence | EI Module 5.1',
    description:
      "Using emotional intelligence to communicate assertively, apply the DESC model, manage written communication risks, and influence others ethically using Cialdini's principles — with construction-specific examples.",
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
            <Link to="../ei-module-5">
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
            <MessageCircle className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communication &amp; Influence
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Using emotional intelligence to communicate effectively and influence others ethically
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Assertiveness:</strong> The sweet spot between passive and aggressive
                communication
              </li>
              <li>
                <strong>DESC model:</strong> A four-step framework for structuring difficult
                conversations
              </li>
              <li>
                <strong>Written risk:</strong> Text, email, and WhatsApp carry high EI risk due to
                missing tone
              </li>
              <li>
                <strong>Influence:</strong> Cialdini&rsquo;s six principles of ethical persuasion
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Root cause:</strong> Most workplace conflicts stem from poor communication
              </li>
              <li>
                <strong>Impact:</strong> EI transforms how you are heard, not just what you say
              </li>
              <li>
                <strong>Career:</strong> The ability to communicate and influence is the number one
                predictor of leadership success
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Position assertive communication on the passive-aggressive continuum',
              'Apply the DESC model to a difficult workplace conversation',
              'Identify EI risks in written communication (email, WhatsApp, text)',
              'Explain influence without authority using emotionally intelligent approaches',
              "List Cialdini's six principles of influence and apply them ethically",
              'Give construction-specific examples of emotionally intelligent communication',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Assertive Communication Continuum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Assertive Communication Continuum
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Communication is the visible expression of emotional intelligence. You may have
                excellent self-awareness, strong self-regulation, high motivation, and deep empathy,
                but if you cannot communicate effectively, those internal capabilities remain
                hidden. Communication is where EI theory meets practice &mdash; it is the channel
                through which everything you have learned in Modules 1 to 4 becomes visible to
                others.
              </p>

              <p>
                All communication falls somewhere on a continuum between three broad styles:
                passive, assertive, and aggressive. Understanding where your default communication
                style sits &mdash; and learning to move deliberately toward the assertive centre
                &mdash; is one of the most practical EI skills you can develop.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      P
                    </span>
                    <p className="text-sm font-medium text-white">Passive</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Avoids expressing honest feelings, needs, or opinions. Prioritises others&rsquo;
                    needs at the expense of their own. Driven by fear of conflict or rejection.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Avoids eye contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Speaks softly or hesitantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Uses &ldquo;sorry&rdquo; excessively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Agrees to unreasonable demands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Suppresses frustration until it explodes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      A
                    </span>
                    <p className="text-sm font-medium text-rose-400">Assertive</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Expresses honest feelings, needs, and opinions directly and respectfully.
                    Balances own needs with respect for others. Driven by self-awareness and
                    empathy.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Maintains appropriate eye contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Speaks clearly and calmly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Uses &ldquo;I&rdquo; statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>States needs without blaming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Listens actively to the other person</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      G
                    </span>
                    <p className="text-sm font-medium text-white">Aggressive</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Expresses feelings and needs forcefully, often at the expense of others.
                    Prioritises own needs through intimidation, blame, or disrespect.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Stares, invades personal space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Raises voice, uses threats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Uses &ldquo;you always&rdquo; / &ldquo;you never&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Blames and criticises publicly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Interrupts and dismisses others</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> Assertive communication
                  respects both your needs and the other person&rsquo;s. It is not about being nice
                  or avoiding difficult topics &mdash; it is about addressing them directly,
                  honestly, and with respect. Assertiveness requires all four EI domains:
                  self-awareness (knowing what you need), self-regulation (staying calm), empathy
                  (considering the other person), and social skill (delivering the message
                  effectively).
                </p>
              </div>

              <p>
                There is also a fourth style that sits between passive and aggressive:{' '}
                <strong>passive-aggressive</strong>. This involves expressing displeasure indirectly
                &mdash; through sarcasm, backhanded compliments, the silent treatment, deliberate
                inefficiency, or &ldquo;forgetting&rdquo; to do things. Passive-aggression is
                particularly destructive on site because it erodes trust without ever bringing the
                real issue into the open where it can be resolved.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Subcontractor Delays
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A subcontractor has repeatedly arrived late to site, delaying your programme. Here
                  is how each communication style would respond:
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Passive Response</p>
                    <p className="text-sm text-white">
                      &ldquo;Oh, it&rsquo;s fine, don&rsquo;t worry about it. We&rsquo;ll work
                      around it.&rdquo; (Internally seething, tells colleagues behind their back,
                      resentment builds.)
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Aggressive Response</p>
                    <p className="text-sm text-white">
                      &ldquo;You&rsquo;re always late. It&rsquo;s a joke. If you can&rsquo;t be
                      bothered to turn up on time, don&rsquo;t bother turning up at all.&rdquo;
                      (Damages relationship, escalates tension, no resolution.)
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">Assertive Response</p>
                    <p className="text-sm text-white">
                      &ldquo;I need to talk to you about timekeeping. You&rsquo;ve arrived after
                      9:00 three times this week, and it&rsquo;s putting our programme behind. I
                      need you on site by 7:30 going forward. What can we do to make that
                      happen?&rdquo; (Factual, respectful, solution-oriented.)
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Most people have a default communication style that they revert to under pressure.
                Stress, fatigue, and high-stakes situations tend to push people toward the extremes
                &mdash; either shutting down (passive) or lashing out (aggressive). The EI skill is
                recognising when you are being pulled toward an extreme and deliberately choosing to
                stay in the assertive centre. This is self-regulation in action.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The DESC Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The DESC Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most practical tools for assertive communication is the{' '}
                <strong>DESC model</strong>, originally developed by Sharon and Gordon Bower in
                their 1976 book <em>Asserting Yourself</em>. DESC provides a clear, four-step
                structure for having difficult conversations &mdash; the kind of conversations most
                people avoid, handle badly, or put off until the situation becomes a crisis.
              </p>

              <p>
                The beauty of DESC is its simplicity. Each step follows logically from the previous
                one, and together they create a complete, respectful, and solution-focused message.
                Here is how it works:
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      D
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Describe the Situation Objectively
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    State the facts without judgement, interpretation, or emotion. Describe what
                    happened as though you were a camera recording the event. Avoid words like
                    &ldquo;always&rdquo;, &ldquo;never&rdquo;, or &ldquo;you&rsquo;re the type
                    who&rdquo;.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Example:</strong> &ldquo;The containment in
                      corridor B was installed 50mm lower than the drawing specified.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      E
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Express How It Affects You or the Team
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Share the impact using &ldquo;I&rdquo; statements or team-impact language. This
                    is where EI shines &mdash; you are being honest about the emotional or practical
                    consequences without blaming the other person.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Example:</strong> &ldquo;I&rsquo;m concerned
                      because the HVAC team now can&rsquo;t fit their ductwork above it, and it puts
                      us behind on the coordination programme.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S
                    </span>
                    <p className="text-sm font-medium text-rose-400">Specify What You Need</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Make a clear, specific request. Do not hint, imply, or hope the other person
                    figures it out. State exactly what you need them to do, by when, and to what
                    standard.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Example:</strong> &ldquo;I need the
                      containment moved up to the correct height by the end of tomorrow so we
                      don&rsquo;t lose any more time.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      C
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Consequences (Positive and Negative)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Explain what will happen if the change is made (positive) and what will happen
                    if it is not (negative). Lead with the positive consequence &mdash; people
                    respond better to opportunity than threat.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Example:</strong> &ldquo;If we get it sorted
                      tomorrow, we stay on programme and the coordination issue goes away. If not,
                      I&rsquo;ll need to raise it at the progress meeting on Friday, and it could
                      affect your payment application.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Full DESC Example: Consistently Late Subcontractor
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">D:</strong> &ldquo;Over the past two weeks,
                    your team has arrived on site after 9:00 on six out of ten working days.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">E:</strong> &ldquo;This is causing problems
                    because we can&rsquo;t start first fix until your containment is in, which means
                    my team is standing idle for up to two hours each morning. It&rsquo;s
                    frustrating for everyone and it&rsquo;s affecting the programme.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">S:</strong> &ldquo;I need your team on site by
                    7:30 every morning without exception. If there&rsquo;s a genuine reason they
                    can&rsquo;t make that, I need you to tell me the day before so I can plan around
                    it.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">C:</strong> &ldquo;If we can get this sorted,
                    we&rsquo;ll get back on programme and everyone wins. If the late arrivals
                    continue, I&rsquo;ll have no choice but to raise a formal delay notice and
                    discuss it with the main contractor at next week&rsquo;s coordination
                    meeting.&rdquo;
                  </p>
                </div>
              </div>

              <p>
                Notice how the DESC structure keeps the conversation factual, focused, and
                solution-oriented. There is no personal attack, no raised voice, no vague
                accusations. The other person knows exactly what the problem is, how it affects the
                team, what they need to do, and what happens next. This is assertive communication
                at its most effective &mdash; and it draws on every domain of emotional
                intelligence.
              </p>

              <p>
                The DESC model is particularly valuable for conversations you have been putting off.
                If you find yourself dreading a conversation, write out the four steps in advance.
                Even a quick note on your phone with the D, E, S, and C points gives you a structure
                to follow when your emotions might otherwise pull you off course.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: EI in Written Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            EI in Written Communication
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In today&rsquo;s construction industry, a huge proportion of communication happens
                in writing &mdash; WhatsApp messages, emails, text messages, Teams chat, and project
                management software. Written communication is fast, convenient, and creates a
                record. But from an emotional intelligence perspective, it is also the most
                dangerous communication channel available to you.
              </p>

              <p>
                The reason is simple:{' '}
                <strong>written communication strips away every non-verbal cue</strong> that carries
                emotional meaning. When you speak to someone face-to-face, only about 7% of the
                emotional content comes from the words themselves. The rest comes from tone of voice
                (38%) and body language (55%), according to Albert Mehrabian&rsquo;s widely cited
                research. When you write a message, that 93% of non-verbal meaning disappears
                entirely. The reader has only words &mdash; and they will fill in the missing tone
                with their own assumptions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Negativity Bias in Reading:</strong>{' '}
                  Research consistently shows that people interpret ambiguous written messages more
                  negatively than the sender intended. A neutral message like &ldquo;Fine&rdquo; in
                  response to a question can be read as agreement, indifference, annoyance, or
                  sarcasm &mdash; depending entirely on the reader&rsquo;s mood and assumptions.
                  This is called the <strong>negativity bias in text communication</strong>, and it
                  is responsible for a significant proportion of workplace misunderstandings.
                </p>
              </div>

              <p>
                Consider this real-world scenario that plays out on construction sites every day: a
                project manager sends a WhatsApp message to an electrician that reads &ldquo;We need
                to talk about the DB installation in Block C.&rdquo; The PM meant it as a neutral
                scheduling message &mdash; they want to discuss the programme for next week. But the
                electrician, who is already under pressure and had a disagreement with the PM last
                month, reads it as a criticism of their work. Their amygdala fires, cortisol floods
                their system, and by the time the conversation happens, they are already defensive.
                The entire interaction is poisoned by a message that was never intended to be
                threatening.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">When to Phone Instead of Text</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Use the richer communication channel (phone call or face-to-face) whenever:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>The topic involves criticism, feedback, or correction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>You are discussing money, payments, or commercial disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>There has been a recent conflict or tension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>You need to deliver bad news (delays, changes, mistakes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>The message could reasonably be read in more than one tone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>You are feeling emotional when composing the message</span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>The 24-Hour Rule</strong> is one of the most powerful EI habits you can
                develop for written communication. The rule is simple: if you receive a message that
                triggers a strong emotional reaction &mdash; anger, frustration, defensiveness, hurt
                &mdash; do not reply immediately. Wait at least 24 hours. This gives your amygdala
                time to calm down and your prefrontal cortex time to re-engage. When you do reply,
                you will compose a measured, professional response rather than a reactive one that
                escalates the conflict.
              </p>

              <p>
                If 24 hours is not possible &mdash; say the message needs a same-day response
                &mdash; then write your reply but <strong>do not send it</strong>. Save it as a
                draft, walk away for at least 30 minutes, then re-read it before sending. Ask
                yourself: &ldquo;If someone sent this message to me, how would I interpret
                it?&rdquo; If there is any ambiguity, rewrite it or pick up the phone instead.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical EI Tips for Written Communication
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Add warmth deliberately.</strong> In person, your tone of voice does
                      this automatically. In writing, you need to add it manually. Start emails with
                      the person&rsquo;s name, add &ldquo;thanks&rdquo; or &ldquo;appreciate
                      it&rdquo; where appropriate, and end positively.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Be explicit about your tone.</strong> If you mean something
                      positively, say so. &ldquo;Great work on the DB layout &mdash; just one small
                      point to raise&rdquo; is much better than &ldquo;I need to talk to you about
                      the DB layout.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Avoid ALL CAPS, excessive punctuation, and one-word replies.</strong>{' '}
                      &ldquo;Fine.&rdquo; and &ldquo;OK.&rdquo; are read as curt or annoyed, even if
                      you meant them neutrally. Add a word or two: &ldquo;That&rsquo;s fine,
                      thanks.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Re-read before sending.</strong> Read your message from the
                      recipient&rsquo;s perspective. Would someone having a bad day read this
                      negatively? If so, soften the language or add context.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Influence Without Authority */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Influence Without Authority
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On a construction site, most of the people you need to work with effectively are
                people you do not manage. Subcontractors, other trades, clients, architects,
                building control officers, main contractor site staff &mdash; none of them report to
                you, and you cannot tell them what to do. Yet your success depends on getting them
                to cooperate, coordinate, and sometimes change their plans to accommodate yours.
              </p>

              <p>
                This is <strong>influence without authority</strong>, and it is one of the most
                important social skills in the construction industry. It requires a combination of
                credibility, rapport, empathy, and strategic communication &mdash; all of which are
                EI competencies.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Four Foundations of Influence Without Authority
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">1. Credibility</p>
                    <p className="text-sm text-white">
                      People listen to those they respect. Credibility is built through consistent
                      quality of work, keeping your promises, and demonstrating technical
                      competence. If your containment is always straight, your wiring is always
                      tidy, and your first fix is always right, other trades will respect your
                      professional opinion when you raise a coordination issue.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">2. Rapport</p>
                    <p className="text-sm text-white">
                      People cooperate with those they like. Rapport is built through small daily
                      interactions &mdash; greeting people by name, making tea for the other trades,
                      asking about their weekend, showing genuine interest in their work. These
                      seemingly trivial social gestures create the goodwill that makes collaboration
                      possible when it matters.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">3. Shared Goals</p>
                    <p className="text-sm text-white">
                      Reframe requests in terms of shared interests. Instead of &ldquo;I need you to
                      move your pipework&rdquo;, try &ldquo;If we can sort out the routing in this
                      ceiling void together, we both get our work done faster and we both look good
                      at the coordination meeting.&rdquo; Finding common ground turns a potential
                      conflict into a collaborative problem-solving exercise.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">4. Empathy</p>
                    <p className="text-sm text-white">
                      Understand the other person&rsquo;s pressures and constraints before making
                      your request. The plumber who is resistant to moving their pipework may be
                      under pressure from their own programme. Acknowledge their situation first:
                      &ldquo;I know you&rsquo;re under pressure to finish this floor by Friday. How
                      about we look at a route that works for both of us?&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Getting Another Trade to Accommodate Your Cable Route
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You need to run a 50-metre cable tray through a ceiling void that the mechanical
                  team has already partially installed their ductwork in. There is a clash. You have
                  no authority over the mechanical team. Here is the emotionally intelligent
                  approach:
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 1 &mdash; Empathise:</strong> &ldquo;I
                    can see you&rsquo;ve already done a lot of work in this void. I don&rsquo;t want
                    to create extra work for you.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 2 &mdash; Shared goal:</strong> &ldquo;We
                    both need to get our services through here without clashing with each other. If
                    we can agree a route now, it&rsquo;ll save both of us having to rip anything out
                    later.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 3 &mdash; Propose a solution:</strong>{' '}
                    &ldquo;What if I run my tray along the south side and you keep the duct on the
                    north? That way we both have clearance and neither of us has to move
                    anything.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Step 4 &mdash; Offer reciprocity:</strong>{' '}
                    &ldquo;And if you need a hand shifting that last section of duct to make room,
                    I&rsquo;ve got a spare pair of hands this afternoon.&rdquo;
                  </p>
                </div>
              </div>

              <p>
                This approach is not weak or submissive &mdash; it is strategically intelligent. You
                are reading the situation (empathy), managing your own frustration
                (self-regulation), finding common ground (social skill), and offering help (building
                reciprocity). The mechanical team is far more likely to cooperate with you than if
                you had gone to the site manager to complain or confronted them aggressively.
              </p>

              <p>
                Another common scenario where influence without authority is essential is{' '}
                <strong>persuading a client on a design change</strong>. Perhaps the client wants
                downlights in a location where the ceiling void depth makes them impractical, or
                they want a consumer unit in a position that violates BS 7671 accessibility
                requirements. You cannot order the client to change their mind &mdash; but you can
                influence them through credibility (explaining the technical reasons), empathy
                (understanding their aesthetic preferences), and shared goals (finding a solution
                that meets both their desires and the regulations).
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Cialdini's Six Principles of Influence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Cialdini&rsquo;s Six Principles of Influence (Applied Ethically)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1984, Robert Cialdini, a professor of psychology at Arizona State University,
                published <em>Influence: The Psychology of Persuasion</em>, one of the most
                important books ever written on how and why people say yes. Based on decades of
                research and years of undercover fieldwork (Cialdini actually went undercover in
                sales organisations, fundraising charities, and car dealerships to study influence
                in practice), he identified six universal principles that drive human
                decision-making.
              </p>

              <p>
                These principles are not tricks or manipulation techniques. They describe
                fundamental aspects of human psychology that can be applied ethically to build
                trust, strengthen relationships, and help people make good decisions. On a
                construction site, they are incredibly useful for influencing colleagues, clients,
                and subcontractors in ways that benefit everyone.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Reciprocity</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People feel obligated to return favours. If you give something of value first,
                    others naturally want to reciprocate.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Help the plumber with
                      their pipe clips before you need them to move their pipework for your cable
                      route. Offer to make the tea round for the other trades. Share useful
                      information about upcoming programme changes.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Commitment &amp; Consistency
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Once people commit to something, they want to act consistently with that
                    commitment, especially if it was made publicly.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Get verbal agreements in
                      coordination meetings, then follow up in writing. &ldquo;As agreed in
                      Wednesday&rsquo;s meeting, your team will be on site by 7:30.&rdquo; People
                      are much more likely to follow through on commitments they have stated
                      publicly.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Social Proof</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People look to what others are doing to guide their own decisions, especially
                    when they are uncertain.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> &ldquo;The last three
                      projects we did used LED panels in the corridors &mdash; the clients were
                      really pleased with the finish and the running costs.&rdquo; Showing what
                      others have done reduces a client&rsquo;s uncertainty about a recommendation.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Authority</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People defer to credible experts. Demonstrating your expertise and
                    qualifications makes your recommendations more persuasive.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Reference your
                      qualifications, experience, and specific knowledge when making technical
                      recommendations. &ldquo;Based on my fifteen years as an approved electrician,
                      and the requirements of BS 7671 Regulation 411.3.3, I&rsquo;d recommend we use
                      RCBOs on this board.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Liking</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People are more easily influenced by people they like. Liking is built through
                    similarity, compliments, cooperation, and familiarity.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Build genuine
                      relationships. Learn people&rsquo;s names, remember what football team they
                      support, ask about their family. When you need something from someone who
                      likes you, they are naturally more willing to help.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <p className="text-sm font-medium text-rose-400">Scarcity</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    People value things more when they are scarce or about to become unavailable.
                    Limited availability increases perceived value.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> &ldquo;The manufacturer
                      has only six of those boards left in stock, and lead time after that is eight
                      weeks. If we order today, we stay on programme.&rdquo; Use scarcity honestly
                      &mdash; never fabricate urgency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Ethical Influence vs Manipulation
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The line between ethical influence and manipulation is determined by three things:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Intent:</strong> Are you genuinely trying to help the other person
                      make a good decision, or are you trying to exploit them for your own benefit?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Truthfulness:</strong> Are the facts you are presenting accurate, or
                      are you distorting, exaggerating, or withholding information?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Transparency:</strong> Would you be comfortable if the other person
                      knew exactly what you were doing and why? If so, it is influence. If not, it
                      is manipulation.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Cialdini himself has always emphasised that these principles should be used
                ethically. In construction, ethical influence means helping clients make informed
                decisions, supporting colleagues in doing the right thing, and building cooperation
                between trades for the benefit of the project. It does not mean pressuring people
                into decisions they would not otherwise make, fabricating urgency, or exploiting
                relationships for personal gain.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Communication is the visible expression of emotional intelligence. Everything you
                have learned in Modules 1 to 4 &mdash; self-awareness, self-regulation, motivation,
                empathy &mdash; converges in how you communicate with the people around you.
                Communication is where EI theory meets practice, and it is where your emotional
                intelligence becomes visible to the world.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Assertive communication</strong> is the EI-aligned style. It respects
                      both your needs and the other person&rsquo;s, and it requires self-awareness,
                      self-regulation, empathy, and social skill.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The DESC model</strong> (Describe, Express, Specify, Consequences)
                      gives you a reliable framework for difficult conversations that would
                      otherwise be avoided or handled badly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Written communication</strong> is high-risk because tone is absent.
                      Use the 24-hour rule, phone for sensitive topics, and deliberately add warmth
                      to written messages.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Influence without authority</strong> is built on credibility, rapport,
                      shared goals, and empathy &mdash; not position or power.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cialdini&rsquo;s six principles</strong> (reciprocity, commitment,
                      social proof, authority, liking, scarcity) are powerful when applied ethically
                      and transparently.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore what happens when communication breaks down and
                conflict arises. Conflict is inevitable in construction &mdash; the question is not
                whether it will happen, but how you will handle it when it does. The emotional
                intelligence skills you have developed in this section &mdash; assertiveness, the
                DESC model, and influence &mdash; are also the foundation for effective conflict
                management.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
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
            <Link to="../ei-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5-section-2">
              Conflict Management &amp; Teamwork
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
