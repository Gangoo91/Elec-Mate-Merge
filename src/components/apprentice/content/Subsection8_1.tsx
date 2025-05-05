
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";

interface Subsection8_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection8_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection8_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Protection Against Electric Shock</h2>
      
      <div className="space-y-4">
        <p>
          Protection against electric shock is fundamental to electrical safety. BS 7671 classifies protection measures into 
          basic protection (to prevent contact with live parts) and fault protection (to prevent danger in case of failure).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2" />
              Basic Protection Measures
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Insulation of Live Parts</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Primary method of basic protection</li>
                <li>Appropriate for the voltage and external influences</li>
                <li>Must withstand mechanical, chemical, and thermal stresses</li>
                <li>Only removable by destruction or tools</li>
                <li>Example: insulation of conductors, cables, and components</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Barriers and Enclosures</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Minimum protection level of IPXXB or IP2X</li>
                <li>Top surfaces of enclosures require IP4X (protected against wires)</li>
                <li>Only removable with tools or after disconnection</li>
                <li>Maintaining integrity of protection during service</li>
                <li>Example: consumer units, junction boxes, switch enclosures</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Additional Methods:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Obstacles (qualified personnel only)</li>
                  <li>Placing out of reach (qualified personnel only)</li>
                  <li>SELV (Safety Extra-Low Voltage) systems</li>
                  <li>PELV (Protective Extra-Low Voltage) systems</li>
                  <li>Electrical separation for specific applications</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Fault Protection Measures
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Automatic Disconnection of Supply (ADS)</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Primary method for most installations</li>
                <li>Protective earthing of exposed-conductive-parts</li>
                <li>Protective equipotential bonding of extraneous-conductive-parts</li>
                <li>Fault current detection and automatic disconnection</li>
                <li>Maximum disconnection times based on system and circuit types</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Additional Protection</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>RCDs (Residual Current Devices) - typically 30mA sensitivity</li>
                <li>Required for socket outlet circuits ≤ 32A</li>
                <li>Required for cable concealed at less than 50mm depth</li>
                <li>Required for circuits in special locations</li>
                <li>Supplementary bonding in special locations</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Other Fault Protection Methods:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Double or reinforced insulation (Class II equipment)</li>
                  <li>Non-conducting location (special installations only)</li>
                  <li>Earth-free local equipotential bonding (special applications)</li>
                  <li>Electrical separation (single items of equipment)</li>
                  <li>Limitation of discharge energy (capacitive circuits)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ShieldOff className="h-5 w-5 mr-2" />
            Protection Coordination and Testing
          </h3>
          
          <div className="space-y-4">
            <p>Effective protection against electric shock relies on proper coordination and testing of measures:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">System and Protection Coordination</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">TN-S and TN-C-S systems</span>
                    <p className="text-sm mt-1">Protective devices must operate within specified times</p>
                  </li>
                  <li>
                    <span className="font-medium">TT systems</span>
                    <p className="text-sm mt-1">RCD protection generally required as earth resistance is higher</p>
                  </li>
                  <li>
                    <span className="font-medium">IT systems</span>
                    <p className="text-sm mt-1">First fault indication, second fault disconnection</p>
                  </li>
                  <li>
                    <span className="font-medium">Maximum earth fault loop impedance</span>
                    <p className="text-sm mt-1">Calculated based on circuit protective device characteristics</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Essential Tests</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Continuity of protective conductors</span>
                    <p className="text-sm mt-1">R₁+R₂ value for ring circuits, R₂ for all circuits</p>
                  </li>
                  <li>
                    <span className="font-medium">Insulation resistance</span>
                    <p className="text-sm mt-1">500V test for low voltage installations</p>
                  </li>
                  <li>
                    <span className="font-medium">Earth fault loop impedance</span>
                    <p className="text-sm mt-1">Measured at furthest point of each circuit</p>
                  </li>
                  <li>
                    <span className="font-medium">RCD operation</span>
                    <p className="text-sm mt-1">Testing at 50% and 100% of rated tripping current</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Chapter 41 details protection against electric shock. Maximum disconnection times for final circuits not exceeding 32A are 0.4 seconds in TN systems and 0.2 seconds in TT systems. For distribution circuits and circuits exceeding 32A, the maximum disconnection time is 5 seconds.</p>
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

export default Subsection8_1;
