import { ArrowLeft, ArrowRight, Shield, CheckCircle2, Book, Brain, Calendar, Wrench, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule8Section4 = () => {
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
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Preventive Maintenance Routines
                </h1>
                <p className="text-xl text-gray-400">
                  Module 8, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 8.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                25 minutes
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
                Preventive maintenance reduces breakdowns, improves safety, and extends the life 
                of instrumentation systems. A well-structured preventive maintenance programme 
                identifies potential problems before they cause costly failures or safety incidents.
              </p>
              <p>
                Regular maintenance activities not only keep systems running smoothly but also 
                provide valuable data about equipment performance trends, helping to optimise 
                replacement schedules and improve overall plant reliability.
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
                  <span>Define what's included in preventive maintenance (PM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn how to create a basic PM checklist</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise high-risk areas that need regular checks</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Preventive Maintenance Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Essential PM Tasks for Instrumentation Systems</h4>
              
              <div className="space-y-4">
                <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Clean Sensors and Inspect for Physical Damage</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Cleaning Procedures</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Process Sensors:</strong> Remove buildup without damaging sensitive elements</li>
                        <li>• <strong>Temperature Sensors:</strong> Check for corrosion and scale formation</li>
                        <li>• <strong>Pressure Sensors:</strong> Clear impulse lines and drain ports</li>
                        <li>• <strong>Flow Sensors:</strong> Inspect for debris and alignment issues</li>
                        <li>• <strong>Level Sensors:</strong> Clean sensing elements and check mounting</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Physical Inspection</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Housing Integrity:</strong> Cracks, corrosion, or deformation</li>
                        <li>• <strong>Cable Entry Points:</strong> Seal integrity and cable strain relief</li>
                        <li>• <strong>Mounting Hardware:</strong> Bolts, brackets, and support structures</li>
                        <li>• <strong>Process Connections:</strong> Leaks, thread damage, gasket condition</li>
                        <li>• <strong>Display Windows:</strong> Clarity and damage assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                  <h5 className="text-green-400 font-semibold mb-2">Verify Cable Terminations and Grounding</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Cable Termination Checks</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Terminal Tightness:</strong> Check for loose connections</li>
                        <li>• <strong>Wire Condition:</strong> Inspect for fraying, nicks, or oxidation</li>
                        <li>• <strong>Terminal Corrosion:</strong> Clean and protect connection points</li>
                        <li>• <strong>Cable Strain Relief:</strong> Verify proper support and clamping</li>
                        <li>• <strong>Labelling:</strong> Update cable identification tags</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Grounding System</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Earth Continuity:</strong> Test ground path resistance</li>
                        <li>• <strong>Shield Connections:</strong> Verify single-point grounding</li>
                        <li>• <strong>Ground Rod Condition:</strong> Check for corrosion or damage</li>
                        <li>• <strong>Bonding Connections:</strong> Ensure all equipment is properly bonded</li>
                        <li>• <strong>Ground Loop Prevention:</strong> Verify proper shield termination</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Confirm Calibration Dates and Reschedule if Needed</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Calibration Management</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Certificate Review:</strong> Check validity dates and scope</li>
                        <li>• <strong>Due Date Tracking:</strong> Update calibration scheduling system</li>
                        <li>• <strong>Performance Verification:</strong> Spot checks against reference standards</li>
                        <li>• <strong>Drift Assessment:</strong> Compare current readings to calibration data</li>
                        <li>• <strong>Documentation Update:</strong> Record calibration status and findings</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Calibration Frequency</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Critical Applications:</strong> Every 6 months</li>
                        <li>• <strong>Standard Process:</strong> Annual calibration</li>
                        <li>• <strong>Non-Critical Monitoring:</strong> Bi-annual calibration</li>
                        <li>• <strong>Environmental Factors:</strong> Adjust frequency based on conditions</li>
                        <li>• <strong>Regulatory Requirements:</strong> Follow industry-specific mandates</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                  <h5 className="text-purple-400 font-semibold mb-2">Check Logs for Drifting Trends</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Historical Data Analysis:</strong> Review long-term performance trends</li>
                    <li>• <strong>Alarm Frequency:</strong> Track high/low alarm occurrences</li>
                    <li>• <strong>Maintenance History:</strong> Correlate repairs with performance issues</li>
                    <li>• <strong>Environmental Correlation:</strong> Link drift to seasonal or process changes</li>
                    <li>• <strong>Predictive Indicators:</strong> Identify early warning signs of failure</li>
                  </ul>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                  <h5 className="text-orange-400 font-semibold mb-2">Inspect Junction Boxes, Enclosures, and Seals</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Enclosure Inspection</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Seal Integrity:</strong> Check gaskets and O-rings</li>
                        <li>• <strong>Moisture Ingress:</strong> Look for water damage or condensation</li>
                        <li>• <strong>Corrosion Assessment:</strong> Metal degradation and treatment needs</li>
                        <li>• <strong>Ventilation:</strong> Ensure proper airflow where required</li>
                        <li>• <strong>Security:</strong> Verify locks and access control</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Environmental Protection</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>IP Rating Verification:</strong> Confirm protection level maintained</li>
                        <li>• <strong>Cable Gland Inspection:</strong> Check for proper sealing</li>
                        <li>• <strong>Drain Plug Function:</strong> Ensure condensation drainage</li>
                        <li>• <strong>Heating Elements:</strong> Test anti-condensation heaters</li>
                        <li>• <strong>Desiccant Packs:</strong> Replace moisture absorbers as needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PM Checklist */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Basic PM Checklist Template
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Instrumentation Preventive Maintenance Checklist</h4>
              
              <div className="bg-card p-4 rounded border border-gray-600">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Monthly Tasks</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Visual inspection of field devices</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Check alarm log for unusual activity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Inspect junction box seals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Review trending data for drift</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">Quarterly Tasks</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Clean sensor elements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Test ground system continuity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Verify cable termination tightness</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Update calibration schedule</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">Annual Tasks</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Complete calibration verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Insulation resistance testing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Replace desiccant packs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Comprehensive performance review</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">High-Risk Areas</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm">Hazardous area certifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm">Safety instrumented systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm">Critical process measurements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm">Emergency shutdown systems</span>
                      </div>
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
                Routine Maintenance Reveals Hidden Corrosion
              </p>
              <p>
                During a routine quarterly inspection, a technician discovers early signs of 
                corrosion on a field transmitter cable gland. The proactive maintenance 
                approach prevents a costly signal failure and potential safety incident.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Discovery Process:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Visual Inspection:</strong> White crystalline deposits noticed around cable entry</li>
                  <li>• <strong>Further Investigation:</strong> Removed cable gland to inspect internal condition</li>
                  <li>• <strong>Root Cause:</strong> Damaged seal allowed moisture ingress over time</li>
                  <li>• <strong>Immediate Action:</strong> Replaced gland and upgraded to better seal material</li>
                  <li>• <strong>Prevention:</strong> Added similar transmitters to enhanced inspection schedule</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Result:</h5>
                <p className="text-sm">
                  The proactive maintenance approach caught the problem before signal degradation 
                  occurred. This prevented an estimated £15,000 in production losses and avoided 
                  a potential safety incident. The cost of the replacement gland and labour was 
                  less than £200, demonstrating the value of systematic preventive maintenance.
                </p>
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
                Preventive maintenance is about spotting issues before they become faults. 
                It's cheaper, safer, and smarter. A systematic approach to PM not only extends 
                equipment life but also provides valuable performance data that helps optimise 
                maintenance schedules and improve overall system reliability.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What's the main goal of preventive maintenance?",
                options: [
                  "To keep technicians busy",
                  "To identify and address potential problems before they cause failures, reducing downtime and costs",
                  "To replace all equipment regularly",
                  "To satisfy management requirements"
                ],
                correctAnswer: 1,
                explanation: "The main goal of preventive maintenance is to identify and address potential problems before they cause failures, thereby reducing downtime, costs, and safety risks."
              },
              {
                id: 2,
                question: "Name two items you'd check during a PM inspection.",
                options: [
                  "Only calibration certificates",
                  "Cable termination tightness and junction box seal integrity",
                  "Just the sensor readings",
                  "Only the documentation"
                ],
                correctAnswer: 1,
                explanation: "During PM inspections, you should check cable termination tightness to prevent loose connections and junction box seal integrity to prevent moisture ingress."
              },
              {
                id: 3,
                question: "Why are cable glands important to inspect?",
                options: [
                  "They're expensive to replace",
                  "They prevent moisture ingress which can cause corrosion, signal degradation, and system failures",
                  "They look nice when clean",
                  "They're easy to check"
                ],
                correctAnswer: 1,
                explanation: "Cable glands are critical sealing points that prevent moisture ingress. Failed glands allow water into enclosures, causing corrosion, signal degradation, and potential system failures."
              },
              {
                id: 4,
                question: "How can PM prevent calibration errors?",
                options: [
                  "By replacing all sensors annually",
                  "By tracking calibration dates, monitoring drift trends, and scheduling timely recalibration",
                  "By never calibrating anything",
                  "By using only digital instruments"
                ],
                correctAnswer: 1,
                explanation: "PM prevents calibration errors by tracking calibration due dates, monitoring performance trends for drift, and ensuring timely recalibration before accuracy degrades."
              },
              {
                id: 5,
                question: "What's a good tool for scheduling PM tasks?",
                options: [
                  "Paper notebooks only",
                  "CMMS (Computerized Maintenance Management System) or electronic scheduling systems",
                  "Memory alone",
                  "Random scheduling"
                ],
                correctAnswer: 1,
                explanation: "A CMMS or electronic scheduling system provides automated reminders, tracks maintenance history, manages resources, and ensures consistent execution of PM activities."
              }
            ]}
            title="Section 4 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-8-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-9">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default InstrumentationModule8Section4;