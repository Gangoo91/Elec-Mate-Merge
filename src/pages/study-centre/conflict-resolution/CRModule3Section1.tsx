import {
  ArrowLeft,
  ArrowRight,
  CircleDollarSign,
  CheckCircle,
  HelpCircle,
  Clock,
  AlertTriangle,
  Scale,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-3-1-check1',
    question:
      'Under the Late Payment of Commercial Debts (Interest) Act 1998, what is the statutory interest rate you can charge on overdue commercial invoices?',
    options: [
      '4% above BoE base rate',
      '8% above BoE base rate',
      '12% above BoE base rate',
      'Whatever rate you specify in the contract',
    ],
    correctIndex: 1,
    explanation:
      'The Late Payment of Commercial Debts (Interest) Act 1998 gives businesses the statutory right to charge interest at 8% above the Bank of England base rate on overdue commercial invoices. This applies automatically to business-to-business transactions even if the contract does not mention interest. It is important to note that this Act applies only to commercial (B2B) debts, not to consumer transactions where a homeowner has hired you directly.',
  },
  {
    id: 'cr-3-1-check2',
    question:
      'At what stage of the payment chasing process should you send a formal "letter before action"?',
    options: [
      'Immediately when the invoice is overdue',
      'After 7 days',
      'After 21-28 days, following a friendly reminder, formal reminder, and phone call',
      'Only after you have already filed at Small Claims Court',
    ],
    correctIndex: 2,
    explanation:
      'A letter before action should be sent after 21-28 days, following a staged escalation process. The recommended approach is: friendly reminder on day 1, formal written reminder at 7 days, a phone call at 14 days, and then the letter before action at 21-28 days. Sending a letter before action too early can damage the relationship unnecessarily, while waiting too long enables the client to deprioritise your invoice. The Pre-Action Protocol for Debt Claims requires that you give the debtor at least 30 days to respond to the letter before issuing court proceedings.',
  },
  {
    id: 'cr-3-1-check3',
    question: 'What is the maximum claim value for the Small Claims Court in England and Wales?',
    options: ['£5,000', '£10,000', '£25,000', '£50,000'],
    correctIndex: 1,
    explanation:
      'The Small Claims Court in England and Wales handles claims up to £10,000. This track is specifically designed to be accessible without legal representation, meaning you do not need a solicitor. The hearing is informal, costs are limited, and you can file online through Money Claims Online (MCOL). For claims between £10,000 and £25,000, the fast track applies, and above £25,000 the multi-track applies, both of which are significantly more complex and costly.',
  },
];

const faqs = [
  {
    question: 'Can I charge interest on a domestic customer who has not paid?',
    answer:
      'The Late Payment of Commercial Debts (Interest) Act 1998 applies only to business-to-business (B2B) transactions. If you are working for a domestic customer (a homeowner), this Act does not apply. However, you can include a contractual interest clause in your terms and conditions that applies to late payments from domestic clients. If no contractual clause exists, you may still be able to claim interest through the courts under the County Courts Act 1984 at 8% simple interest per annum from the date the debt became due. The key lesson is to include a clear late payment clause in your standard terms for all clients, whether commercial or domestic.',
  },
  {
    question: 'What if the client disputes the quality of my work rather than the amount owed?',
    answer:
      'When a client withholds payment based on alleged quality issues, the situation becomes more complex than a straightforward non-payment case. First, you should request the specific nature of the complaint in writing. If the complaint has merit, address it promptly and then invoice for the undisputed portion separately. If the complaint appears to be a tactic to avoid payment, document everything thoroughly: photographs of your work, copies of the specification you were given, test results, certificates issued, and any correspondence. Under the Consumer Rights Act 2015, the consumer has a right to have work done with reasonable care and skill, so your evidence of meeting that standard is crucial. If you cannot resolve it directly, consider mediation before court action.',
  },
  {
    question: 'Should I stop work if a stage payment is overdue?',
    answer:
      'This depends on the contract terms. If your contract includes a clause that allows you to suspend work for non-payment (which it should), then yes, you are within your rights to pause until payment is received. Under the Housing Grants, Construction and Regeneration Act 1996 (as amended by the Local Democracy, Economic Development and Construction Act 2009), you have a statutory right to suspend performance for non-payment on construction contracts, provided you give at least seven days written notice of your intention to suspend. However, exercise this right carefully on domestic contracts where the Act may not apply. Always communicate clearly and in writing before suspending work, and never remove completed work or materials that the client has already paid for.',
  },
  {
    question: 'Is it worth pursuing small debts through the Small Claims Court?',
    answer:
      'It depends on the amount and the likelihood of recovery. Court fees range from £35 for claims up to £300 to £455 for claims between £5,001 and £10,000. You can add the court fee to your claim. Money Claims Online (MCOL) allows you to issue claims quickly and cheaply. However, winning a court judgement does not guarantee payment. If the debtor has no assets or income, a County Court Judgement (CCJ) may be unenforceable. For very small amounts (under £200-£300), the time, stress, and court fees may outweigh the recovery. A practical approach is to weigh the amount owed against the filing cost, your time to attend any hearing, and the realistic prospect of collecting the money even if you win.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to the Federation of Small Businesses (FSB), approximately how much does late payment cost UK SMEs each year?',
    options: ['£5 billion', '£12 billion', '£22 billion', '£50 billion'],
    correctAnswer: 2,
    explanation:
      'FSB research consistently shows that late payment costs UK small and medium enterprises approximately £22 billion per year. This staggering figure accounts for the time spent chasing debts, the cash flow disruption, the cost of bridging finance, and in some cases the failure of otherwise viable businesses. For sole trader electricians, the impact is even more acute because a single non-paying client can represent a significant proportion of monthly turnover.',
  },
  {
    id: 2,
    question:
      'Under the Late Payment of Commercial Debts (Interest) Act 1998, what fixed compensation can you claim on an overdue commercial debt of £3,500?',
    options: ['£40', '£70', '£100', '£150'],
    correctAnswer: 1,
    explanation:
      'For overdue commercial debts between £1,000 and £9,999.99, the Late Payment Act entitles you to claim £70 in fixed compensation. The three tiers are: £40 for debts up to £999.99, £70 for debts between £1,000 and £9,999.99, and £100 for debts of £10,000 or more. This compensation is in addition to the statutory interest of 8% above the Bank of England base rate. These amounts are designed to cover the administrative cost of chasing late payment.',
  },
  {
    id: 3,
    question: 'What is the first step in the recommended staged payment chasing process?',
    options: [
      'Send a formal letter before action',
      'File a claim at Small Claims Court',
      'Send a friendly reminder on the day the payment becomes overdue',
      'Telephone the client to demand immediate payment',
    ],
    correctAnswer: 2,
    explanation:
      'The first step is a friendly reminder on the day the payment becomes overdue (day 1). This should be polite, assume the best (they may have simply forgotten), and include a copy of the original invoice. Many payment issues are resolved at this stage because the most common reason for late payment is administrative oversight, not deliberate avoidance. Escalating too quickly can damage the client relationship unnecessarily when a simple reminder would have resolved the matter.',
  },
  {
    id: 4,
    question:
      'How long must you give a debtor to respond to a letter before action under the Pre-Action Protocol for Debt Claims?',
    options: ['7 days', '14 days', '30 days', '60 days'],
    correctAnswer: 2,
    explanation:
      'The Pre-Action Protocol for Debt Claims requires that you give the debtor at least 30 days to respond to a letter before action before issuing court proceedings. This is a mandatory requirement, and courts take a dim view of claimants who issue proceedings without following the protocol. The 30-day period allows the debtor to pay, propose a payment plan, or dispute the debt. Your letter must include the amount owed, how the interest has been calculated, details of how to pay, and information about how to dispute the debt if they disagree.',
  },
  {
    id: 5,
    question: 'Which of the following is the most effective prevention strategy for non-payment?',
    options: [
      'Always demanding full payment upfront before starting any work',
      'Clear written terms, a deposit, and agreed stage payments',
      'Threatening legal action in the original quote',
      'Only working for clients referred by other tradespeople',
    ],
    correctAnswer: 1,
    explanation:
      'Clear written terms, a deposit, and agreed stage payments is the most effective prevention strategy because it establishes a professional framework from the outset. Demanding full payment upfront is unrealistic for most electrical work and will lose you clients. Threatening legal action in quotes is unprofessional and off-putting. While referrals can help, they do not guarantee payment. A structured approach with written terms, a reasonable deposit (typically 10-30% for larger jobs), and stage payments tied to milestones protects both parties and ensures you are never too far ahead of payment.',
  },
  {
    id: 6,
    question:
      'What is the maximum court fee for filing a Small Claims Court claim in England and Wales?',
    options: ['£35', '£115', '£300', '£455'],
    correctAnswer: 3,
    explanation:
      'The maximum court fee for a Small Claims Court claim (for claims between £5,001 and £10,000) is £455. The fees are scaled: £35 for claims up to £300, £50 for claims between £300.01 and £500, £70 for claims between £500.01 and £1,000, £105 for claims between £1,000.01 and £1,500, £185 for claims between £1,500.01 and £3,000, £335 for claims between £3,000.01 and £5,000, and £455 for claims between £5,000.01 and £10,000. These fees can be added to your claim, so if you win, the defendant pays your court fees as well.',
  },
  {
    id: 7,
    question:
      'The Late Payment of Commercial Debts (Interest) Act 1998 applies to which type of transactions?',
    options: [
      'All transactions including domestic consumers',
      'Business-to-business (B2B) transactions only',
      'Only transactions over £10,000',
      'Only transactions where a written contract exists',
    ],
    correctAnswer: 1,
    explanation:
      'The Late Payment Act applies exclusively to business-to-business (B2B) transactions. It does not cover transactions where the client is a domestic consumer (a homeowner hiring you for work at their home). This is a critical distinction for electricians, who often work for both commercial clients and domestic customers. For domestic clients, you need to rely on contractual late payment clauses in your terms and conditions, or the statutory interest available through the County Courts Act 1984 if the matter goes to court.',
  },
  {
    id: 8,
    question:
      'An electrician is owed £1,800 by a commercial client. The invoice has been overdue for 45 days. Which of the following is the most appropriate course of action?',
    options: [
      'Immediately file a claim at Small Claims Court without further contact',
      'Send a letter before action giving 30 days to respond, including the amount owed, interest calculation, how to pay, and how to dispute',
      'Turn up at the client premises and refuse to leave until paid',
      'Post a negative review on social media to pressure the client into paying',
    ],
    correctAnswer: 1,
    explanation:
      'After 45 days of non-payment, and assuming earlier reminder stages have been followed, a letter before action is the appropriate next step. This letter must include the amount owed, how interest has been calculated (8% above BoE base rate under the Late Payment Act, plus £70 fixed compensation), details of how to pay, and information on how to dispute the debt. The debtor must be given 30 days to respond. Filing at court without following the Pre-Action Protocol could result in costs penalties. Attending premises or posting on social media are unprofessional and potentially actionable as harassment or defamation.',
  },
];

export default function CRModule3Section1() {
  useSEO({
    title: 'Non-Paying Clients | Conflict Resolution Module 3.1',
    description:
      'Prevention strategies, staged payment chasing, the Late Payment Act 1998, Pre-Action Protocol, Small Claims Court, and cost-benefit analysis for debt recovery.',
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
            <Link to="../cr-module-3">
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
            <CircleDollarSign className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Non-Paying Clients
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Prevention strategies, staged escalation, your statutory rights under the Late Payment
            Act, and the practicalities of Small Claims Court recovery
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Scale:</strong> Late payment costs UK SMEs £22 billion per year
              </li>
              <li>
                <strong>Prevention:</strong> Written terms, deposits, and stage payments
              </li>
              <li>
                <strong>Law:</strong> Late Payment Act 1998 gives you 8% + BoE base rate on B2B
                debts
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cash flow:</strong> One non-paying client can cripple a sole trader for
                weeks
              </li>
              <li>
                <strong>Confidence:</strong> Knowing your rights removes the fear from chasing money
              </li>
              <li>
                <strong>Professionalism:</strong> A structured approach protects both you and the
                client
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain prevention strategies including written terms, deposits, and stage payment structures',
              'Apply the staged payment chasing framework from friendly reminder through to Small Claims Court',
              'Describe the rights available under the Late Payment of Commercial Debts (Interest) Act 1998',
              'Draft a compliant letter before action following the Pre-Action Protocol for Debt Claims',
              'Navigate the Small Claims Court process including filing via Money Claims Online',
              'Evaluate the cost-benefit analysis of pursuing debts and identify when not to pursue',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Scale of the Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Scale of the Problem
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Late payment and non-payment are not minor inconveniences for tradespeople &mdash;
                they are existential threats to small businesses. Research by the Federation of
                Small Businesses (FSB) consistently shows that late payment costs UK small and
                medium enterprises approximately <strong>£22 billion per year</strong>. That figure
                accounts for the time spent chasing debts, the cash flow disruption that prevents
                businesses from investing and growing, the cost of bridging finance and overdraft
                facilities, and in the most severe cases, the outright failure of otherwise viable
                businesses.
              </p>

              <p>
                For sole trader electricians and small electrical contractors, the impact is
                disproportionately severe. A single non-paying client who owes £2,000 to £5,000 can
                represent an entire week or more of revenue. When you have already purchased
                materials, paid for travel, and invested your time and expertise, that unpaid
                invoice is not just lost income &mdash; it is money you have actively spent that you
                cannot recover. The average small electrical business is chasing between £2,000 and
                £5,000 in overdue invoices at any given time, and the stress of this situation is a
                significant contributor to mental health difficulties in the trade.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Core Principle:</strong> Prevention is always
                  better than recovery. The time to protect yourself against non-payment is before
                  you start the job, not after the invoice is overdue. The most effective
                  electricians build payment protection into every job from the quoting stage
                  onwards, making non-payment the exception rather than a regular occurrence.
                </p>
              </div>

              <p>
                The foundation of prevention is <strong>clear terms in writing</strong>. This means
                a written quote (not just a verbal price), clear payment terms (when payment is due,
                how to pay, what happens if payment is late), and explicit scope of work (what is
                included and, just as importantly, what is not). For jobs over a certain value
                &mdash; many electricians use £500 as the threshold &mdash; a{' '}
                <strong>deposit</strong> should be standard practice. A deposit of 10-30% serves two
                purposes: it provides cash flow to cover materials, and it demonstrates the
                client&rsquo;s commitment to the project. Clients who refuse to pay a reasonable
                deposit are often the same clients who will refuse to pay the final invoice.
              </p>

              <p>
                For larger jobs, <strong>stage payments</strong> are essential. A typical structure
                for a rewire might be: 25% deposit on acceptance, 25% at first fix completion, 25%
                at second fix completion, and 25% on final sign-off and certification. This means
                you are never more than one stage payment ahead of the client, limiting your
                exposure if a dispute arises. The key is to agree these stages in writing before
                work begins and to invoice promptly at each stage.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Construction Reality Check</p>
                </div>
                <p className="text-sm text-white">
                  Many electricians, particularly when starting out, feel uncomfortable asking for
                  deposits or presenting formal terms. They worry it will seem untrusting or put
                  clients off. In practice, the opposite is true. Professional clients expect
                  professional terms. A clear, written agreement actually increases client
                  confidence because it demonstrates that you are organised, experienced, and
                  serious about your business. The clients who object to reasonable terms are
                  precisely the ones you need to be most cautious about.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Payment Conversation Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The Payment Conversation Framework
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When prevention fails and a payment becomes overdue, the way you chase it matters
                enormously. The most common mistakes tradespeople make are either doing nothing
                (hoping the client will eventually pay, which they rarely do without prompting) or
                going from zero to aggressive in a single step (which damages the relationship and
                can actually make recovery harder). The most effective approach is a{' '}
                <strong>staged escalation</strong> that is early, calm, and documented at every
                stage.
              </p>

              <p>
                The principle behind staged escalation is simple: start from a position of goodwill.
                Most late payments are caused by administrative oversight, cash flow timing, or
                simple forgetfulness &mdash; not by a deliberate decision to avoid paying you. By
                starting gently and escalating gradually, you give the client every opportunity to
                pay without embarrassment, while building a clear paper trail that demonstrates your
                professionalism if the matter eventually reaches court.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Staged Payment Chasing Timeline
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Day 1 &mdash; Friendly Reminder
                      </p>
                      <p className="text-sm text-white">
                        A polite email or text on the day payment becomes overdue. Assume the best:
                        &ldquo;Hi [Name], just a friendly reminder that invoice [number] was due
                        today. I have attached a copy for your convenience. Please let me know if
                        you have any questions.&rdquo; Many invoices are resolved at this stage.
                        Include a copy of the original invoice and your bank details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Day 7 &mdash; Formal Reminder
                      </p>
                      <p className="text-sm text-white">
                        A more formal written reminder by email. Reference the original invoice, the
                        date it was due, and request payment within 7 days. Keep the tone
                        professional but firmer: &ldquo;I am writing to follow up on invoice
                        [number] which was due on [date] and remains outstanding. I would appreciate
                        payment within 7 days. If there is any issue with the invoice, please let me
                        know so we can resolve it.&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Day 14 &mdash; Phone Call</p>
                      <p className="text-sm text-white">
                        A direct phone call to discuss the overdue payment. This is important
                        because it is harder for a client to ignore a phone call than an email, and
                        a conversation allows you to understand if there is a genuine issue (cash
                        flow problem, dispute with the work, administrative error) or if the client
                        is simply avoiding payment. Be calm, professional, and ask directly when you
                        can expect payment. Follow up the call with an email confirming what was
                        discussed and agreed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Day 21-28 &mdash; Letter Before Action
                      </p>
                      <p className="text-sm text-white">
                        A formal letter before action, clearly stating the amount owed, the interest
                        accrued, how to pay, and how to dispute the debt. State that if payment is
                        not received within 30 days, you will issue court proceedings without
                        further notice. This letter must comply with the Pre-Action Protocol for
                        Debt Claims. Send it by recorded delivery and keep a copy.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Day 30+ &mdash; Small Claims Court
                      </p>
                      <p className="text-sm text-white">
                        If the 30-day response period from the letter before action has passed with
                        no payment, no payment plan proposal, and no valid dispute, you can file a
                        claim through the Small Claims Court. At this point, you have a clear,
                        documented escalation trail that demonstrates to any court that you have
                        been reasonable, professional, and patient.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Throughout this process, <strong>documentation is everything</strong>. Save every
                email, note the date and content of every phone call, and keep copies of all
                letters. If the matter reaches court, the judge will want to see evidence of a
                reasonable, professional attempt to resolve the matter before proceedings were
                issued. A claimant who can demonstrate a clear escalation trail is far more likely
                to receive a favourable judgement than one who simply filed at court without
                warning.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Late Payment of Commercial Debts (Interest) Act 1998 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Late Payment of Commercial Debts (Interest) Act 1998
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Late Payment of Commercial Debts (Interest) Act 1998 is one of the most powerful
                tools available to UK businesses for dealing with overdue invoices, yet many
                tradespeople have never heard of it. This Act gives you the{' '}
                <strong>statutory right</strong> to charge interest on overdue commercial invoices
                at a rate of <strong>8% above the Bank of England base rate</strong>. This applies
                automatically to all business-to-business transactions, even if the contract does
                not mention interest.
              </p>

              <p>
                The Act was introduced because Parliament recognised that late payment was causing
                serious harm to UK businesses, particularly small businesses that lacked the
                negotiating power to demand prompt payment from larger clients. The statutory
                interest rate is deliberately set high (8% above base rate, meaning the total rate
                is significantly above any commercial borrowing rate) to act as a deterrent against
                late payment, not just a compensation mechanism.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Fixed Compensation Under the Late Payment Act
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  In addition to interest, the Act entitles you to a fixed sum of compensation for
                  each overdue invoice, designed to cover the administrative cost of chasing late
                  payment:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-rose-400">£40</p>
                    <p className="text-xs text-white">Debts up to £999.99</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-rose-400">£70</p>
                    <p className="text-xs text-white">Debts £1,000 &ndash; £9,999.99</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-rose-400">£100</p>
                    <p className="text-xs text-white">Debts £10,000+</p>
                  </div>
                </div>
              </div>

              <p>
                There is one critical limitation you must understand:{' '}
                <strong>
                  the Late Payment Act applies only to B2B (business-to-business) transactions
                </strong>
                . If your client is a domestic consumer &mdash; a homeowner who has hired you to
                rewire their house, install a new consumer unit, or add sockets &mdash; the Act does
                not apply. For domestic clients, you need to rely on contractual late payment
                clauses in your terms and conditions, or the statutory interest available through
                the County Courts Act 1984 if the matter goes to court.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Practical Application</p>
                </div>
                <p className="text-sm text-white">
                  As an electrician, you will frequently do work for both commercial and domestic
                  clients. It is essential to understand which regime applies. If you are installing
                  lighting for a commercial office fit-out, the Late Payment Act applies. If you are
                  rewiring a family home, it does not. If a landlord hires you to work on a rental
                  property, the answer depends on whether the landlord is operating as a business (a
                  limited company or a sole trader with a portfolio of properties) or as a private
                  individual. When in doubt, check the invoice addressee: if it is a company name,
                  the Late Payment Act applies; if it is an individual&rsquo;s name at a residential
                  address, treat it as a consumer transaction.
                </p>
              </div>

              <p>
                To exercise your rights under the Late Payment Act, you do not need to have
                mentioned it in the original quote or contract. The right to statutory interest and
                compensation exists automatically. However, including a reference to the Act in your
                payment terms is good practice because it puts the client on notice that you are
                aware of your rights and will exercise them if necessary. A simple clause such as
                &ldquo;Late payments will incur interest at 8% above the Bank of England base rate
                in accordance with the Late Payment of Commercial Debts (Interest) Act 1998, plus
                fixed compensation of £40-£100&rdquo; is sufficient.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Pre-Action Protocol & Small Claims Court */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Pre-Action Protocol &amp; Small Claims Court
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When staged chasing has failed and the client has not paid, proposed a payment plan,
                or raised a valid dispute, the next step is formal legal action. Before issuing
                court proceedings, you must follow the{' '}
                <strong>Pre-Action Protocol for Debt Claims</strong>, which is a set of procedural
                rules that the courts require both parties to follow before litigation begins.
                Failure to follow the protocol can result in costs penalties, even if you win the
                case.
              </p>

              <p>
                The centrepiece of the Pre-Action Protocol is the{' '}
                <strong>letter before action</strong>. This is a formal letter that tells the debtor
                exactly what you are claiming and gives them a final opportunity to pay or dispute
                the debt before you issue court proceedings. The letter must include four key
                elements: the total amount owed (including any interest calculated under the Late
                Payment Act for commercial debts), how the interest has been calculated, clear
                instructions on how to pay, and information on how to dispute the debt if the debtor
                disagrees with the claim. You must give the debtor at least <strong>30 days</strong>{' '}
                to respond.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Letter Before Action &mdash; Required Contents
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Amount Owed</p>
                      <p className="text-sm text-white">
                        The original invoice amount, any interest accrued, any fixed compensation
                        under the Late Payment Act, and the total amount claimed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Interest Calculation</p>
                      <p className="text-sm text-white">
                        How the interest has been calculated, including the rate used, the period
                        over which it has been applied, and the daily rate going forward.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">How to Pay</p>
                      <p className="text-sm text-white">
                        Clear bank details, accepted payment methods, and the deadline for payment
                        (at least 30 days from the date of the letter).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">How to Dispute</p>
                      <p className="text-sm text-white">
                        Information on how the debtor can dispute the debt if they believe it is
                        incorrect, including where to send their response and what information to
                        include.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                If the 30-day response period passes without payment or a valid dispute, you can
                then file a claim through the <strong>Small Claims Court</strong>. For claims up to
                £10,000 in England and Wales, this falls under the small claims track, which is
                specifically designed to be accessible without legal representation. You do not need
                a solicitor. The hearing is informal (usually held in a room around a table, not a
                formal courtroom), costs are limited, and the process is straightforward.
              </p>

              <p>
                The easiest way to file a small claim is through{' '}
                <strong>Money Claims Online (MCOL)</strong>, which is the government&rsquo;s online
                portal for issuing county court claims. You create an account, enter the details of
                your claim and the defendant, pay the court fee, and the court service sends the
                claim to the defendant. Court fees range from £35 for claims up to £300 to £455 for
                claims between £5,001 and £10,000. These fees can be added to your claim, so if you
                win, the defendant pays your court fees as well as the debt.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What Happens After You File</p>
                <p className="text-sm text-white mb-3">
                  After you file through MCOL, the defendant has 14 days to respond. They can either
                  pay the claim in full (most common outcome &mdash; many debtors pay as soon as
                  court papers arrive), file a defence, or request more time. If they do not respond
                  at all, you can request a default judgement, meaning you win automatically. If
                  they file a defence, the matter proceeds to a hearing where a district judge will
                  consider both sides and make a decision.
                </p>
                <p className="text-sm text-white">
                  Importantly, even if you win a judgement, this does not automatically mean you
                  will receive payment. A County Court Judgement (CCJ) is a legal finding that the
                  debtor owes you money, but enforcement is a separate process. Enforcement options
                  include bailiff action, attachment of earnings, and charging orders against
                  property. A CCJ will also appear on the debtor&rsquo;s credit file for six years,
                  which provides significant incentive for most businesses and individuals to pay.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: When Not to Pursue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            When Not to Pursue
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every debt is worth chasing to its conclusion. There are situations where the
                cost &mdash; in time, money, stress, and emotional energy &mdash; of pursuing a debt
                outweighs the amount you would recover. Learning to make this{' '}
                <strong>cost-benefit analysis</strong> is a sign of business maturity, not weakness.
              </p>

              <p>
                Consider a scenario where a domestic customer owes you £200 for a minor job. You
                have sent reminders, made phone calls, and received no response. To pursue this
                through the Small Claims Court would cost you at least £35 in court fees, several
                hours of preparation time, and potentially a half-day off work to attend a hearing.
                Even if you win, enforcement is not guaranteed. The total cost of pursuit might
                exceed the amount owed, and the stress of the process could affect your wellbeing
                and your ability to focus on productive, paying work.
              </p>

              <p>
                In contrast, a commercial client who owes you £4,500 for a completed office fit-out
                is absolutely worth pursuing. The amount is significant, the Late Payment Act
                applies (adding interest and compensation), court fees are proportionate to the
                claim, and a commercial client is far more likely to pay once they receive court
                papers because of the impact a CCJ would have on their business credit rating.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Factors to Consider in the Cost-Benefit Analysis
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Amount owed</strong> &mdash; Is it significant enough to justify the
                      time and expense of pursuit? Generally, debts under £200-£300 may not be worth
                      formal court action.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Prospect of recovery</strong> &mdash; Does the debtor have assets or
                      income? A judgement against someone with no means to pay is a worthless piece
                      of paper.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Your time value</strong> &mdash; Every hour spent chasing debt is an
                      hour not spent on billable work. Calculate your hourly rate and factor it in.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Emotional cost</strong> &mdash; Debt chasing is stressful. Prolonged
                      disputes affect your mood, your relationships, and your ability to focus on
                      your work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Relationship value</strong> &mdash; Is this a client you want to work
                      with again? Sometimes accepting a slightly late payment is worth preserving a
                      long-term relationship.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Principle vs practicality</strong> &mdash; It is natural to want to
                      pursue a debt &ldquo;on principle&rdquo;, but principle alone does not pay
                      your bills. Sometimes the most profitable decision is to write off a small
                      loss and move on.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                It is also important to distinguish between different types of non-payer. The
                domestic client who genuinely forgot and pays immediately when reminded is very
                different from the commercial client who deliberately withholds payment as a cash
                flow strategy. The retired homeowner on a fixed income who is struggling to pay a
                large bill requires compassion and a payment plan, not a letter before action. The
                developer who owes you £8,000 and is dodging your calls while driving a new car
                requires a very different approach. Tailor your response to the situation, not to a
                rigid protocol.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">A Note on Write-Offs:</strong> If you decide not
                  to pursue a debt, treat it as a business decision and move on. Do not let it
                  fester. Make a note of the client for your records (so you do not work for them
                  again without upfront payment), claim the bad debt against your tax if applicable,
                  and redirect your energy towards productive work. Sometimes the most valuable
                  thing you can do with a bad debt is learn from it and tighten your processes so it
                  does not happen again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Non-payment is a serious issue
                  for UK tradespeople, but it is largely preventable and, when it does occur,
                  manageable through a structured, professional approach. Prevention through clear
                  terms, deposits, and stage payments is always better than recovery. When chasing
                  is necessary, a staged escalation from friendly reminder to formal action builds a
                  strong paper trail and gives the client every opportunity to pay without
                  litigation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Concepts to Remember</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Prevention first</strong> &mdash; written terms, deposits, and stage
                      payments eliminate most non-payment problems before they start
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Staged escalation</strong> &mdash; friendly reminder, formal reminder,
                      phone call, letter before action, Small Claims Court
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Late Payment Act 1998</strong> &mdash; 8% + BoE base rate on
                      commercial debts, plus £40-£100 fixed compensation per invoice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pre-Action Protocol</strong> &mdash; letter before action must give 30
                      days to respond and include amount, interest, how to pay, how to dispute
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Small Claims Court</strong> &mdash; up to £10,000, no solicitor
                      needed, file online via MCOL, fees £35-£455
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cost-benefit analysis</strong> &mdash; not every debt is worth
                      pursuing; weigh the amount against time, stress, and prospect of recovery
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will tackle one of the most common sources of client
                disputes in the electrical trade: scope creep and the &ldquo;while you&rsquo;re
                here&rdquo; problem. You will learn how to handle variation conversations
                confidently, protect your time and income, and use the Consumer Rights Act 2015 to
                support your position.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
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
            <Link to="../cr-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3-section-2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
