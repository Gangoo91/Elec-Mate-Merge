
import { useState, useEffect } from 'react';
import { getHealthSafetySectionById } from '@/data/healthAndSafety/index';
import { electricalTheorySections } from '@/data/electricalTheory';
import type { SectionData } from '@/data/courseTypes';

interface UseSectionContentDataProps {
  courseSlug: string;
  unitSlug: string;
  sectionId?: string;
  isQuizRoute?: boolean;
}

export const useSectionContentData = ({
  courseSlug,
  unitSlug,
  sectionId,
  isQuizRoute = false
}: UseSectionContentDataProps) => {
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Check if we're on the electrical theory unit
  const isElectricalTheory = unitSlug === 'elec2-04';
  
  useEffect(() => {
    // Skip if on quiz route or no section ID
    if (isQuizRoute || !sectionId) return;
    
    console.log(`Loading section data for ${isElectricalTheory ? 'Electrical Theory' : 'Health & Safety'} section: ${sectionId}`);
    console.log(`Current unit: ${unitSlug}, isElectricalTheory: ${isElectricalTheory}`);
    
    // Load data based on unit type
    let section;
    if (isElectricalTheory) {
      // For electrical theory, use the section number to get the right section
      const sectionIndex = parseInt(sectionId) - 1;
      section = electricalTheorySections[sectionIndex] || null;
      console.log("Loaded electrical theory section:", section?.title || "Not found");
    } else {
      // For health & safety, use the existing function
      section = getHealthSafetySectionById(sectionId);
    }
    
    if (section) {
      console.log("Section data loaded:", section.title);
      setSectionData(section);
      
      // Check completion status
      const storageKey = `completion_${isElectricalTheory ? 'elec' : 'hs'}_section_${sectionId}`;
      const storedCompletion = localStorage.getItem(storageKey);
      setIsCompleted(storedCompletion === 'true');
    }
  }, [sectionId, unitSlug, isQuizRoute, isElectricalTheory]);
  
  // Function to mark section as complete
  const markAsComplete = () => {
    if (!sectionId) return;
    
    const storageKey = `completion_${isElectricalTheory ? 'elec' : 'hs'}_section_${sectionId}`;
    localStorage.setItem(storageKey, 'true');
    setIsCompleted(true);
    console.log(`Section ${sectionId} marked as complete with key: ${storageKey}`);
  };
  
  return {
    sectionData,
    isCompleted,
    markAsComplete
  };
};
