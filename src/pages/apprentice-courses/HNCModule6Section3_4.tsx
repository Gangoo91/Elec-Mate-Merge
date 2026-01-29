import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BREEAM Materials and Waste - HNC Module 6 Section 3.4";
const DESCRIPTION = "Master BREEAM Materials and Waste categories: responsible sourcing (Mat 03), life cycle assessment (Mat 01), construction waste management (Wst 01), operational waste (Wst 02), Environmental Product Declarations, and circular economy principles for MEP systems.";

const quickCheckQuestions = [
  {
    id: "mat01-purpose",
    question: "What is the primary purpose of BREEAM Mat 01 (Environmental Impacts from Construction Products)?",
    options: ["To measure construction programme duration", "To assess life cycle environmental impacts of building materials using LCA methodology", "To calculate material costs for the project", "To verify supplier delivery schedules"],
    correctIndex: 1,
    explanation: "Mat 01 assesses the life cycle environmental impacts of building materials using Life Cycle Assessment (LCA) methodology, encouraging specification of materials with lower embodied carbon and reduced environmental burden across their entire life cycle."
  },
  {
    id: "responsible-sourcing",
    question: "Which BREEAM issue specifically addresses responsible sourcing of construction products?",
    options: ["Mat 01", "Mat 02", "Mat 03", "Wst 01"],
    correctIndex: 2,
    explanation: "Mat 03 (Responsible Sourcing of Construction Products) specifically addresses responsible sourcing, requiring materials to be sourced from suppliers with certified environmental management systems and responsible sourcing certification schemes such as BES 6001."
  },
  {
    id: "construction-waste",
    question: "What does BREEAM Wst 01 require for construction waste management?",
    options: ["All waste must be sent to landfill", "A Resource Management Plan setting diversion targets from landfill", "Only hazardous waste tracking", "No waste monitoring is required"],
    correctIndex: 1,
    explanation: "Wst 01 requires a Resource Management Plan (RMP) that sets targets for diverting construction waste from landfill, monitors actual waste arisings, and demonstrates commitment to reducing, reusing, and recycling construction materials."
  },
  {
    id: "circular-economy",
    question: "How does circular economy thinking apply to MEP material selection?",
    options: ["Use the cheapest materials regardless of recyclability", "Design for disassembly, specify recyclable materials, and consider end-of-life recovery", "Install materials that cannot be removed", "Ignore material life cycle considerations"],
    correctIndex: 1,
    explanation: "Circular economy principles in MEP specification involve designing for disassembly (mechanical fixings over adhesives), specifying materials with high recycled content and recyclability, and considering how components can be recovered, refurbished, or recycled at end of life."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What documentation is required to demonstrate compliance with BREEAM Mat 01 credits?",
    options: [
      "Supplier invoices only",
      "Environmental Product Declarations (EPDs) or equivalent LCA data",
      "Material safety data sheets",
      "Building control approval"
    ],
    correctAnswer: 1,
    explanation: "Mat 01 credits require Environmental Product Declarations (EPDs) compliant with EN 15804, or equivalent LCA data calculated using recognised methodologies, to demonstrate the environmental impacts of specified materials."
  },
  {
    id: 2,
    question: "In BREEAM Mat 03, what level of responsible sourcing certification is required for the highest credits?",
    options: ["No certification required", "Any supplier statement", "Third-party certified schemes such as BES 6001 or FSC", "Self-declared environmental policies"],
    correctAnswer: 2,
    explanation: "Maximum Mat 03 credits require third-party certified responsible sourcing schemes such as BES 6001 (construction products) or FSC/PEFC (timber), providing verified evidence of sustainable supply chain management."
  },
  {
    id: 3,
    question: "What minimum percentage of construction waste diversion from landfill typically earns BREEAM Wst 01 credits?",
    options: ["50%", "70%", "85%", "95%"],
    correctAnswer: 1,
    explanation: "BREEAM Wst 01 typically requires a minimum 70% diversion of non-hazardous construction waste from landfill for baseline credits, with higher percentages (up to 95%) earning additional credits depending on the scheme version."
  },
  {
    id: 4,
    question: "Which MEP materials are most relevant for Mat 03 responsible sourcing credits?",
    options: [
      "Only structural steel",
      "Copper cables, steel containment, pipework, and ductwork",
      "Paint and finishes only",
      "Concrete and masonry"
    ],
    correctAnswer: 1,
    explanation: "Key MEP materials for Mat 03 include copper cables and conductors, steel cable containment and supports, copper and steel pipework, galvanised steel ductwork, and aluminium components - all of which can be sourced from certified suppliers."
  },
  {
    id: 5,
    question: "What does an Environmental Product Declaration (EPD) provide?",
    options: [
      "Product installation instructions",
      "Verified environmental impact data across defined life cycle stages",
      "Warranty information",
      "Pricing and lead time data"
    ],
    correctAnswer: 1,
    explanation: "An EPD provides independently verified environmental impact data covering defined life cycle stages (typically A1-A3 cradle-to-gate minimum), including global warming potential, ozone depletion, acidification, and resource depletion metrics."
  },
  {
    id: 6,
    question: "Which BREEAM issue addresses operational waste storage and recycling facilities?",
    options: ["Wst 01", "Wst 02", "Wst 03", "Mat 01"],
    correctAnswer: 1,
    explanation: "Wst 02 (Operational Waste) addresses the provision of adequate space and facilities for segregation and storage of operational recyclable waste, encouraging building users to recycle during the building's operational phase."
  },
  {
    id: 7,
    question: "How does designing for disassembly support circular economy principles?",
    options: [
      "It makes buildings harder to demolish",
      "It enables material recovery and reuse at end of building life",
      "It reduces initial construction costs",
      "It eliminates the need for maintenance"
    ],
    correctAnswer: 1,
    explanation: "Designing for disassembly uses mechanical fixings rather than adhesives, documents material locations, and enables components to be recovered intact for refurbishment or recycling at end of building life, supporting circular material flows."
  },
  {
    id: 8,
    question: "What recycled content consideration applies to copper cables in BREEAM assessments?",
    options: [
      "Copper cables cannot have recycled content",
      "Recycled copper conductors can contribute to recycled content targets",
      "Only new copper is permitted",
      "Recycled content is not tracked for cables"
    ],
    correctAnswer: 1,
    explanation: "Copper cables can specify recycled copper conductors, which contributes to building-level recycled content targets. Copper has excellent recyclability and recycled copper maintains equivalent performance to virgin material."
  },
  {
    id: 9,
    question: "What is the purpose of a Site Waste Management Plan (SWMP) in construction?",
    options: [
      "To plan site security arrangements",
      "To forecast, record, and manage construction waste arisings and disposal routes",
      "To schedule material deliveries",
      "To track labour productivity"
    ],
    correctAnswer: 1,
    explanation: "A SWMP forecasts expected waste types and quantities, identifies reduction and reuse opportunities, sets recycling targets, records actual waste arisings, and demonstrates compliance with waste management regulations and BREEAM requirements."
  },
  {
    id: 10,
    question: "Which standard defines the methodology for Environmental Product Declarations in construction?",
    options: ["BS 7671", "EN 15804", "ISO 9001", "CIBSE Guide A"],
    correctAnswer: 1,
    explanation: "EN 15804 (Sustainability of Construction Works - Environmental Product Declarations) defines the core product category rules for construction products, ensuring EPDs are calculated consistently and can be compared across suppliers."
  },
  {
    id: 11,
    question: "How can MEP contractors contribute to Wst 01 construction waste credits?",
    options: [
      "By disposing of all waste in general skips",
      "By segregating waste, returning packaging, and using prefabrication to reduce site waste",
      "By ignoring waste requirements",
      "By disposing of waste off-site without records"
    ],
    correctAnswer: 1,
    explanation: "MEP contractors contribute by segregating metals, plastics, and cardboard; returning cable drums and packaging to suppliers; using off-site prefabrication to reduce site waste; and maintaining accurate waste transfer documentation."
  },
  {
    id: 12,
    question: "What is embodied carbon in the context of building materials?",
    options: [
      "The carbon released during building operation",
      "The total greenhouse gas emissions from extraction, manufacture, and transport of materials",
      "The carbon stored in timber products",
      "The carbon footprint of building users"
    ],
    correctAnswer: 1,
    explanation: "Embodied carbon represents the total greenhouse gas emissions associated with material extraction, manufacturing, transportation, and installation (life cycle stages A1-A5). It is a key metric in Mat 01 LCA assessments."
  }
];

const faqs = [
  {
    question: "How do EPDs differ from manufacturer environmental claims?",
    answer: "Environmental Product Declarations (EPDs) are independently verified by accredited third parties against EN 15804 methodology, providing standardised and comparable environmental impact data. Unlike self-declared manufacturer claims, EPDs undergo rigorous verification processes, must follow specific calculation rules, and cover defined life cycle stages. This verification gives assessors confidence in the data and ensures consistency when comparing products from different manufacturers."
  },
  {
    question: "What responsible sourcing schemes are recognised by BREEAM for MEP materials?",
    answer: "For general construction products, BES 6001 (Responsible Sourcing of Construction Products) is the primary scheme. For steel and aluminium, schemes include ISO 14001 with additional supply chain verification. Copper can be sourced through Copper Mark certified suppliers. FSC and PEFC certification applies to any timber components. BREEAM recognises tiered certification levels, with higher credits available for more comprehensive third-party certification."
  },
  {
    question: "How should electrical contractors manage cable waste on BREEAM projects?",
    answer: "Cable offcuts (copper and aluminium) should be segregated and collected for recycling - copper has high recycling value and excellent recyclability. Cable drums should be returned to suppliers under take-back arrangements. Packaging including cardboard reels and plastic wrap should be separated for recycling. Accurate records of waste quantities and disposal routes must be maintained for BREEAM evidence, with waste transfer notes retained for all movements."
  },
  {
    question: "What is the relationship between BREEAM materials credits and Whole Life Carbon assessment?",
    answer: "Mat 01 LCA credits feed into the broader Whole Life Carbon assessment, covering embodied impacts (modules A1-A5). BREEAM increasingly aligns with RICS Whole Life Carbon methodology, requiring assessment of operational carbon (modules B1-B7) and end-of-life impacts (modules C1-C4). Together, these provide a complete picture of building carbon across its entire life cycle, informing both specification decisions and operational strategies."
  },
  {
    question: "How can prefabrication support BREEAM waste credits?",
    answer: "Off-site prefabrication (such as modular wiring, pre-assembled risers, and factory-built plantrooms) reduces site waste by enabling controlled cutting and material optimisation in factory conditions. Offcuts can be reused immediately in subsequent production. Packaging is consolidated and more easily recycled. Studies show prefabrication can reduce construction waste by 50-90% compared to traditional site assembly, directly supporting Wst 01 targets."
  },
  {
    question: "What documentation must MEP subcontractors provide for BREEAM materials evidence?",
    answer: "Subcontractors should provide: product specifications confirming material types; EPDs or manufacturer LCA data for key products; responsible sourcing certificates (BES 6001, ISO 14001); evidence of recycled content where claimed; waste transfer notes showing disposal routes; delivery notes confirming quantities installed; and any take-back scheme confirmations. Early engagement with main contractors ensures documentation requirements are understood from project start."
  }
];

const HNCModule6Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3">
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
            <span>Module 6.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BREEAM Materials and Waste
          </h1>
          <p className="text-white/80">
            Responsible sourcing, life cycle impacts, construction waste management, operational waste, and circular economy principles
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Mat 01:</strong> Life Cycle Assessment of construction products</li>
              <li className="pl-1"><strong>Mat 03:</strong> Responsible sourcing certification (BES 6001)</li>
              <li className="pl-1"><strong>Wst 01:</strong> Construction waste diversion targets (70-95%)</li>
              <li className="pl-1"><strong>Wst 02:</strong> Operational waste storage and recycling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">MEP Relevance</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>EPDs:</strong> Required for cables, containment, equipment</li>
              <li className="pl-1"><strong>Copper/Steel:</strong> Key materials for responsible sourcing</li>
              <li className="pl-1"><strong>Waste:</strong> Cable offcuts, packaging, equipment crates</li>
              <li className="pl-1"><strong>Circular:</strong> Design for disassembly and recovery</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Mat 01 LCA methodology to MEP material specification",
              "Understand Environmental Product Declarations and EN 15804",
              "Implement Mat 03 responsible sourcing for cables and containment",
              "Develop Wst 01 compliant construction waste management plans",
              "Design Wst 02 operational waste facilities in building services",
              "Apply circular economy principles to MEP design and installation"
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

        {/* Section 1: Life Cycle Assessment and Mat 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Life Cycle Assessment and Mat 01
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM Mat 01 (Environmental Impacts from Construction Products) drives the selection of materials
              with lower environmental burdens across their entire life cycle. This requires understanding Life
              Cycle Assessment (LCA) methodology and the role of Environmental Product Declarations (EPDs) in
              demonstrating compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Life cycle stages assessed under EN 15804:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>A1-A3 (Product stage):</strong> Raw material extraction, transport to factory, manufacturing</li>
                <li className="pl-1"><strong>A4-A5 (Construction stage):</strong> Transport to site, installation processes</li>
                <li className="pl-1"><strong>B1-B7 (Use stage):</strong> Maintenance, repair, replacement, refurbishment, operational impacts</li>
                <li className="pl-1"><strong>C1-C4 (End of life):</strong> Deconstruction, transport, waste processing, disposal</li>
                <li className="pl-1"><strong>D (Beyond system boundary):</strong> Reuse, recovery, recycling potential</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Impact Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Impact Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Global Warming Potential (GWP)</td>
                      <td className="border border-white/10 px-3 py-2">kg CO2 eq</td>
                      <td className="border border-white/10 px-3 py-2">Embodied carbon of cables, equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ozone Depletion Potential (ODP)</td>
                      <td className="border border-white/10 px-3 py-2">kg CFC-11 eq</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerants, insulation blowing agents</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Acidification Potential (AP)</td>
                      <td className="border border-white/10 px-3 py-2">kg SO2 eq</td>
                      <td className="border border-white/10 px-3 py-2">Metal processing emissions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Eutrophication Potential (EP)</td>
                      <td className="border border-white/10 px-3 py-2">kg PO4 eq</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturing process discharges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Abiotic Depletion (elements)</td>
                      <td className="border border-white/10 px-3 py-2">kg Sb eq</td>
                      <td className="border border-white/10 px-3 py-2">Copper, rare earth elements usage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Mat 01 Credit Guidance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1-3 credits:</strong> Complete LCA using recognised methodology and EPD data</li>
                <li className="pl-1"><strong>Additional credits:</strong> Demonstrate material selection improvements based on LCA</li>
                <li className="pl-1"><strong>Exemplary:</strong> Third-party verified whole building LCA with ambitious targets</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification impact:</strong> MEP materials typically contribute 15-25% of total building embodied carbon, making informed specification crucial for Mat 01 performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Responsible Sourcing - Mat 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Responsible Sourcing - Mat 03
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mat 03 (Responsible Sourcing of Construction Products) ensures materials are sourced from
              organisations with robust environmental management systems and verified sustainable supply
              chains. This applies directly to key MEP materials including copper, steel, aluminium, and
              plastics.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tier 1: Basic</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Legal timber evidence</li>
                  <li className="pl-1">Supplier environmental policy</li>
                  <li className="pl-1">Basic material traceability</li>
                  <li className="pl-1">Minimal credits available</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tier 2: Certified EMS</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">ISO 14001 certification</li>
                  <li className="pl-1">Supply chain assessment</li>
                  <li className="pl-1">Documented procedures</li>
                  <li className="pl-1">Moderate credits</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tier 3: Full Certification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">BES 6001 certification</li>
                  <li className="pl-1">Full supply chain verification</li>
                  <li className="pl-1">Social responsibility included</li>
                  <li className="pl-1">Maximum credits</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key MEP Materials for Responsible Sourcing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Certification Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">Cables, busbars, pipework</td>
                      <td className="border border-white/10 px-3 py-2">Copper Mark, BES 6001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel</td>
                      <td className="border border-white/10 px-3 py-2">Containment, supports, ductwork</td>
                      <td className="border border-white/10 px-3 py-2">BES 6001, ResponsibleSteel</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">Cables, heat exchangers, luminaires</td>
                      <td className="border border-white/10 px-3 py-2">ASI Certification, BES 6001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plastics (PVC, XLPE)</td>
                      <td className="border border-white/10 px-3 py-2">Cable insulation, conduit, trunking</td>
                      <td className="border border-white/10 px-3 py-2">VinylPlus, BES 6001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timber</td>
                      <td className="border border-white/10 px-3 py-2">Packing, temporary supports</td>
                      <td className="border border-white/10 px-3 py-2">FSC, PEFC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Procurement Specification Clause</p>
              <p className="text-sm text-white italic">
                "All copper cables shall be sourced from manufacturers holding current BES 6001 certification
                at minimum 'Very Good' rating, with Copper Mark certification preferred. Evidence of certification
                shall be submitted with material submittals."
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Credit strategy:</strong> Focus responsible sourcing requirements on the largest material volumes - cables, containment, and ductwork typically offer the greatest credit opportunity for MEP packages.
            </p>
          </div>
        </section>

        {/* Section 3: Construction Waste Management - Wst 01 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Construction Waste Management - Wst 01
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wst 01 (Construction Waste Management) requires a comprehensive approach to minimising,
              managing, and reporting construction waste. MEP contractors generate significant waste
              streams including cable offcuts, packaging, and equipment crates that must be properly
              managed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Resource Management Plan Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Pre-construction waste forecast by material type</li>
                <li className="pl-1">Waste minimisation strategies and targets</li>
                <li className="pl-1">Reuse and recycling opportunities identified</li>
                <li className="pl-1">Designated waste storage and segregation areas</li>
                <li className="pl-1">Monitoring procedures and reporting frequency</li>
                <li className="pl-1">Roles and responsibilities for waste management</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wst 01 Credit Benchmarks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Benchmark</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversion Rate</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Waste Generated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum standard</td>
                      <td className="border border-white/10 px-3 py-2">70% from landfill</td>
                      <td className="border border-white/10 px-3 py-2">No specific target</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Good practice</td>
                      <td className="border border-white/10 px-3 py-2">85% from landfill</td>
                      <td className="border border-white/10 px-3 py-2">&lt;7.5 tonnes per 100m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Best practice</td>
                      <td className="border border-white/10 px-3 py-2">95% from landfill</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5.5 tonnes per 100m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exemplary</td>
                      <td className="border border-white/10 px-3 py-2">&gt;95% from landfill</td>
                      <td className="border border-white/10 px-3 py-2">&lt;3.5 tonnes per 100m2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Waste Streams and Management</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Waste Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sources</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper offcuts</td>
                      <td className="border border-white/10 px-3 py-2">Cable installation</td>
                      <td className="border border-white/10 px-3 py-2">Segregate for recycling (high value)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable drums</td>
                      <td className="border border-white/10 px-3 py-2">Cable deliveries</td>
                      <td className="border border-white/10 px-3 py-2">Return to supplier (take-back scheme)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cardboard/packaging</td>
                      <td className="border border-white/10 px-3 py-2">Equipment deliveries</td>
                      <td className="border border-white/10 px-3 py-2">Compact and recycle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plastic packaging</td>
                      <td className="border border-white/10 px-3 py-2">Accessories, fittings</td>
                      <td className="border border-white/10 px-3 py-2">Segregate by type for recycling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel offcuts</td>
                      <td className="border border-white/10 px-3 py-2">Containment, supports</td>
                      <td className="border border-white/10 px-3 py-2">Scrap metal recycling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WEEE</td>
                      <td className="border border-white/10 px-3 py-2">Replaced equipment</td>
                      <td className="border border-white/10 px-3 py-2">Licensed WEEE contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation tip:</strong> Maintain waste transfer notes for all movements off site. Photograph segregated waste storage areas for BREEAM evidence submissions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Operational Waste and Circular Economy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Operational Waste and Circular Economy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wst 02 (Operational Waste) addresses the provision of facilities for waste segregation and
              recycling during building occupation. Circular economy principles extend this thinking to
              consider how MEP materials can be designed for disassembly, reuse, and recovery at end of
              building life.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Wst 02 Operational Waste Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Dedicated space for recyclable waste storage (sized to building occupancy)</li>
                <li className="pl-1">Segregated bins/containers for minimum waste streams (paper, glass, plastic, metals)</li>
                <li className="pl-1">Accessible collection points on each occupied floor</li>
                <li className="pl-1">Adequate lighting and ventilation to waste storage areas</li>
                <li className="pl-1">Clear signage and user guidance</li>
                <li className="pl-1">Consideration of composting facilities for organic waste</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circular Economy Principles for MEP</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Design for Disassembly</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Mechanical fixings over adhesives</li>
                    <li>- Modular, replaceable components</li>
                    <li>- Accessible connections</li>
                    <li>- Documented material locations</li>
                    <li>- Standard sizes and fittings</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Material Recovery Potential</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Copper: Infinitely recyclable</li>
                    <li>- Steel: High recycling rates</li>
                    <li>- Aluminium: Full recyclability</li>
                    <li>- Equipment: Refurbishment potential</li>
                    <li>- Plastics: Type segregation needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Circular Economy Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specify recycled content</td>
                      <td className="border border-white/10 px-3 py-2">Recycled copper cables, steel</td>
                      <td className="border border-white/10 px-3 py-2">Reduces virgin material demand</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modular distribution</td>
                      <td className="border border-white/10 px-3 py-2">Plug-and-play wiring systems</td>
                      <td className="border border-white/10 px-3 py-2">Enables reconfiguration and reuse</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment leasing</td>
                      <td className="border border-white/10 px-3 py-2">Lighting as a service</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer retains ownership/recovery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Material passports</td>
                      <td className="border border-white/10 px-3 py-2">BIM-based material tracking</td>
                      <td className="border border-white/10 px-3 py-2">Enables future recovery planning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standardisation</td>
                      <td className="border border-white/10 px-3 py-2">Common component sizes</td>
                      <td className="border border-white/10 px-3 py-2">Facilitates spare parts and reuse</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Passport Example - Distribution Board</p>
              <div className="text-sm space-y-2">
                <p><strong>Asset:</strong> DB-L2-01 (Level 2 Main Distribution Board)</p>
                <p><strong>Manufacturer:</strong> [Supplier name], Model: [Model reference]</p>
                <p><strong>Materials:</strong> Steel enclosure (22kg, galvanised), Copper busbars (8kg), MCCB/MCB units (15 units)</p>
                <p><strong>Recycled content:</strong> Steel 45% post-consumer, Copper 30% recycled</p>
                <p><strong>Disassembly:</strong> Bolted connections, accessible from front, no adhesives</p>
                <p><strong>End of life:</strong> Steel/copper fully recyclable, MCBs to WEEE recovery</p>
                <p><strong>Certifications:</strong> Steel - BES 6001 Very Good, Copper - Copper Mark</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Future-proofing:</strong> Design flexibility into MEP systems to accommodate future technology changes without complete replacement, extending useful life and deferring material consumption.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: EPD Comparison for Cable Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare two cable suppliers for 100m of 4-core 16mm2 armoured cable based on EPD data.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Supplier A EPD (per 100m cable):</p>
                <p className="ml-4">GWP (A1-A3): 245 kg CO2eq</p>
                <p className="ml-4">Recycled copper content: 25%</p>
                <p className="ml-4">BES 6001 certification: Good</p>
                <p className="mt-2">Supplier B EPD (per 100m cable):</p>
                <p className="ml-4">GWP (A1-A3): 198 kg CO2eq</p>
                <p className="ml-4">Recycled copper content: 45%</p>
                <p className="ml-4">BES 6001 certification: Very Good</p>
                <p className="mt-2 text-green-400">Recommendation: Supplier B offers 19% lower embodied carbon,</p>
                <p className="text-green-400">higher recycled content, and better responsible sourcing tier</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Construction Waste Forecast</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Forecast MEP waste for 5,000m2 office fit-out and set diversion targets.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Forecast waste by type:</p>
                <p className="ml-4">Copper cable offcuts: 150 kg → 100% recycling</p>
                <p className="ml-4">Steel containment offcuts: 400 kg → 100% recycling</p>
                <p className="ml-4">Cardboard packaging: 600 kg → 100% recycling</p>
                <p className="ml-4">Plastic packaging: 200 kg → 80% recycling</p>
                <p className="ml-4">Cable drums: 50 units → 100% return to supplier</p>
                <p className="ml-4">Mixed non-recyclable: 100 kg → Energy from waste</p>
                <p className="mt-2">Total forecast: 1,450 kg + drums</p>
                <p>Target diversion from landfill: 95%</p>
                <p className="text-green-400">Achieved by: Metal recycling, cardboard baling, drum returns</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Circular Economy Design Decision</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design lighting installation for future adaptability and end-of-life recovery.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Traditional approach:</p>
                <p className="ml-4">- Recessed fittings with plaster-in frames</p>
                <p className="ml-4">- Hardwired connections</p>
                <p className="ml-4">- Fixed ceiling grid</p>
                <p className="ml-4">End of life: Difficult recovery, damaged removal</p>
                <p className="mt-2">Circular economy approach:</p>
                <p className="ml-4">- Clip-in suspended fittings</p>
                <p className="ml-4">- Plug-and-play wiring (e.g., Wieland connectors)</p>
                <p className="ml-4">- Accessible ceiling system</p>
                <p className="ml-4">End of life: Intact removal, reuse potential</p>
                <p className="mt-2 text-green-400">Additional benefit: Easy reconfiguration during tenancy changes</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mat 01 Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify major material quantities from design specifications</li>
                <li className="pl-1">Request EPDs from manufacturers during procurement</li>
                <li className="pl-1">Verify EPDs are EN 15804 compliant and cover A1-A3 minimum</li>
                <li className="pl-1">Calculate building-level environmental impacts using approved tool</li>
                <li className="pl-1">Document specification improvements based on LCA comparison</li>
                <li className="pl-1">Retain all EPDs and calculations for BREEAM submission</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Wst 01 minimum diversion: <strong>70% from landfill</strong></li>
                <li className="pl-1">Best practice diversion: <strong>95% from landfill</strong></li>
                <li className="pl-1">Mat 03 top tier: <strong>BES 6001 or equivalent third-party certification</strong></li>
                <li className="pl-1">EPD standard: <strong>EN 15804</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late EPD requests</strong> - Request EPDs at tender stage, not after installation</li>
                <li className="pl-1"><strong>Incomplete waste records</strong> - Ensure all waste movements have transfer notes</li>
                <li className="pl-1"><strong>Mixed waste skips</strong> - Segregation is essential for recycling credits</li>
                <li className="pl-1"><strong>Ignoring packaging</strong> - Packaging waste can exceed installation waste</li>
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
                <p className="font-medium text-white mb-1">BREEAM Materials Issues</p>
                <ul className="space-y-0.5">
                  <li>Mat 01 - Life Cycle Assessment (EPDs)</li>
                  <li>Mat 03 - Responsible Sourcing (BES 6001)</li>
                  <li>Mat 05 - Designing for Durability</li>
                  <li>Mat 06 - Material Efficiency</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BREEAM Waste Issues</p>
                <ul className="space-y-0.5">
                  <li>Wst 01 - Construction Waste (70-95% diversion)</li>
                  <li>Wst 02 - Operational Waste Storage</li>
                  <li>Wst 03 - Operational Waste (where applicable)</li>
                  <li>Wst 05 - Adaptation to Climate Change</li>
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
            <Link to="../h-n-c-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3-5">
              Next: BREEAM Pollution
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section3_4;
