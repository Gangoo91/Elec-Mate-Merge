
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
  
  useEffect(() => {
    if (sectionId && subsectionId) {
      const section = getHealthSafetySectionById(sectionId);
      
      if (section) {
        setSectionTitle(section.title);
        setParentSectionNumber(section.sectionNumber);
        
        // Get the subsection data
        const subsection = getSubsectionById(sectionId, subsectionId);
        if (subsection) {
          setSubsectionData(subsection);
          
          // Check completion status
          const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
          const storedCompletion = localStorage.getItem(storageKey);
          setIsCompleted(storedCompletion === 'true');
        }
        
        // Get sibling subsections for navigation
        const subsections = section.content && 
          typeof section.content === 'object' && 
          'subsections' in section.content ? 
          section.content.subsections : 
          section.subsections || [];
          
        setSiblingSubsections(subsections);
      }
    }
  }, [sectionId, subsectionId]);
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
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
    
    if (courseSlug && unitSlug) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsectionToNavigate}`);
    }
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
