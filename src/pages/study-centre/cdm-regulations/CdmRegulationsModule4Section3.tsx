import { ArrowLeft, Wrench, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "cdm-m4s3-whole-life-approach",
    question:
      "A designer specifies a flat roof with rooftop mechanical plant but provides no permanent safe access route from the building interior to the roof. Under CDM 2015, which whole-life design failure does this represent?",
    options: [
      "A construction sequencing error — the contractor should install temporary access during the build phase and remove it afterwards",
      "A failure to consider safe maintenance — the designer has not provided permanent safe access for the maintenance personnel who will service the rooftop plant repeatedly throughout the building's 50–60 year life",
      "No failure at all — maintenance contractors are expected to provide their own access equipment such as scaffolding or cherry pickers",
      "A planning compliance issue only — the local authority requires roof access for fire safety inspections",
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 Regulation 9 requires designers to consider the health and safety of all persons affected by the design throughout the entire lifecycle of the structure — not just during construction, but during maintenance, cleaning, refurbishment, and demolition. A flat roof with mechanical plant will require regular maintenance visits (typically quarterly for HVAC systems, annually for comprehensive servicing) over the building's entire operational life. If the designer provides no permanent safe access route, every maintenance visit will require temporary access equipment — scaffolding, mobile elevated work platforms, or ladders — each of which introduces foreseeable risks of falls from height, manual handling injuries, and struck-by hazards. The designer has a duty to design in permanent safe access: internal staircase access to roof level, guardrailed walkways between the access point and the plant, and anchor points for fall arrest systems where guardrails are not practicable.",
  },
  {
    id: "cdm-m4s3-safe-construction-prefab",
    question:
      "Which of the following is the MOST effective way for a designer to reduce the risk of falls from height during the construction of a multi-storey building's electrical installation?",
    options: [
      "Specify that all electricians must wear safety harnesses when working above 2 metres",
      "Include a note on the drawings requiring the contractor to provide scaffolding at all high-level working locations",
      "Design the electrical containment and distribution systems so that cable tray assemblies, luminaire brackets, and riser components are pre-fabricated at ground level or offsite and lifted into position as complete assemblies, minimising the time workers spend at height",
      "Require the principal contractor to carry out a risk assessment for work at height and produce a method statement",
    ],
    correctIndex: 2,
    explanation:
      "Under CDM 2015, the hierarchy of risk control requires designers to first eliminate hazards through design before relying on protective measures or personal protective equipment. Designing electrical containment and distribution systems for pre-fabrication at ground level or offsite manufacture moves the hazardous work away from height and into a controlled environment. Cable tray assemblies can be pre-wired and tested at ground level before being lifted into position; luminaire brackets can be pre-assembled with wiring connections made at bench height; riser components can be manufactured as complete modules with cables, containment, and distribution boards already fitted. This approach dramatically reduces the time electricians spend working at height on ladders, scaffolding, or mobile platforms. Specifying harnesses (PPE) is the lowest level of the control hierarchy and should only be used where higher controls are not reasonably practicable.",
  },
  {
    id: "cdm-m4s3-designing-for-demolition",
    question:
      "A designer is specifying a structural steel frame with bolted connections for a new industrial building. From a 'designing for demolition' perspective under CDM 2015, why are bolted connections preferable to welded connections?",
    options: [
      "Bolted connections are always cheaper than welded connections, so they reduce the project budget",
      "Bolted connections are easier to fabricate in the steel workshop, reducing the manufacturer's production time",
      "Bolted connections allow the structure to be disassembled in a controlled manner during future demolition — individual members can be unbolted and removed sequentially, maintaining structural stability throughout the process, whereas welded connections require cutting which is less predictable and creates fire and fume hazards",
      "There is no difference between bolted and welded connections from a demolition perspective — both are equally safe to demolish",
    ],
    correctIndex: 2,
    explanation:
      "CDM 2015 requires designers to consider the entire lifecycle of the structure, including its eventual demolition. Bolted connections are significantly preferable from a demolition perspective because they allow controlled disassembly — individual structural members can be unbolted and removed in a planned sequence, maintaining the stability of the remaining structure throughout the process. This is far safer than cutting welded connections, which requires hot work (creating fire and fume hazards), produces less predictable structural behaviour during cutting (because the load path changes suddenly when a weld is cut through), and generates sparks and molten metal that can injure workers below. Additionally, bolted steel members can often be reused or recycled more easily because they are removed intact, whereas cutting damages the member ends. The designer should record the connection details, bolt sizes, and torque values in the Health and Safety File so that future demolition engineers have the information they need to plan a safe disassembly sequence. BS 6187 (the demolition code) emphasises the importance of understanding structural connections before commencing demolition work.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "How does CDM 2015 define 'buildability' and is the term used in the regulations themselves?",
    answer:
      "The term 'buildability' does not appear explicitly in CDM 2015. However, the concept is embedded throughout the regulations, particularly in Regulation 9 (Duties of designers) which requires designers to take into account the general principles of prevention when preparing or modifying a design, and to eliminate foreseeable risks to the health and safety of any person carrying out or affected by construction work. The Construction Industry Research and Information Association (CIRIA) first formally defined buildability in 1983 as 'the extent to which the design of a building facilitates ease of construction, subject to the overall requirements for the completed building.' Under CDM 2015, designers must consider the sequence of construction, the methods likely to be used, the plant and equipment required, the access needed, the temporary works implications, and the working conditions that construction workers will face. A design that looks elegant on paper but requires dangerous construction methods, excessive work at height, or complex temporary works in confined spaces has poor buildability and may breach the designer's CDM duties.",
  },
  {
    question:
      "What is the difference between 'value engineering' and compromising safety, and how should designers approach this under CDM?",
    answer:
      "Value engineering is a systematic method of improving the value of a project by examining its functions and finding ways to achieve those functions at lower cost without reducing quality or performance. When done properly, value engineering can actually improve both buildability and safety — for example, by substituting a complex structural detail with a simpler one that is cheaper to construct and safer to build. The problem arises when value engineering is used as a cost-cutting exercise that removes safety-critical features. Under CDM 2015, designers must not allow cost pressures to compromise the health and safety of construction workers or future users. Removing edge protection anchorage points to save money, or substituting pre-fabricated elements with site-built alternatives to reduce material costs but increasing on-site risk, would be unacceptable. The test is whether the value engineering change introduces new foreseeable risks or removes design features included to manage risks. The Health and Safety File should record these decisions transparently.",
  },
  {
    question:
      "How far into the future must designers consider maintainability under CDM 2015?",
    answer:
      "CDM 2015 requires designers to consider the health and safety of all persons who will maintain, repair, clean, refurbish, or eventually demolish the structure throughout its entire operational life. For most buildings, this means a design life of 50–60 years, although some structures (bridges, tunnels, dams) may have design lives of 100–120 years. This is a significant obligation because it means designers must anticipate maintenance activities that will occur decades after the building is completed, often by workers who have no connection to the original design team. Practical examples include: designing roof-mounted plant with permanent safe access so that maintenance engineers can service equipment safely; specifying window systems that can be cleaned safely from inside or from permanent access equipment; providing adequate working space around electrical switchgear; and designing building services with sufficient space for future modifications. The information about these design decisions must be recorded in the Health and Safety File.",
  },
  {
    question:
      "What role does the Health and Safety File play in relation to buildability and maintainability?",
    answer:
      "The Health and Safety File is a key document required by CDM 2015 Regulation 12 that records information likely to be needed to ensure health and safety during any subsequent work on the structure — including maintenance, repair, renovation, and demolition. The principal designer must prepare the file during the project and hand it to the client on completion. In relation to buildability and maintainability, the Health and Safety File should contain: 'as built' drawings and specifications showing the actual construction; details of materials used, particularly any that may present hazards during maintenance or demolition (such as asbestos-containing materials, lead paint, or structural adhesives); details of the building's structural system including any pre-stressed or post-tensioned elements; the location and specification of all building services including isolation points and drainage runs; details of designed-in access provisions for maintenance (roof anchor points, cradle tracks, access hatches); information about residual hazards that could not be eliminated through design; and details of specialist construction methods that would affect future work. The file must be kept available for the life of the structure and transfers to any new owner.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following best describes 'buildability' in the context of CDM 2015?",
    options: [
      "The ability to construct a building within budget and on programme regardless of the methods used",
      "Designing structures that can be constructed safely and efficiently, considering how the building will be built and not just what it will look like when finished",
      "The structural capacity of a building to withstand applied loads during the construction phase only",
      "The speed at which a building can be erected using the fastest available construction methods",
    ],
    correctAnswer: 1,
    explanation:
      "Buildability means designing for safe and efficient construction — it requires designers to consider HOW the building will be built, not just what the finished product will look like. Under CDM 2015, designers must take into account the general principles of prevention when preparing designs, which includes considering the construction methods, sequences, plant and equipment, access arrangements, and working conditions that will be required. A design with good buildability can be constructed safely, with foreseeable risks eliminated or reduced at the design stage. While cost and programme are important considerations, the CDM definition of buildability is fundamentally about health and safety during the construction process and throughout the structure's entire lifecycle.",
  },
  {
    id: 2,
    question:
      "CDM 2015 requires designers to adopt a 'whole-life approach.' Which of the following phases must designers consider?",
    options: [
      "Construction only — maintenance and demolition are the responsibility of future owners",
      "Construction and maintenance only — demolition is too far in the future to be foreseeable",
      "Construction, maintenance, cleaning, refurbishment, and eventual demolition — the entire lifecycle of the structure",
      "Only the phases that occur during the designer's professional indemnity insurance period",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 Regulation 9 requires designers to consider the health and safety of all persons who will be affected by the design at any point during the structure's lifecycle. This explicitly includes construction, maintenance, cleaning, refurbishment, and eventual demolition. The whole-life approach means that a designer cannot focus solely on how a building will be constructed — they must also consider how it will be maintained safely over 50–60 years, how it will be cleaned (particularly glazing at height), how it might be refurbished or altered in future, and how it will eventually be demolished or decommissioned. This is a fundamental shift from pre-CDM thinking, where designers typically only considered the finished product.",
  },
  {
    id: 3,
    question:
      "Which of the following is the MOST effective way for a designer to address the risk of falls from height during construction?",
    options: [
      "Specify that all workers must wear safety harnesses when working above 2 metres",
      "Include a requirement in the specification for the contractor to provide scaffolding at all times",
      "Design the structure so that work at height is eliminated or reduced — for example, by specifying ground-level pre-assembly or offsite manufacture of components",
      "Add a note to the drawings stating 'Contractor to manage work at height risks'",
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, the hierarchy of risk control requires designers to first eliminate hazards through design before relying on protective measures. Designing out work at height is the most effective approach because it removes the hazard entirely rather than managing it. Pre-assembly at ground level, offsite manufacture, and designing connections that can be made from below are all examples of eliminating work at height through design. Specifying harnesses is the lowest level of the hierarchy and should only be relied upon when higher-level controls are not reasonably practicable. Adding notes transferring risk to the contractor is a breach of Regulation 9 — designers cannot simply pass their responsibilities down the supply chain.",
  },
  {
    id: 4,
    question:
      "Under CDM 2015, which of the following is an example of designing for safe maintenance?",
    options: [
      "Locating all rooftop mechanical plant behind a parapet wall with permanent guardrailed walkways, anchor points for harnesses, and safe isolation points accessible from a standing position",
      "Installing rooftop plant in the cheapest available location regardless of maintenance access arrangements",
      "Assuming that maintenance contractors will bring their own mobile access equipment and safety measures for each visit",
      "Specifying that maintenance should only be carried out by industrial rope access technicians to avoid the cost of permanent access",
    ],
    correctAnswer: 0,
    explanation:
      "Designing for safe maintenance means providing permanent, designed-in features that allow maintenance to be carried out safely throughout the building's life. Locating rooftop plant behind a parapet wall with permanent guardrailed walkways, anchor points, and accessible isolation points is an excellent example because it eliminates or reduces the risks of falls from height, provides safe access without requiring temporary equipment, and ensures that electrical isolation can be carried out safely from a standing position. Under CDM 2015, designers must consider the maintenance needs of every element they design and provide safe access arrangements as a permanent part of the building fabric. Assuming that maintenance contractors will bring their own equipment transfers the risk without addressing it through design, which is contrary to the designer's duties under Regulation 9.",
  },
  {
    id: 5,
    question:
      "What guidance does BS 8213-1 provide in relation to designing for safe cleaning?",
    options: [
      "BS 8213-1 covers the structural design of window frames only and has no relevance to cleaning safety",
      "BS 8213-1 provides guidance on the design of windows that can be cleaned safely, including requirements for reversible windows, accessible openings, and the avoidance of designs that require external access at height for routine cleaning",
      "BS 8213-1 is a superseded standard that has been withdrawn and replaced by CDM 2015",
      "BS 8213-1 only applies to residential buildings and has no application to commercial or industrial properties",
    ],
    correctAnswer: 1,
    explanation:
      "BS 8213-1 (Windows, doors and rooflights — Design for safety in use and during cleaning of windows) provides essential guidance for designers on how to design windows that can be cleaned safely. The standard covers the design of reversible windows that allow external glass surfaces to be cleaned safely from inside the building, the specification of windows with accessible openings that permit safe cleaning, and the avoidance of window designs that would require external access at height (scaffolding, cradles, or rope access) for routine cleaning. Under CDM 2015, designers must consider how the glazing they specify will be cleaned throughout the building's life. A large curtain wall facade that can only be cleaned using a building maintenance unit (BMU) or rope access has significantly higher maintenance risk than windows designed to be cleaned safely from inside.",
  },
  {
    id: 6,
    question:
      "Why must designers consider demolition at the design stage, even though the building has not yet been constructed?",
    options: [
      "They do not need to — demolition is solely the demolition contractor's responsibility under CDM 2015",
      "Because CDM 2015 requires designers to consider the health and safety of all persons affected by the design throughout the structure's entire lifecycle, including those who will eventually demolish it, potentially 50–100 years in the future",
      "Only to calculate the demolition cost for the client's whole-life cost analysis and budget planning",
      "Because planning permission always requires a demolition method statement before construction can begin",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Regulation 9 requires designers to consider the health and safety of all persons affected by the design throughout the entire lifecycle of the structure, including those who will carry out future demolition work. Design decisions made today can have significant health and safety implications for demolition workers 50–100 years in the future. For example: specifying composite materials that cannot be easily separated creates hazardous waste processing challenges; using structural adhesives instead of mechanical fixings makes disassembly difficult and dangerous; and designing complex interconnected structural systems without clear load paths makes partial demolition risky. Good design for demolition includes designing for disassembly, recording structural systems in the Health and Safety File, and avoiding materials that become hazardous over time. BS 6187 (the demolition code) provides detailed guidance.",
  },
  {
    id: 7,
    question:
      "Which of the following must the principal designer include in the Health and Safety File?",
    options: [
      "Only the original architect's drawings and the project budget — no other information is required",
      "A comprehensive record including as-built drawings, information about materials (especially hazardous ones), structural system details, services routing, designed-in access provisions, and residual hazard information",
      "Only information about accidents that occurred during the construction phase",
      "A copy of the principal contractor's construction phase plan and nothing else",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Regulation 12 requires the principal designer to prepare a Health and Safety File containing information likely to be needed for the health and safety of anyone carrying out future construction work on the structure. This includes: 'as built' drawings showing actual construction details; information about materials used, especially hazardous materials such as asbestos-containing products, lead paint, or structural adhesives; details of the structural system including pre-stressed or post-tensioned elements and their load paths; the routing and specification of all building services with isolation points; details of designed-in safe access provisions such as roof anchor points, cradle tracks, and maintenance walkways; and information about any residual hazards that could not be eliminated through design. The file is a living document that must be updated when alterations are made and must be kept available for the life of the structure.",
  },
  {
    id: 8,
    question:
      "A case study describes a school building where the designer specified an internal courtyard with a fully glazed roof at 8 metres height. From a buildability and maintainability perspective, what is the PRIMARY concern?",
    options: [
      "The glazed roof will allow too much solar gain into the courtyard, creating overheating issues",
      "The design creates a foreseeable requirement for repeated work at height throughout the building's life — for cleaning, maintenance, and eventual replacement of the glazing — and the designer must provide permanent safe access systems or redesign to eliminate the height hazard",
      "The glazed roof will be more expensive to construct than a solid roof, exceeding the project budget",
      "The courtyard design will reduce the lettable floor area of the school and is therefore poor value for money",
    ],
    correctAnswer: 1,
    explanation:
      "The primary CDM concern is that a fully glazed roof at 8 metres height creates a foreseeable requirement for repeated work at height throughout the building's entire operational life. The glazing will need regular cleaning (internal and external surfaces), periodic inspection and maintenance of seals and fixings, and eventual replacement of damaged or degraded panels. Each of these activities exposes workers to the risk of falls from height — the single largest cause of fatal injuries in the UK construction and maintenance sectors. Under CDM 2015, the designer must either redesign to eliminate the height hazard (for example, by lowering the roof, specifying self-cleaning glass, or providing accessible openable panels) or provide permanent safe access systems (such as a gantry, monorail, or fixed access platforms) that allow all maintenance activities to be carried out without temporary access equipment. The Health and Safety File must record the access provisions and maintenance procedures.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function CdmRegulationsModule4Section3() {
  useSEO({
    title: "Buildability & Maintainability | CDM Regulations Module 4.3",
    description:
      "Learn about designing for safe construction, safe maintenance, safe cleaning, and eventual demolition under CDM 2015 — considering the whole lifecycle of the structure from build through to end of life.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
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
            <Wrench className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-blue-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Buildability &amp; Maintainability
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Designing for safe construction, safe maintenance, safe cleaning,
            and eventual demolition &mdash; considering the whole lifecycle of
            the structure from build through to end of life
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="font-semibold text-blue-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Buildability:</strong>{" "}
                  design for HOW it will be built, not just what it looks
                  like when finished
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Whole-life approach:</strong>{" "}
                  CDM 2015 requires designers to consider construction,
                  maintenance, cleaning, refurbishment, and demolition
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Eliminate first:</strong>{" "}
                  design out hazardous work before relying on protective
                  measures or PPE
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">H&amp;S File:</strong>{" "}
                  all buildability and maintainability information must be
                  recorded for future users
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="font-semibold text-blue-400/90 mb-2">Key Facts</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">CDM 2015 Reg 9:</strong>{" "}
                  designers must eliminate, reduce, and inform &mdash; in that
                  order
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">BS 8213-1:</strong>{" "}
                  guidance on designing windows for safe cleaning
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">BS 6187:</strong>{" "}
                  code of practice for demolition &mdash; designers must
                  consider end-of-life
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">CIRIA (1983):</strong>{" "}
                  first formal definition of buildability in the UK
                  construction industry
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
              "Define buildability and explain its origins in CIRIA's 1983 definition and its legal basis under CDM 2015 Regulation 9",
              "Describe the whole-life approach and explain why designers must consider every phase from construction through to demolition",
              "Identify practical techniques for designing for safe construction, including pre-fabrication, standardisation, and reducing work at height",
              "Explain how to design for safe maintenance with permanent access, fall protection, and accessible services",
              "Describe the requirements for designing for safe cleaning under BS 8213-1 and CDM 2015",
              "Explain why designers must consider demolition at the design stage and the role of BS 6187",
              "Describe the purpose, content, and management of the Health and Safety File under Regulation 12",
              "Apply buildability and maintainability principles to real-world case studies and design scenarios",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Quick-Check Questions (rendered as a group heading) */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Quick-Check Questions
          </h2>
          <p className="text-white/60 text-sm mb-4">
            These quick checks appear throughout the section to test your
            understanding as you read. You can attempt them now or return to
            them after studying the content.
          </p>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 01: What Is Buildability?                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">01</span>
              What Is Buildability?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Buildability</strong> is the
                extent to which the design of a building facilitates safe and
                efficient construction. The concept was first formally defined
                by the{" "}
                <strong className="text-white">
                  Construction Industry Research and Information Association
                  (CIRIA)
                </strong>{" "}
                in 1983 as{" "}
                <em>
                  &ldquo;the extent to which the design of a building
                  facilitates ease of construction, subject to the overall
                  requirements for the completed building.&rdquo;
                </em>{" "}
                This definition recognised that a design must be evaluated not
                only on its aesthetic and functional merit, but on how
                practically and safely it can be constructed.
              </p>

              <p>
                Under{" "}
                <strong className="text-white">CDM 2015 Regulation 9</strong>,
                buildability is not a discretionary design aspiration &mdash; it
                is a legal obligation. Designers must take into account the{" "}
                <strong className="text-white">
                  general principles of prevention
                </strong>{" "}
                (set out in Schedule 1 of CDM 2015) when preparing or modifying
                a design. They must eliminate foreseeable risks to the health and
                safety of any person carrying out or affected by construction
                work so far as is reasonably practicable, and where risks cannot
                be eliminated, reduce them and provide information about the
                remaining risks.
              </p>

              <p>
                In practice, this means every design decision must be evaluated
                for its impact on the safety of the people who will build the
                structure. A design that requires extensive work at height,
                complex temporary works in confined spaces, or the lifting of
                heavy precast elements where there is no crane access has poor
                buildability. These are not merely practical inconveniences
                &mdash; they are foreseeable hazards that the designer has a
                legal duty to address.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Common Buildability Failures
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Heavy precast elements with no crane access:
                      </strong>{" "}
                      specifying large precast concrete panels for a site
                      surrounded by existing buildings with no room for a
                      mobile crane to operate safely
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Deep excavations adjacent to highways:
                      </strong>{" "}
                      designing foundations that require deep excavations
                      immediately next to a busy road without considering the
                      temporary works needed to protect both workers and the
                      public
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Confined spaces with no safe access:
                      </strong>{" "}
                      designing plant rooms, risers, or ductwork spaces that
                      are too small for workers to enter safely or that lack
                      adequate ventilation, lighting, and emergency egress
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Complex in-situ connections at height:
                      </strong>{" "}
                      designing structural connections that require extensive
                      welding, bolting, or formwork at high level when the
                      same structural performance could be achieved with
                      simpler, ground-level assembly
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">
                    <strong className="text-blue-400">Key Principle:</strong>{" "}
                    Buildability is about designing for the{" "}
                    <strong className="text-white">process</strong> of
                    construction, not just the{" "}
                    <strong className="text-white">product</strong>. The most
                    impressive building in the world is a failure if people are
                    killed or seriously injured building it because the designer
                    did not consider how it would be constructed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: The Whole-Life Approach                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">02</span>
              The Whole-Life Approach
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                CDM 2015 fundamentally changed the way designers must think
                about their work by requiring a{" "}
                <strong className="text-white">whole-life approach</strong> to
                design. Before CDM, many designers focused exclusively on the
                finished building &mdash; how it would look, how it would
                perform, and how much it would cost. The construction process
                was considered the contractor&rsquo;s problem, and maintenance,
                cleaning, and demolition were rarely given any thought at the
                design stage.
              </p>

              <p>
                Under{" "}
                <strong className="text-white">
                  CDM 2015 Regulation 9(3)(a)
                </strong>
                , designers must take account of the general principles of
                prevention when preparing or modifying a design. These
                principles, set out in Schedule 1, include{" "}
                <em>&ldquo;adapting the work to the individual&rdquo;</em>,{" "}
                <em>&ldquo;adapting to technical progress&rdquo;</em>, and{" "}
                <em>
                  &ldquo;giving collective protective measures priority over
                  individual protective measures&rdquo;
                </em>
                . The whole-life concept means considering every person who will
                interact with the structure from groundbreaking to demolition:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Who Must the Designer Consider?
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Construction workers:
                      </strong>{" "}
                      all trades involved in building the structure &mdash;
                      groundworkers, steelworkers, bricklayers, electricians,
                      plumbers, roofers, glaziers, decorators
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Maintenance personnel:
                      </strong>{" "}
                      building services engineers, electricians, plumbers,
                      HVAC technicians, lift engineers, fire alarm
                      technicians, BMS specialists
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Cleaning staff:</strong>{" "}
                      window cleaners, facade cleaning operatives, internal
                      cleaning teams, specialist cleaning contractors for
                      atriums and high-level glazing
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Refurbishment workers:
                      </strong>{" "}
                      future tradespeople who will alter, extend, or
                      refurbish the building, potentially decades after it
                      was originally constructed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Demolition workers:
                      </strong>{" "}
                      those who will eventually dismantle or demolish the
                      structure at the end of its useful life &mdash;
                      potentially 50&ndash;100 years in the future
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The whole-life approach is not an abstract concept &mdash; it
                has direct, practical implications for every design decision. A
                designer who specifies a complex curtain wall facade must
                consider not only how it will be installed during construction,
                but how it will be cleaned every few months for the next 60
                years, how individual panels will be replaced when they fail,
                and how the entire facade system will be removed during eventual
                demolition. Each of these activities involves people whose
                safety depends on the decisions the designer makes today.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  The Regulation 9 Hierarchy
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  For each phase of the lifecycle, designers must apply the
                  same hierarchy of risk control:
                </p>
                <ol className="text-white/70 space-y-2 text-sm list-decimal list-inside">
                  <li>
                    <strong className="text-white">Eliminate</strong> &mdash;
                    design out the hazard entirely (the preferred option)
                  </li>
                  <li>
                    <strong className="text-white">Reduce</strong> &mdash;
                    where elimination is not reasonably practicable, reduce
                    the risk through design measures
                  </li>
                  <li>
                    <strong className="text-white">Inform</strong> &mdash;
                    provide information about remaining (residual) risks to
                    those who need it
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 2 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Designing for Safe Construction                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">03</span>
              Designing for Safe Construction
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Designing for safe construction means making deliberate design
                choices that eliminate or reduce the hazards workers will face
                during the construction process. The most effective
                intervention is at the top of the hierarchy:{" "}
                <strong className="text-white">
                  eliminate the need for hazardous work through design
                </strong>
                . If a hazard cannot be eliminated, the design should reduce
                it so far as is reasonably practicable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Pre-fabrication &amp; Offsite Manufacture
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  One of the most powerful buildability strategies is to move
                  work away from the hazardous construction site environment
                  into a controlled factory setting. Pre-fabrication and offsite
                  manufacture offer significant safety benefits:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Factory conditions provide controlled lighting,
                      ventilation, temperature, and noise levels &mdash;
                      unlike a live construction site exposed to weather
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Work is carried out at bench height or on fixed
                      platforms, eliminating work at height and reducing
                      manual handling strain
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Fewer workers spend less time on site, reducing overall
                      risk exposure and congestion from multiple trades
                      working in close proximity
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Quality control is improved, reducing the risk of
                      defects that could create future safety issues
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Standardised Components
                </h3>
                <p className="text-white/70 text-sm">
                  Using consistent, repeatable details and dimensions
                  throughout a design improves safety because workers can
                  develop familiar, safe routines. A consistent floor-to-floor
                  height means formwork and scaffolding can be reused in a
                  standard configuration on every level. Repeating structural
                  connection details means steelworkers perform the same safe
                  operation at each joint rather than adapting to unique
                  details that increase the risk of error. Standardised M&amp;E
                  containment brackets and fixings mean electricians use the
                  same tools and techniques throughout the building.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Reducing Work at Height Through Design
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Falls from height remain the single largest cause of fatal
                  injuries in the UK construction industry. Designers can
                  significantly reduce this risk through design choices:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Specify ground-level pre-assembly of components that
                      would otherwise require installation at height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Design connections that can be made from below rather
                      than requiring access to the top of beams or columns
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Include permanent edge protection in the structural
                      design (e.g. upstand beams at floor edges that act as
                      both structure and fall prevention during construction)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      Consider the construction sequence and ensure that each
                      stage provides a safe working platform for the next
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                Temporary works must also be considered at the design stage.
                The designer&rsquo;s choices directly influence the type and
                extent of temporary works required &mdash; formwork, propping,
                shoring, scaffolding, and temporary bracing. A design that
                requires minimal temporary works is inherently safer because it
                reduces the number of activities that must be planned, erected,
                monitored, and removed before the permanent structure is
                complete.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Designing for Safe Maintenance                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Designing for Safe Maintenance
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A building&rsquo;s construction phase typically lasts one to
                three years. Its operational life &mdash; during which it must
                be maintained, repaired, and serviced &mdash; lasts 50 to 60
                years or more. This means that maintenance activities will be
                carried out{" "}
                <strong className="text-white">
                  hundreds or thousands of times
                </strong>{" "}
                over the building&rsquo;s life, often by workers who had no
                involvement in the original design or construction. The
                designer&rsquo;s decisions about access, layout, and
                specification directly determine whether these activities can
                be carried out safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Permanent Safe Access
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Designers must provide permanent, designed-in safe access to
                  all areas that will require regular maintenance:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Plant rooms:</strong>{" "}
                      adequate floor space for equipment removal and
                      replacement, minimum door widths for the largest
                      component, adequate lighting, ventilation, and
                      emergency egress
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Roof areas:</strong>{" "}
                      internal staircase access (not ladders) to roof level,
                      guardrailed walkways between the access point and
                      rooftop plant, non-fragile roof coverings on
                      maintenance routes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Facades:</strong>{" "}
                      designed-in access for inspection, repair, and
                      replacement of cladding panels, sealant joints, and
                      fixings &mdash; especially where these are at height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Building services:
                      </strong>{" "}
                      accessible isolation points, adequate space around
                      switchgear (as required by BS 7671 and the Electricity
                      at Work Regulations 1989), removable ceiling panels for
                      access to above-ceiling services
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Fall Protection in Design
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Designers should incorporate fall protection as a permanent
                  feature of the building fabric, not rely on temporary
                  measures brought in by maintenance contractors:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Anchor points:</strong>{" "}
                      designed and certified anchor points for fall arrest
                      harnesses, cast into parapets or fixed to structural
                      steelwork, with test certification documented in the
                      Health and Safety File
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Guardrail fixings:
                      </strong>{" "}
                      sockets or base plates cast into parapets and roof
                      edges to accept temporary or permanent guardrail
                      systems without the need for drilling or clamping
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Permanent guardrails:
                      </strong>{" "}
                      where maintenance access is frequent (e.g. rooftop
                      plant accessed quarterly), permanent guardrail systems
                      compliant with BS EN 13374 should be specified as part
                      of the building design
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                <strong className="text-white">
                  Window cleaning considerations
                </strong>{" "}
                are addressed by{" "}
                <strong className="text-white">BS 8213-1</strong> (Windows,
                doors and rooflights &mdash; Design for safety in use and
                during cleaning of windows). This standard requires designers
                to consider how every window in the building will be cleaned
                throughout its operational life. Reversible windows, tilt-and-
                turn mechanisms, and accessible openable casements allow
                external glass surfaces to be cleaned safely from inside the
                building, eliminating the need for external access at height.
              </p>

              <p>
                <strong className="text-white">
                  Maintenance manuals and the Health and Safety File
                </strong>{" "}
                are the means by which the designer communicates safe
                maintenance information to future building owners and
                maintenance teams. The Health and Safety File must include
                details of all designed-in safe access provisions, the
                maintenance requirements for each building element, the safe
                systems of work that should be followed, and the location and
                type of any fall protection systems.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 4 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Designing for Safe Cleaning                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Designing for Safe Cleaning
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Cleaning &mdash; particularly glazing at height &mdash; is one
                of the most hazardous routine maintenance activities. Every
                building with external glazing will require regular window
                cleaning throughout its operational life, and the frequency of
                this cleaning depends on the building&rsquo;s location,
                use, and appearance standards. A commercial office building in
                a city centre may require external glazing to be cleaned
                monthly; a school or hospital typically every three to six
                months. Over a 60-year building life, this represents hundreds
                of cleaning cycles, each of which exposes workers to the risk
                of falls from height if the design does not provide safe
                access.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  BS 8213-1: Designing Windows for Safe Cleaning
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  <strong className="text-white">BS 8213-1</strong> provides
                  comprehensive guidance on designing windows, doors, and
                  rooflights for safety during use and cleaning. Key
                  provisions include:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Reversible windows:
                      </strong>{" "}
                      window designs that allow the external face to be
                      rotated or reversed so that it can be cleaned safely
                      from inside the building, eliminating the need for
                      external access at height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Tilt-and-turn mechanisms:
                      </strong>{" "}
                      windows that tilt inwards at the top for ventilation
                      and turn fully inwards for cleaning, allowing both
                      glass surfaces to be reached from inside
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Maximum reach considerations:
                      </strong>{" "}
                      the standard specifies maximum distances from the
                      cleaning position to the furthest point of glass that
                      must be reached, ensuring that cleaners do not need to
                      lean out dangerously
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Permanently Installed Cleaning Systems
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  For buildings where window cleaning from inside is not
                  practicable &mdash; typically high-rise buildings with
                  curtain wall facades &mdash; the designer should specify
                  permanently installed cleaning systems:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Building maintenance units (BMUs):
                      </strong>{" "}
                      permanently installed cradle systems, typically mounted
                      on the roof, that allow cleaning operatives to access
                      the full height and width of the facade safely
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Davit systems:</strong>{" "}
                      permanently fixed davit arms at roof level that support
                      suspended cradles or bosun&rsquo;s chairs for facade
                      access
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Monorail systems:
                      </strong>{" "}
                      permanent tracks installed at roof level to which
                      cradles or other access equipment can be attached and
                      traversed along the building perimeter
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Self-cleaning coatings:
                      </strong>{" "}
                      specialist glass coatings (hydrophilic or
                      photocatalytic) that use sunlight and rainwater to
                      break down organic dirt, reducing the frequency of
                      manual cleaning and thus reducing risk exposure
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The designer must consider both{" "}
                <strong className="text-white">
                  internal and external cleaning access
                </strong>
                . High-level internal glazing &mdash; such as atrium walls,
                clerestory windows, and internal balustrade glazing &mdash;
                also requires safe cleaning access. Purpose-built gantries,
                access hatches, and anchor points for internal cleaning should
                be designed into the building from the outset, not left for
                the facilities management team to improvise.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Designing for Demolition                        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">06</span>
              Designing for Demolition
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                It may seem counterintuitive to think about demolishing a
                building before it has even been built, but CDM 2015 requires
                exactly this. Regulation 9 requires designers to consider the
                health and safety of all persons affected by the design
                throughout the{" "}
                <strong className="text-white">entire lifecycle</strong> of the
                structure &mdash; and that lifecycle includes eventual
                demolition or decommissioning, which may occur 50 to 100 years
                in the future.
              </p>

              <p>
                Design decisions made today can have profound health and safety
                implications for demolition workers decades from now. The
                structural system, the materials used, the connections between
                elements, and the presence of hazardous substances all
                influence the methods available for safe demolition.{" "}
                <strong className="text-white">BS 6187</strong> (Code of
                practice for full and partial demolition) provides
                comprehensive guidance on demolition planning and execution,
                and emphasises the critical importance of having accurate
                information about the building&rsquo;s structure, materials,
                and construction methods.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Key Demolition Considerations for Designers
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Asbestos and hazardous materials:
                      </strong>{" "}
                      designers who specify materials that may become
                      hazardous waste (or that contain hazardous components)
                      must record this information in the Health and Safety
                      File. This includes asbestos-containing products, lead
                      paint, certain insulation materials, PCB-containing
                      electrical equipment, and structural adhesives
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Structural stability during demolition:
                      </strong>{" "}
                      the designer must record sufficient information about
                      the structural system &mdash; load paths, connection
                      types, pre-stressed or post-tensioned elements &mdash;
                      so that future demolition engineers can plan a safe
                      demolition sequence that maintains stability throughout
                      the process
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Design for disassembly:
                      </strong>{" "}
                      where reasonably practicable, designers should use
                      mechanical fixings (bolts, screws, clips) rather than
                      permanent adhesives or welds, allowing controlled
                      disassembly rather than destructive demolition
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Pre-stressed and post-tensioned elements:
                      </strong>{" "}
                      these elements store enormous amounts of energy and
                      require specialist demolition techniques. The designer
                      must record full details of tendon locations,
                      stressing forces, and anchorage positions in the Health
                      and Safety File
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Recording information:
                      </strong>{" "}
                      BS 6187 emphasises that the most dangerous demolition
                      situations arise when information about the
                      building&rsquo;s structure is lost or incomplete. The
                      Health and Safety File is the primary mechanism for
                      preserving this information for future demolition teams
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">
                    <strong className="text-blue-400">
                      Critical Point:
                    </strong>{" "}
                    Pre-stressed concrete elements contain high-tension steel
                    tendons that can release catastrophic energy if cut
                    without proper precautions. Several fatal incidents in the
                    UK have occurred during the demolition of pre-stressed
                    structures where the demolition team did not have
                    accurate information about the tendon layout. Designers
                    must ensure this information is recorded in the Health and
                    Safety File.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 6 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: The Health and Safety File                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">07</span>
              The Health and Safety File
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The{" "}
                <strong className="text-white">Health and Safety File</strong>{" "}
                is the mechanism by which buildability and maintainability
                information is preserved and communicated to future building
                owners, occupiers, and maintenance teams. Required by{" "}
                <strong className="text-white">
                  CDM 2015 Regulation 12
                </strong>
                , the file contains information likely to be needed to ensure
                the health and safety of any person carrying out subsequent
                construction work on the structure &mdash; including
                maintenance, repair, cleaning, refurbishment, alteration, and
                demolition.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  What Must the Health and Safety File Include?
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        As-built drawings:
                      </strong>{" "}
                      accurate drawings showing the actual construction,
                      which may differ from the original design due to site
                      variations, value engineering, or construction-phase
                      changes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Material information:
                      </strong>{" "}
                      details of all materials used, with particular
                      attention to hazardous materials such as
                      asbestos-containing products, lead-based paints,
                      resin-based adhesives, and any materials that may
                      produce hazardous dust or fumes when cut, drilled, or
                      demolished
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Structural systems:
                      </strong>{" "}
                      details of the structural system including load paths,
                      connection types, pre-stressed or post-tensioned
                      elements, composite construction details, and any
                      structural interdependencies
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Services routing:
                      </strong>{" "}
                      the location, routing, and specification of all
                      building services &mdash; electrical distribution,
                      mechanical services, plumbing, drainage, fire
                      protection, communications &mdash; including isolation
                      points, valve locations, and emergency shut-off
                      positions
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Safe access provisions:
                      </strong>{" "}
                      details of all designed-in safe access features
                      &mdash; roof anchor points, cradle tracks, maintenance
                      walkways, access hatches, guardrail fixing sockets,
                      and any permanent fall protection systems
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Residual hazard information:
                      </strong>{" "}
                      details of any hazards that could not be eliminated
                      through design, the risk reduction measures
                      incorporated, and any specific safe working procedures
                      that should be followed
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The{" "}
                <strong className="text-white">principal designer</strong> has
                the duty to prepare, review, and update the Health and Safety
                File during the project, and to hand it to the client at the
                end of the construction phase. The client must then keep the
                file available for inspection by anyone who needs to carry out
                future work on the structure. If the building is sold, the file
                must transfer to the new owner. If the building is leased, the
                file must be made available to the leaseholder&rsquo;s
                maintenance team.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  A Living Document
                </h3>
                <p className="text-white/80 text-sm">
                  The Health and Safety File is not a static document that is
                  produced at handover and then forgotten. It must be{" "}
                  <strong className="text-white">
                    updated whenever significant alterations
                  </strong>{" "}
                  are made to the building. If a new roof-mounted plant
                  installation is added, the file must be updated with the new
                  access arrangements, structural loading information, and
                  maintenance requirements. If asbestos is discovered and
                  removed during refurbishment, the file must be updated to
                  reflect the current status. The file&rsquo;s value depends
                  entirely on its accuracy and completeness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Case Studies and Practical Application          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              Case Studies &amp; Practical Application
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The following case studies illustrate how buildability and
                maintainability principles apply in real-world design
                situations. Each case demonstrates both good and poor practice,
                and the lessons that designers should take from them.
              </p>

              {/* Case Study 1 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-blue-400">
                    Case Study 1: School Roof Access Design
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  A new secondary school was designed with rooftop air
                  handling units (AHUs), solar PV panels, and a green roof
                  area. The original design provided roof access via an
                  external vertical ladder fixed to the building&rsquo;s rear
                  elevation &mdash; a common but dangerous arrangement that
                  would require maintenance personnel to climb an exposed
                  ladder at height every time they serviced the AHUs
                  (quarterly), inspected the PV panels (annually), or
                  maintained the green roof (seasonally).
                </p>
                <p className="text-sm text-white/70 mb-2">
                  <strong>The CDM Intervention:</strong>
                </p>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The principal designer raised a CDM design risk issue:
                      the vertical ladder provided no fall protection and
                      would require repeated climbing by multiple maintenance
                      trades throughout the school&rsquo;s 60-year design
                      life
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The design was revised to include an internal staircase
                      rising from the top floor to a penthouse access lobby
                      at roof level, with a secure door opening onto a
                      guardrailed maintenance walkway
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      Guardrailed walkways were routed between the access
                      point and all rooftop plant, with non-slip surfaces and
                      anchor points at plant locations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The additional construction cost was approximately
                      &pound;18,000 &mdash; a fraction of the 60-year
                      scaffolding or cherry-picker hire cost that the
                      original design would have required
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-3">
                  <strong>Lesson:</strong> Permanent safe access is almost
                  always more cost-effective than temporary access over the
                  building&rsquo;s life. The designer&rsquo;s CDM duty is to
                  eliminate the hazard (climbing an exposed ladder) through
                  design, not to transfer the risk to maintenance
                  contractors.
                </p>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-blue-400">
                    Case Study 2: Office Building Facade Cleaning System
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  A 12-storey office building was designed with a fully glazed
                  curtain wall facade. The original specification included no
                  provision for facade cleaning access &mdash; the assumption
                  was that the facilities management company would arrange
                  rope access (industrial abseiling) for window cleaning. This
                  would have meant trained rope access technicians descending
                  the full height of the building every two to four weeks for
                  the building&rsquo;s entire operational life.
                </p>
                <p className="text-sm text-white/70 mb-2">
                  <strong>The CDM Intervention:</strong>
                </p>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The CDM adviser identified that relying on rope access
                      as the primary cleaning method was contrary to the
                      hierarchy of risk control &mdash; rope access is a
                      high-risk activity that should only be used where no
                      other method is reasonably practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      A building maintenance unit (BMU) was specified instead
                      &mdash; a permanent roof-mounted cradle system that
                      could traverse the full perimeter of the building,
                      providing safe, enclosed access for cleaning operatives
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      Self-cleaning glass coatings were specified for the
                      upper floors (above the 8th floor) to reduce the
                      frequency of manual cleaning at the highest levels
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-3">
                  <strong>Lesson:</strong> The design stage is the only
                  practical opportunity to incorporate permanently installed
                  facade access systems. Retrofitting a BMU to an existing
                  building requires structural modifications to support the
                  cradle&rsquo;s weight and dynamic loads, which is
                  significantly more expensive and disruptive than designing
                  it in from the outset.
                </p>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-blue-400">
                    Case Study 3: Industrial Unit with Confined Plant Room
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  A new industrial warehouse included a plant room measuring
                  just 3.5m &times; 2.5m, housing a gas-fired boiler, an air
                  handling unit, the main LV switchboard (1.6m wide), a water
                  treatment plant, and a BMS controller. The architect had
                  allocated the minimum space to maximise the lettable
                  warehouse floor area. The electrical designer raised a CDM
                  concern because the proposed layout left{" "}
                  <strong>only 0.9m clear depth</strong> in front of the
                  switchboard &mdash; barely enough for one person to stand,
                  and completely inadequate for safe operation, testing, and
                  maintenance of the electrical installation.
                </p>
                <p className="text-sm text-white/70 mb-2">
                  <strong>Resolution:</strong>
                </p>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The plant room was enlarged to 5.0m &times; 4.0m,
                      providing adequate working space in front of the
                      switchboard (1.2m clear depth), circulation space for
                      two persons, and room for equipment removal and
                      replacement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      Mechanical ventilation was upgraded to handle the
                      combined heat output of all equipment, and emergency
                      lighting on a separate circuit was added
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      The access door was widened to 1.2m and re-hung to open
                      outwards, allowing emergency egress and equipment
                      replacement access
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>
                      A clear maintenance access zone was marked on the
                      floor plan and recorded in the Health and Safety File,
                      with a note that the zone must not be used for storage
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-3">
                  <strong>Lesson:</strong> Electrical designers must advocate
                  for adequate plant room space at the design stage. The BS
                  7671 and Electricity at Work Regulations requirements for
                  adequate working space are not suggestions &mdash; they are
                  legal requirements that protect electricians throughout the
                  building&rsquo;s operational life. Once a building is
                  constructed, enlarging a plant room is extremely difficult
                  and costly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  DIAGRAM: Whole-Life Design Consideration                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 text-center">
            Whole-Life Design Consideration
          </h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Designers must consider every phase of the structure&rsquo;s
            lifecycle. Each stage presents unique hazards that must be
            addressed through design.
          </p>

          {/* Horizontal timeline/lifecycle flow */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-0 min-w-[900px] mx-auto max-w-5xl">
              {[
                {
                  stage: "Design",
                  note: "Identify hazards, apply the elimination hierarchy, consider all future phases, record decisions in the risk register",
                },
                {
                  stage: "Construction",
                  note: "Pre-fabrication, standardisation, safe sequences, reduce work at height, minimise temporary works, safe access for plant",
                },
                {
                  stage: "Maintenance",
                  note: "Permanent safe access to plant, roofs, facades, services. Fall protection designed in. Adequate switchroom space per BS 7671",
                },
                {
                  stage: "Cleaning",
                  note: "BS 8213-1 compliant windows, BMUs/davits/monorails for high-rise, self-cleaning coatings, safe internal cleaning access",
                },
                {
                  stage: "Refurbishment",
                  note: "Accessible services for modification, clear structural information, adequate space for future upgrades, asbestos records",
                },
                {
                  stage: "Demolition",
                  note: "Design for disassembly, record structural systems in H&S File, avoid hazardous materials where possible, BS 6187 compliance",
                },
              ].map((item, index) => (
                <div key={item.stage} className="flex items-stretch flex-1 min-w-0">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    {/* Stage circle */}
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/60 flex items-center justify-center mb-2 flex-shrink-0">
                      <span className="text-blue-400 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    {/* Stage name */}
                    <p className="text-blue-400 text-xs font-bold mb-2 text-center">
                      {item.stage}
                    </p>
                    {/* Stage card */}
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 flex-1">
                      <p className="text-white/70 text-xs leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </div>
                  {/* Arrow connector */}
                  {index < 5 && (
                    <div className="flex items-center px-1 flex-shrink-0 self-start mt-4">
                      <div className="w-4 h-0.5 bg-blue-500/40"></div>
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-blue-500/40"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-white/60 text-xs text-center">
              The{" "}
              <strong className="text-white">whole-life approach</strong>{" "}
              requires designers to apply the CDM hierarchy (eliminate &rarr;
              reduce &rarr; inform) at{" "}
              <strong className="text-white">every phase</strong> of the
              structure&rsquo;s lifecycle. Information from the design phase
              flows through to the Health and Safety File, which serves every
              subsequent phase.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQs                                                        */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  Quiz                                                        */}
        {/* ============================================================ */}
        <div className="mt-12">
          <Quiz
            title="Section 3 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* ============================================================ */}
        {/*  Bottom Navigation                                           */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4-section-4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
