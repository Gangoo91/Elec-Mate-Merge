
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, ShieldAlert, Hammer } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection3_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Risk Assessment in Electrical Work</h2>
      
      <div className="space-y-4">
        <p>
          Risk assessment is a fundamental process for identifying hazards and implementing control measures
          in electrical installation work. A systematic approach ensures the safety of workers and others.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Risk Assessment Process
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Five Steps to Risk Assessment</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identify the hazards</li>
                <li>Determine who might be harmed and how</li>
                <li>Evaluate the risks and decide on precautions</li>
                <li>Record your findings and implement them</li>
                <li>Review your assessment and update if necessary</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Common Electrical Hazards</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Electric shock and burns</li>
                <li>Fire and explosion</li>
                <li>Arcing and flashover</li>
                <li>Mechanical hazards from equipment</li>
                <li>Environmental hazards (water, dust, temperature)</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Legal Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Management of Health and Safety at Work Regulations 1999</li>
                  <li>Risk assessment must be suitable and sufficient</li>
                  <li>Must be reviewed regularly and when conditions change</li>
                  <li>Special considerations for young workers, expectant mothers</li>
                  <li>Employers with 5+ employees must record significant findings</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Control Measures
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Hierarchy of Control</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Elimination - Remove the hazard completely</li>
                <li>Substitution - Replace with a safer alternative</li>
                <li>Engineering controls - Physical safeguards</li>
                <li>Administrative controls - Safe working procedures</li>
                <li>Personal Protective Equipment (PPE) - Last line of defense</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Specific Control Measures</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Isolation and lock-off procedures</li>
                <li>Safe working distances</li>
                <li>Insulated tools and equipment</li>
                <li>Protective barriers and signage</li>
                <li>Competent supervision for trainees</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">PPE for Electrical Work:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Insulated gloves for live work (where permitted)</li>
                  <li>Eye protection for protection against arcs</li>
                  <li>Flame-resistant clothing for high-risk work</li>
                  <li>Safety footwear with electrical resistance</li>
                  <li>Insulating mats for standing on when necessary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Hammer className="h-5 w-5 mr-2" />
            Practical Risk Assessment for Electrical Tasks
          </h3>
          
          <div className="space-y-4">
            <p>Applying risk assessment principles to common electrical installation tasks:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Installing Consumer Units</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Hazards</span>
                    <p className="text-sm mt-1">Electric shock, sharp edges, awkward postures</p>
                  </li>
                  <li>
                    <span className="font-medium">Controls</span>
                    <p className="text-sm mt-1">Isolation, verification of dead circuit, insulated tools</p>
                  </li>
                  <li>
                    <span className="font-medium">Considerations</span>
                    <p className="text-sm mt-1">Adequate working space, proper lighting, assistance for heavy units</p>
                  </li>
                  <li>
                    <span className="font-medium">Emergency procedures</span>
                    <p className="text-sm mt-1">First aid provisions, emergency contacts, clear access/egress</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Cable Installation</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Hazards</span>
                    <p className="text-sm mt-1">Working at height, manual handling, concealed services</p>
                  </li>
                  <li>
                    <span className="font-medium">Controls</span>
                    <p className="text-sm mt-1">Cable detector use, proper access equipment, task rotation</p>
                  </li>
                  <li>
                    <span className="font-medium">Considerations</span>
                    <p className="text-sm mt-1">Environmental conditions, presence of other trades, work sequencing</p>
                  </li>
                  <li>
                    <span className="font-medium">Documentation</span>
                    <p className="text-sm mt-1">Method statements, permit to work systems when needed</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>The HSE encourages a proportionate approach to risk assessment. For routine electrical tasks, generic risk assessments may be adapted for specific site conditions. However, non-standard work or high-risk environments will require task-specific risk assessments. All electricians should be involved in the risk assessment process for work they undertake.</p>
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
