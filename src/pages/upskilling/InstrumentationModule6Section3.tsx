import { ArrowLeft, Cog, CheckCircle, HelpCircle, Gauge, Thermometer, Zap, ShieldCheck, ClipboardList, AlertTriangle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule6Section3 = () => {
  useSEO({
    title: "Step-by-Step Calibration Procedures | Instrumentation Module 6",
    description: "Learn step-by-step calibration procedures for pressure, temperature, and electrical devices including safety requirements and best practices.",
    keywords: ["calibration procedures", "pressure calibration", "temperature calibration", "electrical calibration", "calibration safety"]
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <Cog className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Step-by-Step Calibration Procedures
          </h1>
          <p className="text-white">
            Module 6 · Section 3 · 20 min read
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
              Safety and pre-calibration checks required before starting
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Step-by-step pressure device calibration procedures
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Temperature sensor calibration using dry block method
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Electrical device calibration for voltage, current, and resistance
            </li>
          </ul>
        </div>

        {/* Section 01 - Safety and Pre-Calibration Checks */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Safety and Pre-Calibration Checks</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Every calibration starts with safety. Before touching any equipment, you must complete essential isolation and verification steps. These protect both you and the equipment from damage.
            </p>

            {/* Critical Safety Box */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                CRITICAL SAFETY REQUIREMENTS
              </h3>
              <p className="text-white text-sm mb-3">
                These steps MUST be completed before any calibration work begins.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium text-white mb-2">Device Isolation</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">1.</span>
                      Switch off and lock out electrical supplies
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">2.</span>
                      Close isolation valves for process connections
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">3.</span>
                      Vent any trapped pressure safely
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">4.</span>
                      Apply warning tags (LOTO procedures)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">5.</span>
                      Verify isolation with appropriate test instruments
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Equipment Verification</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">1.</span>
                      Check calibration standards are in-date
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">2.</span>
                      Verify test equipment battery levels
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">3.</span>
                      Record environmental conditions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">4.</span>
                      Ensure procedures and forms available
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">5.</span>
                      Confirm appropriate PPE is worn
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is the correct order for device isolation before calibration?"
          answer="1) Switch off and lock out electrical supplies, 2) Close isolation valves, 3) Vent trapped pressure safely, 4) Apply LOTO tags, 5) Verify isolation with test instruments. Never skip any steps."
        />

        {/* Section 02 - Pressure Device Calibration */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Pressure Device Calibration</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Pressure calibration compares the device under test (DUT) against a known reference pressure. The procedure involves zero adjustment, span adjustment, and multi-point verification to confirm linearity across the range.
            </p>

            {/* Step 1 */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-blue-400" />
                Step 1: Initial Setup
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Connect calibrated pressure source (deadweight tester or digital calibrator)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Ensure all connections are tight and leak-free
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Allow system to stabilise for 5-10 minutes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Record ambient conditions and reference standard details
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-green-400" />
                Step 2: Zero Calibration
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Ensure zero pressure applied (atmospheric for gauge-type instruments)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Record device reading at zero point
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Adjust zero setting if device has adjustment capability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  If non-adjustable, record error for calibration certificate
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-400" />
                Step 3: Span Adjustment
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Apply full-scale pressure (or 80% if full scale not achievable)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Record device reading at span point
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Adjust span setting to match reference pressure
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Return to zero and re-check (may require iteration)
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-elec-yellow" />
                Step 4: Multi-Point Verification
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Test at 0%, 25%, 50%, 75%, and 100% of range
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Perform both ascending and descending readings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Calculate hysteresis (difference between up and down readings)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Calculate linearity errors across the range
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Record all readings with timestamps
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 - Temperature Device Calibration */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Temperature Device Calibration</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Temperature calibration requires careful attention to thermal equilibrium. The dry block calibrator method is widely used for its portability and consistency. Allow adequate stabilisation time at each test point.
            </p>

            {/* Equipment Setup */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-400" />
                Step 1: Equipment Setup
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Pre-heat dry block calibrator to first test temperature
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Insert reference RTD probe into calibrator well
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Insert device under test (DUT) probe adjacent to reference
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Allow 10-15 minutes for thermal equilibrium
                </li>
              </ul>
            </div>

            {/* RTD Comparison */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-400" />
                Step 2: RTD Probe Comparison
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  Monitor both reference and DUT readings until stable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <strong>Stability criterion:</strong> Less than 0.01°C change over 2 minutes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  Record simultaneous readings from both instruments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  Note any significant difference for adjustment
                </li>
              </ul>
            </div>

            {/* Multi-Point Testing */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-blue-400" />
                Step 3: Multi-Point Testing
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Test at minimum 3 temperatures across operating range
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Common test points: 0°C, 50°C, 100°C (adjust for actual range)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Allow full stabilisation at each temperature point
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Record ambient conditions at each test point
                </li>
              </ul>
            </div>

            {/* Important Note */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Stabilisation Time is Critical
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Temperature calibration errors often occur due to insufficient stabilisation time. Even if readings appear stable, thermal gradients within the probe and dry block can cause errors. Always wait the full recommended time (10-15 minutes) between temperature changes.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is the stability criterion for temperature calibration readings?"
          answer="Less than 0.01°C change over 2 minutes. This ensures thermal equilibrium has been reached and readings are reliable. Rushing this step is a common cause of calibration errors."
        />

        {/* Section 04 - Electrical Device Calibration */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Electrical Device Calibration</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Electrical calibration involves comparing the device under test against precision voltage, current, or resistance sources. Each measurement function requires specific test procedures and connection methods.
            </p>

            {/* DC Voltage */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                DC Voltage Calibration
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Connect precision voltage calibrator to DUT input
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Apply test voltages: 0V, 1V, 5V, 10V (range dependent)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Allow 30 seconds settling time between readings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Record DUT reading vs. calibrator output
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Test both positive and negative polarities
                </li>
              </ul>
            </div>

            {/* DC Current */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                DC Current Calibration
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Connect precision current source in series with DUT
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Apply test currents across measurement range
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>For 4-20mA loops:</strong> Test at 4mA, 12mA, 20mA
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Monitor for burden voltage effects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Record linearity and accuracy errors
                </li>
              </ul>
            </div>

            {/* Resistance */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                Resistance Calibration
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Connect precision resistance standards to DUT
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Use 4-wire (Kelvin) connection for best accuracy</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Test common values: 100R, 1kR, 10kR
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Account for lead resistance in measurements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Verify ohms function across multiple ranges
                </li>
              </ul>
            </div>

            {/* 4-Wire Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Why Use 4-Wire Connections?</h3>
              <p className="text-white text-sm leading-relaxed">
                4-wire (Kelvin) connections eliminate the effect of test lead resistance. Two wires carry the measurement current, while two separate wires sense the voltage drop across the resistor only. This is essential for accurate low-resistance measurements where lead resistance could be a significant source of error.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 - Data Recording and Verification */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Data Recording and Post-Calibration Verification</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Comprehensive documentation is essential for traceability and audit compliance. Record all data in real-time during calibration, not from memory afterwards.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-blue-400" />
                  During Calibration
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Record all readings immediately (real-time logging)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Environmental data: temperature, humidity, pressure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Reference standards: certificate numbers, due dates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Technician identification and signature
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Date and time of each measurement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    All adjustments made with before/after values
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Post-Calibration Checks
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Repeat key points to verify stability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Confirm device operates normally in system
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Test across full operating range
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Check alarm setpoints and outputs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Review all documentation for completeness
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Generate calibration certificate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why is 4-wire connection recommended for resistance measurements?"
          answer="4-wire (Kelvin) connection eliminates the effect of test lead resistance by using separate pairs of wires for current injection and voltage sensing. This provides the highest accuracy, especially for low-resistance measurements."
        />

        {/* Real World Scenario */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4 mb-10 mt-10">
          <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Real World Scenario: Hospital Vaccine Storage Calibration
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A hospital biomedical engineer calibrates temperature sensors in vaccine storage units to ensure pharmaceutical storage compliance. The stakes are high - incorrect temperatures can destroy thousands of pounds worth of vaccines.
          </p>
          <div className="bg-card/50 rounded-lg p-3 border border-border mb-3">
            <h4 className="font-medium text-elec-yellow text-sm mb-2">Procedure Followed:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">1.</span>
                Temporarily moves vaccines to backup storage (isolation)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">2.</span>
                Uses UKAS-calibrated dry block calibrator
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">3.</span>
                Tests at 2°C, 4°C, 6°C, 8°C (vaccine storage range)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">4.</span>
                Acceptance criteria: ±0.5°C for compliance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">5.</span>
                Documents complete traceability for regulatory audit
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">6.</span>
                Performs 24-hour post-calibration stability check
              </li>
            </ul>
          </div>
          <p className="text-green-400 text-sm italic">
            Result: All sensors calibrated within specification, maintaining pharmaceutical compliance and preventing costly vaccine loss due to temperature excursions.
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
              <h3 className="font-semibold text-white mb-2">How do I know if my calibration is accurate enough?</h3>
              <p className="text-white text-sm">
                Your reference standard should be at least 4 times more accurate than the device under test (4:1 ratio). Check the uncertainty values on your reference standard's calibration certificate against the required accuracy of the instrument being calibrated.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What should I do if the device fails calibration?</h3>
              <p className="text-white text-sm">
                Document the as-found readings, attempt adjustment if possible, then re-test. If still out of specification, quarantine the device with a "DO NOT USE" label, inform the responsible person, and arrange repair or replacement. Never return a failed device to service.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Can I calibrate live equipment without isolation?</h3>
              <p className="text-white text-sm">
                In some cases, live calibration may be necessary for critical systems that cannot be taken offline. This requires a specific risk assessment, use of appropriate live working procedures, and often a second competent person present. Never attempt live calibration without proper authorisation and procedures.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Why do I need ascending AND descending readings?</h3>
              <p className="text-white text-sm">
                Taking both ascending and descending readings reveals hysteresis - the difference in readings depending on the direction of approach. Hysteresis indicates mechanical friction, backlash, or electronic lag in the device and is an important quality indicator.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question="For pressure device calibration, what points should be tested at minimum for multi-point verification?"
            options={[
              "Just 0% and 100% of range",
              "0%, 25%, 50%, 75%, and 100% of range with ascending and descending readings",
              "Only the mid-point (50%)",
              "Whatever points are convenient"
            ]}
            correctAnswer={1}
            explanation="Multi-point verification should test at 0%, 25%, 50%, 75%, and 100% of range, performing both ascending and descending readings. This allows calculation of hysteresis (difference between up/down readings) and linearity errors across the full range."
          />
        </section>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <Link to="/upskilling/instrumentation-module-6-section-2" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-11 touch-manipulation border-border hover:bg-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-6-section-4" className="w-full sm:w-auto">
            <Button className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section3;
