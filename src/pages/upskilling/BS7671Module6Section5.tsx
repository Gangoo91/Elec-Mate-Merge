import { ArrowLeft, ArrowRight, FileX, Book, AlertTriangle, Target, Search, HelpCircle, ChevronDown, ChevronRight, CheckCircle, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BS7671Module6Section5Quiz from '@/components/upskilling/quiz/BS7671Module6Section5Quiz';

const BS7671Module6Section5 = () => {
  const [expandedCheck, setExpandedCheck] = useState<number | null>(null);

  const inlineChecks = [
    {
      question: "What are the most common types of certification errors that occur during electrical inspections?",
      answer: "Common errors include incorrect circuit descriptions, wrong protective device ratings, incomplete testing records, missing observations, incorrect earthing arrangements documentation, and failure to record limitations. These errors can invalidate certificates and create legal liability for the certifying electrician."
    },
    {
      question: "How should certification errors be corrected once identified?",
      answer: "Errors must be corrected through formal amendment procedures, including issuing correction notices, updating all relevant documentation, re-testing if necessary, and notifying all relevant parties. The original certificate should never be altered - corrections must be traceable and documented."
    },
    {
      question: "What quality assurance procedures help prevent certification errors?",
      answer: "Effective QA includes peer reviews, standardised checklists, systematic verification procedures, proper training programs, regular competency assessments, and comprehensive documentation systems. Independent verification of critical measurements and calculations is essential."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileX className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Certification Errors and Quality Control
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Module 6, Section 5
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Certification errors can have serious legal and safety consequences, potentially invalidating insurance 
                coverage and creating liability for electricians. Professional quality control procedures are essential 
                to prevent errors, ensure compliance with BS 7671, and maintain industry standards. This section 
                examines common certification errors, prevention strategies, and correction procedures that protect 
                both clients and electrical professionals.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify common types of certification errors and their causes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Implement quality control procedures to prevent errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply systematic error correction and amendment procedures</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand legal implications and professional responsibilities</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Section 1 - Common Certification Errors */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">1. Common Certification Errors</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Understanding Error Categories and Prevention
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Impact of Certification Errors
                </h4>
                <p className="text-sm mb-3">
                  Certification errors can invalidate electrical certificates, void insurance coverage, create legal 
                  liability, and compromise safety. Professional electricians must understand error types and 
                  implement robust prevention systems.
                </p>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm font-semibold text-white">
                    "Every certification error represents a failure in professional standards and quality control"
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <FileX className="h-5 w-5" />
                    Technical Documentation Errors
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Circuit Description Errors</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Incorrect circuit identification:</strong> Wrong circuit numbers or descriptions</li>
                        <li>• <strong>Missing circuit information:</strong> Incomplete or omitted circuit details</li>
                        <li>• <strong>Load capacity errors:</strong> Incorrect design current calculations</li>
                        <li>• <strong>Cable specification mistakes:</strong> Wrong cable types or sizes recorded</li>
                        <li>• <strong>Installation method errors:</strong> Incorrect reference methods documented</li>
                        <li>• <strong>Route description problems:</strong> Inaccurate cable route information</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Protective Device Errors</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Type designation mistakes:</strong> Wrong MCB/RCBO type curves recorded</li>
                        <li>• <strong>Rating discrepancies:</strong> Incorrect current ratings documented</li>
                        <li>• <strong>RCD specification errors:</strong> Wrong sensitivity or type recorded</li>
                        <li>• <strong>Breaking capacity omissions:</strong> Missing or incorrect kA ratings</li>
                        <li>• <strong>Discrimination errors:</strong> Incorrect selectivity assessments</li>
                        <li>• <strong>Special device mistakes:</strong> AFDD, SPD documentation errors</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Test Result and Measurement Errors</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Measurement Recording</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Transcription errors from instruments</li>
                        <li>• Unit conversion mistakes (mΩ/Ω)</li>
                        <li>• Decimal point placement errors</li>
                        <li>• Rounding errors in calculations</li>
                        <li>• Missing or incomplete readings</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Test Sequence Issues</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Tests performed out of sequence</li>
                        <li>• Missing mandatory tests</li>
                        <li>• Inappropriate test methods used</li>
                        <li>• Incorrect test voltages applied</li>
                        <li>• Inadequate test duration</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Result Assessment</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Incorrect pass/fail determinations</li>
                        <li>• Wrong acceptance criteria applied</li>
                        <li>• Misinterpretation of borderline results</li>
                        <li>• Failure to identify deterioration</li>
                        <li>• Inadequate result comparison</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card 
                className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
                onClick={() => setExpandedCheck(expandedCheck === 0 ? null : 0)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-yellow-400" />
                      Interactive Check: Common Error Types
                    </div>
                    {expandedCheck === 0 ? 
                      <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                      <ChevronRight className="h-4 w-4 text-yellow-400" />
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-white mb-3">{inlineChecks[0].question}</p>
                  {expandedCheck === 0 && (
                    <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                      <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                      <p className="text-sm text-white">{inlineChecks[0].answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Content Section 2 - Error Prevention and Quality Control */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">2. Error Prevention and Quality Control Systems</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Systematic Approaches to Error Prevention
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Pre-Certification Quality Checks
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Documentation Review Process</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Design verification:</strong> Confirm installation matches approved designs</li>
                        <li>• <strong>Material compliance:</strong> Verify all components meet specifications</li>
                        <li>• <strong>Installation standards:</strong> Check compliance with BS 7671 requirements</li>
                        <li>• <strong>Test planning:</strong> Prepare comprehensive test schedules</li>
                        <li>• <strong>Resource allocation:</strong> Ensure adequate time and equipment</li>
                        <li>• <strong>Competency verification:</strong> Confirm tester qualifications</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Systematic Inspection Protocols</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Structured checklists:</strong> Use comprehensive inspection forms</li>
                        <li>• <strong>Photographic evidence:</strong> Document critical installation aspects</li>
                        <li>• <strong>Progressive verification:</strong> Check work at each stage</li>
                        <li>• <strong>Independent reviews:</strong> Secondary inspector verification</li>
                        <li>• <strong>Client communication:</strong> Regular progress updates</li>
                        <li>• <strong>Issue tracking:</strong> Document and resolve problems promptly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Testing Quality Assurance Procedures</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Equipment Management</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Regular calibration schedules</li>
                        <li>• Pre-use equipment checks</li>
                        <li>• Backup instrument availability</li>
                        <li>• Accuracy verification procedures</li>
                        <li>• Environmental compensation</li>
                        <li>• Maintenance record keeping</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Test Execution Standards</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Standardised test procedures</li>
                        <li>• Double-checking critical readings</li>
                        <li>• Real-time result validation</li>
                        <li>• Immediate anomaly investigation</li>
                        <li>• Consistent test conditions</li>
                        <li>• Proper safety protocols</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Result Verification</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Mathematical calculation checks</li>
                        <li>• Trend analysis comparison</li>
                        <li>• Acceptance criteria verification</li>
                        <li>• Peer review of critical results</li>
                        <li>• Client explanation procedures</li>
                        <li>• Corrective action protocols</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-md border border-green-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Comprehensive QA Framework Implementation</h4>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Organisational Level</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Company quality management systems</li>
                          <li>• Standard operating procedures development</li>
                          <li>• Regular training program implementation</li>
                          <li>• Performance monitoring and feedback</li>
                          <li>• Continuous improvement processes</li>
                          <li>• Client satisfaction measurement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Individual Level</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Personal competency development</li>
                          <li>• Self-assessment and reflection</li>
                          <li>• Professional development planning</li>
                          <li>• Industry knowledge updating</li>
                          <li>• Peer learning and collaboration</li>
                          <li>• Error analysis and learning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card 
                className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
                onClick={() => setExpandedCheck(expandedCheck === 2 ? null : 2)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-yellow-400" />
                      Interactive Check: Quality Assurance
                    </div>
                    {expandedCheck === 2 ? 
                      <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                      <ChevronRight className="h-4 w-4 text-yellow-400" />
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-white mb-3">{inlineChecks[2].question}</p>
                  {expandedCheck === 2 && (
                    <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                      <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                      <p className="text-sm text-white">{inlineChecks[2].answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Content Section 3 - Error Correction and Amendment Procedures */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">3. Error Correction and Amendment Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Professional Error Resolution Protocols
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Formal Correction Procedures
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Immediate Response Protocol</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Error identification:</strong> Acknowledge and document the error immediately</li>
                        <li>• <strong>Risk assessment:</strong> Evaluate safety implications and urgency</li>
                        <li>• <strong>Client notification:</strong> Inform affected parties within 24 hours</li>
                        <li>• <strong>Work cessation:</strong> Stop related activities if safety is compromised</li>
                        <li>• <strong>Evidence preservation:</strong> Document error circumstances thoroughly</li>
                        <li>• <strong>Professional consultation:</strong> Seek expert advice for complex errors</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Documentation Amendment Process</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Correction notices:</strong> Issue formal written amendments</li>
                        <li>• <strong>Traceability maintenance:</strong> Keep original documents with corrections</li>
                        <li>• <strong>Version control:</strong> Implement clear document versioning</li>
                        <li>• <strong>Distribution management:</strong> Ensure all parties receive corrections</li>
                        <li>• <strong>Verification records:</strong> Document correction verification process</li>
                        <li>• <strong>Audit trails:</strong> Maintain complete correction history</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Re-testing and Verification Requirements</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Test Result Corrections</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Re-perform affected tests completely</li>
                        <li>• Use calibrated equipment verification</li>
                        <li>• Independent witness testing</li>
                        <li>• Multiple reading confirmation</li>
                        <li>• Environmental condition recording</li>
                        <li>• Result comparison analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Circuit Description Updates</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Physical circuit verification</li>
                        <li>• Load identification confirmation</li>
                        <li>• Cable route re-examination</li>
                        <li>• Protective device re-assessment</li>
                        <li>• Installation method verification</li>
                        <li>• Cross-reference checking</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Compliance Re-assessment</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Regulation compliance review</li>
                        <li>• Design standard verification</li>
                        <li>• Safety requirement checking</li>
                        <li>• Code compliance confirmation</li>
                        <li>• Industry standard alignment</li>
                        <li>• Best practice implementation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Section 4 - Legal Implications and Professional Responsibility */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">4. Legal Implications and Professional Responsibility</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Understanding Liability and Professional Obligations
              </p>

              <div className="space-y-6">
                <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Legal Liability Framework
                  </h4>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Criminal Liability</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Health and Safety at Work Act 1974</li>
                          <li>• Corporate Manslaughter Act 2007</li>
                          <li>• Regulatory Reform Order 2005</li>
                          <li>• Construction (Design and Management) Regulations</li>
                          <li>• Electricity at Work Regulations 1989</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Civil Liability</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Negligence claims and damages</li>
                          <li>• Breach of contract actions</li>
                          <li>• Professional indemnity claims</li>
                          <li>• Product liability issues</li>
                          <li>• Third-party compensation claims</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Professional Insurance and Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Insurance Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Professional indemnity insurance minimums</li>
                        <li>• Public liability coverage requirements</li>
                        <li>• Employer liability obligations</li>
                        <li>• Product liability protection</li>
                        <li>• Cyber liability considerations</li>
                        <li>• Legal expenses insurance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Risk Mitigation Strategies</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Comprehensive documentation protocols</li>
                        <li>• Client communication procedures</li>
                        <li>• Quality management systems</li>
                        <li>• Continuing professional development</li>
                        <li>• Regular competency assessment</li>
                        <li>• Industry standard compliance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Competent Person Scheme Responsibilities</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-white">
                      Membership of competent person schemes brings additional responsibilities and oversight, 
                      including regular assessment, continuing professional development, and adherence to 
                      scheme-specific quality standards.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">NICEIC Requirements</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Annual assessment visits</li>
                          <li>• Technical knowledge updates</li>
                          <li>• Quality assurance standards</li>
                          <li>• Complaint resolution procedures</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">NAPIT Obligations</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Competency maintenance</li>
                          <li>• Work quality monitoring</li>
                          <li>• Professional development</li>
                          <li>• Standards compliance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Other Schemes</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Scheme-specific requirements</li>
                          <li>• Regular re-assessment</li>
                          <li>• Quality system maintenance</li>
                          <li>• Professional standards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Case Study */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Case Study: Major Certification Error and Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Details</h4>
                <p className="text-sm mb-2">
                  <strong>Location:</strong> Multi-storey office building, Manchester - complete electrical refurbishment
                </p>
                <p className="text-sm mb-2">
                  <strong>Value:</strong> £180,000 electrical contract with 45 distribution boards
                </p>
                <p className="text-sm mb-2">
                  <strong>Error:</strong> Major certification errors discovered during client handover
                </p>
                <p className="text-sm">
                  <strong>Impact:</strong> Contract delays, insurance issues, and professional reputation damage
                </p>
              </div>

              <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Certification Errors Identified</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Technical Errors</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Circuit descriptions:</strong> 60% incorrectly documented</li>
                      <li>• <strong>Protective device ratings:</strong> Multiple transcription errors</li>
                      <li>• <strong>Test results:</strong> Earth loop impedance values transposed</li>
                      <li>• <strong>RCD testing:</strong> Wrong sensitivity ratings recorded</li>
                      <li>• <strong>Cable specifications:</strong> Incorrect sizes documented</li>
                      <li>• <strong>Installation methods:</strong> Wrong reference methods</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Administrative Errors</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Missing limitations:</strong> Access restrictions not recorded</li>
                      <li>• <strong>Incomplete schedules:</strong> Several circuits omitted</li>
                      <li>• <strong>Wrong certificate types:</strong> EIC used instead of EICR</li>
                      <li>• <strong>Missing signatures:</strong> Incomplete certification chain</li>
                      <li>• <strong>Date inconsistencies:</strong> Test dates before installation</li>
                      <li>• <strong>Regulatory references:</strong> Outdated BS 7671 edition cited</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Check 2 */}
          <Card 
            className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
            onClick={() => setExpandedCheck(expandedCheck === 1 ? null : 1)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-yellow-400" />
                  Interactive Check: Error Correction
                </div>
                {expandedCheck === 1 ? 
                  <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                  <ChevronRight className="h-4 w-4 text-yellow-400" />
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-white mb-3">{inlineChecks[1].question}</p>
              {expandedCheck === 1 && (
                <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                  <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                  <p className="text-sm text-white">{inlineChecks[1].answer}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <BS7671Module6Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-6-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-6-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module6Section5;