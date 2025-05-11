
import React from "react";
import { AlertTriangle, CheckSquare } from "lucide-react";

const RiskAssessment = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Risk Assessment for Electrical Work</h3>
      
      <p className="text-base md:text-lg mb-4">
        Risk assessment is a vital process that identifies potential hazards, evaluates risks, and establishes
        control measures to prevent accidents during electrical installation and maintenance activities.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Risk Assessment Process</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Identify Hazards</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Electrical shock and burns risks</li>
                <li>Fire hazards from faulty equipment</li>
                <li>Working at height concerns</li>
                <li>Manual handling of heavy equipment</li>
                <li>Exposure to harmful substances</li>
                <li>Environmental factors (wet conditions, etc.)</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Evaluate Risks</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Determine likelihood of harm occurring</li>
                <li>Assess potential severity of harm</li>
                <li>Consider who might be affected</li>
                <li>Evaluate existing control measures</li>
                <li>Record findings systematically</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <CheckSquare className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Control Measures</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Implementing Controls</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Follow the hierarchy of controls</li>
                <li>Implement safe work procedures</li>
                <li>Use appropriate PPE and tools</li>
                <li>Ensure proper isolation procedures</li>
                <li>Implement permit-to-work systems where needed</li>
                <li>Regular inspection and maintenance of equipment</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Review & Update</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Regularly review assessment effectiveness</li>
                <li>Update after incidents or near misses</li>
                <li>Revise when working methods change</li>
                <li>Document all changes and improvements</li>
                <li>Communicate updates to all workers</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-base">
          <p className="font-medium mb-1 text-elec-yellow">Legal Requirements:</p>
          <p>The Management of Health and Safety at Work Regulations 1999 require employers to conduct suitable and sufficient 
          risk assessments for activities that may pose risks to employees or others. For electrical work, specific risk 
          assessments must address the unique hazards associated with electricity, in compliance with the Electricity at Work 
          Regulations 1989. Risk assessments must be documented when an employer has five or more employees.</p>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
