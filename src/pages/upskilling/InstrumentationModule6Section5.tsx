import { ArrowLeft, ArrowRight, Calendar, Book, AlertTriangle, CheckCircle2, FileText, Shield, Clock, Target, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InstrumentationModule6Section5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-6">
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
              <Calendar className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Calibration Intervals, Certificates, and UKAS Traceability
                </h1>
                <p className="text-xl text-gray-400">
                  Module 6, Section 5
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                18 minutes
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
                Explore how often calibration should happen, how it's certified, and what 
                traceability looks like in practice. Proper calibration scheduling and 
                documentation are essential for maintaining measurement accuracy and regulatory compliance.
              </p>
              <p>
                This section covers the strategic aspects of calibration management, including 
                how to establish effective calibration intervals, interpret calibration certificates, 
                and maintain UKAS traceability throughout your organisation.
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
                  <span>Define calibration intervals and understand different scheduling approaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interpret calibration certificates and understand their essential components</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand UKAS traceability requirements and their practical implications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Calibration Intervals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                Calibration Intervals and Scheduling Approaches
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Types of Calibration Scheduling</h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Time-Based Schedules</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Fixed Intervals:</strong> 6, 12, 24 months</li>
                    <li>• <strong>Advantages:</strong> Predictable, easy to manage</li>
                    <li>• <strong>Disadvantages:</strong> May be too frequent or infrequent</li>
                    <li>• <strong>Best For:</strong> Stable environments, routine operations</li>
                    <li>• <strong>Example:</strong> Office equipment, standard test meters</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Usage-Based Schedules</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Operating Hours:</strong> Every 1000 hours of use</li>
                    <li>• <strong>Measurement Count:</strong> After 10,000 readings</li>
                    <li>• <strong>Advantages:</strong> Matches actual wear and tear</li>
                    <li>• <strong>Disadvantages:</strong> Requires usage monitoring</li>
                    <li>• <strong>Example:</strong> Production line instruments</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Risk-Based Schedules</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Critical Instruments:</strong> More frequent calibration</li>
                    <li>• <strong>Historical Data:</strong> Based on drift patterns</li>
                    <li>• <strong>Process Impact:</strong> Consequence of measurement error</li>
                    <li>• <strong>Advantages:</strong> Optimised resource allocation</li>
                    <li>• <strong>Example:</strong> Safety-critical sensors</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-yellow-400 font-semibold mb-3 mt-6">Factors Affecting Calibration Frequency</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Environmental Factors</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Temperature variations and cycling</li>
                    <li>• Humidity and moisture exposure</li>
                    <li>• Vibration and mechanical stress</li>
                    <li>• Electromagnetic interference</li>
                    <li>• Corrosive atmospheres</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Operational Factors</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Frequency of use and duty cycle</li>
                    <li>• Handling and transportation</li>
                    <li>• Process stability requirements</li>
                    <li>• Regulatory compliance needs</li>
                    <li>• Cost of calibration vs. risk</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calibration Certificates */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Calibration Certificate Contents and Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Essential Certificate Components</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Identification Information</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Unique Certificate ID:</strong> Traceable reference number</li>
                    <li>• <strong>Device Information:</strong> Make, model, serial number</li>
                    <li>• <strong>Customer Details:</strong> Company name and address</li>
                    <li>• <strong>Calibration Date:</strong> When calibration was performed</li>
                    <li>• <strong>Issue Date:</strong> When certificate was issued</li>
                    <li>• <strong>Validity Period:</strong> Recommended recalibration date</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Technical Data</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Measurement Results:</strong> Before and after readings</li>
                    <li>• <strong>Measurement Uncertainty:</strong> ±uncertainty values</li>
                    <li>• <strong>Environmental Conditions:</strong> Temperature, humidity</li>
                    <li>• <strong>Standards Used:</strong> Reference equipment details</li>
                    <li>• <strong>Traceability Chain:</strong> Link to national standards</li>
                    <li>• <strong>Pass/Fail Status:</strong> Conformity assessment</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Authorisation and Validity</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Technician Signature:</strong> Qualified person who performed calibration</li>
                    <li>• <strong>Supervisor Approval:</strong> Quality assurance signature</li>
                    <li>• <strong>Laboratory Accreditation:</strong> UKAS or equivalent accreditation mark</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Scope of Accreditation:</strong> What measurements are covered</li>
                    <li>• <strong>Limitations:</strong> Any restrictions on certificate use</li>
                    <li>• <strong>Contact Information:</strong> Laboratory details for queries</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* UKAS Traceability */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                UKAS Traceability and National Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding UKAS Role</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">What is UKAS?</h5>
                  <p>
                    The United Kingdom Accreditation Service (UKAS) is the national accreditation body 
                    for the UK. It provides accreditation for testing, inspection, calibration, and 
                    certification services to international standards.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Traceability Chain</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>National Physical Laboratory (NPL):</strong> UK's national measurement institute</li>
                    <li>• <strong>Primary Standards:</strong> Maintained by NPL, traceable to SI units</li>
                    <li>• <strong>Secondary Standards:</strong> UKAS-accredited calibration laboratories</li>
                    <li>• <strong>Working Standards:</strong> Used by laboratories for routine calibration</li>
                    <li>• <strong>User Instruments:</strong> Field instruments calibrated by working standards</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Benefits of UKAS Accreditation</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>International Recognition:</strong> Mutual recognition agreements worldwide</li>
                    <li>• <strong>Regulatory Acceptance:</strong> Accepted by UK and EU regulators</li>
                    <li>• <strong>Quality Assurance:</strong> Regular assessment of laboratory competence</li>
                    <li>• <strong>Technical Credibility:</strong> Demonstrates measurement capability</li>
                    <li>• <strong>Risk Reduction:</strong> Reduces measurement-related risks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* When to Recalibrate */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                When Recalibration is Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Immediate Recalibration Triggers</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Physical Damage:</strong> Dropped, damaged, or exposed to extremes</li>
                    <li>• <strong>Unusual Readings:</strong> Unexpected or inconsistent results</li>
                    <li>• <strong>Failed Checks:</strong> Performance verification failures</li>
                    <li>• <strong>Overrange Events:</strong> Measurements beyond specified limits</li>
                    <li>• <strong>Repair or Modification:</strong> After any internal work</li>
                    <li>• <strong>Suspected Contamination:</strong> Exposure to harmful substances</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Regulatory and Compliance Triggers</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Regulation Updates:</strong> New regulatory requirements</li>
                    <li>• <strong>Audit Findings:</strong> Non-conformances identified</li>
                    <li>• <strong>Standard Changes:</strong> Updated calibration procedures</li>
                    <li>• <strong>Process Changes:</strong> New applications or requirements</li>
                    <li>• <strong>Quality Issues:</strong> Product failures linked to measurements</li>
                    <li>• <strong>Customer Requirements:</strong> Specific calibration demands</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Site-Wide Calibration Program */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Creating a Site-Wide Calibration Program
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Program Development Steps</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">1. Instrument Inventory</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Complete survey of all measuring equipment</li>
                      <li>• Assign unique identification numbers</li>
                      <li>• Document location and application</li>
                      <li>• Record manufacturer specifications</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">2. Risk Assessment</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Identify critical measurement points</li>
                      <li>• Assess impact of measurement errors</li>
                      <li>• Determine required accuracy levels</li>
                      <li>• Classify instruments by importance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">3. Interval Determination</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Apply manufacturer recommendations</li>
                      <li>• Consider operating conditions</li>
                      <li>• Review historical performance data</li>
                      <li>• Balance risk with cost considerations</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">4. Supplier Selection</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Verify UKAS accreditation</li>
                      <li>• Check scope of accreditation coverage</li>
                      <li>• Evaluate technical competence</li>
                      <li>• Consider location and logistics</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">5. Documentation System</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Calibration database or software</li>
                      <li>• Automated scheduling and reminders</li>
                      <li>• Certificate storage and retrieval</li>
                      <li>• Audit trail maintenance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">6. Continuous Improvement</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Monitor calibration results trends</li>
                      <li>• Adjust intervals based on performance</li>
                      <li>• Regular program review and updates</li>
                      <li>• Cost-benefit analysis</li>
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
                Factory Uses Vibration-Prone Equipment
              </p>
              <p>
                A manufacturing facility produces precision components using CNC machines that operate 
                24/7 in a high-vibration environment. The quality control department uses various 
                measuring instruments that are subject to mechanical stress and vibration.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Challenge Identified:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Standard 12-month calibration intervals proving insufficient</li>
                  <li>• Dimensional measuring tools showing significant drift</li>
                  <li>• Customer complaints about product tolerance variations</li>
                  <li>• Quality audit findings highlighting measurement inconsistencies</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Solution Implemented:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Reduced calibration intervals to 6 months for critical instruments</li>
                  <li>• Implemented monthly performance verification checks</li>
                  <li>• Added vibration isolation mounts for sensitive equipment</li>
                  <li>• Established trend monitoring to track instrument stability</li>
                  <li>• Created risk-based calibration matrix for different instrument types</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: 90% reduction in quality-related customer complaints and improved 
                process capability indices across all critical dimensions.
              </p>
            </CardContent>
          </Card>

          {/* Knowledge Check */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <p className="font-semibold mb-2">1. What affects how often calibration is needed?</p>
                  <p className="text-sm text-gray-400">
                    Answer: Environmental conditions (temperature, vibration, humidity), usage frequency, 
                    instrument stability, regulatory requirements, and the criticality of measurements.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <p className="font-semibold mb-2">2. What's included in a calibration certificate?</p>
                  <p className="text-sm text-gray-400">
                    Answer: Unique certificate ID, device identification, measurement results, 
                    measurement uncertainty, traceability chain, environmental conditions, 
                    and authorised signatures.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <p className="font-semibold mb-2">3. What does UKAS traceability ensure?</p>
                  <p className="text-sm text-gray-400">
                    Answer: An unbroken chain of measurements linking field instruments to 
                    national standards maintained by NPL, ensuring measurement accuracy and 
                    international recognition.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <p className="font-semibold mb-2">4. When should recalibration happen?</p>
                  <p className="text-sm text-gray-400">
                    Answer: After damage, unusual readings, failed checks, repairs, regulation 
                    updates, audit findings, or when scheduled intervals are reached.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <p className="font-semibold mb-2">5. Why create a site-wide calibration program?</p>
                  <p className="text-sm text-gray-400">
                    Answer: To ensure consistent measurement quality, regulatory compliance, 
                    optimised costs, reduced risks, and systematic management of all measuring equipment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Effective calibration programs ensure continuous reliability through proper scheduling, 
                comprehensive documentation, and maintained traceability. Risk-based approaches optimise 
                resources whilst maintaining measurement integrity and regulatory compliance.
              </p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-6-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-6-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
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

export default InstrumentationModule6Section5;