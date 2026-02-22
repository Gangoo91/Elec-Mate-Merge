import { ArrowLeft, BarChart3, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

export default function PFModule3Section1() {
  useSEO({
    title:
      'Understanding Credit in the UK | Module 3 Section 1 | Personal Finance & Financial Wellbeing',
    description:
      'Learn how UK credit reference agencies work, what affects your credit score, self-employed borrowing challenges, and how to build good credit as an electrician.',
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
              <Link to="../pf-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
              <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
              <span className="text-white text-xs">&bull;</span>
              <span className="text-white text-xs">SECTION 1</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Understanding Credit in the UK
              </h1>
            </div>
            <p className="text-white text-sm sm:text-base">
              How credit scores work, who holds your data, and what self-employed electricians need
              to know about borrowing
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm">
                Three agencies hold your credit data in the UK &mdash; Experian, Equifax, and
                TransUnion. Your score reflects how reliably you repay what you owe. Self-employed
                electricians face extra hurdles when borrowing because lenders want proof of stable
                income. Understanding how the system works gives you the power to improve your
                position before you need credit.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm">
                A strong credit profile can save you thousands in interest on a van, tools, or a
                mortgage. A poor one can block you from getting finance at all &mdash; or force you
                into expensive deals. Every electrician, whether employed or self-employed, benefits
                from knowing how the system scores them.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-8">
            <h2 className="text-white font-semibold text-base mb-3">What You&rsquo;ll Learn</h2>
            <ul className="space-y-2">
              {[
                'Name the three UK credit reference agencies and how to access your data for free',
                'Identify the six key factors that affect your credit score',
                'Explain the extra challenges self-employed electricians face when applying for credit',
                'List practical steps to build and maintain a strong credit profile',
                'Understand how mortgage applications differ for self-employed tradespeople',
              ].map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ====== SECTION 01 ====== */}
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-rose-400 mr-2">01</span>
              The Three UK Credit Reference Agencies
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              In the UK, three credit reference agencies (CRAs) collect and hold data about your
              financial behaviour. Every time you apply for credit, take out a phone contract, or
              even set up a direct debit for an energy supplier, that information flows to one or
              more of these agencies. The three are:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Experian</h3>
                <p className="text-white text-sm">
                  The largest CRA in the UK. Experian scores range from 0 to 999. You can check your
                  Experian report for free via the Experian app or through MoneySavingExpert&rsquo;s
                  Credit Club. Experian holds data on around 50 million UK adults and is the agency
                  most commonly used by mortgage lenders.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Equifax</h3>
                <p className="text-white text-sm">
                  Equifax scores range from 0 to 1000. Free access is available through ClearScore,
                  which provides monthly updates and a timeline showing how your score changes over
                  time. Many credit card providers and personal loan lenders rely on Equifax data
                  when making decisions.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">TransUnion</h3>
                <p className="text-white text-sm">
                  TransUnion scores range from 0 to 710. You can check your TransUnion report for
                  free through Credit Karma. TransUnion is increasingly used by car finance
                  companies and buy-now-pay-later providers, making it particularly relevant if
                  you&rsquo;re looking at van finance.
                </p>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">Key Point</h3>
              <p className="text-white text-sm">
                Each agency holds slightly different data and uses a different scoring model. This
                means your score will vary between agencies &mdash; and that is completely normal. A
                lender might check one, two, or all three agencies. Always check all three before
                applying for significant credit such as a mortgage or van finance.
              </p>
            </div>

            <p className="text-white text-sm sm:text-base mb-4">
              Under UK data protection law (the Data Protection Act 2018 and UK GDPR), you have the
              right to access all information held about you by each agency. This is known as a
              &ldquo;statutory credit report&rdquo; and must be provided free of charge. Beyond the
              free apps mentioned above, you can request your statutory report directly from each
              agency at any time.
            </p>

            <p className="text-white text-sm sm:text-base">
              It is worth noting that your credit file does not contain information about your
              savings, salary, or criminal record. It focuses exclusively on credit agreements,
              repayment history, public records (such as County Court Judgments), and electoral roll
              registration. Lenders combine this data with their own internal scoring and
              affordability checks to make lending decisions.
            </p>
          </div>

          {/* ====== SECTION 02 ====== */}
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-amber-400 mr-2">02</span>
              What Affects Your Credit Score
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Your credit score is not a single fixed number &mdash; it is a snapshot that changes
              every month based on your financial behaviour. Understanding what drives it allows you
              to take targeted action to improve it. The six main factors are:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  1. Payment History (Strongest Factor)
                </h3>
                <p className="text-white text-sm">
                  This is the single most important factor. Do you pay your bills on time? Every
                  missed payment, late payment, or default is recorded on your file and stays there
                  for six years. Even one missed mobile phone payment can drop your score
                  significantly. Direct debits are your best defence &mdash; set them up for every
                  regular bill so you never miss a due date.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">2. Credit Utilisation</h3>
                <p className="text-white text-sm">
                  This measures how much of your available credit you are actually using. If you
                  have a credit card with a &pound;5,000 limit and a &pound;4,500 balance, your
                  utilisation is 90% &mdash; which looks risky to lenders. The ideal is to keep
                  utilisation below 30%. So on that &pound;5,000 card, try to keep the balance under
                  &pound;1,500. This applies across all your credit cards combined, not just
                  individually.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  3. Length of Credit History
                </h3>
                <p className="text-white text-sm">
                  Lenders prefer to see a long track record of responsible borrowing. If you have
                  held a credit card for ten years and never missed a payment, that is a strong
                  signal. Closing old accounts shortens your average history length, so keep older
                  accounts open even if you rarely use them. A small monthly subscription on an old
                  card, paid off by direct debit, keeps the account active.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">4. Types of Credit</h3>
                <p className="text-white text-sm">
                  A healthy mix of different credit types &mdash; a credit card, a mobile contract,
                  perhaps a small personal loan &mdash; shows lenders you can manage different kinds
                  of repayment. Having only one type of credit, or none at all, makes it harder for
                  lenders to assess your reliability.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">5. Hard Searches</h3>
                <p className="text-white text-sm">
                  Every time you formally apply for credit, the lender performs a &ldquo;hard
                  search&rdquo; on your file. Multiple hard searches in a short period suggest you
                  are desperate for credit, which lowers your score. Soft searches &mdash; such as
                  checking your own score or using eligibility checkers &mdash; do not affect your
                  score. Always use eligibility checkers before applying, so you only submit formal
                  applications where you are likely to be accepted.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  6. Electoral Roll Registration
                </h3>
                <p className="text-white text-sm">
                  Being registered to vote at your current address is one of the simplest and most
                  effective ways to improve your credit score. It confirms your identity and address
                  to lenders. If you are not on the electoral roll, register at
                  gov.uk/register-to-vote &mdash; it takes five minutes and can boost your score
                  immediately.
                </p>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Electrician Tip</h3>
              <p className="text-white text-sm">
                If you move frequently between jobs or sites and have changed address several times,
                make sure your electoral roll registration is always updated to your current
                address. Multiple addresses in a short period can reduce your score, but staying
                registered at each one mitigates this effect.
              </p>
            </div>
          </div>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-3-1-check1"
            question="Which of the following does NOT appear on your UK credit file?"
            options={[
              'County Court Judgments',
              'Your salary or savings balance',
              'Electoral roll registration',
              'Missed payment records',
            ]}
            correctIndex={1}
            explanation="Your credit file does not contain information about your salary, savings, or income. It focuses on credit agreements, repayment history, public records such as CCJs, and electoral roll registration."
          />

          {/* ====== SECTION 03 ====== */}
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-green-400 mr-2">03</span>
              Self-Employed Borrowing Challenges
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              If you are a self-employed electrician &mdash; whether a sole trader, CIS
              subcontractor, or limited company director &mdash; you will face additional hurdles
              when applying for credit compared to someone in PAYE employment. Lenders see
              self-employed income as inherently less predictable, even if you earn more than the
              average employed person.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">The Two-to-Three Year Rule</h3>
              <p className="text-white text-sm mb-3">
                Most mainstream lenders require at least two years of trading history, with some
                insisting on three. They want to see a track record of consistent income before they
                will lend. This means that if you have recently gone self-employed, you may find it
                difficult to get a mortgage, van finance, or even a business credit card until you
                have built up enough history.
              </p>
              <p className="text-white text-sm">
                Some specialist lenders will consider applications with just one year of accounts,
                but typically at higher interest rates. If you are planning to go self-employed, it
                is often wise to secure any major credit (especially a mortgage) while you are still
                in PAYE employment.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">
                Income Verification Documents
              </h3>
              <p className="text-white text-sm mb-3">
                Unlike employed applicants who provide payslips, self-employed electricians need to
                supply:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'SA302 tax calculations from HMRC (usually two or three years)',
                  'Tax year overviews from your HMRC online account',
                  'Full accounts prepared by a qualified accountant (ideally ACCA, ICAEW, or AAT registered)',
                  'Bank statements showing regular income deposits (typically three to six months)',
                  'Proof of upcoming contracts or confirmed work (some lenders accept this)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white text-sm">
                An SA302 is a summary of your income and tax for a given year. You can download it
                from your HMRC online account, or your accountant can request it. This is the single
                most important document for self-employed mortgage applications.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">
                How Lenders Calculate Self-Employed Income
              </h3>
              <p className="text-white text-sm mb-3">
                This varies depending on your business structure:
              </p>
              <ul className="space-y-2">
                {[
                  'Sole Traders: lenders use your net profit (after expenses, before tax) averaged over two or three years',
                  'CIS Subcontractors: some lenders treat CIS workers as employed if you have one main contractor, others require full self-employed documentation',
                  'Limited Company Directors: lenders typically use salary plus dividends, though some specialist lenders will consider retained profits in the company',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Common Trap</h3>
              <p className="text-white text-sm">
                Many self-employed electricians minimise their declared income to reduce their tax
                bill. While this is perfectly legal, it directly reduces how much you can borrow. If
                you declare &pound;25,000 profit but actually earn &pound;45,000, lenders will base
                their calculations on the &pound;25,000 figure. Think carefully about the balance
                between tax efficiency and borrowing capacity, especially if you are planning to buy
                a house in the next few years.
              </p>
            </div>
          </div>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-3-1-check2"
            question="A sole trader electrician wants a mortgage. What document from HMRC do most lenders require?"
            options={[
              'P60 end-of-year summary',
              'SA302 tax calculation',
              'CIS payment and deduction statement',
              'VAT return',
            ]}
            correctIndex={1}
            explanation="The SA302 is the key document for self-employed mortgage applications. It is a summary of your declared income and tax for each year, and most lenders require two or three years of SA302s."
          />

          {/* ====== SECTION 04 ====== */}
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-blue-400 mr-2">04</span>
              Building and Maintaining Good Credit
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Building a strong credit profile is not complicated, but it requires consistency over
              time. Whether you are starting from scratch, recovering from past problems, or
              maintaining a good score, these strategies apply:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Starting from Scratch (Thin File)
                </h3>
                <p className="text-white text-sm mb-3">
                  If you are a young apprentice or have never had credit, you may have a &ldquo;thin
                  file&rdquo; &mdash; meaning there is not enough data for agencies to generate a
                  reliable score. This is different from having bad credit; it simply means you are
                  an unknown quantity. Steps to build from zero:
                </p>
                <ul className="space-y-2">
                  {[
                    'Register on the electoral roll at your current address immediately',
                    'Get a mobile phone contract in your name (even a SIM-only deal counts)',
                    'Apply for a credit builder credit card with a small limit (typically £200 to £500)',
                    'Use the credit builder card for a small regular purchase (fuel, for example) and pay it off in full every month by direct debit',
                    'Ensure all household bills are in your name or jointly (energy, broadband, water)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Maintaining a Good Score</h3>
                <p className="text-white text-sm mb-3">
                  Once you have built a reasonable credit history, these habits keep it strong:
                </p>
                <ul className="space-y-2">
                  {[
                    'Never miss a payment &mdash; set up direct debits for at least the minimum on every credit account',
                    'Keep credit card utilisation below 30% of your total available limit',
                    'Do not apply for credit you do not need &mdash; every hard search stays on your file for 12 months',
                    'Keep older accounts open to maintain a long average credit history',
                    'Check your credit reports at all three agencies at least every three months for errors',
                    'Report any errors immediately using the agency&rsquo;s dispute process',
                    'If you move address, update your electoral roll registration within days',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Recovering from Problems</h3>
                <p className="text-white text-sm mb-3">
                  If you have missed payments, defaults, or CCJs on your file, the key facts are:
                </p>
                <ul className="space-y-2">
                  {[
                    'Most negative markers drop off your file after six years from the date they were recorded',
                    'A default is recorded once, and the six-year clock starts from that date regardless of whether you pay it off',
                    'Paying off a default does show as "satisfied" which looks better to lenders even before it falls off',
                    'You can add a "Notice of Correction" (up to 200 words) to your file to explain circumstances such as illness or redundancy',
                    'Credit builder products are available specifically for people rebuilding their scores',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Myth Buster</h3>
              <p className="text-white text-sm">
                There is no such thing as a &ldquo;credit blacklist.&rdquo; Each lender has its own
                criteria and scoring model. Being rejected by one lender does not automatically mean
                you will be rejected by another. However, the hard search from a rejected
                application does appear on your file, so do not apply indiscriminately. Use
                eligibility checkers (soft searches) first.
              </p>
            </div>
          </div>

          {/* ====== SECTION 05 ====== */}
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-purple-400 mr-2">05</span>
              Credit &amp; Mortgage Applications for the Self-Employed
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Getting a mortgage as a self-employed electrician is absolutely possible &mdash;
              thousands do it every year &mdash; but the process requires more preparation than for
              a PAYE employee. Here is what you need to know:
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">
                Preparing for a Mortgage Application
              </h3>
              <ul className="space-y-2">
                {[
                  'Start preparing at least 12 months before you want to apply &mdash; clean up your credit file, reduce outstanding debt, and stop applying for new credit',
                  'Ensure your last two or three years of accounts show consistent or growing income &mdash; a declining trend makes lenders nervous',
                  'Keep your SA302s and tax year overviews readily accessible (download from your HMRC online account)',
                  'Use an accountant who is registered with a recognised body (ACCA, ICAEW, AAT) &mdash; some lenders reject accounts from unqualified bookkeepers',
                  'Save the largest deposit you can &mdash; a bigger deposit means a lower loan-to-value ratio, which opens more doors',
                  'Consider using a mortgage broker who specialises in self-employed applications &mdash; they know which lenders are most flexible',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">What Lenders Look For</h3>
              <p className="text-white text-sm mb-3">
                Beyond the standard credit checks, self-employed mortgage applications are assessed
                on:
              </p>
              <ul className="space-y-2">
                {[
                  'Affordability &mdash; can you comfortably afford the repayments based on your declared income, accounting for interest rate rises?',
                  'Stability &mdash; is your income consistent year-to-year, or does it fluctuate wildly?',
                  'Industry risk &mdash; electrical work is generally viewed positively by lenders as a skilled trade with strong demand',
                  'Deposit size &mdash; most self-employed applicants need at least a 10% deposit, though 15% to 20% opens significantly more options',
                  'Existing commitments &mdash; van finance, tool finance, credit card debt, and personal loans all reduce how much you can borrow',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Real-World Tip</h3>
              <p className="text-white text-sm">
                If you are a newly qualified electrician planning to go self-employed, consider
                getting your mortgage agreed in principle while still in PAYE employment. Once you
                have the mortgage in place, going self-employed will not affect your existing
                mortgage &mdash; it only matters when you apply. This strategy can save you two to
                three years of waiting.
              </p>
            </div>
          </div>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-3-1-check3"
            question="What is the recommended maximum credit card utilisation to maintain a healthy credit score?"
            options={[
              '10% of your total limit',
              '30% of your total limit',
              '50% of your total limit',
              '75% of your total limit',
            ]}
            correctIndex={1}
            explanation="Keeping your credit utilisation below 30% of your total available credit limit is the widely recommended threshold. Higher utilisation signals potential financial stress to lenders."
          />

          {/* ====== SECTION 06 ====== */}
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-rose-400 mr-2">06</span>
              Common Credit Mistakes Electricians Make
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Across the trade, certain credit mistakes come up time and again. Being aware of them
              helps you avoid the pitfalls:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Taking Van Finance Without Shopping Around
                </h3>
                <p className="text-white text-sm">
                  Dealership finance is rarely the cheapest option. The convenience of signing at
                  the dealer comes at a premium &mdash; sometimes several percentage points higher
                  APR than you could get from a personal loan or specialist commercial vehicle
                  finance broker. A 2% difference on a &pound;25,000 van over four years costs you
                  roughly &pound;1,000 to &pound;1,200 in extra interest. Always compare at least
                  three finance quotes before committing.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Using Credit Cards for Tools Without a Payoff Plan
                </h3>
                <p className="text-white text-sm">
                  Putting a &pound;800 multimeter or a &pound;2,000 set of test instruments on a
                  credit card at 22% APR and only making minimum payments is one of the most
                  expensive ways to finance tools. At minimum payments, that &pound;2,000 could take
                  over ten years to repay and cost more than &pound;2,500 in interest alone. If you
                  must use credit, use a 0% purchase card and pay it off before the promotional
                  period ends.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Ignoring Your Credit File Until You Need It
                </h3>
                <p className="text-white text-sm">
                  Many electricians only check their credit score when they are about to apply for a
                  mortgage or finance &mdash; and then discover problems that take months to fix.
                  Errors on credit files are more common than you might think. Check all three
                  agencies every quarter so you can spot and dispute errors well before you need to
                  apply for anything.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Applying for Multiple Credit Products in Quick Succession
                </h3>
                <p className="text-white text-sm">
                  Setting up as self-employed often means needing a van, tools, insurance, and a
                  business bank account all at once. Applying for all of these within a few weeks
                  creates a cluster of hard searches that can temporarily tank your score. Space
                  applications out over several months where possible, and use eligibility checkers
                  (soft searches) first.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Does checking my own credit score lower it?
                </h3>
                <p className="text-white text-sm">
                  No. Checking your own score is a &ldquo;soft search&rdquo; and has no effect on
                  your rating. You can check as often as you like through ClearScore, Credit Karma,
                  or the Experian app without any impact. Only formal credit applications (hard
                  searches) by lenders affect your score.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can my partner&rsquo;s bad credit affect mine?
                </h3>
                <p className="text-white text-sm">
                  Only if you have a financial link &mdash; such as a joint bank account, joint
                  mortgage, or joint credit card. Simply living at the same address does not create
                  a financial link. If you have an old financial link with someone who has poor
                  credit, you can request a &ldquo;financial disassociation&rdquo; from each credit
                  reference agency once the joint account is closed.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How long do negative marks stay on my credit file?
                </h3>
                <p className="text-white text-sm">
                  Most negative information &mdash; missed payments, defaults, CCJs &mdash; stays on
                  your file for six years from the date it was recorded. Bankruptcy stays for six
                  years from the date of discharge. After this period, the information is
                  automatically removed and stops affecting your score.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  I am CIS registered &mdash; am I treated as employed or self-employed for credit?
                </h3>
                <p className="text-white text-sm">
                  It depends on the lender. Some lenders treat CIS subcontractors with a single main
                  contractor as effectively employed and accept CIS payment statements in place of
                  payslips. Others require full self-employed documentation including SA302s and
                  accountant-prepared accounts. A specialist mortgage broker can match you with the
                  right lender for your situation.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            title="Section 1 Quiz: Understanding Credit in the UK"
            questions={[
              {
                id: 1,
                question: 'How many credit reference agencies operate in the UK?',
                options: ['One', 'Two', 'Three', 'Four'],
                correctAnswer: 2,
                explanation:
                  'The three UK credit reference agencies are Experian, Equifax, and TransUnion. Each holds slightly different data and uses a different scoring model.',
              },
              {
                id: 2,
                question: 'Which free service allows you to check your Equifax credit report?',
                options: ['Credit Karma', 'ClearScore', 'MSE Credit Club', 'Experian app'],
                correctAnswer: 1,
                explanation:
                  'ClearScore provides free access to your Equifax credit report. Credit Karma covers TransUnion, and MSE Credit Club covers Experian.',
              },
              {
                id: 3,
                question: 'What is the single most important factor affecting your credit score?',
                options: [
                  'How many credit cards you have',
                  'Your salary',
                  'Your payment history',
                  'The length of your credit history',
                ],
                correctAnswer: 2,
                explanation:
                  'Payment history is the strongest factor in credit scoring. Consistently paying on time builds your score; missed payments damage it significantly.',
              },
              {
                id: 4,
                question: 'What percentage of your credit limit should you ideally stay below?',
                options: ['10%', '30%', '50%', '75%'],
                correctAnswer: 1,
                explanation:
                  'Keeping utilisation below 30% is the recommended threshold. Higher utilisation signals financial stress to lenders.',
              },
              {
                id: 5,
                question:
                  'How many years of trading history do most mainstream lenders require from self-employed applicants?',
                options: [
                  'One year',
                  'Two to three years',
                  'Four to five years',
                  'No minimum required',
                ],
                correctAnswer: 1,
                explanation:
                  'Most mainstream lenders require at least two years of trading history, with some asking for three years of accounts.',
              },
              {
                id: 6,
                question:
                  'What is the key HMRC document needed for a self-employed mortgage application?',
                options: ['P60', 'P45', 'SA302', 'VAT return'],
                correctAnswer: 2,
                explanation:
                  'The SA302 tax calculation from HMRC is the primary document lenders use to verify self-employed income for mortgage applications.',
              },
              {
                id: 7,
                question: 'How long do most negative markers remain on your credit file?',
                options: ['Three years', 'Five years', 'Six years', 'Ten years'],
                correctAnswer: 2,
                explanation:
                  'Most negative information, including missed payments, defaults, and CCJs, stays on your credit file for six years from the date it was recorded.',
              },
              {
                id: 8,
                question:
                  'What simple action can immediately boost your credit score if you are not already registered?',
                options: [
                  'Opening a savings account',
                  'Registering on the electoral roll',
                  'Getting a store card',
                  'Closing unused credit accounts',
                ],
                correctAnswer: 1,
                explanation:
                  'Registering on the electoral roll at your current address confirms your identity and address to lenders and is one of the quickest ways to improve your score.',
              },
            ]}
          />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-3-section-2">
                Next: Good Debt vs Bad Debt
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
