import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Policy and Organisation - HNC Module 1 Section 3.1";
const DESCRIPTION = "Understand safety policy requirements, organisational responsibilities, management commitment, and effective communication of health and safety in building services engineering.";

const quickCheckQuestions = [
  {
    id: "policy-statement",
    question: "What must a written health and safety policy include as its first element?",
    options: ["Risk assessments", "General statement of intent", "Emergency procedures", "Training records"],
    correctIndex: 1,
    explanation: "The general statement of intent is the first and most important element - it sets out the organisation's commitment to health and safety, signed by the most senior person."
  },
  {
    id: "policy-threshold",
    question: "At what employee threshold must an organisation have a written health and safety policy?",
    options: ["1 employee", "5 or more employees", "10 or more employees", "50 or more employees"],
    correctIndex: 1,
    explanation: "Under the Health and Safety at Work etc. Act 1974, employers with 5 or more employees must have a written health and safety policy."
  },
  {
    id: "policy-review",
    question: "How often should a health and safety policy be reviewed as a minimum?",
    options: ["Monthly", "Quarterly", "Annually", "Every 5 years"],
    correctIndex: 2,
    explanation: "Safety policies should be reviewed at least annually, or sooner if there are significant changes to the organisation, legislation, or after incidents."
  },
  {
    id: "communication-method",
    question: "Which is the most effective method for communicating safety information to site workers?",
    options: ["Email only", "Notice boards only", "Toolbox talks and briefings", "Annual training only"],
    correctIndex: 2,
    explanation: "Toolbox talks and regular briefings are most effective as they allow two-way communication, immediate feedback, and can address current site-specific hazards."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the three main parts of a health and safety policy?",
    options: [
      "Introduction, body, conclusion",
      "Statement of intent, organisation, arrangements",
      "Policy, procedures, practices",
      "Aims, objectives, methods"
    ],
    correctAnswer: 1,
    explanation: "A health and safety policy must contain: (1) General statement of intent signed by senior management, (2) Organisation section detailing responsibilities, (3) Arrangements section describing how safety is managed in practice."
  },
  {
    id: 2,
    question: "Who has ultimate responsibility for health and safety in an organisation?",
    options: [
      "The Health and Safety Manager",
      "The Site Supervisor",
      "The most senior person (MD/CEO/Owner)",
      "The HSE Inspector"
    ],
    correctAnswer: 2,
    explanation: "The most senior person in the organisation holds ultimate responsibility for health and safety. They cannot delegate this responsibility, though they can delegate tasks to others."
  },
  {
    id: 3,
    question: "What is the role of a 'competent person' under the Management of Health and Safety at Work Regulations?",
    options: [
      "To carry out all risk assessments personally",
      "To advise the employer on health and safety matters",
      "To enforce safety rules and issue fines",
      "To represent employees in safety disputes"
    ],
    correctAnswer: 1,
    explanation: "A competent person is appointed to assist the employer with health and safety. They must have sufficient training, experience, and knowledge to advise on compliance with health and safety law."
  },
  {
    id: 4,
    question: "Which document demonstrates management commitment to health and safety?",
    options: [
      "Risk assessment forms",
      "Signed statement of intent in the safety policy",
      "Accident book entries",
      "Training certificates"
    ],
    correctAnswer: 1,
    explanation: "The signed statement of intent demonstrates visible commitment from top management. It should be signed by the MD/CEO and clearly state the organisation's commitment to health and safety."
  },
  {
    id: 5,
    question: "What is the purpose of the 'organisation' section of a safety policy?",
    options: [
      "To list all company products and services",
      "To detail who is responsible for what aspects of health and safety",
      "To describe the company's financial position",
      "To outline the company's marketing strategy"
    ],
    correctAnswer: 1,
    explanation: "The organisation section sets out the chain of responsibility for health and safety, from directors through managers, supervisors to employees, clearly stating each person's duties."
  },
  {
    id: 6,
    question: "How should safety responsibilities be communicated to employees?",
    options: [
      "Verbal instructions only",
      "Through job descriptions, induction, and ongoing communication",
      "Posted on the company website only",
      "Only during annual appraisals"
    ],
    correctAnswer: 1,
    explanation: "Safety responsibilities should be clearly documented in job descriptions, explained during induction, reinforced through training, and communicated through regular briefings and meetings."
  },
  {
    id: 7,
    question: "What triggers the need for a safety policy review?",
    options: [
      "Only when requested by the HSE",
      "Changes in legislation, organisation, or after incidents",
      "Only when an accident occurs",
      "Never - once written it remains valid"
    ],
    correctAnswer: 1,
    explanation: "Policy reviews should occur annually as minimum, plus after any significant changes: new legislation, organisational restructure, new work activities, incidents/accidents, or audit findings."
  },
  {
    id: 8,
    question: "What is the role of safety representatives appointed by trade unions?",
    options: [
      "To manage all health and safety activities",
      "To represent employees and consult on safety matters",
      "To carry out all risk assessments",
      "To issue improvement notices"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives represent employees in consultations with the employer, investigate hazards and complaints, inspect the workplace, and attend safety committee meetings."
  },
  {
    id: 9,
    question: "Which building services scenario requires specific mention in the arrangements section?",
    options: [
      "Office stationery ordering",
      "Isolation procedures for electrical work",
      "Staff holiday booking",
      "Vehicle parking arrangements"
    ],
    correctAnswer: 1,
    explanation: "The arrangements section must cover specific hazards and procedures relevant to the work, including isolation procedures, permit systems, PPE requirements, and emergency procedures for building services work."
  },
  {
    id: 10,
    question: "What makes a safety policy 'live' and effective?",
    options: [
      "Being kept in a locked cabinet",
      "Being regularly reviewed, communicated, and implemented",
      "Being written by external consultants",
      "Being over 100 pages long"
    ],
    correctAnswer: 1,
    explanation: "An effective policy is regularly reviewed, actively communicated to all employees, implemented through practical arrangements, monitored for compliance, and updated based on feedback and incidents."
  },
  {
    id: 11,
    question: "Under HASAWA 1974, what duty do employees have regarding safety policies?",
    options: [
      "No duties - only employers have responsibilities",
      "To cooperate with the employer and follow safety arrangements",
      "To write their own safety policies",
      "To inspect other workers' activities"
    ],
    correctAnswer: 1,
    explanation: "Employees must cooperate with their employer on health and safety matters, follow safety rules and procedures, use equipment as trained, and not interfere with safety provisions."
  },
  {
    id: 12,
    question: "What is the recommended structure for communicating safety information on a construction site?",
    options: [
      "One annual meeting",
      "Cascade from management through supervisors to operatives",
      "Email distribution only",
      "Notice on head office notice board"
    ],
    correctAnswer: 1,
    explanation: "Effective communication cascades down through the organisation: management decisions communicated through supervisors to operatives via toolbox talks, briefings, and site inductions, with feedback flowing upward."
  }
];

const faqs = [
  {
    question: "Can a small building services company share a safety policy template?",
    answer: "While templates can provide a starting point, the safety policy must be specific to your organisation. It must reflect your actual work activities, hazards, responsibilities, and arrangements. A generic template that doesn't match your operations is ineffective and may not meet legal requirements."
  },
  {
    question: "Who should sign the statement of intent?",
    answer: "The most senior person in the organisation - typically the Managing Director, CEO, or Owner. Their signature demonstrates top-level commitment. In larger organisations, divisional directors may also sign for their areas, but ultimate responsibility remains with the most senior person."
  },
  {
    question: "How do I communicate safety policy to subcontractors?",
    answer: "Subcontractors should receive relevant extracts during induction, particularly the arrangements section. They should acknowledge receipt and understanding. Their own safety arrangements must be compatible with yours. Regular coordination meetings and toolbox talks ensure ongoing communication."
  },
  {
    question: "What happens if the safety policy isn't followed?",
    answer: "Failure to follow the policy could result in accidents, enforcement action by HSE (improvement or prohibition notices), prosecution, civil liability claims, and reputational damage. Employees who repeatedly breach safety rules may face disciplinary action up to dismissal."
  },
  {
    question: "Do I need a competent person if I have a safety policy?",
    answer: "Yes. Under the Management of Health and Safety at Work Regulations 1999, every employer must appoint one or more competent persons to assist with health and safety. This is separate from having a policy. In small firms, this could be a trained director; larger firms may employ dedicated safety professionals."
  },
  {
    question: "How detailed should the arrangements section be for electrical work?",
    answer: "The arrangements should cover all significant hazards: isolation procedures, permit to work systems, live working restrictions, testing procedures, PPE requirements, training requirements, supervision arrangements, and emergency procedures. It should reference specific procedures documents where needed."
  }
];

const HNCModule1Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3">
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
            <Zap className="h-4 w-4" />
            <span>Module 1.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Policy and Organisation
          </h1>
          <p className="text-white/80">
            The foundation of effective safety management in building services organisations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Statement of intent:</strong> Signed commitment from top management</li>
              <li className="pl-1"><strong>Organisation:</strong> Clear chain of responsibility and accountability</li>
              <li className="pl-1"><strong>Arrangements:</strong> Practical procedures and systems</li>
              <li className="pl-1"><strong>Communication:</strong> Cascaded through all levels effectively</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical hazards:</strong> Specific isolation procedures required</li>
              <li className="pl-1"><strong>Multi-contractor:</strong> Coordination arrangements essential</li>
              <li className="pl-1"><strong>Site work:</strong> Mobile workforce communication challenges</li>
              <li className="pl-1"><strong>Competence:</strong> Qualified persons for specific tasks</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the three essential elements of a health and safety policy",
              "Describe organisational responsibilities from directors to operatives",
              "Understand the role of competent persons in safety management",
              "Identify effective methods for communicating safety information",
              "Apply policy requirements to building services contexts",
              "Recognise triggers for policy review and update"
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

        {/* Section 1: The Health and Safety Policy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Health and Safety Policy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The health and safety policy is the cornerstone of an organisation's safety management system.
              Under Section 2(3) of the Health and Safety at Work etc. Act 1974, every employer with five
              or more employees must prepare and revise a written statement of general policy on health and safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The three essential elements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>General Statement of Intent:</strong> The commitment from top management</li>
                <li className="pl-1"><strong>Organisation:</strong> Who is responsible for what</li>
                <li className="pl-1"><strong>Arrangements:</strong> How health and safety is managed in practice</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Statement of Intent Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Signature</td>
                      <td className="border border-white/10 px-3 py-2">MD/CEO/Owner must sign</td>
                      <td className="border border-white/10 px-3 py-2">Demonstrates commitment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Date</td>
                      <td className="border border-white/10 px-3 py-2">Date of issue/review</td>
                      <td className="border border-white/10 px-3 py-2">Shows currency of policy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commitment</td>
                      <td className="border border-white/10 px-3 py-2">Clear statement of intent</td>
                      <td className="border border-white/10 px-3 py-2">Sets organisational culture</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Objectives</td>
                      <td className="border border-white/10 px-3 py-2">Key safety goals</td>
                      <td className="border border-white/10 px-3 py-2">Provides direction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Review date</td>
                      <td className="border border-white/10 px-3 py-2">Next review scheduled</td>
                      <td className="border border-white/10 px-3 py-2">Ensures regular update</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal requirement:</strong> The policy must be brought to the attention of all employees.
              Simply having a policy locked in a cabinet does not fulfil this legal duty.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Organisation and Responsibilities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Organisation and Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The organisation section establishes a clear chain of responsibility for health and safety,
              from the boardroom to the shop floor. Every person must understand their role and to whom
              they are accountable for safety matters.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Responsibility Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Responsibilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Directors/Senior Management</td>
                      <td className="border border-white/10 px-3 py-2">Ultimate accountability, policy approval, resource allocation, strategic direction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Contracts/Project Managers</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessments, method statements, site safety plans, contractor coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Site Supervisors</td>
                      <td className="border border-white/10 px-3 py-2">Daily supervision, toolbox talks, compliance monitoring, incident reporting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Electricians/Operatives</td>
                      <td className="border border-white/10 px-3 py-2">Follow safe systems, use PPE, report hazards, cooperate with employer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Competent Person</td>
                      <td className="border border-white/10 px-3 py-2">Advise on H&S matters, assist with compliance, provide specialist guidance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Competent Person</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Required under Reg 7 MHSWR 1999</li>
                  <li className="pl-1">Must have sufficient training and experience</li>
                  <li className="pl-1">Advises on compliance with H&S law</li>
                  <li className="pl-1">Can be internal or external appointment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Specifics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Authorised Person for electrical systems</li>
                  <li className="pl-1">Appointed persons for first aid</li>
                  <li className="pl-1">Fire wardens for occupied premises</li>
                  <li className="pl-1">Permit issuers for high-risk work</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Responsibility can be delegated, but accountability cannot.
              The most senior person remains ultimately accountable for health and safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Arrangements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Arrangements - Practical Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The arrangements section describes how health and safety is actually managed in practice.
              This is the 'how' of safety management and should be specific to your organisation's
              activities and hazards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key arrangement areas for building services:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Risk assessment:</strong> Process for identifying and controlling hazards</li>
                <li className="pl-1"><strong>Safe systems of work:</strong> Method statements, procedures, permits</li>
                <li className="pl-1"><strong>Training:</strong> Induction, ongoing, task-specific, refresher</li>
                <li className="pl-1"><strong>Consultation:</strong> How workers are involved in safety decisions</li>
                <li className="pl-1"><strong>Monitoring:</strong> Inspections, audits, health surveillance</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Fire, first aid, evacuation, rescue</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Specific Arrangements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Arrangements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical work</td>
                      <td className="border border-white/10 px-3 py-2">Isolation procedures, lock-off systems, testing protocols, live working controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working at height</td>
                      <td className="border border-white/10 px-3 py-2">Access equipment selection, inspection regimes, rescue plans</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confined spaces</td>
                      <td className="border border-white/10 px-3 py-2">Entry permits, atmospheric testing, standby arrangements, rescue equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hot work</td>
                      <td className="border border-white/10 px-3 py-2">Permit system, fire watch, isolation of services, PPE requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Asbestos</td>
                      <td className="border border-white/10 px-3 py-2">Survey requirements, licensed removal, awareness training, emergency procedures</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> The arrangements section often references separate detailed
              documents (procedures, method statements, permits). Keep these as controlled documents that
              can be updated without reissuing the entire policy.
            </p>
          </div>
        </section>

        {/* Section 4: Communication and Review */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Communication and Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective communication ensures everyone understands and follows safety arrangements.
              Regular review keeps the policy current and relevant. Both are essential for a 'live'
              safety management system.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Induction training:</strong> New starters and site arrivals</li>
                  <li className="pl-1"><strong>Toolbox talks:</strong> Regular brief safety sessions</li>
                  <li className="pl-1"><strong>Safety briefings:</strong> Before high-risk activities</li>
                  <li className="pl-1"><strong>Notice boards:</strong> Policy, procedures, alerts</li>
                  <li className="pl-1"><strong>Safety meetings:</strong> Formal consultation forum</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Triggers for Policy Review</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Annual review:</strong> Minimum requirement</li>
                  <li className="pl-1"><strong>Legislative changes:</strong> New or amended regulations</li>
                  <li className="pl-1"><strong>Organisational changes:</strong> Structure, activities, locations</li>
                  <li className="pl-1"><strong>After incidents:</strong> Accidents, near misses, enforcement</li>
                  <li className="pl-1"><strong>Audit findings:</strong> Internal or external audit results</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascade Communication Model</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Level 1:</strong> Directors communicate strategic decisions to managers</p>
                <p><strong>Level 2:</strong> Managers brief supervisors on implementation requirements</p>
                <p><strong>Level 3:</strong> Supervisors deliver toolbox talks to operatives</p>
                <p><strong>Level 4:</strong> Operatives provide feedback up the chain</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Two-way communication:</strong> Employees must have the opportunity to raise concerns
              and provide feedback. This consultation is a legal requirement under the Safety Representatives
              and Safety Committees Regulations or the Health and Safety (Consultation with Employees) Regulations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Small Electrical Contractor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 12-person electrical contracting company needs to develop their safety policy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Statement of Intent:</strong></p>
                <p className="ml-4">- Signed by the Managing Director</p>
                <p className="ml-4">- States commitment to safe electrical work and compliance with BS 7671</p>
                <p className="mt-2"><strong>Organisation:</strong></p>
                <p className="ml-4">- MD: Ultimate responsibility, resource provision</p>
                <p className="ml-4">- Contracts Manager: Risk assessments, method statements</p>
                <p className="ml-4">- Lead Electricians: Site supervision, toolbox talks</p>
                <p className="ml-4">- All Electricians: Follow safe systems, report hazards</p>
                <p className="mt-2"><strong>Arrangements:</strong></p>
                <p className="ml-4">- References separate procedures for isolation, testing, PPE</p>
                <p className="ml-4">- Training matrix showing competencies</p>
                <p className="ml-4">- Accident reporting procedure</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Policy Communication on Multi-Contractor Site</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> How to ensure all workers understand safety requirements on a large commercial project.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Communication Strategy:</strong></p>
                <p className="ml-4">1. Site induction for all personnel - covers key policy points</p>
                <p className="ml-4">2. Safety notice boards at entrance and welfare facilities</p>
                <p className="ml-4">3. Weekly coordination meetings with all contractor supervisors</p>
                <p className="ml-4">4. Daily activity briefings before work commences</p>
                <p className="ml-4">5. Toolbox talks on specific hazards (minimum weekly)</p>
                <p className="ml-4">6. Site rules document issued to all contractors</p>
                <p className="mt-2 text-green-400">Key: Two-way communication - feedback mechanism through supervisors to safety committee</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key Points Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Written policy required for 5+ employees (HASAWA s.2(3))</li>
                <li className="pl-1">Must be brought to attention of all employees</li>
                <li className="pl-1">Competent person must be appointed (MHSWR Reg 7)</li>
                <li className="pl-1">Employees must be consulted on H&S matters</li>
                <li className="pl-1">Policy must be reviewed and revised as necessary</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Policy Characteristics</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Specific to the organisation's activities and hazards</li>
                <li className="pl-1">Clear responsibilities assigned to named positions</li>
                <li className="pl-1">Practical arrangements that are actually followed</li>
                <li className="pl-1">Regularly reviewed and updated</li>
                <li className="pl-1">Actively communicated to all personnel</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic templates:</strong> Not tailored to actual work activities</li>
                <li className="pl-1"><strong>Shelf documents:</strong> Not communicated or implemented</li>
                <li className="pl-1"><strong>Outdated content:</strong> Not reviewed after changes</li>
                <li className="pl-1"><strong>Unclear responsibilities:</strong> No named accountable persons</li>
                <li className="pl-1"><strong>Missing arrangements:</strong> Key hazards not addressed</li>
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
                <p className="font-medium text-white mb-1">Policy Elements</p>
                <ul className="space-y-0.5">
                  <li>Statement of Intent - Signed commitment</li>
                  <li>Organisation - Responsibility chain</li>
                  <li>Arrangements - Practical procedures</li>
                  <li>Review - Annual minimum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>HASAWA 1974 s.2(3) - Policy requirement</li>
                  <li>MHSWR 1999 Reg 7 - Competent person</li>
                  <li>SRSCR 1977 - Union safety reps</li>
                  <li>HSCER 1996 - Employee consultation</li>
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
            <Link to="../h-n-c-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3-2">
              Next: Safety Culture and Leadership
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section3_1;
