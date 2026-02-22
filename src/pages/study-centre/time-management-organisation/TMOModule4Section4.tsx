import { ArrowLeft, Receipt, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the standard CIS deduction rate for a subcontractor who is registered with HMRC for CIS?',
    options: ['10%', '20%', '30%', '45%'],
    correctAnswer: 1,
    explanation:
      'A subcontractor who is registered with HMRC for CIS has 20% deducted from their labour payments by the contractor. If the subcontractor is not registered, the deduction rate increases to 30%. Subcontractors with a strong compliance history can apply for gross payment status (0% deduction), but this requires meeting strict HMRC criteria.',
  },
  {
    id: 2,
    question: 'What happens if a subcontractor is NOT registered with HMRC for CIS?',
    options: [
      'They receive payments with no deductions',
      'They receive payments with 20% deducted',
      'They receive payments with 30% deducted',
      'They cannot legally work as a subcontractor',
    ],
    correctAnswer: 2,
    explanation:
      'An unregistered subcontractor has 30% deducted from labour payments, compared to 20% for registered subcontractors. This higher rate acts as an incentive to register. Registration is free and straightforward through HMRC, so there is no reason not to register. The deducted amounts are credited against your tax liability at year end.',
  },
  {
    id: 3,
    question: 'What is the recommended timing for issuing invoices to maximise payment speed?',
    options: [
      'At the end of each month in a batch',
      'Within 48 hours of completing the work, ideally on the same day',
      'When the client requests the invoice',
      'At the end of the financial year',
    ],
    correctAnswer: 1,
    explanation:
      'Invoicing on the day of completion (or within 48 hours at most) maximises payment speed for two reasons. First, the client is most satisfied immediately after the work is completed, making them psychologically more willing to pay quickly. Second, the earlier the invoice enters their payment cycle, the sooner it is processed. Delays in invoicing directly cause delays in payment.',
  },
  {
    id: 4,
    question: 'What is a recommended payment chasing sequence for overdue invoices?',
    options: [
      'Wait 60 days then send a solicitor\u2019s letter',
      'Call daily until the client pays',
      'Gentle reminder at 7 days, firmer reminder at 14 days, formal notice at 30 days',
      'Do nothing and hope for the best',
    ],
    correctAnswer: 2,
    explanation:
      'A structured escalation sequence maintains the relationship while progressively increasing urgency. At 7 days: a friendly reminder (often the client simply forgot). At 14 days: a firmer reminder noting the terms were 14 days. At 30 days: a formal notice stating that further action may be necessary. Most invoices are paid after the first or second reminder. Automating these through your accounting software eliminates the emotional discomfort of chasing.',
  },
  {
    id: 5,
    question:
      'How often should a sole-trader electrician perform bookkeeping to avoid year-end chaos?',
    options: [
      'Once a year, just before the tax return deadline',
      'Once a quarter, when VAT returns are due',
      'Weekly, spending 20\u201330 minutes reconciling transactions and filing receipts',
      'Only when the accountant requests information',
    ],
    correctAnswer: 2,
    explanation:
      'A weekly 20\u201330 minute bookkeeping session keeps records current with minimal effort. You reconcile bank transactions, file receipts, check outstanding invoices, and categorise expenses while the details are fresh. This prevents the annual nightmare of reconstructing a year\u2019s worth of transactions from memory and receipts. The weekly habit saves days of work at year end.',
  },
  {
    id: 6,
    question: 'What should you do with receipts for business expenses?',
    options: [
      'Keep the paper receipts in a shoebox until year end',
      'Photograph or scan them immediately and store digitally in a categorised system, then keep paper copies as backup',
      'Only keep receipts for purchases over \u00a3100',
      'Your accountant will obtain all receipts from the suppliers directly',
    ],
    correctAnswer: 1,
    explanation:
      'HMRC accepts digital copies of receipts, so photographing them immediately (using your phone or an app like Receipt Bank / Dext) ensures they are captured before fading or getting lost. Categorise them by expense type (materials, tools, fuel, van costs, insurance, subscriptions). Paper originals can be kept as backup, but the digital copy is your primary record.',
  },
  {
    id: 7,
    question: 'What is the CIS monthly return, and who must submit it?',
    options: [
      'A return submitted by subcontractors listing all payments received',
      'A return submitted by contractors listing all CIS deductions made from subcontractor payments that month',
      'A VAT return that includes CIS information',
      'An annual summary submitted by both parties',
    ],
    correctAnswer: 1,
    explanation:
      'The CIS monthly return is submitted by the contractor (the party paying the subcontractor) to HMRC. It details all payments made to subcontractors and the deductions applied. It must be submitted by the 19th of the following month. Failure to submit on time results in penalties. As a subcontractor, you do not submit the monthly return, but you should keep records of all deductions for your own tax return.',
  },
  {
    id: 8,
    question:
      'Why is financial admin considered a time management issue, not just an accounting issue?',
    options: [
      'Because financial admin takes time away from billable work',
      'Because poor financial admin leads to cash flow crises, late tax returns, penalties, and emergency admin sessions that consume far more time than regular maintenance would',
      'Because accountants charge by the hour',
      'Because HMRC requires daily financial reporting',
    ],
    correctAnswer: 1,
    explanation:
      'When financial admin is neglected, it does not disappear \u2014 it compounds. Unchased invoices become bad debts. Unfiled receipts become estimated expenses. Unmade tax payments become penalties and interest. The emergency weekend spent reconstructing a year\u2019s accounts consumes 20+ hours that would have been 25 hours across the year if done weekly (30 min \u00d7 50 weeks). Worse, the stress of financial uncertainty affects your performance on every other task.',
  },
];

export default function TMOModule4Section4() {
  useSEO({
    title: 'Financial Admin & CIS | Module 4 Section 4 | Time Management & Organisation',
    description:
      'CIS deductions, invoicing promptly, payment chasing systems, tax record keeping, and bookkeeping routines for electricians.',
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
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <Receipt className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 4</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Financial Admin &amp; CIS
            </h1>
            <p className="text-white text-sm sm:text-base">
              The financial systems that keep you solvent, compliant, and in control &mdash; from
              CIS deductions to the weekly bookkeeping habit that prevents year-end nightmares
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                Financial admin is not just accounting &mdash; it is time management. Invoicing
                promptly gets you paid faster. Automated payment reminders eliminate awkward
                chasing. Understanding CIS deductions prevents cash flow surprises. A weekly
                30-minute bookkeeping habit replaces the annual weekend of panic. Every pound
                recovered and every penalty avoided is time and money returned to your business.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                More electricians go out of business due to cash flow problems than due to lack of
                work. The typical pattern is clear: invoices are sent late, payments drift to 60+
                days, receipts accumulate unfiled, tax deadlines are missed, penalties accrue, and
                the financial stress affects every aspect of work and life. Systematic financial
                admin prevents all of this with less than 30 minutes of effort per week.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Explain the CIS system including the 20%/30% deduction rates and monthly return obligations',
                'Implement same-day invoicing to minimise the gap between work completion and payment',
                'Set up an automated 3-stage payment chasing system (7/14/30 days) through accounting software',
                'Establish a weekly 30-minute bookkeeping routine covering reconciliation, receipts, and invoice tracking',
                'Maintain HMRC-compliant records for expenses, mileage, and CIS deduction statements',
                'Identify when to handle financial admin yourself and when to engage a professional accountant',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Financial Admin as Time Management */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                1. Financial Admin as a Time Management Issue
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Financial admin is usually categorised as an &ldquo;accounting&rdquo; task, separate
                from day-to-day time management. This is a mistake. Poor financial admin does not
                just create tax problems &mdash; it creates time problems. An invoice sent 3 weeks
                late means payment arrives 3 weeks later, which means cash flow is tighter, which
                means you spend time chasing payments instead of doing productive work. A receipt
                lost today means an hour of searching (or a missed deduction) at tax time. An
                unreconciled bank account means hours of detective work when your accountant asks
                why the figures do not match.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The most damaging time cost of neglected financial admin is the{' '}
                <strong className="text-white">emergency catch-up</strong>. Every accountant who
                works with tradespeople has seen the same scenario: it is January, the
                self-assessment deadline is 31 January, and the client arrives with a carrier bag of
                receipts, a vague memory of what jobs they did in May, and no idea whether they have
                been paid for all their work. Reconstructing 12 months of financial activity takes
                20&ndash;30 hours of painful, stressful work. The same information maintained weekly
                would have taken 25 hours across the year (30 minutes &times; 50 weeks) &mdash;
                roughly the same total time, but spread evenly and done without panic.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The stress dimension is equally important. Financial uncertainty &mdash; not knowing
                exactly what you are owed, not knowing if you can afford next month&rsquo;s van
                payment, not knowing what your tax bill will be &mdash; creates a background anxiety
                that saps energy and reduces performance on every other task. The electrician who
                knows his exact financial position (because he spends 30 minutes per week
                maintaining it) works with confidence. The electrician who avoids looking at his
                finances works with a low-grade dread that never quite goes away.
              </p>
            </div>
          </div>

          {/* Section 2: CIS Explained */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. The Construction Industry Scheme (CIS)
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The Construction Industry Scheme (CIS) is an HMRC system that requires contractors
                (the party paying for construction work) to make deductions from payments to
                subcontractors and pass those deductions to HMRC. For electricians who work as
                subcontractors to main contractors, builders, or other trades, CIS deductions are a
                fact of life. Understanding how they work is essential for managing cash flow and
                avoiding surprises.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The deduction rates are straightforward. If you are{' '}
                <strong className="text-white">registered</strong> with HMRC for CIS,{' '}
                <strong className="text-white">20%</strong> of your labour-only payments are
                deducted by the contractor. If you are{' '}
                <strong className="text-white">not registered</strong>, the rate increases to{' '}
                <strong className="text-white">30%</strong>. There is a third tier: subcontractors
                with a strong compliance history can apply for{' '}
                <strong className="text-white">gross payment status</strong>, which means 0%
                deduction. To qualify, you must have paid all tax returns and payments on time for
                the previous 12 months, have a turnover exceeding &pound;30,000 (net of materials),
                and pass HMRC&rsquo;s compliance test. Gross payment status is worth pursuing once
                your business is established.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                CIS deductions apply only to the <strong className="text-white">labour</strong>{' '}
                element of payments, not to materials. If you invoice a contractor for &pound;1,000
                labour and &pound;500 materials, the 20% deduction applies only to the &pound;1,000
                labour element, resulting in a &pound;200 deduction. The contractor pays you
                &pound;1,300 (&pound;800 labour + &pound;500 materials) and pays &pound;200 to HMRC
                on your behalf. These deductions are credited against your annual tax liability
                &mdash; they are advance payments of tax, not an additional charge. At year end, if
                you have overpaid through CIS deductions, you receive a refund.
              </p>
            </div>
          </div>

          {/* Framework box: CIS */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">CIS Deduction Rates Summary</h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Registered subcontractor:</strong> 20% deducted from
                labour payments
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Unregistered subcontractor:</strong> 30% deducted
                from labour payments
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Gross payment status:</strong> 0% deducted (requires
                strong compliance history and &pound;30,000+ turnover)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Materials:</strong> Exempt from CIS deductions
                &mdash; only the labour element is subject to deduction
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Key point:</strong> Deductions are advance tax
                payments credited to your annual tax bill, not additional costs
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-4-4-cis-calc"
            question="You invoice a main contractor for &pound;2,000 labour and &pound;800 materials. You are CIS-registered at the standard rate. How much will you receive, and how much goes to HMRC?"
            options={[
              'You receive &pound;2,240 and HMRC receives &pound;560',
              'You receive &pound;2,400 and HMRC receives &pound;400',
              'You receive &pound;2,800 and HMRC receives &pound;0 because you are registered',
              'You receive &pound;1,960 and HMRC receives &pound;840',
            ]}
            correctIndex={1}
            explanation="CIS deduction (20%) applies only to the labour element: 20% of &pound;2,000 = &pound;400. You receive &pound;1,600 (labour after deduction) + &pound;800 (materials, exempt) = &pound;2,400. HMRC receives &pound;400, which is credited against your annual tax liability."
          />

          {/* Section 3: Invoice Promptly */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                3. Invoice Promptly &mdash; Same Day, Every Time
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The single most impactful financial habit an electrician can develop is same-day
                invoicing. Send the invoice on the day the work is completed, ideally before you
                leave the job. The reasons are both psychological and practical. Psychologically,
                the client is most satisfied with your work at the moment of completion &mdash; the
                lights work, the sockets are tested, the consumer unit is labelled and neat. This is
                the moment they are most willing to pay promptly. A week later, the glow has faded;
                a month later, they may have forgotten how pleased they were.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Practically, invoicing delays create payment delays that cascade through your cash
                flow. If you complete work on the 1st but invoice on the 15th, and the
                client&rsquo;s payment terms are 14 days, you will not receive payment until the
                29th &mdash; nearly a month after the work. The same work invoiced on the 1st with
                14-day terms would be paid by the 15th. That is a 14-day cash flow improvement with
                zero cost, just from invoicing on time. Over a year, with multiple invoices, this
                improvement can mean the difference between comfortable cash flow and constant
                stress.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Modern accounting apps make same-day invoicing effortless. QuickBooks, Xero, and
                FreeAgent all have mobile apps that allow you to create and send an invoice in under
                3 minutes from your phone. Your business details, bank details, and standard line
                items are pre-saved. You simply select the client, enter the work description and
                amount, and tap send. The invoice arrives in the client&rsquo;s email before you
                have reached your next job. This is a 3-minute task that can improve your payment
                timeline by weeks.
              </p>
            </div>
          </div>

          {/* Section 4: Payment Chasing Systems */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">4. Payment Chasing Systems</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Chasing overdue payments is one of the most psychologically uncomfortable tasks in
                running a business. Many electricians avoid it because the conversation feels
                awkward, especially when the client is someone they know or want future work from.
                The solution is to{' '}
                <strong className="text-white">
                  systemise the chasing so it happens automatically
                </strong>
                , removing the emotional burden entirely. Most accounting platforms can send
                automated reminders at intervals you define, with pre-written messages that are firm
                but professional.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The recommended three-stage system works as follows.{' '}
                <strong className="text-white">Stage 1 (7 days overdue):</strong> A friendly,
                informal reminder. &ldquo;Hi [Name], just a quick reminder that invoice #123 for
                &pound;X was due on [date]. Please let me know if there are any issues. Thanks,
                [Your name].&rdquo; Most overdue invoices are paid at this stage &mdash; the client
                simply forgot or the email went to spam.{' '}
                <strong className="text-white">Stage 2 (14 days overdue):</strong> A firmer
                reminder. &ldquo;I am writing to follow up on invoice #123, now 14 days overdue. My
                payment terms are 14 days. Please arrange payment at your earliest
                convenience.&rdquo;
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Stage 3 (30 days overdue):</strong> A formal notice.
                &ldquo;This is a final reminder regarding invoice #123, now 30 days overdue. If
                payment is not received within 7 days, I may need to consider further action
                including late payment interest under the Late Payment of Commercial Debts
                (Interest) Act 1998.&rdquo; The Act allows you to charge statutory interest (8% plus
                the Bank of England base rate) on late commercial payments. Most invoices are
                resolved well before Stage 3, but having the system in place means nothing falls
                through the cracks.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Late Payment of Commercial Debts (Interest) Act 1998
            </h3>
            <p className="text-white text-sm leading-relaxed">
              This legislation gives businesses the right to charge interest on late commercial
              payments. The statutory interest rate is{' '}
              <strong className="text-white">8% plus the Bank of England base rate</strong> per
              annum. You can also claim fixed compensation:{' '}
              <strong className="text-white">&pound;40</strong> for debts up to &pound;999.99,{' '}
              <strong className="text-white">&pound;70</strong> for debts
              &pound;1,000&ndash;&pound;9,999.99, and{' '}
              <strong className="text-white">&pound;100</strong> for debts of &pound;10,000 or more.
              While you may choose not to enforce these charges with regular clients, knowing the
              law exists strengthens your position in payment discussions.
            </p>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-4-4-chasing"
            question="An electrician has &pound;8,000 in outstanding invoices, all more than 30 days old, because he feels uncomfortable chasing clients for payment. What is the best solution?"
            options={[
              'Accept the situation as normal for the trade and hope clients eventually pay',
              'Set up automated payment reminders in his accounting software so chasing happens systematically without emotional discomfort',
              'Stop working for clients who pay late and only accept cash-on-completion jobs',
              'Hire a debt collector immediately for all outstanding invoices',
            ]}
            correctIndex={1}
            explanation="Automated reminders remove the emotional barrier by making the chasing systematic and impersonal. The software sends professional, pre-written reminders at set intervals. The electrician does not need to make awkward phone calls or compose difficult emails. Most clients respond positively to a polite automated reminder \u2014 they simply needed prompting."
          />

          {/* Section 5: Tax Record Keeping */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                5. Tax Record Keeping &amp; the Weekly Routine
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                HMRC requires all self-employed individuals to keep records of income and expenses
                for at least 5 years after the 31 January submission deadline for the relevant tax
                year. For an electrician, this means retaining invoices (both issued and received),
                bank statements, receipts for all business purchases, CIS deduction statements from
                contractors, mileage records, and records of any capital expenditure (tools, van,
                equipment). The penalty for inadequate records can be up to &pound;3,000 per tax
                year.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The weekly bookkeeping routine is the keystone habit that makes all of this
                manageable. Every week &mdash; ideally on the same day and time, such as Friday
                afternoon or Sunday evening &mdash; spend 20&ndash;30 minutes on:{' '}
                <strong className="text-white">(1)</strong> Reconcile bank transactions in your
                accounting software (match each transaction to an invoice or expense category).{' '}
                <strong className="text-white">(2)</strong> File any new receipts (photograph them
                and upload to your accounting app or cloud folder).{' '}
                <strong className="text-white">(3)</strong> Review outstanding invoices and follow
                up on any that are overdue. <strong className="text-white">(4)</strong> Record any
                cash transactions that are not captured automatically.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The benefit of weekly maintenance is not just time efficiency &mdash; it is
                accuracy. When you reconcile transactions the same week they occur, you remember
                what each payment was for. A &pound;47.50 charge from Toolstation on Tuesday is
                easily categorised as &ldquo;materials for the Smith job&rdquo; because you remember
                buying the MCBs. The same transaction reviewed 10 months later is a mystery,
                requiring detective work to identify. This accuracy directly reduces accountancy
                fees (your accountant spends less time on queries) and maximises legitimate tax
                deductions (no expenses are missed because receipts were lost).
              </p>
            </div>
          </div>

          {/* Framework box: Weekly routine */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              The 30-Minute Weekly Bookkeeping Routine
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5 minutes:</strong> Open your accounting app.
                Reconcile all new bank transactions against invoices and expense categories.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5 minutes:</strong> Photograph and upload any paper
                receipts from the week. Categorise them (materials, fuel, tools, van costs,
                subscriptions).
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5 minutes:</strong> Review the outstanding invoices
                list. Note any that are overdue and confirm automated reminders are being sent.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5 minutes:</strong> Record any cash transactions,
                petty cash, or expenses not captured by the bank feed.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5 minutes:</strong> Check your upcoming tax dates.
                Note any approaching deadlines (VAT, self-assessment, CIS).
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5 minutes:</strong> Quick review of profit/loss for
                the month so far. Are you on track? Any concerns?
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-4-4-bookkeeping"
            question="An electrician does no bookkeeping during the year and then spends an entire weekend in January reconstructing his accounts before the self-assessment deadline. His accountant charges extra for the disorganised records. What would the weekly routine have saved him?"
            options={[
              'Nothing \u2014 the total time is the same either way',
              'Approximately 10\u201315 hours of emergency work, the stress of a deadline scramble, higher accountancy fees, and likely missed deductions that increase his tax bill',
              'Only the accountancy fees, since the time commitment would be identical',
              'A small amount of time but no financial benefit',
            ]}
            correctIndex={1}
            explanation="The annual panic takes 20\u201330 hours in a compressed, stressful period. The weekly routine takes 25 hours across the year (30 min \u00d7 50 weeks) but is calm and accurate. The accountant charges less because records are clean. Deductions are not missed because receipts were filed when fresh. The net saving is 10\u201315 hours, lower fees, a lower tax bill, and vastly reduced stress."
          />

          {/* Section 6: Signposting and Professional Help */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. When to Do It Yourself and When to Get Help
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Not all financial admin should be done by you. The weekly bookkeeping, same-day
                invoicing, and receipt filing are tasks you should own &mdash; they are quick, they
                require your knowledge of the transactions, and they keep you connected to your
                business&rsquo;s financial health. However, tax returns, VAT registration decisions,
                CIS gross payment applications, and year-end accounts are tasks where a qualified
                accountant adds value that far exceeds their fee.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                A good accountant specialising in construction trades typically costs
                &pound;800&ndash;1,500 per year for a sole trader. In return, they ensure your tax
                return is accurate and submitted on time (avoiding penalties), identify legitimate
                deductions you might miss (capital allowances on tools and van, home office
                allowance, professional subscriptions), advise on VAT registration timing, and
                handle any HMRC enquiries. The accountant&rsquo;s fee typically saves more than it
                costs through the deductions and efficiencies they identify.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">HMRC resources</strong> are also valuable and free.
                The HMRC website provides guides on CIS registration, self-assessment, VAT
                thresholds, and allowable expenses. The HMRC helpline (0300 200 3300) can answer
                specific questions about your tax situation. For CIS queries specifically, the CIS
                helpline is 0300 200 3210. Additionally, organisations like the Federation of Small
                Businesses (FSB) and the Electrical Contractors&rsquo; Association (ECA) provide
                financial guidance and template documents for their members. Use these resources
                proactively rather than waiting until a problem arises.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Key HMRC Dates for Electricians
            </h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">5 April:</strong> End of the tax year.{' '}
              <strong className="text-white">19th of each month:</strong> CIS monthly return
              deadline (if you are a contractor). <strong className="text-white">31 July:</strong>{' '}
              Second payment on account for self-assessment.{' '}
              <strong className="text-white">5 October:</strong> Deadline to register for
              self-assessment if newly self-employed.{' '}
              <strong className="text-white">31 October:</strong> Paper self-assessment deadline.{' '}
              <strong className="text-white">31 January:</strong> Online self-assessment deadline
              and first payment on account. <strong className="text-white">VAT quarters:</strong>{' '}
              Returns due 1 month and 7 days after the quarter end. Set calendar reminders for all
              of these 30 days in advance.
            </p>
          </div>

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Financial admin is a time management issue: neglected finances create cash flow crises, penalties, and emergency admin sessions',
                'CIS deductions are 20% (registered), 30% (unregistered), or 0% (gross payment status) \u2014 applied to labour only, not materials',
                'Same-day invoicing improves payment timelines by weeks and costs only 3 minutes per invoice using mobile accounting apps',
                'A 3-stage automated payment chasing system (7/14/30 days) eliminates the emotional discomfort of chasing while ensuring no invoice is forgotten',
                'The weekly 30-minute bookkeeping routine prevents the annual nightmare and ensures accurate records throughout the year',
                'Engage a construction-specialist accountant (\u00a3800\u20131,500/year) for tax returns and strategic advice \u2014 their fee typically pays for itself',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Do I need to register for CIS if I only do domestic work?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  CIS applies to work within the construction industry, which includes electrical
                  work. If you work as a subcontractor for a contractor (builder, main contractor,
                  or another electrical firm), CIS applies regardless of whether the end client is
                  domestic or commercial. If you work directly for homeowners as the main
                  contractor, CIS does not apply because the homeowner is not a
                  &ldquo;contractor&rdquo; under the scheme. However, if a builder hires you to wire
                  a domestic extension, that payment is subject to CIS.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What is the VAT registration threshold, and should I register voluntarily?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  You must register for VAT if your taxable turnover exceeds &pound;90,000 in any
                  12-month period (as of 2024/25). Voluntary registration below this threshold can
                  be beneficial if most of your clients are VAT-registered businesses (they can
                  reclaim the VAT you charge), as it allows you to reclaim VAT on your own
                  purchases. However, for domestic-focused electricians, voluntary registration
                  often means higher prices for clients who cannot reclaim VAT. Discuss with your
                  accountant before deciding.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How do I get a CIS deduction refund if I have overpaid?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  CIS deductions are credited against your annual tax and National Insurance
                  liability on your self-assessment return. If the total deductions exceed your tax
                  bill, the overpayment is refunded by HMRC after your return is processed. Keep all
                  CIS deduction statements from contractors as evidence of the deductions made. Your
                  accountant will include these figures on your self-assessment to ensure the credit
                  is applied correctly.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What expenses can I claim as an electrician?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Common allowable expenses include: materials and consumables, tools (capital
                  allowances for items over &pound;1,000), van costs (fuel, insurance, maintenance,
                  road tax), business mileage (45p/mile for the first 10,000 miles, 25p thereafter),
                  work clothing and PPE, training and professional development, professional
                  subscriptions (NICEIC, NAPIT, IET), accounting fees, phone and internet (business
                  proportion), tool insurance, and public liability insurance. Keep receipts for
                  everything and let your accountant determine which are allowable.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Section 4 Quiz: Financial Admin & CIS" />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-5">
                Next: Building Lasting Habits
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
