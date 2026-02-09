import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "dutyholder-definition",
    question:
      "Who is the 'dutyholder' under Regulation 4 of CAR 2012?",
    options: [
      "The person or organisation responsible for maintenance and repair of the building",
      "The local authority building control officer",
      "The Health and Safety Executive inspector assigned to the area",
      "The original architect who designed the building",
    ],
    correctIndex: 0,
    explanation:
      "The dutyholder is the person or organisation with responsibility for maintenance and repair of non-domestic premises. In practice this is usually the building owner, a tenant with a repairing lease, or a managing agent — whoever has the contractual obligation for building upkeep.",
  },
  {
    id: "information-before-work",
    question:
      "When must the dutyholder provide information about ACMs to contractors?",
    options: [
      "Before work begins — contractors must see the asbestos register before starting",
      "Within 7 days of work commencing",
      "Only if the contractor specifically requests the information",
      "After work is completed, as part of the project close-out",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 4 requires the dutyholder to provide information about known or presumed ACMs to anyone who might disturb them BEFORE work begins. This includes showing the asbestos register and relevant parts of the management plan so that workers can plan their activities safely.",
  },
  {
    id: "domestic-premises-duty",
    question:
      "Does the duty to manage asbestos under Regulation 4 apply to private domestic dwellings?",
    options: [
      "No — Regulation 4 applies only to non-domestic premises, but HSE strongly recommends the same approach for homes",
      "Yes — all buildings are covered equally by Regulation 4",
      "Only if the dwelling was built before 1985",
      "Only if the dwelling is rented out to tenants",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 4 of CAR 2012 applies to non-domestic premises (offices, shops, schools, hospitals, etc.) and the common parts of residential buildings (hallways, stairwells, plant rooms). It does not apply to private domestic dwellings, although the HSE strongly recommends that homeowners take the same approach to managing asbestos in their homes.",
  },
];

const faqs = [
  {
    question:
      "What happens if a building has multiple dutyholders?",
    answer:
      "In multi-occupied buildings, different dutyholders may be responsible for different areas. For example, individual tenants may be dutyholders for their leased units, while the freeholder or managing agent is the dutyholder for common areas such as hallways, stairwells, plant rooms, and the building exterior. Each dutyholder is responsible for managing asbestos within their area of control. If there is any overlap or ambiguity, the person or organisation with the greatest degree of control over that area is considered the dutyholder.",
  },
  {
    question:
      "Can a dutyholder simply presume that materials contain asbestos?",
    answer:
      "Yes. If a dutyholder cannot confirm whether a material contains asbestos (for example, because a survey has not yet been carried out), they must presume that it does contain asbestos and manage it accordingly. This is a valid approach under Regulation 4 and is often used as an interim measure. However, the dutyholder must still record the presumed ACMs in the asbestos register, assess the risk, and include them in the management plan. A management survey should be arranged as soon as reasonably practicable to confirm the position.",
  },
  {
    question:
      "How often must the asbestos management plan be reviewed?",
    answer:
      "The management plan must be reviewed and updated whenever circumstances change — for example, after any work that disturbs ACMs, after a re-inspection reveals deterioration, after removal or encapsulation, or when there is a change of building use or occupancy. As a minimum, the HSE recommends that ACMs are re-inspected at least every 6 to 12 months, and the management plan should be reviewed at the same time. There is no fixed statutory review period, but the duty to keep the plan up to date is ongoing.",
  },
  {
    question:
      "What is the relationship between the duty to manage (CAR 2012) and CDM 2015?",
    answer:
      "The Construction (Design and Management) Regulations 2015 place additional duties on clients commissioning construction, refurbishment, or demolition work. Before such work begins, the client must provide pre-construction information to the principal designer and principal contractor, including details about known or presumed ACMs from the asbestos register and any survey reports. A Refurbishment & Demolition (R&D) survey may also be required before work that disturbs the building fabric. The CDM 2015 duty supplements (adds to) the dutyholder's ongoing duty under CAR 2012 — they are separate but complementary obligations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Regulation 4 of CAR 2012 places a duty on dutyholders to manage asbestos in which type of premises?",
    options: [
      "Domestic dwellings only",
      "Non-domestic premises (and common parts of residential buildings)",
      "Only industrial buildings built before 1980",
      "Only publicly owned buildings",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4 applies to non-domestic premises — including offices, shops, schools, hospitals, and industrial buildings — as well as the common parts of residential buildings such as hallways, stairwells, and plant rooms. It does not apply to private domestic dwellings.",
  },
  {
    id: 2,
    question:
      "If the dutyholder cannot be clearly identified, who is responsible under Regulation 4?",
    options: [
      "The local authority",
      "The Health and Safety Executive",
      "The person with the greatest degree of control over the premises",
      "No one — the duty lapses until ownership is clarified",
    ],
    correctAnswer: 2,
    explanation:
      "If the dutyholder cannot be identified (for example, because ownership or maintenance responsibility is unclear), the person or organisation with the greatest degree of control over the premises is treated as the dutyholder and must fulfil the Regulation 4 obligations.",
  },
  {
    id: 3,
    question:
      "What must a dutyholder do if they cannot confirm whether a material contains asbestos?",
    options: [
      "Ignore it until a survey is carried out",
      "Remove it immediately as a precaution",
      "Presume it contains asbestos and manage it accordingly",
      "Ask the building's original contractor for confirmation",
    ],
    correctAnswer: 2,
    explanation:
      "The dutyholder must presume that the material contains asbestos unless there is strong evidence that it does not. The presumed ACM must be recorded in the asbestos register, risk-assessed, and included in the management plan.",
  },
  {
    id: 4,
    question:
      "Which document records the location and condition of ACMs in a building?",
    options: [
      "The fire risk assessment",
      "The building's planning permission file",
      "The asbestos register",
      "The CDM health and safety file",
    ],
    correctAnswer: 2,
    explanation:
      "The asbestos register is the document that records the location, type, extent, and condition of all known or presumed ACMs in the building. It must be kept up to date and made available to anyone who might disturb ACMs.",
  },
  {
    id: 5,
    question:
      "A contractor arrives to carry out electrical work in a commercial building. What must the dutyholder do regarding asbestos?",
    options: [
      "Nothing — contractors are responsible for their own safety",
      "Provide information about known or presumed ACMs before work begins",
      "Only provide information if the contractor asks for it",
      "Provide information after the work is completed",
    ],
    correctAnswer: 1,
    explanation:
      "The dutyholder MUST provide information about known or presumed ACMs to anyone who might disturb them, including contractors, maintenance workers, and tradespeople. This information must be provided BEFORE work begins, and workers should be shown the asbestos register and relevant parts of the management plan.",
  },
  {
    id: 6,
    question:
      "What additional requirement does CDM 2015 place on clients before refurbishment work begins?",
    options: [
      "The client must carry out the asbestos removal themselves",
      "The client must provide pre-construction information about ACMs to the principal designer and principal contractor",
      "The client must close the building for the duration of the refurbishment",
      "The client must obtain a new asbestos licence from the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "Under CDM 2015, the client must provide pre-construction information — including details from the asbestos register and any survey reports — to the principal designer and principal contractor before construction or refurbishment work begins. A Refurbishment & Demolition survey may also be required.",
  },
  {
    id: 7,
    question:
      "What is the maximum penalty for organisations convicted of failing to comply with Regulation 4?",
    options: [
      "A fixed penalty notice of £5,000",
      "A fine of up to £20,000",
      "An unlimited fine",
      "A written warning from the HSE",
    ],
    correctAnswer: 2,
    explanation:
      "Failure to comply with Regulation 4 is a criminal offence. Organisations can face unlimited fines upon conviction. Individuals (directors, managers) can face personal fines and up to 2 years' imprisonment. The HSE can also issue improvement or prohibition notices.",
  },
  {
    id: 8,
    question:
      "Which of the following is NOT a dutyholder responsibility under Regulation 4?",
    options: [
      "Taking reasonable steps to find out if ACMs are present",
      "Preparing a written management plan for ACMs",
      "Personally carrying out all asbestos removal work",
      "Providing information about ACM locations to anyone who may disturb them",
    ],
    correctAnswer: 2,
    explanation:
      "The dutyholder is NOT required to personally carry out asbestos removal. Licensed contractors must carry out licensable asbestos removal work. The dutyholder's responsibilities include finding ACMs, assessing risk, preparing a management plan, managing the risk, and providing information to those who may disturb ACMs.",
  },
];

const AsbestosModule2Section2 = () => {
  useSEO({
    title: "The Duty to Manage (Regulation 4) | Asbestos Awareness Module 2.2",
    description:
      "Learn about Regulation 4 of the Control of Asbestos Regulations 2012 — the duty to manage asbestos in non-domestic premises, dutyholder responsibilities, informing workers, and penalties for non-compliance.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-orange-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Duty to Manage (Regulation 4)
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding who is responsible for managing asbestos in
            non-domestic premises, what the law requires, and the consequences
            of non-compliance
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="font-semibold text-orange-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Regulation 4:</strong> legal
                  duty to manage asbestos in non-domestic premises
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Dutyholder:</strong> whoever
                  has responsibility for maintenance and repair
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Key duties:</strong> find ACMs,
                  assess risk, manage, inform, and review
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Failure:</strong> criminal
                  offence — unlimited fines, imprisonment
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="font-semibold text-orange-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Before starting work:</strong>{" "}
                  ask to see the asbestos register
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check:</strong> the management
                  plan for areas you will work in
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Stop work:</strong> immediately
                  if you discover suspected ACMs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Report:</strong> any ACM
                  discoveries to the dutyholder at once
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Explain the purpose and scope of Regulation 4 of the Control of Asbestos Regulations 2012",
              "Identify who qualifies as a dutyholder and how responsibility is determined in multi-occupied buildings",
              "List the key responsibilities of the dutyholder including surveying, recording, assessing, managing, and informing",
              "Describe the dutyholder's obligation to provide ACM information to workers and contractors before work begins",
              "Explain how the duty to manage under CAR 2012 overlaps with client duties under CDM 2015",
              "State the penalties for non-compliance including criminal prosecution, unlimited fines, and imprisonment",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is the Duty to Manage? */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">01</span>
              What Is the Duty to Manage?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Regulation 4</strong> of the
                Control of Asbestos Regulations 2012 (CAR 2012) places a legal
                duty on <strong className="text-white">dutyholders</strong> to
                manage asbestos in non-domestic premises. This is one of the most
                important regulations in the entire asbestos framework because it
                is <em>proactive</em> — it requires action even when no work on
                the building is planned.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Key Definition: Duty to Manage
                </h3>
                <p className="text-white/80 text-sm">
                  The <strong className="text-white">duty to manage</strong> is
                  the legal obligation on dutyholders to take reasonable steps to
                  find out if asbestos-containing materials (ACMs) are present in
                  non-domestic premises, to assess their condition, to manage the
                  risk they pose, and to provide information about them to anyone
                  who might disturb them. It is an ongoing, continuous duty — not
                  a one-off exercise.
                </p>
              </div>

              <p>
                The duty applies to a wide range of premises:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-2">
                  Premises Covered by Regulation 4
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Commercial premises:
                      </strong>{" "}
                      offices, shops, retail units, restaurants, hotels
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Industrial buildings:
                      </strong>{" "}
                      factories, warehouses, workshops, depots
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Public buildings:</strong>{" "}
                      schools, hospitals, libraries, leisure centres, churches
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Common parts of residential buildings:
                      </strong>{" "}
                      hallways, stairwells, lift shafts, plant rooms, communal
                      areas
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Domestic Dwellings
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Regulation 4 does <strong className="text-white">NOT</strong>{" "}
                  apply to private domestic dwellings (individual houses and
                  flats). However, the HSE strongly recommends that homeowners
                  take the same approach to managing asbestos in their homes —
                  particularly if the property was built before 2000 and
                  maintenance or improvement work is planned.
                </p>
              </div>

              <p>
                The duty is clear:{" "}
                <strong className="text-white">
                  take reasonable steps to find out if ACMs are present, assess
                  their condition, manage the risk, and provide information to
                  anyone who might disturb them.
                </strong>{" "}
                Failure to comply with Regulation 4 is a{" "}
                <strong className="text-white">criminal offence</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Who Is the Dutyholder? */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">02</span>
              Who Is the Dutyholder?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The person or organisation with the obligation to manage asbestos
                is the{" "}
                <strong className="text-white">&ldquo;dutyholder&rdquo;</strong>.
                In practice, the dutyholder is whoever has responsibility for the{" "}
                <strong className="text-white">
                  maintenance and repair
                </strong>{" "}
                of the building — not necessarily the building owner.
              </p>

              <p>
                Depending on the building&rsquo;s ownership and tenancy
                arrangements, the dutyholder could be:
              </p>

              <ul className="text-white/70 space-y-2 text-sm pl-1">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Building owner</strong> — if
                    the owner occupies or directly controls the premises
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">
                      Tenant with a repairing lease
                    </strong>{" "}
                    — if the lease places maintenance and repair obligations on
                    the tenant
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Managing agent</strong> —
                    acting on behalf of the building owner under a management
                    agreement
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Any person</strong> with
                    contractual obligations for the building&rsquo;s upkeep
                  </div>
                </li>
              </ul>

              <p>
                In multi-occupied buildings, different dutyholders may be
                responsible for different areas. If the dutyholder{" "}
                <strong className="text-white">cannot be identified</strong>,
                the person with the{" "}
                <strong className="text-white">
                  greatest degree of control
                </strong>{" "}
                over the premises is treated as the dutyholder.
              </p>

              {/* Dutyholder Decision Flowchart */}
              <div className="my-6">
                <h3 className="text-orange-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Dutyholder Decision Flowchart
                </h3>

                {/* Start box */}
                <div className="flex justify-center mb-3">
                  <div className="bg-orange-500/15 border-2 border-orange-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
                    <p className="text-white font-semibold text-sm">
                      Who has the contractual obligation for maintenance and
                      repair?
                    </p>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-3">
                  <div className="w-0.5 h-6 bg-orange-400/40"></div>
                </div>

                {/* Four branches */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/5 border border-orange-400/30 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-orange-300 font-medium text-xs">
                        Owner occupier
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-orange-400/30"></div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-white/80 text-xs">
                        Owner is the dutyholder
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/5 border border-orange-400/30 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-orange-300 font-medium text-xs">
                        Tenant with repairing lease
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-orange-400/30"></div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-white/80 text-xs">
                        Tenant is dutyholder for leased areas
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/5 border border-orange-400/30 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-orange-300 font-medium text-xs">
                        Managing agent
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-orange-400/30"></div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-white/80 text-xs">
                        Agent acts as dutyholder on behalf of owner
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/5 border border-orange-400/30 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-orange-300 font-medium text-xs">
                        Multiple parties / unclear
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-orange-400/30"></div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 text-center w-full">
                      <p className="text-white/80 text-xs">
                        Person with greatest control is the dutyholder
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connecting lines down to responsibilities box */}
                <div className="flex justify-center mb-3">
                  <div className="w-0.5 h-6 bg-orange-400/40"></div>
                </div>

                {/* Responsibilities box */}
                <div className="flex justify-center">
                  <div className="bg-orange-500/10 border-2 border-orange-500/30 rounded-xl px-5 py-4 max-w-lg w-full">
                    <p className="text-orange-400 font-semibold text-sm mb-2 text-center">
                      Dutyholder Responsibilities
                    </p>
                    <ul className="text-white/70 text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                        <span>Find ACMs (survey or presume)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                        <span>Record in the asbestos register</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                        <span>Assess risk (material + priority assessment)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                        <span>Prepare a written management plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                        <span>Manage the risk and review regularly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                        <span>Inform anyone who may disturb ACMs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Dutyholder's Responsibilities */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              The Dutyholder&rsquo;s Responsibilities
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Regulation 4 sets out a clear list of responsibilities that the
                dutyholder must fulfil. These are not optional — they are legal
                requirements, and failure to carry them out is a criminal
                offence.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  The Nine Key Duties
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Find ACMs
                      </p>
                      <p className="text-white/60">
                        Take reasonable steps to find out whether
                        asbestos-containing materials are present — either by
                        commissioning a management survey or by presuming that
                        materials contain asbestos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Presume Asbestos
                      </p>
                      <p className="text-white/60">
                        If you cannot confirm whether a material contains
                        asbestos, you must presume that it does unless there is
                        strong evidence to the contrary.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Record and Register
                      </p>
                      <p className="text-white/60">
                        Make and keep an up-to-date written record of the
                        location and condition of all ACMs — this is the{" "}
                        <strong className="text-white">asbestos register</strong>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Assess the Risk
                      </p>
                      <p className="text-white/60">
                        Carry out a material assessment (condition of the ACM)
                        and a priority assessment (likelihood of disturbance) for
                        each ACM found.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Prepare a Management Plan
                      </p>
                      <p className="text-white/60">
                        Create a written plan that sets out how ACMs will be
                        managed — including actions to be taken, timescales,
                        responsibilities, and monitoring arrangements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Manage the Risk
                      </p>
                      <p className="text-white/60">
                        Take steps to manage ACMs — this could mean leaving them
                        in situ and monitoring, encapsulating, enclosing, or
                        removing them depending on the risk assessment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">7</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Review and Monitor
                      </p>
                      <p className="text-white/60">
                        Regularly review and monitor the condition of ACMs. The
                        HSE recommends re-inspection at least every 6 to 12
                        months, and more frequently if ACMs are in poor condition
                        or in high-traffic areas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">8</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Provide Information
                      </p>
                      <p className="text-white/60">
                        Give information about ACM locations and condition to
                        anyone who may disturb them — including contractors,
                        maintenance workers, and building occupants.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">9</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Update the Plan
                      </p>
                      <p className="text-white/60">
                        Ensure the management plan is reviewed and updated
                        whenever circumstances change — for example, after ACM
                        removal, deterioration, changes to building use, or new
                        survey findings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Key Principle: Presume Asbestos
                </h3>
                <p className="text-white/80 text-sm">
                  One of the most important aspects of the duty to manage is the{" "}
                  <strong className="text-white">presumption principle</strong>:
                  if you cannot confirm whether a material contains asbestos, you
                  must presume that it does and manage it as if it were an ACM.
                  This applies until a survey or laboratory analysis provides
                  evidence to the contrary. It is always safer to presume and
                  protect than to guess and expose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Informing Workers and Contractors */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              Informing Workers and Contractors
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The dutyholder{" "}
                <strong className="text-white">MUST</strong> provide information
                about known or presumed ACMs to anyone who might disturb them.
                This is not a courtesy — it is a legal requirement and a critical
                safety measure. Workers who are unaware of ACM locations may
                inadvertently drill into, cut, or otherwise disturb
                asbestos-containing materials, releasing dangerous fibres.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Who Must Be Informed?
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Maintenance workers
                      </strong>{" "}
                      — employed directly by the dutyholder or building manager
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Contractors</strong> —
                      electricians, plumbers, heating engineers, decorators, IT
                      cabling installers
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Demolition and refurbishment teams
                      </strong>{" "}
                      — before any work that will disturb the building fabric
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Emergency services
                      </strong>{" "}
                      — firefighters and other responders who may need to enter
                      the building
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Building occupants
                      </strong>{" "}
                      — where ACMs are in areas that occupants may access or
                      affect
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Information Must Be Provided BEFORE Work Begins
                </h3>
                <p className="text-white/80 text-sm">
                  Workers must be shown the{" "}
                  <strong className="text-white">asbestos register</strong> and
                  the relevant parts of the{" "}
                  <strong className="text-white">management plan</strong> before
                  they start any work that could disturb ACMs. A{" "}
                  <strong className="text-white">permit-to-work system</strong>{" "}
                  should be used for work in areas where ACMs are present —
                  ensuring that each worker has reviewed the ACM information,
                  understands the risks, and has been authorised to proceed.
                </p>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Discovering Suspected ACMs During Work
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  If a contractor discovers suspected ACMs during the course of
                  their work — for example, an electrician finds lagging around
                  pipework while chasing cables — they must{" "}
                  <strong className="text-white">
                    stop work immediately
                  </strong>
                  , leave the area without further disturbing the material, and{" "}
                  <strong className="text-white">
                    report to the dutyholder
                  </strong>{" "}
                  at once. Work must not resume in that area until the material
                  has been sampled, analysed, and a safe system of work has been
                  established.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Overlap with CDM 2015 */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Overlap with CDM 2015
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The Construction (Design and Management) Regulations 2015 (CDM
                2015) place additional duties on{" "}
                <strong className="text-white">clients</strong> who commission
                construction, refurbishment, or demolition work. Where asbestos
                is concerned, the CDM 2015 duties{" "}
                <strong className="text-white">supplement</strong> (add to) the
                dutyholder&rsquo;s ongoing duty under CAR 2012 — they do not
                replace it.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Client Duties Under CDM 2015
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Pre-construction information:
                      </strong>{" "}
                      the client must provide information about known or presumed
                      ACMs to the principal designer and principal contractor
                      before construction work begins
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Asbestos register details:
                      </strong>{" "}
                      the pre-construction information must include details from
                      the asbestos register and any survey reports
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Refurbishment & Demolition survey:
                      </strong>{" "}
                      an R&D survey may be required before work that will disturb
                      the building fabric — this is more intrusive than a
                      management survey
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Complementary duties:
                      </strong>{" "}
                      the CDM 2015 duty adds to the CAR 2012 duty — both must be
                      fulfilled
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Practical Example
                </h3>
                <p className="text-white/80 text-sm">
                  A building owner (dutyholder under CAR 2012) commissions a
                  refurbishment of an office floor. Under CDM 2015, the owner (as
                  the client) must provide the principal contractor with
                  pre-construction information including the asbestos register
                  and management plan. If the management survey did not cover the
                  areas to be refurbished, a Refurbishment & Demolition survey
                  must be carried out{" "}
                  <strong className="text-white">before</strong> any intrusive
                  work begins. The owner&rsquo;s CAR 2012 duty to manage
                  continues throughout — it is not suspended during the
                  construction phase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Penalties for Non-Compliance */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">06</span>
              Penalties for Non-Compliance
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Failure to comply with Regulation 4 is a{" "}
                <strong className="text-white">criminal offence</strong>. The
                consequences are severe — reflecting the seriousness of the
                health risks posed by unmanaged asbestos.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Criminal Penalties
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">
                        Enforcement Notices
                      </p>
                      <p className="text-white/60">
                        The HSE can issue{" "}
                        <strong className="text-white">
                          improvement notices
                        </strong>{" "}
                        (requiring action within a specified timeframe) or{" "}
                        <strong className="text-white">
                          prohibition notices
                        </strong>{" "}
                        (stopping activities immediately until the risk is
                        controlled).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">
                        Unlimited Fines for Organisations
                      </p>
                      <p className="text-white/60">
                        Organisations convicted of failing to comply with
                        Regulation 4 face{" "}
                        <strong className="text-white">unlimited fines</strong>.
                        The courts take into account the size of the
                        organisation, the seriousness of the breach, and the
                        degree of culpability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">
                        Personal Liability
                      </p>
                      <p className="text-white/60">
                        Individual directors, managers, and other persons
                        responsible can face{" "}
                        <strong className="text-white">personal fines</strong>{" "}
                        and up to{" "}
                        <strong className="text-white">
                          2 years&rsquo; imprisonment
                        </strong>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">
                        Civil Liability
                      </p>
                      <p className="text-white/60">
                        Employers and dutyholders may also be{" "}
                        <strong className="text-white">
                          sued for compensation
                        </strong>{" "}
                        by workers or building occupants who develop
                        asbestos-related diseases as a result of exposure caused
                        by the failure to manage ACMs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">
                        Insurance Requirements
                      </p>
                      <p className="text-white/60">
                        Employers&rsquo; liability insurance is mandatory.
                        Failure to manage asbestos properly may affect insurance
                        cover and could result in insurers refusing to pay
                        claims.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-2">
                  Recent Prosecution Examples
                </h3>
                <p className="text-white/70 text-sm">
                  The HSE regularly prosecutes dutyholders who fail to manage
                  asbestos. Common scenarios include: landlords who failed to
                  carry out a management survey before allowing contractors to
                  work; school governors who had no asbestos register or
                  management plan; and building owners who knew about ACMs but
                  failed to inform maintenance workers. Fines in recent cases
                  have ranged from tens of thousands to hundreds of thousands of
                  pounds, with some resulting in custodial sentences for
                  individuals.
                </p>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Remember: Ignorance Is No Defence
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  A dutyholder cannot avoid liability by claiming they did not
                  know about the presence of asbestos. The duty is to take{" "}
                  <strong className="text-white">reasonable steps</strong> to
                  find out. Failing to carry out a survey, or failing to check
                  building records, is itself a breach of Regulation 4. The law
                  expects dutyholders to be proactive — not to wait until someone
                  is exposed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Control of Asbestos Regulations 2012
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-3">
              Next: Asbestos Surveys
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default AsbestosModule2Section2;
