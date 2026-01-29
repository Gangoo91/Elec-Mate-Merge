import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Contractor Management - HNC Module 1 Section 3.6";
const DESCRIPTION = "Master contractor selection, induction, monitoring, coordination, and principal contractor duties under CDM for building services projects.";

const quickCheckQuestions = [
  {
    id: "contractor-selection",
    question: "What must a client assess when selecting contractors under CDM 2015?",
    options: ["Lowest price only", "Skills, knowledge, experience and organisational capability", "Company size", "Number of employees"],
    correctIndex: 1,
    explanation: "Under CDM 2015, clients must take reasonable steps to satisfy themselves that contractors have the skills, knowledge, experience, and (for organisations) the organisational capability to carry out the work safely."
  },
  {
    id: "principal-contractor",
    question: "When must a principal contractor be appointed under CDM 2015?",
    options: ["For all projects", "When there is more than one contractor", "Only for projects over £500,000", "Only for new build projects"],
    correctIndex: 1,
    explanation: "A principal contractor must be appointed for construction projects where there is, or is likely to be, more than one contractor working on the project at any time."
  },
  {
    id: "induction-content",
    question: "What must contractor site induction include?",
    options: ["Company history only", "Site rules, hazards, emergency procedures, and welfare arrangements", "Payment terms", "Marketing materials"],
    correctIndex: 1,
    explanation: "Inductions must cover site-specific information: rules, known hazards, emergency procedures, first aid, welfare facilities, reporting procedures, and any site-specific requirements."
  },
  {
    id: "coordination-duty",
    question: "Who is responsible for coordinating activities between contractors?",
    options: ["Each contractor individually", "The principal contractor", "The HSE", "The client only"],
    correctIndex: 1,
    explanation: "The principal contractor has the duty to plan, manage and monitor the construction phase, including coordinating cooperation between contractors to ensure work is carried out safely."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the CDM 2015 client duties regarding contractor competence?",
    options: [
      "Accept the lowest bidder regardless of competence",
      "Take reasonable steps to satisfy themselves that designers and contractors are competent",
      "Hire an independent assessor for every project",
      "Only check insurance documentation"
    ],
    correctAnswer: 1,
    explanation: "CDM Reg 8 requires clients to take reasonable steps to satisfy themselves that designers and contractors have the skills, knowledge, experience, and (for organisations) organisational capability needed."
  },
  {
    id: 2,
    question: "What is the purpose of pre-qualification questionnaires (PQQs)?",
    options: [
      "To set project budgets",
      "To assess contractor competence before inviting them to tender",
      "To check credit ratings only",
      "To create marketing databases"
    ],
    correctAnswer: 1,
    explanation: "PQQs assess contractor competence, capability, and compliance before they're invited to tender. This includes health and safety management, training, experience, and relevant accreditations."
  },
  {
    id: 3,
    question: "What information should be in the Construction Phase Plan?",
    options: [
      "Marketing strategy",
      "Site rules, emergency procedures, arrangements for managing risks",
      "Staff holiday schedules",
      "Company financial statements"
    ],
    correctAnswer: 1,
    explanation: "The Construction Phase Plan must record arrangements for managing significant risks, site rules, emergency procedures, and how the work will be managed safely. It's developed by the principal contractor."
  },
  {
    id: 4,
    question: "What is a 'permit to work coordination meeting'?",
    options: [
      "An annual company review",
      "A meeting to coordinate multiple permits and prevent conflicts",
      "A training session",
      "A budget meeting"
    ],
    correctAnswer: 1,
    explanation: "Coordination meetings ensure multiple activities under permit don't conflict or create combined hazards. For example, hot work shouldn't occur near where gas systems are being purged."
  },
  {
    id: 5,
    question: "How should contractor performance be monitored on site?",
    options: [
      "Through end-of-project review only",
      "Through regular inspections, observations, and documented checks",
      "By accepting self-certification only",
      "Through annual audits only"
    ],
    correctAnswer: 1,
    explanation: "Ongoing monitoring through site inspections, behavioural observations, documented safety checks, and review of method statements ensures contractors maintain standards throughout the project."
  },
  {
    id: 6,
    question: "What should happen if a contractor fails to comply with site safety rules?",
    options: [
      "Ignore it to maintain relationships",
      "Address it immediately through escalating action from warning to removal",
      "Wait until the end of the project",
      "Only document it for future reference"
    ],
    correctAnswer: 1,
    explanation: "Non-compliance must be addressed immediately. Escalation typically goes: verbal warning, written warning, stop notice, and ultimately removal from site for serious or repeated breaches."
  },
  {
    id: 7,
    question: "What is the principal contractor's duty regarding site induction?",
    options: [
      "Induction is optional",
      "Ensure every worker receives suitable site induction",
      "Only induct managers",
      "Delegate all induction to subcontractors"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor must ensure every site worker receives suitable site induction covering site-specific risks, rules, emergency procedures, and welfare arrangements before starting work."
  },
  {
    id: 8,
    question: "What documents should contractors provide before starting work?",
    options: [
      "Business cards only",
      "Risk assessments, method statements, training records, insurance",
      "Company brochure",
      "Previous job references only"
    ],
    correctAnswer: 1,
    explanation: "Before work starts, contractors should provide: relevant risk assessments and method statements (RAMS), evidence of competence (training/qualifications), insurance certificates, and any specific certifications required."
  },
  {
    id: 9,
    question: "What is 'contractor pre-start' or 'kick-off' meeting?",
    options: [
      "A social event",
      "A formal meeting to review arrangements before work begins",
      "A financial negotiation",
      "An informal chat"
    ],
    correctAnswer: 1,
    explanation: "Pre-start meetings formally review all arrangements before work begins: scope, RAMS, interfaces with other contractors, site rules, emergency procedures, communication, and any outstanding issues."
  },
  {
    id: 10,
    question: "How should multiple electrical contractors be coordinated on a large project?",
    options: [
      "Let them work independently",
      "Through regular coordination meetings, clear demarcation, and permit systems",
      "By separate communication only",
      "Through the client directly"
    ],
    correctAnswer: 1,
    explanation: "Coordination requires regular meetings, clear work area demarcation, permit coordination, shared isolation registers, communication protocols, and resolution of interface issues."
  },
  {
    id: 11,
    question: "What records should be kept regarding contractor management?",
    options: [
      "No records required",
      "Selection records, inductions, monitoring, non-conformances, meetings",
      "Financial records only",
      "Attendance sheets only"
    ],
    correctAnswer: 1,
    explanation: "Maintain records of: competence assessment/selection, induction attendance, monitoring inspections, non-conformance reports, coordination meetings, permit registers, and performance reviews."
  },
  {
    id: 12,
    question: "What is the client's duty if they become aware of contractor safety failings?",
    options: [
      "No duty - contractors are independent",
      "Take reasonable steps to ensure the matter is addressed",
      "Report directly to HSE without contractor knowledge",
      "Ignore until the next audit"
    ],
    correctAnswer: 1,
    explanation: "If a client becomes aware of safety failings, they must take reasonable steps to ensure the matter is addressed. This may include raising it with the principal contractor or contractor directly."
  }
];

const faqs = [
  {
    question: "What evidence of competence should we check for electrical contractors?",
    answer: "Check: ECS cards showing qualifications (AM2, inspection and testing, design), BS 7671 competence, specific equipment training (e.g., HV, fire alarm), health and safety training (SSSTS/SMSTS/SEATS), NICEIC or similar registration, relevant project experience, and organisational systems (risk assessment, quality control)."
  },
  {
    question: "Can we rely on contractor accreditations alone?",
    answer: "Accreditations (SSIP, ISO, NICEIC) provide useful assurance but shouldn't be the only check. They confirm systems are in place but don't guarantee competence for your specific project. Always review RAMS, check relevant experience, and monitor performance on site."
  },
  {
    question: "How detailed should contractor inductions be?",
    answer: "Inductions should cover all site-specific information needed to work safely: site rules, known hazards, emergency procedures, first aid, welfare, reporting procedures, permit requirements, and specific restrictions. Duration depends on complexity - typically 30 minutes to 2 hours."
  },
  {
    question: "What happens if a subcontractor brings their own sub-subcontractors?",
    answer: "This 'chain' must be controlled. Require notification and approval of sub-subcontractors, ensure they meet the same competence standards, and ensure they receive proper induction. The principal contractor remains responsible for coordination regardless of contractual levels."
  },
  {
    question: "How do we manage contractor work in occupied premises?",
    answer: "Additional coordination is needed: agree work areas and access, communicate with building occupants, consider timing of noisy/disruptive work, maintain fire safety and escape routes, protect occupants from dust/fumes, and ensure contractors don't create hazards for building users."
  },
  {
    question: "Should we audit our regular contractors?",
    answer: "Yes, periodic audits of regular contractors help maintain standards. This can include site visits, document reviews, and assessment against contract requirements. Audits should be proportionate to risk and value - high-risk/high-value contractors warrant more frequent, detailed audits."
  }
];

const HNCModule1Section3_6 = () => {
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
            <span>Module 1.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Contractor Management
          </h1>
          <p className="text-white/80">
            Selecting, managing and coordinating contractors for safe building services projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Selection:</strong> Assess competence before appointment</li>
              <li className="pl-1"><strong>Induction:</strong> Site-specific safety information for all</li>
              <li className="pl-1"><strong>Monitoring:</strong> Ongoing checks of compliance and performance</li>
              <li className="pl-1"><strong>Coordination:</strong> Manage interfaces and prevent conflicts</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CDM duties:</strong> Principal contractor coordination</li>
              <li className="pl-1"><strong>M&E interfaces:</strong> Multiple trades working together</li>
              <li className="pl-1"><strong>Specialist work:</strong> High-risk electrical, gas, refrigeration</li>
              <li className="pl-1"><strong>Permit systems:</strong> Coordinated isolation and access</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply CDM 2015 requirements for contractor appointment",
              "Implement effective contractor selection and pre-qualification",
              "Develop and deliver contractor induction programmes",
              "Monitor contractor safety performance on site",
              "Coordinate multiple contractors and manage interfaces",
              "Address contractor non-compliance effectively"
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

        {/* Section 1: Contractor Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Contractor Selection and Competence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Under CDM 2015, clients must take reasonable steps to satisfy themselves that contractors
              have the skills, knowledge, experience, and organisational capability to carry out the
              work safely. This assessment should be proportionate to the risks involved.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Competence assessment elements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Experience:</strong> Relevant project history, similar scope and complexity</li>
                <li className="pl-1"><strong>Qualifications:</strong> Trade competence, management training, specific certifications</li>
                <li className="pl-1"><strong>Resources:</strong> Adequate workforce, equipment, supervision capacity</li>
                <li className="pl-1"><strong>Systems:</strong> Health and safety management, quality control, training</li>
                <li className="pl-1"><strong>Track record:</strong> Safety performance, references, enforcement history</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Qualification Assessment Areas</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Check</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">H&S Policy</td>
                      <td className="border border-white/10 px-3 py-2">Appropriate to activities, current, signed</td>
                      <td className="border border-white/10 px-3 py-2">Copy of policy document</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Training</td>
                      <td className="border border-white/10 px-3 py-2">Trade qualifications, CSCS/ECS cards, safety training</td>
                      <td className="border border-white/10 px-3 py-2">Training matrix, card copies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Experience</td>
                      <td className="border border-white/10 px-3 py-2">Similar projects, specific expertise</td>
                      <td className="border border-white/10 px-3 py-2">Project references, testimonials</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insurance</td>
                      <td className="border border-white/10 px-3 py-2">Employers liability, public liability, professional indemnity</td>
                      <td className="border border-white/10 px-3 py-2">Current certificates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accreditations</td>
                      <td className="border border-white/10 px-3 py-2">SSIP, ISO 45001, trade body membership</td>
                      <td className="border border-white/10 px-3 py-2">Certificates, registration numbers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety record</td>
                      <td className="border border-white/10 px-3 py-2">Accident rates, enforcement action, improvements</td>
                      <td className="border border-white/10 px-3 py-2">Statistics, declarations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Proportionate approach:</strong> Assessment should be proportionate to risk. Low-risk
              routine work needs simpler checks; high-risk specialist work requires more detailed assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: CDM Roles and Duties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            CDM Roles and Principal Contractor Duties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Construction (Design and Management) Regulations 2015 establish clear duties for all
              parties involved in construction work. For projects with multiple contractors, a principal
              contractor must be appointed to coordinate the construction phase.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CDM Duty Holders</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Duties</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Client</td>
                      <td className="border border-white/10 px-3 py-2">Make suitable arrangements, ensure adequate time/resources, provide pre-construction information</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Principal Designer</td>
                      <td className="border border-white/10 px-3 py-2">Plan, manage, coordinate pre-construction phase, prepare health and safety file</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Principal Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Plan, manage, coordinate construction phase, prepare construction phase plan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Designers</td>
                      <td className="border border-white/10 px-3 py-2">Eliminate/reduce risks through design, provide information on remaining risks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Contractors</td>
                      <td className="border border-white/10 px-3 py-2">Plan, manage, monitor own work, cooperate with others, provide information</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Workers</td>
                      <td className="border border-white/10 px-3 py-2">Cooperate with others, report unsafe conditions, follow instructions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Principal Contractor Duties</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Prepare construction phase plan</li>
                  <li className="pl-1">Organise cooperation between contractors</li>
                  <li className="pl-1">Coordinate implementation of H&S principles</li>
                  <li className="pl-1">Ensure site induction for all workers</li>
                  <li className="pl-1">Take reasonable steps to prevent unauthorised access</li>
                  <li className="pl-1">Provide welfare facilities</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor Duties</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Plan, manage and monitor own work safely</li>
                  <li className="pl-1">Comply with PC's site rules and directions</li>
                  <li className="pl-1">Provide information for construction phase plan</li>
                  <li className="pl-1">Inform PC of risks created by their work</li>
                  <li className="pl-1">Ensure workers have right skills and training</li>
                  <li className="pl-1">Consult and engage with workforce</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Single contractor:</strong> If there's only one contractor on a project, they take
              on the principal contractor duties. The principal designer role may be taken by the designer.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Induction and RAMS */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Induction and RAMS Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every person working on a construction site must receive suitable site-specific induction
              before starting work. Additionally, contractors must provide risk assessments and method
              statements (RAMS) for review before work begins.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Site induction content:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Site rules:</strong> Access, PPE, behaviour, prohibited activities</li>
                <li className="pl-1"><strong>Known hazards:</strong> Asbestos, services, live systems, fragile areas</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Alarms, assembly points, first aid, contacts</li>
                <li className="pl-1"><strong>Welfare:</strong> Toilets, rest areas, drinking water, drying facilities</li>
                <li className="pl-1"><strong>Reporting:</strong> Accidents, near misses, hazards, toolbox talks</li>
                <li className="pl-1"><strong>Permits:</strong> When required, how to obtain, procedures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RAMS Review Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Check</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Questions to Ask</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scope</td>
                      <td className="border border-white/10 px-3 py-2">Does it cover all the work to be done? Specific to this site?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hazards</td>
                      <td className="border border-white/10 px-3 py-2">All significant hazards identified? Including site-specific ones?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls</td>
                      <td className="border border-white/10 px-3 py-2">Controls proportionate and practical? Hierarchy of control followed?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sequence</td>
                      <td className="border border-white/10 px-3 py-2">Logical work sequence? Safe access/egress? Isolation points?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resources</td>
                      <td className="border border-white/10 px-3 py-2">Right equipment specified? Training requirements clear?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interfaces</td>
                      <td className="border border-white/10 px-3 py-2">Coordination with other trades? Impact on building users?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Start Meeting Agenda</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm scope and programme</li>
                <li className="pl-1">Review and accept RAMS</li>
                <li className="pl-1">Identify interfaces with other contractors</li>
                <li className="pl-1">Confirm permit requirements</li>
                <li className="pl-1">Agree communication and reporting procedures</li>
                <li className="pl-1">Resolve any outstanding issues</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Generic RAMS:</strong> Beware of generic documents that haven't been tailored to the
              specific site. Challenge and return documents that don't address actual site conditions and hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Monitoring and Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Monitoring and Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ongoing monitoring ensures contractors maintain standards throughout the project. Effective
              coordination prevents conflicts between trades and manages interface risks - particularly
              critical in building services where multiple systems interact.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitoring Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Regular site inspections and tours</li>
                  <li className="pl-1">Behavioural safety observations</li>
                  <li className="pl-1">Review of permits and isolations</li>
                  <li className="pl-1">Verification of competence cards on site</li>
                  <li className="pl-1">Checking adherence to RAMS</li>
                  <li className="pl-1">Toolbox talk attendance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Daily activity coordination (busy areas)</li>
                  <li className="pl-1">Weekly contractor coordination meetings</li>
                  <li className="pl-1">Shared isolation registers</li>
                  <li className="pl-1">Permit coordination (no conflicts)</li>
                  <li className="pl-1">Interface risk management</li>
                  <li className="pl-1">Progress and look-ahead planning</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Escalation of Non-Compliance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Trigger</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Minor non-compliance, first instance</td>
                      <td className="border border-white/10 px-3 py-2">Verbal correction, coaching, record made</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Repeat minor or moderate breach</td>
                      <td className="border border-white/10 px-3 py-2">Written warning, meeting with supervisor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Serious breach or continued repeats</td>
                      <td className="border border-white/10 px-3 py-2">Stop notice, formal meeting with management</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Gross misconduct or refusal to comply</td>
                      <td className="border border-white/10 px-3 py-2">Removal from site, contract review</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">M&E Coordination Specifics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrical/mechanical interfaces:</strong> Motor connections, control wiring, BMS integration</li>
                <li className="pl-1"><strong>Service clashes:</strong> Containment routes, penetrations, access for maintenance</li>
                <li className="pl-1"><strong>Commissioning sequence:</strong> Power before controls, controls before systems</li>
                <li className="pl-1"><strong>Isolation management:</strong> Shared registers, clear demarcation of responsibility</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Record keeping:</strong> Document all monitoring activities, findings, and actions taken.
              These records demonstrate due diligence and provide evidence for contractor performance reviews.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Contractor Pre-Qualification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Selecting electrical contractor for major commercial installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Assessment Criteria:</strong></p>
                <p className="ml-4">1. NICEIC Approved Contractor registration - verified</p>
                <p className="ml-4">2. ISO 45001 certification - current certificate reviewed</p>
                <p className="ml-4">3. Similar project references - 3 comparable projects checked</p>
                <p className="ml-4">4. Training matrix - AM2, design, inspection & testing competence</p>
                <p className="ml-4">5. Accident statistics - AFR below industry average</p>
                <p className="ml-4">6. Example RAMS - reviewed for quality and specificity</p>
                <p className="ml-4">7. Insurance - EL £10m, PL £5m, PI £2m confirmed</p>
                <p className="mt-2"><strong>Outcome:</strong> Contractor meets criteria - included on approved list</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Multi-Contractor Coordination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Plant room with electrical, mechanical, and controls contractors.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Coordination Measures:</strong></p>
                <p className="ml-4">- Daily briefing: All supervisors 08:00 - today's activities, interfaces</p>
                <p className="ml-4">- Shared isolation register: All isolations logged and visible</p>
                <p className="ml-4">- Permit coordination: Hot work not during refrigerant pipe work</p>
                <p className="ml-4">- Work areas: Clear demarcation of each contractor's zone</p>
                <p className="ml-4">- Weekly coordination meeting: Programme, issues, look-ahead</p>
                <p className="ml-4">- Commissioning sequence: Agreed and documented - electrical first</p>
                <p className="mt-2"><strong>Interface Risk:</strong> Controls wiring to be installed before panels energised - sequenced in programme</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key Points Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Assess competence proportionate to risk before appointment</li>
                <li className="pl-1">Check experience, qualifications, systems, and track record</li>
                <li className="pl-1">Don't rely solely on accreditations - verify capability</li>
                <li className="pl-1">Maintain approved contractor lists with regular review</li>
                <li className="pl-1">Document selection decisions and evidence reviewed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Principal contractor coordinates all contractors on site</li>
                <li className="pl-1">Regular coordination meetings - daily briefings for busy sites</li>
                <li className="pl-1">Shared isolation registers prevent conflicts</li>
                <li className="pl-1">Clear work area demarcation and sequence</li>
                <li className="pl-1">Address interface risks proactively</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Price over safety:</strong> Selecting on cost alone without competence check</li>
                <li className="pl-1"><strong>Generic RAMS:</strong> Accepting documents not specific to the site</li>
                <li className="pl-1"><strong>Induction gaps:</strong> Workers starting before proper induction</li>
                <li className="pl-1"><strong>Weak monitoring:</strong> Assuming contractors will self-manage</li>
                <li className="pl-1"><strong>Poor coordination:</strong> Contractors working in isolation</li>
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
                <p className="font-medium text-white mb-1">CDM Duty Holders</p>
                <ul className="space-y-0.5">
                  <li>Client - arrangements, information, time</li>
                  <li>Principal Designer - pre-construction phase</li>
                  <li>Principal Contractor - construction phase</li>
                  <li>Contractors - own work, cooperation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Contractor Lifecycle</p>
                <ul className="space-y-0.5">
                  <li>1. Pre-qualify - assess competence</li>
                  <li>2. Induct - site-specific information</li>
                  <li>3. Monitor - ongoing compliance</li>
                  <li>4. Coordinate - manage interfaces</li>
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
            <Link to="../h-n-c-module1-section3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Procedures
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section3_6;
