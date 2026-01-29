import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Future Load Allowances - HNC Module 4 Section 1.5";
const DESCRIPTION = "Master future load planning for building services: capacity allowances, spare ways, diversity growth, EV charging provision, and adapting to technology changes.";

const quickCheckQuestions = [
  {
    id: "growth-allowance",
    question: "What is a typical growth allowance for new commercial building electrical installations?",
    options: ["5-10%", "15-20%", "20-30%", "40-50%"],
    correctIndex: 2,
    explanation: "20-30% growth allowance is typically recommended for commercial buildings to accommodate future load increases, technology changes, and tenant requirements."
  },
  {
    id: "spare-ways",
    question: "BS 7671 recommends spare ways in distribution boards for:",
    options: ["Aesthetic purposes", "Future circuit additions", "Improving power factor", "Reducing harmonics"],
    correctIndex: 1,
    explanation: "Spare ways (typically 20-30% of total ways) allow for future circuit additions without replacing distribution boards, reducing disruption and cost."
  },
  {
    id: "ev-allowance",
    question: "For a new office building, what EV charging allowance per parking space is typically considered?",
    options: ["0.5-1 kVA", "2-4 kVA", "7-22 kVA per space", "50 kVA total"],
    correctIndex: 1,
    explanation: "2-4 kVA per parking space (with smart charging/load management) is typical for workplace EV provision, though this depends on expected utilisation and charging strategy."
  },
  {
    id: "technology-change",
    question: "When planning for technology changes, which approach is most appropriate?",
    options: ["Install maximum capacity now", "Design for flexibility with adequate spare capacity", "Wait until technology settles", "Only consider current requirements"],
    correctIndex: 1,
    explanation: "Design for flexibility allows adaptation to technology changes. Adequate spare capacity in infrastructure (cable routes, switchgear, supply) enables future upgrades without major works."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is future load allowance important in building design?",
    options: [
      "To maximise initial construction cost",
      "To avoid expensive retrofitting when loads increase",
      "To comply with Part L regulations",
      "To reduce initial cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Retrofitting electrical infrastructure is typically 3-5 times more expensive than initial provision. Adequate allowances avoid disruption and cost when loads inevitably increase."
  },
  {
    id: 2,
    question: "Which element is typically most difficult to upgrade later?",
    options: ["Distribution boards", "Final circuits", "Main cable routes and risers", "Light fittings"],
    correctAnswer: 2,
    explanation: "Main cable routes, risers, and infrastructure are integrated into the building structure. Upgrading them often requires significant construction work and business disruption."
  },
  {
    id: 3,
    question: "A building is designed with 500 kVA supply capacity. What maximum demand should be used for initial loads?",
    options: ["500 kVA (use full capacity)", "400-425 kVA (15-20% spare)", "350-400 kVA (20-30% spare)", "250 kVA (50% spare)"],
    correctAnswer: 2,
    explanation: "Initial loads should typically be 70-80% of supply capacity, leaving 20-30% for growth. A 500 kVA supply should serve 350-400 kVA initial demand."
  },
  {
    id: 4,
    question: "For a new residential development, EV charging provision should consider:",
    options: [
      "Only current EV ownership rates",
      "Building Regulations requirements and future EV adoption",
      "Installing maximum chargers immediately",
      "Ignoring EV as a temporary trend"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations now require EV infrastructure in new buildings. Design should consider 2030/2035 petrol/diesel phase-out targets and likely EV adoption growth."
  },
  {
    id: 5,
    question: "What is 'future-proofing' in electrical installation design?",
    options: [
      "Over-engineering everything",
      "Designing infrastructure that can adapt to changing requirements",
      "Using the most expensive equipment",
      "Installing the largest possible supply"
    ],
    correctAnswer: 1,
    explanation: "Future-proofing means designing adaptable infrastructure - adequate capacity, flexible distribution, accessible routes - without excessive over-engineering that wastes resources."
  },
  {
    id: 6,
    question: "Heat pump adoption is driving increased electrical demand because:",
    options: [
      "Heat pumps are inefficient",
      "Replacing gas heating with electric heat pumps significantly increases electricity demand",
      "Heat pumps require three-phase supply",
      "Heat pumps produce harmonics"
    ],
    correctAnswer: 1,
    explanation: "Decarbonisation means replacing gas boilers with electric heat pumps. Even with COP of 3-4, this adds significant winter electrical demand, often doubling or trebling dwelling electricity use."
  },
  {
    id: 7,
    question: "When sizing spare ways in distribution boards, what percentage is typically recommended?",
    options: ["5-10%", "10-15%", "20-30%", "50%"],
    correctAnswer: 2,
    explanation: "20-30% spare ways is typical best practice, allowing for future circuit additions, circuit splits, and unforeseen requirements without replacing distribution boards."
  },
  {
    id: 8,
    question: "Which factor has most significantly increased office small power allowances in recent years?",
    options: [
      "Paper shredders",
      "Electric kettles",
      "IT equipment density and personal devices",
      "Desk fans"
    ],
    correctAnswer: 2,
    explanation: "IT equipment density (multiple monitors, docking stations, personal devices) has significantly increased desk-level power demand, though this is partially offset by more efficient equipment."
  },
  {
    id: 9,
    question: "For a speculative office development (unknown tenant), what approach to electrical design is appropriate?",
    options: [
      "Design for minimum loads",
      "Wait for tenant confirmation",
      "Design to industry benchmarks with flexibility",
      "Install only lighting circuits"
    ],
    correctAnswer: 2,
    explanation: "Speculative developments should be designed to CIBSE/BCO benchmarks with flexibility for tenant fit-out. Infrastructure (risers, main distribution) should accommodate reasonable tenant variation."
  },
  {
    id: 10,
    question: "What is the main challenge with battery energy storage system (BESS) provision?",
    options: [
      "Battery technology is unreliable",
      "Space, weight, ventilation, and connection capacity requirements",
      "Batteries are not permitted in buildings",
      "BESS only works with renewable generation"
    ],
    correctAnswer: 1,
    explanation: "BESS requires significant space, structural support for weight, ventilation/fire suppression, and electrical capacity for charging. Future-proofing should consider where BESS might be located."
  }
];

const faqs = [
  {
    question: "How much spare capacity should I allow in a new building?",
    answer: "As a general rule: 20-30% spare capacity in supply infrastructure, 20-30% spare ways in distribution boards, 30% spare capacity in cable containment routes. Adjust based on building type, expected tenant requirements, and technology trajectory (e.g., higher for buildings likely to electrify heating)."
  },
  {
    question: "Should I install EV chargers now or just the infrastructure?",
    answer: "Building Regulations typically require a minimum number of active chargers plus cabling or cable routes for remaining spaces. 'EV-ready' (full cabling, no charger) and 'EV-enabled' (cable routes only) provide options. Consider initial demand, available capacity, and smart charging potential."
  },
  {
    question: "How do I account for building electrification (heat pumps, no gas)?",
    answer: "All-electric buildings have significantly higher electrical demand, especially in winter. Heat pumps add 5-15 kW per dwelling. Design heating-dominated loads with appropriate diversity, allow for thermal storage (hot water, building fabric), and consider demand-side response capability."
  },
  {
    question: "What's the cost-benefit of spare capacity vs. just-in-time upgrades?",
    answer: "Marginal cost of additional capacity during construction is typically 10-20% of the retrofit cost. A £10,000 larger initial cable might avoid a £50,000+ retrofit. However, excessive over-provision ties up capital and may never be used. Balance based on building life, flexibility needs, and upgrade complexity."
  },
  {
    question: "How should I plan for data centre-style loads in offices?",
    answer: "Modern offices may have server rooms or high-density IT areas. Allow for dedicated cooling, UPS provision, and higher power density (500-1000 W/m² vs. standard 25 W/m²). Identify likely locations and design infrastructure to serve them, even if not initially fitted out."
  },
  {
    question: "What technologies should I be planning for that don't exist widely today?",
    answer: "Consider: on-site battery storage (BESS), vehicle-to-building (V2B) energy flow, on-site renewable generation expansion, smart grid interaction, local DC distribution, automated demand response. Design infrastructure that can accommodate these without major structural or capacity constraints."
  }
];

const HNCModule4Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Future Load Allowances
          </h1>
          <p className="text-white/80">
            Planning for growth, technology changes, and evolving building requirements in electrical system design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Growth allowance:</strong> Typically 20-30% spare capacity</li>
              <li className="pl-1"><strong>Spare ways:</strong> 20-30% in distribution boards</li>
              <li className="pl-1"><strong>Containment:</strong> 30% spare capacity for cables</li>
              <li className="pl-1"><strong>Flexibility:</strong> Design for adaptation, not just current needs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>EV charging:</strong> Major growth driver</li>
              <li className="pl-1"><strong>Heat pumps:</strong> Electrification of heating</li>
              <li className="pl-1"><strong>IT density:</strong> Increasing desk-level loads</li>
              <li className="pl-1"><strong>BESS:</strong> Battery storage provision</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply appropriate growth allowances to electrical system design",
              "Plan spare capacity in distribution boards and containment",
              "Design for EV charging infrastructure requirements",
              "Account for building electrification trends",
              "Balance future-proofing against cost constraints",
              "Identify technology changes affecting electrical design"
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

        {/* Section 1: Capacity Planning Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Capacity Planning Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building electrical systems typically have a 30-50 year lifespan, during which requirements
              will inevitably change. Effective capacity planning balances current needs against future
              flexibility without excessive over-engineering.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Growth Allowances by Building Element</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Allowance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main supply capacity</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">DNO upgrades expensive and slow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer rating</td>
                      <td className="border border-white/10 px-3 py-2">20-25%</td>
                      <td className="border border-white/10 px-3 py-2">Replacement requires outage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">25-30% spare ways</td>
                      <td className="border border-white/10 px-3 py-2">Extensions possible but costly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">20-30% spare ways</td>
                      <td className="border border-white/10 px-3 py-2">Future circuits, circuit splits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable containment</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                      <td className="border border-white/10 px-3 py-2">Additional cables easily added</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Riser capacity</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">Structural modifications difficult</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Busbar trunking</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">Tap-off flexibility valuable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Cost-Benefit Equation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Marginal cost of extra capacity:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Larger cable: +10-20%</li>
                    <li>More DB ways: +5-15%</li>
                    <li>Larger containment: +15-25%</li>
                    <li>Higher supply capacity: +10-30%</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Retrofit cost multiple:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Replace cables: 3-5× initial</li>
                    <li>New DB: 2-3× initial</li>
                    <li>New containment: 5-10× initial</li>
                    <li>Supply upgrade: 3-10× initial</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design philosophy:</strong> Infrastructure that is difficult to upgrade later warrants higher allowances; elements easily added can be more tightly specified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Spare Ways and Distribution */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Spare Ways and Distribution Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution board sizing must account for both current circuits and future additions.
              Undersized boards lead to expensive replacements or inappropriate circuit sharing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Sizing Guidance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Spare</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic consumer unit</td>
                      <td className="border border-white/10 px-3 py-2">2-4 ways</td>
                      <td className="border border-white/10 px-3 py-2">EV, heat pump, additions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small commercial DB</td>
                      <td className="border border-white/10 px-3 py-2">20-25%</td>
                      <td className="border border-white/10 px-3 py-2">Tenant changes, circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office floor DB</td>
                      <td className="border border-white/10 px-3 py-2">25-30%</td>
                      <td className="border border-white/10 px-3 py-2">Flexible fit-out expected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial DB</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">Process changes, machinery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">25-30%</td>
                      <td className="border border-white/10 px-3 py-2">Major outage to extend</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Spare Provision</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Spare Ways (fitted blanks)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Circuit breaker position available</li>
                    <li>Busbars rated for future load</li>
                    <li>Quick addition of new circuits</li>
                    <li>Cost: Minimal additional</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Space for Extension</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Physical space adjacent to DB</li>
                    <li>Busbar extension possible</li>
                    <li>Allows significant expansion</li>
                    <li>Cost: Planning only</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Future Circuit Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">EV charging points (7-22 kW each)</li>
                <li className="pl-1">Additional small power circuits for desk density changes</li>
                <li className="pl-1">Dedicated circuits for high-power equipment</li>
                <li className="pl-1">Circuit splits to reduce discrimination issues</li>
                <li className="pl-1">New mechanical equipment (fan coils, pumps)</li>
                <li className="pl-1">Building automation and control systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Label spare ways with 'SPARE' and record capacity availability in building O&M documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: EV Charging Provision */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            EV Charging Provision
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicle charging is a major driver of increased electrical demand. Building Regulations
              now require EV infrastructure in new buildings, and existing buildings face growing retrofit demand.
            </p>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Building Regulations Requirements (Part S)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>New residential:</strong> 1 charge point per dwelling with parking</li>
                <li className="pl-1"><strong>New non-residential:</strong> 1 charge point per 5 spaces, cable routes for remainder</li>
                <li className="pl-1"><strong>Major renovation:</strong> Similar requirements apply</li>
                <li className="pl-1"><strong>Minimum rating:</strong> 7 kW (Mode 3)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Infrastructure Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Investment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active (charge point)</td>
                      <td className="border border-white/10 px-3 py-2">Full charger installed and operational</td>
                      <td className="border border-white/10 px-3 py-2">Full cost now</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EV Ready</td>
                      <td className="border border-white/10 px-3 py-2">Full cabling installed, no charger</td>
                      <td className="border border-white/10 px-3 py-2">~70% of active cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EV Enabled</td>
                      <td className="border border-white/10 px-3 py-2">Cable routes and DB capacity only</td>
                      <td className="border border-white/10 px-3 py-2">~30% of active cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Nothing</td>
                      <td className="border border-white/10 px-3 py-2">No provision</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit 3-5× cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Management Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unmanaged:</strong> Full power to all chargers simultaneously (7-22 kW each)</li>
                <li className="pl-1"><strong>Static load management:</strong> Fixed reduced power per charger (e.g., 3.7 kW)</li>
                <li className="pl-1"><strong>Dynamic load management:</strong> Intelligent sharing of available capacity</li>
                <li className="pl-1"><strong>Smart charging:</strong> Time-of-use optimisation, grid response capability</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacity Allowance Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scenario</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Per Space Allowance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential (home)</td>
                      <td className="border border-white/10 px-3 py-2">7 kW</td>
                      <td className="border border-white/10 px-3 py-2">Overnight charging, high diversity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Workplace (smart)</td>
                      <td className="border border-white/10 px-3 py-2">2-4 kVA diversified</td>
                      <td className="border border-white/10 px-3 py-2">All-day dwell, load management</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail/destination</td>
                      <td className="border border-white/10 px-3 py-2">7-22 kW</td>
                      <td className="border border-white/10 px-3 py-2">Short dwell, faster charging needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fleet depot</td>
                      <td className="border border-white/10 px-3 py-2">7-22 kW per vehicle</td>
                      <td className="border border-white/10 px-3 py-2">Managed overnight charging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key consideration:</strong> The 2030 new car sales deadline means EV penetration will accelerate significantly. Plan for 50%+ EV by 2030, 80%+ by 2040.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Technology Changes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Adapting to Technology Changes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building electrical systems must adapt to technologies that may not exist widely today.
              Designing for flexibility rather than specific technologies reduces future obsolescence risk.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Technology Trends Affecting Electrical Design</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Building Electrification</p>
                  <p className="text-sm text-white/80">Heat pumps replacing gas boilers significantly increases electrical demand, particularly winter peak. Consider 3-5× current heating-related electrical load.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">On-Site Generation & Storage</p>
                  <p className="text-sm text-white/80">Solar PV, battery storage (BESS), and vehicle-to-building (V2B) require bidirectional power flow capability and grid interface equipment.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Smart Grid Interaction</p>
                  <p className="text-sm text-white/80">Demand response, flexible loads, and grid services require intelligent monitoring, control systems, and potentially export capability.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Increased IT Density</p>
                  <p className="text-sm text-white/80">Edge computing, IoT devices, and personal technology continue to increase distributed power demand across buildings.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Future-Proofing Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Infrastructure Provision</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat pumps</td>
                      <td className="border border-white/10 px-3 py-2">Additional supply capacity, three-phase provision, space for outdoor units</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery storage (BESS)</td>
                      <td className="border border-white/10 px-3 py-2">Identified location with ventilation, structural support, cabling route to main switchboard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar PV expansion</td>
                      <td className="border border-white/10 px-3 py-2">Roof structural allowance, inverter space, DC cabling routes, export metering capability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vehicle-to-building (V2B)</td>
                      <td className="border border-white/10 px-3 py-2">Bidirectional charger provision, anti-islanding protection, control system integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC distribution</td>
                      <td className="border border-white/10 px-3 py-2">Segregated containment routes, space for DC distribution equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Net Zero Building Implications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All-electric buildings have 2-3× the electrical demand of gas-heated equivalents</li>
                <li className="pl-1">Demand-side flexibility becomes essential for grid stability</li>
                <li className="pl-1">On-site generation and storage may become standard</li>
                <li className="pl-1">Electrical infrastructure is a key enabler of decarbonisation</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design principle:</strong> Build infrastructure for flexibility. Specific equipment can be added when technologies mature; infrastructure is costly to retrofit.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Building Growth Allowance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A new 10,000m² office has calculated initial demand of 650 kVA. What supply capacity should be requested?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Initial demand: 650 kVA</p>
                <p>Growth allowance: 25% recommended for office</p>
                <p className="mt-2">Design capacity = 650 × 1.25 = 812 kVA</p>
                <p className="mt-2">Round to standard sizes:</p>
                <p>Request: <strong>800 kVA or 1000 kVA supply</strong></p>
                <p className="text-white/60 mt-2">Note: If EV charging for 100 spaces, add ~200 kVA diversified</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: EV Charging Capacity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A workplace has 200 parking spaces. Estimate EV charging capacity with smart load management.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Parking spaces: 200</p>
                <p>Active charge points (Part S min): 200 ÷ 5 = 40</p>
                <p className="mt-2">Unmanaged capacity: 40 × 7kW = 280 kW</p>
                <p>With smart management (diversity ~0.4): 280 × 0.4 = 112 kW</p>
                <p className="mt-2">Future provision (100% spaces):</p>
                <p>200 spaces × 2.5 kVA diversified = 500 kVA potential</p>
                <p className="mt-2">Recommended allowance: <strong>150-200 kVA initially</strong></p>
                <p className="text-white/60">Design infrastructure for 500 kVA expansion</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Distribution Board Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office floor requires 24 circuits initially. Size the distribution board.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Initial circuits: 24</p>
                <p>Spare allowance: 25%</p>
                <p>Total ways needed: 24 × 1.25 = 30 ways</p>
                <p className="mt-2">Standard DB sizes: 24, 36, 48 ways (typical)</p>
                <p className="mt-2">Select: <strong>36-way distribution board</strong></p>
                <p className="text-white/60 mt-2">Provides 12 spare ways (33% spare) - good flexibility</p>
                <p className="text-green-400 mt-2">Consider 48-way if tenant flexibility expected</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Future Load Planning Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Apply appropriate growth allowances by building element</li>
                <li className="pl-1">Plan EV charging to Building Regulations minimum plus growth</li>
                <li className="pl-1">Consider building electrification (heat pumps, no gas)</li>
                <li className="pl-1">Size containment for 30-40% additional cables</li>
                <li className="pl-1">Identify BESS and generation locations</li>
                <li className="pl-1">Document spare capacity in O&M information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Supply growth allowance: <strong>20-30%</strong></li>
                <li className="pl-1">Spare ways: <strong>20-30%</strong></li>
                <li className="pl-1">Containment spare: <strong>30-40%</strong></li>
                <li className="pl-1">EV diversified: <strong>2-4 kVA/space</strong> (workplace)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No EV provision</strong> — Building Regulations now require it</li>
                <li className="pl-1"><strong>Tight containment</strong> — Future cables impossible without new routes</li>
                <li className="pl-1"><strong>Ignoring electrification</strong> — Heat pump demand is significant</li>
                <li className="pl-1"><strong>No spare documentation</strong> — Lost knowledge of available capacity</li>
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
                <p className="font-medium text-white mb-1">Capacity Allowances</p>
                <ul className="space-y-0.5">
                  <li>Supply capacity: 20-30% spare</li>
                  <li>Distribution boards: 20-30% spare ways</li>
                  <li>Containment: 30-40% spare</li>
                  <li>Risers: 30-50% spare</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EV Provision</p>
                <ul className="space-y-0.5">
                  <li>Part S: 1 per 5 non-residential spaces</li>
                  <li>Workplace diversified: 2-4 kVA/space</li>
                  <li>Residential: 7 kW per dwelling</li>
                  <li>Smart management essential for scale</li>
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
            <Link to="../h-n-c-module4-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Harmonic Assessment
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1-6">
              Next: Building Services Load Profiles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section1_5;
