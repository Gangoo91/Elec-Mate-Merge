
import React from "react";

const ComplianceDocumentation = () => {
  return (
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
  );
};

export default ComplianceDocumentation;
