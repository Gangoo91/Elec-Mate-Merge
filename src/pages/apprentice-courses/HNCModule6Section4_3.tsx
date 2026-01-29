import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Embodied Carbon - HNC Module 6 Section 4.3";
const DESCRIPTION = "Master embodied carbon assessment for building services: whole life carbon, material selection, life cycle stages A-D, EPDs, MEP carbon impacts, and reduction strategies for sustainable design.";

const quickCheckQuestions = [
  {
    id: "embodied-carbon-definition",
    question: "What is embodied carbon?",
    options: ["Carbon emissions from building heating", "Carbon stored in vegetation", "Carbon emissions from materials, construction, and end of life", "Carbon dioxide concentration in indoor air"],
    correctIndex: 2,
    explanation: "Embodied carbon represents the total carbon emissions associated with materials and construction processes, including raw material extraction, manufacturing, transport, installation, maintenance, and end-of-life treatment."
  },
  {
    id: "life-cycle-stage-a1-a3",
    question: "What do life cycle stages A1-A3 represent?",
    options: ["Construction process emissions", "Product stage (raw materials, transport, manufacturing)", "Operational energy use", "End of life disposal"],
    correctIndex: 1,
    explanation: "Stages A1-A3 cover the product stage: A1 is raw material extraction, A2 is transport to manufacturer, and A3 is manufacturing. This is often called 'cradle to gate' embodied carbon."
  },
  {
    id: "epd-purpose",
    question: "What is the purpose of an Environmental Product Declaration (EPD)?",
    options: ["To certify electrical safety", "To provide verified environmental impact data for products", "To approve building planning permission", "To measure operational energy efficiency"],
    correctIndex: 1,
    explanation: "EPDs provide independently verified, comparable data on a product's environmental impacts across its life cycle, including embodied carbon, based on standardised Life Cycle Assessment methodology to EN 15804."
  },
  {
    id: "module-d",
    question: "What does Module D represent in whole life carbon assessment?",
    options: ["Demolition emissions", "Design stage impacts", "Benefits beyond the building life cycle (reuse, recycling)", "Ductwork installation"],
    correctIndex: 2,
    explanation: "Module D captures benefits and loads beyond the system boundary - including material reuse, recycling, and energy recovery potential. It represents the circular economy potential of materials at end of life."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which life cycle stage typically accounts for the largest proportion of embodied carbon in MEP systems?",
    options: [
      "A4 - Transport to site",
      "A1-A3 - Product stage",
      "B2 - Maintenance",
      "C3 - Waste processing"
    ],
    correctAnswer: 1,
    explanation: "The product stage (A1-A3) typically represents 70-80% of total embodied carbon in MEP systems, covering raw material extraction, manufacturing, and factory-gate transport."
  },
  {
    id: 2,
    question: "What is the typical embodied carbon range for copper cable per kilogram?",
    options: ["0.5-1.0 kgCO₂e/kg", "1.5-3.0 kgCO₂e/kg", "4.0-6.0 kgCO₂e/kg", "8.0-12.0 kgCO₂e/kg"],
    correctAnswer: 1,
    explanation: "Virgin copper cable has embodied carbon of approximately 2.0-3.0 kgCO₂e/kg. Using recycled copper content can reduce this significantly, with high-recycled content cables achieving around 1.5 kgCO₂e/kg."
  },
  {
    id: 3,
    question: "According to RICS Whole Life Carbon Assessment methodology, which stages are mandatory for reporting?",
    options: [
      "A1-A5 only",
      "A1-A3 and B6 only",
      "A1-A5, B1-B5, C1-C4",
      "All stages A-D"
    ],
    correctAnswer: 2,
    explanation: "RICS methodology requires reporting of A1-A5 (product and construction), B1-B5 (use stage excluding operational energy), and C1-C4 (end of life). Module D is reported separately as it extends beyond the building boundary."
  },
  {
    id: 4,
    question: "What percentage of a typical commercial building's whole life carbon is embodied carbon?",
    options: ["10-15%", "25-35%", "40-60%", "80-90%"],
    correctAnswer: 2,
    explanation: "Embodied carbon typically represents 40-60% of whole life carbon in modern commercial buildings with efficient operational performance. As operational carbon reduces through grid decarbonisation, embodied carbon's proportion increases."
  },
  {
    id: 5,
    question: "Which MEP component typically has the highest embodied carbon intensity?",
    options: ["PVC trunking", "Steel cable tray", "Copper busbars", "Plastic conduit"],
    correctAnswer: 2,
    explanation: "Copper busbars have very high embodied carbon intensity at approximately 2.5-3.5 kgCO₂e/kg due to copper's energy-intensive extraction and refining. Aluminium busbars offer a lower-carbon alternative at ~8.0 kgCO₂e/kg despite higher mass."
  },
  {
    id: 6,
    question: "What does 'cradle to grave' encompass in life cycle assessment?",
    options: [
      "Raw material extraction to factory gate (A1-A3)",
      "Raw material extraction to end of life disposal (A-C)",
      "Construction to operation only (A4-B7)",
      "Operation to demolition (B-C)"
    ],
    correctAnswer: 1,
    explanation: "Cradle to grave encompasses all life cycle stages from raw material extraction (cradle) through manufacturing, construction, use, and end of life treatment (grave) - stages A1 through C4."
  },
  {
    id: 7,
    question: "Which design stage offers the greatest opportunity to reduce embodied carbon?",
    options: ["Detailed design (RIBA Stage 4)", "Technical design (RIBA Stage 5)", "Concept design (RIBA Stage 2)", "Construction (RIBA Stage 6)"],
    correctAnswer: 2,
    explanation: "Concept design (RIBA Stage 2) offers the greatest opportunity for embodied carbon reduction as fundamental decisions about system types, capacities, and spatial strategies can be influenced. By Stage 4, most decisions are locked in."
  },
  {
    id: 8,
    question: "What is the typical embodied carbon of steel cable containment per metre run?",
    options: ["0.5-1.0 kgCO₂e/m", "2.0-4.0 kgCO₂e/m", "6.0-10.0 kgCO₂e/m", "15.0-25.0 kgCO₂e/m"],
    correctAnswer: 1,
    explanation: "Heavy-gauge steel cable tray (100mm wide) has embodied carbon of approximately 2.5-4.0 kgCO₂e per metre. Lighter cable basket or recycled content steel can reduce this to 1.5-2.5 kgCO₂e/m."
  },
  {
    id: 9,
    question: "Stage B4 in the life cycle represents:",
    options: [
      "Maintenance activities",
      "Repair of components",
      "Replacement of building elements",
      "Refurbishment of the whole building"
    ],
    correctAnswer: 2,
    explanation: "B4 covers replacement of building elements during the building's reference study period. For MEP, this includes planned replacement of components like luminaires, distribution boards, and mechanical equipment that have shorter lifespans than the building."
  },
  {
    id: 10,
    question: "Which refrigerant property is most relevant to embodied carbon assessment?",
    options: [
      "Flammability rating",
      "Global Warming Potential (GWP)",
      "Operating pressure",
      "Thermal conductivity"
    ],
    correctAnswer: 1,
    explanation: "Global Warming Potential (GWP) directly impacts embodied carbon calculations. High-GWP refrigerants like R410A (GWP 2088) contribute significantly to embodied carbon, while low-GWP alternatives like R32 (GWP 675) or R290 (GWP 3) offer substantial reductions."
  },
  {
    id: 11,
    question: "What is the primary standard for EPDs in construction products in Europe?",
    options: [
      "ISO 14001",
      "EN 15804",
      "BS 7671",
      "BREEAM"
    ],
    correctAnswer: 1,
    explanation: "EN 15804 provides the core product category rules for EPDs in the construction sector, ensuring consistent methodology and comparability. It defines the life cycle stages A1-D and reporting requirements."
  },
  {
    id: 12,
    question: "To achieve a BREEAM 'Excellent' rating, what embodied carbon reduction is typically required for MEP systems?",
    options: [
      "5% below baseline",
      "10% below baseline",
      "15-20% below baseline",
      "30% below baseline"
    ],
    correctAnswer: 2,
    explanation: "BREEAM Mat 01 requires demonstrating embodied carbon reductions. For 'Excellent' ratings, projects typically need to achieve 15-20% reductions through material specification, system optimisation, and use of recycled content or low-carbon alternatives."
  }
];

const faqs = [
  {
    question: "How does embodied carbon differ from operational carbon?",
    answer: "Operational carbon covers emissions from energy consumed during building use (heating, cooling, lighting, equipment). Embodied carbon covers emissions from materials and construction activities - it's 'locked in' at completion and cannot be reduced through operational efficiency. As buildings become more energy efficient and grids decarbonise, embodied carbon becomes proportionally more significant, potentially representing 50-70% of whole life carbon for Net Zero buildings."
  },
  {
    question: "Why is early design stage assessment important?",
    answer: "The potential to influence embodied carbon reduces dramatically as design progresses. At RIBA Stage 2, fundamental decisions about system types, spatial strategies, and servicing approaches can achieve 30-50% reductions. By Stage 4, specifications are largely fixed and only marginal improvements (5-15%) are possible through product substitution. This 'carbon lock-in' means opportunities missed early cannot be recovered later."
  },
  {
    question: "How do I obtain embodied carbon data for MEP products?",
    answer: "Primary sources include: (1) Product-specific EPDs from manufacturers - these provide verified, accurate data; (2) Generic EPD databases like CIBSE TM65, WRAP, or ICE Database; (3) Manufacturer product data sheets with carbon declarations; (4) Industry sector EPDs for product categories. Where specific data is unavailable, use conservative generic values and flag data quality in assessments."
  },
  {
    question: "What are the key strategies to reduce MEP embodied carbon?",
    answer: "Priority strategies include: (1) Design out unnecessary systems through passive design and load reduction; (2) Right-size systems to avoid overcapacity; (3) Specify high recycled content materials, especially for copper and steel; (4) Choose products with verified EPDs showing lower carbon; (5) Design for longevity to reduce replacement cycles; (6) Plan for end-of-life recovery through design for disassembly; (7) Consider low-GWP refrigerants in HVAC systems."
  },
  {
    question: "How does refrigerant choice affect MEP embodied carbon?",
    answer: "Refrigerant leakage and end-of-life losses are included in embodied carbon calculations. High-GWP refrigerants like R410A (GWP 2088) can contribute significantly - a typical VRF system with 50kg charge experiencing 3% annual leakage adds ~3,000 kgCO₂e per year. Switching to R32 (GWP 675) or natural refrigerants like CO₂ (GWP 1) can reduce this by 60-99%."
  },
  {
    question: "What is the RICS Whole Life Carbon Assessment methodology?",
    answer: "The RICS Professional Statement (2017, updated 2023) provides a standardised methodology for calculating and reporting whole life carbon in buildings. It requires assessment of modules A1-A5, B1-B5, C1-C4 with separate reporting of B6-B7 (operational) and Module D (beyond boundary). It mandates 60-year reference study periods, consistent data sources, and clear reporting of assumptions and data quality."
  }
];

const HNCModule6Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Embodied Carbon
          </h1>
          <p className="text-white/80">
            Whole life carbon, material selection, life cycle stages, EPDs, and reduction strategies for sustainable MEP design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Embodied carbon:</strong> Emissions from materials and construction</li>
              <li className="pl-1"><strong>Life cycle stages:</strong> A1-A5, B1-B7, C1-C4, D</li>
              <li className="pl-1"><strong>MEP contribution:</strong> 15-25% of building embodied carbon</li>
              <li className="pl-1"><strong>Key materials:</strong> Copper, steel, refrigerants, aluminium</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Copper cable:</strong> ~2.5 kgCO₂e/kg (virgin)</li>
              <li className="pl-1"><strong>Steel containment:</strong> ~2.0 kgCO₂e/kg</li>
              <li className="pl-1"><strong>Early design:</strong> Greatest reduction opportunity</li>
              <li className="pl-1"><strong>EPDs:</strong> Verified product carbon data</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define embodied carbon and whole life carbon concepts",
              "Apply life cycle assessment stages A1-D to MEP systems",
              "Interpret Environmental Product Declarations (EPDs)",
              "Compare embodied carbon of common MEP materials",
              "Identify carbon reduction strategies at each design stage",
              "Apply RICS methodology for whole life carbon assessment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Understanding Embodied Carbon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Embodied Carbon
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Embodied carbon represents the total greenhouse gas emissions associated with materials
              and construction processes throughout a building's life cycle. Unlike operational carbon
              which can be reduced through efficient management and grid decarbonisation, embodied
              carbon is 'locked in' once construction is complete.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of embodied carbon:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Product stage (A1-A3):</strong> Raw material extraction, transport, manufacturing - typically 70-80% of total</li>
                <li className="pl-1"><strong>Construction (A4-A5):</strong> Transport to site and installation activities</li>
                <li className="pl-1"><strong>In-use (B1-B5):</strong> Maintenance, repair, replacement of components</li>
                <li className="pl-1"><strong>End of life (C1-C4):</strong> Deconstruction, transport, processing, disposal</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Whole Life Carbon Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Modules</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Product</td>
                      <td className="border border-white/10 px-3 py-2">A1-A3</td>
                      <td className="border border-white/10 px-3 py-2">Raw material supply, transport to factory, manufacturing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction</td>
                      <td className="border border-white/10 px-3 py-2">A4-A5</td>
                      <td className="border border-white/10 px-3 py-2">Transport to site, installation and construction processes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Use</td>
                      <td className="border border-white/10 px-3 py-2">B1-B5</td>
                      <td className="border border-white/10 px-3 py-2">Use, maintenance, repair, replacement, refurbishment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operational</td>
                      <td className="border border-white/10 px-3 py-2">B6-B7</td>
                      <td className="border border-white/10 px-3 py-2">Operational energy and water use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">End of Life</td>
                      <td className="border border-white/10 px-3 py-2">C1-C4</td>
                      <td className="border border-white/10 px-3 py-2">Deconstruction, transport, waste processing, disposal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Beyond Life</td>
                      <td className="border border-white/10 px-3 py-2">D</td>
                      <td className="border border-white/10 px-3 py-2">Reuse, recovery, recycling potential (reported separately)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical insight:</strong> For highly efficient buildings, embodied carbon can represent 50-70% of whole life carbon, making upfront material choices increasingly important for Net Zero targets.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Life Cycle Stages in Detail */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Life Cycle Stages in Detail
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding each life cycle stage enables targeted carbon reduction strategies.
              The EN 15804 framework provides standardised modules that form the basis for EPDs
              and whole life carbon assessments.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Product Stage (A1-A3)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>A1:</strong> Raw material extraction and processing</li>
                  <li className="pl-1"><strong>A2:</strong> Transport to manufacturing plant</li>
                  <li className="pl-1"><strong>A3:</strong> Manufacturing and packaging</li>
                  <li className="pl-1">Often called 'cradle to gate'</li>
                  <li className="pl-1">Typically 70-80% of embodied carbon</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Stage (A4-A5)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>A4:</strong> Transport from factory to site</li>
                  <li className="pl-1"><strong>A5:</strong> Installation and construction waste</li>
                  <li className="pl-1">Includes site energy use</li>
                  <li className="pl-1">Waste factor typically 3-10%</li>
                  <li className="pl-1">Usually 5-15% of embodied carbon</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Use Stage (B1-B7)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>B1:</strong> Use (emissions from product itself)</li>
                  <li className="pl-1"><strong>B2:</strong> Maintenance activities</li>
                  <li className="pl-1"><strong>B3:</strong> Repair</li>
                  <li className="pl-1"><strong>B4:</strong> Replacement (major for MEP)</li>
                  <li className="pl-1"><strong>B5:</strong> Refurbishment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">End of Life (C1-C4) and Beyond (D)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>C1:</strong> Deconstruction/demolition</li>
                  <li className="pl-1"><strong>C2:</strong> Transport to waste processing</li>
                  <li className="pl-1"><strong>C3:</strong> Waste processing for reuse</li>
                  <li className="pl-1"><strong>C4:</strong> Disposal</li>
                  <li className="pl-1"><strong>D:</strong> Benefits beyond boundary</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">B4 Replacement Cycles for MEP Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Lifespan</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Replacements in 60 years</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED luminaires</td>
                      <td className="border border-white/10 px-3 py-2">15-20 years</td>
                      <td className="border border-white/10 px-3 py-2">2-3 cycles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">25-30 years</td>
                      <td className="border border-white/10 px-3 py-2">1-2 cycles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables and containment</td>
                      <td className="border border-white/10 px-3 py-2">40-60 years</td>
                      <td className="border border-white/10 px-3 py-2">0-1 cycle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC plant</td>
                      <td className="border border-white/10 px-3 py-2">15-25 years</td>
                      <td className="border border-white/10 px-3 py-2">2-3 cycles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS controllers</td>
                      <td className="border border-white/10 px-3 py-2">10-15 years</td>
                      <td className="border border-white/10 px-3 py-2">3-5 cycles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> B4 replacement can double the embodied carbon of short-lifespan components over a 60-year reference study period.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: MEP Embodied Carbon and EPDs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            MEP Embodied Carbon and EPDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MEP systems typically contribute 15-25% of a building's total embodied carbon.
              Environmental Product Declarations (EPDs) provide verified, comparable data
              for material selection decisions based on the EN 15804 standard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Typical MEP Material Embodied Carbon Values</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Electrical Materials</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Copper cable (virgin): 2.5-3.0 kgCO₂e/kg</li>
                    <li>Copper cable (recycled): 1.2-1.8 kgCO₂e/kg</li>
                    <li>Aluminium cable: 8.0-10.0 kgCO₂e/kg</li>
                    <li>Steel cable tray: 1.8-2.5 kgCO₂e/kg</li>
                    <li>PVC conduit: 2.0-3.0 kgCO₂e/kg</li>
                    <li>Steel trunking: 2.0-2.8 kgCO₂e/kg</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Mechanical Materials</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Steel ductwork: 2.0-2.8 kgCO₂e/kg</li>
                    <li>Copper pipework: 2.5-3.5 kgCO₂e/kg</li>
                    <li>Galvanised steel pipe: 2.2-3.0 kgCO₂e/kg</li>
                    <li>Mineral wool insulation: 1.0-1.5 kgCO₂e/kg</li>
                    <li>PIR insulation: 4.0-6.0 kgCO₂e/kg</li>
                    <li>Cast iron radiators: 1.5-2.0 kgCO₂e/kg</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding EPDs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Type III EPD:</strong> Third-party verified environmental declaration to EN 15804</li>
                <li className="pl-1"><strong>GWP (A1-A3):</strong> Global Warming Potential for product stage - key comparison metric</li>
                <li className="pl-1"><strong>Functional unit:</strong> Basis of comparison (e.g., per kg, per metre, per luminaire)</li>
                <li className="pl-1"><strong>Reference service life:</strong> Expected lifespan affecting B4 calculations</li>
                <li className="pl-1"><strong>Programme operator:</strong> Scheme under which EPD is registered (e.g., IBU, BRE)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Refrigerant Carbon Impact</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Refrigerant</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GWP (100yr)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Carbon per kg leakage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R410A</td>
                      <td className="border border-white/10 px-3 py-2">2,088</td>
                      <td className="border border-white/10 px-3 py-2">2,088 kgCO₂e</td>
                      <td className="border border-white/10 px-3 py-2">Split AC, VRF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R32</td>
                      <td className="border border-white/10 px-3 py-2">675</td>
                      <td className="border border-white/10 px-3 py-2">675 kgCO₂e</td>
                      <td className="border border-white/10 px-3 py-2">Split AC, small chillers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R134a</td>
                      <td className="border border-white/10 px-3 py-2">1,430</td>
                      <td className="border border-white/10 px-3 py-2">1,430 kgCO₂e</td>
                      <td className="border border-white/10 px-3 py-2">Chillers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R290 (Propane)</td>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">3 kgCO₂e</td>
                      <td className="border border-white/10 px-3 py-2">Heat pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R744 (CO₂)</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">1 kgCO₂e</td>
                      <td className="border border-white/10 px-3 py-2">Commercial refrigeration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Data sources:</strong> Use CIBSE TM65, ICE Database, or manufacturer EPDs. Where product-specific EPDs are unavailable, use generic data with conservative assumptions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Reduction Strategies and RICS Methodology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Reduction Strategies and RICS Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective embodied carbon reduction requires intervention at the right design stage.
              The RICS Whole Life Carbon Assessment methodology provides a standardised approach
              for calculating, comparing, and reporting building carbon.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Carbon Reduction Hierarchy</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-green-500/10 border-l-4 border-green-500">
                  <p className="font-medium text-green-400">1. Build Less / Avoid</p>
                  <p className="text-sm text-white/80">Question the need - can existing systems be retained or refurbished?</p>
                </div>
                <div className="p-3 rounded bg-blue-500/10 border-l-4 border-blue-500">
                  <p className="font-medium text-blue-400">2. Design Efficiently</p>
                  <p className="text-sm text-white/80">Reduce loads through passive design, right-size systems, optimise routing</p>
                </div>
                <div className="p-3 rounded bg-yellow-500/10 border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-400">3. Specify Low-Carbon</p>
                  <p className="text-sm text-white/80">Choose materials with EPDs, high recycled content, low-GWP refrigerants</p>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border-l-4 border-purple-500">
                  <p className="font-medium text-purple-400">4. Design for Longevity</p>
                  <p className="text-sm text-white/80">Extend component life, design for maintenance access, future adaptability</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP-Specific Reduction Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Saving</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Right-sizing systems</td>
                      <td className="border border-white/10 px-3 py-2">10-30%</td>
                      <td className="border border-white/10 px-3 py-2">Accurate load calculations, avoid over-design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Recycled copper content</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">Specify high recycled content cables</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Optimised containment</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">Efficient routing, shared risers, lighter gauges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-GWP refrigerants</td>
                      <td className="border border-white/10 px-3 py-2">60-99%</td>
                      <td className="border border-white/10 px-3 py-2">R32, R290, CO₂ systems instead of R410A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extended luminaire life</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">Quality products with 50,000+ hour life</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RICS Whole Life Carbon Requirements</p>
              <div className="text-sm space-y-2">
                <p><strong>Reference study period:</strong> 60 years (standard building life)</p>
                <p><strong>Mandatory modules:</strong> A1-A5, B1-B5, C1-C4</p>
                <p><strong>Separate reporting:</strong> B6-B7 (operational), Module D (beyond boundary)</p>
                <p><strong>Data hierarchy:</strong> Product EPD {'>'} Industry EPD {'>'} Generic database</p>
                <p><strong>Unit:</strong> kgCO₂e/m² GIA for benchmarking</p>
                <p><strong>Reporting:</strong> Clear statement of inclusions, exclusions, and data quality</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Early action imperative:</strong> 80% of embodied carbon is determined by RIBA Stage 3. By Stage 5, only marginal improvements through product substitution remain possible.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Cable Embodied Carbon Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate embodied carbon for 500m of 95mm² 4-core armoured cable.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p>Cable mass: 4.2 kg/m</p>
                <p>Total mass: 500m × 4.2 kg/m = 2,100 kg</p>
                <p className="mt-2">Virgin copper coefficient: 2.8 kgCO₂e/kg</p>
                <p className="mt-2 text-white/60">Calculation (A1-A3):</p>
                <p>Embodied carbon = 2,100 kg × 2.8 kgCO₂e/kg</p>
                <p className="text-green-400">= 5,880 kgCO₂e</p>
                <p className="mt-2 text-white/60">With 50% recycled content (coefficient 2.0 kgCO₂e/kg):</p>
                <p>= 2,100 kg × 2.0 kgCO₂e/kg</p>
                <p className="text-green-400">= 4,200 kgCO₂e (29% reduction)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Refrigerant Lifecycle Carbon</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare whole life refrigerant carbon for R410A vs R32 VRF system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System parameters:</p>
                <p>Refrigerant charge: 45 kg</p>
                <p>Annual leakage rate: 3%</p>
                <p>Service life: 20 years</p>
                <p>End of life recovery: 80%</p>
                <p className="mt-2 text-white/60">R410A (GWP 2088):</p>
                <p>Initial charge: 45 × 2,088 = 93,960 kgCO₂e</p>
                <p>Annual leakage: 1.35 kg × 2,088 = 2,819 kgCO₂e/yr</p>
                <p>20-year leakage: 56,380 kgCO₂e</p>
                <p>End of life loss (20%): 9 kg × 2,088 = 18,792 kgCO₂e</p>
                <p className="text-red-400">Total: 169,132 kgCO₂e</p>
                <p className="mt-2 text-white/60">R32 (GWP 675):</p>
                <p>Initial charge: 45 × 675 = 30,375 kgCO₂e</p>
                <p>20-year leakage: 18,225 kgCO₂e</p>
                <p>End of life loss: 6,075 kgCO₂e</p>
                <p className="text-green-400">Total: 54,675 kgCO₂e (68% reduction)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: B4 Replacement Impact</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate whole life embodied carbon including replacements for lighting.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Installation parameters:</p>
                <p>Number of luminaires: 200</p>
                <p>Carbon per luminaire (A1-A3): 25 kgCO₂e</p>
                <p>Building reference period: 60 years</p>
                <p className="mt-2 text-white/60">Option A - Standard LED (15-year life):</p>
                <p>Replacements in 60 years: 3 cycles (initial + 3)</p>
                <p>Total luminaire carbon: 200 × 25 × 4 = 20,000 kgCO₂e</p>
                <p className="mt-2 text-white/60">Option B - Premium LED (25-year life):</p>
                <p>Carbon per luminaire: 32 kgCO₂e (higher quality)</p>
                <p>Replacements in 60 years: 2 cycles (initial + 1)</p>
                <p>Total luminaire carbon: 200 × 32 × 2.4 = 15,360 kgCO₂e</p>
                <p className="mt-2 text-green-400">Premium option: 23% lower whole life carbon despite higher unit cost</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Embodied Carbon Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define system boundaries and reference study period (typically 60 years)</li>
                <li className="pl-1">List all MEP components and materials with quantities</li>
                <li className="pl-1">Source carbon coefficients: EPDs first, then generic databases</li>
                <li className="pl-1">Include A1-A5, B1-B5, C1-C4 as minimum scope</li>
                <li className="pl-1">Calculate B4 replacements based on component lifespans</li>
                <li className="pl-1">Document assumptions, exclusions, and data quality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Product stage (A1-A3): <strong>70-80%</strong> of embodied carbon</li>
                <li className="pl-1">MEP contribution: <strong>15-25%</strong> of building embodied carbon</li>
                <li className="pl-1">Copper cable: <strong>2.5-3.0 kgCO₂e/kg</strong> (virgin)</li>
                <li className="pl-1">Reference study period: <strong>60 years</strong> (RICS standard)</li>
                <li className="pl-1">R410A GWP: <strong>2,088</strong> vs R32: <strong>675</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring B4 replacements:</strong> Short-lifespan components multiply carbon</li>
                <li className="pl-1"><strong>Forgetting refrigerants:</strong> High-GWP refrigerants can dominate HVAC carbon</li>
                <li className="pl-1"><strong>Using outdated data:</strong> Generic databases may not reflect current manufacturing</li>
                <li className="pl-1"><strong>Late assessment:</strong> Waiting until Stage 4/5 limits reduction options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Life Cycle Stages</p>
                <ul className="space-y-0.5">
                  <li>A1-A3: Product stage (cradle to gate)</li>
                  <li>A4-A5: Construction process</li>
                  <li>B1-B5: Use stage (maintenance, replacement)</li>
                  <li>C1-C4: End of life</li>
                  <li>D: Beyond building life (recycling credit)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Reduction Strategies</p>
                <ul className="space-y-0.5">
                  <li>Build less - question necessity</li>
                  <li>Design efficiently - right-size systems</li>
                  <li>Specify low-carbon - use EPDs</li>
                  <li>Design for longevity - reduce replacements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4-4">
              Next: Carbon Reduction Strategies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section4_3;
