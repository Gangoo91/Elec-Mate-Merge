import { ArrowLeft, Zap, CheckCircle, HelpCircle, BarChart, TrendingUp, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule5Section3 = () => {
  useSEO({
    title: "PID Control Basics | Instrumentation Module 5",
    description: "Understand the three pillars of PID control - Proportional, Integral, and Derivative - and how they create precise automated systems."
  });

  return (
    <div className="min-h-screen bg-background text-white">
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
          PID Control Basics
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            PID control uses three terms - Proportional (P), Integral (I), and Derivative (D) - to provide
            accurate, stable control. Each term addresses different aspects: P provides immediate response,
            I eliminates steady-state error, and D improves stability and reduces overshoot.
          </p>
        </div>

        {/* Section 01 - PID Overview */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">The PID Algorithm</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calculator className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">The PID Equation</h3>
                <p className="text-white/80 text-sm">
                  The PID controller calculates an output value based on the weighted sum of three terms,
                  each responding to different aspects of the error signal.
                </p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <div className="text-center mb-4">
                <p className="text-white font-medium text-lg">Output = Kp × e + Ki × ∫e dt + Kd × de/dt</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-green-400 font-medium">Proportional (P)</p>
                  <p className="text-white/70 text-xs">Kp × error</p>
                  <p className="text-white/50 text-xs">Immediate response</p>
                </div>
                <div>
                  <p className="text-blue-400 font-medium">Integral (I)</p>
                  <p className="text-white/70 text-xs">Ki × ∫error dt</p>
                  <p className="text-white/50 text-xs">Accumulates over time</p>
                </div>
                <div>
                  <p className="text-orange-400 font-medium">Derivative (D)</p>
                  <p className="text-white/70 text-xs">Kd × de/dt</p>
                  <p className="text-white/50 text-xs">Predicts future trend</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">What Each Term Does</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Proportional:</strong> Responds to current error - larger error produces larger output</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Integral:</strong> Eliminates steady-state error by accumulating past errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Derivative:</strong> Reduces overshoot by responding to rate of change</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What does the Integral (I) term fix in a control system?"
          correctAnswer="It eliminates steady-state errors and offset by accumulating error over time"
          explanation="The integral action continues to increase its contribution until the error is completely eliminated, providing automatic reset to bring PV exactly to SP."
        />

        {/* Section 02 - Proportional Control */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Proportional (P) Control</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <BarChart className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">How P Control Works</h3>
                <p className="text-white/80 text-sm">
                  Proportional control provides an output directly proportional to the error. The larger the
                  error, the larger the corrective action. It's simple and provides immediate response.
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-2">P Action: Output = Kp × Error</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Characteristics:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Immediate response to error</li>
                    <li>Output proportional to error magnitude</li>
                    <li>Simple to understand and tune</li>
                    <li>Fast initial response</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Limitations:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Creates steady-state offset</li>
                    <li>Cannot eliminate residual error</li>
                    <li>May cause oscillation if too high</li>
                    <li>Sensitive to noise</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Effects of Proportional Gain (Kp)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                  <p className="text-red-300 font-medium text-sm">Low Kp</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Slow response</li>
                    <li>Large offset</li>
                    <li>Very stable</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <p className="text-green-300 font-medium text-sm">Optimal Kp</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Fast response</li>
                    <li>Minimal overshoot</li>
                    <li>Good stability</li>
                  </ul>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
                  <p className="text-orange-300 font-medium text-sm">High Kp</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Very fast response</li>
                    <li>Oscillation risk</li>
                    <li>Potential instability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="What is the risk of having too much Proportional gain?"
          correctAnswer="The system becomes unstable and oscillates around the setpoint"
          explanation="Excessive proportional gain causes the controller to overreact to small errors, creating oscillations that can grow and make the system unstable."
        />

        {/* Section 03 - Integral Control */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Integral (I) Control</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">How I Control Works</h3>
                <p className="text-white/80 text-sm">
                  Integral control accumulates error over time and provides correction proportional to both
                  the magnitude and duration of the error. It continues until the error is eliminated.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">I Action: Output = Ki × ∫Error dt</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Purpose:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Eliminates steady-state error</li>
                    <li>Provides automatic reset</li>
                    <li>Improves accuracy</li>
                    <li>Handles load disturbances</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Operation:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Continues until error = 0</li>
                    <li>Slower response than P action</li>
                    <li>Can cause overshoot</li>
                    <li>Has memory of past errors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Integral Time and Reset Rate</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Integral Time (Ti)</p>
                  <p className="text-white/70 text-xs mt-1">Time for integral action to equal proportional action</p>
                  <p className="text-white/50 text-xs mt-1">Longer Ti = slower integral action</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Reset Rate (1/Ti)</p>
                  <p className="text-white/70 text-xs mt-1">Repeats per minute integral equals proportional</p>
                  <p className="text-white/50 text-xs mt-1">Higher rate = faster integral action</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-medium text-red-300 mb-2">Integral Windup</h4>
              <p className="text-white/80 text-sm mb-2">
                Occurs when output saturates while error persists, causing integral to accumulate excessively.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-white text-xs font-medium">Causes:</p>
                  <ul className="text-white/70 text-xs mt-1 space-y-1">
                    <li>Large setpoint changes</li>
                    <li>Output saturation limits</li>
                    <li>Extended error conditions</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white text-xs font-medium">Solutions:</p>
                  <ul className="text-white/70 text-xs mt-1 space-y-1">
                    <li>Anti-windup algorithms</li>
                    <li>Conditional integration</li>
                    <li>Output clamping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 04 - Derivative Control */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Derivative (D) Control</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-medium text-orange-300 mb-2">D Action: Output = Kd × (de/dt)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Benefits:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Reduces overshoot</li>
                    <li>Improves stability</li>
                    <li>Anticipates error trends</li>
                    <li>Speeds up response</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Limitations:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Amplifies noise</li>
                    <li>No steady-state contribution</li>
                    <li>Requires noise filtering</li>
                    <li>Sensitive to measurement quality</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">When to Use Derivative</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <p className="text-green-300 font-medium text-sm">Good For:</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Processes with overshoot problems</li>
                    <li>Systems needing faster settling</li>
                    <li>Large, slow processes</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                  <p className="text-red-300 font-medium text-sm">Avoid When:</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Signal is noisy</li>
                    <li>Fast processes</li>
                    <li>Level control applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="When is Derivative (D) control most useful?"
          correctAnswer="When there is overshoot and oscillation that needs to be reduced"
          explanation="Derivative action predicts future error based on the rate of change, providing braking action to reduce overshoot and improve system stability."
        />

        {/* Section 05 - Tuning Methods */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">PID Tuning Methods</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Ziegler-Nichols Method</h4>
              <p className="text-white/70 text-sm mb-3">
                The most widely used classical tuning method, providing systematic rules for PID parameters.
              </p>
              <div className="bg-white/5 rounded p-3">
                <p className="text-white font-medium text-sm mb-2">Closed Loop Method Steps:</p>
                <ol className="text-white/70 text-xs space-y-1 list-decimal list-inside">
                  <li>Set Ki = 0 and Kd = 0 (P control only)</li>
                  <li>Gradually increase Kp until sustained oscillation</li>
                  <li>Record Ultimate Gain (Ku) and Ultimate Period (Tu)</li>
                  <li>Apply Z-N tuning rules for P, PI, or PID</li>
                </ol>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Manual Tuning Guidelines</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">1</span>
                  <div>
                    <p className="text-white text-sm font-medium">Start with P Only</p>
                    <p className="text-white/70 text-xs">Increase Kp until response is fast but stable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">2</span>
                  <div>
                    <p className="text-white text-sm font-medium">Add Integral</p>
                    <p className="text-white/70 text-xs">Start with long Ti, decrease until offset eliminated</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">3</span>
                  <div>
                    <p className="text-white text-sm font-medium">Add Derivative (if needed)</p>
                    <p className="text-white/70 text-xs">Start small, increase to reduce overshoot</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">4</span>
                  <div>
                    <p className="text-white text-sm font-medium">Fine-tune</p>
                    <p className="text-white/70 text-xs">Make small adjustments for optimal performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Can PID loops self-correct?</h4>
              <p className="text-white/70 text-sm">
                Yes, through the integral action. The I term automatically adjusts the output to eliminate
                persistent errors over time, providing self-correction capability.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Why use all three PID terms?</h4>
              <p className="text-white/70 text-sm">
                Each term addresses different aspects of control performance: P provides immediate response,
                I eliminates steady-state error, and D provides stability and reduces overshoot.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What is the most common PID tuning method?</h4>
              <p className="text-white/70 text-sm">
                The Ziegler-Nichols method is the most widely used classical tuning method, providing
                systematic rules for determining PID parameters based on plant characteristics.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="Which PID term responds to the rate of change of error?"
            options={[
              "Proportional",
              "Integral",
              "Derivative",
              "All three equally"
            ]}
            correctAnswer={2}
            explanation="The Derivative term responds to the rate of change of error (de/dt), providing predictive action based on how quickly the error is changing. This helps anticipate future error and reduce overshoot."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="../section-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </Link>
          <Link to="../section-4">
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

export default InstrumentationModule5Section3;
