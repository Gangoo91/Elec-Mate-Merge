
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Hazard Reporting Procedures"
      description="Effective hazard reporting is essential for maintaining safety in electrical work environments. This section explains the procedures for reporting hazards, the documentation required, and the responsibilities of everyone involved in the reporting process."
      keyPoints={[
        "Understanding the formal hazard reporting procedures",
        "Documenting hazards accurately and comprehensively",
        "Knowing when and how to escalate hazard reports",
        "Following up on reported hazards to ensure resolution",
        "Legal requirements for hazard documentation and record-keeping"
      ]}
      icon="shield-alert"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
