
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, MessageSquare, Users } from "lucide-react";

const ReportingProcedures = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Formal Hazard Reporting Procedures</h3>
      
      <p className="text-sm md:text-base mb-4">
        Understanding and following the correct reporting procedures ensures that hazards are addressed promptly and effectively.
        Every workplace should have established protocols for reporting hazards that all workers must follow.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-elec-dark border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Initial Reporting</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Immediate Action</h4>
                <p className="text-sm">If the hazard presents an immediate danger, take appropriate steps to make the area safe if possible and alert others nearby.</p>
              </li>
              
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Verbal Report</h4>
                <p className="text-sm">Notify your supervisor or safety representative verbally as soon as the hazard is identified.</p>
              </li>
              
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Written Documentation</h4>
                <p className="text-sm">Complete the required hazard report form, providing detailed information about the nature and location of the hazard.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Reporting Chain</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Direct Supervisor</h4>
                <p className="text-sm">Your immediate supervisor is typically the first point of contact for reporting hazards.</p>
              </li>
              
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Health & Safety Representative</h4>
                <p className="text-sm">If your supervisor is unavailable or the issue remains unresolved, contact your workplace safety representative.</p>
              </li>
              
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Management</h4>
                <p className="text-sm">Escalate to senior management if the hazard is significant or if there's been no response to initial reports.</p>
              </li>

              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">External Authorities</h4>
                <p className="text-sm">For serious unresolved hazards, contact the HSE or other relevant regulatory bodies as a last resort.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Follow-Up Process</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Hazard Investigation</h4>
                <p className="text-sm">Supervisors should investigate reported hazards promptly, typically within 24 hours of notification.</p>
              </li>
              
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Resolution Timeline</h4>
                <p className="text-sm">Set clear timeframes for addressing the hazard based on its severity and risk level.</p>
              </li>
              
              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Reporter Feedback</h4>
                <p className="text-sm">Provide feedback to the person who reported the hazard about actions taken and resolution status.</p>
              </li>

              <li className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Documentation</h4>
                <p className="text-sm">Record all actions taken in response to the hazard report, including control measures implemented.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/15 rounded-lg p-4 mt-2">
        <h4 className="font-medium text-elec-yellow mb-2 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Legal Obligations
        </h4>
        <p className="text-sm">
          Under the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999, 
          both employers and employees have legal duties regarding hazard reporting. Employees must report hazards they 
          identify, and employers must have systems in place to record and address these reports.
        </p>
      </div>
    </div>
  );
};

export default ReportingProcedures;
