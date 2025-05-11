
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import SectionSubsectionCard from "@/components/apprentice/SectionSubsectionCard";
import type { SectionData, Subsection } from "@/data/healthAndSafety/types";

interface SectionDisplayProps {
  sectionData: SectionData;
  effectiveCourseSlug: string;
  effectiveUnitSlug: string;
  sectionId?: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const SectionDisplay = ({ 
  sectionData, 
  effectiveCourseSlug,
  effectiveUnitSlug,
  sectionId,
  isCompleted, 
  markAsComplete 
}: SectionDisplayProps) => {
  const navigate = useNavigate();
  
  // Extract subsections from the section data
  const subsections = sectionData.content && 
                     typeof sectionData.content === 'object' && 
                     'subsections' in sectionData.content ? 
                     sectionData.content.subsections : 
                     sectionData.subsections || [];
  
  const navigateToSubsection = (subsection: Subsection | string) => {
    let subsectionId;
    if (typeof subsection === 'string') {
      subsectionId = subsection;
    } else {
      subsectionId = subsection.id;
    }
    
    navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}/section/${sectionId}/subsection/${subsectionId}`);
  };

  return (
    <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow flex items-center justify-center">
            <span className="text-elec-dark font-bold text-xl">{sectionData.sectionNumber}</span>
          </div>
          <h1 className="text-2xl font-semibold">{sectionData.title}</h1>
        </div>
        
        {isCompleted && (
          <div className="flex items-center text-green-500 gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <p className="text-muted-foreground">
          {sectionData.description}
        </p>
      </div>
      
      {/* Display subsections */}
      <div className="space-y-6 mb-8">
        {subsections.map(subsection => (
          <SectionSubsectionCard 
            key={subsection.id}
            subsection={subsection}
            navigateToSubsection={navigateToSubsection}
          />
        ))}
      </div>
      
      {/* Completion button */}
      <div className="flex justify-between items-center pt-4 border-t border-elec-yellow/20">
        <Button
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={() => navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`)}
        >
          Back to Unit
        </Button>
        
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
        >
          {isCompleted ? 'Section Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SectionDisplay;
