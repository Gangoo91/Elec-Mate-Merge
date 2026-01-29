import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Whole Life Carbon Assessment - HNC Module 6 Section 6.4";
const DESCRIPTION = "Master Whole Life Carbon Assessment for building services: RICS methodology, life cycle stages (Modules A-D), data sources (EPDs, ICE database), benchmarking against LETI targets, and reduction strategies for MEP systems.";

const quickCheckQuestions = [
  {
    id: "wlc-definition",
    question: "What does Whole Life Carbon (WLC) assessment measure?",
    options: ["Only operational energy consumption", "Total carbon emissions from cradle to grave including embodied and operational carbon", "Just the manufacturing emissions of materials", "Carbon sequestration in building materials"],
    correctIndex: 1,
    explanation: "Whole Life Carbon assessment measures the total carbon emissions across a building's entire life cycle, including both embodied carbon (materials, construction, maintenance, end-of-life) and operational carbon (energy use during occupancy)."
  },
  {
    id: "module-a",
    question: "Which life cycle module covers the 'product stage' including raw material extraction and manufacturing?",
    options: ["Module B (Use stage)", "Module C (End-of-life)", "Module A1-A3 (Product stage)", "Module D (Beyond system boundary)"],
    correctIndex: 2,
    explanation: "Module A1-A3 covers the product stage: A1 is raw material extraction and supply, A2 is transport to manufacturer, and A3 is manufacturing. This represents the 'cradle-to-gate' embodied carbon of materials."
  },
  {
    id: "epd-purpose",
    question: "What is an Environmental Product Declaration (EPD)?",
    options: ["A building energy performance certificate", "A standardised document reporting verified environmental impacts of a product", "A planning permission requirement", "A manufacturer's marketing document"],
    correctIndex: 1,
    explanation: "An EPD is a standardised, third-party verified document that reports the environmental impacts of a product based on Life Cycle Assessment. EPDs follow ISO 14025 and EN 15804 standards, providing reliable data for WLC calculations."
  },
  {
    id: "leti-benchmark",
    question: "What is the LETI 2030 target for whole life carbon in non-domestic buildings?",
    options: ["1500 kgCO2e/m2", "600 kgCO2e/m2", "300 kgCO2e/m2", "100 kgCO2e/m2"],
    correctIndex: 1,
    explanation: "LETI (London Energy Transformation Initiative) sets a 2030 target of 600 kgCO2e/m2 for whole life carbon in non-domestic buildings, with an aspirational 2050 target of 350 kgCO2e/m2. These benchmarks drive industry decarbonisation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to RICS methodology, what is the standard study period for whole life carbon assessment?",
    options: [
      "25 years",
      "50 years",
      "60 years",
      "100 years"
    ],
    correctAnswer: 2,
    explanation: "RICS Professional Statement specifies a 60-year study period as the standard for whole life carbon assessment. This aligns with BS EN 15978 and allows consistent benchmarking across projects."
  },
  {
    id: 2,
    question: "Which module covers carbon emissions from building maintenance and replacement during use?",
    options: ["Module A5 (Construction process)", "Module B4 (Replacement)", "Module C2 (Transport to disposal)", "Module D (Reuse potential)"],
    correctAnswer: 1,
    explanation: "Module B4 covers replacement of building components during the use stage. For MEP systems with 15-25 year lifespans, multiple replacement cycles must be accounted for within the 60-year study period."
  },
  {
    id: 3,
    question: "What does Module D represent in life cycle assessment?",
    options: [
      "Demolition activities",
      "Design stage emissions",
      "Benefits and loads beyond the system boundary (recycling credits)",
      "Delivery to site"
    ],
    correctAnswer: 2,
    explanation: "Module D accounts for potential benefits beyond the building's life cycle, such as recycling, recovery, or reuse potential. It must be reported separately as it represents avoided emissions in future product systems."
  },
  {
    id: 4,
    question: "The ICE Database provides:",
    options: [
      "Only UK construction material carbon factors",
      "Energy performance benchmarks for buildings",
      "Embodied carbon coefficients for construction materials",
      "Building regulations compliance data"
    ],
    correctAnswer: 2,
    explanation: "The Inventory of Carbon and Energy (ICE) Database, developed by the University of Bath, provides embodied carbon coefficients (kgCO2e/kg) for construction materials. It's widely used in the UK when product-specific EPDs are unavailable."
  },
  {
    id: 5,
    question: "Which data source provides the most accurate embodied carbon values?",
    options: [
      "Generic industry databases",
      "Product-specific EPDs",
      "National averages",
      "Estimated values"
    ],
    correctAnswer: 1,
    explanation: "Product-specific EPDs provide the most accurate embodied carbon data as they are based on actual manufacturing processes and third-party verified. The data hierarchy is: product-specific EPD > manufacturer EPD > industry average EPD > generic database."
  },
  {
    id: 6,
    question: "What percentage of a building's whole life carbon do MEP systems typically represent?",
    options: [
      "5-10%",
      "15-25%",
      "40-50%",
      "60-70%"
    ],
    correctAnswer: 1,
    explanation: "MEP systems typically account for 15-25% of a building's whole life carbon, primarily due to shorter replacement cycles (15-25 years vs 60+ years for structure) and energy-intensive materials like copper, aluminium, and refrigerants."
  },
  {
    id: 7,
    question: "Which refrigerant property is measured in Global Warming Potential (GWP)?",
    options: [
      "Ozone depletion potential",
      "Flammability rating",
      "Equivalent CO2 impact per kg released",
      "Energy efficiency ratio"
    ],
    correctAnswer: 2,
    explanation: "GWP measures the climate impact of a refrigerant relative to CO2 over a specified time period (typically 100 years). R-410A has a GWP of 2088, meaning 1kg released equals 2088 kg CO2e. Lower GWP alternatives like R-32 (GWP 675) reduce embodied carbon risk."
  },
  {
    id: 8,
    question: "RICS requires WLC assessment at which project stages?",
    options: [
      "Only at completion",
      "RIBA Stages 2, 3, 4 and completion",
      "Only at planning submission",
      "Only during operation"
    ],
    correctAnswer: 1,
    explanation: "RICS Professional Statement requires WLC assessment at RIBA Stage 2 (Concept Design), Stage 3 (Developed Design), Stage 4 (Technical Design), and as-built completion. Early assessment enables design optimisation when changes are still feasible."
  },
  {
    id: 9,
    question: "What is the primary strategy for reducing operational carbon in MEP design?",
    options: [
      "Using recycled materials",
      "Reducing system sizes through fabric-first approach",
      "Specifying longer-life equipment",
      "Choosing local suppliers"
    ],
    correctAnswer: 1,
    explanation: "A fabric-first approach reduces heating/cooling loads through better insulation, airtightness, and passive design, enabling smaller MEP systems. This reduces both operational carbon (lower energy use) and embodied carbon (less equipment)."
  },
  {
    id: 10,
    question: "Which copper cable alternative can reduce embodied carbon by approximately 50%?",
    options: [
      "Steel conductors",
      "Aluminium conductors",
      "Copper-clad aluminium",
      "Silver conductors"
    ],
    correctAnswer: 1,
    explanation: "Aluminium conductors have approximately 50% lower embodied carbon than copper. While requiring larger cross-sections for equivalent current capacity, aluminium is increasingly used for submains and distribution where termination methods allow."
  },
  {
    id: 11,
    question: "What does 'biogenic carbon' refer to in WLC assessment?",
    options: [
      "Carbon from fossil fuels",
      "Carbon stored in bio-based materials like timber",
      "Carbon from biological waste",
      "Carbon dioxide from respiration"
    ],
    correctAnswer: 1,
    explanation: "Biogenic carbon is carbon sequestered from the atmosphere by plants and stored in bio-based materials. Timber products store biogenic carbon, which may be released at end-of-life. RICS requires biogenic carbon to be reported separately."
  },
  {
    id: 12,
    question: "A cable tray system is replaced twice during a 60-year building life. How is this captured in WLC?",
    options: [
      "Only the initial installation is counted",
      "Module B4 accounts for replacement cycles",
      "Replacements are excluded from assessment",
      "Only the final installation is counted"
    ],
    correctAnswer: 1,
    explanation: "Module B4 (Replacement) captures the embodied carbon of all replacement cycles within the study period. If cable tray has a 20-year life, two replacements (at years 20 and 40) would be included, effectively tripling the B4 carbon impact."
  }
];

const faqs = [
  {
    question: "What's the difference between embodied carbon and operational carbon?",
    answer: "Embodied carbon (Modules A1-A5, B1-B5, C1-C4) is the carbon emitted during material extraction, manufacturing, transport, construction, maintenance, replacement, and end-of-life. Operational carbon (Module B6) is the carbon from energy used during building operation. As buildings become more energy-efficient, embodied carbon represents an increasing proportion of whole life carbon - often 50%+ in low-energy buildings."
  },
  {
    question: "How do I calculate WLC for MEP systems without product EPDs?",
    answer: "When product-specific EPDs are unavailable, use data hierarchy: (1) manufacturer-provided data, (2) industry-average EPDs for the product category, (3) generic databases like ICE v3.0 or One Click LCA. Document data sources and quality levels. RICS requires transparency about data limitations and recommends sensitivity analysis for significant assumptions."
  },
  {
    question: "Why is refrigerant leakage included in WLC assessment?",
    answer: "Refrigerant leakage (Module B1 - Use) can significantly impact WLC due to high GWP values. A typical commercial chiller with R-410A (GWP 2088) leaking 5% annually could emit 100+ kgCO2e/kW cooling capacity over 20 years from leakage alone. Assessment includes both initial charge and annual leakage rates, making low-GWP refrigerant selection a key decarbonisation strategy."
  },
  {
    question: "How does the circular economy affect WLC assessment?",
    answer: "Circular economy principles can reduce WLC through: (1) Design for disassembly enabling material reuse, (2) Specifying recycled content materials, (3) Designing modular systems that can be relocated, (4) Selecting equipment with take-back schemes. Module D credits can be claimed for demonstrated reuse/recycling potential, though these must be reported separately and cannot offset Modules A-C."
  },
  {
    question: "What MEP systems have the highest embodied carbon impact?",
    answer: "Highest impact MEP systems typically include: (1) Refrigeration and cooling plant due to refrigerants and copper content, (2) Electrical distribution due to copper cabling and transformer cores, (3) Ductwork and pipework due to steel/copper mass, (4) Photovoltaic systems due to silicon and aluminium content. However, PV and heat pumps often achieve carbon payback within 2-5 years through operational savings."
  },
  {
    question: "Is WLC assessment mandatory in the UK?",
    answer: "Currently, WLC assessment is required for London Plan referral projects (2021 onwards) and many local authorities are adopting requirements. The UK Government's Net Zero Strategy signals mandatory WLC reporting is likely. BREEAM Outstanding now requires WLC assessment, and many clients specify it contractually. The 2025 Building Regulations review may introduce WLC requirements nationally."
  }
];

const HNCModule6Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6">
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
            <span>Module 6.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Whole Life Carbon Assessment
          </h1>
          <p className="text-white/80">
            RICS methodology, life cycle stages, data sources, benchmarking, and reduction strategies for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>WLC:</strong> Embodied + operational carbon over 60 years</li>
              <li className="pl-1"><strong>Modules A-D:</strong> Product, construction, use, end-of-life</li>
              <li className="pl-1"><strong>Data sources:</strong> EPDs, ICE database, manufacturer data</li>
              <li className="pl-1"><strong>LETI target:</strong> 600 kgCO2e/m2 by 2030</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP contribution:</strong> 15-25% of building WLC</li>
              <li className="pl-1"><strong>Key drivers:</strong> Copper, refrigerants, replacement cycles</li>
              <li className="pl-1"><strong>Reduction strategies:</strong> Right-sizing, material selection</li>
              <li className="pl-1"><strong>Assessment stages:</strong> RIBA 2, 3, 4, completion</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply RICS whole life carbon methodology to MEP projects",
              "Identify and calculate carbon across all life cycle stages (Modules A-D)",
              "Select appropriate data sources including EPDs and ICE database",
              "Benchmark designs against LETI and RIBA 2030 targets",
              "Implement embodied and operational carbon reduction strategies",
              "Assess MEP system contributions to whole life carbon"
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

        {/* Section 1: RICS Methodology Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RICS Methodology Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RICS Professional Statement "Whole life carbon assessment for the built environment" (2nd edition, 2023)
              provides the standardised methodology for calculating whole life carbon in UK construction projects. It aligns
              with BS EN 15978 and establishes consistent approaches for assessment, reporting, and benchmarking.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RICS WLC Framework Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>System boundary:</strong> Defines what is included/excluded from assessment</li>
                <li className="pl-1"><strong>Study period:</strong> 60 years as standard (can vary for specific building types)</li>
                <li className="pl-1"><strong>Functional unit:</strong> kgCO2e per m2 GIA (Gross Internal Area)</li>
                <li className="pl-1"><strong>Life cycle modules:</strong> A1-A5, B1-B7, C1-C4, D as per EN 15978</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Requirements by RIBA Stage</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">RIBA Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Assessment Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Data Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 2 - Concept</td>
                      <td className="border border-white/10 px-3 py-2">Simplified (elemental)</td>
                      <td className="border border-white/10 px-3 py-2">Benchmark data, early estimates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 3 - Developed</td>
                      <td className="border border-white/10 px-3 py-2">Detailed (system level)</td>
                      <td className="border border-white/10 px-3 py-2">Generic database + some EPDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 4 - Technical</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive (product level)</td>
                      <td className="border border-white/10 px-3 py-2">Product-specific EPDs preferred</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Completion</td>
                      <td className="border border-white/10 px-3 py-2">As-built verification</td>
                      <td className="border border-white/10 px-3 py-2">Actual products, quantities verified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">WLC Calculation Formula</p>
              <div className="font-mono text-sm text-white">
                <p>WLC = Embodied Carbon + Operational Carbon</p>
                <p className="mt-2">WLC = (A1-A5 + B1-B5 + C1-C4) + (B6 + B7)</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="ml-4 text-white/60">A1-A5 = Product & construction stage</p>
                <p className="ml-4 text-white/60">B1-B5 = Use stage (maintenance, replacement)</p>
                <p className="ml-4 text-white/60">B6-B7 = Operational energy and water</p>
                <p className="ml-4 text-white/60">C1-C4 = End-of-life stage</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Module D (benefits beyond system boundary) must be reported separately and cannot offset Modules A-C.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Life Cycle Stages (Modules A-D) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Life Cycle Stages (Modules A-D)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EN 15978 defines life cycle stages using a modular structure. Understanding each module enables
              accurate carbon accounting and identifies reduction opportunities across the building's lifetime.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Module A: Product and Construction Stage</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Module</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A1</td>
                      <td className="border border-white/10 px-3 py-2">Raw material extraction</td>
                      <td className="border border-white/10 px-3 py-2">Copper ore mining, bauxite extraction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A2</td>
                      <td className="border border-white/10 px-3 py-2">Transport to manufacturer</td>
                      <td className="border border-white/10 px-3 py-2">Ore to smelter, components to factory</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A3</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturing</td>
                      <td className="border border-white/10 px-3 py-2">Cable production, AHU assembly, panel wiring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A4</td>
                      <td className="border border-white/10 px-3 py-2">Transport to site</td>
                      <td className="border border-white/10 px-3 py-2">Factory to construction site delivery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A5</td>
                      <td className="border border-white/10 px-3 py-2">Construction/installation</td>
                      <td className="border border-white/10 px-3 py-2">Site energy, waste, temporary works</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Module B: Use Stage</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>B1:</strong> Use (refrigerant leakage)</li>
                  <li className="pl-1"><strong>B2:</strong> Maintenance (filter changes, servicing)</li>
                  <li className="pl-1"><strong>B3:</strong> Repair (component failures)</li>
                  <li className="pl-1"><strong>B4:</strong> Replacement (equipment end-of-life)</li>
                  <li className="pl-1"><strong>B5:</strong> Refurbishment (major upgrades)</li>
                  <li className="pl-1"><strong>B6:</strong> Operational energy use</li>
                  <li className="pl-1"><strong>B7:</strong> Operational water use</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Module C & D: End-of-Life</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>C1:</strong> Deconstruction/demolition</li>
                  <li className="pl-1"><strong>C2:</strong> Transport to waste processing</li>
                  <li className="pl-1"><strong>C3:</strong> Waste processing for reuse/recycling</li>
                  <li className="pl-1"><strong>C4:</strong> Disposal (landfill, incineration)</li>
                  <li className="pl-1"><strong>D:</strong> Reuse/recycling benefits (reported separately)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Module B4 Replacement Calculation</p>
              <div className="text-sm text-white">
                <p>For a 60-year study period with MEP equipment lifespans:</p>
                <p className="mt-2 font-mono">Number of replacements = (Study period / Equipment life) - 1</p>
                <p className="mt-2">Examples:</p>
                <ul className="mt-1 space-y-1">
                  <li>Chiller (25-year life): 60/25 - 1 = 1.4 → 1 replacement</li>
                  <li>LED luminaires (15-year life): 60/15 - 1 = 3 replacements</li>
                  <li>Cable tray (30-year life): 60/30 - 1 = 1 replacement</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>MEP impact:</strong> Module B4 often dominates MEP embodied carbon due to multiple replacement cycles - a key reason to specify durable equipment.
            </p>
          </div>
        </section>

        {/* Section 3: Data Sources and Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Data Sources and Calculation Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate WLC assessment requires reliable carbon data. A hierarchy of data sources ensures
              calculations use the best available information while maintaining transparency about data quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Source Hierarchy (Best to Acceptable)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Data Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Quality</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Product-specific EPD</td>
                      <td className="border border-white/10 px-3 py-2">Highest</td>
                      <td className="border border-white/10 px-3 py-2">Daikin VRV EPD for specific model</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer EPD (product group)</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Schneider switchgear range EPD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Industry-average EPD</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">FETA heat pump average EPD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Generic database (ICE, Ecoinvent)</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable</td>
                      <td className="border border-white/10 px-3 py-2">ICE v3.0 copper cable factor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Proxy/estimated data</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Similar product extrapolation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key MEP Carbon Factors (ICE v3.0)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Copper (primary): <strong>2.71 kgCO2e/kg</strong></li>
                  <li className="pl-1">Copper (recycled 60%): <strong>1.78 kgCO2e/kg</strong></li>
                  <li className="pl-1">Aluminium (primary): <strong>6.67 kgCO2e/kg</strong></li>
                  <li className="pl-1">Aluminium (recycled): <strong>0.43 kgCO2e/kg</strong></li>
                  <li className="pl-1">Steel (galvanised): <strong>2.76 kgCO2e/kg</strong></li>
                  <li className="pl-1">PVC: <strong>3.10 kgCO2e/kg</strong></li>
                  <li className="pl-1">XLPE insulation: <strong>2.50 kgCO2e/kg</strong></li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Refrigerant GWP Values (AR5)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">R-410A: <strong>2088</strong> GWP100</li>
                  <li className="pl-1">R-32: <strong>675</strong> GWP100</li>
                  <li className="pl-1">R-134a: <strong>1430</strong> GWP100</li>
                  <li className="pl-1">R-1234yf: <strong>4</strong> GWP100</li>
                  <li className="pl-1">R-290 (propane): <strong>3</strong> GWP100</li>
                  <li className="pl-1">R-744 (CO2): <strong>1</strong> GWP100</li>
                  <li className="pl-1">R-717 (ammonia): <strong>0</strong> GWP100</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">EPD Resources for MEP</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EPD International:</strong> epd-international.com - Global programme operator</li>
                <li className="pl-1"><strong>IBU:</strong> ibu-epd.com - German EPD programme (many MEP products)</li>
                <li className="pl-1"><strong>BRE EPD:</strong> greenbooklive.com - UK-verified EPDs</li>
                <li className="pl-1"><strong>One Click LCA:</strong> Built-in database with 200,000+ materials</li>
                <li className="pl-1"><strong>EC3 (Embodied Carbon in Construction Calculator):</strong> Open database</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Document all data sources in the WLC report and clearly identify data quality levels for transparency and future updates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Benchmarking and Reduction Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benchmarking and Reduction Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industry benchmarks provide targets for WLC performance. Understanding these benchmarks and implementing
              reduction strategies enables MEP designers to contribute to decarbonisation goals whilst maintaining system performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LETI and RIBA Whole Life Carbon Targets</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2020 Baseline</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2030 Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2050 Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office</td>
                      <td className="border border-white/10 px-3 py-2">1100 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">600 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">350 kgCO2e/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential</td>
                      <td className="border border-white/10 px-3 py-2">800 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">500 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">300 kgCO2e/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">School</td>
                      <td className="border border-white/10 px-3 py-2">900 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">540 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">325 kgCO2e/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Healthcare</td>
                      <td className="border border-white/10 px-3 py-2">1400 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">800 kgCO2e/m2</td>
                      <td className="border border-white/10 px-3 py-2">500 kgCO2e/m2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Carbon Reduction Hierarchy</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-green-500/10 border-l-4 border-green-500">
                  <p className="text-sm font-medium text-green-400">1. Build Less (Demand Reduction)</p>
                  <p className="text-sm text-white/80 mt-1">Fabric-first approach, passive design, reduce conditioned floor area</p>
                </div>
                <div className="p-3 rounded bg-blue-500/10 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-400">2. Build Clever (Design Optimisation)</p>
                  <p className="text-sm text-white/80 mt-1">Right-size systems, hybrid solutions, efficient distribution</p>
                </div>
                <div className="p-3 rounded bg-yellow-500/10 border-l-4 border-yellow-500">
                  <p className="text-sm font-medium text-yellow-400">3. Build Efficiently (Low Carbon Materials)</p>
                  <p className="text-sm text-white/80 mt-1">Low-GWP refrigerants, recycled content, aluminium cables</p>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border-l-4 border-purple-500">
                  <p className="text-sm font-medium text-purple-400">4. Build for Longevity (Extended Life)</p>
                  <p className="text-sm text-white/80 mt-1">Durable equipment, design for maintenance, modular systems</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Embodied Carbon Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Specify <strong>low-GWP refrigerants</strong> (R-32, R-290)</li>
                  <li className="pl-1">Use <strong>aluminium submains</strong> where feasible</li>
                  <li className="pl-1">Specify <strong>high recycled content</strong> materials</li>
                  <li className="pl-1">Design for <strong>extended equipment life</strong></li>
                  <li className="pl-1">Use <strong>prefabricated modules</strong> (reduced waste)</li>
                  <li className="pl-1">Optimise <strong>cable sizing</strong> (balance Cu vs losses)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Operational Carbon Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Support <strong>fabric-first</strong> to reduce loads</li>
                  <li className="pl-1">Maximise <strong>heat pump COPs</strong> (SCOP &gt;4)</li>
                  <li className="pl-1">Implement <strong>demand-controlled ventilation</strong></li>
                  <li className="pl-1">Use <strong>high-efficiency motors</strong> (IE4/IE5)</li>
                  <li className="pl-1">Integrate <strong>smart controls</strong> and BMS</li>
                  <li className="pl-1">Design for <strong>renewable energy</strong> integration</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Contribution to Building WLC (Typical Office)</p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span>Structure & envelope</span>
                  <span className="font-mono">40-50%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded">
                  <div className="bg-white/50 h-2 rounded" style={{width: '45%'}}></div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span>MEP systems (embodied)</span>
                  <span className="font-mono">15-25%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded">
                  <div className="bg-elec-yellow h-2 rounded" style={{width: '20%'}}></div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span>Operational energy</span>
                  <span className="font-mono">25-35%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded">
                  <div className="bg-blue-400 h-2 rounded" style={{width: '30%'}}></div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span>Finishes, fit-out, other</span>
                  <span className="font-mono">10-15%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded">
                  <div className="bg-purple-400 h-2 rounded" style={{width: '12%'}}></div>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Carbon payback:</strong> Technologies like PV and heat pumps have embodied carbon but typically achieve carbon payback within 2-5 years through operational savings - always assess whole life impact, not just upfront carbon.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Cable Embodied Carbon Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate embodied carbon for 500m of 95mm2 4-core XLPE/SWA copper cable.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p>- Cable mass: 4.2 kg/m (from manufacturer data)</p>
                <p>- Copper content: approximately 65% by mass</p>
                <p>- Steel armour: approximately 20% by mass</p>
                <p>- XLPE/PVC: approximately 15% by mass</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p>Total cable mass = 500m x 4.2 kg/m = 2,100 kg</p>
                <p className="mt-2">Copper = 2,100 x 0.65 x 2.71 kgCO2e/kg = <span className="text-green-400">3,700 kgCO2e</span></p>
                <p>Steel = 2,100 x 0.20 x 2.76 kgCO2e/kg = <span className="text-green-400">1,159 kgCO2e</span></p>
                <p>XLPE/PVC = 2,100 x 0.15 x 2.80 kgCO2e/kg = <span className="text-green-400">882 kgCO2e</span></p>
                <p className="mt-2 text-green-400">Total A1-A3 = 5,741 kgCO2e (5.74 tCO2e)</p>
                <p className="mt-2 text-white/60">Note: If using aluminium conductor equivalent:</p>
                <p>Al mass for 95mm2 equivalent ≈ 50% of Cu mass</p>
                <p>Al carbon = 1,050 x 0.43 (recycled) = <span className="text-blue-400">451 kgCO2e</span></p>
                <p className="text-blue-400">Saving: ~3,250 kgCO2e (87% reduction on conductor)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Refrigerant Leakage Impact (Module B1)</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare lifetime refrigerant emissions for two 200kW chiller options.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Option A: R-410A chiller</p>
                <p>- Refrigerant charge: 45 kg</p>
                <p>- Annual leakage rate: 5%</p>
                <p>- GWP: 2088</p>
                <p className="mt-2">Initial charge carbon = 45 x 2088 = 93,960 kgCO2e</p>
                <p>Annual leakage = 45 x 0.05 x 2088 = 4,698 kgCO2e/year</p>
                <p>20-year leakage = 4,698 x 20 = <span className="text-red-400">93,960 kgCO2e</span></p>
                <p className="mt-3 text-white/60">Option B: R-32 chiller</p>
                <p>- Refrigerant charge: 35 kg (lower charge)</p>
                <p>- Annual leakage rate: 5%</p>
                <p>- GWP: 675</p>
                <p className="mt-2">Initial charge carbon = 35 x 675 = 23,625 kgCO2e</p>
                <p>20-year leakage = 35 x 0.05 x 675 x 20 = <span className="text-green-400">23,625 kgCO2e</span></p>
                <p className="mt-2 text-green-400">Refrigerant carbon saving: ~70,000 kgCO2e (70 tCO2e)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Module B4 Replacement Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate 60-year embodied carbon for LED lighting installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p>- 200 LED luminaires at 8 kgCO2e each (A1-A3)</p>
                <p>- LED driver life: 15 years</p>
                <p>- LED module life: 15 years</p>
                <p>- Housing reuse potential: 60 years</p>
                <p className="mt-2 text-white/60">Initial installation (A1-A3):</p>
                <p>200 x 8 = <span className="text-green-400">1,600 kgCO2e</span></p>
                <p className="mt-2 text-white/60">Replacements over 60 years (B4):</p>
                <p>Number of driver/module replacements = 60/15 - 1 = 3</p>
                <p>Replacement carbon (driver + LED) = 4 kgCO2e per luminaire</p>
                <p>B4 = 200 x 4 x 3 = <span className="text-green-400">2,400 kgCO2e</span></p>
                <p className="mt-2 text-white/60">Total lighting WLC:</p>
                <p>A1-A3 + B4 = 1,600 + 2,400 = <span className="text-green-400">4,000 kgCO2e</span></p>
                <p className="text-white/60 mt-2">Note: B4 is 60% of total - longer-life LEDs reduce WLC significantly</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">WLC Assessment Checklist for MEP</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define system boundary - which MEP systems are included?</li>
                <li className="pl-1">Establish study period (60 years standard) and equipment lifespans</li>
                <li className="pl-1">Collect bill of quantities for all MEP elements</li>
                <li className="pl-1">Source carbon data (prioritise EPDs over generic databases)</li>
                <li className="pl-1">Calculate A1-A5 (upfront) carbon for all equipment and materials</li>
                <li className="pl-1">Include B1 refrigerant leakage for HVAC systems</li>
                <li className="pl-1">Calculate B4 replacement cycles based on equipment lifespans</li>
                <li className="pl-1">Model B6 operational energy using dynamic simulation</li>
                <li className="pl-1">Benchmark against LETI/RIBA targets for the building type</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Benchmark Values</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">LETI 2030 WLC target: <strong>600 kgCO2e/m2</strong> (non-domestic)</li>
                <li className="pl-1">MEP embodied carbon: <strong>15-25%</strong> of building total</li>
                <li className="pl-1">MEP services benchmark: <strong>100-200 kgCO2e/m2</strong></li>
                <li className="pl-1">Standard study period: <strong>60 years</strong></li>
                <li className="pl-1">Typical equipment lives: HVAC plant 20-25 years, lighting 15 years</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring B4 replacements</strong> - can double MEP embodied carbon</li>
                <li className="pl-1"><strong>Using outdated carbon factors</strong> - grid decarbonisation changes B6</li>
                <li className="pl-1"><strong>Omitting refrigerant leakage</strong> - can be 50%+ of HVAC carbon</li>
                <li className="pl-1"><strong>Mixing data quality levels</strong> without documentation</li>
                <li className="pl-1"><strong>Including Module D in main totals</strong> - must report separately</li>
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
                <p className="font-medium text-white mb-1">Life Cycle Modules</p>
                <ul className="space-y-0.5">
                  <li>A1-A3: Product stage (cradle-to-gate)</li>
                  <li>A4-A5: Construction stage</li>
                  <li>B1-B7: Use stage (inc. operational)</li>
                  <li>C1-C4: End-of-life stage</li>
                  <li>D: Benefits beyond boundary</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LETI 2030 Targets</p>
                <ul className="space-y-0.5">
                  <li>Office: 600 kgCO2e/m2</li>
                  <li>Residential: 500 kgCO2e/m2</li>
                  <li>School: 540 kgCO2e/m2</li>
                  <li>Healthcare: 800 kgCO2e/m2</li>
                  <li>Study period: 60 years</li>
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
            <Link to="../h-n-c-module6-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6-5">
              Next: Section 6.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section6_4;
