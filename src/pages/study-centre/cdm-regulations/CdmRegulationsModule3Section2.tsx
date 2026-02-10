import { ArrowLeft, ClipboardList, CheckCircle, AlertTriangle, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cpp-responsibility",
    question: "Who is responsible for preparing the construction phase plan?",
    options: [
      "The client",
      "The principal contractor (or the sole contractor on single-contractor projects)",
      "The principal designer",
      "The Health and Safety Executive"
    ],
    correctIndex: 1,
    explanation: "Under CDM 2015 Regulation 12, the principal contractor must draw up the construction phase plan before the construction phase begins. On projects with only one contractor (and therefore no principal contractor appointment), that sole contractor must prepare the plan. The plan must set out the health and safety arrangements, site rules, and specific measures for managing the construction phase."
  },
  {
    id: "cpp-timing",
    question: "When must the construction phase plan be in place?",
    options: [
      "Within the first week of construction starting",
      "Before the construction phase begins",
      "Only after the first contractor arrives on site",
      "It is only required for notifiable projects"
    ],
    correctIndex: 1,
    explanation: "The construction phase plan must be prepared before the construction phase begins. This is a firm legal requirement under CDM 2015 — construction work must not start until a suitable plan is in place. The plan does not need to be complete in every detail on day one, but it must contain sufficient information to manage the initial phases safely, and it must be developed and updated as the project progresses."
  },
  {
    id: "cpp-proportionate",
    question: "What does it mean for a construction phase plan to be 'proportionate'?",
    options: [
      "It must be at least 50 pages long for every project",
      "The level of detail should match the size, complexity, and risk of the project",
      "It only applies to projects lasting more than 30 days",
      "It must be written in a standard HSE template format"
    ],
    correctIndex: 1,
    explanation: "Proportionate means the plan's level of detail should match the size, complexity, and risk profile of the project. A small, straightforward job like replacing a consumer unit might only need a few pages covering the key risks and arrangements. A large multi-phase commercial project with many contractors will need a detailed plan covering complex coordination, multiple risk procedures, and extensive management arrangements. The goal is to manage real risks, not to generate paperwork for its own sake."
  }
];

const faqs = [
  {
    question: "Does every construction project need a construction phase plan?",
    answer: "Yes. Under CDM 2015, every construction project requires a construction phase plan — regardless of size, duration, or whether the project is notifiable. Even a single-contractor domestic project needs a plan, although it can be very simple. The plan must be proportionate to the risks and complexity of the work. For a small job, this might be a single page or a marked-up method statement. For large, complex projects, the plan will be a substantial document covering detailed management arrangements, site rules, and specific risk procedures."
  },
  {
    question: "Can the construction phase plan be a verbal arrangement rather than a written document?",
    answer: "No. The construction phase plan must be a written document. While CDM 2015 does not prescribe a specific format, the plan must be recorded so that it can be communicated to everyone on site, reviewed, and updated as the project develops. A verbal agreement is not sufficient because it cannot be reliably communicated to all workers, checked for adequacy, or used as a reference during the construction phase. The plan can be in any written format — paper, digital document, or project management system — as long as it is accessible to those who need it."
  },
  {
    question: "What happens if a new significant risk is identified during the construction phase?",
    answer: "The construction phase plan must be updated to address the new risk. The CPP is a living document, and the principal contractor has a duty to review and revise it whenever circumstances change. If a new significant risk is identified — for example, unexpected asbestos is discovered during demolition, or ground conditions change during excavation — the plan must be updated to include the specific procedures, controls, and emergency arrangements needed to manage that risk. All relevant workers and contractors must be informed of the changes."
  },
  {
    question: "Who should have access to the construction phase plan on site?",
    answer: "The construction phase plan must be accessible to everyone who needs it. This includes all contractors and workers on site, the client, the principal designer, and any other duty holders. In practice, the plan (or the relevant parts of it) should be available on site at all times — either as a physical document in the site office or welfare facilities, or through digital access. Workers should be briefed on the key elements of the plan that affect their work, particularly site rules, emergency procedures, and specific risk procedures relevant to their activities."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under which CDM 2015 regulation is the construction phase plan required?",
    options: [
      "Regulation 4",
      "Regulation 8",
      "Regulation 12",
      "Regulation 15"
    ],
    correctAnswer: 2,
    explanation: "Regulation 12 of CDM 2015 sets out the requirement for the construction phase plan. It specifies that the principal contractor must draw up a construction phase plan (or arrange for it to be drawn up) before the construction phase begins. The regulation also specifies the minimum content requirements for the plan."
  },
  {
    id: 2,
    question: "Which of the following MUST be included in a construction phase plan under Regulation 12(2)?",
    options: [
      "A description of the project, management structure, and health and safety arrangements",
      "The client's budget and programme",
      "Architect's drawings and specifications",
      "A list of all subcontractor profit margins"
    ],
    correctAnswer: 0,
    explanation: "Regulation 12(2) requires the construction phase plan to include a description of the project, the management of the project (including the management structure and responsibilities), the arrangements for monitoring compliance, and the health and safety arrangements and site rules. The plan must cover how health and safety will be managed throughout the construction phase."
  },
  {
    id: 3,
    question: "On a project where there is only one contractor and no principal contractor has been appointed, who must prepare the construction phase plan?",
    options: [
      "The client must prepare it",
      "The sole contractor must prepare it",
      "The principal designer must prepare it",
      "No plan is required for single-contractor projects"
    ],
    correctAnswer: 1,
    explanation: "On single-contractor projects where no principal contractor has been appointed, the sole contractor takes on the responsibility for preparing the construction phase plan. CDM 2015 applies to all construction projects, regardless of size or the number of contractors. The plan can be simpler and more proportionate for a small project, but it must still exist before construction begins."
  },
  {
    id: 4,
    question: "Which of the following is NOT typically part of the management arrangements section of a CPP?",
    options: [
      "Project team details and communication procedures",
      "Health and safety consultation arrangements",
      "The interior decoration colour scheme",
      "Coordination arrangements between contractors"
    ],
    correctAnswer: 2,
    explanation: "The management arrangements section of a construction phase plan covers project team details, communication procedures, health and safety consultation arrangements, coordination arrangements between contractors, and monitoring procedures. Interior decoration colour schemes are design decisions, not health and safety management arrangements."
  },
  {
    id: 5,
    question: "What is the primary purpose of site rules within the construction phase plan?",
    options: [
      "To ensure the site looks tidy for client visits",
      "To set out the standards of behaviour and safety controls that everyone on site must follow",
      "To record the site's planning permission conditions",
      "To list the contractual obligations between the client and principal contractor"
    ],
    correctAnswer: 1,
    explanation: "Site rules set out the standards of behaviour and safety controls that everyone on site must follow. They typically cover access and egress, PPE requirements, permit-to-work systems, traffic management, housekeeping, welfare arrangements, and emergency procedures. Site rules ensure consistent health and safety standards across all contractors and workers on the project."
  },
  {
    id: 6,
    question: "Which of these activities would typically require a specific risk procedure in the CPP?",
    options: [
      "Ordering stationery for the site office",
      "Working at height, hot works, excavations, and confined space entry",
      "Scheduling progress meetings",
      "Selecting the site canteen menu"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan must include specific procedures for activities that carry particular risks. These typically include working at height, hot works, excavations, confined space entry, electrical work isolation, asbestos encounters, lifting operations, and any other high-risk activities identified in the risk assessment. Each procedure should set out how the activity will be managed safely, the controls required, and the competency standards for those carrying out the work."
  },
  {
    id: 7,
    question: "A small domestic rewiring project with one electrician working alone would require:",
    options: [
      "No construction phase plan at all",
      "A full 50-page construction phase plan",
      "A simple, proportionate construction phase plan covering the key risks",
      "Only a verbal briefing with the homeowner"
    ],
    correctAnswer: 2,
    explanation: "Even small projects require a construction phase plan, but the plan must be proportionate to the risks. A single-electrician domestic rewire would need a simple plan — perhaps a few pages or a marked-up method statement — covering the key risks (electrical isolation, working in confined spaces, asbestos awareness for older properties), emergency arrangements, and welfare provisions. The plan should focus on managing real risks, not generating unnecessary paperwork."
  },
  {
    id: 8,
    question: "What should trigger a review and update of the construction phase plan?",
    options: [
      "Only the end of the project",
      "A new contractor arriving on site, a change in project scope, or an incident occurring",
      "Reviews are only required monthly",
      "Only when the HSE requests an inspection"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan is a living document that must be reviewed and updated whenever circumstances change. Common triggers for review include: a new contractor mobilising to site (bringing new risks or interfaces), a significant change in project scope or programme, an incident, accident, or near miss, the discovery of an unexpected hazard (such as asbestos or contaminated ground), a change to the management structure, or feedback from workers or health and safety inspections."
  }
];

export default function CdmRegulationsModule3Section2() {
  useSEO({
    title: "Construction Phase Plan | CDM Regulations Module 3.2",
    description: "The construction phase plan under CDM 2015 Regulation 12: what it is, when it must be prepared, required content, site rules, specific risk procedures, proportionate approach, and review requirements.",
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
            <Link to="../cdm-regulations-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <ClipboardList className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Construction Phase Plan
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The essential document that sets out how health and safety will be managed during the
            construction phase &mdash; who prepares it, when it must be in place, what it must contain,
            and how it is kept up to date
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Regulation 12:</strong> Legal basis for the CPP</li>
              <li><strong>Who:</strong> Principal contractor (or sole contractor)</li>
              <li><strong>When:</strong> Before the construction phase begins</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Scope:</strong> Required for ALL construction projects</li>
              <li><strong>Living document:</strong> Must be updated throughout the project</li>
              <li><strong>Proportionate:</strong> Level of detail matches the project risk</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what the construction phase plan is and its legal basis under Regulation 12",
              "State when the CPP must be prepared and by whom",
              "Describe the required content of the CPP under Regulation 12(2)",
              "Outline the management arrangements that must be included",
              "Identify the typical site rules and specific risk procedures covered by the plan",
              "Understand the proportionate approach — matching plan complexity to project risk",
              "Explain when and why the CPP must be reviewed and updated",
              "Describe how version control and site accessibility support effective use of the plan"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is the Construction Phase Plan? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            What Is the Construction Phase Plan?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction phase plan (CPP) is the <strong>central document</strong> that sets out how
                health and safety will be managed during the construction phase of a project. It is required
                under <strong>Regulation 12 of the Construction (Design and Management) Regulations 2015</strong> (CDM 2015)
                and applies to <strong>every construction project</strong>, regardless of size.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Regulation 12 &mdash; Key Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  The <strong className="text-white">principal contractor</strong> must draw up a construction
                  phase plan, or arrange for it to be drawn up, <strong className="text-white">before the
                  construction phase begins</strong>. On projects with only one contractor (where no principal
                  contractor is appointed), the <strong className="text-white">sole contractor</strong> must
                  prepare the plan.
                </p>
              </div>

              <p>
                The CPP is not simply a risk assessment or method statement &mdash; it is a <strong>comprehensive
                management document</strong> that brings together all the health and safety arrangements for the
                project. It draws on information from the pre-construction information pack, the client&rsquo;s
                requirements, and the principal contractor&rsquo;s own assessment of the risks and management
                arrangements needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The CPP Must Address</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A <strong className="text-white">description of the project</strong> &mdash; what work is being carried out, where, and the key phases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The <strong className="text-white">management structure</strong> &mdash; who is responsible for what, and how the project will be coordinated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The <strong className="text-white">health and safety arrangements</strong> &mdash; how risks will be managed on a day-to-day basis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The <strong className="text-white">site rules</strong> &mdash; the standards everyone on site must follow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Specific risk procedures</strong> &mdash; how particular hazards (fire, working at height, confined spaces etc.) will be dealt with</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Important:</strong> The CPP is not a one-off document filed
                  away and forgotten. It is a <strong>living document</strong> that must be reviewed, revised,
                  and updated as the project progresses and circumstances change. Everyone working on the project
                  should have access to the relevant parts of the plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When Must It Be Prepared? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">02</span>
            When Must It Be Prepared?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The timing of the construction phase plan is critical. CDM 2015 requires that the CPP
                must be in place <strong>before the construction phase begins</strong>. This means
                no construction work should start until a suitable plan has been prepared.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Legal Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  Construction work <strong className="text-white">must not start</strong> until a construction
                  phase plan has been drawn up. Beginning construction without an adequate CPP is a breach of
                  CDM 2015 and can result in enforcement action by the HSE, including improvement or prohibition
                  notices and potential prosecution.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Proportionate from Day One</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The plan does <strong className="text-white">not need to be complete in every detail</strong> before work starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>It must contain <strong className="text-white">sufficient information to manage the initial phases safely</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>As the project develops, the plan must be <strong className="text-white">expanded and updated</strong> to cover subsequent phases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Each new phase of work should be covered <strong className="text-white">before it begins</strong></span>
                  </li>
                </ul>
              </div>

              <p>
                In practice, the principal contractor will start developing the CPP as soon as they are appointed,
                using the <strong>pre-construction information</strong> provided by the client and principal
                designer. The plan should be developed in consultation with the contractors who will carry out
                the work, as they will have detailed knowledge of the risks and controls associated with their
                specific activities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Timeline Summary</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">PC Appointed</p>
                      <p className="text-xs text-white/60">CPP development begins using pre-construction information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Before Construction Starts</p>
                      <p className="text-xs text-white/60">CPP must be in place with sufficient detail for the initial phase</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">During Construction</p>
                      <p className="text-xs text-white/60">CPP is developed, reviewed, and updated as the project progresses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Project Completion</p>
                      <p className="text-xs text-white/60">Relevant information is passed to the health and safety file</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: CPP Content */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">03</span>
            CPP Content &mdash; Regulation 12(2)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 12(2) sets out the minimum content that must be included in the construction
                phase plan. The plan must be <strong>tailored to the specific project</strong> &mdash;
                a generic, copy-and-paste document does not satisfy the legal requirements.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Required Content Under Regulation 12(2)</p>
                </div>
                <p className="text-sm text-white/80">
                  The construction phase plan must include sufficient detail to set out the
                  <strong className="text-white"> arrangements for securing health and safety</strong> during
                  the construction phase. As a minimum, it must address the following areas.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">1. Description of the Project</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The nature and scope of the work to be carried out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The site location, access arrangements, and surrounding environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The key phases of the project and anticipated programme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Existing site conditions and any known hazards (from pre-construction information)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">2. Management Structure</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The organisational structure for managing the project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Roles and responsibilities of all duty holders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How the project will be coordinated between multiple contractors</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">3. Health and Safety Arrangements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Site induction procedures for all workers and visitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Welfare arrangements (toilets, washing facilities, rest areas, drinking water)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>First aid arrangements and accident reporting procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency procedures (fire, evacuation, rescue)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">4. Site Rules</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The rules that apply to everyone on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>PPE requirements, access controls, and permit systems</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">5. Specific Risk Procedures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Procedures for managing fire risk, temporary works, lifting operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Working at height, confined spaces, excavations, hot works</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Any other activities requiring particular procedures identified in the risk assessment</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">6. Monitoring Arrangements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How compliance with health and safety arrangements will be monitored</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Inspection and audit procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How the plan will be reviewed and updated</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">No Generic Plans</p>
                </div>
                <p className="text-sm text-white/80">
                  A generic, &ldquo;one size fits all&rdquo; construction phase plan that is not tailored
                  to the specific project does <strong className="text-white">not satisfy the legal
                  requirements</strong>. The HSE will expect to see a plan that clearly relates to the
                  actual project, its specific risks, and the arrangements put in place to manage them.
                  Copy-and-paste plans are a common enforcement target.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Management Arrangements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">04</span>
            Management Arrangements
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The management arrangements section of the CPP sets out <strong>how the project team
                will work together</strong> to manage health and safety. This is not simply a list of
                names &mdash; it must describe the practical systems and processes that will be used
                to coordinate activities and ensure that health and safety is actively managed.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Project Team Details</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Names and contact details for: <strong className="text-white">client, principal designer, principal contractor, all contractors, and site managers</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Organisational chart showing <strong className="text-white">reporting lines and responsibilities</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Details of the <strong className="text-white">site health and safety adviser</strong> (if appointed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Named <strong className="text-white">first aiders and fire wardens</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Communication Procedures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How health and safety information will be <strong className="text-white">shared between contractors and workers</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Site <strong className="text-white">induction procedures</strong> &mdash; what will be covered and who will deliver them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Regular <strong className="text-white">toolbox talks and briefings</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Notice boards</strong> and information points on site</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Health and Safety Consultation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How workers will be <strong className="text-white">consulted on health and safety matters</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Arrangements for <strong className="text-white">safety representatives or safety committees</strong> (where applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How workers can <strong className="text-white">raise health and safety concerns</strong> without fear of reprisal</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Coordination Arrangements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How the work of <strong className="text-white">different contractors will be coordinated</strong> to prevent clashes and ensure safe interfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Permit-to-work systems</strong> for high-risk activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Weekly or daily <strong className="text-white">coordination meetings</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Monitoring Procedures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Planned <strong className="text-white">health and safety inspections</strong> (frequency, who will carry them out)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Audit arrangements</strong> for contractor compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Accident and incident investigation</strong> procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>How <strong className="text-white">lessons learned</strong> will be fed back into the plan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Site Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">05</span>
            Site Rules
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Site rules are the <strong>standards of behaviour and safety controls</strong> that
                everyone on site must follow. They ensure a consistent baseline of safety across all
                contractors and workers, regardless of their employer. The rules must be communicated
                to all workers during the site induction and enforced throughout the project.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Access and Egress</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Designated <strong className="text-white">entry and exit points</strong> for personnel and vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Sign-in and sign-out procedures</strong> for tracking who is on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Visitor management</strong> &mdash; escorts, inductions, and restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Restricted zones</strong> &mdash; areas requiring specific authorisation or permits</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">PPE Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Minimum PPE standards</strong> for all site areas (typically hard hat, hi-vis, safety boots)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Task-specific PPE</strong> requirements (eye protection, hearing protection, RPE, gloves)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">PPE zones</strong> &mdash; areas with enhanced PPE requirements</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Permit Systems</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Which activities require a <strong className="text-white">permit to work</strong> (hot works, confined spaces, electrical isolation, excavations)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The <strong className="text-white">permit process</strong> &mdash; who can issue, who can authorise, who holds the permit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Permit close-out</strong> procedures</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Traffic Management</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Separation of vehicles and pedestrians</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Speed limits, one-way systems, and designated routes</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Banksman/signaller</strong> requirements for reversing vehicles</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Housekeeping, Welfare &amp; Emergency Procedures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Housekeeping standards</strong> &mdash; keeping areas clean and clear, material storage, waste management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Welfare facilities</strong> &mdash; location and standards for toilets, washing, rest areas, drinking water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Emergency procedures</strong> &mdash; fire alarm, evacuation routes, assembly points, emergency contacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Smoking and alcohol/drugs policy</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">On Site:</strong> Site rules should be
                  <strong> clearly displayed</strong> in the site office, welfare facilities, and at the site
                  entrance. All workers must be briefed on the site rules during their induction before they
                  start work. The principal contractor is responsible for ensuring the rules are followed and
                  for taking action when they are breached.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Specific Risk Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">06</span>
            Specific Risk Procedures
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain construction activities carry <strong>particular risks</strong> that require
                specific, dedicated procedures within the construction phase plan. These procedures
                go beyond the general site rules and set out exactly how each high-risk activity will
                be managed, who is competent to carry it out, and what controls must be in place.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Working at Height</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Hierarchy of control: avoid &rarr; prevent &rarr; mitigate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Scaffolding, MEWP, and ladder use policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Edge protection requirements and roof work procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Competency requirements (PASMA, IPAF qualifications)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Hot Works</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Permit-to-work requirements for welding, cutting, grinding, brazing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fire watch procedures and post-work monitoring periods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fire extinguisher placement and combustible material clearance</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Excavations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Underground services identification (CAT and Genny, service plans)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Trench support and shoring requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Edge protection and barriers around open excavations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Daily inspection requirements by a competent person</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Confined Spaces</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Identification of confined spaces on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Permit-to-enter system and atmospheric monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Emergency rescue plan and standby person requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Competency and training requirements for entry personnel</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Electrical Work Isolation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Safe isolation procedures (lock-off, prove dead, post warning notices)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Permit-to-work for electrical work on live or previously live systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Competency requirements (qualified electricians, Electricity at Work Regulations 1989)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Asbestos Encounters</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Procedure for unexpected discovery of suspected asbestos-containing materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Stop work &rarr; evacuate &rarr; report &rarr; assess &rarr; specialist removal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Reference to the Refurbishment/Demolition Survey and asbestos register</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Real Procedures, Not Tick Boxes</p>
                </div>
                <p className="text-sm text-white/80">
                  Specific risk procedures must be <strong className="text-white">practical and actionable</strong>,
                  not generic statements copied from a template. Each procedure should clearly describe the
                  specific risks, the controls that will be applied, the competency standards required, and the
                  emergency arrangements. Workers carrying out these activities must be briefed on the procedure
                  before they start work and must confirm they understand and will follow it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Proportionate Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">07</span>
            Proportionate Approach
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important principles in CDM 2015 is that the construction phase plan must
                be <strong>proportionate</strong> to the size, complexity, and risk profile of the project.
                The goal is to manage real risks effectively &mdash; <strong>not to generate paperwork
                for its own sake</strong>.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">The Proportionality Principle</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Simple project = simple plan.</strong> A straightforward job
                  with low risk and a single contractor needs only a brief, focused plan covering the key
                  risks and arrangements. <strong className="text-white">Complex project = detailed plan.</strong> A
                  large project with multiple contractors, significant hazards, and complex coordination needs
                  a comprehensive plan with detailed procedures. The test is whether the plan
                  <strong className="text-white"> effectively manages the actual risks</strong>, not whether it
                  meets a minimum page count.
                </p>
              </div>

              {/* CPP Proportionality Scale Diagram */}
              <div className="bg-white/5 border border-blue-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-blue-400 mb-6 text-center">
                  CPP Proportionality Scale
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Small Project */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-sm font-bold text-green-400 mb-3 text-center">Small / Simple Project</p>
                    <div className="space-y-2 text-sm text-white/80">
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Single contractor (e.g., domestic rewire)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Low-medium risk activities</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Short duration project</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded p-3">
                      <p className="text-xs font-semibold text-green-300 mb-1">CPP Might Include:</p>
                      <ul className="text-xs text-white/70 space-y-0.5">
                        <li>&bull; 1&ndash;3 pages</li>
                        <li>&bull; Key risks and controls</li>
                        <li>&bull; Emergency contact details</li>
                        <li>&bull; Basic site rules</li>
                        <li>&bull; Welfare arrangements</li>
                      </ul>
                    </div>
                  </div>

                  {/* Large Project */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm font-bold text-blue-400 mb-3 text-center">Large / Complex Project</p>
                    <div className="space-y-2 text-sm text-white/80">
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Multiple contractors (e.g., new-build hospital)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>High-risk activities and complex interfaces</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Long duration, phased programme</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded p-3">
                      <p className="text-xs font-semibold text-blue-300 mb-1">CPP Might Include:</p>
                      <ul className="text-xs text-white/70 space-y-0.5">
                        <li>&bull; 20&ndash;50+ pages with appendices</li>
                        <li>&bull; Detailed management structure &amp; org chart</li>
                        <li>&bull; Full coordination procedures</li>
                        <li>&bull; Multiple permit-to-work systems</li>
                        <li>&bull; Specific risk procedure for each high-risk activity</li>
                        <li>&bull; Detailed traffic management plan</li>
                        <li>&bull; Comprehensive emergency plan</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-green-500/40 via-yellow-500/40 to-blue-500/40" />
                </div>
                <div className="flex justify-between text-xs text-white/50 mt-1">
                  <span>Simple</span>
                  <span>Proportionate to risk</span>
                  <span>Complex</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Avoiding Paperwork for Its Own Sake</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A 50-page plan for a two-day domestic job is <strong className="text-white">disproportionate and unhelpful</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A two-page plan for a multi-million-pound hospital build is <strong className="text-white">dangerously inadequate</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The plan must <strong className="text-white">focus on managing real risks</strong>, not filling in templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A <strong className="text-white">short, well-thought-out plan</strong> is far more effective than a long, generic one</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Key Test:</strong> Ask yourself &mdash; if an HSE inspector
                  arrived on site today, would this plan demonstrate that you have <strong>identified the real
                  risks and put sensible arrangements in place to manage them?</strong> That is the standard.
                  Length and format are secondary to whether the plan actually works as a management tool for
                  the specific project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Reviewing and Updating */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">08</span>
            Reviewing &amp; Updating the CPP
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction phase plan is a <strong>living document</strong>. It must be reviewed and
                updated throughout the project to ensure it remains relevant and effective. A plan that was
                accurate at the start of the project may become inadequate as circumstances change &mdash;
                new contractors arrive, the scope evolves, or unexpected hazards are discovered.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Triggers for Review</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">New contractor mobilising to site</strong> &mdash; new risks, new interfaces, new personnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Significant change in project scope</strong> &mdash; additional work, changed programme, new phases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Incident, accident, or near miss</strong> &mdash; lessons learned and revised procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Discovery of an unexpected hazard</strong> &mdash; asbestos, contaminated ground, structural instability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Change to the management structure</strong> &mdash; new site manager, new H&amp;S adviser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Feedback from inspections or audits</strong> &mdash; identified improvements or gaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Seasonal changes</strong> &mdash; winter working, adverse weather procedures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Version Control</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Each revision should be <strong className="text-white">clearly numbered and dated</strong> (e.g., Version 3.0 &mdash; 15/01/2025)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A <strong className="text-white">revision log</strong> should record what was changed, why, and by whom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Superseded versions should be <strong className="text-white">clearly marked as obsolete</strong> and removed from active use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Previous versions should be <strong className="text-white">archived for record purposes</strong></span>
                  </li>
                </ul>
              </div>

              {/* CPP Structure Overview Diagram */}
              <div className="bg-white/5 border border-blue-500/30 rounded-xl p-6 sm:p-8">
                <p className="text-sm font-medium text-blue-400 mb-6 text-center">
                  CPP Structure Overview
                </p>
                <div className="space-y-3">
                  {/* Top Level */}
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-blue-300">Construction Phase Plan</p>
                    <p className="text-xs text-white/50">Living document &mdash; reviewed and updated throughout the project</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-[2px] h-4 bg-blue-500/40" />
                  </div>

                  {/* Main Sections */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-white">Project Description</p>
                      <p className="text-[10px] text-white/50 mt-1">Scope, location, phases</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-white">Management Structure</p>
                      <p className="text-[10px] text-white/50 mt-1">Roles, org chart, coordination</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-white">H&amp;S Arrangements</p>
                      <p className="text-[10px] text-white/50 mt-1">Inductions, welfare, first aid</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-white">Site Rules</p>
                      <p className="text-[10px] text-white/50 mt-1">PPE, access, permits, traffic</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-white">Risk Procedures</p>
                      <p className="text-[10px] text-white/50 mt-1">Height, hot works, confined</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-white">Emergency Plan</p>
                      <p className="text-[10px] text-white/50 mt-1">Fire, evacuation, rescue</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-[2px] h-4 bg-blue-500/40" />
                  </div>

                  {/* Bottom Level */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-semibold text-amber-300">Version Control</p>
                      <p className="text-[9px] text-white/40 mt-0.5">Numbered, dated, logged</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-semibold text-amber-300">Review Triggers</p>
                      <p className="text-[9px] text-white/40 mt-0.5">New risks, incidents, changes</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-semibold text-amber-300">Site Access</p>
                      <p className="text-[9px] text-white/40 mt-0.5">Available to all workers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Accessibility on Site</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The current version of the CPP must be <strong className="text-white">accessible on site at all times</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>It can be kept as a <strong className="text-white">physical document in the site office</strong> or accessed digitally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Workers should know <strong className="text-white">where to find the plan</strong> and have access to the parts relevant to their work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Key elements (site rules, emergency procedures) should be <strong className="text-white">displayed prominently</strong> in common areas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Remember:</strong> A construction phase plan that was
                  written on day one and never updated is <strong>not a living document</strong> &mdash; it is
                  a dead document. The value of the CPP lies in its role as an active management tool that
                  evolves with the project. Regular review, updating, and communication of changes are
                  essential to making the plan work in practice.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../cdm-regulations-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pre-Construction Information
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3-section-3">
              Next: Health &amp; Safety File
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
