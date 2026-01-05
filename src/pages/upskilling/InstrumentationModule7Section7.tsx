import { ArrowLeft, ArrowRight, AlertTriangle, Search, Zap, Book, CheckCircle2, Brain, Target, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section7 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Common Wiring Faults and Loop Integrity Checks
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 7
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.7
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
                The final section focuses on practical fault finding—identifying common issues in loop 
                wiring and validating integrity. Understanding typical failure modes and systematic 
                troubleshooting approaches enables rapid diagnosis and repair, minimising downtime 
                and maintaining process control reliability.
              </p>
              <p>
                Effective fault diagnosis requires knowledge of how loops fail, the symptoms each 
                fault produces, and the tools and techniques needed to locate and repair problems 
                quickly. Documentation and systematic testing approaches are essential for success.
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
                  <span>Recognise typical loop wiring issues and their symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn how to verify wiring integrity systematically</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand fault diagnosis techniques and troubleshooting procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Master documentation and loop drawing verification methods</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Open Circuits */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5 text-yellow-400" />
                Open Circuits and Connection Failures
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Identifying and Locating Open Circuits</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Common Causes of Open Circuits</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Broken Connections:</strong> Loose terminal screws, wire pull-out</li>
                    <li>• <strong>Cable Damage:</strong> Mechanical damage, corrosion, rodent damage</li>
                    <li>• <strong>Poor Terminations:</strong> Insufficient wire strip, cold solder joints</li>
                    <li>• <strong>Vibration Damage:</strong> Fatigue fractures in stranded wire</li>
                    <li>• <strong>Environmental:</strong> Moisture ingress causing corrosion</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Symptoms of Open Circuits</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Zero Current:</strong> Loop current drops to 0mA</li>
                    <li>• <strong>No Signal:</strong> Receiver shows minimum value or fault</li>
                    <li>• <strong>Alarm Activation:</strong> Low signal or fault alarms trigger</li>
                    <li>• <strong>Transmitter Indication:</strong> Smart devices show fault codes</li>
                    <li>• <strong>Power Supply:</strong> Shows high voltage, low current</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Diagnostic Techniques for Open Circuits</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Continuity Testing</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Power down the loop completely</li>
                      <li>• Test end-to-end resistance</li>
                      <li>• Should read transmitter resistance</li>
                      <li>• Infinite resistance indicates open circuit</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Voltage Testing</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Check supply voltage (should be 24V)</li>
                      <li>• Open circuit shows full supply voltage</li>
                      <li>• No voltage drop across load resistance</li>
                      <li>• Confirm power supply is functioning</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Sectional Testing</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Test cable sections individually</li>
                      <li>• Check junction box connections</li>
                      <li>• Verify termination integrity</li>
                      <li>• Use time domain reflectometry (TDR)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Repair and Prevention Methods</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Proper Termination:</strong> Correct wire strip length, torque specifications</li>
                    <li>• <strong>Environmental Protection:</strong> Weatherproof enclosures, cable glands</li>
                    <li>• <strong>Stress Relief:</strong> Adequate cable support and bend radius</li>
                    <li>• <strong>Quality Materials:</strong> Tinned copper wire, marine-grade connections</li>
                    <li>• <strong>Regular Inspection:</strong> Preventive maintenance schedules</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Short Circuits */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Short Circuits and Wiring Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Detecting and Resolving Short Circuit Faults</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Types of Short Circuits</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Core-to-Core Shorts</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Insulation Breakdown:</strong> Cable damage or deterioration</li>
                        <li>• <strong>Incorrect Wiring:</strong> Wrong terminal connections</li>
                        <li>• <strong>Metal Debris:</strong> Contaminants in junction boxes</li>
                        <li>• <strong>Moisture Ingress:</strong> Water creating conductive paths</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Core-to-Earth Shorts</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Cable Damage:</strong> Crushed or nicked cable outer sheath</li>
                        <li>• <strong>Poor Installation:</strong> Sharp edges damaging insulation</li>
                        <li>• <strong>Environmental:</strong> Chemical attack on cable materials</li>
                        <li>• <strong>Earthing Errors:</strong> Incorrect earth connections</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Symptoms and Detection Methods</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                      <h6 className="text-red-400 font-semibold text-sm mb-1">Core-to-Core Short</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Loop current at maximum (20mA+)</li>
                        <li>• Receiver shows full scale</li>
                        <li>• Power supply current limiting</li>
                        <li>• Low loop resistance measurement</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Core-to-Earth Short</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Erratic signal behaviour</li>
                        <li>• Noise and interference</li>
                        <li>• Ground fault alarms</li>
                        <li>• Low insulation resistance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Detection Tools</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Insulation resistance tester</li>
                        <li>• Time domain reflectometer</li>
                        <li>• Current measurement</li>
                        <li>• Loop resistance testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Fault Location Techniques</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Step-by-Step Location Process</h6>
                    <ol className="text-sm space-y-2 list-decimal list-inside">
                      <li><strong>Isolate the fault:</strong> Determine if fault is in transmitter, cable, or receiver</li>
                      <li><strong>Section testing:</strong> Test cable sections between junction boxes</li>
                      <li><strong>Resistance mapping:</strong> Measure resistance at multiple points</li>
                      <li><strong>Insulation testing:</strong> Test each core individually to earth</li>
                      <li><strong>Visual inspection:</strong> Check for obvious damage at fault location</li>
                      <li><strong>Repair verification:</strong> Test complete loop after repair</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Polarity and Ground Loop Issues */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Polarity Reversal and Ground Loop Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding Polarity and Grounding Issues</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Polarity Reversal in 2-Wire Devices</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Effects of Wrong Polarity</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>No Current Flow:</strong> Transmitter cannot operate</li>
                        <li>• <strong>Receiver Shows Zero:</strong> No signal indication</li>
                        <li>• <strong>Device Damage:</strong> Potential damage to electronics</li>
                        <li>• <strong>Safety Circuits:</strong> May trigger fault conditions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Polarity Identification</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Cable Marking:</strong> Red/white or +/- identification</li>
                        <li>• <strong>Terminal Labels:</strong> Check device terminal markings</li>
                        <li>• <strong>Voltage Testing:</strong> Measure with respect to earth</li>
                        <li>• <strong>Current Direction:</strong> Use clamp meter with direction</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Ground Loops and Signal Interference</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">What Causes Ground Loops</h6>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>• <strong>Multiple Earth Paths:</strong> Signal return via earth connections</li>
                      <li>• <strong>Potential Differences:</strong> Voltage differences between earth points</li>
                      <li>• <strong>Current Injection:</strong> Unwanted currents in signal path</li>
                      <li>• <strong>Noise Pickup:</strong> Electromagnetic interference coupling</li>
                    </ul>
                    
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Ground Loop Symptoms</h6>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Signal Noise:</strong> Fluctuating or unstable readings</li>
                      <li>• <strong>50/60Hz Interference:</strong> AC power frequency coupling</li>
                      <li>• <strong>Offset Errors:</strong> Consistent bias in measurements</li>
                      <li>• <strong>Intermittent Faults:</strong> Problems that come and go</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Ground Loop Prevention and Resolution</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Single Point Earthing</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Earth at one point only</li>
                        <li>• Usually at control panel</li>
                        <li>• Break earth loops in field</li>
                        <li>• Document earth strategy</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Cable Shielding</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Use screened cable pairs</li>
                        <li>• Earth shield at one end only</li>
                        <li>• Individual pair screening</li>
                        <li>• Proper shield termination</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Signal Isolation</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Galvanic isolators</li>
                        <li>• Optical isolation</li>
                        <li>• Isolation amplifiers</li>
                        <li>• Separate power supplies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loop Testing and Documentation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Loop Testing Procedures and Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Systematic Loop Integrity Verification</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Pre-Test Documentation Review</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Loop Drawings:</strong> Verify current cable routing and connections</li>
                      <li>• <strong>Device Specifications:</strong> Check operating parameters and limits</li>
                      <li>• <strong>Installation Records:</strong> Review as-built documentation</li>
                      <li>• <strong>Previous Test Results:</strong> Compare with historical data</li>
                      <li>• <strong>Modification History:</strong> Identify recent changes or additions</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Comprehensive Testing Sequence</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Phase 1: Power-Off Testing</h6>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Visual inspection of all accessible connections</li>
                        <li>Continuity test (end-to-end resistance)</li>
                        <li>Insulation resistance test (500V or 1000V)</li>
                        <li>Cable shield continuity and isolation</li>
                        <li>Polarity verification using ohmmeter</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Phase 2: Powered Testing</h6>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Power supply voltage verification</li>
                        <li>Loop current measurement (static test)</li>
                        <li>Signal injection testing (4, 12, 20mA)</li>
                        <li>Dynamic response testing</li>
                        <li>Alarm and interlock verification</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Test Result Documentation</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Required Test Records</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Date, time, and test engineer name</li>
                        <li>• Environmental conditions during testing</li>
                        <li>• Test equipment used and calibration dates</li>
                        <li>• Actual measured values vs. expected values</li>
                        <li>• Any deviations or non-conformances found</li>
                        <li>• Corrective actions taken and verification</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Acceptance Criteria</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Loop resistance within calculated limits</li>
                        <li>• Insulation resistance &gt;1MΩ minimum</li>
                        <li>• Signal accuracy within ±0.25% typical</li>
                        <li>• Response time within specification</li>
                        <li>• No evidence of noise or interference</li>
                        <li>• All safety functions operate correctly</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Troubleshooting Decision Tree</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Systematic Fault Diagnosis</h6>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">1. No Signal (0mA)</p>
                        <ul className="text-xs ml-4 space-y-1">
                          <li>• Check power supply voltage → If low, check supply and connections</li>
                          <li>• Check loop continuity → If open, locate break and repair</li>
                          <li>• Check transmitter operation → If failed, replace or repair</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">2. Wrong Signal Level</p>
                        <ul className="text-xs ml-4 space-y-1">
                          <li>• Check calibration → Re-calibrate if outside tolerance</li>
                          <li>• Check wiring polarity → Correct if reversed</li>
                          <li>• Check for interference → Investigate noise sources</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">3. Intermittent Signal</p>
                        <ul className="text-xs ml-4 space-y-1">
                          <li>• Check connections → Tighten loose terminals</li>
                          <li>• Check for ground loops → Implement isolation</li>
                          <li>• Check cable condition → Replace if damaged</li>
                        </ul>
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
                Tank Level Transmitter Failure Investigation
              </p>
              <p>
                A tank level transmitter isn't reading properly, showing erratic values that jump 
                between 30% and 90% randomly. A quick systematic check reveals the fault and 
                prevents costly downtime. The plant cannot afford extended outage time.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Initial Symptoms:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Level indication jumping erratically on DCS</li>
                  <li>• Values oscillating between 6.8mA and 16.4mA</li>
                  <li>• No recent maintenance or modifications</li>
                  <li>• Other tanks on same power supply working normally</li>
                  <li>• Weather has been wet with high winds recently</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Diagnostic Steps Taken:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Step 1: Check power supply - 24.1VDC stable ✓</li>
                  <li>• Step 2: Continuity test - shows intermittent connection</li>
                  <li>• Step 3: Insulation test - shows 0.3MΩ core-to-earth (should be {'>'}1MΩ)</li>
                  <li>• Step 4: Visual inspection - water in junction box, corroded connections</li>
                  <li>• Step 5: Cable section test - fault located in first 50m section</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Resolution and Prevention:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Fault: Water ingress through damaged cable gland</li>
                  <li>• Repair: Replace 50m cable section and upgrade cable glands</li>
                  <li>• Test results: Insulation resistance {'>'}50MΩ, stable 11.2mA signal</li>
                  <li>• Total downtime: 4 hours (vs. potential days of investigation)</li>
                  <li>• Prevention: Quarterly inspection of outdoor junction boxes</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Systematic checks and documentation quickly located a broken cable caused by 
                water ingress. Replacing the damaged run restored function and avoided costly downtime. 
                Proper fault diagnosis prevented unnecessary component replacement.
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
                Systematic checks and documentation help quickly locate wiring faults, reduce downtime, 
                and ensure signal reliability. Understanding common failure modes, proper diagnostic 
                techniques, and maintaining good documentation enables rapid fault resolution and 
                prevents costly process interruptions.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What's a common symptom of an open loop circuit?",
                options: [
                  "Maximum current reading (20mA)",
                  "Zero current reading (0mA) and receiver shows minimum value or fault condition",
                  "Fluctuating signal between 10-15mA",
                  "Normal signal but with noise"
                ],
                correctAnswer: 1,
                explanation: "An open circuit prevents current flow, resulting in 0mA current and receivers showing minimum scale or fault conditions. The power supply will show high voltage but zero current."
              },
              {
                id: 2,
                question: "How do you identify a short circuit in a current loop?",
                options: [
                  "Check if current exceeds normal range, often at maximum with low loop resistance",
                  "Look for zero current readings",
                  "Test the power supply voltage only",
                  "Check for intermittent signals"
                ],
                correctAnswer: 0,
                explanation: "Short circuits cause excessive current (often at maximum), low total loop resistance, and the power supply may enter current limiting mode. The receiver typically shows full scale reading."
              },
              {
                id: 3,
                question: "What is a ground loop and why is it a problem?",
                options: [
                  "A loop with good earthing connections",
                  "Multiple earth paths creating unwanted current flows, causing signal noise and interference",
                  "A loop installed underground",
                  "A testing procedure for earth continuity"
                ],
                correctAnswer: 1,
                explanation: "Ground loops occur when multiple earth paths exist, creating unwanted current flows between earth points. This causes signal noise, interference, and measurement errors due to voltage differences between earth points."
              },
              {
                id: 4,
                question: "Why does polarity matter in a 2-wire current loop?",
                options: [
                  "It affects the cable colour coding only",
                  "Incorrect polarity prevents current flow and can damage the transmitter - current must flow in correct direction",
                  "It only matters for digital communication",
                  "Polarity doesn't matter in AC systems"
                ],
                correctAnswer: 1,
                explanation: "In 2-wire loops, current must flow in the correct direction for the transmitter to operate. Reversed polarity prevents the transmitter from functioning and may cause damage to the device."
              },
              {
                id: 5,
                question: "What's the best first step when a signal is missing from a current loop?",
                options: [
                  "Replace the transmitter immediately",
                  "Check power supply voltage and verify loop continuity to isolate the fault location",
                  "Recalibrate all devices",
                  "Check the cable colour coding"
                ],
                correctAnswer: 1,
                explanation: "The systematic approach starts with checking power supply voltage and loop continuity to determine if the fault is in the power supply, wiring, or devices. This prevents unnecessary component replacement."
              }
            ]}
            title="Section 7 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-7-section-6">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-8">
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

export default InstrumentationModule7Section7;