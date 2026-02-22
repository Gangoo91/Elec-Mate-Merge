import { ArrowLeft, LifeBuoy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

export default function PFModule3Section3() {
  useSEO({
    title:
      'Dealing with Existing Debt | Module 3 Section 3 | Personal Finance & Financial Wellbeing',
    description:
      'Priority vs non-priority debts, repayment strategies, free debt advice services, formal solutions, and HMRC Time to Pay for UK electricians.',
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
              <span className="text-white text-xs">SECTION 3</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <LifeBuoy className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Dealing with Existing Debt
              </h1>
            </div>
            <p className="text-white text-sm sm:text-base">
              Practical strategies for managing and eliminating debt, plus where to get free
              professional help
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm">
                If you are struggling with debt, the first step is to distinguish between priority
                debts (where non-payment has severe consequences like losing your home or going to
                prison) and non-priority debts. Then choose a repayment strategy &mdash; avalanche
                or snowball &mdash; and stick to it. Free professional debt advice is available from
                several UK charities. Formal solutions exist for more serious situations.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm">
                Debt problems do not fix themselves &mdash; they get worse. The sooner you take
                action, the more options you have and the less it costs. Many electricians,
                especially those who are newly self-employed or have irregular income, face periods
                where debt builds up. Knowing how to handle it is a core life skill, not a sign of
                failure.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-8">
            <h2 className="text-white font-semibold text-base mb-3">What You&rsquo;ll Learn</h2>
            <ul className="space-y-2">
              {[
                'Classify debts as priority or non-priority and explain why this distinction matters',
                'Compare the avalanche and snowball repayment methods and choose the right one for your situation',
                'Access free professional debt advice from UK charities and helplines',
                'Understand formal debt solutions: DMPs, IVAs, DROs, and bankruptcy',
                'Navigate HMRC Time to Pay arrangements for tax debts',
                'Recognise the link between debt and mental health and where to get support',
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
              Priority vs Non-Priority Debts
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Not all debts are equal in urgency. The legal consequences of non-payment vary
              enormously, and getting the order wrong can lead to losing your home, your liberty, or
              your ability to work. The distinction between priority and non-priority debts is the
              single most important concept in debt management.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-3">
                Priority Debts &mdash; Pay These First
              </h3>
              <p className="text-white text-sm mb-3">
                These are debts where the consequences of non-payment are severe and can
                fundamentally affect your life, freedom, or ability to earn:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <h4 className="text-white font-semibold text-xs mb-1">
                    Mortgage or Rent Arrears
                  </h4>
                  <p className="text-white text-sm">
                    Non-payment can lead to repossession (mortgage) or eviction (rent). Losing your
                    home has devastating consequences for every area of your life. If you are
                    falling behind, contact your lender or landlord immediately &mdash; they are
                    required to work with you to find a solution before taking legal action. The
                    pre-action protocol means courts expect lenders to have explored all other
                    options before applying for possession.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <h4 className="text-white font-semibold text-xs mb-1">Council Tax</h4>
                  <p className="text-white text-sm">
                    Council tax is one of only two debts in England and Wales for which you can be
                    imprisoned (the other is TV licence evasion, though this is extremely rare).
                    More commonly, councils use bailiffs to enforce payment. If you fall behind, the
                    council can apply to a magistrates&rsquo; court for a liability order, which
                    gives them enforcement powers including attachment of earnings, deductions from
                    benefits, and bailiff action.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <h4 className="text-white font-semibold text-xs mb-1">
                    Energy Bills (Gas &amp; Electricity)
                  </h4>
                  <p className="text-white text-sm">
                    Your energy supplier cannot cut off your supply without following a lengthy
                    process, but they can install a prepayment meter (even entering your property
                    with a magistrates&rsquo; warrant if necessary). With a prepayment meter, a
                    percentage of each top-up goes towards the arrears, which can leave you
                    struggling to afford sufficient energy. Ofgem rules protect vulnerable
                    customers, but prevention is far better than cure.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <h4 className="text-white font-semibold text-xs mb-1">
                    Income Tax, National Insurance &amp; VAT (HMRC)
                  </h4>
                  <p className="text-white text-sm">
                    HMRC has powerful collection tools including attachment of earnings, direct
                    recovery from bank accounts (for debts over &pound;1,000), and the ability to
                    petition for bankruptcy or wind up your company. However, HMRC also has the Time
                    to Pay scheme (covered in detail in section 05 below) which allows you to spread
                    payments over an agreed period. Contact them early &mdash; they are more
                    flexible than most people expect.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <h4 className="text-white font-semibold text-xs mb-1">
                    Magistrates&rsquo; Court Fines
                  </h4>
                  <p className="text-white text-sm">
                    Court fines for criminal offences (including motoring fines) are priority debts
                    because non-payment can result in imprisonment. If you cannot pay, contact the
                    court to request a payment plan before enforcement action is taken.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <h4 className="text-white font-semibold text-xs mb-1">Child Maintenance</h4>
                  <p className="text-white text-sm">
                    Arrears of child maintenance enforced through the Child Maintenance Service
                    (CMS) can result in deductions from earnings, seizure of assets, or driving
                    licence removal. The CMS has significant enforcement powers and treats
                    non-payment seriously.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-3">
                Non-Priority Debts &mdash; Still Important, but Less Urgent
              </h3>
              <p className="text-white text-sm mb-3">
                Non-priority debts cannot result in imprisonment or loss of your home or essential
                services. However, they can still cause serious problems including CCJs, bailiff
                action, and long-term damage to your credit file:
              </p>
              <ul className="space-y-2">
                {[
                  'Credit card balances',
                  'Personal loans and overdrafts',
                  'Store cards and catalogue debts',
                  'Buy-now-pay-later debts (Klarna, Clearpay, etc.)',
                  'Money owed to friends and family',
                  'Gym memberships and subscription services',
                  'Mobile phone contracts (the handset element, not the service)',
                  'Water bills (unique: water companies cannot disconnect your supply, so while important, non-payment has fewer immediate consequences)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Critical Rule</h3>
              <p className="text-white text-sm">
                Always ensure priority debts are covered before making any extra payments towards
                non-priority debts. It might feel urgent to clear a credit card that is charging
                high interest, but if that means falling behind on your council tax or mortgage, the
                consequences are far more severe.
              </p>
            </div>
          </div>

          {/* ====== SECTION 02 ====== */}
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-amber-400 mr-2">02</span>
              Repayment Strategies: Avalanche vs Snowball
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Once your priority debts are under control, you need a strategy for tackling
              non-priority debts. The two most proven approaches are the avalanche method and the
              snowball method. Both work &mdash; the best choice depends on your personality and
              situation.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  The Avalanche Method (Highest Interest First)
                </h3>
                <p className="text-white text-sm mb-3">
                  List all your debts by interest rate, from highest to lowest. Make minimum
                  payments on everything, then put every spare pound towards the debt with the
                  highest interest rate. When that is cleared, move to the next highest rate.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <h4 className="text-white font-semibold text-xs mb-2">
                    Example: Avalanche in Action
                  </h4>
                  <ul className="space-y-1">
                    <li className="text-white text-sm">
                      Credit card A: &pound;2,000 at 29.9% APR &larr; target this first
                    </li>
                    <li className="text-white text-sm">Store card: &pound;800 at 24.9% APR</li>
                    <li className="text-white text-sm">Personal loan: &pound;5,000 at 7.9% APR</li>
                    <li className="text-white text-sm">
                      Credit card B: &pound;1,200 at 5.9% APR (0% balance transfer)
                    </li>
                  </ul>
                </div>
                <p className="text-white text-sm">
                  <strong className="text-white">Pros:</strong> Saves the most money in interest
                  over the total repayment period. Mathematically optimal.
                </p>
                <p className="text-white text-sm">
                  <strong className="text-white">Cons:</strong> If the highest-rate debt is also the
                  largest, it can take a long time to clear the first one, which can be
                  demotivating.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  The Snowball Method (Smallest Balance First)
                </h3>
                <p className="text-white text-sm mb-3">
                  List all your debts by balance, from smallest to largest. Make minimum payments on
                  everything, then put every spare pound towards the smallest balance. When that is
                  cleared, roll the payment into the next smallest.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <h4 className="text-white font-semibold text-xs mb-2">
                    Example: Snowball in Action
                  </h4>
                  <ul className="space-y-1">
                    <li className="text-white text-sm">
                      Store card: &pound;800 at 24.9% APR &larr; target this first
                    </li>
                    <li className="text-white text-sm">Credit card B: &pound;1,200 at 5.9% APR</li>
                    <li className="text-white text-sm">Credit card A: &pound;2,000 at 29.9% APR</li>
                    <li className="text-white text-sm">Personal loan: &pound;5,000 at 7.9% APR</li>
                  </ul>
                </div>
                <p className="text-white text-sm">
                  <strong className="text-white">Pros:</strong> Quick wins provide psychological
                  momentum. Clearing a debt entirely (even a small one) feels like progress and
                  motivates you to continue.
                </p>
                <p className="text-white text-sm">
                  <strong className="text-white">Cons:</strong> Costs slightly more in total
                  interest compared to the avalanche method.
                </p>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Which Should You Choose?</h3>
              <p className="text-white text-sm">
                Research consistently shows that the snowball method has higher completion rates
                because the psychological boost of clearing debts quickly keeps people motivated.
                The avalanche method saves more money mathematically. If you are disciplined and
                motivated by numbers, use avalanche. If you need quick wins to stay on track, use
                snowball. Either method is vastly better than no plan at all.
              </p>
            </div>
          </div>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-3-3-check1"
            question="Which debt repayment method targets the smallest balance first to build momentum?"
            options={[
              'Avalanche method',
              'Snowball method',
              'Consolidation method',
              'Priority method',
            ]}
            correctIndex={1}
            explanation="The snowball method targets the smallest balance first, regardless of interest rate. Clearing small debts quickly provides psychological wins that help maintain motivation throughout the repayment journey."
          />

          {/* ====== SECTION 03 ====== */}
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-green-400 mr-2">03</span>
              Free Debt Advice Services
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              If you are struggling with debt, professional advice is available completely free of
              charge. These organisations are funded by the financial services industry (through a
              levy) and by government. There is absolutely no need to pay a commercial debt
              management company for advice &mdash; the free services offer the same or better
              support.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">StepChange Debt Charity</h3>
                <p className="text-white text-sm mb-2">
                  <strong className="text-white">Phone:</strong> 0800 138 1111 (free, Monday to
                  Friday 8am to 8pm, Saturday 8am to 4pm)
                </p>
                <p className="text-white text-sm mb-2">
                  <strong className="text-white">Online:</strong> stepchange.org &mdash; full online
                  debt advice tool available 24/7
                </p>
                <p className="text-white text-sm">
                  StepChange is the UK&rsquo;s largest debt charity. They provide a full debt
                  assessment, personalised action plan, and can set up and administer a Debt
                  Management Plan (DMP) on your behalf at no charge. They helped over 650,000 people
                  in 2023. Their online tool walks you through every debt, every bill, and produces
                  a comprehensive budget and recommendation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Citizens Advice</h3>
                <p className="text-white text-sm mb-2">
                  <strong className="text-white">Website:</strong> citizensadvice.org.uk
                </p>
                <p className="text-white text-sm mb-2">
                  <strong className="text-white">Adviceline (England):</strong> 0800 144 8848
                </p>
                <p className="text-white text-sm">
                  Citizens Advice offers face-to-face, phone, and online debt advice. They can help
                  with priority debt negotiations, benefit checks to ensure you are receiving
                  everything you are entitled to, and referrals to specialist services. They also
                  provide advice on related issues such as housing, employment, and consumer rights.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">National Debtline</h3>
                <p className="text-white text-sm mb-2">
                  <strong className="text-white">Phone:</strong> 0808 808 4000 (free, Monday to
                  Friday 9am to 8pm, Saturday 9.30am to 1pm)
                </p>
                <p className="text-white text-sm">
                  National Debtline provides expert advice by phone and has an excellent website
                  with template letters for dealing with creditors, sample budgets, and detailed
                  fact sheets on every type of debt and debt solution. Their self-help packs are
                  particularly good for people who prefer to manage their debts independently with
                  guidance rather than having someone do it for them.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  MoneyHelper (Government Service)
                </h3>
                <p className="text-white text-sm mb-2">
                  <strong className="text-white">Phone:</strong> 0800 138 7777
                </p>
                <p className="text-white text-sm">
                  MoneyHelper is the government-backed service that replaced the Money Advice
                  Service. They offer free, impartial guidance on all money matters including debt,
                  budgeting, pensions, and savings. Their debt advice locator tool can find free
                  face-to-face debt advice near you.
                </p>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">
                Warning: Avoid Fee-Charging Debt Companies
              </h3>
              <p className="text-white text-sm">
                Some commercial debt management companies charge significant fees for services that
                are available free from the charities above. They may charge an upfront fee and/or
                take a percentage of your monthly debt payment. This means less money goes towards
                clearing your debts, making the process slower and more expensive. If anyone asks
                you to pay for debt advice, look elsewhere. The free services are staffed by equally
                qualified debt advisers.
              </p>
            </div>
          </div>

          {/* ====== SECTION 04 ====== */}
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-blue-400 mr-2">04</span>
              Formal Debt Solutions
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              When debts are too large to clear through budgeting and repayment strategies alone,
              formal solutions may be appropriate. Each has significant implications and should only
              be entered into after taking professional advice (from one of the free services
              above).
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Debt Management Plan (DMP)
                </h3>
                <p className="text-white text-sm mb-3">
                  An informal agreement between you and your creditors to repay debts at a reduced
                  rate you can afford. Not legally binding &mdash; creditors can withdraw at any
                  time, and you can change the arrangement if your circumstances change.
                </p>
                <ul className="space-y-2 mb-3">
                  {[
                    'Free DMPs available through StepChange, PayPlan, and Christians Against Poverty',
                    'You make one monthly payment to the DMP provider, who distributes it to your creditors',
                    'Interest and charges are often frozen (but not guaranteed)',
                    'Stays on your credit file for as long as the DMP is active plus the standard six-year retention period',
                    'Suitable for debts that can be repaid in full within a reasonable timeframe (typically five to ten years)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Individual Voluntary Arrangement (IVA)
                </h3>
                <p className="text-white text-sm mb-3">
                  A legally binding agreement between you and your creditors, supervised by an
                  insolvency practitioner. You make affordable payments for a fixed period (usually
                  five to six years), after which remaining debt is written off.
                </p>
                <ul className="space-y-2 mb-3">
                  {[
                    'Requires approval from creditors holding at least 75% of your total debt value',
                    'Once approved, creditors cannot take further action against you',
                    'Typically involves paying what you can afford over 60 months, with remaining debt written off',
                    'Your name appears on the Insolvency Register (public record) for the duration',
                    'Recorded on your credit file for six years from the start date',
                    'You may be required to remortgage or release equity in your home in year five',
                    'Failure to keep up payments can result in the IVA failing and potentially bankruptcy',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Debt Relief Order (DRO)</h3>
                <p className="text-white text-sm mb-3">
                  A simpler, cheaper alternative to bankruptcy for people with relatively low debts
                  and few assets. After a 12-month moratorium, debts included in the DRO are written
                  off.
                </p>
                <ul className="space-y-2 mb-3">
                  {[
                    'Total debts must be under £30,000',
                    'Disposable income must be under £75 per month',
                    'Total assets must be under £2,000 (vehicle up to £2,000 excluded)',
                    'Application fee: £90 (can be paid in instalments)',
                    'Must be applied for through an approved intermediary (debt advisers at the free services can help)',
                    'Lasts 12 months, after which debts are written off',
                    'Your name appears on the Insolvency Register',
                    'Cannot apply if you have had a DRO in the previous six years',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Bankruptcy</h3>
                <p className="text-white text-sm mb-3">
                  The most serious formal debt solution. You can apply for bankruptcy yourself
                  (through the Insolvency Service) or a creditor owed &pound;5,000 or more can
                  petition for your bankruptcy. Most debts are written off, but there are
                  significant consequences:
                </p>
                <ul className="space-y-2 mb-3">
                  {[
                    'Application fee: £680',
                    'An Official Receiver or trustee takes control of your assets (with some exceptions)',
                    'You may lose your home (though the trustee must deal with your share within three years)',
                    'Your tools of trade are protected if their value is reasonable and necessary for your work',
                    'Bankruptcy typically lasts 12 months, after which you are discharged and debts are written off',
                    'Your name appears on the Insolvency Register for the duration',
                    'Recorded on your credit file for six years from the date of bankruptcy',
                    'You cannot act as a company director during bankruptcy without court permission',
                    'Some professions have restrictions — check whether your professional body or certification scheme has rules about bankruptcy',
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
              <h3 className="text-white font-semibold text-sm mb-2">Important for Electricians</h3>
              <p className="text-white text-sm">
                If you are self-employed and considering bankruptcy, note that your tools of trade
                are protected as essential items. However, your van may or may not be protected
                depending on its value and whether the trustee considers it essential for your work.
                Always take professional advice before applying. An IVA or DRO may be a better
                option that allows you to keep working without disruption.
              </p>
            </div>
          </div>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-3-3-check2"
            question="What is the maximum total debt level for a Debt Relief Order (DRO)?"
            options={['£10,000', '£20,000', '£30,000', '£50,000']}
            correctIndex={2}
            explanation="A DRO is available for total debts under £30,000, with disposable income under £75 per month and total assets under £2,000. It is a simpler and cheaper alternative to bankruptcy for people with lower debt levels."
          />

          {/* ====== SECTION 05 ====== */}
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-purple-400 mr-2">05</span>
              HMRC Time to Pay
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Many self-employed electricians face a common problem: a tax bill arrives that is
              larger than expected, and they do not have the cash to pay it immediately.
              HMRC&rsquo;s Time to Pay (TTP) scheme is specifically designed for this situation.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">How Time to Pay Works</h3>
              <p className="text-white text-sm mb-3">
                Time to Pay allows you to spread your tax bill over an agreed period, typically up
                to 12 months but sometimes longer depending on your circumstances. Key facts:
              </p>
              <ul className="space-y-2">
                {[
                  'Contact the HMRC Payment Support Service on 0300 200 3835 (Monday to Friday 8am to 6pm)',
                  'You need to call before the payment deadline passes — calling after you are already in default is less likely to result in a favourable arrangement',
                  'Have your UTR (Unique Taxpayer Reference) and details of the tax owed ready',
                  'HMRC will ask about your income, expenditure, assets, and other debts',
                  'Interest is charged on the outstanding balance at the current rate (currently 7.5% per annum) — this is still far cheaper than commercial borrowing',
                  'Once a TTP arrangement is agreed, HMRC will not take enforcement action as long as you keep to the agreed payments',
                  'For Self Assessment debts up to £30,000, you can set up a TTP plan online without calling, spreading payments over up to 12 months',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">
                Preventing Tax Bill Surprises
              </h3>
              <p className="text-white text-sm mb-3">
                The best way to avoid needing Time to Pay is to set money aside throughout the year:
              </p>
              <ul className="space-y-2">
                {[
                  'Open a separate savings account specifically for tax',
                  'Transfer 25% to 30% of every invoice payment into this account immediately (this covers Income Tax, National Insurance, and a buffer)',
                  'If VAT-registered, also set aside the VAT element of every invoice in a separate pot',
                  'Use accounting software (FreeAgent, Xero, QuickBooks) that estimates your tax liability in real time',
                  'Review your estimated tax position with your accountant at least quarterly',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Self-Employed Tip</h3>
              <p className="text-white text-sm">
                Remember that your first self-employed tax bill can be a shock because you pay your
                first year&rsquo;s tax plus a &ldquo;payment on account&rdquo; for the following
                year. This means your first Self Assessment bill could be 150% of one year&rsquo;s
                tax. Plan for this from day one of self-employment. If you know you will struggle,
                call HMRC before the deadline &mdash; they are significantly more helpful when you
                are proactive.
              </p>
            </div>
          </div>

          {/* ====== SECTION 06 ====== */}
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-rose-400 mr-2">06</span>
              The Emotional Side of Debt
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Debt is not just a financial problem &mdash; it is an emotional one. The Money and
              Mental Health Policy Institute, founded by Martin Lewis, has published extensive
              research showing a strong link between debt and mental health problems including
              anxiety, depression, and suicidal thoughts.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">
                The Debt-Mental Health Cycle
              </h3>
              <p className="text-white text-sm mb-3">
                Research from the Money and Mental Health Policy Institute shows that:
              </p>
              <ul className="space-y-2">
                {[
                  'People in problem debt are three times more likely to experience a mental health problem',
                  'People with mental health problems are three and a half times more likely to be in problem debt',
                  'Debt-related anxiety can lead to avoidance behaviours — not opening post, ignoring calls — which makes the problem worse',
                  'The construction and trades sector has one of the highest rates of mental health problems and suicide among all UK industries',
                  'Shame and stigma prevent many tradespeople from seeking help, even though debt problems are extremely common',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-white font-semibold text-sm mb-2">Where to Get Support</h3>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    <strong className="text-white">Samaritans:</strong> 116 123 (free, 24 hours,
                    every day). You do not need to be suicidal to call. They are there for anyone
                    struggling with anything, including debt stress.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    <strong className="text-white">Mates in Mind:</strong> A charity specifically
                    focused on mental health in the construction and trades sector. They provide
                    resources, training, and support at matesinmind.org.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    <strong className="text-white">Mind:</strong> 0300 123 3393 (Monday to Friday
                    9am to 6pm). The UK&rsquo;s leading mental health charity provides information,
                    support, and local services.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    <strong className="text-white">Breathing Space (Debt Respite Scheme):</strong>{' '}
                    If you are receiving mental health crisis treatment, you may be eligible for a
                    Breathing Space period &mdash; up to 30 days (or the duration of your crisis
                    treatment plus 30 days) during which creditors cannot contact you, add interest,
                    or take enforcement action. Ask your debt adviser or mental health professional
                    about eligibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">You Are Not Alone</h3>
              <p className="text-white text-sm">
                Debt problems are incredibly common. StepChange helped over 650,000 people in a
                single year. Citizens Advice handles millions of debt enquiries annually. The
                construction industry has some of the highest rates of financial difficulty in the
                UK. Asking for help is not a weakness &mdash; it is the most practical thing you can
                do. Every day you wait, the problem is likely to grow. Every day you take action,
                you are one step closer to being free of it.
              </p>
            </div>
          </div>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-3-3-check3"
            question="Which phone number should a self-employed electrician call to set up a Time to Pay arrangement with HMRC?"
            options={[
              '0800 138 1111 (StepChange)',
              '0300 200 3835 (HMRC Payment Support)',
              '0808 808 4000 (National Debtline)',
              '116 123 (Samaritans)',
            ]}
            correctIndex={1}
            explanation="The HMRC Payment Support Service on 0300 200 3835 handles Time to Pay arrangements. Call before the payment deadline if possible — HMRC is more flexible when you are proactive about your situation."
          />

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Will creditors accept a debt management plan?
                </h3>
                <p className="text-white text-sm">
                  Most creditors will accept a DMP, especially if it is set up through a recognised
                  free provider like StepChange. They are not legally obliged to accept, but in
                  practice most do because they prefer to receive some payment rather than none.
                  Interest and charges are often (but not always) frozen once a DMP is in place.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I get a mortgage after an IVA or bankruptcy?
                </h3>
                <p className="text-white text-sm">
                  Yes, but it will be difficult for the six years the record remains on your credit
                  file, and you will likely need a larger deposit (15% to 25%) and may face higher
                  interest rates. Specialist lenders exist for people with adverse credit histories.
                  After six years, the record drops off and your options improve significantly,
                  especially if you have rebuilt your credit profile in the meantime.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Does bankruptcy mean I lose my tools?
                </h3>
                <p className="text-white text-sm">
                  No. Under the Insolvency Act 1986, &ldquo;tools, books, vehicles and other items
                  of equipment which are necessary for use personally by the bankrupt in his
                  employment, business or vocation&rdquo; are exempt from being claimed by the
                  trustee, provided their combined value is not excessive. Your test instruments,
                  hand tools, and other equipment needed for electrical work should be protected.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What is Breathing Space and how do I qualify?
                </h3>
                <p className="text-white text-sm">
                  Breathing Space (the Debt Respite Scheme) provides two types of protection: a
                  Standard Breathing Space (60 days, available through a debt adviser) and a Mental
                  Health Crisis Breathing Space (lasts the duration of crisis treatment plus 30
                  days). During this period, creditors must pause enforcement action, contact, and
                  interest charges. Ask a free debt adviser about whether you qualify.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            title="Section 3 Quiz: Dealing with Existing Debt"
            questions={[
              {
                id: 1,
                question: 'Which of the following is classified as a priority debt?',
                options: [
                  'Credit card balance',
                  'Personal loan',
                  'Council tax arrears',
                  'Store card debt',
                ],
                correctAnswer: 2,
                explanation:
                  "Council tax is a priority debt because non-payment can ultimately result in imprisonment (via a committal hearing at magistrates' court), bailiff action, and attachment of earnings.",
              },
              {
                id: 2,
                question: 'What is the key difference between the avalanche and snowball methods?',
                options: [
                  'Avalanche targets smallest balance first; snowball targets highest interest first',
                  'Avalanche targets highest interest first; snowball targets smallest balance first',
                  'Avalanche requires professional help; snowball is self-managed',
                  'There is no practical difference between them',
                ],
                correctAnswer: 1,
                explanation:
                  'The avalanche method targets the highest-interest debt first (mathematically optimal), while the snowball method targets the smallest balance first (psychologically motivating through quick wins).',
              },
              {
                id: 3,
                question: 'What is the phone number for StepChange Debt Charity?',
                options: ['0808 808 4000', '0800 138 1111', '0300 200 3835', '116 123'],
                correctAnswer: 1,
                explanation:
                  "StepChange can be reached on 0800 138 1111. They are the UK's largest debt charity and provide free debt advice, budgeting help, and debt management plans.",
              },
              {
                id: 4,
                question: 'What is the maximum debt level for a Debt Relief Order?',
                options: ['£15,000', '£20,000', '£30,000', '£50,000'],
                correctAnswer: 2,
                explanation:
                  'A DRO is available for total debts under £30,000, with disposable income under £75 per month and total assets under £2,000.',
              },
              {
                id: 5,
                question: 'How long does bankruptcy typically last before discharge?',
                options: ['6 months', '12 months', '3 years', '6 years'],
                correctAnswer: 1,
                explanation:
                  'Bankruptcy typically lasts 12 months, after which you are automatically discharged and most debts are written off. However, the record stays on your credit file for six years.',
              },
              {
                id: 6,
                question:
                  'For Self Assessment debts up to what amount can you set up a Time to Pay plan online?',
                options: ['£10,000', '£20,000', '£30,000', '£50,000'],
                correctAnswer: 2,
                explanation:
                  'For Self Assessment debts up to £30,000, you can set up a Time to Pay plan online through your HMRC account, spreading payments over up to 12 months.',
              },
              {
                id: 7,
                question: 'What is the Breathing Space (Debt Respite Scheme) standard period?',
                options: ['30 days', '60 days', '90 days', '12 months'],
                correctAnswer: 1,
                explanation:
                  'A Standard Breathing Space lasts 60 days, during which creditors must pause enforcement action, contact, and interest charges. A Mental Health Crisis Breathing Space lasts longer.',
              },
              {
                id: 8,
                question:
                  'According to the Money and Mental Health Policy Institute, people in problem debt are how many times more likely to experience a mental health problem?',
                options: [
                  'Twice as likely',
                  'Three times as likely',
                  'Five times as likely',
                  'Ten times as likely',
                ],
                correctAnswer: 1,
                explanation:
                  'Research shows people in problem debt are three times more likely to experience a mental health problem, and the relationship is bidirectional — mental health problems also increase the risk of debt.',
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
              <Link to="../pf-module-3-section-4">
                Next: Consumer Rights &amp; Credit
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
