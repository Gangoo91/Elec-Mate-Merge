import { ArrowLeft, Sunset, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'What does the "4% rule" suggest about retirement withdrawals?',
    options: [
      'You should save 4% of your income for retirement',
      'You can withdraw 4% of your pension pot in the first year and adjust for inflation, with a high probability of not running out',
      'Pension funds grow by at least 4% per year',
      'You pay 4% tax on pension withdrawals',
    ],
    correctAnswer: 1,
    explanation:
      'The 4% rule is a guideline suggesting you can withdraw 4% of your pot in year one, then adjust for inflation each year, with a strong probability your money lasts 30+ years. It is a planning tool, not a guarantee.',
  },
  {
    id: 2,
    question:
      'What percentage of a defined contribution pension pot can you take tax-free from age 55?',
    options: ['10%', '20%', '25%', '50%'],
    correctAnswer: 2,
    explanation:
      'You can take 25% of your pension pot as a tax-free lump sum from age 55 (rising to 57 from 2028). The remaining 75% is taxed as income when you withdraw it.',
  },
  {
    id: 3,
    question: 'When is the minimum pension access age rising from 55 to 57?',
    options: ['2025', '2026', '2028', '2030'],
    correctAnswer: 2,
    explanation:
      'The minimum pension access age is rising from 55 to 57 on 6 April 2028. This is linked to the State Pension age rising to 67 and remains 10 years below the State Pension age.',
  },
  {
    id: 4,
    question: 'What is "flexi-access drawdown"?',
    options: [
      'Taking your entire pension pot in one go',
      'Keeping your pension invested while taking regular or ad-hoc income from it',
      'Converting your pension into a guaranteed annuity',
      'Moving your pension to a different provider',
    ],
    correctAnswer: 1,
    explanation:
      'Flexi-access drawdown lets you keep your pension invested while withdrawing income as you need it. Your pot continues to grow (or shrink) based on investment performance, and you control how much you take and when.',
  },
  {
    id: 5,
    question: 'What is an annuity?',
    options: [
      'A type of pension contribution',
      'A tax-free lump sum from your pension',
      'A product that converts your pension pot into a guaranteed income for life',
      'A government top-up to your State Pension',
    ],
    correctAnswer: 2,
    explanation:
      'An annuity is a financial product purchased from an insurance company. You hand over your pension pot (or part of it) and in return receive a guaranteed income for the rest of your life, no matter how long you live.',
  },
  {
    id: 6,
    question: 'Why is career transition planning particularly important for electricians?',
    options: [
      'Because electricians earn more than other trades',
      'Because electrical work is physically demanding and becomes harder in your late 50s and 60s',
      'Because electricians must retire at 60',
      'Because the electrical regulations change too frequently',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical work involves physical demands &mdash; crawling through lofts, lifting cable drums, working in confined spaces. Many electricians find this increasingly difficult from their late 50s. Planning a transition to supervision, testing, training, or consultancy allows you to continue earning while reducing physical strain.',
  },
  {
    id: 7,
    question: 'What is the "three-pot approach" to retirement income?',
    options: [
      'Having three separate bank accounts',
      'Combining State Pension, private/workplace pension, and other savings/investments',
      'Splitting your pension into thirds at retirement',
      'Using three different pension providers',
    ],
    correctAnswer: 1,
    explanation:
      'The three-pot approach means building retirement income from multiple sources: the State Pension (guaranteed, inflation-linked), private/workplace pensions (tax-efficient, flexible), and other savings such as ISAs, property, or part-time work income.',
  },
  {
    id: 8,
    question: 'Pension Wise offers free retirement guidance. Who is eligible?',
    options: [
      'Anyone aged 18 or over',
      'Anyone aged 40 or over',
      'Anyone aged 50 or over with a defined contribution pension',
      'Only people who have already retired',
    ],
    correctAnswer: 2,
    explanation:
      'Pension Wise is a free, impartial government service for anyone aged 50 or over with a defined contribution pension. It offers a one-hour appointment (phone, online, or face-to-face) covering your pension options at retirement.',
  },
];

export default function PFModule4Section4() {
  useSEO({
    title: 'Planning for Retirement | Pensions & Retirement Planning | Personal Finance',
    description:
      'How much you need, pension freedoms, career transition planning, the three-pot approach, and pension calculators for UK electricians.',
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
              <Link to="../pf-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Page header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <Sunset className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-1">
                  <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                  <span className="text-white text-xs">&bull;</span>
                  <span className="text-white text-xs">SECTION 4</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Planning for Retirement
                </h1>
              </div>
            </div>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Knowing how pensions work is only half the story. The other half is building a
              concrete plan &mdash; how much you need, when you can access it, how to transition
              your career, and the free tools and guidance available to help you get there.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h3>
              <p className="text-white text-sm leading-relaxed">
                Use the 4% rule to estimate how large your pension pot needs to be. From age 55
                (rising to 57 in 2028), you can access 25% tax-free and draw down the rest as
                income. Plan your career transition from physical work towards supervision, testing,
                or training. Build three income sources: State Pension + private pension + other
                savings. Use MoneyHelper and Pension Wise for free guidance.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Why It Matters</h3>
              <p className="text-white text-sm leading-relaxed">
                Retirement is not a distant abstraction &mdash; it is a phase of life that could
                last 20&ndash;30 years. Without a plan, you risk either working longer than you
                want, retiring into poverty, or making costly mistakes with your pension pot when
                you finally access it. A few hours of planning now can save decades of worry.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <h2 className="text-white font-bold text-lg mb-4">What You Will Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'How to use the 4% rule and PLSA standards to set a retirement income target',
                'Pension freedoms: 25% tax-free, drawdown, and annuities explained',
                'Career transition strategies for electricians approaching retirement',
                'The three-pot approach to building diverse retirement income',
                'Free pension calculators and guidance services available to you',
                'The Pension Tracing Service for finding lost pension pots',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 01: How Much You Need */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">01</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                How Much Do You Need?
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The amount you need in retirement depends on the lifestyle you want. In Section 1,
                we covered the PLSA Retirement Living Standards. Now let us translate those into
                concrete pension pot targets.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">The 4% Rule</h3>
              <p>
                The <strong className="text-white">4% rule</strong> (also known as the &ldquo;safe
                withdrawal rate&rdquo;) is a widely-used guideline from retirement research. It
                suggests that if you withdraw 4% of your pension pot in the first year of
                retirement, then adjust for inflation each year, your money has a high probability
                of lasting at least 30 years.
              </p>
              <p>To use the 4% rule in reverse, multiply your required annual income by 25:</p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  Pension Pot Targets (Single Person)
                </h4>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">
                        Minimum (&pound;12,800/year)
                      </span>
                      <span className="text-rose-400 font-bold">&pound;32,500 pot</span>
                    </div>
                    <p className="text-white text-sm">
                      State Pension covers &pound;11,500. Gap of &pound;1,300/year. Pot needed:
                      &pound;1,300 &times; 25 = &pound;32,500
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">
                        Moderate (&pound;23,300/year)
                      </span>
                      <span className="text-amber-400 font-bold">&pound;295,000 pot</span>
                    </div>
                    <p className="text-white text-sm">
                      Gap of &pound;11,800/year after State Pension. Pot needed: &pound;11,800
                      &times; 25 = &pound;295,000
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">
                        Comfortable (&pound;37,300/year)
                      </span>
                      <span className="text-green-400 font-bold">&pound;645,000 pot</span>
                    </div>
                    <p className="text-white text-sm">
                      Gap of &pound;25,800/year after State Pension. Pot needed: &pound;25,800
                      &times; 25 = &pound;645,000
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Important Caveats
              </h3>
              <p>The 4% rule is a useful starting point but not a guaranteed formula:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    It assumes a 30-year retirement &mdash; if you retire at 57 and live to 95, that
                    is 38 years, and you may need a slightly lower withdrawal rate
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    It is based on historical US market data &mdash; future returns could be
                    different, though the principle remains sound
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    It does not account for large one-off expenses (care home fees, helping children
                    buy a home, major home repairs)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    The 25% tax-free lump sum effectively reduces the pot available for drawdown
                  </span>
                </li>
              </ul>
              <p>
                Despite these caveats, the 4% rule gives a useful ballpark figure. For more precise
                planning, use the pension calculators mentioned later in this section.
              </p>
            </div>
          </section>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-4-4-check1"
            question="Using the 4% rule, what size pension pot would you need to generate &pound;15,000 per year in retirement income?"
            options={['&pound;150,000', '&pound;250,000', '&pound;375,000', '&pound;600,000']}
            correctIndex={2}
            explanation="&pound;15,000 divided by 4% = &pound;15,000 &times; 25 = &pound;375,000. This is the pot you would need to withdraw &pound;15,000 in year one and adjust for inflation, with a high probability of lasting 30+ years."
          />

          {/* Section 02: Pension Freedoms */}
          <section className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-4">
              <span className="text-amber-400 text-xs font-bold tracking-wider">02</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Pension Freedoms &mdash; Your Options at Retirement
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Since April 2015, the <strong className="text-white">pension freedoms</strong>{' '}
                reforms have given you far more control over how you access your defined
                contribution pension pot. You are no longer forced to buy an annuity. Instead, you
                have several options.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                When Can You Access Your Pension?
              </h3>
              <p>
                Currently, the earliest you can access a private pension is age{' '}
                <strong className="text-white">55</strong>. This is rising to{' '}
                <strong className="text-white">57 on 6 April 2028</strong>, maintaining the gap of
                10 years below the State Pension age. The State Pension can only be claimed from
                State Pension age (currently 66, rising to 67 by 2028).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">Your Four Main Options</h4>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">1. 25% Tax-Free Lump Sum</p>
                    <p className="text-white text-sm mt-1">
                      You can take up to 25% of your pension pot as a tax-free cash lump sum. This
                      can be taken all at once or in stages (called &ldquo;uncrystallised funds
                      pension lump sum&rdquo; or UFPLS). For a &pound;300,000 pot, that is
                      &pound;75,000 tax-free. Many people use this to clear a mortgage, make home
                      improvements, or create an accessible cash reserve.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">2. Flexi-Access Drawdown</p>
                    <p className="text-white text-sm mt-1">
                      Keep your pension invested and withdraw income as you need it. You control the
                      amount and timing. Your pot continues to grow (or shrink) based on market
                      performance. This is the most flexible option and the most popular among
                      people with larger pots. Withdrawals (beyond the 25% tax-free portion) are
                      taxed as income.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">3. Annuity</p>
                    <p className="text-white text-sm mt-1">
                      Hand over your pot (or part of it) to an insurance company in exchange for a
                      guaranteed income for life. Once purchased, the income is fixed (or increases
                      at a set rate). You lose access to the pot but gain certainty. Annuity rates
                      vary &mdash; shop around. Joint-life annuities continue paying a reduced
                      amount to a surviving spouse.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">4. Cash Out Entirely</p>
                    <p className="text-white text-sm mt-1">
                      You can take the whole pot as cash in one go. The first 25% is tax-free; the
                      remaining 75% is added to your taxable income for that year. For anything
                      other than very small pots, this is usually a bad idea because it pushes you
                      into a higher tax bracket and can trigger 40% or 45% tax on a large chunk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Beware Pension Scams</h4>
                <p className="text-white text-sm leading-relaxed">
                  Since pension freedoms, scammers have targeted retirees with offers to
                  &ldquo;unlock&rdquo; pensions early (before 55), invest in exotic schemes, or
                  transfer to overseas pensions. Any unsolicited contact about your pension is
                  almost certainly a scam. Never give your pension details to cold callers. The
                  Financial Conduct Authority (FCA) maintains a &ldquo;ScamSmart&rdquo; register at
                  <strong className="text-white"> fca.org.uk/scamsmart</strong>.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Combining Options
              </h3>
              <p>
                You do not have to choose just one option. Many people take the 25% tax-free lump
                sum to clear debts and create a cash buffer, use drawdown for flexible income in
                early retirement, and then purchase a smaller annuity later in life (perhaps at 75
                or 80) when annuity rates are higher due to their age, providing a guaranteed income
                for their remaining years.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Tax Implications
              </h3>
              <p>
                Beyond the 25% tax-free portion, all pension withdrawals are taxed as income. The
                key is to withdraw at a rate that keeps you within the basic rate tax band where
                possible. For 2024/25, you can withdraw up to &pound;50,270 per year (including the
                State Pension) before hitting the 40% higher rate. Careful tax planning in the early
                years of retirement can save thousands of pounds.
              </p>
            </div>
          </section>

          {/* Section 03: Career Transition Planning */}
          <section className="space-y-4">
            <div className="border-l-2 border-green-500 pl-4">
              <span className="text-green-400 text-xs font-bold tracking-wider">03</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Career Transition Planning for Electricians
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Retirement is rarely an overnight switch from full-time work to full-time leisure.
                For electricians, whose work is physically demanding, planning a gradual transition
                is both financially sensible and better for your health and wellbeing.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                The Physical Reality
              </h3>
              <p>
                Electrical work takes a physical toll. Crawling through loft spaces, pulling cables,
                lifting heavy distribution boards, and working in awkward positions causes wear and
                tear on joints, knees, backs, and shoulders. Many electricians notice these issues
                becoming more limiting from their late 50s. Planning your transition before you are
                forced into one by your body gives you far more options.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  Transition Pathways for Electricians
                </h4>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Supervision &amp; Management</p>
                    <p className="text-white text-sm mt-1">
                      Move from tools to managing teams. Site supervision, project management,
                      estimating, and contract management are natural progressions. Many contractors
                      need experienced electricians who can oversee projects without doing the
                      physical work themselves.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Inspection &amp; Testing</p>
                    <p className="text-white text-sm mt-1">
                      Periodic inspection and testing is less physically demanding than installation
                      work. An experienced electrician with the right qualifications (C&amp;G 2391
                      or equivalent) can build a profitable practice doing EICRs, landlord
                      certificates, and condition reports well into their 60s and beyond.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Teaching &amp; Training</p>
                    <p className="text-white text-sm mt-1">
                      Colleges, training providers, and manufacturers need experienced electricians
                      to teach apprentices and deliver CPD courses. A PTLLS/CTLLS teaching
                      qualification combined with your trade experience is a powerful combination.
                      Some electricians build successful second careers as freelance trainers.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Consultancy &amp; Design</p>
                    <p className="text-white text-sm mt-1">
                      Electrical design, energy assessments, EV charging consultancy, and building
                      regulations compliance are desk-based roles that leverage decades of practical
                      experience. These can be done from home and command premium rates.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Part-Time &amp; Selective Work
                    </p>
                    <p className="text-white text-sm mt-1">
                      Instead of stopping entirely, reduce to three or four days per week. Choose
                      lighter jobs (socket upgrades, consumer unit changes, fault finding) over
                      heavy installation work. Combine part-time earnings with pension income for a
                      comfortable semi-retirement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Start Planning at 40</h4>
                <p className="text-white text-sm leading-relaxed">
                  The best time to start planning your transition is in your early 40s &mdash; not
                  when you are 60 and already struggling physically. At 40, you have time to gain
                  additional qualifications (inspection and testing, teaching, design), build a
                  reputation in your new area, and make a gradual shift. Leaving it until you are
                  forced to change limits your options severely.
                </p>
              </div>
            </div>
          </section>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-4-4-check2"
            question="An electrician takes their 25% tax-free lump sum from a &pound;200,000 pension pot. How much tax-free cash do they receive?"
            options={['&pound;25,000', '&pound;40,000', '&pound;50,000', '&pound;75,000']}
            correctIndex={2}
            explanation="25% of &pound;200,000 = &pound;50,000 tax-free. The remaining &pound;150,000 stays in the pension and is taxed as income when withdrawn through drawdown or used to buy an annuity."
          />

          {/* Section 04: The Three-Pot Approach */}
          <section className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <span className="text-blue-400 text-xs font-bold tracking-wider">04</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                The Three-Pot Approach to Retirement Income
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Relying on a single source of retirement income is risky. The most resilient
                retirement plans combine multiple income streams. The{' '}
                <strong className="text-white">three-pot approach</strong> is a simple framework for
                thinking about this.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">The Three Pots</h4>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                        Pot 1
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm">State Pension</p>
                        <p className="text-white text-sm mt-1">
                          Guaranteed, inflation-linked income for life. Currently up to
                          &pound;221.20 per week (&pound;11,502/year). Available from State Pension
                          age (66, rising to 67). You cannot outlive it and it cannot go down. This
                          is your bedrock.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                        Pot 2
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Private/Workplace Pension
                        </p>
                        <p className="text-white text-sm mt-1">
                          Tax-efficient savings pot built up over your career. Accessible from 55
                          (rising to 57). Flexible &mdash; you control withdrawals. Subject to
                          investment risk but benefits from tax relief and (if employed) employer
                          contributions. This fills the gap between the State Pension and your
                          target income.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                        Pot 3
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Other Savings &amp; Income
                        </p>
                        <p className="text-white text-sm mt-1">
                          ISAs (tax-free), general savings, rental property income, part-time work
                          income, or other investments. These provide flexibility and a bridge
                          between early retirement and State Pension age. ISAs are particularly
                          valuable because withdrawals are completely tax-free.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Why Multiple Pots Matter
              </h3>
              <p>Each pot has different strengths:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    The <strong className="text-white">State Pension</strong> provides certainty
                    &mdash; you know it will be paid for life, adjusted for inflation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Private pensions</strong> provide tax efficiency
                    and long-term growth through investment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">ISAs and other savings</strong> provide
                    flexibility &mdash; no age restrictions, no tax on withdrawals, accessible in
                    emergencies
                  </span>
                </li>
              </ul>
              <p>
                If one pot underperforms (for example, your pension investments have a bad year),
                the others can compensate. This diversification is the financial equivalent of not
                putting all your eggs in one basket.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">The Bridge Strategy</h4>
                <p className="text-white text-sm leading-relaxed">
                  Many electricians want to stop or reduce physical work before State Pension age.
                  The bridge strategy uses ISAs and private pension drawdown to cover the gap years.
                  For example, if you stop full-time work at 60 and the State Pension starts at 67,
                  you need seven years of income from other sources. At &pound;20,000 per year, that
                  is &pound;140,000 in accessible savings or pension drawdown. Planning for this
                  bridge is essential.
                </p>
              </div>
            </div>
          </section>

          {/* Section 05: Pension Calculators & Guidance */}
          <section className="space-y-4">
            <div className="border-l-2 border-purple-500 pl-4">
              <span className="text-purple-400 text-xs font-bold tracking-wider">05</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Free Pension Calculators &amp; Guidance
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                You do not need to pay a financial adviser to start planning (though professional
                advice is valuable for complex situations). Several free tools and services can help
                you build a retirement plan.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">Free Tools &amp; Services</h4>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">
                      MoneyHelper Pension Calculator
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">moneyhelper.org.uk/pensions-calculator</strong>{' '}
                      &mdash; a comprehensive retirement planning tool. Enter your age, current
                      savings, contribution levels, and target retirement date. It shows whether you
                      are on track and how much more you need to save. Free and impartial (backed by
                      the Money and Pensions Service, an arm&rsquo;s-length government body).
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Pension Wise</p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">pensionwise.gov.uk</strong> &mdash; free,
                      impartial guidance for anyone aged 50 or over with a defined contribution
                      pension. Offers a one-hour appointment (phone, online video, or face-to-face
                      through Citizens Advice) covering your options at retirement. This is not
                      regulated financial advice but it covers the key decisions you need to make.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">State Pension Forecast</p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">gov.uk/check-state-pension</strong> &mdash;
                      check how much State Pension you are on track to receive, your State Pension
                      date, and any gaps in your NI record.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      MoneyHelper Retirement Adviser Directory
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">
                        moneyhelper.org.uk/choosing-a-financial-adviser
                      </strong>{' '}
                      &mdash; if you want professional financial advice (recommended for pots over
                      &pound;100,000), this directory helps you find a regulated adviser in your
                      area. A good adviser can help with drawdown strategy, tax planning, and
                      investment choices.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                The Pension Tracing Service
              </h3>
              <p>
                If you have lost track of an old workplace pension (common for electricians who have
                worked for multiple employers), the{' '}
                <strong className="text-white">Pension Tracing Service</strong> can help you find
                it. Contact them on:
              </p>
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-white font-semibold text-sm mb-1">Pension Tracing Service</p>
                <p className="text-white text-sm">
                  Phone: <strong className="text-white">0800 731 0193</strong> (free, Monday to
                  Friday, 9am to 5pm)
                </p>
                <p className="text-white text-sm mt-1">
                  Online:{' '}
                  <strong className="text-white">gov.uk/find-pension-contact-details</strong>
                </p>
                <p className="text-white text-sm mt-2 leading-relaxed">
                  They hold contact details for over 200,000 workplace and personal pension schemes.
                  If you worked for an electrical contractor 15 years ago and cannot remember the
                  pension provider, they can often find it. Reuniting with a lost pension pot could
                  add thousands to your retirement income.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                When to Seek Professional Advice
              </h3>
              <p>
                Free guidance services cover the basics, but professional financial advice is
                recommended if:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Your pension pot is over &pound;100,000 (in fact, if your pot exceeds the value
                    that would buy a guaranteed income of &pound;10,000/year, your pension provider
                    must signpost you to Pension Wise or an adviser before you access it)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    You have a defined benefit (final salary) pension and are considering
                    transferring it &mdash; you are legally required to take advice for transfers
                    over &pound;30,000
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    You want to optimise tax efficiency across multiple pension pots and income
                    sources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Your circumstances are complex (divorce, overseas pensions, inheritance
                    planning)
                  </span>
                </li>
              </ul>
              <p>
                A good financial adviser typically charges &pound;500&ndash;&pound;2,000 for a
                comprehensive retirement plan. For a pension pot worth hundreds of thousands of
                pounds, this is money well spent.
              </p>
            </div>
          </section>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-4-4-check3"
            question="What is the phone number for the Pension Tracing Service?"
            options={['0800 731 0175', '0800 731 0193', '0800 138 7777', '0345 600 0707']}
            correctIndex={1}
            explanation="The Pension Tracing Service can be reached on 0800 731 0193 (free call, Monday to Friday, 9am to 5pm). They can help you find contact details for lost or forgotten workplace pensions."
          />

          {/* Section 06: Putting It All Together */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">06</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Putting It All Together &mdash; Your Retirement Action Plan
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Retirement planning can feel overwhelming, but it breaks down into a handful of
                concrete steps. Here is a practical action plan regardless of your age or current
                pension savings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  Your Retirement Action Plan
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Step 1
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Know Where You Stand</p>
                      <p className="text-white text-sm mt-1">
                        Check your State Pension forecast. Log in to every pension account you have.
                        Add up the total. This is your starting point.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Step 2
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Set a Target</p>
                      <p className="text-white text-sm mt-1">
                        Use the PLSA standards to decide the retirement lifestyle you want. Use the
                        4% rule to calculate the pot you need. Be realistic but ambitious.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Step 3
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Close the Gap</p>
                      <p className="text-white text-sm mt-1">
                        Use a pension calculator to find the monthly contribution needed. Set up the
                        direct debit. If employed, check if your employer matches higher
                        contributions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Step 4
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Protect Your State Pension</p>
                      <p className="text-white text-sm mt-1">
                        If self-employed, pay Class 2 NI. Check for gaps and fill them if cost-
                        effective. Aim for 35 qualifying years.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Step 5
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Plan Your Transition</p>
                      <p className="text-white text-sm mt-1">
                        Think about what your work will look like in your 50s and 60s. Start
                        building the qualifications and reputation for your next phase now.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Step 6
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">Review Annually</p>
                      <p className="text-white text-sm mt-1">
                        Once a year, check your pension pot, review your contributions, and adjust
                        your plan. Increase contributions when income rises. Consolidate old pots if
                        it makes sense.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Age-Specific Priorities
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">In Your 20s</p>
                  <p className="text-white text-sm leading-relaxed">
                    Start now, even if it is &pound;50 per month. Time is your greatest asset. Opt
                    in to your workplace pension. Set up a SIPP if self-employed. Check your NI
                    record is building qualifying years.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">In Your 30s</p>
                  <p className="text-white text-sm leading-relaxed">
                    Increase contributions as your income grows. Aim for at least 10&ndash;15% of
                    income. Consider overpaying your mortgage as part of your retirement strategy
                    (being mortgage-free at retirement dramatically reduces your income needs).
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">In Your 40s</p>
                  <p className="text-white text-sm leading-relaxed">
                    Take stock. Consolidate old pension pots. Increase contributions to
                    15&ndash;20%. Start thinking about your career transition. Consider additional
                    qualifications for less physical roles.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">In Your 50s</p>
                  <p className="text-white text-sm leading-relaxed">
                    Book a Pension Wise appointment. Maximise contributions (use carry-forward to
                    use unused allowances from the last three years). Plan your drawdown strategy.
                    Get professional advice if your pot exceeds &pound;100,000. Start building ISA
                    savings as a bridge fund.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">The Most Important Step</h4>
                <p className="text-white text-sm leading-relaxed">
                  Whatever your age, the most important step is the first one. Check your State
                  Pension forecast. Log in to your pension accounts. Use a calculator to see where
                  you stand. Knowledge is the foundation of every good retirement plan &mdash; and
                  it takes five minutes.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-white text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I access my pension before 55?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  In very limited circumstances &mdash; if you have a terminal illness with less
                  than 12 months to live, or if your pension scheme has a &ldquo;protected pension
                  age&rdquo; (rare). Anyone who contacts you offering to &ldquo;unlock&rdquo; your
                  pension before 55 is almost certainly running a scam. Report them to the FCA.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Should I pay off my mortgage or save into a pension?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Both are valuable. In general, if your employer matches pension contributions,
                  prioritise the pension up to the employer match (it is free money). After that,
                  compare your mortgage interest rate to the expected pension return. If your
                  mortgage charges 5% and your pension is likely to return 6&ndash;7%, the pension
                  may be better &mdash; but mortgage overpayment is guaranteed while investment
                  returns are not. Many people do both, splitting extra money 50/50.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What is the pension lifetime allowance?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The lifetime allowance (&pound;1,073,100) was abolished from 6 April 2024. There
                  is no longer a cap on the total amount you can save in pensions without additional
                  tax charges. However, the 25% tax-free lump sum is capped at &pound;268,275. For
                  most electricians, these limits are unlikely to be an issue, but it is worth
                  knowing if you are a very high earner or have significant pension savings.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is it too late to start saving if I am already in my 50s?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  It is never too late, but the later you start, the more you need to save. A
                  55-year-old with no pension savings who wants a &ldquo;moderate&rdquo; retirement
                  from 67 has 12 years to build a pot. Aggressive saving (&pound;1,000+/month) plus
                  tax relief can still build a meaningful pot, especially if combined with
                  maximising the State Pension and working part-time in retirement. It is harder,
                  but not impossible.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <Quiz questions={quizQuestions} title="Planning for Retirement &mdash; Quick Quiz" />
          </section>

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-5">
                Next: Module 5 &mdash; Financial Protection &amp; Planning Ahead
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
