
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection1_1 from "../../content/Subsection1_1";
import Subsection1_2 from "../../content/Subsection1_2";
import Subsection1_3 from "../../content/Subsection1_3";

export const renderSection1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("Section1Renderer - Rendering subsection with ID:", subsectionId);
  
  // Handle both formats of subsection IDs
  if (subsectionId === "1" || subsectionId === "1.1") {
    console.log("Section1Renderer - Rendering subsection 1.1");
    return (
      <Subsection1_1 
        subsectionId={subsectionId} 
        isCompleted={isCompleted} 
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "2" || subsectionId === "1.2") {
    console.log("Section1Renderer - Rendering subsection 1.2");
    return (
      <Subsection1_2 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "3" || subsectionId === "1.3") {
    console.log("Section1Renderer - Rendering subsection 1.3");
    return (
      <Subsection1_3 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  console.log("Section1Renderer - No matching subsection found for:", subsectionId);
  return <p>Content for subsection {subsectionId} is not yet available.</p>;
};
