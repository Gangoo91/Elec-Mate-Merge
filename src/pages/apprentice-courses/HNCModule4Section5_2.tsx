import { ArrowLeft, LayoutGrid, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Distribution Board Design - HNC Module 4 Section 5.2";
const DESCRIPTION = "Master distribution board design for building services: ways calculation, diversity application, labelling requirements (Reg 514), access requirements and IP ratings.";

const quickCheckQuestions = [
  {
    id: "ways-calc",
    question: "A commercial building has 45 lighting circuits and 60 power circuits. With 20% spare, how many ways minimum?",
    options: ["105 ways", "126 ways", "115 ways", "130 ways"],
    correctIndex: 1,
    explanation: "Total circuits = 45 + 60 = 105. With 20% spare: 105 × 1.2 = 126 ways. Always round up to accommodate future expansion."
  },
  {
    id: "diversity",
    question: "What diversity factor is typically applied to general socket outlets in offices?",
    options: ["100%", "80%", "50%", "40%"],
    correctIndex: 3,
    explanation: "Office socket outlets typically use 40% diversity (0.4) as not all sockets are used simultaneously. First 10A at 100%, remainder at 40% per BS 7671 guidance."
  },
  {
    id: "labelling",
    question: "Which BS 7671 Regulation requires circuit identification at distribution boards?",
    options: ["Regulation 411", "Regulation 514.9", "Regulation 537", "Regulation 611"],
    correctIndex: 1,
    explanation: "Regulation 514.9 requires durable labels identifying each circuit. Labels must be legible, suitably positioned and durable for the expected life of the installation."
  },
  {
    id: "access",
    question: "What is the minimum mounting height for distribution boards in general areas?",
    options: ["300mm", "450mm", "1000mm", "1400mm"],
    correctIndex: 1,
    explanation: "DBs should be mounted with operating handles between 450mm and 1200mm from floor level for accessibility. The 450mm minimum prevents difficult low-level operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary function of a distribution board?",
    options: [
      "To generate electrical power",
      "To distribute power to final circuits with individual protection",
      "To transform voltage levels",
      "To measure energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Distribution boards (DBs) receive power from sub-mains and distribute it to final circuits (lighting, sockets, fixed equipment), with each circuit protected by its own device (MCB/RCBO)."
  },
  {
    id: 2,
    question: "When calculating ways for a three-phase board, how are single-phase circuits counted?",
    options: [
      "Each counts as 3 ways",
      "Each counts as 1 way on its allocated phase",
      "Single-phase not permitted on 3-phase boards",
      "Each counts as 1.5 ways"
    ],
    correctAnswer: 1,
    explanation: "Single-phase circuits occupy 1 way on their allocated phase. A three-phase board with 12 ways per phase provides 36 single-pole ways total, which must be balanced across phases."
  },
  {
    id: 3,
    question: "What should be labelled according to Regulation 514.9.1?",
    options: [
      "Circuit reference and nominal current only",
      "Cable size and length",
      "Type of circuit, circuit reference and RCD info",
      "Manufacturer details only"
    ],
    correctAnswer: 2,
    explanation: "Labels must identify the circuit reference (number/name), type of wiring, nominal current rating, and which RCD protects each circuit. This enables safe isolation and maintenance."
  },
  {
    id: 4,
    question: "Why is phase balancing important in three-phase distribution boards?",
    options: [
      "It is only required for aesthetic reasons",
      "To minimise neutral current and prevent overloading",
      "Phase balancing is optional",
      "To reduce installation time"
    ],
    correctAnswer: 1,
    explanation: "Unbalanced phases cause neutral current flow, potentially overloading the neutral conductor. Good balance keeps neutral current low and ensures equal loading of supply phases."
  },
  {
    id: 5,
    question: "What diversity factor applies to cooking appliances in commercial kitchens?",
    options: ["100% of all appliances", "First 10A at 100%, 30% remainder", "75% of connected load", "50% of all appliances"],
    correctAnswer: 2,
    explanation: "Commercial cooking diversity varies by application, but typically 75-80% of connected load is used as kitchen equipment operates simultaneously during service periods."
  },
  {
    id: 6,
    question: "What is the purpose of cable entry arrangements in distribution boards?",
    options: [
      "Only for appearance",
      "To maintain IP rating and prevent vermin ingress",
      "To reduce cost",
      "Cable entries are optional"
    ],
    correctAnswer: 1,
    explanation: "Proper cable entry (glands, grommets, blanking plates) maintains the enclosure IP rating, prevents rodent/insect ingress, and ensures mechanical protection of cables at entry points."
  },
  {
    id: 7,
    question: "When must RCD protection be provided at distribution boards?",
    options: [
      "Only for outdoor circuits",
      "For all socket outlets up to 32A in most locations",
      "RCD protection is optional",
      "Only for lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires 30mA RCD protection for socket outlets up to 32A intended for general use, mobile equipment outdoors, and cables installed in walls without earthed protection."
  },
  {
    id: 8,
    question: "What spacing is typically required between adjacent distribution boards?",
    options: [
      "No spacing required",
      "100mm minimum",
      "300mm minimum for ventilation",
      "500mm mandatory"
    ],
    correctAnswer: 2,
    explanation: "300mm spacing between boards aids heat dissipation and provides working space for cable installation. Manufacturers specify minimum spacings for thermal management."
  },
  {
    id: 9,
    question: "Which IP rating is typically required for distribution boards in a bathroom outside zones?",
    options: ["IP2X", "IP4X", "IP44", "IP65"],
    correctIndex: 2,
    explanation: "Outside bathroom zones 0, 1 and 2, equipment should be at least IPX1 for splash protection. IP44 is commonly specified for bathrooms to protect against splashing water."
  },
  {
    id: 10,
    question: "What information must be displayed at the origin of an installation?",
    options: [
      "Only the installer's name",
      "Electrical Installation Certificate reference",
      "Maximum demand, earthing type, and nominal voltage",
      "Cable manufacturer details"
    ],
    correctAnswer: 2,
    explanation: "Regulation 514.9.1 requires display of nominal voltage, earthing system type (TN-S, TN-C-S, TT), maximum demand, and protective device characteristics at the origin."
  }
];

const faqs = [
  {
    question: "How do I calculate the number of ways needed for a distribution board?",
    answer: "Count all circuits required (lighting, power, fixed equipment, spares). Add 20-30% spare ways for future expansion. For three-phase boards, ensure balanced phase allocation and count three-phase circuits as 3 ways. Round up to the nearest standard board size (typically 12, 18, 24, or 36 way for single-phase)."
  },
  {
    question: "What is the difference between TPN and TP+N distribution boards?",
    answer: "TPN (Triple Pole and Neutral) boards have outgoing devices that switch all three phases plus neutral. TP+N (Triple Pole plus Neutral) boards switch three phases only - neutral is continuous through busbar. TPN provides additional safety for maintenance but costs more."
  },
  {
    question: "How should circuits be allocated across phases in a three-phase board?",
    answer: "Balance loads as evenly as possible across phases. Group similar circuit types on the same phase where practical (e.g., all floor 1 lighting on L1). Keep critical circuits on different phases for resilience. Document phase allocation on the distribution board schedule."
  },
  {
    question: "What are the mounting height requirements for accessibility?",
    answer: "Operating handles should be between 450mm and 1200mm from finished floor level for general accessibility. The 1200mm maximum complies with disability access requirements. In areas with restricted access (plant rooms), higher mounting may be acceptable with appropriate risk assessment."
  }
];

const HNCModule4Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
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
            <LayoutGrid className="h-4 w-4" />
            <span>Module 4.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Distribution Board Design
          </h1>
          <p className="text-white/80">
            Designing distribution systems for reliable final circuit protection and power delivery
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Ways calculation:</strong> Total circuits + 20-30% spare</li>
              <li className="pl-1"><strong>Diversity:</strong> Reduces maximum demand calculation</li>
              <li className="pl-1"><strong>Labelling:</strong> Reg 514.9 - all circuits identified</li>
              <li className="pl-1"><strong>Access:</strong> 450-1200mm mounting height</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Phase balance:</strong> Critical for 3-phase boards</li>
              <li className="pl-1"><strong>RCD split:</strong> Prevent total loss of power</li>
              <li className="pl-1"><strong>IP rating:</strong> Match to environment</li>
              <li className="pl-1"><strong>Schedules:</strong> Essential documentation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate number of ways required including future expansion",
              "Apply diversity factors to reduce maximum demand",
              "Specify labelling to comply with Regulation 514",
              "Design for accessibility and safe operation",
              "Select appropriate IP ratings for different environments",
              "Balance phase loads in three-phase distribution"
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

        {/* Section 1: Ways Calculation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ways Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correctly sizing distribution boards ensures adequate capacity for current requirements
              and future expansion. Under-sizing leads to expensive modifications; over-sizing
              wastes resources and space.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Steps for calculating ways:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Count all lighting circuits (typically 1 per 100m² in offices)</li>
                <li className="pl-1">Count all power circuits (socket outlets, fixed equipment)</li>
                <li className="pl-1">Add dedicated circuits (air conditioning, water heaters, etc.)</li>
                <li className="pl-1">Include essential/emergency circuits if applicable</li>
                <li className="pl-1">Add 20-30% spare capacity for future expansion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Distribution Board Sizes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Sizes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phase consumer unit</td>
                      <td className="border border-white/10 px-3 py-2">12, 16, 18, 21 way</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, small commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phase distribution board</td>
                      <td className="border border-white/10 px-3 py-2">12, 18, 24, 36 way</td>
                      <td className="border border-white/10 px-3 py-2">Commercial floor DBs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase TPN board</td>
                      <td className="border border-white/10 px-3 py-2">12, 18, 24 way per phase</td>
                      <td className="border border-white/10 px-3 py-2">Commercial, industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Panelboard</td>
                      <td className="border border-white/10 px-3 py-2">Up to 72 way</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial, data centres</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always round up to the next standard size. The cost difference is minimal compared to future modification costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Diversity Application */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Diversity Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity factors account for the fact that not all connected loads operate
              simultaneously at full capacity. Applying diversity correctly reduces cable sizes,
              switchgear ratings, and ultimately project costs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diversity Factors (BS 7671 Appendix 1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">66% (0.66)</td>
                      <td className="border border-white/10 px-3 py-2">Office/commercial areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets (first 10A)</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">Minimum demand</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets (remainder)</td>
                      <td className="border border-white/10 px-3 py-2">40% (0.4)</td>
                      <td className="border border-white/10 px-3 py-2">Offices, general areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooking appliances</td>
                      <td className="border border-white/10 px-3 py-2">First 10A + 30% remainder</td>
                      <td className="border border-white/10 px-3 py-2">Domestic cooking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water heating</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">Continuous loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air conditioning</td>
                      <td className="border border-white/10 px-3 py-2">80-100%</td>
                      <td className="border border-white/10 px-3 py-2">Depends on building use</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diversity Calculation Example</p>
              <p className="text-sm text-white mb-2">Office floor with 200m² area:</p>
              <ul className="text-sm text-white space-y-1">
                <li>Lighting: 2.4kW connected × 0.66 = <strong>1.58kW</strong></li>
                <li>Sockets: First 10A = 2.3kW, remainder 8kW × 0.4 = 3.2kW</li>
                <li>Total sockets: <strong>5.5kW</strong></li>
                <li>Air conditioning: 4kW × 0.8 = <strong>3.2kW</strong></li>
                <li className="mt-2 font-medium">Maximum demand: 10.28kW (45A at 230V)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Caution:</strong> Do not apply diversity to single-circuit loads or where loads are known to operate continuously.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Labelling Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Labelling Requirements (Regulation 514)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clear, durable labelling is essential for safe operation and maintenance. BS 7671
              Regulation 514.9 specifies requirements for circuit identification that enable
              safe isolation and fault finding.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Regulation 514.9 requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Every circuit must be identified at the distribution board</li>
                <li className="pl-1">Labels must be legible and suitably positioned</li>
                <li className="pl-1">Labels must be durable for the expected life of installation</li>
                <li className="pl-1">Circuit charts should be fixed within or adjacent to the DB</li>
                <li className="pl-1">RCD coverage must be clearly indicated</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Schedule Content</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Column</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Information Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit number</td>
                      <td className="border border-white/10 px-3 py-2">Sequential reference (1, 2, 3...)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit description</td>
                      <td className="border border-white/10 px-3 py-2">Location and type (e.g., "Floor 1 Lighting")</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective device</td>
                      <td className="border border-white/10 px-3 py-2">Type and rating (e.g., MCB 16A Type B)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable size</td>
                      <td className="border border-white/10 px-3 py-2">CSA and type (e.g., 2.5mm² T+E)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load</td>
                      <td className="border border-white/10 px-3 py-2">Design current (Amps)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD</td>
                      <td className="border border-white/10 px-3 py-2">Which RCD protects the circuit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase</td>
                      <td className="border border-white/10 px-3 py-2">L1, L2, L3 for three-phase boards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warning Labels Required</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">"Safety Electrical Connection - Do Not Remove"</li>
                  <li className="pl-1">RCD test notice (test quarterly)</li>
                  <li className="pl-1">Dual supply warning where applicable</li>
                  <li className="pl-1">Periodic inspection due date</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Label Durability</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Engraved or printed plastic labels</li>
                  <li className="pl-1">UV-resistant for external locations</li>
                  <li className="pl-1">Fixed with screws or permanent adhesive</li>
                  <li className="pl-1">Handwritten labels not acceptable</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use laminated circuit charts in clear pockets attached inside DB doors. Update whenever circuits change.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Access Requirements and IP Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Access Requirements and IP Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution boards must be accessible for safe operation and maintenance while
              being protected from environmental hazards. Correct positioning and IP rating
              selection ensures long-term reliability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mounting Height Guidelines</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum height</td>
                      <td className="border border-white/10 px-3 py-2">450mm to lowest device</td>
                      <td className="border border-white/10 px-3 py-2">Avoid low-level operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum height</td>
                      <td className="border border-white/10 px-3 py-2">1200mm to highest device</td>
                      <td className="border border-white/10 px-3 py-2">Accessibility compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ideal operating height</td>
                      <td className="border border-white/10 px-3 py-2">900-1000mm to main switch</td>
                      <td className="border border-white/10 px-3 py-2">Comfortable operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Front clearance</td>
                      <td className="border border-white/10 px-3 py-2">700mm minimum</td>
                      <td className="border border-white/10 px-3 py-2">Safe working space</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Ratings for Different Locations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office electrical cupboard</td>
                      <td className="border border-white/10 px-3 py-2">IP2X</td>
                      <td className="border border-white/10 px-3 py-2">Basic finger protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridor/circulation</td>
                      <td className="border border-white/10 px-3 py-2">IP3X</td>
                      <td className="border border-white/10 px-3 py-2">Protection from tools</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant room</td>
                      <td className="border border-white/10 px-3 py-2">IP4X to IP54</td>
                      <td className="border border-white/10 px-3 py-2">Dust and possible splash</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Wash-down cleaning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External (covered)</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Rain and dust</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External (exposed)</td>
                      <td className="border border-white/10 px-3 py-2">IP65</td>
                      <td className="border border-white/10 px-3 py-2">Full weather exposure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Accessibility note:</strong> Consider users with disabilities - ensure clear approach route, adequate lighting, and handles operable with one hand.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DB Sizing for Office Floor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design a distribution board for a 400m² office floor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Circuit count:</p>
                <p>Lighting: 400m² ÷ 100m² per circuit = 4 circuits</p>
                <p>Power: 400m² ÷ 50m² per circuit = 8 circuits</p>
                <p>Dedicated: 2 (server room, kitchen)</p>
                <p>Total circuits: 14</p>
                <p className="mt-2">With 25% spare: 14 × 1.25 = 17.5</p>
                <p className="mt-2">Specification: <strong>18-way single-phase DB</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Three-Phase Load Balancing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Allocate circuits to achieve balanced phases.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Available loads:</p>
                <p>• Lighting: 3 × 6A circuits (18A total)</p>
                <p>• Sockets: 6 × 20A circuits (120A total)</p>
                <p>• HVAC: 2 × 16A three-phase loads</p>
                <p className="mt-2">Phase allocation:</p>
                <p>L1: 1 lighting (6A) + 2 sockets (40A) = 46A</p>
                <p>L2: 1 lighting (6A) + 2 sockets (40A) = 46A</p>
                <p>L3: 1 lighting (6A) + 2 sockets (40A) = 46A</p>
                <p className="text-green-400 mt-2">Balanced within 5% - acceptable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Maximum Demand with Diversity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate maximum demand for incoming cable sizing.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Connected loads:</p>
                <p>Lighting: 6kW × 0.66 = 3.96kW</p>
                <p>Sockets: First 10A (2.3kW) + (30A × 0.4 × 0.23) = 5.06kW</p>
                <p>Server room: 4kW × 1.0 = 4.00kW</p>
                <p>HVAC: 8kW × 0.8 = 6.40kW</p>
                <p className="mt-2">Maximum demand: <strong>19.42kW</strong></p>
                <p>Current at 230V: 19420 ÷ 230 = <strong>84.4A</strong></p>
                <p className="text-white/60">Specify 100A incoming device</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Configuration</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Split circuits between multiple RCDs to avoid total loss</li>
                <li className="pl-1">Keep lighting and power on separate RCDs</li>
                <li className="pl-1">Consider RCBOs for critical circuits</li>
                <li className="pl-1">Type A RCDs for general use, Type B for VFDs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify fault rating matches prospective fault current</li>
                <li className="pl-1">Confirm IP rating suits the environment</li>
                <li className="pl-1">Check mounting height for accessibility</li>
                <li className="pl-1">Ensure 700mm working clearance</li>
                <li className="pl-1">Include spare ways for future expansion</li>
                <li className="pl-1">Specify circuit chart and labelling requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No spare ways</strong> - Always include 20-30% spare</li>
                <li className="pl-1"><strong>Unbalanced phases</strong> - Check phase allocation</li>
                <li className="pl-1"><strong>Single RCD</strong> - Split loads to prevent total blackout</li>
                <li className="pl-1"><strong>Poor labelling</strong> - Specify durable, clear labels</li>
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
                <p className="font-medium text-white mb-1">Diversity Factors</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 66%</li>
                  <li>Sockets: First 10A + 40%</li>
                  <li>Cooking: First 10A + 30%</li>
                  <li>Water heating: 100%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mounting Heights</p>
                <ul className="space-y-0.5">
                  <li>Minimum: 450mm</li>
                  <li>Maximum: 1200mm</li>
                  <li>Ideal: 900-1000mm</li>
                  <li>Clearance: 700mm front</li>
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
            <Link to="../h-n-c-module4-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: LV Switchgear
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5-3">
              Next: Busbar Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section5_2;
