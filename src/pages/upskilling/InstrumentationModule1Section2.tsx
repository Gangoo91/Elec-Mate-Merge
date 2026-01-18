import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Where and Why Instrumentation Is Used - Instrumentation Module 1 Section 2";
const DESCRIPTION = "Explore instrumentation applications across HVAC, Process Control, BMS, and Renewable Energy systems with real-world examples and benefits.";

const quickCheckQuestions = [
  {
    id: "hvac-instrumentation",
    question: "What are two examples of instrumentation used in HVAC systems?",
    options: [
      "Temperature sensors and humidity sensors",
      "Light switches and door handles",
      "Paint and wallpaper",
      "Chairs and tables"
    ],
    correctIndex: 0,
    explanation: "HVAC systems commonly use temperature sensors, humidity sensors, pressure sensors, and flow meters for climate control and system monitoring."
  },
  {
    id: "bms-energy",
    question: "How does instrumentation in BMS help achieve energy savings?",
    options: [
      "By increasing power consumption",
      "Through occupancy sensors and automated lighting/HVAC control",
      "By running systems continuously",
      "Only for decoration purposes"
    ],
    correctIndex: 1,
    explanation: "BMS uses occupancy sensors, light sensors, and time schedules to automatically control lighting and HVAC systems, reducing energy consumption when spaces are unoccupied."
  },
  {
    id: "pressure-monitoring",
    question: "Why is pressure monitoring critical in process control?",
    options: [
      "For aesthetic reasons only",
      "To ensure safety, prevent equipment damage, and maintain product quality",
      "It's not important",
      "Only for legal documentation"
    ],
    correctIndex: 1,
    explanation: "Pressure monitoring prevents dangerous over-pressurisation, protects equipment from damage, ensures process efficiency, and maintains consistent product quality."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are two examples of instrumentation used in HVAC systems?",
    options: [
      "Temperature sensors and humidity sensors",
      "Light switches and door handles",
      "Paint and wallpaper",
      "Chairs and tables"
    ],
    correctAnswer: 0,
    explanation: "HVAC systems commonly use temperature sensors, humidity sensors, pressure sensors, and flow meters for climate control and system monitoring."
  },
  {
    id: 2,
    question: "How does instrumentation in BMS help achieve energy savings?",
    options: [
      "By increasing power consumption",
      "Through occupancy sensors and automated lighting/HVAC control",
      "By running systems continuously",
      "Only for decoration purposes"
    ],
    correctAnswer: 1,
    explanation: "BMS uses occupancy sensors, light sensors, and time schedules to automatically control lighting and HVAC systems, reducing energy consumption when spaces are unoccupied."
  },
  {
    id: 3,
    question: "Why is pressure monitoring critical in process control?",
    options: [
      "For aesthetic reasons only",
      "To ensure safety, prevent equipment damage, and maintain product quality",
      "It's not important",
      "Only for legal documentation"
    ],
    correctAnswer: 1,
    explanation: "Pressure monitoring prevents dangerous over-pressurisation, protects equipment from damage, ensures process efficiency, and maintains consistent product quality."
  },
  {
    id: 4,
    question: "What role does instrumentation play in solar energy systems?",
    options: [
      "No role at all",
      "Only for cleaning panels",
      "Monitoring power output, irradiance levels, and system performance",
      "Just for marketing purposes"
    ],
    correctAnswer: 2,
    explanation: "Solar systems use instrumentation to monitor power output, solar irradiance, panel temperature, system efficiency, and fault conditions for optimal performance."
  },
  {
    id: 5,
    question: "What is a universal benefit of instrumentation across all industries?",
    options: [
      "Increased complexity",
      "Higher costs only",
      "Improved safety and operational efficiency",
      "More manual work required"
    ],
    correctAnswer: 2,
    explanation: "All industries benefit from instrumentation through improved safety, enhanced operational efficiency, better product quality, and regulatory compliance."
  },
  {
    id: 6,
    question: "What percentage energy savings can HVAC optimisation typically achieve?",
    options: [
      "1-5%",
      "20-40%",
      "80-90%",
      "No savings possible"
    ],
    correctAnswer: 1,
    explanation: "Properly implemented HVAC instrumentation and control can achieve energy savings of 20-40% through optimised operation and demand-based control."
  },
  {
    id: 7,
    question: "What does a Building Management System (BMS) integrate?",
    options: [
      "Only lighting systems",
      "Multiple building services including HVAC, lighting, and security",
      "Only fire alarms",
      "Only access control"
    ],
    correctAnswer: 1,
    explanation: "BMS integrates multiple building services including HVAC, lighting, security, fire systems, and energy management for comprehensive building control."
  },
  {
    id: 8,
    question: "In wind energy systems, what do anemometers measure?",
    options: [
      "Temperature",
      "Wind speed",
      "Voltage",
      "Vibration"
    ],
    correctAnswer: 1,
    explanation: "Anemometers measure wind speed, which is critical for turbine control, power output prediction, and safety shutdown decisions in wind energy systems."
  },
  {
    id: 9,
    question: "What is the main purpose of safety instrumentation in process industries?",
    options: [
      "To increase production speed",
      "To protect personnel, equipment, and the environment from hazards",
      "To reduce equipment costs",
      "To simplify operations"
    ],
    correctAnswer: 1,
    explanation: "Safety instrumentation protects personnel, equipment, and the environment by detecting hazardous conditions and initiating appropriate protective actions."
  },
  {
    id: 10,
    question: "What does grid integration instrumentation monitor in renewable energy?",
    options: [
      "Only panel cleanliness",
      "Grid frequency, voltage, and power quality",
      "Only weather conditions",
      "Only equipment age"
    ],
    correctAnswer: 1,
    explanation: "Grid integration instrumentation monitors frequency, voltage, power quality, and reactive power to ensure renewable energy systems work safely with the electrical grid."
  }
];

const faqs = [
  {
    question: "Why do different industries need different types of instrumentation?",
    answer: "Each industry has unique operational challenges, safety regulations, and performance objectives. Process industries need high-temperature and pressure sensors, while HVAC focuses on comfort-related measurements. The instrumentation must match the specific environmental conditions and accuracy requirements of each application."
  },
  {
    question: "How does BMS instrumentation reduce energy costs?",
    answer: "BMS uses sensors to detect when spaces are unoccupied, adjusting HVAC and lighting accordingly. It monitors outdoor conditions to optimise heating/cooling, implements time-based schedules, and provides data for identifying energy waste. Typical savings range from 15-30% on energy bills."
  },
  {
    question: "What happens if process control instrumentation fails?",
    answer: "In process industries, instrumentation failures can result in safety hazards, environmental damage, production losses, and regulatory violations. That's why critical systems have redundant sensors, safety instrumented systems (SIS), and regular maintenance programmes to ensure reliability."
  },
  {
    question: "Why is renewable energy instrumentation important?",
    answer: "Renewable energy systems need instrumentation to maximise energy capture (tracking sun/wind conditions), ensure grid compatibility, predict maintenance needs, and verify performance. Without accurate instrumentation, systems cannot operate at peak efficiency or integrate safely with the grid."
  },
  {
    question: "What is predictive maintenance and how does instrumentation enable it?",
    answer: "Predictive maintenance uses instrumentation data (vibration, temperature, power consumption) to identify equipment problems before they cause failures. By trending sensor data, maintenance can be scheduled when needed rather than on fixed intervals, reducing downtime and costs."
  },
  {
    question: "How do smart buildings use instrumentation data?",
    answer: "Smart buildings analyse instrumentation data to automatically adjust conditions for comfort and efficiency, predict equipment failures, optimise energy use based on weather forecasts, and provide occupants with personalised environment control through mobile apps and interfaces."
  }
];

const InstrumentationModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-1">
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
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Where and Why Instrumentation Is Used
          </h1>
          <p className="text-white/80">
            Applications across HVAC, Process Control, BMS, and Renewable Energy
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>HVAC:</strong> Temperature, humidity, airflow control</li>
              <li><strong>Process:</strong> Pressure, flow, level, composition</li>
              <li><strong>BMS:</strong> Energy management, occupancy, security</li>
              <li><strong>Renewable:</strong> Performance monitoring, grid integration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Universal Benefits</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Safety:</strong> Preventing hazardous conditions</li>
              <li><strong>Efficiency:</strong> 20-40% energy savings possible</li>
              <li><strong>Quality:</strong> Consistent product and service standards</li>
              <li><strong>Compliance:</strong> Meeting regulatory requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify key industries using instrumentation",
              "Understand specific use cases for each sector",
              "Recognise benefits of real-time measurement and control",
              "Appreciate the economic and safety value of instrumentation",
              "Compare instrumentation approaches across industries",
              "Apply industry-specific knowledge to practical situations"
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

        {/* Section 1: HVAC Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HVAC Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HVAC (Heating, Ventilation, and Air Conditioning) systems rely heavily on instrumentation to maintain comfortable indoor environments while optimising energy consumption and ensuring air quality standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Control</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Room temperature sensors (RTDs, thermistors)</li>
                  <li>Duct temperature measurement</li>
                  <li>Outdoor air temperature compensation</li>
                  <li>Thermal comfort monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Humidity &amp; Air Quality</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Relative humidity sensors</li>
                  <li>CO2 concentration monitoring</li>
                  <li>Volatile organic compound (VOC) detection</li>
                  <li>Particulate matter measurement</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure &amp; Flow Control</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Static pressure monitoring in ducts</li>
                  <li>Differential pressure across filters</li>
                  <li>Airflow measurement and control</li>
                  <li>Variable air volume (VAV) box control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Management</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Power consumption monitoring</li>
                  <li>Energy efficiency calculations</li>
                  <li>Demand-based ventilation control</li>
                  <li>Seasonal energy performance tracking</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">HVAC Benefits</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div><strong>Comfort:</strong> Precise temperature and humidity control for occupant satisfaction</div>
                <div><strong>Efficiency:</strong> Energy savings of 20-40% through optimised operation</div>
                <div><strong>Health:</strong> Improved indoor air quality and ventilation control</div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Process Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Process Control Industries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Process industries including chemicals, pharmaceuticals, food and beverage, and petrochemicals depend on sophisticated instrumentation for safe, efficient, and consistent production operations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure</p>
                <ul className="text-xs text-white space-y-1 ml-2">
                  <li>Reactor pressure monitoring</li>
                  <li>Pipeline pressure control</li>
                  <li>Safety relief valve settings</li>
                  <li>Vacuum system control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow</p>
                <ul className="text-xs text-white space-y-1 ml-2">
                  <li>Raw material feed rates</li>
                  <li>Product flow measurement</li>
                  <li>Coolant flow monitoring</li>
                  <li>Waste stream flow control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Level</p>
                <ul className="text-xs text-white space-y-1 ml-2">
                  <li>Tank level indication</li>
                  <li>Overflow prevention</li>
                  <li>Batch volume control</li>
                  <li>Interface level detection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Composition</p>
                <ul className="text-xs text-white space-y-1 ml-2">
                  <li>pH measurement</li>
                  <li>Conductivity monitoring</li>
                  <li>Gas concentration analysis</li>
                  <li>Moisture content control</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Instrumentation</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Emergency shutdown systems (ESD)</li>
                  <li>Fire and gas detection</li>
                  <li>Safety integrity level (SIL) instrumentation</li>
                  <li>Toxic gas monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Control</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Real-time product analysis</li>
                  <li>Statistical process control</li>
                  <li>Batch consistency monitoring</li>
                  <li>Contamination detection</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 my-6">
              <p className="text-sm font-medium text-red-400 mb-1">Critical Importance</p>
              <p className="text-sm text-white">In process industries, instrumentation failures can result in safety hazards, environmental damage, production losses, and regulatory violations costing millions of pounds.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Building Management Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Management Systems (BMS)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Management Systems integrate multiple building services through comprehensive instrumentation networks, delivering significant energy savings, improved comfort, and enhanced security across commercial, institutional, and residential buildings.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Control</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Space temperature sensors</li>
                  <li>Humidity monitoring</li>
                  <li>CO2 and air quality sensors</li>
                  <li>Lighting level sensors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Occupancy &amp; Security</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>PIR occupancy sensors</li>
                  <li>Access control systems</li>
                  <li>CCTV integration</li>
                  <li>Door and window status</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Management</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Electrical power monitoring</li>
                  <li>Gas and water flow meters</li>
                  <li>Energy consumption analysis</li>
                  <li>Peak demand management</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Building Features</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Predictive maintenance scheduling</li>
                  <li>Automated fault detection and diagnostics</li>
                  <li>Dynamic setpoint optimisation</li>
                  <li>Integration with weather forecasts</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost-Benefit Analysis</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>15-30% reduction in energy costs</li>
                  <li>10-20% decrease in maintenance costs</li>
                  <li>Improved asset lifecycle management</li>
                  <li>Compliance with green building standards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Renewable Energy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Renewable Energy Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Renewable energy systems require sophisticated instrumentation to maximise energy capture, ensure system reliability, and integrate effectively with electrical grids. From solar photovoltaic to wind turbines, instrumentation is crucial for optimal performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Solar PV Instrumentation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Performance Monitoring</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Solar irradiance measurement</li>
                    <li>Panel temperature monitoring</li>
                    <li>DC and AC power output</li>
                    <li>Performance ratio analysis</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Condition Monitoring</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>String current monitoring</li>
                    <li>Inverter efficiency tracking</li>
                    <li>Ground fault detection</li>
                    <li>Module degradation analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Wind Energy Instrumentation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Wind Conditions</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Wind speed (anemometers)</li>
                    <li>Wind direction (wind vanes)</li>
                    <li>Turbulence measurement</li>
                    <li>Atmospheric pressure</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Turbine Monitoring</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Rotor speed sensors</li>
                    <li>Generator temperature</li>
                    <li>Gearbox vibration analysis</li>
                    <li>Blade pitch angle control</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grid Integration</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Grid frequency monitoring</li>
                  <li>Voltage regulation</li>
                  <li>Power quality measurement</li>
                  <li>Anti-islanding protection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Economic Benefits</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Maximised energy yield</li>
                  <li>Predictive maintenance savings</li>
                  <li>Extended equipment life</li>
                  <li>Reduced downtime losses</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Instrumentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match sensor specifications to environmental conditions</li>
                <li>Consider long-term maintenance and calibration requirements</li>
                <li>Evaluate total cost of ownership, not just purchase price</li>
                <li>Ensure compatibility with existing control systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify all sensors are reading within expected ranges</li>
                <li>Test alarm setpoints and safety functions</li>
                <li>Document baseline performance for future comparison</li>
                <li>Train operators on system capabilities and limitations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Under-specifying for harsh environments</strong> — leads to premature failures</li>
                <li><strong>Ignoring interoperability</strong> — creates integration problems</li>
                <li><strong>Skipping redundancy in critical applications</strong> — single point of failure risk</li>
                <li><strong>Inadequate operator training</strong> — reduces system effectiveness</li>
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
            <Link to="/electrician/upskilling/instrumentation-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule1Section2;
