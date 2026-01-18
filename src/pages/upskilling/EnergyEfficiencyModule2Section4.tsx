import { ArrowLeft, Activity, Zap, Gauge, Cpu, Wifi, AlertTriangle, CheckCircle, PoundSterling, Target, Wrench, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const EnergyEfficiencyModule2Section4 = () => {
  useSEO({
    title: "Equipment for Power Monitoring | Energy Efficiency Module 2 Section 4 | Elec-Mate",
    description: "Learn about power monitoring equipment including clamp meters, power analysers, CTs, smart meters, and IoT energy monitors. Practical guidance for UK electricians on equipment selection and installation.",
    keywords: "power monitoring equipment, clamp meters, power analysers, current transformers, smart meters, energy monitoring, Fluke, Chauvin Arnoux, Hioki, UK electrical"
  });

  const quickCheckQuestions = [
    {
      id: "qc1",
      question: "What accuracy class is typically required for billing-grade energy metering in commercial installations?",
      options: ["Class 3", "Class 1", "Class 0.5 or better", "Class 5"],
      correctIndex: 2,
      explanation: "Billing-grade metering requires Class 0.5 or better accuracy to ensure fair and accurate energy billing. Class 1 is acceptable for sub-metering, while Class 3 is only suitable for indicative measurements."
    },
    {
      id: "qc2",
      question: "When selecting a CT for a 400A circuit, what ratio would typically be most appropriate?",
      options: ["100/5A", "250/5A", "500/5A", "1000/5A"],
      correctIndex: 2,
      explanation: "A 500/5A CT provides headroom above the 400A load while keeping measurements in an optimal range. The CT should be rated above maximum expected current but not excessively oversized, which would reduce accuracy at lower loads."
    },
    {
      id: "qc3",
      question: "What is the main advantage of Rogowski coils over traditional split-core CTs?",
      options: ["Higher accuracy", "Lower cost", "Flexibility to fit around large or awkwardly shaped conductors", "Better high-frequency response"],
      correctIndex: 2,
      explanation: "Rogowski coils are flexible, lightweight, and can wrap around conductors of any size or shape, making them ideal for retrofit installations where access is limited or conductors are large busbar arrangements."
    }
  ];

  const quizQuestions = [
    {
      question: "What does a true RMS clamp meter measure that a standard clamp meter cannot accurately measure?",
      options: [
        "DC current only",
        "Non-sinusoidal waveforms from VFDs and LED drivers",
        "Very low currents below 1A",
        "Voltage measurements"
      ],
      correctAnswer: "Non-sinusoidal waveforms from VFDs and LED drivers"
    },
    {
      question: "Which UK standard covers the performance requirements for electricity metering equipment?",
      options: [
        "BS 7671",
        "BS EN 62053 series",
        "BS 5839",
        "BS EN 61010"
      ],
      correctAnswer: "BS EN 62053 series"
    },
    {
      question: "What is the typical cost range for a professional-grade portable power analyser in the UK?",
      options: [
        "£50-£150",
        "£200-£500",
        "£800-£3,000",
        "£5,000-£10,000"
      ],
      correctAnswer: "£800-£3,000"
    },
    {
      question: "What parameter does Power Factor (PF) measurement help identify?",
      options: [
        "Earth fault current",
        "Reactive power and potential for power factor correction",
        "Maximum demand only",
        "Cable temperature"
      ],
      correctAnswer: "Reactive power and potential for power factor correction"
    },
    {
      question: "When installing CTs on a three-phase system, why is correct orientation (K-L marking) important?",
      options: [
        "It affects the CT lifespan",
        "It ensures correct polarity for accurate power and energy measurements",
        "It is only important for safety",
        "It determines the CT ratio"
      ],
      correctAnswer: "It ensures correct polarity for accurate power and energy measurements"
    }
  ];

  const faqs = [
    {
      question: "Do I need a calibrated power analyser for energy audits?",
      answer: "For formal energy audits and reports that may influence investment decisions, using calibrated equipment with traceable certificates is strongly recommended. Calibration should be performed annually by an accredited laboratory. For general monitoring and indicative measurements, factory calibration is usually sufficient, but you should maintain records of equipment used and its calibration status."
    },
    {
      question: "Can I use standard CTs with any power meter?",
      answer: "CTs must be compatible with your meter in terms of output (typically 5A or 1A secondary), accuracy class, and burden rating. Most meters specify compatible CT types. Using mismatched CTs can result in inaccurate readings or damage to equipment. Always check the meter specifications and consider using manufacturer-recommended CT combinations."
    },
    {
      question: "What is the difference between MID-approved and non-MID meters?",
      answer: "MID (Measuring Instruments Directive) approved meters meet EU accuracy and quality standards required for billing purposes where energy costs are recharged to tenants or other parties. Non-MID meters are suitable for internal monitoring and energy management but cannot be used for fiscal metering. MID approval adds cost but provides legal traceability."
    },
    {
      question: "How do I choose between WiFi and wired data loggers?",
      answer: "WiFi loggers offer easier installation and flexibility but may suffer connectivity issues in buildings with thick walls or electrical interference. Wired connections (Ethernet, Modbus, BACnet) are more reliable for permanent installations and industrial environments. Consider hybrid systems that log locally and transmit periodically to handle connectivity gaps."
    },
    {
      question: "What safety precautions are essential when installing power monitoring equipment?",
      answer: "Always isolate circuits where possible before installing CTs or making connections. Use appropriate PPE including arc-flash rated clothing for work on live equipment. Ensure CTs are never operated with an open secondary circuit as dangerous voltages can develop. Follow safe isolation procedures per BS 7671 and GS38 guidance for test equipment. Only competent persons should work on live systems."
    },
    {
      question: "Can IoT energy monitors replace traditional power analysers?",
      answer: "IoT monitors excel at continuous, long-term monitoring and trend analysis but typically lack the detailed power quality analysis capabilities of dedicated analysers. They are complementary tools - use IoT monitors for ongoing energy management and bring in power analysers for detailed investigations of specific issues like harmonics, transients, or voltage quality problems."
    }
  ];

  return (
    <div className="bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Activity className="h-4 w-4 text-elec-yellow" />
            <span>Module 2 • Section 4</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <header className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Equipment for Power Monitoring
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Master the tools of the trade - from handheld clamp meters to sophisticated IoT monitoring systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Clamp meters for spot checks, power analysers for detailed audits</li>
              <li>- CTs enable safe high-current measurement</li>
              <li>- Smart meters provide half-hourly consumption data</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Why It Matters</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Right equipment = accurate measurements</li>
              <li>- Wrong CT sizing = billing errors or safety risks</li>
              <li>- IoT monitoring enables proactive energy management</li>
            </ul>
          </div>
        </div>

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Clamp Meters and Portable Power Analysers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Clamp Meters
              </h3>
              <p className="text-white mb-4">
                Clamp meters are the electrician's everyday tool for current measurement. Modern units offer far more than basic AC current readings.
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">True RMS vs Average-Responding</h4>
                  <p className="text-white text-sm">
                    True RMS meters accurately measure non-sinusoidal waveforms common with VFDs, LED drivers, and switched-mode power supplies. Average-responding meters can under-read by 20-40% on distorted waveforms. For energy work, always use True RMS instruments.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">Popular UK Models</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li><strong>Fluke 376 FC:</strong> True RMS, iFlex compatibility, Bluetooth - approx £400-500</li>
                    <li><strong>Fluke 325:</strong> Excellent mid-range option - approx £200-250</li>
                    <li><strong>Chauvin Arnoux F407:</strong> Power and harmonics capable - approx £350-450</li>
                    <li><strong>Hioki CM4375:</strong> AC/DC with Bluetooth - approx £300-400</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                Portable Power Analysers
              </h3>
              <p className="text-white mb-4">
                For detailed energy analysis, portable power analysers provide comprehensive measurements including voltage, current, power factor, harmonics, and energy consumption over time.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Key Capabilities</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li>- Single and three-phase measurements</li>
                    <li>- Real, reactive, and apparent power</li>
                    <li>- Power factor and displacement PF</li>
                    <li>- Harmonic analysis to 50th order</li>
                    <li>- Data logging with time stamps</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Leading Models (UK Market)</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li><strong>Fluke 1770 series:</strong> £2,500-4,000</li>
                    <li><strong>Chauvin Arnoux CA8336:</strong> £2,000-3,000</li>
                    <li><strong>Hioki PW3198:</strong> £2,500-3,500</li>
                    <li><strong>Megger MPQ2000:</strong> £1,500-2,500</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fixed Power Quality Analysers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For permanent monitoring installations, fixed power quality analysers provide continuous data collection and often integrate with building management systems (BMS) or energy management software.
            </p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-3">When to Specify Fixed Analysers</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Main incoming supplies to large facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Critical process or sensitive equipment feeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Sites with power quality issues or complaints</span>
                  </li>
                </ul>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Data centres and healthcare facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Facilities with on-site generation or renewables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Compliance monitoring requirements</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">Popular Fixed Analyser Options</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded">
                  <p className="font-medium text-elec-yellow text-sm">Schneider ION Series</p>
                  <p className="text-white/70 text-xs">Enterprise-grade, extensive BMS integration</p>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="font-medium text-elec-yellow text-sm">ABB M4M Series</p>
                  <p className="text-white/70 text-xs">Modular, scalable for various applications</p>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="font-medium text-elec-yellow text-sm">Janitza UMG Series</p>
                  <p className="text-white/70 text-xs">Excellent harmonic analysis, German quality</p>
                </div>
                <div className="bg-white/5 p-3 rounded">
                  <p className="font-medium text-elec-yellow text-sm">Crompton Integra Series</p>
                  <p className="text-white/70 text-xs">Cost-effective, good UK support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Current Transformers (CTs) and Rogowski Coils
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3">Current Transformers (CTs)</h3>
              <p className="text-white mb-4">
                CTs are essential for measuring high currents safely. They step down the primary current to a safe secondary level (typically 5A or 1A) that can be measured by instruments.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-elec-yellow">CT Type</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Best For</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Typical Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Solid Core</td>
                      <td className="py-2 px-3">New installations, highest accuracy</td>
                      <td className="py-2 px-3">£15-50</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Split Core</td>
                      <td className="py-2 px-3">Retrofits, no disconnection needed</td>
                      <td className="py-2 px-3">£30-100</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Wound Primary</td>
                      <td className="py-2 px-3">Low current measurement (under 50A)</td>
                      <td className="py-2 px-3">£25-60</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Bus Bar</td>
                      <td className="py-2 px-3">High current busbar installations</td>
                      <td className="py-2 px-3">£50-150</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-500 mb-1">Critical Safety Warning</h4>
                    <p className="text-white text-sm">
                      Never leave a CT secondary circuit open when primary current is flowing. Dangerous voltages (potentially thousands of volts) can develop. Always short-circuit CT secondaries before disconnecting from the meter, or use CTs with built-in shorting links.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3">Rogowski Coils</h3>
              <p className="text-white mb-4">
                Rogowski coils are flexible current sensors that offer unique advantages for certain applications.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-500 mb-2">Advantages</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li>- Flexible, fits any conductor shape</li>
                    <li>- Lightweight and easy to install</li>
                    <li>- Wide dynamic range</li>
                    <li>- No saturation at high currents</li>
                    <li>- Excellent for transient capture</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-medium text-red-500 mb-2">Limitations</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li>- Requires integrator electronics</li>
                    <li>- Cannot measure DC</li>
                    <li>- Lower accuracy than quality CTs</li>
                    <li>- More expensive per channel</li>
                    <li>- Positioning affects accuracy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Smart Meters and Sub-meters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                UK Smart Meter Rollout (SMETS2)
              </h3>
              <p className="text-white mb-4">
                The UK smart meter rollout uses SMETS2 (Smart Metering Equipment Technical Specifications 2) meters that communicate via the Data Communications Company (DCC) network.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">SMETS2 Features</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li>- Half-hourly consumption data</li>
                    <li>- Remote reading capability</li>
                    <li>- In-home display (IHD)</li>
                    <li>- Export metering for solar PV</li>
                    <li>- Supplier switching without replacement</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Accessing Smart Meter Data</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li>- Consumer Access Device (CAD)</li>
                    <li>- n3rgy or Loop apps</li>
                    <li>- Supplier online portals</li>
                    <li>- DCC authorised third parties</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3">Sub-metering Systems</h3>
              <p className="text-white mb-4">
                Sub-meters provide circuit-level monitoring within buildings, enabling detailed energy analysis and cost allocation.
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">MID-Approved Sub-meters (for billing)</h4>
                  <p className="text-white text-sm mb-2">
                    Required when recharging energy costs to tenants or other parties. Must display the MID conformity marking and have sealed calibration.
                  </p>
                  <p className="text-white/70 text-xs">
                    Examples: Rayleigh Instruments RI-D series, Eastron SDM series (MID versions), Schneider iEM3000
                  </p>
                </div>
                <div className="border-l-2 border-white/30 pl-4">
                  <h4 className="font-medium text-white mb-2">Non-MID Sub-meters (for monitoring)</h4>
                  <p className="text-white text-sm mb-2">
                    Suitable for internal energy management, identifying waste, and monitoring individual circuits or equipment. Lower cost but not legal for billing.
                  </p>
                  <p className="text-white/70 text-xs">
                    Examples: Eastron SDM series (standard), Finder 7E series, Northern Design Cube
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Data Loggers and IoT Energy Monitors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                IoT Energy Monitoring Systems
              </h3>
              <p className="text-white mb-4">
                Modern IoT energy monitors combine local measurement with cloud connectivity, enabling remote monitoring, alerts, and advanced analytics.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-elec-yellow mb-2">Entry Level</h4>
                  <p className="text-white text-sm mb-2">Single circuit, basic monitoring</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>- Shelly EM (£30-50)</li>
                    <li>- Emporia Vue (£80-150)</li>
                    <li>- Sense Energy Monitor (£250)</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-elec-yellow mb-2">Professional</h4>
                  <p className="text-white text-sm mb-2">Multi-circuit, business features</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>- Schneider PowerTag (£150-300/pt)</li>
                    <li>- Carlo Gavazzi EM series</li>
                    <li>- Socomec Diris series</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-elec-yellow mb-2">Enterprise</h4>
                  <p className="text-white text-sm mb-2">Full energy management platform</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>- Schneider EcoStruxure</li>
                    <li>- Siemens SENTRON</li>
                    <li>- ABB Ability</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-1">Connectivity Considerations</h4>
                <p className="text-white text-sm">
                  Consider network infrastructure before specifying IoT monitors. Options include WiFi, Ethernet, Modbus TCP/RTU, BACnet, LoRaWAN, and cellular (4G/5G). For industrial environments, wired protocols are more reliable. Always plan for local data buffering in case of connectivity loss.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3">Standalone Data Loggers</h3>
              <p className="text-white mb-4">
                For temporary monitoring campaigns or locations without network connectivity, standalone data loggers store measurements locally for later retrieval.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Key Selection Criteria</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li>- Number of channels needed</li>
                    <li>- Sampling rate (1 second to 15 minutes)</li>
                    <li>- Memory capacity and recording duration</li>
                    <li>- Battery life for portable use</li>
                    <li>- Data export options (USB, SD, cloud)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Recommended Models</h4>
                  <ul className="text-white text-sm space-y-1">
                    <li><strong>Onset HOBO:</strong> Industry standard, excellent software</li>
                    <li><strong>Tinytag:</strong> UK manufactured, robust</li>
                    <li><strong>Elcomponent Microlite:</strong> Good value, easy setup</li>
                    <li><strong>Dent ELITEpro:</strong> Three-phase power logging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Selecting the Right Equipment for the Job
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Equipment Selection Framework
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Step 1: Define the Objective</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span>Billing/cost allocation = MID-approved meter</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span>Energy audit = Portable analyser + logger</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span>Power quality issues = PQ analyser</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span>Ongoing monitoring = Fixed/IoT system</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Step 2: Assess the Installation</h4>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Wrench className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Access:</strong> New install (solid CTs) vs retrofit (split-core/Rogowski)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Current levels:</strong> Size CTs with 20-30% headroom above maximum expected load</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Phases:</strong> Single-phase, three-phase 3-wire, or three-phase 4-wire configuration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Wrench className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Space:</strong> DIN rail capacity in distribution board</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Step 3: Consider Accuracy Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2 px-3 text-elec-yellow">Application</th>
                          <th className="text-left py-2 px-3 text-elec-yellow">Meter Class</th>
                          <th className="text-left py-2 px-3 text-elec-yellow">CT Class</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">Fiscal/billing</td>
                          <td className="py-2 px-3">0.5 or better</td>
                          <td className="py-2 px-3">0.5 or 0.5S</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">Cost allocation</td>
                          <td className="py-2 px-3">1</td>
                          <td className="py-2 px-3">1</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">Energy management</td>
                          <td className="py-2 px-3">1 or 2</td>
                          <td className="py-2 px-3">1</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">Indicative only</td>
                          <td className="py-2 px-3">2 or 3</td>
                          <td className="py-2 px-3">3</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <PoundSterling className="w-5 h-5" />
                Budget Planning Guide
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white">Basic clamp meter (True RMS)</span>
                  <span className="text-elec-yellow">£100-300</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white">Professional power clamp</span>
                  <span className="text-elec-yellow">£300-600</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white">Portable power analyser</span>
                  <span className="text-elec-yellow">£800-4,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white">Fixed power quality meter</span>
                  <span className="text-elec-yellow">£500-3,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white">Sub-meter with CTs (per circuit)</span>
                  <span className="text-elec-yellow">£80-250</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white">IoT monitoring system (basic)</span>
                  <span className="text-elec-yellow">£200-500</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
            <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6" />
              Quick Reference Card
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">CT Selection Rules</h4>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>CT ratio = next size above max load current</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Verify burden rating matches meter input</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Check accuracy class for application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Match K-L orientation for correct polarity</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Accuracy Classes (BS EN 62053)</h4>
                <ul className="text-white text-sm space-y-2">
                  <li><strong>Class 0.2S/0.5S:</strong> Revenue metering, high accuracy</li>
                  <li><strong>Class 0.5/1:</strong> Commercial sub-metering</li>
                  <li><strong>Class 2:</strong> General energy management</li>
                  <li><strong>Class 3:</strong> Indicative measurements only</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Essential Safety Checks</h4>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Never open-circuit CT secondaries under load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Use appropriate PPE for live work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Verify voltage rating of all equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Follow GS38 for test instrument leads</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Leading UK Brands</h4>
                <ul className="text-white text-sm space-y-2">
                  <li><strong>Fluke:</strong> Industry standard for portable instruments</li>
                  <li><strong>Chauvin Arnoux:</strong> Excellent power quality analysers</li>
                  <li><strong>Hioki:</strong> High-quality Japanese manufacturer</li>
                  <li><strong>Megger:</strong> Strong UK presence and support</li>
                  <li><strong>Schneider Electric:</strong> Enterprise monitoring systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Section Quiz</h3>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs Section */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" asChild className="text-white hover:text-elec-yellow hover:bg-transparent">
            <Link to="../section-3" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Section 3
            </Link>
          </Button>
          <Button asChild className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../section-5" className="flex items-center gap-2">
              Next: Section 5
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule2Section4;
