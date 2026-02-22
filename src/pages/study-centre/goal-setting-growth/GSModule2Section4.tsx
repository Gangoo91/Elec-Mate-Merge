import { ArrowLeft, Map, CheckCircle } from 'lucide-react';
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
    id: 'gs-2-4-check1',
    question:
      'Dr Gail Matthews&rsquo; study at Dominican University found that people who wrote down their goals were approximately how much more likely to achieve them compared to those who only thought about their goals?',
    options: [
      '10% more likely &mdash; a marginal improvement at best',
      '25% more likely &mdash; a moderate but meaningful advantage',
      '42% more likely &mdash; a substantial and statistically significant improvement',
      '80% more likely &mdash; writing goals virtually guarantees success',
    ],
    correctIndex: 2,
    explanation:
      'Dr Gail Matthews&rsquo; 2015 study at Dominican University of California recruited 267 participants from a wide range of backgrounds and professions. She divided them into groups with varying levels of goal-setting formality. The group that wrote down their goals, formulated action commitments, and sent weekly progress reports to a supportive friend achieved 42% more of their goals than the group that simply thought about them. This is a substantial effect &mdash; nearly half again as many goals achieved simply by writing them down and building accountability. The study reinforces a core principle of goal mapping: externalising goals (getting them out of your head and onto paper or a screen) transforms them from vague intentions into concrete commitments. For electricians planning their career development &mdash; whether aiming for a new qualification, starting a business, or specialising in a niche &mdash; writing the goal down is the single most impactful first step.',
  },
  {
    id: 'gs-2-4-check2',
    question:
      'Peter Gollwitzer&rsquo;s research on &ldquo;implementation intentions&rdquo; found that the most effective format for turning goals into action is:',
    options: [
      'Writing a long, detailed plan covering every possible scenario',
      'Using the &ldquo;if-then&rdquo; format: &ldquo;If situation X arises, I will perform response Y&rdquo;',
      'Telling as many people as possible about your goals without a specific plan',
      'Setting only very large, ambitious goals that inspire maximum motivation',
    ],
    correctIndex: 1,
    explanation:
      'Peter Gollwitzer, a professor of psychology at New York University, developed the concept of implementation intentions in the 1990s. His research demonstrated that goals stated in an abstract form (&ldquo;I want to get fitter&rdquo;) are far less likely to be achieved than goals linked to specific situational cues using an if-then format (&ldquo;If it is 6:30 a.m. on a weekday, then I will put on my running shoes and go for a 20-minute jog&rdquo;). The if-then format works because it creates a mental link between a specific situation (the &ldquo;if&rdquo;) and a specific action (the &ldquo;then&rdquo;), effectively delegating the decision to act from conscious willpower to automatic situational response. A meta-analysis of 94 independent studies found that implementation intentions had a medium-to-large effect on goal attainment (d = 0.65). For electricians, this translates to practical applications: &ldquo;If it is Sunday evening, then I will study BS 7671 for 45 minutes&rdquo; or &ldquo;If I finish a job early on Friday, then I will review one chapter of the inspection and testing textbook.&rdquo;',
  },
  {
    id: 'gs-2-4-check3',
    question:
      'Stephen Covey&rsquo;s &ldquo;personal mission statement&rdquo; concept, as outlined in The 7 Habits of Highly Effective People, primarily serves to:',
    options: [
      'Replace the need for specific goals by providing a general sense of direction',
      'Define the core values, principles, and long-term vision that guide all subsequent goal-setting decisions',
      'Impress potential employers and clients during job applications',
      'Eliminate the need for short-term planning by focusing only on the distant future',
    ],
    correctIndex: 1,
    explanation:
      'Covey&rsquo;s personal mission statement (from Habit 2: &ldquo;Begin with the End in Mind&rdquo;) is a foundational exercise that defines who you want to be and what you want to achieve at the deepest level. It is not a replacement for specific goals &mdash; it is the compass that ensures your specific goals are pointed in the right direction. Without a personal mission statement (or something equivalent), you risk setting and achieving goals that do not actually make you happier, more fulfilled, or more aligned with your values. A domestic electrician might set a goal to earn &pound;80,000 per year, but if their personal mission statement reveals that family time and work-life balance matter more than income, they might achieve the financial goal at the cost of what truly matters to them. The personal mission statement sits above all other goals as the guiding framework. It answers the question: &ldquo;What does a successful life look like for me?&rdquo; &mdash; not according to society, social media, or colleagues, but according to your own deepest values.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I&rsquo;ve never done any kind of goal mapping before &mdash; isn&rsquo;t it just for corporate types?',
    answer:
      'Absolutely not. Goal mapping has its roots in research that applies to everyone &mdash; from Olympic athletes to small business owners to tradespeople. The format does not need to be corporate or complicated. A personal goal map for an electrician might be a single sheet of A4 with six life areas listed down the side and a 12-month goal written next to each one. It could be a page in a notebook, a whiteboard in your garage, or a simple spreadsheet on your phone. The point is not the format &mdash; it is the act of getting your goals out of your head and into a structured, visible form. Dr Gail Matthews&rsquo; research showed that even a minimal level of externalisation (writing goals down) produces a 42% improvement in achievement. You do not need coloured pens, a vision board, or a corporate planning retreat. You need a quiet half hour, honest reflection, and something to write on.',
  },
  {
    question: 'How often should I review and update my personal goal map?',
    answer:
      'Best practice, supported by research on goal monitoring (Harkin et al., 2016 meta-analysis of 138 studies), is to review goals at multiple time scales. Your daily review should take 2&ndash;5 minutes &mdash; check today&rsquo;s action items. A weekly review (15&ndash;30 minutes, typically Sunday evening) should assess the past week&rsquo;s progress and set next week&rsquo;s priorities. A monthly review (30&ndash;60 minutes) should evaluate whether you are on track for your quarterly objectives. A quarterly deep review (1&ndash;2 hours) should assess your 12-month goals and make adjustments. An annual review (half a day) should reassess your 5-year vision, your personal mission statement, and your wheel-of-life balance. The exact frequency matters less than consistency &mdash; a review you actually do every week is better than a perfect system you abandon after a month. Most successful tradespeople who use goal mapping find that a brief weekly review and a deeper monthly review are the minimum for staying on track.',
  },
  {
    question:
      'What do I do when two goals directly conflict with each other &mdash; for example, earning more money versus spending more time with family?',
    answer:
      'Goal conflict is one of the most common and most important challenges in personal goal mapping, and ignoring it is one of the main reasons goal systems fail. The first step is to make the conflict visible &mdash; write both goals down and explicitly state the tension. The second step is to return to your personal mission statement and values: which of these goals is more aligned with what truly matters to you? The third step is to look for creative solutions that partially satisfy both goals. An electrician wanting to earn more while also spending more time at home might: negotiate higher rates rather than longer hours, specialise in higher-value work (e.g., inspection or design) that pays more per hour, hire an apprentice to leverage their time, or set a realistic income target that allows for the family time they want. Sometimes you must make a genuine trade-off, and the honest answer is that you cannot maximise both simultaneously. The goal map makes this trade-off conscious rather than unconscious, which leads to better decisions and less resentment.',
  },
  {
    question: 'Is a paper-based goal map better than a digital one, or does it not matter?',
    answer:
      'Research suggests that the act of handwriting activates more cognitive processes than typing (Mueller &amp; Oppenheimer, 2014 &mdash; the &ldquo;pen is mightier than the keyboard&rdquo; study), which may improve encoding and commitment. However, the practical advantage of digital tools is that they are always accessible, easily updated, and can send you reminders. The most effective approach for most tradespeople is a hybrid system: create your initial goal map by hand (on paper, a whiteboard, or a printed template) to get the deep thinking and encoding benefits, then transfer the key goals and action items to a digital system you carry with you (even a simple notes app on your phone). The tool matters far less than the habit of reviewing and updating. The best goal mapping system is the one you will actually use consistently. A crumpled sheet of paper in your van that you check every Monday morning is infinitely more effective than an elaborate Notion dashboard you set up once and never open again.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'The &ldquo;wheel of life&rdquo; assessment is a tool used in personal goal mapping to:',
    options: [
      'Calculate the exact number of hours available for each goal per week',
      'Rate your current satisfaction (1&ndash;10) across multiple life areas to identify imbalances and prioritise where to focus',
      'Rank your goals in order of financial return to maximise income',
      'Determine which career path will make you the happiest based on personality type',
    ],
    correctAnswer: 1,
    explanation:
      'The wheel of life is a widely used coaching and personal development tool that asks you to rate your current satisfaction on a scale of 1&ndash;10 across multiple life areas (typically 6&ndash;8 areas such as career, finances, health, relationships, personal development, and recreation). The result is a visual &ldquo;wheel&rdquo; shape that immediately reveals where your life is in balance and where it is not. A perfectly balanced wheel (all areas rated similarly) rolls smoothly; an imbalanced wheel (some areas high, others very low) creates a bumpy ride. The purpose is not to maximise every area simultaneously &mdash; that is unrealistic &mdash; but to identify areas of significant neglect that may be undermining your overall satisfaction and to set goals that address those imbalances. For electricians, common patterns include high scores in career/skills but low scores in health, family time, or financial planning.',
  },
  {
    id: 2,
    question:
      'The Eisenhower Matrix categorises tasks into four quadrants. Which quadrant contains tasks that are &ldquo;important but not urgent&rdquo; and is considered the most strategically valuable for long-term goal achievement?',
    options: [
      'Quadrant 1: Urgent and Important',
      'Quadrant 2: Important but Not Urgent',
      'Quadrant 3: Urgent but Not Important',
      'Quadrant 4: Neither Urgent nor Important',
    ],
    correctAnswer: 1,
    explanation:
      'The Eisenhower Matrix (named after President Dwight D. Eisenhower and popularised by Stephen Covey in The 7 Habits of Highly Effective People) divides all tasks into four quadrants based on urgency and importance. Quadrant 2 &mdash; Important but Not Urgent &mdash; is widely recognised as the most strategically valuable. This quadrant includes activities such as long-term planning, professional development, health and fitness, relationship building, and working on goals that matter but do not have an immediate deadline. Most people spend the majority of their time in Quadrant 1 (fighting fires) and Quadrant 3 (responding to other people&rsquo;s urgencies), and neglect Quadrant 2 entirely. For electricians, Quadrant 2 activities include: studying for the next qualification, developing a business plan, improving testing skills through practice, building a referral network, getting a health check-up, or setting up financial systems. These are the activities that create the most long-term value but are constantly pushed aside by the daily urgency of jobs, callbacks, and deadlines.',
  },
  {
    id: 3,
    question:
      'When using the 5-step goal mapping process (5-year vision &rarr; 3-year milestones &rarr; 12-month goals &rarr; quarterly objectives &rarr; monthly actions), why is it important to start with the longest time horizon and work backwards?',
    options: [
      'Because longer-term goals are easier to set and require less thought',
      'Because starting with the end in mind ensures that short-term actions are aligned with your long-term direction, preventing busy activity that leads nowhere',
      'Because 5-year plans are always accurate and do not need revision',
      'Because short-term goals are unimportant compared to long-term aspirations',
    ],
    correctAnswer: 1,
    explanation:
      'Working backwards from a long-term vision is a principle known as &ldquo;backward planning&rdquo; or &ldquo;reverse engineering&rdquo; your goals, and it is grounded in Covey&rsquo;s Habit 2: Begin with the End in Mind. The reason it works is alignment. Without a clear long-term vision, your short-term actions may be productive but directionless &mdash; you stay busy but don&rsquo;t move towards anything meaningful. By defining where you want to be in 5 years first, then identifying the 3-year milestones needed to get there, then the 12-month goals, then the quarterly objectives, and finally this month&rsquo;s action list, every short-term task connects to the bigger picture. An electrician who sets a 5-year vision of &ldquo;running my own electrical contracting business specialising in commercial fit-outs&rdquo; will make very different monthly decisions (pursuing commercial experience, studying project management, saving capital, building commercial contacts) than one who has no vision and simply takes whatever work comes along. The 5-year plan will not be perfectly accurate &mdash; it will be revised &mdash; but it provides essential direction.',
  },
  {
    id: 4,
    question: 'A &ldquo;commitment device&rdquo; in the context of goal achievement is:',
    options: [
      'A written contract with a solicitor that legally binds you to complete your goal',
      'A strategy that increases the cost of inaction or the reward for action, such as telling others about your goal, placing a financial bet, or scheduling accountability check-ins',
      'A specialised app that tracks every minute of your day and assigns productivity scores',
      'A motivational poster or affirmation that you read every morning',
    ],
    correctAnswer: 1,
    explanation:
      'A commitment device is any strategy that makes it harder to abandon a goal by raising the stakes of giving up. The concept has roots in behavioural economics (Thaler &amp; Sunstein, Schelling) and has been extensively studied in the context of health behaviour, savings, and education. Common commitment devices include: public accountability (telling friends, family, or colleagues about your goal &mdash; research by Howard Klein et al. found that public goal commitment significantly increases follow-through), financial stakes (platforms like stickK allow you to pledge money that you lose if you fail), scheduled check-ins with an accountability partner, joining a study group, or booking and paying for an exam date in advance. For electricians, effective commitment devices include: telling your employer you plan to sit the 2391 exam by a specific date, booking and paying for a training course (sunk cost creates motivation), committing to a study group, or publicly sharing your business launch timeline. The underlying principle is that humans are more likely to follow through when inaction has visible consequences.',
  },
  {
    id: 5,
    question:
      'Which of the following is the BEST example of an implementation intention as defined by Peter Gollwitzer?',
    options: [
      '&ldquo;I will study harder for my 2391 exam this year&rdquo;',
      '&ldquo;If it is Tuesday evening after dinner, then I will study BS 7671 Chapter 41 for 45 minutes at the kitchen table&rdquo;',
      '&ldquo;I hope to read more technical books this quarter&rdquo;',
      '&ldquo;My goal is to become a better electrician by the end of the year&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'Gollwitzer&rsquo;s implementation intentions follow a strict if-then format that links a specific situational cue (&ldquo;If it is Tuesday evening after dinner&rdquo;) to a specific action (&ldquo;then I will study BS 7671 Chapter 41 for 45 minutes at the kitchen table&rdquo;). Option B is the only choice that contains all four required elements: a specific time (Tuesday evening after dinner), a specific trigger (finishing dinner), a specific action (study BS 7671 Chapter 41), and specific parameters (45 minutes, at the kitchen table). Options A, C, and D are all vague goal intentions &mdash; they express desire but lack the situational specificity that makes implementation intentions so effective. The research shows that implementation intentions work because they shift the control of behaviour from conscious deliberation (&ldquo;Should I study tonight? I&rsquo;m tired, maybe tomorrow...&rdquo;) to automatic situational cueing (&ldquo;It&rsquo;s Tuesday after dinner &mdash; time to study, that&rsquo;s what I do on Tuesdays&rdquo;). This dramatically reduces the reliance on willpower, which is a limited and unreliable resource.',
  },
  {
    id: 6,
    question: 'Stephen Covey&rsquo;s personal mission statement is most accurately described as:',
    options: [
      'A list of all the goals you want to achieve in the next 12 months',
      'A concise declaration of your core values, guiding principles, and long-term purpose that serves as the foundation for all other goal setting',
      'A one-sentence summary of your job title and key responsibilities',
      'A detailed business plan outlining revenue targets and growth projections',
    ],
    correctAnswer: 1,
    explanation:
      'Covey&rsquo;s personal mission statement (Habit 2: Begin with the End in Mind, from The 7 Habits of Highly Effective People, 1989) is a deeply personal declaration of who you want to be and what you want to achieve that goes beyond specific goals. It defines your core values (what matters most to you), your guiding principles (how you want to conduct yourself), and your long-term purpose (what you want your life to be about). It is not a list of goals &mdash; it is the compass that ensures your goals are pointed in the right direction. Covey recommended writing your mission statement as though you were imagining what you would want people to say about you at your funeral &mdash; a deliberately provocative exercise designed to strip away superficial ambitions and reveal what truly matters. For an electrician, a personal mission statement might include elements like: &ldquo;To be a trusted, competent, and continuously improving electrical professional who provides safe, high-quality work and mentors the next generation of tradespeople, while maintaining a healthy balance between work and family life.&rdquo;',
  },
  {
    id: 7,
    question:
      'When setting goals across multiple life areas, an electrician discovers that their goal to &ldquo;work every Saturday to maximise earnings&rdquo; directly conflicts with their goal to &ldquo;spend more quality time with my children at weekends&rdquo;. The BEST approach to resolving this goal conflict is:',
    options: [
      'Abandon the financial goal entirely, because family always comes first',
      'Ignore the conflict and hope that both goals will somehow work out',
      'Make the conflict explicit, return to core values and mission statement, explore creative compromises (e.g., higher rates instead of more hours), and if necessary make a conscious, values-aligned trade-off',
      'Work Saturdays and compensate by buying more things for the children',
    ],
    correctAnswer: 2,
    explanation:
      'Goal conflict is inevitable when you set goals across multiple life areas, and the worst response is to ignore it (Option B) or to make a knee-jerk decision based on guilt (Option A or D). The research-supported approach involves four steps. First, make the conflict visible by explicitly writing down both goals and stating the tension. Second, return to your personal mission statement and core values to determine which goal is more aligned with what truly matters to you. Third, explore creative solutions that partially satisfy both goals &mdash; for example, negotiating higher hourly rates (so you earn more without working more hours), specialising in higher-value work, working two Saturdays per month instead of four, or front-loading hours during the week. Fourth, if a genuine trade-off is necessary, make it consciously and with full awareness of the consequences. A conscious, values-aligned decision (&ldquo;I choose to cap Saturday work at twice a month because family time is more important to me than maximum earnings&rdquo;) is far healthier than an unconscious drift that leads to resentment and burnout.',
  },
  {
    id: 8,
    question:
      'According to the goal mapping process, what is the PRIMARY purpose of breaking a 12-month goal into quarterly objectives and monthly action lists?',
    options: [
      'To create more paperwork and bureaucracy that makes the process feel official',
      'To reduce a large, potentially overwhelming goal into manageable, actionable steps that maintain momentum and allow for regular progress assessment',
      'To ensure that you never need to revise or adjust your goals throughout the year',
      'To impress your employer by showing them a detailed plan during your annual review',
    ],
    correctAnswer: 1,
    explanation:
      'Breaking large goals into smaller, time-bound sub-goals is a principle supported by extensive research on goal proximity (Bandura &amp; Schunk, 1981; Stock &amp; Cervone, 1990). A 12-month goal like &ldquo;pass the 2391 Inspection &amp; Testing qualification&rdquo; can feel overwhelming and distant, leading to procrastination. But when broken into quarterly objectives (&ldquo;Q1: Complete study of BS 7671 Chapters 41&ndash;44; Q2: Practise inspection and testing on live installations; Q3: Enrol and attend formal 2391 course; Q4: Sit and pass the exam&rdquo;) and monthly actions (&ldquo;January: Study Chapter 41, complete 20 practice questions, watch 3 tutorial videos&rdquo;), the path becomes clear and achievable. Each completed sub-goal provides a sense of accomplishment (a dopamine reward that sustains motivation), allows you to assess whether you are on track, and gives you a natural point to adjust your approach if something is not working. This is why the goal mapping process starts with the long-term vision for direction but quickly converts into short-term actions for execution.',
  },
];

export default function GSModule2Section4() {
  useSEO({
    title: 'Creating Your Personal Goal Map | Goal Setting & Growth Module 2.4',
    description:
      'Build your personal goal map: the wheel of life, Eisenhower Matrix, implementation intentions, 5-step goal-setting process, and commitment devices for tradespeople.',
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
            <Link to="../gs-module-2">
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
            <Map className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Creating Your Personal Goal Map
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            A structured, visual overview of all your goals across life areas &mdash; your compass
            for intentional career and personal development
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Personal goal map:</strong> A single-page visual overview of goals across
                all major life areas
              </li>
              <li>
                <strong>Wheel of life:</strong> Rate satisfaction (1&ndash;10) across career,
                finances, health, relationships, and more to spot imbalances
              </li>
              <li>
                <strong>Implementation intentions:</strong> &ldquo;If X, then Y&rdquo; format turns
                vague goals into automatic actions
              </li>
              <li>
                <strong>Written goals:</strong> 42% more likely to be achieved than goals you only
                think about (Matthews, 2015)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Direction:</strong> Without a map, you react to whatever is in front of you
                rather than moving towards what matters
              </li>
              <li>
                <strong>Balance:</strong> Prevents overinvestment in one life area at the expense of
                others
              </li>
              <li>
                <strong>Clarity:</strong> Externalising your goals forces specificity and reveals
                conflicts before they sabotage you
              </li>
              <li>
                <strong>Accountability:</strong> A visible, structured plan is harder to ignore than
                a vague intention floating in your head
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the concept of a personal goal map and its role in structured self-development',
              'Conduct a wheel-of-life assessment to identify imbalances across major life areas',
              'Apply the Eisenhower Matrix to prioritise goals and tasks by urgency and importance',
              'Use the 5-step backward planning process (5-year vision to monthly actions) to create aligned goals',
              'Write implementation intentions in Gollwitzer&rsquo;s if-then format to bridge the intention-action gap',
              'Describe the evidence for writing goals down (Matthews, 2015) and using commitment devices to increase follow-through',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is a Personal Goal Map? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What is a Personal Goal Map?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A personal goal map is a structured, visual document that captures all of your goals
                across every significant area of your life. It is not a vague wish list or a set of
                New Year&rsquo;s resolutions destined to be forgotten by February. It is a
                deliberate, comprehensive overview of where you are now, where you want to be, and
                the specific steps you will take to get there. Think of it as a project plan for
                your life &mdash; the same disciplined approach an electrical contractor would apply
                to a commercial fit-out, applied to your own career and personal development.
              </p>

              <p>
                The concept draws on decades of research in goal-setting theory (Locke &amp;
                Latham), personal effectiveness (Stephen Covey), behavioural psychology (Peter
                Gollwitzer), and positive psychology (Martin Seligman). The core insight from all of
                this research is consistent: people who have clear, written, structured goals
                consistently outperform people who have vague intentions or no goals at all. This is
                not motivational rhetoric &mdash; it is a robust empirical finding replicated across
                hundreds of studies. Dr Gail Matthews&rsquo; 2015 study at Dominican University of
                California provided one of the clearest demonstrations: participants who wrote down
                their goals were 42% more likely to achieve them than those who merely thought about
                them.
              </p>

              <p>
                For electricians and tradespeople, a personal goal map addresses a specific problem:
                the tendency to let your career and life be driven by whatever happens next rather
                than by conscious choice. Most electricians did not enter the trade with a
                structured development plan. They completed an apprenticeship, gained some
                experience, perhaps picked up additional qualifications, and then settled into a
                pattern &mdash; doing similar work year after year, reacting to job availability,
                and never stepping back to ask: &ldquo;Where am I actually heading? Is this where I
                want to be in five years? Am I neglecting important areas of my life?&rdquo; A
                personal goal map forces these questions to the surface and provides a framework for
                answering them honestly.
              </p>

              <p>
                A well-constructed personal goal map typically includes: a personal mission
                statement (your guiding compass), a wheel-of-life assessment (where are you now
                across all life areas?), goals at multiple time horizons (5-year, 3-year, 12-month,
                quarterly, monthly), prioritisation using a framework like the Eisenhower Matrix,
                implementation intentions for key actions, and a review schedule. It does not need
                to be complex or beautifully designed &mdash; it needs to be honest, specific, and
                reviewed regularly.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Electrician&rsquo;s Goal Map vs a Business Plan
                </p>
                <p className="text-base text-white leading-relaxed">
                  A personal goal map is broader than a business plan. A business plan covers
                  revenue, clients, marketing, and operations. A personal goal map covers those
                  things <em>and</em> your health, your relationships, your qualifications, your
                  financial security, your personal interests, and your overall life satisfaction.
                  Many electricians are excellent at planning their business but terrible at
                  planning their life &mdash; they build a successful company while their health
                  deteriorates, their relationships suffer, or their personal development stalls.
                  The goal map ensures you see the whole picture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Life Areas for Tradespeople */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Life Areas for Tradespeople
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before you can map your goals, you need to define the life areas that matter to you.
                While the specific categories vary between individuals, research and coaching
                practice have identified six core areas that are particularly relevant for
                electricians and tradespeople. These form the segments of your wheel of life and the
                columns of your goal map.
              </p>

              <ul className="text-sm text-white space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Career &amp; Qualifications:</strong> This covers your technical
                    development, qualifications (AM2, 2391, 2395, HNC, degree), career progression
                    (apprentice to improver to qualified to supervisor to contractor), and
                    professional reputation. Where are you on the career ladder? What qualifications
                    do you need next? What skills do you want to develop? For many electricians,
                    this is the area they think about most, but often without a structured plan.
                    Common goals include: passing the next qualification within 12 months,
                    specialising in a niche (solar PV, EV charging, fire alarm, data), moving from
                    employment to self-employment, or transitioning from installation to inspection
                    and design.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Financial:</strong> This covers income, savings, debt, investments,
                    pension, and financial security. Electricians often earn well but manage money
                    poorly &mdash; high income with no emergency fund, no pension contributions, and
                    no plan for financial independence. Goals in this area might include: building a
                    three-month emergency fund (&pound;5,000&ndash;&pound;10,000), increasing day
                    rate from &pound;200 to &pound;280, eliminating consumer debt within 18 months,
                    starting a pension with 10% of income, or saving &pound;30,000 for a van and
                    tools to go self-employed. Financial goals should always include specific
                    numbers and timelines &mdash; &ldquo;save more money&rdquo; is not a goal;
                    &ldquo;save &pound;500 per month into a separate account starting in
                    March&rdquo; is.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Health &amp; Fitness:</strong> The electrical trade is physically
                    demanding &mdash; lifting, climbing, kneeling, working in confined spaces, early
                    starts, long days. Many electricians develop chronic back pain, knee problems,
                    poor sleep habits, and weight gain as they age. Yet health is often the most
                    neglected life area. Goals here might include: exercising three times per week,
                    losing a specific amount of weight, reducing alcohol consumption, improving
                    sleep quality, getting a health check-up, stretching daily, or addressing the
                    chronic shoulder pain you have been ignoring for two years. Physical health
                    directly impacts your earning capacity &mdash; an electrician who cannot work
                    due to a preventable injury has zero income.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Relationships &amp; Family:</strong> This covers your partner, children,
                    parents, friends, and social connections. The trades are notorious for
                    relationship strain &mdash; long hours, physical exhaustion, working away from
                    home, and the stress of self-employment all take a toll. Goals in this area
                    might include: being home for dinner at least four nights per week, having a
                    weekly date night, attending every one of your child&rsquo;s school events,
                    rebuilding a friendship you have let lapse, or improving communication with your
                    partner about work stress. These goals often conflict with career and financial
                    goals, which is why the goal map is essential &mdash; it makes the trade-offs
                    visible.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Business &amp; Professional Network:</strong> For self-employed
                    electricians and those planning to go self-employed, this area covers business
                    development: marketing, client relationships, pricing strategy, hiring, systems,
                    and professional networking. For employed electricians, it covers workplace
                    relationships, industry connections, and professional memberships (IET, ECA,
                    NICEIC, NAPIT). Goals might include: joining a professional body, attending two
                    industry events per year, developing a referral network, building a website,
                    establishing a social media presence, or learning basic bookkeeping.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Personal Development &amp; Interests:</strong> This covers everything
                    outside of work that contributes to your growth and fulfilment as a person:
                    hobbies, reading, travel, learning new skills unrelated to work, mental health,
                    mindfulness, and personal challenges. Tradespeople often define themselves
                    entirely by their work (&ldquo;I&rsquo;m an electrician&rdquo;) and neglect the
                    other dimensions of their identity. Goals here might include: reading one book
                    per month, learning a musical instrument, completing a DIY project at home,
                    starting a hobby, volunteering, or developing a mindfulness practice to manage
                    work stress.
                  </span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Why Six Areas? The Danger of Single-Area Focus
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      An electrician who focuses only on career goals may achieve impressive
                      qualifications but wreck their health and relationships in the process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      An electrician who focuses only on financial goals may earn a high income but
                      feel empty and unfulfilled because they have no personal interests or
                      meaningful relationships outside work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The goal map forces you to consider all six areas simultaneously, so that
                      progress in one area does not come at the unacceptable expense of another
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Stephen Covey's Personal Mission Statement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Stephen Covey&rsquo;s Personal Mission Statement
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before you set specific goals, you need a compass &mdash; something that tells you
                whether your goals are pointed in the right direction. Stephen Covey, in his
                landmark book <em>The 7 Habits of Highly Effective People</em> (1989), argued that
                the most effective starting point for goal setting is not a list of targets but a
                personal mission statement. This is Habit 2: &ldquo;Begin with the End in
                Mind.&rdquo;
              </p>

              <p>
                A personal mission statement is a concise declaration of who you want to be, what
                you want to achieve, and the values and principles that will guide you. Covey
                recommended a powerful exercise to develop it: imagine your own funeral, three years
                from now. What would you want your partner, your children, your colleagues, your
                friends, and your apprentices to say about you? What kind of person would you want
                them to describe? What contributions and achievements would you want them to
                mention? This exercise is deliberately provocative &mdash; it strips away trivial
                concerns and forces you to confront what truly matters to you at the deepest level.
              </p>

              <p>
                For electricians and tradespeople, a personal mission statement might address
                questions like: Do I want to be known primarily for technical excellence, for
                running a successful business, for mentoring apprentices, for work-life balance, or
                for something else entirely? What values do I want to guide my work &mdash; safety,
                integrity, quality, fairness, continuous improvement? What kind of father, mother,
                partner, or friend do I want to be? How important is financial success relative to
                other forms of fulfilment?
              </p>

              <p>
                A personal mission statement does not need to be long or eloquently written. It
                needs to be honest and meaningful to you. Here are examples of what electricians
                might write:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    &ldquo;To be a highly skilled and trusted electrical professional who takes
                    pride in quality work, continues learning throughout my career, builds a
                    business that provides well for my family without sacrificing time with them,
                    and gives back to the trade by training the next generation.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    &ldquo;To achieve financial independence by age 50 through building and selling
                    a successful electrical contracting business, while maintaining my health, being
                    present for my children, and never compromising on the safety and quality of my
                    work.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    &ldquo;To become a recognised expert in electrical inspection and testing, to
                    contribute to industry standards and training, and to live a balanced life that
                    includes time for fitness, family, and personal interests outside of
                    work.&rdquo;
                  </span>
                </li>
              </ul>

              <p>
                The personal mission statement sits above all other goals on your goal map. Every
                specific goal you set should be tested against it: does this goal move me closer to
                the person I described in my mission statement, or further away? This simple check
                prevents a common trap: setting and achieving goals that look impressive on paper
                but leave you feeling unfulfilled because they were never aligned with what you
                actually value.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Practical Exercise: Write Your Personal Mission Statement
                </p>
                <p className="text-base text-white leading-relaxed">
                  Take 20 minutes in a quiet place. Write answers to these questions: (1) What do I
                  want to be known for as an electrician? (2) What values are non-negotiable for me?
                  (3) What kind of partner/parent/friend do I want to be? (4) What does
                  &ldquo;success&rdquo; look like for me personally, not according to anyone else?
                  (5) If I could only achieve three things in the next five years, what would they
                  be? Now distil your answers into 2&ndash;4 sentences. This is your personal
                  mission statement. It will evolve over time, but having even a rough first draft
                  is better than having nothing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Wheel of Life Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Wheel of Life Assessment
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The wheel of life is one of the most widely used coaching tools in personal
                development. It was popularised by Paul J. Meyer (founder of the Success Motivation
                Institute) and has been adopted by executive coaches, life coaches, and
                psychologists worldwide. Its purpose is simple but powerful: to give you an honest,
                visual snapshot of how satisfied you currently are across all the major areas of
                your life.
              </p>

              <p>
                The process is straightforward. Draw a circle and divide it into six segments (or
                more, if you prefer), one for each life area. Rate your current satisfaction in each
                area on a scale of 1 (completely dissatisfied) to 10 (completely satisfied). Mark
                the score on each segment and connect the dots to form a shape. A perfectly balanced
                life would look like a smooth circle. In reality, almost everyone&rsquo;s wheel is
                bumpy &mdash; some areas are high, others are significantly lower. These low-scoring
                areas represent your biggest opportunities for improvement and should be prioritised
                in your goal map.
              </p>

              <p>
                For electricians, the wheel of life often reveals predictable patterns. Career
                satisfaction might score 7 or 8 (you enjoy the work and feel competent), but health
                might score 3 (chronic pain, poor diet, no exercise), relationships might score 4
                (working too many hours, too tired to engage), and financial planning might score 2
                (good income but no savings, no pension, all money spent as it comes in). Seeing
                these numbers next to each other on a single diagram is often a wake-up call. It is
                easy to ignore individual problems when they are separate; it is much harder to
                ignore a lopsided wheel that clearly shows your life is out of balance.
              </p>

              <p>
                The wheel of life is not about perfection &mdash; you do not need every area at 10.
                It is about awareness and intentionality. If your health score is 3 and you are
                aware of it but have consciously chosen to prioritise other areas for the next six
                months, that is a valid decision. But if your health score is 3 and you have never
                thought about it, never set a health goal, and are slowly deteriorating without
                noticing &mdash; that is a problem the wheel of life is designed to expose.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Example: Wheel of Life for a 32-Year-Old Self-Employed Electrician
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Career &amp; Qualifications: 7/10</strong> &mdash; Qualified, steady
                      work, but wants to move into commercial work and doesn&rsquo;t have the
                      experience or contacts yet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Financial: 4/10</strong> &mdash; Earns &pound;50,000 per year but has
                      no pension, &pound;8,000 in credit card debt, and no emergency fund
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Health &amp; Fitness: 3/10</strong> &mdash; Two stone overweight,
                      chronic lower back pain, drinks 15+ units of alcohol per week, no regular
                      exercise
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Relationships &amp; Family: 5/10</strong> &mdash; Partner complains
                      about long hours and weekend work; misses children&rsquo;s activities; feels
                      guilty but doesn&rsquo;t change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Business &amp; Network: 6/10</strong> &mdash; NICEIC registered, good
                      reputation locally, but relies entirely on word of mouth and has no online
                      presence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Personal Development: 2/10</strong> &mdash; Has not read a book since
                      college, no hobbies outside of work, feels like &ldquo;just an
                      electrician&rdquo; with nothing else going on
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This electrician&rsquo;s wheel is heavily lopsided: strong on career, weak on
                  health, finances, personal development, and relationships. The goal map should
                  prioritise goals in the low-scoring areas while maintaining career progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Goal Prioritisation — The Eisenhower Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Goal Prioritisation &mdash; The Eisenhower Matrix
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once you have assessed your wheel of life and identified potential goals across all
                six areas, you face an inevitable challenge: you cannot pursue everything
                simultaneously. You have limited time, limited energy, and limited money.
                Prioritisation is essential. The Eisenhower Matrix &mdash; named after President
                Dwight D. Eisenhower and popularised by Stephen Covey in{' '}
                <em>The 7 Habits of Highly Effective People</em> &mdash; provides a simple, powerful
                framework for deciding what to focus on first.
              </p>

              <p>
                The matrix divides all tasks and goals into four quadrants based on two dimensions:
                urgency (does it need attention right now?) and importance (does it contribute to
                your long-term goals and values?).
              </p>

              <ul className="text-sm text-white space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong>Quadrant 1 &mdash; Urgent and Important (DO):</strong> Crises,
                    deadlines, emergencies. For electricians: completing a job before the deadline,
                    fixing a dangerous defect, submitting a certification before the client moves
                    in, paying a tax bill before the due date. These must be dealt with immediately.
                    The problem is that many electricians spend their entire working life in Q1,
                    lurching from one fire to the next, never making time for strategic development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Quadrant 2 &mdash; Important but Not Urgent (SCHEDULE):</strong>{' '}
                    Long-term development, planning, prevention, relationship building. For
                    electricians: studying for the next qualification, developing a business plan,
                    exercising regularly, building industry relationships, setting up a pension,
                    learning a new specialism, spending quality time with family. This is the most
                    strategically valuable quadrant. Q2 activities create the most long-term value,
                    prevent future crises, and align with your personal mission statement. Yet they
                    are constantly pushed aside because they do not shout for attention. Covey
                    argued that the key to effectiveness is spending more time in Q2 and less in Q3
                    and Q4.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Quadrant 3 &mdash; Urgent but Not Important (DELEGATE):</strong> Other
                    people&rsquo;s priorities that feel pressing but do not advance your own goals.
                    For electricians: phone calls that could be handled by a message, low-value
                    small jobs that you do because you feel obligated, admin tasks that could be
                    outsourced or automated, attending meetings that have no relevance to your work.
                    These should be delegated, minimised, or eliminated where possible.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                  <span>
                    <strong>Quadrant 4 &mdash; Neither Urgent nor Important (ELIMINATE):</strong>
                    Time-wasters. Scrolling social media, watching television you do not enjoy,
                    busywork that makes you feel productive but achieves nothing. These activities
                    should be reduced or replaced with Q2 activities.
                  </span>
                </li>
              </ul>

              <p>
                The insight for goal mapping is this: most of your important goals &mdash;
                qualifications, health improvements, financial planning, relationship investment,
                business development &mdash; sit in Quadrant 2. They are important but not urgent.
                They will never demand your attention the way a leaking consumer unit or an overdue
                invoice does. You must consciously schedule time for them, protect that time, and
                treat it with the same seriousness as a paid job. If you wait until you &ldquo;have
                time&rdquo; for Q2 activities, you will never do them &mdash; because Q1 and Q3 will
                always fill the available space.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Applying the Eisenhower Matrix to Your Trade Career
                </p>
                <p className="text-base text-white leading-relaxed">
                  Write down everything you spent time on last week. Sort each item into one of the
                  four quadrants. You will likely find that Q1 and Q3 dominated your week, Q2 got
                  little or no time, and Q4 consumed more hours than you expected (particularly
                  evening phone scrolling). Now look at your goal map. Your most important goals are
                  almost certainly Q2 activities. Ask yourself: &ldquo;What Q3 and Q4 activities can
                  I reduce or eliminate to create time for Q2?&rdquo; Even reclaiming 5 hours per
                  week for Q2 activities (one hour per day on weekdays) can transform your career
                  trajectory within a year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The 5-Step Goal-Setting Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Writing Your First Goals &mdash; The 5-Step Process
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Now that you have your personal mission statement (your compass), your wheel of life
                (your current position), and the Eisenhower Matrix (your prioritisation tool), it is
                time to write your actual goals. The 5-step process works backwards from the longest
                time horizon to the shortest, ensuring that every short-term action is aligned with
                your long-term vision. This is Covey&rsquo;s &ldquo;Begin with the End in
                Mind&rdquo; principle put into practice.
              </p>

              <p>
                <strong>Step 1: Define Your 5-Year Vision.</strong> For each of the six life areas,
                write a paragraph or a few bullet points describing where you want to be in five
                years. Be specific and honest. The 5-year horizon is far enough away to allow for
                ambitious goals but close enough to feel real. An electrician&rsquo;s 5-year vision
                might include: &ldquo;Running a four-person electrical contracting business
                specialising in commercial fit-outs, with annual turnover of &pound;350,000 and net
                profit of &pound;80,000. Holding the 2395 design qualification and actively doing
                design work. Financially secure with &pound;30,000 in savings, zero consumer debt,
                and a pension fund growing at &pound;500/month. Fit and healthy at 13 stone,
                exercising four times per week. Present at home for dinner at least four nights per
                week and attending all of my children&rsquo;s school events. Reading two books per
                month and maintaining a hobby outside of work.&rdquo; This is not a binding contract
                &mdash; it will be revised &mdash; but it provides essential direction.
              </p>

              <p>
                <strong>Step 2: Identify 3-Year Milestones.</strong> What must be true at the 3-year
                mark for your 5-year vision to be achievable? These are the major waypoints. Using
                the example above: &ldquo;By year 3, I need to have: completed the 2395
                qualification, hired at least two employees, established relationships with three
                commercial clients, saved &pound;15,000, cleared all credit card debt, and
                established a consistent exercise routine.&rdquo; The 3-year milestones help you
                identify whether you are on track and highlight the major stepping stones.
              </p>

              <p>
                <strong>Step 3: Set 12-Month Goals.</strong> What will you achieve in the next 12
                months to move towards your 3-year milestones? These should be specific, measurable,
                and limited in number &mdash; no more than 2&ndash;3 major goals per life area (and
                some areas may only need one). For our electrician: &ldquo;Career: Enrol in and
                begin the 2395 course by September. Financial: Clear &pound;4,000 of credit card
                debt and build a &pound;3,000 emergency fund. Health: Lose one stone by walking 30
                minutes per day and joining a gym. Relationships: Establish a firm &lsquo;no work
                Sundays&rsquo; rule and have a weekly date night. Business: Build a basic website
                and get listed on Checkatrade. Personal: Read one non-fiction book per month.&rdquo;
              </p>

              <p>
                <strong>Step 4: Break into Quarterly Objectives.</strong> Divide each 12-month goal
                into four quarterly chunks. This creates accountability checkpoints and makes the
                annual goal feel manageable. For the &ldquo;clear &pound;4,000 of credit card
                debt&rdquo; goal: Q1 &mdash; clear &pound;1,000 and set up automatic payments; Q2
                &mdash; clear another &pound;1,000 and reduce unnecessary subscriptions; Q3 &mdash;
                clear &pound;1,000 and increase income by &pound;100/month through a side project;
                Q4 &mdash; clear the final &pound;1,000 and redirect payments to savings. Each
                quarter, you review your progress and adjust if you are ahead or behind.
              </p>

              <p>
                <strong>Step 5: Create This Month&rsquo;s Action List.</strong> Finally, distil this
                month&rsquo;s contribution to each quarterly objective into a specific, actionable
                list. These are the concrete tasks you will do this month. They should be things you
                can schedule in your diary and tick off when complete. For our electrician&rsquo;s
                first month: &ldquo;Set up &pound;250 automatic monthly payment to credit card
                (Tuesday evening). Research 2395 course providers and shortlist three (this
                Saturday). Walk 30 minutes every morning before work (start Monday). Order one book
                from the reading list (tonight). Block out Sundays in the diary as family time
                (now).&rdquo; Each of these is specific, schedulable, and contributes to the larger
                goal structure above it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The 5-Step Cascade: How Everything Connects
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>5-year vision:</strong> Provides direction and ambition &mdash; the
                      destination on your map
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>3-year milestones:</strong> Major waypoints that confirm you are on
                      track
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>12-month goals:</strong> Specific, measurable targets for the year
                      ahead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Quarterly objectives:</strong> Accountability checkpoints that break
                      the year into manageable chunks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Monthly actions:</strong> The specific tasks you do this month &mdash;
                      this is where execution happens
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Goal Conflict Resolution */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Goal Conflict Resolution
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When you set goals across multiple life areas, you will inevitably encounter
                conflicts. Goals that compete for the same limited resources &mdash; primarily time
                and money &mdash; cannot all be pursued simultaneously at maximum intensity. A
                self-employed electrician who wants to maximise earnings (work long hours), spend
                more time with family (work fewer hours), get fit (requires time and energy), and
                study for the 2391 (requires evening and weekend study) faces genuine trade-offs.
                Ignoring these conflicts is one of the most common reasons goal systems fail: people
                set ambitious goals in every area and then feel overwhelmed and guilty when they
                cannot deliver on all of them.
              </p>

              <p>
                The first step in resolving goal conflicts is to make them visible. Write both
                conflicting goals down side by side and explicitly state the tension: &ldquo;I want
                to work every Saturday to earn more money, but I also want to spend Saturdays with
                my children.&rdquo; This seems obvious, but many people never articulate the
                conflict &mdash; they simply feel stressed and pulled in multiple directions without
                understanding why.
              </p>

              <p>
                The second step is to return to your personal mission statement and core values.
                Which of the conflicting goals is more aligned with who you want to be? This does
                not always produce a clear winner, but it often reveals which goal matters more at
                the deepest level. If your mission statement emphasises family presence, then the
                financial goal must find a way to accommodate that &mdash; not the other way around.
              </p>

              <p>
                The third step is to look for creative solutions that partially satisfy both goals.
                In the earnings versus family time example: could you increase your hourly rate
                rather than your hours? Could you specialise in higher-value work (inspection,
                design, commercial) that pays more per hour? Could you work two Saturdays per month
                instead of four? Could you hire an apprentice to increase capacity without
                increasing your personal hours? Could you agree with your partner on a specific
                number of Saturday mornings for work while keeping afternoons free? Many goal
                conflicts have creative solutions that become visible only when you stop seeing the
                situation as binary (all or nothing) and start looking for compromises.
              </p>

              <p>
                The fourth step, when genuine trade-offs are necessary, is to make the trade-off
                consciously and explicitly. Deciding &ldquo;I will limit Saturday work to twice a
                month because family time is more important to me than maximum income&rdquo; is a
                healthy, values-aligned choice. Unconsciously drifting into working every Saturday
                and then feeling resentful when your partner complains is not a decision &mdash; it
                is a failure to decide. The goal map makes these choices visible and deliberate.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Common Goal Conflicts for Electricians
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Earnings vs family time:</strong> Working more hours means more income
                      but less presence at home. Resolve by increasing value per hour rather than
                      total hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Study vs rest:</strong> Evening study for qualifications competes with
                      downtime and recovery. Resolve by scheduling study in focused blocks (45
                      minutes, three evenings per week) rather than vague &ldquo;whenever I
                      can&rdquo; commitments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Business growth vs quality of life:</strong> Scaling a business
                      requires reinvestment of time and money, which may temporarily reduce both
                      income and free time. Resolve by setting clear boundaries and timelines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Saving vs spending:</strong> Financial goals (emergency fund, pension,
                      debt clearance) compete with lifestyle spending. Resolve by automating savings
                      first (&ldquo;pay yourself first&rdquo;) and adjusting lifestyle spending to
                      what remains.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Commitment Devices and Accountability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Commitment Devices &amp; Accountability
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A goal that exists only in your head is easy to abandon. There is no cost to
                quitting, no one notices, and the goal quietly fades without accountability. A
                commitment device is any strategy that raises the cost of inaction, making it harder
                to give up. The concept has deep roots in behavioural economics (Thomas Schelling,
                Richard Thaler, Cass Sunstein) and has been extensively validated in research on
                health behaviour, education, savings, and goal achievement.
              </p>

              <p>
                The simplest and most researched commitment device is telling other people about
                your goal. Howard Klein and colleagues (2020) conducted a meta-analysis of goal
                commitment research and found that public commitment &mdash; telling someone you
                respect about your goal &mdash; significantly increases follow-through. The
                mechanism is straightforward: when others know about your goal, abandoning it
                creates social consequences (embarrassment, loss of credibility, letting people
                down). These consequences add motivational weight that pure private intention lacks.
              </p>

              <p>
                For electricians, effective commitment devices include: telling your employer or
                supervisor that you plan to sit the 2391 exam by a specific date (now they will ask
                you about it), booking and paying for a training course in advance (you have sunk
                money that you lose by not attending), joining or forming a study group (social
                obligation to attend), asking a friend or partner to check in on your progress
                weekly, posting your goal publicly (on social media, in a professional group, or on
                a forum), or using a financial commitment platform like stickK where you pledge
                money that goes to a cause you dislike if you fail.
              </p>

              <p>
                Another powerful commitment device is pre-scheduling. Blocking time in your diary
                for goal-related activities (study sessions, gym visits, financial review, family
                time) and treating those blocks with the same seriousness as a paid job dramatically
                increases compliance. An electrician who writes &ldquo;Tuesday 7pm &ndash; 8pm:
                Study BS 7671 Chapter 42&rdquo; in their diary and treats it as a non-negotiable
                appointment is far more likely to study than one who vaguely intends to &ldquo;study
                some time this week&rdquo;.
              </p>

              <p>
                The evidence strongly supports a combination of commitment devices rather than
                relying on a single one. The most effective approach, as demonstrated by
                Matthews&rsquo; study, combines: writing the goal down (externalisation),
                formulating specific action commitments (implementation intentions), and sending
                weekly progress reports to a supportive accountability partner. This triple
                combination produced the highest goal achievement rates in her research &mdash;
                significantly higher than any single device alone.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Building Your Accountability Stack
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Level 1 &mdash; Write it down:</strong> Externalise the goal on paper
                      or digitally (42% improvement over thinking alone)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Level 2 &mdash; Tell someone:</strong> Share the goal with a friend,
                      partner, or colleague who you respect and who will ask about your progress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Level 3 &mdash; Schedule it:</strong> Block time in your diary for
                      goal-related activities and treat them as non-negotiable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Level 4 &mdash; Invest money:</strong> Book and pay for a course, hire
                      a coach, or use a financial commitment platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Level 5 &mdash; Regular check-ins:</strong> Send weekly progress
                      updates to an accountability partner (the most effective combination)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Implementation Intentions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Implementation Intentions &mdash; Gollwitzer&rsquo;s If-Then Plans
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most powerful research-backed techniques for turning goals into action is
                the concept of <strong>implementation intentions</strong>, developed by Peter
                Gollwitzer, a professor of psychology at New York University. Gollwitzer&rsquo;s
                research, beginning in the 1990s and now supported by a meta-analysis of 94
                independent studies (Gollwitzer &amp; Sheeran, 2006), demonstrated that the gap
                between intending to do something and actually doing it &mdash; the
                &ldquo;intention-action gap&rdquo; &mdash; can be dramatically reduced using a
                specific cognitive strategy.
              </p>

              <p>
                The strategy is deceptively simple. Instead of stating goals in a general form
                (&ldquo;I will study more&rdquo;, &ldquo;I will exercise regularly&rdquo;, &ldquo;I
                will save money&rdquo;), you restate them as if-then plans that link a specific
                situational cue to a specific action: &ldquo;If situation X arises, then I will
                perform response Y.&rdquo; The if-then format works because it creates a mental link
                between the triggering situation and the intended behaviour, effectively automating
                the decision to act. Instead of relying on conscious willpower in the moment
                (&ldquo;Should I study tonight? I&rsquo;m tired, the sofa looks comfortable, maybe
                I&rsquo;ll start next week...&rdquo;), the implementation intention delegates the
                decision to the environmental cue (&ldquo;It&rsquo;s 7pm on Tuesday, that&rsquo;s my
                study time &mdash; sit down and open the book&rdquo;).
              </p>

              <p>
                The meta-analysis found a medium-to-large effect size (d = 0.65), meaning that
                implementation intentions have a substantial, reliable impact on goal attainment
                across a wide variety of domains: health behaviour, academic performance, consumer
                choices, environmental actions, and professional development. The effect is
                particularly strong when the if-then plan specifies a concrete time, place, and
                action.
              </p>

              <p>
                For electricians, implementation intentions are transformative because the biggest
                barrier to career development is usually not knowledge or opportunity &mdash; it is
                the failure to consistently act on good intentions. &ldquo;I should study for the
                2391&rdquo; is a goal intention that is easily overridden by tiredness, distraction,
                or the immediate demands of daily life. &ldquo;If it is Tuesday at 7pm and I have
                finished dinner, then I will sit at the kitchen table, open BS 7671 to the next
                chapter, and study for 45 minutes&rdquo; is an implementation intention that
                dramatically increases the probability of action.
              </p>

              <ul className="text-sm text-white space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Career example:</strong> &ldquo;If it is Monday morning before I leave
                    the house, then I will review my study flashcards for 10 minutes.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Financial example:</strong> &ldquo;If I receive a payment from a client,
                    then I will immediately transfer 20% to my savings account before spending
                    anything.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Health example:</strong> &ldquo;If my alarm goes off at 6:15am, then I
                    will put on my walking shoes and walk for 30 minutes before showering.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Relationship example:</strong> &ldquo;If it is Friday at 5pm, then I
                    will stop work and not check my phone for work messages until Monday
                    morning.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Obstacle-handling example:</strong> &ldquo;If I feel tempted to skip my
                    study session because I am tired, then I will tell myself &lsquo;just 15
                    minutes&rsquo; and sit down with the book.&rdquo;
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why If-Then Works Better Than Willpower
                </p>
                <p className="text-base text-white leading-relaxed">
                  Willpower is a limited, depletable resource (Baumeister &amp; Tierney, 2011). At
                  the end of a long day on site, your willpower reserves are at their lowest, which
                  is exactly when you need to study, exercise, or do something for a personal goal.
                  Implementation intentions bypass the willpower problem by linking the action to an
                  environmental cue rather than to a conscious decision. You are not deciding
                  whether to study &mdash; you are simply responding to the cue (7pm Tuesday) the
                  same way you automatically put on a seatbelt when you get in the van. The more you
                  practise the if-then link, the more automatic it becomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 10: The Evidence for Writing Goals Down */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            The Evidence for Writing Goals Down
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The claim that &ldquo;writing goals down makes you more likely to achieve
                them&rdquo; is often repeated in self-help literature, but unlike many self-help
                claims, this one has robust empirical support. The most frequently cited study is Dr
                Gail Matthews&rsquo; 2015 research conducted at Dominican University of California.
                The study recruited 267 participants from diverse backgrounds, ages, and professions
                (including business owners, educators, healthcare professionals, and artists) and
                assigned them to five experimental conditions with increasing levels of goal-setting
                formality.
              </p>

              <p>
                The five conditions were: (1) think about goals (unwritten), (2) write goals down,
                (3) write goals and formulate action commitments, (4) write goals, formulate action
                commitments, and share both with a supportive friend, and (5) write goals, formulate
                action commitments, share with a friend, and send weekly progress reports to that
                friend. The results were clear and consistent: each additional level of formality
                increased goal achievement. The group that only thought about their goals (Group 1)
                achieved their goals at the lowest rate. The group that wrote goals down, made
                action commitments, shared them, and sent weekly updates (Group 5) achieved 42% more
                of their goals. This 42% figure is not a marginal improvement &mdash; it is a
                transformative one.
              </p>

              <p>
                Why does writing goals down work? Several complementary mechanisms have been
                proposed. First, the act of writing forces <strong>specificity</strong> &mdash; you
                cannot write down a vague intention, so the process of externalising a goal
                clarifies what you actually want. Second, writing creates an{' '}
                <strong>external record</strong> that you can review, which maintains awareness and
                salience of the goal over time. Third, writing engages deeper{' '}
                <strong>cognitive processing</strong> than merely thinking &mdash; research on the
                &ldquo;generation effect&rdquo; shows that information you actively produce (write,
                say aloud) is better encoded in memory than information you passively consume.
                Fourth, a written goal creates a form of <strong>implicit contract</strong> with
                yourself, increasing perceived commitment.
              </p>

              <p>
                For electricians, this evidence has an immediate practical application: take 30
                minutes this week to write down your goals for the next 12 months. Use the six life
                areas as your framework. Write in specific, measurable terms. Then share those goals
                with someone you trust and arrange a monthly check-in. Based on Matthews&rsquo;
                research, this simple act will make you 42% more likely to achieve what you set out
                to do. There is no other single action with a comparable return on a 30-minute time
                investment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Matthews&rsquo; Study: Achievement Rates by Group
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Group 1 (think only):</strong> Lowest achievement rate &mdash;
                      baseline
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Group 2 (write down):</strong> Improvement over thinking alone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Group 3 (write + action commitments):</strong> Further improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Group 4 (write + action + share with friend):</strong> Further
                      improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Group 5 (write + action + share + weekly reports):</strong> Highest
                      achievement rate &mdash; 42% more than Group 1
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Tools for Goal Mapping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">11</span>
            Tools for Goal Mapping
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The tool you use for goal mapping matters far less than the habit of doing it
                consistently. The best system is the one you will actually use every week, not the
                most elegant or comprehensive one you set up once and abandon. That said, here is an
                overview of the main options, with practical considerations for tradespeople.
              </p>

              <ul className="text-sm text-white space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Paper Planners and Notebooks:</strong> The simplest and most tactile
                    option. A dedicated notebook (A5 or A4) where you write your mission statement,
                    wheel of life, goal map, and weekly/monthly action lists. Advantages: no
                    battery, no screen time, engages deeper cognitive processing (handwriting
                    effect), always available, and feels more personal and deliberate.
                    Disadvantages: cannot be backed up, harder to reorganise, no reminders. Best
                    for: people who prefer analogue methods, initial goal-setting sessions (first
                    draft by hand), and weekly reviews. Popular options include the Panda Planner,
                    Full Focus Planner, and a simple ruled Moleskine.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Simple Spreadsheets (Google Sheets, Excel):</strong> A single
                    spreadsheet with tabs for each time horizon (5-year, 12-month, quarterly,
                    monthly) and columns for each life area. Advantages: free, accessible from any
                    device, easy to update, can add conditional formatting to track progress, and
                    can be shared with an accountability partner via a link. Disadvantages: not the
                    most visually inspiring format, requires some basic spreadsheet literacy. Best
                    for: electricians who want a no-cost, low-friction digital system that they can
                    access from their phone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Notion:</strong> A flexible digital workspace that can serve as an
                    all-in-one goal management system. You can create databases for goals, link them
                    to tasks, add progress tracking, embed your mission statement, and build custom
                    views. Advantages: highly customisable, free tier is generous, good mobile app,
                    and templates are available online for goal mapping. Disadvantages: initial
                    setup can be time-consuming, risk of over-engineering the system instead of
                    actually working towards goals. Best for: tech-comfortable electricians who
                    enjoy building systems.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Trello:</strong> A visual, card-based project management tool that works
                    well for goal tracking. Create a board for each life area, with lists for
                    &ldquo;To Do&rdquo;, &ldquo;In Progress&rdquo;, and &ldquo;Done&rdquo;, and
                    cards for individual goals and tasks. Advantages: highly visual, intuitive, free
                    tier is sufficient, good mobile app, and satisfying to move cards to
                    &ldquo;Done&rdquo;. Disadvantages: less suited to long-form reflection or
                    mission statements, can become cluttered with too many cards. Best for: visual
                    thinkers who like the satisfaction of moving completed tasks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Phone Notes App:</strong> The simplest digital option. A single note
                    with your goals listed by area, reviewed and updated weekly. Advantages: already
                    on your phone (zero setup), fast to access, no learning curve. Disadvantages:
                    limited organisation, no reminders, not visually engaging. Best for: anyone who
                    is intimidated by more complex tools and just wants to start. A goals note that
                    you check every Sunday evening is better than an elaborate system you never use.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Hybrid Approach (Recommended)
                </p>
                <p className="text-base text-white leading-relaxed">
                  Many successful goal-setters use a hybrid approach: they do their deep thinking
                  and annual/quarterly planning on paper (for the cognitive benefits of
                  handwriting), then transfer the key goals and monthly actions to a digital tool
                  they carry with them (for accessibility and reminders). For tradespeople who spend
                  their days on site, having goals accessible on your phone is essential &mdash; you
                  cannot review a physical planner when you are standing on a ladder. Start with
                  paper for your first goal map, then find a simple digital home for your monthly
                  action list.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">12</span>
            Section Summary &amp; Module Conclusion
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided you with a complete framework for creating your personal
                goal map &mdash; a structured, evidence-based system for directing your career and
                life with intention. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>A personal goal map</strong> is a visual, structured overview of goals
                    across all major life areas &mdash; career, financial, health, relationships,
                    business, and personal development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Stephen Covey&rsquo;s personal mission statement</strong> provides the
                    compass that ensures all goals are aligned with your core values and long-term
                    purpose.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The wheel of life</strong> gives you an honest visual snapshot of
                    current satisfaction across all areas, revealing imbalances that need attention.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The Eisenhower Matrix</strong> helps you prioritise by distinguishing
                    between urgent/important and recognising that most valuable goals sit in
                    Quadrant 2 (important but not urgent).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 5-step backward planning process</strong> (5-year vision &rarr;
                    3-year milestones &rarr; 12-month goals &rarr; quarterly objectives &rarr;
                    monthly actions) ensures every short-term action is aligned with your long-term
                    direction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Implementation intentions</strong> (Gollwitzer&rsquo;s if-then plans)
                    bridge the intention-action gap by linking specific situations to specific
                    responses.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Writing goals down</strong> increases achievement by 42% (Matthews,
                    2015), and combining written goals with action commitments, accountability
                    partners, and weekly progress reports produces the highest success rates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Commitment devices</strong> (public accountability, financial stakes,
                    pre-scheduling) raise the cost of inaction and dramatically increase
                    follow-through.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white mb-2">
                  <strong className="text-rose-400">Module 2 Complete:</strong> You now have a
                  comprehensive goal-setting system: SMART goals for structure, time horizons for
                  planning, career pathways for direction, and personal goal mapping for
                  integration. The next module will explore how to build habits that support your
                  goals, because goals determine direction, but habits determine progress.
                </p>
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Action Step:</strong> Before moving to Module 3,
                  complete your personal goal map. Write your mission statement, complete a wheel of
                  life assessment, identify your top 2&ndash;3 goals for this quarter, and create
                  implementation intentions for each goal. This is not optional theory &mdash; it is
                  the foundation for everything that follows.
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
            <Link to="../gs-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-3">
              Next Module: Building Habits That Stick
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
