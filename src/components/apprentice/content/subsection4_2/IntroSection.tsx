
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Ladder Safety & Inspection"
      description="Portable ladders are commonly used for electrical work but are a significant source of accidents. Understanding proper selection, inspection, and use of ladders is essential for electrical workers to ensure safe access at height."
      keyPoints={[
        "Different types of ladders and their appropriate applications",
        "Pre-use inspection requirements for ladders in electrical work",
        "Safe positioning and securing of ladders near electrical installations",
        "Maximum safe working loads and positioning requirements",
        "Alternative access equipment options for electrical work at height"
      ]}
      icon="hardhat"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
