
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHealthSafetySectionById, getSubsectionById } from '@/data/healthAndSafety/index';
import type { Subsection } from "@/data/healthAndSafety/types";

interface UseSubsectionContentProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  subsectionId?: string;
}

export function useSubsectionContent({
  courseSlug,
  unitSlug,
  sectionId,
  subsectionId
}: UseSubsectionContentProps) {
  const navigate = useNavigate();
  const [subsectionData, setSubsectionData] = useState<Subsection | null>(null);
  const [sectionTitle, setSectionTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [siblingSubsections, setSiblingSubsections] = useState<Subsection[]>([]);
  const [parentSectionNumber, setParentSectionNumber] = useState('');
  
  console.log("useSubsectionContent called with:", { courseSlug, unitSlug, sectionId, subsectionId });
  
  // Use default values for missing parameters
  const effectiveCourseSlug = courseSlug || 'level-2-diploma';
  const effectiveUnitSlug = unitSlug || 'health-safety';
  
  useEffect(() => {
    if (sectionId && subsectionId) {
      console.log("Fetching content for section:", sectionId, "subsection:", subsectionId);
      const section = getHealthSafetySectionById(sectionId);
      
      if (section) {
        console.log("Found section data:", section.title);
        setSectionTitle(section.title);
        setParentSectionNumber(section.sectionNumber);
        
        // Get the subsection data
        const subsection = getSubsectionById(sectionId, subsectionId);
        if (subsection) {
          console.log("Found subsection data:", subsection.title);
          setSubsectionData(subsection);
          
          // Check completion status
          const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
          const storedCompletion = localStorage.getItem(storageKey);
          setIsCompleted(storedCompletion === 'true');
          console.log("Checking completion status:", storageKey, storedCompletion);
        } else {
          console.log("No subsection found for ID:", subsectionId);
        }
        
        // Get sibling subsections for navigation
        const subsections = section.content && 
          typeof section.content === 'object' && 
          'subsections' in section.content ? 
          section.content.subsections : 
          section.subsections || [];
          
        console.log("Found sibling subsections:", subsections.length);
        setSiblingSubsections(subsections);
      } else {
        console.log("No section found for ID:", sectionId);
      }
    }
  }, [sectionId, subsectionId]);
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
      console.log("Marked as complete:", storageKey);
    }
  };
  
  const navigateToSubsection = (subsection: Subsection | string) => {
    if (!sectionId) return;
    
    let subsectionToNavigate: string;
    if (typeof subsection === 'string') {
      subsectionToNavigate = subsection;
    } else {
      subsectionToNavigate = subsection.id;
    }
    
    // Use the effective values for navigation
    navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}/section/${sectionId}/subsection/${subsectionToNavigate}`);
  };
  
  return {
    subsectionData,
    sectionTitle,
    siblingSubsections,
    navigateToSubsection,
    isCompleted,
    markAsComplete,
    parentSectionNumber
  };
}
