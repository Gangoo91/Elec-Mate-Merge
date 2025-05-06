
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Wrench, Search, FileClock } from "lucide-react";

interface Subsection9_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection9_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection9_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Inspection and Testing Principles</h2>
      
      <div className="space-y-4">
        <p>
          Inspection and testing are essential procedures to verify that an electrical installation is safe for use.
          These processes confirm compliance with BS 7671 and identify potential defects before energization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Visual Inspection
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Inspection Process</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Must be completed before testing begins</li>
                <li>Conducted with installation de-energized</li>
                <li>Methodical approach to cover all aspects</li>
                <li>Documentation of findings</li>
                <li>Defects must be rectified before testing</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Key Inspection Points</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Connection of conductors</li>
                <li>Identification of conductors</li>
                <li>Routing of cables in safe zones</li>
                <li>Selection of protective devices</li>
                <li>Presence of appropriate notices and diagrams</li>
                <li>Selection of equipment suitable for external influences</li>
                <li>Accessibility for operation and maintenance</li>
                <li>Presence of fire barriers and protection against thermal effects</li>
                <li>Methods of protection against electric shock</li>
                <li>Prevention of mutual detrimental influence</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Common Visual Defects:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Incorrect cable size or type</li>
                  <li>Inadequate IP rating for environment</li>
                  <li>Lack of supplementary bonding in special locations</li>
                  <li>Exposed conductors or damage to insulation</li>
                  <li>Incorrect fixings or support for equipment</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Testing Fundamentals
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Test Principles</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Safety first - appropriate precautions during testing</li>
                <li>Sequential approach following test procedure order</li>
                <li>Testing from source to furthest point</li>
                <li>Calibrated test equipment conforming to relevant standards</li>
                <li>Appropriate test methods for installation type</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Test Sequence</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Continuity of protective conductors</li>
                <li>Continuity of ring final circuit conductors</li>
                <li>Insulation resistance</li>
                <li>SELV, PELV and electrical separation verification</li>
                <li>Protection by barriers or enclosures</li>
                <li>Polarity</li>
                <li>Earth fault loop impedance</li>
                <li>Prospective fault current</li>
                <li>RCD operation</li>
                <li>Phase sequence</li>
                <li>Functional testing</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Essential Test Equipment:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Low resistance ohmmeter (continuity tester)</li>
                  <li>Insulation resistance tester</li>
                  <li>Earth fault loop impedance tester</li>
                  <li>RCD tester</li>
                  <li>Prospective fault current tester</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <FileClock className="h-5 w-5 mr-2" />
            Documentation and Certification
          </h3>
          
          <div className="space-y-4">
            <p>Proper documentation is a critical element of the inspection and testing process:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Certification Documents</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Electrical Installation Certificate (EIC)</span>
                    <p className="text-sm mt-1">For new installations, alterations, or additions</p>
                  </li>
                  <li>
                    <span className="font-medium">Minor Electrical Installation Works Certificate (MEIWC)</span>
                    <p className="text-sm mt-1">For minor works that don't include a new circuit</p>
                  </li>
                  <li>
                    <span className="font-medium">Electrical Installation Condition Report (EICR)</span>
                    <p className="text-sm mt-1">For existing installation periodic inspection</p>
                  </li>
                  <li>
                    <span className="font-medium">Schedule of Inspections</span>
                    <p className="text-sm mt-1">Record of visual inspection items</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Documentation Components</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Schedule of Test Results</span>
                    <p className="text-sm mt-1">Records all test measurements and values</p>
                  </li>
                  <li>
                    <span className="font-medium">Distribution board schedules</span>
                    <p className="text-sm mt-1">Identification of all circuits and protective devices</p>
                  </li>
                  <li>
                    <span className="font-medium">Operation and maintenance manuals</span>
                    <p className="text-sm mt-1">Information for safe use of installation</p>
                  </li>
                  <li>
                    <span className="font-medium">As-built drawings</span>
                    <p className="text-sm mt-1">Accurate representation of completed installation</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Chapter 61 details inspection requirements, while Chapter 62 covers testing. Certificates must be issued by competent persons and provide a declaration of safety and compliance. Copies must be provided to the person ordering the work, and appropriate information given to the user. Documentation should be retained for future reference.</p>
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

export default Subsection9_1;
