import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Metering - HNC Module 7 Section 5.4";
const DESCRIPTION = "Master energy metering systems for building services: meter types, accuracy classes per IEC 62053, CT connections, Modbus/BACnet communications, AMR systems, and sub-metering strategies per CIBSE TM39.";

const quickCheckQuestions = [
  {
    id: "meter-accuracy-class",
    question: "What accuracy class is required for billing meters under IEC 62053?",
    options: ["Class 2.0 or better", "Class 1.0 or better", "Class 0.5S or better", "Class 0.2S only"],
    correctIndex: 1,
    explanation: "Billing meters typically require Class 1.0 accuracy or better under IEC 62053-21 for active energy measurement. Class 0.5S or Class 0.2S are used for higher accuracy requirements such as revenue-grade metering at utility interfaces."
  },
  {
    id: "ct-burden",
    question: "What happens if a CT circuit is operated with an open secondary?",
    options: ["The meter reads zero", "Dangerous high voltages develop across the secondary", "The CT demagnetises safely", "Current flows through an internal bypass"],
    correctIndex: 1,
    explanation: "Operating a CT with an open secondary is extremely dangerous. The CT attempts to maintain the magnetising current, resulting in very high voltages (potentially thousands of volts) developing across the open terminals, risking insulation breakdown and arcing."
  },
  {
    id: "modbus-protocol",
    question: "In Modbus RTU communication, what is the maximum cable length for RS-485?",
    options: ["100 metres", "500 metres", "1,200 metres", "2,400 metres"],
    correctIndex: 2,
    explanation: "RS-485, commonly used for Modbus RTU, supports cable lengths up to 1,200 metres (4,000 feet) at standard baud rates. However, at higher baud rates the practical distance reduces. For longer distances, repeaters or fibre-optic converters are required."
  },
  {
    id: "sub-metering-strategy",
    question: "According to CIBSE TM39, what percentage of total building energy should be sub-metered?",
    options: ["At least 50%", "At least 70%", "At least 90%", "100% mandatory"],
    correctIndex: 2,
    explanation: "CIBSE TM39 recommends that sub-metering should capture at least 90% of the anticipated energy consumption to enable effective monitoring and targeting. This typically requires metering of all major loads and end-uses."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which meter type provides measurement of active power, reactive power, power factor, and harmonics in a single device?",
    options: [
      "Basic kWh meter",
      "Multi-function power meter",
      "Maximum demand indicator",
      "Power factor correction meter"
    ],
    correctAnswer: 1,
    explanation: "Multi-function power meters (MFMs) provide comprehensive measurement including active/reactive power, voltage, current, power factor, frequency, harmonics (THD), and energy in both directions, making them ideal for detailed energy analysis."
  },
  {
    id: 2,
    question: "Under IEC 62053-21, what is the accuracy class designation for active energy meters with 1% error at rated current?",
    options: ["Class 0.5", "Class 1.0", "Class 2.0", "Class 0.2"],
    correctAnswer: 1,
    explanation: "Class 1.0 indicates the meter has a maximum permissible error of ±1% at rated current (In) and rated voltage. The class number directly corresponds to the percentage error limit at reference conditions."
  },
  {
    id: 3,
    question: "When installing CTs for energy metering, the primary current rating should be selected such that normal operating current is approximately:",
    options: ["25% of CT rating", "50-60% of CT rating", "100% of CT rating", "120% of CT rating"],
    correctAnswer: 1,
    explanation: "CTs should be selected so normal operating current is 50-60% of the rated primary current. This ensures good accuracy (CTs are most accurate around 50-120% of rating) whilst allowing headroom for load growth and peak demands."
  },
  {
    id: 4,
    question: "What is the standard secondary current output for measurement CTs in the UK?",
    options: ["1A", "5A", "Both 1A and 5A are standard", "10A"],
    correctAnswer: 2,
    explanation: "Both 1A and 5A secondary outputs are standard for measurement CTs. 1A secondaries are preferred for longer cable runs as they reduce VA burden and voltage drop. 5A is more common in legacy installations and where meters are close to CTs."
  },
  {
    id: 5,
    question: "In a Modbus RTU network, what determines the end of a message frame?",
    options: [
      "A specific end-of-frame character",
      "A silence period of 3.5 character times",
      "A CRC checksum verification",
      "A fixed message length"
    ],
    correctAnswer: 1,
    explanation: "Modbus RTU uses timing to determine frame boundaries. A silence of 3.5 character times (approximately 4ms at 9600 baud) indicates the end of a frame. This timing-based approach requires continuous communication without gaps within a message."
  },
  {
    id: 6,
    question: "BACnet MS/TP communication operates over which physical layer?",
    options: ["RS-232", "RS-485", "Ethernet", "Fibre optic"],
    correctAnswer: 1,
    explanation: "BACnet MS/TP (Master-Slave/Token-Passing) operates over RS-485. It uses a token-passing protocol where devices take turns to communicate, supporting up to 127 devices on a single network segment with cable lengths up to 1,200m."
  },
  {
    id: 7,
    question: "An AMR (Automatic Meter Reading) system typically transmits data using:",
    options: [
      "Manual reading only",
      "Fixed communication networks (wired or wireless)",
      "Postal services",
      "Verbal communication"
    ],
    correctAnswer: 1,
    explanation: "AMR systems use fixed communication networks to automatically collect meter data. These include wired solutions (power line carrier, dedicated cables) and wireless technologies (radio frequency, cellular, WiFi) to transmit readings to central systems."
  },
  {
    id: 8,
    question: "According to CIBSE TM39, which loads should have dedicated sub-meters in a commercial building?",
    options: [
      "Only HVAC systems",
      "Only lighting systems",
      "Tenants, HVAC, lighting, small power, and specialist loads",
      "Only loads greater than 100 kW"
    ],
    correctAnswer: 2,
    explanation: "CIBSE TM39 recommends sub-metering tenant areas, HVAC (heating, cooling, ventilation), lighting, small power, lifts, and specialist loads (data centres, kitchens). This enables accurate allocation of energy use and identification of waste."
  },
  {
    id: 9,
    question: "What CT accuracy class is typically required for revenue metering applications?",
    options: ["Class 3", "Class 1", "Class 0.5 or Class 0.2S", "Class 5"],
    correctAnswer: 2,
    explanation: "Revenue metering at utility interfaces typically requires CT accuracy of Class 0.5 or better (often Class 0.2S for high-value metering points). This minimises measurement errors that would affect billing accuracy over large energy volumes."
  },
  {
    id: 10,
    question: "The VA burden of a CT refers to:",
    options: [
      "The maximum voltage the CT can withstand",
      "The load capacity of the secondary circuit",
      "The power rating of the primary conductor",
      "The short-circuit rating of the CT"
    ],
    correctAnswer: 1,
    explanation: "VA burden is the maximum apparent power (in volt-amperes) that can be connected to the CT secondary whilst maintaining stated accuracy. It includes meter burden, cable losses, and connection resistances. Exceeding the rated burden causes measurement errors."
  },
  {
    id: 11,
    question: "In a 3-phase, 4-wire system, how many CTs are required for accurate energy metering?",
    options: ["One CT", "Two CTs", "Three CTs", "Four CTs"],
    correctAnswer: 2,
    explanation: "A 3-phase, 4-wire system requires three CTs (one per phase) to measure all line currents accurately. In a balanced 3-phase, 3-wire system, two CTs can be used (Aron connection), but 4-wire systems with neutral loads need all three phases metered."
  },
  {
    id: 12,
    question: "What is the primary advantage of pulse output metering over Modbus communication?",
    options: [
      "Higher accuracy",
      "More detailed data",
      "Simplicity and universal compatibility",
      "Faster data transmission"
    ],
    correctAnswer: 2,
    explanation: "Pulse output metering is simple and universally compatible with BMS and energy management systems. Each pulse represents a fixed energy increment (e.g., 1 pulse = 0.1 kWh). However, it only provides cumulative energy data, not instantaneous power or power quality parameters."
  }
];

const faqs = [
  {
    question: "What is the difference between Class 0.5S and Class 0.5 accuracy for CTs?",
    answer: "The 'S' designation indicates a 'Special' accuracy class with tighter error limits at low currents. Class 0.5S maintains ±0.5% accuracy from 1% to 120% of rated current, whereas Class 0.5 only guarantees this accuracy from 5% to 120%. Class 0.5S is essential for loads with high variation or where accurate measurement at low loads is critical for billing or monitoring purposes."
  },
  {
    question: "How do I calculate the correct CT ratio for a metering installation?",
    answer: "Select a CT primary rating slightly above the maximum expected current, ensuring normal load is 50-60% of this value. For a 250A circuit, a 300/5A or 400/5A CT would be appropriate depending on expected load profile. Always verify the CT burden rating exceeds the total connected burden (meter + cables + connections). For accuracy, use CTs rated to the same or higher accuracy class as the meter."
  },
  {
    question: "When should I use Modbus TCP/IP instead of Modbus RTU?",
    answer: "Use Modbus TCP/IP when meters connect to Ethernet networks, for longer distances (beyond 1,200m RS-485 limit), when faster polling is required, or when integrating with IT systems. Modbus RTU is preferred for simpler installations, where RS-485 infrastructure exists, or when cost is critical. TCP/IP offers easier network management but requires switches and proper IP addressing."
  },
  {
    question: "What sub-metering strategy does CIBSE TM39 recommend for multi-tenant buildings?",
    answer: "CIBSE TM39 recommends metering each tenant space separately, plus common areas, landlord services, and shared plant. Each tenant should have sub-meters for electricity (and gas if applicable). Shared services like HVAC should be metered centrally with consumption allocated by floor area, operating hours, or dedicated sub-metering. The goal is transparent, verifiable allocation of energy costs."
  },
  {
    question: "How do I verify CT polarity and phase sequence during commissioning?",
    answer: "CT polarity is verified by checking that the P1 (primary) terminal faces the supply and the S1 (secondary) terminal connects to the meter's current input terminal (often marked with a dot or 'k'). Phase sequence is verified using a phase rotation meter or by checking that meter readings show positive power flow under normal load conditions. Reversed CTs or incorrect phase connections cause negative readings or power factor errors."
  },
  {
    question: "What data retention periods are required for metered energy data?",
    answer: "UK regulations and best practice recommend retaining half-hourly metered data for at least 2 years for comparison and analysis. Building regulations and BREEAM may require 5+ years for compliance demonstration. For billing disputes, 6 years is advisable (UK limitation period). CIBSE TM39 recommends archiving at least 3 years of data for effective monitoring and targeting programmes."
  }
];

const HNCModule7Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
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
            <span>Module 7.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Metering
          </h1>
          <p className="text-white/80">
            Meter types, accuracy classes, CT connections, data communications, and sub-metering strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Meter types:</strong> kWh, multi-function, maximum demand</li>
              <li className="pl-1"><strong>Accuracy:</strong> IEC 62053 Class 1.0 for billing</li>
              <li className="pl-1"><strong>CT selection:</strong> 50-60% loading at normal current</li>
              <li className="pl-1"><strong>Communications:</strong> Modbus RTU/TCP, BACnet, pulse output</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE TM39:</strong> Sub-meter &gt;90% of consumption</li>
              <li className="pl-1"><strong>AMR systems:</strong> Automatic data collection</li>
              <li className="pl-1"><strong>BMS integration:</strong> Real-time monitoring</li>
              <li className="pl-1"><strong>M&amp;T:</strong> Monitoring and targeting programmes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Specify appropriate meter types for different applications",
              "Apply IEC 62053 accuracy class requirements",
              "Design CT installations with correct burden calculations",
              "Configure Modbus RTU and BACnet communications",
              "Implement AMR systems for automatic data collection",
              "Develop sub-metering strategies per CIBSE TM39 guidance"
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

        {/* Section 1: Meter Types and Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Meter Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy meters range from basic kWh accumulators to sophisticated multi-function power
              analysers. Selecting the appropriate meter type depends on the application requirements,
              accuracy needs, and integration with building management systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common meter types:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Basic kWh meters:</strong> Cumulative energy measurement only, pulse output</li>
                <li className="pl-1"><strong>Multi-function meters (MFM):</strong> V, I, kW, kVA, kVAr, PF, Hz, THD, kWh</li>
                <li className="pl-1"><strong>Maximum demand indicators:</strong> Record peak demand for tariff management</li>
                <li className="pl-1"><strong>Power quality analysers:</strong> Harmonics, flicker, sags, swells, transients</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Meter Selection by Application</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fiscal/billing</td>
                      <td className="border border-white/10 px-3 py-2">MID-approved kWh</td>
                      <td className="border border-white/10 px-3 py-2">Class 1.0, sealed, tamper-evident</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tenant sub-metering</td>
                      <td className="border border-white/10 px-3 py-2">Multi-function with comms</td>
                      <td className="border border-white/10 px-3 py-2">kWh, Modbus/pulse, DIN rail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Multi-function meter</td>
                      <td className="border border-white/10 px-3 py-2">Real-time V, I, kW, PF, harmonics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum demand tariff</td>
                      <td className="border border-white/10 px-3 py-2">MD indicator/recorder</td>
                      <td className="border border-white/10 px-3 py-2">Half-hourly data, peak recording</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power quality analysis</td>
                      <td className="border border-white/10 px-3 py-2">Power quality analyser</td>
                      <td className="border border-white/10 px-3 py-2">EN 50160 compliance, waveform capture</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Over-specify rather than under-specify meter capability - the cost difference is small compared to retrofit costs if additional parameters are needed later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Accuracy Classes and IEC 62053 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Accuracy Classes and IEC 62053
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Meter accuracy is governed by IEC 62053 standards, which define accuracy classes
              based on maximum permissible percentage errors at different load and power factor
              conditions. Proper accuracy specification ensures reliable energy data for billing
              and monitoring applications.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 62053-21</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Active energy (kWh)</li>
                  <li className="pl-1">Classes 0.5, 1, 2</li>
                  <li className="pl-1">Static meters</li>
                  <li className="pl-1">Direct or CT connected</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 62053-22</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Active energy (kWh)</li>
                  <li className="pl-1">Classes 0.2S, 0.5S</li>
                  <li className="pl-1">Revenue metering</li>
                  <li className="pl-1">Wide dynamic range</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 62053-23</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reactive energy (kVArh)</li>
                  <li className="pl-1">Classes 2, 3</li>
                  <li className="pl-1">Power factor penalty</li>
                  <li className="pl-1">Often combined with active</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accuracy Class Error Limits (IEC 62053-21)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Error at 100% In, PF=1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Error at 10% In, PF=1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 0.5</td>
                      <td className="border border-white/10 px-3 py-2">±0.5%</td>
                      <td className="border border-white/10 px-3 py-2">±1.0%</td>
                      <td className="border border-white/10 px-3 py-2">High-value sub-metering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 1.0</td>
                      <td className="border border-white/10 px-3 py-2">±1.0%</td>
                      <td className="border border-white/10 px-3 py-2">±1.5%</td>
                      <td className="border border-white/10 px-3 py-2">Commercial billing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 2.0</td>
                      <td className="border border-white/10 px-3 py-2">±2.0%</td>
                      <td className="border border-white/10 px-3 py-2">±2.5%</td>
                      <td className="border border-white/10 px-3 py-2">Monitoring only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 0.2S</td>
                      <td className="border border-white/10 px-3 py-2">±0.2%</td>
                      <td className="border border-white/10 px-3 py-2">±0.4%</td>
                      <td className="border border-white/10 px-3 py-2">Revenue/fiscal metering</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">MID (Measuring Instruments Directive)</p>
              <p className="text-sm text-white">
                For billing applications in the UK and EU, meters must be MID-approved (2014/32/EU). MID requires
                Class B accuracy (equivalent to IEC Class 1.0) minimum for active energy meters used in direct
                transactions. MID approval includes factory calibration, sealing, and traceable certification.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Specify Class 1.0 or better for all billing and cost allocation applications. The marginal cost of higher accuracy is minimal compared to potential billing disputes.
            </p>
          </div>
        </section>

        {/* Section 3: CT Connections and Installation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CT Connections and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current transformers (CTs) are essential for metering circuits carrying more than 100A direct
              connection capacity. Correct CT selection, installation, and wiring are critical for
              measurement accuracy and safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Safety Warning</p>
              <p className="text-sm text-white">
                <strong>Never open-circuit an energised CT secondary.</strong> This creates dangerous voltages
                (potentially thousands of volts) that can cause arcing, insulation failure, and serious injury.
                Always short-circuit CT secondaries before disconnecting meters, and use CT terminal blocks
                with shorting links for safe isolation.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Selection Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Primary current:</strong> Select so normal load is 50-60% of rating</li>
                <li className="pl-1"><strong>Secondary current:</strong> 1A for long runs (&gt;15m), 5A for short distances</li>
                <li className="pl-1"><strong>Accuracy class:</strong> Match or exceed meter accuracy requirement</li>
                <li className="pl-1"><strong>VA burden:</strong> Must exceed total connected burden</li>
                <li className="pl-1"><strong>Window size:</strong> Must accommodate conductor or busbar</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Burden Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Burden (VA)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meter current input</td>
                      <td className="border border-white/10 px-3 py-2">0.1 - 0.5 VA</td>
                      <td className="border border-white/10 px-3 py-2">Modern electronic meters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable (2.5mm², 10m)</td>
                      <td className="border border-white/10 px-3 py-2">0.7 VA (5A sec)</td>
                      <td className="border border-white/10 px-3 py-2">0.03 VA for 1A secondary</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connections</td>
                      <td className="border border-white/10 px-3 py-2">0.1 - 0.2 VA</td>
                      <td className="border border-white/10 px-3 py-2">Terminal blocks, crimps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total typical</td>
                      <td className="border border-white/10 px-3 py-2">1 - 2 VA</td>
                      <td className="border border-white/10 px-3 py-2">CT should be rated &gt;2.5 VA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Wiring Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">P1 (primary) faces incoming supply; P2 faces load</li>
                <li className="pl-1">S1 (secondary) connects to meter current input terminal</li>
                <li className="pl-1">S2 returns to CT, often via common/star point for 3-phase</li>
                <li className="pl-1">Use colour-coded or numbered conductors for each phase</li>
                <li className="pl-1">Provide CT shorting links at terminal block for safe isolation</li>
                <li className="pl-1">Earth the CT secondary circuit at one point only (star point)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Installation tip:</strong> Label all CT cables clearly at both ends. Phase identification errors cause incorrect readings and are difficult to diagnose after installation is complete.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Data Communications and Sub-Metering Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Data Communications and Sub-Metering Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern metering installations require robust data communications for integration with
              building management systems, energy management software, and automatic meter reading (AMR)
              infrastructure. CIBSE TM39 provides comprehensive guidance on sub-metering strategies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Physical Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Distance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus RTU</td>
                      <td className="border border-white/10 px-3 py-2">RS-485</td>
                      <td className="border border-white/10 px-3 py-2">1,200m</td>
                      <td className="border border-white/10 px-3 py-2">Local meter networks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus TCP</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet</td>
                      <td className="border border-white/10 px-3 py-2">100m per segment</td>
                      <td className="border border-white/10 px-3 py-2">IT network integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet MS/TP</td>
                      <td className="border border-white/10 px-3 py-2">RS-485</td>
                      <td className="border border-white/10 px-3 py-2">1,200m</td>
                      <td className="border border-white/10 px-3 py-2">BMS integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet IP</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet</td>
                      <td className="border border-white/10 px-3 py-2">Network dependent</td>
                      <td className="border border-white/10 px-3 py-2">Enterprise BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pulse output</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contact</td>
                      <td className="border border-white/10 px-3 py-2">500m typical</td>
                      <td className="border border-white/10 px-3 py-2">Simple BMS connection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">M-Bus</td>
                      <td className="border border-white/10 px-3 py-2">2-wire bus</td>
                      <td className="border border-white/10 px-3 py-2">1,000m</td>
                      <td className="border border-white/10 px-3 py-2">Multi-utility metering</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus RTU Configuration</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Unique address (1-247) per device</li>
                  <li className="pl-1">Standard: 9600 baud, 8N1</li>
                  <li className="pl-1">RS-485 termination at both ends</li>
                  <li className="pl-1">Maximum 32 devices per segment</li>
                  <li className="pl-1">Daisy-chain topology required</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AMR System Components</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Field devices (meters with comms)</li>
                  <li className="pl-1">Data concentrators/gateways</li>
                  <li className="pl-1">Communication networks (wired/wireless)</li>
                  <li className="pl-1">Head-end software (data collection)</li>
                  <li className="pl-1">Analysis and reporting platform</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">CIBSE TM39 Sub-Metering Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Coverage:</strong> Sub-meter at least 90% of anticipated consumption</li>
                <li className="pl-1"><strong>End uses:</strong> Separate HVAC, lighting, small power, lifts, specialist loads</li>
                <li className="pl-1"><strong>Tenants:</strong> Individual metering for each lettable area</li>
                <li className="pl-1"><strong>Major plant:</strong> Meter chillers, boilers, AHUs, pumps individually</li>
                <li className="pl-1"><strong>Verification:</strong> Sub-meter total should reconcile with fiscal meter (±5%)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering Hierarchy Example</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Level 1: Fiscal Meter</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Main incoming supply</li>
                    <li>MID-approved, utility interface</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Level 2: Distribution</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Main switchboard outgoings</li>
                    <li>Landlord vs tenant split</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Level 3: End Use</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>HVAC, lighting, small power</li>
                    <li>Per floor or zone</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Level 4: Equipment</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Individual chillers, AHUs</li>
                    <li>Server room, kitchen loads</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Data strategy:</strong> Collect half-hourly (or finer) interval data for detailed analysis. Daily totals are insufficient for effective monitoring and targeting programmes.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: CT Selection for Distribution Board</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select CTs for metering a 400A TP+N distribution board with typical load of 280A.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p className="ml-4">Nominal load = 280A</p>
                <p className="ml-4">Maximum load = 400A (circuit rating)</p>
                <p className="ml-4">Meter location = 20m from board</p>
                <p className="ml-4">Meter accuracy = Class 1.0</p>
                <p className="mt-2 text-white/60">CT Selection:</p>
                <p className="ml-4">Primary: 400/1A (280A = 70% loading) or 500/1A (56% loading)</p>
                <p className="ml-4">Choose 400/1A for better accuracy at normal load</p>
                <p className="ml-4">Secondary: 1A preferred for 20m cable run</p>
                <p className="ml-4">Accuracy: Class 0.5 (exceeds meter requirement)</p>
                <p className="mt-2 text-white/60">Burden calculation:</p>
                <p className="ml-4">Meter burden: 0.2 VA</p>
                <p className="ml-4">Cable (2.5mm², 40m loop): 0.3 VA at 1A</p>
                <p className="ml-4">Connections: 0.1 VA</p>
                <p className="ml-4">Total: 0.6 VA</p>
                <p className="mt-2 text-green-400">Select: 400/1A, Class 0.5, 2.5VA burden rating</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Modbus Network Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design Modbus RTU network for 24 meters across a commercial building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Requirements:</p>
                <p className="ml-4">24 meters across 4 floors</p>
                <p className="ml-4">Maximum cable run: 800m</p>
                <p className="ml-4">Polling interval: 15 seconds per meter</p>
                <p className="mt-2 text-white/60">Network design:</p>
                <p className="ml-4">Physical layer: RS-485 (supports 1,200m)</p>
                <p className="ml-4">Topology: Single daisy-chain from BMS room</p>
                <p className="ml-4">Cable: CAT5 or dedicated RS-485 shielded pair</p>
                <p className="ml-4">Termination: 120Ω at first and last device</p>
                <p className="mt-2 text-white/60">Addressing:</p>
                <p className="ml-4">Ground floor: Addresses 1-6</p>
                <p className="ml-4">First floor: Addresses 11-16</p>
                <p className="ml-4">Second floor: Addresses 21-26</p>
                <p className="ml-4">Third floor: Addresses 31-36</p>
                <p className="mt-2 text-white/60">Polling calculation:</p>
                <p className="ml-4">24 meters × 15 sec = 360 seconds (6 min cycle)</p>
                <p className="ml-4">Acceptable for M&T but consider faster baud for real-time</p>
                <p className="mt-2 text-green-400">Configure: 9600 baud, 8N1, addresses spaced for expansion</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Sub-Metering Strategy per CIBSE TM39</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop sub-metering schedule for a 10,000m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Building profile:</p>
                <p className="ml-4">Fiscal supply: 800 kVA</p>
                <p className="ml-4">5 tenants + landlord areas</p>
                <p className="ml-4">Central HVAC (chillers, AHUs, pumps)</p>
                <p className="mt-2 text-white/60">Sub-metering schedule:</p>
                <p className="mt-2">Level 2 - Distribution (6 meters):</p>
                <p className="ml-4">M01: Tenant A supply</p>
                <p className="ml-4">M02: Tenant B supply</p>
                <p className="ml-4">M03: Tenant C supply</p>
                <p className="ml-4">M04: Tenant D supply</p>
                <p className="ml-4">M05: Tenant E supply</p>
                <p className="ml-4">M06: Landlord central plant</p>
                <p className="mt-2">Level 3 - End use (10 meters):</p>
                <p className="ml-4">M07: Chiller 1</p>
                <p className="ml-4">M08: Chiller 2</p>
                <p className="ml-4">M09: AHU supply (all AHUs)</p>
                <p className="ml-4">M10: Pumps and auxiliaries</p>
                <p className="ml-4">M11: Common area lighting</p>
                <p className="ml-4">M12: Lifts</p>
                <p className="ml-4">M13: Car park</p>
                <p className="ml-4">M14: Server room</p>
                <p className="ml-4">M15: Kitchen/catering</p>
                <p className="ml-4">M16: External lighting</p>
                <p className="mt-2 text-white/60">Coverage check:</p>
                <p className="ml-4">Sub-metered: 780 kVA (97.5% of supply)</p>
                <p className="mt-2 text-green-400">Meets CIBSE TM39 &gt;90% coverage requirement</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Metering Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify CT ratio matches meter configuration</li>
                <li className="pl-1">Check CT polarity - P1 towards supply, S1 to meter input</li>
                <li className="pl-1">Confirm phase sequence and CT-to-voltage phase matching</li>
                <li className="pl-1">Install CT shorting links in terminal blocks</li>
                <li className="pl-1">Test communications before closing panels</li>
                <li className="pl-1">Record meter serial numbers and CT ratios</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">CT loading: <strong>50-60%</strong> at normal current</li>
                <li className="pl-1">Billing accuracy: <strong>Class 1.0</strong> minimum (IEC 62053-21)</li>
                <li className="pl-1">RS-485 maximum: <strong>1,200 metres</strong></li>
                <li className="pl-1">Sub-metering coverage: <strong>&gt;90%</strong> per CIBSE TM39</li>
                <li className="pl-1">CT secondary standard: <strong>1A or 5A</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Open-circuiting energised CTs</strong> - Dangerous high voltages result</li>
                <li className="pl-1"><strong>Reversed CT polarity</strong> - Causes negative readings or power factor errors</li>
                <li className="pl-1"><strong>Phase mismatch</strong> - Voltage phase must match CT phase</li>
                <li className="pl-1"><strong>Exceeded CT burden</strong> - Causes measurement errors</li>
                <li className="pl-1"><strong>No communications verification</strong> - Difficult to access after installation</li>
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
                <p className="font-medium text-white mb-1">Accuracy Classes (IEC 62053)</p>
                <ul className="space-y-0.5">
                  <li>Class 0.2S - Revenue/fiscal metering</li>
                  <li>Class 0.5 - High-accuracy sub-metering</li>
                  <li>Class 1.0 - Commercial billing</li>
                  <li>Class 2.0 - Monitoring only</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Communication Protocols</p>
                <ul className="space-y-0.5">
                  <li>Modbus RTU - RS-485, 1,200m max</li>
                  <li>Modbus TCP - Ethernet, network dependent</li>
                  <li>BACnet MS/TP - RS-485 for BMS</li>
                  <li>Pulse output - Simple, universal</li>
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
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5-5">
              Next: Section 5.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section5_4;
