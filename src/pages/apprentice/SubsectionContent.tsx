import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, CalculatorIcon, BookOpen } from "lucide-react";
import { installationMethodsContent } from "@/data/installationMethods/index";
import type { Subsection } from "@/data/healthAndSafety/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SubsectionLearningContent from "@/components/apprentice/SubsectionLearningContent";
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

const SubsectionContent = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
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

  const handleBackClick = () => {
    if (courseSlug && sectionId) {
      // Navigate back to section
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}`);
    } else if (courseSlug) {
      // Fallback to course home
      navigate(`/apprentice/study/eal/${courseSlug}`);
    } else {
      navigate(-1);
    }
  };
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
    }
  };
  
  const navigateToSubsection = (subId: string) => {
    if (courseSlug && unitSlug && sectionId) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${subId}`);
    }
  };

  if (!subsectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in bg-[#121212]">
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Section
        </Button>
      </div>
      
      {/* Main section header with number in circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center flex-col">
          <div className="flex justify-center items-center w-20 h-20 bg-elec-yellow rounded-full mb-4">
            <span className="text-3xl font-bold text-elec-dark">{parentSectionNumber}</span>
          </div>
          <h1 className="text-3xl font-bold text-center">{sectionTitle}</h1>
        </div>
      </div>
      
      {/* Selected subsection content - Always displayed directly without needing to click */}
      <div className="bg-[#1a1a1a] border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-elec-yellow text-xl font-bold">{subsectionData.id}</span>
            <h2 className="text-2xl font-bold">{subsectionData.title}</h2>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-elec-light/90 leading-relaxed prose prose-invert max-w-none">
            <p className="mb-4">{subsectionData.content}</p>
            
            {/* Tools link section - Only show for subsection 2.1 */}
            {subsectionId === "2.1" && (
              <div className="my-6 p-4 bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center">
                  <CalculatorIcon className="mr-2 h-5 w-5" />
                  Useful Tools
                </h3>
                <p className="mb-3">
                  Use our electrical calculators to help you determine the correct cable sizes and voltage drops for your installations.
                </p>
                <Link to="/electrician-tools">
                  <Button variant="study" className="bg-elec-yellow/20 border border-elec-yellow/60 hover:bg-elec-yellow hover:text-elec-dark">
                    Open Electrical Calculators
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Learning content component - Always displayed */}
            <div className="mt-8">
              <SubsectionLearningContent 
                subsectionId={subsectionData.id}
                isCompleted={isCompleted}
                markAsComplete={markAsComplete}
              />
            </div>
          </div>
          
          {subsectionData.keyPoints && subsectionData.keyPoints.length > 0 && (
            <Accordion type="single" collapsible className="border-t border-elec-yellow/20 pt-4">
              <AccordionItem value="key-points" className="border-b-0">
                <AccordionTrigger className="py-3 text-elec-yellow hover:no-underline">
                  Key Learning Points
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-elec-light/80">
                    {subsectionData.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          
          {/* Mark as Complete button */}
          <div className="flex justify-end pt-4 border-t border-elec-yellow/20">
            <Button 
              variant="study"
              className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
              onClick={markAsComplete}
              disabled={isCompleted}
            >
              {isCompleted ? 'Completed' : 'Mark as Complete'}
              {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Other subsections navigation - list of links below the main content */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Other Sections</h3>
        <div className="space-y-2">
          {siblingSubsections
            .filter(sub => sub.id !== subsectionId) // Only show other subsections
            .map((subsection) => (
              <div 
                key={subsection.id}
                className="border border-elec-yellow/20 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-all group bg-[#1a1a1a]"
                onClick={() => navigateToSubsection(subsection.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-elec-yellow font-semibold">{subsection.id}</span>
                  <h3 className="font-medium">{subsection.title}</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubsectionContent;
