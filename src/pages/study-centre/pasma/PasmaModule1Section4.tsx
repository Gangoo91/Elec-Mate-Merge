import { ArrowLeft, Award, CheckCircle, AlertTriangle, Users, HardHat, ClipboardList, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-cdm-duty-holders",
    question: "How many duty holder roles are defined under CDM 2015?",
    options: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],
    correctIndex: 2,
    explanation: "CDM 2015 defines five duty holder roles: the client, the principal designer, the principal contractor, designers, and contractors. Each has specific duties that cannot be delegated to another role."
  },
  {
    id: "pasma-cdm-cpp",
    question: "Who is responsible for preparing the construction phase plan?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "The tower operative"
    ],
    correctIndex: 2,
    explanation: "Under CDM 2015, the principal contractor (or the contractor on a single-contractor project) is responsible for preparing the construction phase plan before the construction phase begins."
  },
  {
    id: "pasma-cdm-competence",
    question: "Under CDM 2015, what must a contractor ensure about workers carrying out tower work?",
    options: [
      "That they have at least 10 years' experience",
      "That they hold a university degree in construction",
      "That they have the skills, knowledge, training, and experience for the task",
      "That they are members of PASMA"
    ],
    correctIndex: 2,
    explanation: "CDM 2015 requires that contractors ensure their workers have the appropriate skills, knowledge, training, and experience for the work they carry out. For tower work, this typically means holding a valid PASMA card, but the regulation focuses on actual competence."
  }
];

const faqs = [
  {
    question: "Do the CDM Regulations apply to all tower work?",
    answer: "CDM 2015 applies to all construction projects in Great Britain. If the tower work forms part of a construction project (which includes building, alteration, fitting-out, installation, and maintenance of structures), then CDM duties apply. Even small projects with a single contractor have duties under CDM, though these are reduced compared to projects with multiple contractors."
  },
  {
    question: "Who is the 'client' under CDM 2015?",
    answer: "The client is the person or organisation for whom the construction project is being carried out. This could be a building owner, a facilities manager, a local authority, or any other party who commissions the work. The client has important duties including appointing a principal designer and principal contractor on projects with more than one contractor, and ensuring suitable arrangements are in place for managing the project."
  },
  {
    question: "Does CDM 2015 require a construction phase plan for every project?",
    answer: "Yes. Every construction project, regardless of size, requires a construction phase plan. On projects with only one contractor, that contractor must prepare the plan. On projects with more than one contractor, the principal contractor is responsible. The plan must be in place before the construction phase begins and must be proportionate to the scale and complexity of the project."
  },
  {
    question: "What CDM duties does a tower operative have?",
    answer: "As a worker under CDM 2015, a tower operative must co-operate with the principal contractor and other duty holders, report any health and safety concerns, comply with site rules and the construction phase plan, not interfere with or misuse safety provisions, and inform the site management of any situation that could present a serious and imminent danger."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What year were the current CDM Regulations introduced?",
    options: ["2007", "2010", "2015", "2020"],
    correctAnswer: 2,
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM 2015) came into force on 6 April 2015, replacing the CDM 2007 Regulations."
  },
  {
    id: 2,
    question: "Which of the following is NOT one of the five CDM duty holder roles?",
    options: [
      "Client",
      "Principal contractor",
      "Health and safety inspector",
      "Designer"
    ],
    correctAnswer: 2,
    explanation: "The five CDM duty holders are: client, principal designer, principal contractor, designer, and contractor. An HSE inspector is not a CDM duty holder — they are the enforcement body."
  },
  {
    id: 3,
    question: "On a project with more than one contractor, who must the client appoint?",
    options: [
      "A safety officer and a first aider",
      "A principal designer and a principal contractor",
      "A site manager and a crane operator",
      "A CDM coordinator and a planning supervisor"
    ],
    correctAnswer: 1,
    explanation: "Where a project involves more than one contractor, the client must appoint a principal designer and a principal contractor. These roles carry specific duties for co-ordinating health and safety across the project."
  },
  {
    id: 4,
    question: "Who is responsible for providing pre-construction information?",
    options: [
      "The principal contractor",
      "The designer",
      "The client",
      "The tower manufacturer"
    ],
    correctAnswer: 2,
    explanation: "The client must provide pre-construction information to every designer and contractor appointed to the project. This includes information about existing structures, hazards, services, and any site-specific constraints."
  },
  {
    id: 5,
    question: "What must the construction phase plan include in relation to tower work?",
    options: [
      "Only the tower manufacturer's contact details",
      "Arrangements for managing health and safety risks including tower assembly, use, and dismantling",
      "Only a list of PASMA card numbers",
      "A copy of the building's planning permission"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan must set out the arrangements for managing health and safety risks during the construction phase. For tower work, this includes how the tower will be assembled, used, inspected, and dismantled safely."
  },
  {
    id: 6,
    question: "A contractor is installing a fire alarm system and using a mobile tower for access. Under CDM 2015, this contractor must:",
    options: [
      "Only follow the tower manufacturer's instructions",
      "Plan, manage, and monitor their work to ensure it is carried out safely",
      "Wait for the HSE to approve their method statement",
      "Only comply with CDM if the project lasts more than 30 days"
    ],
    correctAnswer: 1,
    explanation: "Every contractor under CDM 2015 must plan, manage, and monitor the work under their control to ensure it is carried out without risks to health and safety. This applies regardless of project duration."
  },
  {
    id: 7,
    question: "What is the purpose of pre-construction information under CDM 2015?",
    options: [
      "To allow the client to claim insurance",
      "To inform designers and contractors of existing risks and constraints before work begins",
      "To satisfy planning permission requirements",
      "To enable the HSE to track all construction projects"
    ],
    correctAnswer: 1,
    explanation: "Pre-construction information helps designers and contractors understand the existing conditions, hazards, and constraints on a site so they can plan their work safely. For tower work, this might include floor loading limits, overhead services, or restricted access areas."
  },
  {
    id: 8,
    question: "Under CDM 2015, what level of supervision must a contractor provide for tower work?",
    options: [
      "No supervision is required if operatives hold PASMA cards",
      "Supervision must be proportionate to the risk and the competence of workers",
      "Only a principal contractor can supervise tower work",
      "Supervision is only needed for towers above 8 metres"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 requires that the degree of supervision is proportionate to the risk involved and the competence of the workers. Even experienced PASMA-trained operatives require appropriate supervision, though less than trainees or workers new to the site."
  }
];

export default function PasmaModule1Section4() {
  useSEO({
    title: "CDM 2015 & Duty Holders | PASMA Module 1.4",
    description: "Construction (Design and Management) Regulations 2015, the five CDM duty holders, construction phase plan, pre-construction information, worker engagement, and practical scenarios for tower work.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Award className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CDM 2015 &amp; Duty Holders
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The Construction (Design and Management) Regulations 2015, the five duty holder roles, and how CDM applies to mobile tower work on construction projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>CDM 2015:</strong> Applies to all construction projects in GB</li>
              <li><strong>5 Duty Holders:</strong> Client, PD, PC, Designer, Contractor</li>
              <li><strong>CPP:</strong> Required before construction phase begins</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Know:</strong> Your duty holder role and responsibilities</li>
              <li><strong>Follow:</strong> Construction phase plan and site rules</li>
              <li><strong>Report:</strong> Any hazards or concerns immediately</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and scope of CDM 2015",
              "Name and describe the five CDM duty holder roles",
              "Understand how CDM applies to mobile tower work",
              "Describe what a construction phase plan must contain",
              "Explain what pre-construction information the client must provide",
              "Apply CDM principles to practical tower work scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Are the CDM Regulations 2015? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are the CDM Regulations 2015?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction (Design and Management) Regulations 2015 (CDM 2015) came into force on
                6 April 2015 and apply to all construction projects in Great Britain. They replaced the
                CDM 2007 Regulations and simplified the duty holder structure while extending duties to
                all projects, regardless of size.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Principle:</strong> CDM 2015 aims to ensure
                  that health and safety is considered throughout the life of a construction project &mdash;
                  from initial design through to completion and beyond. The Regulations require that all
                  parties involved in a project co-operate and co-ordinate their work to manage risks
                  effectively.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">CDM 2015 Applies To:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All construction projects in England, Wales, and Scotland</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>New build, demolition, alteration, fitting-out, and refurbishment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Installation of services (electrical, mechanical, plumbing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maintenance and repair work on structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Site preparation and clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Any work involving mobile scaffold towers on a construction project</span>
                  </li>
                </ul>
              </div>

              <p>
                The Regulations apply to <strong>all construction projects</strong>, from a single
                tradesperson carrying out a minor repair to major infrastructure developments. The duties
                scale with the size and complexity of the project, but no project is exempt.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Five CDM Duty Holders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Five CDM Duty Holders
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 defines five duty holder roles. Each role carries specific legal duties that
                cannot be transferred to another party. On smaller projects, one person or organisation
                may fulfil multiple roles, but the duties for each role still apply.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <p className="text-sm font-medium text-blue-400">Client</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The person or organisation for whom the project is carried out. Must make suitable
                    arrangements for managing the project, ensure sufficient time and resources are
                    allocated, provide pre-construction information, and appoint a principal designer
                    and principal contractor where there is more than one contractor.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">2</span>
                    <p className="text-sm font-medium text-purple-400">Principal Designer</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Appointed by the client on multi-contractor projects. Plans, manages, monitors, and
                    co-ordinates the pre-construction phase. Identifies, eliminates, and controls foreseeable
                    risks. Ensures designers comply with their CDM duties. Prepares the health and safety
                    file.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">3</span>
                    <p className="text-sm font-medium text-green-400">Principal Contractor</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Appointed by the client on multi-contractor projects. Plans, manages, monitors, and
                    co-ordinates the construction phase. Prepares the construction phase plan. Ensures
                    co-operation between contractors. Organises site inductions. Ensures welfare facilities
                    are provided.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">4</span>
                    <p className="text-sm font-medium text-amber-400">Designer</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Anyone who prepares or modifies a design for a construction project. Must eliminate
                    foreseeable risks where possible. Must reduce risks that cannot be eliminated. Must
                    provide information about remaining risks to those who need it.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">5</span>
                    <p className="text-sm font-medium text-red-400">Contractor</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Anyone who carries out or manages construction work. Must plan, manage, and monitor
                    their own work. Must ensure workers have the skills, knowledge, training, and experience
                    needed. Must provide appropriate supervision and instruction. Must not start work unless
                    welfare facilities are available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: How CDM Applies to Tower Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How CDM Applies to Tower Work
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile tower work on a construction project triggers CDM duties for everyone involved.
                Understanding when tower use constitutes "construction work" and what duties apply is
                essential for compliance.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">When Does Tower Use Become Construction Work?</strong> Under
                  CDM 2015, "construction work" has a broad definition that includes building, alteration,
                  fitting-out, commissioning, renovation, repair, maintenance, decoration, and demolition.
                  If you are using a mobile tower to carry out any of these activities, CDM applies.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">CDM Requirements for Tower Work:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Planning:</strong> Tower work must be planned as part of the overall project, not treated as an afterthought. The construction phase plan should address tower selection, assembly, use, and dismantling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Competence:</strong> All persons assembling, inspecting, or working from towers must be demonstrably competent. PASMA training is the recognised route for tower operatives.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Co-ordination:</strong> If multiple contractors are on site, tower work must be co-ordinated with other activities to prevent clashes (e.g. towers blocking emergency routes, crane operations conflicting with tower positions).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Information:</strong> The client must provide relevant pre-construction information, such as floor loading limits, overhead service locations, and restricted areas.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Misconception</p>
                </div>
                <p className="text-sm text-white/80">
                  CDM 2015 does not only apply to large projects or projects lasting more than 30 days.
                  Every construction project has CDM duties, even a one-day job with a single contractor.
                  The 30-day / 500 person-day threshold only determines whether the project must be
                  notified to the HSE, not whether CDM applies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Construction Phase Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Construction Phase Plan
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction phase plan (CPP) is a key CDM document that sets out how health and safety
                risks will be managed during the construction phase. It must be prepared before construction
                work begins and must be proportionate to the scale and complexity of the project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">What the CPP Must Contain</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Project description:</strong> What work is being done, where, and over what time frame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Management arrangements:</strong> Who is responsible for what, lines of communication, co-ordination procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Specific risk arrangements:</strong> How identified risks will be managed, including work at height and tower use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Welfare provisions:</strong> Location and adequacy of toilets, washing facilities, rest areas, drinking water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Emergency procedures:</strong> First aid, fire, rescue from height, evacuation routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Site rules:</strong> Access restrictions, PPE requirements, permit-to-work procedures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Tower-Specific CPP Elements:</strong> The plan
                  should specifically address how mobile towers will be selected, who will assemble and
                  dismantle them, how inspections will be carried out and recorded, maximum heights for
                  the site, any ground condition restrictions, overhead hazard exclusion zones, and the
                  rescue plan for a person injured on the tower platform.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Good CPP Practice</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Prepared before work starts on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Specific to the project, not a generic template</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Regularly reviewed and updated as work progresses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Available to all workers on site</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Poor CPP Practice</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Written after work has already started</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>A generic copy-paste document from another project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Never reviewed or updated during the project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Kept in an office and not shared with the workforce</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Pre-Construction Information */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Pre-Construction Information
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The client has a duty under CDM 2015 to provide pre-construction information (PCI) to
                every designer and contractor appointed to the project. This information allows those
                planning the work to understand existing risks and constraints before work begins.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">What the Client Must Provide</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Existing services:</strong> Location of electrical cables, gas pipes, water mains, and other services that could be affected by tower positioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Structural information:</strong> Floor loading capacities, fragile surfaces, asbestos-containing materials, structural condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Access arrangements:</strong> How the site can be accessed, any restrictions on vehicle movements, loading/unloading areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Environmental hazards:</strong> Contaminated ground, unstable areas, confined spaces, proximity to railways or highways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Previous health and safety information:</strong> Records from previous construction work, known hazards, accident history</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Relevance to Tower Work:</strong> Pre-construction
                  information is critical for tower work planning. Floor loading limits determine whether
                  a tower can be used safely indoors. Overhead service locations identify where towers must
                  not be positioned. Access restrictions affect how tower components will be transported to
                  the work area. Without this information, you cannot carry out an adequate risk assessment.
                </p>
              </div>

              <p>
                If the client fails to provide adequate pre-construction information, contractors should
                request it in writing. Do not proceed with tower work if you lack critical information
                about the site conditions &mdash; this is a foreseeable risk that must be managed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Worker Engagement & Competence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Worker Engagement &amp; Competence
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 places significant emphasis on worker engagement and competence. The Regulations
                require that workers are consulted, competent, and properly supervised throughout the
                construction phase.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Consultation Requirements</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Before work starts:</strong> Workers must be consulted on matters affecting their health and safety, including the methods of work and equipment to be used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Site induction:</strong> All workers must receive a site-specific induction covering site rules, emergency procedures, welfare facilities, and specific hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Ongoing engagement:</strong> Workers must be encouraged to report hazards, near misses, and suggestions for improvement without fear of reprisal</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Competence Assessment</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>CDM 2015 requires that workers have the appropriate <strong className="text-white">skills, knowledge, training, and experience</strong> for the tasks they carry out. For tower work, this means:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Valid PASMA Towers for Users card for those assembling/dismantling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Manufacturer-specific familiarisation for the tower system being used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Understanding of the risk assessment and method statement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Knowledge of the rescue plan and emergency procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Awareness of site-specific hazards identified in the CPP</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Supervision Levels:</strong> The level of
                  supervision must be proportionate to the risk and the worker&rsquo;s competence. A
                  newly qualified PASMA operative working on a complex tower configuration needs closer
                  supervision than an experienced operative carrying out a straightforward assembly.
                  The contractor must determine and provide the appropriate level.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Practical CDM Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Practical CDM Scenarios
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding CDM is best achieved through practical examples. Here are three common
                scenarios involving mobile towers, showing how CDM duties apply in each case.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Scenario 1: Fire Alarm Installation</p>
                <p className="text-sm text-white/80 mb-2">
                  An electrical contractor is installing a fire alarm system in a new office building.
                  They need a mobile tower to reach ceiling-mounted detectors and sounders at 4 metres.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded mt-2">
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Client:</strong> Building owner must provide PCI (ceiling heights, services, floor loading)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">PC:</strong> Co-ordinates tower work with other trades, includes in CPP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Contractor:</strong> Plans tower use, ensures operatives hold PASMA cards, provides supervision</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Worker:</strong> Assembles tower per manufacturer&rsquo;s instructions, carries out pre-use inspection</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Scenario 2: Office Painting</p>
                <p className="text-sm text-white/80 mb-2">
                  A single painting contractor is redecorating offices in an occupied building. They use
                  a mobile tower for walls above 2.5 metres. This is a single-contractor project.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded mt-2">
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Client:</strong> Still has CDM duties &mdash; must provide relevant information about the building</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">No PC/PD needed:</strong> Single contractor takes on contractor duties directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Contractor:</strong> Prepares CPP (can be simple for a small project), manages tower work safely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Key consideration:</strong> Occupied building means managing risks to non-construction workers (HSWA Section 3)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Scenario 3: Lighting Maintenance</p>
                <p className="text-sm text-white/80 mb-2">
                  A facilities management company is maintaining emergency lighting in a warehouse.
                  Multiple contractors are on site carrying out different maintenance tasks simultaneously.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded mt-2">
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Client:</strong> FM company must appoint PC and PD (multiple contractors)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">PC:</strong> Co-ordinates all contractors, ensures tower work does not conflict with other activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Contractor:</strong> Selects appropriate tower for warehouse (check floor loading, racking clearance)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Key consideration:</strong> Warehouse may have forklift traffic requiring exclusion zones around the tower</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Takeaway:</strong> CDM 2015 is not just
                  paperwork &mdash; it is a framework for ensuring that every person on a construction
                  project understands their role, the risks, and the controls in place. For tower work,
                  this means proper planning, competent personnel, clear co-ordination, and documented
                  procedures every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PASMA Code of Practice
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-2">
              Next: Module 2 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}