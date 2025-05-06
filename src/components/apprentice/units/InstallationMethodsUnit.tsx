
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { installationMethodsSection } from "@/data/electricalTheory/section-installation-methods";
import { useParams } from "react-router-dom";

interface InstallationMethodsUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const InstallationMethodsUnit = ({ unitCode, onResourceClick }: InstallationMethodsUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { courseSlug } = useParams();
  
  // Load completion status
  useEffect(() => {
    const storedQuizStatus = localStorage.getItem(`unit_${unitCode}_quiz_completed`);
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unitCode]);

  const handleSectionClick = () => {
    // Report study activity when opening a section
    onResourceClick('learning');
  };

  // Helper function to create section boxes from section data
  const createSectionBoxes = () => {
    if (!installationMethodsSection || !installationMethodsSection.content || !installationMethodsSection.content.subsections) return null;
    
    return installationMethodsSection.content.subsections.map((subsection: any) => (
      <SectionBox
        key={subsection.id}
        sectionNumber={subsection.id}
        title={subsection.title}
        isExpanded={false}
        onClick={handleSectionClick}
        content={<></>}
        unitCode={unitCode}
        courseSlug={courseSlug}
      />
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Installation Methods Content */}
      <div className="space-y-6">
        <SectionBox
          key={installationMethodsSection.sectionNumber}
          sectionNumber={installationMethodsSection.sectionNumber}
          title={installationMethodsSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        {/* Render subsections */}
        {createSectionBoxes()}
        
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
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
      </div>
    </div>
  );
};

export default InstallationMethodsUnit;
