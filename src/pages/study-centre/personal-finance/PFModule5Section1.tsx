import { ArrowLeft, PiggyBank, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-5-1-check1',
    question:
      'MoneyHelper recommends building an emergency fund that covers how many months of essential outgoings?',
    options: [
      '1 month of total income',
      '3 to 6 months of essential outgoings',
      '12 months of total salary including bonuses',
      '6 to 12 months of discretionary spending',
    ],
    correctIndex: 1,
    explanation:
      'MoneyHelper recommends building an emergency fund that covers 3 to 6 months of essential outgoings &mdash; not total income, and not discretionary spending. Essential outgoings include rent or mortgage, council tax, utilities, food, transport, and minimum debt repayments. The exact target depends on your employment status and job security.',
  },
  {
    id: 'pf-5-1-check2',
    question:
      'You are a self-employed electrician with no sick pay or holiday pay. What is the recommended minimum emergency fund target?',
    options: [
      '1 month of essential outgoings',
      '3 months of essential outgoings',
      '6 months of essential outgoings',
      '12 months of total turnover',
    ],
    correctIndex: 2,
    explanation:
      'Self-employed tradespeople have no employer-provided sick pay, holiday pay, or redundancy pay. If you are injured, ill, or work dries up, your income drops to zero immediately. MoneyHelper and most financial advisers recommend a minimum of 6 months of essential outgoings for self-employed workers. Some advisers recommend even more if your income is highly seasonal or project-based.',
  },
  {
    id: 'pf-5-1-check3',
    question:
      'Your boiler breaks down unexpectedly. You have &pound;4,000 in your emergency fund. Should you use it?',
    options: [
      'Yes &mdash; it is unexpected, urgent, and necessary, so it qualifies as an emergency',
      'No &mdash; you should put it on a credit card and save the emergency fund for something bigger',
      'Yes &mdash; but only if the boiler costs more than &pound;2,000',
      'No &mdash; emergency funds should only be used for medical bills',
    ],
    correctIndex: 0,
    explanation:
      'A broken boiler in winter meets all three criteria for using your emergency fund: it is unexpected (you did not plan for it), urgent (you need heating and hot water), and necessary (it is not a luxury purchase). This is exactly what the emergency fund is for. After using it, prioritise rebuilding the fund as quickly as possible.',
  },
];

const faqs = [
  {
    question:
      'I only earn &pound;25,000 a year &mdash; can I realistically build an emergency fund?',
    answer:
      'Yes. The key is to start small and be consistent. Even &pound;25 per month builds to &pound;300 in a year. Set up an automatic standing order on payday so the money moves before you can spend it. Use &ldquo;found money&rdquo; &mdash; tax refunds, cashback, overtime payments &mdash; to boost the fund. Your first target should be &pound;1,000, which covers most single emergencies. Build from there towards 3 months of essential outgoings. It takes time, but the financial security is worth it.',
  },
  {
    question: 'Should I pay off debt before building an emergency fund?',
    answer:
      'Most financial advisers recommend building a starter emergency fund of &pound;1,000 first, even if you have debt. Without any emergency fund, an unexpected expense will force you back into debt. Once you have &pound;1,000 saved, focus on paying off high-interest debt (credit cards, store cards, payday loans). After clearing high-interest debt, build the full 3&ndash;6 month emergency fund. Low-interest debt like a mortgage can continue alongside your emergency fund.',
  },
  {
    question: 'Where should I keep my emergency fund?',
    answer:
      'Your emergency fund should be in an easy-access savings account that is separate from your current account. Look for the highest interest rate on an easy-access account &mdash; providers like Chase, Marcus (Goldman Sachs), Chip, and Zopa often offer competitive rates. Avoid notice accounts (30-day or 90-day notice) because you need instant access in an emergency. Avoid fixed-term bonds for the same reason. The money should be accessible within hours, not days or weeks.',
  },
  {
    question: 'Is an emergency fund the same as my tax savings pot?',
    answer:
      'No. If you are self-employed, you need three separate pots: (1) your emergency fund for unexpected personal expenses, (2) a tax provision pot for your Self Assessment tax bill (typically 25&ndash;30% of profit), and (3) general savings for planned purchases and goals. Mixing these pots is dangerous &mdash; if you use your tax money to cover an emergency, you will not be able to pay HMRC when the bill is due, and HMRC charges interest and penalties on late payments.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does MoneyHelper recommend as the target for an emergency fund?',
    options: [
      '1 month of total income',
      '3 to 6 months of essential outgoings',
      '6 to 12 months of discretionary spending',
      'Enough to cover your annual holiday',
    ],
    correctAnswer: 1,
    explanation:
      'MoneyHelper recommends 3 to 6 months of essential outgoings. Essential outgoings are the bills you must pay regardless of circumstances: rent or mortgage, council tax, utilities, food, transport, insurance, and minimum debt repayments.',
  },
  {
    id: 2,
    question:
      'Why do self-employed electricians need a larger emergency fund than employed electricians?',
    options: [
      'Because self-employed electricians earn more money',
      'Because self-employed electricians have no employer-provided sick pay, holiday pay, or redundancy pay',
      'Because HMRC requires self-employed workers to hold a minimum cash reserve',
      'Because self-employed electricians pay less tax',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed tradespeople have no safety net from an employer. If you are ill, injured, or work dries up, your income stops immediately. Employed electricians typically receive statutory sick pay, holiday pay, and potentially redundancy pay, providing a buffer that self-employed workers do not have.',
  },
  {
    id: 3,
    question: 'Which of the following is the best place to keep your emergency fund?',
    options: [
      'A 5-year fixed-rate savings bond for the highest interest',
      'Under your mattress at home for instant access',
      'In an easy-access savings account separate from your current account',
      'In a Stocks and Shares ISA for maximum growth',
    ],
    correctAnswer: 2,
    explanation:
      'An easy-access savings account is ideal because you can withdraw money within hours when an emergency strikes. It should be separate from your current account to reduce the temptation to dip into it. Fixed-rate bonds lock your money away. Cash at home is not protected by the FSCS and earns no interest. A Stocks and Shares ISA can fall in value.',
  },
  {
    id: 4,
    question: 'What are the three criteria for deciding whether to use your emergency fund?',
    options: [
      'Expensive, desirable, and convenient',
      'Unexpected, urgent, and necessary',
      'Planned, budgeted, and approved',
      'Large, recurring, and unavoidable',
    ],
    correctAnswer: 1,
    explanation:
      'Before dipping into your emergency fund, the expense should meet all three criteria: unexpected (you could not have planned for it), urgent (it cannot wait), and necessary (it is not a luxury or discretionary purchase). A broken boiler in winter qualifies. A new television does not.',
  },
  {
    id: 5,
    question:
      'You earn &pound;2,000 per month after tax. Your essential outgoings are &pound;1,400 per month. What is your 3-month emergency fund target?',
    options: ['&pound;2,000', '&pound;4,200', '&pound;6,000', '&pound;1,400'],
    correctAnswer: 1,
    explanation:
      'Your emergency fund is based on essential outgoings, not total income. 3 months of essential outgoings = &pound;1,400 x 3 = &pound;4,200. This covers rent or mortgage, council tax, utilities, food, transport, and minimum debt repayments for three months if your income stops.',
  },
  {
    id: 6,
    question:
      'What is the recommended starter emergency fund target before focusing on paying off high-interest debt?',
    options: ['&pound;100', '&pound;500', '&pound;1,000', '&pound;5,000'],
    correctAnswer: 2,
    explanation:
      'Most financial advisers recommend building a starter emergency fund of &pound;1,000 before aggressively paying off high-interest debt. This prevents you from being forced back into debt when an unexpected expense arises. Once you have &pound;1,000, attack high-interest debt. After clearing it, build the full 3&ndash;6 month fund.',
  },
  {
    id: 7,
    question: 'Why should your emergency fund be kept separate from your tax provision pot?',
    options: [
      'Because HMRC requires them to be in different banks',
      'Because mixing them risks spending your tax money on emergencies, leaving you unable to pay your tax bill',
      'Because emergency funds earn higher interest than tax savings',
      'Because your accountant charges more if they are in the same account',
    ],
    correctAnswer: 1,
    explanation:
      'If your emergency fund and tax provision are in the same pot, an emergency could drain the money you need for your Self Assessment tax bill. HMRC charges interest and penalties on late payments. Keeping them separate ensures you always have your tax money ring-fenced and your emergency fund available for genuine emergencies.',
  },
  {
    id: 8,
    question: 'Which of the following is the best strategy for building your emergency fund?',
    options: [
      'Wait until you have a large lump sum and deposit it all at once',
      'Set up an automatic standing order on payday and boost with found money like tax refunds',
      'Only save money left over at the end of the month',
      'Borrow money to create an instant emergency fund',
    ],
    correctAnswer: 1,
    explanation:
      'The most effective strategy is to automate your saving by setting up a standing order that moves money to your emergency fund on payday &mdash; before you can spend it. Boost the fund with &ldquo;found money&rdquo; like tax refunds, cashback rewards, overtime payments, and birthday money. Waiting until the end of the month usually means there is nothing left. Borrowing defeats the purpose.',
  },
];

export default function PFModule5Section1() {
  useSEO({
    title: 'Building Your Emergency Fund | Personal Finance Module 5.1',
    description:
      'MoneyHelper recommendations, employed vs self-employed targets, where to save, how to start, and when to use your emergency fund.',
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
            <PiggyBank className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Your Emergency Fund
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How much you need, where to keep it, how to build it on any income, and the rules for
            when to use it
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Target:</strong> 3&ndash;6 months of essential outgoings
              </li>
              <li>
                <strong>Self-employed:</strong> Aim for 6 months minimum
              </li>
              <li>
                <strong>Start small:</strong> &pound;1,000 first, then build from there
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>No sick pay?</strong> One injury could wipe you out financially
              </li>
              <li>
                <strong>Van breakdown?</strong> No van means no work means no income
              </li>
              <li>
                <strong>Peace of mind:</strong> Sleep better knowing you have a safety net
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the MoneyHelper recommendation for emergency fund size and why it is based on essential outgoings',
              'Calculate different emergency fund targets for employed and self-employed electricians',
              'Identify the best types of savings account for an emergency fund and explain why accessibility matters',
              'Describe a practical strategy for building an emergency fund from scratch on any income',
              'Apply the three-criteria test (unexpected, urgent, necessary) to decide whether to use the fund',
              'Explain why emergency funds, tax provisions, and general savings must be kept in separate pots',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is an Emergency Fund? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            What Is an Emergency Fund?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An emergency fund is a pot of money set aside specifically to cover{' '}
                <strong>unexpected, urgent, and necessary</strong> expenses. It is not a holiday
                fund, not a savings goal fund, and not a slush fund for treats. It is your financial
                safety net &mdash; the money that stops a single bad event from spiralling into a
                financial crisis.
              </p>
              <p>
                For tradespeople in particular, an emergency fund is not optional &mdash; it is
                essential. If your van breaks down, you cannot get to site. If you injure your back,
                you cannot work. If your main client goes bust, your income stops. Without an
                emergency fund, any of these events forces you into expensive borrowing &mdash;
                credit cards, overdrafts, or payday loans &mdash; which makes the situation worse.
              </p>
              <p>
                According to the Money and Pensions Service (MaPS), approximately 11.5 million
                adults in the UK have less than &pound;100 in savings. This means millions of people
                are one broken boiler, one car repair, or one week of illness away from serious
                financial difficulty. Building even a small emergency fund puts you ahead of the
                majority of the population.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Trades Reality</p>
                <p className="text-white text-sm">
                  Electricians face unique financial risks that office workers do not. Your income
                  depends on your physical ability to work. Your livelihood depends on a vehicle.
                  Your tools are your means of production. A single event &mdash; a knee injury, a
                  van write-off, a stolen toolkit &mdash; can simultaneously eliminate your income{' '}
                  <strong>and</strong> create a large expense. An emergency fund protects you from
                  both sides of this equation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: How Much Do You Need? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            How Much Do You Need?
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MoneyHelper, the UK government&rsquo;s free financial guidance service, recommends
                an emergency fund that covers <strong>3 to 6 months of essential outgoings</strong>.
                Note that this is essential outgoings &mdash; not total income. Essential outgoings
                are the bills you absolutely must pay to keep a roof over your head and food on the
                table, regardless of what else is happening in your life.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Essential Outgoings Include:</p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    'Rent or mortgage payments',
                    'Council tax',
                    'Gas, electricity, and water',
                    'Food and household essentials',
                    'Transport costs (fuel, insurance, tax)',
                    'Minimum debt repayments',
                    'Home and contents insurance',
                    'Mobile phone (contract minimum)',
                    'Childcare costs if applicable',
                    'Prescription or medical costs',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Essential outgoings do <strong>not</strong> include subscriptions (Netflix,
                Spotify), takeaways, pub spending, new clothes, or holidays. If your income stopped
                tomorrow, you would cancel those immediately. Your emergency fund only needs to
                cover the bills you cannot escape.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Employed Electrician</p>
                  <p className="text-white text-sm mb-2">
                    <strong>Target: 3 months</strong> of essential outgoings
                  </p>
                  <p className="text-white text-sm">
                    If you are employed, you have some built-in protection: statutory sick pay
                    (&pound;116.75 per week in 2024/25), notice periods, holiday pay, and
                    potentially redundancy pay. Three months of essential outgoings is generally
                    sufficient to bridge the gap while you find a new position or recover from
                    illness.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">
                    Self-Employed Electrician
                  </p>
                  <p className="text-white text-sm mb-2">
                    <strong>Target: 6 months minimum</strong> of essential outgoings
                  </p>
                  <p className="text-white text-sm">
                    If you are self-employed, you have no employer safety net whatsoever. No sick
                    pay, no holiday pay, no notice period, no redundancy. If you cannot work, your
                    income is zero from day one. Six months gives you breathing room to recover from
                    injury, find new clients, or ride out a quiet period.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Worked Example</p>
                <p className="text-white text-sm">
                  Jake is a self-employed electrician. His essential outgoings are &pound;1,600 per
                  month (mortgage &pound;750, council tax &pound;150, utilities &pound;200, food
                  &pound;250, van costs &pound;150, insurance &pound;50, phone &pound;30, minimum
                  debt repayments &pound;20). His 6-month emergency fund target is &pound;1,600
                  &times; 6 = <strong>&pound;9,600</strong>. That is the amount he needs to survive
                  for 6 months with zero income. It sounds like a lot, but he builds towards it
                  gradually over 2&ndash;3 years.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Where to Save Your Emergency Fund */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Where to Save Your Emergency Fund
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your emergency fund has two requirements: it must be <strong>accessible</strong>{' '}
                (you can get the money within hours, not days or weeks) and it must be{' '}
                <strong>separate</strong> from your current account (so you do not accidentally
                spend it). These requirements rule out several common savings products.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Best Options for Your Emergency Fund
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Easy-access savings account:</strong> The best option. Open one with a
                      provider like Chase, Marcus (Goldman Sachs), Chip, Zopa, or your building
                      society. Look for the highest interest rate with no withdrawal restrictions.
                      Money is typically available same-day or next-day.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Cash ISA (easy-access):</strong> A good option if you have used your
                      Personal Savings Allowance elsewhere. Interest is tax-free. Make sure it is an
                      easy-access ISA, not a fixed-rate one.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Separate current account:</strong> Not ideal for interest, but
                      perfectly acceptable if you want the fastest possible access. Some challenger
                      banks offer reasonable rates on current account balances.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">What NOT to Use</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Fixed-rate bonds:</strong> Your money is locked away for 1&ndash;5
                      years. You cannot access it in an emergency without penalties or losing all
                      interest.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Notice accounts (30/60/90-day):</strong> You must give notice before
                      withdrawing. A broken van or a medical emergency cannot wait 90 days.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Stocks &amp; Shares ISA:</strong> Your money can fall in value. If the
                      market drops 20% on the day you need the money, you have lost 20% of your
                      emergency fund.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cash at home:</strong> Not protected by the Financial Services
                      Compensation Scheme (FSCS), earns no interest, and is vulnerable to theft or
                      fire.
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The FSCS protects up to <strong>&pound;85,000 per person per institution</strong>.
                As long as your emergency fund is in a UK-regulated bank or building society, your
                money is protected even if the bank collapses. This is another reason not to keep
                large amounts of cash at home.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Separation Rule</p>
                <p className="text-white text-sm">
                  Keep your emergency fund in a different bank or app from your main current
                  account. If it is sitting in the same bank, it is too easy to transfer it across
                  when you see something you want to buy. The slight inconvenience of transferring
                  between banks creates a psychological barrier that protects your fund. Some people
                  name the account &ldquo;Emergency Fund &mdash; DO NOT TOUCH&rdquo; for an extra
                  reminder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: How to Start Building */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            How to Start Building Your Emergency Fund
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The biggest mistake people make is waiting for the &ldquo;right time&rdquo; to start
                saving. There is no right time. Start now, start small, and automate it. Consistency
                beats quantity. Saving &pound;50 per month for two years builds &pound;1,200 &mdash;
                plus interest. That is a meaningful emergency fund built from small, painless
                contributions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Step-by-Step: Building Your Fund
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">1</span>
                    </span>
                    <span>
                      <strong>Calculate your essential outgoings.</strong> Go through your bank
                      statements and add up every bill you cannot avoid: rent/mortgage, council tax,
                      utilities, food, transport, insurance, debt minimums. This is your monthly
                      essential outgoings figure.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">2</span>
                    </span>
                    <span>
                      <strong>Set your first target: &pound;1,000.</strong> Do not aim for the full
                      3&ndash;6 months straight away. &pound;1,000 covers most single emergencies
                      (car repair, appliance replacement, emergency dental work) and gives you
                      momentum.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">3</span>
                    </span>
                    <span>
                      <strong>Set up an automatic standing order on payday.</strong> This is the
                      single most important step. Move the money on the day you get paid, before you
                      can spend it. Even &pound;25 per month is a start. &ldquo;Pay yourself
                      first&rdquo; is the most effective savings principle ever discovered.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">4</span>
                    </span>
                    <span>
                      <strong>Boost with &ldquo;found money.&rdquo;</strong> Tax refunds, cashback
                      rewards, overtime payments, birthday money, selling unwanted tools or
                      equipment &mdash; send it straight to your emergency fund. These windfalls
                      accelerate your progress without affecting your monthly budget.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">5</span>
                    </span>
                    <span>
                      <strong>Increase when you can.</strong> When you get a pay rise, finish paying
                      off a debt, or reduce an expense, increase your standing order. Lifestyle
                      creep is the enemy &mdash; direct the extra money to your fund before you get
                      used to spending it.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Trade-Specific Tip</p>
                <p className="text-white text-sm">
                  If your income varies (common for self-employed sparks), set a minimum standing
                  order based on your quietest month, then top up manually in good months. For
                  example, if your quietest months bring in &pound;2,000 and your best months bring
                  in &pound;4,000, set a &pound;100 standing order as the minimum and manually
                  transfer an extra &pound;200&ndash;&pound;300 in better months. The automation
                  ensures consistency; the manual top-ups accelerate progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: When to Use Your Emergency Fund */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            When to Use Your Emergency Fund
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The purpose of your emergency fund is to be used in genuine emergencies. But
                &ldquo;emergency&rdquo; does not mean &ldquo;anything that costs money and feels
                urgent.&rdquo; Before you dip into the fund, the expense must pass all three of the
                following tests:
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto mb-2">
                    <span className="text-rose-400 text-sm font-bold">1</span>
                  </div>
                  <p className="text-sm font-medium text-rose-400 mb-1">Unexpected</p>
                  <p className="text-white text-sm">
                    You could not have reasonably predicted or planned for this expense. Christmas
                    is not unexpected. A car accident is.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
                    <span className="text-amber-400 text-sm font-bold">2</span>
                  </div>
                  <p className="text-sm font-medium text-amber-400 mb-1">Urgent</p>
                  <p className="text-white text-sm">
                    It cannot wait. You need to deal with it now, this week, or this month. A
                    leaking roof is urgent. A new sofa is not.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-400 text-sm font-bold">3</span>
                  </div>
                  <p className="text-sm font-medium text-green-400 mb-1">Necessary</p>
                  <p className="text-white text-sm">
                    It is a genuine need, not a want. Emergency dental work is necessary. A new
                    games console is not.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Qualifies as an Emergency (Use the Fund)
                </p>
                <div className="space-y-2">
                  {[
                    'Van breakdown that prevents you working (unexpected, urgent, necessary)',
                    'Boiler failure in winter (unexpected, urgent, necessary)',
                    'Emergency dental work or medical treatment (unexpected, urgent, necessary)',
                    'Job loss or major client cancellation (unexpected, urgent, necessary)',
                    'Major home repair &mdash; roof leak, burst pipe, broken window (unexpected, urgent, necessary)',
                    'Stolen toolkit that must be replaced to continue working (unexpected, urgent, necessary)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Does NOT Qualify (Do Not Use the Fund)
                </p>
                <div className="space-y-2">
                  {[
                    'Christmas presents (expected &mdash; budget separately)',
                    'Annual car insurance renewal (expected &mdash; save monthly)',
                    'New phone upgrade (not urgent, not necessary)',
                    'Holiday spending money (not unexpected, not necessary)',
                    'Sale bargain on tools you do not need right now (not urgent)',
                    'MOT and service (expected &mdash; budget in advance)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                After using your emergency fund, your top financial priority becomes{' '}
                <strong>rebuilding it</strong>. Redirect any non-essential spending back to the fund
                until it is restored. The fund is only useful if it is full when you need it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Three Pots — Emergency, Tax, Savings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Three Separate Pots: Emergency, Tax &amp; Savings
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common financial mistakes self-employed tradespeople make is lumping
                all their money into a single account. When everything is in one pot, it is
                impossible to know what is available to spend and what is already committed. This
                leads to nasty surprises &mdash; particularly when HMRC sends the tax bill.
              </p>
              <p>
                You need a minimum of <strong>three separate pots</strong>, each with its own
                account and its own purpose:
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Pot 1: Emergency Fund</p>
                  <p className="text-white text-sm">
                    3&ndash;6 months of essential outgoings. Only used for genuine emergencies
                    (unexpected, urgent, necessary). Easy-access account. Do not touch for any other
                    purpose.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">Pot 2: Tax Provision</p>
                  <p className="text-white text-sm">
                    25&ndash;30% of your profit set aside for your Self Assessment tax bill (income
                    tax + Class 4 NICs). This money belongs to HMRC &mdash; it is not yours to
                    spend. Separate account. Never used for emergencies.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Pot 3: General Savings</p>
                  <p className="text-white text-sm">
                    Your goals fund &mdash; house deposit, new van, qualifications, holiday,
                    retirement contributions. This is the money you save after your emergency fund
                    is built and your tax is ring-fenced.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why Mixing Pots Is Dangerous
                </p>
                <p className="text-white text-sm">
                  Imagine you have &pound;8,000 in a single account. You think you are doing well.
                  Then your van breaks down: &pound;2,500 repair. Then HMRC sends your tax bill:
                  &pound;4,800. You now have &pound;700 left and two months of living costs to
                  cover. If you had kept three separate pots &mdash; &pound;3,000 emergency,
                  &pound;3,000 tax, &pound;2,000 savings &mdash; the van repair comes from the
                  emergency fund, the tax bill comes from the tax pot, and your savings remain
                  intact. You still need to rebuild your emergency fund, but you are not in crisis.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Practical Setup</p>
                <p className="text-white text-sm">
                  Open three accounts with different providers or label them clearly within the same
                  banking app (some banks like Starling and Monzo allow multiple
                  &ldquo;spaces&rdquo; or &ldquo;pots&rdquo; within one account). Set up automatic
                  transfers on payday: emergency fund gets its share, tax pot gets 25&ndash;30% of
                  profit, and whatever is left after essential spending goes to general savings. The
                  automation removes willpower from the equation.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../pf-module-5-section-2">
              Next: Insurance for Tradespeople
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
