
import { useParams } from "react-router-dom";
import SubsectionLearningContent from "@/components/apprentice/subsection/SubsectionLearningContent";
import { useState, useEffect } from "react";
import BackButton from "@/components/apprentice/BackButton";

const SubsectionContent = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Check local storage for completion status
  useEffect(() => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_${sectionId}_${subsectionId}`;
      const storedCompletion = localStorage.getItem(storageKey);
      setIsCompleted(storedCompletion === 'true');
    }
  }, [sectionId, subsectionId]);
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in bg-[#121212] px-4 md:px-6 max-w-4xl mx-auto py-8">
      {/* Back button - explicitly passing all params for clarity */}
      <BackButton 
        courseSlug={courseSlug} 
        unitSlug={unitSlug} 
        sectionId={sectionId} 
      />
      
      {/* Subsection content */}
      {subsectionId && (
        <SubsectionLearningContent 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      )}
    </div>
  );
};

export default SubsectionContent;
