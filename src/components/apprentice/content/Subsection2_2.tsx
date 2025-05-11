
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, FileText, ShieldAlert } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection2_2 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <CourseContentSection 
        title="Documentation and Record-Keeping"
        description="Proper documentation is essential for both legal compliance and effective safety management in electrical work. Good record-keeping provides evidence of compliance with regulations, helps identify areas for improvement, and can be crucial in the event of an incident investigation or legal proceedings."
        icon="list"
      />

      {/* Key Safety Documents Section */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-yellow-600/20 p-2 rounded-full">
            <ShieldAlert className="h-6 w-6 text-elec-yellow" />
          </div>
          <h2 className="text-xl font-semibold text-elec-yellow">Key Safety Documents</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Core documentation required for electrical work includes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
              <h4 className="font-semibold text-white mb-2">Risk Assessments</h4>
              <p className="text-sm text-muted-foreground">
                Identify hazards and control measures for specific tasks and environments. Must be task-specific, not generic, addressing the particular circumstances of each job.
              </p>
            </div>
            
            <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
              <h4 className="font-semibold text-white mb-2">Method Statements</h4>
              <p className="text-sm text-muted-foreground">
                Outline how work will be completed safely with step-by-step procedures. Include emergency procedures and specific control measures for identified risks.
              </p>
            </div>
            
            <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
              <h4 className="font-semibold text-white mb-2">Equipment Inspection Records</h4>
              <p className="text-sm text-muted-foreground">
                Track testing dates, results, and future inspection schedules for all electrical equipment, tools, and safety equipment used on-site.
              </p>
            </div>
            
            <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
              <h4 className="font-semibold text-white mb-2">Training Records</h4>
              <p className="text-sm text-muted-foreground">
                Document all safety-related instruction, certification, and competency assessments. Include dates, content covered, and verification of understanding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Management Section */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-yellow-600/20 p-2 rounded-full">
            <FileText className="h-6 w-6 text-elec-yellow" />
          </div>
          <h2 className="text-xl font-semibold text-elec-yellow">Document Management</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Effective systems for organizing and maintaining documentation are essential for ensuring safety compliance.
          </p>
          
          <ul className="space-y-4 mt-4">
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">Document Control</h3>
              <p className="text-sm text-muted-foreground">
                Ensure workers have access to the latest versions with clear version control and update procedures. This prevents the use of outdated or incorrect information.
              </p>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">Storage Systems</h3>
              <p className="text-sm text-muted-foreground">
                Secure, accessible storage with appropriate backup and protection. Consider both physical and digital storage solutions with appropriate security measures.
              </p>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">Retention Periods</h3>
              <p className="text-sm text-muted-foreground">
                Follow legal requirements for how long different documents must be kept. Some records may need to be retained for many years to comply with regulations.
              </p>
            </li>
            
            <li className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow">
              <h3 className="font-medium mb-1">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Make relevant documents available at point of use (e.g., on-site) while maintaining security of sensitive information. Ensure all workers know how to access documentation.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance Documentation Section */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-yellow-600/20 p-2 rounded-full">
            <ClipboardList className="h-6 w-6 text-elec-yellow" />
          </div>
          <h2 className="text-xl font-semibold text-elec-yellow">Compliance Documentation</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Maintaining proper compliance documentation is crucial for meeting regulatory requirements and demonstrating due diligence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-elec-gray/30 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-elec-yellow/80">Required Legal Documentation</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Certificates of Compliance with BS 7671</li>
                <li>• Statutory inspection records for equipment</li>
                <li>• COSHH assessments for hazardous substances</li>
                <li>• HSE notifications for certain types of work</li>
                <li>• Insurance documentation and liability coverage</li>
                <li>• Accident and incident reports</li>
                <li>• Health surveillance records where required</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray/30 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-elec-yellow/80">Documentation Auditing</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Regular audits to ensure completeness and accuracy</li>
                <li>• Gap analysis to identify missing information</li>
                <li>• Quality assessment of document detail and specificity</li>
                <li>• Implementation checks to verify procedures are followed</li>
                <li>• Improvement process for updating based on findings</li>
                <li>• Third-party verification where appropriate</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-elec-dark/70 rounded-lg">
            <p className="font-medium mb-2 text-elec-yellow">Legal Note:</p>
            <p className="text-muted-foreground">
              Employers with five or more employees must record significant findings of risk assessments. However, all employers, regardless of size, are advised to maintain thorough documentation as best practice and for their own protection in case of incident investigation or regulatory inspection.
            </p>
          </div>
        </div>
      </div>
      
      {/* Documentation Best Practices */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Documentation Best Practices</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Following these best practices ensures that your documentation system is effective and compliant:
          </p>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Keep inspection records for a minimum of three years</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Make records accessible to relevant stakeholders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Use clear file naming conventions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Regularly back up electronic documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Review and update documentation processes regularly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Ensure forms align with current regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Train inspectors on proper documentation techniques</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Implement version control for all documents</span>
            </li>
          </ul>
          
          <div className="bg-elec-gray/30 p-4 rounded-lg border-l-4 border-elec-yellow mt-4">
            <h3 className="font-medium mb-2">Digital Documentation Benefits</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Moving to digital documentation systems offers several advantages:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Improved searchability and retrieval of information</li>
              <li>• Enhanced data analysis capabilities</li>
              <li>• Reduced storage space requirements</li>
              <li>• Automatic backups and version control</li>
              <li>• Easier sharing of information with authorized personnel</li>
              <li>• Improved environmental sustainability</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Completion button */}
      <div className="pt-6 border-t border-elec-yellow/20 flex justify-end">
        {!isCompleted ? (
          <Button 
            onClick={markAsComplete}
            className="hover:bg-elec-yellow hover:text-elec-dark"
          >
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center text-green-500 gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subsection2_2;
