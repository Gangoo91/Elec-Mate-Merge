import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    id: "gauge-vs-absolute",
    question: "What's the difference between gauge and absolute pressure?",
    options: [
      "Gauge pressure includes atmospheric pressure, absolute pressure doesn't",
      "Absolute pressure includes atmospheric pressure, gauge pressure doesn't",
      "There is no difference between them",
      "Gauge pressure is always higher than absolute pressure"
    ],
    correctIndex: 1,
    explanation: "Absolute pressure is measured relative to a perfect vacuum and includes atmospheric pressure. Gauge pressure is measured relative to atmospheric pressure, so it doesn't include atmospheric pressure in its reading."
  },
  {
    id: "flow-sensor-type",
    question: "Name one type of flow sensor and its working principle.",
    options: [
      "Electromagnetic flow sensor - uses magnetic fields to measure conductive fluid velocity",
      "Temperature sensor - measures heat transfer in flowing fluids",
      "Pressure sensor - measures static pressure in pipes",
      "Level sensor - measures liquid height"
    ],
    correctIndex: 0,
    explanation: "Electromagnetic flow sensors work by applying a magnetic field across a pipe containing conductive fluid. As the fluid moves through the magnetic field, it generates a voltage proportional to its velocity."
  },
  {
    id: "material-compatibility",
    question: "Why is material compatibility important in pressure sensors?",
    options: [
      "To ensure proper electrical conductivity",
      "To prevent corrosion and ensure accurate readings over time",
      "To improve the sensor's response time",
      "To reduce manufacturing costs"
    ],
    correctIndex: 1,
    explanation: "Material compatibility is crucial because incompatible materials can corrode when exposed to certain fluids or gases, leading to sensor failure, inaccurate readings, and potential safety hazards."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the difference between gauge and absolute pressure?",
    options: [
      "Gauge pressure includes atmospheric pressure, absolute pressure doesn't",
      "Absolute pressure includes atmospheric pressure, gauge pressure doesn't",
      "There is no difference between them",
      "Gauge pressure is always higher than absolute pressure"
    ],
    correctAnswer: 1,
    explanation: "Absolute pressure is measured relative to a perfect vacuum and includes atmospheric pressure. Gauge pressure is measured relative to atmospheric pressure, so it doesn't include atmospheric pressure in its reading."
  },
  {
    id: 2,
    question: "Name one type of flow sensor and its working principle.",
    options: [
      "Electromagnetic flow sensor - uses magnetic fields to measure conductive fluid velocity",
      "Temperature sensor - measures heat transfer in flowing fluids",
      "Pressure sensor - measures static pressure in pipes",
      "Level sensor - measures liquid height"
    ],
    correctAnswer: 0,
    explanation: "Electromagnetic flow sensors work by applying a magnetic field across a pipe containing conductive fluid. As the fluid moves through the magnetic field, it generates a voltage proportional to its velocity."
  },
  {
    id: 3,
    question: "What is a common application of a pressure sensor?",
    options: [
      "Measuring electrical current flow",
      "Monitoring hydraulic system pressure for safety protection",
      "Detecting light intensity changes",
      "Measuring temperature variations"
    ],
    correctAnswer: 1,
    explanation: "Pressure sensors are commonly used in hydraulic systems to monitor operating pressure and provide safety protection by triggering alarms or shutdowns when pressure exceeds safe limits."
  },
  {
    id: 4,
    question: "Why is material compatibility important in pressure sensors?",
    options: [
      "To ensure proper electrical conductivity",
      "To prevent corrosion and ensure accurate readings over time",
      "To improve the sensor's response time",
      "To reduce manufacturing costs"
    ],
    correctAnswer: 1,
    explanation: "Material compatibility is crucial because incompatible materials can corrode when exposed to certain fluids or gases, leading to sensor failure, inaccurate readings, and potential safety hazards."
  },
  {
    id: 5,
    question: "What does a differential pressure sensor measure?",
    options: [
      "The absolute pressure at a single point",
      "The pressure relative to atmospheric pressure",
      "The difference in pressure between two points",
      "The rate of pressure change over time"
    ],
    correctAnswer: 2,
    explanation: "A differential pressure sensor measures the difference in pressure between two points. This is useful for applications like flow measurement across an orifice plate or filter monitoring."
  },
  {
    id: 6,
    question: "What is a key advantage of electromagnetic flow sensors?",
    options: [
      "Works with all fluid types including non-conductive",
      "No moving parts and no pressure drop",
      "Lowest cost option available",
      "No power consumption required"
    ],
    correctAnswer: 1,
    explanation: "Electromagnetic flow sensors have no moving parts (reducing maintenance) and create no obstruction in the flow path, meaning no pressure drop across the sensor."
  },
  {
    id: 7,
    question: "Which flow sensor type can measure flow regardless of fluid conductivity?",
    options: [
      "Electromagnetic flow sensor",
      "Coriolis mass flow sensor",
      "Ultrasonic flow sensor",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "Both Coriolis and ultrasonic flow sensors can measure flow regardless of fluid conductivity, unlike electromagnetic sensors which require a minimum conductivity level."
  },
  {
    id: 8,
    question: "What is the main difference between volumetric and mass flow measurement?",
    options: [
      "Volumetric is more accurate",
      "Mass flow is independent of temperature and pressure variations",
      "Volumetric requires more complex instrumentation",
      "There is no practical difference"
    ],
    correctAnswer: 1,
    explanation: "Mass flow measurement is independent of temperature and pressure variations because it measures the actual mass of fluid, while volumetric flow changes with these conditions."
  },
  {
    id: 9,
    question: "What type of pressure sensor is best for dynamic pressure measurements?",
    options: [
      "Capacitive pressure sensor",
      "Strain gauge pressure sensor",
      "Piezoelectric pressure sensor",
      "Bourdon tube gauge"
    ],
    correctAnswer: 2,
    explanation: "Piezoelectric pressure sensors are ideal for dynamic measurements due to their excellent high-frequency response and ability to track rapid pressure changes."
  },
  {
    id: 10,
    question: "Why are turbine flow sensors affected by fluid viscosity?",
    options: [
      "Viscosity doesn't affect turbine sensors",
      "Higher viscosity slows rotor speed for the same flow rate",
      "Viscosity affects the electrical output",
      "Turbine sensors only work with water"
    ],
    correctAnswer: 1,
    explanation: "Higher viscosity fluids create more drag on the turbine rotor, slowing it down and affecting the relationship between rotor speed and actual flow rate, requiring calibration adjustments."
  }
];

const faqs = [
  {
    question: "When should I use absolute vs gauge pressure measurement?",
    answer: "Use absolute pressure when you need measurements referenced to vacuum (e.g., vacuum processes, altitude measurements). Use gauge pressure for most industrial applications where you need to know pressure relative to atmosphere (e.g., hydraulic systems, compressed air)."
  },
  {
    question: "Can electromagnetic flow sensors measure gas flow?",
    answer: "No, electromagnetic flow sensors require a conductive fluid (typically >5 μS/cm) to operate. For gas flow measurement, use ultrasonic, thermal mass, or vortex flow sensors instead."
  },
  {
    question: "What is turndown ratio in flow measurement?",
    answer: "Turndown ratio is the range of flow rates a meter can accurately measure, expressed as a ratio of maximum to minimum flow. A 10:1 turndown means the meter can measure from 10% to 100% of its maximum flow rating with stated accuracy."
  },
  {
    question: "Why do some pressure sensors need temperature compensation?",
    answer: "Temperature affects both the sensor element and electronics. Without compensation, readings drift with temperature changes. Many sensors have built-in temperature compensation or allow external correction for better accuracy."
  },
  {
    question: "What causes pressure pulsation and how does it affect sensors?",
    answer: "Pressure pulsations come from pumps, compressors, or system dynamics. They can cause sensor fatigue, inaccurate readings, or damage. Solutions include dampening devices, averaging circuits, or sensors designed for pulsating conditions."
  }
];

const InstrumentationModule2Section3 = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 2 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pressure and Flow Sensors
          </h1>
          <p className="text-white/80">
            Understanding pressure and flow measurement for fluid and gas systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pressure:</strong> Absolute, gauge, and differential types</li>
              <li><strong>Flow:</strong> Volumetric and mass measurement methods</li>
              <li><strong>Technologies:</strong> Strain gauge, piezoelectric, electromagnetic, ultrasonic</li>
              <li><strong>Selection:</strong> Match sensor to fluid, range, and accuracy needs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Identify pressure reference type and flow sensor technology</li>
              <li><strong>Use:</strong> Select sensors based on fluid properties and accuracy</li>
              <li><strong>Apply:</strong> Consider material compatibility and response time</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the principles of pressure and flow measurement",
              "Identify common pressure and flow sensor types and applications",
              "Learn how sensor selection affects system design and performance",
              "Apply selection criteria for pressure and flow applications",
              "Recognise absolute, gauge, and differential pressure differences",
              "Understand volumetric vs mass flow measurement"
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

        {/* Section 1: Pressure Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pressure Sensors: Types and Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pressure sensors convert mechanical pressure into electrical signals. They are fundamental
              to many industrial processes and safety systems, providing critical feedback for control
              and monitoring applications across all industries.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Sensor Technologies</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Strain Gauge Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Diaphragm with strain gauges</li>
                    <li>High accuracy and stability</li>
                    <li>Wide pressure ranges</li>
                    <li>Good temperature compensation</li>
                    <li>Cost-effective solution</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Piezoelectric Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Generate charge under stress</li>
                    <li>Excellent dynamic response</li>
                    <li>High-frequency capability</li>
                    <li>Rugged construction</li>
                    <li>Self-generating output</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Capacitive Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Capacitance change with pressure</li>
                    <li>Very high accuracy</li>
                    <li>Low temperature sensitivity</li>
                    <li>Low power consumption</li>
                    <li>Good long-term stability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pressure Reference Types:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Absolute Pressure</p>
                  <p className="text-sm text-white">Measured relative to perfect vacuum (zero reference)</p>
                  <p className="text-xs text-white/80 mt-1"><strong>Example:</strong> 101.3 kPa absolute = atmospheric at sea level</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Gauge Pressure</p>
                  <p className="text-sm text-white">Measured relative to atmospheric pressure</p>
                  <p className="text-xs text-white/80 mt-1"><strong>Example:</strong> 0 kPa gauge = atmospheric pressure</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Differential Pressure</p>
                  <p className="text-sm text-white">Difference between two pressure points</p>
                  <p className="text-xs text-white/80 mt-1"><strong>Example:</strong> Filter monitoring, flow measurement</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Flow Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Flow Sensors: Technologies and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Flow sensors measure the movement of liquids or gases through pipes or ducts. They provide
              essential data for process control, billing, environmental monitoring, and safety systems
              across water, oil, gas, and chemical industries.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Sensor Technologies</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Turbine Flow Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Rotor spins proportional to flow velocity</li>
                    <li>High accuracy and wide turndown ratio</li>
                    <li>Good repeatability with digital output</li>
                    <li>Moving parts require maintenance</li>
                    <li>Sensitive to fluid cleanliness and viscosity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Electromagnetic Flow Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Uses Faraday's law of induction</li>
                    <li>No moving parts, no pressure drop</li>
                    <li>Excellent accuracy, bidirectional</li>
                    <li>Only works with conductive fluids</li>
                    <li>Higher initial cost than turbine</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Ultrasonic Flow Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Transit time or Doppler methods</li>
                    <li>Non-intrusive options available</li>
                    <li>Works with various fluids</li>
                    <li>Low maintenance requirements</li>
                    <li>Clamp-on versions for retrofit</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Coriolis Mass Flow Sensors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Direct mass flow measurement</li>
                    <li>Also measures density and temperature</li>
                    <li>Independent of fluid properties</li>
                    <li>Very high accuracy (±0.1%)</li>
                    <li>Higher cost but excellent performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Volumetric Flow</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Units:</strong> m³/h, L/min, gal/min</li>
                  <li><strong>Applications:</strong> Water billing, HVAC</li>
                  <li><strong>Note:</strong> Volume changes with temperature/pressure</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mass Flow</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Units:</strong> kg/h, kg/s, lb/min</li>
                  <li><strong>Applications:</strong> Custody transfer, batch processes</li>
                  <li><strong>Advantage:</strong> Independent of temperature/pressure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Selection Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Selection Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper sensor selection requires careful consideration of multiple factors to ensure
              optimal performance, reliability, and cost-effectiveness throughout the sensor's
              operational life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Selection Factors:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Operating Range</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Ensure sensor covers expected and peak values</li>
                    <li>Consider minimum and maximum flow rates</li>
                    <li>Account for ambient and process temperatures</li>
                    <li>Match accuracy to application needs</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Material Compatibility</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Wetted materials must suit process fluid</li>
                    <li>Consider chemical compatibility and pH</li>
                    <li>Seal materials must withstand conditions</li>
                    <li>Food/pharma may need FDA approval</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Response Time</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Must be fast enough for control loops</li>
                    <li>Consider settling time after disturbance</li>
                    <li>Frequency response for rapid changes</li>
                    <li>Damping may be needed for noisy signals</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection Tip:</strong> Always consider the total cost of ownership including installation,
              calibration, maintenance, and replacement costs, not just the initial purchase price.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Real-World Application */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real-World Application: Brewery Process Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A craft brewery implements comprehensive pressure and flow monitoring to optimise water
              usage, monitor fermentation, and ensure product quality. This demonstrates practical
              applications of various sensor technologies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">System Components:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Water Flow Monitoring:</strong> Electromagnetic flow sensors monitor incoming water supply for brewing, providing accurate measurement for recipe consistency and cost control</li>
                <li><strong>2. Fermentation Tank Pressure:</strong> Gauge pressure sensors monitor CO₂ buildup during fermentation, ensuring safe operating conditions and optimal fermentation progress</li>
                <li><strong>3. Transfer Line Monitoring:</strong> Differential pressure sensors across filters monitor clogging, triggering maintenance alerts before flow restriction affects production</li>
                <li><strong>4. Safety Integration:</strong> All sensors integrate with the control system, providing alarms for abnormal conditions and enabling automated safety shutdowns</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Results:</strong> The brewery achieved 15% water savings, reduced batch-to-batch variation
              by 8%, and eliminated production stoppages due to unexpected filter blockages.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Pressure Sensors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mount at appropriate height to avoid static head errors</li>
                <li>Use snubbers or dampeners for pulsating pressure applications</li>
                <li>Ensure proper orientation of diaphragm seal sensors</li>
                <li>Protect from temperature extremes and direct sunlight</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Flow Sensors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain required straight pipe lengths upstream and downstream</li>
                <li>Ensure pipe is full for liquid flow measurement</li>
                <li>Consider grounding requirements for electromagnetic sensors</li>
                <li>Install isolation valves for maintenance access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong reference type</strong> — using gauge when absolute is needed (or vice versa)</li>
                <li><strong>Insufficient straight pipe</strong> — turbulent flow causes measurement errors</li>
                <li><strong>Material incompatibility</strong> — sensor corrosion leads to failure and contamination</li>
                <li><strong>Ignoring process conditions</strong> — temperature and pressure affect measurement</li>
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
            <Link to="..">
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

export default InstrumentationModule2Section3;
