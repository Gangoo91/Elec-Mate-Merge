
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Emergency Response Procedures"
      description="Understanding and implementing proper emergency response procedures is essential for preventing injuries and saving lives in electrical work environments. This section covers the key emergency response protocols that every electrical apprentice needs to know."
      keyPoints={[
        "Emergency evacuation procedures for different hazard scenarios",
        "First aid response for common electrical injuries and accidents",
        "Fire safety protocols specific to electrical environments",
        "Communication protocols during workplace emergencies",
        "Post-incident reporting and documentation requirements"
      ]}
      icon="shield-alert"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
