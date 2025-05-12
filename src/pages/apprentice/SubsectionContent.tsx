
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LearningBackButton from "@/components/apprentice/navigation/LearningBackButton";
import SubsectionLearningContent from "@/components/apprentice/subsection/SubsectionLearningContent";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Book } from "lucide-react";

const SubsectionContent = () => {
  const { courseSlug = "level-2-diploma", unitSlug = "health-safety", sectionId, subsectionId } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Log parameters to debug
  console.log("SubsectionContent params:", { courseSlug, unitSlug, sectionId, subsectionId });
  
  // Ensure we have valid parameters for all routes
  const effectiveCourseSlug = courseSlug || 'level-2-diploma';
  const effectiveUnitSlug = unitSlug || 'health-safety';
  
  // Check if we're on the electrical theory unit - check both the unitSlug and the URL path
  const path = window.location.pathname;
  const isElectricalTheory = effectiveUnitSlug === 'elec2-04' || path.includes('/elec2-04') || path.includes('/electrical-theory');
  
  console.log("SubsectionContent - isElectricalTheory:", isElectricalTheory, "Path:", path);
  
  const {
    subsectionData,
    sectionTitle,
    siblingSubsections,
    navigateToSubsection,
  } = useSubsectionContent({
    courseSlug: effectiveCourseSlug,
    unitSlug: effectiveUnitSlug,
    sectionId,
    subsectionId,
  });
  
  // Override titles for electrical theory subsections
  let displaySectionTitle = sectionTitle;
  let displaySubsectionTitle = subsectionData?.title;
  
  if (isElectricalTheory) {
    displaySectionTitle = "Legislation & Regulations";
    
    if (subsectionId === "1.1") {
      displaySubsectionTitle = "Health and Safety at Work Act 1974";
    } else if (subsectionId === "1.2") {
      displaySubsectionTitle = "Electricity at Work Regulations 1989";
    } else if (subsectionId === "1.3") {
      displaySubsectionTitle = "Building Regulations (Part P)";
    } else if (subsectionId === "1.4") {
      displaySubsectionTitle = "British Standards (BS 7671)";
    } else if (subsectionId === "1.5") {
      displaySubsectionTitle = "Guidance Documents";
    } else if (subsectionId === "1.6") {
      displaySubsectionTitle = "Roles and Responsibilities";
    }
  }
  
  // Check local storage for completion status
  useEffect(() => {
    if (sectionId && subsectionId) {
      const prefix = isElectricalTheory ? 'elec' : 'hs';
      const storageKey = `completion_${prefix}_${sectionId}_${subsectionId}`;
      const storedCompletion = localStorage.getItem(storageKey);
      setIsCompleted(storedCompletion === 'true');
      console.log("Checking completion status:", storageKey, storedCompletion);
    }
  }, [sectionId, subsectionId, isElectricalTheory]);
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const prefix = isElectricalTheory ? 'elec' : 'hs';
      const storageKey = `completion_${prefix}_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
      console.log("Marked as complete:", storageKey);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in px-4 md:px-6 max-w-4xl mx-auto py-8">
      {/* Back Button */}
      <div className="w-full">
        <LearningBackButton
          currentPath="subsection"
          courseSlug={effectiveCourseSlug}
          unitSlug={effectiveUnitSlug}
          sectionId={sectionId}
          subsectionId={subsectionId}
        />
      </div>
      
      {/* Subsection Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-dark to-elec-dark/80 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-elec-yellow rounded-md p-1.5 flex items-center justify-center">
              <Book className="h-4 w-4 text-elec-dark" />
            </div>
            <div className="text-sm font-medium text-elec-yellow">
              {displaySectionTitle || "Section"}
            </div>
            {isCompleted && (
              <div className="ml-auto flex items-center text-green-400 text-sm gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Completed</span>
              </div>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white ml-9">
            {displaySubsectionTitle || "Learning Content"}
          </h1>
        </CardContent>
      </Card>
      
      {/* Subsection content */}
      {subsectionId && (
        <SubsectionLearningContent 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          isElectricalTheory={isElectricalTheory}
          courseSlug={effectiveCourseSlug}
          unitSlug={effectiveUnitSlug}
          sectionId={sectionId}
        />
      )}
    </div>
  );
};

export default SubsectionContent;
