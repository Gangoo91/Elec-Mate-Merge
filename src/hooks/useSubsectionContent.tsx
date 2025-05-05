
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Subsection } from "@/data/healthAndSafety/types";
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
  siblingSubsections: Subsection[];
  parentSectionNumber: string;
  markAsComplete: () => void;
  navigateToSubsection: (subId: string) => void;
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [siblingSubsections, setSiblingSubsections] = useState<Subsection[]>([]);
  const [parentSectionNumber, setParentSectionNumber] = useState("");

  useEffect(() => {
    if (sectionId && subsectionId) {
      // Determine which unit we're working with
      const isElectricalTheoryUnit = unitSlug?.includes('elec2-04');
      const isInstallationMethodsUnit = unitSlug?.includes('elec2-05a');
      
      let section;
      let foundSubsection;
      
      // Find the section based on unit type
      if (isElectricalTheoryUnit) {
        // For electrical theory, find the parent section based on the first part of the subsectionId
        const parentSection = subsectionId.split('.')[0]; 
        setParentSectionNumber(parentSection);
        
        switch(parentSection) {
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
        
        if (section) {
          setSectionTitle(section.title);
          // Find the subsection
          foundSubsection = section.content.subsections.find(
            sub => sub.id === subsectionId
          );
          
          // Store all sibling subsections for navigation
          setSiblingSubsections(section.content.subsections);
        }
      } else if (isInstallationMethodsUnit) {
        // For installation methods, use existing code
        section = installationMethodsContent.find(
          section => section.sectionNumber === sectionId
        );
        
        if (section) {
          setSectionTitle(section.title);
          // Find the subsection
          foundSubsection = section.content.subsections.find(
            sub => sub.id === subsectionId
          );
          
          // Store all sibling subsections for navigation
          setSiblingSubsections(section.content.subsections);
        }
      }
      
      if (foundSubsection) {
        setSubsectionData(foundSubsection);
        
        // Check local storage for completion status
        const storageKey = `completion_${sectionId}_${subsectionId}`;
        const storedCompletion = localStorage.getItem(storageKey);
        setIsCompleted(storedCompletion === 'true');
      }
    }
  }, [sectionId, subsectionId, unitSlug]);

  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
    }
  };
  
  const navigateToSubsection = (subId: string) => {
    if (courseSlug && unitSlug && sectionId) {
      // Navigate to another subsection within the same section
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subId}`);
    }
  };

  return {
    subsectionData,
    sectionTitle,
    isCompleted,
    siblingSubsections,
    parentSectionNumber,
    markAsComplete,
    navigateToSubsection,
  };
}
