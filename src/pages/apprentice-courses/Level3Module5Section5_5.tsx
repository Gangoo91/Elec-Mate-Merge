/**
 * Level 3 Module 5 Section 5.5 - Legal Responsibilities and Record Keeping
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Legal Responsibilities and Record Keeping - Level 3 Module 5 Section 5.5";
const DESCRIPTION = "Understand your legal obligations for electrical certification, record retention requirements, and the professional responsibilities attached to signing certificates.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What legal status does signing an Electrical Installation Certificate carry?",
    options: [
      "It's just paperwork with no legal significance",
      "It's a formal declaration that may be relied upon in legal proceedings",
      "Only relevant if payment is disputed",
      "Only matters for commercial work"
    ],
    correctIndex: 1,
    explanation: "Signing a certificate is a formal declaration that the work complies with BS 7671. This declaration can be used as evidence in legal proceedings (civil claims, criminal prosecutions) and carries professional responsibility for accuracy."
  },
  {
    id: "check-2",
    question: "How long should contractors retain copies of certificates they issue?",
    options: [
      "1 year",
      "3 years",
      "Minimum 6 years (limitation period for negligence claims)",
      "Only until the next inspection"
    ],
    correctIndex: 2,
    explanation: "Contractors should retain certificate copies for at least 6 years - the limitation period for negligence claims under the Limitation Act. Many retain records longer or indefinitely. The client should keep certificates for the life of the installation."
  },
  {
    id: "check-3",
    question: "What happens if you sign a certificate for work you didn't personally verify?",
    options: [
      "Nothing - signatures are just formalities",
      "You may be liable for any defects and could face disciplinary action or prosecution",
      "The certificate is automatically valid",
      "Only the client is responsible"
    ],
    correctIndex: 1,
    explanation: "Signing a certificate without personal verification is fraudulent misrepresentation. You may be liable for any resulting harm, face disciplinary action from competent person schemes, and potentially criminal prosecution for fraud or HSWA offences."
  },
  {
    id: "check-4",
    question: "Under Part P of the Building Regulations, who must be notified of notifiable electrical work?",
    options: [
      "No one - notification is optional",
      "Building Control or via a competent person scheme",
      "Only the electricity supplier",
      "Only the homeowner"
    ],
    correctIndex: 1,
    explanation: "Notifiable work under Part P must be notified to Building Control either directly (with inspection) or via a registered competent person scheme. Failure to notify is a criminal offence and can result in enforcement action."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which legislation makes it an offence to carry out electrical work that may cause danger?",
    options: [
      "Only Building Regulations",
      "Health and Safety at Work etc. Act 1974 and associated regulations",
      "Only BS 7671",
      "Consumer Protection Act only"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety at Work etc. Act 1974 and regulations like the Electricity at Work Regulations 1989 make it an offence to carry out work that may cause danger. Breaches can result in prosecution, fines, and imprisonment."
  },
  {
    id: 2,
    question: "What is the purpose of the Electricity at Work Regulations 1989 regarding certification?",
    options: [
      "They don't relate to certification",
      "They require duty holders to ensure electrical systems are safe - certificates provide evidence",
      "They only apply to factories",
      "They set electricity prices"
    ],
    correctAnswer: 1,
    explanation: "The EWR requires duty holders to ensure electrical systems don't give rise to danger. Certificates provide evidence that installations were safe when tested. The regulations apply to all workplaces, including domestic premises when work is being done."
  },
  {
    id: 3,
    question: "What is 'vicarious liability' in relation to electrical certification?",
    options: [
      "A type of insurance",
      "Employers may be liable for employees' negligent work and certification",
      "Liability is transferred to the client",
      "Only applies to large companies"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability means employers can be held liable for negligent acts of employees carried out in the course of employment. If an employee signs an inaccurate certificate, the employer may also be liable for resulting damages."
  },
  {
    id: 4,
    question: "What records must a competent person scheme member typically maintain?",
    options: [
      "Only a copy of their membership card",
      "Certificates, test results, training records, and calibration records",
      "Only customer complaints",
      "Just invoices"
    ],
    correctAnswer: 1,
    explanation: "Competent person scheme members must typically maintain: copies of all certificates issued, supporting test documentation, evidence of ongoing training/CPD, and test equipment calibration records. These may be audited by the scheme."
  },
  {
    id: 5,
    question: "What is the legal significance of stating 'departures from BS 7671' on a certificate?",
    options: [
      "It voids the certificate",
      "It documents agreed variations that maintain safety by alternative means",
      "It means the installation is non-compliant",
      "It's just a notes section"
    ],
    correctAnswer: 1,
    explanation: "Recording departures documents that specific variations from standard requirements were made with agreement, and that safety is maintained by alternative means. This protects the electrician by proving the departure was considered and documented."
  },
  {
    id: 6,
    question: "If a fire occurs due to faulty electrical work, what legal consequences could follow?",
    options: [
      "Only insurance claims",
      "Civil claims for damages, criminal prosecution, and professional sanctions",
      "The DNO is responsible",
      "No consequences if the installation was old"
    ],
    correctAnswer: 1,
    explanation: "Faulty work causing a fire can result in: civil claims for property damage and personal injury, criminal prosecution under HSWA/EWR (potentially manslaughter if death results), and professional sanctions including loss of competent person registration."
  },
  {
    id: 7,
    question: "What is the duty holder's responsibility regarding electrical certificates?",
    options: [
      "They have no responsibility",
      "To retain certificates and make them available for future work and inspections",
      "To return them to the electrician",
      "Only to pay for them"
    ],
    correctAnswer: 1,
    explanation: "Duty holders (usually property owners) should retain certificates for the life of the installation, make them available for future electricians and inspectors, and understand when periodic inspection is due. BS 7671 Regulation 514.9.1 requires this."
  },
  {
    id: 8,
    question: "What limitation period applies to contractual claims related to electrical work?",
    options: [
      "1 year",
      "6 years from breach (12 years if under deed)",
      "No time limit",
      "Only 3 months"
    ],
    correctAnswer: 1,
    explanation: "Under the Limitation Act 1980, contractual claims must generally be brought within 6 years of breach (12 years if the contract was executed as a deed). Certificates may be needed as evidence throughout this period."
  },
  {
    id: 9,
    question: "What should you do if asked to sign a certificate for work completed by someone else?",
    options: [
      "Sign it as a favour",
      "Refuse unless you can fully inspect and test the work yourself",
      "Sign it if you trust the other person",
      "Only sign if they pay extra"
    ],
    correctAnswer: 1,
    explanation: "Never sign certificates for work you haven't verified yourself. If asked to certify another's work, you must carry out full inspection and testing as if you had done the work. You become responsible for identifying any defects."
  },
  {
    id: 10,
    question: "What is the purpose of the 'limitations' section on certification?",
    options: [
      "To limit your liability",
      "To record any restrictions that affected inspection/testing scope",
      "To list what isn't covered by warranty",
      "It's optional and rarely used"
    ],
    correctAnswer: 1,
    explanation: "The limitations section documents any factors that restricted the scope of inspection or testing - e.g., occupied premises, inaccessible areas, parts not isolated. This provides honest disclosure and protects against claims for areas not fully inspected."
  },
  {
    id: 11,
    question: "Under what circumstances could a certificate be considered fraudulent?",
    options: [
      "Only if money is involved",
      "If test results are fabricated, work not inspected, or false information knowingly included",
      "Fraud only applies to major commercial work",
      "Certificates cannot be fraudulent"
    ],
    correctAnswer: 1,
    explanation: "A fraudulent certificate includes: fabricated test results, signing without inspection, knowingly false information, or claiming qualifications not held. This is criminal fraud and can result in prosecution, professional sanctions, and civil liability."
  },
  {
    id: 12,
    question: "What role do certificates play in property transactions?",
    options: [
      "No role - solicitors don't need them",
      "Provide evidence of electrical safety for buyers, lenders, and insurers",
      "Only needed for new builds",
      "They replace surveys"
    ],
    correctAnswer: 1,
    explanation: "Certificates are increasingly required for property transactions: buyers/solicitors request them for due diligence, mortgage lenders may require them, and insurers may need evidence of electrical safety. Missing certificates can delay or prevent sales."
  }
];

const faqs = [
  {
    question: "Can I be prosecuted for mistakes on certificates?",
    answer: "Honest mistakes with proper testing are different from negligence or fraud. If you conducted proper testing but made an error, this is typically a civil matter. However, systematic failures, fabricated results, or reckless disregard for safety can result in criminal prosecution under health and safety legislation."
  },
  {
    question: "What if I discover later that a certificate I issued was wrong?",
    answer: "Contact the client immediately, explain the issue, and offer to rectify. Document your actions. If there's a safety risk, advise accordingly. Proactive honesty typically results in better outcomes than concealment. Inform your insurance if necessary."
  },
  {
    question: "Do I need professional indemnity insurance?",
    answer: "While not legally mandatory for all electricians, professional indemnity (PI) insurance protects against claims arising from professional negligence. Most competent person schemes require it. It covers legal costs and damages if you're sued for errors in certification or advice."
  },
  {
    question: "Who owns the certificate - me or the client?",
    answer: "The client owns the original certificate - it belongs to the installation. You retain a copy for your records. The certificate should pass with property ownership, so advise clients to include it with property documents. You keep copies for your liability protection."
  },
  {
    question: "What if a client refuses to let me complete proper testing?",
    answer: "Document their refusal in writing. You cannot certify work you haven't properly tested. Either agree reasonable limitations (documented on certificate) or refuse to certify until proper testing is possible. Never fabricate results or certify untested work."
  },
  {
    question: "How does Building Regulations approval relate to certification?",
    answer: "Building Regulations (Part P) approval and certification are related but separate. Part P requires notification of notifiable work. The certificate provides evidence of compliance with BS 7671. Both are required - Part P approval doesn't replace the need for proper certification."
  }
];

const Level3Module5Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Legal Responsibilities and Record Keeping
          </h1>
          <p className="text-white/80">
            Understanding the legal weight of your signature and professional obligations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Legal status:</strong> Certificate is formal declaration</li>
              <li><strong>Retention:</strong> Keep copies minimum 6 years</li>
              <li><strong>Liability:</strong> Civil, criminal, and professional</li>
              <li><strong>Honesty:</strong> Never sign what you haven't verified</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Signature boxes, declaration statements</li>
              <li><strong>Use:</strong> Complete honestly, document limitations</li>
              <li><strong>Apply:</strong> Keep copies, maintain test records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the legal weight of certification signatures",
              "Know record retention requirements and periods",
              "Recognize civil and criminal liability exposure",
              "Implement proper documentation practices",
              "Handle limitations and departures correctly",
              "Protect yourself through honest, thorough practice"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Legal Status of Certificates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Status of Certificates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When you sign an electrical certificate, you make a formal declaration that the work complies with BS 7671 and is safe. This isn't just paperwork - it's a legal statement that can be used as evidence in court proceedings and carries significant professional responsibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Your signature declares:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Designer:</strong> The design complies with BS 7671 and is suitable</li>
                <li><strong>Constructor:</strong> Work was built to design with proper materials/workmanship</li>
                <li><strong>Inspector:</strong> Inspection and testing confirm compliance</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Civil Liability</p>
                <p className="text-white/90 text-xs">Negligence claims for damages</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Criminal Liability</p>
                <p className="text-white/90 text-xs">HSWA, EWR prosecution</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Professional</p>
                <p className="text-white/90 text-xs">Scheme sanctions, reputation</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Never sign a certificate for work you haven't personally inspected and tested. Signing based on another's assurance or without verification is fraudulent misrepresentation with serious consequences.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Record Retention Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Record Retention Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper record keeping protects you, provides evidence of compliance, and meets professional obligations. Different records need keeping for different periods, with some requiring retention for the life of the installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor Records</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Copies of all certificates issued</li>
                  <li>Supporting test result schedules</li>
                  <li>Correspondence regarding departures</li>
                  <li>Client instructions/agreements</li>
                  <li>Test equipment calibration records</li>
                  <li>Training and competence evidence</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Periods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>6 years:</strong> Minimum for negligence claims</li>
                  <li><strong>12 years:</strong> If contract under deed</li>
                  <li><strong>15 years:</strong> Personal injury claims</li>
                  <li><strong>Indefinite:</strong> Best practice approach</li>
                  <li><strong>Client:</strong> Life of installation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why retention matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Defence against claims years after work completed</li>
                <li>Evidence for insurance purposes</li>
                <li>Reference for future work at same property</li>
                <li>Competent person scheme audit requirements</li>
                <li>Professional reputation protection</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> Store records securely with backup copies. Use consistent filing systems (by date, address, or certificate number). Electronic storage is acceptable but maintain readable formats and secure backups.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Liability and Consequences */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Liability and Consequences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Faulty electrical work can have severe consequences - property damage, injury, or death. The legal ramifications for the responsible electrician can be life-changing. Understanding these risks encourages thorough, honest practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of liability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Civil (negligence):</strong> Compensation claims for damage/injury caused by substandard work</li>
                <li><strong>Criminal (safety):</strong> Prosecution under HSWA, Electricity at Work Regs, Building Regs</li>
                <li><strong>Professional:</strong> Competent person scheme suspension/expulsion, reputation damage</li>
                <li><strong>Contractual:</strong> Breach of contract claims from clients</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Potential Consequences</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Unlimited fines for safety breaches</li>
                  <li>Imprisonment for serious offences</li>
                  <li>Personal injury compensation claims</li>
                  <li>Property damage liability</li>
                  <li>Loss of professional registration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Protection Through Practice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Thorough inspection and testing</li>
                  <li>Accurate, honest documentation</li>
                  <li>Proper record keeping</li>
                  <li>Appropriate insurance cover</li>
                  <li>Ongoing training and competence</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The best protection is doing the job properly. Cutting corners, fabricating results, or signing without verification creates massive liability exposure. Honest work with proper documentation protects you.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Building Regulations and Notification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Regulations and Notification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In England and Wales, Part P of the Building Regulations requires notification of certain electrical work in dwellings. Failure to comply is a criminal offence. Understanding notification requirements is part of your legal responsibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Notifiable work includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>New circuits in dwellings</li>
                <li>Consumer unit replacement</li>
                <li>Work in special locations (bathrooms, outdoors)</li>
                <li>Most work except minor repairs and like-for-like replacements</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Competent Person</p>
                <p className="text-white/90 text-xs">Self-certify and notify via scheme</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Non-Registered</p>
                <p className="text-white/90 text-xs">Apply to Building Control before work</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Consequences of non-notification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Criminal offence with potential fine</li>
                <li>Enforcement notice requiring remedial work</li>
                <li>Problems with property sale/insurance</li>
                <li>Liability if work later causes problems</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Scotland and Northern Ireland have different regulations. Ensure you understand the requirements for your jurisdiction. Competent person scheme membership doesn't automatically cover all territories.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Protecting Yourself Legally</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Never sign certificates for work you haven't verified</li>
                <li>Document all limitations honestly and clearly</li>
                <li>Keep comprehensive records of all work</li>
                <li>Maintain appropriate insurance coverage</li>
                <li>Stay current with regulations and training</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Date and sign all certificates at time of completion</li>
                <li>Use consistent reference numbering systems</li>
                <li>Store originals and copies separately</li>
                <li>Maintain backup copies of electronic records</li>
                <li>Record any variations agreed with client</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Red Flags - Never Do These</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Backdating:</strong> Always use actual completion date</li>
                <li><strong>Fabricating:</strong> Never invent test results</li>
                <li><strong>Ghost signing:</strong> Don't sign for others' work</li>
                <li><strong>Ignoring issues:</strong> Document problems found</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>Health and Safety at Work Act 1974</li>
                  <li>Electricity at Work Regulations 1989</li>
                  <li>Building Regulations Part P</li>
                  <li>Limitation Act 1980</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Retention Periods</p>
                <ul className="space-y-0.5">
                  <li>Negligence claims: 6 years</li>
                  <li>Deed contracts: 12 years</li>
                  <li>Personal injury: 15 years</li>
                  <li>Best practice: Indefinitely</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6">
              Next: Problem Solving
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section5_5;
