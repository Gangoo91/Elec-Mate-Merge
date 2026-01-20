import { ArrowLeft, Settings, CheckCircle, HelpCircle, Calculator, AlertTriangle, TrendingUp, Target, Wrench, Brain, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule6Section6 = () => {
  useSEO({
    title: "Advanced Calibration Topics and Best Practices | Instrumentation Module 6",
    description: "Master advanced calibration techniques, measurement uncertainty calculations, troubleshooting methods, and future trends in calibration technology.",
    keywords: ["measurement uncertainty", "calibration best practices", "calibration troubleshooting", "Type A uncertainty", "Type B uncertainty", "in-situ calibration"]
  });

  return (
    <div className="bg-background text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-6" className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Module 6</span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/20 mb-4">
            <Settings className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Advanced Calibration Topics and Best Practices
          </h1>
          <p className="text-white">
            Module 6 · Section 6 · 20 min read
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            What You Will Learn
          </h2>
          <ul className="space-y-1 text-white">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Measurement uncertainty types and budget calculations
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Advanced calibration techniques (multi-point, in-situ, cross-calibration)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Troubleshooting common calibration problems
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Future trends and emerging calibration technologies
            </li>
          </ul>
        </div>

        {/* Section 01 - Measurement Uncertainty */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Measurement Uncertainty and Budget Calculations</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Every measurement has uncertainty - a range within which the true value is expected to lie. Understanding and calculating measurement uncertainty is essential for professional calibration work and regulatory compliance.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-400" />
                  Type A Uncertainty
                </h3>
                <p className="text-white text-sm mb-2 italic">Evaluated by statistical analysis</p>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Based on repeated measurements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Calculated using standard deviation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Covers random effects (noise, environmental variation)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Requires multiple readings to evaluate
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-green-400" />
                  Type B Uncertainty
                </h3>
                <p className="text-white text-sm mb-2 italic">Evaluated by other means</p>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Based on specifications and certificates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Scientific judgement and prior knowledge
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Covers systematic effects and biases
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Uses manufacturer data, handbooks, experience
                  </li>
                </ul>
              </div>
            </div>

            {/* Uncertainty Budget Components */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3">Uncertainty Budget Components</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Reference Standard:</strong> Certificate uncertainty
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Environmental:</strong> Temperature, humidity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Repeatability:</strong> Short-term precision
                  </li>
                </ul>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Reproducibility:</strong> Long-term stability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Resolution:</strong> Display limitations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Drift:</strong> Time-related changes
                  </li>
                </ul>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Hysteresis:</strong> Direction-dependent errors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Loading Effects:</strong> Measurement influence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Interpolation:</strong> Between calibration points
                  </li>
                </ul>
              </div>
            </div>

            {/* Key Formula */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Combined Uncertainty
              </h3>
              <p className="text-white text-sm">
                The combined uncertainty (uc) is calculated by taking the square root of the sum of the squares of all individual uncertainty components (root sum of squares method). For reporting, this is typically multiplied by a coverage factor (k=2 for 95% confidence) to give expanded uncertainty (U).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is the difference between Type A and Type B measurement uncertainty?"
          answer="Type A uncertainty is evaluated statistically from repeated measurements (e.g., calculating standard deviation from multiple readings). Type B uncertainty is evaluated from other sources such as manufacturer specifications, calibration certificates, scientific judgement, or prior knowledge. Both types are equally valid and are combined in uncertainty budgets."
        />

        {/* Section 02 - Advanced Techniques */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Advanced Calibration Techniques</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Beyond basic calibration, advanced techniques address complex measurement challenges and optimise calibration efficiency. These methods are essential for sophisticated applications and cost-effective calibration programmes.
            </p>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                Multi-Point Calibration
              </h3>
              <p className="text-white text-sm mb-3">
                Comprehensive calibration across the full measurement range with multiple reference points.
              </p>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Linear Interpolation:</strong> Calculate values between calibrated points
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Curve Fitting:</strong> Mathematical models for non-linear responses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Range Coverage:</strong> Minimum 10-90% of full scale recommended
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Error Mapping:</strong> Creates detailed accuracy profile across range
                </li>
              </ul>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-green-400" />
                In-Situ Calibration
              </h3>
              <p className="text-white text-sm mb-3">
                Calibration performed with the instrument installed in its operating location.
              </p>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Process Integration:</strong> No removal from service required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Real Conditions:</strong> Accounts for actual operating environment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Installation Effects:</strong> Includes mounting, wiring, interference factors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Reduced Downtime:</strong> Minimises production interruption
                </li>
              </ul>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-purple-400" />
                Cross-Calibration
              </h3>
              <p className="text-white text-sm mb-3">
                Using multiple instruments to verify consistency and identify problems.
              </p>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Redundancy Check:</strong> Multiple measurement paths confirm accuracy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Consistency Verification:</strong> Ensures agreement between instruments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Fault Detection:</strong> Identifies drifting or failed instruments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Cost Optimisation:</strong> Reduces need for expensive reference standards
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 - Troubleshooting */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Troubleshooting Calibration Problems</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Calibration problems can be frustrating and time-consuming. Understanding common issues and their solutions helps resolve problems efficiently and prevent recurrence.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  Repeatability Problems
                </h3>
                <p className="text-white text-xs italic mb-2">Inconsistent readings during calibration</p>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Causes:</strong> Mechanical wear, electrical noise, temperature drift
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Solutions:</strong> Allow stabilisation time, add shielding, control environment
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  Hysteresis Effects
                </h3>
                <p className="text-white text-xs italic mb-2">Different readings ascending vs descending</p>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <strong>Causes:</strong> Mechanical backlash, magnetic materials, friction
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <strong>Solutions:</strong> Approach from same direction, pre-load mechanism
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Linearity Errors
                </h3>
                <p className="text-white text-xs italic mb-2">Non-proportional response across range</p>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <strong>Causes:</strong> Component ageing, design limitations, saturation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <strong>Solutions:</strong> Multi-point calibration, curve correction algorithms
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-400" />
                  Zero Drift
                </h3>
                <p className="text-white text-xs italic mb-2">Baseline measurement changes over time</p>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Causes:</strong> Electronic component ageing, contamination
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Solutions:</strong> Auto-zero function, regular baseline correction
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-green-400" />
                  Environmental Sensitivity
                </h3>
                <p className="text-white text-xs italic mb-2">Readings affected by ambient conditions</p>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Causes:</strong> Temperature coefficients, humidity effects, vibration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Solutions:</strong> Compensation algorithms, controlled environment
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-purple-400" />
                  Loading Effects
                </h3>
                <p className="text-white text-xs italic mb-2">Calibration equipment affects measurement</p>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Causes:</strong> Low impedance, capacitive loading, current draw
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Solutions:</strong> High impedance instruments, proper buffering
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What are the main benefits of in-situ calibration compared to laboratory calibration?"
          answer="In-situ calibration provides: 1) No removal from service required - reduces downtime, 2) Calibration under actual operating conditions, 3) Includes installation effects (mounting, wiring, interference), 4) Detects problems that might not appear in a controlled laboratory environment. The trade-off is that field conditions may introduce additional uncertainty."
        />

        {/* Section 04 - Best Practices */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Calibration Best Practices</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Following best practices ensures consistent, reliable calibration results. These practices apply whether you perform calibration in-house or manage external calibration services.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">Pre-Calibration</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Allow thermal equilibration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Control environment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Review calibration history
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Verify standards are in-date
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Clean contacts and connections
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">During Calibration</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Follow documented procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Take multiple readings per point
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Approach from same direction
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Test full operating range
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Monitor for unusual behaviour
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">Post-Calibration</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Review results for consistency
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Compare with historical data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Complete all documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Update calibration labels
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Verify proper installation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05 - Future Trends */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Future Trends in Calibration Technology</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Calibration technology is evolving rapidly. Understanding emerging trends helps you prepare for future developments and make informed decisions about calibration investments.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Digital Transformation
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Digital Certificates:</strong> Blockchain-secured records
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>IoT Integration:</strong> Connected calibration equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Cloud Computing:</strong> Scalable management platforms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Mobile Solutions:</strong> Field calibration apps
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  Artificial Intelligence
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Predictive Calibration:</strong> AI-driven interval optimisation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Anomaly Detection:</strong> Automated fault identification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Pattern Recognition:</strong> Drift prediction algorithms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Decision Support:</strong> AI-assisted planning
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-400" />
                  Automation Advances
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Robotic Systems:</strong> Automated calibration cells
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Self-Calibrating:</strong> Built-in reference standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Remote Calibration:</strong> Network-based verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Continuous Monitoring:</strong> Real-time accuracy checks
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-elec-yellow" />
                  Regulatory Evolution
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Digital Standards:</strong> Electronic calibration procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Global Harmonisation:</strong> Unified international standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Sustainability:</strong> Environmental considerations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Risk-Based:</strong> Performance-based regulations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="How might AI improve calibration practices in the future?"
          answer="AI can: 1) Predict optimal calibration intervals based on historical drift patterns, 2) Detect anomalies that indicate instrument problems before failure, 3) Recognise patterns in calibration data to forecast maintenance needs, 4) Assist decision-making for calibration scheduling and resource allocation. This reduces costs while improving reliability."
        />

        {/* Real World Scenario */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4 mb-10 mt-10">
          <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Real World Scenario: Pharmaceutical Company Advanced Programme
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A pharmaceutical manufacturing facility with 500+ critical instruments needed to comply with FDA validation requirements whilst optimising costs and minimising production disruptions.
          </p>
          <div className="bg-card/50 rounded-lg p-3 border border-border mb-3">
            <h4 className="font-medium text-elec-yellow text-sm mb-2">Advanced Solutions Implemented:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">1.</span>
                Automated uncertainty budget software with Monte Carlo analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">2.</span>
                Risk-based calibration intervals using historical performance data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">3.</span>
                In-situ calibration for critical process instruments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">4.</span>
                Digital calibration certificates with blockchain verification
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">5.</span>
                AI-powered predictive calibration scheduling
              </li>
            </ul>
          </div>
          <p className="text-green-400 text-sm italic">
            Result: 40% reduction in calibration costs, 95% reduction in production downtime, and 100% audit compliance with automated regulatory reporting.
          </p>
        </div>

        {/* FAQs Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">How do I create an uncertainty budget?</h3>
              <p className="text-white text-sm">
                Start by identifying all sources of uncertainty in your measurement. For each source, determine whether it is Type A (statistically evaluated) or Type B (from other sources). Convert each uncertainty to a standard uncertainty (usually by dividing by appropriate factors), then combine using root sum of squares. Multiply by coverage factor (typically k=2) for expanded uncertainty.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">When should I use in-situ versus laboratory calibration?</h3>
              <p className="text-white text-sm">
                Use in-situ calibration when: removal is impractical, installation effects are significant, downtime is critical, or you need to verify performance under actual operating conditions. Use laboratory calibration when: highest accuracy is required, environmental conditions must be tightly controlled, or complex procedures are needed.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What coverage factor should I use?</h3>
              <p className="text-white text-sm">
                For most industrial applications, k=2 is used, providing approximately 95% confidence that the true value lies within the stated uncertainty range. For higher confidence (99%), use k=3. Some regulated industries may specify required coverage factors in their standards.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">How can I reduce calibration costs without compromising quality?</h3>
              <p className="text-white text-sm">
                Implement risk-based calibration intervals based on historical performance data. Use trend analysis to identify instruments that can safely have extended intervals. Consider in-situ calibration to reduce downtime. Automate data capture and documentation. Group similar instruments for batch processing. Train technicians to perform routine calibrations in-house.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question="What is the key difference between Type A and Type B measurement uncertainty evaluation?"
            options={[
              "Type A is more accurate than Type B",
              "Type A is evaluated statistically from repeated measurements; Type B is evaluated from other sources like specifications",
              "Type A is used for temperature; Type B is used for pressure",
              "Type A is required for UKAS; Type B is not"
            ]}
            correctAnswer={1}
            explanation="Type A uncertainty is evaluated by statistical analysis of repeated measurements (calculating standard deviation). Type B uncertainty is evaluated by other means such as manufacturer specifications, calibration certificates, prior knowledge, or scientific judgement. Both types are equally valid and are combined in uncertainty budgets using the root sum of squares method."
          />
        </section>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <Link to="/electrician/upskilling/instrumentation-module-6-section-5" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-11 touch-manipulation border-border hover:bg-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/electrician/upskilling/instrumentation-module-7" className="w-full sm:w-auto">
            <Button className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Module
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section6;
