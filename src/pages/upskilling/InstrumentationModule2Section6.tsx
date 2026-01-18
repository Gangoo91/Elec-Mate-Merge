import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Choosing the Right Sensor - Instrumentation Module 2 Section 6";
const DESCRIPTION = "Learn systematic sensor selection methods balancing technical requirements, environmental conditions, and economic factors for optimal instrumentation.";

const quickCheckQuestions = [
  {
    id: "selection-factors",
    question: "What are the three most critical factors when selecting a sensor?",
    options: [
      "Brand, colour, and size",
      "Environment, accuracy requirements, and measured variable",
      "Price, availability, and warranty",
      "Weight, appearance, and packaging"
    ],
    correctIndex: 1,
    explanation: "The three critical factors are environmental conditions (temperature, humidity, chemicals), accuracy requirements (precision and resolution), and the measured variable (what parameter needs measuring)."
  },
  {
    id: "rugged-vs-accurate",
    question: "When should you prioritise ruggedness over accuracy?",
    options: [
      "Always - rugged sensors are better",
      "In harsh environments where reliability matters more than precision",
      "Never - accuracy is always most important",
      "Only in laboratory settings"
    ],
    correctIndex: 1,
    explanation: "In harsh industrial environments, a sensor that operates reliably with good accuracy is preferable to a highly accurate sensor that fails frequently due to environmental stress."
  },
  {
    id: "redundancy-meaning",
    question: "What does sensor redundancy mean in safety-critical applications?",
    options: [
      "Using expensive sensors",
      "Installing backup sensors to maintain operation if primary fails",
      "Having spare sensors in storage",
      "Using sensors from multiple brands"
    ],
    correctIndex: 1,
    explanation: "Sensor redundancy means installing multiple sensors (typically 2 or 3) to measure the same parameter, ensuring continued operation and safety if one sensor fails."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Name three critical factors when selecting a sensor.",
    options: [
      "Cost, colour, and brand name",
      "Environmental conditions, accuracy requirements, and measured variable",
      "Size, weight, and appearance",
      "Manufacturer location, warranty, and packaging"
    ],
    correctAnswer: 1,
    explanation: "The three critical factors are environmental conditions (temperature, humidity, chemicals), accuracy requirements (precision and resolution), and the measured variable (what parameter you are measuring)."
  },
  {
    id: 2,
    question: "Why would you choose a rugged sensor over a more accurate one?",
    options: [
      "Rugged sensors are always cheaper",
      "In harsh environments, reliability is more important than absolute accuracy",
      "Rugged sensors consume less power",
      "They require less maintenance documentation"
    ],
    correctAnswer: 1,
    explanation: "In harsh industrial environments, a sensor that continues to operate reliably with good accuracy is better than a highly accurate sensor that fails frequently."
  },
  {
    id: 3,
    question: "What is the risk of ignoring sensor datasheets?",
    options: [
      "Legal liability issues only",
      "Higher insurance premiums",
      "Sensor failure, safety hazards, and system malfunction",
      "Warranty void only"
    ],
    correctAnswer: 2,
    explanation: "Ignoring datasheets can lead to sensors operating outside their specifications, causing premature failure, safety hazards, inaccurate measurements, and system malfunction."
  },
  {
    id: 4,
    question: "What role does environment play in sensor choice?",
    options: [
      "Environment only affects sensor appearance",
      "Environmental conditions determine sensor survival, accuracy, and reliability",
      "Environment only matters for outdoor installations",
      "Environmental factors are less important than cost"
    ],
    correctAnswer: 1,
    explanation: "Environmental conditions (temperature, humidity, vibration, chemicals) directly affect sensor survival, measurement accuracy, and long-term reliability."
  },
  {
    id: 5,
    question: "What does sensor redundancy mean?",
    options: [
      "Using the same sensor brand throughout the system",
      "Installing backup sensors to maintain operation if the primary sensor fails",
      "Having spare sensors in storage",
      "Using sensors with multiple output signals"
    ],
    correctAnswer: 1,
    explanation: "Sensor redundancy means installing multiple sensors to measure the same parameter, so if one fails, the system can continue operating using backup sensors."
  },
  {
    id: 6,
    question: "What is a 2oo3 voting configuration?",
    options: [
      "Two sensors out of three must be installed",
      "The system uses the measurement from two agreeing sensors out of three",
      "Two sensors are primary, one is backup",
      "Three sensors measure two parameters"
    ],
    correctAnswer: 1,
    explanation: "In 2oo3 (2 out of 3) voting, three sensors measure the same variable and the system uses the value from the two that agree, providing high safety integrity and fault tolerance."
  },
  {
    id: 7,
    question: "Why consider total cost of ownership rather than purchase price?",
    options: [
      "To justify expensive equipment",
      "Because maintenance, downtime, and reliability affect overall costs",
      "For accounting purposes only",
      "Total cost is always lower"
    ],
    correctAnswer: 1,
    explanation: "Total cost of ownership includes purchase price, installation, maintenance, calibration, replacement, and downtime costs - a cheap sensor that fails frequently may cost more overall."
  },
  {
    id: 8,
    question: "What is a fail-safe sensor output?",
    options: [
      "A sensor that never fails",
      "An output that goes to a predetermined safe state when the sensor fails",
      "A backup power supply",
      "A redundant communication path"
    ],
    correctAnswer: 1,
    explanation: "Fail-safe output means the sensor provides a predetermined safe state (like 0mA or high alarm) when it fails, allowing the control system to take appropriate safety action."
  },
  {
    id: 9,
    question: "When should you use intrinsically safe sensors?",
    options: [
      "In all industrial applications",
      "In potentially explosive atmospheres where electrical sparks must be prevented",
      "Only in wet environments",
      "When sensors are very expensive"
    ],
    correctAnswer: 1,
    explanation: "Intrinsically safe (IS) sensors are required in hazardous areas where explosive gases, vapours, or dusts may be present, to prevent electrical energy from causing ignition."
  },
  {
    id: 10,
    question: "What information should be documented for each sensor installation?",
    options: [
      "Only the purchase price",
      "Tag number, location, range, output type, calibration data, and maintenance schedule",
      "Just the manufacturer name",
      "Only warranty information"
    ],
    correctAnswer: 1,
    explanation: "Complete documentation including tag number, location, measurement range, output type, calibration data, and maintenance schedule is essential for ongoing operation and troubleshooting."
  }
];

const faqs = [
  {
    question: "How do I determine the required sensor accuracy?",
    answer: "Start with the process requirements - what accuracy does the control system or quality specification need? Then consider measurement uncertainty contributors (sensor, wiring, ADC). Generally, select a sensor 3-4 times more accurate than the required measurement accuracy to allow for installation and environmental effects."
  },
  {
    question: "What IP rating do I need for my application?",
    answer: "IP65 is typically minimum for industrial environments (dust-tight, protected against water jets). IP67 is needed for temporary immersion, IP68 for continuous submersion. For food/pharma washdown, specify IP69K. Always verify temperature ratings alongside IP ratings."
  },
  {
    question: "How do I justify the cost of premium sensors to management?",
    answer: "Calculate total cost of ownership including downtime costs, maintenance frequency, calibration intervals, and replacement parts. Premium sensors often have longer life, better stability, and lower maintenance needs. Include safety and compliance benefits in regulated industries."
  },
  {
    question: "When is sensor redundancy required versus optional?",
    answer: "Redundancy is typically required for safety-critical measurements (SIL-rated systems), custody transfer, and process-critical variables where failure causes significant production loss. It is optional but recommended for important measurements where temporary loss is acceptable."
  },
  {
    question: "How do I select sensors for hazardous areas?",
    answer: "First, determine the hazardous area classification (Zone 0, 1, 2 for gas; Zone 20, 21, 22 for dust). Then select sensors with appropriate protection methods (Ex ia intrinsic safety, Ex d flameproof, etc.) and temperature class. Always verify certifications match your specific hazardous substance and installation requirements."
  },
  {
    question: "What should I check when replacing sensors with different brands?",
    answer: "Verify identical measurement range, output signal type, accuracy class, environmental ratings, physical dimensions, and process connections. Check that response time and stability meet requirements. Update calibration procedures and documentation to reflect the new manufacturer's specifications."
  }
];

const InstrumentationModule2Section6 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <span>Module 2 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Choosing the Right Sensor
          </h1>
          <p className="text-white/80">
            Systematic sensor selection for optimal system performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Define:</strong> Measurement requirements and range</li>
              <li><strong>Assess:</strong> Environmental and installation conditions</li>
              <li><strong>Match:</strong> Signal output to control system</li>
              <li><strong>Balance:</strong> Performance, cost, and reliability</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Datasheets, spec sheets, certification marks</li>
              <li><strong>Use:</strong> Selection checklists, comparison tables</li>
              <li><strong>Apply:</strong> Total cost analysis, redundancy planning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply a systematic decision-making framework",
              "Evaluate environmental and performance criteria",
              "Prevent common sensor selection mistakes",
              "Balance performance requirements with budget",
              "Understand redundancy and fail-safe strategies",
              "Document sensor selections properly"
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

        {/* Section 1: Selection Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Systematic Selection Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A structured approach to sensor selection ensures all critical factors are considered. This framework prevents oversight and enables consistent decision-making across projects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1: Define Measurement Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Measured Variable</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Parameter: What exactly needs measuring?</li>
                    <li>Range: Minimum and maximum values</li>
                    <li>Units: Engineering units required</li>
                    <li>Media: Substance being measured</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Performance Requirements</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Accuracy: Required measurement precision</li>
                    <li>Response time: Speed of updates needed</li>
                    <li>Resolution: Smallest detectable change</li>
                    <li>Repeatability: Consistency over time</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2: Assess Environmental Conditions</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Physical Environment</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Temperature range</li>
                    <li>Humidity levels</li>
                    <li>Vibration and shock</li>
                    <li>Dust and contamination</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Chemical Environment</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Corrosive substances</li>
                    <li>Chemical compatibility</li>
                    <li>Cleaning agents used</li>
                    <li>Explosive atmospheres</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Electrical Environment</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Power supply availability</li>
                    <li>EMI/RFI interference</li>
                    <li>Grounding systems</li>
                    <li>Safety classifications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3: Determine System Integration</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Signal Requirements</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Output type: 4-20mA, 0-10V, digital</li>
                    <li>Communication: HART, Modbus, Profibus</li>
                    <li>Power: Loop-powered or separate supply</li>
                    <li>Wiring: 2-wire, 3-wire, or 4-wire</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Installation Constraints</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Mounting space and orientation</li>
                    <li>Maintenance accessibility</li>
                    <li>Hazardous area classifications</li>
                    <li>Required certifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Performance vs Budget */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Performance vs Budget Trade-offs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real-world sensor selection requires balancing performance requirements against budget constraints and availability. Understanding these trade-offs enables optimal decisions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Considerations</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Initial Costs</p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>Sensor purchase price</li>
                      <li>Installation materials and labour</li>
                      <li>Calibration equipment and setup</li>
                      <li>Documentation and training</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Operating Costs</p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>Maintenance and calibration</li>
                      <li>Replacement parts</li>
                      <li>Energy consumption</li>
                      <li>Downtime and lost production</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Trade-offs</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Accuracy vs Cost</p>
                    <p className="text-sm text-white">Higher accuracy costs more but may be essential for process control or regulatory compliance.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Reliability vs Features</p>
                    <p className="text-sm text-white">Simple, proven designs may be more reliable than feature-rich smart sensors in harsh environments.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Response vs Stability</p>
                    <p className="text-sm text-white">Fast-response sensors may be more sensitive to noise and require additional filtering.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Economic Reality:</strong> The lowest-cost sensor is rarely the most economical choice when total cost of ownership is considered. Factor in reliability, maintenance, and downtime costs.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Redundancy and Fail-safes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Redundancy and Fail-safe Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Critical applications require redundancy and fail-safe strategies to maintain operation and safety when sensors fail.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Redundancy Configurations</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-sm font-medium text-white mb-2">1oo2 (1 out of 2)</p>
                  <p className="text-sm text-white mb-2">Two sensors, system operates if one works. Good for availability.</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>High availability</li>
                    <li>Moderate cost</li>
                    <li>Voting logic required</li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-sm font-medium text-white mb-2">2oo3 (2 out of 3)</p>
                  <p className="text-sm text-white mb-2">Three sensors, system uses two that agree. Best for safety.</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Highest safety integrity</li>
                    <li>Fault tolerance</li>
                    <li>Higher cost</li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-sm font-medium text-white mb-2">Standby Redundancy</p>
                  <p className="text-sm text-white mb-2">Backup sensor activates when primary fails. Lower cost option.</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Cost-effective</li>
                    <li>Automatic switchover</li>
                    <li>Brief interruption possible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fail-safe Design Principles</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Fail-safe States</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li><strong>Fail-Open:</strong> Circuit opens on failure (de-energise to trip)</li>
                    <li><strong>Fail-Closed:</strong> Circuit closes on failure (energise to trip)</li>
                    <li><strong>Fail-Fixed:</strong> Output goes to predetermined safe value</li>
                    <li><strong>Fail-Last:</strong> Maintains last known good value</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Diagnostic Features</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li><strong>Self-diagnostics:</strong> Built-in tests detect internal faults</li>
                    <li><strong>Range checking:</strong> Detect out-of-range readings</li>
                    <li><strong>Rate of change:</strong> Detect unrealistic signal changes</li>
                    <li><strong>Cross-checking:</strong> Compare multiple sensor readings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Specification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation ensures sensors are correctly specified, installed, and maintained throughout their service life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Documentation:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Specification Sheet</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Tag number and service description</li>
                    <li>Measurement range and units</li>
                    <li>Output signal type and range</li>
                    <li>Accuracy and response time</li>
                    <li>Environmental ratings (IP, temperature)</li>
                    <li>Process connection details</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Installation Records</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Physical location and orientation</li>
                    <li>Wiring and cable details</li>
                    <li>Calibration data and certificates</li>
                    <li>Commissioning test results</li>
                    <li>Maintenance schedule</li>
                    <li>Spare parts information</li>
                  </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Sensors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always review manufacturer datasheets thoroughly</li>
                <li>Verify environmental ratings match installation conditions</li>
                <li>Consider future expansion and standardisation</li>
                <li>Check lead times and availability before finalising</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Evaluating Options</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create comparison tables for shortlisted sensors</li>
                <li>Request samples for critical applications</li>
                <li>Check references from similar installations</li>
                <li>Evaluate supplier support and service capability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Selecting on price alone</strong> — false economy when reliability is compromised</li>
                <li><strong>Ignoring environmental conditions</strong> — sensors fail outside rated conditions</li>
                <li><strong>Over-specifying accuracy</strong> — paying for precision that is not required</li>
                <li><strong>Forgetting maintenance access</strong> — sensors that cannot be calibrated or replaced easily</li>
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
            <Link to="/study-centre/upskilling/instrumentation/module-3">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule2Section6;
