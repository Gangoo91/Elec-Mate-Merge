
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Subsection } from "@/data/courseTypes";

interface UseSubsectionContentProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  subsectionId?: string;
}

interface UseSubsectionContentResult {
  subsectionData: Subsection | null;
  sectionTitle: string | null;
  siblingSubsections: Subsection[];
  loading: boolean;
  navigateToSubsection: (subsection: Subsection) => void;
  isCompleted: boolean;
  parentSectionNumber: string | null;
  markAsComplete: () => void;
}

export function useSubsectionContent({
  courseSlug,
  unitSlug,
  sectionId,
  subsectionId
}: UseSubsectionContentProps): UseSubsectionContentResult {
  const navigate = useNavigate();
  const [subsectionData, setSubsectionData] = useState<Subsection | null>(null);
  const [sectionTitle, setSectionTitle] = useState<string | null>(null);
  const [siblingSubsections, setSiblingSubsections] = useState<Subsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [parentSectionNumber, setParentSectionNumber] = useState<string | null>(null);

  useEffect(() => {
    // Set loading to false since we don't have data to load
    setLoading(false);
  }, [subsectionId, sectionId, unitSlug]);

  const navigateToSubsection = (subsection: Subsection) => {
    if (courseSlug && unitSlug && sectionId) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsection.id}`);
    }
  };

  const markAsComplete = () => {
    setIsCompleted(true);
  };

  return {
    subsectionData,
    sectionTitle,
    siblingSubsections,
    loading,
    navigateToSubsection,
    isCompleted,
    parentSectionNumber,
    markAsComplete
  };
}
