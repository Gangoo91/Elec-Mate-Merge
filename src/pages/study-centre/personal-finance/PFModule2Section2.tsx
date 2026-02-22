import { ArrowLeft, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-2-2-check1',
    question: 'What is the baseline month approach to budgeting irregular income?',
    options: [
      'Budgeting based on your highest-earning month of the past year',
      'Budgeting based on the average of the last 12 months',
      'Budgeting based on the lowest realistic monthly income you expect',
      'Budgeting based on the amount HMRC expects you to earn',
    ],
    correctIndex: 2,
    explanation:
      'The baseline month approach means building your entire budget around the lowest realistic monthly income you expect over the coming year. This ensures you can always cover your essential costs, even in the quietest month. In months where you earn above the baseline, the surplus goes straight to savings or your emergency fund.',
  },
  {
    id: 'pf-2-2-check2',
    question:
      'What percentage of gross income should a self-employed tradesperson typically set aside for tax?',
    options: ['10%', '20%', '30%', '50%'],
    correctIndex: 2,
    explanation:
      'The general rule of thumb is 30% of gross income. This covers income tax at the basic rate (20%) plus Class 4 National Insurance contributions (6% on profits between &pound;12,570 and &pound;50,270). Setting aside 30% provides a comfortable buffer &mdash; any surplus after paying your Self Assessment bill becomes a welcome bonus rather than a stressful shortfall.',
  },
  {
    id: 'pf-2-2-check3',
    question:
      'Which of the following is a key benefit of income smoothing for self-employed tradespeople?',
    options: [
      'It eliminates the need to pay tax',
      'It guarantees higher earnings in quiet months',
      'It provides a consistent personal &ldquo;salary&rdquo; so personal bills are always covered',
      'It means you never need to save for emergencies',
    ],
    correctIndex: 2,
    explanation:
      'Income smoothing means paying yourself a fixed personal &ldquo;salary&rdquo; from your business account each month, regardless of how much you actually earn that month. This ensures your personal bills (rent, utilities, food) are always covered at the same level. Surplus business income builds a buffer for quiet months, while the fixed personal payment removes the stress of feast-and-famine cash flow.',
  },
];

const faqs = [
  {
    question: 'How do I work out my baseline month figure?',
    answer:
      'Look at your income over the last 12 months (or longer if you have the data). Identify the lowest-earning month &mdash; not an outlier like a month where you were ill for three weeks, but the lowest &ldquo;normal&rdquo; month. That figure, after setting aside 30% for tax, becomes your baseline. If you are newly self-employed and lack historical data, estimate conservatively: assume 3 weeks of billable work per month at your lowest likely day rate, minus materials and van costs.',
  },
  {
    question: 'What should I do if my income drops below the baseline month?',
    answer:
      'This is exactly what your emergency fund is for. If income drops below your baseline for one month, draw the shortfall from your emergency fund to maintain your budget. If it happens two months in a row, review whether your baseline needs adjusting downwards or whether there is a temporary cause (seasonal dip, delayed payments). If it persists, revisit your entire budget and cut discretionary spending until income recovers.',
  },
  {
    question: 'How much should I keep in my business buffer for seasonal dips?',
    answer:
      'A good starting target is one month&rsquo;s worth of business costs plus one month&rsquo;s personal baseline budget. For most sole-trader electricians, this is between &pound;3,000 and &pound;6,000. Once you have this buffer in place, seasonal dips become manageable rather than frightening. Build towards three months&rsquo; expenses as your longer-term goal.',
  },
  {
    question:
      'Should I adjust my tax provision percentage if I earn above the higher rate threshold?',
    answer:
      'Yes. If your taxable profits are likely to exceed &pound;50,270 (the 2024/25 threshold), you should increase your tax provision to 40&ndash;45% on income above that level. The higher rate of income tax is 40%, and Class 4 NI continues at 2% above &pound;50,270. Speak to an accountant if you expect to be a higher-rate taxpayer &mdash; the exact percentage depends on your allowable expenses and pension contributions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to IPSE research, what percentage of self-employed workers have experienced income anxiety?',
    options: ['About 50%', 'About 65%', 'About 75%', 'About 89%'],
    correctAnswer: 3,
    explanation:
      'IPSE (the Association of Independent Professionals and the Self-Employed) found that 89% of self-employed workers have experienced income anxiety &mdash; worry caused specifically by not knowing what they will earn next month. This statistic underlines why specific budgeting strategies for irregular income are so important.',
  },
  {
    id: 2,
    question: 'Which months are typically the quietest for domestic electrical work in the UK?',
    options: ['March and April', 'June and July', 'January and February', 'September and October'],
    correctAnswer: 2,
    explanation:
      'January and February are typically the quietest months for domestic electrical work. Customers have spent heavily over Christmas, new year budgets are tight, and the weather can delay outdoor work. Wise tradespeople plan for this dip by building a buffer during the busy autumn months (September to November).',
  },
  {
    id: 3,
    question: 'What is income smoothing?',
    options: [
      'Asking customers to pay the same amount every month',
      'Paying yourself a fixed personal salary from your business account regardless of monthly turnover',
      'Spreading your tax bill evenly across 12 monthly payments',
      'Only taking on jobs that pay the same rate',
    ],
    correctAnswer: 1,
    explanation:
      'Income smoothing means paying yourself a consistent personal &ldquo;salary&rdquo; from your business account each month, regardless of how much the business actually earns that month. In good months, the surplus stays in the business account as a buffer. In quiet months, the buffer covers the shortfall. Your personal finances remain stable throughout.',
  },
  {
    id: 4,
    question:
      'When should you transfer money to your tax account after receiving a customer payment?',
    options: [
      'At the end of the tax year',
      'When you file your Self Assessment return',
      'At the end of each month',
      'Immediately &mdash; the same day the payment arrives',
    ],
    correctAnswer: 3,
    explanation:
      'The tax provision should be transferred immediately &mdash; on the same day the customer payment arrives, or as part of the same banking session. Delaying even by a few days creates the risk that the money will be spent on something else. The principle is simple: HMRC&rsquo;s money is separated before anything else happens.',
  },
  {
    id: 5,
    question: 'What is the &ldquo;Christmas cash flow trap&rdquo; for self-employed tradespeople?',
    options: [
      'Customers paying with Christmas gift vouchers instead of cash',
      'Overspending on gifts followed by a January income dip, creating a double squeeze',
      'HMRC charging extra tax in December',
      'Banks closing over the Christmas period',
    ],
    correctAnswer: 1,
    explanation:
      'The Christmas cash flow trap is the double squeeze of high personal spending in December (gifts, socialising, food) followed by the quietest earning period of the year in January and February. Many tradespeople also face their Self Assessment payment on 31 January. Without planning, this combination can cause serious financial stress.',
  },
  {
    id: 6,
    question: 'How much holiday provision should a self-employed electrician budget for annually?',
    options: [
      'None &mdash; self-employed people do not get holidays',
      'One week at minimum wage equivalent',
      "The equivalent of 5.6 weeks of income, matching employed workers' statutory entitlement",
      'Whatever is left over at the end of the year',
    ],
    correctAnswer: 2,
    explanation:
      'Employed workers receive 5.6 weeks of paid holiday per year (28 days for a 5-day week). Self-employed tradespeople receive nothing unless they plan for it. Best practice is to set aside the equivalent of 5.6 weeks of your baseline weekly income across the year, building a holiday fund that allows you to take time off without financial stress.',
  },
  {
    id: 7,
    question: 'What is the first step in creating a simple 12-month cash flow forecast?',
    options: [
      'Estimating your tax bill',
      'Listing all expected income month by month, using conservative estimates for uncertain months',
      'Opening a new bank account',
      'Calculating your net worth',
    ],
    correctAnswer: 1,
    explanation:
      'The first step in a 12-month cash flow forecast is listing your expected income for each month. Use actual figures where known (confirmed contracts, retainer payments) and conservative estimates for uncertain months. The forecast then adds expected outgoings month by month to show your projected cash position &mdash; highlighting months where you might run short so you can plan ahead.',
  },
  {
    id: 8,
    question: 'When building a business buffer for seasonal dips, what is a good initial target?',
    options: [
      'One week of expenses',
      'One month of business costs plus one month of personal baseline',
      'Six months of total household income',
      'Enough to cover your annual tax bill',
    ],
    correctAnswer: 1,
    explanation:
      'A good starting target for a seasonal buffer is one month of business costs plus one month of personal baseline budget. For most sole-trader electricians, this comes to &pound;3,000 to &pound;6,000. This covers a quiet month without needing to draw on your emergency fund. The longer-term goal should be three months of total expenses.',
  },
];

export default function PFModule2Section2() {
  useSEO({
    title: 'Managing Irregular Income | Personal Finance Module 2.2',
    description:
      'Income volatility, baseline month approach, income smoothing, tax provision rules, seasonal planning, and cash flow forecasting for self-employed electricians and tradespeople.',
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
            <Link to="../pf-module-2">
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
            <Activity className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Irregular Income
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to budget when you never know what next month&rsquo;s pay cheque will look like
            &mdash; the baseline month approach, income smoothing, tax provision, and seasonal
            planning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Baseline month:</strong> Budget to your lowest likely income month
              </li>
              <li>
                <strong>Tax first:</strong> 30% of gross into a separate account immediately
              </li>
              <li>
                <strong>Income smoothing:</strong> Pay yourself a fixed monthly &ldquo;salary&rdquo;
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>89%</strong> of self-employed workers experience income anxiety (IPSE)
              </li>
              <li>
                <strong>Jan&ndash;Feb</strong> are typically the quietest months for domestic work
              </li>
              <li>
                <strong>31 January</strong> Self Assessment deadline hits during the income dip
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Calculate your baseline month figure from historical income data',
              'Implement income smoothing using a business buffer account',
              'Apply the 30% tax provision rule to every customer payment',
              'Identify seasonal patterns in electrical work and plan for quiet months',
              'Avoid the Christmas cash flow trap with advance provision',
              'Create a simple 12-month cash flow forecast',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Income Volatility in the Trades */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Income Volatility in the Trades
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you are employed on a salary, your income is predictable. The same amount lands
                in your account on the same date every month. You can set up direct debits with
                confidence and know exactly what you have left for spending and saving. For
                self-employed tradespeople, the reality is fundamentally different.
              </p>

              <p>
                IPSE research found that <strong>89% of self-employed workers</strong> have
                experienced income anxiety &mdash; the chronic worry caused by not knowing what you
                will earn next month. For electricians, this volatility comes from multiple sources:
                seasonal demand patterns, project-based work with gaps between jobs, late-paying
                customers, weather delays on outdoor work, and the feast-or-famine cycle that
                affects most trades.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    Typical Seasonal Pattern for UK Electricians:
                  </strong>{' '}
                  Demand tends to peak from September through November (homeowners preparing for
                  winter, landlords getting properties ready for tenants, commercial fit-outs before
                  Christmas). It dips in January and February (post-Christmas budget squeeze), picks
                  up through spring, and can slow again during August school holidays when customers
                  are away.
                </p>
              </div>

              <p>
                The emotional impact of income volatility should not be underestimated. When you do
                not know whether next month will bring &pound;4,000 or &pound;1,500, it is difficult
                to commit to a mortgage, plan a holiday, or feel confident about the future. This
                anxiety spills over into work quality, family relationships, and overall wellbeing.
                The good news is that income volatility is <strong>manageable</strong> &mdash; it
                just requires different tools from those taught in standard personal finance advice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Common Sources of Income Volatility
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Seasonal demand:</strong> Domestic work drops in
                      January&ndash;February; commercial work may follow different cycles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Late payments:</strong> Customers or main contractors paying 30, 60,
                      or 90 days after invoice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Project gaps:</strong> Finishing one contract and waiting for the next
                      to start
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Weather:</strong> Outdoor work delayed by rain, frost, or extreme heat
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Illness or injury:</strong> No work means no income when you are
                      self-employed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Economic cycles:</strong> Recessions hit construction and home
                      improvement spending hard
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Baseline Month Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The Baseline Month Approach
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The baseline month approach is the single most important concept for budgeting
                irregular income. The principle is simple:{' '}
                <strong>
                  build your entire budget around the lowest realistic monthly income you expect
                  over the next 12 months
                </strong>
                . Not the average. Not the highest. The lowest.
              </p>

              <p>
                This might seem overly conservative, but it solves the fundamental problem with
                irregular income: you never commit to spending that relies on good months. Your
                essential costs (housing, utilities, food, transport, insurance) must be coverable
                in your worst month. Everything above the baseline is surplus that flows to savings,
                debt repayment, or treats.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How to Calculate Your Baseline Month
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 1:</strong> Gather your income data for
                      the last 12 months. Bank statements, invoicing records, or accounting software
                      reports all work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 2:</strong> List each month&rsquo;s gross
                      income. Remove any genuinely anomalous months (e.g., a month where you were
                      hospitalised) but keep normal quiet months
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 3:</strong> Identify the lowest normal
                      month. This is your gross baseline
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 4:</strong> Subtract 30% for tax
                      provision. The remaining 70% is your net baseline &mdash; the amount available
                      for all personal and business costs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 5:</strong> Build your budget to this net
                      baseline figure. Every essential cost must fit within it
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Example:</strong> Your monthly income over the
                  past year ranged from &pound;2,200 (February) to &pound;5,800 (October). Your
                  baseline gross is &pound;2,200. After 30% tax provision (&pound;660), your net
                  baseline is <strong>&pound;1,540</strong>. This is the figure you build your
                  essential budget around. In October, the &pound;3,600 surplus (after tax) goes
                  straight to savings and buffer accounts.
                </p>
              </div>

              <p>
                <strong>For newly self-employed tradespeople</strong> who lack 12 months of data:
                estimate conservatively. Assume 3 weeks of billable work per month (not 4 &mdash;
                allow for admin, quoting, travel, and cancellations) at your lowest likely day rate,
                minus typical monthly materials and vehicle costs. Use this as your baseline until
                you have real data to refine it.
              </p>

              <p>
                The baseline month approach transforms the psychology of irregular income. Instead
                of anxiously watching your account balance and hoping next month is a good one, you
                know that your essentials are covered even in the worst case. Good months become a
                bonus rather than a necessity.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Income Smoothing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Income Smoothing
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Income smoothing takes the baseline month concept one step further. Instead of
                simply budgeting to the lowest month, you{' '}
                <strong>pay yourself a fixed monthly &ldquo;salary&rdquo;</strong> from your
                business account, regardless of how much the business actually earns that month.
                This creates the stability of employment while keeping the flexibility of
                self-employment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How Income Smoothing Works</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 1:</strong> All customer payments go into
                      your business account
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 2:</strong> Tax provision (30%) is
                      transferred to the tax account immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 3:</strong> Business expenses (materials,
                      tools, vehicle) are paid from the business account
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 4:</strong> On the 1st of each month, you
                      transfer a fixed amount &mdash; your personal &ldquo;salary&rdquo; &mdash;
                      from the business account to your personal account
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 5:</strong> Any surplus in the business
                      account builds as a buffer for quiet months. When income is low, the buffer
                      covers the salary payment
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The key to income smoothing is choosing the right &ldquo;salary&rdquo; level. Set it
                too high and you will drain the buffer in quiet months. Set it too low and you will
                feel unnecessarily restricted in good months. The sweet spot is usually your{' '}
                <strong>baseline month net income</strong> (after tax and business expenses) &mdash;
                the figure from the previous section.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Example:</strong> You set your personal salary
                  at &pound;2,000 per month. In October, after tax provision and business expenses,
                  you have &pound;3,200 in the business account. You transfer &pound;2,000 to
                  personal; &pound;1,200 stays as buffer. In January, after tax and expenses, you
                  only have &pound;800. You transfer &pound;2,000 to personal anyway &mdash; the
                  missing &pound;1,200 comes from the buffer built up in busier months.
                </p>
              </div>

              <p>
                Income smoothing has a profound psychological benefit. Once your personal account
                receives the same amount on the same date every month, your personal finances feel{' '}
                <strong>exactly like being employed</strong>. You can set up direct debits for rent,
                utilities, and subscriptions with confidence. Your partner (if you have one) knows
                what the household income is. The anxiety of irregular earning is absorbed by the
                business account, not felt in your personal life.
              </p>

              <p>
                <strong>Building the initial buffer:</strong> When you first start income smoothing,
                you need to build a buffer before the system works. Start by paying yourself a
                slightly lower salary than your baseline for 3&ndash;4 months, allowing the
                difference to accumulate in the business account. Once you have one to two months of
                salary in the buffer, switch to your full target salary.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Tax Provision Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The 30% Tax Provision Rule
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The number one financial mistake made by newly self-employed tradespeople is
                spending money that belongs to HMRC. When a customer pays you &pound;1,000, it feels
                like you have &pound;1,000. You do not. A significant chunk of that money is owed in
                income tax and National Insurance, and if you spend it, you will face a painful bill
                on 31 January with nothing to pay it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Rule:</strong> Transfer{' '}
                  <strong>30% of every customer payment</strong> into a separate tax account on the
                  same day you receive it. Do not wait until the end of the week. Do not wait until
                  the end of the month. Do it immediately, every single time, without exception.
                </p>
              </div>

              <p>
                <strong>Why 30%?</strong> The basic rate of income tax is 20%. Class 4 National
                Insurance contributions are 6% on profits between &pound;12,570 and &pound;50,270
                (2024/25 rates). Class 2 NI is &pound;3.45 per week. When you add these together and
                account for the personal allowance, 30% provides a comfortable buffer for most
                basic-rate taxpayers. You will likely have a small surplus after paying your Self
                Assessment bill, which becomes a welcome bonus.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Why 30% Works as a Rule of Thumb
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Income tax (basic rate):</strong> 20% on taxable profits above
                      &pound;12,570
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Class 4 NI:</strong> 6% on profits between &pound;12,570 and
                      &pound;50,270
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Class 2 NI:</strong> &pound;3.45 per week (&pound;179.40 per year)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Personal allowance effect:</strong> The &pound;12,570 tax-free
                      allowance means your effective rate is lower than 26%, so 30% provides a
                      safety margin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Payments on Account:</strong> HMRC may require advance payments
                      towards next year&rsquo;s bill, so the surplus in the tax account covers these
                      too
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Higher earners:</strong> If your taxable profits exceed &pound;50,270,
                increase your provision to 40&ndash;45% on income above that threshold. The higher
                rate of income tax is 40%, and Class 4 NI continues at 2% above &pound;50,270. If
                you are approaching these levels, an accountant can help you calculate a more
                precise provision percentage.
              </p>

              <p>
                <strong>Where to keep the tax money:</strong> An instant-access savings account is
                ideal &mdash; it earns a small amount of interest while remaining accessible when
                your Self Assessment bill arrives. Marcus by Goldman Sachs, Chip, and Monzo tax pots
                are popular choices among tradespeople. The key requirement is that the money is{' '}
                <strong>visible but separate</strong> from your spending money.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Seasonal Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Seasonal Planning &amp; the Christmas Cash Flow Trap
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every trade has a seasonal rhythm, and electrical work is no exception.
                Understanding your seasonal pattern and planning for it in advance is the difference
                between a manageable quiet period and a financial crisis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Typical Seasonal Pattern for UK Electricians
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">Peak (Sep&ndash;Nov):</strong> Highest
                      demand &mdash; homeowners preparing for winter, landlords refurbishing,
                      commercial pre-Christmas fit-outs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Moderate (Mar&ndash;Jun):</strong> Spring
                      renovation season, garden lighting, EV charger installations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Moderate (Jul&ndash;Aug):</strong> Holiday
                      season &mdash; some customers away but new-build work continues
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">Quiet (Dec&ndash;Feb):</strong> Christmas
                      wind-down, January budget squeeze, February weather delays
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Christmas Cash Flow Trap:</strong> This is
                  the most dangerous period in the financial year for self-employed tradespeople. It
                  works like this: December brings high personal spending (gifts, food, socialising)
                  while work slows down. January arrives with a hangover of credit card bills, a
                  quiet order book, and &mdash; on 31 January &mdash; your Self Assessment tax bill.
                  The triple squeeze of high spending, low income, and a tax bill can cause serious
                  financial distress if not planned for.
                </p>
              </div>

              <p>
                <strong>How to avoid the Christmas trap:</strong> Start a dedicated Christmas fund
                in January and contribute a fixed amount monthly. If you want to spend &pound;1,200
                at Christmas (gifts, food, socialising, travel), set aside &pound;100 per month from
                January. By December, the money is already there and none of it comes from your
                January income or your tax fund.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Holiday Provision for the Self-Employed
                </p>
                <p className="text-sm text-white mb-2">
                  Employed workers receive 5.6 weeks of paid holiday per year (28 days for a 5-day
                  week worker). Self-employed tradespeople receive nothing unless they plan for it.
                  Best practice:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Calculate your baseline weekly income (baseline month divided by 4.33)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Multiply by 5.6 to get your annual holiday fund target</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Divide by 12 and set aside that amount monthly in a holiday pot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>When you take time off, draw from the pot &mdash; guilt-free</span>
                  </li>
                </ul>
              </div>

              <p>
                Planning for seasonality is not pessimism &mdash; it is professionalism. Every
                successful tradesperson knows that quiet months are coming. The question is whether
                you plan for them or pretend they will not happen.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Simple 12-Month Cash Flow Forecast */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Simple 12-Month Cash Flow Forecast
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A cash flow forecast sounds like something only large businesses need, but for a
                self-employed tradesperson it is one of the most powerful planning tools available.
                It takes about 30 minutes to create and gives you a month-by-month picture of where
                your finances are heading.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How to Create Your Forecast</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 1:</strong> Create a simple spreadsheet or
                      use a notebook. List the next 12 months as columns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 2:</strong> For each month, estimate your
                      expected income. Use actual figures for confirmed work; use last year&rsquo;s
                      figures (adjusted conservatively) for uncertain months
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 3:</strong> For each month, list all
                      expected outgoings: tax provision, business costs, personal bills, and planned
                      spending
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 4:</strong> Add known one-off costs:
                      annual insurance renewals, vehicle MOT/service, tax payments (31 January and
                      31 July), Christmas spending, holidays
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 5:</strong> Calculate the running balance:
                      start with your current cash position, add income, subtract outgoings. Any
                      month where the balance goes negative is a warning sign that needs action now
                      &mdash; not in that month
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> The forecast is not
                  meant to be accurate. It is meant to be <strong>directionally useful</strong>. If
                  the forecast shows a cash crunch in February, you have months to prepare &mdash;
                  by building a buffer, reducing discretionary spending, or lining up additional
                  work. The worst time to discover a cash flow problem is when it is already
                  happening.
                </p>
              </div>

              <p>
                Update your forecast monthly. Replace estimates with actual figures as they become
                known. Over time, your forecasting accuracy will improve dramatically because you
                will learn your own seasonal patterns. Most tradespeople who keep a 12-month
                forecast say it is the single tool that reduced their financial anxiety the most.
              </p>

              <p>
                <strong>Free tools for forecasting:</strong> A simple Google Sheets or Excel
                spreadsheet is all you need. FreeAgent (accounting software popular with sole
                traders) includes a cash flow projection feature. Even a paper notebook with 12
                columns works &mdash; the format matters less than the habit of looking ahead.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            <Link to="../pf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-2-section-3">
              Next: Business vs Personal Finances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
