import { ArrowLeft, GitBranch, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Busbar Systems - HNC Module 4 Section 5.3";
const DESCRIPTION = "Master busbar systems for building services: rising mains, busbar trunking, tap-off units, fire barriers, ratings and applications in commercial buildings.";

const quickCheckQuestions = [
  {
    id: "rising-main",
    question: "What is the primary advantage of a rising main busbar system over cable risers?",
    options: ["Lower initial cost", "Easier tap-off connections at each floor", "No fire barriers required", "Smaller physical size"],
    correctIndex: 1,
    explanation: "Rising mains allow standardised tap-off connections at each floor without the need to terminate heavy cables. This provides flexibility for future load changes and simplifies connections."
  },
  {
    id: "fire-barrier",
    question: "How often must fire barriers be installed in vertical busbar risers?",
    options: ["Every 5m", "Every 10m", "At each floor penetration", "Only at top and bottom"],
    correctIndex: 2,
    explanation: "Fire barriers must be installed at each floor penetration to maintain the fire compartmentation of the building. This prevents fire and smoke spread through the riser void."
  },
  {
    id: "tap-off",
    question: "What protection does a plug-in tap-off unit typically contain?",
    options: ["No protection - connects directly", "Fuse or circuit breaker", "Surge protection only", "Earth fault protection only"],
    correctIndex: 1,
    explanation: "Tap-off units contain integral protection (fuse or MCB/MCCB) to protect the outgoing circuit. This provides isolation and overcurrent protection at the point of connection."
  },
  {
    id: "rating",
    question: "A busbar system is rated at 1600A. What does this indicate?",
    options: ["Maximum fault current", "Continuous current capacity", "Peak current only", "Neutral current capacity"],
    correctIndex: 1,
    explanation: "The busbar rating indicates the continuous current carrying capacity under specified conditions. This is the maximum sustained load current the system can carry without exceeding temperature limits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is busbar trunking?",
    options: [
      "Underground cable protection",
      "Prefabricated conductor system in protective housing",
      "Type of cable tray",
      "Transformer winding"
    ],
    correctAnswer: 1,
    explanation: "Busbar trunking is a prefabricated power distribution system consisting of copper or aluminium conductors enclosed in a protective housing. It provides high-current distribution with easy tap-off capability."
  },
  {
    id: 2,
    question: "Which type of busbar system is most commonly used for vertical distribution in multi-storey buildings?",
    options: [
      "Lighting trunking",
      "Rising main busbar",
      "Sandwich busbar",
      "Overhead busbar"
    ],
    correctAnswer: 1,
    explanation: "Rising main busbars run vertically through buildings, typically in dedicated risers, allowing floor-by-floor tap-off connections for distribution boards on each level."
  },
  {
    id: 3,
    question: "What is the purpose of a bus section unit in busbar systems?",
    options: [
      "To increase current capacity",
      "To provide isolation between sections",
      "To connect to transformers only",
      "To reduce installation cost"
    ],
    correctAnswer: 1,
    explanation: "Bus section units allow isolation of portions of the busbar run for maintenance or fault isolation without shutting down the entire system. They contain switches or circuit breakers."
  },
  {
    id: 4,
    question: "What conductor material is typically used for high-current busbar systems?",
    options: [
      "Steel only",
      "Copper or aluminium",
      "Bronze only",
      "Brass"
    ],
    correctAnswer: 1,
    explanation: "Copper and aluminium are used for busbar conductors. Copper has higher conductivity but aluminium is lighter and cheaper. Selection depends on current, space and cost requirements."
  },
  {
    id: 5,
    question: "Why must busbar joints be carefully torqued during installation?",
    options: [
      "To prevent noise",
      "To ensure low-resistance connections and prevent overheating",
      "To meet aesthetic requirements",
      "To reduce installation time"
    ],
    correctAnswer: 1,
    explanation: "Properly torqued joints ensure good electrical contact, minimising resistance at the joint. Poor joints cause localised heating, which can lead to failure and fire."
  },
  {
    id: 6,
    question: "What is the typical application for lighting busbar trunking?",
    options: [
      "Supplying distribution boards",
      "Feeding multiple luminaires along a linear run",
      "Main incoming supply",
      "Motor control centres"
    ],
    correctAnswer: 1,
    explanation: "Lighting trunking provides a continuous supply along its length with multiple tap-off points for luminaires. It's commonly used in warehouses, retail and industrial lighting installations."
  },
  {
    id: 7,
    question: "What protection is required where busbar trunking passes through fire barriers?",
    options: [
      "No special protection needed",
      "Fire-rated collars or seals to maintain compartmentation",
      "Additional earth bonding only",
      "Increased IP rating"
    ],
    correctAnswer: 1,
    explanation: "Fire barriers around busbar penetrations must maintain the fire rating of the compartment. Purpose-made fire-rated collars or intumescent seals are used to close gaps when fire occurs."
  },
  {
    id: 8,
    question: "What is the advantage of sandwich-type busbar construction?",
    options: [
      "Lower cost only",
      "Compact size with good heat dissipation",
      "Higher fault rating",
      "Easier installation"
    ],
    correctAnswer: 1,
    explanation: "Sandwich construction places conductors close together separated by insulation, providing compact dimensions and good natural heat dissipation through the enclosure surface."
  },
  {
    id: 9,
    question: "How are tap-off units typically connected to busbar trunking?",
    options: [
      "Permanent welded connection",
      "Plug-in connection through access opening",
      "Cable gland connection",
      "Bolted terminal only"
    ],
    correctAnswer: 1,
    explanation: "Plug-in tap-off units connect through dedicated access openings in the busbar housing. Spring-loaded contacts ensure reliable connection, and units can be added or moved without system shutdown."
  },
  {
    id: 10,
    question: "What derating factor must be considered for busbar systems at elevated ambient temperatures?",
    options: [
      "No derating needed",
      "Increased rating by 10%",
      "Reduced rating per manufacturer data",
      "Only affects aluminium systems"
    ],
    correctAnswer: 2,
    explanation: "Busbar ratings are specified at standard ambient temperature (typically 35°C). Higher ambients require derating to prevent conductor temperature exceeding design limits - manufacturer tables provide factors."
  }
];

const faqs = [
  {
    question: "When should I specify busbar trunking instead of cables?",
    answer: "Consider busbar trunking when: current exceeds 400-600A (where multiple parallel cables become unwieldy), flexible tap-off is needed along the route, future load changes are likely, or installation time is critical. For straight runs with high current, busbar is often more economical than parallel cables."
  },
  {
    question: "How do I size a rising main busbar system?",
    answer: "Calculate the maximum demand at the base of the riser (sum of all floor loads with diversity). Select busbar rated for this current plus 20-30% growth margin. Verify voltage drop along the full length is acceptable. Consider tap-off unit ratings for each floor connection."
  },
  {
    question: "What maintenance do busbar systems require?",
    answer: "Annual thermal imaging of joints and connections to detect hot spots. Periodic torque checks on bolted connections. Inspection of tap-off units and fire barriers. Cleaning of enclosure ventilation openings. Check for signs of overheating, corrosion or mechanical damage."
  },
  {
    question: "Can busbar trunking be installed outdoors?",
    answer: "Yes, with appropriate IP rating (IP65 minimum for exposed outdoor locations). External busbars need protection against UV, temperature extremes and moisture. Thermal expansion joints are essential for long outdoor runs. Weatherproof tap-off units must be specified."
  },
  {
    question: "What is the difference between IP55 and IP65 rated busbar?",
    answer: "IP55 is dust-protected and protected against water jets - suitable for covered outdoor or industrial indoor locations. IP65 is dust-tight and protected against water jets - required for fully exposed outdoor installations or harsh wash-down environments."
  }
];

const HNCModule4Section5_3 = () => {
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
            <GitBranch className="h-4 w-4" />
            <span>Module 4.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Busbar Systems
          </h1>
          <p className="text-white/80">
            High-current distribution solutions for commercial and industrial building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Rising mains:</strong> Vertical distribution with floor tap-offs</li>
              <li className="pl-1"><strong>Busbar trunking:</strong> Prefabricated high-current distribution</li>
              <li className="pl-1"><strong>Tap-off units:</strong> Plug-in connections with protection</li>
              <li className="pl-1"><strong>Fire barriers:</strong> Required at all floor penetrations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Current range:</strong> 25A lighting to 6300A mains</li>
              <li className="pl-1"><strong>Materials:</strong> Copper or aluminium conductors</li>
              <li className="pl-1"><strong>Applications:</strong> Multi-storey, industrial, data centres</li>
              <li className="pl-1"><strong>Standards:</strong> BS EN 61439-6 for busbar trunking</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand rising main applications in multi-storey buildings",
              "Specify busbar trunking for different current requirements",
              "Select appropriate tap-off units with correct protection",
              "Apply fire barrier requirements at compartment penetrations",
              "Determine busbar ratings with derating factors",
              "Compare busbar versus cable solutions for different applications"
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

        {/* Section 1: Rising Mains */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Rising Mains
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rising mains provide vertical power distribution in multi-storey buildings. They
              run from the main switchroom through dedicated risers, with tap-off points at each
              floor for connection to floor distribution boards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advantages of rising main systems:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standardised floor connections simplify installation</li>
                <li className="pl-1">Easy to add or modify floor connections</li>
                <li className="pl-1">Reduced cable congestion compared to multiple cable runs</li>
                <li className="pl-1">Lower voltage drop than equivalent cable systems</li>
                <li className="pl-1">Factory-tested components ensure quality</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rising Main System Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Feed unit</td>
                      <td className="border border-white/10 px-3 py-2">Connects to main switchboard</td>
                      <td className="border border-white/10 px-3 py-2">Base of riser</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Straight lengths</td>
                      <td className="border border-white/10 px-3 py-2">Conduct power vertically</td>
                      <td className="border border-white/10 px-3 py-2">Throughout riser</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tap-off boxes</td>
                      <td className="border border-white/10 px-3 py-2">Floor connection points</td>
                      <td className="border border-white/10 px-3 py-2">Each floor level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire barriers</td>
                      <td className="border border-white/10 px-3 py-2">Maintain fire compartmentation</td>
                      <td className="border border-white/10 px-3 py-2">Each floor slab</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Support brackets</td>
                      <td className="border border-white/10 px-3 py-2">Carry weight, allow expansion</td>
                      <td className="border border-white/10 px-3 py-2">Typically every 2-3m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">End cap</td>
                      <td className="border border-white/10 px-3 py-2">Terminates system safely</td>
                      <td className="border border-white/10 px-3 py-2">Top of riser</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Size rising mains for the maximum demand at the base plus 25% growth allowance. Voltage drop is cumulative up the riser.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Busbar Trunking Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Busbar Trunking Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbar trunking systems are manufactured for different current ranges and applications.
              Understanding the types enables correct specification for each project requirement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Busbar Trunking Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting trunking</td>
                      <td className="border border-white/10 px-3 py-2">25A - 63A</td>
                      <td className="border border-white/10 px-3 py-2">Warehouse, retail lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low power trunking</td>
                      <td className="border border-white/10 px-3 py-2">40A - 160A</td>
                      <td className="border border-white/10 px-3 py-2">Office floor distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium power trunking</td>
                      <td className="border border-white/10 px-3 py-2">160A - 1000A</td>
                      <td className="border border-white/10 px-3 py-2">Rising mains, sub-distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High power trunking</td>
                      <td className="border border-white/10 px-3 py-2">1000A - 6300A</td>
                      <td className="border border-white/10 px-3 py-2">Main distribution, data centres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cast resin busbar</td>
                      <td className="border border-white/10 px-3 py-2">Up to 6300A</td>
                      <td className="border border-white/10 px-3 py-2">Transformer connections, harsh environments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conductor Materials</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Copper:</strong> Higher conductivity, compact size</li>
                  <li className="pl-1"><strong>Aluminium:</strong> Lighter weight, lower cost</li>
                  <li className="pl-1">Copper typically 30% smaller for same current</li>
                  <li className="pl-1">Aluminium typically 40% lighter for same rating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Sandwich:</strong> Close-spaced conductors, compact</li>
                  <li className="pl-1"><strong>Edge-mounted:</strong> Conductors on edge for ventilation</li>
                  <li className="pl-1"><strong>Ventilated:</strong> Openings for natural cooling</li>
                  <li className="pl-1"><strong>Enclosed:</strong> Sealed for IP protection</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection criteria:</strong> Consider current rating, voltage drop, available space, IP requirement, cost and availability of tap-off units.
            </p>
          </div>
        </section>

        {/* Section 3: Tap-Off Units */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tap-Off Units
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tap-off units provide connection points from busbar trunking to outgoing circuits.
              They contain protection devices and allow connection without system shutdown in
              many cases.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tap-Off Unit Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Protection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fused tap-off</td>
                      <td className="border border-white/10 px-3 py-2">HRC fuses (BS 88)</td>
                      <td className="border border-white/10 px-3 py-2">Standard distribution connections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB tap-off</td>
                      <td className="border border-white/10 px-3 py-2">Miniature circuit breaker</td>
                      <td className="border border-white/10 px-3 py-2">Light loads, frequent operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB tap-off</td>
                      <td className="border border-white/10 px-3 py-2">Moulded case circuit breaker</td>
                      <td className="border border-white/10 px-3 py-2">Higher currents, adjustable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct tap-off</td>
                      <td className="border border-white/10 px-3 py-2">None (protection elsewhere)</td>
                      <td className="border border-white/10 px-3 py-2">Switchboard connections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting tap-off</td>
                      <td className="border border-white/10 px-3 py-2">MCB or fuse</td>
                      <td className="border border-white/10 px-3 py-2">Individual luminaire connection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Plug-In Connection Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Open tap-off access cover on busbar housing</li>
                <li className="pl-1">Ensure tap-off unit switch/breaker is OFF</li>
                <li className="pl-1">Insert tap-off unit into busbar contacts</li>
                <li className="pl-1">Secure unit with locking mechanism</li>
                <li className="pl-1">Close access cover and seal</li>
                <li className="pl-1">Connect outgoing cable and close tap-off cover</li>
                <li className="pl-1">Switch on and test</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> Many tap-off operations can be done live, but always follow manufacturer instructions and site safety procedures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Fire Barriers and Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fire Barriers and System Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbar systems must maintain building fire compartmentation and be rated appropriately
              for continuous and fault current conditions. Fire barrier details are critical for
              building regulation compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Barrier Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Fire barriers required at each compartment penetration</li>
                <li className="pl-1">Must match the fire rating of the penetrated element (typically 60-120 minutes)</li>
                <li className="pl-1">Use manufacturer-approved fire barrier systems</li>
                <li className="pl-1">Intumescent materials expand when heated to seal gaps</li>
                <li className="pl-1">Fire barriers must be inspected and certified</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Busbar System Ratings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated current</td>
                      <td className="border border-white/10 px-3 py-2">In</td>
                      <td className="border border-white/10 px-3 py-2">Maximum continuous current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short-time withstand</td>
                      <td className="border border-white/10 px-3 py-2">Icw</td>
                      <td className="border border-white/10 px-3 py-2">Fault current for 1 second</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak withstand</td>
                      <td className="border border-white/10 px-3 py-2">Ipk</td>
                      <td className="border border-white/10 px-3 py-2">Maximum instantaneous current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated voltage</td>
                      <td className="border border-white/10 px-3 py-2">Un</td>
                      <td className="border border-white/10 px-3 py-2">Maximum operating voltage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage drop</td>
                      <td className="border border-white/10 px-3 py-2">mV/A/m</td>
                      <td className="border border-white/10 px-3 py-2">Drop per amp per metre</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Derating Factors</p>
              <p className="text-sm text-white mb-2">Current ratings must be derated for:</p>
              <ul className="text-sm text-white space-y-1">
                <li>Ambient temperature above 35°C (0.95 at 40°C, 0.90 at 45°C typically)</li>
                <li>Altitude above 2000m</li>
                <li>Restricted ventilation</li>
                <li>Harmonic content above 15%</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Coordination:</strong> Ensure busbar Icw rating exceeds the let-through energy (I²t) of upstream protective devices to survive downstream faults.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Rising Main Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 8-storey office building with 80kVA per floor. Size the rising main.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total load: 8 floors × 80kVA = 640kVA</p>
                <p>Apply diversity (0.8): 640 × 0.8 = 512kVA</p>
                <p>Current at 400V: 512000 ÷ (√3 × 400) = 739A</p>
                <p className="mt-2">Add 25% growth: 739 × 1.25 = 924A</p>
                <p className="mt-2">Specification: <strong>1000A rising main busbar</strong></p>
                <p className="text-white/60">Verify voltage drop at top floor</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Voltage Drop Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 1000A busbar, 35m height, 800A load at top floor. Busbar: 0.017 mV/A/m.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Voltage drop = Current × Length × Drop factor</p>
                <p>Vd = 800A × 35m × 0.017 mV/A/m</p>
                <p>Vd = 476mV = 0.476V per phase</p>
                <p className="mt-2">As percentage of 230V: (0.476 ÷ 230) × 100 = <strong>0.21%</strong></p>
                <p className="text-green-400 mt-2">Well within 5% limit - acceptable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Tap-Off Unit Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Floor DB with 63A maximum demand. Select tap-off protection.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Load current: 63A</p>
                <p>Tap-off rating: Next standard size = 80A</p>
                <p className="mt-2">Protection options:</p>
                <p>• 80A HRC fuses (BS 88-2) - high breaking capacity</p>
                <p>• 80A MCCB - adjustable, resettable</p>
                <p className="mt-2">Recommendation: <strong>80A MCCB tap-off unit</strong></p>
                <p className="text-white/60">MCCB allows easy resetting and adjustment</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Allow for thermal expansion in long runs (expansion joints)</li>
                <li className="pl-1">Support brackets at manufacturer-specified intervals</li>
                <li className="pl-1">Maintain ventilation clearances around enclosure</li>
                <li className="pl-1">Torque all joints to manufacturer specification</li>
                <li className="pl-1">Earth bonding at each section joint</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Rated current with appropriate margin</li>
                <li className="pl-1">Short-circuit ratings matching system PFC</li>
                <li className="pl-1">IP rating for environment</li>
                <li className="pl-1">Conductor material (copper/aluminium)</li>
                <li className="pl-1">Number and rating of tap-off positions</li>
                <li className="pl-1">Fire barrier details and certification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Installation Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Improper joint torque</strong> - Causes hot spots and failures</li>
                <li className="pl-1"><strong>Missing fire barriers</strong> - Building regulation breach</li>
                <li className="pl-1"><strong>Blocked ventilation</strong> - Leads to overheating</li>
                <li className="pl-1"><strong>No expansion provision</strong> - Causes mechanical stress</li>
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
                <p className="font-medium text-white mb-1">Busbar Types</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 25A-63A</li>
                  <li>Low power: 40A-160A</li>
                  <li>Medium: 160A-1000A</li>
                  <li>High power: 1000A-6300A</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61439-6 - Busbar trunking</li>
                  <li>BS 88 - HRC fuses</li>
                  <li>Building Regs - Fire barriers</li>
                  <li>BS 7671 - Installation</li>
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
            <Link to="../h-n-c-module4-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Distribution Board Design
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5-4">
              Next: UPS and Standby Power
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section5_3;
