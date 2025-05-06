
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ClipboardList, FileText, ShieldAlert } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const Subsection2_2 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow text-center">Documentation and Record-Keeping</h2>
      
      <Accordion type="single" collapsible defaultValue="overview" className="space-y-4">
        {/* Overview Section */}
        <AccordionItem value="overview" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <h3 className="text-lg sm:text-xl text-elec-yellow font-medium">Overview</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <CourseContentSection
                title="Documentation and Record-Keeping"
                description="Proper documentation is essential for both legal compliance and effective safety management in electrical work. Good record-keeping provides evidence of compliance with regulations, helps identify areas for improvement, and can be crucial in the event of an incident investigation or legal proceedings. Key documents include risk assessments, method statements, equipment inspection records, training certificates, and incident reports. These documents must be properly managed with clear version control, appropriate storage, defined retention periods, and accessibility to relevant personnel. Regular audits of documentation should be conducted to ensure completeness, accuracy, and implementation of documented procedures."
                keyPoints={[
                  "Documentation provides legal evidence of compliance with regulations",
                  "Key documents include risk assessments, method statements, and equipment records",
                  "Document management systems should include version control and secure storage",
                  "Regular audits ensure documentation remains current and effective",
                  "Digital record-keeping offers advantages in searchability and analysis"
                ]}
                icon="list"
                subsectionId={subsectionId}
              />
            </AccordionContent>
          </div>
        </AccordionItem>

        {/* Key Safety Documents Section */}
        <AccordionItem value="safety-documents" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <ShieldAlert className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Key Safety Documents</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <p className="text-sm md:text-base">
                  Core documentation required for electrical work includes:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                    <h4 className="font-semibold text-white mb-2">Risk Assessments</h4>
                    <p className="text-sm">
                      Identify hazards and control measures for specific tasks and environments. Must be task-specific, not generic, addressing the particular circumstances of each job.
                    </p>
                  </div>
                  
                  <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                    <h4 className="font-semibold text-white mb-2">Method Statements</h4>
                    <p className="text-sm">
                      Outline how work will be completed safely with step-by-step procedures. Include emergency procedures and specific control measures for identified risks.
                    </p>
                  </div>
                  
                  <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                    <h4 className="font-semibold text-white mb-2">Equipment Inspection Records</h4>
                    <p className="text-sm">
                      Track testing dates, results, and future inspection schedules for all electrical equipment, tools, and safety equipment used on-site.
                    </p>
                  </div>
                  
                  <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                    <h4 className="font-semibold text-white mb-2">Training Records</h4>
                    <p className="text-sm">
                      Document all safety-related instruction, certification, and competency assessments. Include dates, content covered, and verification of understanding.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        {/* Document Management Section */}
        <AccordionItem value="document-management" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Document Management</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <p className="text-sm md:text-base">
                  Effective systems for organizing and maintaining documentation:
                </p>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-white">Document Control</span>
                    <p className="text-sm mt-1">Ensure workers have access to latest versions with clear version control and update procedures.</p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Storage Systems</span>
                    <p className="text-sm mt-1">Secure, accessible storage with appropriate backup and protection. Consider both physical and digital storage solutions.</p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Retention Periods</span>
                    <p className="text-sm mt-1">Follow legal requirements for how long different documents must be kept. Some records may need to be retained for many years.</p>
                  </li>
                  <li>
                    <span className="font-medium text-white">Accessibility</span>
                    <p className="text-sm mt-1">Make relevant documents available at point of use (e.g., on-site) while maintaining security of sensitive information.</p>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        {/* Compliance Documentation Section */}
        <AccordionItem value="compliance" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Compliance Documentation</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Required Legal Documentation:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Certificates of Compliance with BS 7671</li>
                    <li>Statutory inspection records for equipment</li>
                    <li>COSHH assessments for hazardous substances</li>
                    <li>HSE notifications for certain types of work</li>
                    <li>Insurance documentation and liability coverage</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Documentation Auditing:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Regular audits to ensure completeness and accuracy</li>
                    <li>Gap analysis to identify missing information</li>
                    <li>Quality assessment of document detail and specificity</li>
                    <li>Implementation checks to verify procedures are followed</li>
                    <li>Improvement process for updating based on findings</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
                <p className="font-medium mb-1 text-elec-yellow">Legal Note:</p>
                <p>Employers with five or more employees must record significant findings of risk assessments. However, all employers, regardless of size, are advised to maintain thorough documentation as best practice and for their own protection in case of incident investigation.</p>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-center pt-4 border-t border-elec-yellow/20">
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

export default Subsection2_2;
