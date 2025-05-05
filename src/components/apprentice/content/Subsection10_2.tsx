
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Ruler, AlignJustify, LineChart } from "lucide-react";

interface Subsection10_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection10_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection10_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Circuit Design</h2>
      
      <div className="space-y-4">
        <p>
          Circuit design involves selecting appropriate equipment, cables, and protective devices to ensure a 
          safe and functional installation. Proper design calculations are essential for compliance with regulations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <AlignJustify className="h-5 w-5 mr-2" />
              Circuit Arrangements
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Domestic Circuit Types</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Lighting circuits (6A or 10A protection)</li>
                <li>Power circuits (ring final and radial arrangements)</li>
                <li>Cooker circuits (45A or 32A dedicated supply)</li>
                <li>Shower circuits (sized according to rating)</li>
                <li>Fixed appliance circuits (dedicated supplies)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Commercial/Industrial Arrangements</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Distribution circuits (submains to subdistribution boards)</li>
                <li>Final circuits for lighting (often controlled by contactors)</li>
                <li>Socket outlet circuits (often on dedicated RCDs)</li>
                <li>Motor circuits (with appropriate starting and protection)</li>
                <li>Special supplies (UPS, standby generation, etc.)</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Circuit Segregation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Separate circuits for different functions</li>
                  <li>Segregation of cables by circuit type</li>
                  <li>Identification of circuits and conductors</li>
                  <li>Separation of emergency circuits</li>
                  <li>Segregation of LV and ELV circuits</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Ruler className="h-5 w-5 mr-2" />
              Cable Sizing and Selection
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Sizing Criteria</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Current-carrying capacity (based on installation method)</li>
                <li>Voltage drop limitations</li>
                <li>Thermal constraints under fault conditions</li>
                <li>Mechanical protection requirements</li>
                <li>Environmental considerations (temperature, thermal insulation)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Cable Types</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>PVC insulated and sheathed cables (flat twin and earth)</li>
                <li>XLPE insulated cables (higher temperature rating)</li>
                <li>SWA (Steel Wire Armored) for mechanical protection</li>
                <li>FP (Fire Performance) cables for critical circuits</li>
                <li>LSF/LSZH (Low Smoke Fume/Zero Halogen) for public areas</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Derating Factors:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ambient temperature (Ca)</li>
                  <li>Grouping of cables (Cg)</li>
                  <li>Thermal insulation proximity (Ci)</li>
                  <li>Harmonic currents (Ch)</li>
                  <li>Applied formula: Design current = Base current × Ca × Cg × Ci × Ch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Protection Design
          </h3>
          
          <div className="space-y-4">
            <p>Selection of appropriate protective devices is critical for safety and functionality:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Overcurrent Protection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Circuit breaker types</span>
                    <p className="text-sm mt-1">Type B, C, or D based on load characteristics</p>
                  </li>
                  <li>
                    <span className="font-medium">Fuse characteristics</span>
                    <p className="text-sm mt-1">gG (general), aM (motor rated), other specific types</p>
                  </li>
                  <li>
                    <span className="font-medium">Breaking capacity</span>
                    <p className="text-sm mt-1">Must exceed maximum prospective fault current</p>
                  </li>
                  <li>
                    <span className="font-medium">Discrimination</span>
                    <p className="text-sm mt-1">Selectivity between protective devices in series</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Additional Protection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">RCD protection</span>
                    <p className="text-sm mt-1">Selection of appropriate sensitivity (30mA, 100mA, 300mA)</p>
                  </li>
                  <li>
                    <span className="font-medium">RCBO applications</span>
                    <p className="text-sm mt-1">Combined overcurrent and earth leakage protection</p>
                  </li>
                  <li>
                    <span className="font-medium">SPD selection</span>
                    <p className="text-sm mt-1">Surge protection based on risk assessment</p>
                  </li>
                  <li>
                    <span className="font-medium">AFDD consideration</span>
                    <p className="text-sm mt-1">Arc fault detection for high-risk locations</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Chapter 43 requires that conductors be protected against overcurrent. The protective devices must be selected and erected to respond to any overcurrent up to and including the prospective short-circuit current. Regulation 411.3.3 requires additional protection by an RCD with a rated residual operating current not exceeding 30mA for socket outlet circuits ≤ 32A and for mobile equipment ≤ 32A for use outdoors.</p>
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

export default Subsection10_2;
