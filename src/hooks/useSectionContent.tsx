
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
import { 
  electricalTheorySection,
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
import { installationMethodsSection } from "@/data/electricalTheory/section-installation-methods";
import type { SectionData, Subsection } from "@/data/healthAndSafety/types";

interface UseSectionContentProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
}

export function useSectionContent({
  courseSlug, 
  unitSlug, 
  sectionId
}: UseSectionContentProps) {
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (sectionId && unitSlug) {
      // Determine which content to use based on unit code
      const isHealthSafetyUnit = unitSlug.includes('elec2-01');
      const isElectricalTheoryUnit = unitSlug.includes('elec2-04');
      const isInstallationMethodsUnit = unitSlug.includes('elec2-05a');
      
      // Find the section with matching ID from the appropriate content source
      let section = null;
      
      if (isHealthSafetyUnit) {
        section = healthAndSafetyContent.find(
          section => section.sectionNumber.toLowerCase().replace(/\//g, "-") === sectionId
        );
      } else if (isElectricalTheoryUnit) {
        // For electrical theory, match the section by ID
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
          case "04": // Main section
            section = electricalTheorySection;
            break;
          default:
            // For subsections (like "1.1"), we need to find the parent section and then the subsection
            const sectionNumber = sectionId.split('.')[0];
            const subsectionId = sectionId;
            let parentSection;
            
            switch(sectionNumber) {
              case "1": parentSection = basicElectricalTheorySection; break;
              case "2": parentSection = technicalInformationSection; break;
              case "3": parentSection = wiringSectionsSection; break;
              case "4": parentSection = servicePositionSection; break;
              case "5": parentSection = lightingCircuitsSection; break;
              case "6": parentSection = ringRadialCircuitsSection; break;
              case "7": parentSection = circuitRequirementsSection; break;
              case "8": parentSection = earthingBondingSection; break;
              case "9": parentSection = overcurrentProtectionSection; break;
              case "10": parentSection = circuitDesignSection; break;
              default: parentSection = null;
            }
            
            if (parentSection) {
              const foundSubsection = parentSection.content.subsections.find(
                sub => sub.id === subsectionId
              );
              
              if (foundSubsection) {
                // Create a section-like structure for the subsection
                section = {
                  sectionNumber: subsectionId,
                  title: foundSubsection.title,
                  content: {
                    subsections: [foundSubsection],
                    icon: parentSection.content.icon
                  }
                };
              }
            }
        }
      } else if (isInstallationMethodsUnit) {
        // For installation methods, use the main section data
        if (sectionId === "05a") {
          section = installationMethodsSection;
        } else {
          // For subsections, get the data from the main section
          const subsectionId = sectionId;
          const foundSubsection = installationMethodsSection.content.subsections.find(
            sub => sub.id === subsectionId
          );
          
          if (foundSubsection) {
            // Create a section-like structure for the subsection
            section = {
              sectionNumber: subsectionId,
              title: foundSubsection.title,
              content: {
                subsections: [foundSubsection],
                icon: installationMethodsSection.content.icon
              }
            };
          }
        }
      }
      
      if (section) {
        setSectionData(section);
      }
      setLoading(false);
    }
  }, [sectionId, unitSlug]);

  const handleBackClick = () => {
    if (courseSlug && unitSlug) {
      // Navigate back to the unit page rather than the main course page
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else {
      navigate(-1);
    }
  };

  const navigateToSubsection = (subsection: Subsection) => {
    if (courseSlug && unitSlug && sectionData) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${subsection.id}`);
    }
  };

  return {
    sectionData,
    loading,
    handleBackClick,
    navigateToSubsection,
  };
}
