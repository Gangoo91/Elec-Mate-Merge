
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SectionData, Subsection } from "@/data/courseTypes";

interface UseSectionContentProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
}

interface UseSectionContentResult {
  sectionData: SectionData | null;
  loading: boolean;
  handleBackClick: () => void;
  navigateToSubsection: (subsection: Subsection) => void;
}

export function useSectionContent({
  courseSlug,
  unitSlug,
  sectionId
}: UseSectionContentProps): UseSectionContentResult {
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false since we don't have any actual data yet
    setLoading(false);
  }, [sectionId, unitSlug]);

  const handleBackClick = () => {
    if (courseSlug && unitSlug) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else {
      navigate(-1);
    }
  };

  const navigateToSubsection = (subsection: Subsection) => {
    if (courseSlug && unitSlug && sectionId) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsection.id}`);
    }
  };

  return {
    sectionData,
    loading,
    handleBackClick,
    navigateToSubsection
  };
}
