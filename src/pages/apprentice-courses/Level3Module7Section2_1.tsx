/**
 * Level 3 Module 7 Section 2.1 - Duty of Care and Professional Ethics
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Duty of Care and Professional Ethics - Level 3 Module 7 Section 2.1";
const DESCRIPTION = "Understanding professional responsibilities, ethical obligations, and duty of care requirements for qualified electricians in the UK electrical industry.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does 'duty of care' mean in the electrical industry?",
    options: [
      "Only caring about completing work quickly",
      "A legal obligation to ensure your work doesn't cause harm to others",
      "Only following instructions from your employer",
      "Caring about your own safety but not others"
    ],
    correctIndex: 1,
    explanation: "Duty of care is a legal obligation requiring electricians to take reasonable steps to ensure their work does not cause harm to clients, colleagues, or members of the public. This includes proper installation, testing, and certification."
  },
  {
    id: "check-2",
    question: "Under the Health and Safety at Work Act 1974, who has responsibilities for workplace safety?",
    options: [
      "Only employers",
      "Only employees",
      "Both employers and employees",
      "Only health and safety inspectors"
    ],
    correctIndex: 2,
    explanation: "The HASAWA 1974 places duties on both employers (to provide safe working conditions) and employees (to take reasonable care of themselves and others, and cooperate with safety measures). Everyone in the workplace shares responsibility."
  },
  {
    id: "check-3",
    question: "What is the primary purpose of the ECS (Electrotechnical Certification Scheme) card?",
    options: [
      "To provide discounts at electrical wholesalers",
      "To verify competence and qualifications in the electrical industry",
      "To allow access to any construction site without question",
      "To replace the need for continuous training"
    ],
    correctIndex: 1,
    explanation: "The ECS card system verifies that cardholders have the appropriate qualifications, training, and competence for their role in the electrical industry. It demonstrates professional standing and is increasingly required for site access."
  },
  {
    id: "check-4",
    question: "Professional ethics in electrical work includes which of the following?",
    options: [
      "Cutting corners to save money for clients",
      "Honesty, integrity, and maintaining competence",
      "Only doing work that pays the most",
      "Avoiding difficult jobs to prevent mistakes"
    ],
    correctIndex: 1,
    explanation: "Professional ethics encompasses honesty in dealings with clients and employers, integrity in following regulations even when not observed, and maintaining competence through ongoing training and development."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A customer asks you to install a socket outlet without an RCD because 'it keeps tripping'. What is the ethical response?",
    options: [
      "Install as requested - the customer is always right",
      "Explain why RCD protection is required and investigate the cause of tripping",
      "Install it and say nothing about the regulations",
      "Refuse the work without explanation and leave"
    ],
    correctAnswer: 1,
    explanation: "Professional ethics require you to explain the importance of RCD protection for safety, investigate why it's tripping (there may be a fault), and ensure any work complies with BS 7671. You should never compromise safety even at a customer's request."
  },
  {
    id: 2,
    question: "What does 'vicarious liability' mean for an employer?",
    options: [
      "The employer is never responsible for employee actions",
      "Employers are liable for negligent acts of employees performed during employment",
      "Employees are always personally liable for all their actions",
      "Liability only applies to self-employed workers"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability means employers can be held legally responsible for the negligent acts of their employees when those acts occur during the course of their employment. This is why proper training and supervision are essential."
  },
  {
    id: 3,
    question: "Under the Electricity at Work Regulations 1989, what is the duty regarding electrical systems?",
    options: [
      "Systems must be inspected annually only",
      "Systems must be constructed, maintained, and worked on to prevent danger",
      "Only new installations need to meet safety standards",
      "Maintenance is only required after an incident"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 of EWR 1989 requires that all electrical systems are constructed, maintained, and worked on in such a manner as to prevent danger. This is an ongoing duty, not just applicable to new work."
  },
  {
    id: 4,
    question: "Which body administers the ECS card scheme for electrical workers?",
    options: [
      "Health and Safety Executive (HSE)",
      "City & Guilds",
      "Joint Industry Board (JIB)",
      "Institute of Electrical Engineers (IEE)"
    ],
    correctAnswer: 2,
    explanation: "The JIB (Joint Industry Board for the Electrical Contracting Industry) administers the ECS card scheme. The JIB works with employers and unions to maintain standards in the electrical contracting industry."
  },
  {
    id: 5,
    question: "What is the consequence of knowingly issuing a false Electrical Installation Certificate?",
    options: [
      "A small fine from the local council",
      "Potential criminal prosecution and loss of professional standing",
      "A warning letter only",
      "No consequences if no one is harmed"
    ],
    correctAnswer: 1,
    explanation: "Issuing false certification is fraud and can result in criminal prosecution. Additionally, it can lead to loss of ECS card, removal from competent person schemes, and civil liability if someone is harmed by unsafe work."
  },
  {
    id: 6,
    question: "A colleague asks you to sign off their work without inspecting it because they're 'in a hurry'. You should:",
    options: [
      "Help them out as they're a trusted colleague",
      "Refuse and explain that you must personally verify any work you certify",
      "Sign it but make a note that you didn't check",
      "Ask them to pay you extra for the risk"
    ],
    correctAnswer: 1,
    explanation: "You should never certify work you haven't personally inspected and tested. Signing off unchecked work is a serious breach of professional ethics and potentially illegal. Each person must be accountable for their own certification."
  },
  {
    id: 7,
    question: "What is the 'reasonable man' test in determining negligence?",
    options: [
      "Whether the average person could do electrical work",
      "Whether a reasonable person in the same profession would have acted differently",
      "Whether the customer thinks the work is reasonable",
      "Whether the work was completed in a reasonable time"
    ],
    correctAnswer: 1,
    explanation: "The 'reasonable man' test asks whether a competent professional in the same field would have acted differently given the same circumstances. For electricians, this means comparing actions to what a competent qualified electrician would do."
  },
  {
    id: 8,
    question: "Professional indemnity insurance protects against:",
    options: [
      "Physical injury at work only",
      "Claims arising from professional negligence or errors",
      "Damage to your own tools",
      "Vehicle accidents during work hours"
    ],
    correctAnswer: 1,
    explanation: "Professional indemnity insurance covers claims made against you for financial losses caused by your professional negligence, errors, or omissions. This is different from public liability (injury/property damage) or employers' liability insurance."
  },
  {
    id: 9,
    question: "Under duty of care, you notice a serious safety defect during a routine service visit. What must you do?",
    options: [
      "Only report it if the customer asks about safety",
      "Ignore it as it wasn't part of the job you were called for",
      "Inform the customer/duty holder of the danger, preferably in writing",
      "Fix it and add it to the bill as a surprise"
    ],
    correctAnswer: 2,
    explanation: "Duty of care requires you to inform the responsible person of any danger you observe, even if unrelated to your original task. Document this in writing to protect yourself and ensure the danger is addressed."
  },
  {
    id: 10,
    question: "What does maintaining professional competence require?",
    options: [
      "Only renewing your ECS card when it expires",
      "Ongoing learning to keep up with regulation changes and new technologies",
      "Avoiding new types of work you haven't done before",
      "Relying on knowledge gained during initial training"
    ],
    correctAnswer: 1,
    explanation: "Professional competence requires continuous professional development (CPD) to stay current with BS 7671 updates, new technologies, and evolving best practices. The electrical industry changes constantly."
  },
  {
    id: 11,
    question: "The term 'competent person' in electrical work means someone who:",
    options: [
      "Has been working in the trade for at least 10 years",
      "Has the skills, knowledge, experience, and training for the work being undertaken",
      "Holds any electrical qualification regardless of age",
      "Is employed by a large company"
    ],
    correctAnswer: 1,
    explanation: "A competent person has the necessary skills, knowledge, experience, and training to carry out the specific work safely. This assessment is task-specific - competence for one type of work doesn't automatically mean competence for all electrical work."
  },
  {
    id: 12,
    question: "Ethical behaviour requires you to report which of the following?",
    options: [
      "Only faults that could cause immediate death",
      "Any unsafe conditions, near misses, and regulatory non-compliances",
      "Nothing unless you caused the problem yourself",
      "Only issues covered by your insurance"
    ],
    correctAnswer: 1,
    explanation: "Professional ethics require reporting all safety concerns including unsafe conditions, near-miss incidents, and non-compliant installations. A culture of transparency and honesty prevents accidents and maintains industry standards."
  }
];

const faqs = [
  {
    question: "What happens if I work on something beyond my competence level?",
    answer: "Working beyond your competence is a breach of professional ethics and potentially illegal under the Health and Safety at Work Act. If something goes wrong, you could face criminal prosecution, civil claims, and loss of your ECS card. Always be honest about your limitations and either decline work or seek supervision for unfamiliar tasks."
  },
  {
    question: "Can I be personally liable even if I'm employed by a company?",
    answer: "Yes. While employers have vicarious liability, individuals can also be prosecuted under health and safety law for their own negligent acts. The Electricity at Work Regulations specifically place duties on individuals. If you knowingly cut corners or act negligently, you can face personal prosecution alongside your employer."
  },
  {
    question: "How do I balance customer demands with safety requirements?",
    answer: "Safety requirements are non-negotiable. Explain the reasons behind regulations clearly, offer compliant alternatives where possible, and document any refusals in writing. Never compromise safety for customer satisfaction - an unhappy customer is better than a dead one. If they insist on unsafe work, walk away."
  },
  {
    question: "What's the difference between public liability and professional indemnity insurance?",
    answer: "Public liability covers claims for physical injury to people or damage to property caused by your work activities. Professional indemnity covers claims for financial losses caused by your professional advice or negligence - for example, if incorrect design causes a project to fail. Most electrical contractors need both types of cover."
  },
  {
    question: "Is there a 'statute of limitations' for claims against my work?",
    answer: "For personal injury claims, there's generally a 3-year limit from when the injury occurred or was discovered. For contract claims (poor workmanship), it's typically 6 years from completion of work, or 12 years if under deed. However, for building defects, claims can arise many years later if defects are latent. Keep records of your work for at least 6 years."
  },
  {
    question: "What should I do if I discover a colleague has done unsafe work?",
    answer: "You have an ethical and often legal duty to report unsafe work. First, if there's immediate danger, take steps to make it safe. Then report through appropriate channels - usually your supervisor or employer. If the employer doesn't act, you may need to contact the HSE or the competent person scheme the colleague is registered with. Document everything."
  }
];

const Level3Module7Section2_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section2">
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
            <span>Module 7.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Duty of Care and Professional Ethics
          </h1>
          <p className="text-white/80">
            Your legal and moral responsibilities as a professional electrician
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Duty of care:</strong> Legal obligation to prevent harm through your work</li>
              <li><strong>HASAWA 1974:</strong> Both employers and employees have safety duties</li>
              <li><strong>EWR 1989:</strong> Specific duties for electrical work safety</li>
              <li><strong>Ethics:</strong> Honesty, integrity, and maintaining competence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Career Impact</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Reputation:</strong> Ethics build long-term career success</li>
              <li><strong>Legal protection:</strong> Proper conduct reduces liability</li>
              <li><strong>ECS card:</strong> Demonstrates professional standing</li>
              <li><strong>Trust:</strong> Clients choose ethical professionals</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the concept of duty of care and its legal basis",
              "Know your responsibilities under HASAWA 1974 and EWR 1989",
              "Recognise ethical obligations in professional practice",
              "Understand vicarious liability and personal accountability",
              "Know the role and importance of the ECS card scheme",
              "Apply professional ethics in real-world scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Duty of Care */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Duty of Care
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Duty of care is a fundamental legal concept that applies to all professionals, including electricians. It means you have a legal obligation to take reasonable steps to ensure your actions or omissions do not cause foreseeable harm to others. In practical terms, every time you install, test, or maintain electrical equipment, you're accepting responsibility for the safety of anyone who might be affected.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Your duty of care extends to:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clients and building occupants who will use the installation</li>
                <li>Colleagues and other workers on site</li>
                <li>Members of the public who might be affected</li>
                <li>Future workers who will maintain or modify the installation</li>
                <li>Emergency services who might attend an incident</li>
              </ul>
            </div>

            <p>
              The standard you're held to is that of a 'reasonably competent' person in your profession. Courts will ask: "Would a competent qualified electrician have done this differently?" This is why following BS 7671, manufacturer's instructions, and industry best practice is so important - it demonstrates you met the expected standard.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Duty of care isn't just about avoiding mistakes - it's about actively taking steps to ensure safety. If you see a hazard, you have a duty to address it or report it, even if you didn't create it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Legal Framework */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Legal Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several pieces of legislation establish your legal duties as an electrician. Understanding these helps you recognise why certain practices are non-negotiable and protects you if your work is ever questioned.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Health and Safety at Work Act 1974</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Primary workplace safety legislation</li>
                  <li>Places duties on employers AND employees</li>
                  <li>Requires 'so far as reasonably practicable' safety</li>
                  <li>Criminal offences with imprisonment possible</li>
                  <li>Enforced by the Health and Safety Executive</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electricity at Work Regulations 1989</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Specific duties for electrical safety</li>
                  <li>Systems must prevent danger so far as reasonably practicable</li>
                  <li>Competence requirement for electrical work</li>
                  <li>Dead working where reasonably practicable</li>
                  <li>Personal duties on employees, not just employers</li>
                </ul>
              </div>
            </div>

            <p>
              Under Section 7 of HASAWA, employees must take reasonable care for the safety of themselves and others affected by their work, and cooperate with their employer on safety matters. You cannot simply blame your employer if you knowingly do unsafe work.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Your employer tells you to rush a job and skip testing. If an incident occurs, both you and your employer could be prosecuted - the employer for inadequate supervision and pressure, and you for failing to follow safe practices. "My boss told me to" is not a defence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Professional Ethics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Professional Ethics in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional ethics go beyond simply following the law. They encompass the values and behaviours expected of someone who takes pride in their trade and wants to maintain the reputation of the electrical industry. Ethics guide your decisions when no one is watching.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core ethical principles for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Honesty:</strong> Truthful with clients about costs, timescales, and your capabilities</li>
                <li><strong>Integrity:</strong> Following standards even when no one is checking your work</li>
                <li><strong>Competence:</strong> Only undertaking work you're qualified and experienced for</li>
                <li><strong>Transparency:</strong> Clear communication about what work involves</li>
                <li><strong>Accountability:</strong> Standing behind your work and rectifying mistakes</li>
                <li><strong>Fairness:</strong> Reasonable pricing and not exploiting customers' lack of knowledge</li>
              </ul>
            </div>

            <p>
              Ethical behaviour builds your reputation and career. Word of mouth is powerful in the electrical industry - customers talk to each other, and contractors remember who they can trust. Cutting corners might save time today but costs you business tomorrow.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you wouldn't be comfortable explaining your work to an HSE inspector, or having it appear on the front page of a newspaper, you probably shouldn't be doing it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: ECS Cards and Industry Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            ECS Cards and Industry Recognition
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrotechnical Certification Scheme (ECS) provides a framework for demonstrating competence and qualifications in the electrical industry. Administered by the JIB, ECS cards are increasingly required for site access and serve as proof of your professional standing.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">ECS Trainee</p>
                <p className="text-white/90 text-xs">Apprentices in training</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Provisional</p>
                <p className="text-white/90 text-xs">Newly qualified, gaining experience</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Installation Electrician</p>
                <p className="text-white/90 text-xs">Fully qualified Level 3</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Approved Electrician</p>
                <p className="text-white/90 text-xs">Additional experience and testing</p>
              </div>
            </div>

            <p>
              The card system helps maintain standards by requiring evidence of qualifications and ongoing professional development. Cards must be renewed periodically, and renewal requires evidence of continued competence. This ensures qualified electricians stay current with industry changes.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Career tip:</strong> Your ECS card grade affects your earning potential and job opportunities. Progressing from Installation Electrician to Approved Electrician demonstrates commitment to the profession and can open doors to supervisory roles.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Dealing with Ethical Dilemmas</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>When asked to do something questionable, ask for the instruction in writing</li>
                <li>Document any safety concerns you raise, and the response received</li>
                <li>If in doubt about competence, seek advice or refuse the work</li>
                <li>Remember that 'common practice' is not the same as 'good practice'</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Professional Reputation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always complete proper certification and documentation</li>
                <li>Return to fix genuine faults without argument, even if inconvenient</li>
                <li>Be honest about timescales and don't overcommit</li>
                <li>Explain work clearly to customers in terms they understand</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Ethical Pitfalls to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signing off unchecked work:</strong> Never certify work you haven't personally verified</li>
                <li><strong>Accepting backhanders:</strong> Kickbacks from suppliers compromise your advice to clients</li>
                <li><strong>Hiding mistakes:</strong> Cover-ups always come out eventually - own your errors</li>
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
                  <li>Management of H&S at Work Regulations 1999</li>
                  <li>Building Regulations Part P (England)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ECS Card Progression</p>
                <ul className="space-y-0.5">
                  <li>ECS Trainee - During apprenticeship</li>
                  <li>Provisional - Newly qualified</li>
                  <li>Installation Electrician - Full qualification</li>
                  <li>Approved Electrician - Enhanced experience</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2-2">
              Next: Codes of Practice
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section2_1;
