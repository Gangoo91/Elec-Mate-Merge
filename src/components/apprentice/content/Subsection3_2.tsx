
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Box, Layers, CableMeasure } from "lucide-react";

interface Subsection3_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection3_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection3_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Containment Systems</h2>
      
      <div className="space-y-4">
        <p>
          Containment systems provide physical protection and support for cables in electrical installations.
          Understanding the different types of containment systems and their applications is essential for proper installation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Box className="h-5 w-5 mr-2" />
              Conduit Systems
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Metal Conduit</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>High mechanical protection and electromagnetic shielding</li>
                <li>Class 1 - standard steel conduit (BS 4568)</li>
                <li>Class 4 - galvanized for corrosion resistance</li>
                <li>Requires appropriate bending tools and techniques</li>
                <li>Must be earthed for safety</li>
              </ul>
              
              <h4 className="font-semibold mt-4">PVC Conduit</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Excellent corrosion resistance and lower cost</li>
                <li>Available in light, medium, and heavy grades</li>
                <li>Can be heated for bending</li>
                <li>Less mechanical protection than metal</li>
                <li>Expands/contracts with temperature changes</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Installation Considerations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Maximum support spacing: 1.2m for PVC, 1.5m for metal</li>
                  <li>Minimum bend radius typically 4x external diameter</li>
                  <li>Use appropriate fittings for changes in direction</li>
                  <li>Allow for expansion joints in long PVC runs</li>
                  <li>Space requirement: 45% maximum fill ratio for new installations</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Trunking and Cable Tray
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Metal and PVC Trunking</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Rectangular containment with removable lids</li>
                <li>Various sizes and compartmented options</li>
                <li>Metal trunking requires earthing</li>
                <li>Mini-trunking for smaller cable runs</li>
                <li>Special types: skirting, dado, floor, etc.</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Cable Tray and Basket</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Open support system for larger cable installations</li>
                <li>Perforated or ladder types for different applications</li>
                <li>Cable basket offers flexibility for complex routes</li>
                <li>High load capacity when properly supported</li>
                <li>Requires cable fixing at appropriate intervals</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Installation Considerations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Support spacing based on load and manufacturer specifications</li>
                  <li>Maintain separation between power and data cables</li>
                  <li>Use appropriate fittings for changes in direction</li>
                  <li>Proper earthing essential for metal systems</li>
                  <li>Ensure secure fixing to building structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <CableMeasure className="h-5 w-5 mr-2" />
            Containment Selection Factors
          </h3>
          
          <div className="space-y-4">
            <p>Selecting the appropriate containment system depends on several factors:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Environmental Considerations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Moisture and water exposure</span>
                    <p className="text-sm mt-1">Use galvanized or non-metallic systems in wet areas</p>
                  </li>
                  <li>
                    <span className="font-medium">Corrosive environments</span>
                    <p className="text-sm mt-1">PVC or specially coated systems may be required</p>
                  </li>
                  <li>
                    <span className="font-medium">Temperature extremes</span>
                    <p className="text-sm mt-1">Consider expansion/contraction and material limitations</p>
                  </li>
                  <li>
                    <span className="font-medium">Fire risk areas</span>
                    <p className="text-sm mt-1">Metal systems or fire-rated non-metallic containment</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Practical Considerations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Cable capacity and future expansion</span>
                    <p className="text-sm mt-1">Allow 30-50% spare capacity for future needs</p>
                  </li>
                  <li>
                    <span className="font-medium">Accessibility requirements</span>
                    <p className="text-sm mt-1">Trunking offers better access than conduit</p>
                  </li>
                  <li>
                    <span className="font-medium">Aesthetic considerations</span>
                    <p className="text-sm mt-1">Surface or concealed installation options</p>
                  </li>
                  <li>
                    <span className="font-medium">Budget constraints</span>
                    <p className="text-sm mt-1">Balance between initial cost and long-term reliability</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 (18th Edition) requires containment systems to be selected and erected to prevent damage to cables and to consider external influences. Regulation 521.10.1 requires cables to be supported continuously or at appropriate intervals.</p>
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

export default Subsection3_2;
