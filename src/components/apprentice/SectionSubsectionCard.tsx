
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Subsection } from "@/data/healthAndSafety/types";

interface SectionSubsectionCardProps {
  subsection: Subsection;
  navigateToSubsection: (subsection: Subsection) => void;
}

const SectionSubsectionCard = ({ 
  subsection,
  navigateToSubsection
}: SectionSubsectionCardProps) => {
  return (
    <div 
      key={subsection.id}
      className="bg-[#1a1a1a] border border-elec-yellow/20 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl font-semibold text-elec-yellow">{subsection.id}</span>
        <h3 className="text-xl font-semibold">{subsection.title}</h3>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p>{subsection.content}</p>
      </div>
      
      {/* Show key points if available */}
      {subsection.keyPoints && subsection.keyPoints.length > 0 && (
        <div className="mt-4 pt-4 border-t border-elec-yellow/20">
          <h4 className="text-lg font-semibold text-elec-yellow mb-2">Key Points</h4>
          <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
            {subsection.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Button to view detailed content */}
      <div className="mt-4 pt-4 border-t border-elec-yellow/20 text-right">
        <Button 
          variant="study" 
          className="hover:bg-elec-yellow hover:text-elec-dark"
          onClick={() => navigateToSubsection(subsection)}
        >
          View Full Content
          <BookOpen className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SectionSubsectionCard;
