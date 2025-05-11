
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Mobile Elevated Work Platforms (MEWPs)"
      description="Mobile Elevated Work Platforms (MEWPs) are essential for safe electrical work at height, especially when installing lighting, cable management systems, or working on overhead power systems. Understanding the types, safe operation, and hazards associated with MEWPs is crucial for electrical workers."
      keyPoints={[
        "Different categories and types of MEWPs suitable for electrical work",
        "Training and certification requirements for MEWP operators",
        "Pre-use inspections and thorough examination requirements",
        "Key safety considerations when using MEWPs near electrical equipment",
        "Emergency procedures and rescue planning for MEWP operations"
      ]}
      icon="construction"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
