import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

// SEO metadata
const seoTitle = "Costing and Explaining Remedial Work - Level 3 Fault Diagnosis";
const seoDescription = "Master the skills of accurately costing electrical repairs and clearly explaining remedial work requirements to customers, including pricing strategies, quotation preparation, and justifying costs.";

// Quick check questions for inline knowledge checks
const quickCheckQuestions = [
  {
    question: "What should always be included in a professional quotation for remedial electrical work?",
    options: ["Just the total price", "Scope of work, itemised costs, timescales, and terms", "Technical specifications only", "Labour rate only"],
    correctAnswer: 1,
    explanation: "A professional quotation should include a clear scope of work, itemised breakdown of labour and materials, expected timescales, payment terms, validity period, and any relevant terms and conditions."
  },
  {
    question: "When explaining repair costs to a customer, what approach is most effective?",
    options: ["Quote as low as possible to win the work", "Focus on the value and safety benefits of the repair", "Avoid discussing costs until the invoice", "Compare your prices to competitors"],
    correctAnswer: 1,
    explanation: "Effective cost communication focuses on the value provided: the safety benefits, compliance with regulations, longevity of the repair, and prevention of future problems. This helps customers understand what they're paying for."
  },
  {
    question: "How should you handle a request to reduce your quoted price?",
    options: ["Always agree to avoid losing the work", "Explain the costs involved and offer alternative solutions if possible", "Immediately increase the price to allow negotiation room", "Refuse to discuss pricing"],
    correctAnswer: 1,
    explanation: "Respond professionally by explaining what contributes to the cost (materials, labour, expertise, certification). If appropriate, offer alternative solutions at different price points, but never compromise quality or safety to reduce price."
  },
  {
    question: "What is the difference between a quotation and an estimate?",
    options: ["They are the same thing", "A quotation is a fixed price, an estimate is approximate", "An estimate is more professional", "A quotation is only for large jobs"],
    correctAnswer: 1,
    explanation: "A quotation is a fixed price that you're committed to honour (within its validity period), while an estimate is an approximate figure that may change. Always clarify which you're providing and ensure customers understand the difference."
  }
];

// Quiz questions for end of section assessment
const quizQuestions = [
  {
    question: "What factors should be considered when calculating labour costs for remedial work?",
    options: ["Only time on site", "Time, travel, expertise level, and business overheads", "Just the hourly rate", "What competitors charge"],
    correctAnswer: 1,
    explanation: "Labour costs should include productive time on site, travel time, the expertise level required for the work, and a contribution to business overheads including insurance, vehicle costs, training, and administration."
  },
  {
    question: "When should you provide a revised quotation during a job?",
    options: ["Never - stick to the original price", "When the scope of work changes or additional issues are discovered", "Only at the end when presenting the final bill", "Only if the customer asks"],
    correctAnswer: 1,
    explanation: "Provide a revised quotation whenever the scope changes or additional work is identified. Get customer agreement before proceeding with work beyond the original scope to avoid disputes about payment."
  },
  {
    question: "How should you explain why quality materials cost more?",
    options: ["Avoid mentioning material quality", "Explain the benefits of quality: reliability, safety, longevity, and warranty", "Just say they're the best", "Compare to what competitors use"],
    correctAnswer: 1,
    explanation: "Explain the tangible benefits of quality materials: longer service life, better reliability, compliance with standards, safety features, and warranty coverage. Help customers understand the long-term value rather than just the initial cost."
  },
  {
    question: "What should you do if a customer cannot afford the recommended repair?",
    options: ["Do substandard work at a lower price", "Walk away from the job", "Discuss priorities and phased approaches while maintaining safety", "Refuse to help"],
    correctAnswer: 2,
    explanation: "Work with the customer to prioritise essential safety repairs that must be done immediately versus improvements that could be phased over time. Never compromise safety, but help find workable solutions within their budget."
  },
  {
    question: "Why is it important to provide itemised quotations?",
    options: ["It's a legal requirement for all work", "It helps customers understand costs and makes comparisons fair", "It increases the total price", "It's only needed for large jobs"],
    correctAnswer: 1,
    explanation: "Itemised quotations help customers understand what they're paying for, enable fair comparisons between quotes, demonstrate transparency and professionalism, and reduce disputes about what was included."
  },
  {
    question: "How should you respond when a customer gets a lower quote from a competitor?",
    options: ["Immediately match their price", "Explain the differences in scope, quality, and qualifications", "Criticise the competitor", "Refuse to discuss it"],
    correctAnswer: 1,
    explanation: "Professionally explain what your quote includes (scope, materials, certification, warranty) and ask whether the competing quote covers the same. Lower quotes may exclude essential elements or use inferior materials."
  },
  {
    question: "What is the purpose of a validity period on a quotation?",
    options: ["To pressure customers into quick decisions", "To protect against material price changes and manage workload", "It's just a formality", "To allow price increases"],
    correctAnswer: 1,
    explanation: "Validity periods protect you from being held to prices if material costs increase significantly. They also help manage your workload by preventing old quotes being accepted during busy periods when capacity is limited."
  },
  {
    question: "When explaining costs for emergency callouts, what should customers understand?",
    options: ["Emergency rates are arbitrary", "Why rates are higher: unsocial hours, disrupted schedule, immediate response", "Emergencies should be the same price as scheduled work", "They should call during office hours"],
    correctAnswer: 1,
    explanation: "Explain that emergency rates reflect the unsocial hours worked, the disruption to scheduled work and personal time, the need to maintain emergency capacity, and the immediate response provided. Help them see the value of prompt service."
  },
  {
    question: "What approach should you take to pricing guarantee or callback work?",
    options: ["Always charge full rate", "Never charge - it's always your fault", "Assess reasonably - charge for new faults, not genuine failures of your work", "Avoid providing any guarantee"],
    correctAnswer: 2,
    explanation: "Genuine failures of your work should be corrected without charge within a reasonable period. New faults unrelated to your work, or issues arising from customer actions, can reasonably be charged. Be clear about your terms upfront."
  },
  {
    question: "How can providing multiple options help with cost discussions?",
    options: ["It confuses customers", "It shows different price points while meeting their needs", "It's unnecessary extra work", "Customers prefer single options"],
    correctAnswer: 1,
    explanation: "Offering options (e.g., minimum compliance vs enhanced specification) helps customers make informed choices based on their budget and priorities. It demonstrates flexibility and customer focus while maintaining professional standards."
  },
  {
    question: "What information should accompany a final invoice?",
    options: ["Just the total amount due", "Breakdown of work done, materials used, and any variations from quote", "Technical test results only", "Nothing - the quote already covered it"],
    correctAnswer: 1,
    explanation: "Final invoices should include a breakdown of work completed, materials used, any variations from the original quote with explanations, payment terms, and relevant certificates or documentation references."
  },
  {
    question: "How should you handle payment for large or phased remedial work?",
    options: ["Always require full payment upfront", "Never ask for any payment until completion", "Agree staged payments matching work milestones", "Payment terms aren't important"],
    correctAnswer: 2,
    explanation: "For larger projects, staged payments tied to milestones protect both parties: you receive payment as work progresses, and the customer only pays for completed stages. Agree terms clearly before starting work."
  }
];

// FAQ data
const faqs = [
  {
    question: "How do I calculate an appropriate hourly or day rate for my work?",
    answer: "Your rate should cover direct costs (your wages/drawings, national insurance, pension), business overheads (insurance, vehicle, tools, training, administration, premises), and profit margin to sustain and grow the business. Research local market rates, but don't undervalue your expertise. Consider your qualifications, experience, and the value you provide. Remember that billable hours are typically 60-70% of working hours after accounting for travel, administration, and non-productive time."
  },
  {
    question: "Should I charge for time spent diagnosing faults before providing a repair quote?",
    answer: "Yes, fault diagnosis is skilled work that takes time and expertise. Explain to customers that diagnosis is a separate service from repair. You might offer a fixed diagnostic fee that includes the first hour of investigation, after which you report findings and provide a repair quotation. Some electricians offset diagnostic fees against repair work if the customer proceeds. Be clear about your policy before starting so there are no surprises."
  },
  {
    question: "How do I justify my prices when customers think they're too high?",
    answer: "Focus on value rather than defending price. Explain your qualifications, insurance, and registration with competent person schemes. Highlight that your work will be certified and compliant with regulations. Mention the quality of materials you use and any guarantee you offer. Explain the risks of cheap or unqualified work: safety hazards, future problems, lack of certification affecting property sale. Help them see that price reflects quality, expertise, and accountability."
  },
  {
    question: "What should I do when additional work is needed beyond the original quote?",
    answer: "Stop and communicate before doing additional work. Explain what you've found, why additional work is needed, and provide a clear price for the extra work. Get the customer's agreement before proceeding - ideally in writing or text message. If they decline, complete the original quoted work and document your recommendations. Never just add extra work to the bill without prior agreement, as this leads to disputes and damages trust."
  },
  {
    question: "How do I handle customers who want to supply their own materials?",
    answer: "This is acceptable but explain the implications: you may not guarantee work with customer-supplied materials, specifications must be appropriate for the application, and you cannot certify work if materials are unsuitable. Adjust your quote to reflect labour only, but be clear about what's included. If materials are substandard or non-compliant, explain why they cannot be used. Some electricians add a small handling/checking fee for customer materials."
  },
  {
    question: "What payment methods should I accept and when should payment be made?",
    answer: "Accept multiple payment methods for customer convenience: bank transfer, card payments, and possibly cheque for established customers. For smaller jobs, payment on completion is normal. For larger work, consider deposits (typically 10-25%) and staged payments. Be wary of large deposits that might indicate a customer planning not to pay the balance. Clearly state payment terms on quotations and invoices. Follow up promptly on overdue payments professionally."
  }
];

const Level3Module4Section6_3 = () => {
  useSEO(seoTitle, seoDescription);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/level3-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400/80 text-xs sm:text-sm font-medium tracking-wider uppercase">
              Level 3 Module 4 - Section 6.3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Costing and Explaining Remedial Work
          </h1>
          <p className="text-lg sm:text-xl text-white/70">
            Accurately costing repairs and clearly explaining work requirements to customers
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-xl border border-yellow-400/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What You Will Learn</h2>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Calculate accurate and sustainable prices for remedial work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Prepare professional quotations that protect you and inform customers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Explain costs clearly and justify pricing professionally</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Handle price objections and negotiations effectively</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Manage variations and additional work discovered during repairs</span>
            </li>
          </ul>
        </section>

        {/* Section 01: Understanding Cost Components */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Understanding Cost Components</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Accurate costing requires understanding all the elements that contribute to a job's true cost. Underpricing leads to unsustainable business practices, while overpricing loses work. Finding the right balance requires systematic analysis of all cost components.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Direct Costs</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Materials</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Cost of all materials required for the repair</li>
                <li>Cable, accessories, protective devices, consumables</li>
                <li>Allow for waste and contingency (typically 5-10%)</li>
                <li>Consider quality levels and specification requirements</li>
                <li>Factor in supplier pricing and volume discounts</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Labour</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Time on site performing the work</li>
                <li>Travel time to and from the job</li>
                <li>Time for testing, commissioning, and handover</li>
                <li>Time for documentation and certification</li>
                <li>Expertise level required for the work</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Indirect Costs (Overheads)</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Insurance:</strong> Public liability, employer's liability, professional indemnity</li>
                <li><strong>Vehicle costs:</strong> Purchase/lease, fuel, maintenance, insurance, parking</li>
                <li><strong>Tools and equipment:</strong> Purchase, calibration, maintenance, replacement</li>
                <li><strong>Training and qualifications:</strong> Courses, certification, CPD requirements</li>
                <li><strong>Business administration:</strong> Accounting, software, phone, office costs</li>
                <li><strong>Scheme membership:</strong> Competent person scheme fees, trade associations</li>
                <li><strong>Non-productive time:</strong> Quoting, administration, training, holidays, sickness</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Profit Margin</h3>
            <p className="text-white/80 text-sm mb-3">
              A sustainable profit margin is essential for:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Business growth and development</li>
              <li>Investment in equipment and training</li>
              <li>Financial security during quiet periods</li>
              <li>Retirement planning and savings</li>
              <li>Rewarding quality work and expertise</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctAnswer={quickCheckQuestions[0].correctAnswer}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Preparing Professional Quotations */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Preparing Professional Quotations</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              A professional quotation protects both you and the customer by clearly defining what work will be done, at what cost, and under what terms. Well-prepared quotations reduce disputes and demonstrate professionalism.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Essential Quotation Elements</h3>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Professional Quotation Contents:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Your details:</strong> Business name, address, contact information, registration numbers</li>
                <li><strong>Customer details:</strong> Name, address, contact information</li>
                <li><strong>Reference and date:</strong> Unique quotation number and date issued</li>
                <li><strong>Scope of work:</strong> Clear description of what will be done</li>
                <li><strong>Materials:</strong> Specification of key materials or "or equivalent"</li>
                <li><strong>Price breakdown:</strong> Labour, materials, and total (itemised or summary)</li>
                <li><strong>VAT:</strong> Clearly state if prices include or exclude VAT</li>
                <li><strong>Timescales:</strong> Estimated duration and proposed start date</li>
                <li><strong>Validity period:</strong> How long the quotation remains valid</li>
                <li><strong>Payment terms:</strong> When and how payment is expected</li>
                <li><strong>Terms and conditions:</strong> Cancellation policy, guarantee, exclusions</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Quotation vs Estimate</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-white/80 border border-white/20">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Quotation</th>
                    <th className="border border-white/20 p-2 text-left">Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-2">Fixed price commitment</td>
                    <td className="border border-white/20 p-2">Approximate figure</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Legally binding within validity period</td>
                    <td className="border border-white/20 p-2">Can change when actual work is assessed</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Based on defined scope of work</td>
                    <td className="border border-white/20 p-2">Based on initial assessment</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Appropriate when work is clearly defined</td>
                    <td className="border border-white/20 p-2">Appropriate when scope is uncertain</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Common Quotation Mistakes</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Vague scope descriptions leading to disputes</li>
                <li>Forgetting to include all cost elements</li>
                <li>No validity period leaving you exposed to price changes</li>
                <li>Unclear VAT treatment</li>
                <li>No terms covering access requirements or variations</li>
                <li>Over-optimistic timescales that cannot be met</li>
                <li>Failing to specify what's excluded</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctAnswer={quickCheckQuestions[1].correctAnswer}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Explaining Costs to Customers */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Explaining Costs to Customers</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              How you explain costs significantly affects customer perception and satisfaction. Focus on value and benefits rather than just price. Help customers understand what they're paying for and why it matters.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Value-Based Explanation</h3>
            <p className="text-white/80 text-sm mb-3">
              When discussing costs, emphasise the value provided:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Safety:</strong> "This repair ensures your installation is safe for your family"</li>
                <li><strong>Compliance:</strong> "The work will meet current regulations and be fully certified"</li>
                <li><strong>Quality:</strong> "We use quality materials that will last many years"</li>
                <li><strong>Expertise:</strong> "You're benefiting from qualified, insured professionals"</li>
                <li><strong>Peace of mind:</strong> "You'll have documentation for insurance and property sale"</li>
                <li><strong>Prevention:</strong> "Fixing this now prevents more costly problems later"</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Breaking Down Costs</h3>
            <p className="text-white/80 text-sm mb-3">
              Help customers understand what contributes to the price:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Materials:</strong> Explain the specification and why quality matters</li>
                <li><strong>Labour:</strong> Describe the skilled work involved and time required</li>
                <li><strong>Testing:</strong> Explain the testing and certification process</li>
                <li><strong>Qualifications:</strong> Mention the training and expertise required</li>
                <li><strong>Compliance:</strong> Reference the regulations you must meet</li>
                <li><strong>Guarantees:</strong> Describe any warranty on your work</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Presenting Options</h3>
            <p className="text-white/80 text-sm mb-3">
              Where appropriate, offer options at different price points:
            </p>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Option Presentation Example:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Option A - Essential:</strong> "This addresses the immediate safety concern and ensures compliance. Cost: X"</li>
                <li><strong>Option B - Recommended:</strong> "This includes the essential work plus improvements for better performance and longer life. Cost: Y"</li>
                <li><strong>Option C - Comprehensive:</strong> "This fully upgrades the affected area to current best practice. Cost: Z"</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Avoiding Common Pitfalls</h3>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Don't apologise for your prices - they reflect value</li>
              <li>Don't criticise competitors' lower prices</li>
              <li>Don't make customers feel they're being overcharged</li>
              <li>Don't rush cost discussions - allow time for questions</li>
              <li>Don't surprise customers with costs at the end of a job</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctAnswer={quickCheckQuestions[2].correctAnswer}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 04: Handling Price Objections */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Handling Price Objections</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Price objections are common and don't necessarily mean you're too expensive. Understanding why customers object helps you respond appropriately and often convert objections into confirmed work.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Common Objections and Responses</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">"That's more than I expected"</h4>
              <p className="text-white/70 text-sm">
                Acknowledge their concern and ask what they were expecting. Explain what's included in your price and why electrical work costs what it does. Help them understand the value they're receiving.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">"I've had a lower quote elsewhere"</h4>
              <p className="text-white/70 text-sm">
                Ask about the other quote: Does it include the same scope? Same quality materials? Certification? Insurance? Often lower quotes exclude essential elements. Explain what makes your quote comprehensive without criticising competitors.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">"Can you do it cheaper?"</h4>
              <p className="text-white/70 text-sm">
                Explain what contributes to your price and why reducing it would compromise quality or safety. Offer alternative solutions at different price points if possible, or suggest phased work. Don't reduce price without reducing scope.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">"I can't afford that right now"</h4>
              <p className="text-white/70 text-sm">
                Discuss priorities: what's essential for safety versus what could wait? Explore phased approaches or payment plans if you offer them. Help them find a workable solution while maintaining safety requirements.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Negotiation Principles</h3>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Value first:</strong> Ensure they understand the value before discussing price</li>
                <li><strong>Don't drop price instantly:</strong> This suggests the original price was inflated</li>
                <li><strong>Scope adjustment:</strong> If reducing price, reduce scope to match</li>
                <li><strong>Maintain quality:</strong> Never compromise materials or safety for price</li>
                <li><strong>Professional alternatives:</strong> Offer legitimate options rather than discounts</li>
                <li><strong>Know your limits:</strong> Be prepared to decline work that isn't viable</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">When to Walk Away</h3>
            <p className="text-white/80 text-sm mb-3">
              Sometimes the right decision is not to take the work:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>When the price required wouldn't cover your costs</li>
              <li>When pressure to reduce price would compromise quality or safety</li>
              <li>When the customer's expectations are unrealistic</li>
              <li>When warning signs suggest payment problems</li>
              <li>When the relationship has become adversarial</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 4 */}
        <InlineCheck
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctAnswer={quickCheckQuestions[3].correctAnswer}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Section 05: Managing Variations and Additional Work */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Managing Variations and Additional Work</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Remedial work often uncovers additional issues not visible during initial assessment. Managing these variations professionally maintains customer trust and ensures fair compensation for work done.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Identifying Variations</h3>
            <p className="text-white/80 text-sm mb-3">
              Variations may arise from:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Additional faults discovered during investigation</li>
                <li>Hidden conditions not visible until work commenced</li>
                <li>Customer requests for additional work</li>
                <li>Regulatory requirements not initially apparent</li>
                <li>Changes needed due to access or site conditions</li>
                <li>Superseded or unavailable specified materials</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Variation Process</h3>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Steps for Managing Variations:</h4>
              <ol className="list-decimal pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Identify:</strong> Recognise that additional work is needed beyond scope</li>
                <li><strong>Stop:</strong> Pause before doing any work outside the agreed scope</li>
                <li><strong>Document:</strong> Record what you've found and why additional work is needed</li>
                <li><strong>Communicate:</strong> Explain the situation clearly to the customer</li>
                <li><strong>Quote:</strong> Provide a clear price for the additional work</li>
                <li><strong>Agree:</strong> Obtain customer approval before proceeding (in writing ideally)</li>
                <li><strong>Proceed:</strong> Complete the additional work as agreed</li>
                <li><strong>Record:</strong> Document the variation for your records and invoicing</li>
              </ol>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Documentation for Variations</h3>
            <p className="text-white/80 text-sm mb-3">
              Good documentation protects both parties:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Photographs of discovered conditions</li>
              <li>Written description of additional work required</li>
              <li>Clear pricing for the additional work</li>
              <li>Customer signature or written agreement (text/email acceptable)</li>
              <li>Date and time of agreement</li>
              <li>Updated completion timescale if affected</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">When Customers Decline Additional Work</h3>
            <p className="text-white/80 text-sm mb-3">
              If the customer declines recommended additional work:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Complete the originally quoted work as agreed</li>
              <li>Document your recommendations clearly</li>
              <li>Explain any implications for safety or compliance</li>
              <li>Note on certificates if relevant observations remain</li>
              <li>Keep records of your advice and their decision</li>
              <li>Offer to quote for the work in future when they're ready</li>
            </ul>
          </div>
        </section>

        {/* Practical Guidance Section */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Building Long-Term Relationships</h3>
              <p className="text-white/70 text-sm">
                Fair, transparent pricing builds trust and repeat business. Customers who understand the value of your work become loyal clients and refer others. Invest time in explaining costs properly rather than just quoting and hoping.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Learning from Quotes</h3>
              <p className="text-white/70 text-sm">
                Track which quotes are accepted and why others aren't. Review completed jobs against estimates to improve future accuracy. If you're consistently under or over estimating, adjust your approach.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Payment Security</h3>
              <p className="text-white/70 text-sm">
                Consider credit checks for large jobs, require deposits for significant work, and stage payments for extended projects. Clear payment terms reduce disputes and bad debt.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 sm:p-6">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Box */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Quotation Essentials</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Clear scope of work</li>
                <li>Itemised costs</li>
                <li>Validity period</li>
                <li>Payment terms</li>
                <li>Terms and conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Cost Components</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Materials + contingency</li>
                <li>Labour (all time)</li>
                <li>Overheads contribution</li>
                <li>Profit margin</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Variation Process</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Stop and document</li>
                <li>Explain to customer</li>
                <li>Provide clear price</li>
                <li>Get written agreement</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Value Communication</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Focus on safety and compliance</li>
                <li>Explain quality benefits</li>
                <li>Mention certification</li>
                <li>Highlight expertise</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8 sm:mb-12">
          <Quiz
            title="Section 6.3 Knowledge Check"
            questions={quizQuestions}
            passingScore={75}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module4-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Working Under Pressure
            </Link>
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" asChild>
            <Link to="/study-centre/apprentice/level3-module4-section6-4">
              Next: Professional Standards and Accountability
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module4Section6_3;
