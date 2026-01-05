import { ArrowLeft, ArrowRight, Search, Target, CheckCircle2, Book, Brain, AlertTriangle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule8Section1 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Search className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Systematic Approach to Fault Diagnosis
                </h1>
                <p className="text-xl text-gray-400">
                  Module 8, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 8.1
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
                Diagnosing faults in instrumentation systems requires a logical, repeatable process. 
                This section outlines a structured method for accurate problem identification. Rather 
                than relying on guesswork or trial-and-error approaches, a systematic methodology 
                ensures efficient troubleshooting and prevents unnecessary component replacement.
              </p>
              <p>
                Professional fault diagnosis combines technical knowledge with methodical investigation 
                techniques. By following established procedures, technicians can quickly isolate problems, 
                reduce downtime, and maintain system reliability across complex industrial installations.
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
                  <span>Understand the step-by-step process of diagnosing instrumentation faults</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use isolation techniques to narrow down issues effectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply diagnostic thinking to both hardware and signal issues</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Systematic Diagnostic Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Five-Step Diagnostic Framework</h4>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 1: Start with Symptom Observation and Environment Check</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Document the Problem:</strong> Record exact symptoms, when they occur, and frequency</li>
                    <li>• <strong>Environmental Assessment:</strong> Check temperature, humidity, vibration, and electrical interference</li>
                    <li>• <strong>Recent Changes:</strong> Identify any modifications, maintenance, or process changes</li>
                    <li>• <strong>Operator Input:</strong> Gather information from personnel who noticed the fault</li>
                    <li>• <strong>Historical Context:</strong> Review previous fault logs and maintenance records</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 2: Isolate Areas - Sensor, Wiring, Signal Conditioning, Controller</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Physical Isolation</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Sensor Level:</strong> Check sensor operation independently</li>
                        <li>• <strong>Wiring Section:</strong> Test cable runs and connections</li>
                        <li>• <strong>Junction Boxes:</strong> Verify termination integrity</li>
                        <li>• <strong>Control Room:</strong> Test input cards and controllers</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Signal Flow Isolation</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Input Signal:</strong> Verify sensor output at source</li>
                        <li>• <strong>Transmission:</strong> Check signal integrity along cable</li>
                        <li>• <strong>Conditioning:</strong> Test amplifiers and converters</li>
                        <li>• <strong>Processing:</strong> Verify controller input processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 3: Use Measurement Tools to Verify Each Stage</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Basic Measurements</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Voltage measurements</li>
                        <li>• Current loop testing</li>
                        <li>• Resistance checks</li>
                        <li>• Continuity verification</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Advanced Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Signal injection testing</li>
                        <li>• Insulation resistance</li>
                        <li>• Loop simulation</li>
                        <li>• Dynamic response testing</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Specialised Tools</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Process calibrators</li>
                        <li>• Oscilloscopes</li>
                        <li>• Data loggers</li>
                        <li>• Communication testers</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 4: Cross-Check with Schematics and Historical Data</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Current Drawings:</strong> Verify actual installation matches documentation</li>
                    <li>• <strong>Design Parameters:</strong> Compare measured values with design specifications</li>
                    <li>• <strong>Trend Analysis:</strong> Review historical performance data for patterns</li>
                    <li>• <strong>Similar Systems:</strong> Compare with identical loops for baseline reference</li>
                    <li>• <strong>Manufacturer Data:</strong> Consult device specifications and troubleshooting guides</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 5: Log Findings as You Progress</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Documentation Requirements</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Test results and measurements</li>
                        <li>• Observations and anomalies</li>
                        <li>• Equipment used and settings</li>
                        <li>• Time stamps and conditions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Benefits of Logging</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Prevents repeated testing</li>
                        <li>• Builds knowledge base</li>
                        <li>• Supports root cause analysis</li>
                        <li>• Enables pattern recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decision Tree */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Diagnostic Decision Tree
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Systematic Fault Location Process</h4>
              
              <div className="bg-card p-4 rounded border border-gray-600">
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium mb-2">Problem Reported → Initial Assessment</p>
                    <ul className="text-sm ml-4 space-y-1">
                      <li>• Is the fault consistent or intermittent?</li>
                      <li>• What process conditions exist during the fault?</li>
                      <li>• Are multiple loops affected or just one?</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-yellow-400 pl-4">
                    <p className="text-white font-medium mb-2">Single Loop Affected → Hardware Focus</p>
                    <ul className="text-sm ml-4 space-y-1">
                      <li>• Check power supply voltage and current</li>
                      <li>• Test loop resistance and continuity</li>
                      <li>• Verify sensor calibration and response</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-yellow-600 pl-4">
                    <p className="text-white font-medium mb-2">Multiple Loops Affected → Common Cause</p>
                    <ul className="text-sm ml-4 space-y-1">
                      <li>• Check common power supplies</li>
                      <li>• Investigate environmental factors</li>
                      <li>• Test for electromagnetic interference</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-red-600 pl-4">
                    <p className="text-white font-medium mb-2">Intermittent Faults → Pattern Analysis</p>
                    <ul className="text-sm ml-4 space-y-1">
                      <li>• Log fault frequency and timing</li>
                      <li>• Correlate with process operations</li>
                      <li>• Check for loose connections and vibration</li>
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
                <Brain className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Pressure Sensor Frozen Reading Investigation
              </p>
              <p>
                A pressure sensor is showing a frozen reading at 8.2mA, regardless of actual pressure 
                changes. The systematic approach quickly identifies the root cause and prevents 
                unnecessary sensor replacement.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Systematic Investigation:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Step 1:</strong> Confirmed signal frozen at 8.2mA on DCS display</li>
                  <li>• <strong>Step 2:</strong> Isolated sensor - direct measurement shows varying signal</li>
                  <li>• <strong>Step 3:</strong> Tested cable continuity - discovered intermittent connection</li>
                  <li>• <strong>Step 4:</strong> Located junction box with water ingress damage</li>
                  <li>• <strong>Step 5:</strong> Documented findings and repair procedure</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Result:</h5>
                <p className="text-sm">
                  A step-by-step check isolated the issue to a damaged cable in a junction box 
                  exposed to water. Replacing the cable section restored normal operation. The 
                  systematic approach saved time and prevented unnecessary sensor replacement.
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
                A systematic approach to fault finding saves time, avoids guesswork, and ensures 
                accurate resolution. By following the five-step process of observation, isolation, 
                measurement, cross-checking, and documentation, technicians can efficiently diagnose 
                even complex instrumentation problems while building valuable knowledge for future use.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What's the first step in a systematic fault-finding process?",
                options: [
                  "Replace the suspected faulty component",
                  "Start with symptom observation and environment check",
                  "Test all components individually",
                  "Check the control system first"
                ],
                correctAnswer: 1,
                explanation: "The first step is always to observe symptoms and check environmental factors. This provides essential context and prevents wasted effort on unrelated issues."
              },
              {
                id: 2,
                question: "Why is isolation a key part of diagnostics?",
                options: [
                  "It prevents electrical shock",
                  "It allows testing of individual components to narrow down the fault location",
                  "It saves money on replacement parts",
                  "It meets safety regulations"
                ],
                correctAnswer: 1,
                explanation: "Isolation allows systematic testing of individual components (sensor, wiring, signal conditioning, controller) to narrow down exactly where the fault is located."
              },
              {
                id: 3,
                question: "Name one benefit of checking environmental factors.",
                options: [
                  "It's required by regulations",
                  "It identifies external influences like temperature, humidity, or EMI that may cause faults",
                  "It validates the calibration",
                  "It confirms power supply operation"
                ],
                correctAnswer: 1,
                explanation: "Environmental factors like temperature extremes, moisture, vibration, or electromagnetic interference can cause instrumentation faults and should be checked early in diagnosis."
              },
              {
                id: 4,
                question: "What tool can help verify a signal path?",
                options: [
                  "A process calibrator for signal injection testing",
                  "Only a multimeter",
                  "A screwdriver",
                  "A computer"
                ],
                correctAnswer: 0,
                explanation: "A process calibrator can inject known signals at various points in the loop to verify signal path integrity and isolate where signal degradation occurs."
              },
              {
                id: 5,
                question: "Why log findings during diagnosis?",
                options: [
                  "It's legally required",
                  "To prevent repeated testing, build knowledge base, and support root cause analysis",
                  "To fill out paperwork",
                  "To prove work was done"
                ],
                correctAnswer: 1,
                explanation: "Logging findings prevents repeating tests, builds organizational knowledge, enables pattern recognition, and supports thorough root cause analysis for better long-term solutions."
              }
            ]}
            title="Section 1 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-8">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 8
              </Button>
            </Link>
            <Link to="../instrumentation-module-8-section-2">
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

export default InstrumentationModule8Section1;