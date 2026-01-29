import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "CDM Site Compliance - HNC Module 5 Section 6.4";
const DESCRIPTION = "Master CDM 2015 site compliance for building services: construction phase plan requirements, site inductions, toolbox talks, RAMS process, principal contractor duties and F10 notification procedures.";

const quickCheckQuestions = [
  {
    id: "cdm-dutyholder",
    question: "Under CDM 2015, who is responsible for preparing the construction phase plan?",
    options: ["The client", "The principal designer", "The principal contractor", "The building services contractor"],
    correctIndex: 2,
    explanation: "The principal contractor is responsible for preparing, developing and maintaining the construction phase plan throughout the project. They must ensure it is site-specific and addresses all health and safety risks."
  },
  {
    id: "f10-notification",
    question: "When must a F10 notification be submitted to the HSE?",
    options: ["Within 7 days of work starting", "Before construction phase begins", "After the first site induction", "Only for projects over 500 person-days"],
    correctIndex: 1,
    explanation: "The F10 notification must be submitted to the HSE before the construction phase begins. This applies to projects lasting more than 30 working days with more than 20 workers, or exceeding 500 person-days."
  },
  {
    id: "toolbox-talk",
    question: "What is the primary purpose of a toolbox talk?",
    options: ["To replace formal training requirements", "To address specific hazards and reinforce safe practices", "To fulfil CDM documentation requirements", "To train new apprentices"],
    correctIndex: 1,
    explanation: "Toolbox talks are short, focused safety briefings designed to address specific hazards relevant to current work activities and reinforce safe working practices. They supplement but do not replace formal training."
  },
  {
    id: "rams-requirement",
    question: "RAMS must be prepared and communicated before:",
    options: ["Any work begins on site", "High-risk activities only", "The work activity they relate to", "The project completion date"],
    correctIndex: 2,
    explanation: "Risk Assessments and Method Statements (RAMS) must be prepared and communicated to all workers before the specific work activity they relate to begins. This ensures workers understand the risks and control measures."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which dutyholder role was introduced by CDM 2015 to replace the CDM coordinator?",
    options: [
      "Principal contractor",
      "Principal designer",
      "Client advisor",
      "CDM consultant"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 introduced the principal designer role to replace the CDM coordinator. The principal designer has design-phase health and safety coordination responsibilities."
  },
  {
    id: 2,
    question: "The construction phase plan must be in place before:",
    options: ["The design is complete", "The construction phase begins", "Workers arrive on site", "The F10 is submitted"],
    correctAnswer: 1,
    explanation: "The construction phase plan must be prepared by the principal contractor and be in place before the construction phase begins. Work cannot lawfully start without it."
  },
  {
    id: 3,
    question: "What is the minimum content required in a construction phase plan?",
    options: [
      "Project description only",
      "Management arrangements, site rules, specific measures for high-risk work",
      "Contact details of all workers",
      "Equipment specifications"
    ],
    correctAnswer: 1,
    explanation: "A construction phase plan must include management arrangements, communication protocols, site rules, and specific measures for controlling high-risk work as defined in Schedule 3 of CDM 2015."
  },
  {
    id: 4,
    question: "Site inductions must cover which of the following?",
    options: [
      "Technical installation methods only",
      "Emergency procedures, site rules, hazards and welfare facilities",
      "Company history and values",
      "Personal development goals"
    ],
    correctAnswer: 1,
    explanation: "Site inductions must cover emergency procedures, site-specific rules, known hazards, first aid arrangements, welfare facilities, and reporting procedures. This ensures workers can work safely from day one."
  },
  {
    id: 5,
    question: "How often should toolbox talks typically be delivered on an active construction site?",
    options: [
      "Monthly",
      "Weekly or as new hazards arise",
      "At project start only",
      "Annually"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks should be delivered regularly, typically weekly, and whenever new hazards arise or work activities change. They keep safety fresh in workers' minds and address evolving site conditions."
  },
  {
    id: 6,
    question: "A RAMS document should include:",
    options: [
      "Risk assessment, method statement, and emergency procedures",
      "Only the method statement for efficiency",
      "Equipment costs and timelines",
      "Worker qualifications only"
    ],
    correctAnswer: 0,
    explanation: "RAMS should include a comprehensive risk assessment identifying hazards and control measures, a detailed method statement describing safe work procedures, and emergency procedures specific to the activity."
  },
  {
    id: 7,
    question: "Who is responsible for ensuring workers receive adequate site-specific training and induction?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "Individual workers"
    ],
    correctAnswer: 2,
    explanation: "The principal contractor is responsible for ensuring all workers, including subcontractors, receive adequate site-specific training and induction before commencing work on the construction site."
  },
  {
    id: 8,
    question: "The F10 notification must be displayed:",
    options: [
      "In the site office only",
      "In a prominent position on site accessible to all workers",
      "On the principal contractor's website",
      "At the client's premises"
    ],
    correctAnswer: 1,
    explanation: "The F10 notification must be displayed in a prominent position on site where it is accessible to all workers. This ensures everyone knows the project is notifiable and who the key dutyholders are."
  },
  {
    id: 9,
    question: "Which of the following is NOT a Schedule 3 high-risk activity under CDM 2015?",
    options: [
      "Work at height",
      "Work with asbestos",
      "Standard first fix electrical installation",
      "Work in confined spaces"
    ],
    correctAnswer: 2,
    explanation: "Standard electrical installation is not specifically listed as a Schedule 3 high-risk activity. However, work at height, with asbestos, in confined spaces, near live services, and excavation work are all Schedule 3 activities requiring specific control measures."
  },
  {
    id: 10,
    question: "Building services contractors attending site must:",
    options: [
      "Only follow their own company procedures",
      "Comply with the construction phase plan and site rules",
      "Ignore toolbox talks if qualified",
      "Report only to their own supervisor"
    ],
    correctAnswer: 1,
    explanation: "All contractors, including building services contractors, must comply with the construction phase plan and site rules established by the principal contractor. This ensures coordinated safety management across all trades."
  },
  {
    id: 11,
    question: "The principal contractor must consult and engage with workers on matters of:",
    options: [
      "Commercial contract terms",
      "Health, safety and welfare",
      "Design decisions",
      "Subcontractor selection"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the principal contractor must consult and engage with workers on matters of health, safety and welfare. This includes involving workers in risk assessments and safety planning."
  },
  {
    id: 12,
    question: "A construction phase plan should be:",
    options: [
      "A generic template used on all projects",
      "Site-specific and proportionate to the risks",
      "As detailed as possible regardless of project size",
      "Prepared by the client"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan must be site-specific and proportionate to the nature and scale of the work and the risks involved. A generic template is not sufficient for CDM compliance."
  }
];

const faqs = [
  {
    question: "What is the difference between a principal contractor and a principal designer?",
    answer: "The principal contractor manages the construction phase, including site safety, worker coordination, and the construction phase plan. The principal designer manages health and safety during the pre-construction phase, coordinating design to eliminate or reduce risks. On most projects, these are separate organisations with complementary responsibilities."
  },
  {
    question: "Do I need to complete a site induction if I've worked on the same site before?",
    answer: "If you return to a site after a significant absence or if site conditions have changed, you should complete a refresher induction. Many sites require re-induction after 6-12 months absence. Always check with the principal contractor - site rules and hazards may have changed since your last visit."
  },
  {
    question: "Can toolbox talks replace formal health and safety training?",
    answer: "No. Toolbox talks supplement formal training but cannot replace it. Workers must still hold required qualifications (such as ECS cards) and complete mandatory training (such as asbestos awareness). Toolbox talks reinforce existing knowledge and address site-specific or task-specific hazards."
  },
  {
    question: "Who is responsible for RAMS on a building services subcontract?",
    answer: "The building services contractor typically prepares RAMS for their specific work activities, but these must be submitted to and approved by the principal contractor before work begins. The RAMS must align with the construction phase plan and consider interfaces with other trades."
  },
  {
    question: "What happens if an incident occurs and the construction phase plan is inadequate?",
    answer: "An inadequate construction phase plan is a breach of CDM 2015. The principal contractor could face HSE enforcement action including improvement notices, prohibition notices, or prosecution. In serious cases, directors can face personal liability. Insurance claims may also be affected if non-compliance contributed to the incident."
  },
  {
    question: "How detailed does a construction phase plan need to be for a small building services project?",
    answer: "The plan should be proportionate to the risks. For a simple installation in an occupied building, a few pages covering site rules, emergency procedures, key hazards, and coordination arrangements may suffice. For complex multi-trade projects, much more detail is required. The HSE provides guidance and templates scaled to project complexity."
  }
];

const HNCModule5Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 5.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CDM Site Compliance
          </h1>
          <p className="text-white/80">
            Construction phase plan requirements, site inductions, toolbox talks and CDM 2015 compliance procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CDM 2015:</strong> Key regulation for construction H&S management</li>
              <li className="pl-1"><strong>Construction phase plan:</strong> Required before work starts</li>
              <li className="pl-1"><strong>Site induction:</strong> Mandatory for all workers</li>
              <li className="pl-1"><strong>RAMS:</strong> Activity-specific risk control documents</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Coordination:</strong> Must integrate with other trades</li>
              <li className="pl-1"><strong>Live working:</strong> Specific RAMS required</li>
              <li className="pl-1"><strong>Work at height:</strong> Common on M&E installations</li>
              <li className="pl-1"><strong>Permit systems:</strong> Hot works, isolation procedures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify CDM 2015 dutyholders and their responsibilities",
              "Understand construction phase plan content requirements",
              "Deliver effective site inductions for building services work",
              "Plan and conduct toolbox talks for electrical teams",
              "Prepare compliant RAMS for building services activities",
              "Apply F10 notification requirements correctly"
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

        {/* Section 1: CDM 2015 Dutyholders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CDM 2015 Dutyholders and Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Construction (Design and Management) Regulations 2015 establish a framework of dutyholders
              with specific health and safety responsibilities throughout the project lifecycle. Understanding
              these roles is essential for building services contractors working on construction projects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key CDM 2015 Dutyholders:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Client:</strong> Makes suitable arrangements for managing the project and ensures dutyholders are appointed</li>
                <li className="pl-1"><strong>Principal designer:</strong> Plans, manages and coordinates health and safety during pre-construction phase</li>
                <li className="pl-1"><strong>Principal contractor:</strong> Plans, manages and coordinates health and safety during construction phase</li>
                <li className="pl-1"><strong>Designers:</strong> Eliminate, reduce or control foreseeable risks through design decisions</li>
                <li className="pl-1"><strong>Contractors:</strong> Plan, manage and monitor their own work and workers</li>
                <li className="pl-1"><strong>Workers:</strong> Cooperate with others and report unsafe conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Principal Contractor Duties (Key for Site Compliance)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Practical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prepare construction phase plan</td>
                      <td className="border border-white/10 px-3 py-2">Document site rules, emergency procedures, high-risk work controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Organise cooperation between contractors</td>
                      <td className="border border-white/10 px-3 py-2">Coordination meetings, shared access arrangements, sequencing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ensure site induction provided</td>
                      <td className="border border-white/10 px-3 py-2">All workers inducted before starting work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prevent unauthorised access</td>
                      <td className="border border-white/10 px-3 py-2">Site security, fencing, sign-in procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Provide welfare facilities</td>
                      <td className="border border-white/10 px-3 py-2">Toilets, washing, rest areas, drinking water</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Consult and engage workers</td>
                      <td className="border border-white/10 px-3 py-2">Toolbox talks, safety committees, feedback mechanisms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">F10 Notification Requirements</p>
              <p className="text-sm text-white mb-2">An F10 notification must be submitted to the HSE <strong>before construction begins</strong> when:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Work will last longer than 30 working days AND have more than 20 workers at any one time, OR</li>
                <li className="pl-1">Work will exceed 500 person-days</li>
              </ul>
              <p className="text-sm text-white/70 mt-2">The F10 must be displayed prominently on site and contains project details, client information, and dutyholder appointments.</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services context:</strong> As a subcontractor, you are classified as a 'contractor' under CDM 2015 and must comply with the principal contractor's site rules and construction phase plan.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Construction Phase Plan */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Construction Phase Plan Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The construction phase plan is the cornerstone document for site health and safety management.
              It must be prepared by the principal contractor before the construction phase begins and
              developed throughout the project as circumstances change.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Management Arrangements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Project description and scope</li>
                  <li className="pl-1">Management structure and responsibilities</li>
                  <li className="pl-1">Communication arrangements</li>
                  <li className="pl-1">Monitoring and review procedures</li>
                  <li className="pl-1">Training and competence requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site Rules and Procedures</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Site access and security</li>
                  <li className="pl-1">Emergency procedures</li>
                  <li className="pl-1">First aid arrangements</li>
                  <li className="pl-1">Welfare facilities</li>
                  <li className="pl-1">PPE requirements</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schedule 3 High-Risk Activities</p>
              <p className="text-sm text-white mb-2">The construction phase plan must include specific arrangements for controlling these high-risk activities:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work at height</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray installation, lighting, ceiling voids</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work with asbestos</td>
                      <td className="border border-white/10 px-3 py-2">Refurbishment work in older buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confined spaces</td>
                      <td className="border border-white/10 px-3 py-2">Service ducts, risers, plant rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Excavation work</td>
                      <td className="border border-white/10 px-3 py-2">Underground cable installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work near live services</td>
                      <td className="border border-white/10 px-3 py-2">Alterations to existing electrical systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work involving explosives</td>
                      <td className="border border-white/10 px-3 py-2">Cartridge-operated fixing tools</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Phase Plan Review Triggers</p>
              <p className="text-sm text-white mb-2">The plan must be reviewed and updated when:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">New contractors join the project</li>
                <li className="pl-1">Work activities or sequences change</li>
                <li className="pl-1">Incidents, near-misses or complaints occur</li>
                <li className="pl-1">Design changes affect construction methods</li>
                <li className="pl-1">Site conditions change (e.g., weather, ground conditions)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always request a copy of the construction phase plan before starting work on any site. Review it to understand site-specific requirements and how your work interfaces with other trades.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Site Inductions and Toolbox Talks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Site Inductions and Toolbox Talks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Site inductions and toolbox talks are essential communication tools that ensure workers
              understand site-specific hazards and safe working procedures. They form a critical part
              of the principal contractor's duty to provide information and training.
            </p>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Site Induction - Essential Content</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Site overview and current activities</li>
                  <li className="pl-1">Emergency procedures and muster points</li>
                  <li className="pl-1">First aid locations and arrangements</li>
                  <li className="pl-1">Site-specific hazards and controls</li>
                  <li className="pl-1">Traffic management and pedestrian routes</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">PPE requirements</li>
                  <li className="pl-1">Welfare facilities location</li>
                  <li className="pl-1">Permit-to-work systems</li>
                  <li className="pl-1">Reporting procedures (incidents, hazards)</li>
                  <li className="pl-1">Working hours and access restrictions</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Toolbox Talks - Delivery Best Practice</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Guidance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duration</td>
                      <td className="border border-white/10 px-3 py-2">5-15 minutes - focused and concise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">Weekly minimum, plus when hazards change</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Topic selection</td>
                      <td className="border border-white/10 px-3 py-2">Relevant to current work, recent incidents, seasonal risks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Delivery style</td>
                      <td className="border border-white/10 px-3 py-2">Interactive - ask questions, encourage discussion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation</td>
                      <td className="border border-white/10 px-3 py-2">Record topic, date, attendees (signatures)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Toolbox Talk Topics for Building Services</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Electrical Safety</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Isolation procedures</li>
                    <li>Safe use of test equipment</li>
                    <li>Cable damage prevention</li>
                    <li>Temporary supplies</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Working at Height</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Ladder safety</li>
                    <li>MEWP operation</li>
                    <li>Scaffold use</li>
                    <li>Edge protection</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">General Site Safety</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Manual handling</li>
                    <li>Housekeeping</li>
                    <li>Fire prevention</li>
                    <li>PPE care and use</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Documentation tip:</strong> Keep attendance records for all toolbox talks. These demonstrate due diligence and are valuable evidence if incidents occur. Many sites use digital sign-in systems for efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: RAMS Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            RAMS Process and Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Risk Assessments and Method Statements (RAMS) are the foundation of safe working on construction
              sites. They translate general safety requirements into specific, actionable control measures
              for individual work activities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RAMS Components</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Risk Assessment</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Identify hazards associated with the activity</li>
                    <li className="pl-1">Assess who might be harmed and how</li>
                    <li className="pl-1">Evaluate risk level (severity x likelihood)</li>
                    <li className="pl-1">Specify control measures (hierarchy of control)</li>
                    <li className="pl-1">Document residual risk after controls</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Method Statement</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Step-by-step work procedure</li>
                    <li className="pl-1">Sequence of operations</li>
                    <li className="pl-1">Equipment and materials required</li>
                    <li className="pl-1">Personnel and competence requirements</li>
                    <li className="pl-1">Interface with other trades</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RAMS Workflow</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-white">
                <div className="p-2 rounded bg-elec-yellow/20 text-center flex-1 w-full sm:w-auto">1. Prepare RAMS</div>
                <span className="hidden sm:block">&rarr;</span>
                <span className="block sm:hidden text-center w-full">&darr;</span>
                <div className="p-2 rounded bg-elec-yellow/20 text-center flex-1 w-full sm:w-auto">2. Submit to PC</div>
                <span className="hidden sm:block">&rarr;</span>
                <span className="block sm:hidden text-center w-full">&darr;</span>
                <div className="p-2 rounded bg-elec-yellow/20 text-center flex-1 w-full sm:w-auto">3. Approval/Review</div>
                <span className="hidden sm:block">&rarr;</span>
                <span className="block sm:hidden text-center w-full">&darr;</span>
                <div className="p-2 rounded bg-elec-yellow/20 text-center flex-1 w-full sm:w-auto">4. Brief Workers</div>
                <span className="hidden sm:block">&rarr;</span>
                <span className="block sm:hidden text-center w-full">&darr;</span>
                <div className="p-2 rounded bg-elec-yellow/20 text-center flex-1 w-full sm:w-auto">5. Execute Work</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services RAMS Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Hazards</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Critical Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable installation in ceiling void</td>
                      <td className="border border-white/10 px-3 py-2">Falls, existing services, dust</td>
                      <td className="border border-white/10 px-3 py-2">Tower scaffold, service detection, RPE</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board installation</td>
                      <td className="border border-white/10 px-3 py-2">Electrical contact, manual handling</td>
                      <td className="border border-white/10 px-3 py-2">Isolation, team lift, insulated tools</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External containment installation</td>
                      <td className="border border-white/10 px-3 py-2">Work at height, weather, traffic</td>
                      <td className="border border-white/10 px-3 py-2">MEWP, hi-vis, traffic management</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Testing and commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Electrical shock, arc flash</td>
                      <td className="border border-white/10 px-3 py-2">Permit to work, competent person, PPE</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm installation</td>
                      <td className="border border-white/10 px-3 py-2">Work at height, dust activation</td>
                      <td className="border border-white/10 px-3 py-2">Step ladders, detector covers, notification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common RAMS Deficiencies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic content:</strong> Copy-paste documents that don't reflect actual site conditions</li>
                <li className="pl-1"><strong>Missing signatures:</strong> Workers not briefed or signing before work</li>
                <li className="pl-1"><strong>No review dates:</strong> Outdated RAMS still in use after conditions change</li>
                <li className="pl-1"><strong>Inadequate controls:</strong> Relying on PPE when elimination or engineering controls are possible</li>
                <li className="pl-1"><strong>Poor communication:</strong> RAMS not available at the work face</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal requirement:</strong> RAMS must be task-specific and site-specific. Generic documents are not compliant and provide no legal protection if incidents occur.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Scenarios</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 1: Arriving at a New Site</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> You are starting electrical first fix on a new-build office block. What CDM compliance steps must you complete?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Required Steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Complete site induction delivered by principal contractor</li>
                  <li>Review construction phase plan - understand site rules and emergency procedures</li>
                  <li>Submit your company RAMS to principal contractor for approval</li>
                  <li>Attend any pre-start meetings to coordinate with other trades</li>
                  <li>Check F10 notification is displayed (if applicable)</li>
                  <li>Brief your team on site-specific requirements</li>
                </ol>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 2: Delivering a Toolbox Talk</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> Your team will be installing cable tray at 4m height tomorrow. Prepare a toolbox talk outline.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Toolbox Talk Structure:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Topic:</strong> Safe working at height - cable tray installation</li>
                  <li><strong>Duration:</strong> 10 minutes</li>
                  <li><strong>Key points:</strong> Tower scaffold erection/inspection, tool lanyards, exclusion zone below, emergency descent</li>
                  <li><strong>Discussion questions:</strong> "What would you do if you noticed damaged scaffold boards?"</li>
                  <li><strong>Record:</strong> Date, topic, attendees with signatures</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 3: RAMS Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> You need to isolate and modify an existing distribution board in an occupied office. Key RAMS considerations?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">RAMS Must Address:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Isolation:</strong> Permit to work, lock-off procedures, proving dead</li>
                  <li><strong>Existing services:</strong> Survey for unknown cables, asbestos check</li>
                  <li><strong>Occupied building:</strong> Coordination with building management, affected areas notification</li>
                  <li><strong>Sequence:</strong> Step-by-step isolation, modification, re-energisation</li>
                  <li><strong>Emergency:</strong> First aid, fire procedures, contact numbers</li>
                  <li><strong>Competence:</strong> Qualified electricians only, specific training requirements</li>
                </ul>
              </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Site Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Site induction completed and recorded</li>
                <li className="pl-1">Copy of construction phase plan reviewed</li>
                <li className="pl-1">RAMS submitted and approved by principal contractor</li>
                <li className="pl-1">Workers briefed on RAMS content</li>
                <li className="pl-1">Toolbox talk schedule established</li>
                <li className="pl-1">Emergency procedures understood by all team members</li>
                <li className="pl-1">PPE requirements checked and compliant</li>
                <li className="pl-1">Permit systems understood (if applicable)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key CDM 2015 Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">F10 threshold: <strong>30 days + 20 workers OR 500 person-days</strong></li>
                <li className="pl-1">Toolbox talk frequency: <strong>Weekly minimum</strong></li>
                <li className="pl-1">RAMS submission: <strong>Before activity starts</strong></li>
                <li className="pl-1">Construction phase plan: <strong>Before construction phase begins</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting work before induction</strong> - always complete before any work</li>
                <li className="pl-1"><strong>Generic RAMS</strong> - must be site and task specific</li>
                <li className="pl-1"><strong>Missing toolbox talk records</strong> - no record means no proof</li>
                <li className="pl-1"><strong>Ignoring the construction phase plan</strong> - it's a legal document</li>
                <li className="pl-1"><strong>Not reporting near-misses</strong> - valuable prevention data lost</li>
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
                <p className="font-medium text-white mb-1">CDM 2015 Dutyholders</p>
                <ul className="space-y-0.5">
                  <li>Client - makes arrangements, appoints dutyholders</li>
                  <li>Principal designer - pre-construction H&S</li>
                  <li>Principal contractor - construction phase H&S</li>
                  <li>Contractors - manage own work and workers</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documents</p>
                <ul className="space-y-0.5">
                  <li>Construction phase plan - site rules, procedures</li>
                  <li>F10 notification - HSE project notification</li>
                  <li>RAMS - activity-specific controls</li>
                  <li>Induction records - worker training evidence</li>
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
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section6_4;
