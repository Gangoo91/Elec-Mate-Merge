
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Zap, Skull } from "lucide-react";

interface Subsection5_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection5_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection5_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Common Workplace Hazards</h2>
      
      <div className="space-y-4">
        <p>
          Electrical work environments contain numerous hazards that must be identified and managed.
          Understanding these common hazards is the first step in preventing accidents and injuries.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Electrical Hazards
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Electric Shock and Burns</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Live conductors and terminals</li>
                <li>Damaged insulation on cables</li>
                <li>Water near electrical equipment</li>
                <li>Incorrect isolation procedures</li>
                <li>Backfeed from secondary sources</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Fire and Arc Flash</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Overloaded circuits and equipment</li>
                <li>Poor connections causing high resistance</li>
                <li>Short circuits from damaged insulation</li>
                <li>Fault currents causing arcing</li>
                <li>Flammable materials near heat sources</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Control Measures:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Safe isolation procedures</li>
                  <li>Test before touch approach</li>
                  <li>Insulated tools and PPE</li>
                  <li>RCD protection</li>
                  <li>Regular electrical testing</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Physical Hazards
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Falls and Trips</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Working at height without protection</li>
                <li>Trailing cables and poor housekeeping</li>
                <li>Uneven or slippery surfaces</li>
                <li>Poor lighting conditions</li>
                <li>Improper use of access equipment</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Mechanical Injuries</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cuts from sharp tools and materials</li>
                <li>Impact injuries from dropping tools</li>
                <li>Manual handling strains</li>
                <li>Entrapment in moving machinery</li>
                <li>Struck by falling objects</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Control Measures:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proper access equipment</li>
                  <li>Good housekeeping</li>
                  <li>Appropriate PPE (hard hats, safety footwear)</li>
                  <li>Manual handling training</li>
                  <li>Tool tethering when working at height</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Skull className="h-5 w-5 mr-2" />
            Health Hazards
          </h3>
          
          <div className="space-y-4">
            <p>In addition to immediate injury risks, electrical work can expose workers to various health hazards:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Environmental Hazards</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Asbestos</span>
                    <p className="text-sm mt-1">In older buildings, particularly around electrical installations</p>
                  </li>
                  <li>
                    <span className="font-medium">Dust and fibers</span>
                    <p className="text-sm mt-1">From drilling, cutting or working in confined spaces</p>
                  </li>
                  <li>
                    <span className="font-medium">Noise</span>
                    <p className="text-sm mt-1">Power tools and equipment exceeding safe levels</p>
                  </li>
                  <li>
                    <span className="font-medium">Extreme temperatures</span>
                    <p className="text-sm mt-1">Working in unheated/uncooled spaces or near heat sources</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Chemical and Biological Hazards</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Solvents and adhesives</span>
                    <p className="text-sm mt-1">Used in cable installation and joint preparation</p>
                  </li>
                  <li>
                    <span className="font-medium">Lead</span>
                    <p className="text-sm mt-1">In older cable sheathing and solder</p>
                  </li>
                  <li>
                    <span className="font-medium">PCBs</span>
                    <p className="text-sm mt-1">In older capacitors and transformers</p>
                  </li>
                  <li>
                    <span className="font-medium">Biological hazards</span>
                    <p className="text-sm mt-1">Rodent infestations in ducts, sewers and voids</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Hazard Assessment:</p>
              <p>The Control of Substances Hazardous to Health (COSHH) Regulations require employers to assess the risks from hazardous substances and implement control measures. Always review COSHH assessments before starting work with any chemicals, and be aware of potential asbestos-containing materials in buildings built before 2000.</p>
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

export default Subsection5_1;
