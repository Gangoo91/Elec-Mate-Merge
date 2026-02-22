import { ArrowLeft, BarChart3, CheckCircle } from 'lucide-react';
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
    id: 'gs-4-1-check1',
    question:
      'An electrician wants to measure whether their business is growing. They track total revenue each month. What type of measure is this, and what is the main limitation?',
    options: [
      'Lead measure &mdash; it predicts future performance but does not show what is already achieved',
      'Lag measure &mdash; it shows past results but does not directly indicate what actions will improve future performance',
      'Lead measure &mdash; it shows current activity levels in real time',
      'Lag measure &mdash; it measures daily activity and can be directly controlled',
    ],
    correctIndex: 1,
    explanation:
      'Revenue is a lag measure &mdash; it shows what has already happened (results) but does not tell you what specific actions to take to improve future revenue. Lag measures are important for tracking outcomes, but they are not directly controllable on a day-to-day basis. Lead measures, by contrast, are predictive and influenceable &mdash; they measure the activities that drive the lag measures. For example, the number of quotes sent per week (lead) predicts future revenue (lag). Peter Drucker is often quoted as saying &ldquo;what gets measured gets managed&rdquo;, but to manage effectively, you need both lead and lag measures: lag measures show the destination, lead measures show the path.',
  },
  {
    id: 'gs-4-1-check2',
    question:
      'An apprentice electrician is tracking their progress towards achieving their Level 3 qualification. Which of the following is the BEST example of a lead measure they could track weekly?',
    options: [
      'Whether they have passed their final exams at the end of the year',
      'The number of hours spent revising technical content each week',
      'Their overall grade at the end of each college term',
      'Whether they have been offered a permanent position after completing their apprenticeship',
    ],
    correctIndex: 1,
    explanation:
      'The number of hours spent revising each week is a lead measure &mdash; it is predictive (more revision hours typically lead to better exam results), influenceable (the apprentice can directly control how much they study), and measurable on a short cycle (weekly). The other options are all lag measures: exam results, term grades, and job offers are outcomes that show what has already happened, not actions that the apprentice can take this week to improve their future results. The power of lead measures is that they give you something concrete to act on every day or week, which builds momentum and keeps you engaged with the process rather than just fixating on distant outcomes.',
  },
  {
    id: 'gs-4-1-check3',
    question:
      'Research by Teresa Amabile at Harvard Business School found that the single most important factor for workplace motivation and performance was:',
    options: [
      'Financial bonuses and performance-related pay',
      'The experience of making progress in meaningful work, even if the progress is small',
      'Public recognition and awards for achievement',
      'Challenging stretch goals that push people beyond their comfort zone',
    ],
    correctIndex: 1,
    explanation:
      'Teresa Amabile&rsquo;s &ldquo;progress principle&rdquo; research, published in The Progress Principle: Using Small Wins to Ignite Joy, Engagement, and Creativity at Work (2011), found that the single greatest motivator at work is the experience of making progress in meaningful work. Even small steps forward &mdash; completing a task, solving a problem, reaching a minor milestone &mdash; had a disproportionately positive effect on motivation, emotions, and performance. This finding has profound implications for electricians setting goals: rather than fixating only on major outcomes (qualifying, passing AM2, starting your own business), deliberately tracking and celebrating small daily or weekly wins keeps motivation high and builds momentum. The research showed that people often underestimate the power of small progress, but the data is unambiguous &mdash; progress matters more than recognition, bonuses, or even big goals.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How often should I review my progress towards my goals?',
    answer:
      'The frequency of progress reviews depends on the time horizon of the goal and the type of measure. For short-term goals (such as completing a specific qualification or building a certain number of contacts), weekly reviews are highly effective because they keep the goal front-of-mind and allow you to adjust quickly if you are off track. For medium-term goals (one to three years, such as starting a business or achieving a certain income level), monthly reviews are sufficient to track trends without becoming overwhelming. For long-term goals (five to ten years, such as career progression to senior roles), quarterly reviews work well. The key principle is that your review cycle should match the pace at which you can take corrective action. Daily tracking of lead measures (such as hours spent on a task) is powerful, but daily reviews of lag measures (such as income or qualifications achieved) can become demotivating because these outcomes change slowly. A balanced approach is to track lead measures daily or weekly, and review lag measures monthly or quarterly.',
  },
  {
    question: 'What should I do if I am consistently missing my targets?',
    answer:
      'Consistently missing targets is a signal that something needs to change, but it is not a reason to abandon your goals. First, review whether the target was realistic in the first place. If you set a goal to gain three new qualifications in six months while working full-time, the problem may not be your effort but the unrealistic timeline. Second, examine your lead measures: are you actually doing the activities that drive the outcome? If your goal is to increase your income but you are not sending quotes or marketing your services, the lag measure will not improve. Third, consider whether there are external factors beyond your control (economic downturn, family circumstances, health issues) that are affecting your progress. If so, adjust your targets to reflect the current reality rather than beating yourself up for circumstances outside your control. Finally, seek feedback from someone you trust &mdash; a mentor, colleague, or accountability partner &mdash; who can offer an objective perspective on what might be going wrong. Missing targets is not failure; it is data. Use it to refine your approach.',
  },
  {
    question: 'Is it demotivating to compare my progress to other electricians?',
    answer:
      'Comparison can be either motivating or demotivating depending on how you use it. Social comparison theory (developed by psychologist Leon Festinger in 1954) shows that people naturally compare themselves to others to evaluate their own abilities and progress. Upward comparison (comparing yourself to someone more advanced) can be motivating if it provides a clear role model and actionable steps to follow. For example, seeing a peer who qualified two years before you now running a successful business can inspire you and show what is possible. However, upward comparison can also be demotivating if the gap feels insurmountable or if you focus on what you lack rather than what you can learn. Downward comparison (comparing yourself to someone less advanced) can provide a confidence boost but may also lead to complacency. The healthiest approach is to compare yourself primarily to your past self: are you better than you were six months ago? Have you developed new skills, earned more, or built new relationships? This removes the distortion of comparing different people with different starting points, resources, and circumstances, and focuses you on what you can control &mdash; your own growth.',
  },
  {
    question: 'How do I handle progress plateaus where I feel stuck?',
    answer:
      'Plateaus are a normal and inevitable part of skill development and goal pursuit, but they can be psychologically challenging. Research by Anders Ericsson on deliberate practice shows that improvement is not linear &mdash; periods of rapid progress are often followed by plateaus where performance seems to stagnate despite continued effort. The plateau often occurs because you have automated a skill to a certain level and need to break through to the next level of complexity. To break through a plateau: (1) Identify the specific bottleneck &mdash; what exact skill or knowledge gap is holding you back? (2) Seek targeted feedback from someone more experienced who can spot what you cannot see yourself. (3) Deliberately practice the weak point in isolation rather than repeating the entire task. (4) Introduce variation &mdash; if you always wire circuits the same way, try a different method or a more complex scenario. (5) Take a strategic break &mdash; sometimes stepping away for a few days allows consolidation and you return with fresh perspective. (6) Reframe the plateau as evidence of progress, not stagnation &mdash; you have reached a level of competence that now requires more sophisticated development. Plateaus feel frustrating, but they are signs that you are approaching the edge of your current capability, which is exactly where growth happens.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is the BEST example of a lead measure for an electrician aiming to increase their annual income?',
    options: [
      'Total revenue earned at the end of the year',
      'The number of new client quotes sent per week',
      'Whether they achieved a 10% income increase by December',
      'The size of their bank balance at the end of each month',
    ],
    correctAnswer: 1,
    explanation:
      'The number of new client quotes sent per week is a lead measure because it is predictive (more quotes typically lead to more work and higher income), influenceable (you can directly control how many quotes you send), and measurable on a short cycle (weekly). The other options are all lag measures &mdash; they measure outcomes that have already occurred. Annual revenue, income increase percentage, and bank balance are all results, not drivers. Lead measures give you something actionable to focus on each week, whereas lag measures only tell you whether you succeeded or failed after the fact.',
  },
  {
    id: 2,
    question:
      'According to Peter Drucker, "what gets measured gets managed". What is the main reason that measuring progress is important for achieving goals?',
    options: [
      'Measurement creates external pressure from others who see your results',
      'Measurement makes you feel guilty if you do not achieve your targets',
      'Measurement provides clarity on whether your actions are working and allows you to adjust course if they are not',
      'Measurement ensures you never make mistakes',
    ],
    correctAnswer: 2,
    explanation:
      'The primary value of measurement is that it provides objective feedback on whether your actions are producing the desired results. Without measurement, you are operating blind &mdash; you may believe you are making progress when you are not, or you may be making more progress than you realise. Measurement allows you to identify what is working (so you can do more of it) and what is not working (so you can adjust or stop). It is not about guilt, external pressure, or perfection &mdash; it is about learning and course correction. The electrician who tracks the number of quotes sent and the conversion rate can see whether the problem is not sending enough quotes (low volume) or sending quotes that do not convert (poor quality or pricing). Without that data, they are guessing.',
  },
  {
    id: 3,
    question:
      'Teresa Amabile&rsquo;s research on the "progress principle" found that the single most motivating factor at work was:',
    options: [
      'Receiving public recognition for major achievements',
      'Experiencing small, incremental progress in meaningful work',
      'Earning financial bonuses for hitting targets',
      'Being assigned increasingly challenging tasks',
    ],
    correctAnswer: 1,
    explanation:
      'Teresa Amabile&rsquo;s research at Harvard Business School, based on analysis of nearly 12,000 daily diary entries from knowledge workers, found that the most significant driver of motivation, positive emotions, and performance was the experience of making progress &mdash; even small progress &mdash; in work that mattered to the individual. This progress principle was more powerful than recognition, bonuses, or challenge. For electricians, this has a practical implication: rather than waiting for major milestones (finishing your apprenticeship, passing AM2, starting a business) to feel motivated, deliberately track and celebrate small daily or weekly wins (completing a difficult task, learning a new skill, solving a problem). These small wins create a sense of momentum and achievement that fuels continued effort.',
  },
  {
    id: 4,
    question:
      'An electrician is tracking five different goals simultaneously: financial (increase income by 15%), qualification (complete 2391 inspection and testing), fitness (lose 10kg), business (gain 20 new clients), and skills (master three-phase fault finding). They feel overwhelmed and are making little progress on any goal. What is the most likely problem?',
    options: [
      'They are not working hard enough and need to increase their effort',
      'They lack the natural talent required to succeed in multiple areas',
      'They are spreading their focus too thin across too many goals, diluting their effectiveness',
      'Their goals are too easy and not challenging enough to drive motivation',
    ],
    correctAnswer: 2,
    explanation:
      'The problem is almost certainly diluted focus. Research on willpower and self-control (notably by Roy Baumeister) shows that self-regulation is a limited resource &mdash; the more goals you are actively pursuing, the less mental energy and willpower you have available for each one. Trying to make progress on five significant goals simultaneously often results in making minimal progress on all of them, which then creates a sense of failure and demotivation. A better approach is to prioritise ruthlessly: choose one or two primary goals to focus on intensively, and put the others on hold or reduce them to maintenance mode. Once the primary goals are achieved or have become habitual, bring another goal into active focus. This principle is supported by the concept of &ldquo;Wildly Important Goals&rdquo; from The 4 Disciplines of Execution &mdash; identify the one or two goals that matter most right now, and give them the majority of your effort and attention. Progress on fewer goals beats stagnation on many.',
  },
  {
    id: 5,
    question:
      'Which of the following is an example of celebrating a milestone in a way that reinforces future progress rather than undermining it?',
    options: [
      'After passing your AM2 assessment, you take a week off work and stop all study because you deserve a break',
      'After gaining your first 10 clients, you treat yourself to a nice meal and then set a new target of 25 clients within six months',
      'After achieving a financial target, you immediately spend all the money on a luxury purchase to reward yourself',
      'After completing a difficult project, you decide you have worked hard enough and do not need to set any new goals for a while',
    ],
    correctAnswer: 1,
    explanation:
      'The second option is the healthiest way to celebrate a milestone: acknowledge the achievement with a proportionate reward (a nice meal, a day out, a small purchase), and then set a new target that builds on the momentum. This approach balances recognition of progress with continued forward movement. The other options all involve either undermining the progress (spending all the money you worked to save), or losing momentum (taking extended breaks or stopping goal-setting entirely). Psychologically, the best celebrations are those that reinforce the identity and behaviour that led to the success. Celebrating passing AM2 with a meal with your mentor reinforces the importance of learning and relationships. Celebrating a financial milestone by investing in a new qualification reinforces the growth mindset. Celebrations should feel rewarding without sabotaging the habits that got you there.',
  },
  {
    id: 6,
    question:
      'An electrician feels demotivated because a peer who qualified at the same time is now earning significantly more and running a larger business. According to research on social comparison, what is the healthiest response?',
    options: [
      'Avoid all contact with the peer to eliminate the source of negative comparison',
      'Use the peer as a role model, identify what they are doing differently, and adapt useful strategies while accepting that everyone&rsquo;s path is different',
      'Decide that success is determined by luck and natural talent, so there is no point trying to improve',
      'Compete directly by trying to copy everything the peer does, even if it does not suit your own circumstances',
    ],
    correctAnswer: 1,
    explanation:
      'The healthiest approach to upward social comparison (comparing yourself to someone more advanced) is to use it as a learning opportunity rather than a source of shame or envy. Identify what the other person is doing that you are not &mdash; are they marketing more effectively? Taking on more complex projects? Building stronger client relationships? Investing in additional qualifications? Extract actionable insights that you can apply to your own situation, while also recognising that everyone starts from different circumstances, has different resources, and faces different challenges. The key is to shift from competitive comparison (&ldquo;they are better than me&rdquo;) to collaborative learning (&ldquo;what can I learn from their success?&rdquo;). At the same time, maintain perspective by comparing yourself primarily to your past self &mdash; are you better than you were a year ago? That is the comparison that matters most.',
  },
  {
    id: 7,
    question:
      'Anders Ericsson&rsquo;s research on deliberate practice shows that progress plateaus are common in skill development. What is the most effective way to break through a performance plateau?',
    options: [
      'Keep practising the same task in the same way and trust that improvement will eventually come',
      'Take a permanent break from the skill because the plateau shows you have reached your natural limit',
      'Identify the specific weak point, seek expert feedback, and deliberately practise that isolated element with full concentration',
      'Switch to a completely different skill to avoid frustration',
    ],
    correctAnswer: 2,
    explanation:
      'Anders Ericsson&rsquo;s research on expert performance shows that deliberate practice &mdash; focused, effortful practice on the specific weaknesses identified through feedback &mdash; is the key to breaking through plateaus. Repeating the same task in the same way leads to automated performance at your current level, not improvement. To break through, you must: (1) identify the exact bottleneck (e.g., not your overall fault-finding ability, but specifically interpreting insulation resistance readings on complex circuits); (2) seek feedback from someone more skilled who can diagnose what you are missing; (3) isolate and practise that specific element with full concentration; (4) gradually reintegrate it into the full task. Plateaus are not evidence of reaching your limit &mdash; they are evidence that you have automated your current level of skill and now need to push into the next level of complexity. This requires deliberate, uncomfortable practice, not mindless repetition.',
  },
  {
    id: 8,
    question:
      'Which of the following tracking methods is MOST effective for maintaining long-term motivation and providing a visual sense of progress?',
    options: [
      'Keeping all your goals and progress in your head without writing anything down',
      'Using a wall calendar with visual marks for each day you complete a key activity, creating an unbroken chain',
      'Writing goals once at the start of the year and not reviewing them again until December',
      'Tracking only the final outcome without measuring intermediate progress',
    ],
    correctAnswer: 1,
    explanation:
      'Visual tracking methods, such as Jerry Seinfeld&rsquo;s famous &ldquo;don&rsquo;t break the chain&rdquo; calendar technique, are highly effective for maintaining motivation and building habits. The simple act of marking a calendar each day you complete a key activity (studying, sending quotes, exercising) creates a visible chain of progress that becomes psychologically rewarding to maintain. The longer the chain, the more motivated you become not to break it. This method works because it provides immediate feedback (you can see today&rsquo;s progress), creates accountability (the blank spaces are visible), and builds identity (the chain of marks becomes evidence that you are the kind of person who does this work consistently). Contrast this with keeping goals in your head (no accountability or feedback), writing goals once and forgetting them (no regular review), or tracking only final outcomes (no sense of daily progress). The most effective tracking systems are visible, regular, and focused on the process (what you do each day) as well as the outcome.',
  },
];

export default function GSModule4Section1() {
  useSEO({
    title: 'Measuring Progress &amp; Celebrating Wins | Goal-Setting Module 4.1',
    description:
      'Lead vs lag measures, key metrics for electricians, tracking methods, psychology of progress, celebrating milestones, avoiding comparison trap, handling plateaus.',
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
            <Link to="../gs-module-4">
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
            <BarChart3 className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Measuring Progress &amp; Celebrating Wins
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Lead vs lag measures, key metrics for electricians, tracking methods, psychology of
            progress, celebrating milestones, comparison trap, and handling plateaus
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Lead measures</strong> are predictive and influenceable (quotes sent per
                week); <strong>lag measures</strong> are results (revenue earned)
              </li>
              <li>
                <strong>Peter Drucker:</strong> &ldquo;What gets measured gets managed&rdquo;
                &mdash; measurement provides clarity and enables course correction
              </li>
              <li>
                <strong>Teresa Amabile:</strong> Small daily progress is the most powerful
                motivator, more than bonuses or recognition
              </li>
              <li>
                <strong>Track both:</strong> Lead measures show the path, lag measures show the
                destination
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Without measurement, you are guessing:</strong> You may believe you are
                making progress when you are not, or miss progress you are actually making
              </li>
              <li>
                <strong>Progress drives motivation:</strong> Visible progress creates momentum and
                reinforces the habits that produce results
              </li>
              <li>
                <strong>Plateaus are normal:</strong> Periods of stagnation are signs you are
                approaching the edge of your current capability &mdash; growth happens here
              </li>
              <li>
                <strong>Celebrate intelligently:</strong> Rewards should reinforce the behaviours
                that led to success, not undermine them
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Distinguish between lead measures (predictive, influenceable) and lag measures (results, historical) and explain why both are necessary',
              'Identify key metrics to track for electricians across qualifications, financial health, business development, skills, and wellbeing',
              'Describe at least three practical tracking methods (wall calendar, weekly journal, monthly scorecard) and choose the right tool for different goals',
              'Explain Teresa Amabile&rsquo;s progress principle and apply it to maintain motivation through small wins',
              'Recognise the signs of progress plateaus and apply Anders Ericsson&rsquo;s deliberate practice principles to break through them',
              'Use social comparison constructively (learning from others) rather than destructively (envy or complacency)',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Lead vs Lag Measures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Lead vs Lag Measures &mdash; The Difference Between Path and Destination
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Peter Drucker, the father of modern management thinking, is often credited with the
                principle that &ldquo;what gets measured gets managed&rdquo;. The idea is simple but
                profound: if you do not measure something, you cannot improve it, because you have
                no feedback on whether your actions are working. However, not all measures are
                created equal. The distinction between lead measures and lag measures is critical to
                effective goal tracking, and many people fail to make progress because they focus
                exclusively on lag measures without tracking the lead measures that actually drive
                results.
              </p>

              <p>
                <strong>Lag measures</strong> are the results you are ultimately trying to achieve.
                They are called &ldquo;lag&rdquo; measures because they show what has already
                happened &mdash; they lag behind your actions. Examples for electricians include:
                total annual revenue, whether you passed your AM2 assessment, your NVQ completion
                status, the number of clients you have gained by the end of the year, or your bank
                balance at the end of the month. Lag measures are important because they tell you
                whether you succeeded or failed &mdash; they are the scoreboard. However, lag
                measures have a critical limitation: by the time you see them, it is too late to
                change them. You cannot go back and improve last month&rsquo;s revenue. You can only
                influence future revenue.
              </p>

              <p>
                <strong>Lead measures</strong>, by contrast, are predictive and influenceable. They
                measure the activities that drive the lag measures, and they can be acted upon in
                the present. Lead measures have two defining characteristics: (1) they are
                predictive &mdash; they measure something that will lead to achieving the goal; (2)
                they are influenceable &mdash; you can directly control them. For an electrician
                aiming to increase revenue (lag measure), examples of lead measures include: the
                number of client quotes sent per week, the number of new networking contacts made
                per month, the number of hours spent marketing your services, or the conversion rate
                of quotes to jobs. These are activities you can do this week that will predict
                future revenue. If you send 10 quotes this week and your conversion rate is 30%, you
                can predict approximately 3 new jobs. If that is not enough, you can send more
                quotes or improve your conversion rate.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Trade Example: Lead and Lag Measures for an Apprentice Electrician
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  <strong>Lag measure (goal):</strong> Pass Level 3 Diploma and AM2 assessment by
                  July 2026
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Lead measures (weekly actions that predict success):</strong>
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Number of hours spent revising technical content (target: 5 hours/week)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Number of past exam questions practised (target: 20 questions/week)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Number of practical tasks completed on site with supervisor feedback (target:
                      3/week)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Attendance at college (target: 100% &mdash; no missed sessions without valid
                      reason)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The apprentice cannot directly control whether they pass the assessment (lag), but
                  they can directly control the hours revised, questions practised, and feedback
                  sought (lead). These lead measures are both predictive (doing them increases the
                  likelihood of passing) and influenceable (the apprentice controls them every
                  week).
                </p>
              </div>

              <p>
                The power of lead measures is that they give you something concrete to do every day
                or week. Instead of fixating on a distant outcome (&ldquo;I need to pass my
                AM2&rdquo;), you focus on the process (&ldquo;this week I will complete 5 hours of
                revision and practise 20 exam questions&rdquo;). This shift from outcome to process
                reduces anxiety, builds momentum, and creates a sense of control. You may not be
                able to guarantee you will pass the exam, but you can guarantee you will do the work
                required to give yourself the best chance. This is the essence of lead measures:
                they turn abstract goals into daily habits.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Key Metrics for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Key Metrics for Electricians &mdash; What to Measure
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Choosing what to measure is as important as choosing to measure at all. If you track
                the wrong metrics, you will optimise for the wrong outcomes. For electricians, the
                key areas to measure fall into five categories: qualifications and professional
                development, financial health, business development, skills and competence, and
                health and wellbeing. Each category requires a mix of lead and lag measures to
                provide a complete picture.
              </p>

              <p>
                <strong>1. Qualifications and Professional Development</strong>
              </p>
              <p>
                Lag measures: qualifications achieved (Level 3 Diploma, AM2, 2391, 18th Edition),
                ECS card status (valid/expired), professional registrations (EngTech, IEng), CPD
                hours logged for the year. Lead measures: hours spent studying per week, number of
                training courses attended, number of technical articles or regulations updates read
                per month, number of on-the-job tasks completed under supervision as part of
                portfolio development. For apprentices, attendance rate at college and completion
                rate of assigned coursework are strong lead measures for qualification success.
              </p>

              <p>
                <strong>2. Financial Health</strong>
              </p>
              <p>
                Lag measures: gross annual income, net profit (for self-employed), average monthly
                take-home pay, total savings and emergency fund balance, debt level (if applicable),
                pension pot value. Lead measures: number of invoices sent per month, average value
                of each invoice, percentage of invoices paid on time (an indicator of client quality
                and your payment terms enforcement), number of new client quotes sent per week,
                conversion rate of quotes to jobs, daily rate or hourly rate charged (tracked over
                time to ensure it increases in line with skills and experience). For self-employed
                electricians, tracking expenses as a percentage of revenue is a useful lead measure
                for profitability &mdash; if expenses are creeping up as a proportion of income,
                profit will shrink even if revenue stays the same.
              </p>

              <p>
                <strong>3. Business Development (for self-employed or business owners)</strong>
              </p>
              <p>
                Lag measures: total number of active clients, number of repeat clients (a strong
                indicator of service quality), average job value, client retention rate, revenue
                from referrals as a percentage of total revenue. Lead measures: number of new
                contacts made per month (networking events, trade association meetings, online
                communities), number of follow-up calls or emails sent to past clients, number of
                customer reviews or testimonials collected, number of social media posts or website
                updates (if you are marketing digitally), number of hours spent on business
                development activities per week. These lead measures are predictive of future
                business growth but are often neglected because they do not produce immediate
                results.
              </p>

              <p>
                <strong>4. Skills and Competence</strong>
              </p>
              <p>
                Lag measures: range of work you are competent to undertake (domestic/commercial/
                industrial, installation/testing/design), complexity of projects completed (are you
                taking on more challenging work than a year ago?), error rate or callback rate (a
                measure of quality), time taken to complete standard tasks compared to benchmarks.
                Lead measures: number of new tasks or techniques attempted per month, number of
                hours spent on deliberate practice (focused practice on weak areas, not just
                repetition of tasks you can already do), number of times you sought feedback from a
                more experienced electrician, number of technical problems solved independently
                without needing help. These measures are harder to quantify than financial metrics,
                but they are essential for long-term career progression.
              </p>

              <p>
                <strong>5. Health and Wellbeing</strong>
              </p>
              <p>
                This category is often ignored by tradespeople, but poor health directly impacts
                your ability to work and earn. Lag measures: weight, resting heart rate, injury or
                illness days off work per year, stress or burnout level (self-rated on a scale).
                Lead measures: number of days per week you do physical activity, hours of sleep per
                night, number of meals that include vegetables, number of alcohol-free days per
                week, number of breaks taken during the working day. These may seem trivial, but
                they are strongly predictive of long-term health, energy levels, and career
                longevity. An electrician who tracks and improves these lead measures is investing
                in their future earning capacity.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Do Not Track Everything &mdash; Focus on What Matters
                </p>
                <p className="text-base text-white leading-relaxed">
                  The temptation is to track dozens of metrics across all five categories. Resist
                  this. Research on willpower and self-control shows that tracking too many things
                  dilutes your focus and becomes overwhelming. A better approach: choose 2&ndash;3
                  key metrics from the category that matters most to you right now, and track those
                  consistently. Once those metrics are on track and the tracking has become
                  habitual, add one more. Quality of tracking beats quantity of metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Tracking Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Practical Tracking Methods &mdash; How to Measure Progress
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing what to measure is only half the battle. The other half is choosing a
                tracking method that you will actually use. The best tracking system is the one you
                will stick to consistently, not the most sophisticated one. For most electricians,
                simple, low-tech methods (pen and paper, wall calendars) work better than complex
                spreadsheets or apps, because they are visible, require no technology, and take
                seconds to update. However, digital tools can be valuable if you are already
                comfortable with them and they integrate into your existing workflow.
              </p>

              <p>
                <strong>
                  1. Wall Calendar &mdash; The &ldquo;Don&rsquo;t Break the Chain&rdquo; Method
                </strong>
              </p>
              <p>
                This method, popularised by comedian Jerry Seinfeld, is one of the most effective
                habit-tracking systems ever devised despite its simplicity. Buy a large wall
                calendar (one page per month, with big date boxes). Choose one key activity that you
                want to do every day (or most days) &mdash; for example, &ldquo;spend 30 minutes
                studying BS 7671&rdquo;, &ldquo;send at least one client quote&rdquo;, or
                &ldquo;complete a physical workout&rdquo;. Every day you complete the activity, put
                a big X through that date on the calendar. After a few days, you will have a chain
                of Xs. Your only job is to not break the chain. The visual feedback is immediate and
                powerful: you can see at a glance whether you are building the habit or slipping.
                The longer the chain, the more motivated you become to maintain it. This method
                works brilliantly for lead measures (daily or weekly activities) but is less useful
                for lag measures (which change slowly and are not daily actions).
              </p>

              <p>
                <strong>2. Weekly Journal or Log</strong>
              </p>
              <p>
                A weekly journal is a simple notebook where you write a short entry at the end of
                each week summarising what you achieved, what you learned, and what you will focus
                on next week. The format can be as simple as: (1) What went well this week? (2) What
                did not go as planned? (3) What is the one priority for next week? This method takes
                5&ndash;10 minutes per week and provides a running record of progress that you can
                review monthly or quarterly. The act of writing forces reflection, which is itself a
                valuable learning process (see Section 2 of this module on reflective practice).
                Journals are particularly useful for tracking skills development and lessons learned
                from jobs, which are harder to quantify in a spreadsheet.
              </p>

              <p>
                <strong>3. Monthly Scorecard</strong>
              </p>
              <p>
                A monthly scorecard is a simple one-page summary of your key metrics, updated at the
                end of each month. It typically includes 5&ndash;10 key numbers: revenue for the
                month, number of quotes sent, number of jobs completed, hours worked, CPD hours
                logged, any qualifications progressed, and perhaps one or two health metrics
                (weight, days exercised). The scorecard shows trends over time: are your numbers
                improving, stable, or declining? This method is particularly useful for financial
                and business metrics. A basic spreadsheet works well, or you can use pen and paper
                if you prefer. The key is to update it consistently at the same time each month (for
                example, on the last Sunday of the month) and to review the trends every quarter.
              </p>

              <p>
                <strong>4. Quarterly Review</strong>
              </p>
              <p>
                A quarterly review is a more in-depth reflection session conducted every three
                months. This is where you step back and ask bigger questions: Are my goals still
                relevant, or have my priorities changed? Am I making progress at the rate I
                expected, or do I need to adjust my approach? What worked well this quarter, and
                what should I stop doing? What is the one major focus for the next quarter?
                Quarterly reviews are particularly valuable for long-term goals (career progression,
                business growth, major qualifications) where monthly tracking may not show enough
                change to be meaningful. Block out 1&ndash;2 hours every three months to sit down
                with your scorecards, journals, and calendars, and do this review properly. This is
                not wasted time &mdash; it is strategic thinking time that prevents you from
                drifting off course.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Recommended Tracking Stack for Electricians
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Daily habit tracking:</strong> Wall calendar with X-marks for one key
                      daily or weekly activity (study, fitness, client contact)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Weekly reflection:</strong> 5-minute journal entry on Friday afternoon
                      (what went well, what did not, priority for next week)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Monthly metrics:</strong> One-page scorecard with 5&ndash;10 key
                      numbers updated on the last Sunday of each month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Quarterly strategy review:</strong> 1&ndash;2 hour review session
                      every three months (January, April, July, October) to assess progress and
                      adjust direction
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This stack balances daily accountability (calendar) with short-cycle feedback
                  (weekly journal), medium-term tracking (monthly scorecard), and strategic
                  reflection (quarterly review). It is simple enough to maintain but comprehensive
                  enough to catch problems early.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Psychology of Progress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Psychology of Progress &mdash; Why Small Wins Matter
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Teresa Amabile, a professor at Harvard Business School, conducted one of the most
                comprehensive studies on workplace motivation and performance ever undertaken. She
                and her team analysed nearly 12,000 daily diary entries from 238 knowledge workers
                across seven companies, tracking their emotions, motivation levels, and work
                progress every day for months. The findings were striking and counterintuitive: the
                single most important factor for motivation, positive emotions, and high performance
                was not financial incentives, recognition, or challenging goals &mdash; it was the
                experience of making progress in meaningful work, even if the progress was small.
              </p>

              <p>
                Amabile called this the <strong>&ldquo;progress principle&rdquo;</strong>. On days
                when workers made even small steps forward &mdash; completing a task, solving a
                problem, reaching a minor milestone &mdash; their motivation, emotions, and
                performance were significantly higher than on days when they made no progress or
                encountered setbacks. Conversely, setbacks and lack of progress had a
                disproportionately negative effect on motivation and mood. The implication is
                profound: if you want to stay motivated and perform well, you must create and track
                small, regular wins rather than fixating only on distant, major goals.
              </p>

              <p>
                For electricians, this has a practical application. Instead of setting a single
                large goal (&ldquo;qualify as an Approved Electrician by July 2026&rdquo;) and then
                experiencing no sense of progress for months, break the goal down into smaller
                milestones that you can achieve and celebrate weekly or monthly: complete Module 1
                of the Level 3 Diploma, pass the first mock exam, complete 20 hours of supervised
                practical work, master conduit bending to the required standard, complete the online
                safety modules. Each of these is a meaningful step towards the larger goal, and each
                provides a moment of progress that reinforces your motivation and identity as
                someone who is moving forward.
              </p>

              <p>
                The progress principle also explains why tracking is so motivating. When you mark an
                X on your wall calendar, write a journal entry summarising this week&rsquo;s
                achievements, or update your monthly scorecard with improved numbers, you are
                creating a tangible record of progress. This visible evidence of forward movement
                triggers a psychological reward &mdash; a sense of accomplishment and momentum
                &mdash; that fuels continued effort. Without tracking, progress is invisible and
                easily forgotten, which leads to the demoralising feeling that &ldquo;nothing is
                changing&rdquo; even when you are actually making steady progress.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Progress vs Perfection &mdash; The Motivational Trade-Off
                </p>
                <p className="text-base text-white leading-relaxed">
                  Perfectionism is the enemy of progress. Research shows that perfectionists often
                  achieve less than non-perfectionists because they set impossibly high standards,
                  become paralysed by fear of failure, and give up when they fall short. The
                  progress principle suggests a better approach: aim for consistent, incremental
                  improvement (progress) rather than flawless execution (perfection). An apprentice
                  who completes 80% of their coursework to a good standard every week will
                  outperform an apprentice who aims for 100% perfect work but ends up
                  procrastinating and submitting nothing. Progress compounds. Perfection stalls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Celebrating Milestones */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Celebrating Milestones Without Undermining Progress
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Celebrating milestones is an important part of maintaining motivation and
                reinforcing the identity and behaviours that led to success. However, not all
                celebrations are created equal. Some celebrations reinforce progress; others
                undermine it. The difference lies in whether the celebration is proportionate to the
                achievement and whether it reinforces or contradicts the habits that produced the
                success.
              </p>

              <p>
                A proportionate celebration is one that acknowledges the achievement without
                sabotaging the broader goal. For example, after passing your AM2 assessment (a
                significant milestone), celebrating with a nice meal with family or friends, a
                weekend away, or a modest purchase (new tools, a course you have wanted to take) is
                proportionate. These celebrations mark the achievement, provide a psychological
                reward, and then allow you to refocus on the next goal. In contrast, taking an
                extended break from all study, spending a large amount of money you were saving for
                a business investment, or deciding you have worked hard enough and do not need any
                more goals for a while are disproportionate celebrations that undermine the momentum
                you have built.
              </p>

              <p>
                The best celebrations are those that reinforce the behaviours and identity that led
                to the success. If you achieved a financial goal by carefully managing expenses and
                investing in your skills, celebrate by investing in another qualification or
                upgrading your tools &mdash; this reinforces the growth mindset and the behaviours
                that created the success. If you passed a difficult exam through consistent study,
                celebrate by sharing your success with your mentor or study group &mdash; this
                reinforces the importance of learning and relationships. Celebrations should feel
                rewarding without creating new problems or reversing the progress you have made.
              </p>

              <p>
                It is also important to recognise that celebrating too early can be demotivating.
                Research in psychology shows that announcing a goal publicly before you have
                achieved it can create a premature sense of accomplishment that reduces motivation
                to do the actual work. This is known as &ldquo;social reality&rdquo; &mdash; when
                others congratulate you for a goal you have announced, your brain experiences a
                reward as if you had already achieved it, which reduces the drive to follow through.
                The implication is that you should celebrate actions taken and milestones reached,
                not intentions or plans. Celebrate passing Module 1, not enrolling in the course.
                Celebrate sending 50 client quotes, not deciding to start marketing your business.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Examples of Progress-Reinforcing Celebrations
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>After completing your Level 3 Diploma:</strong> Book a weekend course
                      in a specialist area you are interested in (e.g., solar PV, EV charging)
                      &mdash; celebrates learning with more learning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>After gaining your first 10 self-employed clients:</strong> Treat
                      yourself and a mentor to a nice meal and use it as an opportunity to discuss
                      your next business goals &mdash; celebrates success with gratitude and forward
                      planning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>After achieving a financial savings target:</strong> Invest half in a
                      pension or business fund and spend the other half on a meaningful experience
                      (holiday, event) &mdash; balances present reward with future security
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>
                        After maintaining a daily study habit for 100 consecutive days:
                      </strong>
                      Buy a high-quality tool or piece of equipment you have wanted &mdash;
                      reinforces the identity of someone who invests in their craft
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Comparison Trap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Avoiding the Comparison Trap
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Social comparison &mdash; evaluating yourself relative to others &mdash; is a
                natural and often unconscious human behaviour. Psychologist Leon Festinger
                introduced social comparison theory in 1954, arguing that people determine their own
                social and personal worth based on how they stack up against others. In the trades,
                comparison is everywhere: apprentices compare their progress to peers in their
                cohort, qualified electricians compare their earnings and client base to others in
                their area, self-employed electricians compare their business growth to competitors.
                The question is not whether you will compare yourself to others &mdash; you will
                &mdash; but whether you do so in a way that motivates you or demoralises you.
              </p>

              <p>
                <strong>Upward comparison</strong> is comparing yourself to someone more advanced or
                successful than you. This can be highly motivating if you use it as a learning
                opportunity: What are they doing that I am not? What skills have they developed?
                What habits or strategies are they using? How did they get from where I am now to
                where they are? An apprentice who sees a qualified electrician running a successful
                business can use that as a role model and a roadmap. However, upward comparison can
                also be demotivating if you focus on the gap rather than the path. If you look at
                the successful electrician and think &ldquo;I will never achieve that&rdquo; or
                &ldquo;they are just naturally talented&rdquo;, you miss the learning opportunity
                and create a sense of inadequacy.
              </p>

              <p>
                <strong>Downward comparison</strong> is comparing yourself to someone less advanced
                or successful. This can provide a confidence boost (&ldquo;I am doing better than
                them&rdquo;), but it can also lead to complacency. If you are the best electrician
                in a weak team, you may feel satisfied without realising that your skills would be
                average in a stronger environment. Downward comparison can be useful as a reminder
                of how far you have come (&ldquo;I used to struggle with that, and now I find it
                easy&rdquo;), but it should not be your primary benchmark.
              </p>

              <p>
                The healthiest approach is to compare yourself primarily to{' '}
                <strong>your past self</strong>. Are you better than you were six months ago? Have
                you developed new skills, earned more, built stronger relationships, or improved
                your health? This type of comparison removes the distortion of comparing different
                people with different starting points, resources, and circumstances. It focuses you
                on what you can control &mdash; your own growth &mdash; rather than what you cannot
                control &mdash; other people&rsquo;s advantages or disadvantages. Track your own
                progress over time, and you will find that the most meaningful competition is with
                the person you were yesterday.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Social Media Distortion
                </p>
                <p className="text-base text-white leading-relaxed">
                  Social media platforms amplify the comparison trap by showing curated highlight
                  reels of other people&rsquo;s success while hiding the struggle, failure, and
                  mundane reality. An electrician scrolling through Instagram sees peers posting
                  photos of completed projects, new vans, certifications, and business wins &mdash;
                  but not the failed quotes, the financial stress, the long hours, or the mistakes.
                  This creates a distorted comparison where you judge your behind-the-scenes reality
                  against someone else&rsquo;s public performance. The antidote is to either limit
                  social media consumption (particularly if you find it demotivating) or to
                  consciously remind yourself that you are seeing a curated version of reality, not
                  the full picture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Handling Plateaus */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Handling Plateaus &mdash; When Progress Seems to Stall
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A plateau is a period where your performance or progress appears to stagnate despite
                continued effort. You are putting in the hours, doing the work, but the results are
                not improving. Plateaus are frustrating and psychologically challenging because they
                violate the expectation that effort should produce visible progress. However,
                research by Anders Ericsson on deliberate practice and expert performance shows that
                plateaus are not just normal &mdash; they are inevitable and even necessary stages
                in skill development.
              </p>

              <p>
                Plateaus occur because you have automated a skill or behaviour to a certain level of
                competence. Your brain has created efficient neural pathways for performing the
                task, which allows you to do it with less conscious effort. This is good &mdash;
                automation frees up mental resources for other tasks. However, it also means that
                simply repeating the task in the same way will not lead to further improvement. You
                have optimised for your current level of complexity, and to improve further, you
                need to increase the challenge or address a specific weakness that is holding you
                back.
              </p>

              <p>
                Ericsson&rsquo;s research on deliberate practice offers a roadmap for breaking
                through plateaus. Deliberate practice is not the same as mindless repetition or
                &ldquo;putting in the hours&rdquo;. It is focused, effortful practice on the
                specific skills you are weakest at, guided by feedback from someone more skilled,
                and designed to push you just beyond your current capability. To break through a
                plateau: (1) Identify the exact bottleneck &mdash; what specific skill or knowledge
                gap is preventing you from reaching the next level? (2) Seek expert feedback &mdash;
                often you cannot see your own weaknesses, so you need an external perspective. (3)
                Isolate and practise the weak point &mdash; do not just repeat the entire task;
                focus intensely on the element you struggle with. (4) Introduce variation &mdash; if
                you always wire circuits the same way, try a different method or a more complex
                scenario. (5) Increase the difficulty &mdash; once a task feels easy, it is no
                longer producing growth; you need a harder challenge.
              </p>

              <p>
                Plateaus can also be psychological rather than skill-based. You may be making
                progress, but it is not visible in the metrics you are tracking, which creates the
                illusion of stagnation. For example, an apprentice may feel they are not improving
                at fault finding, but in reality they are getting faster and more systematic &mdash;
                it is just that the improvement is gradual and hard to notice day-to-day. In these
                cases, reviewing your past performance (looking back at your scores, times, or work
                quality from six months ago) can reveal progress that is invisible in the present
                moment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Strategies for Breaking Through Plateaus
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Get specific feedback:</strong> Ask a more experienced electrician to
                      observe your work and identify exactly what you are doing well and what needs
                      improvement. General feedback (&ldquo;you are doing fine&rdquo;) is not
                      useful; specific feedback (&ldquo;your fault-finding process is sound, but you
                      are not checking the obvious things first&rdquo;) is actionable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Deliberately practise the weakness:</strong> If you struggle with
                      conduit bending, do not just bend conduit as part of a larger job &mdash;
                      spend dedicated time practising bends in isolation until the weakness becomes
                      a strength.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Increase the challenge:</strong> If installation work feels easy, take
                      on testing and inspection. If domestic work is comfortable, try commercial or
                      industrial projects. Growth happens at the edge of your current capability.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Take a strategic break:</strong> Sometimes stepping away for a few
                      days allows your brain to consolidate learning. You may return with fresh
                      perspective and improved performance without conscious practice.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reframe the plateau:</strong> Instead of seeing it as failure,
                      recognise it as evidence that you have reached a level of competence that now
                      requires more sophisticated development. Plateaus are not dead ends; they are
                      launchpads to the next level.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the importance of measuring progress effectively and
                the psychological principles that underpin motivation and growth. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Lead measures</strong> (predictive, influenceable) and{' '}
                    <strong>lag measures</strong>
                    (results, historical) are both necessary. Lead measures show the path; lag
                    measures show the destination.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Track what matters:</strong> Focus on 2&ndash;3 key metrics in the area
                    that is most important to you right now, rather than trying to track everything.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Simple tracking systems work best:</strong> Wall calendars, weekly
                    journals, and monthly scorecards are more effective than complex spreadsheets
                    because they are visible, quick to update, and require no technology.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Small wins drive motivation:</strong> Teresa Amabile&rsquo;s research
                    shows that daily or weekly progress is more motivating than distant goals or
                    external recognition.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Celebrate intelligently:</strong> Rewards should be proportionate and
                    should reinforce the behaviours and identity that led to success, not undermine
                    them.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Compare yourself to your past self:</strong> Social comparison to others
                    can be useful for learning, but the healthiest benchmark is your own progress
                    over time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Plateaus are normal and necessary:</strong> Break through them with
                    deliberate practice &mdash; identify the weakness, seek expert feedback, isolate
                    and practise that element, and increase the challenge.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore
                  reflective practice and how to systematically learn from experience using models
                  such as Kolb&rsquo;s Experiential Learning Cycle, Schon&rsquo;s
                  reflection-in-action and reflection-on-action, and Gibbs&rsquo; Reflective Cycle.
                  Reflection turns experience into learning and accelerates skill development.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4-section-2">
              Next: Reflective Practice &amp; Learning from Experience
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
