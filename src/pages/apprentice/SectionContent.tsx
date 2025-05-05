
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
import { ArrowLeft, BookOpen } from "lucide-react";
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

  const navigateToSubsection = (subsection: any) => {
    if (courseSlug && unitSlug && sectionData) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${subsection.id}`);
    }
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
      
      {/* Main section header with number in circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center flex-col">
          <div className="flex justify-center items-center w-20 h-20 bg-elec-yellow rounded-full mb-4">
            <span className="text-3xl font-bold text-elec-dark">{sectionData.sectionNumber}</span>
          </div>
          <h1 className="text-3xl font-bold text-center">{sectionData.title}</h1>
        </div>
      </div>
      
      {/* Subsections list */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {sectionData.content.subsections.map((subsection) => (
          <div 
            key={subsection.id}
            className="border border-elec-yellow/20 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-all group"
            onClick={() => navigateToSubsection(subsection)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-elec-yellow">{subsection.id}</span>
              <h3 className="text-xl font-semibold">{subsection.title}</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-elec-yellow hover:bg-elec-yellow/10"
              onClick={(e) => {
                e.stopPropagation();
                toggleSection(subsection.id);
              }}
            >
              <BookOpen className="h-6 w-6" />
            </Button>
          </div>
        ))}
      </div>
      
      {/* Expanded section content */}
      {expandedSection && (
        <div className="mt-6 bg-elec-gray border border-elec-yellow/20 rounded-lg p-6 animate-fade-in">
          {sectionData.content.subsections
            .filter(subsection => subsection.id === expandedSection)
            .map(subsection => (
              <div key={subsection.id}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-elec-yellow text-xl font-bold">{subsection.id}</span>
                  <h2 className="text-2xl font-bold">{subsection.title}</h2>
                </div>
                <CourseContentSection
                  title={subsection.title}
                  description={subsection.content}
                  keyPoints={subsection.keyPoints}
                  icon={sectionData.content.icon}
                  isMainSection={false}
                  subsectionId={subsection.id}
                />
                <div className="mt-4 pt-4 border-t border-elec-yellow/20 text-right">
                  <Button 
                    variant="study" 
                    className="hover:bg-elec-yellow hover:text-elec-dark"
                    onClick={() => navigateToSubsection(subsection)}
                  >
                    Go To Full Content
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SectionContent;
