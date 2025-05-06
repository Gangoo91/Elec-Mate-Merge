
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, AlertTriangle, Shield } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection1_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Electricity at Work Regulations 1989</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          The Electricity at Work Regulations 1989 provide the legal framework for electrical safety in the workplace. These regulations apply to all aspects of electrical work and systems across all industries in the UK.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <Shield className="mr-2 h-5 w-5" /> Key Requirements
          </h3>
          
          <ul className="list-disc pl-6 space-y-3 text-elec-light/80">
            <li>
              <span className="font-semibold text-white">Regulation 4(1):</span> All electrical systems shall be constructed and maintained to prevent danger, so far as is reasonably practicable.
            </li>
            <li>
              <span className="font-semibold text-white">Regulation 4(3):</span> All work activities shall be carried out in a manner that does not give rise to danger, so far as is reasonably practicable.
            </li>
            <li>
              <span className="font-semibold text-white">Regulation 14:</span> No person shall work on or near any live conductor unless it is unreasonable to work dead, suitable precautions are taken, and the person is competent.
            </li>
            <li>
              <span className="font-semibold text-white">Regulation 16:</span> Persons carrying out electrical work must be competent or under appropriate supervision.
            </li>
          </ul>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <BookOpen className="mr-2 h-5 w-5" /> Implications for Electricians
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            As a professional electrician, these regulations directly impact your day-to-day work:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-elec-light/80">
            <li>You must ensure all electrical installations meet the requirements of BS 7671 (IET Wiring Regulations).</li>
            <li>Safe working procedures must be followed at all times, including proper isolation before working on circuits.</li>
            <li>Live working is prohibited except in exceptional circumstances where justified by risk assessment.</li>
            <li>All test equipment must be suitable for the intended use and regularly calibrated.</li>
            <li>You must maintain evidence of your competence through qualifications and continuing professional development.</li>
          </ul>
        </div>
        
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-amber-400 flex items-center mb-4">
            <AlertTriangle className="mr-2 h-5 w-5" /> Legal Consequences
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            Failure to comply with the Electricity at Work Regulations can result in:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-elec-light/80">
            <li>Health and Safety Executive (HSE) enforcement notices</li>
            <li>Prohibition notices that can stop work activities</li>
            <li>Improvement notices requiring remedial action</li>
            <li>Prosecution of employers and individuals</li>
            <li>Substantial fines and potential imprisonment for serious breaches</li>
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

export default Subsection1_1;
