
import { useState, useEffect } from "react";
import { getHealthSafetySectionById } from "@/data/healthAndSafety/index";
import type { SectionData } from "@/data/healthAndSafety/types";

interface UseSectionContentDataProps {
  courseSlug: string;
  unitSlug: string;
  sectionId?: string;
  isQuizRoute: boolean;
}

interface UseSectionContentDataResult {
  sectionData: SectionData | null;
  isCompleted: boolean;
  markAsComplete: () => void;
}

export function useSectionContentData({
  courseSlug,
  unitSlug,
  sectionId,
  isQuizRoute
}: UseSectionContentDataProps): UseSectionContentDataResult {
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (isQuizRoute) {
      // Set quiz data
      setSectionData({
        sectionNumber: "Q",
        title: "Unit Assessment Quiz",
        description: "Test your knowledge of health and safety in electrical installations",
        content: {
          introduction: "This quiz will test your understanding of the key concepts covered in this unit.",
          subsections: [],
        }
      });
      
      // Check if quiz is completed
      const quizCompletionKey = `unit_${unitSlug}_quiz_completed`;
      const completionStatus = localStorage.getItem(quizCompletionKey);
      setIsCompleted(completionStatus === 'true');
    } else if (sectionId) {
      // Load section data from health & safety content
      const section = getHealthSafetySectionById(sectionId);
      if (section) {
        setSectionData(section);
        
        // Check if section is completed
        const sectionCompletionKey = `unit_${unitSlug}_section_${sectionId}_completed`;
        const completionStatus = localStorage.getItem(sectionCompletionKey);
        setIsCompleted(completionStatus === 'true');
      }
    }
  }, [sectionId, unitSlug, isQuizRoute]);
  
  const markAsComplete = () => {
    if (isQuizRoute) {
      // Mark quiz as completed
      const quizCompletionKey = `unit_${unitSlug}_quiz_completed`;
      localStorage.setItem(quizCompletionKey, 'true');
    } else if (sectionId) {
      // Mark section as completed
      const sectionCompletionKey = `unit_${unitSlug}_section_${sectionId}_completed`;
      localStorage.setItem(sectionCompletionKey, 'true');
    }
    
    setIsCompleted(true);
  };

  return {
    sectionData,
    isCompleted,
    markAsComplete
  };
}
