
import { useParams } from "react-router-dom";
import LearningBackButton from "@/components/apprentice/navigation/LearningBackButton";
import { useSectionContentData } from "@/hooks/useSectionContentData";
import QuizContent from "@/components/apprentice/section/QuizContent";
import SectionDisplay from "@/components/apprentice/section/SectionDisplay";

const SectionContent = () => {
  const { courseSlug = "level-2-diploma", unitSlug = "health-safety", sectionId } = useParams();
  
  // Log current navigation values for debugging
  console.log("SectionContent params:", { courseSlug, unitSlug, sectionId, pathname: window.location.pathname });
  
  // Ensure we have valid parameters for all routes
  const effectiveCourseSlug = courseSlug || "level-2-diploma";
  
  // Check if we're on electrical theory unit
  const isElectricalTheory = window.location.pathname.includes('/elec2-04');
  const effectiveUnitSlug = isElectricalTheory ? "elec2-04" : (unitSlug || "health-safety");
  
  console.log("SectionContent - Using unitSlug:", effectiveUnitSlug, "isElectricalTheory:", isElectricalTheory);
  
  // Check if we're on the quiz route
  const isQuizRoute = window.location.pathname.includes('/quiz');
  
  // Use the custom hook to manage section data and completion status
  const {
    sectionData,
    isCompleted,
    markAsComplete
  } = useSectionContentData({
    courseSlug: effectiveCourseSlug,
    unitSlug: effectiveUnitSlug,
    sectionId,
    isQuizRoute
  });
  
  // If no section data is available yet
  if (!sectionData) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 animate-fade-in">
        <LearningBackButton 
          currentPath="section"
          courseSlug={effectiveCourseSlug}
          unitSlug={effectiveUnitSlug}
        />
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Loading section content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-fade-in space-y-6">
      {/* Learning back button with proper navigation */}
      <LearningBackButton 
        currentPath="section"
        courseSlug={effectiveCourseSlug}
        unitSlug={effectiveUnitSlug}
      />
      
      {isQuizRoute ? (
        <QuizContent
          effectiveCourseSlug={effectiveCourseSlug}
          effectiveUnitSlug={effectiveUnitSlug}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      ) : (
        <SectionDisplay
          sectionData={sectionData}
          effectiveCourseSlug={effectiveCourseSlug}
          effectiveUnitSlug={effectiveUnitSlug}
          sectionId={sectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      )}
    </div>
  );
};

export default SectionContent;
