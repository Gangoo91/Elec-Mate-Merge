
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldAlert, AlertTriangle, Bolt } from "lucide-react";

interface Subsection6_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection6_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection6_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Test Instruments and Safety Precautions</h2>
      
      <div className="space-y-4">
        <p>
          Testing electrical installations requires specific instruments that must be properly selected, used, and maintained.
          Safety during testing is paramount, requiring proper planning, risk assessment, and adherence to safe working procedures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Bolt className="h-5 w-5 mr-2" />
              Test Instruments
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Common Test Instruments</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Low resistance ohmmeter (continuity tester)</li>
                <li>Insulation resistance tester</li>
                <li>Earth fault loop impedance tester</li>
                <li>RCD tester</li>
                <li>Prospective fault current tester</li>
                <li>Phase rotation indicator</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Instrument Standards</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Must comply with BS EN 61557 series of standards</li>
                <li>Appropriately rated for the circuit voltage</li>
                <li>CAT III or CAT IV rating for building installations</li>
                <li>Regular calibration required (typically annually)</li>
                <li>Verification of functionality before and after testing</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Multifunction Testers:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Combine multiple test functions in one instrument</li>
                  <li>Most common type of instrument for installation testing</li>
                  <li>Provide automated test sequences</li>
                  <li>Typically offer data storage and download capabilities</li>
                  <li>May include specialized functions for specific applications</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Safety Precautions
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Safe Working Practices</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Risk assessment before starting testing</li>
                <li>Safe isolation procedures for dead testing</li>
                <li>Use of appropriate PPE (gloves, eye protection, etc.)</li>
                <li>Avoid working alone when testing</li>
                <li>Clear communication with other trades and occupants</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Live Testing Precautions</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Only permitted when absolutely necessary and justifiable</li>
                <li>Must comply with Electricity at Work Regulations 1989</li>
                <li>Use appropriate insulated tools and protective equipment</li>
                <li>Ensure adequate working space and lighting</li>
                <li>Apply physical barriers to prevent accidental contact</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Instrument Safety:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Visual inspection of instrument and leads before use</li>
                  <li>Check for damage to cases, leads, and probes</li>
                  <li>Verify instrument operation on known circuit</li>
                  <li>Use only manufacturer-approved accessories</li>
                  <li>Follow specific safety instructions for each test type</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Test Procedures and Methods
          </h3>
          
          <div className="space-y-4">
            <p>Effective testing requires following correct procedures and understanding the purpose of each test:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Continuity Testing</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Protective conductor continuity</span>
                    <p className="text-sm mt-1">Verifies continuous path for fault current in protective conductors</p>
                  </li>
                  <li>
                    <span className="font-medium">Ring final circuit continuity</span>
                    <p className="text-sm mt-1">Tests continuity of both phase and neutral in ring circuits</p>
                  </li>
                  <li>
                    <span className="font-medium">Correct instrument use</span>
                    <p className="text-sm mt-1">Test leads must be nulled before testing</p>
                  </li>
                  <li>
                    <span className="font-medium">Resistances assessment</span>
                    <p className="text-sm mt-1">Values should be consistent with conductor length and cross-section</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Insulation Resistance Testing</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Test voltage selection</span>
                    <p className="text-sm mt-1">Typically 500V for installations up to 500V, 1000V for higher voltage installations</p>
                  </li>
                  <li>
                    <span className="font-medium">Connection methods</span>
                    <p className="text-sm mt-1">Line-to-neutral, line-to-earth, neutral-to-earth tests</p>
                  </li>
                  <li>
                    <span className="font-medium">Minimum acceptable values</span>
                    <p className="text-sm mt-1">1MΩ for low voltage circuits (up to 500V)</p>
                  </li>
                  <li>
                    <span className="font-medium">Precautions</span>
                    <p className="text-sm mt-1">Remove electronic equipment, discharge capacitors after testing</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Testing Sequence:</p>
              <p>BS 7671 specifies the sequence in which tests should be carried out. This sequence starts with tests that can be conducted while the installation is disconnected from supply (continuity, insulation resistance) before moving to tests that require connection to supply (polarity, earth fault loop impedance, RCD testing). Following this sequence ensures that fundamental safety issues are identified before the installation is energized.</p>
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

export default Subsection6_2;
