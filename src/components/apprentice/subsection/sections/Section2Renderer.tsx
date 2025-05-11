
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection2_1 from "../../content/Subsection2_1";
import Subsection2_2 from "../../content/Subsection2_2";
import Subsection2_3 from "../../content/Subsection2_3";

export const renderSection2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("Section2Renderer - rendering subsection:", subsectionId);
  
  // Convert numeric-only IDs (1, 2, 3) to section-specific format (2.1, 2.2, 2.3)
  const normalizedId = subsectionId.includes(".") ? subsectionId : `2.${subsectionId}`;
  
  switch (normalizedId) {
    case "2.1":
      return (
        <Subsection2_1 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "2.2":
      return (
        <Subsection2_2 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "2.3":
      return (
        <Subsection2_3 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    default:
      return <p>Content for subsection {subsectionId} in section 2 is not available.</p>;
  }
};
