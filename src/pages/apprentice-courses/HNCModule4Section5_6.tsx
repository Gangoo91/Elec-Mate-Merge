import { ArrowLeft, Gauge, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Metering and Monitoring - HNC Module 4 Section 5.6";
const DESCRIPTION = "Master metering and monitoring for building services: fiscal metering, sub-metering for Part L compliance, energy management systems, power monitoring and BMS integration.";

const quickCheckQuestions = [
  {
    id: "fiscal-meter",
    question: "What is the primary purpose of fiscal metering?",
    options: ["To monitor power quality", "For billing and revenue purposes", "To control equipment", "For load shedding"],
    correctIndex: 1,
    explanation: "Fiscal meters are used for billing purposes - they are sealed, calibrated to legal standards and owned/read by the energy supplier for revenue collection."
  },
  {
    id: "part-l",
    question: "What does Building Regulations Part L require regarding sub-metering?",
    options: ["Sub-metering is optional", "Metering of end-use categories in buildings >1000m²", "Only main meters needed", "Metering only for residential"],
    correctIndex: 1,
    explanation: "Part L requires sub-metering to enable energy consumption to be attributed to end-use categories (lighting, heating, cooling, small power etc.) in buildings over 1000m²."
  },
  {
    id: "ct-ratio",
    question: "A meter uses 200/5A current transformers. What is the multiplying factor for meter readings?",
    options: ["5", "40", "200", "1000"],
    correctIndex: 1,
    explanation: "The CT ratio is 200:5 = 40. The meter sees 5A when 200A flows, so readings must be multiplied by 40 (or the meter automatically compensates)."
  },
  {
    id: "bms-protocol",
    question: "Which protocol is commonly used for BMS integration with power meters?",
    options: ["HTTP only", "Modbus or BACnet", "Bluetooth", "USB"],
    correctIndex: 1,
    explanation: "Modbus (RS-485 or TCP/IP) and BACnet are the most common protocols for integrating power meters with Building Management Systems, allowing automated data collection and control."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the difference between MID and non-MID meters?",
    options: [
      "MID meters are larger",
      "MID meters are approved for fiscal/billing purposes",
      "Non-MID meters are more accurate",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "MID (Measuring Instruments Directive) approved meters meet legal requirements for billing and fiscal purposes. Non-MID meters are suitable for monitoring and internal cost allocation but not for billing."
  },
  {
    id: 2,
    question: "What end-use categories does Part L typically require to be sub-metered?",
    options: [
      "Only lighting",
      "Heating, cooling, fans, lighting, small power, and other significant loads",
      "Only heating and cooling",
      "Only electrical loads"
    ],
    correctAnswer: 1,
    explanation: "Part L requires metering of heating, cooling, auxiliary services (fans, pumps), lighting, small power, and any other significant energy uses to enable energy monitoring and management."
  },
  {
    id: 3,
    question: "What is a CT (Current Transformer) used for in metering?",
    options: [
      "To increase voltage",
      "To reduce high currents to measurable levels for meters",
      "To provide backup power",
      "To correct power factor"
    ],
    correctAnswer: 1,
    explanation: "CTs reduce high load currents (e.g., 400A) to low values (typically 1A or 5A) that the meter can safely measure. The meter then applies the CT ratio to calculate actual current."
  },
  {
    id: 4,
    question: "What is demand monitoring used for?",
    options: [
      "Measuring total energy consumption only",
      "Tracking peak power demand to manage electricity costs and capacity",
      "Monitoring voltage only",
      "Controlling lighting"
    ],
    correctAnswer: 1,
    explanation: "Demand monitoring tracks peak power demand (kW or kVA), which is important because maximum demand charges can form a significant part of commercial electricity bills. It also helps identify capacity constraints."
  },
  {
    id: 5,
    question: "What data communication standard is commonly used for power meters?",
    options: [
      "WiFi only",
      "Modbus RTU/TCP",
      "Analogue signals only",
      "No communication available"
    ],
    correctAnswer: 1,
    explanation: "Modbus RTU (serial RS-485) and Modbus TCP (Ethernet) are widely used standards for meter communication. They allow meters to send data to energy management systems, BMS and building analytics platforms."
  },
  {
    id: 6,
    question: "What is pulse output from a meter typically used for?",
    options: [
      "Providing mains power",
      "Sending consumption data to BMS or external counters",
      "Controlling protective devices",
      "Measuring voltage"
    ],
    correctAnswer: 1,
    explanation: "Pulse output provides a digital signal (typically one pulse per kWh) that can be counted by BMS, data loggers or utility systems to record energy consumption without complex communication protocols."
  },
  {
    id: 7,
    question: "What is the purpose of power quality monitoring?",
    options: [
      "To measure energy consumption only",
      "To identify voltage disturbances, harmonics and other quality issues",
      "To control equipment",
      "To generate electricity"
    ],
    correctAnswer: 1,
    explanation: "Power quality monitors record voltage variations, dips, swells, harmonics, flicker and other disturbances. This data helps diagnose equipment problems, identify disturbance sources and verify supply quality."
  },
  {
    id: 8,
    question: "What is automatic meter reading (AMR)?",
    options: [
      "Manual reading of meters",
      "Remote collection of meter data without site visits",
      "Resetting meters automatically",
      "Generating meter reports"
    ],
    correctAnswer: 1,
    explanation: "AMR systems collect meter readings remotely via communication networks (GSM, Ethernet, radio). This eliminates manual reading visits, provides more frequent data and enables near real-time monitoring."
  },
  {
    id: 9,
    question: "What is the advantage of multi-function power meters over simple kWh meters?",
    options: [
      "Lower cost only",
      "Measure multiple parameters: V, I, kW, kVA, kVAr, PF, harmonics",
      "Simpler installation",
      "No communication needed"
    ],
    correctAnswer: 1,
    explanation: "Multi-function meters measure voltage, current, power (real, apparent, reactive), power factor, frequency, harmonics and more. This comprehensive data supports energy management and power quality analysis."
  },
  {
    id: 10,
    question: "What is load profiling in energy monitoring?",
    options: [
      "Measuring cable size",
      "Recording energy consumption patterns over time",
      "Determining motor specifications",
      "Designing electrical layouts"
    ],
    correctAnswer: 1,
    explanation: "Load profiling records consumption at regular intervals (e.g., half-hourly) to reveal usage patterns, peak demand times and opportunities for load shifting or energy efficiency improvements."
  }
];

const faqs = [
  {
    question: "What is the difference between fiscal and check metering?",
    answer: "Fiscal meters are used for billing and must meet legal accuracy standards (MID approved). They're typically owned by the energy supplier or installed to their specification. Check meters are for internal monitoring, cost allocation between departments/tenants, or verifying fiscal meter accuracy. They don't need MID approval but should still be accurate."
  },
  {
    question: "How many sub-meters are typically needed for Part L compliance?",
    answer: "Part L requires metering of each major end-use: lighting, small power/sockets, heating, cooling, ventilation/fans, and any other loads exceeding 10% of total. For large buildings this typically means 5-10+ sub-meters minimum, plus additional meters for tenant billing or detailed analysis."
  },
  {
    question: "What CT ratio should I specify for a 400A circuit?",
    answer: "For 400A circuits, common CT ratios are 400/5A or 500/5A. 400/5A is more accurate at full load but won't handle overloads. 500/5A gives headroom for load growth. Always specify CTs that can handle the maximum expected current including diversity."
  },
  {
    question: "How do I integrate meters with a BMS?",
    answer: "Most modern meters offer Modbus RTU (RS-485) or Modbus TCP (Ethernet) communication. Define the required data points (kWh, kW, power factor, etc.), obtain register maps from meter manufacturer, and configure the BMS to poll meter data at appropriate intervals (typically 1-15 minutes for trending)."
  },
  {
    question: "What is half-hourly (HH) metering and when is it required?",
    answer: "Half-hourly metering records consumption in 30-minute intervals, required by settlement regulations for supplies over 100kW (Profile Class 5-8) in the UK. It enables time-of-use tariffs and more accurate billing. Smaller supplies may benefit from voluntary HH metering for better demand management."
  }
];

const HNCModule4Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Gauge className="h-4 w-4" />
            <span>Module 4.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Metering and Monitoring
          </h1>
          <p className="text-white/80">
            Enabling energy management through comprehensive measurement and analysis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Fiscal metering:</strong> MID approved for billing</li>
              <li className="pl-1"><strong>Sub-metering:</strong> Part L requires end-use metering</li>
              <li className="pl-1"><strong>Power monitoring:</strong> Multi-parameter analysis</li>
              <li className="pl-1"><strong>BMS integration:</strong> Modbus/BACnet protocols</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L compliance:</strong> Buildings &gt;1000m²</li>
              <li className="pl-1"><strong>Tenant billing:</strong> Accurate cost allocation</li>
              <li className="pl-1"><strong>Energy management:</strong> Data-driven efficiency</li>
              <li className="pl-1"><strong>Demand response:</strong> Peak load management</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand fiscal metering requirements and standards",
              "Design sub-metering systems for Part L compliance",
              "Specify current transformers and meter installations",
              "Configure energy management and monitoring systems",
              "Integrate meters with BMS using standard protocols",
              "Analyse load profiles and demand patterns"
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

        {/* Section 1: Fiscal Metering */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fiscal Metering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fiscal metering provides the legal basis for billing electricity consumption.
              These meters must meet stringent accuracy standards and are typically owned
              or specified by the energy supplier.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fiscal Meter Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accuracy class</td>
                      <td className="border border-white/10 px-3 py-2">Class B (1%) typical</td>
                      <td className="border border-white/10 px-3 py-2">MID 2014/32/EU</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Certification</td>
                      <td className="border border-white/10 px-3 py-2">MID approved</td>
                      <td className="border border-white/10 px-3 py-2">CE + M marking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sealing</td>
                      <td className="border border-white/10 px-3 py-2">Tamper-evident</td>
                      <td className="border border-white/10 px-3 py-2">Supplier seals meter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CT accuracy</td>
                      <td className="border border-white/10 px-3 py-2">Class 0.5 or better</td>
                      <td className="border border-white/10 px-3 py-2">Must match meter class</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Communication</td>
                      <td className="border border-white/10 px-3 py-2">AMR capability</td>
                      <td className="border border-white/10 px-3 py-2">Remote reading</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supply profile classes in the UK:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Profile 1-4:</strong> Domestic and small business, monthly reading</li>
                <li className="pl-1"><strong>Profile 5-8:</strong> Medium demand, mandatory half-hourly metering</li>
                <li className="pl-1"><strong>Profile 00:</strong> Large users &gt;100kW, half-hourly settlement</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Coordinate meter specification with the energy supplier early in the project. They will specify meter type, CT requirements and communication needs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Sub-Metering for Part L */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sub-Metering for Part L
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part L requires energy metering in non-domestic buildings
              over 1000m² to enable monitoring and encourage efficient operation. The metering
              strategy should enable energy use to be attributed to different end uses.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L End-Use Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Loads</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Metering Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating</td>
                      <td className="border border-white/10 px-3 py-2">Boilers, heat pumps, electric heating</td>
                      <td className="border border-white/10 px-3 py-2">kWh electricity, heat meters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, DX units, VRF</td>
                      <td className="border border-white/10 px-3 py-2">kWh electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">AHUs, extract fans, FCUs</td>
                      <td className="border border-white/10 px-3 py-2">kWh electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">General, emergency, external</td>
                      <td className="border border-white/10 px-3 py-2">kWh electricity per zone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Socket outlets, IT equipment</td>
                      <td className="border border-white/10 px-3 py-2">kWh electricity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Other (&gt;10%)</td>
                      <td className="border border-white/10 px-3 py-2">Lifts, kitchens, data centres</td>
                      <td className="border border-white/10 px-3 py-2">Separate metering required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metering Strategy Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">90% of estimated energy use should be directly metered</li>
                <li className="pl-1">Enable attribution to each major end-use category</li>
                <li className="pl-1">Allow tenant billing where multiple occupants</li>
                <li className="pl-1">Support automatic meter reading (AMR)</li>
                <li className="pl-1">Enable performance monitoring against design predictions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BREEAM note:</strong> BREEAM credits require more comprehensive metering. Plan metering strategy early to achieve both Part L compliance and BREEAM requirements efficiently.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Energy Management Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Energy Management Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy management systems (EMS) collect, store and analyse metering data to
              support efficient building operation. Modern systems provide real-time dashboards,
              automated reporting and integration with building controls.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMS Functionality</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data collection</td>
                      <td className="border border-white/10 px-3 py-2">Automatic meter polling</td>
                      <td className="border border-white/10 px-3 py-2">Continuous monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load profiling</td>
                      <td className="border border-white/10 px-3 py-2">Time-based consumption patterns</td>
                      <td className="border border-white/10 px-3 py-2">Identify efficiency opportunities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Demand monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Peak demand tracking</td>
                      <td className="border border-white/10 px-3 py-2">Cost management</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Alerting</td>
                      <td className="border border-white/10 px-3 py-2">Anomaly detection</td>
                      <td className="border border-white/10 px-3 py-2">Early problem identification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reporting</td>
                      <td className="border border-white/10 px-3 py-2">Automated reports</td>
                      <td className="border border-white/10 px-3 py-2">Compliance, management info</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Benchmarking</td>
                      <td className="border border-white/10 px-3 py-2">Compare against targets/peers</td>
                      <td className="border border-white/10 px-3 py-2">Performance assessment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Indicators</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">kWh/m² (energy use intensity)</li>
                  <li className="pl-1">kW peak demand</li>
                  <li className="pl-1">Power factor</li>
                  <li className="pl-1">Carbon intensity (kgCO2/m²)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Data Intervals</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Main meters: 15-30 minute intervals</li>
                  <li className="pl-1">Sub-meters: 15-60 minute intervals</li>
                  <li className="pl-1">Power quality: 10-minute averages</li>
                  <li className="pl-1">Events: Real-time capture</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Data storage:</strong> Plan for 2-3 years minimum data retention. Cloud-based systems simplify storage and access; on-premise systems suit security-sensitive facilities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Power Monitoring and BMS Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Monitoring and BMS Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern power meters provide extensive data beyond simple kWh measurement.
              Integration with BMS enables coordinated energy management and automated
              responses to demand or power quality events.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Function Meter Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage (per phase)</td>
                      <td className="border border-white/10 px-3 py-2">V</td>
                      <td className="border border-white/10 px-3 py-2">Supply quality monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current (per phase)</td>
                      <td className="border border-white/10 px-3 py-2">A</td>
                      <td className="border border-white/10 px-3 py-2">Load monitoring, balance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Real power</td>
                      <td className="border border-white/10 px-3 py-2">kW</td>
                      <td className="border border-white/10 px-3 py-2">Demand, billing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Apparent power</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Transformer loading</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive power</td>
                      <td className="border border-white/10 px-3 py-2">kVAr</td>
                      <td className="border border-white/10 px-3 py-2">PFC sizing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">Efficiency, charges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">THD (V and I)</td>
                      <td className="border border-white/10 px-3 py-2">%</td>
                      <td className="border border-white/10 px-3 py-2">Harmonic analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy</td>
                      <td className="border border-white/10 px-3 py-2">kWh, kVArh</td>
                      <td className="border border-white/10 px-3 py-2">Consumption, billing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Modbus RTU:</strong> RS-485 serial, up to 32 devices, simple</li>
                <li className="pl-1"><strong>Modbus TCP:</strong> Ethernet, unlimited devices, faster</li>
                <li className="pl-1"><strong>BACnet IP:</strong> Native BMS protocol, interoperable</li>
                <li className="pl-1"><strong>M-Bus:</strong> Common for heat/water meters</li>
                <li className="pl-1"><strong>Pulse output:</strong> Simple kWh counting, 1 pulse/kWh typical</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Integration tip:</strong> Define the data points needed before specifying meters. Ensure communication capability matches BMS requirements and specify register maps early.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Sub-Metering Strategy</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design sub-metering for 3000m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Part L requirements for &gt;1000m² building:</p>
                <p className="mt-2">Sub-meters required:</p>
                <p>1. Lighting DB (general lighting) - 1 meter</p>
                <p>2. Small power DB (sockets) - 1 meter</p>
                <p>3. HVAC panel (heating/cooling) - 1 meter</p>
                <p>4. Mechanical ventilation - 1 meter</p>
                <p>5. Server room (if &gt;10% load) - 1 meter</p>
                <p>6. External lighting - 1 meter</p>
                <p className="mt-2">Minimum: <strong>6 sub-meters</strong></p>
                <p className="text-white/60">Plus main fiscal meter</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: CT Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify CTs for 800A main switchboard meter.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Main incomer rating: 800A</p>
                <p>Maximum expected load: 650A (80% utilisation)</p>
                <p className="mt-2">CT selection considerations:</p>
                <p>• Primary must exceed max load</p>
                <p>• Allow for overload and future growth</p>
                <p>• Standard secondary: 5A (most meters)</p>
                <p className="mt-2">Option 1: 800/5A CT (ratio 160)</p>
                <p>Option 2: 1000/5A CT (ratio 200)</p>
                <p className="mt-2">Recommendation: <strong>1000/5A Class 0.5</strong></p>
                <p className="text-white/60">Allows 25% growth margin</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: BMS Integration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Integrate 10 power meters with BMS via Modbus.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Meters: 10 × multi-function meters</p>
                <p>Protocol: Modbus RTU (RS-485)</p>
                <p className="mt-2">Network design:</p>
                <p>• Max 32 devices per RS-485 bus</p>
                <p>• Max cable length: 1200m (with termination)</p>
                <p>• Baud rate: 9600 or 19200</p>
                <p className="mt-2">Data points per meter (typical):</p>
                <p>• 3× voltage, 3× current, 3× power</p>
                <p>• PF, frequency, kWh, kVArh</p>
                <p>• THD (optional)</p>
                <p className="mt-2">Poll interval: 15 seconds typical</p>
                <p>Total registers: ~200 per meter</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Meter Installation Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Install CTs on correct phases (match voltage connections)</li>
                <li className="pl-1">Ensure CT direction arrow points toward load</li>
                <li className="pl-1">Keep CT secondary circuits short-circuit protected</li>
                <li className="pl-1">Label all CTs with associated meter reference</li>
                <li className="pl-1">Provide local meter indication where practical</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data Management</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Establish naming conventions for meters</li>
                <li className="pl-1">Document CT ratios in maintenance manuals</li>
                <li className="pl-1">Regular data validation checks</li>
                <li className="pl-1">Backup data regularly</li>
                <li className="pl-1">Calibration records for fiscal meters</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Metering Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong CT ratio</strong> - Readings scaled incorrectly</li>
                <li className="pl-1"><strong>Reversed CT</strong> - Negative readings or power flow</li>
                <li className="pl-1"><strong>Phase mismatch</strong> - V and I on different phases</li>
                <li className="pl-1"><strong>Open CT secondary</strong> - Dangerous voltage, meter damage</li>
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
                <p className="font-medium text-white mb-1">Meter Types</p>
                <ul className="space-y-0.5">
                  <li>Fiscal: MID approved, billing</li>
                  <li>Check: Internal monitoring</li>
                  <li>Multi-function: V, I, P, PF, kWh</li>
                  <li>Power quality: THD, events</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Part L Categories</p>
                <ul className="space-y-0.5">
                  <li>Heating and cooling</li>
                  <li>Ventilation/fans</li>
                  <li>Lighting</li>
                  <li>Small power</li>
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
            <Link to="../h-n-c-module4-section5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Power Quality
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6">
              Next: Section 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section5_6;
