import { ArrowLeft, ArrowLeftRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-2-3-check1',
    question:
      'Why is it important to separate business and personal finances as a self-employed tradesperson?',
    options: [
      'It is a legal requirement for all sole traders to have a business bank account',
      'It simplifies tax reporting, provides legal protection, and prevents accidentally spending tax money',
      'Banks offer higher interest rates on business accounts',
      'HMRC will refuse your Self Assessment if you use a personal account for business',
    ],
    correctIndex: 1,
    explanation:
      'While sole traders are not legally required to have a separate business bank account, separation is strongly recommended for practical reasons: it massively simplifies record-keeping for Self Assessment and Making Tax Digital, prevents tax money being accidentally spent on personal items, provides clearer evidence of business expenses if HMRC investigates, and creates a psychological boundary between &ldquo;business money&rdquo; and &ldquo;my money&rdquo;.',
  },
  {
    id: 'pf-2-3-check2',
    question:
      'Under Making Tax Digital for Income Tax, how often will self-employed individuals need to submit financial updates to HMRC?',
    options: [
      'Once a year with the Self Assessment return',
      'Every 6 months',
      'Quarterly (every 3 months), plus an end-of-year declaration',
      'Monthly',
    ],
    correctIndex: 2,
    explanation:
      'Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) requires self-employed individuals and landlords with qualifying income above &pound;50,000 (from April 2026) to submit quarterly updates of income and expenses to HMRC using compatible software, plus a final end-of-period statement and declaration. Those earning above &pound;30,000 will follow from April 2027.',
  },
  {
    id: 'pf-2-3-check3',
    question:
      'Under the Late Payment of Commercial Debts (Interest) Act 1998, what is the statutory interest rate a business can charge on overdue invoices?',
    options: [
      '2% above the Bank of England base rate',
      '5% above the Bank of England base rate',
      '8% above the Bank of England base rate',
      '10% flat rate',
    ],
    correctIndex: 2,
    explanation:
      'The Late Payment of Commercial Debts (Interest) Act 1998 gives businesses the statutory right to charge interest at 8% above the Bank of England base rate on invoices that are not paid on time. Additionally, businesses can claim a fixed compensation amount: &pound;40 for debts up to &pound;999.99, &pound;70 for debts between &pound;1,000 and &pound;9,999.99, and &pound;100 for debts of &pound;10,000 or more.',
  },
];

const faqs = [
  {
    question: 'Am I legally required to have a separate business bank account as a sole trader?',
    answer:
      'No. Unlike limited companies, sole traders have no legal obligation to maintain a separate business bank account. However, HMRC strongly recommends it, and in practice it makes your life significantly easier. Mixed personal and business transactions in a single account create a record-keeping nightmare &mdash; you have to identify and categorise every single transaction as business or personal, which is time-consuming and error-prone. A separate business account means all business transactions are in one place, making Self Assessment and MTD compliance far simpler.',
  },
  {
    question: 'How long do I need to keep business records for tax purposes?',
    answer:
      'HMRC requires you to keep records for at least 5 years after the 31 January submission deadline of the relevant tax year. For example, for the 2024/25 tax year (filed by 31 January 2026), you must keep records until at least 31 January 2031. In practice, this means keeping records for approximately 5 years and 10 months from the end of the tax year. If HMRC opens an enquiry into your return, you may need records for longer. Digital records stored in accounting software or cloud storage are perfectly acceptable.',
  },
  {
    question: 'What happens when I reach the VAT threshold?',
    answer:
      'From April 2024, the VAT registration threshold is &pound;90,000. If your taxable turnover (not profit) exceeds &pound;90,000 in any rolling 12-month period, or you expect it to exceed &pound;90,000 in the next 30 days alone, you must register for VAT. Once registered, you charge VAT on your invoices (usually 20%) and submit quarterly VAT returns. You can also reclaim VAT on business purchases. Some tradespeople voluntarily register below the threshold to reclaim VAT on tools and materials, but this adds administrative burden. Speak to an accountant before making this decision.',
  },
  {
    question: 'What is the best free business bank account for a sole-trader electrician?',
    answer:
      'As of 2024, the most popular free business accounts among sole traders are Starling Business (truly free with no monthly fees, unlimited UK transactions, and excellent Spaces feature for ring-fencing tax money), Mettle by NatWest (free, integrates with FreeAgent accounting software at no extra cost), and Tide (free plan available with invoicing features built in). The best choice depends on your priorities: Starling for overall banking experience, Mettle for free accounting software, or Tide for integrated invoicing. All three support Making Tax Digital.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is the strongest reason to separate business and personal finances?',
    options: [
      'Business bank accounts pay higher interest',
      'It is a legal requirement for all self-employed people',
      'It simplifies tax reporting, protects tax money, and supports MTD compliance',
      'HMRC will reject your tax return if you use a personal account',
    ],
    correctAnswer: 2,
    explanation:
      'While sole traders are not legally required to have a separate business account, the practical benefits are overwhelming: simplified record-keeping for Self Assessment and MTD, protection of tax money from accidental spending, clearer evidence of business expenses, and a psychological boundary between business and personal money.',
  },
  {
    id: 2,
    question:
      'Which business bank account offers free integration with FreeAgent accounting software?',
    options: ['Starling Business', 'Monzo Business', 'Mettle by NatWest', 'Tide'],
    correctAnswer: 2,
    explanation:
      'Mettle by NatWest includes a free FreeAgent subscription with every business account. FreeAgent is one of the most popular accounting packages among UK sole traders, so this integration provides significant value &mdash; FreeAgent normally costs around &pound;35 per month.',
  },
  {
    id: 3,
    question: 'How long must a sole trader keep business records for HMRC purposes?',
    options: [
      '1 year after the end of the tax year',
      '3 years after the Self Assessment deadline',
      'At least 5 years after the 31 January submission deadline of the relevant tax year',
      '10 years from the date of each transaction',
    ],
    correctAnswer: 2,
    explanation:
      'HMRC requires records to be kept for at least 5 years after the 31 January submission deadline. For the 2024/25 tax year (deadline 31 January 2026), records must be kept until at least 31 January 2031 &mdash; approximately 5 years and 10 months from the end of the tax year itself.',
  },
  {
    id: 4,
    question: 'What is the VAT registration threshold from April 2024?',
    options: [
      '&pound;50,000 taxable turnover',
      '&pound;85,000 taxable turnover',
      '&pound;90,000 taxable turnover',
      '&pound;100,000 taxable turnover',
    ],
    correctAnswer: 2,
    explanation:
      'The VAT registration threshold increased to &pound;90,000 from April 2024 (previously &pound;85,000). This is based on taxable turnover, not profit. You must register if your turnover exceeds &pound;90,000 in any rolling 12-month period, or if you expect it to exceed &pound;90,000 in the next 30 days alone.',
  },
  {
    id: 5,
    question:
      'Under the Late Payment of Commercial Debts Act, what fixed compensation can you claim on a debt of &pound;5,000?',
    options: ['&pound;20', '&pound;40', '&pound;70', '&pound;100'],
    correctAnswer: 2,
    explanation:
      'The fixed compensation amounts under the Act are: &pound;40 for debts up to &pound;999.99, &pound;70 for debts between &pound;1,000 and &pound;9,999.99, and &pound;100 for debts of &pound;10,000 or more. A &pound;5,000 debt falls in the middle band, so the fixed compensation is &pound;70 in addition to the statutory interest of 8% above the Bank of England base rate.',
  },
  {
    id: 6,
    question:
      'When will Making Tax Digital for Income Tax apply to self-employed individuals earning above &pound;50,000?',
    options: ['April 2024', 'April 2025', 'April 2026', 'April 2028'],
    correctAnswer: 2,
    explanation:
      'MTD for Income Tax Self Assessment will apply from April 2026 for self-employed individuals and landlords with qualifying income above &pound;50,000. Those with income above &pound;30,000 will join from April 2027. The threshold for smaller businesses has not yet been confirmed.',
  },
  {
    id: 7,
    question: 'What is the recommended weekly admin habit for a self-employed tradesperson?',
    options: [
      '5 minutes every morning checking bank balances',
      '30 minutes on Friday afternoon reviewing invoices, expenses, and records',
      '2 hours every Saturday doing a full financial review',
      'No regular schedule &mdash; do it all at year end',
    ],
    correctAnswer: 1,
    explanation:
      'A 30-minute weekly admin session on Friday afternoon is the recommended habit. This includes: reviewing outstanding invoices and chasing late payments, logging expenses and photographing receipts, reconciling bank transactions, sending any new invoices, and checking your cash flow position for the following week. This small investment prevents the year-end panic of trying to reconstruct 12 months of records.',
  },
  {
    id: 8,
    question:
      'What is the standard payment term that should appear on a trade invoice unless otherwise agreed?',
    options: [
      '7 days from invoice date',
      '14 days from invoice date',
      '30 days from invoice date',
      '60 days from invoice date',
    ],
    correctAnswer: 2,
    explanation:
      'The standard payment term in UK business is 30 days from the invoice date, unless a shorter or longer term has been agreed in writing before work begins. Under the Late Payment Act, if no payment terms are specified, the default is 30 days. Many tradespeople negotiate shorter terms (7 or 14 days) for domestic customers, and some require payment on completion for smaller jobs.',
  },
];

export default function PFModule2Section3() {
  useSEO({
    title: 'Business vs Personal Finances | Personal Finance Module 2.3',
    description:
      'Why separation matters, business banking, record-keeping for Making Tax Digital, invoicing, Late Payment Act rights, and VAT threshold awareness for self-employed electricians.',
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
            <ArrowLeftRight className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Business vs Personal Finances
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why separating business and personal money is essential, free business banking options,
            record-keeping for Making Tax Digital, and your legal rights on late payment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Separate:</strong> Business money and personal money must never mix
              </li>
              <li>
                <strong>MTD:</strong> Quarterly digital updates from April 2026 (&pound;50k+)
              </li>
              <li>
                <strong>Records:</strong> Keep everything for 5 years + 10 months
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Free banking:</strong> Starling, Mettle, and Tide all offer &pound;0/month
              </li>
              <li>
                <strong>Late payment:</strong> You can charge 8% + BoE base rate by law
              </li>
              <li>
                <strong>VAT threshold:</strong> &pound;90,000 turnover from April 2024
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why separating business and personal finances is essential',
              'Choose a free business bank account suited to your needs',
              'Describe the record-keeping requirements for Self Assessment and MTD',
              'Establish a weekly admin habit for financial record-keeping',
              'Know your rights under the Late Payment of Commercial Debts Act',
              'Understand the VAT registration threshold and its implications',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Separation Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Why Separation Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When you are employed, your employer handles the financial separation for you: your
                salary arrives in your personal account after tax and NI have been deducted, and you
                never see the business side of the equation. When you become self-employed, the
                entire amount lands in one place &mdash; and it is far too easy to treat it all as
                personal income.
              </p>

              <p>
                Mixing business and personal finances is the single most common financial mistake
                made by newly self-employed tradespeople. It creates four serious problems:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Four Problems of Mixed Finances
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">1. Tax confusion:</strong> When business and
                      personal transactions are mixed in one account, identifying allowable business
                      expenses becomes a nightmare. You spend hours at year end going through
                      hundreds of transactions trying to remember which were business and which were
                      personal. This wastes time and risks missing legitimate expenses (costing you
                      money) or claiming personal items (risking an HMRC penalty)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">2. Tax money erosion:</strong> If your tax
                      provision sits in the same account as your spending money, it will inevitably
                      get spent. A few &pound;50 here, a tool purchase there, and by January your
                      tax fund is hundreds of pounds short. Separation makes the tax money invisible
                      to daily spending decisions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-blue-400">3. MTD non-compliance:</strong> Making Tax
                      Digital requires quarterly submissions of income and expenses. If your records
                      are a jumble of personal and business transactions, producing accurate
                      quarterly reports is extremely difficult. Separate accounts make MTD
                      compliance almost automatic
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">4. Psychological blurring:</strong> When
                      business and personal money are mixed, you lose track of how your business is
                      actually performing. Is the business profitable? Are your margins healthy? Is
                      your pricing right? These questions become impossible to answer when personal
                      spending is tangled with business cash flow
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important Clarification:</strong> Sole traders
                  are <strong>not legally required</strong> to have a separate business bank
                  account. Unlike limited companies (which are separate legal entities and must have
                  their own account), sole traders and the business are legally the same person.
                  However, HMRC strongly recommends separation, and every accountant will tell you
                  it is essential. The legal requirement is not the point &mdash; the practical
                  benefits are overwhelming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Free Business Banking Options */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Free Business Banking Options
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common excuses for not separating finances is the cost of a business
                bank account. Traditional high-street banks charge &pound;5&ndash;&pound;15 per
                month for business accounts, with additional transaction fees. But the rise of
                digital challenger banks has eliminated this barrier entirely &mdash; several
                excellent business accounts are now completely free.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Free Business Account Comparison
                </p>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Starling Business</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Monthly fee:</strong> &pound;0
                      </li>
                      <li>
                        &bull; <strong>UK payments:</strong> Unlimited free transfers and direct
                        debits
                      </li>
                      <li>
                        &bull; <strong>Standout feature:</strong> Spaces &mdash; create named
                        sub-accounts for tax, VAT, and savings within one account
                      </li>
                      <li>
                        &bull; <strong>Integrations:</strong> Xero, QuickBooks, FreeAgent
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Overall banking experience and
                        ring-fencing tax money
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">Mettle by NatWest</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Monthly fee:</strong> &pound;0
                      </li>
                      <li>
                        &bull; <strong>UK payments:</strong> Unlimited free transfers
                      </li>
                      <li>
                        &bull; <strong>Standout feature:</strong> Free FreeAgent subscription
                        included (normally &pound;35/month)
                      </li>
                      <li>
                        &bull; <strong>Integrations:</strong> FreeAgent (built-in), plus open
                        banking
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Sole traders who want free accounting
                        software bundled in
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-1">Tide</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Monthly fee:</strong> &pound;0 (Free plan)
                      </li>
                      <li>
                        &bull; <strong>UK payments:</strong> 20 free transfers per month (then
                        &pound;0.20 each)
                      </li>
                      <li>
                        &bull; <strong>Standout feature:</strong> Built-in invoicing tool with
                        automatic payment matching
                      </li>
                      <li>
                        &bull; <strong>Integrations:</strong> Xero, Sage, QuickBooks, FreeAgent
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Tradespeople who want invoicing and
                        banking in one app
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                All three of these accounts can be opened online in under 10 minutes with just your
                name, address, and National Insurance number. There is no credit check and no
                minimum balance requirement. If cost was your reason for not separating finances,
                that excuse is now gone.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Our Recommendation:</strong> If you want one
                  account that does everything, Starling Business is the most polished option. If
                  you want free accounting software included, Mettle with FreeAgent is outstanding
                  value. If you want invoicing built into your banking app, Tide is the best choice.
                  You cannot go wrong with any of them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Record-Keeping for MTD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Record-Keeping for Self Assessment &amp; Making Tax Digital
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Good record-keeping is not optional &mdash; it is a legal requirement. HMRC can
                request to see your business records at any time, and failure to keep adequate
                records can result in penalties of up to &pound;3,000. More practically, poor
                records cost you money: you miss allowable expenses, overpay tax, and spend hours at
                year end trying to reconstruct 12 months of transactions from memory.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What Records You Must Keep</p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>All income:</strong> Invoices issued, cash received, bank credits
                      &mdash; every pound that comes in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>All expenses:</strong> Receipts, invoices received, bank debits
                      &mdash; every pound that goes out for business purposes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Bank statements:</strong> Monthly statements for all business accounts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Mileage records:</strong> If claiming vehicle costs based on mileage
                      (45p per mile for the first 10,000 miles, 25p thereafter)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Capital purchases:</strong> Receipts for tools, equipment, vehicles
                      &mdash; items that qualify for capital allowances
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Retention Period:</strong> All records must be
                  kept for at least{' '}
                  <strong>5 years after the 31 January submission deadline</strong> of the relevant
                  tax year. For the 2024/25 tax year (Self Assessment deadline 31 January 2026),
                  records must be kept until at least 31 January 2031. This works out to
                  approximately <strong>5 years and 10 months</strong> from the end of the tax year.
                </p>
              </div>

              <p>
                <strong>Making Tax Digital for Income Tax (MTD for ITSA)</strong> is the biggest
                change to self-employed tax reporting in decades. From April 2026, self-employed
                individuals and landlords with qualifying income above &pound;50,000 must:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">MTD Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Keep digital records of all business income and expenses using MTD-compatible
                      software
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Submit quarterly updates to HMRC (every 3 months) summarising income and
                      expenses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Submit an End of Period Statement (EOPS) after the end of the tax year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Submit a Final Declaration confirming the information is complete and correct
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Those earning above &pound;30,000 will follow from April 2027. If you are not yet in
                scope, now is the ideal time to establish good digital record-keeping habits so that
                the transition is seamless when your turn arrives.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: The Weekly Admin Habit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The Weekly Admin Habit
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The difference between tradespeople who find Self Assessment straightforward and
                those who find it agonising comes down to one habit:{' '}
                <strong>30 minutes of admin every Friday afternoon</strong>. This single habit
                transforms year-end accounting from a stressful marathon into a quick review.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Friday 30-Minute Routine</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minutes 1&ndash;5:</strong> Log into your
                      business bank account. Review all transactions from the past week. Flag
                      anything you do not recognise
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minutes 5&ndash;10:</strong> Photograph or scan
                      any paper receipts from the week. Upload them to your accounting software or
                      receipt app. Discard the originals (the digital copy is the record)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minutes 10&ndash;15:</strong> Categorise any
                      uncategorised expenses in your accounting software (materials, fuel, tools,
                      insurance, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minutes 15&ndash;20:</strong> Send any
                      outstanding invoices for work completed this week. Check the status of unpaid
                      invoices and send reminders for any that are overdue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minutes 20&ndash;25:</strong> Check your tax
                      account balance against your expected tax liability. Make any additional
                      transfers if payments received this week have not yet been provisioned
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minutes 25&ndash;30:</strong> Quick review of
                      next week&rsquo;s schedule. Note any material purchases needed and confirm
                      budget availability in the business account
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why Friday Afternoon:</strong> By Friday, the
                  week&rsquo;s work is done and the transactions are fresh in your mind. You can
                  categorise expenses accurately because you remember what they were for. Wait until
                  year end and you will be staring at a &pound;47.50 Toolstation purchase from March
                  trying to remember whether it was cable, accessories, or a personal item. Friday
                  afternoons also tend to be wind-down time &mdash; you are unlikely to lose a
                  productive billable hour.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Invoicing and Late Payment Rights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Invoicing &amp; Late Payment Rights
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Getting paid on time is one of the biggest challenges for self-employed
                tradespeople. Late payment is not just an inconvenience &mdash; it directly impacts
                your cash flow, tax provision, and financial stability. The good news is that UK law
                gives you strong rights to chase late payments, including the right to charge
                interest and claim compensation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Every Invoice Should Include
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Your business name and contact details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Customer name and address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>A unique invoice number (sequential)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Invoice date and due date (e.g., &ldquo;Payment due within 30 days&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Clear description of work completed and materials supplied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Total amount due (with VAT shown separately if VAT-registered)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>Your bank details for payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      Your payment terms and a reference to the Late Payment Act if desired
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    The Late Payment of Commercial Debts (Interest) Act 1998:
                  </strong>{' '}
                  This Act gives every business &mdash; including sole traders &mdash; the statutory
                  right to charge interest on late payments at{' '}
                  <strong>8% above the Bank of England base rate</strong>. You can also claim fixed
                  compensation: <strong>&pound;40</strong> on debts up to &pound;999.99,{' '}
                  <strong>&pound;70</strong> on debts between &pound;1,000 and &pound;9,999.99, and{' '}
                  <strong>&pound;100</strong> on debts of &pound;10,000 or more. These rights apply
                  automatically &mdash; you do not need to include them in your contract, although
                  doing so serves as a reminder to customers.
                </p>
              </div>

              <p>
                <strong>Practical late payment strategy:</strong> Most tradespeople are reluctant to
                charge interest because they fear losing the customer relationship. A more effective
                approach is a structured chase sequence:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Late Payment Chase Sequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Day 1 overdue:</strong> Friendly reminder email or text &mdash;
                      &ldquo;Just a reminder that invoice #123 was due yesterday&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Day 7 overdue:</strong> Phone call &mdash; polite but direct.
                      &ldquo;When can I expect payment?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Day 14 overdue:</strong> Formal letter stating the outstanding amount
                      and referencing the Late Payment Act
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Day 30 overdue:</strong> Letter before action &mdash; final demand
                      before legal proceedings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Day 45+ overdue:</strong> Small claims court (Money Claim Online) for
                      debts under &pound;10,000 &mdash; fee starts at &pound;35
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: VAT Threshold Awareness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            VAT Threshold Awareness
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The VAT registration threshold is one of the most important numbers for any growing
                trade business. From April 2024, the threshold is{' '}
                <strong>&pound;90,000 of taxable turnover</strong> in any rolling 12-month period.
                Turnover means the total amount you invoice, not your profit &mdash; this is a
                crucial distinction.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">When You Must Register:</strong> You must
                  register for VAT if: (1) your taxable turnover has exceeded &pound;90,000 in the{' '}
                  <strong>last 12 months</strong> (the &ldquo;historical test&rdquo;), or (2) you
                  expect your taxable turnover to exceed &pound;90,000 in the{' '}
                  <strong>next 30 days alone</strong> (the &ldquo;future test&rdquo; &mdash;
                  relevant if you win a large contract). You must register within 30 days of
                  exceeding the threshold.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What VAT Registration Means in Practice
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>You charge VAT:</strong> Add 20% VAT to all invoices for VAT-able work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>You reclaim VAT:</strong> Recover VAT on business purchases (tools,
                      materials, fuel, insurance)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Quarterly returns:</strong> Submit a VAT return every 3 months and pay
                      the difference between VAT charged and VAT reclaimed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Digital records:</strong> VAT returns must be submitted digitally
                      through MTD-compatible software
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>The Flat Rate Scheme:</strong> For tradespeople with relatively low business
                expenses (limited companies and sole traders), the VAT Flat Rate Scheme can simplify
                matters. Instead of tracking VAT on every purchase and sale, you pay a fixed
                percentage of your gross turnover to HMRC. The flat rate for electrical work is
                typically 14.5% of gross VAT-inclusive turnover. However, since April 2017,
                &ldquo;limited cost traders&rdquo; (those who spend less than 2% of turnover on
                goods) pay a flat rate of 16.5%, which often makes the scheme less attractive. Speak
                to an accountant before choosing this option.
              </p>

              <p>
                <strong>Approaching the threshold:</strong> If your turnover is approaching
                &pound;90,000, you need to make a deliberate decision. Some tradespeople
                deliberately stay below the threshold to avoid the administrative burden and the
                effective price increase for domestic customers (who cannot reclaim VAT). Others
                embrace registration as a sign of business growth and benefit from reclaiming VAT on
                major purchases. There is no universally right answer &mdash; it depends on your
                customer base, expense profile, and growth ambitions.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../pf-module-2-section-4">
              Next: Tools &amp; Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
