import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Pump Maintenance and Troubleshooting - Renewable Energy Module 5";
const DESCRIPTION = "Learn about heat pump maintenance schedules, common fault diagnosis, performance optimisation, and troubleshooting techniques.";

const quickCheckQuestions = [
  {
    id: "hp-maintenance-interval",
    question: "What is the typical recommended maintenance interval for heat pumps?",
    options: ["Only when faulty", "Annual service inspection", "Monthly professional visits", "Every 5 years"],
    correctIndex: 1,
    explanation: "Heat pumps should have annual professional service inspections covering refrigerant, electrical, and hydraulic systems. More frequent checks for commercial systems."
  },
  {
    id: "hp-low-cop",
    question: "What commonly causes lower than expected COP?",
    options: ["New refrigerant", "Flow temperature set too high for conditions", "Oversized heat pump", "New filters"],
    correctIndex: 1,
    explanation: "High flow temperature is a common cause of poor COP. Every degree reduction in flow temperature can improve COP by 2-3%. Check weather compensation settings."
  },
  {
    id: "hp-short-cycling",
    question: "What indicates short cycling in a heat pump system?",
    options: ["Long run times", "Compressor starting and stopping frequently (under 10 minutes)", "Low electricity use", "Constant temperature"],
    correctIndex: 1,
    explanation: "Short cycling occurs when the compressor runs for less than 10 minutes before stopping, indicating oversizing, inadequate thermal mass, or flow issues."
  },
  {
    id: "hp-defrost-issue",
    question: "What might cause excessive defrost cycles on an ASHP?",
    options: ["Clear weather", "Blocked evaporator coil, failed sensor, or refrigerant issue", "New installation", "Underfloor heating"],
    correctIndex: 1,
    explanation: "Excessive defrost can result from blocked airflow, faulty defrost sensors, low refrigerant charge, or incorrect defrost settings. Check coil condition and sensor operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What should be checked during annual heat pump maintenance?",
    options: [
      "Only refrigerant levels",
      "Refrigerant pressures, electrical connections, filters, controls, and performance",
      "Just the outdoor unit",
      "Only water system"
    ],
    correctAnswer: 1,
    explanation: "Annual maintenance covers refrigerant system (pressures, leak check), electrical (connections, current), filters (clean/replace), controls (settings), and performance verification."
  },
  {
    id: 2,
    question: "What indicates a potential refrigerant leak?",
    options: [
      "Higher than normal performance",
      "Reduced heating capacity, icing on outdoor unit, lower suction pressure",
      "Faster heating response",
      "Louder operation"
    ],
    correctAnswer: 1,
    explanation: "Refrigerant loss causes reduced capacity, abnormal icing patterns, and low suction pressures. Leak detection and repair by F-Gas qualified person is required."
  },
  {
    id: 3,
    question: "What should you check if a heat pump trips the electrical supply?",
    options: [
      "Water temperature only",
      "Electrical connections, insulation, earth faults, and compressor condition",
      "Refrigerant colour",
      "Outdoor air temperature"
    ],
    correctAnswer: 1,
    explanation: "Supply trips can indicate: loose connections, insulation breakdown, earth faults, compressor issues, or undersized protection. Systematic electrical testing required."
  },
  {
    id: 4,
    question: "What causes high pressure faults in heat pumps?",
    options: [
      "Low ambient temperature",
      "Reduced condenser heat rejection - restricted flow, air lock, or fan failure",
      "New refrigerant charge",
      "Oversized system"
    ],
    correctAnswer: 1,
    explanation: "High pressure results from inability to reject heat: blocked condenser (ASHP), reduced water flow, air locks, failed circulation pump, or fan failure."
  },
  {
    id: 5,
    question: "What performance monitoring is recommended for heat pump systems?",
    options: [
      "No monitoring needed",
      "Track electricity consumption, heat delivery, and calculate actual SPF",
      "Only check annual bills",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Monitoring electricity input and heat output allows calculation of actual SPF (Seasonal Performance Factor), identifying degradation and optimisation opportunities."
  },
  {
    id: 6,
    question: "What might cause a heat pump to fail to start?",
    options: [
      "Good weather",
      "No power, control fault, safety lockout, or compressor failure",
      "Full system pressure",
      "Correct settings"
    ],
    correctAnswer: 1,
    explanation: "Failure to start can result from: no power supply, control board fault, safety lockout (high/low pressure, temperature), or compressor failure. Check error codes first."
  },
  {
    id: 7,
    question: "How should filter maintenance be performed on ASHPs?",
    options: [
      "No filter maintenance needed",
      "Clean outdoor unit coil and any inlet filters periodically",
      "Only check indoor filters",
      "Replace entire unit annually"
    ],
    correctAnswer: 1,
    explanation: "ASHP outdoor coils should be kept clear of debris and cleaned annually. Some units have accessible filters. Blocked coils reduce airflow and efficiency."
  },
  {
    id: 8,
    question: "What indicates a circulation pump failure?",
    options: [
      "Normal operation",
      "No flow, high delta T, overheating faults, or pump not running",
      "Low electricity bills",
      "Cold outdoor unit"
    ],
    correctAnswer: 1,
    explanation: "Pump failure causes no flow (check delta T), can trigger overheating protection, and is identifiable by checking pump operation (vibration, noise, power consumption)."
  },
  {
    id: 9,
    question: "What should be verified if hot water temperature is not reaching setpoint?",
    options: [
      "Only room temperature",
      "Cylinder thermostat, coil condition, flow rate, and heat pump output temperature",
      "Outdoor temperature",
      "Electricity tariff"
    ],
    correctAnswer: 1,
    explanation: "DHW issues can result from: thermostat fault, scaled/blocked coil, insufficient flow, heat pump not reaching required temperature, or undersized cylinder."
  },
  {
    id: 10,
    question: "When should a heat pump system be referred to manufacturer support?",
    options: [
      "Never needed",
      "Repeated faults, refrigerant issues, control board problems, or warranty claims",
      "Any maintenance query",
      "Only for new installations"
    ],
    correctAnswer: 1,
    explanation: "Refer to manufacturer for: recurring unresolved faults, refrigerant circuit issues beyond basic checks, control board failures, and warranty-related repairs."
  }
];

const faqs = [
  {
    question: "How do I know if my heat pump is performing properly?",
    answer: "Monitor electricity consumption versus heat delivered to calculate actual COP/SPF. Compare to manufacturer specifications. Check flow temperature matches weather compensation setting. Verify no excessive cycling and hot water reaches target temperature."
  },
  {
    question: "What causes a heat pump to ice up excessively?",
    answer: "Excessive icing can result from: defrost sensor failure, low refrigerant charge, blocked coil reducing airflow, incorrect defrost settings, or very humid conditions. Normal icing occurs but should clear during defrost cycles."
  },
  {
    question: "Why is my heat pump using more electricity than expected?",
    answer: "Higher than expected consumption often results from: flow temperature set too high, excessive defrost cycles, backup heating running frequently, poor building insulation, or undersized system struggling to meet demand. Review settings and operating conditions."
  },
  {
    question: "Can I service my own heat pump?",
    answer: "Basic maintenance (cleaning filters, checking pressures visually) can be done by competent persons. Refrigerant work requires F-Gas qualification. Electrical work requires appropriate competence. Annual professional service is recommended."
  },
  {
    question: "What are common causes of noise complaints?",
    answer: "Noise issues can result from: vibration transmission through structure, fan bearing wear, compressor issues, refrigerant noise (liquid slugging), or resonance. Check mounting isolation, component condition, and refrigerant charge."
  },
  {
    question: "How long should a heat pump last?",
    answer: "Quality heat pumps should last 15-20 years with proper maintenance. Compressors may need replacement around 10-15 years. Ground loops can last 50+ years. Regular maintenance extends component life significantly."
  }
];

const RenewableEnergyModule5Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maintenance and Troubleshooting
          </h1>
          <p className="text-white/80">
            Service procedures, fault diagnosis, and performance optimisation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Maintenance Schedule</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>User:</strong> Keep outdoor unit clear</li>
              <li><strong>Quarterly:</strong> Check pressures, filters</li>
              <li><strong>Annual:</strong> Full professional service</li>
              <li><strong>Records:</strong> Log all maintenance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Common Faults</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Low COP:</strong> Check flow temp settings</li>
              <li><strong>Short cycling:</strong> Buffer tank, sizing</li>
              <li><strong>Excess defrost:</strong> Coil/sensor check</li>
              <li><strong>No heat:</strong> Error codes first</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Implement maintenance schedules",
              "Diagnose common heat pump faults",
              "Interpret error codes and symptoms",
              "Optimise system performance",
              "Identify when to escalate issues",
              "Extend equipment lifespan"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Routine Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular maintenance ensures continued efficient operation, identifies developing problems early, and extends equipment lifespan.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">User Maintenance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Keep clear:</strong> Remove debris from around outdoor unit</li>
                <li><strong>Airflow:</strong> Ensure nothing blocks air circulation</li>
                <li><strong>Visual check:</strong> Look for obvious damage or ice build-up</li>
                <li><strong>Monitoring:</strong> Note any unusual operation or sounds</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Annual Service Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Refrigerant:</strong> Check pressures, leak test if indicated</li>
                <li><strong>Electrical:</strong> Connection tightness, current readings</li>
                <li><strong>Controls:</strong> Verify settings, update if needed</li>
                <li><strong>Filters:</strong> Clean or replace as required</li>
                <li><strong>Performance:</strong> Measure delta T, verify operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">GSHP Specific Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ground loop pressure:</strong> Verify maintained</li>
                <li><strong>Antifreeze:</strong> Test concentration annually</li>
                <li><strong>Circulation pump:</strong> Check operation and current</li>
                <li><strong>Strainer:</strong> Clean if fitted</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Performance Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the causes of poor performance enables targeted diagnosis and correction, improving customer satisfaction and system efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Low COP Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High flow temp:</strong> Check weather compensation curve</li>
                <li><strong>Excess defrost:</strong> Reduces heating time and adds load</li>
                <li><strong>Low refrigerant:</strong> Reduces heat transfer efficiency</li>
                <li><strong>Dirty coils:</strong> Restricts heat exchange</li>
                <li><strong>Backup heating:</strong> Electric backup running too often</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Insufficient Heating:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Undersizing:</strong> Heat pump too small for heat loss</li>
                <li><strong>Emitter issue:</strong> Radiators inadequate at flow temp</li>
                <li><strong>Control settings:</strong> Setpoints or curves wrong</li>
                <li><strong>Distribution:</strong> Blockage or air lock</li>
                <li><strong>Insulation:</strong> Building heat loss increased</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Short Cycling:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Oversizing:</strong> Heat pump too large for load</li>
                <li><strong>No buffer tank:</strong> Insufficient thermal mass</li>
                <li><strong>TRV issues:</strong> Too many closing simultaneously</li>
                <li><strong>Flow restriction:</strong> Pump or valve problem</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic fault diagnosis starts with error codes and symptoms, then works through likely causes from simple to complex.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Refrigerant System Faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High pressure:</strong> Condenser airflow, water flow, fan</li>
                <li><strong>Low pressure:</strong> Refrigerant leak, evaporator blocked</li>
                <li><strong>Compressor fault:</strong> Electrical or mechanical failure</li>
                <li><strong>Icing:</strong> Defrost failure, low charge, airflow</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrical Faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Supply trips:</strong> Earth fault, overload, loose connection</li>
                <li><strong>No start:</strong> Control fault, safety lockout</li>
                <li><strong>Communication:</strong> Sensor failure, wiring issue</li>
                <li><strong>Inverter:</strong> Drive fault codes, power quality</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hydraulic Faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No flow:</strong> Pump failure, air lock, closed valve</li>
                <li><strong>Low pressure:</strong> Leak, expansion vessel, fill valve</li>
                <li><strong>High delta T:</strong> Insufficient flow rate</li>
                <li><strong>Low delta T:</strong> Excessive flow, bypass open</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            ASHP Specific Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air source heat pumps have specific issues related to outdoor operation, defrost cycles, and environmental exposure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Defrost Problems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No defrost:</strong> Sensor failure, control issue</li>
                <li><strong>Continuous defrost:</strong> Faulty sensor, stuck valve</li>
                <li><strong>Ice build-up:</strong> Low charge, blocked coil, fan failure</li>
                <li><strong>Water drainage:</strong> Blocked drain, freezing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Environmental Issues:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Noise complaints:</strong> Check mounting, fan, compressor</li>
                <li><strong>Corrosion:</strong> Coastal location, coil condition</li>
                <li><strong>Debris:</strong> Leaves, cottonwood, dirt on coil</li>
                <li><strong>Snow/ice:</strong> Ensure clearance maintained</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Coil Cleaning Procedure</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolate power before cleaning</li>
                <li>Remove loose debris by hand or soft brush</li>
                <li>Rinse with low pressure water from inside out</li>
                <li>Use approved coil cleaner if heavily soiled</li>
                <li>Allow to dry before restoring power</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Performance Optimisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ongoing optimisation ensures the system continues to operate efficiently and meets customer expectations throughout its life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Settings Optimisation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Weather compensation:</strong> Adjust curve based on feedback</li>
                <li><strong>Schedules:</strong> Match to actual occupancy patterns</li>
                <li><strong>Setpoints:</strong> Balance comfort and efficiency</li>
                <li><strong>DHW timing:</strong> Optimise for cheap electricity periods</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">System Improvements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insulation:</strong> Building fabric improvements help</li>
                <li><strong>Emitters:</strong> Adding capacity reduces flow temp needed</li>
                <li><strong>Controls:</strong> Smart controls can improve scheduling</li>
                <li><strong>Tariffs:</strong> Time-of-use tariffs reduce costs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monitoring Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Performance tracking:</strong> Identify gradual degradation</li>
                <li><strong>Fault detection:</strong> Early warning of developing issues</li>
                <li><strong>Usage patterns:</strong> Optimise based on actual use</li>
                <li><strong>Comparison:</strong> Benchmark against expected values</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Diagnosing Faults</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with error codes and fault history</li>
                <li>Check simple things first (power, settings, filters)</li>
                <li>Compare measurements to commissioning baseline</li>
                <li>Document findings for future reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Performing Service</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow manufacturer service procedures</li>
                <li>Record all measurements on service report</li>
                <li>Update customer on any issues found</li>
                <li>Recommend any improvements identified</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring error codes</strong> - contain diagnostic information</li>
                <li><strong>Adding refrigerant without finding leak</strong> - masks problem</li>
                <li><strong>Changing settings without recording</strong> - can't revert</li>
                <li><strong>Skipping systematic checks</strong> - may miss root cause</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule5Section6;
