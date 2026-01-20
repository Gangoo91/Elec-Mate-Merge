import { ArrowLeft, Zap, CheckCircle, HelpCircle, Activity, TrendingDown, Gauge, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule5Section4 = () => {
  useSEO({
    title: "Common Loop Faults: Hunting, Overshoot, Lag | Instrumentation Module 5",
    description: "Identify what can go wrong in control loops and learn systematic troubleshooting approaches for hunting, overshoot, and lag problems."
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
          Common Loop Faults: Hunting, Overshoot, Lag
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            Control loops can develop faults that degrade performance: hunting (oscillation), overshoot
            (exceeding setpoint), and lag (slow response). Understanding causes and corrections helps
            maintain optimal system performance through systematic troubleshooting.
          </p>
        </div>

        {/* Section 01 - Hunting */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Hunting (Oscillation)</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is Hunting?</h3>
                <p className="text-white/80 text-sm">
                  Hunting is continuous oscillatory behaviour where the process variable repeatedly cycles
                  above and below the setpoint without settling to a stable value. The system never reaches
                  steady state.
                </p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-medium text-red-300 mb-3">Characteristics of Hunting</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Symptoms:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>PV oscillates continuously around SP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Controller output cycles regularly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Never reaches steady state</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Frequency Indicators:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Fast oscillation: High proportional gain</li>
                    <li>Slow oscillation: Integral action too fast</li>
                    <li>Growing oscillation: System instability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Root Causes of Hunting</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <p className="text-elec-yellow font-medium text-sm">Tuning-Related</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Excessive proportional gain</li>
                    <li>Integral action too fast</li>
                    <li>Insufficient derivative</li>
                    <li>Wrong control action</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-elec-yellow font-medium text-sm">Hardware-Related</p>
                  <ul className="text-white/70 text-xs space-y-1 mt-2">
                    <li>Actuator sticking or dead band</li>
                    <li>Sensor noise or drift</li>
                    <li>Process changes</li>
                    <li>Loop interaction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-2">Solutions for Hunting</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white text-sm font-medium mb-2">Tuning Adjustments:</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>Reduce proportional gain by 25-50%</li>
                    <li>Increase integral time (slower action)</li>
                    <li>Add or increase derivative action</li>
                    <li>Verify control action direction</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-2">Hardware Checks:</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>Test actuator response and calibration</li>
                    <li>Check sensor signal quality</li>
                    <li>Verify wiring connections</li>
                    <li>Inspect for mechanical binding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What causes hunting in a control loop?"
          correctAnswer="Excessive gain or poor tuning causing the system to oscillate around the setpoint"
          explanation="Hunting occurs when the controller overreacts to errors due to excessive gain or improper tuning, causing continuous oscillation that never settles."
        />

        {/* Section 02 - Overshoot */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Overshoot Problems</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Understanding Overshoot</h3>
                <p className="text-white/80 text-sm">
                  Overshoot occurs when the process variable exceeds the setpoint before settling, indicating
                  aggressive control action that provides too much correction.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Types of Overshoot</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <p className="text-green-300 font-bold text-lg">5-15%</p>
                  <p className="text-white text-xs font-medium">Acceptable</p>
                  <p className="text-white/50 text-xs">Fast, quick settling</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
                  <p className="text-orange-300 font-bold text-lg">15-50%</p>
                  <p className="text-white text-xs font-medium">Excessive</p>
                  <p className="text-white/50 text-xs">Instability risk</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                  <p className="text-red-300 font-bold text-lg">&gt;50%</p>
                  <p className="text-white text-xs font-medium">Severe</p>
                  <p className="text-white/50 text-xs">Immediate action</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Causes of Overshoot</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Control Tuning:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>High proportional gain</li>
                    <li>Fast integral action</li>
                    <li>Insufficient derivative</li>
                    <li>Integral windup</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Process Characteristics:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Process dead time</li>
                    <li>Large time constants</li>
                    <li>Nonlinear behaviour</li>
                    <li>Load disturbances</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Overshoot Reduction Strategies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-white text-sm font-medium mb-2">Tuning Solutions:</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Reduce proportional gain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Increase integral time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Add derivative action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Implement anti-windup</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-2">Advanced Techniques:</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Setpoint ramping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Feed-forward control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Gain scheduling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="How do you reduce overshoot in a control loop?"
          correctAnswer="Decrease integral action and add derivative action to provide braking"
          explanation="Reducing integral action slows error accumulation, while derivative action anticipates the approach to setpoint and provides a braking effect to prevent overshooting."
        />

        {/* Section 03 - Lag */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Lag and Slow Response</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Gauge className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What is Lag?</h3>
                <p className="text-white/80 text-sm">
                  Lag represents delays in the control system that slow response and reduce control effectiveness.
                  It's the time between when an input change occurs and when the system begins to react.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Types of Lag</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                  <p className="text-blue-300 font-medium text-sm">Dead Time (Transport Delay)</p>
                  <p className="text-white/70 text-xs mt-1">Time delay before any response observed</p>
                  <ul className="text-white/50 text-xs mt-2 space-y-1">
                    <li>Material transport in pipes</li>
                    <li>Signal processing delays</li>
                    <li>Communication delays</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <p className="text-green-300 font-medium text-sm">Time Constant Lag</p>
                  <p className="text-white/70 text-xs mt-1">Exponential response delay due to dynamics</p>
                  <ul className="text-white/50 text-xs mt-2 space-y-1">
                    <li>Thermal mass in heating systems</li>
                    <li>Capacitive effects in tanks</li>
                    <li>Sensor response time</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Impact of Lag on Control</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Performance Degradation:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Slower response to setpoint changes</li>
                    <li>Reduced disturbance rejection</li>
                    <li>Increased tendency to oscillate</li>
                    <li>Lower maximum achievable gain</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Control Limitations:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Conservative tuning required</li>
                    <li>Trade-off: speed vs stability</li>
                    <li>Difficulty with fast disturbances</li>
                    <li>Increased steady-state errors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Strategies for Lag Compensation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white text-sm font-medium mb-2">Physical Modifications:</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>Relocate sensors closer to process</li>
                    <li>Use faster responding sensors</li>
                    <li>Minimise pipe lengths and volumes</li>
                    <li>Upgrade actuators for faster response</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-2">Control Strategies:</p>
                  <ul className="text-white/70 text-xs space-y-1">
                    <li>Feed-forward compensation</li>
                    <li>Smith predictor control</li>
                    <li>Cascade control systems</li>
                    <li>Advanced control algorithms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="What is lag in a control system?"
          correctAnswer="The delayed response between when an input change occurs and when the system begins to react"
          explanation="Lag includes dead time (pure delay) and time constant lag (gradual response), both of which slow system response and require compensation for effective control."
        />

        {/* Section 04 - Troubleshooting */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Systematic Troubleshooting</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Diagnostic Process</h3>
                <p className="text-white/80 text-sm">
                  Effective troubleshooting starts with data collection and systematic analysis of PV, SP, and
                  output signals to identify the root cause.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Step-by-Step Approach</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">1</span>
                  <div>
                    <p className="text-white text-sm font-medium">Trend Analysis</p>
                    <p className="text-white/70 text-xs">Plot PV, SP, and Output vs time to identify patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">2</span>
                  <div>
                    <p className="text-white text-sm font-medium">Signal Quality Check</p>
                    <p className="text-white/70 text-xs">Assess noise levels, dropouts, and calibration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">3</span>
                  <div>
                    <p className="text-white text-sm font-medium">Component Testing</p>
                    <p className="text-white/70 text-xs">Test sensor and actuator operation individually</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow text-black font-bold text-xs flex-shrink-0">4</span>
                  <div>
                    <p className="text-white text-sm font-medium">Controller Review</p>
                    <p className="text-white/70 text-xs">Verify PID parameters and control action settings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">Real-World Example: HVAC Fan Control</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-white font-medium">Problem:</p>
                  <p className="text-white/70 text-xs">Fan repeatedly speeds up and slows down, temperature fluctuates ±3°C</p>
                </div>
                <div>
                  <p className="text-white font-medium">Diagnosis:</p>
                  <p className="text-white/70 text-xs">Trending reveals hunting with 2-minute period. High Kp identified.</p>
                </div>
                <div>
                  <p className="text-white font-medium">Solution:</p>
                  <p className="text-white/70 text-xs">Reduced Kp by 40%, added derivative. Result: ±0.5°C control.</p>
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
              <h4 className="font-medium text-white mb-2">What might cause loop instability?</h4>
              <p className="text-white/70 text-sm">
                Loop instability can be caused by excessive controller gain, poor sensor signals, noise,
                process changes, or actuator problems that disrupt the control loop's ability to maintain
                stable control.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">How is tuning involved in fault correction?</h4>
              <p className="text-white/70 text-sm">
                Proper PID tuning is essential for preventing and correcting most control loop faults.
                Balancing responsiveness, stability, and accuracy through correct P, I, and D settings
                addresses the majority of control problems.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">When should you switch to manual control?</h4>
              <p className="text-white/70 text-sm">
                Manual control should be considered during emergencies, equipment failures, major process
                upsets, or when automatic control is causing unsafe conditions that require immediate
                operator intervention.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="What is the most effective way to diagnose control loop problems?"
            options={[
              "Replace all components",
              "Systematic troubleshooting starting with trending analysis",
              "Increase all PID gains",
              "Switch to manual control permanently"
            ]}
            correctAnswer={1}
            explanation="Systematic troubleshooting starting with trending analysis of PV, SP, and output signals provides the most effective diagnosis. This approach identifies patterns and root causes before making changes."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="../instrumentation-module-5-section-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </Link>
          <Link to="../instrumentation-module-5-section-5">
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

export default InstrumentationModule5Section4;
