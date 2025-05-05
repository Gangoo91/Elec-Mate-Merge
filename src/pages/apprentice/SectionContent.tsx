
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { SectionData } from "@/data/healthAndSafety/types";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
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
    }
  }, [sectionId, unitSlug]);

  const handleBackClick = () => {
    if (courseSlug && unitSlug) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    }
  };

  if (!sectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading section content...</p>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Unit
        </Button>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            {sectionData.sectionNumber}
          </span>
          <h2 className="text-2xl font-bold">{sectionData.title}</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {sectionData.content.subsections.map((subsection) => (
            <Card 
              key={subsection.id}
              className="p-4 bg-elec-dark border border-elec-yellow/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-elec-yellow font-semibold">{subsection.id}</span>
                  <h3 className="font-semibold">{subsection.title}</h3>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-elec-yellow hover:bg-elec-yellow/10"
                        onClick={() => toggleSection(subsection.id)}
                      >
                        <Book className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {expandedSection === subsection.id && (
                <div className="mt-4 pt-4 border-t border-elec-yellow/20 animate-fade-in">
                  <CourseContentSection
                    title={subsection.title}
                    description={subsection.content}
                    keyPoints={subsection.keyPoints}
                    icon={sectionData.content.icon}
                    isMainSection={sectionData.content.isMainSection || false}
                    subsectionId={subsection.id}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
