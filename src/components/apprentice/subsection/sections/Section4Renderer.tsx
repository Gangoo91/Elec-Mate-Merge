
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection4_1 from "../../content/Subsection4_1";
import Subsection4_2 from "../../content/Subsection4_2";
import Subsection4_3 from "../../content/Subsection4_3";

export const renderSection4 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  // Handle both formats: either "4.1" or just "1" when in section 4
  const normalizedSubsectionId = subsectionId.includes(".") ? subsectionId : `4.${subsectionId}`;
  
  console.log("Section4Renderer - Rendering subsection:", normalizedSubsectionId);
  
  // Extract the subsection number
  const subsectionNumber = subsectionId.includes(".") ? 
    subsectionId.split(".")[1] : 
    subsectionId;
    
  switch (subsectionNumber) {
    case "1":
      return (
        <Subsection4_1
          subsectionId={normalizedSubsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "2":
      return (
        <Subsection4_2
          subsectionId={normalizedSubsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "3":
      return (
        <Subsection4_3
          subsectionId={normalizedSubsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    default:
      return <p>Content for subsection {subsectionId} in Section 4 is not yet available.</p>;
  }
};
