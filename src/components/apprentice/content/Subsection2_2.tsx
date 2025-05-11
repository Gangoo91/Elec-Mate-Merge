
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import SubsectionIntro from "./subsection2_2/SubsectionIntro";
import KeySafetyDocuments from "./subsection2_2/KeySafetyDocuments";
import DocumentManagementSystems from "./subsection2_2/DocumentManagementSystems";
import ComplianceDocumentation from "./subsection2_2/ComplianceDocumentation";
import DocumentationBestPractices from "./subsection2_2/DocumentationBestPractices";
import CompletionButton from "./subsection2_2/CompletionButton";

const Subsection2_2 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <SubsectionIntro />
      
      {/* Key Safety Documents Section */}
      <KeySafetyDocuments />
      
      {/* Document Management Section */}
      <DocumentManagementSystems />
      
      {/* Compliance Documentation Section */}
      <ComplianceDocumentation />
      
      {/* Documentation Best Practices */}
      <DocumentationBestPractices />
      
      {/* Completion button */}
      <CompletionButton 
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    </div>
  );
};

export default Subsection2_2;
