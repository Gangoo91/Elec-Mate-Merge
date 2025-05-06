
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { healthAndSafetyContent } from '@/data/healthAndSafety/index';
import { installationMethodsContent } from '@/data/installationMethods/index';
import { craftSkillsContent } from '@/data/craftSkills/index';
import type { Subsection } from '@/data/healthAndSafety/types';

interface UseSubsectionContentProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  subsectionId?: string;
}

interface UseSubsectionContentResult {
  subsectionData: Subsection | null;
  sectionTitle: string;
  isCompleted: boolean;
  siblingSubsections: { id: string; title: string }[];
  parentSectionNumber: string;
  markAsComplete: () => void;
  navigateToSubsection: (subsectionId: string) => void;
}

export function useSubsectionContent({
  courseSlug,
  unitSlug,
  sectionId,
  subsectionId
}: UseSubsectionContentProps): UseSubsectionContentResult {
  const navigate = useNavigate();
  const [subsectionData, setSubsectionData] = useState<Subsection | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [parentSectionNumber, setParentSectionNumber] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [siblingSubsections, setSiblingSubsections] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    if (sectionId && subsectionId && unitSlug) {
      // Determine which content collection to use based on unit slug
      let contentCollection = healthAndSafetyContent;
      let unitPrefix = 'health';
      
      if (unitSlug.includes('elec2-01')) {
        contentCollection = healthAndSafetyContent;
        unitPrefix = 'health';
      } else if (unitSlug.includes('elec2-05a')) {
        contentCollection = installationMethodsContent;
        unitPrefix = 'install';
      } else if (unitSlug.includes('elec2-05b')) {
        contentCollection = craftSkillsContent;
        unitPrefix = 'craft';
      }

      // Find the section
      const section = contentCollection.find(section => section.sectionNumber === sectionId);
      
      if (section) {
        setSectionTitle(section.title);
        setParentSectionNumber(section.sectionNumber);
        
        // Get all subsections for navigation
        setSiblingSubsections(
          section.content.subsections.map(sub => ({
            id: sub.id,
            title: sub.title
          }))
        );
        
        // Find the subsection
        const subsection = section.content.subsections.find(
          sub => sub.id === subsectionId
        );
        
        if (subsection) {
          setSubsectionData(subsection);
          
          // Check local storage for completion status
          const storageKey = `completion_${unitPrefix}_${sectionId}_${subsectionId}`;
          const storedCompletion = localStorage.getItem(storageKey);
          setIsCompleted(storedCompletion === 'true');
        }
      }
    }
  }, [sectionId, subsectionId, unitSlug]);
  
  const markAsComplete = () => {
    if (!sectionId || !subsectionId || !unitSlug) return;
    
    // Determine unit prefix for storage key
    let unitPrefix = 'health';
    if (unitSlug.includes('elec2-05a')) {
      unitPrefix = 'install';
    } else if (unitSlug.includes('elec2-05b')) {
      unitPrefix = 'craft';
    }
    
    const storageKey = `completion_${unitPrefix}_${sectionId}_${subsectionId}`;
    localStorage.setItem(storageKey, 'true');
    setIsCompleted(true);
  };
  
  const navigateToSubsection = (subsectionId: string) => {
    if (courseSlug && unitSlug && sectionId) {
      // Determine path type based on unit slug
      let pathType = 'section';
      if (unitSlug.includes('elec2-05a')) {
        pathType = 'installation-method';
      } else if (unitSlug.includes('elec2-05b')) {
        pathType = 'craft-skills';
      }
      
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/${pathType}/${sectionId}/subsection/${subsectionId}`);
    }
  };

  return {
    subsectionData,
    sectionTitle,
    isCompleted,
    siblingSubsections,
    parentSectionNumber,
    markAsComplete,
    navigateToSubsection
  };
}
