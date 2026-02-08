import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Component Replacement and Repair - MOET Module 7 Section 2.3";
const DESCRIPTION = "Hands-on practice with component replacement and repair techniques for the EPA practical observation: safe removal, correct selection, installation standards and functional verification under ST1426.";

const quickCheckQuestions = [
  {
    id: "like-for-like",
    question: "When replacing an electrical component, why is 'like-for-like' replacement the preferred approach?",
    options: [
      "It is the cheapest option",
      "It ensures the replacement has the same rating, characteristics and compatibility as the original, maintaining system integrity and compliance",
      "It is the quickest method",
      "Like-for-like is not actually preferred — upgrades are always better"
    ],
    correctIndex: 1,
    explanation: "Like-for-like replacement ensures the new component has identical ratings (voltage, current, breaking capacity), physical dimensions, and operational characteristics. This maintains the original design intent, complies with BS 7671, and avoids introducing compatibility issues. Any deviation requires a full re-assessment of the circuit."
  },
  {
    id: "torque-settings",
    question: "Why are correct torque settings important when terminating conductors?",
    options: [
      "They are not important — just tighten as much as possible",
      "Under-tightened connections cause high resistance joints leading to overheating; over-tightened connections damage conductors and terminals",
      "Torque settings only apply to HV installations",
      "They are only checked during initial installation, not repairs"
    ],
    correctIndex: 1,
    explanation: "Incorrect torque is a leading cause of electrical fires. Under-torqued connections create high-resistance joints that overheat, while over-torqued connections can damage conductor strands, crack terminal blocks, or strip threads. BS 7671 Regulation 526.1 requires connections to be mechanically and electrically sound. Using a calibrated torque screwdriver demonstrates professionalism."
  },
  {
    id: "functional-verification",
    question: "After replacing a component, what must you do before returning the system to normal service?",
    options: [
      "Immediately re-energise and walk away",
      "Carry out functional verification testing to confirm the repair is successful and the system operates correctly",
      "Fill in the paperwork and leave",
      "Ask the assessor if it looks correct"
    ],
    correctIndex: 1,
    explanation: "Functional verification confirms the replacement component works correctly within the system. This includes checking the component operates as intended, measuring key parameters (voltage, current, resistance), testing protective devices, and confirming the fault symptom is resolved. Skipping verification is a common cause of callback failures."
  },
  {
    id: "waste-disposal",
    question: "How should replaced electrical components be disposed of?",
    options: [
      "Leave them on site for the client to deal with",
      "Put everything in general waste",
      "Segregate according to waste type — WEEE for electronic items, hazardous waste for items containing harmful substances, general waste for inert materials",
      "Take them home as souvenirs"
    ],
    correctIndex: 2,
    explanation: "The Waste Electrical and Electronic Equipment (WEEE) Regulations require proper segregation and disposal. Components containing hazardous substances (capacitors with PCBs, mercury switches, fluorescent tubes) must be treated as hazardous waste. Demonstrating awareness of waste responsibilities shows the assessor you understand environmental compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Before removing a faulty component from a circuit, the first step is to:",
    options: [
      "Disconnect the component immediately",
      "Confirm safe isolation of the circuit and verify the circuit is dead",
      "Order the replacement part",
      "Take a photograph for social media"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation must always precede any physical work on the circuit. Confirm isolation, lock off, and prove dead using the prove-test-prove method before touching any conductors or components. This is the foundational safety step assessed in every EPA practical."
  },
  {
    id: 2,
    question: "When selecting a replacement MCB, which characteristics must match the original?",
    options: [
      "Only the current rating needs to match",
      "Current rating, type (B, C, or D), number of poles, breaking capacity, and physical compatibility with the board",
      "Only the physical size needs to match",
      "Any MCB from the same manufacturer will work"
    ],
    correctAnswer: 1,
    explanation: "All key characteristics must match: the current rating (e.g., 32 A), the type curve (B for domestic, C for motor loads, D for high inrush), the number of poles, the breaking capacity (e.g., 6 kA), and the physical format compatible with the distribution board. Mismatching any parameter could compromise protection."
  },
  {
    id: 3,
    question: "A calibrated torque screwdriver is used to:",
    options: [
      "Speed up the installation process",
      "Apply the correct, manufacturer-specified tightening force to terminal connections",
      "Test whether the circuit is live",
      "Remove stuck screws"
    ],
    correctAnswer: 1,
    explanation: "A calibrated torque screwdriver applies a precise, repeatable torque to terminal connections as specified by the component manufacturer. This ensures connections are neither under-tightened (risking high-resistance joints) nor over-tightened (risking mechanical damage). It is a key quality tool for professional electrical work."
  },
  {
    id: 4,
    question: "When stripping cable insulation for termination, you should:",
    options: [
      "Use a knife and cut towards your body for control",
      "Strip the correct length of insulation without nicking or damaging the conductor strands, using an appropriate stripping tool",
      "Remove as much insulation as possible for a better connection",
      "Use your teeth if no tool is available"
    ],
    correctAnswer: 1,
    explanation: "Correct cable preparation is essential for reliable connections. Strip only the length specified by the terminal manufacturer, use a proper cable stripping tool, and avoid nicking or cutting conductor strands (which reduces the current-carrying capacity and creates a weak point). The assessor will closely inspect your cable preparation."
  },
  {
    id: 5,
    question: "After replacing a contactor in a motor starter circuit, functional verification should include:",
    options: [
      "Only checking the contactor pulls in",
      "Verifying the contactor operates, the motor starts and runs correctly, overload protection functions, and control circuit operates as intended",
      "Asking someone to listen for unusual noises",
      "Checking only the main contacts"
    ],
    correctAnswer: 1,
    explanation: "Full functional verification confirms the entire system operates correctly — not just the replaced component. For a motor starter, this means testing the control circuit (start/stop), confirming the contactor pulls in and holds, verifying the motor runs correctly (direction, current draw), and testing protective functions (overload, emergency stop)."
  },
  {
    id: 6,
    question: "When a like-for-like replacement is not available, you should:",
    options: [
      "Fit any component that physically fits",
      "Consult the manufacturer's data, verify the alternative meets or exceeds all ratings, and document the change",
      "Leave the circuit out of service permanently",
      "Fit a lower-rated component temporarily"
    ],
    correctAnswer: 1,
    explanation: "If a direct replacement is unavailable, the alternative must meet or exceed all specifications: voltage rating, current rating, breaking capacity, environmental rating (IP), and operational characteristics. The substitution must be documented, and in some cases may require a minor works certificate or design verification. Never fit a component with lower ratings."
  },
  {
    id: 7,
    question: "Correct identification of cables during component replacement is important because:",
    options: [
      "It makes the job look professional",
      "Reconnecting cables incorrectly can cause short circuits, equipment damage, incorrect operation, or safety hazards",
      "The assessor will not notice incorrect connections",
      "Cable identification is only important in new installations"
    ],
    correctAnswer: 1,
    explanation: "Incorrect reconnection is a serious and common error. Swapped line and neutral connections, reversed motor phases, or cross-connected control circuits can cause equipment damage, safety hazards, or dangerous mis-operation. Label or photograph connections before disconnecting, and verify correct reconnection using circuit diagrams."
  },
  {
    id: 8,
    question: "The purpose of a visual inspection after component replacement is to check:",
    options: [
      "Only that the component is the right colour",
      "Correct installation, secure fixings, proper cable dressing, no damage to adjacent components, and compliance with regulations",
      "That the label is facing the right way",
      "Visual inspection is not necessary after replacement"
    ],
    correctAnswer: 1,
    explanation: "A thorough visual inspection after replacement confirms: the component is correctly installed and oriented, all fixings are secure, cables are properly dressed and supported, no damage has occurred to adjacent equipment, and the installation complies with BS 7671. This attention to detail is a distinction-level behaviour."
  },
  {
    id: 9,
    question: "When replacing a fuse, the key matching criteria are:",
    options: [
      "Only the physical size",
      "Current rating, voltage rating, type (HRC, rewireable, cartridge), breaking capacity, and category of duty",
      "The colour of the fuse carrier",
      "Any fuse that fits will work"
    ],
    correctAnswer: 1,
    explanation: "Fuse selection must match all critical parameters: current rating (the normal load current), voltage rating (system voltage), type (HRC for high fault levels, cartridge for general use), breaking capacity (must exceed prospective fault current), and category of duty (motor, general, semiconductor). Incorrect fuse selection compromises circuit protection."
  },
  {
    id: 10,
    question: "BS 7671 Regulation 526.1 requires that all electrical connections shall:",
    options: [
      "Be made using any convenient method",
      "Provide durable electrical continuity, adequate mechanical strength, and be accessible for inspection",
      "Be soldered for maximum security",
      "Be wrapped in insulation tape"
    ],
    correctAnswer: 1,
    explanation: "Regulation 526.1 sets the standard for all electrical connections: they must provide reliable electrical continuity, have adequate mechanical strength for the application, and (generally) be accessible for inspection, testing and maintenance. This applies to every connection you make during component replacement."
  },
  {
    id: 11,
    question: "During the EPA, demonstrating correct cable management after component replacement means:",
    options: [
      "Leaving cables loose for easy future access",
      "Neatly dressing, routing and securing cables using appropriate supports, maintaining bending radii, and ensuring no strain on terminations",
      "Bundling all cables together tightly with cable ties",
      "Cable management is not assessed"
    ],
    correctAnswer: 1,
    explanation: "Professional cable management shows competence and attention to detail. Cables should be neatly routed, properly supported, not subjected to sharp bends (maintaining minimum bending radii), free from strain at terminations, and segregated where required (e.g., power and data). This workmanship quality is assessed during the EPA."
  },
  {
    id: 12,
    question: "If you discover additional faults during a component replacement, the correct action is to:",
    options: [
      "Ignore them and complete only the original task",
      "Report the additional faults to the appropriate person, document them, and only repair them if authorised and within your competence",
      "Fix everything you find without telling anyone",
      "Leave the job incomplete"
    ],
    correctAnswer: 1,
    explanation: "Reporting additional faults demonstrates professionalism and safety awareness. You should document what you have found, report to your supervisor or the authorised person, and only undertake additional repairs if authorised and within the scope of your competence and any permit to work. In the EPA, explaining this approach to the assessor demonstrates mature professional judgement."
  }
];

const faqs = [
  {
    question: "What tools should I have available for component replacement during the EPA?",
    answer: "A comprehensive toolkit should include: insulated screwdrivers (flat and Phillips, various sizes), side cutters, long-nose pliers, cable strippers, a calibrated torque screwdriver, a voltage indicator (GS38 compliant), a multimeter, appropriate PPE, cable markers/labels, and a notebook. Check with your training provider what will be provided at the assessment venue and what you need to bring yourself."
  },
  {
    question: "How do I handle components I am not familiar with during the EPA?",
    answer: "Read the manufacturer's data sheet or label carefully — it contains the key information you need (ratings, wiring diagram, terminal identification). Explain to the assessor that you are reviewing the manufacturer's information before proceeding. This demonstrates the professional approach of always checking data rather than guessing, which is valued more highly than pretending to know everything."
  },
  {
    question: "Is soldering expected during the EPA practical observation?",
    answer: "Soldering is unlikely to be required in the standard EPA for the MOET pathway, as most modern electrical connections use screw, spring, or crimp terminations. However, you should be familiar with soldering techniques in case they are needed for specific control system repairs. Crimping competence is more commonly assessed."
  },
  {
    question: "What if the replacement component does not fit exactly?",
    answer: "If a component does not fit correctly, do not force it. Check you have the correct replacement by comparing part numbers, ratings, and dimensions. If the replacement is verified as correct but requires minor adaptation (e.g., a different mounting pattern), explain your approach to the assessor and only proceed if the modification maintains safety and compliance. Forcing an incorrect component can cause damage and is a fail point."
  },
  {
    question: "How important is tidiness during the practical observation?",
    answer: "Very important. Keeping your work area tidy, tools organised, and waste materials cleared demonstrates professionalism and safety awareness. A cluttered work area increases the risk of accidents and slows your work. The assessor will note your housekeeping as part of the overall professional behaviours assessment."
  }
];

const MOETModule7Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
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
            <Shield className="h-4 w-4" />
            <span>Module 7.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Component Replacement and Repair
          </h1>
          <p className="text-white/80">
            Hands-on practice with safe component removal, correct selection and professional installation techniques
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safe removal:</strong> Isolate, label, photograph, disconnect</li>
              <li className="pl-1"><strong>Selection:</strong> Like-for-like matching on all key ratings</li>
              <li className="pl-1"><strong>Installation:</strong> Correct torque, cable prep, dressing</li>
              <li className="pl-1"><strong>Verification:</strong> Functional testing before returning to service</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Workmanship:</strong> Assessed on quality, not just completion</li>
              <li className="pl-1"><strong>BS 7671:</strong> Reg 526.1 — connection standards</li>
              <li className="pl-1"><strong>Documentation:</strong> Record what you replaced and why</li>
              <li className="pl-1"><strong>ST1426:</strong> Practical maintenance competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Safely remove faulty components following isolation and documentation procedures",
              "Select correct replacement components by matching all critical ratings and specifications",
              "Prepare cables and conductors to professional standards using appropriate tools",
              "Apply correct torque settings and termination techniques for reliable connections",
              "Carry out functional verification testing after component replacement",
              "Demonstrate professional workmanship and cable management to EPA standard"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Safe Component Removal Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before any component can be replaced, it must be safely removed. This is not simply a matter of disconnecting
              wires — it requires a methodical approach that ensures safety, preserves evidence of the fault, and sets up
              the reinstallation for success. During the EPA practical observation, the assessor will evaluate your entire
              removal process, not just the end result.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Component Removal</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Confirm safe isolation:</strong> Verify the circuit is isolated, locked off, and proved dead using the prove-test-prove method</li>
                <li className="pl-1"><strong>Review the circuit diagram:</strong> Understand the component's role in the circuit and identify all connections</li>
                <li className="pl-1"><strong>Photograph and label:</strong> Take photographs of the existing wiring arrangement and label each conductor with its terminal reference before disconnecting</li>
                <li className="pl-1"><strong>Disconnect carefully:</strong> Release terminal screws without damaging conductors; note any signs of overheating, arcing or damage</li>
                <li className="pl-1"><strong>Remove the component:</strong> Undo fixings and remove the component, noting its orientation and mounting method</li>
                <li className="pl-1"><strong>Inspect the removed component:</strong> Examine for the failure mode — burn marks, mechanical damage, loose internal connections</li>
                <li className="pl-1"><strong>Preserve as evidence:</strong> Keep the faulty component for inspection and warranty purposes</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Removal Errors</p>
              <p className="text-sm text-white">
                Failing to label conductors before disconnection is the most common error during component replacement.
                In a complex control panel with multiple identically coloured conductors, reconnecting without labels
                becomes guesswork. Always label before disconnecting — even if the connections seem obvious. Under
                assessment pressure, what seemed obvious can quickly become confusing.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The removal phase reveals information about the fault cause. Burn marks on terminals
              suggest high-resistance joints; mechanical damage suggests environmental or installation issues. Reporting these
              observations to the assessor demonstrates diagnostic awareness beyond simple replacement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Component Selection and Specification Matching
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct component selection is critical for maintaining circuit protection, system performance, and regulatory
              compliance. The assessor will observe whether you verify the replacement component's specifications match the
              original — or whether you simply fit whatever is available. This distinction separates competent technicians
              from those who create future problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Specifications to Match</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Critical Ratings</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Additional Checks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB</td>
                      <td className="border border-white/10 px-3 py-2">Current, type curve (B/C/D), breaking capacity, poles</td>
                      <td className="border border-white/10 px-3 py-2">Physical compatibility with board, BS EN 60898</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contactor</td>
                      <td className="border border-white/10 px-3 py-2">Coil voltage, contact rating, AC category</td>
                      <td className="border border-white/10 px-3 py-2">Auxiliary contacts, mounting, DIN rail fit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD/RCBO</td>
                      <td className="border border-white/10 px-3 py-2">Current rating, sensitivity (mA), type (AC/A/B)</td>
                      <td className="border border-white/10 px-3 py-2">Breaking capacity, time delay, board compatibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuse</td>
                      <td className="border border-white/10 px-3 py-2">Current, voltage, type (HRC/cartridge), breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Physical size, category of duty, BS 88 reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Relay/Timer</td>
                      <td className="border border-white/10 px-3 py-2">Coil voltage, contact configuration, contact rating</td>
                      <td className="border border-white/10 px-3 py-2">Base compatibility, timing range, function</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Reading Manufacturer Data</p>
              <p className="text-sm text-white">
                Always read the data printed on the component itself and cross-reference with the manufacturer's data sheet.
                Do not rely on the packaging alone — check the markings on the device. In the EPA, telling the assessor
                "I am checking the component markings match the required specification" demonstrates professional practice.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If you are unsure about a specification, explain to the assessor that you would
              consult the manufacturer's technical data or seek guidance from a senior colleague. Admitting uncertainty is
              a professional strength, not a weakness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Preparation and Termination Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The quality of your cable preparation and termination directly affects the reliability and safety of the
              installation. Poor terminations are the most common cause of electrical fires in the UK. During the EPA,
              the assessor will closely inspect your connection work — this is where workmanship quality is most visible.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Preparation Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Strip length:</strong> Match the terminal depth — enough conductor inserted for full contact, no excess exposed</li>
                <li className="pl-1"><strong>Stripping tool:</strong> Use an adjustable cable stripper set to the correct conductor size — avoid nicking strands</li>
                <li className="pl-1"><strong>Conductor condition:</strong> Inspect stripped conductors for damage — no nicked, cut, or missing strands</li>
                <li className="pl-1"><strong>Ferrules:</strong> Use bootlace ferrules on stranded conductors entering screw terminals to prevent strand escape</li>
                <li className="pl-1"><strong>Orientation:</strong> Insert the conductor so the screw clamps down on the conductor, not pushes it out</li>
                <li className="pl-1"><strong>Insulation clearance:</strong> Ensure insulation does not enter the terminal and conductor does not protrude excessively</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Torque Settings for Common Terminals</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Terminal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Torque (Nm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB/RCBO terminal</td>
                      <td className="border border-white/10 px-3 py-2">2.0 - 3.5</td>
                      <td className="border border-white/10 px-3 py-2">Check manufacturer's data for exact value</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board busbar</td>
                      <td className="border border-white/10 px-3 py-2">2.5 - 5.0</td>
                      <td className="border border-white/10 px-3 py-2">Varies with conductor size</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlet terminal</td>
                      <td className="border border-white/10 px-3 py-2">1.2 - 1.5</td>
                      <td className="border border-white/10 px-3 py-2">Smaller screws — easy to over-tighten</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DIN rail terminal block</td>
                      <td className="border border-white/10 px-3 py-2">0.5 - 1.2</td>
                      <td className="border border-white/10 px-3 py-2">Often spring-cage — no torque needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If you use a torque screwdriver during the EPA and explain why, this demonstrates
              a level of professionalism that distinguishes you from candidates who simply tighten by feel. It is a clear
              indicator of distinction-level practice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Functional Verification and Return to Service
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Replacing the component is only part of the job. Functional verification — confirming the system works correctly
              after repair — is the final and often most overlooked step. In the EPA, candidates who skip verification or perform
              it inadequately are marked down significantly. A professional technician never hands back a system without confirming
              it works.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Check all connections, fixings, cable dressing, and no damage to adjacent equipment</li>
                <li className="pl-1"><strong>Continuity:</strong> Verify circuit continuity through the new component before re-energising</li>
                <li className="pl-1"><strong>Insulation resistance:</strong> Confirm IR values are satisfactory (above 1 M ohm for LV circuits)</li>
                <li className="pl-1"><strong>Re-energise under control:</strong> Remove locks, re-energise the circuit in a controlled manner, observing for any issues</li>
                <li className="pl-1"><strong>Functional test:</strong> Operate the system through its full range of functions — start, stop, forward, reverse, trip, reset</li>
                <li className="pl-1"><strong>Measure key parameters:</strong> Voltage at the component, current draw under load, operating temperatures</li>
                <li className="pl-1"><strong>Protective device test:</strong> Confirm RCDs, overloads and emergency stops function correctly</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Documentation After Replacement</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Record the replacement:</strong> Component removed, component fitted, part numbers, ratings</li>
                <li className="pl-1"><strong>Test results:</strong> IR readings, continuity, functional test outcomes</li>
                <li className="pl-1"><strong>Root cause:</strong> If identified, note the probable cause of the original failure</li>
                <li className="pl-1"><strong>Recommendations:</strong> Any follow-up work, monitoring or preventive actions</li>
                <li className="pl-1"><strong>Sign-off:</strong> Confirm the system has been returned to safe, normal operation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Component replacement and repair is a core practical competence in the
              Maintenance and Operations Engineering Technician standard. The EPA practical observation will include
              at least one component replacement task, assessed on safety, workmanship, verification and documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Component Replacement"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fault Diagnosis
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-4">
              Next: Control System Troubleshooting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section2_3;
