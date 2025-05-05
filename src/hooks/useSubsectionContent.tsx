
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Subsection } from "@/data/healthAndSafety/types";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
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
    console.log("useSubsectionContent params:", { courseSlug, unitSlug, sectionId, subsectionId });
    
    if (sectionId && subsectionId) {
      // Determine which unit we're working with
      const isHealthSafetyUnit = unitSlug?.includes('elec2-01');
      const isElectricalTheoryUnit = unitSlug?.includes('elec2-04');
      const isInstallationMethodsUnit = unitSlug?.includes('elec2-05a');
      
      let section;
      let foundSubsection;
      
      console.log("Unit types:", { isHealthSafetyUnit, isElectricalTheoryUnit, isInstallationMethodsUnit });
      
      // Find the section based on unit type
      if (isHealthSafetyUnit) {
        // For health and safety unit
        setParentSectionNumber(sectionId);
        
        // Find the section in the health and safety content
        section = healthAndSafetyContent.find(
          sec => sec.sectionNumber === sectionId
        );
        
        if (section) {
          setSectionTitle(section.title);
          console.log("Found section:", section.title);
          
          // Find the subsection
          foundSubsection = section.content.subsections.find(
            sub => sub.id === subsectionId
          );
          
          console.log("Found subsection:", foundSubsection?.title);
          
          // Store all sibling subsections for navigation
          setSiblingSubsections(section.content.subsections);
        }
      } else if (isElectricalTheoryUnit) {
        // For electrical theory unit
        setParentSectionNumber(sectionId);
        
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
        
        if (section) {
          setSectionTitle(section.title);
          console.log("Found section:", section.title);
          
          // Find the subsection
          foundSubsection = section.content.subsections.find(
            sub => sub.id === subsectionId
          );
          
          console.log("Found subsection:", foundSubsection?.title);
          
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
      } else {
        console.error("Subsection not found:", subsectionId);
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
      console.log("Navigating to subsection:", subId);
      
      // Based on unit type, navigate to the appropriate path
      const isInstallationMethodsUnit = unitSlug?.includes('elec2-05a');
      
      if (isInstallationMethodsUnit) {
        // For installation methods unit
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/installation-method/${sectionId}/subsection/${subId}`);
      } else {
        // For other units (health & safety or electrical theory)
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}/subsection/${subId}`);
      }
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
