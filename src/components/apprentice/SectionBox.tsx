
import React from "react";
import { BookOpen, ChevronDown, CheckCircle } from "lucide-react";
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
  
  const handleStudyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent div's onClick
    
    // If we have both course and unit info, navigate to the section page
    if (courseSlug && unitCode) {
      const sectionSlug = sectionNumber.toLowerCase().replace(/\//g, "-");
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/${sectionSlug}`);
    } else {
      // Fall back to original behavior if navigation data is missing
      onClick();
    }
  };

  return (
    <div className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray relative">
      <div
        className={`
          p-4 cursor-pointer transition-all
          ${isExpanded 
            ? 'border-b border-elec-yellow/30 bg-elec-yellow/10' 
            : 'hover:bg-elec-yellow/5'}
        `}
        onClick={onClick}
      >
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
              onClick={handleStudyClick}
              title="Study this section"
            >
              <BookOpen className="h-4 w-4" />
            </Button>
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 text-elec-yellow/80 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
        
        {isCompleted && (
          <div className="absolute right-2 top-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      
      {/* Expandable content area - now only used as a fallback */}
      {isExpanded && (
        <div className="p-4 bg-background/40 animate-fade-in">
          {content}
        </div>
      )}
    </div>
  );
};

export default SectionBox;
