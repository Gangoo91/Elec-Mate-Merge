
import React from "react";
import { ClipboardList, FileText } from "lucide-react";

const RiskAssessment = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Risk Assessment for Electrical Work</h3>
      
      <p className="text-base md:text-lg mb-4">
        Risk assessment is a systematic process of evaluating potential hazards in the workplace and determining 
        appropriate control measures. For electrical work, thorough risk assessments are essential to identify hazards 
        before they cause harm.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <ClipboardList className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Risk Assessment Process</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Five Steps of Risk Assessment</h5>
              <ol className="list-decimal list-inside text-base space-y-1">
                <li><span className="text-elec-yellow">Identify the hazards</span> - Inspect the work area, review documentation</li>
                <li><span className="text-elec-yellow">Determine who might be harmed</span> - Consider workers, public, occupants</li>
                <li><span className="text-elec-yellow">Evaluate the risks and decide on precautions</span> - Determine control measures</li>
                <li><span className="text-elec-yellow">Record your findings</span> - Document the assessment</li>
                <li><span className="text-elec-yellow">Review and update</span> - Regularly review as work progresses</li>
              </ol>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Common Electrical Hazards to Consider</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Electric shock or electrocution</li>
                <li>Fire from electrical faults</li>
                <li>Burns from arc flash or blast</li>
                <li>Trips and falls due to trailing cables</li>
                <li>Mechanical hazards from power tools</li>
                <li>Hazards from damaged insulation</li>
                <li>Risks from working in confined spaces</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Control Measures</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Hierarchy of Controls</h5>
              <ol className="list-decimal list-inside text-base space-y-1">
                <li><span className="text-elec-yellow">Elimination</span> - Remove the hazard completely</li>
                <li><span className="text-elec-yellow">Substitution</span> - Replace with something less hazardous</li>
                <li><span className="text-elec-yellow">Engineering controls</span> - Redesign to reduce risk</li>
                <li><span className="text-elec-yellow">Administrative controls</span> - Work instructions, safe systems</li>
                <li><span className="text-elec-yellow">PPE</span> - Last line of defence, not a substitute for other controls</li>
              </ol>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Specific Control Measures for Electrical Work</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Safe isolation procedures</li>
                <li>Permit-to-work systems for high-risk activities</li>
                <li>Use of insulated tools and equipment</li>
                <li>Protective barriers and signage</li>
                <li>Circuit protective devices (RCDs, fuses, etc.)</li>
                <li>Safe systems of work</li>
                <li>Appropriate PPE for electrical work</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Dynamic Risk Assessment</h5>
              <p className="text-base">
                Continuously assess risks as work progresses and conditions change. Be prepared to stop work if new hazards emerge.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-base">
          <p className="font-medium mb-1 text-elec-yellow">Legal Requirements:</p>
          <p>Under the Management of Health and Safety at Work Regulations 1999, employers must conduct suitable and sufficient risk assessments 
          for all work activities. The Electricity at Work Regulations 1989 further require that all work activities involving electrical 
          systems must be assessed for risk. Employers and self-employed persons are legally required to record significant findings of 
          risk assessments if they employ five or more people.</p>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
