import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Ear,
  HelpCircle,
  Users,
  Volume2,
  Eye,
  HandMetal,
  MessageCircle,
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
    id: 'cr-2-1-check1',
    question:
      'According to Covey, what is the highest level on the listening ladder, and how does it differ from attentive listening?',
    options: [
      'Selective listening — you filter for the parts that interest you',
      "Empathic listening — you seek to understand the other person's frame of reference, not just their words",
      'Attentive listening — you pay full attention to every word spoken',
      'Pretend listening — you nod and make appropriate sounds without processing',
    ],
    correctIndex: 1,
    explanation:
      "Empathic listening is the highest level on Covey's listening ladder. Unlike attentive listening, where you pay full attention to the words being spoken, empathic listening goes further by seeking to understand the speaker's frame of reference, their emotions, and the meaning behind their words. It is listening with the intent to understand, not merely to hear or respond.",
  },
  {
    id: 'cr-2-1-check2',
    question:
      'A client says, "This is taking forever and costing me a fortune." Which reflective listening response best demonstrates empathic listening?',
    options: [
      '"It hasn\'t actually taken that long compared to most jobs."',
      '"I understand you\'re feeling frustrated about both the timeline and the cost. Can you tell me which is the bigger concern right now?"',
      '"Don\'t worry, we\'ll get it done."',
      '"You should have expected this — rewires always take time."',
    ],
    correctIndex: 1,
    explanation:
      "The second option demonstrates empathic listening because it reflects back the client's feelings (frustration), acknowledges both concerns (timeline and cost), and invites further dialogue. It shows that you have heard not just the words but the emotion behind them, and it creates space for the client to clarify what matters most. The other options dismiss, minimise, or lecture — all common listening failures.",
  },
  {
    id: 'cr-2-1-check3',
    question: "Why is validation important even when you disagree with someone's position?",
    options: [
      'Because you should always agree to avoid conflict',
      'Because pretending to agree builds trust faster than honesty',
      "Because acknowledging someone's feelings reduces their defensiveness and opens them to hearing your perspective",
      'Because validation means accepting that you are wrong',
    ],
    correctIndex: 2,
    explanation:
      'Validation is not agreement — it is acknowledgement. When you validate someone\'s feelings ("I can see why you feel that way"), you reduce their defensiveness because they no longer need to fight to be heard. This does not mean you agree with their position or concede your own. It simply means you recognise their emotional experience as real and legitimate, which creates the psychological safety needed for productive dialogue.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I practise active listening when I am under time pressure on site?',
    answer:
      'Active listening does not require long conversations. Even thirty seconds of genuine, focused attention — putting down your tools, making eye contact, and reflecting back what someone has said — can transform an interaction. The key is quality, not quantity. If you truly do not have time right now, say so honestly: "I want to hear this properly, but I\'m mid-task. Can we talk at the break?" That response itself demonstrates respect and attentive listening, because you are prioritising understanding over rushing through a half-heard conversation.',
  },
  {
    question:
      'What if I try reflective listening and the other person thinks I am being patronising?',
    answer:
      'This is a common concern, and it usually happens when reflective listening is applied mechanically — robotically repeating someone\'s words back to them without genuine curiosity. The solution is to focus on the spirit of the technique rather than the formula. Instead of parroting "So what you\'re saying is..." every time, vary your approach: sometimes paraphrase in your own words, sometimes reflect the feeling you detect, sometimes simply ask a follow-up question that shows you were really listening. If it feels unnatural at first, that is normal. Like any skill, it becomes more natural with practice.',
  },
  {
    question: 'Is empathic listening really different from just being a good listener?',
    answer:
      "Yes, significantly. Most people who consider themselves good listeners are operating at Covey's attentive level — they pay attention to the words, they do not interrupt, and they make appropriate responses. Empathic listening goes beyond this by actively seeking to understand the other person's frame of reference: their feelings, their perspective, and the meaning behind what they are saying. It requires you to temporarily set aside your own viewpoint and genuinely see the situation through their eyes. This is much harder than simply paying attention, but it is also much more powerful for resolving conflict.",
  },
  {
    question: 'How do I listen empathically when someone is being aggressive or unreasonable?',
    answer:
      'This is one of the hardest applications of empathic listening, and it is also one of the most important. When someone is aggressive, there is almost always an unmet need or a strong emotion driving the behaviour — fear, frustration, feeling disrespected, or feeling unheard. Empathic listening in this context means looking past the aggression to identify the underlying emotion: "It sounds like you are really frustrated about this delay." This does not excuse the aggression, and you should still set boundaries if someone is abusive. But often, when an aggressive person feels genuinely heard, the aggression reduces because they no longer need to escalate to get your attention.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "How many levels are there on Covey's listening ladder?",
    options: ['Three', 'Four', 'Five', 'Seven'],
    correctAnswer: 2,
    explanation:
      "Covey's listening ladder has five levels: ignoring, pretend listening, selective listening, attentive listening, and empathic listening. Each level represents a progressively deeper degree of engagement with the speaker. Most everyday conversations on construction sites operate at the selective listening level, where the listener filters for information relevant to their own concerns.",
  },
  {
    id: 2,
    question: "Which of Covey's Seven Habits directly relates to empathic listening?",
    options: [
      'Habit 1: Be Proactive',
      'Habit 3: Put First Things First',
      'Habit 5: Seek First to Understand, Then to Be Understood',
      'Habit 7: Sharpen the Saw',
    ],
    correctAnswer: 2,
    explanation:
      'Habit 5 — "Seek First to Understand, Then to Be Understood" — is the habit most directly connected to empathic listening. Covey argued that most people listen with the intent to reply rather than with the intent to understand. By reversing this order — understanding before responding — you build trust and dramatically improve the quality of communication. This habit is especially powerful in conflict situations where both parties feel unheard.',
  },
  {
    id: 3,
    question: 'What is the key difference between paraphrasing and reflecting feelings?',
    options: [
      'Paraphrasing is shorter than reflecting feelings',
      'Paraphrasing restates the content in your own words; reflecting feelings names the emotion you detect behind the words',
      'Reflecting feelings is only appropriate in therapy, not on a construction site',
      'There is no meaningful difference — they are the same technique',
    ],
    correctAnswer: 1,
    explanation:
      'Paraphrasing restates the factual content of what someone has said in your own words, confirming you understood the information. Reflecting feelings goes deeper by identifying and naming the emotion behind the words. For example, if a client says "The plasterer has covered all my back boxes again," paraphrasing would be "So the boxes you installed yesterday have been plastered over." Reflecting feelings would be "It sounds like you\'re really frustrated that your work has been undone without anyone checking with you first." Both techniques are valuable, but reflecting feelings creates deeper connection.',
  },
  {
    id: 4,
    question:
      'Which of the following is a common listening failure that active listening aims to overcome?',
    options: [
      'Making eye contact with the speaker',
      'Asking clarifying questions',
      'Mentally preparing your rebuttal while the other person is still talking',
      'Summarising what you have heard at the end of the conversation',
    ],
    correctAnswer: 2,
    explanation:
      "Mentally preparing your rebuttal while someone is still speaking is one of the most common listening failures. When you are composing your response, you are no longer fully attending to what the speaker is saying — you are processing your own thoughts instead. This means you often respond to what you expected them to say rather than what they actually said. Active listening requires you to resist this urge and stay fully present with the speaker's words, tone, and meaning until they have finished.",
  },
  {
    id: 5,
    question:
      'A site manager says, "I\'m fine, just get on with it." What does empathic listening suggest you should pay attention to?',
    options: [
      'Only the words — if they say they are fine, accept it and move on',
      'Their body language, tone of voice, and the context of the conversation, which may tell a different story from the words',
      "Nothing — it is not your job to read other people's emotions",
      'The words, but repeat them back louder to make sure they meant it',
    ],
    correctAnswer: 1,
    explanation:
      'Empathic listening pays attention to the whole message, not just the words. Research suggests that a large proportion of communication is nonverbal — tone, facial expression, posture, and context. When someone says "I\'m fine" with a clenched jaw, crossed arms, and a terse tone, the nonverbal signals are contradicting the verbal message. Empathic listening means reading these signals and responding to the full picture, perhaps by saying, "You say you\'re fine, but you seem a bit tense. Is there anything I can help with?"',
  },
  {
    id: 6,
    question:
      'Why does Covey argue that most people listen at the selective level in everyday conversation?',
    options: [
      'Because selective listening is the most effective form of communication',
      'Because people naturally filter for information relevant to their own interests and concerns, tuning out the rest',
      'Because selective listening is taught in schools as the standard approach',
      'Because attentive listening requires formal training that most people do not have',
    ],
    correctAnswer: 1,
    explanation:
      'Covey observed that most people naturally listen selectively — they filter incoming information for what is relevant to their own needs, opinions, and concerns, and they tune out or dismiss the rest. This is efficient in low-stakes situations, but in conflict or high-stakes conversations, it means you miss crucial information about what the other person actually needs. Covey argued that moving from selective to empathic listening requires a deliberate shift in intent: from listening to respond to listening to understand.',
  },
  {
    id: 7,
    question: 'What role does silence play in active listening?',
    options: [
      'Silence is a failure of communication and should be filled immediately',
      'Silence creates discomfort that forces the other person to concede their point',
      'Silence gives the speaker space to think, process emotions, and share more deeply than they would if you filled every pause',
      'Silence is only useful in formal mediation settings, not in everyday conversations',
    ],
    correctAnswer: 2,
    explanation:
      'Silence is one of the most powerful and underused tools in active listening. When you resist the urge to fill every pause, you give the speaker space to gather their thoughts, process their emotions, and often share deeper insights that they would not have reached if you had interrupted. Many of the most important things people say come after a pause — the first statement is often the surface-level version, and the deeper truth emerges in the silence that follows. Learning to be comfortable with brief silences transforms the quality of your listening.',
  },
  {
    id: 8,
    question: 'What does "validation without agreement" mean in the context of active listening?',
    options: [
      'Telling someone they are right even when you believe they are wrong',
      "Ignoring the other person's feelings to remain neutral",
      "Acknowledging and respecting someone's emotional experience without necessarily agreeing with their position or conclusion",
      'Validating only the facts and dismissing the emotions as irrelevant',
    ],
    correctAnswer: 2,
    explanation:
      "Validation without agreement means acknowledging that someone's feelings are real and understandable, even if you do not agree with their interpretation of events or their proposed solution. For example, you might say, \"I can see you're genuinely frustrated about the delay, and I understand why that's upsetting\" without agreeing that the delay was your fault. This distinction is crucial in conflict resolution because people need to feel heard before they can engage constructively. If they believe their feelings are being dismissed, they will escalate rather than collaborate.",
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  "Describe the five levels of Covey's listening ladder and identify which level you typically operate at",
  'Apply empathic listening techniques including paraphrasing, reflecting feelings, and summarising',
  'Recognise the role of body language, silence, and physical space in effective listening',
  'Distinguish between validation and agreement, and use validation to de-escalate conflict',
  'Identify common listening failures such as interrupting, preparing rebuttals, and jumping to solutions',
  'Use reflective listening techniques in trade-specific scenarios to build trust and understanding',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CRModule2Section1() {
  useSEO({
    title: 'Active Listening & Empathy | Conflict Resolution Module 2.1',
    description:
      'The listening ladder, empathic listening, reflective techniques, body language, validation without agreement, and common listening failures.',
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
            <Ear className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 1
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Active Listening &amp; Empathy
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The single most powerful conflict resolution skill is also the one most people think
            they already have: the ability to truly listen.
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
                  Most people listen at Covey&rsquo;s selective level &mdash; filtering for what
                  interests them and missing the rest
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Empathic listening means understanding the speaker&rsquo;s frame of reference, not
                  just their words
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Silence, body language, and physical space all communicate more than words alone
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Validation is not agreement &mdash; you can acknowledge feelings without conceding
                  your position
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
                  Poor listening is the number one cause of escalation in workplace conflicts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  People who feel heard become dramatically more willing to listen in return
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Construction disputes often escalate because both parties are speaking and neither
                  is listening
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Active listening builds the trust needed for every other conflict resolution
                  technique in this course
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
        {/*  SECTION 01 — What Active Listening Actually Means            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              What Active Listening Actually Means
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Active listening is a term coined by psychologists Carl Rogers and Richard Farson in
              1957, and it describes something far more demanding than simply hearing what someone
              says. Active listening means fully concentrating on the speaker, understanding their
              message, responding thoughtfully, and retaining what was said. It sounds
              straightforward, but in practice it is one of the most difficult communication skills
              to master &mdash; because it requires you to temporarily set aside your own thoughts,
              opinions, and desire to reply.
            </p>

            <p className="text-white text-base leading-relaxed">
              Consider how most people actually listen. They hear the first few words of a sentence
              and immediately begin formulating their response. They filter for information that
              confirms what they already believe and discard the rest. They wait for a pause &mdash;
              not to understand, but to interject. They listen with the intent to reply, not with
              the intent to understand. In everyday low-stakes conversation, this is adequate. But
              in conflict &mdash; when emotions are high, when someone feels wronged, when money or
              professional reputation is at stake &mdash; this superficial listening is actively
              harmful. It makes the other person feel dismissed, which escalates the conflict rather
              than resolving it.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Hearing vs Listening vs Active Listening
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Hearing</strong> is a passive physiological process &mdash; sound waves
                enter your ear and your brain registers them. You hear the radio in the van without
                paying any attention to it. <strong>Listening</strong> involves some degree of
                attention &mdash; you are processing the words and deriving basic meaning.{' '}
                <strong>Active listening</strong> goes further still: you are fully engaged with the
                speaker, attending not only to their words but to their tone, body language, and
                emotional state. You are checking your understanding, asking clarifying questions,
                and resisting the urge to interrupt or judge.
              </p>
              <p className="text-white text-sm leading-relaxed">
                On a construction site, the difference matters enormously. When a client is
                explaining their concerns about cost, hearing means you catch the numbers. Listening
                means you understand the complaint. Active listening means you understand that the
                client is not just worried about money &mdash; they are feeling anxious about losing
                control of a project that is disrupting their home and family. That deeper
                understanding opens up entirely different responses.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">Construction Example</p>
              <p className="text-white text-sm leading-relaxed">
                You are on a domestic rewire. The homeowner stops you mid-morning and says, &ldquo;I
                didn&rsquo;t think there&rsquo;d be this much mess everywhere.&rdquo; If you are
                merely hearing, you register a noise and carry on working. If you are listening, you
                hear a complaint about mess and perhaps feel defensive. If you are actively
                listening, you hear the words, notice the worried tone, and realise that the
                homeowner is not actually complaining about dust &mdash; they are anxious about how
                their home has been disrupted and want reassurance that things will be put right.
                Your response shifts from &ldquo;We&rsquo;ll clean up at the end&rdquo; to &ldquo;I
                can see this is more disruptive than you expected. Let me walk you through what
                we&rsquo;ll do each day, so you know what to expect.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — The Listening Ladder                           */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Listening Ladder</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In his 1989 book <em>The 7 Habits of Highly Effective People</em>, Stephen Covey
              described five levels of listening, which can be thought of as a ladder from the least
              engaged to the most engaged. Understanding where you typically sit on this ladder
              &mdash; honestly, not optimistically &mdash; is the first step towards improving your
              listening skills.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Covey&rsquo;s Five Levels of Listening
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 1: Ignoring</p>
                  <p className="text-white text-xs leading-relaxed">
                    Not listening at all. You are physically present but mentally absent. You are
                    scrolling your phone, thinking about the next task, or simply not paying any
                    attention. The speaker might as well be talking to a wall. On site, this often
                    looks like someone continuing to work without looking up when spoken to.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 2: Pretend Listening</p>
                  <p className="text-white text-xs leading-relaxed">
                    You are giving the appearance of listening &mdash; nodding, making
                    &ldquo;mm-hmm&rdquo; sounds, maintaining occasional eye contact &mdash; but you
                    are not processing what is being said. You are on autopilot. The speaker usually
                    senses this eventually, which erodes trust. On site, this is the colleague who
                    says &ldquo;yeah, yeah, yeah&rdquo; to everything and then asks the same
                    question ten minutes later.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Level 3: Selective Listening
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    You are listening, but only to the parts that interest you or confirm what you
                    already think. You filter out inconvenient information, emotional content, and
                    anything that does not align with your own perspective. Covey argued that this
                    is where most everyday conversation happens. On site, selective listening is the
                    electrician who hears the client say &ldquo;we need this done by Friday&rdquo;
                    but misses the underlying anxiety about the family moving in over the weekend.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Level 4: Attentive Listening
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    You are genuinely paying attention to the words being spoken. You are focused,
                    you are not multitasking, and you are processing the information accurately.
                    This is good listening in the conventional sense, and most people would consider
                    this sufficient. But Covey argued there is one more level that transforms the
                    quality of communication entirely.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 5: Empathic Listening</p>
                  <p className="text-white text-xs leading-relaxed">
                    The highest level. You are not just hearing words or even paying close attention
                    to them &mdash; you are seeking to understand the other person&rsquo;s frame of
                    reference. You are listening for feelings, meanings, and the perspective behind
                    the words. You are, as Covey put it, listening with the intent to understand
                    rather than the intent to reply. This is the level that resolves conflicts,
                    builds deep trust, and makes people feel genuinely heard.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Where Do Most Trade Conversations Happen?
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Be honest with yourself. Most conversations on a construction site &mdash; between
                trades, with clients, with site managers &mdash; happen at the selective level.
                There is nothing malicious about this; people are busy, distracted, and focused on
                getting their work done. But selective listening is inadequate for conflict
                resolution. When someone has a complaint, a concern, or a grievance, selective
                listening filters out the emotional content and responds only to the facts, leaving
                the person feeling unheard and unvalued.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Moving from selective to empathic listening does not require hours of practice or
                formal training. It requires a deliberate shift in intention: instead of listening
                for what you need to know, you listen for what the other person needs you to
                understand. That one shift changes everything.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Empathic Listening                             */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Empathic Listening</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Covey&rsquo;s Habit 5 &mdash; &ldquo;Seek First to Understand, Then to Be
              Understood&rdquo; &mdash; is built on the principle that most communication failures
              occur because people are so eager to make their own point that they never truly grasp
              the other person&rsquo;s perspective. Empathic listening is the practical application
              of this habit. It means stepping into the other person&rsquo;s shoes, seeing the
              situation through their eyes, and understanding not just what they are saying but why
              they are saying it and how they feel about it.
            </p>

            <p className="text-white text-base leading-relaxed">
              Empathic listening uses three core reflective techniques: paraphrasing, reflecting
              feelings, and summarising. Each technique serves a different purpose, and skilled
              listeners move between them naturally depending on what the situation requires.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Technique 1: Paraphrasing</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Paraphrasing means restating what the speaker has said in your own words. It
                confirms that you have understood the content of their message and gives them the
                opportunity to correct any misunderstanding. Crucially, paraphrasing is not
                parroting &mdash; you should not simply repeat their words back verbatim, which can
                feel mechanical and patronising. Instead, distil the essence of what they said into
                a brief, natural statement.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Example:</strong> A client says, &ldquo;We asked for the sockets in the
                kitchen to be at worktop height, but these are all at skirting level.&rdquo;
                Paraphrasing: &ldquo;So the kitchen sockets have been installed lower than you
                specified &mdash; you wanted them at worktop height.&rdquo; This confirms the
                factual understanding and shows the client that you were paying attention.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Ear className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Technique 2: Reflecting Feelings
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Reflecting feelings means identifying and naming the emotion you detect behind the
                speaker&rsquo;s words. This is more powerful than paraphrasing because it shows you
                are listening not just to the content but to the person. It demonstrates that you
                understand how they feel, not just what happened.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Example:</strong> Same situation &mdash; the client says, &ldquo;We asked
                for the sockets at worktop height, but these are all at skirting level.&rdquo;
                Reflecting feelings: &ldquo;I can hear you&rsquo;re frustrated &mdash; you
                specifically asked for those sockets higher and it feels like that request was
                ignored.&rdquo; Notice how this goes deeper. It does not just confirm the facts; it
                names the feeling (frustrated) and the underlying concern (feeling ignored).
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Technique 3: Summarising</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Summarising pulls together several points into a concise overview. It is especially
                useful after someone has been speaking for a while, or when a conversation has
                covered multiple issues. A good summary captures both the factual content and the
                emotional tone of what has been said.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Example:</strong> After a long discussion with a client about multiple
                snags, you might say: &ldquo;So from what you&rsquo;ve told me, the main issues are
                the socket heights in the kitchen, the dimmer switch in the lounge that isn&rsquo;t
                working smoothly, and the fact that nobody told you about the extra work needed in
                the utility room. And it sounds like the biggest frustration is the lack of
                communication along the way &mdash; you feel like you&rsquo;ve been kept in the
                dark.&rdquo;
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: Client Complaining About Timeline
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                A homeowner says: &ldquo;You said this would take two weeks and we&rsquo;re now into
                week four. I&rsquo;ve had to take time off work, the kids are sleeping in the
                lounge, and I still don&rsquo;t know when it will be finished.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Poor response (selective listening):</strong> &ldquo;The delay was because
                of the asbestos we found in the ceiling. That wasn&rsquo;t our fault.&rdquo; This
                responds to the factual content but completely ignores the emotional reality of the
                situation.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Empathic response:</strong> &ldquo;I hear you. Four weeks is a lot longer
                than you planned for, and I can see that it&rsquo;s disrupting your whole family
                &mdash; taking time off work, the kids sleeping in the lounge. That sounds genuinely
                stressful. Let me give you an honest update on where we are and when I expect us to
                finish.&rdquo; This paraphrases the key facts, reflects the feelings (stress,
                disruption), and then moves towards a practical resolution. The client feels heard
                before being given information, which means they are far more likely to receive that
                information calmly.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — The Power of Silence and Body Language         */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              The Power of Silence and Body Language
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Communication researchers estimate that the majority of face-to-face communication is
              nonverbal. While the exact percentages are debated, the principle is clear: your body
              speaks louder than your words. In a conflict situation, this means that your posture,
              facial expression, eye contact, and physical positioning are communicating constantly
              &mdash; either reinforcing your words or contradicting them. You can say
              &ldquo;I&rsquo;m listening&rdquo; while crossing your arms, checking your phone, and
              leaning away, but the other person will believe your body, not your words.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Open vs Closed Body Language</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Open body language</strong> signals receptiveness and respect. It includes:
                facing the speaker squarely, maintaining comfortable eye contact (without staring),
                keeping your arms uncrossed and your hands visible, leaning slightly forward to show
                engagement, and nodding occasionally to indicate understanding. Open body language
                says, &ldquo;I am present and I am taking you seriously.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Closed body language</strong> signals defensiveness, disinterest, or
                hostility. It includes: turning away, crossing your arms, avoiding eye contact,
                looking at your phone or watch, standing with hands on hips (which can appear
                confrontational), and leaning back. In a conflict conversation, closed body language
                escalates tension because the other person reads it as dismissal or contempt,
                regardless of what you are actually thinking.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <HandMetal className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Power of Silence</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Most people are deeply uncomfortable with silence in conversation. The moment a
                pause occurs, they rush to fill it &mdash; with a solution, an opinion, a
                deflection, or a change of subject. But silence is one of the most powerful tools in
                active listening. When you allow a pause after someone has spoken, you give them
                space to think, to process their emotions, and often to share something deeper than
                their initial statement.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Many of the most important things people say come after a pause. The first statement
                is often the surface-level version &mdash; the socially acceptable complaint. The
                deeper truth &mdash; the real concern, the underlying fear, the genuine emotion
                &mdash; often emerges in the silence that follows, if you give it space. Rushing to
                fill that silence cuts off the deeper conversation before it can begin.
              </p>
              <p className="text-white text-sm leading-relaxed">
                On a construction site, this might mean that when a client finishes explaining a
                complaint, you resist the urge to immediately defend or explain. Instead, you pause
                for two or three seconds, maintain eye contact, and wait. Often, the client will
                then add the real concern &mdash; &ldquo;I suppose what I&rsquo;m really worried
                about is...&rdquo; &mdash; which is the information you actually need to resolve the
                situation.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Physical Distance in Conflict
              </p>
              <p className="text-white text-sm leading-relaxed">
                Physical proximity matters enormously in conflict situations. Standing too close can
                feel threatening and escalate aggression. Standing too far away can feel dismissive.
                The ideal distance for a difficult conversation is roughly arm&rsquo;s length
                &mdash; close enough to signal engagement but far enough to respect personal space.
                On a construction site, be aware that having a difficult conversation in a corridor,
                stairwell, or confined area can inadvertently increase tension because neither
                person can easily move away. Whenever possible, choose an open space with room to
                move. Also consider mirroring &mdash; subtly matching the other person&rsquo;s
                posture and pace &mdash; which research shows builds rapport unconsciously.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Validation Is Not Agreement                    */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Validation Is Not Agreement</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              One of the biggest barriers to empathic listening is the fear that if you acknowledge
              someone&rsquo;s feelings, you are agreeing with their position. This fear is
              especially strong in conflict situations, where conceding any ground feels risky. But
              validation and agreement are fundamentally different things, and understanding this
              distinction is crucial for effective conflict resolution.
            </p>

            <p className="text-white text-base leading-relaxed">
              <strong>Validation</strong> means acknowledging that someone&rsquo;s feelings are
              real, understandable, and legitimate given their perspective. It says, &ldquo;I can
              see why you feel that way.&rdquo; <strong>Agreement</strong> means accepting that
              their interpretation of events is correct and their proposed solution is right. It
              says, &ldquo;You are right and I am wrong.&rdquo; You can validate without agreeing.
              In fact, validation often makes agreement unnecessary, because the person feels heard
              and becomes more open to alternative perspectives.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Validation Phrases That Do Not Concede Your Position
              </h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;I can see why you&rsquo;d feel frustrated about that.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;That sounds like a really stressful situation.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;I understand that this matters to you.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;If I were in your position, I&rsquo;d probably feel the same way.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;Thank you for telling me how you feel about this &mdash; I want to
                    understand.&rdquo;
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Common Listening Failures</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Active listening is as much about what you <em>stop</em> doing as what you start
                doing. Here are the most common listening failures that undermine conflict
                resolution:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Interrupting</strong> &mdash; cutting the speaker off before they
                    finish. This signals that you value your own thoughts more than theirs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Preparing your rebuttal</strong> &mdash; composing your response while
                    the other person is still talking. You cannot fully listen and plan your reply
                    at the same time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Dismissing feelings</strong> &mdash; telling someone &ldquo;Don&rsquo;t
                    worry about it&rdquo; or &ldquo;You&rsquo;re overreacting&rdquo;. This
                    invalidates their emotional experience and escalates the conflict.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Jumping to solutions</strong> &mdash; offering fixes before the person
                    has finished explaining the problem. People need to feel heard before they can
                    accept help.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>One-upping</strong> &mdash; responding to someone&rsquo;s experience
                    with your own bigger or worse experience (&ldquo;You think that&rsquo;s bad? Let
                    me tell you about my last job...&rdquo;). This redirects attention away from the
                    speaker.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: Validation Without Agreement
              </p>
              <p className="text-white text-sm leading-relaxed">
                A subcontractor says: &ldquo;You haven&rsquo;t paid my last invoice and it&rsquo;s
                been six weeks. This always happens with your company. You just don&rsquo;t respect
                the subbies.&rdquo; A defensive response (&ldquo;That&rsquo;s not true &mdash; we
                always pay eventually&rdquo;) will escalate the conflict. A validating response
                acknowledges the feeling without accepting the characterisation: &ldquo;I can hear
                you&rsquo;re frustrated about the late payment, and I understand why that&rsquo;s a
                problem &mdash; cash flow is everything when you&rsquo;re running your own business.
                Let me look into where that invoice is right now.&rdquo; You have validated the
                frustration and the impact without agreeing that your company &ldquo;doesn&rsquo;t
                respect subbies.&rdquo;
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
                    <strong>Active listening</strong> &mdash; fully concentrating, understanding,
                    responding, and remembering, as opposed to merely hearing or waiting for your
                    turn to speak.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The listening ladder</strong> &mdash; Covey&rsquo;s five levels from
                    ignoring to empathic listening, with most trade conversations happening at the
                    selective level.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Empathic listening techniques</strong> &mdash; paraphrasing (restating
                    content), reflecting feelings (naming the emotion), and summarising (pulling
                    together multiple points).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Body language and silence</strong> &mdash; open vs closed posture, the
                    power of pausing, mirroring, and the importance of physical distance in
                    conflict.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Validation vs agreement</strong> &mdash; acknowledging someone&rsquo;s
                    feelings without conceding your position, and common listening failures that
                    undermine conflict resolution.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Ear className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Active listening is the foundation of every other conflict resolution skill. You
                    cannot resolve a conflict you do not understand, and you cannot understand a
                    conflict you have not truly listened to. By moving from selective to empathic
                    listening &mdash; and by using paraphrasing, reflecting feelings, and validation
                    &mdash; you create the conditions for productive dialogue, even in the most
                    heated situations.
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
                    <strong>This week:</strong> in one conversation per day, consciously practise
                    paraphrasing what the other person has said before you give your own response.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This fortnight:</strong> notice your body language during a difficult
                    conversation. Are your arms crossed? Are you making eye contact? Adjust one
                    thing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> identify one common listening failure you recognise
                    in yourself (interrupting, preparing rebuttals, jumping to solutions) and focus
                    on reducing it.
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
            <Link to="../cr-module-2-section-2">
              Next: Nonviolent Communication
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
