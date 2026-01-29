import { ArrowLeft, Scale, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ethical Responsibilities - HNC Module 1 Section 4.4";
const DESCRIPTION = "Understand professional ethics in building services engineering: whistleblowing protections, conflicts of interest, professional codes of conduct from IET and ECA, and maintaining integrity.";

const quickCheckQuestions = [
  {
    id: "whistleblowing-law",
    question: "What is the primary legislation protecting whistleblowers in the UK?",
    options: [
      "Health and Safety at Work Act 1974",
      "Public Interest Disclosure Act 1998",
      "Employment Rights Act 1996 only",
      "Bribery Act 2010"
    ],
    correctIndex: 1,
    explanation: "The Public Interest Disclosure Act 1998 (PIDA) is the primary legislation protecting whistleblowers. It amends the Employment Rights Act 1996 to protect workers who make 'qualifying disclosures' about wrongdoing from detriment or dismissal."
  },
  {
    id: "qualifying-disclosure",
    question: "Which of the following would qualify as a protected disclosure under PIDA?",
    options: [
      "Reporting that a colleague was late to work",
      "Disclosing that safety equipment is being removed to save costs",
      "Complaining about office temperature preferences",
      "Reporting that canteen food is too expensive"
    ],
    correctIndex: 1,
    explanation: "A qualifying disclosure must relate to one of six categories including criminal offences, breach of legal obligations, danger to health and safety, environmental damage, miscarriage of justice, or concealment of any of these. Removing safety equipment would create danger to health and safety."
  },
  {
    id: "conflict-of-interest",
    question: "What should a building services engineer do if they have a conflict of interest?",
    options: [
      "Keep it secret to avoid complications",
      "Ignore it if it doesn't affect the project",
      "Declare it and, if necessary, withdraw from the decision or project",
      "Only declare it if someone asks"
    ],
    correctIndex: 2,
    explanation: "Professional codes of conduct require declaration of conflicts of interest. If the conflict is significant, the professional should withdraw from the decision or project. Transparency and acting in the client's/employer's best interest are fundamental ethical obligations."
  },
  {
    id: "iet-membership",
    question: "What is a key obligation of IET membership regarding competence?",
    options: [
      "To never admit to not knowing something",
      "To only undertake work within your competence and decline work outside it",
      "To accept all work offered regardless of competence",
      "Competence obligations only apply to Chartered Engineers"
    ],
    correctIndex: 1,
    explanation: "The IET Code of Conduct requires members to only undertake work or take on responsibilities that they are competent to perform. This applies to all membership grades and requires members to decline or refer work beyond their competence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT one of the six categories for a qualifying disclosure under PIDA?",
    options: [
      "A criminal offence has been, is being, or is likely to be committed",
      "The health and safety of any individual is endangered",
      "A personal grievance about pay or conditions",
      "Information tending to show any of the above is being or is likely to be concealed"
    ],
    correctAnswer: 2,
    explanation: "PIDA protects disclosures about: criminal offences, breach of legal obligations, miscarriage of justice, health and safety dangers, environmental damage, and concealment of any of these. Personal grievances about employment terms are not protected as whistleblowing."
  },
  {
    id: 2,
    question: "To whom should a worker first make a protected disclosure?",
    options: [
      "Directly to the media",
      "Their employer or, for health and safety matters, the HSE",
      "Their local MP",
      "Social media platforms"
    ],
    correctAnswer: 1,
    explanation: "The legislation encourages internal disclosure first - to the employer or, for relevant matters, to prescribed persons like the HSE. External disclosure (media, MPs) is protected in more limited circumstances, typically when internal disclosure would be futile or dangerous."
  },
  {
    id: 3,
    question: "What does professional 'integrity' require in building services engineering?",
    options: [
      "Always agreeing with the client's demands",
      "Acting honestly, fairly, and transparently in professional relationships",
      "Keeping all professional matters confidential under all circumstances",
      "Maximising profit on every project"
    ],
    correctAnswer: 1,
    explanation: "Integrity means acting honestly, fairly, and transparently. It includes not misleading clients or the public, not taking bribes or inducements, declaring conflicts of interest, and being truthful in professional representations."
  },
  {
    id: 4,
    question: "An electrician discovers their company is routinely bypassing safety interlocks to speed up commissioning. What is the ethical course of action?",
    options: [
      "Ignore it as it's not their responsibility",
      "Continue the practice since everyone else does",
      "Raise the concern through appropriate channels, internally first",
      "Immediately call the police"
    ],
    correctAnswer: 2,
    explanation: "The ethical response is to raise the concern. PIDA encourages internal disclosure first - to supervisors, safety representatives, or through internal whistleblowing procedures. If internal routes fail or are inappropriate, external disclosure to the HSE may be warranted."
  },
  {
    id: 5,
    question: "Which professional body's code of conduct specifically applies to electrical engineers in the UK?",
    options: [
      "RICS",
      "RIBA",
      "IET",
      "CIOB"
    ],
    correctAnswer: 2,
    explanation: "The Institution of Engineering and Technology (IET) is the professional body for electrical, electronic, manufacturing, and IT engineers. Its Code of Conduct sets ethical standards for members working in the electrotechnical sector."
  },
  {
    id: 6,
    question: "Under the IET Code of Conduct, members must exercise professional skill and judgement to:",
    options: [
      "Maximise their own financial benefit",
      "Protect the health, safety and welfare of all",
      "Support their employer regardless of ethical concerns",
      "Maintain confidentiality above all other considerations"
    ],
    correctAnswer: 1,
    explanation: "The IET Code requires members to 'exercise professional skill and judgment to the best of their ability and discharge their professional responsibilities with integrity' with particular emphasis on 'protecting health, safety and welfare'."
  },
  {
    id: 7,
    question: "A consultant engineer is offered a commission by a supplier if they specify their products. What should they do?",
    options: [
      "Accept it as normal business practice",
      "Accept but don't tell the client",
      "Decline, as it creates a conflict of interest that could compromise professional judgement",
      "Accept only if the products are genuinely best value"
    ],
    correctAnswer: 2,
    explanation: "Accepting commissions or inducements from suppliers creates a conflict of interest. Professional codes prohibit this as it compromises independent professional judgement. The engineer must specify products based on technical merit and client interest, not personal gain."
  },
  {
    id: 8,
    question: "What protection does PIDA provide to workers who make qualifying disclosures?",
    options: [
      "Immunity from all legal proceedings",
      "Protection from dismissal and detriment by their employer",
      "Guaranteed promotion",
      "Protection only if they are union members"
    ],
    correctAnswer: 1,
    explanation: "PIDA protects workers from unfair dismissal and from being subjected to any detriment by their employer because of making a protected disclosure. Dismissal for making a protected disclosure is automatically unfair."
  },
  {
    id: 9,
    question: "The ECA (Electrical Contractors' Association) requires member companies to:",
    options: [
      "Use only the cheapest labour available",
      "Maintain high standards of workmanship and business ethics",
      "Subcontract all work to non-members",
      "Avoid all union engagement"
    ],
    correctAnswer: 1,
    explanation: "ECA membership requires commitment to high standards of workmanship, business ethics, and compliance with relevant legislation. Member companies must maintain technical competence, proper training, and ethical business practices."
  },
  {
    id: 10,
    question: "What is the relationship between professional ethics and legal requirements?",
    options: [
      "They are identical - ethics means following the law",
      "Professional ethics often exceed minimum legal requirements",
      "Legal requirements are always more demanding than ethics",
      "There is no relationship between them"
    ],
    correctAnswer: 1,
    explanation: "Professional ethics typically go beyond minimum legal compliance. While the law sets minimum standards, professional codes often require higher standards of conduct, transparency, and responsibility. A practice might be legal but still unethical."
  }
];

const faqs = [
  {
    question: "What if my employer retaliates against me for whistleblowing?",
    answer: "If you suffer detriment or dismissal for making a protected disclosure, you can bring a claim to an employment tribunal. Compensation for unfair dismissal as a result of whistleblowing is uncapped (unlike ordinary unfair dismissal). You may also be able to seek an interim injunction to prevent dismissal. Document everything and seek advice from ACAS, a trade union, or specialist solicitor."
  },
  {
    question: "Can I make an anonymous disclosure?",
    answer: "Yes, you can make anonymous disclosures to your employer or the HSE. However, anonymous disclosures may be harder to investigate and you may not receive legal protection if you cannot prove you made the disclosure. Consider confidential (not anonymous) disclosure where your identity is protected but known to the recipient."
  },
  {
    question: "What counts as a 'conflict of interest'?",
    answer: "A conflict of interest exists when your personal interests, or those of someone close to you, could influence or appear to influence your professional judgement. Examples include: financial interests in suppliers, family relationships with contractors, outside business interests competing with your employer, or being offered gifts/hospitality that might affect decisions."
  },
  {
    question: "Is there a difference between ethics and compliance?",
    answer: "Yes. Compliance means following rules, regulations, and laws - it's about meeting minimum required standards. Ethics goes further - it's about doing what's right even when no rule requires it. A compliant professional follows procedures; an ethical professional considers whether those procedures are adequate and raises concerns if not."
  },
  {
    question: "What ethical obligations do I have to report unsafe work by others?",
    answer: "Professional codes require you to take action if you become aware of dangerous practices, whether by colleagues, subcontractors, or clients. This typically means raising concerns through appropriate channels - internally first, then externally if necessary. Staying silent when you know of dangers could make you complicit and may breach professional obligations."
  },
  {
    question: "How do professional body disciplinary procedures work?",
    answer: "If a member of a professional body (IET, etc.) breaches their code of conduct, complaints can be made to the body. Investigations follow, potentially leading to disciplinary panels. Sanctions range from advice and reprimands to suspension or expulsion from membership. Serious matters may also be referred to statutory regulators or police."
  }
];

const HNCModule1Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Scale className="h-4 w-4" />
            <span>Module 1.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ethical Responsibilities
          </h1>
          <p className="text-white/80">
            Professional ethics, whistleblowing, conflicts of interest and codes of conduct in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Ethics:</strong> Doing what's right, beyond legal minimum</li>
              <li className="pl-1"><strong>Whistleblowing:</strong> Protected disclosure of wrongdoing</li>
              <li className="pl-1"><strong>Conflicts:</strong> Must be declared and managed</li>
              <li className="pl-1"><strong>Professional codes:</strong> IET, ECA set conduct standards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Safety duties:</strong> Ethical obligation to report unsafe practices</li>
              <li className="pl-1"><strong>Specification:</strong> Must be impartial, not influenced by suppliers</li>
              <li className="pl-1"><strong>Quality:</strong> Maintain standards even under commercial pressure</li>
              <li className="pl-1"><strong>Competence:</strong> Decline work beyond capability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the role of professional ethics in building services engineering",
              "Explain whistleblowing protections under the Public Interest Disclosure Act",
              "Identify and manage conflicts of interest in professional practice",
              "Apply the IET and ECA codes of conduct to workplace situations",
              "Distinguish between legal compliance and ethical behaviour",
              "Understand consequences of breaching professional codes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Professional Ethics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Professional Ethics in Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional ethics provides a framework for making decisions that go beyond mere legal compliance.
              While law sets minimum standards, ethics guides professionals to act with integrity, protect the
              public interest, and maintain the reputation of their profession.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ethics vs Law vs Morality</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-blue-400 mb-1">Law</p>
                  <p className="text-xs text-white/70">Mandatory rules enforced by the state. Minimum standards.</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-elec-yellow mb-1">Ethics</p>
                  <p className="text-xs text-white/70">Professional standards of conduct. Often exceed law.</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-purple-400 mb-1">Morality</p>
                  <p className="text-xs text-white/70">Personal beliefs about right and wrong.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Ethical Principles</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-elec-yellow">Integrity</td>
                      <td className="border border-white/10 px-3 py-2">Honesty, fairness, transparency</td>
                      <td className="border border-white/10 px-3 py-2">Accurate reporting of test results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-elec-yellow">Competence</td>
                      <td className="border border-white/10 px-3 py-2">Only doing work within capability</td>
                      <td className="border border-white/10 px-3 py-2">Declining work beyond qualifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-elec-yellow">Responsibility</td>
                      <td className="border border-white/10 px-3 py-2">Accountability for professional actions</td>
                      <td className="border border-white/10 px-3 py-2">Taking responsibility for design decisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-elec-yellow">Public interest</td>
                      <td className="border border-white/10 px-3 py-2">Prioritising safety and welfare</td>
                      <td className="border border-white/10 px-3 py-2">Refusing to certify unsafe installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-elec-yellow">Objectivity</td>
                      <td className="border border-white/10 px-3 py-2">Impartial professional judgement</td>
                      <td className="border border-white/10 px-3 py-2">Specification based on merit, not inducements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">The Ethics of Safety</p>
              <p className="text-sm text-white/90">
                In building services, ethical considerations frequently involve safety. When commercial pressures
                conflict with safety standards, professionals have an ethical duty to prioritise safety. This may
                mean refusing to sign off work, raising concerns with management, or - as a last resort -
                reporting to enforcement authorities.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> "Is it legal?" is not the same as "Is it right?" Professional ethics demands the latter question.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 2: Whistleblowing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Whistleblowing and Protected Disclosures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Whistleblowing is the disclosure of information about wrongdoing in an organisation. The
              Public Interest Disclosure Act 1998 (PIDA) protects workers who raise legitimate concerns
              about malpractice, including health and safety dangers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Six Categories of Qualifying Disclosure</p>
              <p className="text-sm text-white/90 mb-3">
                To be protected, a disclosure must relate to one of these categories:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-2 rounded bg-white/5">
                  <p className="text-sm text-white"><span className="text-elec-yellow">1.</span> A criminal offence</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-sm text-white"><span className="text-elec-yellow">2.</span> Breach of legal obligation</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-sm text-white"><span className="text-elec-yellow">3.</span> Miscarriage of justice</p>
                </div>
                <div className="p-2 rounded bg-red-500/10">
                  <p className="text-sm text-white"><span className="text-red-400">4.</span> Health and safety danger</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-sm text-white"><span className="text-elec-yellow">5.</span> Environmental damage</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-sm text-white"><span className="text-elec-yellow">6.</span> Concealment of any above</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Disclosure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disclosure To</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Protection Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1. Internal</td>
                      <td className="border border-white/10 px-3 py-2">Employer</td>
                      <td className="border border-white/10 px-3 py-2">Good faith, reasonable belief</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">2. Prescribed person</td>
                      <td className="border border-white/10 px-3 py-2">HSE, regulator</td>
                      <td className="border border-white/10 px-3 py-2">Reasonable belief, relevant body</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">3. External</td>
                      <td className="border border-white/10 px-3 py-2">Media, MPs, others</td>
                      <td className="border border-white/10 px-3 py-2">Additional conditions apply*</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">*External disclosure is protected if internal/prescribed disclosure would be futile, risk victimisation, or evidence would be concealed.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">PIDA Protections</p>
              <p className="text-sm text-white/90 mb-3">
                Workers who make qualifying disclosures are protected from:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dismissal:</strong> Automatically unfair if for making a protected disclosure</li>
                <li className="pl-1"><strong>Detriment:</strong> Any detrimental treatment by the employer</li>
                <li className="pl-1"><strong>Selection for redundancy:</strong> If based on protected disclosure</li>
              </ul>
              <p className="text-xs text-white/70 mt-2">Compensation for whistleblowing dismissal is uncapped.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Making an Effective Disclosure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Document the concern with dates, facts, and evidence</li>
                <li className="pl-1">Use internal procedures first where they exist</li>
                <li className="pl-1">Put concerns in writing and keep copies</li>
                <li className="pl-1">Be factual, not emotional or accusatory</li>
                <li className="pl-1">Seek advice from union, ACAS, or Protect (charity)</li>
                <li className="pl-1">Be clear you are making a formal disclosure</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>For H&S matters:</strong> The HSE is a prescribed person - disclosures about health and safety dangers can be made directly to them with protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Conflicts of Interest */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Conflicts of Interest
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A conflict of interest occurs when personal interests, or the interests of those close to you,
              could influence - or could appear to influence - your professional judgement. Managing conflicts
              is essential for maintaining professional integrity and client trust.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Conflicts in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Why It's a Problem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Financial interest</td>
                      <td className="border border-white/10 px-3 py-2">Shares in a supplier company</td>
                      <td className="border border-white/10 px-3 py-2">May favour that supplier's products</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Personal relationships</td>
                      <td className="border border-white/10 px-3 py-2">Family member owns contracting firm</td>
                      <td className="border border-white/10 px-3 py-2">May award contracts without fair competition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outside employment</td>
                      <td className="border border-white/10 px-3 py-2">Consultancy competing with employer</td>
                      <td className="border border-white/10 px-3 py-2">Divided loyalty, potential for misuse of info</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gifts and hospitality</td>
                      <td className="border border-white/10 px-3 py-2">Supplier offers expensive gifts</td>
                      <td className="border border-white/10 px-3 py-2">Creates sense of obligation, may influence decisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Self-review</td>
                      <td className="border border-white/10 px-3 py-2">Inspecting your own design work</td>
                      <td className="border border-white/10 px-3 py-2">Unlikely to identify own errors objectively</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Managing Conflicts of Interest</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Steps to Take</p>
                  <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                    <li className="pl-1"><strong>Identify:</strong> Recognise potential conflicts</li>
                    <li className="pl-1"><strong>Declare:</strong> Disclose to employer/client</li>
                    <li className="pl-1"><strong>Assess:</strong> Evaluate significance</li>
                    <li className="pl-1"><strong>Manage:</strong> Put safeguards in place</li>
                    <li className="pl-1"><strong>Withdraw:</strong> If conflict cannot be managed</li>
                  </ol>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Safeguards</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Transparent decision-making processes</li>
                    <li className="pl-1">Independent review/second opinion</li>
                    <li className="pl-1">Removing yourself from decisions</li>
                    <li className="pl-1">Clear policies on gifts/hospitality</li>
                    <li className="pl-1">Register of interests</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">The 'Perception' Test</p>
              <p className="text-sm text-white/90">
                Even if you believe you can be objective, consider: "Would a reasonable observer think
                there is a conflict?" If a third party could reasonably perceive a conflict exists,
                you should treat it as a conflict and manage it appropriately. Perception matters
                because it affects trust in professional judgement.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> It's not enough to act without bias - you must be seen to act without bias.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Professional Codes of Conduct */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Professional Codes of Conduct
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional bodies set codes of conduct that define the ethical standards expected of their
              members. In building services, the key bodies are the Institution of Engineering and Technology
              (IET) and trade associations like the Electrical Contractors' Association (ECA).
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">IET Code of Conduct - Key Principles</p>
              <p className="text-sm text-white/90 mb-3">
                IET members shall at all times:
              </p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Act with integrity</strong> - be honest and trustworthy, declare conflicts, reject bribery and corruption</li>
                <li className="pl-1"><strong>Exercise professional skill and judgement</strong> - to protect health, safety and welfare of all</li>
                <li className="pl-1"><strong>Undertake only work within competence</strong> - not misrepresent capabilities</li>
                <li className="pl-1"><strong>Show commitment to continuing professional development</strong> - maintain and develop competence</li>
                <li className="pl-1"><strong>Support and promote diversity</strong> - treat others fairly without discrimination</li>
                <li className="pl-1"><strong>Uphold the reputation of the profession</strong> - not bring it into disrepute</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-sm font-medium text-purple-400 mb-2">ECA Membership Obligations</p>
              <p className="text-sm text-white/90 mb-3">
                ECA member companies commit to:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Maintaining high standards of workmanship and business ethics</li>
                <li className="pl-1">Employing competent, properly trained staff</li>
                <li className="pl-1">Operating comprehensive health and safety systems</li>
                <li className="pl-1">Complying with all relevant legislation and regulations</li>
                <li className="pl-1">Dealing fairly with customers, suppliers, and employees</li>
                <li className="pl-1">Providing warranties and addressing customer complaints</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consequences of Breaching Professional Codes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Sanction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Advice</td>
                      <td className="border border-white/10 px-3 py-2">Guidance on future conduct</td>
                      <td className="border border-white/10 px-3 py-2">No formal record, minor matters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reprimand</td>
                      <td className="border border-white/10 px-3 py-2">Formal warning recorded</td>
                      <td className="border border-white/10 px-3 py-2">On file, considered if repeat issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conditions</td>
                      <td className="border border-white/10 px-3 py-2">Continued membership with conditions</td>
                      <td className="border border-white/10 px-3 py-2">May require training, supervision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Suspension</td>
                      <td className="border border-white/10 px-3 py-2">Temporary removal from membership</td>
                      <td className="border border-white/10 px-3 py-2">Cannot use membership title</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Expulsion</td>
                      <td className="border border-white/10 px-3 py-2">Permanent removal from membership</td>
                      <td className="border border-white/10 px-3 py-2">Loss of professional status, reputation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Professional Codes Matter</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Public protection:</strong> Ensures minimum standards of competence and conduct</li>
                <li className="pl-1"><strong>Client confidence:</strong> Clients can trust members will act professionally</li>
                <li className="pl-1"><strong>Professional reputation:</strong> Maintains the standing of the profession</li>
                <li className="pl-1"><strong>Self-regulation:</strong> Demonstrates profession can govern itself responsibly</li>
                <li className="pl-1"><strong>Career protection:</strong> Framework for handling disputes and misconduct</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Chartered status:</strong> Chartered Engineers (CEng) have additional obligations including maintaining CPD records and may face registration review.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ethical Decision-Making Framework</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Is it legal?</strong> Does it comply with all relevant laws and regulations?</li>
                <li className="pl-1"><strong>Is it ethical?</strong> Does it comply with professional codes and principles?</li>
                <li className="pl-1"><strong>Is it fair?</strong> Would all affected parties consider it reasonable?</li>
                <li className="pl-1"><strong>Would it pass scrutiny?</strong> How would it look reported in the news?</li>
                <li className="pl-1"><strong>Can you justify it?</strong> Could you explain your decision to a disciplinary panel?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Seek Advice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">When you're uncertain whether something is ethical</li>
                <li className="pl-1">When asked to do something that feels wrong</li>
                <li className="pl-1">When you identify a potential conflict of interest</li>
                <li className="pl-1">When you observe others acting unethically</li>
                <li className="pl-1">Before making significant disclosures about wrongdoing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Ethical Pitfalls</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>"Everyone does it":</strong> Widespread practice does not make it ethical</li>
                <li className="pl-1"><strong>"No one will know":</strong> Integrity means doing right even when unobserved</li>
                <li className="pl-1"><strong>"It's not illegal":</strong> Legal does not equal ethical</li>
                <li className="pl-1"><strong>"I was just following orders":</strong> You remain personally accountable</li>
                <li className="pl-1"><strong>"The client wanted it":</strong> Your professional duty may override client wishes</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">PIDA Qualifying Disclosures</p>
                <ul className="space-y-0.5">
                  <li>Criminal offence</li>
                  <li>Breach of legal obligation</li>
                  <li>Miscarriage of justice</li>
                  <li>Health and safety danger</li>
                  <li>Environmental damage</li>
                  <li>Concealment of the above</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">IET Core Principles</p>
                <ul className="space-y-0.5">
                  <li>Act with integrity</li>
                  <li>Exercise professional skill and judgement</li>
                  <li>Undertake only work within competence</li>
                  <li>Commit to CPD</li>
                  <li>Support diversity</li>
                  <li>Uphold profession's reputation</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Representatives
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4-5">
              Next: Continuous Professional Development
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section4_4;
