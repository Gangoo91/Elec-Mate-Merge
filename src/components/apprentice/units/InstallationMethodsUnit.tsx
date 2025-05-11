
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
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

  // Placeholder data for installation methods
  const installationMethodsSubsections = [
    { id: "5A.1", title: "Wiring Systems" },
    { id: "5A.2", title: "Conduit Systems" },
    { id: "5A.3", title: "Trunking Systems" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Installation Methods Content */}
      <div className="space-y-6">
        <SectionBox
          key="5A"
          sectionNumber="5A"
          title="Installation Methods"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        {/* Render subsections */}
        {installationMethodsSubsections.map(subsection => (
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
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
      </div>
    </div>
  );
};

export default InstallationMethodsUnit;
