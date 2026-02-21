import {
  ArrowLeft,
  Heart,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Users,
  Brain,
  Shield,
  AlertTriangle,
  HandHeart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'empathy-types',
    question:
      'A colleague is going through a difficult divorce. You understand their perspective, feel their pain, and offer to help with their workload. Which type(s) of empathy are you demonstrating?',
    options: [
      'Cognitive empathy only',
      'Emotional empathy only',
      'Compassionate empathy (which includes cognitive and emotional)',
      'Sympathy, not empathy',
    ],
    correctIndex: 2,
    explanation:
      'Compassionate empathy is the fullest form \u2014 it combines cognitive empathy (understanding their perspective), emotional empathy (feeling their pain), and adds the crucial action component: being moved to help. Offering to assist with their workload demonstrates the compassionate empathy response.',
  },
  {
    id: 'empathy-sympathy',
    question:
      'A colleague has a near-miss on site and is shaken. Which response best demonstrates empathy rather than sympathy?',
    options: [
      '"At least nobody was hurt. Count yourself lucky."',
      '"I can see that really shook you. Do you want to talk about what happened?"',
      '"Cheer up, these things happen on site all the time."',
      '"You should not let it bother you. Just get back to work."',
    ],
    correctIndex: 1,
    explanation:
      'Empathy validates the person\u2019s emotional experience: \u201cI can see that really shook you\u201d shows you have perceived their emotion, and \u201cdo you want to talk about what happened?\u201d offers connection. The other responses are sympathy or dismissal \u2014 they minimise the person\u2019s feelings rather than connecting with them.',
  },
  {
    id: 'empathy-safety',
    question: 'How does empathy directly improve safety on a construction site?',
    options: [
      'It makes people work faster so there is less time for accidents',
      'It helps you notice when someone is distracted, stressed or unfit to work safely',
      'It replaces the need for formal safety procedures',
      'It only matters for managers, not for tradespeople',
    ],
    correctIndex: 1,
    explanation:
      'Empathetic team members notice emotional and behavioural cues that indicate someone may not be working safely \u2014 distraction, stress, fatigue, withdrawal. By picking up these signals early, they can intervene before an accident occurs. Empathy does not replace safety procedures; it supplements them with human awareness.',
  },
];

const faqs = [
  {
    question: 'I worry about empathy fatigue. How do I care without burning out?',
    answer:
      'Empathy fatigue (sometimes called compassion fatigue) is a real phenomenon, particularly for people who are naturally empathetic and work in emotionally demanding environments. The key is to practise empathy with boundaries. You do not need to absorb every person\u2019s pain \u2014 you need to understand it and respond appropriately. Cognitive empathy (understanding someone\u2019s perspective) is less emotionally draining than emotional empathy (actually feeling their feelings). Practise shifting between the two: use cognitive empathy as your default mode at work, and reserve emotional empathy for situations where deeper connection is needed. Also protect your own recovery time: empathy requires emotional energy, so ensure you are getting adequate rest, maintaining your own relationships, and doing things that replenish you outside of work.',
  },
  {
    question: 'How do I show empathy to someone I find really difficult?',
    answer:
      'This is one of the hardest emotional intelligence challenges, and it is worth practising precisely because it is difficult. Start with cognitive empathy: try to understand their perspective without agreeing with it. Ask yourself: what might be driving their behaviour? What pressures are they under that I cannot see? What would it be like to be in their position? You do not have to like someone to understand them. In fact, some of the most valuable empathy is directed at difficult people, because understanding their perspective often reveals solutions that conflict and confrontation cannot. If a subcontractor is being obstructive, understanding that they are under enormous time pressure from their own management can change your approach from adversarial to collaborative \u2014 even if you still find them personally difficult.',
  },
  {
    question: 'Does being empathetic mean I have to agree with everyone and be a pushover?',
    answer:
      'Absolutely not. Empathy means understanding how someone feels and why \u2014 it does not mean agreeing with their position or abandoning your own. In fact, empathy combined with assertiveness is one of the most powerful combinations in professional life. You can say: \u201cI understand you are frustrated by the delay, and I appreciate how important this timeline is to you. However, rushing this installation would compromise safety and quality, so we need to stick to the revised schedule.\u201d That response is empathetic (acknowledges their frustration), assertive (maintains your position), and professional (explains the reasoning). Empathy without assertiveness can lead to people-pleasing and resentment. Assertiveness without empathy can lead to conflict and damaged relationships. The combination produces firm, fair, human interaction.',
  },
  {
    question:
      'Do cultural differences mean empathy works differently with people from other backgrounds?',
    answer:
      'The core emotions \u2014 happiness, sadness, anger, fear, surprise, disgust, contempt \u2014 are universal and recognised across all cultures (Ekman\u2019s research confirms this). However, the way people express emotions, the situations that trigger them, and the social rules around displaying them vary significantly between cultures. For example, direct eye contact is a sign of respect and engagement in British culture but can be considered aggressive or disrespectful in some East Asian and Middle Eastern cultures. On a diverse UK construction site, the best approach is to combine universal emotional awareness (reading facial expressions, tone of voice) with cultural humility \u2014 acknowledging that you may not fully understand someone\u2019s cultural context and being willing to learn. When in doubt, ask respectful questions rather than making assumptions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is NOT one of Goleman\u2019s empathy competencies?',
    options: [
      'Understanding others',
      'Service orientation',
      'Emotional regulation',
      'Political awareness',
    ],
    correctAnswer: 2,
    explanation:
      'Goleman\u2019s five empathy competencies are: understanding others, developing others, service orientation, leveraging diversity, and political awareness. Emotional regulation belongs to the self-regulation domain, not the empathy domain. Empathy is about understanding others; self-regulation is about managing yourself.',
  },
  {
    id: 2,
    question: 'Cognitive empathy is best described as:',
    options: [
      'Feeling the same emotions as another person',
      'Understanding what someone thinks and feels without necessarily feeling it yourself',
      'Automatically crying when someone else cries',
      'Agreeing with another person\u2019s point of view',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive empathy (sometimes called perspective-taking) is the ability to understand someone else\u2019s mental state \u2014 what they think, feel and believe \u2014 without necessarily experiencing those emotions yourself. It is a mental skill rather than an emotional response, and it is essential for effective communication and negotiation.',
  },
  {
    id: 3,
    question: 'According to Brene Brown, what is the key difference between empathy and sympathy?',
    options: [
      'Empathy is stronger than sympathy',
      'Sympathy requires more emotional intelligence than empathy',
      'Empathy fuels connection; sympathy drives disconnection',
      'There is no meaningful difference between them',
    ],
    correctAnswer: 2,
    explanation:
      'Brene Brown\u2019s research shows that empathy fuels connection by helping people feel understood and validated, while sympathy drives disconnection by creating distance. Empathy says \u201cI understand how you feel\u201d; sympathy says \u201cat least it\u2019s not worse.\u201d The former creates closeness; the latter creates distance, even when well-intentioned.',
  },
  {
    id: 4,
    question: 'Mirror neurons are significant for empathy because:',
    options: [
      'They allow us to literally mirror the physical appearance of others',
      'They fire both when we perform an action and when we observe someone else performing it, helping us understand others\u2019 emotions',
      'They are only found in humans, proving empathy is a uniquely human trait',
      'They can be surgically enhanced to increase empathy',
    ],
    correctAnswer: 1,
    explanation:
      'Mirror neurons, discovered by Giacomo Rizzolatti, fire both when we perform an action and when we observe the same action in others. This means that when you see someone in pain, some of the same neural circuits activate in your brain as if you were experiencing that pain yourself. This provides a neurological basis for emotional empathy \u2014 we literally share, at a neural level, some of the experiences of those around us.',
  },
  {
    id: 5,
    question:
      'An apprentice fails their practical assessment and is visibly upset. Which response best demonstrates compassionate empathy?',
    options: [
      '"Don\u2019t worry, it\u2019s not the end of the world." (Minimising)',
      '"I failed mine too, so I know how it feels. Let me help you prepare for the resit." (Understanding + feeling + action)',
      '"You should have studied harder." (Judgement)',
      '"Just forget about it and move on." (Dismissal)',
    ],
    correctAnswer: 1,
    explanation:
      'Compassionate empathy combines understanding (\u201cI know how it feels\u201d), shared emotion (drawing on your own experience of failure), and action (\u201clet me help you prepare\u201d). The other responses either minimise, judge or dismiss the apprentice\u2019s emotional experience. Compassionate empathy validates the emotion and then does something constructive about it.',
  },
  {
    id: 6,
    question: 'Goleman\u2019s \u201cpolitical awareness\u201d empathy competency refers to:',
    options: [
      'Understanding national politics and voting patterns',
      'Reading the power dynamics, relationships, and unspoken rules within a group or organisation',
      'Being careful about what you say in public',
      'Supporting your colleagues in union activities',
    ],
    correctAnswer: 1,
    explanation:
      'Political awareness in Goleman\u2019s model means the ability to read the power dynamics, key relationships, and unspoken rules that operate within a team, organisation or industry. On a construction site, this means understanding who has influence (formal and informal), how decisions really get made, and which relationships matter most \u2014 skills that are essential for navigating complex multi-trade projects.',
  },
  {
    id: 7,
    question: 'Which statement about empathy and safety is best supported by research?',
    options: [
      'Empathy is irrelevant to safety \u2014 only procedures and PPE matter',
      'Empathetic teams tend to have fewer accidents because members notice when colleagues are distracted or unfit to work safely',
      'Empathy makes sites less safe because people become too cautious',
      'Safety and empathy are completely separate domains',
    ],
    correctAnswer: 1,
    explanation:
      'Research on psychological safety (Amy Edmondson, Harvard) shows that teams where members feel safe to speak up about concerns, where people notice and respond to each other\u2019s emotional states, and where there is genuine care for each other\u2019s wellbeing have significantly fewer accidents and near-misses. Empathy enables people to notice when a colleague is not in a fit state to work safely \u2014 something that no procedure or piece of PPE can do.',
  },
  {
    id: 8,
    question: 'Which of Brene Brown\u2019s examples best illustrates sympathy (NOT empathy)?',
    options: [
      '"That sounds really difficult. I\u2019m here for you."',
      '"At least you still have your health."',
      '"I understand why you feel that way."',
      '"Tell me more about what happened."',
    ],
    correctAnswer: 1,
    explanation:
      '\u201cAt least...\u201d statements are classic sympathy responses. They attempt to find a silver lining in someone\u2019s suffering, which has the effect of minimising their pain and creating emotional distance. Brown specifically identifies \u201cat least\u201d as a hallmark of sympathy. The empathetic responses acknowledge the difficulty, invite connection, and validate the person\u2019s experience without trying to fix it or make it seem less bad.',
  },
];

export default function EIModule4Section3() {
  useSEO({
    title: 'Understanding Empathy | EI Module 4.3',
    description:
      "Goleman's empathy competencies, three types of empathy, empathy vs sympathy, mirror neurons, Brene Brown's research, and empathy as a safety tool in construction.",
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
            <Link to="../ei-module-4">
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
            <Heart className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Understanding Empathy
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why empathy is a professional competency, not a soft luxury &mdash; and how it directly
            impacts safety, teamwork and career success in construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Goleman:</strong> 5 empathy competencies that apply directly to construction
                work
              </li>
              <li>
                <strong>Three types:</strong> Cognitive, emotional, and compassionate empathy
              </li>
              <li>
                <strong>Brene Brown:</strong> Empathy fuels connection; sympathy drives
                disconnection
              </li>
              <li>
                <strong>Mirror neurons:</strong> Empathy is partially hardwired but fully
                developable
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Empathetic teams notice when colleagues are unfit to work
                safely
              </li>
              <li>
                <strong>Teams:</strong> Empathy reduces conflict, builds trust and improves
                coordination
              </li>
              <li>
                <strong>Clients:</strong> Understanding client emotions leads to better
                relationships and repeat work
              </li>
              <li>
                <strong>Mental health:</strong> Empathetic teams create psychological safety
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'List and explain Goleman\u2019s five empathy competencies with construction examples',
              'Distinguish between cognitive, emotional and compassionate empathy',
              'Apply Brene Brown\u2019s empathy vs sympathy framework to workplace scenarios',
              'Explain the role of mirror neurons in empathy and emotional contagion',
              'Describe how empathy functions as a safety tool on construction sites',
              'Identify strategies for developing empathy without experiencing empathy fatigue',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Goleman's Empathy Competencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Goleman&rsquo;s Empathy Competencies
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In Goleman&rsquo;s five-domain model of emotional intelligence, empathy occupies the
                fourth position &mdash; after self-awareness, self-regulation and motivation. It
                represents the point where emotional intelligence shifts from being inward-facing
                (understanding and managing yourself) to outward-facing (understanding and
                influencing others). Empathy is the bridge between internal emotional competence and
                external social skill.
              </p>

              <p>
                Goleman was careful to position empathy not as a soft, sentimental quality but as a{' '}
                <strong>professional competency</strong> with measurable impact on performance,
                leadership and organisational outcomes. His research showed that empathy is
                consistently one of the strongest predictors of leadership effectiveness across
                industries and cultures.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Goleman on Empathy:</strong>{' '}
                  <em>
                    &ldquo;Empathy represents the foundation skill for all the social competencies
                    important for work. These include understanding others, service orientation,
                    developing others, leveraging diversity, and political awareness.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                Goleman identified <strong>five specific empathy competencies</strong>. Each one
                represents a distinct facet of the ability to understand and respond to other
                people&rsquo;s emotions, needs and perspectives:
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Understanding Others</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Sensing other people&rsquo;s feelings and perspectives, and taking an active
                    interest in their concerns. This is the foundation of empathy &mdash; the
                    ability to accurately read what someone is feeling, even when they have not said
                    it explicitly.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Noticing that a
                      subcontractor is unusually terse in their responses and recognising that they
                      may be under pressure from their own management, rather than assuming they are
                      being rude. Reading the frustration in a client&rsquo;s voice before they
                      explicitly complain. Sensing that an apprentice is embarrassed to ask for help
                      and proactively offering guidance.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Developing Others</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Sensing what others need in order to develop and bolstering their abilities.
                    This competency is particularly relevant for anyone who supervises, mentors or
                    trains other people &mdash; which includes most experienced electricians working
                    with apprentices.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Recognising that an
                      apprentice learns better by doing than by watching, and adjusting your
                      teaching style accordingly. Noticing when someone is ready for a greater
                      challenge and giving them the opportunity. Providing feedback that is honest
                      but encouraging &mdash; because you understand how criticism lands emotionally
                      and you want the person to grow, not shrink.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Service Orientation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Anticipating, recognising and meeting customers&rsquo; needs. Service
                    orientation means understanding your client&rsquo;s perspective deeply enough to
                    deliver not just what they asked for, but what they actually need.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Recognising that a
                      domestic client who keeps asking questions is not being difficult &mdash; they
                      are anxious about having strangers in their home and want reassurance. The
                      electrician who anticipates this, explains what they are doing at each stage,
                      and leaves the workspace tidy is demonstrating service orientation through
                      empathy.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Leveraging Diversity</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Cultivating opportunities through diverse people. This competency involves
                    recognising that different perspectives, backgrounds and experiences are assets
                    rather than obstacles, and actively creating an environment where diverse voices
                    are heard and valued.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Recognising that the
                      Romanian plumber, the Nigerian plasterer and the Polish electrician each bring
                      different approaches and ideas that can improve the project. Creating an
                      environment where people feel comfortable sharing suggestions regardless of
                      their background, nationality or role. Understanding that diversity of
                      perspective leads to better problem-solving.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Political Awareness</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Reading the emotional currents and power relationships within a group. Political
                    awareness means understanding who has influence (formal and informal), how
                    decisions are really made, and what the unspoken rules and allegiances are
                    within a team or organisation.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Understanding that the
                      site foreman and the quantity surveyor have a difficult history, and
                      navigating that dynamic carefully when you need approval from both.
                      Recognising that the main contractor&rsquo;s project manager is under pressure
                      from their directors and adjusting your approach accordingly. Reading the room
                      at a site meeting and sensing when to push your point and when to hold back.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Three Types of Empathy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Three Types of Empathy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Modern psychology distinguishes between three distinct types of empathy. Each
                involves a different cognitive and emotional process, each has different strengths
                and limitations, and each is suited to different situations. Understanding all three
                allows you to choose the most appropriate empathic response for any given scenario.
              </p>

              <div className="grid gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      1. Cognitive Empathy (Perspective-Taking)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The ability to understand what another person is thinking and feeling{' '}
                    <strong>without necessarily feeling it yourself</strong>. Cognitive empathy is
                    intellectual rather than emotional &mdash; you are taking someone&rsquo;s
                    perspective, seeing the world through their eyes, without your own emotions
                    being activated.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded mb-2">
                    <p className="text-sm text-white">
                      <strong>Strengths:</strong> Allows clear-headed analysis. Useful in
                      negotiations, conflict resolution and decision-making where emotional
                      involvement might cloud judgement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded mb-2">
                    <p className="text-sm text-white">
                      <strong>Limitations:</strong> Can feel cold or detached. Without emotional
                      connection, people may sense that you understand them intellectually but do
                      not really care.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A subcontractor is pushing
                      back against your cable route, insisting their ductwork was there first. Using
                      cognitive empathy, you understand their position: they have already installed
                      their system, rerouting would cost them time and money, and they feel
                      territorial about their work. Understanding this helps you negotiate a
                      solution that works for both trades, without getting emotionally drawn into
                      the conflict.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      2. Emotional Empathy (Affective Empathy)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The ability to actually <strong>feel what someone else is feeling</strong>. When
                    someone shares their distress and you feel a pang of their pain in your own
                    chest, that is emotional empathy. It is automatic, physiological and deeply
                    human &mdash; driven in part by the mirror neuron system.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded mb-2">
                    <p className="text-sm text-white">
                      <strong>Strengths:</strong> Creates genuine emotional connection. People feel
                      truly understood when they sense that you share their emotional experience. It
                      is the foundation of deep trust and bonding.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded mb-2">
                    <p className="text-sm text-white">
                      <strong>Limitations:</strong> Can be overwhelming. Absorbing other
                      people&rsquo;s emotions constantly is exhausting and can lead to empathy
                      fatigue or burnout. It can also impair decision-making if you are too
                      emotionally involved to think clearly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> An apprentice has just
                      been told they failed their practical assessment and is visibly devastated.
                      You remember the feeling from your own apprenticeship &mdash; the shame, the
                      self-doubt, the fear of letting people down. That remembered emotion rises in
                      you, and the apprentice can see in your face that you genuinely understand
                      what they are going through. This emotional connection creates trust.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HandHeart className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      3. Compassionate Empathy (Empathic Concern)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The fullest form of empathy. Compassionate empathy combines cognitive
                    understanding with emotional feeling and adds a third element:{' '}
                    <strong>being moved to help</strong>. You understand the person&rsquo;s
                    perspective, you feel their emotion, and you are compelled to take action to
                    support them.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded mb-2">
                    <p className="text-sm text-white">
                      <strong>Strengths:</strong> The most complete and most valued form of empathy.
                      It combines understanding, feeling and action. People who receive
                      compassionate empathy feel deeply cared for and supported.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded mb-2">
                    <p className="text-sm text-white">
                      <strong>Limitations:</strong> Requires the most emotional energy. Needs to be
                      balanced with self-care and boundaries to be sustainable over time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A colleague is going
                      through a divorce and is struggling to concentrate at work. You understand the
                      strain they are under (cognitive), you feel for them because you have been
                      through something similar (emotional), and you offer to take on some of their
                      more demanding tasks for the week to take the pressure off (compassionate
                      action). This is compassionate empathy in its fullest expression.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical Guidance:</strong> The most effective
                  approach is to use all three types flexibly depending on the situation. Use
                  cognitive empathy as your default mode at work &mdash; it allows you to understand
                  others without becoming emotionally drained. Engage emotional empathy when deeper
                  connection is needed &mdash; with apprentices, close colleagues, and in moments of
                  genuine distress. Practise compassionate empathy when someone needs tangible
                  support &mdash; turning understanding into action.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Empathy vs Sympathy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Empathy vs Sympathy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Brene Brown</strong>, a research professor at the University of Houston, has
                spent over two decades studying vulnerability, courage, shame and empathy. Her work
                has transformed how millions of people understand the difference between empathy and
                sympathy &mdash; two concepts that are often confused but produce fundamentally
                different outcomes.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Brene Brown:</strong>{' '}
                  <em>
                    &ldquo;Empathy fuels connection. Sympathy drives disconnection. Empathy is
                    feeling <strong>with</strong> people. Sympathy is feeling <strong>for</strong>{' '}
                    people &mdash; and there is a huge difference.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                Brown uses a powerful metaphor to illustrate the difference. Imagine someone is
                stuck at the bottom of a deep hole:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Empathy</p>
                  <p className="text-sm text-white mb-2">
                    You climb down into the hole with them. You sit beside them in the dark and say:{' '}
                    <em>&ldquo;I know what it is like down here, and you are not alone.&rdquo;</em>
                  </p>
                  <p className="text-xs text-white">
                    <strong>Effect:</strong> The person feels understood, connected and less alone.
                    Empathy does not try to fix the problem &mdash; it provides human connection in
                    the midst of difficulty.
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Sympathy</p>
                  <p className="text-sm text-white mb-2">
                    You stand at the top of the hole, look down and say:{' '}
                    <em>&ldquo;Oh, that looks bad. At least you did not fall further.&rdquo;</em>
                  </p>
                  <p className="text-xs text-white">
                    <strong>Effect:</strong> The person feels judged, minimised and more alone.
                    Sympathy maintains a safe distance from the other person&rsquo;s pain, which
                    creates disconnection even when the intention is kind.
                  </p>
                </div>
              </div>

              <p>
                Brown identifies several hallmarks of sympathy that distinguish it from empathy:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sympathy Responses (What NOT to Say)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;At least...&rdquo;</strong> &mdash; &ldquo;At least nobody was
                      hurt&rdquo;, &ldquo;at least you still have a job&rdquo;, &ldquo;at least it
                      could have been worse.&rdquo; The &ldquo;at least&rdquo; construction tries to
                      find a silver lining in the person&rsquo;s suffering, which minimises their
                      pain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;Cheer up...&rdquo;</strong> &mdash; &ldquo;Cheer up, it is not
                      the end of the world.&rdquo; This dismisses the person&rsquo;s emotional
                      reality and implies that their feelings are disproportionate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;I know how you feel, but...&rdquo;</strong> &mdash; Adding
                      &ldquo;but&rdquo; after claiming to understand undermines the empathy
                      entirely. Whatever comes after &ldquo;but&rdquo; is what the person actually
                      hears.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;You should...&rdquo;</strong> &mdash; Jumping straight to
                      advice before the person has been heard. This signals that you want to fix the
                      problem (for your own comfort) rather than be present with them in it.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Empathy Responses (What TO Say)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;That sounds really difficult.&rdquo;</strong> &mdash; Validates
                      their experience without minimising or fixing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;I can see this has really affected you.&rdquo;</strong> &mdash;
                      Shows that you have perceived their emotional state.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;Thank you for telling me.&rdquo;</strong> &mdash; Acknowledges
                      the vulnerability required to share something difficult.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>&ldquo;I am here. What do you need?&rdquo;</strong> &mdash; Offers
                      presence and lets the person determine what kind of support they want.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Colleague&rsquo;s Near-Miss
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A colleague narrowly avoids a serious injury when a scaffold board falls near
                  them. They are shaking and clearly shaken. Two responses:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">Sympathetic Response</p>
                    <p className="text-sm text-white">
                      &ldquo;That was close! At least it missed you. Come on, these things happen on
                      site. You will be fine in five minutes.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      <strong>Effect:</strong> Minimises the experience. The colleague feels their
                      fear is being dismissed, so they suppress it rather than processing it. They
                      go back to work still shaken but now also embarrassed for being
                      &ldquo;soft.&rdquo;
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">Empathetic Response</p>
                    <p className="text-sm text-white">
                      &ldquo;Bloody hell, that must have given you a fright. Let us sit down for a
                      minute. Are you alright?&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      <strong>Effect:</strong> Validates the experience. The colleague feels heard
                      and supported. They take a few minutes to calm down, report the near-miss
                      properly, and return to work once they have genuinely recovered. The near-miss
                      gets reported and addressed.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The safety implications are significant. In the sympathetic scenario, the near-miss
                goes unreported because the colleague feels their reaction was &ldquo;over the
                top.&rdquo; In the empathetic scenario, the near-miss gets reported, the hazard gets
                addressed, and future incidents are prevented. Empathy is not just kinder &mdash; it
                produces better outcomes.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Mirror Neurons and the Science of Empathy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Mirror Neurons and the Science of Empathy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In the early 1990s, Italian neuroscientist <strong>Giacomo Rizzolatti</strong> and
                his team at the University of Parma made one of the most significant discoveries in
                modern neuroscience &mdash; by accident. While studying the motor cortex of macaque
                monkeys, they noticed something extraordinary: certain neurons fired not only when
                the monkey performed an action (like grasping food) but also when the monkey{' '}
                <strong>observed someone else performing the same action</strong>.
              </p>

              <p>
                These neurons were named <strong>mirror neurons</strong>, and their discovery
                revolutionised our understanding of empathy, imitation, language learning and social
                cognition. Mirror neurons effectively mean that when you watch someone else do
                something, your brain partially simulates the experience as if you were doing it
                yourself.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How Mirror Neurons Create Empathy
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Mirror neurons provide a neurological mechanism for emotional empathy. When you
                  see someone in pain, the same pain circuits in your brain partially activate. When
                  you see someone smile, the neural circuits for smiling activate in your brain.
                  This is why:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Yawning is contagious</strong> &mdash; seeing someone yawn triggers
                      the yawning circuits in your brain (and people with higher empathy are more
                      susceptible to contagious yawning)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Emotions are contagious</strong> &mdash; being around anxious people
                      makes you feel anxious; being around calm people helps you feel calm (this is
                      called emotional contagion)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>You wince when you see someone get hurt</strong> &mdash; the pain
                      circuits in your brain mirror what you observe, producing a shadow of the
                      other person&rsquo;s experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>A leader&rsquo;s mood spreads</strong> &mdash; research shows that a
                      team leader&rsquo;s emotional state is disproportionately contagious,
                      affecting the mood and performance of the entire team
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The implications for construction work are significant. Emotional contagion means
                that the mood of a site is not just a coincidence &mdash; it is the product of the
                emotional states of the people on it, particularly those in leadership positions. A
                calm, focused foreman creates a calm, focused team. An anxious, irritable foreman
                creates an anxious, irritable team. This is not just anecdotal &mdash; it is
                neuroscience.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Implications for Leadership and Teamwork
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Your Mood Sets the Tone</p>
                      <p className="text-sm text-white">
                        If you are a supervisor, team leader, or the most experienced person on
                        site, your emotional state has an outsized impact on everyone around you.
                        Mirror neurons mean that your team literally catches your emotions. This is
                        not about faking positivity &mdash; it is about managing your own emotional
                        state because you understand its impact on others.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Empathy Can Be Strengthened</p>
                      <p className="text-sm text-white">
                        Although mirror neurons are innate, their effectiveness can be enhanced
                        through practice. People who regularly practise empathy &mdash; actively
                        trying to understand others, paying attention to emotional cues, reflecting
                        on how others feel &mdash; strengthen the neural pathways that support
                        empathic responses. Empathy is partially hardwired but fully developable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Environment Matters</p>
                      <p className="text-sm text-white">
                        Stressful, hostile environments suppress empathic responses. When people
                        feel threatened, the brain shifts into self-protection mode and empathy
                        decreases. Creating a psychologically safe environment &mdash; where people
                        feel valued and unthreatened &mdash; promotes empathic engagement. This is
                        why site culture matters so much.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> The discovery of mirror
                  neurons settled a long-standing debate: empathy is not just a cultural norm or a
                  social nicety &mdash; it is a fundamental feature of the human brain. We are{' '}
                  <strong>wired for connection</strong>. The question is not whether you have the
                  capacity for empathy (you do &mdash; it is built into your neural architecture)
                  but whether you develop and use that capacity deliberately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Empathy as a Safety Tool */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Empathy as a Safety Tool
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction consistently ranks among the most dangerous industries in the UK.
                Slips, trips and falls, electrocution, struck-by incidents, and musculoskeletal
                injuries are daily risks. The industry has invested billions in safety procedures,
                PPE, training and regulations &mdash; and these are essential. But there is a
                dimension of safety that no procedure can fully address: the{' '}
                <strong>human element</strong>.
              </p>

              <p>
                Research by <strong>Amy Edmondson</strong> at Harvard Business School on
                psychological safety has shown that teams where members feel safe to speak up, where
                people look out for each other, and where there is genuine care for each
                other&rsquo;s wellbeing have significantly fewer accidents and near-misses. Empathy
                is the skill that makes this kind of team culture possible.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">How Empathy Improves Safety</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Reading When Someone Is Not Fit to Work Safely
                      </p>
                      <p className="text-sm text-white">
                        An empathetic colleague notices that someone is distracted, fatigued, or
                        emotionally distressed before an accident happens. They might notice that a
                        colleague who is normally sharp and attentive is making unusual mistakes, or
                        that someone who had a rough night is not fully present. No safety procedure
                        can detect this &mdash; only human empathy can.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Creating Psychological Safety
                      </p>
                      <p className="text-sm text-white">
                        Edmondson&rsquo;s research shows that people only report near-misses and
                        safety concerns when they feel psychologically safe &mdash; when they
                        believe they will not be ridiculed, blamed or punished for speaking up.
                        Empathetic leaders and team members create this safety by responding to
                        reports with gratitude and genuine concern rather than criticism or
                        dismissal.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Checking In After Incidents</p>
                      <p className="text-sm text-white">
                        After a near-miss or incident, empathetic teams check in with the people
                        involved &mdash; not just to complete the paperwork but to genuinely ask how
                        they are doing. Unprocessed emotional trauma from near-misses can lead to
                        hypervigilance, avoidance, or recklessness &mdash; all of which increase
                        future risk. Empathetic follow-up helps people process the experience and
                        return to work mentally prepared.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Understanding Pressure Points
                      </p>
                      <p className="text-sm text-white">
                        Empathy helps you understand when someone is being pushed too hard &mdash;
                        working too many hours, dealing with personal problems that affect
                        concentration, or feeling pressured to cut corners. An empathetic supervisor
                        recognises these pressure points before they result in an accident and takes
                        action to address them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Examples: Empathy Preventing Accidents
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Noticing a Distracted Colleague
                      </p>
                      <p className="text-sm text-white">
                        An electrician notices that their workmate, who is normally meticulous, has
                        been making small errors all morning and seems distant. Rather than
                        criticising the mistakes, they quietly ask: &ldquo;Everything alright? You
                        seem a bit off today.&rdquo; It turns out the colleague received bad news
                        from the hospital the night before. Together, they agree that the colleague
                        should do less safety-critical tasks until they are in a better headspace.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Checking In After a Near-Miss
                      </p>
                      <p className="text-sm text-white">
                        After a near-miss involving a live cable, the supervisor not only files the
                        report but sits down with the electrician involved over a cup of tea. They
                        ask how they are feeling, listen without judgement, and arrange for someone
                        to work alongside them for the rest of the day. The electrician feels
                        supported rather than blamed, reports honestly what happened, and the root
                        cause is identified and corrected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Bottom Line:</strong> Safety procedures
                  protect against known, predictable risks. Empathy protects against the
                  unpredictable human factors that no procedure can anticipate. A truly safe site
                  needs both: rigorous procedures AND a culture of empathetic awareness. One without
                  the other leaves gaps that accidents exploit.
                </p>
              </div>
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
                Empathy is a <strong>skill</strong>, not just a feeling &mdash; and it directly
                impacts safety, team performance, client relationships and career progression. It is
                one of the most powerful competencies you can develop, and understanding its
                different forms allows you to deploy it effectively in every professional situation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Summary of Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Goleman:</strong> Five empathy competencies &mdash; understanding
                      others, developing others, service orientation, leveraging diversity,
                      political awareness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Three types:</strong> Cognitive (understand), emotional (feel),
                      compassionate (understand + feel + act)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Brene Brown:</strong> Empathy connects; sympathy disconnects &mdash;
                      avoid &ldquo;at least&rdquo; and &ldquo;cheer up&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Mirror neurons:</strong> Empathy is neurologically hardwired but
                      strengthened through practice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Safety:</strong> Empathy is the human layer of safety that procedures
                      alone cannot provide
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Coming Next: Reading People &amp; Perspective-Taking
                  </p>
                </div>
                <p className="text-sm text-white">
                  In Section 4, you will develop the practical skills of empathy: reading
                  micro-expressions, interpreting body language, practising active listening, and
                  stepping into other people&rsquo;s perspectives. These are the tools that turn
                  empathetic understanding into empathetic action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Optimism &amp; Resilience
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-4-section-4">
              Reading People &amp; Perspective-Taking
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
