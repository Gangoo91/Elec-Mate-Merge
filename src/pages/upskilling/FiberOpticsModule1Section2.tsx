import { ArrowLeft, TrendingUp, CheckCircle, Zap, Shield, Scale, Gauge, BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Advantages vs Copper Systems - Fibre Optics Course";
const DESCRIPTION = "Compare fibre optic and copper cabling systems. Understand bandwidth, distance, EMI immunity, and total cost of ownership differences.";

const quickCheckQuestions = [
  {
    id: "fo-m1s2-qc1",
    question: "What is the maximum reliable distance for Cat6A copper Ethernet?",
    options: ["10 metres", "55 metres", "100 metres", "500 metres"],
    correctIndex: 2,
    explanation: "Cat6A Ethernet has a maximum channel length of 100 metres (90m permanent link + 10m patch cords). Fibre can extend much further."
  },
  {
    id: "fo-m1s2-qc2",
    question: "Why is fibre immune to electromagnetic interference?",
    options: ["It uses stronger signals", "Light doesn't conduct electricity", "It has better shielding", "It operates at higher frequencies"],
    correctIndex: 1,
    explanation: "Since fibre transmits light through glass (a dielectric), there's no electrical component that can be affected by electromagnetic fields."
  },
  {
    id: "fo-m1s2-qc3",
    question: "Which cable type has the highest bandwidth potential?",
    options: ["Cat6A copper", "Cat8 copper", "Singlemode fibre", "Coaxial cable"],
    correctIndex: 2,
    explanation: "Singlemode fibre has bandwidth potential in the petabit range. Even multimode fibre exceeds Cat8 copper's maximum 40Gbps at 30m."
  }
];

const quizQuestions = [
  {
    question: "What is the main bandwidth limitation of copper cabling?",
    options: ["Cable cost", "Signal attenuation and crosstalk at high frequencies", "Weight of cables", "Colour coding issues"],
    correctAnswer: 1
  },
  {
    question: "At 10Gbps, how far can multimode OM4 fibre reliably transmit?",
    options: ["100 metres", "300-400 metres", "10 kilometres", "100 kilometres"],
    correctAnswer: 1
  },
  {
    question: "Which environment particularly benefits from fibre's EMI immunity?",
    options: ["Home offices", "Industrial facilities with heavy machinery", "Small retail shops", "Residential buildings"],
    correctAnswer: 1
  },
  {
    question: "What is 'alien crosstalk' in copper cabling?",
    options: ["Signals from space", "Interference between adjacent cables", "Signal reflection", "Ground loop noise"],
    correctAnswer: 1
  },
  {
    question: "Which cable type is easier to tap for eavesdropping?",
    options: ["Fibre optic", "Copper (emissions can be detected)", "Both equally difficult", "Neither can be tapped"],
    correctAnswer: 1
  },
  {
    question: "What is the typical weight comparison between equivalent fibre and copper cables?",
    options: ["Fibre is heavier", "Roughly the same", "Fibre is significantly lighter", "Depends on manufacturer only"],
    correctAnswer: 2
  },
  {
    question: "Why might copper still be preferred for desktop connections?",
    options: ["Higher bandwidth", "Can carry PoE (Power over Ethernet)", "Better security", "Longer distances"],
    correctAnswer: 1
  },
  {
    question: "What is the primary disadvantage of fibre for termination?",
    options: ["Slower speeds", "Requires specialised tools and training", "Cannot be bent", "Too expensive"],
    correctAnswer: 1
  },
  {
    question: "How does fibre compare to copper for total cost of ownership over 10+ years?",
    options: ["Always more expensive", "Often lower due to longevity and upgrade potential", "Exactly the same", "Cannot be compared"],
    correctAnswer: 1
  },
  {
    question: "Which standard defines Category 6A copper cable performance?",
    options: ["IEEE 802.3", "TIA-568", "ISO 9001", "BS 7671"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "When should I choose fibre over copper?",
    answer: "Choose fibre for: distances over 100m, 10Gbps+ speeds, EMI-heavy environments, security-sensitive links, future-proofing requirements, or where weight/space is limited. Copper suits shorter runs and where PoE is needed."
  },
  {
    question: "Is fibre always faster than copper?",
    answer: "Fibre has higher bandwidth potential, but at shorter distances (<100m), Cat6A/Cat8 copper can match fibre speeds (10-40Gbps). The difference becomes significant at longer distances and higher speeds."
  },
  {
    question: "Can I replace copper with fibre in an existing building?",
    answer: "Yes, but you'll need media converters or fibre NICs at endpoints, plus potentially new patch panels and infrastructure. Often done for backbone upgrades while keeping copper to desktops."
  },
  {
    question: "What about Power over Ethernet with fibre?",
    answer: "Standard fibre cannot carry electrical power. Solutions include hybrid cables (fibre + copper pairs), separate power runs, or PoE media converters at endpoints."
  },
  {
    question: "Is copper cabling becoming obsolete?",
    answer: "Not for desktop connectivity. Cat6A supports current needs well, and PoE remains copper-dependent. However, backbone and high-speed links are increasingly fibre-only."
  },
  {
    question: "How does installation cost compare?",
    answer: "Fibre materials cost more than copper, but installation can be faster (lighter cables, smaller containment). Total installed cost depends heavily on project specifics. Long-term fibre often wins on TCO."
  }
];

const FiberOpticsModule1Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            to="/electrical-upskilling/fiber-optics-module-1"
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 1</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <TrendingUp className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 1 • Section 2</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Advantages vs Copper Systems</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Understanding when fibre outperforms copper and making informed cabling decisions.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Scale className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Fibre excels at bandwidth, distance, and EMI immunity. Copper offers PoE capability and simpler
              termination. For backbone and high-speed links, fibre wins. For desktop connections under 100m
              where PoE is needed, copper remains practical.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Key Comparison
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Bandwidth: Fibre >> Copper</li>
              <li>• Distance: Fibre >> Copper (km vs 100m)</li>
              <li>• EMI: Fibre immune, Copper susceptible</li>
              <li>• PoE: Copper only (standard)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Compare bandwidth capabilities of fibre and copper",
              "Understand distance limitations of each technology",
              "Explain EMI immunity advantages of fibre",
              "Identify when copper is still the preferred choice",
              "Evaluate total cost of ownership considerations",
              "Make informed decisions for specific applications"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: Bandwidth Comparison */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">Bandwidth Comparison</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Bandwidth represents the data-carrying capacity of a transmission medium. Fibre optic cables
              dramatically outperform copper in terms of maximum bandwidth and the speeds achievable at various distances.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <h4 className="font-semibold text-white mb-3">Speed and Distance Comparison</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-elec-yellow">Cable Type</th>
                    <th className="text-center py-2 text-elec-yellow">Max Speed</th>
                    <th className="text-center py-2 text-elec-yellow">Max Distance</th>
                    <th className="text-center py-2 text-elec-yellow">10Gbps Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Cat5e</td>
                    <td className="text-center">1 Gbps</td>
                    <td className="text-center">100m</td>
                    <td className="text-center text-red-400">Not supported</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Cat6</td>
                    <td className="text-center">10 Gbps</td>
                    <td className="text-center">100m (1G) / 55m (10G)</td>
                    <td className="text-center text-orange-400">55m</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Cat6A</td>
                    <td className="text-center">10 Gbps</td>
                    <td className="text-center">100m</td>
                    <td className="text-center text-green-400">100m</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Cat8</td>
                    <td className="text-center">40 Gbps</td>
                    <td className="text-center">30m</td>
                    <td className="text-center text-green-400">30m</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">OM3 Multimode</td>
                    <td className="text-center">100 Gbps</td>
                    <td className="text-center">300m (10G) / 100m (100G)</td>
                    <td className="text-center text-green-400">300m</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">OM4 Multimode</td>
                    <td className="text-center">100 Gbps</td>
                    <td className="text-center">400m (10G) / 150m (100G)</td>
                    <td className="text-center text-green-400">400m</td>
                  </tr>
                  <tr>
                    <td className="py-2">OS2 Singlemode</td>
                    <td className="text-center">100+ Gbps</td>
                    <td className="text-center">10km+ (10G)</td>
                    <td className="text-center text-green-400">10km+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Why Fibre Has More Bandwidth</h4>
              <ul className="text-sm space-y-1">
                <li>• Light frequencies are in terahertz range (much higher than electrical signals)</li>
                <li>• No crosstalk between fibres (light doesn't radiate from glass)</li>
                <li>• Lower attenuation allows higher frequencies over longer distances</li>
                <li>• Wavelength division multiplexing (WDM) allows multiple channels per fibre</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Distance Capabilities */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Distance Capabilities</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The distance over which a cable can reliably carry signals is determined by attenuation
              (signal loss) and dispersion (signal spreading). Fibre dramatically outperforms copper.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Copper Limitations</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>100m maximum</strong> for Ethernet (TIA-568 standard)</li>
                  <li>• Signal degrades rapidly with frequency and distance</li>
                  <li>• Crosstalk increases at higher speeds</li>
                  <li>• Requires active equipment every 100m for longer runs</li>
                  <li>• Higher frequencies = shorter reliable distances</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Fibre Capabilities</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Multimode: 300-550m</strong> typical (10Gbps)</li>
                  <li>• <strong>Singlemode: 10-80km</strong> without amplification</li>
                  <li>• Transoceanic cables span thousands of kilometres</li>
                  <li>• Low attenuation (0.2-0.5 dB/km singlemode)</li>
                  <li>• Consistent performance across distance</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Practical Distance Scenarios</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-24 text-elec-yellow font-medium">Office Floor</span>
                  <span>50-100m - Copper Cat6A suitable</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-elec-yellow font-medium">Building Riser</span>
                  <span>100-500m - Multimode fibre preferred</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-elec-yellow font-medium">Campus</span>
                  <span>500m-2km - Singlemode or high-grade multimode</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-elec-yellow font-medium">Metro/WAN</span>
                  <span>2-80km - Singlemode only</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-elec-yellow font-medium">Long-haul</span>
                  <span>80km+ - Singlemode with amplifiers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: EMI Immunity */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Electromagnetic Interference (EMI)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Electromagnetic interference is a significant concern in many environments. Copper cables
              are susceptible to interference, while fibre is completely immune.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">EMI Sources Affecting Copper</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Industrial</h5>
                  <ul className="space-y-1">
                    <li>• Electric motors and drives</li>
                    <li>• Welding equipment</li>
                    <li>• High-voltage switchgear</li>
                    <li>• Variable frequency drives</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Building Systems</h5>
                  <ul className="space-y-1">
                    <li>• Fluorescent lighting</li>
                    <li>• Lift/elevator motors</li>
                    <li>• HVAC equipment</li>
                    <li>• Power distribution</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">External</h5>
                  <ul className="space-y-1">
                    <li>• Radio transmitters</li>
                    <li>• Mobile phone masts</li>
                    <li>• Lightning strikes</li>
                    <li>• Power lines</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Medical</h5>
                  <ul className="space-y-1">
                    <li>• MRI machines</li>
                    <li>• X-ray equipment</li>
                    <li>• Surgical devices</li>
                    <li>• Diagnostic equipment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Why Fibre is Immune
              </h4>
              <p className="text-sm mb-2">
                Fibre optic cables transmit light through glass - a dielectric (non-conductive) material:
              </p>
              <ul className="text-sm space-y-1">
                <li>• No electrical current = nothing for EM fields to affect</li>
                <li>• No ground loops possible (common copper problem)</li>
                <li>• No crosstalk between fibres (light doesn't radiate)</li>
                <li>• Safe in hazardous areas (no spark risk)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 04: When to Choose Copper */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">When Copper is Still the Right Choice</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Despite fibre's advantages, copper cabling remains the practical choice for many applications.
              Understanding when copper is appropriate helps make cost-effective decisions.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Copper Advantages</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-medium text-elec-yellow">Power over Ethernet (PoE)</h5>
                  <p className="text-sm mt-1">
                    Copper can deliver power and data simultaneously. Essential for IP phones, WiFi access points,
                    CCTV cameras, and IoT devices. PoE++ delivers up to 90W per port.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-medium text-blue-400">Simpler Termination</h5>
                  <p className="text-sm mt-1">
                    RJ45 connectors are easy to terminate with basic tools. Most IT staff can terminate copper.
                    Fibre requires specialised equipment and training.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-medium text-green-400">Lower Equipment Cost</h5>
                  <p className="text-sm mt-1">
                    Copper network interfaces cost less than fibre. No media converters needed.
                    Standard in laptops, desktops, and most end devices.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-medium text-purple-400">Repair Simplicity</h5>
                  <p className="text-sm mt-1">
                    Damaged copper can be re-terminated in minutes. Fibre damage requires splicing
                    equipment or replacement of the entire run.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Choose Copper When:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Distance under 100m</li>
                  <li>✓ PoE required</li>
                  <li>✓ 1-10Gbps speeds sufficient</li>
                  <li>✓ Low EMI environment</li>
                  <li>✓ Budget-constrained projects</li>
                  <li>✓ Desktop/workstation connections</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Choose Fibre When:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Distance over 100m</li>
                  <li>✓ 10Gbps+ speeds needed</li>
                  <li>✓ EMI concerns present</li>
                  <li>✓ Security is critical</li>
                  <li>✓ Future-proofing required</li>
                  <li>✓ Backbone/riser applications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 05: Total Cost of Ownership */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">Total Cost of Ownership</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              While fibre has higher upfront costs, total cost of ownership (TCO) over 10-15 years often
              favours fibre, especially for backbone infrastructure.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Cost Factors</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-orange-400 font-medium mb-2">Copper Costs</h5>
                  <ul className="space-y-1">
                    <li>• Lower cable cost per metre</li>
                    <li>• Cheaper connectors and tools</li>
                    <li>• Standard NIC included in devices</li>
                    <li>• May need replacement for speed upgrades</li>
                    <li>• Higher energy costs (powered equipment)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Fibre Costs</h5>
                  <ul className="space-y-1">
                    <li>• Higher cable cost per metre</li>
                    <li>• Specialised termination equipment</li>
                    <li>• Transceivers/SFPs required</li>
                    <li>• Speed upgrades often just need new transceivers</li>
                    <li>• Lower energy costs (passive cable)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Long-Term Considerations</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>Upgrade Path:</strong> Fibre installed today can support 100Gbps+ with transceiver upgrades alone</li>
                <li>• <strong>Lifespan:</strong> Fibre infrastructure typically lasts 25+ years vs 10-15 for copper</li>
                <li>• <strong>Maintenance:</strong> Fibre has fewer failure points and lower maintenance costs</li>
                <li>• <strong>Space:</strong> Fibre requires less containment, potentially lower installation costs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Decision Framework</h4>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">1</span>
                  <span><strong>Identify distance requirements</strong> - Under 100m? Copper may suffice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">2</span>
                  <span><strong>Assess speed needs</strong> - Current and projected. Plan for 10 years ahead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">3</span>
                  <span><strong>Check environment</strong> - EMI sources? Industrial setting? Consider fibre.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">4</span>
                  <span><strong>PoE requirements</strong> - If PoE needed at endpoints, plan for copper drops or hybrid.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">5</span>
                  <span><strong>Calculate TCO</strong> - Include potential upgrades in cost comparison.</span>
                </li>
              </ol>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Common Mistakes
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Choosing based on initial cost alone without considering TCO</li>
                <li>• Installing Cat5e/Cat6 when Cat6A is only slightly more expensive</li>
                <li>• Using copper for backbone when fibre would future-proof</li>
                <li>• Not considering EMI in industrial environments</li>
                <li>• Forgetting PoE requirements when specifying fibre to desktop</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-800 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <span className="text-elec-yellow transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Fibre vs Copper</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Fibre Wins</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Bandwidth (Tbps potential)</li>
                  <li>• Distance (km range)</li>
                  <li>• EMI immunity</li>
                  <li>• Security</li>
                  <li>• Long-term upgrade path</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Copper Wins</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• PoE capability</li>
                  <li>• Simpler termination</li>
                  <li>• Lower initial cost</li>
                  <li>• Universal device compatibility</li>
                  <li>• Easier field repair</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 2 Quiz: Advantages vs Copper Systems"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/fiber-optics-module-1-section-1">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: What is Fibre Optic?
            </Button>
          </Link>
          <Link to="/electrical-upskilling/fiber-optics-module-1-section-3">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Next: Commercial & Industrial Use
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule1Section2;
