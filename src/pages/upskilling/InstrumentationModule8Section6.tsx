import { ArrowLeft, ArrowRight, Shield, CheckCircle2, Book, Brain, AlertTriangle, Zap, Lock, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule8Section6 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
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
                  Safety Considerations During Troubleshooting
                </h1>
                <p className="text-xl text-gray-400">
                  Module 8, Section 6
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 8.6
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
                Diagnosing faults often means working live or in high-risk areas. This section 
                reviews best practices to stay safe while fault finding, ensuring that diagnostic 
                work never compromises personal safety or system integrity.
              </p>
              <p>
                Effective troubleshooting requires balancing the need for thorough investigation 
                with strict adherence to safety protocols. Understanding hazards and applying 
                proper procedures protects technicians while maintaining system reliability.
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
                  <span>Identify key hazards during diagnostics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply safe working procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand how to isolate and test live circuits properly</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardHat className="h-5 w-5 text-yellow-400" />
                Safe Working Procedures for Fault Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Essential Safety Practices</h4>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                  <h5 className="text-red-400 font-semibold mb-2">Always Assume Circuits are Live Unless Proven Otherwise</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Verification Procedures</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Voltage Testing:</strong> Use approved voltage detector on every circuit</li>
                        <li>• <strong>Three-Point Check:</strong> Test known live, test circuit, test known live again</li>
                        <li>• <strong>Multiple Points:</strong> Check all conductors and earth connections</li>
                        <li>• <strong>Visual Confirmation:</strong> Look for isolation switches and fuses</li>
                        <li>• <strong>Documentation:</strong> Verify isolation matches electrical drawings</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Common Hazards</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Backfeed Circuits:</strong> Power from multiple sources</li>
                        <li>• <strong>Stored Energy:</strong> Capacitors and inductors</li>
                        <li>• <strong>Induced Voltages:</strong> Parallel cables and transformers</li>
                        <li>• <strong>Control Circuits:</strong> May remain live during isolation</li>
                        <li>• <strong>Emergency Systems:</strong> UPS and battery backup circuits</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Use CAT-Rated Equipment and Insulated Tools</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">CAT Rating Requirements</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>CAT III 600V:</strong> Distribution panels and fixed installation</li>
                        <li>• <strong>CAT II 300V:</strong> Local loads and appliance outlets</li>
                        <li>• <strong>Overvoltage Protection:</strong> Meters must handle transient voltages</li>
                        <li>• <strong>Current Rating:</strong> Ensure adequate amperage capability</li>
                        <li>• <strong>Regular Calibration:</strong> Maintain accuracy and safety certification</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Insulated Tool Standards</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>VDE Certified:</strong> 1000V rated insulated tools</li>
                        <li>• <strong>Regular Inspection:</strong> Check for damage before each use</li>
                        <li>• <strong>Proper Storage:</strong> Protect insulation from damage</li>
                        <li>• <strong>Complete Set:</strong> Screwdrivers, pliers, and spanners</li>
                        <li>• <strong>Replacement Schedule:</strong> Replace damaged tools immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Check Permit-to-Work and Lockout Procedures</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Permit System</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Work Authorisation:</strong> Obtain proper permits before starting</li>
                        <li>• <strong>Hazard Assessment:</strong> Identify all risks and controls</li>
                        <li>• <strong>Competency Check:</strong> Verify technician qualifications</li>
                        <li>• <strong>Emergency Procedures:</strong> Know evacuation and first aid plans</li>
                        <li>• <strong>Communication:</strong> Inform control room and operations</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Lockout/Tagout (LOTO)</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Personal Locks:</strong> Each technician applies their own lock</li>
                        <li>• <strong>Isolation Verification:</strong> Test circuits after lockout</li>
                        <li>• <strong>Stored Energy:</strong> Discharge capacitors and release pressure</li>
                        <li>• <strong>Try to Start:</strong> Attempt operation to verify isolation</li>
                        <li>• <strong>Documentation:</strong> Record isolation points and times</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                  <h5 className="text-purple-400 font-semibold mb-2">Avoid Bypassing Safety Systems for Testing</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Safety Integrity:</strong> Never defeat interlocks or protective devices</li>
                    <li>• <strong>Alternative Methods:</strong> Use simulation or offline testing where possible</li>
                    <li>• <strong>Risk Assessment:</strong> Evaluate consequences before any bypass</li>
                    <li>• <strong>Management Approval:</strong> Senior authorisation required for any bypass</li>
                    <li>• <strong>Restoration:</strong> Immediately restore safety systems after testing</li>
                  </ul>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                  <h5 className="text-orange-400 font-semibold mb-2">Watch for Arc Risk, Especially in DC and Capacitive Circuits</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Arc Flash Hazards</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>DC Circuits:</strong> Arc doesn't self-extinguish like AC</li>
                        <li>• <strong>Capacitive Loads:</strong> High inrush currents and stored energy</li>
                        <li>• <strong>Switching Operations:</strong> Making and breaking connections under load</li>
                        <li>• <strong>Fault Conditions:</strong> Short circuits create extreme arc energy</li>
                        <li>• <strong>Altitude Effects:</strong> Reduced air density increases arc risk</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Protection Measures</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Arc Flash PPE:</strong> Flame-resistant clothing and face protection</li>
                        <li>• <strong>Remote Operation:</strong> Use insulated handles and extension tools</li>
                        <li>• <strong>Current Limitation:</strong> Use fuses or current-limiting devices</li>
                        <li>• <strong>Safe Distances:</strong> Maintain approach boundaries</li>
                        <li>• <strong>Energy Analysis:</strong> Calculate incident energy levels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-yellow-400" />
                Essential Safety Equipment for Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Personal Protective Equipment (PPE)</h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Basic PPE</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Safety Glasses:</strong> Impact and UV protection</li>
                    <li>• <strong>Insulated Gloves:</strong> Rated for working voltage</li>
                    <li>• <strong>Safety Footwear:</strong> Electrical hazard rated boots</li>
                    <li>• <strong>Hard Hat:</strong> Electrical insulation type</li>
                    <li>• <strong>Hi-Vis Clothing:</strong> Flame-resistant materials</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Arc Flash Protection</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Arc Flash Suit:</strong> CAL/cm² rated protection</li>
                    <li>• <strong>Face Shield:</strong> Arc-rated with chin protection</li>
                    <li>• <strong>Flash Hood:</strong> Complete head and neck coverage</li>
                    <li>• <strong>Leather Gloves:</strong> Over insulated rubber gloves</li>
                    <li>• <strong>Leather Boots:</strong> No metal eyelets or buckles</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Testing Equipment</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Voltage Detector:</strong> Non-contact and contact types</li>
                    <li>• <strong>Digital Multimeter:</strong> CAT-rated for application</li>
                    <li>• <strong>Insulation Tester:</strong> High voltage test capability</li>
                    <li>• <strong>Current Clamp:</strong> Non-intrusive measurement</li>
                    <li>• <strong>Phase Sequence:</strong> Rotation verification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Risk Assessment for Live Circuit Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Systematic Risk Evaluation</h4>
              
              <div className="bg-card p-4 rounded border border-gray-600">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Risk Factors</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm">Voltage level and fault current</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Environmental conditions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="text-sm">Equipment accessibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm">Technician competency</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">Control Measures</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Proper PPE selection and use</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Appropriate test equipment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Two-person working rule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Emergency response plan</span>
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
                Rushed Testing Results in Preventable Incident
              </p>
              <p>
                A rushed test on an energised loop without verifying isolation results in a 
                blown fuse and mild shock — completely avoidable with proper procedure. 
                The incident highlights the importance of systematic safety practices.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Incident Sequence:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Pressure Situation:</strong> Production urgent for fault resolution</li>
                  <li>• <strong>Shortcut Taken:</strong> Technician skipped voltage verification</li>
                  <li>• <strong>Wrong Assumption:</strong> Believed circuit was isolated based on switch position</li>
                  <li>• <strong>Contact Made:</strong> Test probe touched live terminal</li>
                  <li>• <strong>Result:</strong> 24V shock through damaged glove, blown test fuse</li>
                </ul>
              </div>
              <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                <h5 className="text-red-400 font-semibold text-sm mb-2">Contributing Factors:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Time pressure from production demands</li>
                  <li>• Damaged PPE not identified during inspection</li>
                  <li>• Switch position didn't match electrical isolation</li>
                  <li>• No voltage testing performed before contact</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Lessons Learned:</h5>
                <p className="text-sm">
                  The incident reinforced that safety procedures exist for good reason. A simple 
                  voltage test would have revealed the live circuit. The damaged glove was 
                  replaced immediately, and the team implemented mandatory pre-work safety 
                  briefings to prevent similar shortcuts under pressure.
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
                Troubleshooting isn't worth risking injury — verify, isolate, and follow safe 
                practices every time. Professional diagnostic work requires balancing efficiency 
                with safety, ensuring that fault-finding activities never compromise personal 
                safety or system integrity.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What's the first step before testing a circuit?",
                options: [
                  "Start testing immediately",
                  "Verify the circuit is de-energised using proper voltage testing procedures",
                  "Check the drawings only",
                  "Ask someone if it's safe"
                ],
                correctAnswer: 1,
                explanation: "Always verify circuits are de-energised using proper voltage testing procedures (three-point check) before beginning any work, regardless of switch positions or assumptions."
              },
              {
                id: 2,
                question: "Why use CAT-rated tools?",
                options: [
                  "They're cheaper",
                  "They're designed to handle transient overvoltages and provide safety margins for electrical environments",
                  "They look more professional",
                  "They're required by insurance"
                ],
                correctAnswer: 1,
                explanation: "CAT-rated tools are designed to handle transient overvoltages common in electrical systems and provide appropriate safety margins for specific installation categories."
              },
              {
                id: 3,
                question: "What's the danger of skipping lockout/tagout?",
                options: [
                  "It saves time",
                  "Circuits may be unexpectedly energised by others, causing electrocution or equipment damage",
                  "Nothing happens",
                  "It improves efficiency"
                ],
                correctAnswer: 1,
                explanation: "Skipping lockout/tagout procedures can result in circuits being unexpectedly energised by other personnel, leading to serious injury, electrocution, or equipment damage."
              },
              {
                id: 4,
                question: "What kind of systems pose arc flash risk?",
                options: [
                  "Only high voltage systems",
                  "DC circuits, capacitive loads, high fault current systems, and any circuit with stored energy",
                  "Only AC systems",
                  "Only overhead lines"
                ],
                correctAnswer: 1,
                explanation: "Arc flash risk exists in DC circuits (arcs don't self-extinguish), capacitive loads (high inrush currents), high fault current systems, and any circuit with significant stored energy."
              },
              {
                id: 5,
                question: "Should you ever bypass safety features during testing?",
                options: [
                  "Yes, it's necessary for testing",
                  "Only with proper risk assessment, management approval, and immediate restoration after testing",
                  "Always, they get in the way",
                  "Never, under any circumstances"
                ],
                correctAnswer: 1,
                explanation: "Safety system bypasses should only occur with proper risk assessment, senior management approval, alternative protection measures, and immediate restoration after testing is complete."
            }
            ]}
            title="Section 6 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-8-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-9">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Complete Module 8
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule8Section6;