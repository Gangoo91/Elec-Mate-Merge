import { ArrowLeft, FileText, CheckCircle, HelpCircle, Database, Shield, Calendar, Archive, AlertTriangle, TrendingUp, Monitor, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule6Section4 = () => {
  useSEO({
    title: "Recording and Documenting Calibration Results | Instrumentation Module 6",
    description: "Learn essential calibration documentation requirements, record-keeping best practices, and regulatory compliance for audit readiness.",
    keywords: ["calibration documentation", "calibration records", "audit compliance", "ISO 17025", "calibration certificates", "record retention"]
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Module 6</span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/20 mb-4">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Recording and Documenting Calibration Results
          </h1>
          <p className="text-white">
            Module 6 · Section 4 · 16 min read
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
              Essential fields that must be recorded during calibration
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Calibration certificate format and requirements
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Electronic vs paper-based record systems
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Regulatory compliance and record retention periods
            </li>
          </ul>
        </div>

        {/* Section 01 - Essential Record Fields */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Essential Calibration Record Fields</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Comprehensive record-keeping is not optional - it is legal evidence of compliance and quality assurance. Without proper documentation, even perfect calibration work becomes worthless in regulatory audits or legal proceedings.
            </p>

            {/* Critical Warning */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Critical Information
              </h3>
              <p className="text-white text-sm">
                Missing any of the required fields can invalidate calibration records and cause audit failures. Always ensure complete documentation before closing out any calibration activity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  Device Identification
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Unique Device ID:</strong> Asset tag, serial number, or plant ID
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Manufacturer and Model:</strong> Make, model, and part number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Location:</strong> Physical location or system designation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Range and Units:</strong> Measurement range and engineering units
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Accuracy Class:</strong> Specified accuracy or tolerance
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-400" />
                  Calibration Details
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Calibration Date:</strong> Date and time of calibration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Due Date:</strong> Next calibration due date
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Technician:</strong> Name and certification of technician
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Procedure:</strong> Reference to calibration procedure used
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Calibration Interval:</strong> Frequency of calibration
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Reference Standards Used
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Standard ID:</strong> Unique identifier of reference equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Certificate Number:</strong> Calibration certificate reference
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Calibration Date:</strong> When standard was last calibrated
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Uncertainty:</strong> Measurement uncertainty of standard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Traceability:</strong> Link to national/international standards
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-elec-yellow" />
                  Results and Conditions
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>As-Found Results:</strong> Readings before adjustment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>As-Left Results:</strong> Readings after adjustment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Environmental Conditions:</strong> Temperature, humidity, pressure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Adjustments Made:</strong> Description of any corrections
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Pass/Fail Status:</strong> Conformity to specifications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is the difference between 'as-found' and 'as-left' calibration results?"
          answer="As-found results are readings taken before any adjustments (showing the device's actual state in service). As-left results are readings after adjustment (showing what the device will measure going forward). Both must be recorded for traceability and to identify drift patterns."
        />

        {/* Section 02 - Calibration Certificate Requirements */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Calibration Certificate Format</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Professional calibration certificates must contain specific information to be legally valid and accepted by regulatory bodies. Understanding these requirements ensures your certificates will withstand audit scrutiny.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3">Certificate Header</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Company logo and accreditation marks (UKAS logo if applicable)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Certificate title and unique number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Issue date and page numbering (Page X of Y)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Customer details and address
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3">Technical Content</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Description of item calibrated (make, model, serial)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Calibration results in clear tabular format
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Measurement uncertainty statement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Environmental conditions during calibration
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3">Authorisation</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Technician signature and date
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Supervisor approval signature (if required)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Accreditation body logo and schedule number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Validity statement and restriction clauses
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3">Traceability Information</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Calibration procedure reference
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Standards used and their certificate numbers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Traceability statement to national standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Next calibration due date
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 - Electronic vs Paper Systems */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Electronic vs Paper-Based Systems</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Modern calibration management increasingly relies on electronic systems, but paper records still have their place. Understanding the advantages and requirements of each helps you choose the right approach.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-blue-400" />
                  Electronic Systems
                </h3>
                <div className="space-y-4 text-white text-sm">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Advantages</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Automated scheduling and reminders
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Searchable database of all records
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Automatic calculations and error checking
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Digital signatures and audit trails
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Instant report generation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Requirements</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        21 CFR Part 11 compliance (if FDA regulated)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Regular data backup and recovery
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        User access controls
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        System validation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Archive className="h-5 w-5 text-green-400" />
                  Paper-Based Systems
                </h3>
                <div className="space-y-4 text-white text-sm">
                  <div>
                    <h4 className="font-medium text-green-400 mb-1">When Still Used</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Field calibration in remote locations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Backup to electronic systems
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Simple, low-volume operations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Emergency or contingency situations
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-400 mb-1">Best Practices</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Use permanent ink only (no pencil)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Single-line corrections with initial/date
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Sequential page numbering
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Secure storage and archiving
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why must corrections on paper calibration records use a single line through the error?"
          answer="A single line allows the original entry to remain readable, proving no data has been hidden or destroyed. The correction must be initialled and dated to show who made the change and when, maintaining audit trail integrity."
        />

        {/* Section 04 - Regulatory Compliance */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Regulatory Compliance and Record Retention</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Different industries have specific regulatory requirements for calibration documentation. Understanding these requirements ensures your records will satisfy auditors and protect your organisation legally.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  ISO/UKAS Requirements
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>ISO/IEC 17025:</strong> Laboratory competence standard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Record Integrity:</strong> Protection against unauthorised changes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Traceability:</strong> Unbroken chain to national standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Uncertainty:</strong> Documented measurement uncertainty
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Competency:</strong> Evidence of technician qualifications
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Industry-Specific Requirements
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Pharmaceutical:</strong> FDA 21 CFR Part 11, GMP
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Aerospace:</strong> AS9100, FAA regulations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Medical Devices:</strong> ISO 13485, MDR
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Automotive:</strong> IATF 16949
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <strong>Food and Beverage:</strong> HACCP, BRCGS
                  </li>
                </ul>
              </div>
            </div>

            {/* Record Retention */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Archive className="h-5 w-5 text-elec-yellow" />
                Record Retention Periods
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2 text-sm">General Industry</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>Minimum: 3-5 years</li>
                    <li>Recommended: 7 years</li>
                    <li>Critical systems: 10+ years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2 text-sm">Regulated Industries</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>Pharmaceutical: 5-7 years</li>
                    <li>Medical devices: 10+ years</li>
                    <li>Nuclear: Life of facility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2 text-sm">Legal Considerations</h4>
                  <ul className="space-y-1 text-white text-sm">
                    <li>Product liability: 10+ years</li>
                    <li>Insurance claims: As specified</li>
                    <li>Litigation holds: Indefinite</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05 - Trend Analysis */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Error Tracking and Trend Analysis</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Systematic tracking of calibration results enables predictive maintenance, optimised calibration intervals, and early detection of instrument degradation. This transforms calibration from a compliance exercise into a valuable quality improvement tool.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Key Metrics to Track
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Drift Rate:</strong> Change in accuracy over time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Adjustment Frequency:</strong> How often corrections needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Pass/Fail Rates:</strong> Percentage meeting specifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Environmental Sensitivity:</strong> Performance vs conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Stability Trends:</strong> Long-term performance patterns
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Benefits of Trend Analysis
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Predictive Maintenance:</strong> Anticipate failures before they occur
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Interval Optimisation:</strong> Extend or reduce calibration frequency
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Cost Reduction:</strong> Avoid unnecessary calibrations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Quality Improvement:</strong> Identify systematic issues
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Regulatory Demonstration:</strong> Prove control of processes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="How can trend analysis help optimise calibration intervals?"
          answer="By tracking drift rate over multiple calibration cycles, you can identify instruments that remain stable longer than their current interval (allowing extension) or those that drift faster than expected (requiring shorter intervals). This data-driven approach reduces costs while maintaining quality."
        />

        {/* Real World Scenario */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4 mb-10 mt-10">
          <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Real World Scenario: ISO Audit Identifies Missing Records
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A manufacturing company undergoes an ISO 9001 surveillance audit. The auditor requests calibration records for a critical pressure sensor used in product testing. The technician cannot locate the calibration log for the previous 6 months.
          </p>
          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20 mb-3">
            <h4 className="font-medium text-red-400 text-sm mb-2">Immediate Consequences:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Major non-conformance raised against quality system
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                All products tested with that sensor quarantined (6 months production)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                75,000 GBP worth of finished goods requiring re-testing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Threat of ISO 9001 certificate suspension
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20 mb-3">
            <h4 className="font-medium text-green-400 text-sm mb-2">Corrective Actions Implemented:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Implementation of automated calibration scheduling software
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Training programme for all technicians on record-keeping
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Monthly management review of calibration status
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Backup paper records for critical instruments
              </li>
            </ul>
          </div>
          <p className="text-elec-yellow text-sm italic">
            Result: Company avoids certificate suspension but spends 150,000 GBP on corrective actions and lost production. This demonstrates why calibration records are not optional.
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
              <h3 className="font-semibold text-white mb-2">What is 21 CFR Part 11 and when does it apply?</h3>
              <p className="text-white text-sm">
                21 CFR Part 11 is the FDA regulation governing electronic records and electronic signatures in the United States. It applies to pharmaceutical, medical device, and other FDA-regulated industries. It requires audit trails, access controls, system validation, and secure electronic signatures for compliance.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Can I scan paper records and discard the originals?</h3>
              <p className="text-white text-sm">
                This depends on your regulatory requirements and company procedures. Some industries require retention of original paper records. If scanning is permitted, the process must be validated, and scanned images must be true representations of the originals. Always check specific regulatory requirements before discarding originals.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What happens if calibration records are lost or damaged?</h3>
              <p className="text-white text-sm">
                Lost records create a significant quality and compliance issue. You must document the loss, assess the impact on product quality, potentially re-test affected products, and implement corrective actions to prevent recurrence. In regulated industries, you may need to notify regulatory authorities depending on the severity.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">How detailed should calibration records be?</h3>
              <p className="text-white text-sm">
                Records should be detailed enough that another competent person could reproduce the calibration and understand exactly what was done. This includes all readings, environmental conditions, standards used, adjustments made, and any observations. When in doubt, record more detail rather than less.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question="What is the minimum recommended record retention period for general industry calibration records?"
            options={[
              "1 year",
              "2 years",
              "3-5 years minimum, 7 years recommended",
              "Indefinitely"
            ]}
            correctAnswer={2}
            explanation="General industry requires minimum 3-5 years retention, with 7 years recommended as best practice. However, regulated industries (pharmaceutical, medical devices, nuclear) often require much longer retention periods, sometimes for the life of the facility or product."
          />
        </section>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <Link to="/upskilling/instrumentation-module-6-section-3" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-11 touch-manipulation border-border hover:bg-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-6-section-5" className="w-full sm:w-auto">
            <Button className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section4;
