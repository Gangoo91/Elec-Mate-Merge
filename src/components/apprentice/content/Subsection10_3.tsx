
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ZapOff, Building, FlaskConical } from "lucide-react";

interface Subsection10_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection10_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection10_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Special Installations Design</h2>
      
      <div className="space-y-4">
        <p>
          Some installations require special design considerations due to particular risks or requirements.
          Understanding these special cases is essential for designing compliant and safe electrical systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <ZapOff className="h-5 w-5 mr-2" />
              Emergency Systems
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Emergency Lighting</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Requirements based on BS 5266</li>
                <li>Risk assessment for determining coverage</li>
                <li>Maintained and non-maintained systems</li>
                <li>Centralized and self-contained options</li>
                <li>Fire-rated cable requirements</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Standby Power</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Generator sizing and selection</li>
                <li>UPS systems for critical loads</li>
                <li>Automatic and manual transfer arrangements</li>
                <li>Categorization of loads (vital, essential, non-essential)</li>
                <li>Testing and maintenance considerations</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Fire Alarm Systems:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Design to BS 5839 standards</li>
                  <li>System categories L1-L5, P1-P2</li>
                  <li>Detector and call point positioning</li>
                  <li>Cable selection (enhanced fire resistance)</li>
                  <li>Segregation from other electrical systems</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Specialized Locations
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Medical Locations</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Group classifications (0, 1, 2) based on medical use</li>
                <li>Additional protection requirements for Group 2 locations</li>
                <li>Special earthing arrangements (medical IT system)</li>
                <li>Isolation monitoring and alarm systems</li>
                <li>Backup power with defined changeover times</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Explosive Atmospheres</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>ATEX and DSEAR requirements</li>
                <li>Zone classification (0, 1, 2 for gas; 20, 21, 22 for dust)</li>
                <li>Equipment selection based on gas groups and temperature classes</li>
                <li>Protection concepts (Ex d, Ex e, Ex i, etc.)</li>
                <li>Special installation techniques and documentation</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Data Centers:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Redundancy levels (N, N+1, 2N)</li>
                  <li>Power quality requirements</li>
                  <li>Tier classification implications</li>
                  <li>Cooling and environmental monitoring</li>
                  <li>Integrated power distribution systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <FlaskConical className="h-5 w-5 mr-2" />
            Advanced Design Considerations
          </h3>
          
          <div className="space-y-4">
            <p>Modern electrical installations often include specialized systems requiring specific design approaches:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Energy Efficiency Measures</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">LED lighting design</span>
                    <p className="text-sm mt-1">Lumen method, lighting controls, emergency integration</p>
                  </li>
                  <li>
                    <span className="font-medium">Variable speed drives</span>
                    <p className="text-sm mt-1">Motor control, harmonic considerations, EMC</p>
                  </li>
                  <li>
                    <span className="font-medium">Building management systems</span>
                    <p className="text-sm mt-1">Integration of controls, energy monitoring</p>
                  </li>
                  <li>
                    <span className="font-medium">Power factor correction</span>
                    <p className="text-sm mt-1">Fixed and automatic systems, harmonic filters</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Renewable Integration</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">PV solar systems</span>
                    <p className="text-sm mt-1">Inverter selection, DC system design, protection</p>
                  </li>
                  <li>
                    <span className="font-medium">Battery storage</span>
                    <p className="text-sm mt-1">Capacity sizing, charging systems, safety</p>
                  </li>
                  <li>
                    <span className="font-medium">EV charging</span>
                    <p className="text-sm mt-1">Mode selection, load management, futureproofing</p>
                  </li>
                  <li>
                    <span className="font-medium">Grid connection</span>
                    <p className="text-sm mt-1">G99 requirements, export limitation, protection</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>Special installations are covered in Part 7 of BS 7671. These include bathrooms (Section 701), swimming pools (Section 702), saunas (Section 703), construction sites (Section 704), agricultural premises (Section 705), restrictive conductive locations (Section 706), medical locations (Section 710), exhibitions and shows (Section 711), solar PV systems (Section 712), mobile units (Section 717), and electric vehicle charging (Section 722).</p>
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

export default Subsection10_3;
