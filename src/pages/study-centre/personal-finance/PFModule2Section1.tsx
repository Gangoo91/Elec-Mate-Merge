import { ArrowLeft, PieChart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-2-1-check1',
    question:
      'In the 50/30/20 rule, what percentage of take-home pay should go towards needs such as rent, utilities, and essential bills?',
    options: ['20%', '30%', '50%', '70%'],
    correctIndex: 2,
    explanation:
      'The 50/30/20 rule allocates 50% of take-home pay to needs (housing, utilities, food, transport, insurance), 30% to wants (dining out, hobbies, subscriptions), and 20% to savings and debt repayment. For tradespeople with irregular income, these percentages are applied to the baseline month figure rather than the highest-earning month.',
  },
  {
    id: 'pf-2-1-check2',
    question: 'What is the key principle behind zero-based budgeting?',
    options: [
      'You start each month with zero savings',
      'Every pound of income is assigned a specific job before the month begins',
      'You spend nothing until all debts are cleared',
      'You budget only for essential items and ignore wants entirely',
    ],
    correctIndex: 1,
    explanation:
      'Zero-based budgeting means every single pound of income is allocated a purpose before the month starts &mdash; whether that is bills, savings, tax provision, or spending money. Income minus outgoings should equal zero. This does not mean you spend everything; it means every pound has a plan, including the pounds earmarked for savings.',
  },
  {
    id: 'pf-2-1-check3',
    question:
      'In the Tradesperson&rsquo;s Five-Account System, which account should receive money first when a customer payment arrives?',
    options: [
      'The Spending account',
      'The Bills account',
      'The Tax account',
      'The Savings account',
    ],
    correctIndex: 2,
    explanation:
      'When a customer payment lands, the very first transfer should be to the Tax account &mdash; typically 30% of the gross amount. This ensures HMRC money is never accidentally spent. Only after the tax provision is made should the remaining funds be distributed across the other accounts.',
  },
];

const faqs = [
  {
    question: 'Which budgeting method is best for electricians with irregular income?',
    answer:
      'There is no single best method &mdash; it depends on your personality and circumstances. However, many self-employed electricians find that combining the baseline month approach (budgeting to the lowest likely income month) with the Five-Account System gives the best results. The baseline month stops you overspending in good months, while the five accounts automate the separation of tax, bills, and spending money so you never raid your tax fund by accident.',
  },
  {
    question: 'How do I work out my 50/30/20 split if my income changes every month?',
    answer:
      'Use your baseline month figure &mdash; the lowest realistic monthly income you expect over the next 12 months. Apply the 50/30/20 percentages to that baseline. In months where you earn more than the baseline, the surplus should go straight into your savings or emergency fund. This way you never budget based on money you might not earn.',
  },
  {
    question: 'Is the envelope system outdated now that everything is digital?',
    answer:
      'The principle of the envelope system is timeless &mdash; ring-fencing money for specific purposes stops overspending. The physical version still works well for cash spending categories like groceries and fuel. But digital versions are equally effective: Starling Spaces, Monzo Pots, and Chase round-ups all replicate the envelope concept within your banking app. Many tradespeople use a hybrid approach &mdash; digital pots for fixed costs and physical cash for variable daily spending.',
  },
  {
    question: 'Do I really need five separate bank accounts?',
    answer:
      'You do not necessarily need five separate bank accounts with different providers. Most digital banks let you create named &ldquo;pots&rdquo; or &ldquo;spaces&rdquo; within a single account, which achieves the same ring-fencing effect. The key principle is separation &mdash; your tax money, business expenses, personal bills, everyday spending, and savings should never be mixed in one pot. Whether you achieve this with five accounts or five pots within one account, the discipline is what matters.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to MoneyHelper research, what percentage of UK adults do not have a household budget?',
    options: ['About 20%', 'About 33%', 'About 50%', 'About 75%'],
    correctAnswer: 2,
    explanation:
      'MoneyHelper research consistently shows that around half of UK adults do not maintain any form of household budget. Among the self-employed, the figure is even higher because irregular income makes traditional budgeting feel impossible &mdash; which is exactly why trade-specific budgeting methods are so important.',
  },
  {
    id: 2,
    question: 'In the 50/30/20 rule, what does the 20% allocation cover?',
    options: [
      'Housing and essential bills',
      'Wants such as dining out and hobbies',
      'Savings, investments, and additional debt repayment',
      'Business expenses and materials',
    ],
    correctAnswer: 2,
    explanation:
      'The 20% allocation in the 50/30/20 rule covers savings (emergency fund, pension contributions, investments) and additional debt repayment above minimum payments. Needs take 50% and wants take 30%.',
  },
  {
    id: 3,
    question:
      'What is the main advantage of zero-based budgeting for someone with irregular income?',
    options: [
      'It eliminates the need for a bank account',
      'It forces you to plan every pound, preventing untracked spending',
      'It guarantees a fixed income each month',
      'It removes the need to save for tax',
    ],
    correctAnswer: 1,
    explanation:
      'Zero-based budgeting forces you to allocate every pound of income to a specific category before the month begins. This is particularly powerful for irregular earners because it prevents the common trap of &ldquo;money came in so I spent it&rdquo; &mdash; every pound has a job, whether that is tax, bills, or savings.',
  },
  {
    id: 4,
    question: 'What is the traditional envelope system?',
    options: [
      'A system where you post cash to yourself each month',
      'A method where you divide cash into labelled envelopes for different spending categories',
      'A business invoicing system using pre-printed envelopes',
      'A way to organise receipts for tax returns',
    ],
    correctAnswer: 1,
    explanation:
      'The traditional envelope system involves withdrawing your budgeted spending money in cash and dividing it into labelled envelopes &mdash; one for each category (groceries, fuel, entertainment, etc.). When an envelope is empty, spending in that category stops until the next pay period. It provides a powerful physical constraint on overspending.',
  },
  {
    id: 5,
    question: 'In the Tradesperson&rsquo;s Five-Account System, what are the five accounts?',
    options: [
      'Current, Savings, Credit Card, Loan, Investment',
      'Tax, Business, Bills, Spending, Savings',
      'Income, Outgoings, Profit, Loss, Reserve',
      'HMRC, VAT, PAYE, NI, Pension',
    ],
    correctAnswer: 1,
    explanation:
      'The Five-Account System uses: Tax (30% of gross income held for HMRC), Business (materials, tools, vehicle, insurance), Bills (rent/mortgage, utilities, council tax), Spending (everyday personal spending), and Savings (emergency fund, pension, goals). This structure ensures tax money is never accidentally spent and business costs do not erode personal finances.',
  },
  {
    id: 6,
    question: 'Which digital banking feature replicates the envelope system?',
    options: [
      'Direct debits',
      'Standing orders',
      'Named pots or spaces within a banking app',
      'Contactless payment limits',
    ],
    correctAnswer: 2,
    explanation:
      'Starling Spaces, Monzo Pots, and similar features in digital banking apps allow you to create named, ring-fenced sub-accounts within your main account. Each pot acts like a digital envelope &mdash; money is separated and visible but not mixed with your main spending balance.',
  },
  {
    id: 7,
    question:
      'Why is 30% typically recommended as the tax provision percentage for self-employed tradespeople?',
    options: [
      'Because the basic rate of income tax is 30%',
      'Because it covers income tax at the basic rate plus Class 2 and Class 4 National Insurance contributions',
      'Because HMRC requires exactly 30% to be held in a separate account',
      'Because 30% is the VAT rate for construction services',
    ],
    correctAnswer: 1,
    explanation:
      'The 30% rule of thumb covers the combination of income tax (20% basic rate) and Class 4 National Insurance contributions (6% on profits between &pound;12,570 and &pound;50,270 from April 2024). While not exact for every individual, 30% provides a safe buffer that means most sole traders will have enough set aside when their Self Assessment bill arrives &mdash; and any surplus becomes a bonus.',
  },
  {
    id: 8,
    question: 'Elizabeth Warren popularised the 50/30/20 rule. Which book introduced the concept?',
    options: [
      'Rich Dad Poor Dad',
      'The Total Money Makeover',
      'All Your Worth: The Ultimate Lifetime Money Plan',
      'Think and Grow Rich',
    ],
    correctAnswer: 2,
    explanation:
      'Senator Elizabeth Warren and her daughter Amelia Warren Tyagi introduced the 50/30/20 rule in their 2005 book &ldquo;All Your Worth: The Ultimate Lifetime Money Plan&rdquo;. The rule was designed as a simple, memorable framework that anyone could apply without needing a spreadsheet or accounting knowledge.',
  },
];

export default function PFModule2Section1() {
  useSEO({
    title: 'Budgeting Methods That Work | Personal Finance Module 2.1',
    description:
      "The 50/30/20 rule, zero-based budgeting, envelope system, and the Tradesperson's Five-Account System for electricians and self-employed tradespeople.",
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
            <PieChart className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Budgeting Methods That Work
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Practical budgeting frameworks adapted for tradespeople &mdash; from the 50/30/20 rule
            to the Five-Account System designed specifically for irregular earners
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>50/30/20:</strong> Needs / Wants / Savings &mdash; adapted to your baseline
                month
              </li>
              <li>
                <strong>Zero-based:</strong> Every pound gets a job before the month starts
              </li>
              <li>
                <strong>Five accounts:</strong> Tax, Business, Bills, Spending, Savings
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Half of UK adults</strong> have no budget at all (MoneyHelper)
              </li>
              <li>
                <strong>Self-employed</strong> tradespeople face unique cash flow challenges
              </li>
              <li>
                <strong>Right method</strong> depends on your personality &amp; work pattern
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the 50/30/20 rule and adapt it for irregular income',
              'Apply zero-based budgeting to a month with variable earnings',
              'Describe the envelope system and its digital equivalents',
              "Set up the Tradesperson's Five-Account System",
              'Choose the budgeting method best suited to your work pattern',
              'Calculate your baseline month figure for budget planning',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Budgeting Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Why Budgeting Matters for Tradespeople
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MoneyHelper research consistently shows that around half of UK adults do not
                maintain any form of household budget. Among the self-employed, that figure climbs
                higher still &mdash; not because tradespeople are irresponsible with money, but
                because traditional budgeting advice assumes a fixed monthly salary that arrives on
                the same date every month. When you are an electrician whose income might be
                &pound;4,200 one month and &pound;1,800 the next, a standard budget template feels
                useless.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Statistic:</strong> IPSE (the Association of
                  Independent Professionals and the Self-Employed) found that 89% of self-employed
                  workers have experienced &ldquo;income anxiety&rdquo; &mdash; worry caused
                  specifically by not knowing what they will earn next month. A working budget is
                  the single most effective tool for reducing that anxiety.
                </p>
              </div>

              <p>
                A budget is not about restricting what you spend. It is about{' '}
                <strong>knowing where your money goes</strong> so that you can make deliberate
                choices. Without a budget, money tends to evaporate &mdash; small purchases,
                forgotten subscriptions, and impulse tool buys quietly drain your account until the
                tax bill arrives and there is nothing left. With a budget, you see the full picture
                and can act early.
              </p>

              <p>
                The good news is that budgeting for irregular income is a solved problem. It simply
                requires a different approach from the one taught in most personal finance books. In
                this section we will cover four proven methods &mdash; the 50/30/20 rule, zero-based
                budgeting, the envelope system, and the Tradesperson&rsquo;s Five-Account System
                &mdash; and show you how to adapt each one to the realities of trade work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What a Good Budget Gives You</p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visibility:</strong> You know exactly what
                      comes in, what goes out, and what is left
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Control:</strong> You decide where every pound
                      goes instead of wondering where it went
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tax confidence:</strong> You know your HMRC
                      money is safe and untouched
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reduced stress:</strong> Financial anxiety
                      drops dramatically when you have a plan
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Goal progress:</strong> Whether it is a new
                      van, a house deposit, or early retirement, budgeting makes it measurable
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The method you choose matters less than the act of choosing one and sticking with
                it. Every budgeting system works if you use it consistently. The trick is finding
                the one that fits your brain, your work pattern, and your life &mdash; then making
                it a habit rather than a chore.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The 50/30/20 Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The 50/30/20 Rule
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 50/30/20 rule was popularised by Senator Elizabeth Warren and her daughter
                Amelia Warren Tyagi in their 2005 book{' '}
                <em>All Your Worth: The Ultimate Lifetime Money Plan</em>. It is the simplest
                budgeting framework available and works well as a starting point for anyone who has
                never budgeted before.
              </p>

              <p>
                The principle is straightforward: divide your <strong>take-home pay</strong> (after
                tax) into three categories:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Categories</p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">50% &mdash; Needs:</strong> Housing (rent or
                      mortgage), council tax, utilities (gas, electric, water), food and groceries,
                      transport (van costs, fuel, insurance), minimum debt repayments, essential
                      insurance, and phone contract
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">30% &mdash; Wants:</strong> Dining out,
                      takeaways, streaming subscriptions (Netflix, Spotify), hobbies and leisure,
                      holidays, clothing beyond essentials, gym membership, and non-essential
                      upgrades
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">20% &mdash; Savings &amp; Debt:</strong>{' '}
                      Emergency fund contributions, pension payments, ISA deposits, investments, and
                      any debt repayment above the minimum (credit cards, loans, overdrafts)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Trade Adaptation:</strong> If you are
                  self-employed, apply the 50/30/20 split to your <strong>baseline month</strong>{' '}
                  figure &mdash; the lowest realistic monthly income you expect. In months where you
                  earn above the baseline, send the surplus straight to savings. This prevents the
                  common trap of inflating your lifestyle in good months and scrambling in quiet
                  ones.
                </p>
              </div>

              <p>
                <strong>Example:</strong> Suppose your baseline month take-home (after setting aside
                30% for tax) is &pound;2,000. Your 50/30/20 split would be:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Needs:</strong> &pound;1,000 (rent, bills, food, van costs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Wants:</strong> &pound;600 (dining out, subscriptions, hobbies)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Savings &amp; Debt:</strong> &pound;400 (emergency fund, pension,
                      extra debt payments)
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The beauty of the 50/30/20 rule is its simplicity. You do not need a spreadsheet
                with 47 categories. You need three numbers. If your needs exceed 50%, that is a
                signal to review your fixed costs. If your savings are below 20%, that is a signal
                to trim your wants. It gives you a quick health check on your overall financial
                balance.
              </p>

              <p>
                <strong>Limitations for tradespeople:</strong> The 50/30/20 rule does not account
                for business expenses (materials, tools, vehicle costs) or the need to set aside tax
                before calculating take-home pay. It also does not distinguish between seasonal
                variation in income. For these reasons, many tradespeople use 50/30/20 as a starting
                framework and then layer on additional structure &mdash; such as the Five-Account
                System covered later in this section.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Zero-Based Budgeting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Zero-Based Budgeting
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Zero-based budgeting (ZBB) takes a fundamentally different approach from the
                50/30/20 rule. Instead of splitting your income into three broad buckets, you assign{' '}
                <strong>every single pound</strong> to a specific category before the month begins.
                Your income minus your planned outgoings should equal exactly zero &mdash; not
                because you spend everything, but because every pound has been given a job,
                including the pounds allocated to savings.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> Income &minus; (All
                  Allocated Spending + Savings + Tax Provision) = &pound;0. If there is money left
                  over after allocation, you have not finished budgeting. Assign it somewhere
                  &mdash; even if that somewhere is an &ldquo;unallocated surplus&rdquo; pot that
                  rolls into savings.
                </p>
              </div>

              <p>
                Zero-based budgeting was originally developed for corporate use by Peter Pyhrr at
                Texas Instruments in the 1970s. It was adapted for personal finance by Dave Ramsey
                and has since become one of the most popular methods for people with irregular
                income, precisely because it forces you to work with the money you actually have
                rather than the money you hope to earn.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How to Zero-Base Budget on Irregular Income
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 1:</strong> List all income received this
                      month (customer payments, retainer fees, any side income). Use actual figures,
                      not estimates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 2:</strong> Immediately set aside 30% for
                      tax into your dedicated tax account. The remaining 70% is your
                      &ldquo;budgetable&rdquo; income
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 3:</strong> List every expense category in
                      priority order &mdash; housing first, then utilities, food, transport,
                      insurance, minimum debt payments, then wants, then savings goals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 4:</strong> Allocate money to each
                      category from top to bottom until every pound is assigned. If income is low
                      this month, the bottom items get reduced or zeroed out
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 5:</strong> Track spending throughout the
                      month. If you overspend in one category, move money from another &mdash; never
                      create unallocated spending
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The priority ordering in Step 3 is crucial for tradespeople. In a low-income month,
                you might fully fund housing, utilities, and food but reduce or eliminate the budget
                for dining out and hobbies. In a high-income month, every category gets funded and
                the surplus flows to savings. This built-in flexibility is what makes zero-based
                budgeting so effective for irregular earners.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical Tip:</strong> If you find it hard to
                  zero-base budget at the start of the month (because you do not yet know how much
                  you will earn), try budgeting on a <strong>weekly</strong> basis instead. Each
                  Friday, allocate the money that has come in during the week. This is particularly
                  effective for electricians who invoice weekly or get paid on completion of each
                  job.
                </p>
              </div>

              <p>
                <strong>Advantages:</strong> Forces complete awareness of spending; works well with
                irregular income; prioritises essentials automatically; eliminates &ldquo;mystery
                spending&rdquo; where money disappears without being tracked.
              </p>

              <p>
                <strong>Disadvantages:</strong> More time-consuming than 50/30/20; requires
                discipline to track every transaction; can feel restrictive if you are not used to
                planning spending in advance. Most people need 2&ndash;3 months of practice before
                it becomes second nature.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: The Envelope System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The Envelope System
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The envelope system is one of the oldest budgeting methods in existence, and it
                works because it exploits a simple psychological truth:{' '}
                <strong>
                  spending physical cash feels more &ldquo;real&rdquo; than tapping a card
                </strong>
                . Research published in the Journal of Consumer Research found that people spend
                12&ndash;18% less when using cash compared to card payments, because the physical
                act of handing over notes triggers a stronger &ldquo;pain of paying&rdquo; response
                in the brain.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Traditional Method</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 1:</strong> Decide your spending
                      categories: groceries, fuel, entertainment, lunches on site, clothing,
                      personal spending
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 2:</strong> Assign a budget amount to each
                      category for the week or month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 3:</strong> Withdraw cash and divide it
                      into labelled envelopes &mdash; one per category
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 4:</strong> When you need to spend in a
                      category, take cash from that envelope only. When the envelope is empty,
                      spending in that category stops
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Step 5:</strong> At the end of the period, any
                      cash remaining in an envelope either rolls forward or goes to savings
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For tradespeople, the envelope system works particularly well for variable-spend
                categories like lunches on site, fuel top-ups, and personal spending money. Fixed
                costs like rent, utilities, and insurance are better handled by direct debits from a
                dedicated bills account.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Digital Alternatives:</strong> If carrying cash
                  feels impractical (and for many tradespeople it does), several UK banking apps now
                  offer built-in envelope functionality:
                </p>
                <ul className="text-sm text-white space-y-1 mt-2">
                  <li>
                    &bull; <strong>Starling Spaces:</strong> Create up to 5 named savings spaces
                    within your personal account (unlimited on business accounts)
                  </li>
                  <li>
                    &bull; <strong>Monzo Pots:</strong> Create named pots for different spending
                    categories; set automatic deposits on payday
                  </li>
                  <li>
                    &bull; <strong>Chase Round-Ups:</strong> Automatically round up card purchases
                    and save the difference
                  </li>
                  <li>
                    &bull; <strong>Revolut Vaults:</strong> Create named vaults with automatic
                    funding rules and round-up features
                  </li>
                </ul>
              </div>

              <p>
                The digital envelope approach has one significant advantage over physical cash: you
                can set up <strong>automatic transfers</strong> that move money into the right pots
                the moment income arrives. This removes the willpower requirement entirely &mdash;
                the money is separated before you have a chance to spend it.
              </p>

              <p>
                Many tradespeople use a <strong>hybrid approach</strong>: digital pots for fixed
                costs and savings goals, combined with a weekly cash withdrawal for variable
                spending like lunches, coffees, and incidental purchases on site. This gives you the
                convenience of digital banking for the boring stuff and the psychological spending
                brake of physical cash for the day-to-day stuff.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Tradesperson's Five-Account System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            The Tradesperson&rsquo;s Five-Account System
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Five-Account System is not found in mainstream personal finance books because it
                was developed specifically for self-employed tradespeople and small business owners
                who need to manage tax, business costs, and personal finances from the same income
                stream. It combines elements of zero-based budgeting and the envelope system into a
                structure that prevents the most common financial mistakes made by sole traders.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Five Accounts</p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">1. Tax Account:</strong> Receives 30% of
                      every customer payment immediately. This money belongs to HMRC and is never
                      touched for any other purpose. It covers income tax (20% basic rate) plus
                      Class 4 National Insurance (6% on profits between &pound;12,570 and
                      &pound;50,270). Any surplus after paying your Self Assessment bill becomes a
                      bonus
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">2. Business Account:</strong> Funds
                      materials, tools, vehicle costs, professional insurance, trade body
                      memberships, training courses, and any other legitimate business expenses.
                      This is the account your business debit card is linked to
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-blue-400">3. Bills Account:</strong> Covers all fixed
                      personal costs &mdash; rent or mortgage, council tax, utilities, home
                      insurance, broadband, phone contract, and any regular subscriptions. Direct
                      debits come from this account only
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">4. Spending Account:</strong> Your everyday
                      personal spending money &mdash; groceries, fuel for personal use, dining out,
                      entertainment, clothing. This is the account your personal debit card is
                      linked to. When it is empty, you stop spending until the next allocation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-purple-400">5. Savings Account:</strong> Emergency
                      fund, pension contributions, holiday fund, van replacement fund, house
                      deposit, or any other financial goal. This money is only touched for its
                      designated purpose
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Flow:</strong> When a customer payment of
                  &pound;1,000 lands in your business account: (1)&nbsp;Transfer &pound;300 to Tax
                  immediately. (2)&nbsp;Keep &pound;200 in Business for materials and costs.
                  (3)&nbsp;Transfer &pound;250 to Bills. (4)&nbsp;Transfer &pound;150 to Spending.
                  (5)&nbsp;Transfer &pound;100 to Savings. The exact split varies by person, but the{' '}
                  <strong>tax transfer always happens first</strong>.
                </p>
              </div>

              <p>
                The power of this system lies in its <strong>automation</strong>. Once you know your
                typical split percentages, you can set up automatic transfers that trigger when
                money arrives. Starling Business accounts, Tide, and Monzo Business all allow
                rule-based transfers. The money is separated within seconds of arriving, removing
                the temptation to spend the tax fund on a new impact driver.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Setting Up the System</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Option A &mdash; Five separate accounts:
                      </strong>{' '}
                      Open accounts with different providers (e.g., Starling for business, Monzo for
                      personal, a savings account with Marcus or Chip). Best for people who need
                      hard separation to avoid temptation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Option B &mdash; Pots within one bank:</strong>{' '}
                      Use a single provider with named pots/spaces (Starling Spaces or Monzo Pots).
                      Simpler to manage but requires discipline not to dip into the wrong pot
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Option C &mdash; Hybrid:</strong> A dedicated
                      business account with one provider, plus personal pots within another. This is
                      the most popular approach among tradespeople because it satisfies HMRC&rsquo;s
                      preference for separate business banking while keeping personal finances
                      simple
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Common mistake:</strong> Setting up the five accounts but not defining the
                percentages. Without clear allocation rules, you will default to putting
                &ldquo;whatever feels right&rdquo; into each account, which defeats the purpose. Sit
                down once, work out your typical monthly costs for each category, and set fixed
                percentage splits. Review them quarterly and adjust if needed.
              </p>

              <p>
                <strong>Another common mistake:</strong> Treating the tax account as a general
                reserve. If things get tight one month, the temptation is to &ldquo;borrow&rdquo;
                from the tax account with the intention of putting it back later. This almost never
                works. The tax account is HMRC&rsquo;s money, not yours. Treat it as if it has
                already been paid.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Choosing Your Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Choosing the Right Method for You
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Each budgeting method has strengths and suits different personality types and work
                patterns. The best method is the one you will actually use consistently. Here is a
                comparison to help you choose:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Method Comparison</p>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">50/30/20 Rule</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Best for:</strong> Beginners who want a simple framework
                      </li>
                      <li>
                        &bull; <strong>Time required:</strong> 15 minutes per month
                      </li>
                      <li>
                        &bull; <strong>Irregular income:</strong> Apply to baseline month, surplus
                        to savings
                      </li>
                      <li>
                        &bull; <strong>Weakness:</strong> Does not account for business expenses or
                        tax provision
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">Zero-Based Budgeting</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Best for:</strong> Detail-oriented people who want total
                        control
                      </li>
                      <li>
                        &bull; <strong>Time required:</strong> 30&ndash;60 minutes per month, plus
                        ongoing tracking
                      </li>
                      <li>
                        &bull; <strong>Irregular income:</strong> Excellent &mdash; you budget with
                        actual money received
                      </li>
                      <li>
                        &bull; <strong>Weakness:</strong> Time-consuming; can feel restrictive until
                        habitual
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-1">Envelope System</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Best for:</strong> People who overspend on card; tactile
                        learners
                      </li>
                      <li>
                        &bull; <strong>Time required:</strong> 15 minutes per week (cash withdrawal
                        and split)
                      </li>
                      <li>
                        &bull; <strong>Irregular income:</strong> Good for variable spending; less
                        useful for fixed costs
                      </li>
                      <li>
                        &bull; <strong>Weakness:</strong> Carrying cash is not always practical;
                        digital version loses the psychological brake
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-purple-400 mb-1">Five-Account System</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Best for:</strong> Self-employed tradespeople who need to
                        manage tax and business costs
                      </li>
                      <li>
                        &bull; <strong>Time required:</strong> 30 minutes initial setup, then 5
                        minutes per payment received
                      </li>
                      <li>
                        &bull; <strong>Irregular income:</strong> Designed for it &mdash; percentage
                        splits work at any income level
                      </li>
                      <li>
                        &bull; <strong>Weakness:</strong> Requires multiple accounts or pots;
                        initial setup takes effort
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Our Recommendation:</strong> For most
                  self-employed electricians and tradespeople, the best starting point is the{' '}
                  <strong>Five-Account System</strong> combined with{' '}
                  <strong>zero-based budgeting</strong> for the Spending account. This gives you the
                  structural separation you need for tax and business money, plus the detailed
                  control over personal spending that prevents money from slipping away unnoticed.
                </p>
              </div>

              <p>
                Whatever method you choose, commit to it for at least three months before deciding
                whether it works for you. The first month will feel awkward. The second month will
                feel like effort. By the third month, it starts to become automatic. Do not judge a
                budgeting system based on the first uncomfortable week.
              </p>

              <p>
                Finally, remember that{' '}
                <strong>no budget survives contact with reality unchanged</strong>. Life will throw
                surprises at you &mdash; an unexpected MOT failure, a cancelled job, an emergency
                boiler repair at your own home. A good budget is not rigid; it is a plan that you
                adjust as circumstances change. The goal is not perfection. The goal is awareness
                and control.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../pf-module-2-section-2">
              Next: Managing Irregular Income
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
