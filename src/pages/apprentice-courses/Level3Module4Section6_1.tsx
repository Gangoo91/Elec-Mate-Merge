import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

// SEO metadata
const seoTitle = "Communication with Clients and Customers - Level 3 Fault Diagnosis";
const seoDescription = "Master professional communication skills for explaining electrical faults and remedial work to clients, including technical translation, managing expectations, and building trust through clear explanations.";

// Quick check questions for inline knowledge checks
const quickCheckQuestions = [
  {
    question: "When explaining a fault to a non-technical customer, what approach should you take?",
    options: ["Use full technical terminology to demonstrate expertise", "Avoid all technical terms and oversimplify", "Use analogies and plain language while being accurate", "Refuse to explain as they won't understand"],
    correctAnswer: 2,
    explanation: "Professional communication involves translating technical information into plain language the customer can understand, using analogies where helpful, while maintaining accuracy and not patronising the customer."
  },
  {
    question: "What should you do if a customer disagrees with your fault diagnosis?",
    options: ["Insist you are correct and refuse to explain further", "Listen to their concerns and explain your reasoning with evidence", "Agree with them to avoid conflict", "Walk away from the job"],
    correctAnswer: 1,
    explanation: "Professional handling of disagreements involves actively listening to the customer's concerns, calmly explaining your reasoning supported by evidence such as test results, and working together to find a resolution."
  },
  {
    question: "Before starting remedial work, what should be confirmed with the customer?",
    options: ["Nothing - just proceed with repairs", "Scope of work, costs, and timescales", "Only the final price", "Just the start date"],
    correctAnswer: 1,
    explanation: "Before commencing work, you should confirm the agreed scope of work, provide a clear breakdown of costs, establish realistic timescales, and ensure the customer understands and approves what will be done."
  },
  {
    question: "How should you handle a situation where you discover additional faults during repair?",
    options: ["Fix everything and add it to the bill without consultation", "Stop work completely and leave", "Inform the customer immediately and discuss options", "Ignore additional faults if not part of original job"],
    correctAnswer: 2,
    explanation: "Professional practice requires immediately informing the customer of any additional faults discovered, explaining the implications, providing options and costs, and obtaining approval before proceeding with extra work."
  }
];

// Quiz questions for end of section assessment
const quizQuestions = [
  {
    question: "What is the primary goal of client communication during fault diagnosis work?",
    options: ["To impress with technical knowledge", "To minimise time spent talking", "To build trust and ensure understanding", "To avoid any commitment"],
    correctAnswer: 2,
    explanation: "The primary goal is building trust and ensuring the customer understands the situation. Clear, honest communication creates confidence in your work and helps customers make informed decisions."
  },
  {
    question: "When should you first contact the customer about a fault diagnosis job?",
    options: ["Only when the work is complete", "Before arriving to confirm access and discuss initial expectations", "Never - they contacted you", "Only if there's a problem"],
    correctAnswer: 1,
    explanation: "Initial contact before arriving allows you to confirm access arrangements, discuss their description of the problem, set expectations for the diagnostic process, and establish a professional relationship from the start."
  },
  {
    question: "How should you explain the cost difference between a quick fix and a proper repair?",
    options: ["Don't mention it - just do the proper repair", "Use technical regulations they won't understand", "Explain the long-term implications of each option clearly", "Tell them the quick fix is dangerous without explanation"],
    correctAnswer: 2,
    explanation: "Professional communication involves clearly explaining both options, including the long-term implications, costs, and risks of each approach, allowing the customer to make an informed decision."
  },
  {
    question: "What should be included in a written quotation for remedial work?",
    options: ["Just the total price", "Detailed breakdown of work, materials, labour, and timescales", "Technical specifications only", "Verbal agreement is sufficient"],
    correctAnswer: 1,
    explanation: "A professional quotation should include a detailed breakdown of the work to be done, itemised materials, labour costs, VAT if applicable, expected timescales, and any terms and conditions."
  },
  {
    question: "How should you respond to a customer who questions why the repair is taking longer than expected?",
    options: ["Ignore their concerns and continue working", "Apologise, explain the reasons, and provide updated timescales", "Blame previous electricians for poor work", "Tell them you'll finish when you finish"],
    correctAnswer: 1,
    explanation: "Professional response involves acknowledging their concern, apologising for any inconvenience, explaining honestly why additional time is needed, and providing realistic updated completion estimates."
  },
  {
    question: "What documentation should you provide to the customer after completing remedial work?",
    options: ["Nothing unless they ask", "Appropriate certification and clear handover information", "Technical test sheets only", "Just a receipt"],
    correctAnswer: 1,
    explanation: "After completing work, provide appropriate certification (EIC, MWC, or EICR as applicable), explain what was done, provide any relevant operating instructions, and leave clear handover information."
  },
  {
    question: "When a customer asks you to do work that wouldn't comply with regulations, what should you do?",
    options: ["Do what they ask - customer is always right", "Refuse and leave without explanation", "Explain why it's not possible and offer compliant alternatives", "Do it but don't certify the work"],
    correctAnswer: 2,
    explanation: "Professional practice requires explaining why the requested work cannot be done (referencing regulations as needed), then offering compliant alternatives that meet the customer's underlying needs where possible."
  },
  {
    question: "How should sensitive information about an installation's condition be communicated to a tenant?",
    options: ["Tell them everything regardless of who's responsible", "Refuse to discuss anything with them", "Explain the situation appropriately and direct them to the landlord", "Only give written reports to property owners"],
    correctAnswer: 2,
    explanation: "When dealing with tenants, explain the situation appropriately for safety purposes, but direct detailed discussions about remedial work requirements and costs to the landlord or property owner who is responsible for the installation."
  },
  {
    question: "What is the best approach when a customer seems frustrated about the fault or repair cost?",
    options: ["Match their frustration level", "Remain calm, empathetic, and focus on solutions", "Immediately offer a discount", "End the conversation quickly"],
    correctAnswer: 1,
    explanation: "Professional communication with frustrated customers involves remaining calm, showing empathy for their situation, actively listening to their concerns, and focusing on practical solutions rather than becoming defensive."
  },
  {
    question: "How should you handle questions about work done by other electricians?",
    options: ["Criticise their work openly to gain the customer's trust", "Remain professional and focus on the current situation", "Refuse to comment on anything", "Always defend other electricians regardless of quality"],
    correctAnswer: 1,
    explanation: "Professional conduct requires remaining diplomatic about other electricians' work. Focus on the current situation, what needs to be done now, and avoid unnecessary criticism while being honest about any genuine concerns."
  },
  {
    question: "What should you do if you cannot complete a job on the agreed date?",
    options: ["Just turn up when you can", "Contact the customer as early as possible to rearrange", "Send someone else without telling them", "Finish other jobs and fit them in when possible"],
    correctAnswer: 1,
    explanation: "Professional practice requires contacting the customer as soon as you know there will be a delay, apologising for the inconvenience, explaining the reason if appropriate, and arranging a new mutually convenient date."
  },
  {
    question: "When providing verbal explanations of fault diagnosis findings, what should you avoid?",
    options: ["Using analogies to explain concepts", "Jargon and acronyms without explanation", "Showing test equipment readings", "Demonstrating the fault if safe to do so"],
    correctAnswer: 1,
    explanation: "Avoid using unexplained jargon, technical acronyms, or assuming knowledge. While showing readings and demonstrations can help, unexplained technical language creates confusion and undermines trust."
  }
];

// FAQ data
const faqs = [
  {
    question: "How do I explain complex electrical faults to customers without technical knowledge?",
    answer: "Use analogies from everyday life that relate to concepts they understand. Compare electrical circuits to water pipes (current = flow, voltage = pressure), or explain insulation breakdown like worn pipe lagging. Avoid jargon, and when technical terms are necessary, explain them in simple language. Use visual aids where possible, such as showing them the damaged component or using simple diagrams. Focus on the practical implications rather than the technical details: what does this mean for them, what are the risks, and what needs to be done."
  },
  {
    question: "What should I do if a customer wants a cheaper solution that I know won't last?",
    answer: "Present both options clearly and honestly. Explain the limitations and likely lifespan of the cheaper option versus the more expensive proper repair. Document your advice in writing, including the customer's choice. If the cheaper option still meets regulations, you may proceed with their informed consent. If it would be non-compliant, explain why you cannot do it and offer the compliant alternative. Never compromise safety or regulations, but respect the customer's right to make informed decisions within legal limits."
  },
  {
    question: "How should I handle a customer who is angry about finding faults in a new installation?",
    answer: "Listen actively and acknowledge their frustration without becoming defensive. Explain that you understand their disappointment and that finding issues in new work is particularly frustrating. Focus on solutions rather than blame. Document your findings carefully with photos and test results. Advise them of their options, which may include contacting the original installer, the building control body, or relevant competent person scheme. Offer to provide a clear report of your findings that they can use to pursue resolution."
  },
  {
    question: "What information should I gather before visiting a customer for fault diagnosis?",
    answer: "Before the visit, gather: the customer's description of the problem including when it occurs and any patterns; the property type, age, and any known history of electrical work; access requirements and any restrictions; contact details and confirmation of who will be present; any relevant documentation they may have such as previous certificates; and clarification of whether you're dealing with the property owner or tenant. This preparation allows you to arrive with appropriate expectations and equipment."
  },
  {
    question: "How do I manage customer expectations about fault-finding timescales?",
    answer: "Explain that fault diagnosis is investigative work and timescales can be unpredictable. Give realistic ranges rather than fixed times: 'simple faults might take 30 minutes, but complex intermittent faults could require several hours or multiple visits.' Explain your diagnostic approach and why you can't always predict how long investigation will take. Agree a sensible initial time period for investigation, and commit to updating them with findings and estimates before incurring significant additional costs."
  },
  {
    question: "What should I do when the customer isn't present during the work?",
    answer: "If working while the customer is out, maintain clear communication throughout. Send a text or email confirming arrival and when starting work. Leave the site clean and secure. Provide a detailed note or message explaining what was done, what was found, and any recommendations. Take photos of work completed and any issues found. Agree a time to call or meet to discuss findings and next steps. Never leave significant safety issues without ensuring the customer is informed immediately, even if that means interrupting their day."
  }
];

const Level3Module4Section6_1 = () => {
  useSEO(seoTitle, seoDescription);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module4-section6">
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
              Level 3 Module 4 - Section 6.1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Communication with Clients and Customers
          </h1>
          <p className="text-lg sm:text-xl text-white/70">
            Effective communication skills for explaining faults and remedial work to clients
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-xl border border-yellow-400/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What You Will Learn</h2>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Translate technical findings into clear, understandable explanations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Manage customer expectations throughout the fault diagnosis process</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Handle difficult conversations about costs, delays, and additional work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Build trust and maintain professional relationships with clients</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm sm:text-base">Provide appropriate documentation and handover information</span>
            </li>
          </ul>
        </section>

        {/* Section 01: Principles of Professional Communication */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Principles of Professional Communication</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Effective communication is as important as technical competence in professional electrical work. The ability to explain complex findings clearly, manage expectations, and build trust determines how customers perceive your work and whether they recommend your services.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Core Communication Principles</h3>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Clarity</h4>
              <p className="text-white/70 text-sm mb-2">
                Express yourself in plain language that the customer can understand. Avoid jargon, acronyms, and technical terms unless you explain them. Remember that what seems obvious to you may be completely unknown to someone outside the trade.
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Use simple, direct language</li>
                <li>Explain technical terms when they must be used</li>
                <li>Check understanding by asking questions</li>
                <li>Provide written summaries of important information</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Honesty</h4>
              <p className="text-white/70 text-sm mb-2">
                Always be truthful about findings, costs, and timescales. If you don't know something, say so and explain how you'll find out. Customers respect honesty even when the news isn't what they wanted to hear.
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Report findings accurately, even if unwelcome</li>
                <li>Give realistic timescales rather than optimistic ones</li>
                <li>Admit uncertainty when appropriate</li>
                <li>Never overstate problems to increase work</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Respect</h4>
              <p className="text-white/70 text-sm mb-2">
                Treat every customer with respect regardless of their technical knowledge, property type, or demeanour. Listen actively to their concerns and take them seriously.
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Listen without interrupting</li>
                <li>Acknowledge their concerns as valid</li>
                <li>Avoid patronising or condescending language</li>
                <li>Respect their property and time</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Professionalism</h4>
              <p className="text-white/70 text-sm mb-2">
                Maintain professional boundaries while being approachable and helpful. Your conduct reflects on the entire industry.
              </p>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Dress appropriately and maintain clean appearance</li>
                <li>Arrive on time and communicate if delayed</li>
                <li>Keep conversations focused and appropriate</li>
                <li>Avoid negative comments about other tradespeople</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctAnswer={quickCheckQuestions[0].correctAnswer}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Explaining Technical Findings */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Explaining Technical Findings</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Translating technical findings into understandable terms is a core skill. Customers need to understand what's wrong, why it matters, and what needs to be done, without requiring electrical qualifications themselves.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Using Analogies and Comparisons</h3>
            <p className="text-white/80 text-sm mb-3">
              Analogies help customers grasp unfamiliar concepts by relating them to everyday experiences:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-white/80 border border-white/20">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-2 text-left">Technical Concept</th>
                    <th className="border border-white/20 p-2 text-left">Customer-Friendly Analogy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-2">Insulation breakdown</td>
                    <td className="border border-white/20 p-2">"Like the rubber coating on a hosepipe cracking and letting water leak out"</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Earth fault</td>
                    <td className="border border-white/20 p-2">"Electricity is finding an unintended path to ground, like water draining where it shouldn't"</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">Loose connection</td>
                    <td className="border border-white/20 p-2">"Like a garden hose not quite screwed onto the tap - it works but wastes energy and could cause problems"</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Overloaded circuit</td>
                    <td className="border border-white/20 p-2">"Imagine too many cars on a single-lane road - it creates problems and bottlenecks"</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-2">RCD tripping</td>
                    <td className="border border-white/20 p-2">"This safety device senses electricity going where it shouldn't and cuts power instantly to protect you"</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/20 p-2">Circuit breaker tripping</td>
                    <td className="border border-white/20 p-2">"The circuit is demanding more power than it's designed for, so the breaker shuts it off for safety"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Explaining Risk and Urgency</h3>
            <p className="text-white/80 text-sm mb-3">
              When discussing safety issues, be clear about risks without causing unnecessary alarm:
            </p>
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Risk Communication Framework</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Immediate danger:</strong> "This needs to be isolated now - I can't leave this energised as there's a serious risk of electric shock or fire"</li>
                <li><strong>Requires urgent attention:</strong> "This isn't immediately dangerous but could become so - I recommend addressing it within the next few days"</li>
                <li><strong>Improvement recommended:</strong> "This doesn't meet current standards but isn't dangerous - worth addressing when you do other work"</li>
                <li><strong>For information:</strong> "This is something to be aware of but doesn't require action at this time"</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Visual Aids and Demonstrations</h3>
            <p className="text-white/80 text-sm mb-3">
              Where safe and appropriate, showing is more effective than telling:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Show the damaged component (disconnected from power)</li>
              <li>Take photos of issues found for their records</li>
              <li>Draw simple diagrams to explain circuit arrangements</li>
              <li>Show test equipment readings and explain what they mean</li>
              <li>Demonstrate the problem if it can be done safely</li>
            </ul>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctAnswer={quickCheckQuestions[1].correctAnswer}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Managing Expectations */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Managing Expectations</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Customer satisfaction often depends more on managing expectations than on the work itself. Setting realistic expectations from the start and communicating changes promptly prevents disappointment and disputes.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Initial Contact</h3>
            <p className="text-white/80 text-sm mb-3">
              The first conversation sets the tone for the entire job:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Listen carefully to their description of the problem</li>
                <li>Ask clarifying questions to understand the situation</li>
                <li>Explain that fault diagnosis is investigative and may take time</li>
                <li>Give realistic time ranges rather than precise commitments</li>
                <li>Explain your charging structure clearly (hourly, fixed fee, etc.)</li>
                <li>Confirm access arrangements and who will be present</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">During the Work</h3>
            <p className="text-white/80 text-sm mb-3">
              Keep customers informed as the job progresses:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Provide regular updates, especially on longer jobs</li>
                <li>Communicate immediately if you find additional problems</li>
                <li>Obtain approval before undertaking work beyond the original scope</li>
                <li>Give early warning if costs or timescales will exceed estimates</li>
                <li>Explain what you're doing and why (appropriate level of detail)</li>
                <li>Ask before using facilities (toilet, making cups of tea)</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Handling Additional Findings</h3>
            <p className="text-white/80 text-sm mb-3">
              When you discover additional faults beyond the original issue:
            </p>
            <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg p-4 border border-yellow-400/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Recommended Approach:</h4>
              <ol className="list-decimal pl-5 text-white/80 text-sm space-y-2">
                <li><strong>Stop and communicate:</strong> Don't proceed with additional work without discussion</li>
                <li><strong>Explain the finding:</strong> Describe what you've found and its significance</li>
                <li><strong>Assess urgency:</strong> Clarify whether it needs immediate attention or can wait</li>
                <li><strong>Provide options:</strong> Give clear choices with costs for each</li>
                <li><strong>Document the decision:</strong> Record what was found and the customer's choice</li>
                <li><strong>Proceed as agreed:</strong> Only do additional work with clear approval</li>
              </ol>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Time Estimates</h3>
            <p className="text-white/80 text-sm mb-3">
              Be realistic about how long work will take:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Give ranges rather than precise times: "This typically takes 2-3 hours"</li>
              <li>Explain factors that could affect duration</li>
              <li>Build in contingency for unexpected complications</li>
              <li>Update estimates if circumstances change</li>
              <li>If running late, communicate as soon as you know</li>
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

        {/* Section 04: Difficult Conversations */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Difficult Conversations</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Not every conversation is easy. Customers may be frustrated, costs may be higher than expected, or you may need to deliver unwelcome news. Handling these situations professionally is essential.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Dealing with Frustrated Customers</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Stay calm:</strong> Don't match their emotional level - remain professional</li>
                <li><strong>Listen actively:</strong> Let them express their concerns without interruption</li>
                <li><strong>Acknowledge feelings:</strong> "I understand this is frustrating for you"</li>
                <li><strong>Focus on solutions:</strong> Move the conversation toward resolving the issue</li>
                <li><strong>Avoid blame:</strong> Don't criticise others or become defensive</li>
                <li><strong>Document concerns:</strong> Keep records of complaints and your responses</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Breaking Bad News</h3>
            <p className="text-white/80 text-sm mb-3">
              When you need to deliver unwelcome information:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Be direct:</strong> Don't delay or soften the message excessively</li>
                <li><strong>Be specific:</strong> Explain exactly what the problem is</li>
                <li><strong>Explain the implications:</strong> What does this mean for them?</li>
                <li><strong>Offer solutions:</strong> What can be done to address the situation?</li>
                <li><strong>Allow time:</strong> Let them process the information and ask questions</li>
                <li><strong>Follow up in writing:</strong> Confirm key points in a clear written summary</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Cost Discussions</h3>
            <p className="text-white/80 text-sm mb-3">
              Money is often a sensitive topic. Handle cost discussions professionally:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Be transparent about how you charge (hourly rate, fixed price, etc.)</li>
                <li>Provide itemised quotations where possible</li>
                <li>Explain what is included and what might be extra</li>
                <li>If costs exceed estimates, explain why before completing work</li>
                <li>Discuss payment terms and methods clearly</li>
                <li>Offer options at different price points where applicable</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Disagreements About Diagnosis</h3>
            <p className="text-white/80 text-sm mb-3">
              If a customer questions your findings:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li>Listen to their perspective without becoming defensive</li>
                <li>Show evidence: test results, damaged components, photos</li>
                <li>Explain your reasoning step by step</li>
                <li>Reference regulations or standards where relevant</li>
                <li>Suggest a second opinion if they remain unconvinced</li>
                <li>Document your findings and advice clearly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 4 */}
        <InlineCheck
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctAnswer={quickCheckQuestions[3].correctAnswer}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Section 05: Documentation and Handover */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs sm:text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Documentation and Handover</h2>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Professional communication extends beyond conversation to written documentation. Clear, accurate records protect both you and the customer while demonstrating your professionalism.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Quotations and Estimates</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Professional Quotation Contents:</h4>
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
                <li>Clear description of work to be undertaken</li>
                <li>Itemised breakdown of labour and materials where appropriate</li>
                <li>Total cost including VAT (if VAT registered)</li>
                <li>Validity period for the quotation</li>
                <li>Estimated timescales for completion</li>
                <li>Payment terms and accepted methods</li>
                <li>Any exclusions or limitations</li>
                <li>Your contact details and registration numbers</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Certificates and Reports</h3>
            <p className="text-white/80 text-sm mb-3">
              Provide appropriate documentation for all completed work:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 text-white/70 text-sm space-y-2">
                <li><strong>Electrical Installation Certificate (EIC):</strong> For new circuits or installations</li>
                <li><strong>Minor Works Certificate:</strong> For small additions or alterations</li>
                <li><strong>Electrical Installation Condition Report:</strong> For inspection of existing installations</li>
                <li>Explain the certificate to the customer: what it covers and its significance</li>
                <li>Advise on retention: these are important documents they should keep</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Work Completion Handover</h3>
            <p className="text-white/80 text-sm mb-3">
              When finishing a job, ensure proper handover:
            </p>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 mb-4">
              <h4 className="text-white font-semibold mb-2">Handover Checklist:</h4>
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li>Walk through the completed work with the customer</li>
                <li>Demonstrate how equipment operates (switches, RCDs, etc.)</li>
                <li>Explain what was done and why</li>
                <li>Point out any relevant user maintenance (RCD testing)</li>
                <li>Hand over certificates and any relevant documentation</li>
                <li>Confirm the customer is satisfied before leaving</li>
                <li>Provide your contact details for any follow-up questions</li>
                <li>Leave the site clean and tidy</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Follow-Up Communication</h3>
            <p className="text-white/80 text-sm mb-3">
              Maintain the relationship after completing work:
            </p>
            <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
              <li>Send certificates promptly if not provided on site</li>
              <li>Follow up on any outstanding items or recommendations</li>
              <li>Be available to answer questions that arise after completion</li>
              <li>Request feedback or reviews if appropriate</li>
              <li>Keep records for future reference if they call again</li>
            </ul>
          </div>
        </section>

        {/* Practical Guidance Section */}
        <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">First Impressions Matter</h3>
              <p className="text-white/70 text-sm">
                Arrive on time, dressed appropriately, with clean footwear. Introduce yourself clearly and confirm the customer's name. A professional first impression sets positive expectations for the entire job.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Active Listening</h3>
              <p className="text-white/70 text-sm">
                Listen more than you talk, especially initially. Let customers describe their concerns fully before offering solutions. Repeat back key points to confirm understanding. This shows respect and ensures you don't miss important information.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Written Confirmation</h3>
              <p className="text-white/70 text-sm">
                Confirm important agreements in writing, especially costs and scope changes. A simple email or text confirming key points protects both parties and prevents misunderstandings.
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
              <h3 className="text-white font-semibold mb-2">Communication Essentials</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Clarity - explain in plain language</li>
                <li>Honesty - always be truthful</li>
                <li>Respect - treat everyone professionally</li>
                <li>Listen - understand before responding</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Before Starting Work</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Confirm scope and expectations</li>
                <li>Agree pricing structure</li>
                <li>Set realistic timescales</li>
                <li>Confirm access arrangements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">During Work</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Provide regular updates</li>
                <li>Communicate changes promptly</li>
                <li>Obtain approval for extras</li>
                <li>Document all findings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">After Completion</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Walk through completed work</li>
                <li>Provide all certificates</li>
                <li>Explain operation and maintenance</li>
                <li>Leave site clean and tidy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8 sm:mb-12">
          <Quiz
            title="Section 6.1 Knowledge Check"
            questions={quizQuestions}
            passingScore={75}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-black hover:bg-white/10 hover:text-white" asChild>
            <Link to="../level3-module4-section5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Preventative Maintenance
            </Link>
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500" asChild>
            <Link to="../level3-module4-section6-2">
              Next: Working Under Pressure
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module4Section6_1;
