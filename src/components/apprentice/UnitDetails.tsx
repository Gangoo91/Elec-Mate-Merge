
import { useState } from "react";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import SectionBox from "@/components/apprentice/SectionBox";
import { healthAndSafetyContent } from "@/data/healthAndSafetyContent";
import type { CourseUnit } from "@/data/courseUnits";

interface UnitDetailsProps {
  unit: CourseUnit;
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitDetails = ({ unit, onResourceClick }: UnitDetailsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Only show Health and Safety content for unit ELEC2/01
  const showHealthSafetyContent = unit.code === "ELEC2/01";

  const toggleSection = (sectionNumber: string) => {
    if (expandedSection === sectionNumber) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionNumber);
      // Report study activity when opening a section
      onResourceClick('learning');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Health and Safety Content - Only for ELEC2/01 */}
      {showHealthSafetyContent && (
        <div className="space-y-4">
          {healthAndSafetyContent.map((section) => (
            <SectionBox
              key={section.sectionNumber}
              sectionNumber={section.sectionNumber}
              title={section.title}
              isExpanded={expandedSection === section.sectionNumber}
              onClick={() => toggleSection(section.sectionNumber)}
              content={
                <div className="space-y-4">
                  {section.content.subsections.map(subsection => (
                    <CourseContentSection
                      key={subsection.id}
                      title={subsection.title}
                      description={subsection.content}
                      keyPoints={subsection.keyPoints}
                      icon={section.content.icon as "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section"}
                      isMainSection={false}
                    />
                  ))}
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitDetails;
