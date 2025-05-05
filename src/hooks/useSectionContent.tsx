
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SectionData, Subsection } from "@/data/healthAndSafety/types";
import { installationMethodsContent } from "@/data/installationMethods/index";
import { 
  basicElectricalTheorySection,
  technicalInformationSection,
  wiringSectionsSection,
  servicePositionSection,
  lightingCircuitsSection,
  ringRadialCircuitsSection,
  circuitRequirementsSection,
  earthingBondingSection,
  overcurrentProtectionSection,
  circuitDesignSection
} from "@/data/electricalTheory";

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
    if (sectionId && unitSlug) {
      // Determine which unit we're working with
      const isElectricalTheoryUnit = unitSlug.includes('elec2-01') || unitSlug.includes('elec2-04');
      const isInstallationMethodsUnit = unitSlug.includes('elec2-05a');

      let section;

      // Find the section based on unit type
      if (isElectricalTheoryUnit) {
        // For electrical theory, find the section based on the sectionId
        switch(sectionId) {
          case "1": 
            section = basicElectricalTheorySection;
            break;
          case "2":
            section = technicalInformationSection;
            break;
          case "3":
            section = wiringSectionsSection;
            break;
          case "4":
            section = servicePositionSection;
            break;
          case "5":
            section = lightingCircuitsSection;
            break;
          case "6":
            section = ringRadialCircuitsSection;
            break;
          case "7":
            section = circuitRequirementsSection;
            break;
          case "8":
            section = earthingBondingSection;
            break;
          case "9":
            section = overcurrentProtectionSection;
            break;
          case "10":
            section = circuitDesignSection;
            break;
          default:
            section = null;
        }
      } else if (isInstallationMethodsUnit) {
        // For installation methods, find the section by sectionNumber
        section = installationMethodsContent.find(
          section => section.sectionNumber === sectionId
        );
      }

      if (section) {
        setSectionData(section);
      }
      
      setLoading(false);
    }
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
      // Determine the correct navigation path based on unit type
      const isElectricalTheoryUnit = unitSlug.includes('elec2-01') || unitSlug.includes('elec2-04');
      const isInstallationMethodsUnit = unitSlug.includes('elec2-05a');
      
      if (isElectricalTheoryUnit) {
        // For electrical theory units
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subsection.id}`);
      } else if (isInstallationMethodsUnit) {
        // For installation methods unit
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/installation-method/${sectionId}/subsection/${subsection.id}`);
      }
    }
  };

  return {
    sectionData,
    loading,
    handleBackClick,
    navigateToSubsection
  };
}
