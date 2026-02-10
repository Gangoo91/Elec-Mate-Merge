import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, FileText, ClipboardList, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Pre-Construction Information – CDM Regulations Module 3 Section 1";
const DESCRIPTION =
  "Regulation 4(4) pre-construction information requirements, content of PCI, client responsibilities, PCI for existing buildings and new builds, distribution, the PCI register, and practical examples for electricians.";

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, who has the duty to provide pre-construction information?",
    options: [
      "The principal contractor",
      "The client",
      "The principal designer",
      "The Health and Safety Executive",
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 4(4) of CDM 2015, the client must provide pre-construction information as soon as is practicable to every designer and contractor appointed, or being considered for appointment, to the project. The client may appoint others to gather this information, but the legal duty remains with the client.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT typically included in a pre-construction information pack?",
    options: [
      "Asbestos survey reports",
      "Existing structural drawings",
      "The contractor's method statements",
      "Ground investigation reports",
    ],
    correctAnswer: 2,
    explanation:
      "Method statements are produced by the contractor as part of their planning for the construction phase — they are not part of the pre-construction information provided by the client. PCI covers information about the site, the existing structure, and hazards that designers and contractors need to know before they begin planning their work.",
  },
  {
    id: 3,
    question:
      "When must pre-construction information be provided to designers and contractors?",
    options: [
      "Only after the construction phase plan is complete",
      "At the pre-construction phase meeting only",
      "As soon as is practicable, and before detailed design or planning begins",
      "Within 14 days of the contract being signed",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 requires that PCI be provided 'as soon as is practicable' to every designer and contractor. The information must be available early enough for designers to take it into account in their designs and for contractors to plan their work safely. Late provision of PCI undermines the entire purpose of the duty.",
  },
  {
    id: 4,
    question:
      "A client does not have an asbestos survey for an existing building scheduled for refurbishment. What should happen?",
    options: [
      "Work can proceed as long as operatives are careful",
      "The client must arrange for a suitable asbestos survey before work begins",
      "The principal contractor should assume there is no asbestos present",
      "The designer can waive the requirement if the building is modern",
    ],
    correctAnswer: 1,
    explanation:
      "If the client does not have relevant information such as an asbestos survey, they must make reasonable enquiries to obtain it. For refurbishment or demolition work on an existing building, a refurbishment and demolition (R&D) asbestos survey is required before work begins. The duty holder for the asbestos management survey is the building owner, but the client for the CDM project must ensure this information is provided as PCI.",
  },
  {
    id: 5,
    question:
      "Who is responsible for distributing pre-construction information to designers on a notifiable project?",
    options: [
      "The client distributes to all parties directly",
      "The principal designer distributes to designers",
      "The principal contractor distributes to designers",
      "Each designer must request the information themselves",
    ],
    correctAnswer: 1,
    explanation:
      "On a notifiable project, the client provides PCI to the principal designer and principal contractor. The principal designer then distributes relevant PCI to all designers working on the project, whilst the principal contractor distributes relevant PCI to all contractors. This ensures each party receives the information pertinent to their scope of work.",
  },
  {
    id: 6,
    question:
      "What is the purpose of a PCI register?",
    options: [
      "To record which contractors have been paid",
      "To document what PCI has been provided, identify gaps, and track assumptions",
      "To list all accidents that have occurred on previous projects",
      "To register the project with the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "A PCI register is a management tool that documents what pre-construction information has been provided, identifies gaps in the information available, records any assumptions that have been made where information is missing, and tracks ongoing updates as new information becomes available during the project. It provides an auditable record of compliance with Regulation 4(4).",
  },
  {
    id: 7,
    question:
      "An electrician is about to begin a rewire of an existing commercial building. Which piece of PCI is most critical for their safety?",
    options: [
      "The architect's colour scheme",
      "The asbestos survey report showing locations of asbestos-containing materials",
      "The project budget breakdown",
      "The landscaping plan for external areas",
    ],
    correctAnswer: 1,
    explanation:
      "For an electrician carrying out a rewire, the asbestos survey report is the most safety-critical piece of PCI. Rewiring involves drilling through walls, lifting floorboards, accessing ceiling voids, and running cables through partitions — all activities that can disturb asbestos-containing materials. The electrician must know where ACMs are located to avoid disturbing them or to arrange for licensed removal before work begins.",
  },
  {
    id: 8,
    question:
      "On a new-build project, which of the following would be included in the pre-construction information?",
    options: [
      "The construction phase plan",
      "The contractor's risk assessments",
      "Ground investigation reports and contamination assessments",
      "The scaffold design drawings",
    ],
    correctAnswer: 2,
    explanation:
      "Ground investigation reports and contamination assessments are classic examples of new-build PCI. They inform designers and contractors about ground conditions, potential contamination, load-bearing capacity, and water table levels — all essential for safe planning. The construction phase plan and risk assessments are produced by the contractor, not the client, and scaffold designs come later in the process.",
  },
];

const quickCheckQuestions = [
  {
    id: "pci-duty-holder",
    question:
      "You arrive on site for a rewire and discover no asbestos survey has been provided. The site manager says 'just crack on, the building is only 15 years old.' What should you do?",
    options: [
      "Proceed carefully — modern buildings rarely contain asbestos",
      "Stop work and refuse to proceed until a suitable asbestos survey has been provided as part of the PCI",
      "Ask a colleague whether they think there might be asbestos",
      "Start work in areas that look safe and avoid any suspicious materials",
    ],
    correctIndex: 1,
    explanation:
      "You must stop and request the asbestos survey. Buildings constructed before 2000 (and some materials used after) may contain asbestos. The client has a legal duty under CDM 2015 to provide this as part of the pre-construction information. Working without this information puts you at risk of disturbing asbestos-containing materials. Report the gap to your supervisor and the principal contractor immediately.",
  },
  {
    id: "pci-content",
    question:
      "A client provides you with a set of existing drawings for a refurbishment project but warns they may be 'out of date.' Should you rely on them?",
    options: [
      "Yes — any drawings are better than none",
      "No — discard them and start from scratch",
      "Use them as a starting point but verify on site, and record the assumption that they may not be accurate in the PCI register",
      "Return them to the client and refuse to begin work",
    ],
    correctIndex: 2,
    explanation:
      "Out-of-date drawings still have value as a starting point, but you must not rely on them blindly. Use them for initial planning, verify conditions on site before carrying out any work, and record in the PCI register that the drawings may not reflect the current layout. This is a common scenario on refurbishment projects and demonstrates good practice in managing PCI gaps.",
  },
  {
    id: "pci-distribution",
    question:
      "You are a subcontractor on a notifiable project and have not received any pre-construction information. Who should you contact first?",
    options: [
      "The Health and Safety Executive",
      "The client directly",
      "The principal contractor, who is responsible for distributing PCI to contractors",
      "The local authority building control",
    ],
    correctIndex: 2,
    explanation:
      "On a notifiable project, the principal contractor is responsible for distributing relevant PCI to all contractors, including subcontractors. Your first point of contact should be the principal contractor (or your appointing contractor, who should escalate to the PC). If the PC has not received PCI from the client, they must raise this with the client. You should not proceed with planning or work until you have the PCI you need.",
  },
];

const faqs = [
  {
    question:
      "What happens if the client genuinely does not have any pre-construction information?",
    answer:
      "If the client does not hold the information, CDM 2015 requires them to make 'reasonable enquiries' to obtain it. For example, if no structural drawings exist, the client should commission a structural survey. If no asbestos survey has been carried out, one must be arranged. The client may appoint the principal designer, a surveyor, or another competent person to gather this information on their behalf. The legal duty to provide PCI cannot be delegated — if the client fails to provide it, they are in breach of Regulation 4(4). Where information genuinely cannot be obtained (for example, ground conditions beneath an existing slab), this gap must be recorded, assumptions documented, and the risk managed through the design and construction phase plan.",
  },
  {
    question:
      "Is pre-construction information only required for notifiable projects?",
    answer:
      "No. The duty to provide pre-construction information applies to all construction projects under CDM 2015, regardless of whether they are notifiable. Even a domestic client carrying out a small extension must ensure that relevant information about the existing property (such as asbestos surveys, existing services, or structural conditions) is made available to designers and contractors. The scope and detail of PCI should be proportionate to the size and complexity of the project, but the fundamental duty exists for every project.",
  },
  {
    question:
      "How does pre-construction information differ from the health and safety file?",
    answer:
      "Pre-construction information flows forward in time — it is information gathered before and during the design phase to inform safe planning of the construction work. The health and safety file flows backward and forward — it is built up during the project and handed over at the end, providing information for anyone who needs to carry out future construction work on the completed structure. PCI tells you what you need to know before you start. The H&S file tells future duty holders what they will need to know when they work on the building after completion. On refurbishment projects, the previous H&S file (if one exists) becomes a key source of PCI for the new project.",
  },
  {
    question:
      "Can an electrician refuse to start work if they haven't received adequate PCI?",
    answer:
      "Yes. Under CDM 2015, every contractor and worker has a duty to cooperate and to report anything that is likely to endanger health or safety. If an electrician has not received the pre-construction information they need — particularly asbestos surveys, existing drawings, or information about hidden services — they should raise this with the principal contractor. Working without adequate information is unsafe and could lead to serious harm. The principal contractor should escalate the matter to the client. If the issue is not resolved, the contractor has the right to stop work until the necessary information is provided. This is not obstructive behaviour — it is professional duty under CDM 2015 and the Health and Safety at Work etc. Act 1974.",
  },
];

const CdmRegulationsModule3Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <FileText className="h-10 w-10 text-blue-400 mx-auto mb-4" />
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 3 · SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Pre-Construction Information
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            What pre-construction information is, who must provide it, what it
            must contain, how it is distributed, and how electricians use it in
            practice on rewires, refurbishments, and new builds
          </p>
        </div>

        {/* Section 01: What Is Pre-Construction Information? */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            What Is Pre-Construction Information?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-400/50 border border-blue-500/30">
              <p className="font-semibold text-blue-400 mb-2 text-base">
                In 30 Seconds
              </p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Legal Basis:</strong> Regulation 4(4) of CDM 2015
                    places a duty on the client to provide PCI.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Purpose:</strong> Enables designers and contractors
                    to plan their work safely before the construction phase
                    begins.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Recipients:</strong> Every designer and contractor
                    appointed to, or being considered for appointment to, the
                    project.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Timing:</strong> As soon as is practicable — the
                    earlier, the better.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Scope:</strong> Information about the project, the
                    site, existing structures, and known hazards that could
                    affect the work.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-400/50 border border-blue-500/30">
              <p className="font-semibold text-blue-400 mb-2 text-base">
                Why It Matters
              </p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Safe Design:</strong> Designers cannot eliminate or
                    reduce risks if they do not know about existing hazards such
                    as asbestos, structural instability, or buried services.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Safe Planning:</strong> Contractors cannot produce
                    adequate method statements, risk assessments, or the
                    construction phase plan without knowing what conditions they
                    will face.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Pricing:</strong> Contractors need PCI to price work
                    accurately — unknown hazards lead to unexpected costs, delays,
                    and disputes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Legal Compliance:</strong> Failure to provide PCI is
                    a breach of CDM 2015. The HSE can take enforcement action
                    against clients who fail in this duty.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white">
            <p>
              Pre-construction information (PCI) is all the information about
              the project that is relevant to the health and safety of the
              construction work. It is the foundation upon which safe design and
              safe planning are built. Without it, designers and contractors are
              working blind — and that is precisely the situation CDM 2015 was
              designed to prevent.
            </p>
            <p>
              Regulation 4(4) states that a client must provide pre-construction
              information as soon as is practicable to every designer and
              contractor appointed, or being considered for appointment, to the
              project. The information must be in a convenient form, clearly
              organised, and proportionate to the scale and complexity of the
              work. There is no prescribed format — it can be a single document,
              a pack of reports and drawings, or a digital information system —
              but it must be accessible and usable by those who receive it.
            </p>
            <p>
              The concept behind PCI is straightforward: the client knows more
              about their building, their site, and their project than anyone
              else at the outset. By sharing that knowledge with the design and
              construction team, risks can be identified early, designed out
              where possible, and managed effectively where they cannot be
              eliminated. This upstream approach — addressing hazards before work
              begins rather than reacting to them on site — is at the heart of
              the CDM philosophy.
            </p>
          </div>
        </section>

        {/* Section 02: Content of PCI */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">02</span>
              Content of PCI
            </h2>
            <div className="space-y-4 text-white">
              <p>
                CDM 2015 does not prescribe a rigid list of what PCI must
                contain, because the information will vary depending on the
                type, size, and complexity of the project. However, HSE guidance
                (L153) and industry best practice establish a clear framework.
                PCI should include any information that is reasonably obtainable
                and relevant to the health and safety of the construction work.
              </p>

              {/* Diagram: PCI Content Checklist */}
              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  PCI Content Checklist
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        PD
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Project Description
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Nature and scope of the works</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Key dates and programme milestones</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Client's brief and intended use</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        ED
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Existing Drawings & Plans
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Floor plans, elevations, sections</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>As-built drawings from previous works</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Services layouts (electrical, mechanical)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        SS
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Structural Surveys
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Structural condition reports</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Load-bearing wall identification</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Known structural defects or repairs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        AS
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Asbestos Information
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Asbestos register and management survey</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>R&D survey for refurbishment/demolition</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Locations, types, and condition of ACMs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        UT
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Utilities & Services
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Location of underground and overhead services</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Gas, water, electricity, telecoms routes</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Isolation points and live services nearby</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        GC
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Ground Conditions & Access
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Ground investigation and bore-hole data</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Contamination history and assessments</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Access restrictions and site constraints</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        HF
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Previous H&S File
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Records from previous construction work</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Residual hazards and design decisions</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Post-tensioned elements, hidden voids, etc.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 text-xs font-bold">
                        HZ
                      </div>
                      <h4 className="font-semibold text-blue-400 text-sm">
                        Known Hazards & Risks
                      </h4>
                    </div>
                    <ul className="text-xs space-y-1 text-white/80">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Hazardous materials (lead paint, PCBs)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Flood risk and environmental factors</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Neighbouring occupied premises</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The depth of information should be proportionate to the project.
                A small domestic rewire might require only an asbestos survey,
                existing drawings (if available), and a note on access
                restrictions. A major commercial refurbishment would require
                comprehensive structural surveys, full asbestos R&D surveys,
                detailed services information, geotechnical data, and the
                previous health and safety file from the original construction.
              </p>
              <p>
                The key principle is this: if information exists and it is
                relevant to the safe planning or execution of the construction
                work, it should be included in the PCI. Withholding known
                information is not acceptable, even if the client considers it
                commercially sensitive.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Client's Responsibility */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">03</span>
              Client's Responsibility
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The duty to provide pre-construction information rests squarely
                with the client. This is one of the core client duties under CDM
                2015 and it cannot be delegated. The client may appoint others
                to gather and compile the information — a surveyor, the
                principal designer, a project manager — but the legal
                responsibility remains with the client throughout.
              </p>

              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  The Client Must:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      1
                    </div>
                    <div className="text-sm">
                      <strong>Provide PCI as soon as is practicable</strong> to
                      every designer and contractor appointed or being considered
                      for appointment — not just after the contract is signed
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      2
                    </div>
                    <div className="text-sm">
                      <strong>Make reasonable enquiries</strong> to obtain
                      information they do not currently hold — commissioning
                      surveys, requesting records from previous owners or
                      managing agents
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      3
                    </div>
                    <div className="text-sm">
                      <strong>Ensure PCI is in a convenient form</strong> —
                      clearly organised, proportionate, and usable by the
                      recipients. A box of unsorted papers dumped on a
                      contractor's desk does not meet this requirement.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      4
                    </div>
                    <div className="text-sm">
                      <strong>Update PCI during the project</strong> if new
                      information becomes available — for example, an
                      unexpected asbestos find during strip-out, or a
                      previously unknown underground tank
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  When the Client Doesn't Have the Information
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    It is common for clients — particularly on refurbishment
                    projects — to lack some or all of the information needed.
                    This does not excuse them from the duty. CDM 2015 requires
                    the client to make <strong>reasonable enquiries</strong> to
                    obtain the missing information:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>No asbestos survey?</strong> Commission a
                        management survey (or R&D survey if refurbishment or
                        demolition is planned).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>No structural drawings?</strong> Commission a
                        structural survey or appoint a structural engineer to
                        carry out a desk study and site inspection.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>No services records?</strong> Arrange utility
                        searches (electricity, gas, water, telecoms) and
                        underground service detection surveys.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong>No ground data?</strong> Commission a ground
                        investigation with bore holes and trial pits as
                        appropriate.
                      </span>
                    </li>
                  </ul>
                  <p>
                    Where information genuinely cannot be obtained despite
                    reasonable enquiries, this gap must be clearly documented so
                    that designers and contractors can factor the uncertainty
                    into their planning.
                  </p>
                </div>
              </div>

              <p>
                The client may appoint the principal designer or another
                competent person to gather and compile PCI on their behalf. This
                is common practice and is strongly encouraged by the HSE. However,
                the legal duty does not transfer — if the appointed person fails
                to gather the information, it is still the client who is in
                breach of Regulation 4(4).
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: PCI for Existing Buildings */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              PCI for Existing Buildings
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Existing buildings present the greatest challenge for
                pre-construction information because there is inherent
                uncertainty about what lies behind walls, above ceilings,
                beneath floors, and within the fabric of the structure. This is
                precisely why PCI is so critical for refurbishment and
                alteration work — the unknown hazards are often more dangerous
                than those on a greenfield new-build site.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Key PCI for Existing Building Work
                </h3>

                <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                  <h4 className="text-base font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Asbestos — The Number One Priority
                  </h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong>Management Survey:</strong> Required for all
                        commercial buildings constructed before 2000. Identifies
                        the presence, location, and condition of
                        asbestos-containing materials (ACMs) that could be
                        disturbed during normal occupation or maintenance.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong>Refurbishment & Demolition (R&D) Survey:</strong>{" "}
                        Required before any refurbishment, alteration, or
                        demolition work. This is more intrusive than a management
                        survey and aims to identify all ACMs in the areas where
                        work will take place, including those behind panels, above
                        ceilings, and within wall cavities.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong>For electricians:</strong> Rewiring, cable
                        routing, socket installation, and consumer unit
                        replacement all involve drilling, chasing, lifting
                        floorboards, and accessing ceiling voids — all
                        high-risk activities for disturbing ACMs. The asbestos
                        survey is your most important piece of PCI.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-400">
                    Structural Condition
                  </h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Structural condition reports identifying load-bearing
                        elements, known defects, previous repairs, and any
                        areas of structural concern
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Identification of pre-stressed or post-tensioned
                        concrete elements that must not be drilled into or cut
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Information about temporary propping or structural
                        support that may be needed during the works
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-400">
                    Hazardous Materials (Beyond Asbestos)
                  </h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong>Lead paint:</strong> Common in buildings
                        constructed before the 1970s. Sanding, scraping, or
                        burning off lead paint generates hazardous dust and fumes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong>PCBs (Polychlorinated biphenyls):</strong> Found
                        in some older fluorescent light ballasts, sealants, and
                        paints. PCBs are toxic and carcinogenic.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        <strong>Man-made mineral fibre (MMMF):</strong> Older
                        insulation materials that can cause skin and respiratory
                        irritation during disturbance.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-400">
                    Services Records & Access
                  </h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Existing electrical installation schematics, distribution
                        board schedules, and as-installed wiring diagrams
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Mechanical services routes — heating pipework, gas
                        runs, ventilation ductwork that may conflict with
                        proposed cable routes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Access limitations — restricted areas, occupied spaces,
                        working hours constraints, permit-to-work requirements
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Fire compartment boundaries that must be maintained or
                        reinstated after cable penetrations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: PCI for New Build */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              PCI for New Build
            </h2>
            <div className="space-y-4 text-white">
              <p>
                New-build projects present a different set of PCI challenges.
                There is no existing structure to survey for asbestos or
                structural defects, but there are site-specific hazards and
                conditions that must be understood before design and
                construction can proceed safely.
              </p>

              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  New-Build PCI Requirements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      1
                    </div>
                    <div className="text-sm">
                      <strong>Ground Investigation Reports:</strong> Bore-hole
                      logs, trial pit records, soil classification, bearing
                      capacity data, and water table levels. Essential for
                      foundation design, excavation planning, and understanding
                      ground stability risks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      2
                    </div>
                    <div className="text-sm">
                      <strong>Contamination Assessments:</strong> Phase 1
                      desk study and Phase 2 intrusive investigation results.
                      Previous land use (industrial, agricultural, landfill)
                      may have left contaminants that pose risks to workers
                      during excavation and groundworks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      3
                    </div>
                    <div className="text-sm">
                      <strong>Ecological Surveys:</strong> Protected species
                      (great crested newts, bats, nesting birds), habitat
                      assessments, and any ecological constraints that affect
                      site access, working times, or construction methods.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      4
                    </div>
                    <div className="text-sm">
                      <strong>Flood Risk Assessment:</strong> Flood zone
                      classification, surface water drainage considerations,
                      and any mitigation measures required. Affects site welfare
                      facilities location, material storage, and emergency
                      planning.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      5
                    </div>
                    <div className="text-sm">
                      <strong>Utility Searches:</strong> Underground service
                      records from utility providers (electricity, gas, water,
                      telecoms, fibre). Critical for safe excavation and
                      avoiding cable and pipe strikes. CAT and Genny survey
                      results where available.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      6
                    </div>
                    <div className="text-sm">
                      <strong>Planning Conditions:</strong> Any planning
                      conditions that affect construction methods, working
                      hours, noise limits, dust suppression requirements, or
                      access routes. These can significantly constrain how and
                      when work is carried out.
                    </div>
                  </div>
                </div>
              </div>

              <p>
                For electricians working on new-build projects, the most
                relevant PCI typically includes utility search records (to
                understand where existing services enter the site and where
                temporary supplies will be routed), the site layout plan showing
                access routes and welfare facilities, and any planning
                conditions that restrict working hours or methods. Understanding
                the overall site layout and phasing is also important so that
                electrical first-fix and second-fix activities are coordinated
                safely with other trades.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-400">
                  Brownfield vs Greenfield
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Greenfield Site
                    </h4>
                    <ul className="space-y-1 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>No previous development — lower contamination risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Ecological surveys often more extensive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Fewer existing underground services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Ground investigation essential (unknown conditions)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Brownfield Site
                    </h4>
                    <ul className="space-y-1 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Previous development — higher contamination risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>May have remnant foundations, cellars, or voids</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Existing underground services likely present</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Previous H&S file may exist (if CDM applied)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Distribution of PCI */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">06</span>
              Distribution of PCI
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Gathering PCI is only half the duty — it must also reach the
                right people at the right time. CDM 2015 establishes a clear
                distribution chain for notifiable projects, and good practice
                extends a similar approach to non-notifiable projects.
              </p>

              {/* Diagram: PCI Distribution Flow */}
              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  PCI Distribution Flow
                </h3>

                {/* Flow diagram using cards and arrows */}
                <div className="flex flex-col items-center gap-2">
                  {/* Client */}
                  <div className="w-full max-w-md bg-blue-500/20 border-2 border-blue-400/50 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-blue-300 text-base">CLIENT</h4>
                    <p className="text-xs text-white/70 mt-1">
                      Gathers and provides PCI (Regulation 4(4))
                    </p>
                  </div>

                  {/* Arrow down - splits to PD and PC */}
                  <div className="flex items-center justify-center w-full max-w-md">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-400/50" />
                      <div className="w-3 h-3 border-b-2 border-r-2 border-blue-400/50 transform rotate-45 -mt-1.5" />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-400/50" />
                      <div className="w-3 h-3 border-b-2 border-r-2 border-blue-400/50 transform rotate-45 -mt-1.5" />
                    </div>
                  </div>

                  {/* PD and PC side by side */}
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-green-500/20 border-2 border-green-400/50 p-3 rounded-lg text-center">
                      <h4 className="font-bold text-green-300 text-sm">
                        PRINCIPAL DESIGNER
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        Distributes to all designers
                      </p>
                    </div>
                    <div className="bg-amber-500/20 border-2 border-amber-400/50 p-3 rounded-lg text-center">
                      <h4 className="font-bold text-amber-300 text-sm">
                        PRINCIPAL CONTRACTOR
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        Distributes to all contractors
                      </p>
                    </div>
                  </div>

                  {/* Arrows down */}
                  <div className="flex items-center justify-center w-full max-w-md">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-green-400/50" />
                      <div className="w-3 h-3 border-b-2 border-r-2 border-green-400/50 transform rotate-45 -mt-1.5" />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-amber-400/50" />
                      <div className="w-3 h-3 border-b-2 border-r-2 border-amber-400/50 transform rotate-45 -mt-1.5" />
                    </div>
                  </div>

                  {/* Designers and Contractors */}
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-green-500/10 border border-green-400/30 p-3 rounded-lg text-center">
                      <h4 className="font-semibold text-green-300 text-sm">
                        ALL DESIGNERS
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        Architects, engineers, M&E designers
                      </p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-400/30 p-3 rounded-lg text-center">
                      <h4 className="font-semibold text-amber-300 text-sm">
                        ALL CONTRACTORS
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        Main contractor, subcontractors, specialists
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white/80">
                  <strong className="text-white">Non-notifiable projects:</strong>{" "}
                  Where there is no principal designer or principal contractor
                  (single-contractor projects), the client provides PCI directly
                  to the designer(s) and contractor(s). The distribution chain is
                  simpler but the duty is the same.
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Timing of Distribution
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-tender:</strong> PCI
                      should be included in tender documentation so that
                      contractors can price the work with full knowledge of the
                      risks and constraints. This avoids "ambush" hazards
                      discovered after contract award.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-design:</strong>{" "}
                      Designers must receive PCI before commencing detailed
                      design, so they can take existing hazards into account in
                      their design decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pre-construction:</strong>{" "}
                      The principal contractor must have PCI before producing the
                      construction phase plan. All contractors must have relevant
                      PCI before they begin planning or carrying out their
                      portion of the work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ongoing:</strong> PCI is
                      not a one-off exercise. As new information emerges during
                      the project (unexpected ground conditions, additional
                      asbestos finds, changes in scope), it must be distributed
                      promptly to all affected parties.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: PCI Register */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">07</span>
              PCI Register
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A PCI register is a management tool — not a legal requirement in
                itself, but strongly recommended as best practice for
                demonstrating compliance with Regulation 4(4). It provides an
                auditable record of what information has been gathered, what has
                been distributed, what gaps remain, and what assumptions have
                been made.
              </p>

              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  What a PCI Register Should Record
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      1
                    </div>
                    <div className="text-sm">
                      <strong>Document inventory:</strong> A list of all PCI
                      documents and reports that have been gathered — asbestos
                      surveys, structural reports, utility searches, ground
                      investigations, existing drawings, previous H&S file
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      2
                    </div>
                    <div className="text-sm">
                      <strong>Date received and source:</strong> When each
                      document was received and from whom — this establishes
                      the timeline and chain of custody
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      3
                    </div>
                    <div className="text-sm">
                      <strong>Distribution record:</strong> Who received each
                      piece of PCI and when — confirms that the distribution
                      duty has been fulfilled
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      4
                    </div>
                    <div className="text-sm">
                      <strong>Information gaps:</strong> Clearly identified
                      gaps where information was sought but not available — for
                      example, "no as-built drawings exist for the 1960s
                      extension"
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      5
                    </div>
                    <div className="text-sm">
                      <strong>Assumptions made:</strong> Where gaps exist,
                      record the assumptions that designers and contractors are
                      working under — for example, "assumed floor void depth
                      is 300 mm based on typical construction of the era"
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300 text-xs font-bold">
                      6
                    </div>
                    <div className="text-sm">
                      <strong>Updates and revisions:</strong> As new
                      information becomes available during the project, record
                      the update, the date, and who was notified
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The PCI register is typically maintained by the principal
                designer on notifiable projects, as part of their duty to
                coordinate health and safety during the pre-construction phase.
                On smaller projects, the designer or contractor may maintain a
                simpler version. The format can be a spreadsheet, a document, or
                part of a project information management system — the key is
                that it exists, is kept up to date, and can be produced as
                evidence of compliance if required.
              </p>

              <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Why Gaps and Assumptions Matter
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Recording gaps and assumptions is not an admission of failure —
                  it is professional risk management. If an assumption later
                  proves wrong (for example, the floor void is actually only
                  150 mm, not 300 mm), the team can trace back to the documented
                  assumption, understand why the decision was made, and adjust
                  their approach. Without this record, the same mistake may be
                  repeated, or blame may fall on the wrong party.
                </p>
                <p className="text-sm text-white/80">
                  The HSE will look favourably on a project where gaps were
                  identified, assumptions documented, and reasonable steps taken
                  to manage the risk — even if an incident occurs. They will
                  look much less favourably on a project where no PCI register
                  exists and no one can demonstrate what information was
                  available or how decisions were made.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Practical Examples */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              Practical Examples
            </h2>
            <div className="space-y-6 text-white">
              <p>
                To bring the theory to life, here are three practical scenarios
                showing how pre-construction information works in real-world
                situations that electricians are likely to encounter.
              </p>

              {/* Example 1: Rewire */}
              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Example 1: Electrician Receiving PCI for a Commercial Rewire
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Project:</strong> Full rewire of a 1970s
                    three-storey office building. The building is occupied on
                    the ground floor (the client's reception and admin team)
                    and vacant on the upper floors.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">
                      PCI Received by the Electrical Contractor:
                    </h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Asbestos R&D Survey:</strong>{" "}
                          Identified asbestos insulating board (AIB) in ceiling
                          tiles on the first floor and asbestos cement flue in
                          the plant room. Licensed removal required before
                          electrical work on the first floor ceiling void.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Existing Drawings:</strong>{" "}
                          As-built electrical layout from the 1990s rewire of
                          the ground floor only. No drawings exist for the
                          upper floors — noted as a gap in the PCI register.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Access Restrictions:</strong>{" "}
                          Ground floor occupied during office hours
                          (08:00–18:00). Electrical work on the ground floor
                          must be carried out outside these hours. Upper floors
                          accessible at all times.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Structural Information:</strong>{" "}
                          Structural engineer's report confirming that the
                          first-floor slab is post-tensioned concrete — no
                          drilling or chasing into the soffit is permitted.
                          Cable routes must use surface trunking or be routed
                          through the ceiling void.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Fire Compartmentation:</strong>{" "}
                          Fire strategy drawing showing compartment walls and
                          fire-rated floors. All cable penetrations through
                          these elements must be fire-stopped to maintain the
                          rated integrity.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-white/70 italic">
                    Without this PCI, the electrician could have drilled into a
                    post-tensioned slab (risking catastrophic structural
                    failure), disturbed asbestos ceiling tiles (risking
                    mesothelioma exposure), or planned work during occupied
                    hours (risking disruption and access denial).
                  </p>
                </div>
              </div>

              {/* Example 2: New Build */}
              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Example 2: New-Build Housing Development PCI Package
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Project:</strong> Phase 2 of a 120-unit housing
                    development on a former industrial estate (brownfield
                    site).
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">
                      PCI Package Contents:
                    </h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Ground Investigation:</strong>{" "}
                          Bore-hole logs showing made ground (fill material) to
                          2.5 m depth, high water table, and clay subsoil.
                          Implications for excavation support and dewatering.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Contamination Assessment:</strong>{" "}
                          Phase 2 report identifying hydrocarbon contamination
                          in the south-west corner of the site from the former
                          fuel storage area. PPE requirements for groundworks
                          in this area.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Utility Records:</strong>{" "}
                          11 kV underground electricity cable crossing the
                          south boundary of the site. 150 mm gas main running
                          along the western access road. Both require
                          exclusion zones during excavation.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Phase 1 H&S File:</strong>{" "}
                          Records from Phase 1 showing underground drainage
                          routes, temporary road construction details, and
                          lessons learnt regarding winter working conditions on
                          the clay subsoil.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Planning Conditions:</strong>{" "}
                          Working hours restricted to 07:30–18:00 weekdays and
                          08:00–13:00 Saturdays. No working on Sundays or
                          public holidays. Noise limit of 65 dB(A) at the
                          nearest residential boundary.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Example 3: Refurbishment */}
              <div className="bg-blue-500/10 border border-blue-400/30 p-4 sm:p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Example 3: Refurbishment PCI — School Electrical Upgrade
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Project:</strong> Electrical upgrade to a 1950s
                    primary school during the summer holidays. New distribution
                    boards, LED lighting throughout, additional socket outlets
                    in classrooms, and new fire alarm system.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">
                      PCI Provided:
                    </h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Asbestos Management Survey + R&D Survey:</strong>{" "}
                          Asbestos cement roof sheets on the original 1950s
                          building. Asbestos insulation on heating pipework in
                          the corridor ceiling voids. Vinyl floor tiles in the
                          hall (presumed to contain asbestos).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Existing Electrical Drawings:</strong>{" "}
                          Partial — some distribution board schedules exist from
                          a 2005 modification but do not cover the original
                          circuits. PCI register notes this gap and the
                          assumption that a full survey of existing circuits
                          will be required on site.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Access Programme:</strong>{" "}
                          School closes for summer on 18 July. Caretaker on
                          site weekdays only. Holiday clubs using the hall from
                          9 am to 3 pm on Tuesdays and Thursdays — the hall
                          cannot be isolated during these times.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Structural Note:</strong>{" "}
                          Original block walls are single-skin in places.
                          Chase depth limited to 15 mm to avoid compromising
                          structural integrity. Surface-mounted trunking
                          preferred where possible.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-white/70 italic">
                    This example shows how even a relatively small project has
                    significant PCI requirements. The asbestos information
                    alone dictates which areas can be worked in freely and which
                    require specialist removal first. The access constraints
                    dictate the programme. The structural note changes the
                    installation method for cable containment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Pre-Construction Information Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3-section-2">
              Next: Construction Phase Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default CdmRegulationsModule3Section1;
