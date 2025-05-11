
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection1_1 from "../../content/Subsection1_1";
import Subsection1_2 from "../../content/Subsection1_2";
import Subsection1_3 from "../../content/Subsection1_3";

export const renderSection1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  // Parse subsection ID to handle both formats (e.g., "1" and "1.1")
  const normalizedId = subsectionId.includes('.') ? subsectionId.split('.')[1] : subsectionId;
  
  console.log("Section1Renderer - Rendering subsection with ID:", subsectionId, "Normalized ID:", normalizedId);
  
  switch (normalizedId) {
    case "1":
    case "1.1":
      return (
        <Subsection1_1 
          subsectionId={subsectionId} 
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "2":
    case "1.2":
      return (
        <Subsection1_2 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "3":
    case "1.3":
      return (
        <Subsection1_3 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    default:
      console.log("Section1Renderer - No matching subsection found for:", normalizedId);
      return <p>Content for subsection {subsectionId} is not yet available.</p>;
  }
};
