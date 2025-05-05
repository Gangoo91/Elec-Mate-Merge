
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection1_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Electricity at Work Regulations 1989</h2>
      
      <div className="space-y-5">
        <CourseContentSection
          title="Electricity at Work Regulations 1989"
          description="The Electricity at Work Regulations 1989 is a key piece of legislation that establishes legal duties for employers and electricians. It requires that all electrical systems are maintained to prevent danger, work activities are carried out safely, and those working on electrical systems are competent. The regulations apply to all aspects of electrical work and cover both fixed installations and portable equipment. Compliance with these regulations is a legal requirement for all electrical workers."
          keyPoints={[
            "Legal requirement for safe working with electricity",
            "Applies to all electrical systems and work activities",
            "Requires systems to be maintained in a safe condition",
            "Mandates competence for those working on electrical systems"
          ]}
          icon="shield-alert"
          subsectionId={subsectionId}
        />
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Key Requirements
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Regulation 4: Systems, Work Activities and Protective Equipment</h4>
              <p className="text-sm md:text-base">
                All electrical systems must be constructed and maintained to prevent danger, and all work activities must be carried out safely.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Regulation 14: Work on Equipment Made Dead</h4>
              <p className="text-sm md:text-base">
                Electrical equipment must be disconnected from all sources of supply and proven dead before work begins, unless it is unreasonable to do so.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Regulation 16: Competence to Prevent Danger</h4>
              <p className="text-sm md:text-base">
                No person shall engage in work where technical knowledge or experience is necessary to prevent danger, unless they have such knowledge or experience.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Enforcement and Penalties</h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              The Health and Safety Executive (HSE) enforces the Electricity at Work Regulations 1989. Breaches can result in:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium text-white">Improvement Notices</span>
                <p className="text-sm mt-1">Requiring remedial action within a specified time period.</p>
              </li>
              <li>
                <span className="font-medium text-white">Prohibition Notices</span>
                <p className="text-sm mt-1">Stopping work immediately until hazards are remedied.</p>
              </li>
              <li>
                <span className="font-medium text-white">Prosecutions</span>
                <p className="text-sm mt-1">Resulting in unlimited fines and/or imprisonment for serious breaches.</p>
              </li>
            </ul>
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

export default Subsection1_1;
