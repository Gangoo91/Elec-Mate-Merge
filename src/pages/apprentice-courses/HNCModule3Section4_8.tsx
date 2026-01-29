import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Applications in Building Distribution Boards - HNC Module 3 Section 4.8";
const DESCRIPTION = "Comprehensive guide to three-phase distribution board design, busbar systems, forms of separation, surge protection, metering and panel scheduling for building services.";

const quickCheckQuestions = [
  {
    id: "form-separation",
    question: "Which Form of separation provides compartmentalisation of functional units AND their terminals?",
    options: ["Form 1", "Form 2", "Form 3", "Form 4"],
    correctIndex: 3,
    explanation: "Form 4 provides the highest level of separation with compartmentalised functional units AND segregated terminals. Form 3 has compartmentalised units but shared terminal spaces."
  },
  {
    id: "spd-type",
    question: "Which SPD Type is typically installed at the main intake?",
    options: ["Type 1 (Class I)", "Type 2 (Class II)", "Type 3 (Class III)", "Type 1+2 combined"],
    correctIndex: 0,
    explanation: "Type 1 SPDs are installed at the origin of the installation to handle direct lightning strikes. Type 2 is for sub-distribution, and Type 3 for final circuits near sensitive equipment."
  },
  {
    id: "busbar-rating",
    question: "A 400A main busbar supplies three 100A outgoing ways. What is the minimum busbar rating for the outgoing section?",
    options: ["100A", "200A", "300A", "400A"],
    correctIndex: 2,
    explanation: "The outgoing busbar section must be rated for the maximum possible load. With three 100A ways, diversity would typically allow 300A (or less), but engineering judgement and actual load analysis is required."
  },
  {
    id: "phase-rotation",
    question: "In a UK three-phase system, what is the standard phase rotation?",
    options: ["L1-L2-L3 (clockwise)", "L3-L2-L1 (anti-clockwise)", "L1-L3-L2", "Any rotation is acceptable"],
    correctIndex: 0,
    explanation: "The UK standard phase rotation is L1-L2-L3 in clockwise sequence (positive sequence). This is critical for motor rotation direction and three-phase equipment operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of busbar segregation in distribution boards?",
    options: [
      "To reduce installation cost",
      "To allow maintenance without total shutdown",
      "To increase current capacity",
      "To improve aesthetics"
    ],
    correctAnswer: 1,
    explanation: "Busbar segregation allows maintenance and modifications to be carried out on individual circuits whilst other circuits remain live, improving operational continuity and safety."
  },
  {
    id: 2,
    question: "According to BS EN 61439, what does IP rating XXB indicate?",
    options: [
      "Protection against dust ingress",
      "Protection against finger contact with live parts",
      "Protection against water spray",
      "Protection against mechanical impact"
    ],
    correctAnswer: 1,
    explanation: "The B designation in IP ratings (e.g., IP2XB) indicates protection against access to hazardous parts using an articulated test finger (12mm diameter, 80mm length)."
  },
  {
    id: 3,
    question: "In a TN-C-S system, where should the main earthing terminal (MET) be located?",
    options: [
      "At the furthest point from the intake",
      "Adjacent to the main distribution board",
      "At each sub-distribution board",
      "External to the building"
    ],
    correctAnswer: 1,
    explanation: "The MET should be located as close as practicable to the main distribution board and incoming supply. It provides the single point of connection for all earthing and bonding conductors."
  },
  {
    id: 4,
    question: "What is the maximum disconnection time for a Type B MCB on a 230V final circuit exceeding 32A?",
    options: ["0.1s", "0.2s", "0.4s", "5s"],
    correctAnswer: 2,
    explanation: "For TN systems with circuits exceeding 32A (but not >32A socket outlets), BS 7671 permits a maximum disconnection time of 0.4s. Final circuits ≤32A require 0.4s, and socket outlets >32A require 0.2s."
  },
  {
    id: 5,
    question: "Which distribution system type uses separate transformers for critical loads?",
    options: ["Type A", "Type B", "Type C", "Type D"],
    correctAnswer: 1,
    explanation: "Type B distribution systems use independent transformers to supply critical and non-critical loads separately, providing enhanced resilience and power quality isolation."
  },
  {
    id: 6,
    question: "A building has 150kVA of lighting (L1), 180kVA of small power (L2), and 200kVA of mechanical services (L3). What is the phase imbalance?",
    options: ["10%", "14%", "18%", "25%"],
    correctAnswer: 1,
    explanation: "Average load = (150+180+200)/3 = 176.7kVA. Maximum deviation = 200-176.7 = 23.3kVA. Imbalance = (23.3/176.7) × 100 = 13.2% ≈ 14%"
  },
  {
    id: 7,
    question: "What SPD residual current (Ires) indicates the device needs replacement?",
    options: [
      "Any visible Ires",
      "Ires > 1mA",
      "When indicator shows fault",
      "When Imax is exceeded"
    ],
    correctAnswer: 2,
    explanation: "SPDs have status indicators (mechanical or electronic) that show when the device has operated beyond its limits. The device should be replaced when the indicator shows a fault condition."
  },
  {
    id: 8,
    question: "In Form 3b construction, what is segregated?",
    options: [
      "Busbars only",
      "Functional units from busbars",
      "Functional units, busbars, and terminals from each other",
      "Functional units and terminals, but busbars are common"
    ],
    correctAnswer: 2,
    explanation: "Form 3b provides separation of functional units from each other, separation of functional units from busbars, but terminals are not separated from the functional units they serve."
  },
  {
    id: 9,
    question: "What is the purpose of a Type Test Certificate for distribution boards?",
    options: [
      "To verify installation correctness",
      "To confirm the design meets BS EN 61439",
      "To record commissioning results",
      "To satisfy the DNO requirements"
    ],
    correctAnswer: 1,
    explanation: "A Type Test Certificate demonstrates that the distribution board design has been tested to BS EN 61439 standards, including temperature rise, dielectric properties, and short-circuit withstand capability."
  },
  {
    id: 10,
    question: "What information must be included on a panel schedule for each circuit?",
    options: [
      "Circuit number, description, and cable size only",
      "Circuit number, protective device rating, cable size, and load",
      "Circuit number, protective device rating, cable size, load, and design current",
      "All of the above plus phase allocation and route"
    ],
    correctAnswer: 3,
    explanation: "A comprehensive panel schedule includes circuit number, description, protective device details, cable size, design current, connected load, phase allocation, cable route, and reference to the as-built drawings."
  }
];

const faqs = [
  {
    question: "What is the difference between Form 2 and Form 3 separation?",
    answer: "Form 2 provides separation of busbars from functional units (e.g., MCBs behind a busbar cover), whereas Form 3 adds compartmentalisation between functional units themselves. Form 3 is common in main switchboards where individual sections may need isolation for maintenance whilst adjacent sections remain live."
  },
  {
    question: "Why is phase rotation important in three-phase distribution?",
    answer: "Phase rotation (sequence) determines the direction of rotation for three-phase motors and must be consistent throughout an installation. Incorrect phase sequence can cause motors to run backwards, pumps to operate in reverse, or protection relays to malfunction. UK standard is L1-L2-L3 clockwise (positive sequence)."
  },
  {
    question: "When are Type 1 SPDs mandatory under BS 7671?",
    answer: "Type 1 SPDs are required when the building is supplied by or incorporates overhead lines exposed to direct lightning strikes. This includes rural installations, buildings with external antenna masts, and structures where lightning protection systems (LPS) are installed. The 18th Edition also requires risk assessment for all installations."
  },
  {
    question: "How do I calculate the required busbar rating for a distribution board?",
    answer: "Busbar rating must consider: (1) Maximum design current including future capacity, (2) Diversity factors per BS 7671 Appendix 1, (3) Temperature rise limits from BS EN 61439, (4) Short-circuit withstand (Icw) matching the prospective fault current, and (5) Harmonic current effects (multiply neutral by 1.45 for LED/IT loads)."
  },
  {
    question: "What documentation is required for a new distribution board installation?",
    answer: "Required documentation includes: Panel schedule with all circuit details, single-line diagram, as-built drawings, Type Test Certificate or Design Verification, Routine Test Certificate, BS 7671 Schedule of Inspections, Schedule of Test Results, Electrical Installation Certificate, and operation/maintenance manual."
  },
  {
    question: "How should phase allocation be determined for load balancing?",
    answer: "Phase allocation should aim for equal loading across all three phases. Group similar loads (lighting, small power, mechanical) and distribute across phases. Monitor actual consumption post-installation and re-allocate if imbalance exceeds 10-15%. Record allocations on panel schedules and as-built drawings for future modifications."
  }
];

const HNCModule3Section4_8 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
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
            <span>Module 3.4.8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Applications in Building Distribution Boards
          </h1>
          <p className="text-white/80">
            Practical design and installation of three-phase distribution systems for commercial and industrial buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Distribution boards:</strong> Control and distribute power throughout buildings</li>
              <li className="pl-1"><strong>Forms 1-4:</strong> Levels of internal segregation per BS EN 61439</li>
              <li className="pl-1"><strong>SPDs:</strong> Types 1, 2, 3 for coordinated surge protection</li>
              <li className="pl-1"><strong>Panel schedules:</strong> Essential as-built documentation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Main switchboard:</strong> Intake, metering, main protection</li>
              <li className="pl-1"><strong>Sub-distribution:</strong> Floor/zone boards, final circuits</li>
              <li className="pl-1"><strong>Load balancing:</strong> Phase allocation for efficiency</li>
              <li className="pl-1"><strong>Documentation:</strong> Schedules, diagrams, O&M manuals</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain three-phase distribution board construction and components",
              "Apply busbar ratings and coordination principles",
              "Implement phase allocation strategies for load balancing",
              "Distinguish between Type A, B, and C distribution systems",
              "Specify and coordinate surge protection devices (SPDs)",
              "Interpret Forms of separation (Form 1-4) per BS EN 61439",
              "Design metering and monitoring arrangements",
              "Prepare comprehensive panel schedules and as-built documentation"
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

        {/* Section 1: Three-Phase Distribution Board Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Three-Phase Distribution Board Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern distribution boards are the nerve centres of building electrical systems, housing protection,
              switching, metering, and increasingly, intelligent monitoring equipment. Understanding their
              construction is essential for specification, installation, and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Enclosure:</strong> Sheet steel or GRP, rated for environment (IP rating)</li>
                <li className="pl-1"><strong>Busbars:</strong> Copper or aluminium conductors for power distribution</li>
                <li className="pl-1"><strong>Main switch/isolator:</strong> Incoming supply control and isolation</li>
                <li className="pl-1"><strong>Protective devices:</strong> MCBs, MCCBs, RCDs, RCBOs</li>
                <li className="pl-1"><strong>Metering:</strong> kWh meters, power analysers, CT chambers</li>
                <li className="pl-1"><strong>Surge protection:</strong> SPDs coordinated with protective devices</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Board Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main LV Switchboard (MSB)</td>
                      <td className="border border-white/10 px-3 py-2">800A - 4000A</td>
                      <td className="border border-white/10 px-3 py-2">Building intake, utility metering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-Main Distribution Board</td>
                      <td className="border border-white/10 px-3 py-2">100A - 800A</td>
                      <td className="border border-white/10 px-3 py-2">Floor/zone distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final Distribution Board</td>
                      <td className="border border-white/10 px-3 py-2">63A - 250A</td>
                      <td className="border border-white/10 px-3 py-2">Final circuits to loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor Control Centre (MCC)</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">HVAC, lifts, pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Essential Services Board</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">Generator/UPS backed supplies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 61439 Requirements</p>
              <p className="text-sm text-white mb-2">
                All low-voltage switchgear assemblies must comply with BS EN 61439-1 (general rules) and
                BS EN 61439-2 (power switchgear). Key requirements include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Rated operational voltage (Ue): 400V AC for three-phase</li>
                <li className="pl-1">Rated current (In): Main busbar and outgoing ways</li>
                <li className="pl-1">Short-circuit withstand (Icw): Must exceed prospective fault current</li>
                <li className="pl-1">IP rating: Minimum IP2X for finger protection</li>
                <li className="pl-1">Temperature rise limits: Maximum 70K at terminals</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Distribution boards must be accessible for operation and maintenance.
              Allow minimum 600mm clear space in front, 1000mm for boards over 200A.
            </p>
          </div>
        </section>

        {/* Section 2: Busbar Systems and Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Busbar Systems and Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbars are the backbone of any distribution system, conducting power from the incoming supply
              to outgoing protective devices. Their design determines the board's current-carrying capacity,
              short-circuit withstand capability, and thermal performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Busbar Materials</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Copper (Cu):</strong> Higher conductivity, compact, industry standard</li>
                  <li className="pl-1"><strong>Aluminium (Al):</strong> Lighter, cheaper, larger cross-section needed</li>
                  <li className="pl-1"><strong>Plating:</strong> Tin or silver for contact surfaces</li>
                  <li className="pl-1"><strong>Insulation:</strong> Heat-shrink sleeves or moulded covers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Capacity Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Cross-sectional area:</strong> Larger = higher capacity</li>
                  <li className="pl-1"><strong>Ambient temperature:</strong> Derate above 35°C</li>
                  <li className="pl-1"><strong>Enclosure ventilation:</strong> Natural or forced cooling</li>
                  <li className="pl-1"><strong>Proximity:</strong> Adjacent busbars reduce capacity</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Copper Busbar Ratings (Natural Cooling, 35°C Ambient)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Dimensions (mm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CSA (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DC/1φ Rating (A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">3φ Rating (A)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20 × 5</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">230</td>
                      <td className="border border-white/10 px-3 py-2">200</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25 × 5</td>
                      <td className="border border-white/10 px-3 py-2">125</td>
                      <td className="border border-white/10 px-3 py-2">275</td>
                      <td className="border border-white/10 px-3 py-2">245</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30 × 5</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">325</td>
                      <td className="border border-white/10 px-3 py-2">290</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40 × 5</td>
                      <td className="border border-white/10 px-3 py-2">200</td>
                      <td className="border border-white/10 px-3 py-2">415</td>
                      <td className="border border-white/10 px-3 py-2">370</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50 × 6</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">575</td>
                      <td className="border border-white/10 px-3 py-2">515</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60 × 6</td>
                      <td className="border border-white/10 px-3 py-2">360</td>
                      <td className="border border-white/10 px-3 py-2">665</td>
                      <td className="border border-white/10 px-3 py-2">595</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80 × 6</td>
                      <td className="border border-white/10 px-3 py-2">480</td>
                      <td className="border border-white/10 px-3 py-2">845</td>
                      <td className="border border-white/10 px-3 py-2">755</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 × 10</td>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">1500</td>
                      <td className="border border-white/10 px-3 py-2">1340</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral Busbar Sizing</p>
              <p className="text-sm text-white">
                For balanced three-phase loads, the neutral carries minimal current. However, with high
                harmonic content from LED lighting, IT equipment, and VFDs, triplen harmonics (3rd, 9th, 15th)
                add in the neutral conductor. BS 7671 recommends:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1"><strong>THD &lt; 33%:</strong> Neutral = Phase size</li>
                <li className="pl-1"><strong>THD 33-45%:</strong> Neutral = 1.45 × Phase size</li>
                <li className="pl-1"><strong>THD &gt; 45%:</strong> Detailed harmonic analysis required</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always verify short-circuit withstand (Icw) rating. A 400A busbar
              may have Icw of 25kA for 1 second - this must exceed the prospective fault current at the
              installation point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Phase Allocation and Load Balancing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Phase Allocation and Load Balancing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective phase allocation ensures balanced loading across all three phases, minimising
              neutral current, reducing losses, and preventing voltage imbalance that can damage
              three-phase equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Balance Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reduced neutral current:</strong> Balanced loads cancel in neutral</li>
                <li className="pl-1"><strong>Lower losses:</strong> I²R losses minimised across system</li>
                <li className="pl-1"><strong>Voltage stability:</strong> Equal voltage drop on all phases</li>
                <li className="pl-1"><strong>Motor protection:</strong> Imbalance causes heating in 3φ motors</li>
                <li className="pl-1"><strong>Transformer efficiency:</strong> Balanced loading optimises capacity</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Allocation Strategy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">L1</td>
                      <td className="border border-white/10 px-3 py-2">Largest continuous load, predictable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power (sockets)</td>
                      <td className="border border-white/10 px-3 py-2">L2</td>
                      <td className="border border-white/10 px-3 py-2">Variable load, high diversity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical services</td>
                      <td className="border border-white/10 px-3 py-2">L3</td>
                      <td className="border border-white/10 px-3 py-2">Motors, pumps, fans (often 3φ)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">L1-L2-L3</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase balanced load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen equipment</td>
                      <td className="border border-white/10 px-3 py-2">Distributed</td>
                      <td className="border border-white/10 px-3 py-2">High load, requires spreading</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Phase Imbalance</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Average load = (IL1 + IL2 + IL3) / 3</p>
                <p>Maximum deviation = Max(|ILn - Average|)</p>
                <p>Imbalance (%) = (Maximum deviation / Average) × 100</p>
                <p className="mt-2 text-white/60">Target: Keep imbalance below 10-15%</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Office Building Phase Allocation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Given loads:</strong> Lighting 45kVA, Small power 60kVA, HVAC 75kVA (3φ)
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Option 1 - Poor allocation:</p>
                <p>L1: 45kVA (lighting) = 45kVA</p>
                <p>L2: 60kVA (small power) = 60kVA</p>
                <p>L3: 25kVA (1/3 HVAC) = 25kVA</p>
                <p className="text-red-400">→ Average: 43.3kVA, Max deviation: 16.7kVA (38.5% imbalance)</p>
                <p className="mt-3">Option 2 - Better allocation:</p>
                <p>L1: 15kVA lighting + 25kVA HVAC = 40kVA</p>
                <p>L2: 15kVA lighting + 25kVA HVAC + 10kVA SP = 50kVA</p>
                <p>L3: 15kVA lighting + 25kVA HVAC + 50kVA SP = 90kVA</p>
                <p className="text-red-400">→ Still poor - need to split small power</p>
                <p className="mt-3">Option 3 - Optimal allocation:</p>
                <p>L1: 15kVA lighting + 25kVA HVAC + 20kVA SP = 60kVA</p>
                <p>L2: 15kVA lighting + 25kVA HVAC + 20kVA SP = 60kVA</p>
                <p>L3: 15kVA lighting + 25kVA HVAC + 20kVA SP = 60kVA</p>
                <p className="text-green-400">→ Perfectly balanced (0% imbalance)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Perfect balance is theoretical. Real-world loads vary continuously.
              Design for reasonable balance at maximum demand, then monitor and adjust post-commissioning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Type A, B, C Distribution Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Type A, B, C Distribution Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice of distribution system architecture affects resilience, power quality, and
              cost. Three main topologies are commonly used in building services, each with distinct
              characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type A - Radial Distribution</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-2">
                <p className="text-sm text-white">
                  <strong>Configuration:</strong> Single source feeds all loads through individual radial circuits.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Simplest and most economical topology</li>
                  <li className="pl-1">Single point of failure at source</li>
                  <li className="pl-1">Suitable for non-critical installations</li>
                  <li className="pl-1">Easy fault location and isolation</li>
                </ul>
                <p className="text-sm text-white/70 italic">
                  Application: Standard offices, retail, residential
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type B - Duplicate/Parallel Sources</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-2">
                <p className="text-sm text-white">
                  <strong>Configuration:</strong> Two independent sources (transformers) with automatic changeover.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Enhanced resilience through source redundancy</li>
                  <li className="pl-1">Automatic transfer switch (ATS) between sources</li>
                  <li className="pl-1">Critical loads can be fed from either source</li>
                  <li className="pl-1">Higher capital cost, improved availability</li>
                </ul>
                <p className="text-sm text-white/70 italic">
                  Application: Data centres, hospitals, critical infrastructure
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type C - Ring Main Distribution</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-2">
                <p className="text-sm text-white">
                  <strong>Configuration:</strong> Closed loop feeds multiple distribution points with alternative paths.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Load can be fed from either direction</li>
                  <li className="pl-1">Section can be isolated without losing supply</li>
                  <li className="pl-1">Complex protection coordination required</li>
                  <li className="pl-1">Higher installation cost, improved reliability</li>
                </ul>
                <p className="text-sm text-white/70 italic">
                  Application: Large industrial sites, campus distributions, hospitals
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Selection Criteria</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type A</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type B</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital cost</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Medium-High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Availability</td>
                      <td className="border border-white/10 px-3 py-2">99.9%</td>
                      <td className="border border-white/10 px-3 py-2">99.99%</td>
                      <td className="border border-white/10 px-3 py-2">99.95%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance flexibility</td>
                      <td className="border border-white/10 px-3 py-2">Limited</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protection complexity</td>
                      <td className="border border-white/10 px-3 py-2">Simple</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Complex</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Expansion capability</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Many buildings use hybrid systems - Type B for critical loads (data,
              life safety) with Type A for general distribution. Cost-benefit analysis should consider
              downtime costs against infrastructure investment.
            </p>
          </div>
        </section>

        {/* Section 5: Surge Protection Devices (SPDs) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Surge Protection Devices (SPDs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transient overvoltages from lightning strikes and switching events can damage electronic
              equipment. SPDs divert surge energy safely to earth, protecting downstream equipment.
              BS 7671 18th Edition significantly strengthened SPD requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IEC Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Installation Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 1</td>
                      <td className="border border-white/10 px-3 py-2">Class I</td>
                      <td className="border border-white/10 px-3 py-2">10/350µs (Iimp)</td>
                      <td className="border border-white/10 px-3 py-2">Origin/main intake</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 2</td>
                      <td className="border border-white/10 px-3 py-2">Class II</td>
                      <td className="border border-white/10 px-3 py-2">8/20µs (In, Imax)</td>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution boards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 3</td>
                      <td className="border border-white/10 px-3 py-2">Class III</td>
                      <td className="border border-white/10 px-3 py-2">1.2/50µs (Uoc)</td>
                      <td className="border border-white/10 px-3 py-2">Point of use/sensitive equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 1+2</td>
                      <td className="border border-white/10 px-3 py-2">Combined</td>
                      <td className="border border-white/10 px-3 py-2">Both waveforms</td>
                      <td className="border border-white/10 px-3 py-2">Compact installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Regulation 443 Requirements</p>
              <p className="text-sm text-white mb-2">
                SPD protection is required when the consequence of overvoltage affects:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Human life (medical facilities, safety systems)</li>
                <li className="pl-1">Public services and cultural heritage</li>
                <li className="pl-1">Commercial/industrial activities</li>
                <li className="pl-1">Large groups of individuals</li>
              </ul>
              <p className="text-sm text-white mt-2">
                <strong>Risk assessment</strong> per BS EN 62305-2 determines necessity. When Crl (risk with lightning)
                exceeds Ct (tolerable risk), SPDs are mandatory.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Selection Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Uc (Max continuous voltage):</strong> ≥ 1.1 × Uo (253V for 230V systems)</li>
                <li className="pl-1"><strong>Up (Voltage protection level):</strong> Lower = better protection</li>
                <li className="pl-1"><strong>In (Nominal discharge current):</strong> Type 2 typically 20kA</li>
                <li className="pl-1"><strong>Imax (Maximum discharge):</strong> Must withstand expected surges</li>
                <li className="pl-1"><strong>Iimp (Impulse current):</strong> Type 1 rated, e.g., 12.5kA</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Coordination</h3>
              <p className="text-sm text-white">
                Multiple SPDs must be coordinated to share surge energy effectively. The distance rule applies:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1"><strong>Cable length &lt; 10m:</strong> Type 2 may protect without Type 1</li>
                <li className="pl-1"><strong>Cable length &gt; 10m:</strong> Coordination inductance required between stages</li>
                <li className="pl-1"><strong>Decoupling:</strong> Some manufacturers provide built-in coordination</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Installation note:</strong> SPD connecting cables should be as short as possible (&lt;0.5m)
              to minimise the voltage drop during surge conditions. Connection in a 'V' arrangement is preferred.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 6: Metering and Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Metering and Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern buildings require comprehensive energy monitoring for billing, efficiency analysis,
              and Building Management System (BMS) integration. Metering strategies range from simple
              fiscal meters to intelligent power monitoring systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metering Hierarchy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fiscal</td>
                      <td className="border border-white/10 px-3 py-2">Incoming supply</td>
                      <td className="border border-white/10 px-3 py-2">Utility billing</td>
                      <td className="border border-white/10 px-3 py-2">DNO meter (MID approved)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Check</td>
                      <td className="border border-white/10 px-3 py-2">Main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">Verify fiscal meter</td>
                      <td className="border border-white/10 px-3 py-2">Power analyser</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-metering</td>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution</td>
                      <td className="border border-white/10 px-3 py-2">Tenant/department billing</td>
                      <td className="border border-white/10 px-3 py-2">MID Class B meter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit</td>
                      <td className="border border-white/10 px-3 py-2">Individual circuits</td>
                      <td className="border border-white/10 px-3 py-2">Energy analysis</td>
                      <td className="border border-white/10 px-3 py-2">CT-based energy monitor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Transformers (CTs)</p>
              <p className="text-sm text-white mb-2">
                CTs enable non-invasive current measurement for metering. Key specifications include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ratio:</strong> Primary current to secondary (e.g., 400/5A, 200/1A)</li>
                <li className="pl-1"><strong>Accuracy class:</strong> 0.2S/0.5S for fiscal, 1.0 for monitoring</li>
                <li className="pl-1"><strong>Burden (VA):</strong> Must match meter input impedance</li>
                <li className="pl-1"><strong>Type:</strong> Ring, split-core, or Rogowski coil</li>
              </ul>
              <p className="text-sm text-white/70 italic mt-2">
                Note: CT secondary circuits must never be open-circuited when energised - dangerous voltages develop.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality Parameters</p>
              <p className="text-sm text-white mb-2">
                Modern power analysers measure far more than simple kWh. Key parameters include:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Energy & Power</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">kWh (active energy)</li>
                    <li className="pl-1">kVArh (reactive energy)</li>
                    <li className="pl-1">kVAh (apparent energy)</li>
                    <li className="pl-1">Power factor</li>
                    <li className="pl-1">Maximum demand</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Power Quality</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">THD (Total Harmonic Distortion)</li>
                    <li className="pl-1">Individual harmonics (up to 40th)</li>
                    <li className="pl-1">Voltage sags/swells</li>
                    <li className="pl-1">Phase imbalance</li>
                    <li className="pl-1">Frequency deviation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration</p>
              <p className="text-sm text-white">
                Energy data typically communicates to Building Management Systems via:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1"><strong>Modbus RTU/TCP:</strong> Most common protocol for meters</li>
                <li className="pl-1"><strong>BACnet:</strong> Native building automation protocol</li>
                <li className="pl-1"><strong>M-Bus:</strong> European metering bus standard</li>
                <li className="pl-1"><strong>Pulse outputs:</strong> Simple kWh pulses (e.g., 1000 imp/kWh)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Specify meter communication requirements early.
              Retro-fitting protocol converters is expensive and adds failure points.
            </p>
          </div>
        </section>

        {/* Section 7: Forms of Separation (Form 1-4) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Forms of Separation (Form 1-4)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 61439 defines Forms of internal separation that determine how different components
              within a switchboard are segregated. Higher forms provide greater safety during maintenance
              and reduced risk of fault propagation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Forms of Separation Overview</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Busbars</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Functional Units</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Terminals</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 1</td>
                      <td className="border border-white/10 px-3 py-2">No separation</td>
                      <td className="border border-white/10 px-3 py-2">No separation</td>
                      <td className="border border-white/10 px-3 py-2">No separation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 2a</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Not separated</td>
                      <td className="border border-white/10 px-3 py-2">Not in same compartment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 2b</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Not separated</td>
                      <td className="border border-white/10 px-3 py-2">In same compartment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 3a</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Not in same compartment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 3b</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">In same compartment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 4a</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Separated (not same)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 4b</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Separated</td>
                      <td className="border border-white/10 px-3 py-2">Separated (same)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Form Selection</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Form 1-2</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Final distribution boards</li>
                    <li className="pl-1">Consumer units</li>
                    <li className="pl-1">Small sub-distribution</li>
                    <li className="pl-1">Non-critical applications</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Form 3-4</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Main switchboards</li>
                    <li className="pl-1">Motor control centres</li>
                    <li className="pl-1">Critical infrastructure</li>
                    <li className="pl-1">Where live maintenance required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Higher Forms</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fault containment:</strong> Arc flash confined to compartment</li>
                <li className="pl-1"><strong>Live maintenance:</strong> Work on one section, others remain live</li>
                <li className="pl-1"><strong>Cable access:</strong> Terminate cables without busbar exposure</li>
                <li className="pl-1"><strong>Future expansion:</strong> Add circuits without shutdown</li>
                <li className="pl-1"><strong>Testing:</strong> Isolate circuits for individual testing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification note:</strong> Form of separation must be specified at tender stage.
              It significantly affects cost and cannot easily be changed post-manufacture.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 8: Panel Schedules and As-Built Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Panel Schedules and As-Built Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation is essential for safe operation, maintenance, and future
              modifications. Panel schedules and as-built drawings form the core of this documentation
              and must be maintained throughout the installation's life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Panel Schedule Requirements</p>
              <p className="text-sm text-white mb-2">
                Every distribution board must have a legible schedule showing:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Circuit number:</strong> Unique identifier matching cable labels</li>
                <li className="pl-1"><strong>Description:</strong> Clear identification of load/area served</li>
                <li className="pl-1"><strong>Protective device:</strong> Type, rating, and characteristics (e.g., B32)</li>
                <li className="pl-1"><strong>Cable size:</strong> Conductor CSA and type (e.g., 4mm² T&E)</li>
                <li className="pl-1"><strong>Phase allocation:</strong> L1, L2, L3 or combination for 3φ</li>
                <li className="pl-1"><strong>Design current (Ib):</strong> Calculated load current</li>
                <li className="pl-1"><strong>Connected load:</strong> kW or kVA rating</li>
                <li className="pl-1"><strong>Cable route:</strong> Reference to cable containment drawings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Panel Schedule Extract</p>
              <div className="overflow-x-auto">
                <table className="text-xs text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-1 text-left">Cct</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Description</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Device</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Cable</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Ph</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Ib(A)</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">1</td>
                      <td className="border border-white/10 px-2 py-1">Lighting - Ground Floor</td>
                      <td className="border border-white/10 px-2 py-1">B16</td>
                      <td className="border border-white/10 px-2 py-1">1.5mm² T&E</td>
                      <td className="border border-white/10 px-2 py-1">L1</td>
                      <td className="border border-white/10 px-2 py-1">8.7</td>
                      <td className="border border-white/10 px-2 py-1">2kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">2</td>
                      <td className="border border-white/10 px-2 py-1">Sockets - Office 1</td>
                      <td className="border border-white/10 px-2 py-1">B32 RCBO</td>
                      <td className="border border-white/10 px-2 py-1">2.5mm² T&E</td>
                      <td className="border border-white/10 px-2 py-1">L2</td>
                      <td className="border border-white/10 px-2 py-1">20</td>
                      <td className="border border-white/10 px-2 py-1">4.6kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">3</td>
                      <td className="border border-white/10 px-2 py-1">AHU-01</td>
                      <td className="border border-white/10 px-2 py-1">D32 3P</td>
                      <td className="border border-white/10 px-2 py-1">4mm² SWA</td>
                      <td className="border border-white/10 px-2 py-1">3φ</td>
                      <td className="border border-white/10 px-2 py-1">18</td>
                      <td className="border border-white/10 px-2 py-1">11kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">4</td>
                      <td className="border border-white/10 px-2 py-1">Server Room A/C</td>
                      <td className="border border-white/10 px-2 py-1">C20</td>
                      <td className="border border-white/10 px-2 py-1">2.5mm² FP200</td>
                      <td className="border border-white/10 px-2 py-1">L3</td>
                      <td className="border border-white/10 px-2 py-1">15</td>
                      <td className="border border-white/10 px-2 py-1">3.5kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">5</td>
                      <td className="border border-white/10 px-2 py-1">Spare</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Documentation Package</p>
              <p className="text-sm text-white mb-2">
                Complete handover documentation should include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single-line diagrams:</strong> Showing all switchgear, protection settings</li>
                <li className="pl-1"><strong>Schematic drawings:</strong> Control circuits, interlocks</li>
                <li className="pl-1"><strong>Cable schedules:</strong> Routes, sizes, containment references</li>
                <li className="pl-1"><strong>Panel schedules:</strong> As described above, laminated inside door</li>
                <li className="pl-1"><strong>Test certificates:</strong> Type test, routine test (BS EN 61439)</li>
                <li className="pl-1"><strong>Installation certificates:</strong> EIC per BS 7671</li>
                <li className="pl-1"><strong>O&M manuals:</strong> Equipment data sheets, maintenance schedules</li>
                <li className="pl-1"><strong>Spare parts list:</strong> Recommended spares, supplier contacts</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Requirements (BS 7671 Regulation 514)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Distribution board designation (e.g., DB-01, MSB)</li>
                <li className="pl-1">Voltage and frequency (400V 50Hz TN-S)</li>
                <li className="pl-1">Prospective fault current (Ipf)</li>
                <li className="pl-1">Maximum demand and diversity applied</li>
                <li className="pl-1">RCD test frequency reminder (if applicable)</li>
                <li className="pl-1">Next inspection date</li>
                <li className="pl-1">Isolator positions (on/off clearly marked)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance requirement:</strong> Panel schedules must be updated whenever circuits
              are added, removed, or modified. Outdated schedules create safety hazards and complicate
              fault finding.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Distribution Board Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify a sub-distribution board for a 3-storey office with
                45kW lighting, 60kW small power, and 30kW HVAC. Prospective fault current is 15kA.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total connected load = 45 + 60 + 30 = 135kW</p>
                <p>Apply diversity (0.8): 135 × 0.8 = 108kW</p>
                <p className="mt-2">Design current at 400V 3φ:</p>
                <p>I = P / (√3 × V × pf) = 108000 / (1.732 × 400 × 0.9)</p>
                <p>I = 108000 / 623.5 = <strong>173A</strong></p>
                <p className="mt-2 text-white/60">Specification:</p>
                <p>• Main incomer: 250A MCCB, 3P+N</p>
                <p>• Busbar rating: 250A, Icw ≥ 15kA for 1s</p>
                <p>• Form of separation: Form 2b (sub-DB)</p>
                <p>• IP rating: IP41 (indoor electrical room)</p>
                <p>• 20% spare ways for future expansion</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: SPD Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select SPDs for a building with overhead line supply.
                Data centre equipment (Category 1) is located 25m from the main DB.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Overhead line → Type 1 SPD required at origin</p>
                <p className="mt-2">Main intake (MSB):</p>
                <p>• Type 1+2 combined SPD</p>
                <p>• Iimp ≥ 12.5kA (10/350µs)</p>
                <p>• Uc ≥ 275V (1.1 × 250V tolerance)</p>
                <p>• Up ≤ 2.5kV</p>
                <p className="mt-2">Sub-DB (data centre, 25m from MSB):</p>
                <p>• Distance &gt; 10m → Type 2 SPD required</p>
                <p>• In ≥ 20kA, Imax ≥ 40kA</p>
                <p>• Up ≤ 1.5kV (Category 1 equipment)</p>
                <p className="mt-2">Server racks (point of use):</p>
                <p>• Type 3 SPD in PDU or rack-mounted</p>
                <p>• Up ≤ 1.0kV for sensitive electronics</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Phase Balance Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A panel schedule shows: L1 = 85A, L2 = 72A, L3 = 93A.
                Calculate the imbalance and neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Average current = (85 + 72 + 93) / 3 = 83.3A</p>
                <p className="mt-2">Maximum deviation = |93 - 83.3| = 9.7A</p>
                <p>Imbalance = (9.7 / 83.3) × 100 = <strong>11.6%</strong></p>
                <p className="mt-2 text-white/60">Neutral current (simplified for unity pf):</p>
                <p>IN = √(IL1² + IL2² + IL3² - IL1·IL2 - IL2·IL3 - IL3·IL1)</p>
                <p>IN = √(7225 + 5184 + 8649 - 6120 - 6696 - 7905)</p>
                <p>IN = √337 = <strong>18.4A</strong></p>
                <p className="mt-2 text-yellow-400">Note: Acceptable imbalance (&lt;15%) but monitor</p>
                <p className="text-white/60">Consider moving 10A from L3 to L2</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify prospective fault current from DNO/upstream protection</li>
                <li className="pl-1">Calculate design current with appropriate diversity</li>
                <li className="pl-1">Select busbar rating exceeding design current + growth margin</li>
                <li className="pl-1">Specify short-circuit withstand (Icw) ≥ Ipf</li>
                <li className="pl-1">Choose appropriate Form of separation</li>
                <li className="pl-1">Include SPD provision (risk assessment per Reg. 443)</li>
                <li className="pl-1">Allow minimum 20% spare ways</li>
                <li className="pl-1">Consider metering requirements (fiscal, check, sub-metering)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards Reference</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS 7671:</strong> IET Wiring Regulations - Installation requirements</li>
                <li className="pl-1"><strong>BS EN 61439-1:</strong> LV switchgear assemblies - General rules</li>
                <li className="pl-1"><strong>BS EN 61439-2:</strong> Power switchgear and controlgear assemblies</li>
                <li className="pl-1"><strong>BS EN 62305:</strong> Lightning protection - Risk assessment</li>
                <li className="pl-1"><strong>BS EN 61643:</strong> Surge protective devices</li>
                <li className="pl-1"><strong>IEC 60364:</strong> Electrical installations in buildings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized neutral:</strong> Ignoring harmonic effects on neutral current</li>
                <li className="pl-1"><strong>Insufficient Icw:</strong> Busbar short-circuit rating below Ipf</li>
                <li className="pl-1"><strong>No spare capacity:</strong> Future additions require new panels</li>
                <li className="pl-1"><strong>Ignoring temperature:</strong> Ambient above 35°C needs derating</li>
                <li className="pl-1"><strong>SPD cable length:</strong> Long connections reduce effectiveness</li>
                <li className="pl-1"><strong>Poor documentation:</strong> Missing or outdated panel schedules</li>
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
                <p className="font-medium text-white mb-1">Distribution Board Essentials</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61439 - LV switchgear standard</li>
                  <li>Form 1-4 - Internal separation levels</li>
                  <li>Icw - Short-circuit withstand rating</li>
                  <li>Type 1/2/3 SPD - Surge protection coordination</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Phase Balance & Documentation</p>
                <ul className="space-y-0.5">
                  <li>Target imbalance: &lt;10-15%</li>
                  <li>Neutral sizing: Consider THD</li>
                  <li>Panel schedules: Mandatory per BS 7671</li>
                  <li>As-built drawings: Essential for O&M</li>
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
            <Link to="../h-n-c-module3-section4-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Harmonics and Power Quality
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5">
              Next: Section 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_8;
