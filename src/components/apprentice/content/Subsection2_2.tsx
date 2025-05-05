
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, FileText, ShieldAlert } from "lucide-react";

type Subsection2_2Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_2Props) => {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-4">Documentation and Record-Keeping</h2>
        
        <p className="text-base">
          Proper documentation is essential for both legal compliance and effective safety management in electrical work.
          Good record-keeping provides evidence of compliance and helps identify areas for improvement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Key Safety Documents
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Core documentation required for electrical work includes:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Risk Assessments:</span> Identify hazards and control measures for specific tasks and environments</li>
                <li><span className="font-medium">Method Statements:</span> Outline how work will be completed safely with step-by-step procedures</li>
                <li><span className="font-medium">Equipment Inspection Records:</span> Track testing dates, results, and future inspection schedules</li>
                <li><span className="font-medium">Training Records:</span> Document all safety-related instruction, certification, and competency assessments</li>
                <li><span className="font-medium">Incident Reports:</span> Record accidents and near-misses with root cause analysis and corrective actions</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Documents should be task-specific, not generic, addressing the particular circumstances of each job. Generic documentation may miss critical site-specific hazards.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <FileText className="h-5 w-5 mr-2" />
              Document Management
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Effective systems for organizing and maintaining documentation:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Document Control:</span> Ensure workers have access to latest versions with clear version control</li>
                <li><span className="font-medium">Storage Systems:</span> Secure, accessible storage with appropriate backup and protection</li>
                <li><span className="font-medium">Retention Periods:</span> Follow legal requirements for how long different documents must be kept</li>
                <li><span className="font-medium">Accessibility:</span> Make relevant documents available at point of use (e.g., on-site)</li>
                <li><span className="font-medium">Digital Solutions:</span> Electronic systems for improved searchability and data analysis</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Digital record-keeping systems offer advantages in searchability and analysis but must have appropriate backup and security measures to prevent data loss.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <ClipboardList className="h-5 w-5 mr-2" />
              Compliance Documentation
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Legal requirements for record-keeping in electrical work:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Certificates of Compliance:</span> Legal documents verifying work meets standards like BS 7671</li>
                <li><span className="font-medium">Statutory Inspection Records:</span> Required for certain equipment (e.g., lifting equipment)</li>
                <li><span className="font-medium">COSHH Assessments:</span> For hazardous substances used in electrical work</li>
                <li><span className="font-medium">HSE Notifications:</span> For certain types of work or incidents</li>
                <li><span className="font-medium">Insurance Documentation:</span> Evidence of appropriate liability coverage</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Employers with five or more employees must record significant findings of risk assessments. Smaller employers are still advised to maintain documentation as best practice.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <FileText className="h-5 w-5 mr-2" />
              Documentation Auditing
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Regular reviews to ensure documentation effectiveness:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Regular Audits:</span> Systematic review of documentation completeness and accuracy</li>
                <li><span className="font-medium">Gap Analysis:</span> Identify missing or outdated documentation</li>
                <li><span className="font-medium">Quality Assessment:</span> Evaluate whether documents are sufficiently detailed and specific</li>
                <li><span className="font-medium">Implementation Check:</span> Verify that documented procedures are being followed</li>
                <li><span className="font-medium">Improvement Process:</span> System for updating documentation based on audit findings</li>
              </ul>
              
              <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg">
                <p className="font-medium mb-1 text-elec-yellow">Professional Tip:</p>
                <p className="text-sm">Schedule document reviews alongside other business processes, such as after workplace inspections, following incidents, or when introducing new equipment or procedures. This ensures documentation remains current and relevant.</p>
              </div>
            </div>
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

export default Subsection2_2;
