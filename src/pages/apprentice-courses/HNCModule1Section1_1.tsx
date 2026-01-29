import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Health and Safety at Work Act 1974 - HNC Module 1 Section 1.1";
const DESCRIPTION = "Comprehensive guide to the Health and Safety at Work Act 1974 for building services engineers: employer duties, employee responsibilities, HSE enforcement and practical applications.";

const quickCheckQuestions = [
  {
    id: "section2-duty",
    question: "Under Section 2 of HSWA 1974, who has the primary duty to ensure health, safety and welfare at work?",
    options: ["Employees", "Employers", "The HSE", "Local authorities"],
    correctIndex: 1,
    explanation: "Section 2 places the primary duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees."
  },
  {
    id: "section7-employee",
    question: "Under Section 7, what must employees do regarding health and safety?",
    options: ["Only follow written instructions", "Take reasonable care for themselves and others", "Report to the HSE directly", "Provide their own PPE"],
    correctIndex: 1,
    explanation: "Section 7 requires employees to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions at work."
  },
  {
    id: "improvement-notice",
    question: "What is the maximum timeframe typically given to comply with an HSE Improvement Notice?",
    options: ["24 hours", "7 days", "21 days minimum", "6 months"],
    correctIndex: 2,
    explanation: "An Improvement Notice must allow at least 21 days for compliance, giving the duty holder time to rectify the contravention. Appeals must also be lodged within 21 days."
  },
  {
    id: "sfarp-meaning",
    question: "What does 'SFARP' mean in health and safety law?",
    options: ["Safety First And Risk Prevention", "So Far As Reasonably Practicable", "Standard For Acceptable Risk Practice", "Safe Framework And Regulatory Procedure"],
    correctIndex: 1,
    explanation: "'So Far As Reasonably Practicable' (SFARP) means balancing the risk against the cost, time and effort needed to control it. If grossly disproportionate, the measure may not be required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Health and Safety at Work Act 1974 is primarily which type of legislation?",
    options: [
      "Absolute - no exceptions allowed",
      "Enabling - provides framework for regulations",
      "Advisory - guidance only",
      "Voluntary - self-regulation"
    ],
    correctAnswer: 1,
    explanation: "HSWA 1974 is enabling legislation that provides the broad framework under which more specific regulations (like the Electricity at Work Regulations 1989) are made."
  },
  {
    id: 2,
    question: "Under Section 2, what must employers provide to employees regarding health and safety?",
    options: [
      "Only verbal instructions",
      "Information, instruction, training and supervision",
      "Insurance certificates only",
      "Annual safety reviews"
    ],
    correctAnswer: 1,
    explanation: "Section 2(2)(c) requires employers to provide such information, instruction, training and supervision as is necessary to ensure, so far as is reasonably practicable, the health and safety at work of employees."
  },
  {
    id: 3,
    question: "Section 3 of HSWA 1974 places duties on employers regarding which group?",
    options: [
      "Employees only",
      "Directors and managers only",
      "Non-employees who may be affected by the work",
      "HSE inspectors"
    ],
    correctAnswer: 2,
    explanation: "Section 3 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment (visitors, contractors, public) are not exposed to risks."
  },
  {
    id: 4,
    question: "What is the employee's duty under Section 7(a) of HSWA 1974?",
    options: [
      "To provide their own safety equipment",
      "To take reasonable care for their own health and safety and that of others",
      "To write risk assessments",
      "To report directly to the HSE"
    ],
    correctAnswer: 1,
    explanation: "Section 7(a) requires every employee to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work."
  },
  {
    id: 5,
    question: "What power does an HSE inspector have under an Improvement Notice?",
    options: [
      "Immediate site closure",
      "Criminal prosecution only",
      "Require contraventions to be remedied within a specified time",
      "Impose unlimited fines on the spot"
    ],
    correctAnswer: 2,
    explanation: "An Improvement Notice requires the duty holder to remedy a contravention within a specified period (minimum 21 days). It does not require immediate cessation of work unless the risk is imminent."
  },
  {
    id: 6,
    question: "When can an HSE inspector issue a Prohibition Notice?",
    options: [
      "For any minor breach",
      "When there is risk of serious personal injury",
      "Only after a formal investigation",
      "Only with court approval"
    ],
    correctAnswer: 1,
    explanation: "A Prohibition Notice can be issued when the inspector believes activities involve, or will involve, a risk of serious personal injury. It can take immediate effect and stop the dangerous activity."
  },
  {
    id: 7,
    question: "What is the maximum prison sentence for certain offences under HSWA 1974 in the Crown Court?",
    options: [
      "6 months",
      "1 year",
      "2 years",
      "Unlimited"
    ],
    correctAnswer: 2,
    explanation: "Certain offences under HSWA 1974, when tried in the Crown Court, can result in up to 2 years imprisonment. This applies to breaches where there is a failure to comply with improvement or prohibition notices."
  },
  {
    id: 8,
    question: "For building services work, which Section 2 duty is most relevant to electrical installation safety?",
    options: [
      "Section 2(2)(a) - safe plant and systems of work",
      "Section 2(2)(b) - safe handling of substances",
      "Section 2(2)(d) - safe working environment",
      "Section 2(2)(e) - welfare facilities"
    ],
    correctAnswer: 0,
    explanation: "Section 2(2)(a) requires provision and maintenance of safe plant and systems of work. This directly applies to electrical installations, testing equipment, and safe isolation procedures."
  },
  {
    id: 9,
    question: "Under Section 8, what must employees NOT do?",
    options: [
      "Report safety concerns",
      "Intentionally or recklessly interfere with safety provisions",
      "Refuse to work in unsafe conditions",
      "Request safety equipment"
    ],
    correctAnswer: 1,
    explanation: "Section 8 prohibits any person from intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare. This includes tampering with guards, safety interlocks, or PPE."
  },
  {
    id: 10,
    question: "How does 'reasonably practicable' apply to building services contractors?",
    options: [
      "They must eliminate all risks regardless of cost",
      "They only need to meet minimum legal requirements",
      "They must balance risk reduction against cost, time and effort",
      "They can ignore risks if the client doesn't require controls"
    ],
    correctAnswer: 2,
    explanation: "'Reasonably practicable' requires duty holders to weigh the risk against the sacrifice (cost, time, effort) needed to avert it. The greater the risk, the more you must do to control it."
  },
  {
    id: 11,
    question: "Which body is primarily responsible for enforcing HSWA 1974 on construction sites?",
    options: [
      "Local authority environmental health",
      "Health and Safety Executive (HSE)",
      "Building control",
      "Police"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is the primary enforcing authority for construction sites and most workplaces. Local authorities enforce in retail, offices, hotels and catering premises."
  },
  {
    id: 12,
    question: "A building services firm employs 6 people. Are they required to have a written health and safety policy?",
    options: [
      "Yes - all employers must have one",
      "No - only employers with 5 or more employees",
      "Only if they work on construction sites",
      "Only if requested by a client"
    ],
    correctAnswer: 1,
    explanation: "Section 2(3) requires employers with 5 or more employees to prepare a written statement of their health and safety policy and bring it to the attention of employees."
  }
];

const faqs = [
  {
    question: "What is the difference between HSWA 1974 and the Electricity at Work Regulations 1989?",
    answer: "HSWA 1974 is the primary enabling Act that sets out broad duties for all workplaces. The Electricity at Work Regulations 1989 are specific regulations made under HSWA, providing detailed requirements for electrical safety. EAWR contains absolute duties (no 'reasonably practicable' qualifier) for preventing danger from electricity."
  },
  {
    question: "Can employees be prosecuted under HSWA 1974?",
    answer: "Yes. Section 7 places duties on employees, and Section 36 allows prosecution of individuals whose acts or defaults led to an offence by their employer. Employees can face personal fines and, in serious cases, imprisonment for breaches."
  },
  {
    question: "What happens if I receive an Improvement Notice?",
    answer: "You must remedy the contravention within the specified time (minimum 21 days). You can appeal to an Employment Tribunal within 21 days, which suspends the notice until the appeal is heard. Failing to comply without a successful appeal is a criminal offence."
  },
  {
    question: "How does HSWA 1974 apply to self-employed building services engineers?",
    answer: "Section 3(2) requires self-employed persons to conduct their undertaking so that they and others are not exposed to risks. Self-employed electricians must still follow safe working practices and not endanger clients, other contractors, or the public."
  },
  {
    question: "What is the role of safety representatives under HSWA 1974?",
    answer: "Section 2(4) allows recognised trade unions to appoint safety representatives. These representatives can investigate hazards, inspect the workplace, represent employees in discussions with the employer, and attend safety committee meetings."
  }
];

const HNCModule1Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health and Safety at Work Act 1974
          </h1>
          <p className="text-white/80">
            The foundation of UK workplace health and safety law and its application to building services engineering
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Section 2:</strong> Employers must ensure employee health, safety and welfare</li>
              <li className="pl-1"><strong>Section 3:</strong> Duty to protect non-employees (public, visitors, contractors)</li>
              <li className="pl-1"><strong>Section 7:</strong> Employees must take reasonable care and cooperate</li>
              <li className="pl-1"><strong>SFARP:</strong> Duties qualified by 'so far as reasonably practicable'</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Safe systems:</strong> Isolation procedures, permits to work</li>
              <li className="pl-1"><strong>Training:</strong> Competence for electrical work</li>
              <li className="pl-1"><strong>Equipment:</strong> Maintained test instruments, PPE</li>
              <li className="pl-1"><strong>Third parties:</strong> Client staff, other trades, building occupants</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and purpose of HSWA 1974",
              "Describe employer duties under Section 2",
              "Understand duties to non-employees under Section 3",
              "Explain employee responsibilities under Sections 7 and 8",
              "Describe HSE enforcement powers and penalties",
              "Apply HSWA requirements to building services work"
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

        {/* Section 1: Introduction and Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction and Structure of HSWA 1974
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety at Work etc. Act 1974 (HSWA) is the primary piece of legislation covering
              occupational health and safety in Great Britain. It established the Health and Safety Commission
              (now merged into HSE) and created a framework for all subsequent health and safety regulations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics of HSWA 1974</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Enabling Act:</strong> Provides framework for detailed regulations (e.g., EAWR, PUWER, CDM)</li>
                <li className="pl-1"><strong>Goal-setting:</strong> States what must be achieved, not precisely how to achieve it</li>
                <li className="pl-1"><strong>Risk-based:</strong> Duties qualified by 'so far as reasonably practicable' (SFARP)</li>
                <li className="pl-1"><strong>Criminal law:</strong> Breaches are criminal offences, not civil matters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Sections of HSWA 1974</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 2</td>
                      <td className="border border-white/10 px-3 py-2">Employers</td>
                      <td className="border border-white/10 px-3 py-2">Duty to employees</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 3</td>
                      <td className="border border-white/10 px-3 py-2">Employers/Self-employed</td>
                      <td className="border border-white/10 px-3 py-2">Duty to non-employees</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 4</td>
                      <td className="border border-white/10 px-3 py-2">Premises controllers</td>
                      <td className="border border-white/10 px-3 py-2">Duty regarding premises</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 6</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturers/suppliers</td>
                      <td className="border border-white/10 px-3 py-2">Duty regarding articles and substances</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 7</td>
                      <td className="border border-white/10 px-3 py-2">Employees</td>
                      <td className="border border-white/10 px-3 py-2">Duty to take care and cooperate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 8</td>
                      <td className="border border-white/10 px-3 py-2">Everyone</td>
                      <td className="border border-white/10 px-3 py-2">Duty not to interfere with safety provisions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> HSWA 1974 applies to all work activities. The Electricity at Work Regulations 1989,
              made under HSWA, provide specific requirements for electrical safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Employer Duties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Employer Duties - Sections 2 and 3
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sections 2 and 3 contain the primary duties placed on employers. These are the foundation of
              workplace safety management and apply to all building services contractors and employers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Section 2 - Duties to Employees</h3>
              <p className="text-sm text-white mb-3">
                <strong>Section 2(1):</strong> "It shall be the duty of every employer to ensure, so far as is
                reasonably practicable, the health, safety and welfare at work of all his employees."
              </p>
              <p className="text-sm font-medium text-white mb-2">Section 2(2) requires provision of:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>(a) Safe plant and systems of work</strong> - Test equipment, isolation procedures, safe working methods</li>
                <li className="pl-1"><strong>(b) Safe handling, storage and transport</strong> - Materials, cables, equipment, hazardous substances</li>
                <li className="pl-1"><strong>(c) Information, instruction, training and supervision</strong> - Competence for electrical work</li>
                <li className="pl-1"><strong>(d) Safe workplace and access/egress</strong> - Working at height, confined spaces, site conditions</li>
                <li className="pl-1"><strong>(e) Safe working environment and welfare</strong> - Lighting, ventilation, rest facilities</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Section 3 - Duties to Non-Employees</h3>
              <p className="text-sm text-white mb-3">
                <strong>Section 3(1):</strong> "It shall be the duty of every employer to conduct his undertaking
                in such a way as to ensure, so far as is reasonably practicable, that persons not in his
                employment who may be affected thereby are not exposed to risks to their health or safety."
              </p>
              <p className="text-sm font-medium text-white mb-2">For building services, this includes:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Client staff</strong> - Building occupants during installation or maintenance</li>
                <li className="pl-1"><strong>Other contractors</strong> - Coordination on multi-trade sites</li>
                <li className="pl-1"><strong>Visitors</strong> - Anyone entering the work area</li>
                <li className="pl-1"><strong>Members of the public</strong> - Especially in occupied premises</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Applications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maintained and calibrated test instruments</li>
                  <li className="pl-1">Safe isolation procedures (lock-off)</li>
                  <li className="pl-1">Competent supervision of apprentices</li>
                  <li className="pl-1">Risk assessments for electrical work</li>
                  <li className="pl-1">Method statements for complex tasks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Written Policy Requirement</p>
                <p className="text-sm text-white mb-2">
                  Section 2(3) requires employers with <strong>5 or more employees</strong> to prepare and
                  revise a written health and safety policy statement, including:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">General policy statement</li>
                  <li className="pl-1">Organisation (responsibilities)</li>
                  <li className="pl-1">Arrangements (procedures)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Section 3 means building services contractors must consider the
              safety of everyone who might be affected by their work, not just their own employees.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 3: Employee Duties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Employee Duties - Sections 7 and 8
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HSWA 1974 places clear legal duties on employees. These are personal responsibilities that
              cannot be transferred to the employer. Employees can be prosecuted personally for breaches.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Section 7 - Employee Duties</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Section 7(a) - Duty of Care</p>
                  <p className="text-sm text-white/90">
                    "To take reasonable care for the health and safety of himself and of other persons who
                    may be affected by his acts or omissions at work."
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Section 7(b) - Duty to Cooperate</p>
                  <p className="text-sm text-white/90">
                    "To cooperate with his employer so far as is necessary to enable any duty or requirement
                    imposed on the employer to be performed or complied with."
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Section 8 - Duty Not to Interfere</h3>
              <p className="text-sm text-white">
                "No person shall intentionally or recklessly interfere with or misuse anything provided
                in the interests of health, safety or welfare in pursuance of any of the relevant statutory provisions."
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Examples for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Compliance Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Breach Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S.7(a) Care for self</td>
                      <td className="border border-white/10 px-3 py-2">Using safe isolation before work</td>
                      <td className="border border-white/10 px-3 py-2">Working live without justification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S.7(a) Care for others</td>
                      <td className="border border-white/10 px-3 py-2">Posting warning signs, barriers</td>
                      <td className="border border-white/10 px-3 py-2">Leaving live conductors exposed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S.7(b) Cooperate</td>
                      <td className="border border-white/10 px-3 py-2">Attending safety training</td>
                      <td className="border border-white/10 px-3 py-2">Ignoring safety instructions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S.8 Not interfere</td>
                      <td className="border border-white/10 px-3 py-2">Keeping guards/covers in place</td>
                      <td className="border border-white/10 px-3 py-2">Bypassing RCD protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Section 36 - Personal Liability</p>
              <p className="text-sm text-white">
                Where an offence by an employer is due to the act or default of another person (including
                an employee), that other person can be charged and convicted whether or not proceedings
                are taken against the employer. Individuals can face personal fines or imprisonment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> "I was told to do it" is not a defence. Employees must refuse
              unreasonable instructions that would compromise safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Enforcement and Penalties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            HSE Enforcement and Penalties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety Executive (HSE) is the enforcing authority for most workplaces, including
              construction sites and building services work. HSE inspectors have extensive powers under HSWA 1974.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HSE Inspector Powers (Section 20)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Enter premises at any reasonable time (or any time if dangerous)</li>
                <li className="pl-1">Take a constable if obstruction is anticipated</li>
                <li className="pl-1">Examine, investigate, and take measurements/photographs</li>
                <li className="pl-1">Take samples of articles, substances, or the atmosphere</li>
                <li className="pl-1">Require persons to answer questions and sign declarations</li>
                <li className="pl-1">Inspect and take copies of documents</li>
                <li className="pl-1">Seize and render harmless any article causing imminent danger</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <h3 className="text-sm font-medium text-orange-400 mb-2">Improvement Notice (Section 21)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Issued when contravention exists or is likely</li>
                  <li className="pl-1"><strong>Minimum 21 days</strong> to comply</li>
                  <li className="pl-1">Work can continue while remedying</li>
                  <li className="pl-1">Appeal suspends the notice</li>
                  <li className="pl-1">Must state contravention and reason</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Prohibition Notice (Section 22)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Risk of <strong>serious personal injury</strong></li>
                  <li className="pl-1">Can take <strong>immediate effect</strong></li>
                  <li className="pl-1">Activity must stop until remedied</li>
                  <li className="pl-1">Appeal does NOT suspend the notice</li>
                  <li className="pl-1">No current contravention needed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Penalties for Offences</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Offence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Magistrates' Court</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Crown Court</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of Sections 2-6</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of Section 7 (employees)</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of Improvement Notice</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or 2 years prison</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breach of Prohibition Notice</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or 6 months prison</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or 2 years prison</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fee for Intervention (FFI)</p>
              <p className="text-sm text-white">
                Since 2012, HSE recovers its costs from duty holders who are found to be in material breach
                of health and safety law. The current rate is <strong>£163 per hour</strong> (2024) for all
                time spent investigating the breach, including site visits, correspondence and enforcement action.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Corporate Manslaughter and Corporate Homicide Act 2007 creates a separate
              offence with unlimited fines for organisations whose gross breach causes death.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Applications</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 2 - Safe Systems of Work</h3>
              <p className="text-sm text-white mb-3">
                For electrical work, safe systems include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safe isolation procedure:</strong> Switch off, isolate, secure, prove dead, post warnings</li>
                <li className="pl-1"><strong>Permits to work:</strong> High voltage work, energised work when unavoidable</li>
                <li className="pl-1"><strong>Risk assessments:</strong> Task-specific assessments for non-routine work</li>
                <li className="pl-1"><strong>Method statements:</strong> Step-by-step procedures for complex installations</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 2(2)(c) - Information, Instruction, Training</h3>
              <p className="text-sm text-white mb-3">
                Building services employers must ensure workers are competent through:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Formal qualifications:</strong> Level 3 Electrotechnical qualification, HNC/HND</li>
                <li className="pl-1"><strong>Ongoing training:</strong> BS 7671 updates, new technologies, equipment-specific</li>
                <li className="pl-1"><strong>Supervision:</strong> Appropriate oversight of apprentices and trainees</li>
                <li className="pl-1"><strong>Information:</strong> Access to current regulations, manufacturer guidance</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Section 3 - Occupied Premises</h3>
              <p className="text-sm text-white mb-3">
                When working in occupied buildings, consider:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Coordination:</strong> Inform building manager/FM of work schedule and risks</li>
                <li className="pl-1"><strong>Segregation:</strong> Barriers, signs, managed access to work areas</li>
                <li className="pl-1"><strong>Emergency:</strong> Ensure fire escape routes remain accessible</li>
                <li className="pl-1"><strong>Services:</strong> Minimise disruption while maintaining safety</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Record Keeping</h3>
              <p className="text-sm text-white mb-3">
                Evidence of HSWA compliance includes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Written health and safety policy (5+ employees)</li>
                <li className="pl-1">Risk assessments and method statements</li>
                <li className="pl-1">Training records and competence evidence</li>
                <li className="pl-1">Equipment inspection and calibration records</li>
                <li className="pl-1">Accident/incident reports and investigations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Sections to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Section 2:</strong> Employer duties to employees (SFARP)</li>
                <li className="pl-1"><strong>Section 3:</strong> Duties to non-employees (SFARP)</li>
                <li className="pl-1"><strong>Section 7:</strong> Employee duty of care and cooperation</li>
                <li className="pl-1"><strong>Section 8:</strong> Duty not to interfere with safety provisions</li>
                <li className="pl-1"><strong>Section 20:</strong> Inspector powers</li>
                <li className="pl-1"><strong>Sections 21/22:</strong> Improvement and Prohibition Notices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SFARP Assessment</h3>
              <p className="text-sm text-white mb-2">
                'So far as reasonably practicable' requires weighing:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Risk:</strong> Likelihood and severity of harm</li>
                <li className="pl-1"><strong>vs Sacrifice:</strong> Cost, time, effort to control the risk</li>
                <li className="pl-1">If sacrifice is grossly disproportionate to risk, measure may not be required</li>
                <li className="pl-1">Burden of proof is on the duty holder to show impracticability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Building Services Breaches</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Inadequate isolation procedures (working live unnecessarily)</li>
                <li className="pl-1">Insufficient supervision of apprentices/trainees</li>
                <li className="pl-1">Failure to coordinate with other contractors</li>
                <li className="pl-1">Poor housekeeping (trip hazards, blocked access)</li>
                <li className="pl-1">Uncalibrated or damaged test equipment</li>
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
                <p className="font-medium text-white mb-1">Key Duty Holders</p>
                <ul className="space-y-0.5">
                  <li>Employers - S.2 (employees) S.3 (others)</li>
                  <li>Self-employed - S.3(2)</li>
                  <li>Employees - S.7 (care) S.8 (not interfere)</li>
                  <li>Manufacturers/suppliers - S.6</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Enforcement</p>
                <ul className="space-y-0.5">
                  <li>Improvement Notice - 21 days minimum</li>
                  <li>Prohibition Notice - Immediate if danger</li>
                  <li>Fines - Unlimited (all courts)</li>
                  <li>Prison - Up to 2 years (Crown Court)</li>
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
            <Link to="../h-n-c-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-2">
              Next: Management of Health and Safety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section1_1;
