import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
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
    id: 'cr-5-1-check1',
    question:
      'A domestic electrician provides a client with an "estimate" of £4,200 for a full rewire. After completion, the final invoice comes to £5,800 due to unforeseen complications. The client refuses to pay more than £4,200. Who is most likely in the right, and why?',
    options: [
      'The electrician — estimates always change, so the client should expect to pay the final amount',
      'The client — an estimate creates a reasonable expectation of the approximate cost, and a 38% increase without prior agreement is unreasonable, but the electrician could have protected themselves by using a quote with a clear variation procedure',
      'Neither — all electrical work is subject to price changes and this is simply how the trade operates',
      'The client — estimates are legally identical to quotes and cannot be exceeded under any circumstances',
    ],
    correctIndex: 1,
    explanation:
      'While an estimate is not a fixed price, it does create a reasonable expectation. A 38% increase without prior communication or agreement is likely to be considered unreasonable by a court or ombudsman. The electrician should have used a fixed-price quote for the defined scope, with a clear variation procedure for unforeseen work. When complications arose during the job, they should have stopped, informed the client of the additional cost, obtained written agreement before proceeding, and documented the variation. This scenario perfectly illustrates why the distinction between quote and estimate matters and why a clear variation procedure is essential.',
  },
  {
    id: 'cr-5-1-check2',
    question:
      'An electrician agrees verbally with a client to add four extra downlighters during a kitchen installation, at an additional cost of £320. When the invoice arrives, the client denies the conversation happened and refuses to pay for the extras. What should the electrician have done differently?',
    options: [
      'Refused to do any additional work under any circumstances',
      'Added the cost silently to the final invoice without mentioning it',
      'Sent a brief confirmation email or text immediately after the verbal agreement, stating the additional work, cost, and that it was agreed on a specific date',
      'Insisted on a formally signed contract amendment before touching any additional work',
    ],
    correctIndex: 2,
    explanation:
      'The confirmation email or text is the single most effective habit an electrician can develop for preventing payment disputes. It does not need to be formal or legalistic — a simple message such as "Hi Sarah, just to confirm what we agreed today: 4 additional downlighters in the kitchen at £320 plus VAT, bringing the revised total to £X. Let me know if I have got anything wrong" creates a written record that is admissible in a small claims court and, crucially, gives the client an opportunity to correct any misunderstanding before the work is done. Most clients will not dispute a charge when they have a text message confirming the agreement.',
  },
  {
    id: 'cr-5-1-check3',
    question:
      'Which of the following is the LEAST important element to include in a domestic electrical quote?',
    options: [
      'The exact scope of work (what is and is not included)',
      'Payment terms and deposit requirements',
      'The brand and colour of every individual cable clip to be used',
      'A variation procedure for additional work',
    ],
    correctIndex: 2,
    explanation:
      'While specifying materials at a general level is good practice (for example, stating the brand and type of consumer unit, or the grade of cable), specifying the brand and colour of every individual cable clip is excessive detail that adds no value and makes the document unnecessarily long. The other three elements — scope, payment terms, and variation procedure — are all critical for preventing disputes. A clear scope prevents arguments about what was included. Payment terms prevent cash flow problems and late payment. A variation procedure ensures that any changes are agreed and documented before they happen. These are the elements that actually prevent conflict.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What is the legal difference between a quote and an estimate?',
    answer:
      'A quote is a fixed price for a defined scope of work. Once accepted, it forms a binding agreement — you cannot charge more than the quoted amount for the work described, regardless of whether it costs you more than expected to complete. An estimate is an educated guess at the likely cost, and the final price can vary. However, an estimate still creates a reasonable expectation, and a court would consider whether any increase was proportionate and whether the customer was informed before the additional cost was incurred. For electricians, the safest approach is to provide a quote for clearly defined work with a variation procedure for anything that falls outside the original scope. This gives the client price certainty while protecting you from scope creep.',
  },
  {
    question: 'Do I really need written terms and conditions for domestic work?',
    answer:
      'Yes, and this is non-negotiable for any professional electrician. The Consumer Rights Act 2015 gives domestic clients significant protections, including the right to a repeat performance or price reduction if the service does not meet reasonable standards. Without written T&Cs, you have no agreed definition of what "reasonable standards" means for your specific job. Your T&Cs do not need to be lengthy or written in legal jargon — a clear, plain-English document covering scope, price, payment terms, variation procedure, cancellation policy, and dispute resolution is sufficient. Many electricians use a single-page document that the client signs alongside the quote. This small investment of time prevents the vast majority of domestic disputes.',
  },
  {
    question: 'Are verbal agreements legally binding?',
    answer:
      "Yes, verbal agreements are legally binding in England and Wales (and Scotland, with some differences). The problem is not their validity but their enforceability — if a dispute arises, it becomes your word against the client's, and proving what was agreed is extremely difficult. Courts can consider text messages, emails, witness testimony, and patterns of behaviour, but none of these are as strong as a written agreement signed by both parties. The practical advice is simple: if it matters, put it in writing. For electrical work, this means every quote, every variation, every change in scope, and every agreement about timing or access should be confirmed in writing — even if that writing is just a text message or email.",
  },
  {
    question: 'How do I handle a client who refuses to sign written terms?',
    answer:
      'A client who refuses to sign written terms is a significant red flag. It does not automatically mean they are dishonest, but it does mean that you have no protection if a dispute arises. The professional approach is to explain calmly and clearly why you use written terms: "I use written agreements for every job because it protects both of us — you know exactly what you are getting and what it will cost, and I know exactly what I have committed to deliver. It is standard practice for professional electricians." If the client still refuses, you have a decision to make. Many experienced electricians will decline the work, reasoning that a client who will not agree to clear terms in advance is highly likely to dispute something later. The risk rarely justifies the potential reward.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'What is the single most effective tool for preventing conflict in domestic electrical work?',
    options: [
      'A verbal agreement between the electrician and client',
      'A clear, written agreement (quote with T&Cs) signed before work begins',
      'A detailed technical specification that the client will not understand',
      'A recommendation from a mutual friend',
    ],
    correctAnswer: 1,
    explanation:
      'A clear written agreement signed before work begins is overwhelmingly the most effective conflict prevention tool available to electricians. It sets expectations for both parties, defines the scope (what is included and what is not), establishes payment terms, and provides a variation procedure for changes. Research consistently shows that the majority of domestic electrical disputes arise from unclear or absent written terms. A written agreement does not guarantee that conflicts will never occur, but it dramatically reduces their frequency and provides a solid foundation for resolution when they do arise.',
  },
  {
    id: 2,
    question:
      'An electrician provides a quote of £3,500 for a consumer unit replacement. During the work, they discover the earthing arrangement needs upgrading. What is the correct procedure?',
    options: [
      'Complete the earthing work and add the cost to the final invoice',
      'Stop work, inform the client of the additional requirement and cost, obtain written agreement before proceeding, and document the variation',
      'Ignore the earthing issue and complete only the consumer unit work',
      'Complete the earthing work for free to maintain good client relations',
    ],
    correctAnswer: 1,
    explanation:
      "The correct procedure is to stop, inform, agree, and document. This is the variation procedure in action. The electrician should explain what they have found, why the additional work is necessary (in this case, for safety and compliance), provide a cost for the additional work, and obtain the client's written agreement before proceeding. This protects both parties: the client is not surprised by unexpected charges, and the electrician has documented authority to carry out and charge for the additional work. Simply adding unexpected costs to a final invoice is one of the most common triggers for domestic electrical disputes.",
  },
  {
    id: 3,
    question:
      'Which of the following correctly describes the difference between a quote and an estimate?',
    options: [
      'They are legally identical terms with no practical difference',
      'A quote is a fixed price for a defined scope; an estimate is an approximation that may vary, but still creates a reasonable expectation',
      'An estimate is more expensive than a quote because it includes contingency',
      'A quote is only used for commercial work; estimates are for domestic work',
    ],
    correctAnswer: 1,
    explanation:
      'A quote is a fixed price for a clearly defined scope of work. Once accepted, it creates a binding obligation — the electrician cannot charge more than the quoted amount for the work described. An estimate is an educated approximation of the likely cost, and the final price can legitimately vary. However, an estimate still creates a reasonable expectation, and any significant increase should be communicated and agreed before the additional cost is incurred. Using the wrong term creates disputes: an electrician who calls their price an "estimate" when they mean a fixed price may find the client expecting flexibility, while one who calls it a "quote" when they expect the price to change will face legitimate complaints about exceeding the agreed amount.',
  },
  {
    id: 4,
    question:
      'What should an electrician include in their standard payment terms for domestic work?',
    options: [
      'Only the total price — nothing else is necessary',
      'Payment due date (e.g. 14 days), deposit requirements, stage payment schedule for larger jobs, accepted payment methods, and late payment consequences',
      'A statement that payment is due "whenever the client is ready"',
      'Payment terms should only be discussed after the work is completed',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive payment terms are essential for preventing cash flow problems and payment disputes. The terms should specify when payment is due (commonly 14 days from invoice or completion), whether a deposit is required (common for larger jobs or material-heavy work), stage payment arrangements for extended projects, accepted payment methods, and the consequences of late payment (such as statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998). Vague payment terms like "payment on completion" without a specific timeframe create ambiguity that leads to conflict. Clear, specific terms set expectations from the outset.',
  },
  {
    id: 5,
    question:
      "An electrician verbally agrees to install three additional double sockets during a rewire. The client later denies the conversation. What is the electrician's best protection?",
    options: [
      'The electrician has no protection — verbal agreements are not legally binding',
      'The electrician should always have a witness present for every conversation',
      'A confirmation email or text sent immediately after the verbal agreement, stating the work, cost, and date agreed',
      'The electrician should refuse to do any work that is not in the original quote',
    ],
    correctAnswer: 2,
    explanation:
      'The confirmation email or text is the most practical and effective protection available. It does not need to be formal — a simple message like "Hi, just confirming our chat today: 3 extra double sockets at £X plus VAT, agreed on [date]" creates a contemporaneous written record. This is admissible as evidence in small claims court, gives the client an opportunity to dispute or clarify immediately, and establishes a professional standard that discourages future misunderstandings. While verbal agreements are legally binding, the problem is always proof. A text message sent within minutes of the conversation is strong evidence of what was agreed.',
  },
  {
    id: 6,
    question: 'Which of the following is NOT typically included in a domestic electrical quote?',
    options: [
      'Detailed scope of work (what is and is not included)',
      "The electrician's favourite football team",
      'Payment terms and schedule',
      'A clear variation procedure for additional work',
    ],
    correctAnswer: 1,
    explanation:
      'A professional electrical quote should include the scope of work (clearly stating what is and is not included), the fixed price, payment terms and schedule, a variation procedure, a timeline for the work, cancellation terms, and contact details. Personal information such as sporting preferences has no place in a professional document. Every element of a quote should serve one purpose: creating clarity between electrician and client about what will happen, when it will happen, how much it will cost, and what to do if anything changes. Unnecessary content dilutes the professional impact of the document.',
  },
  {
    id: 7,
    question:
      'A client wants to proceed with a kitchen rewire but says "I do not sign contracts — I trust you." What is the most professional response?',
    options: [
      'Accept their verbal agreement and proceed — trust is more important than paperwork',
      'Refuse the job immediately and walk away without explanation',
      'Explain that written agreements protect both parties, that it is standard professional practice, and that you require a signed agreement before starting any work',
      'Ask a third party to witness the verbal agreement instead',
    ],
    correctAnswer: 2,
    explanation:
      'The professional response is to explain the purpose of written agreements without being confrontational or accusatory. A good approach is: "I appreciate the trust, and I use written agreements for every job — not because I do not trust clients, but because it protects both of us. You know exactly what you are getting and what it costs, and I know exactly what I have committed to deliver. It is standard practice for all professional tradespeople." If the client still refuses after this explanation, most experienced electricians will decline the work. A client who resists putting terms in writing before the work starts is significantly more likely to dispute those terms after the work is complete.',
  },
  {
    id: 8,
    question:
      'Under the Consumer Rights Act 2015, which of the following rights does a domestic client have regarding electrical services?',
    options: [
      'The right to demand the work is done for free if they are not completely satisfied',
      'The right to a repeat performance or price reduction if the service does not conform to the contract or meet a reasonable standard of care and skill',
      'The right to cancel any contract within 30 days regardless of whether work has started',
      'The right to withhold all payment until 90 days after completion',
    ],
    correctAnswer: 1,
    explanation:
      'The Consumer Rights Act 2015 provides that services must be performed with reasonable care and skill, within a reasonable time (if no time is agreed), and for a reasonable price (if no price is agreed). If the service fails to meet these standards, the consumer has the right to require repeat performance (the electrician must redo the work at no additional cost) or a price reduction. These rights apply to all domestic electrical work and cannot be excluded by contract terms. This is precisely why having clear written terms is so important: they define what "reasonable" means for your specific job, set an agreed price and timeline, and reduce the scope for subjective interpretation of what was promised.',
  },
];

export default function CRModule5Section1() {
  useSEO({
    title: 'Contracts, Terms & Written Agreements | Conflict Resolution Module 5.1',
    description:
      'Quote vs estimate, essential T&Cs for electricians, variation procedures, confirmation emails, and digital signing.',
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
            <Link to="../cr-module-5">
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
            <FileText className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Contracts, Terms &amp; Written Agreements
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Quote vs estimate, essential T&amp;Cs for electricians, variation procedures,
            confirmation emails, and digital signing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Clear written agreements</strong> are the single most effective tool for
                preventing conflict in electrical work
              </li>
              <li>
                <strong>Quote vs estimate:</strong> a quote is a fixed price; an estimate is an
                approximation &mdash; using the wrong word causes disputes
              </li>
              <li>
                <strong>Essential T&amp;Cs</strong> cover payment terms, variation procedures,
                cancellation, and dispute resolution
              </li>
              <li>
                <strong>The confirmation email</strong> turns risky verbal agreements into
                documented evidence
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Prevention:</strong> The majority of domestic electrical disputes stem from
                unclear or absent written terms
              </li>
              <li>
                <strong>Legal protection:</strong> The Consumer Rights Act 2015 gives clients
                significant rights &mdash; written terms define what was agreed
              </li>
              <li>
                <strong>Cash flow:</strong> Clear payment terms prevent the late payment that
                cripples small electrical businesses
              </li>
              <li>
                <strong>Professionalism:</strong> Written agreements signal competence and build
                client confidence from day one
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the legal and practical difference between a quote and an estimate and why using the wrong term causes disputes',
              'Draft a professional domestic electrical quote that includes all essential elements to prevent conflict',
              'Identify the core terms and conditions that every electrician should include in their standard documentation',
              'Describe the correct variation procedure for handling changes to scope during a job',
              'Explain why verbal agreements are legally binding but practically unenforceable and how the confirmation email solves this',
              'Understand the key provisions of the Consumer Rights Act 2015 as they apply to domestic electrical services',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Number One Conflict Prevention Tool
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If there is one single lesson from this entire course that will save you the most
                money, time, and stress across your career, it is this: get clear written agreements
                in place before work starts. This is not bureaucracy. It is not about distrust. It
                is the most practical, proven method of preventing disputes that has ever existed in
                the construction industry. The vast majority of conflicts that electricians face
                with domestic clients &mdash; payment disputes, scope disagreements, dissatisfaction
                with finished work, arguments about timelines &mdash; can be traced back to one root
                cause: the absence of clear, written, mutually agreed terms before the first cable
                was pulled.
              </p>

              <p>
                Think about the most common disputes you have seen or experienced in electrical
                work. A client who expected more work than you quoted for. A client who challenges
                the invoice because they thought extras were included. A client who is unhappy with
                something that was never discussed. A client who pays late because no payment date
                was ever agreed. In every single one of these cases, a clear written agreement would
                have either prevented the dispute entirely or provided an unambiguous reference
                point for resolution. Written agreements do not eliminate all conflict &mdash; that
                is impossible in any working relationship &mdash; but they eliminate the most
                common, most expensive, and most frustrating category of conflict: disputes caused
                by differing assumptions.
              </p>

              <p>
                Many electricians resist this because it feels unnecessary for smaller jobs, or
                because they worry it makes them seem distrustful. The opposite is true. Clients
                respect professionals who operate with clear documentation. It signals competence,
                reliability, and seriousness. When you present a well-structured quote with clear
                terms, you are not just protecting yourself &mdash; you are giving the client
                confidence that they are dealing with a professional who knows exactly what they are
                doing and how they operate. The five minutes it takes to prepare this documentation
                will save you hours of arguments, days of stress, and potentially thousands of
                pounds in disputed invoices over your career.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Domestic Clients &mdash; Quote vs Estimate
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The distinction between a quote and an estimate is one of the most commonly
                misunderstood concepts in the electrical trade, and getting it wrong is one of the
                fastest routes to a client dispute. A <strong>quote</strong> (also called a
                quotation) is a fixed price for a clearly defined scope of work. Once a client
                accepts your quote, you are legally committed to completing that defined work for
                that price. If the job costs you more than you expected, that is your problem, not
                the client&rsquo;s. The price is fixed unless the scope changes through an agreed
                variation procedure.
              </p>

              <p>
                An <strong>estimate</strong>, by contrast, is an educated approximation of what the
                work is likely to cost. The final price can legitimately vary from the estimate.
                However &mdash; and this is the critical point that many electricians miss &mdash;
                an estimate still creates a reasonable expectation. If you estimate &pound;2,000 and
                the final invoice is &pound;2,200, that is likely reasonable. If the final invoice
                is &pound;4,000, a court or ombudsman would almost certainly find that unreasonable,
                and you would be expected to justify why the cost doubled and demonstrate that you
                communicated the increase before incurring it.
              </p>

              <p>
                For domestic electrical work, the professional recommendation is clear: use a
                <strong> quote with a defined scope and a variation procedure</strong>. This gives
                the client the price certainty they want while protecting you from scope creep. Your
                quote should specify exactly what is included: the number and position of
                accessories, the type of consumer unit, the extent of cable runs, the testing and
                certification included. It should also specify what is <em>not</em> included: making
                good after cable runs, decoration, furniture moving, asbestos removal, or any work
                that depends on what is found behind walls. And crucially, it should include a
                variation procedure that explains how changes will be handled, priced, and agreed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Essential Quote Contents Checklist
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Client details:</strong> Full name, property address, contact number
                      and email
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Scope of work:</strong> Detailed description of exactly what is
                      included (number and position of accessories, cable routes, consumer unit
                      specification)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Exclusions:</strong> What is NOT included (making good, decoration,
                      asbestos, structural work)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Fixed price:</strong> Total cost including VAT (state whether VAT
                      registered)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Payment terms:</strong> Deposit amount, stage payments, final payment
                      due date, accepted methods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Timeline:</strong> Estimated start date, duration, and any
                      dependencies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Variation procedure:</strong> How changes will be handled, priced, and
                      agreed in writing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Validity period:</strong> How long the quote is valid (typically 30
                      days)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cancellation terms:</strong> Notice period and any cancellation
                      charges
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Signature lines:</strong> Space for both parties to sign and date
                      acceptance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Commercial Clients &mdash; Subcontracts and Formal Terms
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Commercial electrical work operates in a different contractual landscape from
                domestic work, and the potential for conflict is proportionally greater because the
                financial stakes are higher and the contractual relationships are more complex. When
                you work as a subcontractor to a main contractor, you are operating within a layered
                contractual structure: the client has a contract with the main contractor, and the
                main contractor has a subcontract with you. Understanding the terms of your
                subcontract is not optional &mdash; it is essential for preventing disputes that can
                cost you tens of thousands of pounds.
              </p>

              <p>
                The construction industry uses several standard forms of contract, and you should be
                aware of the most common ones even if you do not use them directly.{' '}
                <strong>JCT (Joint Contracts Tribunal)</strong> contracts are the most widely used
                in the UK, particularly for building work.{' '}
                <strong>NEC (New Engineering Contract)</strong> forms are increasingly common,
                particularly on public sector projects, and are notable for their emphasis on
                collaborative working and early warning of problems. As a subcontractor, you may be
                working under a JCT Subcontract or an NEC Subcontract, and the terms of that
                contract will govern everything from payment schedules to variation procedures to
                dispute resolution mechanisms.
              </p>

              <p>
                The key areas to review in any commercial subcontract before signing are: the
                payment schedule (when are you paid, and what triggers payment?), the variation
                procedure (how are changes instructed, priced, and approved?), retention terms (how
                much is held back, for how long, and what triggers release?), programme obligations
                (what are your start and completion dates, and what are the consequences of delay?),
                and the dispute resolution clause (does the contract require adjudication,
                mediation, or arbitration before court proceedings?). Many electrical subcontractors
                sign contracts without reading these clauses and then discover, when a dispute
                arises, that they have agreed to terms that heavily favour the main contractor. The
                time to negotiate is before you sign, not after a dispute has started.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Commercial Contract Clauses Every Electrical Subcontractor Must Understand
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Payment terms:</strong> When interim applications are due, the payment
                      cycle (typically monthly), and the final account process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Pay-less notices:</strong> The main contractor&rsquo;s right to pay
                      less than the applied amount, the required notice period, and your right to
                      challenge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Variations:</strong> How changes are instructed (must be in writing),
                      how they are valued, and the procedure for claiming additional cost
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Retention:</strong> The percentage held (typically 5%), the defects
                      period, and the mechanism for release of retention
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Dispute resolution:</strong> The required steps before court action
                      (usually adjudication under the Construction Act)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Essential T&amp;Cs for Electricians
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your terms and conditions are not a legal formality to be copied from the internet
                and attached to your quote without thought. They are a practical tool that defines
                the rules of engagement between you and your client. Good T&amp;Cs prevent disputes
                by addressing the most common points of conflict before they arise. They do not need
                to be written in legal jargon or run to dozens of pages &mdash; a clear,
                plain-English document of one to two pages is more effective than a lengthy legal
                document that nobody reads.
              </p>

              <p>
                <strong>Payment terms</strong> are the foundation of your T&amp;Cs. Specify that
                payment is due within 14 days of invoice (or completion, whichever is earlier). For
                jobs over a certain value &mdash; commonly &pound;500 or &pound;1,000 &mdash;
                require a deposit before work commences (typically 20&ndash;30% of the quoted
                price). For larger jobs, include a stage payment schedule tied to milestones (for
                example, 30% deposit, 40% at first fix completion, 30% on final completion and
                testing). Specify that you reserve the right to charge statutory interest on late
                payments under the Late Payment of Commercial Debts (Interest) Act 1998 (currently
                8% plus the Bank of England base rate). This is not aggressive &mdash; it is your
                legal right and a powerful deterrent against late payment.
              </p>

              <p>
                <strong>The variation procedure</strong> is arguably the most important clause in
                your T&amp;Cs. State clearly that any work outside the original quoted scope must be
                agreed in writing before it is carried out, and that it will be charged at your
                standard rates or at a price agreed in advance. Include a simple process: the
                additional work is identified, a price is provided, the client agrees in writing
                (email or text is sufficient), and the work proceeds. Without this clause, you are
                vulnerable to the most common domestic dispute of all: the client who asks for
                &ldquo;a few extras&rdquo; during the job and then refuses to pay for them because
                they assumed they were included.
              </p>

              <p>
                Other essential clauses include: a <strong>cancellation policy</strong> (the
                Consumer Contracts Regulations 2013 give clients a 14-day cooling-off period for
                contracts agreed at a distance or off-premises, but you can specify reasonable
                cancellation charges for late cancellation after that period);{' '}
                <strong>liability limitations</strong>
                (you are liable for damage caused by your negligence, but not for pre-existing
                defects or consequential losses beyond your control); a{' '}
                <strong>dispute resolution clause</strong>
                (stating that disputes should first be raised directly with you in writing, then
                through mediation if unresolved, before any formal legal action); and an
                <strong> access clause</strong> (the client must provide safe, clear access to the
                work area, and you are not liable for delays caused by access problems).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Variation Procedure in Practice
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Scenario:</strong> During a rewire, the client asks you to add a spur for
                  a new electric shower that was not in the original quote.
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Step 1:</strong> Acknowledge the request positively: &ldquo;Yes, we can
                  absolutely do that for you.&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Step 2:</strong> Explain it is outside the original scope: &ldquo;That was
                  not included in the original quote, so it would be additional work.&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Step 3:</strong> Provide a price: &ldquo;The additional cost for the
                  shower circuit, including a new RCBO and 10mm cable run, would be &pound;380 plus
                  VAT.&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Step 4:</strong> Obtain written agreement: &ldquo;I will send you a quick
                  text to confirm &mdash; just reply with a yes and I will get it done.&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed">
                  <strong>Step 5:</strong> Document: Save the text exchange and reference it on the
                  final invoice as a variation to the original quote.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Verbal Agreements and the Confirmation Email
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Here is a legal fact that surprises many electricians: verbal agreements are legally
                binding in England and Wales. If you agree to do a job for a certain price and shake
                hands on it, that is a valid contract. The problem is not validity but
                <strong> enforceability</strong>. If a dispute arises about what was agreed, it
                becomes your word against the client&rsquo;s. In a small claims court, the judge
                will look for evidence of what was agreed, and a verbal agreement provides none. You
                might be entirely in the right, but without evidence, you cannot prove it.
              </p>

              <p>
                The solution is remarkably simple and takes less than a minute: the confirmation
                email or text message. Every time you agree something verbally with a client &mdash;
                whether it is the original job, an additional piece of work, a change in timeline,
                or a payment arrangement &mdash; follow it up immediately with a brief written
                confirmation. The message does not need to be formal. Something like: &ldquo;Hi
                Sarah, just to confirm our conversation today: we agreed to add 4 extra double
                sockets in the kitchen at &pound;320 plus VAT, bringing the revised total to
                &pound;4,120. The additional work will be done on Thursday. Let me know if I have
                got anything wrong.&rdquo; This message achieves several things simultaneously: it
                creates a contemporaneous written record that is admissible as evidence; it gives
                the client an immediate opportunity to correct any misunderstanding; it demonstrates
                professionalism; and it establishes a pattern that the client will come to expect
                and respect.
              </p>

              <p>
                Digital signing tools have made it even easier to formalise agreements without the
                friction of printing, signing, and scanning documents. Services like DocuSign,
                HelloSign, and even the signature features built into most invoicing platforms allow
                clients to review and sign quotes and T&amp;Cs on their phone in seconds. Many
                electricians now send their quote as a PDF with an electronic signature request, and
                the client can accept with a tap. The signed document is legally valid, timestamped,
                and stored securely. If you are still relying on verbal agreements or unsigned
                printed quotes, adopting digital signing is one of the easiest and most impactful
                changes you can make to your business processes this week.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Confirmation Email Template
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  Use this as a starting point for your own confirmation messages. Adapt the tone
                  and detail to suit your style and the complexity of the agreement:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-sm text-white leading-relaxed">
                    <em>
                      Hi [Name], just to confirm what we agreed today [date]: [description of the
                      work/change/agreement], at a cost of [amount] plus VAT. [Any timing or access
                      details]. This brings the revised total to [new total if applicable]. Please
                      let me know if I have got anything wrong or if you have any questions. Thanks,
                      [Your name]
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established that clear written agreements are the single most
                important tool for preventing conflict in electrical work. The key points to carry
                forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Written agreements prevent the most common disputes.</strong> The
                    majority of domestic electrical conflicts arise from unclear or absent written
                    terms. Five minutes of preparation saves hours of arguments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Quote vs estimate matters.</strong> A quote is a fixed price for a
                    defined scope. An estimate is an approximation. Using the wrong term creates
                    disputes. Use quotes with variation procedures for domestic work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Commercial contracts require careful review.</strong> Understand JCT and
                    NEC terms, payment schedules, variation procedures, and retention terms before
                    you sign.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Essential T&amp;Cs are non-negotiable.</strong> Payment terms, variation
                    procedure, cancellation policy, liability limitations, and dispute resolution
                    clause.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The confirmation email is your best daily habit.</strong> Every verbal
                    agreement should be followed by a brief written confirmation within minutes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Digital signing removes friction.</strong> Tools like DocuSign make it
                    easy for clients to accept quotes on their phone in seconds.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore
                  de-escalation techniques &mdash; what to do when conflict has already started and
                  emotions are running high. You will learn George Thompson&rsquo;s Verbal Judo
                  LEAPS model, the science behind the amygdala hijack, and a step-by-step process
                  for bringing the emotional temperature down.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5-section-2">
              Next: De-escalation Techniques
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
