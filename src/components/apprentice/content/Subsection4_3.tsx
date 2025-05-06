
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Power, Earth, Bolt } from "lucide-react";

interface Subsection4_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection4_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection4_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Supply Characteristics</h2>
      
      <div className="space-y-4">
        <p>
          Understanding electrical supply characteristics is fundamental to proper installation design.
          These characteristics form the foundation for all subsequent decisions about an electrical installation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Power className="h-5 w-5 mr-2" />
              Standard Supply Parameters
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Voltage and Frequency</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>UK standard voltage: 230V single-phase (±10%)</li>
                <li>Three-phase voltage: 400V (±10%)</li>
                <li>Standard frequency: 50Hz (±1%)</li>
                <li>Nominal voltage to BS 7671: 230/400V</li>
                <li>Harmonization range: 230V +10%/-6%</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Supply Capacity</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Domestic single-phase: typically 80-100A</li>
                <li>Limited by cut-out fuse rating</li>
                <li>Commercial/industrial: determined by maximum demand</li>
                <li>Expressed in kVA or MVA for larger supplies</li>
                <li>Upgrade may be required for high-demand installations</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Maximum Demand Calculation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Total connected load × diversity factor</li>
                  <li>Domestic diversified load typically 60-100% of connected load</li>
                  <li>Consider load growth for future expansion</li>
                  <li>Impact of electric vehicles, heat pumps, etc.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Earth className="h-5 w-5 mr-2" />
              Earthing Arrangements
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Common UK Systems</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>TN-S:</strong> Separate neutral and protective conductors throughout</li>
                <li><strong>TN-C-S (PME):</strong> Combined PEN conductor in supply, separated in installation</li>
                <li><strong>TT:</strong> Installation earth provided by local electrode</li>
                <li>System identified on the DNO's cut-out or supply termination</li>
                <li>Determines protective measures required in installation</li>
              </ul>
              
              <h4 className="font-semibold mt-4">System Implications</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>TN-C-S (PME) requires main bonding of 10mm²</li>
                <li>TT systems require RCD protection for all circuits</li>
                <li>Additional requirements for PME supplies to outbuildings</li>
                <li>Special considerations for swimming pools and agricultural locations</li>
                <li>Earth electrode testing required for TT systems</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">TN-C-S (PME) Restrictions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Special precautions for swimming pools and shower areas</li>
                  <li>Not permitted for caravans or boats</li>
                  <li>Restricted use in agricultural buildings</li>
                  <li>Special measures for temporary installations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Bolt className="h-5 w-5 mr-2" />
            External Network Characteristics
          </h3>
          
          <div className="space-y-4">
            <p>Supply network characteristics significantly affect protection design:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Fault Current Considerations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Prospective short-circuit current (PSCC)</span>
                    <p className="text-sm mt-1">Maximum fault current that can flow during a short circuit</p>
                  </li>
                  <li>
                    <span className="font-medium">Prospective fault current (PFC)</span>
                    <p className="text-sm mt-1">Maximum current that can flow during a line-to-earth fault</p>
                  </li>
                  <li>
                    <span className="font-medium">Breaking capacity</span>
                    <p className="text-sm mt-1">Protective devices must have breaking capacity exceeding PSCC</p>
                  </li>
                  <li>
                    <span className="font-medium">Typical values</span>
                    <p className="text-sm mt-1">Domestic: 6-16kA, Commercial: 10-25kA, Industrial: 25-50kA+</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">External Impedance</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Supply impedance (Ze)</span>
                    <p className="text-sm mt-1">Impedance of the supply up to installation point</p>
                  </li>
                  <li>
                    <span className="font-medium">Earth fault loop impedance</span>
                    <p className="text-sm mt-1">Determines fault current and disconnection times</p>
                  </li>
                  <li>
                    <span className="font-medium">Maximum Ze values</span>
                    <p className="text-sm mt-1">TN-S: typically 0.35Ω, TN-C-S: typically 0.35Ω, TT: varies</p>
                  </li>
                  <li>
                    <span className="font-medium">Impact on circuit design</span>
                    <p className="text-sm mt-1">Affects cable sizing and protective device selection</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Supplier Information:</p>
              <p>Distribution Network Operators (DNOs) can provide information on supply characteristics including external earth fault loop impedance (Ze), prospective short-circuit current (PSCC), and earthing system type. This information is essential for accurate design calculations and must be obtained before finalization of installation design.</p>
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

export default Subsection4_3;
