import { ArrowLeft, Calendar, CheckCircle, HelpCircle, Clock, FileText, Shield, Target, Settings, AlertTriangle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule6Section5 = () => {
  useSEO({
    title: "Calibration Intervals, Certificates, and UKAS Traceability | Instrumentation Module 6",
    description: "Learn about calibration scheduling approaches, certificate interpretation, UKAS traceability requirements, and building effective calibration programmes.",
    keywords: ["calibration intervals", "UKAS traceability", "calibration certificates", "calibration scheduling", "NPL", "calibration programme"]
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
            <Calendar className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Calibration Intervals, Certificates, and UKAS Traceability
          </h1>
          <p className="text-white">
            Module 6 · Section 5 · 18 min read
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
              Different approaches to calibration scheduling (time-based, usage-based, risk-based)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              How to interpret calibration certificates and their essential components
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              UKAS traceability requirements and their practical implications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Building an effective site-wide calibration programme
            </li>
          </ul>
        </div>

        {/* Section 01 - Calibration Intervals */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Calibration Interval Approaches</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Calibration intervals determine how often instruments are recalibrated. There is no single "correct" interval - the right approach depends on the instrument, its application, environmental conditions, and regulatory requirements.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Time-Based
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Fixed intervals: 6, 12, or 24 months
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Predictable and easy to manage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    May be too frequent or infrequent
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Best for stable environments
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Usage-Based
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Every 1000 operating hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    After 10,000 measurements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Matches actual wear and tear
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Requires usage monitoring
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-400" />
                  Risk-Based
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Critical instruments: more frequent
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Based on drift patterns and history
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Considers consequence of error
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    Optimised resource allocation
                  </li>
                </ul>
              </div>
            </div>

            {/* Factors Affecting Frequency */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3">Factors Affecting Calibration Frequency</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2 text-sm">Environmental Factors</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Temperature variations and cycling
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Humidity and moisture exposure
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Vibration and mechanical stress
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Electromagnetic interference
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Corrosive atmospheres
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2 text-sm">Operational Factors</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Frequency of use and duty cycle
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Handling and transportation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Process stability requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Regulatory compliance needs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Cost of calibration vs. risk
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What approach should you use for a safety-critical pressure sensor that directly affects product quality?"
          answer="Risk-based scheduling with more frequent calibration intervals. Safety-critical instruments require shorter intervals because the consequence of measurement error is high. You would also implement interim verification checks between calibrations."
        />

        {/* Section 02 - Calibration Certificate Interpretation */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Calibration Certificate Interpretation</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Understanding how to read and interpret calibration certificates is essential for verifying that calibration was performed correctly and meets your requirements. A certificate is only useful if you know what to look for.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Identification Information
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Unique Certificate ID:</strong> Traceable reference number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Device Information:</strong> Make, model, serial number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Calibration Date:</strong> When performed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Issue Date:</strong> When certificate issued
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Recommended Recalibration:</strong> Suggested due date
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  Technical Data
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Measurement Results:</strong> Actual readings obtained
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Measurement Uncertainty:</strong> ±values at each point
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Environmental Conditions:</strong> Temperature, humidity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Standards Used:</strong> Reference equipment details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Traceability Statement:</strong> Link to national standards
                  </li>
                </ul>
              </div>
            </div>

            {/* Key Things to Check */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Key Things to Check on a Certificate
              </h3>
              <ul className="text-white text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">1.</span>
                  Does the serial number match your instrument?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">2.</span>
                  Is the laboratory UKAS accredited for this type of calibration?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">3.</span>
                  Is the measurement uncertainty acceptable for your application?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">4.</span>
                  Do the results show the instrument is within specification?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">5.</span>
                  Is the certificate properly signed and dated?
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 - UKAS Traceability */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">UKAS Traceability and National Standards</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              UKAS (United Kingdom Accreditation Service) is the UK's national accreditation body. UKAS accreditation demonstrates that a laboratory is competent to perform specific calibrations and that results are traceable to national standards.
            </p>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                The Traceability Chain
              </h3>
              <div className="space-y-3">
                <div className="bg-elec-yellow/20 border border-elec-yellow/40 rounded-lg p-3">
                  <h4 className="font-semibold text-elec-yellow text-sm">National Physical Laboratory (NPL)</h4>
                  <p className="text-white text-sm mt-1">
                    UK's national measurement institute. Maintains primary standards directly linked to SI units (International System of Units).
                  </p>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-3 ml-4">
                  <h4 className="font-semibold text-purple-400 text-sm">UKAS-Accredited Laboratories</h4>
                  <p className="text-white text-sm mt-1">
                    Secondary standards calibrated by NPL. Provide accredited calibration services with documented uncertainty and traceability.
                  </p>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 ml-8">
                  <h4 className="font-semibold text-blue-400 text-sm">Working Standards</h4>
                  <p className="text-white text-sm mt-1">
                    Used by industry for day-to-day calibration. Calibrated against secondary standards from UKAS laboratories.
                  </p>
                </div>

                <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 ml-12">
                  <h4 className="font-semibold text-green-400 text-sm">Your Instruments</h4>
                  <p className="text-white text-sm mt-1">
                    Field instruments calibrated against working standards. Complete the traceability chain back to SI units.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits of UKAS */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3">Benefits of UKAS Accreditation</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    International recognition through MRA agreements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Accepted by UK and international regulators
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Regular assessment of laboratory competence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Demonstrates technical credibility
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Reduces measurement-related risks
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3">When UKAS is Required</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Regulatory compliance requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    ISO 9001/ISO 17025 audits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Customer contract specifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Safety-critical applications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    Legal or liability considerations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What does UKAS accreditation guarantee about a calibration certificate?"
          answer="UKAS accreditation guarantees that the laboratory has been independently assessed as competent to perform that specific type of calibration, that their results are traceable to national standards (NPL), and that they operate to ISO/IEC 17025 requirements. It does not guarantee the instrument is accurate - only that the calibration was performed competently."
        />

        {/* Section 04 - When to Recalibrate */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">When Recalibration is Required</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Beyond scheduled intervals, certain events should trigger immediate recalibration. Recognising these triggers prevents the use of potentially inaccurate instruments.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Immediate Recalibration Triggers
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Physical Damage:</strong> Dropped, impacted, or exposed to extremes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Unusual Readings:</strong> Unexpected or inconsistent results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Failed Verification:</strong> Performance check failures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Overrange Events:</strong> Measurements beyond limits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>After Repair:</strong> Any internal modification or repair
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Contamination:</strong> Exposure to harmful substances
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-400" />
                  Compliance Triggers
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Regulation Updates:</strong> New regulatory requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Audit Findings:</strong> Non-conformances identified
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Standard Changes:</strong> Updated calibration procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Process Changes:</strong> New application requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Quality Issues:</strong> Product failures linked to measurement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Customer Requirements:</strong> Specific calibration demands
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05 - Building a Calibration Programme */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Building a Site-Wide Calibration Programme</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              An effective calibration programme ensures all measuring equipment is properly managed, calibrated at appropriate intervals, and maintains traceability. Here are the key steps to develop one.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">1. Instrument Inventory</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Complete survey of all measuring equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Assign unique identification numbers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Document location and application
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Record manufacturer specifications
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">2. Risk Assessment</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Identify critical measurement points
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Assess impact of measurement errors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Determine required accuracy levels
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Classify instruments by importance
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">3. Interval Determination</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Apply manufacturer recommendations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Consider operating conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Review historical performance data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Balance risk with cost
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">4. Supplier Selection</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Verify UKAS accreditation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Check scope of accreditation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Evaluate technical competence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Consider location and turnaround time
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">5. Documentation System</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Calibration database or software
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Automated scheduling and reminders
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Certificate storage and retrieval
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Audit trail maintenance
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-elec-yellow mb-2 text-sm">6. Continuous Improvement</h3>
                <ul className="space-y-1 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Monitor calibration result trends
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Adjust intervals based on performance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Regular programme review
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Cost-benefit analysis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why is a complete instrument inventory the first step in building a calibration programme?"
          answer="You cannot manage what you do not know exists. A complete inventory ensures every measuring instrument is identified, tracked, and included in the calibration schedule. Missing instruments from the inventory leads to uncalibrated equipment being used, risking measurement errors and audit failures."
        />

        {/* Real World Scenario */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4 mb-10 mt-10">
          <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Real World Scenario: High-Vibration Manufacturing Environment
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A precision component manufacturer operates CNC machines 24/7 in a high-vibration environment. Quality control instruments were showing significant drift at standard 12-month intervals, leading to customer complaints about tolerance variations.
          </p>
          <div className="bg-card/50 rounded-lg p-3 border border-border mb-3">
            <h4 className="font-medium text-elec-yellow text-sm mb-2">Solution Implemented:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">1.</span>
                Reduced intervals to 6 months for critical instruments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">2.</span>
                Implemented monthly performance verification checks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">3.</span>
                Added vibration isolation mounts for sensitive equipment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">4.</span>
                Established trend monitoring to track stability
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">5.</span>
                Created risk-based calibration matrix by instrument type
              </li>
            </ul>
          </div>
          <p className="text-green-400 text-sm italic">
            Result: 90% reduction in quality-related customer complaints and improved process capability indices across all critical dimensions.
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
              <h3 className="font-semibold text-white mb-2">Can I extend calibration intervals to save money?</h3>
              <p className="text-white text-sm">
                Yes, but only with justification. You need historical data showing the instrument remains stable over the current interval. Track as-found readings over several calibration cycles - if consistently within tolerance, you may justify extending intervals. Document your rationale and get management approval.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Is UKAS calibration always required?</h3>
              <p className="text-white text-sm">
                Not always. UKAS calibration is required when regulations mandate it, customers specify it, or for safety-critical applications. For non-critical measurements, calibration by a competent person using traceable standards may be acceptable. Check your specific regulatory and customer requirements.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What if my instrument is out of calibration when due?</h3>
              <p className="text-white text-sm">
                An overdue instrument should not be used for measurements until recalibrated. Quarantine it with a clear label. Review any measurements made since it was due - you may need to assess the impact on product quality and potentially recall or re-test products measured during the overdue period.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">How do I verify my calibration supplier is competent?</h3>
              <p className="text-white text-sm">
                Check their UKAS accreditation schedule online at the UKAS website. Verify the specific measurements you need are within their scope of accreditation. Ask for sample certificates and check they include all required information. Consider performing a supplier audit if calibration is critical to your quality system.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question="Which approach to calibration scheduling is most appropriate for a rarely-used but safety-critical instrument?"
            options={[
              "Usage-based - calibrate after every 1000 uses",
              "Time-based - standard 12-month interval",
              "Risk-based - more frequent calibration despite low usage due to safety criticality",
              "No calibration needed if rarely used"
            ]}
            correctAnswer={2}
            explanation="Risk-based scheduling is most appropriate. Even though usage is low, the safety-critical nature means the consequence of measurement error is high. Risk-based scheduling considers the impact of failure, not just usage, ensuring adequate calibration frequency to maintain safety regardless of how often the instrument is used."
          />
        </section>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <Link to="/electrician/upskilling/instrumentation-module-6-section-4" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-11 touch-manipulation border-border hover:bg-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/electrician/upskilling/instrumentation-module-6-section-6" className="w-full sm:w-auto">
            <Button className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section5;
