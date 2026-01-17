/**
 * Level 3 Module 7 Section 3.4 - Client Communication
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
const TITLE = "Client Communication Skills - Level 3 Module 7 Section 3.4";
const DESCRIPTION = "Master professional client communication for UK electrical contractors. Learn quotation writing, managing expectations, handling complaints, and building long-term customer relationships.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A client asks you to change the agreed scope of work mid-project. What is your first action?",
    options: [
      "Refuse to make any changes to the original plan",
      "Complete the extra work without discussing costs",
      "Document the variation and provide a written quote before proceeding",
      "Tell the client to contact the office"
    ],
    correctIndex: 2,
    explanation: "Variation orders must be documented in writing with clear costs before proceeding. This protects both you and the client from disputes over scope and payment."
  },
  {
    id: "check-2",
    question: "When should you provide a client with the Electrical Installation Certificate (EIC)?",
    options: [
      "Only if they specifically request it",
      "Upon completion of the work, before leaving site",
      "Within 30 days of completing the work",
      "Only for commercial installations"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires that all new installations receive an EIC upon completion. This document must be provided to the client or person ordering the work before you leave site."
  },
  {
    id: "check-3",
    question: "A client is unhappy with the final cost being higher than your initial estimate. How should you handle this?",
    options: [
      "Reduce your invoice to match the estimate",
      "Refuse to discuss it and demand full payment",
      "Explain each variation with documentation and offer payment options",
      "Tell them estimates are not binding and walk away"
    ],
    correctIndex: 2,
    explanation: "Professional communication means explaining costs clearly with supporting documentation. Showing variation records and offering reasonable payment options maintains the relationship while ensuring fair payment."
  },
  {
    id: "check-4",
    question: "What information must be included in a quotation for electrical work?",
    options: [
      "Just the total price",
      "A detailed breakdown of labour, materials, and any exclusions or assumptions",
      "Only the start date and total price",
      "A verbal agreement is sufficient"
    ],
    correctIndex: 1,
    explanation: "A professional quotation must include a detailed breakdown of labour, materials, exclusions, assumptions, validity period, and payment terms. This clarity prevents disputes and demonstrates professionalism."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the key difference between an estimate and a quotation?",
    options: [
      "There is no difference - they are interchangeable terms",
      "An estimate is an approximate cost while a quotation is a fixed price",
      "A quotation is verbal while an estimate is written",
      "An estimate is legally binding while a quotation is not"
    ],
    correctAnswer: 1,
    explanation: "An estimate gives an approximate cost that may change, while a quotation is a fixed price for specified work. Quotations are generally binding if accepted within their validity period, while estimates can vary."
  },
  {
    id: 2,
    question: "When attending a domestic property for a survey, what should you do first?",
    options: [
      "Start measuring and making notes immediately",
      "Introduce yourself, show identification, and explain the purpose of your visit",
      "Ask where the consumer unit is located",
      "Discuss payment terms"
    ],
    correctAnswer: 1,
    explanation: "Professional conduct requires introducing yourself, showing identification (company ID, ECS card), and clearly explaining why you are there. This builds trust and makes the client comfortable."
  },
  {
    id: 3,
    question: "A client asks a technical question you're unsure about. What is the most professional response?",
    options: [
      "Give your best guess to appear knowledgeable",
      "Tell them it's not your area and refuse to help",
      "Admit you're unsure and offer to find out the correct information",
      "Change the subject to avoid the question"
    ],
    correctAnswer: 2,
    explanation: "Honesty builds trust. Admitting uncertainty and committing to find accurate information is far more professional than guessing, which could lead to incorrect advice and damage your reputation."
  },
  {
    id: 4,
    question: "How long should a quotation remain valid?",
    options: [
      "Indefinitely",
      "1 week",
      "Typically 30 days, clearly stated on the quotation",
      "Until the client accepts or rejects it"
    ],
    correctAnswer: 2,
    explanation: "Quotations should include a clear validity period, typically 30 days. This protects you from material price increases and labour cost changes while giving the client reasonable time to decide."
  },
  {
    id: 5,
    question: "What should you do if you discover additional work is needed during an installation?",
    options: [
      "Complete the extra work and add it to the final bill",
      "Stop work immediately and leave",
      "Notify the client, explain the issue, and provide a written variation before proceeding",
      "Ignore it if it's only a small amount of extra work"
    ],
    correctAnswer: 2,
    explanation: "Additional work must be communicated to the client before proceeding. Provide a written variation order with costs for approval. This prevents disputes and maintains transparency."
  },
  {
    id: 6,
    question: "When should you inform a client about potential disruption to their electrical supply?",
    options: [
      "Just before you switch it off",
      "During the initial quotation stage and again before starting work",
      "Only if they specifically ask",
      "After the work is complete"
    ],
    correctAnswer: 1,
    explanation: "Clients need advance notice of supply interruptions to make arrangements (computers, freezers, medical equipment, alarms). Discuss this at quotation stage and confirm before starting work."
  },
  {
    id: 7,
    question: "A client's payment is overdue by 30 days. What is the appropriate first step?",
    options: [
      "Immediately take legal action",
      "Send a polite reminder referencing the original payment terms",
      "Remove the work you installed until payment is received",
      "Never work for them again but don't chase payment"
    ],
    correctAnswer: 1,
    explanation: "A professional approach starts with a polite reminder. Many late payments are oversights. Reference the original payment terms and invoice number. Escalate only if payment remains outstanding after reminders."
  },
  {
    id: 8,
    question: "What documentation should you leave with the client after completing a rewire?",
    options: [
      "Just a receipt for payment",
      "EIC, test results, circuit charts, user instructions, and product warranties",
      "Only the Electrical Installation Certificate",
      "No documentation is required for domestic work"
    ],
    correctAnswer: 1,
    explanation: "A complete handover includes the EIC with test results, circuit charts/schedules, user instructions for new equipment, manufacturer warranties, and guidance on periodic inspection."
  },
  {
    id: 9,
    question: "How should you handle a complaint about your work?",
    options: [
      "Defend your work and refuse to return",
      "Agree to everything the client says to avoid conflict",
      "Listen carefully, investigate objectively, and propose a fair resolution",
      "Refer them to your insurance company immediately"
    ],
    correctAnswer: 2,
    explanation: "Professional complaint handling involves active listening, objective investigation of the issue, and proposing a fair resolution. This often retains customers and prevents escalation."
  },
  {
    id: 10,
    question: "What should you do if a client asks you to install something that would breach regulations?",
    options: [
      "Do it anyway if the client signs a waiver",
      "Explain why it cannot be done and offer compliant alternatives",
      "Refuse without explanation",
      "Report the client to the authorities"
    ],
    correctAnswer: 1,
    explanation: "You cannot install non-compliant work regardless of client requests. Explain clearly why it breaches regulations, what the risks are, and offer compliant alternatives that meet their needs."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Should I provide free quotes or charge for surveys?",
    answer: "This depends on your business model and the job complexity. Simple jobs often warrant free quotes to remain competitive. For complex surveys requiring significant time (commercial projects, full rewires), charging a survey fee that's deducted from the final invoice if you win the work is reasonable and filters out non-serious enquiries."
  },
  {
    question: "How detailed should my quotation be?",
    answer: "Detailed enough to prevent disputes. List specific work to be done, materials and brands to be used, exclusions (making good, decoration), assumptions made, payment terms, validity period, and any provisional sums for uncertain elements. More detail protects both parties."
  },
  {
    question: "What if a client wants to supply their own materials?",
    answer: "You can work with customer-supplied materials but should clearly state in writing that you cannot warranty these items and any failures may not be covered by your guarantee. Check materials before installation and refuse any that are clearly unsuitable or non-compliant."
  },
  {
    question: "How should I handle clients who want to negotiate on price?",
    answer: "Stand by your pricing if it's fair, explaining the value you provide (qualifications, insurance, guarantees, quality materials). You can offer alternatives such as phased work, different specifications, or payment plans rather than simply cutting your margins."
  },
  {
    question: "What records should I keep of client communications?",
    answer: "Keep all written communications (emails, texts, letters), signed quotations and variations, photographs of work, test results, and notes of significant verbal discussions. Store for at least 6 years (limitation period for contract disputes). Good records protect you if disputes arise."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3">
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
            <span>Module 7.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Client Communication
          </h1>
          <p className="text-white/80">
            Professional communication skills for building trust and successful working relationships
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>First Impressions:</strong> Professional appearance, identification, clear introductions</li>
              <li><strong>Written Clarity:</strong> Detailed quotations, variation orders, certificates on completion</li>
              <li><strong>Managing Expectations:</strong> Realistic timescales, clear scope, no hidden costs</li>
              <li><strong>Problem Solving:</strong> Listen first, investigate fairly, resolve professionally</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Clients who need technical concepts explained simply</li>
              <li><strong>Use:</strong> Plain English, analogies, and visual aids where helpful</li>
              <li><strong>Apply:</strong> Every interaction builds or damages your reputation</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Write professional quotations with clear terms and exclusions",
              "Manage client expectations through the project lifecycle",
              "Handle variations and additional work requests professionally",
              "Deliver appropriate documentation upon completion",
              "Respond to complaints constructively and fairly",
              "Build long-term relationships that generate repeat business"
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
            First Contact and Initial Enquiries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your first interaction with a potential client sets the tone for the entire relationship. Whether it's a phone call, email, or face-to-face meeting, professionalism and responsiveness are essential. Clients are often assessing multiple contractors, and those who respond promptly, clearly, and courteously stand out.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Responding to Enquiries:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Respond to enquiries within 24 hours, ideally same day for phone calls</li>
                <li>Acknowledge receipt of email enquiries even if you need time to prepare a full response</li>
                <li>Ask clarifying questions to understand the full scope before quoting</li>
                <li>Be honest about your availability and realistic about timescales</li>
                <li>If you cannot take on the work, say so politely rather than ignoring the enquiry</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Site Surveys:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Arrive on time - if delayed, call ahead to inform the client</li>
                <li>Present yourself professionally with clean workwear and company identification</li>
                <li>Show your ECS card and explain your qualifications if asked</li>
                <li>Listen carefully to understand what the client actually needs</li>
                <li>Take photographs and measurements with permission</li>
                <li>Explain any issues you identify and discuss options</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Clients are inviting you into their homes or businesses. Respect their property, their time, and their concerns. Your conduct during the survey significantly influences whether you win the work.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Writing Professional Quotations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A well-written quotation demonstrates professionalism and protects both you and your client. It should clearly define what work will be done, what materials will be used, what is excluded, and what the cost will be. Vague quotations lead to disputes; detailed quotations build trust.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Elements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Your company name, address, and contact details</li>
                  <li>Client name and site address</li>
                  <li>Clear description of work to be carried out</li>
                  <li>Materials specification (brands where relevant)</li>
                  <li>Labour and materials breakdown</li>
                  <li>Total price including VAT (state if VAT registered)</li>
                  <li>Payment terms (deposit, stage payments, completion)</li>
                  <li>Validity period (typically 30 days)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exclusions and Assumptions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Making good (plastering, decorating)</li>
                  <li>Work by other trades</li>
                  <li>Building control fees if applicable</li>
                  <li>Access equipment hire</li>
                  <li>Asbestos testing or removal</li>
                  <li>Assumptions about existing installation condition</li>
                  <li>Provisional sums for uncertain elements</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> "This quotation assumes that existing circuits are in serviceable condition and can be extended. If additional remedial work is required upon exposure, this will be quoted separately before proceeding."
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Managing Expectations During the Project
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clear, ongoing communication throughout the project prevents misunderstandings and builds client confidence. Clients appreciate being kept informed of progress, any issues discovered, and expected completion times. Silence breeds concern; regular updates build trust.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Before Starting Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm the start date and expected duration</li>
                <li>Explain daily working hours and any noise disruption</li>
                <li>Discuss access arrangements and key holding if needed</li>
                <li>Confirm power outage requirements and timing</li>
                <li>Agree where materials and tools can be stored</li>
                <li>Provide a single point of contact for questions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">During the Project:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Provide regular progress updates (daily or every few days depending on job length)</li>
                <li>Immediately notify clients of any issues or variations required</li>
                <li>Document variations in writing with costs before proceeding</li>
                <li>Keep the work area as clean and tidy as practicable</li>
                <li>Protect flooring, furniture, and finishes from damage</li>
                <li>Respect the client's property and privacy at all times</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Never proceed with additional work without written agreement on scope and cost. Verbal agreements lead to disputes. Even for small additions, send a quick email or text confirming the variation and cost.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Completion, Handover, and Follow-up
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The completion of work is as important as the installation itself. A professional handover ensures the client understands their new installation, has all required documentation, and leaves with a positive impression that leads to referrals and repeat business.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Documentation</p>
                <p className="text-white/90 text-xs">EIC, test results, circuit charts, warranties</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Demonstration</p>
                <p className="text-white/90 text-xs">Show client how to use new equipment safely</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Follow-up</p>
                <p className="text-white/90 text-xs">Check satisfaction, request feedback/reviews</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Handover Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk through completed work with the client</li>
                <li>Demonstrate operation of new equipment (consumer unit, controls, etc.)</li>
                <li>Explain the Electrical Installation Certificate and test results</li>
                <li>Provide circuit charts and distribution board schedules</li>
                <li>Hand over manufacturer warranties and user manuals</li>
                <li>Explain recommended periodic inspection intervals</li>
                <li>Leave your contact details for any follow-up queries</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A follow-up call or message one week after completion asking if everything is working well shows you care about quality and often prompts positive reviews or referrals.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Communication Techniques</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use plain English - avoid jargon unless the client is technically knowledgeable</li>
                <li>Listen actively and ask questions to understand needs fully</li>
                <li>Confirm understanding by summarising key points back to the client</li>
                <li>Put important information in writing - emails create a paper trail</li>
                <li>Be responsive - return calls and messages promptly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handling Difficult Conversations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Stay calm and professional, even if the client is upset</li>
                <li>Focus on solutions rather than defending your position</li>
                <li>Acknowledge their concerns before explaining your perspective</li>
                <li>Document the conversation and any agreed outcomes</li>
                <li>Know when to escalate issues or seek advice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Vague quotations</strong> - Lead to disputes about scope and cost</li>
                <li><strong>Poor time estimates</strong> - Overpromising delivery damages trust</li>
                <li><strong>No paper trail</strong> - Verbal agreements are hard to prove</li>
                <li><strong>Ignoring issues</strong> - Small problems grow when not addressed</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Client Communication</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Documentation to Provide</p>
                <ul className="space-y-0.5">
                  <li>Electrical Installation Certificate (EIC)</li>
                  <li>Test results and schedules</li>
                  <li>Circuit charts for distribution boards</li>
                  <li>Manufacturer warranties</li>
                  <li>Building Regulations notification (Part P)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Quotation Essentials</p>
                <ul className="space-y-0.5">
                  <li>Detailed scope of work</li>
                  <li>Materials specification</li>
                  <li>Clear exclusions</li>
                  <li>Payment terms</li>
                  <li>Validity period (30 days typical)</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section3-5">
              Next: Professional Conduct
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section3_4;
