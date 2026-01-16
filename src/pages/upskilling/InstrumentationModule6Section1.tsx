import { ArrowLeft, ArrowRight, Target, Book, AlertTriangle, CheckCircle2, Scale, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule6Section1 = () => {
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
              <Target className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  What Is Calibration and Why It's Important
                </h1>
                <p className="text-xl text-gray-400">
                  Module 6, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                15 minutes
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
                Calibration is the backbone of accurate instrumentation and measurement in industrial settings. 
                Without proper calibration, even the most sophisticated instruments can provide misleading data, 
                leading to costly errors, safety risks, and regulatory non-compliance.
              </p>
              <p>
                This section establishes the foundation for understanding calibration by defining what it is, 
                why it's essential, and how it impacts every aspect of industrial operations.
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
                  <span>Define calibration in the context of instrumentation and measurement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand the critical importance of calibration for accuracy, safety, and compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise the consequences of inadequate calibration practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify where calibration fits within system maintenance and regulatory frameworks</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Definition of Calibration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-5 w-5 text-yellow-400" />
                Definition of Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Formal Definition</h4>
              <p className="mb-3">
                Calibration is the comparison of measurement values delivered by a device under test (DUT) 
                with those of a calibration standard of known accuracy under specified conditions.
              </p>
              <p className="mb-4">
                It establishes the relationship between the indication of a measuring instrument and the 
                value of the quantity being measured, determining the measurement uncertainty.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Key Components</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Device Under Test (DUT):</strong> The instrument being calibrated</li>
                    <li>• <strong>Reference Standard:</strong> Known accurate measurement device</li>
                    <li>• <strong>Comparison Process:</strong> Systematic measurement comparison</li>
                    <li>• <strong>Documentation:</strong> Recording of results and adjustments</li>
                    <li>• <strong>Uncertainty Assessment:</strong> Quantifying measurement confidence</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Calibration vs Adjustment</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Calibration:</strong> Determining the relationship between measured and actual values</p>
                    <p><strong>Adjustment:</strong> Bringing the instrument's response within acceptable limits</p>
                    <p className="text-yellow-400">Note: Calibration doesn't always require adjustment!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purpose and Importance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Purpose and Critical Importance</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-md border border-green-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Accuracy & Precision
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Ensures measurement accuracy</li>
                    <li>• Maintains instrument precision</li>
                    <li>• Reduces measurement uncertainty</li>
                    <li>• Provides confidence in readings</li>
                    <li>• Enables reliable data analysis</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Safety & Reliability
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Prevents safety incidents</li>
                    <li>• Protects personnel and equipment</li>
                    <li>• Ensures process stability</li>
                    <li>• Reduces downtime risks</li>
                    <li>• Maintains system integrity</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-md border border-purple-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Compliance & Quality
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Meets regulatory requirements</li>
                    <li>• Supports quality assurance</li>
                    <li>• Enables certification</li>
                    <li>• Maintains accreditation</li>
                    <li>• Demonstrates due diligence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consequences of Non-Calibration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                Consequences of Inadequate Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30">
                    <h4 className="text-red-400 font-semibold mb-2">Safety Risks</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Incorrect pressure readings leading to equipment failure</li>
                      <li>• Temperature sensors causing overheating or underheating</li>
                      <li>• Flow measurement errors affecting safety systems</li>
                      <li>• Gas detection failures in hazardous environments</li>
                      <li>• Process control malfunctions</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 p-4 rounded-md border border-orange-600/30">
                    <h4 className="text-orange-400 font-semibold mb-2">Financial Impact</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Product quality issues and waste</li>
                      <li>• Regulatory fines and penalties</li>
                      <li>• Insurance claim rejections</li>
                      <li>• Lost production time</li>
                      <li>• Increased energy consumption</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-900/20 p-4 rounded-md border border-yellow-600/30">
                    <h4 className="text-yellow-400 font-semibold mb-2">Regulatory Consequences</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Failed regulatory audits</li>
                      <li>• Loss of certifications</li>
                      <li>• Legal liability issues</li>
                      <li>• Shutdown orders</li>
                      <li>• Reputation damage</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/20 p-4 rounded-md border border-gray-600/30">
                    <h4 className="text-gray-400 font-semibold mb-2">Operational Issues</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Inconsistent product quality</li>
                      <li>• Process optimization difficulties</li>
                      <li>• Maintenance scheduling problems</li>
                      <li>• Data integrity concerns</li>
                      <li>• Customer confidence loss</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industries Where Calibration is Critical */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Industries Where Calibration is Critical</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Manufacturing</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Automotive production</li>
                    <li>• Electronics manufacturing</li>
                    <li>• Precision machining</li>
                    <li>• Quality control testing</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Healthcare</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Medical devices</li>
                    <li>• Laboratory equipment</li>
                    <li>• Patient monitoring systems</li>
                    <li>• Diagnostic instruments</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Energy & Utilities</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Power generation</li>
                    <li>• Gas distribution</li>
                    <li>• Water treatment</li>
                    <li>• Nuclear facilities</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Chemical & Pharmaceutical</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Process control</li>
                    <li>• Product formulation</li>
                    <li>• Environmental monitoring</li>
                    <li>• Batch consistency</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Aerospace & Defence</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Aircraft systems</li>
                    <li>• Navigation equipment</li>
                    <li>• Testing laboratories</li>
                    <li>• Compliance verification</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Food & Beverage</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Temperature monitoring</li>
                    <li>• pH measurement</li>
                    <li>• Weight verification</li>
                    <li>• Safety compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calibration in System Maintenance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Calibration in System Maintenance Framework</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-md border border-purple-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Preventive Maintenance Integration</h4>
                <p className="text-sm mb-2">
                  Calibration forms a critical component of preventive maintenance strategies, ensuring 
                  instruments maintain their accuracy and reliability throughout their operational life.
                </p>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold text-sm mb-1">Scheduled Calibration</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Time-based intervals</li>
                      <li>• Usage-based triggers</li>
                      <li>• Drift monitoring</li>
                      <li>• Planned maintenance windows</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold text-sm mb-1">Condition-Based Calibration</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Performance monitoring</li>
                      <li>• Trend analysis</li>
                      <li>• Predictive algorithms</li>
                      <li>• Early warning systems</li>
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
                Chemical Plant Pressure Sensor Failure
              </p>
              <p>
                A pressure sensor in a chemical plant's reactor vessel hadn't been calibrated for 18 months. 
                The sensor gradually drifted, reading 2.5 bar lower than actual pressure. This led to:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Incorrect batch formulation resulting in 500kg of unusable product</li>
                <li>• £50,000 direct cost for waste disposal and replacement materials</li>
                <li>• 12-hour production shutdown for system investigation</li>
                <li>• Regulatory investigation by HSE due to safety concerns</li>
                <li>• Implementation of enhanced calibration procedures</li>
              </ul>
              <p className="text-sm italic text-yellow-400">
                This incident could have been prevented with proper calibration scheduling and drift monitoring.
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
                Calibration is the foundation of accurate measurement and safe operation in industrial systems. 
                Without regular calibration, instruments lose accuracy, creating safety, financial, and legal risks. 
                Understanding calibration's importance is essential for maintaining system integrity and regulatory compliance.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What is the formal definition of calibration?",
                options: [
                  "Adjusting an instrument to read correctly",
                  "Comparison of measurement values delivered by a device under test with those of a calibration standard of known accuracy",
                  "Replacing old instruments with new ones",
                  "Testing if equipment works properly"
                ],
                correctAnswer: 1,
                explanation: "Calibration is specifically the comparison process between a device under test and a calibration standard, establishing the relationship and determining measurement uncertainty."
              },
              {
                id: 2,
                question: "Which of these is NOT a key component of calibration?",
                options: [
                  "Device Under Test (DUT)",
                  "Reference Standard", 
                  "Comparison Process",
                  "Equipment Replacement"
                ],
                correctAnswer: 3,
                explanation: "Equipment replacement is not part of calibration. The key components are DUT, reference standard, comparison process, documentation, and uncertainty assessment."
              },
              {
                id: 3,
                question: "What is the difference between calibration and adjustment?",
                options: [
                  "They are the same thing",
                  "Calibration determines the relationship between measured and actual values; adjustment brings the instrument's response within acceptable limits",
                  "Adjustment is more important than calibration",
                  "Calibration is only for new equipment"
                ],
                correctAnswer: 1,
                explanation: "Calibration determines measurement relationships and doesn't always require adjustment. Adjustment specifically corrects the instrument's response to meet specifications."
              },
              {
                id: 4,
                question: "Which consequence is NOT typically associated with inadequate calibration?",
                options: [
                  "Safety incidents from incorrect readings",
                  "Regulatory fines and penalties",
                  "Increased equipment purchase costs",
                  "Product quality issues and waste"
                ],
                correctAnswer: 2,
                explanation: "Increased equipment purchase costs are not a direct consequence of inadequate calibration. The main consequences are safety risks, financial losses, regulatory issues, and operational problems."
              },
              {
                id: 5,
                question: "In which type of maintenance strategy does calibration primarily fit?",
                options: [
                  "Reactive maintenance only",
                  "Preventive maintenance",
                  "Emergency maintenance",
                  "Cost-reduction maintenance"
                ],
                correctAnswer: 1,
                explanation: "Calibration is a critical component of preventive maintenance strategies, ensuring instruments maintain accuracy and reliability throughout their operational life."
            }
            ]}
            title="Section 1 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <div></div>
            <Link to="../instrumentation-module-6-section-2">
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

export default InstrumentationModule6Section1;