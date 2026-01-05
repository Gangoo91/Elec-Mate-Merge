import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, AlertTriangle, Settings, ClipboardCheck } from 'lucide-react';

export const BMSModule7Section1Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Pre-Installation Planning</h4>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-blue-400 font-semibold mb-2">Essential Documentation Review</h5>
                <ul className="space-y-1 text-sm">
                  <li>• Study manufacturer wiring diagrams - never assume standard pinouts</li>
                  <li>• Review BMS point schedules and I/O lists</li>
                  <li>• Check power supply specifications for all devices</li>
                  <li>• Verify containment routes and segregation requirements</li>
                  <li>• Confirm fire integrity requirements with building services engineer</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-elec-yellow font-semibold mb-2">Tools and Materials Checklist</h5>
              <ul className="space-y-1 text-sm">
                <li>• Multimeter with analog measurement capability</li>
                <li>• Insulation tester (500V/1000V)</li>
                <li>• Torque screwdrivers</li>
                <li>• Cable strippers and ferrule crimpers</li>
                <li>• Continuity tester</li>
                <li>• Cable identification equipment</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-elec-yellow font-semibold mb-2">Material Quality Standards</h5>
              <ul className="space-y-1 text-sm">
                <li>• Use manufacturer-approved cables only</li>
                <li>• Ferrules: Insulated, correct size for conductor</li>
                <li>• Terminals: Appropriate current rating</li>
                <li>• Labels: Machine printed, durable</li>
                <li>• Containment: Appropriate IP rating</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Step-by-Step Wiring Process</h4>
          
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Phase 1: Preparation and Testing
              </h5>
              <ol className="space-y-2 text-sm ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-semibold">1.</span>
                  <span><strong>Cable preparation:</strong> Strip to correct length, install ferrules on all stranded conductors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-semibold">2.</span>
                  <span><strong>Polarity verification:</strong> Mark positive/negative clearly before installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-semibold">3.</span>
                  <span><strong>Continuity testing:</strong> Test each conductor end-to-end before connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-semibold">4.</span>
                  <span><strong>Insulation testing:</strong> 500V test between conductors and to earth</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2">Phase 2: Connection and Verification</h5>
              <ol className="space-y-2 text-sm ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 font-semibold">5.</span>
                  <span><strong>Device connections:</strong> Follow manufacturer diagrams exactly - common vs. individual return paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 font-semibold">6.</span>
                  <span><strong>Terminal tightening:</strong> Use specified torque values to prevent loose connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 font-semibold">7.</span>
                  <span><strong>Service loops:</strong> Minimum 300mm in panels, coiled neatly and secured</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 font-semibold">8.</span>
                  <span><strong>Final labelling:</strong> Cable and terminal labels matching BMS schedules</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Power Supply Installation Standards</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Safety First Approach</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always isolate and lock off supply before work</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verify device ratings match supply voltage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Test supply voltage and quality before connection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Implement proper earthing and bonding</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">Circuit Protection</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Individual MCBs for each controller (typically 2-6A)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Fused supplies for sensor circuits (1-2A)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>RCD protection where required by BS 7671</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Emergency stop integration for safety systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Advanced Containment Techniques</h4>
          
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">Professional Installation Standards</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-foreground">Trunking Installation:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Maximum 40% fill factor (35% for multiple circuits)</li>
                    <li>• Dividers: Full-height earthed metal barriers</li>
                    <li>• Fixings: Maximum 1.5m centres, 300mm from corners</li>
                    <li>• Joints: Continuous electrical connection</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">Cable Management:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Group similar voltage/signal types together</li>
                    <li>• Avoid crossing power and signal cables</li>
                    <li>• Minimum bend radius: 6x cable diameter</li>
                    <li>• Support heavy cables individually</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">Common Installation Mistakes</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-foreground">Wiring Errors:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Reversed polarity on analog signals</li>
                        <li>• Mixed voltage types in same containment</li>
                        <li>• Incorrect screen termination</li>
                        <li>• Inadequate service loops</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-foreground">System Issues:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Overcrowded containment systems</li>
                        <li>• Poor segregation causing interference</li>
                        <li>• Inadequate labelling systems</li>
                        <li>• Missing earthing connections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Testing and Commissioning Preparation</h4>
          
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="text-green-400 font-semibold mb-2">Final Verification Checklist</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-foreground">Electrical Tests:</strong>
                <ul className="space-y-1 ml-4 mt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Continuity of all circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Insulation resistance &gt;1MΩ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Polarity verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Earth fault loop impedance</span>
                  </li>
                </ul>
              </div>
              <div>
                <strong className="text-foreground">Documentation:</strong>
                <ul className="space-y-1 ml-4 mt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>As-built drawings updated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Test certificates completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Cable schedules verified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>O&M manuals prepared</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};