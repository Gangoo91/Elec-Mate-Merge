import { ArrowLeft, BarChart, CheckCircle, HelpCircle, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule4Section2 = () => {
  useSEO({
    title: "Frequency and Time-Based Measurements | Instrumentation Module 4",
    description: "Beyond voltage and current, frequency and time-based signals carry vital information about electrical and mechanical systems."
  });

  return (
    <div className="bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-4" className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Back to Module 4</span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-4">
            <BarChart className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Frequency and Time-Based Measurements
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Beyond voltage and current, frequency and time-based signals carry vital information about electrical and mechanical systems.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-elec-yellow" />
            What You Will Learn
          </h2>
          <ul className="text-white/80 text-sm space-y-1">
            <li>- Measuring frequency and its significance in electrical systems</li>
            <li>- Analysing signal timing and period measurements</li>
            <li>- Applying frequency analysis to rotating equipment diagnostics</li>
            <li>- Selecting appropriate tools for time-domain measurements</li>
            <li>- Troubleshooting frequency-related problems in industrial systems</li>
          </ul>
        </div>

        {/* Section 01: Frequency Fundamentals */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Frequency Fundamentals</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Frequency is the number of complete cycles that occur in one second, measured in Hertz (Hz). It is a fundamental parameter in electrical systems that affects motor speed, power quality, and signal transmission.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-medium mb-3">The Basic Relationship</h3>
              <div className="text-center py-2">
                <p className="text-white text-lg font-mono">f = 1/T</p>
                <p className="text-white/60 text-sm mt-2">where f = frequency (Hz) and T = period (seconds)</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Common Frequency Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Power Systems</span>
                    <p>50Hz (UK) / 60Hz (US) mains frequency</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Motor Control</span>
                    <p>Variable frequency drives (VFDs)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Sensors</span>
                    <p>Speed and position feedback</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Process Control</span>
                    <p>Flow and vibration monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Communications</span>
                    <p>Radio and data transmission</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Diagnostics</span>
                    <p>Equipment health monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the mathematical relationship between frequency and period?"
          answer="They are inverses: frequency = 1/period (f = 1/T)"
          explanation="Period (T) is the time for one complete cycle. Frequency (f) is how many cycles per second. If T = 0.02 seconds, then f = 1/0.02 = 50Hz."
        />

        {/* Section 02: Period and Pulse Width */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Period and Pulse Width Measurements</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                Period Measurement
              </h3>
              <p className="text-white/70 mb-3">
                Period is the time for one complete cycle - critical for understanding signal timing:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Motor speed calculation (RPM = 60 x frequency)</li>
                <li>- Digital signal timing verification</li>
                <li>- Oscillator stability testing</li>
                <li>- Power quality analysis</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-medium mb-2">Pulse Width</h3>
                <p className="text-white/70 text-sm">
                  Duration of the high or low portion of a square wave signal. Critical for PWM systems.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <h3 className="text-orange-300 font-medium mb-2">Duty Cycle</h3>
                <p className="text-white/70 text-sm">
                  Percentage of time signal is high during one complete cycle. Controls average power in PWM.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Digital Signal Analysis</h3>
              <p className="text-white/70 mb-3">
                Modern systems rely heavily on digital timing:
              </p>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Setup and hold times in microprocessor systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Clock jitter and stability measurements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Communication protocol timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>PWM motor control verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What tool is best for measuring pulse width and visualising waveforms?"
          answer="Oscilloscope"
          explanation="Oscilloscopes display waveforms graphically, allowing direct measurement of pulse width, rise time, fall time, and other time-domain parameters from the visual display."
        />

        {/* Section 03: Measurement Tools */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Measurement Tools and Techniques</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-medium mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Frequency Counters
              </h3>
              <p className="text-white/70 mb-3">
                Dedicated instruments for precise frequency measurement:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Advantages</h4>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>- Very high accuracy (ppm levels)</li>
                    <li>- Wide frequency range</li>
                    <li>- Direct digital readout</li>
                    <li>- Statistical functions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Typical Applications</h4>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>- Crystal oscillator testing</li>
                    <li>- Transmitter frequency verification</li>
                    <li>- Motor speed monitoring</li>
                    <li>- Calibration standards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Digital Multimeters</h3>
              <p className="text-white/70 mb-3">
                Many modern DMMs include frequency measurement capabilities:
              </p>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Convenient for general-purpose measurements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Typically accurate to 0.01% or better</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Range from Hz to MHz in most instruments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">!</span>
                  <span>Limited by input signal conditioning requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-300 font-medium mb-3">Oscilloscopes</h3>
              <p className="text-white/70 mb-3">
                Essential for visualising and measuring time-domain signals:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Visual waveform analysis</li>
                <li>- Pulse width and timing measurements</li>
                <li>- Rise time and fall time analysis</li>
                <li>- Jitter and noise visualisation</li>
                <li>- Multiple signal comparison</li>
                <li>- FFT frequency domain analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 04: Practical Applications */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Practical Applications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h3 className="text-blue-300 font-medium mb-2">Variable Frequency Drives</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Output frequency verification</li>
                <li>- Motor speed control validation</li>
                <li>- Harmonic distortion analysis</li>
                <li>- Efficiency optimisation</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h3 className="text-green-300 font-medium mb-2">Encoder Systems</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Position feedback verification</li>
                <li>- Speed measurement accuracy</li>
                <li>- Signal integrity checking</li>
                <li>- Timing synchronisation</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border-l-2 border-purple-500/50 rounded-r-lg p-4">
              <h3 className="text-purple-300 font-medium mb-2">Process Monitoring</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Flow rate measurement</li>
                <li>- Vibration analysis</li>
                <li>- Temperature cycling monitoring</li>
                <li>- Equipment health assessment</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border-l-2 border-orange-500/50 rounded-r-lg p-4">
              <h3 className="text-orange-300 font-medium mb-2">Communication Systems</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Data transmission rates</li>
                <li>- Protocol timing verification</li>
                <li>- Clock synchronisation</li>
                <li>- Signal quality assessment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 05: Common Issues */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Common Issues and Troubleshooting</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h3 className="text-red-300 font-medium mb-2">Signal Noise</h3>
              <p className="text-white/70 text-sm mb-2">
                Electrical noise can cause unstable or incorrect frequency readings.
              </p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>- Use proper shielding and grounding</li>
                <li>- Check for loose connections</li>
                <li>- Consider signal conditioning</li>
                <li>- Verify measurement ground reference</li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="text-orange-300 font-medium mb-2">Input Sensitivity</h3>
              <p className="text-white/70 text-sm mb-2">
                Weak signals may not trigger measurement circuits properly.
              </p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>- Check signal amplitude requirements</li>
                <li>- Use appropriate coupling (AC/DC)</li>
                <li>- Consider signal amplification</li>
                <li>- Verify trigger settings on oscilloscopes</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-2">Measurement Range</h3>
              <p className="text-white/70 text-sm mb-2">
                Choosing the wrong measurement range can lead to errors.
              </p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>- Verify instrument frequency range</li>
                <li>- Use appropriate time base settings</li>
                <li>- Consider bandwidth limitations</li>
                <li>- Check for aliasing in sampling systems</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What could cause unstable frequency readings on a measurement instrument?"
          answer="Signal noise, loose connections, or interference"
          explanation="Unstable readings are often caused by electrical noise, poor connections, or interference affecting the measurement circuit. Proper shielding and grounding help resolve these issues."
        />

        {/* Section 06: Real-World Scenario */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">06</span>
            <h2 className="text-xl font-semibold text-white">Real-World Application</h2>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Conveyor Speed Monitoring</h3>
            <p className="text-white/70">
              A bottling line uses frequency sensors to detect conveyor speed. The normal frequency is 25Hz, corresponding to optimal throughput. When technicians notice frequency dropping to 22Hz, they investigate and find a worn drive belt causing slippage. The frequency measurement provided early warning before complete system failure, preventing costly downtime and product loss.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">What is the standard frequency for UK mains power?</h3>
              <p className="text-white/70 text-sm">
                UK mains operates at 50Hz, meaning the voltage completes 50 cycles per second. This differs from North America which uses 60Hz.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">How does frequency relate to motor speed?</h3>
              <p className="text-white/70 text-sm">
                For AC motors, speed is directly related to supply frequency. The formula RPM = (120 x frequency) / poles determines synchronous speed. Variable frequency drives control motor speed by varying the supply frequency.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Why is duty cycle important in PWM systems?</h3>
              <p className="text-white/70 text-sm">
                Duty cycle determines the average power delivered. A 50% duty cycle delivers half the maximum power. This allows precise control of motor speed, LED brightness, and heating elements without energy-wasting resistors.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/5 rounded-lg p-4 mb-8">
          <h2 className="text-white font-semibold mb-2">Summary</h2>
          <p className="text-white/70">
            Understanding frequency and time-based readings enables engineers to maintain system stability and detect abnormalities early. These measurements are crucial for modern industrial systems where timing, synchronisation, and dynamic behaviour determine overall system performance and reliability.
          </p>
        </div>

        {/* Quiz */}
        <SingleQuestionQuiz
          moduleId="instrumentation-4"
          sectionId="section-2"
          question="How is frequency used in rotating machinery diagnostics?"
          options={[
            "It indicates power consumption",
            "It shows speed and can reveal mechanical problems",
            "It measures electrical efficiency",
            "It determines voltage levels"
          ]}
          correctAnswer={1}
          explanation="Frequency measurements can indicate motor speed (RPM = 60 x frequency for simple cases) and help identify mechanical issues like bearing problems, misalignment, or belt slippage through changes in the expected frequency."
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
          <Link to="../section-1">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="../section-3">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule4Section2;
