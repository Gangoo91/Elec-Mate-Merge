
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
import { useParams } from "react-router-dom";

interface HealthSafetyUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const HealthSafetyUnit = ({ unitCode, onResourceClick }: HealthSafetyUnitProps) => {
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
      {/* Health and Safety Content */}
      <div className="space-y-6">
        {healthAndSafetyContent.map((section) => (
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
          title="Health & Safety Assessment Quiz"
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

export default HealthSafetyUnit;
