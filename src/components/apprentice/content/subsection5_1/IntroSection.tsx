
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Common Workplace Hazards"
      description="Electrical work environments present numerous hazards that must be identified and managed effectively. The ability to recognise potential dangers is a fundamental skill for every electrical worker, ensuring both personal safety and the safety of others on site."
      keyPoints={[
        "Identifying and categorising various electrical workplace hazards",
        "Understanding the risk assessment approach to workplace hazards",
        "Recognising warning signs and indicators of potential dangers",
        "Implementing appropriate control measures using the hierarchy of controls",
        "Recording and reporting hazards according to company procedures"
      ]}
      icon="shield-alert"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
