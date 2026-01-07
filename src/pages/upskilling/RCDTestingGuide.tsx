import { ArrowLeft, Shield, Clock, CheckCircle, AlertTriangle, Target, Zap, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RCDTestingGuide = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Assessment
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">RCD Testing Guide</h1>
            <p className="text-xl text-white">Complete practical procedures for residual current device testing</p>
            <div className="flex justify-center gap-3">
              <Badge variant="secondary" className="bg-yellow-400 text-black">BS 7671:2018+A2</Badge>
              <Badge variant="outline" className="border-gray-600 text-white">IET Guidance Note 3</Badge>
            </div>
          </div>

          {/* Quick Test Overview */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                RCD Test Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-card p-3 rounded">
                  <p className="text-yellow-400 font-semibold">30mA RCD (General)</p>
                  <p>½×IΔn: Should NOT trip</p>
                  <p>1×IΔn: Trip ≤300ms</p>
                  <p>5×IΔn: Trip ≤40ms</p>
                </div>
                <div className="bg-card p-3 rounded">
                  <p className="text-yellow-400 font-semibold">100mA RCD (Fire)</p>
                  <p>½×IΔn: Should NOT trip</p>
                  <p>1×IΔn: Trip ≤300ms</p>
                  <p>5×IΔn: Trip ≤40ms</p>
                </div>
                <div className="bg-card p-3 rounded">
                  <p className="text-yellow-400 font-semibold">300mA RCD (Fire)</p>
                  <p>½×IΔn: Should NOT trip</p>
                  <p>1×IΔn: Trip ≤500ms</p>
                  <p>5×IΔn: Trip ≤40ms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Testing Procedure */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Step-by-Step RCD Testing Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Safety Preparation */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  1. Safety Preparation
                </h3>
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded">
                  <h4 className="text-red-300 font-semibold mb-2">⚠️ CRITICAL SAFETY STEPS</h4>
                  <ul className="text-sm space-y-1 text-red-200">
                    <li>• Inform all occupants that RCD testing will temporarily remove earth fault protection</li>
                    <li>• Check no life-support equipment is connected to RCD-protected circuits</li>
                    <li>• Ensure all circuit users are aware testing is taking place</li>
                    <li>• Have emergency contact numbers ready</li>
                  </ul>
                </div>
              </div>

              {/* Equipment Setup */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">2. Equipment Setup & Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded">
                    <h4 className="text-white font-semibold mb-2">Equipment Required:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• RCD tester (calibrated)</li>
                      <li>• Test leads and probes</li>
                      <li>• Socket outlet tester</li>
                      <li>• Multimeter</li>
                      <li>• Proving unit</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded">
                    <h4 className="text-white font-semibold mb-2">RCD Information Required:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• RCD rating (30mA, 100mA, etc.)</li>
                      <li>• RCD type (AC, A, B, F)</li>
                      <li>• Time delay (instantaneous/S-type)</li>
                      <li>• Protected circuits</li>
                      <li>• Manufacturer and model</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Inspection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  3. Visual Inspection
                </h3>
                <div className="bg-card p-4 rounded">
                  <h4 className="text-white font-semibold mb-2">Check for:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1">
                      <li>• Physical damage to RCD case</li>
                      <li>• Secure mounting and connections</li>
                      <li>• Correct labelling and ratings</li>
                      <li>• Test button present and accessible</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Signs of overheating or arcing</li>
                      <li>• Correct neutral connections</li>
                      <li>• No bypassing of RCD protection</li>
                      <li>• Clear identification of circuits</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Manual Test Button */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">4. Manual Test Button Operation</h3>
                <div className="bg-card p-4 rounded space-y-3">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Procedure:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Press and hold the test button firmly</li>
                      <li>RCD should trip immediately (within 1 second)</li>
                      <li>All downstream circuits should lose power</li>
                      <li>Reset the RCD by moving switch to OFF then ON</li>
                      <li>Verify power restoration to all circuits</li>
                    </ol>
                  </div>
                  <div className="bg-yellow-950/30 border border-yellow-400/30 p-3 rounded">
                    <p className="text-yellow-200 text-sm"><strong>Important:</strong> If test button fails to trip RCD, do not proceed with electrical testing. RCD is faulty and requires replacement.</p>
                  </div>
                </div>
              </div>

              {/* Electrical Testing */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  5. Practical RCD Tester Setup & Operation
                </h3>
                <div className="bg-yellow-950/20 border border-yellow-400/30 p-4 rounded space-y-4">
                  <h4 className="text-blue-300 font-semibold">Step-by-Step Tester Setup</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2">1. RCD Tester Configuration:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Power ON</strong> your RCD tester (e.g., Megger RCD2, Fluke 1653B, Kewtech KT64)</li>
                        <li>• <strong>Select RCD mode</strong> (not insulation or continuity)</li>
                        <li>• <strong>Set RCD rating:</strong> 30mA, 100mA, 300mA or 500mA as appropriate</li>
                        <li>• <strong>Set RCD type:</strong> AC (standard) or A (for electronic equipment circuits)</li>
                        <li>• <strong>Choose test mode:</strong> AUTO (recommended) or MANUAL</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2">2. Probe Connection (Socket Outlet Method):</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Plug RCD tester</strong> into socket outlet on protected circuit</li>
                        <li>• <strong>Verify socket wiring first</strong> - use socket tester or check L-N-E connections</li>
                        <li>• <strong>Red probe:</strong> Phase (Live) terminal in socket</li>
                        <li>• <strong>Black probe:</strong> Earth terminal in socket</li>
                        <li>• <strong>DO NOT connect neutral</strong> for standard RCD testing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2">3. Alternative Direct Connection Method:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Isolate circuit</strong> before making connections</li>
                        <li>• <strong>Connect at load side</strong> of RCD (not supply side)</li>
                        <li>• <strong>Red probe to Phase:</strong> downstream terminal of RCD</li>
                        <li>• <strong>Black probe to Earth:</strong> earth bar or terminal</li>
                        <li>• <strong>Re-energise</strong> circuit before testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Test 1: Half-rated Current */}
                  <div className="bg-card p-4 rounded border border-yellow-400/30">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-yellow-600 text-black px-2 py-1 rounded text-sm font-bold">TEST 1</span>
                      Half-rated Current (½×IΔn) - Sensitivity Check
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="text-yellow-400 font-medium">What You're Testing:</p>
                        <p>Verifying RCD does NOT trip at half its rated current (too sensitive = fault)</p>
                        
                        <p className="text-yellow-400 font-medium">Test Current Settings:</p>
                        <ul className="space-y-1">
                          <li>• 30mA RCD: Test at <strong>15mA</strong></li>
                          <li>• 100mA RCD: Test at <strong>50mA</strong></li>
                          <li>• 300mA RCD: Test at <strong>150mA</strong></li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-yellow-400 font-medium">Practical Steps:</p>
                        <ol className="space-y-1 list-decimal list-inside">
                          <li><strong>Press ½×IΔn button</strong> on tester</li>
                          <li><strong>Hold for 2 seconds</strong> (or until test completes)</li>
                          <li><strong>Watch RCD:</strong> Should NOT trip</li>
                          <li><strong>Read display:</strong> "NO TRIP" or "PASS"</li>
                          <li><strong>If RCD trips:</strong> Mark as FAIL - too sensitive</li>
                        </ol>
                        
                        <div className="bg-green-950/30 border border-green-500/50 p-2 rounded mt-2">
                          <p className="text-green-200 text-xs"><strong>PASS:</strong> RCD remains energised, no trip indication</p>
                        </div>
                        <div className="bg-red-950/30 border border-red-500/50 p-2 rounded">
                          <p className="text-red-200 text-xs"><strong>FAIL:</strong> RCD trips - replace immediately</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Test 2: Rated Current */}
                  <div className="bg-card p-4 rounded border border-yellow-400/30">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm font-bold">TEST 2</span>
                      Rated Current (1×IΔn) - Operating Time
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="text-yellow-400 font-medium">What You're Testing:</p>
                        <p>RCD trips within maximum permitted time at its rated current</p>
                        
                        <p className="text-yellow-400 font-medium">Test Current & Limits:</p>
                        <ul className="space-y-1">
                          <li>• 30mA RCD: <strong>30mA</strong> ≤ 300ms</li>
                          <li>• 100mA RCD: <strong>100mA</strong> ≤ 300ms</li>
                          <li>• 300mA RCD: <strong>300mA</strong> ≤ 500ms</li>
                          <li>• S-Type: Check manufacturer's spec</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-yellow-400 font-medium">Practical Steps:</p>
                        <ol className="space-y-1 list-decimal list-inside">
                          <li><strong>Ensure RCD is reset</strong> from previous test</li>
                          <li><strong>Press 1×IΔn button</strong> on tester</li>
                          <li><strong>Watch for immediate trip</strong> - should be quick</li>
                          <li><strong>Read trip time</strong> on display (in milliseconds)</li>
                          <li><strong>Reset RCD</strong> - switch OFF then ON</li>
                          <li><strong>Record result:</strong> Trip time and pass/fail</li>
                        </ol>
                        
                        <div className="bg-green-950/30 border border-green-500/50 p-2 rounded mt-2">
                          <p className="text-green-200 text-xs"><strong>TYPICAL:</strong> 20-100ms (very good), up to 300ms acceptable</p>
                        </div>
                        <div className="bg-red-950/30 border border-red-500/50 p-2 rounded">
                          <p className="text-red-200 text-xs"><strong>FAIL:</strong> No trip or greater than 300ms (greater than 500ms for 300mA)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Test 3: Five Times Rated Current */}
                  <div className="bg-card p-4 rounded border border-purple-500/50">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm font-bold">TEST 3</span>
                      Five Times Rated Current (5×IΔn) - Fast Trip
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="text-yellow-400 font-medium">What You're Testing:</p>
                        <p>Fast disconnection at high fault current - simulates serious earth fault</p>
                        
                        <p className="text-yellow-400 font-medium">Test Current & Limits:</p>
                        <ul className="space-y-1">
                          <li>• 30mA RCD: <strong>150mA</strong> ≤ 40ms</li>
                          <li>• 100mA RCD: <strong>500mA</strong> ≤ 40ms</li>
                          <li>• 300mA RCD: <strong>1500mA</strong> ≤ 40ms</li>
                          <li>• ALL types: Maximum 40ms</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-yellow-400 font-medium">Practical Steps:</p>
                        <ol className="space-y-1 list-decimal list-inside">
                          <li><strong>Wait 1-2 minutes</strong> after previous test</li>
                          <li><strong>Ensure RCD is reset</strong> and circuit energised</li>
                          <li><strong>Press 5×IΔn button</strong> on tester</li>
                          <li><strong>Should trip very quickly</strong> - usually less than 25ms</li>
                          <li><strong>Read trip time</strong> - must be 40ms or less</li>
                          <li><strong>Reset RCD</strong> and verify circuit restoration</li>
                        </ol>
                        
                        <div className="bg-green-950/30 border border-green-500/50 p-2 rounded mt-2">
                          <p className="text-green-200 text-xs"><strong>TYPICAL:</strong> 10-25ms (excellent response)</p>
                        </div>
                        <div className="bg-red-950/30 border border-red-500/50 p-2 rounded">
                          <p className="text-red-200 text-xs"><strong>FAIL:</strong> No trip or greater than 40ms - RCD fault</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-950/30 border border-yellow-400/30 p-4 rounded">
                  <h4 className="text-yellow-300 font-semibold mb-2">Critical Testing Notes</h4>
                  <ul className="text-sm space-y-1 text-yellow-200">
                    <li>• <strong>AUTO mode:</strong> Tester performs all three tests automatically in sequence</li>
                    <li>• <strong>MANUAL mode:</strong> You press each test button individually</li>
                    <li>• <strong>Always wait</strong> 1-2 minutes between high current tests</li>
                    <li>• <strong>Test each RCD separately</strong> - don't test multiple RCDs simultaneously</li>
                    <li>• <strong>If RCD won't reset:</strong> There may be a genuine earth fault - investigate</li>
                    <li>• <strong>Ramp testing:</strong> Some testers can gradually increase current to find exact trip point</li>
                  </ul>
                </div>
              </div>

              {/* Test Connection Points */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400">6. Test Connection Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded">
                    <h4 className="text-white font-semibold mb-2">Socket Outlet Testing:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Connect RCD tester to socket on protected circuit</li>
                      <li>• Verify socket is correctly wired first</li>
                      <li>• Test between phase and earth</li>
                      <li>• Some testers can test phase-neutral also</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded">
                    <h4 className="text-white font-semibold mb-2">Direct Connection Testing:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• At distribution board terminals</li>
                      <li>• Use test leads to appropriate test points</li>
                      <li>• Ensure safe isolation before connecting</li>
                      <li>• Test on load side of RCD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interpreting Results */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                Interpreting Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-950/30 border border-green-500/50 p-4 rounded">
                  <h4 className="text-green-300 font-semibold mb-2">✅ PASS Results:</h4>
                  <ul className="text-sm space-y-1 text-green-200">
                    <li>• ½×IΔn: No trip</li>
                    <li>• 1×IΔn: Trip ≤300ms (≤500ms for 300mA)</li>
                    <li>• 5×IΔn: Trip ≤40ms</li>
                    <li>• Test button operates correctly</li>
                    <li>• All circuits protected as intended</li>
                  </ul>
                </div>
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded">
                  <h4 className="text-red-300 font-semibold mb-2">❌ FAIL Conditions:</h4>
                  <ul className="text-sm space-y-1 text-red-200">
                    <li>• Trips at ½×IΔn (too sensitive)</li>
                    <li>• No trip at 1×IΔn or 5×IΔn</li>
                    <li>• Trip time exceeds limits</li>
                    <li>• Test button doesn't operate</li>
                    <li>• Doesn't reset properly</li>
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
                Common Issues & Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                  <div className="bg-card p-4 rounded">
                  <h4 className="text-yellow-400 font-semibold mb-2">RCD Won't Reset After Test</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Check for genuine earth fault on protected circuits</li>
                    <li>• Disconnect all loads and try resetting</li>
                    <li>• Reconnect loads one at a time to isolate fault</li>
                    <li>• May indicate RCD or installation fault</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded">
                  <h4 className="text-yellow-400 font-semibold mb-2">Inconsistent Trip Times</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Allow 1-2 minutes between tests for RCD to settle</li>
                    <li>• Check RCD tester calibration</li>
                    <li>• Verify supply voltage stability</li>
                    <li>• May indicate aging RCD components</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded">
                  <h4 className="text-yellow-400 font-semibold mb-2">RCD Trips Randomly (Nuisance Tripping)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Check for high earth leakage currents</li>
                    <li>• Investigate surge-sensitive equipment</li>
                    <li>• Consider load imbalance issues</li>
                    <li>• May need Type A or Type F RCD</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Testing Scenarios */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Advanced Testing Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Testing S-Type (Time Delayed) RCDs</h4>
                  <ul className="text-sm space-y-1">
                    <li>• S-type RCDs have intentional time delay (typically 130-500ms at 1×IΔn)</li>
                    <li>• Used for discrimination in installations with multiple RCDs</li>
                    <li>• Test at 1×IΔn: Should trip within manufacturer's specified time</li>
                    <li>• Test at 5×IΔn: Must still trip within 40ms (no time delay at high currents)</li>
                    <li>• Check discrimination by testing downstream RCDs first</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Type A and Type AC RCD Testing</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Type AC: Responds to AC residual sinusoidal currents</li>
                    <li>• Type A: Also responds to pulsating DC residual currents</li>
                    <li>• Most modern RCD testers can test both types</li>
                    <li>• Check RCD markings to identify type before testing</li>
                    <li>• Type A required for circuits with electronic equipment</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Testing RCBO (Combined MCB + RCD)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Test RCD function as per standard RCD procedures</li>
                    <li>• Test MCB function separately (overcurrent protection)</li>
                    <li>• Verify both functions operate independently</li>
                    <li>• Check that RCD test doesn't affect MCB calibration</li>
                    <li>• Ensure proper reset operation after each test</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Comprehensive Troubleshooting Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded">
                  <h4 className="text-red-300 font-semibold mb-2">RCD Fails to Trip at Rated Current</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Possible Causes:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-red-200">
                      <li>RCD mechanism is faulty or worn out</li>
                      <li>Internal connections are loose or corroded</li>
                      <li>RCD has been damaged by previous fault currents</li>
                      <li>Manufacturing defect or end of service life</li>
                    </ul>
                    <p><strong>Action Required:</strong> Replace RCD immediately - installation has no earth fault protection</p>
                  </div>
                </div>
                
                <div className="bg-yellow-950/30 border border-yellow-400/30 p-4 rounded">
                  <h4 className="text-yellow-300 font-semibold mb-2">RCD Trips at Half-Rated Current</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Possible Causes:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-yellow-200">
                      <li>RCD is too sensitive (worn internal components)</li>
                      <li>High background earth leakage current</li>
                      <li>Multiple appliances creating cumulative leakage</li>
                      <li>Deterioration due to age or environmental conditions</li>
                    </ul>
                    <p><strong>Investigation Steps:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-yellow-200">
                      <li>Measure earth leakage with all loads disconnected</li>
                      <li>Reconnect loads one at a time to identify high-leakage items</li>
                      <li>Check for moisture ingress in outdoor equipment</li>
                      <li>Consider replacing if consistently trips below 15mA</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-950/20 border border-yellow-400/30 p-4 rounded">
                  <h4 className="text-blue-300 font-semibold mb-2">Slow Trip Times (But Within Limits)</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Observations:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-blue-200">
                      <li>Trip times near the upper limit (e.g., 250-300ms)</li>
                      <li>Inconsistent timing between tests</li>
                      <li>Gradual increase in trip times over time</li>
                    </ul>
                    <p><strong>Likely Causes:</strong> Normal aging, mechanism wear, temperature effects</p>
                    <p><strong>Recommendation:</strong> Monitor closely and consider replacement planning</p>
                  </div>
                </div>
                
                <div className="bg-green-950/30 border border-green-500/50 p-4 rounded">
                  <h4 className="text-green-300 font-semibold mb-2">Intermittent Nuisance Tripping</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Common Scenarios:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-green-200">
                      <li>RCD trips during thunderstorms (surge currents)</li>
                      <li>Trips when large motors start (transient currents)</li>
                      <li>Random trips with no apparent cause</li>
                      <li>Trips when specific appliances are used</li>
                    </ul>
                    <p><strong>Investigation Methods:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-green-200">
                      <li>Install earth leakage monitoring equipment</li>
                      <li>Check for loose connections causing arcing</li>
                      <li>Review type of RCD (may need Type B for DC currents)</li>
                      <li>Consider surge protection devices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature and Environmental Effects */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Environmental Factors Affecting RCD Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Temperature Effects</h4>
                  <ul className="text-sm space-y-1">
                    <li>• RCD sensitivity can vary by ±10% across temperature range</li>
                    <li>• Cold temperatures may slightly increase trip times</li>
                    <li>• Hot conditions may make RCDs more sensitive</li>
                    <li>• Consider testing at different times of day/year</li>
                    <li>• Indoor RCDs generally more stable than outdoor types</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Humidity and Moisture</h4>
                  <ul className="text-sm space-y-1">
                    <li>• High humidity can increase earth leakage currents</li>
                    <li>• Moisture ingress may cause false tripping</li>
                    <li>• Check outdoor RCD enclosures for water ingress</li>
                    <li>• Condensation in switchgear can affect performance</li>
                    <li>• Consider IP rating requirements for location</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Electromagnetic Interference</h4>
                  <ul className="text-sm space-y-1">
                    <li>• High-frequency interference may affect electronic RCDs</li>
                    <li>• Large motors or inverters can create harmonics</li>
                    <li>• Radio transmitters may cause nuisance tripping</li>
                    <li>• Consider electromagnetic compatibility (EMC) requirements</li>
                    <li>• Use appropriate cable screening where necessary</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Installation Quality</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Vibration from machinery can affect mechanical RCDs</li>
                    <li>• Poor connections increase resistance and heating</li>
                    <li>• Incorrect torque settings may cause contact problems</li>
                    <li>• Dust and debris can affect operation</li>
                    <li>• Regular maintenance prevents degradation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Documentation Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-card p-4 rounded">
                <h4 className="text-white font-semibold mb-2">Record on Test Certificate:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1">
                    <li>• RCD rating and type</li>
                    <li>• Test button operation (✓/✗)</li>
                    <li>• Trip times at 1×IΔn and 5×IΔn</li>
                    <li>• Test results for each RCD</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Test instrument used</li>
                    <li>• Test date and conditions</li>
                    <li>• Any limitations or observations</li>
                    <li>• Next test due date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">BS 7671 Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Section 642.2:</strong> RCD testing requirements and methods</p>
              <p><strong>Table 41.5:</strong> Maximum disconnection times for RCDs</p>
              <p><strong>Section 531.3:</strong> RCD selection and application</p>
              <p><strong>Appendix 6:</strong> Test methods and procedures</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RCDTestingGuide;