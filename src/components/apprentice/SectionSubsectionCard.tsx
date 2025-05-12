
import React, { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import type { Subsection } from "@/data/healthAndSafety/types";

interface SectionSubsectionCardProps {
  subsection: Subsection;
  navigateToSubsection: (subsection: Subsection | string) => void;
  collapsible?: boolean;
}

const SectionSubsectionCard = ({ 
  subsection,
  navigateToSubsection,
  collapsible = false
}: SectionSubsectionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle view content click
  const handleViewContent = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToSubsection(subsection);
  };
  
  // Regular non-collapsible card
  if (!collapsible) {
    return (
      <div 
        key={subsection.id}
        className="bg-[#1a1a1a] border border-elec-yellow/30 rounded-lg p-5 shadow-md hover:bg-[#1a1a1a]/80 transition-colors cursor-pointer"
        onClick={handleViewContent}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold text-elec-yellow">{subsection.id}</span>
          <h3 className="text-lg font-semibold">{subsection.title}</h3>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-base text-elec-light/90">{subsection.content}</p>
        </div>
        
        {/* Show key points if available */}
        {subsection.keyPoints && subsection.keyPoints.length > 0 && (
          <div className="mt-4 pt-3 border-t border-elec-yellow/20">
            <h4 className="text-base font-semibold text-elec-yellow mb-2">Key Points</h4>
            <ul className="list-disc pl-5 space-y-2 text-base text-elec-light/90">
              {subsection.keyPoints.map((point, index) => (
                <li key={index} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Button to view detailed content */}
        <div className="mt-4 pt-3 border-t border-elec-yellow/20 text-right">
          <Button 
            variant="study" 
            className="hover:bg-elec-yellow hover:text-elec-dark text-base px-4 py-2 h-auto"
            onClick={handleViewContent}
          >
            View Full Content
            <BookOpen className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }
  
  // Collapsible card for mobile
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-[#1a1a1a] border border-elec-yellow/30 rounded-lg shadow-md"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-elec-yellow">{subsection.id}</span>
          <h3 className="text-lg font-semibold">{subsection.title}</h3>
        </div>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-elec-yellow" /> : 
          <ChevronDown className="h-5 w-5 text-elec-yellow" />
        }
      </CollapsibleTrigger>
      
      <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20">
        <div className="prose prose-invert max-w-none mb-4">
          <p className="text-base text-elec-light/90">{subsection.content}</p>
        </div>
        
        {/* Show key points if available */}
        {subsection.keyPoints && subsection.keyPoints.length > 0 && (
          <div className="mt-4 pt-3 border-t border-elec-yellow/20">
            <h4 className="text-base font-semibold text-elec-yellow mb-2">Key Points</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
              {subsection.keyPoints.map((point, index) => (
                <li key={index} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Button to view detailed content */}
        <div className="mt-4 pt-3 text-right">
          <Button 
            variant="study" 
            className="hover:bg-elec-yellow hover:text-elec-dark text-base px-4 py-2 h-auto"
            onClick={() => navigateToSubsection(subsection)}
          >
            View Full Content
            <BookOpen className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SectionSubsectionCard;
