import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
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
    id: 'gs-5-3-check1',
    question:
      'In Chris McChesney&rsquo;s 4 Disciplines of Execution (4DX), the &ldquo;Wildly Important Goal&rdquo; (WIG) principle states that you should focus on no more than one or two goals at a time. Why does this matter for an electrician planning their year?',
    options: [
      'Because electricians are not capable of managing multiple priorities at once',
      'Because spreading focus across too many goals leads to mediocre progress on all of them &mdash; concentrated effort on the wildly important few produces breakthrough results',
      'Because regulatory bodies only allow electricians to pursue one qualification per year',
      'Because it is easier to write one goal on a calendar than several',
    ],
    correctIndex: 1,
    explanation:
      'The WIG principle is grounded in the research finding that execution drops dramatically as the number of active goals increases. McChesney found that teams focusing on two or three goals would typically achieve two or three with excellence, while teams with four to ten goals typically achieved only one or two. When you try to advance everything simultaneously &mdash; a new qualification, a business expansion, a fitness goal, a financial target &mdash; your attention and energy are diluted. For an electrician, this means choosing the one or two goals that will have the greatest impact on your career or life in the coming year and giving them concentrated attention, rather than setting a long wish list of aspirations that receive scattered effort. This does not mean ignoring everything else &mdash; it means identifying what is wildly important and making that the priority.',
  },
  {
    id: 'gs-5-3-check2',
    question:
      'An electrician has been working towards their 2391 Inspection &amp; Testing qualification for 18 months but has failed the exam twice and lost motivation. They have already spent &pound;1,200 on courses and revision materials. According to the persist vs pivot vs stop framework, what should they do?',
    options: [
      'Stop immediately &mdash; two failures proves the goal is unachievable',
      'Persist with exactly the same approach &mdash; the money already spent means they must continue',
      'Analyse why they failed (knowledge gaps, exam technique, study method), determine whether a change in strategy could produce a different result, and then decide whether to persist with a new approach, pivot to a related goal, or stop',
      'Pivot to a completely different career outside the electrical industry',
    ],
    correctIndex: 2,
    explanation:
      'The persist vs pivot vs stop decision requires honest analysis, not an emotional reaction. Simply stopping after two failures would be a fixed mindset response &mdash; it assumes that failure means inability. Simply persisting with the same approach that produced two failures would be the definition of insanity attributed to Einstein &mdash; doing the same thing and expecting different results. The correct approach is to analyse the root cause of the failures. Was it knowledge gaps in specific areas? Was it exam technique (running out of time, misreading questions)? Was it the quality of the training course? Was it insufficient study time? If the root cause can be addressed with a changed strategy, then persisting with that new strategy is the right choice. If analysis reveals that the goal is genuinely misaligned with the electrician&rsquo;s strengths or career direction, then pivoting (perhaps to the 2394 Design qualification instead) or stopping may be appropriate. The &pound;1,200 already spent is a sunk cost and should not influence the decision.',
  },
  {
    id: 'gs-5-3-check3',
    question:
      'An electrician&rsquo;s ECS card expires in March 2027. The current BS 7671 amendment cycle suggests a new amendment may arrive in 2026. Their NICEIC annual assessment is in September, and their self-assessment tax return is due 31 January. If they want to plan their year strategically, which approach demonstrates the best use of a career progression calendar?',
    options: [
      'Ignore all deadlines and deal with each one as it arrives &mdash; planning is a waste of time',
      'Map all known deadlines onto a single calendar at the start of the year, identify preparation windows for each, and schedule study or admin time in advance so nothing is left to the last minute',
      'Focus only on the ECS card renewal because it is the most important deadline',
      'Wait until November to start thinking about the January tax return',
    ],
    correctIndex: 1,
    explanation:
      'A career progression calendar maps all known deadlines, renewal dates, exam windows, and regulatory changes onto a single timeline so that the electrician can prepare proactively rather than reactively. In this scenario, the electrician has at least four significant deadlines: the ECS card renewal (March 2027, but requiring CPD evidence gathered throughout the prior year), a potential BS 7671 amendment (requiring study time), the NICEIC annual assessment (September, requiring preparation of documentation and site readiness), and the self-assessment tax return (31 January, requiring financial records to be in order). Mapping these onto a calendar reveals preparation windows: for example, gathering CPD evidence throughout the year rather than scrambling in February, starting 18th Edition update study as soon as the amendment is published, preparing NICEIC documentation in July and August, and organising tax records quarterly rather than in a January panic. This proactive approach reduces stress, improves compliance, and frees up mental energy for actual work.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long should an annual review actually take?',
    answer:
      'A thorough annual review typically takes between two and four hours, split across two sessions. The first session (one to two hours) should focus on reviewing the past year: what you achieved, what you missed, what you learned, what went well, and what didn&rsquo;t. The second session (one to two hours) should focus on planning the next year: setting goals, identifying key deadlines, mapping out a calendar, and defining the first action steps. Some electricians prefer to do both sessions on the same day (often between Christmas and New Year when work is quieter), while others prefer to review first and then plan a few days later once they&rsquo;ve had time to reflect. The important thing is to actually do it &mdash; most electricians never sit down for a structured annual review, which means they drift from year to year without strategic direction. Even a one-hour review is infinitely better than none.',
  },
  {
    question: 'What if I set annual goals and then my circumstances change dramatically mid-year?',
    answer:
      'This is exactly why the mid-year review exists. Annual goals are not contracts &mdash; they are strategic intentions based on the information available at the time of setting. If your circumstances change significantly (a new job, a redundancy, a family change, a health issue, an unexpected business opportunity), your goals should be reviewed and adjusted accordingly. The persist vs pivot vs stop framework applies here: for each existing goal, ask whether it is still relevant and achievable given the new circumstances. Some goals may need to be paused, some may need to be modified, and some may become irrelevant. The key is to make this adjustment consciously and deliberately, rather than simply abandoning all your goals and drifting. A mid-year review forces this conscious reassessment.',
  },
  {
    question: 'How do I track whether I&rsquo;m on pace for annual goals throughout the year?',
    answer:
      'The most effective approach is McChesney&rsquo;s compelling scoreboard from the 4DX framework. For each goal, define a lead measure (the activity you control) and a lag measure (the result you want). Then create a simple visual tracker that you update weekly or monthly. For example, if your annual goal is to pass the 2391 exam, your lead measure might be &ldquo;hours of study per week&rdquo; and your lag measure is &ldquo;exam result&rdquo;. A simple spreadsheet, wall chart, or app that tracks your weekly study hours gives you real-time feedback on whether you&rsquo;re on pace. If you planned for 5 hours per week and you&rsquo;re averaging 2, you know in March that you&rsquo;re off-track &mdash; not in November when the exam is two weeks away. The scoreboard should be simple enough that you can update it in under a minute, and visible enough that you see it regularly.',
  },
  {
    question:
      'I always set New Year&rsquo;s resolutions but abandon them by February. How is annual goal setting different?',
    answer:
      'New Year&rsquo;s resolutions fail because they are typically vague aspirations (&ldquo;get fit&rdquo;, &ldquo;earn more money&rdquo;, &ldquo;do more training&rdquo;) without specific targets, action plans, deadlines, or accountability mechanisms. Annual goal setting, done properly, is fundamentally different. First, goals are specific and measurable (&ldquo;pass the 2391 exam by June&rdquo; not &ldquo;do some training&rdquo;). Second, each goal has defined lead measures &mdash; the specific activities that will drive progress (&ldquo;study three hours per week using the EIS exam prep materials&rdquo;). Third, there is a tracking mechanism so you know whether you&rsquo;re on pace. Fourth, there is a cadence of accountability &mdash; regular check-ins (weekly self-review, monthly deep review, mid-year full review) that prevent drift. Fifth, the goals are grounded in a review of the past year, so they are realistic and informed by actual experience rather than New Year&rsquo;s optimism. The difference between a resolution and a properly set goal is the difference between wishful thinking and strategic planning.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'In Chris McChesney&rsquo;s 4 Disciplines of Execution, what is a &ldquo;Wildly Important Goal&rdquo; (WIG)?',
    options: [
      'Any goal that takes more than a year to achieve',
      'The one or two goals that will make everything else easier or irrelevant if achieved &mdash; the goals that matter most and deserve concentrated focus',
      'A goal that is so difficult it is unlikely to be achieved',
      'A goal set by your employer rather than by yourself',
    ],
    correctAnswer: 1,
    explanation:
      'A Wildly Important Goal (WIG) is the one or two goals that, if achieved, would have the most significant impact on your career or life. The WIG principle is based on the finding that execution declines as the number of active goals increases. McChesney&rsquo;s research across thousands of teams found that the sweet spot is one or two WIGs at any given time. These are the goals that deserve your best effort and concentrated attention. Everything else is either a supporting activity or a lower-priority item that gets maintained but not aggressively pursued. For an electrician, the WIG might be &ldquo;pass the 2391 exam by July&rdquo; or &ldquo;grow my business to &pound;100k turnover this year&rdquo; &mdash; the single most important objective that, if achieved, would transform your career trajectory.',
  },
  {
    id: 2,
    question:
      'What is a &ldquo;lead measure&rdquo; in the 4DX framework, and how does it differ from a &ldquo;lag measure&rdquo;?',
    options: [
      'A lead measure is your final result; a lag measure is the activity that produces the result',
      'A lead measure is the predictive, influenceable activity you control; a lag measure is the outcome or result that comes after the activity',
      'A lead measure is set by your manager; a lag measure is set by yourself',
      'Lead and lag measures are the same thing, just measured at different times of year',
    ],
    correctAnswer: 1,
    explanation:
      'Lead measures and lag measures are fundamentally different in the 4DX framework. A lag measure is the end result &mdash; the thing you ultimately want to achieve. For an electrician, this might be &ldquo;pass the 2391 exam&rdquo; or &ldquo;earn &pound;60,000 this year&rdquo;. The problem with lag measures is that by the time you measure them, the outcome is already determined &mdash; you can&rsquo;t change the exam result after the exam. A lead measure is the specific activity that drives the lag measure &mdash; the thing you can control and influence right now. For the 2391 example, a lead measure might be &ldquo;complete five hours of structured study per week&rdquo; or &ldquo;complete two practice exams per month&rdquo;. Lead measures are predictive (if you do the activity consistently, the result will follow) and influenceable (you can decide to study tonight or not). The 4DX framework argues that most people obsess over lag measures while neglecting lead measures, which is like trying to lose weight by standing on the scales more often rather than changing your diet and exercise.',
  },
  {
    id: 3,
    question:
      'The &ldquo;sunk cost fallacy&rdquo; is particularly relevant to annual goal review. Which of the following best describes this fallacy?',
    options: [
      'The tendency to set goals that are too expensive to achieve',
      'The tendency to continue investing time, money, or effort into something because of what has already been invested, even when continuing no longer makes rational sense',
      'The tendency to underestimate how much a goal will cost before starting',
      'The belief that expensive goals are more valuable than free ones',
    ],
    correctAnswer: 1,
    explanation:
      'The sunk cost fallacy is one of the most powerful cognitive biases affecting goal persistence. It causes people to continue pursuing a goal or project because they have already invested significant resources (time, money, effort, emotional energy), even when rational analysis suggests they should stop or change direction. For electricians, this might look like: continuing to study for a qualification that is no longer relevant to their career direction because they&rsquo;ve already paid for the course; persisting with a business model that isn&rsquo;t working because they&rsquo;ve already invested &pound;10,000 in equipment; or staying in a specialisation they dislike because they&rsquo;ve spent years building expertise. The rational approach is to evaluate every goal based on its future value, not its past cost. The money, time, or effort already spent is gone regardless of what you decide next &mdash; it should not influence the decision.',
  },
  {
    id: 4,
    question:
      'An electrician&rsquo;s ECS (Electrotechnical Certification Scheme) card typically requires renewal on what cycle, and what must they demonstrate for renewal?',
    options: [
      'Every year, with no specific requirements beyond payment',
      'Every 10 years, with a single online test',
      'Every 3 to 5 years, demonstrating ongoing competence through CPD, qualifications, and evidence of current practice',
      'ECS cards never expire once issued',
    ],
    correctAnswer: 2,
    explanation:
      'ECS cards (issued by the JIB &mdash; Joint Industry Board) typically have a 3 to 5 year validity period depending on the card type. Renewal is not automatic &mdash; it requires evidence of ongoing competence, which typically includes: up-to-date qualifications (particularly the current edition of BS 7671), evidence of Continuing Professional Development (CPD) activities, and often evidence of current employment or practice in the electrical sector. The exact requirements vary by card grade (Apprentice, Installation Electrician, Approved Electrician, Technician, etc.). Failing to renew your ECS card can prevent you from working on certain sites, particularly large commercial and industrial projects where ECS cards are a mandatory access requirement. Planning for renewal well in advance &mdash; including ensuring your qualifications are up to date and your CPD log is complete &mdash; is a key part of the annual review process.',
  },
  {
    id: 5,
    question:
      'The &ldquo;persist vs pivot vs stop&rdquo; decision framework suggests evaluating underperforming goals against three criteria. Which of the following is NOT one of those criteria?',
    options: [
      'Has the external environment changed in a way that makes the goal less relevant or achievable?',
      'Have you given the goal a genuine, strategic effort with good execution, or have you been inconsistent or used a poor approach?',
      'Has the amount of money you have already spent exceeded your original budget?',
      'Does this goal still align with your values, interests, and long-term career vision?',
    ],
    correctAnswer: 2,
    explanation:
      'The persist vs pivot vs stop framework evaluates goals based on three forward-looking criteria: strategic fit (does the goal still align with your values and career direction?), execution quality (have you actually given the goal your best effort with effective strategies, or have you been half-hearted?), and environmental relevance (has something changed externally that makes the goal less viable or important?). Notice that the amount of money already spent is NOT one of the criteria &mdash; that would be the sunk cost fallacy. The question is not &ldquo;how much have I invested?&rdquo; but &ldquo;given where I am now, is continuing the best use of my future time and resources?&rdquo; If the answer to the three criteria is broadly positive, persist (perhaps with a changed strategy). If the goal direction is right but the specific target needs adjusting, pivot. If the goal is no longer aligned, no longer achievable, or no longer relevant, stop &mdash; regardless of past investment.',
  },
  {
    id: 6,
    question:
      'Why is seasonal planning particularly important for self-employed electricians when setting annual goals?',
    options: [
      'Because electrical regulations change with the seasons',
      'Because the electrical industry has predictable seasonal patterns &mdash; busier periods (spring/summer for domestic work, autumn for heating) and quieter periods (mid-winter) &mdash; which affect when study, training, and admin are most realistic',
      'Because self-employed electricians only work during summer months',
      'Because exam dates are only available in winter',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed electricians experience predictable seasonal demand patterns that directly affect their capacity for non-work activities like study, training, and business development. Spring and summer are typically the busiest periods for domestic work (home improvements, extensions, garden rooms, outdoor electrics), while heating-related work peaks in autumn. Mid-winter (late November through January) and the post-Christmas period are often quieter. Strategic annual planning means aligning goals with these patterns: scheduling intensive study or qualification courses during quieter periods when lost work income is minimised, using busy periods to maximise earnings, and planning admin tasks (accounts, tax returns, insurance renewals) outside of peak earning months. An electrician who books a two-week exam preparation course in June is sacrificing their highest-earning weeks. The same course in January costs the same in fees but far less in lost earnings.',
  },
  {
    id: 7,
    question:
      'In the 4DX framework, what is the purpose of a &ldquo;cadence of accountability&rdquo;?',
    options: [
      'To create pressure by having your boss check on your progress',
      'To establish a regular rhythm of brief check-ins (typically weekly) where you review your scoreboard, report on commitments, and make new commitments &mdash; creating consistent forward momentum',
      'To punish yourself when you miss a deadline',
      'To set up automated email reminders for every goal',
    ],
    correctAnswer: 1,
    explanation:
      'The cadence of accountability is the fourth and arguably most critical discipline in the 4DX framework. It creates a regular, predictable rhythm of brief progress reviews that keep goals alive in the face of daily demands. For a self-employed electrician, this might be a 15-minute weekly review every Sunday evening where you check your scoreboard (am I on pace?), report on last week&rsquo;s commitments (did I complete the study hours I planned?), and make specific commitments for the coming week (what exactly will I do this week to advance my goal?). The key word is &ldquo;cadence&rdquo; &mdash; it must be regular and predictable, not sporadic. Without this discipline, even well-set goals and well-defined lead measures fade into the background as the urgent demands of daily work take over. The weekly review acts as a reset, pulling your attention back to what is wildly important before the week&rsquo;s whirlwind begins.',
  },
  {
    id: 8,
    question:
      'Which of the following best describes the recommended approach to celebrating annual achievements during the annual review?',
    options: [
      'Skip celebration entirely &mdash; focusing on what you still need to achieve is more productive',
      'Celebrate only if you achieved 100% of your goals for the year',
      'Before setting new goals, deliberately review and recognise what you achieved, what you learned, and how you grew during the past year &mdash; acknowledging progress builds motivation and self-efficacy for the year ahead',
      'Celebrate by taking the entire month of January off from goal setting',
    ],
    correctAnswer: 2,
    explanation:
      'Celebrating achievements before setting new goals is not a luxury &mdash; it is a psychologically important step that most electricians skip. Research on self-efficacy (Albert Bandura) shows that recognising past achievements strengthens the belief that you can achieve future goals. If you rush straight from one year&rsquo;s goals into the next without acknowledging what you accomplished, you train your brain to focus on deficits rather than growth, which erodes motivation over time. The annual review should begin with a thorough celebration of what went well: qualifications gained, skills developed, income targets hit, challenging projects completed, problems solved, and personal growth achieved. This is not about inflating your ego &mdash; it is about building an accurate record of capability and growth that fuels confidence for future challenges. Even in a year where not all goals were met, there is always progress to recognise.',
  },
];

export default function GSModule5Section3() {
  useSEO({
    title: 'Annual Review & Goal Resetting | Goal Setting & Growth Module 5.3',
    description:
      'The annual review process, 4 Disciplines of Execution, persist vs pivot vs stop decisions, career progression calendar for electricians, and seasonal planning.',
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
            <RefreshCw className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Annual Review &amp; Goal Resetting
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            A structured process for reflecting on the past year, making persist vs pivot vs stop
            decisions, and setting goals that align with your career progression calendar
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Annual review:</strong> A structured reflection on what worked, what
                didn&rsquo;t, and what you learned over the past 12 months
              </li>
              <li>
                <strong>4DX framework:</strong> Focus on the Wildly Important Goal, act on lead
                measures, keep a scoreboard, create accountability
              </li>
              <li>
                <strong>Persist vs pivot vs stop:</strong> A decision framework for goals that are
                underperforming or no longer serving you
              </li>
              <li>
                <strong>Career calendar:</strong> Map ECS renewals, BS 7671 amendments, NICEIC
                assessments, and tax deadlines onto one timeline
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Direction:</strong> Without an annual review, you drift from year to year
                without strategic direction
              </li>
              <li>
                <strong>Compliance:</strong> Missed renewal deadlines (ECS, NICEIC, tax) cost money
                and can stop you working
              </li>
              <li>
                <strong>Efficiency:</strong> Seasonal planning ensures study happens when work is
                quieter, not when earnings are highest
              </li>
              <li>
                <strong>Motivation:</strong> Recognising achievements builds self-efficacy for the
                year ahead
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Conduct a structured annual review covering achievements, failures, learnings, and financial performance',
              'Apply the 4 Disciplines of Execution (4DX) to annual goal setting and quarterly planning',
              'Use the persist vs pivot vs stop framework to evaluate underperforming goals objectively',
              'Recognise the sunk cost fallacy and understand how it distorts goal persistence decisions',
              'Build a career progression calendar incorporating all key deadlines, renewal dates, and exam windows',
              'Plan study and training around seasonal demand patterns to maximise both earnings and development',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Annual Review Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Annual Review Process &mdash; Structured Reflection
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most electricians never sit down for a deliberate, structured review of their year.
                They finish one year and start the next without pausing to assess what happened,
                what worked, what didn&rsquo;t, and what they learned. This is a missed opportunity
                of enormous proportions. The annual review is not a luxury or a corporate exercise
                &mdash; it is the single most powerful planning tool available to any professional,
                and it takes as little as two to four hours.
              </p>

              <p>
                The annual review serves three essential functions. First, it forces you to
                <strong> look backwards with honesty</strong>. Not the vague, half-remembered sense
                of &ldquo;it was an okay year&rdquo; or &ldquo;I was really busy&rdquo;, but a
                specific, evidence-based assessment of what you actually achieved against what you
                planned. Second, it allows you to <strong>extract maximum learning value</strong>{' '}
                from both your successes and your failures. Every year contains lessons &mdash; but
                only if you take the time to identify them. Third, it provides a{' '}
                <strong>foundation for forward planning</strong>. Setting goals for the new year
                without reviewing the old year is like navigating without a map &mdash; you
                don&rsquo;t know where you are, so how can you plan where you&rsquo;re going?
              </p>

              <p>
                The review should cover several key areas. <strong>Achievements:</strong> What did
                you accomplish this year? List everything &mdash; qualifications gained, skills
                developed, projects completed, income milestones reached, business targets hit,
                problems solved, clients gained. Be thorough. Electricians often underestimate their
                progress because they are focused on the next job rather than reflecting on the last
                fifty. <strong>Failures and setbacks:</strong> What didn&rsquo;t go as planned?
                Where did you fall short of your targets? What goals did you abandon or forget
                about? Be honest but not self-critical &mdash; the purpose is learning, not
                punishment. <strong>Lessons learned:</strong> What did the year teach you? What
                would you do differently? What surprised you? What skills or knowledge gaps did you
                discover? <strong>Financial performance:</strong> What did you earn? What did you
                spend? How does this compare to your targets? Where did you waste money? Where did
                investments pay off?
              </p>

              <p>
                The ideal time for an annual review is late December or early January. Many
                electricians find the quiet period between Christmas and New Year perfect for this
                &mdash; work has usually slowed down, the calendar year is ending, and there is a
                natural pause before the new year begins. However, the timing matters less than the
                doing. If you prefer to review at your financial year end, or at the anniversary of
                starting your business, or at any other meaningful date, that works too. The point
                is to create a regular, annual habit of structured reflection and forward planning.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Five-Question Annual Review
                </p>
                <p className="text-base text-white leading-relaxed">
                  If you do nothing else, answer these five questions honestly at the end of each
                  year: <strong>1.</strong> What am I most proud of achieving this year?{' '}
                  <strong>2.</strong> What was my biggest failure or disappointment, and what caused
                  it? <strong>3.</strong> What is the single most important lesson this year taught
                  me? <strong>4.</strong> If I could give my January self one piece of advice based
                  on what I now know, what would it be? <strong>5.</strong> What is the one thing
                  that, if I achieved it next year, would make the biggest difference to my career
                  or life? These five questions take 30 minutes to answer thoughtfully and will give
                  you more strategic clarity than most electricians achieve in a decade of
                  unexamined work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: 4 Disciplines of Execution */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The 4 Disciplines of Execution (4DX) &mdash; McChesney&rsquo;s Framework
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Chris McChesney, along with Sean Covey and Jim Huling, developed the 4 Disciplines
                of Execution (4DX) framework based on research with over 100,000 teams across
                hundreds of organisations. The framework addresses a universal problem: the gap
                between knowing what to do and actually doing it. Most electricians know, in general
                terms, what they should be working towards &mdash; better qualifications, higher
                earnings, stronger business foundations &mdash; but they struggle to make consistent
                progress because the daily demands of work (what McChesney calls the
                &ldquo;whirlwind&rdquo;) consume all available time and energy.
              </p>

              <p>
                The 4DX framework provides a structured solution. It consists of four disciplines,
                each building on the previous one.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Discipline 1: Focus on the Wildly Important Goal (WIG)
              </h3>

              <p>
                The first discipline is narrowing your focus to one or two &ldquo;Wildly Important
                Goals&rdquo; &mdash; the goals that will make the most significant difference to
                your career or life if achieved. McChesney&rsquo;s research found that execution
                quality declines dramatically as the number of active goals increases. Teams
                focusing on two or three goals achieved two or three with excellence. Teams with
                four to ten goals typically achieved only one or two. Teams with more than ten
                active goals achieved none with excellence.
              </p>

              <p>
                For an electrician, the WIG might be: &ldquo;Achieve 2391 Inspection &amp; Testing
                qualification by July&rdquo;, or &ldquo;Grow annual turnover from &pound;55,000 to
                &pound;75,000&rdquo;, or &ldquo;Complete the transition from employment to
                self-employment by September&rdquo;. The key is that it must be the goal that, if
                achieved, would have the most transformative impact on your career. Everything else
                is either a supporting activity or a lower-priority objective that gets maintained
                but not aggressively pursued. This is psychologically difficult because it means
                saying &ldquo;not now&rdquo; to genuinely good opportunities and ideas. But the
                alternative &mdash; spreading your energy across ten goals and achieving none of
                them well &mdash; is far worse.
              </p>

              <p>
                The WIG should be expressed in a specific format: &ldquo;From X to Y by when.&rdquo;
                This format forces clarity. &ldquo;Do more training&rdquo; is vague and
                unmeasurable. &ldquo;Move from zero to qualified in 2391 Inspection &amp; Testing by
                31 July 2027&rdquo; is specific, measurable, and time-bound. You know exactly what
                success looks like and when it must happen.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Discipline 2: Act on Lead Measures
              </h3>

              <p>
                The second discipline distinguishes between <strong>lag measures</strong> and{' '}
                <strong>lead measures</strong>. A lag measure is the result you ultimately want
                &mdash; passing the exam, hitting the revenue target, completing the transition. The
                problem with lag measures is that by the time you measure them, the outcome is
                already determined. You can&rsquo;t change the exam result after the exam. You
                can&rsquo;t change the annual revenue figure on 31 December.
              </p>

              <p>
                A lead measure is the specific activity that drives the lag measure &mdash; the
                thing you can control and influence right now, today, this week. For the 2391
                qualification goal, lead measures might be: &ldquo;Complete five hours of structured
                study per week&rdquo; and &ldquo;Complete two full practice exams per month&rdquo;.
                For the revenue growth goal: &ldquo;Make three prospecting calls per week to letting
                agents and property managers&rdquo; and &ldquo;Ask every satisfied customer for a
                referral&rdquo;. Lead measures are predictive (if you do the activity consistently,
                the result will follow) and influenceable (you can decide today whether to study for
                an hour or watch television).
              </p>

              <p>
                Most electricians focus obsessively on lag measures (&ldquo;I need to earn
                &pound;70k this year&rdquo;) while neglecting the lead measures that actually drive
                those results. This is like trying to lose weight by standing on the scales more
                often rather than changing what you eat. The 4DX framework flips this: define your
                lag measure (the result you want), then identify two or three lead measures (the
                activities that will produce that result), and focus your daily and weekly energy on
                executing those lead measures consistently.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Discipline 3: Keep a Compelling Scoreboard
              </h3>

              <p>
                The third discipline requires creating a simple, visible scoreboard that tracks your
                lead and lag measures. McChesney&rsquo;s research found that people play differently
                when they are keeping score. A team that knows it is winning is more engaged,
                motivated, and proactive than a team that is not tracking its performance. The same
                applies to individuals.
              </p>

              <p>
                The scoreboard must be <strong>simple enough to update in under a minute</strong>,{' '}
                <strong>visible enough that you see it regularly</strong>, and{' '}
                <strong>
                  clear enough that you can tell at a glance whether you are winning or losing
                </strong>
                . For an electrician pursuing a study goal, this might be a simple wall chart in the
                office or van that tracks weekly study hours with a running total. A green marker
                means you hit your target that week; a red marker means you didn&rsquo;t. For a
                revenue goal, it might be a spreadsheet that tracks weekly invoiced amounts against
                the annual target pace line. The key insight is that complexity kills scoreboards.
                If it takes more than a minute to update, you will stop doing it. If it requires a
                computer when you are on site, you will not check it. The best scoreboards are
                brutally simple: am I on pace or not?
              </p>

              <p>
                Digital tools can help &mdash; a simple spreadsheet, a notes app, or a habit
                tracking app on your phone &mdash; but a physical chart on the wall of your office
                or workshop can be equally effective. The point is not the technology; it is the
                visibility. You need to see your score frequently enough that it influences your
                daily decisions. When you can see that you&rsquo;ve missed your study hours for two
                consecutive weeks, you are more likely to make time this week than if your progress
                is hidden in a forgotten spreadsheet.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Discipline 4: Create a Cadence of Accountability
              </h3>

              <p>
                The fourth discipline is the engine that makes the other three work. It establishes
                a regular, predictable rhythm of brief check-ins where you review your scoreboard,
                report on your commitments, and make new commitments. For teams, this is typically a
                weekly meeting of no more than 20 minutes. For individual electricians, it is a
                weekly self-review of 10 to 15 minutes.
              </p>

              <p>
                The weekly review follows a simple structure. <strong>Step 1:</strong> Check the
                scoreboard &mdash; am I on pace for my WIG? <strong>Step 2:</strong> Review last
                week&rsquo;s commitments &mdash; did I do what I said I would do? If not, why not?{' '}
                <strong>Step 3:</strong> Make this week&rsquo;s commitments &mdash; what are the one
                or two most important things I will do this week to advance my WIG? These
                commitments should be specific and achievable within the week (&ldquo;Study Chapter
                4 of the 2391 textbook for two hours on Wednesday evening&rdquo;, not &ldquo;Do some
                study&rdquo;).
              </p>

              <p>
                The word &ldquo;cadence&rdquo; is critical. It must be regular and predictable
                &mdash; the same day and time each week. Many electricians find Sunday evening
                ideal: it is the end of the weekend and the beginning of the work week, making it a
                natural transition point. Others prefer Friday afternoon, reviewing the completed
                week while it is fresh. The exact timing matters less than the consistency. Without
                this weekly discipline, even well-set goals and well-designed scoreboards fade into
                the background as the whirlwind of daily work takes over. The cadence of
                accountability is what keeps the Wildly Important Goal alive in the face of constant
                urgent distractions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  4DX Applied: An Electrician&rsquo;s Example
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>WIG:</strong> &ldquo;From zero to 2391 qualified by 31 July
                      2027&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lead Measure 1:</strong> Complete five hours of structured study per
                      week (textbook + practice questions)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lead Measure 2:</strong> Complete one full practice exam every two
                      weeks under timed conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Scoreboard:</strong> Wall chart in home office tracking weekly study
                      hours and practice exam scores
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cadence:</strong> 15-minute review every Sunday at 7pm &mdash; check
                      scoreboard, review last week, commit to specific study sessions for the coming
                      week
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Persist vs Pivot vs Stop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Persist vs Pivot vs Stop &mdash; The Decision Framework
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most difficult decisions in any annual review is what to do with goals
                that are not progressing as planned. Many electricians fall into one of two traps:
                they either abandon goals too quickly at the first sign of difficulty (a fixed
                mindset response), or they persist stubbornly with goals that are no longer serving
                them (a sunk cost response). The persist vs pivot vs stop framework provides a
                structured way to make this decision rationally.
              </p>

              <p>
                <strong>Persist</strong> means continuing to pursue the goal, potentially with a
                changed strategy. You should persist when: the goal still aligns with your values
                and career direction; you have not yet given it a genuine, sustained effort with an
                effective strategy; and the external environment still supports the goal. In many
                cases, underperformance is not because the goal is wrong but because the execution
                has been inconsistent or the approach has been ineffective. An electrician who set a
                goal to pass the 2391 exam but only studied sporadically and without a structured
                plan has not yet given the goal a fair chance. The answer is to persist with
                improved execution, not to abandon the goal.
              </p>

              <p>
                <strong>Pivot</strong> means adjusting the direction while maintaining the
                underlying intent. You should pivot when: the broad direction is right but the
                specific target needs modification. For example, an electrician who set a goal to
                start their own domestic installation business but discovered through the year that
                they actually prefer industrial maintenance might pivot to &ldquo;transition into an
                industrial maintenance role&rdquo; rather than &ldquo;start a domestic
                business&rdquo;. The underlying intent (career advancement, greater autonomy) is
                maintained, but the specific direction has been adjusted based on new information.
                Pivoting is not failure &mdash; it is intelligent adaptation.
              </p>

              <p>
                <strong>Stop</strong> means deliberately and consciously abandoning a goal. You
                should stop when: the goal no longer aligns with your values or career direction;
                the external environment has changed in a way that makes the goal irrelevant or
                unachievable; or you have given the goal a genuine, sustained effort with multiple
                strategies and it is consistently not producing results. Stopping is the hardest
                decision because it triggers the sunk cost fallacy &mdash; the feeling that you must
                continue because of the time, money, and effort already invested. But continuing to
                invest in a goal that is no longer serving you is not persistence &mdash; it is
                waste. The resources you free up by stopping can be redirected to goals that do
                align with where you are now.
              </p>

              <p>
                To make the persist/pivot/stop decision effectively, ask three questions about each
                underperforming goal:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Alignment:</strong> Does this goal still align with my values,
                    interests, and long-term career vision? If your priorities have genuinely
                    shifted, the goal may no longer be worth pursuing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Execution:</strong> Have I given this goal a genuine, strategic effort?
                    Or have I been inconsistent, half-hearted, or using an ineffective approach? If
                    the execution has been poor, the goal deserves another chance with better
                    execution before you consider stopping.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Environment:</strong> Has something changed externally that affects the
                    viability or relevance of this goal? A new regulation, a market shift, a change
                    in personal circumstances, or new information that wasn&rsquo;t available when
                    the goal was set?
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Real-World Examples for Electricians
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>Persist:</strong> You set a goal to grow your business to &pound;80k
                  turnover but only reached &pound;62k because you didn&rsquo;t consistently follow
                  up on quotes and referrals. The goal is still right; the execution needs
                  improving. Persist with better lead measures. &bull; <strong>Pivot:</strong> You
                  set a goal to specialise in EV charger installation but discovered through the
                  year that the market in your area is saturated with low-price competitors. Pivot
                  to battery storage and solar PV integration, which is less competitive and higher
                  margin. &bull; <strong>Stop:</strong> You set a goal to gain a City &amp; Guilds
                  teaching qualification because you thought you wanted to become a college tutor,
                  but through shadowing a tutor you realised you actually prefer being on site. Stop
                  the teaching goal and redirect that energy to a site-based qualification or
                  specialisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Sunk Cost Fallacy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Sunk Cost Fallacy &mdash; Why We Keep Pursuing Dead-End Goals
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The sunk cost fallacy is one of the most powerful and pervasive cognitive biases
                affecting human decision-making. It is the tendency to continue investing time,
                money, or effort into something because of what has already been invested, even when
                continuing no longer makes rational sense. The psychological reasoning is: &ldquo;I
                have already put so much into this, I can&rsquo;t stop now or it will all have been
                wasted.&rdquo; But the truth is, the resources already spent are gone regardless of
                what you decide next. They are sunk &mdash; unrecoverable. The only rational basis
                for the decision is whether future investment is likely to produce a worthwhile
                return.
              </p>

              <p>
                For electricians, the sunk cost fallacy appears in many forms. An electrician who
                has spent &pound;2,000 on a training course they are not enjoying and does not
                believe will advance their career feels compelled to finish it &ldquo;because
                I&rsquo;ve already paid for it&rdquo;. But the &pound;2,000 is gone whether they
                finish the course or not. The real question is: will the remaining hours of my time
                (which do have future value) be better spent finishing this course or doing
                something else? A self-employed electrician who invested &pound;5,000 in specialist
                tools for a niche market that hasn&rsquo;t materialised feels unable to abandon the
                niche because of the tool investment. But the tools are bought regardless. The
                question is: should I spend the next six months marketing a service nobody wants, or
                redirect my energy to a more profitable area?
              </p>

              <p>
                The sunk cost fallacy is particularly dangerous in business decisions. Electricians
                who have invested heavily in a business model that isn&rsquo;t working (a van wrap,
                a website, specialist equipment, marketing campaigns) often persist long past the
                point of rationality because abandoning the model feels like admitting the
                investment was a mistake. But continuing to invest in a failing model is a bigger
                mistake than cutting losses and redirecting resources. The most successful
                businesspeople are those who can recognise when a sunk cost is influencing their
                judgement and override it with forward-looking analysis.
              </p>

              <p>
                To combat the sunk cost fallacy during your annual review, try this exercise: for
                each goal or project you are considering continuing, imagine you are starting from
                scratch today. If you had not already invested any time, money, or effort, would you
                choose to start this goal or project now, given what you know? If the answer is no,
                that is a strong signal that you are being influenced by sunk costs rather than
                future value. This &ldquo;fresh start&rdquo; thought experiment strips away the
                emotional weight of past investment and forces a rational assessment of future
                potential.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sunk Cost Red Flags &mdash; Phrases That Signal the Fallacy
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;I&rsquo;ve already spent &pound;X on this, I can&rsquo;t stop
                      now&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;I&rsquo;ve been doing this for Y years, it would be a waste to
                      change&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>&ldquo;I&rsquo;ve put too much into this to walk away&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>&ldquo;If I stop now, all that time/money/effort was wasted&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Better question:</strong> &ldquo;Given where I am now, is this the
                      best use of my future time and resources?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Career Progression Calendar */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Career Progression Calendar for Electricians
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every electrician&rsquo;s career involves a web of deadlines, renewal dates, exam
                windows, regulatory changes, and financial obligations. Most electricians manage
                these reactively &mdash; they notice the ECS card is expiring when they need it for
                site access, they scramble for tax records in January, they discover a new BS 7671
                amendment months after it was published. A career progression calendar maps all of
                these obligations and opportunities onto a single timeline, enabling proactive
                planning instead of reactive firefighting.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                BS 7671 Amendment Cycles
              </h3>

              <p>
                BS 7671 (Requirements for Electrical Installations &mdash; the IET Wiring
                Regulations) follows a roughly predictable amendment cycle. The current edition is
                BS 7671:2018, which has been amended by Amendment 1 (A1:2020), Amendment 2
                (A2:2022), and Amendment 3 (A3:2024). A3:2024 was issued on 31 July 2024 and adds
                Regulation 530.3.201 regarding bidirectional and unidirectional devices. Amendment 4
                is expected around 2026. The next full edition (the 19th Edition) is anticipated
                around 2028, though dates are subject to change.
              </p>

              <p>
                For your annual plan, this means: monitor the IET and BSI websites for amendment
                announcements; budget for updated regulation books or digital access when amendments
                are published; schedule study time to understand new or changed requirements; ensure
                your 18th Edition qualification is current (many employers and scheme providers
                require the most recent amendment); and consider attending CPD courses or webinars
                that cover the changes. An electrician who plans for these updates avoids the panic
                of discovering mid-year that their knowledge is out of date.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                ECS Card Renewal Timelines
              </h3>

              <p>
                ECS (Electrotechnical Certification Scheme) cards, administered by the JIB (Joint
                Industry Board), typically have a 3 to 5 year validity period depending on the card
                grade. Renewal requires evidence of ongoing competence, including up-to-date
                qualifications (particularly the current BS 7671 edition), CPD activities, and
                current practice in the electrical sector. Your annual review should include
                checking your ECS card expiry date, ensuring your qualifications are current, and
                verifying that your CPD log is up to date. Do not wait until the card is about to
                expire &mdash; start the renewal process at least three months in advance.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                IET CPD Annual Requirements
              </h3>

              <p>
                The IET (Institution of Engineering and Technology) expects members to engage in
                Continuing Professional Development throughout the year. While the specific hourly
                requirements vary by membership grade, the principle is consistent: you should be
                able to demonstrate that you are actively maintaining and developing your
                professional competence. This includes formal learning (courses, qualifications),
                informal learning (reading, webinars, site visits), professional activity
                (mentoring, committee work), and self-directed study. Your annual review should
                include a CPD audit: have you logged sufficient activities this year? Are there gaps
                in your development that need addressing? What CPD activities will you plan for next
                year?
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                NICEIC/NAPIT Annual Assessment Preparation
              </h3>

              <p>
                If you are registered with a competent person scheme such as NICEIC, NAPIT, ELECSA,
                or STROMA, you will typically face an annual assessment. This involves a scheme
                assessor reviewing your documentation (certificates, test results, design records),
                inspecting a sample of your completed work, and potentially asking technical
                questions. Preparation should not be a last-minute scramble. Build it into your
                annual calendar: ensure every job is documented properly throughout the year, keep
                test instruments calibrated and certificates accessible, maintain your complaints
                log and corrective actions register, and schedule a self-assessment at least one
                month before the assessor&rsquo;s visit.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                Tax Year Deadlines (Self-Employed Electricians)
              </h3>

              <p>
                Self-employed electricians face several critical HMRC deadlines each year. The
                self-assessment tax return for the previous tax year (6 April to 5 April) must be
                filed online by <strong>31 January</strong>. Tax owed must also be paid by 31
                January. If your tax bill exceeds &pound;1,000, HMRC will require{' '}
                <strong>payments on account</strong> &mdash; advance payments towards next
                year&rsquo;s tax, due on 31 January and 31 July. If you are VAT registered, VAT
                returns are due quarterly (the specific dates depend on your VAT period). Class 2
                National Insurance is collected through self-assessment.
              </p>

              <p>
                The annual review should include a financial calendar check: are all tax deadlines
                mapped? Are payment dates budgeted for? Is bookkeeping up to date, or are there
                months of receipts and invoices to process? Many electricians leave all tax
                preparation to January and then face a stressful, expensive scramble with their
                accountant. Planning quarterly bookkeeping sessions (April, July, October, January)
                spreads the work and gives you much earlier visibility of your tax position.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                City &amp; Guilds Exam Windows and Booking
              </h3>

              <p>
                City &amp; Guilds qualifications (such as 2391 Inspection &amp; Testing, 2394
                Design, 2395 Combined Inspection and Testing, and the various EAL/City &amp; Guilds
                installation qualifications) typically have specific exam windows throughout the
                year. Centres may offer exams monthly, termly, or at specific points depending on
                the qualification and demand. Popular exam dates (especially for 2391 and AM2) can
                book up weeks or months in advance. Your annual plan should identify which
                qualifications you are pursuing, research the available exam dates at your preferred
                centre, and book early to secure your preferred date. Leaving exam booking to the
                last minute often means waiting months for the next available slot.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Sample Career Calendar: Key Dates to Map
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>January:</strong> Self-assessment tax return deadline (31st), payment on
                  account due (31st), set annual goals &bull; <strong>March:</strong> End of tax
                  year approaching (5 April), gather receipts, review expenses &bull;{' '}
                  <strong>April:</strong> New tax year starts (6th), update bookkeeping system,
                  review insurance renewals &bull; <strong>July:</strong> Second payment on account
                  due (31st), mid-year goal review &bull; <strong>September:</strong> Common window
                  for NICEIC/NAPIT annual assessment, prepare documentation &bull;{' '}
                  <strong>October:</strong> Online self-assessment opens for previous tax year,
                  start gathering records &bull; <strong>November&ndash;December:</strong> Annual
                  review and goal setting for the coming year, book any January&ndash;March training
                  courses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Seasonal Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Seasonal Planning for Electricians
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical industry, like most construction trades, has predictable seasonal
                patterns. Understanding these patterns and planning around them is a strategic
                advantage that most electricians fail to exploit. The general pattern in the UK is:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Spring (March&ndash;May):</strong> Work ramps up. Domestic customers
                    start home improvement projects. Garden rooms, extensions, and outdoor electrics
                    come to life. New-build housing picks up pace. This is a high-earning period.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Summer (June&ndash;August):</strong> Peak season for many domestic
                    electricians. Longer daylight hours, better weather for external work, high
                    demand for extensions, conversions, and renovation projects. This is typically
                    your highest-earning quarter.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Autumn (September&ndash;November):</strong> Still busy. Heating-related
                    work increases (storage heaters, immersion heaters, underfloor heating).
                    Landlord EICRs increase as tenancy agreements cycle. Commercial fit-outs often
                    aim for pre-Christmas completion.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Winter (December&ndash;February):</strong> The quietest period for many
                    electricians, particularly those in domestic work. Short daylight hours, poor
                    weather, and the Christmas break reduce available working days. Emergency
                    call-outs increase, but planned work drops.
                  </span>
                </li>
              </ul>

              <p>
                Strategic annual planning means aligning your goals with these patterns. The winter
                quiet period is ideal for: intensive study and exam preparation (you are not
                sacrificing your highest-earning weeks); business planning and admin (updating your
                website, preparing marketing materials, reviewing finances); tool maintenance and
                van organisation; and booking training courses that run in January or February when
                you can most afford the time. Conversely, the spring and summer peak should be
                protected for earning &mdash; do not book a two-week training course in June when
                you could be invoicing &pound;3,000 to &pound;5,000 per week.
              </p>

              <p>
                This seasonal awareness also applies to financial planning. If you know that
                December and January are your lowest-earning months, you should build a financial
                buffer during the high-earning summer months to cover the winter dip. Many
                self-employed electricians live month-to-month and then face a cash crisis in
                January when work is slow and the tax bill is due simultaneously. Planning for this
                is not difficult &mdash; it just requires the foresight to set aside a percentage of
                summer earnings for the winter period.
              </p>

              <p>
                Industrial and commercial electricians may experience different seasonal patterns.
                Factory shutdowns (often in August and December) create windows for maintenance
                work. End-of-financial-year budget spending by large organisations can create spikes
                in March. New commercial developments often aim for spring starts and autumn
                completions. Whatever your sector, understanding its seasonal rhythm and planning
                accordingly gives you a significant advantage over electricians who treat every
                month the same.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Seasonal Strategy Planner</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Winter (quiet):</strong> Study, exams, business planning, tool
                      maintenance, training courses, tax preparation, annual review
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Spring (ramping up):</strong> Focus on earning, implement new
                      marketing strategies, book summer jobs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong>Summer (peak):</strong> Maximise earnings, build financial buffer for
                      winter, maintain CPD log
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Autumn (busy):</strong> Mid-year review, prepare for NICEIC/NAPIT
                      assessment, begin tax record gathering
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: The Annual Financial Review */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            The Annual Financial Review
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Money is the lifeblood of any self-employed electrical business, yet most
                electricians have only a vague sense of their annual financial performance. They
                know roughly how much they invoiced, roughly what they spent on materials and tools,
                and roughly what they paid in tax &mdash; but &ldquo;roughly&rdquo; is not good
                enough for strategic planning. The annual financial review turns vague impressions
                into concrete numbers that inform next year&rsquo;s goals.
              </p>

              <p>
                <strong>Income analysis:</strong> What was your total gross income for the year? How
                does this compare to your target? Break it down by month and by customer type
                (domestic, commercial, landlord, builder, direct customer). Identify your
                highest-earning months and your lowest. Identify your most profitable customer types
                and your least profitable. This analysis often reveals surprises &mdash; many
                electricians discover that a small number of repeat clients (such as letting agents
                or builders) generate a disproportionate share of their income, while time-consuming
                one-off domestic jobs generate less per hour than they assumed.
              </p>

              <p>
                <strong>Expense analysis:</strong> What did you actually spend? Categorise expenses:
                materials, tools, vehicle costs (fuel, insurance, maintenance, finance), insurance
                (public liability, professional indemnity, tool insurance), marketing, training and
                qualifications, accountancy fees, software subscriptions, phone and broadband, work
                clothing and PPE. Compare each category to last year and to your budget (if you had
                one). Where did you overspend? Where did you underspend? Are there recurring
                expenses that are no longer providing value?
              </p>

              <p>
                <strong>Tax efficiency:</strong> Did you claim all allowable expenses? Many
                electricians miss legitimate claims: use of home as office, mileage allowance,
                training costs, professional subscriptions (IET membership, scheme registration
                fees), and capital allowances on tools and equipment. Did you make the most of the
                trading allowance, the VAT flat rate scheme (if applicable), or pension
                contributions for tax relief? If you don&rsquo;t have an accountant, this is often
                the area where getting professional advice pays for itself many times over.
              </p>

              <p>
                <strong>Profitability per hour:</strong> This is the single most important financial
                metric for a self-employed electrician, and very few calculate it. Your hourly rate
                on an invoice is not your real hourly rate. To calculate true profitability per
                hour, take your net profit for the year (income minus all expenses, before tax) and
                divide by the total hours worked (including quoting, travelling, admin, and
                marketing, not just billable hours on site). The result is often eye-opening. An
                electrician charging &pound;50 per hour on invoices but spending 30% of their time
                on unpaid activities (quoting, travelling, admin) and absorbing significant material
                and vehicle costs may find their true hourly rate is closer to &pound;20 to
                &pound;25. This figure informs pricing decisions for the following year.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Key Financial Numbers to Calculate Annually
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>1.</strong> Total gross income &bull; <strong>2.</strong> Total expenses
                  (broken down by category) &bull; <strong>3.</strong> Net profit (income minus
                  expenses) &bull; <strong>4.</strong> Tax paid (income tax + National Insurance +
                  VAT if applicable) &bull; <strong>5.</strong> True hourly rate (net profit
                  &divide; total hours worked) &bull; <strong>6.</strong> Average job value (total
                  income &divide; number of jobs) &bull; <strong>7.</strong> Quote conversion rate
                  (jobs won &divide; quotes issued) &bull; <strong>8.</strong> Income per customer
                  type (domestic, commercial, landlord, etc.)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Setting Goals for the New Year */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Setting Goals for the New Year &mdash; Beyond Resolutions
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                New Year&rsquo;s resolutions have an approximately 80% failure rate by February.
                Research by the University of Scranton found that only 8% of people who set New
                Year&rsquo;s resolutions achieve them. The reason is not that the goals themselves
                are bad &mdash; it is that resolutions are typically vague aspirations without
                specific targets, action plans, deadlines, or accountability mechanisms. &ldquo;Earn
                more money&rdquo;, &ldquo;get fitter&rdquo;, &ldquo;do more training&rdquo; &mdash;
                these are wishes, not goals.
              </p>

              <p>
                Effective annual goal setting, grounded in the principles covered throughout this
                module, looks fundamentally different. It begins with the annual review (what
                happened last year and what did I learn?), applies the 4DX framework (what is my
                Wildly Important Goal and what lead measures will I track?), uses the
                persist/pivot/stop framework for existing goals, and builds in accountability
                mechanisms (a compelling scoreboard and a regular cadence of review).
              </p>

              <p>
                <strong>Step 1: Identify your WIG.</strong> Based on your annual review, what is the
                single most important goal for the coming year? This should be the goal that, if
                achieved, would have the greatest positive impact on your career, business, or life.
                Express it in &ldquo;From X to Y by when&rdquo; format. For example: &ldquo;From
                &pound;52,000 to &pound;70,000 annual turnover by 31 December&rdquo;, or &ldquo;From
                unqualified to 2391 qualified by 30 June&rdquo;, or &ldquo;From employed to
                self-employed with 10 regular clients by 30 September&rdquo;.
              </p>

              <p>
                <strong>Step 2: Define lead measures.</strong> What are the two or three specific,
                repeatable activities that will drive your WIG? These should be predictive (if you
                do them consistently, the result will follow) and influenceable (you can control
                whether you do them or not). For a revenue target, lead measures might include:
                number of quotes issued per week, number of follow-up calls made, or number of
                referral requests to existing customers. For a qualification target: hours of
                structured study per week and number of practice exams completed per month.
              </p>

              <p>
                <strong>Step 3: Create your scoreboard.</strong> Design a simple, visual tracking
                system for your lead and lag measures. This could be a wall chart, a spreadsheet, or
                an app &mdash; whatever you will actually use consistently. The scoreboard must tell
                you at a glance whether you are on pace for your annual target.
              </p>

              <p>
                <strong>Step 4: Set your cadence.</strong> Choose a specific day and time for your
                weekly review. Put it in your calendar as a recurring appointment. Protect this time
                as you would a client appointment &mdash; it is an appointment with your own career
                development.
              </p>

              <p>
                <strong>Step 5: Plan the first 90 days in detail.</strong> While your WIG is an
                annual target, break the first quarter into specific monthly milestones and weekly
                actions. What exactly will you do in January, February, and March to get momentum?
                The first 90 days set the trajectory for the entire year. If you start well, you
                build momentum and confidence. If you drift through January and February without
                action, you have already lost two months &mdash; nearly 17% of the year.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The &ldquo;New Year&rsquo;s Resolution&rdquo; vs &ldquo;Strategic Annual
                  Goal&rdquo; Comparison
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Resolution:</strong> &ldquo;Do more training this year&rdquo; &bull;{' '}
                      <strong>Strategic goal:</strong> &ldquo;Achieve 2391 Inspection &amp; Testing
                      qualification by 30 June, studying 5 hours per week from January, with exam
                      booked for May&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Resolution:</strong> &ldquo;Earn more money&rdquo; &bull;{' '}
                      <strong>Strategic goal:</strong> &ldquo;Increase annual turnover from
                      &pound;55k to &pound;72k by securing 3 new letting agent clients (lead
                      measure: contact 2 new agents per week)&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Resolution:</strong> &ldquo;Get better at business&rdquo; &bull;{' '}
                      <strong>Strategic goal:</strong> &ldquo;Implement a quoting system with
                      automated follow-ups by 28 February, targeting a quote conversion rate of 65%
                      (currently 40%)&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: The Mid-Year Course Correction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            The Mid-Year Course Correction
          </h2>
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even the best annual plans require adjustment. Circumstances change, unexpected
                opportunities arise, and some assumptions prove wrong. The mid-year review (ideally
                in June or July) is a critical checkpoint that most electricians skip. It is not a
                full annual review &mdash; it is a focused 60 to 90 minute assessment of where you
                are against where you planned to be, and what adjustments are needed for the second
                half of the year.
              </p>

              <p>
                The mid-year review should address four questions.{' '}
                <strong>First: Am I on pace?</strong> Look at your scoreboard. If your annual goal
                was &pound;72k turnover, have you invoiced approximately &pound;36k by the end of
                June? If your goal was a qualification by December, have you completed approximately
                half the study material? If you are significantly ahead or behind, the second half
                of the year needs different planning than if you are on track.
              </p>

              <p>
                <strong>Second: What has changed since January?</strong> Has anything significant
                happened that affects your goals? A new regulation, a change in the market, a
                personal circumstance shift, a new opportunity, or a setback? Goals set in January
                are based on January&rsquo;s information. By July, you have six months of new data.
                Update your plans accordingly.
              </p>

              <p>
                <strong>Third: Are my lead measures working?</strong> This is the most important
                question. If you have been consistently hitting your lead measures (studying five
                hours per week, contacting two agents per week, issuing five quotes per week) and
                your lag measure is not responding, then the lead measures may be wrong. Perhaps the
                study material is not effective, or the agents you are contacting are not the right
                ones, or your quotes are too high. Adjust the lead measures based on what you have
                learned in the first half.
              </p>

              <p>
                <strong>Fourth: Do I need to persist, pivot, or stop?</strong> Apply the
                persist/pivot/stop framework to any goals that are significantly off track. Some may
                need a changed strategy (persist with improved execution). Some may need redirecting
                (pivot to a better-aligned target). And some, honestly, may need to be stopped so
                that your energy can be focused where it will have the most impact.
              </p>

              <p>
                The mid-year review is also an opportunity to set specific targets for the second
                half. Just as the annual plan should detail the first 90 days, the mid-year review
                should detail the next 90 days (July to September) with specific monthly milestones
                and weekly actions. The remaining six months of the year often passes faster than
                the first six, so having a concrete second-half plan is essential to avoid the
                &ldquo;suddenly it&rsquo;s December&rdquo; syndrome.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Mid-Year Review Template (60 Minutes)
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>First 20 minutes:</strong> Review your scoreboard. Where are you against
                  your annual targets? Capture the numbers, not impressions. &bull;{' '}
                  <strong>Next 20 minutes:</strong> Analyse what has worked and what hasn&rsquo;t.
                  Are your lead measures producing results? What has changed since January? &bull;{' '}
                  <strong>Final 20 minutes:</strong> Adjust targets if needed (persist/pivot/stop).
                  Set specific milestones for July, August, and September. Identify the single most
                  important action for the coming week.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Tools for Annual Review */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            Tools for Annual Review &mdash; Templates, Spreadsheets, and Apps
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The best review tool is the one you will actually use. Many electricians are put off
                by complex planning systems that require hours to set up and maintain. The annual
                review does not require expensive software or a business degree &mdash; it requires
                honesty, time, and a simple structure. Here are practical options at different
                levels of complexity.
              </p>

              <p>
                <strong>Paper-based (simplest):</strong> A notebook or printed template works
                perfectly for many electricians. Write your five-question review answers by hand.
                Create a physical wall chart for your scoreboard. Use a diary for your weekly
                cadence of accountability. The advantages of paper are: zero learning curve, no
                technology required, and the physical act of writing has been shown to aid
                reflection and memory formation. The disadvantage is that you cannot easily
                calculate running totals, create charts, or access your plan from multiple
                locations.
              </p>

              <p>
                <strong>Spreadsheet-based (moderate):</strong> A simple Google Sheets or Excel
                spreadsheet provides more power while remaining accessible. Create tabs for: Annual
                Review (past year analysis), Goals (WIG, lead measures, milestones), Scoreboard
                (weekly tracking of lead and lag measures), Financial Review (income, expenses,
                profit analysis), and Calendar (key dates and deadlines). Spreadsheets allow
                automatic calculations, conditional formatting (green when on pace, red when
                behind), and chart generation. They sync across devices if you use Google Sheets or
                OneDrive. Many electricians find that a single spreadsheet is all they need for
                comprehensive annual planning.
              </p>

              <p>
                <strong>App-based (most features):</strong> Several apps are designed for goal
                tracking and review. Notion provides a flexible workspace that can be customised for
                annual planning. Todoist or TickTick offer task-based goal tracking with recurring
                reminders. Habitica gamifies habit tracking. Strides or Way of Life are dedicated
                goal tracking apps. The advantage of apps is portability (always on your phone),
                automated reminders, and built-in tracking features. The disadvantage is the
                learning curve, the risk of over-engineering your system, and the monthly
                subscription costs of some platforms.
              </p>

              <p>
                Whichever tool you choose, the principle is the same: keep it simple enough that you
                will maintain it consistently. A simple paper system used every week beats a
                sophisticated digital system abandoned in February. Start simple and add complexity
                only if you find you need it. Many successful electricians use nothing more than a
                notebook and a wall chart &mdash; the tools do not determine success, the discipline
                of using them does.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Learning From the Past Year */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">11</span>
            Learning From the Past Year &mdash; Successes and Failures
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every year contains a wealth of learning &mdash; but only if you take the time to
                extract it. Most electricians move from one year to the next without deliberately
                processing what happened. The successes are forgotten (or taken for granted), and
                the failures are either suppressed or repeated. A deliberate learning extraction
                process captures the lessons from both outcomes.
              </p>

              <p>
                <strong>Learning from success:</strong> Success is often more dangerous than failure
                because it creates complacency. When something works well, the temptation is to move
                on without understanding why it worked. But understanding the causes of success is
                essential for replicating it. In your annual review, for each significant
                achievement, ask: What specifically did I do that led to this result? Was it
                replicable (a repeatable strategy) or unrepeatable (lucky timing, a one-off
                opportunity)? What conditions enabled it? Can I create those conditions again? What
                would I do differently to achieve an even better result? For example, if you gained
                three new letting agent clients this year, don&rsquo;t just note &ldquo;won new
                clients&rdquo; &mdash; analyse how you won them. Was it through direct outreach? A
                referral? Online marketing? Understanding the mechanism allows you to repeat it
                deliberately.
              </p>

              <p>
                <strong>Learning from failure:</strong> Failure is the most valuable learning
                resource available &mdash; if you process it correctly. The natural human response
                to failure is avoidance: suppress the memory, blame external factors, or label
                yourself as inadequate (fixed mindset). The growth mindset response is to treat
                failure as data: what happened? What caused it? What was within my control? What
                would I do differently? What have I learned that I can apply going forward?
              </p>

              <p>
                A particularly powerful technique is the <strong>pre-mortem/post-mortem</strong>{' '}
                approach. For failures that have already happened, conduct a post-mortem: analyse
                the causes, extract the lessons, and define what you will change. For goals you are
                setting for the coming year, conduct a pre-mortem: imagine it is December and you
                have failed to achieve the goal. What went wrong? Why did it fail? This
                counter-intuitive exercise surfaces risks and obstacles in advance, allowing you to
                plan for them. Research by psychologist Gary Klein shows that pre-mortems increase
                the accuracy of planning by up to 30% because they force you to confront likely
                failure modes before they happen.
              </p>

              <p>
                The key to both success and failure analysis is specificity. &ldquo;I had a good
                year&rdquo; teaches you nothing. &ldquo;I increased my turnover by 18% primarily by
                securing repeat work from two letting agents through consistently good service and
                timely EICR delivery&rdquo; teaches you exactly what worked and how to build on it.
                &ldquo;I failed the 2391 exam&rdquo; teaches you nothing. &ldquo;I failed the 2391
                exam because I underestimated the depth of knowledge required for the written paper,
                studied primarily from YouTube rather than the textbook, and ran out of time in the
                exam because I didn&rsquo;t practice under timed conditions&rdquo; teaches you
                exactly what to change.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12: Celebrating Annual Achievements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">12</span>
            Celebrating Annual Achievements
          </h2>
          <div className="border-l-2 border-pink-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This is the step that almost every electrician skips &mdash; and it matters more
                than you think. Before rushing into new goals for the new year, you must
                deliberately pause and recognise what you achieved in the past year. This is not
                about arrogance or self-congratulation. It is about building the psychological
                foundation for future success.
              </p>

              <p>
                Albert Bandura&rsquo;s research on <strong>self-efficacy</strong> &mdash; the belief
                in your ability to succeed in specific situations &mdash; shows that one of the
                strongest sources of self-efficacy is <strong>mastery experience</strong>: the
                personal experience of succeeding at something through your own effort. When you
                review your achievements and explicitly recognise them, you are building a bank of
                mastery experiences that your brain can draw on when facing future challenges. The
                next time you set an ambitious goal and your inner voice says &ldquo;Can I really do
                this?&rdquo;, you have concrete evidence: &ldquo;I passed the 2391 exam last year
                when I thought I couldn&rsquo;t. I grew my business by 25%. I completed my first
                commercial project. I figured out PLC programming. Yes, I can do this.&rdquo;
              </p>

              <p>
                Conversely, if you never pause to recognise your achievements, you train your brain
                to focus exclusively on deficits &mdash; what you haven&rsquo;t done, what you
                haven&rsquo;t achieved, what you still need. This creates a permanent sense of
                falling short, even when you are actually making excellent progress. It is the
                hedonic treadmill applied to career development: you achieve something, immediately
                raise the bar, and never feel satisfied.
              </p>

              <p>
                The celebration does not need to be grand. It can be as simple as: writing a list of
                everything you achieved this year (be thorough &mdash; include small wins as well as
                big ones); sharing your achievements with a partner, friend, or mentor; treating
                yourself to something meaningful (a good meal, a new tool, a day off); or simply
                sitting with the list for ten minutes and allowing yourself to feel genuine
                satisfaction before moving on to planning the next year.
              </p>

              <p>
                For electricians who find self-recognition difficult (and trade culture often
                discourages it), reframe it as professional stock-taking. You are not boasting or
                being soft &mdash; you are conducting an honest assessment of your professional
                development. If you were advising an apprentice and they had achieved what you
                achieved this year, you would congratulate them. Apply the same standard to
                yourself.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Achievement Inventory Exercise
                </p>
                <p className="text-base text-white leading-relaxed">
                  List everything you achieved in the past 12 months across these categories:{' '}
                  <strong>Skills:</strong> What new skills did you develop or improve? &bull;{' '}
                  <strong>Qualifications:</strong> What courses did you complete, exams did you
                  pass, or certifications did you gain? &bull; <strong>Projects:</strong> What
                  challenging projects did you complete successfully? &bull;{' '}
                  <strong>Financial:</strong> Did you hit income targets? Reduce debt? Save more?
                  Invest in your business? &bull; <strong>Relationships:</strong> Did you build new
                  professional connections? Improve client relationships? Mentor someone? &bull;{' '}
                  <strong>Personal growth:</strong> How did you grow as a person? What difficult
                  situations did you handle well? What mindset shifts did you make? &bull; Be
                  generous &mdash; if in doubt, include it. Most electricians dramatically
                  undercount their achievements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 13: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">13</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has covered the annual review and goal resetting process &mdash; the
                strategic discipline that separates electricians who drift from year to year from
                those who build deliberately towards their ambitions. The key points to carry
                forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The annual review</strong> is a structured process of looking backwards
                    with honesty, extracting lessons from successes and failures, and building a
                    foundation for forward planning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 4 Disciplines of Execution</strong> provide a proven framework:
                    focus on the Wildly Important Goal, act on lead measures, keep a compelling
                    scoreboard, and create a cadence of accountability.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Persist vs pivot vs stop</strong> is a rational decision framework for
                    underperforming goals, based on alignment, execution quality, and environmental
                    relevance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The sunk cost fallacy</strong> distorts our judgement by making us
                    continue investments that are no longer rational. Recognise it and override it
                    with forward-looking analysis.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The career progression calendar</strong> maps BS 7671 amendments, ECS
                    renewals, NICEIC assessments, tax deadlines, and exam windows onto a single
                    timeline for proactive planning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Seasonal planning</strong> aligns study and training with quieter
                    periods and earning with peak periods, maximising both development and income.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The mid-year review</strong> is a critical 60-minute checkpoint that
                    prevents the &ldquo;suddenly it&rsquo;s December&rdquo; syndrome and enables
                    course correction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Celebrating achievements</strong> before setting new goals builds the
                    self-efficacy needed to pursue ambitious targets with confidence.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will explore
                  staying motivated long-term &mdash; the psychology of sustained motivation, how to
                  maintain momentum through the inevitable low points, building systems that support
                  you when willpower runs out, and creating an environment that makes progress the
                  path of least resistance.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../gs-module-5-section-4">
              Next: Staying Motivated Long-Term
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
