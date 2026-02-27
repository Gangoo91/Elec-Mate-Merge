import {
  ArrowLeft,
  CheckCircle,
  Battery,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Clock,
  Calendar,
  Zap,
  Heart,
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
    id: 'rsm-5-1-qc1',
    question: 'What is micro-recovery, and how often should it ideally occur during a working day?',
    options: [
      'A week-long holiday taken once a year to reset',
      'Short breaks of 5 to 15 minutes taken roughly every 90 minutes during the working day',
      'Sleeping for 10 hours at the weekend to catch up on lost rest',
      'Taking a full month off between large commercial projects',
    ],
    correctIndex: 1,
    explanation:
      'Micro-recovery refers to short breaks taken throughout the working day, ideally every 90 minutes or so. These brief pauses — stepping outside for fresh air, stretching, having a tea break, or simply walking away from the task — allow the body and mind to reset, reducing the accumulation of fatigue and maintaining consistent performance throughout the day.',
  },
  {
    id: 'rsm-5-1-qc2',
    question: 'Why is the performance-recovery cycle compared to physical training?',
    options: [
      'Because electricians need to be physically fit to do their jobs safely',
      'Because stress acts as a training load — the body and mind adapt and grow stronger only during the recovery period, not during the stress itself',
      'Because most construction workers also attend the gym regularly',
      'Because physical exercise is the only effective form of recovery',
    ],
    correctIndex: 1,
    explanation:
      'The performance-recovery cycle mirrors physical training because in both cases, growth and adaptation happen during recovery, not during the stress itself. Just as a muscle grows stronger during rest after exercise, your cognitive and emotional capacity increases when you allow genuine recovery after periods of work-related stress. Without that recovery, you get weaker over time, not stronger.',
  },
  {
    id: 'rsm-5-1-qc3',
    question:
      'Under the Working Time Regulations 1998, what is the minimum annual paid leave entitlement for a full-time UK worker?',
    options: [
      '4.0 weeks (20 days)',
      '4.8 weeks (24 days)',
      '5.6 weeks (28 days)',
      '6.0 weeks (30 days)',
    ],
    correctIndex: 2,
    explanation:
      'The Working Time Regulations 1998 entitle all full-time UK workers to a minimum of 5.6 weeks (28 days) of paid annual leave per year. This can include bank holidays. This entitlement exists because the legislation recognises that recovery from work is not a luxury — it is a legal right and a health necessity. Self-employed electricians should budget financially for equivalent time off even though they are not covered by the Regulations in the same way.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'I feel guilty when I take breaks on site. How do I overcome that?',
    answer:
      'The guilt around taking breaks is deeply embedded in construction culture, where being seen to be constantly busy is equated with being a hard worker. But research consistently shows that people who take regular short breaks are more productive, make fewer mistakes, and sustain higher quality work across the full day than those who push through without stopping. Reframe breaks not as slacking off, but as maintaining your performance tool — your brain and body. An electrician who takes a 15-minute tea break every 90 minutes will wire a board more accurately and efficiently than one who works five hours straight. The evidence is clear: recovery is a performance strategy, not laziness.',
  },
  {
    question: 'How do I take proper holidays when I am self-employed and need the income?',
    answer:
      'This is one of the biggest challenges for self-employed electricians. The key is to treat time off as a non-negotiable business expense, just like your van insurance or your tool budget. Calculate your annual income target, then divide it by 46 working weeks rather than 52 — this builds in six weeks of paid leave. Set aside a percentage of every invoice into a separate "holiday fund" so the money is there when you need it. Many successful self-employed sparkies also schedule their time off well in advance, letting regular clients know months ahead, which prevents the last-minute guilt of turning down work.',
  },
  {
    question: 'Is it really necessary to take breaks every 90 minutes? That seems very frequent.',
    answer:
      'The 90-minute cycle is based on the ultradian rhythm — a well-established biological cycle where the human brain naturally oscillates between higher and lower alertness approximately every 90 to 120 minutes. You do not necessarily need to stop for a full 15-minute break every time. Even a 2- to 3-minute pause — standing up, stretching, looking at something in the distance, taking a few deep breaths — can reset the cycle. The point is not rigid clock-watching; it is recognising that your brain is not designed for continuous sustained attention and building small recovery moments into your day.',
  },
  {
    question: 'What if my employer does not allow adequate break time on site?',
    answer:
      'Under the Working Time Regulations 1998, adult workers who work more than six hours per day are entitled to a minimum 20-minute uninterrupted rest break. Young workers (under 18) are entitled to 30 minutes after 4.5 hours. If your employer is not providing these minimum breaks, they are breaking the law. Speak to your site manager, your union representative, or the Health and Safety Executive (HSE). Construction work is physically and mentally demanding, and adequate breaks are not just a legal requirement — they are essential for safety. Fatigue-related mistakes on an electrical installation can have life-threatening consequences.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following best describes the performance-recovery cycle?',
    options: [
      'Work as hard as possible and then collapse at the end of the week',
      'Stress acts as a stimulus; the body and mind adapt and grow stronger during recovery periods',
      'Recovery is only needed after illness or injury, not after normal work',
      'The harder you work without stopping, the more resilient you become',
    ],
    correctAnswer: 1,
    explanation:
      'The performance-recovery cycle describes how stress acts as a training stimulus — similar to physical exercise — and the body and mind adapt and grow stronger during the recovery period that follows. Without adequate recovery, the stress accumulates and leads to diminished performance, not increased capacity.',
  },
  {
    id: 2,
    question: 'What is micro-recovery?',
    options: [
      'A two-week annual holiday',
      'Short breaks of 5 to 15 minutes taken throughout the working day, roughly every 90 minutes',
      'Sleeping for an extra hour at the weekend',
      'Taking every Friday afternoon off work',
    ],
    correctAnswer: 1,
    explanation:
      'Micro-recovery refers to the short breaks taken throughout the working day — ideally every 90 minutes or so — that allow the brain and body to reset. Examples include tea breaks, stepping outside for fresh air, stretching, or simply standing up and walking away from the task for a few minutes.',
  },
  {
    id: 3,
    question: 'Which biological rhythm supports the recommendation of breaks every 90 minutes?',
    options: ['Circadian rhythm', 'Ultradian rhythm', 'Infradian rhythm', 'Diurnal rhythm'],
    correctAnswer: 1,
    explanation:
      'The ultradian rhythm is the biological cycle that operates within a single day, causing the brain to oscillate between periods of higher and lower alertness approximately every 90 to 120 minutes. Taking breaks aligned with this rhythm helps maintain consistent performance throughout the day.',
  },
  {
    id: 4,
    question: 'What is meso-recovery?',
    options: [
      'A 5-minute stretch break during the working day',
      'Evenings and weekends used for genuine rest, hobbies, and social activity away from work',
      'Extended sick leave after a period of burnout',
      'A career break lasting six months or more',
    ],
    correctAnswer: 1,
    explanation:
      'Meso-recovery refers to the daily and weekly recovery periods — evenings and weekends — where you fully disengage from work and engage in restful, enjoyable, or social activities. This level of recovery is essential for preventing the day-to-day accumulation of fatigue that leads to chronic stress and burnout.',
  },
  {
    id: 5,
    question:
      'Under the Working Time Regulations 1998, what is the minimum paid annual leave for a full-time UK worker?',
    options: [
      '4.0 weeks (20 days)',
      '4.8 weeks (24 days)',
      '5.6 weeks (28 days)',
      '6.0 weeks (30 days)',
    ],
    correctAnswer: 2,
    explanation:
      'The Working Time Regulations 1998 entitle all full-time UK workers to a minimum of 5.6 weeks (28 days) of paid annual leave per year. This can include bank holidays. The legislation recognises that recovery from work is a legal right and a health necessity, not a luxury.',
  },
  {
    id: 6,
    question: 'Why is macro-recovery important for construction workers?',
    options: [
      'It allows time to complete unfinished paperwork from the previous project',
      'Extended breaks between major projects allow deep physiological and psychological recovery that shorter breaks cannot provide',
      'It is only important for office workers, not trade workers',
      'Macro-recovery is the same as micro-recovery but lasts slightly longer',
    ],
    correctAnswer: 1,
    explanation:
      'Macro-recovery — annual leave and longer breaks between big projects — allows the kind of deep, restorative recovery that daily breaks and weekends cannot achieve. After a demanding commercial project lasting months, the accumulated physical and mental fatigue needs extended time to fully dissipate. This is when the body repairs at a deeper level and motivation naturally restores.',
  },
  {
    id: 7,
    question:
      'Which of the following is an example of effective micro-recovery on a construction site?',
    options: [
      'Working through your tea break to finish the job faster',
      'Checking work emails during your lunch break',
      'Stepping outside for 10 minutes of fresh air and a stretch every 90 minutes',
      'Saving all your rest for the weekend',
    ],
    correctAnswer: 2,
    explanation:
      'Stepping outside for fresh air and a stretch every 90 minutes is a textbook example of effective micro-recovery. It breaks the cycle of sustained concentration, allows the brain to reset via the ultradian rhythm, and reduces physical tension from working in awkward positions — all of which are common in electrical installation work.',
  },
  {
    id: 8,
    question: 'What should a self-employed electrician do to ensure adequate macro-recovery?',
    options: [
      'Work 52 weeks a year and take time off only if they feel unwell',
      'Budget financially for time off by calculating their income target based on 46 working weeks rather than 52',
      'Take unpaid time off only during quiet periods when no work is available',
      'Macro-recovery is only relevant for employed workers with paid leave entitlements',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed electricians should treat time off as a non-negotiable business expense. By calculating their annual income target based on 46 working weeks (allowing for approximately 6 weeks of leave), and setting aside a percentage of every invoice into a holiday fund, they can ensure financial stability during time off. Recovery is not a luxury — it is an investment in sustained performance and long-term health.',
  },
];

export default function RSMModule5Section1() {
  useSEO({
    title: 'The Importance of Recovery | RSM Module 5.1',
    description:
      'The performance-recovery cycle, micro/meso/macro recovery strategies, Working Time Regulations 1998, and why recovery is essential for sustained performance in construction.',
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Battery className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Importance of Recovery
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why recovery is not laziness — it is the foundation of sustained performance, health,
            and resilience
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Performance-recovery cycle:</strong> Stress is the stimulus; growth happens
                during rest
              </li>
              <li>
                <strong>Micro-recovery:</strong> Short breaks every 90 minutes throughout the
                working day
              </li>
              <li>
                <strong>Meso-recovery:</strong> Evenings and weekends fully disconnected from work
              </li>
              <li>
                <strong>Macro-recovery:</strong> Annual leave and extended breaks between major
                projects
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Fatigue causes mistakes — and electrical mistakes can be
                fatal
              </li>
              <li>
                <strong>Quality:</strong> Well-rested electricians produce consistently better work
              </li>
              <li>
                <strong>Longevity:</strong> Recovery protects you from burnout and keeps you in the
                trade for decades
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why recovery is essential for sustained performance, not a sign of weakness',
              'Describe the performance-recovery cycle and its parallel with physical training',
              'Distinguish between micro-recovery, meso-recovery, and macro-recovery',
              'Identify practical recovery strategies for each level that work in construction',
              'State the key provisions of the Working Time Regulations 1998 regarding rest and leave',
              'Apply recovery planning to your own working week as an employed or self-employed electrician',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Recovery Is Not Laziness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Recovery Is Not Laziness
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction culture has a deeply ingrained belief that working longer and harder is
                always better. The sparky who arrives first, leaves last, and never takes a break is
                often held up as the model worker. Taking a proper lunch break, leaving site on
                time, or using all your annual leave can attract comments like
                &ldquo;part-timer&rdquo; or &ldquo;slacker&rdquo;. This attitude is not just
                outdated &mdash; it is scientifically wrong, and it is actively harmful.
              </p>

              <p>
                Recovery is not the opposite of performance. It is a <strong>prerequisite</strong>{' '}
                for sustained performance. Every elite athlete understands this instinctively: you
                do not get stronger by training seven days a week without rest. You get injured. The
                same principle applies to cognitive and emotional work. An electrician who works
                60-hour weeks without adequate rest does not become more productive &mdash; they
                become less accurate, more irritable, more prone to mistakes, and more likely to
                have an accident.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Evidence Is Clear</p>
                </div>
                <p className="text-sm text-white">
                  Research by the Construction Industry Training Board (CITB) and the Health and
                  Safety Executive (HSE) consistently shows that fatigue is a major contributing
                  factor in construction accidents. Workers who regularly work more than 48 hours
                  per week have a significantly higher rate of injuries, errors, and near-misses.
                  The human brain cannot sustain focused, accurate work for more than about 90
                  minutes without a break &mdash; after that point, concentration declines, reaction
                  times slow, and the risk of mistakes increases sharply.
                </p>
              </div>

              <p>
                Think about what you are actually doing as an electrician. You are reading complex
                wiring diagrams. You are calculating cable sizes, volt drops, and earth fault loop
                impedances. You are making safety-critical decisions about RCD selection, circuit
                protection, and isolation procedures. You are working with conductors that carry
                lethal voltages. This is not mindless manual labour &mdash; it is skilled cognitive
                work performed in a physically demanding environment. The idea that you can do this
                effectively for 10 or 12 hours straight, day after day, without adequate recovery is
                not just wrong; it is dangerous.
              </p>

              <p>
                Recovery is what allows you to sustain this level of performance over a career
                spanning 30, 40, or even 50 years. The electricians who are still going strong at
                55, still producing excellent work, still enjoying the trade &mdash; they are not
                the ones who never took a day off. They are the ones who understood that recovery is
                a professional discipline, not a personal weakness.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Performance-Recovery Cycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Performance-Recovery Cycle
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The performance-recovery cycle is a well-established model from sports science that
                applies equally to cognitive and emotional work. It describes a four-phase process
                that drives continuous improvement:
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Stress (The Training Load)</p>
                  </div>
                  <p className="text-sm text-white">
                    You are exposed to a demand &mdash; a challenging job, a tight deadline, a
                    difficult client, a complex wiring configuration. This stress is the stimulus
                    that triggers adaptation. Without some degree of challenge, there is no growth.
                    In the gym, this is the heavy set of squats. On site, this is the demanding
                    commercial fit-out or the time-pressured reactive call-out.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Recovery (The Rest Period)</p>
                  </div>
                  <p className="text-sm text-white">
                    After the stress, you rest. Your body repairs. Your mind processes what
                    happened. Cortisol levels return to baseline. Sleep consolidates learning. This
                    is the phase where growth actually occurs &mdash; not during the stress itself.
                    In the gym, this is the rest day when muscles rebuild stronger. On site, this is
                    the evening where you switch off, the weekend where you do something you enjoy,
                    the annual leave where you properly disconnect.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Adaptation (Supercompensation)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Because you rested adequately, you come back slightly stronger than before. Your
                    capacity to handle that level of stress has increased. You have learned from the
                    experience. Your skills have sharpened. Your confidence has grown. In the gym,
                    you can now lift slightly heavier. On site, the next complex job feels a little
                    more manageable because you have genuinely processed and learned from the last
                    one.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Increased Capacity</p>
                  </div>
                  <p className="text-sm text-white">
                    You are now ready for a slightly greater challenge. The cycle repeats, and over
                    time your resilience, skill, and capacity steadily increase. This is how careers
                    are built &mdash; through progressive challenge and adequate recovery, not
                    through relentless grinding.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    What Happens Without Recovery?
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  If the recovery phase is skipped or inadequate, the cycle breaks down. Instead of
                  adaptation and increased capacity, you get:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Accumulated fatigue</strong> &mdash; each day
                      starts with residual tiredness from the day before
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Declining performance</strong> &mdash; more
                      mistakes, slower work, poorer quality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emotional dysregulation</strong> &mdash;
                      shorter temper, lower patience, increased irritability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical breakdown</strong> &mdash; chronic
                      pain, weakened immune system, weight changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Burnout</strong> &mdash; the complete depletion
                      of physical, emotional, and motivational resources
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                This is why the sparky who works 70-hour weeks for months on end often ends up ill,
                injured, or burnt out. They are running the stress phase of the cycle on repeat
                without ever completing the recovery phase. It is not toughness &mdash; it is
                self-destruction. True professional resilience comes from understanding this cycle
                and deliberately managing both the stress and the recovery.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Micro-Recovery */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Micro-Recovery: Short Breaks During the Working Day
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Micro-recovery is the first and most frequent level of recovery. It refers to the
                short breaks &mdash; typically 5 to 15 minutes &mdash; taken throughout the working
                day, ideally every 90 minutes or so. These breaks are based on the{' '}
                <strong>ultradian rhythm</strong>, a well-established biological cycle in which the
                human brain naturally oscillates between periods of higher and lower alertness
                approximately every 90 to 120 minutes.
              </p>

              <p>
                You have probably noticed this pattern yourself, even if you did not know the
                science behind it. About 90 minutes into a task, your concentration starts to waver.
                You re-read the same line of a wiring diagram. You lose track of which circuit you
                were working on. Your mind wanders to something completely unrelated. This is your
                brain signalling that it needs a brief recovery period before it can return to
                focused work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Micro-Recovery Strategies for Site
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tea break every 90 minutes:</strong> Not a
                      rushed cup gulped down while still looking at your phone. A genuine 10- to
                      15-minute break where you sit down, drink a hot drink, and chat to a colleague
                      about something completely unrelated to work. This social interaction is
                      itself restorative.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step outside:</strong> If you have been working
                      in a ceiling void, a plant room, or a windowless corridor, step outside for a
                      few minutes of daylight and fresh air. Natural light resets your circadian
                      rhythm and lifts mood. Even on an overcast British day, outdoor light is
                      dramatically brighter than indoor lighting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stretch:</strong> Electrical work involves
                      prolonged periods in awkward positions &mdash; reaching overhead, crouching in
                      cupboards, leaning into distribution boards. A 2-minute stretch targeting your
                      neck, shoulders, wrists, and lower back can prevent the chronic pain that
                      plagues many older electricians.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Breathing exercise:</strong> Three deep breaths
                      with a slow exhale activates the parasympathetic nervous system and reduces
                      cortisol. It takes 30 seconds. You can do it standing at your van, sitting in
                      the welfare cabin, or even in a toilet cubicle if you need privacy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change tasks:</strong> If a full break is not
                      practical, switching between cognitive and physical tasks can provide partial
                      recovery. Spend 90 minutes on wiring and terminations, then switch to cable
                      pulling or containment for the next 90 minutes. The variety itself is
                      restorative.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Battery className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Comparison: Two Approaches to the Same Day
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1">Sparky A: No Breaks</p>
                    <p className="text-sm text-white">
                      Arrives at 7:30. Starts wiring immediately. Works through tea break because
                      &ldquo;I want to get this board finished.&rdquo; Eats a sandwich with one hand
                      while reading drawings with the other. Works until 5:00 without stopping. By
                      3:00pm, is making errors &mdash; wrong cable in the wrong terminal, misreading
                      the schedule. Stays until 6:30 to fix the mistakes. Goes home exhausted and
                      irritable. Total productive output: moderate, with rework.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Sparky B: Regular Breaks
                    </p>
                    <p className="text-sm text-white">
                      Arrives at 7:30. Works focused for 90 minutes. Takes a 15-minute tea break at
                      9:00 &mdash; chats with the plumber, stretches, steps outside. Returns sharp.
                      Another focused 90 minutes. Proper lunch break at 12:00 &mdash; sits down,
                      eats properly, walks around the block. Afternoon: two more 90-minute blocks
                      with a tea break between them. Leaves at 5:00 with the board fully wired,
                      correctly, first time. Goes home with energy left for the family. Total
                      productive output: higher, with zero rework.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Sparky B worked fewer total minutes but produced more and better work. This is not a
                coincidence &mdash; it is how the human brain works. Sustained concentration
                depletes glucose in the prefrontal cortex, the part of the brain responsible for
                complex decision-making and error-checking. Short breaks allow glucose to replenish
                and concentration to restore. The 90-minute rhythm is not a theory &mdash; it is
                biology.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Meso-Recovery */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Meso-Recovery: Evenings and Weekends
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Meso-recovery refers to the daily and weekly recovery periods &mdash; your evenings
                and weekends. This is the level of recovery that prevents the day-to-day
                accumulation of fatigue that, left unchecked, leads to chronic stress and eventually
                burnout. Meso-recovery is where most construction workers fall short, because the
                boundaries between work and home life are often blurred.
              </p>

              <p>
                For employed electricians, evenings may be consumed by overtime, travel time, or
                simply being too exhausted to do anything other than collapse on the sofa. For
                self-employed sparkies, the problem is even worse: evenings are often spent quoting
                jobs, answering client messages, ordering materials, and doing the administration
                that there is no time for during the working day. The result is that{' '}
                <strong>there is no genuine recovery period between working days</strong>, and each
                morning starts with residual fatigue from the day before.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    What Effective Meso-Recovery Looks Like
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Evenings fully off:</strong> A clear
                      end-of-work boundary &mdash; no checking work emails, no answering client
                      calls, no quoting jobs after a set time (many successful sparkies set 7pm as
                      their cut-off). The evening is for rest, family, hobbies, and sleep.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regular hobbies:</strong> Activities that are
                      genuinely enjoyable and absorbing &mdash; fishing, football, cycling, gaming,
                      woodworking, cooking, music, walking the dog. The key is that the activity
                      requires enough attention to pull your mind away from work, creating
                      psychological detachment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Social connection:</strong> Spending time with
                      family and friends. Research consistently shows that social connection is one
                      of the most powerful buffers against stress. A Friday night at the pub with
                      mates, a Sunday afternoon with the kids, a weekly phone call with a friend
                      &mdash; these are not luxuries; they are resilience strategies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weekends as genuine rest:</strong> At least one
                      full day at the weekend should be completely free from work. For self-employed
                      electricians who sometimes work Saturdays, Sunday must be non-negotiable.
                      Working seven days a week, even if the seventh day is only a few hours,
                      prevents the weekly recovery cycle from completing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Quality sleep:</strong> Seven to nine hours of
                      uninterrupted sleep is the single most important recovery activity. Poor sleep
                      undermines every other recovery strategy. Prioritise a consistent bedtime,
                      limit screens before sleep, and create a dark, cool sleeping environment.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> A self-employed
                  electrician makes a rule: no work calls or messages after 7pm, no quoting on
                  Sundays, and every Saturday afternoon is reserved for fishing with his son. At
                  first, he worries about losing business. After three months, he realises he is
                  actually more productive during working hours because he is arriving each morning
                  genuinely rested. His quote conversion rate has not changed &mdash; clients do not
                  care whether you reply at 9pm or 8am the next morning. But his relationship with
                  his family has improved dramatically, and the Sunday dread he used to feel has
                  disappeared.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Macro-Recovery */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Macro-Recovery: Annual Leave and Longer Breaks
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Macro-recovery is the deepest level of recovery. It refers to annual leave, bank
                holidays, and the longer breaks that you take between major projects or phases of
                work. This is the recovery that daily breaks and weekends cannot provide &mdash; the
                deep, restorative rest that allows your body and mind to fully replenish after
                months of sustained effort.
              </p>

              <p>
                Think of it this way: micro-recovery is like charging your phone for 15 minutes
                during the day. Meso-recovery is like plugging it in overnight. Macro-recovery is
                like taking the phone to the shop for a full battery replacement. Each level serves
                a different purpose, and none can substitute for the others.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Working Time Regulations 1998: Your Legal Rights
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The Working Time Regulations 1998 are UK legislation that sets minimum standards
                  for rest and leave. Every construction worker should know their rights:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Annual leave:</strong> 5.6 weeks (28 days) paid
                      leave per year for full-time workers (can include bank holidays)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Daily rest:</strong> 11 consecutive hours of
                      rest in every 24-hour period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weekly rest:</strong> One uninterrupted 24-hour
                      period off in every 7 days (or two 24-hour periods in every 14 days)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rest breaks:</strong> A 20-minute uninterrupted
                      break if the working day is longer than 6 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Maximum working week:</strong> 48 hours
                      averaged over 17 weeks (workers can opt out, but this does not mean they
                      should)
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                These are <strong>minimum</strong> standards, not targets. The Regulations exist
                because decades of occupational health research proved that inadequate rest leads to
                accidents, illness, and premature death. They apply to all workers, including agency
                workers and most construction site workers. Self-employed electricians are not
                directly covered, but the health principles behind the legislation apply to
                everyone. If you are self-employed, you should budget financially for equivalent
                time off.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Battery className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Planning Macro-Recovery
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  An experienced electrician running a small firm plans macro-recovery deliberately:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Books two weeks off after every major commercial project (6 to 8 weeks of
                      intense work warrants 2 weeks of proper recovery)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Takes a full week off at Christmas and another in the summer, regardless of
                      how busy the diary is
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Saves 20% of every invoice into a separate account to fund these breaks
                      without financial stress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Lets regular clients know his holiday dates three months in advance so they
                      plan around him &mdash; this prevents the guilt of turning down work at short
                      notice
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The result: 15 years into the trade, he still loves the work. His body is holding
                  up well. His relationships are strong. He has never been signed off with stress.
                  His recovery planning is not a weakness &mdash; it is one of the reasons he is
                  still thriving.
                </p>
              </div>

              <p>
                Many electricians resist taking their full annual leave entitlement because they
                worry about lost income (self-employed) or appearing uncommitted (employed). This is
                a false economy. The research is unambiguous: workers who take their full leave
                entitlement are more productive, healthier, make fewer mistakes, and have longer
                careers than those who do not. Recovery is not lost time &mdash; it is invested
                time.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Recovery is not a reward for hard work. It is not something you earn by pushing
                yourself to breaking point. It is a professional discipline &mdash; as essential to
                your performance as your technical skills, your tools, and your qualifications.
                Without deliberate, structured recovery at every level, even the most skilled
                electrician will eventually break down.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Recovery is a performance strategy</strong>, not laziness. Growth and
                      adaptation happen during rest, not during stress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Micro-recovery</strong> (breaks every 90 minutes) maintains
                      concentration, reduces errors, and aligns with the brain&rsquo;s natural
                      ultradian rhythm.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Meso-recovery</strong> (evenings and weekends fully off) prevents the
                      daily accumulation of fatigue that leads to chronic stress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Macro-recovery</strong> (annual leave and project breaks) provides the
                      deep restoration that shorter breaks cannot achieve.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>Working Time Regulations 1998</strong> give you a legal right to
                      5.6 weeks of paid leave. Use it &mdash; it exists for a reason.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore the specific challenge of switching off after
                work &mdash; the transition from high-alert work mode to relaxed home mode that so
                many construction workers struggle with. Understanding recovery is the foundation;
                learning to switch off is the practical skill that makes it happen.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-5-section-2">
              Next: Switching Off After Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
