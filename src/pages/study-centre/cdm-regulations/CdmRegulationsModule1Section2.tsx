import { ArrowLeft, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 02, 04, 06      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "cdm-1994-planning-supervisor",
    question:
      "CDM 1994 introduced a new role responsible for coordinating health and safety during the design phase. What was this role called?",
    options: [
      "CDM coordinator",
      "Principal designer",
      "Planning supervisor",
      "Health and safety adviser",
    ],
    correctIndex: 2,
    explanation:
      "CDM 1994 introduced the planning supervisor role. This person was responsible for coordinating health and safety aspects of the design phase, ensuring the pre-tender health and safety plan was prepared, and developing the health and safety file. The role was widely criticised for being unclear in practice and was replaced by the CDM coordinator in 2007.",
  },
  {
    id: "cdm-2007-notification",
    question:
      "Under CDM 2007, at what threshold was a project required to be notified to the HSE?",
    options: [
      "Any project lasting more than 14 days",
      "Any project with more than 5 workers on site at any one time",
      "Projects lasting more than 30 days or exceeding 500 person-days of construction work",
      "Only projects with a value exceeding \u00a3250,000",
    ],
    correctIndex: 2,
    explanation:
      "CDM 2007 required notification to the HSE for projects lasting more than 30 construction days or involving more than 500 person-days of construction work. This threshold was retained in CDM 2015. Notification must be made on an F10 form before construction work begins.",
  },
  {
    id: "cdm-2015-principal-designer",
    question:
      "CDM 2015 replaced the CDM coordinator with which new role?",
    options: [
      "Planning supervisor",
      "Principal designer",
      "Design risk manager",
      "Client adviser",
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 replaced the CDM coordinator with the principal designer. Unlike the CDM coordinator, the principal designer must be a designer (an organisation or individual that carries out design work). This ensures the person coordinating health and safety in the pre-construction phase has genuine design competence and influence over design decisions.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Why did the UK need CDM regulations when the Health and Safety at Work Act 1974 already existed?",
    answer:
      "The Health and Safety at Work Act 1974 (HSWA) provides general duties for all workplaces, but it does not address the unique risks of construction projects where multiple employers, designers, and contractors interact on temporary sites. Construction consistently had the worst fatality and serious injury rates of any UK industry. The EU Temporary or Mobile Construction Sites Directive (92/57/EEC) required member states to implement specific construction regulations. CDM was the UK\u2019s response, creating a framework of duties specifically designed for the multi-party, multi-phase nature of construction projects \u2014 something HSWA alone could not adequately address.",
  },
  {
    question:
      "What was wrong with the planning supervisor role under CDM 1994?",
    answer:
      "The planning supervisor role was widely criticised for several reasons. First, the title was misleading \u2014 many people assumed it meant a site-based supervisor, when in reality it was a design-phase coordination role. Second, there was no requirement for the planning supervisor to be a designer, so the role was often filled by health and safety consultants who had no design influence. Third, the role became associated with bureaucratic paper exercises rather than genuine risk management. Fourth, many planning supervisors focused on compiling large health and safety plans and files without understanding the practical design decisions that could eliminate or reduce risk. The HSE\u2019s own review concluded that the role had failed to deliver the intended improvements.",
  },
  {
    question:
      "How does the principal designer role under CDM 2015 differ from the CDM coordinator role under CDM 2007?",
    answer:
      "The key difference is that the principal designer must be a designer \u2014 an organisation or individual that prepares or modifies designs, drawings, specifications, or bills of quantities for construction work. The CDM coordinator did not need to be a designer and was often a health and safety consultant with no direct influence over design decisions. The principal designer is expected to use their design competence to plan, manage, monitor, and coordinate health and safety in the pre-construction phase, including ensuring that designers comply with their duties. The role is intended to embed health and safety into the design process itself, rather than treating it as an add-on activity managed by a separate coordinator.",
  },
  {
    question:
      "Did CDM 2015 change the notification threshold for projects?",
    answer:
      "No. CDM 2015 retained the same notification threshold that was introduced in CDM 2007. A project must be notified to the HSE if the construction phase is likely to last longer than 30 working days and have more than 20 workers simultaneously at any point, or exceed 500 person-days of construction work. Notification is made on an F10 form and must be given as soon as practicable before the construction phase begins. The F10 must be displayed in the construction site office. One change in CDM 2015 is that the client is now explicitly responsible for ensuring notification is made, whereas under CDM 2007 this was the CDM coordinator\u2019s duty.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz (8 questions)                                  */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which piece of legislation provided the general framework for workplace health and safety in the UK before CDM was introduced?",
    options: [
      "Factories Act 1961",
      "Health and Safety at Work Act 1974",
      "Construction (General Provisions) Regulations 1961",
      "EU Directive 92/57/EEC",
    ],
    correctAnswer: 1,
    explanation:
      "The Health and Safety at Work Act 1974 (HSWA) established the general legal framework for workplace health and safety in the UK, placing duties on employers, employees, and the self-employed. However, it was a general Act that applied to all industries and did not specifically address the unique multi-party risks of construction projects.",
  },
  {
    id: 2,
    question:
      "What was the primary purpose of the EU Temporary or Mobile Construction Sites Directive 92/57/EEC?",
    options: [
      "To ban all construction work lasting more than 30 days",
      "To set minimum health and safety requirements for temporary or mobile construction sites across EU member states",
      "To require all construction workers to hold a CSCS card",
      "To introduce the CDM coordinator role across Europe",
    ],
    correctAnswer: 1,
    explanation:
      "EU Directive 92/57/EEC set out minimum health and safety requirements for temporary or mobile construction sites. It required member states to implement national legislation achieving these minimum standards. The UK fulfilled this obligation by introducing the Construction (Design and Management) Regulations 1994.",
  },
  {
    id: 3,
    question:
      "CDM 1994 introduced several new concepts to UK construction health and safety. Which of the following was NOT one of them?",
    options: [
      "Planning supervisor",
      "Principal contractor",
      "Principal designer",
      "Health and safety file",
    ],
    correctAnswer: 2,
    explanation:
      "The principal designer role was introduced by CDM 2015, not CDM 1994. CDM 1994 introduced the planning supervisor, principal contractor, health and safety plan, and health and safety file as its key new concepts.",
  },
  {
    id: 4,
    question:
      "Which of the following was a major criticism of CDM 1994?",
    options: [
      "It applied to domestic clients",
      "It required too many workers on site",
      "It was seen as a bureaucratic paper exercise that failed to improve safety outcomes",
      "It gave too much power to designers",
    ],
    correctAnswer: 2,
    explanation:
      "A major criticism of CDM 1994 was that it became a bureaucratic paper exercise. The planning supervisor role was often filled by people who produced large health and safety plans and files without genuinely influencing design decisions or site safety. The regulations were perceived as creating paperwork rather than delivering real improvements in construction health and safety.",
  },
  {
    id: 5,
    question:
      "What role replaced the planning supervisor when CDM 2007 came into force?",
    options: [
      "Principal designer",
      "CDM coordinator",
      "Client adviser",
      "Design risk manager",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2007 replaced the planning supervisor with the CDM coordinator. The intention was to clarify the role and improve coordination of health and safety during the design phase. However, the CDM coordinator role was itself criticised for similar reasons \u2014 it was often filled by health and safety consultants who lacked design influence.",
  },
  {
    id: 6,
    question:
      "Under CDM 2015, which of the following groups were brought into scope for the first time?",
    options: [
      "Principal contractors",
      "Commercial clients",
      "Domestic clients",
      "Designers",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 brought domestic clients (people having construction work done on their own home) into scope for the first time. Under previous versions, domestic projects were largely exempt. Under CDM 2015, domestic client duties normally pass to the contractor or principal contractor, so the domestic client does not have to take active steps themselves unless they choose to.",
  },
  {
    id: 7,
    question:
      "Which approved code of practice (ACoP) accompanies CDM 2015?",
    options: [
      "L54 \u2014 Managing Construction for Health and Safety",
      "L144 \u2014 Managing Health and Safety in Construction",
      "L153 \u2014 Managing Health and Safety in Construction",
      "L138 \u2014 Dangerous Substances and Explosive Atmospheres",
    ],
    correctAnswer: 2,
    explanation:
      "L153 \u2014 Managing Health and Safety in Construction is the approved code of practice that accompanies CDM 2015. It replaced L144, which accompanied CDM 2007. L153 provides practical guidance on how to comply with the regulations and has special legal status: if you are prosecuted for a breach of CDM 2015 and it is proved that you did not follow L153, a court will find you at fault unless you can demonstrate you complied in an equally effective way.",
  },
  {
    id: 8,
    question:
      "Which statement best describes the key difference between the CDM coordinator (CDM 2007) and the principal designer (CDM 2015)?",
    options: [
      "The CDM coordinator worked on site; the principal designer works in an office",
      "The principal designer must be a designer with design competence; the CDM coordinator did not need to be a designer",
      "The CDM coordinator had more legal duties than the principal designer",
      "There is no practical difference \u2014 only the title changed",
    ],
    correctAnswer: 1,
    explanation:
      "The principal designer must be a designer \u2014 an organisation or individual that prepares or modifies designs for construction work. This was the most significant change from the CDM coordinator, who did not need to be a designer. The intention is to ensure the person coordinating pre-construction health and safety has genuine design competence and can influence design decisions to eliminate or reduce risks at source.",
  },
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CdmRegulationsModule1Section2() {
  useSEO({
    title: "History & Evolution of CDM | CDM Regulations Module 1.2",
    description:
      "How CDM regulations evolved from CDM 1994 through CDM 2007 to CDM 2015. The EU Directive origin, key roles, notification thresholds, and the changes at each stage.",
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
            <Link to="../cdm-regulations-module-1">
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
            <Clock className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            History &amp; Evolution
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How CDM regulations evolved from pre-CDM legislation through CDM 1994 and CDM 2007 to the current CDM 2015 framework, and the key changes at each stage
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>3 versions:</strong> CDM 1994 &rarr; CDM 2007 &rarr; CDM 2015 (current)</li>
              <li><strong>EU origin:</strong> Directive 92/57/EEC required UK implementation</li>
              <li><strong>Key shift:</strong> Planning supervisor &rarr; CDM coordinator &rarr; principal designer</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>CDM 2015:</strong> Current regulations &mdash; in force since 6 April 2015</li>
              <li><strong>Domestic clients:</strong> Brought into scope for the first time in 2015</li>
              <li><strong>ACoP:</strong> L153 replaced L144 as the approved code of practice</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the legislation that preceded CDM and why it was insufficient for construction",
              "Explain the EU Directive that led to the introduction of CDM in the UK",
              "Outline the key features and roles introduced by CDM 1994",
              "Identify the problems and shortcomings of CDM 1994 and CDM 2007",
              "Describe the main changes introduced by CDM 2007 and CDM 2015",
              "Compare the principal designer role with the CDM coordinator and planning supervisor",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — Before CDM                                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            Before CDM
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before the CDM Regulations existed, UK construction health and safety was governed by a
                patchwork of older legislation that was not specifically designed for the modern,
                multi-party nature of construction projects.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Pre-CDM Legislation</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Factories Act 1961</strong> &mdash; Provided basic safety
                      requirements for factory and construction workplaces, including provisions for scaffolding,
                      hoists, and excavations. It was prescriptive but narrow, focusing on physical conditions
                      rather than management systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Construction (General Provisions) Regulations 1961</strong>
                      &mdash; Made under the Factories Act, these regulations set out specific requirements for
                      construction sites including safe access, scaffolding standards, and excavation support.
                      They dealt with physical safeguards but did not address design, planning, or management
                      coordination.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Health and Safety at Work Act 1974 (HSWA)</strong> &mdash;
                      The landmark Act that established the modern framework of health and safety law in the UK.
                      It placed general duties on employers, employees, and the self-employed. However, HSWA was
                      a general Act applying to all industries and did not specifically address construction&rsquo;s
                      unique multi-employer, multi-phase risks.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Construction: The Most Dangerous Industry</p>
                </div>
                <p className="text-sm text-white/80">
                  Throughout the 1980s and early 1990s, construction consistently had the highest rate of
                  fatal and serious injuries of any UK industry. Workers were being killed and seriously
                  injured at a rate far exceeding other sectors. The existing legislation focused on
                  physical site conditions but failed to address the root causes of construction accidents:
                  <strong className="text-white"> poor design decisions, lack of coordination between
                  parties, inadequate planning, and unclear responsibilities</strong>. It was clear that
                  a fundamentally different regulatory approach was needed.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">The Gap:</strong> The pre-CDM legislation placed duties
                  on contractors and employers on site, but it did not place any specific duties on
                  <strong> clients</strong> who commissioned construction work or on <strong>designers</strong>
                  whose decisions could create or eliminate risks. There was no legal requirement for
                  coordination between the multiple parties involved in a construction project. CDM was
                  designed to fill this gap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — EU Directive 92/57/EEC                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">02</span>
            EU Temporary or Mobile Construction Sites Directive 92/57/EEC
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The catalyst for CDM was the European Union. In 1992, the EU adopted
                <strong> Council Directive 92/57/EEC</strong> on the implementation of minimum health
                and safety requirements at temporary or mobile construction sites. This Directive was
                the eighth individual Directive within the meaning of Article 16(1) of Directive
                89/391/EEC (the &ldquo;Framework Directive&rdquo;).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Requirements of the Directive</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Coordination during design and planning</strong> &mdash;
                      Member states were required to ensure that health and safety was considered during the
                      design and planning stages, not just during construction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Appointment of coordinators</strong> &mdash; The Directive
                      required the appointment of a coordinator for health and safety during both the project
                      preparation stage and the project execution stage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Health and safety plans</strong> &mdash; A health and
                      safety plan was required before the construction site was set up.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Prior notification</strong> &mdash; Certain projects
                      (based on size and duration thresholds) had to be notified to the competent authority
                      before work commenced.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minimum requirements</strong> &mdash; The Directive set
                      minimum standards; member states were free to implement stricter provisions.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">UK Implementation Obligation:</strong> As a member state
                  of the EU, the UK was legally required to transpose the Directive into national law. The
                  UK fulfilled this obligation by introducing the <strong>Construction (Design and
                  Management) Regulations 1994</strong>, which came into force on 31 March 1995. The UK
                  chose to go beyond the minimum requirements of the Directive in several areas, reflecting
                  the particularly poor safety record of the UK construction industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — CDM 1994                                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">03</span>
            CDM 1994 &mdash; The First UK Implementation
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction (Design and Management) Regulations 1994 (CDM 1994) came into force on
                31 March 1995. They represented a fundamental shift in UK construction health and safety
                law by placing duties on parties who had previously had no specific legal obligations in
                relation to construction safety: <strong>clients and designers</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Features of CDM 1994</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Planning supervisor</strong> &mdash; A new role
                      responsible for coordinating health and safety during the design phase, ensuring
                      designers complied with their duties, preparing the pre-tender health and safety
                      plan, and developing the health and safety file.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Principal contractor</strong> &mdash; The contractor
                      appointed by the client to manage the construction phase, develop and implement the
                      construction phase health and safety plan, and coordinate the activities of all
                      contractors on site.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Health and safety plan</strong> &mdash; Required in
                      two stages: a pre-tender plan (prepared by the planning supervisor) containing
                      information about risks and site conditions, and a construction phase plan (developed
                      by the principal contractor) setting out how the work would be managed safely.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Health and safety file</strong> &mdash; A document
                      compiled during the project containing information about the completed structure that
                      would be needed for future maintenance, cleaning, renovation, or demolition work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competence and resources</strong> &mdash; Clients were
                      required to be reasonably satisfied that all appointees (planning supervisor, designers,
                      principal contractor, contractors) were competent and had adequate resources for health
                      and safety.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Significance:</strong> CDM 1994 was genuinely
                  groundbreaking. For the first time in the UK, <strong>clients</strong> had legal duties
                  relating to construction health and safety, and <strong>designers</strong> were required
                  to consider how their designs could be constructed, maintained, and eventually demolished
                  safely. The principle of &ldquo;designing out risk&rdquo; was established in law.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Problems with CDM 1994                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">04</span>
            Problems with CDM 1994
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite its groundbreaking intentions, CDM 1994 was widely criticised in practice. The
                HSE conducted a major review of the regulations and found significant problems with how
                they were being implemented across the industry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Criticisms</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bureaucracy</strong> &mdash; The regulations were
                      perceived as creating vast amounts of paperwork without delivering proportionate
                      safety improvements. Health and safety plans often ran to hundreds of pages of
                      generic text with little practical value.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Paper exercise perception</strong> &mdash; Many in
                      the industry viewed CDM as a &ldquo;tick-box&rdquo; exercise. The focus was on
                      producing documents (plans, files, risk assessments) rather than on genuinely
                      managing risk through better design and coordination.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Planning supervisor role confusion</strong> &mdash;
                      The title &ldquo;planning supervisor&rdquo; was misleading. Many assumed it was a
                      site-based supervisory role, when in fact it was a design-phase coordination role.
                      There was no requirement for the planning supervisor to be a designer, so the role
                      was frequently filled by health and safety consultants who had no influence over
                      design decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ACoP complexity</strong> &mdash; The Approved Code of
                      Practice accompanying CDM 1994 was considered complex and difficult to understand,
                      particularly for smaller businesses and those new to the regulations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Small project exemptions</strong> &mdash; CDM 1994
                      contained exemptions for smaller projects (fewer than 5 workers), which meant many
                      construction projects fell outside the regulations entirely. This was problematic
                      because small sites are not inherently safer than large ones.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Core Failure</p>
                </div>
                <p className="text-sm text-white/80">
                  The fundamental problem was that CDM 1994 created a structure of roles and documents,
                  but the industry often treated these as administrative requirements rather than as tools
                  for genuinely managing risk. The planning supervisor became a &ldquo;postbox&rdquo; for
                  collecting and distributing information, rather than actively influencing design and
                  construction to be safer. <strong className="text-white">The regulations had the right
                  principles but the wrong implementation.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05 — CDM 2007                                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">05</span>
            CDM 2007
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction (Design and Management) Regulations 2007 (CDM 2007) came into force on
                6 April 2007, replacing CDM 1994 and also revoking the Construction (Health, Safety and
                Welfare) Regulations 1996, consolidating construction health and safety into a single set
                of regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Changes in CDM 2007</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">CDM coordinator replaced planning supervisor</strong>
                      &mdash; The planning supervisor role was abolished and replaced by the CDM coordinator.
                      The new title was intended to better reflect the coordination function of the role and
                      avoid the &ldquo;supervisor&rdquo; confusion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">New ACoP (L144)</strong> &mdash; A new Approved Code
                      of Practice, L144 &ldquo;Managing Health and Safety in Construction&rdquo;, replaced
                      the CDM 1994 ACoP. L144 was intended to be clearer and more practical.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Notification threshold</strong> &mdash; Projects had
                      to be notified to the HSE if they lasted more than 30 construction days or exceeded
                      500 person-days of construction work. Notification was made on the F10 form.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Consolidation</strong> &mdash; CDM 2007 brought
                      together the management requirements of CDM 1994 with the site welfare and safety
                      requirements of the Construction (Health, Safety and Welfare) Regulations 1996 into
                      one set of regulations. This simplified compliance by having a single reference point.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Improved clarity on duties</strong> &mdash; The
                      regulations attempted to provide clearer duties for clients, designers, CDM
                      coordinators, principal contractors, and contractors. The concept of
                      &ldquo;competence&rdquo; was given more detailed guidance.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">On Competence:</strong> CDM 2007 introduced a detailed
                  competence assessment framework. Clients had to take reasonable steps to ensure that all
                  appointees were competent. This included assessing experience, training, qualifications,
                  track record, and the resources available for health and safety. In practice, this led to
                  extensive pre-qualification questionnaires (PQQs) that became another source of
                  bureaucratic complaint.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06 — CDM 2007 Shortcomings                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">06</span>
            CDM 2007 Shortcomings
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While CDM 2007 improved on CDM 1994 in several ways, it did not resolve all the
                underlying problems. The HSE conducted a further review and identified continuing
                shortcomings that would eventually lead to CDM 2015.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Continuing Problems</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">CDM coordinator role still problematic</strong> &mdash;
                      Despite the name change, the CDM coordinator role suffered many of the same problems as
                      the planning supervisor. There was still no requirement for the CDM coordinator to be a
                      designer. The role was frequently outsourced to health and safety consultants who had no
                      design influence. Many CDM coordinators focused on producing documents rather than
                      influencing design decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cost versus value debate</strong> &mdash; Many clients
                      and contractors questioned whether the cost of appointing a CDM coordinator and
                      complying with the administrative requirements delivered proportionate safety benefits.
                      The perception of CDM as a &ldquo;cost without value&rdquo; persisted.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Design risk management not embedded</strong> &mdash;
                      Designers were still not fully engaging with their CDM duties. The concept of
                      &ldquo;designing out risk&rdquo; was accepted in principle but inconsistently applied
                      in practice. Many designers treated risk assessment as a separate paperwork exercise
                      rather than an integral part of the design process.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Client duties still unclear</strong> &mdash; Many
                      clients, particularly those who were not regular commissioners of construction work,
                      did not understand their duties under CDM 2007. The distinction between commercial
                      clients and domestic clients created confusion, and domestic clients were largely
                      exempt from the regulations.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Lofstedt Review</p>
                </div>
                <p className="text-sm text-white/80">
                  In 2011, Professor Ragnar Lofstedt published his independent review of health and safety
                  legislation, <em>&ldquo;Reclaiming Health and Safety for All&rdquo;</em>. The review
                  recommended that CDM be revised to reduce bureaucracy, improve clarity, and ensure the
                  regulations focused on genuine risk management rather than paperwork. Lofstedt
                  specifically recommended <strong className="text-white">replacing the CDM coordinator
                  role with a requirement that the coordination function be carried out by someone with
                  design expertise</strong>. This recommendation directly influenced CDM 2015.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07 — CDM 2015                                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">07</span>
            CDM 2015 &mdash; The Current Regulations
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction (Design and Management) Regulations 2015 (CDM 2015) came into force on
                6 April 2015. They are the current regulations governing health and safety management on
                construction projects in Great Britain and represent the most significant revision since
                CDM was first introduced.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Features of CDM 2015</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Principal designer replaced CDM coordinator</strong>
                      &mdash; The most significant change. The principal designer must be a designer (an
                      organisation or individual that carries out design work). This ensures the person
                      coordinating pre-construction health and safety has genuine design competence and
                      influence over design decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Domestic clients brought into scope</strong> &mdash;
                      For the first time, domestic clients (people having construction work done on their
                      own home) are within the scope of CDM. However, their duties are automatically
                      transferred to the contractor (for single-contractor projects) or principal contractor
                      (for multi-contractor projects), so domestic clients do not have to take active steps
                      unless they choose to appoint a principal designer or principal contractor themselves.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Notification threshold retained</strong> &mdash; The
                      same threshold applies: projects lasting more than 30 working days with more than 20
                      workers simultaneously at any point, or exceeding 500 person-days. The F10 form is
                      still used for notification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Simpler structure</strong> &mdash; CDM 2015 has a
                      simpler, more logical structure than its predecessors. It is organised around the five
                      duty-holder roles: client, principal designer, designer, principal contractor, and
                      contractor. Each role has clear, specific duties.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Worker duties added</strong> &mdash; CDM 2015
                      explicitly includes duties for workers for the first time. Workers must report
                      anything they see that is likely to endanger their own or others&rsquo; safety, and
                      must cooperate with their employer and other duty holders.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">L153 guidance</strong> &mdash; CDM 2015 is accompanied
                      by L153, &ldquo;Managing Health and Safety in Construction&rdquo;. L153 is the
                      Approved Code of Practice and provides practical guidance. It replaced L144 (which
                      accompanied CDM 2007). L153 has special legal status: failure to follow it can be
                      used as evidence in court proceedings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competence replaced by skills, knowledge, experience,
                      and organisational capability</strong> &mdash; The formal &ldquo;competence
                      assessment&rdquo; requirement of CDM 2007 was replaced by a requirement to ensure
                      appointees have the skills, knowledge, experience, and (for organisations)
                      organisational capability to carry out the work safely.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Still in Force:</strong> CDM 2015 remains the current
                  legislation. There have been no amendments or replacements since it came into force.
                  All construction projects in Great Britain (England, Scotland, and Wales) must comply
                  with CDM 2015. Northern Ireland has its own equivalent legislation, the Construction
                  (Design and Management) Regulations (Northern Ireland) 2016.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08 — Key Changes CDM 2007 to 2015                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">08</span>
            Key Changes: CDM 2007 &rarr; CDM 2015
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The transition from CDM 2007 to CDM 2015 involved several important changes. The
                following comparison highlights the most significant differences between the two
                versions.
              </p>

              {/* Comparison Table */}
              <div className="overflow-hidden rounded-xl border border-white/10">
                <div className="bg-blue-500/10 border-b border-white/10 px-4 py-3">
                  <p className="text-sm font-semibold text-blue-400">CDM 2007 vs CDM 2015 &mdash; Key Changes</p>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    {
                      area: "Design-phase coordination",
                      cdm2007: "CDM coordinator (did not need to be a designer)",
                      cdm2015: "Principal designer (must be a designer)",
                    },
                    {
                      area: "Domestic clients",
                      cdm2007: "Largely exempt from CDM duties",
                      cdm2015: "Brought into scope; duties transfer to contractor/principal contractor",
                    },
                    {
                      area: "Worker duties",
                      cdm2007: "No specific worker duties in CDM",
                      cdm2015: "Explicit duties for workers to report dangers and cooperate",
                    },
                    {
                      area: "Competence assessment",
                      cdm2007: "Formal competence assessment framework",
                      cdm2015: "Skills, knowledge, experience, and organisational capability",
                    },
                    {
                      area: "ACoP",
                      cdm2007: "L144 \u2014 Managing Health and Safety in Construction",
                      cdm2015: "L153 \u2014 Managing Health and Safety in Construction",
                    },
                    {
                      area: "Notification threshold",
                      cdm2007: ">30 days or >500 person-days",
                      cdm2015: ">30 days with >20 workers, or >500 person-days (retained)",
                    },
                    {
                      area: "Structure",
                      cdm2007: "Combined management and welfare into one set of regulations",
                      cdm2015: "Simpler structure organised around five duty-holder roles",
                    },
                    {
                      area: "Client duties",
                      cdm2007: "Duties existed but were often unclear in practice",
                      cdm2015: "Clearer, more prominent client duties including ensuring appointments are made",
                    },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3">
                      <div className="text-sm font-medium text-blue-400 sm:text-white">{row.area}</div>
                      <div className="text-xs sm:text-sm text-white/60">
                        <span className="sm:hidden text-white/40 font-medium text-[10px] uppercase tracking-wide">2007: </span>
                        {row.cdm2007}
                      </div>
                      <div className="text-xs sm:text-sm text-white/80">
                        <span className="sm:hidden text-blue-400/60 font-medium text-[10px] uppercase tracking-wide">2015: </span>
                        {row.cdm2015}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Table header for desktop */}
                <div className="hidden sm:grid grid-cols-3 gap-4 px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                  <span>Area</span>
                  <span>CDM 2007</span>
                  <span>CDM 2015</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Principal Designer vs CDM Coordinator &mdash; The Critical Difference</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      The <strong className="text-white">CDM coordinator</strong> did not need to be a
                      designer. The role was often filled by health and safety consultants who lacked
                      design expertise and had no direct influence over design decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      The <strong className="text-white">principal designer</strong> must be a designer
                      &mdash; an organisation or individual that prepares or modifies designs, drawings,
                      specifications, or bills of quantities relating to a structure. This is a fundamental
                      requirement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      The intention is that the person coordinating health and safety during the
                      pre-construction phase has <strong className="text-white">genuine design competence
                      and the ability to influence design decisions</strong> to eliminate or reduce risk
                      at source.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span>
                      The principal designer&rsquo;s duties include planning, managing, monitoring, and
                      coordinating health and safety in the pre-construction phase, and ensuring that all
                      designers comply with their duties under CDM 2015.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Domestic Client Duties:</strong> Under CDM 2015,
                  domestic clients have duties, but these are automatically transferred. On a
                  single-contractor project, the domestic client&rsquo;s duties transfer to the
                  contractor. On a project with more than one contractor, the duties transfer to the
                  principal contractor (for construction phase duties) and the principal designer (for
                  pre-construction duties). A domestic client can choose to appoint a principal
                  designer or principal contractor themselves by making a written declaration, but
                  this is not required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CDM EVOLUTION TIMELINE DIAGRAM                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
            CDM Evolution Timeline
          </h2>
          <div className="space-y-0">
            {/* Pre-CDM */}
            <div className="relative pl-8 pb-8 border-l-2 border-white/10 ml-3">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40" />
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-white/40 mb-1">Pre-1995</p>
                <p className="text-sm font-semibold text-white mb-1">Before CDM</p>
                <p className="text-xs text-white/60">
                  Factories Act 1961, Construction (General Provisions) Regulations 1961, HSWA 1974.
                  No specific duties on clients or designers. Construction was the most dangerous UK industry.
                </p>
              </div>
            </div>

            {/* EU Directive */}
            <div className="relative pl-8 pb-8 border-l-2 border-white/10 ml-3">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500/40 border-2 border-blue-400/60" />
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                <p className="text-xs text-blue-400/60 mb-1">1992</p>
                <p className="text-sm font-semibold text-blue-400 mb-1">EU Directive 92/57/EEC</p>
                <p className="text-xs text-white/60">
                  Minimum health and safety requirements for temporary or mobile construction sites.
                  UK obliged to transpose into national law.
                </p>
              </div>
            </div>

            {/* CDM 1994 */}
            <div className="relative pl-8 pb-8 border-l-2 border-white/10 ml-3">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500/60 border-2 border-blue-400/80" />
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                <p className="text-xs text-blue-400/60 mb-1">31 March 1995</p>
                <p className="text-sm font-semibold text-blue-400 mb-1">CDM 1994</p>
                <p className="text-xs text-white/60">
                  First UK implementation. Introduced planning supervisor, principal contractor, health and
                  safety plan, health and safety file. Clients and designers given duties for the first time.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">Planning supervisor</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">Principal contractor</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">H&amp;S plan</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">H&amp;S file</span>
                </div>
              </div>
            </div>

            {/* CDM 2007 */}
            <div className="relative pl-8 pb-8 border-l-2 border-white/10 ml-3">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500/80 border-2 border-blue-400" />
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                <p className="text-xs text-blue-400/60 mb-1">6 April 2007</p>
                <p className="text-sm font-semibold text-blue-400 mb-1">CDM 2007</p>
                <p className="text-xs text-white/60">
                  CDM coordinator replaced planning supervisor. New ACoP L144. Notification threshold
                  introduced (&gt;30 days or &gt;500 person-days). Consolidated with welfare regulations.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300/70">CDM coordinator</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300/70">L144 ACoP</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300/70">F10 notification</span>
                </div>
              </div>
            </div>

            {/* CDM 2015 */}
            <div className="relative pl-8 ml-3">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300 shadow-lg shadow-blue-500/30" />
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-xs text-blue-400/60 mb-1">6 April 2015</p>
                <p className="text-sm font-semibold text-blue-400 mb-1">CDM 2015 (Current)</p>
                <p className="text-xs text-white/60">
                  Principal designer replaced CDM coordinator. Domestic clients brought into scope. Worker
                  duties added. Simpler structure. L153 guidance. Notification threshold retained.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200/80">Principal designer</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200/80">Domestic clients</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200/80">Worker duties</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200/80">L153 ACoP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  KEY CHANGES COMPARISON TABLE (standalone)                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
            Role Evolution Across CDM Versions
          </h2>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="bg-blue-500/10 border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-blue-400">How Key Roles Changed: 1994 &rarr; 2007 &rarr; 2015</p>
            </div>
            <div className="divide-y divide-white/5">
              {[
                {
                  role: "Design-phase coordinator",
                  v1994: "Planning supervisor",
                  v2007: "CDM coordinator",
                  v2015: "Principal designer",
                },
                {
                  role: "Construction-phase manager",
                  v1994: "Principal contractor",
                  v2007: "Principal contractor",
                  v2015: "Principal contractor",
                },
                {
                  role: "Domestic client",
                  v1994: "Largely exempt",
                  v2007: "Largely exempt",
                  v2015: "In scope (duties transfer)",
                },
                {
                  role: "Worker duties",
                  v1994: "Not specified in CDM",
                  v2007: "Not specified in CDM",
                  v2015: "Explicit duties to report and cooperate",
                },
                {
                  role: "ACoP",
                  v1994: "CDM 1994 ACoP",
                  v2007: "L144",
                  v2015: "L153",
                },
                {
                  role: "Notification form",
                  v1994: "F10",
                  v2007: "F10",
                  v2015: "F10",
                },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3 px-4 py-3">
                  <div className="text-sm font-medium text-blue-400 sm:text-white">{row.role}</div>
                  <div className="text-xs sm:text-sm text-white/50">
                    <span className="sm:hidden text-white/30 font-medium text-[10px] uppercase tracking-wide">1994: </span>
                    {row.v1994}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    <span className="sm:hidden text-white/40 font-medium text-[10px] uppercase tracking-wide">2007: </span>
                    {row.v2007}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    <span className="sm:hidden text-blue-400/60 font-medium text-[10px] uppercase tracking-wide">2015: </span>
                    {row.v2015}
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:grid grid-cols-4 gap-3 px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/40">
              <span>Role / Feature</span>
              <span>CDM 1994</span>
              <span>CDM 2007</span>
              <span>CDM 2015</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQs                                                        */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  QUIZ                                                        */}
        {/* ============================================================ */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                           */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What Are the CDM Regulations?
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1-section-3">
              Next: Key Definitions &amp; Scope
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
