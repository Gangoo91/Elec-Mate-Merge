import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Circuit Breaker Operations - MOET Module 3 Section 1.3";
const DESCRIPTION = "Comprehensive guide to circuit breaker operations for electrical maintenance technicians: MCBs, MCCBs, ACBs, distribution boards, consumer units, busbar arrangements, SPD integration, labelling requirements and BS 7671 Amendment 2 compliance.";

const quickCheckQuestions = [
  {
    id: "amendment2-cu",
    question: "Under Amendment 2 to BS 7671, what enclosure material is required for domestic consumer units?",
    options: [
      "PVC plastic",
      "Non-combustible (metallic)",
      "Fire-retardant plastic",
      "Any material is acceptable"
    ],
    correctIndex: 1,
    explanation: "Amendment 2 requires consumer units in domestic premises to be housed in non-combustible enclosures, which in practice means metallic (steel) consumer units. This was introduced to reduce the fire risk from arcing faults within the unit."
  },
  {
    id: "spare-ways",
    question: "What is the recommended minimum spare capacity (spare ways) when specifying a distribution board?",
    options: [
      "5%",
      "10%",
      "20%",
      "50%"
    ],
    correctIndex: 2,
    explanation: "A minimum of 20% spare ways is recommended when specifying distribution boards. This allows for future circuit additions without needing to replace the entire board — a common and costly issue in older installations."
  },
  {
    id: "rcd-test-freq",
    question: "How often does the standard RCD notice advise testing the device?",
    options: [
      "Monthly",
      "Quarterly",
      "Six-monthly",
      "Annually"
    ],
    correctIndex: 1,
    explanation: "The standard RCD notice states 'Test quarterly' (every three months). Regular testing by pressing the test button verifies the mechanical trip mechanism is functioning correctly and the device will disconnect the supply in the event of an earth fault."
  },
  {
    id: "spd-lead-length",
    question: "What is the recommended maximum combined lead length for SPD connections to maintain effectiveness?",
    options: [
      "100 mm",
      "500 mm",
      "1000 mm",
      "2000 mm"
    ],
    correctIndex: 1,
    explanation: "SPD connections should ideally have a combined lead length of less than 500 mm. Longer cable runs increase inductance, which reduces the SPD's ability to clamp transient overvoltages effectively."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What enclosure material does Amendment 2 to BS 7671 require for domestic consumer units?",
    options: ["High-impact PVC", "Fire-retardant plastic", "Non-combustible (metallic)", "Any BS-approved material"],
    correctAnswer: 2,
    explanation: "Amendment 2 requires non-combustible (metallic) enclosures for consumer units in domestic premises to reduce fire risk from internal arcing faults."
  },
  {
    id: 2,
    question: "Which BS 7671 Regulation covers labelling and identification requirements?",
    options: ["Regulation 411", "Regulation 514", "Regulation 537", "Regulation 612"],
    correctAnswer: 1,
    explanation: "Regulation 514 of BS 7671 covers labelling, identification marks, warning notices and diagrams for electrical installations."
  },
  {
    id: 3,
    question: "What is the recommended minimum percentage of spare ways in a distribution board?",
    options: ["5%", "10%", "20%", "30%"],
    correctAnswer: 2,
    explanation: "A minimum of 20% spare ways is recommended to allow for future circuit additions without requiring board replacement."
  },
  {
    id: 4,
    question: "Which type of SPD is most commonly installed at distribution boards?",
    options: ["Type 1", "Type 2", "Type 3", "Type 4"],
    correctAnswer: 1,
    explanation: "Type 2 SPDs are the most commonly installed, placed at distribution boards to protect against switching surges and indirect lightning effects."
  },
  {
    id: 5,
    question: "What is a split-load consumer unit?",
    options: [
      "A unit with two separate enclosures",
      "A unit where the busbars are divided into RCD-protected and non-RCD sections",
      "A unit with separate LV and ELV sections",
      "A unit split across two phases"
    ],
    correctAnswer: 1,
    explanation: "A split-load consumer unit divides the busbars into sections, typically with one section protected by an RCD and another section without RCD protection for circuits that should not trip on earth faults."
  },
  {
    id: 6,
    question: "How often does the standard RCD notice advise the user to test the device?",
    options: ["Monthly", "Quarterly", "Six-monthly", "Annually"],
    correctAnswer: 1,
    explanation: "The standard RCD notice states 'Test quarterly' (every three months) by pressing the built-in test button."
  },
  {
    id: 7,
    question: "What is the maximum recommended combined lead length for SPD connections?",
    options: ["200 mm", "500 mm", "1000 mm", "No limit"],
    correctAnswer: 1,
    explanation: "A combined lead length of less than 500 mm is recommended to minimise inductance and maintain SPD effectiveness."
  },
  {
    id: 8,
    question: "In a three-phase distribution board, how are the busbars typically arranged for single-pole ways?",
    options: [
      "All ways on L1",
      "Alternating L1-L2 only",
      "Repeating L1-L2-L3 pattern",
      "Random phase allocation"
    ],
    correctAnswer: 2,
    explanation: "The busbars are arranged in a repeating L1-L2-L3 pattern so that adjacent single-pole ways are on different phases, allowing balanced loading by distributing circuits evenly."
  },
  {
    id: 9,
    question: "What trend is replacing split-load consumer units in modern installations?",
    options: [
      "Larger RCDs",
      "Full RCBO protection for each circuit",
      "Removing RCD protection entirely",
      "Double-pole MCBs"
    ],
    correctAnswer: 1,
    explanation: "Full RCBO protection gives each circuit its own combined overcurrent and earth fault protection, eliminating the problem of one fault tripping multiple circuits."
  },
  {
    id: 10,
    question: "What information must a circuit schedule include?",
    options: [
      "Way number and circuit description only",
      "Way number, description, device type/rating, cable size, phase and area served",
      "Device brand name and cost",
      "Installation date only"
    ],
    correctAnswer: 1,
    explanation: "A complete circuit schedule includes the way number, circuit description, protective device type and rating, cable size and type, phase allocation, and the area or zone served."
  },
  {
    id: 11,
    question: "What is the purpose of blanking plates in a distribution board?",
    options: [
      "To improve appearance",
      "To maintain the IP rating and prevent access to live parts",
      "To balance the phase loading",
      "To reduce harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "Blanking plates cover unused ways to maintain the enclosure's IP rating and prevent accidental contact with live busbars. A missing blanking plate compromises the safety of the entire board."
  },
  {
    id: 12,
    question: "Where should a Type 1 SPD be installed?",
    options: [
      "At socket outlets",
      "Close to sensitive equipment",
      "At the origin of the installation (main switchboard)",
      "In the consumer unit only"
    ],
    correctAnswer: 2,
    explanation: "Type 1 SPDs are installed at the origin of the installation, typically the main switchboard, and are designed to handle direct lightning current. They are required where an external lightning protection system is fitted."
  }
];

const faqs = [
  {
    question: "What is the difference between a distribution board and a consumer unit?",
    answer: "A consumer unit is a specific type of distribution board designed for domestic and small commercial installations. It is single-phase with a combined main switch and typically uses plug-in MCBs or RCBOs. A distribution board is the broader term covering all types including three-phase commercial panels, lighting distribution boards and essential services panels."
  },
  {
    question: "Why did Amendment 2 require metal consumer units?",
    answer: "Statistics showed that arcing faults within plastic consumer units could cause the enclosure to ignite and spread fire. Metal (non-combustible) enclosures contain any internal arcing and prevent the enclosure itself from becoming a fire source. This change was a direct response to fire safety data."
  },
  {
    question: "Can I use a Type 2 SPD without a Type 1 if there is no lightning protection?",
    answer: "Yes. Type 1 SPDs are typically only required where an external lightning protection system is fitted. For most installations without LPS, a Type 2 SPD at the distribution board provides adequate surge protection against indirect lightning effects and switching surges."
  },
  {
    question: "What should I do if the circuit schedule is missing or illegible?",
    answer: "Report this as a deficiency. The circuit schedule should be recreated by tracing and identifying each circuit. This is a Regulation 514 requirement and a common C3 code observation during periodic inspection. An accurate schedule is essential for safe isolation and efficient maintenance."
  },
  {
    question: "How do I verify that a distribution board's protection is correctly coordinated?",
    answer: "Check the manufacturer's discrimination tables for tested combinations of incoming and outgoing devices. Verify that the prospective fault current at the board does not exceed any device's breaking capacity. Ensure the incomer rating is appropriate for the total expected load. If in doubt, request a protection coordination study from a design engineer."
  }
];

const MOETModule3Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 3.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Circuit Breaker Operations
          </h1>
          <p className="text-white/80">
            Distribution boards, consumer units, busbar arrangements, SPD integration and Amendment 2 requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>DBs:</strong> Core equipment — MCBs, RCBOs, busbar systems</li>
              <li className="pl-1"><strong>Amendment 2:</strong> Metal consumer units mandatory for domestic</li>
              <li className="pl-1"><strong>Labelling:</strong> Regulation 514 — schedules must be accurate</li>
              <li className="pl-1"><strong>SPDs:</strong> Type 2 at DB, max 500 mm lead length</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Most maintained:</strong> DBs are your primary daily equipment</li>
              <li className="pl-1"><strong>Safety:</strong> Correct labelling prevents wrong-circuit isolation</li>
              <li className="pl-1"><strong>RCBO trend:</strong> Individual protection eliminates nuisance tripping</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to installation maintenance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the construction and layout of distribution boards and consumer units",
              "Explain busbar arrangements including single-busbar and split-load configurations",
              "Interpret and update circuit schedules and charts to Regulation 514",
              "Outline the requirements for surge protection device integration",
              "Describe Amendment 2 consumer unit requirements including metal enclosures",
              "Carry out inspection and maintenance procedures for distribution equipment"
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
            Distribution Board Design and Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution boards (DBs) are the workhorses of electrical distribution. They receive supply from the main switchboard or sub-main cables and distribute it to individual final circuits via MCBs, RCBOs or other protective devices. Every commercial and domestic installation has at least one, and many larger buildings have dozens distributed across floors and zones.
            </p>
            <p>
              As a maintenance technician, distribution boards are the equipment you will interact with most frequently. Understanding their construction, internal layout and component functions is essential for safe and effective maintenance, fault finding and circuit identification.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Distribution Board</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Three-Phase DBs:</strong> Used in commercial and industrial installations. Three-phase busbar system with single-pole, two-pole or three-pole outgoing devices. Available from 4-way to 48-way or more</li>
                <li className="pl-1"><strong>Single-Phase Consumer Units:</strong> Primarily domestic. Single-phase busbar with single-pole MCBs or RCBOs. Amendment 2 requires metallic enclosures in domestic premises</li>
                <li className="pl-1"><strong>Lighting Distribution Boards:</strong> Specialised for lighting circuits, often incorporating contactors or relays for central switching. May include emergency lighting monitoring modules</li>
                <li className="pl-1"><strong>Essential Services Panels:</strong> Dedicated to life safety circuits — fire alarms, emergency lighting, lifts, smoke ventilation. Require enhanced protection and may be fed from standby generators</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Internal Components</h3>
              <p className="text-sm text-white mb-3">
                A typical distribution board contains the following key components:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">An incoming switch-disconnector or MCCB (the incomer)</li>
                <li className="pl-1">A busbar system (copper or tin-plated copper) in L1-L2-L3 repeating pattern</li>
                <li className="pl-1">DIN-rail mounted outgoing protective devices (MCBs, RCBOs, RCDs)</li>
                <li className="pl-1">A neutral bar and earth bar</li>
                <li className="pl-1">Cable entry points with gland plates</li>
                <li className="pl-1">A circuit schedule or chart holder on the inside of the door</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The busbar system is arranged to distribute load evenly across the three phases. In a typical three-phase DB, adjacent single-pole ways are connected to different phases in a repeating L1-L2-L3 pattern, allowing balanced loading by distributing circuits evenly across the board.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Busbar Arrangements and Ways
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The busbar arrangement determines how the distribution board distributes power to outgoing circuits and affects both the flexibility and resilience of the system. Understanding the different configurations helps you identify the board type during maintenance and plan circuit additions correctly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Busbar Configuration</h3>
                <p className="text-sm text-white">
                  The simplest and most common arrangement. A single set of busbars runs the length of the board, fed by a single incomer. All outgoing devices connect to the same busbars. If the incomer trips, all circuits are lost. This is standard for most sub-distribution boards in commercial installations.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Split-Load Configuration</h3>
                <p className="text-sm text-white">
                  In a split-load consumer unit, the busbars are divided into two sections by a main switch and one or more RCDs. One section protects circuits through an RCD, while the other section may have non-RCD-protected circuits (fire alarm, security). This avoids nuisance tripping of essential circuits.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">The Move to Full RCBO Protection</h3>
              <p className="text-sm text-white mb-3">
                The trend in modern installations is toward full RCBO protection, where each circuit has its own individual RCBO. This eliminates the problem of one earth fault tripping an RCD and affecting multiple circuits. Each circuit has both overload and earth fault protection in a single device, providing the best combination of safety and continuity of supply.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">No nuisance tripping affecting multiple circuits</li>
                <li className="pl-1">Easier fault identification — the tripped RCBO identifies the faulty circuit</li>
                <li className="pl-1">Better protection — each circuit has its own earth fault threshold</li>
                <li className="pl-1">Higher cost but increasingly standard for new installations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Counting ways:</strong> A "way" is a single connection point for a single-pole outgoing device. A 12-way three-phase board accommodates 12 single-pole MCBs (4 per phase). A three-pole device occupies 3 ways. Always plan a minimum of 20% spare ways for future additions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Labelling and Circuit Schedules (Regulation 514)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 514 of BS 7671 requires that every installation be provided with labels, identification marks and diagrams to ensure safe operation, inspection and maintenance. For distribution boards, this means clear and accurate circuit identification — a fundamental requirement that is frequently found to be deficient during periodic inspection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Schedule Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Way number:</strong> Position in the board (1, 2, 3, etc.)</li>
                <li className="pl-1"><strong>Circuit description:</strong> Clear identification (e.g., "Ground floor lighting", "Kitchen sockets")</li>
                <li className="pl-1"><strong>Protective device:</strong> Type and rating (e.g., "MCB Type B 16 A")</li>
                <li className="pl-1"><strong>Phase allocation:</strong> L1, L2 or L3 for three-phase boards</li>
                <li className="pl-1"><strong>Cable size and type:</strong> E.g., "2.5 mm2 T&E"</li>
                <li className="pl-1"><strong>Area served:</strong> The zone or area the circuit supplies</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Warning Notices Required by BS 7671</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Nominal voltage and frequency of the supply</li>
                <li className="pl-1">Identification of the origin of supply (where not obvious)</li>
                <li className="pl-1">RCD test notice: "Test quarterly" with instructions</li>
                <li className="pl-1">Dual supply warning where more than one source is present</li>
                <li className="pl-1">Periodic inspection due date (recommended)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance Responsibility</p>
              <p className="text-sm text-white">
                Circuit schedules must be kept up to date. If a circuit is modified, added or removed during maintenance, the schedule must be updated immediately. Outdated or missing schedules are among the most common deficiencies found during periodic inspection and represent a significant safety risk — incorrect circuit identification can lead to work on the wrong circuit during isolation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a maintenance technician, updating the circuit schedule after any modification is not optional — it is a regulatory requirement and a critical safety measure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Surge Protection Device Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Surge protection devices (SPDs) protect electrical equipment from transient overvoltages caused by lightning, switching surges and other disturbances. BS 7671 Regulation 443 and the 18th Edition Amendment 2 have strengthened the requirements for SPD installation, making them a standard component in most new installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 1 (Class I)</td>
                      <td className="border border-white/10 px-3 py-2">Origin / main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">Direct lightning current. Required where external LPS fitted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 2 (Class II)</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Indirect lightning and switching surges. Most common type</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 3 (Class III)</td>
                      <td className="border border-white/10 px-3 py-2">Near sensitive equipment</td>
                      <td className="border border-white/10 px-3 py-2">Fine protection against residual surges</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Installation and Maintenance Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lead length:</strong> Keep combined lead length below 500 mm to minimise inductance</li>
                <li className="pl-1"><strong>Disconnection:</strong> Dedicated MCB or fuse required for SPD disconnection if it fails short-circuit</li>
                <li className="pl-1"><strong>Status indicator:</strong> Most modern SPDs have visual indicators (green = healthy, red = end-of-life)</li>
                <li className="pl-1"><strong>Check during maintenance:</strong> Verify SPD status indicator at every maintenance visit</li>
                <li className="pl-1"><strong>When required:</strong> Installations with sensitive electronics, external LPS, or where overvoltage consequences are serious</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> SPDs are now required in most commercial installations and many domestic installations. During maintenance, always check the SPD status indicator and report any devices showing end-of-life status for replacement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Inspection and Maintenance of Distribution Boards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular inspection and maintenance of distribution boards is a core part of the maintenance technician's role. A structured approach ensures nothing is missed and that developing faults are identified before they cause failure or safety hazards. The following provides a comprehensive maintenance checklist.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Maintenance Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify the circuit schedule is present, legible and accurate</li>
                <li className="pl-1">Check all required warning notices are displayed</li>
                <li className="pl-1">Inspect the enclosure for damage, corrosion or signs of overheating</li>
                <li className="pl-1">Check that all blanking plates are fitted (no open ways)</li>
                <li className="pl-1">Verify the IP rating is maintained (glands, seals, covers intact)</li>
                <li className="pl-1">Check for signs of moisture ingress, dust or vermin</li>
                <li className="pl-1">Inspect all connections for signs of overheating (discolouration, melting)</li>
                <li className="pl-1">Check torque on accessible connections using a calibrated torque driver</li>
                <li className="pl-1">Verify all MCBs and RCDs operate correctly (manual trip test)</li>
                <li className="pl-1">Test RCDs with an RCD tester to verify trip time is within specification</li>
                <li className="pl-1">Check SPD status indicators where fitted</li>
                <li className="pl-1">Perform thermal imaging if equipment is available and board is energised</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Deficiencies Found</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Missing or outdated circuit schedules</li>
                  <li className="pl-1">Missing blanking plates exposing live busbars</li>
                  <li className="pl-1">Loose connections causing overheating</li>
                  <li className="pl-1">Failed RCDs not tripping on test</li>
                  <li className="pl-1">Damaged cable glands compromising IP rating</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">After Maintenance</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Return board to normal operating condition</li>
                  <li className="pl-1">Replace all covers and blanking plates</li>
                  <li className="pl-1">Update circuit schedule if changes were made</li>
                  <li className="pl-1">Record findings in maintenance log or CAFM system</li>
                  <li className="pl-1">Report any deficiencies requiring further action</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Thermal imaging is an increasingly valuable maintenance tool for distribution boards. It can identify overheating connections, overloaded circuits and failing components without the need to isolate the board. Many organisations now include thermographic surveys as a standard part of their PPM programme for distribution equipment.
            </p>
          </div>
        </section>

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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">DB Maintenance Priorities</p>
                <ul className="space-y-0.5">
                  <li>1. Circuit schedule present and accurate</li>
                  <li>2. All blanking plates fitted</li>
                  <li>3. RCDs tested quarterly (trip time in spec)</li>
                  <li>4. Connections torque-checked annually</li>
                  <li>5. SPD status indicators checked</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Reg 514 — Labelling requirements</li>
                  <li>BS 7671 Reg 443 — SPD requirements</li>
                  <li>Amendment 2 — Metal CU enclosures</li>
                  <li>BS EN 61439 — Switchgear assemblies</li>
                  <li>ST1426 — Maintenance technician KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: HV/LV Switchgear
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section1-4">
              Next: Protective Devices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section1_3;
