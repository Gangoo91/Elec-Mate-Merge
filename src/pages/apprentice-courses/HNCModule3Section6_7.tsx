import { ArrowLeft, Zap, CheckCircle, Sun, Battery, Car, Network, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Integration with Renewables and Storage Systems - HNC Module 3 Section 6.7";
const DESCRIPTION = "Master the integration of solar PV, battery storage, EV charging and smart grid technologies into building electrical systems, including G98/G99 requirements and microgrid design.";

const quickCheckQuestions = [
  {
    id: "g99-threshold",
    question: "What is the power threshold above which G99 application is required instead of G98?",
    options: ["3.68kW", "11.04kW", "16kW", "50kW"],
    correctIndex: 2,
    explanation: "G99 applies to generating equipment exceeding 16kW per phase (or 50kW three-phase total). Below this, the simpler G98 notification process applies for domestic and small commercial installations."
  },
  {
    id: "bess-chemistry",
    question: "Which battery chemistry is most commonly used in commercial BESS installations?",
    options: ["Lead-acid", "Lithium iron phosphate (LFP)", "Nickel-cadmium", "Flow batteries"],
    correctIndex: 1,
    explanation: "Lithium iron phosphate (LiFePO4/LFP) dominates commercial BESS due to superior safety (thermal stability), longer cycle life (6000+ cycles), and better round-trip efficiency (95%+) compared to other chemistries."
  },
  {
    id: "ev-mode2",
    question: "What is the maximum current permitted for Mode 2 EV charging from a standard UK socket?",
    options: ["8A", "10A", "13A", "16A"],
    correctIndex: 1,
    explanation: "Mode 2 charging uses an in-cable control box (ICCB) limiting current to 10A maximum from a standard 13A socket. This provides thermal protection for continuous charging loads over several hours."
  },
  {
    id: "islanding-detection",
    question: "What is the primary safety concern that anti-islanding protection addresses?",
    options: ["Overvoltage damage to equipment", "Energising the grid during maintenance", "Frequency instability", "Power quality issues"],
    correctIndex: 1,
    explanation: "Anti-islanding prevents a generator from continuing to energise a section of grid that has been disconnected, protecting maintenance workers from unexpected live conductors. G98/G99 mandate Loss of Mains (LoM) protection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What documentation is required for a G98 notification for a 4kW domestic PV system?",
    options: [
      "Full network study and DNO approval",
      "Simple notification to DNO within 28 days of commissioning",
      "Planning permission and building regulations approval",
      "Professional engineer's certification"
    ],
    correctAnswer: 1,
    explanation: "G98 is a notification-only process for installations up to 16kW per phase. The installer notifies the DNO within 28 days of commissioning using the standard G98 form. No approval is required - it's deemed accepted."
  },
  {
    id: 2,
    question: "A 10kWp PV system produces 9500kWh annually. What is the specific yield?",
    options: ["850 kWh/kWp", "900 kWh/kWp", "950 kWh/kWp", "1000 kWh/kWp"],
    correctAnswer: 2,
    explanation: "Specific yield = Annual production / Installed capacity = 9500kWh / 10kWp = 950 kWh/kWp. UK systems typically achieve 850-1000 kWh/kWp depending on location, orientation and shading."
  },
  {
    id: 3,
    question: "What round-trip efficiency should be expected from a modern lithium BESS?",
    options: ["70-75%", "80-85%", "90-95%", "98-99%"],
    correctAnswer: 2,
    explanation: "Modern lithium batteries achieve 90-95% round-trip efficiency (energy out vs energy in). Losses occur in the battery cells, BMS, inverter conversion and parasitic loads (cooling, controls)."
  },
  {
    id: 4,
    question: "What is the purpose of export limitation in a grid-connected PV system?",
    options: [
      "To maximise self-consumption",
      "To comply with DNO connection agreements",
      "To protect the inverter from damage",
      "Both A and B"
    ],
    correctAnswer: 3,
    explanation: "Export limitation serves both purposes: it maximises self-consumption (improving financial returns) and complies with DNO requirements where network capacity is constrained. Many G98/G99 agreements include export limits."
  },
  {
    id: 5,
    question: "Which EV charging mode requires a dedicated circuit with EVSE (wallbox)?",
    options: ["Mode 1", "Mode 2", "Mode 3", "Mode 4"],
    correctAnswer: 2,
    explanation: "Mode 3 uses a dedicated EVSE (Electric Vehicle Supply Equipment) permanently connected to the installation. It provides pilot signal communication for smart charging features and typically operates at 7kW (32A single-phase) or 22kW (32A three-phase)."
  },
  {
    id: 6,
    question: "What is the minimum cable size required for a 7.4kW (32A) EV charger on a 20m run?",
    options: ["4mm²", "6mm²", "10mm²", "16mm²"],
    correctAnswer: 1,
    explanation: "A 32A load requires minimum 6mm² cable for current capacity. For a 20m run, voltage drop = 32A × 40m × 3.08mΩ/m = 3.94V (1.7%), within the 5% limit. 6mm² is suitable for this installation."
  },
  {
    id: 7,
    question: "What frequency deviation triggers Loss of Mains protection disconnection under G98/G99?",
    options: ["±0.2Hz", "±0.5Hz", "±1.5Hz", "±2.5Hz"],
    correctAnswer: 2,
    explanation: "G98/G99 require disconnection when frequency deviates beyond 47.5Hz-52Hz (±1.5Hz from 50Hz nominal). Rate of Change of Frequency (RoCoF) protection must also disconnect at >1Hz/s to detect islanding conditions."
  },
  {
    id: 8,
    question: "A building has 50kW PV, 100kWh BESS and 200kW peak demand. What BESS sizing ratio provides 30 minutes peak shaving?",
    options: ["0.25C (100kW discharge)", "0.5C (50kW discharge)", "1C (100kW discharge)", "2C (200kW discharge)"],
    correctAnswer: 2,
    explanation: "To shave 100kW from 200kW peak for 30 minutes requires 50kWh (100kW × 0.5h). At 1C rate, the 100kWh BESS can deliver 100kW, providing 50kWh in 30 minutes while maintaining battery health."
  },
  {
    id: 9,
    question: "What is the key advantage of AC-coupled over DC-coupled battery systems?",
    options: [
      "Higher efficiency",
      "Lower cost",
      "Flexibility - can retrofit to existing PV",
      "Smaller cable sizes"
    ],
    correctAnswer: 2,
    explanation: "AC-coupled systems connect the battery via its own inverter to the AC distribution. This allows retrofitting to any existing PV system and provides independence from the PV inverter. DC-coupled systems offer slightly higher efficiency but require compatible hybrid inverters."
  },
  {
    id: 10,
    question: "Under the Electric Vehicles (Smart Charge Points) Regulations 2021, what feature is mandatory for domestic chargepoints?",
    options: [
      "Solar integration capability",
      "Off-peak default charging (smart functionality)",
      "Vehicle-to-Grid (V2G) capability",
      "Three-phase connection"
    ],
    correctAnswer: 1,
    explanation: "The 2021 Regulations mandate that new domestic chargepoints must have smart functionality, defaulting to off-peak charging times to reduce grid strain. They must also be capable of responding to demand-side response signals."
  }
];

const faqs = [
  {
    question: "What is the difference between G98 and G99?",
    answer: "G98 is a simplified notification process for small-scale generation up to 16kW per phase (or 50kW total three-phase). The installer simply notifies the DNO within 28 days - no approval needed. G99 applies to larger installations and requires a formal application to the DNO before installation, including network studies and potentially reinforcement costs."
  },
  {
    question: "Can I install a battery without solar PV?",
    answer: "Yes, standalone BESS installations are increasingly common for tariff arbitrage (charging at cheap rates, discharging at peak rates) and grid services income. They still require G98/G99 notification if grid-connected, and the same safety standards apply. Some DNOs have specific requirements for battery-only installations."
  },
  {
    question: "What is the best battery sizing for a typical domestic installation?",
    answer: "A common rule is 1kWh storage per 1kWp of PV installed, but optimal sizing depends on consumption patterns. For a typical 4kWp domestic system, 5-10kWh provides good self-consumption without excessive cost. Larger batteries only benefit if there's sufficient excess generation to fill them."
  },
  {
    question: "Do I need three-phase supply for a 22kW EV charger?",
    answer: "Yes, 22kW chargers require three-phase supply (32A per phase at 400V). However, most domestic EVs can only accept 7kW AC maximum, making three-phase domestic installation often unnecessary. Commercial sites with multiple EVs or fast-charging requirements benefit from three-phase infrastructure."
  },
  {
    question: "What is Vehicle-to-Grid (V2G) and is it available in the UK?",
    answer: "V2G allows EVs to export stored energy back to the grid or building. It requires compatible vehicles (currently limited - mainly Nissan Leaf and some commercial vehicles), bidirectional chargers, and appropriate metering/agreements. UK trials are ongoing, with commercial availability expanding. V2G chargers need G98/G99 compliance as generating equipment."
  },
  {
    question: "Can a microgrid operate independently during a power cut?",
    answer: "Only if designed for islanding capability. Standard grid-tied inverters disconnect during outages (anti-islanding protection). Islanding-capable systems require additional equipment: automatic transfer switches, black-start capability, and careful load management. BS 7671 Section 551 covers requirements for switching between sources."
  }
];

const HNCModule3Section6_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6">
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
            <span>Module 3.6.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Integration with Renewables and Storage Systems
          </h1>
          <p className="text-white/80">
            Solar PV, battery storage, EV charging and smart grid integration for modern building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>G98/G99:</strong> Grid connection requirements for embedded generation</li>
              <li className="pl-1"><strong>Solar PV:</strong> Typically 850-1000 kWh/kWp annual yield in UK</li>
              <li className="pl-1"><strong>BESS:</strong> 90-95% round-trip efficiency with lithium technology</li>
              <li className="pl-1"><strong>EV charging:</strong> Mode 3 (7-22kW) standard for dedicated installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Self-consumption:</strong> Maximising on-site use of generated power</li>
              <li className="pl-1"><strong>Peak shaving:</strong> Reducing maximum demand charges</li>
              <li className="pl-1"><strong>Grid services:</strong> Frequency response and demand flexibility</li>
              <li className="pl-1"><strong>Resilience:</strong> Backup power and islanding capability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design and specify solar PV systems for commercial buildings",
              "Apply G98/G99 requirements for embedded generation connections",
              "Size and integrate battery energy storage systems (BESS)",
              "Design EV charging infrastructure compliant with regulations",
              "Understand smart grid integration and demand response",
              "Evaluate microgrid configurations and islanding requirements"
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

        {/* Section 1: Solar PV Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <Sun className="h-5 w-5 text-elec-yellow/70" />
            Solar PV Systems and Grid Connection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar photovoltaic systems convert sunlight directly into electricity. For building services
              engineers, understanding system design, performance prediction and grid integration is essential
              for both new installations and retrofits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key PV System Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PV modules:</strong> Monocrystalline (20-22% efficiency), polycrystalline (15-17%), thin-film (10-12%)</li>
                <li className="pl-1"><strong>Inverters:</strong> String inverters, microinverters, or power optimisers with central inverter</li>
                <li className="pl-1"><strong>Mounting systems:</strong> Roof-mounted (pitched/flat), building-integrated (BIPV), ground-mounted</li>
                <li className="pl-1"><strong>AC distribution:</strong> Connection point, metering, protection and isolation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK PV Performance Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical UK Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specific yield</td>
                      <td className="border border-white/10 px-3 py-2">850-1000 kWh/kWp/year</td>
                      <td className="border border-white/10 px-3 py-2">South-facing, unshaded, optimal tilt</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Performance ratio</td>
                      <td className="border border-white/10 px-3 py-2">0.75-0.85</td>
                      <td className="border border-white/10 px-3 py-2">Actual vs theoretical output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Optimal orientation</td>
                      <td className="border border-white/10 px-3 py-2">South ±30°</td>
                      <td className="border border-white/10 px-3 py-2">East/West reduces yield by ~15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Optimal tilt angle</td>
                      <td className="border border-white/10 px-3 py-2">30-40°</td>
                      <td className="border border-white/10 px-3 py-2">Lower for self-consumption focus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Area per kWp</td>
                      <td className="border border-white/10 px-3 py-2">5-7 m²</td>
                      <td className="border border-white/10 px-3 py-2">Depends on module efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Degradation</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.7% per year</td>
                      <td className="border border-white/10 px-3 py-2">Typically 80% output at 25 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PV System Sizing Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Requirement:</strong> 50,000 kWh annual consumption, target 30% solar</p>
                <p className="mt-2">Target generation = 50,000 × 0.30 = 15,000 kWh/year</p>
                <p>Specific yield (South England) = 950 kWh/kWp/year</p>
                <p>System size = 15,000 / 950 = <strong>15.8 kWp</strong></p>
                <p>Roof area required = 15.8 × 6 m²/kWp = <strong>~95 m²</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Oversizing PV relative to inverter capacity (DC/AC ratio of 1.1-1.3)
              can improve economics by capturing more energy during shoulder periods while clipping only peak output.
            </p>
          </div>
        </section>

        {/* Section 2: G98/G99 Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            G98/G99 Requirements for Embedded Generation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Engineering Recommendation G98 and G99 are the UK standards governing the connection of
              generation equipment to distribution networks. Compliance is mandatory for all grid-connected
              renewable and storage systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G98 vs G99 Application Thresholds</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">G98</td>
                      <td className="border border-white/10 px-3 py-2">≤16kW per phase (≤50kW 3-phase)</td>
                      <td className="border border-white/10 px-3 py-2">Notification only</td>
                      <td className="border border-white/10 px-3 py-2">Within 28 days of commissioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">G99</td>
                      <td className="border border-white/10 px-3 py-2">&gt;16kW per phase (or &gt;50kW 3-phase)</td>
                      <td className="border border-white/10 px-3 py-2">Full application and approval</td>
                      <td className="border border-white/10 px-3 py-2">45-90 working days typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Protection Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Loss of Mains (LoM):</strong> Must disconnect within 0.5s of mains loss</li>
                <li className="pl-1"><strong>Under/over voltage:</strong> Disconnect if V &lt;184V or V &gt;262V (single-phase)</li>
                <li className="pl-1"><strong>Under/over frequency:</strong> Disconnect if f &lt;47.5Hz or f &gt;52Hz</li>
                <li className="pl-1"><strong>Rate of Change of Frequency (RoCoF):</strong> Trip at &gt;1Hz/s</li>
                <li className="pl-1"><strong>Anti-islanding:</strong> Prevent energising isolated network sections</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">G98 Notification Contents</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Installation address and MPAN</li>
                  <li className="pl-1">Generator type and capacity (kW)</li>
                  <li className="pl-1">Inverter make, model and G98 certificate</li>
                  <li className="pl-1">Installer details and certification</li>
                  <li className="pl-1">Commissioning date</li>
                  <li className="pl-1">Export meter details (if fitted)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">G99 Application Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Formal application to DNO</li>
                  <li className="pl-1">Single line diagram</li>
                  <li className="pl-1">Protection settings schedule</li>
                  <li className="pl-1">Witness testing may be required</li>
                  <li className="pl-1">Connection agreement before energisation</li>
                  <li className="pl-1">Potential network reinforcement costs</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> All grid-connected inverters must carry valid G98 or G99 type test certificates
              from an accredited laboratory. Check the ENA Type Test Register for approved equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Battery Energy Storage Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <Battery className="h-5 w-5 text-elec-yellow/70" />
            Battery Energy Storage Systems (BESS)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery storage enables time-shifting of energy use, peak demand reduction, and grid services
              participation. Understanding battery technologies, sizing methodology and integration options
              is essential for modern building services design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cycle Life</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lithium Iron Phosphate (LFP)</td>
                      <td className="border border-white/10 px-3 py-2">92-96%</td>
                      <td className="border border-white/10 px-3 py-2">6000+</td>
                      <td className="border border-white/10 px-3 py-2">Commercial, grid-scale (safety focus)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lithium NMC</td>
                      <td className="border border-white/10 px-3 py-2">90-95%</td>
                      <td className="border border-white/10 px-3 py-2">3000-5000</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, commercial (energy density)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lead-acid (VRLA)</td>
                      <td className="border border-white/10 px-3 py-2">80-85%</td>
                      <td className="border border-white/10 px-3 py-2">500-1500</td>
                      <td className="border border-white/10 px-3 py-2">UPS, backup power (cost-sensitive)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flow batteries</td>
                      <td className="border border-white/10 px-3 py-2">70-80%</td>
                      <td className="border border-white/10 px-3 py-2">10000+</td>
                      <td className="border border-white/10 px-3 py-2">Large-scale, long duration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BESS Sizing Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy capacity (kWh):</strong> Total storage available</li>
                <li className="pl-1"><strong>Power rating (kW):</strong> Maximum charge/discharge rate</li>
                <li className="pl-1"><strong>C-rate:</strong> Power/Energy ratio (1C = full charge in 1 hour)</li>
                <li className="pl-1"><strong>Depth of Discharge (DoD):</strong> Usable capacity (typically 80-95% for lithium)</li>
                <li className="pl-1"><strong>Round-trip efficiency:</strong> Energy out vs energy in</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BESS Sizing Example: Peak Shaving</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Requirement:</strong> Reduce 150kW peak demand to 100kW for 2 hours</p>
                <p className="mt-2">Peak reduction required = 150 - 100 = 50kW</p>
                <p>Duration = 2 hours</p>
                <p>Usable energy required = 50kW × 2h = 100kWh</p>
                <p>At 90% DoD: Battery capacity = 100 / 0.9 = <strong>111kWh</strong></p>
                <p>Power rating needed = 50kW minimum</p>
                <p className="mt-2 text-white/60">→ Select 120kWh, 60kW battery system (0.5C rating)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC-Coupled Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Battery has dedicated inverter</li>
                  <li className="pl-1">Connects to AC distribution board</li>
                  <li className="pl-1">Can retrofit to existing PV</li>
                  <li className="pl-1">Independent of PV inverter brand</li>
                  <li className="pl-1">Slightly lower efficiency (double conversion)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC-Coupled Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Battery connects to DC bus</li>
                  <li className="pl-1">Shares inverter with PV (hybrid)</li>
                  <li className="pl-1">Higher efficiency (single conversion)</li>
                  <li className="pl-1">Requires compatible equipment</li>
                  <li className="pl-1">Better for new installations</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> BESS installations must comply with fire safety requirements including
              IEC 62619 (safety requirements) and consider thermal runaway protection, ventilation, and fire suppression
              systems for commercial installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Hybrid Systems and Load Matching */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Hybrid Systems and Load Matching
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hybrid systems combine multiple generation and storage technologies to optimise energy use,
              maximise self-consumption and provide resilience. Effective load matching algorithms balance
              generation, storage and grid interaction in real-time.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Self-Consumption Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct consumption:</strong> Use PV generation immediately when available</li>
                <li className="pl-1"><strong>Time-shifting:</strong> Store excess PV for evening/night use</li>
                <li className="pl-1"><strong>Load scheduling:</strong> Run high-demand loads during peak generation</li>
                <li className="pl-1"><strong>Export limitation:</strong> Prevent grid export to maximise on-site use</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Self-Consumption Rates</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Self-Consumption</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PV only (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">Depends on occupancy patterns</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PV + battery (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">Battery sized at ~1kWh/kWp</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PV only (commercial)</td>
                      <td className="border border-white/10 px-3 py-2">40-70%</td>
                      <td className="border border-white/10 px-3 py-2">Daytime operation matches generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PV + battery (commercial)</td>
                      <td className="border border-white/10 px-3 py-2">70-90%</td>
                      <td className="border border-white/10 px-3 py-2">Peak shaving and evening use</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Management System (EMS) Functions</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Generation Management</p>
                  <ul className="space-y-0.5 list-disc list-outside ml-5">
                    <li>PV output monitoring and forecasting</li>
                    <li>Inverter power limiting</li>
                    <li>Export management</li>
                    <li>Grid code compliance</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Storage Control</p>
                  <ul className="space-y-0.5 list-disc list-outside ml-5">
                    <li>Charge/discharge scheduling</li>
                    <li>State of charge management</li>
                    <li>Grid services participation</li>
                    <li>Tariff optimisation</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Optimisation:</strong> Modern EMS uses machine learning to predict generation and consumption,
              enabling proactive battery management and optimal grid interaction timing.
            </p>
          </div>
        </section>

        {/* Section 5: EV Charging Infrastructure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <Car className="h-5 w-5 text-elec-yellow/70" />
            EV Charging Infrastructure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicle charging is a rapidly growing load category in building services. Understanding
              charging modes, infrastructure requirements and smart charging capabilities is essential for
              futureproof installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Modes (IEC 61851)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 2</td>
                      <td className="border border-white/10 px-3 py-2">2.3kW (10A max)</td>
                      <td className="border border-white/10 px-3 py-2">Standard socket + ICCB</td>
                      <td className="border border-white/10 px-3 py-2">Emergency/occasional use only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 3 (single-phase)</td>
                      <td className="border border-white/10 px-3 py-2">3.6-7.4kW</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated EVSE (Type 2)</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, workplace</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 3 (three-phase)</td>
                      <td className="border border-white/10 px-3 py-2">11-22kW</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated EVSE (Type 2)</td>
                      <td className="border border-white/10 px-3 py-2">Commercial, fleet depots</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 4 (DC rapid)</td>
                      <td className="border border-white/10 px-3 py-2">50-350kW</td>
                      <td className="border border-white/10 px-3 py-2">DC fast charger (CCS/CHAdeMO)</td>
                      <td className="border border-white/10 px-3 py-2">Public rapid charging, fleet hubs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Regulatory Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Building Regulations Part S:</strong> New buildings must have EV charging provision</li>
                <li className="pl-1"><strong>EV Smart Charge Regulations 2021:</strong> Domestic chargers must have smart functionality</li>
                <li className="pl-1"><strong>BS 7671 Section 722:</strong> Specific requirements for EV charging installations</li>
                <li className="pl-1"><strong>OZEV Grant (EVHS):</strong> Requirements for grant-eligible domestic installations</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charger Circuit Design</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>7.4kW Charger (32A single-phase):</strong></p>
                <p>Current: I = 7400 / 230 = 32.2A</p>
                <p>Cable: 6mm² minimum (Iz = 46A in conduit)</p>
                <p>Protection: 32A Type A RCD + MCB (or RCBO)</p>
                <p>Voltage drop (20m): 32 × 40 × 3.08mΩ/m = 3.9V (1.7%)</p>
                <p className="mt-2"><strong>22kW Charger (32A three-phase):</strong></p>
                <p>Cable: 4mm² minimum per phase</p>
                <p>Protection: 32A Type B RCD (for DC fault detection)</p>
                <p>Connection: 5-core SWA or individual cores in conduit</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Charging Features</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Time-of-use tariff scheduling</li>
                  <li className="pl-1">Solar/battery integration</li>
                  <li className="pl-1">Load balancing (multiple EVs)</li>
                  <li className="pl-1">Demand response capability</li>
                  <li className="pl-1">User authentication and billing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Management Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Static:</strong> Fixed current limit per charger</li>
                  <li className="pl-1"><strong>Dynamic:</strong> Real-time load sharing</li>
                  <li className="pl-1"><strong>Scheduled:</strong> Time-based priority</li>
                  <li className="pl-1"><strong>Solar-matched:</strong> Track PV availability</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Diversity:</strong> BS 7671 Appendix 15 provides diversity factors for EV charging -
              typically 0.6-0.8 for multiple domestic chargers, enabling significant supply capacity savings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Smart Grid Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <Network className="h-5 w-5 text-elec-yellow/70" />
            Smart Grid Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart grid integration enables buildings to participate in grid services, responding to
              price signals and grid operator requests. This creates revenue opportunities while
              supporting grid stability as renewable penetration increases.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Grid Services and Flexibility Markets</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency response:</strong> Automatic power adjustment to maintain 50Hz</li>
                <li className="pl-1"><strong>Demand Side Response (DSR):</strong> Reducing load on request during peak periods</li>
                <li className="pl-1"><strong>Capacity Market:</strong> Guaranteed availability payments for reliable capacity</li>
                <li className="pl-1"><strong>Balancing Mechanism:</strong> Real-time trading with National Grid ESO</li>
                <li className="pl-1"><strong>Local flexibility:</strong> DNO constraint management services</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand Response Capability by Asset</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Asset</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Response Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery storage</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1 second</td>
                      <td className="border border-white/10 px-3 py-2">Minutes to hours</td>
                      <td className="border border-white/10 px-3 py-2">Frequency response, DSR, arbitrage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EV charging</td>
                      <td className="border border-white/10 px-3 py-2">Seconds</td>
                      <td className="border border-white/10 px-3 py-2">Hours</td>
                      <td className="border border-white/10 px-3 py-2">DSR, V2G services</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC systems</td>
                      <td className="border border-white/10 px-3 py-2">Minutes</td>
                      <td className="border border-white/10 px-3 py-2">15min-2hr</td>
                      <td className="border border-white/10 px-3 py-2">DSR (thermal mass provides buffer)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Instant</td>
                      <td className="border border-white/10 px-3 py-2">Minutes</td>
                      <td className="border border-white/10 px-3 py-2">Limited DSR (dimming)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Grid Operator Interface</p>
                  <ul className="space-y-0.5 list-disc list-outside ml-5">
                    <li>DNP3 - Distribution network protocol</li>
                    <li>IEC 61850 - Substation automation</li>
                    <li>OpenADR - Automated demand response</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Building/Device Level</p>
                  <ul className="space-y-0.5 list-disc list-outside ml-5">
                    <li>Modbus TCP - Equipment control</li>
                    <li>OCPP - EV charger management</li>
                    <li>SunSpec - Solar/storage monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Revenue potential:</strong> A 100kW/200kWh commercial BESS participating in frequency
              response can generate £15,000-30,000 annually from grid services, in addition to peak shaving savings.
            </p>
          </div>
        </section>

        {/* Section 7: Microgrids and Islanding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            <Building2 className="h-5 w-5 text-elec-yellow/70" />
            Microgrids and Islanding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Microgrids are localised energy systems capable of operating independently from the main grid.
              They combine generation, storage and loads with intelligent control to provide resilience,
              optimise energy use and enable community-scale renewable integration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Microgrid Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Distributed generation:</strong> PV, wind, CHP, fuel cells</li>
                <li className="pl-1"><strong>Energy storage:</strong> Batteries, thermal storage, flywheels</li>
                <li className="pl-1"><strong>Controllable loads:</strong> HVAC, water heating, EV charging</li>
                <li className="pl-1"><strong>Point of Common Coupling (PCC):</strong> Grid connection point</li>
                <li className="pl-1"><strong>Microgrid controller:</strong> Central intelligence for optimisation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Islanding Modes and Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Grid-connected</td>
                      <td className="border border-white/10 px-3 py-2">Normal operation, grid provides reference</td>
                      <td className="border border-white/10 px-3 py-2">Standard G98/G99 compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intentional island</td>
                      <td className="border border-white/10 px-3 py-2">Planned disconnection (maintenance)</td>
                      <td className="border border-white/10 px-3 py-2">Transfer switching, load shedding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Unplanned island</td>
                      <td className="border border-white/10 px-3 py-2">Grid failure, automatic transition</td>
                      <td className="border border-white/10 px-3 py-2">Black-start capability, fast transfer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resynchronisation</td>
                      <td className="border border-white/10 px-3 py-2">Reconnection to grid</td>
                      <td className="border border-white/10 px-3 py-2">Synchronisation check relay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Section 551 Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Switching arrangements must prevent paralleling of incompatible sources</li>
                <li className="pl-1">Automatic changeover devices must be type-tested for the application</li>
                <li className="pl-1">Earth fault loop impedance must be verified for each source configuration</li>
                <li className="pl-1">Standby supply ratings must be adequate for connected loads</li>
                <li className="pl-1">Labels required at all switch positions and supply points</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Islanding Protection Scheme</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Anti-islanding (standard G98/G99):</strong></p>
                <p>Under/over voltage: 184V-262V (0.5s trip)</p>
                <p>Under/over frequency: 47.5Hz-52Hz (0.5s trip)</p>
                <p>RoCoF: 1Hz/s (0.5s trip)</p>
                <p className="mt-2"><strong>Controlled islanding (microgrid):</strong></p>
                <p>Transfer switch: &lt;20ms for critical loads</p>
                <p>Load shedding: Non-essential loads disconnected</p>
                <p>Grid-forming inverter: Provides voltage/frequency reference</p>
                <p>Sync check: ±5° phase, ±0.5Hz, ±5% voltage</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Islanding capability requires specific agreement with the DNO and
              additional protection equipment. Standard grid-tied inverters cannot provide islanding functionality.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 8: Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Applications</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PV System Design Process</h3>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Site assessment:</strong> Roof area, orientation, shading analysis</li>
                <li className="pl-1"><strong>Load analysis:</strong> Annual consumption, demand profile, tariff structure</li>
                <li className="pl-1"><strong>System sizing:</strong> Match generation to consumption or export limits</li>
                <li className="pl-1"><strong>Equipment selection:</strong> Modules, inverters, mounting system</li>
                <li className="pl-1"><strong>Electrical design:</strong> String configuration, cable sizing, protection</li>
                <li className="pl-1"><strong>Grid connection:</strong> G98/G99 application, metering arrangements</li>
                <li className="pl-1"><strong>Commissioning:</strong> Testing, documentation, DNO notification</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BESS Sizing Methodology</h3>
              <div className="text-sm text-white space-y-2">
                <p><strong>Step 1 - Define objectives:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-0.5">
                  <li>Self-consumption maximisation</li>
                  <li>Peak demand reduction (kW target)</li>
                  <li>Backup duration requirements</li>
                  <li>Grid services participation</li>
                </ul>
                <p className="mt-2"><strong>Step 2 - Analyse load profile:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-0.5">
                  <li>Half-hourly consumption data (minimum 12 months)</li>
                  <li>Peak demand timing and duration</li>
                  <li>PV generation profile (if applicable)</li>
                </ul>
                <p className="mt-2"><strong>Step 3 - Size capacity:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-0.5">
                  <li>Energy (kWh) = Peak reduction × Duration × Safety factor</li>
                  <li>Power (kW) = Maximum charge/discharge requirement</li>
                  <li>Apply DoD factor (typically 0.85-0.95)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charger Installation Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Pre-Installation</p>
                  <ul className="space-y-0.5 list-disc list-outside ml-5">
                    <li>Supply capacity assessment</li>
                    <li>DNO notification (if required)</li>
                    <li>Building Regulations notification</li>
                    <li>Planning permission check</li>
                    <li>Grant eligibility (OZEV)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Installation</p>
                  <ul className="space-y-0.5 list-disc list-outside ml-5">
                    <li>Dedicated circuit from consumer unit</li>
                    <li>Type A RCD (or Type B for 3-phase)</li>
                    <li>Correct cable sizing for route</li>
                    <li>Earthing arrangements (PME/TT)</li>
                    <li>Smart functionality configuration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Commercial PV + Storage System</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Office building, 100,000 kWh annual consumption, 150kW peak demand,
                aiming for 40% renewable supply with peak shaving.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>PV Sizing:</strong></p>
                <p>Target generation = 100,000 × 0.40 = 40,000 kWh/year</p>
                <p>At 900 kWh/kWp: System size = 40,000 / 900 = <strong>44.4 kWp</strong></p>
                <p>Roof area = 45 × 6 = <strong>270 m²</strong></p>
                <p className="mt-2"><strong>Battery Sizing (peak shaving to 100kW for 2 hours):</strong></p>
                <p>Peak reduction = 150 - 100 = 50kW</p>
                <p>Energy required = 50 × 2 = 100kWh</p>
                <p>At 90% DoD: Capacity = 100 / 0.9 = <strong>111 kWh</strong></p>
                <p>Select: <strong>50kWp PV + 120kWh/60kW BESS</strong></p>
                <p className="mt-2 text-white/60">→ G99 application required (50kW exceeds G98 limit)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Multi-EV Charger Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Car park with 10 × 7.4kW chargers, 100A three-phase supply available.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Maximum demand calculation:</strong></p>
                <p>Full load = 10 × 7.4kW = 74kW</p>
                <p>Current at 400V 3-phase = 74,000 / (√3 × 400) = 107A</p>
                <p className="text-red-400">Exceeds 100A supply</p>
                <p className="mt-2"><strong>With diversity (BS 7671 App 15, factor 0.7):</strong></p>
                <p>Diversified load = 74 × 0.7 = 51.8kW</p>
                <p>Current = 51,800 / (√3 × 400) = 75A</p>
                <p className="text-green-400">✓ Within 100A supply</p>
                <p className="mt-2"><strong>Dynamic load management alternative:</strong></p>
                <p>Available capacity = 100A × √3 × 400 = 69.3kW</p>
                <p>Per charger limit = 69.3 / 10 = 6.9kW each</p>
                <p className="text-white/60">→ Implement dynamic load sharing for full charging when fewer EVs connected</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Self-Consumption Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Domestic 4kWp PV, considering 10kWh battery addition.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Without battery:</strong></p>
                <p>Annual generation = 4 × 900 = 3,600 kWh</p>
                <p>Self-consumption rate = 35%</p>
                <p>Self-consumed = 3,600 × 0.35 = 1,260 kWh</p>
                <p>Exported = 3,600 - 1,260 = 2,340 kWh</p>
                <p className="mt-2"><strong>With 10kWh battery:</strong></p>
                <p>Self-consumption rate = 75%</p>
                <p>Self-consumed = 3,600 × 0.75 = 2,700 kWh</p>
                <p>Additional self-consumption = 2,700 - 1,260 = <strong>1,440 kWh/year</strong></p>
                <p className="mt-2"><strong>Financial benefit (import 30p, export 15p):</strong></p>
                <p>Without battery: Import cost saving = 1,260 × £0.30 = £378</p>
                <p>Export income = 2,340 × £0.15 = £351</p>
                <p>With battery: Import cost saving = 2,700 × £0.30 = £810</p>
                <p>Export income = 900 × £0.15 = £135</p>
                <p>Additional annual benefit = (£810 + £135) - (£378 + £351) = <strong>£216/year</strong></p>
              </div>
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
                <p className="font-medium text-white mb-1">Grid Connection</p>
                <ul className="space-y-0.5">
                  <li>G98: ≤16kW/phase, notification only</li>
                  <li>G99: &gt;16kW/phase, formal application</li>
                  <li>LoM protection: 47.5-52Hz, RoCoF 1Hz/s</li>
                  <li>Voltage limits: 184V-262V (single-phase)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Performance</p>
                <ul className="space-y-0.5">
                  <li>UK PV yield: 850-1000 kWh/kWp/year</li>
                  <li>Battery efficiency: 90-95% round-trip</li>
                  <li>EV Mode 3: 7.4kW (1-phase), 22kW (3-phase)</li>
                  <li>Self-consumption: 25-40% (PV only), 60-80% (+ battery)</li>
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
            <Link to="../h-n-c-module3-section6-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: BS 7671, CIBSE and Part L
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3">
              Back to Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section6_7;
