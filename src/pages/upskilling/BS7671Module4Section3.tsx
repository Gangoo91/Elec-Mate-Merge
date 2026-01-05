import { ArrowLeft, ArrowRight, Clock, CheckCircle, AlertTriangle, Target, Lightbulb, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section3 = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum disconnection time for a socket circuit in a TN system?",
      options: [
        "0.1 seconds",
        "0.4 seconds",
        "1.0 seconds",
        "5.0 seconds"
      ],
      correct: 1,
      explanation: "For socket circuits in TN systems, BS 7671 requires disconnection within 0.4 seconds to ensure safety against electric shock."
    },
    {
      id: 2,
      question: "What is the purpose of testing Zs?",
      options: [
        "To measure insulation resistance",
        "To verify the earth fault loop impedance is low enough for protective device operation",
        "To check polarity",
        "To measure voltage drop"
      ],
      correct: 1,
      explanation: "Testing Zs verifies that the earth fault loop impedance is sufficiently low to allow protective devices to disconnect within the required time limits during an earth fault."
    },
    {
      id: 3,
      question: "Why are RCDs essential in TT systems?",
      options: [
        "They provide overload protection",
        "The high earth electrode resistance makes achieving fast disconnection times with overcurrent devices difficult",
        "They prevent voltage drop",
        "They are required by law in all systems"
      ],
      correct: 1,
      explanation: "In TT systems, the high resistance of the earth electrode path means overcurrent devices alone cannot achieve the required disconnection times, making RCDs essential for safety."
    },
    {
      id: 4,
      question: "What is meant by the fault path?",
      options: [
        "The route cables take through a building",
        "The path taken by fault current from the point of fault back to the source",
        "The installation route for protective devices",
        "The testing sequence for electrical installations"
      ],
      correct: 1,
      explanation: "The fault path is the complete circuit taken by fault current from the point of fault, through protective conductors and earthing systems, back to the source."
    },
    {
      id: 5,
      question: "How does temperature affect Zs values?",
      options: [
        "Temperature has no effect on Zs",
        "Higher temperatures increase conductor resistance and Zs values",
        "Higher temperatures decrease Zs values",
        "Temperature only affects AC measurements"
      ],
      correct: 1,
      explanation: "As conductor temperature increases, resistance increases. The 80% rule allows measured Zs values to be 80% of tabulated limits to account for temperature rise under fault conditions."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Disconnection Times and Fault Path Integrity
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Ensuring rapid disconnection and reliable fault clearance
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                To ensure the safety of people and property, electrical installations must disconnect dangerous voltages quickly in the event of a fault. The speed of disconnection is critical - too slow, and dangerous touch voltages may persist long enough to cause harm.
              </p>
              <p className="text-base leading-relaxed">
                This section outlines the required disconnection times for different types of circuits and systems, and explains how fault path integrity ensures protective devices can operate correctly when needed.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand required disconnection times for various systems and circuits</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Learn differences between TT, TN-S, and TN-C-S systems in fault clearance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Grasp the importance of a reliable fault path</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Be able to verify compliance using test results</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disconnection Time Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Timer className="h-6 w-6 text-yellow-400" />
                Disconnection Time Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Understanding Time Limits</h4>
                <p className="text-sm">
                  Different circuits and systems have different disconnection time requirements based on their risk level and likelihood of human contact during fault conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">TN Systems</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Final Circuits ≤ 32A:</p>
                      <p className="text-xs">Maximum disconnection time: <strong>0.4 seconds</strong></p>
                      <p className="text-xs text-white mt-1">Applies to socket outlets and similar circuits where direct contact is likely</p>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Distribution Circuits:</p>
                      <p className="text-xs">Maximum disconnection time: <strong>5.0 seconds</strong></p>
                      <p className="text-xs text-white mt-1">For circuits feeding distribution boards and fixed equipment</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Fixed Equipment Exception:</p>
                      <p className="text-xs">Longer times may be acceptable if justified by risk assessment</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">TT Systems</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Critical Requirement:</p>
                      <p className="text-xs">RCD protection is essential for achieving rapid disconnection times</p>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Why RCDs are Essential:</p>
                      <ul className="text-xs space-y-1">
                        <li>• High earth electrode resistance</li>
                        <li>• Insufficient fault current for MCB/fuse operation</li>
                        <li>• RCDs detect small earth leakage currents</li>
                        <li>• Can achieve 0.4s or faster disconnection</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm mb-2">Typical TT Scenario:</p>
                      <p className="text-xs">Earth electrode resistance: 100Ω, fault current only 2.3A - insufficient to trip 16A MCB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Special Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Socket Outlets:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Always require 0.4s in TN systems</li>
                      <li>• Higher risk due to portable equipment</li>
                      <li>• Direct user contact likely</li>
                      <li>• RCD protection often used additionally</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Lighting Circuits:</p>
                    <ul className="text-xs space-y-1">
                      <li>• 0.4s for circuits ≤ 32A</li>
                      <li>• 5s may be acceptable for higher ratings</li>
                      <li>• Consider luminaire accessibility</li>
                      <li>• Emergency lighting considerations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Motor Circuits:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Fixed equipment: usually 5s acceptable</li>
                      <li>• Portable equipment: 0.4s required</li>
                      <li>• Consider maintenance access</li>
                      <li>• Motor starter coordination important</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fault Path Integrity */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Fault Path Integrity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">The Complete Fault Path</h4>
                <p className="text-sm mb-3">
                  For protective devices to operate correctly, there must be a continuous, low-impedance path for fault current from the point of fault back to the source.
                </p>
                <p className="text-sm">
                  Any break or high resistance in this path will prevent adequate fault current flow, compromising safety.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4">Essential Path Components</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-3">Physical Components:</h5>
                    <ul className="text-xs space-y-2">
                      <li>• <strong>Circuit Protective Conductors (CPCs):</strong> Equipment earthing</li>
                      <li>• <strong>Main Earthing Terminal (MET):</strong> Central earthing point</li>
                      <li>• <strong>Earthing Conductor:</strong> Connection to earth electrode</li>
                      <li>• <strong>Earth Electrode:</strong> Connection to general mass of earth</li>
                      <li>• <strong>Metallic Containment:</strong> Conduit, trunking, cable armour</li>
                      <li>• <strong>Protective Bonding:</strong> Main and supplementary bonding</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-3">Verification Requirements:</h5>
                    <ul className="text-xs space-y-2">
                      <li>• <strong>Continuity Testing:</strong> Verify all connections intact</li>
                      <li>• <strong>Resistance Measurement:</strong> Ensure low impedance path</li>
                      <li>• <strong>Visual Inspection:</strong> Check for damage or corrosion</li>
                      <li>• <strong>Zs Testing:</strong> Overall earth fault loop impedance</li>
                      <li>• <strong>Bonding Verification:</strong> Main and supplementary bonds</li>
                      <li>• <strong>Connection Integrity:</strong> Tight, corrosion-free joints</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-red-600/10 p-3 rounded border border-red-600/30">
                  <h5 className="text-red-400 font-semibold text-sm mb-2">Common Faults</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Loose connections at terminals</li>
                    <li>• Corrosion of metallic paths</li>
                    <li>• Damaged cable armour or sheath</li>
                    <li>• Missing or inadequate bonding</li>
                    <li>• High resistance joints</li>
                  </ul>
                </div>
                <div className="bg-yellow-600/10 p-3 rounded border border-yellow-600/30">
                  <h5 className="text-yellow-400 font-semibold text-sm mb-2">Testing Methods</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Low ohm continuity testing</li>
                    <li>• Earth fault loop impedance (Zs)</li>
                    <li>• Step and touch potential testing</li>
                    <li>• Visual inspection techniques</li>
                    <li>• Thermal imaging for loose connections</li>
                  </ul>
                </div>
                <div className="bg-yellow-400/10 p-3 rounded border border-blue-600/30">
                  <h5 className="text-yellow-400 font-semibold text-sm mb-2">Remedial Actions</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Tighten loose connections</li>
                    <li>• Replace corroded components</li>
                    <li>• Install missing bonding conductors</li>
                    <li>• Upgrade undersized conductors</li>
                    <li>• Improve connection accessibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing and Verification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Timer className="h-6 w-6 text-purple-500" />
                Testing and Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">The 80% Rule</h4>
                <p className="text-sm mb-3">
                  Measured Zs values should not exceed 80% of the tabulated maximum values to allow for conductor temperature rise under fault conditions.
                </p>
                <p className="text-sm">
                  <strong>Example:</strong> If tabulated Zs limit is 2.30Ω, measured value should not exceed 1.84Ω (2.30 × 0.8).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Zs Testing Process</h4>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">1.</span>
                      <span><strong>Connect Test Equipment:</strong> Between line and earth at circuit under test</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">2.</span>
                      <span><strong>Isolate Circuit:</strong> Ensure no parallel paths affect measurement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">3.</span>
                      <span><strong>Measure Zs:</strong> Record earth fault loop impedance value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">4.</span>
                      <span><strong>Apply 80% Rule:</strong> Check measured value against corrected limit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">5.</span>
                      <span><strong>Calculate Disconnection Time:</strong> Verify compliance with time limits</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Interpretation of Results</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-1">Satisfactory Result:</p>
                      <p className="text-xs">Zs ≤ 80% of tabulated limit = Compliance achieved</p>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">Marginal Result:</p>
                      <p className="text-xs">Zs between 80-100% of limit = Consider temperature effects</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-1">Unsatisfactory Result:</p>
                      <p className="text-xs">Zs {'>'}  tabulated limit = Non-compliance, investigation required</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Coordination with Protective Devices</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Device Selection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Choose appropriate type and rating</li>
                      <li>• Consider discrimination requirements</li>
                      <li>• Check Zs limits for device type</li>
                      <li>• Verify time/current characteristics</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Conductor Sizing:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Adequate current carrying capacity</li>
                      <li>• Appropriate CPC size for Zs limits</li>
                      <li>• Consider volt drop requirements</li>
                      <li>• Allow for installation conditions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">System Design:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Earth electrode system adequacy</li>
                      <li>• Main bonding conductor sizing</li>
                      <li>• Distribution arrangement</li>
                      <li>• RCD coordination where used</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">TN-C-S System Socket Circuit Testing</h4>
                <p className="text-sm mb-3">
                  An electrician is inspecting a TN-C-S system in a commercial building. Socket outlet circuits are protected by 20A Type B MCBs, and during testing, various Zs measurements are recorded.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white mb-2">
                    <strong>Test Results:</strong> Circuit 1: Zs = 1.65Ω, Circuit 2: Zs = 2.10Ω, Circuit 3: Zs = 2.45Ω
                  </p>
                  <p className="text-xs text-white mb-2">
                    <strong>Tabulated Limit:</strong> For 20A Type B MCB = 2.30Ω maximum
                  </p>
                  <p className="text-xs text-white">
                    <strong>80% Rule Applied:</strong> 2.30 × 0.8 = 1.84Ω maximum for satisfactory result
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-green-600/20 p-2 rounded border border-green-600/40">
                    <p className="text-xs text-green-400"><strong>Circuit 1:</strong> 1.65Ω - Satisfactory</p>
                  </div>
                  <div className="bg-yellow-600/20 p-2 rounded border border-yellow-600/40">
                    <p className="text-xs text-yellow-400"><strong>Circuit 2:</strong> 2.10Ω - Marginal, requires investigation</p>
                  </div>
                  <div className="bg-red-600/20 p-2 rounded border border-red-600/40">
                      <p className="text-xs text-red-400"><strong>Circuit 3:</strong> 2.45Ω - Non-compliant</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amendment 3 Updates */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-cyan-500" />
                Amendment 3 Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-cyan-600/10 p-4 rounded-lg border border-cyan-600/30">
                <h4 className="text-white font-semibold mb-3">Latest Regulatory Changes</h4>
                <p className="text-sm">
                  Amendment 3 to BS 7671:2018 introduced significant updates affecting disconnection times and fault protection requirements, particularly for modern installations including EV charging, energy storage, and smart devices.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">EV Charging Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Enhanced Protection:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Type B RCD mandatory for EV charging points</li>
                        <li>• 6 mA DC fault detection capability required</li>
                        <li>• Enhanced disconnection time requirements</li>
                        <li>• Additional earth monitoring for DC faults</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Fast Disconnection:</p>
                      <ul className="text-xs space-y-1">
                        <li>• ≤ 0.4s for AC faults in TN systems</li>
                        <li>• ≤ 6mA DC fault detection within 1s</li>
                        <li>• Automatic supply disconnection required</li>
                        <li>• Remote monitoring capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Arc Fault Protection</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">AFDD Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Arc Fault Detection Devices for final circuits</li>
                        <li>• Particularly for sleeping accommodation</li>
                        <li>• High fire risk environments</li>
                        <li>• Enhanced series and parallel arc detection</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Disconnection Times:</p>
                      <ul className="text-xs space-y-1">
                        <li>• ≤ 0.3s for detected arc faults</li>
                        <li>• Combined with RCD protection</li>
                        <li>• Selective operation with downstream devices</li>
                        <li>• Regular self-testing requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Smart Device Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">IoT Device Protection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Enhanced earth fault protection</li>
                      <li>• Surge protection requirements</li>
                      <li>• Communication circuit isolation</li>
                      <li>• Remote disconnection capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Energy Storage Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• DC isolation requirements</li>
                      <li>• Battery management system integration</li>
                      <li>• Emergency disconnection procedures</li>
                      <li>• Thermal runaway protection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Smart Metering:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Enhanced fault monitoring</li>
                      <li>• Real-time disconnection time analysis</li>
                      <li>• Remote testing capabilities</li>
                      <li>• Predictive maintenance alerts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Storage and DC Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-500" />
                Energy Storage and DC Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">DC Fault Protection Challenges</h4>
                <p className="text-sm">
                  DC systems present unique challenges for fault protection due to the absence of natural current zero crossings, requiring specialised protection strategies and faster disconnection methods.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Battery Energy Storage</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>DC Isolation:</strong> Must achieve galvanic isolation within 0.1s of fault detection</li>
                    <li>• <strong>Thermal Protection:</strong> Temperature-based disconnection systems</li>
                    <li>• <strong>Gas Detection:</strong> Automatic isolation on dangerous gas levels</li>
                    <li>• <strong>Short Circuit Protection:</strong> Ultra-fast DC contactors required</li>
                    <li>• <strong>Earth Fault Monitoring:</strong> Continuous insulation monitoring</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Solar PV Systems</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>DC Switching:</strong> String-level disconnection capability</li>
                    <li>• <strong>Arc Fault Detection:</strong> DC arc detection within 2 seconds</li>
                    <li>• <strong>Rapid Shutdown:</strong> Module-level shutdown within 30 seconds</li>
                    <li>• <strong>Ground Fault Protection:</strong> Enhanced earth monitoring</li>
                    <li>• <strong>Firefighter Safety:</strong> Remote shutdown capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Quick disconnection is a vital safety principle in electrical installations. Ensuring fault paths are continuous and have sufficiently low impedance allows protective devices to operate within safe time limits, protecting both people and property.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Socket circuits in TN systems must disconnect within 0.4 seconds</li>
                  <li>• Distribution circuits have a 5-second disconnection time limit</li>
                  <li>• TT systems rely heavily on RCD protection for rapid disconnection</li>
                  <li>• Amendment 3 introduces enhanced requirements for EV charging and energy storage</li>
                  <li>• Arc fault protection now mandatory in high-risk applications</li>
                  <li>• DC systems require specialised protection strategies</li>
                  <li>• Fault path integrity is essential for protective device operation</li>
                  <li>• The 80% rule accounts for temperature rise effects on conductor resistance</li>
                  <li>• Regular testing and verification ensures continued compliance</li>
                  <li>• Proper coordination between protective devices and conductor sizing is crucial</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of disconnection times and fault path integrity."
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-4-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-4-section-4">
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

export default BS7671Module4Section3;