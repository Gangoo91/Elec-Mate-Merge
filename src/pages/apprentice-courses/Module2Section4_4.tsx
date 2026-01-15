import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";
import frequencyImg from "@/assets/module2-4-4-frequency.png";

const TITLE = "Frequency & UK Mains - Level 2 Module 2 Section 4.4";
const DESCRIPTION = "Comprehensive guide to frequency and period for UK electricians: 50Hz mains, motor speeds, timing, measurement techniques with BS 7671 guidance.";

const quickCheckQuestions = [
  {
    id: "frequency-period",
    question: "What is the period of UK 50Hz mains supply?",
    options: ["10ms", "20ms", "50ms", "100ms"],
    correctIndex: 1,
    explanation: "T = 1/f = 1/50Hz = 0.02s = 20ms. Each complete cycle takes 20 milliseconds."
  },
  {
    id: "motor-speed",
    question: "A 4-pole induction motor on 50Hz supply has a synchronous speed of approximately:",
    options: ["750 rpm", "1500 rpm", "3000 rpm", "6000 rpm"],
    correctIndex: 1,
    explanation: "Synchronous speed = 120 × f ÷ poles = 120 × 50 ÷ 4 = 1500 rpm (actual speed slightly lower due to slip)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the frequency of UK mains?",
    options: ["60 Hz", "50 Hz", "25 Hz", "400 Hz"],
    correctAnswer: 1,
    explanation: "Public UK mains supply is 50 Hz.",
  },
  {
    id: 2,
    question: "What is the period T for 50 Hz?",
    options: ["10 ms", "20 ms", "50 ms", "100 ms"],
    correctAnswer: 1,
    explanation: "T = 1/f = 1/50 s = 0.02 s = 20 ms.",
  },
  {
    id: 3,
    question: "Increasing frequency does what to the period?",
    options: ["Increases T", "Decreases T", "No change", "Makes T negative"],
    correctAnswer: 1,
    explanation: "f and T are inverses: higher f means shorter T.",
  },
  {
    id: 4,
    question: "Which equipment's speed is linked to supply frequency?",
    options: ["DC battery", "Resistive heater", "Induction motor", "Incandescent lamp"],
    correctAnswer: 2,
    explanation: "Synchronous/induction motor speed depends on frequency.",
  },
  {
    id: 5,
    question: "50 Hz has a period of 20 ms. How many cycles occur in 0.1 s?",
    options: ["2", "5", "10", "50"],
    correctAnswer: 2,
    explanation: "0.1 s × 50 Hz = 5 cycles.",
  },
  {
    id: 6,
    question: "What is f if T = 10 ms?",
    options: ["10 Hz", "50 Hz", "100 Hz", "1,000 Hz"],
    correctAnswer: 2,
    explanation: "f = 1/T = 1/0.01 s = 100 Hz.",
  },
  {
    id: 7,
    question: "Why might lighting flicker be noticed with certain lamps?",
    options: [
      "Because f = 0",
      "Because the supply frequency and lamp type can cause visible modulation",
      "Because voltage is DC",
      "Because lamps are always faulty",
    ],
    correctAnswer: 1,
    explanation: "Some lamps modulate with the AC cycle; design may reduce flicker.",
  },
  {
    id: 8,
    question: "Which formula is correct?",
    options: ["f = T", "T = 1/f", "T = f", "f = 1/T^2"],
    correctAnswer: 1,
    explanation: "Frequency and period are reciprocals: T = 1/f.",
  },
  {
    id: 9,
    question: "At 50 Hz, what is the ideal synchronous speed of a 2-pole motor?",
    options: ["1,500 rpm", "3,000 rpm", "750 rpm", "6,000 rpm"],
    correctAnswer: 1,
    explanation: "n_s ≈ 120f/poles = 120×50/2 = 3,000 rpm (actual induction motors run slightly slower).",
  },
  {
    id: 10,
    question: "Your meter shows 49.8 Hz on site. What should you do?",
    options: [
      "Panic",
      "Nothing: small variation is normal",
      "Report a fault immediately",
      "Change to DC",
    ],
    correctAnswer: 1,
    explanation: "Small mains frequency variations are normal within control limits.",
  },
];

const faqs = [
  {
    question: "Is exactly 50.00Hz required for UK mains?",
    answer: "No. Small variations like 49.8-50.2Hz are normal. The grid maintains frequency within statutory limits (±1% typically), balancing generation and demand in real-time."
  },
  {
    question: "How does frequency affect motor speed?",
    answer: "Motor speed is roughly proportional to frequency. A 50Hz 4-pole motor runs at ~1500rpm synchronous speed. Induction motors run slightly slower due to slip (typically 2-5%)."
  },
  {
    question: "Can I use 60Hz equipment on 50Hz supply?",
    answer: "Check the nameplate. Many items are rated 50/60Hz and work fine. Motors may run 17% slower, transformers may need derating, and timing circuits may be affected."
  },
  {
    question: "Why do some LED lights flicker?",
    answer: "Poor driver design can cause visible modulation at supply frequency (50Hz) or its harmonics. Quality drivers use high-frequency switching and better filtering to eliminate flicker."
  },
  {
    question: "What meter function measures frequency?",
    answer: "Use the Hz function on your multimeter. Ensure adequate safety rating (CAT III/IV as appropriate) and check the measurement range covers 45-65Hz for mains work."
  },
  {
    question: "Do harmonics affect the fundamental frequency?",
    answer: "No. Harmonics are multiples of the fundamental (100Hz, 150Hz, etc.) but the fundamental remains 50Hz. However, harmonics can affect power quality and measurement accuracy."
  }
];

const Module2Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Frequency & UK Mains
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            50Hz fundamentals, period calculations, motor speeds and timing — practical frequency knowledge for electricians
          </p>
        </header>

        {/* Summary Box */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <p className="text-sm text-white/80 leading-relaxed">
            <strong className="text-elec-yellow">Key Points:</strong> UK mains operates at 50Hz ±1% with a 20ms period.
            Motor synchronous speed = 120 × f ÷ poles. Small frequency variations are normal. Use Hz function on CAT-rated meters for measurement.
          </p>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>State UK mains frequency and calculate period using T = 1/f</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Calculate synchronous motor speeds from frequency and pole numbers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise normal frequency variations and when to investigate further</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand frequency effects on timing circuits and equipment operation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use appropriate measurement techniques and safety procedures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply 50/60Hz equipment compatibility considerations</span>
            </li>
          </ul>
        </section>

        {/* Section 2: UK Mains Frequency Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            UK Mains Frequency and Period Relationships
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              UK mains operates at 50Hz with period T = 1/f = 20ms. Understanding this relationship is fundamental for motor calculations, timing circuits, and system analysis.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Frequency and Period Relationship</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <img
                      src={frequencyImg}
                      alt="Diagram showing multiple sine cycles with one period T highlighted and annotations f = 1/T, 50 Hz and T = 20 ms"
                      loading="lazy"
                      className="w-full rounded-lg mb-4"
                    />
                    <p className="text-white text-sm mb-2"><strong>Basic Relationships:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>Frequency (f):</strong> Number of complete cycles per second (Hz)</li>
                      <li><strong>Period (T):</strong> Time for one complete cycle (seconds)</li>
                      <li><strong>Formula:</strong> T = 1/f and f = 1/T</li>
                      <li><strong>UK Standard:</strong> 50Hz → T = 1/50 = 0.02s = 20ms</li>
                      <li><strong>Visualisation:</strong> 50 complete sine waves in one second</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Grid Frequency Control:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>Target:</strong> 50.00Hz but ±1% variation normal</li>
                      <li><strong>Typical range:</strong> 49.5Hz to 50.5Hz during normal operation</li>
                      <li><strong>Load effect:</strong> High demand pulls frequency down slightly</li>
                      <li><strong>Control:</strong> Generation automatically adjusts to maintain frequency</li>
                      <li><strong>Monitoring:</strong> National Grid continuously balances supply and demand</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Practical Calculations</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Worked Examples:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>25Hz period:</strong> T = 1/25 = 0.04s = 40ms (half of 50Hz period)</li>
                      <li><strong>5ms period frequency:</strong> f = 1/0.005s = 200Hz (4x mains frequency)</li>
                      <li><strong>Cycles per minute:</strong> 50Hz × 60s = 3000 cycles per minute</li>
                      <li><strong>Half-cycle time:</strong> 20ms ÷ 2 = 10ms (used in zero-crossing detection)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Key Insight:</strong> Understanding frequency and period relationships is essential for timing circuits,
                  motor calculations, and power system analysis. The 20ms period is fundamental to many electrical calculations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 3: Motor Speed and Frequency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Motor Speed Calculations and Applications
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              Motor speed is directly related to supply frequency through the synchronous speed formula. Understanding this relationship is essential for motor selection and troubleshooting.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Synchronous Speed Formula</h3>
                <div className="space-y-3">
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                    <p className="text-elec-yellow text-sm mb-2"><strong>Formula: ns = 120 × f ÷ poles</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                      <li><strong>ns:</strong> Synchronous speed in rpm</li>
                      <li><strong>f:</strong> Supply frequency in Hz</li>
                      <li><strong>poles:</strong> Number of magnetic poles (always even: 2, 4, 6, 8, etc.)</li>
                      <li><strong>120:</strong> Conversion factor (60 seconds/minute × 2)</li>
                      <li><strong>Example:</strong> 4-pole motor at 50Hz = 120 × 50 ÷ 4 = 1500rpm</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Standard 50Hz Synchronous Speeds:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>2-pole:</strong> 120 × 50 ÷ 2 = 3000 rpm (high speed applications)</li>
                      <li><strong>4-pole:</strong> 120 × 50 ÷ 4 = 1500 rpm (most common industrial)</li>
                      <li><strong>6-pole:</strong> 120 × 50 ÷ 6 = 1000 rpm (medium speed applications)</li>
                      <li><strong>8-pole:</strong> 120 × 50 ÷ 8 = 750 rpm (low speed, high torque)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Induction Motor Slip</h3>
                <div className="space-y-3">
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                    <p className="text-elec-yellow text-sm mb-2"><strong>Slip Characteristics:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                      <li><strong>Definition:</strong> Difference between synchronous and actual speed</li>
                      <li><strong>Typical slip:</strong> 2-5% at full load for standard motors</li>
                      <li><strong>Calculation:</strong> Slip % = (ns - n)/ns × 100</li>
                      <li><strong>Load effect:</strong> More load increases slip, reducing actual speed</li>
                      <li><strong>Example:</strong> 1500rpm sync, 3% slip → actual speed ≈ 1455rpm</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Factors Affecting Slip:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>Load torque:</strong> Higher load = higher slip</li>
                      <li><strong>Voltage:</strong> Low voltage increases slip</li>
                      <li><strong>Motor design:</strong> High-efficiency motors have lower slip</li>
                      <li><strong>Temperature:</strong> Heat increases rotor resistance, affecting slip</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Practical Note:</strong> Always check motor nameplates for actual rated speed. Induction motors
                  run slower than synchronous speed due to slip, which varies with load and motor design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 4: Measurement and Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequency Measurement and Monitoring
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              Accurate frequency measurement requires proper instrument selection and safe measurement techniques. Understanding normal variations helps distinguish between normal operation and faults.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-teal-300 mb-3">Measurement Equipment and Safety</h3>
                <div className="space-y-3">
                  <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Suitable Instruments:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-teal-100">
                      <li><strong>Digital multimeters:</strong> Hz function with appropriate CAT rating</li>
                      <li><strong>Power quality analysers:</strong> For detailed analysis and logging</li>
                      <li><strong>Oscilloscopes:</strong> Visual waveform analysis and period measurement</li>
                      <li><strong>Clamp meters:</strong> Non-contact frequency measurement capability</li>
                      <li><strong>Panel meters:</strong> Permanent monitoring in switchboards</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Safety Requirements:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>CAT rating:</strong> CAT III 600V minimum for distribution boards</li>
                      <li><strong>CAT IV rating:</strong> Required for service entrance measurements</li>
                      <li><strong>Test leads:</strong> Appropriate voltage rating and good condition</li>
                      <li><strong>PPE:</strong> As required for voltage level and arc flash risk assessment</li>
                      <li><strong>Isolation:</strong> Use designated test points where available</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-300 mb-3">Normal Variations and Limits</h3>
                <div className="space-y-3">
                  <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Expected Frequency Ranges:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-teal-100">
                      <li><strong>Normal operation:</strong> 49.5Hz to 50.5Hz typical daily range</li>
                      <li><strong>Statutory limits:</strong> ±1% (49.5Hz to 50.5Hz) for public supply</li>
                      <li><strong>Daily variation:</strong> ±0.2Hz common with demand patterns</li>
                      <li><strong>Transient events:</strong> Brief excursions during major switching</li>
                      <li><strong>Measurement accuracy:</strong> ±0.1Hz typical for standard site instruments</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>When to Investigate Further:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>Persistent low frequency:</strong> Below 49.5Hz for extended periods</li>
                      <li><strong>Rapid fluctuations:</strong> Frequency changing rapidly or erratically</li>
                      <li><strong>Equipment-specific limits:</strong> Some equipment has tighter tolerances</li>
                      <li><strong>Generator sets:</strong> Should maintain ±0.5Hz or better under load</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-elec-yellow">
                  <strong>Safety Warning:</strong> Never probe live terminals unnecessarily. Use designated test points,
                  voltage indicators, or non-contact methods where available. Always follow safe isolation procedures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Equipment Compatibility and Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Equipment Compatibility and Timing Applications
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              Frequency affects equipment operation, timing accuracy, and compatibility. Understanding these relationships helps with proper equipment selection and troubleshooting.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-3">50Hz vs 60Hz Equipment</h3>
                <div className="space-y-3">
                  <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Equipment Categories:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-amber-100">
                      <li><strong>Universal (50/60Hz):</strong> Most modern SMPS, electronics, many motors</li>
                      <li><strong>Frequency-specific:</strong> Some transformers, older motors, timing equipment</li>
                      <li><strong>Speed-critical:</strong> Synchronous motors, record players, some clocks</li>
                      <li><strong>Rating changes:</strong> Transformers may need derating at off-frequency</li>
                      <li><strong>Performance effects:</strong> 60Hz motors run 17% slower on 50Hz supply</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Nameplate Identification:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
                      <li><strong>Check ratings:</strong> Look for "50Hz", "60Hz", or "50/60Hz" markings</li>
                      <li><strong>CE marking:</strong> European equipment typically 50/60Hz compatible</li>
                      <li><strong>Speed ratings:</strong> Motor speeds indicate design frequency</li>
                      <li><strong>Power ratings:</strong> May differ between 50Hz and 60Hz operation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-3">Timing and Control Applications</h3>
                <div className="space-y-3">
                  <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Frequency-Dependent Systems:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-amber-100">
                      <li><strong>Synchronous clocks:</strong> Directly depend on mains frequency for timekeeping</li>
                      <li><strong>Motor-driven timers:</strong> Speed and timing vary with frequency</li>
                      <li><strong>Heating controllers:</strong> Some use zero-crossing detection for switching</li>
                      <li><strong>Lighting dimmers:</strong> Phase-angle control synchronised to mains</li>
                      <li><strong>Power supplies:</strong> Transformer design affects regulation and efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-3">Modern Drive and Control Systems</h3>
                <div className="space-y-3">
                  <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Variable Frequency Drives:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-amber-100">
                      <li><strong>Input frequency:</strong> Typically accepts 50Hz ±5% without issues</li>
                      <li><strong>Output control:</strong> Can generate any frequency from DC to rated maximum</li>
                      <li><strong>Motor control:</strong> Speed independent of supply frequency variations</li>
                      <li><strong>Efficiency:</strong> May vary slightly with input frequency changes</li>
                      <li><strong>Harmonics:</strong> Input current waveform affected by supply frequency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Installation Tip:</strong> Always verify equipment frequency compatibility before installation.
                  When in doubt, consult manufacturer specifications or contact technical support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real-world Examples
          </h2>
          <div className="space-y-6 text-white/80">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-2">Motor Speed Troubleshooting</h3>
              <p className="text-white/70 text-sm">
                <strong>Situation:</strong> Factory conveyor running 5% slower than expected, affecting production line timing.
                <br /><br />
                <strong>Investigation:</strong> Checked supply frequency: 49.7Hz (within normal range). Motor nameplate: 4-pole, 1450rpm rated.
                <br /><br />
                <strong>Calculation:</strong> Synchronous speed = 120 × 49.7 ÷ 4 = 1491rpm. With 3% slip: actual ≈ 1446rpm.
                <br /><br />
                <strong>Outcome:</strong> Speed was correct for supply conditions. Production timing adjusted to account for measured frequency variation.
              </p>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-2">Import Equipment Frequency Issues</h3>
              <p className="text-white/80 text-sm">
                <strong>Situation:</strong> 60Hz equipment from North America installed in UK facility without frequency compatibility check.
                <br /><br />
                <strong>Problem:</strong> Synchronous motors ran 17% slower (2500rpm vs 3000rpm), transformers ran cooler but with higher magnetising current.
                <br /><br />
                <strong>Solution:</strong> Verified equipment could operate at 50Hz per manufacturer data. Process speeds adjusted accordingly for the lower motor speeds.
                <br /><br />
                <strong>Learning:</strong> Always verify frequency compatibility before installation, especially for imported equipment.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequency — Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/80">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Quick Calculations</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Period: T = 1/f (50Hz → 20ms)</li>
                <li>Motor speed: ns = 120f/poles</li>
                <li>50Hz: 2P→3000, 4P→1500, 6P→1000, 8P→750 rpm</li>
                <li>Actual = Synchronous × (1 - slip%/100)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Normal Ranges</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>UK mains: 49.5-50.5Hz typical</li>
                <li>Daily variation: ±0.2Hz common</li>
                <li>Motor slip: 2-5% at full load</li>
                <li>Measurement: ±0.1Hz accuracy typical</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section aria-label="Quiz" className="mb-10">
          <Quiz questions={quizQuestions} title="Test Your Knowledge — Frequency & UK Mains" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-3"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-5">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section4_4;
