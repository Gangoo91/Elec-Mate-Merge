import { ArrowLeft, Target, Shield, Zap, CheckCircle, AlertTriangle, Info, Settings, BookOpen, Eye, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PolarityTestingGuide = () => {
  const whyWeTest = [
    {
      title: "Safety Critical",
      description: "Ensures single-pole devices only switch the phase conductor, preventing dangerous situations",
      icon: Shield
    },
    {
      title: "Legal Requirement", 
      description: "BS 7671 requires polarity verification for all single-pole switching devices",
      icon: CheckCircle
    },
    {
      title: "Functional Safety",
      description: "Prevents equipment damage and ensures proper operation of devices",
      icon: Zap
    },
    {
      title: "Installation Integrity",
      description: "Verifies correct identification and connection of conductors throughout",
      icon: Target
    }
  ];

  const whatToCheck = [
    {
      item: "Single-pole switches",
      requirement: "Must only switch phase conductor",
      danger: "Switched neutral leaves phase live when off",
      location: "All lighting switches, isolators"
    },
    {
      item: "Socket outlets",
      requirement: "Phase to phase terminal, neutral to neutral terminal",
      danger: "Reversed polarity can cause equipment damage",
      location: "All socket outlets, especially single sockets"
    },
    {
      item: "Fuses and MCBs",
      requirement: "Must be in phase conductor only",
      danger: "Protection in neutral conductor is ineffective",
      location: "Consumer units, distribution boards"
    },
    {
      item: "Edison screw lampholders",
      requirement: "Phase to centre contact, neutral to screw thread",
      danger: "Live screw thread presents shock risk",
      location: "ES lamp fittings, pendant lights"
    },
    {
      item: "Fixed equipment",
      requirement: "Correct phase/neutral identification maintained",
      danger: "Equipment malfunction or damage",
      location: "Boilers, immersion heaters, motors"
    }
  ];

  const testMethods = [
    {
      method: "Continuity Method (Preferred)",
      description: "Dead testing using low-resistance ohmmeter with temporary link",
      when: "Initial verification, safest method",
      equipment: "Low-resistance ohmmeter, test leads, temporary links",
      safety: "Dead testing - no electrical hazards"
    },
    {
      method: "Live Testing",
      description: "Testing on energised circuits using voltage indicator",
      when: "Periodic inspection, verification of live circuits",
      equipment: "Approved voltage indicator, test lamp",
      safety: "Live working - requires additional precautions"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Tests
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-orange-600/40 text-orange-300 hover:bg-orange-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Verification Testing
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Polarity Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Complete guide to verifying correct polarity of single-pole devices and socket outlets
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Why We Test Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Why Polarity Testing is Critical
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyWeTest.map((reason, index) => {
                  const IconComponent = reason.icon;
                  return (
                    <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-5 w-5 text-elec-yellow" />
                        <h3 className="text-white font-semibold">{reason.title}</h3>
                      </div>
                      <p className="text-white text-sm">{reason.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h4 className="text-red-400 font-semibold">Deadly Danger</h4>
                </div>
                <p className="text-red-200 text-sm">
                  Incorrect polarity can be fatal. A switch in the neutral conductor leaves the phase conductor 
                  permanently live, creating a shock risk even when the switch is "off".
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What to Check */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Eye className="h-6 w-6 text-elec-yellow" />
                What Must Be Checked for Polarity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {whatToCheck.map((check, index) => (
                <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">{check.item}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div>
                      <p className="text-green-400 font-medium text-sm">Requirement:</p>
                      <p className="text-white text-xs">{check.requirement}</p>
                    </div>
                    <div>
                      <p className="text-red-400 font-medium text-sm">If Wrong:</p>
                      <p className="text-white text-xs">{check.danger}</p>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-medium text-sm">Found At:</p>
                      <p className="text-white text-xs">{check.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Test Methods Overview */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Polarity Test Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testMethods.map((method, index) => (
                <div key={index} className="bg-transparent/80 p-6 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-3">{method.method}</h3>
                  <p className="text-white text-sm mb-4">{method.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-2">When to Use:</h4>
                      <p className="text-white text-sm">{method.when}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Equipment Needed:</h4>
                      <p className="text-white text-sm">{method.equipment}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-2">Safety Level:</h4>
                      <p className="text-white text-sm">{method.safety}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Step-by-Step Testing Guide */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-elec-yellow" />
                Step-by-Step: How to Test Polarity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Method 1: Continuity Testing */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-elec-yellow text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  Continuity Method (Dead Testing) - PREFERRED
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                    <p className="text-blue-200 text-sm">
                      <strong>Safest Method:</strong> Tests with circuit isolated - no electrical danger
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Testing Single-Pole Switches */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Testing Single-Pole Switches:</h4>
                      <div className="bg-transparent p-4 rounded">
                        <div className="space-y-3">
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Step 1: Preparation</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• Isolate circuit and prove dead</li>
                              <li>• At consumer unit, disconnect phase conductor from MCB</li>
                              <li>• Connect temporary link between phase conductor and CPC</li>
                              <li>• Set up low-resistance ohmmeter</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Step 2: Testing</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• Go to switch location</li>
                              <li>• Set switch to OFF position</li>
                              <li>• Test between switch live terminal and earth</li>
                              <li>• Should read OPEN CIRCUIT (∞Ω) - no continuity</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Step 3: Verification</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• Set switch to ON position</li>
                              <li>• Test between switch live terminal and earth</li>
                              <li>• Should read LOW RESISTANCE (similar to R1+R2 value)</li>
                              <li>• This confirms switch is in phase conductor</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testing Socket Outlets */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Testing Socket Outlets:</h4>
                      <div className="bg-transparent p-4 rounded">
                        <div className="space-y-3">
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Method: Cross-Connection Test</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• With circuit isolated, link phase to earth at consumer unit</li>
                              <li>• Test phase terminal to earth terminal at socket</li>
                              <li>• Should show continuity (low resistance)</li>
                              <li>• Test neutral terminal to earth terminal at socket</li>
                              <li>• Should show open circuit (∞Ω)</li>
                            </ul>
                          </div>
                          
                          <div className="bg-green-600/20 p-3 rounded">
                            <p className="text-green-200 text-sm">
                              <strong>Correct Result:</strong> Phase terminal shows continuity to earth, 
                              neutral terminal shows open circuit to earth.
                            </p>
                          </div>
                          
                          <div className="bg-red-600/20 p-3 rounded">
                            <p className="text-red-200 text-sm">
                              <strong>Wrong Polarity:</strong> If results are reversed, 
                              phase and neutral connections are swapped at the socket.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testing Edison Screw Lampholders */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Testing Edison Screw (ES) Lampholders:</h4>
                      <div className="bg-transparent p-4 rounded">
                        <div className="space-y-3">
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Critical Safety Test:</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• Remove lamp from ES fitting</li>
                              <li>• With phase linked to earth at CU</li>
                              <li>• Test centre contact to earth - should show continuity</li>
                              <li>• Test screw thread to earth - should show open circuit</li>
                            </ul>
                          </div>
                          
                          <div className="bg-orange-600/20 p-3 rounded">
                            <p className="text-orange-200 text-sm">
                              <strong>Why Critical:</strong> If screw thread is live, anyone changing a bulb 
                              risks electrocution by touching the metal screw thread.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 2: Live Testing */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Live Testing Method - CAUTION REQUIRED
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-400">
                    <p className="text-red-200 text-sm">
                      <strong>Safety Warning:</strong> Live testing requires additional safety measures and should only be done by competent persons
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Using Approved Voltage Indicator:</h4>
                      <div className="bg-transparent p-4 rounded">
                        <div className="space-y-3">
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Switch Testing:</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• Set switch to OFF position</li>
                              <li>• Test between switch output and neutral</li>
                              <li>• Should read 0V if correctly wired</li>
                              <li>• If reads 230V, switch is in neutral (incorrect)</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="text-elec-yellow font-medium text-sm">Socket Testing:</p>
                            <ul className="text-white text-sm space-y-1 ml-4">
                              <li>• Insert voltage indicator into socket</li>
                              <li>• Test between slots - should read 230V</li>
                              <li>• Test each slot to earth</li>
                              <li>• Phase to earth: 230V, Neutral to earth: 0V</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                      <p className="text-yellow-200 text-sm">
                        <strong>Safety Requirements for Live Testing:</strong> Use proper PPE, 
                        GS38 compliant test equipment, and follow safe working procedures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Examples */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Eye className="h-6 w-6 text-elec-yellow" />
                Real-World Testing Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-4">Scenario 1: Lighting Circuit Polarity Test (PASS)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Setup:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• 6A lighting circuit with 8 switches</li>
                      <li>• Mix of one-way and two-way switches</li>
                      <li>• New installation</li>
                      <li>• Testing using continuity method</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">Switch OFF: ∞Ω (open circuit) ✓</p>
                      <p className="text-green-400 font-mono text-sm">Switch ON: 0.15Ω (continuity) ✓</p>
                      <p className="text-green-400 font-mono text-sm">All 8 switches tested ✓</p>
                      <p className="text-green-400 font-mono text-sm">All show correct polarity ✓</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>Result:</strong> PASS - All switches correctly wired in phase conductor. Safe to energise.
                </p>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-4">Scenario 2: Socket Outlet Polarity Problem (FAIL)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Setup:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• 32A ring final circuit</li>
                      <li>• 12 double socket outlets</li>
                      <li>• Older installation, recent addition</li>
                      <li>• Customer reports equipment problems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">Sockets 1-10: Correct polarity ✓</p>
                      <p className="text-red-400 font-mono text-sm">Socket 11: Phase/neutral swapped ✗</p>
                      <p className="text-red-400 font-mono text-sm">Socket 12: Phase/neutral swapped ✗</p>
                      <p className="text-white font-mono text-sm">Recently added extension...</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>Action Required:</strong> Rectify incorrect connections at sockets 11 and 12 before re-energising. 
                  Check installation of recent extension work.
                </p>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-elec-yellow font-semibold mb-4">Scenario 3: ES Lampholder Safety Issue (CRITICAL)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Setup:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• Bathroom pendant light with ES fitting</li>
                      <li>• Customer reported "tingling" when changing bulb</li>
                      <li>• Old ceramic ES lampholder</li>
                      <li>• Testing with continuity method</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-red-400 font-mono text-sm">Centre contact to earth: ∞Ω ✗</p>
                      <p className="text-red-400 font-mono text-sm">Screw thread to earth: 0.12Ω ✗</p>
                      <p className="text-red-400 font-mono text-sm">Polarity completely reversed!</p>
                      <p className="text-red-400 font-mono text-sm">IMMEDIATE SAFETY RISK</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>URGENT ACTION:</strong> Do not energise. Screw thread is live - potentially fatal shock risk. 
                  Correct connections immediately before any further use.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Common Problems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                Common Polarity Problems & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Switch Shows Continuity When OFF</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">What This Means:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Switch is wired in neutral conductor</li>
                        <li>• Phase remains live when switch is "off"</li>
                        <li>• Potential shock risk to anyone touching fitting</li>
                        <li>• Equipment may not fully isolate</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solution:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Swap phase and neutral at switch</li>
                        <li>• Check connections at ceiling rose/fitting</li>
                        <li>• Verify at consumer unit if needed</li>
                        <li>• Re-test to confirm correction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Socket Polarity Reversed</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Phase and neutral swapped at socket</li>
                        <li>• Incorrect wiring during installation</li>
                        <li>• Mixed up during maintenance work</li>
                        <li>• Cable colours not followed correctly</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Fix Process:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Isolate circuit and prove dead</li>
                        <li>• Remove socket faceplate</li>
                        <li>• Swap connections at terminals</li>
                        <li>• Check cable identification</li>
                        <li>• Re-test polarity before energising</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: MCB/Fuse in Neutral</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Serious Safety Issue:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Protection device ineffective</li>
                        <li>• Circuit remains live when "isolated"</li>
                        <li>• Dangerous for maintenance work</li>
                        <li>• Regulation 132.14 violation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Correction Required:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Isolate main supply</li>
                        <li>• Swap connections at consumer unit</li>
                        <li>• Ensure all single-pole devices in phase</li>
                        <li>• Test all circuits affected</li>
                        <li>• Update circuit charts/labels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Assessment Tips */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Course Assessment & Exam Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-semibold mb-3">Assessment Expectations</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Demonstrate safe isolation procedures
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Use continuity method correctly
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Interpret test results accurately
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Identify and explain polarity faults
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Complete test certificates correctly
                    </li>
                  </ul>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Common Assessment Errors</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Not proving dead before testing
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Incorrect test lead connections
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Misinterpreting test results
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Not testing in both switch positions
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Forgetting to remove temporary links
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-400 font-semibold">Exam Success Strategy</h4>
                </div>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Always use the continuity method unless specifically asked to use live testing</li>
                  <li>• Remember: switch OFF = ∞Ω, switch ON = low resistance (if correctly wired)</li>
                  <li>• Be able to explain the safety implications of incorrect polarity</li>
                  <li>• Practice identifying all items that require polarity testing</li>
                  <li>• Understand why certain items (like ES lampholders) are critical for safety</li>
                  <li>• Always state the action you would take if polarity is found to be incorrect</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Testing Scenarios */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-elec-yellow" />
                Advanced Testing Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-4">Complex Circuit Testing</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-3">Two-Way and Intermediate Switching</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        <strong>Challenge:</strong> Multiple switches controlling one light - which conductor is switched?
                      </p>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Testing Method:</p>
                        <ol className="text-white text-sm space-y-1 ml-4">
                          <li>1. Link phase to earth at consumer unit</li>
                          <li>2. Test each switch terminal to earth</li>
                          <li>3. Operate switches in sequence</li>
                          <li>4. Map the switching path through all positions</li>
                          <li>5. Verify final switching device controls phase only</li>
                        </ol>
                      </div>
                      
                      <div className="bg-orange-600/20 p-3 rounded">
                        <p className="text-orange-200 text-sm">
                          <strong>Key Point:</strong> The actual switching point may be at any switch in the circuit. 
                          Test all positions to confirm phase control.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-3">Three-Phase Equipment Testing</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        <strong>Application:</strong> Motors, distribution boards, commercial equipment
                      </p>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Extended Test Requirements:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Test each phase conductor to earth separately</li>
                          <li>• Verify correct phase rotation at equipment</li>
                          <li>• Check all protective devices are in phase conductors</li>
                          <li>• Confirm neutral isolation where applicable</li>
                          <li>• Document phase labelling (L1, L2, L3)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-600/20 p-3 rounded">
                        <p className="text-red-200 text-sm">
                          <strong>Critical Safety:</strong> Incorrect phase rotation can damage motors and 
                          create dangerous mechanical rotation direction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-4">Specialist Applications</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-semibold mb-3">Emergency Lighting Circuits</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Special Considerations:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Maintained vs non-maintained fittings</li>
                          <li>• Central battery system connections</li>
                          <li>• Switch live and permanent live supplies</li>
                          <li>• Control panel polarity requirements</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-green-400 font-medium text-sm">Testing Protocol:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Isolate both normal and emergency supplies</li>
                          <li>• Test each supply path separately</li>
                          <li>• Verify switching arrangements for both supplies</li>
                          <li>• Check control circuit polarity</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-semibold mb-3">Fire Alarm and Security Systems</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-red-400 font-medium text-sm">Critical Requirements:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Positive and negative supply identification</li>
                          <li>• EOL (End of Line) device polarity</li>
                          <li>• Zone circuit polarity verification</li>
                          <li>• Power supply unit output polarity</li>
                        </ul>
                      </div>
                      
                      <div className="bg-elec-yellow/20 p-3 rounded">
                        <p className="text-yellow-200 text-sm">
                          <strong>Important:</strong> Incorrect polarity in fire alarm circuits can prevent 
                          proper operation during emergencies - life safety critical.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment and Tool Guidance */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Professional Equipment & Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-elec-yellow font-semibold mb-4">Essential Test Equipment for Polarity Testing</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Continuity Testing (Preferred Method)</h4>
                    <div className="bg-transparent p-4 rounded">
                      <div className="space-y-3">
                        <div>
                          <p className="text-green-400 font-medium text-sm">Low-Resistance Ohmmeter Features:</p>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Test current: 200mA minimum (BS 7671)</li>
                            <li>• Resolution: 0.01Ω minimum</li>
                            <li>• Auto-ranging capability</li>
                            <li>• Null function for lead resistance</li>
                            <li>• Battery condition indicator</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-elec-yellow font-medium text-sm">Additional Requirements:</p>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Flying leads for temporary connections</li>
                            <li>• Crocodile clips for secure connections</li>
                            <li>• Extension leads for distant test points</li>
                            <li>• Insulated probe tips</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Live Testing Equipment</h4>
                    <div className="bg-transparent p-4 rounded">
                      <div className="space-y-3">
                        <div>
                          <p className="text-orange-400 font-medium text-sm">Voltage Indicator Requirements:</p>
                          <ul className="text-white text-sm space-y-1">
                            <li>• GS38 compliant test probes</li>
                            <li>• Proven before and after use</li>
                            <li>• Clear indication of voltage presence</li>
                            <li>• Suitable for installation voltage</li>
                            <li>• Current calibration certificate</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-red-400 font-medium text-sm">Safety Equipment:</p>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Arc flash PPE appropriate to installation</li>
                            <li>• Insulated tools and equipment</li>
                            <li>• Emergency procedures documented</li>
                            <li>• Competent person supervision</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                  <p className="text-blue-200 text-sm">
                    <strong>Best Practice:</strong> Always use continuity testing for initial verification. 
                    Reserve live testing for periodic inspection or where dead testing is impractical.
                  </p>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-orange-400 font-semibold mb-4">Test Documentation and Records</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-medium mb-3">Essential Information to Record</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-elec-yellow font-medium text-sm mb-2">Circuit Details:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Circuit designation/number</li>
                          <li>• Type of circuit (lighting, power, etc.)</li>
                          <li>• Protective device rating and type</li>
                          <li>• Cable type and installation method</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-green-400 font-medium text-sm mb-2">Test Results:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Test method used (continuity/live)</li>
                          <li>• Each item tested (switches, sockets, etc.)</li>
                          <li>• Pass/fail result for each item</li>
                          <li>• Any remedial action required</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-medium mb-3">Certification Requirements</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        For compliance with BS 7671, polarity test results must be recorded on:
                      </p>
                      
                      <ul className="text-white text-sm space-y-1">
                        <li>• Electrical Installation Certificate (new work)</li>
                        <li>• Minor Electrical Installation Works Certificate (additions)</li>
                        <li>• Electrical Installation Condition Report (inspections)</li>
                        <li>• Periodic Inspection and Testing documentation</li>
                      </ul>
                      
                      <div className="bg-green-600/20 p-3 rounded mt-3">
                        <p className="text-green-200 text-sm">
                          <strong>Remember:</strong> All polarity tests must show "PASS" before the installation 
                          can be certified as compliant with BS 7671.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting and Assessment */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-elec-yellow" />
                Advanced Troubleshooting & Assessment Prep
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-4">Complex Fault Scenarios</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-3">Scenario: "The Intermittent Polarity Fault"</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        <strong>Problem:</strong> Socket outlet tests correctly when isolated, fails when circuit energised.
                      </p>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Investigation Steps:</p>
                        <ol className="text-white text-sm space-y-1 ml-4">
                          <li>1. Check for parallel neutral paths through other circuits</li>
                          <li>2. Verify consumer unit neutral bar connections</li>
                          <li>3. Test with all other circuits isolated</li>
                          <li>4. Check for shared neutral arrangements</li>
                          <li>5. Examine junction box connections in circuit</li>
                          <li>6. Test individual socket spurs separately</li>
                        </ol>
                      </div>
                      
                      <div className="bg-red-600/20 p-3 rounded">
                        <p className="text-red-200 text-sm">
                          <strong>Common Cause:</strong> Neutral and earth connected somewhere in the installation, 
                          creating alternative current paths that affect polarity testing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-3">Scenario: "The Reversed Consumer Unit"</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        <strong>Discovery:</strong> Multiple circuits showing incorrect polarity after consumer unit replacement.
                      </p>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Root Cause Analysis:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Supply tails connected incorrectly at main switch</li>
                          <li>• Affects all outgoing circuits simultaneously</li>
                          <li>• Protective devices now in neutral conductors</li>
                          <li>• Potentially dangerous - immediate isolation required</li>
                          <li>• Requires supply authority disconnection to rectify</li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-600/20 p-3 rounded">
                        <p className="text-orange-200 text-sm">
                          <strong>Action Required:</strong> Do not attempt to energise. Contact DNO/supplier 
                          for supply disconnection before correcting main connections.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-4">Assessment Success Strategies</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-medium mb-3">What Assessors Look For</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-green-400 font-medium text-sm mb-2">Technical Competence:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Correct test method selection</li>
                          <li>• Proper equipment setup and use</li>
                          <li>• Accurate result interpretation</li>
                          <li>• Appropriate follow-up actions</li>
                          <li>• Clear documentation of findings</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm mb-2">Safety Awareness:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Risk assessment before testing</li>
                          <li>• Proper isolation procedures</li>
                          <li>• Recognition of dangerous situations</li>
                          <li>• Appropriate PPE selection and use</li>
                          <li>• Emergency procedure knowledge</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-medium mb-3">Common Assessment Mistakes</h4>
                    <div className="space-y-3">
                      <ul className="text-white text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Attempting live testing without proper safety measures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Not testing all required items in the circuit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Misunderstanding two-way switching arrangements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Failing to document environmental conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Not explaining the safety implications of incorrect polarity</span>
                        </li>
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

export default PolarityTestingGuide;