import { ArrowLeft, HeartPulse, CheckCircle } from 'lucide-react';
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
    id: 'pf-1-4-check1',
    question:
      'An electrician owns a van worth &pound;15,000 and has &pound;3,000 in savings, but owes &pound;8,000 on a van finance agreement and &pound;2,500 on a credit card. What is their net worth?',
    options: [
      '&pound;18,000 &mdash; the total of their assets',
      '&pound;10,500 &mdash; the total of their debts',
      '&pound;7,500 &mdash; assets (&pound;18,000) minus liabilities (&pound;10,500)',
      '&pound;15,000 &mdash; the value of their most expensive asset',
    ],
    correctIndex: 2,
    explanation:
      'Net worth is calculated as total assets minus total liabilities. Assets: van (&pound;15,000) + savings (&pound;3,000) = &pound;18,000. Liabilities: van finance (&pound;8,000) + credit card (&pound;2,500) = &pound;10,500. Net worth: &pound;18,000 - &pound;10,500 = &pound;7,500. This is a simplified example &mdash; a full net worth calculation would also include the value of any property (minus the mortgage), pension funds, investments, and any other assets and debts. Net worth is a snapshot of your financial position at a point in time. The goal is to increase it over time by building assets and reducing liabilities.',
  },
  {
    id: 'pf-1-4-check2',
    question:
      'A self-employed electrician earns &pound;280/day and spends every penny each month without setting aside money for tax, holidays, or emergencies. Which common trade financial mistake does this best illustrate?',
    options: [
      'Not registering for CIS',
      'Living to the day rate &mdash; spending as if gross income equals disposable income',
      'Charging too little for their work',
      'Not investing in test equipment',
    ],
    correctIndex: 1,
    explanation:
      'Living to the day rate is the most common and most damaging financial mistake made by self-employed tradespeople. It involves treating your gross income (the day rate multiplied by working days) as if it were disposable income, without setting aside money for: Income Tax and National Insurance (typically 20&ndash;30% of profit), holiday periods (approximately 28 days of lost income), sick days, pension contributions, or an emergency fund. The result is predictable: a shock tax bill in January, no savings to cover quiet periods or illness, and a perpetual cycle of financial stress. The fix is equally predictable but requires discipline: set aside 25&ndash;30% of every payment for tax, budget based on net income after all provisions, and build an emergency fund.',
  },
  {
    id: 'pf-1-4-check3',
    question:
      'The CIPD/MaPS Financial Wellbeing model identifies four pillars of financial wellbeing. Which of the following is NOT one of the four pillars?',
    options: [
      'Control &mdash; feeling in control of your day-to-day finances',
      'Resilience &mdash; having the ability to cope with a financial shock',
      'Accumulation &mdash; having the highest possible income',
      'Freedom &mdash; having the financial freedom to make choices that allow you to enjoy life',
    ],
    correctIndex: 2,
    explanation:
      'The CIPD/MaPS Financial Wellbeing model identifies four pillars: Control (feeling in control of your day-to-day finances and meeting commitments), Resilience (having the ability to cope with a financial shock such as job loss or unexpected expense), Security (being on track for a financially secure future, including pension planning), and Freedom (having the financial freedom to make choices that allow you to enjoy life). "Accumulation" is not one of the pillars &mdash; the model deliberately focuses on subjective wellbeing and financial behaviours rather than simply maximising income or wealth. This is an important distinction: financial wellbeing is about how your finances make you feel and whether they support the life you want, not just about how much money you have.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What is a good emergency fund size for a self-employed electrician?',
    answer:
      'The standard financial planning advice is three to six months of essential living expenses. For a self-employed electrician, the upper end of this range (or even beyond it) is advisable because your income is less predictable than an employed person&rsquo;s. Calculate your essential monthly outgoings: mortgage or rent, council tax, utilities, food, van payment, insurance, phone, and minimum debt repayments. Multiply by six. That is your target emergency fund. For most electricians, this will be somewhere between &pound;9,000 and &pound;18,000. It sounds like a lot, but you can build it gradually &mdash; even &pound;100 per month into a separate savings account will reach &pound;6,000 in five years. The key is to start, and to keep the fund in an accessible but separate account so you are not tempted to spend it on non-emergencies.',
  },
  {
    question: 'Is financial wellbeing really relevant to me as a tradesperson?',
    answer:
      'Yes, and the evidence is overwhelming. CITB (Construction Industry Training Board) research consistently shows that financial stress is one of the leading causes of poor mental health in the construction industry, which in turn is linked to sickness absence, reduced productivity, and in the worst cases, suicide. The construction industry already has a mental health crisis &mdash; the suicide rate among male construction workers is significantly higher than the national average. Financial stress does not cause all mental health problems, but it is a major contributing factor. Improving your financial wellbeing &mdash; feeling in control of your money, having a buffer for emergencies, being on track for retirement, and having the freedom to make choices &mdash; directly reduces financial stress and its knock-on effects on your mental health, relationships, and work performance.',
  },
  {
    question: 'How do I actually change my money mindset?',
    answer:
      'Changing deeply embedded financial beliefs and habits is a process, not an event. Start by becoming aware of your current money scripts &mdash; the unconscious beliefs about money that drive your behaviour. Common trade money scripts include "feast or famine is just how it is", "I&rsquo;ll sort my finances when I&rsquo;m earning more", and "real men don&rsquo;t worry about money". Write these beliefs down and challenge them with evidence. Then start with small, concrete behaviour changes: set up a separate tax savings account and transfer 25% of every payment into it automatically; check your bank balance at the same time every week; create a one-page budget. These small actions build a sense of financial control that gradually shifts your mindset from reactive to proactive. The MaPS (Money and Pensions Service) website offers free tools and resources specifically designed to help people improve their financial capability.',
  },
  {
    question: 'What if my net worth is negative?',
    answer:
      'A negative net worth means your liabilities (debts) exceed your assets. This is more common than you might think, especially among younger tradespeople who may have a van on finance, tools purchased on credit, and limited savings. A negative net worth is not a moral failing &mdash; it is simply a data point that tells you where you are starting from. The important thing is the direction of travel: is your net worth improving over time, or getting worse? Focus on three things: (1) stop taking on new debt for depreciating assets, (2) make more than the minimum payments on existing debt where possible (starting with the highest-interest debt first), and (3) build even a small savings habit, even &pound;25 per week. Over time, as you pay down debt and accumulate savings, your net worth will move from negative to positive. Module 3 of this course covers debt management in detail.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Net worth is calculated as:',
    options: [
      'Total annual income minus total annual expenses',
      'Total assets minus total liabilities',
      'Total savings divided by total debt',
      'Monthly income multiplied by twelve',
    ],
    correctAnswer: 1,
    explanation:
      'Net worth is the difference between what you own (assets) and what you owe (liabilities). Assets include: the current market value of your home, savings accounts, pension funds, investments, the value of your van and tools, and any other items of significant value. Liabilities include: your mortgage balance, van finance, credit card balances, personal loans, overdrafts, and any other debts. Net worth is a snapshot of your overall financial position at a point in time. Tracking it regularly (for example, quarterly) allows you to see whether you are building wealth or losing it. It is a more meaningful measure of financial health than income alone, because a high earner with large debts may have a lower net worth than a modest earner with no debts and consistent savings.',
  },
  {
    id: 2,
    question: 'CITB research on financial wellbeing in the construction industry has found that:',
    options: [
      'Construction workers are generally better off financially than workers in other industries',
      'Financial stress is a leading contributor to poor mental health in construction, which has a suicide rate significantly higher than the national average',
      'Self-employed tradespeople never experience financial stress because they earn high day rates',
      'Financial wellbeing has no measurable impact on work performance',
    ],
    correctAnswer: 1,
    explanation:
      'CITB and ONS data consistently show that the construction industry has a significantly higher male suicide rate than the national average. Financial stress is identified as one of the key contributing factors, alongside job insecurity, physical health problems, the culture of stoicism that discourages seeking help, and the isolation that can come with self-employment. The construction industry&rsquo;s reliance on self-employment, irregular income patterns, and the physical nature of the work (which makes income dependent on physical health) all create conditions where financial stress is particularly common and particularly damaging. This is not an abstract social issue &mdash; it affects real people in our industry, and improving financial wellbeing is a concrete step that every tradesperson can take.',
  },
  {
    id: 3,
    question: 'The "feast or famine" psychology in the trades refers to:',
    options: [
      'The fact that construction workers eat a lot during busy periods',
      'The cyclical pattern of busy periods (feast) and quiet periods (famine), and the tendency to spend more during busy periods without saving for quiet ones',
      'The seasonal variation in daylight hours that affects working patterns',
      'The competition between different trades on a construction site',
    ],
    correctAnswer: 1,
    explanation:
      'The feast-or-famine cycle is a deeply embedded pattern in the construction trades. During busy periods ("feast"), work is plentiful, income is high, and there is a psychological tendency to spend freely &mdash; upgrading tools, taking holidays, improving the house. During quiet periods ("famine"), work dries up, income drops, and the money spent during the feast period is gone. The pattern repeats endlessly unless deliberately broken. The solution is counter-intuitive: during feast periods, you should be saving aggressively, not spending freely. Build your emergency fund, overpay your tax provision, make additional pension contributions, and pay down debt. This way, when the famine comes (and it always does), you have financial reserves to maintain your standard of living without stress or debt.',
  },
  {
    id: 4,
    question:
      'Which of the following is the MOST common financial mistake made by self-employed electricians?',
    options: [
      'Charging too much for their work',
      'Having too many savings accounts',
      'Not setting aside money for tax, spending gross income as if it were net income',
      'Investing too heavily in their pension',
    ],
    correctAnswer: 2,
    explanation:
      'Not setting aside money for tax &mdash; commonly called "living to the day rate" &mdash; is by far the most prevalent financial mistake among self-employed tradespeople. The pattern is consistent: the electrician receives a &pound;2,800 payment for a week&rsquo;s work and spends it as if the entire amount is disposable income. When the Self Assessment tax bill arrives in January (which may include payments on account), they do not have the funds to pay it. This leads to HMRC payment plans, interest charges, late payment penalties, and significant financial stress. The fix is simple in principle but requires discipline: set aside 25&ndash;30% of every payment into a separate account the day it arrives, and do not touch that money for anything other than tax.',
  },
  {
    id: 5,
    question:
      'The CIPD/MaPS Financial Wellbeing model consists of four pillars. "Resilience" refers to:',
    options: [
      'The ability to work long hours without becoming tired',
      'The ability to cope with a financial shock such as job loss, illness, or an unexpected major expense',
      'Having a high credit score',
      'The ability to negotiate higher day rates',
    ],
    correctAnswer: 1,
    explanation:
      'Financial resilience is the ability to absorb a financial shock without it causing lasting damage to your finances or wellbeing. Shocks include: losing a major client or contract, a period of illness that prevents work, an unexpected major expense (van breakdown, home repair), or a change in personal circumstances (relationship breakdown, bereavement). Financial resilience is built through: maintaining an emergency fund (three to six months of essential expenses), having appropriate insurance (income protection, business insurance, life insurance if you have dependents), diversifying your client base (not relying on a single source of work), and having manageable debt levels. An electrician with &pound;10,000 in savings, income protection insurance, and five regular clients is far more financially resilient than one with no savings, no insurance, and a single main contractor providing all their work.',
  },
  {
    id: 6,
    question: 'A financial health check baseline should include all of the following EXCEPT:',
    options: [
      'Total assets and total liabilities (net worth calculation)',
      'Monthly income and monthly essential expenses',
      'Your neighbour&rsquo;s income and spending habits',
      'Outstanding debts with interest rates and minimum payments',
    ],
    correctAnswer: 2,
    explanation:
      'A financial health check baseline is a personal exercise that focuses on YOUR financial position, not anyone else&rsquo;s. Comparing yourself to others is not only unhelpful but can actively harm your financial wellbeing by encouraging either complacency ("I&rsquo;m doing better than Dave, so I&rsquo;m fine") or despair ("I&rsquo;ll never be as well-off as the site foreman"). Your baseline should include: a net worth calculation (all assets minus all liabilities), a monthly income and expenditure summary, a complete list of debts with balances, interest rates, and monthly payments, your pension provision (how much you are saving and whether it is on track), your insurance coverage (what risks are and are not covered), and your emergency fund balance. This baseline gives you a factual starting point from which to set goals and track progress.',
  },
  {
    id: 7,
    question:
      'An electrician has no emergency fund, no pension, &pound;5,000 of credit card debt at 22% APR, and is not setting aside money for tax. In what order should they prioritise these issues?',
    options: [
      'Pension first, then emergency fund, then credit card, then tax savings',
      'Tax savings first, then credit card debt, then emergency fund, then pension',
      'Emergency fund first, then pension, then credit card, then tax savings',
      'Credit card first, then pension, then emergency fund, then tax savings',
    ],
    correctAnswer: 1,
    explanation:
      'The recommended priority order is: (1) Tax savings first &mdash; failing to pay tax results in penalties, interest, and potential HMRC enforcement action. Set aside 25&ndash;30% of every payment immediately. (2) High-interest debt &mdash; at 22% APR, the credit card is costing approximately &pound;1,100/year in interest alone. Pay more than the minimum to clear this as quickly as possible. (3) Emergency fund &mdash; build a buffer of at least one month&rsquo;s essential expenses, then extend to three months. (4) Pension &mdash; once the tax is provisioned, the debt is reducing, and a basic emergency fund exists, begin regular pension contributions. This is the order recommended by most financial advisers: address the most urgent and most costly issues first, then build long-term financial security.',
  },
  {
    id: 8,
    question: 'The concept of "money scripts" in financial psychology refers to:',
    options: [
      'The written terms and conditions of a bank account',
      'Unconscious beliefs about money that are formed early in life and drive financial behaviour in adulthood',
      'The instructions printed on banknotes',
      'A budgeting template used by financial advisers',
    ],
    correctAnswer: 1,
    explanation:
      'Money scripts are deeply held, often unconscious beliefs about money that develop during childhood and adolescence, typically influenced by family attitudes, cultural norms, and early experiences. Common money scripts in the trades include: "money comes and goes, there&rsquo;s no point saving" (money avoidance), "I deserve to spend what I earn because I work hard" (money status), "talking about money is embarrassing or rude" (money worship/avoidance), and "financially successful people got lucky or took shortcuts" (money vigilance taken to an extreme). These scripts drive financial behaviour without conscious awareness. Identifying your own money scripts is the first step towards changing unhelpful financial habits, because you cannot change a behaviour you are not aware of. The field of financial therapy explores these concepts in depth.',
  },
];

export default function PFModule1Section4() {
  useSEO({
    title: 'Financial Health Check & Money Mindset | Personal Finance Module 1.4',
    description:
      'Financial health score, money mindset, common trade financial mistakes, setting your financial baseline, and the CIPD/MaPS Financial Wellbeing model.',
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
            <Link to="../pf-module-1">
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
            <HeartPulse className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Financial Health Check &amp; Money Mindset
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Financial health score, money mindset, common trade financial mistakes, setting your
            financial baseline, and the CIPD/MaPS Financial Wellbeing model
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Financial health</strong> is measured by net worth (assets minus
                liabilities), not income alone
              </li>
              <li>
                <strong>Money mindset</strong> &mdash; your unconscious beliefs about money &mdash;
                drives your financial behaviour more than your income level
              </li>
              <li>
                <strong>Common trade mistakes:</strong> living to the day rate, no tax provision, no
                emergency fund, no pension, high-interest consumer debt
              </li>
              <li>
                <strong>Four pillars of financial wellbeing:</strong> Control, Resilience, Security,
                and Freedom (CIPD/MaPS model)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Mental health:</strong> Financial stress is a leading cause of poor mental
                health in construction, an industry with a suicide rate above the national average
              </li>
              <li>
                <strong>Self-awareness:</strong> You cannot improve what you do not measure &mdash;
                a financial baseline gives you a starting point
              </li>
              <li>
                <strong>Behaviour change:</strong> Understanding your money scripts is the first
                step towards breaking unhelpful financial habits
              </li>
              <li>
                <strong>Long-term security:</strong> Small consistent actions now create
                dramatically different outcomes over a 30-year career
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Calculate your personal net worth by listing all assets and liabilities',
              'Explain the concept of money mindset and identify common money scripts held by tradespeople',
              'Describe the CITB research findings on financial stress and mental health in the construction industry',
              'Identify the five most common financial mistakes made by self-employed electricians and explain how to avoid each one',
              'Complete a financial health baseline assessment covering income, expenses, debts, savings, and insurance',
              'Describe the four pillars of the CIPD/MaPS Financial Wellbeing model and assess your own position against each pillar',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Financial Health Score */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Your Financial Health Score &mdash; Assets vs Liabilities
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your financial health is not determined by how much you earn. It is determined by
                the relationship between what you own and what you owe &mdash; your
                <strong> net worth</strong>. Net worth is the single most important number in
                personal finance because it captures your entire financial position in one figure.
                An electrician earning &pound;60,000 per year with &pound;50,000 of debt and no
                savings has a worse financial position than an electrician earning &pound;35,000
                with no debt and &pound;15,000 in savings. Income is how fast water flows into the
                bucket; net worth is how much water is actually in the bucket.
              </p>

              <p>
                Calculating your net worth is straightforward. List everything you own that has
                significant financial value. For most electricians, this includes: the current
                market value of your home (if you own one), the current value of your pension
                fund(s), any savings and investments, the value of your van (what you could
                realistically sell it for today, not what you paid for it), and the value of
                significant tools and equipment. Then list everything you owe: your mortgage
                balance, van finance balance, credit card balances, personal loans, overdrafts, any
                money owed to HMRC, and any other debts. Subtract the total liabilities from the
                total assets. The result is your net worth.
              </p>

              <p>
                For many younger electricians, especially those who are self-employed, net worth may
                be negative. This is not uncommon and is not something to be ashamed of. A newly
                qualified electrician who has a van on finance, tools purchased on credit, and
                limited savings will almost certainly have a negative net worth. The important thing
                is the direction of travel. If you calculate your net worth every quarter and it is
                increasing &mdash; even slowly &mdash; you are moving in the right direction. If it
                is decreasing, something needs to change. The purpose of calculating net worth is
                not to feel good or bad about yourself; it is to establish a factual baseline from
                which to set goals and measure progress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Typical Asset and Liability Categories for Electricians
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Assets:</strong> Home (market value), pension fund(s), savings
                      accounts, ISAs, investments, van (current resale value), tools and test
                      equipment (replacement value), any other property or valuable items
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Liabilities:</strong> Mortgage balance, van finance, credit cards,
                      personal loans, overdrafts, store finance (tools, electronics), student loan
                      (if applicable), money owed to HMRC, any informal debts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Net worth:</strong> Total assets minus total liabilities. Track this
                      figure quarterly to monitor your financial direction of travel.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Money Mindset */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Money Mindset &amp; Common Trade Beliefs
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your money mindset &mdash; the collection of beliefs, attitudes, and assumptions you
                hold about money &mdash; has a more powerful influence on your financial outcomes
                than your income level. Financial psychologists call these deeply held beliefs
                <strong> money scripts</strong>: unconscious narratives about money that develop
                during childhood and adolescence, shaped by family attitudes, cultural norms, and
                early experiences. Money scripts operate below the level of conscious awareness,
                driving financial behaviour automatically. This is why two electricians earning the
                same income can have dramatically different financial positions &mdash; one with
                savings, manageable debt, and a growing pension, the other with no savings,
                increasing debt, and no pension. The difference is rarely about income; it is almost
                always about mindset.
              </p>

              <p>
                The construction industry has several distinctive money scripts that are reinforced
                by the culture and working conditions of the trade.{' '}
                <strong>&ldquo;Feast or famine is just how it is.&rdquo;</strong> This belief
                normalises the cyclical pattern of busy periods and quiet periods as an unchangeable
                fact of life, rather than a manageable challenge. It leads to spending freely during
                busy periods and panicking during quiet ones, rather than smoothing income through
                savings and budgeting.
                <strong>
                  {' '}
                  &ldquo;I&rsquo;ll sort my finances when I&rsquo;m earning more.&rdquo;
                </strong>
                This belief postpones financial management indefinitely. The research is clear: if
                you cannot manage &pound;30,000, you will not manage &pound;60,000 any better. Good
                financial habits are built at any income level.
              </p>

              <p>
                <strong>&ldquo;I work with my hands, not with spreadsheets.&rdquo;</strong> This
                script creates an identity-based barrier to financial management, as if being
                practical and being financially competent are mutually exclusive. They are not. The
                same problem-solving skills that make you a good electrician &mdash; analysing
                situations, calculating values, following systematic processes &mdash; are exactly
                the skills needed for financial management.
                <strong> &ldquo;Talking about money is embarrassing.&rdquo;</strong> This belief
                prevents tradespeople from seeking help with financial problems, discussing pay
                openly, or negotiating effectively. It also means that financial stress is suffered
                in silence, compounding its impact on mental health. Breaking this script is one of
                the most impactful changes you can make.
              </p>

              <p>
                <strong>&ldquo;I deserve to treat myself because I work hard.&rdquo;</strong> This
                is perhaps the most insidious money script because it contains a kernel of truth
                &mdash; you do work hard, and you do deserve quality of life. But when this belief
                drives impulsive spending (new tools you do not need, expensive holidays you cannot
                afford, lifestyle inflation that matches every pay rise), it undermines your
                long-term financial security. The healthier version is: &ldquo;I work hard AND I
                make smart financial decisions that give me both enjoyment today and security
                tomorrow.&rdquo;
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Identifying Your Money Scripts
                </p>
                <p className="text-base text-white leading-relaxed">
                  Take a moment to honestly consider which of these statements resonate with you:
                  &ldquo;Money comes and goes, there&rsquo;s no point trying to save.&rdquo;
                  &ldquo;I&rsquo;ll start my pension when I&rsquo;m older.&rdquo; &ldquo;It&rsquo;s
                  too complicated for me.&rdquo; &ldquo;Everyone in the trade is in the same
                  boat.&rdquo; &ldquo;Tax is a problem for January.&rdquo; If any of these feel
                  familiar, that is a money script at work. The first step to change is awareness.
                  You cannot alter a behaviour you do not recognise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: CITB Research & Mental Health */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Financial Stress &amp; Construction Mental Health
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The link between financial stress and mental health is well-established in research,
                but in the construction industry it is particularly acute. ONS (Office for National
                Statistics) data consistently shows that male construction workers have a suicide
                rate significantly higher than the national average. While the causes are complex
                and multi-factorial, CITB (Construction Industry Training Board) and the Lighthouse
                Construction Industry Charity have identified financial stress as one of the primary
                contributing factors, alongside the culture of stoicism that discourages seeking
                help, the isolation of self-employment, the physical demands of the work, and
                substance misuse.
              </p>

              <p>
                Financial stress in construction takes specific forms that differ from other
                industries. The irregularity of income &mdash; particularly for self-employed
                tradespeople &mdash; creates chronic uncertainty about whether there will be enough
                money next month. Late payment by clients and contractors is endemic in the industry
                and creates cash flow crises that can be existential for sole traders. The January
                tax bill is a major annual stress point for self-employed workers who have not
                provisioned adequately. The pressure to maintain a visible lifestyle (good van, good
                tools, keeping up with colleagues) can lead to debt accumulation that is hidden from
                view. And the physical nature of the work means that income is directly tied to
                physical health &mdash; an injury or illness that prevents working creates an
                immediate financial crisis as well as a health crisis.
              </p>

              <p>
                The Money and Pensions Service (MaPS) research shows that financial capability
                &mdash; the combination of knowledge, skills, attitudes, and behaviours needed to
                manage money well &mdash; is not evenly distributed across the population. People in
                manual occupations, including construction, tend to score lower on financial
                capability measures, not because they are less intelligent but because they have had
                fewer opportunities to develop these skills. Financial education is largely absent
                from trade apprenticeships and college courses. The assumption is that people will
                simply figure it out &mdash; but the evidence shows that many do not. This course
                exists to bridge that gap: to provide the financial knowledge and tools that should
                have been part of every electrician&rsquo;s training from day one.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  If You Are Struggling Financially or Mentally
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lighthouse Construction Industry Charity:</strong> Provides financial
                      grants, mental health support, and wellbeing services specifically for
                      construction workers. Helpline: 0345 605 1956
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Electrical Industries Charity:</strong> Offers financial support and
                      advice for people who work (or have worked) in the electrical and energy
                      sector. Call: 0800 652 1618
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>MoneyHelper (MaPS):</strong> Free, impartial money guidance. Includes
                      debt advice, budgeting tools, and pension guidance. Call: 0800 138 7777
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Samaritans:</strong> Available 24/7 for anyone who needs to talk.
                      Call: 116 123 (free)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Mates in Mind:</strong> Construction industry mental health support
                      and awareness programme. Website: matesinmind.org
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Common Financial Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Common Financial Mistakes in the Trade
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Through years of working with electricians and other tradespeople, a consistent
                pattern of financial mistakes emerges. These are not random errors &mdash; they are
                systematic, predictable, and largely preventable. Understanding them is the first
                step towards avoiding them. Each mistake is driven by a combination of knowledge
                gaps (not knowing how the tax system works), behavioural biases (present bias,
                optimism bias), and cultural norms (the trade culture that normalises financial
                disorganisation).
              </p>

              <p>
                <strong>Mistake 1: Living to the day rate.</strong> This is the cardinal sin of
                self-employed finances. It means spending your gross income as if it were disposable
                income, without setting aside money for tax, National Insurance, holiday provision,
                or pension contributions. An electrician on &pound;280/day who spends &pound;280/day
                is not earning &pound;280/day &mdash; they are borrowing against future tax
                obligations and sacrificing future financial security. The fix: set aside
                25&ndash;30% of every payment into a separate account the day it arrives. Treat the
                remaining 70&ndash;75% as your gross income, from which you then budget for living
                expenses.
              </p>

              <p>
                <strong>Mistake 2: No tax provision.</strong> Closely related to Mistake 1, but
                deserving its own mention because of the severity of the consequences. Failing to
                provision for tax does not just create a January cash flow problem &mdash; it
                creates a debt to HMRC that accrues interest and penalties if not paid on time. HMRC
                has extensive enforcement powers including direct recovery from bank accounts,
                county court judgments, and ultimately bankruptcy proceedings. Many electricians end
                up on HMRC payment plans, paying interest and surcharges that significantly increase
                the total cost of their tax. The fix is the same: separate tax account, automatic
                transfers, do not touch the money.
              </p>

              <p>
                <strong>Mistake 3: No emergency fund.</strong> Self-employed income is inherently
                unpredictable, yet many tradespeople have zero savings to cover a quiet month, an
                unexpected van repair, or a period of illness. Without an emergency fund, every
                minor financial shock becomes a crisis that typically ends in credit card debt or
                borrowing. The MaPS financial wellbeing research shows that having even a small
                emergency buffer (&pound;1,000&ndash;&pound;2,000) dramatically reduces financial
                stress, because it transforms unexpected expenses from crises into manageable
                inconveniences. The fix: build to &pound;1,000 first, then extend to three months of
                essential expenses.
              </p>

              <p>
                <strong>Mistake 4: No pension contributions.</strong> The self-employed opt-out rate
                for pension saving is shockingly high. Without auto-enrolment (which only applies to
                employees), self-employed individuals must actively choose to save for retirement.
                Many do not, reasoning that they will &ldquo;sort it out later&rdquo; or that their
                body of work (tools, van, client base) is their pension. It is not. Compound
                interest means that delaying pension contributions by even five years has a
                significant impact on retirement income. An electrician who starts contributing
                &pound;200/month at age 25 will have approximately twice as much at retirement as
                one who starts at age 35, assuming the same contribution rate and investment
                returns.
              </p>

              <p>
                <strong>Mistake 5: High-interest consumer debt.</strong> Using credit cards,
                personal loans, or store finance to purchase tools, equipment, or lifestyle items
                without a plan to clear the debt quickly is a common trap. At 20&ndash;30% APR,
                credit card debt doubles approximately every three to four years if only minimum
                payments are made. An electrician who puts &pound;3,000 of tools on a credit card at
                22% APR and makes only minimum payments will pay approximately &pound;4,500 in
                interest before the debt is cleared &mdash; paying &pound;7,500 for &pound;3,000
                worth of tools. The fix: if you must use credit for essential purchases, have a
                clear plan to clear the balance within a specific timeframe, ideally on a 0% balance
                transfer card.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Five Fixes Summary</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>1.</strong> Set aside 25&ndash;30% of every payment for tax in a separate
                  account. <strong>2.</strong> Build an emergency fund &mdash; start with
                  &pound;1,000, then extend to three months&rsquo; expenses. <strong>3.</strong>
                  Start a pension &mdash; even &pound;100/month is better than nothing.
                  <strong> 4.</strong> Pay off high-interest debt as a priority.
                  <strong> 5.</strong> Budget based on net income, not gross income. These five
                  actions, implemented consistently, will transform your financial position within
                  twelve to twenty-four months.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Setting Your Financial Baseline */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Setting Your Financial Baseline
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A financial baseline is a comprehensive snapshot of your current financial position.
                It is not a budget (that comes later, in Module 2). It is simply an honest,
                non-judgmental record of where you are right now. Think of it like a site survey
                before starting an installation &mdash; you need to know what you are working with
                before you can plan what to do. Many people avoid this exercise because they are
                afraid of what they will find. But the reality you discover is always more
                manageable than the uncertainty you imagine. Numbers on a page can be addressed;
                anxiety in your head cannot.
              </p>

              <p>
                Your financial baseline should include six elements.{' '}
                <strong>Element 1: Net worth.</strong> List all assets with current values and all
                liabilities with current balances. Calculate the total. This is your starting net
                worth figure &mdash; the number you will track over time.{' '}
                <strong>Element 2: Monthly income.</strong> For employed electricians, this is
                straightforward: your net monthly pay after tax, NI, and pension. For self-employed
                electricians, calculate the average monthly income over the last twelve months (or
                as many months as you have been trading). Include all income sources.{' '}
                <strong>Element 3: Monthly essential expenses.</strong> List every fixed or
                essential outgoing: mortgage/rent, council tax, utilities, food, transport,
                insurance, phone, minimum debt payments, and any other non-negotiable costs.
              </p>

              <p>
                <strong>Element 4: Debt schedule.</strong> List every debt with the current balance,
                the interest rate (APR), the monthly payment, and the estimated time to clear at the
                current payment level. This is often the most eye-opening part of the exercise,
                because it forces you to see the total picture rather than managing each debt in
                isolation. <strong>Element 5: Savings and provision.</strong> How much do you have
                in accessible savings? Do you have a separate tax provision account? How much is in
                your pension? What insurance do you have (life, income protection, business)?
                <strong> Element 6: The gap analysis.</strong> Compare your monthly income against
                your monthly expenses. Is there a surplus or a deficit? If there is a surplus, where
                is it going &mdash; is it being saved, invested, or spent?
              </p>

              <p>
                The purpose of this baseline is not to make you feel bad. It is to give you data.
                Once you have the data, you can make informed decisions: which debts to prioritise,
                how much you can realistically save each month, whether your current income is
                sufficient for your lifestyle, and what changes would have the biggest impact on
                your financial position. This baseline becomes the reference point against which you
                measure all future progress. We recommend recalculating it every three months
                &mdash; put a reminder in your phone &mdash; and watching the trajectory over time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Financial Baseline Exercise &mdash; Do This Now
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  Grab a piece of paper or open a notes app. Spend ten minutes answering these
                  questions honestly. You do not need to be precise &mdash; reasonable estimates are
                  fine. The goal is to create a starting picture, not a perfect accounting.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      What are your total assets worth? (Home equity, savings, pension, van, tools)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      What are your total debts? (Mortgage, van finance, credit cards, loans)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>What is your average monthly income after tax?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>What are your essential monthly expenses?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>How many months could you survive without any income?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Are you contributing to a pension? If so, how much per month?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: CIPD/MaPS Financial Wellbeing Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            The Four Pillars of Financial Wellbeing
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The CIPD (Chartered Institute of Personnel and Development) and MaPS (Money and
                Pensions Service) have developed a Financial Wellbeing model that provides a
                framework for understanding and improving your relationship with money. The model
                identifies <strong>four pillars</strong> of financial wellbeing: Control,
                Resilience, Security, and Freedom. Together, these pillars describe a state of
                financial health that goes beyond simply having a high income &mdash; they describe
                a state where your finances support the life you want to live, rather than being a
                source of stress and limitation.
              </p>

              <p>
                <strong>Pillar 1: Control.</strong> This pillar is about feeling in control of your
                day-to-day finances and being able to meet your financial commitments. For
                electricians, control means: knowing how much money is coming in and going out each
                month, being able to pay all bills and essential expenses without anxiety, having a
                system for managing irregular income (budgeting, separate accounts), and not being
                caught off guard by predictable expenses (tax bills, insurance renewals, MOTs).
                Control is the foundation &mdash; without it, the other three pillars are
                impossible. The good news is that control is largely about systems and habits rather
                than income level. Even on a modest income, you can have excellent financial control
                through disciplined budgeting and record-keeping.
              </p>

              <p>
                <strong>Pillar 2: Resilience.</strong> This pillar is about having the ability to
                cope with a financial shock &mdash; job loss, illness, unexpected expense, or change
                in circumstances. For electricians, resilience means: having an emergency fund of
                three to six months&rsquo; essential expenses, having appropriate insurance (income
                protection, business insurance, life insurance if you have dependents), having a
                diversified client base rather than relying on a single source of work, and having
                manageable levels of debt that would not become unserviceable during a period of
                reduced income. Resilience is what separates a temporary setback from a financial
                crisis.
              </p>

              <p>
                <strong>Pillar 3: Security.</strong> This pillar is about being on track for a
                financially secure future, particularly in retirement. For electricians, security
                means: making regular pension contributions that are sufficient to provide a
                comfortable retirement, understanding your State Pension entitlement and whether you
                have gaps in your National Insurance record, having a realistic expectation of when
                you will be able to stop (or reduce) physical work, and planning for the transition
                from full-time site work to lighter duties as you age. The physical demands of
                electrical work make pension planning particularly important &mdash; many
                electricians find that they cannot sustain full-time site work beyond their late
                fifties, making a well-funded pension essential.
              </p>

              <p>
                <strong>Pillar 4: Freedom.</strong> This pillar is about having the financial
                freedom to make choices that allow you to enjoy life. For electricians, freedom
                means: being able to take holidays without financial anxiety, being able to choose
                which jobs you accept rather than taking every job out of financial necessity, being
                able to invest in training and professional development without worrying about the
                cost, and being able to make life decisions (starting a family, buying a home,
                changing career direction) based on what you want rather than what you can afford.
                Freedom is the ultimate goal of financial wellbeing &mdash; it is the point where
                money becomes a tool that supports your life rather than a constraint that limits
                it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Self-Assessment: Where Do You Stand?
                </p>
                <p className="text-base text-white leading-relaxed">
                  Rate yourself on each pillar from 1 (very poor) to 10 (excellent):
                </p>
                <ul className="text-sm text-white space-y-1 mt-2">
                  <li>
                    <strong>Control:</strong> Do you feel in control of your day-to-day finances?
                  </li>
                  <li>
                    <strong>Resilience:</strong> Could you cope financially with three months of no
                    income?
                  </li>
                  <li>
                    <strong>Security:</strong> Are you on track for a comfortable retirement?
                  </li>
                  <li>
                    <strong>Freedom:</strong> Do your finances give you the freedom to make choices
                    you want to make?
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Your lowest-scoring pillar is where to focus your attention first. This course
                  will give you the knowledge and tools to improve all four pillars systematically.
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
            Section Summary &amp; Module 1 Wrap-Up
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has moved from the numbers to the psychology and framework of financial
                wellbeing. Combined with the first three sections, you now have a comprehensive
                understanding of how electricians earn, how the tax system works, what you actually
                take home, and how to assess and improve your financial health. The key points from
                this section are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Net worth (assets minus liabilities)</strong> is the most important
                    measure of financial health, not income. Calculate yours and track it quarterly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Money mindset drives financial behaviour.</strong> Identify your money
                    scripts &mdash; the unconscious beliefs that shape how you handle money &mdash;
                    and challenge the unhelpful ones.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Financial stress is a leading cause of poor mental health</strong> in
                    construction. Improving financial wellbeing is not a luxury; it is a mental
                    health intervention.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The five common mistakes</strong> &mdash; living to the day rate, no tax
                    provision, no emergency fund, no pension, high-interest debt &mdash; are
                    predictable and preventable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Set your financial baseline now.</strong> You cannot improve what you do
                    not measure. Complete the baseline exercise and revisit it every three months.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The four pillars &mdash; Control, Resilience, Security, Freedom</strong>
                    &mdash; provide a holistic framework for financial wellbeing that goes beyond
                    simply maximising income.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Module 1 Complete.</strong> You now understand
                  how electricians earn (Section 1), how the tax system works (Section 2), what you
                  actually take home (Section 3), and how to assess your financial health (Section
                  4). In Module 2, we will build on this foundation with practical budgeting and
                  cash flow management &mdash; the day-to-day system for taking control of your
                  money.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-2">
              Next: Module 2 &mdash; Budgeting &amp; Cash Flow
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
