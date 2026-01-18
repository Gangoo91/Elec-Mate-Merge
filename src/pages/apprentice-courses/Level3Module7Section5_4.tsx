/**
 * Level 3 Module 7 Section 5.4 - Pricing and Estimating
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Pricing and Estimating for Electricians - Level 3 Module 7 Section 5.4";
const DESCRIPTION = "Master pricing and estimating for electrical work. Learn to calculate costs accurately, create competitive quotations, understand tendering processes, and price for profit.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the key difference between an estimate and a quotation?",
    options: [
      "Estimates are more detailed than quotations",
      "An estimate is approximate and may change; a quotation is a fixed price",
      "Quotations are always cheaper than estimates",
      "There is no difference"
    ],
    correctIndex: 1,
    explanation: "An estimate is an approximate cost that may change based on actual work required. A quotation is a fixed price for defined work that you're committed to unless the scope changes. Make sure clients understand which they're receiving."
  },
  {
    id: "check-2",
    question: "Which costs should you include when calculating your charge-out rate?",
    options: [
      "Just materials and your hourly wage",
      "All costs: wages, overheads (van, insurance, tools, training, admin), and profit margin",
      "Only the costs visible to the customer",
      "The same as your competitors charge"
    ],
    correctIndex: 1,
    explanation: "Your charge-out rate must cover all business costs including wages, vehicle costs, insurance, tools and equipment, training, office costs, marketing, and include a profit margin. Failing to account for all costs leads to losses."
  },
  {
    id: "check-3",
    question: "When should you provide a provisional sum in a quotation?",
    options: [
      "Never - all costs should be fixed",
      "When there's uncertainty about an element that cannot be fully assessed until work begins",
      "Only for materials",
      "When you want to charge more later"
    ],
    correctIndex: 1,
    explanation: "Provisional sums are appropriate when elements cannot be fully assessed before work starts, such as hidden wiring conditions or unknown cable routes. Clearly explain what's provisional and why."
  },
  {
    id: "check-4",
    question: "What should you do before pricing a complex job?",
    options: [
      "Guess based on similar jobs",
      "Conduct a thorough site survey, ask questions, and identify all requirements",
      "Use a standard price list regardless of specifics",
      "Wait for the customer to tell you what to charge"
    ],
    correctIndex: 1,
    explanation: "A thorough site survey is essential for complex jobs. Assess existing installation condition, access difficulties, specific requirements, and potential hidden issues. This prevents costly surprises."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does 'daywork' or 'day rate' pricing typically mean?",
    options: [
      "A fixed price for the whole job",
      "Charging a set rate per day (or hour) plus materials, rather than a fixed job price",
      "Only working during daytime hours",
      "Pricing based on materials only"
    ],
    correctAnswer: 1,
    explanation: "Daywork means charging a set rate per day (or hourly rate) plus materials at cost. It's often used when scope is uncertain or for maintenance work where you can't predict exactly what's needed."
  },
  {
    id: 2,
    question: "What is a 'bill of quantities' in tendering?",
    options: [
      "Your bank statement",
      "A detailed breakdown of all items, quantities, and rates required for a project",
      "A shopping list for materials",
      "An invoice for completed work"
    ],
    correctAnswer: 1,
    explanation: "A bill of quantities (BoQ) is a document prepared by a quantity surveyor listing all items of work, their quantities, and space for contractors to insert rates. It allows like-for-like comparison of tenders."
  },
  {
    id: 3,
    question: "When pricing electrical work, what is 'on-costs' or 'uplift' typically for?",
    options: [
      "Profit only",
      "Materials wastage, overheads, and profit added to direct costs",
      "Just VAT",
      "Transport costs only"
    ],
    correctAnswer: 1,
    explanation: "On-costs or uplift covers indirect costs not directly attributable to a job: company overheads, materials wastage, transport, insurance, and profit margin. It's typically applied as a percentage to direct costs."
  },
  {
    id: 4,
    question: "What should you include in your quotation exclusions?",
    options: [
      "Nothing - include everything",
      "Work outside the quoted scope: making good, other trades' work, unforeseen issues",
      "Only items you've forgotten",
      "Items you might add later for profit"
    ],
    correctAnswer: 1,
    explanation: "Exclusions should clearly state what's NOT included: making good (plastering, decorating), work by other trades, building control fees, scaffolding hire, unexpected remedial work. This prevents disputes."
  },
  {
    id: 5,
    question: "What is 'value engineering' in the context of tendering?",
    options: [
      "Charging more than competitors",
      "Reducing costs while maintaining required functionality and quality",
      "Always choosing the cheapest materials",
      "Increasing profit margins"
    ],
    correctAnswer: 1,
    explanation: "Value engineering involves finding ways to reduce costs while still meeting requirements. This might mean suggesting alternative materials, methods, or designs that achieve the same result more efficiently."
  },
  {
    id: 6,
    question: "Why might you price a job lower than normal?",
    options: [
      "Because the customer asked nicely",
      "Strategic reasons: winning work from a new client, filling quiet periods, or gaining experience in a new area",
      "Pricing low is always a good strategy",
      "Never - always maintain maximum prices"
    ],
    correctAnswer: 1,
    explanation: "There can be strategic reasons to price competitively: establishing relationships with new clients, keeping teams busy during quiet periods, or gaining experience in new sectors. However, never price below cost."
  },
  {
    id: 7,
    question: "How should you handle material price increases during a long project?",
    options: [
      "Absorb all costs yourself",
      "Include a price variation clause in your quotation for material price changes",
      "Stop the work until prices return to normal",
      "Charge whatever you want"
    ],
    correctAnswer: 1,
    explanation: "For longer projects, include a price variation clause allowing adjustment for significant material price changes. Set a threshold (e.g., 5% increase) and define how adjustments will be calculated."
  },
  {
    id: 8,
    question: "What information should you gather during a site survey for pricing?",
    options: [
      "Just the customer's budget",
      "Scope of work, access issues, existing installation condition, special requirements, cable routes",
      "Only the number of socket outlets",
      "The previous contractor's price"
    ],
    correctAnswer: 1,
    explanation: "A thorough site survey gathers: exact scope, access difficulties, existing installation condition, cable routes, floor types, special requirements, working hours restrictions, and any factors affecting complexity."
  },
  {
    id: 9,
    question: "What is the purpose of including assumptions in your quotation?",
    options: [
      "To confuse the customer",
      "To document the basis of your pricing and protect against scope creep",
      "To make the quotation look longer",
      "Assumptions are not necessary"
    ],
    correctAnswer: 1,
    explanation: "Assumptions document what your price is based on. For example, 'assumes existing circuits are in serviceable condition'. If assumptions prove wrong, you have grounds for variation orders."
  },
  {
    id: 10,
    question: "When responding to a formal tender, what must you ensure?",
    options: [
      "Just submit your lowest price",
      "Follow all instructions exactly, submit on time, include all required documents",
      "Negotiate with the client before submitting",
      "Submit multiple different prices"
    ],
    correctAnswer: 1,
    explanation: "Formal tenders have strict requirements. Follow all instructions exactly, meet the deadline, include all required documents (method statements, H&S policy, insurance certificates), and price correctly against any bill of quantities."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How do I calculate my hourly or daily rate?",
    answer: "Add up all annual costs: your desired salary, employer's NI, vehicle costs, insurance, tools, training, office costs, phone, professional fees. Divide by productive hours/days (typically 220 days accounting for holidays, training, admin, and quiet periods). Add your profit margin. Most electricians' charge-out rates are 2-3x their hourly wage."
  },
  {
    question: "Should I price jobs hourly or fixed price?",
    answer: "It depends on the job. Fixed prices work well for defined scope jobs where you can accurately estimate time. Daywork is better for uncertain scope, reactive maintenance, or diagnostic work. Many contractors offer both options to suit different situations."
  },
  {
    question: "How do I compete with cheaper competitors?",
    answer: "Don't compete purely on price - that's a race to the bottom. Compete on quality, reliability, professionalism, and value. Explain what your price includes that cheap competitors might not: quality materials, proper testing, documentation, warranties, insurance. Some customers always want cheapest; let them go."
  },
  {
    question: "What markup should I add to materials?",
    answer: "Typical material markups are 15-30%. This covers your time sourcing, collecting, and managing materials, plus wastage. For materials you stock regularly, you might markup more. For special orders at customer request, markup might be less. Consider your cash flow impact of buying materials."
  },
  {
    question: "How do I handle customers who say my quote is too high?",
    answer: "Ask what they're comparing against. Often cheap quotes exclude things yours includes. Walk through your quotation explaining each element. If they've had a significantly cheaper quote, they're probably not your customer - wishing them well and moving on is often the right response."
  },
  {
    question: "Should I break down my quotation in detail?",
    answer: "Provide enough detail to be clear about scope without giving away your pricing structure. Clients don't need to see your profit margin, but should understand what's included. For commercial work, more detail is often expected. For domestic work, a clear scope description with total price often works."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pricing and Estimating
          </h1>
          <p className="text-white/80">
            Calculate costs accurately and price your work profitably
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Site Survey:</strong> Gather all information before pricing</li>
              <li><strong>True Costs:</strong> Include all overheads plus profit margin</li>
              <li><strong>Clear Scope:</strong> Define inclusions, exclusions, assumptions</li>
              <li><strong>Variations:</strong> Document changes and get approval before proceeding</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hidden complexities that add time and cost</li>
              <li><strong>Use:</strong> Systematic approach to pricing every job</li>
              <li><strong>Apply:</strong> Clear documentation prevents disputes</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate your true costs and set profitable rates",
              "Conduct effective site surveys for accurate pricing",
              "Structure professional quotations that protect your interests",
              "Understand the difference between estimates and quotations",
              "Handle variations and additional work professionally",
              "Respond to formal tenders correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Your Costs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate pricing starts with understanding your true costs. Many electricians undercharge because they only consider direct costs (labour and materials) without accounting for all the overheads that enable them to do business.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Direct Costs (per job)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Labour time on the job</li>
                  <li>Materials used</li>
                  <li>Travel time and fuel for that job</li>
                  <li>Hire equipment if needed</li>
                  <li>Subcontractor costs if any</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Indirect Costs (overheads)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Vehicle purchase/lease, insurance, maintenance</li>
                  <li>Tools and test equipment</li>
                  <li>Insurance (public liability, employers', professional)</li>
                  <li>Training and qualifications</li>
                  <li>Phone, software, accounting, admin time</li>
                  <li>Scheme memberships (NICEIC, etc.)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Your charge-out rate must cover all costs including overheads, not just your hourly wage. If you earn 20 per hour employed, you need to charge 40-60 per hour self-employed to cover everything plus profit.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Site Surveys and Information Gathering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The quality of your pricing depends on the quality of your information. A thorough site survey prevents costly surprises and gives you confidence in your pricing. Never price complex work without visiting site.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Site Survey Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Exact scope of work - what does the client actually want?</li>
                <li>Existing installation condition - any remedial work needed?</li>
                <li>Access issues - scaffolding, working hours, security clearance?</li>
                <li>Cable routes - what floor/wall construction? Any issues?</li>
                <li>Consumer unit position - capacity and condition?</li>
                <li>Special requirements - specific materials, coordination with others?</li>
                <li>Programme - when must work be complete? Any constraints?</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Questions to Ask:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Has any electrical work been done recently?</li>
                <li>Are there any known problems with the existing installation?</li>
                <li>Who will do making good after the work?</li>
                <li>Are there any access restrictions or working hour limits?</li>
                <li>When do you need the work completed by?</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For a rewire quote, you need to know: property size and construction, number of floors, loft access, whether decoration will be done after, existing consumer unit condition, and whether the client wants specific products or finishes.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Structuring Your Quotation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A well-structured quotation protects you and builds client confidence. It should be clear about what's included, what's excluded, and any assumptions that affect the price.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Scope</p>
                <p className="text-white/90 text-xs">What work will be done</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Exclusions</p>
                <p className="text-white/90 text-xs">What's NOT included</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Assumptions</p>
                <p className="text-white/90 text-xs">What price is based on</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Quotation Contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Your company details and client details</li>
                <li>Site address if different from client address</li>
                <li>Clear description of work to be carried out</li>
                <li>Materials to be used (specify brands where relevant)</li>
                <li>Total price (inclusive of VAT if registered, or state plus VAT)</li>
                <li>Payment terms (deposit, stage payments, completion)</li>
                <li>Validity period (typically 30 days)</li>
                <li>Exclusions list</li>
                <li>Assumptions</li>
                <li>Terms and conditions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Exclusions protect you from scope creep. Common exclusions: making good (plastering, decorating), asbestos removal, structural alterations, building control fees, and work by other trades.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handling Variations and Tendering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even with thorough surveys, unforeseen issues arise. Having a clear process for variations prevents disputes. For commercial work, understanding formal tendering processes is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Variation Order Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Identify additional or changed work</li>
                <li>2. Document clearly what's needed and why</li>
                <li>3. Provide written quotation for the variation</li>
                <li>4. Obtain client approval BEFORE proceeding</li>
                <li>5. Keep variation record with project documentation</li>
                <li>6. Include variation costs on final invoice clearly</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Formal Tendering Tips:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Read ALL tender documents carefully before starting</li>
                <li>Note the deadline and submit with time to spare</li>
                <li>Price against any bill of quantities exactly as specified</li>
                <li>Include all requested documents (H&S policy, insurance, etc.)</li>
                <li>Ask questions through the proper channel if unclear</li>
                <li>Follow the submission format required</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> During a kitchen rewire, you discover the existing wiring is in poorer condition than expected and needs more work. Stop, document the issue with photos, explain to the client, provide a written variation price, and only proceed once approved.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pricing Strategies</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fixed price:</strong> Best for defined scope - rewards efficiency</li>
                <li><strong>Daywork:</strong> Best for uncertain scope - reduces risk but may concern clients</li>
                <li><strong>Daywork with maximum:</strong> Compromise - daywork up to a capped figure</li>
                <li><strong>Schedule of rates:</strong> Pre-agreed rates for common tasks</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Price Confidence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Track actual time and costs on jobs to improve future estimates</li>
                <li>Build a database of typical job costs for common work</li>
                <li>Review completed jobs: did you make expected margin?</li>
                <li>Identify where you consistently over or underestimate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting overheads</strong> - Include all costs, not just labour and materials</li>
                <li><strong>Vague scope</strong> - Be specific about what's included and excluded</li>
                <li><strong>No contingency</strong> - Add allowance for unforeseen issues</li>
                <li><strong>Price pressure</strong> - Don't cut price below sustainable levels</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Pricing</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Quotation Essentials</p>
                <ul className="space-y-0.5">
                  <li>Clear scope of work</li>
                  <li>Materials specification</li>
                  <li>Exclusions list</li>
                  <li>Assumptions</li>
                  <li>Payment terms</li>
                  <li>Validity period (30 days)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cost Calculation</p>
                <ul className="space-y-0.5">
                  <li>Labour hours x charge-out rate</li>
                  <li>Materials + markup (15-30%)</li>
                  <li>Travel time and costs</li>
                  <li>Any equipment hire</li>
                  <li>Contingency allowance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section5-5">
              Next: Legal Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section5_4;
