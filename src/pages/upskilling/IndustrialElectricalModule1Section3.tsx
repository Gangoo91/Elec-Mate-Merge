import { ArrowLeft, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const TITLE = "MCC Panels and Switchgear Intro - Industrial Electrical Module 1.3";
const DESCRIPTION = "Learn about Motor Control Centres (MCC), switchgear types (ACB, MCCB, MCB), bus bar systems, BS EN 61439 forms of separation, arc flash hazards, and maintenance requirements for industrial electrical systems.";

const quickCheckQuestions = [
  {
    id: "qc1-mcc-section3",
    question: "According to BS EN 61439, which Form of separation provides the highest level of segregation between functional units?",
    options: ["Form 1", "Form 2b", "Form 3b", "Form 4b"],
    correctIndex: 3,
    explanation: "Form 4b provides the highest level of separation with segregation of busbars from functional units, separation of all functional units from each other, AND separation of terminals from functional units. This offers maximum protection for maintenance and fault containment."
  },
  {
    id: "qc2-mcc-section3",
    question: "What does the kA rating on a circuit breaker indicate?",
    options: [
      "Maximum continuous current capacity",
      "Prospective fault current the device can safely interrupt",
      "Voltage rating of the device",
      "Power factor correction capability"
    ],
    correctIndex: 1,
    explanation: "The kA (kiloampere) rating indicates the maximum prospective fault current that the circuit breaker can safely interrupt without damage. This must exceed the calculated fault level at the installation point to ensure safe operation during short-circuit conditions."
  },
  {
    id: "qc3-mcc-section3",
    question: "At what incident energy level (cal/cm squared) does arc flash PPE Category 2 begin according to IEEE 1584?",
    options: [
      "1.2 cal/cm squared",
      "4 cal/cm squared",
      "8 cal/cm squared",
      "25 cal/cm squared"
    ],
    correctIndex: 1,
    explanation: "PPE Category 2 begins at 4 cal/cm squared and extends to 8 cal/cm squared. Category 1 covers 1.2-4 cal/cm squared, Category 3 covers 8-25 cal/cm squared, and Category 4 covers 25-40 cal/cm squared. Above 40 cal/cm squared, live work is prohibited."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary function of a Motor Control Centre (MCC)?",
    options: [
      "To generate electrical power for motors",
      "To centralise motor starters, protection devices, and control equipment in one assembly",
      "To convert AC power to DC for motor operation",
      "To measure power consumption only"
    ],
    correctAnswer: 1,
    explanation: "An MCC centralises motor starters, protection devices, and control equipment in a unified assembly for efficient industrial motor control."
  },
  {
    id: 2,
    question: "Which type of circuit breaker is typically used for main incoming supplies rated above 800A?",
    options: [
      "MCB (Miniature Circuit Breaker)",
      "MCCB (Moulded Case Circuit Breaker)",
      "ACB (Air Circuit Breaker)",
      "RCD (Residual Current Device)"
    ],
    correctAnswer: 2,
    explanation: "ACBs (Air Circuit Breakers) handle 800A-6300A and are used for main incomers due to their high current capacity and adjustable protection settings."
  },
  {
    id: 3,
    question: "In BS EN 61439, what does Form 2b separation provide that Form 2a does not?",
    options: [
      "Separation of busbars from functional units",
      "Separation of terminals from busbars",
      "Separation between functional units",
      "No internal separation at all"
    ],
    correctAnswer: 1,
    explanation: "Form 2b additionally provides separation of terminals from busbars, while Form 2a only separates busbars from functional units."
  },
  {
    id: 4,
    question: "What material is commonly used for bus bars in MCC panels due to its conductivity?",
    options: ["Aluminium only", "Steel", "Copper or aluminium", "Brass"],
    correctAnswer: 2,
    explanation: "Both copper and aluminium are commonly used for bus bars, with copper offering higher conductivity and aluminium being lighter and more economical."
  },
  {
    id: 5,
    question: "What communication protocol is commonly used in intelligent switchgear for Ethernet-based SCADA integration?",
    options: ["Modbus RTU", "PROFIBUS", "IEC 61850 / Modbus TCP", "HART"],
    correctAnswer: 2,
    explanation: "IEC 61850 and Modbus TCP are commonly used for Ethernet-based SCADA integration in modern intelligent switchgear."
  },
  {
    id: 6,
    question: "What is the working distance typically used for arc flash calculations at an MCC?",
    options: ["300mm", "455mm (18 inches)", "610mm (24 inches)", "900mm"],
    correctAnswer: 1,
    explanation: "455mm (18 inches) is the standard working distance for arc flash calculations at MCCs per IEEE 1584."
  },
  {
    id: 7,
    question: "According to UK regulations, at what interval should fixed electrical installations be inspected and tested in industrial environments?",
    options: [
      "Every 6 months",
      "Annually",
      "Every 3-5 years depending on environment",
      "Every 10 years"
    ],
    correctAnswer: 2,
    explanation: "Industrial installations should be inspected every 3-5 years depending on the environment, with more critical or hazardous installations requiring more frequent inspection."
  },
  {
    id: 8,
    question: "What does Icw represent in switchgear specifications?",
    options: [
      "Ultimate breaking capacity",
      "Rated short-time withstand current",
      "Rated operational current",
      "Conditional short-circuit current"
    ],
    correctAnswer: 1,
    explanation: "Icw is the rated short-time withstand current - the current the device can carry for a specified time (typically 1 second) without damage."
  },
  {
    id: 9,
    question: "Which test is performed on circuit breakers to verify they will trip at the correct current values?",
    options: [
      "Insulation resistance test",
      "Primary injection test",
      "Earth loop impedance test",
      "Polarity test"
    ],
    correctAnswer: 1,
    explanation: "Primary injection testing injects high current through the main contacts to verify the complete protection system operates at the correct values."
  },
  {
    id: 10,
    question: "What minimum arc rating (ATPV) must PPE have for Category 3 arc flash protection?",
    options: ["4 cal/cm squared", "8 cal/cm squared", "25 cal/cm squared", "40 cal/cm squared"],
    correctAnswer: 2,
    explanation: "PPE Category 3 requires a minimum ATPV rating of 25 cal/cm squared to protect against incident energies of 8-25 cal/cm squared."
  }
];

const faqs = [
  {
    question: "What is the difference between withdrawable and fixed MCC units?",
    answer: "Withdrawable (draw-out) units can be completely removed from the MCC for maintenance or replacement without de-energising the entire panel. They have test and isolated positions. Fixed units are permanently wired and require the section to be isolated for any work. Withdrawable units cost more but offer greater flexibility and reduced downtime."
  },
  {
    question: "How do I determine the required fault rating for switchgear?",
    answer: "The fault rating must exceed the prospective fault current (PFC) at the installation point. This is calculated using transformer impedance, cable impedance, and supply characteristics. For example, a 1000kVA transformer at 400V with 5% impedance gives approximately 29kA fault current. Always allow a safety margin and consider future capacity increases."
  },
  {
    question: "What are the key differences between ACB, MCCB, and MCB?",
    answer: "MCBs handle up to 125A with fault ratings to 10kA for final circuits. MCCBs cover 16A-1600A with fault ratings to 150kA for sub-main distribution. ACBs handle 800A-6300A with fault ratings to 150kA+ for main incomers. ACBs offer advanced protection settings and can be withdrawable."
  },
  {
    question: "How often should thermographic surveys be performed on MCC panels?",
    answer: "Industry best practice recommends annual thermographic surveys for MCCs under normal conditions. High-criticality installations or those with high harmonic content should be surveyed every 6 months. Surveys should also be conducted after significant load changes or following maintenance work."
  },
  {
    question: "What PPE is required for racking in/out circuit breakers?",
    answer: "Racking operations on energised equipment require arc flash PPE based on the calculated incident energy. Typically this includes: arc-rated face shield (minimum 8 cal/cm squared), arc-rated coveralls or switching suit, arc-rated gloves, safety glasses, and hearing protection. Remote racking devices can eliminate the hazard entirely."
  },
  {
    question: "What is the purpose of forms of separation in switchgear assemblies?",
    answer: "Forms of separation (BS EN 61439) define the degree of internal compartmentalisation. Higher forms allow maintenance on individual units while others remain energised, contain arc faults to smaller areas, and improve safety. Form 4 is typically specified for critical installations requiring maximum protection."
  }
];

const IndustrialElectricalModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-1">
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
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            MCC Panels and Switchgear Intro
          </h1>
          <p className="text-white/80">
            Motor Control Centres, switchgear selection, bus bar systems, and arc flash safety
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>MCC:</strong> Centralised motor control and protection assembly</li>
              <li><strong>Switchgear:</strong> MCB, MCCB, ACB for different current ranges</li>
              <li><strong>Forms:</strong> BS EN 61439 separation levels (1-4)</li>
              <li><strong>Arc Flash:</strong> PPE categories based on incident energy</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ACB:</strong> 800A-6300A for main incomers</li>
              <li><strong>MCCB:</strong> 16A-1600A for sub-mains</li>
              <li><strong>Form 4b:</strong> Highest level of separation</li>
              <li><strong>&gt;40 cal/cm sq:</strong> Live work prohibited</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand MCC architecture and components",
              "Select appropriate switchgear (ACB, MCCB, MCB)",
              "Apply BS EN 61439 forms of separation",
              "Identify bus bar construction and materials",
              "Assess arc flash hazards and PPE requirements",
              "Plan maintenance and testing schedules"
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

        {/* Section 1: MCC Architecture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Motor Control Centre (MCC) Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>Motor Control Centre (MCC)</strong> is a floor-mounted assembly containing motor starters, variable speed drives, protection devices, and control equipment in a unified enclosure. MCCs are the backbone of industrial electrical distribution, providing centralised control and protection for multiple motors.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Incoming feeder section (ACB/MCCB)</li>
                  <li>Horizontal and vertical busbars</li>
                  <li>Motor starter units (DOL, Star-Delta, Soft Start, VSD)</li>
                  <li>Protection relays and metering</li>
                  <li>Control wiring and marshalling</li>
                  <li>Earthing and neutral bars</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCC Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>BS EN 61439-1: General rules</li>
                  <li>BS EN 61439-2: Power switchgear assemblies</li>
                  <li>IEC 60947: Low-voltage switchgear</li>
                  <li>IP ratings per BS EN 60529</li>
                  <li>EMC compliance per BS EN 61000</li>
                  <li>Arc fault containment to IEC 61641</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fixed vs Withdrawable Units</p>
              <p className="text-sm text-white/90">
                Withdrawable units allow circuit breakers and starters to be racked into test, isolated, or removed positions without affecting adjacent units. This reduces downtime and improves safety during maintenance. Fixed units are more economical but require section isolation for any work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Switchgear Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Switchgear Types and Ratings (ACB, MCCB, MCB)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct switchgear requires understanding current ratings, fault levels, and application requirements. The three main types each serve specific purposes in the distribution hierarchy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Switchgear Comparison</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>MCB:</strong> 0.5A-125A, up to 10kA fault rating, final circuits, fixed curves</li>
                <li><strong>MCCB:</strong> 16A-1600A, up to 150kA fault rating, sub-mains/feeders, some adjustable</li>
                <li><strong>ACB:</strong> 800A-6300A, up to 150kA+ fault rating, main incomer, fully adjustable, withdrawable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Rating Parameters</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Icu:</strong> Ultimate short-circuit breaking capacity - maximum fault current the device can interrupt (may sustain damage)</li>
                <li><strong>Ics:</strong> Service short-circuit breaking capacity - fault current device can interrupt and remain serviceable</li>
                <li><strong>Icw:</strong> Rated short-time withstand current - current device can carry for specified time (typically 1s) without damage</li>
                <li><strong>Icm:</strong> Rated short-circuit making capacity - maximum asymmetric current device can close onto</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Bus Bar Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bus Bar Systems and Forms of Separation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bus bars distribute power from the incomer to individual outgoing circuits. <strong>BS EN 61439</strong> defines Forms of internal separation that determine how functional units, busbars, and terminals are segregated within the assembly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Forms of Separation (BS EN 61439)</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Form 1:</strong> No internal separation - opening any door exposes all live parts. Lowest cost.</li>
                <li><strong>Form 2a:</strong> Busbars separated from functional units. Allows access to units with busbars energised.</li>
                <li><strong>Form 2b:</strong> Form 2a plus terminals separated from busbars.</li>
                <li><strong>Form 3a:</strong> Separation between functional units AND from busbars. Individual units can be accessed independently.</li>
                <li><strong>Form 3b:</strong> Form 3a plus terminals separated from busbars.</li>
                <li><strong>Form 4a:</strong> All Form 3a separation plus terminals separated from functional units.</li>
                <li><strong>Form 4b:</strong> Form 4a plus terminals separated from each other. Maximum protection and arc fault containment.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Copper Bus Bars</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Higher conductivity (100% IACS)</li>
                  <li>Better for high fault levels</li>
                  <li>Smaller cross-section required</li>
                  <li>Higher material cost</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Aluminium Bus Bars</p>
                <ul className="text-sm text-white space-y-1">
                  <li>61% conductivity vs copper</li>
                  <li>Lighter weight</li>
                  <li>Lower cost</li>
                  <li>Requires larger cross-section</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Intelligent Switchgear */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Intelligent Switchgear and Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern MCCs incorporate intelligent electronic devices (IEDs) that provide advanced protection, monitoring, and communication capabilities. This enables integration with SCADA systems, predictive maintenance, and energy management.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Modbus RTU:</strong> Serial RS485</li>
                  <li><strong>Modbus TCP:</strong> Ethernet based</li>
                  <li><strong>PROFIBUS:</strong> Industrial fieldbus</li>
                  <li><strong>PROFINET:</strong> Industrial Ethernet</li>
                  <li><strong>IEC 61850:</strong> Substation automation</li>
                  <li><strong>EtherNet/IP:</strong> CIP protocol</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitoring Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Real-time current, voltage, power</li>
                  <li>Energy metering (kWh, kVArh)</li>
                  <li>Power quality (THD, harmonics)</li>
                  <li>Temperature monitoring</li>
                  <li>Trip event recording</li>
                  <li>Breaker wear monitoring</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IEC 61850 Benefits</p>
              <p className="text-sm text-white/90">
                IEC 61850 provides standardised data modelling, high-speed peer-to-peer GOOSE messaging for protection schemes, and sampled values for digital instrument transformers. This enables faster fault clearance, reduced wiring, and improved interoperability between vendors.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Arc Flash Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Arc Flash Hazards and PPE Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An arc flash is an explosive release of energy caused by an electrical fault through air. Temperatures can reach 20,000 degrees C, causing severe burns, blast injuries, and fatalities. <strong>IEEE 1584</strong> provides methods for calculating incident energy levels.
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Arc Flash Hazards</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Thermal burns from radiant heat and hot gases</li>
                    <li>Pressure wave causing blast injuries</li>
                    <li>Molten metal and shrapnel projectiles</li>
                    <li>Intense light causing eye damage</li>
                    <li>Toxic fumes from vaporised materials</li>
                    <li>Hearing damage from explosive sound</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">PPE Categories (IEEE 1584)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category 1:</strong> 1.2-4 cal/cm sq - AR shirt/trousers, safety glasses, face shield (min 4 ATPV)</li>
                <li><strong>Category 2:</strong> 4-8 cal/cm sq - AR shirt/trousers, flash suit hood, face shield (min 8 ATPV)</li>
                <li><strong>Category 3:</strong> 8-25 cal/cm sq - AR flash suit, hood with face shield, AR gloves (min 25 ATPV)</li>
                <li><strong>Category 4:</strong> 25-40 cal/cm sq - Multi-layer AR flash suit, full hood, AR gloves (min 40 ATPV)</li>
                <li><strong>&gt;40 cal/cm sq:</strong> Live work NOT permitted</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Standards for Arc Flash PPE</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IEC 61482-2:</strong> Arc flash protective clothing testing</li>
                <li><strong>GS38:</strong> HSE guidance on electrical test equipment</li>
                <li><strong>BS EN 166:</strong> Eye protection specifications</li>
                <li><strong>BS EN 60903:</strong> Electrical insulating gloves</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Maintenance and Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Maintenance and Testing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular maintenance ensures switchgear operates safely and reliably. BS 7671 and manufacturer guidelines specify testing requirements. Maintenance regimes should be based on criticality, environment, and operating conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routine Inspections</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Visual inspection for damage/contamination</li>
                  <li>Thermographic survey (annually)</li>
                  <li>Check ventilation and cooling</li>
                  <li>Verify indicator lights and displays</li>
                  <li>Inspect door seals and IP rating</li>
                  <li>Check earthing connections</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Periodic Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Insulation resistance (minimum 1M ohm)</li>
                  <li>Contact resistance measurement</li>
                  <li>Primary injection testing</li>
                  <li>Secondary injection for protection</li>
                  <li>Breaker timing tests</li>
                  <li>Functional operation checks</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inspection Frequencies (BS 7671 Table 3A)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Industrial:</strong> 3 years maximum</li>
                <li><strong>Hospitals/Medical:</strong> 1 year</li>
                <li><strong>Fire alarms/Emergency lighting:</strong> 1 year</li>
                <li><strong>Hazardous areas:</strong> 1 year</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Primary Injection Testing</p>
              <p className="text-sm text-white/90">
                Primary injection tests verify that circuit breakers trip at the correct current values by injecting high current through the main contacts. This tests the complete protection system including CTs, wiring, and trip units. Typically performed during commissioning and every 3-6 years depending on criticality.
              </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Switchgear</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify the prospective fault current at the installation point</li>
                <li>Select switchgear with fault rating exceeding the calculated PFC</li>
                <li>Consider future load growth when sizing</li>
                <li>Specify appropriate form of separation for the application</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Working on MCCs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always conduct an arc flash risk assessment</li>
                <li>Wear appropriate PPE for the calculated incident energy</li>
                <li>Use remote racking devices where available</li>
                <li>Follow lockout/tagout procedures rigorously</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underrating fault capacity</strong> - always verify PFC and allow safety margin</li>
                <li><strong>Ignoring arc flash hazards</strong> - conduct studies and provide appropriate PPE</li>
                <li><strong>Skipping thermographic surveys</strong> - hot spots indicate developing faults</li>
                <li><strong>Neglecting breaker maintenance</strong> - trip units can drift over time</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Forms of Separation</p>
                <ul className="space-y-0.5">
                  <li>Form 1: No internal separation</li>
                  <li>Form 2: Busbars separated from units</li>
                  <li>Form 3: + Separation between units</li>
                  <li>Form 4: + Terminals separated</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Switchgear Ratings</p>
                <ul className="space-y-0.5">
                  <li>In: Rated current</li>
                  <li>Icu: Ultimate breaking capacity</li>
                  <li>Ics: Service breaking capacity</li>
                  <li>Icw: Short-time withstand</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61439: LV assemblies</li>
                  <li>IEC 60947: LV devices</li>
                  <li>IEEE 1584: Arc flash calcs</li>
                  <li>IEC 61482: Arc PPE testing</li>
                </ul>
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
            <Link to="/electrician/upskilling/industrial-electrical-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default IndustrialElectricalModule1Section3;
