import { ArrowLeft, HardHat, CheckCircle } from 'lucide-react';
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
    id: 'gs-3-2-check1',
    question:
      'An electrician wants to establish a morning routine but struggles with early starts because every job has a different start time. According to habit formation principles, what is the most effective approach?',
    options: [
      'Set a fixed 5:30am alarm every day regardless of the job start time',
      'Abandon the idea of a morning routine because the schedule is too variable',
      'Anchor the routine to the act of waking up (whenever that is) rather than to a specific clock time',
      'Only maintain the routine on days when the job starts before 7am',
    ],
    correctIndex: 2,
    explanation:
      'The most effective approach is to anchor the routine to the behaviour of waking up rather than a fixed time. The routine becomes: &ldquo;After I wake up, I will [check weather, review job sheet, prepare van checklist]&rdquo;. This works whether you wake at 5am or 7am. The consistency is in the sequence of behaviours, not the clock time. This aligns with BJ Fogg&rsquo;s anchoring principle and makes the habit resilient to schedule variation. For electricians with variable start times, behaviour-anchored habits are far more sustainable than time-anchored habits.',
  },
  {
    id: 'gs-3-2-check2',
    question:
      'An electrician has lost three expensive tools in the past six months due to leaving them on site. What is the most effective habit-based solution to this problem?',
    options: [
      'Buy cheaper tools so the losses are less painful',
      'Implement an end-of-job tool count habit anchored to packing up, using a laminated checklist',
      'Try to remember to check for tools before leaving each site',
      'Only use tools that are brightly coloured and easy to spot',
    ],
    correctIndex: 1,
    explanation:
      'The most effective solution is a systematic end-of-job tool count habit. The habit loop: Cue (packing up to leave the site), Routine (count tools against a laminated checklist), Reward (immediate satisfaction of a complete set plus long-term saving of thousands of pounds in replacement costs). &ldquo;Trying to remember&rdquo; is not a system &mdash; it is willpower-dependent and will fail under time pressure or fatigue. The laminated checklist makes the behaviour easy (satisfying the Fogg Ability criterion) and the end-of-job anchor makes it obvious (satisfying the Clear &ldquo;make it obvious&rdquo; law). This is a classic example of replacing willpower with systems.',
  },
  {
    id: 'gs-3-2-check3',
    question:
      'According to research on habit formation and professional development, what is the minimum effective daily study time for an electrician preparing for a qualification exam?',
    options: [
      'At least two hours per day, otherwise it is not worth doing',
      'As little as 10&ndash;15 minutes per day, provided it is consistent',
      'Study time does not matter; only the number of practice questions completed matters',
      'At least one hour per day on weekdays and three hours per day on weekends',
    ],
    correctIndex: 1,
    explanation:
      'Research consistently shows that consistency beats intensity for long-term learning and habit formation. A 15-minute daily study habit, maintained for three months, results in 22.5 hours of study and establishes a durable automatic behaviour. A two-hour weekend binge study session, maintained inconsistently, results in similar hours but does not build automaticity and is far more vulnerable to disruption. BJ Fogg&rsquo;s &ldquo;make it tiny&rdquo; principle applies: start with a study habit so small that you can maintain it even on your worst day (one page of BS 7671, one regulation, one practice question). Once the tiny habit is automatic, expand it. This approach leverages the compound effect and avoids the common trap of unsustainable over-ambition.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I work 10&ndash;12 hour days on site. How am I supposed to find time for professional habits like study or admin?',
    answer:
      'The mistake is thinking you need to find large blocks of time. Professional habits work best when they are tiny and integrated into transitions you already make every day. Five minutes after you park your van in the morning to review the job. Two minutes at lunch to update your job log. Five minutes at the end of the day to photograph the completed work and file the invoice. Fifteen minutes before bed to read one page of regulations. These micro-habits require almost no time but compound into transformational results over months. The electrician who studies for 15 minutes every morning for a year completes 91 hours of study &mdash; equivalent to more than two full working weeks. The electrician who waits for &ldquo;the right time&rdquo; to start a serious study programme completes zero hours.',
  },
  {
    question:
      'I&rsquo;ve tried keeping my van organised but it always ends up a mess again within a week. What am I doing wrong?',
    answer:
      'You are treating van organisation as a one-time event rather than a daily habit. The solution is an end-of-day habit: &ldquo;After I park the van at home, I will spend five minutes returning tools to their designated locations and removing rubbish.&rdquo; The Cue is parking (unavoidable and consistent). The Routine is five minutes of organisation. The Reward is starting the next day with a tidy van and the professional confidence that brings. This daily habit prevents the entropy that requires a major reorganisation every few weeks. It is the same principle as washing up after dinner rather than letting dishes pile up for a week &mdash; small daily maintenance is easier than periodic deep cleaning.',
  },
  {
    question:
      'How do I maintain healthy eating habits when I&rsquo;m working on different sites every day?',
    answer:
      'The key is preparation the night before, which becomes a habit itself. &ldquo;After I finish dinner, I will prepare tomorrow&rsquo;s lunch and pack it in the fridge.&rdquo; This removes the morning decision-making (when willpower is needed for other things) and prevents the default of meal deals or fast food. For hydration, the habit is: &ldquo;After I park the van at the first job, I will fill my water bottle and place it within arm&rsquo;s reach.&rdquo; The environmental cue (visible water bottle) prompts regular drinking throughout the day. These are small systems that do not require willpower once established, making healthy choices the default rather than the exception.',
  },
  {
    question:
      'I know I should be doing CPD but I can never motivate myself to engage with it. How do I build a CPD habit?',
    answer:
      'The problem is not motivation &mdash; it is that &ldquo;doing CPD&rdquo; is too vague and therefore too difficult (low ability in the B=MAP model). Make it specific and tiny. Examples: &ldquo;After I start the van in the morning, I will listen to one electrician podcast during my commute.&rdquo; &ldquo;After I pour my first coffee, I will read one page of BS 7671.&rdquo; &ldquo;After I finish my last job on Friday, I will watch one 10-minute CPD video before heading home.&rdquo; These habits are tiny (low willpower requirement), anchored to existing behaviours (reliable prompts), and accumulate significant learning over time. Fifteen minutes of podcast per day = 91 hours per year. One page of regulations per day = the entire BS 7671 book read cover-to-cover in less than a year.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'An electrician establishes a morning routine that includes a van check, job review, and weather check. According to research on keystone habits, what additional benefit is this routine most likely to produce beyond the immediate task completion?',
    options: [
      'No additional benefits &mdash; the routine only achieves what it explicitly includes',
      'A cascade of other positive behaviours throughout the day, such as better time management, fewer mistakes, and reduced stress',
      'Increased earnings due to working faster',
      'Better relationships with clients due to arriving in a clean van',
    ],
    correctAnswer: 1,
    explanation:
      'Morning routines are classic keystone habits &mdash; they trigger a chain reaction of positive behaviours beyond the routine itself. Charles Duhigg&rsquo;s research shows that keystone habits create a sense of momentum and control that carries through the entire day. An electrician who starts the day with a structured routine is more likely to maintain focus, manage time effectively, communicate professionally, and avoid errors &mdash; all without additional willpower. The routine sets the tone. This is why elite performers in every field (athletes, executives, tradespeople) prioritise morning routines: the return on investment is disproportionately high.',
  },
  {
    id: 2,
    question:
      'Which of the following tool management habits demonstrates the best application of the Four Laws of Behavior Change (obvious, attractive, easy, satisfying)?',
    options: [
      'Keeping a mental note of which tools need replacing and buying them when convenient',
      'Creating a colour-coded shadow board in the van, doing a 60-second tool check at the end of every job, and ticking off the day on a visible tracker',
      'Buying the most expensive tools available so you are motivated to look after them',
      'Conducting a full tool inventory and calibration check every Sunday evening',
    ],
    correctAnswer: 1,
    explanation:
      'The shadow board system applies all four laws: (1) Obvious &mdash; the shadow board makes missing tools immediately visible; (2) Attractive &mdash; the visual organisation is satisfying and professional; (3) Easy &mdash; the 60-second check is faster than searching for a lost tool later; (4) Satisfying &mdash; ticking off the day on a tracker provides immediate positive feedback. The Sunday inventory system violates &ldquo;make it easy&rdquo; (too time-consuming and infrequent to become automatic). Keeping a mental note violates &ldquo;make it obvious&rdquo; (relies on memory, which is unreliable). The shadow board approach is a perfect example of designing a system that makes good behaviour the default.',
  },
  {
    id: 3,
    question:
      'An electrician wants to build a habit of photographing every job for records but keeps forgetting. According to BJ Fogg&rsquo;s Behavior Model (B=MAP), which element is most likely missing?',
    options: [
      'Motivation &mdash; they do not really want to photograph jobs',
      'Ability &mdash; taking photographs is too difficult',
      'Prompt &mdash; there is no reliable cue triggering the behaviour',
      'Reward &mdash; there is no immediate benefit to taking photographs',
    ],
    correctAnswer: 2,
    explanation:
      'The most likely missing element is the Prompt. The electrician almost certainly has motivation (they know it is important for records and disputes) and ability (taking a photo takes 10 seconds). But without a reliable cue, the behaviour does not happen. The solution: anchor the photography habit to an existing behaviour that happens on every job. Example: &ldquo;After I complete the final connection, before I turn the power back on, I will take three photographs (overview, close-up, completed work).&rdquo; The prompt (completing final connection) is reliable and unavoidable. This diagnosis (identifying the missing MAP element) is how you troubleshoot failed habits systematically.',
  },
  {
    id: 4,
    question:
      'According to research on habit formation and health, what is the primary reason electricians should establish a daily hydration habit?',
    options: [
      'Dehydration reduces cognitive function, reaction time, and decision-making ability, increasing the risk of errors and accidents on site',
      'Drinking water makes you feel full and reduces the temptation to snack',
      'Proper hydration improves your appearance and professionalism',
      'Water is cheaper than other drinks and saves money',
    ],
    correctAnswer: 0,
    explanation:
      'The primary reason is safety and performance. Research shows that even mild dehydration (as little as 2% body water loss) significantly impairs cognitive function, reaction time, and decision-making &mdash; all critical for electrical work where errors can be fatal. A study by the University of East London found that dehydrated drivers made the same number of errors as drivers at the legal drink-drive limit. For electricians working in hot environments or physically demanding conditions, dehydration is a serious occupational risk. The habit: &ldquo;After I park the van at the job, I will fill my water bottle and place it within reach. I will take three sips every time I change task.&rdquo; This simple habit protects both safety and performance.',
  },
  {
    id: 5,
    question:
      'An electrician struggles to maintain an end-of-day admin habit (updating job notes, filing invoices) because they are exhausted by the time they finish work. What is the best habit redesign strategy?',
    options: [
      'Push through the tiredness using willpower and discipline',
      'Move the admin habit to a time of day when willpower is higher, such as first thing in the morning or immediately after the first job',
      'Hire a bookkeeper to do all admin so the habit is no longer necessary',
      'Reduce the amount of admin by doing it only once per week',
    ],
    correctAnswer: 1,
    explanation:
      'Moving the habit to a time when willpower is higher is the most effective strategy. Roy Baumeister&rsquo;s ego depletion research shows that willpower is a finite resource that depletes throughout the day. Asking your exhausted 6pm self to do admin that your fresh 9am self could do in half the time is setting yourself up for failure. Redesigned habit: &ldquo;After I complete the first job of the day, before I drive to the second job, I will spend five minutes updating yesterday&rsquo;s job notes and filing yesterday&rsquo;s invoice.&rdquo; This leverages high morning willpower and prevents the end-of-day backlog. It is a system design solution, not a willpower solution.',
  },
  {
    id: 6,
    question:
      'Which of the following daily CPD habits demonstrates the best application of the &ldquo;make it tiny&rdquo; principle from BJ Fogg&rsquo;s work?',
    options: [
      'Attend a full-day seminar on the latest BS 7671 amendments every quarter',
      'Read one page of BS 7671 every morning after pouring your first coffee',
      'Watch a two-hour webinar on advanced testing techniques once per month',
      'Complete the entire 2391 qualification course in a six-month intensive programme',
    ],
    correctAnswer: 1,
    explanation:
      'Reading one page of BS 7671 every morning is the perfect tiny habit: it takes less than two minutes, requires minimal willpower, can be maintained even on the worst days, and compounds into reading the entire regulation book (approximately 250 pages) in less than a year. The other options are all valuable learning activities, but they are not tiny habits &mdash; they are intensive learning events that require high motivation and significant time commitment. Intensive events are important for deep learning, but they do not build automaticity. The tiny daily habit builds both knowledge and a durable learning routine that will serve you for your entire career.',
  },
  {
    id: 7,
    question:
      'An electrician wants to build a habit of stretching to prevent back and knee problems but struggles to remember. What is the most effective prompt design?',
    options: [
      'Set a phone alarm for the same time every day',
      'Anchor the stretching routine to an existing daily behaviour, such as &ldquo;After I lock the van at the end of the day, I will do three stretches before walking to the house&rdquo;',
      'Put a note on the bathroom mirror saying &ldquo;Remember to stretch&rdquo;',
      'Rely on feeling stiff as a reminder to stretch',
    ],
    correctAnswer: 1,
    explanation:
      'Anchoring the habit to an existing behaviour (locking the van) is more reliable than time-based alarms (which can be ignored or dismissed) or passive reminders (which become invisible through habituation). The behaviour anchor is unavoidable and consistent &mdash; you always lock the van at the end of the day. The stretching routine becomes part of the transition from work mode to home mode. This is a direct application of James Clear&rsquo;s habit stacking and BJ Fogg&rsquo;s anchoring principle. After 66 days, you will feel a psychological prompt to stretch whenever you lock the van, and the behaviour will feel incomplete without it.',
  },
  {
    id: 8,
    question:
      'According to the research on habit formation and professional development, which statement about building multiple habits simultaneously is most accurate?',
    options: [
      'You can build as many habits as you want simultaneously if you are sufficiently motivated',
      'You should focus on one habit at a time, establish it fully (66+ days), then stack a second habit onto it',
      'Building habits in pairs (e.g., morning routine + evening routine) is more effective than building them one at a time',
      'Habit formation speed is unaffected by the number of habits you are working on',
    ],
    correctAnswer: 1,
    explanation:
      'The research and expert consensus (James Clear, BJ Fogg, Charles Duhigg) strongly favour building one habit at a time. Each new habit requires cognitive load and willpower during the formation phase. Trying to establish multiple habits simultaneously overloads your limited willpower and increases the likelihood of total failure. The most effective approach: identify one keystone habit (such as a morning routine), commit to 66+ days of consistency, then stack additional habits onto the established foundation. This sequential approach may feel slower, but it is far more likely to result in durable, automatic behaviours than the common mistake of trying to overhaul your entire life simultaneously.',
  },
];

export default function GSModule3Section2() {
  useSEO({
    title: 'Building Professional Habits on Site | Goal Setting & Growth Module 3.2',
    description:
      'Morning routines, tool management, safety habits, admin discipline, CPD habits, and health habits for electricians.',
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
            <Link to="../gs-module-3">
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
            <HardHat className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Professional Habits on Site
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Morning routines, tool management systems, safety habits, admin discipline, CPD
            integration, and health habits for electricians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Morning routines</strong> are keystone habits that cascade into better
                performance all day
              </li>
              <li>
                <strong>Tool management</strong> prevents costly losses and unprofessional delays
              </li>
              <li>
                <strong>Safety habits</strong> protect your life and eliminate decision fatigue on
                critical tasks
              </li>
              <li>
                <strong>Admin habits</strong> prevent cash flow problems and weekend stress
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Professional reputation:</strong> Consistent habits create a reputation for
                reliability that wins repeat work
              </li>
              <li>
                <strong>Financial stability:</strong> Admin habits prevent bad debts and cash flow
                crises
              </li>
              <li>
                <strong>Career longevity:</strong> Health and safety habits prevent injuries that
                end careers
              </li>
              <li>
                <strong>Continuous improvement:</strong> Daily CPD habits compound into expertise
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Design and implement an effective morning routine tailored to variable electrician schedules',
              'Create a tool management system using shadow boards, end-of-day counts, and calibration schedules',
              'Build automatic safety habits for PPE, isolation verification, and risk assessment',
              'Establish admin habits that prevent bad debts and reduce weekend catch-up work',
              'Integrate daily CPD habits into existing routines without requiring additional time blocks',
              'Develop health habits (hydration, nutrition, movement, sleep) that sustain long-term career performance',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Morning Routines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Power of a Morning Routine
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A morning routine is the single most valuable keystone habit for electricians.
                Charles Duhigg&rsquo;s research shows that keystone habits create a cascade of
                positive behaviours throughout the day. An electrician who starts with a structured
                morning routine is significantly more likely to arrive on time, bring the correct
                tools, work efficiently, communicate professionally, and complete admin tasks
                &mdash; all without requiring additional willpower. The routine sets the standard
                for the day.
              </p>

              <p>
                The challenge for electricians is that every job has a different start time. The
                solution is to anchor the routine to the behaviour of waking up rather than a fixed
                clock time. Your routine becomes: &ldquo;After I wake up [whenever that is], I will:
                check the weather, review today&rsquo;s job sheet, prepare my van checklist, eat a
                proper breakfast, and arrive 10 minutes early.&rdquo; The consistency is in the
                sequence, not the time. This makes the habit resilient to schedule variation.
              </p>

              <p>
                A well-designed morning routine should take 20&ndash;40 minutes and should feel like
                putting on armour before battle. You are deliberately shifting from sleep mode to
                professional mode. The routine creates a psychological boundary between home and
                work, which is especially important for self-employed electricians who may not have
                the natural transition of commuting to an office. By the time you arrive on site,
                you are fully present, prepared, and focused.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Example Morning Routine for a 7am Start
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>5:30am &mdash; Wake up.</strong> No snooze button. Immediate action
                      prevents decision fatigue.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>5:35am &mdash; Hydrate.</strong> Drink a full glass of water to
                      rehydrate after sleep.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>5:40am &mdash; Review job sheet.</strong> Read client details, scope
                      of work, address, access notes. Visualise the job.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>5:45am &mdash; Check weather.</strong> Affects clothing, travel time,
                      and outdoor work planning.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>5:50am &mdash; Van check.</strong> Fuel, tools, materials, test
                      instruments, PPE. Use a laminated checklist.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>6:00am &mdash; Breakfast.</strong> Proper fuel, not a grab-and-go
                      snack.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>6:20am &mdash; Depart.</strong> Arrive 10 minutes early, never on time
                      or late.
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This routine takes 50 minutes from wake-up to departure. It eliminates morning
                  chaos, decision fatigue, and the &ldquo;forgotten tool&rdquo; scenario. After 66
                  days, it becomes automatic &mdash; you will feel psychologically uncomfortable if
                  you skip any step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Tool Management Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Tool Management Habits
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Losing tools is not just expensive &mdash; it destroys professional credibility and
                creates cascading delays. A £600 multifunction tester left on site means you cannot
                complete the next job, which means a rescheduling nightmare, a frustrated client,
                and lost revenue. Tool management must be a non-negotiable automatic habit, not
                something you &ldquo;try to remember&rdquo;.
              </p>

              <p>
                The most effective system is a <strong>shadow board</strong> in your van. Every tool
                has a designated location, marked with an outline or label. When a tool is missing,
                the empty space is immediately obvious. Combine this with an{' '}
                <strong>end-of-day tool count habit</strong>: &ldquo;After I pack up the last tool
                from the job, before I leave the site, I will count tools against my laminated
                checklist.&rdquo; The Cue is packing up (unavoidable). The Routine is a 60-second
                count. The Reward is never losing a tool and never delaying the next job.
              </p>

              <p>
                Calibration is a separate but equally critical habit. Test instruments must be
                calibrated annually to maintain accuracy and legal compliance. The habit: &ldquo;On
                the first Monday of every month, I will check the calibration due dates on all test
                instruments and book any due within the next two months.&rdquo; This monthly check
                prevents the scenario where you arrive on site for a testing job and discover your
                tester is out of calibration. Monthly frequency ensures you never miss a deadline.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Three-Tier Tool Management System
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Daily:</strong> End-of-job tool count against checklist (60 seconds,
                      prevents losses)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Weekly:</strong> Saturday morning deep van organisation &mdash; clean,
                      restock consumables, check for wear/damage (20 minutes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Monthly:</strong> Full tool inventory and calibration check (first
                      Monday of every month, 30 minutes)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safety Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Safety Habits That Save Lives
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safety shortcuts kill electricians. The reason they persist is that unsafe
                behaviours are often faster and more convenient in the short term, which creates a
                dangerous habit loop: Cue (time pressure), Routine (skip isolation verification),
                Reward (immediate time saving). This loop is reinforced every time the shortcut does
                not result in injury, until the day it does. Breaking this pattern requires building
                automatic safety habits that override the temptation to cut corners.
              </p>

              <p>
                <strong>PPE habit:</strong> &ldquo;Before I touch any electrical equipment, I will
                check I am wearing appropriate PPE.&rdquo; The Cue is approaching the work (visual
                and spatial). The Routine is a two-second mental checklist (gloves, glasses, boots).
                The Reward is the psychological security of knowing you are protected. This habit
                must be so deeply ingrained that you feel physically uncomfortable working without
                PPE &mdash; the same discomfort you feel if you forget your seatbelt.
              </p>

              <p>
                <strong>Isolation verification habit:</strong> &ldquo;After I isolate the supply, I
                will: (1) lock off and tag, (2) test for dead with a proven voltage indicator, (3)
                prove the tester again on a known live source.&rdquo; This is the safe isolation
                procedure from GN3, and it must be automatic. No exceptions. No &ldquo;it&rsquo;s
                just a quick job&rdquo;. The Cue is completing the isolation. The Routine is the
                three-step verification. The Reward is your life.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Daily Safety Habit Checklist</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Morning:</strong> Check PPE is in van and in good condition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Before every task:</strong> PPE check, risk assessment, safe isolation
                      procedure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>During work:</strong> Barrier tape for open access, signage for live
                      work, constant awareness of surroundings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>End of day:</strong> Safe shut-down, area left safe, no live
                      conductors exposed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Admin Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Admin Habits That Prevent Bad Debts
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Poor admin habits are the number one cause of cash flow problems for self-employed
                electricians. You complete £5,000 of work in a week but forget to invoice two of the
                jobs. The client assumes it was a favour or a mistake. Two months later you realise
                and send the invoice. The client is confused or annoyed. You have a bad debt. This
                scenario is entirely preventable with a simple daily admin habit.
              </p>

              <p>
                <strong>End-of-day admin habit:</strong> &ldquo;After I park the van at home, before
                I go inside, I will: (1) photograph the completed work, (2) update today&rsquo;s job
                notes with one sentence, (3) send the invoice or quote.&rdquo; This five-minute
                routine eliminates the Friday afternoon admin panic and ensures you are paid
                promptly for every job. The Cue is parking the van (unavoidable). The Routine is
                five minutes. The Reward is knowing your admin is current and your cash flow is
                protected.
              </p>

              <p>
                <strong>Weekly accounts habit:</strong> &ldquo;Every Friday at 4pm, after my last
                job, I will review: (1) this week&rsquo;s invoices sent, (2) outstanding invoices
                over 30 days, (3) this week&rsquo;s expenses logged.&rdquo; This 15-minute habit
                keeps you in control of your finances and prevents the end-of-year accounting
                nightmare where you realise you have £8,000 of bad debts and no records.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Five-Minute Friday Habit
                </p>
                <p className="text-base text-white leading-relaxed">
                  Every Friday at 4pm, review the week: How many jobs completed? How many invoices
                  sent? Any outstanding payments over 30 days (send polite reminder)? This
                  week&rsquo;s expenses logged? Van fuel receipts filed? This 15-minute habit
                  provides a weekly financial health check and prevents small problems becoming
                  crises. After three months, you will have complete financial visibility and
                  control &mdash; a competitive advantage most tradespeople do not have.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: CPD Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Daily CPD Habits
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most electricians know they &ldquo;should&rdquo; do CPD but struggle to find time.
                The mistake is waiting for large blocks of free time that never materialise. The
                solution is to integrate tiny CPD habits into existing routines. Fifteen minutes per
                day, every day, compounds to 91 hours per year &mdash; equivalent to more than two
                full working weeks of study.
              </p>

              <p>
                <strong>Morning study habit:</strong> &ldquo;After I pour my first coffee, I will
                read one page of BS 7671.&rdquo; One page takes 90 seconds. Over a year, you will
                read the entire regulation book cover-to-cover. This is effortless, requires no
                motivation, and builds both knowledge and a learning habit. The Cue is pouring
                coffee (daily, unavoidable). The Routine is one page. The Reward is visible progress
                and the satisfaction of ticking off the day on your study tracker.
              </p>

              <p>
                <strong>Commute learning habit:</strong> &ldquo;During my morning commute, I will
                listen to one electrician podcast or audiobook.&rdquo; If your average commute is 20
                minutes, this habit delivers 87 hours of learning per year (assuming 260 working
                days). No additional time required &mdash; you are simply replacing radio or silence
                with structured learning. Recommended podcasts: Electrician Talk, Electrical
                Training Forum, NICEIC Technical Podcast.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Complete Daily CPD Habit Stack
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Morning:</strong> One page of BS 7671 with coffee (2 minutes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Commute:</strong> One podcast episode or 20 minutes of audiobook
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Lunch:</strong> One YouTube tutorial or industry news article (10
                      minutes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Evening:</strong> One practice exam question before bed (5 minutes)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Total time: approximately 40 minutes per day. Annual result: 150+ hours of
                  structured learning, complete regulation knowledge, exam readiness, and a
                  permanent learning habit that will sustain your career for decades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Health Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Health Habits for Career Longevity
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical work is physically demanding. Poor health habits compound into chronic
                injuries, reduced earning capacity, and shortened careers. The Health and Safety
                Executive reports that musculoskeletal disorders account for 28% of all work-related
                ill health in construction trades. Back pain, knee problems, and repetitive strain
                injuries are not inevitable &mdash; they are the result of poor habits that can be
                prevented.
              </p>

              <p>
                <strong>Hydration habit:</strong> &ldquo;After I park the van at the first job, I
                will fill my water bottle and place it within arm&rsquo;s reach. Every time I change
                task, I will take three sips.&rdquo; This prevents dehydration, which impairs
                cognitive function and increases error rates. Research shows that 2% dehydration
                reduces cognitive performance equivalent to being at the legal drink-drive limit.
                For electricians making critical safety decisions, hydration is not optional.
              </p>

              <p>
                <strong>Movement habit:</strong> &ldquo;After I lock the van at the end of the day,
                before I walk to the house, I will do three stretches: hamstrings, lower back,
                shoulders.&rdquo; This 90-second routine prevents the chronic tightness that leads
                to injury. Over a year, this habit delivers 260 post-work recovery sessions.
                Combined with proper manual handling technique (lifting with legs, not back), this
                protects your long-term physical health.
              </p>

              <p>
                <strong>Sleep habit:</strong> &ldquo;By 10pm every weeknight, I will be in bed with
                phone switched off.&rdquo; Sleep is the foundation of physical recovery, cognitive
                performance, and emotional regulation. The National Sleep Foundation recommends
                7&ndash;9 hours for adults. An electrician operating on 5&ndash;6 hours is
                significantly more likely to make errors, have accidents, and experience burnout.
                This is a non-negotiable keystone habit.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The True Cost of Poor Health Habits
                </p>
                <p className="text-base text-white leading-relaxed">
                  An electrician who neglects hydration, nutrition, movement, and sleep may function
                  adequately in their 20s and 30s. By their 40s, chronic injuries, reduced energy,
                  and declining cognitive performance begin to limit earning capacity. By their 50s,
                  many are forced into early retirement or less physically demanding (and
                  lower-paid) roles. The electrician who builds health habits in their 20s is still
                  working at full capacity in their 50s and 60s, earning peak rates, and choosing
                  when to retire rather than being forced out by injury. This is a 30&ndash;40 year
                  career advantage created by daily 2-minute habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided specific professional habit designs for electricians. The
                key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Morning routines</strong> are keystone habits that create momentum for
                    the entire day. Anchor them to waking up, not clock time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Tool management</strong> requires three tiers: daily end-of-job counts,
                    weekly van organisation, monthly inventory and calibration checks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Safety habits</strong> must be automatic to override time-pressure
                    shortcuts. PPE checks and safe isolation procedures are non-negotiable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Admin habits</strong> prevent bad debts. Daily invoice habit + weekly
                    accounts review = financial control.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>CPD habits</strong> integrate into existing routines (morning coffee,
                    commute, lunch). 15 minutes per day = 91 hours per year.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Health habits</strong> (hydration, movement, sleep) protect long-term
                    career capacity and prevent forced early retirement.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will examine how
                  to break bad habits and overcome resistance using inverted Four Laws, temptation
                  bundling, and environment redesign.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-3-section-3">
              Next: Breaking Bad Habits &amp; Overcoming Resistance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
