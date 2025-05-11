
import React from "react";
import { SubsectionProps } from "../subsection1_1/types";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="PPE for Electrical Work"
      description="Proper Personal Protective Equipment (PPE) is essential for electrical work safety. The Electricity at Work Regulations 1989 mandate appropriate PPE use, which serves as the final line of defence against electrical hazards."
      keyPoints={[
        "Understanding PPE categories and their specific applications in electrical work",
        "Selection of appropriate PPE based on risk assessment and voltage levels",
        "Legal requirements for PPE provision and maintenance",
        "Testing and inspection requirements for electrical safety PPE",
        "Limitations of PPE and integration with other safety measures"
      ]}
      icon="shield-alert"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
