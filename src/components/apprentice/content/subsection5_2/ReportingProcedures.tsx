
import React from "react";
import { AlertTriangle, Users, MessageSquare } from "lucide-react";

const ReportingProcedures = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Formal Hazard Reporting Procedures</h3>
      
      <p className="text-sm md:text-base mb-4">
        Understanding and following the correct reporting procedures ensures that hazards are addressed promptly and effectively.
        Every workplace should have established protocols for reporting hazards that all workers must follow.
      </p>
      
      {/* Horizontal Layout for Reporting Process */}
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Initial Reporting</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Immediate Action:</span> If the hazard presents an immediate danger, take appropriate steps to make the area safe if possible and alert others nearby.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Verbal Report:</span> Notify your supervisor or safety representative verbally as soon as the hazard is identified.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Written Documentation:</span> Complete the required hazard report form, providing detailed information about the nature and location of the hazard.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Users className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Reporting Chain</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Direct Supervisor:</span> Your immediate supervisor is typically the first point of contact for reporting hazards.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Health & Safety Rep:</span> If your supervisor is unavailable or the issue remains unresolved, contact your workplace safety representative.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Management:</span> Escalate to senior management if the hazard is significant or if there's been no response to initial reports.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">External Authorities:</span> For serious unresolved hazards, contact the HSE or other relevant regulatory bodies as a last resort.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Follow-Up Process</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Hazard Investigation:</span> Supervisors should investigate reported hazards promptly, typically within 24 hours of notification.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Resolution Timeline:</span> Set clear timeframes for addressing the hazard based on its severity and risk level.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Reporter Feedback:</span> Provide feedback to the person who reported the hazard about actions taken and resolution status.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <p className="text-sm"><span className="font-medium text-elec-yellow">Documentation:</span> Record all actions taken in response to the hazard report, including control measures implemented.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-elec-gray rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-elec-yellow mb-1">Legal Obligations</h4>
              <p className="text-sm">
                Under the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999, 
                both employers and employees have legal duties regarding hazard reporting. Employees must report hazards they 
                identify, and employers must have systems in place to record and address these reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingProcedures;
