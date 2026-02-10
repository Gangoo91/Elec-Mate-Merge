import { ArrowLeft, Leaf, CheckCircle, AlertTriangle, BarChart3, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "embodied-vs-operational",
    question: "What is the key difference between embodied carbon and operational carbon?",
    options: [
      "Embodied carbon is from manufacturing and construction; operational carbon is from building energy use",
      "Embodied carbon is always higher than operational carbon",
      "Operational carbon only applies to commercial buildings",
      "There is no meaningful difference between the two"
    ],
    correctIndex: 0,
    explanation: "Embodied carbon refers to the greenhouse gas emissions associated with the extraction, manufacture, transport, assembly, maintenance, and end-of-life disposal of building materials and components. Operational carbon refers to the emissions from the energy consumed during a building's use — heating, cooling, lighting, ventilation, and plug loads. Together they make up the whole life carbon of a building, but they are measured and reduced through quite different strategies."
  },
  {
    id: "low-carbon-materials",
    question: "Why is cross-laminated timber (CLT) considered a low carbon structural material?",
    options: [
      "It is cheaper than steel and concrete",
      "It stores carbon absorbed during tree growth and has lower manufacturing emissions",
      "It does not require any energy to manufacture",
      "It is only used in temporary structures"
    ],
    correctIndex: 1,
    explanation: "Cross-laminated timber (CLT) is considered low carbon because trees absorb CO2 from the atmosphere as they grow, and this carbon remains locked within the timber for the life of the building. This is known as biogenic carbon sequestration. Additionally, the manufacturing process for CLT requires significantly less energy than producing steel or concrete, resulting in lower embodied carbon. When the timber is sourced from sustainably managed forests (FSC or PEFC certified), new trees are planted to continue the cycle of carbon absorption."
  },
  {
    id: "carbon-offsetting-limitation",
    question: "When should carbon offsetting be used according to best practice?",
    options: [
      "As the primary method of reducing a company's carbon footprint",
      "Instead of making changes to operations or supply chains",
      "Only for residual emissions that cannot be eliminated through other reduction measures",
      "Offsetting is never acceptable under any circumstances"
    ],
    correctIndex: 2,
    explanation: "Best practice — including guidance from PAS 2080 and the Science Based Targets initiative — is that carbon offsetting should only be used for residual emissions that remain after all feasible reduction measures have been implemented. The carbon reduction hierarchy prioritises avoiding emissions first, then reducing them, then substituting with lower-carbon alternatives, before finally offsetting what remains. Using offsets as a primary strategy without first reducing emissions is considered greenwashing and does not contribute to genuine decarbonisation."
  }
];

const faqs = [
  {
    question: "What is the difference between whole life carbon and upfront carbon?",
    answer: "Whole life carbon covers every emission across a building's entire lifecycle — from raw material extraction through construction, use, maintenance, and eventual demolition and disposal (RICS Whole Life Carbon stages A1–A5, B1–B7, C1–C4, and module D). Upfront carbon is a subset of whole life carbon that covers only the production and construction stages (A1–A5) — the emissions that occur before the building is occupied. Upfront carbon is particularly important because these emissions are 'locked in' at the point of construction and cannot be reduced afterwards. For a typical new building, upfront embodied carbon can account for 50–70% of total whole life carbon over a 60-year lifespan."
  },
  {
    question: "How do Building Regulations Part L relate to carbon reduction?",
    answer: "Approved Document Part L of the Building Regulations sets standards for the conservation of fuel and power in buildings. Part L limits the amount of energy a building can consume for heating, cooling, hot water, and lighting through requirements for fabric insulation, air tightness, efficient building services, and the use of renewables. The 2021 uplift to Part L introduced significantly tighter standards — reducing CO2 emissions from new homes by approximately 31% compared to the previous standard. Part L uses a target emission rate (TER) methodology, requiring the calculated dwelling/building emission rate to be below the target. It is a key regulatory mechanism for reducing operational carbon in the UK built environment."
  },
  {
    question: "What is PAS 2080 and who needs to follow it?",
    answer: "PAS 2080 is a publicly available specification published by the British Standards Institution (BSI) for managing carbon in buildings and infrastructure. Originally focused on infrastructure, the 2023 revision expanded its scope to cover buildings as well. PAS 2080 provides a framework for the whole value chain — asset owners, designers, contractors, and product suppliers — to collaborate on reducing whole life carbon. While PAS 2080 is not legally mandatory, it is increasingly required by public sector clients, major infrastructure programmes (such as Highways England and Network Rail), and is referenced in planning policies. Organisations seeking to demonstrate leadership in carbon management commonly adopt PAS 2080 as their carbon management standard."
  },
  {
    question: "Are carbon offsets genuinely effective at reducing climate impact?",
    answer: "The effectiveness of carbon offsets varies enormously depending on the type, quality, and verification of the offset project. High-quality offsets — verified to standards such as the Verified Carbon Standard (VCS), Gold Standard, or Woodland Carbon Code — can deliver genuine, measurable emissions reductions or removals. However, many offset schemes have been criticised for overestimating their impact, lacking additionality (the emissions reduction would have happened anyway), or suffering from permanence issues (e.g., trees being harvested or burned after planting). Best practice is to prioritise direct emissions reduction first and only offset residual emissions using verified, high-quality credits. Technology-based removal solutions such as direct air capture are considered more reliable than nature-based offsets, but are currently more expensive."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the approximate average carbon footprint per person per year in the UK?",
    options: [
      "1.5 tonnes CO2e",
      "3.0 tonnes CO2e",
      "5.5 tonnes CO2e",
      "10.0 tonnes CO2e"
    ],
    correctAnswer: 2,
    explanation: "The average carbon footprint per person in the UK is approximately 5.5 tonnes of CO2 equivalent (CO2e) per year. This figure includes direct emissions from energy use and transport, as well as indirect emissions from goods and services consumed. The global average is approximately 4.7 tonnes, so the UK figure is above the world average. To meet the Paris Agreement targets, individual carbon footprints need to fall to approximately 2.3 tonnes CO2e per person by 2030."
  },
  {
    id: 2,
    question: "Which RICS Whole Life Carbon stages represent 'upfront carbon' in a building?",
    options: [
      "B1–B7 (use stage)",
      "C1–C4 (end of life)",
      "A1–A5 (product and construction)",
      "Module D (beyond the system boundary)"
    ],
    correctAnswer: 2,
    explanation: "Upfront carbon corresponds to RICS Whole Life Carbon stages A1–A5. Stages A1–A3 cover the product stage (raw material extraction, transport to the factory, and manufacturing), while stages A4–A5 cover the construction process stage (transport to site and construction/installation activities). These emissions are 'locked in' at the point of construction and cannot be reduced after the building is complete, which is why reducing upfront embodied carbon is a critical priority."
  },
  {
    id: 3,
    question: "What is the primary benefit of using GGBS as a partial cement replacement in concrete?",
    options: [
      "It makes the concrete set faster",
      "It significantly reduces the embodied carbon of the concrete mix",
      "It makes the concrete lighter in weight",
      "It eliminates the need for reinforcement"
    ],
    correctAnswer: 1,
    explanation: "Ground Granulated Blast-furnace Slag (GGBS) is a by-product of the steel industry that can replace up to 70–80% of the Portland cement in concrete. Since Portland cement production is responsible for approximately 8% of global CO2 emissions, replacing a significant proportion with GGBS dramatically reduces the embodied carbon of the concrete mix — typically by 40–60%. GGBS also improves the durability and chemical resistance of the concrete, though it does slow the early strength gain."
  },
  {
    id: 4,
    question: "Which approach should be prioritised FIRST in the carbon reduction hierarchy?",
    options: [
      "Offset residual emissions through verified carbon credits",
      "Substitute materials with lower-carbon alternatives",
      "Build efficiently to reduce material quantities",
      "Avoid or eliminate the need for construction entirely"
    ],
    correctAnswer: 3,
    explanation: "The carbon reduction hierarchy follows the principle of avoid, reduce, substitute, then offset. The first and most impactful step is to question whether the construction or activity is necessary at all — can the need be met by refurbishing an existing building, repurposing existing infrastructure, or eliminating the requirement? Only after exhausting avoidance should you move to reducing material quantities through efficient design, then substituting with lower-carbon materials, and finally offsetting any residual emissions that remain."
  },
  {
    id: 5,
    question: "How does passive design help reduce operational carbon in buildings?",
    options: [
      "By using more mechanical heating and cooling systems",
      "By maximising the use of natural light, ventilation, and thermal mass to reduce energy demand",
      "By installing larger boilers and air conditioning units",
      "By increasing the glazed area on all elevations equally"
    ],
    correctAnswer: 1,
    explanation: "Passive design reduces operational carbon by working with natural environmental conditions to minimise the need for mechanical heating, cooling, and lighting. Key strategies include optimising building orientation for solar gain, using thermal mass to store and release heat, designing for natural cross-ventilation, maximising natural daylight to reduce artificial lighting, and specifying high levels of insulation and air tightness. By reducing the energy demand of the building at the design stage, passive design delivers lower operational carbon throughout the building's entire lifespan."
  },
  {
    id: 6,
    question: "What is 'modal shift' in the context of carbon reduction in transport and logistics?",
    options: [
      "Changing from diesel to electric vehicles only",
      "Moving freight from road to rail or water transport to reduce emissions per tonne-kilometre",
      "Using larger lorries to carry more goods per journey",
      "Switching all deliveries to overnight schedules"
    ],
    correctAnswer: 1,
    explanation: "Modal shift refers to moving freight from higher-emission transport modes (typically road) to lower-emission modes (typically rail or water). Rail freight produces approximately 75% fewer CO2 emissions per tonne-kilometre than road freight, making it a highly effective decarbonisation strategy for long-distance and bulk material transport. The UK government's Transport Decarbonisation Plan supports modal shift through investment in rail freight capacity and incentives for businesses to use rail instead of road for suitable loads."
  },
  {
    id: 7,
    question: "Which carbon verification standard is specifically designed for UK woodland carbon projects?",
    options: [
      "Verified Carbon Standard (VCS)",
      "Gold Standard",
      "Woodland Carbon Code",
      "CDP Climate Disclosure"
    ],
    correctAnswer: 2,
    explanation: "The Woodland Carbon Code is the UK's quality assurance standard for woodland creation projects that sequester carbon. Managed by Scottish Forestry on behalf of the UK government, it provides a robust, transparent framework for measuring, verifying, and reporting the carbon sequestered by new woodland. Projects registered under the Woodland Carbon Code are independently validated and verified, and the resulting Woodland Carbon Units can be used by UK organisations to offset their residual emissions. It is the recommended standard for UK-based nature-based carbon offset projects."
  },
  {
    id: 8,
    question: "What does SECR require qualifying UK companies to report?",
    options: [
      "Only their renewable energy generation",
      "Their energy use, associated greenhouse gas emissions, and at least one intensity ratio",
      "Only their Scope 3 supply chain emissions",
      "The carbon footprint of every individual employee"
    ],
    correctAnswer: 1,
    explanation: "The Streamlined Energy and Carbon Reporting (SECR) framework requires qualifying UK companies (quoted companies, large unquoted companies, and large LLPs meeting certain thresholds) to report their UK energy use, associated greenhouse gas emissions (Scope 1 and Scope 2 at minimum), and at least one intensity ratio (such as tonnes CO2e per £million turnover or per employee). SECR reporting must be included within the company's annual directors' report. It replaced the CRC Energy Efficiency Scheme and is designed to increase transparency and encourage organisations to implement energy efficiency measures."
  }
];

export default function EnvironmentalSustainabilityModule3Section2() {
  useSEO({
    title: "Reducing Your Carbon Footprint | Environmental & Sustainability Module 3.2",
    description: "Embodied and operational carbon, carbon reduction in design, low carbon materials, transport emissions, carbon offsetting, and measuring and reporting carbon — PAS 2080, SECR, science-based targets.",
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
            <Link to="../environmental-sustainability-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Leaf className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reducing Your Carbon Footprint
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Embodied and operational carbon, low carbon design and materials, transport emissions, carbon offsetting, and how to measure and report your organisation&rsquo;s carbon footprint
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>UK average:</strong> ~5.5 tonnes CO2e per person per year</li>
              <li><strong>Embodied carbon:</strong> Locked in at construction &mdash; cannot be reduced later</li>
              <li><strong>Hierarchy:</strong> Avoid &rarr; Reduce &rarr; Substitute &rarr; Offset</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Cement:</strong> ~8% of global CO2 emissions</li>
              <li><strong>PAS 2080:</strong> UK standard for carbon management in construction</li>
              <li><strong>SECR:</strong> Mandatory carbon reporting for qualifying UK companies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define carbon footprint and explain carbon dioxide equivalent (CO2e)",
              "Distinguish between embodied carbon, operational carbon, and whole life carbon",
              "Describe how building design decisions affect carbon emissions",
              "Identify low carbon material alternatives for common construction products",
              "Explain strategies for reducing carbon in transport and logistics",
              "Understand the role and limitations of carbon offsetting",
              "Describe the key frameworks for measuring and reporting carbon — PAS 2080, SECR, CDP"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Carbon Footprint? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Is a Carbon Footprint?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>carbon footprint</strong> is the total amount of greenhouse gases (GHGs)
                produced directly and indirectly by an individual, organisation, event, product, or
                activity. It is measured in <strong>carbon dioxide equivalent (CO2e)</strong>, which
                expresses the impact of all greenhouse gases &mdash; including methane (CH4), nitrous
                oxide (N2O), and fluorinated gases &mdash; as a single figure relative to the warming
                potential of carbon dioxide.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">CO2 Equivalent (CO2e):</strong> Different greenhouse
                  gases have different <strong>global warming potentials (GWP)</strong>. For example,
                  methane is approximately 28 times more potent than CO2 over a 100-year period, while
                  nitrous oxide is approximately 265 times more potent. CO2e converts all GHG emissions
                  into a single comparable unit by multiplying the mass of each gas by its GWP factor.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Personal vs Organisational Carbon Footprints</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Personal footprint:</strong> Covers an individual&rsquo;s direct emissions (home energy, personal transport) and indirect emissions (food, goods, services consumed). The UK average is approximately <strong className="text-white">5.5 tonnes CO2e per person per year</strong> &mdash; above the global average of ~4.7 tonnes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Organisational footprint:</strong> Covers all emissions from a company&rsquo;s operations, categorised into Scope 1 (direct emissions from owned sources), Scope 2 (indirect emissions from purchased energy), and Scope 3 (all other indirect emissions in the value chain)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">UK Carbon Context</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The UK has a legally binding target to reach <strong className="text-white">net zero by 2050</strong> under the Climate Change Act 2008 (as amended)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The built environment accounts for approximately <strong className="text-white">25% of the UK&rsquo;s total carbon emissions</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>To meet Paris Agreement targets, individual footprints need to fall to approximately <strong className="text-white">2.3 tonnes CO2e by 2030</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Construction and demolition generates approximately <strong className="text-white">60% of all UK waste</strong> by weight</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">On Site:</strong> As an electrical professional,
                  your work directly affects a building&rsquo;s operational carbon through the efficiency
                  of lighting, heating controls, and building services installations. Your material
                  choices and waste management also affect embodied carbon. Understanding your role in
                  the carbon picture is the first step to reducing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Embodied Carbon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Embodied Carbon
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Embodied carbon</strong> refers to the greenhouse gas emissions associated with the
                non-operational phases of a building&rsquo;s lifecycle &mdash; the extraction, manufacture,
                transport, construction, maintenance, replacement, and eventual demolition and disposal of
                all materials and components. Unlike operational carbon, embodied carbon is <strong>
                &ldquo;locked in&rdquo; at the point of construction</strong> and cannot be reduced
                afterwards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Embodied vs Operational Carbon</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">EC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Embodied Carbon</p>
                      <p className="text-sm text-white/70">Emissions from making, building, maintaining, and demolishing &mdash; fixed at construction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-400">OC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Operational Carbon</p>
                      <p className="text-sm text-white/70">Emissions from energy used during occupation &mdash; can be reduced over time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-purple-400">WLC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Whole Life Carbon = Embodied + Operational</p>
                      <p className="text-sm text-white/70">Total emissions across the entire building lifecycle</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">RICS Whole Life Carbon Methodology</p>
                <p className="text-sm text-white/80 mb-3">
                  The Royal Institution of Chartered Surveyors (RICS) Professional Statement on Whole Life
                  Carbon Assessment defines the standard methodology for measuring building carbon across
                  lifecycle stages:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">A1&ndash;A3 (Product stage):</strong> Raw material extraction, transport to factory, manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">A4&ndash;A5 (Construction process):</strong> Transport to site, construction and installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">B1&ndash;B7 (Use stage):</strong> Maintenance, repair, replacement, refurbishment, and operational energy/water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">C1&ndash;C4 (End of life):</strong> Deconstruction, transport, waste processing, disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Module D (Beyond system boundary):</strong> Potential benefits from reuse, recycling, or energy recovery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Carbon Hotspots in Buildings</p>
                <p className="text-sm text-white/80 mb-3">
                  The following elements typically account for the largest share of embodied carbon in a building:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Structure (substructure and superstructure):</strong> 50&ndash;70% of upfront embodied carbon &mdash; foundations, frame, floors, walls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fa&ccedil;ade and envelope:</strong> 15&ndash;25% &mdash; cladding, glazing, roofing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Building services (MEP):</strong> 10&ndash;20% &mdash; heating, ventilation, electrical, plumbing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fit-out and finishes:</strong> 5&ndash;15% &mdash; floor coverings, ceilings, partitions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Critical Point</p>
                </div>
                <p className="text-sm text-white/80">
                  As buildings become more energy efficient (reducing operational carbon), the
                  <strong className="text-white"> proportion of total lifecycle emissions from embodied
                  carbon increases</strong>. For a modern, highly insulated building, embodied carbon
                  can represent <strong className="text-white">50&ndash;70% of whole life carbon</strong>
                  over a 60-year lifespan. This makes reducing embodied carbon an increasingly urgent
                  priority.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Whole Life Carbon Breakdown Diagram */}
        <section className="mb-10">
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-6 sm:p-8">
            <p className="text-sm font-medium text-emerald-400 mb-6 text-center">
              Whole Life Carbon Breakdown &mdash; Lifecycle Stages A&ndash;D
            </p>

            {/* Stage A: Embodied (Upfront) */}
            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Upfront Carbon (Embodied)</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-emerald-300">A1&ndash;A3</p>
                  <p className="text-[10px] sm:text-xs text-white/70 mt-1">Product Stage</p>
                  <p className="text-[9px] sm:text-[10px] text-white/50 mt-0.5">Extraction &bull; Transport &bull; Manufacturing</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/30 text-lg hidden sm:block">&rarr;</span>
                  <span className="text-white/30 text-lg sm:hidden">&darr;</span>
                </div>
                <div className="flex-1 bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-emerald-300">A4&ndash;A5</p>
                  <p className="text-[10px] sm:text-xs text-white/70 mt-1">Construction Process</p>
                  <p className="text-[9px] sm:text-[10px] text-white/50 mt-0.5">Transport to site &bull; Installation</p>
                </div>
              </div>
            </div>

            {/* Stage B: Use */}
            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Use Stage</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-blue-500/15 border border-blue-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-blue-300">B1&ndash;B5</p>
                  <p className="text-[10px] sm:text-xs text-white/70 mt-1">Embodied (Use)</p>
                  <p className="text-[9px] sm:text-[10px] text-white/50 mt-0.5">Maintenance &bull; Repair &bull; Replacement &bull; Refurbishment</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-white/30 text-lg hidden sm:block">+</span>
                  <span className="text-white/30 text-lg sm:hidden">+</span>
                </div>
                <div className="flex-1 bg-blue-500/15 border border-blue-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-blue-300">B6&ndash;B7</p>
                  <p className="text-[10px] sm:text-xs text-white/70 mt-1">Operational</p>
                  <p className="text-[9px] sm:text-[10px] text-white/50 mt-0.5">Energy use &bull; Water use</p>
                </div>
              </div>
            </div>

            {/* Stage C: End of Life */}
            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">End of Life</p>
              <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-amber-300">C1&ndash;C4</p>
                <p className="text-[10px] sm:text-xs text-white/70 mt-1">Deconstruction &bull; Transport &bull; Waste Processing &bull; Disposal</p>
              </div>
            </div>

            {/* Module D: Beyond */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Beyond System Boundary</p>
              <div className="bg-purple-500/15 border border-purple-500/30 rounded-lg p-3 text-center border-dashed">
                <p className="text-xs font-bold text-purple-300">Module D</p>
                <p className="text-[10px] sm:text-xs text-white/70 mt-1">Potential benefits from reuse, recycling, or energy recovery</p>
                <p className="text-[9px] sm:text-[10px] text-white/50 mt-0.5">(Reported separately &mdash; not included in WLC total)</p>
              </div>
            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
              <p className="text-xs sm:text-sm text-white/80">
                <strong className="text-emerald-400">Whole Life Carbon</strong> = A1&ndash;A5 + B1&ndash;B7 + C1&ndash;C4
                <span className="text-white/50"> &nbsp;|&nbsp; Module D reported separately</span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Operational Carbon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Operational Carbon
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Operational carbon</strong> refers to the greenhouse gas emissions produced by
                the energy consumed during a building&rsquo;s occupation and use. This includes energy
                for <strong>heating, cooling, hot water, lighting, ventilation, and electrical
                equipment</strong> (plug loads). Reducing operational carbon has been the primary focus
                of UK building regulations for decades, and significant progress has been made through
                increasingly stringent energy efficiency standards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Part L Building Regulations</p>
                <p className="text-sm text-white/80 mb-3">
                  Approved Document Part L of the Building Regulations is the primary regulatory
                  mechanism for controlling operational carbon in England and Wales:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Part L1A/L2A:</strong> New dwellings and new non-domestic buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Part L1B/L2B:</strong> Existing dwellings and existing non-domestic buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">2021 uplift:</strong> Reduced CO2 emissions from new homes by ~31% compared to the previous standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Future Homes Standard (expected 2025):</strong> Will require 75&ndash;80% reduction compared to 2013 Part L</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Energy Performance Certificates (EPCs)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Required for all buildings when constructed, sold, or let</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Rated A (most efficient) to G (least efficient)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Minimum Energy Efficiency Standards (MEES): rented properties must achieve at least EPC E</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Government ambition to raise minimum to EPC C for rented properties</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Nearly Zero Energy Buildings (NZEB)</p>
                <p className="text-sm text-white/80">
                  The Energy Performance of Buildings Regulations require that all new buildings have
                  &ldquo;nearly zero&rdquo; energy performance. An NZEB has very high energy performance,
                  with the nearly zero or very low amount of energy required covered to a very significant
                  extent by energy from renewable sources produced on-site or nearby. The UK&rsquo;s approach
                  to NZEB is delivered through Part L and the Future Homes/Buildings Standards, which will
                  effectively require all new buildings to be NZEB from 2025 onwards.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">For Electricians:</strong> Your installations
                  directly impact a building&rsquo;s operational carbon. Specifying energy-efficient
                  lighting (LED), efficient heating controls, smart building management systems, and
                  renewable energy systems (solar PV, battery storage) all contribute to reducing
                  operational carbon. Understanding Part L requirements is essential for compliance
                  and for advising clients on energy efficiency improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Carbon Reduction in Design */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Carbon Reduction in Design
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The design stage offers the greatest opportunity to reduce a building&rsquo;s whole life
                carbon. Decisions made during early design &mdash; structural system, material selection,
                building form, and orientation &mdash; have the <strong>largest impact on embodied carbon
                and set the baseline for operational energy performance</strong> for the entire life of
                the building.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Material Selection</p>
                <p className="text-sm text-white/80 mb-3">
                  The choice of structural material has a profound impact on embodied carbon:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Timber:</strong> Lowest embodied carbon of the three main structural materials. Stores carbon absorbed during growth (biogenic carbon sequestration). CLT and glulam enable timber to be used for multi-storey structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Steel:</strong> Higher embodied carbon than timber, but highly recyclable. Using recycled steel (electric arc furnace) reduces embodied carbon by ~60% compared to virgin steel (blast furnace)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Concrete:</strong> Portland cement production generates ~8% of global CO2 emissions. Embodied carbon can be significantly reduced through cement replacement (GGBS, PFA) and mix optimisation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Structural Optimisation</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Right-sizing:</strong> Designing structural elements to the correct size rather than over-specifying. Studies suggest 30&ndash;50% of steel in buildings is unnecessary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Efficient floor grids:</strong> Optimising column spacing and floor spans to minimise material use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Lean foundations:</strong> Ground investigation to avoid over-engineering foundations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Passive Design Strategies</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Building orientation:</strong> Orienting the main glazing south to maximise winter solar gain and reduce heating demand. Minimising west-facing glazing to reduce summer overheating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Thermal mass:</strong> Using dense materials (concrete, masonry, earth) to absorb heat during the day and release it at night, smoothing temperature fluctuations and reducing heating/cooling demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Natural ventilation:</strong> Designing for cross-ventilation and stack effect to reduce or eliminate the need for mechanical cooling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Daylighting:</strong> Maximising natural daylight penetration to reduce artificial lighting demand (and associated electrical load)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Fabric first:</strong> Prioritising insulation, air tightness, and thermal bridging reduction over mechanical systems</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Design Principle:</strong> The most effective
                  approach is &ldquo;fabric first&rdquo; &mdash; getting the building envelope right
                  through excellent insulation, high-performance glazing, air tightness, and
                  elimination of thermal bridges. This reduces the energy demand that mechanical and
                  electrical systems need to meet, resulting in smaller, less expensive, and less
                  carbon-intensive building services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Low Carbon Materials */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Low Carbon Materials
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting lower-carbon alternatives to conventional construction materials is one of the
                most effective ways to reduce embodied carbon. The following materials represent some of
                the most impactful substitutions available to the UK construction industry.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Cross-Laminated Timber (CLT)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Engineered wood product made from layers of timber boards glued at right angles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Carbon benefit:</strong> Stores biogenic carbon (approximately 1 tonne CO2 per cubic metre of timber) and has low manufacturing emissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can be used for walls, floors, and roofs in buildings up to 18 storeys (with appropriate fire engineering)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be from <strong className="text-white">sustainably managed forests</strong> (FSC or PEFC certified) to ensure carbon benefits are genuine</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Recycled Steel</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Steel produced in an <strong className="text-white">electric arc furnace (EAF)</strong> from recycled scrap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Carbon benefit:</strong> ~60% lower embodied carbon than virgin steel from a blast furnace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Steel is infinitely recyclable without loss of quality &mdash; UK structural steel sections contain ~95% recycled content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Further reductions possible through reuse of structural steel sections from demolition</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">GGBS and PFA Cement Replacements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">GGBS (Ground Granulated Blast-furnace Slag):</strong> By-product of steel manufacturing that can replace up to 70&ndash;80% of Portland cement in concrete, reducing embodied carbon by 40&ndash;60%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">PFA (Pulverised Fuel Ash / fly ash):</strong> By-product of coal-fired power stations that can replace up to 30&ndash;40% of cement. Supply declining as coal power stations close</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Both improve long-term durability and chemical resistance of the concrete</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Bio-Based Insulation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Sheep&rsquo;s wool:</strong> Natural insulation with good thermal and acoustic performance, moisture buffering, and carbon sequestration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Hemp fibre and hempcrete:</strong> Rapidly renewable crop that sequesters carbon during growth. Hempcrete (hemp mixed with lime) provides insulation, thermal mass, and moisture management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Wood fibre:</strong> Manufactured from sustainably sourced timber offcuts. Good thermal performance and hygroscopic buffering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Recycled cellulose:</strong> Made from recycled newspaper, blown into cavities. Very low embodied carbon</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Locally Sourced Materials</p>
                  <p className="text-sm text-white/80">
                    Sourcing materials locally reduces transport-related carbon emissions (A4 stage).
                    Using local stone, brick, timber, or aggregates not only reduces transport miles but
                    also supports local economies and can create buildings that respond to their regional
                    context. Specifying materials from within <strong className="text-white">50&ndash;100
                    miles of the site</strong> is a common target for reducing transport carbon in
                    sustainable projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Transport & Logistics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Transport &amp; Logistics
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Transport and logistics contribute significantly to the carbon footprint of construction
                projects. Materials must be transported from quarries, factories, and distribution centres
                to site, while operatives commute daily. <strong>Construction transport accounts for
                approximately 6&ndash;8% of all UK road freight</strong>, making it a meaningful area
                for carbon reduction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Delivery Consolidation</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Consolidation centres:</strong> Multiple suppliers deliver to a central hub near the site, and goods are consolidated into full loads for delivery &mdash; reducing the number of vehicle movements by up to 70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Just-in-time delivery:</strong> Scheduling deliveries to arrive when needed, reducing double handling, storage requirements, and the risk of damage and waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Return load utilisation:</strong> Using vehicles returning from deliveries to collect waste or materials from other suppliers, rather than running empty</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Route Planning and Fleet Efficiency</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Optimised routing software to minimise distance travelled and avoid congestion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Driver training in eco-driving techniques (smooth acceleration, maintaining tyre pressures, reducing idling)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Telematics systems to monitor fuel consumption, idling time, and route compliance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Electric and Hybrid Vehicles</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Electric vans:</strong> Increasingly viable for electricians and other trades &mdash; zero tailpipe emissions, lower running costs, and sufficient range for most daily use patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Hybrid and electric HGVs:</strong> Emerging technology for heavier construction vehicles &mdash; battery electric, hydrogen fuel cell, and biomethane options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Electric plant:</strong> Battery-powered tools, telehandlers, and excavators are now available, eliminating on-site diesel emissions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Modal Shift</p>
                <div className="flex items-start gap-2 mb-2">
                  <Truck className="h-5 w-5 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Rail freight</strong> produces approximately
                    <strong className="text-white"> 75% fewer CO2 emissions per tonne-kilometre</strong> than
                    road freight. For bulk materials such as aggregates, steel, and timber travelling long
                    distances, shifting from road to rail can deliver significant carbon savings. The UK
                    government&rsquo;s Transport Decarbonisation Plan supports investment in rail freight
                    capacity.
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1 ml-7">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Water transport (canals, coastal shipping) offers even lower emissions per tonne-km for suitable routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cargo bikes and electric last-mile delivery for smaller items in urban areas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Local Sourcing:</strong> One of the simplest and most
                  effective strategies is to source materials locally, reducing transport distance. Every
                  kilometre saved reduces carbon, cost, and the risk of damage in transit. For aggregates,
                  concrete, and brickwork, specifying products from local quarries and factories (within
                  50&ndash;100 miles) can significantly reduce the A4 transport carbon of a project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Carbon Offsetting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Carbon Offsetting
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Carbon offsetting</strong> involves compensating for greenhouse gas emissions by
                funding an equivalent reduction or removal of CO2 elsewhere. While offsetting has a role
                in achieving net zero, it is <strong>not a substitute for direct emissions reduction</strong>
                and should only be used for <strong>residual emissions</strong> that cannot be eliminated
                through other measures.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Limitations of Offsetting</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Not a substitute:</strong> Offsetting without first reducing emissions is considered greenwashing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Additionality risk:</strong> Some offset projects would have happened regardless of funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Permanence risk:</strong> Nature-based offsets (e.g., tree planting) can be reversed by fire, disease, or land use change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Double counting:</strong> The same emissions reduction claimed by both the offset project and the buyer</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Verified Carbon Standards</p>
                <p className="text-sm text-white/80 mb-3">
                  To ensure offset quality, use only credits verified under recognised standards:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Verified Carbon Standard (VCS):</strong> The world&rsquo;s most widely used voluntary carbon offset standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Gold Standard:</strong> Established by WWF, requires co-benefits for sustainable development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Woodland Carbon Code:</strong> UK-specific standard for woodland creation carbon projects, managed by Scottish Forestry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Peatland Code:</strong> UK standard for peatland restoration projects that reduce emissions from degraded peatlands</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Tree Planting vs Technology Solutions</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Nature-Based Solutions</p>
                      <p className="text-sm text-white/70">Tree planting, peatland restoration, soil carbon. Lower cost but permanence and verification challenges. Trees take decades to reach full sequestration potential</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Technology-Based Removal</p>
                      <p className="text-sm text-white/70">Direct air capture (DAC), bioenergy with carbon capture and storage (BECCS). More reliable and permanent, but significantly more expensive (currently &pound;200&ndash;600+ per tonne)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Best Practice:</strong> Follow the carbon reduction
                  hierarchy &mdash; <strong>avoid, reduce, substitute, then offset</strong>. Only offset
                  residual emissions that remain after all feasible reduction measures have been implemented.
                  When offsetting, use verified credits from recognised standards, and prefer projects with
                  high additionality and permanence guarantees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Carbon Reduction Strategies Hierarchy Diagram */}
        <section className="mb-10">
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-6 sm:p-8">
            <p className="text-sm font-medium text-emerald-400 mb-6 text-center">
              Carbon Reduction Strategies Hierarchy
            </p>

            <div className="max-w-lg mx-auto space-y-3">
              {/* Level 1: Avoid */}
              <div className="relative">
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-xs font-bold text-emerald-300">1</span>
                    <p className="text-sm font-bold text-emerald-300">AVOID</p>
                  </div>
                  <p className="text-xs text-white/70">Eliminate the need entirely &mdash; refurbish instead of demolish, challenge the brief, reduce scope</p>
                  <p className="text-[10px] text-emerald-400/60 mt-1 font-semibold">HIGHEST IMPACT</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-[2px] h-4 bg-white/20" />
              </div>

              {/* Level 2: Reduce */}
              <div className="relative">
                <div className="bg-blue-500/15 border border-blue-500/35 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center text-xs font-bold text-blue-300">2</span>
                    <p className="text-sm font-bold text-blue-300">REDUCE</p>
                  </div>
                  <p className="text-xs text-white/70">Use less material &mdash; structural optimisation, lean design, efficient building form</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-[2px] h-4 bg-white/20" />
              </div>

              {/* Level 3: Substitute */}
              <div className="relative">
                <div className="bg-purple-500/15 border border-purple-500/35 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-400/50 flex items-center justify-center text-xs font-bold text-purple-300">3</span>
                    <p className="text-sm font-bold text-purple-300">SUBSTITUTE</p>
                  </div>
                  <p className="text-xs text-white/70">Replace with lower-carbon materials &mdash; CLT, recycled steel, GGBS concrete, bio-based insulation</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-[2px] h-4 bg-white/20" />
              </div>

              {/* Level 4: Offset */}
              <div className="relative">
                <div className="bg-amber-500/15 border border-amber-500/35 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-amber-500/30 border border-amber-400/50 flex items-center justify-center text-xs font-bold text-amber-300">4</span>
                    <p className="text-sm font-bold text-amber-300">OFFSET</p>
                  </div>
                  <p className="text-xs text-white/70">Compensate for residual emissions only &mdash; verified credits, nature-based or technology-based removal</p>
                  <p className="text-[10px] text-amber-400/60 mt-1 font-semibold">LAST RESORT</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
              <p className="text-xs sm:text-sm text-white/80">
                <strong className="text-emerald-400">Always work top-down</strong> &mdash; exhaust each level
                before moving to the next. Offsetting without first avoiding, reducing, and substituting is
                not genuine decarbonisation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Measuring & Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Measuring &amp; Reporting
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective carbon management requires robust measurement and transparent reporting. The
                principle of &ldquo;what gets measured gets managed&rdquo; is central to driving carbon
                reduction in the construction industry. Several key frameworks, standards, and regulatory
                requirements govern how organisations measure and report their carbon emissions in the UK.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">PAS 2080 &mdash; Carbon Management in Infrastructure and Buildings</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Published by BSI &mdash; provides a whole value chain approach to carbon management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Applies to asset owners/managers, designers, contractors, and product/material suppliers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Requires <strong className="text-white">carbon baselines, targets, reduction plans, and monitoring</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not legally mandatory but increasingly required by public sector clients (Highways England, Network Rail, HS2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>2023 revision expanded scope from infrastructure only to include buildings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Carbon Calculators</p>
                <p className="text-sm text-white/80 mb-3">
                  Several tools are available to calculate embodied carbon in construction projects:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">One Click LCA:</strong> Industry-leading lifecycle assessment software widely used by UK designers and contractors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">RICS Building Carbon Calculator:</strong> Spreadsheet-based tool aligned with the RICS Professional Statement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">IStructE Carbon Calculator:</strong> Free tool specifically for structural engineers to estimate embodied carbon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Environmental Product Declarations (EPDs):</strong> Standardised documents (EN 15804) providing verified carbon data for specific products</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Science-Based Targets (SBTi)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The Science Based Targets initiative provides a framework for companies to set emissions reduction targets consistent with Paris Agreement goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Targets must cover <strong className="text-white">Scope 1, Scope 2, and (for most companies) Scope 3</strong> emissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Near-term targets (5&ndash;10 years) must align with <strong className="text-white">1.5&deg;C warming pathway</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Major UK contractors (Balfour Beatty, Skanska, Kier, Morgan Sindall) have committed to SBTi targets</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">CDP (formerly Carbon Disclosure Project)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Global non-profit that runs a disclosure system for companies, cities, and regions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Companies are scored A to D (plus F for non-disclosure) on their climate, water, and forest disclosure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Increasingly used by investors, clients, and supply chains as a measure of environmental governance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Major construction clients (e.g., government bodies) may require supply chain partners to disclose through CDP</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">SECR &mdash; Streamlined Energy and Carbon Reporting</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Legal requirement</strong> for qualifying UK companies (quoted companies, large unquoted companies, large LLPs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Must report: <strong className="text-white">UK energy use, associated GHG emissions (Scope 1 &amp; 2 minimum), and at least one intensity ratio</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Reporting included in the <strong className="text-white">annual directors&rsquo; report</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Replaced the CRC Energy Efficiency Scheme from April 2019</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Qualifying thresholds: &ge;250 employees, or &ge;&pound;36m turnover and &ge;&pound;18m balance sheet</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Why It Matters:</strong> Even if your employer is
                  too small for mandatory SECR reporting, understanding carbon measurement and reporting
                  is increasingly important. Major clients and principal contractors are pushing carbon
                  reporting requirements down through their supply chains. Being able to measure, report,
                  and reduce your organisation&rsquo;s carbon footprint will become a competitive advantage
                  &mdash; and eventually a baseline requirement &mdash; for construction businesses of
                  all sizes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz
          title="Section 2 Knowledge Check"
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
            <Link to="../environmental-sustainability-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
