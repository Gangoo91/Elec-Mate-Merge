
import React, { useEffect } from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection1_1 from "../../content/Subsection1_1";
import Subsection1_2 from "../../content/Subsection1_2";
import Subsection1_3 from "../../content/Subsection1_3";

export const renderSection1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  useEffect(() => {
    console.log("Section1Renderer - Effect with ID:", subsectionId, "isCompleted:", isCompleted);
  }, [subsectionId, isCompleted]);

  console.log("Section1Renderer - Rendering subsection with ID:", subsectionId);
  
  // Handle dot notation format (e.g., "1.1", "1.2", "1.3")
  if (subsectionId === "1.1") {
    console.log("Section1Renderer - Rendering subsection 1.1");
    return (
      <Subsection1_1 
        subsectionId={subsectionId} 
        isCompleted={isCompleted} 
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "1.2") {
    console.log("Section1Renderer - Rendering subsection 1.2");
    return (
      <Subsection1_2 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "1.3") {
    console.log("Section1Renderer - Rendering subsection 1.3");
    return (
      <Subsection1_3 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  // Handle simple numeric format (e.g., "1", "2", "3")
  // These map to the first subsection of each section
  if (subsectionId === "1") {
    console.log("Section1Renderer - Rendering subsection 1.1 via numeric ID 1");
    return (
      <Subsection1_1 
        subsectionId="1.1" 
        isCompleted={isCompleted} 
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "2") {
    console.log("Section1Renderer - Rendering subsection 1.2 via numeric ID 2");
    return (
      <Subsection1_2 
        subsectionId="1.2"
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "3") {
    console.log("Section1Renderer - Rendering subsection 1.3 via numeric ID 3");
    return (
      <Subsection1_3 
        subsectionId="1.3"
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  console.log("Section1Renderer - No matching subsection found for:", subsectionId);
  return <p>Content for subsection {subsectionId} is not yet available.</p>;
};
