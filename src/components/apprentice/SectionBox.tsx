
import React from "react";
import { BookOpen, CheckCircle } from "lucide-react";
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
      // Regular section page
      else {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/${sectionSlug}`);
      }
    }
  };

  return (
    <div 
      className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray relative cursor-pointer hover:bg-elec-yellow/5 transition-all"
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
              className="border-elec-yellow/40 bg-elec-gray hover:bg-elec-yellow hover:text-elec-dark"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent div's onClick
                handleSectionClick();
              }}
              title="View this section"
            >
              <BookOpen className="h-4 w-4" />
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
