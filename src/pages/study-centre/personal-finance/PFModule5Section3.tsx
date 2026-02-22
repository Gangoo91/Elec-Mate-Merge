import { ArrowLeft, Percent, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-5-3-check1',
    question:
      'What is the total annual ISA allowance across all ISA types in the 2024/25 tax year?',
    options: ['&pound;10,000', '&pound;15,000', '&pound;20,000', '&pound;25,000'],
    correctIndex: 2,
    explanation:
      'The total annual ISA allowance is &pound;20,000 per tax year (2024/25). This is the combined limit across all ISA types &mdash; Cash ISA, Stocks &amp; Shares ISA, Innovative Finance ISA, and Lifetime ISA. You can split it however you wish, but the total must not exceed &pound;20,000. For example, you could put &pound;4,000 in a Lifetime ISA and &pound;16,000 in a Cash ISA.',
  },
  {
    id: 'pf-5-3-check2',
    question:
      'You are 28 and saving for your first home. You put &pound;4,000 into a Lifetime ISA. How much will the government add as a bonus?',
    options: [
      '&pound;500 (12.5% bonus)',
      '&pound;1,000 (25% bonus)',
      '&pound;2,000 (50% bonus)',
      '&pound;4,000 (100% bonus)',
    ],
    correctIndex: 1,
    explanation:
      'The Lifetime ISA provides a 25% government bonus on your contributions, up to a maximum bonus of &pound;1,000 per year. If you contribute the full &pound;4,000 annual maximum, the government adds &pound;1,000, giving you &pound;5,000. This is effectively free money &mdash; a guaranteed 25% return before any interest is earned. The bonus is paid monthly, usually within 4&ndash;6 weeks of each contribution.',
  },
  {
    id: 'pf-5-3-check3',
    question:
      'What is the recommended first step in the tax-efficient saving hierarchy before opening an ISA?',
    options: [
      'Open a Stocks &amp; Shares ISA',
      'Buy Premium Bonds',
      'Claim your full employer pension match',
      'Open a Lifetime ISA',
    ],
    correctIndex: 2,
    explanation:
      'The first step in the tax-efficient hierarchy is to claim your full employer pension match. If your employer offers to match your pension contributions (for example, you put in 5% and they put in 5%), this is effectively a 100% return on your money before any investment growth. No ISA or savings account can match this. After maximising your employer match, the next steps are: build your emergency fund, then open an ISA.',
  },
];

const faqs = [
  {
    question: 'Can I have more than one type of ISA in the same tax year?',
    answer:
      'Yes. Since April 2024, you can open and contribute to multiple ISAs of the same type in the same tax year (previously, you could only pay into one of each type per year). You can split your &pound;20,000 annual allowance across Cash ISAs, Stocks &amp; Shares ISAs, Innovative Finance ISAs, and a Lifetime ISA however you choose. The only restriction is that the Lifetime ISA has a maximum annual contribution of &pound;4,000, and the total across all ISA types cannot exceed &pound;20,000.',
  },
  {
    question: 'Is a Lifetime ISA worth it if I am not buying my first home?',
    answer:
      'It depends on your age and circumstances. If you are under 40 and do not own a property, the LISA is excellent for saving for a first home (25% bonus). If you already own a home, the LISA can still be used for retirement savings &mdash; you can withdraw the money penalty-free from age 60, and you still receive the 25% government bonus on all contributions. However, if you withdraw for any reason other than a first home purchase or retirement (age 60+), you will pay a 25% withdrawal penalty, which effectively means you lose some of your own money as well as the bonus. If you think you might need the money before 60, a standard ISA is more flexible.',
  },
  {
    question: 'Should I choose a Cash ISA or a Stocks &amp; Shares ISA?',
    answer:
      'It depends on your time horizon. For money you might need within the next 5 years (emergency fund top-up, near-term goals), a Cash ISA is safer because your capital is guaranteed. For money you will not need for 5 years or more (retirement, long-term wealth building), a Stocks &amp; Shares ISA historically provides better returns, but your money can go down as well as up. Many people use both: a Cash ISA for short-term savings and a Stocks &amp; Shares ISA for long-term growth. If you are new to investing, a low-cost global index fund (such as a FTSE Global All Cap tracker) is a simple, diversified starting point.',
  },
  {
    question: 'Are Premium Bonds a good investment?',
    answer:
      'Premium Bonds are not technically an investment &mdash; they are a savings product issued by NS&amp;I (National Savings &amp; Investments), backed by the UK government. Your capital is 100% safe, and instead of earning interest, you are entered into a monthly prize draw. The effective prize fund rate was 4.00% as of early 2025, but this is an average across all bondholders &mdash; your personal return could be higher or lower depending on luck. Premium Bonds are best for people who want absolute capital safety, tax-free returns (prizes are tax-free), and do not mind variable, luck-dependent returns. They are not ideal for long-term wealth building compared to a Stocks &amp; Shares ISA.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the annual ISA allowance for the 2024/25 tax year?',
    options: ['&pound;10,000', '&pound;15,000', '&pound;20,000', '&pound;25,000'],
    correctAnswer: 2,
    explanation:
      'The annual ISA allowance is &pound;20,000 for the 2024/25 tax year. This is the total you can contribute across all ISA types (Cash, Stocks &amp; Shares, Innovative Finance, and Lifetime ISA). Any interest, dividends, or capital gains within an ISA are completely tax-free.',
  },
  {
    id: 2,
    question: 'What age must you be to open a Lifetime ISA?',
    options: ['Any age', '16 or over', '18 to 39', '25 to 50'],
    correctAnswer: 2,
    explanation:
      'You must be aged 18 to 39 to open a Lifetime ISA. Once opened, you can continue contributing until you turn 50. The LISA can be used for a first home purchase (property up to &pound;450,000) or withdrawn penalty-free from age 60. You receive a 25% government bonus on contributions up to &pound;4,000 per year.',
  },
  {
    id: 3,
    question: 'What is the government bonus rate on a Lifetime ISA?',
    options: ['10%', '25%', '50%', '100%'],
    correctAnswer: 1,
    explanation:
      'The government adds a 25% bonus to your Lifetime ISA contributions, up to a maximum bonus of &pound;1,000 per year (on the maximum contribution of &pound;4,000). This is effectively free money. Over the full lifetime of a LISA (age 18 to 50), you could receive up to &pound;32,000 in government bonuses, plus any interest or investment growth.',
  },
  {
    id: 4,
    question:
      'What happens if you withdraw money from a Lifetime ISA for a reason other than buying your first home or reaching age 60?',
    options: [
      'Nothing &mdash; you can withdraw freely at any time',
      'You lose the government bonus but keep all your own money',
      'You pay a 25% withdrawal penalty, which means you lose the bonus AND some of your own money',
      'You must repay the bonus within 12 months',
    ],
    correctAnswer: 2,
    explanation:
      'If you withdraw from a LISA for any reason other than a qualifying first home purchase or reaching age 60, you pay a 25% penalty on the total withdrawal amount (including the bonus). Because the bonus was 25% of what you put in, the 25% penalty on the total actually takes back more than just the bonus &mdash; you lose approximately 6.25% of your own contributions too. This is why you should only use a LISA if you are confident the money is for a first home or retirement.',
  },
  {
    id: 5,
    question: 'Who is eligible for the Help to Save scheme?',
    options: [
      'Anyone earning less than &pound;50,000',
      'People receiving Universal Credit or Working Tax Credit',
      'All self-employed workers',
      'Anyone aged 18 to 39',
    ],
    correctAnswer: 1,
    explanation:
      'Help to Save is available to people receiving Universal Credit (with a minimum earned income in their last monthly assessment period) or Working Tax Credit. You can save between &pound;1 and &pound;50 per month for 4 years, and the government pays a 50% bonus on the highest balance achieved. The maximum bonus is &pound;1,200 over 4 years. It is one of the most generous savings schemes available.',
  },
  {
    id: 6,
    question:
      'For money you will not need for 5 years or more, which ISA type generally provides the best long-term returns?',
    options: ['Cash ISA', 'Stocks &amp; Shares ISA', 'Innovative Finance ISA', 'Help to Save'],
    correctAnswer: 1,
    explanation:
      'Over periods of 5 years or more, a Stocks &amp; Shares ISA has historically provided better returns than a Cash ISA, because equity markets tend to outperform cash savings over the long term. However, the value of investments can go down as well as up, and you could get back less than you invest. For shorter time periods, a Cash ISA is safer because your capital is guaranteed. Many people use both for different goals.',
  },
  {
    id: 7,
    question: 'What is the Capital Gains Tax annual exempt amount for the 2024/25 tax year?',
    options: ['&pound;1,000', '&pound;3,000', '&pound;6,000', '&pound;12,300'],
    correctAnswer: 1,
    explanation:
      'The Capital Gains Tax (CGT) annual exempt amount is &pound;3,000 for the 2024/25 tax year. This means you can make up to &pound;3,000 in capital gains (profit from selling assets like shares or property other than your main home) without paying CGT. Gains above this threshold are taxed at 10% (basic rate) or 20% (higher rate) for most assets. Gains within an ISA are completely exempt from CGT regardless of amount.',
  },
  {
    id: 8,
    question: 'What is the correct order of the tax-efficient saving hierarchy?',
    options: [
      'ISA first, then emergency fund, then pension',
      'Stocks &amp; Shares ISA, then Premium Bonds, then Lifetime ISA',
      'Employer pension match, then emergency fund, then ISA, then additional pension',
      'Premium Bonds first, then Cash ISA, then Stocks &amp; Shares ISA',
    ],
    correctAnswer: 2,
    explanation:
      'The recommended tax-efficient hierarchy is: (1) claim your full employer pension match (free money), (2) build your emergency fund, (3) contribute to an ISA (Cash or Stocks &amp; Shares depending on timeframe), (4) make additional pension contributions. This order maximises free money (employer match and government bonuses), ensures you have a safety net, and then builds long-term wealth in the most tax-efficient way.',
  },
];

export default function PFModule5Section3() {
  useSEO({
    title: 'Tax-Efficient Saving | Personal Finance Module 5.3',
    description:
      'ISAs, Lifetime ISA, Help to Save, Stocks and Shares ISA, Premium Bonds, and the tax-efficient saving hierarchy for UK electricians.',
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
            <Percent className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Tax-Efficient Saving
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Making the most of ISAs, government bonuses, and tax-free allowances to grow your money
            faster
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>ISA allowance:</strong> &pound;20,000 per year, completely tax-free
              </li>
              <li>
                <strong>Lifetime ISA:</strong> 25% government bonus &mdash; free money for first
                home or retirement
              </li>
              <li>
                <strong>Hierarchy:</strong> Pension match &rarr; emergency fund &rarr; ISA &rarr;
                additional pension
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Tax drag:</strong> Without tax-efficient wrappers, HMRC takes a slice of
                your returns every year
              </li>
              <li>
                <strong>Free money:</strong> Government bonuses and employer matches are guaranteed
                returns
              </li>
              <li>
                <strong>Compound effect:</strong> Tax-free growth compounds faster over decades
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the different types of ISA available in the UK and the overall annual allowance',
              'Describe the Lifetime ISA, including eligibility, contribution limits, the government bonus, and withdrawal rules',
              'Explain the Help to Save scheme and identify who is eligible',
              'Compare Cash ISAs and Stocks &amp; Shares ISAs and advise when each is most suitable',
              'Describe Premium Bonds and the Capital Gains Tax annual exempt amount',
              'Apply the tax-efficient saving hierarchy to prioritise where your money should go',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: ISAs — The Basics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            ISAs &mdash; The Basics
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An ISA (Individual Savings Account) is a tax-free wrapper provided by the UK
                government. Any interest, dividends, or capital gains earned inside an ISA are
                completely free from income tax and Capital Gains Tax. You do not even need to
                declare ISA income on your tax return. It is one of the most valuable tax advantages
                available to UK savers.
              </p>
              <p>
                The annual ISA allowance for 2024/25 is <strong>&pound;20,000</strong>. This is the
                total amount you can put into ISAs in a single tax year (6 April to 5 April). You
                can split this allowance across different types of ISA however you wish, but the
                total must not exceed &pound;20,000. Any unused allowance does not carry forward to
                the next year &mdash; it is use it or lose it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of ISA</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cash ISA:</strong> Works like a savings account but all interest is
                      tax-free. Ideal for short-term savings and your emergency fund. Capital is
                      guaranteed &mdash; you will never lose money in a Cash ISA.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Stocks &amp; Shares ISA:</strong> Allows you to invest in funds,
                      shares, bonds, and other investments. All growth and dividends are tax-free.
                      Best for long-term savings (5+ years). Capital is at risk &mdash; the value
                      can go down as well as up.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lifetime ISA (LISA):</strong> For first-time home buyers or
                      retirement. Maximum &pound;4,000 per year with a 25% government bonus. Covered
                      in detail in Section 02 below.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Innovative Finance ISA:</strong> Allows peer-to-peer lending within a
                      tax-free wrapper. Higher risk and more complex. Not recommended for beginners.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Personal Savings Allowance</p>
                <p className="text-white text-sm">
                  Even outside an ISA, you have a Personal Savings Allowance (PSA). Basic rate
                  taxpayers can earn &pound;1,000 in savings interest per year tax-free. Higher rate
                  taxpayers get a &pound;500 allowance. Additional rate taxpayers get &pound;0. If
                  your savings are small, the PSA may mean you pay no tax on savings interest
                  anyway. However, an ISA is still valuable because ISA interest does not count
                  towards your PSA, and as your savings grow, you may exceed the PSA. Using an ISA
                  future-proofs your savings against tax.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Lifetime ISA */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The Lifetime ISA (LISA)
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Lifetime ISA is one of the most generous savings products available in the UK.
                If you are saving for your first home or for retirement, the 25% government bonus is
                effectively <strong>free money</strong> that no other savings product can match
                (except an employer pension contribution).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Lifetime ISA Key Facts</p>
                <div className="space-y-2">
                  {[
                    'Must be aged 18 to 39 to open (can contribute until age 50)',
                    'Maximum contribution: &pound;4,000 per year (counts towards your &pound;20,000 ISA allowance)',
                    'Government bonus: 25% on your contributions &mdash; up to &pound;1,000 bonus per year',
                    'Bonus is paid monthly, usually within 4&ndash;6 weeks of each contribution',
                    'Can be used for a first home purchase (property up to &pound;450,000)',
                    'Can be withdrawn penalty-free from age 60 for any purpose',
                    'Withdrawal penalty for other reasons: 25% of the total withdrawn (you lose the bonus PLUS approximately 6.25% of your own money)',
                    'Available as a Cash LISA or a Stocks &amp; Shares LISA',
                    'Maximum lifetime bonus: &pound;32,000 (if you contribute &pound;4,000 every year from 18 to 50)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Worked Example: First Home Deposit
                </p>
                <p className="text-white text-sm">
                  Sophie is 25 and saving for her first home. She contributes &pound;200 per month
                  to a Lifetime ISA (&pound;2,400 per year). Each year, the government adds a 25%
                  bonus of &pound;600. After 4 years, she has contributed &pound;9,600 and received
                  &pound;2,400 in government bonuses, giving her &pound;12,000 (plus interest)
                  towards her deposit. The &pound;2,400 bonus is money she would not have had
                  without the LISA. If she had saved the same amount in a standard savings account,
                  she would only have &pound;9,600 plus interest.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Warning: The 25% Withdrawal Penalty
                </p>
                <p className="text-white text-sm">
                  If you withdraw from a LISA for any reason other than a first home or reaching age
                  60, you pay a 25% penalty on the total withdrawal. This sounds like it just
                  removes the bonus, but the maths is harsher than that. Example: you put in
                  &pound;4,000, the government adds &pound;1,000, giving &pound;5,000 total. If you
                  withdraw the full &pound;5,000, the penalty is 25% of &pound;5,000 = &pound;1,250.
                  You get back &pound;3,750 &mdash; that is &pound;250 less than your original
                  &pound;4,000 contribution. Only use a LISA if you are confident the money is for a
                  first home or retirement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Help to Save */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Help to Save
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Help to Save is a UK government savings scheme designed for people on lower incomes.
                It offers a <strong>50% government bonus</strong> on the highest balance achieved
                over 4 years &mdash; making it one of the most generous savings products ever
                offered in the UK.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Help to Save Key Facts</p>
                <div className="space-y-2">
                  {[
                    'Eligible if you receive Universal Credit (with earned income) or Working Tax Credit',
                    'Save between &pound;1 and &pound;50 per month for 4 years',
                    'Government pays a 50% bonus on the highest balance at 2 years and again at 4 years',
                    'Maximum savings: &pound;2,400 over 4 years (saving &pound;50/month)',
                    'Maximum bonus: &pound;1,200 over 4 years (50% of &pound;2,400)',
                    'Withdrawals are allowed at any time without penalty (but reduce your highest balance)',
                    'Account is opened via the HMRC website or app',
                    'The bonus is based on the HIGHEST balance, not the closing balance',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Worked Example</p>
                <p className="text-white text-sm">
                  Tom is an employed electrician&rsquo;s mate receiving Universal Credit to top up
                  his low wage. He saves &pound;50 per month into Help to Save for 2 years. His
                  highest balance reaches &pound;1,200. At the 2-year mark, the government pays a
                  50% bonus of &pound;600. He continues saving for another 2 years. His highest
                  balance in years 3&ndash;4 reaches another &pound;1,200 (total savings
                  &pound;2,400). At the 4-year mark, the government pays another &pound;600 bonus.
                  Total bonuses: &pound;1,200 in free money over 4 years. That is a guaranteed 50%
                  return &mdash; no other savings product comes close.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Stocks & Shares ISA */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Stocks &amp; Shares ISA
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A Stocks &amp; Shares ISA allows you to invest in funds, individual shares, bonds,
                and other investments within a tax-free wrapper. All dividends, interest, and
                capital gains within the ISA are completely tax-free. Over the long term (5+ years),
                investing in a diversified portfolio of shares has historically delivered higher
                returns than cash savings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Principles for Beginners</p>
                <div className="space-y-2">
                  {[
                    'Only invest money you will not need for at least 5 years &mdash; markets go down as well as up',
                    'Start with a low-cost global index fund (e.g., FTSE Global All Cap tracker) for instant diversification',
                    'Low costs matter: choose platforms and funds with low annual charges (under 0.5% combined)',
                    'Popular low-cost platforms include Vanguard, InvestEngine, and Freetrade',
                    'Set up a monthly direct debit to invest regularly &mdash; this is called &ldquo;pound-cost averaging&rdquo;',
                    'Do NOT try to time the market &mdash; time in the market beats timing the market',
                    'Reinvest dividends for compound growth',
                    'Remember: past performance is not a guarantee of future returns',
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
                  The Power of Compound Growth
                </p>
                <p className="text-white text-sm">
                  If you invest &pound;200 per month in a Stocks &amp; Shares ISA with an average
                  annual return of 7% (the long-term historical average for global equities), after
                  20 years you would have contributed &pound;48,000 but your pot would be worth
                  approximately <strong>&pound;104,000</strong>. The extra &pound;56,000 is compound
                  growth &mdash; your money earning returns, and those returns earning further
                  returns. All of this is completely tax-free within an ISA. In a non-ISA account,
                  you would lose a portion of those gains to income tax and Capital Gains Tax.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Cash ISA vs Stocks &amp; Shares ISA
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm font-medium text-rose-400 mb-2">Cash ISA</p>
                    <div className="space-y-1.5">
                      {[
                        'Capital guaranteed &mdash; cannot lose money',
                        'Best for short-term savings (under 5 years)',
                        'Returns limited to savings interest rates',
                        'Ideal for emergency fund, near-term goals',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-rose-400 mb-2">
                      Stocks &amp; Shares ISA
                    </p>
                    <div className="space-y-1.5">
                      {[
                        'Capital at risk &mdash; value can fall',
                        'Best for long-term savings (5+ years)',
                        'Historically higher returns than cash',
                        'Ideal for retirement, wealth building',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-white">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Premium Bonds & CGT Allowance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Premium Bonds &amp; Capital Gains Tax Allowance
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Premium Bonds are a unique savings product issued by NS&amp;I (National Savings
                &amp; Investments), which is backed by HM Treasury. Instead of earning interest,
                each &pound;1 bond is entered into a monthly prize draw. Prizes range from &pound;25
                to &pound;1,000,000, and all prizes are completely tax-free.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Premium Bonds Key Facts</p>
                <div className="space-y-2">
                  {[
                    'Minimum purchase: &pound;25. Maximum holding: &pound;50,000',
                    'Your capital is 100% safe &mdash; backed by the UK government',
                    'No guaranteed return &mdash; prizes are based on luck',
                    'Effective prize fund rate: approximately 4.00% (as of early 2025)',
                    'All prizes are tax-free &mdash; no income tax or CGT',
                    'Can be cashed in at any time with no penalty',
                    'Prizes drawn monthly by ERNIE (Electronic Random Number Indicator Equipment)',
                    'Good for higher-rate taxpayers who have used their ISA allowance',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Capital Gains Tax (CGT) Annual Exempt Amount
                </p>
                <p className="text-white text-sm mb-3">
                  If you invest outside an ISA or pension, you may need to pay Capital Gains Tax on
                  profits when you sell investments. However, you have an annual exempt amount each
                  year:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>2024/25 CGT annual exempt amount: &pound;3,000</strong> (reduced from
                      &pound;6,000 the previous year)
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Basic rate taxpayers:</strong> CGT on gains above the allowance is 10%
                      (18% for residential property)
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Higher rate taxpayers:</strong> CGT on gains above the allowance is
                      20% (24% for residential property)
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Inside an ISA:</strong> CGT is zero, regardless of the size of the
                      gain. This is a major advantage of using an ISA for investments.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Tax-Efficient Hierarchy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            The Tax-Efficient Saving Hierarchy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                With so many savings and investment options, it can be difficult to know where to
                put your money first. The tax-efficient hierarchy gives you a clear, prioritised
                order that maximises free money, minimises tax, and builds financial security in the
                right sequence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Hierarchy (Follow This Order)
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">1</span>
                    </span>
                    <span>
                      <strong>Claim your full employer pension match.</strong> If your employer
                      matches your pension contributions (e.g., you put in 5%, they put in 5%), this
                      is a guaranteed 100% return. No other product matches this. Always contribute
                      enough to get the full employer match &mdash; anything less is leaving free
                      money on the table.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-xs font-bold">2</span>
                    </span>
                    <span>
                      <strong>Build your emergency fund.</strong> 3&ndash;6 months of essential
                      outgoings in an easy-access account. This is your foundation &mdash; without
                      it, you may be forced to sell investments at the worst time or go into
                      expensive debt.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-xs font-bold">3</span>
                    </span>
                    <span>
                      <strong>Pay off high-interest debt.</strong> Credit cards, store cards, and
                      payday loans typically charge 20&ndash;40% interest. No investment can
                      reliably beat that. Paying off high-interest debt is the best guaranteed
                      return available.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-xs font-bold">4</span>
                    </span>
                    <span>
                      <strong>ISA contributions.</strong> Use your &pound;20,000 annual ISA
                      allowance. Cash ISA for short-term goals; Stocks &amp; Shares ISA for
                      long-term goals. Consider a Lifetime ISA if you are saving for a first home or
                      are under 40.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-xs font-bold">5</span>
                    </span>
                    <span>
                      <strong>Additional pension contributions.</strong> After maximising your
                      employer match and ISA allowance, additional pension contributions offer
                      income tax relief (20% for basic rate, 40% for higher rate). Self-employed
                      workers can contribute to a SIPP (Self-Invested Personal Pension) for the same
                      tax benefits.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Self-Employed? Your Hierarchy Is Slightly Different
                </p>
                <p className="text-white text-sm">
                  Self-employed electricians do not have employer pension matches, so the hierarchy
                  adjusts: (1) Build your emergency fund (6 months), (2) Ring-fence your tax
                  provision (25&ndash;30% of profit), (3) Pay off high-interest debt, (4) ISA
                  contributions (&pound;20,000 allowance), (5) Pension contributions via a SIPP (get
                  income tax relief). The principle is the same: free money and guaranteed returns
                  first, then tax-efficient growth, then additional tax-relieved saving.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../pf-module-5-section-4">
              Next: Financial Goals &amp; Your Action Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
