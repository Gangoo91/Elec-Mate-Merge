
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckSquare, AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Subsection6_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection6_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection6_1Props) => {
  const [activeTab, setActiveTab] = useState("visual");
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Testing and Commissioning Procedures</h2>
      
      <div className="space-y-5">
        <p>
          Testing and commissioning are critical final stages in the electrical installation process. They ensure that the 
          installation is safe, functions as intended, and complies with BS 7671 requirements before being energized.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual">Visual Inspection</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="mt-4 bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <CheckSquare className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">Visual Inspection</h3>
            </div>
            
            <p>
              Visual inspection is the first and most important part of testing and commissioning. 
              It accounts for approximately 80% of faults that would be found during the full inspection and testing process.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Connection and Fixings</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Connections</span>
                    <p className="text-sm mt-1">Check all connections are mechanically and electrically sound with correct polarity.</p>
                  </li>
                  <li>
                    <span className="font-medium">Conductor Selection</span>
                    <p className="text-sm mt-1">Verify conductors are correctly sized for current-carrying capacity and voltage drop.</p>
                  </li>
                  <li>
                    <span className="font-medium">Identification</span>
                    <p className="text-sm mt-1">Confirm all conductors are correctly identified by color or marking.</p>
                  </li>
                  <li>
                    <span className="font-medium">Routing</span>
                    <p className="text-sm mt-1">Check cables are correctly routed and adequately supported throughout their length.</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Protection and Compliance</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Protective Devices</span>
                    <p className="text-sm mt-1">Verify correct rating, type, and settings of protective devices.</p>
                  </li>
                  <li>
                    <span className="font-medium">Isolation and Switching</span>
                    <p className="text-sm mt-1">Check presence and correct placement of appropriate isolation devices.</p>
                  </li>
                  <li>
                    <span className="font-medium">Enclosures</span>
                    <p className="text-sm mt-1">Confirm appropriate IP ratings for the environment and no visible damage.</p>
                  </li>
                  <li>
                    <span className="font-medium">Fire Barriers</span>
                    <p className="text-sm mt-1">Check fire-rated seals where cables pass through fire-rated barriers.</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-elec-dark/70 border border-elec-yellow/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <h4 className="font-semibold text-white">Visual Inspection Checklist</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Connection of conductors</li>
                  <li>Identification of conductors</li>
                  <li>Routing of cables</li>
                  <li>Selection of conductors (size, type)</li>
                  <li>Connection of single-pole devices</li>
                  <li>Accessible non-conductive parts</li>
                  <li>Presence of diagrams and information</li>
                </ul>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Presence of danger notices</li>
                  <li>Presence of fire barriers</li>
                  <li>Methods of protection against electric shock</li>
                  <li>Prevention of mutual detrimental influence</li>
                  <li>Protective devices for fault protection</li>
                  <li>Isolation and switching devices</li>
                  <li>Labeling of protective devices and circuits</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="mt-4 bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <CheckSquare className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">Electrical Testing</h3>
            </div>
            
            <p>
              After visual inspection, electrical tests must be performed in a specific sequence to confirm the installation 
              meets safety requirements. All tests must be carried out using calibrated test equipment.
            </p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Testing Sequence (Dead Tests)</h4>
              
              <ol className="list-decimal pl-5 space-y-3">
                <li className="p-3 bg-elec-dark/70 border border-elec-yellow/10 rounded-md">
                  <span className="font-semibold text-white">Continuity of Protective Conductors</span>
                  <p className="mt-1">Verifies that protective conductors (including main and supplementary bonding) provide a continuous path.</p>
                  <div className="mt-2 text-sm">
                    <span className="text-elec-yellow font-medium">Method:</span> Low resistance ohmmeter between points in the protective conductor network.
                  </div>
                </li>
                
                <li className="p-3 bg-elec-dark/70 border border-elec-yellow/10 rounded-md">
                  <span className="font-semibold text-white">Continuity of Ring Final Circuit Conductors</span>
                  <p className="mt-1">Confirms that ring final circuit conductors form a complete ring with no interconnections.</p>
                  <div className="mt-2 text-sm">
                    <span className="text-elec-yellow font-medium">Method:</span> End-to-end resistance measurement and "cross-loop" testing.
                  </div>
                </li>
                
                <li className="p-3 bg-elec-dark/70 border border-elec-yellow/10 rounded-md">
                  <span className="font-semibold text-white">Insulation Resistance</span>
                  <p className="mt-1">Confirms that insulation of conductors is in good condition with no significant leakage between conductors or to earth.</p>
                  <div className="mt-2 text-sm">
                    <span className="text-elec-yellow font-medium">Method:</span> Apply 500V DC (for normal installations) between live conductors and between live conductors and earth.
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="text-elec-yellow font-medium">Minimum values:</span> 1MΩ for circuits up to 500V.
                  </div>
                </li>
                
                <li className="p-3 bg-elec-dark/70 border border-elec-yellow/10 rounded-md">
                  <span className="font-semibold text-white">Polarity</span>
                  <p className="mt-1">Verifies that all switches and protective devices are connected in the line conductor and that Edison screw lampholders have the center contact connected to the line conductor.</p>
                  <div className="mt-2 text-sm">
                    <span className="text-elec-yellow font-medium">Method:</span> Continuity testing to confirm correct connections.
                  </div>
                </li>
                
                <li className="p-3 bg-elec-dark/70 border border-elec-yellow/10 rounded-md">
                  <span className="font-semibold text-white">Earth Fault Loop Impedance</span>
                  <p className="mt-1">Measures the impedance of the earth fault current loop to ensure protective devices will operate within required disconnection times.</p>
                  <div className="mt-2 text-sm">
                    <span className="text-elec-yellow font-medium">Method:</span> Earth fault loop impedance tester at distribution board and furthest points.
                  </div>
                </li>
                
                <li className="p-3 bg-elec-dark/70 border border-elec-yellow/10 rounded-md">
                  <span className="font-semibold text-white">RCD Operation</span>
                  <p className="mt-1">Confirms that Residual Current Devices operate within the specified time and current parameters.</p>
                  <div className="mt-2 text-sm">
                    <span className="text-elec-yellow font-medium">Method:</span> Test with RCD tester at 50% and 100% of rated tripping current (30mA for standard protection).
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="text-elec-yellow font-medium">Maximum tripping times:</span> 300ms at rated current, 150ms at 5x rated current.
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-elec-dark/70 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-white">Functional Testing</h4>
                </div>
                <p className="mb-2">
                  After electrical tests are complete, functional testing verifies that installed equipment operates as intended:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Operation of switches, controls, and interlocks</li>
                  <li>Correct rotation of three-phase motors</li>
                  <li>Operation of safety devices</li>
                  <li>Verification that lighting, heating, and other equipment functions correctly</li>
                  <li>Testing of specific systems (fire alarm, emergency lighting, etc.)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="certification" className="mt-4 bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <CheckSquare className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">Certification and Documentation</h3>
            </div>
            
            <p>
              Proper documentation is a legal requirement for electrical installations. It provides evidence that the installation 
              has been tested and verified as safe, and serves as a reference for future maintenance and modifications.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Electrical Installation Certificate (EIC)</h4>
                <p>
                  Required for new installations, major additions, or alterations. 
                  Must include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Details of the client, installation address, and installer</li>
                  <li>Description of the work undertaken</li>
                  <li>Design, construction, inspection, and testing declarations</li>
                  <li>Next inspection recommendation</li>
                  <li>Schedule of inspections</li>
                  <li>Schedule of test results</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Minor Electrical Installation Works Certificate (MEIWC)</h4>
                <p>
                  Used for minor works that don't include a new circuit (e.g., adding socket to existing circuit).
                  Must include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Details of the client, installation address, and installer</li>
                  <li>Description of the minor works</li>
                  <li>Statement of compliance with BS 7671</li>
                  <li>Details of any departures from BS 7671</li>
                  <li>Details of tests carried out</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-elec-dark/70 border border-elec-yellow/20 rounded-lg p-5">
              <h4 className="font-semibold text-white mb-3">Additional Documentation Requirements</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-elec-yellow">Installation Information</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Circuit charts and schedules</li>
                    <li>Distribution board schedules</li>
                    <li>As-built drawings and schematic diagrams</li>
                    <li>Operating and maintenance instructions</li>
                    <li>Electrical installation log book</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-elec-yellow">Client Handover</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Copies of all certification</li>
                    <li>Explanation of the installation</li>
                    <li>Operational instructions</li>
                    <li>Maintenance requirements</li>
                    <li>Warranty information</li>
                    <li>Emergency procedures</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-elec-dark/40 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <h4 className="font-semibold text-white">Common Documentation Errors</h4>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Incomplete test results</li>
                <li>Missing circuit information</li>
                <li>Incorrectly describing the extent and limitations of the work</li>
                <li>Failing to record departures from standards</li>
                <li>Missing signatures or dates</li>
                <li>Not providing recommended inspection intervals</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Test Equipment Requirements</h3>
          
          <div className="space-y-5">
            <p>
              Test equipment used for electrical inspection and testing must be suitable for the tests being carried out, 
              comply with relevant standards, and be regularly calibrated.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-elec-dark/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Low Resistance Ohmmeter</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>For continuity testing</li>
                  <li>Capable of measuring low resistances accurately</li>
                  <li>Test current: 200mA minimum</li>
                  <li>Open circuit voltage: 4-24V</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Insulation Resistance Tester</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Test voltage: 250V, 500V, 1000V</li>
                  <li>Capable of measuring up to 200MΩ</li>
                  <li>Must meet BS EN 61557-2</li>
                  <li>Short circuit current: 1-5mA</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Earth Loop Impedance Tester</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>For measuring earth fault loop impedance</li>
                  <li>Range suitable for installation type</li>
                  <li>Must meet BS EN 61557-3</li>
                  <li>Non-tripping type for RCD protected circuits</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">RCD Tester</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Capable of testing at 50%, 100%, and 5x rated current</li>
                  <li>Measures trip time in milliseconds</li>
                  <li>Must meet BS EN 61557-6</li>
                  <li>Suitable for various RCD types (AC, A, etc.)</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Voltage Indicator</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>GS38 compliant</li>
                  <li>Suitable for installation voltage</li>
                  <li>Clear indication</li>
                  <li>Used with proving unit for safe isolation</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Multifunction Tester</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Combines multiple test functions</li>
                  <li>Streamlines testing process</li>
                  <li>Data logging capabilities</li>
                  <li>Regular calibration essential</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Subsection6_1;
