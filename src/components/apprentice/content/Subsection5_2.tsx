
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection5_2/IntroSection";
import ReportingProcedures from "./subsection5_2/ReportingProcedures";
import DocumentationRequirements from "./subsection5_2/DocumentationRequirements";
import ReportingTools from "./subsection5_2/ReportingTools";
import CompletionButton from "./subsection5_2/CompletionButton";

const Subsection5_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* First horizontal box - Reporting Procedures */}
      <ReportingProcedures />
      
      {/* Second horizontal box - Documentation Requirements */}
      <DocumentationRequirements />
      
      {/* Third horizontal box - Tools and Systems */}
      <ReportingTools />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection5_2;
