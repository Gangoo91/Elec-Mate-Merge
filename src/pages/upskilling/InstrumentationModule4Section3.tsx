import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule4Section3 = () => {
  useSEO({
    title: "Instrument Accuracy, Resolution, and Error | Instrumentation Course",
    description: "Understand measurement accuracy, precision, resolution, and error sources to make reliable instrumentation measurements."
  });

  const quizQuestions = [
    {
      id: 1,
      question: "What is the difference between precision and accuracy?",
      options: [
        "They are the same thing",
        "Precision is hitting the target, accuracy is consistent results",
        "Accuracy is hitting the target, precision is consistent results",
        "Precision is for digital meters, accuracy is for analogue"
      ],
      correct: 2,
      explanation: "Accuracy refers to how close measurements are to the true value (hitting the target), while precision refers to how consistent repeated measurements are (tight grouping)."
    },
    {
      id: 2,
      question: "What does a specification of plus or minus 1% plus 2 digits mean?",
      options: [
        "The reading is within 1% plus 2 extra digits of uncertainty",
        "The meter has 2 decimal places",
        "1% error of reading plus uncertainty in the last 2 displayed digits",
        "The meter costs 1% more with 2 digits"
      ],
      correct: 2,
      explanation: "This specification means the measurement error is 1% of the reading plus uncertainty in the last 2 digits of the display."
    },
    {
      id: 3,
      question: "Why is resolution important in low-voltage circuits?",
      options: [
        "Low voltages do not matter",
        "Small changes need to be detected accurately",
        "It prevents electrical shock",
        "Resolution only matters for high voltages"
      ],
      correct: 1,
      explanation: "In low-voltage circuits, small voltage changes can be significant. Good resolution allows detection of these small but important variations."
    },
    {
      id: 4,
      question: "What type of error does a noisy environment cause?",
      options: [
        "Systematic error",
        "Calibration error",
        "Random error from interference",
        "Operator error"
      ],
      correct: 2,
      explanation: "Electrical noise causes random errors that vary unpredictably, making measurements less precise and potentially less accurate."
    },
    {
      id: 5,
      question: "How can calibration help reduce measurement errors?",
      options: [
        "It makes instruments faster",
        "It corrects for systematic errors and drift",
        "It increases resolution",
        "It prevents electrical noise"
      ],
      correct: 1,
      explanation: "Calibration corrects systematic errors and compensates for instrument drift over time, improving measurement accuracy."
    }
  ];

  return (
    <div className="bg-background">
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
            Instrument Accuracy, Resolution, and Error
          </h1>
          <p className="text-white/80">
            Understand measurement quality and limitations
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2">Quick Summary</h2>
          <p className="text-white text-sm">
            Knowing how precise a reading is and what limitations exist is critical in measurement. Understanding accuracy, precision, resolution, and error sources helps you choose the right instrument and interpret results correctly.
          </p>
        </div>

        {/* Section 01: Accuracy vs Precision */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Accuracy vs Precision</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              These fundamental concepts are often confused but represent different aspects of measurement quality.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded p-4">
                  <h3 className="text-elec-yellow font-semibold mb-2">Accuracy</h3>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      How close to the true value
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      "Hitting the target"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Affected by calibration
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Can be corrected systematically
                    </li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-4">
                  <h3 className="text-elec-yellow font-semibold mb-2">Precision</h3>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Consistency of repeated readings
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      "Tight grouping"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Related to instrument stability
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Shows measurement repeatability
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">The Target Analogy</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-background/50 rounded p-3">
                  <div className="text-green-400 text-sm font-medium mb-1">High Acc + High Prec</div>
                  <p className="text-white text-xs">Tight group, on target</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <div className="text-yellow-400 text-sm font-medium mb-1">High Acc + Low Prec</div>
                  <p className="text-white text-xs">Scattered around target</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <div className="text-orange-400 text-sm font-medium mb-1">Low Acc + High Prec</div>
                  <p className="text-white text-xs">Tight group, off target</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <div className="text-red-400 text-sm font-medium mb-1">Low Acc + Low Prec</div>
                  <p className="text-white text-xs">Scattered, off target</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="A technician takes five voltage readings: 12.01V, 12.02V, 12.01V, 12.02V, 12.01V. The true voltage is 12.50V. Is this instrument precise, accurate, or both?"
          answer="The instrument is precise (readings are very consistent within 0.01V) but not accurate (readings are 0.48V below the true value). This suggests a systematic error that could be corrected by calibration."
        />

        {/* Section 02: Resolution */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Resolution and Sensitivity</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Resolution is the smallest detectable change an instrument can measure. It determines the fineness of the measurement but does not guarantee accuracy.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Digital Meter Resolution</h3>
              <p className="text-white text-sm mb-3">
                Resolution is limited by the least significant digit (LSD) that can change.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Meter Type</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Counts</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">200V Range Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">3.5 digit</td>
                      <td className="py-3 px-4">1999</td>
                      <td className="py-3 px-4">0.1V</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">4.5 digit</td>
                      <td className="py-3 px-4">19999</td>
                      <td className="py-3 px-4">0.01V</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">6.5 digit</td>
                      <td className="py-3 px-4">1999999</td>
                      <td className="py-3 px-4">0.0001V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Why Resolution Matters</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Low-voltage signals:</strong> mV level sensor outputs need high resolution to detect small changes
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Temperature monitoring:</strong> RTD and thermocouple measurements often require 0.1 degree resolution
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Current loop signals:</strong> 4-20mA spans need resolution to detect small process changes
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Error Sources */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Sources of Measurement Error</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Systematic Errors</h3>
              <p className="text-white text-sm mb-3">
                Predictable, consistent errors that can often be corrected.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Calibration Drift</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Component ageing</li>
                    <li>• Temperature effects</li>
                    <li>• Reference voltage changes</li>
                    <li>• Regular calibration needed</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Loading Effects</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Instrument input impedance</li>
                    <li>• Probe capacitance</li>
                    <li>• Current measurement burden</li>
                    <li>• Circuit interaction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Random Errors</h3>
              <p className="text-white text-sm mb-3">
                Unpredictable variations that affect precision.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Environmental</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Electrical noise</li>
                    <li>• Temperature variations</li>
                    <li>• Vibration</li>
                    <li>• Humidity changes</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Operational</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Probe contact variations</li>
                    <li>• Reading timing</li>
                    <li>• Operator technique</li>
                    <li>• Connection quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="You notice your voltage readings are consistently 2% higher than a calibrated reference. Is this a systematic or random error?"
          answer="This is a systematic error because it is consistent and predictable. It can be corrected by recalibrating the meter or applying a correction factor to readings."
        />

        {/* Section 04: Interpreting Specifications */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Interpreting Tolerance Specifications</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Understanding plus or minus 1.5% plus 2 digits</h3>
              <div className="bg-background/50 rounded p-4">
                <p className="text-white text-sm mb-3">
                  <strong>Example:</strong> Reading 100.0V on 200V range with plus or minus 1.5% plus 2 digits specification
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>Percentage error: 1.5% of 100V = plus or minus 1.5V</li>
                  <li>Digit error: 2 digits x 0.1V (LSD) = plus or minus 0.2V</li>
                  <li><strong>Total uncertainty: plus or minus 1.7V</strong></li>
                  <li>True value lies between 98.3V and 101.7V</li>
                </ul>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Range Selection Impact</h3>
              <p className="text-white text-sm mb-3">
                Measuring 10V on different ranges with plus or minus 1% plus 1 digit:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <h4 className="text-green-400 font-medium text-sm mb-1">20V Range</h4>
                  <p className="text-white text-xs">Error: 0.1V + 0.01V = plus or minus 0.11V</p>
                  <p className="text-white text-xs">Better accuracy for this reading</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <h4 className="text-red-400 font-medium text-sm mb-1">200V Range</h4>
                  <p className="text-white text-xs">Error: 0.1V + 0.1V = plus or minus 0.2V</p>
                  <p className="text-white text-xs">Worse accuracy due to larger digit value</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Improving Measurement Quality */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Improving Measurement Quality</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Best Practices</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Regular Calibration</h4>
                    <p className="text-white text-xs">Schedule calibration based on accuracy requirements and environmental conditions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Optimal Range Selection</h4>
                    <p className="text-white text-xs">Choose the lowest range that accommodates the reading for best resolution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Multiple Readings</h4>
                    <p className="text-white text-xs">Take several readings and average to reduce random errors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Proper Connections</h4>
                    <p className="text-white text-xs">Clean contacts, secure connections, and correct polarity reduce errors.</p>
                  </div>
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
              <h3 className="font-semibold text-white mb-2">How often should I calibrate my multimeter?</h3>
              <p className="text-white text-sm">
                For general use, annual calibration is typical. Critical applications may require 6-monthly or quarterly calibration. Always recalibrate after physical damage, extreme temperature exposure, or when readings seem suspect.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Is a more expensive meter always more accurate?</h3>
              <p className="text-white text-sm">
                Not necessarily. Higher-priced meters often offer better accuracy, but also include features you may not need. Choose a meter with accuracy specifications that match your application requirements.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Can software improve measurement accuracy?</h3>
              <p className="text-white text-sm">
                Software can average multiple readings to reduce random errors and apply correction factors for known systematic errors. However, it cannot improve the fundamental accuracy of the measurement hardware.
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
          <Link to="/upskilling/instrumentation-module-4-section-2" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-4-section-4" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule4Section3;
