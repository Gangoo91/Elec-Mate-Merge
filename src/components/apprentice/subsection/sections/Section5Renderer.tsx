
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection5_1 from "../../content/Subsection5_1";
import Subsection5_2 from "../../content/Subsection5_2";
import Subsection5_3 from "../../content/Subsection5_3";

export const renderSection5 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  // Check if the subsectionId contains a dot notation (e.g., "5.1")
  if (subsectionId.includes(".")) {
    const subPart = subsectionId.split(".")[1];
    
    switch (subPart) {
      case "1":
        return (
          <Subsection5_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "2":
        return (
          <Subsection5_2
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "3":
        return (
          <Subsection5_3
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      default:
        return <p>Content for subsection {subsectionId} is not yet available.</p>;
    }
  }
  
  // Handle numeric subsectionId (e.g., "1", "2", "3")
  switch (subsectionId) {
    case "1":
      return (
        <Subsection5_1
          subsectionId="5.1"
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "2":
      return (
        <Subsection5_2
          subsectionId="5.2"
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "3":
      return (
        <Subsection5_3
          subsectionId="5.3"
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    default:
      return <p>Content for subsection {subsectionId} is not yet available.</p>;
  }
};
