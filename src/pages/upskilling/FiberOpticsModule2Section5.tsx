import { ArrowLeft, Zap, CheckCircle, Grid3X3, Cpu, Server, Network } from "lucide-react";
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
    id: 1,
    question: "SFP stands for:",
    options: ["Standard Fibre Port", "Small Form-factor Pluggable", "Single Fibre Pair", "Server Fibre Protocol"],
    correctAnswer: 1,
    explanation: "SFP stands for Small Form-factor Pluggable, a compact transceiver format used for network communications."
  },
  {
    id: 2,
    question: "What is the primary function of a fibre patch panel?",
    options: ["Signal amplification", "Organised termination and cross-connection", "Wavelength conversion", "Power distribution"],
    correctAnswer: 1,
    explanation: "Fibre patch panels provide organised termination points and enable cross-connections between permanent cabling and active equipment."
  },
  {
    id: 3,
    question: "The 'Q' in QSFP stands for:",
    options: ["Quick", "Quad", "Quality", "Quantum"],
    correctAnswer: 1,
    explanation: "QSFP stands for Quad Small Form-factor Pluggable, using four parallel lanes for higher bandwidth."
  },
  {
    id: 4,
    question: "What port density does a 1U LC patch panel typically provide?",
    options: ["12 ports", "24 ports", "48 ports", "96 ports"],
    correctAnswer: 2,
    explanation: "A 1U LC patch panel typically provides 48 ports (24 duplex connections)."
  },
  {
    id: 5,
    question: "BiDi transceivers achieve bidirectional transmission by using:",
    options: ["Time division multiplexing", "Different wavelengths for TX and RX", "Polarisation division", "Two parallel fibres"],
    correctAnswer: 1,
    explanation: "BiDi (bidirectional) transceivers use different wavelengths for transmit and receive over a single fibre."
  },
  {
    id: 6,
    question: "When selecting transceivers, 'SR' typically indicates:",
    options: ["Super Range", "Short Range (multimode)", "Single Rate", "Standard Redundancy"],
    correctAnswer: 1,
    explanation: "SR indicates Short Range, designed for multimode fibre applications."
  },
  {
    id: 7,
    question: "MTP cassettes in structured cabling systems provide:",
    options: ["Signal boosting", "Transition between trunk and equipment cables", "Error correction", "Wavelength filtering"],
    correctAnswer: 1,
    explanation: "MTP cassettes convert high-fibre-count trunk cables to individual duplex connections for equipment ports."
  },
  {
    id: 8,
    question: "What information does the transceiver DOM feature provide?",
    options: ["Distance measurement", "Digital Optical Monitoring (power, temperature)", "Data throughput statistics", "Duplex configuration"],
    correctAnswer: 1,
    explanation: "DOM (Digital Optical Monitoring) provides real-time telemetry including optical power levels and temperature."
  },
  {
    id: 9,
    question: "A 'hot-swappable' transceiver can be:",
    options: ["Used at high temperatures", "Inserted/removed without powering down", "Shared between ports", "Used with any wavelength"],
    correctAnswer: 1,
    explanation: "Hot-swappable means the transceiver can be inserted or removed while the equipment is powered on."
  },
  {
    id: 10,
    question: "QSFP-DD modules support data rates up to:",
    options: ["100 Gbps", "200 Gbps", "400 Gbps", "800 Gbps"],
    correctAnswer: 2,
    explanation: "QSFP-DD (Double Density) supports up to 400 Gbps using 8×50G lanes."
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

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Grid3X3 className="h-4 w-4" />
            <span>Module 2 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Patch Panels and Transceivers
          </h1>
          <p className="text-white/80">
            Infrastructure components for fibre network termination and connectivity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Patch panels:</strong> Organised fibre termination points</li>
              <li><strong>SFP:</strong> 1G, SFP+: 10G, QSFP28: 100G</li>
              <li><strong>Match:</strong> Transceiver to fibre type and distance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Install It / Connect It</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Mount:</strong> Panels at accessible heights</li>
              <li><strong>Match:</strong> SR for multimode, LR for singlemode</li>
              <li><strong>Verify:</strong> Check DOM readings after install</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Fibre patch panel types and specifications",
              "MTP cassette systems and applications",
              "SFP, SFP+, and QSFP transceiver families",
              "Transceiver selection for fibre types",
              "Installation and documentation practices",
              "Structured cabling design principles"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Fibre Patch Panels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fibre Patch Panels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Fibre patch panels</strong> (also called fibre distribution frames or FDFs) provide organised termination points for fibre optic cables. They create a structured interface between permanent cabling infrastructure and active equipment, enabling flexible cross-connections and simplified maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Patch Panel Types:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Loaded Panels:</strong> Pre-installed with adaptors (LC, SC, etc.). Ready for immediate use with pigtails or direct termination. Common for standard deployments.</li>
                <li><strong>Unloaded Panels:</strong> Empty chassis accepting snap-in adaptor plates. Flexible configuration—mix connector types or densities as needed.</li>
                <li><strong>Cassette-Based Panels:</strong> Accept pre-terminated cassette modules (MTP-to-LC). Enable rapid deployment and change. Standard in high-density data centres.</li>
              </ul>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Densities (1U)</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>LC: 24-48 duplex ports</li>
                  <li>SC: 12-24 duplex ports</li>
                  <li>MTP: 4-6 ports (48-72 fibres)</li>
                  <li>Cassette: 3-4 cassettes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Features</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Cable management guides</li>
                  <li>Splice tray integration</li>
                  <li>Bend radius protection</li>
                  <li>Labelling systems</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>High-density considerations:</strong> High-density panels (48+ LC ports per 1U) require careful cable management. Use angled adaptor panels or sliding trays for rear access. Ensure adequate bend radius—a 1U panel with 96 fibres can become unmanageable without proper strain relief and routing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 02: MTP Cassette Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            MTP Cassette Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>MTP cassettes</strong> are modular enclosures that convert high-fibre-count MTP trunk cables into individual duplex connections suitable for transceiver ports. They're central to modern structured cabling designs, enabling rapid deployment and simplified moves/adds/changes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cassette Architecture:</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-white ml-4">
                <div>
                  <p className="text-elec-yellow/80">Rear Connection</p>
                  <p>MTP (12 or 24 fibre)</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Front Ports</p>
                  <p>6x or 12x LC duplex</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Internal Routing</p>
                  <p>Factory-terminated fanout</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Polarity Management</p>
                  <p>Type A, B, or Universal</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cassette Benefits</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rapid deployment:</strong> Pre-terminated—no field splicing</li>
                <li><strong>Consistent quality:</strong> Factory-tested to specification</li>
                <li><strong>Flexibility:</strong> Swap cassettes for different configurations</li>
                <li><strong>Reduced congestion:</strong> Single MTP trunk vs. 12 individual cables</li>
                <li><strong>Future-proof:</strong> Trunk infrastructure supports speed upgrades</li>
              </ul>
            </div>

            <p>
              In a typical deployment, <strong>MTP trunk cables</strong> run between patch panel locations (e.g., MDA to IDA in a data centre). Cassettes at each end convert to LC duplex for connection to server/switch transceivers. The same trunk can support 1G, 10G, or 40G/100G parallel optics by changing cassettes.
            </p>

            <p>
              <strong>Polarity considerations:</strong> Fibre polarity (ensuring Tx connects to Rx) must be maintained across the link. Cassette systems use <strong>Type A</strong> (straight), <strong>Type B</strong> (reversed pairs), or <strong>Universal</strong> methods. Document and standardise your polarity method—mixing types causes connection failures.
            </p>
          </div>
        </section>

        {/* Section 03: Transceiver Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Transceiver Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Optical transceivers</strong> convert electrical signals from network equipment into optical signals for fibre transmission, and vice versa. They're pluggable modules that insert into switch, router, or server ports, providing flexibility to match the network interface to the installed fibre type and distance requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transceiver Components</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TOSA:</strong> Transmitter Optical Sub-Assembly (laser/LED + driver)</li>
                <li><strong>ROSA:</strong> Receiver Optical Sub-Assembly (photodiode + amplifier)</li>
                <li><strong>CDR:</strong> Clock and Data Recovery circuits</li>
                <li><strong>MCU:</strong> Microcontroller for DOM and management</li>
                <li><strong>Optical interface:</strong> LC, SC, or MTP connector receptacle</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Specifications:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-white ml-4">
                <div>
                  <p className="text-elec-yellow/80">Data Rate</p>
                  <p>1G to 400G+</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Wavelength</p>
                  <p>850nm, 1310nm, 1550nm</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Reach</p>
                  <p>SR, LR, ER, ZR</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Fibre Type</p>
                  <p>MMF or SMF</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Connector</p>
                  <p>LC duplex, MTP</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Power</p>
                  <p>0.5W to 10W+</p>
                </div>
              </div>
            </div>

            <p>
              The <strong>reach designation</strong> indicates intended distance: SR (Short Range, typically multimode), LR (Long Range, 10km singlemode), ER (Extended Range, 40km), ZR (Very Long Range, 80km+). Always match transceiver reach to your fibre type and link distance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: SFP and SFP+ Transceivers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            SFP and SFP+ Transceivers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>SFP (Small Form-factor Pluggable)</strong> and <strong>SFP+</strong> are the most common transceiver formats in enterprise and data centre networks. Their compact size, hot-swappable design, and wide availability make them the standard choice for 1G and 10G connectivity.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SFP (1G)</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Data Rate: Up to 1.25 Gbps</li>
                  <li>Common: 1000BASE-SX, LX, ZX</li>
                  <li>Connector: LC duplex</li>
                  <li>Power: ~0.5-1W</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SFP+ (10G)</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Data Rate: Up to 10 Gbps</li>
                  <li>Common: 10GBASE-SR, LR, ER</li>
                  <li>Connector: LC duplex</li>
                  <li>Power: ~0.7-1.5W</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common 10G SFP+ Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>10GBASE-SR:</strong> 850nm, multimode, 26-400m (grade dependent)</li>
                <li><strong>10GBASE-LR:</strong> 1310nm, singlemode, up to 10km</li>
                <li><strong>10GBASE-ER:</strong> 1550nm, singlemode, up to 40km</li>
                <li><strong>10GBASE-LRM:</strong> 1310nm, multimode (legacy 62.5µm), 220m</li>
              </ul>
            </div>

            <p>
              <strong>SFP28 - 25G Option:</strong> SFP28 extends the SFP form factor to 25 Gbps, using the same cage as SFP+. Commonly used for 25GbE server connections and as building blocks for 100G (4×25G). Check switch compatibility—not all SFP+ ports support SFP28.
            </p>
          </div>
        </section>

        {/* Section 05: QSFP and High-Speed Transceivers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            QSFP and High-Speed Transceivers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>QSFP (Quad Small Form-factor Pluggable)</strong> transceivers use four parallel lanes to achieve higher aggregate bandwidth. They're essential for 40G, 100G, and 400G connections in data centres and high-performance computing environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">QSFP Family Overview:</p>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4 mb-2">
                <span className="font-medium">Module</span>
                <span className="font-medium">Data Rate</span>
                <span className="font-medium">Lane Config</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>QSFP+</span>
                <span>40 Gbps</span>
                <span>4×10G</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>QSFP28</span>
                <span>100 Gbps</span>
                <span>4×25G</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>QSFP56</span>
                <span>200 Gbps</span>
                <span>4×50G</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>QSFP-DD</span>
                <span>400 Gbps</span>
                <span>8×50G</span>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">40G QSFP+ Options</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>40GBASE-SR4:</strong> 4×10G, MMF, 100-150m</li>
                  <li><strong>40GBASE-LR4:</strong> WDM, SMF, 10km</li>
                  <li><strong>40GBASE-ER4:</strong> WDM, SMF, 40km</li>
                  <li>Connector: MTP (SR4) or LC (LR4)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">100G QSFP28 Options</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>100GBASE-SR4:</strong> 4×25G, MMF, 70-100m</li>
                  <li><strong>100GBASE-LR4:</strong> WDM, SMF, 10km</li>
                  <li><strong>100GBASE-CWDM4:</strong> CWDM, SMF, 2km</li>
                  <li>Connector: MTP (SR4) or LC (LR4)</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Breakout Cables:</strong> QSFP ports can connect to multiple lower-speed ports using breakout cables. A 40G QSFP+ can break out to 4×10G SFP+ ports using an MTP-to-4×LC cable. Similarly, 100G QSFP28 breaks out to 4×25G SFP28. This enables flexible connectivity between high-density spine switches and lower-speed leaf or server ports.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Selection and Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Selection and Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right transceiver requires matching <strong>data rate</strong>, <strong>fibre type</strong>, <strong>distance</strong>, and <strong>equipment compatibility</strong>. Once installed, <strong>Digital Optical Monitoring (DOM)</strong> provides real-time visibility into transceiver health and link quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selection Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Data Rate:</strong> Match to port speed (1G, 10G, 25G, 100G)</li>
                <li><strong>Fibre Type:</strong> SR for multimode, LR/ER for singlemode</li>
                <li><strong>Distance:</strong> Verify transceiver reach exceeds link length</li>
                <li><strong>Connector:</strong> LC duplex for SFP, MTP or LC for QSFP</li>
                <li><strong>Compatibility:</strong> OEM or validated third-party for your switch</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Optical Monitoring (DOM)</p>
              <p className="text-sm text-white mb-2">DOM (also called DDM - Digital Diagnostic Monitoring) provides real-time telemetry:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TX Power:</strong> Transmitted optical power (dBm)</li>
                <li><strong>RX Power:</strong> Received optical power (dBm)</li>
                <li><strong>Temperature:</strong> Module internal temperature</li>
                <li><strong>Voltage:</strong> Supply voltage</li>
                <li><strong>Bias Current:</strong> Laser drive current</li>
              </ul>
            </div>

            <p>
              Monitor DOM readings to detect problems before they cause outages. <strong>Declining RX power</strong> may indicate dirty connectors or degrading fibre. <strong>High temperature</strong> suggests cooling issues. <strong>Abnormal bias current</strong> can predict laser failure. Set alerts for readings approaching threshold limits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Selection Errors</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Using SR transceivers on singlemode fibre (incompatible)</li>
                <li>Exceeding distance rating (causes bit errors or link failure)</li>
                <li>Mismatched wavelengths at each end (no communication)</li>
                <li>Ignoring power budget (insufficient margin for losses)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Patch Panel Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mount at accessible height—avoid floor level or extreme top of rack</li>
                <li>Leave adequate slack for panel removal/sliding trays</li>
                <li>Label both front ports and rear cable entry points</li>
                <li>Maintain minimum bend radius throughout routing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Transceiver Handling</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always use ESD protection when handling transceivers</li>
                <li>Keep dust plugs in place until connecting fibre</li>
                <li>Insert fully until latch clicks—partial insertion causes errors</li>
                <li>Check DOM readings after installation to verify operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing polarity methods</strong> — within the same infrastructure</li>
                <li><strong>Over-tightening rack screws</strong> — can warp panel frame</li>
                <li><strong>Incompatible combinations</strong> — transceiver/fibre mismatch</li>
                <li><strong>Missing documentation</strong> — port assignments and cable IDs</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Transceiver Selection</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">By Speed</p>
                <ul className="space-y-0.5">
                  <li><strong>1G:</strong> SFP (SX/LX/ZX)</li>
                  <li><strong>10G:</strong> SFP+ (SR/LR/ER)</li>
                  <li><strong>25G:</strong> SFP28</li>
                  <li><strong>40G:</strong> QSFP+ (SR4/LR4)</li>
                  <li><strong>100G:</strong> QSFP28 (SR4/LR4)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">By Fibre Type</p>
                <ul className="space-y-0.5">
                  <li><strong>Multimode:</strong> SR variants (850nm)</li>
                  <li><strong>Singlemode &lt;10km:</strong> LR (1310nm)</li>
                  <li><strong>Singlemode &lt;40km:</strong> ER (1550nm)</li>
                  <li><strong>Singlemode &lt;80km:</strong> ZR (1550nm)</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Polish Grades
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next: Connector Compatibility
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule2Section5;
