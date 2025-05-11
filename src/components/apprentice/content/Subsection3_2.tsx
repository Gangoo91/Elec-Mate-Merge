
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { useIsMobile } from "@/hooks/use-mobile";
import SafeWorkingProcedures from "./subsection3_2/SafeWorkingProcedures";
import PPEAndSafetyEquipment from "./subsection3_2/PPEAndSafetyEquipment";
import SafeIsolationProcedures from "./subsection3_2/SafeIsolationProcedures";
import ElectricalHazards from "./subsection3_2/ElectricalHazards";
import KeyRegulations from "./subsection3_2/KeyRegulations";
import CaseStudies from "./subsection3_2/CaseStudies";
import CompletionButton from "./subsection3_2/CompletionButton";

const Subsection3_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-8">
      <CourseContentSection
        title="Working Safely with Electrical Systems"
        description="Understanding proper procedures and practices for working safely with electrical systems is essential for preventing accidents and ensuring compliance with regulations."
        keyPoints={[
          "Following safe working procedures to prevent electrical accidents",
          "Proper use of PPE and safety equipment",
          "Understanding and applying safe isolation procedures",
          "Identifying and mitigating electrical hazards"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* Safe Working Procedures Section */}
      <SafeWorkingProcedures />
      
      {/* PPE and Safety Equipment Section */}
      <PPEAndSafetyEquipment />
      
      {/* Safe Isolation Section */}
      <SafeIsolationProcedures />
      
      {/* Electrical Hazards Section */}
      <ElectricalHazards />
      
      {/* Key Regulations Section */}
      <KeyRegulations />
      
      {/* Case Studies Section */}
      <CaseStudies />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection3_2;
