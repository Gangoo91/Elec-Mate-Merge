
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { craftSkillsContent } from "@/data/craftSkills/index";
import { useParams } from "react-router-dom";

interface CraftSkillsUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const CraftSkillsUnit = ({ unitCode, onResourceClick }: CraftSkillsUnitProps) => {
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Craft Skills Content */}
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
            unitCode={unitCode}
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
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
      </div>
    </div>
  );
};

export default CraftSkillsUnit;
