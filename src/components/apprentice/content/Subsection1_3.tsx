
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, AlertTriangle, Clock } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection1_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">RIDDOR and Incident Reporting</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR) requires employers, 
          the self-employed and those in control of premises to report specified workplace incidents to the Health and Safety Executive (HSE).
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" /> What Must Be Reported Under RIDDOR
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Types of Reportable Incidents:</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Deaths due to work activities</li>
                <li>Specified injuries to workers (e.g., electrical burns, fractures, amputations)</li>
                <li>Over-seven-day injuries that prevent normal work for more than seven consecutive days</li>
                <li>Injuries to non-workers requiring hospital treatment</li>
                <li>Occupational diseases (e.g., occupational dermatitis)</li>
                <li>Dangerous occurrences (near misses with potential for serious injury)</li>
                <li>Gas incidents</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Electrical-Specific Reportable Incidents:</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Electric shock or electrical burn leading to unconsciousness or requiring resuscitation or admittance to hospital for more than 24 hours</li>
                <li>Any explosion or fire caused by an electrical short circuit or overload with significant damage</li>
                <li>Electrical incidents that cause or could have caused death or major injury</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <Clock className="mr-2 h-5 w-5" /> Reporting Timeframes
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Fatal and Specified Injuries:</h4>
              <p className="text-elec-light/80">Report without delay, by telephone if necessary, and follow up with a report within 10 days.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Over-Seven-Day Injuries:</h4>
              <p className="text-elec-light/80">Report within 15 days of the accident.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Occupational Diseases:</h4>
              <p className="text-elec-light/80">Report as soon as the responsible person receives a written diagnosis from a doctor.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Dangerous Occurrences:</h4>
              <p className="text-elec-light/80">Report without delay and send a written report within 10 days.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Gas Incidents:</h4>
              <p className="text-elec-light/80">Gas engineers must report within 14 days of becoming aware of the incident.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-amber-400 flex items-center mb-4">
            <AlertTriangle className="mr-2 h-5 w-5" /> Reporting Procedure
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            To report a RIDDOR incident:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2 text-elec-light/80">
            <li>Gather all relevant information about the incident</li>
            <li>Report online at the HSE website using the appropriate form</li>
            <li>For fatal and specified incidents, call the Incident Contact Centre on 0345 300 9923</li>
            <li>Keep records of all incidents for at least three years</li>
            <li>Review incidents to identify patterns and implement preventive measures</li>
          </ol>
          
          <p className="mt-4 text-amber-400 font-semibold">
            Failure to report incidents under RIDDOR is a criminal offence and can result in prosecution.
          </p>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">
            Record Keeping Beyond RIDDOR
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            Even if incidents don't meet RIDDOR criteria, good practice requires:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-elec-light/80">
            <li>Recording all accidents in an accident book</li>
            <li>Investigating incidents to identify root causes</li>
            <li>Documenting near misses to prevent future accidents</li>
            <li>Reviewing safety procedures following any incident</li>
            <li>Maintaining records of safety inspections and risk assessments</li>
          </ul>
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
