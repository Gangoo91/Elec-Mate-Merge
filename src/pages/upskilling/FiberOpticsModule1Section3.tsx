import { ArrowLeft, Building, CheckCircle, Factory, Server, Radio, Wifi, BookOpen, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Use in Commercial & Industrial Settings - Fibre Optics Course";
const DESCRIPTION = "Explore how fibre optic cabling is deployed in commercial buildings, data centres, industrial facilities, and specialist environments.";

const quickCheckQuestions = [
  {
    id: "fo-m1s3-qc1",
    question: "What is the typical fibre topology used in commercial building backbones?",
    options: ["Bus topology", "Ring topology", "Star/hierarchical topology", "Mesh topology only"],
    correctIndex: 2,
    explanation: "Commercial buildings typically use star/hierarchical topology with fibre backbone connecting floor distributors to the main equipment room."
  },
  {
    id: "fo-m1s3-qc2",
    question: "Why is fibre particularly suited to industrial environments?",
    options: ["It's cheaper than copper", "Immunity to EMI from machinery", "Easier to install", "Requires less maintenance"],
    correctIndex: 1,
    explanation: "Industrial environments contain motors, drives, and heavy machinery that generate significant EMI. Fibre's immunity to electromagnetic interference makes it ideal."
  },
  {
    id: "fo-m1s3-qc3",
    question: "In a data centre, what is the primary reason for using fibre between racks?",
    options: ["Cable colour options", "High bandwidth and density requirements", "Lower cost", "Easier to label"],
    correctIndex: 1,
    explanation: "Data centres require extremely high bandwidth (40-400Gbps+) between servers and switches. Fibre provides this capacity in compact cable runs."
  }
];

const quizQuestions = [
  {
    question: "What is a 'riser' in commercial building cabling?",
    options: ["A type of connector", "Vertical cable pathway between floors", "A testing device", "A type of fibre"],
    correctAnswer: 1
  },
  {
    question: "Which fibre type is most common for building backbone applications under 300m?",
    options: ["Singlemode OS2", "Multimode OM3/OM4", "Plastic optical fibre", "Coaxial fibre"],
    correctAnswer: 1
  },
  {
    question: "In industrial SCADA systems, fibre is preferred because:",
    options: ["It's more colourful", "EMI immunity and electrical isolation", "Lower bandwidth", "Easier termination"],
    correctAnswer: 1
  },
  {
    question: "What does 'FTTD' stand for in commercial deployments?",
    options: ["Fibre To The Desktop", "Fast Transfer Technology Device", "Fibre Testing Technical Document", "Flexible Twisted Trunk Distribution"],
    correctAnswer: 0
  },
  {
    question: "Data centre fibre typically uses which connector type for high density?",
    options: ["SC connectors", "ST connectors", "LC or MTP/MPO connectors", "FC connectors"],
    correctAnswer: 2
  },
  {
    question: "Why might a hospital use fibre near MRI machines?",
    options: ["Better aesthetics", "No interference with or from the magnetic field", "Lower cost", "Faster installation"],
    correctAnswer: 1
  },
  {
    question: "In a campus network, buildings are typically connected using:",
    options: ["Cat5e copper", "Coaxial cable", "Singlemode fibre", "Wireless only"],
    correctAnswer: 2
  },
  {
    question: "What is 'dark fibre' in commercial contexts?",
    options: ["Fibre that has failed", "Unused installed fibre capacity", "Fibre with black jacket", "Fibre for night use"],
    correctAnswer: 1
  },
  {
    question: "Process control networks in factories often use fibre for:",
    options: ["Cost savings only", "Electrical isolation and noise immunity", "Colour coding", "Weight reduction"],
    correctAnswer: 1
  },
  {
    question: "Which standard governs structured cabling in commercial buildings?",
    options: ["BS 7671", "TIA-568 / ISO 11801", "IEEE 802.3", "ITU-T G.652"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Is fibre to the desktop (FTTD) becoming common?",
    answer: "FTTD is growing, especially in new builds and high-security environments. However, most commercial installations still use fibre backbone with copper to desktops due to PoE requirements and cost. Hybrid approaches are increasingly popular."
  },
  {
    question: "How is fibre protected in industrial environments?",
    answer: "Industrial fibre uses armoured cables (steel or aluminium), protective conduit, and ruggedised connectors. Cables may have additional crush resistance, chemical resistance, or temperature ratings for specific environments."
  },
  {
    question: "What bandwidth do typical commercial buildings need?",
    answer: "Modern commercial buildings should plan for 10Gbps backbone minimum, with 40-100Gbps for larger installations. Individual floor connections typically need 1-10Gbps. Requirements are increasing rapidly with cloud services and video."
  },
  {
    question: "Can existing copper infrastructure be upgraded to fibre?",
    answer: "Yes, often using existing containment routes. Media converters can bridge fibre backbone to copper endpoints. Many organisations upgrade backbone to fibre first, then gradually extend fibre closer to users over time."
  },
  {
    question: "What's the difference between enterprise and carrier fibre?",
    answer: "Enterprise fibre connects within buildings and campuses (often multimode, shorter distances). Carrier/telco fibre connects between sites and cities (singlemode, longer distances, higher specifications). Different standards and practices apply."
  },
  {
    question: "How do data centres achieve such high fibre density?",
    answer: "Data centres use high-density solutions: MTP/MPO connectors (12-24 fibres per connector), pre-terminated trunk cables, high-density patch panels, and careful pathway management. Fibre's small size enables much higher density than copper."
  }
];

const FiberOpticsModule1Section3 = () => {
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
            <Building className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 1 • Section 3</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Commercial & Industrial Applications</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            How fibre optic technology is deployed across different sectors and environments.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Building className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Fibre is essential in modern commercial buildings (backbone), data centres (high-density interconnects),
              industrial facilities (EMI immunity), and specialist environments (hospitals, broadcast). Each sector
              has specific requirements driving fibre adoption.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Server className="h-4 w-4" />
              Key Sectors
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Commercial offices and retail</li>
              <li>• Data centres and cloud facilities</li>
              <li>• Manufacturing and process industries</li>
              <li>• Healthcare and education</li>
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
              "Describe fibre deployment in commercial buildings",
              "Understand data centre fibre requirements",
              "Identify industrial fibre applications",
              "Recognise specialist environment needs",
              "Apply appropriate fibre solutions to sectors",
              "Understand structured cabling standards"
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

        {/* Section 01: Commercial Buildings */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">Commercial Building Deployments</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Modern commercial buildings rely on fibre optic cabling as the backbone of their network
              infrastructure. The structured cabling model defines how fibre integrates with copper
              distribution to desktops.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Structured Cabling Hierarchy</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-medium text-elec-yellow">Main Equipment Room (MER)</h5>
                  <p className="text-sm mt-1">
                    Central point housing core switches, servers, and external connections. Fibre links
                    to carrier services and connects to all floor distributors. Often in basement or ground floor.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-medium text-blue-400">Building Backbone</h5>
                  <p className="text-sm mt-1">
                    Vertical fibre runs (risers) connecting MER to floor distributors. Typically multimode
                    OM3/OM4 for buildings under 300m height. Singlemode for larger campuses.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-medium text-green-400">Floor Distributor (FD)</h5>
                  <p className="text-sm mt-1">
                    Telecommunications room on each floor. Houses floor switches connecting via fibre to
                    backbone and distributing via copper to work areas. Also called IDF (Intermediate Distribution Frame).
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-medium text-purple-400">Horizontal Distribution</h5>
                  <p className="text-sm mt-1">
                    Connections from FD to work area outlets. Traditionally copper Cat6A. Increasingly
                    fibre for high-bandwidth zones. Maximum 90m permanent link (TIA-568).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Typical Office Requirements</h4>
                <ul className="text-sm space-y-1">
                  <li>• 10Gbps backbone per floor minimum</li>
                  <li>• 1Gbps to desktop (copper)</li>
                  <li>• WiFi backhaul (fibre to APs emerging)</li>
                  <li>• CCTV and building management systems</li>
                  <li>• VoIP telephony infrastructure</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Fibre Backbone Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Future-proof for speed upgrades</li>
                  <li>• Electrical isolation between floors</li>
                  <li>• Smaller riser space requirements</li>
                  <li>• Longer distances without repeaters</li>
                  <li>• Supports convergence (voice/data/video)</li>
                </ul>
              </div>
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

        {/* Section 02: Data Centres */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Data Centre Environments</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Data centres represent the most demanding fibre environment, requiring extreme bandwidth,
              density, and reliability. Cloud computing has dramatically increased data centre fibre requirements.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Data Centre Fibre Applications</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Server className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-elec-yellow">Server-to-Switch (Leaf)</h5>
                    <p className="text-gray-400">25-100Gbps connections from servers to Top-of-Rack switches. High density, short runs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wifi className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-elec-yellow">Switch-to-Switch (Spine)</h5>
                    <p className="text-gray-400">100-400Gbps backbone between aggregation switches. Often uses parallel fibre (MTP/MPO).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Radio className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-elec-yellow">Data Centre Interconnect (DCI)</h5>
                    <p className="text-gray-400">Links between data centre buildings. Singlemode, often DWDM for maximum capacity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-elec-yellow">Storage Area Networks (SAN)</h5>
                    <p className="text-gray-400">Fibre Channel storage connections. Dedicated fibre infrastructure for storage traffic.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">High-Density Solutions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-white mb-1">MTP/MPO Connectivity</h5>
                  <ul className="space-y-1">
                    <li>• 12 or 24 fibres per connector</li>
                    <li>• Pre-terminated trunk cables</li>
                    <li>• Rapid deployment</li>
                    <li>• Supports 40/100/400G parallel optics</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Patch Panel Density</h5>
                  <ul className="space-y-1">
                    <li>• Up to 144 LC ports per 1U</li>
                    <li>• Angled panels reduce bend stress</li>
                    <li>• Sliding trays for access</li>
                    <li>• Colour coding by function</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Industrial Applications */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Industrial Applications</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Industrial environments present unique challenges: heavy EMI, harsh conditions, and critical
              reliability requirements. Fibre's characteristics make it ideal for these demanding applications.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Factory className="h-5 w-5 text-elec-yellow" />
                Industrial Fibre Applications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Process Control</h5>
                  <ul className="space-y-1">
                    <li>• SCADA backbone networks</li>
                    <li>• PLC interconnections</li>
                    <li>• Distributed control systems</li>
                    <li>• Remote I/O networks</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Manufacturing</h5>
                  <ul className="space-y-1">
                    <li>• CNC machine connectivity</li>
                    <li>• Robot cell networks</li>
                    <li>• Quality vision systems</li>
                    <li>• Production monitoring</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Utilities</h5>
                  <ul className="space-y-1">
                    <li>• Substation automation</li>
                    <li>• Smart grid communications</li>
                    <li>• Pipeline monitoring</li>
                    <li>• Water treatment SCADA</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Transport</h5>
                  <ul className="space-y-1">
                    <li>• Rail signalling systems</li>
                    <li>• Port and terminal networks</li>
                    <li>• Airport systems</li>
                    <li>• Traffic management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Why Fibre in Industry</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Immune to EMI from motors/drives</li>
                  <li>✓ Electrical isolation (no ground loops)</li>
                  <li>✓ Safe in hazardous areas (no sparks)</li>
                  <li>✓ Lightning/surge protection</li>
                  <li>✓ Long distances without repeaters</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">Industrial Specifications</h4>
                <ul className="text-sm space-y-1">
                  <li>• Extended temperature ratings (-40°C to +85°C)</li>
                  <li>• Armoured/ruggedised cables</li>
                  <li>• IP-rated connectors (IP67/IP68)</li>
                  <li>• Chemical/oil resistant jackets</li>
                  <li>• Vibration-proof connections</li>
                </ul>
              </div>
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

        {/* Section 04: Specialist Environments */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Specialist Environments</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Certain environments have unique requirements that make fibre the only practical choice.
              These include healthcare, broadcast, military, and other specialist sectors.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Sector-Specific Applications</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h5 className="font-medium text-red-400">Healthcare</h5>
                  <p className="text-sm mt-1">
                    MRI suites require fibre (copper causes interference with magnetic fields). Medical imaging
                    transfers large files rapidly. Patient monitoring systems benefit from EMI immunity.
                    Critical care areas need reliable, interference-free communications.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-medium text-blue-400">Broadcast & Media</h5>
                  <p className="text-sm mt-1">
                    Uncompressed 4K/8K video requires massive bandwidth (12-48Gbps). Studios use fibre for
                    camera links, audio distribution, and production networks. Outside broadcast trucks
                    connect via fibre to transmission facilities.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-medium text-green-400">Education & Research</h5>
                  <p className="text-sm mt-1">
                    Universities connect buildings across large campuses. Research networks require high
                    bandwidth for data transfer. Lecture capture and streaming demand reliable video delivery.
                    Scientific instruments generate massive data volumes.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-medium text-purple-400">Defence & Security</h5>
                  <p className="text-sm mt-1">
                    Fibre is extremely difficult to tap without detection. No electromagnetic emissions
                    to intercept. Secure facilities mandate fibre for classified networks. Military
                    installations use ruggedised tactical fibre.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Advantages
              </h4>
              <ul className="text-sm space-y-1">
                <li>• No electromagnetic radiation to intercept</li>
                <li>• Physical tapping causes measurable signal loss</li>
                <li>• Can be monitored for intrusion attempts</li>
                <li>• Approved for classified government networks</li>
                <li>• No crosstalk between adjacent fibres</li>
              </ul>
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

        {/* Section 05: Campus Networks */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">Campus and Multi-Site Networks</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Campus networks connect multiple buildings within a site. These outdoor or underground
              runs typically exceed copper's distance limits, making fibre essential.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Campus Fibre Considerations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Infrastructure</h5>
                  <ul className="space-y-1">
                    <li>• Underground duct systems</li>
                    <li>• Direct burial cables</li>
                    <li>• Aerial installations</li>
                    <li>• Building entry points</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Cable Selection</h5>
                  <ul className="space-y-1">
                    <li>• Armoured for direct burial</li>
                    <li>• Rodent protection where needed</li>
                    <li>• UV-resistant for aerial</li>
                    <li>• Appropriate fibre count</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Fibre Count Planning</h4>
              <p className="text-sm mb-2">
                Campus backbone typically over-provisions fibre count for future needs:
              </p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Small building:</strong> 12-24 fibres minimum</li>
                <li>• <strong>Medium building:</strong> 24-48 fibres</li>
                <li>• <strong>Large/critical building:</strong> 48-96+ fibres</li>
                <li>• <strong>Data centre links:</strong> 144-288+ fibres (trunk cables)</li>
              </ul>
              <p className="text-sm mt-2 text-gray-400">
                Rule of thumb: Install 2-4× current requirements for future growth.
              </p>
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
              <h4 className="font-semibold text-white mb-3">Sector Selection Guide</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-elec-yellow">Sector</th>
                      <th className="text-left py-2 text-elec-yellow">Typical Fibre Type</th>
                      <th className="text-left py-2 text-elec-yellow">Key Driver</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2">Office backbone</td>
                      <td>OM3/OM4 multimode</td>
                      <td>Cost-effective bandwidth</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2">Data centre</td>
                      <td>OM4/OM5 or OS2</td>
                      <td>Maximum bandwidth density</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2">Industrial</td>
                      <td>OS2 singlemode</td>
                      <td>EMI immunity, distance</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2">Campus</td>
                      <td>OS2 singlemode</td>
                      <td>Long distances</td>
                    </tr>
                    <tr>
                      <td className="py-2">Broadcast</td>
                      <td>OS2 singlemode</td>
                      <td>Extreme bandwidth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Common Planning Mistakes</h4>
              <ul className="text-sm space-y-1">
                <li>• Under-provisioning fibre count (difficult to add later)</li>
                <li>• Not considering future bandwidth needs</li>
                <li>• Using multimode where singlemode would future-proof</li>
                <li>• Inadequate pathway sizing for cables</li>
                <li>• Not planning for testing and maintenance access</li>
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
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Application Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Commercial</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Building backbone</li>
                  <li>• Floor distributor links</li>
                  <li>• Campus interconnects</li>
                  <li>• Standards: TIA-568/ISO 11801</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Industrial/Specialist</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Process control (SCADA)</li>
                  <li>• EMI-sensitive environments</li>
                  <li>• Healthcare (MRI suites)</li>
                  <li>• Secure/classified networks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 3 Quiz: Commercial & Industrial Applications"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/fiber-optics-module-1-section-2">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Advantages vs Copper
            </Button>
          </Link>
          <Link to="/electrical-upskilling/fiber-optics-module-1-section-4">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Next: Health & Safety
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule1Section3;
