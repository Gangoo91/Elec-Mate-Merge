import {
  ArrowLeft,
  Wallet,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  PiggyBank,
  Receipt,
  AlertTriangle,
  Shield,
  Phone,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm4-s4-cis',
    question:
      'A CIS subcontractor receives a payment of £2,000 after the 20% CIS deduction has been applied. How much should they ideally set aside from the gross payment for their total tax liability?',
    options: [
      'Nothing — the 20% CIS deduction covers all their tax',
      'An additional 5-10% on top of the CIS deduction, because CIS may not cover all tax, National Insurance and student loan repayments',
      '50% of the payment for safety',
      'The full £2,000 should be saved',
    ],
    correctIndex: 1,
    explanation:
      'The 20% CIS deduction is a payment on account towards your tax bill, but it may not cover your full liability. Depending on your total earnings, expenses and personal circumstances, you may owe additional Income Tax, Class 2 and Class 4 National Insurance contributions, and student loan repayments. Setting aside an additional 5-10% on top of the CIS deduction (so 25-30% of gross income in total) provides a buffer that prevents the January tax shock.',
  },
  {
    id: 'rsm4-s4-emergency',
    question:
      'What is the recommended target for an emergency fund, and what is a realistic starting point for a tradesperson with irregular income?',
    options: [
      "12 months' expenses, starting with £5,000",
      "3 months' essential expenses, starting with as little as £500",
      "1 month's expenses, starting with £100",
      "6 months' gross income, starting with £10,000",
    ],
    correctIndex: 1,
    explanation:
      "The recommended target is 3 months' essential expenses (rent/mortgage, utilities, food, transport, insurance). For a tradesperson with monthly essentials of £2,000, that is £6,000. However, starting small is the key — even £500 provides a buffer against a minor emergency (broken tool, unexpected van repair, a week without work). The important thing is to start, not to reach the target immediately. Setting up a standing order for even £25 per week builds the fund gradually.",
  },
  {
    id: 'rsm4-s4-debt',
    question:
      'If you are struggling with debt, what is the most important first step according to financial guidance organisations?',
    options: [
      'Take out a consolidation loan immediately',
      'Ignore the debts until you can afford to pay them',
      'Contact creditors early — before you miss payments, not after',
      'Borrow from family or friends to pay off the debts',
    ],
    correctIndex: 2,
    explanation:
      'Every financial guidance organisation emphasises the same first step: contact your creditors early. Most creditors (including HMRC) would rather negotiate a payment plan than pursue enforcement action, which is expensive for them too. The key is to make contact before you miss payments, not after. Once you have missed payments, your options narrow and the consequences (late fees, default notices, credit score damage) escalate. Organisations like StepChange and Citizens Advice can help you negotiate with creditors for free.',
  },
];

const faqs = [
  {
    question:
      'I am a CIS subcontractor and I have not been setting aside money for tax. I owe HMRC thousands. What should I do?',
    answer:
      'First, do not panic — this is one of the most common financial problems in construction, and HMRC deals with it constantly. Second, do not ignore it — HMRC penalties and interest accrue rapidly, and ignoring the problem makes it significantly worse. Third, contact HMRC immediately and ask about a "Time to Pay" arrangement. HMRC has a dedicated helpline (0300 200 3835) for people who cannot pay their tax bill in full. They will usually agree to a payment plan spread over 6-12 months if you contact them proactively. Fourth, get free professional help: the Lighthouse Club (0345 605 1956) provides financial advice specifically for construction workers, and TaxAid (0345 120 3779) provides free tax advice for people on low incomes. Finally, learn from the experience: set up a separate savings account and transfer 25-30% of every gross payment into it as soon as you are paid. Automating this transfer removes the temptation to spend the money, and the tax account becomes a normal part of your financial routine rather than an afterthought.',
  },
  {
    question:
      'I am self-employed and cannot afford income protection insurance. Is it really necessary?',
    answer:
      "Income protection insurance is one of the most important — and most overlooked — financial protections for self-employed tradespeople. Without employer-funded sick pay, if you cannot work due to illness or injury, your income drops to zero immediately. Statutory Sick Pay (SSP) does not apply to the self-employed, and Universal Credit takes five weeks to process and provides a fraction of most tradespeople's earnings. Income protection insurance pays a percentage of your income (typically 50-70%) if you are unable to work due to illness or injury. Premiums for a 30-year-old electrician are typically £30-60 per month depending on the level of cover and waiting period. For context, that is roughly the cost of 2-3 energy drinks per day. If you were off work for three months with a back injury (the most common reason for long-term absence in construction), income protection could pay out £3,000-5,000 — money that would otherwise come from savings you may not have, or debt. It is not a luxury; for the self-employed, it is a financial necessity.",
  },
  {
    question: 'How do I start building an emergency fund when I barely cover my bills each month?',
    answer:
      "Start smaller than you think necessary. The goal is to build the habit, not the fund immediately. Here are practical strategies that work for tradespeople on tight budgets: (1) Round up: every time you receive a payment, round up the amount you transfer to your emergency savings. If you get paid £1,847, transfer £47 to savings and keep £1,800 in your current account. (2) The £1 challenge: save £1 in week 1, £2 in week 2, £3 in week 3, and so on. By week 26 you have saved over £350. (3) Redirect one expense: identify one daily expense you could eliminate (the afternoon energy drink, the daily coffee from a café, the meal deal). Redirect that money to savings. A £3 per day saving is £780 per year. (4) Save windfalls: any unexpected money — tax refunds, cash-back from tools, bonus payments — goes straight to the emergency fund. The most important principle is starting. Even £10 per week adds up to £520 in a year. That is not three months' expenses, but it is enough to cover a broken tool, a day off sick, or an unexpected van repair without resorting to credit.",
  },
  {
    question: 'I feel ashamed about my financial situation. Is that normal?',
    answer:
      'Extremely normal, and shame about money is one of the biggest barriers to getting help. Financial difficulties are often accompanied by feelings of failure, embarrassment and self-blame — especially in an industry where financial success is often equated with personal worth. But financial stress is not a character flaw. It is a structural feature of self-employment in construction: irregular income, the CIS system, no employer-funded benefits, and the feast-or-famine nature of the work create financial instability that affects even skilled, hardworking tradespeople. The Lighthouse Club reports that financial problems are the single most common reason construction workers contact their helpline, and the workers who call come from every level of the industry — apprentices, experienced electricians, project managers, business owners. Seeking help is not a sign of weakness; it is a sign of intelligence. The sooner you address financial problems, the more options you have and the quicker they can be resolved. Every financial support organisation listed in this section is confidential, non-judgmental, and experienced in working with people in exactly your situation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to research, what is the number one source of stress for self-employed tradespeople in the UK?',
    options: [
      'Difficult clients and customer complaints',
      'Physical demands of the work',
      'Financial stress — irregular income, tax obligations and lack of safety net',
      'Long working hours and commuting',
    ],
    correctAnswer: 2,
    explanation:
      'Research consistently identifies financial stress as the primary source of stress for self-employed tradespeople. The combination of irregular income (feast or famine), complex tax obligations (CIS deductions, self-assessment, quarterly payments), lack of employer-funded benefits (no sick pay, no pension contributions, no holiday pay) and the absence of a financial safety net creates chronic financial anxiety that affects every aspect of life and work.',
  },
  {
    id: 2,
    question: 'What is the recommended target for an emergency fund?',
    options: [
      '1 month of gross income',
      '3 months of essential expenses',
      '6 months of total income',
      '12 months of all expenses including luxuries',
    ],
    correctAnswer: 1,
    explanation:
      'The recommended target is 3 months of essential expenses — the minimum you need to cover rent or mortgage, utilities, food, transport and insurance if your income stopped completely. For most tradespeople, essential expenses are significantly less than total income, making the target more achievable than it might seem. This fund provides a buffer against illness, injury, quiet periods and unexpected expenses without resorting to high-interest debt.',
  },
  {
    id: 3,
    question:
      'A CIS subcontractor earns £40,000 gross per year. The standard CIS deduction rate is 20%. Approximately how much additional money should they set aside beyond the CIS deduction to cover their full tax liability?',
    options: [
      'Nothing — CIS covers everything',
      '£2,000-4,000 (an additional 5-10% of gross income)',
      '£10,000 (an additional 25%)',
      '£20,000 (an additional 50%)',
    ],
    correctAnswer: 1,
    explanation:
      'The 20% CIS deduction (£8,000 on £40,000 gross) is a payment on account, but the total tax liability for a CIS subcontractor typically ranges from 25-30% of gross income when Income Tax, Class 2 NIC, Class 4 NIC and any student loan repayments are included. This means an additional £2,000-4,000 may be owed beyond the CIS deductions. Setting aside 25-30% of gross income in total (with the CIS deduction counting towards this) provides an effective buffer against the January tax bill.',
  },
  {
    id: 4,
    question: 'What is HMRC\'s "Time to Pay" arrangement?',
    options: [
      'An automatic extension on all tax deadlines for construction workers',
      'A negotiated payment plan that allows you to pay a tax bill in instalments over an agreed period',
      'A scheme that forgives tax debt for people in financial hardship',
      'A penalty waiver for first-time late payments',
    ],
    correctAnswer: 1,
    explanation:
      "HMRC's Time to Pay arrangement is a negotiated instalment plan that allows you to spread a tax bill over an agreed period (typically 6-12 months). You must contact HMRC proactively — ideally before the payment deadline. HMRC will assess your financial situation and agree a monthly payment amount that is manageable. Interest still accrues on the outstanding amount, but penalties for non-payment can often be avoided if the arrangement is set up in time.",
  },
  {
    id: 5,
    question:
      'Which of the following is the most important financial action for a newly self-employed electrician?',
    options: [
      'Buying the best tools and equipment available',
      'Setting up a separate savings account and automatically transferring 25-30% of every payment into it for tax',
      'Taking out a large business loan to fund growth',
      'Spending all early income on marketing and advertising',
    ],
    correctAnswer: 1,
    explanation:
      'Automatically setting aside money for tax from day one is the single most important financial habit for a newly self-employed tradesperson. The CIS system means that some tax is deducted at source, but this may not cover the full liability. By setting up a separate account and transferring 25-30% of every gross payment into it immediately, you ensure the money is there when the tax bill arrives. This simple habit prevents the most common and most damaging financial crisis for self-employed tradespeople: the unexpected tax bill.',
  },
  {
    id: 6,
    question:
      'The Lighthouse Club provides financial support for construction workers. Which of the following accurately describes their service?',
    options: [
      'They provide loans at competitive interest rates',
      'They provide grants, financial advice, emotional support and signposting specifically for the construction community',
      'They provide tax return preparation services',
      'They provide business consulting for construction companies',
    ],
    correctAnswer: 1,
    explanation:
      'The Lighthouse Club is the only charity dedicated exclusively to the construction community. Their services include emergency financial grants (for situations like eviction risk, utility disconnection, or inability to buy food), ongoing financial advice, emotional and wellbeing support, and signposting to specialist services. They understand the specific financial challenges of construction work — CIS, irregular income, self-employment — and their support is tailored accordingly.',
  },
  {
    id: 7,
    question:
      'Which organisation provides free, impartial debt advice and can negotiate with creditors on your behalf?',
    options: [
      'HMRC',
      'The Federation of Master Builders',
      'StepChange Debt Charity',
      'The Health and Safety Executive',
    ],
    correctAnswer: 2,
    explanation:
      'StepChange Debt Charity provides free, impartial, expert debt advice. They can help you create a budget, negotiate with creditors, set up debt management plans, and explore options including Individual Voluntary Arrangements (IVAs) if needed. Their service is completely free (unlike commercial debt management companies that charge fees) and they are authorised and regulated by the Financial Conduct Authority. They have specific experience helping self-employed people, including tradespeople.',
  },
  {
    id: 8,
    question:
      'An electrician has been ignoring letters from HMRC about an unpaid tax bill for six months. Based on the guidance in this section, what should they do now?',
    options: [
      'Continue ignoring the letters and hope the debt goes away',
      'Wait until they have enough money to pay the full amount before contacting HMRC',
      'Contact HMRC immediately, explain their situation honestly, and ask about a Time to Pay arrangement',
      'Close their business and start again under a different name',
    ],
    correctAnswer: 2,
    explanation:
      "Contacting HMRC immediately is critical. Every month of delay increases the penalties and interest, reduces the options available, and increases the stress. HMRC is far more willing to negotiate with people who contact them proactively than with people who ignore correspondence. Even six months late, making contact and being honest about the situation is the right step. HMRC's Time to Pay line (0300 200 3835) handles these situations daily. Getting free advice from the Lighthouse Club or StepChange before calling HMRC can also help prepare for the conversation.",
  },
];

export default function RSMModule4Section4() {
  useSEO({
    title: 'Financial Stress & Practical Problem-Solving | RSM Module 4.4',
    description:
      'Managing financial stress as a self-employed tradesperson: emergency funds, CIS tax planning, debt management, insurance, and financial support signposting.',
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
            <Wallet className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Financial Stress &amp; Practical Problem-Solving
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Managing the number one stressor for self-employed tradespeople: money, tax, debt and
            financial security
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Financial stress:</strong> The #1 stressor for self-employed tradespeople
                (CIS, irregular income, no sick pay)
              </li>
              <li>
                <strong>Emergency fund:</strong> Target 3 months&rsquo; expenses; start with even
                £500
              </li>
              <li>
                <strong>Tax planning:</strong> Set aside 25&ndash;30% of every gross payment in a
                separate account
              </li>
              <li>
                <strong>Debt:</strong> Contact creditors early &mdash; before you miss payments, not
                after
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Mental health:</strong> Financial stress is the number one reason
                construction workers contact the Lighthouse Club
              </li>
              <li>
                <strong>Relationships:</strong> Money worries are the most common cause of
                relationship breakdown
              </li>
              <li>
                <strong>Performance:</strong> Financial anxiety impairs concentration and
                decision-making on site
              </li>
              <li>
                <strong>Prevention:</strong> Simple habits now prevent crises later
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why financial stress is the primary stressor for self-employed tradespeople',
              'Create a realistic plan for building an emergency fund, even on a tight budget',
              'Describe CIS tax obligations and calculate how much to set aside from each payment',
              'Apply the principles of early action to debt management',
              'Identify the key insurance protections available to self-employed electricians',
              'List at least four financial support organisations and their contact details',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Financial Stress in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Financial Stress: The Number One Stressor for Self-Employed Tradespeople
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Financial stress is not just about how much money you earn &mdash; it is about the
                gap between what you earn and what you need, the unpredictability of your income,
                and the absence of safety nets that employed workers take for granted. For
                self-employed electricians and CIS subcontractors, this combination creates a level
                of financial anxiety that many employed people never experience.
              </p>

              <p>
                The Lighthouse Club reports that financial difficulties are the single most common
                reason construction workers contact their helpline. Money problems do not stay
                neatly in the &ldquo;finance&rdquo; box &mdash; they leak into every aspect of life.
                They disrupt sleep (lying awake worrying about bills), damage relationships (money
                is the most common cause of arguments between partners), impair concentration on
                site (increasing accident risk), and trigger or worsen mental health problems
                including anxiety and depression.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Self-Employment Financial Gap
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Compared to employed workers, self-employed tradespeople lack:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">What You Do NOT Get</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>No employer-funded sick pay (SSP does not apply)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>No paid annual leave (no work = no income)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>No employer pension contributions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>No redundancy protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>No guaranteed regular income</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      What You Must Fund Yourself
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Income protection for illness or injury</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Holiday savings (every day off costs you a day&rsquo;s pay)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Pension provision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Emergency fund for quiet periods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Tax savings (25-30% of gross income)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Emergency Fund */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Building an Emergency Fund: Start Small, Start Now
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An emergency fund is money set aside specifically for unexpected expenses or income
                disruption. It is the financial equivalent of a safety harness &mdash; you hope you
                never need it, but when you do, it prevents a fall becoming a catastrophe. Without
                an emergency fund, a single unexpected expense (van breakdown, tool theft, a week
                off sick) can trigger a chain of financial problems: missed bills, borrowing at high
                interest, taking on unsuitable work out of desperation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <PiggyBank className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Emergency Fund: The Practical Approach
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Target: 3 Months&rsquo; Essential Expenses
                    </p>
                    <p className="text-xs text-white">
                      Calculate your monthly essentials: rent/mortgage, utilities, food, transport,
                      insurance, phone. For many tradespeople, this is £1,500&ndash;2,500 per month.
                      Your target is 3 times this amount &mdash; typically £4,500&ndash;7,500. This
                      provides a buffer to survive a period without work (illness, injury, quiet
                      patch) without resorting to high-interest debt.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Starting Point: Whatever You Can Manage
                    </p>
                    <p className="text-xs text-white">
                      The target may seem daunting, but the most important step is starting. Even
                      £25 per week builds to £1,300 in a year. Even £10 per week builds to £520
                      &mdash; enough to cover a tool replacement or a day off sick. Set up a
                      standing order on pay day to a separate savings account. Automate it so you do
                      not have to decide each time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Feast Weeks Fund Famine Weeks
                    </p>
                    <p className="text-xs text-white">
                      Self-employed income is irregular. In good weeks, increase your savings
                      transfer. In quiet weeks, reduce or pause it. The habit of saving something
                      every week is more important than the amount. Over time, the good weeks more
                      than compensate for the quiet weeks, and the fund grows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Two Different Approaches
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">Dave: No Emergency Fund</p>
                    <p className="text-xs text-white">
                      Dave is a self-employed sparky earning well. He spends everything he earns
                      &mdash; new van, nice holidays, latest tools. When his van breaks down and
                      needs a £1,800 repair, he puts it on a credit card at 22% interest. When he
                      has a quiet January, he cannot pay his mortgage and borrows from his parents.
                      When the tax bill arrives and he owes £2,400 more than expected, he panics.
                      Every financial hiccup becomes a crisis because there is no buffer.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Rob: Emergency Fund in Place
                    </p>
                    <p className="text-xs text-white">
                      Rob earns the same as Dave but saves £50 per week into a separate account.
                      After 18 months, he has £3,900. When his van needs the same £1,800 repair, he
                      pays cash from his emergency fund &mdash; no interest, no stress. When January
                      is quiet, the fund covers his bills without drama. When the tax bill is higher
                      than expected, he has the buffer to absorb it. Same income as Dave, but
                      completely different experience of financial stress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: CIS and Tax Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            CIS &amp; Tax Planning: Avoiding the January Shock
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction Industry Scheme (CIS) requires contractors to deduct 20% from
                subcontractor payments (or 30% if the subcontractor is not registered) and pass this
                to HMRC as an advance payment towards the subcontractor&rsquo;s tax bill. Many
                subcontractors assume that the 20% CIS deduction covers their entire tax liability.
                It often does not &mdash; and the gap between what was deducted and what is actually
                owed is the source of the dreaded &ldquo;January shock&rdquo;.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Why CIS Deductions May Not Cover Your Full Bill
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>CIS deducts from gross payment, not profit:</strong> The 20% is
                      deducted from the full payment before expenses. But Income Tax is calculated
                      on profit (income minus allowable expenses). If your expenses are low relative
                      to your income, the CIS deduction may not cover your full tax liability.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>National Insurance is not covered:</strong> CIS deductions count only
                      towards Income Tax, not National Insurance. As a self-employed person, you owe
                      Class 2 NIC (flat rate) and Class 4 NIC (9% on profits between £12,570 and
                      £50,270, plus 2% above £50,270). This can add thousands to your bill.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Payment on account:</strong> Once you owe more than £1,000 in tax,
                      HMRC requires &ldquo;payments on account&rdquo; &mdash; advance payments
                      towards next year&rsquo;s bill. This means your first Self Assessment bill can
                      include the current year&rsquo;s balancing payment PLUS 50% of next
                      year&rsquo;s estimated bill. This catches many new subcontractors completely
                      off guard.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The 25-30% Rule</p>
                </div>
                <p className="text-sm text-white mb-3">
                  The simplest and most effective tax planning strategy for CIS subcontractors is to
                  set aside 25&ndash;30% of every gross payment in a separate savings account. The
                  CIS deduction already takes 20%, so you need to save an additional 5&ndash;10%
                  from the net amount you receive.
                </p>
                <p className="text-sm text-white">
                  <strong>Example:</strong> You receive a CIS payment statement showing £2,500
                  gross, £500 CIS deduction, £2,000 net paid to you. From the £2,000 you receive,
                  transfer £125&ndash;250 (roughly 5&ndash;10% of gross) into your tax savings
                  account. Combined with the £500 already deducted by CIS, you have effectively
                  saved £625&ndash;750 towards your tax bill on that payment (25&ndash;30% of
                  gross). When the Self Assessment bill arrives, the money is there.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The January Shock
                  </p>
                </div>
                <p className="text-sm text-white">
                  Tom is a CIS subcontractor in his second year of self-employment. In his first
                  year, he earned £38,000 gross. CIS deducted £7,600 (20%). Tom spent everything he
                  received and saved nothing extra for tax. When his accountant filed his Self
                  Assessment, the total liability was £9,800 (Income Tax + Class 4 NIC). After
                  crediting the £7,600 CIS deductions, Tom owed an additional £2,200. But HMRC also
                  required a payment on account of £4,900 (50% of next year&rsquo;s estimated bill).
                  Tom&rsquo;s total January bill: £7,100. He had nothing saved. This is the January
                  shock &mdash; and it drives construction workers into debt, despair and sometimes
                  much worse. A second sparky, earning the same amount, had been setting aside an
                  additional £150 per month into a separate tax account. By January, that account
                  held £1,800 &mdash; not enough to cover the full amount, but enough to make the
                  remainder manageable with a short-term HMRC payment plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Debt Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Debt: Early Action Saves Everything
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Debt is one of the most common and most damaging sources of stress for construction
                workers. Whether it is a tax bill you cannot pay, credit card debt that has
                accumulated, or a loan that has become unmanageable, the most critical principle is
                always the same:
                <strong> act early</strong>. Every financial guidance organisation agrees on this
                point &mdash; the sooner you address debt, the more options you have and the less
                damage it causes.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Early Action Principle</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Before Missing Payments
                    </p>
                    <p className="text-xs text-white">
                      If you can see that you will struggle to pay a bill, contact the creditor
                      immediately. Most creditors &mdash; including HMRC, banks, utility companies
                      and credit card providers &mdash; would rather negotiate a reduced payment
                      plan than pursue enforcement action. Calling before you miss a payment
                      demonstrates responsibility and opens up the widest range of options: payment
                      holidays, reduced instalments, interest freezes, extended terms.
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-red-400 mb-1">After Missing Payments</p>
                    <p className="text-xs text-white">
                      Once you have missed payments, the consequences escalate: late fees, default
                      notices, negative credit reports, increased interest rates, potential legal
                      action. Your options narrow and the stress intensifies. Even at this stage,
                      making contact is better than hiding &mdash; but the earlier you act, the
                      better.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                For HMRC tax debts specifically, the &ldquo;Time to Pay&rdquo; arrangement is the
                key tool. Call HMRC&rsquo;s payment support line (0300 200 3835), explain your
                situation honestly, and they will usually agree to a monthly payment plan spread
                over 6&ndash;12 months. They will ask about your income, expenses and assets to
                determine an affordable monthly amount. Interest will still accrue on the
                outstanding balance, but penalties for non-payment can often be avoided if the
                arrangement is set up proactively.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Critical Point:</strong> Never ignore debt. The
                  most common response to financial difficulty is avoidance &mdash; not opening
                  letters, not answering the phone, pretending the problem does not exist. This is
                  understandable (financial stress triggers the same avoidance responses as any
                  other threat), but it is the single worst thing you can do. Ignoring debt does not
                  make it go away; it makes it grow. Penalties accrue, interest compounds, and what
                  started as a manageable problem becomes a crisis. Opening the letters, making the
                  calls and facing the numbers is difficult &mdash; but it is the first step towards
                  resolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Insurance: Protecting Your Income, Tools &amp; Livelihood
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Insurance is not exciting, but for self-employed tradespeople it is a critical part
                of financial resilience. Without the safety nets that employment provides, insurance
                is your protection against the events that could otherwise devastate your finances
                and your career.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Income Protection Insurance</p>
                  </div>
                  <p className="text-sm text-white">
                    Pays a percentage of your income (typically 50&ndash;70%) if you cannot work due
                    to illness or injury. As a self-employed person with no sick pay, this is
                    arguably the most important insurance you can have. Premiums vary based on age,
                    health, occupation and level of cover, but typically cost £30&ndash;80 per month
                    for an electrician. Consider: if a back injury keeps you off work for three
                    months, income protection could pay out £4,000&ndash;8,000 &mdash; money that
                    would otherwise come from savings you may not have, or high-interest debt.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Public Liability Insurance</p>
                  </div>
                  <p className="text-sm text-white">
                    Covers you if a third party is injured or their property is damaged as a result
                    of your work. Most clients, contractors and site operators require you to hold a
                    minimum of £2 million public liability cover (many require £5 million or £10
                    million). This is not optional for any electrician working on third-party
                    property &mdash; a single claim could bankrupt you without it. Costs are
                    typically £100&ndash;300 per year for a sole trader electrician.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Tool Insurance</p>
                  </div>
                  <p className="text-sm text-white">
                    Covers the cost of replacing tools if they are stolen, damaged or lost. An
                    electrician&rsquo;s toolkit can easily be worth £3,000&ndash;10,000 when test
                    instruments are included. Van theft and tool theft are persistent problems in
                    the UK &mdash; if your tools are stolen and you are not insured, you face the
                    immediate cost of replacement plus lost income while you are unable to work.
                    Tool insurance typically costs £15&ndash;40 per month depending on the value
                    covered and the excess.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Professional Indemnity Insurance
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Covers claims arising from professional advice or design errors. If you provide
                    design services, certification, or professional advice as part of your
                    electrical work, professional indemnity insurance protects you against claims
                    that your advice or design was faulty. This is increasingly important as
                    electricians take on more design responsibility in domestic and commercial
                    installations.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Cost vs Consequence:</strong> Insurance premiums
                  feel like an expense when you are paying them and never making a claim. But the
                  cost of <em>not</em> having insurance when you need it is catastrophic. A
                  three-month injury without income protection, a public liability claim without
                  cover, or a tool theft without insurance can each individually cause financial
                  devastation. The premiums are a fraction of the potential cost of going without.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Financial Support Signposting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Financial Support: Where to Get Help
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you are struggling financially, you are not alone and there is help available.
                The following organisations provide free, confidential support specifically relevant
                to construction workers and self-employed tradespeople.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Lighthouse Club &mdash; 0345 605 1956
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    The only charity dedicated to the construction community. Provides emergency
                    financial grants, ongoing financial advice, emotional support and practical
                    guidance. They understand CIS, self-employment and the specific financial
                    challenges of construction. If you are in financial difficulty, this should be
                    your first call.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      StepChange Debt Charity &mdash; 0800 138 1111
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Free, impartial, expert debt advice. StepChange can help you create a realistic
                    budget, negotiate with creditors, set up debt management plans and explore all
                    available options. Their service is completely free (unlike commercial debt
                    management companies that charge fees) and they are authorised by the Financial
                    Conduct Authority.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Citizens Advice &mdash; 0800 144 8848
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Free advice on debt, benefits, employment rights, housing and more. Citizens
                    Advice can help with a wide range of financial issues including benefit
                    entitlement checks, employment disputes, housing problems and consumer
                    complaints. They also have a comprehensive online resource at
                    citizensadvice.org.uk.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      HMRC Time to Pay &mdash; 0300 200 3835
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    If you cannot pay your tax bill in full, call this line to arrange a payment
                    plan. HMRC will usually agree to monthly instalments over 6&ndash;12 months if
                    you contact them before the payment deadline. Being proactive with HMRC is
                    always better than waiting for enforcement action.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      TaxAid &mdash; 0345 120 3779
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Free tax advice for people on low incomes who cannot afford a professional
                    accountant. TaxAid helps with Self Assessment, CIS, tax credits, HMRC disputes
                    and more. They understand the specific tax challenges of self-employed
                    construction workers.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Using the Lighthouse Club
                  </p>
                </div>
                <p className="text-sm text-white">
                  When a sparky found himself owing £4,200 to HMRC with nothing saved, he felt
                  overwhelmed and ashamed. He avoided opening HMRC letters for three months, during
                  which penalties and interest added another £380 to the bill. His partner
                  eventually persuaded him to call the Lighthouse Club helpline. The advisor was
                  calm, non-judgemental and immediately helpful. They helped him understand his
                  options, provided a small emergency grant to cover an urgent utility bill, and
                  guided him through calling HMRC to set up a Time to Pay arrangement. The monthly
                  payments were manageable, and within 10 months the debt was cleared. He now sets
                  aside 25% of every gross payment automatically and has not had a tax surprise
                  since. His one regret: &ldquo;I wish I had called three months earlier instead of
                  burying my head in the sand.&rdquo;
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">No Shame in Seeking Help:</strong> Financial
                  difficulty is not a character flaw &mdash; it is a structural feature of
                  self-employment in construction. The CIS system, irregular income, lack of
                  employer benefits and feast-or-famine work patterns create financial instability
                  that affects even skilled, experienced tradespeople. The organisations listed
                  above help people in your exact situation every single day. Reaching out is the
                  smartest thing you can do.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
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
            <Link to="../rsm-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
