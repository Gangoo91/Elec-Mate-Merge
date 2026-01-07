/**
 * Level 3 Module 7 Section 3.5 - Professional Conduct
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
const TITLE = "Professional Conduct for Electricians - Level 3 Module 7 Section 3.5";
const DESCRIPTION = "Understand professional conduct standards for UK electricians. Learn about codes of practice, ethical behaviour, representing your employer, and maintaining professional standards on site.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "You discover a colleague has been signing off work without completing proper tests. What should you do?",
    options: [
      "Ignore it - it's not your responsibility",
      "Report the matter to your supervisor or manager",
      "Confront them publicly on site",
      "Sign off their work yourself to cover for them"
    ],
    correctIndex: 1,
    explanation: "Professional conduct requires reporting safety concerns through appropriate channels. Falsifying test certificates is a serious breach that puts people at risk and you have a duty to report it."
  },
  {
    id: "check-2",
    question: "A client offers you cash to avoid VAT on a job. How should you respond?",
    options: [
      "Accept if the amount is small",
      "Politely decline and explain you must work within the law",
      "Report the client to HMRC",
      "Offer a discount but still declare the income"
    ],
    correctIndex: 1,
    explanation: "Tax evasion is illegal. Professional conduct requires declining such offers politely but firmly. You must operate within the law regardless of client requests."
  },
  {
    id: "check-3",
    question: "What does maintaining confidentiality as an electrician typically mean?",
    options: [
      "Never speaking to anyone about any work",
      "Not discussing clients' personal information, security details, or commercial sensitive matters",
      "Refusing to provide documentation to clients",
      "Not talking to other trades on site"
    ],
    correctIndex: 1,
    explanation: "Professional confidentiality means protecting clients' personal information, security arrangements (alarm codes, access details), and any commercially sensitive information you become aware of during your work."
  },
  {
    id: "check-4",
    question: "You are working as a subcontractor and notice the main contractor is cutting corners on safety. What is your responsibility?",
    options: [
      "Nothing - you're only responsible for your own work",
      "Complete your work quickly and leave",
      "Raise concerns with the main contractor and document them, refuse to participate in unsafe practices",
      "Report directly to the HSE without speaking to anyone"
    ],
    correctIndex: 2,
    explanation: "Professional conduct requires raising safety concerns. You should discuss with the main contractor first, document your concerns, and refuse to participate in unsafe practices. Escalate to HSE if concerns are ignored."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which organisation publishes a Code of Professional Conduct that applies to electrical engineers and technicians?",
    options: [
      "The Health and Safety Executive",
      "The Institution of Engineering and Technology (IET)",
      "HMRC",
      "Local authorities"
    ],
    correctAnswer: 1,
    explanation: "The IET publishes a Code of Conduct that sets standards for professional behaviour. Members are expected to act with integrity, competence, and in the public interest."
  },
  {
    id: 2,
    question: "What is the primary purpose of professional codes of conduct in the electrical industry?",
    options: [
      "To increase prices for electrical work",
      "To protect the public, maintain standards, and uphold the profession's reputation",
      "To reduce competition between contractors",
      "To make work more complicated"
    ],
    correctAnswer: 1,
    explanation: "Codes of conduct exist to protect the public by ensuring competent, safe work; maintain industry standards; and uphold the reputation of the electrical profession."
  },
  {
    id: 3,
    question: "You arrive at a domestic property and find no one home despite an appointment. What should you do?",
    options: [
      "Wait indefinitely until someone arrives",
      "Leave a note or contact the client, then move to your next job",
      "Start work anyway if you can access the property",
      "Charge for the wasted time without attempting contact"
    ],
    correctAnswer: 1,
    explanation: "Professional conduct means attempting to contact the client, leaving a card or note explaining you called, and then managing your time effectively by moving to other work. Do not enter property without permission."
  },
  {
    id: 4,
    question: "How should you represent your employer when dealing with clients?",
    options: [
      "Always criticise competitors to win work",
      "Act professionally, maintain confidentiality, and uphold the company's reputation",
      "Share internal company information to appear knowledgeable",
      "Promise whatever the client wants to secure the job"
    ],
    correctAnswer: 1,
    explanation: "You represent your employer in every client interaction. This means professional behaviour, maintaining confidentiality about internal matters, not criticising competitors, and only making promises you can keep."
  },
  {
    id: 5,
    question: "A homeowner asks you to install a socket outlet in their bathroom above the basin. What is the professional response?",
    options: [
      "Install it because the customer is always right",
      "Refuse without explanation",
      "Explain the regulation, why it exists for safety, and offer compliant alternatives",
      "Do it but don't mention it on the certificate"
    ],
    correctAnswer: 2,
    explanation: "Professional conduct requires explaining regulations clearly. BS 7671 restricts socket outlets in bathrooms for safety. Offer compliant alternatives such as shaver units or sockets outside the zones."
  },
  {
    id: 6,
    question: "What should you do if you make a mistake during an installation?",
    options: [
      "Hide it and hope no one notices",
      "Blame it on materials or other factors",
      "Own up to it, rectify it properly, and learn from it",
      "Leave before anyone finds out"
    ],
    correctAnswer: 2,
    explanation: "Professional integrity means acknowledging mistakes, taking responsibility to rectify them properly, and learning to prevent recurrence. Hiding errors damages trust and may create safety risks."
  },
  {
    id: 7,
    question: "You overhear confidential information about a commercial client's business plans while on site. What should you do?",
    options: [
      "Share it with colleagues for discussion",
      "Use it to approach their competitors for work",
      "Keep it confidential and not disclose or use it",
      "Post about it on social media"
    ],
    correctAnswer: 2,
    explanation: "Professional confidentiality extends to all information gained during your work. Commercial information, business plans, and other sensitive data must not be disclosed or used for personal gain."
  },
  {
    id: 8,
    question: "How should you handle disagreements with other trades on a construction site?",
    options: [
      "Argue loudly to establish dominance",
      "Discuss professionally, involve the site manager if needed, and document decisions",
      "Do whatever they say to avoid conflict",
      "Complain to the client directly"
    ],
    correctAnswer: 1,
    explanation: "Professional conduct means addressing disagreements calmly and professionally. Involve the site manager for coordination issues and document any decisions that affect your work or responsibility."
  },
  {
    id: 9,
    question: "What is the appropriate action if you are asked to work beyond your competence?",
    options: [
      "Attempt it anyway and hope for the best",
      "Refuse and explain your limitations, suggesting someone qualified",
      "Accept and learn as you go",
      "Subcontract it without telling the client"
    ],
    correctAnswer: 1,
    explanation: "Working within your competence is a fundamental professional requirement. If asked to do work beyond your competence, you should decline and suggest someone with appropriate qualifications."
  },
  {
    id: 10,
    question: "A competitor's employee approaches you for confidential information about your company's pricing. How should you respond?",
    options: [
      "Share some information to be friendly",
      "Politely decline and maintain confidentiality",
      "Exchange information for their company's data",
      "Report them to their employer"
    ],
    correctAnswer: 1,
    explanation: "Company pricing, methods, and other internal information are confidential. Professional conduct requires maintaining this confidentiality even in informal conversations with competitors' staff."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What happens if I breach professional codes of conduct?",
    answer: "Consequences depend on the breach severity. Minor issues may result in informal guidance. Serious breaches could lead to disciplinary action by professional bodies (loss of membership), damage to reputation, loss of work, or in cases involving illegal activity, prosecution. Persistent poor conduct may also affect your ability to obtain ECS cards or scheme membership."
  },
  {
    question: "Do professional standards apply when I'm working for family or friends?",
    answer: "Yes. Professional standards apply to all electrical work regardless of who it's for. Work for family and friends should meet the same quality, safety, and documentation standards as commercial work. If anything, maintaining standards protects these relationships by ensuring safe, compliant installations."
  },
  {
    question: "How do I handle a situation where my employer asks me to cut corners?",
    answer: "Document your concerns in writing, explaining the safety and compliance issues. If the employer insists on unsafe practices, you may need to refuse and potentially report to the HSE. Remember that you can be personally prosecuted under HASAWA and EWR regardless of employer instructions."
  },
  {
    question: "Is it unprofessional to recommend competitors if I can't do a job?",
    answer: "Not at all - it's actually professional to recommend qualified alternatives when you can't help. This serves the client's interests and often generates goodwill that leads to future referrals. The key is recommending competent contractors you would trust with your own work."
  },
  {
    question: "How should I handle online reviews or social media comments about my work?",
    answer: "Respond professionally to both positive and negative feedback. Thank people for positive reviews. For negative reviews, acknowledge concerns, offer to discuss privately to resolve issues, and never respond with hostility. Your online reputation reflects your professional conduct."
  },
  {
    question: "What's the professional approach to pricing when I know a client has received cheaper quotes?",
    answer: "Maintain your pricing if it reflects fair value. Explain what your price includes (quality materials, insurance, guarantees, certification) rather than criticising competitors. If appropriate, offer alternatives or payment plans. Never compromise on quality or compliance to match cheap quotes."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section3_5 = () => {
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
            <Link to="../level3-module7-section3">
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
            <span>Module 7.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Conduct
          </h1>
          <p className="text-white/80">
            Standards of behaviour that define a true professional electrician
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Integrity:</strong> Honest, ethical behaviour in all dealings</li>
              <li><strong>Competence:</strong> Work within your abilities, maintain skills</li>
              <li><strong>Confidentiality:</strong> Protect client and employer information</li>
              <li><strong>Accountability:</strong> Take responsibility for your work and actions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Situations that test your professional standards</li>
              <li><strong>Use:</strong> Consistent ethical decision-making framework</li>
              <li><strong>Apply:</strong> Every interaction reflects on you and your profession</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the core principles of professional conduct",
              "Apply ethical standards to everyday work situations",
              "Represent your employer appropriately in all dealings",
              "Maintain confidentiality with clients and employers",
              "Handle conflicts of interest professionally",
              "Uphold the reputation of the electrical profession"
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
            Core Principles of Professional Conduct
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional conduct goes beyond technical competence. It encompasses how you behave, how you treat others, and how you uphold the standards of your profession. For electricians, this is particularly important because your work directly affects people's safety and their trust in the electrical industry.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The IET Code of Conduct requires members to:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Act with integrity:</strong> Be honest and trustworthy in all professional relationships</li>
                <li><strong>Maintain competence:</strong> Only undertake work within your competence and keep skills up to date</li>
                <li><strong>Promote public safety:</strong> Put the safety of the public above all other considerations</li>
                <li><strong>Exercise professional judgement:</strong> Make reasoned decisions based on evidence and best practice</li>
                <li><strong>Support others:</strong> Share knowledge, mentor colleagues, and support professional development</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Professional conduct is not optional - it's what distinguishes a qualified tradesperson from someone who simply does electrical work. Your reputation is built on consistent professional behaviour over time.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ethical Behaviour in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ethical dilemmas arise regularly in electrical work. How you handle these situations defines your professional character. The right choice isn't always the easiest or most profitable - but it's always the one that maintains your integrity and protects others.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ethical Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Honest quotations without hidden extras</li>
                  <li>Using specified materials, not cheaper substitutes</li>
                  <li>Completing all tests properly, not just paperwork</li>
                  <li>Declaring and paying tax on all income</li>
                  <li>Honouring guarantees and warranties</li>
                  <li>Admitting and rectifying mistakes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unethical Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Creating unnecessary work to increase bills</li>
                  <li>Signing certificates for work not done</li>
                  <li>Accepting cash to evade tax</li>
                  <li>Badmouthing competitors unfairly</li>
                  <li>Claiming qualifications you don't hold</li>
                  <li>Covering up defective work</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A client asks you to sign off a Minor Works Certificate for electrical work done by their unqualified friend. Even if the work appears safe, signing would be fraudulent and could expose you to serious liability if problems occur later.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Representing Your Employer
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When working for an employer, you represent them in every client interaction. Your conduct directly affects their reputation, and theirs affects yours. This creates mutual obligations - your employer should support your professional development, and you should uphold their standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Professional Representation Includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Presenting a professional appearance in company uniform or workwear</li>
                <li>Speaking positively about your employer and colleagues</li>
                <li>Maintaining confidentiality about internal company matters</li>
                <li>Not undermining colleagues or management to clients</li>
                <li>Referring complex issues to appropriate people rather than guessing</li>
                <li>Following company procedures even if you disagree with them</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Conflicts of Interest:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Never solicit work privately from your employer's clients</li>
                <li>Don't use company resources or time for personal work</li>
                <li>Declare any personal interests that might conflict with your duties</li>
                <li>If asked to do something unethical, raise concerns through proper channels</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> If you have concerns about your employer's practices, document them and raise through appropriate channels (supervisor, HR, or if serious, external bodies). Don't simply ignore ethical issues.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Confidentiality and Professional Boundaries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians often have access to private spaces and sensitive information. Maintaining confidentiality and respecting professional boundaries is essential for trust and continued access to work.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Personal Data</p>
                <p className="text-white/90 text-xs">Names, addresses, contact details</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Security Info</p>
                <p className="text-white/90 text-xs">Alarm codes, key locations, access</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Business Data</p>
                <p className="text-white/90 text-xs">Commercial plans, financial info</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Professional Boundaries:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Don't share client information with others unnecessarily</li>
                <li>Never take photographs of private spaces without permission</li>
                <li>Keep professional distance - avoid inappropriate relationships</li>
                <li>Don't discuss one client's business with another</li>
                <li>Secure any keys or access codes entrusted to you</li>
                <li>Report any data breaches immediately</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> While rewiring a home, you notice valuable items and security arrangements. This information must never be shared with anyone. Even casual comments like "they've got a nice setup" could enable theft.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Conduct</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Arrive on time, call ahead if delayed</li>
                <li>Maintain a clean and tidy work area</li>
                <li>Respect the client's property - use dust sheets, remove shoes if asked</li>
                <li>Keep noise and disruption to reasonable levels</li>
                <li>Leave the site clean and remove all waste</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Relationships with Other Trades</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Communicate professionally about coordination issues</li>
                <li>Respect other trades' work areas and schedules</li>
                <li>Raise concerns through site management, not confrontation</li>
                <li>Document any issues that might affect your installation</li>
                <li>Support safe working practices across the site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Social media oversharing</strong> - Don't post about clients, locations, or work details</li>
                <li><strong>Casual comments</strong> - Information shared socially can spread unexpectedly</li>
                <li><strong>Taking shortcuts</strong> - Even small compromises erode your professional standards</li>
                <li><strong>Ignoring concerns</strong> - Failing to report safety issues makes you complicit</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Professional Conduct</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Core Principles</p>
                <ul className="space-y-0.5">
                  <li>Integrity in all dealings</li>
                  <li>Competence within your abilities</li>
                  <li>Confidentiality of information</li>
                  <li>Accountability for your actions</li>
                  <li>Respect for others</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Professional Bodies</p>
                <ul className="space-y-0.5">
                  <li>IET (Institution of Engineering and Technology)</li>
                  <li>JIB (Joint Industry Board)</li>
                  <li>ECA (Electrical Contractors Association)</li>
                  <li>NAPIT, NICEIC, ELECSA (competent person schemes)</li>
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
            <Link to="../level3-module7-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section3_5;
