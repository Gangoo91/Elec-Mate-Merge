
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardCheck, Eye, ShieldAlert } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection2_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Workplace Inspection Procedures</h2>
      
      <div className="space-y-5">
        <CourseContentSection
          title="Workplace Inspection Procedures"
          description="Regular workplace inspections are a cornerstone of maintaining safety in electrical work environments. A systematic approach to inspections helps identify and address hazards before they cause accidents or injuries. Electrical contractors and workers should follow a structured inspection program that includes daily pre-work checks, weekly documented inspections, monthly safety audits, and quarterly system reviews. These inspections should cover the work environment, tools and equipment, safety systems, and relevant documentation. The Management of Health and Safety at Work Regulations 1999 require employers to have arrangements for effective planning, organization, control, monitoring, and review of preventive and protective measures."
          keyPoints={[
            "Regular inspections identify hazards before they cause accidents",
            "Inspections should follow a structured frequency (daily, weekly, monthly)",
            "Document all findings and assign responsibility for corrective actions",
            "Follow up on identified issues to ensure they are properly resolved",
            "Review trends to identify recurring safety concerns"
          ]}
          icon="safety"
          subsectionId={subsectionId}
        />
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Inspection Types and Frequency
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Different types of inspections should be conducted at varying frequencies:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Daily Pre-Work Checks</h4>
                <p className="text-sm">
                  Quick inspection of work area, tools, and equipment before beginning tasks. Look for trip hazards, damaged tools, and obvious safety concerns.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Weekly Documented Inspections</h4>
                <p className="text-sm">
                  More thorough checks with formal checklists covering electrical equipment, access paths, fire safety provisions, and first aid facilities.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Monthly Safety Audits</h4>
                <p className="text-sm">
                  Comprehensive reviews conducted by supervisors or safety officers examining physical conditions, work practices, procedures, and documentation.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Quarterly System Reviews</h4>
                <p className="text-sm">
                  Evaluate the effectiveness of the inspection program itself and update to reflect new hazards or changing work conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            What to Inspect
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Comprehensive workplace inspections should cover these key areas:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium text-white">Work Environment</span>
                <p className="text-sm mt-1">Access/egress routes, lighting levels, ventilation, temperature, housekeeping, and storage practices.</p>
              </li>
              <li>
                <span className="font-medium text-white">Tools and Equipment</span>
                <p className="text-sm mt-1">Condition of hand tools, test equipment, PPE, electrical equipment, and machinery including maintenance records.</p>
              </li>
              <li>
                <span className="font-medium text-white">Safety Systems</span>
                <p className="text-sm mt-1">Fire protection equipment, first aid supplies, emergency lighting, safety signage, and emergency procedures.</p>
              </li>
              <li>
                <span className="font-medium text-white">Documentation</span>
                <p className="text-sm mt-1">Risk assessments, method statements, training records, permits to work, and previous inspection findings.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Effective Inspection Procedures</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Documentation Process:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Use standardized forms with clear evaluation criteria</li>
                <li>Record all findings, even minor issues</li>
                <li>Take photographs of hazards as evidence</li>
                <li>Assign responsibility for corrective actions</li>
                <li>Set deadlines for issue resolution</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Follow-up Actions:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Verify that corrective actions have been completed</li>
                <li>Communicate findings to all relevant personnel</li>
                <li>Update risk assessments based on findings</li>
                <li>Review trends to identify recurring issues</li>
                <li>Modify inspection procedures as needed</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
            <p className="font-medium mb-1 text-elec-yellow">Legal Requirement:</p>
            <p>The Management of Health and Safety at Work Regulations 1999 require employers to have arrangements for the effective planning, organization, control, monitoring and review of preventive and protective measures. Regular workplace inspections are a key part of meeting this obligation.</p>
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

export default Subsection2_1;
