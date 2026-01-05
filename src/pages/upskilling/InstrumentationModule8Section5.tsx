import { ArrowLeft, ArrowRight, FileText, CheckCircle2, Book, Brain, Camera, Archive, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule8Section5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Documenting Faults and Generating Service Reports
                </h1>
                <p className="text-xl text-gray-400">
                  Module 8, Section 5
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 8.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
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
                Good fault documentation supports future diagnostics, proves compliance, and 
                creates a knowledge base. This section explains how to write effective service 
                reports that not only record what happened but also provide valuable insights 
                for future maintenance and system improvements.
              </p>
              <p>
                Professional documentation transforms individual fault-finding experiences into 
                organisational knowledge, helping teams learn from past issues and develop 
                more effective troubleshooting strategies over time.
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
                  <span>Know what should be included in a fault report</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn the value of clear, professional documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Link documentation to maintenance and compliance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Archive className="h-5 w-5 text-yellow-400" />
                Essential Elements of Service Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Complete Documentation Framework</h4>
              
              <div className="space-y-4">
                <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Fault Description, Device ID, Date/Time, and Technician Name</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Basic Information</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Device Tag:</strong> Unique identifier (e.g., PT-101A)</li>
                        <li>• <strong>Location:</strong> Plant area and specific installation point</li>
                        <li>• <strong>Date & Time:</strong> When fault was discovered and resolved</li>
                        <li>• <strong>Technician:</strong> Name and certification level</li>
                        <li>• <strong>Work Order:</strong> Reference number for tracking</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Fault Description</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Symptoms:</strong> Exact behaviour observed</li>
                        <li>• <strong>Duration:</strong> How long the fault existed</li>
                        <li>• <strong>Frequency:</strong> Intermittent or continuous</li>
                        <li>• <strong>Impact:</strong> Effect on process operations</li>
                        <li>• <strong>Discovery Method:</strong> How fault was detected</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                  <h5 className="text-green-400 font-semibold mb-2">Readings Before and After Fix</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Pre-Repair Measurements</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Signal Values:</strong> Current loop readings (mA)</li>
                        <li>• <strong>Displayed Values:</strong> Controller indications</li>
                        <li>• <strong>Voltage Measurements:</strong> Power supply and signal levels</li>
                        <li>• <strong>Resistance Values:</strong> Loop and insulation resistance</li>
                        <li>• <strong>Environmental Data:</strong> Temperature, humidity conditions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Post-Repair Verification</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Corrected Readings:</strong> Normal operational values</li>
                        <li>• <strong>Calibration Data:</strong> Reference standard comparisons</li>
                        <li>• <strong>Functional Tests:</strong> Response to process changes</li>
                        <li>• <strong>Alarm Testing:</strong> High/low setpoint verification</li>
                        <li>• <strong>Performance Metrics:</strong> Accuracy and repeatability</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Actions Taken (Replaced, Re-terminated, Cleaned, etc.)</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Repair Actions</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Component replacements</li>
                        <li>• Calibration adjustments</li>
                        <li>• Connection repairs</li>
                        <li>• Cleaning procedures</li>
                        <li>• Software updates</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Parts Used</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Part numbers and quantities</li>
                        <li>• Manufacturer details</li>
                        <li>• Serial numbers</li>
                        <li>• Warranty information</li>
                        <li>• Cost tracking</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Tools & Equipment</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Test equipment used</li>
                        <li>• Calibration standards</li>
                        <li>• Safety equipment</li>
                        <li>• Special tools required</li>
                        <li>• Time spent on repair</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                  <h5 className="text-purple-400 font-semibold mb-2">Attach Photos Where Possible</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Visual Documentation</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Fault Evidence:</strong> Damaged components or connections</li>
                        <li>• <strong>Before/After:</strong> Comparison photos of repairs</li>
                        <li>• <strong>Installation Details:</strong> Wiring configurations</li>
                        <li>• <strong>Test Results:</strong> Meter readings and displays</li>
                        <li>• <strong>Environmental Factors:</strong> Corrosion, moisture, debris</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Supporting Documents</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Test Certificates:</strong> Calibration and performance data</li>
                        <li>• <strong>Wiring Diagrams:</strong> As-built drawings</li>
                        <li>• <strong>Trend Data:</strong> Historical performance graphs</li>
                        <li>• <strong>Manufacturer Data:</strong> Technical specifications</li>
                        <li>• <strong>Safety Documentation:</strong> Permits and risk assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                  <h5 className="text-orange-400 font-semibold mb-2">Use Templates to Ensure Consistency</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Standardised Format:</strong> Consistent information capture across technicians</li>
                    <li>• <strong>Mandatory Fields:</strong> Ensure critical information is always recorded</li>
                    <li>• <strong>Quality Control:</strong> Reviewable format for supervision</li>
                    <li>• <strong>Database Integration:</strong> Compatible with maintenance management systems</li>
                    <li>• <strong>Regulatory Compliance:</strong> Meets industry and safety standards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Template */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-yellow-400" />
                Service Report Template
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Professional Documentation Template</h4>
              
              <div className="bg-card p-3 md:p-4 rounded border border-gray-600 font-mono text-xs md:text-sm overflow-x-auto">
                <div className="space-y-3 min-w-[300px]">
                  <div className="border-b border-gray-600 pb-2">
                    <h5 className="text-white font-bold mb-2 text-sm md:text-base">INSTRUMENTATION FAULT REPORT</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      <div className="text-xs md:text-sm">Work Order: _____________</div>
                      <div className="text-xs md:text-sm">Date: _______________</div>
                      <div className="text-xs md:text-sm">Technician: _____________</div>
                      <div className="text-xs md:text-sm">Time: _______________</div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-yellow-400 font-semibold mb-1 text-xs md:text-sm">DEVICE INFORMATION</h6>
                    <div className="ml-1 md:ml-2 space-y-1">
                      <div className="text-xs break-all">Tag Number: _________ Location: _________</div>
                      <div className="text-xs break-all">Description: _________________________</div>
                      <div className="text-xs break-all">Manufacturer/Model: ___________________</div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-yellow-400 font-semibold mb-1 text-xs md:text-sm">FAULT DESCRIPTION</h6>
                    <div className="ml-1 md:ml-2 space-y-1">
                      <div className="text-xs break-all">Symptoms: ___________________________</div>
                      <div className="text-xs break-all">Discovery Method: ____________________</div>
                      <div className="text-xs break-all">Process Impact: ______________________</div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-yellow-400 font-semibold mb-1 text-xs md:text-sm">MEASUREMENTS</h6>
                    <div className="ml-1 md:ml-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      <div className="text-xs">Before Repair: ____________</div>
                      <div className="text-xs">After Repair: _____________</div>
                      <div className="text-xs">Expected Value: __________</div>
                      <div className="text-xs">Tolerance: _______________</div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-yellow-400 font-semibold mb-1 text-xs md:text-sm">ACTIONS TAKEN</h6>
                    <div className="ml-1 md:ml-2 space-y-1">
                      <div className="text-xs flex flex-wrap gap-1">
                        <span>□ Calibrated</span>
                        <span>□ Cleaned</span>
                        <span>□ Replaced</span>
                        <span>□ Repaired</span>
                        <span>□ Adjusted</span>
                      </div>
                      <div className="text-xs break-all">Details: ____________________________</div>
                      <div className="text-xs break-all">Parts Used: _________________________</div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-yellow-400 font-semibold mb-1 text-xs md:text-sm">VERIFICATION & SIGN-OFF</h6>
                    <div className="ml-1 md:ml-2 space-y-1">
                      <div className="text-xs flex flex-wrap gap-1">
                        <span>□ Functional Test</span>
                        <span>□ Calibration Check</span>
                        <span>□ Alarm Test</span>
                      </div>
                      <div className="text-xs break-all">Technician Signature: _______ Date: ___</div>
                      <div className="text-xs break-all">Supervisor Review: ________ Date: ___</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Recurring Moisture Issue Revealed Through Documentation
              </p>
              <p>
                After several unexplained faults across different systems, the maintenance team 
                reviews past service logs and discovers a recurring moisture issue affecting 
                multiple assets, prompting a systematic design upgrade.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Pattern Discovery:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Documentation Review:</strong> Analysis of 6 months of service reports</li>
                  <li>• <strong>Common Thread:</strong> Moisture-related failures in similar locations</li>
                  <li>• <strong>Environmental Factor:</strong> Poor drainage around junction boxes</li>
                  <li>• <strong>Cost Analysis:</strong> £12,000 in reactive repairs over 6 months</li>
                  <li>• <strong>Solution:</strong> Upgraded IP rating and improved drainage design</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Result:</h5>
                <p className="text-sm">
                  The systematic documentation allowed the team to identify a design weakness 
                  that wasn't obvious from individual failures. The £8,000 upgrade investment 
                  eliminated future moisture-related failures, saving an estimated £24,000 
                  annually in maintenance costs and preventing production disruptions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Benefits of Professional Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Immediate Benefits</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Faster diagnosis of similar faults</li>
                    <li>• Proof of work completed</li>
                    <li>• Warranty claim support</li>
                    <li>• Quality assurance verification</li>
                    <li>• Training material for new staff</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Long-term Value</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Reliability trend analysis</li>
                    <li>• Maintenance optimisation</li>
                    <li>• Design improvement guidance</li>
                    <li>• Regulatory compliance evidence</li>
                    <li>• Asset lifecycle management</li>
                  </ul>
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
                Clear documentation turns faults into learning opportunities — and protects 
                against repeated failure. Professional service reports create valuable 
                organisational knowledge that improves troubleshooting efficiency, supports 
                compliance requirements, and enables data-driven maintenance decisions.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "Why are before-and-after readings useful in reports?",
                options: [
                  "They look professional",
                  "They prove the fault existed and verify the repair was successful",
                  "They're required by law",
                  "They increase the cost of service"
                ],
                correctAnswer: 1,
                explanation: "Before-and-after readings provide evidence that a fault existed and demonstrate that the repair was successful, creating accountability and verification of work quality."
              },
              {
                id: 2,
                question: "What should every service report include?",
                options: [
                  "Only the final result",
                  "Device ID, date/time, technician name, fault description, actions taken, and verification results",
                  "Just the part numbers used",
                  "Only photos of the equipment"
                ],
                correctAnswer: 1,
                explanation: "Every service report should include device identification, timestamps, technician details, fault description, actions taken, and verification results to ensure complete documentation."
              },
              {
                id: 3,
                question: "How can reports help identify trends?",
                options: [
                  "They can't help with trends",
                  "By reviewing multiple reports over time to spot recurring patterns, common failure modes, and environmental factors",
                  "Only if they're very detailed",
                  "By comparing costs only"
                ],
                correctAnswer: 1,
                explanation: "Reviewing multiple reports over time reveals patterns like recurring failure modes, environmental factors, or design weaknesses that aren't apparent from individual incidents."
              },
              {
                id: 4,
                question: "What's the benefit of using a template?",
                options: [
                  "It looks more professional",
                  "It ensures consistent information capture, mandatory fields completion, and standardised format across all technicians",
                  "It's faster to complete",
                  "It reduces paper usage"
                ],
                correctAnswer: 1,
                explanation: "Templates ensure consistent information capture across all technicians, guarantee mandatory fields are completed, and create standardised formats that support quality control and database integration."
              },
              {
                id: 5,
                question: "Why attach photos or test data?",
                options: [
                  "To make reports longer",
                  "To provide visual evidence of faults, document repair quality, and support future diagnostics with actual measurements",
                  "Because cameras are expensive",
                  "To impress management"
                ],
                correctAnswer: 1,
                explanation: "Photos and test data provide visual evidence of faults, document repair quality, support warranty claims, and give future technicians actual measurements and visual references for similar problems."
              }
            ]}
            title="Section 5 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-8-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-8-section-6">
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

export default InstrumentationModule8Section5;