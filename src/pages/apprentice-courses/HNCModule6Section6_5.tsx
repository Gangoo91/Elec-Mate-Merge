import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Circular Economy Principles - HNC Module 6 Section 6.5";
const DESCRIPTION = "Master circular economy principles for building services: design for disassembly, material passports, component reuse strategies, modular design, lease models, and end-of-life planning for sustainable electrical installations.";

const quickCheckQuestions = [
  {
    id: "circular-definition",
    question: "What is the fundamental principle of a circular economy?",
    options: ["Maximising production output", "Eliminating waste through continuous reuse of materials and products", "Reducing initial construction costs", "Increasing energy consumption efficiency"],
    correctIndex: 1,
    explanation: "A circular economy aims to eliminate waste and pollution by keeping products and materials in use for as long as possible, regenerating natural systems rather than following a linear take-make-dispose model."
  },
  {
    id: "design-disassembly",
    question: "What is the primary goal of design for disassembly (DfD)?",
    options: ["Making demolition faster", "Enabling components to be separated and reused at end of life", "Reducing initial installation time", "Simplifying maintenance procedures"],
    correctIndex: 1,
    explanation: "Design for disassembly ensures that building components can be easily separated, recovered, and reused or recycled at end of life, rather than being demolished and sent to landfill."
  },
  {
    id: "material-passport",
    question: "What information does a material passport typically contain?",
    options: ["Only the manufacturer's warranty details", "Composition, origin, environmental data, and end-of-life instructions", "Just the purchase price and supplier", "Building planning permission documents"],
    correctIndex: 1,
    explanation: "Material passports document the composition, origin, environmental impact, maintenance requirements, and end-of-life instructions for building components, enabling informed decisions about reuse and recycling."
  },
  {
    id: "lease-model",
    question: "In a lighting-as-a-service lease model, who typically retains ownership of the luminaires?",
    options: ["The building owner", "The service provider/manufacturer", "The electrical contractor", "The facilities management company"],
    correctIndex: 1,
    explanation: "In product-as-a-service models, the manufacturer or service provider retains ownership of the equipment, incentivising them to design for durability, repairability, and end-of-life recovery."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following best describes the circular economy approach compared to linear economy?",
    options: [
      "Take-make-dispose versus take-make-reuse-recycle",
      "High cost versus low cost production",
      "Manual versus automated manufacturing",
      "Local versus global supply chains"
    ],
    correctAnswer: 0,
    explanation: "The linear economy follows a take-make-dispose model where resources become waste. The circular economy eliminates waste through continuous cycles of reuse, repair, remanufacture, and recycling."
  },
  {
    id: 2,
    question: "What percentage of construction and demolition waste in the UK could potentially be reused or recycled with proper circular design?",
    options: ["30-40%", "50-60%", "70-80%", "90% or more"],
    correctAnswer: 3,
    explanation: "Studies indicate that over 90% of construction and demolition waste could be reused or recycled with proper circular design principles, yet current rates are much lower due to linear design approaches."
  },
  {
    id: 3,
    question: "Which connection type best supports design for disassembly in electrical installations?",
    options: [
      "Welded joints",
      "Adhesive bonding",
      "Mechanical fasteners and plug-in connections",
      "Concrete encasement"
    ],
    correctAnswer: 2,
    explanation: "Mechanical fasteners (bolts, clips, clamps) and plug-in connections allow components to be separated without damage, enabling reuse. Welding, adhesives, and encasement prevent non-destructive separation."
  },
  {
    id: 4,
    question: "A material passport for a distribution board should include:",
    options: [
      "Only the circuit schedule",
      "Component materials, manufacturer data, disassembly instructions, and recycling guidance",
      "Just the test certificates",
      "Only the installation drawings"
    ],
    correctAnswer: 1,
    explanation: "Material passports comprehensively document component materials, manufacturer information, expected lifespan, maintenance requirements, disassembly procedures, and recycling or disposal guidance."
  },
  {
    id: 5,
    question: "What is modular design in the context of circular economy for building services?",
    options: [
      "Installing all systems in a single room",
      "Using standardised, interchangeable components that can be upgraded or replaced independently",
      "Designing only one type of circuit",
      "Minimising the number of components used"
    ],
    correctAnswer: 1,
    explanation: "Modular design uses standardised, interchangeable components allowing individual elements to be upgraded, repaired, or replaced without affecting the entire system, extending overall service life."
  },
  {
    id: 6,
    question: "In a product-as-a-service model for building services, what shifts from the client to the provider?",
    options: [
      "Building ownership",
      "Risk of equipment failure, maintenance responsibility, and end-of-life disposal",
      "Planning permission responsibility",
      "Building insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Product-as-a-service shifts equipment ownership, maintenance responsibility, performance risk, and end-of-life disposal to the provider, who is then incentivised to maximise equipment longevity and recovery."
  },
  {
    id: 7,
    question: "Which strategy reduces the need for new raw materials in electrical installations?",
    options: [
      "Installing larger cables than required",
      "Using reclaimed and refurbished components where standards permit",
      "Specifying the newest equipment only",
      "Avoiding maintenance to reduce interventions"
    ],
    correctAnswer: 1,
    explanation: "Reclaimed and refurbished components reduce demand for virgin materials. Many electrical components like containment, some luminaires, and switchgear can be refurbished to meet required standards."
  },
  {
    id: 8,
    question: "What is the primary barrier to implementing circular economy principles in UK electrical installations?",
    options: [
      "Lack of available technology",
      "Building regulations prohibiting reuse",
      "Linear supply chains and contractual arrangements favouring new products",
      "Electricians refusing to use circular methods"
    ],
    correctAnswer: 2,
    explanation: "Traditional procurement, contractual arrangements, and supply chains are designed around new products. Shifting to circular models requires changes in contracts, warranties, and business relationships."
  },
  {
    id: 9,
    question: "How does design for disassembly affect initial installation costs?",
    options: [
      "Always significantly increases costs",
      "Has no impact on costs",
      "May have marginally higher initial costs but reduces whole-life costs",
      "Always reduces initial costs"
    ],
    correctAnswer: 2,
    explanation: "DfD may have slightly higher initial costs due to accessible fixings and connections, but these are offset by reduced maintenance costs, easier upgrades, and significant end-of-life value recovery."
  },
  {
    id: 10,
    question: "What role does BIM play in supporting circular economy for building services?",
    options: [
      "None - BIM is only for new construction",
      "Storing material passport data and tracking component lifecycles",
      "Only for creating installation drawings",
      "Calculating energy consumption only"
    ],
    correctAnswer: 1,
    explanation: "BIM can store material passport information, track component age and condition, schedule maintenance, and provide data for end-of-life decisions, making it a key enabler for circular building services."
  },
  {
    id: 11,
    question: "Which approach to cable management best supports circular economy principles?",
    options: [
      "Clipping cables directly to structure",
      "Accessible trunking and containment systems with mechanical fixings",
      "Burying cables in concrete",
      "Using the minimum containment possible"
    ],
    correctAnswer: 1,
    explanation: "Accessible containment with mechanical fixings allows cables to be recovered, containment reused, and routes modified without destructive removal. This contrasts with embedded or clipped installations."
  },
  {
    id: 12,
    question: "What does 'waste hierarchy' prioritise in circular economy thinking?",
    options: [
      "Landfill disposal as the preferred option",
      "Incineration for energy recovery",
      "Prevention, reuse, recycling, recovery, then disposal as last resort",
      "Export of waste to other countries"
    ],
    correctAnswer: 2,
    explanation: "The waste hierarchy prioritises prevention (not creating waste), then reuse, recycling, energy recovery, and finally disposal. Circular economy aims to operate at the top of this hierarchy."
  }
];

const faqs = [
  {
    question: "Can reclaimed electrical components be used legally in UK installations?",
    answer: "Yes, with conditions. Reclaimed components must meet current standards and regulations. Items like cable tray, trunking, and some luminaires can often be reused after inspection. However, safety-critical items like consumer units, RCDs, and protective devices typically require certification that they meet current standards. Always verify compliance with BS 7671 and relevant product standards before reusing components."
  },
  {
    question: "How do material passports differ from O&M manuals?",
    answer: "Material passports go beyond traditional O&M documentation. While O&M manuals focus on operation and maintenance during the building's life, material passports include detailed composition data (materials, chemicals, recyclability), environmental impact information, expected lifespan, and crucially, end-of-life instructions for disassembly, component recovery, and material recycling or safe disposal."
  },
  {
    question: "What is the business case for circular design in building services?",
    answer: "Circular design offers multiple benefits: reduced whole-life costs through easier maintenance and component replacement, potential revenue from recovered materials at end of life, reduced waste disposal costs, improved sustainability credentials for BREEAM/LEED ratings, future-proofing against resource scarcity and disposal regulations, and alignment with growing client demands for sustainable buildings."
  },
  {
    question: "How does lighting-as-a-service work in practice?",
    answer: "In lighting-as-a-service, clients pay a monthly fee for illumination rather than purchasing luminaires. The provider designs, installs, maintains, and eventually recovers the lighting system. They retain ownership and are responsible for performance, repairs, upgrades, and end-of-life recycling. This incentivises providers to specify durable, efficient, and recoverable equipment."
  },
  {
    question: "What skills do electricians need for circular economy installations?",
    answer: "Electricians benefit from understanding: design for disassembly principles and techniques, material identification for recycling, refurbishment assessment skills, digital documentation and BIM basics, product-as-a-service contractual models, and component testing and certification for reuse. These complement traditional installation skills."
  },
  {
    question: "How do BREEAM and other rating systems address circular economy?",
    answer: "BREEAM includes credits for design for disassembly, material efficiency, responsible sourcing, and waste management. Recent versions increasingly reward circular economy approaches including material passports, modular construction, and designing for adaptability. LEED and other systems similarly include circularity-related credits."
  }
];

const HNCModule6Section6_5 = () => {
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
            <span>Module 6.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Circular Economy Principles
          </h1>
          <p className="text-white/80">
            Design for disassembly, material passports, reuse strategies, and waste elimination in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Circular economy:</strong> Eliminate waste through continuous material reuse</li>
              <li className="pl-1"><strong>Design for disassembly:</strong> Enable component recovery at end of life</li>
              <li className="pl-1"><strong>Material passports:</strong> Document composition for future reuse</li>
              <li className="pl-1"><strong>Service models:</strong> Lease products, retain ownership for recovery</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Modular systems:</strong> Standardised, replaceable components</li>
              <li className="pl-1"><strong>Accessible fixings:</strong> Mechanical connections for recovery</li>
              <li className="pl-1"><strong>BIM integration:</strong> Digital tracking of material data</li>
              <li className="pl-1"><strong>Whole-life value:</strong> Recovery reduces total cost of ownership</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply circular economy principles to building services design",
              "Implement design for disassembly strategies in electrical installations",
              "Create and use material passports for component tracking",
              "Evaluate modular design approaches for MEP systems",
              "Compare lease versus purchase models for building services",
              "Develop end-of-life planning strategies for electrical installations"
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

        {/* Section 1: Circular Economy Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Circular Economy Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The circular economy represents a fundamental shift from the traditional linear model of
              take-make-dispose to a regenerative system where materials and products remain in use
              for as long as possible. For building services, this means designing installations that
              can be maintained, upgraded, recovered, and reused rather than demolished and landfilled.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core circular economy principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design out waste:</strong> Eliminate waste and pollution from the outset</li>
                <li className="pl-1"><strong>Keep products in use:</strong> Maximise lifespan through maintenance, repair, and reuse</li>
                <li className="pl-1"><strong>Regenerate natural systems:</strong> Return biological materials safely to the earth</li>
                <li className="pl-1"><strong>Preserve embedded value:</strong> Retain the energy and resources invested in products</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Linear vs Circular Economy Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Linear Economy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Circular Economy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resource flow</td>
                      <td className="border border-white/10 px-3 py-2">Take → Make → Dispose</td>
                      <td className="border border-white/10 px-3 py-2">Reduce → Reuse → Recycle → Recover</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design focus</td>
                      <td className="border border-white/10 px-3 py-2">Minimum initial cost</td>
                      <td className="border border-white/10 px-3 py-2">Whole-life value and recovery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">End of life</td>
                      <td className="border border-white/10 px-3 py-2">Demolition and landfill</td>
                      <td className="border border-white/10 px-3 py-2">Disassembly and reuse</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ownership model</td>
                      <td className="border border-white/10 px-3 py-2">Purchase and own</td>
                      <td className="border border-white/10 px-3 py-2">Service and lease options</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Material value</td>
                      <td className="border border-white/10 px-3 py-2">Lost at disposal</td>
                      <td className="border border-white/10 px-3 py-2">Recovered and retained</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">UK Construction Waste Statistics</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Construction, demolition and excavation waste: approximately 62% of UK total waste</li>
                <li>• Estimated &gt;90% could be reused or recycled with circular design</li>
                <li>• Building services typically 15-20% of construction material by value</li>
                <li>• Electrical and mechanical systems have significant reuse potential</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Consider the entire lifecycle from extraction through manufacture, installation, operation, maintenance, and end-of-life when specifying building services.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Design for Disassembly */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Design for Disassembly
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Design for disassembly (DfD) ensures building components can be separated and recovered
              at end of life without destruction. For electrical installations, this means specifying
              connection methods, containment systems, and equipment that facilitate non-destructive
              removal and reuse.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Mechanical fixings over adhesives</li>
                  <li className="pl-1">Bolted joints over welded</li>
                  <li className="pl-1">Plug-in connections where possible</li>
                  <li className="pl-1">Accessible fasteners</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Containment Design</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Surface-mounted trunking</li>
                  <li className="pl-1">Removable covers and lids</li>
                  <li className="pl-1">Channel systems with clips</li>
                  <li className="pl-1">Avoid embedded conduit</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Selection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Modular switchgear</li>
                  <li className="pl-1">Plug-in busbar systems</li>
                  <li className="pl-1">Track-mounted luminaires</li>
                  <li className="pl-1">Standardised components</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DfD Strategies for Electrical Installations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Linear Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Circular/DfD Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable containment</td>
                      <td className="border border-white/10 px-3 py-2">Cast into screed, clipped direct</td>
                      <td className="border border-white/10 px-3 py-2">Surface trunking, accessible trays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Flush-mounted, plastered around</td>
                      <td className="border border-white/10 px-3 py-2">Surface-mounted, bolted fixings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Recessed with fixed connections</td>
                      <td className="border border-white/10 px-3 py-2">Track or plug-in systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits</td>
                      <td className="border border-white/10 px-3 py-2">Hard-wired throughout</td>
                      <td className="border border-white/10 px-3 py-2">Prefabricated wiring, connectors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Busbar systems</td>
                      <td className="border border-white/10 px-3 py-2">Custom fabricated, bolted</td>
                      <td className="border border-white/10 px-3 py-2">Plug-in modular systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">DfD Design Checklist</p>
              <ul className="text-sm text-white space-y-1">
                <li>✓ Can each component be removed independently without damaging others?</li>
                <li>✓ Are fixings accessible and of standard sizes?</li>
                <li>✓ Is disassembly sequence logical and documented?</li>
                <li>✓ Are materials compatible for recycling (no composite materials where possible)?</li>
                <li>✓ Are hazardous materials clearly identified and separable?</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Document disassembly sequences and special tool requirements as part of O&M handover to enable future recovery.
            </p>
          </div>
        </section>

        {/* Section 3: Material Passports and Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Material Passports and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Material passports provide comprehensive documentation of building component composition,
              enabling informed decisions about reuse, recycling, and disposal. They go beyond traditional
              O&M manuals to include data essential for circular economy implementation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Material Passport Contents</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Product Information</p>
                  <ul className="text-white/90 space-y-0.5">
                    <li>• Manufacturer and model details</li>
                    <li>• Date of manufacture</li>
                    <li>• Serial/batch numbers</li>
                    <li>• Expected service life</li>
                    <li>• Warranty information</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Material Composition</p>
                  <ul className="text-white/90 space-y-0.5">
                    <li>• Material types and quantities</li>
                    <li>• Hazardous substance content</li>
                    <li>• Recyclability ratings</li>
                    <li>• Embodied carbon data</li>
                    <li>• Source/origin information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Passport Data Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Data Elements</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Identity</td>
                      <td className="border border-white/10 px-3 py-2">Unique ID, location, installation date</td>
                      <td className="border border-white/10 px-3 py-2">Tracking and inventory</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Composition</td>
                      <td className="border border-white/10 px-3 py-2">Materials, weights, certifications</td>
                      <td className="border border-white/10 px-3 py-2">Recycling decisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Environmental</td>
                      <td className="border border-white/10 px-3 py-2">Embodied carbon, EPD data</td>
                      <td className="border border-white/10 px-3 py-2">Sustainability reporting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Service history, condition, remaining life</td>
                      <td className="border border-white/10 px-3 py-2">Reuse assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">End of life</td>
                      <td className="border border-white/10 px-3 py-2">Disassembly instructions, disposal guidance</td>
                      <td className="border border-white/10 px-3 py-2">Recovery planning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BIM Integration for Material Passports</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Object properties:</strong> Material data attached to BIM objects</li>
                <li className="pl-1"><strong>Asset tagging:</strong> QR codes linking physical items to digital records</li>
                <li className="pl-1"><strong>Lifecycle tracking:</strong> Maintenance events recorded against components</li>
                <li className="pl-1"><strong>Quantity extraction:</strong> Automated material schedules for recovery planning</li>
                <li className="pl-1"><strong>Interoperability:</strong> Data exchange with circular economy platforms</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Distribution Board Material Passport Entry</p>
              <div className="text-sm space-y-1 font-mono">
                <p><span className="text-white/60">Asset ID:</span> <span className="text-white">DB-L2-01</span></p>
                <p><span className="text-white/60">Manufacturer:</span> <span className="text-white">Schneider Electric</span></p>
                <p><span className="text-white/60">Model:</span> <span className="text-white">Prisma Plus P 400A</span></p>
                <p><span className="text-white/60">Install date:</span> <span className="text-white">2024-03-15</span></p>
                <p><span className="text-white/60">Expected life:</span> <span className="text-white">25 years</span></p>
                <p><span className="text-white/60">Steel content:</span> <span className="text-white">45kg (recyclable)</span></p>
                <p><span className="text-white/60">Copper content:</span> <span className="text-white">12kg (recyclable)</span></p>
                <p><span className="text-white/60">Plastic content:</span> <span className="text-white">8kg (PP - recyclable)</span></p>
                <p><span className="text-white/60">Disassembly:</span> <span className="text-white">See procedure DIS-DB-001</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Link material passport data to building management systems to track component age, condition, and trigger end-of-life planning automatically.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Circular Business Models and End-of-Life Planning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Circular Business Models and End-of-Life Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circular economy implementation requires new business models that incentivise longevity,
              repairability, and material recovery. Product-as-a-service models shift equipment ownership
              to providers who benefit from designing for durability and end-of-life value.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Business Model Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Model</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ownership</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Incentives</th>
                      <th className="border border-white/10 px-3 py-2 text-left">End of Life</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Traditional purchase</td>
                      <td className="border border-white/10 px-3 py-2">Client owns</td>
                      <td className="border border-white/10 px-3 py-2">Low initial cost</td>
                      <td className="border border-white/10 px-3 py-2">Client disposal responsibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lease/rental</td>
                      <td className="border border-white/10 px-3 py-2">Provider owns</td>
                      <td className="border border-white/10 px-3 py-2">Provider maintains asset value</td>
                      <td className="border border-white/10 px-3 py-2">Provider recovery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Product-as-a-service</td>
                      <td className="border border-white/10 px-3 py-2">Provider owns</td>
                      <td className="border border-white/10 px-3 py-2">Performance and longevity</td>
                      <td className="border border-white/10 px-3 py-2">Provider reuse/recycle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Take-back schemes</td>
                      <td className="border border-white/10 px-3 py-2">Client owns</td>
                      <td className="border border-white/10 px-3 py-2">Recovery discount</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer recovery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting-as-a-Service Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No capital expenditure required</li>
                  <li className="pl-1">Guaranteed light levels maintained</li>
                  <li className="pl-1">Technology upgrades included</li>
                  <li className="pl-1">Provider optimises for efficiency</li>
                  <li className="pl-1">End-of-life recovery assured</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">End-of-Life Planning Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Component inventory and conditions</li>
                  <li className="pl-1">Disassembly sequence documentation</li>
                  <li className="pl-1">Reuse market identification</li>
                  <li className="pl-1">Recycling routes for materials</li>
                  <li className="pl-1">Hazardous material handling</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Waste Hierarchy Application</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>1. Prevention:</strong> Design for longevity, avoid over-specification</p>
                <p><strong>2. Reuse:</strong> Recover whole components for use elsewhere</p>
                <p><strong>3. Recycling:</strong> Separate materials for reprocessing</p>
                <p><strong>4. Recovery:</strong> Extract energy from materials that cannot be recycled</p>
                <p><strong>5. Disposal:</strong> Landfill only as absolute last resort</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Component Reuse Potential</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reuse Potential</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable tray/trunking</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Inspect for damage, clean</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminaire housings</td>
                      <td className="border border-white/10 px-3 py-2">Medium-High</td>
                      <td className="border border-white/10 px-3 py-2">Replace lamps/drivers, test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switchgear enclosures</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Refurbishment required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Low-Medium</td>
                      <td className="border border-white/10 px-3 py-2">Insulation testing, length limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective devices</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Standards compliance critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Regulatory note:</strong> Reused components must comply with current standards. WEEE regulations apply to electrical equipment disposal, requiring proper handling of hazardous materials.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Refurbishment Circular Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design electrical installation for a 10,000m² office refurbishment with circular economy principles.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Circular design strategies applied:</p>
                <p className="mt-2">Containment system:</p>
                <p className="ml-4">- Surface-mounted perimeter trunking (recoverable)</p>
                <p className="ml-4">- Raised floor distribution boxes (accessible)</p>
                <p className="ml-4">- Mechanical fixings throughout (no adhesives)</p>
                <p className="mt-2">Lighting system:</p>
                <p className="ml-4">- Track-mounted LED luminaires</p>
                <p className="ml-4">- Lighting-as-a-service contract (5-year)</p>
                <p className="ml-4">- Provider responsible for upgrades and recovery</p>
                <p className="mt-2">Power distribution:</p>
                <p className="ml-4">- Plug-in busbar risers</p>
                <p className="ml-4">- Modular floor boxes with RJ45 power</p>
                <p className="ml-4">- Surface DB installation with bolted fixings</p>
                <p className="mt-2 text-green-400">Estimated 85% material recovery potential at end of life</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Material Passport Implementation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Create material passport system for new commercial building services.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Implementation steps:</p>
                <p className="mt-2">1. BIM model setup:</p>
                <p className="ml-4">- Add material passport properties to object templates</p>
                <p className="ml-4">- Create custom parameters for circular data</p>
                <p className="mt-2">2. Data collection:</p>
                <p className="ml-4">- Request EPDs from manufacturers</p>
                <p className="ml-4">- Obtain material composition declarations</p>
                <p className="ml-4">- Document disassembly procedures</p>
                <p className="mt-2">3. Physical tagging:</p>
                <p className="ml-4">- QR codes on major components</p>
                <p className="ml-4">- Links to digital records</p>
                <p className="mt-2">4. Handover:</p>
                <p className="ml-4">- Export material schedules</p>
                <p className="ml-4">- Integrate with FM system</p>
                <p className="ml-4">- Train facilities team</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: End-of-Life Value Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Estimate recovery value for electrical installation in building due for demolition.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Component inventory and values:</p>
                <p className="mt-2">Cable tray (galvanised steel): 2,500kg</p>
                <p className="ml-4">- Condition: Good, reusable</p>
                <p className="ml-4">- Reuse value: £3,500</p>
                <p className="ml-4">- Scrap value: £1,250</p>
                <p className="mt-2">Copper cables: 1,800kg</p>
                <p className="ml-4">- Recycling value: £9,000 (at £5/kg)</p>
                <p className="mt-2">LED luminaires (500 units):</p>
                <p className="ml-4">- Condition: Functional, 4 years old</p>
                <p className="ml-4">- Reuse value: £25,000</p>
                <p className="ml-4">- Recycling value: £2,500</p>
                <p className="mt-2 border-t border-white/20 pt-2">Total potential recovery:</p>
                <p className="ml-4 text-green-400">Optimised (DfD): £37,500</p>
                <p className="ml-4 text-red-400">Demolition (linear): £12,750</p>
                <p className="mt-2 text-green-400">Circular approach benefit: £24,750</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Circular Design Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Specify mechanical fixings over adhesives and welding where practical</li>
                <li className="pl-1">Require accessible containment systems with removable covers</li>
                <li className="pl-1">Include material passport data requirements in specifications</li>
                <li className="pl-1">Consider product-as-a-service options for suitable systems</li>
                <li className="pl-1">Request manufacturer take-back commitments</li>
                <li className="pl-1">Document disassembly procedures in O&M manuals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Circular Economy Metrics</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Material recovery rate: <strong>&gt;90% target</strong></li>
                <li className="pl-1">Recycled content: Track percentage by value and weight</li>
                <li className="pl-1">Disassembly time: Measure vs traditional demolition</li>
                <li className="pl-1">Reuse value: Calculate potential end-of-life recovery</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Barriers to Address</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Initial cost focus:</strong> Present whole-life cost case including recovery value</li>
                <li className="pl-1"><strong>Standards compliance:</strong> Ensure reclaimed items meet current regulations</li>
                <li className="pl-1"><strong>Supply chain:</strong> Develop relationships with recovery and reuse providers</li>
                <li className="pl-1"><strong>Warranties:</strong> Negotiate appropriate terms for circular products</li>
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
                <p className="font-medium text-white mb-1">Circular Economy Principles</p>
                <ul className="space-y-0.5">
                  <li>Design out waste and pollution</li>
                  <li>Keep products and materials in use</li>
                  <li>Regenerate natural systems</li>
                  <li>Preserve embedded value</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DfD Strategies</p>
                <ul className="space-y-0.5">
                  <li>Mechanical fixings over adhesives</li>
                  <li>Accessible containment systems</li>
                  <li>Modular, standardised components</li>
                  <li>Documented disassembly sequences</li>
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
            <Link to="../h-n-c-module6-section6-6">
              Next: Section 6.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section6_5;
