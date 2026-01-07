import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Grid3X3, Cpu, Server, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Patch Panels and Transceivers | Fibre Optics Module 2";
const DESCRIPTION = "Master fibre optic patch panels, cassettes, and transceiver modules. Learn SFP, SFP+, QSFP specifications, and structured cabling termination for UK data centres.";

const quickCheckQuestions = [
  {
    id: "fo-m2s5-qc1",
    question: "What is the maximum data rate supported by SFP+ transceivers?",
    options: ["1 Gbps", "10 Gbps", "25 Gbps", "100 Gbps"],
    correctIndex: 1,
    explanation: "SFP+ (enhanced Small Form-factor Pluggable) supports up to 10 Gbps, commonly used for 10 Gigabit Ethernet connections in enterprise and data centre environments."
  },
  {
    id: "fo-m2s5-qc2",
    question: "What fibre count does a standard MTP cassette typically convert?",
    options: ["4 fibres to 2x LC duplex", "8 fibres to 4x LC duplex", "12 fibres to 6x LC duplex", "24 fibres to 12x LC duplex"],
    correctIndex: 2,
    explanation: "Standard MTP cassettes convert 12-fibre MTP trunk cables to 6x LC duplex ports, enabling use of duplex transceivers with high-density backbone cabling."
  },
  {
    id: "fo-m2s5-qc3",
    question: "QSFP28 transceivers are designed for which data rate?",
    options: ["28 Gbps", "40 Gbps", "100 Gbps", "400 Gbps"],
    correctIndex: 2,
    explanation: "QSFP28 supports 100 Gbps using 4×25G lanes. The '28' indicates the per-lane rate of approximately 28 Gbps (including overhead)."
  }
];

const quizQuestions = [
  {
    question: "SFP stands for:",
    options: ["Standard Fibre Port", "Small Form-factor Pluggable", "Single Fibre Pair", "Server Fibre Protocol"],
    correctAnswer: 1
  },
  {
    question: "What is the primary function of a fibre patch panel?",
    options: ["Signal amplification", "Organised termination and cross-connection", "Wavelength conversion", "Power distribution"],
    correctAnswer: 1
  },
  {
    question: "The 'Q' in QSFP stands for:",
    options: ["Quick", "Quad", "Quality", "Quantum"],
    correctAnswer: 1
  },
  {
    question: "What port density does a 1U LC patch panel typically provide?",
    options: ["12 ports", "24 ports", "48 ports", "96 ports"],
    correctAnswer: 2
  },
  {
    question: "BiDi transceivers achieve bidirectional transmission by using:",
    options: ["Time division multiplexing", "Different wavelengths for TX and RX", "Polarisation division", "Two parallel fibres"],
    correctAnswer: 1
  },
  {
    question: "When selecting transceivers, 'SR' typically indicates:",
    options: ["Super Range", "Short Range (multimode)", "Single Rate", "Standard Redundancy"],
    correctAnswer: 1
  },
  {
    question: "MTP cassettes in structured cabling systems provide:",
    options: ["Signal boosting", "Transition between trunk and equipment cables", "Error correction", "Wavelength filtering"],
    correctAnswer: 1
  },
  {
    question: "What information does the transceiver DOM feature provide?",
    options: ["Distance measurement", "Digital Optical Monitoring (power, temperature)", "Data throughput statistics", "Duplex configuration"],
    correctAnswer: 1
  },
  {
    question: "A 'hot-swappable' transceiver can be:",
    options: ["Used at high temperatures", "Inserted/removed without powering down", "Shared between ports", "Used with any wavelength"],
    correctAnswer: 1
  },
  {
    question: "QSFP-DD modules support data rates up to:",
    options: ["100 Gbps", "200 Gbps", "400 Gbps", "800 Gbps"],
    correctAnswer: 2
  }
];

const faqs = [
  {
    question: "Can I use third-party transceivers in branded switches?",
    answer: "It depends on the manufacturer's policy. Some vendors like Cisco and Juniper implement 'transceiver validation' that blocks or warns about non-OEM modules. However, many third-party transceivers are coded to work in specific equipment. Check compatibility lists, and note that using third-party modules may void warranties or support. Quality varies significantly between manufacturers."
  },
  {
    question: "What's the difference between 10GBASE-SR and 10GBASE-LR?",
    answer: "SR (Short Range) uses 850nm wavelength over multimode fibre, reaching 300m on OM3/400m on OM4. LR (Long Range) uses 1310nm over singlemode fibre, reaching 10km. SR transceivers are less expensive but limited to building-scale distances. LR is required for campus or longer links. There's also LRM (Long Range Multimode) using 1310nm over multimode for legacy 62.5µm fibre."
  },
  {
    question: "How do I know which transceiver to order?",
    answer: "Determine: 1) Data rate (1G, 10G, 25G, 100G), 2) Distance required, 3) Fibre type installed (singlemode or multimode, which grade), 4) Connector type on your cabling (usually LC), 5) Equipment compatibility. Then match to a transceiver: e.g., 10G over OM4 up to 400m = 10GBASE-SR SFP+ with LC duplex connector."
  },
  {
    question: "What is a fibre 'cassette' and when should I use one?",
    answer: "A cassette is a modular enclosure containing pre-terminated fibres that converts between connector/fibre types. Most commonly, MTP-to-LC cassettes convert 12-fibre MTP trunk cables into 6x LC duplex ports for transceiver connection. Use cassettes in structured cabling for high-density deployments, rapid provisioning, and when running parallel optics (40G/100G) that need LC breakout."
  },
  {
    question: "Why do some transceivers have 'extended temperature' ratings?",
    answer: "Standard transceivers operate from 0°C to 70°C. Extended temperature models (-40°C to +85°C) are for outdoor cabinets, industrial environments, or locations without climate control. They cost more but prevent failures in extreme conditions. Specify extended temperature for any installation where ambient temperature might exceed normal office/data centre ranges."
  },
  {
    question: "Can I mix different speed transceivers on the same patch panel?",
    answer: "The patch panel doesn't care about speed—it's passive. You can terminate 1G, 10G, and 100G links on the same panel. The limiting factors are: 1) Fibre type must support the speed/distance, 2) The switches on either end must match speeds, 3) Keep clear documentation of which ports are which. For easier management, many operators dedicate panels to specific services."
  }
];

const FiberOpticsModule2Section5 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 2</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Grid3X3 className="h-4 w-4" />
            Module 2 • Section 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Patch Panels and Transceivers
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Infrastructure components for fibre network termination and connectivity
          </p>
        </section>

        {/* Quick Summary Cards */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">In 30 Seconds</h3>
                <p className="text-sm text-white/80">
                  Patch panels organise fibre terminations. Transceivers convert electrical to optical signals. SFP=1G, SFP+=10G, QSFP28=100G. Match transceiver to fibre type and distance.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Install It / Connect It</h3>
                <p className="text-sm text-white/80">
                  Mount panels at accessible heights. Label all ports. Match transceivers to fibre grade (SR for multimode, LR for singlemode). Check DOM readings after install.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Fibre patch panel types and specifications",
              "MTP cassette systems and applications",
              "SFP, SFP+, and QSFP transceiver families",
              "Transceiver selection for fibre types",
              "Installation and documentation practices",
              "Structured cabling design principles"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Fibre Patch Panels */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Fibre Patch Panels</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Fibre patch panels</strong> (also called fibre distribution frames or FDFs) provide organised termination points for fibre optic cables. They create a structured interface between permanent cabling infrastructure and active equipment, enabling flexible cross-connections and simplified maintenance.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Patch Panel Types</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-white">Loaded Panels</h5>
                  <p className="text-sm text-white/70">Pre-installed with adaptors (LC, SC, etc.). Ready for immediate use with pigtails or direct termination. Common for standard deployments.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Unloaded Panels</h5>
                  <p className="text-sm text-white/70">Empty chassis accepting snap-in adaptor plates. Flexible configuration—mix connector types or densities as needed.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Cassette-Based Panels</h5>
                  <p className="text-sm text-white/70">Accept pre-terminated cassette modules (MTP-to-LC). Enable rapid deployment and change. Standard in high-density data centres.</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Typical Densities (1U)</h4>
                <ul className="text-sm space-y-1">
                  <li>• LC: 24-48 duplex ports</li>
                  <li>• SC: 12-24 duplex ports</li>
                  <li>• MTP: 4-6 ports (48-72 fibres)</li>
                  <li>• Cassette: 3-4 cassettes</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Key Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• Cable management guides</li>
                  <li>• Splice tray integration</li>
                  <li>• Bend radius protection</li>
                  <li>• Labelling systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                High-Density Considerations
              </h4>
              <p className="text-sm">
                High-density panels (48+ LC ports per 1U) require careful cable management. Use angled adaptor panels or sliding trays for rear access. Ensure adequate bend radius—a 1U panel with 96 fibres can become unmanageable without proper strain relief and routing.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 2: MTP Cassette Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">MTP Cassette Systems</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>MTP cassettes</strong> are modular enclosures that convert high-fibre-count MTP trunk cables into individual duplex connections suitable for transceiver ports. They're central to modern structured cabling designs, enabling rapid deployment and simplified moves/adds/changes.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Cassette Architecture</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Rear Connection</p>
                  <p className="font-medium">MTP (12 or 24 fibre)</p>
                </div>
                <div>
                  <p className="text-white/60">Front Ports</p>
                  <p className="font-medium">6x or 12x LC duplex</p>
                </div>
                <div>
                  <p className="text-white/60">Internal Routing</p>
                  <p className="font-medium">Factory-terminated fanout</p>
                </div>
                <div>
                  <p className="text-white/60">Polarity Management</p>
                  <p className="font-medium">Type A, B, or Universal</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Cassette Benefits
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Rapid deployment:</strong> Pre-terminated—no field splicing</li>
                <li>• <strong>Consistent quality:</strong> Factory-tested to specification</li>
                <li>• <strong>Flexibility:</strong> Swap cassettes for different configurations</li>
                <li>• <strong>Reduced congestion:</strong> Single MTP trunk vs. 12 individual cables</li>
                <li>• <strong>Future-proof:</strong> Trunk infrastructure supports speed upgrades</li>
              </ul>
            </div>

            <p>
              In a typical deployment, <strong>MTP trunk cables</strong> run between patch panel locations (e.g., MDA to IDA in a data centre). Cassettes at each end convert to LC duplex for connection to server/switch transceivers. The same trunk can support 1G, 10G, or 40G/100G parallel optics by changing cassettes.
            </p>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Polarity Considerations
              </h4>
              <p className="text-sm">
                Fibre polarity (ensuring Tx connects to Rx) must be maintained across the link. Cassette systems use <strong>Type A</strong> (straight), <strong>Type B</strong> (reversed pairs), or <strong>Universal</strong> methods. Document and standardise your polarity method—mixing types causes connection failures.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Transceiver Fundamentals */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">Transceiver Fundamentals</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Optical transceivers</strong> convert electrical signals from network equipment into optical signals for fibre transmission, and vice versa. They're pluggable modules that insert into switch, router, or server ports, providing flexibility to match the network interface to the installed fibre type and distance requirements.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Transceiver Components
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>TOSA:</strong> Transmitter Optical Sub-Assembly (laser/LED + driver)</li>
                <li>• <strong>ROSA:</strong> Receiver Optical Sub-Assembly (photodiode + amplifier)</li>
                <li>• <strong>CDR:</strong> Clock and Data Recovery circuits</li>
                <li>• <strong>MCU:</strong> Microcontroller for DOM and management</li>
                <li>• <strong>Optical interface:</strong> LC, SC, or MTP connector receptacle</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Key Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Data Rate</p>
                  <p className="font-medium">1G to 400G+</p>
                </div>
                <div>
                  <p className="text-white/60">Wavelength</p>
                  <p className="font-medium">850nm, 1310nm, 1550nm, etc.</p>
                </div>
                <div>
                  <p className="text-white/60">Reach</p>
                  <p className="font-medium">SR, LR, ER, ZR (varies)</p>
                </div>
                <div>
                  <p className="text-white/60">Fibre Type</p>
                  <p className="font-medium">MMF or SMF</p>
                </div>
                <div>
                  <p className="text-white/60">Connector</p>
                  <p className="font-medium">LC duplex, MTP, etc.</p>
                </div>
                <div>
                  <p className="text-white/60">Power Consumption</p>
                  <p className="font-medium">0.5W to 10W+</p>
                </div>
              </div>
            </div>

            <p>
              The <strong>reach designation</strong> indicates intended distance: SR (Short Range, typically multimode), LR (Long Range, 10km singlemode), ER (Extended Range, 40km), ZR (Very Long Range, 80km+). Always match transceiver reach to your fibre type and link distance.
            </p>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 4: SFP and SFP+ Transceivers */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">SFP and SFP+ Transceivers</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>SFP (Small Form-factor Pluggable)</strong> and <strong>SFP+</strong> are the most common transceiver formats in enterprise and data centre networks. Their compact size, hot-swappable design, and wide availability make them the standard choice for 1G and 10G connectivity.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">SFP (1G)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Data Rate</span>
                    <span>Up to 1.25 Gbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Common Types</span>
                    <span>1000BASE-SX, LX, ZX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Connector</span>
                    <span>LC duplex</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Power</span>
                    <span>~0.5-1W</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">SFP+ (10G)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Data Rate</span>
                    <span>Up to 10 Gbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Common Types</span>
                    <span>10GBASE-SR, LR, ER</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Connector</span>
                    <span>LC duplex</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Power</span>
                    <span>~0.7-1.5W</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Common 10G SFP+ Types</h4>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <span className="font-medium text-white min-w-[120px]">10GBASE-SR</span>
                  <span className="text-white/70">850nm, multimode, 26-400m (grade dependent)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <span className="font-medium text-white min-w-[120px]">10GBASE-LR</span>
                  <span className="text-white/70">1310nm, singlemode, up to 10km</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <span className="font-medium text-white min-w-[120px]">10GBASE-ER</span>
                  <span className="text-white/70">1550nm, singlemode, up to 40km</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <span className="font-medium text-white min-w-[120px]">10GBASE-LRM</span>
                  <span className="text-white/70">1310nm, multimode (legacy 62.5µm), 220m</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                SFP28 - 25G Option
              </h4>
              <p className="text-sm">
                <strong>SFP28</strong> extends the SFP form factor to 25 Gbps, using the same cage as SFP+. Commonly used for 25GbE server connections and as building blocks for 100G (4×25G). Check switch compatibility—not all SFP+ ports support SFP28.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: QSFP Transceivers */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">QSFP and High-Speed Transceivers</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>QSFP (Quad Small Form-factor Pluggable)</strong> transceivers use four parallel lanes to achieve higher aggregate bandwidth. They're essential for 40G, 100G, and 400G connections in data centres and high-performance computing environments.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">QSFP Family Overview</h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2 font-medium border-b border-white/20 pb-2">
                  <span>Module</span>
                  <span>Data Rate</span>
                  <span>Lane Config</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>QSFP+</span>
                  <span>40 Gbps</span>
                  <span>4×10G</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>QSFP28</span>
                  <span>100 Gbps</span>
                  <span>4×25G</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>QSFP56</span>
                  <span>200 Gbps</span>
                  <span>4×50G</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>QSFP-DD</span>
                  <span>400 Gbps</span>
                  <span>8×50G</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">40G QSFP+ Options</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>40GBASE-SR4:</strong> 4×10G, MMF, 100-150m</li>
                  <li>• <strong>40GBASE-LR4:</strong> WDM, SMF, 10km</li>
                  <li>• <strong>40GBASE-ER4:</strong> WDM, SMF, 40km</li>
                  <li>• Connector: MTP (SR4) or LC (LR4)</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">100G QSFP28 Options</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>100GBASE-SR4:</strong> 4×25G, MMF, 70-100m</li>
                  <li>• <strong>100GBASE-LR4:</strong> WDM, SMF, 10km</li>
                  <li>• <strong>100GBASE-CWDM4:</strong> CWDM, SMF, 2km</li>
                  <li>• Connector: MTP (SR4) or LC (LR4)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Breakout Cables
              </h4>
              <p className="text-sm">
                QSFP ports can connect to multiple lower-speed ports using <strong>breakout cables</strong>. A 40G QSFP+ can break out to 4×10G SFP+ ports using an MTP-to-4×LC cable. Similarly, 100G QSFP28 breaks out to 4×25G SFP28. This enables flexible connectivity between high-density spine switches and lower-speed leaf or server ports.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 6: Transceiver Selection and DOM */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Selection and Monitoring</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the right transceiver requires matching <strong>data rate</strong>, <strong>fibre type</strong>, <strong>distance</strong>, and <strong>equipment compatibility</strong>. Once installed, <strong>Digital Optical Monitoring (DOM)</strong> provides real-time visibility into transceiver health and link quality.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Selection Checklist</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Data Rate:</strong> Match to port speed (1G, 10G, 25G, 100G)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Fibre Type:</strong> SR for multimode, LR/ER for singlemode</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-400" />
                  <span><strong>Distance:</strong> Verify transceiver reach exceeds link length</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Connector:</strong> LC duplex for SFP, MTP or LC for QSFP</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Compatibility:</strong> OEM or validated third-party for your switch</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Server className="h-4 w-4" />
                Digital Optical Monitoring (DOM)
              </h4>
              <p className="text-sm mb-3">
                DOM (also called DDM - Digital Diagnostic Monitoring) provides real-time telemetry from the transceiver:
              </p>
              <ul className="text-sm space-y-1">
                <li>• <strong>TX Power:</strong> Transmitted optical power (dBm)</li>
                <li>• <strong>RX Power:</strong> Received optical power (dBm)</li>
                <li>• <strong>Temperature:</strong> Module internal temperature</li>
                <li>• <strong>Voltage:</strong> Supply voltage</li>
                <li>• <strong>Bias Current:</strong> Laser drive current</li>
              </ul>
            </div>

            <p>
              Monitor DOM readings to detect problems before they cause outages. <strong>Declining RX power</strong> may indicate dirty connectors or degrading fibre. <strong>High temperature</strong> suggests cooling issues. <strong>Abnormal bias current</strong> can predict laser failure. Set alerts for readings approaching threshold limits.
            </p>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Selection Errors
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Using SR transceivers on singlemode fibre (incompatible)</li>
                <li>• Exceeding distance rating (causes bit errors or link failure)</li>
                <li>• Mismatched wavelengths at each end (no communication)</li>
                <li>• Ignoring power budget (insufficient margin for losses)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Server className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Patch Panel Installation</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Mount at accessible height—avoid floor level or extreme top of rack</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Leave adequate slack for panel removal/sliding trays</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Label both front ports and rear cable entry points</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Maintain minimum bend radius throughout routing</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Transceiver Handling</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always use ESD protection when handling transceivers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Keep dust plugs in place until connecting fibre</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Insert fully until latch clicks—partial insertion causes errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Check DOM readings after installation to verify operation</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Mixing polarity methods within the same infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Over-tightening rack screws (can warp panel frame)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using incompatible transceiver/fibre combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Neglecting to document port assignments and cable IDs</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors touch-manipulation min-h-[44px]"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-white/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Transceiver Selection
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">By Speed</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>1G:</strong> SFP (SX/LX/ZX)</p>
                <p><strong>10G:</strong> SFP+ (SR/LR/ER)</p>
                <p><strong>25G:</strong> SFP28</p>
                <p><strong>40G:</strong> QSFP+ (SR4/LR4)</p>
                <p><strong>100G:</strong> QSFP28 (SR4/LR4)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">By Fibre Type</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>Multimode:</strong> SR variants (850nm)</p>
                <p><strong>Singlemode &lt;10km:</strong> LR (1310nm)</p>
                <p><strong>Singlemode &lt;40km:</strong> ER (1550nm)</p>
                <p><strong>Singlemode &lt;80km:</strong> ZR (1550nm)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Patch Panels and Transceivers Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-4"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Polish Grades</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-6"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Connector Compatibility</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule2Section5;