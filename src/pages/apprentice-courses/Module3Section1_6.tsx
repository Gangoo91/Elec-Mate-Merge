import { ArrowLeft, Router, CheckCircle, Wrench, Settings, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Data, Signal, and Low Voltage Cabling - Module 3.1.6 | Level 2 Electrical Course";
const DESCRIPTION = "Basic awareness guide to data cables, signal cables and ELV systems. Cat6, alarm cables, separation requirements and installation practices.";

const quickCheckQuestions = [
  {
    id: "elv-application",
    question: "Name one example of a low voltage application using ELV cable.",
    options: ["Lighting circuits", "Doorbell systems", "Socket outlets", "Cooker circuits"],
    correctIndex: 1,
    explanation: "Doorbell systems operate at extra-low voltage (typically 12-24V) making them safe from electric shock risk."
  },
  {
    id: "cat6-distance",
    question: "What is the maximum standard run length for Cat6 cable without boosting?",
    options: ["50 metres", "75 metres", "100 metres", "150 metres"],
    correctIndex: 2,
    explanation: "Cat6 Ethernet cable has a maximum run length of 100 metres before signal degradation requires repeaters or switches."
  },
  {
    id: "cable-separation",
    question: "Why should data cables be kept separate from mains cables?",
    options: ["To save space", "To reduce electromagnetic interference", "To meet colour coding", "To reduce cost"],
    correctIndex: 1,
    explanation: "Mains cables can induce electromagnetic interference in data cables, causing signal degradation and network issues."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which cable type is commonly used for Ethernet networking?",
    options: ["Cat6", "SWA", "PVC twin and earth", "HOFR"],
    correctAnswer: 0,
    explanation: "Cat6 (Category 6) cable is a standard twisted pair cable designed for Ethernet networking up to 1 Gigabit speeds."
  },
  {
    id: 2,
    question: "What is the maximum recommended length for a Cat6 cable run without a repeater?",
    options: ["50 m", "75 m", "100 m", "150 m"],
    correctAnswer: 2,
    explanation: "Cat6 cable has a maximum run length of 100 metres before signal attenuation requires network equipment to boost the signal."
  },
  {
    id: 3,
    question: "True or False: Alarm cables can be run alongside mains cables in the same conduit without separation.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. BS 7671 requires separation between alarm/data cables and mains cables to prevent electromagnetic interference."
  },
  {
    id: 4,
    question: "Which voltage level defines Extra-Low Voltage (ELV) for AC circuits?",
    options: ["Below 50 V", "Below 100 V", "Below 230 V", "Below 400 V"],
    correctAnswer: 0,
    explanation: "Extra-Low Voltage (ELV) is defined as below 50V AC or 120V DC, providing enhanced safety from electric shock."
  },
  {
    id: 5,
    question: "Why should the bend radius of a data cable be observed during installation?",
    options: ["To make it easier to pull", "To avoid damaging insulation or signal performance", "To increase flexibility", "To reduce cost"],
    correctAnswer: 1,
    explanation: "Exceeding bend radius can damage internal conductors and degrade signal quality, affecting network performance."
  },
  {
    id: 6,
    question: "What is the main purpose of shielding in signal cables?",
    options: ["Increase current capacity", "Reduce electromagnetic interference", "Improve flexibility", "Reduce cost"],
    correctAnswer: 1,
    explanation: "Shielding protects signal cables from electromagnetic interference (EMI) that can degrade signal quality."
  },
  {
    id: 7,
    question: "What regulation covers general wiring standards in the UK, including separation of ELV and mains cables?",
    options: ["BS 6701", "BS EN 50173", "BS 7671", "BS 6004"],
    correctAnswer: 2,
    explanation: "BS 7671 (IET Wiring Regulations) covers general electrical installation requirements including cable separation rules."
  },
  {
    id: 8,
    question: "Which cable type would be most suitable for IP-based CCTV systems?",
    options: ["Cat5e or Cat6", "Twin and earth", "SWA cable", "HOFR flex"],
    correctAnswer: 0,
    explanation: "IP-based CCTV systems use network protocols and require Cat5e or Cat6 structured cabling for data transmission."
  }
];

const faqs = [
  { q: "Can I run alarm cable alongside mains cables in the same conduit?", a: "No — BS 7671 requires separation to prevent interference and ensure compliance. Use separate conduits or compartmented trunking with metallic dividers." },
  { q: "What's the difference between Cat5e and Cat6?", a: "Cat6 has tighter cable twists, improved insulation, and supports higher frequencies (250 MHz vs 100 MHz), allowing better performance and reduced interference. Cat6 also supports 10 Gigabit over shorter distances." },
  { q: "Can low voltage cables cause electric shock?", a: "ELV systems below 50V AC are generally safe from shock risk, but poor installation can still cause overheating, short circuits, or system failure. Some ELV systems like PoE+ can deliver up to 90W of power." },
  { q: "Do data cables need to be tested after installation?", a: "Yes, all structured cabling should be tested to relevant standards (e.g., Cat6 to ISO/IEC 11801) using calibrated test equipment to verify performance and provide warranty coverage." },
  { q: "What is the maximum distance for Cat6 cable?", a: "100 metres for Gigabit Ethernet, or 55 metres for 10 Gigabit applications. Beyond this, network switches or repeaters are required to regenerate the signal." },
  { q: "Can I use standard electrical conduit for data cables?", a: "Yes, but ensure adequate separation from mains cables and follow bend radius requirements. Dedicated data-grade containment systems often provide better cable management and future access." }
];

const Module3Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Router className="h-4 w-4" />
            <span>Module 3.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Data, Signal, and Low Voltage Cabling
          </h1>
          <p className="text-white/80">
            Basic awareness of data networks, signal systems and extra-low voltage installations for modern buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>Data, signal and ELV cables operate at much lower voltages than mains circuits</li>
              <li>Used for networking, alarms, CCTV, door entry, building automation and AV systems</li>
              <li>Must be separated from mains cables to prevent electromagnetic interference</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Small diameter cables, often with data connectors, Cat6 markings, or alarm labelling</li>
              <li><strong>Use:</strong> Computer networks, IP CCTV, telephone systems, doorbells, access control</li>
              <li><strong>Check:</strong> Separation from mains, bend radius, appropriate cable type for application</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common types of data, signal, and low voltage cables and their applications",
              "Understand their use in domestic, commercial, and industrial settings",
              "Recognise the differences between these cables and standard mains power cables",
              "Explain basic installation considerations to maintain performance and safety",
              "Appreciate the need for separation from mains cabling to reduce electromagnetic interference"
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

        {/* Section 1: Common Cable Types and Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Common Cable Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Cables (Networking)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white text-xs mb-2">Common Categories</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Cat5e:</strong> Enhanced Category 5, supports up to 1 Gigabit Ethernet (1000BASE-T)</li>
                    <li><strong>Cat6:</strong> Category 6, improved performance up to 250 MHz, reduced crosstalk</li>
                    <li><strong>Cat6a:</strong> Augmented Cat6, supports 10 Gigabit over 100m, up to 500 MHz</li>
                    <li><strong>Cat7/Cat8:</strong> Higher performance for specialist data centre applications</li>
                    <li><strong>Shielded variants (STP/FTP):</strong> Foil or braided screening reduces EMI</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white text-xs mb-2">Applications and Specifications</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Computer networks:</strong> Gigabit/10-Gigabit Ethernet connections</li>
                    <li><strong>IP CCTV:</strong> High-definition cameras with Power over Ethernet (PoE)</li>
                    <li><strong>VoIP systems:</strong> Digital telephone networks replacing analogue</li>
                    <li><strong>Building automation:</strong> HVAC, lighting, and security integration</li>
                    <li><strong>Wireless access points:</strong> WiFi infrastructure backbone connections</li>
                    <li><strong>Digital signage:</strong> Network-connected displays and information systems</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 mt-4 rounded bg-elec-yellow/5">
                <p className="text-xs font-medium text-elec-yellow mb-2">Technical Specifications</p>
                <div className="grid grid-cols-3 gap-3 text-xs text-white">
                  <div><strong>Cat5e:</strong> 100 MHz, 1 Gbps, 100m max</div>
                  <div><strong>Cat6:</strong> 250 MHz, 1-10 Gbps, 55m for 10G</div>
                  <div><strong>Cat6a:</strong> 500 MHz, 10 Gbps, 100m for 10G</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-green-500/10 border border-green-400/30">
                <p className="font-medium text-white text-sm mb-2">Signal Cables</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Alarm cables:</strong> Multi-core PVC sheathed (4-8 core typical) for intruder alarms, access control, and intercoms</li>
                  <li><strong>Audio cables:</strong> Shielded twisted pair for PA systems, background music, and intercom</li>
                  <li><strong>Control cables:</strong> HVAC control, lighting dimmers, motorised valve control</li>
                  <li><strong>Coaxial cables:</strong> Analogue CCTV (RG59), satellite/aerial distribution (CT100)</li>
                  <li><strong>Fire alarm cables:</strong> Enhanced fire resistance (FP200, FP400 types)</li>
                  <li><strong>RS485/Modbus:</strong> Industrial communication protocols for building management</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Low Voltage Power Cables</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>ELV (Extra-Low Voltage):</strong> Below 50 V AC or 120 V DC for enhanced safety</li>
                  <li><strong>LED strip lighting:</strong> 12V/24V DC constant voltage supplies</li>
                  <li><strong>Doorbell systems:</strong> Traditional transformer-fed bell wire (8-24V AC)</li>
                  <li><strong>Security systems:</strong> PIR detectors, door contacts, sirens (12V DC typical)</li>
                  <li><strong>Speaker cables:</strong> Low impedance (4-16 ohm) audio distribution</li>
                  <li><strong>Figure-8 cable:</strong> Twin parallel conductors for simple DC applications</li>
                  <li><strong>PoE systems:</strong> Power over Ethernet (up to 90W for PoE++)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-2">Specialist Applications:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Access control:</strong> Card readers, electric locks, biometric scanners</li>
                  <li><strong>HVAC integration:</strong> Temperature sensors, damper controls, fan speed control</li>
                  <li><strong>Lighting control:</strong> DALI, DMX512 for intelligent lighting systems</li>
                  <li><strong>Digital signage:</strong> Network displays, wayfinding systems</li>
                </ul>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Nurse call systems:</strong> Healthcare communication networks</li>
                  <li><strong>Audio/visual distribution:</strong> Conference rooms, presentation systems</li>
                  <li><strong>Building energy management:</strong> Smart meters, sub-metering systems</li>
                  <li><strong>Emergency systems:</strong> Evacuation sounders, emergency lighting monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-cable-types"
          question="Which category of data cable supports 10 Gigabit Ethernet over 100 metres?"
          options={["Cat5e", "Cat6", "Cat6a", "Cat7"]}
          correctIndex={2}
          explanation="Cat6a (Augmented Category 6) is designed to support 10 Gigabit Ethernet transmission over the full 100-metre distance."
        />

        {/* Section 2: Key Differences from Mains Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Differences from Mains Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Physical and Electrical Characteristics</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Conductor size:</strong> Much smaller (typically 22-26 AWG) due to low current requirements</li>
                  <li><strong>Insulation:</strong> Designed for signal integrity rather than high voltage breakdown</li>
                  <li><strong>Impedance:</strong> Controlled impedance (100 Ohm for Cat6, 75 Ohm for coax)</li>
                  <li><strong>Twisted pair construction:</strong> Reduces electromagnetic interference and crosstalk</li>
                  <li><strong>Shielding options:</strong> Foil (F/UTP), braided (S/UTP), or both (S/FTP)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Performance and Safety Requirements</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Fire performance:</strong> LSZH (Low Smoke Zero Halogen) for escape routes</li>
                  <li><strong>Bandwidth specifications:</strong> Frequency response critical for data integrity</li>
                  <li><strong>Return loss:</strong> Signal reflection must be minimised</li>
                  <li><strong>Near-end crosstalk (NEXT):</strong> Inter-pair interference control</li>
                  <li><strong>Power limitations:</strong> Safe extra-low voltage levels only</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-3">Safety and Regulatory Differences</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white text-xs mb-2">Safety Considerations</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Voltage levels:</strong> ELV systems below 50V AC/120V DC eliminate shock risk</li>
                    <li><strong>Fire safety:</strong> LSZH cables mandatory in public buildings and escape routes</li>
                    <li><strong>Circuit protection:</strong> Different fusing and protection requirements</li>
                    <li><strong>Earthing:</strong> Functional earthing for signal reference, not safety</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white text-xs mb-2">Standards and Compliance</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>BS EN 50173:</strong> Structured cabling systems for buildings</li>
                    <li><strong>BS 6701:</strong> Code of practice for installation of apparatus for IT systems</li>
                    <li><strong>BS 7671:</strong> Separation and installation requirements</li>
                    <li><strong>ISO/IEC 11801:</strong> International cabling standards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-differences"
          question="What is the primary design focus for data cables compared to mains cables?"
          options={["High current capacity", "Signal integrity and bandwidth", "Mechanical strength", "Low cost"]}
          correctIndex={1}
          explanation="Data cables are designed primarily for signal integrity and bandwidth performance rather than high current carrying capacity."
        />

        {/* Section 3: Installation Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Critical Separation Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white text-xs mb-2">Why Separation is Essential</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Electromagnetic interference (EMI):</strong> Mains cables create 50Hz magnetic fields</li>
                    <li><strong>Harmonic distortion:</strong> Switch mode power supplies generate high-frequency noise</li>
                    <li><strong>Fluorescent lighting:</strong> Particularly problematic due to high-frequency switching</li>
                    <li><strong>Motor circuits:</strong> Starting currents and switching create significant interference</li>
                    <li><strong>Variable speed drives:</strong> PWM signals can severely affect data integrity</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white text-xs mb-2">Separation Methods and Distances</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Physical separation:</strong> Minimum 50mm from mains, 300mm from high-power circuits</li>
                    <li><strong>Separate containment:</strong> Dedicated cable trays, trunking compartments</li>
                    <li><strong>Screened compartments:</strong> Metallic dividers in shared trunking systems</li>
                    <li><strong>Height separation:</strong> Data cables above, mains cables below in tray systems</li>
                    <li><strong>Perpendicular crossings:</strong> 90 degree crossings minimise parallel interference</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Cable Management Systems</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Perforated cable trays:</strong> Excellent ventilation and access</li>
                  <li><strong>Ladder cable trays:</strong> Heavy-duty support for large installations</li>
                  <li><strong>Basket trays:</strong> Wire mesh construction for lighter loads</li>
                  <li><strong>Data trunking:</strong> Dedicated compartmented trunking systems</li>
                  <li><strong>Under-floor systems:</strong> Raised floor installations with segregation</li>
                  <li><strong>Overhead containment:</strong> Suspended systems in commercial buildings</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-green-500/10 border border-green-400/30">
                <p className="font-medium text-white text-sm mb-2">Installation Standards</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Bend radius:</strong> Minimum 4x cable diameter for Cat6 (typically 25mm)</li>
                  <li><strong>Pulling tension:</strong> Maximum 110N (25lbf) for 4-pair cables</li>
                  <li><strong>Support intervals:</strong> Every 1.5m horizontally, 3m vertically</li>
                  <li><strong>Temperature derating:</strong> Reduced performance above 40 degree C ambient</li>
                  <li><strong>Bundle fill:</strong> Maximum 40% fill ratio in trunking systems</li>
                  <li><strong>Cable dressing:</strong> Neat installation for maintenance access</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Environmental Factors</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Temperature effects:</strong> High temperatures reduce transmission distance</li>
                  <li><strong>Moisture protection:</strong> IP ratings for external and wet areas</li>
                  <li><strong>UV degradation:</strong> Use UV-stable cables for external applications</li>
                  <li><strong>Rodent protection:</strong> Steel tape armoured cables in risk areas</li>
                  <li><strong>Fire resistance:</strong> Circuit integrity cables for fire alarm systems</li>
                  <li><strong>Chemical resistance:</strong> Special jackets for industrial environments</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-400/30">
              <p className="text-sm font-medium text-white mb-3">Testing and Certification Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white text-xs mb-2">Performance Testing</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Link certification:</strong> End-to-end performance verification using calibrated testers</li>
                    <li><strong>Wire map testing:</strong> Continuity and correct termination verification</li>
                    <li><strong>NEXT testing:</strong> Near-end crosstalk measurement between pairs</li>
                    <li><strong>Return loss:</strong> Signal reflection measurement at all frequencies</li>
                    <li><strong>Insertion loss:</strong> Signal attenuation over cable length</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white text-xs mb-2">Documentation Requirements</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li><strong>Test certificates:</strong> Pass/fail results for every cable link</li>
                    <li><strong>Cable schedules:</strong> Complete labelling and routing documentation</li>
                    <li><strong>As-built drawings:</strong> Updated plans showing actual installation</li>
                    <li><strong>Warranty coverage:</strong> Manufacturer's system warranty requirements</li>
                    <li><strong>Maintenance records:</strong> Periodic re-testing and performance monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-installation"
          question="What is the minimum recommended separation between mains and data cables?"
          options={["25mm", "50mm", "100mm", "150mm"]}
          correctIndex={1}
          explanation="A minimum separation of 50mm is typically recommended to reduce electromagnetic interference from mains cables."
        />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Knowledge Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Knowledge Checks</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((q) => (
              <InlineCheck key={q.id} {...q} />
            ))}
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real-World Example</h2>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
            <h3 className="text-sm font-medium text-white mb-3">Office Refurbishment Network Performance Issues</h3>
            <p className="text-sm text-white mb-4">
              During a major office refurbishment project, the facilities manager reported severe network
              performance problems affecting 200+ workstations. Initial investigation revealed that Cat5e
              cables had been installed in the same steel trunking as mains cables without any separation
              divider, violating BS 6701 guidelines.
            </p>
            <p className="text-sm font-medium text-white mb-2">Problems Experienced:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-white mb-4">
              <li><strong>Network speeds:</strong> Actual throughput of 10-50 Mbps instead of expected 1000 Mbps</li>
              <li><strong>Frequent disconnections:</strong> Workstations losing network connectivity randomly</li>
              <li><strong>VoIP call quality:</strong> Poor audio quality, dropped calls, and jitter issues</li>
              <li><strong>Peak load failures:</strong> Complete network collapse during high electrical demand</li>
              <li><strong>Lighting interference:</strong> Network errors coinciding with fluorescent light switching</li>
              <li><strong>CCTV system issues:</strong> IP cameras experiencing frequent dropouts and pixelation</li>
            </ul>
            <p className="text-sm font-medium text-white mb-2">Technical Investigation Findings:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-white mb-4">
              <li><strong>Cable testing results:</strong> NEXT (Near-End Crosstalk) values failed Category 5e specifications</li>
              <li><strong>Signal-to-noise ratio:</strong> Unacceptable levels due to 50Hz mains interference</li>
              <li><strong>Electromagnetic coupling:</strong> Steel trunking acting as antenna, amplifying interference</li>
              <li><strong>Harmonic distortion:</strong> Switch-mode PSUs creating high-frequency noise</li>
              <li><strong>Return loss measurements:</strong> Poor impedance matching due to interference</li>
            </ul>
            <p className="text-sm font-medium text-white mb-2">Comprehensive Solution Implemented:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-white mb-4">
              <li><strong>Physical separation:</strong> Installed earthed metallic divider creating 75mm separation</li>
              <li><strong>Cable replacement:</strong> Replaced damaged cables with Cat6 for future-proofing</li>
              <li><strong>Route optimisation:</strong> Relocated most problematic runs using dedicated cable trays</li>
              <li><strong>Shielding upgrade:</strong> Used screened Cat6 (F/UTP) in high-interference areas</li>
              <li><strong>Documentation:</strong> Full certification testing and as-built drawings provided</li>
              <li><strong>Maintenance schedule:</strong> Quarterly performance monitoring implemented</li>
            </ul>
            <p className="text-sm font-medium text-white mb-2">Results Achieved:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-white mb-4">
              <li>Full gigabit network performance restored across all 200+ connections</li>
              <li>VoIP system stability improved with crystal-clear call quality</li>
              <li>CCTV system providing reliable high-definition video streams</li>
              <li>Future-proofed installation supporting 10-Gigabit upgrade path</li>
              <li>GBP 25,000 project cost compared to GBP 150,000+ for complete re-cabling</li>
            </ul>
            <p className="text-sm text-white">
              This case study highlights the critical importance of following separation requirements
              during initial installation. The project demonstrated that proper planning and adherence
              to standards prevents costly remedial work and ensures reliable system performance.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.q}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Data and Signal Cables Knowledge Test"
            questions={quizQuestions}
          />
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm text-white mb-3">
              Data, signal, and low voltage cables are critical for modern systems in homes, offices,
              and industrial facilities. While they operate at safer voltages, correct selection, routing,
              and installation are essential to maintain performance, avoid interference, and comply with regulations.
            </p>
            <p className="text-sm text-white mb-2">Key points to remember:</p>
            <ul className="text-sm text-white space-y-1 ml-4">
              <li>Always maintain separation from mains cables to prevent electromagnetic interference</li>
              <li>Follow bend radius guidelines to maintain signal integrity</li>
              <li>Use appropriate cable categories for bandwidth requirements</li>
              <li>Test installations to verify performance standards</li>
              <li>Comply with relevant standards including BS 7671, BS EN 50173, and BS 6701</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-7">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module3Section1_6;
