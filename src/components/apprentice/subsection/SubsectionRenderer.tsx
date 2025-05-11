
import React, { useEffect } from "react";
import { SubsectionProps } from "../content/subsection1_1/types";
import { isSubsectionInSection, isSubsectionInRange } from "./utils/sectionUtils";
import { renderSection1 } from "./sections/Section1Renderer";
import { renderSection2 } from "./sections/Section2Renderer";
import { renderSection3 } from "./sections/Section3Renderer";
import { renderSection4 } from "./sections/Section4Renderer";
import { renderSection5 } from "./sections/Section5Renderer";
import { renderSection6To10 } from "./sections/Section6To10Renderer";

const SubsectionRenderer = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  useEffect(() => {
    console.log("SubsectionRenderer mounted with ID:", subsectionId, "isCompleted:", isCompleted);
  }, [subsectionId, isCompleted]);
  
  console.log("SubsectionRenderer called with ID:", subsectionId);
  
  // Handle subsections with explicit section format (e.g., "1.1", "1.2", etc.)
  if (subsectionId.includes(".")) {
    const sectionPart = subsectionId.split(".")[0];
    
    console.log("Processing subsection with dot notation. Section part:", sectionPart);
    switch (sectionPart) {
      case "1":
        console.log("Rendering Section 1 content for", subsectionId);
        return renderSection1({ subsectionId, isCompleted, markAsComplete });
      case "2":
        return renderSection2({ subsectionId, isCompleted, markAsComplete });
      case "3":
        return renderSection3({ subsectionId, isCompleted, markAsComplete });
      case "4":
        return renderSection4({ subsectionId, isCompleted, markAsComplete });
      case "5":
        return renderSection5({ subsectionId, isCompleted, markAsComplete });
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
        return renderSection6To10({ subsectionId, isCompleted, markAsComplete });
    }
  }
  
  // Handle simple numeric subsection IDs (1, 2, 3)
  if (["1", "2", "3"].includes(subsectionId)) {
    console.log("Direct match for simple numeric ID:", subsectionId);
    return renderSection1({ subsectionId, isCompleted, markAsComplete });
  }
  
  // Use the section utility functions as a fallback
  if (isSubsectionInSection(subsectionId, 1)) {
    console.log("Rendering Section 1 content via utility function for:", subsectionId);
    return renderSection1({ subsectionId, isCompleted, markAsComplete });
  }
  
  if (isSubsectionInSection(subsectionId, 2)) {
    return renderSection2({ subsectionId, isCompleted, markAsComplete });
  }
  
  if (isSubsectionInSection(subsectionId, 3)) {
    return renderSection3({ subsectionId, isCompleted, markAsComplete });
  }
  
  if (isSubsectionInSection(subsectionId, 4)) {
    return renderSection4({ subsectionId, isCompleted, markAsComplete });
  }
  
  if (isSubsectionInSection(subsectionId, 5)) {
    return renderSection5({ subsectionId, isCompleted, markAsComplete });
  }
  
  if (isSubsectionInRange(subsectionId, 6, 10)) {
    return renderSection6To10({ subsectionId, isCompleted, markAsComplete });
  }

  // Default fallback
  return <p>Content for subsection {subsectionId} is not yet available.</p>;
};

export default SubsectionRenderer;
