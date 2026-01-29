import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Busbar Systems - HNC Module 7 Section 1.2";
const DESCRIPTION = "Master busbar trunking systems for building services: rising mains, tap-off units, current ratings, IP ratings, fire barriers, and installation requirements per BS 7671.";

const quickCheckQuestions = [
  {
    id: "busbar-advantage",
    question: "What is the primary advantage of busbar trunking over traditional cable systems?",
    options: ["Lower initial cost", "Flexibility for future modifications and tap-off connections", "No maintenance required", "Higher fault levels"],
    correctIndex: 1,
    explanation: "Busbar trunking provides excellent flexibility for future modifications. Tap-off units can be added, removed, or relocated along the busbar run without major rewiring, making it ideal for buildings where power distribution needs may change."
  },
  {
    id: "rising-main-purpose",
    question: "What is the primary purpose of a rising main in a multi-storey building?",
    options: ["To provide emergency lighting", "To distribute power vertically through the building floors", "To connect to the incoming supply", "To provide earthing continuity"],
    correctIndex: 1,
    explanation: "A rising main is a vertical busbar trunking system that distributes electrical power from the main switchboard up through multiple floors, allowing tap-off connections at each level for floor distribution boards."
  },
  {
    id: "tap-off-function",
    question: "What is the function of a tap-off unit in a busbar system?",
    options: ["To terminate the busbar run", "To provide a connection point for drawing power from the busbar", "To join two busbar sections", "To provide fire stopping"],
    correctIndex: 1,
    explanation: "A tap-off unit (also called a plug-in unit) provides a safe connection point to draw power from the busbar. It typically includes a fuse or circuit breaker for overcurrent protection and can be connected while the busbar remains energised (subject to design)."
  },
  {
    id: "fire-barrier-requirement",
    question: "When a busbar rises through a fire compartment floor, what is required?",
    options: ["The busbar must be disconnected", "Fire barriers must be installed to maintain compartmentation", "The busbar rating must be increased", "No special requirements apply"],
    correctIndex: 1,
    explanation: "When busbar trunking penetrates fire compartment boundaries (floors or walls), fire barriers must be installed around the busbar to maintain the fire resistance of the building element, typically matching the fire rating of the floor/wall being penetrated."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical construction material for busbar conductors in commercial installations?",
    options: [
      "Steel",
      "Copper or aluminium",
      "Silver-plated brass",
      "Zinc-coated iron"
    ],
    correctAnswer: 1,
    explanation: "Busbar conductors are typically manufactured from copper or aluminium. Copper offers better conductivity but aluminium is lighter and more cost-effective for larger installations. Both are enclosed in protective housings."
  },
  {
    id: 2,
    question: "What IP rating is typically required for busbar trunking installed in plant rooms?",
    options: ["IP20", "IP40", "IP54 or higher", "IP68"],
    correctAnswer: 2,
    explanation: "Plant rooms may be subject to water ingress, dust, and maintenance activities. IP54 or higher is typically specified to provide protection against dust ingress and water splashing from any direction."
  },
  {
    id: 3,
    question: "According to BS 7671, what must be considered when selecting busbar trunking current ratings?",
    options: ["Only the connected load", "Ambient temperature, grouping, and installation method", "The colour of the enclosure", "Only the cable entry size"],
    correctAnswer: 1,
    explanation: "Busbar current ratings must be derated for ambient temperature (typically rated at 35C), grouping with other heat sources, and installation method. Vertical rising mains may have different ratings than horizontal runs due to convection effects."
  },
  {
    id: 4,
    question: "What is the purpose of an expansion joint in a long busbar run?",
    options: [
      "To increase the current rating",
      "To accommodate thermal expansion and contraction",
      "To provide additional tap-off points",
      "To improve the IP rating"
    ],
    correctAnswer: 1,
    explanation: "Expansion joints accommodate thermal expansion and contraction of the busbar conductors caused by load cycling and ambient temperature changes. Without them, thermal stress could damage joints and enclosures."
  },
  {
    id: 5,
    question: "What type of tap-off unit allows connection without isolating the busbar?",
    options: [
      "Dead-front tap-off",
      "Live tap-off (plug-in) unit",
      "Terminal tap-off",
      "End feed unit"
    ],
    correctAnswer: 1,
    explanation: "Live tap-off (plug-in) units are designed to be safely connected and disconnected while the busbar remains energised. They incorporate shuttered contacts and are touch-safe when partially inserted."
  },
  {
    id: 6,
    question: "For a rising main serving 10 floors, where should the main protective device be located?",
    options: [
      "At the top floor",
      "At the basement/ground floor intake position",
      "On every floor",
      "At the middle floor"
    ],
    correctAnswer: 1,
    explanation: "The main protective device for a rising main should be located at the origin of the busbar system, typically at basement or ground floor level where the main switchboard is located. This protects the entire rising main from overcurrent."
  },
  {
    id: 7,
    question: "What documentation must be provided with busbar trunking installation?",
    options: [
      "Only the invoice",
      "Type test certificates, installation certificates, and manufacturer's data",
      "Only the warranty card",
      "Verbal confirmation is sufficient"
    ],
    correctAnswer: 1,
    explanation: "Busbar installations require type test certificates demonstrating compliance with standards, installation certificates confirming correct installation, manufacturer's technical data including ratings and derating factors, and maintenance requirements."
  },
  {
    id: 8,
    question: "What is the typical fire barrier rating required when busbar penetrates a 2-hour fire compartment floor?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours minimum",
      "No specific requirement"
    ],
    correctAnswer: 2,
    explanation: "Fire barriers around services penetrations must provide fire resistance equal to or greater than the element being penetrated. A 2-hour fire compartment floor requires fire barriers with a minimum 2-hour rating."
  },
  {
    id: 9,
    question: "What advantage does sandwich-type busbar construction offer?",
    options: [
      "Easier tap-off connection",
      "Lower impedance and better short-circuit performance",
      "Higher IP rating",
      "Reduced weight"
    ],
    correctAnswer: 1,
    explanation: "Sandwich construction places phase conductors in close proximity with minimal air gap, reducing the reactance (impedance) of the busbar system. This provides better voltage regulation and higher prospective short-circuit current capacity."
  },
  {
    id: 10,
    question: "When installing busbar trunking vertically, what additional consideration is required?",
    options: [
      "No additional considerations",
      "Support brackets at specified intervals and thermal expansion allowance",
      "Only aesthetic considerations",
      "Higher IP rating only"
    ],
    correctAnswer: 1,
    explanation: "Vertical busbar runs require support brackets at manufacturer-specified intervals (typically every 2-3 metres) to carry the weight. Thermal expansion must also be accommodated as heat rises, creating temperature differentials along the run."
  },
  {
    id: 11,
    question: "What is the minimum clearance typically required around busbar trunking for maintenance access?",
    options: [
      "100mm",
      "300mm",
      "600mm as per manufacturer's requirements",
      "No minimum required"
    ],
    correctAnswer: 2,
    explanation: "Manufacturers typically specify minimum clearances of 600mm for access to tap-off points and maintenance. This should be confirmed with the specific manufacturer's installation requirements and coordinated with other services."
  },
  {
    id: 12,
    question: "How is earth continuity maintained throughout a busbar trunking system?",
    options: [
      "By the metal enclosure only",
      "By a dedicated earth conductor within the busbar and bonded enclosure sections",
      "Earth continuity is not required",
      "By external earth tapes only"
    ],
    correctAnswer: 1,
    explanation: "Earth continuity is maintained by a dedicated protective conductor (PE bar) within the busbar trunking, plus bonding of the metal enclosure sections. Joint designs ensure continuity is maintained through bolted connections with specified torque values."
  }
];

const faqs = [
  {
    question: "When should busbar trunking be specified instead of cables?",
    answer: "Busbar trunking is typically specified for: high current loads (&gt;400A) where multiple cables would be required, installations requiring flexibility for future modifications, rising mains in multi-storey buildings, situations where quick installation is essential, and where tap-off connections will be required along the distribution route. Cable systems may be more economical for lower currents, simple point-to-point connections, or where routing is complex."
  },
  {
    question: "How do I determine the correct busbar rating for a rising main?",
    answer: "Calculate the maximum demand using diversity factors per BS 7671 for all floors served. Apply derating factors for ambient temperature, altitude if applicable, and installation orientation. Allow margin for future load growth (typically 20-30%). Consider short-circuit ratings and coordinate with upstream protective devices. Always verify with manufacturer's data sheets for the specific product."
  },
  {
    question: "Can tap-off units be added to an existing busbar system?",
    answer: "Yes, this is a key advantage of busbar systems. Most modern busbar trunking is designed for tap-off units to be added, removed, or relocated. However, you must verify: sufficient spare capacity exists, the tap-off unit is compatible with the busbar type, and appropriate isolation procedures are followed. Some tap-off designs allow live connection; others require the busbar to be de-energised."
  },
  {
    question: "What maintenance does busbar trunking require?",
    answer: "Regular maintenance includes: visual inspection for damage or overheating signs, thermal imaging during operation to identify hot joints, checking joint torques (especially after initial thermal cycling), verifying fire barrier integrity, testing earth continuity, and cleaning ventilation openings if present. Manufacturer's maintenance schedules should be followed, typically annually for visual checks with more detailed inspections every 3-5 years."
  },
  {
    question: "How are fire barriers installed around busbar trunking?",
    answer: "Fire barriers are installed by: cutting the barrier material to fit closely around the busbar enclosure, installing intumescent collars or wraps that expand when heated to seal gaps, applying fire-rated sealant around remaining gaps, and ensuring the barrier is properly supported. Installation must be by competent persons using tested proprietary systems appropriate for the fire rating required and the specific busbar product."
  },
  {
    question: "What testing is required after busbar installation?",
    answer: "Required tests include: continuity of protective conductors (earth bar and enclosure bonding), insulation resistance between phases and phase-to-earth, verification of correct phase rotation, joint torque verification, earth fault loop impedance at tap-off points, and functional testing of any integral protective devices. Results must be documented on the appropriate electrical installation certificate."
  }
];

const HNCModule7Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1">
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
            <span>Module 7.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Busbar Systems
          </h1>
          <p className="text-white/80">
            Busbar trunking, rising mains, tap-off units, ratings, and installation requirements for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Busbar trunking:</strong> Prefabricated power distribution system</li>
              <li className="pl-1"><strong>Rising mains:</strong> Vertical distribution in multi-storey buildings</li>
              <li className="pl-1"><strong>Tap-off units:</strong> Connection points along busbar runs</li>
              <li className="pl-1"><strong>Fire barriers:</strong> Required at compartment penetrations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Ratings:</strong> 25A to 6300A typical range</li>
              <li className="pl-1"><strong>IP ratings:</strong> IP40 to IP68 available</li>
              <li className="pl-1"><strong>Standards:</strong> BS EN 61439-6 for busbar trunking</li>
              <li className="pl-1"><strong>Applications:</strong> Commercial, industrial, data centres</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand busbar trunking construction and types",
              "Design rising main systems for multi-storey buildings",
              "Select appropriate tap-off units and connection methods",
              "Apply current and IP ratings for different environments",
              "Implement fire barriers at compartment penetrations",
              "Install busbar systems compliant with BS 7671"
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

        {/* Section 1: Busbar Trunking Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Busbar Trunking Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Busbar trunking systems (also known as busways) are prefabricated electrical distribution systems
              consisting of copper or aluminium conductors enclosed in a protective housing. They provide an
              efficient alternative to traditional cable systems for distributing electrical power in commercial
              and industrial buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key components of busbar trunking:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Conductors:</strong> Copper or aluminium bars carrying current (L1, L2, L3, N, PE)</li>
                <li className="pl-1"><strong>Insulation:</strong> Epoxy, polyester film, or air gap insulation between phases</li>
                <li className="pl-1"><strong>Enclosure:</strong> Steel or aluminium housing providing mechanical protection</li>
                <li className="pl-1"><strong>Joints:</strong> Bolted connections between sections with specified torque values</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Busbar Construction Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Construction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air-insulated</td>
                      <td className="border border-white/10 px-3 py-2">Conductors separated by air gaps</td>
                      <td className="border border-white/10 px-3 py-2">Lighting trunking, low-current distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sandwich (compact)</td>
                      <td className="border border-white/10 px-3 py-2">Conductors in close proximity with film insulation</td>
                      <td className="border border-white/10 px-3 py-2">High-current feeder runs, low impedance required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cast resin</td>
                      <td className="border border-white/10 px-3 py-2">Conductors encapsulated in epoxy resin</td>
                      <td className="border border-white/10 px-3 py-2">Harsh environments, high IP rating required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Segregated phase</td>
                      <td className="border border-white/10 px-3 py-2">Each phase in separate metal enclosure</td>
                      <td className="border border-white/10 px-3 py-2">Very high currents (&gt;3000A), enhanced safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Busbar trunking offers significant advantages over cables including faster installation, flexibility for modifications, better heat dissipation, and reduced fire load in the building.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Rising Mains */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Rising Mains for Multi-Storey Buildings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rising mains are vertical busbar trunking systems that distribute electrical power from the main
              switchboard (typically at basement or ground level) up through multiple floors of a building.
              They are essential for efficient power distribution in high-rise commercial and residential buildings.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Total connected load per floor</li>
                  <li className="pl-1">Diversity factors applied</li>
                  <li className="pl-1">Future load growth allowance</li>
                  <li className="pl-1">Short-circuit ratings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structural Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Dedicated riser shaft/cupboard</li>
                  <li className="pl-1">Support brackets at intervals</li>
                  <li className="pl-1">Floor penetration openings</li>
                  <li className="pl-1">Maintenance access space</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Safety Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fire barriers at each floor</li>
                  <li className="pl-1">Intumescent sealing systems</li>
                  <li className="pl-1">Smoke stopping measures</li>
                  <li className="pl-1">Fire-rated riser enclosure</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rising Main Sizing Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consideration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ambient temperature</td>
                      <td className="border border-white/10 px-3 py-2">Derating if above 35C</td>
                      <td className="border border-white/10 px-3 py-2">0.95 at 40C, 0.90 at 45C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation orientation</td>
                      <td className="border border-white/10 px-3 py-2">Vertical ratings may differ from horizontal</td>
                      <td className="border border-white/10 px-3 py-2">Typically same or slightly higher vertically</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Altitude</td>
                      <td className="border border-white/10 px-3 py-2">Derating above 2000m</td>
                      <td className="border border-white/10 px-3 py-2">0.98 per 500m above 2000m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonic content</td>
                      <td className="border border-white/10 px-3 py-2">Additional neutral loading</td>
                      <td className="border border-white/10 px-3 py-2">Size neutral for 1.5x or double neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Future growth</td>
                      <td className="border border-white/10 px-3 py-2">Allowance for load increases</td>
                      <td className="border border-white/10 px-3 py-2">Typically 20-30% spare capacity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Rising mains should be sized for the maximum anticipated load over the building's life, as replacement is extremely disruptive and costly.
            </p>
          </div>
        </section>

        {/* Section 3: Tap-Off Units and Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tap-Off Units, Ratings and IP Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tap-off units (also called plug-in units or tap boxes) provide connection points along the busbar
              trunking for drawing power to distribution boards or equipment. They are a key advantage of busbar
              systems, allowing flexible connection and modification throughout the building's life.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Tap-Off Unit Types</p>
              <div className="text-sm space-y-2">
                <p><span className="text-white/60">Plug-in (live):</span> <span className="text-white">Can be connected/disconnected with busbar energised - shuttered contacts for safety</span></p>
                <p><span className="text-white/60">Bolt-on:</span> <span className="text-white">Bolted connection requiring busbar isolation - higher fault ratings available</span></p>
                <p><span className="text-white/60">Cable tap:</span> <span className="text-white">Provides cable termination for connection to remote equipment</span></p>
                <p><span className="text-white/60">Motor starter:</span> <span className="text-white">Integrated DOL or star-delta starter for motor connection</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Rating Ranges</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lighting trunking:</strong> 25A to 63A - for lighting and small power distribution</li>
                <li className="pl-1"><strong>Feeder trunking:</strong> 100A to 1000A - for sub-distribution and equipment feeds</li>
                <li className="pl-1"><strong>High-power trunking:</strong> 1000A to 6300A - main distribution from transformers</li>
                <li className="pl-1"><strong>Tap-off units:</strong> Typically 16A to 630A dependent on busbar system</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Ratings for Different Environments</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IP Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office/commercial (dry)</td>
                      <td className="border border-white/10 px-3 py-2">IP40</td>
                      <td className="border border-white/10 px-3 py-2">Protection against objects &gt;1mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant rooms</td>
                      <td className="border border-white/10 px-3 py-2">IP54</td>
                      <td className="border border-white/10 px-3 py-2">Dust protected, splash resistant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial/warehouse</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Dust protected, water jet resistant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outdoor/wet areas</td>
                      <td className="border border-white/10 px-3 py-2">IP65 to IP68</td>
                      <td className="border border-white/10 px-3 py-2">Dust tight, water immersion protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centres</td>
                      <td className="border border-white/10 px-3 py-2">IP54</td>
                      <td className="border border-white/10 px-3 py-2">Clean environment but water detection systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> When specifying tap-off units, consider the short-circuit rating as well as the continuous current rating - the tap-off must withstand prospective fault currents until cleared by protective devices.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Installation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation Requirements per BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 and BS EN 61439-6 set out requirements for busbar trunking installation. Compliance with
              manufacturer's instructions is essential as busbar systems are type-tested assemblies where
              installation parameters affect the certified ratings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Installation Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Physical Installation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Support brackets at specified intervals (typically 2-3m)</li>
                    <li>Expansion joints for thermal movement</li>
                    <li>Minimum clearances for tap-off access (typically 600mm)</li>
                    <li>Correct orientation as per manufacturer</li>
                    <li>Protection from mechanical damage</li>
                    <li>Corrosion protection where required</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Electrical Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Joint torques to specification</li>
                    <li>Earth continuity through all sections</li>
                    <li>Correct phase sequence maintained</li>
                    <li>Coordination with protective devices</li>
                    <li>Short-circuit withstand verification</li>
                    <li>Voltage drop calculations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Barrier Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire rating</td>
                      <td className="border border-white/10 px-3 py-2">Match the penetrated element</td>
                      <td className="border border-white/10 px-3 py-2">30, 60, 90, or 120 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Barrier type</td>
                      <td className="border border-white/10 px-3 py-2">Proprietary tested system</td>
                      <td className="border border-white/10 px-3 py-2">Third-party certification required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation</td>
                      <td className="border border-white/10 px-3 py-2">By trained operatives</td>
                      <td className="border border-white/10 px-3 py-2">Fire stopping certificate issued</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gap filling</td>
                      <td className="border border-white/10 px-3 py-2">Intumescent sealant</td>
                      <td className="border border-white/10 px-3 py-2">Compatible with busbar housing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance access</td>
                      <td className="border border-white/10 px-3 py-2">Removable barriers may be required</td>
                      <td className="border border-white/10 px-3 py-2">Must maintain fire integrity when closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages Over Cable Systems</p>
              <div className="text-sm space-y-2">
                <p><strong>Installation speed:</strong> Pre-fabricated sections install faster than pulling and terminating multiple cables</p>
                <p><strong>Flexibility:</strong> Tap-offs can be added, removed, or relocated without major rewiring</p>
                <p><strong>Space efficiency:</strong> Compact compared to equivalent cable tray installations</p>
                <p><strong>Heat dissipation:</strong> Better thermal performance than bundled cables</p>
                <p><strong>Lower fire load:</strong> Less combustible material than PVC-insulated cables</p>
                <p><strong>Reduced voltage drop:</strong> Lower impedance, especially sandwich construction</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Compliance note:</strong> Busbar trunking installations must be carried out to manufacturer's instructions and documented with appropriate certificates including type test reports and fire barrier certificates.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Rising Main Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a rising main for a 10-storey office building with 50kVA per floor demand.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given data:</p>
                <p className="ml-4">Floors: 10</p>
                <p className="ml-4">Demand per floor: 50kVA</p>
                <p className="ml-4">Supply voltage: 400V three-phase</p>
                <p className="ml-4">Ambient temperature: 35C (standard)</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">Total connected load = 10 x 50 = 500kVA</p>
                <p className="ml-4">Apply diversity (0.8 typical for offices) = 500 x 0.8 = 400kVA</p>
                <p className="ml-4">Maximum demand current = 400,000 / (400 x 1.732) = 577A</p>
                <p className="ml-4">Add 25% future growth = 577 x 1.25 = 722A</p>
                <p className="mt-2 text-green-400">Select 800A busbar trunking system</p>
                <p className="text-white/60">Verify short-circuit rating &gt; prospective fault level at intake</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Tap-Off Unit Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select tap-off units for floor distribution boards from a 1000A rising main.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Floor requirements:</p>
                <p className="ml-4">Typical floor load: 50kVA diversified</p>
                <p className="ml-4">Floor current = 50,000 / (400 x 1.732) = 72A</p>
                <p className="ml-4">With growth allowance = 72 x 1.2 = 87A</p>
                <p className="mt-2">Selection criteria:</p>
                <p className="ml-4">Continuous rating: &gt;87A → Select 100A tap-off</p>
                <p className="ml-4">Short-circuit rating: Match busbar system (e.g., 50kA)</p>
                <p className="ml-4">Protection: Fuse or MCCB integral or separate</p>
                <p className="ml-4">Type: Plug-in for flexibility</p>
                <p className="mt-2 text-green-400">Selected: 100A plug-in tap-off with 100A MCCB</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fire Barrier Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify fire barriers for a 400A busbar penetrating 90-minute fire compartment floors.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirements:</p>
                <p className="ml-4">Fire rating required: 90 minutes (EI90)</p>
                <p className="ml-4">Busbar size: 400A (enclosure approx 200 x 200mm)</p>
                <p className="ml-4">Floor construction: 150mm reinforced concrete</p>
                <p className="mt-2">Specification:</p>
                <p className="ml-4">Fire barrier system: Proprietary intumescent collar or wrap</p>
                <p className="ml-4">Tested to: BS EN 1366-3</p>
                <p className="ml-4">Certification: Third-party tested for specific busbar type</p>
                <p className="ml-4">Sealant: Intumescent mastic for gaps up to 20mm</p>
                <p className="mt-2">Installation requirements:</p>
                <p className="ml-4">Installer: Trained and certificated</p>
                <p className="ml-4">Documentation: Fire stopping certificate per floor</p>
                <p className="ml-4 text-green-400">Inspection: Visual and recorded on as-built drawings</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Busbar Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify structural supports are installed at correct intervals</li>
                <li className="pl-1">Check floor/wall penetrations are correctly sized with expansion allowance</li>
                <li className="pl-1">Install sections with correct phase orientation throughout</li>
                <li className="pl-1">Torque all joints to manufacturer specification and record</li>
                <li className="pl-1">Install fire barriers at all compartment penetrations</li>
                <li className="pl-1">Complete earth continuity testing section by section</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard ambient rating: <strong>35C</strong> (derate above this)</li>
                <li className="pl-1">Typical support intervals: <strong>2-3 metres</strong> vertical</li>
                <li className="pl-1">Maintenance clearance: <strong>600mm minimum</strong> for tap-offs</li>
                <li className="pl-1">Expansion allowance: <strong>Approximately 1mm per metre per 10C rise</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incorrect joint torque</strong> - causes hot joints and eventual failure</li>
                <li className="pl-1"><strong>Missing fire barriers</strong> - serious fire safety breach</li>
                <li className="pl-1"><strong>Inadequate support</strong> - leads to mechanical stress on joints</li>
                <li className="pl-1"><strong>Ignoring thermal expansion</strong> - causes distortion and joint damage</li>
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
                  <li>Air-insulated - lighting/low current</li>
                  <li>Sandwich - low impedance feeder</li>
                  <li>Cast resin - harsh environments</li>
                  <li>Segregated phase - very high current</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Installation Essentials</p>
                <ul className="space-y-0.5">
                  <li>Support at 2-3m intervals</li>
                  <li>Fire barriers at penetrations</li>
                  <li>Joint torques to specification</li>
                  <li>Earth continuity throughout</li>
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
            <Link to="../h-n-c-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1-3">
              Next: Cable Tray and Ladder Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section1_2;
