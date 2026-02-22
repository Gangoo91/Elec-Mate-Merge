import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  HelpCircle,
  Shield,
  Target,
  Users,
  Lightbulb,
  AlertTriangle,
  Handshake,
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
    id: 'cr-2-3-check1',
    question: 'According to Patterson et al., what three conditions make a conversation "crucial"?',
    options: [
      'It involves money, it takes more than an hour, and it requires a written record',
      'High stakes, opposing opinions, and strong emotions',
      'It involves more than two people, it happens on site, and it concerns safety',
      'The conversation is with a client, it is face-to-face, and it is about a complaint',
    ],
    correctIndex: 1,
    explanation:
      'Patterson, Grenny, McMillan, and Switzler defined a crucial conversation as one where three conditions are present simultaneously: the stakes are high (the outcome significantly affects the people involved), the opinions are opposing (the parties see things differently), and the emotions are strong (people feel strongly about the issue). When all three conditions are present, the conversation is likely to go badly unless it is handled skilfully, because strong emotions impair rational thinking and opposing opinions combined with high stakes create pressure to win rather than understand.',
  },
  {
    id: 'cr-2-3-check2',
    question: 'What is the "Pool of Shared Meaning" and why is it important?',
    options: [
      'A database where meeting notes are stored so everyone can access them',
      'A metaphor for the total amount of relevant information that all participants openly share during a dialogue — better decisions come from a larger pool',
      'A technique for avoiding emotional conversations by focusing only on facts',
      'A method of voting to determine which opinion is correct',
    ],
    correctIndex: 1,
    explanation:
      "The Pool of Shared Meaning is Patterson et al.'s metaphor for the collective information, opinions, feelings, and experiences that all participants contribute to a conversation. When people feel safe, they add their unique information to the pool, which means better decisions because more relevant data is available. When people feel unsafe, they withhold information (silence) or force it in aggressively (violence), which shrinks the pool and leads to worse decisions. The goal of a crucial conversation is to make it safe for everyone to add their meaning to the pool.",
  },
  {
    id: 'cr-2-3-check3',
    question: 'In the STATE model, what does "Talk tentatively" mean?',
    options: [
      'Speak very quietly so the other person has to lean in to hear you',
      'Avoid stating your opinion at all — only ask questions',
      'Present your story as your interpretation rather than as absolute fact, using phrases like "I\'m beginning to wonder whether..." or "From my perspective..."',
      'Only talk about topics that are not controversial or emotional',
    ],
    correctIndex: 2,
    explanation:
      'Talking tentatively means presenting your interpretation, conclusion, or story as what it is — your perspective, not objective truth. This does not mean being wishy-washy or uncertain; it means being honest about the fact that your view is based on incomplete information and your own interpretation of events. Phrases like "I\'m starting to wonder whether...", "The story I\'m telling myself is...", or "From where I\'m standing, it looks like..." signal that you are open to hearing a different perspective. This makes it psychologically safer for the other person to share their view rather than feeling they have to defend themselves against your certainty.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I create safety when the other person is already angry?',
    answer:
      'When someone is already angry, the first priority is to restore safety before attempting to discuss the content of the issue. Start by establishing Mutual Purpose: "I can see this is important to you, and I want to resolve it — I\'m not trying to dismiss your concerns." Then establish Mutual Respect: "I value the work you do and the relationship we have." Often, simply acknowledging the person\'s anger without trying to fix it or argue against it is enough to begin restoring safety. Avoid the temptation to match their energy or to shut the conversation down. Once they feel heard and respected, you can gently move back to the content: "Now that I understand how you feel, can we look at this together?"',
  },
  {
    question: 'What if I try the STATE model and the other person just shuts down?',
    answer:
      'Silence (withdrawing, avoiding, masking) is one of the two dysfunctional responses Patterson et al. identified. If the other person shuts down, it usually means they do not feel safe enough to contribute. Rather than pushing harder, step back and address the safety issue. Use Contrasting to clarify your intent: "I don\'t want you to think I\'m blaming you for this — what I do want is for us to figure out a solution together." Ask open-ended questions: "I\'d really like to hear your perspective on this. What am I missing?" Sometimes, the best approach is to acknowledge the shutdown directly: "I notice you\'ve gone quiet. That tells me something isn\'t working for you in this conversation. What would help?"',
  },
  {
    question: 'Is the Crucial Conversations framework only for formal meetings?',
    answer:
      'Not at all. The framework is designed for any conversation where the stakes are high, opinions differ, and emotions are strong — and those conversations happen informally on construction sites every day. A five-minute conversation in the corridor about a specification change can be crucial. A phone call with a client about a price increase can be crucial. A chat with your apprentice about their timekeeping can be crucial. The tools (creating safety, the STATE model, contrasting) can be used in any setting, whether you are in a boardroom or standing in a half-finished kitchen.',
  },
  {
    question: 'How do I move from a crucial conversation to actual action?',
    answer:
      'Patterson et al. emphasise that conversations without action are just talk. At the end of any crucial conversation, you should agree on "who does what by when" with a clear follow-up mechanism. Be specific: "So you\'ll send the updated specification by Wednesday, and I\'ll adjust the first-fix plan by Friday. Let\'s touch base on Monday to confirm we\'re aligned." Vague agreements ("We\'ll sort it out soon") almost always fail. Document the agreement, even if it is just a quick text message summarising what was agreed. Then follow up at the agreed time. If you consistently follow through, people learn that crucial conversations with you lead to real outcomes, which builds trust for future difficult conversations.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Who developed the Crucial Conversations framework?',
    options: [
      'Marshall Rosenberg',
      'Stephen Covey',
      'Kerry Patterson, Joseph Grenny, Ron McMillan, and Al Switzler',
      'Daniel Goleman',
    ],
    correctAnswer: 2,
    explanation:
      'The Crucial Conversations framework was developed by Kerry Patterson, Joseph Grenny, Ron McMillan, and Al Switzler, first published in their 2002 book "Crucial Conversations: Tools for Talking When Stakes Are High." The book drew on over 25 years of research into what distinguishes effective communicators from ineffective ones in high-stakes situations. It has since become one of the most widely used communication frameworks in business and organisational settings.',
  },
  {
    id: 2,
    question:
      'When people feel unsafe in a conversation, they typically move to one of two dysfunctional responses. What are they?',
    options: [
      'Thinking and feeling',
      'Silence and violence',
      'Agreement and disagreement',
      'Logic and emotion',
    ],
    correctAnswer: 1,
    explanation:
      'Patterson et al. identified silence and violence as the two dysfunctional responses people default to when they feel unsafe in a crucial conversation. Silence includes withdrawing (going quiet), avoiding (changing the subject), and masking (understating or sugar-coating your real opinion). Violence includes controlling (dominating the conversation), labelling (putting people in boxes), and attacking (belittling or threatening). Both responses remove information from the Pool of Shared Meaning and lead to worse outcomes.',
  },
  {
    id: 3,
    question: 'What are the two conditions for psychological safety in a crucial conversation?',
    options: [
      'Mutual Profit and Mutual Control',
      'Mutual Purpose and Mutual Respect',
      'Mutual Agreement and Mutual Silence',
      'Mutual Power and Mutual Authority',
    ],
    correctAnswer: 1,
    explanation:
      'Patterson et al. identified two conditions that must be present for people to feel safe enough to share their views openly. Mutual Purpose means the other person believes you care about their goals and interests, not just your own — you are working towards a shared outcome. Mutual Respect means the other person believes you value them as a human being, even if you disagree with their position. When either condition is violated, safety breaks down and people retreat to silence or violence.',
  },
  {
    id: 4,
    question: 'What does the "S" in the STATE model stand for?',
    options: [
      'Start with assumptions',
      'Share your facts',
      'Speak your mind forcefully',
      'Stay silent until asked',
    ],
    correctAnswer: 1,
    explanation:
      'The "S" in STATE stands for "Share your facts." Patterson et al. emphasised that facts are the least controversial part of your story — they are what anyone watching would have observed. Starting with facts creates a foundation of shared reality before you move to your interpretation. For example, "In the last three months, I have issued three invoices and received payment for one" is a fact that is hard to argue with. Leading with your conclusion ("You don\'t take paying your subcontractors seriously") is much more likely to provoke defensiveness.',
  },
  {
    id: 5,
    question: 'What is "Contrasting" and when should you use it?',
    options: [
      "Comparing your situation with someone else's to show you have it worse",
      'A technique that uses a "don\'t/do" statement to address misunderstandings about your intent — "I don\'t want X, what I do want is Y"',
      "A way of highlighting the differences between your position and the other person's",
      'A method of presenting two options and asking the other person to choose',
    ],
    correctAnswer: 1,
    explanation:
      'Contrasting is a specific technique Patterson et al. recommended for when safety breaks down because the other person has misunderstood your purpose or feels disrespected. It uses a "don\'t/do" format: first, address the misunderstanding by stating what you do NOT intend, then state what you DO intend. For example: "I don\'t want you to think I\'m questioning your competence — what I do want is to find a way to prevent this issue from happening again." Contrasting proactively addresses the threat the other person perceives and refocuses the conversation on your actual purpose.',
  },
  {
    id: 6,
    question:
      'According to the Crucial Conversations framework, what should happen at the end of every crucial conversation?',
    options: [
      'Both parties should apologise to each other',
      'A formal written contract should be signed',
      'Clear agreement on who does what by when, with a follow-up mechanism',
      'The conversation should be reported to a senior manager for validation',
    ],
    correctAnswer: 2,
    explanation:
      'Patterson et al. emphasised that crucial conversations must end with clear, specific, actionable commitments — who does what by when — plus an agreed follow-up mechanism. Without this, even the most productive dialogue remains just talk. Vague agreements like "We\'ll try to do better" or "Let\'s see how it goes" almost always fail because there is no accountability. Specific commitments create clarity, prevent misunderstandings, and build trust because both parties can see whether the agreed actions have been taken.',
  },
  {
    id: 7,
    question:
      'A site manager needs to tell a long-standing subcontractor that their prices are being reviewed. Using the STATE model, what should they lead with?',
    options: [
      '"I think you\'ve been overcharging us for years."',
      '"I need to be honest — your prices are out of line with the market. We\'ve benchmarked your rates against three other firms and found a 15% difference on average."',
      '"Your invoices have increased by 15% over the past twelve months, while comparable firms have held their rates steady."',
      '"Some of your colleagues have been complaining about your prices."',
    ],
    correctAnswer: 2,
    explanation:
      'The third option leads with facts — the "S" (Share your facts) in STATE. It presents verifiable, non-judgemental data: invoices have increased by 15%, comparable firms have not increased. This creates a foundation for dialogue without triggering defensiveness. The first option leads with a judgement ("overcharging"), the second mixes facts with evaluations ("out of line"), and the fourth uses anonymous hearsay. By starting with facts, the site manager invites the subcontractor to share their perspective on why prices have increased, which may reveal legitimate reasons the manager was not aware of.',
  },
  {
    id: 8,
    question: 'Which of the following best describes the "Pool of Shared Meaning"?',
    options: [
      'A physical whiteboard where all meeting notes are recorded',
      'The collective information, feelings, opinions, and experiences that all participants openly contribute to a conversation, leading to better-informed decisions',
      "A technique for averaging everyone's opinions to find a compromise",
      'A database of previous conflicts and their resolutions',
    ],
    correctAnswer: 1,
    explanation:
      "The Pool of Shared Meaning is Patterson et al.'s central metaphor. It represents the total information available to the group when everyone feels safe enough to share openly. Each person brings unique knowledge, perspectives, and feelings. When all of this flows into the shared pool, the group has the best possible information for making decisions. When people withhold information (through silence) or force it in destructively (through violence), the pool is impoverished and decisions are worse. The entire Crucial Conversations framework is designed to make it safe for people to contribute to the pool.",
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Define a crucial conversation and identify the three conditions that make a conversation crucial',
  'Explain the Pool of Shared Meaning and why it determines the quality of decisions',
  'Describe the two conditions for safety: Mutual Purpose and Mutual Respect',
  'Apply the STATE model to structure difficult conversations constructively',
  'Use Contrasting to repair misunderstandings and restore safety',
  'Move from dialogue to action by establishing clear commitments with follow-up',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CRModule2Section3() {
  useSEO({
    title: 'The Crucial Conversations Framework | Conflict Resolution Module 2.3',
    description:
      'Patterson et al.: creating safety, mutual purpose, the STATE model, contrasting, and moving to action in high-stakes conversations.',
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
            <MessageSquare className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 3
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Crucial Conversations Framework
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            A structured approach to having high-stakes conversations where opinions differ and
            emotions run strong &mdash; without resorting to silence or aggression.
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
                  Crucial conversations have high stakes, opposing opinions, and strong emotions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  When unsafe, people default to silence (withdrawing) or violence (attacking)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Safety requires Mutual Purpose (I care about your goals) and Mutual Respect (I
                  value you as a person)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The STATE model structures your message: Share facts, Tell story, Ask, Talk
                  tentatively, Encourage testing
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
                  Construction professionals face crucial conversations daily: pricing, quality,
                  timelines, safety
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Avoided or botched crucial conversations cost businesses thousands in lost
                  contracts and damaged relationships
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The framework gives you a structured process when emotions are too high for
                  intuition alone
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Moving to clear action commitments prevents conversations from becoming talk
                  without outcomes
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
        {/*  SECTION 01 — What Makes a Conversation Crucial              */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">What Makes a Conversation Crucial</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In their 2002 book{' '}
              <em>Crucial Conversations: Tools for Talking When Stakes Are High</em>, Kerry
              Patterson, Joseph Grenny, Ron McMillan, and Al Switzler defined a crucial conversation
              as one where three conditions are present simultaneously: the stakes are high, the
              opinions are opposing, and the emotions are strong. It is this combination that makes
              these conversations so difficult &mdash; and so important. When the stakes are low,
              disagreements are easy to handle. When emotions are mild, opposing opinions can be
              discussed calmly. But when all three conditions collide, the conversation becomes a
              pressure cooker.
            </p>

            <p className="text-white text-base leading-relaxed">
              The tragedy, Patterson et al. observed, is that the conversations that matter most are
              the ones we handle worst. When the stakes are high, we become anxious about the
              outcome, which impairs our cognitive function. When opinions clash, we feel threatened
              and become defensive. When emotions are strong, our prefrontal cortex (the rational,
              problem-solving part of the brain) is overwhelmed by the amygdala (the fight-or-flight
              centre). The result is that we revert to our worst communication habits precisely when
              we need our best ones.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Why Crucial Conversations Go Wrong
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                When people feel unsafe in a crucial conversation, they default to one of two
                dysfunctional responses: <strong>silence</strong> or <strong>violence</strong>.
                These are not literal &mdash; silence means withdrawing information, and violence
                means forcing it.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Silence</strong> takes three forms: withdrawing (going quiet, shutting
                down), avoiding (changing the subject, deflecting), and masking (understating your
                real opinion, sugar-coating, or telling people what they want to hear). All three
                forms remove information from the conversation.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Violence</strong> also takes three forms: controlling (dominating the
                conversation, cutting people off, bullying), labelling (putting people in dismissive
                categories &mdash; &ldquo;you&rsquo;re just a typical subbie&rdquo;), and attacking
                (belittling, threatening, or making personal remarks). All three forms force
                information in destructively, which makes others withdraw.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Examples of Crucial Conversations
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>Telling a long-standing client that your prices need to increase</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Raising a safety concern with a site manager who dismisses health and safety
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Addressing persistent poor workmanship from another trade that affects your work
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Negotiating additional payment for work that was not in the original scope
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — The Pool of Shared Meaning                     */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Pool of Shared Meaning</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The Pool of Shared Meaning is the central metaphor of the Crucial Conversations
              framework. It represents the total information &mdash; facts, opinions, feelings,
              experiences &mdash; that all participants openly contribute to a conversation. Each
              person enters a dialogue with their own private pool of meaning: their observations,
              their interpretation of events, their feelings about the situation. The goal of a
              crucial conversation is to get as much of that private information into the shared
              pool as possible, because the quality of any decision is directly related to the
              quality and quantity of information available.
            </p>

            <p className="text-white text-base leading-relaxed">
              When people feel safe, they freely add their unique information to the shared pool.
              The site manager shares the budget constraints. The electrician shares the technical
              reality. The client shares their concerns and priorities. With all of this information
              in the pool, the group can make genuinely informed decisions that account for
              everyone&rsquo;s needs and constraints. When people feel unsafe, they withhold
              information (silence) or try to force their meaning on others (violence). Either way,
              the pool is impoverished, and the resulting decisions are based on incomplete
              information.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  The Practical Impact of a Small Pool
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Consider a scenario where a project manager and an electrician are discussing
                whether to proceed with a Friday completion deadline. The electrician knows that the
                materials delivery was delayed and that the work will require an extra day, but the
                project manager has a reputation for punishing bad news. So the electrician says,
                &ldquo;We&rsquo;ll do our best&rdquo; &mdash; silence in the form of masking.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The project manager, working with an incomplete pool of information, commits to the
                client that the work will be done by Friday. When it is not, the client is furious,
                the project manager blames the electrician, and the electrician feels vindicated but
                resentful. The entire problem traces back to a crucial conversation where it was not
                safe to add the truth to the shared pool. If the electrician had felt safe to share
                the delivery delay, the project manager could have renegotiated with the client in
                advance &mdash; a far better outcome for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Creating Safety                                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Creating Safety</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Patterson et al. identified two conditions that must be present for people to feel
              safe enough to share openly: Mutual Purpose and Mutual Respect. When either condition
              is violated, safety breaks down and people retreat to silence or violence. The skill
              of a crucial conversation is recognising when safety has been lost and restoring it
              before attempting to continue the dialogue.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Mutual Purpose</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Mutual Purpose means the other person believes you care about their goals,
                interests, and outcomes &mdash; not just your own. It answers the question:
                &ldquo;Do you genuinely want what is good for me, or are you only looking out for
                yourself?&rdquo; When Mutual Purpose is present, people interpret your words
                charitably &mdash; they assume good intent even when the message is difficult. When
                Mutual Purpose is absent, people interpret even innocent comments as self-serving or
                manipulative.
              </p>
              <p className="text-white text-sm leading-relaxed">
                On a construction site, establishing Mutual Purpose might sound like: &ldquo;I want
                to talk about the timeline, and I want you to know that my goal is the same as yours
                &mdash; to deliver a quality job for the client without anyone being put under
                unreasonable pressure. Can we look at this together?&rdquo; This frames the
                conversation as a shared problem rather than an adversarial negotiation.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Mutual Respect</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Mutual Respect means the other person believes you value them as a human being, even
                when you disagree with their position. It answers the question: &ldquo;Do you see me
                as a competent, worthy person, or do you look down on me?&rdquo; When Mutual Respect
                is violated, people feel humiliated or demeaned, and the conversation becomes about
                defending dignity rather than solving problems.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Mutual Respect does not mean you agree with the other person or that you approve of
                their behaviour. It means you treat them as a fellow professional deserving of basic
                courtesy and consideration. On a construction site, violating Mutual Respect looks
                like talking down to someone, dismissing their opinion because of their role
                (&ldquo;You&rsquo;re only a labourer &mdash; what would you know?&rdquo;), or
                criticising them in front of others. Maintaining it means having difficult
                conversations privately, acknowledging the other person&rsquo;s perspective, and
                avoiding personal attacks even when you disagree.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — The STATE Model                                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The STATE Model</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Once safety has been established, the STATE model provides a structured way to share
              your perspective without triggering defensiveness. Each letter represents a step in
              the process, and the order is deliberate &mdash; starting with the least controversial
              element (facts) and building towards the most vulnerable (asking for the other
              person&rsquo;s perspective).
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The STATE Model</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">S &mdash; Share Your Facts</p>
                  <p className="text-white text-xs leading-relaxed">
                    Start with the facts &mdash; the objective, verifiable data that anyone
                    observing the situation would agree on. Facts are the least controversial
                    starting point and create a foundation of shared reality. &ldquo;In the last
                    twelve months, your invoices have increased by 15% while comparable firms have
                    held their rates.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">T &mdash; Tell Your Story</p>
                  <p className="text-white text-xs leading-relaxed">
                    Once you have shared the facts, tell the story you are making from those facts
                    &mdash; your interpretation, your conclusion. This is where you move from
                    objective data to subjective meaning. &ldquo;Looking at these numbers, I&rsquo;m
                    beginning to wonder whether our costs are sustainable at this level.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    A &mdash; Ask for Others&rsquo; Paths
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Genuinely invite the other person to share their facts and their story.
                    &ldquo;I&rsquo;d really like to understand your perspective. What am I missing?
                    How do you see it?&rdquo; This is not a rhetorical gesture &mdash; you must be
                    genuinely curious about their viewpoint.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">T &mdash; Talk Tentatively</p>
                  <p className="text-white text-xs leading-relaxed">
                    Present your story as your interpretation, not as absolute truth. Use phrases
                    like &ldquo;I&rsquo;m starting to wonder whether...&rdquo;, &ldquo;The story
                    I&rsquo;m telling myself is...&rdquo;, or &ldquo;From my perspective, it looks
                    like...&rdquo;. This signals openness and makes it safe for the other person to
                    offer a different interpretation.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">E &mdash; Encourage Testing</p>
                  <p className="text-white text-xs leading-relaxed">
                    Actively invite the other person to challenge your view. &ldquo;Does this match
                    what you&rsquo;re seeing? Tell me if I&rsquo;m off base.&rdquo; This creates
                    genuine dialogue rather than a one-way lecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Construction Example: Raising a Price Increase
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                You are an electrical subcontractor who needs to increase prices for a long-standing
                client. This is a crucial conversation: the stakes are high (the relationship and
                future work), the opinions may differ (the client wants low costs, you need fair
                rates), and emotions could be strong (anxiety about the relationship, frustration
                about margins).
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Share your facts:</strong> &ldquo;Over the past eighteen months, our
                material costs have increased by 22%, and our labour costs have gone up by 12%.
                We&rsquo;ve absorbed these increases so far, but our margins have dropped to the
                point where we&rsquo;re barely covering costs on some jobs.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Tell your story:</strong> &ldquo;I&rsquo;m concerned that if we continue at
                the current rates, we won&rsquo;t be able to maintain the quality and reliability
                you&rsquo;ve come to expect from us. I want to keep working with you, and I want to
                be upfront about where we stand.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Ask for their path:</strong> &ldquo;I realise this affects your budgets too.
                How are you seeing things from your side? Are there other ways we could structure
                this that would work for both of us?&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Talk tentatively:</strong> &ldquo;I&rsquo;m thinking that a phased increase
                might be easier for you to manage than a single jump. But I&rsquo;m open to other
                approaches &mdash; this is a starting point, not a final position.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Encourage testing:</strong> &ldquo;Does that feel reasonable to you? Tell me
                honestly if there is something I&rsquo;m not considering.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Contrasting and Moving to Action               */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Contrasting and Moving to Action</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Even with the best preparation, crucial conversations can go off track. The other
              person may misinterpret your intent, feel attacked, or withdraw.{' '}
              <strong>Contrasting</strong> is a specific tool for repairing these moments. It uses a
              &ldquo;don&rsquo;t / do&rdquo; format: first, you address what the other person might
              fear you intend, then you state your actual purpose.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Contrasting Formula</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                &ldquo;I don&rsquo;t want [what they fear]. What I do want is [your actual
                purpose].&rdquo;
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;I don&rsquo;t want you to think I&rsquo;m questioning your competence.
                    What I do want is for us to agree on a quality standard we&rsquo;re both happy
                    with.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;I don&rsquo;t want to threaten our working relationship. What I do want
                    is to be honest about the numbers so we can find a way forward together.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;I don&rsquo;t want to blame you for the delay. What I do want is to
                    figure out how we prevent this from happening on the next phase.&rdquo;
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                Contrasting works because it proactively addresses the threat the other person
                perceives. Often, people react defensively not to what you said but to what they
                think you meant. By explicitly naming what you do not intend, you remove the
                perceived threat and refocus the conversation on your constructive purpose.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Handshake className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Moving to Action: Who Does What by When
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A crucial conversation without clear action commitments is just a conversation.
                Patterson et al. emphasised that every crucial conversation must end with specific
                agreements: who will do what, by when, with what follow-up. Vague commitments
                (&ldquo;We&rsquo;ll try to do better&rdquo;, &ldquo;Let&rsquo;s see how it
                goes&rdquo;) almost always fail because there is no clarity and no accountability.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Good action commitments are specific, time-bound, and include a follow-up mechanism.
                For example: &ldquo;So you will send the updated specification by Wednesday
                lunchtime, and I will adjust the first-fix plan by Friday. Let&rsquo;s have a
                five-minute phone call on Monday morning to confirm we are aligned before the team
                starts work.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                Document the agreement, even informally &mdash; a text message or a quick email
                summarising what was agreed is sufficient. Then follow up at the agreed time. If you
                consistently follow through on commitments and hold others to theirs, people learn
                that crucial conversations with you lead to real outcomes, which builds trust for
                future difficult discussions.
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
                    <strong>What makes a conversation crucial</strong> &mdash; high stakes, opposing
                    opinions, and strong emotions combine to create conversations that matter most
                    but are handled worst.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Silence and violence</strong> &mdash; the two dysfunctional responses
                    people default to when they feel unsafe, both of which remove information from
                    the Pool of Shared Meaning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Mutual Purpose and Mutual Respect</strong> &mdash; the two conditions
                    for psychological safety that make it possible for people to share openly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The STATE model</strong> &mdash; Share facts, Tell your story, Ask for
                    others&rsquo; paths, Talk tentatively, Encourage testing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Contrasting</strong> &mdash; a &ldquo;don&rsquo;t / do&rdquo; technique
                    for repairing misunderstandings about your intent.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Moving to action</strong> &mdash; clear commitments (who does what by
                    when) with follow-up to ensure conversations produce results.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    The conversations that matter most are the ones most people handle worst. The
                    Crucial Conversations framework gives you a structured approach for these
                    high-stakes moments: create safety first, share your perspective using STATE,
                    use Contrasting to repair misunderstandings, and always end with clear action
                    commitments. The goal is not to win the conversation but to expand the Pool of
                    Shared Meaning so that better decisions can be made.
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
                    <strong>This week:</strong> identify one crucial conversation you have been
                    avoiding. Write down the facts (S), your story (T), and a Contrasting statement.
                    Plan when to have the conversation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This fortnight:</strong> in your next difficult conversation, notice
                    whether the other person moves to silence or violence. If they do, pause and
                    restore safety before continuing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> end every important conversation with a clear
                    &ldquo;who does what by when&rdquo; commitment, and follow up at the agreed
                    time.
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
            <Link to="../cr-module-2-section-4">
              Next: Assertiveness vs Aggression
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
