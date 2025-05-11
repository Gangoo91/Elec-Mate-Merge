
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
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
        <h2 className="text-xl font-semibold text-elec-yellow mb-4">Key Safety Documents</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Core documentation required for electrical work includes:
          </p>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Risk Assessments</h3>
          <p className="text-muted-foreground mb-4">
            Risk assessments are legally required documents that identify hazards, evaluate risks, and determine control measures for specific tasks.
            They must be:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Task-specific rather than generic</li>
            <li>Created before work begins and updated as conditions change</li>
            <li>Completed by a competent person with knowledge of the work and hazards</li>
            <li>Regularly reviewed and revised as needed</li>
            <li>Communicated to all workers involved in the task</li>
            <li>Stored for a minimum of 3 years, though 5 years is recommended</li>
          </ul>

          <h3 className="font-semibold text-white mt-6 mb-2">Method Statements</h3>
          <p className="text-muted-foreground mb-4">
            Method statements outline the step-by-step procedure for completing work safely. They complement risk assessments by providing detailed instructions on how to implement control measures.
            Effective method statements include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Detailed sequence of operations</li>
            <li>Specific equipment and tools required</li>
            <li>Safety precautions for each step</li>
            <li>PPE requirements</li>
            <li>Emergency procedures</li>
            <li>References to related risk assessments</li>
            <li>Isolation procedures for electrical work</li>
          </ul>

          <h3 className="font-semibold text-white mt-6 mb-2">Equipment Inspection Records</h3>
          <p className="text-muted-foreground mb-4">
            Regular inspection of tools and equipment is essential for electrical safety. Documentation must track:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Unique identification numbers for each piece of equipment</li>
            <li>Inspection dates and results</li>
            <li>Calibration records for measuring instruments</li>
            <li>PAT testing dates and certificates</li>
            <li>Repair history and maintenance schedules</li>
            <li>Due dates for next inspections</li>
            <li>Name and qualification of the inspector</li>
          </ul>

          <h3 className="font-semibold text-white mt-6 mb-2">Training Records</h3>
          <p className="text-muted-foreground mb-4">
            Documentation of worker training and competence is critical for demonstrating due diligence and compliance:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Qualifications and certifications</li>
            <li>Dates of training sessions attended</li>
            <li>Content covered in training</li>
            <li>Assessment results and competency verification</li>
            <li>Refresher training schedules</li>
            <li>Authorization for specific tasks or equipment</li>
            <li>Signatures of trainers and trainees</li>
          </ul>

          <h3 className="font-semibold text-white mt-6 mb-2">Accident and Incident Reports</h3>
          <p className="text-muted-foreground mb-4">
            When incidents occur, comprehensive documentation is essential:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Date, time, and location of the incident</li>
            <li>Names of individuals involved and witnesses</li>
            <li>Detailed description of what happened</li>
            <li>Contributing factors identified</li>
            <li>Immediate actions taken</li>
            <li>Follow-up corrective measures</li>
            <li>RIDDOR reporting details if applicable</li>
            <li>Investigation findings and recommendations</li>
          </ul>
        </div>
      </div>

      {/* Document Management Section */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4">Document Management Systems</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">
            Maintaining an organized documentation system is crucial for ensuring documents are accessible when needed and can be readily provided during inspections or audits.
          </p>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Document Control</h3>
          <p className="text-muted-foreground mb-6">
            A robust document control system ensures that all personnel have access to the correct, up-to-date versions of essential documents. Key elements include version numbering, clear revision histories, approval signatures, and distribution lists. Documents should be reviewed at regular intervals, typically every 12 months or whenever processes change significantly.
          </p>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Storage Systems</h3>
          <p className="text-muted-foreground mb-6">
            Modern electrical contractors typically employ a combination of physical and digital storage. Digital systems offer advantages of accessibility, searchability, and backup capabilities, while physical copies may be required on-site. Cloud-based systems with appropriate security measures are increasingly becoming the industry standard, allowing real-time access from multiple locations while maintaining document integrity.
          </p>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Retention Periods</h3>
          <p className="text-muted-foreground mb-6">
            Different documentation types require different retention periods according to regulations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Risk assessments and method statements: Minimum 3 years after completion</li>
            <li>Accident records: Minimum 3 years from date of report</li>
            <li>Equipment inspection records: Duration of equipment life plus 2 years</li>
            <li>Training records: Duration of employment plus 5 years</li>
            <li>Electrical installation certificates: For the life of the installation</li>
            <li>COSHH assessments: 40 years for hazardous substances exposure records</li>
          </ul>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Document Accessibility</h3>
          <p className="text-muted-foreground mb-6">
            Safety documentation must be accessible to those who need it, when they need it. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>On-site availability of risk assessments and method statements</li>
            <li>Clear processes for accessing documents outside of normal working hours</li>
            <li>Multiple formats to accommodate different needs (digital, print, etc.)</li>
            <li>Security measures to protect sensitive information while maintaining accessibility</li>
            <li>Training for all staff on how to access and use documentation systems</li>
          </ul>
        </div>
      </div>

      {/* Compliance Documentation Section */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4">Compliance Documentation</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">
            Electrical work requires specific documentation to demonstrate compliance with industry regulations and standards.
          </p>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Electrical Certification</h3>
          <p className="text-muted-foreground mb-6">
            BS 7671 requires various certificates to be issued upon completion of electrical work:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Electrical Installation Certificate (EIC) - for new installations</li>
            <li>Minor Electrical Installation Works Certificate (MEIWC) - for smaller works</li>
            <li>Electrical Installation Condition Report (EICR) - for periodic inspections</li>
            <li>Schedule of Inspections and Schedule of Test Results - supporting documents for certificates</li>
            <li>Certification of Energy Storage Systems (when applicable)</li>
          </ul>

          <h3 className="font-semibold text-white mt-6 mb-2">Statutory Documentation</h3>
          <p className="text-muted-foreground mb-6">
            Additional documentation required by law includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Health and Safety Policy (required for businesses with 5+ employees)</li>
            <li>Fire risk assessments</li>
            <li>COSHH assessments for hazardous substances</li>
            <li>Insurance certificates (public and employer's liability)</li>
            <li>Construction phase plans for CDM 2015 compliance</li>
            <li>F-Gas certificates for air conditioning work</li>
          </ul>

          <h3 className="font-semibold text-white mt-6 mb-2">Internal Quality Control</h3>
          <p className="text-muted-foreground mb-6">
            Maintaining internal documentation helps ensure consistent quality and safety:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Internal audit reports and findings</li>
            <li>Corrective action records</li>
            <li>Quality management system documentation</li>
            <li>Toolbox talk registers and content</li>
            <li>Safety inspection checklists and reports</li>
            <li>Near-miss reporting forms and analysis</li>
          </ul>
        </div>
      </div>
      
      {/* Documentation Best Practices */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4">Documentation Best Practices</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">
            Following these best practices ensures that your documentation system is effective and compliant:
          </p>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Record-Keeping Excellence</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Use standardized templates for consistency across the organization</li>
            <li>Implement clear file naming conventions and folder structures</li>
            <li>Schedule regular documentation audits to identify gaps</li>
            <li>Establish a chain of responsibility for document management</li>
            <li>Train all staff on documentation procedures</li>
            <li>Create backup systems with appropriate redundancy</li>
            <li>Implement version control systems to track changes</li>
          </ul>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Digital Transformation Benefits</h3>
          <p className="text-muted-foreground mb-6">
            Transitioning to digital documentation offers numerous advantages for electrical contractors:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Real-time updates accessible from multiple locations</li>
            <li>Enhanced searchability using keywords and filters</li>
            <li>Automated reminders for document reviews and renewals</li>
            <li>Integration with project management systems</li>
            <li>Reduced storage space requirements</li>
            <li>Improved environmental sustainability</li>
            <li>Easy sharing with clients, inspectors, and other stakeholders</li>
            <li>Better data security with encryption and access controls</li>
          </ul>
          
          <h3 className="font-semibold text-white mt-6 mb-2">Common Documentation Pitfalls</h3>
          <p className="text-muted-foreground mb-6">
            Avoid these common mistakes in safety documentation:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Using generic templates without site-specific details</li>
            <li>Inadequate review and updating of documents</li>
            <li>Failing to communicate documentation to relevant personnel</li>
            <li>Inconsistent filing systems leading to lost or misplaced documents</li>
            <li>Incomplete records that lack essential information</li>
            <li>Over-reliance on paper systems in modern work environments</li>
            <li>Insufficient backup procedures</li>
          </ul>
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
