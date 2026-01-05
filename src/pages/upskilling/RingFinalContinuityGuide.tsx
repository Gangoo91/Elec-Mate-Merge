import { ArrowLeft, RotateCcw, CheckCircle, AlertTriangle, Info, Target, Settings, BookOpen, Eye, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RingFinalContinuityGuide = () => {
  const whyWeTest = [
    {
      title: "Ring Integrity",
      description: "Ensures the ring circuit is complete and properly connected throughout",
      icon: RotateCcw
    },
    {
      title: "Load Distribution",
      description: "Verifies balanced load sharing between both legs of the ring",
      icon: Target
    },
    {
      title: "Fault Protection",
      description: "Confirms protective devices will operate correctly under fault conditions",
      icon: AlertTriangle
    },
    {
      title: "Regulation Compliance",
      description: "BS 7671 requires ring final circuit continuity verification",
      icon: CheckCircle
    }
  ];

  const testMethods = [
    {
      method: "End-to-End Test",
      description: "Tests continuity of each conductor around the complete ring",
      when: "Initial verification of ring circuit integrity",
      equipment: "Low resistance ohmmeter, test leads"
    },
    {
      method: "Cross-Connection Test", 
      description: "Verifies correct polarity and identifies any interconnections",
      when: "After end-to-end test to confirm proper wiring",
      equipment: "Low resistance ohmmeter, temporary links"
    },
    {
      method: "R1 + R2 Test",
      description: "Measures combined resistance of line and CPC conductors",
      when: "Final verification for protective device coordination",
      equipment: "Low resistance ohmmeter, link connections"
    }
  ];

  const expectedResults = [
    {
      test: "End-to-End Line",
      range: "≤ 1.67 x cable resistance",
      cable25: "~0.15Ω (typical)",
      cable4: "~0.09Ω (typical)",
      status: "good"
    },
    {
      test: "End-to-End Neutral", 
      range: "≤ 1.67 x cable resistance",
      cable25: "~0.15Ω (typical)",
      cable4: "~0.09Ω (typical)",
      status: "good"
    },
    {
      test: "End-to-End CPC",
      range: "≤ 1.67 x cable resistance", 
      cable25: "~0.25Ω (typical)",
      cable4: "~0.15Ω (typical)",
      status: "good"
    },
    {
      test: "Cross-Connection",
      range: "Should be ∞ (open circuit)",
      cable25: "∞Ω",
      cable4: "∞Ω", 
      status: "critical"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Tests
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <RotateCcw className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-green-600/40 text-green-300 hover:bg-green-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Continuity Testing
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ring Final Circuit Continuity
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Complete guide to testing ring final circuits including end-to-end and cross-connection tests
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Why We Test Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Why We Test Ring Final Circuits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyWeTest.map((reason, index) => {
                  const IconComponent = reason.icon;
                  return (
                    <div key={index} className="bg-card/80 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-5 w-5 text-yellow-400" />
                        <h3 className="text-white font-semibold">{reason.title}</h3>
                      </div>
                      <p className="text-white text-sm">{reason.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Test Methods Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                Ring Final Test Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testMethods.map((method, index) => (
                <div key={index} className="bg-card/80 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">{method.method}</h3>
                  <p className="text-white text-sm mb-3">{method.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-yellow-400 font-medium text-sm">When to use:</p>
                      <p className="text-white text-xs">{method.when}</p>
                    </div>
                    <div>
                      <p className="text-green-400 font-medium text-sm">Equipment needed:</p>
                      <p className="text-white text-xs">{method.equipment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hands-On Testing Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-yellow-400" />
                Step-by-Step: How to Test Ring Finals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Test 1: End-to-End */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  End-to-End Continuity Test
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-yellow-400/20 p-4 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200 text-sm">
                      <strong>Purpose:</strong> Verify each conductor forms a complete ring with no breaks
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">At the Consumer Unit:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Isolate the circuit and prove dead</li>
                        <li>• Disconnect both line conductors (L1 and L2)</li>
                        <li>• Disconnect both neutral conductors (N1 and N2)</li>
                        <li>• Disconnect both CPC conductors (E1 and E2)</li>
                        <li>• Keep conductors clearly separated and labelled</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Equipment Setup:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Set ohmmeter to continuity mode</li>
                        <li>• Use 200mA test current</li>
                        <li>• Zero/null your test leads</li>
                        <li>• Ensure good contact at test points</li>
                        <li>• Have notepad ready for readings</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Test Sequence:</h4>
                    <div className="bg-card p-4 rounded space-y-2">
                      <p className="text-yellow-400 font-mono text-sm">1. Test L1 to L2: Connect leads, record reading (should be ~0.15Ω)</p>
                      <p className="text-yellow-400 font-mono text-sm">2. Test N1 to N2: Connect leads, record reading (should be ~0.15Ω)</p>
                      <p className="text-yellow-400 font-mono text-sm">3. Test E1 to E2: Connect leads, record reading (should be ~0.25Ω)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test 2: Cross-Connection */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Cross-Connection Test
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-green-600/20 p-4 rounded border-l-4 border-green-400">
                    <p className="text-green-200 text-sm">
                      <strong>Purpose:</strong> Verify no unwanted connections between different conductors
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">What to Test:</h4>
                    <div className="bg-card p-4 rounded space-y-2">
                      <p className="text-yellow-400 font-mono text-sm">L1 to N1: Should read ∞ (open circuit)</p>
                      <p className="text-yellow-400 font-mono text-sm">L1 to N2: Should read ∞ (open circuit)</p>
                      <p className="text-yellow-400 font-mono text-sm">L2 to N1: Should read ∞ (open circuit)</p>
                      <p className="text-yellow-400 font-mono text-sm">L2 to N2: Should read ∞ (open circuit)</p>
                      <p className="text-yellow-400 font-mono text-sm">All conductor to CPC tests: Should read ∞</p>
                    </div>
                  </div>

                  <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-400">
                    <p className="text-red-200 text-sm">
                      <strong>If you get a reading other than ∞:</strong> There's an unwanted connection - check for crossed wires, damaged insulation, or incorrect terminations
                    </p>
                  </div>
                </div>
              </div>

              {/* Test 3: R1 + R2 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  R1 + R2 Test
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-600/20 p-4 rounded border-l-4 border-purple-400">
                    <p className="text-purple-200 text-sm">
                      <strong>Purpose:</strong> Measure earth fault loop impedance within the ring circuit
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Method A - At Each Socket:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Connect L1 to E1 at consumer unit</li>
                        <li>• Connect L2 to E2 at consumer unit</li>
                        <li>• Test between line and earth at each socket</li>
                        <li>• Record highest reading (furthest point)</li>
                        <li>• This gives maximum R1 + R2 for circuit</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Method B - Calculation:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Use end-to-end test results</li>
                        <li>• R1 + R2 = (Line reading + CPC reading) ÷ 4</li>
                        <li>• Example: (0.15 + 0.25) ÷ 4 = 0.10Ω</li>
                        <li>• Quicker method but less accurate</li>
                        <li>• Good for verification check</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Results */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-yellow-400" />
                Expected Results & Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white font-semibold p-3">Test Type</th>
                      <th className="text-left text-white font-semibold p-3">Expected Range</th>
                      <th className="text-left text-white font-semibold p-3">2.5mm² Cable</th>
                      <th className="text-left text-white font-semibold p-3">4.0mm² Cable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expectedResults.map((result, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="text-white p-3 font-medium">{result.test}</td>
                        <td className="text-white p-3">{result.range}</td>
                        <td className={`p-3 ${result.status === 'good' ? 'text-green-400' : result.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {result.cable25}
                        </td>
                        <td className={`p-3 ${result.status === 'good' ? 'text-green-400' : result.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {result.cable4}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-600/20 p-4 rounded border border-green-600/30">
                  <h4 className="text-green-400 font-semibold mb-2">Good Results</h4>
                  <ul className="text-green-200 text-sm space-y-1">
                    <li>• End-to-end readings within expected range</li>
                    <li>• Cross-connections all show ∞</li>
                    <li>• R1 + R2 matches calculated values</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-600/20 p-4 rounded border border-yellow-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Check Further</h4>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    <li>• Readings higher than expected</li>
                    <li>• Inconsistent results between tests</li>
                    <li>• Temperature compensation needed</li>
                  </ul>
                </div>
                
                <div className="bg-red-600/20 p-4 rounded border border-red-600/30">
                  <h4 className="text-red-400 font-semibold mb-2">Problems Found</h4>
                  <ul className="text-red-200 text-sm space-y-1">
                    <li>• ∞ reading on end-to-end test</li>
                    <li>• Low reading on cross-connection</li>
                    <li>• Very high resistance values</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Problems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Common Problems & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Open Circuit on End-to-End Test</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Broken conductor in cable</li>
                        <li>• Loose connection at socket or CU</li>
                        <li>• Not actually a ring circuit</li>
                        <li>• Wrong conductors connected</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Check all connections at CU</li>
                        <li>• Verify at each socket outlet</li>
                        <li>• Use cable tracer to find break</li>
                        <li>• Check installation records</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Low Reading on Cross-Connection</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Crossed line and neutral at socket</li>
                        <li>• Damaged cable insulation</li>
                        <li>• Water ingress causing leakage</li>
                        <li>• Incorrect wiring at accessory</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Check each socket systematically</li>
                        <li>• Inspect for damage or moisture</li>
                        <li>• Verify correct terminations</li>
                        <li>• Test insulation resistance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: High R1 + R2 Reading</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Poor connections at terminals</li>
                        <li>• Undersized conductors</li>
                        <li>• Very long circuit run</li>
                        <li>• High ambient temperature</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Tighten all connections</li>
                        <li>• Check cable specifications</li>
                        <li>• Apply temperature correction</li>
                        <li>• Consider circuit design issues</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Tips */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                Practical Exam Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h3 className="text-yellow-400 font-semibold mb-3">Before You Start</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Check your meter is working and calibrated
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Identify which circuit you're testing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Have test certificate ready for results
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Label conductors clearly at CU
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h3 className="text-yellow-400 font-semibold mb-3">During Testing</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Follow the logical test sequence
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Record each reading immediately
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Check results make sense
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Repeat any doubtful readings
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-400 font-semibold">Remember for Exams</h4>
                </div>
                <p className="text-green-200 text-sm">
                  Ring final circuits must pass ALL three tests - end-to-end continuity, cross-connection (polarity), 
                  and R1 + R2 measurement. If any test fails, investigate and rectify before proceeding.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Practical Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                Advanced Ring Circuit Testing Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Advanced Method 1 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  The "Socket-by-Socket" Method
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-600/20 p-4 rounded border-l-4 border-purple-400">
                    <p className="text-purple-200 text-sm">
                      <strong>When to use:</strong> When you suspect wiring faults or need to identify exact fault locations
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Step-by-Step Process:</h4>
                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded">
                        <p className="text-yellow-400 font-medium text-sm">Stage 1: Map the Ring</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Start with all sockets disconnected from ring</li>
                          <li>• Test end-to-end continuity from CU</li>
                          <li>• Connect first socket and re-test</li>
                          <li>• Note any change in resistance</li>
                          <li>• Continue socket by socket around ring</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card p-3 rounded">
                        <p className="text-yellow-400 font-medium text-sm">Stage 2: Identify the Pattern</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Resistance should decrease as you complete the ring</li>
                          <li>• Any sudden increases indicate problems</li>
                          <li>• Final reading should be lowest (complete loop)</li>
                          <li>• Compare with calculated values for verification</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card p-3 rounded">
                        <p className="text-yellow-400 font-medium text-sm">Stage 3: Verification Test</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Remove mid-point socket temporarily</li>
                          <li>• Reading should approximately double</li>
                          <li>• This confirms true ring configuration</li>
                          <li>• Reconnect socket and verify final reading</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600/20 p-4 rounded border-l-4 border-green-400">
                    <p className="text-green-200 text-sm">
                      <strong>Time Investment:</strong> Takes 45-60 minutes but gives complete confidence in ring integrity. 
                      Essential for fault investigation or final verification of complex installations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Method 2 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Load Balance Verification Test
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-orange-600/20 p-4 rounded border-l-4 border-orange-400">
                    <p className="text-orange-200 text-sm">
                      <strong>Purpose:</strong> Verify that loads will be evenly distributed across both legs of the ring circuit
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Test Setup:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Connect temporary 10A load at furthest point</li>
                        <li>• Measure current in each leg at CU</li>
                        <li>• Current should be roughly equal (±20%)</li>
                        <li>• Move load to different points and repeat</li>
                        <li>• Test with multiple loads if possible</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">What Good Results Look Like:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• <strong>Mid-point load:</strong> 5A each leg</li>
                        <li>• <strong>Quarter-point load:</strong> 7.5A / 2.5A</li>
                        <li>• <strong>End-point load:</strong> 10A / 0A</li>
                        <li>• <strong>Multiple loads:</strong> Balanced overall</li>
                        <li>• <strong>No parallel paths affecting distribution</strong></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-600/20 p-4 rounded border-l-4 border-yellow-400">
                    <p className="text-yellow-200 text-sm">
                      <strong>Practical Note:</strong> This test requires a variable load (like a portable heater) and clamp meter. 
                      Not always practical on site, but valuable for commissioning critical installations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Method 3 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  Temperature Rise Testing
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-teal-600/20 p-4 rounded border-l-4 border-teal-400">
                    <p className="text-teal-200 text-sm">
                      <strong>Application:</strong> Verifying thermal performance under load conditions - critical for high-current rings
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Testing Procedure:</h4>
                    <div className="bg-card p-4 rounded space-y-2">
                      <p className="text-white text-sm"><strong>1. Baseline Measurements:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Record ambient temperature</li>
                        <li>• Measure cold resistance values</li>
                        <li>• Note cable routing and grouping factors</li>
                        <li>• Identify potential hot spots</li>
                      </ul>
                      
                      <p className="text-white text-sm mt-3"><strong>2. Load Application:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Apply design load for 4 hours minimum</li>
                        <li>• Monitor cable temperatures with IR thermometer</li>
                        <li>• Check termination temperatures</li>
                        <li>• Verify no excessive heating at connections</li>
                      </ul>
                      
                      <p className="text-white text-sm mt-3"><strong>3. Post-Load Testing:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Re-measure resistance when hot</li>
                        <li>• Compare with calculated temperature rise</li>
                        <li>• Verify thermal rating not exceeded</li>
                        <li>• Document results and any concerns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Fault Scenarios */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Real-World Fault Investigation Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Fault Scenario 1 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  Case Study: The "Mystery" Open Circuit
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-400">
                    <p className="text-red-200 text-sm">
                      <strong>Problem:</strong> End-to-end test shows ∞ (open circuit) on line conductor, but all sockets appear wired correctly
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Investigation Process:</h4>
                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded">
                        <p className="text-yellow-400 font-medium text-sm">Initial Observations</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• All sockets visually wired correctly</li>
                          <li>• Neutral and CPC show normal continuity</li>
                          <li>• Only line conductor shows open circuit</li>
                          <li>• Installation is 3 years old, previously working</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card p-3 rounded">
                        <p className="text-yellow-400 font-medium text-sm">Systematic Testing</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Test each socket back to previous socket</li>
                          <li>• Find break between sockets 4 and 5</li>
                          <li>• Cable route goes through kitchen extension</li>
                          <li>• Recent building work in that area</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card p-3 rounded">
                        <p className="text-yellow-400 font-medium text-sm">Root Cause Discovery</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Builder drilled through cable in wall cavity</li>
                          <li>• Screw went through line conductor only</li>
                          <li>• Neutral and CPC unaffected</li>
                          <li>• No RCD operation as no earth fault</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600/20 p-4 rounded border-l-4 border-green-400">
                    <p className="text-green-200 text-sm">
                      <strong>Solution:</strong> Cable re-routed around damaged section. New junction boxes installed 
                      with maintenance access. Always investigate recent building work when faults appear!
                    </p>
                  </div>
                </div>
              </div>

              {/* Fault Scenario 2 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Case Study: The Intermittent Cross-Connection
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-yellow-600/20 p-4 rounded border-l-4 border-yellow-400">
                    <p className="text-yellow-200 text-sm">
                      <strong>Problem:</strong> Cross-connection test sometimes passes, sometimes fails. Reading varies from ∞ to 15Ω
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Symptoms Observed:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Test results change between attempts</li>
                        <li>• Sometimes infinite, sometimes low resistance</li>
                        <li>• Problem worse in damp weather</li>
                        <li>• RCD occasionally trips during testing</li>
                        <li>• Some sockets work intermittently</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Investigation Strategy:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Test during different weather conditions</li>
                        <li>• Check insulation resistance when problem occurs</li>
                        <li>• Investigate external cable routes</li>
                        <li>• Test individual socket connections</li>
                        <li>• Check for water ingress signs</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded">
                    <h4 className="text-yellow-400 font-medium mb-2">Discovery:</h4>
                    <p className="text-white text-sm mb-2">
                      External junction box with poor IP rating allowing water ingress. 
                      When wet, insulation breaks down creating cross-connection path.
                    </p>
                    <ul className="text-white text-sm space-y-1">
                      <li>• Box located below gutter downpipe</li>
                      <li>• Corroded terminals and damp cable insulation</li>
                      <li>• Problem only occurs when box is wet</li>
                      <li>• Explains intermittent nature of fault</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fault Scenario 3 */}
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  Case Study: The "Perfect" Tests with No Ring
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-yellow-400/20 p-4 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200 text-sm">
                      <strong>Problem:</strong> All tests pass perfectly, but circuit doesn't behave like a ring. High voltage drop under load.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">The Investigation:</h4>
                    <div className="bg-card p-4 rounded space-y-2">
                      <p className="text-white text-sm"><strong>Initial Test Results:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• End-to-end continuity: 0.16Ω ✓</li>
                        <li>• Cross-connection tests: All ∞ ✓</li>
                        <li>• R1 + R2 measurements: 0.10Ω ✓</li>
                        <li>• All results within expected parameters</li>
                      </ul>
                      
                      <p className="text-white text-sm mt-3"><strong>Load Testing Reveals:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• 13A load causes 8V voltage drop</li>
                        <li>• Should be maximum 3-4V for ring circuit</li>
                        <li>• Load appears on one leg only at CU</li>
                        <li>• Current not splitting as expected</li>
                      </ul>
                      
                      <p className="text-white text-sm mt-3"><strong>Final Discovery:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Circuit wired as "figure-8" not true ring</li>
                        <li>• Junction box creates artificial end-to-end continuity</li>
                        <li>• But no load-sharing between legs</li>
                        <li>• Dangerous overloading of single leg possible</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-400">
                    <p className="text-red-200 text-sm">
                      <strong>Lesson:</strong> Continuity tests alone don't prove proper ring configuration. 
                      Always verify load distribution behavior on critical installations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Tips Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Info className="h-6 w-6 text-yellow-400" />
                Professional Tips & Industry Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">What Experienced Electricians Look For</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Green Flags (Good Installation):</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Consistent cable types throughout circuit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Logical socket arrangement following ring path</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>All terminations clean and tight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Readings match cable specifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Proper cable support and protection</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-red-400 font-medium mb-2">Red Flags (Investigation Needed):</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Readings much higher/lower than expected</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Large difference between line and neutral readings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Inconsistent results on repeated tests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Cross-connections showing unexpected readings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Evidence of modifications or repairs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Time Management for Commercial Work</h3>
                
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded">
                    <h4 className="text-yellow-400 font-medium mb-2">Typical Time Allocations:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="text-center">
                        <p className="text-white font-semibold">Simple Ring</p>
                        <p className="text-yellow-400 text-lg">15-20 mins</p>
                        <p className="text-white text-sm">Domestic, easy access</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold">Standard Ring</p>
                        <p className="text-yellow-400 text-lg">25-35 mins</p>
                        <p className="text-white text-sm">Commercial, normal access</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold">Complex Ring</p>
                        <p className="text-yellow-400 text-lg">45-60 mins</p>
                        <p className="text-white text-sm">Multiple levels, difficult access</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-400/20 p-4 rounded">
                      <h4 className="text-yellow-400 font-semibold mb-2">Speed Tips</h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Use R1+R2 method for most circuits</li>
                        <li>• Pre-organize test certificate</li>
                        <li>• Test similar circuits together</li>
                        <li>• Have helper for cable tracing</li>
                        <li>• Use appropriate test leads for situation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-600/20 p-4 rounded">
                      <h4 className="text-yellow-400 font-semibold mb-2">Quality Checks</h4>
                      <ul className="text-yellow-200 text-sm space-y-1">
                        <li>• Never rush the safety aspects</li>
                        <li>• Double-check unusual readings</li>
                        <li>• Verify isolation before starting</li>
                        <li>• Document any deviations found</li>
                        <li>• Re-energize systematically</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Examiner Expectations (City & Guilds / EAL)</h3>
                
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded">
                    <h4 className="text-yellow-400 font-medium mb-2">What Examiners Want to See:</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        <span><strong>Logical test sequence:</strong> Safe isolation → End-to-end → Cross-connection → R1+R2</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        <span><strong>Proper equipment setup:</strong> Nulled test leads, correct settings, calibrated meter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        <span><strong>Clear documentation:</strong> All readings recorded, any anomalies noted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        <span><strong>Safety awareness:</strong> Isolation checks, PPE, risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        <span><strong>Result interpretation:</strong> Explain what readings mean, identify problems</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-600/20 p-4 rounded">
                      <h4 className="text-green-400 font-semibold mb-2">Common Pass Criteria</h4>
                      <ul className="text-green-200 text-sm space-y-1">
                        <li>• Safe working throughout</li>
                        <li>• Correct test sequence followed</li>
                        <li>• Accurate readings obtained</li>
                        <li>• Results properly interpreted</li>
                        <li>• Clear, legible documentation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-600/20 p-4 rounded">
                      <h4 className="text-red-400 font-semibold mb-2">Common Fail Reasons</h4>
                      <ul className="text-red-200 text-sm space-y-1">
                        <li>• Inadequate isolation procedures</li>
                        <li>• Wrong test sequence or methods</li>
                        <li>• Failure to identify circuit faults</li>
                        <li>• Poor documentation or illegible writing</li>
                        <li>• Unsafe working practices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default RingFinalContinuityGuide;