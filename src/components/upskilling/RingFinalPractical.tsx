import { Wrench, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const RingFinalPractical = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Test Rig Setup */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">Setup</Badge>
              <h3 className="text-foreground font-semibold">Test Rig Setup & Safety</h3>
            </div>
            <div className="space-y-4">
            <p className="text-foreground">
              Proper setup is crucial for safe and accurate testing. Follow these procedures for optimal results.
            </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-elec-yellow font-medium">Physical Setup:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Position test leads to avoid trip hazards</li>
                    <li>• Ensure adequate lighting at consumer unit</li>
                    <li>• Use dust sheets to protect surrounding areas</li>
                    <li>• Keep test equipment on stable, accessible surface</li>
                    <li>• Have circuit drawings and schedules readily available</li>
                    <li>• Ensure mobile phone signal for emergency contact</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-elec-yellow font-medium">Lock-off Procedures:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Isolate main switch and test for dead</li>
                    <li>• Apply unique lock and tag system</li>
                    <li>• Display "DANGER - MEN WORKING" signs</li>
                    <li>• Coordinate with other trades on site</li>
                    <li>• Inform occupants of isolation duration</li>
                    <li>• Keep isolation key securely on person</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Deep Dive */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-600 text-foreground">Equipment</Badge>
              <h3 className="text-foreground font-semibold">Test Equipment Mastery</h3>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Low Resistance Ohmmeter Settings:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• <strong>Test Current:</strong> 200mA DC minimum for accurate readings</li>
                    <li>• <strong>Range:</strong> 0-2Ω or 0-20Ω for most ring circuits</li>
                    <li>• <strong>Resolution:</strong> 0.01Ω or better for precise measurements</li>
                    <li>• <strong>Nulling:</strong> Always null test leads before each test</li>
                    <li>• <strong>Battery Check:</strong> Verify adequate power before starting</li>
                  </ul>
                </div>
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Test Lead Management:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• <strong>Quality Leads:</strong> Low resistance, secure connections</li>
                    <li>• <strong>Length:</strong> Keep as short as practical (max 1.5m)</li>
                    <li>• <strong>Crocodile Clips:</strong> Clean, tight, corrosion-free</li>
                    <li>• <strong>Probe Adaptors:</strong> For tight access in consumer units</li>
                    <li>• <strong>Spare Set:</strong> Have backup leads for continuity</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2">Temporary Link Procedures:</h4>
                <p className="text-foreground text-sm mb-2">Safe methods for making temporary connections:</p>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• Use insulated link leads with secure terminations</li>
                  <li>• Never use bare wire or makeshift connections</li>
                  <li>• Ensure links cannot become loose during testing</li>
                  <li>• Remove all temporary links before re-energising</li>
                  <li>• Double-check connections with visual inspection</li>
                </ul>
              </div>
            </div>
          </div>

          {/* End-to-End Testing */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">Step 1</Badge>
              <h3 className="text-foreground font-semibold">End-to-End Continuity Testing</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground">
                First phase: Verify each conductor forms a complete loop from the distribution board.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-elec-yellow font-medium">Test Sequence:</h4>
                   <ol className="text-foreground text-sm space-y-1 list-decimal list-inside">
                    <li>Isolate and secure the circuit</li>
                    <li>Disconnect all loads and equipment</li>
                    <li>Identify the outgoing and incoming conductors</li>
                    <li>Connect line conductors together at far end</li>
                    <li>Test resistance from distribution board</li>
                    <li>Repeat for neutral and CPC conductors</li>
                  </ol>
                </div>
                <div className="space-y-2">
                  <h4 className="text-elec-yellow font-medium">Expected Results:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• Line conductors: Typically lowest resistance</li>
                    <li>• Neutral conductors: Similar to line conductors</li>
                    <li>• CPC: Higher due to smaller cross-section</li>
                    <li>• All readings should be consistent and finite</li>
                    <li>• Infinite readings indicate open circuits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Connection Testing */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">Step 2</Badge>
              <h3 className="text-foreground font-semibold">Cross-Connection Testing</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground">
                Second phase: Verify correct wiring at each socket outlet and identify any faults.
              </p>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Cross-Connection Method:</h4>
                    <ol className="text-foreground text-sm space-y-2 list-decimal list-inside">
                      <li><strong>Line conductors:</strong> Connect outgoing Line to incoming Neutral at distribution board</li>
                      <li><strong>Test at each socket:</strong> Measure resistance between Line and Neutral terminals</li>
                      <li><strong>CPC testing:</strong> Connect outgoing Line to incoming CPC at distribution board</li>
                      <li><strong>Test at each socket:</strong> Measure resistance between Line and CPC terminals</li>
                      <li><strong>Record all readings:</strong> Document resistance at each outlet systematically</li>
                      <li><strong>Analyse results:</strong> Look for anomalous readings indicating faults</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Scenarios */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-purple-600 text-foreground">Scenarios</Badge>
              <h3 className="text-foreground font-semibold">Real-World Testing Scenarios</h3>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="text-purple-400 font-medium mb-2">Occupied Premises:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• Schedule testing during low occupancy hours</li>
                    <li>• Coordinate with facility management</li>
                    <li>• Use extension leads to access distant sockets</li>
                    <li>• Work around furniture with care and respect</li>
                    <li>• Communicate disruption timeframes clearly</li>
                    <li>• Have alternative power arrangements ready</li>
                  </ul>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="text-purple-400 font-medium mb-2">Multiple Ring Circuits:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• Test one ring at a time to avoid confusion</li>
                    <li>• Use clear labelling system for identification</li>
                    <li>• Keep detailed notes of conductor positions</li>
                    <li>• Check for interconnections between rings</li>
                    <li>• Verify circuit integrity after each test</li>
                    <li>• Plan logical sequence to minimise disruption</li>
                  </ul>
                </div>
              </div>
              <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                <h4 className="text-orange-400 font-medium mb-2">Dealing with Unusual Readings:</h4>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• <strong>Very Low Readings:</strong> Check for interconnections with other circuits</li>
                  <li>• <strong>Very High Readings:</strong> Verify connections and look for poor joints</li>
                  <li>• <strong>Inconsistent Readings:</strong> Check test equipment calibration and lead integrity</li>
                  <li>• <strong>Infinite Readings:</strong> Systematically trace for open circuits or disconnections</li>
                  <li>• <strong>Negative Readings:</strong> Check for reverse connections or equipment error</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Troubleshooting */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-red-600 text-foreground">Troubleshooting</Badge>
              <h3 className="text-foreground font-semibold">Advanced Fault Location</h3>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h4 className="text-red-400 font-medium mb-2">Cable Tracing Techniques:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• <strong>Tone Generator:</strong> Inject signal and trace with receiver</li>
                    <li>• <strong>TDR (Time Domain Reflectometer):</strong> Locate faults precisely</li>
                    <li>• <strong>Visual Inspection:</strong> Check for obvious damage or modifications</li>
                    <li>• <strong>Thermal Imaging:</strong> Identify hot spots indicating poor connections</li>
                    <li>• <strong>Systematic Method:</strong> Work methodically through circuit path</li>
                  </ul>
                </div>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h4 className="text-red-400 font-medium mb-2">Temperature Correction:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• <strong>Copper Formula:</strong> R₂ = R₁ × (234.5 + t₂)/(234.5 + t₁)</li>
                    <li>• <strong>Standard Temperature:</strong> Usually corrected to 20°C</li>
                    <li>• <strong>Ambient Recording:</strong> Note temperature during testing</li>
                    <li>• <strong>Significant Changes:</strong> Correct for temperatures {'>'} 10°C difference</li>
                    <li>• <strong>Cable Temperature:</strong> Consider heating effects from recent loading</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2">Mixed Cable Types:</h4>
                <p className="text-foreground text-sm mb-2">Challenges when circuits contain different cable specifications:</p>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• Different conductor materials (copper/aluminium)</li>
                  <li>• Various cross-sectional areas within same ring</li>
                  <li>• Mixed installation methods (clipped/conduit/trunking)</li>
                  <li>• Age-related changes in conductor properties</li>
                  <li>• Calculate expected readings based on actual cable data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fault Identification */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">Fault Identification</Badge>
              <h3 className="text-foreground font-semibold">Common Ring Circuit Faults</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground">
                Recognise and interpret common fault patterns in ring circuit testing:
              </p>
              <div className="space-y-3">
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h4 className="text-red-400 font-medium mb-2">Fault: Interconnection Between Rings</h4>
                  <div className="text-foreground text-sm space-y-1">
                    <p><strong>Symptoms:</strong> Unexpectedly low readings at specific outlets</p>
                    <p><strong>Causes:</strong> Incorrect wiring, junction box errors, or modifications</p>
                    <p><strong>Action:</strong> Identify connection point and separate circuits immediately</p>
                    <p><strong>Testing Method:</strong> Isolate adjacent rings and retest for confirmation</p>
                  </div>
                </div>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-medium mb-2">Fault: Open Circuit in Ring</h4>
                  <div className="text-foreground text-sm space-y-1">
                    <p><strong>Symptoms:</strong> Infinite resistance in end-to-end test</p>
                    <p><strong>Causes:</strong> Damaged cable, loose connection, or disconnected conductor</p>
                    <p><strong>Action:</strong> Trace circuit systematically to find break point</p>
                    <p><strong>Testing Method:</strong> Use low resistance ohmmeter to identify break location</p>
                  </div>
                </div>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="text-orange-400 font-medium mb-2">Fault: Incorrect Spur Connection</h4>
                  <div className="text-foreground text-sm space-y-1">
                    <p><strong>Symptoms:</strong> Anomalous readings that don't follow expected pattern</p>
                    <p><strong>Causes:</strong> Spur connected into ring instead of at socket or junction</p>
                    <p><strong>Action:</strong> Identify spur location and reconnect correctly</p>
                    <p><strong>Testing Method:</strong> Progressive disconnection to isolate spur influence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Management */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-600 text-foreground">Efficiency</Badge>
              <h3 className="text-foreground font-semibold">Time Management & Exam Strategy</h3>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-400 font-medium mb-2">Efficient Testing Sequence:</h4>
                  <ol className="text-foreground text-sm space-y-1 list-decimal list-inside">
                    <li>Complete all isolation and safety procedures first</li>
                    <li>Set up equipment and organise test leads systematically</li>
                    <li>Perform end-to-end tests on all conductors consecutively</li>
                    <li>Make cross-connections and test all outlets in sequence</li>
                    <li>Analyse results and investigate anomalies immediately</li>
                    <li>Complete documentation while details are fresh</li>
                  </ol>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-400 font-medium mb-2">Common Time-Wasters:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• Poor equipment organisation and setup</li>
                    <li>• Inadequate circuit identification beforehand</li>
                    <li>• Testing in wrong sequence requiring backtracking</li>
                    <li>• Not nulling test leads between measurements</li>
                    <li>• Incomplete documentation requiring return visits</li>
                    <li>• Failing to prepare alternative power arrangements</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Assessment Priorities:</h4>
                <p className="text-foreground text-sm mb-2">When time is limited, focus on these critical elements:</p>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• <strong>Safety First:</strong> Never compromise on isolation and lock-off procedures</li>
                  <li>• <strong>Core Tests:</strong> Ensure both end-to-end and cross-connection tests are completed</li>
                  <li>• <strong>Key Documentation:</strong> Record essential readings even if detailed notes are abbreviated</li>
                  <li>• <strong>Critical Faults:</strong> Investigate any readings that indicate immediate safety concerns</li>
                  <li>• <strong>Verification:</strong> Double-check any unusual or unexpected results</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">Documentation</Badge>
              <h3 className="text-foreground font-semibold">Test Documentation & Certification</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground">
                Comprehensive documentation ensures compliance and provides essential information for future work:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Essential Test Records:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• <strong>End-to-End Values:</strong> Line, neutral, and CPC resistance</li>
                    <li>• <strong>Cross-Connection Readings:</strong> At each socket and junction</li>
                    <li>• <strong>Test Equipment:</strong> Make, model, calibration date</li>
                    <li>• <strong>Test Current:</strong> Used during measurement</li>
                    <li>• <strong>Environmental Conditions:</strong> Temperature, humidity</li>
                    <li>• <strong>Circuit Details:</strong> Cable type, installation method</li>
                  </ul>
                </div>
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">Visual Documentation:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• <strong>Circuit Sketches:</strong> Show socket locations and cable routes</li>
                    <li>• <strong>Connection Photos:</strong> Document any unusual configurations</li>
                    <li>• <strong>Fault Evidence:</strong> Images of damage or incorrect installation</li>
                    <li>• <strong>Equipment Settings:</strong> Photos of meter displays for records</li>
                    <li>• <strong>Access Issues:</strong> Document limitations for future reference</li>
                    <li>• <strong>Remedial Work:</strong> Before and after photographs</li>
                  </ul>
                </div>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Certificate Completion Tips:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="text-foreground font-medium mb-1">Critical Information:</h5>
                         <ul className="text-foreground space-y-1">
                          <li>• Circuit designation and protective device rating</li>
                          <li>• Method of connection (ring final/radial)</li>
                          <li>• Number of points served by circuit</li>
                          <li>• Any limitations or deviations noted</li>
                          <li>• Recommendations for remedial work</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-foreground font-medium mb-1">Quality Checks:</h5>
                        <ul className="text-foreground space-y-1">
                          <li>• Verify all readings are within expected ranges</li>
                          <li>• Check calculations for R1 + R2 values</li>
                          <li>• Ensure all sections of certificate are completed</li>
                          <li>• Cross-reference with installation drawings</li>
                          <li>• Review for legibility and accuracy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Challenges */}
          <div className="bg-[#323232] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-orange-600 text-foreground">Challenges</Badge>
              <h3 className="text-foreground font-semibold">Real-World Installation Challenges</h3>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="text-orange-400 font-medium mb-2">Cramped Consumer Units:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• Use probe adaptors for tight terminal access</li>
                    <li>• Take photos before disconnecting any conductors</li>
                    <li>• Work methodically to avoid confusion</li>
                    <li>• Consider temporary removal of adjacent devices</li>
                    <li>• Ensure adequate lighting with head torch if needed</li>
                    <li>• Allow extra time for careful working</li>
                  </ul>
                </div>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="text-orange-400 font-medium mb-2">Corroded Terminals:</h4>
                   <ul className="text-foreground text-sm space-y-1">
                    <li>• Clean terminals carefully with fine wire brush</li>
                    <li>• Apply contact cleaner if necessary</li>
                    <li>• Check for mechanical integrity of connections</li>
                    <li>• Consider replacement of badly corroded items</li>
                    <li>• Document condition for client information</li>
                    <li>• Recommend remedial action in report</li>
                  </ul>
                </div>
              </div>
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">Legacy Installations:</h4>
                <p className="text-foreground text-sm mb-2">Challenges with older electrical installations:</p>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• <strong>Imperial Cable Sizes:</strong> Convert to metric equivalents for calculations</li>
                  <li>• <strong>Rubber/PVC Insulation:</strong> Handle aged cables with extra care</li>
                  <li>• <strong>Lead-Sheathed Cables:</strong> Special considerations for old installations</li>
                  <li>• <strong>Rewirable Fuses:</strong> Ensure correct wire ratings are fitted</li>
                  <li>• <strong>Original Drawings:</strong> May not reflect subsequent modifications</li>
                  <li>• <strong>Mixed Standards:</strong> Circuits installed to different editions of regulations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-green-400 font-medium mb-2">Professional Excellence Summary</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Systematic approach ensures all aspects of ring circuit testing are completed correctly</li>
                  <li>• Proper equipment setup and safety procedures are fundamental to professional practice</li>
                  <li>• Thorough documentation provides evidence of competent work and supports future maintenance</li>
                  <li>• Understanding real-world challenges prepares you for diverse installation scenarios</li>
                  <li>• Continuous professional development ensures compliance with current standards and best practice</li>
                  <li>• Time management skills are essential for efficient and cost-effective testing procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};