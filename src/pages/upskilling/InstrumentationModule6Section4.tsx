import { ArrowLeft, ArrowRight, FileText, Book, AlertTriangle, CheckCircle2, Database, Shield, Calendar, Users, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule6Section4 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Recording and Documenting Calibration Results
                </h1>
                <p className="text-xl text-gray-400">
                  Module 6, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                16 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                This section focuses on the proper documentation and audit readiness of calibration activities. 
                Comprehensive record-keeping is not optional—it's legal evidence of compliance, process integrity, 
                and quality assurance that protects both the organisation and its customers.
              </p>
              <p>
                Without proper documentation, even perfect calibration work becomes worthless in regulatory 
                audits, legal proceedings, or quality investigations.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand what must be recorded during calibration activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn proper documentation formats and requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Appreciate the value of record traceability and audit readiness</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Required Documentation Fields */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-yellow-400" />
                Essential Calibration Record Fields
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Critical Information That MUST Be Recorded</h4>
              <p className="text-sm mb-4">
                Missing any of these fields can invalidate calibration records and cause audit failures.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Device Identification</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Unique Device ID:</strong> Asset tag, serial number, or plant ID</li>
                      <li>• <strong>Manufacturer & Model:</strong> Make, model, and part number</li>
                      <li>• <strong>Location:</strong> Physical location or system designation</li>
                      <li>• <strong>Range & Units:</strong> Measurement range and engineering units</li>
                      <li>• <strong>Accuracy Class:</strong> Specified accuracy or tolerance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Calibration Details</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Calibration Date:</strong> Date and time of calibration</li>
                      <li>• <strong>Due Date:</strong> Next calibration due date</li>
                      <li>• <strong>Technician:</strong> Name and certification of technician</li>
                      <li>• <strong>Procedure:</strong> Reference to calibration procedure used</li>
                      <li>• <strong>Calibration Interval:</strong> Frequency of calibration</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Reference Standards Used</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Standard ID:</strong> Unique identifier of reference equipment</li>
                      <li>• <strong>Certificate Number:</strong> Calibration certificate reference</li>
                      <li>• <strong>Calibration Date:</strong> When standard was last calibrated</li>
                      <li>• <strong>Uncertainty:</strong> Measurement uncertainty of standard</li>
                      <li>• <strong>Traceability:</strong> Link to national/international standards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Results and Conditions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Pre-Calibration Results:</strong> Readings before adjustment</li>
                      <li>• <strong>Post-Calibration Results:</strong> Readings after adjustment</li>
                      <li>• <strong>Environmental Conditions:</strong> Temperature, humidity, pressure</li>
                      <li>• <strong>Adjustments Made:</strong> Description of any corrections</li>
                      <li>• <strong>Pass/Fail Status:</strong> Conformity to specifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calibration Certificate Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Calibration Certificate Format and Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Standard Certificate Components</h4>
              <p className="text-sm mb-4">
                Professional calibration certificates must contain specific information to be legally valid.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Certificate Header</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Company logo and accreditation marks</li>
                    <li>• Certificate title and unique number</li>
                    <li>• Issue date and page numbering</li>
                    <li>• Customer details and address</li>
                    <li>• "Calibration Certificate" clearly stated</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Technical Content</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Description of item calibrated</li>
                    <li>• Calibration results in tabular format</li>
                    <li>• Measurement uncertainty statement</li>
                    <li>• Traceability statement</li>
                    <li>• Environmental conditions during calibration</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Authorisation</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Technician signature and date</li>
                    <li>• Supervisor approval signature</li>
                    <li>• Accreditation body logo (if applicable)</li>
                    <li>• Validity statement</li>
                    <li>• Restriction clauses (if any)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Supporting Information</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Calibration procedure reference</li>
                    <li>• Standards used and their certificates</li>
                    <li>• Conformity assessment (pass/fail)</li>
                    <li>• Recommendations for use</li>
                    <li>• Next calibration due date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Electronic vs Paper Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Electronic Systems vs Paper-Based Records</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Electronic Calibration Management Systems</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold mb-1">Advantages</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Automated scheduling and reminders</li>
                        <li>• Searchable database of all records</li>
                        <li>• Automatic calculations and error checking</li>
                        <li>• Digital signatures and audit trails</li>
                        <li>• Integration with asset management systems</li>
                        <li>• Instant report generation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-1">Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 21 CFR Part 11 compliance (if FDA regulated)</li>
                        <li>• Regular data backup and recovery procedures</li>
                        <li>• User access controls and permissions</li>
                        <li>• System validation and qualification</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Paper-Based Record Systems</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold mb-1">When Still Used</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Field calibration in remote locations</li>
                        <li>• Backup to electronic systems</li>
                        <li>• Simple, low-volume operations</li>
                        <li>• Legal requirements for original signatures</li>
                        <li>• Emergency or contingency situations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-semibold mb-1">Best Practices</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Use permanent ink (no pencil or erasable pen)</li>
                        <li>• Cross through errors with single line</li>
                        <li>• Initial and date all corrections</li>
                        <li>• Sequential page numbering</li>
                        <li>• Controlled document distribution</li>
                        <li>• Secure storage and archiving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Compliance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Regulatory Compliance and Record Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">ISO/UKAS Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>ISO/IEC 17025:</strong> Testing and calibration laboratory competence</li>
                    <li>• <strong>Record Integrity:</strong> Protection against unauthorised changes</li>
                    <li>• <strong>Traceability:</strong> Unbroken chain to national standards</li>
                    <li>• <strong>Uncertainty:</strong> Documented measurement uncertainty</li>
                    <li>• <strong>Competency:</strong> Evidence of technician qualifications</li>
                    <li>• <strong>Equipment Records:</strong> Maintenance and calibration history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Industry-Specific Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Pharmaceutical:</strong> FDA 21 CFR Part 11, GMP guidelines</li>
                    <li>• <strong>Aerospace:</strong> AS9100, FAA regulations</li>
                    <li>• <strong>Medical Devices:</strong> ISO 13485, MDR compliance</li>
                    <li>• <strong>Automotive:</strong> ISO/TS 16949 quality requirements</li>
                    <li>• <strong>Nuclear:</strong> 10 CFR Part 50, Appendix B</li>
                    <li>• <strong>Food & Beverage:</strong> HACCP, FDA Food Safety</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Record Retention Periods</h4>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <h5 className="text-white font-semibold mb-1">General Industry</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Minimum: 3-5 years</li>
                      <li>• Recommended: 7 years</li>
                      <li>• Critical systems: 10+ years</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-1">Regulated Industries</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Pharmaceutical: 5-7 years</li>
                      <li>• Medical devices: 10+ years</li>
                      <li>• Nuclear: Life of facility</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-1">Legal Considerations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Product liability: 10+ years</li>
                      <li>• Insurance claims: As specified</li>
                      <li>• Litigation holds: Indefinite</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Tracking and Trend Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-400" />
                Error Tracking and Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 rounded-md border border-green-600/30">
                <h4 className="text-yellow-400 font-semibold mb-2">Why Track Calibration Trends?</h4>
                <p className="text-sm mb-3">
                  Systematic tracking of calibration results enables predictive maintenance, 
                  optimised calibration intervals, and early detection of instrument degradation.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-semibold text-sm mb-2">Key Metrics to Track</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Drift Rate:</strong> Change in accuracy over time</li>
                      <li>• <strong>Adjustment Frequency:</strong> How often adjustments are needed</li>
                      <li>• <strong>Pass/Fail Rates:</strong> Percentage meeting specifications</li>
                      <li>• <strong>Environmental Sensitivity:</strong> Performance vs conditions</li>
                      <li>• <strong>Stability Trends:</strong> Long-term performance patterns</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-semibold text-sm mb-2">Benefits of Trend Analysis</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Predictive Maintenance:</strong> Anticipate failures</li>
                      <li>• <strong>Interval Optimisation:</strong> Extend or reduce calibration frequency</li>
                      <li>• <strong>Cost Reduction:</strong> Avoid unnecessary calibrations</li>
                      <li>• <strong>Quality Improvement:</strong> Identify systematic issues</li>
                      <li>• <strong>Regulatory Demonstration:</strong> Prove control of processes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                ISO Audit Identifies Missing Calibration Log
              </p>
              <p>
                A manufacturing company undergoes an ISO 9001 surveillance audit. The auditor requests 
                calibration records for a critical pressure sensor used in product testing. The technician 
                cannot locate the calibration log for the previous 6 months.
              </p>
              <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                <h5 className="text-red-400 font-semibold text-sm mb-2">Immediate Consequences:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Major non-conformance raised against the quality system</li>
                  <li>• All products tested with that sensor in 6 months quarantined</li>
                  <li>• £75,000 worth of finished goods requiring re-testing</li>
                  <li>• Threat of ISO 9001 certificate suspension</li>
                  <li>• Customer notification and potential contract penalties</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Corrective Actions Implemented:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Immediate calibration of all instruments with electronic record system</li>
                  <li>• Implementation of automated calibration scheduling software</li>
                  <li>• Training program for all technicians on record-keeping requirements</li>
                  <li>• Monthly management review of calibration status</li>
                  <li>• Backup paper records for critical instruments</li>
                </ul>
              </div>
              <p className="text-sm italic text-yellow-400">
                Result: Company avoids certificate suspension but spends £150,000 on corrective actions 
                and lost production. This demonstrates why calibration records are not optional.
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Thorough records are not optional—they're proof of compliance, process integrity, 
                and quality assurance. Proper documentation protects organisations during audits, 
                enables trend analysis for continuous improvement, and provides legal evidence 
                of due diligence in calibration activities.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What information MUST be recorded for device identification in calibration records?",
                options: [
                  "Only the serial number",
                  "Unique Device ID, manufacturer & model, location, range & units, and accuracy class",
                  "Just the location",
                  "Only if it fails calibration"
                ],
                correctAnswer: 1,
                explanation: "Complete device identification requires unique ID, manufacturer/model details, physical location, measurement range/units, and specified accuracy class for proper traceability."
              },
              {
                id: 2,
                question: "Which is NOT a required component of a professional calibration certificate?",
                options: [
                  "Technician signature and date",
                  "Measurement uncertainty statement",
                  "Customer's bank details",
                  "Traceability statement"
                ],
                correctAnswer: 2,
                explanation: "Customer bank details are not part of calibration certificates. Required components include signatures, uncertainty statements, traceability statements, and technical measurement data."
              },
              {
                id: 3,
                question: "What is the main advantage of electronic calibration management systems?",
                options: [
                  "They cost less than paper systems",
                  "Automated scheduling, searchable databases, error checking, and audit trails",
                  "They eliminate the need for calibration",
                  "They work without electricity"
                ],
                correctAnswer: 1,
                explanation: "Electronic systems provide automated scheduling, searchable records, automatic calculations, digital signatures, audit trails, and integration capabilities that paper systems cannot offer."
              },
              {
                id: 4,
                question: "What is the minimum record retention period for general industry calibration records?",
                options: [
                  "1 year",
                  "2 years",
                  "3-5 years minimum, 7 years recommended",
                  "Forever"
                ],
                correctAnswer: 2,
                explanation: "General industry requires minimum 3-5 years retention, with 7 years recommended. Some regulated industries like pharmaceutical and nuclear require much longer periods."
              },
              {
                id: 5,
                question: "Why is 21 CFR Part 11 compliance important for some electronic calibration systems?",
                options: [
                  "It applies to all industries equally",
                  "It's required for FDA-regulated industries to ensure electronic record integrity",
                  "It's only for software companies",
                  "It reduces calibration costs"
                ],
                correctAnswer: 1,
                explanation: "21 CFR Part 11 is the FDA regulation governing electronic records and signatures in pharmaceutical, medical device, and other FDA-regulated industries, ensuring data integrity and security."
            }
            ]}
            title="Section 4 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-6-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section4;