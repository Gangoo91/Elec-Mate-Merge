
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { healthAndSafetyContent } from "@/data/healthAndSafetyContent";
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
  
  // Only show Health and Safety content for unit ELEC2/01
  const showHealthSafetyContent = unit.code === "ELEC2/01";

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
              content={<></>} // Content is no longer needed here as we navigate to a new page
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
            content={<></>} // Content is no longer needed here as we navigate to a new page
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
