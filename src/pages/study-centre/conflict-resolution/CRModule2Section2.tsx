import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Heart,
  HelpCircle,
  Eye,
  Lightbulb,
  MessageCircle,
  Shield,
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
    id: 'cr-2-2-check1',
    question: 'What is the key difference between an observation and an evaluation in NVC?',
    options: [
      'Observations use longer sentences; evaluations use shorter ones',
      'Observations describe what you can see or measure without judgement; evaluations add interpretation, blame, or generalisation',
      'Evaluations are always negative; observations are always positive',
      'There is no meaningful difference — they are interchangeable terms',
    ],
    correctIndex: 1,
    explanation:
      'In NVC, an observation is a factual, verifiable statement about what happened — "The invoice was due 14 days ago and has not been paid." An evaluation adds interpretation, judgement, or generalisation — "You never pay on time." The distinction is crucial because observations invite dialogue, while evaluations trigger defensiveness. When people hear an evaluation, they instinctively defend themselves rather than engage with the issue.',
  },
  {
    id: 'cr-2-2-check2',
    question:
      'Which of the following is a genuine feeling rather than a thought disguised as a feeling?',
    options: [
      '"I feel that you don\'t respect me."',
      '"I feel disrespected."',
      '"I feel concerned about the timeline."',
      '"I feel like you\'re not listening."',
    ],
    correctIndex: 2,
    explanation:
      '"I feel concerned" describes a genuine internal emotional state. "I feel that you don\'t respect me" and "I feel like you\'re not listening" are thoughts or judgements disguised as feelings — they are actually statements about the other person\'s behaviour. "I feel disrespected" is borderline — it implies someone is disrespecting you rather than describing your pure emotional state. NVC encourages genuine feelings (concerned, frustrated, anxious, relieved) because they describe your inner experience without blaming the other person.',
  },
  {
    id: 'cr-2-2-check3',
    question: 'In NVC, what makes a request different from a demand?',
    options: [
      'Requests are spoken quietly; demands are spoken loudly',
      'A request is specific, positive, and actionable, and the speaker is genuinely willing to hear "no"; a demand carries an implicit threat of punishment or consequence',
      'Requests are only used with clients; demands are only used with colleagues',
      'There is no difference — all requests are really demands in disguise',
    ],
    correctIndex: 1,
    explanation:
      'In NVC, a true request is specific (it asks for a concrete action), positive (it says what you want rather than what you don\'t want), actionable (the other person can actually do it), and — most importantly — the speaker is genuinely willing to hear "no" without punishing or withdrawing. A demand, by contrast, carries an implicit or explicit consequence for refusal. When people sense that "no" is not really an option, they experience the request as coercion, which breeds resentment rather than cooperation.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is NVC too soft for a construction environment?',
    answer:
      'This is one of the most common misconceptions about NVC. Nonviolent Communication is not about being soft, passive, or conflict-avoidant. It is about being direct and honest without triggering unnecessary defensiveness. Saying "The invoice was issued 30 days ago and I need payment by Friday to cover my material costs" is clear, direct, and assertive — it simply avoids the blame and generalisation that would come with "You never pay your bills on time." In fact, NVC is often more effective on construction sites precisely because it cuts through the posturing and gets to the actual issue faster. People respond to clarity and respect far better than they respond to accusations and threats.',
  },
  {
    question: 'What if the other person is not using NVC — can I still use it?',
    answer:
      "Absolutely. NVC works whether or not the other person knows anything about it. In fact, some of the most powerful applications of NVC involve receiving someone else's aggressive or accusatory language and translating it internally: \"When they say 'You're useless', what observation might be underneath that? What feeling? What need?\" By listening empathically to the other person's observations, feelings, needs, and requests — even when they are expressing them badly — you can de-escalate a conversation that would otherwise spiral. You do not need to teach NVC to the other person; you simply use it yourself.",
  },
  {
    question: 'How do I identify my needs when I have never thought about them before?',
    answer:
      'Most people in the construction industry have not been encouraged to think about their needs in these terms, so it can feel unfamiliar at first. Start with the basics: when you feel frustrated, ask yourself "What do I need that I am not getting?" The answer is usually something universal — respect, fairness, autonomy, security, clarity, competence, or connection. You do not need to use psychological jargon; simply naming the unmet need gives you much clearer information about what to do next. For example, if you realise you are frustrated because you need clarity about the project timeline, the action becomes obvious: ask for a clear schedule.',
  },
  {
    question: 'Does NVC mean I should never express anger?',
    answer:
      'No. NVC does not suppress emotions — it channels them. Rosenberg argued that anger is a valuable signal that one of your needs is unmet, but expressing anger as blame or attack is counterproductive because it triggers defensiveness in the other person. NVC asks you to look beneath the anger to find the unmet need, and then express that need directly. "I am angry because you don\'t care about quality" becomes "When I see the wiring left exposed without trunking, I feel frustrated because quality workmanship matters deeply to me, and I need us to agree on finishing standards." The anger is still acknowledged — it is simply expressed in a way that invites resolution rather than confrontation.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Who developed the Nonviolent Communication framework?',
    options: ['Stephen Covey', 'Marshall Rosenberg', 'Daniel Goleman', 'Kerry Patterson'],
    correctAnswer: 1,
    explanation:
      'Marshall Rosenberg developed NVC in the 1960s and published his seminal book "Nonviolent Communication: A Language of Life" in 2003. Rosenberg was a clinical psychologist who was influenced by Carl Rogers\' person-centred approach and by his own experiences growing up in turbulent Detroit. He spent decades teaching NVC in conflict zones around the world, including the Middle East, Rwanda, and Northern Ireland.',
  },
  {
    id: 2,
    question: 'What are the four components of NVC, in the correct order?',
    options: [
      'Feelings, observations, demands, needs',
      'Observations, feelings, needs, requests',
      'Requests, needs, feelings, observations',
      'Evaluations, thoughts, wants, demands',
    ],
    correctAnswer: 1,
    explanation:
      'The four components of NVC, in order, are: observations (what you see or hear without evaluation), feelings (your genuine emotional response), needs (the universal human need behind the feeling), and requests (a specific, positive, actionable step). This order matters because each component builds on the previous one — the observation grounds the conversation in facts, the feeling connects to your inner experience, the need explains why it matters, and the request offers a path forward.',
  },
  {
    id: 3,
    question: 'Which of the following is an observation rather than an evaluation?',
    options: [
      '"You are always late."',
      '"You arrived at 9:15 this morning — the agreed start time was 8:30."',
      '"You don\'t care about being punctual."',
      '"You have no respect for other people\'s time."',
    ],
    correctAnswer: 1,
    explanation:
      'The second option is a pure observation — it states a verifiable fact (arrival time) without adding judgement, blame, or generalisation. The other three options are evaluations: "always late" generalises, "don\'t care" assumes motivation, and "no respect" attacks character. In NVC, observations are the foundation of productive dialogue because they are difficult to argue with — the person either arrived at 9:15 or they did not. Evaluations, by contrast, immediately provoke defensiveness.',
  },
  {
    id: 4,
    question:
      '"I feel that you are being unfair." Is this a genuine feeling or a thought disguised as a feeling?',
    options: [
      'A genuine feeling',
      "A thought disguised as a feeling — it is actually an evaluation of the other person's behaviour",
      'Neither — it is a request',
      'A genuine feeling because it starts with "I feel"',
    ],
    correctAnswer: 1,
    explanation:
      'This is a thought disguised as a feeling. The words "I feel that..." are almost always followed by a thought, interpretation, or judgement rather than a genuine emotion. "I feel that you are being unfair" is actually saying "I think you are being unfair" — it is an evaluation of the other person, not a description of your internal emotional state. A genuine NVC feeling would be: "I feel frustrated" or "I feel hurt." The test is simple: can you replace "I feel" with "I think" and the sentence still makes sense? If so, it is a thought, not a feeling.',
  },
  {
    id: 5,
    question: 'Which of the following is a universal human need as defined in NVC?',
    options: ['A pay rise', 'Autonomy', 'A new van', 'More holiday time'],
    correctAnswer: 1,
    explanation:
      'In NVC, needs are universal qualities that all humans share — they are not specific strategies for meeting those needs. Autonomy is a universal human need (everyone needs some degree of autonomy). A pay rise, a new van, and more holiday time are strategies — specific means of meeting underlying needs like security, competence, or rest. The distinction matters because when people confuse strategies with needs, negotiations become positional ("I want X") rather than interest-based ("I need Y, and there may be several ways to achieve it").',
  },
  {
    id: 6,
    question: "What is the NVC approach to receiving someone else's angry or accusatory language?",
    options: [
      'Respond with equal anger to show you are not a pushover',
      'Ignore them completely and walk away',
      'Listen empathically for the observations, feelings, needs, and requests behind their words, even when expressed badly',
      'Correct their grammar and suggest they rephrase using NVC',
    ],
    correctAnswer: 2,
    explanation:
      'NVC includes not only how you express yourself but how you receive others. When someone says something aggressive or accusatory, Rosenberg taught that you can listen past the words to hear the underlying feelings and needs. "You\'re completely incompetent!" might translate to an observation (the work has not met their expectations), a feeling (frustration or anxiety), a need (quality, reliability), and an unexpressed request (fix the problem). This empathic reception does not mean accepting abuse — it means understanding the message behind the delivery, which gives you much better information for resolving the situation.',
  },
  {
    id: 7,
    question:
      'A plumber says to an electrician: "Your cables are in my way again — you lot never think about anyone else." How might this translate into NVC?',
    options: [
      'It cannot be translated — it is too aggressive for NVC',
      '"When I see cables routed across my pipe runs, I feel frustrated because I need clear access to do my work efficiently. Would you be willing to discuss cable routing before we start each area?"',
      '"I feel that electricians are selfish."',
      '"You should move your cables because I said so."',
    ],
    correctAnswer: 1,
    explanation:
      'The second option demonstrates a full NVC translation: it starts with an observation (cables routed across pipe runs), states a feeling (frustrated), names the need (clear access for efficient work), and makes a specific request (discuss cable routing in advance). The original statement combines an observation ("cables are in my way") with evaluations ("you lot never think about anyone else") and implied demands. By translating the aggressive language into NVC, the plumber\'s legitimate concern becomes a constructive conversation rather than an accusation.',
  },
  {
    id: 8,
    question: 'Why does Rosenberg argue that NVC is "nonviolent" rather than just "nice"?',
    options: [
      'Because NVC avoids all conflict and always agrees with the other person',
      "Because NVC is never assertive — it only focuses on the other person's needs",
      'Because NVC removes the violence of blame, judgement, and coercion from communication while remaining direct, honest, and assertive about needs',
      'Because NVC was designed exclusively for use in war zones',
    ],
    correctAnswer: 2,
    explanation:
      'Rosenberg drew the term "nonviolent" from Gandhi\'s philosophy of ahimsa (non-harm). He argued that everyday communication is full of subtle violence: blame, judgement, labelling, comparison, and coercion. NVC removes these elements not by becoming soft or avoidant, but by replacing them with honesty, clarity, and empathy. An NVC speaker is direct about their needs and clear about their requests — they simply express these without attacking, blaming, or coercing the other person. This makes NVC more assertive than passive, and more honest than aggressive.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Explain the four components of Nonviolent Communication and their purpose',
  'Distinguish between observations and evaluations, and express concerns as observations',
  'Identify genuine feelings vs thoughts disguised as feelings',
  'Recognise universal human needs that underlie conflict situations',
  'Formulate NVC requests that are specific, positive, and actionable',
  'Apply empathic NVC reception to translate aggressive language into underlying feelings and needs',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CRModule2Section2() {
  useSEO({
    title: 'Nonviolent Communication | Conflict Resolution Module 2.2',
    description:
      "Marshall Rosenberg's NVC framework: observations, feelings, needs, and requests applied to trade disputes in construction.",
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
            <Link to="../cr-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
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
                MODULE 2 &middot; SECTION 2
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Nonviolent Communication
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            A four-step framework for expressing yourself honestly without blame &mdash; and for
            hearing others without defensiveness, even when the conversation is difficult.
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>NVC has four components: observation, feeling, need, request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>Observations describe facts; evaluations add blame and judgement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Genuine feelings describe your internal state; &ldquo;I feel that...&rdquo; is
                  usually a thought in disguise
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  NVC is direct and honest, not soft &mdash; it removes blame without removing
                  assertiveness
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
                  Blame and judgement are the fastest way to escalate a construction dispute
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  NVC helps you express legitimate concerns without triggering defensive reactions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Understanding needs (not just positions) reveals more creative solutions to
                  disputes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  You can use NVC to decode aggressive language from others, even when they are not
                  using it themselves
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
        {/*  SECTION 01 — Marshall Rosenberg's Framework                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Marshall Rosenberg&rsquo;s Framework
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Marshall Rosenberg (1934&ndash;2015) was an American clinical psychologist who
              developed Nonviolent Communication in the 1960s, drawing on the work of Carl Rogers
              and the philosophy of Mahatma Gandhi. His seminal book,{' '}
              <em>Nonviolent Communication: A Language of Life</em>, was published in 2003 and has
              since been translated into more than thirty languages. Rosenberg spent decades
              teaching NVC in conflict zones around the world &mdash; from the Middle East to Rwanda
              to Northern Ireland &mdash; demonstrating that the framework works in the most extreme
              situations, not just in comfortable workshop settings.
            </p>

            <p className="text-white text-base leading-relaxed">
              The core premise of NVC is simple: most interpersonal conflict is driven not by
              genuine incompatibility but by the way people communicate. Specifically, Rosenberg
              identified that blame, judgement, labelling, comparison, and demand are forms of
              &ldquo;violent&rdquo; communication that trigger defensive reactions and escalate
              conflict. NVC offers an alternative &mdash; a way of expressing yourself honestly and
              hearing others empathically, without the language habits that poison relationships.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Four Components of NVC</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    1. Observation &mdash; What happened?
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    A factual, verifiable description of what you saw, heard, or measured &mdash;
                    without evaluation, interpretation, or generalisation. &ldquo;The invoice was
                    issued 30 days ago and has not been paid.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    2. Feeling &mdash; How do I feel about it?
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    A genuine emotional response to the observation. &ldquo;I feel concerned.&rdquo;
                    Not a thought disguised as a feeling (&ldquo;I feel that you don&rsquo;t respect
                    me&rdquo;).
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    3. Need &mdash; What need of mine is connected to this feeling?
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    A universal human need that is either met or unmet. &ldquo;I need financial
                    security to cover my material costs.&rdquo; Needs are universal (security,
                    respect, autonomy, fairness); strategies are specific (a pay rise, a faster
                    payment).
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    4. Request &mdash; What concrete action would meet this need?
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    A specific, positive, actionable request where the speaker is genuinely willing
                    to hear &ldquo;no.&rdquo; &ldquo;Would you be willing to process the payment by
                    this Friday?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Why the Order Matters</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                The four components are not arbitrary &mdash; the order serves a psychological
                purpose. Starting with an observation grounds the conversation in shared reality,
                preventing the other person from feeling attacked. Stating your feeling connects you
                to your own experience and invites empathy. Naming the need explains why the
                situation matters to you, creating understanding. Making a request gives the other
                person a clear, actionable path forward. Skip any step and the communication loses
                power: without the observation, you sound like you are blaming; without the feeling,
                you sound like you are lecturing; without the need, the request seems arbitrary;
                without the request, the conversation has no resolution.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Observations vs Evaluations                    */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Observations vs Evaluations</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Rosenberg considered the ability to observe without evaluating to be the highest form
              of human intelligence. It is also one of the hardest. Our brains are wired to
              interpret, categorise, and judge &mdash; it is how we make sense of a complex world.
              But in conflict situations, evaluations are gasoline on a fire. They trigger
              defensiveness, counterattack, and escalation. Observations, by contrast, are difficult
              to argue with because they describe what actually happened.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Critical Difference</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                An <strong>observation</strong> describes what you can see, hear, or measure without
                adding interpretation: &ldquo;The invoice was due on 1 February and has not been
                paid as of today, 15 February.&rdquo; An <strong>evaluation</strong>
                adds judgement, blame, or generalisation: &ldquo;You never pay on time&rdquo; or
                &ldquo;You obviously don&rsquo;t care about paying your subcontractors.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                The evaluation &ldquo;You never pay on time&rdquo; is almost certainly inaccurate
                (they have probably paid on time at least once), and the word &ldquo;never&rdquo;
                immediately invites the other person to find a counterexample rather than address
                the actual issue. The observation, by contrast, is factual and verifiable &mdash;
                the invoice is either overdue or it is not. Starting with an observation keeps the
                conversation focused on the issue rather than on attacking or defending character.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Construction Examples: Evaluation vs Observation
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Evaluation:</strong> &ldquo;Your team is sloppy and leaves a mess
                    everywhere.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong>Observation:</strong> &ldquo;When I arrived this morning, I found
                    plasterboard offcuts and packaging blocking the hallway where I need to run
                    cables.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Evaluation:</strong> &ldquo;You always change the spec without telling
                    anyone.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong>Observation:</strong> &ldquo;The specification I received on Monday
                    shows 10 double sockets in the kitchen, but the updated drawing you sent on
                    Wednesday shows 8. I wasn&rsquo;t notified about the change.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Evaluation:</strong> &ldquo;You&rsquo;re completely unreliable.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong>Observation:</strong> &ldquo;We agreed to meet on site at 8am on three
                    occasions this month. On two of those occasions, you arrived after 9am.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white text-base leading-relaxed">
              Notice how the observations are longer and more specific than the evaluations. This is
              intentional. Specificity is the antidote to generalisation. When you describe exactly
              what happened, when, and what the impact was, you give the other person concrete
              information to work with rather than a character attack to defend against. It takes
              more effort to express yourself this way, but the results are dramatically different.
            </p>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Feelings vs Thoughts                           */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Feelings vs Thoughts</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Rosenberg made a crucial distinction between genuine feelings and thoughts disguised
              as feelings. This distinction is one of the most important and most commonly
              misunderstood aspects of NVC. Many people believe they are expressing a feeling when
              they are actually making a judgement about the other person &mdash; and this
              mislabelling undermines the entire purpose of the framework.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Genuine Feelings vs Faux Feelings
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A <strong>genuine feeling</strong> describes your internal emotional state:
                concerned, frustrated, anxious, relieved, hopeful, overwhelmed, disappointed,
                grateful. These words describe what is happening inside you, and they do not contain
                any evaluation of the other person.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                A <strong>faux feeling</strong> (or &ldquo;thought disguised as a feeling&rdquo;)
                uses the language of feelings but actually makes a statement about the other
                person&rsquo;s behaviour: &ldquo;I feel ignored,&rdquo; &ldquo;I feel
                manipulated,&rdquo; &ldquo;I feel disrespected,&rdquo; &ldquo;I feel
                betrayed.&rdquo; Each of these implies that someone is ignoring, manipulating,
                disrespecting, or betraying you &mdash; they are evaluations of the other person
                dressed up in the language of feeling.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The simplest test is: can you replace &ldquo;I feel&rdquo; with &ldquo;I
                think&rdquo; and the sentence still makes sense? &ldquo;I think that you don&rsquo;t
                respect me&rdquo; makes perfect grammatical sense, which tells you that &ldquo;I
                feel that you don&rsquo;t respect me&rdquo; is a thought, not a feeling. &ldquo;I
                think concerned&rdquo; does not make sense, which confirms that &ldquo;I feel
                concerned&rdquo; is a genuine feeling.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Universal Human Needs</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                In NVC, feelings are connected to underlying needs. When a need is met, you
                experience pleasant feelings (relief, satisfaction, gratitude). When a need is
                unmet, you experience unpleasant feelings (frustration, anxiety, disappointment).
                Rosenberg identified several categories of universal human needs that all people
                share, regardless of culture, profession, or background:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Connection</strong> &mdash; belonging, acceptance, appreciation,
                    closeness, community, companionship, trust
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Autonomy</strong> &mdash; choice, freedom, independence, space,
                    self-determination
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Security</strong> &mdash; safety, stability, predictability,
                    reliability, financial security
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Fairness</strong> &mdash; equality, justice, reciprocity, honesty,
                    transparency
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Respect</strong> &mdash; consideration, dignity, recognition,
                    acknowledgement of competence
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Meaning</strong> &mdash; purpose, contribution, competence, growth,
                    challenge
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-white text-base leading-relaxed">
              When you identify the need behind your feeling, you gain enormously useful
              information. &ldquo;I feel frustrated&rdquo; tells you that something is wrong.
              &ldquo;I feel frustrated because I need reliability&rdquo; tells you exactly what is
              wrong and points towards a solution. In construction disputes, most unmet needs fall
              into a few common categories: financial security (being paid on time), respect (being
              consulted about changes), fairness (being treated the same as other trades), and
              autonomy (being trusted to do your job without micromanagement).
            </p>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Requests vs Demands                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Requests vs Demands</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The final component of NVC is the request, and Rosenberg was very specific about what
              distinguishes a genuine request from a demand. A request is specific (it asks for a
              concrete, observable action), positive (it says what you want rather than what you do
              not want), actionable (the other person can actually do it right now), and &mdash;
              most importantly &mdash; the speaker is genuinely willing to hear &ldquo;no&rdquo;
              without punishing or withdrawing.
            </p>

            <p className="text-white text-base leading-relaxed">
              This last point is what separates NVC from manipulation. If someone says
              &ldquo;no&rdquo; to your request and you respond with anger, guilt-tripping,
              withdrawal, or retaliation, then it was never really a request &mdash; it was a demand
              dressed up in polite language. People can sense the difference intuitively, and
              demands breed resentment even when they produce short-term compliance.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Characteristics of NVC Requests
                </h3>
              </div>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Specific:</strong> &ldquo;Would you be willing to pay the outstanding
                    invoice by this Friday?&rdquo; rather than &ldquo;I need you to sort this
                    out.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Positive:</strong> &ldquo;Would you be willing to notify me before
                    making changes to the spec?&rdquo; rather than &ldquo;Stop changing things
                    without telling me.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Actionable:</strong> The other person can actually do what you are
                    asking. &ldquo;Would you be willing to clear the hallway by lunchtime?&rdquo; is
                    actionable. &ldquo;Would you be willing to be more respectful?&rdquo; is too
                    vague to act on.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Open to &ldquo;no&rdquo;:</strong> If the person declines, you explore
                    alternative strategies that might meet your need rather than punishing them for
                    refusing.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                NVC Is Direct and Honest, Not Soft
              </p>
              <p className="text-white text-sm leading-relaxed">
                One of the most common misconceptions about NVC is that it is soft, passive, or
                conflict-avoidant. In reality, NVC is more direct than aggressive communication,
                because it gets straight to the point without the noise of blame and judgement.
                Compare: &ldquo;You never pay me on time and I&rsquo;m sick of it!&rdquo; vs
                &ldquo;The invoice was issued 30 days ago and has not been paid. I feel concerned
                because I need financial security to cover my material costs. Would you be willing
                to process the payment by this Friday?&rdquo; The NVC version is longer but
                infinitely more precise, more actionable, and more likely to produce the desired
                result. The aggressive version vents frustration but does not actually tell the
                other person what you need or what you want them to do.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Receiving NVC                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Receiving NVC</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              NVC is not just about how you express yourself &mdash; it is equally about how you
              receive what others say to you. Rosenberg taught that you can listen empathically for
              observations, feelings, needs, and requests even when the speaker is expressing
              themselves with blame, judgement, and aggression. This is the receiving side of NVC,
              and it is often the more powerful application, because it allows you to de-escalate
              hostile communication without matching the other person&rsquo;s tone.
            </p>

            <p className="text-white text-base leading-relaxed">
              When someone says something aggressive or hurtful, you have four choices. You can
              blame yourself (&ldquo;They&rsquo;re right, I am useless&rdquo;). You can blame them
              (&ldquo;How dare they speak to me like that&rdquo;). You can sense your own feelings
              and needs (&ldquo;I feel hurt because I need respect&rdquo;). Or you can sense the
              other person&rsquo;s feelings and needs (&ldquo;They seem frustrated because they need
              reliability&rdquo;). The last two options are the NVC response, and they are the only
              ones that lead to constructive outcomes.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Full Construction Example: Plaster Over Back Boxes
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                You arrive on site and discover that a plasterer has skimmed over the back boxes you
                installed yesterday. Your immediate reaction is anger. Here is how the conversation
                might play out with and without NVC:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Without NVC (aggressive):</p>
                  <p className="text-white text-xs leading-relaxed italic">
                    &ldquo;Who plastered over my back boxes? That&rsquo;s an absolute joke. You lot
                    don&rsquo;t have a clue what you&rsquo;re doing. I&rsquo;m going to have to hack
                    all of that out now.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">With NVC:</p>
                  <p className="text-white text-xs leading-relaxed italic">
                    &ldquo;I can see that the back boxes I installed yesterday have been plastered
                    over (observation). I feel frustrated because I&rsquo;ll need to cut them out
                    again, which puts me behind schedule (feeling). I need us to coordinate so that
                    first-fix electrical work is protected before plastering begins (need). Would
                    you be willing to check with me before plastering any areas where I&rsquo;ve
                    done first fix? (request)&rdquo;
                  </p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                The NVC version addresses exactly the same issue but does so without attacking the
                plasterer&rsquo;s competence or character. The plasterer is far more likely to
                cooperate with a reasonable coordination request than with an accusation that they
                &ldquo;don&rsquo;t have a clue.&rdquo; Both versions express frustration &mdash; but
                only the NVC version channels that frustration into a specific, actionable solution.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Translating Others&rsquo; Aggressive Language
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Now imagine the plasterer responds aggressively: &ldquo;Don&rsquo;t blame me &mdash;
                nobody told me those boxes were there. You sparkies always think the whole site
                revolves around you.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Using NVC reception, you can translate this internally:{' '}
                <strong>Observation:</strong> they were not informed about the first-fix locations.{' '}
                <strong>Feeling:</strong> they feel blamed and defensive. <strong>Need:</strong>{' '}
                they need clear communication and respect for their own work.{' '}
                <strong>Request (implied):</strong> they want to be kept informed so they can do
                their job properly.
              </p>
              <p className="text-white text-sm leading-relaxed">
                With this translation, your response becomes: &ldquo;You&rsquo;re right &mdash; it
                sounds like you weren&rsquo;t told about the first-fix locations, and I can see why
                that&rsquo;s frustrating for you too. Neither of us wants to do work twice. Shall we
                agree to flag each area before plastering starts?&rdquo; This response validates the
                plasterer&rsquo;s frustration, acknowledges the shared problem, and proposes a
                collaborative solution &mdash; all without escalating the conflict.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Section Summary                                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Section Summary</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">What We Covered</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Rosenberg&rsquo;s NVC framework</strong> &mdash; four components
                    (observation, feeling, need, request) designed to express yourself honestly
                    without blame and hear others without defensiveness.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Observations vs evaluations</strong> &mdash; observations describe
                    verifiable facts; evaluations add blame, judgement, and generalisation that
                    trigger defensiveness.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Feelings vs faux feelings</strong> &mdash; genuine feelings describe
                    your internal state; faux feelings (&ldquo;I feel ignored&rdquo;) are
                    evaluations of the other person in disguise.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Universal human needs</strong> &mdash; connection, autonomy, security,
                    fairness, respect, and meaning underlie every conflict.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Requests vs demands</strong> &mdash; genuine requests are specific,
                    positive, actionable, and open to &ldquo;no&rdquo;; demands carry implicit
                    punishment for refusal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>NVC reception</strong> &mdash; listening past aggressive language to
                    identify the underlying observation, feeling, need, and request.
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
                    NVC is not about being nice &mdash; it is about being clear. By separating
                    observations from evaluations, genuine feelings from thoughts, needs from
                    strategies, and requests from demands, you remove the communication habits that
                    escalate conflict and replace them with honesty, empathy, and precision. The
                    result is conversations that resolve issues rather than creating new ones.
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
                    <strong>This week:</strong> when you feel frustrated, pause and identify the
                    observation (what actually happened), the feeling (your genuine emotion), and
                    the need (what is unmet).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This fortnight:</strong> practise turning one evaluation into an
                    observation. Notice how the conversation changes when you describe facts rather
                    than making judgements.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> when someone speaks aggressively to you, try
                    internally translating their words into observations, feelings, needs, and
                    requests. Notice how this changes your emotional response.
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
            <Link to="../cr-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../cr-module-2-section-3">
              Next: The Crucial Conversations Framework
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
