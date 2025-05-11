
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Safe Working Practices"
      description="Understanding and implementing safe working practices is fundamental for electricians to prevent accidents, injuries, and property damage. This section explores the essential guidelines and procedures that should be followed when working on electrical installations."
      keyPoints={[
        "Best practices for maintaining safety in electrical work environments",
        "Risk assessment procedures before commencing electrical work",
        "Planning considerations for electrical installation activities",
        "Safe movement and handling of materials and equipment",
        "Methods for maintaining safe and orderly work areas"
      ]}
      icon="tools"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
