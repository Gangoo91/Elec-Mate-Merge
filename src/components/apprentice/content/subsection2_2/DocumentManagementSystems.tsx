
import React from "react";

const DocumentManagementSystems = () => {
  return (
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
  );
};

export default DocumentManagementSystems;
