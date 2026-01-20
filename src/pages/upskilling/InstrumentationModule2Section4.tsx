import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Level, Position, and Proximity Sensors - Instrumentation Module 2 Section 4";
const DESCRIPTION = "Master spatial awareness sensors including level detection, positioning systems, and proximity monitoring for industrial automation.";

const quickCheckQuestions = [
  {
    id: "level-sensor-choice",
    question: "Which level sensor technology is best for measuring corrosive liquids without contact?",
    options: [
      "Float sensor with mechanical switch",
      "Ultrasonic or radar level sensor",
      "Capacitive probe sensor",
      "Pressure differential gauge"
    ],
    correctIndex: 1,
    explanation: "Ultrasonic and radar sensors measure level without contacting the liquid, making them ideal for corrosive substances where wetted materials would be damaged."
  },
  {
    id: "encoder-vs-pot",
    question: "Why would you choose an encoder over a potentiometer for position feedback?",
    options: [
      "Encoders are always cheaper",
      "Encoders provide digital output with no mechanical wear",
      "Potentiometers cannot measure rotation",
      "Encoders work without power"
    ],
    correctIndex: 1,
    explanation: "Encoders provide digital position feedback with high resolution and no mechanical wear issues, unlike potentiometers which have wipers that wear over time."
  },
  {
    id: "proximity-sensor-type",
    question: "Which proximity sensor type can detect both metallic and non-metallic objects?",
    options: [
      "Inductive proximity sensor",
      "Magnetic reed switch",
      "Capacitive proximity sensor",
      "Hall effect sensor"
    ],
    correctIndex: 2,
    explanation: "Capacitive proximity sensors detect changes in capacitance and can sense all types of materials including plastics, liquids, powders, and metals."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main use of a proximity sensor?",
    options: [
      "To measure temperature changes in objects",
      "To detect the presence or absence of objects without physical contact",
      "To measure electrical current flow",
      "To monitor pressure variations"
    ],
    correctAnswer: 1,
    explanation: "Proximity sensors detect the presence or absence of objects without requiring physical contact, making them essential for automation, safety systems, and position feedback."
  },
  {
    id: 2,
    question: "Which type of sensor is ideal for measuring liquid level without contact?",
    options: [
      "Float sensor",
      "Ultrasonic level sensor",
      "Mechanical gauge",
      "Pressure switch"
    ],
    correctAnswer: 1,
    explanation: "Ultrasonic level sensors are ideal for non-contact liquid level measurement. They use sound waves to measure the distance to the liquid surface."
  },
  {
    id: 3,
    question: "What is the difference between an encoder and a potentiometer?",
    options: [
      "There is no difference between them",
      "Encoders provide digital output while potentiometers provide analogue output",
      "Encoders measure temperature while potentiometers measure position",
      "Potentiometers are more accurate than encoders"
    ],
    correctAnswer: 1,
    explanation: "Encoders provide digital position feedback with high resolution and no wear issues, while potentiometers provide analogue voltage output but have limited life due to mechanical wipers."
  },
  {
    id: 4,
    question: "Where would a photoelectric sensor be most useful?",
    options: [
      "Measuring water temperature",
      "Monitoring electrical voltage",
      "Counting products on a conveyor belt",
      "Measuring gas pressure"
    ],
    correctAnswer: 2,
    explanation: "Photoelectric sensors excel at counting products on conveyor belts. They detect objects as they pass through a light beam, providing reliable counting without physical contact."
  },
  {
    id: 5,
    question: "Why choose a non-contact sensor over a contact sensor?",
    options: [
      "They are always cheaper than contact sensors",
      "To avoid contamination, wear, and mechanical interference",
      "They consume less power",
      "They are easier to install"
    ],
    correctAnswer: 1,
    explanation: "Non-contact sensors are chosen to avoid contamination (especially in food/medical applications), eliminate mechanical wear, and prevent interference with the measured object or process."
  },
  {
    id: 6,
    question: "What advantage does radar level sensing have over ultrasonic?",
    options: [
      "Radar sensors are cheaper",
      "Radar is unaffected by temperature and can penetrate vapours",
      "Ultrasonic sensors require more power",
      "Radar sensors are smaller"
    ],
    correctAnswer: 1,
    explanation: "Radar level sensors are unaffected by temperature changes and can measure through vapours and foam, unlike ultrasonic sensors which can be affected by these conditions."
  },
  {
    id: 7,
    question: "What is an LVDT used for?",
    options: [
      "Measuring temperature",
      "Highly accurate linear position measurement",
      "Detecting metallic objects",
      "Measuring electrical current"
    ],
    correctAnswer: 1,
    explanation: "Linear Variable Differential Transformers (LVDTs) are electromagnetic sensors providing extremely accurate linear position measurement with no physical contact and infinite resolution."
  },
  {
    id: 8,
    question: "Which proximity sensor type is best for detecting metallic objects in dirty environments?",
    options: [
      "Photoelectric sensor",
      "Inductive proximity sensor",
      "Capacitive sensor",
      "Ultrasonic sensor"
    ],
    correctAnswer: 1,
    explanation: "Inductive proximity sensors are immune to dirt, dust, and moisture while reliably detecting metallic objects. Their electromagnetic sensing principle is unaffected by contamination."
  },
  {
    id: 9,
    question: "What is the difference between incremental and absolute encoders?",
    options: [
      "Incremental encoders are more accurate",
      "Absolute encoders provide a unique position code and don't need a reference point",
      "Incremental encoders work without power",
      "There is no practical difference"
    ],
    correctAnswer: 1,
    explanation: "Absolute encoders provide a unique digital code for each position and retain position data through power loss, while incremental encoders require homing to establish a reference position."
  },
  {
    id: 10,
    question: "Why might foam cause problems for ultrasonic level sensors?",
    options: [
      "Foam is too heavy",
      "Foam absorbs sound waves, preventing accurate measurement",
      "Foam conducts electricity",
      "Foam reflects too much light"
    ],
    correctAnswer: 1,
    explanation: "Foam absorbs ultrasonic sound waves rather than reflecting them back to the sensor, causing inaccurate readings or complete measurement failure. Radar sensors handle foam better."
  }
];

const faqs = [
  {
    question: "How do I choose between contact and non-contact level sensors?",
    answer: "Consider the measured substance and application requirements. Non-contact sensors (ultrasonic, radar) are better for corrosive liquids, sterile environments, and where contamination must be avoided. Contact sensors (float, capacitive probes) are simpler and more cost-effective for clean, non-critical applications."
  },
  {
    question: "What is the sensing range of inductive proximity sensors?",
    answer: "Standard inductive sensors typically have sensing ranges of 1mm to 60mm, depending on the sensor face diameter. Larger sensors have longer ranges. The range is also affected by the target material and size - ferrous metals provide the best detection range."
  },
  {
    question: "Can capacitive sensors see through container walls?",
    answer: "Yes, capacitive proximity sensors can detect the presence of materials through non-metallic container walls like plastic or glass. This makes them ideal for detecting liquid levels in sealed containers without penetrating the vessel."
  },
  {
    question: "What causes false triggers in photoelectric sensors?",
    answer: "Common causes include ambient light interference, reflective surfaces causing beam scatter, dirty lenses, misalignment between transmitter and receiver, and vibration. Using sensors with appropriate filtering and proper mounting addresses most issues."
  },
  {
    question: "When should I use an absolute encoder instead of incremental?",
    answer: "Use absolute encoders when position must be known immediately after power-up without a homing sequence, in safety-critical applications, or where power loss could occur during operation. Incremental encoders are suitable when cost is critical and a reference home position is acceptable."
  },
  {
    question: "What IP rating do I need for outdoor proximity sensors?",
    answer: "For outdoor industrial applications, IP67 (dust-tight, protected against temporary immersion) is typically minimum. For washdown environments, IP68 or IP69K (high-pressure, high-temperature wash) is recommended. Always verify the sensor's temperature rating for your climate."
  }
];

const InstrumentationModule2Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-2">
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
            <span>Module 2 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Level, Position, and Proximity Sensors
          </h1>
          <p className="text-white/80">
            Understanding spatial awareness sensors for automation and monitoring
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Level Sensors:</strong> Float, ultrasonic, radar, capacitive</li>
              <li><strong>Position:</strong> Potentiometers, encoders, LVDTs</li>
              <li><strong>Proximity:</strong> Inductive, capacitive, photoelectric</li>
              <li><strong>Selection:</strong> Based on material, environment, accuracy</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Tank-mounted sensors, encoder wheels, prox switches</li>
              <li><strong>Use:</strong> Tank monitoring, machine positioning, object detection</li>
              <li><strong>Apply:</strong> Safety interlocks, counting, automation feedback</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how level, position, and proximity are sensed",
              "Compare contact and non-contact sensor methods",
              "Identify ideal sensors for different environments",
              "Apply selection criteria for spatial monitoring",
              "Recognise common sensor technologies and outputs",
              "Match sensor capabilities to application requirements"
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

        {/* Section 1: Level Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Level Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Level sensors determine the height of liquids, solids, or interfaces between materials. They range from simple mechanical switches to sophisticated radar systems, each suited to specific applications and environmental conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Float Sensors</p>
              <p className="text-sm text-white mb-2">Use buoyancy principles with mechanical switches or continuous position feedback.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Simple and reliable operation</li>
                    <li>No external power required for mechanical types</li>
                    <li>Direct mechanical action</li>
                    <li>Cost-effective for basic applications</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Limitations</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Moving parts can stick or wear</li>
                    <li>Affected by foam and turbulence</li>
                    <li>Limited accuracy</li>
                    <li>Requires tank access for installation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Level Sensors</p>
              <p className="text-sm text-white mb-2">Measure time-of-flight of ultrasonic pulses reflected from the surface.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Non-contact measurement</li>
                    <li>No moving parts to wear</li>
                    <li>Works with most liquids</li>
                    <li>Continuous measurement output</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Considerations</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Affected by temperature changes</li>
                    <li>Foam can absorb sound waves</li>
                    <li>Dead zones near the sensor face</li>
                    <li>Vapours may interfere with readings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radar Level Sensors</p>
              <p className="text-sm text-white mb-2">Use microwave signals to measure distance to the surface with high accuracy.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Excellent accuracy and repeatability</li>
                    <li>Unaffected by temperature changes</li>
                    <li>Works through vapours and foam</li>
                    <li>Long measuring range capability</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Chemical storage tanks</li>
                    <li>Oil and gas facilities</li>
                    <li>Water treatment plants</li>
                    <li>Custody transfer measurement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Position Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Position Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Position sensors provide feedback on the location of moving components. They are essential for precise control in automation systems, robotics, and machinery positioning applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Potentiometers (Linear and Rotary)</p>
              <p className="text-sm text-white mb-2">Provide analogue voltage output proportional to mechanical position.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Simple analogue output</li>
                    <li>Direct position measurement</li>
                    <li>Cost-effective solution</li>
                    <li>No digital processing needed</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Limitations</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Mechanical wear of wiper contact</li>
                    <li>Limited resolution</li>
                    <li>Noise and dead spots over time</li>
                    <li>Environmental sensitivity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Encoders (Incremental and Absolute)</p>
              <p className="text-sm text-white mb-2">Provide digital position feedback with high resolution and reliability.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Incremental Encoders</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Provide pulse counts for movement</li>
                    <li>Require reference homing position</li>
                    <li>Lower cost option</li>
                    <li>High resolution available</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Absolute Encoders</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Unique position code at each point</li>
                    <li>No reference position needed</li>
                    <li>Power-failure safe</li>
                    <li>Network communication options</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Linear Variable Differential Transformers (LVDT)</p>
              <p className="text-sm text-white mb-2">Electromagnetic sensors providing highly accurate linear position measurement.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Extremely high accuracy</li>
                    <li>No physical contact or wear</li>
                    <li>Infinite resolution</li>
                    <li>Excellent repeatability</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Precision measurement systems</li>
                    <li>Hydraulic cylinder position</li>
                    <li>Quality control inspection</li>
                    <li>Research and development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Proximity Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Proximity Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proximity sensors detect the presence or absence of objects without physical contact. They are fundamental to automation systems, providing input for safety systems, counting applications, and position feedback.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductive Proximity Sensors</p>
              <p className="text-sm text-white mb-2">Detect metallic objects by sensing changes in electromagnetic field.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Immune to dirt and moisture</li>
                    <li>Fast switching speed</li>
                    <li>Long service life</li>
                    <li>No mechanical wear parts</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Metal part detection</li>
                    <li>Position sensing in machines</li>
                    <li>Counting metal objects</li>
                    <li>Safety interlocks</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitive Proximity Sensors</p>
              <p className="text-sm text-white mb-2">Detect both metallic and non-metallic objects by sensing capacitance changes.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Detects all material types</li>
                    <li>Adjustable sensitivity</li>
                    <li>Can sense through containers</li>
                    <li>Compact design options</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Liquid level in bottles</li>
                    <li>Non-metal object detection</li>
                    <li>Bulk material presence</li>
                    <li>Food processing monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Photoelectric Sensors</p>
              <p className="text-sm text-white mb-2">Use light beams to detect objects in various configurations.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Types</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Through-beam (separate TX/RX)</li>
                    <li>Retro-reflective (uses reflector)</li>
                    <li>Diffuse reflective (object reflection)</li>
                    <li>Laser-based for precision</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Conveyor product counting</li>
                    <li>Safety light curtains</li>
                    <li>Small object detection</li>
                    <li>Precise positioning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Contact vs Non-Contact Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Contact vs Non-Contact Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding when to use contact versus non-contact sensing methods is crucial for optimal system performance and reliability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contact Sensors</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Advantages</p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>Direct mechanical action</li>
                      <li>Simple and reliable</li>
                      <li>Often lower cost</li>
                      <li>Immune to environmental conditions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Disadvantages</p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>Mechanical wear over time</li>
                      <li>Can contaminate process</li>
                      <li>May interfere with operation</li>
                      <li>Limited switching frequency</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Contact Sensors</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Advantages</p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>No mechanical wear</li>
                      <li>High switching frequency</li>
                      <li>No contamination risk</li>
                      <li>Distance measurement capability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Disadvantages</p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>Higher complexity</li>
                      <li>Power requirements</li>
                      <li>Environmental sensitivity</li>
                      <li>Often higher initial cost</li>
                    </ul>
                  </div>
                </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Sensors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match sensor technology to the target material (metal vs non-metal)</li>
                <li>Consider environmental conditions (temperature, dust, moisture)</li>
                <li>Verify sensing range meets application requirements</li>
                <li>Check output compatibility with your control system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain proper mounting distance and orientation</li>
                <li>Avoid interference from nearby metal or sensors</li>
                <li>Route cables away from power wiring and interference sources</li>
                <li>Allow adequate access for maintenance and adjustment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong sensor type for material</strong> — inductive sensors will not detect plastic or glass</li>
                <li><strong>Ignoring environmental ratings</strong> — sensors fail in conditions they are not rated for</li>
                <li><strong>Mounting too close together</strong> — sensors can interfere with each other</li>
                <li><strong>Inadequate cable protection</strong> — damaged cables cause intermittent faults</li>
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
            <Link to="/electrician/upskilling/instrumentation-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../instrumentation-module-2-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule2Section4;
