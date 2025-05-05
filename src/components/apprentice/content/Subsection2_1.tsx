
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardCheck, Eye, ShieldAlert } from "lucide-react";

type Subsection2_1Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_1Props) => {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-4">Workplace Inspection Procedures</h2>
        
        <p className="text-base">
          Regular workplace inspections are a cornerstone of maintaining safety in electrical work environments.
          A systematic approach to inspections helps identify and address hazards before they cause accidents.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <ClipboardCheck className="h-5 w-5 mr-2" />
              Inspection Types and Frequency
            </h3>
            <ul className="space-y-3">
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Daily Pre-Work Checks</span>
                <p className="text-sm text-gray-300 mt-1">Quick inspection of work area, tools, and equipment before beginning tasks. Look for trip hazards, damaged tools, and obvious safety concerns.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Weekly Documented Inspections</span>
                <p className="text-sm text-gray-300 mt-1">More thorough checks with formal checklists covering electrical equipment, access paths, fire safety provisions, and first aid facilities.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Monthly Safety Audits</span>
                <p className="text-sm text-gray-300 mt-1">Comprehensive reviews conducted by supervisors or safety officers examining physical conditions, work practices, procedures, and documentation.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Quarterly System Reviews</span>
                <p className="text-sm text-gray-300 mt-1">Evaluate the effectiveness of the inspection program itself and update to reflect new hazards or changing work conditions.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <Eye className="h-5 w-5 mr-2" />
              What to Inspect
            </h3>
            <ul className="space-y-3">
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Work Environment</span>
                <p className="text-sm text-gray-300 mt-1">Access/egress routes, lighting levels, ventilation, temperature, housekeeping, and storage practices.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Tools and Equipment</span>
                <p className="text-sm text-gray-300 mt-1">Condition of hand tools, test equipment, PPE, electrical equipment, and machinery including maintenance records.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Safety Systems</span>
                <p className="text-sm text-gray-300 mt-1">Fire protection equipment, first aid supplies, emergency lighting, safety signage, and emergency procedures.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Documentation</span>
                <p className="text-sm text-gray-300 mt-1">Risk assessments, method statements, training records, permits to work, and previous inspection findings.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5 mt-6">
          <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Effective Inspection Procedures
          </h3>
          
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
      </section>

      <div className="flex justify-end pt-6 border-t border-elec-yellow/20 mt-6">
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
    </>
  );
};

export default Subsection2_1;
