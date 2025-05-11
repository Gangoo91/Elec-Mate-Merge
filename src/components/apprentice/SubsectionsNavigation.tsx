
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Subsection } from "@/data/courseTypes";

interface SubsectionsNavigationProps {
  currentSubsectionId: string;
  subsections: Subsection[];
  navigateToSubsection: (subsection: Subsection) => void;
}

const SubsectionsNavigation = ({ 
  currentSubsectionId, 
  subsections,
  navigateToSubsection 
}: SubsectionsNavigationProps) => {
  if (!subsections || subsections.length <= 1) return null;
  
  const currentIndex = subsections.findIndex(sub => sub.id === currentSubsectionId);
  if (currentIndex === -1) return null;
  
  const prevSubsection = currentIndex > 0 ? subsections[currentIndex - 1] : null;
  const nextSubsection = currentIndex < subsections.length - 1 ? subsections[currentIndex + 1] : null;
  
  return (
    <div className="flex justify-between items-center p-3 bg-elec-dark/80 border-t border-elec-yellow/20">
      <div>
        {prevSubsection && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-elec-yellow/30 hover:bg-elec-yellow/10"
            onClick={() => navigateToSubsection(prevSubsection)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="max-sm:hidden">Previous</span>
          </Button>
        )}
      </div>
      
      <div className="text-sm text-elec-yellow/70">
        {currentIndex + 1} of {subsections.length}
      </div>
      
      <div>
        {nextSubsection && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-elec-yellow/30 hover:bg-elec-yellow/10"
            onClick={() => navigateToSubsection(nextSubsection)}
          >
            <span className="max-sm:hidden">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubsectionsNavigation;
