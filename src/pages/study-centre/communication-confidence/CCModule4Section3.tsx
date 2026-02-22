import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'quote-validity',
    question:
      'A customer contacts you about a quote you issued six weeks ago. The quote did not include a validity period. They want to accept it at the original price, but material costs have risen 12% since you issued it. What is the best approach?',
    options: [
      'Honour the original price to maintain the relationship',
      'Refuse the work entirely',
      'Explain that without a stated validity period the quote is subject to current pricing, and issue a revised quote',
      'Add a surcharge without telling the customer',
    ],
    correctIndex: 2,
    explanation:
      'Without a stated validity period, there is no contractual obligation to hold the price indefinitely. The professional approach is to explain that costs have changed, issue a revised quote with the current price, and include a clear validity period (e.g. 30 days) this time. This protects your margin whilst being transparent with the customer.',
  },
  {
    id: 'scope-clarity',
    question:
      'Your quote for a domestic rewire states "rewire of property." The customer expects you to replaster all chased walls and redecorate. You did not intend to include this. What went wrong?',
    options: [
      'The customer is being unreasonable',
      'The scope of works was too vague and did not clearly state what was included and excluded',
      'Nothing &mdash; replastering is always a separate trade',
      'You should have charged more to cover replastering',
    ],
    correctIndex: 1,
    explanation:
      'A vague scope like "rewire of property" is open to interpretation. The quote should have explicitly listed what was included (e.g. first fix, second fix, testing, certification) AND what was excluded (e.g. replastering, decorating, flooring). Clear exclusions prevent scope disputes and protect both parties.',
  },
  {
    id: 'professional-language',
    question:
      'Which of the following is the most professional way to describe additional work that falls outside the original quote?',
    options: [
      '"That&rsquo;s extra, mate"',
      '"Any work not listed above will be charged at our day rate of &pound;350 + VAT"',
      '"We&rsquo;ll sort the price out later"',
      '"Extras will cost more"',
    ],
    correctIndex: 1,
    explanation:
      'Professional quotes clearly state how additional work will be priced. Specifying a day rate (or hourly rate) for variations gives the customer certainty and protects you from scope creep. Vague language like "extras will cost more" invites disputes because neither party has agreed what "more" means.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a quote and an estimate?',
    answer:
      'A quote is a fixed price for a defined scope of work. Once accepted, it forms a binding agreement and you are generally obligated to complete the work at that price (unless the scope changes). An estimate is an approximate indication of cost based on what you know at the time. It is not binding, and the final price may be higher or lower. Always make it clear which you are providing. Use the word "quotation" or "fixed price" if it is a quote, and "estimate" or "approximate cost" if it is an estimate. Confusing the two is one of the most common sources of disputes in the construction industry.',
  },
  {
    question: 'How long should a quote be valid for?',
    answer:
      'There is no legal requirement, but 30 days is the most common validity period for domestic electrical work. For larger commercial projects, 14 days is common for tender submissions. For projects with volatile material costs (e.g. copper-heavy installations), you may wish to limit validity to 14 days or include a material price fluctuation clause. Always state the validity period clearly on every quote, e.g. "This quotation is valid for 30 days from the date of issue."',
  },
  {
    question: 'Do I need to include VAT on my quotes?',
    answer:
      'If you are VAT-registered (turnover above the VAT threshold, currently &pound;90,000), you must charge VAT and should show it clearly on your quotes. Best practice is to show the net price, the VAT amount, and the gross total separately. If you are not VAT-registered, state "No VAT applicable" or "Not VAT registered" so the customer understands the price is the total. For domestic customers, always make it clear whether the quoted price includes or excludes VAT &mdash; this is a very common source of confusion and disputes.',
  },
  {
    question: 'Should I always provide a written quote, even for small jobs?',
    answer:
      'Yes. Even for small jobs (e.g. adding a socket, changing a light fitting), a brief written quote protects both you and the customer. It does not need to be a multi-page document &mdash; a clear text message or email confirming the scope, price, and any exclusions is sufficient. Verbal agreements are legally binding but extremely difficult to prove in the event of a dispute. The five minutes it takes to write a brief quote can save hours of argument and potential court proceedings later.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is an essential element that MUST be included in every professional quote?',
    options: [
      'A photograph of your van',
      'A clear scope of works describing exactly what is included',
      'Your National Insurance number',
      'The customer&rsquo;s date of birth',
    ],
    correctAnswer: 1,
    explanation:
      'A clear scope of works is the most critical element of any quote. It defines exactly what you will do, preventing misunderstandings and disputes. Without a clear scope, neither party can be certain what has been agreed.',
  },
  {
    id: 2,
    question: 'A quote states: "Full rewire &mdash; &pound;4,500." Why is this problematic?',
    options: [
      'The price is too low',
      'It does not specify the property address',
      'It lacks detail &mdash; there is no scope of works, no exclusions, no validity period, and no payment terms',
      'It should be handwritten, not typed',
    ],
    correctAnswer: 2,
    explanation:
      'A one-line quote with no detail is a recipe for disputes. "Full rewire" could mean different things to different people. The quote should specify what is included (circuits, accessories, testing, certification), what is excluded (plastering, decorating, building work), the validity period, and the payment terms.',
  },
  {
    id: 3,
    question: 'What is the purpose of listing exclusions on a quote?',
    options: [
      'To make the quote look longer and more professional',
      'To clearly define work that is NOT included, preventing scope disputes',
      'To discourage the customer from asking for extra work',
      'Exclusions are optional and serve no real purpose',
    ],
    correctAnswer: 1,
    explanation:
      'Exclusions are just as important as inclusions. They set a clear boundary around your scope of work. Common exclusions on electrical quotes include plastering/making good, decorating, building/carpentry work, asbestos removal, and any work to other services (plumbing, gas, drainage). Listing exclusions prevents the customer from assuming these items are included in the price.',
  },
  {
    id: 4,
    question:
      'A commercial tender requires you to submit a "schedule of rates." What does this mean?',
    options: [
      'A list of how quickly you can complete each task',
      'A breakdown of your hourly and daily labour rates, plus rates for common items of work',
      'A list of your favourite suppliers',
      'A timetable showing when each phase of work will be completed',
    ],
    correctAnswer: 1,
    explanation:
      'A schedule of rates is a document listing your charges for specific items of work (e.g. supply and install one double socket &mdash; &pound;XX, supply and install one 6A lighting circuit &mdash; &pound;XX). It is commonly used in commercial contracts and framework agreements so that the client can order work at pre-agreed prices without requiring a separate quote each time.',
  },
  {
    id: 5,
    question: 'Which phrase is ambiguous and should be avoided in a professional quote?',
    options: [
      '"Supply and install 12 No. double switched socket outlets to positions marked on drawing E-101"',
      '"Supply and install sockets as needed"',
      '"Labour rate for additional works: &pound;45/hour + VAT"',
      '"This quotation is valid for 30 days from the date of issue"',
    ],
    correctAnswer: 1,
    explanation:
      '"As needed" is dangerously vague. Who decides what is needed? How many sockets? Where? At what specification? The customer may interpret "as needed" as 20 sockets whilst you intended 8. Always specify quantities, locations (referencing drawings where available), and specifications.',
  },
  {
    id: 6,
    question:
      'Your domestic rewire quote includes "making good to chased walls with bonding coat only." The customer later complains that the walls are not ready for painting. Is this a valid complaint?',
    options: [
      'Yes &mdash; you should have finished the walls to a paintable standard',
      'No &mdash; the quote clearly states "bonding coat only," which means skim plastering and decoration are excluded',
      'It depends on the weather',
      'Yes &mdash; all electrical work must include full decoration',
    ],
    correctAnswer: 1,
    explanation:
      'Because the quote clearly specified "bonding coat only," the customer was informed that skim plastering was not included. This is an example of how precise language in a quote protects you from disputes. If the quote had simply said "making good," the customer could reasonably argue that this means a finished, paintable surface.',
  },
  {
    id: 7,
    question: 'What is a "variation" in the context of a quoted project?',
    options: [
      'A mistake in the original quote',
      'A change to the agreed scope of work, typically resulting in an additional cost or credit',
      'A different type of cable',
      'A discount offered to a returning customer',
    ],
    correctAnswer: 1,
    explanation:
      'A variation (also called a "variation order" or "VO" on commercial projects) is any change to the originally agreed scope of work. Variations should be agreed in writing before the additional work is carried out, with a clear description of the change and the associated cost. Never carry out variations based on verbal instructions alone &mdash; always confirm in writing.',
  },
  {
    id: 8,
    question:
      'Which of the following payment term structures is most professional for a domestic rewire?',
    options: [
      '"Pay me when you can"',
      '"Cash on completion, no invoice"',
      '"30% deposit on acceptance, 40% at first fix completion, 30% on completion and certification"',
      '"Full payment upfront before any work begins"',
    ],
    correctAnswer: 2,
    explanation:
      'Staged payments tied to project milestones are the most professional and fair approach for larger domestic jobs. They protect you (you are never too far ahead on costs) and the customer (they only pay for completed stages). Each payment stage should be clearly defined and tied to a measurable milestone. For smaller jobs, "payment on completion" is acceptable.',
  },
];

export default function CCModule4Section3() {
  useSEO({
    title: 'Quotes, Proposals & Written Agreements | Communication & Confidence Module 4.3',
    description:
      'Learn professional quote structure, scope of works, exclusions, pricing, validity periods, payment terms, and how to avoid scope disputes in domestic and commercial electrical work.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <FileText className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Quotes, Proposals &amp; Written Agreements
          </h1>
          <p className="text-white max-w-xl mx-auto">
            Quote structure, professional language, avoiding ambiguity, and practical examples for
            domestic and commercial electrical work
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Every quote needs five things:</strong> scope, exclusions, price,
                    validity period, and payment terms.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Exclusions are as important as inclusions</strong> &mdash; if you do not
                    list what is excluded, customers will assume it is included.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Be specific, not vague:</strong> &ldquo;12 No. double switched socket
                    outlets&rdquo; not &ldquo;sockets as needed.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Always state the validity period:</strong> 30 days is standard for
                    domestic work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Written beats verbal:</strong> Even a brief text or email confirming
                    scope and price protects both parties.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">For Electricians</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Quote vs estimate:</strong> A quote is a fixed price. An estimate is
                    approximate. Always make clear which you are providing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Scope disputes</strong> are the number one cause of payment arguments in
                    domestic electrical work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Variations:</strong> Never carry out extra work without written
                    agreement on the additional cost first.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Staged payments</strong> for larger jobs protect your cash flow and the
                    customer&rsquo;s confidence.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Structure a professional quote with all five essential elements: scope, exclusions,
                price, validity, and terms
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Write clear, unambiguous scope descriptions using specific quantities and locations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain the difference between a quote and an estimate, and when to use each
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Draft exclusions that prevent scope disputes on domestic and commercial projects
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Set appropriate payment terms and staged payment schedules for different job sizes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Handle variations professionally with written confirmation before proceeding
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: The Five Essential Elements of a Professional Quote */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">01</span>
              The Five Essential Elements of a Professional Quote
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A professional quote is not just a price on a piece of paper. It is a document that
                defines the agreement between you and your customer. Every quote you issue &mdash;
                whether for a single socket or a full commercial fit-out &mdash; should contain five
                essential elements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <FileText className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The Five Elements
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Scope of Works</h4>
                        <p className="text-white text-sm">
                          A detailed description of exactly what work you will carry out. Be
                          specific: quantities, locations, specifications, and standards. Reference
                          drawings or room names where applicable. The scope is the most important
                          element &mdash; vague scopes cause disputes.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Exclusions</h4>
                        <p className="text-white text-sm">
                          A clear list of work that is <strong>NOT</strong> included. Common
                          exclusions for electrical work: plastering/making good, decorating,
                          building work, asbestos removal, work to other services,
                          scaffolding/access equipment, and any work requiring additional surveys or
                          approvals.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Price</h4>
                        <p className="text-white text-sm">
                          The total cost, clearly showing whether it includes or excludes VAT. If
                          VAT-registered, show net + VAT + gross. State whether the price is fixed
                          (quotation) or approximate (estimate). Include the rate for any additional
                          work outside the scope.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Validity Period</h4>
                        <p className="text-white text-sm">
                          How long the quoted price is valid for. Standard periods: 30 days for
                          domestic work, 14 days for commercial tenders. After the validity period
                          expires, you are not obligated to honour the quoted price. Always include
                          a specific date or duration.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Payment Terms</h4>
                        <p className="text-white text-sm">
                          When and how payment is expected. Options include: payment on completion
                          (small jobs), staged payments tied to milestones (larger jobs), or net 30
                          days from invoice (commercial). Specify the payment method(s) you accept
                          and any deposit requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Missing Any Element Invites Disputes
                  </h3>
                </div>
                <p className="text-white text-sm">
                  If your quote is missing any of these five elements, you are leaving room for
                  misunderstanding. The most common disputes in electrical work come from{' '}
                  <strong>vague scope descriptions</strong> and <strong>missing exclusions</strong>.
                  A customer who assumes plastering is included in your rewire price is not being
                  unreasonable &mdash; they are interpreting your silence as inclusion. Be explicit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Good vs Bad Quote — Domestic Rewire Example */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">02</span>
              Good vs Bad Quote &mdash; Domestic Rewire Example
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The difference between a professional quote and a poor one is often the difference
                between getting paid without argument and spending weeks in a dispute. Let&rsquo;s
                compare two quotes for the same job: a full domestic rewire of a 3-bedroom
                semi-detached house.
              </p>

              {/* Bad Quote */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsDown className="h-5 w-5 text-red-400" />
                  <h3 className="text-red-300 font-semibold">Bad Quote</h3>
                </div>
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 font-mono text-sm space-y-2">
                  <p className="text-white">Hi mate,</p>
                  <p className="text-white">Full rewire &mdash; &pound;4,500</p>
                  <p className="text-white">Cheers, Dave</p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-white text-sm font-semibold">What&rsquo;s wrong:</p>
                  <ul className="text-white text-sm space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        No scope of works &mdash; what does &ldquo;full rewire&rdquo; include?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        No exclusions &mdash; is plastering included? Decorating? Building work?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>No VAT indication &mdash; is &pound;4,500 inclusive or exclusive?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>No validity period &mdash; is this price valid forever?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        No payment terms &mdash; when is payment due? Staged or on completion?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>No business details, address, or reference number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Informal language (&ldquo;Hi mate&rdquo;) undermines professionalism
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Good Quote */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsUp className="h-5 w-5 text-green-400" />
                  <h3 className="text-green-300 font-semibold">Good Quote</h3>
                </div>
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-3">
                  <div>
                    <p className="text-white font-semibold">D. Smith Electrical Ltd</p>
                    <p className="text-white">NICEIC Approved Contractor &bull; Reg. No. 12345</p>
                    <p className="text-white">VAT Reg: GB 123 4567 89</p>
                  </div>
                  <hr className="border-white/10" />
                  <div>
                    <p className="text-white">
                      <strong>Quotation Ref:</strong> DSE-2025-0147
                    </p>
                    <p className="text-white">
                      <strong>Date:</strong> 15 January 2025
                    </p>
                    <p className="text-white">
                      <strong>Client:</strong> Mr J. Wilson
                    </p>
                    <p className="text-white">
                      <strong>Property:</strong> 42 Oak Lane, Manchester, M20 3AB
                    </p>
                  </div>
                  <hr className="border-white/10" />
                  <div>
                    <p className="text-white font-semibold mb-2">
                      Scope of Works &mdash; Full Domestic Rewire
                    </p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Strip out existing wiring throughout (currently rubber/lead sheathed)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install new 18th Edition consumer unit with RCBO protection to
                          all circuits
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install 8 No. ring final circuits (twin &amp; earth
                          2.5mm&sup2;)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install 6 No. lighting circuits (twin &amp; earth 1.5mm&sup2;)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install 32 No. double switched socket outlets (white)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Supply and install 14 No. ceiling rose/pendant positions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install 1 No. dedicated 32A radial for electric cooker
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install 1 No. dedicated 20A radial for immersion heater
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Supply and install smoke/heat detection to BS 5839-6 Grade D Category LD2
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Full testing, certification (EICR) and Building Control notification via
                          NICEIC
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Making good to chased walls with bonding coat only</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Exclusions</p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Skim plastering, decoration, and any finishing trades</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Building work, carpentry, or structural alterations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Asbestos removal (if encountered, will require specialist contractor)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Work to other services (plumbing, gas, drainage)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>External/garden electrical work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Light fittings (allowance for standard pendants only; customer to supply
                          any decorative fittings)
                        </span>
                      </li>
                    </ul>
                  </div>
                  <hr className="border-white/10" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white">
                        <strong>Net:</strong> &pound;4,500.00
                      </p>
                      <p className="text-white">
                        <strong>VAT (20%):</strong> &pound;900.00
                      </p>
                      <p className="text-white font-semibold">
                        <strong>Total:</strong> &pound;5,400.00
                      </p>
                    </div>
                    <div>
                      <p className="text-white">
                        <strong>Additional works:</strong> &pound;350/day + VAT
                      </p>
                    </div>
                  </div>
                  <hr className="border-white/10" />
                  <div>
                    <p className="text-white">
                      <strong>Validity:</strong> This quotation is valid for 30 days from the date
                      of issue.
                    </p>
                    <p className="text-white">
                      <strong>Payment terms:</strong> 30% deposit on acceptance (&pound;1,620), 40%
                      at first fix completion (&pound;2,160), 30% on completion and certification
                      (&pound;1,620).
                    </p>
                    <p className="text-white">
                      <strong>Estimated duration:</strong> 8&ndash;10 working days.
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-white text-sm font-semibold">What&rsquo;s right:</p>
                  <ul className="text-white text-sm space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Detailed scope with specific quantities and specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Clear exclusions &mdash; no room for misinterpretation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Price broken down (net, VAT, gross) with day rate for extras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>30-day validity period clearly stated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Staged payment terms tied to milestones with exact amounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Professional business details, reference number, registration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Professional Language & Avoiding Ambiguity */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">03</span>
              Professional Language &amp; Avoiding Ambiguity
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The language you use in your quotes directly affects how professional you appear and
                how clearly your offer is understood. Ambiguous language is the single biggest cause
                of scope disputes. Every word should be precise and leave no room for
                interpretation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Eye className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Ambiguous vs Precise Language
                </h3>
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <p className="text-red-300 font-medium text-sm mb-2">Ambiguous (Avoid)</p>
                      <ul className="text-white text-sm space-y-2">
                        <li>&ldquo;Install sockets as needed&rdquo;</li>
                        <li>&ldquo;Rewire the house&rdquo;</li>
                        <li>&ldquo;Make good after work&rdquo;</li>
                        <li>&ldquo;Extras will cost more&rdquo;</li>
                        <li>&ldquo;Sort out the lighting&rdquo;</li>
                        <li>&ldquo;Upgrade the board&rdquo;</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="text-green-300 font-medium text-sm mb-2">Precise (Use)</p>
                      <ul className="text-white text-sm space-y-2">
                        <li>
                          &ldquo;Supply and install 12 No. double switched socket outlets to
                          positions agreed on site&rdquo;
                        </li>
                        <li>&ldquo;Full rewire as per scope of works listed above&rdquo;</li>
                        <li>&ldquo;Making good to chased walls with bonding coat only&rdquo;</li>
                        <li>
                          &ldquo;Additional works at &pound;350/day + VAT, agreed in writing before
                          commencing&rdquo;
                        </li>
                        <li>
                          &ldquo;Supply and install 6 No. 6A lighting circuits with LED downlights
                          to kitchen and bathrooms&rdquo;
                        </li>
                        <li>
                          &ldquo;Supply and install 18th Edition consumer unit with 12-way RCBO
                          board&rdquo;
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Key Principles for Quote Language
                </h3>
                <ul className="text-white space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use &ldquo;No.&rdquo; for quantities:</strong> &ldquo;12 No. double
                      socket outlets&rdquo; is standard construction industry notation, clear and
                      unambiguous.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>
                        Specify &ldquo;supply and install&rdquo; or &ldquo;install only&rdquo;:
                      </strong>{' '}
                      This makes clear whether you are providing the materials or whether the
                      customer is. If the customer is supplying materials, state &ldquo;customer to
                      supply all materials; labour only.&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Reference standards:</strong> &ldquo;to BS 7671:2018+A2:2022&rdquo; or
                      &ldquo;to BS 5839-6 Grade D Category LD2&rdquo; demonstrates competence and
                      removes doubt about the standard of work.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Avoid slang and abbreviations:</strong> &ldquo;CU&rdquo; means nothing
                      to a domestic customer. Write &ldquo;consumer unit&rdquo; in full.
                      &ldquo;Downies&rdquo; should be &ldquo;LED downlights.&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use formal but plain English:</strong> You do not need legal jargon.
                      Clear, direct sentences are more professional than complicated language the
                      customer cannot understand.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  The &ldquo;Making Good&rdquo; Trap
                </h3>
                <p className="text-white text-sm">
                  &ldquo;Making good&rdquo; is one of the most disputed phrases in domestic
                  electrical work. To an electrician, it typically means filling chases with bonding
                  coat. To a customer, it often means a fully finished, paintable surface. Always
                  specify exactly what your making good includes: &ldquo;bonding coat only&rdquo;,
                  &ldquo;bonding and skim to a paintable finish&rdquo;, or &ldquo;no making good
                  included &mdash; customer to arrange plasterer.&rdquo; Never leave &ldquo;making
                  good&rdquo; undefined.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Commercial Tenders & Scope Disputes */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">04</span>
              Commercial Tenders &amp; Scope Disputes
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Commercial projects introduce additional complexity. You may be submitting a tender
                response to a main contractor, working to architect&rsquo;s drawings, pricing a bill
                of quantities, or providing a schedule of rates. The principles are the same as
                domestic work &mdash; clarity, specificity, exclusions &mdash; but the stakes are
                higher and the documents more formal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Commercial Tender Essentials</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Bill of Quantities (BoQ)</h4>
                        <p className="text-white text-sm">
                          A detailed list of every item of work with quantities, provided by the
                          client&rsquo;s quantity surveyor. You price each line. Check every
                          quantity against the drawings &mdash; errors in the BoQ are common and can
                          cost you thousands.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Schedule of Rates</h4>
                        <p className="text-white text-sm">
                          A list of your charges for specific items (e.g. &ldquo;supply and install
                          1 No. double socket outlet &mdash; &pound;XX&rdquo;). Used in framework
                          agreements where work is ordered as needed. Price carefully &mdash; these
                          rates may apply for months or years.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          Qualifications &amp; Clarifications
                        </h4>
                        <p className="text-white text-sm">
                          Your tender response should include a &ldquo;qualifications&rdquo; section
                          listing any assumptions, conditions, or items you have excluded. This is
                          your protection against scope creep. For example: &ldquo;Our price is
                          based on drawing revision C dated 12/01/2025. Any subsequent drawing
                          revisions may result in a variation.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Variations &amp; VOs</h4>
                        <p className="text-white text-sm">
                          Any change to the agreed scope is a variation. On commercial projects,
                          this is typically managed through a formal{' '}
                          <strong>Variation Order (VO)</strong> process. Never carry out variation
                          work without a written instruction from the main contractor or client. Get
                          the VO number, agree the cost in writing, and keep records.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scope Dispute Example */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Real-World Scope Dispute Example
                </h3>
                <div className="space-y-3 text-white text-sm">
                  <p>
                    <strong>Scenario:</strong> An electrical subcontractor prices a commercial
                    office fit-out based on Revision B drawings. During the project, the architect
                    issues Revision D drawings with 40 additional power outlets and a complete
                    redesign of the lighting layout. The main contractor instructs the electrician
                    to proceed with the new drawings without issuing a formal Variation Order.
                  </p>
                  <p>
                    <strong>The electrician completes the extra work</strong> and submits a final
                    account &pound;18,000 above the original tender price. The main contractor
                    refuses to pay, claiming &ldquo;the scope was always based on final
                    drawings.&rdquo;
                  </p>
                  <p>
                    <strong>What went wrong:</strong> The electrician carried out significant
                    additional work without obtaining a written Variation Order or written agreement
                    on the additional cost before starting the extra work.
                  </p>
                  <p>
                    <strong>How to prevent this:</strong> When drawings change, immediately notify
                    the main contractor in writing. Identify the additional work and cost. Do not
                    proceed until you have written authorisation and an agreed price for the
                    variation. If the main contractor instructs you to proceed verbally, follow up
                    immediately with an email confirming the instruction and the associated cost.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Golden Rule: Never Do Extra Work Without Written Agreement
                  </h3>
                </div>
                <p className="text-white text-sm">
                  This applies to domestic and commercial work equally. If a customer asks for
                  additional sockets, a different lighting layout, or any change to the original
                  quote,{' '}
                  <strong>
                    agree the additional cost in writing before starting the extra work
                  </strong>
                  . A simple email or text message confirming &ldquo;the additional 4 sockets will
                  be &pound;320 + VAT on top of the quoted price&rdquo; is sufficient. Verbal
                  agreements are almost impossible to enforce if the customer later disputes the
                  charge.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Payment Terms & Protecting Your Cash Flow */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">05</span>
              Payment Terms &amp; Protecting Your Cash Flow
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Getting the work right is only half the job. Getting paid promptly is the other
                half. Clear payment terms set expectations from the start and reduce the risk of
                late payment or non-payment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Payment Structures by Job Size</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      Small Jobs (under &pound;500)
                    </h4>
                    <p className="text-white text-sm">
                      Payment on completion is standard. Invoice on the day the work is finished.
                      Accept card payments on site where possible &mdash; waiting for a bank
                      transfer increases the risk of late payment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      Medium Jobs (&pound;500&ndash;&pound;3,000)
                    </h4>
                    <p className="text-white text-sm">
                      Consider a deposit (typically 20&ndash;30%) on acceptance, with the balance on
                      completion. The deposit covers your initial material costs and demonstrates
                      the customer&rsquo;s commitment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      Large Jobs (over &pound;3,000)
                    </h4>
                    <p className="text-white text-sm">
                      Staged payments tied to milestones: e.g. 30% deposit, 40% at first fix, 30% on
                      completion and certification. Each stage should be clearly defined so both
                      parties know when payment is due. Never allow yourself to be more than one
                      stage ahead of payment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Commercial Work</h4>
                    <p className="text-white text-sm">
                      Typically net 30 days from invoice (or as specified in the subcontract
                      agreement). Submit monthly valuations. Familiarise yourself with the Late
                      Payment of Commercial Debts (Interest) Act 1998, which entitles you to
                      statutory interest on overdue invoices. Ensure your contract terms are agreed
                      before you start.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Late Payment Remedies</h3>
                <p className="text-white text-sm mb-3">
                  If a customer does not pay on time, you have several options:
                </p>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Polite reminder:</strong> A professional follow-up email or letter,
                      referencing the invoice number and due date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Statutory interest:</strong> For commercial debts, you can charge 8% +
                      Bank of England base rate on overdue amounts, plus a fixed compensation sum
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Letter before action:</strong> A formal letter giving 14 days to pay
                      before you commence court proceedings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Small claims court:</strong> For debts under &pound;10,000, the small
                      claims track is straightforward and does not require a solicitor
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Quick Quote Template Checklist */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">06</span>
              Quick Quote Template Checklist
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Before sending any quote, run through this checklist. If you can tick every item,
                your quote is professional and defensible.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Pre-Send Checklist</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-2">Header &amp; Details</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Your business name, address, contact details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Registration numbers (NICEIC, NAPIT, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>VAT registration number (if applicable)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Customer name and property address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Quote reference number and date</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-2">Scope &amp; Exclusions</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Detailed scope with quantities and specifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Drawing references (if applicable)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Clear exclusions list</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>&ldquo;Making good&rdquo; defined precisely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Testing and certification included/excluded stated</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-2">Pricing</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Net price, VAT, and gross total shown separately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Day/hourly rate for additional works stated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Fixed price or estimate clearly stated</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-2">Terms</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Validity period (e.g. 30 days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Payment terms and schedule</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Estimated duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                        <span>Acceptance method (signature, email, etc.)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4-section-4">
              Next: Digital Communication &amp; Social Media
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
