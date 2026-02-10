import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "scaffolding-awareness-bs12811-scope",
    question:
      "What does BS EN 12811-1 primarily cover in relation to scaffolding?",
    options: [
      "Performance requirements and general design for access and working scaffolds",
      "The colour coding of scaffold tubes and fittings",
      "Training requirements for scaffold erectors",
      "Insurance obligations for scaffolding contractors",
    ],
    correctIndex: 0,
    explanation:
      "BS EN 12811-1 sets out the performance requirements and general design criteria for access and working scaffolds. It covers structural adequacy, loading, dimensions, and safety provisions that all scaffold designs must satisfy. It does not deal with training, insurance, or colour coding.",
  },
  {
    id: "scaffolding-awareness-load-class-3",
    question:
      "What is the uniformly distributed service load for a Load Class 3 scaffold platform?",
    options: [
      "0.75 kN/m\u00B2",
      "1.50 kN/m\u00B2",
      "2.00 kN/m\u00B2",
      "3.00 kN/m\u00B2",
    ],
    correctIndex: 2,
    explanation:
      "Load Class 3 carries a uniformly distributed service load of 2.00 kN/m\u00B2. This class is commonly used for general construction work where materials are stored on the platform. Load Class 1 is 0.75 kN/m\u00B2 (inspection only), Load Class 2 is 1.50 kN/m\u00B2 (light duty), and Load Class 4 is 3.00 kN/m\u00B2 (heavy duty).",
  },
  {
    id: "scaffolding-awareness-en39-tube-spec",
    question:
      "What is the standard outside diameter of a scaffold tube manufactured to BS EN 39?",
    options: ["42.4 mm", "48.3 mm", "50.0 mm", "60.3 mm"],
    correctIndex: 1,
    explanation:
      "BS EN 39 specifies steel tubes with an outside diameter of 48.3 mm and a wall thickness of either 3.2 mm (Type 3) or 4.0 mm (Type 4). The 48.3 mm diameter is fundamental to the entire scaffolding system because all couplers, fittings, and design calculations are based on this dimension.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between BS EN 12811 and BS EN 12810?",
    answer:
      "BS EN 12811 covers general access and working scaffolds and sets out performance requirements, design calculations, and structural rules that apply to all scaffold types. BS EN 12810 is specifically about prefabricated facade scaffold systems \u2014 the manufactured, system-type scaffolds with pre-engineered frames and modular components. In practice, BS EN 12811 provides the overarching performance framework, whilst BS EN 12810 adds product-specific requirements for facade systems. A facade scaffold must satisfy both BS EN 12810 and the relevant parts of BS EN 12811.",
  },
  {
    question:
      "How do load classes relate to the type of work being carried out?",
    answer:
      "Load classes define the maximum uniformly distributed service load that a scaffold platform must be designed to carry. The class selected depends on the nature of the work and the materials that will be stored on the platform. Load Class 1 (0.75 kN/m\u00B2) is for inspection and very light work only. Load Class 2 (1.50 kN/m\u00B2) suits light-duty work such as painting, plastering, or pointing. Load Class 3 (2.00 kN/m\u00B2) covers general construction work with some material storage. Load Classes 4, 5, and 6 (3.00, 4.50, and 6.00 kN/m\u00B2 respectively) are for heavy-duty work involving significant material storage, masonry, or heavy cladding. Getting the load class wrong can result in an under-designed scaffold that is unsafe for the intended use.",
  },
  {
    question:
      "Do British Standards replace NASC TG20 guidance, or do they work alongside it?",
    answer:
      "They work alongside each other. British and European Standards (such as BS EN 12811 and BS EN 12810) set out the fundamental performance requirements and design principles that scaffolds must meet. NASC TG20 is a compliance guide that provides practical, pre-calculated solutions for common tube-and-fitting scaffold configurations that satisfy these standards. TG20 is a tool for demonstrating compliance with the standards \u2014 it does not replace them. For non-standard or complex scaffolds that fall outside TG20 configurations, a bespoke design calculation by a competent engineer is required, and that calculation must demonstrate compliance with the relevant standards.",
  },
  {
    question:
      "What does BS EN 74 cover, and why does it matter on site?",
    answer:
      "BS EN 74 covers couplers, spigot pins, and base plates used with steel scaffold tubes. It specifies the design, testing, and performance requirements for these critical connection components. On site, this matters because every joint in a tube-and-fitting scaffold relies on couplers to transfer loads between members. A coupler that does not meet BS EN 74 requirements may have insufficient strength, poor slip resistance, or inadequate clamping force, any of which could lead to a scaffold failure. Site workers should check that couplers are marked with the manufacturer\u2019s identification and are in good condition \u2014 distorted, cracked, or worn couplers must be discarded.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "BS EN 12811 is divided into three parts. What does Part 1 cover?",
    options: [
      "Information on materials used in scaffold construction",
      "Performance requirements and general design for scaffolds",
      "Load testing procedures for completed scaffolds",
      "Inspection frequencies and record-keeping requirements",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 12811-1 covers performance requirements and general design. It establishes the structural and safety criteria that all access and working scaffolds must satisfy, including loading, dimensions, platform requirements, and access provisions. Part 2 deals with information on materials, and Part 3 covers load testing.",
  },
  {
    id: 2,
    question:
      "Which load class would be most appropriate for a scaffold platform used solely for inspection and access, with no material storage?",
    options: [
      "Load Class 1 \u2014 0.75 kN/m\u00B2",
      "Load Class 2 \u2014 1.50 kN/m\u00B2",
      "Load Class 3 \u2014 2.00 kN/m\u00B2",
      "Load Class 4 \u2014 3.00 kN/m\u00B2",
    ],
    correctAnswer: 0,
    explanation:
      "Load Class 1 (0.75 kN/m\u00B2) is designed for inspection and very light access work where no materials are stored on the platform. It provides the minimum loading capacity and is only appropriate when the platform is used for foot traffic and hand tools. Any material storage requires a higher load class.",
  },
  {
    id: 3,
    question:
      "What does the width category designation W09 indicate about a scaffold platform?",
    options: [
      "The platform is 0.9 metres wide",
      "The platform is 9 metres long",
      "The scaffold has 9 bays",
      "The platform supports 9 kN per bay",
    ],
    correctAnswer: 0,
    explanation:
      "Width categories use a W prefix followed by two digits representing the minimum clear width in decimetres. W09 means 0.9 metres minimum clear width. Similarly, W06 is 0.6 m, W12 is 1.2 m, and W24 is 2.4 m. The width category is critical because it determines how workers and materials can be accommodated on the platform.",
  },
  {
    id: 4,
    question:
      "Which standard specifically covers prefabricated facade scaffold systems?",
    options: [
      "BS EN 12811-1",
      "BS EN 12810",
      "BS EN 12812",
      "BS EN 74",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 12810 is the standard for prefabricated facade scaffold systems. These are manufactured, modular scaffold systems with pre-engineered frames and components, as opposed to traditional tube-and-fitting scaffolds. Facade scaffolds must comply with both BS EN 12810 and the relevant performance requirements of BS EN 12811.",
  },
  {
    id: 5,
    question:
      "What is the standard wall thickness of a Type 4 scaffold tube to BS EN 39?",
    options: ["2.6 mm", "3.2 mm", "4.0 mm", "4.8 mm"],
    correctAnswer: 2,
    explanation:
      "BS EN 39 specifies two tube types: Type 3 with a 3.2 mm wall thickness and Type 4 with a 4.0 mm wall thickness. Both have an outside diameter of 48.3 mm. Type 4 tubes are heavier but have greater load-carrying capacity and are specified in many scaffold designs, particularly for heavily loaded standards and ledgers.",
  },
  {
    id: 6,
    question: "What does BS EN 12812 cover?",
    options: [
      "Couplers, spigot pins, and base plates for scaffolding",
      "Temporary structures used to support permanent works during construction (falsework)",
      "Safety nets and edge protection for scaffolding",
      "Scaffold board timber grading and testing requirements",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 12812 covers falsework \u2014 temporary structures used to support permanent structures such as concrete slabs, beams, and bridges during construction until the permanent structure is strong enough to support itself. Although related to scaffolding, falsework serves a fundamentally different purpose: it supports the structure being built rather than providing access for workers.",
  },
  {
    id: 7,
    question:
      "A scaffold is specified as Load Class 3, width category W12. What does this mean in practical terms?",
    options: [
      "The platform is 3 metres wide and can support 12 kN per bay",
      "The platform has a minimum clear width of 1.2 m and can support a uniformly distributed service load of 2.00 kN/m\u00B2",
      "The platform has 12 boards and 3 levels of loading",
      "The scaffold has 3 lifts, each 1.2 metres high",
    ],
    correctAnswer: 1,
    explanation:
      "Load Class 3 means the platform is designed for a uniformly distributed service load of 2.00 kN/m\u00B2, suitable for general construction work with some material storage. W12 indicates a minimum clear platform width of 1.2 metres. Together, these designations define the capacity and usable space of the working platform.",
  },
  {
    id: 8,
    question:
      "Why must scaffold boards comply with BS 2482 or an equivalent standard?",
    options: [
      "To ensure they are the correct colour for identification purposes",
      "To ensure they have been tested for strength, stiffness, and durability and are safe to use as working platforms",
      "To ensure they are manufactured from a specific species of timber",
      "To ensure they can be reused an unlimited number of times",
    ],
    correctAnswer: 1,
    explanation:
      "BS 2482 specifies requirements for timber scaffold boards, including strength, stiffness, dimensions, grain direction, and freedom from defects. Boards that comply with this standard have been tested and graded to confirm they can safely support the loads they will carry as scaffold platforms. Using non-compliant boards risks platform failure, which could cause falls from height \u2014 the single largest cause of workplace fatalities in the UK construction industry.",
  },
];

export default function ScaffoldingAwarenessModule2Section3() {
  useSEO({
    title:
      "BS EN 12811 & Other Standards | Scaffolding Awareness Module 2.3",
    description:
      "British and European scaffolding standards including BS EN 12811, BS EN 12810, BS EN 12812, BS EN 74, BS EN 39, load classes, width categories, and the relationship between standards and practice.",
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
            <Link to="../scaffolding-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS EN 12811 &amp; Other Standards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The British and European standards that define how scaffolding must
            be designed, manufactured, and used &mdash; from load classes and
            width categories to tube specifications and coupler performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>What:</strong> A family of European standards governing
                scaffolding design and components
              </li>
              <li>
                <strong>Key standard:</strong> BS EN 12811-1 &mdash; performance
                requirements and general design
              </li>
              <li>
                <strong>6 load classes:</strong> From 0.75 kN/m&sup2; (inspection)
                to 6.00 kN/m&sup2; (masonry/heavy cladding)
              </li>
              <li>
                <strong>Why it matters:</strong> Every scaffold on a UK site must
                comply with these standards
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Load class:</strong> Must match the work being carried
                out on the scaffold
              </li>
              <li>
                <strong>Width category:</strong> Determines usable platform
                width for workers and materials
              </li>
              <li>
                <strong>Tube &amp; couplers:</strong> Must comply with BS EN 39
                and BS EN 74 respectively
              </li>
              <li>
                <strong>Boards:</strong> Must meet BS 2482 for strength and
                stiffness
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
              "Explain the purpose and scope of BS EN 12811-1 and its three parts",
              "Describe the six load classes and select the correct class for a given task",
              "Identify width categories and their practical meaning on site",
              "Explain how BS EN 12810 relates to prefabricated facade scaffolds",
              "Understand the role of BS EN 74 (couplers) and BS EN 39 (tubes) in scaffold safety",
              "Describe how British and European standards interact with NASC guidance and TG20",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Role of Standards in Scaffolding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">01</span>
            The Role of Standards in Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffolding standards exist to ensure that every temporary
                structure erected on a construction site is{" "}
                <strong>safe, structurally adequate, and fit for purpose</strong>.
                Without agreed standards, scaffold design would vary wildly
                between contractors, regions, and projects, with no consistent
                way of verifying whether a scaffold could safely carry the loads
                imposed on it during use.
              </p>

              <p>
                In the UK, scaffolding standards are drawn from the{" "}
                <strong>European Committee for Standardisation (CEN)</strong>,
                which produces harmonised standards adopted across all EU and
                EFTA member states. When the UK adopts a CEN standard, it is
                published as a{" "}
                <strong>British Standard (BS EN)</strong> &mdash; the &ldquo;BS&rdquo;
                prefix denotes British Standard and &ldquo;EN&rdquo; denotes
                European Norm. These standards carry legal weight because the
                Work at Height Regulations 2005 require that scaffolding is
                designed and erected in accordance with{" "}
                <strong>generally recognised standards</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Key Standards at a Glance
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS EN 12811</strong>{" "}
                      &mdash; Temporary works equipment: access and working
                      scaffolds (three parts)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS EN 12810</strong>{" "}
                      &mdash; Facade scaffolds made of prefabricated components
                      (two parts)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS EN 12812</strong>{" "}
                      &mdash; Falsework &mdash; performance requirements and
                      general design
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS EN 74</strong> &mdash;
                      Couplers, spigot pins, and base plates for tubular
                      scaffolding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS EN 39</strong> &mdash;
                      Loose steel tubes for tube-and-fitting scaffolds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS 2482</strong> &mdash;
                      Timber scaffold boards &mdash; specification
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Why This Matters:</strong>{" "}
                  Standards are not optional guidelines. When the Work at Height
                  Regulations require scaffolding to be designed and erected to a
                  recognised standard, failing to comply is a breach of the law.
                  Enforcement officers from the HSE will check compliance with
                  these standards during site inspections, and non-compliance can
                  result in improvement notices, prohibition notices, or
                  prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: BS EN 12811 — The Core Standard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">02</span>
            BS EN 12811 &mdash; The Core Standard
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS EN 12811 is the{" "}
                <strong>
                  primary European standard for access and working scaffolds
                </strong>
                . It applies to all scaffold types &mdash; tube-and-fitting,
                system scaffold, and birdcage scaffolds &mdash; and sets out the
                performance requirements that every scaffold must satisfy
                regardless of its configuration or the materials used to build
                it.
              </p>

              <p>
                The standard is divided into{" "}
                <strong>three parts</strong>, each covering a distinct aspect of
                scaffold design and verification:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  The Three Parts of BS EN 12811
                </p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Part 1: Performance requirements and general design
                      </strong>{" "}
                      &mdash; This is the most important part for everyday
                      practice. It defines the structural requirements for
                      scaffolds, including load classes, width categories,
                      platform specifications, access provisions (ladders and
                      stairways), and guard-rail requirements. It also specifies
                      the actions (loads) that must be considered in the design,
                      including self-weight, service loads, wind loads, and
                      accidental loads.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Part 2: Information on materials
                      </strong>{" "}
                      &mdash; Specifies the material properties and quality
                      requirements for steel, aluminium alloy, and timber
                      components used in scaffold construction. It ensures that
                      the materials used have known and reliable mechanical
                      properties so that design calculations are valid.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Part 3: Load testing
                      </strong>{" "}
                      &mdash; Sets out procedures for load testing scaffold
                      components and assemblies. This part is primarily relevant
                      to manufacturers and testing laboratories who need to
                      verify that their products meet the performance
                      requirements of Part 1.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Part 1 is the section that scaffold designers, erectors, and
                inspectors refer to most frequently. It provides the{" "}
                <strong>benchmark against which every scaffold is judged</strong>
                . When a scaffold inspector checks a structure on site, the
                requirements of BS EN 12811-1 underpin the assessment &mdash;
                whether the inspector is checking platform widths, guard-rail
                heights, toe board provision, or the adequacy of the scaffold to
                carry the intended loads.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Practical Application:
                  </strong>{" "}
                  BS EN 12811-1 requires that scaffold platforms have guard-rails
                  at a minimum height of 1.0 metre above the platform, with an
                  intermediate guard-rail and a toe board of at least 150 mm in
                  height. These are not arbitrary figures &mdash; they are
                  evidence-based dimensions designed to prevent falls from height
                  and protect workers below from falling objects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Load Classes (1–6) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">03</span>
            Load Classes (1&ndash;6)
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most critical concepts in BS EN 12811-1 is the{" "}
                <strong>load class system</strong>. Load classes define the
                maximum uniformly distributed service load that a scaffold
                platform must be designed to carry. The load class must be
                determined{" "}
                <strong>
                  before the scaffold is designed and must match the intended use
                </strong>
                .
              </p>

              <p>
                There are <strong>six load classes</strong>, numbered 1 through
                6, with increasing load capacities. Each class is designed for a
                specific range of activities. Selecting the wrong load class is a
                serious design error that can result in an{" "}
                <strong>
                  under-designed scaffold incapable of safely carrying the loads
                  imposed on it
                </strong>
                .
              </p>

              {/* Load Class Reference Table (Diagram) */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-500/30 to-slate-400/20 border-b border-slate-500/30 px-4 py-3">
                  <p className="text-slate-400 font-semibold text-base">
                    Load Class Reference Table
                  </p>
                  <p className="text-white/60 text-xs">
                    BS EN 12811-1 &mdash; Uniformly distributed service loads
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    {
                      cls: "1",
                      load: "0.75 kN/m\u00B2",
                      use: "Inspection and very light access only",
                      detail:
                        "No material storage. Foot traffic and hand tools only. Suitable for building surveys, visual inspections, and access to services for assessment purposes.",
                    },
                    {
                      cls: "2",
                      load: "1.50 kN/m\u00B2",
                      use: "Light-duty work",
                      detail:
                        "Painting, plastering, pointing, cleaning, and similar tasks where limited materials and tools are present on the platform. No bulk material storage.",
                    },
                    {
                      cls: "3",
                      load: "2.00 kN/m\u00B2",
                      use: "General construction work",
                      detail:
                        "Standard construction activities with some material storage on the platform. The most commonly specified class for general scaffolding on UK construction sites.",
                    },
                    {
                      cls: "4",
                      load: "3.00 kN/m\u00B2",
                      use: "Heavy-duty work",
                      detail:
                        "Brickwork, blockwork, and heavy cladding where significant quantities of materials are stored on the platform. Requires wider platforms and stronger structural members.",
                    },
                    {
                      cls: "5",
                      load: "4.50 kN/m\u00B2",
                      use: "Very heavy-duty work",
                      detail:
                        "Stonework, heavy precast elements, and operations involving substantial material storage. Relatively uncommon and requires bespoke design.",
                    },
                    {
                      cls: "6",
                      load: "6.00 kN/m\u00B2",
                      use: "Special heavy-duty work",
                      detail:
                        "Exceptional loading conditions. Large precast units, heavy plant items on the platform, or other specialist operations. Always requires a full engineering design.",
                    },
                  ].map((row) => (
                    <div key={row.cls} className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center min-w-[40px] h-10 rounded-lg bg-slate-500/20 text-slate-400 text-sm font-bold flex-shrink-0">
                          {row.cls}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <p className="text-white font-medium text-sm">
                              {row.use}
                            </p>
                            <span className="text-slate-400 text-xs font-mono font-semibold whitespace-nowrap">
                              {row.load}
                            </span>
                          </div>
                          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                            {row.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Point
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The load class must be{" "}
                  <strong>specified by the person commissioning the scaffold</strong>{" "}
                  and must reflect the actual work to be carried out. If the
                  nature of the work changes after the scaffold has been
                  erected &mdash; for example, if painting (Class 2) is replaced
                  by brickwork (Class 4) &mdash; the scaffold must be{" "}
                  <strong>re-assessed and potentially redesigned</strong> before
                  the heavier work begins. Using a scaffold beyond its design
                  load class is extremely dangerous and can lead to structural
                  failure.
                </p>
              </div>

              <p>
                In addition to the uniformly distributed service load, BS EN
                12811-1 also specifies{" "}
                <strong>concentrated point loads</strong> that platforms must
                withstand. These account for the localised loading caused by a
                worker standing in one spot, a stack of materials placed in a
                small area, or the leg of a trestle or hop-up. The concentrated
                load requirement increases with the load class, ensuring that
                platforms can resist both spread and localised loading.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Width Categories (W06–W24) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">04</span>
            Width Categories (W06&ndash;W24)
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Alongside load classes, BS EN 12811-1 defines{" "}
                <strong>width categories</strong> that specify the minimum clear
                width of the scaffold platform. The width category is designated
                by the letter{" "}
                <strong>W followed by two digits</strong> representing the
                minimum clear width in decimetres (tenths of a metre). For
                example, W09 means a minimum clear platform width of 0.9 metres.
              </p>

              <p>
                The width category determines how much usable space is available
                on the scaffold platform for{" "}
                <strong>workers, tools, and materials</strong>. A platform that
                is too narrow for the intended work is both{" "}
                <strong>unsafe and inefficient</strong> &mdash; workers are
                cramped, materials cannot be stored safely, and the risk of
                items falling from the scaffold increases.
              </p>

              {/* Width Category Specifications (Diagram) */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-500/30 to-slate-400/20 border-b border-slate-500/30 px-4 py-3">
                  <p className="text-slate-400 font-semibold text-base">
                    Width Category Specifications
                  </p>
                  <p className="text-white/60 text-xs">
                    BS EN 12811-1 &mdash; Minimum clear platform widths
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    {
                      cat: "W06",
                      width: "0.6 m",
                      boards: "2 boards",
                      use: "Access and inspection only. Too narrow for any construction work. Suitable for ladder access bays or short inspection walkways.",
                    },
                    {
                      cat: "W09",
                      width: "0.9 m",
                      boards: "3 boards",
                      use: "Light work without material storage. Adequate for painting, pointing, and cleaning where workers do not need to pass one another on the platform.",
                    },
                    {
                      cat: "W12",
                      width: "1.2 m",
                      boards: "4 boards",
                      use: "General construction work. The most common width for standard scaffolding in the UK. Allows workers to pass one another and provides space for tools and limited materials.",
                    },
                    {
                      cat: "W15",
                      width: "1.5 m",
                      boards: "5 boards",
                      use: "Construction work with material storage. Provides additional space for stacking bricks, blocks, or other materials alongside the working area.",
                    },
                    {
                      cat: "W18",
                      width: "1.8 m",
                      boards: "6 boards",
                      use: "Heavy-duty work with significant material storage. Commonly specified for brickwork and blockwork scaffolds where pallets of materials are loaded by forklift or crane.",
                    },
                    {
                      cat: "W21",
                      width: "2.1 m",
                      boards: "7 boards",
                      use: "Specialist applications requiring wide platforms. Used where two workers need to work side by side with materials stored between them and the building face.",
                    },
                    {
                      cat: "W24",
                      width: "2.4 m",
                      boards: "8 boards",
                      use: "Maximum standard width. Used for exceptional loading conditions, heavy cladding operations, or where mechanical handling equipment operates on the platform.",
                    },
                  ].map((row) => (
                    <div key={row.cat} className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center justify-center min-w-[48px] flex-shrink-0">
                          <span className="text-slate-400 text-sm font-mono font-bold">
                            {row.cat}
                          </span>
                          <span className="text-white/40 text-[10px] mt-0.5">
                            {row.width}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white/60 text-xs">
                              ~{row.boards}
                            </span>
                          </div>
                          <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                            {row.use}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Practical Note:
                  </strong>{" "}
                  The number of scaffold boards shown is approximate and assumes
                  standard 225 mm wide boards. The actual number of boards
                  needed may differ depending on the board width used and any
                  gaps required for standards passing through the platform. The
                  key measurement is the{" "}
                  <strong>clear usable width</strong> of the platform after all
                  obstructions are accounted for.
                </p>
              </div>

              <p>
                Load class and width category work together. A scaffold
                specified as{" "}
                <strong>
                  Load Class 3, W12
                </strong>{" "}
                has a platform designed to carry 2.00 kN/m&sup2; of uniformly
                distributed load with a minimum clear width of 1.2 metres. Both
                designations must be stated in the scaffold design and
                communicated to everyone using the scaffold.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: BS EN 12810 — Facade Scaffolds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">05</span>
            BS EN 12810 &mdash; Facade Scaffolds
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>BS EN 12810</strong> is a two-part standard that covers{" "}
                <strong>prefabricated facade scaffold systems</strong>. These are
                the manufactured, modular scaffold systems (often called
                &ldquo;system scaffolds&rdquo;) that use pre-engineered frames,
                ledgers, and transoms with proprietary connection methods instead
                of loose tubes and couplers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  BS EN 12810 &mdash; Two Parts
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Part 1: Product specifications</strong>{" "}
                      &mdash; Defines the requirements that prefabricated facade
                      scaffold components must meet, including dimensions,
                      materials, connections, and safety features. Manufacturers
                      must demonstrate that their products comply with this part.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Part 2: Particular methods of structural design
                      </strong>{" "}
                      &mdash; Sets out the specific structural design methods
                      applicable to facade scaffold systems, supplementing the
                      general design requirements of BS EN 12811-1.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Facade scaffolds differ from traditional tube-and-fitting
                scaffolds in several important ways. The components are
                manufactured to tight tolerances and connect using{" "}
                <strong>
                  proprietary locking mechanisms
                </strong>{" "}
                such as rosette, cup-lock, or ring-lock systems. This means
                assembly is faster and more consistent, but it also means that{" "}
                <strong>
                  components from different manufacturers cannot be mixed
                </strong>{" "}
                &mdash; a Layher rosette will not connect to a HAKI cup-lock, for
                example.
              </p>

              <p>
                A facade scaffold must comply with{" "}
                <strong>both BS EN 12810 and BS EN 12811</strong>. The system
                must satisfy the product-specific requirements of BS EN 12810
                and the overarching performance requirements of BS EN 12811-1.
                The manufacturer provides technical data, load tables, and
                erection instructions that demonstrate compliance with both
                standards. Erectors must follow the manufacturer&rsquo;s
                instructions exactly &mdash; deviating from the published
                configurations without an engineering assessment invalidates the
                design.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    System Scaffolds on UK Sites:
                  </strong>{" "}
                  System scaffolds are increasingly common on UK construction
                  sites because they are faster to erect, require fewer loose
                  components, and provide a more consistent finish. However, they
                  still require competent erectors who have been trained on the
                  specific system being used. Generic scaffolding training alone
                  is not sufficient &mdash; the erector must understand the
                  particular system&rsquo;s components, connections, and
                  limitations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: BS EN 12812 (Falsework), BS EN 74 (Couplers), and BS EN 39 (Tubes) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">06</span>
            BS EN 12812, BS EN 74 &amp; BS EN 39
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Three further standards complete the regulatory framework for
                scaffolding and temporary works in the UK. Although they cover
                different components, they all interact with BS EN 12811 and
                contribute to the overall safety of temporary structures on
                construction sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  BS EN 12812 &mdash; Falsework
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Falsework is a temporary structure used to{" "}
                      <strong className="text-white">
                        support a permanent structure during construction
                      </strong>{" "}
                      until that permanent structure is capable of supporting
                      itself &mdash; for example, supporting a concrete slab
                      until the concrete has cured to sufficient strength.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Although falsework uses similar materials and components to
                      scaffolding (steel tubes, frames, and fittings), its
                      purpose is fundamentally different &mdash;{" "}
                      <strong className="text-white">
                        it supports the structure, not the worker
                      </strong>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      BS EN 12812 specifies the performance requirements and
                      general design principles for falsework, including
                      structural adequacy, stability, and the management of
                      loads during construction.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  BS EN 74 &mdash; Couplers, Spigot Pins &amp; Base Plates
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      In a tube-and-fitting scaffold, every joint between
                      members depends on a{" "}
                      <strong className="text-white">coupler</strong> to
                      transfer load. BS EN 74 specifies the design, testing, and
                      performance requirements for three categories of couplers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Right-angle couplers
                      </strong>{" "}
                      connect two tubes at 90 degrees and are the primary
                      structural connection in tube-and-fitting scaffolds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Swivel couplers
                      </strong>{" "}
                      allow two tubes to be connected at any angle and are used
                      for bracing and non-standard connections.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Sleeve couplers (joint pins)
                      </strong>{" "}
                      connect two tubes end to end to extend their length.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The standard also covers{" "}
                      <strong className="text-white">base plates</strong>{" "}
                      (which distribute the scaffold load to the ground) and{" "}
                      <strong className="text-white">spigot pins</strong>{" "}
                      (which connect vertical members together).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  BS EN 39 &mdash; Steel Scaffold Tubes
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      BS EN 39 specifies the requirements for loose steel tubes
                      used in tube-and-fitting scaffolds. All tubes have a
                      standard{" "}
                      <strong className="text-white">
                        outside diameter of 48.3 mm
                      </strong>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Type 3 tubes</strong>{" "}
                      have a wall thickness of{" "}
                      <strong className="text-white">3.2 mm</strong> and weigh
                      approximately 3.56 kg per metre. They are lighter and
                      easier to handle but have lower load-carrying capacity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Type 4 tubes</strong>{" "}
                      have a wall thickness of{" "}
                      <strong className="text-white">4.0 mm</strong> and weigh
                      approximately 4.37 kg per metre. They are heavier but
                      provide greater strength and stiffness, and are specified
                      in many scaffold designs, particularly for heavily loaded
                      standards and ledgers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The 48.3 mm outside diameter is fundamental &mdash; all
                      couplers, fittings, and design calculations in
                      tube-and-fitting scaffolding are based on this dimension.
                      Using non-standard tubes compromises every connection in
                      the scaffold.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Site Safety
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Damaged, corroded, or bent tubes must be{" "}
                  <strong>removed from service immediately</strong>. A tube with
                  significant wall thinning due to corrosion has reduced
                  load-carrying capacity and may fail under load. Similarly,
                  couplers that are cracked, distorted, or have damaged threads
                  must be discarded. Scaffold components are safety-critical
                  items &mdash; there is no place for &ldquo;make do and
                  mend&rdquo; on a scaffold.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Scaffold Boards and Service/Duty Classifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">07</span>
            Scaffold Boards &amp; Service Classifications
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scaffold platform is where workers stand, walk, and carry out
                their tasks. The{" "}
                <strong>boards or decking that form the platform</strong> are
                therefore among the most critical components in the entire
                scaffold &mdash; a board that fails under load can cause a fall
                from height, which remains the{" "}
                <strong>
                  single largest cause of workplace fatalities in UK construction
                </strong>
                .
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  BS 2482 &mdash; Timber Scaffold Boards
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dimensions:</strong>{" "}
                      Standard scaffold boards are 225 mm wide and either 38 mm
                      or 63 mm thick. Lengths are typically 2.4 m, 3.0 m, or
                      3.9 m. The 38 mm board can span up to 1.2 m between
                      supports, whilst the 63 mm board can span up to 2.5 m.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Timber quality:</strong>{" "}
                      Boards must be free from defects that could reduce their
                      strength &mdash; including excessive knots, splits,
                      shakes, wane, and cross-grain. The grain must run
                      substantially parallel to the length of the board.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">End banding:</strong>{" "}
                      Each board should be fitted with galvanised hoop-iron end
                      bands (or equivalent protection) to prevent splitting at
                      the ends. Boards without end bands are more susceptible to
                      damage from handling and should be replaced.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Inspection:</strong>{" "}
                      Boards must be visually inspected before each use. Boards
                      that are split, warped, have excessive knot damage, or are
                      wet-rotted must be removed from service.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Steel and aluminium decking</strong> is increasingly
                used as an alternative to timber boards, particularly in system
                scaffolds. Metal decking is lighter per unit area, more
                consistent in strength, and has a longer service life. It must
                comply with the relevant manufacturer&rsquo;s specifications and
                satisfy the performance requirements of BS EN 12811-1 for the
                specified load class. Metal decking typically has a non-slip
                surface treatment and integral hooks or clips that secure it to
                the scaffold frame.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Service &amp; Duty Classifications
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The terms <strong className="text-white">service classification</strong>{" "}
                      and <strong className="text-white">duty classification</strong>{" "}
                      are sometimes used interchangeably with load class in
                      older documentation and site practice. They describe the
                      same concept &mdash; the intended use and loading
                      of the scaffold platform.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Light duty</strong>{" "}
                      corresponds broadly to Load Classes 1 and 2 &mdash;
                      inspection, painting, and light finishing work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">General duty</strong>{" "}
                      corresponds to Load Class 3 &mdash; standard construction
                      work with some material storage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Heavy duty</strong>{" "}
                      corresponds to Load Classes 4, 5, and 6 &mdash;
                      brickwork, blockwork, stonework, and specialist heavy
                      operations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Modern practice strongly favours using the{" "}
                      <strong className="text-white">
                        BS EN 12811-1 load class numbers
                      </strong>{" "}
                      rather than the older duty descriptions, as the numerical
                      system is precise, unambiguous, and linked directly to
                      specific load values.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Board Management on Site:
                  </strong>{" "}
                  Scaffold boards are consumable items that deteriorate with use
                  and exposure to weather. Sites should operate a board
                  management system that includes regular inspection, removal of
                  defective boards, and controlled storage. Boards left standing
                  in water, exposed to prolonged rain without drying, or stored
                  in direct contact with the ground will decay rapidly. A board
                  that looks sound on the surface may have internal decay that
                  significantly reduces its load-carrying capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Relationship Between Standards and Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400 text-sm font-normal">08</span>
            Relationship Between Standards &amp; Practice
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding how the various standards interact with each other
                and with practical guidance documents is essential for anyone
                involved in scaffolding. The standards do not exist in isolation
                &mdash; they form a{" "}
                <strong>
                  coherent framework that links legislation, design, manufacture,
                  erection, and inspection
                </strong>
                .
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  How the Standards Fit Together
                </p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Work at Height Regulations 2005
                      </strong>{" "}
                      require that scaffolding is designed and erected in
                      accordance with generally recognised standards. This is the
                      legal hook that gives BS EN standards their authority on UK
                      construction sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        BS EN 12811-1
                      </strong>{" "}
                      provides the performance requirements that every scaffold
                      must satisfy &mdash; this is the standard against which
                      compliance is measured.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        NASC TG20
                      </strong>{" "}
                      provides pre-calculated solutions for common
                      tube-and-fitting scaffold configurations that comply with
                      BS EN 12811-1. It is a practical compliance tool, not a
                      replacement for the standard.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        BS EN 12810
                      </strong>{" "}
                      adds product-specific requirements for system scaffolds.
                      Manufacturers use this standard alongside BS EN 12811-1 to
                      design and certify their products.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        BS EN 74
                      </strong>{" "}
                      and{" "}
                      <strong className="text-white">BS EN 39</strong> ensure
                      that the individual components (couplers and tubes) have
                      known, reliable properties so that the design calculations
                      based on BS EN 12811-1 are valid.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">BS 2482</strong> does the
                      same for scaffold boards &mdash; ensuring that the timber
                      used for platforms has been tested and graded to a known
                      standard of performance.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For scaffolds that fall{" "}
                <strong>outside the scope of TG20</strong> &mdash; for example,
                scaffolds that are exceptionally tall, heavily loaded, or have
                unusual configurations &mdash; a{" "}
                <strong>bespoke design by a competent scaffold designer</strong>{" "}
                is required. That design must demonstrate compliance with BS EN
                12811-1 through engineering calculations, and the designer must
                specify the load class, width category, and all structural
                details. The completed design is issued as a scaffold design
                drawing and calculation that the erector follows on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  Standards in the Scaffold Lifecycle
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">Commission</p>
                      <p>
                        The client or principal contractor specifies the load
                        class and width category based on the work to be carried
                        out. This must be informed by BS EN 12811-1.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">Design</p>
                      <p>
                        The scaffold is designed to comply with BS EN 12811-1
                        using either TG20 (for standard configurations) or a
                        bespoke engineering design (for non-standard
                        configurations).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">Procure</p>
                      <p>
                        Tubes (BS EN 39), couplers (BS EN 74), boards (BS 2482),
                        and system components (BS EN 12810) are sourced. All
                        must comply with their respective standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">Erect</p>
                      <p>
                        Competent scaffolders erect the scaffold in accordance
                        with the design, using compliant components and following
                        manufacturer instructions (for system scaffolds) or TG20
                        guidance (for tube-and-fitting scaffolds).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">Inspect</p>
                      <p>
                        A competent person inspects the scaffold before first use
                        and at regular intervals (at least every seven days under
                        the Work at Height Regulations). The inspection verifies
                        compliance with BS EN 12811-1 requirements including
                        platform dimensions, guard-rails, access, and structural
                        adequacy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium">Use</p>
                      <p>
                        The scaffold is used within the parameters of its design
                        &mdash; the correct load class and width category. Any
                        change to the intended use requires re-assessment
                        against the standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-white font-medium">Dismantle</p>
                      <p>
                        The scaffold is dismantled by competent persons in a
                        controlled sequence. Components are inspected, and any
                        that are damaged or worn beyond acceptable limits are
                        taken out of service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Site Error
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  One of the most common failures on UK construction sites is
                  the{" "}
                  <strong>
                    use of a scaffold beyond its design parameters
                  </strong>
                  . A scaffold designed as Load Class 2 for painting is
                  subsequently used by bricklayers who stack pallets of bricks on
                  the platform. The scaffold was never designed for this loading
                  and may fail catastrophically. Every person working on a
                  scaffold has a responsibility to understand the scaffold&rsquo;s
                  design limitations, and the scaffolding contractor must ensure
                  the scaffold is clearly signed and the load class is
                  communicated.
                </p>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Key Takeaway:
                  </strong>{" "}
                  Standards are the foundation of scaffold safety. They ensure
                  consistency, predictability, and reliability across every
                  scaffold erected in the UK. The practical guidance documents
                  such as TG20 and manufacturer instructions translate the
                  standards into site-level instructions that erectors can
                  follow. Without this chain &mdash; from legislation, through
                  standards, through design, to site practice &mdash; there is
                  no assurance that a scaffold is safe to use.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-2-section-4">
              Next: CDM 2015 &amp; Scaffold Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
