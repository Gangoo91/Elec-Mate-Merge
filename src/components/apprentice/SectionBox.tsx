
import React from "react";
import { BookOpen, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionBoxProps {
  sectionNumber: string;
  title: string;
  isExpanded: boolean;
  onClick: () => void;
  content: React.ReactNode;
  isCompleted?: boolean;
}

const SectionBox = ({
  sectionNumber,
  title,
  isExpanded,
  onClick,
  content,
  isCompleted = false
}: SectionBoxProps) => {
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
              variant="outline" 
              size="sm" 
              className="border-elec-yellow/40 bg-elec-gray text-elec-yellow hover:text-elec-dark hover:bg-elec-yellow flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent div's onClick
                onClick();
              }}
            >
              <BookOpen className="h-4 w-4" />
              {isExpanded ? 'Close' : 'Study'}
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
      
      {/* Expandable content area - appears below the header when expanded */}
      {isExpanded && (
        <div className="p-4 bg-background/40 animate-fade-in">
          {content}
        </div>
      )}
    </div>
  );
};

export default SectionBox;
