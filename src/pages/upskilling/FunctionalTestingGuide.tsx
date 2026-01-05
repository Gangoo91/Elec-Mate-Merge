import { ArrowLeft, Settings, CheckCircle, Power, RotateCcw, AlertTriangle, FileText, Eye, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const FunctionalTestingGuide = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Assessment
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Functional Testing Guide</h1>
            <p className="text-xl text-white">Complete procedures for testing operation of electrical equipment and controls</p>
            <div className="flex justify-center gap-3">
              <Badge variant="secondary" className="bg-yellow-400 text-black">BS 7671:2018+A2</Badge>
              <Badge variant="outline" className="border-gray-600 text-white">Section 643</Badge>
            </div>
          </div>

          {/* What is Functional Testing */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                What is Functional Testing?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white">
                Functional testing verifies that all electrical equipment, protective devices, switchgear, 
                and control systems operate correctly and safely as designed. This is the final test in the inspection and testing sequence.
              </p>
              <div className="bg-card p-4 rounded">
                <h4 className="text-white font-semibold mb-2">Key Requirements:</h4>
                <ul className="text-sm space-y-1">
                  <li>• All switches and isolators operate correctly</li>
                  <li>• Control equipment functions as intended</li>
                  <li>• Protective devices trip when required</li>
                  <li>• Emergency systems activate properly</li>
                  <li>• Interlocks and safety systems work correctly</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Items to Test */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Equipment Requiring Functional Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Switching Equipment */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                    <Power className="h-4 w-4" />
                    Switching Equipment
                  </h3>
                  <div className="bg-card p-4 rounded space-y-2">
                    <h4 className="text-white font-medium">Main Switches & Isolators:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Consumer unit main switch</li>
                      <li>• Emergency stop switches</li>
                      <li>• Isolator switches</li>
                      <li>• Local isolation switches</li>
                    </ul>
                    <h4 className="text-white font-medium mt-3">Circuit Protection:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• MCBs and RCBOs</li>
                      <li>• RCD test buttons</li>
                      <li>• AFDDs where fitted</li>
                      <li>• Surge protection devices</li>
                    </ul>
                  </div>
                </div>

                {/* Control Systems */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Control Systems
                  </h3>
                  <div className="bg-card p-4 rounded space-y-2">
                    <h4 className="text-white font-medium">Lighting Controls:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Light switches (1-way, 2-way, intermediate)</li>
                      <li>• Dimmer switches</li>
                      <li>• PIR/occupancy sensors</li>
                      <li>• Emergency lighting systems</li>
                    </ul>
                    <h4 className="text-white font-medium mt-3">Heating/Ventilation:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Immersion heater controls</li>
                      <li>• Storage heater controls</li>
                      <li>• Extractor fan controls</li>
                      <li>• Thermostat operation</li>
                    </ul>
                  </div>
                </div>

                {/* Safety Systems */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Safety Systems
                  </h3>
                  <div className="bg-card p-4 rounded space-y-2">
                    <h4 className="text-white font-medium">Emergency Systems:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Fire alarm systems</li>
                      <li>• Emergency lighting</li>
                      <li>• Door access controls</li>
                      <li>• Intruder alarm systems</li>
                    </ul>
                    <h4 className="text-white font-medium mt-3">Safety Devices:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Door interlocks</li>
                      <li>• Safety barriers</li>
                      <li>• Emergency stop systems</li>
                      <li>• Lock-off mechanisms</li>
                    </ul>
                  </div>
                </div>

                {/* Socket Outlets & Equipment */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Outlets & Equipment
                  </h3>
                  <div className="bg-card p-4 rounded space-y-2">
                    <h4 className="text-white font-medium">Socket Outlets:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Standard 13A sockets</li>
                      <li>• USB socket outlets</li>
                      <li>• Industrial socket outlets</li>
                      <li>• Outdoor socket outlets</li>
                    </ul>
                    <h4 className="text-white font-medium mt-3">Fixed Equipment:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Fixed heating appliances</li>
                      <li>• Electric vehicle charging points</li>
                      <li>• Water heating controls</li>
                      <li>• Motor control equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Procedures */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Functional Testing Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Preparation */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">1. Preparation and Safety</h3>
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded">
                  <h4 className="text-red-300 font-semibold mb-2">⚠️ Safety Requirements</h4>
                  <ul className="text-sm space-y-1 text-red-200">
                    <li>• Complete all dead testing before functional testing</li>
                    <li>• Ensure installation is safe for energising</li>
                    <li>• Inform all users that testing is taking place</li>
                    <li>• Have safety equipment readily available</li>
                    <li>• Test in logical sequence to minimise disruption</li>
                  </ul>
                </div>
              </div>

              {/* Step 2: Main Switching */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">2. Main Switching and Isolation</h3>
                <div className="bg-card p-4 rounded space-y-3">
                  <h4 className="text-white font-semibold">Test Sequence:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li><strong>Main Switch Operation:</strong>
                      <ul className="ml-6 mt-1 space-y-1 text-white">
                        <li>• Operate main switch OFF - all circuits should disconnect</li>
                        <li>• Check switch operates smoothly without sticking</li>
                        <li>• Verify positive ON/OFF indication</li>
                        <li>• Operate switch ON - supply should restore</li>
                      </ul>
                    </li>
                    <li><strong>Individual MCB/RCBO Testing:</strong>
                      <ul className="ml-6 mt-1 space-y-1 text-white">
                        <li>• Test each MCB/RCBO operates correctly</li>
                        <li>• Check switching action is positive and firm</li>
                        <li>• Verify circuit disconnection when switched OFF</li>
                        <li>• Test RCBO test button (if fitted)</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Step 3: RCD Testing */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">3. RCD Test Button Operation</h3>
                <div className="bg-card p-4 rounded space-y-3">
                  <h4 className="text-white font-semibold">Test Button Procedure:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Press and hold test button firmly</li>
                    <li>RCD should trip immediately (within 1 second)</li>
                    <li>All protected circuits should lose power</li>
                    <li>Release test button and reset RCD</li>
                    <li>Verify power restoration to all circuits</li>
                  </ol>
                  <div className="bg-yellow-950/30 border border-yellow-400/30 p-3 rounded mt-3">
                    <p className="text-yellow-200 text-sm"><strong>Note:</strong> Test button only confirms RCD mechanical operation - electrical testing still required separately.</p>
                  </div>
                </div>
              </div>

              {/* Step 4: Lighting Controls */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">4. Lighting Control Systems</h3>
                <div className="bg-card p-4 rounded space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Switch Testing:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 1-way switches: ON/OFF operation</li>
                        <li>• 2-way switches: Control from both positions</li>
                        <li>• Intermediate: Multiple switching points</li>
                        <li>• Dimmer switches: Full range operation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Automatic Controls:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• PIR sensors: Detection and timing</li>
                        <li>• Photocells: Light level response</li>
                        <li>• Time switches: Programming and operation</li>
                        <li>• Presence detectors: Sensitivity settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5: Socket Outlets */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">5. Socket Outlet Testing</h3>
                <div className="bg-card p-4 rounded space-y-3">
                  <h4 className="text-white font-semibold">Test Procedure:</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li><strong>Visual Check:</strong> Secure mounting, no damage, correct faceplate</li>
                    <li><strong>Polarity Verification:</strong> Use socket tester or multimeter</li>
                    <li><strong>Earth Connection:</strong> Verify earth pin connectivity</li>
                    <li><strong>Load Test:</strong> Connect suitable test load and verify operation</li>
                    <li><strong>Switched Sockets:</strong> Test switch operation (where fitted)</li>
                  </ol>
                  <div className="bg-yellow-950/20 border border-yellow-400/30 p-3 rounded mt-3">
                    <p className="text-blue-200 text-sm"><strong>Equipment:</strong> Use socket outlet tester with visual indicators for quick polarity and earth checks.</p>
                  </div>
                </div>
              </div>

              {/* Step 6: Fixed Equipment */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">6. Fixed Equipment and Controls</h3>
                <div className="bg-card p-4 rounded space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Heating Controls:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Immersion heater thermostat</li>
                        <li>• Storage heater charge controls</li>
                        <li>• Underfloor heating controls</li>
                        <li>• Fan heater switching</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Ventilation Systems:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Extractor fan operation</li>
                        <li>• Humidistat controls</li>
                        <li>• Timer overrun functions</li>
                        <li>• Remote switching</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recording Results */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Recording Functional Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded">
                <h4 className="text-white font-semibold mb-2">Socket Outlet Load Testing:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Standard Testing:</p>
                    <ul className="space-y-1">
                      <li>• Use 13A test load for socket outlets</li>
                      <li>• Monitor voltage under load conditions</li>
                      <li>• Check for excessive temperature rise</li>
                      <li>• Verify earth continuity under load</li>
                      <li>• Test with both resistive and inductive loads</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Performance Indicators:</p>
                    <ul className="space-y-1">
                      <li>• Voltage drop should not exceed 4% (9.6V)</li>
                      <li>• No excessive heating at connections</li>
                      <li>• Stable voltage throughout test period</li>
                      <li>• No arcing or sparking sounds</li>
                      <li>• RCD should not trip during normal load</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Lighting Circuit Performance:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-yellow-400 font-medium mb-1">LED and Fluorescent Testing:</p>
                      <ul className="space-y-1">
                        <li>• Check for immediate start-up</li>
                        <li>• Verify no flickering or strobing</li>
                        <li>• Test dimming operation where fitted</li>
                        <li>• Check colour temperature consistency</li>
                        <li>• Verify emergency pack operation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium mb-1">Control System Performance:</p>
                      <ul className="space-y-1">
                        <li>• PIR detection range and timing</li>
                        <li>• Photocell operation in varying light</li>
                        <li>• Time switch accuracy and programming</li>
                        <li>• Remote control response times</li>
                        <li>• Scene memory and recall functions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Locations Testing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Special Locations and Additional Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Bathroom and Wet Areas (Section 701)</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Additional Tests Required:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Verify IP rating compliance for zone requirements</li>
                      <li>Test supplementary equipotential bonding</li>
                      <li>Check 30mA RCD protection for all circuits</li>
                      <li>Verify no switches in zones 0, 1, or 2 (except SELV)</li>
                      <li>Test SELV systems operate at correct voltage</li>
                      <li>Check pull cord switches operate correctly</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Swimming Pools (Section 702)</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Functional Testing Requirements:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Test underwater lighting systems at correct voltage</li>
                      <li>Verify pool water circulation pump controls</li>
                      <li>Check emergency lighting and alarm systems</li>
                      <li>Test equipotential bonding grid continuity</li>
                      <li>Verify isolation transformer operation</li>
                      <li>Check poolside equipment IP ratings</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Construction Sites (Section 704)</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Site-Specific Testing:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Test portable distribution units (PDUs)</li>
                      <li>Verify 30mA RCD protection for all socket outlets</li>
                      <li>Check reduced low voltage (110V) systems</li>
                      <li>Test emergency stop systems for equipment</li>
                      <li>Verify IP44 minimum for all outdoor equipment</li>
                      <li>Check tower crane electrical systems</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Medical Locations (Section 710)</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Critical System Testing:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Test medical IT system isolation monitoring</li>
                      <li>Verify uninterruptible power supply (UPS) operation</li>
                      <li>Check medical gas and suction controls</li>
                      <li>Test nurse call and emergency systems</li>
                      <li>Verify equipotential bonding in patient areas</li>
                      <li>Check automatic changeover systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recording Results */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Recording Functional Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Essential Records:</p>
                    <ul className="space-y-1">
                      <li>• Main switch operation (satisfactory/unsatisfactory)</li>
                      <li>• RCD test button operation results</li>
                      <li>• Individual circuit breaker operation</li>
                      <li>• All switching devices tested and results</li>
                      <li>• Control equipment functionality assessment</li>
                      <li>• Socket outlet polarity and earth verification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium mb-1">Additional Documentation:</p>
                    <ul className="space-y-1">
                      <li>• Any defects or limitations identified</li>
                      <li>• Equipment that could not be tested</li>
                      <li>• Remedial work recommendations</li>
                      <li>• Date, time, and environmental conditions</li>
                      <li>• Signature and qualification of tester</li>
                      <li>• Next inspection/test due date</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-yellow-950/20 border border-yellow-400/30 p-3 rounded">
                  <h5 className="text-blue-300 font-semibold mb-2">Digital Documentation Tips:</h5>
                  <ul className="text-sm space-y-1 text-blue-200">
                    <li>• Use mobile apps for real-time data entry and photo evidence</li>
                    <li>• Include GPS coordinates for outdoor installations</li>
                    <li>• Take photos of test equipment settings and results</li>
                    <li>• Record serial numbers of all tested equipment</li>
                    <li>• Create QR codes linking to detailed test reports</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Common Issues and What to Look For
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded">
                  <h4 className="text-red-300 font-semibold mb-2">❌ Defects to Identify:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1 text-red-200">
                      <li>• Switches that stick or don't operate smoothly</li>
                      <li>• RCD test buttons that don't trip the RCD</li>
                      <li>• Loose or damaged socket outlets</li>
                      <li>• Incorrect polarity at socket outlets</li>
                      <li>• Controls that don't operate equipment</li>
                    </ul>
                    <ul className="space-y-1 text-red-200">
                      <li>• MCBs that won't stay ON or OFF</li>
                      <li>• Dimmer switches with limited range</li>
                      <li>• PIR sensors not detecting movement</li>
                      <li>• Emergency lighting not activating</li>
                      <li>• Loose connections causing heating</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-950/30 border border-green-500/50 p-4 rounded">
                  <h4 className="text-green-300 font-semibold mb-2">✅ Signs of Good Installation:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1 text-green-200">
                      <li>• All switches operate smoothly and positively</li>
                      <li>• RCD test buttons trip immediately</li>
                      <li>• Socket outlets securely mounted</li>
                      <li>• Correct polarity throughout</li>
                      <li>• All controls respond appropriately</li>
                    </ul>
                    <ul className="space-y-1 text-green-200">
                      <li>• No excessive heating at connections</li>
                      <li>• Adequate labelling of circuits</li>
                      <li>• Emergency systems work as designed</li>
                      <li>• Interlocks prevent unsafe operation</li>
                      <li>• All equipment operates within ratings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Tips */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Practical Exam Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-2">
                <li><strong>Plan Your Sequence:</strong> Test in logical order to minimise disruption to building occupants</li>
                <li><strong>Safety First:</strong> Always complete dead testing before functional testing</li>
                <li><strong>Document Everything:</strong> Record all tests, even if they're working correctly</li>
                <li><strong>Check Twice:</strong> If something doesn't work, verify your test method before marking as defective</li>
                <li><strong>Use Correct Tools:</strong> Socket testers save time for polarity checks</li>
                <li><strong>Be Systematic:</strong> Work methodically through each circuit and system</li>
              </ul>
            </CardContent>
          </Card>

          {/* Standards Reference */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">BS 7671 Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Section 643:</strong> Functional testing requirements</p>
              <p><strong>Section 537:</strong> Isolating and switching devices</p>
              <p><strong>Section 416:</strong> Provisions for basic protection</p>
              <p><strong>Appendix 6:</strong> Model forms for certification</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FunctionalTestingGuide;