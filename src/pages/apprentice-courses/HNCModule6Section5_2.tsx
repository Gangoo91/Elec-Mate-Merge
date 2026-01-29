import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Metering Strategies - HNC Module 6 Section 5.2";
const DESCRIPTION = "Master metering strategies for building services: main metering, sub-metering hierarchies, automatic meter reading (AMR), data loggers, CT metering, accuracy classes, and BMS integration per CIBSE TM39 guidance.";

const quickCheckQuestions = [
  {
    id: "metering-hierarchy",
    question: "What is a metering hierarchy in building services?",
    options: ["A list of meter manufacturers ranked by quality", "A structured arrangement of meters from main intake to sub-circuits for energy apportionment", "A maintenance schedule for meter calibration", "A database of utility tariff structures"],
    correctIndex: 1,
    explanation: "A metering hierarchy is a structured arrangement of meters at different levels (main, sub-main, circuit) that enables energy consumption to be measured, apportioned, and analysed across a building or facility."
  },
  {
    id: "sub-metering-purpose",
    question: "What is the primary purpose of sub-metering in commercial buildings?",
    options: ["To satisfy DNO requirements", "To provide backup if the main meter fails", "To apportion energy costs and identify consumption patterns by area or tenant", "To reduce the overall energy consumption automatically"],
    correctIndex: 2,
    explanation: "Sub-metering enables energy costs to be apportioned fairly between tenants or departments, identifies areas of high consumption, and supports energy management initiatives by providing granular consumption data."
  },
  {
    id: "amr-definition",
    question: "What does AMR (Automatic Meter Reading) provide?",
    options: ["Automatic energy bill payment", "Remote collection of meter data without manual reading", "Automatic adjustment of energy tariffs", "Remote control of electrical loads"],
    correctIndex: 1,
    explanation: "AMR systems automatically collect consumption data from meters and transfer it to a central database without the need for physical meter reading, enabling frequent data collection, billing accuracy, and energy analysis."
  },
  {
    id: "ct-metering",
    question: "When is CT (Current Transformer) metering typically required?",
    options: ["For single-phase domestic supplies only", "When current exceeds direct-connect meter ratings (typically above 100A)", "Only for emergency lighting circuits", "When measuring voltage rather than current"],
    correctIndex: 1,
    explanation: "CT metering is used when circuit currents exceed the direct connection capability of meters (typically above 100A). CTs step down the current to a measurable level (usually 5A secondary) whilst maintaining proportionality."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to CIBSE TM39, what percentage of total building energy should typically be captured by sub-metering?",
    options: [
      "At least 50%",
      "At least 70%",
      "At least 90%",
      "100% mandatory"
    ],
    correctAnswer: 2,
    explanation: "CIBSE TM39 recommends that sub-metering should capture at least 90% of total building energy consumption to enable effective energy management and identification of consumption patterns."
  },
  {
    id: 2,
    question: "In a typical metering hierarchy, Level 1 meters are:",
    options: ["Circuit-level meters measuring individual loads", "Sub-main meters at distribution board level", "Fiscal/main meters at the building intake", "BMS monitoring points only"],
    correctAnswer: 2,
    explanation: "Level 1 (or Tier 1) meters are the fiscal meters at the main building intake, measuring total energy imported from the grid. These are typically utility-owned meters used for billing purposes."
  },
  {
    id: 3,
    question: "What is the typical pulse output from an energy meter?",
    options: ["1 pulse per Wh", "1 pulse per 10 Wh", "1 pulse per kWh", "Variable depending on load"],
    correctAnswer: 2,
    explanation: "Standard energy meters typically output 1 pulse per kWh (or 1000 pulses per MWh). Some high-resolution meters may output 10 or 100 pulses per kWh for greater accuracy in monitoring applications."
  },
  {
    id: 4,
    question: "A Class 1 electricity meter has an accuracy of:",
    options: ["±0.2%", "±0.5%", "±1.0%", "±2.0%"],
    correctAnswer: 2,
    explanation: "Class 1 meters have an accuracy of ±1.0% under reference conditions. Class 0.5 achieves ±0.5%, Class 0.2 achieves ±0.2%. Higher accuracy classes are used for fiscal metering and high-value monitoring."
  },
  {
    id: 5,
    question: "What is the standard secondary current for CT metering installations?",
    options: ["1A", "5A", "10A", "100A"],
    correctAnswer: 1,
    explanation: "The standard secondary current for CTs is 5A, although 1A secondary CTs are sometimes used for long cable runs to reduce voltage drop and power losses in the secondary circuit."
  },
  {
    id: 6,
    question: "Which communication protocol is commonly used for AMR systems in commercial buildings?",
    options: ["DALI", "Modbus RTU/TCP", "DMX512", "1-Wire"],
    correctAnswer: 1,
    explanation: "Modbus RTU (serial) and Modbus TCP (Ethernet) are widely used protocols for AMR systems, enabling meters to communicate consumption data to BMS or dedicated energy monitoring systems."
  },
  {
    id: 7,
    question: "A data logger recording energy consumption every 15 minutes will generate how many readings per day?",
    options: ["24 readings", "48 readings", "96 readings", "144 readings"],
    correctAnswer: 2,
    explanation: "15-minute intervals result in 4 readings per hour × 24 hours = 96 readings per day. This is a common interval for half-hourly settlement metering and energy analysis."
  },
  {
    id: 8,
    question: "For sub-metering tenant spaces, which meter configuration is most appropriate?",
    options: ["Single-phase direct connect only", "Three-phase CT metering with MID approval", "Pulse counting from existing MCBs", "Power factor meters only"],
    correctAnswer: 1,
    explanation: "MID (Measuring Instruments Directive) approved three-phase CT meters are appropriate for tenant sub-metering as they provide the accuracy and legal traceability required for cost apportionment and potential recharging."
  },
  {
    id: 9,
    question: "What information does a multi-function energy meter typically provide beyond kWh?",
    options: ["Only voltage", "kWh, kVAh, kVArh, power factor, and demand", "Temperature only", "Only current measurements"],
    correctAnswer: 1,
    explanation: "Multi-function meters measure active energy (kWh), apparent energy (kVAh), reactive energy (kVArh), power factor, maximum demand, and often instantaneous voltage, current, and power values."
  },
  {
    id: 10,
    question: "The CT ratio for a 400A circuit using standard 5A secondary CTs would be:",
    options: ["400/1", "400/5", "80/1", "2000/5"],
    correctAnswer: 1,
    explanation: "For a 400A circuit with 5A secondary CTs, the ratio is 400/5 (or 80:1). The meter must be programmed with this ratio to correctly calculate the primary current and energy consumption."
  },
  {
    id: 11,
    question: "Which CIBSE document provides detailed guidance on energy metering strategies?",
    options: ["TM22", "TM39", "TM46", "TM52"],
    correctAnswer: 1,
    explanation: "CIBSE TM39 'Building Energy Metering' provides comprehensive guidance on metering strategies, hierarchy design, meter selection, and implementation for effective building energy management."
  },
  {
    id: 12,
    question: "When integrating meters with a BMS, what is the primary advantage of using a dedicated energy monitoring system versus direct BMS connection?",
    options: [
      "Lower installation cost",
      "Specialised analysis, reporting, and data storage capabilities",
      "Faster response time for load control",
      "Better compatibility with legacy equipment"
    ],
    correctAnswer: 1,
    explanation: "Dedicated energy monitoring systems provide specialised energy analysis, trend reporting, benchmarking, alarm management, and long-term data storage that general BMS systems may not offer to the same depth."
  }
];

const faqs = [
  {
    question: "What is the difference between fiscal metering and sub-metering?",
    answer: "Fiscal meters are utility-owned meters at the building intake used for billing purposes - they must meet strict accuracy and approval standards (MID). Sub-meters are typically building-owner installed meters downstream of the fiscal meter, used for internal cost apportionment, energy management, and identifying consumption patterns. Sub-meters can be MID approved if used for tenant recharging."
  },
  {
    question: "How do I size CTs for metering installations?",
    answer: "Size CTs based on the maximum expected current, typically 125% of the circuit's design current to allow for load growth. For a 400A circuit, use 500/5 CTs. Ensure the CT accuracy class matches the meter requirements (typically 0.5 or 1.0 for energy metering). The CT burden (VA rating) must exceed the meter's VA requirement plus cable losses in the secondary circuit."
  },
  {
    question: "What logging interval should I use for energy data?",
    answer: "Common intervals are: 15 minutes for detailed analysis and demand profiling, 30 minutes for half-hourly settlement compliance, 1 hour for general monitoring. Shorter intervals provide better resolution but increase data storage requirements. For identifying short-duration loads or power quality issues, 1-minute or faster intervals may be needed."
  },
  {
    question: "Can sub-meter readings be used for tenant billing?",
    answer: "Yes, but the meters should be MID approved (for legal traceability) and the metering arrangement should be documented in the lease agreement. Calibration certificates should be maintained. Some landlords use 'check metering' where sub-meters verify utility bills rather than directly billing tenants to avoid disputes."
  },
  {
    question: "How do I verify sub-meter accuracy against the main meter?",
    answer: "Sum all sub-meter readings and compare to the main meter over the same period. The difference (distribution losses plus unmetered loads) should typically be less than 5-10%. Large discrepancies indicate unmetered circuits, CT ratio errors, meter faults, or missing sub-meters. Regular reconciliation is essential for energy management credibility."
  },
  {
    question: "What is M-Bus and when should it be used?",
    answer: "M-Bus (Meter Bus) is a European standard protocol specifically designed for remote reading of utility meters. It uses a two-wire bus system and can connect up to 250 devices over distances up to 1km. M-Bus is commonly used for heat, water, and gas metering and is increasingly supported by electricity meters for integrated utility monitoring."
  }
];

const HNCModule6Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5">
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
            <span>Module 6.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Metering Strategies
          </h1>
          <p className="text-white/80">
            Main metering, sub-metering, automatic meter reading, data loggers, and metering hierarchies for building energy management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Metering hierarchy:</strong> Structured levels from main to sub-circuits</li>
              <li className="pl-1"><strong>Sub-metering:</strong> Enables cost apportionment and consumption analysis</li>
              <li className="pl-1"><strong>AMR:</strong> Automatic remote data collection from meters</li>
              <li className="pl-1"><strong>CIBSE TM39:</strong> Target 90% of consumption metered</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CT metering:</strong> Required above 100A circuits</li>
              <li className="pl-1"><strong>Class 1 accuracy:</strong> ±1.0% for commercial metering</li>
              <li className="pl-1"><strong>Modbus:</strong> Common protocol for BMS integration</li>
              <li className="pl-1"><strong>MID approval:</strong> Required for tenant recharging</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design metering hierarchies per CIBSE TM39 guidance",
              "Specify main metering and sub-metering arrangements",
              "Select appropriate meter accuracy classes and CT ratings",
              "Implement automatic meter reading (AMR) systems",
              "Configure data loggers and logging intervals",
              "Integrate metering with BMS and energy monitoring systems"
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

        {/* Section 1: Metering Hierarchy and Strategy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Metering Hierarchy and Strategy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A well-designed metering hierarchy enables effective energy management by providing visibility of
              consumption at multiple levels throughout a building. CIBSE TM39 provides comprehensive guidance
              on metering strategy development, recommending that at least 90% of total building energy
              consumption should be captured by sub-metering.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Metering hierarchy levels:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Level 1 (Fiscal):</strong> Main utility meters at building intake - used for billing</li>
                <li className="pl-1"><strong>Level 2 (Sub-main):</strong> Distribution board level meters - major systems or zones</li>
                <li className="pl-1"><strong>Level 3 (Circuit):</strong> Individual circuit or load meters - specific equipment</li>
                <li className="pl-1"><strong>Level 4 (Equipment):</strong> Individual plant items - chillers, AHUs, lifts</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Metering Hierarchy Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 1</td>
                      <td className="border border-white/10 px-3 py-2">Main intake room</td>
                      <td className="border border-white/10 px-3 py-2">Utility billing</td>
                      <td className="border border-white/10 px-3 py-2">Fiscal CT meter (Class 0.5)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 2</td>
                      <td className="border border-white/10 px-3 py-2">MSB outgoing ways</td>
                      <td className="border border-white/10 px-3 py-2">System/zone allocation</td>
                      <td className="border border-white/10 px-3 py-2">CT meter (Class 1.0)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 3</td>
                      <td className="border border-white/10 px-3 py-2">Floor/tenant DBs</td>
                      <td className="border border-white/10 px-3 py-2">Tenant recharging</td>
                      <td className="border border-white/10 px-3 py-2">MID approved meter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 4</td>
                      <td className="border border-white/10 px-3 py-2">Plant equipment</td>
                      <td className="border border-white/10 px-3 py-2">Equipment monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Direct connect/CT meter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">CIBSE TM39 Metering Guidance</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Target metering coverage: <strong>≥90%</strong> of total consumption</li>
                <li>• Separate metering recommended for: HVAC, lighting, small power, lifts, catering</li>
                <li>• Tenant areas: Individual metering essential for recharging</li>
                <li>• Central plant: Each major item (chillers, boilers, pumps) separately metered</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The metering strategy should align with the building's energy management objectives, lease structure, and reporting requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Main Metering and Sub-Metering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Main Metering and Sub-Metering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main metering (fiscal metering) provides the billing interface with the utility supplier, whilst
              sub-metering enables internal energy management, cost allocation, and consumption analysis. The
              choice of metering arrangement depends on building use, tenancy structure, and management objectives.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main (Fiscal) Metering</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Utility-owned and maintained</li>
                  <li className="pl-1">MID approved, Class 0.5 minimum</li>
                  <li className="pl-1">CT metering above 100A</li>
                  <li className="pl-1">Half-hourly data for large sites</li>
                  <li className="pl-1">Sealed and tamper-evident</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Building owner installed</li>
                  <li className="pl-1">Class 1.0 typical (Class 0.5 for recharging)</li>
                  <li className="pl-1">Direct connect up to 100A</li>
                  <li className="pl-1">Logging intervals as required</li>
                  <li className="pl-1">BMS/monitoring system integration</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">By tenant</td>
                      <td className="border border-white/10 px-3 py-2">Multi-tenant buildings</td>
                      <td className="border border-white/10 px-3 py-2">Fair cost allocation</td>
                      <td className="border border-white/10 px-3 py-2">MID approval for recharging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">By system</td>
                      <td className="border border-white/10 px-3 py-2">Single occupancy</td>
                      <td className="border border-white/10 px-3 py-2">Identifies energy use by end use</td>
                      <td className="border border-white/10 px-3 py-2">Requires careful categorisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">By zone/floor</td>
                      <td className="border border-white/10 px-3 py-2">Large floor plate buildings</td>
                      <td className="border border-white/10 px-3 py-2">Location-based analysis</td>
                      <td className="border border-white/10 px-3 py-2">May not align with systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hybrid</td>
                      <td className="border border-white/10 px-3 py-2">Complex buildings</td>
                      <td className="border border-white/10 px-3 py-2">Flexible analysis options</td>
                      <td className="border border-white/10 px-3 py-2">More meters, higher cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE TM39 Recommended Sub-Metering Categories</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HVAC:</strong> Chillers, boilers, pumps, fans, FCUs, splits (separately where practical)</li>
                <li className="pl-1"><strong>Lighting:</strong> General lighting, emergency lighting, external lighting</li>
                <li className="pl-1"><strong>Small power:</strong> General socket outlets, IT equipment, printers</li>
                <li className="pl-1"><strong>Specialist:</strong> Lifts, catering, server rooms, process loads</li>
                <li className="pl-1"><strong>Renewables:</strong> PV generation, battery storage (import/export)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Install metering at design stage - retrofitting is significantly more expensive and disruptive.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Automatic Meter Reading and Data Loggers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Automatic Meter Reading and Data Loggers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic Meter Reading (AMR) eliminates manual meter reading, enables frequent data collection,
              and supports real-time energy monitoring. Data loggers store consumption profiles for analysis
              and can integrate with building management systems for comprehensive energy management.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">AMR System Components</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Meters:</span> <span className="text-white">Energy meters with communication interfaces</span></p>
                <p><span className="text-white/60">Communications:</span> <span className="text-white">Modbus, M-Bus, BACnet, pulse outputs</span></p>
                <p><span className="text-white/60">Data concentrator:</span> <span className="text-white">Collects data from multiple meters</span></p>
                <p><span className="text-white/60">Software:</span> <span className="text-white">Energy monitoring and analysis platform</span></p>
                <p><span className="text-white/60">Network:</span> <span className="text-white">Wired (RS485, Ethernet) or wireless (LoRa, GSM)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Physical Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus RTU</td>
                      <td className="border border-white/10 px-3 py-2">RS485 (2-wire)</td>
                      <td className="border border-white/10 px-3 py-2">Industrial metering</td>
                      <td className="border border-white/10 px-3 py-2">1200m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus TCP</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet</td>
                      <td className="border border-white/10 px-3 py-2">BMS integration</td>
                      <td className="border border-white/10 px-3 py-2">100m per segment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">M-Bus</td>
                      <td className="border border-white/10 px-3 py-2">2-wire bus</td>
                      <td className="border border-white/10 px-3 py-2">Utility metering</td>
                      <td className="border border-white/10 px-3 py-2">1000m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet MS/TP</td>
                      <td className="border border-white/10 px-3 py-2">RS485</td>
                      <td className="border border-white/10 px-3 py-2">BMS integration</td>
                      <td className="border border-white/10 px-3 py-2">1200m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pulse output</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contact</td>
                      <td className="border border-white/10 px-3 py-2">Simple counting</td>
                      <td className="border border-white/10 px-3 py-2">Application dependent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pulse Counting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Standard: 1 pulse = 1 kWh</li>
                  <li className="pl-1">High resolution: 10-1000 pulses/kWh</li>
                  <li className="pl-1">Pulse width typically 100ms</li>
                  <li className="pl-1">Requires pulse counter/logger</li>
                  <li className="pl-1">Simple, reliable, low cost</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Logging Intervals</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">1 minute: Power quality, demand spikes</li>
                  <li className="pl-1">15 minutes: Standard energy analysis</li>
                  <li className="pl-1">30 minutes: Half-hourly settlement</li>
                  <li className="pl-1">1 hour: General monitoring</li>
                  <li className="pl-1">Daily: Simple trend analysis</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Logger Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Interval recording:</strong> Store readings at defined intervals (typically 15-30 minutes)</li>
                <li className="pl-1"><strong>Maximum demand:</strong> Record peak demand in each interval for tariff analysis</li>
                <li className="pl-1"><strong>Time-of-use:</strong> Separate registers for peak/off-peak periods</li>
                <li className="pl-1"><strong>Power quality:</strong> Voltage, current, power factor, harmonics logging</li>
                <li className="pl-1"><strong>Alarm logging:</strong> Record over/under voltage, power factor trips, demand limits</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Ensure sufficient data storage capacity - 15-minute logging generates 35,000+ readings per meter per year.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: CT Metering and Accuracy Classes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CT Metering and Accuracy Classes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current Transformer (CT) metering is required when circuit currents exceed the direct connection
              capability of meters, typically above 100A. Correct CT selection and installation is critical
              for metering accuracy - errors in CT ratio, burden, or class directly affect energy measurement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Selection Criteria</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Guidance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Primary current</td>
                      <td className="border border-white/10 px-3 py-2">125% of design current</td>
                      <td className="border border-white/10 px-3 py-2">400A circuit → 500/5 CT</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Secondary current</td>
                      <td className="border border-white/10 px-3 py-2">5A standard, 1A for long runs</td>
                      <td className="border border-white/10 px-3 py-2">5A typical, 1A if &gt;30m cable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accuracy class</td>
                      <td className="border border-white/10 px-3 py-2">Match meter requirements</td>
                      <td className="border border-white/10 px-3 py-2">Class 0.5 for fiscal, Class 1 for sub</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Burden (VA)</td>
                      <td className="border border-white/10 px-3 py-2">Meter VA + cable losses</td>
                      <td className="border border-white/10 px-3 py-2">5VA meter + 2VA cable = 7.5VA CT</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window size</td>
                      <td className="border border-white/10 px-3 py-2">Accommodate conductor/busbar</td>
                      <td className="border border-white/10 px-3 py-2">Split-core for retrofit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Meter Accuracy Classes (IEC 62053)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Accuracy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 0.2S</td>
                      <td className="border border-white/10 px-3 py-2">±0.2%</td>
                      <td className="border border-white/10 px-3 py-2">Revenue metering, high-value loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 0.5S</td>
                      <td className="border border-white/10 px-3 py-2">±0.5%</td>
                      <td className="border border-white/10 px-3 py-2">Fiscal metering, check metering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 1</td>
                      <td className="border border-white/10 px-3 py-2">±1.0%</td>
                      <td className="border border-white/10 px-3 py-2">Commercial sub-metering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 2</td>
                      <td className="border border-white/10 px-3 py-2">±2.0%</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, monitoring only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Installation Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Orientation:</strong> Install CTs with correct polarity (P1/K marking towards supply)</li>
                <li className="pl-1"><strong>Conductor position:</strong> Centre conductor in CT window for accuracy</li>
                <li className="pl-1"><strong>Secondary wiring:</strong> Never open-circuit secondary when primary is energised</li>
                <li className="pl-1"><strong>Cable size:</strong> Calculate secondary cable to limit voltage drop (typically &lt;1V)</li>
                <li className="pl-1"><strong>Phase identification:</strong> Ensure CTs match meter phase inputs (L1-L1, L2-L2, L3-L3)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Function Meter Parameters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Active energy (kWh import/export)</li>
                  <li className="pl-1">Reactive energy (kVArh)</li>
                  <li className="pl-1">Apparent energy (kVAh)</li>
                  <li className="pl-1">Maximum demand (kW, kVA)</li>
                  <li className="pl-1">Power factor (per phase, total)</li>
                  <li className="pl-1">Voltage, current, frequency</li>
                  <li className="pl-1">THD (Total Harmonic Distortion)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration Points</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Real-time power monitoring</li>
                  <li className="pl-1">Energy totalisation</li>
                  <li className="pl-1">Demand limiting/load shedding</li>
                  <li className="pl-1">Power factor correction control</li>
                  <li className="pl-1">Alarm generation (thresholds)</li>
                  <li className="pl-1">Trend logging and analysis</li>
                  <li className="pl-1">Report generation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commissioning requirement:</strong> Verify CT ratios are correctly programmed in meters - incorrect ratios are a common cause of metering errors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Metering Hierarchy Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design metering hierarchy for a 6-storey office building with ground floor retail and basement car park.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Level 1 - Fiscal Meters:</p>
                <p className="ml-4">M1: Main building intake (1000A CT meter)</p>
                <p className="mt-2 text-white/60">Level 2 - Sub-Main Meters:</p>
                <p className="ml-4">M2.1: Landlord common areas</p>
                <p className="ml-4">M2.2: Retail tenant supply</p>
                <p className="ml-4">M2.3: Office floors (Levels 1-6)</p>
                <p className="ml-4">M2.4: Central plant (basement)</p>
                <p className="ml-4">M2.5: Car park</p>
                <p className="mt-2 text-white/60">Level 3 - Floor/Tenant Meters:</p>
                <p className="ml-4">M3.1-M3.6: Individual floor tenant meters</p>
                <p className="ml-4">M3.7: Retail lighting</p>
                <p className="ml-4">M3.8: Retail power</p>
                <p className="mt-2 text-white/60">Level 4 - Equipment Meters:</p>
                <p className="ml-4">M4.1: Chiller 1</p>
                <p className="ml-4">M4.2: Chiller 2</p>
                <p className="ml-4">M4.3: Lifts</p>
                <p className="ml-4">M4.4: AHU-1</p>
                <p className="mt-2 text-green-400">Coverage check: Sum of L2 meters should equal L1 ±5%</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: CT Selection Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select CTs for a 630A submain feeding a distribution board 25m from the meter location.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Circuit design current: 630A</p>
                <p className="ml-4">Cable run to meter: 25m</p>
                <p className="ml-4">Meter burden: 3VA per phase</p>
                <p className="ml-4">Required accuracy: Class 1.0</p>
                <p className="mt-2">CT Primary Selection:</p>
                <p className="ml-4">Minimum CT rating: 630A × 1.25 = 787.5A</p>
                <p className="ml-4">Select standard size: <span className="text-green-400">800/5 CT</span></p>
                <p className="mt-2">Secondary Cable Calculation (2.5mm² twin):</p>
                <p className="ml-4">Resistance: 7.41 mΩ/m × 25m × 2 = 0.37Ω</p>
                <p className="ml-4">Power loss at 5A: I²R = 25 × 0.37 = 9.25W = <span className="text-green-400">9.25VA</span></p>
                <p className="mt-2">Total Burden Required:</p>
                <p className="ml-4">Meter: 3VA</p>
                <p className="ml-4">Cables: 9.25VA</p>
                <p className="ml-4">Total: 12.25VA</p>
                <p className="ml-4">Select CT burden: <span className="text-green-400">15VA Class 1.0</span></p>
                <p className="mt-2 text-green-400">Specification: 800/5, 15VA, Class 1.0 ring-type CT × 3</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: AMR System Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify AMR system for 20 sub-meters with BMS integration.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>System Requirements:</p>
                <p className="ml-4">• 20 × energy meters (various ratings)</p>
                <p className="ml-4">• 15-minute logging interval</p>
                <p className="ml-4">• BMS integration via Modbus TCP</p>
                <p className="ml-4">• Maximum cable run: 150m</p>
                <p className="mt-2">Communication Architecture:</p>
                <p className="ml-4">Meters → Modbus RTU (RS485) → Data Gateway → Modbus TCP → BMS</p>
                <p className="mt-2">Specification:</p>
                <p className="ml-4 text-green-400">• Meters: Multi-function with Modbus RTU interface</p>
                <p className="ml-4 text-green-400">• Bus: RS485, daisy-chain topology, 9600 baud</p>
                <p className="ml-4 text-green-400">• Gateway: 32-device capacity, internal data logger</p>
                <p className="ml-4 text-green-400">• Storage: Minimum 90 days at 15-min intervals</p>
                <p className="ml-4 text-green-400">• Integration: Modbus TCP/IP to BMS IP network</p>
                <p className="mt-2">Data points per meter (typical):</p>
                <p className="ml-4">• kWh import, kWh export, kVArh</p>
                <p className="ml-4">• kW demand, kVA demand</p>
                <p className="ml-4">• Power factor (3-phase average)</p>
                <p className="ml-4">• V, A per phase (instantaneous)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Metering Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define energy management objectives and reporting requirements</li>
                <li className="pl-1">Identify all major loads and tenant/zone boundaries</li>
                <li className="pl-1">Design hierarchy to capture ≥90% of total consumption</li>
                <li className="pl-1">Select meter accuracy class appropriate to application</li>
                <li className="pl-1">Size CTs for expected maximum load plus growth allowance</li>
                <li className="pl-1">Specify communication protocol compatible with BMS/monitoring system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Sub-metering coverage target: <strong>≥90%</strong> (CIBSE TM39)</li>
                <li className="pl-1">CT sizing: <strong>125%</strong> of design current</li>
                <li className="pl-1">Standard secondary current: <strong>5A</strong></li>
                <li className="pl-1">Class 1 accuracy: <strong>±1.0%</strong></li>
                <li className="pl-1">Standard pulse output: <strong>1 pulse/kWh</strong></li>
                <li className="pl-1">15-minute logging: <strong>96 readings/day</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized CTs:</strong> Circuit upgrades exceed CT rating, requiring replacement</li>
                <li className="pl-1"><strong>Wrong CT ratio in meter:</strong> Readings incorrect by factor of CT ratio error</li>
                <li className="pl-1"><strong>Phase mismatch:</strong> CTs and voltage references on different phases</li>
                <li className="pl-1"><strong>Insufficient sub-metering:</strong> Cannot identify consumption patterns or apportion costs</li>
                <li className="pl-1"><strong>No reconciliation:</strong> Sub-meter totals not verified against main meter</li>
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
                <p className="font-medium text-white mb-1">Metering Hierarchy (CIBSE TM39)</p>
                <ul className="space-y-0.5">
                  <li>Level 1: Fiscal (main intake)</li>
                  <li>Level 2: Sub-main (systems/zones)</li>
                  <li>Level 3: Circuit (tenants/floors)</li>
                  <li>Level 4: Equipment (individual plant)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Accuracy Classes</p>
                <ul className="space-y-0.5">
                  <li>Class 0.2S: ±0.2% (revenue metering)</li>
                  <li>Class 0.5S: ±0.5% (fiscal metering)</li>
                  <li>Class 1: ±1.0% (sub-metering)</li>
                  <li>Class 2: ±2.0% (monitoring only)</li>
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
            <Link to="../h-n-c-module6-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5-3">
              Next: Energy Monitoring Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section5_2;
