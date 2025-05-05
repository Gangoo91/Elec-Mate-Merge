
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection1_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">RIDDOR and Incident Reporting</h2>
      
      <div className="space-y-5">
        <CourseContentSection
          title="RIDDOR and Incident Reporting"
          description="The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) creates a legal duty to report certain workplace incidents to the Health and Safety Executive (HSE). For electrical workers, this includes reporting any electrical accident that results in a fatality, specified injury, or incapacitation for more than seven days. RIDDOR also requires reporting of dangerous occurrences related to electrical work, even if no injury results, such as electrical short circuits or overloads which cause significant damage or fire. Occupational diseases that may affect electrical workers, such as hand-arm vibration syndrome or occupational dermatitis, must also be reported when diagnosed."
          keyPoints={[
            "Mandates reporting of work-related accidents resulting in serious injury",
            "Covers dangerous occurrences even if no injury results",
            "Requires reporting of certain occupational diseases",
            "Specifies timeframes for different types of reports",
            "Reports contribute to national statistics and help identify industry-wide safety trends"
          ]}
          icon="safety"
          subsectionId={subsectionId}
        />
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Reportable Incidents
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Under RIDDOR, the following types of incidents must be reported to the HSE:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Deaths</h4>
                <p className="text-sm">
                  All deaths to workers and non-workers that arise from a work-related accident.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Specified Injuries</h4>
                <p className="text-sm">
                  Including fractures, amputations, serious burns, loss of sight, and any injury leading to unconsciousness.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Over-7-day Injuries</h4>
                <p className="text-sm">
                  Injuries that result in a worker being away from work or unable to perform normal duties for more than 7 days.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Dangerous Occurrences</h4>
                <p className="text-sm">
                  Near-miss events with potential for serious injury, such as electrical short circuits causing significant damage.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">RIDDOR Reporting Procedures</h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              When a RIDDOR reportable incident occurs, specific procedures must be followed:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium text-white">Immediate Actions</span>
                <p className="text-sm mt-1">Secure the scene, provide first aid, and notify appropriate personnel.</p>
              </li>
              <li>
                <span className="font-medium text-white">Reporting Timeframes</span>
                <p className="text-sm mt-1">Deaths and specified injuries must be reported immediately. Over-7-day injuries must be reported within 15 days.</p>
              </li>
              <li>
                <span className="font-medium text-white">Online Reporting</span>
                <p className="text-sm mt-1">Most incidents can be reported via the HSE website using the appropriate online form.</p>
              </li>
              <li>
                <span className="font-medium text-white">Record Keeping</span>
                <p className="text-sm mt-1">Records of all reportable incidents must be kept for at least three years.</p>
              </li>
            </ul>
            
            <div className="mt-4 bg-elec-dark/50 p-3 rounded border border-elec-yellow/20">
              <p className="text-sm">
                <strong>Important:</strong> For fatal and specified injuries only, the Incident Contact Centre can be contacted by telephone at 0345 300 9923 (Monday to Friday 8:30am to 5pm).
              </p>
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

export default Subsection1_3;
