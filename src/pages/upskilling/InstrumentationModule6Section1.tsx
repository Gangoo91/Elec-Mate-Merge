import { ArrowLeft, Zap, CheckCircle, HelpCircle, Target, Scale, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule6Section1 = () => {
  useSEO({
    title: "What Is Calibration and Why It's Important | Instrumentation Module 6",
    description: "Understand the definition, purpose, and critical importance of calibration for accuracy, safety, and regulatory compliance."
  });

  return (
    <div className="bg-background text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-6" className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module 6
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          What Is Calibration and Why It's Important
        </h1>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Quick Summary
          </h2>
          <p className="text-white/80 text-sm">
            Calibration is the backbone of accurate instrumentation. It establishes the relationship
            between instrument readings and actual values, ensuring measurement accuracy, safety,
            and regulatory compliance across all industrial applications.
          </p>
        </div>

        {/* Section 01 - Definition of Calibration */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Definition of Calibration</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Formal Definition</h3>
                <p className="text-white/80 text-sm">
                  Calibration is the comparison of measurement values delivered by a device under test (DUT)
                  with those of a calibration standard of known accuracy under specified conditions. It
                  establishes the relationship between the instrument indication and the quantity being measured.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Key Components of Calibration</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Device Under Test (DUT):</strong> The instrument being calibrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Reference Standard:</strong> Known accurate measurement device</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Comparison Process:</strong> Systematic measurement comparison</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Documentation:</strong> Recording of results and adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Uncertainty Assessment:</strong> Quantifying measurement confidence</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Calibration vs Adjustment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Calibration:</p>
                  <p className="text-white/70 text-xs">Determining the relationship between measured and actual values. Documents what the instrument reads versus the true value.</p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Adjustment:</p>
                  <p className="text-white/70 text-xs">Bringing the instrument's response within acceptable limits. Physically modifying the instrument to improve accuracy.</p>
                </div>
              </div>
              <p className="text-elec-yellow text-xs mt-3 font-medium">Important: Calibration does not always require adjustment!</p>
            </div>
          </div>
        </div>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="What is the formal definition of calibration?"
          correctAnswer="Comparison of measurement values from a device under test with those of a calibration standard of known accuracy"
          explanation="Calibration specifically involves comparing the DUT readings against a traceable reference standard to establish measurement accuracy and determine uncertainty."
        />

        {/* Section 02 - Purpose and Importance */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Purpose and Critical Importance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Why Calibration Matters</h3>
                <p className="text-white/80 text-sm">
                  Without proper calibration, even sophisticated instruments can provide misleading data,
                  leading to costly errors, safety risks, and regulatory non-compliance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Accuracy and Precision</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Ensures measurement accuracy</li>
                  <li>Maintains instrument precision</li>
                  <li>Reduces measurement uncertainty</li>
                  <li>Provides confidence in readings</li>
                  <li>Enables reliable data analysis</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Safety and Reliability</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Prevents safety incidents</li>
                  <li>Protects personnel and equipment</li>
                  <li>Ensures process stability</li>
                  <li>Reduces downtime risks</li>
                  <li>Maintains system integrity</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Compliance and Quality</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Meets regulatory requirements</li>
                  <li>Supports quality assurance</li>
                  <li>Enables certification</li>
                  <li>Maintains accreditation</li>
                  <li>Demonstrates due diligence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="What are the three main categories of benefits from proper calibration?"
          correctAnswer="Accuracy and precision, safety and reliability, and compliance and quality"
          explanation="Calibration provides measurement accuracy, ensures safe reliable operation, and meets regulatory compliance requirements - all essential for industrial operations."
        />

        {/* Section 03 - Consequences of Inadequate Calibration */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Consequences of Inadequate Calibration</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">What Can Go Wrong</h3>
                <p className="text-white/80 text-sm">
                  Inadequate calibration practices lead to measurement drift, undetected errors,
                  and potentially catastrophic failures in safety-critical systems.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2">Safety Risks</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Incorrect pressure readings causing equipment failure</li>
                  <li>Temperature sensors causing overheating or underheating</li>
                  <li>Flow measurement errors affecting safety systems</li>
                  <li>Gas detection failures in hazardous environments</li>
                  <li>Process control malfunctions</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">Financial Impact</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Product quality issues and waste</li>
                  <li>Regulatory fines and penalties</li>
                  <li>Insurance claim rejections</li>
                  <li>Lost production time</li>
                  <li>Increased energy consumption</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h4 className="font-medium text-yellow-300 mb-2">Regulatory Consequences</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Failed regulatory audits</li>
                  <li>Loss of certifications</li>
                  <li>Legal liability issues</li>
                  <li>Shutdown orders</li>
                  <li>Reputation damage</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white/80 mb-2">Operational Issues</h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Inconsistent product quality</li>
                  <li>Process optimisation difficulties</li>
                  <li>Maintenance scheduling problems</li>
                  <li>Data integrity concerns</li>
                  <li>Customer confidence loss</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 04 - Industries Where Calibration is Critical */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Industries Where Calibration is Critical</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-2">Sector-Specific Requirements</h3>
                <p className="text-white/80 text-sm">
                  Different industries have varying calibration requirements based on safety criticality,
                  regulatory frameworks, and quality standards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white font-medium text-sm mb-1">Manufacturing</p>
                <ul className="text-white/70 text-xs space-y-0.5">
                  <li>Automotive production</li>
                  <li>Electronics manufacturing</li>
                  <li>Precision machining</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white font-medium text-sm mb-1">Healthcare</p>
                <ul className="text-white/70 text-xs space-y-0.5">
                  <li>Medical devices</li>
                  <li>Laboratory equipment</li>
                  <li>Patient monitoring</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white font-medium text-sm mb-1">Energy and Utilities</p>
                <ul className="text-white/70 text-xs space-y-0.5">
                  <li>Power generation</li>
                  <li>Gas distribution</li>
                  <li>Nuclear facilities</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white font-medium text-sm mb-1">Pharmaceutical</p>
                <ul className="text-white/70 text-xs space-y-0.5">
                  <li>Process control</li>
                  <li>Product formulation</li>
                  <li>Environmental monitoring</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white font-medium text-sm mb-1">Aerospace and Defence</p>
                <ul className="text-white/70 text-xs space-y-0.5">
                  <li>Aircraft systems</li>
                  <li>Navigation equipment</li>
                  <li>Testing laboratories</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white font-medium text-sm mb-1">Food and Beverage</p>
                <ul className="text-white/70 text-xs space-y-0.5">
                  <li>Temperature monitoring</li>
                  <li>pH measurement</li>
                  <li>Weight verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="What is the difference between calibration and adjustment?"
          correctAnswer="Calibration determines the relationship between measured and actual values; adjustment brings the instrument's response within acceptable limits"
          explanation="Calibration is a documentation process while adjustment is a physical correction. Calibration does not always require adjustment - sometimes documenting the error is sufficient."
        />

        {/* Section 05 - Calibration in Maintenance Framework */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Calibration in the Maintenance Framework</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-purple-300 mb-3">Preventive Maintenance Integration</h4>
              <p className="text-white/80 text-sm mb-3">
                Calibration forms a critical component of preventive maintenance strategies, ensuring
                instruments maintain accuracy and reliability throughout their operational life.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium text-sm mb-2">Scheduled Calibration:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Time-based intervals</li>
                    <li>Usage-based triggers</li>
                    <li>Drift monitoring</li>
                    <li>Planned maintenance windows</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-2">Condition-Based Calibration:</p>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>Performance monitoring</li>
                    <li>Trend analysis</li>
                    <li>Predictive algorithms</li>
                    <li>Early warning systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenario */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-blue-300 mb-2">Real-World Scenario: Chemical Plant Pressure Sensor Failure</h4>
          <div className="space-y-3 text-white/80 text-sm">
            <div>
              <p className="text-white font-medium">Situation:</p>
              <p className="text-white/70 text-xs">A pressure sensor in a chemical plant reactor vessel had not been calibrated for 18 months. The sensor gradually drifted, reading 2.5 bar lower than actual pressure.</p>
            </div>
            <div>
              <p className="text-white font-medium">Consequences:</p>
              <ul className="text-white/70 text-xs list-disc list-inside">
                <li>Incorrect batch formulation resulting in 500kg of unusable product</li>
                <li>50,000 pounds direct cost for waste disposal and replacement materials</li>
                <li>12-hour production shutdown for system investigation</li>
                <li>Regulatory investigation by HSE due to safety concerns</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-medium">Lesson:</p>
              <p className="text-white/70 text-xs">This incident could have been prevented with proper calibration scheduling and drift monitoring. Regular calibration is essential for safe operation.</p>
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
              <h4 className="font-medium text-white mb-2">Does calibration always require adjustment?</h4>
              <p className="text-white/70 text-sm">
                No. Calibration determines the relationship between measured and actual values.
                If the instrument is within acceptable limits, no adjustment is needed - the
                calibration simply documents the current performance and any errors.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">How often should instruments be calibrated?</h4>
              <p className="text-white/70 text-sm">
                Calibration frequency depends on the instrument type, usage, environmental conditions,
                and regulatory requirements. Typical intervals range from monthly to annually, with
                more critical instruments requiring more frequent calibration.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What happens if calibration is neglected?</h4>
              <p className="text-white/70 text-sm">
                Neglected calibration leads to measurement drift, unreliable data, safety risks,
                regulatory non-compliance, and potential financial losses from product quality
                issues, equipment damage, or production shutdowns.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">What is the role of UKAS in calibration?</h4>
              <p className="text-white/70 text-sm">
                UKAS (United Kingdom Accreditation Service) is the national accreditation body that
                certifies calibration laboratories meet international standards. UKAS-accredited
                calibrations provide traceable, internationally recognised results.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <SingleQuestionQuiz
            question="Which consequence is NOT typically associated with inadequate calibration?"
            options={[
              "Safety incidents from incorrect readings",
              "Regulatory fines and penalties",
              "Increased equipment purchase costs",
              "Product quality issues and waste"
            ]}
            correctAnswer={2}
            explanation="Increased equipment purchase costs are not a direct consequence of inadequate calibration. The main consequences are safety risks, regulatory issues, product quality problems, and operational inefficiencies."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="/electrician/upskilling/instrumentation-module-6">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="../instrumentation-module-6-section-2">
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

export default InstrumentationModule6Section1;
