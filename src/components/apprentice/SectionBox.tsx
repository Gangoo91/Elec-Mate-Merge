
import React from "react";
import { BookOpen, CheckCircle, Lightbulb, Info, Cable, Construction, CircleDashed, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SectionBoxProps {
  sectionNumber: string;
  title: string;
  isExpanded: boolean;
  onClick: () => void;
  content: React.ReactNode;
  isCompleted?: boolean;
  unitCode?: string;
  courseSlug?: string;
}

const SectionBox = ({
  sectionNumber,
  title,
  isExpanded,
  onClick,
  content,
  isCompleted = false,
  unitCode = "",
  courseSlug = ""
}: SectionBoxProps) => {
  const navigate = useNavigate();
  
  const handleSectionClick = () => {
    // Navigate based on the section and unit type
    if (courseSlug && unitCode) {
      // Use sectionNumber to create the slug
      const sectionSlug = sectionNumber.toLowerCase().replace(/\//g, "-");
      
      // If section is quiz, navigate to quiz page
      if (sectionNumber === "Q") {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/quiz`);
      } 
      // If it's installation methods unit (ELEC2/05A), navigate to installation method content
      else if (unitCode.toLowerCase().includes('05a')) {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/installation-method/${sectionNumber}`);
      }
      // If it's electrical theory unit (ELEC2/04), handle differently based on section number
      else if (unitCode.toLowerCase().includes('04')) {
        if (sectionNumber === "04") {
          // Main section - navigate to unit page
          navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}`);
        } else {
          // Subsection - navigate to section page
          navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/${sectionSlug}`);
        }
      }
      // Regular section page
      else {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/${sectionSlug}`);
      }
    }
  };

  // Function to render appropriate icon based on section type
  const renderSectionIcon = () => {
    // If it's the electrical theory unit and we have a subsection
    if (unitCode.toLowerCase().includes('04') && sectionNumber !== "04" && sectionNumber !== "Q") {
      switch(sectionNumber) {
        case "1": return <Info className="h-4 w-4" />; // Legislation and Regulations
        case "2": return <Info className="h-4 w-4" />; // Technical Information
        case "3": return <Cable className="h-4 w-4" />; // Wiring Systems
        case "4": return <Construction className="h-4 w-4" />; // Service Position Equipment
        case "5": return <Lightbulb className="h-4 w-4" />; // Lighting Circuits
        case "6": return <Cable className="h-4 w-4" />; // Ring and Radial Circuits
        case "7": return <Cable className="h-4 w-4" />; // Circuit Requirements - Changed from CircuitBoard
        case "8": return <ShieldAlert className="h-4 w-4" />; // Earthing and Bonding - Changed from Safety
        case "9": return <ShieldAlert className="h-4 w-4" />; // Overcurrent Protection - Changed from Safety
        case "10": return <Cable className="h-4 w-4" />; // Circuit Design - Changed from CircuitBoard
        default: return <BookOpen className="h-4 w-4" />;
      }
    }
    
    return <BookOpen className="h-4 w-4" />;
  };

  return (
    <div 
      className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-[#1a1a1a] relative cursor-pointer hover:bg-elec-yellow/5 transition-all"
      onClick={handleSectionClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg shrink-0">
              {sectionNumber}
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="study" 
              size="studyIcon" 
              className="border-elec-yellow/40 bg-[#1a1a1a] hover:bg-elec-yellow hover:text-elec-dark"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent div's onClick
                handleSectionClick();
              }}
              title="View this section"
            >
              {renderSectionIcon()}
            </Button>
          </div>
        </div>
        
        {isCompleted && (
          <div className="absolute right-2 top-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionBox;
