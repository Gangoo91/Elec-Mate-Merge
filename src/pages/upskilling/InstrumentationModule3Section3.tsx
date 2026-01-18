import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Signal Conditioning - Instrumentation Module 3 Section 3";
const DESCRIPTION = "Understanding filtering, isolation, and amplification techniques for preparing raw signals for reliable measurement and control systems.";

const quickCheckQuestions = [
  {
    id: "m3s3-q1",
    question: "What is the main purpose of signal isolation?",
    options: ["To increase signal amplitude", "To protect equipment and eliminate ground loops", "To filter out high-frequency noise", "To convert analogue to digital"],
    correctIndex: 1,
    explanation: "Signal isolation protects equipment from dangerous voltages, eliminates ground loops, and improves signal integrity by providing electrical separation between circuits."
  },
  {
    id: "m3s3-q2",
    question: "What does a low-pass filter do?",
    options: ["Blocks all frequencies below the cutoff", "Allows all frequencies to pass", "Allows frequencies below the cutoff while attenuating higher frequencies", "Amplifies low-frequency signals"],
    correctIndex: 2,
    explanation: "A low-pass filter allows frequencies below the cutoff frequency to pass through while attenuating (reducing) frequencies above it, effectively removing high-frequency noise."
  },
  {
    id: "m3s3-q3",
    question: "When is signal amplification needed?",
    options: ["When signals are too strong", "When dealing with weak signals from thermocouples or strain gauges", "To reduce signal noise", "To convert current to voltage"],
    correctIndex: 1,
    explanation: "Amplification is needed when dealing with weak signals from sensors like thermocouples (millivolts) or strain gauges to boost the signal level for better resolution and noise immunity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is signal isolation used?",
    options: [
      "To increase signal amplitude",
      "To protect equipment and improve signal integrity by breaking ground loops",
      "To filter out high-frequency noise",
      "To convert analogue signals to digital"
    ],
    correctAnswer: 1,
    explanation: "Signal isolation protects equipment from dangerous voltages, eliminates ground loops, and improves signal integrity by providing electrical separation."
  },
  {
    id: 2,
    question: "What does a low-pass filter do?",
    options: [
      "Blocks all frequencies below the cutoff point",
      "Allows all frequencies to pass through unchanged",
      "Allows frequencies below the cutoff point to pass while attenuating higher frequencies",
      "Amplifies low-frequency signals only"
    ],
    correctAnswer: 2,
    explanation: "A low-pass filter allows frequencies below the cutoff frequency to pass through while attenuating frequencies above the cutoff point."
  },
  {
    id: 3,
    question: "When would you need amplification?",
    options: [
      "Only when signals are too strong",
      "When dealing with weak signals from sensors like thermocouples or strain gauges",
      "To reduce signal noise",
      "To convert current signals to voltage"
    ],
    correctAnswer: 1,
    explanation: "Amplification is needed when dealing with weak signals from sensors like thermocouples (millivolts) or strain gauges to boost the signal level."
  },
  {
    id: 4,
    question: "What are the benefits of digital conditioning?",
    options: [
      "Lower cost than analogue methods",
      "Faster response times",
      "Better accuracy, flexibility, and software-based adjustments",
      "Simpler circuit design"
    ],
    correctAnswer: 2,
    explanation: "Digital signal conditioning offers better accuracy through precise algorithms, flexibility to modify parameters via software, and immunity to component drift."
  },
  {
    id: 5,
    question: "What is one risk of unfiltered signals in a control system?",
    options: [
      "Reduced power consumption",
      "False triggering and incorrect control actions due to noise",
      "Improved signal quality",
      "Better system response time"
    ],
    correctAnswer: 1,
    explanation: "Unfiltered signals can contain noise that causes false triggering of alarms, incorrect control actions, and unstable system behaviour."
  },
  {
    id: 6,
    question: "What type of isolation uses light to transfer signals?",
    options: [
      "Transformer isolation",
      "Capacitive isolation",
      "Optical isolation (optocouplers)",
      "Resistive isolation"
    ],
    correctAnswer: 2,
    explanation: "Optical isolation uses optocouplers where an LED and photodetector transfer signals across an isolation barrier using light."
  },
  {
    id: 7,
    question: "What is the typical low-pass filter cutoff frequency for temperature signals?",
    options: [
      "100-1000 Hz",
      "0.1-1 Hz",
      "10-100 Hz",
      "1-10 kHz"
    ],
    correctAnswer: 1,
    explanation: "Temperature signals typically use very low cutoff frequencies (0.1-1 Hz) because temperature changes slowly and high-frequency components are noise."
  },
  {
    id: 8,
    question: "What is the main advantage of instrumentation amplifiers?",
    options: [
      "Lowest cost option",
      "High common-mode rejection and precise gain",
      "Fastest response time",
      "Simplest circuit design"
    ],
    correctAnswer: 1,
    explanation: "Instrumentation amplifiers offer high common-mode rejection, precise gain setting, high input impedance, and low noise - ideal for precision measurement."
  },
  {
    id: 9,
    question: "Which conditioning technique removes DC offset from signals?",
    options: [
      "Low-pass filter",
      "High-pass filter",
      "Amplification",
      "Isolation"
    ],
    correctAnswer: 1,
    explanation: "High-pass filters block DC (0 Hz) and low frequencies, effectively removing DC offset from signals while passing higher frequencies."
  },
  {
    id: 10,
    question: "What causes ground loops in measurement systems?",
    options: [
      "Excessive signal amplification",
      "Different ground potentials between connected equipment",
      "High-frequency noise",
      "Low input impedance"
    ],
    correctAnswer: 1,
    explanation: "Ground loops occur when different pieces of equipment are connected to different ground points with different potentials, causing current flow through signal cables."
  }
];

const faqs = [
  {
    question: "When should I use analogue versus digital filtering?",
    answer: "Use analogue filtering for time-critical applications requiring real-time response and anti-aliasing before ADC conversion. Use digital filtering when you need flexibility, precision, or complex filter characteristics that would be difficult to achieve with analogue circuits."
  },
  {
    question: "How do I choose the correct filter cutoff frequency?",
    answer: "Set the cutoff frequency above the highest frequency component of your measurement signal but below the noise frequencies you want to remove. For temperature signals, this is typically 0.1-1 Hz; for pressure, 1-10 Hz; for flow, 0.5-5 Hz."
  },
  {
    question: "What isolation voltage rating do I need?",
    answer: "Choose an isolation voltage at least 2-3 times the maximum expected voltage in your system. For industrial applications with 230V mains, use 1500V or higher isolation. For high-voltage applications, use 3000V or higher rated isolators."
  },
  {
    question: "Why does amplification also amplify noise?",
    answer: "Amplifiers increase all signal components, including noise present at the input. This is why filtering before amplification is often beneficial, and why low-noise amplifier designs are important for weak signal applications."
  },
  {
    question: "What is common-mode rejection and why is it important?",
    answer: "Common-mode rejection is an amplifier's ability to reject signals that appear equally on both inputs. High CMRR (Common-Mode Rejection Ratio) is crucial for accurately measuring small differential signals in the presence of large common-mode noise or interference."
  }
];

const InstrumentationModule3Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Signal Conditioning
          </h1>
          <p className="text-white/80">
            Filtering, isolation, and amplification for reliable measurements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Filtering:</strong> Removes unwanted frequency components</li>
              <li><strong>Isolation:</strong> Breaks ground loops, protects equipment</li>
              <li><strong>Amplification:</strong> Boosts weak signals for processing</li>
              <li><strong>Result:</strong> Clean, reliable measurement signals</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Noisy readings indicate filtering needed</li>
              <li><strong>Use:</strong> Low-pass filter cutoff below noise frequency</li>
              <li><strong>Remember:</strong> Filter before amplification when possible</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why signal conditioning is required in measurement systems",
              "Identify common conditioning methods and their applications",
              "Learn the impact of each technique on signal quality",
              "Compare analogue and digital signal conditioning approaches",
              "Select appropriate conditioning for different sensor types",
              "Troubleshoot signal conditioning problems effectively"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Signal Filtering */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Signal Filtering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Filtering removes unwanted frequency components from signals, primarily noise that can interfere with accurate measurements. Different filter types target specific frequency ranges to preserve the desired signal while eliminating interference.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Filter Types:</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Low-Pass Filters</p>
                  <p className="text-white text-sm">Allow frequencies below the cutoff to pass, attenuating higher frequencies. Used for anti-aliasing, EMI reduction, and smoothing control signals.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">High-Pass Filters</p>
                  <p className="text-white text-sm">Allow frequencies above the cutoff, blocking lower frequencies. Used for DC offset removal, vibration monitoring, and AC coupling.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Band-Pass Filters</p>
                  <p className="text-white text-sm">Allow only a specific frequency range to pass. Used for isolating specific signal frequencies in communication and vibration analysis.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Cutoff Frequencies by Application:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> 0.1-1 Hz (slow-changing signals)</li>
                <li><strong>Pressure:</strong> 1-10 Hz (moderate dynamics)</li>
                <li><strong>Flow:</strong> 0.5-5 Hz (depends on flow type)</li>
                <li><strong>Level:</strong> 0.1-1 Hz (slow process)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Filter Implementation:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 mb-1">Analogue Filters:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li>RC filters - simple, low cost</li>
                    <li>Active filters - op-amp based with gain</li>
                    <li>Butterworth - flat passband response</li>
                    <li>Bessel - linear phase response</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 mb-1">Digital Filters:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li>FIR - finite impulse response, stable</li>
                    <li>IIR - infinite impulse response, efficient</li>
                    <li>Moving average - simple noise reduction</li>
                    <li>Kalman - advanced predictive filtering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 02 - Signal Isolation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Signal Isolation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Signal isolation provides electrical separation between input and output circuits, protecting equipment and personnel while improving signal integrity by eliminating ground loops and common-mode interference.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Isolation Methods:</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Optical Isolation (Optocouplers)</p>
                  <p className="text-white text-sm">Uses light to transfer signals across an isolation barrier. Complete electrical isolation, fast response, high voltage isolation (&gt;1kV), immune to EMI.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Transformer Isolation</p>
                  <p className="text-white text-sm">Magnetic coupling for AC signals. High isolation voltage, good linearity, wide bandwidth. Used for audio, communications, and AC measurements.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Capacitive Isolation</p>
                  <p className="text-white text-sm">Silicon-based isolation using capacitive coupling. Small size, integrated with other functions, precise timing, digital signal compatible.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Isolation Applications:</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Safety Protection</p>
                  <ul className="text-white space-y-1">
                    <li>High-voltage protection</li>
                    <li>Personnel safety</li>
                    <li>Equipment protection</li>
                    <li>Fault containment</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Signal Integrity</p>
                  <ul className="text-white space-y-1">
                    <li>Ground loop elimination</li>
                    <li>Common-mode rejection</li>
                    <li>Noise reduction</li>
                    <li>Interference immunity</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">System Integration</p>
                  <ul className="text-white space-y-1">
                    <li>Different ground potentials</li>
                    <li>Level shifting</li>
                    <li>Interface compatibility</li>
                    <li>System modularity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 - Signal Amplification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Signal Amplification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amplification increases signal levels to improve measurement resolution, overcome transmission losses, and ensure adequate signal-to-noise ratios for reliable system operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Amplifier Types:</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Instrumentation Amplifiers</p>
                  <p className="text-white text-sm">Specialised for precision measurement. High input impedance (&gt;1GΩ), low offset and drift, high common-mode rejection, precise gain setting. Used for thermocouples, strain gauges, bridge circuits.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Operational Amplifiers</p>
                  <p className="text-white text-sm">Versatile building blocks. Non-inverting, inverting, differential, and summing configurations. Consider bandwidth, input bias current, offset voltage, and slew rate.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Programmable Gain Amplifiers (PGA)</p>
                  <p className="text-white text-sm">Digitally controlled gain selection. Flexible gain adjustment, auto-ranging capability, improved dynamic range, digital control interface.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Considerations:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 mb-1">Design Factors:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li><strong>Gain:</strong> Balance resolution vs noise</li>
                    <li><strong>Bandwidth:</strong> Maintain signal fidelity</li>
                    <li><strong>Input impedance:</strong> Avoid loading effects</li>
                    <li><strong>Power supply:</strong> Adequate voltage ranges</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 mb-1">Common Challenges:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li><strong>Noise amplification:</strong> Amplifies noise with signal</li>
                    <li><strong>Offset drift:</strong> Temperature-dependent errors</li>
                    <li><strong>Saturation:</strong> Limited output swing</li>
                    <li><strong>Stability:</strong> Oscillation prevention</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Analogue vs Digital */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Analogue vs Digital Conditioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between analogue and digital signal conditioning depends on performance requirements, cost constraints, and system architecture considerations.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/20 rounded">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-2 text-left text-elec-yellow/80 border-b border-white/20">Aspect</th>
                    <th className="p-2 text-left border-b border-white/20">Analogue</th>
                    <th className="p-2 text-left border-b border-white/20">Digital</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-white/10 text-elec-yellow/80">Processing Speed</td>
                    <td className="p-2 border-b border-white/10">Real-time, no delay</td>
                    <td className="p-2 border-b border-white/10">Limited by sampling rate</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-white/10 text-elec-yellow/80">Flexibility</td>
                    <td className="p-2 border-b border-white/10">Fixed hardware design</td>
                    <td className="p-2 border-b border-white/10">Software programmable</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-white/10 text-elec-yellow/80">Accuracy</td>
                    <td className="p-2 border-b border-white/10">Component dependent</td>
                    <td className="p-2 border-b border-white/10">High precision possible</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-white/10 text-elec-yellow/80">Temperature Drift</td>
                    <td className="p-2 border-b border-white/10">Significant drift possible</td>
                    <td className="p-2 border-b border-white/10">Minimal drift</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-white/10 text-elec-yellow/80">Power</td>
                    <td className="p-2 border-b border-white/10">Generally lower</td>
                    <td className="p-2 border-b border-white/10">Higher due to ADC/DSP</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-elec-yellow/80">Cost</td>
                    <td className="p-2">Lower for simple circuits</td>
                    <td className="p-2">Higher initial cost</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Best Practice:</p>
              <p className="text-white text-sm">Use analogue conditioning for time-critical applications and digital conditioning where flexibility and precision are paramount. Hybrid approaches often provide optimal solutions.</p>
            </div>
          </div>
        </section>

        {/* Section 05 - Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A manufacturing facility with heavy motor noise requires precise temperature monitoring for quality control. RTD sensors must provide accurate readings despite electromagnetic interference.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Multi-Stage Conditioning Solution:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">1</span>
                  <div>
                    <p className="text-white font-medium">Signal Isolation</p>
                    <p className="text-white/80 text-sm">Isolated RTD transmitters break ground loops between sensor circuits and control system, eliminating 50Hz noise pickup from motor drives.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">2</span>
                  <div>
                    <p className="text-white font-medium">Low-Pass Filtering</p>
                    <p className="text-white/80 text-sm">0.5Hz cutoff filters remove high-frequency EMI while preserving temperature response. Analogue filters provide immediate noise reduction before ADC conversion.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">3</span>
                  <div>
                    <p className="text-white font-medium">Signal Amplification</p>
                    <p className="text-white/80 text-sm">Instrumentation amplifiers boost millivolt RTD signals to 4-20mA for long-distance transmission to control room 200m away.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold">4</span>
                  <div>
                    <p className="text-white font-medium">Digital Processing</p>
                    <p className="text-white/80 text-sm">PLC applies additional digital filtering and linearisation to achieve ±0.1°C accuracy for critical process control.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
              <p className="text-sm font-medium text-white mb-2">Results:</p>
              <p className="text-white text-sm">Multi-stage conditioning reduced temperature measurement noise by 95%, eliminated false alarms, and improved process control stability, resulting in 2% quality improvement and reduced waste.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Conditioning Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Apply isolation first to break ground loops</li>
                <li>Filter before amplification to avoid amplifying noise</li>
                <li>Set amplifier gain to match ADC input range</li>
                <li>Add digital filtering for fine adjustment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Troubleshooting Signal Quality</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Noisy readings: Check filter cutoff frequency and grounding</li>
                <li>Drifting values: Check temperature effects on analogue circuits</li>
                <li>Erratic behaviour: Look for ground loops or interference sources</li>
                <li>Saturated output: Reduce amplifier gain or extend input range</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Setting filter cutoff too low</strong> — causes sluggish response to real changes</li>
                <li><strong>Insufficient isolation voltage rating</strong> — risks equipment damage or safety hazards</li>
                <li><strong>Amplifying before filtering</strong> — amplifies noise along with signal</li>
                <li><strong>Ignoring temperature effects</strong> — causes calibration drift in analogue circuits</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
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

export default InstrumentationModule3Section3;
