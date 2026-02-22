import { ArrowLeft, FileCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

export default function PFModule3Section4() {
  useSEO({
    title: 'Consumer Rights & Credit | Module 3 Section 4 | Personal Finance & Financial Wellbeing',
    description:
      'Consumer Credit Act, Section 75 protection, bailiff powers, Financial Ombudsman Service, and distance selling rights for UK electricians.',
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
              <span className="text-white text-xs">SECTION 4</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Consumer Rights &amp; Credit
              </h1>
            </div>
            <p className="text-white text-sm sm:text-base">
              Your legal protections when borrowing, buying, and dealing with creditors in the UK
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm">
                UK consumers have powerful legal protections when it comes to credit and purchases.
                The Consumer Credit Act 1974 gives you a 14-day cooling-off period on most credit
                agreements. Section 75 makes your credit card company jointly liable for purchases
                between &pound;100 and &pound;30,000. Bailiffs have strict rules about what they can
                and cannot do. The Financial Ombudsman Service resolves disputes for free.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm">
                Knowing your rights means you can challenge unfair treatment, recover money when
                things go wrong, and protect yourself from aggressive creditors. As an electrician,
                you are both a consumer (buying tools, vehicles, supplies) and potentially a
                business dealing with customers who have their own consumer rights. Understanding
                both sides makes you more effective.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-8">
            <h2 className="text-white font-semibold text-base mb-3">What You&rsquo;ll Learn</h2>
            <ul className="space-y-2">
              {[
                'Explain the key protections of the Consumer Credit Act 1974 including the 14-day cooling-off period',
                'Use Section 75 to hold your credit card company jointly liable for purchases between £100 and £30,000',
                'Know exactly what bailiffs can and cannot do, including tool-of-trade protections',
                'Use the Financial Ombudsman Service to resolve disputes with financial companies for free',
                'Understand distance selling rights under the Consumer Contracts Regulations 2013',
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
              The Consumer Credit Act 1974
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              The Consumer Credit Act 1974 (amended significantly by the Consumer Credit Act 2006)
              is the primary legislation governing credit agreements in the UK. It provides a
              framework of protections that apply to most types of consumer borrowing, from credit
              cards to personal loans to hire purchase agreements.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">14-Day Cooling-Off Period</h3>
                <p className="text-white text-sm mb-3">
                  For most credit agreements signed after 1 February 2011, you have a 14-day right
                  to withdraw without giving a reason. This applies to:
                </p>
                <ul className="space-y-2 mb-3">
                  {[
                    'Personal loans',
                    'Credit cards (from the date the card arrives or you receive the credit agreement, whichever is later)',
                    'Store cards and catalogue credit',
                    'Hire purchase agreements (including van finance)',
                    'Most other regulated credit agreements',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white text-sm">
                  The 14-day clock starts from the day after you sign the credit agreement or the
                  day after you receive your copy of the agreement, whichever is later. To withdraw,
                  you must inform the lender (in writing, by phone, or email). If you have already
                  received the money or goods, you must repay the credit within 30 days of
                  withdrawing. Any interest accrued during those days must also be paid.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Right to Early Repayment</h3>
                <p className="text-white text-sm mb-3">
                  Under the Act, you can repay any regulated credit agreement early, in full or in
                  part. Key rules:
                </p>
                <ul className="space-y-2">
                  {[
                    'The lender must provide a settlement figure within seven working days of your request',
                    'You may be charged up to 28 days of additional interest beyond the settlement date (to cover the notice period)',
                    'For loans over £8,000 with more than 12 months remaining, the lender can charge an early repayment fee of up to 1% of the amount repaid early (or 0.5% if less than 12 months remaining)',
                    'For loans under £8,000, no early repayment fee can be charged',
                    'Mortgages have separate early repayment rules and may have significant exit fees during fixed-rate periods',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Unfair Relationships</h3>
                <p className="text-white text-sm">
                  Section 140A of the Act allows a court to examine whether the relationship between
                  a lender and borrower is &ldquo;unfair&rdquo; to the borrower. This is a broad
                  power that covers unfair interest rates, excessive charges, aggressive lending
                  practices, or any other aspect of the credit relationship. If the court finds the
                  relationship unfair, it can require the lender to repay amounts paid by the
                  borrower, reduce the amount owed, or alter the terms of the agreement. This
                  provision was used extensively in PPI claims and continues to protect borrowers
                  from exploitative lending.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Hire Purchase: Your Rights Before and After the One-Third Point
                </h3>
                <p className="text-white text-sm mb-3">
                  If you have a van or other vehicle on hire purchase, you have specific rights
                  under the Consumer Credit Act:
                </p>
                <ul className="space-y-2">
                  {[
                    'Voluntary termination: once you have paid one-third of the total amount payable (including deposit, payments, and any balloon), you can hand the vehicle back with nothing more to pay (provided it is in reasonable condition)',
                    'Before the one-third point: you can still terminate, but you may be required to pay the difference between what you have paid and the one-third figure',
                    'The lender cannot repossess the vehicle without a court order once you have paid one-third of the total amount (this is called "protected goods")',
                    'If the lender does repossess without a court order after the one-third point, the HP agreement is automatically terminated and you are entitled to a refund of all payments made',
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
              <h3 className="text-white font-semibold text-sm mb-2">Electrician Scenario</h3>
              <p className="text-white text-sm">
                You take HP on a &pound;25,000 van with a &pound;2,500 deposit. Total amount payable
                is &pound;28,000 (including interest). One-third is &pound;9,333. Once you have paid
                &pound;9,333 (your deposit counts), you can hand the van back under voluntary
                termination with nothing more to pay, provided the van is in reasonable condition.
                This can be extremely useful if your circumstances change or you need to downsize.
              </p>
            </div>
          </div>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-3-4-check1"
            question="How many days do you have to withdraw from most credit agreements under the Consumer Credit Act?"
            options={['7 days', '14 days', '28 days', '30 days']}
            correctIndex={1}
            explanation="The Consumer Credit Act provides a 14-day cooling-off period for most regulated credit agreements. You can withdraw without giving a reason, though you must repay any credit received within 30 days."
          />

          {/* ====== SECTION 02 ====== */}
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-amber-400 mr-2">02</span>
              Section 75: Your Secret Weapon
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Section 75 of the Consumer Credit Act 1974 is one of the most powerful consumer
              protections in the world, yet many people are unaware of it. It makes your credit card
              company jointly and severally liable with the seller for any breach of contract or
              misrepresentation on purchases between &pound;100 and &pound;30,000.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">How Section 75 Works</h3>
                <p className="text-white text-sm mb-3">
                  When you pay for something using a credit card (not a debit card, and not BNPL),
                  your credit card company becomes jointly liable with the seller. This means:
                </p>
                <ul className="space-y-2">
                  {[
                    'If the goods are faulty, not as described, or the seller goes bust before delivering, your credit card company must reimburse you',
                    'The claim is against the credit card company, not the seller — so it works even if the seller has gone out of business',
                    'The purchase must be between £100 and £30,000 in value (the single item price, not the total basket)',
                    'You only need to have paid part of the purchase on the credit card — even £1 on the card triggers the full Section 75 protection on the entire item',
                    'There is no time limit for making a Section 75 claim (unlike chargeback, which has strict deadlines)',
                    'It applies to purchases from UK and overseas sellers',
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
                  Section 75 for Electricians: Practical Examples
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="text-white font-semibold text-xs mb-1">Faulty Test Equipment</h4>
                    <p className="text-white text-sm">
                      You buy a &pound;2,500 multifunction tester on your credit card. It develops a
                      fault after three months and the supplier refuses to replace it or has gone
                      into administration. You claim from your credit card company under Section 75,
                      and they must refund you or provide a replacement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="text-white font-semibold text-xs mb-1">
                      Training Course Cancellation
                    </h4>
                    <p className="text-white text-sm">
                      You pay &pound;800 for an inspection and testing course on your credit card.
                      The training provider cancels the course and refuses to refund you. Section 75
                      allows you to claim the full &pound;800 from your credit card company.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="text-white font-semibold text-xs mb-1">The &pound;1 Trick</h4>
                    <p className="text-white text-sm">
                      You want to buy a &pound;500 power tool. You pay &pound;1 on your credit card
                      and the remaining &pound;499 by debit card or cash. Because you used a credit
                      card for part of the purchase, Section 75 covers the entire &pound;500. This
                      is a well-established legal principle confirmed by courts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Section 75 vs Chargeback</h3>
                <p className="text-white text-sm mb-3">
                  Many people confuse Section 75 with chargeback. They are different:
                </p>
                <div className="overflow-x-auto">
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-white text-sm">
                        <strong className="text-white">Section 75:</strong> A legal right under the
                        Consumer Credit Act. Applies to credit cards only. Covers purchases
                        &pound;100 to &pound;30,000. No time limit. The card company is jointly
                        liable in law.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-white text-sm">
                        <strong className="text-white">Chargeback:</strong> A voluntary scheme
                        operated by card networks (Visa, Mastercard). Applies to debit cards and
                        credit cards. No minimum spend. Time limits apply (typically 120 days). The
                        card company asks the seller&rsquo;s bank for the money back &mdash; it is
                        not a legal right.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Pro Tip</h3>
              <p className="text-white text-sm">
                For any purchase over &pound;100, always pay at least part of it on a credit card to
                activate Section 75 protection. This applies to tools, training courses, materials
                from suppliers, and even van deposits paid to dealers. It costs nothing (as long as
                you pay the credit card off) and gives you a powerful safety net if things go wrong.
              </p>
            </div>
          </div>

          {/* ====== SECTION 03 ====== */}
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-green-400 mr-2">03</span>
              Bailiff Powers &amp; Your Rights
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              If debts escalate to the point where bailiffs (officially called &ldquo;enforcement
              agents&rdquo;) become involved, knowing your rights is essential. The Taking Control
              of Goods Regulations 2013 (under the Tribunals, Courts and Enforcement Act 2007)
              strictly limits what bailiffs can do.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">What Bailiffs CANNOT Do</h3>
                <ul className="space-y-2">
                  {[
                    'Force entry on the first visit — they can only enter peacefully (e.g., through an unlocked door). If you do not let them in and all doors and windows are locked, they cannot force their way in on the first visit',
                    'Enter your home between 9pm and 6am — enforcement can only take place during reasonable hours',
                    'Enter if only children (under 16) or vulnerable persons are present',
                    'Use physical force against you or threaten violence',
                    'Take goods belonging to someone else (a partner, housemate, or landlord)',
                    'Take essential household items including a cooker, microwave, fridge, washing machine, table, chairs, beds, and bedding',
                    'Take items that you or a member of your household need for work (tools of trade) up to a combined value of £1,350',
                    'Take a vehicle displaying a valid Blue Badge for disabled persons',
                    'Charge fees that are not prescribed by law',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">What Bailiffs CAN Do</h3>
                <ul className="space-y-2">
                  {[
                    'Enter peacefully through an open or unlocked door on the first visit (they cannot push past you)',
                    'Force entry on subsequent visits if they have previously gained peaceful entry and a "controlled goods agreement" is in place (for most debt types)',
                    'For certain debts — HMRC debts, criminal fines, and forfeiture of a lease — force entry is permitted even on the first visit',
                    'Take goods and sell them at auction to cover the debt plus enforcement costs',
                    'Clamp vehicles (including on the public highway) and remove them for sale',
                    'Charge prescribed fees: £75 for the compliance stage, £235 for the enforcement stage (first visit), and 7.5% of the debt above £1,500',
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
                  Tools of Trade Protection: The &pound;1,350 Rule
                </h3>
                <p className="text-white text-sm mb-3">
                  This is particularly important for electricians. Under the Taking Control of Goods
                  Regulations 2013, regulation 4(3), goods which are &ldquo;items or equipment (for
                  example, tools, books, telephones, computer equipment and vehicles) which are
                  necessary for use personally by the debtor in the debtor&rsquo;s employment,
                  business, trade, profession, study or education&rdquo; are exempt from seizure up
                  to a combined value of &pound;1,350.
                </p>
                <p className="text-white text-sm mb-3">
                  For electricians, this means your basic hand tools, test meters, and other
                  equipment needed for your day-to-day work are protected. However:
                </p>
                <ul className="space-y-2">
                  {[
                    'The £1,350 limit is the combined total, not per item',
                    'If your tools exceed £1,350 in total value, the bailiff can technically take items above that threshold',
                    'A work van may or may not be considered a "tool of trade" depending on the circumstances — if it is essential for your work and its value is reasonable, it should be protected',
                    'Keep an inventory of your tools with their values in case you need to prove the £1,350 exemption',
                    'Items on hire purchase or finance cannot be taken by bailiffs because you do not own them — the finance company does',
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
              <h3 className="text-white font-semibold text-sm mb-2">If a Bailiff Visits</h3>
              <p className="text-white text-sm">
                Stay calm. You do not have to let them in on the first visit (and you usually should
                not). Speak to them through the door or window. Ask for their name, company, and the
                debt they are collecting for. Take note of their ID number. Do not sign a
                &ldquo;controlled goods agreement&rdquo; without understanding what it means (it
                gives them the right to force entry on subsequent visits). Seek advice immediately
                from Citizens Advice (0800 144 8848) or National Debtline (0808 808 4000). If you
                believe the bailiff has acted unlawfully, you can complain to their company and to
                the creditor who instructed them.
              </p>
            </div>
          </div>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-3-4-check2"
            question="Up to what combined value are tools of trade protected from seizure by bailiffs?"
            options={['£500', '£1,000', '£1,350', '£2,500']}
            correctIndex={2}
            explanation="Under the Taking Control of Goods Regulations 2013, tools, equipment, and items necessary for the debtor's employment, business, or trade are exempt from seizure up to a combined value of £1,350."
          />

          {/* ====== SECTION 04 ====== */}
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-blue-400 mr-2">04</span>
              The Financial Ombudsman Service
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              The Financial Ombudsman Service (FOS) is a free, independent service that resolves
              disputes between consumers and financial companies. It covers banks, building
              societies, insurance companies, credit card providers, loan companies, and most other
              financial services businesses regulated by the FCA.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">When to Use the FOS</h3>
                <p className="text-white text-sm mb-3">
                  You can complain to the FOS about any regulated financial product or service,
                  including:
                </p>
                <ul className="space-y-2">
                  {[
                    'A bank or building society has treated you unfairly',
                    'A credit card company has rejected a valid Section 75 claim',
                    'An insurance company has refused a claim without good reason',
                    'A lender has charged unfair fees or interest',
                    'A financial company has made errors on your account',
                    'You have been mis-sold a financial product (PPI, insurance, an unsuitable loan)',
                    'Your complaint to the company directly has not been resolved to your satisfaction',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">The Complaint Process</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        Complain to the Company First
                      </p>
                      <p className="text-white text-sm">
                        You must give the financial company a chance to resolve your complaint
                        directly. Write to their complaints department (not just customer service)
                        and clearly state the problem, what has gone wrong, and what you want them
                        to do about it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Wait Eight Weeks</p>
                      <p className="text-white text-sm">
                        The company has eight weeks to issue a &ldquo;final response.&rdquo; If they
                        do not respond within eight weeks, or you are unhappy with their final
                        response, you can escalate to the FOS.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Contact the FOS</p>
                      <p className="text-white text-sm">
                        You have six months from the company&rsquo;s final response to bring your
                        complaint to the FOS. You can submit your complaint online at
                        financial-ombudsman.org.uk, by phone on 0800 023 4567, or by post.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-400 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        Investigation &amp; Decision
                      </p>
                      <p className="text-white text-sm">
                        An adjudicator will review the case and make an initial recommendation. If
                        either party disagrees, an ombudsman makes a final decision. The
                        ombudsman&rsquo;s decision is binding on the company (if you accept it) but
                        not on you &mdash; you can still take the matter to court if you prefer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">What the FOS Can Award</h3>
                <p className="text-white text-sm mb-3">
                  The FOS can award up to &pound;430,000 (for complaints about actions on or after 1
                  April 2024) in compensation, including:
                </p>
                <ul className="space-y-2">
                  {[
                    "Refund of money lost due to the company's error or unfair treatment",
                    'Compensation for distress and inconvenience (typically £100 to £500 for moderate cases)',
                    'Interest on money you were deprived of',
                    'Direction to correct errors on your credit file',
                    "Direction to change the company's handling of your account",
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
              <h3 className="text-white font-semibold text-sm mb-2">Completely Free</h3>
              <p className="text-white text-sm">
                The FOS is entirely free for consumers. The financial company pays a case fee to the
                FOS (currently &pound;750 per case after a set number of free cases), which is a
                strong incentive for them to resolve your complaint before it reaches the ombudsman.
                Mention in your complaint letter to the company that you will escalate to the FOS if
                not resolved &mdash; this often accelerates a resolution.
              </p>
            </div>
          </div>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-3-4-check3"
            question="How long must you wait for a company's final response before you can take your complaint to the Financial Ombudsman Service?"
            options={['4 weeks', '6 weeks', '8 weeks', '12 weeks']}
            correctIndex={2}
            explanation="Financial companies have eight weeks to issue a 'final response' to your complaint. If they do not respond within this period, or you are unhappy with their response, you can escalate to the Financial Ombudsman Service."
          />

          {/* ====== SECTION 05 ====== */}
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-purple-400 mr-2">05</span>
              Consumer Contracts Regulations 2013: Distance Selling Rights
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations
              2013 replaced the older Distance Selling Regulations. They protect you when you buy
              goods or services online, by phone, or through any other &ldquo;distance&rdquo;
              channel where you do not physically inspect the goods before purchasing.
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">14-Day Cancellation Right</h3>
                <p className="text-white text-sm mb-3">
                  For most distance purchases, you have a 14-day cancellation period. The clock
                  starts:
                </p>
                <ul className="space-y-2 mb-3">
                  {[
                    'For goods: the day after you receive them (or the last item in a multi-item order)',
                    'For services: the day after the contract is made',
                    'For digital content: the day after the contract is made (but see exceptions below)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 text-sm font-bold mt-0.5">&bull;</span>
                      <span className="text-white text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white text-sm">
                  You do not need to give a reason for cancelling. The seller must refund you within
                  14 days of receiving the goods back (or receiving evidence that you have sent them
                  back). The refund must include the original delivery cost (but only at the basic
                  rate &mdash; not express delivery if you chose that option).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Exceptions to the 14-Day Rule
                </h3>
                <p className="text-white text-sm mb-3">
                  Some purchases are not covered by the 14-day cancellation right:
                </p>
                <ul className="space-y-2">
                  {[
                    'Sealed goods that have been unsealed and cannot be returned for hygiene reasons',
                    'Goods made to your specifications or clearly personalised',
                    'Sealed audio, video, or software that has been unsealed',
                    'Newspapers, magazines, and periodicals',
                    'Goods that deteriorate or expire rapidly (perishables)',
                    'Services that have been fully performed (with your consent) before the cancellation period expires',
                    'Digital content downloads once downloading has begun (if you gave consent and acknowledged losing your cancellation right)',
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
                  Relevance for Electricians
                </h3>
                <p className="text-white text-sm mb-3">
                  As an electrician, you are both protected by these regulations (when you buy
                  online) and potentially affected by them (if customers hire you remotely):
                </p>
                <ul className="space-y-2">
                  {[
                    'Buying tools online: if you order a tool from a website and it is not suitable, you have 14 days from delivery to return it for a full refund',
                    'Ordering materials online: if you order cables, accessories, or components online, you can return unused items within 14 days — but cut-to-length cable or special-order items may be excluded as "personalised"',
                    'Your customers booking you online: if a customer books your services through a website, they may have a 14-day cancellation right. Once you start work, the cancellation right can be waived with their explicit consent',
                    'Online training courses: you can cancel within 14 days of purchase, unless you have started the course and consented to losing your cancellation right',
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
              <h3 className="text-white font-semibold text-sm mb-2">
                If the Seller Does Not Inform You of Your Rights
              </h3>
              <p className="text-white text-sm">
                If a seller fails to tell you about your 14-day cancellation right before you make
                the purchase, the cancellation period extends to 12 months from the original
                deadline. This is a significant penalty for non-compliance and is particularly
                relevant when buying from smaller online suppliers who may not have clear terms and
                conditions. Keep a record of the information you were (or were not) given at the
                time of purchase.
              </p>
            </div>
          </div>

          {/* ====== SECTION 06 ====== */}
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              <span className="text-rose-400 mr-2">06</span>
              Other Consumer Protections Worth Knowing
            </h2>

            <p className="text-white text-sm sm:text-base mb-4">
              Beyond the major protections above, several other legal rights are worth knowing as
              both a consumer and a tradesperson:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Consumer Rights Act 2015</h3>
                <p className="text-white text-sm">
                  This Act sets out your rights when buying goods, services, or digital content.
                  Goods must be of satisfactory quality, fit for purpose, and as described. If they
                  are not, you have a 30-day right to reject for a full refund, followed by a right
                  to repair or replacement, and ultimately a right to a price reduction or final
                  rejection. For services, the work must be carried out with reasonable care and
                  skill, within a reasonable time, and for a reasonable price (if not agreed in
                  advance).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Unfair Terms in Consumer Contracts
                </h3>
                <p className="text-white text-sm">
                  Under the Consumer Rights Act 2015 (Part 2), a term in a consumer contract is
                  unfair if it creates a significant imbalance in the parties&rsquo; rights and
                  obligations to the detriment of the consumer. Unfair terms are not binding. This
                  can apply to excessive cancellation fees, one-sided penalty clauses, or terms that
                  allow the business to change the contract unilaterally without good reason.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  The Right to a Written Credit Agreement
                </h3>
                <p className="text-white text-sm">
                  Under the Consumer Credit Act, you have the right to receive a copy of your credit
                  agreement. If you request a copy of any credit agreement (under section 77 for
                  fixed-sum credit or section 78 for running-account credit), the lender must
                  provide it within 12 working days. If they fail to do so, they cannot enforce the
                  agreement until they comply. This right has been used successfully to challenge
                  old or poorly documented debts.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">Statute-Barred Debts</h3>
                <p className="text-white text-sm">
                  Under the Limitation Act 1980, most unsecured debts in England and Wales become
                  &ldquo;statute-barred&rdquo; after six years from the date of your last payment or
                  written acknowledgement of the debt. After this point, the creditor cannot take
                  you to court to recover the money, though the debt still technically exists. In
                  Scotland, the equivalent period is five years under the Prescription and
                  Limitation (Scotland) Act 1973. Be cautious: making a payment or acknowledging the
                  debt in writing restarts the clock.
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
                  Does Section 75 apply if I use a debit card?
                </h3>
                <p className="text-white text-sm">
                  No. Section 75 only applies to credit cards. However, if you paid by debit card,
                  you can use the chargeback process through your bank. Chargeback is a voluntary
                  scheme operated by Visa and Mastercard (not a legal right), but it can be
                  effective for recovering money from faulty purchases. There is no minimum spend
                  for chargeback, but strict time limits apply (typically 120 days).
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can bailiffs take my work van?
                </h3>
                <p className="text-white text-sm">
                  It depends on the circumstances. If the van is essential for your work and its
                  value falls within the &pound;1,350 tools-of-trade exemption, it should be
                  protected. However, if the van is worth significantly more than &pound;1,350 and a
                  cheaper vehicle could serve the same purpose, a bailiff might argue that the
                  specific van is not exempt. If the van is on HP or finance, bailiffs cannot take
                  it because you do not own it. Seek advice from Citizens Advice if a bailiff
                  threatens to take your van.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How do I make a Section 75 claim?
                </h3>
                <p className="text-white text-sm">
                  Contact your credit card company (not the seller) and tell them you want to make a
                  claim under Section 75 of the Consumer Credit Act 1974. Explain what you bought,
                  what went wrong, and what you want them to do. Provide evidence (receipts, photos,
                  correspondence with the seller). If they reject your claim, escalate to the
                  Financial Ombudsman Service. There are no forms to fill in &mdash; a phone call or
                  letter is sufficient to start the process.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  I ordered tools online and they are not what was described. What are my rights?
                </h3>
                <p className="text-white text-sm">
                  You have multiple layers of protection. Under the Consumer Rights Act 2015, the
                  goods must be as described &mdash; if they are not, you have a 30-day right to
                  reject for a full refund. Under the Consumer Contracts Regulations 2013, you have
                  a 14-day cancellation right for any reason (even if the goods are fine). If you
                  paid by credit card and the purchase was over &pound;100, you can also claim under
                  Section 75. Use whichever route is quickest and easiest for your situation.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            title="Section 4 Quiz: Consumer Rights & Credit"
            questions={[
              {
                id: 1,
                question:
                  'What is the cooling-off period for most credit agreements under the Consumer Credit Act 1974?',
                options: ['7 days', '14 days', '28 days', '30 days'],
                correctAnswer: 1,
                explanation:
                  'The Consumer Credit Act provides a 14-day right to withdraw from most regulated credit agreements without giving a reason.',
              },
              {
                id: 2,
                question:
                  'Section 75 of the Consumer Credit Act makes your credit card company jointly liable for purchases between what values?',
                options: ['£50 and £10,000', '£100 and £30,000', '£250 and £50,000', 'Any amount'],
                correctAnswer: 1,
                explanation:
                  'Section 75 applies to credit card purchases where the single item value is between £100 and £30,000. The card company becomes jointly and severally liable with the seller.',
              },
              {
                id: 3,
                question: 'Can bailiffs force entry into your home on their first visit?',
                options: [
                  'Yes, for any debt',
                  'Yes, but only with a court order',
                  'No — they can only enter peacefully on the first visit',
                  'No — they can never enter your home',
                ],
                correctAnswer: 2,
                explanation:
                  'On the first visit, bailiffs can only enter peacefully (e.g., through an unlocked door). They cannot force entry on the first visit for most debt types. Exceptions exist for HMRC debts and criminal fines.',
              },
              {
                id: 4,
                question:
                  'What is the combined value limit for the tools-of-trade exemption from bailiff seizure?',
                options: ['£500', '£1,000', '£1,350', '£2,000'],
                correctAnswer: 2,
                explanation:
                  "Under the Taking Control of Goods Regulations 2013, items necessary for the debtor's work are exempt from seizure up to a combined value of £1,350.",
              },
              {
                id: 5,
                question:
                  'How long does a financial company have to issue a final response to your complaint before you can go to the Financial Ombudsman?',
                options: ['4 weeks', '6 weeks', '8 weeks', '12 weeks'],
                correctAnswer: 2,
                explanation:
                  'Financial companies have eight weeks to issue a final response. After that, or if you are unhappy with the response, you can escalate to the Financial Ombudsman Service.',
              },
              {
                id: 6,
                question:
                  'Under the Consumer Contracts Regulations 2013, how many days do you have to cancel an online purchase?',
                options: ['7 days', '14 days', '21 days', '30 days'],
                correctAnswer: 1,
                explanation:
                  'You have 14 days to cancel a distance purchase without giving a reason. The clock starts the day after you receive the goods.',
              },
              {
                id: 7,
                question:
                  'At what point in a hire purchase agreement do the goods become "protected" from repossession without a court order?',
                options: [
                  'After the first payment',
                  'After one-quarter has been paid',
                  'After one-third has been paid',
                  'After one-half has been paid',
                ],
                correctAnswer: 2,
                explanation:
                  'Once you have paid one-third of the total amount payable under a hire purchase agreement, the goods become "protected" and cannot be repossessed without a court order.',
              },
              {
                id: 8,
                question:
                  'What happens if a seller does not inform you of your 14-day cancellation right for a distance purchase?',
                options: [
                  'The right is waived',
                  'The cancellation period extends to 30 days',
                  'The cancellation period extends to 12 months',
                  'The seller must pay a fine',
                ],
                correctAnswer: 2,
                explanation:
                  'If the seller fails to inform you of your 14-day cancellation right, the period extends to 12 months from the original deadline. This is a significant penalty for non-compliance.',
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
              <Link to="../pf-module-4">
                Next: Module 4 &mdash; Pensions &amp; Retirement Planning
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
