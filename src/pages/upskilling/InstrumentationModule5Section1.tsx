import { ArrowLeft, Zap, CheckCircle, HelpCircle, RotateCcw, Play, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule5Section1 = () => {
  useSEO({
    title: "Open Loop vs Closed Loop Systems | Instrumentation Module 5",
    description: "Understand the difference between open and closed loop control systems and how each functions in industrial control environments."
  });

  return (
    <div className="bg-background text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-5" className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module 5
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Open Loop vs Closed Loop Systems
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            Control systems can be categorised as open loop (no feedback) or closed loop (with feedback).
            Understanding the differences helps in selecting the right approach for industrial applications.
            Closed loop systems offer self-correction while open loop systems are simpler and faster.
          </p>
        </div>

        {/* Section 01 - Open Loop Systems */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Open Loop Systems</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Play className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is an Open Loop System?</h3>
                <p className="text-white/80 text-sm">
                  Open loop systems operate without feedback. They execute predetermined actions based on input
                  commands, regardless of the actual output or system conditions. The controller sends a signal
                  to the actuator, but there is no measurement of the result to adjust the output.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Key Characteristics</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>No feedback mechanism - output is not measured</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Simple control structure with lower cost and complexity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Cannot self-correct for disturbances or changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Fast response with no feedback delay</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Common Examples</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Basic Timer Switch</p>
                  <p className="text-white/70 text-xs">Runs for a set time regardless of conditions</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Manual Control Valve</p>
                  <p className="text-white/70 text-xs">Fixed position until manually adjusted</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Washing Machine Timer</p>
                  <p className="text-white/70 text-xs">Follows predetermined cycle</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Traffic Light System</p>
                  <p className="text-white/70 text-xs">Fixed timing sequence at intersections</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Advantages</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>Simple and inexpensive</li>
                  <li>Easy to understand and maintain</li>
                  <li>Fast response (no feedback delay)</li>
                  <li>Stable operation</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2">Limitations</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>Cannot adjust to disturbances</li>
                  <li>No error correction capability</li>
                  <li>Less accurate control</li>
                  <li>Poor with varying conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What is the main limitation of an open loop system?"
          correctAnswer="It cannot adjust to changes or disturbances because it lacks feedback"
          explanation="Without feedback, open loop systems cannot detect when actual conditions differ from desired conditions, so they cannot make corrections."
        />

        {/* Section 02 - Closed Loop Systems */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Closed Loop Systems</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is a Closed Loop System?</h3>
                <p className="text-white/80 text-sm">
                  Closed loop systems use feedback to continuously monitor output and adjust control actions.
                  They compare actual performance with desired performance (setpoint) and make corrections
                  automatically. This creates a continuous loop of measurement, comparison, and adjustment.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Key Characteristics</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Feedback mechanism present - output is measured and compared</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Self-correcting capability - can adjust to changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Higher accuracy and precision in control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Can compensate for disturbances automatically</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Common Examples</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Thermostat Control</p>
                  <p className="text-white/70 text-xs">Maintains temperature at ±1°C accuracy</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Motor Speed Control</p>
                  <p className="text-white/70 text-xs">Maintains ±0.1% speed accuracy</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Pressure Regulation</p>
                  <p className="text-white/70 text-xs">Maintains ±2% pressure accuracy</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Level Control</p>
                  <p className="text-white/70 text-xs">Prevents overflow and emptying</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Performance Comparison</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white/70 text-xs mb-1">Accuracy</p>
                  <p className="text-green-400 font-semibold">Higher</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Reliability</p>
                  <p className="text-green-400 font-semibold">Better</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Disturbance Rejection</p>
                  <p className="text-green-400 font-semibold">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="What role does feedback play in a closed loop control system?"
          correctAnswer="It provides information about actual system performance so the controller can make adjustments"
          explanation="Feedback allows the controller to compare actual conditions with desired conditions (setpoint) and calculate the error that drives corrective action."
        />

        {/* Section 03 - Comparison */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">System Comparison</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">When to Use Each System</h3>
                <p className="text-white/80 text-sm">
                  The choice between open and closed loop control depends on accuracy requirements, cost
                  constraints, response speed needs, and the predictability of disturbances.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/70">Aspect</th>
                    <th className="text-left py-2 text-white/70">Open Loop</th>
                    <th className="text-left py-2 text-white/70">Closed Loop</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Accuracy</td>
                    <td className="py-2">Lower</td>
                    <td className="py-2 text-green-400">Higher</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Cost</td>
                    <td className="py-2 text-green-400">Lower</td>
                    <td className="py-2">Higher</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Complexity</td>
                    <td className="py-2 text-green-400">Simpler</td>
                    <td className="py-2">More complex</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Response</td>
                    <td className="py-2 text-green-400">Faster</td>
                    <td className="py-2">Feedback delay</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Self-correction</td>
                    <td className="py-2">None</td>
                    <td className="py-2 text-green-400">Automatic</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">Real-World Example: Home Heating</h4>
              <div className="space-y-3 text-white/80 text-sm">
                <div>
                  <p className="text-white font-medium">Open Loop (Timer-Based):</p>
                  <p>Runs for predetermined periods regardless of actual room temperature. Cannot respond to changes in weather, occupancy, or heat losses.</p>
                </div>
                <div>
                  <p className="text-white font-medium">Closed Loop (Thermostat):</p>
                  <p>Measures temperature and adjusts heating to maintain setpoint. Automatically adjusts to maintain comfort despite changing conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="Which system type is typically more accurate - open loop or closed loop?"
          correctAnswer="Closed loop systems are typically more accurate because they continuously monitor and adjust based on actual performance"
          explanation="The feedback mechanism in closed loop systems allows them to compensate for disturbances and variations that would cause errors in open loop systems."
        />

        {/* FAQs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Can open loop systems adjust to change?</h4>
              <p className="text-white/70 text-sm">
                No, open loop systems cannot adjust to changes because they lack feedback mechanisms. They operate
                according to predetermined patterns regardless of actual conditions. Any adjustment requires
                manual intervention.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What is the main advantage of open loop systems in high-speed applications?</h4>
              <p className="text-white/70 text-sm">
                Open loop systems have no feedback delay, making them faster in response time. This is advantageous
                in high-speed applications where immediate action is required and the process is well understood
                and predictable.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Does adding feedback always improve system stability?</h4>
              <p className="text-white/70 text-sm">
                Not necessarily. Adding feedback can improve or decrease stability depending on the system design
                and tuning. Properly designed feedback improves stability, but poor design or incorrect tuning
                can cause oscillations and instability.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Why are closed loop systems preferred for precision control?</h4>
              <p className="text-white/70 text-sm">
                Closed loop systems continuously measure and correct errors, automatically compensating for
                disturbances, component variations, and environmental changes. This makes them essential for
                applications requiring tight tolerances and consistent performance.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="In a washing machine, which component represents a closed loop system?"
            options={[
              "The timer that runs the wash cycle",
              "The water level sensor and fill valve",
              "The drain pump motor",
              "The door latch mechanism"
            ]}
            correctAnswer={1}
            explanation="The water level sensor and fill valve form a closed loop system - the sensor provides feedback about actual water level, and the valve adjusts flow to maintain the desired level. The timer is open loop as it runs regardless of conditions."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="/electrician/upskilling/instrumentation-module-5">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="../section-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/80">
              Next Section
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule5Section1;
