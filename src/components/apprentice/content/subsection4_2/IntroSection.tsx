
import React from "react";
import CourseContentSection from "../../CourseContentSection";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <CourseContentSection
      title="Working at Height Safety"
      description="Working at height remains one of the biggest causes of fatalities and major injuries in the electrical industry. The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury."
      keyPoints={[
        "Legal requirements under Work at Height Regulations 2005",
        "Risk assessment approaches for height work in electrical installations",
        "Selection of appropriate access equipment for electrical tasks",
        "Fall prevention and protection systems for electrical work",
        "Emergency planning and rescue procedures for working at height"
      ]}
      icon="hardhat"
      subsectionId={subsectionId}
    />
  );
};

export default IntroSection;
