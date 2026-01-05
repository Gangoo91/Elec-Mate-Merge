import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Cable, Zap, Shield, AlertTriangle, CheckCircle2, Home, Factory, Wrench, Scissors, Settings, Calculator, Router, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

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

const Module3Section1_6: React.FC = () => {
  useSEO(
    "Data, Signal, and Low Voltage Cabling – Module 3 (3.1.6)",
    "Basic awareness guide to data cables, signal cables and ELV systems. Cat6, alarm cables, separation requirements and installation practices."
  );

  const faqs = [
    { q: "Can I run alarm cable alongside mains cables in the same conduit?", a: "No — BS 7671 requires separation to prevent interference and ensure compliance. Use separate conduits or compartmented trunking with metallic dividers." },
    { q: "What's the difference between Cat5e and Cat6?", a: "Cat6 has tighter cable twists, improved insulation, and supports higher frequencies (250 MHz vs 100 MHz), allowing better performance and reduced interference. Cat6 also supports 10 Gigabit over shorter distances." },
    { q: "Can low voltage cables cause electric shock?", a: "ELV systems below 50V AC are generally safe from shock risk, but poor installation can still cause overheating, short circuits, or system failure. Some ELV systems like PoE+ can deliver up to 90W of power." },
    { q: "Do data cables need to be tested after installation?", a: "Yes, all structured cabling should be tested to relevant standards (e.g., Cat6 to ISO/IEC 11801) using calibrated test equipment to verify performance and provide warranty coverage." },
    { q: "What is the maximum distance for Cat6 cable?", a: "100 metres for Gigabit Ethernet, or 55 metres for 10 Gigabit applications. Beyond this, network switches or repeaters are required to regenerate the signal." },
    { q: "Can I use standard electrical conduit for data cables?", a: "Yes, but ensure adequate separation from mains cables and follow bend radius requirements. Dedicated data-grade containment systems often provide better cable management and future access." }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Router className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Section 3.1.6</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">Data, Signal, and Low Voltage Cabling</h1>
          <p className="text-muted-foreground">Basic awareness of data networks, signal systems and extra-low voltage installations for modern buildings.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Data, signal and ELV cables operate at much lower voltages than mains circuits.</li>
                <li>Used for networking, alarms, CCTV, door entry, building automation and AV systems.</li>
                <li>Must be separated from mains cables to prevent electromagnetic interference.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Small diameter cables, often with data connectors, Cat6 markings, or alarm labelling.</li>
                <li><strong>Use:</strong> Computer networks, IP CCTV, telephone systems, doorbells, access control.</li>
                <li><strong>Check:</strong> Separation from mains, bend radius, appropriate cable type for application.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify common types of data, signal, and low voltage cables and their applications.</li>
            <li>Understand their use in domestic, commercial, and industrial settings.</li>
            <li>Recognise the differences between these cables and standard mains power cables.</li>
            <li>Explain basic installation considerations to maintain performance and safety.</li>
            <li>Appreciate the need for separation from mains cabling to reduce electromagnetic interference.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Cable Types and Applications */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><Wrench className="w-5 h-5" /> Common Cable Types and Applications</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium mb-3">Data Cables (Networking)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Common Categories</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Cat5e:</strong> Enhanced Category 5, supports up to 1 Gigabit Ethernet (1000BASE-T)</li>
                      <li><strong>Cat6:</strong> Category 6, improved performance up to 250 MHz, reduced crosstalk</li>
                      <li><strong>Cat6a:</strong> Augmented Cat6, supports 10 Gigabit over 100m, up to 500 MHz</li>
                      <li><strong>Cat7/Cat8:</strong> Higher performance for specialist data centre applications</li>
                      <li><strong>Shielded variants (STP/FTP):</strong> Foil or braided screening reduces EMI</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Applications & Specifications</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Computer networks:</strong> Gigabit/10-Gigabit Ethernet connections</li>
                      <li><strong>IP CCTV:</strong> High-definition cameras with Power over Ethernet (PoE)</li>
                      <li><strong>VoIP systems:</strong> Digital telephone networks replacing analogue</li>
                      <li><strong>Building automation:</strong> HVAC, lighting, and security integration</li>
                      <li><strong>Wireless access points:</strong> WiFi infrastructure backbone connections</li>
                      <li><strong>Digital signage:</strong> Network-connected displays and information systems</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-emerald-500/10 rounded">
                  <p className="font-medium mb-2">Technical Specifications</p>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div><strong>Cat5e:</strong> 100 MHz, 1 Gbps, 100m max</div>
                    <div><strong>Cat6:</strong> 250 MHz, 1-10 Gbps, 55m for 10G</div>
                    <div><strong>Cat6a:</strong> 500 MHz, 10 Gbps, 100m for 10G</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-card border border-green-400/30">
                  <p className="font-medium mb-2">Signal Cables</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Alarm cables:</strong> Multi-core PVC sheathed (4-8 core typical) for intruder alarms, access control, and intercoms</li>
                    <li><strong>Audio cables:</strong> Shielded twisted pair for PA systems, background music, and intercom</li>
                    <li><strong>Control cables:</strong> HVAC control, lighting dimmers, motorised valve control</li>
                    <li><strong>Coaxial cables:</strong> Analogue CCTV (RG59), satellite/aerial distribution (CT100)</li>
                    <li><strong>Fire alarm cables:</strong> Enhanced fire resistance (FP200, FP400 types)</li>
                    <li><strong>RS485/Modbus:</strong> Industrial communication protocols for building management</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Low Voltage Power Cables</p>
                  <ul className="list-disc pl-4 space-y-1">
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

              <div className="bg-card border border-border/30 rounded-lg p-4 mt-4">
                <p className="font-medium mb-2">Specialist Applications:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Access control:</strong> Card readers, electric locks, biometric scanners</li>
                    <li><strong>HVAC integration:</strong> Temperature sensors, damper controls, fan speed control</li>
                    <li><strong>Lighting control:</strong> DALI, DMX512 for intelligent lighting systems</li>
                    <li><strong>Digital signage:</strong> Network displays, wayfinding systems</li>
                  </ul>
                  <ul className="list-disc pl-4 space-y-1">
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
          <Separator className="my-6" />

          {/* Key Differences */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Key Differences from Mains Cables</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Physical & Electrical Characteristics</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Conductor size:</strong> Much smaller (typically 22-26 AWG) due to low current requirements</li>
                    <li><strong>Insulation:</strong> Designed for signal integrity rather than high voltage breakdown</li>
                    <li><strong>Impedance:</strong> Controlled impedance (100Ω for Cat6, 75Ω for coax)</li>
                    <li><strong>Twisted pair construction:</strong> Reduces electromagnetic interference and crosstalk</li>
                    <li><strong>Shielding options:</strong> Foil (F/UTP), braided (S/UTP), or both (S/FTP)</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Performance & Safety Requirements</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Fire performance:</strong> LSZH (Low Smoke Zero Halogen) for escape routes</li>
                    <li><strong>Bandwidth specifications:</strong> Frequency response critical for data integrity</li>
                    <li><strong>Return loss:</strong> Signal reflection must be minimised</li>
                    <li><strong>Near-end crosstalk (NEXT):</strong> Inter-pair interference control</li>
                    <li><strong>Power limitations:</strong> Safe extra-low voltage levels only</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
                <p className="font-medium mb-3">Safety and Regulatory Differences:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Safety Considerations</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Voltage levels:</strong> ELV systems below 50V AC/120V DC eliminate shock risk</li>
                      <li><strong>Fire safety:</strong> LSZH cables mandatory in public buildings and escape routes</li>
                      <li><strong>Circuit protection:</strong> Different fusing and protection requirements</li>
                      <li><strong>Earthing:</strong> Functional earthing for signal reference, not safety</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Standards & Compliance</p>
                    <ul className="list-disc pl-4 space-y-1">
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
          <Separator className="my-6" />

          {/* Installation Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2"><Settings className="w-5 h-5" /> Installation Considerations</h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium mb-3">Critical Separation Requirements</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Why Separation is Essential</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Electromagnetic interference (EMI):</strong> Mains cables create 50Hz magnetic fields</li>
                      <li><strong>Harmonic distortion:</strong> Switch mode power supplies generate high-frequency noise</li>
                      <li><strong>Fluorescent lighting:</strong> Particularly problematic due to high-frequency switching</li>
                      <li><strong>Motor circuits:</strong> Starting currents and switching create significant interference</li>
                      <li><strong>Variable speed drives:</strong> PWM signals can severely affect data integrity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Separation Methods & Distances</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Physical separation:</strong> Minimum 50mm from mains, 300mm from high-power circuits</li>
                      <li><strong>Separate containment:</strong> Dedicated cable trays, trunking compartments</li>
                      <li><strong>Screened compartments:</strong> Metallic dividers in shared trunking systems</li>
                      <li><strong>Height separation:</strong> Data cables above, mains cables below in tray systems</li>
                      <li><strong>Perpendicular crossings:</strong> 90° crossings minimise parallel interference</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mt-4">
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Cable Management Systems</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Perforated cable trays:</strong> Excellent ventilation and access</li>
                    <li><strong>Ladder cable trays:</strong> Heavy-duty support for large installations</li>
                    <li><strong>Basket trays:</strong> Wire mesh construction for lighter loads</li>
                    <li><strong>Data trunking:</strong> Dedicated compartmented trunking systems</li>
                    <li><strong>Under-floor systems:</strong> Raised floor installations with segregation</li>
                    <li><strong>Overhead containment:</strong> Suspended systems in commercial buildings</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 bg-card border border-green-400/30">
                  <p className="font-medium mb-2">Installation Standards</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Bend radius:</strong> Minimum 4x cable diameter for Cat6 (typically 25mm)</li>
                    <li><strong>Pulling tension:</strong> Maximum 110N (25lbf) for 4-pair cables</li>
                    <li><strong>Support intervals:</strong> Every 1.5m horizontally, 3m vertically</li>
                    <li><strong>Temperature derating:</strong> Reduced performance above 40°C ambient</li>
                    <li><strong>Bundle fill:</strong> Maximum 40% fill ratio in trunking systems</li>
                    <li><strong>Cable dressing:</strong> Neat installation for maintenance access</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Environmental Factors</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Temperature effects:</strong> High temperatures reduce transmission distance</li>
                    <li><strong>Moisture protection:</strong> IP ratings for external and wet areas</li>
                    <li><strong>UV degradation:</strong> Use UV-stable cables for external applications</li>
                    <li><strong>Rodent protection:</strong> Steel tape armoured cables in risk areas</li>
                    <li><strong>Fire resistance:</strong> Circuit integrity cables for fire alarm systems</li>
                    <li><strong>Chemical resistance:</strong> Special jackets for industrial environments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-amber-400/30 rounded-lg p-4 mt-4">
                <p className="font-medium mb-3">Testing and Certification Requirements</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Performance Testing</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Link certification:</strong> End-to-end performance verification using calibrated testers</li>
                      <li><strong>Wire map testing:</strong> Continuity and correct termination verification</li>
                      <li><strong>NEXT testing:</strong> Near-end crosstalk measurement between pairs</li>
                      <li><strong>Return loss:</strong> Signal reflection measurement at all frequencies</li>
                      <li><strong>Insertion loss:</strong> Signal attenuation over cable length</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Documentation Requirements</p>
                    <ul className="list-disc pl-4 space-y-1">
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
          <Separator className="my-6" />
        </Card>

        {/* Quick Knowledge Checks */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick knowledge checks</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((q) => (
              <InlineCheck key={q.id} {...q} />
            ))}
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-card border border-green-400/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world example</h2>
          <div className="text-xs sm:text-sm text-foreground space-y-3">
            <p><strong>Office Refurbishment Network Performance Issues</strong></p>
            <p>
              During a major office refurbishment project, the facilities manager reported severe network 
              performance problems affecting 200+ workstations. Initial investigation revealed that Cat5e 
              cables had been installed in the same steel trunking as mains cables without any separation 
              divider, violating BS 6701 guidelines.
            </p>
            <p><strong>Problems Experienced:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Network speeds:</strong> Actual throughput of 10-50 Mbps instead of expected 1000 Mbps</li>
              <li><strong>Frequent disconnections:</strong> Workstations losing network connectivity randomly</li>
              <li><strong>VoIP call quality:</strong> Poor audio quality, dropped calls, and jitter issues</li>
              <li><strong>Peak load failures:</strong> Complete network collapse during high electrical demand</li>
              <li><strong>Lighting interference:</strong> Network errors coinciding with fluorescent light switching</li>
              <li><strong>CCTV system issues:</strong> IP cameras experiencing frequent dropouts and pixelation</li>
            </ul>
            <p><strong>Technical Investigation Findings:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cable testing results:</strong> NEXT (Near-End Crosstalk) values failed Category 5e specifications</li>
              <li><strong>Signal-to-noise ratio:</strong> Unacceptable levels due to 50Hz mains interference</li>
              <li><strong>Electromagnetic coupling:</strong> Steel trunking acting as antenna, amplifying interference</li>
              <li><strong>Harmonic distortion:</strong> Switch-mode PSUs creating high-frequency noise</li>
              <li><strong>Return loss measurements:</strong> Poor impedance matching due to interference</li>
            </ul>
            <p><strong>Comprehensive Solution Implemented:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Physical separation:</strong> Installed earthed metallic divider creating 75mm separation</li>
              <li><strong>Cable replacement:</strong> Replaced damaged cables with Cat6 for future-proofing</li>
              <li><strong>Route optimisation:</strong> Relocated most problematic runs using dedicated cable trays</li>
              <li><strong>Shielding upgrade:</strong> Used screened Cat6 (F/UTP) in high-interference areas</li>
              <li><strong>Documentation:</strong> Full certification testing and as-built drawings provided</li>
              <li><strong>Maintenance schedule:</strong> Quarterly performance monitoring implemented</li>
            </ul>
            <p><strong>Results Achieved:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full gigabit network performance restored across all 200+ connections</li>
              <li>VoIP system stability improved with crystal-clear call quality</li>
              <li>CCTV system providing reliable high-definition video streams</li>
              <li>Future-proofed installation supporting 10-Gigabit upgrade path</li>
              <li>£25,000 project cost compared to £150,000+ for complete re-cabling</li>
            </ul>
            <p>
              This case study highlights the critical importance of following separation requirements 
              during initial installation. The project demonstrated that proper planning and adherence 
              to standards prevents costly remedial work and ensures reliable system performance.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium mb-1">{faq.q}</p>
                <p className="text-muted-foreground">{faq.a}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Test your knowledge</h2>
          <Quiz questions={quizQuestions} title="Data & Signal Cables Knowledge Test" />
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="text-xs sm:text-sm text-foreground space-y-3">
            <p>
              Data, signal, and low voltage cables are critical for modern systems in homes, offices, 
              and industrial facilities. While they operate at safer voltages, correct selection, routing, 
              and installation are essential to maintain performance, avoid interference, and comply with regulations.
            </p>
            <p>Key points to remember:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Always maintain separation from mains cables to prevent electromagnetic interference</li>
              <li>Follow bend radius guidelines to maintain signal integrity</li>
              <li>Use appropriate cable categories for bandwidth requirements</li>
              <li>Test installations to verify performance standards</li>
              <li>Comply with relevant standards including BS 7671, BS EN 50173, and BS 6701</li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Module3Section1_6;