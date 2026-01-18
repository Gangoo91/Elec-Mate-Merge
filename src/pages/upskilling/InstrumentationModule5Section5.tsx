import { ArrowLeft, Zap, CheckCircle, HelpCircle, Settings, Gauge, BarChart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule5Section5 = () => {
  useSEO({
    title: "Loop Tuning and Stability Considerations | Instrumentation Module 5",
    description: "Learn advanced techniques for optimising control loop performance and ensuring system stability in industrial control environments."
  });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module 5
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Loop Tuning and Stability Considerations
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            Advanced loop tuning optimises control system performance while maintaining stability.
            Understanding stability margins, tuning methods, and dead time compensation enables
            precise control in demanding industrial applications.
          </p>
        </div>

        {/* Section 01 - Advanced Tuning Methods */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Advanced Tuning Methods</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Process-Specific Tuning</h3>
                <p className="text-white/80 text-sm">
                  Different process types require different tuning approaches. Understanding process
                  characteristics helps select the most effective tuning method for optimal performance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Self-Regulating Processes</h4>
                <p className="text-white/70 text-xs mb-2">Naturally reach steady state (e.g., temperature)</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Standard Z-N or Lambda tuning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Moderate integral action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Derivative helpful for lag</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Integrating Processes</h4>
                <p className="text-white/70 text-xs mb-2">Continue changing without feedback (e.g., level)</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>PI control (no derivative)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Conservative integral action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Focus on stability over speed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-300 mb-3">Internal Model Control (IMC)</h4>
              <p className="text-white/80 text-sm mb-3">
                Uses a process model to design the controller and predict system behaviour.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Advantages:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Systematic approach</li>
                    <li>Predictable performance</li>
                    <li>Handles dead time well</li>
                    <li>Robust to model uncertainty</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Requirements:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Accurate process model</li>
                    <li>More complex implementation</li>
                    <li>Higher computational needs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Adaptive and Auto-Tuning</h4>
              <p className="text-white/80 text-sm mb-3">
                Modern controllers that automatically adjust parameters based on process changes.
              </p>
              <div className="space-y-2">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Pattern Recognition</p>
                  <p className="text-white/70 text-xs">Identifies oscillations, overshoot, and performance degradation</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Relay Feedback</p>
                  <p className="text-white/70 text-xs">Uses relay oscillations to identify critical parameters</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">Continuous Adaptation</p>
                  <p className="text-white/70 text-xs">Monitors performance and adjusts parameters in real-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What type of tuning method is more conservative - Ziegler-Nichols or Lambda tuning?"
          correctAnswer="Lambda tuning is more conservative, providing better stability margins and reduced overshoot at the cost of slower response"
          explanation="Lambda tuning prioritises stability and reduced oscillation over fast response, making it safer for processes where overshoot could cause problems."
        />

        {/* Section 02 - Stability Analysis */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Stability Analysis and Margins</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Understanding Stability Criteria</h3>
                <p className="text-white/80 text-sm">
                  Stability margins indicate how much the system can tolerate changes before becoming
                  unstable. Adequate margins ensure robust operation under varying conditions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Gain Margin</h4>
                <p className="text-white/80 text-sm mb-2">
                  How much loop gain can increase before instability occurs.
                </p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Typical target: 6-10 dB</li>
                  <li>Higher values = more conservative</li>
                  <li>Measured at phase crossover frequency</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Phase Margin</h4>
                <p className="text-white/80 text-sm mb-2">
                  Additional phase lag tolerated before instability.
                </p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Typical target: 30-60 degrees</li>
                  <li>Higher values = better damping</li>
                  <li>Measured at gain crossover frequency</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-medium text-orange-300 mb-3">Bode Plot Analysis</h4>
              <p className="text-white/80 text-sm mb-3">
                Graphical method for analysing system stability and performance.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Magnitude Plot</p>
                    <p className="text-white/70 text-xs">Shows gain vs frequency, indicates gain margin</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Phase Plot</p>
                    <p className="text-white/70 text-xs">Shows phase shift vs frequency, indicates phase margin</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Bandwidth</p>
                    <p className="text-white/70 text-xs">Frequency range where system responds effectively</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-medium text-red-300 mb-3">Robustness Considerations</h4>
              <p className="text-white/80 text-sm mb-3">
                Real systems have uncertainties that can affect stability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Model Uncertainty:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Process gain variations</li>
                    <li>Time constant changes</li>
                    <li>Dead time variations</li>
                    <li>Nonlinear behaviour</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">External Factors:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Measurement noise</li>
                    <li>Actuator limitations</li>
                    <li>Environmental changes</li>
                    <li>Wear and ageing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="What does gain margin indicate in a control system?"
          correctAnswer="Gain margin indicates how much the loop gain can be increased before the system becomes unstable"
          explanation="A higher gain margin provides more safety margin, allowing the system to tolerate variations in process gain without becoming unstable."
        />

        {/* Section 03 - Dead Time Compensation */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Dead Time Compensation</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Understanding Dead Time</h3>
                <p className="text-white/80 text-sm">
                  Dead time (transportation delay) occurs when there is a delay between controller
                  action and measurable response. It is one of the most challenging aspects of process control.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Common Sources of Dead Time</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Physical Delays:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Fluid transport in pipes</li>
                    <li>Heat conduction through materials</li>
                    <li>Chemical reaction time</li>
                    <li>Material mixing time</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">System Delays:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Measurement filtering</li>
                    <li>Communication delays</li>
                    <li>Actuator response time</li>
                    <li>Sampling intervals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-3">Smith Predictor</h4>
              <p className="text-white/80 text-sm mb-3">
                Uses a process model to predict what the output would be without dead time.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-white font-medium text-sm mb-2">How It Works:</p>
                  <ol className="space-y-1 text-white/70 text-xs list-decimal list-inside">
                    <li>Controller acts on predicted process variable</li>
                    <li>Model predicts immediate response</li>
                    <li>Actual measurement corrects model errors</li>
                    <li>System behaves as if no dead time exists</li>
                  </ol>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-white font-medium text-xs mb-1">Benefits:</p>
                    <ul className="text-white/70 text-xs space-y-0.5">
                      <li>Dramatically improved performance</li>
                      <li>Reduced overshoot and settling time</li>
                      <li>Better disturbance rejection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs mb-1">Requirements:</p>
                    <ul className="text-white/70 text-xs space-y-0.5">
                      <li>Accurate process model</li>
                      <li>Known dead time value</li>
                      <li>Model-plant mismatch handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Dahlin Controller</h4>
                <p className="text-white/70 text-xs mb-2">Digital controller designed for dead time processes</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Finite settling time response</li>
                  <li>Good for digital systems</li>
                  <li>Requires accurate model</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">Fuzzy Logic Control</h4>
                <p className="text-white/70 text-xs mb-2">Rule-based control for dead time handling</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>No mathematical model needed</li>
                  <li>Robust to uncertainties</li>
                  <li>Expert knowledge based</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="What is dead time compensation used for?"
          correctAnswer="Dead time compensation improves response to processes with significant delays by predicting system behaviour"
          explanation="Techniques like the Smith Predictor use process models to compensate for transportation delays, effectively controlling the system as if the dead time did not exist."
        />

        {/* Section 04 - Performance Evaluation */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Performance Evaluation</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <BarChart className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Key Performance Metrics</h3>
                <p className="text-white/80 text-sm">
                  Evaluating control loop performance requires measuring specific metrics that
                  indicate how well the system meets its control objectives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Time Domain Metrics</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Rise time (0-90% of setpoint)</li>
                  <li>Settling time (within 2% of setpoint)</li>
                  <li>Overshoot percentage</li>
                  <li>Steady-state error</li>
                  <li>Decay ratio (oscillation damping)</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Frequency Domain Metrics</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Bandwidth (response frequency range)</li>
                  <li>Resonant peak (maximum amplification)</li>
                  <li>Phase margin and gain margin</li>
                  <li>Crossover frequencies</li>
                  <li>Sensitivity functions</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-300 mb-3">Integrated Performance Indices</h4>
              <div className="space-y-2">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">IAE (Integral Absolute Error)</p>
                  <p className="text-white/70 text-xs">Integral of |error| dt - Penalises all errors equally</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">ISE (Integral Square Error)</p>
                  <p className="text-white/70 text-xs">Integral of error squared dt - Penalises large errors more heavily</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm">ITAE (Integral Time Absolute Error)</p>
                  <p className="text-white/70 text-xs">Integral of t|error| dt - Emphasises reducing errors quickly</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Practical Testing Methods</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Step Response Test:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Change setpoint by 5-10%</li>
                    <li>Record complete response</li>
                    <li>Measure time domain metrics</li>
                    <li>Check for oscillations</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Disturbance Test:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Apply known load disturbance</li>
                    <li>Measure recovery time</li>
                    <li>Check maximum deviation</li>
                    <li>Verify steady-state return</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenario */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-blue-300 mb-2">Real-World Scenario: Chemical Reactor Temperature</h4>
          <div className="space-y-3 text-white/80 text-sm">
            <div>
              <p className="text-white font-medium">Challenge:</p>
              <p className="text-white/70 text-xs">A chemical reactor has significant dead time (3 minutes) and is sensitive to temperature overshoot which can damage the catalyst.</p>
            </div>
            <div>
              <p className="text-white font-medium">Solution:</p>
              <p className="text-white/70 text-xs">Implement Smith Predictor with conservative tuning. Use model-based feed-forward control for known disturbances like feed rate changes.</p>
            </div>
            <div>
              <p className="text-white font-medium">Result:</p>
              <p className="text-white/70 text-xs">Dead time compensation reduces settling time by 70% while maintaining tight temperature control without overshoot.</p>
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
              <h4 className="font-medium text-white mb-2">What is the main goal of loop tuning?</h4>
              <p className="text-white/70 text-sm">
                Loop tuning aims to optimise system performance (speed, accuracy, robustness) while
                maintaining stability. The goal is not to make the system as fast as possible, but to
                achieve the best balance between performance and stability for the application.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What indicates an over-tuned (aggressive) control loop?</h4>
              <p className="text-white/70 text-sm">
                Over-tuned loops exhibit oscillations, overshoot, and potentially unstable behaviour.
                Signs include excessive process variable swings, frequent valve movement, and slow
                settling after disturbances. Reducing gain or increasing integral time usually helps.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Why should control loops be tested with realistic disturbances?</h4>
              <p className="text-white/70 text-sm">
                Testing with realistic disturbances ensures the control loop will perform well under
                actual operating conditions, not just ideal laboratory conditions. Real processes
                experience load changes, supply variations, and environmental disturbances that must
                be rejected effectively.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">When is model-based tuning preferred over empirical methods?</h4>
              <p className="text-white/70 text-sm">
                Model-based tuning is preferred when the process is well understood, an accurate model
                exists, and the cost of poor tuning is high. Empirical methods like Ziegler-Nichols are
                better for unknown processes where trial and error is acceptable.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="What is the typical target range for phase margin in a stable control system?"
            options={[
              "5-15 degrees",
              "30-60 degrees",
              "90-120 degrees",
              "180-270 degrees"
            ]}
            correctAnswer={1}
            explanation="A phase margin of 30-60 degrees provides good stability with adequate damping. Lower values risk oscillation, while higher values may result in sluggish response."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="../section-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="../section-6">
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

export default InstrumentationModule5Section5;
