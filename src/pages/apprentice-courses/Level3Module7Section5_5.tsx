/**
 * Level 3 Module 7 Section 5.5 - Legal Requirements
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
const TITLE = "Legal Requirements for Electrical Contractors - Level 3 Module 7 Section 5.5";
const DESCRIPTION = "Understand legal requirements for UK electrical contractors. Learn about consumer rights, contracts, data protection, employment law, and regulatory compliance.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under the Consumer Rights Act 2015, what must services provided to consumers be?",
    options: [
      "As cheap as possible",
      "Carried out with reasonable care and skill, in a reasonable time, at a reasonable price if not agreed",
      "Completed within 24 hours",
      "Guaranteed for life"
    ],
    correctIndex: 1,
    explanation: "The Consumer Rights Act 2015 requires services to be carried out with reasonable care and skill. If no time is agreed, it must be done in a reasonable time. If no price is agreed, the price must be reasonable."
  },
  {
    id: "check-2",
    question: "What is the 'cooling off' period for contracts signed in a consumer's home?",
    options: [
      "No cooling off period applies",
      "7 days",
      "14 days from the day after signing",
      "30 days"
    ],
    correctIndex: 2,
    explanation: "Under the Consumer Contracts Regulations, consumers have a 14-day cooling off period for contracts signed away from business premises (including in their home). They can cancel without giving a reason. Know the rules about when work can start during this period."
  },
  {
    id: "check-3",
    question: "What does GDPR require you to do with customer personal data?",
    options: [
      "Share it freely with other contractors",
      "Process it fairly and lawfully, keep it secure, and only retain it as long as necessary",
      "Keep it indefinitely just in case",
      "GDPR doesn't apply to small businesses"
    ],
    correctIndex: 1,
    explanation: "GDPR applies to all businesses processing personal data. You must process data fairly and lawfully, keep it secure, only collect what you need, keep it accurate, and not retain it longer than necessary. You also need a lawful basis for processing."
  },
  {
    id: "check-4",
    question: "What legal document should govern your relationship with clients on every job?",
    options: [
      "Legal documents are only for large companies",
      "A written contract or terms and conditions covering scope, payment, and dispute resolution",
      "A verbal agreement is always sufficient",
      "The client's own contract only"
    ],
    correctIndex: 1,
    explanation: "Written contracts or terms and conditions protect both parties. They should cover scope of work, payment terms, variations procedure, cancellation, liability limitations, and dispute resolution. They don't need to be complex but should be clear."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which legislation protects consumers when buying services from tradespeople?",
    options: [
      "The Sale of Goods Act only",
      "The Consumer Rights Act 2015",
      "The Health and Safety at Work Act",
      "The Electricity at Work Regulations"
    ],
    correctAnswer: 1,
    explanation: "The Consumer Rights Act 2015 protects consumers when purchasing services. It requires services to be performed with reasonable care and skill, and gives consumers remedies if work is substandard."
  },
  {
    id: 2,
    question: "What does the 'limitation period' mean for contracts?",
    options: [
      "How long your insurance is valid",
      "The time limit within which legal action can be brought for breach of contract (6 years in most cases)",
      "How long a quotation is valid",
      "The maximum contract value"
    ],
    correctAnswer: 1,
    explanation: "The limitation period is the time within which legal action must be brought. For simple contracts it's 6 years from breach. For contracts under deed it's 12 years. This is why you should keep records for at least 6 years."
  },
  {
    id: 3,
    question: "What should happen if a customer claims your work is defective?",
    options: [
      "Ignore them",
      "Investigate fairly, and if defective, you have a duty to put it right",
      "Immediately refer them to your lawyer",
      "Tell them to use the warranty"
    ],
    correctAnswer: 1,
    explanation: "Under consumer protection law, if work is not done with reasonable care and skill, you must put it right. Investigate complaints fairly, and if the work is defective, remedy it. This maintains your reputation and meets legal obligations."
  },
  {
    id: 4,
    question: "What is a retention of title clause?",
    options: [
      "A clause retaining your job title",
      "A provision that materials remain your property until fully paid for",
      "A clause about job security",
      "A provision about intellectual property"
    ],
    correctAnswer: 1,
    explanation: "A retention of title clause states that materials you supply remain your property until paid for. This protects you if a customer doesn't pay - you can legally reclaim unpaid materials. Include in your terms and conditions."
  },
  {
    id: 5,
    question: "What does the Construction (Design and Management) Regulations 2015 (CDM) apply to?",
    options: [
      "Only very large construction projects",
      "Most construction work, with additional duties when certain thresholds are met",
      "Only design work",
      "Only commercial projects"
    ],
    correctAnswer: 1,
    explanation: "CDM applies to all construction work, though some duties only apply to certain project types or sizes. Even domestic work has requirements. Understanding your duties under CDM, especially as a contractor, is essential."
  },
  {
    id: 6,
    question: "When must you register with the Information Commissioner's Office (ICO)?",
    options: [
      "Only large companies need to register",
      "If you process personal data for business purposes, unless exempt",
      "Only if you have a website",
      "Registration is voluntary"
    ],
    correctAnswer: 1,
    explanation: "Most businesses that process personal data must register with the ICO and pay a fee. Some exemptions exist for very small businesses processing limited data, but most contractors handling customer data need to register."
  },
  {
    id: 7,
    question: "What is 'vicarious liability'?",
    options: [
      "Liability for your own actions only",
      "An employer's liability for the actions of their employees while at work",
      "Insurance coverage",
      "A type of criminal charge"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability means employers can be held responsible for wrongful acts of employees committed during their employment. This is why employers' liability insurance is required, and why proper training and supervision matter."
  },
  {
    id: 8,
    question: "Under what circumstances can you refuse to do work a customer requests?",
    options: [
      "Never - the customer is always right",
      "When the work would breach regulations, be unsafe, or be illegal",
      "Only if you don't want to",
      "Only if they can't pay upfront"
    ],
    correctAnswer: 1,
    explanation: "You can and should refuse work that would breach regulations (BS 7671, Building Regulations), be unsafe, or be illegal. You cannot agree to install non-compliant work even if the customer requests it."
  },
  {
    id: 9,
    question: "What is required for a valid contract?",
    options: [
      "Only a written document",
      "Offer, acceptance, consideration (exchange of value), intention to create legal relations, and capacity",
      "Only a signature",
      "Payment in advance"
    ],
    correctAnswer: 1,
    explanation: "A valid contract requires: offer and acceptance, consideration (something of value exchanged), intention to create legal relations, and parties with capacity to contract. Contracts can be verbal but written is recommended for clarity."
  },
  {
    id: 10,
    question: "What must you do if you have a data breach involving customer personal data?",
    options: [
      "Nothing unless caught",
      "Report to the ICO within 72 hours if it's likely to result in risk to individuals, and notify affected individuals if high risk",
      "Only report if you feel like it",
      "Delete all evidence"
    ],
    correctAnswer: 1,
    explanation: "GDPR requires reporting data breaches to the ICO within 72 hours if they're likely to result in risk to individuals. If the breach is high risk, you must also notify affected individuals. Document all breaches even if not reportable."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need written contracts for domestic work?",
    answer: "While verbal contracts are legally valid, written contracts or terms and conditions are strongly recommended. They provide clarity for both parties, evidence if disputes arise, and demonstrate professionalism. At minimum, have clear written terms on your quotations."
  },
  {
    question: "What happens if a customer won't pay?",
    answer: "First, send reminders and try to resolve any issues. If unpaid, you can send a formal 'letter before action', then pursue through small claims court (for smaller sums) or county court. You cannot disconnect work you've done or remove installed materials without going through legal processes."
  },
  {
    question: "Can I limit my liability in contracts?",
    answer: "You can limit liability in contracts, but limitations must be reasonable. You cannot exclude liability for death or personal injury from negligence. Consumer contracts have additional restrictions - unfair terms can be struck out. Get legal advice on your terms."
  },
  {
    question: "What employment law applies if I take on staff?",
    answer: "Taking on employees brings significant legal obligations: employment contracts, minimum wage, holiday pay, workplace pension (auto-enrolment), employer's liability insurance, health and safety duties, and anti-discrimination laws. Consider getting HR advice when first employing."
  },
  {
    question: "Do I need to register for data protection?",
    answer: "Most businesses processing personal data need to register with the ICO and pay an annual fee (currently 40-60 GBP for most small businesses). You must also have a privacy policy explaining how you handle data, and processes to keep data secure and respond to data subject requests."
  },
  {
    question: "What should I do if a customer threatens legal action?",
    answer: "Take it seriously. Review the facts objectively. Try to resolve the issue amicably - most disputes don't need to go to court. If you're at fault, acknowledge and offer remedy. If you believe you're not at fault, document your position. Consider mediation before litigation. Inform your insurance company if relevant."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section5_5 = () => {
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
            <span>Module 7.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Legal Requirements
          </h1>
          <p className="text-white/80">
            Understanding your legal obligations as an electrical contractor
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Consumer Rights:</strong> Work must be done with reasonable care and skill</li>
              <li><strong>Contracts:</strong> Written terms protect both parties</li>
              <li><strong>Data Protection:</strong> GDPR applies to all customer data you hold</li>
              <li><strong>Compliance:</strong> Know your regulatory and safety obligations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Situations requiring legal awareness</li>
              <li><strong>Use:</strong> Written contracts and proper procedures</li>
              <li><strong>Apply:</strong> Compliance prevents costly problems</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand consumer protection laws and your obligations",
              "Know the essential elements of contracts",
              "Apply data protection requirements (GDPR)",
              "Understand cooling off periods and cancellation rights",
              "Recognise when legal advice is needed",
              "Implement compliant business practices"
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
            Consumer Protection Law
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Consumer Rights Act 2015 is the primary legislation protecting consumers who buy services. Understanding your obligations helps you provide compliant service and handle complaints properly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Consumer Rights:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Reasonable care and skill:</strong> Work must be done to the standard expected of a competent tradesperson</li>
                <li><strong>Reasonable time:</strong> If no completion date agreed, work must be done in reasonable time</li>
                <li><strong>Reasonable price:</strong> If no price agreed, the price charged must be reasonable</li>
                <li><strong>Information provided:</strong> Any information you give becomes part of the contract</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">If Work Is Not Satisfactory:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consumer can require you to put it right at no extra cost</li>
                <li>If you can't or won't put it right, consumer can claim price reduction</li>
                <li>Consumer may be entitled to damages for losses caused</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> These are minimum legal requirements. Good business practice often exceeds legal minimums. Meeting complaints fairly and promptly protects your reputation better than arguing about legal minimums.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Contracts and Terms of Business
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every time you agree to do work for payment, you create a contract. While contracts don't need to be written to be valid, having clear written terms protects both you and your customer.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contract Essentials</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Scope of work clearly defined</li>
                  <li>Price and payment terms</li>
                  <li>Timescale for completion</li>
                  <li>Who is responsible for what</li>
                  <li>Procedure for changes (variations)</li>
                  <li>Cancellation terms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Terms to Include</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Retention of title clause</li>
                  <li>Liability limitations (where permitted)</li>
                  <li>Dispute resolution procedure</li>
                  <li>Force majeure clause</li>
                  <li>Warranty/guarantee terms</li>
                  <li>Intellectual property (if relevant)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> "The price quoted is valid for 30 days and is based on work commencing within 60 days. If commencement is delayed beyond this, the price may be revised to reflect any changes in material costs."
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Data Protection (GDPR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018 apply to all businesses processing personal data. Customer names, addresses, contact details, and any other personal information you hold are covered.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Lawful Basis</p>
                <p className="text-white/90 text-xs">Have a legal reason to hold data</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Security</p>
                <p className="text-white/90 text-xs">Keep data safe from unauthorised access</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Retention</p>
                <p className="text-white/90 text-xs">Don't keep data longer than needed</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">GDPR Compliance Basics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Register with ICO and pay annual fee (most businesses)</li>
                <li>Have a privacy policy explaining how you use data</li>
                <li>Only collect data you actually need</li>
                <li>Keep data secure (password-protected systems, secure storage)</li>
                <li>Delete data when no longer needed</li>
                <li>Respond to data subject requests (access, deletion) within one month</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Personal data includes any information that identifies someone: names, addresses, phone numbers, email addresses, and potentially photographs of their property. Treat all such data with care.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Consumer Contracts and Cooling Off
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When you agree contracts with consumers in their home (or away from your business premises), special rules apply. The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 give consumers cooling off rights.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cooling Off Period:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>14-day cooling off period from day after contract agreed</li>
                <li>Consumer can cancel without reason during this period</li>
                <li>If work starts during cooling off (with consumer's express consent), consumer may have to pay for work done if they cancel</li>
                <li>You must provide cancellation information in writing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Pre-Contract Information:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Your business identity and contact details</li>
                <li>Main characteristics of the service</li>
                <li>Total price (including VAT)</li>
                <li>Payment arrangements</li>
                <li>Cancellation rights and model cancellation form</li>
                <li>Complaints handling procedure</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> If a customer agrees to a rewire while you're at their home for a survey, they have 14 days to change their mind. If they want work to start immediately, get written consent and explain they'll pay for work done if they later cancel.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Creating Compliant Processes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Have standard terms and conditions reviewed by a solicitor</li>
                <li>Provide required information before contracts are agreed</li>
                <li>Keep records of what was agreed and when</li>
                <li>Train yourself (and staff) on consumer rights</li>
                <li>Have a complaints handling procedure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handling Disputes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Take complaints seriously and respond promptly</li>
                <li>Investigate objectively - you may be at fault</li>
                <li>Try to resolve issues directly first</li>
                <li>Consider mediation before litigation</li>
                <li>Document everything in case it escalates</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No written terms</strong> - Verbal agreements are hard to prove</li>
                <li><strong>Ignoring cooling off</strong> - Non-compliance has consequences</li>
                <li><strong>Poor data security</strong> - Customer data must be protected</li>
                <li><strong>Aggressive response to complaints</strong> - Makes things worse, not better</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Legal Requirements</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>Consumer Rights Act 2015</li>
                  <li>Consumer Contracts Regulations 2013</li>
                  <li>UK GDPR / Data Protection Act 2018</li>
                  <li>CDM Regulations 2015</li>
                  <li>Building Regulations (Part P)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Timeframes</p>
                <ul className="space-y-0.5">
                  <li>14 days - cooling off period</li>
                  <li>72 hours - data breach reporting</li>
                  <li>1 month - respond to data requests</li>
                  <li>6 years - contract limitation period</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section5-6">
              Next: Insurance and Liability
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section5_5;
