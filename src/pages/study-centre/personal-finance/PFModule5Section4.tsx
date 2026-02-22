import { ArrowLeft, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-5-4-check1',
    question: 'Which of the following is a SMART financial goal?',
    options: [
      '&ldquo;I want to save more money this year&rdquo;',
      '&ldquo;I will save &pound;200 per month into my emergency fund for 12 months to build a &pound;2,400 safety net by December 2025&rdquo;',
      '&ldquo;I should probably start a pension at some point&rdquo;',
      '&ldquo;I want to be rich&rdquo;',
    ],
    correctIndex: 1,
    explanation:
      'A SMART goal is Specific (emergency fund), Measurable (&pound;200 per month, &pound;2,400 total), Achievable (realistic amount), Relevant (financial safety net), and Time-bound (12 months, by December 2025). The other options are vague wishes with no measurable target, no timeframe, and no specific action. SMART goals turn intentions into commitments.',
  },
  {
    id: 'pf-5-4-check2',
    question:
      'An electrician wants to save a &pound;25,000 house deposit over 5 years. Which time horizon does this fall into?',
    options: [
      'Short-term (0&ndash;2 years)',
      'Medium-term (2&ndash;10 years)',
      'Long-term (10+ years)',
      'It depends on the interest rate',
    ],
    correctIndex: 1,
    explanation:
      'A 5-year savings goal falls into the medium-term category (2&ndash;10 years). Medium-term goals include saving for a house deposit, building a significant qualification fund, or saving for a new van. The timeframe affects where you save: medium-term goals suit a mix of Cash ISA (for safety) and possibly a Stocks &amp; Shares ISA (for growth, accepting some risk).',
  },
  {
    id: 'pf-5-4-check3',
    question: 'What is the purpose of an annual &ldquo;financial MOT&rdquo;?',
    options: [
      'To submit your tax return to HMRC',
      'To review your financial goals, check your progress, update your insurance, and adjust your plan for the year ahead',
      'To cancel all your subscriptions',
      'To apply for a new credit card',
    ],
    correctIndex: 1,
    explanation:
      'An annual financial MOT is a comprehensive review of your entire financial situation. You check progress against your goals, review insurance policies, update your budget, reassess your emergency fund, check your credit file, review pension contributions, and plan for the year ahead. It takes 2&ndash;3 hours once a year and ensures you stay on track rather than drifting.',
  },
];

const faqs = [
  {
    question: 'I feel overwhelmed &mdash; where do I actually start?',
    answer:
      'Start with one thing. Just one. The most impactful first step is usually setting up a &pound;50 standing order into a separate savings account on payday. That single action builds your emergency fund automatically without requiring willpower. Once that is running, you can add a second action: check your pension or review your insurance. Do not try to do everything at once. Financial planning is a marathon, not a sprint. Small, consistent actions compound over years into transformative results.',
  },
  {
    question: 'How often should I review my financial goals?',
    answer:
      'Do a quick check every quarter (every 3 months) to make sure your standing orders are running, you are on track with savings targets, and nothing major has changed. Do a full financial MOT once a year &mdash; ideally in January, before the tax year ends in April, or on the anniversary of when you set your goals. The annual review is where you update targets, adjust for life changes (new job, pay rise, baby, house move), and plan for the year ahead. Write the review date in your calendar so you do not forget.',
  },
  {
    question: 'What free resources can help me with financial planning?',
    answer:
      'MoneyHelper (moneyhelper.org.uk) is the UK government&rsquo;s free, impartial financial guidance service. It covers budgeting, debt, savings, pensions, insurance, and home buying. StepChange (stepchange.org) provides free debt advice. Citizens Advice (citizensadvice.org.uk) helps with benefits, debt, and consumer rights. The Money and Pensions Service provides free pension guidance via Pension Wise (for over-50s). All of these services are free, independent, and do not sell products. Avoid any &ldquo;free&rdquo; advice that is actually a sales pitch for financial products.',
  },
  {
    question: 'Do I need a financial adviser?',
    answer:
      'For most day-to-day financial decisions (budgeting, saving, basic ISA contributions, building an emergency fund), you do not need a paid financial adviser &mdash; free guidance from MoneyHelper and this course is sufficient. However, a qualified independent financial adviser (IFA) becomes valuable for complex decisions: pension drawdown, inheritance tax planning, large investment portfolios, business finances, or divorce settlements. If you do use an adviser, check they are FCA-regulated and independent (not tied to one product provider). Expect to pay &pound;500&ndash;&pound;2,000 for a comprehensive financial plan.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the &ldquo;M&rdquo; in SMART goals stand for?',
    options: ['Motivational', 'Measurable', 'Meaningful', 'Manageable'],
    correctAnswer: 1,
    explanation:
      'SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. &ldquo;Measurable&rdquo; means you can quantify your progress &mdash; a specific number, a specific amount, a clear metric. &ldquo;Save &pound;200 per month&rdquo; is measurable. &ldquo;Save more money&rdquo; is not. Without measurement, you cannot track progress or know when you have achieved the goal.',
  },
  {
    id: 2,
    question: 'Which of the following is a short-term financial goal (0&ndash;2 years)?',
    options: [
      'Save a &pound;30,000 house deposit',
      'Build a retirement fund of &pound;500,000',
      'Build a &pound;1,000 starter emergency fund',
      'Pay off a 25-year mortgage',
    ],
    correctAnswer: 2,
    explanation:
      'Building a &pound;1,000 starter emergency fund is achievable within 0&ndash;2 years for most people, even on a modest income. Saving &pound;50 per month reaches &pound;1,200 in 2 years. Short-term goals are the foundation &mdash; they provide quick wins, build confidence, and create the financial stability needed to pursue bigger goals. A house deposit, retirement fund, and mortgage payoff are medium or long-term goals.',
  },
  {
    id: 3,
    question:
      'A self-employed electrician earns &pound;35,000 per year. Their medium-term goal is to save a &pound;25,000 house deposit using a Lifetime ISA. If they save &pound;4,000 per year in the LISA and receive the 25% government bonus, how long will it take approximately?',
    options: ['3 years', '5 years', '7 years', '10 years'],
    correctAnswer: 1,
    explanation:
      'Contributing &pound;4,000 per year to a LISA gives a 25% bonus of &pound;1,000, so &pound;5,000 per year goes into the account (before interest). &pound;25,000 divided by &pound;5,000 = 5 years. With interest or investment growth on top, it could be slightly less. This is a perfect example of a SMART medium-term goal: specific (house deposit), measurable (&pound;25,000), achievable (&pound;4,000/year savings), relevant (first home), and time-bound (5 years).',
  },
  {
    id: 4,
    question: 'Which short-term financial priority should typically come first?',
    options: [
      'Saving for a holiday',
      'Building a &pound;1,000 starter emergency fund',
      'Investing in a Stocks &amp; Shares ISA',
      'Overpaying your mortgage',
    ],
    correctAnswer: 1,
    explanation:
      'A &pound;1,000 starter emergency fund should come first. Without this safety net, any unexpected expense forces you into expensive debt, which undermines all other financial goals. Once the starter emergency fund is in place, you can focus on paying off high-interest debt, building the full emergency fund, and then saving for other goals. Holidays, investing, and mortgage overpayments come later in the priority order.',
  },
  {
    id: 5,
    question: 'What is the recommended annual &ldquo;financial MOT&rdquo;?',
    options: [
      'An annual vehicle inspection required for your work van',
      'A yearly review of your goals, insurance, budget, pension, and financial plan',
      'An annual meeting with HMRC to discuss your tax return',
      'A yearly credit card balance transfer',
    ],
    correctAnswer: 1,
    explanation:
      'An annual financial MOT is a comprehensive yearly review of your entire financial situation. It covers: progress against goals, emergency fund status, insurance policies (are they still adequate and competitive?), pension contributions, budget accuracy, credit file check, debt status, and planning for the year ahead. It takes 2&ndash;3 hours and keeps your finances on track.',
  },
  {
    id: 6,
    question:
      'Which of the following is NOT typically a medium-term financial goal (2&ndash;10 years)?',
    options: [
      'Saving a house deposit',
      'Building a pension pot',
      'Paying for additional qualifications',
      'Building a &pound;1,000 starter emergency fund',
    ],
    correctAnswer: 3,
    explanation:
      'Building a &pound;1,000 starter emergency fund is a short-term goal (0&ndash;2 years). It is achievable within months, not years. Medium-term goals (2&ndash;10 years) are bigger objectives that require sustained effort: house deposits, qualification investments, significant pension building, or saving for a new van. The short-term goals create the foundation; the medium-term goals build on that foundation.',
  },
  {
    id: 7,
    question:
      'Your personal financial action plan should pull together learning from which modules?',
    options: [
      'Only Module 5 (this module)',
      'Only Modules 1 and 2 (income and budgeting)',
      'All 5 modules of the Personal Finance course',
      'Only the modules about tax',
    ],
    correctAnswer: 2,
    explanation:
      'Your personal financial action plan pulls together everything from all 5 modules: understanding your income and tax (Module 1), budgeting and spending (Module 2), managing debt and credit (Module 3), pensions and retirement (Module 4), and financial protection and planning (Module 5). Each module contributes a piece of the puzzle. The action plan brings them all together into a single, coherent financial strategy.',
  },
  {
    id: 8,
    question:
      'What is the main benefit of setting SMART financial goals rather than vague intentions?',
    options: [
      'SMART goals are required by HMRC',
      'SMART goals give you a clear, measurable target with a deadline, making it much more likely you will achieve them',
      'SMART goals earn higher interest rates',
      'SMART goals are only for self-employed workers',
    ],
    correctAnswer: 1,
    explanation:
      'Research consistently shows that specific, measurable goals with deadlines are far more likely to be achieved than vague intentions. &ldquo;I will save &pound;200 per month for 12 months&rdquo; gives you a clear target, a trackable metric, and a completion date. &ldquo;I should save more&rdquo; gives you nothing to work towards. SMART goals turn good intentions into concrete actions with accountability.',
  },
];

export default function PFModule5Section4() {
  useSEO({
    title: 'Financial Goals & Your Action Plan | Personal Finance Module 5.4',
    description:
      'SMART financial goals, short/medium/long-term planning, your personal financial action plan, and annual financial MOT review.',
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
            <Link to="../pf-module-5">
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
            <Target className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Financial Goals &amp; Your Action Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Turning everything you have learned into a concrete, personalised financial plan with
            SMART goals and an annual review process
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>SMART goals:</strong> Specific, Measurable, Achievable, Relevant, Time-bound
              </li>
              <li>
                <strong>Three horizons:</strong> Short (0&ndash;2 yrs), Medium (2&ndash;10 yrs),
                Long (10+ yrs)
              </li>
              <li>
                <strong>Annual review:</strong> Your &ldquo;financial MOT&rdquo; keeps you on track
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Direction:</strong> Without a plan, money drifts away on impulse spending
              </li>
              <li>
                <strong>Motivation:</strong> Clear targets keep you focused when temptation strikes
              </li>
              <li>
                <strong>Compound effect:</strong> Small actions today create massive results over
                decades
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Write SMART financial goals with trade-specific examples for electricians',
              'Classify financial goals into short-term, medium-term, and long-term time horizons',
              'Identify the highest-priority short-term goals that form the foundation of financial security',
              'Create a personal financial action plan that pulls together learning from all 5 modules',
              'Describe the annual financial MOT process and explain why regular reviews are essential',
              'Identify free, impartial financial guidance resources available in the UK',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: SMART Financial Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            SMART Financial Goals
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The difference between a wish and a goal is a plan. &ldquo;I want to be better with
                money&rdquo; is a wish. &ldquo;I will save &pound;200 per month into my emergency
                fund for 12 months to build a &pound;2,400 safety net by December 2025&rdquo; is a
                goal. The framework that turns wishes into achievable goals is{' '}
                <strong>SMART</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The SMART Framework</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">S</span>
                    </span>
                    <span>
                      <strong>Specific:</strong> What exactly are you trying to achieve? Not
                      &ldquo;save money&rdquo; but &ldquo;build an emergency fund of
                      &pound;4,800.&rdquo; Name the goal precisely.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-xs font-bold">M</span>
                    </span>
                    <span>
                      <strong>Measurable:</strong> How will you track progress? A specific number,
                      amount, or percentage. &ldquo;&pound;200 per month&rdquo; is measurable.
                      &ldquo;More&rdquo; is not.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-xs font-bold">A</span>
                    </span>
                    <span>
                      <strong>Achievable:</strong> Is this realistic given your income, expenses,
                      and commitments? A &pound;200 per month goal on a &pound;2,000 take-home pay
                      is challenging but achievable. A &pound;1,000 per month goal on the same
                      income is not.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-xs font-bold">R</span>
                    </span>
                    <span>
                      <strong>Relevant:</strong> Does this goal matter to you and your life right
                      now? If you do not own a property, saving for home improvements is not
                      relevant. If you have no emergency fund, building one is highly relevant.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-xs font-bold">T</span>
                    </span>
                    <span>
                      <strong>Time-bound:</strong> By when? A deadline creates urgency. &ldquo;By
                      December 2025&rdquo; is time-bound. &ldquo;Eventually&rdquo; or &ldquo;one
                      day&rdquo; is not.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Trade-Specific SMART Goal Examples
                </p>
                <div className="space-y-3">
                  {[
                    '&ldquo;I will save &pound;150 per month into an easy-access account to build a &pound;1,800 starter emergency fund by December 2025.&rdquo;',
                    '&ldquo;I will contribute &pound;333 per month to a Lifetime ISA (&pound;4,000 per year) to save a &pound;25,000 house deposit (including government bonuses) within 5 years.&rdquo;',
                    '&ldquo;I will increase my pension contributions from 5% to 8% of salary by April 2025 to take full advantage of my employer&rsquo;s 6% matching offer.&rdquo;',
                    '&ldquo;I will pay off my &pound;2,400 credit card balance by making &pound;200 per month payments, clearing it entirely within 12 months.&rdquo;',
                    '&ldquo;I will set aside &pound;800 per month (28% of profit) into a separate tax provision account to ensure I can pay my January Self Assessment bill in full.&rdquo;',
                    '&ldquo;I will save &pound;3,000 over 18 months to fund my 18th Edition qualification and exam fees, setting aside &pound;170 per month.&rdquo;',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Short-Term Goals (0–2 Years) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Short-Term Goals (0&ndash;2 Years)
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Short-term goals are your immediate priorities. They form the{' '}
                <strong>foundation</strong> of your financial plan. Without these in place, nothing
                else works properly. Think of short-term goals as laying the groundwork &mdash; you
                would not wire a house without first installing the consumer unit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Priority Short-Term Goals for Electricians
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">1</span>
                    </span>
                    <span>
                      <strong>Build a &pound;1,000 starter emergency fund.</strong> This is priority
                      number one. It stops you falling into expensive debt when an unexpected bill
                      arrives. Save &pound;50&ndash;&pound;100 per month into a separate easy-access
                      account.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">2</span>
                    </span>
                    <span>
                      <strong>Pay off high-interest debt.</strong> Credit cards, store cards, and
                      payday loans. Use the avalanche method (highest interest first) or the
                      snowball method (smallest balance first) from Module 3. Clear these before
                      focusing on bigger savings goals.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">3</span>
                    </span>
                    <span>
                      <strong>Set up proper business accounts (if self-employed).</strong> Separate
                      your personal and business finances. Create your three pots: emergency fund,
                      tax provision, and general savings. Automate transfers on payment day.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">4</span>
                    </span>
                    <span>
                      <strong>Get essential insurance in place.</strong> Public liability insurance
                      at minimum. Add professional indemnity if you design or certify. Consider
                      tools cover and income protection.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">5</span>
                    </span>
                    <span>
                      <strong>Create a monthly budget.</strong> Know exactly what comes in, what
                      goes out, and what is left. Use the 50/30/20 framework from Module 2 as a
                      starting point. Track spending for at least 3 months to establish accurate
                      baselines.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why Short-Term Goals Come First
                </p>
                <p className="text-white text-sm">
                  It is tempting to skip straight to saving for a house deposit or investing for
                  retirement. But without the foundation &mdash; an emergency fund, no high-interest
                  debt, proper insurance &mdash; a single unexpected event will derail everything. A
                  &pound;2,000 car repair without an emergency fund goes on a credit card at 22%
                  interest. That credit card debt then drains the money you were putting towards
                  your house deposit. Short-term goals prevent this cascade. Build the foundation
                  first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Medium-Term Goals (2–10 Years) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Medium-Term Goals (2&ndash;10 Years)
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Medium-term goals are the substantial objectives that require sustained effort over
                several years. These are the goals that significantly improve your financial
                position and quality of life. They build on the foundation you created with your
                short-term goals.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Medium-Term Goals for Electricians
                </p>
                <div className="space-y-3">
                  {[
                    'Save a house deposit using a Lifetime ISA (&pound;4,000/year + 25% government bonus)',
                    'Build the full 3&ndash;6 month emergency fund (upgrade from the &pound;1,000 starter)',
                    'Build meaningful pension savings &mdash; aim for at least 12&ndash;15% of income going into your pension',
                    'Save for qualifications that increase your earning potential (18th Edition update, design qualifications, inspection and testing)',
                    'Save for a new or replacement work van (&pound;15,000&ndash;&pound;30,000)',
                    'Build a Stocks &amp; Shares ISA for long-term wealth growth',
                    'Clear any remaining lower-interest debt (car finance, personal loans)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Savings Vehicles for Medium-Term Goals
                </p>
                <p className="text-white text-sm">
                  For medium-term goals (2&ndash;10 years), use a mix of savings products. Cash ISAs
                  or regular savings accounts are suitable for goals within 2&ndash;5 years where
                  you cannot afford to lose capital (house deposit, van fund). A Stocks &amp; Shares
                  ISA may be suitable for goals at the 5&ndash;10 year end, where you can tolerate
                  some short-term volatility for potentially higher returns. A Lifetime ISA is ideal
                  for a first home deposit if you are eligible. Always match the risk level of the
                  savings product to the timeframe and importance of the goal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Long-Term Goals (10+ Years) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Long-Term Goals (10+ Years)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Long-term goals are the big-picture objectives that define your financial future.
                These goals benefit enormously from compound growth &mdash; the earlier you start,
                the more time your money has to grow. Starting at 25 instead of 35 can mean the
                difference between a comfortable retirement and a struggling one.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Long-Term Goals for Electricians
                </p>
                <div className="space-y-3">
                  {[
                    'Retirement planning: build a pension pot that provides the income you want in retirement (see Module 4)',
                    'Mortgage payoff: aim to be mortgage-free before retirement, or as early as possible',
                    'Financial independence: reaching the point where investment income covers your living costs',
                    'Career transition fund: saving for a period of retraining, moving into management, or starting a business',
                    'Children&rsquo;s education or inheritance: building wealth to pass on or support the next generation',
                    'Property investment: buying additional properties for rental income or long-term capital growth',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Power of Starting Early
                </p>
                <p className="text-white text-sm">
                  If you invest &pound;200 per month from age 25 in a pension or Stocks &amp; Shares
                  ISA with an average 7% annual return, by age 55 you would have approximately{' '}
                  <strong>&pound;244,000</strong>. If you wait until age 35 to start, the same
                  &pound;200 per month only grows to approximately <strong>&pound;122,000</strong>{' '}
                  by age 55 &mdash; roughly half, despite only starting 10 years later. That is the
                  power of compound growth. The best time to start was yesterday. The second best
                  time is today.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Long-Term Savings Vehicles</p>
                <p className="text-white text-sm">
                  For goals 10+ years away, you can afford to take more investment risk because you
                  have time to recover from short-term market falls. Pensions (workplace or SIPP)
                  offer tax relief on contributions and tax-free growth. Stocks &amp; Shares ISAs
                  offer tax-free growth with more flexibility (you can access the money before
                  retirement). Most long-term savers use a combination of pension and ISA, with the
                  pension for retirement income and the ISA for financial flexibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Your Personal Financial Action Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Your Personal Financial Action Plan
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This is where everything comes together. Your personal financial action plan pulls
                together learning from all 5 modules of this course into a single, practical
                document that guides your financial decisions. This is not a theoretical exercise
                &mdash; it is a living plan that you review and update regularly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Your Action Plan Checklist</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-rose-400 mb-2">
                      From Module 1: Income &amp; Tax
                    </p>
                    <div className="space-y-1.5">
                      {[
                        'I know my net monthly income after tax and NICs',
                        'I understand my tax obligations (PAYE or Self Assessment)',
                        'If self-employed: I have a tax provision pot with 25&ndash;30% of profit ring-fenced',
                        'I am claiming all allowable business expenses',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-400 mb-2">
                      From Module 2: Budgeting &amp; Spending
                    </p>
                    <div className="space-y-1.5">
                      {[
                        'I have a monthly budget that I track and review',
                        'I know my essential vs discretionary spending split',
                        'I have automated my saving (standing orders on payday)',
                        'I am using the 50/30/20 framework (or similar) as a guide',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400 mb-2">
                      From Module 3: Debt &amp; Credit
                    </p>
                    <div className="space-y-1.5">
                      {[
                        'I know my total debt and the interest rate on each debt',
                        'I have a debt repayment plan (avalanche or snowball method)',
                        'I am not taking on new high-interest debt',
                        'I have checked my credit file in the last 12 months',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-400 mb-2">
                      From Module 4: Pensions &amp; Retirement
                    </p>
                    <div className="space-y-1.5">
                      {[
                        'I am enrolled in a workplace pension (or have a SIPP if self-employed)',
                        'I am contributing enough to get my full employer match (if applicable)',
                        'I know my State Pension forecast (check at gov.uk)',
                        'I have a target retirement age and income in mind',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400 mb-2">
                      From Module 5: Protection &amp; Planning
                    </p>
                    <div className="space-y-1.5">
                      {[
                        'I have an emergency fund (target: &pound;1,000 starter, then 3&ndash;6 months)',
                        'I have public liability insurance (and professional indemnity if needed)',
                        'I have considered income protection, tools cover, and life insurance',
                        'I have written SMART financial goals for short, medium, and long term',
                        'I have a date in my calendar for my annual financial MOT',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Your First Three Actions</p>
                <p className="text-white text-sm">
                  Do not try to do everything at once. Pick the{' '}
                  <strong>three most impactful actions</strong> from the checklist above and commit
                  to completing them within the next 30 days. For most people, the highest-impact
                  first actions are: (1) set up a standing order for your emergency fund, (2) check
                  or increase your pension contribution to get the full employer match, and (3) get
                  a public liability insurance quote (if you do not already have cover). These three
                  actions alone will dramatically improve your financial position.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Annual Financial MOT */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Your Annual Financial MOT
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Just like your van needs an MOT every year, your finances need an annual check-up. A
                financial MOT is a structured review of your entire financial situation &mdash; what
                is working, what needs to change, and what your priorities should be for the year
                ahead. It takes 2&ndash;3 hours once a year and is one of the most valuable things
                you can do for your financial health.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Annual Financial MOT Checklist
                </p>
                <div className="space-y-3">
                  {[
                    'Review your SMART goals: Did you hit your targets? Why or why not? Set new goals for the year ahead.',
                    'Check your emergency fund: Is it still at the right level? Has your lifestyle changed (new mortgage, baby, higher bills)?',
                    'Review your budget: Is it still accurate? Have your income or expenses changed significantly?',
                    'Check your credit file: Get your free statutory credit report from Experian, Equifax, and TransUnion. Check for errors.',
                    'Review insurance policies: Are they still adequate? Are you getting competitive rates? Shop around at renewal.',
                    'Check pension contributions: Are you on track for your target retirement income? Could you increase contributions?',
                    'Review your debts: What is the outstanding balance and interest rate on each? Can you pay off or refinance any?',
                    'Check your State Pension forecast: Visit gov.uk to see your projected State Pension. Are you on track for the full amount?',
                    'Review your tax position: Are you using all available allowances (Personal Allowance, ISA, pension relief)?',
                    'Update your tool inventory: Have you bought new tools? Update serial numbers and values for insurance.',
                    'Check your will: If you have dependants or assets, do you have a valid will? Does it need updating?',
                    'Set 3 priority actions for the year ahead: What are the three most impactful things you can do this year?',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Free Financial Guidance Resources
                </p>
                <div className="space-y-2">
                  {[
                    'MoneyHelper (moneyhelper.org.uk) &mdash; free, impartial financial guidance on all topics',
                    'StepChange (stepchange.org) &mdash; free expert debt advice and debt management plans',
                    'Citizens Advice (citizensadvice.org.uk) &mdash; benefits, debt, consumer rights, and employment',
                    'Pension Wise (moneyhelper.org.uk/pensionwise) &mdash; free pension guidance for over 50s',
                    'HMRC (gov.uk) &mdash; State Pension forecast, Self Assessment, tax guidance',
                    'National Debtline (nationaldebtline.org) &mdash; free telephone debt advice',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  When to Do Your Financial MOT
                </p>
                <p className="text-white text-sm">
                  The best time is in <strong>January or February</strong>, for three reasons: (1)
                  it is before the end of the tax year (5 April), so you still have time to maximise
                  ISA contributions and pension payments for the current year; (2) it is after
                  Christmas, when you are naturally more focused on getting finances in order; and
                  (3) it is around the time self-employed workers are completing their Self
                  Assessment tax return, so your financial information is fresh. Put it in your
                  calendar now &mdash; set a recurring annual reminder.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Congratulations</p>
                <p className="text-white text-sm">
                  If you have worked through all 5 modules of this course, you now have a solid
                  understanding of personal finance as it applies to UK electricians and
                  tradespeople. You understand your income and tax, how to budget effectively, how
                  to manage debt and credit, how pensions work, and how to protect yourself
                  financially while planning for the future. The knowledge is only valuable if you
                  act on it. Pick your top three actions, set a date for your first financial MOT,
                  and start building the financial future you deserve.
                </p>
              </div>
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-6">
              Next: Module 6 &mdash; Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
