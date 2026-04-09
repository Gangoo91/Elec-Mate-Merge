import { useState, useEffect } from 'react';
import { getHealthSafetySectionById } from '@/data/healthAndSafety/index';
import { electricalTheorySections } from '@/data/electricalTheory';
import { legislationSection } from '@/data/electricalTheory/section1-legislation';
import type { SectionData } from '@/data/courseTypes';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import { useCourseProgress } from '@/hooks/useCourseProgress';

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
  isQuizRoute = false,
}: UseSectionContentDataProps) => {
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if we're on the electrical theory unit
  const isElectricalTheory = unitSlug === 'elec2-04';

  useEffect(() => {
    if (!sectionId) return;

    // On quiz routes, still load completion status but skip section data
    if (isQuizRoute) {
      const storageKey = `completion_${isElectricalTheory ? 'elec' : 'hs'}_section_${sectionId}`;
      const storedCompletion = storageGetSync(storageKey);
      setIsCompleted(storedCompletion === 'true');
      return;
    }

    // Load section data based on unit type

    // Load data based on unit type
    let section;
    if (isElectricalTheory) {
      // For electrical theory, handle special case for section 1 (legislation)
      if (sectionId === '1' || sectionId === '1.0') {
        section = legislationSection;
      } else {
        // For other electrical theory sections
        const sectionIndex = parseInt(sectionId) - 1;
        section = electricalTheorySections[sectionIndex] || null;
      }

      // Electrical theory section loaded
    } else {
      // For health & safety, use the existing function
      section = getHealthSafetySectionById(sectionId);
    }

    if (section) {
      // Section data loaded
      setSectionData(section);

      // Check completion status
      const storageKey = `completion_${isElectricalTheory ? 'elec' : 'hs'}_section_${sectionId}`;
      const storedCompletion = storageGetSync(storageKey);
      setIsCompleted(storedCompletion === 'true');
    }
  }, [sectionId, unitSlug, isQuizRoute, isElectricalTheory]);

  const { recordProgress } = useCourseProgress();

  // Function to mark section as complete (dual-write: localStorage + DB)
  const markAsComplete = () => {
    if (!sectionId) return;

    // localStorage (legacy)
    const storageKey = `completion_${isElectricalTheory ? 'elec' : 'hs'}_section_${sectionId}`;
    storageSetSync(storageKey, 'true');
    setIsCompleted(true);

    // DB sync
    const courseKey = isElectricalTheory ? 'electrical-theory' : 'health-safety';
    recordProgress(courseKey, `section-${sectionId}`, 100, true);
  };

  return {
    sectionData,
    isCompleted,
    markAsComplete,
  };
};
