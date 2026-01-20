import { ArrowLeft, Zap, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule4Section1 = () => {
  useSEO({
    title: "Measuring Voltage, Current, and Resistance | Instrumentation Module 4",
    description: "Foundation of all electrical measurement work - understanding how to accurately measure voltage, current, and resistance."
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
            <Zap className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Measuring Voltage, Current, and Resistance
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Foundation of all electrical measurement work - understanding how to accurately measure the three fundamental electrical quantities.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-elec-yellow" />
            What You Will Learn
          </h2>
          <ul className="text-white/80 text-sm space-y-1">
            <li>- Differences between voltage, current, and resistance measurements</li>
            <li>- Safe measurement practices and procedures</li>
            <li>- How meters read and display electrical properties</li>
            <li>- Selecting appropriate instruments for different tasks</li>
            <li>- Recognising and avoiding common measurement errors</li>
          </ul>
        </div>

        {/* Section 01: Voltage Measurement */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Voltage Measurement</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Voltage is the electrical pressure or potential difference between two points in a circuit. It represents the energy available to push electrons through a conductor.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">AC vs DC Voltage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <h4 className="text-blue-300 font-medium mb-2">AC Voltage</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- Varies sinusoidally with time</li>
                    <li>- RMS values typically displayed</li>
                    <li>- 230V AC in UK domestic supplies</li>
                    <li>- Frequency matters (50Hz in UK)</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <h4 className="text-green-300 font-medium mb-2">DC Voltage</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>- Constant voltage level</li>
                    <li>- Direct reading of actual value</li>
                    <li>- Common in electronic circuits</li>
                    <li>- Polarity is significant</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Measurement Technique</h3>
              <p className="text-white/70 mb-3">
                Voltage is measured across components or between two points:
              </p>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Connect meter in parallel with the component or circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Use appropriate voltage range on meter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Observe polarity for DC measurements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Ensure circuit is energised for voltage reading</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="How should a voltmeter be connected to measure voltage across a component?"
          answer="In parallel with the component"
          explanation="Voltmeters must be connected in parallel to measure the potential difference across a component without affecting current flow."
        />

        {/* Section 02: Current Measurement */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Current Measurement</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Current is the flow of electrons through a conductor, measured in amperes (A). Understanding current measurement is crucial for verifying circuit operation and diagnosing faults.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Series Connection Method</h3>
              <p className="text-white/70 mb-3">
                Traditional current measurement requires breaking the circuit:
              </p>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">!</span>
                  <span>Switch off power before connecting meter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Break circuit and insert meter in series</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Select appropriate current range</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Re-energise circuit to take reading</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-300 font-medium mb-3">Clamp Meter Method</h3>
              <p className="text-white/70 mb-3">
                Non-intrusive current measurement using magnetic induction:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- No need to break circuit connections</li>
                <li>- Safe measurement on live circuits</li>
                <li>- Quick and convenient readings</li>
                <li>- Suitable for high current measurements</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h3 className="text-red-300 font-medium mb-3">Safety Considerations</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Never exceed meter's current rating</li>
                <li>- Check fuse protection in meter</li>
                <li>- Use appropriate PPE for live work</li>
                <li>- Consider arc flash risks on high current circuits</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="Why would you use a clamp meter instead of a standard multimeter for current measurement?"
          answer="To measure current without breaking the circuit"
          explanation="Clamp meters use magnetic induction to measure current non-intrusively, allowing safe measurement on live circuits without disconnection."
        />

        {/* Section 03: Resistance Testing */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Resistance Testing</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Resistance is the opposition to current flow, measured in ohms (Ω). Resistance testing is essential for verifying connections, checking insulation, and diagnosing faults.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Continuity Testing</h3>
              <p className="text-white/70 mb-3">
                Verifying complete electrical paths and connections:
              </p>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Circuit must be de-energised and isolated</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Low resistance (typically &lt;1Ω) indicates good continuity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Infinite resistance indicates open circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Used for protective conductor verification</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-300 font-medium mb-3">Insulation Testing</h3>
              <p className="text-white/70 mb-3">
                High resistance measurements to verify insulation integrity:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Uses high DC voltage (500V or 1000V)</li>
                <li>- Measures resistance in MΩ (megohms)</li>
                <li>- Equipment must be disconnected first</li>
                <li>- Minimum values specified by BS 7671</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Common Applications</h3>
              <div className="grid grid-cols-2 gap-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Cable and wiring verification</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Motor winding testing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Transformer testing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fault finding and diagnosis</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Component testing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span>Installation verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What does an infinite resistance reading indicate during continuity testing?"
          answer="An open circuit or break in the connection"
          explanation="Infinite resistance means no current can flow, indicating a complete break in the electrical path being tested."
        />

        {/* Section 04: Common Instruments */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Common Measurement Instruments</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
                <h3 className="text-blue-300 font-medium mb-2">Digital Multimeters (DMMs)</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Versatile: voltage, current, resistance</li>
                  <li>- High accuracy and resolution</li>
                  <li>- Auto-ranging capabilities</li>
                  <li>- Digital display easy to read</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
                <h3 className="text-green-300 font-medium mb-2">Analogue Meters</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Moving needle display</li>
                  <li>- Good for trending measurements</li>
                  <li>- No power supply required</li>
                  <li>- Robust in harsh environments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 05: Real-World Scenario */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Real-World Application</h2>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Lighting Fault Diagnosis</h3>
            <p className="text-white/70">
              A technician diagnosing a lighting fault in a panel measures 230V across the terminals, 0A current flow, and finds a break in continuity - pinpointing an open-circuit fault. This systematic approach using all three measurements quickly identifies the problem location and nature.
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
              <h3 className="text-white font-medium mb-2">Why can't I measure resistance on a live circuit?</h3>
              <p className="text-white/70 text-sm">
                Resistance meters apply a small test voltage. If the circuit is already energised, the external voltage interferes with the measurement, gives false readings, and can damage the meter.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">What's the difference between AC and DC on a multimeter?</h3>
              <p className="text-white/70 text-sm">
                AC mode measures alternating current that changes direction (like mains power). DC mode measures direct current that flows in one direction (like batteries). Using the wrong mode gives incorrect readings.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">When should I use a clamp meter vs a multimeter?</h3>
              <p className="text-white/70 text-sm">
                Use a clamp meter when you need to measure current without breaking the circuit, especially for high currents. Use a multimeter for voltage, resistance, and when you need higher accuracy for low current measurements.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/5 rounded-lg p-4 mb-8">
          <h2 className="text-white font-semibold mb-2">Summary</h2>
          <p className="text-white/70">
            Mastering basic measurements builds confidence in diagnosing electrical issues and validating system performance. The combination of voltage, current, and resistance measurements provides a complete picture of circuit behaviour and helps identify problems quickly and safely.
          </p>
        </div>

        {/* Quiz */}
        <SingleQuestionQuiz
          moduleId="instrumentation-4"
          sectionId="section-1"
          question="How do you safely measure current in a circuit using a standard multimeter?"
          options={[
            "Connect meter in parallel with the circuit",
            "Connect meter in series with the circuit after breaking it",
            "Use highest range setting only",
            "Measure with circuit fully energised without disconnection"
          ]}
          correctAnswer={1}
          explanation="Current flows through components, so the meter must be placed in series with the circuit. This requires breaking the circuit (with power off), inserting the meter, then re-energising to measure."
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
          <Link to="/electrician/upskilling/instrumentation-module-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="../instrumentation-module-4-section-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule4Section1;
