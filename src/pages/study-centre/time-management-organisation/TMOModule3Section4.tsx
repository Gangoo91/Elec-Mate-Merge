import { ArrowLeft, BatteryCharging, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the fundamental difference between time management and energy management?',
    options: [
      'Time management is for office workers; energy management is for physical workers',
      'Time is a finite, non-renewable resource; energy is renewable and can be strategically managed through recovery',
      'Energy management is more important than time management in every situation',
      'There is no meaningful difference \u2014 they are the same concept',
    ],
    correctAnswer: 1,
    explanation:
      'Everyone has exactly 24 hours per day, and no technique can create more time. Energy, however, is renewable \u2014 it can be replenished through sleep, nutrition, breaks, and strategic task scheduling. Managing energy means ensuring you have the right amount of fuel for the right tasks at the right times.',
  },
  {
    id: 2,
    question:
      'According to circadian rhythm research, when does peak cognitive performance typically occur?',
    options: [
      'Immediately upon waking',
      '2\u20134 hours after waking, typically mid-morning',
      'In the early afternoon, after lunch',
      "In the evening, when the day's work is done",
    ],
    correctAnswer: 1,
    explanation:
      'For most people (those with a standard sleep-wake cycle), cognitive performance peaks approximately 2\u20134 hours after waking. This is when alertness, concentration, and analytical thinking are at their strongest, making it the ideal window for complex, demanding tasks.',
  },
  {
    id: 3,
    question: 'What is the ultradian rhythm cycle and how long does it last?',
    options: [
      'A yearly cycle of seasonal energy variation lasting 12 months',
      'A daily cycle of waking and sleeping lasting 24 hours',
      'A natural 90-minute cycle of peak focus followed by a trough, repeating throughout the day',
      'A weekly cycle of productivity that peaks on Wednesdays',
    ],
    correctAnswer: 2,
    explanation:
      'The ultradian rhythm is a 90-minute cycle that operates within the broader circadian (24-hour) rhythm. During each cycle, you experience approximately 90 minutes of rising and peak alertness followed by approximately 20 minutes of reduced energy. Working with these cycles rather than against them optimises performance.',
  },
  {
    id: 4,
    question:
      'An electrician has a complex consumer unit change and a series of simple socket additions to complete. Using energy management principles, how should they schedule these tasks?',
    options: [
      'Complete the socket additions first as a warm-up, then tackle the CU change',
      'Alternate between the two tasks to maintain variety and prevent boredom',
      'Schedule the CU change for the morning peak-energy window and the socket additions for the afternoon when cognitive demands are lower',
      'Complete whichever task the client wants first, regardless of energy levels',
    ],
    correctAnswer: 2,
    explanation:
      'The CU change requires sustained concentration, careful calculation, and high cognitive focus \u2014 making it ideal for the morning peak-energy window. Socket additions are relatively routine and can be performed effectively even when energy levels are lower in the afternoon.',
  },
  {
    id: 5,
    question:
      'Which of the following has the greatest impact on physical energy for a tradesperson?',
    options: [
      'Drinking energy drinks throughout the day for sustained alertness',
      'Consistent sleep quality, regular hydration, and proper nutrition',
      'Working longer hours to build physical endurance',
      'Taking cold showers every morning',
    ],
    correctAnswer: 1,
    explanation:
      'Sleep quality, hydration, and nutrition form the foundation of physical energy. Poor sleep, dehydration, and skipping meals create a cumulative energy deficit that no amount of caffeine or willpower can fully compensate for. These basics have a far greater impact than any trendy biohacking technique.',
  },
  {
    id: 6,
    question: 'Why do difficult client interactions drain energy disproportionately?',
    options: [
      'Because clients are inherently unreasonable',
      'Because difficult interactions deplete emotional energy, which affects cognitive and physical energy as well',
      'Because they always happen at the worst possible time',
      'Because tradespeople are not trained in customer service',
    ],
    correctAnswer: 1,
    explanation:
      'Emotional energy is interconnected with cognitive and physical energy. A stressful client interaction can leave you mentally drained and physically tense for hours afterwards. This is why scheduling demanding client meetings during peak energy periods and building in recovery time afterwards is an important energy management strategy.',
  },
  {
    id: 7,
    question: 'What is the post-lunch dip and how should it be managed?',
    options: [
      'It is a myth \u2014 there is no real energy drop after lunch',
      'It is a natural circadian-driven period of reduced alertness, best managed by scheduling routine or physical tasks rather than complex cognitive work',
      'It should be managed by drinking strong coffee and pushing through',
      'It only affects people who eat large meals at lunch',
    ],
    correctAnswer: 1,
    explanation:
      'The post-lunch dip (typically 13:00\u201315:00) is a genuine circadian phenomenon, not simply the result of eating. It occurs even when people skip lunch. Managing it means scheduling routine, physical, or less cognitively demanding tasks during this window rather than fighting it with caffeine.',
  },
  {
    id: 8,
    question:
      'According to the 90-minute ultradian cycle, what should you do after approximately 90 minutes of focused work?',
    options: [
      'Continue working to maintain momentum \u2014 breaks reduce productivity',
      'Take a 15\u201320 minute recovery break to allow your natural cycle to reset before the next period of peak focus',
      'Switch to a completely different type of work for the rest of the day',
      'Take the rest of the day off to fully recover',
    ],
    correctAnswer: 1,
    explanation:
      'After approximately 90 minutes of focused work, the ultradian cycle enters a natural trough. Taking a 15\u201320 minute break during this trough allows your system to reset, preparing you for the next 90-minute period of peak focus. Working through the trough produces diminishing returns and accelerates fatigue.',
  },
];

export default function TMOModule3Section4() {
  useSEO({
    title:
      'Energy Management vs Time Management | Module 3 Section 4 | Time Management & Organisation',
    description:
      'Circadian rhythms, matching tasks to energy levels, the 90-minute ultradian cycle, and managing physical, emotional, and mental energy for tradespeople.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <BatteryCharging className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 4</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Energy Management vs Time Management
            </h1>
            <p className="text-white text-sm sm:text-base">
              Why managing your energy matters as much as managing your time &mdash; and how to
              match tasks to your natural rhythms
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                Time is finite &mdash; everyone has exactly 24 hours per day. Energy, however, is
                renewable and varies throughout the day in predictable patterns. By matching your
                most demanding tasks to your peak energy periods and scheduling routine work during
                natural energy troughs, you can dramatically increase both the quality and quantity
                of your output without adding any extra hours.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                Tradespeople perform both physically and cognitively demanding work. An electrician
                who schedules a complex consumer unit change at 15:00 after a heavy lunch and 4
                hours of physical work will make more errors than one who schedules the same task
                for 09:00 when cognitive energy is at its peak. Energy management turns this
                intuitive understanding into a systematic advantage.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Distinguish between time as a finite resource and energy as a renewable, manageable resource',
                'Explain how circadian rhythms create predictable periods of peak and trough cognitive performance',
                'Apply the 90-minute ultradian cycle to schedule focused work and recovery breaks',
                'Match different types of electrical work to appropriate energy windows throughout the day',
                'Identify the three dimensions of energy \u2014 physical, emotional, and mental \u2014 and how each affects work quality',
                'Design a daily schedule that aligns task demands with natural energy patterns for optimal performance',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Time vs Energy */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                1. Time Is Finite, Energy Is Renewable
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Most productivity advice focuses on time management &mdash; how to schedule tasks,
                prioritise activities, and eliminate waste from your day. But there is a fundamental
                limitation to this approach: time is a fixed, non-renewable resource. No technique,
                app, or system can give you more than 24 hours in a day. You can optimise how you
                use those hours, but you cannot create more of them. Energy, by contrast, is
                renewable. It can be depleted through work and stress, but it can also be
                replenished through rest, nutrition, exercise, and strategic scheduling.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                This distinction has profound implications for how you approach productivity. Two
                electricians might work the same 8-hour day, but if one is working in alignment with
                their natural energy rhythms and the other is fighting against them, the results
                will be dramatically different. The first electrician completes a complex EICR with
                precision in the morning, does routine installation work after lunch, and finishes
                the day feeling productive. The second electrician attempts the EICR at 14:30 when
                their cognitive energy is at its lowest, makes errors that require rework, and
                finishes the day frustrated and exhausted. Same hours, vastly different outcomes.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The concept of energy management was popularised by Jim Loehr and Tony Schwartz in
                their 2003 book <em>The Power of Full Engagement</em>, where they argued that
                managing energy, not time, is the key to high performance. Their research with elite
                athletes showed that peak performance requires strategically alternating between
                periods of intense effort and deliberate recovery &mdash; and that this principle
                applies equally to business professionals and, by extension, to skilled tradespeople
                whose work demands both physical and cognitive peak performance.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Time vs Energy: Key Differences
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Time:</strong> Fixed at 24 hours per day &mdash;
                cannot be created, saved, or borrowed
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Energy:</strong> Fluctuates throughout the day
                &mdash; can be replenished through rest, nutrition, and recovery
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Time management:</strong> Focuses on scheduling and
                prioritisation &mdash; what to do and when
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Energy management:</strong> Focuses on aligning task
                demands with available energy &mdash; matching what to do with how you feel
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Optimal approach:</strong> Use both together &mdash;
                schedule (time) high-demand tasks during peak (energy) periods
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-3-4-time-vs-energy"
            question="An electrician has 8 available hours in a day and feels fresh in the morning but fatigued by mid-afternoon. They have a complex fault-finding task and routine socket installations. Which approach demonstrates energy management?"
            options={[
              'Do the socket installations first because they are quicker, then fault-find in the afternoon',
              'Schedule fault-finding for the morning peak-energy window and socket installations for the afternoon lower-energy period',
              'Alternate between fault-finding and socket installations every hour to maintain variety',
              'Work on whichever task the client mentions first',
            ]}
            correctIndex={1}
            explanation="Energy management means matching task demands to energy levels. Fault-finding requires sustained cognitive focus (high energy demand), making it ideal for the morning peak. Socket installations are more routine and can be completed effectively even when energy levels drop in the afternoon."
          />

          {/* Section 2: Circadian Rhythms */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. Circadian Rhythms &amp; Peak Performance Windows
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Your body operates on a roughly 24-hour internal clock known as the circadian
                rhythm, regulated primarily by light exposure and controlled by the suprachiasmatic
                nucleus in the brain. This rhythm governs not just sleep and wakefulness but also
                body temperature, hormone release, alertness, and cognitive performance.
                Understanding your circadian rhythm allows you to predict when you will be at your
                sharpest and when you will naturally experience dips in concentration.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For most people following a standard sleep schedule (sleeping roughly
                22:00&ndash;06:00), cognitive performance follows a predictable pattern. After
                waking, alertness rises steadily, reaching a peak approximately 2&ndash;4 hours
                after waking &mdash; typically between 09:00 and 11:00 for an early riser. This is
                your <strong className="text-white">prime time</strong>: the window when your
                analytical thinking, concentration, and decision-making are at their strongest. It
                is the ideal window for complex tasks that require sustained focus: fault-finding,
                EICR report analysis, design work, and complex calculations.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                After the morning peak, most people experience a decline in alertness, accelerated
                by the post-lunch dip &mdash; a genuine circadian phenomenon (not simply the result
                of eating, as it occurs even when people skip lunch). The period from approximately
                13:00&ndash;15:00 is typically the lowest point for cognitive performance. This is
                not the time for critical decisions, complex analysis, or detailed certification
                work. It is, however, perfectly suitable for routine physical work, straightforward
                installations, tidying and organising, and other tasks that require physical effort
                but not intense cognitive focus.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              The Electrician&rsquo;s Circadian Schedule
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Matching common electrical tasks to typical energy windows:
            </p>
            <div className="space-y-1">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">07:00&ndash;08:00 (rising energy):</strong> Arrive,
                set up, plan the day, review drawings
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">08:00&ndash;11:00 (peak):</strong> Complex work
                &mdash; CU changes, fault-finding, testing, EICR analysis, design
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">11:00&ndash;12:00 (moderate):</strong> Continue
                complex work or transition to moderate-demand tasks
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">12:00&ndash;13:00 (declining):</strong> Lunch, return
                calls, process messages
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">13:00&ndash;15:00 (trough):</strong> Routine work
                &mdash; cable runs, socket additions, containment, tidying
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">15:00&ndash;16:30 (recovery):</strong> Moderate
                tasks, then wind down, clean up, prepare for tomorrow
              </p>
            </div>
          </div>

          {/* Section 3: The Ultradian Cycle */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">3. The 90-Minute Ultradian Cycle</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Within the broader 24-hour circadian rhythm, your body also operates on shorter
                cycles known as ultradian rhythms. Research by sleep scientist Nathaniel Kleitman
                (who also discovered REM sleep) identified a basic rest-activity cycle of
                approximately 90 minutes that operates throughout the day, not just during sleep.
                During each 90-minute cycle, your alertness and focus naturally rise, peak, and then
                decline before the next cycle begins.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The practical implication is straightforward: your body naturally supports
                approximately 90 minutes of focused work before needing a recovery period of
                15&ndash;20 minutes. Working with this cycle &mdash; pushing hard for 90 minutes,
                then resting briefly &mdash; produces better results than trying to maintain
                constant effort for 3&ndash;4 hours straight. The 90-minute cycle also aligns
                remarkably well with many common trade tasks: a consumer unit change typically takes
                60&ndash;90 minutes of focused work, a full board test might take 90 minutes, and a
                complex first fix for a single room often fits within this window.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                When you work through the natural trough at the end of a 90-minute cycle without
                resting, you experience diminishing returns. Your concentration drops, your error
                rate increases, and the quality of your work declines &mdash; but you may not notice
                because fatigue also reduces your ability to self-assess. This is particularly
                dangerous in electrical work, where errors in testing or connections can have safety
                consequences. A 15-minute break after 90 minutes of focused work is not a luxury
                &mdash; it is a quality control measure.
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-3-4-ultradian"
            question="An electrician has been performing detailed IR and continuity testing for 90 minutes straight. Their test results are starting to show inconsistencies. According to the ultradian cycle, what is the most likely cause and solution?"
            options={[
              'The test instruments need recalibrating \u2014 stop and calibrate',
              'They have reached the natural trough of their 90-minute ultradian cycle and need a 15\u201320 minute break to reset',
              'They should switch to a completely different type of work for the rest of the day',
              'The inconsistencies are normal and should be recorded as-is',
            ]}
            correctIndex={1}
            explanation="After approximately 90 minutes of focused work, the ultradian cycle enters a natural trough where concentration and accuracy decline. A 15\u201320 minute break allows the cycle to reset, restoring focus for the next 90-minute period. This is far more effective than pushing through with declining accuracy."
          />

          {/* Section 4: Physical Energy */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Physical Energy: The Foundation
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Physical energy is the foundation upon which all other forms of energy rest. No
                amount of time management skill or mental technique can compensate for a body that
                is sleep-deprived, dehydrated, or malnourished. For tradespeople, whose work is
                inherently physical, managing physical energy is both more important and more
                challenging than for sedentary workers. The demands of lifting, bending, climbing,
                and working in awkward positions add a physical fatigue component that office
                workers simply do not face.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Sleep</strong> is the single most important factor in
                energy management. Research consistently shows that even moderate sleep deprivation
                (sleeping 6 hours instead of 7&ndash;8) produces measurable declines in reaction
                time, decision-making quality, and error detection. For electricians, these
                cognitive functions are safety-critical. The tradesperson who routinely gets
                5&ndash;6 hours of sleep because they stay up late doing admin is not just less
                productive &mdash; they are less safe. Prioritising sleep is not laziness; it is a
                professional responsibility.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Hydration</strong> is the most commonly neglected
                physical energy factor for site workers. Even mild dehydration (1&ndash;2% body
                weight loss through fluid) reduces cognitive performance by 10&ndash;15% and
                increases fatigue. On active construction sites, especially during warmer months,
                fluid loss through sweating can be significant. Keeping a water bottle accessible
                and drinking regularly throughout the day &mdash; not just when you feel thirsty
                &mdash; is one of the simplest and most effective energy management strategies
                available. Thirst is a lagging indicator; by the time you feel thirsty, your
                performance has already declined.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Physical Energy Checklist for Tradespeople
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Sleep:</strong> 7&ndash;8 hours consistently.
                Prioritise sleep over late-night admin &mdash; move admin to a batched session
                instead
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Hydration:</strong> 2&ndash;3 litres of water per day
                minimum. Keep a bottle in the van and on site. Drink before you feel thirsty
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Nutrition:</strong> Eat a proper breakfast and lunch.
                Avoid heavy, carb-heavy meals that worsen the post-lunch dip. Carry healthy snacks
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Movement:</strong> Stretch during breaks, especially
                if working in cramped positions. Physical stiffness accelerates mental fatigue
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Caffeine:</strong> Useful in moderation but avoid
                after 14:00 as it disrupts sleep quality. One coffee in the morning is more
                effective than four throughout the day
              </p>
            </div>
          </div>

          {/* Section 5: Emotional and Mental Energy */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">5. Emotional &amp; Mental Energy</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Energy is not purely physical. Emotional energy &mdash; the capacity to manage your
                emotions and interact positively with others &mdash; and mental energy &mdash; the
                capacity for sustained cognitive effort &mdash; are equally important and
                interconnected. A difficult client interaction can drain your emotional energy so
                thoroughly that your cognitive performance drops for the rest of the afternoon, even
                though you are not physically tired. Understanding these interconnections allows you
                to manage all three dimensions of energy strategically.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Emotional energy drains</strong> are often
                underestimated by tradespeople. Dealing with a confrontational client, negotiating a
                disputed invoice, managing a complaint, or handling conflict with another trade on
                site can consume enormous emotional energy. These interactions leave residual stress
                that persists long after the conversation ends, reducing your capacity for focused
                work. The solution is not to avoid these situations entirely (they are part of
                running a business) but to schedule them strategically. A difficult client
                conversation at 10:00 leaves the rest of the day for recovery. The same conversation
                at 16:00 can ruin your evening as well.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Mental energy</strong> operates like a battery that
                depletes through use and recharges through rest. Every decision you make, every
                problem you solve, and every calculation you perform draws from this battery. This
                is why the concept of &ldquo;decision fatigue&rdquo; is real &mdash; the quality of
                your decisions genuinely deteriorates as you make more of them throughout the day.
                For electricians, this means that the critical decisions (fault analysis, protection
                coordination, safety judgements) should happen early in the day when your mental
                battery is fully charged, not at 16:00 when it is running low.
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-3-4-difficult-client"
            question="An electrician has a difficult client meeting about a disputed invoice AND a complex CU change to complete on the same day. Using energy management principles, how should they schedule these?"
            options={[
              'Handle the client meeting first thing to get it out of the way, then do the CU change',
              'Schedule the CU change for the morning peak energy window and the client meeting for 10:00\u201310:30, allowing recovery time before the afternoon',
              'Do the CU change and the client meeting at the same time to save travel',
              'Schedule the client meeting for the end of the day so it does not affect site work',
            ]}
            correctIndex={1}
            explanation="The CU change requires peak cognitive energy (morning window). The difficult client meeting will drain emotional energy, so scheduling it mid-morning with recovery time afterwards prevents it from affecting the rest of the day. Scheduling it at the end of the day (option D) would carry the stress into your evening."
          />

          {/* Section 6: Designing Your Energy-Aligned Day */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. Designing Your Energy-Aligned Day
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Bringing circadian rhythms, ultradian cycles, and the three dimensions of energy
                together, you can design a daily schedule that works with your biology rather than
                against it. This does not require rigid adherence to a fixed timetable &mdash;
                construction work is inherently unpredictable. Rather, it means having a general
                framework that guides your scheduling decisions when you have the flexibility to
                choose when tasks happen.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The principle is simple: match task demands to energy availability. Complex
                cognitive tasks (testing, fault-finding, design, certification) belong in the
                morning peak window. Moderate tasks (standard installations, client communication)
                belong in the late morning or mid-afternoon recovery period. Routine physical tasks
                (cable runs, containment, simple additions) can be performed effectively during the
                post-lunch trough. Administrative tasks (invoicing, quoting) work well either during
                the morning if they are your priority that day, or as a batched evening session when
                the day&rsquo;s physical work is done.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Psychologist Mihaly Csikszentmihalyi&rsquo;s research on flow states (discussed in
                Section 1) directly supports this approach. Flow &mdash; the state of optimal
                performance and engagement &mdash; requires sufficient energy to sustain focused
                concentration. Attempting to enter flow when your energy is depleted is like trying
                to sprint on an empty stomach: the intention is there but the fuel is not. By
                scheduling your most demanding and potentially flow-inducing tasks during peak
                energy windows, you create the conditions where flow is not just possible but
                likely. This is where time management and energy management converge to produce
                extraordinary results.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">Know Your Chronotype</h3>
            <p className="text-white text-sm leading-relaxed">
              Not everyone&rsquo;s circadian rhythm follows the same pattern.
              &ldquo;Chronotype&rdquo; refers to your individual tendency towards morningness or
              eveningness. Early birds (larks) peak between 08:00&ndash;11:00, while night owls peak
              later, often between 10:00&ndash;13:00. Most tradespeople are early risers by
              necessity, but if you are naturally a night owl, your peak cognitive window may be
              later than described above. Pay attention to when <em>you</em> feel sharpest and
              schedule your most demanding work accordingly.
            </p>
          </div>

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Time is finite (24 hours/day), but energy is renewable and can be strategically managed through sleep, nutrition, and recovery',
                'Circadian rhythms create a peak cognitive window 2\u20134 hours after waking and a trough in the early afternoon (13:00\u201315:00)',
                'The 90-minute ultradian cycle suggests working in focused 90-minute blocks with 15\u201320 minute recovery breaks',
                'Physical energy (sleep, hydration, nutrition) is the foundation \u2014 cognitive performance cannot exceed what the body supports',
                'Emotional energy (difficult client interactions, conflict) and mental energy (decision fatigue) must be managed alongside physical energy',
                'Match task demands to energy availability: complex work in the morning peak, routine work during the afternoon trough',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if my site schedule does not allow me to choose when I do complex tasks?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  You cannot always control your schedule, especially on multi-trade sites. However,
                  on the days you do have flexibility (sole-trader domestic work, self-managed
                  jobs), use energy management principles. Even on fixed-schedule sites, you can
                  still manage your physical energy (hydration, nutrition, breaks) and save
                  high-concentration tasks for your peak windows when the opportunity arises.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is the post-lunch dip really that significant?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. Research shows that the post-lunch dip affects cognitive performance,
                  reaction time, and alertness regardless of whether you eat lunch. It is a
                  circadian-driven phenomenon. While you cannot eliminate it, you can mitigate it by
                  eating a lighter, protein-rich lunch (avoiding heavy carbohydrates), staying
                  hydrated, and scheduling tasks that do not require peak cognitive performance
                  during the 13:00&ndash;15:00 window.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How much does sleep really affect work quality?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Profoundly. Studies show that after 17&ndash;19 hours awake, cognitive performance
                  is equivalent to a blood alcohol concentration of 0.05%. After 24 hours, it is
                  equivalent to 0.10% &mdash; above the legal drink-drive limit. Even losing just
                  1&ndash;2 hours of sleep per night creates a cumulative &ldquo;sleep debt&rdquo;
                  that progressively impairs judgement, reaction time, and error detection. For
                  safety-critical electrical work, adequate sleep is not optional.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I train myself to need less sleep?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  No. Despite common claims, research consistently shows that the vast majority of
                  adults require 7&ndash;9 hours of sleep for optimal cognitive and physical
                  function. A tiny percentage of the population (less than 1%) carries a gene that
                  allows them to function well on 6 hours, but this is genuinely rare. Most people
                  who claim to function on 5&ndash;6 hours have simply become accustomed to impaired
                  performance without recognising it.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            questions={quizQuestions}
            title="Section 4 Quiz: Energy Management vs Time Management"
          />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                Next: Organisation &amp; Admin
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
