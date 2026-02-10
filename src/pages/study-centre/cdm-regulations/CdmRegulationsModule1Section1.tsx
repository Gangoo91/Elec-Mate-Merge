import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  CheckCircle,
  Scale,
  Building2,
  HardHat,
  Users,
  ShieldCheck,
  FileText,
  BarChart3,
  AlertTriangle,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cdm-statutory-instrument",
    question:
      "What is the statutory instrument number for the CDM Regulations 2015?",
    options: [
      "SI 2007/320",
      "SI 2015/51",
      "SI 1999/3242",
      "SI 2012/632",
    ],
    correctIndex: 1,
    explanation:
      "The Construction (Design and Management) Regulations 2015 were enacted as Statutory Instrument 2015 No. 51 (SI 2015/51). They came into force on 6 April 2015, replacing the earlier CDM 2007 Regulations.",
  },
  {
    id: "cdm-construction-work",
    question:
      "Which of the following is NOT included in the Regulation 2 definition of 'construction work' under CDM 2015?",
    options: [
      "Demolition of a structure",
      "Installation of mechanical or electrical services",
      "Routine office cleaning",
      "Assembly of prefabricated elements to form a structure",
    ],
    correctIndex: 2,
    explanation:
      "Routine office cleaning is not construction work under CDM 2015. The Regulation 2 definition covers building, civil engineering, and engineering construction work including alteration, fitting out, commissioning, repair, upkeep, maintenance, demolition, and the installation of mechanical and electrical services.",
  },
  {
    id: "cdm-duty-holders",
    question:
      "How many key duty holder roles are defined under the CDM Regulations 2015?",
    options: ["Three", "Four", "Five", "Six"],
    correctIndex: 2,
    explanation:
      "CDM 2015 defines five key duty holder roles: the client, the principal designer, the principal contractor, designers, and contractors. Each has specific legal duties that ensure health and safety is managed throughout the life of a construction project.",
  },
];

const faqs = [
  {
    question: "Do the CDM Regulations apply to domestic projects?",
    answer:
      "Yes. Since CDM 2015 came into force on 6 April 2015, the regulations apply to all construction projects including domestic work. However, for domestic clients (homeowners commissioning work on their own home), the duties of the client are normally transferred to the contractor or, on projects with more than one contractor, to the principal contractor and principal designer. This means domestic clients do not have to actively manage CDM duties themselves, but the work must still comply with the regulations.",
  },
  {
    question:
      "What is the difference between CDM 2015 and the previous CDM 2007 Regulations?",
    answer:
      "CDM 2015 replaced CDM 2007 with several significant changes. The CDM co-ordinator role was abolished and replaced by the principal designer, placing health and safety responsibility on someone with real design influence. The approved code of practice (ACoP) was replaced with simpler guidance (L153). The threshold for notification to the HSE was simplified. CDM 2015 also extended coverage to domestic projects for the first time and streamlined duty holder responsibilities to make them clearer and more proportionate.",
  },
  {
    question:
      "Is there a minimum project size or value below which CDM does not apply?",
    answer:
      "No. CDM 2015 applies to all construction work regardless of size, duration, or value. Even a small maintenance job carried out by a single contractor is subject to the general duties in CDM Part 2. However, the notification and documentation requirements scale proportionately — a project only needs to be notified to the HSE if it will last longer than 30 working days with more than 20 workers at any one time, or exceed 500 person-days of construction work.",
  },
  {
    question: "Do the CDM Regulations apply in Northern Ireland?",
    answer:
      "No. CDM 2015 applies in England, Scotland, and Wales (Great Britain) but not in Northern Ireland. Northern Ireland has its own separate legislation: the Construction (Design and Management) Regulations (Northern Ireland) 2016, which largely mirrors CDM 2015 but is enforced by the Health and Safety Executive for Northern Ireland (HSENI) rather than the GB HSE.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "When did the Construction (Design and Management) Regulations 2015 come into force?",
    options: [
      "1 January 2015",
      "6 April 2015",
      "1 October 2015",
      "6 April 2007",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 came into force on 6 April 2015, replacing the Construction (Design and Management) Regulations 2007. This date was chosen to align with the start of the new tax year and give industry time to prepare following the consultation period.",
  },
  {
    id: 2,
    question:
      "Which of the following is the primary purpose of the CDM Regulations?",
    options: [
      "To regulate building materials quality",
      "To improve health and safety in construction by managing risks from design through to completion",
      "To set minimum wage rates for construction workers",
      "To regulate planning permission requirements",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of CDM 2015 is to improve health and safety outcomes in the construction industry by ensuring that risks are considered and managed at every stage of a project, from initial design concept through to completion and handover. It integrates health and safety into the project management process.",
  },
  {
    id: 3,
    question: "CDM 2015 applies to construction projects in which area?",
    options: [
      "England only",
      "England and Wales only",
      "Great Britain (England, Scotland, and Wales)",
      "The entire United Kingdom",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 applies in Great Britain, meaning England, Scotland, and Wales. Northern Ireland has its own separate regulations: the Construction (Design and Management) Regulations (Northern Ireland) 2016, enforced by the HSENI.",
  },
  {
    id: 4,
    question:
      "Under CDM 2015, which of the following activities counts as 'construction work'?",
    options: [
      "Painting the interior walls of an existing office",
      "Moving furniture between rooms",
      "Delivering materials to a site entrance",
      "Conducting a desktop design review",
    ],
    correctAnswer: 0,
    explanation:
      "Under Regulation 2 of CDM 2015, construction work includes alteration, fitting out, repair, maintenance, redecoration, and similar physical work on structures. Painting interior walls falls within this definition as maintenance or redecoration work. Moving furniture, deliveries to site entrance, and desktop reviews are not construction work.",
  },
  {
    id: 5,
    question: "How many key duty holder roles does CDM 2015 define?",
    options: ["Three", "Four", "Five", "Six"],
    correctAnswer: 2,
    explanation:
      "CDM 2015 defines five key duty holder roles: (1) client, (2) principal designer, (3) principal contractor, (4) designers, and (5) contractors. Each role carries specific legal duties proportionate to their influence over health and safety on the project.",
  },
  {
    id: 6,
    question:
      "Which Act of Parliament provides the overarching legal framework under which CDM 2015 is made?",
    options: [
      "Building Act 1984",
      "Health and Safety at Work etc. Act 1974",
      "Factories Act 1961",
      "Construction Act 1996",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 is a set of regulations made under the Health and Safety at Work etc. Act 1974 (HASAWA). Section 15 of HASAWA gives the Secretary of State the power to make health and safety regulations, and CDM 2015 is one of the most important sets of regulations made under this power.",
  },
  {
    id: 7,
    question:
      "Approximately how many construction workers are killed each year in Great Britain?",
    options: [
      "5\u201310",
      "30\u201340",
      "100\u2013150",
      "Over 200",
    ],
    correctAnswer: 1,
    explanation:
      "HSE statistics consistently show approximately 30\u201340 fatal injuries to construction workers per year in Great Britain. Construction accounts for roughly 25\u201330% of all workplace fatalities despite employing around 5% of the workforce, making it one of the most dangerous industries.",
  },
  {
    id: 8,
    question:
      "Which of the following is a key principle of CDM 2015?",
    options: [
      "Health and safety should only be considered during the construction phase",
      "Only large projects need a health and safety plan",
      "Risks should be managed at the design stage before construction begins",
      "The contractor is solely responsible for all health and safety matters",
    ],
    correctAnswer: 2,
    explanation:
      "A key principle of CDM 2015 is that health and safety risks should be identified and managed as early as possible, ideally at the design stage. Designers have a legal duty to eliminate hazards and reduce risks through their design decisions. This 'prevention through design' approach is more effective and less costly than trying to manage risks on site after construction has begun.",
  },
];

export default function CdmRegulationsModule1Section1() {
  useSEO({
    title:
      "What Are the CDM Regulations? | CDM Regulations Awareness Module 1.1",
    description:
      "Introduction to the Construction (Design and Management) Regulations 2015. What CDM is, why it exists, who it applies to, key principles, duty holders, and how CDM fits with other UK health and safety legislation.",
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
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Are the CDM Regulations?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            An introduction to the Construction (Design and Management)
            Regulations 2015 &mdash; the legal framework that governs health and
            safety management on every construction project in Great Britain
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>What:</strong> Construction (Design and Management)
                Regulations 2015
              </li>
              <li>
                <strong>Legal basis:</strong> Statutory Instrument SI 2015/51
              </li>
              <li>
                <strong>In force:</strong> 6 April 2015
              </li>
              <li>
                <strong>Applies to:</strong> All construction work in Great
                Britain
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Key idea:</strong> Manage risks from design through to
                completion
              </li>
              <li>
                <strong>Five duty holders:</strong> Client, PD, PC, designers,
                contractors
              </li>
              <li>
                <strong>No threshold:</strong> Applies to all projects regardless
                of size
              </li>
              <li>
                <strong>Deaths:</strong> ~30&ndash;40 construction fatalities per
                year
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
              "Explain what the CDM Regulations 2015 are and why they were introduced",
              "Identify the statutory instrument number and the date CDM 2015 came into force",
              "Describe the scope of CDM 2015 and what counts as construction work",
              "List the five key duty holder roles defined under CDM 2015",
              "Outline the key principles underpinning CDM 2015",
              "Explain how CDM sits alongside other UK health and safety legislation",
              "Understand why CDM matters by reference to construction fatality and injury statistics",
              "Recognise the difference between CDM 2015 (GB) and CDM (NI) 2016",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction to CDM 2015 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">01</span>
            Introduction to CDM 2015
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Construction (Design and Management) Regulations
                2015</strong>, commonly referred to as <strong>CDM
                2015</strong>, are the primary set of regulations governing
                health and safety management on construction projects in Great
                Britain. They were enacted as{" "}
                <strong>Statutory Instrument 2015 No. 51 (SI 2015/51)</strong>{" "}
                and came into force on <strong>6 April 2015</strong>, replacing
                the earlier Construction (Design and Management) Regulations
                2007.
              </p>

              <p>
                CDM 2015 is made under the powers of the{" "}
                <strong>Health and Safety at Work etc. Act 1974</strong>{" "}
                (HASAWA), which is the overarching piece of legislation that
                provides the legal framework for workplace health and safety in
                Great Britain. Section 15 of HASAWA gives the Secretary of State
                the power to make regulations, and CDM 2015 is one of the most
                important sets of regulations made under this power. It is
                enforced by the <strong>Health and Safety Executive (HSE)</strong>.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Legal Reference:</strong>{" "}
                  The full title is &ldquo;The Construction (Design and
                  Management) Regulations 2015&rdquo;, Statutory Instrument 2015
                  No. 51. The regulations are arranged in five parts: Part 1
                  (Commencement, interpretation, and application), Part 2 (Client
                  duties), Part 3 (Health and safety duties and roles), Part 4
                  (General requirements for all construction sites), and Part 5
                  (General). A supporting document,{" "}
                  <strong>L153 &ldquo;Managing health and safety in
                  construction&rdquo;</strong>, provides guidance on how to comply
                  with the regulations.
                </p>
              </div>

              <p>
                CDM 2015 replaced the CDM 2007 Regulations following an
                extensive review led by Professor Ragnar L&ouml;fstedt in 2011.
                The L&ouml;fstedt Review recommended that CDM be simplified,
                that the role of CDM co-ordinator be abolished, and that the
                regulations be extended to cover domestic projects. These
                recommendations were largely adopted, resulting in a streamlined
                framework that placed greater emphasis on{" "}
                <strong>duty holder cooperation</strong>,{" "}
                <strong>design-stage risk management</strong>, and{" "}
                <strong>proportionate application</strong> across all project
                types and sizes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Fact</p>
                <p className="text-sm text-white/80">
                  CDM 2015 replaced both the Construction (Design and Management)
                  Regulations 2007 <strong>and</strong> the Construction (Health,
                  Safety and Welfare) Regulations 1996, consolidating construction
                  health and safety requirements into a single set of
                  regulations. This simplification was a deliberate effort to
                  reduce regulatory burden whilst maintaining or improving
                  standards of protection.
                </p>
              </div>

              <p>
                The regulations apply to the{" "}
                <strong>entire lifecycle of a construction project</strong>:
                from initial concept and design, through procurement and
                construction, to handover and use. This lifecycle approach is
                fundamental to CDM &mdash; it recognises that many of the most
                effective ways to reduce health and safety risks involve making
                good decisions early, particularly at the design stage, rather
                than trying to manage hazards once construction work is already
                under way.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Purpose & Objectives */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">02</span>
            Purpose &amp; Objectives
          </h2>
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The overriding purpose of CDM 2015 is to{" "}
                <strong>
                  improve health and safety in the construction industry
                </strong>{" "}
                by ensuring that health and safety risks are properly considered
                and managed at every stage of a construction project. Construction
                is one of the most dangerous industries in Great Britain, and CDM
                exists because the evidence shows that many deaths, injuries, and
                cases of ill health can be prevented through better planning,
                design, and management.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Core Objectives of CDM 2015
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Integrate health and safety into project management
                      </strong>{" "}
                      &mdash; make health and safety a core consideration in every
                      project management decision, not a bolt-on afterthought
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Ensure risks are managed from design through to completion
                      </strong>{" "}
                      &mdash; address hazards at the earliest possible stage,
                      particularly through design decisions that eliminate or
                      reduce risks before construction begins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Define clear responsibilities for all duty holders
                      </strong>{" "}
                      &mdash; ensure that everyone involved in a project
                      understands their legal duties and is held accountable for
                      discharging them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Promote cooperation and coordination
                      </strong>{" "}
                      &mdash; require all duty holders to work together, share
                      information, and coordinate their activities to manage risk
                      effectively
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Ensure workers are competent and engaged
                      </strong>{" "}
                      &mdash; require that people carrying out construction work
                      have the right skills, knowledge, experience, and training,
                      and that workers are consulted on matters affecting their
                      health and safety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Apply proportionately to all projects
                      </strong>{" "}
                      &mdash; the level of planning and documentation required
                      should be proportionate to the scale and complexity of the
                      project, avoiding unnecessary bureaucracy on smaller works
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                A central theme of CDM 2015 is that{" "}
                <strong>prevention is better than cure</strong>. The regulations
                place a strong emphasis on{" "}
                <strong>eliminating hazards at the design stage</strong> wherever
                possible. This is because it is far more effective and far less
                expensive to design out a hazard before construction begins than
                to manage it on site through protective measures, safe systems
                of work, or personal protective equipment. For example, a
                designer who specifies ground-level maintenance access for
                building services has eliminated the need for work at height
                &mdash; one of the leading causes of fatal injury in
                construction.
              </p>

              <p>
                CDM 2015 also recognises that construction health and safety is
                not just about preventing traumatic injuries from falls, collapses,
                and struck-by incidents. It extends to{" "}
                <strong>occupational health</strong> &mdash; protecting workers
                from long-term health conditions caused by exposure to dust,
                noise, vibration, hazardous substances, manual handling, and
                other health hazards. Occupational ill health in construction
                kills far more people each year than workplace accidents.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Fact
                </p>
                <p className="text-sm text-white/80">
                  The HSE estimates that approximately{" "}
                  <strong className="text-blue-400">
                    3,700 construction workers die each year from occupational
                    cancers and lung diseases
                  </strong>{" "}
                  linked to past exposures &mdash; far exceeding the 30&ndash;40
                  who die from traumatic workplace injuries. CDM 2015 addresses
                  both categories of harm.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Who CDM Applies To */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">03</span>
            Who CDM Applies To
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 applies to{" "}
                <strong>
                  all construction projects carried out in Great Britain
                </strong>{" "}
                &mdash; that is, England, Scotland, and Wales. It does{" "}
                <strong>not</strong> apply in Northern Ireland, which has its own
                separate legislation: the Construction (Design and Management)
                Regulations (Northern Ireland) 2016, commonly known as CDM (NI)
                2016. The Northern Irish regulations largely mirror CDM 2015 but
                are enforced by the Health and Safety Executive for Northern
                Ireland (HSENI).
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Scope of Application
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Commercial Projects
                      </p>
                      <p className="text-xs text-white/70">
                        Offices, factories, shops, hospitals, schools &mdash; all
                        commercial construction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardHat className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Civil Engineering
                      </p>
                      <p className="text-xs text-white/70">
                        Roads, bridges, tunnels, railways, pipelines, utilities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Landmark className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Domestic Projects
                      </p>
                      <p className="text-xs text-white/70">
                        Extensions, loft conversions, rewires, kitchen fits
                        &mdash; all domestic work
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        No Minimum Threshold
                      </p>
                      <p className="text-xs text-white/70">
                        No minimum size, duration, or value &mdash; applies to
                        all work
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                One of the most significant changes introduced by CDM 2015 was
                the <strong>extension of coverage to domestic projects</strong>.
                Under the previous CDM 2007 Regulations, domestic work was
                largely excluded. CDM 2015 brought all domestic construction
                work within scope, recognising that the hazards on a domestic
                building site are no less dangerous than those on a commercial
                site. A fall from a scaffold on a house extension is just as
                likely to be fatal as a fall on a commercial development.
              </p>

              <p>
                However, the regulations recognise that domestic clients
                (homeowners) cannot reasonably be expected to manage CDM duties
                in the same way as a commercial client. Therefore, on domestic
                projects, the duties of the client are{" "}
                <strong>automatically transferred</strong>:
              </p>

              <ul className="text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    On projects with a <strong className="text-white">
                      single contractor
                    </strong>, the client duties transfer to that contractor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    On projects with{" "}
                    <strong className="text-white">
                      more than one contractor
                    </strong>, the client duties transfer to the principal
                    contractor (for managing the construction phase) and the
                    principal designer (for managing the pre-construction phase)
                  </span>
                </li>
              </ul>

              <p>
                This means that if you are a contractor carrying out a domestic
                rewire, extension, or bathroom fit, you may be taking on the
                client duties under CDM 2015 in addition to your own contractor
                duties. Understanding this is essential for every tradesperson
                working on domestic projects.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    HSE Notification
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Whilst CDM applies to all projects, not all projects need to
                  be <strong>notified</strong> to the HSE. A project must be
                  notified (using Form F10) if it will last{" "}
                  <strong>
                    longer than 30 working days and have more than 20 workers
                    working simultaneously at any point
                  </strong>, or if it will{" "}
                  <strong>exceed 500 person-days</strong> of construction work.
                  The notification must be made by the client (or the principal
                  designer on their behalf) as soon as practicable before the
                  construction phase begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: What Counts as "Construction Work" */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">04</span>
            What Counts as &ldquo;Construction Work&rdquo;
          </h2>
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The definition of <strong>&ldquo;construction work&rdquo;</strong>{" "}
                is set out in <strong>Regulation 2</strong> of CDM 2015. It is
                deliberately broad and covers a wide range of activities. If your
                work falls within this definition, CDM applies.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Regulation 2 Definition &mdash; Construction Work Includes:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The <strong className="text-white">construction,
                      alteration, conversion, fitting out, commissioning,
                      renovation, repair, upkeep, redecoration, or other
                      maintenance</strong> (including cleaning which involves the
                      use of water or an abrasive at high pressure, or the use of
                      corrosive or toxic substances) of any building or structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The <strong className="text-white">demolition or
                      dismantling</strong> of any building or structure,
                      including any part thereof
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The <strong className="text-white">preparation for an
                      intended structure</strong>, including site clearance,
                      exploration, investigation (but not site survey),
                      excavation, and laying or installing the foundations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The <strong className="text-white">assembly or
                      disassembly of prefabricated elements</strong> to form, or
                      which form part of, a structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The <strong className="text-white">removal of any
                      structure or part of a structure, or any product or waste
                      resulting from demolition</strong> or dismantling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The <strong className="text-white">installation,
                      commissioning, maintenance, repair, or removal of
                      mechanical, electrical, gas, compressed air, hydraulic,
                      telecommunications, computer, or similar services</strong>{" "}
                      which are normally fixed within or to a structure
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The definition also includes{" "}
                <strong>temporary works</strong> that are essential to the
                construction process: scaffolding, formwork, falsework, shoring,
                temporary support structures, and site hoarding. These are all
                construction work in their own right.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What This Means for Electrical Workers
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Installing a new consumer unit
                      </strong>{" "}
                      &mdash; construction work (installation of electrical
                      services fixed within a structure)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Rewiring a house
                      </strong>{" "}
                      &mdash; construction work (maintenance and repair of
                      electrical services)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Chasing walls for cables
                      </strong>{" "}
                      &mdash; construction work (alteration of a structure)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Installing temporary site lighting
                      </strong>{" "}
                      &mdash; construction work (temporary works normally fixed
                      within a structure)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Periodic inspection and testing (EICR)
                      </strong>{" "}
                      &mdash; generally <em>not</em> construction work if no
                      physical work to the installation is carried out; however,
                      if remedial work is undertaken as a result, that remedial
                      work is construction work
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The Regulation 2 definition of &ldquo;structure&rdquo; is also
                broad. It includes any building, timber, masonry, metal, or
                reinforced concrete structure; any railway line or siding, tramway
                line, dock, harbour, inland navigation, tunnel, shaft, bridge,
                viaduct, waterworks, reservoir, pipe or pipeline, cable, aqueduct,
                sewer, sewage works, or gasholder. It also includes any fixed
                plant that requires installation or dismantling before or after
                use, and any formwork, falsework, scaffold, or other temporary
                structure designed to support a permanent structure during
                construction.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Key Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">05</span>
            Key Principles of CDM 2015
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 is built on a set of fundamental principles that
                underpin every duty and requirement in the regulations.
                Understanding these principles is essential for applying CDM
                correctly and proportionately in practice.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  The Five Key Principles
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold">1</span>
                      <p className="text-sm font-medium text-white">
                        Risk Management at the Design Stage
                      </p>
                    </div>
                    <p className="text-xs text-white/70 ml-5">
                      Designers must eliminate foreseeable risks where possible,
                      reduce risks that cannot be eliminated, and provide
                      information about remaining risks. This &ldquo;prevention
                      through design&rdquo; approach is the most effective way
                      to protect construction workers because it addresses
                      hazards before anyone sets foot on site.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold">2</span>
                      <p className="text-sm font-medium text-white">
                        Duty Holder Cooperation &amp; Coordination
                      </p>
                    </div>
                    <p className="text-xs text-white/70 ml-5">
                      All duty holders must cooperate with each other, coordinate
                      their work, and communicate effectively. This is
                      particularly important where multiple designers and
                      contractors are working on the same project. The principal
                      designer and principal contractor have specific duties to
                      facilitate this cooperation.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold">3</span>
                      <p className="text-sm font-medium text-white">
                        Competence (Skills, Knowledge, Experience &amp; Training)
                      </p>
                    </div>
                    <p className="text-xs text-white/70 ml-5">
                      Everyone involved in a construction project must have the
                      skills, knowledge, experience, and (where relevant)
                      organisational capability to carry out their role safely.
                      Clients must not appoint anyone who does not have the
                      necessary competence, and organisations must ensure their
                      workers are properly trained and supervised.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold">4</span>
                      <p className="text-sm font-medium text-white">
                        Worker Engagement &amp; Consultation
                      </p>
                    </div>
                    <p className="text-xs text-white/70 ml-5">
                      Workers must be consulted on matters that affect their
                      health and safety. They must be given appropriate
                      information, instruction, and training. CDM recognises that
                      the people actually doing the work often have the best
                      knowledge of practical risks and solutions.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold">5</span>
                      <p className="text-sm font-medium text-white">
                        Proportionate Approach
                      </p>
                    </div>
                    <p className="text-xs text-white/70 ml-5">
                      The effort and documentation required should be
                      proportionate to the scale and complexity of the project
                      and the risks involved. A small domestic rewire does not
                      need the same volume of paperwork as a major infrastructure
                      project. CDM is about managing real risks, not generating
                      bureaucracy.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These principles work together. A designer who eliminates a work
                at height risk through their design (Principle 1) reduces the
                need for complex safety systems on site. A principal contractor
                who consults workers about sequencing risks (Principle 4) is
                better placed to coordinate activities safely (Principle 2). A
                client who appoints competent duty holders (Principle 3) sets the
                foundation for effective risk management throughout the project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">
                    The General Principles of Prevention:
                  </strong>{" "}
                  CDM 2015 (via Schedule 1 of the Management of Health and Safety
                  at Work Regulations 1999) requires that risks are managed in
                  accordance with the general principles of prevention. These
                  are, in order of priority: (a) avoid risks, (b) evaluate risks
                  that cannot be avoided, (c) combat risks at source, (d) adapt
                  the work to the individual, (e) adapt to technical progress,
                  (f) replace the dangerous with the non-dangerous or less
                  dangerous, (g) develop a coherent overall prevention policy,
                  (h) give collective protective measures priority over
                  individual measures, and (i) give appropriate instructions to
                  employees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Five Key Duty Holders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">06</span>
            The Five Key Duty Holders
          </h2>
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 defines <strong>five key duty holder roles</strong>.
                Each role carries specific legal responsibilities. The detailed
                duties of each role will be explored in depth in Module 2, but
                this section provides an overview of who the duty holders are and
                their primary functions.
              </p>

              {/* CDM 2015 Duty Holder Overview Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-4 text-center">
                  CDM 2015 Duty Holder Overview
                </p>

                {/* Client at the top */}
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 w-56 text-center">
                    <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">Client</p>
                    <p className="text-[10px] text-white/60">
                      Commissions the project. Makes key appointments.
                    </p>
                  </div>
                </div>

                {/* Connecting lines */}
                <div className="flex justify-center mb-1">
                  <div className="w-px h-4 bg-blue-500/40" />
                </div>
                <div className="flex justify-center mb-1">
                  <div className="w-48 h-px bg-blue-500/40" />
                </div>
                <div className="flex justify-between max-w-[200px] mx-auto mb-4">
                  <div className="w-px h-4 bg-blue-500/40" />
                  <div className="w-px h-4 bg-blue-500/40" />
                </div>

                {/* Principal Designer and Principal Contractor */}
                <div className="grid grid-cols-2 gap-3 mb-4 max-w-lg mx-auto">
                  <div className="bg-blue-400/15 border border-blue-400/30 rounded-lg p-3 text-center">
                    <FileText className="h-5 w-5 text-blue-300 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">
                      Principal Designer
                    </p>
                    <p className="text-[10px] text-white/60">
                      Plans, manages, and coordinates the pre-construction phase.
                    </p>
                  </div>
                  <div className="bg-blue-400/15 border border-blue-400/30 rounded-lg p-3 text-center">
                    <HardHat className="h-5 w-5 text-blue-300 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">
                      Principal Contractor
                    </p>
                    <p className="text-[10px] text-white/60">
                      Plans, manages, and coordinates the construction phase.
                    </p>
                  </div>
                </div>

                {/* Connecting lines to designers and contractors */}
                <div className="flex justify-between max-w-lg mx-auto mb-1">
                  <div className="w-1/4 flex justify-center">
                    <div className="w-px h-4 bg-blue-500/30" />
                  </div>
                  <div className="w-1/4 flex justify-center">
                    <div className="w-px h-4 bg-blue-500/30" />
                  </div>
                </div>

                {/* Designers and Contractors */}
                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                  <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                    <Scale className="h-5 w-5 text-white/60 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">Designers</p>
                    <p className="text-[10px] text-white/60">
                      Eliminate, reduce, and inform about risks through design.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                    <Building2 className="h-5 w-5 text-white/60 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">Contractors</p>
                    <p className="text-[10px] text-white/60">
                      Plan, manage, and carry out construction work safely.
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-white/40 text-center mt-4">
                  All five duty holders must cooperate, coordinate, and
                  communicate with each other throughout the project.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    1. Client
                  </p>
                  <p className="text-sm text-white/80">
                    The person or organisation for whom the construction project
                    is carried out. This includes both commercial clients
                    (businesses, developers, local authorities) and domestic
                    clients (homeowners). The client has overall responsibility
                    for making suitable arrangements for managing a project,
                    including allocating sufficient time and resources. The client
                    must appoint the principal designer and principal contractor
                    on projects involving more than one contractor.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    2. Principal Designer
                  </p>
                  <p className="text-sm text-white/80">
                    A designer appointed by the client to plan, manage, monitor,
                    and coordinate health and safety during the pre-construction
                    phase. The principal designer must ensure that all designers
                    comply with their duties, facilitate cooperation between
                    designers, and prepare the health and safety file. This role
                    replaced the CDM co-ordinator from the 2007 Regulations.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    3. Principal Contractor
                  </p>
                  <p className="text-sm text-white/80">
                    A contractor appointed by the client to plan, manage, monitor,
                    and coordinate the construction phase on projects involving
                    more than one contractor. The principal contractor must
                    prepare the construction phase plan, organise cooperation
                    between contractors, ensure suitable site inductions are
                    provided, and take reasonable steps to prevent unauthorised
                    access to the site.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    4. Designers
                  </p>
                  <p className="text-sm text-white/80">
                    Anyone who, as part of a business, prepares or modifies a
                    design for a building, product, or system relating to
                    construction work. This includes architects, engineers,
                    quantity surveyors, interior designers, and tradespeople who
                    make design decisions (such as an electrician designing a
                    circuit layout). Designers must eliminate foreseeable risks
                    where possible, reduce risks that cannot be eliminated, and
                    provide information about remaining risks.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    5. Contractors
                  </p>
                  <p className="text-sm text-white/80">
                    Any person or business that carries out, manages, or controls
                    construction work. This includes sole traders, partnerships,
                    and companies of all sizes. Contractors must plan, manage, and
                    monitor their own work to ensure it is carried out safely.
                    They must provide workers with appropriate information,
                    instruction, training, and supervision. On single-contractor
                    domestic projects, the contractor also takes on the client
                    duties.
                  </p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Important:</strong> A single
                  person or organisation can hold more than one duty holder role.
                  For example, a design-and-build contractor could be both the
                  principal designer and the principal contractor. The duties of
                  each role still apply in full regardless of whether they are
                  held by the same or different parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: CDM vs Other H&S Legislation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">07</span>
            CDM &amp; Other Health and Safety Legislation
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 does not exist in isolation. It is one part of a
                comprehensive framework of health and safety legislation that
                applies to construction work in Great Britain. Understanding how
                CDM sits alongside other regulations is essential for compliance.
              </p>

              {/* CDM Relationship to Other Legislation Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-4 text-center">
                  CDM 2015 &mdash; Relationship to Other Legislation
                </p>

                {/* HASAWA at the top */}
                <div className="flex justify-center mb-3">
                  <div className="bg-blue-500/25 border-2 border-blue-500/50 rounded-lg p-3 w-full max-w-md text-center">
                    <p className="text-xs font-bold text-blue-300">
                      OVERARCHING ACT
                    </p>
                    <p className="text-sm font-bold text-white">
                      Health and Safety at Work etc. Act 1974
                    </p>
                    <p className="text-[10px] text-white/60">
                      The &ldquo;parent&rdquo; Act &mdash; all regulations below
                      are made under its powers
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-px h-4 bg-blue-500/40" />
                </div>

                {/* CDM in the centre */}
                <div className="flex justify-center mb-3">
                  <div className="bg-blue-400/20 border-2 border-blue-400/50 rounded-lg p-3 w-full max-w-sm text-center">
                    <p className="text-xs font-bold text-blue-300">
                      CONSTRUCTION-SPECIFIC
                    </p>
                    <p className="text-sm font-bold text-white">
                      CDM 2015 (SI 2015/51)
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-px h-4 bg-white/20" />
                </div>

                {/* Related regulations */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    {
                      name: "Management Regs 1999",
                      detail: "Risk assessment, H&S arrangements",
                    },
                    {
                      name: "WAHR 2005",
                      detail: "Work at Height Regulations",
                    },
                    {
                      name: "LOLER 1998",
                      detail: "Lifting Operations & Equipment",
                    },
                    {
                      name: "PUWER 1998",
                      detail: "Provision & Use of Work Equipment",
                    },
                    {
                      name: "COSHH 2002",
                      detail: "Control of Substances Hazardous to Health",
                    },
                    {
                      name: "Noise Regs 2005",
                      detail: "Control of Noise at Work",
                    },
                  ].map((reg, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/15 rounded-lg p-2 text-center"
                    >
                      <p className="text-xs font-medium text-white">
                        {reg.name}
                      </p>
                      <p className="text-[10px] text-white/50">{reg.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/40 text-center mt-3">
                  CDM sits alongside these regulations &mdash; they all apply
                  concurrently to construction work
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">
                    Health and Safety at Work etc. Act 1974 (HASAWA)
                  </p>
                  <p className="text-sm text-white/80">
                    The overarching Act of Parliament that provides the legal
                    framework for all workplace health and safety in Great
                    Britain. It sets out the general duties of employers to their
                    employees and to others, the duties of employees, and the
                    duties of the self-employed. CDM 2015 is a set of
                    regulations made under HASAWA. A breach of CDM is also
                    potentially a breach of HASAWA.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">
                    Management of Health and Safety at Work Regulations 1999
                  </p>
                  <p className="text-sm text-white/80">
                    Often called the &ldquo;Management Regulations&rdquo;, these
                    require employers to carry out risk assessments, make
                    arrangements for health and safety management, appoint
                    competent persons, provide information and training, and
                    cooperate with other employers sharing a workplace. CDM 2015
                    builds on these general duties by adding construction-specific
                    requirements.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">
                    Work at Height Regulations 2005 (WAHR)
                  </p>
                  <p className="text-sm text-white/80">
                    Apply to all work at height where there is a risk of a fall
                    liable to cause personal injury. Falls from height are the
                    single largest cause of fatal injury in construction,
                    accounting for approximately 40&ndash;50% of construction
                    fatalities each year. WAHR requires that work at height is
                    properly planned, supervised, and carried out by competent
                    persons, with appropriate equipment selected using a
                    hierarchy of controls.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">
                    Lifting Operations and Lifting Equipment Regulations 1998
                    (LOLER)
                  </p>
                  <p className="text-sm text-white/80">
                    Apply to the use of lifting equipment in the workplace,
                    including cranes, hoists, lifts, and mobile elevating work
                    platforms (MEWPs). LOLER requires that lifting operations are
                    properly planned, supervised, and carried out by competent
                    persons, and that lifting equipment is regularly examined and
                    inspected.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">
                    Provision and Use of Work Equipment Regulations 1998 (PUWER)
                  </p>
                  <p className="text-sm text-white/80">
                    Apply to all work equipment used in the workplace. PUWER
                    requires that equipment is suitable for its intended use,
                    properly maintained, inspected where necessary, and used only
                    by people who have received adequate information, instruction,
                    and training. On construction sites, this covers everything
                    from power tools and cutting equipment to plant and machinery.
                  </p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Key Point:</strong> These
                  regulations do not replace each other &mdash; they all apply{" "}
                  <strong>concurrently</strong>. A construction project must
                  comply with CDM 2015 <em>and</em> HASAWA 1974 <em>and</em> the
                  Management Regulations 1999 <em>and</em> WAHR 2005 <em>and</em>{" "}
                  LOLER 1998 <em>and</em> PUWER 1998, along with any other
                  regulations that apply to the specific activities being carried
                  out. CDM does not provide an exemption from any other health
                  and safety legislation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Statistics & Why CDM Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">08</span>
            Statistics &amp; Why CDM Matters
          </h2>
          <div className="border-l-2 border-blue-400/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry remains one of the most dangerous
                sectors in Great Britain. Despite significant improvements over
                the past few decades, the statistics paint a stark picture of the
                ongoing risks faced by construction workers every day.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    HSE Construction Industry Statistics
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">
                      30&ndash;40
                    </p>
                    <p className="text-white/70 text-xs">
                      fatal injuries to workers per year (average)
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">
                      ~54,000
                    </p>
                    <p className="text-white/70 text-xs">
                      non-fatal injuries per year (self-reported, Labour Force
                      Survey)
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">
                      ~82,000
                    </p>
                    <p className="text-white/70 text-xs">
                      workers suffering work-related ill health per year
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">
                      ~25&ndash;30%
                    </p>
                    <p className="text-white/70 text-xs">
                      of all workplace fatalities occur in construction
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Construction consistently accounts for approximately{" "}
                <strong>25&ndash;30% of all workplace fatal injuries</strong> in
                Great Britain, despite employing only around 5% of the
                workforce. This disproportionate share demonstrates why the
                sector requires its own dedicated health and safety regulations
                in the form of CDM 2015.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Leading Causes of Fatal Injury in Construction
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">Falls from height</strong>{" "}
                      &mdash; consistently the number one killer, accounting for
                      approximately 40&ndash;50% of all construction fatalities.
                      Falls from ladders, scaffolds, roofs, and through fragile
                      surfaces are the most common scenarios.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Struck by a moving vehicle or object
                      </strong>{" "}
                      &mdash; including being hit by plant, vehicles, falling
                      materials, and collapsing structures. This accounts for
                      approximately 15&ndash;20% of fatalities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Trapped by something collapsing or overturning
                      </strong>{" "}
                      &mdash; including trench collapses, structural collapses,
                      and overturning plant. Approximately 10&ndash;15% of
                      fatalities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Contact with electricity
                      </strong>{" "}
                      &mdash; contact with overhead power lines, underground
                      cables, and live electrical systems remains a significant
                      cause of both fatal and non-fatal injuries.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Beyond traumatic injuries, the construction industry also has a
                significant <strong>occupational health burden</strong>. The HSE
                estimates that around{" "}
                <strong>82,000 construction workers</strong> are suffering from
                work-related ill health at any given time, including:
              </p>

              <ul className="text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    <strong className="text-white">
                      Musculoskeletal disorders
                    </strong>{" "}
                    &mdash; back pain, joint problems, and repetitive strain
                    injuries from manual handling and physically demanding work
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    <strong className="text-white">
                      Respiratory diseases
                    </strong>{" "}
                    &mdash; silicosis, asbestosis, occupational asthma, and
                    chronic obstructive pulmonary disease (COPD) caused by
                    exposure to dusts and fumes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    <strong className="text-white">
                      Noise-induced hearing loss
                    </strong>{" "}
                    &mdash; irreversible hearing damage from prolonged exposure
                    to high noise levels from power tools, plant, and machinery
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    <strong className="text-white">
                      Hand-arm vibration syndrome (HAVS)
                    </strong>{" "}
                    &mdash; nerve and blood vessel damage in the hands and arms
                    from prolonged use of vibrating tools
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    <strong className="text-white">
                      Occupational cancers
                    </strong>{" "}
                    &mdash; lung cancer, mesothelioma, and other cancers linked
                    to asbestos, silica dust, diesel exhaust, and other
                    carcinogenic substances
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                  <span>
                    <strong className="text-white">
                      Stress, depression, and anxiety
                    </strong>{" "}
                    &mdash; mental health conditions linked to workplace
                    pressures, long hours, job insecurity, and time away from
                    home
                  </span>
                </li>
              </ul>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    HSE Enforcement
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The HSE has the power to investigate breaches of CDM 2015 and
                  to take enforcement action. This can include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Improvement notices
                      </strong>{" "}
                      &mdash; requiring a duty holder to remedy a contravention
                      within a specified period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Prohibition notices
                      </strong>{" "}
                      &mdash; requiring work to stop immediately where there is a
                      risk of serious personal injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Criminal prosecution
                      </strong>{" "}
                      &mdash; for serious breaches, the HSE can prosecute duty
                      holders in the criminal courts. Penalties can include
                      unlimited fines and, in the most serious cases,
                      imprisonment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      <strong className="text-white">
                        Fee for intervention (FFI)
                      </strong>{" "}
                      &mdash; where the HSE identifies a material breach, the
                      duty holder must pay &pound;163 per hour (2024/25 rate) for
                      the time the HSE spends investigating and resolving the
                      matter
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Economic Cost
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-400">
                      &pound;1.3bn
                    </p>
                    <p className="text-white/70 text-xs">
                      estimated annual cost of workplace injuries and ill health
                      in construction (HSE)
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-400">
                      2.2M
                    </p>
                    <p className="text-white/70 text-xs">
                      working days lost per year due to construction workplace
                      injuries and ill health
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These statistics make a compelling case for why the CDM
                Regulations exist and why compliance matters. Every duty holder
                &mdash; from the client who commissions a project, to the
                designer who shapes it, to the contractor who builds it &mdash;
                has a role to play in reducing these numbers. CDM 2015 provides
                the legal framework to ensure that health and safety is not an
                afterthought but an integral part of every construction project.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Remember</p>
                </div>
                <p className="text-sm text-white/80">
                  Behind every statistic is a person &mdash; a colleague, a
                  friend, a family member. Construction workers deserve to go
                  home safe and healthy at the end of every working day. CDM 2015
                  exists to make that possible by ensuring that risks are
                  identified, assessed, and managed at every stage of every
                  project. Compliance is not just a legal obligation &mdash; it
                  is a moral one.
                </p>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1-section-2">
              Next: History &amp; Evolution
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
