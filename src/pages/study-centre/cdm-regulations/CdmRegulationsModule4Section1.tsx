import {
  ArrowLeft,
  PenTool,
  CheckCircle,
  AlertTriangle,
  ArrowDown,
  Shield,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "designers-core-duty",
    question:
      "Under Regulation 9 of CDM 2015, what is the first step in a designer's risk management hierarchy?",
    options: [
      "Eliminate foreseeable risks so far as is reasonably practicable",
      "Reduce risks by specifying safer materials",
      "Inform other duty holders about all risks on the project",
      "Transfer all risk to the principal contractor",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 9 requires designers to follow a clear hierarchy: first eliminate foreseeable risks so far as is reasonably practicable, then reduce risks that cannot be eliminated, and finally provide information about any remaining (residual) risks. Elimination is always the preferred first step because it removes the hazard entirely rather than relying on controls or information.",
  },
  {
    id: "general-principles-priority",
    question:
      "Under the General Principles of Prevention (Schedule 1), which type of protective measure takes priority?",
    options: [
      "Collective measures over individual measures",
      "Individual PPE over collective measures",
      "Administrative controls over engineering controls",
      "Warning signs over physical barriers",
    ],
    correctIndex: 0,
    explanation:
      "Schedule 1 of CDM 2015 (mirroring the Management of Health and Safety at Work Regulations) requires that collective protective measures are given priority over individual protective measures. For example, a permanent guardrail system (collective) is preferred over requiring individual workers to wear fall-arrest harnesses (individual). Collective measures protect everyone without relying on individual compliance.",
  },
  {
    id: "residual-risk-communication",
    question:
      "How should a designer communicate significant residual risks that cannot be eliminated or reduced?",
    options: [
      "Through design risk registers and information on drawings, highlighting unusual or non-obvious risks",
      "Verbally at the project handover meeting only",
      "By including a general disclaimer in the contract documents",
      "Residual risks do not need to be communicated if they are common in the industry",
    ],
    correctIndex: 0,
    explanation:
      "Designers must communicate significant residual risks through design risk registers and by providing information on drawings. Unusual or non-obvious risks must be specifically highlighted so that contractors and others can plan appropriate control measures. Verbal communication alone is insufficient, and general disclaimers do not satisfy the legal duty. Even common industry risks should be recorded if they are significant.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Does a designer have to eliminate every possible risk from the design?",
    answer:
      "No. The duty is to eliminate risks 'so far as is reasonably practicable' (SFAIRP). This means balancing the level of risk against the cost, time, and effort of eliminating it. Designers must use professional judgement and consider whether the risk reduction is proportionate. It would be unreasonable to expect a designer to eliminate every conceivable risk, but they must demonstrate that they have applied the hierarchy (eliminate, reduce, inform) and made proportionate design decisions. The key test is whether a reasonable designer in the same position would have done the same.",
  },
  {
    question:
      "What is the difference between a design risk register and a health and safety file?",
    answer:
      "A design risk register is a document maintained during the design process that records the significant risks identified, what has been done to eliminate or reduce them, and what residual risks remain. It is a working document used to communicate between designers, the principal designer, and contractors. The health and safety file, by contrast, is a document compiled by the principal designer that contains information needed for future construction, maintenance, refurbishment, or demolition of the structure. The design risk register feeds into the health and safety file, but they serve different purposes and audiences.",
  },
  {
    question:
      "Can an electrician be considered a 'designer' under CDM 2015?",
    answer:
      "Yes. Under CDM 2015, a designer is anyone who prepares or modifies a design for a building, product, or system related to construction work. An electrician who designs the layout of a distribution board, specifies cable routes, or plans the positioning of isolation points is acting as a designer and has CDM designer duties. This includes preparing drawings, specifying products, or making design decisions on site. Many electrical contractors are unaware they have designer duties, but the CDM definition is deliberately broad to capture everyone who influences the design.",
  },
  {
    question:
      "What should I do if I identify a design risk that another designer's work has created?",
    answer:
      "You have a duty to cooperate and coordinate with other designers and the principal designer. You should raise the risk with the principal designer or directly with the other designer as soon as possible. The principal designer is responsible for ensuring that design risks are managed across all disciplines and that no gaps exist. You should document the risk you have identified and confirm in writing that it has been communicated. Do not assume that someone else will notice the risk or that it is not your responsibility because it originated from another discipline.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under Regulation 9 of CDM 2015, when must a designer consider health and safety?",
    options: [
      "Only when the client specifically requests it",
      "When preparing or modifying a design for a building, product, or system relating to construction work",
      "Only during the detailed design stage, not the concept stage",
      "Only when the project is notifiable to the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 9 applies whenever a designer prepares or modifies a design for a building, product, or system relating to construction work. This applies at every stage of design, from initial concept through to detailed specification, and regardless of whether the project is notifiable. The duty is not dependent on the client requesting it — it is a legal obligation that applies automatically.",
  },
  {
    id: 2,
    question:
      "Which of the following is an example of eliminating risk through design?",
    options: [
      "Specifying lighter materials to reduce manual handling injuries",
      "Designing permanent edge protection into a flat roof so temporary barriers are not needed",
      "Providing information about buried services on the drawings",
      "Requiring workers to wear fall-arrest harnesses when working at height",
    ],
    correctAnswer: 1,
    explanation:
      "Designing permanent edge protection into a flat roof eliminates the risk of falls during both construction and future maintenance because the hazard is permanently removed by the design. Specifying lighter materials reduces risk but does not eliminate it. Providing information is the third tier of the hierarchy (inform). Requiring harnesses is an individual protective measure, not a design elimination.",
  },
  {
    id: 3,
    question:
      "What does 'combating risks at source' mean under the General Principles of Prevention?",
    options: [
      "Addressing the root cause of the hazard rather than mitigating its effects",
      "Providing PPE to protect workers from the hazard",
      "Writing a risk assessment for every task",
      "Ensuring the principal contractor manages all on-site risks",
    ],
    correctAnswer: 0,
    explanation:
      "Combating risks at source means addressing the root cause of the hazard rather than mitigating its effects after the fact. For example, designing out the need to work at height (the source) is preferable to providing fall protection equipment (mitigating the effect). This principle is fundamental to the prevention hierarchy and underpins the designer's duty to eliminate and reduce risks through design decisions.",
  },
  {
    id: 4,
    question:
      "An electrical designer specifies cable routes that pass through an area that will later become a confined space. What CDM duty have they potentially failed to fulfil?",
    options: [
      "The duty to eliminate foreseeable risks so far as is reasonably practicable",
      "The duty to notify the HSE of the design",
      "The duty to appoint a principal contractor",
      "The duty to provide welfare facilities",
    ],
    correctAnswer: 0,
    explanation:
      "By routing cables through a future confined space, the designer has created a foreseeable risk that maintenance workers will need to enter a confined space to access the cables. A better design would route cables so they can be maintained without confined space entry. This is a failure to eliminate a foreseeable risk through design, which is the designer's core duty under Regulation 9.",
  },
  {
    id: 5,
    question:
      "A designer identifies a residual risk that is unusual and not obvious to contractors. What must they do?",
    options: [
      "Assume that competent contractors will identify it themselves",
      "Specifically highlight the risk and provide information through the design risk register and on drawings",
      "Only mention it if asked about it during a design review meeting",
      "Transfer responsibility by adding a general caveat to the specification",
    ],
    correctAnswer: 1,
    explanation:
      "Designers must specifically highlight unusual or non-obvious residual risks and provide clear information through the design risk register and on drawings. The duty to inform is the third tier of the risk management hierarchy and applies when risks cannot be fully eliminated or reduced. Assuming that contractors will identify risks themselves, or relying on general caveats, does not satisfy the legal requirement.",
  },
  {
    id: 6,
    question:
      "Under CDM 2015, what determines whether a designer has adequate competence?",
    options: [
      "Holding a specific CDM qualification or licence",
      "Having adequate skills, knowledge, experience, and organisational capability for the work",
      "Being registered with the HSE as an approved designer",
      "Having completed at least 10 years of professional practice",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 does not require a specific qualification or licence. Competence is assessed by whether the designer has adequate skills, knowledge, experience, and (where relevant) organisational capability for the type of work involved. This is a proportionate test — a designer working on a simple domestic extension needs different competence from one designing a major infrastructure project. Professional judgement and CDM awareness are expected of all designers.",
  },
  {
    id: 7,
    question:
      "Why is cooperation between designers important under CDM 2015?",
    options: [
      "It is a contractual requirement but not a legal one",
      "It ensures that risks identified by one designer do not create gaps in risk management across the project",
      "It is only required when the project has more than five designers",
      "It allows designers to share the cost of professional indemnity insurance",
    ],
    correctAnswer: 1,
    explanation:
      "Cooperation between designers is a legal duty under CDM 2015. It ensures that design risks are managed across all disciplines and that no gaps exist. For example, a structural designer's decisions may affect the safety of electrical installations, and vice versa. Without cooperation and coordination (facilitated by the principal designer), one designer's risk elimination could inadvertently create new risks for another trade.",
  },
  {
    id: 8,
    question:
      "When designing the location of electrical distribution boards, which CDM principle should the designer primarily consider?",
    options: [
      "Minimising the cost of the electrical installation",
      "Ensuring safe access for maintenance without the need for work at height or confined space entry",
      "Positioning boards as close to the main intake as possible regardless of access",
      "Using the smallest distribution boards available to save space",
    ],
    correctAnswer: 1,
    explanation:
      "The designer should consider the whole lifecycle of the installation, including future maintenance. Distribution boards must be accessible for safe maintenance without requiring work at height, confined space entry, or other high-risk activities. This is a direct application of the designer's duty to eliminate and reduce foreseeable risks. Positioning and access are design decisions that can significantly affect the safety of future maintenance work.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const CdmRegulationsModule4Section1 = () => {
  useSEO({
    title:
      "Designers' Duties | CDM Regulations Module 4 Section 1",
    description:
      "Learn about designers' duties under CDM 2015 Regulation 9, including the risk management hierarchy of eliminate, reduce, and inform, the General Principles of Prevention, electrical design considerations, and cooperation and coordination duties.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <PenTool className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 4 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Designers&rsquo; Duties
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the designer&rsquo;s legal duties under CDM 2015 &mdash; the hierarchy of
            eliminate, reduce, and inform, the General Principles of Prevention, and how these duties
            apply to electrical design
          </p>
        </div>

        {/* ─── 01 The Designer's Core Duty ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            The Designer&rsquo;s Core Duty
          </h2>
          <div className="space-y-4 text-white">
            <p>
              <strong>Regulation 9</strong> of CDM 2015 sets out the core duty on designers. When
              preparing or modifying a design for a building, product, or system relating to
              construction work, a designer must take into account the General Principles of
              Prevention and, so far as is reasonably practicable:
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
                <p className="font-semibold text-base text-blue-400 mb-2">The Three-Step Hierarchy</p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span>
                      <strong>Step 1 &mdash; Eliminate</strong> foreseeable risks so far as is
                      reasonably practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>
                      <strong>Step 2 &mdash; Reduce</strong> risks that cannot be eliminated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3 &mdash; Inform</strong> about remaining (residual) risks
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
                <p className="font-semibold text-base text-blue-400 mb-2">Key Points</p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The duty applies at <strong>every stage of design</strong> &mdash; from concept
                      through to detailed specification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Designers must consider risks to <strong>all persons</strong> affected &mdash;
                      construction workers, maintenance workers, building users, and the public
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The duty covers the <strong>entire lifecycle</strong> of the structure &mdash;
                      construction, maintenance, use, refurbishment, and demolition
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-blue-300">Who Is a &ldquo;Designer&rdquo;?</h3>
              </div>
              <p className="text-white/80 text-sm">
                Under CDM 2015, a <strong className="text-white">designer</strong> is anyone who
                prepares or modifies a design, including drawings, design details, specifications, and
                bills of quantities relating to a structure. This is much broader than many people
                realise &mdash; it includes architects, engineers, surveyors, technicians, and{" "}
                <strong className="text-white">any tradesperson</strong> who makes design decisions.
                An electrician who specifies a cable route, designs a distribution board layout, or
                selects equipment is acting as a designer under CDM.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 General Principles of Prevention ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">02</span>
              General Principles of Prevention
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Schedule 1 of CDM 2015 sets out the <strong>General Principles of Prevention</strong>,
                which mirror those in the Management of Health and Safety at Work Regulations 1999.
                These nine principles form the foundation of all health and safety decision-making,
                including design. Designers must take them into account when preparing or modifying any
                design.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">
                  The Nine Principles (Schedule 1)
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong>Avoiding risks</strong> &mdash; eliminating hazards entirely through
                      design choices wherever possible
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong>Evaluating the risks which cannot be avoided</strong> &mdash; assessing
                      remaining risks to determine their severity and likelihood
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong>Combating the risks at source</strong> &mdash; addressing the root cause
                      of hazards rather than mitigating their effects
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <strong>Adapting the work to the individual</strong> &mdash; considering
                      ergonomics, working postures, and the physical capabilities of those who will
                      build, maintain, and use the structure
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <strong>Adapting to technical progress</strong> &mdash; using modern materials,
                      methods, and technologies that offer improved safety over traditional approaches
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <strong>Replacing the dangerous with the non-dangerous or the less
                      dangerous</strong> &mdash; substituting hazardous materials, processes, or
                      systems with safer alternatives
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      7
                    </div>
                    <div>
                      <strong>Developing a coherent overall prevention policy</strong> &mdash;
                      ensuring that design decisions work together as a consistent whole rather than
                      creating conflicting safety requirements
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      8
                    </div>
                    <div>
                      <strong>Giving priority to collective protective measures</strong> over
                      individual protective measures &mdash; e.g. guardrails (collective) over
                      harnesses (individual)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      9
                    </div>
                    <div>
                      <strong>Giving appropriate instructions to workers</strong> &mdash; ensuring
                      those who will carry out the work have the information they need to do so safely
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Practical Application for Designers</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The General Principles of Prevention are not abstract concepts &mdash; they must
                  inform <strong className="text-white">every design decision</strong>. When a
                  designer chooses a material, specifies a construction method, determines a layout, or
                  selects a system, they should ask: &ldquo;Have I applied these principles? Could this
                  design be safer?&rdquo; The principles provide a structured framework for
                  proportionate risk management at the design stage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Eliminate Through Design ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">03</span>
              Eliminate Through Design
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The most effective way to protect workers is to <strong>eliminate hazards entirely
                through design</strong>. When a risk is designed out, there is no residual hazard to
                manage, no control measures to maintain, and no reliance on human behaviour. This is
                the first and most important step in the designer&rsquo;s hierarchy.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">
                  Practical Examples of Elimination Through Design
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pre-fabrication at ground level</strong> &mdash; designing elements to be
                      assembled on the ground and then lifted into position eliminates work at height
                      during assembly. Roof trusses, steelwork, and modular building services can all
                      be pre-fabricated to reduce time spent working at height.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Permanent edge protection designed in</strong> &mdash; incorporating
                      permanent parapet walls, guardrails, or upstands into the structural design
                      eliminates the need for temporary edge protection during both construction and
                      future maintenance. This protects construction workers, maintenance teams, and
                      building users throughout the structure&rsquo;s life.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Roof access systems</strong> &mdash; designing permanent access
                      platforms, walkways, and anchor points into the roof structure eliminates the
                      need to erect scaffolding or use mobile access equipment for routine maintenance
                      such as cleaning gutters, servicing plant, or replacing roof lights.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintainable building services without confined space entry</strong>{" "}
                      &mdash; routing ducts, pipes, and cables so that all maintenance points are
                      accessible from open areas eliminates the need for anyone to enter a confined
                      space. This is particularly relevant for electrical installations where cables
                      pass through risers, voids, and underground ducts.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-300">Elimination Is Always Preferred</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Elimination removes the hazard <strong className="text-white">permanently</strong>.
                  Unlike control measures (which can fail, be removed, or be bypassed), a design that
                  eliminates a hazard provides protection that does not depend on anyone&rsquo;s
                  behaviour, training, or compliance. This is why elimination sits at the top of the
                  hierarchy and must always be the first option considered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Reduce Through Design ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Reduce Through Design
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Where a risk cannot be eliminated entirely, the designer&rsquo;s next duty is to{" "}
                <strong>reduce the risk so far as is reasonably practicable</strong>. This means
                making design choices that lower the severity, likelihood, or duration of exposure to
                the hazard.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">
                  Practical Examples of Reduction Through Design
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Specifying lighter materials</strong> &mdash; where heavy structural or
                      finishing materials must be used, the designer can specify lighter alternatives
                      (e.g. lightweight blocks instead of dense concrete blocks) to reduce the risk of
                      musculoskeletal injuries from manual handling. Even small reductions in unit
                      weight can significantly reduce cumulative injury risk over a full working day.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Designing safe access for maintenance</strong> &mdash; where work at
                      height cannot be entirely eliminated (e.g. cleaning high-level windows),
                      designing access gantries, cradle systems, or lowering mechanisms reduces the
                      risk by providing safer means of access compared to ladders or scaffolding.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Positioning services to avoid work at height</strong> &mdash; locating
                      distribution boards, isolators, and control equipment at accessible heights
                      rather than at high level reduces the frequency and duration of work at height
                      for maintenance and testing.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Cable routing to avoid buried services</strong> &mdash; designing cable
                      routes that avoid areas known to contain gas mains, water pipes, or other buried
                      services reduces the risk of striking a service during installation or future
                      maintenance. Clear separation and defined routes reduce the likelihood of
                      accidental damage.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">Reduction Is Not Enough on Its Own</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Reducing a risk is valuable, but it <strong className="text-white">does not remove
                  the duty to inform</strong>. Wherever a risk has been reduced but not eliminated,
                  the designer must still communicate the remaining residual risk to those who need to
                  know. A reduced risk is still a risk, and those managing and carrying out the work
                  need to be aware of it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Inform About Residual Risks ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Inform About Residual Risks
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The third tier of the hierarchy requires designers to{" "}
                <strong>provide information about significant residual risks</strong> that remain after
                elimination and reduction have been applied. This ensures that those who will build,
                maintain, or use the structure are aware of the hazards and can plan appropriate
                control measures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">
                  How to Communicate Residual Risks
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Design risk register</strong> &mdash; a structured document that records
                      each significant risk identified, what actions were taken to eliminate or reduce
                      it, and what residual risk remains. This is shared with the principal designer,
                      principal contractor, and other designers as appropriate.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Information on drawings</strong> &mdash; annotating drawings with safety
                      information, such as locations of buried services, areas requiring temporary
                      support during construction, or points where hazardous materials are present.
                      This puts the information directly where it will be seen by those carrying out
                      the work.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Highlighting unusual or non-obvious risks</strong> &mdash; risks that
                      would not be apparent to a competent contractor must be specifically flagged.
                      For example, a non-standard structural system that requires a specific
                      demolition sequence, or unusual ground conditions that affect excavation safety.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Health and safety file contributions</strong> &mdash; information about
                      residual risks that affect future maintenance, refurbishment, or demolition must
                      be provided for inclusion in the health and safety file maintained by the
                      principal designer.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">What NOT to Do</h3>
                </div>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Do not list <strong className="text-white">every conceivable risk</strong>{" "}
                      &mdash; focus on significant risks that are not obvious to a competent contractor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Do not use <strong className="text-white">generic risk assessments</strong>{" "}
                      copied from other projects &mdash; the information must be specific to the design
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Do not use the &ldquo;inform&rdquo; step as an <strong className="text-white">
                      alternative to designing out risks</strong> &mdash; it is the last resort, not
                      the first response
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Designer's Risk Management Hierarchy Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Designer&rsquo;s Risk Management Hierarchy
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            This diagram illustrates the three-tier hierarchy that every designer must follow under
            Regulation 9. The hierarchy must be applied in order &mdash; elimination first, then
            reduction, then information.
          </p>

          <div className="space-y-2">
            {/* Tier 1 — Eliminate */}
            <div className="rounded-xl border-2 border-green-500/50 bg-green-500/5 overflow-hidden">
              <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3 text-center">
                <p className="text-green-400 font-bold text-lg">STEP 1: ELIMINATE</p>
                <p className="text-green-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Most Effective &mdash; Highest Priority
                </p>
              </div>
              <div className="p-4 text-sm text-white/80">
                <p>
                  Remove the hazard entirely through design decisions. No residual risk remains
                  because the hazard no longer exists. Examples: pre-fabrication at ground level,
                  permanent edge protection, designing out confined spaces.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-white/30" />
            </div>

            {/* Tier 2 — Reduce */}
            <div className="rounded-xl border-2 border-amber-500/50 bg-amber-500/5 overflow-hidden">
              <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3 text-center">
                <p className="text-amber-400 font-bold text-lg">STEP 2: REDUCE</p>
                <p className="text-amber-300/70 text-xs uppercase tracking-wider mt-0.5">
                  Where Elimination Is Not Reasonably Practicable
                </p>
              </div>
              <div className="p-4 text-sm text-white/80">
                <p>
                  Lower the severity, likelihood, or duration of exposure through design choices.
                  Residual risk remains but is minimised. Examples: lighter materials, safer access
                  routes, services positioned at accessible heights.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-white/30" />
            </div>

            {/* Tier 3 — Inform */}
            <div className="rounded-xl border-2 border-blue-500/50 bg-blue-500/5 overflow-hidden">
              <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3 text-center">
                <p className="text-blue-400 font-bold text-lg">STEP 3: INFORM</p>
                <p className="text-blue-300/70 text-xs uppercase tracking-wider mt-0.5">
                  For Significant Residual Risks That Remain
                </p>
              </div>
              <div className="p-4 text-sm text-white/80">
                <p>
                  Communicate remaining significant risks to those who need to know &mdash; through
                  design risk registers, drawing annotations, and the health and safety file. Focus on
                  unusual, non-obvious, or significant risks.
                </p>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            The hierarchy must be applied in order &mdash; always try to eliminate before reducing,
            and only inform when risks cannot be further reduced
          </p>
        </section>

        {/* ─── 06 Electrical Design Under CDM ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">06</span>
              Electrical Design Under CDM
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Electrical designers have specific considerations under CDM 2015. Every design decision
                &mdash; from cable routing to switchroom layout &mdash; can affect the safety of
                construction workers, maintenance electricians, and building users for decades to come.
                The designer&rsquo;s hierarchy of eliminate, reduce, and inform applies directly to
                electrical design.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">
                  Key Electrical Design Considerations
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Cable routing to avoid future disturbance</strong> &mdash; route cables
                      so they do not pass through areas likely to be renovated, extended, or subject
                      to structural alterations. Cables in predictable routes (safe zones, defined
                      containment) are less likely to be struck during future building work. Avoid
                      routes through areas where other trades will need to break through floors or
                      walls.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Isolation points accessibility</strong> &mdash; design isolation points
                      (main switches, isolators, RCDs) so they are readily accessible without the
                      need for work at height, confined space entry, or removal of other equipment.
                      Consider emergency situations where rapid isolation may be needed &mdash; an
                      isolator behind a locked cupboard at high level is a design failure.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Emergency lighting design</strong> &mdash; the design of emergency
                      lighting must consider how luminaires will be tested and maintained throughout
                      the building&rsquo;s life. Luminaires in double-height spaces, above staircases,
                      or in difficult-to-reach locations create ongoing work-at-height risks for
                      maintenance teams. Design for accessible testing and lamp replacement.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintenance access for distribution boards</strong> &mdash; distribution
                      boards must have adequate space for safe working, including space to open doors
                      fully, stand at a safe distance, and use test instruments. The designer should
                      consider BS 7671 requirements for accessibility and the practical needs of
                      electricians who will test and maintain the installation.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Switchroom design</strong> &mdash; switchrooms must provide adequate
                      space, ventilation, emergency egress, and fire protection. The layout should
                      allow safe access to all equipment without requiring personnel to reach over or
                      behind live equipment. Arc flash risk must be considered in the design of
                      HV and LV switchgear rooms.
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Design Risk Assessment Example Diagram ─── */}
              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-4">
                  Design Risk Assessment Example &mdash; Distribution Board Location
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Hazard Identified
                    </p>
                    <p className="text-white/80 text-sm">
                      Distribution board located in a ceiling void, requiring ladder access and
                      working in a confined space for maintenance and testing
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDown className="h-5 w-5 text-white/30" />
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Step 1 &mdash; Eliminate
                    </p>
                    <p className="text-white/80 text-sm">
                      Relocate the distribution board to a dedicated cupboard at ground level,
                      accessible from a corridor. This eliminates both work at height and confined
                      space entry.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDown className="h-5 w-5 text-white/30" />
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Step 2 &mdash; Reduce (If Relocation Not Possible)
                    </p>
                    <p className="text-white/80 text-sm">
                      If the board must remain at height, design a permanent access platform with
                      guardrails and adequate headroom. Ensure the void has sufficient ventilation
                      and is not classified as a confined space.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDown className="h-5 w-5 text-white/30" />
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Step 3 &mdash; Inform
                    </p>
                    <p className="text-white/80 text-sm">
                      Record the residual risk in the design risk register. Annotate the drawings
                      with the board location, access requirements, and any special precautions.
                      Include the information in the health and safety file for future maintenance
                      teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Cooperation & Coordination ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">07</span>
              Cooperation &amp; Coordination
            </h2>
            <div className="space-y-4 text-white">
              <p>
                CDM 2015 places a specific duty on designers to{" "}
                <strong>cooperate with the principal designer and other designers</strong>. No design
                exists in isolation &mdash; structural, mechanical, electrical, and architectural
                designs interact, and a risk eliminated in one discipline can be inadvertently created
                in another. Effective cooperation ensures that design risks are managed across the
                whole project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Duties of Cooperation</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Cooperate with the principal designer (PD)</strong> &mdash; the PD is
                      responsible for planning, managing, and coordinating the pre-construction phase,
                      including design. Designers must provide information to the PD and follow their
                      coordination arrangements.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Cooperate with other designers</strong> &mdash; when your design
                      interfaces with or affects another designer&rsquo;s work, you must share
                      information about risks and work together to ensure no hazards fall between the
                      gaps. For example, an electrical designer must coordinate with the structural
                      engineer about cable penetrations and the mechanical engineer about services
                      routing.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Share information about risks</strong> &mdash; if your design creates or
                      identifies a risk that affects another discipline, you must communicate it
                      promptly. This includes sharing design risk information, highlighting
                      constraints, and flagging interface issues.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Attend design coordination meetings</strong> &mdash; regular design
                      coordination meetings (facilitated by the PD) are essential for identifying and
                      managing cross-discipline risks. Designers must participate actively and raise
                      safety concerns.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ensure no gaps in risk management</strong> &mdash; designers must
                      satisfy themselves that the overall design has been coordinated and that no
                      significant risks have fallen between disciplines. If a gap is identified, it
                      must be raised with the PD immediately.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Why Coordination Matters for Electrical Designers
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Electrical installations interact with virtually every other building system. Cable
                  routes pass through structural elements, electrical plant shares space with
                  mechanical equipment, fire alarm designs interface with architectural layouts, and
                  lightning protection systems depend on the structural frame. Without effective
                  coordination, electrical design decisions can create risks for other trades (e.g.
                  cable penetrations weakening structural members) and other designers&rsquo; decisions
                  can create risks for electricians (e.g. insufficient space for safe access to
                  switchgear).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Competence & Proportionality ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              Competence &amp; Proportionality
            </h2>
            <div className="space-y-4 text-white">
              <p>
                CDM 2015 requires that designers must have{" "}
                <strong>adequate skills, knowledge, and experience</strong> for the work they are
                undertaking. This is not about holding a specific CDM qualification &mdash; it is
                about being competent to identify and manage the health and safety risks that arise
                from the design decisions being made.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
                  <p className="font-semibold text-base text-blue-400 mb-2">Competence Requirements</p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Skills</strong> &mdash; the practical ability to identify hazards and
                        apply the risk management hierarchy in design
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Knowledge</strong> &mdash; understanding of CDM duties, the General
                        Principles of Prevention, and the hazards relevant to the type of work
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Experience</strong> &mdash; practical experience with similar design
                        work and its associated risks
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>Organisational capability</strong> &mdash; for organisations, having
                        the systems, resources, and management arrangements to fulfil CDM duties
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
                  <p className="font-semibold text-base text-blue-400 mb-2">
                    Proportionate Risk Management
                  </p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The aim is <strong>not to eliminate all risk</strong> &mdash; this is neither
                        possible nor required by law
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Risk management must be <strong>proportionate</strong> to the level of risk
                        &mdash; simple projects need simple risk management
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Designers must exercise <strong>professional judgement</strong> to balance
                        safety, functionality, aesthetics, and cost
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong>CDM awareness</strong> is expected of all designers, regardless of
                        the size or type of project
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Professional Judgement Is Key
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  CDM 2015 deliberately avoids prescriptive requirements for designer competence. The
                  test is whether the designer has <strong className="text-white">adequate</strong>{" "}
                  skills, knowledge, and experience for the specific work being done. A designer
                  working on a minor domestic rewire needs different competence from one designing the
                  electrical systems for a hospital. The key is that the designer can demonstrate they
                  have considered health and safety in their design decisions and applied the hierarchy
                  proportionately.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    Common Misconceptions About Proportionality
                  </h3>
                </div>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      &ldquo;Proportionate&rdquo; does <strong className="text-white">not</strong>{" "}
                      mean &ldquo;do nothing&rdquo; &mdash; even small projects have foreseeable risks
                      that designers must address
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      &ldquo;Reasonably practicable&rdquo; is <strong className="text-white">not</strong>{" "}
                      the same as &ldquo;affordable&rdquo; &mdash; cost is one factor, but it must be
                      grossly disproportionate to the risk before a safety measure can be rejected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Competence is <strong className="text-white">not</strong> just about holding
                      qualifications &mdash; practical experience and awareness of CDM principles are
                      equally important
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-400" />
            Key Takeaways
          </h2>
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
            <ul className="text-white space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  Regulation 9 requires designers to follow the hierarchy:{" "}
                  <strong>eliminate &rarr; reduce &rarr; inform</strong>, taking into account the
                  General Principles of Prevention.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  The <strong>General Principles of Prevention</strong> (Schedule 1) provide a
                  structured framework: avoid risks, evaluate unavoidable risks, combat at source,
                  adapt to the individual, and give priority to collective measures.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Elimination through design</strong> is the most effective protection because
                  it permanently removes the hazard rather than relying on controls or information.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Electrical designers</strong> have specific CDM considerations including
                  cable routing, isolation accessibility, emergency lighting maintenance, distribution
                  board access, and switchroom design.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  Designers must <strong>cooperate with the PD and other designers</strong> to ensure
                  no gaps exist in risk management across the whole project.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  Competence is about having adequate <strong>skills, knowledge, and experience</strong>{" "}
                  &mdash; not holding a specific qualification. Risk management must be{" "}
                  <strong>proportionate</strong> to the level of risk, exercising professional
                  judgement.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── FAQs ─── */}
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
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Designers' Duties Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4-section-2">
              Next: Risk Assessment in Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CdmRegulationsModule4Section1;
