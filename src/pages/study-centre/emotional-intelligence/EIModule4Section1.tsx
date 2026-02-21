import {
  ArrowLeft,
  Flame,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Target,
  Zap,
  TrendingUp,
  Battery,
  Compass,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'motivation-goleman',
    question: 'Which of the following is NOT one of Goleman\u2019s four motivation competencies?',
    options: ['Achievement drive', 'Commitment', 'Conscientiousness', 'Optimism'],
    correctIndex: 2,
    explanation:
      'Goleman\u2019s four motivation competencies are achievement drive, commitment, initiative, and optimism. Conscientiousness is a personality trait from the Big Five model, not one of Goleman\u2019s motivation competencies.',
  },
  {
    id: 'motivation-pink',
    question: 'What are the three elements of Daniel Pink\u2019s Drive model?',
    options: [
      'Money, status, power',
      'Autonomy, mastery, purpose',
      'Competence, relatedness, safety',
      'Achievement, affiliation, influence',
    ],
    correctIndex: 1,
    explanation:
      'Daniel Pink\u2019s Drive model identifies autonomy (directing your own work), mastery (getting better at something that matters), and purpose (serving something larger than yourself) as the three core elements of intrinsic motivation.',
  },
  {
    id: 'motivation-flow',
    question: 'What is the key condition for entering a flow state according to Csikszentmihalyi?',
    options: [
      'Working under extreme pressure',
      'Having no distractions whatsoever',
      'A balance between the challenge and your skill level',
      'Working alone without interruption',
    ],
    correctIndex: 2,
    explanation:
      'Csikszentmihalyi\u2019s research shows that flow occurs when the challenge of the task is well matched to your skill level. Too easy and you become bored; too hard and you become anxious. The sweet spot between the two is where flow happens.',
  },
];

const faqs = [
  {
    question: 'What should I do when my motivation fades completely?',
    answer:
      'Motivation naturally fluctuates \u2014 nobody is driven every single day. When motivation fades, reconnect with your purpose: why did you choose this trade in the first place? What does a successful career mean for you and your family? Research by Teresa Amabile at Harvard shows that the most powerful motivator is a sense of progress \u2014 making meaningful headway on work that matters. So when motivation is low, focus on completing one small, meaningful task. Finishing even a minor task can reignite your sense of momentum. Also check your basic needs: are you getting enough sleep, eating properly, and staying physically active? Motivation is as much physiological as it is psychological. If low motivation persists for weeks, it may be worth speaking to someone you trust, as prolonged amotivation can be a sign of burnout or depression.',
  },
  {
    question: 'Is money a bad motivator? I work to earn a living.',
    answer:
      'Money is not a bad motivator \u2014 it is a necessary one. Daniel Pink is clear on this point: pay must be fair and sufficient before intrinsic motivators become effective. If you are worrying about paying the bills, autonomy and mastery are secondary concerns. The research shows that once pay meets a fair threshold (what Pink calls "baseline rewards"), additional money produces diminishing returns on motivation and satisfaction. Beyond that threshold, intrinsic motivators \u2014 doing work you find meaningful, developing your skills, having some control over how you work \u2014 become far more powerful drivers of sustained performance and wellbeing. So money matters, but it is not enough on its own to keep you engaged and fulfilled over a 30- or 40-year career.',
  },
  {
    question: 'Can you experience flow doing repetitive electrical tasks?',
    answer:
      'Yes, but it requires adjusting either the challenge or your approach. Csikszentmihalyi found that flow can occur in any activity when the challenge-skill balance is right. For repetitive tasks, you can increase the challenge by setting personal goals: can you complete this run of cabling more efficiently than last time? Can you achieve a cleaner, neater finish? Can you develop a technique that saves five minutes per circuit? Experienced electricians often describe entering flow during intricate work like terminating a complex distribution board or wiring a sophisticated lighting control system. The key is to find the element of challenge within the task \u2014 because when you are working on autopilot with zero engagement, you are in the boredom zone, not the flow zone, and that is when mistakes happen.',
  },
  {
    question: 'How can I motivate other people on my team?',
    answer:
      'The research consistently shows that you cannot force intrinsic motivation onto someone else, but you can create conditions that make it more likely to emerge. Using Pink\u2019s framework: give people as much autonomy as possible (let them plan their own work sequence where practical), support their mastery (invest in their training, give constructive feedback, celebrate skill development), and connect their work to purpose (help them see how their contribution matters to the overall project and to the people who will use the building). Using Self-Determination Theory: support their need for competence (set achievable challenges, provide feedback), autonomy (involve them in decisions), and relatedness (foster team connection, show genuine interest in them as people). Most importantly, model the motivation you want to see \u2014 your own enthusiasm and drive are contagious.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following best describes Goleman\u2019s "achievement drive" competency?',
    options: [
      'The desire to earn the highest salary possible',
      'Striving to improve or meet a standard of excellence',
      'Competing against colleagues to win recognition',
      'Working the longest hours on the team',
    ],
    correctAnswer: 1,
    explanation:
      'Achievement drive in Goleman\u2019s model is about striving to improve or meet a standard of excellence. It is internally referenced \u2014 you are measuring yourself against your own standards and constantly pushing to be better. It is not about external competition or working excessive hours.',
  },
  {
    id: 2,
    question: 'According to Daniel Pink, carrot-and-stick motivation is most effective for:',
    options: [
      'Complex creative problem-solving',
      'Routine, algorithmic tasks',
      'Leadership and management roles',
      'All types of work equally',
    ],
    correctAnswer: 1,
    explanation:
      'Pink\u2019s research shows that traditional if-then rewards (carrot-and-stick) work reasonably well for routine, algorithmic tasks where the steps are clear and straightforward. However, for complex tasks requiring creativity, problem-solving and judgement, these external motivators can actually reduce performance. Most electrical work falls somewhere between routine and complex.',
  },
  {
    id: 3,
    question: 'In Self-Determination Theory, the three basic psychological needs are:',
    options: [
      'Safety, belonging, esteem',
      'Autonomy, competence, relatedness',
      'Achievement, power, affiliation',
      'Survival, reproduction, status',
    ],
    correctAnswer: 1,
    explanation:
      'Deci and Ryan\u2019s Self-Determination Theory identifies three basic psychological needs: autonomy (feeling in control of your own behaviour and goals), competence (feeling effective and capable), and relatedness (feeling connected to others). When all three are satisfied, intrinsic motivation flourishes.',
  },
  {
    id: 4,
    question: 'Which researcher is most closely associated with the concept of flow states?',
    options: ['Daniel Goleman', 'Martin Seligman', 'Mihaly Csikszentmihalyi', 'Daniel Pink'],
    correctAnswer: 2,
    explanation:
      'Mihaly Csikszentmihalyi (pronounced "chick-sent-me-hi") is the psychologist who identified and named the concept of flow. His research, beginning in the 1970s, studied artists, athletes, surgeons and others who described losing themselves in their work when challenge and skill were perfectly balanced.',
  },
  {
    id: 5,
    question:
      'An electrician who takes initiative to suggest a better cable route is demonstrating which Goleman motivation competency?',
    options: ['Achievement drive', 'Commitment', 'Initiative', 'Optimism'],
    correctAnswer: 2,
    explanation:
      'Initiative is the motivation competency defined as readiness to act on opportunities. The electrician is not just doing what they were told \u2014 they are proactively identifying a better approach and bringing it forward. This demonstrates initiative: seeing an opportunity and acting on it rather than waiting to be directed.',
  },
  {
    id: 6,
    question: 'Which of the following is a characteristic of flow states?',
    options: [
      'Heightened awareness of time passing',
      'Constant self-monitoring and self-criticism',
      'Complete focus with a sense of effortless action',
      'Working under extreme stress and pressure',
    ],
    correctAnswer: 2,
    explanation:
      'Flow is characterised by complete focus, a sense of effortless action (even in demanding tasks), time distortion (usually time seems to pass quickly), and intrinsic reward \u2014 the activity itself becomes deeply satisfying. Self-monitoring and self-criticism actually prevent flow from occurring.',
  },
  {
    id: 7,
    question: 'Teresa Amabile\u2019s research found that the most powerful workplace motivator is:',
    options: [
      'Financial bonuses and incentives',
      'Public recognition from managers',
      'Making meaningful progress on important work',
      'Having the most advanced tools and equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Teresa Amabile\u2019s research at Harvard Business School, documented in "The Progress Principle", found that making meaningful progress on work that matters is the single most powerful motivator in everyday working life. Even small wins can significantly boost motivation, engagement and positive emotions.',
  },
  {
    id: 8,
    question: 'What is the key difference between intrinsic and extrinsic motivation?',
    options: [
      'Intrinsic motivation is stronger than extrinsic motivation in all situations',
      'Extrinsic motivation comes from within; intrinsic from external rewards',
      'Intrinsic motivation is doing something because it matters to you; extrinsic is doing it for external reward or to avoid punishment',
      'There is no meaningful difference \u2014 both produce the same results',
    ],
    correctAnswer: 2,
    explanation:
      'Intrinsic motivation means engaging in an activity because you find it inherently interesting, enjoyable or meaningful. Extrinsic motivation means doing something for an external reward (money, praise) or to avoid punishment. Research consistently shows that intrinsic motivation leads to greater persistence, higher-quality performance and better wellbeing \u2014 though extrinsic motivators have their place, particularly for tasks that are inherently unenjoyable.',
  },
];

export default function EIModule4Section1() {
  useSEO({
    title: 'Internal Motivation & Drive | EI Module 4.1',
    description:
      "Understanding what drives you from within: Goleman's motivation competencies, Daniel Pink's Drive model, self-determination theory, flow states, and practical strategies for sustaining motivation through challenges.",
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
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Internal Motivation &amp; Drive
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding what drives you from within and how to sustain motivation through
            challenges
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Goleman:</strong> 4 motivation competencies &mdash; achievement drive,
                commitment, initiative, optimism
              </li>
              <li>
                <strong>Pink:</strong> Autonomy, mastery, purpose drive lasting motivation
              </li>
              <li>
                <strong>Key insight:</strong> Intrinsic motivation outperforms extrinsic for
                sustained performance
              </li>
              <li>
                <strong>Flow:</strong> Challenge-skill balance optimises engagement
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Resilience:</strong> Internal motivation sustains you through the tough days
              </li>
              <li>
                <strong>Weather, clients, overruns:</strong> External conditions change &mdash;
                internal drive is constant
              </li>
              <li>
                <strong>Career growth:</strong> Self-motivated electricians progress faster and
                further
              </li>
              <li>
                <strong>Quality:</strong> Intrinsically motivated people produce better work
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'List Goleman\u2019s four motivation competencies (achievement drive, commitment, initiative, optimism)',
              'Explain Daniel Pink\u2019s Drive model and its three elements',
              'Distinguish between intrinsic and extrinsic motivation using Self-Determination Theory',
              'Describe flow states and the conditions that create them',
              'Apply motivation theories to construction work scenarios',
              'Identify personal sources of internal motivation',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Goleman's Motivation Competencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Goleman&rsquo;s Motivation Competencies
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daniel Goleman identified motivation as the fourth domain of emotional intelligence,
                sitting between self-regulation and empathy in his five-domain model. Motivation in
                Goleman&rsquo;s framework is not about external rewards like money, status or
                recognition. It is about <strong>internal drive</strong> &mdash; the emotional
                tendencies that propel you towards your goals even when conditions are difficult,
                progress is slow, and nobody is watching.
              </p>

              <p>
                Goleman argued that emotionally intelligent people are characterised by a deep,
                persistent drive to achieve for the sake of achievement itself. They set challenging
                goals not because someone told them to, but because they have an inner standard of
                excellence that they are constantly striving to meet. This internal quality is what
                separates people who sustain high performance over decades from those who burn
                brightly for a year and then fade.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Goleman on Motivation:</strong>{' '}
                  <em>
                    &ldquo;People with high motivation are driven to achieve beyond expectations
                    &mdash; their own and everyone else&rsquo;s. The key word here is achieve.
                    Plenty of people are motivated by external factors such as a big salary or the
                    status that comes from having an impressive title. By contrast, those with
                    leadership potential are motivated by a deeply embedded desire to achieve for
                    the sake of achievement.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                Goleman identified <strong>four specific competencies</strong> within the motivation
                domain. Each one represents a distinct aspect of internal drive, and together they
                form the emotional engine that powers sustained performance:
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">1. Achievement Drive</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Striving to improve or meet a standard of excellence. People with strong
                    achievement drive set challenging but achievable goals, seek feedback on their
                    performance, and constantly look for ways to do things better. They are not
                    satisfied with &ldquo;good enough&rdquo; &mdash; they want to be excellent.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The electrician who takes
                      real pride in a perfect consumer unit &mdash; cables dressed immaculately,
                      labels clear, everything square and level. They do this not because the
                      inspector will check (though they will) but because their own standard demands
                      it. They compare their work today to their work last year and push to improve.
                      When they see a colleague&rsquo;s particularly neat piece of work, they study
                      it rather than feeling threatened by it.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">2. Commitment</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Aligning with the goals of the group or organisation. People with strong
                    commitment find meaning in the larger mission, make sacrifices for the team, and
                    use the group&rsquo;s core values when making decisions. Commitment connects
                    your individual effort to something bigger than yourself.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The team member who stays
                      an extra thirty minutes to help a colleague finish a critical task, not
                      because they were asked but because they understand that the project needs it.
                      The apprentice who takes their college coursework seriously because they see
                      it as part of becoming a fully qualified electrician, not just a box to tick.
                      The supervisor who puts the team&rsquo;s needs before their own convenience.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">3. Initiative</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Readiness to act on opportunities. People with initiative do not wait to be told
                    what to do. They see what needs doing and they do it. They look ahead,
                    anticipate problems, and take action before being asked. Initiative is proactive
                    rather than reactive &mdash; it is about creating opportunities, not just
                    responding to them.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The electrician who
                      notices that the specified cable route will clash with the HVAC ductwork and
                      proactively suggests an alternative route before it becomes a problem. The
                      apprentice who asks &ldquo;what else can I help with?&rdquo; when their task
                      is finished. The supervisor who identifies a potential delay in materials and
                      arranges delivery before the crew runs out of stock.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">4. Optimism</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Persistence in pursuing goals despite obstacles and setbacks. Optimism in
                    Goleman&rsquo;s model is not about being blindly positive &mdash; it is about
                    maintaining the belief that setbacks are temporary and surmountable. Optimistic
                    people keep working towards their goals when others have given up. They
                    interpret failure as a learning opportunity rather than a permanent verdict on
                    their ability.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The electrician who fails
                      their initial inspection, analyses the faults, corrects them, and passes the
                      re-inspection &mdash; rather than blaming the inspector or questioning the
                      regulations. The business owner who loses a major contract and uses it as a
                      prompt to improve their quoting process rather than concluding that they are
                      not good enough. The apprentice who fails a test, asks for feedback, and
                      studies harder rather than deciding they are &ldquo;not clever enough&rdquo;.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These four competencies work together. Achievement drive provides the engine.
                Commitment gives you direction. Initiative turns intention into action. Optimism
                keeps you going when the road gets rough. Without all four, motivation tends to be
                inconsistent &mdash; you might be ambitious but lack persistence, or be persistent
                but lack initiative. The emotionally intelligent individual cultivates all four
                competencies so that their motivation is both powerful and sustainable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical Reflection:</strong> Think about your
                  own motivation profile. Which of the four competencies is your strongest? Where do
                  you have the most room to develop? Most people in the trades have strong
                  achievement drive (they take pride in their work) but may need to develop
                  initiative or commitment to the broader team goals. Recognising your pattern is
                  the first step to strengthening it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Daniel Pink's Drive Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Daniel Pink&rsquo;s Drive Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2009, Daniel Pink published{' '}
                <em>Drive: The Surprising Truth About What Motivates Us</em>, a landmark book that
                challenged decades of conventional thinking about motivation. Pink drew on more than
                fifty years of behavioural science research to argue that the traditional model of
                motivation &mdash; the carrot-and-stick approach of rewards and punishments &mdash;
                is fundamentally flawed for the type of work most of us do today.
              </p>

              <p>
                Pink identified what he called <strong>Motivation 3.0</strong> &mdash; a third
                operating system for human motivation that goes beyond biological drives (Motivation
                1.0: survival and basic needs) and beyond rewards and punishments (Motivation 2.0:
                the carrot-and-stick). Motivation 3.0 is powered by three innate psychological needs
                that, when satisfied, produce sustained engagement, high performance, and deep
                satisfaction.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Autonomy</p>
                  </div>
                  <p className="text-sm text-white">
                    The desire to direct your own life and work. Autonomy does not mean working in
                    isolation or ignoring instructions &mdash; it means having meaningful choice
                    over how you approach your tasks, when you do them, and which methods you use.
                    It is the difference between being told exactly what to do at every moment and
                    being trusted to figure out the best approach yourself.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Mastery</p>
                  </div>
                  <p className="text-sm text-white">
                    The urge to get better and better at something that matters. Mastery is
                    asymptotic &mdash; you can get closer and closer to it but never fully reach it,
                    which is what makes it endlessly motivating. The pursuit of mastery requires
                    deliberate practice, a willingness to struggle through difficulties, and the
                    mindset that ability is something you build rather than something you are born
                    with.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Purpose</p>
                  </div>
                  <p className="text-sm text-white">
                    The yearning to do what we do in service of something larger than ourselves.
                    Purpose provides context and meaning. It answers the question &ldquo;why does
                    this matter?&rdquo; Without purpose, work becomes mechanical and soulless. With
                    purpose, even difficult tasks become meaningful because they serve something you
                    care about.
                  </p>
                </div>
              </div>

              <p>
                Pink&rsquo;s research was particularly significant because it showed that the
                carrot-and-stick approach &mdash; &ldquo;do this and you will get a bonus; fail and
                you will be punished&rdquo; &mdash; can actually <strong>reduce</strong> performance
                on complex tasks. This is known as the <strong>over-justification effect</strong>:
                when you offer external rewards for something that someone would do anyway, you can
                undermine their intrinsic motivation. The reward becomes the reason for doing the
                task, and when the reward is removed, motivation drops below where it started.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Pink&rsquo;s Three Elements in Action
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      A
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Autonomy: Planning Your Own Work Sequence
                      </p>
                      <p className="text-sm text-white">
                        An experienced electrician on a domestic rewire is given the scope of work
                        and the deadline but is trusted to plan the sequence themselves &mdash;
                        which rooms to start with, how to route the cables, when to take breaks.
                        This autonomy increases their engagement and ownership of the job. Compare
                        this to being micromanaged step by step: same task, same deadline, but far
                        less satisfying and often slower because the electrician has no room to
                        apply their expertise.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      M
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Mastery: Developing Specialist Skills
                      </p>
                      <p className="text-sm text-white">
                        An electrician decides to specialise in EV charger installations. They
                        invest in training, practise the installations, learn the latest
                        regulations, and study the technology. Each installation is better than the
                        last. The pursuit of mastery is endlessly motivating because there is always
                        more to learn &mdash; new charger models, new connection methods, new grid
                        requirements. This ongoing challenge keeps the work interesting year after
                        year.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      P
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Purpose: Connecting to Electrical Safety
                      </p>
                      <p className="text-sm text-white">
                        Every electrical installation you complete protects the people who will live
                        and work in that building. That consumer unit you just fitted will protect a
                        family from electrical fire for decades. That emergency lighting system will
                        guide people to safety when it matters most. When you connect your daily
                        work to its deeper purpose &mdash; keeping people safe &mdash; even the
                        routine tasks carry meaning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Pink emphasises that autonomy, mastery and purpose do not replace fair pay and good
                working conditions. He calls these <strong>baseline rewards</strong>: if pay is not
                fair, if the working environment is unsafe, or if people are treated poorly, then
                these higher-order motivators cannot take root. You must get the basics right first.
                But once the basics are covered, it is autonomy, mastery and purpose &mdash; not
                more money &mdash; that produce the deepest, most sustainable motivation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> Pink&rsquo;s model
                  explains why some highly paid tradespeople are miserable while others earning less
                  are deeply satisfied. If your work gives you autonomy, the opportunity to develop
                  mastery, and a sense of purpose, you will be more motivated and fulfilled than
                  someone earning twice your salary in a role that offers none of those things.
                  Money matters, but it is not enough on its own.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Self-Determination Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Self-Determination Theory
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-Determination Theory (SDT) was developed by psychologists{' '}
                <strong>Edward Deci</strong> and <strong>Richard Ryan</strong> at the University of
                Rochester, beginning in the 1970s and refined over four decades of research. It is
                one of the most widely studied and empirically supported theories of human
                motivation, with over a thousand published studies across cultures, age groups and
                contexts.
              </p>

              <p>
                SDT identifies <strong>three basic psychological needs</strong> that must be
                satisfied for people to be intrinsically motivated, to function optimally, and to
                experience psychological wellbeing. When these needs are met, people naturally
                gravitate towards growth, engagement and high-quality performance. When they are
                thwarted, motivation deteriorates, wellbeing suffers, and performance declines.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Competence</p>
                  </div>
                  <p className="text-sm text-white">
                    The need to feel effective and capable in your interactions with the
                    environment. Competence is about mastering tasks and learning new skills &mdash;
                    feeling that you can handle the challenges in front of you. When competence is
                    satisfied, you feel confident and capable. When it is frustrated, you feel
                    helpless and ineffective.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> An apprentice who receives
                      clear instruction, appropriate challenges, and constructive feedback develops
                      a strong sense of competence. An apprentice who is thrown in at the deep end
                      with no support, criticised for mistakes, and given tasks far beyond their
                      ability has their competence need thwarted &mdash; leading to anxiety,
                      avoidance and poor performance.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Autonomy</p>
                  </div>
                  <p className="text-sm text-white">
                    The need to feel that your behaviour is self-endorsed and volitional &mdash;
                    that you are acting from your own values and interests rather than being
                    controlled by external forces. Autonomy does not mean independence or working
                    alone; it means feeling a sense of choice and ownership over your actions.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A qualified electrician
                      who is given the specification and trusted to execute the work using their
                      professional judgement feels autonomous. The same electrician who is
                      micromanaged on every cable run, every fixing, every trunking cut has their
                      autonomy thwarted &mdash; even if the end result is technically the same, the
                      experience is fundamentally different and less motivating.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Relatedness</p>
                  </div>
                  <p className="text-sm text-white">
                    The need to feel connected to others &mdash; to belong, to care, and to be cared
                    for. Relatedness is about feeling that you matter to other people and that other
                    people matter to you. It is the social dimension of motivation, and it is
                    fundamental to human wellbeing.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded mt-2">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> The team that has a
                      genuine sense of camaraderie &mdash; they look out for each other, share
                      knowledge, have a laugh at break time, and feel like they belong &mdash; has
                      strong relatedness. A lone worker who is isolated from colleagues, not
                      included in team communication, and feels like nobody notices whether they are
                      there or not has their relatedness need thwarted.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The central insight of SDT is the distinction between{' '}
                <strong>intrinsic motivation</strong> and <strong>extrinsic motivation</strong>.
                Intrinsic motivation is doing something because it is inherently interesting,
                enjoyable or meaningful to you. Extrinsic motivation is doing something because of
                an external reward (money, praise, status) or to avoid a punishment (criticism,
                demotion, being sacked).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Intrinsic vs Extrinsic: Construction Example
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Intrinsically Motivated Apprentice
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Genuinely interested in how electrical systems work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Reads beyond what is required for college</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Asks questions to deepen understanding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Practises techniques in their own time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Takes pride in the quality of their work</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Extrinsically Motivated Apprentice
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Doing the apprenticeship mainly for the pay</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Does the minimum required to pass</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Only works hard when the supervisor is watching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Sees college as an obstacle, not an opportunity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Quality of work drops when nobody is checking</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  Both apprentices may produce similar results initially, but over time the
                  intrinsically motivated apprentice will develop faster, produce higher-quality
                  work, and build a more successful career. Extrinsic motivation is fragile &mdash;
                  it disappears when the reward is removed. Intrinsic motivation is renewable
                  &mdash; it comes from within and sustains you through the difficult days.
                </p>
              </div>

              <p>
                Deci and Ryan&rsquo;s research also showed that well-intentioned external rewards
                can actually <em>undermine</em> intrinsic motivation. This is called the{' '}
                <strong>undermining effect</strong>. When you start paying someone for something
                they would do voluntarily, the activity shifts from &ldquo;I do this because I want
                to&rdquo; to &ldquo;I do this because I get paid.&rdquo; If the payment stops, the
                behaviour often stops too &mdash; even though the person was doing it freely before
                the reward was introduced.
              </p>

              <p>
                The practical implication for the workplace is clear: create conditions that support
                competence, autonomy and relatedness, and intrinsic motivation will follow
                naturally. This is not about removing fair pay or recognition &mdash; it is about
                understanding that pay alone is not enough to produce sustained, high-quality
                motivation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Flow States */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Flow States
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In the 1970s, Hungarian-American psychologist{' '}
                <strong>Mihaly Csikszentmihalyi</strong> (pronounced &ldquo;chick-sent-me-hi&rdquo;)
                began studying what happens when people become completely absorbed in an activity.
                He interviewed artists, rock climbers, chess players, surgeons and musicians &mdash;
                people who regularly described losing themselves in their work, experiencing a state
                of total immersion where time seemed to stop and performance felt effortless.
                Csikszentmihalyi named this experience <strong>flow</strong>.
              </p>

              <p>
                Flow is an optimal state of consciousness where we feel our best and perform our
                best. It is the state athletes call &ldquo;being in the zone&rdquo; &mdash; where
                every action flows naturally from the previous one, concentration is absolute, and
                the sense of self dissolves into the activity itself. Flow is not just pleasant
                &mdash; it is associated with peak performance, creative breakthroughs, and deep
                learning.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Challenge-Skill Balance
                </p>
                <p className="text-sm text-white mb-3">
                  Csikszentmihalyi&rsquo;s central discovery was that flow occurs when there is a
                  precise match between the <strong>challenge</strong> of the task and your{' '}
                  <strong>skill level</strong>. This balance is the key condition for flow:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-red-400 mb-1">Challenge Too Low</p>
                    <p className="text-xs text-white">
                      <strong>Result: Boredom.</strong> When the task is well below your skill
                      level, your mind wanders, you become disengaged, and your performance drops.
                      This is the experienced electrician running the same basic circuit for the
                      hundredth time with no variation.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Challenge Matches Skill
                    </p>
                    <p className="text-xs text-white">
                      <strong>Result: Flow.</strong> When the challenge stretches your abilities but
                      remains achievable, you enter flow. Full concentration, time flies, the work
                      feels effortless despite being demanding. This is the sweet spot.
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-red-400 mb-1">Challenge Too High</p>
                    <p className="text-xs text-white">
                      <strong>Result: Anxiety.</strong> When the task far exceeds your current
                      ability, you feel overwhelmed, stressed and anxious. Performance suffers. This
                      is the first-year apprentice asked to design and install a three-phase
                      distribution system.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Csikszentmihalyi identified <strong>eight characteristics</strong> that people
                consistently report when experiencing flow. Not all eight need to be present, but
                the more that are, the deeper and more complete the flow experience:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Eight Characteristics of Flow</p>
                <div className="space-y-2">
                  {[
                    {
                      title: 'Complete concentration on the task',
                      desc: 'Your attention is fully absorbed by what you are doing. Distractions fade away.',
                    },
                    {
                      title: 'Clarity of goals and immediate feedback',
                      desc: 'You know exactly what you are trying to achieve, and you get instant feedback on how well you are doing.',
                    },
                    {
                      title: 'Transformation of time',
                      desc: 'Time seems to pass differently \u2014 usually faster. An hour feels like ten minutes.',
                    },
                    {
                      title: 'The experience is intrinsically rewarding',
                      desc: 'The activity itself is the reward. You would do it even without external incentives.',
                    },
                    {
                      title: 'Effortlessness and ease',
                      desc: 'Despite the task being challenging, it feels natural and effortless. Actions flow from each other.',
                    },
                    {
                      title: 'Balance between challenge and skill',
                      desc: 'The task stretches you but remains within your capability. You are working at the edge of your competence.',
                    },
                    {
                      title: 'Actions and awareness merge',
                      desc: 'You stop being a separate observer of your work and become one with it. The distinction between you and the task dissolves.',
                    },
                    {
                      title: 'Feeling of control over the task',
                      desc: 'You feel capable and in control, even when the task is demanding. There is no sense of being overwhelmed.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-white">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Flow in Electrical Work</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Many electricians have experienced flow without knowing the term. Here are common
                  flow-producing activities in the trade:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Terminating a complex distribution board</strong> &mdash; the
                      combination of technical knowledge, manual dexterity and attention to detail
                      creates the perfect conditions for flow. Every connection matters, feedback is
                      immediate (tidy or not, correct or not), and the challenge matches your skill.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Fault-finding on a complex circuit</strong> &mdash; tracing a fault
                      through a system is essentially problem-solving under time pressure. The
                      challenge is clear, the feedback is immediate (you find the fault or you do
                      not), and when the challenge matches your diagnostic skill, flow emerges.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>First fix on a complex installation</strong> &mdash; routing cables
                      through a building, solving spatial problems, working with the structure. The
                      combination of physical skill and mental planning can produce deep engagement
                      where time flies and you look up to discover three hours have passed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Designing a lighting control system</strong> &mdash; the creative
                      element of matching circuits, switches and dimmers to a client&rsquo;s
                      requirements involves both technical knowledge and aesthetic judgement,
                      creating the kind of multi-faceted challenge that promotes flow.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Conditions for Flow:</strong> To create flow
                  deliberately, you need three conditions: (1) <strong>Clear goals</strong> &mdash;
                  know exactly what you are trying to achieve; (2){' '}
                  <strong>Immediate feedback</strong> &mdash; know instantly how well you are doing;
                  (3) <strong>Challenge-skill match</strong> &mdash; the task should stretch you
                  without overwhelming you. If you can set up these three conditions before starting
                  a task, you dramatically increase your chances of entering flow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Motivation on the Hard Days */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Motivation on the Hard Days
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Theory is essential, but the real test of motivation is what happens when conditions
                are difficult. Every electrician knows those days: the weather is miserable, the
                client is being unreasonable, the materials have not arrived, the job is
                overrunning, and the person you are supposed to be working with called in sick. On
                days like these, motivation can feel like a distant memory.
              </p>

              <p>
                The theories we have explored in this section &mdash; Goleman&rsquo;s competencies,
                Pink&rsquo;s Drive model, SDT, flow states &mdash; are not just abstract ideas. They
                provide practical tools for maintaining motivation when everything conspires against
                you. Here are evidence-based strategies for the hard days:
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      1. Reconnect with Your Purpose
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    When daily motivation fades, purpose is the anchor. Ask yourself: why did I
                    choose this trade? What am I building towards? Who am I providing for? Purpose
                    does not have to be grand or philosophical &mdash; it can be as simple as
                    &ldquo;I am doing this so my children have a better life&rdquo; or &ldquo;I want
                    to build a business I am proud of.&rdquo; Research by Amy Wrzesniewski at Yale
                    shows that people who connect their daily tasks to a larger purpose report
                    higher satisfaction and greater persistence even in the face of adversity.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      2. Harness the Power of Progress
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Teresa Amabile, a professor at Harvard Business School, spent years studying
                    what motivates people in everyday working life. Her research, published in{' '}
                    <em>The Progress Principle</em>, found that the single most powerful motivator
                    is a <strong>sense of progress</strong> &mdash; making meaningful headway on
                    work that matters. Even small wins can dramatically shift your emotional state
                    and reignite motivation. On a hard day, set one small, achievable goal: finish
                    this one room, complete this one circuit, tidy this one board. The sense of
                    accomplishment from completing even a minor task can create momentum that
                    carries you forward.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">3. Exercise Micro-Autonomy</p>
                  </div>
                  <p className="text-sm text-white">
                    Even when the job is prescribed and the client is demanding, there are usually
                    small areas where you can exercise choice. Which task do you tackle first? Which
                    method do you use? How do you organise your workspace? These micro-choices may
                    seem trivial, but research shows that even small amounts of perceived autonomy
                    can boost motivation significantly. On a day when everything feels out of your
                    control, find the elements where you do have a choice and lean into them.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      4. Create Challenge Within Routine
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    If the work is repetitive and uninspiring, inject challenge deliberately. Set a
                    personal time target. Focus on achieving a cleaner finish than last time. Try a
                    new technique. Teach what you are doing to someone less experienced. By
                    deliberately raising the challenge level, you shift from boredom towards flow
                    &mdash; and flow is inherently motivating.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      5. Protect Your Physical Foundation
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Motivation is not purely psychological &mdash; it has a strong physiological
                    component. Sleep deprivation, poor nutrition, dehydration and lack of physical
                    recovery all undermine motivation at a biological level. Research shows that
                    people who sleep less than six hours per night experience significantly reduced
                    motivation, impaired decision-making and increased emotional reactivity. Before
                    looking for complex psychological solutions, check the basics: are you sleeping
                    enough, eating properly, and staying hydrated?
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">6. Use Social Connection</p>
                  </div>
                  <p className="text-sm text-white">
                    SDT tells us that relatedness is a fundamental need. When motivation is low,
                    connecting with colleagues can provide a powerful boost. Have a proper
                    conversation at break time. Ask a colleague about their weekend. Share a problem
                    you are wrestling with. Research on emotional contagion shows that motivation
                    spreads socially &mdash; being around motivated people makes you more motivated,
                    and your motivation (even when it is flagging) can lift someone else.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Reality Check:</strong> It is normal for
                  motivation to fluctuate. No one is driven every single day, and pretending
                  otherwise leads to guilt and self-criticism that make things worse. The goal is
                  not constant, unwavering motivation &mdash; it is the ability to{' '}
                  <strong>recover motivation</strong> when it dips. The strategies above are
                  recovery tools, not prevention tools. Use them when you need them, not as a rigid
                  daily routine.
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
                Internal motivation is different from external motivation in one critical way: it is{' '}
                <strong>renewable and controllable</strong>. External rewards &mdash; money, status,
                praise &mdash; depend on other people and circumstances beyond your control.
                Internal motivation depends on how you relate to your work, and that is something
                you can influence directly.
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
                      <strong>Goleman:</strong> Achievement drive, commitment, initiative and
                      optimism are the four pillars of emotionally intelligent motivation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pink:</strong> Autonomy, mastery and purpose produce deeper, more
                      sustainable motivation than carrots and sticks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Deci &amp; Ryan:</strong> Competence, autonomy and relatedness are
                      basic needs &mdash; when met, intrinsic motivation flourishes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Csikszentmihalyi:</strong> Flow occurs when challenge matches skill
                      &mdash; clear goals and immediate feedback create the conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Amabile:</strong> Small wins and a sense of progress are the most
                      powerful everyday motivators
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The connection to the next section is direct: optimism &mdash; one of
                Goleman&rsquo;s four motivation competencies &mdash; is the bridge between
                motivation and resilience. In Section 2, you will explore Martin Seligman&rsquo;s
                research on learned optimism and discover how your explanatory style determines
                whether setbacks crush you or strengthen you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: Optimism &amp; Resilience
                </p>
                <p className="text-sm text-white">
                  Why do some people bounce back from failure while others give up? How can you
                  train yourself to be more optimistic without ignoring reality? What is the
                  difference between genuine optimism and toxic positivity? Section 2 answers these
                  questions using Seligman&rsquo;s groundbreaking research.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-4-section-2">
              Optimism &amp; Resilience
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
