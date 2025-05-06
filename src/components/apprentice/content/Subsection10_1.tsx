
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, Calculator, Brain } from "lucide-react";

interface Subsection10_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection10_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection10_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Design Principles</h2>
      
      <div className="space-y-4">
        <p>
          Electrical installation design requires a systematic approach to ensure safety, functionality, 
          and compliance with regulations. The design process follows established principles and methodologies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Design Process
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Initial Assessment</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Understanding client requirements and expectations</li>
                <li>Site survey and existing infrastructure assessment</li>
                <li>Identification of constraints and opportunities</li>
                <li>Confirmation of supply characteristics (voltage, frequency, earthing)</li>
                <li>Consideration of external influences (environment, usage)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Design Development</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Assessment of maximum demand and diversity</li>
                <li>Location of intake position and main distribution</li>
                <li>Circuit arrangements and containment routes</li>
                <li>Selection of equipment and protective devices</li>
                <li>Cable sizing calculations and voltage drop assessment</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Design Documentation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Layout drawings showing equipment positions</li>
                  <li>Schematic diagrams of distribution system</li>
                  <li>Circuit schedules and cable specifications</li>
                  <li>Design calculations and supporting information</li>
                  <li>Specification of materials and equipment</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Design Calculations
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Load Assessment</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Connected load evaluation</li>
                <li>Application of diversity factors</li>
                <li>Determination of maximum demand</li>
                <li>Load growth allowance for future expansion</li>
                <li>Assessment of starting currents for motors</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Protection Calculations</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Fault current calculations (prospective short-circuit current)</li>
                <li>Earth fault loop impedance assessment</li>
                <li>Protective device characteristics and coordination</li>
                <li>Verification of disconnection times</li>
                <li>Assessment of thermal effects under fault conditions</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Cable Sizing Factors:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Current-carrying capacity (based on installation method)</li>
                  <li>Correction factors for ambient temperature</li>
                  <li>Correction factors for grouping</li>
                  <li>Correction factors for thermal insulation</li>
                  <li>Voltage drop limitations (3% lighting, 5% other uses)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Design Considerations
          </h3>
          
          <div className="space-y-4">
            <p>Effective electrical design considers multiple interrelated factors:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Technical Factors</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Safety requirements</span>
                    <p className="text-sm mt-1">Protection against electric shock, fire, thermal effects</p>
                  </li>
                  <li>
                    <span className="font-medium">Power quality issues</span>
                    <p className="text-sm mt-1">Harmonics, power factor, voltage regulation</p>
                  </li>
                  <li>
                    <span className="font-medium">Electromagnetic compatibility</span>
                    <p className="text-sm mt-1">Interference with electronic equipment, separation distances</p>
                  </li>
                  <li>
                    <span className="font-medium">Reliability requirements</span>
                    <p className="text-sm mt-1">Critical systems, redundancy, backup systems</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Practical Factors</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Energy efficiency</span>
                    <p className="text-sm mt-1">Low-energy lighting, efficient motors, controls</p>
                  </li>
                  <li>
                    <span className="font-medium">Maintainability</span>
                    <p className="text-sm mt-1">Access for inspection and maintenance, modular design</p>
                  </li>
                  <li>
                    <span className="font-medium">Flexibility for change</span>
                    <p className="text-sm mt-1">Adaptation to future requirements, expansion capability</p>
                  </li>
                  <li>
                    <span className="font-medium">Budget constraints</span>
                    <p className="text-sm mt-1">Cost-effective solutions, value engineering</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 requires that every installation be divided into circuits as necessary for safety, maintenance, and functional requirements. Regulation 311.1 states that the design shall be carried out by a competent person with appropriate skills and knowledge. Design calculations and decisions must be documented to demonstrate compliance with regulations.</p>
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

export default Subsection10_1;
