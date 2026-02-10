import { ArrowLeft, HardHat, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck after sections 02, 04, 06)     */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "pc-appointment",
    question:
      "Who appoints the Principal Contractor on a project with more than one contractor?",
    options: [
      "The client must appoint the Principal Contractor",
      "The Health and Safety Executive appoints the Principal Contractor",
      "The Principal Designer selects the Principal Contractor",
      "The contractors on site vote for a Principal Contractor",
    ],
    correctIndex: 0,
    explanation:
      "Under Regulation 5 of CDM 2015, the client must appoint a Principal Contractor in writing when there will be more than one contractor working on the project. If the client fails to make this appointment, the client assumes the duties of the Principal Contractor by default.",
  },
  {
    id: "construction-phase-plan-timing",
    question:
      "When must the construction phase plan be drawn up by the Principal Contractor?",
    options: [
      "Within 14 days of starting construction work",
      "Before the construction phase begins",
      "After the first site induction has been completed",
      "Once all contractors have been appointed",
    ],
    correctIndex: 1,
    explanation:
      "Under Regulation 12(1) of CDM 2015, the Principal Contractor must draw up the construction phase plan before the construction phase begins. Work must not start on site until a suitable plan is in place covering management arrangements, site rules, and health and safety procedures.",
  },
  {
    id: "worker-consultation-regulation",
    question:
      "Which CDM 2015 regulation specifically requires the Principal Contractor to consult and engage workers on health and safety matters?",
    options: [
      "Regulation 8 — General duties",
      "Regulation 12 — Construction phase plan",
      "Regulation 13 — Duties of a Principal Contractor",
      "Regulation 14 — Principal Contractor's duty to consult and engage with workers",
    ],
    correctIndex: 3,
    explanation:
      "Regulation 14 of CDM 2015 places a specific duty on the Principal Contractor to consult and engage with workers and their representatives on matters connected with the project that may affect their health, safety, or welfare. This goes beyond simply informing workers — it requires active two-way communication.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Can the client appoint themselves as the Principal Contractor?",
    answer:
      "In theory, the duties of the Principal Contractor default to the client if no appointment is made. However, the Principal Contractor must be a contractor — meaning an organisation or individual who carries out or manages construction work. A client who does not carry out or manage construction work would not meet this definition and should appoint a competent contractor to the role. In practice, the client should always make a formal appointment and ensure the appointee has the skills, knowledge, experience, and organisational capability to fulfil the duties.",
  },
  {
    question:
      "What is the difference between the construction phase plan and the health and safety file?",
    answer:
      "The construction phase plan is a live, working document produced by the Principal Contractor before work begins on site. It covers the management arrangements, site rules, and specific health and safety procedures for the construction phase. It is updated as the project progresses. The health and safety file, by contrast, is compiled by the Principal Designer and is intended for future use — it contains information about the completed structure that will be needed for future maintenance, repair, renovation, or demolition. The construction phase plan is discarded once the project is finished; the health and safety file must be handed to the client at completion.",
  },
  {
    question:
      "Does every worker on site need to complete a site induction?",
    answer:
      "Yes. The Principal Contractor must ensure that every worker carrying out construction work on the site receives a suitable and sufficient site induction. This applies to all workers, including subcontractors, self-employed individuals, and visiting specialists. The induction must cover site rules, emergency procedures, welfare arrangements, significant risks, and reporting procedures. Workers who have not completed the induction must not be permitted to work on site. Refresher inductions or briefings may be needed when site conditions change significantly.",
  },
  {
    question:
      "How does the Principal Contractor coordinate with the Principal Designer?",
    answer:
      "The Principal Contractor and Principal Designer must work together throughout the project. The Principal Designer provides pre-construction information, communicates design risk information, and helps ensure that designers comply with their duties. The Principal Contractor uses this information to develop the construction phase plan and manage on-site risks. Regular liaison meetings, shared risk registers, and clear communication channels are essential. The Principal Contractor should inform the Principal Designer of any buildability issues or site conditions that may affect design decisions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, who must the Principal Contractor be?",
    options: [
      "Any competent individual or organisation appointed by the client",
      "A contractor — someone who carries out or manages construction work",
      "A chartered health and safety practitioner",
      "The largest contractor on site by turnover",
    ],
    correctAnswer: 1,
    explanation:
      "The Principal Contractor must be a contractor — that is, an organisation or individual who carries out or manages construction work. This is a specific requirement of CDM 2015. The role cannot be filled by a consultant, designer, or other professional who does not carry out or manage construction work.",
  },
  {
    id: 2,
    question:
      "Which regulation sets out the duties of the Principal Contractor?",
    options: [
      "Regulation 8 — General duties",
      "Regulation 11 — Duties of a Principal Designer",
      "Regulation 13 — Duties of a Principal Contractor",
      "Regulation 15 — Duties of contractors",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 13 of CDM 2015 sets out the specific duties of the Principal Contractor, including planning, managing, and monitoring the construction phase, coordinating cooperation between contractors, ensuring site rules are established and followed, and organising site inductions.",
  },
  {
    id: 3,
    question:
      "What must the construction phase plan include?",
    options: [
      "Only emergency contact numbers and a site layout drawing",
      "Management arrangements, site rules, health and safety arrangements, and specific risk procedures",
      "A full list of every worker who will attend site during the project",
      "The Principal Designer's risk assessment for all design elements",
    ],
    correctAnswer: 1,
    explanation:
      "The construction phase plan must set out the management arrangements for the project, site rules, health and safety arrangements (including welfare), and procedures for dealing with specific risks such as work at height, confined spaces, excavations, and work near services. It is a practical, working document tailored to the project.",
  },
  {
    id: 4,
    question:
      "Which of the following is NOT a typical component of a site induction delivered by the Principal Contractor?",
    options: [
      "Site rules and access arrangements",
      "Emergency procedures and muster points",
      "Each worker's individual employment contract terms",
      "Significant risks specific to the site and welfare arrangements",
    ],
    correctAnswer: 2,
    explanation:
      "Site inductions cover site rules, emergency procedures, welfare arrangements, significant risks, and reporting procedures. Individual employment contract terms are a matter between the worker and their employer — they are not part of the Principal Contractor's site induction.",
  },
  {
    id: 5,
    question:
      "How does the Principal Contractor manage interfaces between multiple contractors on site?",
    options: [
      "By allowing each contractor to manage their own work independently",
      "By reviewing method statements, sharing risk assessments, and holding regular coordination meetings",
      "By requiring all contractors to use the same subcontractors",
      "By delegating all coordination to the Principal Designer",
    ],
    correctAnswer: 1,
    explanation:
      "The Principal Contractor must actively manage contractor interfaces by reviewing method statements, ensuring risk assessments are shared, and holding regular coordination meetings. Simply allowing contractors to work independently would fail to discharge the duty to coordinate cooperation under Regulation 13.",
  },
  {
    id: 6,
    question:
      "What does Regulation 14 of CDM 2015 require the Principal Contractor to do?",
    options: [
      "Appoint a dedicated safety officer for the project",
      "Consult and engage with workers and their representatives on health and safety matters",
      "Submit weekly reports to the Health and Safety Executive",
      "Provide personal protective equipment to every worker on site",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 14 requires the Principal Contractor to consult and engage with workers and their representatives on matters connected with the project that may affect their health, safety, or welfare. This includes providing information, listening to concerns, and acting on feedback. It is about active, two-way communication.",
  },
  {
    id: 7,
    question:
      "What action should the Principal Contractor take if they identify unsafe work practices on site?",
    options: [
      "Make a note in the site diary and review it at the next progress meeting",
      "Inform the HSE immediately and wait for their inspector to attend",
      "Prohibit the unsafe work, take corrective action, and record the non-compliance",
      "Ask the contractor's employer to deal with it off site",
    ],
    correctAnswer: 2,
    explanation:
      "The Principal Contractor has the authority and the duty to stop unsafe work immediately, take corrective action, and record the non-compliance. Waiting for the next meeting or for an HSE inspector would leave workers at risk. The Principal Contractor must act promptly to protect everyone on site.",
  },
  {
    id: 8,
    question:
      "During which project phases does the Principal Contractor have active responsibilities?",
    options: [
      "Only during the physical construction work on site",
      "From appointment through pre-construction planning, the construction phase, and into handover",
      "Only after the Principal Designer has completed all design work",
      "Only when notifiable projects exceed 30 working days",
    ],
    correctAnswer: 1,
    explanation:
      "The Principal Contractor's responsibilities begin at appointment (contributing to pre-construction planning, developing the construction phase plan) and continue through the entire construction phase into handover. They are not limited to the physical work on site — planning, preparation, and close-out activities are all part of the role.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function CdmRegulationsModule2Section3() {
  useSEO({
    title:
      "Principal Contractor | CDM Regulations Module 2.3",
    description:
      "Who the Principal Contractor is, their duties under CDM 2015, the construction phase plan, site inductions, contractor coordination, worker consultation, and monitoring compliance.",
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
            <Link to="../cdm-regulations-module-2">
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
            <HardHat className="h-7 w-7 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principal Contractor
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The organisation that controls the construction phase &mdash; planning,
            managing, and monitoring site safety from first dig to handover
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Who:</strong> Appointed by the client; must be a
                contractor
              </li>
              <li>
                <strong>What:</strong> Plans, manages &amp; monitors the
                construction phase
              </li>
              <li>
                <strong>Key doc:</strong> Construction phase plan (before work
                starts)
              </li>
              <li>
                <strong>Regulation:</strong> Duties set out in Regulation 13 of
                CDM 2015
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Site rules:</strong> Established and enforced by the PC
              </li>
              <li>
                <strong>Inductions:</strong> Every worker before they start
              </li>
              <li>
                <strong>Coordination:</strong> All contractors managed through
                the PC
              </li>
              <li>
                <strong>Monitoring:</strong> Regular inspections, audits &amp;
                compliance checks
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain who the Principal Contractor is and how they are appointed",
              "Describe the Principal Contractor's duties under Regulation 13",
              "Outline the content and purpose of the construction phase plan",
              "Explain site rules, access control, and permit-to-work systems",
              "Describe what a site induction must cover and who requires one",
              "Explain how the PC coordinates multiple contractors on site",
              "Understand the requirements for worker consultation under Regulation 14",
              "Describe the PC's monitoring, inspection, and non-compliance procedures",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 01 — Who Is the Principal Contractor?           */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">01</span>
            Who Is the Principal Contractor?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Principal Contractor (PC)</strong> is the organisation (or
                individual) appointed by the client to <strong>control the construction
                phase</strong> of a project. Under CDM 2015, a Principal Contractor must
                be appointed whenever there will be <strong>more than one contractor</strong>{" "}
                working on the project at any time. This appointment must be made
                <strong> in writing</strong> and should happen as early as possible — ideally
                during the pre-construction phase so the PC can contribute to planning.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Key Points About the PC Appointment
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Must be a contractor</strong> &mdash;
                      the PC must be an organisation or individual who carries out or
                      manages construction work. A consultant, designer, or project
                      manager who does not manage construction work cannot be appointed
                      as PC.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Typically the main or managing contractor</strong> &mdash;
                      in practice, the PC is usually the main contractor, management
                      contractor, or design-and-build contractor who has day-to-day
                      control of the construction site.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Client&rsquo;s duty to appoint</strong> &mdash;
                      if the client fails to appoint a PC, the client takes on the PC
                      duties by default. This is a significant legal exposure that most
                      clients will want to avoid.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competence required</strong> &mdash;
                      the client must take reasonable steps to satisfy themselves that
                      the PC has the skills, knowledge, experience, and organisational
                      capability to carry out the role. This is not a paper exercise —
                      the client must make genuine enquiries.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Single Contractor Projects:</strong>{" "}
                  When there is only one contractor on the project, there is no
                  requirement to appoint a Principal Contractor. In this case, the
                  single contractor takes on the duty to prepare the construction
                  phase plan (Regulation 15(5)). The PC role only arises when
                  multiple contractors are involved.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Point
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The appointment of a Principal Contractor does <strong>not</strong>{" "}
                  relieve individual contractors of their own duties under CDM 2015.
                  Each contractor retains responsibility for their own workers, their
                  own risk assessments, and their own method statements. The PC
                  coordinates and oversees — they do not absorb the legal duties of
                  every contractor on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 02 — PC Duties Overview                         */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">02</span>
            PC Duties Overview
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The duties of the Principal Contractor are set out primarily in
                <strong> Regulation 13</strong> of CDM 2015. At their core, these duties
                require the PC to <strong>plan, manage, and monitor the construction
                phase</strong> so that it is carried out without risks to health and
                safety, so far as is reasonably practicable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Regulation 13 — Core Duties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Plan, manage and monitor</strong> &mdash;
                      the entire construction phase, including all activities carried
                      out by every contractor on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Coordinate cooperation</strong> &mdash;
                      ensure that all contractors and workers cooperate with each other
                      and coordinate their work to prevent conflicts and reduce risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ensure site rules</strong> &mdash;
                      establish site rules that are appropriate to the project and
                      ensure they are followed by everyone on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Organise site induction</strong> &mdash;
                      provide a suitable and sufficient site induction to every worker
                      before they begin work on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ensure welfare</strong> &mdash;
                      provide adequate welfare facilities from the start of the
                      construction phase and maintain them throughout
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Liaise with the Principal Designer</strong> &mdash;
                      work with the PD to share information and coordinate design and
                      construction risk management
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                These duties are <strong>non-delegable</strong>. The PC can instruct
                others to carry out specific tasks (such as delivering inductions or
                managing permits), but the legal responsibility for ensuring those tasks
                are done properly remains with the PC. If a subcontractor fails to follow
                site rules or a worker is not inducted, it is the PC who is accountable
                to the enforcing authority.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Proportionality:</strong> The level
                  of planning, management, and monitoring must be proportionate to the
                  risk and complexity of the project. A small refurbishment with two
                  contractors requires a different approach to a major new-build with
                  dozens of subcontractors. The PC must judge what is appropriate and
                  ensure that the resources and systems in place match the scale and
                  hazards of the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 03 — Construction Phase Plan                     */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">03</span>
            Construction Phase Plan
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction phase plan is the <strong>central safety document</strong>{" "}
                for the construction phase. Under <strong>Regulation 12(1)</strong>, the
                Principal Contractor must draw up the construction phase plan{" "}
                <strong>before the construction phase begins</strong>. No construction
                work should start on site until a suitable plan is in place.
              </p>

              <p>
                The plan is a <strong>living document</strong> — it must be reviewed and
                updated as the project progresses, as new contractors arrive on site, as
                work sequences change, and as new risks are identified. It is not a
                document that is written once and filed away. The PC must ensure that
                everyone who needs to see the plan has access to it and understands the
                parts that are relevant to their work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Construction Phase Plan &mdash; Required Content
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Management arrangements</strong> &mdash;
                      project description, management structure, roles and
                      responsibilities, communication arrangements, and the process
                      for managing change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site rules</strong> &mdash;
                      the rules that apply to everyone on site, covering access,
                      PPE requirements, prohibited behaviours, and disciplinary
                      procedures for non-compliance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Health and safety arrangements</strong> &mdash;
                      emergency procedures, fire precautions, first aid arrangements,
                      welfare facilities, and accident/incident reporting procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Specific risk procedures</strong> &mdash;
                      procedures for managing significant risks identified for the
                      project, such as work at height, excavations, confined spaces,
                      work near live services, asbestos, manual handling, and noise
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Requirement
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Construction work <strong>must not begin</strong> until the
                  construction phase plan has been prepared. The plan does not need
                  to be a lengthy document — for smaller, less complex projects a
                  short, focused plan may be entirely adequate. What matters is that
                  the plan is <strong>proportionate</strong> to the risks and
                  complexity of the project, and that it provides the practical
                  information needed to manage health and safety on site.
                </p>
              </div>

              <p>
                The PC should use the <strong>pre-construction information</strong>{" "}
                provided by the client and Principal Designer as the starting point for
                the construction phase plan. This information will include details of
                existing hazards (such as asbestos, contaminated land, or existing
                services), design risk information, and any client requirements that
                affect the way work is carried out.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 04 — Site Rules & Access Control                 */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">04</span>
            Site Rules &amp; Access Control
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Principal Contractor must <strong>establish site rules</strong> that
                are appropriate to the project and ensure that everyone on site — workers,
                subcontractors, visitors, and delivery drivers — follows them. Site rules
                form the backbone of day-to-day safety management and must be clearly
                communicated during the site induction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Typical Site Rules &amp; Access Controls
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Authorised access only</strong> &mdash;
                      the site must be secured so that only authorised persons can
                      enter. Fencing, hoardings, locked gates, and sign-in procedures
                      are standard measures. The PC must prevent unauthorised access
                      by members of the public, children, and trespassers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Permits to work</strong> &mdash;
                      for high-risk activities such as hot works, confined space entry,
                      live electrical work, and work on pressurised systems, the PC
                      must operate a permit-to-work system to control who does the
                      work, when, and under what conditions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Segregation</strong> &mdash;
                      separating pedestrian routes from vehicle routes, keeping workers
                      away from active lifting zones, and isolating hazardous
                      operations from adjacent work areas. Physical barriers, signage,
                      and banksmen are commonly used.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Traffic management</strong> &mdash;
                      a traffic management plan should be in place covering vehicle
                      routes, speed limits, reversing procedures, delivery schedules,
                      and pedestrian crossings. Construction vehicles and plant are a
                      leading cause of fatal injuries on construction sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">PPE requirements</strong> &mdash;
                      minimum PPE standards for the site (typically hard hat, high-vis,
                      safety boots) and additional PPE for specific tasks or zones.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Disciplinary procedures</strong> &mdash;
                      clear consequences for breaking site rules, from verbal warnings
                      through to removal from site. The PC must enforce rules
                      consistently and without exception.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Enforcement:</strong> Site rules
                  are only effective if they are enforced. The Principal Contractor
                  must actively monitor compliance and take immediate action when
                  rules are broken. A culture where rules are known but routinely
                  ignored is more dangerous than having no written rules at all,
                  because it creates a false sense of security.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 05 — Site Induction                              */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">05</span>
            Site Induction
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under Regulation 13, the Principal Contractor must ensure that every
                worker receives a <strong>suitable and sufficient site induction</strong>{" "}
                before they carry out any construction work on site. The induction is the
                primary mechanism for communicating site-specific safety information to
                workers and ensuring they understand the rules, risks, and procedures
                that apply to them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Site Induction &mdash; Required Content
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site rules</strong> &mdash;
                      access arrangements, PPE requirements, prohibited areas,
                      smoking/alcohol policies, and housekeeping standards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emergency procedures</strong> &mdash;
                      fire alarm signals, muster points, evacuation routes, first aid
                      provision, and the names and locations of first aiders and fire
                      wardens
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Welfare facilities</strong> &mdash;
                      location of toilets, washing facilities, drying rooms, rest
                      areas, and drinking water
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Significant risks</strong> &mdash;
                      specific hazards on the site such as asbestos, contaminated
                      ground, overhead power lines, underground services, fragile
                      surfaces, and adjacent occupied areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reporting procedures</strong> &mdash;
                      how to report accidents, incidents, near misses, unsafe
                      conditions, and health concerns. Workers must know who to
                      contact and how.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Who Needs a Site Induction?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Every worker</strong> carrying out
                      construction work on site, regardless of their experience,
                      qualifications, or the length of time they will be on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Subcontractors and self-employed</strong>{" "}
                      individuals — they are workers for the purpose of CDM 2015
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visiting specialists</strong> &mdash;
                      engineers, surveyors, inspectors, and anyone else entering the
                      construction area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Delivery drivers</strong> entering
                      the site boundary (a shorter, focused briefing may be appropriate)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Refresher Inductions:</strong>{" "}
                  The initial induction is not a one-off exercise. The PC should
                  arrange refresher inductions or toolbox talks when site conditions
                  change significantly — for example, when new phases of work begin,
                  when new hazards are introduced, or when there has been a serious
                  incident. Workers returning to site after a prolonged absence should
                  also receive an updated briefing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 06 — Coordination of Contractors                 */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">06</span>
            Coordination of Contractors
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the Principal Contractor&rsquo;s most critical duties is
                <strong> coordinating the work of multiple contractors</strong> on site.
                When several contractors are working simultaneously — often in adjacent
                or overlapping areas — the potential for conflict, confusion, and
                uncontrolled risk is significant. The PC must manage these interfaces
                proactively.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  How the PC Coordinates Contractors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Liaising with the Principal Designer</strong> &mdash;
                      the PC and PD must share information about design risks,
                      buildability issues, and any changes that affect the way work
                      is carried out. This is a two-way relationship throughout the
                      project.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Managing contractor interfaces</strong> &mdash;
                      identifying where different contractors&rsquo; activities
                      overlap or interact, and putting measures in place to prevent
                      conflicts. For example, ensuring that an electrician is not
                      working above a ceiling whilst a plasterer is working below it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Method statement reviews</strong> &mdash;
                      the PC should review contractors&rsquo; method statements
                      before work begins to check that they are suitable, that they
                      address the risks, and that they are compatible with other
                      activities on site.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Risk assessment sharing</strong> &mdash;
                      contractors must share their risk assessments with the PC and
                      with other contractors whose work may be affected. The PC must
                      ensure this sharing takes place and that the information is acted
                      upon.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regular coordination meetings</strong> &mdash;
                      the PC should hold regular meetings (daily briefings, weekly
                      coordination meetings, or progress meetings as appropriate) to
                      discuss upcoming work, identify clashes, and resolve issues
                      before they become problems on site.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Failure
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A frequent cause of serious accidents on multi-contractor sites is
                  the failure to manage <strong>interfaces</strong> between trades.
                  When two or more contractors work in the same area without proper
                  coordination — for example, one team removing scaffolding whilst
                  another team is still using it — the consequences can be fatal.
                  The PC must take an active, hands-on approach to coordination, not
                  simply rely on contractors to &ldquo;sort it out amongst
                  themselves.&rdquo;
                </p>
              </div>

              <p>
                Effective coordination requires <strong>clear communication
                channels</strong>, <strong>documented work sequences</strong>, and a
                culture where every contractor understands that they must inform the PC
                before changing their planned activities. The PC should maintain a
                <strong> master programme</strong> showing all contractors&rsquo;
                activities and their dependencies, and update it regularly.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 07 — Worker Consultation & Engagement            */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">07</span>
            Worker Consultation &amp; Engagement
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 14</strong> of CDM 2015 places a specific duty on
                the Principal Contractor to <strong>consult and engage with
                workers</strong> (and their representatives) on matters connected with
                the project that may affect their health, safety, or welfare. This goes
                significantly beyond simply informing workers — it requires genuine,
                two-way communication.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  What Worker Consultation Means in Practice
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Providing information</strong> &mdash;
                      workers must be given information about the risks on site, the
                      measures in place to control those risks, and any changes that
                      affect their health and safety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Listening to concerns</strong> &mdash;
                      workers must have a means of raising health and safety concerns
                      and the PC must ensure those concerns are heard, considered, and
                      responded to
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Engaging representatives</strong> &mdash;
                      where workers have elected safety representatives or trade union
                      representatives, the PC must engage with them. On larger sites,
                      the PC may facilitate worker safety forums or committees.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Acting on feedback</strong> &mdash;
                      consultation is not meaningful if the PC does not act on what
                      workers tell them. If a worker reports an unsafe condition, the
                      PC must investigate and, where appropriate, take corrective action.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Worker Safety Forums
                </p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    On larger projects, the PC may establish a <strong>worker safety
                    forum</strong> — a regular meeting where worker representatives from
                    each contractor can raise issues, discuss risks, and propose
                    improvements. These forums are a practical way of fulfilling the
                    consultation duty and can be highly effective at identifying hazards
                    that management may not be aware of.
                  </p>
                  <p>
                    Typical agenda items include: review of recent accidents or near
                    misses, upcoming high-risk activities, welfare issues, housekeeping
                    standards, and any suggestions from the workforce. Minutes should be
                    taken and actions tracked to completion.
                  </p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Why It Matters:</strong> Workers
                  are the people most exposed to construction risks. They often have
                  the best knowledge of what is actually happening at the workface,
                  and their observations can identify hazards before they cause harm.
                  Research consistently shows that sites with genuine worker
                  engagement have better safety performance. Consultation is not a
                  bureaucratic obligation — it is a practical safety measure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 08 — Monitoring & Compliance                     */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">08</span>
            Monitoring &amp; Compliance
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Planning and coordination are essential, but they are only effective if
                the PC <strong>actively monitors</strong> what is actually happening on
                site. Monitoring is the process of checking that the systems, procedures,
                and controls set out in the construction phase plan are being followed
                in practice — and taking action when they are not.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Monitoring Activities
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regular inspections</strong> &mdash;
                      the PC (or their site management team) should carry out regular
                      walk-around inspections of the entire site. These should cover
                      housekeeping, scaffolding, edge protection, excavations, welfare
                      facilities, fire precautions, and compliance with site rules. The
                      frequency depends on the size and risk profile of the project.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Audits</strong> &mdash;
                      more formal, systematic reviews of specific areas such as permit
                      systems, induction records, method statement compliance, COSHH
                      assessments, and plant inspection records. Audits may be carried
                      out by the PC&rsquo;s own team or by external specialists.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Non-compliance procedures</strong> &mdash;
                      when the PC identifies non-compliance with site rules, method
                      statements, or legal requirements, they must have a clear procedure
                      for dealing with it. This typically includes verbal warnings,
                      written non-compliance notices, stop-work instructions, and
                      ultimately removal from site for serious or repeated breaches.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Prohibition of unsafe work</strong> &mdash;
                      the PC has the authority and the duty to <strong>stop any work
                      activity</strong> that they believe presents an immediate risk to
                      health and safety. This power must be exercised without hesitation.
                      Work must not resume until the issue has been resolved.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Liaison with HSE</strong> &mdash;
                      on notifiable projects, the PC may receive visits from HSE
                      inspectors. The PC must cooperate with inspectors, provide access
                      to documents (including the construction phase plan and induction
                      records), and respond to any enforcement action promptly. The PC
                      should also report notifiable accidents, dangerous occurrences,
                      and occupational diseases under RIDDOR.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Enforcement Reality
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If an HSE inspector visits a site and finds serious non-compliance,
                  the <strong>Principal Contractor</strong> is typically the first
                  dutyholder to face enforcement action — whether that is an improvement
                  notice, a prohibition notice, or prosecution. The PC cannot defend
                  themselves by saying &ldquo;it was the subcontractor&rsquo;s
                  fault.&rdquo; The PC&rsquo;s duty is to <strong>monitor and
                  control</strong> the construction phase, and a failure to do so is a
                  breach of their own legal obligations.
                </p>
              </div>

              <p>
                Effective monitoring creates a <strong>feedback loop</strong>: inspections
                identify issues, corrective actions are taken, and the results are checked
                at the next inspection. Over time, this cycle drives continuous
                improvement in safety standards. The PC should track trends in
                non-compliance, near misses, and accidents, and use this data to target
                areas that need additional attention.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  DIAGRAM 1 — PC Responsibilities Through Project Phases   */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">&mdash;</span>
            PC Responsibilities Through Project Phases
          </h2>
          <div className="space-y-4">
            {/* Pre-Construction */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Pre-Construction Phase
                </p>
                <p className="text-white/60 text-xs">
                  From appointment to start on site
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Review pre-construction information from the client and PD</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Draw up the construction phase plan</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Establish site rules and access arrangements</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Plan welfare provision and emergency procedures</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Prepare site induction materials</span>
                </div>
              </div>
            </div>

            {/* Construction Phase */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Construction Phase
                </p>
                <p className="text-white/60 text-xs">
                  Active work on site
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Deliver site inductions to all workers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Coordinate cooperation between contractors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Enforce site rules and manage access</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Monitor compliance through inspections and audits</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Consult and engage with workers (Reg 14)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Update the construction phase plan as work progresses</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Liaise with PD and provide information for the H&amp;S file</span>
                </div>
              </div>
            </div>

            {/* Handover Phase */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Handover &amp; Close-Out
                </p>
                <p className="text-white/60 text-xs">
                  Completion and demobilisation
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Provide as-built information to the PD for the H&amp;S file</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Ensure safe demobilisation of plant, materials, and temporary works</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Close out outstanding safety actions and non-compliance items</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Lessons learned review for future projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  DIAGRAM 2 — Construction Phase Plan Contents Checklist   */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">&mdash;</span>
            Construction Phase Plan &mdash; Contents Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Management Column */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Management Arrangements
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm">
                {[
                  "Project description and scope of works",
                  "Management structure and organogram",
                  "Roles and responsibilities of all dutyholders",
                  "Communication and reporting arrangements",
                  "Change management process",
                  "Competence and training requirements",
                  "Selection and control of subcontractors",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400/60 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Site Rules Column */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Site Rules &amp; Procedures
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm">
                {[
                  "Site access and security arrangements",
                  "Working hours and shift patterns",
                  "PPE requirements by zone",
                  "Permit-to-work procedures",
                  "Housekeeping standards",
                  "Alcohol, drugs, and smoking policy",
                  "Disciplinary procedures for breaches",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400/60 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* H&S Arrangements Column */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Health &amp; Safety Arrangements
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm">
                {[
                  "Emergency procedures and fire plan",
                  "First aid provision and appointed persons",
                  "Welfare facilities plan",
                  "Accident and incident reporting (RIDDOR)",
                  "Occupational health monitoring",
                  "Environmental controls (dust, noise, vibration)",
                  "Consultation and engagement arrangements",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400/60 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific Risks Column */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-3">
                <p className="text-blue-400 font-semibold text-base">
                  Specific Risk Procedures
                </p>
              </div>
              <div className="p-4 space-y-2 text-sm">
                {[
                  "Work at height (scaffolding, ladders, MEWP)",
                  "Excavations and ground works",
                  "Confined space entry",
                  "Work near live services (electrical, gas)",
                  "Asbestos and hazardous substances",
                  "Manual handling and heavy lifting",
                  "Temporary works design and management",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400/60 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
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
            <Link to="../cdm-regulations-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Principal Designer
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-2-section-4">
              Next: Contractors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
