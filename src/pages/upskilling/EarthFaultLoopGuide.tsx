import { ArrowLeft, Activity, Zap, Shield, CheckCircle, AlertTriangle, Info, Target, Settings, BookOpen, Eye, Gauge, Play, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EarthFaultLoopGuide = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px] touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Tests
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-cyan-600/40 text-cyan-300 hover:bg-cyan-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Impedance Testing
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Earth Fault Loop Impedance Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Step-by-step practical guide to measuring Ze and Zs with complete testing procedures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* PRACTICAL TESTING PROCEDURES - MOVED TO TOP */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Play className="h-6 w-6 text-elec-yellow" />
                How to Test: Complete Step-by-Step Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Quick Reference */}
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="text-elec-yellow font-semibold mb-2">Quick Test Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium">Ze (External) Test:</p>
                    <p className="text-white">At main switch: Line to Earth, all circuits OFF</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Zs (Circuit) Test:</p>
                    <p className="text-white">At socket outlets: Line to Earth, circuit ON</p>
                  </div>
                </div>
              </div>

              {/* Test 1: Ze Measurement - ENHANCED */}
              <div className="bg-transparent/80 p-6 rounded-lg border-l-4 border-elec-yellow">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-elec-yellow text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                  Testing Ze (External Earth Fault Loop Impedance)
                </h3>
                
                <div className="space-y-6">
                  {/* Safety First */}
                  <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-red-400" />
                      <h4 className="text-red-400 font-semibold">SAFETY FIRST - This is LIVE Testing</h4>
                    </div>
                    <ul className="text-red-200 text-sm space-y-1">
                      <li>• Wear safety helmet and arc flash PPE</li>
                      <li>• Use insulated tools and GS 38 compliant test leads</li>
                      <li>• Ensure you have someone aware of your testing</li>
                      <li>• Have emergency contact numbers available</li>
                    </ul>
                  </div>

                  {/* Equipment Setup */}
                  <div>
                    <h4 className="text-elec-yellow font-semibold mb-3">Equipment You Need:</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-elec-yellow/10 p-4 rounded">
                        <h5 className="text-white font-medium mb-2">Test Equipment:</h5>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Earth fault loop impedance tester (BS EN 61557-3)</li>
                          <li>• Test leads with correct ratings and GS 38 compliance</li>
                          <li>• Prove unit to verify tester is working</li>
                          <li>• Current calibration certificate (within 12 months)</li>
                        </ul>
                      </div>
                      <div className="bg-elec-yellow/10 p-4 rounded">
                        <h5 className="text-white font-medium mb-2">Safety Equipment:</h5>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Safety helmet with chin strap</li>
                          <li>• Arc flash face shield or protective clothing</li>
                          <li>• Insulated gloves (if required by risk assessment)</li>
                          <li>• Non-conductive footwear</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step by Step Procedure */}
                  <div>
                    <h4 className="text-elec-yellow font-semibold mb-3">Step-by-Step Procedure:</h4>
                    <div className="space-y-4">
                      
                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-elec-yellow text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                          <h5 className="text-white font-medium">Isolate All Circuits</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Turn OFF main switch at consumer unit</li>
                          <li>• Turn OFF all MCBs and RCBOs (all circuit breakers)</li>
                          <li>• Remove all fuses from fuseway (if applicable)</li>
                          <li>• Verify isolation with approved voltage indicator</li>
                          <li>• Apply warning labels: "DANGER - MEN WORKING"</li>
                        </ul>
                      </div>

                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-elec-yellow text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                          <h5 className="text-white font-medium">Connect Test Equipment</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Set tester to "Ze" or "External Loop" mode</li>
                          <li>• Connect LINE test lead to incoming LIVE terminal (before main switch)</li>
                          <li>• Connect EARTH test lead to main earthing terminal</li>
                          <li>• Ensure connections are tight and secure</li>
                          <li>• Double-check you're on incoming side of main switch</li>
                        </ul>
                      </div>

                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-elec-yellow text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                          <h5 className="text-white font-medium">Turn ON Main Switch & Test</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Turn ON main switch (supply now live to meter)</li>
                          <li>• Press TEST button on your meter</li>
                          <li>• Wait for reading to stabilise (typically 2-3 seconds)</li>
                          <li>• Record the reading in Ohms (Ω)</li>
                          <li>• Take reading 2-3 times to verify consistency</li>
                        </ul>
                      </div>

                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-elec-yellow text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                          <h5 className="text-white font-medium">Record & Secure</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Turn OFF main switch after testing</li>
                          <li>• Disconnect test leads from terminals</li>
                          <li>• Record Ze value on test certificate</li>
                          <li>• Note test equipment details and calibration date</li>
                          <li>• Keep main switch OFF until all testing complete</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Expected Results */}
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">What Results to Expect:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-green-300 font-medium">TN-C-S (PME):</p>
                        <p className="text-white text-sm">Usually 0.35Ω or lower</p>
                      </div>
                      <div>
                        <p className="text-green-300 font-medium">TN-S (Separate Earth):</p>
                        <p className="text-white text-sm">Usually 0.8Ω or lower</p>
                      </div>
                      <div>
                        <p className="text-green-300 font-medium">TT (Earth Rod):</p>
                        <p className="text-white text-sm">Usually 21Ω or higher</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test 2: Zs Measurement - ENHANCED */}
              <div className="bg-transparent/80 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</span>
                  Testing Zs (Circuit Earth Fault Loop Impedance)
                </h3>
                
                <div className="space-y-6">
                  {/* RCD Consideration */}
                  <div className="bg-elec-yellow/20 p-4 rounded-lg border border-elec-yellow/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                      <h4 className="text-elec-yellow font-semibold">RCD Protected Circuits</h4>
                    </div>
                    <p className="text-yellow-200 text-sm">
                      If circuit has RCD protection, you MUST use "no-trip" test mode or the RCD will trip during testing.
                      Set your meter to "Zs no-trip" or "Low current" mode.
                    </p>
                  </div>

                  {/* Step by Step for Socket Testing */}
                  <div>
                    <h4 className="text-green-400 font-semibold mb-3">Testing at Socket Outlets - Step by Step:</h4>
                    <div className="space-y-4">
                      
                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                          <h5 className="text-white font-medium">Energise the Circuit</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Turn ON main switch at consumer unit</li>
                          <li>• Turn ON the MCB/RCBO for the circuit you're testing</li>
                          <li>• Check circuit is live using voltage indicator</li>
                          <li>• Verify RCD (if present) is operational with test button</li>
                          <li>• Reset RCD if you tested it</li>
                        </ul>
                      </div>

                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                          <h5 className="text-white font-medium">Set Up Test Equipment</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Set meter to "Zs" mode (or "Zs no-trip" if RCD protected)</li>
                          <li>• Check test leads are in good condition</li>
                          <li>• Verify meter battery level is adequate</li>
                          <li>• Have your test certificate ready for recording results</li>
                        </ul>
                      </div>

                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                          <h5 className="text-white font-medium">Test at Socket Outlet</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Insert LINE test probe into LEFT slot of socket (Live terminal)</li>
                          <li>• Insert EARTH test probe into TOP slot of socket (Earth terminal)</li>
                          <li>• Ensure probes make good contact with terminals</li>
                          <li>• Press TEST button and wait for reading to stabilise</li>
                          <li>• Record reading in Ohms (Ω) on your certificate</li>
                        </ul>
                      </div>

                      <div className="bg-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                          <h5 className="text-white font-medium">Test Multiple Points</h5>
                        </div>
                        <ul className="text-white text-sm space-y-1 ml-9">
                          <li>• Test at FURTHEST socket on the circuit (highest Zs)</li>
                          <li>• Test at any sockets with different cable routes</li>
                          <li>• For ring circuits: test at multiple sockets around the ring</li>
                          <li>• Record all readings - document which socket gave highest reading</li>
                          <li>• Compare readings with maximum permitted values</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Common Problems */}
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h4 className="text-red-400 font-semibold mb-2">What If Things Go Wrong?</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-red-300 font-medium text-sm">RCD Trips During Test:</p>
                        <p className="text-white text-sm">Switch to "no-trip" mode or calculate Zs = Ze + (R1+R2)</p>
                      </div>
                      <div>
                        <p className="text-red-300 font-medium text-sm">Very High Reading:</p>
                        <p className="text-white text-sm">Check test lead connections, verify you're in correct socket terminals</p>
                      </div>
                      <div>
                        <p className="text-red-300 font-medium text-sm">Infinite Reading:</p>
                        <p className="text-white text-sm">No earth connection present - STOP and investigate immediately</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test 3: Calculation Method */}
              <div className="bg-transparent/80 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</span>
                  Alternative: Calculate Zs = Ze + (R1 + R2)
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-600/20 p-4 rounded border-l-4 border-purple-400">
                    <p className="text-purple-200 text-sm">
                      <strong>When to Use:</strong> When direct measurement trips RCDs, for verification, or when circuits can't be energised safely.
                    </p>
                  </div>

                  <div className="bg-transparent p-4 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-3">Simple Calculation Steps:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        <div>
                          <p className="text-white font-medium">Get your Ze value</p>
                          <p className="text-white text-sm">From your external loop test (Step 1 above)</p>
                          <p className="text-purple-400 font-mono text-sm">Example: Ze = 0.35Ω</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        <div>
                          <p className="text-white font-medium">Get your R1 + R2 value</p>
                          <p className="text-white text-sm">From your continuity testing results</p>
                          <p className="text-purple-400 font-mono text-sm">Example: R1 + R2 = 0.15Ω</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                        <div>
                          <p className="text-white font-medium">Add them together</p>
                          <p className="text-white text-sm">Simple addition: Ze + (R1 + R2)</p>
                          <p className="text-green-400 font-mono text-sm">Zs = 0.35 + 0.15 = 0.50Ω</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-elec-yellow/20 p-3 rounded border-l-4 border-elec-yellow">
                    <p className="text-yellow-200 text-sm">
                      <strong>Important:</strong> Calculated values are often slightly higher than measured values. 
                      Both methods are acceptable for BS 7671 compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Results Check */}
              <div className="bg-transparent/80 p-6 rounded-lg border-l-4 border-elec-yellow">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <Gauge className="h-6 w-6 text-elec-yellow" />
                  Quick Results Check - Are Your Readings OK?
                </h3>
                
                <div className="space-y-4">
                  <p className="text-white">
                    Your measured Zs must be LESS than these maximum values for the circuit to pass:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-600/20 p-4 rounded border border-green-600/30">
                      <h4 className="text-green-400 font-semibold">Lighting Circuits</h4>
                      <p className="text-green-300 text-2xl font-bold">6A = 7.67Ω</p>
                      <p className="text-white text-sm">Most domestic lighting</p>
                    </div>
                    
                    <div className="bg-elec-yellow/20 p-4 rounded border border-blue-600/30">
                      <h4 className="text-elec-yellow font-semibold">Socket Circuits</h4>
                      <p className="text-blue-300 text-2xl font-bold">16A = 2.87Ω</p>
                      <p className="text-white text-sm">Radial socket circuits</p>
                    </div>
                    
                    <div className="bg-purple-600/20 p-4 rounded border border-purple-600/30">
                      <h4 className="text-purple-400 font-semibold">Ring Final</h4>
                      <p className="text-purple-300 text-2xl font-bold">32A = 1.44Ω</p>
                      <p className="text-white text-sm">Ring final circuits</p>
                    </div>
                  </div>

                  <div className="bg-red-600/20 p-4 rounded border border-red-600/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <h4 className="text-red-400 font-semibold">If Your Reading is Higher:</h4>
                    </div>
                    <ul className="text-red-200 text-sm space-y-1">
                      <li>• STOP - Do not energise the circuit</li>
                      <li>• Check your test connections and try again</li>
                      <li>• Investigate for poor connections or damaged cables</li>
                      <li>• Circuit must be repaired before it can be used safely</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference Card */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Wrench className="h-6 w-6 text-elec-yellow" />
                Quick Reference - Testing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-semibold mb-3">Ze Test (External)</h3>
                  <ul className="text-white text-sm space-y-1">
                    <li>• Location: Main switch area</li>
                    <li>• Connections: Line to Earth</li>
                    <li>• Circuits: All OFF</li>
                    <li>• Typical values: 0.35-0.8Ω (TN), 21Ω+ (TT)</li>
                    <li>• Safety: Live testing - use PPE</li>
                  </ul>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-green-400 font-semibold mb-3">Zs Test (Circuit)</h3>
                  <ul className="text-white text-sm space-y-1">
                    <li>• Location: Socket outlets/end points</li>
                    <li>• Connections: Line to Earth</li>
                    <li>• Circuits: ON (energised)</li>
                    <li>• RCD circuits: Use no-trip mode</li>
                    <li>• Compare: Against max permitted values</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-6">
                <h4 className="text-elec-yellow font-semibold mb-2">Remember: Safety Always Comes First</h4>
                <p className="text-white text-sm">
                  If you're not 100% confident about any aspect of these tests, seek guidance from a qualified supervisor. 
                  These are live electrical tests that require proper training and safety precautions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* THEORY SECTIONS MOVED BELOW - Keep existing content but moved down */}
          
          {/* BS7671 Reference Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                BS 7671 Requirements & Reference Tables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-elec-yellow/20 p-4 rounded-lg border border-blue-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-elec-yellow font-semibold">Where to Find Maximum Zs Values in BS 7671</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">Primary Tables:</h5>
                    <ul className="text-blue-200 text-sm space-y-1">
                      <li>• <strong>Table 41.2:</strong> Maximum earth fault loop impedance (Zs) for 0.4s disconnection</li>
                      <li>• <strong>Table 41.3:</strong> Maximum earth fault loop impedance (Zs) for 5s disconnection</li>
                      <li>• <strong>Table 41.4:</strong> Maximum earth fault loop impedance for RCD protection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Key Regulation References:</h5>
                    <ul className="text-blue-200 text-sm space-y-1">
                      <li>• <strong>Section 411:</strong> Protective measures (ADS)</li>
                      <li>• <strong>Section 643:</strong> Initial verification</li>
                      <li>• <strong>Section 654:</strong> Periodic inspection</li>
                      <li>• <strong>Appendix 3:</strong> Time/current characteristics</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-elec-yellow/20 p-3 rounded mt-3">
                  <p className="text-yellow-200 text-sm">
                    <strong>Important:</strong> Always use the current edition of BS 7671:2018+A3:2024. Values may change between editions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding the Terms */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Info className="h-6 w-6 text-elec-yellow" />
                Understanding Ze, Zs, and R1+R2
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-elec-yellow/40 text-blue-300 border-0 font-mono">Ze</Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">External Impedance</h3>
                  <p className="text-white text-sm mb-2">Impedance of the supply system before your installation</p>
                  <p className="text-green-400 text-sm">Typical: 0.35Ω (PME), 0.8Ω (TN-S)</p>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-green-600/40 text-green-300 border-0 font-mono">Zs</Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Total Loop Impedance</h3>
                  <p className="text-white text-sm mb-2">Complete earth fault loop path impedance</p>
                  <p className="text-green-400 text-sm">Must be less than max permitted values</p>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-purple-600/40 text-purple-300 border-0 font-mono">R1+R2</Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Circuit Resistance</h3>
                  <p className="text-white text-sm mb-2">Line and CPC conductor resistance</p>
                  <p className="text-green-400 text-sm">From continuity testing</p>
                </div>
              </div>
              
              <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                <h4 className="text-elec-yellow font-semibold mb-2">The Relationship</h4>
                <p className="text-blue-200 text-lg font-mono">Zs = Ze + (R1 + R2)</p>
                <p className="text-blue-200 text-sm mt-2">
                  Total loop impedance equals external impedance plus circuit impedance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Maximum Permitted Values Table */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Gauge className="h-6 w-6 text-elec-yellow" />
                Maximum Permitted Zs Values (BS 7671 Table 41.2)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white font-semibold p-3">Device</th>
                      <th className="text-left text-white font-semibold p-3">Rating</th>
                      <th className="text-left text-white font-semibold p-3">Max Zs (Ω)</th>
                      <th className="text-left text-white font-semibold p-3">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="text-white p-3">MCB Type B</td>
                      <td className="text-white p-3">6A</td>
                      <td className="text-green-400 p-3 font-bold">7.67Ω</td>
                      <td className="text-white p-3">Lighting circuits</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="text-white p-3">MCB Type B</td>
                      <td className="text-white p-3">16A</td>
                      <td className="text-green-400 p-3 font-bold">2.87Ω</td>
                      <td className="text-white p-3">Radial sockets</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="text-white p-3">MCB Type B</td>
                      <td className="text-white p-3">20A</td>
                      <td className="text-green-400 p-3 font-bold">2.30Ω</td>
                      <td className="text-white p-3">Radial sockets</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="text-white p-3">MCB Type B</td>
                      <td className="text-white p-3">32A</td>
                      <td className="text-green-400 p-3 font-bold">1.44Ω</td>
                      <td className="text-white p-3">Ring final circuits</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="text-white p-3">MCB Type B</td>
                      <td className="text-white p-3">40A</td>
                      <td className="text-green-400 p-3 font-bold">1.15Ω</td>
                      <td className="text-white p-3">Cooker circuits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-orange-600/20 p-4 rounded-lg border border-orange-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <h4 className="text-orange-400 font-semibold">Critical Safety Point</h4>
                </div>
                <p className="text-orange-200 text-sm">
                  Your measured Zs must be LESS than these values for safe operation. 
                  If higher, the protective device may not operate quickly enough during an earth fault.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why We Test Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Why We Test Earth Fault Loop Impedance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-elec-yellow" />
                    <h3 className="text-white font-semibold">Safety Critical</h3>
                  </div>
                  <p className="text-white text-sm">Ensures protective devices will operate quickly enough to prevent dangerous touch voltages</p>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    <h3 className="text-white font-semibold">Legal Requirement</h3>
                  </div>
                  <p className="text-white text-sm">BS 7671 requires earth fault loop impedance to be measured and recorded</p>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-elec-yellow" />
                    <h3 className="text-white font-semibold">Protection Coordination</h3>
                  </div>
                  <p className="text-white text-sm">Verifies that Zs values allow protective devices to operate within required times</p>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                    <h3 className="text-white font-semibold">Installation Verification</h3>
                  </div>
                  <p className="text-white text-sm">Confirms the earth fault path is effective and has adequate capacity</p>
                </div>
              </div>
              
              <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h4 className="text-red-400 font-semibold">Critical Safety Point</h4>
                </div>
                <p className="text-red-200 text-sm">
                  If Zs is too high, protective devices won't operate fast enough during earth faults, 
                  potentially causing dangerous touch voltages that could be fatal.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default EarthFaultLoopGuide;
