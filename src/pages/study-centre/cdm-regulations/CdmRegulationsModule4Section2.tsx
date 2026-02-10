import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "design-risk-vs-construction-risk",
    question:
      "What is the key difference between a design risk assessment and a construction risk assessment?",
    options: [
      "A design risk assessment is completed after the project is built; a construction risk assessment is completed before",
      "A design risk assessment focuses on hazards created or influenced by design decisions; a construction risk assessment focuses on hazards arising from the construction process itself",
      "A design risk assessment is only required for projects over £10 million",
      "There is no difference — they are the same document under CDM 2015",
    ],
    correctIndex: 1,
    explanation:
      "A design risk assessment specifically addresses hazards that are created, increased, or influenced by design decisions — for example, specifying a fragile roofing material that creates a fall risk during maintenance. A construction risk assessment, by contrast, focuses on hazards that arise from the construction process itself, such as crane operations or excavation methods. Designers must consider both buildability and whole-life risks.",
  },
  {
    id: "sfairp-test",
    question:
      "The 'so far as is reasonably practicable' (SFAIRP) test requires designers to:",
    options: [
      "Eliminate every conceivable risk regardless of cost",
      "Balance the cost, time, and effort of risk reduction against the degree of risk",
      "Only address risks that have previously caused fatalities",
      "Defer all risk decisions to the principal contractor",
    ],
    correctIndex: 1,
    explanation:
      "The SFAIRP test, established in Edwards v National Coal Board [1949], requires that risks be reduced unless the sacrifice (in cost, time, or effort) is grossly disproportionate to the risk. This does not mean eliminating every risk at any cost — it means weighing the severity and likelihood of harm against the practicability of removing or reducing it. The burden of proof lies with the duty holder to show that further reduction would be grossly disproportionate.",
  },
  {
    id: "bim-risk-integration",
    question:
      "How can Building Information Modelling (BIM) support design risk assessment under CDM?",
    options: [
      "BIM automatically removes all design hazards",
      "BIM replaces the need for a design risk register",
      "BIM allows hazard information to be embedded in the model and shared with all project participants in real time",
      "BIM is only used for cost estimation and has no role in risk management",
    ],
    correctIndex: 2,
    explanation:
      "BIM provides a powerful platform for embedding risk information directly into the digital model of a building. Designers can tag elements with associated hazards and residual risks, which are then visible to all project participants — including contractors, CDM co-ordinators, and facilities managers. This supports the flow of information required by CDM 2015 and helps ensure that residual risks are communicated effectively throughout the project lifecycle.",
  },
];

const faqs = [
  {
    question:
      "Do all designers have to produce a formal design risk assessment under CDM 2015?",
    answer:
      "CDM 2015 does not prescribe a specific format for design risk assessment. However, Regulation 9 requires designers to eliminate foreseeable risks so far as is reasonably practicable and, where risks cannot be eliminated, to reduce them and provide information about remaining risks. In practice, this means designers need a systematic process for identifying, evaluating, and recording design risks — even if the format varies. For simple projects, a brief risk register may suffice; for complex projects, a detailed design risk assessment aligned to RIBA stages is appropriate. The key requirement is that the process is documented and the information is communicated to those who need it.",
  },
  {
    question:
      "What information should a designer provide to a contractor about residual risks?",
    answer:
      "Designers must provide sufficient information about residual risks — those that cannot be eliminated or reduced further through design changes — to enable contractors to plan and carry out the work safely. This includes the nature of the hazard, its location within the design, any assumptions made about the construction method, and any specific precautions or sequences that the contractor should follow. The information should be proportionate to the risk: significant or unusual risks warrant detailed notes, whilst routine risks that any competent contractor would be expected to manage may need only brief reference. Avoid listing generic risks — focus on the specific, project-related hazards that arise from your design decisions.",
  },
  {
    question:
      "How does the 5×5 risk matrix work in design risk assessment?",
    answer:
      "A 5×5 risk matrix plots the likelihood of a hazardous event occurring (rated 1–5 from very unlikely to almost certain) against the severity of the consequences (rated 1–5 from negligible to catastrophic). Multiplying likelihood by severity gives a risk score between 1 and 25. Scores are typically banded into low (1–4), medium (5–9), high (10–16), and very high (17–25) categories. Risks in the high and very high bands demand a design response — either elimination, substitution, or significant risk reduction. The matrix provides a consistent, auditable framework for prioritising which risks to address first and for demonstrating that the SFAIRP test has been applied.",
  },
  {
    question:
      "What is the difference between hazard elimination and risk reduction in the context of design?",
    answer:
      "Hazard elimination means designing out the hazard entirely — for example, using prefabricated modules assembled at ground level instead of requiring work at height, or specifying a non-fragile roof covering instead of a fragile one. Risk reduction means the hazard remains but the design reduces the likelihood or severity of harm — for example, including permanent edge protection in the design for a flat roof that still requires periodic maintenance access. Under CDM 2015, designers must prioritise elimination over reduction wherever reasonably practicable, following the general principles of prevention set out in Schedule 1.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, when must a designer begin the design risk assessment process?",
    options: [
      "Only after planning permission has been granted",
      "At the earliest stage of design, when decisions have the greatest influence on buildability and safety",
      "Only once the principal contractor has been appointed",
      "After the construction phase has started, to capture real-world risks",
    ],
    correctAnswer: 1,
    explanation:
      "Designers must begin risk assessment at the earliest possible stage of design, when decisions have the greatest potential to eliminate or reduce hazards. Early-stage decisions — such as structural form, material selection, and site layout — fundamentally shape the risks that arise during construction, maintenance, and demolition. Waiting until later stages significantly limits the designer's ability to design out hazards.",
  },
  {
    id: 2,
    question:
      "Which of the following is an example of hazard elimination through design?",
    options: [
      "Specifying a safety harness system for roof maintenance",
      "Designing a building with all services accessible from within the building, removing the need for external access at height",
      "Adding warning signs to identify fragile roof panels",
      "Requiring the contractor to produce a method statement for high-risk work",
    ],
    correctAnswer: 1,
    explanation:
      "Designing services to be accessible from within the building eliminates the hazard of working at height for maintenance. This is the highest level of the risk control hierarchy — removing the hazard entirely through design. Specifying harness systems or adding warning signs are forms of risk reduction, not elimination. Requiring method statements transfers risk management responsibility to the contractor rather than addressing it through design.",
  },
  {
    id: 3,
    question:
      "In the Edwards v National Coal Board [1949] case, the court established that:",
    options: [
      "Employers must eliminate all workplace risks regardless of cost",
      "The burden of proving that risk reduction is not reasonably practicable lies with the duty holder",
      "Risk assessment is only required for mining operations",
      "Workers are solely responsible for their own safety",
    ],
    correctAnswer: 1,
    explanation:
      "Edwards v NCB [1949] is the leading case on the meaning of 'reasonably practicable'. The Court of Appeal held that a duty holder must show that the cost of further risk reduction (in money, time, or trouble) would be grossly disproportionate to the risk. Crucially, the burden of proof lies with the duty holder — not the regulator or the injured party. This principle underpins all health and safety legislation in England and Wales, including CDM 2015.",
  },
  {
    id: 4,
    question:
      "A design risk register should be maintained through which stages of a project?",
    options: [
      "Only during RIBA Stage 2 (Concept Design)",
      "Only during the construction phase",
      "Through all design stages, from strategic definition to handover and beyond",
      "Only when requested by the client",
    ],
    correctAnswer: 2,
    explanation:
      "A design risk register is a living document that should be maintained and updated throughout the entire design process — from RIBA Stage 0 (Strategic Definition) through to Stage 7 (Use). As the design develops, new hazards may emerge, existing risks may change, and design decisions may resolve earlier risks. The register should be reviewed at each stage gateway and updated to reflect the current state of the design. It also forms a key part of the health and safety file for the completed building.",
  },
  {
    id: 5,
    question:
      "Which hazard identification technique involves a structured, systematic review of potential deviations from design intent?",
    options: [
      "Toolbox talk",
      "HAZOP (Hazard and Operability Study)",
      "Induction briefing",
      "Site walkabout",
    ],
    correctAnswer: 1,
    explanation:
      "A HAZOP (Hazard and Operability Study) is a structured, systematic examination of a process or design to identify potential deviations from design intent and the hazards they could cause. It uses guide words (such as 'more', 'less', 'reverse', 'other than') applied to each element of the design to prompt consideration of what could go wrong. HAZOP is particularly valuable for complex M&E installations, process engineering, and systems with multiple interacting components.",
  },
  {
    id: 6,
    question:
      "Pre-construction information (PCI) provided by the client should include:",
    options: [
      "Only the project budget and programme",
      "Information about existing structures, ground conditions, hazardous materials, and any restrictions affecting design or construction",
      "The names of all subcontractors who will work on the project",
      "A completed design risk assessment for every element of the building",
    ],
    correctAnswer: 1,
    explanation:
      "Under CDM 2015 Regulation 4, the client must provide pre-construction information (PCI) that is relevant to the design and construction of the project. This includes information about existing structures (including asbestos surveys), ground conditions, buried services, contamination, access restrictions, neighbouring properties, and any health and safety issues from previous construction work on the site. Designers rely on PCI to carry out effective risk assessment — without it, critical hazards may be missed.",
  },
  {
    id: 7,
    question:
      "Which of the following is a common design risk in M&E (mechanical and electrical) installations?",
    options: [
      "Specifying excessively wide corridors",
      "Using too many windows in the facade",
      "Routing services through confined spaces that are difficult to access for maintenance",
      "Selecting paint colours that are not aesthetically pleasing",
    ],
    correctAnswer: 2,
    explanation:
      "Routing services through confined spaces — such as ceiling voids, risers, or underground chambers — creates significant risks during both installation and future maintenance. Workers may face restricted access, poor ventilation, difficulty evacuating in an emergency, and potential exposure to hazardous atmospheres. M&E designers should consider accessibility, maintenance frequency, and emergency egress when routing services, and should aim to locate equipment in spaces that are safe and practical to access.",
  },
  {
    id: 8,
    question:
      "When using a 5×5 risk matrix, a hazard with a likelihood score of 4 (likely) and a severity score of 5 (catastrophic) would produce a risk score of:",
    options: [
      "9 — medium risk",
      "15 — high risk",
      "20 — very high risk",
      "25 — very high risk",
    ],
    correctAnswer: 2,
    explanation:
      "Multiplying likelihood (4) by severity (5) gives a risk score of 20, which falls in the 'very high' band (17–25) on a standard 5×5 matrix. A risk of this magnitude would require immediate design attention — ideally elimination of the hazard, or if that is not reasonably practicable, significant risk reduction measures combined with clear communication of the residual risk to the contractor and end user.",
  },
];

const CdmRegulationsModule4Section2 = () => {
  useSEO({
    title:
      "Risk Assessment in Design | CDM Regulations Module 4.2",
    description:
      "Learn about design risk assessment under CDM 2015 including hazard identification, risk evaluation matrices, design risk registers, the SFAIRP test, designers' information requirements, BIM integration, and common design risks by discipline.",
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
            <Link to="../cdm-regulations-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-blue-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Risk Assessment in Design
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            How designers identify, evaluate, and manage risks created by
            their design decisions &mdash; from hazard identification
            techniques to the legal test of reasonable practicability
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="font-semibold text-blue-400 mb-2">
              In 30 Seconds
            </p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Design risk assessment:</strong>{" "}
                  systematic process for identifying and managing hazards
                  created by design decisions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">SFAIRP:</strong>{" "}
                  risks must be reduced so far as is reasonably practicable
                  &mdash; cost must be grossly disproportionate to justify
                  inaction
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Risk register:</strong>{" "}
                  living document maintained through all RIBA stages
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Information flow:</strong>{" "}
                  designers need PCI from clients and must communicate
                  residual risks to contractors
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="font-semibold text-blue-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Eliminate first:</strong>{" "}
                  design out hazards before considering protective measures
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Record everything:</strong>{" "}
                  use a design risk register aligned to RIBA stages
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Communicate residual risks:</strong>{" "}
                  provide clear, specific information to contractors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Review at every stage:</strong>{" "}
                  update the risk register as the design develops
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
              "Explain what a design risk assessment is and how it differs from a construction risk assessment",
              "Describe hazard identification techniques including design reviews, constructability reviews, and HAZOP studies",
              "Apply a 5×5 likelihood-severity matrix to evaluate and rank design risks",
              "Maintain a design risk register through all RIBA design stages",
              "Explain the legal meaning of 'so far as is reasonably practicable' and the Edwards v NCB principle",
              "Identify the information designers need from clients (PCI) and the residual risk information designers must provide to contractors",
              "Describe tools and techniques including CDM risk assessment forms, BIM integration, and hazard elimination checklists",
              "Recognise common design risks across structural, architectural, M&E, and civil engineering disciplines",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Design Risk Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">
                01
              </span>
              Design Risk Assessment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A <strong className="text-white">design risk assessment</strong>{" "}
                is a systematic process through which designers identify
                hazards created or influenced by their design decisions,
                evaluate the associated risks, and take steps to eliminate or
                reduce them. Under{" "}
                <strong className="text-white">CDM 2015 Regulation 9</strong>,
                every designer has a duty to consider the health and safety
                implications of their work &mdash; not just during
                construction, but through the entire lifecycle of the
                building, including maintenance, refurbishment, and eventual
                demolition.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Design Risk vs. Construction Risk
                </h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">design risk assessment</strong>{" "}
                  focuses on hazards that are{" "}
                  <strong className="text-white">
                    created, increased, or influenced by design decisions
                  </strong>
                  . For example, specifying a fragile roofing material creates
                  a fall-through risk for anyone who accesses the roof during
                  its lifetime. A{" "}
                  <strong className="text-white">
                    construction risk assessment
                  </strong>
                  , by contrast, focuses on hazards arising from the
                  construction process itself &mdash; such as crane
                  operations, excavation methods, or temporary works. Both are
                  required under CDM 2015, but they serve different purposes
                  and are produced by different duty holders.
                </p>
              </div>

              <p>
                Effective design risk assessment is{" "}
                <strong className="text-white">proactive, not reactive</strong>.
                It begins at the earliest stage of design, when decisions have
                the greatest influence on safety outcomes. A change to the
                structural form at concept stage is far simpler and cheaper
                than retrofitting safety measures during construction.
                Designers who leave risk assessment until the detailed design
                stage have already missed the window for the most impactful
                interventions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-2">
                  Why Design Risk Assessment Matters
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Designers shape the risks:
                      </strong>{" "}
                      research consistently shows that a significant
                      proportion of construction accidents can be traced back
                      to design decisions or the absence of design
                      consideration
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Early intervention is most effective:
                      </strong>{" "}
                      the cost and difficulty of eliminating hazards increases
                      exponentially as the project progresses through design
                      to construction
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Legal obligation:
                      </strong>{" "}
                      CDM 2015 Regulation 9 places a specific, non-delegable
                      duty on designers to consider safety in their work
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Whole-life thinking:
                      </strong>{" "}
                      design decisions affect safety not just during
                      construction but for the entire operational life and
                      eventual demolition of the structure
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Identifying Hazards in Design */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">
                02
              </span>
              Identifying Hazards in Design
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Hazard identification is the foundation of design risk
                assessment. Designers must systematically consider what could
                go wrong &mdash; during construction, maintenance, and
                demolition &mdash; as a direct or indirect consequence of
                their design decisions. Several techniques are available:
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Design Review Meetings
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Regular, structured reviews of the design at key stage
                  gateways. These bring together the design team,
                  construction professionals, and (where appropriate) the
                  client to examine the design for buildability and safety
                  issues.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Review each element of the design against a hazard
                      checklist
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Involve contractors early to benefit from their
                      practical construction experience
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Record all identified hazards and actions in the design
                      risk register
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Constructability Reviews
                </h3>
                <p className="text-white/70 text-sm">
                  A constructability review examines whether the design can
                  be built safely, efficiently, and practically. It considers
                  access for plant and materials, sequencing of work,
                  temporary works requirements, and whether the design creates
                  any unusual or complex construction challenges. These
                  reviews are particularly valuable when the design team
                  includes members with limited site experience.
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  HAZOP & HAZID for Complex Projects
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  For complex projects &mdash; particularly those involving
                  process engineering, M&E systems, or unusual structural
                  forms &mdash; formal hazard identification techniques
                  provide a rigorous framework:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        HAZOP (Hazard and Operability Study):
                      </strong>{" "}
                      uses guide words to systematically examine each design
                      element for potential deviations from normal operation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        HAZID (Hazard Identification Study):
                      </strong>{" "}
                      a broader review that identifies hazards across all
                      aspects of the project, often used at the concept or
                      feasibility stage before detailed design begins
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Lessons from Previous Projects
                </h3>
                <p className="text-white/80 text-sm">
                  One of the most valuable sources of hazard information is{" "}
                  <strong className="text-white">
                    experience from previous projects
                  </strong>
                  . Designers should review accident reports, near-miss data,
                  and lessons-learned registers from similar projects to
                  identify recurring hazards. The HSE publishes investigation
                  reports and safety alerts that highlight design-related
                  failures. Many professional bodies maintain databases of
                  design-related incidents that their members can access.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Risk Evaluation */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">
                03
              </span>
              Risk Evaluation
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Once hazards have been identified, the next step is to{" "}
                <strong className="text-white">evaluate</strong> the
                associated risks. Risk evaluation allows designers to
                prioritise their response &mdash; focusing effort on the
                hazards that pose the greatest threat to health and safety.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Likelihood &times; Severity Matrix
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The most widely used method for risk evaluation is a matrix
                  that combines{" "}
                  <strong className="text-white">likelihood</strong> (how
                  probable is the hazardous event?) with{" "}
                  <strong className="text-white">severity</strong> (how
                  serious would the consequences be?). Each factor is scored
                  on a scale &mdash; typically 1 to 5 &mdash; and the
                  scores are multiplied to give a{" "}
                  <strong className="text-white">risk rating</strong>:
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-purple-300 font-medium mb-1">
                      Likelihood Scale
                    </p>
                    <ul className="text-white/70 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">1</span>
                        Very unlikely &mdash; could happen but almost never
                        does
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">2</span>
                        Unlikely &mdash; could happen but only rarely
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">3</span>
                        Possible &mdash; could happen occasionally
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">4</span>
                        Likely &mdash; will probably happen in most
                        circumstances
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">5</span>
                        Almost certain &mdash; expected to happen regularly
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium mb-1">
                      Severity Scale
                    </p>
                    <ul className="text-white/70 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">1</span>
                        Negligible &mdash; first aid only, no lost time
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">2</span>
                        Minor &mdash; minor injury, short-term absence
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">3</span>
                        Moderate &mdash; significant injury, extended absence
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">4</span>
                        Major &mdash; serious injury, permanent disability
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white font-mono w-4">5</span>
                        Catastrophic &mdash; fatality or multiple fatalities
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Risk Banding
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Once calculated, risk scores are grouped into bands that
                  determine the required response:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
                    <p className="text-green-400 font-semibold">1&ndash;4</p>
                    <p className="text-white/60 text-xs">Low</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 text-center">
                    <p className="text-yellow-400 font-semibold">5&ndash;9</p>
                    <p className="text-white/60 text-xs">Medium</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center">
                    <p className="text-orange-400 font-semibold">10&ndash;16</p>
                    <p className="text-white/60 text-xs">High</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center">
                    <p className="text-red-400 font-semibold">17&ndash;25</p>
                    <p className="text-white/60 text-xs">Very High</p>
                  </div>
                </div>
              </div>

              <p>
                Risks in the <strong className="text-white">high</strong> and{" "}
                <strong className="text-white">very high</strong> bands
                demand a design response. Ideally, the designer should
                eliminate the hazard entirely. Where elimination is not
                reasonably practicable, the design should reduce the risk and
                the residual hazard must be clearly communicated to
                contractors and, where relevant, to building users.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Design Risk Register */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">
                04
              </span>
              Design Risk Register
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The <strong className="text-white">design risk register</strong>{" "}
                is the central document for recording and managing design
                risks throughout the project. It captures the hazards
                identified, the risk evaluation, the control measures
                adopted, and any residual risks that remain after the design
                response.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Contents of a Design Risk Register
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Hazard description:</strong>{" "}
                      a clear, specific description of the hazard and the
                      design element that creates or influences it
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Risk evaluation:</strong>{" "}
                      the likelihood, severity, and overall risk score before
                      any design intervention
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Design response:</strong>{" "}
                      what the designer has done to eliminate or reduce the
                      risk &mdash; the specific design change or mitigation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Residual risk:</strong>{" "}
                      the risk that remains after the design response, with a
                      revised risk score
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Information for others:
                      </strong>{" "}
                      notes on residual risks that must be communicated to
                      contractors, the CDM co-ordinator, or building users
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Status &amp; owner:</strong>{" "}
                      who is responsible for the action and whether it is
                      open, in progress, or closed
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-teal-400">
                  Alignment with RIBA Stages
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The design risk register should be reviewed and updated at
                  each RIBA stage gateway:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Stage 0–1:</strong>{" "}
                      Strategic Definition &amp; Preparation &mdash;
                      identify site-wide and project-level hazards
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Stage 2:</strong>{" "}
                      Concept Design &mdash; assess hazards arising from
                      structural form, massing, and material choices
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Stage 3:</strong>{" "}
                      Spatial Coordination &mdash; detailed assessment of
                      interfaces, services routes, and construction sequencing
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Stage 4:</strong>{" "}
                      Technical Design &mdash; final risk assessment of
                      detailed design, specifications, and construction
                      information
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Stage 5–7:</strong>{" "}
                      Construction, Handover &amp; Use &mdash; verify that
                      residual risks have been communicated and captured in
                      the health and safety file
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The "So Far As Reasonably Practicable" Test */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">
                05
              </span>
              The &ldquo;So Far As Reasonably Practicable&rdquo; Test
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                CDM 2015 requires designers to eliminate foreseeable risks{" "}
                <strong className="text-white">
                  so far as is reasonably practicable
                </strong>{" "}
                (SFAIRP). This phrase has a precise legal meaning, established
                through case law over many decades. Understanding it is
                essential for every designer.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Legal Definition
                </h3>
                <p className="text-white/80 text-sm">
                  &ldquo;Reasonably practicable&rdquo; is a narrower term
                  than &ldquo;physically possible&rdquo;. It allows a duty
                  holder to balance the{" "}
                  <strong className="text-white">
                    quantum of risk
                  </strong>{" "}
                  (the severity and likelihood of harm) against the{" "}
                  <strong className="text-white">
                    sacrifice
                  </strong>{" "}
                  (in money, time, or trouble) needed to avert or reduce
                  that risk. If the sacrifice is{" "}
                  <strong className="text-white">
                    grossly disproportionate
                  </strong>{" "}
                  to the risk, the duty holder is not required to take
                  further action.
                </p>
              </div>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  Edwards v National Coal Board [1949]
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The leading case on SFAIRP is{" "}
                  <strong className="text-white">
                    Edwards v National Coal Board [1949]
                  </strong>
                  , in which Lord Justice Asquith stated:
                </p>
                <blockquote className="border-l-2 border-amber-400/40 pl-4 italic text-white/60 text-sm">
                  &ldquo;Reasonably practicable is a narrower term than
                  physically possible, and seems to me to imply that a
                  computation must be made by the owner in which the quantum
                  of risk is placed on one side and the sacrifice involved
                  in the measures necessary for averting the risk (whether
                  in money, time or trouble) is placed on the other, and
                  that, if it be shown that there is a gross disproportion
                  between them &mdash; the risk being insignificant in
                  relation to the sacrifice &mdash; the defendants discharge
                  the onus on them.&rdquo;
                </blockquote>
                <p className="text-white/70 text-sm mt-3">
                  Crucially, the{" "}
                  <strong className="text-white">burden of proof</strong>{" "}
                  lies with the duty holder. It is for the designer (or
                  employer) to demonstrate that further risk reduction would
                  be grossly disproportionate &mdash; not for the regulator
                  or injured party to prove otherwise.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  Applying SFAIRP in Design Practice
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        High-risk hazards:
                      </strong>{" "}
                      where the risk of death or serious injury is
                      significant, a very substantial expenditure is expected
                      before the duty is discharged
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Good practice:
                      </strong>{" "}
                      established industry good practice (e.g. HSE guidance,
                      British Standards, industry codes) is generally
                      considered reasonably practicable &mdash; departing
                      from it requires justification
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Cost alone is not sufficient:
                      </strong>{" "}
                      the test requires &ldquo;gross disproportion&rdquo;
                      &mdash; simply being expensive or inconvenient does not
                      satisfy the test if the risk is serious
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Document your reasoning:
                      </strong>{" "}
                      record why a particular design decision was made,
                      including the alternatives considered and rejected, to
                      demonstrate that the SFAIRP test was applied
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Designers' Information Requirements */}
        <section className="mb-10">
          <div className="border-l-2 border-sky-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-sky-400/80 text-sm font-normal">
                06
              </span>
              Designers&rsquo; Information Requirements
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Effective design risk assessment depends on the flow of
                information between the{" "}
                <strong className="text-white">client</strong>, the{" "}
                <strong className="text-white">designer</strong>, and the{" "}
                <strong className="text-white">contractor</strong>. CDM 2015
                creates a structured information chain that ensures each duty
                holder has what they need to fulfil their obligations.
              </p>

              <div className="bg-white/5 border border-sky-400/30 p-4 rounded-lg">
                <h3 className="text-sky-300 font-medium mb-3">
                  What Designers Need from Clients: Pre-Construction
                  Information (PCI)
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Under Regulation 4, the client must provide pre-construction
                  information that is relevant to the design and construction
                  of the project. This includes:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Existing structures:
                      </strong>{" "}
                      as-built drawings, structural surveys, asbestos
                      management surveys and refurbishment/demolition surveys
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Ground conditions:
                      </strong>{" "}
                      site investigation reports, contamination assessments,
                      groundwater levels
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Buried services:
                      </strong>{" "}
                      utility records, service drawings, previous excavation
                      records
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Hazardous materials:
                      </strong>{" "}
                      known asbestos locations, lead paint, contaminated
                      land, PCBs in existing electrical equipment
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Access &amp; restrictions:
                      </strong>{" "}
                      site access limitations, neighbouring properties,
                      working-hours restrictions, live environment constraints
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-sky-400/30 p-4 rounded-lg">
                <h3 className="text-sky-300 font-medium mb-3">
                  What Designers Provide to Contractors: Residual Risk
                  Information
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Where a designer cannot eliminate a hazard, they must
                  provide information about the residual risk to those who
                  need it. This information should be:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Specific:</strong>{" "}
                      focused on the particular, project-related hazards
                      arising from the design &mdash; not generic lists of
                      obvious risks
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Proportionate:</strong>{" "}
                      significant or unusual risks warrant detailed notes;
                      routine risks that any competent contractor would manage
                      need only brief mention
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Clear:</strong>{" "}
                      written in plain language, located on relevant drawings
                      or in a stand-alone hazard schedule
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Timely:</strong>{" "}
                      provided early enough for the contractor to plan their
                      work safely &mdash; not handed over at the last minute
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  The Information Chain
                </h3>
                <p className="text-white/80 text-sm">
                  CDM 2015 creates a continuous information chain:{" "}
                  <strong className="text-white">
                    Client &rarr; Designer &rarr; Contractor &rarr; Health
                    &amp; Safety File
                  </strong>
                  . The client provides PCI to designers. Designers use it to
                  inform their risk assessment and then pass residual risk
                  information to contractors. Contractors use this information
                  to plan safe working methods. Finally, the residual risks
                  and as-built information are captured in the health and
                  safety file for the building&rsquo;s future owners and
                  occupiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Tools & Techniques */}
        <section className="mb-10">
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400/80 text-sm font-normal">
                07
              </span>
              Tools &amp; Techniques
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A range of tools and techniques support designers in
                carrying out effective risk assessment under CDM 2015. The
                choice of tool depends on the scale and complexity of the
                project, the available technology, and the design
                team&rsquo;s preferred methods.
              </p>

              <div className="bg-white/5 border border-indigo-400/30 p-4 rounded-lg">
                <h3 className="text-indigo-300 font-medium mb-3">
                  CDM Design Risk Assessment Forms
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Standardised forms provide a structured template for
                  recording design risks. Many professional bodies and
                  industry organisations publish their own versions. A good
                  form typically includes:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Drawing or element reference
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Hazard description and affected phase (construction /
                      maintenance / demolition)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Risk evaluation (likelihood &times; severity)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Designer&rsquo;s action (eliminate / reduce / inform)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Residual risk information for contractors
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-indigo-400/30 p-4 rounded-lg">
                <h3 className="text-indigo-300 font-medium mb-3">
                  BIM Integration
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Building Information Modelling (BIM) provides a powerful
                  platform for embedding risk information directly into the
                  digital model of a building:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Hazard tagging:
                      </strong>{" "}
                      individual elements can be tagged with associated
                      hazards and residual risk notes, visible to all project
                      participants
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        4D sequencing:
                      </strong>{" "}
                      time-linked models allow designers and contractors to
                      visualise the construction sequence and identify
                      clashes, access problems, and temporary works
                      requirements
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Clash detection:
                      </strong>{" "}
                      automated clash detection identifies spatial conflicts
                      between structural, architectural, and M&E elements
                      before they become problems on site
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Health &amp; safety file:
                      </strong>{" "}
                      the BIM model can form the backbone of the health and
                      safety file, ensuring that residual risk information
                      travels with the building throughout its life
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-indigo-400/30 p-4 rounded-lg">
                <h3 className="text-indigo-300 font-medium mb-3">
                  Hazard Elimination Checklists
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Checklists provide a systematic prompt for designers to
                  consider common hazards. Examples include:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-indigo-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Can work at height be avoided by designing services
                      accessible from ground or floor level?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-indigo-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Can fragile materials be replaced with non-fragile
                      alternatives?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-indigo-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Can heavy elements be designed for mechanical handling
                      rather than manual lifting?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-indigo-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Can confined space entry be eliminated by relocating
                      equipment or providing external access points?
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-indigo-400/60 mt-0.5 flex-shrink-0" />
                    <span>
                      Can the need for live electrical working be designed
                      out through isolation-friendly layouts?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-indigo-400">
                  Design for Safety Toolkits
                </h3>
                <p className="text-white/80 text-sm">
                  Several organisations publish design-for-safety toolkits
                  that collate guidance, case studies, and practical
                  examples. These include the{" "}
                  <strong className="text-white">
                    ICE Design for Safety guidance
                  </strong>
                  , the{" "}
                  <strong className="text-white">
                    RIBA Plan of Work Health and Safety Overlay
                  </strong>
                  , and the{" "}
                  <strong className="text-white">
                    APS CDM Designers&rsquo; Guide
                  </strong>
                  . These resources help designers integrate safety
                  considerations into every stage of the design process
                  without creating excessive bureaucracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Common Design Risks by Discipline */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">
                08
              </span>
              Common Design Risks by Discipline
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Different engineering and architectural disciplines create
                characteristic hazard profiles. Understanding these common
                risks helps designers target their risk assessment efforts
                effectively.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Structural Engineering
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Temporary works:
                      </strong>{" "}
                      the design of the permanent structure significantly
                      influences the temporary works required during
                      construction &mdash; propping, shoring, formwork,
                      falsework. A design that is stable only in its
                      completed form may be dangerously unstable during
                      construction.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Heavy lifting:
                      </strong>{" "}
                      specifying large, heavy structural elements (such as
                      precast beams or steel sections) creates risks
                      associated with crane operations, rigging, and manual
                      handling. Designers should consider element weights and
                      lifting access in their design.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Demolition sequence:
                      </strong>{" "}
                      structural designs should consider how the building
                      will eventually be demolished, ensuring that a safe
                      dismantling sequence exists.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Architecture
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Fragile surfaces:
                      </strong>{" "}
                      specifying fragile roofing or ceiling materials creates
                      a fall-through risk for anyone accessing the roof
                      during construction or future maintenance. Designers
                      should specify non-fragile alternatives wherever
                      reasonably practicable.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Glazing at height:
                      </strong>{" "}
                      large glazed facades, atria, and rooflights create
                      risks during installation, cleaning, and replacement.
                      Designers should consider how glazing will be accessed
                      safely throughout the building&rsquo;s life.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Maintenance access:
                      </strong>{" "}
                      every element of the building will eventually need
                      maintenance or replacement. Designers should provide
                      permanent, safe access provisions &mdash; such as
                      parapets, anchor points, walkways, and access hatches
                      &mdash; rather than assuming that temporary measures
                      will suffice.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Mechanical &amp; Electrical (M&amp;E)
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Confined spaces:
                      </strong>{" "}
                      routing services through ceiling voids, risers,
                      underground chambers, or other restricted spaces
                      creates significant risks during installation and
                      maintenance. Designers should consider accessibility
                      and emergency egress.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Live working:
                      </strong>{" "}
                      electrical designs that require work on or near live
                      equipment create a risk of electrocution. Designers
                      should specify isolation-friendly layouts that allow
                      circuits to be worked on dead, with clearly identified
                      isolation points and adequate working space.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Asbestos proximity:
                      </strong>{" "}
                      in refurbishment projects, M&E services often run
                      through or adjacent to areas containing asbestos-
                      containing materials (ACMs). Designers must check the
                      asbestos survey, identify affected areas, and design
                      service routes that avoid disturbing ACMs wherever
                      possible.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Heavy equipment:
                      </strong>{" "}
                      plant rooms often contain heavy equipment (chillers,
                      boilers, transformers) that requires mechanical
                      handling for installation and eventual replacement.
                      Designers should ensure adequate access routes, lifting
                      provisions, and structural support.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Civil Engineering
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Excavations:
                      </strong>{" "}
                      deep excavations, basement construction, and
                      foundation works create risks of collapse, flooding,
                      and contact with buried services. Designers should
                      consider ground conditions, water table levels, and
                      the proximity of existing structures.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Buried services:
                      </strong>{" "}
                      striking underground gas mains, electricity cables,
                      water mains, or telecommunications cables during
                      excavation is one of the most common causes of
                      construction incidents. Designers must identify all
                      buried services and, where possible, design foundations
                      and drainage to avoid them.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Working near traffic:
                      </strong>{" "}
                      civil engineering works adjacent to live roads, railways,
                      or waterways expose workers to collision and drowning
                      risks. Designers should consider traffic management
                      requirements and, where possible, design works to
                      minimise exposure.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Remember: Designers Cannot Pass the Buck
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  A common misconception is that designers can simply list
                  risks and leave them for the contractor to manage. CDM
                  2015 requires designers to{" "}
                  <strong className="text-white">
                    actively eliminate or reduce risks through design
                  </strong>{" "}
                  before communicating any residual risks. Simply writing
                  &ldquo;contractor to ensure safe system of work&rdquo; on
                  a drawing is not acceptable &mdash; designers must
                  demonstrate that they have applied the hierarchy of risk
                  control to their own design decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram 1: Design Risk Assessment Process Flowchart */}
        <section className="mb-10">
          <h3 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">
            Design Risk Assessment Process Flowchart
          </h3>

          {/* Start box */}
          <div className="flex justify-center mb-3">
            <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-white font-semibold text-sm">
                Design Element or Decision
              </p>
              <p className="text-white/60 text-xs mt-1">
                Structural form, material choice, services route, access
                provision, etc.
              </p>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-blue-400/40"></div>
          </div>

          {/* Identify hazards */}
          <div className="flex justify-center mb-3">
            <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-cyan-300 font-semibold text-sm">
                Identify Hazards
              </p>
              <p className="text-white/60 text-xs mt-1">
                Design review, constructability review, HAZOP/HAZID,
                lessons learned
              </p>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-blue-400/40"></div>
          </div>

          {/* Evaluate risk */}
          <div className="flex justify-center mb-3">
            <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-purple-300 font-semibold text-sm">
                Evaluate Risk
              </p>
              <p className="text-white/60 text-xs mt-1">
                Likelihood &times; severity matrix &mdash; score and rank
                each risk
              </p>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-blue-400/40"></div>
          </div>

          {/* Decision: can it be eliminated? */}
          <div className="flex justify-center mb-3">
            <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-amber-300 font-semibold text-sm">
                Can the hazard be eliminated through design?
              </p>
            </div>
          </div>

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-3">
            {/* Yes branch */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/5 border border-green-400/30 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-green-300 font-medium text-xs">
                  Yes &mdash; Eliminate
                </p>
              </div>
              <div className="w-0.5 h-4 bg-green-400/30"></div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Redesign to remove the hazard entirely
                </p>
              </div>
              <div className="w-0.5 h-4 bg-green-400/30"></div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Update risk register &mdash; hazard closed
                </p>
              </div>
            </div>

            {/* No branch */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/5 border border-amber-400/30 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-amber-300 font-medium text-xs">
                  No &mdash; Reduce &amp; Inform
                </p>
              </div>
              <div className="w-0.5 h-4 bg-amber-400/30"></div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Reduce risk through design changes (SFAIRP)
                </p>
              </div>
              <div className="w-0.5 h-4 bg-amber-400/30"></div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-center w-full">
                <p className="text-white/80 text-xs">
                  Communicate residual risk to contractor
                </p>
              </div>
            </div>
          </div>

          {/* Arrow down to common step */}
          <div className="flex justify-center mb-3">
            <div className="w-0.5 h-6 bg-blue-400/40"></div>
          </div>

          {/* Record in register */}
          <div className="flex justify-center">
            <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl px-5 py-3 text-center max-w-sm">
              <p className="text-white font-semibold text-sm">
                Record in Design Risk Register
              </p>
              <p className="text-white/60 text-xs mt-1">
                Hazard, evaluation, design response, residual risk, and
                information for others
              </p>
            </div>
          </div>
        </section>

        {/* Diagram 2: Risk Matrix (5×5) */}
        <section className="mb-10">
          <h3 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">
            5&times;5 Risk Matrix &mdash; Likelihood vs Severity
          </h3>

          <div className="overflow-x-auto">
            <div className="min-w-[340px] max-w-2xl mx-auto">
              {/* Column headers */}
              <div className="grid grid-cols-6 gap-1 mb-1">
                <div className="p-1"></div>
                <div className="bg-white/5 rounded p-1 text-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    1<br />Negligible
                  </p>
                </div>
                <div className="bg-white/5 rounded p-1 text-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    2<br />Minor
                  </p>
                </div>
                <div className="bg-white/5 rounded p-1 text-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    3<br />Moderate
                  </p>
                </div>
                <div className="bg-white/5 rounded p-1 text-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    4<br />Major
                  </p>
                </div>
                <div className="bg-white/5 rounded p-1 text-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    5<br />Catastrophic
                  </p>
                </div>
              </div>

              {/* Row 5: Almost certain */}
              <div className="grid grid-cols-6 gap-1 mb-1">
                <div className="bg-white/5 rounded p-1 flex items-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    5 Almost certain
                  </p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">5</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">10</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">15</p>
                </div>
                <div className="bg-red-500/20 border border-red-500/30 rounded p-1 text-center">
                  <p className="text-red-300 text-xs font-bold">20</p>
                </div>
                <div className="bg-red-500/20 border border-red-500/30 rounded p-1 text-center">
                  <p className="text-red-300 text-xs font-bold">25</p>
                </div>
              </div>

              {/* Row 4: Likely */}
              <div className="grid grid-cols-6 gap-1 mb-1">
                <div className="bg-white/5 rounded p-1 flex items-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    4 Likely
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">4</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">8</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">12</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">16</p>
                </div>
                <div className="bg-red-500/20 border border-red-500/30 rounded p-1 text-center">
                  <p className="text-red-300 text-xs font-bold">20</p>
                </div>
              </div>

              {/* Row 3: Possible */}
              <div className="grid grid-cols-6 gap-1 mb-1">
                <div className="bg-white/5 rounded p-1 flex items-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    3 Possible
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">3</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">6</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">9</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">12</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">15</p>
                </div>
              </div>

              {/* Row 2: Unlikely */}
              <div className="grid grid-cols-6 gap-1 mb-1">
                <div className="bg-white/5 rounded p-1 flex items-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    2 Unlikely
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">2</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">4</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">6</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">8</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded p-1 text-center">
                  <p className="text-orange-300 text-xs font-bold">10</p>
                </div>
              </div>

              {/* Row 1: Very unlikely */}
              <div className="grid grid-cols-6 gap-1">
                <div className="bg-white/5 rounded p-1 flex items-center">
                  <p className="text-white/60 text-[10px] sm:text-xs leading-tight">
                    1 Very unlikely
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">1</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">2</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">3</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-1 text-center">
                  <p className="text-green-300 text-xs font-bold">4</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-1 text-center">
                  <p className="text-yellow-300 text-xs font-bold">5</p>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500/40"></div>
                  <span className="text-white/60">Low (1&ndash;4)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500/40"></div>
                  <span className="text-white/60">Medium (5&ndash;9)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-orange-500/30 border border-orange-500/40"></div>
                  <span className="text-white/60">High (10&ndash;16)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-red-500/30 border border-red-500/40"></div>
                  <span className="text-white/60">Very High (17&ndash;25)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-white/60 text-xs text-center">
              Risks scoring{" "}
              <strong className="text-white">10 or above</strong> (high and
              very high) require a{" "}
              <strong className="text-white">design response</strong> &mdash;
              either elimination of the hazard or significant reduction with
              clear communication of the residual risk. Risks scoring 5&ndash;9
              (medium) should be reviewed and reduced where reasonably
              practicable. Low risks (1&ndash;4) should be recorded but may
              not require specific design intervention.
            </p>
          </div>
        </section>

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
            <Link to="../cdm-regulations-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4-section-3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CdmRegulationsModule4Section2;
