import { ArrowLeft, Scale, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

export default function PFModule3Section2() {
  useSEO({
    title: 'Good Debt vs Bad Debt | Module 3 Section 2 | Personal Finance & Financial Wellbeing',
    description:
      'Understand the debt spectrum, asset-building vs consumption debt, van finance options, tool finance, and BNPL risks for UK electricians.',
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
              <span className="text-white text-xs">SECTION 2</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Good Debt vs Bad Debt</h1>
            </div>
            <p className="text-white text-sm sm:text-base">
              Not all debt is equal &mdash; understanding the difference between borrowing that
              builds your future and borrowing that drains it
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm">
                Debt is a tool, not inherently good or bad. Borrowing to buy an asset that generates
                income or grows in value (a mortgage, tools you need for work, training
                qualifications) is fundamentally different from borrowing to fund lifestyle spending
                that loses value immediately. The key question is always: will this borrowing leave
                me better off or worse off in two years?
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm">
                As an electrician, you will face debt decisions regularly &mdash; van finance, tool
                purchases, training courses, and the everyday temptation of buy-now-pay-later.
                Making the right choice each time is the difference between debt that accelerates
                your career and debt that holds you back for years.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-8">
            <h2 className="text-white font-semibold text-base mb-3">What You&rsquo;ll Learn</h2>
            <ul className="space-y-2">
              {[
                'Distinguish between asset-building debt and consumption debt',
                'Evaluate van finance options: PCP vs HP vs lease with worked examples',
                'Identify the risks of buy-now-pay-later and high-interest credit for tools',
                'Apply a simple decision framework before taking on any debt',
                'Recognise when a business growth loan makes financial sense',
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
              The Debt Spectrum
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              People often talk about debt as if it is a single thing &mdash; either you have it or
              you do not. In reality, debt exists on a spectrum from highly productive to deeply
              destructive. Understanding where a particular borrowing falls on that spectrum is the
              most important financial skill you can develop.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-3">
                The Debt Spectrum: From Best to Worst
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-semibold">Asset-Building Debt</p>
                    <p className="text-white text-sm">
                      Borrowing to acquire something that increases in value or generates income. A
                      mortgage is the classic example &mdash; you pay interest, but the property
                      typically appreciates over time and provides housing you would otherwise need
                      to rent.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-semibold">Income-Generating Debt</p>
                    <p className="text-white text-sm">
                      Borrowing to buy tools, equipment, or a van that directly enables you to earn
                      money. Without a van, you cannot get to jobs. Without test instruments, you
                      cannot certify your work. This borrowing pays for itself through the income it
                      generates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-semibold">Investment Debt</p>
                    <p className="text-white text-sm">
                      Borrowing to fund training or qualifications that increase your earning power.
                      Paying &pound;1,500 for an 18th Edition course plus inspection and testing
                      qualification can add &pound;5,000 or more to your annual income. The return
                      on investment is clear and measurable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-semibold">Neutral Debt</p>
                    <p className="text-white text-sm">
                      Interest-free or very low-interest borrowing for essential purchases you would
                      make anyway. A 0% credit card used to spread the cost of a necessary household
                      appliance, paid off before the promotional period ends, costs you nothing and
                      preserves your cash flow.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-semibold">Consumption Debt</p>
                    <p className="text-white text-sm">
                      Borrowing to buy things that lose value immediately &mdash; holidays on credit
                      cards, the latest phone on finance when your current one works fine, or using
                      buy-now-pay-later for clothes. The item depreciates while the debt remains,
                      leaving you worse off.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-sm font-semibold">Toxic Debt</p>
                    <p className="text-white text-sm">
                      High-interest borrowing such as payday loans (often 1,000%+ APR), doorstep
                      lending, or persistent credit card debt at 30%+ APR. The interest compounds so
                      quickly that you end up paying far more than the original amount borrowed, and
                      it becomes extremely difficult to escape.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">The Key Question</h3>
              <p className="text-white text-sm">
                Before taking on any debt, ask yourself: &ldquo;Will I be financially better off or
                worse off in two years because of this borrowing?&rdquo; If the answer is better off
                (because the debt funds an appreciating asset, generates income, or increases your
                earning power), it is likely good debt. If the answer is worse off, think very
                carefully before proceeding.
              </p>
            </div>
          </div>

          {/* ====== SECTION 02 ====== */}
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-amber-400 mr-2">02</span>
              Good Debt: Borrowing That Builds Your Future
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              For electricians, several categories of borrowing clearly fall on the productive side
              of the spectrum. Understanding these helps you borrow confidently when the situation
              is right.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Mortgage</h3>
                <p className="text-white text-sm">
                  A mortgage is typically the largest and best debt you will ever take on.
                  Historically, UK property has appreciated significantly over the long term, and
                  mortgage interest rates are far lower than other forms of borrowing. Even in a
                  flat market, you are building equity with every repayment instead of paying a
                  landlord. A typical mortgage at 4.5% over 25 years on a &pound;200,000 property
                  costs around &pound;1,110 per month &mdash; comparable to renting in many areas,
                  but with the property becoming yours over time.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Essential Tool Finance</h3>
                <p className="text-white text-sm">
                  A Fluke multifunction tester, a quality set of power tools, or specialist
                  equipment for fire alarm or EV charger installation &mdash; these are income-
                  generating assets. If financing a &pound;3,000 MFT at 5% APR over two years
                  enables you to take on testing work that earns an extra &pound;200 per week, the
                  maths strongly favours borrowing. The tool pays for itself within a few months.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Training &amp; Qualifications
                </h3>
                <p className="text-white text-sm mb-3">
                  Investing in qualifications that increase your earning power is one of the
                  highest- return investments you can make. Consider the numbers:
                </p>
                <ul className="space-y-2">
                  {[
                    '18th Edition course: £250 to £400 — opens the door to all electrical work',
                    'Inspection and Testing (2391): £800 to £1,200 — allows you to certify work and earn significantly more',
                    'EV Charger Installation (City & Guilds 2919): £500 to £800 — access to a growing market',
                    'Design and Verification (2396): £800 to £1,000 — enables design work at higher rates',
                    'Solar PV Installation: £1,000 to £2,000 — access to the renewable energy market',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Business Growth Loans</h3>
                <p className="text-white text-sm">
                  A loan to take on an apprentice, expand into a new service area, or move from a
                  sole trader to a small team can be excellent debt if the business case is sound.
                  The key is having a clear plan: how will the borrowed money generate more revenue
                  than it costs? Government-backed Start Up Loans (up to &pound;25,000 at 6% fixed
                  APR with free mentoring) are designed for exactly this purpose and are available
                  to businesses under three years old.
                </p>
              </div>
            </div>
          </div>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-3-2-check1"
            question="An electrician borrows £1,200 for a City & Guilds 2391 course that enables them to certify their own work and earn £5,000 more per year. What type of debt is this?"
            options={[
              'Consumption debt — it does not produce a physical asset',
              'Toxic debt — any borrowing for courses is risky',
              'Investment debt — it increases earning power far beyond the cost',
              'Neutral debt — qualifications are optional luxuries',
            ]}
            correctIndex={2}
            explanation="This is investment debt. The £1,200 cost generates an additional £5,000 per year in earning power, making it one of the highest-return investments available. The qualification pays for itself within a few months."
          />

          {/* ====== SECTION 03 ====== */}
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-green-400 mr-2">03</span>
              Van Finance: PCP vs HP vs Lease
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              A van is likely the most expensive asset you will finance after your home. Getting the
              finance structure right can save you thousands. Here is a detailed comparison of the
              three main options:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Hire Purchase (HP)</h3>
                <p className="text-white text-sm mb-3">
                  With HP, you pay a deposit (typically 10% to 20%) and then fixed monthly payments
                  over an agreed term (usually three to five years). Once you make the final payment
                  plus a small &ldquo;option to purchase&rdquo; fee (often &pound;1), you own the
                  van outright.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <h4 className="text-white font-semibold text-xs mb-2">
                    Worked Example: HP on a &pound;25,000 Van
                  </h4>
                  <ul className="space-y-1">
                    <li className="text-white text-sm">Deposit: &pound;2,500 (10%)</li>
                    <li className="text-white text-sm">Amount financed: &pound;22,500</li>
                    <li className="text-white text-sm">Term: 48 months</li>
                    <li className="text-white text-sm">APR: 6.9%</li>
                    <li className="text-white text-sm">
                      Monthly payment: approximately &pound;537
                    </li>
                    <li className="text-white text-sm">
                      Total cost: &pound;2,500 + (48 &times; &pound;537) = &pound;28,276
                    </li>
                    <li className="text-white text-sm">
                      Total interest paid: approximately &pound;3,276
                    </li>
                    <li className="text-white text-sm font-semibold">You own the van at the end</li>
                  </ul>
                </div>
                <p className="text-white text-sm">
                  <strong className="text-white">Best for:</strong> Electricians who plan to keep
                  their van for many years, want to own it outright, and prefer certainty with fixed
                  payments. Self-employed electricians can claim capital allowances on the van value
                  and deduct interest as a business expense.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Personal Contract Purchase (PCP)
                </h3>
                <p className="text-white text-sm mb-3">
                  PCP offers lower monthly payments because you are only paying off the depreciation
                  during the term, not the full value. At the end, you have three options: pay a
                  &ldquo;balloon payment&rdquo; (Guaranteed Minimum Future Value) to own the van,
                  hand it back, or use any equity as a deposit on a new van.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <h4 className="text-white font-semibold text-xs mb-2">
                    Worked Example: PCP on a &pound;25,000 Van
                  </h4>
                  <ul className="space-y-1">
                    <li className="text-white text-sm">Deposit: &pound;2,500 (10%)</li>
                    <li className="text-white text-sm">Amount financed: &pound;22,500</li>
                    <li className="text-white text-sm">Term: 48 months</li>
                    <li className="text-white text-sm">APR: 5.9%</li>
                    <li className="text-white text-sm">
                      Monthly payment: approximately &pound;310
                    </li>
                    <li className="text-white text-sm">Balloon payment at end: &pound;9,500</li>
                    <li className="text-white text-sm">
                      Total if you keep: &pound;2,500 + (48 &times; &pound;310) + &pound;9,500 =
                      &pound;26,880
                    </li>
                    <li className="text-white text-sm font-semibold">
                      Lower monthly cost but you do NOT own it until the balloon is paid
                    </li>
                  </ul>
                </div>
                <p className="text-white text-sm">
                  <strong className="text-white">Best for:</strong> Electricians who want a newer
                  van with lower monthly outgoings and are happy to change vehicles every three to
                  four years. Be aware of mileage limits &mdash; typically 8,000 to 12,000 miles per
                  year &mdash; which can be easily exceeded if you cover a wide area.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Contract Hire (Lease)</h3>
                <p className="text-white text-sm mb-3">
                  With a lease, you pay a fixed monthly rental and hand the van back at the end. You
                  never own it. Business contract hire payments are typically VAT-deductible (50%
                  for sole traders, 100% for limited companies if the van is used exclusively for
                  business).
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <h4 className="text-white font-semibold text-xs mb-2">
                    Worked Example: Lease on a &pound;25,000 Van
                  </h4>
                  <ul className="space-y-1">
                    <li className="text-white text-sm">
                      Initial rental: &pound;1,500 (3 &times; monthly)
                    </li>
                    <li className="text-white text-sm">Monthly rental: &pound;500 + VAT</li>
                    <li className="text-white text-sm">Term: 48 months</li>
                    <li className="text-white text-sm">
                      Total cost: &pound;1,500 + (47 &times; &pound;500) = &pound;25,000 + VAT
                    </li>
                    <li className="text-white text-sm font-semibold">
                      You do NOT own the van — it goes back at the end
                    </li>
                  </ul>
                </div>
                <p className="text-white text-sm">
                  <strong className="text-white">Best for:</strong> Limited company directors who
                  benefit from VAT recovery and want predictable monthly costs with no risk of the
                  van depreciating. Maintenance packages can be included for additional certainty.
                </p>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Van Finance Warning</h3>
              <p className="text-white text-sm">
                Dealer finance rates are often not the cheapest option. Before signing at the
                dealership, check if a personal loan or specialist commercial vehicle broker could
                offer a better rate. Also consider that PCP mileage limits of 10,000 miles per year
                can easily be exceeded by a busy electrician covering a wide area &mdash; excess
                mileage charges of 5p to 15p per mile can add up to significant penalties. Calculate
                your typical annual mileage before committing to PCP.
              </p>
            </div>
          </div>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-3-2-check2"
            question="Which van finance option typically has the lowest monthly payments but requires a large payment at the end to own the vehicle?"
            options={[
              'Hire Purchase (HP)',
              'Personal Contract Purchase (PCP)',
              'Contract Hire (Lease)',
              'Bank personal loan',
            ]}
            correctIndex={1}
            explanation="PCP has lower monthly payments because you only pay off the depreciation during the term. To own the van at the end, you must pay the balloon payment (Guaranteed Minimum Future Value), which can be several thousand pounds."
          />

          {/* ====== SECTION 04 ====== */}
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-blue-400 mr-2">04</span>
              Bad Debt: Borrowing That Drains You
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Bad debt is borrowing that leaves you financially worse off &mdash; either because the
              interest rate is punishingly high, because the thing you bought loses value
              immediately, or both. Recognising these patterns helps you avoid them.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  High-Interest Credit Card Debt
                </h3>
                <p className="text-white text-sm mb-3">
                  The average UK credit card charges around 22% to 25% APR. If you carry a balance
                  and only make minimum payments, the compound interest works aggressively against
                  you. Consider this example:
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <h4 className="text-white font-semibold text-xs mb-2">
                    The Minimum Payment Trap
                  </h4>
                  <ul className="space-y-1">
                    <li className="text-white text-sm">Balance: &pound;3,000 at 22% APR</li>
                    <li className="text-white text-sm">
                      Minimum payment: 2.5% or &pound;25 (whichever is higher)
                    </li>
                    <li className="text-white text-sm">Time to repay at minimums: over 20 years</li>
                    <li className="text-white text-sm">
                      Total interest paid: approximately &pound;3,800
                    </li>
                    <li className="text-white text-sm font-semibold">
                      You pay back &pound;6,800 total for a &pound;3,000 balance
                    </li>
                  </ul>
                </div>
                <p className="text-white text-sm">
                  The same &pound;3,000 on a 0% balance transfer card (with a 3% fee of &pound;90)
                  repaid over 24 months at &pound;125/month costs just &pound;3,090 total. That is a
                  saving of &pound;3,710. Always look for 0% offers if you need to carry a balance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Payday Loans</h3>
                <p className="text-white text-sm">
                  Although now regulated by the FCA with a daily interest cap of 0.8% and a total
                  cost cap of 100% of the amount borrowed, payday loans remain extraordinarily
                  expensive. Borrowing &pound;500 for 30 days could cost &pound;120 in charges
                  &mdash; an annualised rate of over 1,200%. If you find yourself considering a
                  payday loan, it is a strong signal that you need to address the underlying cash
                  flow problem rather than papering over it with expensive borrowing.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Catalogue Credit &amp; Store Cards
                </h3>
                <p className="text-white text-sm">
                  Store cards typically charge 25% to 40% APR &mdash; significantly higher than
                  mainstream credit cards. Catalogue credit (buy-now-pay-later on furniture,
                  electronics, etc.) often charges similarly high rates once any promotional period
                  ends. The initial discount or promotional offer rarely compensates for the
                  interest charged if you do not pay off the balance in full.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Borrowing for Depreciating Assets
                </h3>
                <p className="text-white text-sm">
                  Financing the latest smartphone on a two-year contract when your current phone
                  works fine, taking out a personal loan for a holiday, or putting a big night out
                  on a credit card &mdash; these are all examples of consumption debt. The
                  experience or item loses value immediately, but the repayment obligation persists
                  for months or years. The holiday is over, but you are still paying for it at 22%
                  APR six months later.
                </p>
              </div>
            </div>
          </div>

          {/* ====== SECTION 05 ====== */}
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-purple-400 mr-2">05</span>
              Tool Finance &amp; BNPL: Hidden Risks
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Buy-now-pay-later (BNPL) services such as Klarna, Clearpay, and PayPal Credit have
              become hugely popular for purchasing tools and equipment online. While they can be
              useful if managed carefully, they carry significant risks that are often overlooked.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">How BNPL Works</h3>
                <p className="text-white text-sm">
                  BNPL services typically allow you to split a purchase into three or four
                  interest-free instalments, paid every two weeks or monthly. Some offer longer
                  terms of six to twelve months, often interest-free. PayPal Credit offers a
                  revolving credit line. On the surface, this seems like a reasonable way to spread
                  costs. The problems lie beneath.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">The BNPL Risks</h3>
                <ul className="space-y-2">
                  {[
                    'Multiple BNPL agreements running simultaneously can quickly become unmanageable — it is easy to lose track of when each payment is due',
                    'Missed BNPL payments can incur late fees and may now be reported to credit reference agencies (Klarna started reporting to TransUnion in 2022)',
                    'BNPL encourages spending you might not otherwise commit to — the "pay later" framing makes purchases feel less real',
                    'Some BNPL agreements charge deferred interest — if you do not repay within the promotional period, interest is charged retrospectively on the full original amount',
                    'BNPL purchases do not benefit from Section 75 protection (covered in Section 4) because the credit provider is not the card company',
                    'The FCA confirmed in 2023 that BNPL will be brought under full regulation, meaning affordability checks, clearer terms, and dispute resolution — but implementation is still being phased in',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Tool Finance Alternatives</h3>
                <p className="text-white text-sm mb-3">
                  Before reaching for BNPL or credit when buying tools, consider these alternatives:
                </p>
                <ul className="space-y-2">
                  {[
                    'Save up using a dedicated "tools fund" — even £50 per month builds a £600 annual budget',
                    'Buy used test equipment from reputable suppliers who offer calibration certificates',
                    'Check if your employer provides tools or a tool allowance (JIB agreements include tool provisions)',
                    'Use a 0% purchase credit card and clear the balance before the promotional period ends',
                    'If self-employed, time purchases to maximise capital allowances (Annual Investment Allowance)',
                    'Trade-in old equipment when upgrading — many suppliers offer part-exchange deals',
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
              <h3 className="text-white font-semibold text-sm mb-2">BNPL Reality Check</h3>
              <p className="text-white text-sm">
                A 2023 FCA review found that one in four BNPL users had missed a payment, and many
                were unaware of the consequences. If you use BNPL, treat it with the same
                seriousness as any other form of credit: only borrow what you can afford to repay,
                set calendar reminders for payment dates, and never use BNPL to buy things you would
                not buy if you had to pay upfront.
              </p>
            </div>
          </div>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-3-2-check3"
            question="A credit card balance of £3,000 at 22% APR repaid only at the minimum rate would take approximately how long to clear?"
            options={['About 3 years', 'About 7 years', 'About 12 years', 'Over 20 years']}
            correctIndex={3}
            explanation="At minimum payments (typically 2.5% or £25, whichever is higher), a £3,000 balance at 22% APR would take over 20 years to repay and cost approximately £3,800 in interest — more than the original balance."
          />

          {/* ====== SECTION 06 ====== */}
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-rose-400 mr-2">06</span>A Decision Framework for Borrowing
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Before taking on any debt, run it through this five-question checklist. If you answer
              &ldquo;no&rdquo; to more than one question, reconsider the borrowing.
            </p>

            <div className="space-y-3 mb-4">
              {[
                {
                  num: 1,
                  q: 'Is this essential, or just desirable?',
                  detail:
                    'A van to get to work is essential. The top-spec model with all the extras might not be. Distinguish between need and want before deciding how much to borrow.',
                },
                {
                  num: 2,
                  q: 'Will this borrowing make me financially better off in two years?',
                  detail:
                    'Tools that enable new work, qualifications that increase earnings, or a property that builds equity all pass this test. A holiday, the latest phone, or a designer watch do not.',
                },
                {
                  num: 3,
                  q: 'Can I comfortably afford the repayments even if my income drops 20%?',
                  detail:
                    'As an electrician, your income can fluctuate — especially if self-employed. Build a margin of safety into your affordability calculation. If losing one week of work per month would make the payments unaffordable, the borrowing is too much.',
                },
                {
                  num: 4,
                  q: 'Have I compared at least three finance options?',
                  detail:
                    'Dealer finance, bank loans, credit cards, 0% offers, and specialist commercial finance all have different rates and terms. Never accept the first offer without comparing alternatives.',
                },
                {
                  num: 5,
                  q: 'Is the APR below 10% (for secured/productive debt) or is there a 0% option?',
                  detail:
                    'Low-interest or interest-free borrowing for productive purposes is generally acceptable. Anything above 15% APR for a depreciating asset should be questioned seriously. Above 30% APR is almost always bad debt.',
                },
              ].map((item) => (
                <div key={item.num} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {item.num}. {item.q}
                  </h3>
                  <p className="text-white text-sm">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">The 24-Hour Rule</h3>
              <p className="text-white text-sm">
                For any non-essential purchase over &pound;250 that requires borrowing, wait 24
                hours before committing. Impulse decisions made at a tool show, in a dealership, or
                late at night on a supplier website are responsible for a huge proportion of
                regrettable debt. If it still seems like a good idea tomorrow, and it passes the
                five-question checklist, proceed with confidence.
              </p>
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
                  Is a personal loan better than HP for van finance?
                </h3>
                <p className="text-white text-sm">
                  It depends on the rates available. A personal loan is unsecured, meaning the van
                  cannot be repossessed if you default (though other collection action would
                  follow). HP is secured against the van, which usually means lower rates. Compare
                  the total cost of borrowing (total amount repayable) across both options, not just
                  the monthly payment or APR in isolation.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Should I ever use savings instead of borrowing?
                </h3>
                <p className="text-white text-sm">
                  If the interest rate on borrowing is higher than the return on your savings (which
                  it almost always is), then using savings is mathematically better. However, never
                  drain your emergency fund to avoid borrowing. Keep at least three months of
                  expenses in reserve, and only use savings beyond that for purchases.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is 0% finance ever a bad idea?
                </h3>
                <p className="text-white text-sm">
                  Genuinely interest-free finance is neutral at worst &mdash; it costs you nothing
                  extra. The risk is behavioural: the easy availability of 0% can encourage you to
                  buy things you do not need. It is also critical to check what happens when the 0%
                  period ends. Some agreements charge deferred interest on the entire original
                  balance if you have not paid it off by the end date. Set a calendar reminder and
                  ensure you pay in full before the promotional period expires.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I claim van finance as a business expense?
                </h3>
                <p className="text-white text-sm">
                  If you are self-employed and the van is used for business, yes. With HP, you claim
                  capital allowances on the van value and deduct the interest portion of payments.
                  With a lease, the rental payments are deductible as an expense. With PCP, the
                  treatment depends on whether you exercise the option to buy. Speak to your
                  accountant for specific advice on your situation &mdash; the tax treatment varies
                  by business structure and usage pattern.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            title="Section 2 Quiz: Good Debt vs Bad Debt"
            questions={[
              {
                id: 1,
                question:
                  'Which of the following is the best example of "good debt" for an electrician?',
                options: [
                  'A payday loan to cover a cash flow gap',
                  'Financing a multifunction tester needed for testing work',
                  'Putting a holiday on a credit card at 22% APR',
                  'Using BNPL to buy designer clothing',
                ],
                correctAnswer: 1,
                explanation:
                  'Financing essential test equipment is income-generating debt — the tool directly enables you to earn money from testing work, paying for itself quickly.',
              },
              {
                id: 2,
                question: 'With PCP van finance, what happens at the end of the agreement?',
                options: [
                  'You automatically own the van',
                  'The van is repossessed',
                  'You choose: pay the balloon, hand it back, or part-exchange',
                  'The payments continue at a reduced rate',
                ],
                correctAnswer: 2,
                explanation:
                  'PCP gives you three options at the end: pay the balloon payment to own the van, hand it back with nothing more to pay (subject to condition and mileage limits), or use any equity as a deposit on a new vehicle.',
              },
              {
                id: 3,
                question:
                  'Which type of van finance typically has the highest monthly payments but means you own the vehicle at the end?',
                options: [
                  'PCP',
                  'Contract Hire (Lease)',
                  'Hire Purchase (HP)',
                  'They are all the same',
                ],
                correctAnswer: 2,
                explanation:
                  'HP has higher monthly payments because you are paying off the full value of the vehicle during the term. However, you own it outright at the end.',
              },
              {
                id: 4,
                question: 'What is a major risk of using BNPL for tool purchases?',
                options: [
                  'BNPL never offers interest-free terms',
                  'Missed payments may be reported to credit agencies and multiple agreements become hard to track',
                  'BNPL is illegal for business purchases',
                  'BNPL always charges higher rates than credit cards',
                ],
                correctAnswer: 1,
                explanation:
                  'BNPL providers like Klarna now report missed payments to credit reference agencies. Running multiple simultaneous BNPL agreements makes it easy to lose track of due dates and miss payments.',
              },
              {
                id: 5,
                question:
                  'A £3,000 credit card balance at 22% APR with only minimum payments will cost approximately how much in total interest?',
                options: ['£500', '£1,500', '£2,500', '£3,800'],
                correctAnswer: 3,
                explanation:
                  'At minimum payments, a £3,000 balance at 22% APR costs approximately £3,800 in interest over more than 20 years — more than the original balance.',
              },
              {
                id: 6,
                question: 'Which question is NOT part of the borrowing decision framework?',
                options: [
                  'Is this essential, or just desirable?',
                  'Will this borrowing make me better off in two years?',
                  'Have my friends recommended this product?',
                  'Can I afford the repayments if my income drops 20%?',
                ],
                correctAnswer: 2,
                explanation:
                  'The five-question framework focuses on necessity, future benefit, affordability stress-testing, comparison shopping, and interest rate assessment — not peer recommendations.',
              },
              {
                id: 7,
                question:
                  'What is the recommended waiting period before committing to a non-essential purchase over £250 that requires borrowing?',
                options: ['1 hour', '24 hours', '7 days', '30 days'],
                correctAnswer: 1,
                explanation:
                  'The 24-hour rule helps avoid impulse decisions. If the purchase still seems like a good idea the next day and passes the five-question checklist, proceed with confidence.',
              },
              {
                id: 8,
                question:
                  'What is the maximum interest rate per day that FCA regulations allow on payday loans?',
                options: ['0.1%', '0.5%', '0.8%', '1.5%'],
                correctAnswer: 2,
                explanation:
                  'The FCA caps payday loan interest at 0.8% per day, with a total cost cap of 100% of the amount borrowed. Even with these caps, the annualised rates exceed 1,200%.',
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
              <Link to="../pf-module-3-section-3">
                Next: Dealing with Existing Debt
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
