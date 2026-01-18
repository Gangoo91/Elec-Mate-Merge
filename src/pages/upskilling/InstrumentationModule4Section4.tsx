import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule4Section4 = () => {
  useSEO({
    title: "Measurement Equipment: Multimeters, Clamp Meters, Oscilloscopes | Instrumentation Course",
    description: "Learn about key electrical measurement instruments including digital multimeters, clamp meters, and oscilloscopes."
  });

  const quizQuestions = [
    {
      id: 1,
      question: "Which tool visualises electrical waveforms?",
      options: [
        "Multimeter",
        "Clamp meter",
        "Oscilloscope",
        "Frequency counter"
      ],
      correct: 2,
      explanation: "Oscilloscopes display voltage waveforms over time, allowing analysis of signal shape, timing, and characteristics that other instruments cannot show."
    },
    {
      id: 2,
      question: "Why use a clamp meter over direct current testing?",
      options: [
        "More accurate readings",
        "Cheaper to purchase",
        "No need to break the circuit for measurement",
        "Better for AC measurements only"
      ],
      correct: 2,
      explanation: "Clamp meters measure current non-intrusively by detecting the magnetic field around a conductor, eliminating the need to disconnect circuits."
    },
    {
      id: 3,
      question: "What feature protects a multimeter from overload?",
      options: [
        "Auto-ranging",
        "Fuse protection",
        "Digital display",
        "Probe leads"
      ],
      correct: 1,
      explanation: "Fuse protection prevents damage to the meter's internal circuits when excessive current flows through the measurement path."
    },
    {
      id: 4,
      question: "When is an oscilloscope preferred over a DMM?",
      options: [
        "For basic voltage measurements",
        "When you need to see waveform details and timing",
        "For resistance measurements",
        "For current measurements only"
      ],
      correct: 1,
      explanation: "Oscilloscopes excel at showing signal behaviour over time, revealing details like distortion, noise, and timing that DMMs cannot display."
    },
    {
      id: 5,
      question: "What safety precaution should you follow with all measurement tools?",
      options: [
        "Always use the highest range setting",
        "Check instrument ratings match circuit conditions",
        "Only use digital instruments",
        "Avoid using probes"
      ],
      correct: 1,
      explanation: "Always verify that the instrument's voltage, current, and frequency ratings are suitable for the circuit being measured to prevent damage and ensure safety."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-4" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Module 4
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Measurement Equipment Overview
          </h1>
          <p className="text-white/80">
            Multimeters, clamp meters, and oscilloscopes
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2">Quick Summary</h2>
          <p className="text-white text-sm">
            With the right tool, you can make the right diagnosis. Understanding each instrument's capabilities and limitations is essential for effective troubleshooting and system analysis.
          </p>
        </div>

        {/* Section 01: Digital Multimeters */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Digital Multimeters (DMMs)</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Digital multimeters are the most versatile and commonly used electrical test instruments, capable of measuring voltage, current, resistance, and often additional parameters.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Core Functions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Basic Measurements:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      DC and AC voltage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      DC and AC current
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Resistance and continuity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Diode and transistor testing
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Advanced Features:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Frequency measurement
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Capacitance
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Temperature (with probe)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      True RMS for non-sinusoidal
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">DMM Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Handheld DMMs</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• 3.5 to 4.5 digit resolution</li>
                    <li>• Battery powered, portable</li>
                    <li>• Rugged construction</li>
                    <li>• CAT II/III/IV ratings available</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Bench DMMs</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• 5.5 to 8.5 digit resolution</li>
                    <li>• Superior accuracy</li>
                    <li>• Computer interface</li>
                    <li>• Advanced maths functions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Safety Features</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Input protection fuses on current ranges
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  High voltage input protection circuits
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  CAT ratings for installation safety
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Low battery and overload indicators
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why is True RMS measurement important for AC readings?"
          answer="True RMS accurately measures non-sinusoidal waveforms (like those from VSDs, dimmers, or switch-mode power supplies). Average-responding meters only give correct readings for pure sine waves and will show errors on distorted waveforms."
        />

        {/* Section 02: Clamp Meters */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Clamp Meters</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Clamp meters measure current by detecting the magnetic field around a conductor, allowing non-contact measurement without breaking the circuit.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Operating Principle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">AC Clamp Meters:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Transformer action principle
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Conductor is the primary
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Clamp core is the secondary
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Only works with AC current
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">DC/AC Clamp Meters:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Hall effect sensor technology
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Measures both AC and DC
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      More expensive
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Requires zero adjustment
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Advantages and Limitations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-400 font-medium text-sm mb-2">Advantages:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      No circuit interruption required
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Safe for live measurements
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Can measure very high currents
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Quick and convenient
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-400 font-medium text-sm mb-2">Limitations:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Lower accuracy than series measurement
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Sensitive to conductor position
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Affected by adjacent conductors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Minimum current threshold
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Can you measure the total current in a three-phase circuit by clamping around all three conductors together?"
          answer="No. In a balanced three-phase system, the magnetic fields cancel out and you would read near zero. You must clamp around each conductor individually to measure phase currents."
        />

        {/* Section 03: Oscilloscopes */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Oscilloscopes</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Oscilloscopes display voltage waveforms over time, revealing signal characteristics invisible to other instruments.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">What Oscilloscopes Show</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Signal Characteristics:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Amplitude and frequency
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Rise and fall times
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Distortion and noise content
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Phase relationships
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Transient events and glitches
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Key Capabilities:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Time domain analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Frequency domain (FFT)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Multiple channel comparison
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Advanced triggering options
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Automatic measurements
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Bandwidth</h4>
                  <p className="text-white text-xs">Highest frequency that can be accurately measured. Should be 5x the signal frequency for amplitude accuracy.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Sample Rate</h4>
                  <p className="text-white text-xs">How frequently the scope samples the input. Higher rates capture faster details.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Memory Depth</h4>
                  <p className="text-white text-xs">Amount of data that can be captured. More memory allows longer captures at full sample rate.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Channels</h4>
                  <p className="text-white text-xs">Number of signals viewable simultaneously. 2 or 4 channels are common.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Tool Selection Guide */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Choosing the Right Tool</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-card/50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background/50 rounded p-4 border-l-2 border-blue-400">
                  <h4 className="text-blue-400 font-medium text-sm mb-2">Use DMMs For:</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• Precise DC measurements</li>
                    <li>• RMS AC voltage/current</li>
                    <li>• Resistance and continuity</li>
                    <li>• Component testing</li>
                    <li>• General troubleshooting</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-4 border-l-2 border-green-400">
                  <h4 className="text-green-400 font-medium text-sm mb-2">Use Clamp Meters For:</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• Live circuit current</li>
                    <li>• High current applications</li>
                    <li>• Power system diagnostics</li>
                    <li>• Quick current checks</li>
                    <li>• Load monitoring</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-4 border-l-2 border-purple-400">
                  <h4 className="text-purple-400 font-medium text-sm mb-2">Use Oscilloscopes For:</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• Waveform analysis</li>
                    <li>• Signal timing measurements</li>
                    <li>• Noise and distortion</li>
                    <li>• Transient capture</li>
                    <li>• Protocol debugging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Safety and Best Practices */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Safety and Best Practices</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Safety First</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">!</span>
                  Verify instrument CAT ratings before use
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">!</span>
                  Check probe leads for damage regularly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">!</span>
                  Use appropriate PPE for electrical work
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">!</span>
                  Never exceed instrument specifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">!</span>
                  Understand arc flash risks in power systems
                </li>
              </ul>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Measurement Accuracy Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Select appropriate measurement range
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Allow instruments to warm up
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use proper probe techniques
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Consider measurement loading effects
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Perform regular calibration checks
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">What does CAT rating mean?</h3>
              <p className="text-white text-sm">
                CAT ratings (I to IV) indicate the level of transient overvoltage protection. Higher categories are used closer to the power source: CAT IV at the service entrance, CAT III at distribution panels, CAT II at receptacles, CAT I for protected electronics.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Do I need a True RMS meter?</h3>
              <p className="text-white text-sm">
                Yes, if you measure AC on circuits with VSDs, dimmers, electronic loads, or any non-sinusoidal waveforms. For pure sine wave measurements (like clean mains), an average-responding meter is adequate.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">How do I choose oscilloscope bandwidth?</h3>
              <p className="text-white text-sm">
                For sine waves, bandwidth should be at least 3x the highest frequency. For square waves or pulses, use bandwidth = 0.35/rise time. A 100MHz scope handles most industrial applications up to 20MHz signals.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <SingleQuestionQuiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-border">
          <Link to="/upskilling/instrumentation-module-4-section-3" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-4-section-5" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule4Section4;
