import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule3Section4 = () => {
  useSEO({
    title: "Signal Scaling, Conversions, and Error | Instrumentation Course",
    description: "Learn signal scaling techniques, analogue-to-digital conversion, and error management in instrumentation systems."
  });

  const quizQuestions = [
    {
      id: 1,
      question: "What does signal scaling achieve in instrumentation?",
      options: [
        "Making signals larger in amplitude",
        "Converting one signal range to match another range requirement",
        "Filtering unwanted frequencies from signals",
        "Isolating signals electrically"
      ],
      correct: 1,
      explanation: "Signal scaling converts one signal range (e.g., 0-5V) to match another range requirement (e.g., 0-100 degrees C) to ensure proper interpretation by receiving systems."
    },
    {
      id: 2,
      question: "What is quantisation error?",
      options: [
        "Error caused by filtering",
        "The difference between actual analogue value and its digital representation",
        "Error in signal timing",
        "Noise introduced by amplification"
      ],
      correct: 1,
      explanation: "Quantisation error is the difference between the actual analogue signal value and its nearest digital representation, caused by the finite resolution of analogue-to-digital converters."
    },
    {
      id: 3,
      question: "Why convert a voltage signal to current for transmission?",
      options: [
        "To reduce power consumption",
        "To improve noise immunity and enable long-distance transmission",
        "To increase signal frequency",
        "To reduce system complexity"
      ],
      correct: 1,
      explanation: "Converting voltage to current (typically 4-20mA) improves noise immunity and enables reliable long-distance transmission, as current signals are less affected by cable resistance and electrical interference."
    },
    {
      id: 4,
      question: "How does poor scaling affect accuracy?",
      options: [
        "Scaling always improves accuracy",
        "Poor scaling can introduce errors and reduce resolution",
        "Scaling has no effect on accuracy",
        "Scaling only affects signal speed"
      ],
      correct: 1,
      explanation: "Poor scaling can introduce errors through mathematical rounding, inappropriate range matching, and resolution loss. Proper scaling maintains or enhances measurement accuracy."
    },
    {
      id: 5,
      question: "What is a common instrumentation conversion example?",
      options: [
        "Converting temperature to humidity",
        "Converting RTD resistance to temperature display in degrees Celsius",
        "Converting pressure to flow",
        "Converting AC to battery power"
      ],
      correct: 1,
      explanation: "Converting RTD resistance changes to temperature values in degrees Celsius is a common instrumentation conversion, where the sensor's resistance variation is mathematically converted to meaningful temperature units."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Module 3
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
            Signal Scaling, Conversions, and Error
          </h1>
          <p className="text-white/80">
            Transform signals accurately while managing error sources
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2">Quick Summary</h2>
          <p className="text-white text-sm">
            Signal scaling and conversion ensure different system components interpret measurement data correctly. Understanding error sources in these processes is essential for maintaining measurement integrity throughout the signal chain.
          </p>
        </div>

        {/* Section 01: Signal Scaling Fundamentals */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Signal Scaling Fundamentals</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Signal scaling ensures that different system components can properly interpret measurement data by converting between different ranges and units.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Linear Scaling</h3>
              <p className="text-white text-sm mb-3">
                The most common method using direct proportional relationships.
              </p>
              <div className="bg-background/50 rounded p-3 font-mono text-sm text-white">
                <p className="mb-2"><strong>Formula:</strong> Output = (Input - Input_Min) x (Output_Range / Input_Range) + Output_Min</p>
                <p className="mb-1"><strong>Example:</strong> Converting 0-10V sensor to 0-100 degrees C display</p>
                <p>For 5V input: Temperature = (5-0) x (100/10) + 0 = 50 degrees C</p>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Non-Linear Scaling</h3>
              <p className="text-white text-sm mb-3">
                Required when sensor response is not linear with the measured parameter.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Common Applications:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Thermocouple linearisation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Flow measurement (square root)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Tank level (irregular shapes)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      pH measurement
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Implementation Methods:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Lookup tables
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Polynomial equations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Piecewise linear approximation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Mathematical functions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Engineering Unit Conversion</h3>
              <p className="text-white text-sm mb-3">
                Converting between different measurement units for display and analysis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-background/50 rounded p-3 text-center">
                  <h4 className="text-white font-medium text-sm mb-1">Temperature</h4>
                  <p className="text-white text-xs">Celsius, Fahrenheit, Kelvin</p>
                </div>
                <div className="bg-background/50 rounded p-3 text-center">
                  <h4 className="text-white font-medium text-sm mb-1">Pressure</h4>
                  <p className="text-white text-xs">bar, PSI, kPa, mmHg</p>
                </div>
                <div className="bg-background/50 rounded p-3 text-center">
                  <h4 className="text-white font-medium text-sm mb-1">Flow</h4>
                  <p className="text-white text-xs">L/min, GPM, cubic m/h</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What scaling method would you use for a thermocouple signal?"
          answer="Non-linear scaling using lookup tables or polynomial equations, because thermocouples have a non-linear relationship between temperature and voltage output."
        />

        {/* Section 02: Signal Conversions */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Signal Conversions</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Signal conversion transforms signals between different formats (analogue/digital) and types (voltage/current) to enable compatibility between system components.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Analogue-to-Digital Conversion (ADC)</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">ADC Types:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-background/50 rounded p-3">
                      <h5 className="text-elec-yellow font-medium text-sm mb-1">Successive Approximation (SAR)</h5>
                      <ul className="text-xs text-white space-y-1">
                        <li>• Medium speed (1-5 MSPS)</li>
                        <li>• Good accuracy (12-18 bits)</li>
                        <li>• Most common in instrumentation</li>
                      </ul>
                    </div>
                    <div className="bg-background/50 rounded p-3">
                      <h5 className="text-elec-yellow font-medium text-sm mb-1">Sigma-Delta</h5>
                      <ul className="text-xs text-white space-y-1">
                        <li>• High resolution (16-24 bits)</li>
                        <li>• Lower sampling rates</li>
                        <li>• Excellent noise performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Resolution Examples:</h4>
                  <div className="bg-background/50 rounded p-3">
                    <ul className="text-sm text-white space-y-1">
                      <li><strong>12-bit:</strong> 1 part in 4,096 (0.024% resolution)</li>
                      <li><strong>16-bit:</strong> 1 part in 65,536 (0.0015% resolution)</li>
                      <li><strong>24-bit:</strong> 1 part in 16,777,216 (0.000006% resolution)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Voltage-to-Current Conversion</h3>
              <p className="text-white text-sm mb-3">
                Converting voltage signals to current improves transmission reliability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Benefits:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Noise immunity improvement
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Long-distance transmission
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Standard 4-20mA compatibility
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Ground loop elimination
                    </li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-white font-medium text-sm mb-2">Current-to-Voltage Conversion:</h4>
                  <p className="text-white text-xs">
                    Simple precision resistor converts current to proportional voltage for ADC input.
                  </p>
                  <p className="text-white text-xs mt-2 font-mono">
                    Example: 4-20mA x 250 ohms = 1-5V
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why is 4-20mA current preferred over 0-10V for long cable runs?"
          answer="Current signals are not affected by cable resistance or voltage drops, and the live-zero at 4mA allows detection of broken wires versus a true zero reading."
        />

        {/* Section 03: Error Sources */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Error Sources in Conversion</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Every conversion and scaling operation introduces potential sources of error that can degrade measurement accuracy. Understanding these error sources enables proper system design.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Quantisation Error</h3>
              <p className="text-white text-sm mb-3">
                The inherent error in representing continuous analogue signals with discrete digital values.
              </p>
              <div className="bg-background/50 rounded p-3">
                <p className="text-white text-sm mb-2"><strong>Maximum Error = plus or minus 0.5 LSB (Least Significant Bit)</strong></p>
                <p className="text-white text-xs mb-1">Example for 12-bit ADC with 10V range:</p>
                <p className="text-white text-xs">LSB = 10V / 4096 = 2.44mV</p>
                <p className="text-white text-xs">Maximum quantisation error = plus or minus 1.22mV</p>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Systematic Errors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Linearity Errors:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li><strong>INL:</strong> Deviation from ideal transfer function</li>
                    <li><strong>DNL:</strong> Unequal step sizes between codes</li>
                    <li><strong>Gain Error:</strong> Incorrect scaling factor</li>
                    <li><strong>Offset Error:</strong> Zero-point deviation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Temperature Effects:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li>Reference voltage drift</li>
                    <li>Component value changes</li>
                    <li>Amplifier offset drift</li>
                    <li>Timing variations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Error Minimisation Techniques</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Calibration</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Multi-point calibration</li>
                    <li>• Gain and offset correction</li>
                    <li>• Temperature compensation</li>
                    <li>• Periodic recalibration</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Component Selection</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Precision references</li>
                    <li>• Temperature stable parts</li>
                    <li>• High-resolution converters</li>
                    <li>• Low-drift amplifiers</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Design Practices</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Ratiometric measurements</li>
                    <li>• Differential signalling</li>
                    <li>• Thermal management</li>
                    <li>• Proper grounding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Resolution vs Accuracy */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Resolution vs Accuracy Balance</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Understanding the distinction between resolution and accuracy is crucial for proper system design. High resolution does not guarantee high accuracy.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Aspect</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Resolution</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-elec-yellow">Definition</td>
                    <td className="py-3 px-4">Smallest measurable change</td>
                    <td className="py-3 px-4">Closeness to true value</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-elec-yellow">Limiting Factors</td>
                    <td className="py-3 px-4">ADC bits, display digits</td>
                    <td className="py-3 px-4">Calibration, tolerances</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 text-elec-yellow">Improvement Cost</td>
                    <td className="py-3 px-4">Moderate (higher bit ADCs)</td>
                    <td className="py-3 px-4">Higher (precision parts)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-elec-yellow">Practical Limit</td>
                    <td className="py-3 px-4">Noise floor</td>
                    <td className="py-3 px-4">System errors</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-white text-sm">
                <strong>Design Principle:</strong> Match resolution to accuracy requirements. Excessive resolution beyond accuracy capabilities wastes resources and can give false confidence in measurement quality.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          question="A 16-bit ADC has higher resolution than a 12-bit ADC. Does this mean it is more accurate?"
          answer="Not necessarily. Resolution determines the smallest detectable change, but accuracy depends on calibration, reference quality, and component tolerances. A well-calibrated 12-bit system may be more accurate than a poorly calibrated 16-bit system."
        />

        {/* Section 05: Practical Application */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Practical Application</h2>
          </div>

          <div className="bg-card/50 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">PLC Pressure Control System</h3>
            <p className="text-white text-sm mb-4">
              A PLC system scales 0-10V sensor output to represent 0-200 bar pressure for data logging and control.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Signal Scaling</h4>
                  <p className="text-white text-xs">0-10V scaled to 0-200 bar: Pressure = (Voltage / 10) x 200. For 5V input = 100 bar output.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Resolution Analysis</h4>
                  <p className="text-white text-xs">12-bit ADC provides 4096 steps over 10V = 2.44mV resolution, equivalent to 0.049 bar pressure resolution.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Error Management</h4>
                  <p className="text-white text-xs">Two-point calibration at 0V (0 bar) and 10V (200 bar) corrects gain and offset errors.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Result</h4>
                  <p className="text-white text-xs">Achieves plus or minus 0.5% accuracy specification with 6-month calibration intervals.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">When should I use linear vs non-linear scaling?</h3>
              <p className="text-white text-sm">
                Use linear scaling when the sensor output is directly proportional to the measured parameter. Use non-linear scaling for sensors like thermocouples, RTDs, or flow sensors where the relationship is not linear.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">How often should I recalibrate conversion systems?</h3>
              <p className="text-white text-sm">
                Calibration intervals depend on accuracy requirements and environmental conditions. Critical systems may need monthly calibration, while stable environments may allow annual calibration. Always recalibrate after significant temperature changes or component replacement.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">What ADC resolution do I need for my application?</h3>
              <p className="text-white text-sm">
                Choose ADC resolution based on required measurement precision. For 0.1% accuracy, you need at least 10 bits (1024 steps). For 0.01% accuracy, you need at least 14 bits. Always select 2-4 bits more than the minimum for noise margin.
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
          <Link to="/study-centre/upskilling/instrumentation-module-3-section-3" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/instrumentation-module-3-section-5" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule3Section4;
