
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
import { electricalTheorySection } from "@/data/electricalTheory/section-electrical-theory";
import { installationMethodsSection } from "@/data/electricalTheory/section-installation-methods";
import { craftSkillsContent } from "@/data/craftSkills/index";  // Import craft skills content
import type { CourseUnit } from "@/data/courseUnits";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { healthAndSafetyQuizzes } from "@/data/unitQuizzes";

interface UnitDetailsProps {
  unit: CourseUnit;
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitDetails = ({ 
  unit, 
  onResourceClick,
  completedResources,
  onToggleResourceComplete 
}: UnitDetailsProps) => {
  const { toast } = useToast();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { courseSlug } = useParams();
  
  // Determine which content to show based on unit code
  const showHealthSafetyContent = unit.code === "ELEC2/01";
  const showElectricalTheoryContent = unit.code === "ELEC2/04";
  const showInstallationMethodsContent = unit.code === "ELEC2/05A";
  const showCraftSkillsContent = unit.code === "ELEC2/05B";  // Add condition for craft skills

  // Load completion status
  useEffect(() => {
    const storedQuizStatus = localStorage.getItem(`unit_${unit.code}_quiz_completed`);
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unit.code]);

  const handleSectionClick = () => {
    // Report study activity when opening a section
    onResourceClick('learning');
  };

  // Helper function to create section boxes from section data
  const createSectionBoxes = (section: any) => {
    if (!section || !section.content || !section.content.subsections) return null;
    
    return section.content.subsections.map((subsection: any) => (
      <SectionBox
        key={subsection.id}
        sectionNumber={subsection.id}
        title={subsection.title}
        isExpanded={false}
        onClick={handleSectionClick}
        content={<></>}
        unitCode={unit.code}
        courseSlug={courseSlug}
      />
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Health and Safety Content - Only for ELEC2/01 */}
      {showHealthSafetyContent && (
        <div className="space-y-6">
          {healthAndSafetyContent.map((section) => (
            <SectionBox
              key={section.sectionNumber}
              sectionNumber={section.sectionNumber}
              title={section.title}
              isExpanded={false}
              onClick={handleSectionClick}
              content={<></>}
              unitCode={unit.code}
              courseSlug={courseSlug}
            />
          ))}
          
          {/* Quiz Section */}
          <SectionBox
            sectionNumber="Q"
            title="Knowledge Assessment Quiz"
            isExpanded={false}
            onClick={() => {
              handleSectionClick();
              onResourceClick('assessment');
            }}
            content={<></>}
            isCompleted={quizCompleted}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
        </div>
      )}

      {/* Electrical Theory Content - Only for ELEC2/04 */}
      {showElectricalTheoryContent && (
        <div className="space-y-6">
          <SectionBox
            key={electricalTheorySection.sectionNumber}
            sectionNumber={electricalTheorySection.sectionNumber}
            title={electricalTheorySection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          {/* Render subsections */}
          {createSectionBoxes(electricalTheorySection)}
          
          {/* Quiz Section */}
          <SectionBox
            sectionNumber="Q"
            title="Electrical Theory Assessment Quiz"
            isExpanded={false}
            onClick={() => {
              handleSectionClick();
              onResourceClick('assessment');
            }}
            content={<></>}
            isCompleted={quizCompleted}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
        </div>
      )}

      {/* Installation Methods Content - Only for ELEC2/05A */}
      {showInstallationMethodsContent && (
        <div className="space-y-6">
          <SectionBox
            key={installationMethodsSection.sectionNumber}
            sectionNumber={installationMethodsSection.sectionNumber}
            title={installationMethodsSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          {/* Render subsections */}
          {createSectionBoxes(installationMethodsSection)}
          
          {/* Quiz Section */}
          <SectionBox
            sectionNumber="Q"
            title="Installation Methods Assessment Quiz"
            isExpanded={false}
            onClick={() => {
              handleSectionClick();
              onResourceClick('assessment');
            }}
            content={<></>}
            isCompleted={quizCompleted}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
        </div>
      )}

      {/* Craft Skills Content - Only for ELEC2/05B */}
      {showCraftSkillsContent && (
        <div className="space-y-6">
          {/* Display all craft skills sections */}
          {craftSkillsContent.map((section) => (
            <SectionBox
              key={section.sectionNumber}
              sectionNumber={section.sectionNumber}
              title={section.title}
              isExpanded={false}
              onClick={handleSectionClick}
              content={<></>}
              unitCode={unit.code}
              courseSlug={courseSlug}
            />
          ))}
          
          {/* Quiz Section */}
          <SectionBox
            sectionNumber="Q"
            title="Electrical Installation Craft Skills Quiz"
            isExpanded={false}
            onClick={() => {
              handleSectionClick();
              onResourceClick('assessment');
            }}
            content={<></>}
            isCompleted={quizCompleted}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
        </div>
      )}
    </div>
  );
};

export default UnitDetails;
