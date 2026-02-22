import {
  ArrowLeft,
  ShieldOff,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Clock,
  Phone,
  AlertTriangle,
  Scale,
  TrendingDown,
  Ban,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm4-s3-wtr',
    question:
      'Under the Working Time Regulations 1998, what is the maximum average working week unless the worker has signed a voluntary opt-out?',
    options: ['40 hours', '48 hours', '52 hours', '60 hours'],
    correctIndex: 1,
    explanation:
      'The Working Time Regulations 1998 set a maximum average working week of 48 hours (averaged over a 17-week reference period). Workers can sign a voluntary opt-out to exceed this, but the opt-out must be genuinely voluntary — employers cannot force it as a condition of employment. The regulations also guarantee minimum rest periods: 11 consecutive hours between shifts, one full day off per week (or two days off per fortnight), and a 20-minute break during any shift longer than 6 hours.',
  },
  {
    id: 'rsm4-s3-saying-no',
    question: 'What is the most common reason tradespeople struggle to say no to additional work?',
    options: [
      'They genuinely enjoy all work equally',
      'Fear of losing future work, damaging their reputation, or letting people down',
      'They are contractually obligated to accept all requests',
      'They do not understand how to say no politely',
    ],
    correctIndex: 1,
    explanation:
      'The fear of losing work, damaging their reputation, or letting people down is the primary reason tradespeople struggle with boundaries. In a relationship-driven industry where word of mouth is critical, saying no can feel risky. However, research on workplace burnout consistently shows that the inability to set boundaries is one of the strongest predictors of burnout, reduced quality of work, and ultimately, career failure — the very outcomes that tradespeople fear from saying no.',
  },
  {
    id: 'rsm4-s3-productivity',
    question:
      'Research on working hours and productivity shows that beyond a certain point, additional hours actually reduce output. What typically happens after about 50 hours per week?',
    options: [
      'Productivity continues to increase linearly',
      'Productivity remains the same but quality improves',
      'Productivity per hour drops sharply and total output barely increases or even decreases',
      'Productivity only drops if the worker is over 50 years old',
    ],
    correctIndex: 2,
    explanation:
      'Research by Stanford economist John Pencavel found that productivity per hour drops sharply after about 50 hours per week. At 55 hours, productivity has fallen so much that the extra hours produce almost no additional output. Beyond 60 hours, output actually decreases compared to a 50-hour week — meaning the additional hours are not just unproductive, they are counter-productive. Errors increase, decision-making deteriorates, and the time spent correcting mistakes exceeds the value of the extra work.',
  },
];

const faqs = [
  {
    question:
      'I am self-employed and feel I cannot turn down any work in case the phone stops ringing. What should I do?',
    answer:
      'This fear is extremely common among self-employed tradespeople, and it is understandable — irregular income and the feast-or-famine nature of the work create genuine anxiety about saying no. However, the research on burnout is clear: tradespeople who say yes to everything eventually burn out, and burnt-out tradespeople produce lower-quality work, get fewer recommendations, and ultimately earn less than those who work sustainably. The practical approach is to build a financial buffer (even a small one reduces the pressure to say yes to everything), develop a referral network (if you cannot take a job, recommend a trusted colleague — they will return the favour), and learn to offer alternatives rather than outright refusals ("I cannot start for three weeks, but I can pencil you in — or I can recommend someone who is available sooner"). Saying no to work that does not suit your schedule, your skills, or your rates is not losing business — it is protecting the quality and sustainability of your business.',
  },
  {
    question:
      'My employer expects me to answer calls and messages in the evening and at weekends. Am I entitled to switch off?',
    answer:
      'In the UK, there is currently no specific "right to disconnect" legislation (unlike in France and some other EU countries), but the Working Time Regulations 1998 guarantee minimum rest periods: 11 consecutive hours between shifts and one full day off per week. If your employer is requiring you to be available during your rest periods, this may constitute working time. More practically, the expectation of constant availability is a significant driver of stress and burnout. If your employer routinely contacts you outside working hours, it is worth having an honest conversation about expectations. Most reasonable employers, when presented with the evidence that out-of-hours contact reduces the quality of work the next day, are willing to set clearer boundaries. If you are self-employed, the boundary-setting is in your hands — decide on your cut-off time (e.g., no calls or messages after 6pm) and communicate it clearly to clients. Most clients respect boundaries when they are clearly stated upfront.',
  },
  {
    question: 'How do I quote realistically when clients always want it cheaper and faster?',
    answer:
      'Under-quoting and over-promising are two of the biggest sources of stress for self-employed tradespeople. The solution is transparency and confidence. First, be honest about timeframes — if a job will take five days, quote five days. Adding a "buffer day" for unexpected issues is sensible, not lazy. Second, itemise your quotes so clients can see exactly what they are paying for — this reduces the "can you do it cheaper?" conversations because the client understands where the money goes. Third, remember that the cheapest quote often is not what clients are really looking for — they want reliability, quality and clear communication. Electricians who charge fairly, communicate clearly and deliver on time build stronger reputations than those who under-quote, overcommit and then deliver late and stressed. If a client only cares about the lowest price, they are not your ideal client — and taking their work at a loss creates stress that affects every other job you are doing.',
  },
  {
    question: 'I feel guilty taking a day off even when I am exhausted. Is this normal?',
    answer:
      'Very normal, and it is one of the hallmarks of the construction industry\'s culture around work. The belief that "real workers don\'t take days off" is deeply embedded, particularly among the self-employed. But guilt about rest is not a sign of strong work ethic — it is a sign that your boundaries between work and identity have become blurred. Rest is not the opposite of productivity; it is the foundation of productivity. Research on recovery from work stress shows that people who take regular rest days (not just time off when they are ill or completely depleted) are more productive, make fewer errors, and sustain higher performance over the long term. Think of rest as maintenance, not luxury — you would not run a van for two years without a service, and your body and mind are no different. Taking a day off when you need it is an investment in your capacity to work well for the rest of the week, the rest of the month, and the rest of your career.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Working Time Regulations 1998, what is the minimum daily rest period between shifts?',
    options: [
      '8 consecutive hours',
      '10 consecutive hours',
      '11 consecutive hours',
      '12 consecutive hours',
    ],
    correctAnswer: 2,
    explanation:
      'The Working Time Regulations 1998 require a minimum of 11 consecutive hours of rest between finishing one shift and starting the next. This means that if you finish work at 6pm, you should not start your next shift until 5am the following day. This rest period is designed to ensure adequate recovery and sleep, and applies to all workers unless they have signed a specific opt-out.',
  },
  {
    id: 2,
    question:
      'Which of the following best explains why tradespeople often struggle to say no to additional work?',
    options: [
      'They are contractually required to accept all work offered to them',
      'Fear of losing future work, damaging reputation, and letting people down in a relationship-driven industry',
      'They do not understand the concept of work-life balance',
      'Additional work always increases their income proportionally',
    ],
    correctAnswer: 1,
    explanation:
      'In construction, reputation and word of mouth are critical to business success. Tradespeople often fear that saying no will damage their reputation, cost them future recommendations, or let down clients they have relationships with. This fear, while understandable, can lead to chronic overwork, burnout and ultimately poorer-quality work — which is more damaging to reputation than a politely declined job.',
  },
  {
    id: 3,
    question:
      'Research by Stanford economist John Pencavel found that worker output per hour drops significantly after how many hours per week?',
    options: ['35 hours', '40 hours', '50 hours', '60 hours'],
    correctAnswer: 2,
    explanation:
      "Pencavel's research found that productivity per hour begins to drop sharply after about 50 hours per week. By 55 hours, the extra hours are producing almost no additional output. Beyond 60 hours, total output actually decreases compared to a 50-hour week. This means that working 60 or 70 hours per week is not just unsustainable — it is actively counter-productive.",
  },
  {
    id: 4,
    question:
      'An electrician working 7 days a week for 6 months reports increasing errors, constant fatigue and arguments at home. This is best described as:',
    options: [
      'Normal hard work that will pay off eventually',
      'A temporary phase that will pass on its own',
      'Burnout caused by chronic overwork without adequate recovery',
      'A medical condition unrelated to working hours',
    ],
    correctAnswer: 2,
    explanation:
      'This pattern — increasing errors, persistent fatigue and relationship problems following sustained excessive work hours without rest — is a textbook description of occupational burnout. Burnout is characterised by emotional exhaustion, depersonalisation (feeling detached from your work and the people around you), and reduced personal accomplishment. It does not resolve on its own; it requires deliberate changes to workload, rest and boundaries.',
  },
  {
    id: 5,
    question:
      'What is the most effective way to set phone and email boundaries as a self-employed tradesperson?',
    options: [
      'Never answer the phone or respond to messages',
      'Decide on a clear cut-off time, communicate it to clients upfront, and stick to it consistently',
      'Only check messages once per day at lunchtime',
      'Have someone else manage all your communications',
    ],
    correctAnswer: 1,
    explanation:
      'Setting a clear boundary (e.g., "I am available by phone between 8am and 6pm, Monday to Friday. Outside these hours, please leave a message and I will get back to you the next working day") and communicating it consistently to clients is the most effective approach. Most clients respect boundaries when they are clearly stated upfront. The key is consistency — if you sometimes answer late-night messages and sometimes do not, clients learn that persistence works and will continue to contact you out of hours.',
  },
  {
    id: 6,
    question:
      'Which of the following is an example of setting a realistic expectation with a client?',
    options: [
      '"I can probably get that done by Friday" (when you know it will take until the following Wednesday)',
      '"The job will take five working days. I will start on Monday and finish by Friday the following week, allowing for any unforeseen issues."',
      '"I\'ll see what I can do" (without committing to a date)',
      '"I can do it this weekend if I work Saturday and Sunday"',
    ],
    correctAnswer: 1,
    explanation:
      'Giving a clear, honest timeframe with built-in contingency is the most professional and sustainable approach. It manages the client\'s expectations realistically, avoids the stress of an impossible deadline, and protects your reputation — because delivering on time (or early) is far better for your reputation than promising Friday and delivering Wednesday. Vague commitments ("probably", "I\'ll see") and overcommitting (working weekends) both create stress and erode trust.',
  },
  {
    id: 7,
    question:
      'The Working Time Regulations allow workers to opt out of the 48-hour weekly limit. Which of the following statements about the opt-out is TRUE?',
    options: [
      'The opt-out must be signed as a condition of employment',
      'The opt-out is permanent and cannot be revoked',
      'The opt-out must be genuinely voluntary and can be cancelled by the worker with notice',
      'The opt-out removes all protections including rest period requirements',
    ],
    correctAnswer: 2,
    explanation:
      'The 48-hour opt-out must be genuinely voluntary — employers cannot require it as a condition of employment, and workers have the right to cancel the opt-out by giving written notice (typically between one and three months, depending on the agreement). Importantly, even when workers opt out of the 48-hour limit, other protections remain in place, including minimum rest periods (11 hours between shifts, one day off per week) and the right to paid annual leave.',
  },
  {
    id: 8,
    question:
      'An electrician has been working 12-hour days, 6 days per week for three months. They believe they are being more productive. Based on the evidence, what is most likely happening?',
    options: [
      'They are producing significantly more output than someone working 8-hour days, 5 days per week',
      'Their total output is probably only slightly higher (or the same) as a 50-hour week, but their error rate has increased significantly',
      'They are producing twice the output of someone working normal hours',
      'Productivity is unaffected by working hours',
    ],
    correctAnswer: 1,
    explanation:
      "At 72 hours per week (12 hours x 6 days), the research indicates that productivity per hour is dramatically reduced. Total output is likely only marginally higher — or the same — as it would be at 50 hours per week, while error rates, accident risk and health consequences have increased significantly. The electrician's subjective perception of being more productive is contradicted by the evidence on diminishing returns from excessive working hours.",
  },
];

export default function RSMModule4Section3() {
  useSEO({
    title: 'Healthy Boundaries & Workload Management | RSM Module 4.3',
    description:
      'Saying no, Working Time Regulations, client expectations, phone and email boundaries, and escaping the overwork trap in the construction industry.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4">
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
            <ShieldOff className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Healthy Boundaries &amp; Workload Management
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Learning to say no, protecting your rest, setting realistic expectations, and escaping
            the overwork trap
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Saying no:</strong> Fear of losing work drives chronic overcommitment in the
                trades
              </li>
              <li>
                <strong>Regulations:</strong> 48-hour max week, 11 hours between shifts, 1 day off
                per week
              </li>
              <li>
                <strong>Diminishing returns:</strong> Output per hour drops sharply after 50 hours
                per week
              </li>
              <li>
                <strong>Digital boundaries:</strong> Constant availability is a choice, not a
                requirement
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Burnout:</strong> Poor boundaries are the number one predictor of
                occupational burnout
              </li>
              <li>
                <strong>Quality:</strong> Overworked electricians make more errors and produce
                lower-quality work
              </li>
              <li>
                <strong>Relationships:</strong> Working every hour destroys family life and personal
                wellbeing
              </li>
              <li>
                <strong>Career:</strong> Sustainable working patterns protect your long-term earning
                capacity
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why tradespeople struggle with boundaries and the consequences of chronic overcommitment',
              'State the key provisions of the Working Time Regulations 1998 relevant to construction workers',
              'Apply practical strategies for saying no to work without damaging client relationships',
              'Set effective phone, email and availability boundaries as an employed or self-employed tradesperson',
              'Explain the research on diminishing returns from excessive working hours',
              'Create a realistic working pattern that protects health, relationships and career longevity',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Saying No */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Saying No: Why Tradespeople Struggle with Boundaries
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In a relationship-driven industry where word of mouth is the primary source of new
                work, saying no feels dangerous. Every time a tradesperson declines a job, takes a
                day off, or tells a client they cannot start until next month, there is a voice in
                their head whispering:{' '}
                <em>
                  &ldquo;What if they go elsewhere? What if they tell other people? What if the
                  phone stops ringing?&rdquo;
                </em>
              </p>

              <p>
                This fear is not irrational &mdash; it is rooted in the genuine economic
                vulnerability of the trades. Self-employed electricians have no guaranteed income,
                no employer-funded sick pay, and no safety net if work dries up. Employed
                tradespeople may feel pressure from managers to accept overtime or additional
                responsibilities. The result is a workforce that chronically overcommits, working
                longer hours than is sustainable, taking on more jobs than they can handle, and
                sacrificing rest, relationships and health in the process.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Three Fears That Prevent Boundary-Setting
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">1. Fear of Losing Work</p>
                    <p className="text-xs text-white/80">
                      &ldquo;If I say no, they will find someone else and never call me
                      again.&rdquo; In reality, clients who value your work will wait or rebook.
                      Clients who go elsewhere because you are not immediately available are usually
                      the least profitable and most demanding customers anyway.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      2. Fear of Reputation Damage
                    </p>
                    <p className="text-xs text-white/80">
                      &ldquo;People will say I am unreliable or lazy.&rdquo; In reality, being
                      booked up is a sign of success, not failure. An electrician who says &ldquo;I
                      am fully booked for the next three weeks but I can start on the 15th&rdquo;
                      communicates demand and professionalism. An electrician who says yes to
                      everything and then delivers late, stressed and sloppy damages their
                      reputation far more.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      3. Fear of Letting People Down
                    </p>
                    <p className="text-xs text-white/80">
                      &ldquo;They are relying on me. I cannot let them down.&rdquo; This is
                      especially powerful when the work involves people you know personally or have
                      a long relationship with. But consistently saying yes when you should say no
                      leads to a worse outcome: overcommitted, exhausted, and eventually letting
                      everyone down because you simply cannot sustain the pace.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Sparky Who Said Yes to Everything
                  </p>
                </div>
                <p className="text-sm text-white">
                  Chris is a self-employed electrician who never says no. He takes every job, every
                  callback, every &ldquo;quick favour&rdquo;. He works 7 days a week, starting at
                  7am and often finishing at 8pm. He has not had a holiday in two years. He tells
                  himself he is &ldquo;building the business&rdquo;, but the reality is different:
                  he is constantly exhausted, his work quality has dropped (he received two
                  complaints in the last month &mdash; something that never happened when he was
                  rested), his relationship is under serious strain, and he has developed chronic
                  back pain that he ignores because he &ldquo;cannot afford to take time off&rdquo;.
                  Chris is not building a business &mdash; he is burning one down, along with his
                  health, his relationships and his reputation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Working Time Regulations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Working Time Regulations 1998: Know Your Rights
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Working Time Regulations 1998 establish minimum standards for working hours,
                rest periods and annual leave in the UK. Every construction worker &mdash; whether
                employed, agency or self-employed &mdash; should understand these provisions,
                because they exist to protect health and safety.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Provisions</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Maximum Working Week: 48 Hours
                    </p>
                    <p className="text-xs text-white/80">
                      The maximum average working week is 48 hours, calculated over a 17-week
                      reference period. This means you can work more than 48 hours in some weeks as
                      long as the average over 17 weeks does not exceed 48. Workers can sign a
                      voluntary opt-out to exceed this limit, but the opt-out must be genuinely
                      voluntary &mdash; employers cannot make it a condition of employment, and
                      workers can cancel the opt-out with written notice.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Daily Rest: 11 Consecutive Hours
                    </p>
                    <p className="text-xs text-white/80">
                      Workers are entitled to 11 consecutive hours of rest between finishing one
                      shift and starting the next. If you finish at 7pm, you should not start before
                      6am the following day. This rest period is essential for sleep recovery and is
                      a legal minimum, not a guideline.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Weekly Rest: 1 Day Off Per Week
                    </p>
                    <p className="text-xs text-white/80">
                      Workers are entitled to at least one uninterrupted 24-hour period off in each
                      7-day period, or two uninterrupted 24-hour periods in each 14-day period.
                      Working 7 days a week continuously is not just exhausting &mdash; it is a
                      breach of the regulations.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      In-Work Rest: 20 Minutes Per 6 Hours
                    </p>
                    <p className="text-xs text-white/80">
                      Workers are entitled to a minimum 20-minute uninterrupted rest break during
                      any shift lasting more than 6 hours. This break should be taken away from the
                      workstation and cannot be taken at the start or end of the shift.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    The 48-Hour Opt-Out Is Not a Badge of Honour:
                  </strong>{' '}
                  In construction, signing the opt-out is often treated as a normal part of starting
                  a new job. Many workers sign it without understanding what they are opting out of.
                  The culture treats long hours as proof of dedication, and anyone who wants to work
                  &ldquo;only&rdquo; 48 hours risks being seen as uncommitted. This culture needs to
                  change. The 48-hour limit exists because research shows that consistently
                  exceeding it increases the risk of accidents, health problems and burnout. Opting
                  out should be a conscious, informed decision &mdash; not a box you tick on your
                  first day because everyone else has.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Setting Realistic Expectations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Setting Realistic Expectations with Clients
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the biggest sources of stress for self-employed tradespeople is the gap
                between what clients expect and what is realistically achievable. This gap is
                usually created by the tradesperson themselves &mdash; by under-quoting to win the
                job, over-promising on timescales, or failing to communicate potential complications
                upfront.
              </p>

              <p>
                The solution is not to lower your standards or turn away clients. It is to set
                expectations clearly and honestly from the start, and then to deliver what you
                promised. Under-promise and over-deliver is one of the oldest principles in
                business, and it works: clients who are told a job will take five days and are
                finished in four are delighted. Clients who are told three days and are still
                waiting on day five are angry. Same job, same quality, but the experience is
                completely different based on the expectations that were set.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Strategies for Realistic Quoting
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Add contingency time:</strong> If you think a job will take three
                      days, quote four. This accounts for unforeseen issues (unexpected cable
                      routes, parts that need ordering, access problems) and gives you a buffer that
                      reduces stress enormously.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Itemise your quotes:</strong> Break down what is included and what is
                      not. This prevents scope creep (&ldquo;while you are here, could you
                      also...&rdquo;) and gives clients a clear understanding of what they are
                      paying for.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>State your availability clearly:</strong> &ldquo;I can start on the
                      15th&rdquo; is better than &ldquo;I will try to fit you in next week.&rdquo;
                      Clear dates manage expectations and prevent the stress of trying to juggle
                      overlapping commitments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Communicate proactively:</strong> If a job is going to overrun, tell
                      the client as soon as you know &mdash; not at 4pm on the day it was supposed
                      to finish. Early communication preserves trust; late surprises destroy it.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Digital Boundaries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Digital Boundaries: When to Stop Answering the Phone
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The smartphone has made it possible to be available 24 hours a day, 7 days a week.
                For many self-employed tradespeople, this possibility has become an expectation
                &mdash; both from clients and from themselves. The phone rings at 9pm on a Tuesday
                and you answer it because &ldquo;it might be important&rdquo;. A client sends a
                WhatsApp at 10pm on Saturday asking for a quote, and you reply because &ldquo;I do
                not want to seem unprofessional&rdquo;. Over time, the boundary between work and
                personal life dissolves completely.
              </p>

              <p>
                This constant availability is one of the most damaging habits for stress resilience.
                Research on recovery from work stress shows that{' '}
                <strong>psychological detachment</strong>
                &mdash; mentally switching off from work during non-work time &mdash; is essential
                for recovery, sleep quality and long-term wellbeing. If you are answering work
                messages at 10pm, you are not psychologically detached from work, even if you are
                physically at home. Your stress response system stays activated, sleep quality
                suffers, and you start the next day already depleted.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Setting Effective Digital Boundaries
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Set a cut-off time:</strong> Decide on a time (e.g., 6pm) after which
                      you do not answer work calls or messages. Set your phone to &ldquo;Do Not
                      Disturb&rdquo; with exceptions only for family.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use a business voicemail:</strong> A clear voicemail message
                      (&ldquo;Thanks for calling. I am available Monday to Friday, 8am to 6pm.
                      Please leave a message and I will get back to you on the next working
                      day&rdquo;) sets expectations professionally.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Separate work and personal phones:</strong> If possible, use a
                      separate phone for work. This allows you to physically switch off from work by
                      putting the work phone in a drawer for the evening. If a separate phone is not
                      practical, at least use separate notification settings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Communicate boundaries upfront:</strong> Tell new clients your
                      availability when you first engage with them. &ldquo;I am available by phone
                      between 8am and 6pm, Monday to Friday&rdquo; is professional, not lazy. Most
                      clients respect boundaries that are clearly communicated.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The No-Calls-After-6pm Rule
                  </p>
                </div>
                <p className="text-sm text-white">
                  Sarah is a self-employed electrician who used to answer her phone at all hours.
                  Clients would call at 8pm, 9pm, even 10:30pm, and she always answered because she
                  was afraid of missing work. She was constantly stressed, her evenings were never
                  truly free, and she found it impossible to switch off. After learning about
                  psychological detachment and recovery, she implemented a simple rule: no work
                  calls after 6pm. She updated her voicemail, told her regular clients, and put her
                  phone on Do Not Disturb every evening. The result? She did not lose a single
                  client. Most did not even notice. The few who commented said they actually
                  respected the boundary. Sarah reported that within two weeks her sleep improved,
                  her evenings felt genuinely restful, and she started the next working day with
                  more energy and focus. The small fear of losing work was completely unfounded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: The Overwork Trap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Overwork Trap: More Hours Does Not Equal More Productivity
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a deeply held belief in construction (and many other industries) that more
                hours equals more output. If you work 60 hours instead of 40, you get 50% more done.
                If you work 7 days instead of 5, you complete 40% more. This feels intuitively
                correct, but the research tells a very different story.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Evidence on Diminishing Returns
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Stanford economist John Pencavel analysed decades of data on working hours and
                  productivity. His findings were striking:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Up to 50 Hours</p>
                    <p className="text-xs text-white/80">
                      Output per hour remains roughly constant. Working 50 hours produces
                      proportionally more output than working 40 hours.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">50-55 Hours</p>
                    <p className="text-xs text-white/80">
                      Productivity per hour starts to fall sharply. The extra hours produce
                      significantly less output per hour than the first 50.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">55-60 Hours</p>
                    <p className="text-xs text-white/80">
                      Total output is barely higher than at 50 hours. The additional 5&ndash;10
                      hours produce almost no measurable increase in output.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Beyond 60 Hours</p>
                    <p className="text-xs text-white/80">
                      Total output actually <em>decreases</em> compared to a 50-hour week. The
                      errors, rework, accidents and health consequences of excessive hours more than
                      offset any additional output. You are literally getting less done by working
                      more.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                This evidence applies directly to construction. An electrician working 70 hours a
                week is not producing 75% more than one working 40 hours. They are probably
                producing about the same output &mdash; but with more errors, more callbacks, more
                health problems, and a far higher risk of an accident that could end their career.
                The extra hours are not just unproductive; they are actively harmful.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Hidden Costs of Overwork</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Increased errors:</strong> Fatigue impairs concentration and attention
                      to detail. Callbacks and rework cost time and money that wipe out the supposed
                      benefit of the extra hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Accident risk:</strong> The risk of workplace accidents increases
                      significantly after the 8th hour of a shift and doubles after the 12th hour.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Health consequences:</strong> Chronic overwork increases the risk of
                      cardiovascular disease, musculoskeletal problems, depression and anxiety.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Relationship damage:</strong> Working every evening and weekend erodes
                      family relationships, friendships and social connections &mdash; the very
                      relationships that protect your mental health (as we covered in Section 2).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Real Calculation:</strong> If you work 70
                  hours per week at a reduced hourly rate (because you are exhausted and less
                  productive), make errors that require callbacks, damage your health (leading to
                  time off), and destroy your relationships (leading to emotional distress that
                  further reduces performance) &mdash; you are almost certainly worse off than
                  someone working 45&ndash;50 hours at full productivity, with time for rest,
                  exercise and the people who matter to them. Sustainable working patterns are not
                  lazy &mdash; they are smart.
                </p>
              </div>
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
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Summary of Key Principles</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Saying no</strong> protects the quality of the work you say yes to
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Working Time Regulations</strong> exist to protect health — 48 hours
                      max, 11 hours rest between shifts, 1 day off per week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Realistic expectations</strong> build trust; over-promising destroys
                      it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Digital boundaries</strong> are essential for psychological recovery
                      from work stress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>More hours does not equal more output</strong> — beyond 50 hours,
                      returns diminish rapidly
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: Financial Stress &amp; Practical Problem-Solving
                </p>
                <p className="text-sm text-white/80">
                  Financial stress is the number one stressor for self-employed tradespeople. In
                  Section 4, we cover building emergency funds, CIS tax planning, debt management,
                  insurance protection, and where to get financial help when you need it.
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
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4-section-4">
              Next: Financial Stress
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
