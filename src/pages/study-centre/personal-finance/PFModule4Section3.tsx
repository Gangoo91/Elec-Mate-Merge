import { ArrowLeft, UserCog, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'What percentage of self-employed workers in the UK save into a pension?',
    options: ['About 16%', 'About 35%', 'About 50%', 'About 65%'],
    correctAnswer: 0,
    explanation:
      'Only around 16% of self-employed workers save into a pension, compared to roughly 80% of employed workers (thanks to auto-enrolment). This is the "pension gap" and it is one of the biggest financial risks facing self-employed electricians.',
  },
  {
    id: 2,
    question: 'What does SIPP stand for?',
    options: [
      'Savings and Investment Pension Plan',
      'Self-Invested Personal Pension',
      'Standard Individual Pension Product',
      'Secure Income Pension Programme',
    ],
    correctAnswer: 1,
    explanation:
      'A SIPP is a Self-Invested Personal Pension. It gives you control over where your pension money is invested, with a wide range of funds and investment options.',
  },
  {
    id: 3,
    question:
      'A basic rate taxpayer contributes &pound;80 into their pension. How much ends up in their pension pot?',
    options: ['&pound;80', '&pound;96', '&pound;100', '&pound;120'],
    correctAnswer: 2,
    explanation:
      'When you contribute &pound;80, the pension provider claims 20% basic rate tax relief from HMRC, adding &pound;20 to your pot. So &pound;80 from you becomes &pound;100 in your pension. This is the key benefit of pension tax relief.',
  },
  {
    id: 4,
    question: 'What is the maximum annual pension contribution that receives tax relief?',
    options: ['&pound;20,000', '&pound;40,000', '&pound;60,000', 'There is no limit'],
    correctAnswer: 2,
    explanation:
      'The annual allowance for tax-relieved pension contributions is &pound;60,000 per year (from 2023/24). For most self-employed electricians this is more than enough headroom.',
  },
  {
    id: 5,
    question: 'What is a stakeholder pension?',
    options: [
      'A pension only available to company directors',
      'A pension linked to property investments',
      'A simple pension with capped charges and low minimum contributions',
      'A government-run pension scheme like NEST',
    ],
    correctAnswer: 2,
    explanation:
      'Stakeholder pensions are designed to be simple, accessible, and low cost. They must accept contributions as low as &pound;20, cannot charge more than 1.5% in the first 10 years (0.75% after), and must offer a default fund.',
  },
  {
    id: 6,
    question: 'What is the "halve your age" rule of thumb for pension saving?',
    options: [
      'Save half your salary into your pension',
      'Take the age you start saving, halve it, and save that percentage of income',
      'Retire at half the State Pension age',
      'Invest half in equities and half in bonds',
    ],
    correctAnswer: 1,
    explanation:
      'The "halve your age" rule says take the age you start saving, halve it, and save that percentage of your income. Start at 30? Save 15%. Start at 40? Save 20%. The later you start, the more you need to save.',
  },
  {
    id: 7,
    question: 'What is compound growth in the context of pension savings?',
    options: [
      'A guarantee from the pension provider',
      'Interest being earned on your contributions and on previous interest/returns',
      'A special government bonus paid into your pension',
      'The annual fee charged by the pension provider',
    ],
    correctAnswer: 1,
    explanation:
      'Compound growth is the process of earning returns on your contributions AND on the returns those contributions have already generated. It accelerates over time, which is why starting early is so powerful.',
  },
  {
    id: 8,
    question:
      'Why is treating pension contributions as a "non-negotiable business cost" recommended for self-employed electricians?',
    options: [
      'Because HMRC requires it',
      'Because it ensures you pay yourself last',
      'Because it prevents the temptation to skip contributions when cash flow is tight',
      'Because it reduces your Corporation Tax',
    ],
    correctAnswer: 2,
    explanation:
      'Treating pension saving as a fixed business cost &mdash; like van insurance or tool purchases &mdash; ensures it happens consistently. Self-employed workers often skip pension contributions when things are tight, which leads to dangerously low retirement savings.',
  },
];

export default function PFModule4Section3() {
  useSEO({
    title: 'Self-Employed Pension Options | Pensions & Retirement Planning | Personal Finance',
    description:
      'The pension gap, SIPPs, stakeholder pensions, how much to save, investment basics, and building pension habits for self-employed electricians.',
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
                <UserCog className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-1">
                  <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                  <span className="text-white text-xs">&bull;</span>
                  <span className="text-white text-xs">SECTION 3</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Self-Employed Pension Options
                </h1>
              </div>
            </div>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Self-employed electricians face a unique pension challenge: no employer contributes on
              your behalf, and there is no automatic enrolment to nudge you into saving. Everything
              depends on your own initiative. This section covers your options and how to build a
              pension habit that sticks.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h3>
              <p className="text-white text-sm leading-relaxed">
                Only 16% of self-employed people save into a pension. A SIPP gives you full control
                and tax relief (pay &pound;80, get &pound;100 in your pot at basic rate).
                Stakeholder pensions offer simplicity with capped charges. The &ldquo;halve your
                age&rdquo; rule gives a savings target. Start at &pound;50/month if that is all you
                can manage &mdash; the key is to start and treat it as a fixed cost.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Why It Matters</h3>
              <p className="text-white text-sm leading-relaxed">
                Without auto-enrolment or employer contributions, self-employed electricians are
                entirely responsible for their own retirement savings. The State Pension provides
                around &pound;11,500 per year &mdash; barely enough for a basic lifestyle. Without a
                private pension, you face working into your late 60s doing physical labour or
                accepting a significant drop in living standards.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <h2 className="text-white font-bold text-lg mb-4">What You Will Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'The scale of the self-employed pension gap and why it exists',
                'How SIPPs work, including tax relief and investment choices',
                'The simplicity and protections of stakeholder pensions',
                'How to calculate a realistic savings target using the "halve your age" rule',
                'Investment basics: default funds, equities, bonds, and compound growth',
                'Practical strategies for making pension saving a consistent habit',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 01: The Pension Gap */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">01</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                The Self-Employed Pension Gap
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The numbers are stark. Around{' '}
                <strong className="text-white">80% of employed workers</strong> now save into a
                workplace pension, thanks to auto-enrolment. Among the self-employed, that figure is
                just <strong className="text-white">16%</strong>. This is the pension gap, and it is
                one of the biggest financial risks facing self-employed tradespeople.
              </p>
              <p>There are several reasons the gap exists:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">No auto-enrolment</strong> &mdash; nobody
                    automatically sets up a pension for you. You must actively choose to do it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">No employer contribution</strong> &mdash; when
                    you are your own boss, there is no free 3% from an employer. Every penny comes
                    from your own income.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Irregular income</strong> &mdash; self-employed
                    earnings can vary month to month, making it tempting to skip contributions when
                    cash flow is tight.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Present bias</strong> &mdash; the van needs
                    servicing, the tax bill is due, Christmas is coming. There is always a more
                    immediate use for your money than a retirement that feels decades away.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Lack of guidance</strong> &mdash; employed
                    workers have HR departments and workplace pension providers nudging them.
                    Self-employed workers are on their own.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">The Uncomfortable Truth</h4>
                <p className="text-white text-sm leading-relaxed">
                  A self-employed electrician who saves nothing into a pension will retire on the
                  State Pension alone &mdash; approximately &pound;11,500 per year. That is
                  &pound;221 per week to cover all living expenses. Compare that to earning
                  &pound;40,000&ndash;&pound;60,000 during your working life. The drop in income is
                  enormous and the impact on quality of life is severe.
                </p>
              </div>

              <p>
                The good news is that the solutions are straightforward and accessible. You do not
                need complex financial knowledge or large sums of money to start. What you need is
                the right product, a realistic savings target, and the discipline to treat pension
                contributions like any other essential business cost.
              </p>
            </div>
          </section>

          {/* Section 02: SIPPs */}
          <section className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-4">
              <span className="text-amber-400 text-xs font-bold tracking-wider">02</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                SIPPs &mdash; Self-Invested Personal Pensions
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                A <strong className="text-white">SIPP</strong> (Self-Invested Personal Pension) is
                the most popular pension choice for self-employed workers. It gives you a personal
                pension pot that you control, with the flexibility to choose your own investments
                and contribute as much or as little as you want.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                How Tax Relief Works
              </h3>
              <p>
                Pension tax relief is one of the most powerful financial incentives available. When
                you contribute to a SIPP, the government effectively refunds the income tax you paid
                on that money:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">Tax Relief in Practice</h4>
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Basic Rate Taxpayer (20%)</p>
                    <p className="text-white text-sm mt-1">
                      You pay &pound;80 into your SIPP. Your provider claims &pound;20 from HMRC and
                      adds it to your pot.{' '}
                      <strong className="text-white">
                        Result: &pound;100 in your pension for a cost of &pound;80.
                      </strong>
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Higher Rate Taxpayer (40%)</p>
                    <p className="text-white text-sm mt-1">
                      You pay &pound;80 and your provider claims &pound;20 (basic rate). You then
                      claim an additional &pound;20 through Self Assessment.{' '}
                      <strong className="text-white">
                        Result: &pound;100 in your pension for a net cost of &pound;60.
                      </strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">The Annual Allowance</p>
                    <p className="text-white text-sm mt-1">
                      You can contribute up to &pound;60,000 per year with tax relief (or 100% of
                      your earnings, whichever is lower). For most self-employed electricians, the
                      practical limit is their total earnings.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Choosing a SIPP Provider
              </h3>
              <p>
                The SIPP market is competitive, with providers ranging from traditional firms to
                modern app-based platforms. Key factors to consider:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Annual fees</strong> &mdash; look for platform
                    fees under 0.45%. Some providers charge a fixed annual fee, others a percentage
                    of your pot.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Fund charges</strong> &mdash; the funds you
                    invest in have their own charges (the ongoing charges figure, or OCF). Index
                    tracker funds typically charge 0.05%&ndash;0.25%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Ease of use</strong> &mdash; a good app or
                    website makes it easy to set up regular contributions and check your pot.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Fund range</strong> &mdash; for most people, a
                    decent global index tracker is all you need. Make sure your provider offers one.
                  </span>
                </li>
              </ul>

              <p>
                Well-known SIPP providers include Vanguard, AJ Bell, Hargreaves Lansdown, Fidelity,
                and Interactive Investor. Vanguard is often the cheapest for smaller pots due to its
                low 0.15% platform fee and wide range of low-cost index funds.
              </p>
            </div>
          </section>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-4-3-check1"
            question="A basic rate taxpayer wants &pound;500 to go into their SIPP. How much do they need to pay out of pocket?"
            options={['&pound;500', '&pound;450', '&pound;400', '&pound;375']}
            correctIndex={2}
            explanation="At basic rate (20%), you pay &pound;400 and HMRC adds &pound;100 in tax relief, giving &pound;500 in your pension pot. The 20% tax relief is claimed automatically by your SIPP provider."
          />

          {/* Section 03: Stakeholder Pensions */}
          <section className="space-y-4">
            <div className="border-l-2 border-green-500 pl-4">
              <span className="text-green-400 text-xs font-bold tracking-wider">03</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Stakeholder Pensions &mdash; The Simpler Option
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                If the idea of choosing investments and managing a SIPP feels overwhelming, a
                <strong className="text-white"> stakeholder pension</strong> offers a simpler
                alternative with built-in consumer protections.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  Stakeholder Pension Features
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Low min
                    </span>
                    <span className="text-white text-sm">
                      Must accept contributions as low as &pound;20 per payment
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Capped fees
                    </span>
                    <span className="text-white text-sm">
                      Maximum charge of 1.5% per year for the first 10 years, then 1% &mdash; and
                      many providers charge less (0.75% is common)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Default fund
                    </span>
                    <span className="text-white text-sm">
                      Must offer a default investment fund so you do not have to choose
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Flexible
                    </span>
                    <span className="text-white text-sm">
                      No penalties for stopping, starting, or changing contributions. No transfer
                      fees.
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                SIPP vs Stakeholder &mdash; Which to Choose?
              </h3>
              <p>
                For most self-employed electricians, a low-cost SIPP invested in a global index
                tracker will likely be cheaper in the long run (total costs under 0.4% vs up to 1.5%
                for a stakeholder pension). But a stakeholder pension is better than no pension at
                all, and its simplicity is a genuine advantage if you do not want to spend time
                researching funds.
              </p>
              <p>The key comparison:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Choose a SIPP if</strong> you want lower fees,
                    more investment choice, and are willing to spend 30 minutes setting it up
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Choose a stakeholder pension if</strong> you want
                    maximum simplicity, do not want to think about investments, and prefer built-in
                    fee caps
                  </span>
                </li>
              </ul>
              <p>
                Either way, both offer tax relief, both are regulated, and both are infinitely
                better than saving nothing at all.
              </p>
            </div>
          </section>

          {/* Section 04: How Much to Save */}
          <section className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <span className="text-blue-400 text-xs font-bold tracking-wider">04</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                How Much Should You Save?
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The biggest question every self-employed person asks is &ldquo;how much is
                enough?&rdquo; The honest answer is &ldquo;it depends&rdquo;, but there are useful
                rules of thumb that give you a realistic target.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">
                  The &ldquo;Halve Your Age&rdquo; Rule
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Take the age you start saving seriously, halve it, and save that percentage of
                  your pre-tax income. This is a widely-cited rule of thumb from the pensions
                  industry:
                </p>
                <div className="mt-3 space-y-2">
                  <p className="text-white text-sm">
                    Start at <strong className="text-white">20</strong>: save{' '}
                    <strong className="text-white">10%</strong> of income
                  </p>
                  <p className="text-white text-sm">
                    Start at <strong className="text-white">30</strong>: save{' '}
                    <strong className="text-white">15%</strong> of income
                  </p>
                  <p className="text-white text-sm">
                    Start at <strong className="text-white">40</strong>: save{' '}
                    <strong className="text-white">20%</strong> of income
                  </p>
                  <p className="text-white text-sm">
                    Start at <strong className="text-white">50</strong>: save{' '}
                    <strong className="text-white">25%</strong> of income
                  </p>
                </div>
              </div>

              <p>
                These percentages include the State Pension. So if you start saving at 30 and earn
                &pound;40,000, the rule suggests saving 15% &mdash; roughly &pound;6,000 per year or
                &pound;500 per month. After tax relief, your actual out-of-pocket cost is &pound;400
                per month.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Working Backwards from Your Target
              </h3>
              <p>
                A more precise approach is to decide what income you want in retirement and work
                backwards:
              </p>
              <ol className="space-y-3 ml-1">
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    1
                  </span>
                  <span className="text-white">
                    Pick your target annual income (e.g. &pound;23,300 for PLSA
                    &ldquo;moderate&rdquo;)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    2
                  </span>
                  <span className="text-white">
                    Subtract the State Pension (&pound;11,500), leaving a gap of &pound;11,800/year
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    3
                  </span>
                  <span className="text-white">
                    Multiply by 25 (the 4% rule &mdash; covered in Section 4) to get your target
                    pot: &pound;11,800 &times; 25 = &pound;295,000
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    4
                  </span>
                  <span className="text-white">
                    Use a pension calculator to find out the monthly contribution needed to reach
                    that pot by your target retirement age
                  </span>
                </li>
              </ol>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Worked Example</h4>
                <p className="text-white text-sm leading-relaxed">
                  Tom is 35, self-employed, and wants a &ldquo;moderate&rdquo; retirement from 66.
                  He has &pound;15,000 already saved. He needs a pot of &pound;295,000. With 31
                  years of growth at an assumed 5% annual return, he needs to contribute roughly
                  &pound;300 per month (before tax relief). After tax relief, that costs him
                  &pound;240 per month from his own pocket. That is &pound;55 per week &mdash; less
                  than many electricians spend on takeaway coffee and lunches.
                </p>
              </div>
            </div>
          </section>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-4-3-check2"
            question="Using the &ldquo;halve your age&rdquo; rule, how much should a 36-year-old who is just starting to save put towards their pension?"
            options={['10% of income', '15% of income', '18% of income', '25% of income']}
            correctIndex={2}
            explanation="Halve your age: 36 divided by 2 = 18%. A 36-year-old starting from scratch should aim to save 18% of their pre-tax income towards retirement. The later you start, the higher the percentage needs to be."
          />

          {/* Section 05: Investment Basics */}
          <section className="space-y-4">
            <div className="border-l-2 border-purple-500 pl-4">
              <span className="text-purple-400 text-xs font-bold tracking-wider">05</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Investment Basics for Pension Savers
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                You do not need to become a stock market expert to invest your pension wisely. Most
                people do best with simple, low-cost, diversified funds. Here are the fundamentals.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">Default Funds</h3>
              <p>
                Every pension provider offers a <strong className="text-white">default fund</strong>
                . This is a pre-selected investment that is designed to be appropriate for most
                people. Default funds typically invest heavily in equities (shares) when you are
                young and gradually shift towards bonds and cash as you approach retirement. This is
                called a &ldquo;lifestyle&rdquo; or &ldquo;target date&rdquo; strategy.
              </p>
              <p>
                For most self-employed electricians, the default fund is a perfectly reasonable
                choice. It is designed by professional investment managers and requires zero effort
                on your part.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Equities vs Bonds
              </h3>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Equities (Shares/Stocks)</p>
                    <p className="text-white text-sm mt-1">
                      Ownership stakes in companies. Higher risk, higher long-term returns.
                      Historically, global equities have returned roughly 7&ndash;10% per year
                      before inflation over long periods. In any single year, they can fall
                      20&ndash;40%. But over 20&ndash;30 years, they have always recovered and
                      grown.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Bonds (Fixed Income)</p>
                    <p className="text-white text-sm mt-1">
                      Loans to governments or companies. Lower risk, lower returns. Typically return
                      2&ndash;4% per year. They smooth out the volatility of equities and provide
                      more stable returns near retirement.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Index Tracker Funds</p>
                    <p className="text-white text-sm mt-1">
                      Funds that automatically track a market index (like the FTSE All-World or
                      S&amp;P 500) without trying to pick winners. They have very low fees
                      (0.05%&ndash;0.25%) and consistently outperform most expensive
                      actively-managed funds over the long term. A global equity index tracker is
                      the single best investment for most pension savers.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                The Power of Compound Growth
              </h3>
              <p>
                Compound growth is the secret engine of long-term wealth building. It means your
                money earns returns, and then those returns earn returns, and so on. The effect is
                modest in the early years but becomes enormous over decades.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Compound Growth in Action</h4>
                <p className="text-white text-sm leading-relaxed">
                  Investing &pound;200 per month at 6% annual return:
                </p>
                <div className="mt-3 space-y-2">
                  <p className="text-white text-sm">
                    After <strong className="text-white">10 years</strong>: &pound;33,000 (you
                    contributed &pound;24,000)
                  </p>
                  <p className="text-white text-sm">
                    After <strong className="text-white">20 years</strong>: &pound;93,000 (you
                    contributed &pound;48,000)
                  </p>
                  <p className="text-white text-sm">
                    After <strong className="text-white">30 years</strong>: &pound;201,000 (you
                    contributed &pound;72,000)
                  </p>
                  <p className="text-white text-sm">
                    After <strong className="text-white">40 years</strong>: &pound;398,000 (you
                    contributed &pound;96,000)
                  </p>
                </div>
                <p className="text-white text-sm mt-3 leading-relaxed">
                  Notice how the growth accelerates. In the first 10 years, your money earns
                  &pound;9,000 in returns. In the last 10 years (year 30 to 40), it earns
                  &pound;197,000. This is why starting early &mdash; even with small amounts &mdash;
                  matters so much.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Do Not Try to Time the Market
              </h3>
              <p>
                A common mistake is trying to wait for the &ldquo;right time&rdquo; to start
                investing, or pulling money out when markets fall. Research consistently shows that
                time in the market beats timing the market. Regular monthly contributions
                automatically buy more units when prices are low and fewer when prices are high
                (pound cost averaging). Just set up the direct debit and leave it alone.
              </p>
            </div>
          </section>

          {/* Section 06: Making It Happen */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">06</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Making It Happen &mdash; Building a Pension Habit
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Knowing you should save into a pension is easy. Actually doing it consistently is
                the hard part. Here are practical strategies that work for self-employed
                tradespeople.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Start at &pound;50 per Month
              </h3>
              <p>
                If &pound;300 or &pound;500 per month feels unachievable right now, start with
                &pound;50. With tax relief, that becomes &pound;62.50 in your pension. It is not
                enough on its own, but it establishes the habit and gets your account open. You can
                increase the amount later. The biggest barrier is not the amount &mdash; it is
                getting started at all.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Treat It as a Non-Negotiable Business Cost
              </h3>
              <p>
                You do not skip van insurance because cash flow is tight. You do not stop paying
                your mobile phone bill. Your pension should be in the same category &mdash; a fixed
                overhead that gets paid regardless. Set up a direct debit from your business account
                on a specific date each month, ideally the day after your biggest regular client
                pays.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  The Self-Employed Pension Checklist
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">
                      Open a SIPP or stakeholder pension (takes 15&ndash;30 minutes online)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">
                      Choose a global index tracker fund (or accept the default fund)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">
                      Set up a monthly direct debit (start at &pound;50 if needed, increase over
                      time)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">
                      Pay your Class 2 NI to protect your State Pension (&pound;3.45/week)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">
                      Check your State Pension forecast at gov.uk
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">
                      Review once per year &mdash; increase contributions when income rises
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Use Good Months to Top Up
              </h3>
              <p>
                Self-employed income is lumpy. When you have a particularly good month &mdash; a
                large commercial job pays out, or you have a run of high-value domestic work &mdash;
                make an additional one-off pension contribution. This smooths out the lean months
                and accelerates your pension growth. Most SIPP providers make it easy to make ad-hoc
                payments through their app or website.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Increase by 1% Each Year
              </h3>
              <p>
                A proven strategy is to increase your pension contribution by 1% of your income each
                year, or by the amount of any income increase. If you get a rate rise, put half of
                the increase into your pension. This barely affects your take-home pay because you
                never get used to spending the extra money.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">The Cost of Waiting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every year you delay starting costs you significantly. If you invest &pound;200
                  per month from age 25 to 65, you accumulate roughly &pound;398,000 (at 6% annual
                  returns). If you start the same &pound;200 per month at age 35, you accumulate
                  &pound;201,000 &mdash; roughly half. And if you wait until 45, you get
                  &pound;93,000. The best time to start was yesterday. The second best time is
                  today.
                </p>
              </div>
            </div>
          </section>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-4-3-check3"
            question="Why is setting up a pension direct debit on a fixed date each month recommended for the self-employed?"
            options={[
              'Because HMRC requires it',
              'Because it ensures pension saving happens consistently regardless of other spending pressures',
              'Because direct debits receive higher tax relief',
              'Because pension providers charge less for direct debits',
            ]}
            correctIndex={1}
            explanation="A fixed direct debit treats your pension like a non-negotiable business cost &mdash; similar to van insurance. Without automation, self-employed workers frequently skip contributions when cash flow is tight, leading to dangerously low retirement savings."
          />

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-white text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I have a SIPP and a workplace pension at the same time?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. If you do some employed work and some self-employed work (common among
                  electricians), you can contribute to both. Your combined contributions must stay
                  within the &pound;60,000 annual allowance. Having both gives you employer
                  contributions on the employed side and flexibility on the self-employed side.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I use my pension to invest in property?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  SIPPs can invest in commercial property (offices, workshops, retail units) but
                  <strong className="text-white"> not residential property</strong>. You cannot use
                  your pension to buy a buy-to-let flat. Commercial property within a SIPP can work
                  well for business owners (e.g. your pension owns your workshop and you pay rent
                  into your pension), but it is complex and requires specialist advice.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What happens to my SIPP if I die before retirement?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Your pension pot is passed to your nominated beneficiaries (usually tax-free if
                  you die before 75, taxed as income if after 75). This makes pensions an efficient
                  way to pass on wealth. Make sure you have completed a &ldquo;nomination of
                  beneficiaries&rdquo; form with your provider &mdash; pensions do not automatically
                  pass through your will.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Are pension contributions a business expense for tax purposes?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Personal pension contributions are not a business expense in your accounts, but
                  they attract tax relief which has the same economic effect. If you operate through
                  a limited company, the company can make employer contributions directly, which are
                  a genuine business expense and save Corporation Tax. Speak to your accountant
                  about the most tax-efficient way to make contributions based on your business
                  structure.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <Quiz
              questions={quizQuestions}
              title="Self-Employed Pension Options &mdash; Quick Quiz"
            />
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
              <Link to="../pf-module-4-section-4">
                Planning for Retirement
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
