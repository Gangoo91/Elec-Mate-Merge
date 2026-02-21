import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Ear,
  AlertTriangle,
  MessageCircle,
  HelpCircle,
  Users,
  BarChart3,
  HardHat,
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
    question:
      'According to Covey, what is the highest level of listening and why does it matter on a construction site?',
    options: [
      'Selective listening — it allows you to filter out irrelevant noise on a busy site',
      'Attentive listening — it shows colleagues you are paying attention to their words',
      'Empathetic listening — it means understanding both the content and the emotion behind what someone is saying',
      'Pretend listening — it allows you to appear engaged during long safety briefings',
    ],
    correctIndex: 2,
    explanation:
      'Empathetic listening is Covey\u2019s highest level. It goes beyond hearing words to understanding the speaker\u2019s feelings, perspective, and intent. On site, this means recognising when an apprentice says \u201cI\u2019m not sure about this\u201d that they may actually be saying \u201cI\u2019m afraid of making a dangerous mistake.\u201d',
  },
  {
    question:
      'Research suggests we retain only 25\u201350% of what we hear. Which of the following is the most effective strategy for improving retention during a safety briefing?',
    options: [
      'Record the briefing on your phone and listen again later',
      'Actively paraphrase key points back to the speaker and take brief notes',
      'Sit at the front of the room so you can hear more clearly',
      'Read the written briefing document instead of attending in person',
    ],
    correctIndex: 1,
    explanation:
      'Active engagement \u2014 paraphrasing, summarising, and note-taking \u2014 forces your brain to process information more deeply than passive listening. This moves information from short-term to long-term memory, significantly improving retention beyond the typical 25\u201350% baseline.',
  },
  {
    question:
      'Covey\u2019s Habit 5 states: \u201cSeek first to understand, then to be understood.\u201d Which scenario best demonstrates this principle?',
    options: [
      'An electrician explains their preferred cable routing to the main contractor before hearing the project constraints',
      'A supervisor listens carefully to an apprentice\u2019s concern about a task, asks clarifying questions, then shares their guidance',
      'A site manager sends a detailed email explaining the schedule before asking trades for their input',
      'An electrician finishes a colleague\u2019s sentences to show they already understand the issue',
    ],
    correctIndex: 1,
    explanation:
      'Habit 5 requires genuinely understanding the other person\u2019s perspective before presenting your own. The supervisor who listens first, asks questions to deepen understanding, and only then offers guidance is practising the principle correctly. The other options all prioritise speaking or assuming over listening.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I work on noisy construction sites \u2014 how can I practise listening skills in that environment?',
    answer:
      'Noisy environments actually make deliberate listening even more important. When you cannot rely on casual overhearing, you must create intentional listening moments: step away from machinery for important conversations, face the speaker directly so you can read body language and lip movements, and confirm what you heard by paraphrasing back. Many site accidents have been traced to miscommunication in noisy conditions, so treating listening as a conscious skill rather than a passive activity is a genuine safety practice, not just a soft skill.',
  },
  {
    question:
      'What if I catch myself at the "pretending" or "selective" level during a conversation?',
    answer:
      'This is itself a sign of growing self-awareness, so do not judge yourself harshly. When you notice you have drifted, simply re-engage: make eye contact, ask a question about what the speaker just said, or mentally summarise their last point. The goal is not to be perfect but to catch the drift sooner each time. Over weeks of practice, you will find that your default level gradually shifts upward from selective to attentive, and you will spend more time in genuine empathetic listening during conversations that matter.',
  },
  {
    question: 'Is empathetic listening the same as agreeing with the other person?',
    answer:
      'No \u2014 and this is one of the most common misconceptions. Empathetic listening means understanding the other person\u2019s perspective and feelings, not necessarily endorsing them. You can listen empathetically to a client\u2019s complaint about cost and genuinely understand their frustration, while still holding firm on the price because you know it reflects the actual scope of work. Understanding someone\u2019s position gives you better information to work with, whether you ultimately agree or disagree. In fact, people are far more likely to accept a \u201cno\u201d from someone who clearly understood their request than from someone who dismissed it without listening.',
  },
  {
    question: 'How do I encourage an apprentice to talk when they seem reluctant to speak up?',
    answer:
      'Reluctance usually comes from fear of judgement, not lack of things to say. Start by creating safety: ask open questions (\u201cWhat are you finding tricky about this?\u201d rather than \u201cDo you understand?\u201d), give them time to think without jumping in, and respond to their answers with curiosity rather than correction. When they do speak up, acknowledge the effort (\u201cGood question \u2014 that\u2019s exactly the kind of thing you should be flagging\u201d). Over time, consistent non-judgemental listening builds trust, and the apprentice will speak more freely because they have learned it is safe to do so.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following correctly lists Covey\u2019s five levels of listening from lowest to highest?',
    options: [
      'Selective, pretending, ignoring, attentive, empathetic',
      'Ignoring, pretending, selective, attentive, empathetic',
      'Pretending, ignoring, selective, empathetic, attentive',
      'Ignoring, selective, pretending, attentive, empathetic',
    ],
    correctAnswer: 1,
    explanation:
      'Covey\u2019s hierarchy runs from ignoring (the lowest) through pretending, selective, and attentive, up to empathetic listening (the highest). Each level represents a deeper degree of engagement with the speaker.',
  },
  {
    id: 2,
    question:
      'According to listening research, approximately what percentage of a spoken message do most people retain?',
    options: ['5\u201310%', '25\u201350%', '70\u201380%', '90\u201395%'],
    correctAnswer: 1,
    explanation:
      'Research consistently shows that most people retain only 25\u201350% of what they hear. This has significant implications on construction sites, where a missed instruction during a safety briefing could lead to a serious incident.',
  },
  {
    id: 3,
    question: 'Covey\u2019s Habit 5 is best summarised as:',
    options: [
      'Begin with the end in mind',
      'Put first things first',
      'Seek first to understand, then to be understood',
      'Think win-win',
    ],
    correctAnswer: 2,
    explanation:
      'Habit 5 from The 7 Habits of Highly Effective People is \u201cSeek first to understand, then to be understood.\u201d Covey argued that most people listen with the intent to reply rather than to understand, and that reversing this order transforms communication.',
  },
  {
    id: 4,
    question:
      'An electrician nods along during a toolbox talk while mentally planning their lunch. This is an example of:',
    options: [
      'Attentive listening',
      'Selective listening',
      'Pretend listening',
      'Empathetic listening',
    ],
    correctAnswer: 2,
    explanation:
      'Pretend listening (Level 2) means giving the outward appearance of paying attention \u2014 nodding, making eye contact, saying \u201cmmhmm\u201d \u2014 while your mind is elsewhere. It is common during routine briefings but dangerous when critical safety information is being communicated.',
  },
  {
    id: 5,
    question: 'Which of the following best describes selective listening?',
    options: [
      'Completely ignoring the speaker and doing something else',
      'Hearing only the parts of a message that interest you or confirm your existing view',
      'Giving full attention to both the content and emotion behind the speaker\u2019s words',
      'Pretending to listen while thinking about something else entirely',
    ],
    correctAnswer: 1,
    explanation:
      'Selective listening (Level 3) means tuning in only to certain parts of a conversation \u2014 typically the bits that are relevant to you, that you agree with, or that confirm what you already believe. The rest is filtered out, which can cause you to miss crucial context or nuance.',
  },
  {
    id: 6,
    question:
      'A supervisor notices that an apprentice seems hesitant when asked to isolate a circuit. Instead of just repeating the instruction, the supervisor asks: \u201cYou seem unsure \u2014 what\u2019s going through your mind?\u201d This is an example of:',
    options: [
      'Ignoring the apprentice\u2019s concern',
      'Selective listening focused only on the task',
      'Attentive listening to the words being spoken',
      'Empathetic listening \u2014 responding to the emotion behind the behaviour',
    ],
    correctAnswer: 3,
    explanation:
      'The supervisor has picked up on an emotional signal (hesitation) rather than just the surface-level task communication. By addressing the feeling behind the behaviour, they are practising empathetic listening, which helps the apprentice feel safe to express their actual concern.',
  },
  {
    id: 7,
    question:
      'Why is the statistic that we retain only 25\u201350% of what we hear particularly significant for construction safety?',
    options: [
      'It means safety briefings should be replaced with written documents',
      'It suggests that critical safety information must be reinforced through repetition, visual aids, and active engagement',
      'It proves that listening skills cannot be improved with practice',
      'It indicates that only experienced workers should attend safety briefings',
    ],
    correctAnswer: 1,
    explanation:
      'If people naturally retain less than half of what they hear, then relying solely on spoken safety briefings is insufficient. Effective safety communication combines verbal instruction with written summaries, visual demonstrations, and active engagement techniques like asking workers to repeat back key points.',
  },
  {
    id: 8,
    question: 'According to Covey, the biggest barrier to empathetic listening is:',
    options: [
      'Background noise in the environment',
      'Not having enough technical knowledge about the topic',
      'Listening with the intent to reply rather than to understand',
      'The speaker talking too quickly for you to follow',
    ],
    correctAnswer: 2,
    explanation:
      'Covey identified that most people listen autobiographically \u2014 filtering everything through their own experience and preparing their response while the other person is still talking. This intent to reply, rather than to genuinely understand, is the fundamental barrier to empathetic listening.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Identify and explain Covey\u2019s five levels of listening with construction-specific examples',
  'Apply Habit 5 (\u201cSeek first to understand, then to be understood\u201d) in workplace conversations',
  'Explain why humans retain only 25\u201350% of what they hear and the safety implications on site',
  'Recognise which level of listening you default to and consciously move to a higher level',
  'Use empathetic listening techniques during safety briefings, apprentice mentoring, and client discussions',
  'Identify common listening barriers on construction sites and apply practical strategies to overcome them',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CCModule2Section1() {
  useSEO({
    title: 'The Art of Listening | Module 2: Listening & Understanding Others',
    description:
      'Stephen Covey\u2019s 5 levels of listening, Habit 5, listening statistics, and construction site examples for apprentice electricians.',
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
            The Art of Listening
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Most people think they are good listeners. Research says otherwise. This section
            explores why listening is the most underrated skill on a construction site &mdash; and
            how to master it.
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
                  Covey identified five levels of listening &mdash; most people operate at levels
                  1&ndash;3
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  We retain only 25&ndash;50% of what we hear &mdash; half of every safety briefing
                  is lost
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Empathetic listening &mdash; Covey&rsquo;s highest level &mdash; means
                  understanding both content and feeling
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Habit 5: &ldquo;Seek first to understand, then to be understood&rdquo; transforms
                  workplace communication
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
                  Poor listening causes rework, delays, and safety incidents on construction sites
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Apprentices who feel heard are more likely to flag concerns before they become
                  dangerous
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Electricians who listen well build stronger relationships with clients,
                  colleagues, and contractors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Listening is the foundation of every other communication skill covered in this
                  course
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
        {/*  SECTION 01 — Why Listening Matters More Than You Think      */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Why Listening Matters More Than You Think
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              We spend roughly 60% of our communication time listening, yet it is the skill we are
              least trained in. Schools teach reading, writing, and speaking &mdash; but almost
              nobody receives formal instruction in how to listen. The result is a workforce that
              spends the majority of its communication time using the skill it has practised the
              least.
            </p>

            <p className="text-white text-base leading-relaxed">
              Research into listening retention paints a sobering picture. Studies consistently show
              that the average person retains only <strong>25&ndash;50%</strong> of what they hear.
              That means when your supervisor delivers a ten-minute safety briefing, you walk away
              having absorbed, at best, half of it. The rest &mdash; potentially including the most
              critical instruction &mdash; is gone within minutes.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Listening Gap in Numbers</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">60% of Communication</p>
                  <p className="text-white text-xs leading-relaxed">
                    The proportion of our communication time spent listening &mdash; more than
                    speaking, reading, or writing combined.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">25&ndash;50% Retention</p>
                  <p className="text-white text-xs leading-relaxed">
                    The amount of a spoken message the average person retains. Within 48 hours, this
                    drops further to around 25%.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">0 Hours of Training</p>
                  <p className="text-white text-xs leading-relaxed">
                    The amount of formal listening training most people receive throughout their
                    education. Reading and writing are taught for years; listening rarely at all.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">8 Seconds Average</p>
                  <p className="text-white text-xs leading-relaxed">
                    The typical attention span before the mind begins to wander during a
                    conversation. Deliberate listening practice extends this significantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  What This Means on a Construction Site
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                On a construction site, poor listening is not just inefficient &mdash; it is
                dangerous. Consider a scenario where a site manager briefs a team of six
                electricians on a permit-to-work for a live switchgear panel. If each person retains
                only 40% of the briefing, each one carries a different 40%. One might remember the
                isolation procedure but forget the testing requirements. Another might recall the
                emergency contact but miss the boundaries of the work zone.
              </p>
              <p className="text-white text-sm leading-relaxed">
                This is not hypothetical. Incident investigation reports regularly identify
                &ldquo;miscommunication&rdquo; and &ldquo;failure to follow instructions&rdquo; as
                contributing factors &mdash; and in many cases, the root cause is not that
                instructions were unclear, but that they were not fully heard. Improving your
                listening is one of the most direct ways to improve both your safety and your
                effectiveness on site.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Covey's Five Levels of Listening               */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Covey&rsquo;s Five Levels of Listening
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              In his 1989 book <em>The 7 Habits of Highly Effective People</em>, Stephen R. Covey
              described five distinct levels of listening. Most people, Covey observed, hover
              between levels two and three &mdash; giving the appearance of listening without truly
              engaging with what is being said. Understanding these levels helps you recognise where
              you currently operate and gives you a clear target to aim for.
            </p>

            {/* Five Levels Grid */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                The Five Levels &mdash; From Lowest to Highest
              </p>
              <div className="space-y-3">
                {/* Level 1 */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-white text-sm font-medium">Ignoring</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed ml-8">
                    Making no effort to listen at all. You are physically present but mentally
                    elsewhere &mdash; scrolling your phone, thinking about something completely
                    unrelated, or actively tuning the speaker out. On site, this might look like an
                    electrician checking their phone during a safety briefing or walking away while
                    a colleague is still talking.
                  </p>
                </div>

                {/* Level 2 */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-white text-sm font-medium">Pretending</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed ml-8">
                    Giving the outward appearance of listening &mdash; nodding, making eye contact,
                    saying &ldquo;yeah&rdquo; or &ldquo;mmhmm&rdquo; &mdash; while your mind is
                    somewhere else entirely. This is extremely common during routine meetings and
                    toolbox talks. You look engaged, but if someone asked you to repeat what was
                    just said, you would struggle. Pretend listening is particularly dangerous when
                    it occurs during safety-critical communications.
                  </p>
                </div>

                {/* Level 3 */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-white text-sm font-medium">Selective</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed ml-8">
                    Hearing only the parts that interest you or that confirm what you already
                    believe. You tune in when the topic is relevant to your trade, your schedule, or
                    your interests, and tune out the rest. On a construction site, a sparks might
                    pay close attention during the electrical section of a coordination meeting but
                    switch off during the plumbing or plastering updates &mdash; missing crucial
                    information about sequencing that directly affects their work.
                  </p>
                </div>

                {/* Level 4 */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-white text-sm font-medium">Attentive</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed ml-8">
                    Giving your full attention to the speaker&rsquo;s words. You are concentrating
                    on the content, following the logic, and processing the information. This is
                    what most people consider &ldquo;good listening&rdquo; &mdash; and it is a
                    significant step up from the first three levels. However, attentive listening
                    still focuses primarily on <em>what</em> is being said, not on what the speaker
                    is feeling or what lies beneath the words. It captures content but may miss
                    context.
                  </p>
                </div>

                {/* Level 5 */}
                <div className="bg-white/5 rounded-lg p-3 border border-rose-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-white text-sm font-medium">Empathetic</p>
                  </div>
                  <p className="text-white text-xs leading-relaxed ml-8">
                    The highest level. Empathetic listening means understanding both the content and
                    the emotion behind the speaker&rsquo;s words. You are listening not just to what
                    they say, but to what they mean, what they feel, and what they need. You step
                    into their frame of reference and see the world through their eyes. When an
                    apprentice says &ldquo;I&rsquo;m not sure about this,&rdquo; an empathetic
                    listener hears more than uncertainty about a task &mdash; they hear a person who
                    may be anxious about making a mistake, worried about looking incompetent, or
                    unsure whether it is safe to ask for help.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Which Level Do You Default To?
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Be honest with yourself. Most people, including experienced professionals, default
                to selective listening (Level 3) in the majority of their conversations. They tune
                in when the topic seems relevant and drift off when it does not. During important
                conversations, most people rise to attentive listening (Level 4), but genuine
                empathetic listening (Level 5) remains rare &mdash; precisely because it requires
                the most effort and self-discipline.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The good news is that listening level is not fixed. Like any skill, it can be
                developed through awareness and practice. The first step is simply noticing which
                level you are at during a given conversation. Once you notice, you can choose to
                shift upward &mdash; even by one level &mdash; which immediately improves the
                quality of the interaction.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Habit 5: Seek First to Understand              */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Habit 5: Seek First to Understand</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Covey considered Habit 5 &mdash; &ldquo;Seek first to understand, then to be
              understood&rdquo; &mdash; the single most important principle in interpersonal
              communication. He argued that most people do the opposite: they listen with the intent
              to reply, not to understand. While someone else is talking, they are already
              formulating their response, waiting for a gap to jump in, or mentally disagreeing
              before the speaker has finished.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm leading-relaxed italic mb-2">
                    &ldquo;Most people do not listen with the intent to understand; they listen with
                    the intent to reply.&rdquo;
                  </p>
                  <p className="text-rose-400 text-xs font-semibold">&mdash; Stephen R. Covey</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Autobiographical Listening &mdash; The Default Mode
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Covey identified four ways people typically respond when they are listening
                autobiographically &mdash; filtering everything through their own experience rather
                than genuinely hearing the other person:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Evaluating:</strong> Judging whether you agree or disagree before the
                    speaker has finished. &ldquo;That&rsquo;s wrong&rdquo; or &ldquo;I
                    wouldn&rsquo;t do it that way&rdquo; runs through your head while they are still
                    talking.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Probing:</strong> Asking questions from your own frame of reference, not
                    the speaker&rsquo;s. You direct the conversation toward what you want to know
                    rather than what they need to express.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Advising:</strong> Jumping to solutions before fully understanding the
                    problem. &ldquo;What you should do is&hellip;&rdquo; often arrives before the
                    person has finished explaining what they actually need.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Interpreting:</strong> Projecting your own motives onto the speaker.
                    &ldquo;You&rsquo;re only saying that because&hellip;&rdquo; fills in the blanks
                    with your assumptions rather than their reality.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Construction Example: The Apprentice Who Stops Asking
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A first-year apprentice approaches their supervisor and starts to explain that they
                are struggling with a particular wiring configuration. Before the apprentice has
                finished, the supervisor interrupts: &ldquo;It&rsquo;s dead easy &mdash; just follow
                the diagram. I showed you last week.&rdquo; The supervisor has jumped straight to
                advising without understanding what the apprentice is actually struggling with.
                Maybe they can read the diagram perfectly well but are confused about which
                terminals to use on a specific brand of accessory. Maybe they understood the theory
                but are finding the physical dexterity difficult. Maybe they are not confused at all
                but concerned about a discrepancy they have noticed.
              </p>
              <p className="text-white text-sm leading-relaxed">
                By advising before understanding, the supervisor has done three things: given advice
                that may not address the actual problem, made the apprentice feel that their concern
                was trivial, and &mdash; most damagingly &mdash; reduced the likelihood that the
                apprentice will ask for help next time. When people feel unheard, they stop
                speaking. On a construction site, that silence can be dangerous.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                How Habit 5 Changes the Conversation
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Now imagine the same scenario with Habit 5 applied. The apprentice starts to explain
                their struggle. The supervisor resists the urge to jump in and instead listens
                fully. When the apprentice finishes, the supervisor reflects back: &ldquo;So you can
                follow the diagram, but you&rsquo;re not sure which terminal the earth sleeving
                should sit behind on this particular isolator?&rdquo; The apprentice nods and adds,
                &ldquo;Yeah, and the last one I did, the earth felt loose afterwards.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                Now the supervisor understands the real issue &mdash; not a lack of knowledge but a
                specific concern about termination quality on a particular component. The guidance
                they give will be targeted and useful. The apprentice feels heard and respected. And
                next time they have a concern &mdash; including a safety concern &mdash; they will
                be more likely to raise it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — Listening on the Construction Site             */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Listening on the Construction Site</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Construction sites present unique challenges for listening. Noise, time pressure,
              physical discomfort, and the constant demands of multiple trades create an environment
              where poor listening is not just common &mdash; it is structurally encouraged. Yet it
              is precisely this environment where listening quality matters most, because the
              consequences of miscommunication can be costly or dangerous.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Safety Briefings: The Retention Problem
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A standard morning safety briefing lasts five to ten minutes and covers hazards,
                work zones, permits, and emergency procedures. If the average retention rate is
                25&ndash;50%, then every person in that briefing walks away with a different and
                incomplete version of the information. The person who remembers the hazard location
                might forget the emergency procedure. The person who noted the permit boundaries
                might have missed the specific exclusion zones.
              </p>
              <p className="text-white text-sm leading-relaxed">
                This is why effective safety communication goes beyond simply delivering
                information. It requires techniques that raise the listening level of the audience:
                asking workers to repeat back key points, using visual aids alongside spoken
                instructions, pausing to check understanding, and distributing written summaries to
                supplement the verbal briefing. The goal is not just to <em>tell</em> people &mdash;
                it is to ensure they have genuinely <em>heard</em> and <em>understood</em>.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Apprentice Conversations: Listening for What Is Not Said
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                When mentoring an apprentice, what they <em>do not</em> say is often as important as
                what they do say. An apprentice who says &ldquo;Yeah, I think I understand&rdquo;
                with a hesitant tone and avoiding eye contact is communicating far more than their
                words suggest. An empathetic listener picks up on the hesitation, the body language,
                and the underlying uncertainty &mdash; and responds to the whole message, not just
                the words.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Common signals that an apprentice needs more support than their words suggest:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Repeatedly asking the same question in slightly different ways &mdash; they did
                    not understand the first answer but do not want to say so directly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Agreeing quickly without asking any follow-up questions &mdash; they may be
                    masking confusion to avoid looking foolish
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Working very slowly or pausing frequently &mdash; they may be unsure of the next
                    step but reluctant to admit it
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Deflecting with humour (&ldquo;I&rsquo;ll just wing it!&rdquo;) &mdash; often a
                    cover for genuine anxiety about a task
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">Construction Example</p>
              <p className="text-white text-sm leading-relaxed">
                You are working alongside a second-year apprentice on a commercial fit-out. You
                explain the cable routing for a ring final circuit and ask if they are happy to
                start pulling cables. They say &ldquo;Yeah, sounds good&rdquo; but you notice they
                glance back at the distribution board twice and their hands are hovering rather than
                reaching for the cable. An attentive listener (Level 4) might take the words at face
                value and move on. An empathetic listener (Level 5) pauses and says, &ldquo;You
                looked back at the board &mdash; is there something about the connections you want
                to go over?&rdquo; The apprentice admits they are not sure which way the ring runs
                and were afraid to ask in front of the other lads. A potential wiring error has been
                prevented, and the apprentice has learned that it is safe to ask questions.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 05 — Barriers to Effective Listening                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Barriers to Effective Listening</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Understanding why we listen poorly is as important as knowing how to listen well. Most
              listening failures are not caused by a lack of desire to listen, but by specific
              barriers that operate below conscious awareness. Recognising these barriers is the
              first step to overcoming them.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Environmental Barriers</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Noise:</strong> Construction sites are inherently noisy. Angle grinders,
                    SDS drills, radio chatter, and general site activity create a constant
                    background that competes with conversation. Important discussions should be
                    moved to quieter locations whenever possible.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Visual distractions:</strong> Activity on site constantly draws the eye.
                    A crane lifting nearby, other trades working in your peripheral vision, or
                    movement in the corridor all pull attention away from the speaker.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Physical discomfort:</strong> Cold, heat, fatigue, hunger, or the need
                    to use the toilet all reduce your available attention. It is difficult to listen
                    empathetically when your body is demanding something else.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Psychological Barriers</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Rehearsing your response:</strong> The most common barrier. While the
                    other person is talking, you are mentally composing what you will say next. You
                    cannot fully process incoming information while simultaneously generating
                    outgoing information.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Assumptions and prejudgement:</strong> If you have already decided what
                    the speaker is going to say, you stop listening to what they actually say. This
                    is especially common with people you work with regularly &mdash; you think you
                    already know their position.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Emotional triggers:</strong> Certain topics, tones of voice, or phrases
                    can trigger an emotional reaction that hijacks your listening. If someone says
                    something that makes you angry or defensive, your attention shifts from
                    understanding them to protecting yourself.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Status and hierarchy:</strong> People sometimes listen less carefully to
                    those they perceive as junior or less experienced. An experienced electrician
                    might half-listen to an apprentice&rsquo;s observation, assuming they have
                    nothing valuable to add &mdash; and miss a genuine insight.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                The Speed Gap: Why Your Brain Wanders
              </p>
              <p className="text-white text-sm leading-relaxed">
                There is a neurological reason why listening is difficult. The average person speaks
                at 125&ndash;150 words per minute, but the brain can process language at roughly
                400&ndash;800 words per minute. This means your brain has significant spare capacity
                while someone is talking &mdash; and that spare capacity fills itself with other
                thoughts, distractions, and mental tangents. Effective listeners learn to use this
                spare capacity productively: mentally summarising what the speaker has said,
                considering the emotions behind the words, and formulating clarifying questions
                rather than letting the mind drift.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06 — Key Takeaways and Practical Application        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Key Takeaways and Practical Application
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">What We Covered</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Listening retention</strong> &mdash; we retain only 25&ndash;50% of what
                    we hear, which means half of every safety briefing, client instruction, and
                    supervisor direction is lost without deliberate effort.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Covey&rsquo;s five levels</strong> &mdash; ignoring, pretending,
                    selective, attentive, and empathetic. Most people default to selective listening
                    (Level 3), but empathetic listening (Level 5) produces the deepest understanding
                    and the strongest working relationships.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habit 5</strong> &mdash; &ldquo;Seek first to understand, then to be
                    understood.&rdquo; Listening to reply is the default; listening to understand is
                    the skill. Autobiographical listening (evaluating, probing, advising,
                    interpreting) blocks genuine understanding.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Safety implications</strong> &mdash; poor listening on construction
                    sites leads directly to miscommunication, rework, and incidents. Safety
                    briefings, permit-to-work instructions, and method statements all rely on
                    accurate listening.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Apprentice mentoring</strong> &mdash; empathetic listening creates
                    psychological safety, encouraging apprentices to ask questions and flag concerns
                    rather than staying silent and making avoidable mistakes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Listening barriers</strong> &mdash; environmental factors (noise,
                    distractions), psychological factors (rehearsing replies, prejudgement,
                    emotional triggers), and the neurological speed gap all reduce listening quality
                    unless actively managed.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Listening is not passive. It is a deliberate, effortful skill that determines
                    the quality of every conversation you have &mdash; from safety briefings to
                    client meetings to apprentice mentoring. By understanding Covey&rsquo;s five
                    levels and consciously practising empathetic listening, you will build stronger
                    relationships, prevent miscommunication, and create an environment where people
                    feel safe to speak up when it matters most.
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
                    <strong>This week:</strong> during three conversations, pause and ask yourself
                    which level of listening you are at. Just noticing is the first step toward
                    shifting upward.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This fortnight:</strong> in one conversation per day, resist the urge to
                    advise or reply immediately. Instead, reflect back what the speaker has said
                    before offering your own view. Notice how the conversation changes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> during your next safety briefing, practise using
                    the speed gap productively &mdash; mentally summarise each point as it is made,
                    and note any questions that arise. Compare how much you retain versus a briefing
                    where you listened passively.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-12 border-t border-white/5">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2-section-2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
