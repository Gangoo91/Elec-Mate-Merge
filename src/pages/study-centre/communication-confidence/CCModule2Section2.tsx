import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Headphones,
  Users,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Target,
  Ear,
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
      'In Gerard Egan\u2019s SOLER model, what does the "L" stand for, and why is it important in a client consultation?',
    options: [
      'Listen \u2014 because you should always be hearing the client\u2019s words',
      'Lean forward \u2014 because it signals engagement and attentiveness to the speaker',
      'Look away \u2014 because direct eye contact can feel intimidating',
      'Lead \u2014 because the listener should always direct the conversation',
    ],
    correctIndex: 1,
    explanation:
      'The "L" in SOLER stands for Lean forward slightly. This body language signal communicates genuine interest and engagement to the person speaking. In a client consultation on a domestic rewire, for example, leaning forward while the homeowner describes their concerns shows that you are taking their requirements seriously \u2014 which builds trust and encourages them to share important details about how they use the property.',
  },
  {
    question:
      'Julian Treasure\u2019s RASA model includes four stages of conscious listening. What is the correct order?',
    options: [
      'Respond, Analyse, Summarise, Ask',
      'Receive, Appreciate, Summarise, Ask',
      'Record, Acknowledge, State, Agree',
      'React, Assess, Sort, Arrange',
    ],
    correctIndex: 1,
    explanation:
      'RASA stands for Receive (pay full attention to the incoming sound and words), Appreciate (show small signals that you are listening \u2014 nods, "mm-hmm", brief affirmations), Summarise (reflect back the key points in your own words), and Ask (pose follow-up questions to deepen understanding). This sequence ensures the speaker feels fully heard before you move into problem-solving.',
  },
  {
    question:
      'What is the key difference between reflective listening and simply repeating what someone said?',
    options: [
      'There is no difference \u2014 both involve saying the same words back',
      'Reflective listening captures the underlying meaning or emotion, not just the surface words',
      'Reflective listening requires you to disagree with the speaker to test their position',
      'Repeating is more effective because it proves you heard every word exactly',
    ],
    correctIndex: 1,
    explanation:
      'Reflective listening goes beyond parroting the speaker\u2019s words. It involves identifying the underlying meaning, feeling, or concern behind what was said and reflecting that back. For example, if a client says "I just don\u2019t want any mess everywhere," a reflective response would be: "It sounds like keeping disruption to a minimum is really important to you." This shows you understood the concern, not just the words.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is the SOLER model realistic on a noisy construction site?',
    answer:
      'Yes, but it requires adaptation. You will not always be sitting down, and you may be wearing PPE that obscures facial expressions. The principle behind SOLER is about showing attentiveness through your body language \u2014 and that principle applies regardless of the environment. On site, this means stopping what you are doing, putting down your tools, removing headphones or ear defenders, turning to face the person, and giving them your full attention. Even in a loud environment, the physical signals of engagement communicate respect and readiness to listen.',
  },
  {
    question: 'How do I use reflective listening without sounding patronising?',
    answer:
      'The key is to reflect meaning, not just words. If you simply repeat what someone said word-for-word, it can feel mechanical or condescending. Instead, capture the essence of their message in your own words, focusing on the underlying concern or emotion. Use natural phrases like "So what you\u2019re saying is\u2026", "It sounds like\u2026", or "If I\u2019ve understood correctly\u2026". The tone matters as much as the words \u2014 genuine curiosity and respect make reflective listening feel collaborative rather than performative.',
  },
  {
    question: 'When should I use open questions versus closed questions on site?',
    answer:
      'Use closed questions when you need specific, factual information quickly \u2014 "Is the supply single-phase or three-phase?", "Has the isolation been confirmed?", "Do you want the socket on the left or right wall?" Use open questions when you need to understand the full picture, uncover concerns, or build rapport \u2014 "What are you hoping to achieve with this project?", "How do you use this room day-to-day?", "What matters most to you about this installation?" A good site survey typically starts broad with open questions and then narrows down with closed questions as the detail emerges.',
  },
  {
    question: 'Can active listening really make a difference to my work as an electrician?',
    answer:
      'Active listening directly affects the quality and profitability of your work. Misunderstanding a client\u2019s requirements leads to rework, disputes, and lost profit. Missing a key detail during a site survey can result in incorrect material orders or design errors. Failing to listen to a colleague\u2019s safety concern can create genuine risk. Research by the Chartered Institute of Building found that poor communication is the single largest cause of construction disputes in the UK. Electricians who listen well get fewer callbacks, build stronger client relationships, win more repeat business, and create safer working environments.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What does SOLER stand for in Gerard Egan\u2019s active listening model?',
    options: [
      'Sit squarely, Open posture, Lean forward, Eye contact, Relax',
      'Stand still, Observe, Listen, Evaluate, Respond',
      'Smile, Open up, Look around, Explain, Repeat',
      'Sit down, Offer advice, Lead the discussion, End clearly, Review',
    ],
    correctAnswer: 0,
    explanation:
      'SOLER stands for Sit squarely (face the person), Open posture (uncrossed arms and legs), Lean forward (show engagement), Eye contact (maintain appropriate gaze), and Relax (appear calm and natural). Egan developed this framework to describe the physical behaviours that communicate attentive listening.',
  },
  {
    id: 2,
    question: 'In Julian Treasure\u2019s RASA model, what does the "A" in "Appreciate" refer to?',
    options: [
      'Agreeing with everything the speaker says',
      'Analysing the speaker\u2019s argument for logical errors',
      'Giving small signals that you are listening \u2014 nods, "mm-hmm", brief verbal cues',
      'Applauding the speaker\u2019s contribution at the end',
    ],
    correctAnswer: 2,
    explanation:
      'Appreciate in the RASA model means offering small, ongoing signals that you are actively listening. These include nodding, making brief sounds like "mm-hmm" or "right", and maintaining eye contact. These micro-responses encourage the speaker to continue and show that their words are being received.',
  },
  {
    id: 3,
    question:
      'A homeowner tells you: "I just want it done properly this time \u2014 the last electrician left a real mess." Which reflective listening response is most effective?',
    options: [
      '"Don\u2019t worry, I\u2019m much better than whoever did it before."',
      '"It sounds like you had a bad experience and quality workmanship is really important to you."',
      '"What exactly did the last electrician do wrong?"',
      '"All electricians work differently \u2014 you can\u2019t compare."',
    ],
    correctAnswer: 1,
    explanation:
      'The second option reflects back both the emotion (frustration from a bad experience) and the underlying need (quality workmanship). This validates the client\u2019s concern without criticising the previous electrician, and signals that you have understood what matters to them. The other responses either dismiss the concern, compete with the previous electrician, or deflect.',
  },
  {
    id: 4,
    question: 'What is the primary difference between paraphrasing and summarising?',
    options: [
      'There is no difference \u2014 they are the same technique',
      'Paraphrasing restates a specific point in your own words; summarising pulls together multiple points into a concise overview',
      'Summarising is longer and more detailed than paraphrasing',
      'Paraphrasing is used at the start of a conversation; summarising is used in the middle',
    ],
    correctAnswer: 1,
    explanation:
      'Paraphrasing focuses on restating a single idea or statement in your own words to confirm understanding. Summarising covers a broader scope \u2014 it pulls together several points from a longer conversation into a concise overview. In a site survey, you might paraphrase individual client requests as they arise, then summarise the full scope at the end to confirm alignment.',
  },
  {
    id: 5,
    question: 'Which of the following is an open question?',
    options: [
      '"Is the existing wiring in good condition?"',
      '"Do you want a consumer unit upgrade?"',
      '"How do you use this space on a typical day?"',
      '"Is the supply single-phase?"',
    ],
    correctAnswer: 2,
    explanation:
      'Open questions begin with words like "how", "what", "why", "describe", or "tell me about" and cannot be answered with a simple yes or no. "How do you use this space on a typical day?" invites the client to share detailed information about their needs, habits, and priorities \u2014 all of which inform your electrical design. The other options are closed questions that yield only yes/no answers.',
  },
  {
    id: 6,
    question:
      'During a site survey, a client says: "We mostly use this room in the evenings, and the lighting is never bright enough." What is the best active listening response before proposing a solution?',
    options: [
      '"I\u2019ll put in more downlights \u2014 that will sort it."',
      '"That\u2019s a common problem in older properties."',
      '"So this room is mainly used in the evenings and you need significantly better lighting levels. Can you tell me more about what you use the room for?"',
      '"Have you tried changing the bulbs to LEDs?"',
    ],
    correctAnswer: 2,
    explanation:
      'The third option demonstrates the full active listening cycle: it paraphrases the client\u2019s statement (evening use, insufficient lighting), then asks an open follow-up question to gather more detail before jumping to solutions. The other responses skip the listening phase and leap straight to assumptions or generic fixes.',
  },
  {
    id: 7,
    question: 'Why is summarising particularly important at the end of a client consultation?',
    options: [
      'It proves that you were paying attention and makes you look professional',
      'It creates a shared record of what was agreed, reduces misunderstandings, and gives the client a chance to correct anything you missed',
      'It allows you to add extra work to the scope without the client noticing',
      'It is only a formality and does not affect the outcome',
    ],
    correctAnswer: 1,
    explanation:
      'Summarising at the end of a consultation creates a verbal contract \u2014 a shared understanding of what was discussed, what was agreed, and what happens next. It gives the client the opportunity to correct misunderstandings or add details they forgot. This single habit prevents a significant proportion of the disputes and callbacks that electricians experience.',
  },
  {
    id: 8,
    question:
      'In the SOLER model, why does Egan recommend an "open posture" during active listening?',
    options: [
      'Because crossed arms are uncomfortable for long periods',
      'Because an open posture signals receptiveness, approachability, and a willingness to hear what the speaker has to say',
      'Because it is a legal requirement during professional consultations',
      'Because open posture makes you appear physically larger and more authoritative',
    ],
    correctAnswer: 1,
    explanation:
      'An open posture \u2014 uncrossed arms and legs, body oriented towards the speaker \u2014 signals that you are receptive and approachable. Crossed arms or turned-away body language can communicate defensiveness, impatience, or disinterest, even if you are listening intently. Egan\u2019s research showed that body language communicates as much as (or more than) the words you use.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Apply Gerard Egan\u2019s SOLER model to demonstrate attentive body language during client consultations and site conversations',
  'Use Julian Treasure\u2019s RASA framework to structure conscious, active listening in professional interactions',
  'Demonstrate reflective listening, paraphrasing, and summarising techniques in construction scenarios',
  'Distinguish between open and closed questions and deploy each type appropriately during site surveys',
  'Conduct a structured client consultation using active listening to capture accurate requirements',
  'Adapt active listening techniques for challenging site conditions including noise, time pressure, and PPE constraints',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CCModule2Section2() {
  useSEO({
    title: 'Active Listening Techniques | Module 2: Listening & Understanding Others',
    description:
      'Gerard Egan SOLER model, Julian Treasure RASA model, reflective listening, paraphrasing, summarising, open vs closed questions, and construction client consultation techniques.',
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
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listening &amp; Understanding Others
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Headphones className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 2
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Active Listening Techniques
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Structured frameworks for conscious listening, reflective techniques that build trust
            and accuracy, and the question types that unlock the information you need on site.
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
                  Egan&rsquo;s SOLER model provides five physical behaviours that signal attentive
                  listening
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Treasure&rsquo;s RASA framework structures conscious listening: Receive,
                  Appreciate, Summarise, Ask
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Reflective listening captures meaning, not just words &mdash; building trust and
                  reducing misunderstandings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Open questions gather rich detail; closed questions confirm specific facts
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
                  Poor listening causes rework, disputes, and lost profit &mdash; the CIOB
                  identifies communication as the top cause of construction disputes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Accurate site surveys depend on hearing what clients actually need, not what you
                  assume they need
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Active listening builds client confidence and leads to repeat business and
                  referrals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  On site, listening to safety concerns from colleagues can prevent serious
                  incidents
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
        {/*  SECTION 01 — Gerard Egan's SOLER Model                      */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Gerard Egan&rsquo;s SOLER Model</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In the 1970s, psychologist Gerard Egan developed the SOLER model as part of his
              influential work on counselling skills. SOLER describes five physical behaviours that
              communicate attentive listening to the person speaking. Although originally designed
              for therapeutic settings, SOLER has been widely adopted in healthcare, education, and
              professional communication training because the underlying principle is universal:
              your body language speaks louder than your words.
            </p>

            <p className="text-white text-base leading-relaxed">
              For electricians, SOLER is directly applicable to client consultations, site surveys,
              team briefings, and any conversation where you need someone to trust that you are
              genuinely listening to them.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Five SOLER Behaviours</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">S</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Sit Squarely</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Face the person directly. Position your body so that you are oriented towards
                      them, not turned away or angled to the side. This signals that they have your
                      full attention. On a construction site, this means stopping what you are doing
                      and turning to face the speaker rather than continuing to work while they
                      talk.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Site example:</strong> A homeowner approaches you during a kitchen
                      rewire to discuss their concerns about socket placement. You put down your
                      tools, step away from the wall, and turn to face them directly. This small
                      action communicates: &ldquo;You have my full attention.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">O</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Open Posture</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Keep your arms and legs uncrossed. An open posture signals receptiveness and
                      approachability. Crossed arms, even when you are genuinely listening, can
                      unconsciously communicate defensiveness, impatience, or disinterest.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Site example:</strong> During a site induction briefing, standing with
                      your arms at your sides or holding a notepad &mdash; rather than crossing your
                      arms &mdash; signals that you are open to what is being communicated, not
                      waiting for it to finish.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">L</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Lean Forward</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      A slight forward lean communicates engagement and interest. It physically
                      reduces the distance between you and the speaker, signalling that you are
                      drawn into the conversation rather than pulling away from it. The lean should
                      be subtle &mdash; not so pronounced that it invades the speaker&rsquo;s
                      personal space.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Site example:</strong> While a client explains their lighting
                      preferences during a site survey, leaning slightly forward as they describe
                      each room shows that you are genuinely interested in understanding their needs
                      &mdash; not just ticking boxes on a form.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">E</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Eye Contact</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Maintain appropriate eye contact. This does not mean staring unblinkingly
                      &mdash; that would feel uncomfortable for the speaker. It means looking at
                      them while they speak, with natural breaks to look at notes, the surroundings,
                      or wherever your gaze would naturally fall. The key is to ensure the speaker
                      knows you are looking at them, not at your phone, your van, or the next job.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Site example:</strong> While a project manager explains a change to
                      the specification, maintaining eye contact &mdash; rather than scrolling
                      through drawings on your tablet &mdash; shows that you are processing their
                      words, not mentally preparing your response.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">R</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Relax</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Appear calm and natural. If you look tense, fidgety, or rushed, the speaker
                      will feel that they are imposing on you and may cut their message short
                      &mdash; leaving out important details. A relaxed posture says: &ldquo;Take
                      your time. I am here to listen.&rdquo;
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Site example:</strong> A nervous homeowner is describing issues with
                      their fuse board. If you appear relaxed and unhurried, they are more likely to
                      share the full picture &mdash; including details like &ldquo;the lights
                      flicker when the shower is on&rdquo; or &ldquo;there is a burning smell near
                      the meter cupboard&rdquo; &mdash; that could be crucial for your assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  SOLER in a Domestic Site Survey
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Imagine you arrive at a property to quote for a full rewire. The homeowner meets you
                at the door, clearly anxious about the cost and disruption. Here is how SOLER
                applies to the first five minutes:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>S:</strong> You stand or sit facing the homeowner, not angled towards
                    the door or looking around the house yet
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>O:</strong> Arms at your sides or holding a notepad &mdash; not crossed,
                    not hands in pockets
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>L:</strong> Slight forward lean when they start explaining their
                    concerns, signalling genuine interest
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>E:</strong> Eye contact as they speak, breaking naturally to glance at
                    the areas they are describing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>R:</strong> Relaxed, unhurried manner &mdash; no glancing at your watch,
                    no rushing them through their concerns
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                This five-minute investment in body language builds a foundation of trust that makes
                the rest of the survey more productive. The homeowner feels heard and respected,
                which means they are more likely to share the full picture of their needs &mdash;
                and more likely to choose you for the job.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Julian Treasure's RASA Model                    */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Julian Treasure&rsquo;s RASA Model</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Julian Treasure is a sound and communication expert whose TED talks on listening have
              been viewed over 100 million times. His RASA model (named after the Sanskrit word for
              &ldquo;juice&rdquo; or &ldquo;essence&rdquo;) provides a four-stage framework for
              conscious listening that complements SOLER by focusing on what you do mentally and
              verbally, not just physically.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Four RASA Stages</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">R</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Receive</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Pay full, undivided attention to the person speaking. This means more than
                      just hearing the words &mdash; it means actively receiving the full message,
                      including tone, pace, emphasis, and emotional content. Put your phone face
                      down. Stop your internal monologue. Be present with the speaker.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Construction example:</strong> During a toolbox talk, Receive means
                      putting down your tools, removing one earphone, and genuinely focusing on what
                      the site supervisor is saying &mdash; not mentally planning the next cable run
                      while nodding along.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Appreciate</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Give small, ongoing signals that you are listening. These micro-responses
                      &mdash; nodding, brief sounds like &ldquo;mm-hmm&rdquo;, &ldquo;right&rdquo;,
                      &ldquo;I see&rdquo; &mdash; serve two purposes. They reassure the speaker that
                      their message is being received, and they keep you engaged as a listener (it
                      is harder to zone out when you are actively responding).
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Construction example:</strong> While a client describes their wish
                      list for a new kitchen installation, small nods and brief verbal cues
                      (&ldquo;Got it&rdquo;, &ldquo;Makes sense&rdquo;, &ldquo;OK&rdquo;) encourage
                      them to keep sharing details. Silence, by contrast, often makes clients
                      second-guess whether their requests are reasonable.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">S</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Summarise</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Reflect back the key points of what the speaker has said, in your own words.
                      This is where the real value of active listening becomes visible. Summarising
                      proves that you have not only heard but understood, and it gives the speaker
                      the opportunity to correct any misunderstandings before they become problems.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Construction example:</strong> After a client has described their
                      requirements for an extension, you summarise: &ldquo;So from what you have
                      described, you need a 32A radial for the workshop area, double sockets on
                      every wall, external LED lighting front and back, and you want the consumer
                      unit relocating to the utility room. Have I captured everything?&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex-shrink-0">
                    <span className="text-rose-400 text-xs font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Ask</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      Pose thoughtful follow-up questions to deepen your understanding. This stage
                      transforms a monologue into a dialogue and ensures you uncover details that
                      the speaker might not have thought to mention. The best questions are
                      open-ended: they invite the speaker to expand, clarify, or go deeper.
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-2">
                      <strong>Construction example:</strong> After summarising, you ask: &ldquo;You
                      mentioned the workshop area &mdash; what kind of equipment will you be running
                      in there? That will help me size the circuit correctly.&rdquo; This question
                      shows you were listening and opens up critical technical detail.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  SOLER + RASA: A Complete Listening System
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                SOLER and RASA are complementary, not competing, models. SOLER governs your
                <strong> physical</strong> listening behaviours &mdash; what your body does. RASA
                governs your <strong>mental and verbal</strong> listening behaviours &mdash; what
                your mind does and what you say. Together, they form a complete active listening
                system:
              </p>
              <ul className="text-white text-sm space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Body:</strong> Face the speaker, open posture, lean in, eye contact,
                    relaxed manner (SOLER)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Mind:</strong> Receive their full message, appreciate with
                    micro-responses, summarise the key points, ask to deepen understanding (RASA)
                  </span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                When you apply both frameworks simultaneously, the speaker experiences a
                conversation where they feel genuinely heard, understood, and valued. In a client
                consultation, this dramatically increases the likelihood that you will capture
                accurate requirements, build lasting trust, and secure the job.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Reflective Listening and Paraphrasing          */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Reflective Listening and Paraphrasing
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Reflective listening is the practice of listening for the full meaning behind what
              someone says &mdash; not just the surface words, but the underlying feelings,
              concerns, and intentions &mdash; and then reflecting that meaning back to the speaker.
              It was developed by Carl Rogers as part of person-centred therapy and has become one
              of the most widely taught communication skills in professional training.
            </p>

            <p className="text-white text-base leading-relaxed">
              The purpose of reflective listening is threefold: it confirms that you have understood
              correctly, it makes the speaker feel genuinely heard, and it often helps the speaker
              clarify their own thinking. In construction, these outcomes translate directly into
              better-quality work, fewer disputes, and stronger professional relationships.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Three Levels of Reflective Listening
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">
                    Level 1: Reflecting Content (Paraphrasing)
                  </p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Restating the speaker&rsquo;s key points in your own words to confirm factual
                    understanding. This is the most basic form of reflective listening and is used
                    constantly in professional settings.
                  </p>
                  <div className="bg-white/5 rounded p-2 mt-2">
                    <p className="text-white text-xs leading-relaxed">
                      <strong>Client says:</strong> &ldquo;We want to knock through the wall between
                      the kitchen and the dining room and have an island with sockets.&rdquo;
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      <strong>Paraphrase:</strong> &ldquo;So you are opening up the space to create
                      a kitchen-diner, and you will need power points in the new island unit.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">Level 2: Reflecting Feeling</p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Identifying and naming the emotion behind the words. This is more powerful than
                    reflecting content alone because it shows you understand not just <em>what</em>{' '}
                    the person said, but <em>how they feel</em> about it.
                  </p>
                  <div className="bg-white/5 rounded p-2 mt-2">
                    <p className="text-white text-xs leading-relaxed">
                      <strong>Client says:</strong> &ldquo;The last electrician left halfway through
                      and we had no power in the kitchen for two weeks.&rdquo;
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      <strong>Reflecting feeling:</strong> &ldquo;That sounds incredibly
                      frustrating. I can understand why reliability is so important to you on this
                      project.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-2">Level 3: Reflecting Meaning</p>
                  <p className="text-white text-xs leading-relaxed mb-2">
                    Connecting the content and the feeling to the underlying value or need. This is
                    the deepest level of reflective listening and builds the strongest trust.
                  </p>
                  <div className="bg-white/5 rounded p-2 mt-2">
                    <p className="text-white text-xs leading-relaxed">
                      <strong>Client says:</strong> &ldquo;I just want it done properly. I do not
                      want to have to think about the electrics again for twenty years.&rdquo;
                    </p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      <strong>Reflecting meaning:</strong> &ldquo;It sounds like long-term
                      reliability is your top priority &mdash; you want a quality installation that
                      you can trust and forget about. That is exactly the standard I work to.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Paraphrasing in Site Conversations
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Paraphrasing is not just for client consultations. It is equally valuable in
                day-to-day site conversations where miscommunication can lead to wasted time,
                incorrect work, or safety risks.
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Supervisor says:</strong> &ldquo;I need the second-fix in rooms four and
                    five finished by Thursday, but do not touch room six yet because the plasterers
                    have not been in.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong>Your paraphrase:</strong> &ldquo;So rooms four and five second-fix by
                    Thursday, and hold off room six until the plastering is done. Got it.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <em>
                      This takes three seconds and prevents a day&rsquo;s wasted work if you
                      misheard &ldquo;four and five&rdquo; as &ldquo;five and six.&rdquo;
                    </em>
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Colleague says:</strong> &ldquo;The isolation for that DB is the third
                    switch from the left in the main switch room &mdash; make sure it is the third,
                    not the fourth, because the fourth is the fire alarm.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong>Your paraphrase:</strong> &ldquo;Third switch from the left &mdash; not
                    the fourth, which is the fire alarm. I will confirm it with the labelling before
                    I isolate.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <em>
                      In safety-critical contexts like isolation, paraphrasing is not optional
                      &mdash; it is essential.
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Summarising                                     */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Summarising</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Where paraphrasing restates a single point, summarising pulls together multiple points
              from a longer conversation into a concise, structured overview. Summarising serves as
              a checkpoint &mdash; a moment where both parties confirm that they have a shared
              understanding of what has been discussed and agreed.
            </p>

            <p className="text-white text-base leading-relaxed">
              Summarising is particularly powerful at three points in any professional conversation:
              at natural transitions (moving from one topic to another), at decision points (before
              committing to a course of action), and at the end of a meeting or consultation (to
              confirm what happens next).
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Summarising a Client Consultation
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                After a 45-minute site survey for a full rewire, you might summarise as follows:
              </p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white text-xs leading-relaxed italic">
                  &ldquo;OK, let me make sure I have captured everything. You want a full rewire
                  including a new 18th Edition consumer unit in the hallway cupboard. Downstairs,
                  you need double sockets on every wall in the lounge and kitchen, a dedicated 32A
                  supply for the new oven, and USB charging sockets either side of the bed in both
                  bedrooms. Upstairs, you want to add a towel rail circuit in the bathroom. Outside,
                  you need a weatherproof socket at the front and two LED PIR floodlights at the
                  rear. You also mentioned that you want to keep the existing light fittings where
                  possible to save on redecorating. Have I missed anything?&rdquo;
                </p>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                This summary achieves several things simultaneously: it demonstrates that you
                listened carefully, it creates an informal verbal scope of works, it gives the
                client a chance to add anything they forgot or correct anything you misheard, and it
                sets the foundation for an accurate quotation. Without this summary, you might quote
                for the wrong scope, arrive on site with insufficient materials, or face a dispute
                later when the client says, &ldquo;I definitely told you about the outside
                socket.&rdquo;
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Summarising Stem Phrases</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Effective summaries usually begin with a bridging phrase that signals you are about
                to consolidate the conversation. These stem phrases sound natural and professional:
              </p>
              <ul className="text-white text-sm space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;So, to make sure I have got everything&hellip;&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;Let me just run through what we have discussed&hellip;&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;If I have understood correctly, the main points are&hellip;&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    &ldquo;Before we move on, let me recap what we have covered so
                    far&hellip;&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>&ldquo;Just to confirm &mdash; we are agreed on&hellip;&rdquo;</span>
                </li>
              </ul>
              <p className="text-white text-sm leading-relaxed mt-3">
                Always end a summary with a checking question: &ldquo;Have I missed anything?&rdquo;
                or &ldquo;Does that sound right to you?&rdquo; This invites correction and shows
                humility &mdash; you are not assuming your summary is perfect, you are inviting the
                speaker to verify it.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — Open vs Closed Questions                        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Open vs Closed Questions</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The questions you ask determine the quality of information you receive. In active
              listening, the distinction between open and closed questions is fundamental &mdash;
              and knowing when to use each type is a core professional skill for electricians
              conducting site surveys, client consultations, and technical discussions.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Open Questions &mdash; Expanding the Conversation
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Open questions cannot be answered with a simple yes or no. They begin with words
                like &ldquo;how&rdquo;, &ldquo;what&rdquo;, &ldquo;why&rdquo;,
                &ldquo;describe&rdquo;, or &ldquo;tell me about&rdquo;. They invite the speaker to
                share detailed information, explain their thinking, or describe their experience.
              </p>
              <div className="space-y-2">
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Client consultation:</strong> &ldquo;How do you use this room on a
                    typical evening?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Site survey:</strong> &ldquo;What are your priorities for the outdoor
                    lighting?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Colleague discussion:</strong> &ldquo;What approach would you take for
                    the containment routing through the plant room?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Fault diagnosis:</strong> &ldquo;Can you describe exactly what happens
                    when you switch on the shower?&rdquo;
                  </p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                Open questions are essential at the start of a consultation when you need to
                understand the full picture. They encourage clients to share information you might
                not have thought to ask for &mdash; details about daily routines, future plans, pet
                peeves from previous experiences, and aesthetic preferences that affect your design.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white text-sm font-semibold mb-3">
                Closed Questions &mdash; Confirming Specifics
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Closed questions can be answered with a single word or short phrase &mdash;
                typically yes, no, or a specific fact. They begin with words like &ldquo;is&rdquo;,
                &ldquo;do&rdquo;, &ldquo;are&rdquo;, &ldquo;have&rdquo;, &ldquo;which&rdquo;, or
                &ldquo;how many&rdquo;. They are used to confirm facts, narrow options, or close a
                decision.
              </p>
              <div className="space-y-2">
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Technical confirmation:</strong> &ldquo;Is the existing supply
                    single-phase or three-phase?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Safety check:</strong> &ldquo;Has the isolation been confirmed and
                    locked off?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Client decision:</strong> &ldquo;Do you want the sockets in brushed
                    chrome or white?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Scope confirmation:</strong> &ldquo;Are you happy for me to go ahead on
                    that basis?&rdquo;
                  </p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                Closed questions are most effective after open questions have established the broad
                picture. They pin down specific details, confirm understanding, and close decision
                loops.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">
                    The Funnel Technique: Open &rarr; Closed
                  </p>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    The most effective site surveys and client consultations follow a funnel
                    pattern: start wide with open questions to gather the full picture, then narrow
                    down with closed questions to confirm specific details. This mirrors how a
                    diagnostic process works &mdash; gather symptoms broadly, then test specific
                    hypotheses.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong>Example sequence for a bathroom refit:</strong>
                    <br />
                    Open: &ldquo;Tell me about what you want to achieve with the new
                    bathroom.&rdquo;
                    <br />
                    Open: &ldquo;How do you use the bathroom day-to-day &mdash; is it mainly quick
                    showers or longer baths?&rdquo;
                    <br />
                    Closed: &ldquo;Will you want a heated towel rail?&rdquo;
                    <br />
                    Closed: &ldquo;Are you keeping the existing shower unit or upgrading to an
                    electric one?&rdquo;
                    <br />
                    Closed: &ldquo;Do you want a shaver socket or USB charging point?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Putting It Into Practice                        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Putting It Into Practice</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              The techniques covered in this section &mdash; SOLER, RASA, reflective listening,
              paraphrasing, summarising, and effective questioning &mdash; are not separate tools to
              deploy in isolation. They are elements of a single integrated skill: the ability to
              listen actively and respond in a way that makes the speaker feel heard and ensures you
              capture accurate information. Here is how they come together in two common
              construction scenarios.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Ear className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Scenario 1: Domestic Client Consultation
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                You arrive at a property to survey and quote for a kitchen rewire. The client, Mrs
                Patel, meets you at the door. She is clearly nervous about the cost and the
                disruption.
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">
                    Step 1: Body Language (SOLER)
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    You face Mrs Patel directly, keep an open posture, and maintain a relaxed
                    manner. You leave your tools in the van &mdash; this is a listening conversation
                    first, not a technical inspection.
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">
                    Step 2: Receive and Appreciate (RASA)
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    You ask: &ldquo;Tell me about what you are hoping to do with the kitchen.&rdquo;
                    (Open question.) As she speaks, you nod, maintain eye contact, and offer brief
                    cues: &ldquo;Right&rdquo;, &ldquo;I see&rdquo;, &ldquo;Makes sense.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">Step 3: Reflect Feeling</p>
                  <p className="text-white text-xs leading-relaxed">
                    She mentions: &ldquo;The last builder we had was a nightmare &mdash; he kept
                    changing the price.&rdquo; You respond: &ldquo;It sounds like transparency on
                    cost is really important to you after that experience.&rdquo; (Reflecting
                    feeling.) She visibly relaxes.
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">
                    Step 4: Paraphrase Key Points
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    As she describes each requirement, you paraphrase: &ldquo;So you need sockets
                    for the island, a dedicated supply for the new oven, and you want the boiler
                    controls relocated to the utility room.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">
                    Step 5: Summarise and Confirm (RASA)
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    At the end, you summarise the full scope, then ask: &ldquo;Have I missed
                    anything?&rdquo; and &ldquo;Is there anything else about the kitchen you have
                    been thinking about?&rdquo; (Open follow-up question.)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Scenario 2: Commercial Site Survey
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                You are surveying a new office fit-out with the facilities manager, Mark. He is
                juggling multiple contractors and under pressure to hit a tight programme.
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">Opening with Open Questions</p>
                  <p className="text-white text-xs leading-relaxed">
                    &ldquo;What is the overall vision for this floor?&rdquo; and &ldquo;How will the
                    different zones be used?&rdquo; These broad questions let Mark paint the full
                    picture before you dive into technical specifics.
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">Paraphrasing for Clarity</p>
                  <p className="text-white text-xs leading-relaxed">
                    Mark says: &ldquo;The server room needs redundant power, and I need it on a
                    separate sub-main from the general office circuits.&rdquo; You paraphrase:
                    &ldquo;So a dedicated sub-main for the server room, independent from the general
                    power distribution, with redundancy built in.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">
                    Narrowing with Closed Questions
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    &ldquo;Will the server room require a UPS installation as well, or is that being
                    handled separately?&rdquo; &ldquo;How many data points per desk position?&rdquo;
                    &ldquo;Do you need emergency lighting to BS 5266 throughout?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white text-xs font-medium mb-1">End-of-Survey Summary</p>
                  <p className="text-white text-xs leading-relaxed">
                    You walk Mark through a structured summary: general power, lighting, data,
                    server room, emergency systems, external works. You finish with: &ldquo;Is there
                    anything I have not covered, or anything that might change between now and the
                    start date?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Headphones className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Active listening is not a passive skill &mdash; it is a deliberate, structured
                    practice that combines physical attentiveness (SOLER), conscious mental
                    engagement (RASA), reflective techniques (paraphrasing and summarising), and
                    strategic questioning (open and closed). Electricians who master these
                    techniques capture more accurate requirements, build stronger client
                    relationships, reduce costly misunderstandings, and create safer working
                    environments. The return on investment is immediate and measurable: fewer
                    callbacks, fewer disputes, more repeat business, and better outcomes on every
                    job.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:text-white hover:bg-white/5 touch-manipulation min-h-[44px]"
          >
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../cc-module-2-section-3">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
