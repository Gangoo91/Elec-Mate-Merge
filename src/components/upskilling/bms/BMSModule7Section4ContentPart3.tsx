import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertCircle, CheckCircle, Users } from 'lucide-react';

export const BMSModule7Section4ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Electrician's Role in Upload and Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Supporting Software Upload Process</h4>
          <p className="text-foreground mb-4">
            Electricians play a crucial role in ensuring successful software uploads by providing the proper electrical infrastructure, 
            access, and support needed for engineers to complete programming efficiently and safely.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Pre-Upload Electrical Responsibilities</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Power Supply Verification
              </h5>
              <div className="space-y-2 text-sm">
                <ul className="ml-4 space-y-2">
                  <li>
                    <strong className="text-green-300">Stable Power Supply:</strong>
                    <p className="text-foreground text-xs mt-1">Verify 24VDC auxiliary supplies are stable and within tolerance (±5%)</p>
                  </li>
                  <li>
                    <strong className="text-green-300">Power Quality:</strong>
                    <p className="text-foreground text-xs mt-1">Check for voltage fluctuations, noise, or intermittent supply issues</p>
                  </li>
                  <li>
                    <strong className="text-green-300">Backup Power:</strong>
                    <p className="text-foreground text-xs mt-1">Ensure UPS systems are operational for critical controllers</p>
                  </li>
                  <li>
                    <strong className="text-green-300">Load Testing:</strong>
                    <p className="text-foreground text-xs mt-1">Verify power supplies can handle full controller load during operation</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Communication Infrastructure
              </h5>
              <div className="space-y-2 text-sm">
                <ul className="ml-4 space-y-2">
                  <li>
                    <strong className="text-blue-300">Wiring Continuity:</strong>
                    <p className="text-foreground text-xs mt-1">Test all communication cables for continuity and proper connections</p>
                  </li>
                  <li>
                    <strong className="text-blue-300">Polarity Verification:</strong>
                    <p className="text-foreground text-xs mt-1">Confirm RS-485 A/B polarity and shield connections are correct</p>
                  </li>
                  <li>
                    <strong className="text-blue-300">Termination Resistors:</strong>
                    <p className="text-foreground text-xs mt-1">Install 120Ω terminators at both ends of RS-485 bus networks</p>
                  </li>
                  <li>
                    <strong className="text-blue-300">Network Switches:</strong>
                    <p className="text-foreground text-xs mt-1">Ensure Ethernet switches are powered, configured, and link lights active</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Access and Safety Preparation</h4>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <h5 className="text-orange-400 font-semibold mb-2">Site Preparation Checklist</h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Physical Access:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Remove panel locks and covers</li>
                    <li>• Clear workspace around control panels</li>
                    <li>• Provide adequate lighting</li>
                    <li>• Ensure stable work platform/ladder</li>
                    <li>• Check panel door swing clearance</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Communication Ports:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• USB ports clean and accessible</li>
                    <li>• Ethernet connections tested</li>
                    <li>• Serial ports properly terminated</li>
                    <li>• Programming cables available</li>
                    <li>• Laptop connection points identified</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Safety Measures:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Electrical hazard assessment complete</li>
                    <li>• Arc flash PPE requirements identified</li>
                    <li>• Emergency stop locations known</li>
                    <li>• Hot work permits if required</li>
                    <li>• Communication with operations team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">During Upload Support</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">Active Support Activities</h5>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Technical Assistance:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Monitor controller status LEDs during upload</li>
                      <li>• Check power supply stability under load</li>
                      <li>• Verify communication link integrity</li>
                      <li>• Assist with cable connections and routing</li>
                      <li>• Document any hardware issues discovered</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Field Testing Support:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Manually operate switches and sensors</li>
                      <li>• Verify field device responses to commands</li>
                      <li>• Check indicator lights and status displays</li>
                      <li>• Test emergency stop and override functions</li>
                      <li>• Confirm physical equipment responses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Post-Upload Verification</h4>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-lg p-4">
            <h5 className="text-cyan-400 font-semibold mb-2">System Verification Tasks</h5>
            <div className="space-y-3 text-sm">
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">I/O Point Testing:</p>
                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-foreground font-semibold mb-1">Input Verification:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Temperature sensors reading correctly</li>
                        <li>• Pressure switches operating at setpoints</li>
                        <li>• Status contacts proving back accurately</li>
                        <li>• Flow switches responding to flow changes</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-1">Output Testing:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Contactors energising on command</li>
                        <li>• Variable outputs scaling correctly (0-10V)</li>
                        <li>• Valve actuators responding properly</li>
                        <li>• Indicator lights functioning as programmed</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Safety Function Testing:</p>
                  <div className="text-xs">
                    <ul className="ml-4 space-y-1">
                      <li>• Fire alarm inputs cause proper equipment shutdown</li>
                      <li>• Emergency stop buttons halt all operations</li>
                      <li>• High/low limit switches trigger appropriate responses</li>
                      <li>• Manual override functions work correctly</li>
                      <li>• Fail-safe positions achieved during power loss simulation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Common Issues and Troubleshooting</h4>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-red-400 font-semibold mb-2">Typical Upload Problems</h5>
            <div className="space-y-3 text-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-red-300">Problem</th>
                      <th className="text-left py-2 px-2 text-red-300">Likely Cause</th>
                      <th className="text-left py-2 px-2 text-red-300">Electrician Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Upload fails/times out</td>
                      <td className="py-2 px-2">Communication wiring issue</td>
                      <td className="py-2 px-2">Check continuity, polarity, termination</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Controller not responding</td>
                      <td className="py-2 px-2">Power supply problem</td>
                      <td className="py-2 px-2">Verify voltage levels, check fuses</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Partial program corruption</td>
                      <td className="py-2 px-2">Voltage fluctuations during upload</td>
                      <td className="py-2 px-2">Stabilise power, use UPS if needed</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">Network discovery fails</td>
                      <td className="py-2 px-2">Address conflicts or wrong subnet</td>
                      <td className="py-2 px-2">Verify IP settings, check for duplicates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 What can happen if a controller is miswired or not labelled correctly before programming?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Miswired controllers can cause upload failures, program corruption, or worse - incorrect 
                equipment operation that could damage plant or create safety hazards. Poor labelling leads to programming 
                the wrong controller, causing delays, rework, and potential system conflicts when controllers are 
                brought online.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};