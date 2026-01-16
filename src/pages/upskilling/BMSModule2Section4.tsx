import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule2Section4QuizData } from "@/data/upskilling/bmsModule2Section4QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "sensor-placement-check1",
    question: "Why does poor sensor placement lead to poor system performance?",
    options: [
      "Sensors become more expensive to maintain",
      "False readings cause inappropriate BMS control decisions",
      "Poor placement makes sensors harder to access",
      "Sensors placed incorrectly consume more power"
    ],
    correctIndex: 1,
    explanation: "Poor sensor placement leads to false readings, which cause the BMS to make inappropriate control decisions. This creates a cascade of problems including energy waste, occupant discomfort, and equipment stress."
  },
  {
    id: "sensor-placement-check2",
    question: "Why should wall-mounted temperature sensors not be installed near windows or radiators?",
    options: [
      "Windows and radiators are difficult to access for maintenance",
      "Solar gain and heat from radiators cause false temperature readings",
      "Windows and radiators may interfere with wireless signals",
      "Building regulations prohibit sensors near these locations"
    ],
    correctIndex: 1,
    explanation: "Solar gain from windows and heat from radiators cause false temperature readings that don't represent actual room conditions, leading to poor temperature control and occupant discomfort."
  },
  {
    id: "sensor-placement-check3",
    question: "Why should CO₂ sensors not be installed next to ventilation grilles?",
    options: [
      "Ventilation grilles are too noisy for proper sensor operation",
      "Fresh air from grilles causes false low CO₂ readings",
      "Grilles may physically damage the sensitive sensor elements",
      "Vibration from grilles affects sensor calibration"
    ],
    correctIndex: 1,
    explanation: "Fresh air from ventilation grilles causes false low CO₂ readings because the sensor detects the low CO₂ content of the incoming fresh air rather than the representative CO₂ levels in the occupied space."
  },
  {
    id: "sensor-placement-check4",
    question: "What can cause a PIR occupancy sensor to give false triggers?",
    options: [
      "High humidity levels in the environment",
      "Direct sunlight or heat sources affecting the sensor",
      "Low ambient temperature in the room",
      "Background electrical noise from equipment"
    ],
    correctIndex: 1,
    explanation: "PIR sensors detect changes in infrared radiation, so direct sunlight or heat sources such as radiators can cause false triggers by creating thermal changes that the sensor interprets as occupancy movement."
  }
];

const faqs = [
  {
    question: "What height should room temperature sensors be mounted?",
    answer: "1.2–1.5m above floor level, representing the average occupant breathing zone. This provides readings representative of the conditions experienced by people in the space."
  },
  {
    question: "How far should sensors be from heat sources?",
    answer: "Minimum 1.5m from radiators, heaters, direct sunlight, or equipment generating heat. This prevents localised temperature influences from affecting sensor readings."
  },
  {
    question: "Where is the best location for a CO₂ sensor?",
    answer: "1–2m above floor level in the breathing zone, away from windows, doors, and ventilation grilles. The sensor should represent average air quality in the occupied space."
  },
  {
    question: "What's the optimal mounting height for PIR occupancy sensors?",
    answer: "2.4–3.0m is optimal for most applications. Higher mounting increases coverage area but reduces sensitivity. The exact height depends on ceiling height and detection requirements."
  }
];

const BMSModule2Section4 = () => {
  useSEO({
    title: "Sensor Placement and Accuracy | BMS Module 2.4",
    description: "Learn sensor placement best practices for BMS installations. Understand positioning requirements for temperature, humidity, CO₂, and occupancy sensors for optimal accuracy."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sensor Placement and Accuracy
          </h1>
          <p className="text-white/80">
            Installation best practices for optimal sensor performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Temperature sensors:</strong> 1.2–1.5m height, away from heat sources</li>
              <li><strong>CO₂ sensors:</strong> Breathing zone, away from fresh air</li>
              <li><strong>Occupancy sensors:</strong> Clear line of sight, 2.4–3m height</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sensors near windows, radiators, or vents</li>
              <li><strong>Use:</strong> Site survey before installation</li>
              <li><strong>Avoid:</strong> Non-representative locations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Why correct sensor placement is critical for BMS success",
              "Best practices for temperature, humidity, CO₂, and occupancy sensors",
              "Common causes of inaccurate sensor readings",
              "Systematic installation checks for accuracy and reliability"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Why Placement Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Placement Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sensors must represent true environmental conditions to provide reliable data for BMS control decisions.
              Poor placement creates a cascade of problems throughout the entire building automation system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Impact Chain:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Incorrect Placement</strong> — Sensor installed in non-representative location</li>
                <li><strong>2. False Readings</strong> — Sensor provides data that doesn't reflect actual conditions</li>
                <li><strong>3. Poor System Control</strong> — BMS makes inappropriate control decisions based on bad data</li>
                <li><strong>4. System Performance Issues</strong> — Energy waste, occupant discomfort, equipment stress</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Consequences of Poor Placement</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Energy waste:</strong> Overcooling/overheating from false readings</li>
                  <li><strong>Occupant discomfort:</strong> Temperature swings and poor air quality</li>
                  <li><strong>Equipment stress:</strong> Hunting and cycling of HVAC equipment</li>
                  <li><strong>System faults:</strong> False alarms and unnecessary service calls</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Representative Locations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Definition:</strong> Accurately reflect occupant conditions</li>
                  <li><strong>Consider:</strong> Air mixing, heat sources, occupancy patterns</li>
                  <li><strong>Avoid:</strong> Localised conditions (draughts, sunlight, equipment heat)</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        {/* Section 2: Temperature & Humidity Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Temperature & Humidity Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temperature and humidity sensors require careful positioning to avoid external influences that can
              compromise accuracy and lead to poor HVAC control performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimal Placement Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mounting height:</strong> 1.2–1.5m above floor level (breathing zone)</li>
                <li><strong>Distance from heat:</strong> Minimum 1.5m from radiators, heaters, direct sunlight</li>
                <li><strong>Air movement:</strong> Avoid direct airflow from vents, draughts from doors/windows</li>
                <li><strong>Structural:</strong> Internal walls preferred (avoid external walls with thermal bridging)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Room Sensor Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Clearances:</strong> 150mm from corners, 500mm from doors</li>
                  <li><strong>Windows:</strong> Minimum 1000mm separation</li>
                  <li><strong>Large spaces:</strong> Consider multiple sensors with averaging</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duct Sensor Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Location:</strong> 5 duct diameters upstream of bends</li>
                  <li><strong>Insertion:</strong> Centre third of duct</li>
                  <li><strong>Velocity:</strong> Minimum 2.5 m/s for accurate readings</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Environmental Factors to Avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Solar gain:</strong> Can cause readings 5-10°C higher than actual</li>
                <li><strong>Thermal mass:</strong> Heavy masonry delays sensor response</li>
                <li><strong>Microclimates:</strong> Local thermal plumes or equipment heat</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        {/* Section 3: CO₂ Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CO₂ Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CO₂ sensors must be positioned to accurately measure air quality in breathing zones while avoiding
              areas where fresh air dilution could provide non-representative readings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Breathing Zone Placement:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Height:</strong> 1–2m above floor level in occupied spaces</li>
                <li><strong>Zone representation:</strong> Average occupancy conditions, not peak or minimum</li>
                <li><strong>Air mixing:</strong> Ensure adequate circulation, avoid dead air zones</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Locations to Avoid</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Fresh air intakes:</strong> False low readings</li>
                  <li><strong>Windows/doors:</strong> Variable fresh air infiltration</li>
                  <li><strong>Dead air zones:</strong> Not representative of space</li>
                  <li><strong>HVAC outlets:</strong> Diluted readings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Return Air Duct Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Location:</strong> Where return air is well-mixed</li>
                  <li><strong>Distance:</strong> Downstream from fresh air injection</li>
                  <li><strong>Access:</strong> Ensure calibration access</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Baseline:</strong> Calibrate to fresh air (400-450 ppm)</li>
                <li><strong>Span:</strong> Verify at 1000 ppm and 2000 ppm</li>
                <li><strong>ABC:</strong> Automatic Baseline Correction assumes lowest weekly reading is fresh air</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* Section 4: Occupancy Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Occupancy Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Occupancy sensors require strategic placement to ensure reliable detection while minimising false triggers
              from environmental factors or equipment operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detection Coverage Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clear line of sight:</strong> No furniture or partitions blocking</li>
                <li><strong>Coverage mapping:</strong> Map detection patterns against room layout</li>
                <li><strong>Height optimisation:</strong> Higher mounting = more coverage, less sensitivity</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PIR Sensor Guidelines</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Height:</strong> 2.4–3.0m optimal</li>
                  <li><strong>Heat source distance:</strong> Minimum 3m from radiators</li>
                  <li><strong>Avoid:</strong> Strong air currents, direct sunlight</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Sensors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Sensitivity:</strong> More sensitive but affected by air currents</li>
                  <li><strong>Acoustics:</strong> Consider room absorption materials</li>
                  <li><strong>Interference:</strong> Avoid ultrasonic equipment nearby</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Installation Problems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dead zones:</strong> Areas behind furniture or below mounting height</li>
                <li><strong>False triggers:</strong> Heat sources, air movement, small animals</li>
                <li><strong>Interference:</strong> Multiple sensors detecting same movement</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Installation Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check manufacturer specifications for recommended positions</li>
                <li>Pre-installation site survey to identify heat sources and draughts</li>
                <li>Label and document sensor locations for maintenance</li>
                <li>Coordinate with commissioning engineers for testing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Convenience over accuracy</strong> — choosing easy installation over representative location</li>
                <li><strong>Ignoring seasonal changes</strong> — sun angles and occupancy patterns vary</li>
                <li><strong>No site survey</strong> — installing without understanding the environment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-red-400/80 mb-2">Office Building CO₂ Sensor Error</h3>
            <div className="text-sm text-white space-y-3">
              <p><strong>Installation:</strong> CO₂ sensors placed near openable windows for convenient wiring access.</p>
              <p><strong>Problem:</strong> When windows opened, sensors detected low CO₂ (400 ppm) from incoming fresh air instead of actual office air quality.</p>
              <p><strong>Consequence:</strong> BMS reduced mechanical ventilation, causing CO₂ to rise above 1200 ppm when windows closed.</p>
              <p><strong>Solution:</strong> Sensors relocated to internal walls in the breathing zone, away from windows and ventilation paths.</p>
              <p><strong>Lesson:</strong> Representative sampling is more important than installation convenience.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Sensor Heights</p>
              <ul className="space-y-0.5">
                <li>Temperature/Humidity: 1.2–1.5m</li>
                <li>CO₂: 1–2m (breathing zone)</li>
                <li>PIR Occupancy: 2.4–3.0m</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Minimum Distances</p>
              <ul className="space-y-0.5">
                <li>From heat sources: 1.5m</li>
                <li>From windows: 1000mm</li>
                <li>PIR from radiators: 3m</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            questions={bmsModule2Section4QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-2-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule2Section4;
