
import React from "react";
import { SubsectionProps } from "../content/subsection1_1/types";
import { isSubsectionInSection, isSubsectionInRange } from "./utils/sectionUtils";
import { renderSection1 } from "./sections/Section1Renderer";
import { renderSection2 } from "./sections/Section2Renderer";
import { renderSection3 } from "./sections/Section3Renderer";
import { renderSection4 } from "./sections/Section4Renderer";
import { renderSection5 } from "./sections/Section5Renderer";
import { renderSection6To10 } from "./sections/Section6To10Renderer";

const SubsectionRenderer = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("SubsectionRenderer called with ID:", subsectionId);
  
  // Pass props to the appropriate section renderer based on the subsection ID
  if (isSubsectionInSection(subsectionId, 1)) {
    console.log("Rendering Section 1 content for:", subsectionId);
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

  // Default fallback if no matching section is found
  return <p>Content for subsection {subsectionId} is not yet available.</p>;
};

export default SubsectionRenderer;
