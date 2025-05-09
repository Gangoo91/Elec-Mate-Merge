import { useNavigate } from "react-router-dom";
import { Subsection } from "@/data/healthAndSafety/types";

interface ContentNavigationProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  isInstallationMethod?: boolean;
  isCraftSkill?: boolean;
}

export function useContentNavigation({
  courseSlug,
  unitSlug,
  sectionId,
  isInstallationMethod = false,
  isCraftSkill = false
}: ContentNavigationProps) {
  const navigate = useNavigate();

  const navigateToSubsection = (subsection: Subsection | string) => {
    if (!courseSlug || !unitSlug || !sectionId) return;

    const subsectionId = typeof subsection === 'string' ? subsection : subsection.id;
    
    if (isInstallationMethod) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/installation-method/${sectionId}/subsection/${subsectionId}`);
    } else if (isCraftSkill) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/craft-skills/${sectionId}/subsection/${subsectionId}`);
    } else {
      // Regular section
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsectionId}`);
    }
  };

  const navigateBack = () => {
    if (!courseSlug || !unitSlug) {
      navigate(-1);
      return;
    }

    // If we have a section ID, go back to unit page
    if (sectionId) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else {
      // Otherwise go back to course page
      navigate(`/apprentice/study/eal/${courseSlug}`);
    }
  };

  return {
    navigateToSubsection,
    navigateBack
  };
}
