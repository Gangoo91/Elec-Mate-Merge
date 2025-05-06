import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
import { 
  electricalTheorySection, 
  basicElectricalTheorySection,
  technicalInformationSection,
  wiringSectionsSection,
  servicePositionSection,
  lightingCircuitsSection,
  ringRadialCircuitsSection,
  circuitRequirementsSection,
  earthingBondingSection,
  overcurrentProtectionSection,
  circuitDesignSection
} from "@/data/electricalTheory";
import { installationMethodsSection } from "@/data/electricalTheory/section-installation-methods";
import { installationMethodsContent } from "@/data/installationMethods/index";
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
      {/* Health and Safety Content - Only for ELEC2/01 - NOW SHOWING INSTALLATION METHODS */}
      {showHealthSafetyContent && (
        <div className="space-y-6">
          {installationMethodsContent.map((section) => (
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

      {/* Electrical Theory Content - Only for ELEC2/04 - UNCHANGED */}
      {showElectricalTheoryContent && (
        <div className="space-y-6">
          {/* Main section */}
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
          
          {/* Individual topic sections */}
          <SectionBox
            key={basicElectricalTheorySection.sectionNumber}
            sectionNumber={basicElectricalTheorySection.sectionNumber}
            title={basicElectricalTheorySection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={technicalInformationSection.sectionNumber}
            sectionNumber={technicalInformationSection.sectionNumber}
            title={technicalInformationSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={wiringSectionsSection.sectionNumber}
            sectionNumber={wiringSectionsSection.sectionNumber}
            title={wiringSectionsSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={servicePositionSection.sectionNumber}
            sectionNumber={servicePositionSection.sectionNumber}
            title={servicePositionSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={lightingCircuitsSection.sectionNumber}
            sectionNumber={lightingCircuitsSection.sectionNumber}
            title={lightingCircuitsSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={ringRadialCircuitsSection.sectionNumber}
            sectionNumber={ringRadialCircuitsSection.sectionNumber}
            title={ringRadialCircuitsSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={circuitRequirementsSection.sectionNumber}
            sectionNumber={circuitRequirementsSection.sectionNumber}
            title={circuitRequirementsSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={earthingBondingSection.sectionNumber}
            sectionNumber={earthingBondingSection.sectionNumber}
            title={earthingBondingSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={overcurrentProtectionSection.sectionNumber}
            sectionNumber={overcurrentProtectionSection.sectionNumber}
            title={overcurrentProtectionSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
          <SectionBox
            key={circuitDesignSection.sectionNumber}
            sectionNumber={circuitDesignSection.sectionNumber}
            title={circuitDesignSection.title}
            isExpanded={false}
            onClick={handleSectionClick}
            content={<></>}
            unitCode={unit.code}
            courseSlug={courseSlug}
          />
          
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

      {/* Installation Methods Content - Only for ELEC2/05A - NOW SHOWING HEALTH & SAFETY */}
      {showInstallationMethodsContent && (
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

      {/* Craft Skills Content - Only for ELEC2/05B - UNCHANGED */}
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
