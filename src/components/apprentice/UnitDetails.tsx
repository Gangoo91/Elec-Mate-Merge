
import { useState, useEffect } from "react";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import SectionBox from "@/components/apprentice/SectionBox";
import UnitQuiz from "@/components/apprentice/UnitQuiz";
import { healthAndSafetyContent } from "@/data/healthAndSafetyContent";
import { healthAndSafetyQuizzes } from "@/data/unitQuizzes";
import type { CourseUnit } from "@/data/courseUnits";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";

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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
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

  const toggleSection = (sectionNumber: string) => {
    if (expandedSection === sectionNumber) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionNumber);
      // Report study activity when opening a section
      onResourceClick('learning');
    }
  };

  const handleQuizComplete = (score: number) => {
    // Mark quiz as completed
    setQuizCompleted(true);
    localStorage.setItem(`unit_${unit.code}_quiz_completed`, 'true');
    
    // Mark resource as completed
    onToggleResourceComplete(`${unit.code}_quiz`);
    
    // Show toast
    toast({
      title: "Quiz Completed",
      description: `You scored ${score} out of 10. Your progress has been saved.`,
    });
    
    // Log activity
    onResourceClick('assessment');
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
              isExpanded={expandedSection === section.sectionNumber}
              onClick={() => toggleSection(section.sectionNumber)}
              content={
                <div className="space-y-6">
                  {section.content.subsections.map(subsection => (
                    <CourseContentSection
                      key={subsection.id}
                      title={subsection.title}
                      description={subsection.content}
                      keyPoints={subsection.keyPoints}
                      icon={section.content.icon}
                      isMainSection={false}
                    />
                  ))}
                </div>
              }
              unitCode={unit.code}
              courseSlug={courseSlug}
            />
          ))}
          
          {/* Quiz Section */}
          <SectionBox
            sectionNumber="Q"
            title="Knowledge Assessment Quiz"
            isExpanded={expandedSection === "quiz"}
            onClick={() => toggleSection("quiz")}
            content={
              <UnitQuiz
                unitCode={unit.code}
                questions={healthAndSafetyQuizzes.questions}
                onQuizComplete={handleQuizComplete}
              />
            }
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
