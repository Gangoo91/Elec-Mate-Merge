/**
 * Level 3 Module 2 Section 2.5 - Smart Meters and Energy Monitoring
 *
 * Understanding smart metering systems, energy monitoring devices, and data analysis for consumption optimization
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Smart Meters and Energy Monitoring - Level 3 Module 2 Section 2.5";
const DESCRIPTION = "Understanding smart metering systems, energy monitoring devices, CT clamps, sub-metering, and data analysis for consumption optimization.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the main advantage of smart meters over traditional meters?",
    options: [
      "They are cheaper to install",
      "They provide real-time data and automatic readings to the supplier",
      "They use less electricity",
      "They last longer"
    ],
    correctIndex: 1,
    explanation: "Smart meters automatically send consumption data to energy suppliers, eliminating estimated bills. They also provide real-time usage information to customers through in-home displays."
  },
  {
    id: "check-2",
    question: "What does a CT clamp measure?",
    options: [
      "Voltage only",
      "Power factor",
      "Current flowing through a conductor without breaking the circuit",
      "Earth loop impedance"
    ],
    correctIndex: 2,
    explanation: "Current Transformer (CT) clamps measure current by sensing the magnetic field around a conductor. They can be fitted around live cables without disconnection, making them ideal for monitoring."
  },
  {
    id: "check-3",
    question: "What is 'sub-metering' used for?",
    options: [
      "Measuring underground cables",
      "Monitoring specific circuits, areas, or equipment separately from the main meter",
      "Testing meter accuracy",
      "Reducing the main meter reading"
    ],
    correctIndex: 1,
    explanation: "Sub-metering allows monitoring of individual circuits, departments, or pieces of equipment. This helps identify where energy is being used and enables allocation of costs or identification of waste."
  },
  {
    id: "check-4",
    question: "What communication technology do SMETS2 smart meters use?",
    options: [
      "WiFi connection to the home broadband",
      "The DCC (Data Communications Company) national network",
      "Mobile phone connection only",
      "Powerline communication through the mains"
    ],
    correctIndex: 1,
    explanation: "SMETS2 meters communicate via the Data Communications Company (DCC) network, a secure national infrastructure. This allows switching suppliers while keeping the smart functionality, unlike earlier SMETS1 meters."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "SMETS stands for:",
    options: [
      "Smart Meter Equipment Technical Specification",
      "Standard Metering Equipment Technology System",
      "Smart Meter Energy Transfer System",
      "Supplier Managed Energy Tracking Service"
    ],
    correctAnswer: 0,
    explanation: "SMETS (Smart Metering Equipment Technical Specification) defines the standards for smart meters. SMETS2 is the current standard, featuring national network connectivity and supplier interoperability."
  },
  {
    id: 2,
    question: "The In-Home Display (IHD) provided with smart meters shows:",
    options: [
      "Only monthly totals",
      "Real-time and historical energy consumption and costs",
      "Supplier contact details only",
      "Weather forecasts"
    ],
    correctAnswer: 1,
    explanation: "The IHD shows real-time consumption in kW and cost, plus historical data. This helps customers understand and modify their energy usage patterns to reduce bills."
  },
  {
    id: 3,
    question: "Which type of CT clamp would be used for monitoring a single-phase supply?",
    options: [
      "One CT clamp on the live conductor",
      "CT clamps on both live and neutral",
      "Three CT clamps",
      "No CT clamps are needed for single-phase"
    ],
    correctAnswer: 0,
    explanation: "For single-phase monitoring, one CT clamp is placed around the live conductor. The current flowing through live equals that returning through neutral in a normal installation."
  },
  {
    id: 4,
    question: "Energy monitoring systems typically measure:",
    options: [
      "Current only",
      "Voltage only",
      "Voltage, current, power, and often power factor",
      "Temperature only"
    ],
    correctAnswer: 2,
    explanation: "Comprehensive energy monitors measure voltage, current, power (real and apparent), and power factor. This data enables identification of inefficiencies and optimisation opportunities."
  },
  {
    id: 5,
    question: "What is the benefit of half-hourly (HH) metering data?",
    options: [
      "It's required for all properties",
      "It enables detailed analysis of consumption patterns and time-of-use billing",
      "It reduces the meter cost",
      "It eliminates the need for an IHD"
    ],
    correctAnswer: 1,
    explanation: "Half-hourly data reveals when energy is being used, enabling identification of peak periods, unusual consumption, and opportunities for load shifting to cheaper tariff periods."
  },
  {
    id: 6,
    question: "A Building Energy Management System (BEMS) typically:",
    options: [
      "Only monitors energy",
      "Controls HVAC, lighting, and other building systems while monitoring energy",
      "Replaces the electricity meter",
      "Is only for residential use"
    ],
    correctAnswer: 1,
    explanation: "BEMS integrates monitoring and control of building services - HVAC, lighting, and sometimes other systems. Energy monitoring is a key function, enabling optimisation and fault detection."
  },
  {
    id: 7,
    question: "The CAD (Consumer Access Device) in smart metering allows:",
    options: [
      "Replacement of the IHD",
      "Third-party devices to receive real-time data from the smart meter",
      "Remote meter reading only",
      "Supplier switching"
    ],
    correctAnswer: 1,
    explanation: "The CAD connects to the smart meter's HAN (Home Area Network) and allows approved third-party devices and apps to receive real-time consumption data for energy management purposes."
  },
  {
    id: 8,
    question: "For three-phase monitoring, how many CT clamps are typically required?",
    options: [
      "One",
      "Two",
      "Three (one per phase)",
      "Six"
    ],
    correctAnswer: 2,
    explanation: "Three-phase systems require three CT clamps, one on each phase conductor. The monitoring system calculates total power from the three separate phase measurements."
  },
  {
    id: 9,
    question: "Baseload in energy monitoring refers to:",
    options: [
      "The maximum power drawn",
      "The minimum continuous power consumption when a building is unoccupied",
      "The foundation of the building",
      "The main electrical supply"
    ],
    correctAnswer: 1,
    explanation: "Baseload is the constant background consumption when a building is not actively being used. High baseload often indicates equipment left running unnecessarily or inefficient systems."
  },
  {
    id: 10,
    question: "Energy monitoring can help identify which of the following issues?",
    options: [
      "Equipment running outside of operating hours",
      "Faulty or inefficient equipment drawing excess power",
      "Power factor problems",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Energy monitoring can reveal out-of-hours consumption, abnormal power draw from faulty equipment, and power factor issues. This data enables targeted improvements and cost savings."
  },
  {
    id: 11,
    question: "The HAN in smart metering stands for:",
    options: [
      "High Availability Network",
      "Home Area Network",
      "Household Allocation Number",
      "Heating and Air Network"
    ],
    correctAnswer: 1,
    explanation: "The Home Area Network (HAN) connects smart meter components within the premises - the electricity meter, gas meter, and IHD communicate via this secure local network."
  },
  {
    id: 12,
    question: "When installing CT clamps, which is essential?",
    options: [
      "Breaking the circuit to insert the CT",
      "Ensuring the CT is correctly oriented and sized for the cable",
      "Connecting the CT to the neutral conductor",
      "Using CTs rated below the expected current"
    ],
    correctAnswer: 1,
    explanation: "CT clamps must be correctly oriented (arrow pointing towards the load) and appropriately sized. An undersized CT will saturate and give inaccurate readings at higher currents."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can customers refuse a smart meter installation?",
    answer: "Currently customers can decline a smart meter. However, the government aims for all homes to be offered one by 2025. Smart meters become essential for time-of-use tariffs and some EV charging tariffs that offer lower rates."
  },
  {
    question: "What happens to the smart meter when switching suppliers?",
    answer: "SMETS2 meters maintain full smart functionality when switching suppliers as they communicate via the national DCC network. Earlier SMETS1 meters often lost smart features and operated as traditional meters after switching."
  },
  {
    question: "How accurate are CT clamp energy monitors?",
    answer: "Quality CT-based monitors typically achieve 1-2% accuracy when properly installed. Accuracy depends on CT quality, correct sizing, proper orientation, and voltage reference. Revenue-grade meters achieve higher accuracy (0.5% Class)."
  },
  {
    question: "Can I install energy monitoring on any circuit?",
    answer: "Yes, sub-metering can be added to any circuit using appropriate CTs and monitoring equipment. This requires working in distribution boards, so must be done by a competent person following safe isolation procedures."
  },
  {
    question: "What data can a smart meter share with third parties?",
    answer: "With customer consent, smart meter data can be shared via the CAD or through the DCC. This enables smart home systems, energy management apps, and demand-side response services. Customers control what data is shared."
  },
  {
    question: "How can energy monitoring data help reduce consumption?",
    answer: "Data reveals when and where energy is used, highlighting waste such as overnight baseload, out-of-hours equipment, and inefficient processes. Seeing real-time costs encourages behaviour change and enables verification of efficiency improvements."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Meters and Energy Monitoring
          </h1>
          <p className="text-white/80">
            Understanding metering systems and data-driven energy management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SMETS2:</strong> Current smart meter standard</li>
              <li><strong>IHD:</strong> Real-time consumption display</li>
              <li><strong>CT clamps:</strong> Non-invasive current monitoring</li>
              <li><strong>Sub-metering:</strong> Monitor individual circuits</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Smart meter with HAN communications unit</li>
              <li><strong>Use:</strong> CT clamps for circuit-level monitoring</li>
              <li><strong>Apply:</strong> Energy data for identifying waste</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Smart meter standards and communication",
              "CT clamps and monitoring equipment",
              "Sub-metering for detailed analysis",
              "Building energy management systems",
              "Data analysis for consumption optimization",
              "Integrating monitoring with smart systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Smart Metering Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart meters represent a fundamental shift in energy measurement and management. Unlike traditional meters that simply accumulate consumption, smart meters provide detailed, time-stamped data and two-way communication with energy suppliers and in-home systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SMETS2 Smart Meter Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electricity meter:</strong> Measures consumption with 30-minute granularity</li>
                <li><strong>Communications hub:</strong> Connects to DCC national network</li>
                <li><strong>HAN (Home Area Network):</strong> Local wireless network linking devices</li>
                <li><strong>IHD (In-Home Display):</strong> Shows real-time and historical usage</li>
                <li><strong>Gas meter (if applicable):</strong> Connected via HAN to electricity meter</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> SMETS2 meters communicate via the DCC network, not home broadband. This ensures continued operation during internet outages and enables supplier switching without losing smart functionality.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            CT Clamps and Monitoring Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current Transformer (CT) clamps enable non-invasive current measurement by sensing the magnetic field around a conductor. Combined with voltage sensing, they provide the basis for most energy monitoring systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Clamp Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Split-core:</strong> Can be fitted without disconnection</li>
                  <li><strong>Solid-core:</strong> Cable must pass through</li>
                  <li><strong>Rogowski coil:</strong> Flexible for large cables</li>
                  <li>Various current ratings (e.g., 100A, 200A, 400A)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct orientation (load direction arrow)</li>
                  <li>CT sized for expected current</li>
                  <li>Clean closure of split-core types</li>
                  <li>Voltage reference for power calculation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Installing a whole-house energy monitor requires a CT clamp on the meter tails (live conductor) and a voltage reference connection. The monitor calculates power from the product of current and voltage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sub-Metering and Circuit Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sub-metering extends monitoring beyond the main supply to individual circuits, areas, or equipment. This granular data enables identification of specific consumption patterns, cost allocation, and targeted efficiency improvements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Sub-Metering Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Commercial:</strong> Tenant billing, departmental allocation</li>
                <li><strong>Industrial:</strong> Process monitoring, equipment efficiency</li>
                <li><strong>Landlord metering:</strong> Individual unit consumption</li>
                <li><strong>EV charging:</strong> Separate metering for billing</li>
                <li><strong>Renewable monitoring:</strong> Solar PV generation tracking</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Identify Waste</p>
                <p className="text-white/90 text-xs">Find out-of-hours consumption</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Allocate Costs</p>
                <p className="text-white/90 text-xs">Bill tenants accurately</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Verify Savings</p>
                <p className="text-white/90 text-xs">Measure efficiency improvements</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Data Analysis and Smart Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The value of energy monitoring lies in data analysis and action. Modern systems collect vast amounts of data - turning this into actionable insights requires understanding of consumption patterns, benchmarking, and integration with building systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Analysis Metrics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Baseload:</strong> Minimum consumption when unoccupied</li>
                <li><strong>Peak demand:</strong> Maximum power draw</li>
                <li><strong>Load profile:</strong> Consumption pattern over time</li>
                <li><strong>Power factor:</strong> Efficiency of power usage</li>
                <li><strong>Anomaly detection:</strong> Unusual consumption events</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A commercial building with high overnight baseload might discover server room cooling running inefficiently, kitchen equipment left on, or lighting timers set incorrectly. Without monitoring data, this waste would go unnoticed.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Smart meters and monitoring enable time-of-use tariffs, demand response participation, and integration with home automation systems for automated energy optimization.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Energy Monitors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Select CT clamps rated for the expected maximum current</li>
                <li>Ensure correct CT orientation (load direction arrow)</li>
                <li>Position CTs where cables are accessible and secure</li>
                <li>Provide voltage reference for accurate power calculation</li>
                <li>Consider communication method (WiFi, wired, LoRaWAN)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Helping Customers Use Data</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain the IHD display and what the readings mean</li>
                <li>Show how to identify high-consumption appliances</li>
                <li>Explain time-of-use tariff opportunities</li>
                <li>Recommend CAD device for smart home integration</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong CT size</strong> - Undersized CTs saturate and give wrong readings</li>
                <li><strong>CT orientation</strong> - Reversed CT shows negative power readings</li>
                <li><strong>Missing voltage reference</strong> - Can only measure current, not power</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Smart Meter Data</p>
                <ul className="space-y-0.5">
                  <li>Half-hourly consumption data</li>
                  <li>Real-time via IHD or CAD</li>
                  <li>DCC network communication (SMETS2)</li>
                  <li>HAN for local device connectivity</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CT Clamp Selection</p>
                <ul className="space-y-0.5">
                  <li>Split-core for retrofit installation</li>
                  <li>Size for max expected current</li>
                  <li>Match output to monitor input</li>
                  <li>Check orientation when fitting</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2">
              Back to Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section2_5;
