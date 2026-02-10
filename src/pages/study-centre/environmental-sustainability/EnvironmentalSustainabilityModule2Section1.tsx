import { ArrowLeft, Recycle, CheckCircle, AlertTriangle, Trash2, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "env-waste-hierarchy-order",
    question:
      "What is the correct order of the waste hierarchy from most preferred to least preferred?",
    options: [
      "Prevention, Preparing for Reuse, Recycling, Other Recovery, Disposal",
      "Recycling, Prevention, Reuse, Disposal, Recovery",
      "Disposal, Recovery, Recycling, Reuse, Prevention",
      "Prevention, Recycling, Preparing for Reuse, Disposal, Other Recovery",
    ],
    correctIndex: 0,
    explanation:
      "The waste hierarchy, as set out in the Waste (England and Wales) Regulations 2011 and the EU Waste Framework Directive, runs from the most preferred option (Prevention) through Preparing for Reuse, Recycling, and Other Recovery, down to the least preferred option (Disposal). The aim is always to manage waste at the highest practicable level of the hierarchy.",
  },
  {
    id: "env-recycling-segregation",
    question:
      "Why is on-site segregation of waste materials essential for effective recycling on construction sites?",
    options: [
      "It reduces the number of skips needed on site",
      "It prevents cross-contamination, ensures materials retain value, and increases recycling rates",
      "It is only necessary for hazardous waste streams",
      "It allows all waste to be sent to landfill more efficiently",
    ],
    correctIndex: 1,
    explanation:
      "On-site segregation prevents cross-contamination between different waste streams (e.g. plasterboard contaminating timber, or food waste contaminating recyclable plastics). When materials are properly separated, they retain their value for recyclers and reprocessors. Mixed skips are far harder and more expensive to sort, and contaminated loads may be rejected entirely, resulting in the whole skip going to landfill or energy-from-waste instead of being recycled.",
  },
  {
    id: "env-landfill-tax-purpose",
    question:
      "What is the primary purpose of the UK landfill tax escalator?",
    options: [
      "To generate revenue for local councils",
      "To progressively increase the cost of landfill disposal, making waste reduction and recycling more economically attractive",
      "To fund the construction of new landfill sites",
      "To subsidise energy-from-waste facilities",
    ],
    correctIndex: 1,
    explanation:
      "The landfill tax escalator is a deliberate government policy that increases the standard rate of landfill tax each year above inflation. Its primary purpose is economic — by making landfill disposal progressively more expensive, it creates a financial incentive for businesses to reduce waste, reuse materials, and recycle rather than sending waste to landfill. The escalator has been one of the most effective drivers of improved waste management in the UK construction industry.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Is the waste hierarchy a legal requirement on construction sites in England and Wales?",
    answer:
      "Yes. The Waste (England and Wales) Regulations 2011 (as amended) transpose the requirements of the EU Waste Framework Directive (2008/98/EC) into domestic law. Regulation 12 requires anyone who produces, keeps, treats, or disposes of waste to take all measures available that are reasonable in the circumstances to apply the waste hierarchy. This applies to all construction sites. While the hierarchy allows departure where a different option delivers a better overall environmental outcome (assessed through life-cycle analysis), in practice this exception is narrow and must be justified. Failure to apply the hierarchy can result in enforcement action by the Environment Agency.",
  },
  {
    question:
      "What is the difference between recycling and other recovery in the waste hierarchy?",
    answer:
      "Recycling means reprocessing waste materials into new products, substances, or materials for their original or a different purpose. For example, crushing concrete to create recycled aggregate, or melting scrap copper to produce new copper products. Other recovery refers to processes that extract value from waste but do not turn it back into a material product — the most common example being energy recovery through incineration (energy-from-waste plants). Anaerobic digestion of organic waste and the production of refuse-derived fuel (RDF) also fall under other recovery. In the hierarchy, recycling is preferred because it keeps materials in productive use, whereas energy recovery destroys the material and only captures its calorific value.",
  },
  {
    question:
      "How does BIM (Building Information Modelling) help reduce construction waste?",
    answer:
      "BIM supports waste prevention in several ways. First, it enables precise quantity take-offs, meaning materials can be ordered accurately and over-ordering is minimised. Second, design coordination in the BIM model can identify clashes and design issues before construction starts, reducing rework and abortive waste on site. Third, BIM can be used to model construction sequences that optimise material use and reduce off-cuts (for example, designing wall lengths to suit standard plasterboard sheet sizes). Fourth, BIM data can feed directly into waste forecasting tools, allowing project teams to set waste targets and benchmark performance. WRAP guidance specifically recommends integrating waste management planning into the BIM process at early design stages.",
  },
  {
    question:
      "What are BREEAM waste credits and how are they achieved?",
    answer:
      "BREEAM (Building Research Establishment Environmental Assessment Method) is the leading sustainability assessment standard in the UK. Under the Waste category (Wst 01 — Construction Waste Management), credits are awarded for projects that set waste targets, implement a resource management plan, monitor waste generated on site, and demonstrate performance against benchmarks. Credits are available at different levels depending on how much waste is diverted from landfill and how low the overall waste generation rate is per unit of floor area. Achieving BREEAM waste credits requires documented evidence of waste monitoring, segregation, and diversion rates, typically measured in m³ per 100 m² of gross internal floor area or tonnes per £100,000 of project value.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "The waste hierarchy in the Waste (England and Wales) Regulations 2011 is based on which European directive?",
    options: [
      "EU Waste Framework Directive 2008/98/EC",
      "EU Packaging and Packaging Waste Directive 94/62/EC",
      "EU Landfill Directive 1999/31/EC",
      "EU Industrial Emissions Directive 2010/75/EU",
    ],
    correctAnswer: 0,
    explanation:
      "The Waste (England and Wales) Regulations 2011 transpose the requirements of the EU Waste Framework Directive 2008/98/EC into domestic law. Article 4 of the directive establishes the five-step waste hierarchy (Prevention, Preparing for Reuse, Recycling, Other Recovery, Disposal), and the 2011 Regulations require duty holders in England and Wales to apply this hierarchy when managing waste.",
  },
  {
    id: 2,
    question:
      "Which level of the waste hierarchy is considered the most preferred option?",
    options: [
      "Recycling",
      "Preparing for Reuse",
      "Prevention",
      "Other Recovery",
    ],
    correctAnswer: 2,
    explanation:
      "Prevention sits at the top of the waste hierarchy as the most preferred option. It means avoiding the creation of waste in the first place through better design, accurate ordering, procurement strategies, and construction methods that minimise off-cuts and surplus. Prevention delivers the greatest environmental benefit because no waste is generated, no energy is used in reprocessing, and no residual material requires management.",
  },
  {
    id: 3,
    question:
      "A construction site has a large quantity of clean reclaimed bricks from a demolition phase. Under the waste hierarchy, which level does using these bricks in new construction represent?",
    options: [
      "Prevention",
      "Preparing for Reuse",
      "Recycling",
      "Other Recovery",
    ],
    correctAnswer: 1,
    explanation:
      "Using reclaimed bricks from demolition is an example of Preparing for Reuse — the second level of the hierarchy. The bricks are checked, cleaned, and prepared so they can fulfil the same function (building a wall) without being reprocessed into a different material. This is distinct from recycling, which would involve crushing the bricks to make aggregate — a lower-value use of the material.",
  },
  {
    id: 4,
    question:
      "What is the approximate standard rate of UK landfill tax per tonne (as of the most recent published rate)?",
    options: [
      "£50.00 per tonne",
      "£75.50 per tonne",
      "£103.70 per tonne",
      "£150.00 per tonne",
    ],
    correctAnswer: 2,
    explanation:
      "The standard rate of UK landfill tax is approximately £103.70 per tonne. This rate applies to all waste that is not classified as inert (such as soil and stone from excavation, which attracts the lower rate). The landfill tax escalator has progressively increased this rate year on year, making landfill disposal significantly more expensive than alternative waste management routes and driving the construction industry towards higher levels of the waste hierarchy.",
  },
  {
    id: 5,
    question:
      "On a construction site, plasterboard must be segregated from general waste. What is the primary reason?",
    options: [
      "Plasterboard is classified as hazardous waste under all circumstances",
      "Plasterboard produces hydrogen sulphide gas when landfilled with biodegradable waste, creating a toxic and explosive hazard",
      "Plasterboard cannot be recycled under any circumstances",
      "Plasterboard is too heavy to be placed in general waste skips",
    ],
    correctAnswer: 1,
    explanation:
      "Plasterboard (gypsum board) must be segregated because when it decomposes in landfill in the presence of biodegradable waste, it produces hydrogen sulphide (H₂S) gas. H₂S is toxic (it can be fatal at high concentrations) and is also flammable/explosive. For this reason, the Environmental Permitting (England and Wales) Regulations prohibit the co-disposal of gypsum waste with biodegradable waste in landfill. On site, this means plasterboard must go into dedicated plasterboard-only skips and be sent to a specialist recycler.",
  },
  {
    id: 6,
    question:
      "Which of the following is an example of 'Other Recovery' in the waste hierarchy?",
    options: [
      "Crushing concrete to produce recycled aggregate",
      "Reclaiming roof slates for use on another building",
      "Incinerating waste to generate electricity at an energy-from-waste plant",
      "Ordering materials in exact quantities to avoid surplus",
    ],
    correctAnswer: 2,
    explanation:
      "Energy-from-waste incineration is the most common form of Other Recovery. The waste is burned at high temperatures and the heat generated is used to produce electricity or provide district heating. While this diverts waste from landfill and captures energy value, it destroys the material permanently and produces residual ash that may still require landfilling. Crushing concrete is recycling (material is reprocessed into a new product), reclaiming slates is preparing for reuse, and accurate ordering is prevention.",
  },
  {
    id: 7,
    question:
      "A site manager wants to measure waste performance using a KPI. Which of the following is a recognised construction waste KPI?",
    options: [
      "Number of skips removed per week",
      "Cubic metres of waste per £100,000 of project value",
      "Weight of waste per number of workers on site",
      "Total skip hire cost as a percentage of turnover",
    ],
    correctAnswer: 1,
    explanation:
      "Cubic metres of waste per £100,000 of project value (m³/£100k) is one of the standard construction waste KPIs recommended by WRAP and used in BREEAM assessments. Another common KPI is tonnes of waste per 100 m² of gross internal floor area. These normalised metrics allow meaningful benchmarking between projects of different sizes and types. Simply counting skips or measuring cost does not account for project scale and does not indicate whether waste management is improving.",
  },
  {
    id: 8,
    question:
      "Which of the following practical measures directly supports the waste hierarchy at the Prevention level on a construction site?",
    options: [
      "Providing colour-coded skips for waste segregation",
      "Sending mixed waste to an energy-from-waste facility",
      "Using just-in-time delivery and BIM-based quantity take-offs to order precise material quantities",
      "Conducting a waste audit at project completion",
    ],
    correctAnswer: 2,
    explanation:
      "Just-in-time delivery and BIM-based quantity take-offs are Prevention measures — they stop waste from being created in the first place by ensuring only the materials actually needed are delivered to site. Colour-coded skips support recycling (the third level), energy-from-waste is other recovery (the fourth level), and a post-completion waste audit is a measurement and benchmarking activity rather than a prevention measure in itself.",
  },
];

/* ──────────────── Waste Hierarchy Pyramid data ─────────────────────────── */

const wasteHierarchyLevels = [
  {
    level: 1,
    title: "Prevention",
    description: "Reducing waste at source — designing out waste, accurate ordering, avoiding over-specification",
    colour: "emerald",
    bgClass: "bg-emerald-500/20",
    borderClass: "border-emerald-500/40",
    textClass: "text-emerald-300",
    dotClass: "bg-emerald-400",
    width: "w-[40%]",
  },
  {
    level: 2,
    title: "Preparing for Reuse",
    description: "Checking, cleaning, repairing products or components so they can be reused without reprocessing",
    colour: "green",
    bgClass: "bg-green-500/20",
    borderClass: "border-green-500/40",
    textClass: "text-green-300",
    dotClass: "bg-green-400",
    width: "w-[52%]",
  },
  {
    level: 3,
    title: "Recycling",
    description: "Reprocessing waste materials into new products, substances, or materials",
    colour: "yellow",
    bgClass: "bg-yellow-500/20",
    borderClass: "border-yellow-500/40",
    textClass: "text-yellow-300",
    dotClass: "bg-yellow-400",
    width: "w-[64%]",
  },
  {
    level: 4,
    title: "Other Recovery",
    description: "Extracting value from waste — primarily energy recovery (incineration, anaerobic digestion)",
    colour: "orange",
    bgClass: "bg-orange-500/20",
    borderClass: "border-orange-500/40",
    textClass: "text-orange-300",
    dotClass: "bg-orange-400",
    width: "w-[78%]",
  },
  {
    level: 5,
    title: "Disposal",
    description: "Landfill or incineration without energy recovery — the last resort",
    colour: "red",
    bgClass: "bg-red-500/20",
    borderClass: "border-red-500/40",
    textClass: "text-red-300",
    dotClass: "bg-red-400",
    width: "w-full",
  },
];

/* ──────────── Site Waste Segregation Guide data ──────────────────────── */

const skipColourGuide = [
  {
    colour: "Blue",
    bgClass: "bg-blue-500/20",
    borderClass: "border-blue-500/40",
    dotClass: "bg-blue-400",
    textClass: "text-blue-300",
    materials: "Plasterboard / gypsum products only",
    notes: "Must not be mixed with biodegradable waste due to H₂S gas risk",
  },
  {
    colour: "Green",
    bgClass: "bg-green-500/20",
    borderClass: "border-green-500/40",
    dotClass: "bg-green-400",
    textClass: "text-green-300",
    materials: "Timber / wood",
    notes: "Clean timber only — no painted, treated, or contaminated wood",
  },
  {
    colour: "Red",
    bgClass: "bg-red-500/20",
    borderClass: "border-red-500/40",
    dotClass: "bg-red-400",
    textClass: "text-red-300",
    materials: "Metals (ferrous and non-ferrous)",
    notes: "Steel, copper, aluminium, lead — high recycling value",
  },
  {
    colour: "Yellow",
    bgClass: "bg-yellow-500/20",
    borderClass: "border-yellow-500/40",
    dotClass: "bg-yellow-400",
    textClass: "text-yellow-300",
    materials: "Plastics (packaging, cable sheathing, pipe off-cuts)",
    notes: "Segregate by polymer type where practicable for higher recycling rates",
  },
  {
    colour: "Grey",
    bgClass: "bg-gray-500/20",
    borderClass: "border-gray-500/40",
    dotClass: "bg-gray-400",
    textClass: "text-gray-300",
    materials: "Inert waste (concrete, bricks, stone, ceramics)",
    notes: "Can be crushed to produce recycled aggregate (RA) for use as fill or sub-base",
  },
  {
    colour: "Black",
    bgClass: "bg-white/10",
    borderClass: "border-white/30",
    dotClass: "bg-white/60",
    textClass: "text-white/70",
    materials: "General / mixed waste (last resort)",
    notes: "Only for waste that genuinely cannot be segregated — aim to minimise this stream",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const EnvironmentalSustainabilityModule2Section1 = () => {
  useSEO({
    title:
      "The Waste Hierarchy | Environmental & Sustainability Module 2 Section 1",
    description:
      "Understand the waste hierarchy as defined by the Waste (England and Wales) Regulations 2011 and EU Waste Framework Directive. Learn the five levels — Prevention, Preparing for Reuse, Recycling, Other Recovery, and Disposal — and how to apply them on construction sites.",
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
            <Link to="../environmental-sustainability-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Recycle className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
          <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Waste Hierarchy
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the five-level waste hierarchy &mdash; from prevention to disposal &mdash; and
            how to apply it practically on construction sites to reduce environmental impact and cost
          </p>
        </div>

        {/* ─── 01 What Is the Waste Hierarchy? ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Is the Waste Hierarchy?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
              <p className="font-semibold text-base text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    The <strong>waste hierarchy</strong> is a legally mandated framework that ranks waste
                    management options from most to least environmentally preferred.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    Established in UK law by the <strong>Waste (England and Wales) Regulations 2011</strong>,
                    transposing Article 4 of the <strong>EU Waste Framework Directive 2008/98/EC</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    It contains <strong>five levels</strong>: Prevention, Preparing for Reuse, Recycling,
                    Other Recovery, and Disposal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    The aim is always to manage waste at the <strong>highest practicable level</strong> of
                    the hierarchy.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
              <p className="font-semibold text-base text-emerald-400 mb-2">Why It Matters for Construction</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    The UK construction industry generates approximately <strong>60% of all waste</strong> produced
                    nationally &mdash; around 120 million tonnes per year.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    Landfill tax now stands at approximately <strong>&pound;103.70 per tonne</strong>,
                    making poor waste management extremely costly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    Applying the hierarchy reduces costs, improves <strong>BREEAM scores</strong>, meets
                    client sustainability targets, and reduces environmental harm.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>
                    Failure to apply the hierarchy is a <strong>regulatory offence</strong> enforceable
                    by the Environment Agency.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 Prevention ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">02</span>
              Prevention &mdash; Designing Out Waste
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Prevention is the most preferred level of the waste hierarchy. It means reducing the
                quantity and harmfulness of waste before it is created. In construction, this requires
                action at every stage &mdash; from design and procurement through to site delivery
                and installation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Key Prevention Strategies</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Designing out waste:</strong> Architects and engineers can reduce waste at the
                      design stage by specifying standard material sizes, designing to modular dimensions,
                      and avoiding bespoke or over-complex details that generate large quantities of off-cuts.
                      WRAP guidance recommends integrating waste reduction into design briefs from RIBA Stage 2.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>BIM for waste reduction:</strong> Building Information Modelling enables precise
                      quantity take-offs, identifies clashes before construction begins (reducing rework),
                      and allows construction sequences to be optimised for material efficiency. BIM data can
                      feed directly into waste forecasting tools.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Procurement strategies:</strong> Ordering materials with minimal packaging,
                      specifying returnable packaging systems, and working with suppliers who operate
                      take-back schemes all reduce waste before it reaches site.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Just-in-time delivery:</strong> Delivering materials to site only when they are
                      needed reduces storage time, minimises damage from weather exposure or site traffic,
                      and avoids over-ordering. Materials left on site for extended periods are far more
                      likely to become waste through damage, degradation, or specification changes.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Accurate ordering:</strong> Using BIM quantities, checking measurements
                      before ordering, and applying appropriate waste allowances (typically 5&ndash;10%
                      rather than blanket 15&ndash;20% over-orders) prevents surplus materials that
                      end up as waste.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">WRAP Guidance</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The Waste and Resources Action Programme (<strong className="text-white">WRAP</strong>) provides
                  free guidance, tools, and case studies for construction waste prevention. Their
                  &ldquo;Designing Out Waste&rdquo; methodology identifies five principles: design for reuse
                  and recovery, design for off-site construction, design for materials optimisation,
                  design for waste-efficient procurement, and design for deconstruction. WRAP recommends
                  that waste targets are set at the briefing stage and tracked throughout the project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Preparing for Reuse ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">03</span>
              Preparing for Reuse
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Preparing for reuse is the second level of the hierarchy. It involves checking, cleaning,
                repairing, or refurbishing products or components so they can be used again for the same
                purpose without reprocessing into a different material. In construction, this is most
                commonly associated with reclaimed materials from demolition and refurbishment projects.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Common Reclaimed Materials</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Bricks:</strong> Reclaimed bricks from demolition can be cleaned, sorted, and
                      reused in new construction. Pre-1960s bricks laid with lime mortar are particularly
                      suitable for reclamation because the softer mortar can be cleaned off without damaging
                      the brick. Modern bricks laid with Portland cement mortar are harder to reclaim intact.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Timber:</strong> Structural timber (joists, rafters, beams) can be reclaimed,
                      inspected for defects, and reused. Reclaimed hardwood flooring is particularly valued.
                      All reclaimed structural timber must be graded before reuse in a structural application.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Roof slates:</strong> Natural slate has an extremely long lifespan. Slates
                      carefully stripped from a roof during demolition or re-roofing can be sorted, cleaned,
                      and reused. Reclaimed Welsh slate, in particular, commands a premium price.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Steel sections:</strong> Structural steel beams and columns can be reclaimed,
                      inspected, re-tested if necessary, and reused in new structures. The Steel Construction
                      Institute provides guidance on reusing structural steel.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Doors, windows, sanitaryware, radiators:</strong> Building components in
                      serviceable condition can be removed carefully during soft-strip demolition and
                      sold through reclamation yards or community reuse schemes.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">Demolition Protocol for Reclamation</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Maximising reuse requires a <strong className="text-white">pre-demolition audit</strong> to
                  identify materials with reclamation value, followed by a <strong className="text-white">soft-strip
                  phase</strong> where reusable components are carefully removed before the main demolition
                  begins. This is the opposite of conventional demolition, which prioritises speed over
                  material recovery. The audit should assess the type, quantity, condition, and market value
                  of recoverable materials and feed into the site waste management plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Recycling ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              Recycling
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Recycling is the third level of the waste hierarchy. It means reprocessing waste materials
                into new products, substances, or materials — either for the original purpose or for a
                different one. Effective recycling on construction sites depends heavily on proper
                segregation at source.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">On-Site Segregation</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Why segregation matters:</strong> Mixed waste is far harder and more expensive
                      to recycle. Cross-contamination (e.g. plasterboard dust on timber, food waste in
                      recyclable plastics) can render entire skip loads unrecyclable. Properly segregated
                      waste retains its value and achieves much higher recycling rates.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Skip colour coding:</strong> Most principal contractors use colour-coded skips
                      to simplify segregation. Whilst colour schemes vary between sites, common conventions
                      include separate skips for timber, metals, plasterboard, inert waste (concrete, bricks),
                      plastics, and general mixed waste.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Clear signage:</strong> Every skip and waste container should have clear, pictorial
                      signage showing what materials are accepted and what is not permitted. Signage should be
                      multilingual on sites with a diverse workforce.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Commonly Recycled Construction Materials</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Concrete:</strong> Crushed to produce recycled aggregate (RA) for use as
                      sub-base, fill, or pipe bedding. Recycled aggregate meets the requirements of
                      BS 8500 for many applications.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Metals:</strong> Steel, copper, aluminium, and lead are all highly recyclable
                      with established markets. Metals have some of the highest recycling rates of any
                      construction material.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Timber:</strong> Clean, untreated timber can be chipped for use as biomass
                      fuel, animal bedding, or landscape mulch. Some timber waste is reprocessed into
                      particleboard or MDF.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Plasterboard:</strong> Specialist recyclers separate the gypsum core from
                      the paper liner. The gypsum is returned to plasterboard manufacturers as feedstock,
                      and the paper is composted or recycled.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Plastics:</strong> Cable sheathing off-cuts, packaging film, pipe off-cuts,
                      and conduit can all be recycled if properly segregated by polymer type.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Recycled aggregate:</strong> Crushed demolition waste (concrete, brick, stone)
                      reprocessed to meet grading and quality specifications for use as a substitute for
                      primary (quarried) aggregate.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">Plasterboard Segregation</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Plasterboard must <strong className="text-white">always</strong> be segregated from general
                  waste. When gypsum decomposes in landfill in the presence of biodegradable waste, it produces
                  <strong className="text-white"> hydrogen sulphide (H&#8322;S) gas</strong>, which is toxic and
                  flammable. The Environmental Permitting Regulations prohibit the co-disposal of gypsum waste
                  with biodegradable waste. On site, this means plasterboard must go into dedicated
                  plasterboard-only skips.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Other Recovery ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">05</span>
              Other Recovery
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Other recovery is the fourth level of the waste hierarchy. It refers to processes that
                extract value from waste without reprocessing it into a new material product. The most
                common form is <strong>energy recovery</strong> &mdash; using waste as a fuel to generate
                electricity or heat.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Energy Recovery Methods</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Incineration with energy recovery:</strong> Waste is burned at high temperatures
                      (typically 850&ndash;1,100&deg;C) in a controlled facility. The heat generated produces
                      steam, which drives turbines to generate electricity. Some plants also provide district
                      heating. These facilities are commonly called <strong>energy-from-waste (EfW)</strong> plants.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Refuse-derived fuel (RDF):</strong> Non-recyclable waste is processed (shredded,
                      dried, baled) to produce a standardised fuel. RDF is used in cement kilns, industrial
                      boilers, and dedicated combustion plants. It offers a higher calorific value than raw
                      mixed waste and reduces the volume of material sent to landfill.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Anaerobic digestion:</strong> Organic waste (food waste, green waste, some
                      paper/card) is broken down by micro-organisms in the absence of oxygen. The process
                      produces biogas (mainly methane), which is burned to generate electricity or upgraded
                      to biomethane for injection into the gas grid. The residual digestate can be used as
                      a soil conditioner.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Important Distinction</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Energy recovery is <strong className="text-white">below recycling</strong> in the hierarchy
                  because it destroys the material permanently. While it diverts waste from landfill and
                  captures energy value, the original material cannot be recovered. Recycling keeps materials
                  in productive use for longer. Energy recovery should only be used for waste that genuinely
                  cannot be recycled &mdash; it is not an alternative to proper segregation and recycling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Disposal ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">06</span>
              Disposal &mdash; Landfill as Last Resort
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Disposal sits at the bottom of the waste hierarchy as the <strong>least preferred
                option</strong>. In practice, disposal almost always means landfill &mdash; depositing
                waste in an engineered site where it is buried and managed over the long term. Incineration
                without energy recovery also counts as disposal, though this is now rare in the UK.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Landfill Tax</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Standard rate:</strong> The standard rate of landfill tax is approximately
                      <strong> &pound;103.70 per tonne</strong>. This applies to all waste that is not classified
                      as inert. Construction waste such as timber, plasterboard, plastics, insulation, and
                      mixed waste all attract the standard rate.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Lower rate:</strong> A reduced rate (approximately &pound;3.25 per tonne) applies
                      to qualifying inert waste such as clean soil, stone, concrete, and brick that does not
                      contain other materials. This lower rate reflects the reduced environmental impact of
                      inert materials in landfill.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Landfill tax escalator:</strong> The UK government has a policy of increasing the
                      standard rate of landfill tax each year above inflation. This escalator is a deliberate
                      fiscal tool designed to make landfill progressively more expensive, creating an ever-stronger
                      economic incentive to reduce, reuse, and recycle waste rather than landfilling it.
                    </div>
                  </div>
                </div>
              </div>

              {/* Landfill tax callout */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-center">
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Standard Rate
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    &pound;103.70
                  </p>
                  <p className="text-white/60 text-sm">
                    per tonne (non-inert waste)
                  </p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg text-center">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Lower Rate (Inert)
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    &pound;3.25
                  </p>
                  <p className="text-white/60 text-sm">
                    per tonne (clean soil, stone, concrete)
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Environmental Impact of Landfill</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Greenhouse gases:</strong> Biodegradable waste in landfill decomposes anaerobically,
                      producing methane (CH&#8324;) &mdash; a greenhouse gas approximately 25 times more potent
                      than carbon dioxide over a 100-year period. Landfill gas capture systems collect some
                      methane, but significant quantities escape.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Leachate:</strong> Rainwater percolating through landfill waste produces leachate
                      &mdash; a contaminated liquid that can pollute groundwater and surface water if not properly
                      contained and treated. Modern landfills have engineered liners and leachate collection
                      systems, but long-term integrity is never guaranteed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Land use:</strong> Landfill sites consume large areas of land that could otherwise
                      be used for agriculture, habitat, or development. The UK is running out of landfill
                      capacity, particularly in the south-east of England.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Resource depletion:</strong> Every tonne of material sent to landfill represents
                      resources (energy, water, raw materials) consumed in its manufacture that cannot be
                      recovered. Landfilling is a permanent loss of embodied value.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Applying the Hierarchy on Site ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">07</span>
              Applying the Hierarchy on Site
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding the waste hierarchy is only valuable if it translates into practical action
                on site. Every member of the site team &mdash; from the project manager to the newest
                apprentice &mdash; has a role in reducing waste. The following practical measures help
                embed the hierarchy into daily site operations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Practical Steps</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Skip management:</strong> Position segregated skips in convenient, accessible
                      locations close to where waste is generated. If skips are too far away or hard to reach,
                      workers will default to the nearest general waste skip. Regularly inspect skips for
                      contamination and address issues immediately through toolbox talks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Designated waste areas:</strong> Establish clearly marked, well-lit waste compound
                      areas with hard standing and appropriate containment. Separate areas for different waste
                      streams, with clear signage (including pictorial guides) and covered storage for materials
                      that degrade when wet (such as plasterboard and insulation).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Toolbox talks:</strong> Regular toolbox talks on waste segregation, the waste
                      hierarchy, and the cost of poor waste management keep awareness high. Include waste
                      management in site inductions so every person on site understands the expectations from
                      day one.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Material storage to prevent damage:</strong> Proper storage is a prevention
                      measure. Store materials off the ground on bearers, protect from weather with sheeting
                      or covered storage, keep away from vehicle routes, and use first-in-first-out stock
                      rotation. Damaged materials are a major source of avoidable waste.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Waste champions:</strong> Appoint a waste champion or waste coordinator for the
                      site who is responsible for monitoring segregation compliance, liaising with the waste
                      contractor, reviewing waste transfer notes, and reporting waste data to the project team.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Subcontractor obligations:</strong> Include waste management requirements in
                      subcontract orders. Make segregation a contractual obligation and enforce it through
                      site rules and inspections. Some principal contractors operate &ldquo;clean as you
                      go&rdquo; policies and back-charge subcontractors for contaminated skips.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Trash2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">The Cost of Poor Waste Management</h3>
                </div>
                <p className="text-white/80 text-sm">
                  WRAP research shows that construction waste typically costs <strong className="text-white">
                  between 2% and 4% of total project value</strong>. This includes not just skip hire and
                  disposal costs, but also the cost of the wasted materials themselves, the labour to handle
                  and manage waste, and the lost productivity from poor site housekeeping. Investing in waste
                  prevention and proper segregation delivers a measurable return on investment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Measuring Waste Performance ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">08</span>
              Measuring Waste Performance
            </h2>
            <div className="space-y-4 text-white">
              <p>
                You cannot manage what you do not measure. Tracking waste generation, segregation rates,
                and diversion from landfill is essential for demonstrating compliance with the waste
                hierarchy, achieving sustainability targets, and driving continuous improvement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Key Performance Indicators (KPIs)</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>m&sup3; per &pound;100,000 of project value:</strong> This is one of the
                      most widely used construction waste KPIs. It normalises waste volume against project
                      size, allowing meaningful comparison between projects of different values. WRAP provides
                      benchmark data for different project types (new build, refurbishment, fit-out, demolition).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Tonnes per 100 m&sup2; of gross internal floor area:</strong> This KPI is
                      commonly used in BREEAM assessments (Wst 01 credit). It normalises waste weight
                      against building size, which is useful for comparing buildings of similar type but
                      different value.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Diversion-from-landfill rate (%):</strong> The percentage of total waste
                      generated that is diverted from landfill through reuse, recycling, or energy recovery.
                      Industry leaders regularly achieve diversion rates above 95%.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Recycling rate (%):</strong> The percentage of total waste that is recycled
                      (not including energy recovery). This is a stricter measure than diversion-from-landfill
                      because it excludes waste that is incinerated for energy.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Benchmarking &amp; Waste Audits</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Benchmarking:</strong> WRAP publishes construction waste benchmarks by project
                      type, allowing organisations to compare their performance against industry norms. Setting
                      targets relative to benchmarks (e.g. &ldquo;achieve waste generation 20% below the WRAP
                      benchmark for new-build offices&rdquo;) provides a meaningful performance driver.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Waste audits:</strong> A waste audit involves physically examining the contents
                      of waste streams to verify that segregation is effective and to identify opportunities
                      for improvement. Audits may be conducted by the site waste champion, the waste contractor,
                      or an independent consultant. Results should be reported to the project team and used to
                      update toolbox talks and site practices.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Data sources:</strong> Waste data is collected from waste transfer notes (WTNs),
                      skip weight tickets, waste contractor reports, and on-site measurement. All waste
                      movements must be accompanied by a WTN under the Environmental Protection (Duty of
                      Care) Regulations 1991. These documents provide the raw data for waste KPI calculation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">BREEAM Waste Credits (Wst 01)</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Resource management plan:</strong> A pre-construction resource management plan
                      (RMP) setting out waste targets, waste streams, management procedures, and roles and
                      responsibilities. This must be in place before construction begins.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Monitoring and reporting:</strong> Regular monitoring of waste generated, segregated,
                      and diverted from landfill throughout the project. Data is reported against the targets set
                      in the RMP.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Performance thresholds:</strong> BREEAM awards credits at different levels depending
                      on how much waste is diverted from landfill and how low the overall waste generation rate
                      is per unit of floor area. Achieving the highest credits requires both high diversion rates
                      and low absolute waste generation.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Post-completion review:</strong> A post-completion review compares actual performance
                      against targets and captures lessons learned for future projects. This closes the loop and
                      ensures that knowledge is carried forward.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Waste Hierarchy Pyramid Diagram ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">&nbsp;</span>
              Waste Hierarchy Pyramid
            </h2>
            <div className="space-y-4 text-white">
              <p className="text-sm text-white/70">
                The pyramid shape illustrates the priority order: the narrowest section at the top
                (Prevention) is the most preferred option, and the widest section at the base (Disposal)
                is the least preferred.
              </p>

              {/* Pyramid diagram */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-lg">
                <div className="flex flex-col items-center space-y-2">
                  {wasteHierarchyLevels.map((level) => (
                    <div key={level.level} className={`${level.width} transition-all`}>
                      <div
                        className={`${level.bgClass} border ${level.borderClass} p-3 sm:p-4 rounded-lg`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-7 h-7 rounded-full ${level.bgClass} border ${level.borderClass} flex items-center justify-center ${level.textClass} text-xs font-bold flex-shrink-0`}
                          >
                            {level.level}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`${level.textClass} font-semibold text-sm`}>
                              {level.title}
                            </p>
                            <p className="text-white/70 text-xs mt-0.5 hidden sm:block">
                              {level.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-white/50 px-4">
                  <span>Most preferred</span>
                  <span>Least preferred</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Site Waste Segregation Guide Diagram ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">&nbsp;</span>
              Site Waste Segregation Guide
            </h2>
            <div className="space-y-4 text-white">
              <p className="text-sm text-white/70">
                Colour-coded skip systems vary between sites, but the following is a common convention
                used across UK construction. Always check your specific site rules.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-lg">
                <h3 className="text-emerald-300 font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  Colour-Coded Skips
                </h3>
                <div className="space-y-3">
                  {skipColourGuide.map((skip) => (
                    <div
                      key={skip.colour}
                      className={`${skip.bgClass} border ${skip.borderClass} p-3 sm:p-4 rounded-lg`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded-sm ${skip.dotClass} flex-shrink-0 mt-0.5`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`${skip.textClass} font-semibold text-sm`}>
                              {skip.colour}
                            </span>
                            <span className="text-white/50 text-xs">&mdash;</span>
                            <span className="text-white text-sm font-medium">
                              {skip.materials}
                            </span>
                          </div>
                          <p className="text-white/60 text-xs">{skip.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">&nbsp;</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>waste hierarchy</strong> is a legal requirement under the Waste (England
                      and Wales) Regulations 2011, transposing the EU Waste Framework Directive.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The five levels run from <strong>Prevention</strong> (most preferred) through Preparing
                      for Reuse, Recycling, and Other Recovery to <strong>Disposal</strong> (least preferred).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Prevention</strong> delivers the greatest environmental and economic benefit
                      &mdash; design out waste, order accurately, use BIM, and store materials properly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>On-site segregation</strong> is essential for effective recycling &mdash; mixed
                      waste is harder, more expensive, and often impossible to recycle.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Plasterboard</strong> must always be segregated due to the H&#8322;S gas risk
                      when co-disposed with biodegradable waste.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Landfill tax</strong> at ~&pound;103.70/tonne (standard rate) makes disposal
                      the most expensive option. The escalator increases this annually.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Measure performance using KPIs such as <strong>m&sup3; per &pound;100k</strong> and
                      <strong> tonnes per 100 m&sup2;</strong>, and benchmark against WRAP data.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>BREEAM Wst 01</strong> credits require a resource management plan, waste
                      monitoring, and demonstrated performance against targets.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">&nbsp;</span>
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
            title="The Waste Hierarchy Quiz"
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
            <Link to="../environmental-sustainability-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2-section-2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnvironmentalSustainabilityModule2Section1;
