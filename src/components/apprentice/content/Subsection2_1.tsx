
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, Search, Calendar } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection2_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Workplace Inspection Procedures</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          Regular workplace inspections are essential for identifying potential hazards and ensuring compliance with health and safety regulations in electrical installations.
          These inspections help prevent accidents, maintain safe working environments, and demonstrate due diligence with legal obligations.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" /> Types of Workplace Inspections
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">1. Formal Planned Inspections</h4>
              <p className="text-elec-light/80 mt-1">
                Comprehensive inspections scheduled at regular intervals (weekly, monthly, quarterly) that thoroughly examine the workplace for hazards and compliance issues.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Usually involves a team including management and health and safety representatives</li>
                <li>Follows a systematic checklist approach</li>
                <li>Produces formal documentation and follow-up action plans</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">2. Informal Daily Inspections</h4>
              <p className="text-elec-light/80 mt-1">
                Brief visual checks conducted by workers at the start of shifts or before using equipment.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Quick assessment of immediate work areas</li>
                <li>Focuses on obvious hazards and equipment condition</li>
                <li>Not typically documented unless issues are found</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">3. Specific Inspections</h4>
              <p className="text-elec-light/80 mt-1">
                Targeted inspections for particular equipment, tasks or areas.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Pre-use inspection of electrical tools and equipment</li>
                <li>Inspection of scaffolding and access equipment</li>
                <li>Inspection of PPE condition</li>
                <li>Review of isolation procedures before work begins</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">4. Statutory Inspections</h4>
              <p className="text-elec-light/80 mt-1">
                Legally required inspections for specific equipment or systems.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Portable appliance testing (PAT)</li>
                <li>Fixed wiring periodic inspection and testing</li>
                <li>Emergency lighting tests</li>
                <li>Fire alarm system testing</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <Search className="mr-2 h-5 w-5" /> Key Inspection Areas for Electrical Work
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Electrical Equipment and Tools</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Condition of cables, plugs and casings</li>
                <li>Proper PAT testing and labeling</li>
                <li>Appropriate equipment for the environment (e.g., IP ratings)</li>
                <li>Correct storage and handling</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Installation Areas</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Access and egress routes clear of obstructions</li>
                <li>Adequate lighting for detailed work</li>
                <li>Appropriate warning signs in place</li>
                <li>Sufficient work space for safe operations</li>
                <li>Protected from public access where necessary</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Safe Working Practices</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Use of proper isolation procedures</li>
                <li>Verification of dead circuits before work begins</li>
                <li>Appropriate lockout/tagout systems in use</li>
                <li>Correct use of PPE by all workers</li>
                <li>Adherence to method statements and risk assessments</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Documentation</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Risk assessments available and up to date</li>
                <li>Method statements for complex or high-risk tasks</li>
                <li>Permit to work systems where required</li>
                <li>Training records for all personnel</li>
                <li>Equipment maintenance and test records</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <Calendar className="mr-2 h-5 w-5" /> Conducting an Effective Inspection
          </h3>
          
          <ol className="list-decimal pl-6 space-y-3 text-elec-light/80">
            <li>
              <span className="font-semibold text-white">Preparation:</span> Review previous inspection reports, gather appropriate checklists, and ensure you have necessary PPE and inspection tools.
            </li>
            <li>
              <span className="font-semibold text-white">Systematic approach:</span> Follow a logical pattern through the workplace to ensure nothing is missed.
            </li>
            <li>
              <span className="font-semibold text-white">Document findings:</span> Record all observations, both positive and negative, with specific details.
            </li>
            <li>
              <span className="font-semibold text-white">Classify hazards:</span> Rate identified hazards by severity and likelihood to prioritise remedial actions.
            </li>
            <li>
              <span className="font-semibold text-white">Take immediate action:</span> Address serious hazards on the spot if possible.
            </li>
            <li>
              <span className="font-semibold text-white">Develop action plan:</span> Create a timeline for addressing all identified issues.
            </li>
            <li>
              <span className="font-semibold text-white">Follow-up:</span> Verify that recommended actions have been completed effectively.
            </li>
            <li>
              <span className="font-semibold text-white">Review and improve:</span> Analyse findings to identify patterns and improve safety systems.
            </li>
          </ol>
          
          <p className="mt-4 text-elec-light/80">
            Regular workplace inspections demonstrate a commitment to safety and help create a culture 
            where hazards are identified and addressed before they cause harm. They are a vital part 
            of any comprehensive safety management system in electrical installation work.
          </p>
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

export default Subsection2_1;
