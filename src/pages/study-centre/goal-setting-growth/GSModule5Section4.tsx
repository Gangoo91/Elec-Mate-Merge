import { ArrowLeft, Flame, CheckCircle } from 'lucide-react';
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
    id: 'gs-5-4-check1',
    question:
      'A self-employed electrician finds himself waiting until he &ldquo;feels motivated&rdquo; before starting his CPD study each evening. Three weeks pass without any progress. According to the behavioural research on motivation and action, what is the most likely explanation?',
    options: [
      'He needs to find a more interesting CPD course that naturally motivates him',
      'He is waiting for motivation to arrive before acting, when in reality action precedes motivation &mdash; starting the task (even for five minutes) generates the motivation to continue',
      'He lacks the natural discipline required for self-directed study',
      'He should only study when he genuinely feels motivated, as forced study is ineffective',
    ],
    correctIndex: 1,
    explanation:
      'This is a textbook example of the motivation myth in action. Many people believe that motivation is a prerequisite for action &mdash; that you need to feel motivated before you can begin. Behavioural research consistently shows the opposite: action precedes motivation. Starting a task, even reluctantly and for just a few minutes, activates the brain&rsquo;s reward circuitry and generates the motivation to continue. This phenomenon is sometimes called &ldquo;behavioural activation&rdquo; in psychology. The electrician does not need to wait until he feels like studying &mdash; he needs to commit to sitting down and opening his study materials for five minutes. In the vast majority of cases, once you start, momentum builds and the motivation follows. Waiting for motivation to arrive is like waiting for a bus that does not have a timetable &mdash; it might come, it might not. Taking action is how you create the conditions for motivation.',
  },
  {
    id: 'gs-5-4-check2',
    question:
      'Daniel Pink&rsquo;s Drive framework identifies three core drivers of intrinsic motivation: autonomy, mastery, and purpose. An electrician who finds deep satisfaction in perfecting his conduit bending technique &mdash; spending extra time practising even when no one is watching &mdash; is primarily experiencing which driver?',
    options: [
      'Autonomy &mdash; the freedom to choose what he works on',
      'Purpose &mdash; connecting his work to a bigger mission',
      'Mastery &mdash; the satisfaction of becoming genuinely excellent at a craft skill',
      'Extrinsic motivation &mdash; he is practising for a promotion',
    ],
    correctIndex: 2,
    explanation:
      'This electrician is experiencing the mastery drive. Daniel Pink defines mastery as the desire to get better and better at something that matters. It is characterised by engagement for its own sake &mdash; the electrician practises conduit bending not because someone is watching or because there is a reward, but because the process of improving is intrinsically satisfying. Mastery is one of the most powerful motivational forces available to tradespeople, because the electrical trade offers virtually unlimited depth of skill development. You can always bend conduit more precisely, terminate more neatly, fault-find more efficiently, or design more elegantly. The key characteristic of mastery motivation is that it is self-sustaining &mdash; the better you get, the more satisfying the pursuit becomes, creating a positive feedback loop. Pink notes that mastery is an asymptote: you can approach it but never fully reach it, which is what makes the pursuit endlessly engaging.',
  },
  {
    id: 'gs-5-4-check3',
    question:
      'James Clear argues that the most effective form of long-term motivation comes not from setting goals but from adopting an identity. According to his identity-based approach, which of the following statements would be most powerful for sustaining long-term motivation?',
    options: [
      '&ldquo;I want to pass my 2391 exam by March&rdquo;',
      '&ldquo;I am the type of person who is always learning and improving my craft&rdquo;',
      '&ldquo;I need to study more this week&rdquo;',
      '&ldquo;My employer expects me to get qualified&rdquo;',
    ],
    correctIndex: 1,
    explanation:
      'James Clear&rsquo;s identity-based approach, outlined in Atomic Habits, argues that the deepest and most sustainable form of motivation comes from identity &mdash; who you believe yourself to be. There are three levels at which change can occur: outcomes (what you get), processes (what you do), and identity (what you believe). Most people start with outcomes (&ldquo;I want to pass my 2391&rdquo;) or processes (&ldquo;I need to study more&rdquo;). Clear argues that the most powerful and lasting change starts with identity: &ldquo;I am the type of person who is always learning and improving.&rdquo; When you adopt this identity, every decision flows naturally from it. You study not because you have to but because that is who you are. You seek feedback not because your employer requires it but because growth-oriented people seek feedback. You take on challenges not because someone assigned them but because you are someone who grows through challenge. Identity-based motivation does not rely on willpower or external pressure &mdash; it is powered by the desire to be consistent with your self-image.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I know all the motivation theory but I still struggle to stay motivated &mdash; what am I doing wrong?',
    answer:
      'You are not doing anything wrong &mdash; this is one of the most common experiences in personal development. Knowing about motivation and actually being motivated are completely different things, just as knowing how to wire a consumer unit and actually wiring one are different things. Knowledge alone does not create change; action does. The gap between knowing and doing is bridged by systems, not willpower. Instead of relying on understanding motivation theory, build concrete systems: a fixed study schedule, an accountability partner, a physical environment set up for focus, and a habit of starting with just five minutes. The research is clear that people who succeed long-term do not have more motivation than others &mdash; they have better systems that make the right actions easier and the wrong actions harder. Stop waiting to feel motivated and start building systems that make action the default.',
  },
  {
    question:
      'How do I stay motivated when my employer does not support my development and I have to do everything on my own time?',
    answer:
      'This is a frustrating but common situation in the electrical trade, and it is actually an opportunity to build genuine autonomy &mdash; one of Daniel Pink&rsquo;s three core motivational drivers. When you invest in your own development on your own time, you own the results completely. The qualification, the skill, the knowledge &mdash; it belongs to you, not your employer. Many of the most successful electricians built their careers through self-directed learning: studying for the 2391 in the evenings, practising calculations on weekends, reading BS 7671 during lunch breaks. The key is to reframe the situation from &ldquo;my employer does not support me&rdquo; (victim mindset) to &ldquo;I am investing in myself because I am worth it&rdquo; (ownership mindset). Connect your effort to your own long-term goals, not your employer&rsquo;s priorities. Find community support through online forums, local study groups, or platforms like Elec-Mate. And remember: the electricians who invest in themselves during difficult circumstances are the ones who end up with the most options.',
  },
  {
    question: 'Is burnout a sign that I am not motivated enough, or something else entirely?',
    answer:
      'Burnout is absolutely not a sign of insufficient motivation &mdash; in fact, it is often the opposite. Burnout typically afflicts highly motivated people who push too hard for too long without adequate rest, recovery, and boundaries. The World Health Organisation classifies burnout as an occupational phenomenon characterised by three dimensions: emotional exhaustion (feeling drained), depersonalisation (becoming cynical about your work), and reduced personal accomplishment (feeling ineffective despite working hard). For electricians, burnout can manifest as dreading Monday mornings, losing the satisfaction you once felt in quality work, becoming irritable with clients or colleagues, making more mistakes due to fatigue, or feeling that no amount of effort makes a difference. The solution is not &ldquo;more motivation&rdquo; &mdash; it is rest, boundaries, variety, and reconnection to purpose. If you are experiencing burnout symptoms, the most productive thing you can do is not push harder but step back, recover, and rebuild your relationship with your work from a healthier foundation.',
  },
  {
    question:
      'I have been in the trade for 25 years and feel like I have plateaued &mdash; how do I reignite my motivation?',
    answer:
      'A 25-year plateau often indicates that you have achieved a high level of competence in your current work but stopped growing. This is natural &mdash; once a skill becomes automatic, it stops providing the mastery-driven satisfaction that fuelled your earlier development. The solution is to deliberately seek new challenges that push you beyond your comfort zone. Consider: specialising in a niche area (EV charging, data centres, hazardous areas, renewable energy), moving into inspection and testing if you have focused on installation, pursuing design qualifications, mentoring apprentices (teaching forces you to deepen your understanding), starting your own business, getting involved in industry bodies such as the IET or ECA, or even writing about your expertise. Angela Duckworth&rsquo;s research on grit shows that sustained passion over decades often requires periodic renewal &mdash; finding new facets of your field that re-engage your curiosity and challenge your abilities. A 25-year electrician has an enormous foundation of knowledge and experience. The question is not whether you can grow further but where you want to direct that growth next.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'According to behavioural research on motivation, which statement most accurately describes the relationship between motivation and action?',
    options: [
      'Motivation must be present before action can begin',
      'Action and motivation are completely unrelated',
      'Action frequently precedes and generates motivation &mdash; you do not need to feel motivated to start',
      'Motivation is entirely determined by genetics and personality',
    ],
    correctAnswer: 2,
    explanation:
      'Behavioural research consistently demonstrates that action precedes motivation more often than the reverse. This finding challenges the common belief that you need to feel motivated before you can start a task. In reality, the act of beginning &mdash; even reluctantly &mdash; activates the brain&rsquo;s dopaminergic reward system and generates the momentum and engagement we call &ldquo;motivation&rdquo;. This is why techniques like the five-minute rule work: by committing to just five minutes of a task, you bypass the initial resistance, and once you are engaged, the motivation to continue usually follows. For electricians, this means that waiting until you feel like studying for your 2391 or updating your CPD log is counterproductive. The more effective approach is to build systems and habits that make starting automatic, regardless of how you feel in the moment.',
  },
  {
    id: 2,
    question:
      'Daniel Pink&rsquo;s Drive framework identifies three core elements of intrinsic motivation. Which combination correctly names all three?',
    options: [
      'Money, status, and recognition',
      'Autonomy, mastery, and purpose',
      'Challenge, feedback, and reward',
      'Goals, habits, and environment',
    ],
    correctAnswer: 1,
    explanation:
      'Daniel Pink&rsquo;s Drive (2009) identifies autonomy (the desire to direct your own life and work), mastery (the desire to get better and better at something that matters), and purpose (the desire to do what you do in service of something larger than yourself) as the three pillars of intrinsic motivation. Pink argues that once basic financial needs are met, these three factors are far more powerful drivers of sustained engagement than traditional extrinsic rewards such as bonuses or promotions. For electricians, autonomy might manifest as the freedom of self-employment or choosing your own specialisations; mastery as the deep satisfaction of becoming genuinely excellent at your craft; and purpose as connecting your work to client safety, quality infrastructure, or training the next generation.',
  },
  {
    id: 3,
    question:
      'Scott Belsky&rsquo;s concept of the &ldquo;messy middle&rdquo; describes which phenomenon in goal pursuit?',
    options: [
      'The initial excitement and enthusiasm when starting a new goal',
      'The difficult, unglamorous, often demoralising middle phase of any significant pursuit, where most people give up',
      'The final push of effort required to complete a goal',
      'The process of setting goals that are neither too easy nor too hard',
    ],
    correctAnswer: 1,
    explanation:
      'Scott Belsky&rsquo;s The Messy Middle (2018) describes how every ambitious project or goal follows a predictable pattern: an exciting beginning filled with energy and optimism, a difficult middle phase characterised by doubt, frustration, setbacks, and tedium, and (for those who persist) a satisfying conclusion. The critical insight is that the middle is where most people quit &mdash; not because they lack talent or resources but because the initial excitement has faded and the end is not yet in sight. For an electrician pursuing a long-term qualification like the HNC, the messy middle might be month four of an eight-month course when assignments are piling up, the novelty has worn off, and the qualification still feels far away. Recognising that this dip is normal and expected &mdash; not a sign that you should quit &mdash; is essential for long-term success.',
  },
  {
    id: 4,
    question:
      'James Clear&rsquo;s identity-based approach to motivation suggests that the most sustainable motivation comes from:',
    options: [
      'Setting bigger and more ambitious outcome goals',
      'Using external rewards and punishments to drive behaviour',
      'Adopting an identity consistent with your desired behaviours (&ldquo;I am the type of person who...&rdquo;)',
      'Tracking every metric and data point related to your progress',
    ],
    correctAnswer: 2,
    explanation:
      'James Clear argues in Atomic Habits that true behaviour change is identity change. There are three layers of behaviour change: outcomes (what you get), processes (what you do), and identity (what you believe about yourself). Most people focus on outcomes (&ldquo;I want to pass my exam&rdquo;) or processes (&ldquo;I will study for an hour each evening&rdquo;). Clear argues that the most durable change happens when you start with identity: &ldquo;I am the type of person who invests in continuous learning.&rdquo; When your identity aligns with your desired behaviour, motivation becomes less of an issue because you are not fighting against yourself &mdash; you are acting consistently with who you believe yourself to be. Each time an electrician studies, seeks feedback, or takes on a new challenge, they are casting a vote for their identity as a growth-oriented professional.',
  },
  {
    id: 5,
    question:
      'Angela Duckworth defines &ldquo;grit&rdquo; as a combination of which two qualities?',
    options: [
      'Intelligence and effort',
      'Talent and luck',
      'Passion and perseverance for very long-term goals',
      'Confidence and ambition',
    ],
    correctAnswer: 2,
    explanation:
      'Angela Duckworth&rsquo;s research at the University of Pennsylvania defines grit as the combination of passion (sustained interest in a particular field or pursuit over years) and perseverance (the ability to persist through difficulty, setback, and tedium without giving up). Duckworth&rsquo;s studies across diverse populations &mdash; West Point cadets, spelling bee contestants, novice teachers, salespeople &mdash; consistently found that grit was a better predictor of success than IQ, talent, or socioeconomic background. For electricians, grit manifests as the sustained commitment to the trade over years and decades: persisting through the difficult apprenticeship years, continuing to learn and develop after qualifying, pushing through exam failures, and maintaining high standards even when cutting corners would be easier. Grit is not about short-term intensity but about long-term consistency.',
  },
  {
    id: 6,
    question:
      'The &ldquo;five-minute rule&rdquo; is a practical technique for overcoming procrastination and low motivation. How does it work?',
    options: [
      'You set a timer for five minutes and if you are not motivated after five minutes, you stop',
      'You commit to working on the task for just five minutes, with permission to stop after that &mdash; but in most cases, starting creates enough momentum to continue',
      'You spend five minutes visualising the completed task before beginning',
      'You take a five-minute break every 25 minutes of work',
    ],
    correctAnswer: 1,
    explanation:
      'The five-minute rule is based on the principle that action precedes motivation. You commit to working on a task for just five minutes, giving yourself full permission to stop after that if you genuinely want to. The psychological effect is powerful: by reducing the perceived commitment from &ldquo;I have to study for two hours&rdquo; to &ldquo;I just need to do five minutes&rdquo;, you dramatically lower the activation energy required to start. And research shows that in the vast majority of cases (around 80%), once people start, they continue well beyond five minutes because the act of beginning generates momentum, engagement, and the neural reward signals that we experience as motivation. The five-minute rule works because it addresses the real barrier &mdash; which is usually not the task itself but the resistance to starting it.',
  },
  {
    id: 7,
    question:
      'Which of the following best describes the difference between productive pushing and destructive overwork (burnout)?',
    options: [
      'There is no real difference &mdash; hard work is always productive',
      'Productive pushing involves challenging yourself within sustainable limits and incorporating recovery, while destructive overwork ignores recovery needs and leads to diminishing returns',
      'Burnout only affects people who are not genuinely passionate about their work',
      'Working more than 40 hours per week automatically constitutes burnout',
    ],
    correctAnswer: 1,
    explanation:
      'The distinction between productive pushing and destructive overwork is one of the most important concepts in sustained high performance. Productive pushing means deliberately challenging yourself, accepting discomfort as part of growth, and working hard during focused periods &mdash; but crucially, it also includes planned recovery, boundaries, and rest. Destructive overwork, by contrast, ignores the body and mind&rsquo;s need for recovery. It is characterised by chronic exhaustion, working through fatigue without rest, sacrificing sleep, health, and relationships, and experiencing diminishing returns where more hours produce less output. The key difference is recovery: athletes, musicians, and elite performers in every field build rest into their training because they understand that growth happens during recovery, not during exertion. Electricians working long hours on site need to apply this same principle to their professional development &mdash; intense study or training sessions followed by genuine rest and recovery.',
  },
  {
    id: 8,
    question:
      'Bill Gates is often quoted as saying: &ldquo;Most people overestimate what they can do in one year and underestimate what they can do in ten years.&rdquo; Applied to an electrician&rsquo;s career, this principle suggests:',
    options: [
      'You should set only short-term goals because long-term planning is unreliable',
      'The electrical trade does not change enough over ten years for long-term planning to matter',
      'Consistent, patient investment in your development over a decade will produce results far beyond what seems possible from your current vantage point',
      'You should only focus on goals that can be achieved within one year',
    ],
    correctAnswer: 2,
    explanation:
      'This principle captures one of the most important truths about long-term professional development. In the short term (one year), people tend to set overly ambitious goals and become disappointed when progress is slower than expected. In the long term (ten years), people drastically underestimate the compounding effect of consistent daily improvement. An electrician who studies for 30 minutes a day, seeks one piece of feedback per week, and takes on one new challenge per month will, over ten years, have accumulated thousands of hours of deliberate development. The compounding effect means that each year&rsquo;s growth builds on the previous year&rsquo;s, creating exponential rather than linear progress. Consider where you were ten years ago and how much you have learned since &mdash; then imagine what another ten years of intentional growth could produce. The key is patience and consistency: small actions, repeated over long periods, produce extraordinary results.',
  },
];

export default function GSModule5Section4() {
  useSEO({
    title: 'Staying Motivated Long-Term | Goal Setting & Growth Module 5.4',
    description:
      'The motivation myth, Daniel Pink&rsquo;s Drive framework, identity-based motivation, grit, avoiding burnout, and building a lifelong growth commitment.',
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
            <Link to="../gs-module-5">
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
            <Flame className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Staying Motivated Long-Term
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The motivation myth, Daniel Pink&rsquo;s Drive framework, identity-based motivation,
            grit, avoiding burnout, and building a lifelong commitment to growth
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>The motivation myth:</strong> Action creates motivation, not the other way
                around
              </li>
              <li>
                <strong>Pink&rsquo;s Drive:</strong> Autonomy, mastery, and purpose are the engines
                of intrinsic motivation
              </li>
              <li>
                <strong>Identity-based motivation:</strong> &ldquo;I am the type of person
                who...&rdquo; is more powerful than any goal
              </li>
              <li>
                <strong>Grit:</strong> Passion + perseverance over years and decades separates those
                who succeed from those who plateau
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Long careers:</strong> An electrician&rsquo;s career spans 40+ years &mdash;
                short-term motivation is not enough
              </li>
              <li>
                <strong>The messy middle:</strong> Every goal has a demoralising middle phase where
                most people quit
              </li>
              <li>
                <strong>Burnout prevention:</strong> Knowing the difference between productive
                pushing and destructive overwork
              </li>
              <li>
                <strong>Compounding growth:</strong> Small daily investments in development produce
                extraordinary results over a decade
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain why action precedes motivation and apply the five-minute rule to overcome procrastination',
              'Describe Daniel Pink&rsquo;s Drive framework (autonomy, mastery, purpose) and apply it to the electrical trade',
              'Identify the &ldquo;messy middle&rdquo; in goal pursuit and develop strategies for persisting through it',
              'Apply James Clear&rsquo;s identity-based approach to build a self-sustaining growth identity',
              'Distinguish between intrinsic and extrinsic motivation and understand why intrinsic motivation is more sustainable',
              'Recognise the warning signs of burnout and implement rest and recovery as part of your growth strategy',
              'Articulate a personal growth commitment that synthesises all five modules of this course',
              'Apply the long-game perspective to your career development',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Motivation Myth */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Motivation Myth &mdash; Action Creates Motivation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most people believe that motivation works like this: first you feel motivated, then
                you take action. You wait for inspiration to strike, for the &ldquo;right
                mood&rdquo; to appear, for that surge of energy that makes you want to sit down and
                study, or go to the gym, or start that business plan. This belief is so deeply
                ingrained that it feels like common sense. But it is wrong. Behavioural research
                consistently demonstrates that the relationship between motivation and action is the
                reverse of what most people assume: <strong>action precedes motivation</strong>.
              </p>

              <p>
                This finding has been replicated across psychology, neuroscience, and behavioural
                economics. When you start doing something &mdash; even reluctantly, even with zero
                enthusiasm &mdash; the act of doing it activates your brain&rsquo;s dopaminergic
                reward system. Dopamine, the neurotransmitter associated with motivation and reward,
                is released not just when you complete a task but during the task itself,
                particularly when you make progress. This is why the hardest part of any task is
                almost always starting it. Once you are five or ten minutes in, the resistance fades
                and engagement builds. The motivation you were waiting for arrives &mdash; but it
                arrives because you started, not the other way around.
              </p>

              <p>
                For electricians and tradespeople, this principle has immediate practical
                implications. The apprentice who waits until he &ldquo;feels like&rdquo; revising
                for his AM2 will likely procrastinate for weeks. The qualified electrician who waits
                until she is &ldquo;in the mood&rdquo; to start her 2391 study will find the mood
                rarely arrives. The business owner who waits for motivation before updating his
                health and safety documentation will never get around to it. The solution in every
                case is the same: start. Commit to five minutes. Open the book. Write the first
                sentence. Pick up the test instrument. The motivation will follow.
              </p>

              <p>
                Jeff Haden, author of <em>The Motivation Myth</em>, argues that motivation is not
                the spark that starts the fire &mdash; it is the fire itself, generated by the
                friction of action. He studied hundreds of successful people across industries and
                found a consistent pattern: they did not wait to feel motivated. They built routines
                and systems that made action automatic, and the motivation emerged as a byproduct of
                their progress. A small win (completing one practice exam question, finishing one
                section of study notes, successfully wiring one practice board) creates a dopamine
                reward that fuels the next action, which creates the next reward, and so on. This is
                the <strong>motivation cycle</strong>: action produces progress, progress produces
                satisfaction, satisfaction produces motivation, motivation produces more action.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Motivation Cycle in Practice
                </p>
                <p className="text-base text-white leading-relaxed">
                  Stop waiting for motivation. Build a system instead. Choose a fixed time each day
                  for your development activity (studying, practising, planning). When that time
                  arrives, start &mdash; regardless of how you feel. Commit to just five minutes.
                  Track your small wins. Let the momentum build. Within a week, you will find that
                  the routine itself generates the motivation you were previously waiting for. This
                  is how every successful electrician, business owner, and professional maintains
                  long-term growth &mdash; not through superhuman willpower, but through consistent
                  systems that make action automatic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Daniel Pink's Drive Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Daniel Pink&rsquo;s Drive Framework &mdash; Autonomy, Mastery, Purpose
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daniel Pink&rsquo;s book{' '}
                <em>Drive: The Surprising Truth About What Motivates Us</em> (2009) synthesised
                decades of psychological research to identify the three core elements of intrinsic
                motivation: <strong>autonomy</strong>, <strong>mastery</strong>, and{' '}
                <strong>purpose</strong>. Pink argues that once people&rsquo;s basic financial needs
                are met, these three intrinsic drivers become far more powerful than traditional
                extrinsic motivators such as bonuses, threats, or promotions. His framework has
                profound implications for electricians and tradespeople.
              </p>

              <p>
                <strong>Autonomy</strong> is the desire to direct your own life and work. It means
                having control over what you do, when you do it, how you do it, and who you do it
                with. For electricians, autonomy is one of the trade&rsquo;s greatest attractions.
                Self-employed electricians choose their own clients, set their own hours, select
                their own methods, and control their own schedules. Even employed electricians
                typically work with a degree of independence &mdash; once on site, you decide how to
                approach the job, how to sequence your work, and how to solve the problems that
                arise. Research shows that autonomy dramatically increases engagement, job
                satisfaction, and performance. When people feel they have agency over their work,
                they invest more of themselves in it. If you are currently employed and feel
                constrained, autonomy might be the drive pushing you towards self-employment or
                towards a role with more independence. Recognise that drive and use it as fuel for
                your development.
              </p>

              <p>
                <strong>Mastery</strong> is the desire to get better and better at something that
                matters. It is the deep satisfaction that comes from developing genuine expertise
                &mdash; the feeling of a perfectly bent conduit run, a fault found through logical
                deduction, a consumer unit wired with immaculate precision, or a design that
                elegantly solves a complex problem. Mastery is one of the most powerful motivational
                forces available to tradespeople because the electrical trade offers virtually
                unlimited depth. You can always improve your speed, your precision, your diagnostic
                thinking, your knowledge of regulations, your design capability, your testing
                competence. Pink identifies three characteristics of mastery: it is a{' '}
                <strong>mindset</strong> (requiring the belief that improvement is possible &mdash;
                growth mindset), it is a <strong>pain</strong> (it requires effort, struggle, and
                deliberate practice), and it is an <strong>asymptote</strong> (you can approach it
                but never fully reach it, which is what makes the pursuit endlessly engaging). The
                electricians who report the highest job satisfaction are almost always those who are
                still actively pursuing mastery &mdash; still learning, still refining, still
                pushing themselves to be better.
              </p>

              <p>
                <strong>Purpose</strong> is the desire to do what you do in service of something
                larger than yourself. It answers the question: why does my work matter? For
                electricians, purpose can take many forms. At the most fundamental level, your work
                protects lives &mdash; correct electrical installation and testing prevents fires,
                electric shock, and death. You enable people to live in homes with light, heat, and
                power. You build and maintain the infrastructure that modern society depends on. You
                train the next generation of electricians. You ensure that buildings are safe,
                efficient, and functional. When motivation wanes, reconnecting to this purpose
                &mdash; the real, tangible impact of your work on people&rsquo;s lives &mdash; can
                be profoundly reinvigorating. Purpose does not have to be grand or abstract. An
                electrician who takes pride in ensuring every installation is safe, every test
                accurate, every client informed, is operating from purpose.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Applying Drive to Your Electrical Career
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Autonomy audit:</strong> Where in your work do you feel the most and
                      least autonomous? What changes could increase your sense of control &mdash;
                      even small ones like choosing your own tools, your own learning schedule, or
                      your own approach to a task?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Mastery pursuit:</strong> What aspect of electrical work do you want
                      to become genuinely excellent at? Not &ldquo;good enough&rdquo; but truly
                      masterful? Identify it and create a deliberate practice plan.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Purpose connection:</strong> Write down three ways your work
                      positively impacts other people&rsquo;s lives. Keep this somewhere visible for
                      the days when motivation is low.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Messy Middle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Messy Middle &mdash; Why the Middle Is the Hardest Part
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scott Belsky, co-founder of Behance and author of <em>The Messy Middle</em> (2018),
                describes a phenomenon that affects every ambitious pursuit: the{' '}
                <strong>messy middle</strong>. Every significant goal &mdash; whether it is
                completing a qualification, building a business, or mastering a new skill &mdash;
                follows a predictable emotional arc. The beginning is exciting: you are full of
                energy, optimism, and enthusiasm. You have a clear vision, the path feels fresh, and
                the novelty fuels your commitment. The end, when you finally achieve the goal, is
                satisfying and affirming. But between the beginning and the end lies the messy
                middle &mdash; and it is where most people quit.
              </p>

              <p>
                The messy middle is characterised by doubt, frustration, boredom, and the persistent
                feeling that things are not working. The initial excitement has faded. The goal
                still feels far away. Progress is hard to see because you are too close to it.
                Setbacks accumulate. The voice in your head says: &ldquo;Is this even worth
                it?&rdquo; &ldquo;Maybe I should try something else.&rdquo; &ldquo;Other people seem
                to be doing this more easily.&rdquo; Belsky argues that the messy middle is not a
                sign that you should quit &mdash; it is a normal, predictable, and universal phase
                that every significant achievement passes through.
              </p>

              <p>
                For electricians, the messy middle appears in many contexts. During a four-year
                apprenticeship, it often hits in the second year: the novelty of being on site has
                worn off, college work is getting harder, the end date still feels impossibly far
                away, and you are doing the same repetitive tasks while watching qualified
                electricians do the interesting work. During a 2391 Inspection &amp; Testing course,
                it might be month two of a four-month course: the initial enthusiasm has faded, the
                content is getting more complex, and the exam date feels both too far away and too
                close. When starting a business, it might be month six: the pipeline has not built
                as fast as you hoped, invoicing and administration are tedious, and you are
                questioning whether self-employment was the right decision.
              </p>

              <p>
                The critical skill is recognising the messy middle when you are in it and choosing
                to persist despite the discomfort. Belsky offers several strategies for navigating
                this phase: <strong>lower the bar temporarily</strong> (focus on maintaining minimum
                viable progress rather than peak performance), <strong>zoom out</strong> (remind
                yourself of the bigger picture and why you started),{' '}
                <strong>seek short-term wins</strong> (break the remaining work into small,
                achievable milestones that provide dopamine rewards),{' '}
                <strong>accept the discomfort</strong> (stop expecting the middle to feel as
                exciting as the beginning &mdash; it will not, and that is normal), and{' '}
                <strong>find accountability</strong> (connect with others who are on the same
                journey). The messy middle is not where talented people thrive and others fail
                &mdash; it is where persistent people push through and others give up.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Recognising the Messy Middle in Your Career
                </p>
                <p className="text-base text-white leading-relaxed">
                  If you are currently in the middle of a long-term goal &mdash; a qualification, a
                  business launch, a career transition &mdash; and feeling demotivated, frustrated,
                  or doubtful, congratulations: you are in the messy middle. This is exactly where
                  you should be. The fact that it feels hard is not evidence that you should quit
                  &mdash; it is evidence that you are pursuing something meaningful. The beginning
                  was supposed to be exciting. The middle is supposed to be hard. The end will come
                  if you keep going. Do not make permanent decisions based on temporary emotions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Dealing with Demotivation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Dealing with Demotivation &mdash; Practical Strategies
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even with the best systems, the strongest identity, and the clearest purpose, there
                will be days when you simply do not want to do the work. This is not a personal
                failing &mdash; it is a universal human experience. The question is not how to
                eliminate demotivation (you cannot) but how to handle it effectively when it
                arrives. Here are evidence-based strategies that work in the real world.
              </p>

              <p>
                <strong>The five-minute rule.</strong> This is perhaps the single most effective
                technique for overcoming resistance. When you do not feel like starting a task,
                commit to just five minutes. Tell yourself: &ldquo;I will open the book and read for
                five minutes. If I genuinely want to stop after five minutes, I will.&rdquo; The
                psychological effect is powerful because it reduces the perceived commitment from
                overwhelming (&ldquo;I have to study for two hours&rdquo;) to trivial (&ldquo;It is
                only five minutes&rdquo;). Research shows that approximately 80% of the time, once
                you start, you continue well beyond the five minutes because the act of beginning
                generates momentum. The remaining 20% of the time, you stop after five minutes
                &mdash; but you have still done five minutes more than you would have done
                otherwise. Over a year, those five-minute sessions add up to significant progress.
              </p>

              <p>
                <strong>Energy management.</strong> Motivation is not purely psychological &mdash;
                it is deeply tied to your physical energy. Most people have natural energy cycles
                throughout the day: periods of high alertness and focus, and periods of low energy
                and reduced cognitive capacity. The key is to schedule your most demanding work
                (complex study, difficult practice, important decisions) during your peak energy
                windows, and your less demanding work (administrative tasks, review, light reading)
                during your low-energy periods. For many electricians working physical jobs, peak
                cognitive energy might be early morning (before work) or early evening (after a rest
                period). Trying to study advanced theory at 10pm after a ten-hour day on site is
                fighting against your biology. Find your peak window and protect it for your most
                important development work.
              </p>

              <p>
                <strong>Reconnecting to your &ldquo;why&rdquo;.</strong> When motivation drops, it
                is often because you have lost sight of why you are doing what you are doing. The
                daily grind of studying, practising, or building a business can disconnect you from
                your original purpose. Regularly reconnect by asking yourself: Why did I start this?
                What will be different when I achieve this? Who will benefit? What will I be able to
                do that I cannot do now? Some people find it helpful to write their
                &ldquo;why&rdquo; on a card and keep it where they can see it. Others visualise the
                specific outcome &mdash; passing the exam, landing the first contract, the look on a
                client&rsquo;s face when the work is done to a high standard. The technique does not
                matter; what matters is regularly refreshing your connection to the deeper reason
                behind your effort.
              </p>

              <p>
                <strong>Changing your environment.</strong> Environment has an enormous influence on
                behaviour, far more than most people realise. If you always study in the same place
                where you also watch television, your brain associates that environment with
                relaxation, not focus. If your tools are disorganised, starting a practice task
                feels like a bigger effort than it should. Environmental design is about making the
                right actions easier and the wrong actions harder. Create a dedicated study space
                (even if it is just one end of the kitchen table, with books and notes laid out
                ready). Keep your study materials accessible. Remove or distance distractions. Some
                electricians find that studying in a different location (a library, a quiet
                caf&eacute;, a training centre) dramatically improves their focus because the
                environment signals to their brain that it is time to work.
              </p>

              <p>
                <strong>Physical movement and its effect on motivation.</strong> There is robust
                scientific evidence that physical exercise has a direct, measurable effect on
                motivation and cognitive function. Exercise increases blood flow to the brain,
                stimulates the release of dopamine, serotonin, and noradrenaline (all of which
                improve mood, focus, and motivation), and reduces cortisol (the stress hormone that
                undermines motivation and learning). You do not need an intense gym session &mdash;
                even a brisk 10-minute walk has been shown to improve mood and cognitive performance
                for up to two hours afterwards. If you are feeling demotivated before a study
                session, try going for a walk first. If you are struggling to concentrate, do some
                press-ups or stretching. Many electricians are physically active during the working
                day, which is an advantage &mdash; but on rest days or study days, deliberate
                movement can be a powerful tool for resetting your motivation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Your Anti-Demotivation Toolkit
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Five-minute rule:</strong> Commit to just five minutes. Let momentum
                      do the rest.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Energy matching:</strong> Schedule hard tasks for peak energy windows.
                      Do not fight your biology.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Why card:</strong> Write your &ldquo;why&rdquo; on a card and read it
                      when motivation is low.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Environment design:</strong> Make the right action the easy action.
                      Remove friction from starting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Move first:</strong> A 10-minute walk before studying can reset your
                      motivation entirely.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Identity-Based Motivation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Identity-Based Motivation &mdash; &ldquo;I Am the Type of Person Who...&rdquo;
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                James Clear, author of <em>Atomic Habits</em>, makes a powerful argument about the
                deepest source of sustainable motivation: identity. Clear argues that there are
                three layers at which change can occur. The outermost layer is{' '}
                <strong>outcomes</strong> &mdash; what you get (pass an exam, earn more money, get a
                promotion). The middle layer is <strong>processes</strong> &mdash; what you do
                (study for an hour each evening, practise cable calculations, attend CPD events).
                The innermost layer is <strong>identity</strong> &mdash; what you believe about
                yourself. Most people start from the outside in: they set an outcome goal and try to
                build processes to achieve it. Clear argues that the most effective and lasting
                change works from the inside out: start with identity.
              </p>

              <p>
                When you adopt the identity of a growth-oriented professional &mdash; &ldquo;I am
                the type of person who is always learning and improving&rdquo; &mdash; your
                behaviours flow naturally from that belief. You study not because you have to pass
                an exam but because that is who you are. You seek feedback not because your employer
                requires it but because growth-oriented people seek feedback. You take on challenges
                not because someone assigned them but because you are someone who grows through
                challenge. You read BS 7671 not because you might get caught out on site but because
                professionals stay current with their regulations.
              </p>

              <p>
                The mechanism is what psychologists call{' '}
                <strong>identity-behaviour consistency</strong>. Humans have a deep need to act in
                ways that are consistent with their self-image. If you believe you are a serious
                professional who cares about quality, you will naturally resist cutting corners
                because it would conflict with your identity. If you believe you are someone who is
                always growing, you will naturally seek out learning opportunities because not doing
                so would feel wrong. This is far more powerful than willpower because it does not
                require constant effort &mdash; it is your default mode of operation.
              </p>

              <p>
                How do you build a growth identity? Clear offers a simple model: every action you
                take is a vote for the type of person you wish to become. Each time you study when
                you do not feel like it, you cast a vote for &ldquo;I am someone who shows up and
                does the work.&rdquo; Each time you ask for feedback on your work, you cast a vote
                for &ldquo;I am someone who values improvement over ego.&rdquo; Each time you take
                on a challenging task instead of playing it safe, you cast a vote for &ldquo;I am
                someone who grows through challenge.&rdquo; You do not need a unanimous vote &mdash;
                you just need a majority. Over time, the accumulated evidence of your own behaviour
                builds a new identity that sustains itself.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Building Your Growth Identity &mdash; Practical Exercise
                </p>
                <p className="text-base text-white leading-relaxed">
                  Write down three identity statements that you want to be true about yourself as an
                  electrical professional. For example: &ldquo;I am the type of electrician who
                  always checks their work twice.&rdquo; &ldquo;I am someone who invests in
                  continuous learning.&rdquo; &ldquo;I am a professional who holds himself to the
                  highest standards.&rdquo; Now, for each statement, identify one small daily action
                  that would be consistent with that identity. The goal is not to transform
                  overnight but to start casting votes &mdash; one action at a time &mdash; for the
                  person you want to become.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Intrinsic vs Extrinsic Motivation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Intrinsic vs Extrinsic Motivation &mdash; Money Is Necessary but Not Sufficient
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A fundamental distinction in motivation research is between{' '}
                <strong>extrinsic motivation</strong> (doing something because of an external reward
                or punishment) and <strong>intrinsic motivation</strong> (doing something because it
                is inherently interesting, satisfying, or meaningful). Both types are real, and both
                have their place. But they have very different properties when it comes to
                sustaining long-term effort and engagement.
              </p>

              <p>
                Extrinsic motivation is powered by external factors: money, status, qualifications,
                approval from others, fear of punishment. It is effective for driving short-term,
                straightforward behaviours. If someone offers you &pound;500 to complete a task by
                Friday, you will probably do it. But extrinsic motivation has significant
                limitations. It requires constant external reinforcement &mdash; remove the reward
                or punishment and the behaviour often stops. It can undermine intrinsic motivation
                (a phenomenon called the <strong>overjustification effect</strong>): when people are
                paid for an activity they previously enjoyed, they sometimes enjoy it less because
                the external reward replaces the internal satisfaction. And it tends to produce
                minimum viable effort &mdash; people do just enough to get the reward, not more.
              </p>

              <p>
                Intrinsic motivation is powered by internal factors: curiosity, mastery, purpose,
                autonomy, the satisfaction of doing meaningful work well. It does not require
                constant external reinforcement because the reward is built into the activity
                itself. People who are intrinsically motivated tend to work harder, persist longer,
                produce higher quality output, and report greater satisfaction than those who are
                purely extrinsically motivated. Intrinsic motivation is the engine of long-term
                professional excellence.
              </p>

              <p>
                For electricians, the practical implication is this: money matters. Fair
                compensation is essential. You deserve to be well paid for skilled, safety-critical
                work. But money alone will not sustain your motivation over a 40-year career. The
                electricians who maintain high standards, continue learning, and find genuine
                satisfaction in their work are those who have cultivated intrinsic motivation
                &mdash; the love of the craft, the satisfaction of quality work, the pride in
                protecting people&rsquo;s safety, the intellectual challenge of problem solving. If
                your only motivation is the pay cheque, you will eventually plateau, cut corners,
                and lose the spark that drew you to the trade. If you can connect to intrinsic
                drivers &mdash; autonomy, mastery, purpose &mdash; the pay cheque becomes a welcome
                consequence of work you would find meaningful regardless.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Motivation Spectrum</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Pure extrinsic:</strong> &ldquo;I only do this for the money. If I won
                      the lottery, I would never touch a screwdriver again.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Mixed:</strong> &ldquo;The money is important, but I also take pride
                      in doing good work and I enjoy the problem-solving aspect.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Intrinsically rich:</strong> &ldquo;I need to earn a living, but I
                      genuinely love this trade. The craftsmanship, the technical challenge, the
                      satisfaction of a job done properly &mdash; that is what keeps me
                      going.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Grit — Passion and Perseverance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Grit &mdash; Passion and Perseverance for Very Long-Term Goals
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Angela Duckworth, professor of psychology at the University of Pennsylvania, spent
                years studying why some people succeed and others do not. Her research across
                diverse populations &mdash; West Point military cadets, National Spelling Bee
                contestants, novice teachers in tough schools, salespeople in challenging markets
                &mdash; led her to identify a single quality that was a better predictor of success
                than IQ, talent, physical fitness, or socioeconomic background. She called it{' '}
                <strong>grit</strong>.
              </p>

              <p>
                Duckworth defines grit as the combination of <strong>passion</strong> (sustained
                interest in a particular field or pursuit over years and decades) and{' '}
                <strong>perseverance</strong> (the ability to persist through difficulty, setback,
                failure, and tedium without giving up). Grit is not about short-term intensity
                &mdash; it is about long-term consistency. The gritty person does not necessarily
                work harder than anyone else on any given day, but they keep showing up, day after
                day, month after month, year after year. They do not abandon their goals when things
                get difficult or boring. They do not constantly switch directions in search of
                something easier or more exciting. They commit deeply and persist relentlessly.
              </p>

              <p>
                For electricians, grit is directly relevant because the trade rewards long-term
                commitment. An apprenticeship takes three to four years. Becoming genuinely
                competent takes five to ten years. Becoming an expert &mdash; the electrician other
                electricians call when they are stuck &mdash; takes 15 to 20 years of sustained
                practice and learning. These timescales require grit. The apprentice who quits in
                year two because the work is repetitive does not lack talent &mdash; they lack grit.
                The electrician who abandons their 2391 after one failed attempt does not lack
                intelligence &mdash; they lack grit. The business owner who closes down after the
                first difficult winter does not lack skill &mdash; they lack grit.
              </p>

              <p>
                Duckworth identifies four psychological assets that contribute to grit:{' '}
                <strong>interest</strong> (genuine fascination with your field &mdash; for
                electricians, this might be the intellectual challenge, the variety of work, or the
                technology), <strong>practice</strong> (the discipline to engage in deliberate,
                focused improvement &mdash; not just doing the work but actively trying to get
                better at it), <strong>purpose</strong> (the conviction that your work matters
                beyond yourself &mdash; safety, quality, service), and <strong>hope</strong> (the
                belief that your efforts can improve your future &mdash; growth mindset). These four
                assets can all be developed, which means grit itself can be cultivated. You are not
                born gritty or not gritty &mdash; you build grit through choices, habits, and
                environment.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Building Your Grit</p>
                <p className="text-base text-white leading-relaxed">
                  Grit is not a fixed personality trait &mdash; it is built through daily choices.
                  Each time you finish a hard task instead of quitting, you build grit. Each time
                  you show up to study when you would rather watch television, you build grit. Each
                  time you analyse a failure for lessons instead of giving up, you build grit.
                  Surround yourself with gritty people &mdash; their persistence is contagious. And
                  remember Duckworth&rsquo;s Hard Thing Rule: do one hard thing at a time, do not
                  quit in the middle, and choose your own hard thing. Over months and years, these
                  choices compound into a resilient, persistent character.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: The Role of Community */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            The Role of Community in Sustained Motivation
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Human beings are social creatures. Our motivation is profoundly influenced by the
                people around us &mdash; their expectations, their standards, their behaviour, and
                their support. Research in social psychology consistently shows that people who
                pursue goals within a supportive community are significantly more likely to succeed
                than those who go it alone. This is not because community members do the work for
                you &mdash; it is because community provides accountability, normalises struggle,
                offers practical support, and creates a shared identity that reinforces commitment.
              </p>

              <p>
                <strong>Accountability.</strong> When you tell someone else about your goal, you
                create an external commitment that is harder to break than a private intention.
                Research by the American Society of Training and Development found that people who
                made a specific accountability appointment with someone they respected had a 95%
                chance of completing a goal, compared to 10% for those who merely had an intention.
                For electricians, accountability might come from a study partner, a mentor, a
                professional group, or an online community where you share your progress and receive
                feedback.
              </p>

              <p>
                <strong>Normalising struggle.</strong> One of the most demoralising aspects of
                pursuing a difficult goal is the belief that you are the only one finding it hard.
                Community dispels this illusion. When you hear other electricians talk about failing
                their AM2, struggling with three-phase theory, or having a terrible first year in
                business, you realise that your struggles are normal and shared. This normalisation
                of difficulty is incredibly important for persistence because it prevents the fixed
                mindset conclusion (&ldquo;I am uniquely bad at this&rdquo;) and replaces it with a
                growth mindset understanding (&ldquo;This is hard for everyone, and others have
                pushed through it&rdquo;).
              </p>

              <p>
                <strong>Raising your standards.</strong> You are the average of the five people you
                spend the most time with &mdash; this popular attribution captures a real
                psychological phenomenon. The people around you set an implicit standard that
                influences your behaviour. If you surround yourself with electricians who cut
                corners, complain about regulations, and avoid learning, you will unconsciously
                drift towards those behaviours. If you surround yourself with electricians who take
                pride in their work, pursue qualifications, discuss regulations with genuine
                interest, and hold themselves to high standards, you will unconsciously raise your
                game. Deliberately choose your professional community.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Building Your Professional Community
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Find an accountability partner:</strong> Another electrician pursuing
                      similar goals. Check in weekly. Share progress and challenges.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Join professional bodies:</strong> The IET, ECA, NAPIT, or local
                      electrician groups. Attend events. Engage with peers who care about quality.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use online communities:</strong> Forums, social media groups, and
                      platforms like Elec-Mate where you can discuss, learn, and share.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Mentor or be mentored:</strong> Teaching others deepens your own
                      understanding and reinforces your growth identity.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Avoiding Burnout */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Avoiding Burnout &mdash; Rest and Recovery as Part of Growth
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a crucial difference between productive pushing and destructive overwork,
                and understanding this difference can save your career, your health, and your
                relationships. Productive pushing means deliberately challenging yourself, accepting
                discomfort as part of growth, and working hard during focused periods. Destructive
                overwork means ignoring your body&rsquo;s signals, sacrificing recovery, and pushing
                past the point of diminishing returns until you break down. The first leads to
                growth. The second leads to burnout.
              </p>

              <p>
                <strong>Burnout</strong> is not simply being tired. The World Health Organisation
                defines it as an occupational phenomenon resulting from chronic workplace stress
                that has not been successfully managed. It is characterised by three dimensions:{' '}
                <strong>emotional exhaustion</strong> (feeling drained, depleted, unable to cope),{' '}
                <strong>depersonalisation</strong> (becoming cynical, detached, and negative about
                your work), and <strong>reduced personal accomplishment</strong> (feeling
                ineffective, doubting your competence, losing the sense that your work matters).
                Burnout does not happen overnight &mdash; it builds gradually over weeks and months
                of sustained overload without adequate recovery.
              </p>

              <p>
                For electricians, burnout risk is significant. Long hours on site, physical demands,
                the mental load of safety-critical work, the stress of running a business, the
                pressure to earn more by taking on more jobs, and the expectation to also pursue
                qualifications and CPD in your &ldquo;spare time&rdquo; can create an unsustainable
                workload. Warning signs include: persistent fatigue that rest does not resolve,
                dreading work that you previously enjoyed, making more mistakes than usual, becoming
                irritable with clients or colleagues, withdrawing from social connections, losing
                the sense of satisfaction in quality work, and feeling that no matter how hard you
                work, it is never enough.
              </p>

              <p>
                The antidote to burnout is not more motivation or more effort &mdash; it is
                strategic rest and recovery.{' '}
                <strong>Rest is not the opposite of growth &mdash; it is part of growth.</strong> In
                sports science, this is well understood: muscles grow during recovery, not during
                exercise. The training session creates the stimulus; rest allows the adaptation. The
                same principle applies to cognitive and professional development. Your brain
                consolidates learning during sleep and downtime. Your creativity and problem-solving
                ability are enhanced by periods of unfocused time. Your motivation replenishes when
                you allow yourself genuine breaks from work and study.
              </p>

              <p>
                Build recovery into your schedule as deliberately as you build work into it. Protect
                your sleep (seven to nine hours &mdash; this is non-negotiable for cognitive
                function and learning). Take at least one full day per week where you do not study,
                do not check work messages, and do not think about your career. Use your annual
                leave for genuine rest, not for catching up on CPD. Set boundaries around your
                working hours. Learn to say no to additional work when your plate is full. These are
                not signs of weakness &mdash; they are signs of intelligent self-management. The
                electrician who works sustainably for 40 years will achieve far more than the one
                who burns out in 15.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Burnout Warning Checklist
                </p>
                <p className="text-base text-white leading-relaxed">
                  If you recognise three or more of these signs, take action now: persistent fatigue
                  that sleep does not fix &bull; dreading Monday mornings &bull; cynicism about your
                  work or clients &bull; making more mistakes than usual &bull; irritability with
                  people close to you &bull; loss of satisfaction in quality work &bull; feeling
                  that your effort makes no difference &bull; withdrawing from social activities
                  &bull; physical symptoms (headaches, muscle tension, sleep problems). Burnout is
                  not a badge of honour &mdash; it is a sign that your system needs recalibration.
                  Rest, boundaries, and professional support are the appropriate responses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: The Long Game */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            The Long Game &mdash; What Ten Years of Growth Can Achieve
          </h2>
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Bill Gates is often quoted as saying: &ldquo;Most people overestimate what they can
                do in one year and underestimate what they can do in ten years.&rdquo; This
                observation captures one of the most important principles of long-term professional
                development: the <strong>compounding effect</strong>. Just as compound interest
                turns small financial investments into significant wealth over time, compound
                learning turns small daily investments in your development into extraordinary
                capability over years and decades.
              </p>

              <p>
                Consider the maths. If you invest just 30 minutes per day in deliberate professional
                development &mdash; studying regulations, practising calculations, reading technical
                articles, watching instructional videos, reflecting on your work &mdash; that is 182
                hours per year. Over ten years, that is 1,820 hours of focused development on top of
                your normal work experience. Anders Ericsson&rsquo;s research suggests that
                approximately 10,000 hours of deliberate practice are required for world-class
                expertise, but even 1,820 hours of intentional learning puts you in an elite
                category within your profession. And this does not account for the compounding
                effect: each year&rsquo;s learning builds on the previous year&rsquo;s, so your rate
                of development accelerates over time.
              </p>

              <p>
                Now consider the alternative. An electrician who stops learning after qualifying,
                who does the same type of work year after year without seeking new challenges, who
                avoids qualifications and CPD, who never updates their knowledge of new regulations
                or technologies &mdash; where will they be in ten years? Probably in roughly the
                same place they are now, but with outdated knowledge and fewer options. The gap
                between the electrician who invests 30 minutes a day and the one who invests nothing
                widens dramatically over time, particularly in a trade where technology,
                regulations, and client expectations are constantly evolving.
              </p>

              <p>
                The long game requires patience. In the first year of intentional development, the
                results are often invisible. You study, you practise, you seek feedback, but the
                improvement feels marginal. This is the period where most people give up because the
                effort-to-reward ratio seems poor. But growth is not linear &mdash; it is
                exponential. There is a tipping point, usually around year two or three, where your
                accumulated knowledge and skill reach a critical mass and your capability begins to
                accelerate noticeably. Other people start to see you differently. Opportunities
                appear. Your confidence grows. And by year five or ten, you are operating at a level
                that would have seemed impossible from where you started.
              </p>

              <p>
                Think about where you were ten years ago. If you are an experienced electrician,
                think about how much you have learned, how much your skills have developed, how many
                challenges you have overcome that once seemed insurmountable. Now imagine what
                another ten years of <em>intentional</em> growth could produce &mdash; not just the
                passive experience of showing up to work, but active, deliberate, strategic
                development. The possibilities are genuinely extraordinary. Most people do not
                pursue them because they cannot see the payoff from today&rsquo;s vantage point. But
                that is precisely the point: the long game rewards those who play it even before
                they can see the destination.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Compound Growth Calculation
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>30 minutes per day</strong> = 182 hours per year = 1,820 hours over 10
                      years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>One new skill per quarter</strong> = 4 per year = 40 new skills over
                      10 years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>One qualification every two years</strong> = 5 additional
                      qualifications over a decade
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Compound effect:</strong> Each year&rsquo;s growth builds on every
                      previous year, creating exponential rather than linear development
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Your Growth Commitment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">11</span>
            Your Growth Commitment &mdash; A Personal Statement
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Throughout this course, you have studied the psychology of growth, the science of
                goal setting, the architecture of habit, the principles of resilience, and the
                frameworks for sustained motivation. You have learned that mindset determines
                trajectory, that goals must be specific and strategic, that habits are the building
                blocks of long-term change, that resilience can be developed through practice, and
                that motivation is not something you wait for but something you create through
                action. Now it is time to bring it all together into a personal commitment.
              </p>

              <p>
                A growth commitment is not a New Year&rsquo;s resolution or a vague aspiration. It
                is a deliberate, written statement of who you intend to be as a professional and how
                you intend to develop. It draws on every module in this course:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>From Module 1 (The Psychology of Growth):</strong> Your mindset &mdash;
                    the belief that you can develop, improve, and grow throughout your entire
                    career. The word &ldquo;yet&rdquo; is permanently in your vocabulary.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>From Module 2 (Setting Effective Goals):</strong> Your goals &mdash;
                    specific, measurable, time-bound objectives that stretch you without breaking
                    you. You know the difference between process goals and outcome goals, and you
                    prioritise the former.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>From Module 3 (Building Habits That Last):</strong> Your systems &mdash;
                    the daily routines and habits that make growth automatic rather than dependent
                    on willpower. You understand the habit loop and know how to design your
                    environment for success.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>From Module 4 (Overcoming Obstacles &amp; Building Resilience):</strong>{' '}
                    Your resilience &mdash; the ability to persist through setbacks, learn from
                    failure, and maintain your commitment when things get difficult. You have
                    strategies for the messy middle and tools for managing adversity.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>From Module 5 (Your Growth Action Plan):</strong> Your motivation
                    framework &mdash; the understanding that action creates motivation, that
                    autonomy, mastery, and purpose are your long-term engines, and that identity is
                    the deepest source of sustained drive.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Writing Your Growth Commitment
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  Take 15 minutes to write your personal growth commitment. It should include:
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li>
                    <strong>Your identity statement:</strong> &ldquo;I am the type of electrician
                    who...&rdquo;
                  </li>
                  <li>
                    <strong>Your three-year vision:</strong> Where you want to be professionally in
                    three years
                  </li>
                  <li>
                    <strong>Your keystone habit:</strong> The one daily habit that will drive the
                    most growth
                  </li>
                  <li>
                    <strong>Your accountability system:</strong> Who will hold you accountable and
                    how
                  </li>
                  <li>
                    <strong>Your burnout boundary:</strong> The line you will not cross in pursuit
                    of your goals
                  </li>
                  <li>
                    <strong>Your &ldquo;why&rdquo;:</strong> The deeper purpose that connects your
                    work to something meaningful
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Course Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">12</span>
            Course Summary &mdash; Your Growth Philosophy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You have now completed all five modules of the Goal Setting &amp; Growth course.
                This is a significant achievement &mdash; not because of the content you have read,
                but because of the commitment you have demonstrated by following through to the end.
                Completing this course is itself an act of growth mindset: you chose to invest time
                in your development, you persisted through sections that may have challenged or
                confronted you, and you are now here, at the finish line, with a deeper
                understanding of what it takes to grow as a professional.
              </p>

              <p>
                Let us pull together the core principles from all five modules into a coherent
                growth philosophy that you can carry forward for the rest of your career:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Mindset is the foundation.</strong> Your beliefs about your own capacity
                    determine your trajectory. A growth mindset &mdash; the belief that abilities
                    can be developed through effort, strategy, and persistence &mdash; opens doors
                    that a fixed mindset keeps permanently closed. The word &ldquo;yet&rdquo; is
                    your most powerful tool.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Goals provide direction.</strong> Without specific, strategic goals,
                    growth is random and inefficient. Effective goals are specific, measurable,
                    challenging but achievable, time-bound, and broken into process-level actions.
                    Write them down. Review them regularly. Adjust them when circumstances change.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habits are the vehicle.</strong> Goals tell you where to go; habits take
                    you there. The most powerful habits are small, consistent, and anchored to
                    existing routines. Design your environment to make good habits easy and bad
                    habits hard. Focus on systems, not willpower.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Resilience is the armour.</strong> Setbacks, failures, and difficulties
                    are not obstacles to growth &mdash; they are the terrain of growth. Resilience
                    is built through experience, reframing, self-compassion, and the deliberate
                    cultivation of a &ldquo;bounce-back&rdquo; mindset. Every experienced
                    electrician has a collection of failures that taught them more than their
                    successes ever did.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Motivation is created, not found.</strong> Stop waiting to feel
                    motivated. Start doing the work, and the motivation will follow. Build systems
                    that make action automatic. Cultivate autonomy, mastery, and purpose as your
                    long-term engines. Adopt a growth identity. Play the long game. And protect your
                    energy through rest, recovery, and boundaries.
                  </span>
                </li>
              </ul>

              <p>
                The electrical trade is one of the most rewarding careers available. It combines
                intellectual challenge with physical skill, safety-critical responsibility with
                creative problem solving, technical precision with human interaction. It offers the
                possibility of autonomy, mastery, and purpose in abundance. But realising that
                potential requires more than talent or time served &mdash; it requires the
                deliberate, sustained commitment to growth that this course has been designed to
                support.
              </p>

              <p>
                You now have the knowledge. You have the frameworks. You have the tools. The only
                remaining question is: will you use them? The answer is not in this course &mdash;
                it is in the choices you make tomorrow morning, and the morning after that, and
                every morning for the rest of your career.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Your Journey Continues</p>
                <p className="text-base text-white leading-relaxed">
                  This course is a beginning, not an end. The concepts you have learned &mdash;
                  growth mindset, goal setting, habit formation, resilience, and sustained
                  motivation &mdash; are not things you learn once and then know forever. They are
                  practices that require ongoing attention, refinement, and recommitment. Come back
                  to these materials when you need a reminder. Share what you have learned with
                  colleagues and apprentices. And above all, keep growing. The trade needs
                  electricians who are committed to excellence, and that commitment starts with the
                  decision you make right now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">13</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This final section has explored the science and practice of staying motivated over
                the long term. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The motivation myth:</strong> Action creates motivation, not the other
                    way around. Stop waiting to feel motivated and start doing the work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Daniel Pink&rsquo;s Drive:</strong> Autonomy, mastery, and purpose are
                    the three pillars of intrinsic motivation &mdash; far more powerful than money
                    alone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The messy middle:</strong> Every significant goal has a demoralising
                    middle phase. Recognise it, expect it, and persist through it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Identity-based motivation:</strong> The most sustainable motivation
                    comes from adopting an identity consistent with your goals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Grit:</strong> Passion plus perseverance for very long-term goals is the
                    single best predictor of success.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Community matters:</strong> Accountability, normalised struggle, and
                    raised standards come from surrounding yourself with growth-oriented
                    professionals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Rest is part of growth:</strong> Burnout is not a badge of honour.
                    Strategic recovery is essential for sustained high performance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Play the long game:</strong> Small daily investments compound into
                    extraordinary results over a decade. Be patient, be consistent, and trust the
                    process.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Congratulations:</strong> You have completed all
                  five modules of the Goal Setting &amp; Growth course. You now have the knowledge,
                  frameworks, and tools to build a career of continuous improvement. The mock exam
                  on the next page will test your understanding across all five modules. Good luck
                  &mdash; and keep growing.
                </p>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../gs-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
