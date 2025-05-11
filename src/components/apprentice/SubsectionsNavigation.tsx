
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Subsection } from "@/data/healthAndSafety/types";

interface SubsectionsNavigationProps {
  currentSubsectionId: string;
  subsections: Subsection[];
  navigateToSubsection: (subsection: Subsection | string) => void;
  parentSectionNumber: string;
}

const SubsectionsNavigation = ({
  currentSubsectionId,
  subsections,
  navigateToSubsection,
  parentSectionNumber
}: SubsectionsNavigationProps) => {
  if (!subsections || subsections.length === 0) {
    return null;
  }
  
  // Find current subsection index
  const currentIndex = subsections.findIndex(sub => sub.id === currentSubsectionId);
  
  // Get previous and next subsections
  const previousSubsection = currentIndex > 0 ? subsections[currentIndex - 1] : null;
  const nextSubsection = currentIndex < subsections.length - 1 ? subsections[currentIndex + 1] : null;
  
  return (
    <div className="border-t border-elec-yellow/20 py-3 px-4 md:px-6 flex justify-between items-center mt-8">
      <Button
        variant="outline"
        className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        onClick={() => previousSubsection && navigateToSubsection(previousSubsection)}
        disabled={!previousSubsection}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <div className="text-sm text-elec-yellow/70">
        Section {parentSectionNumber}: {currentIndex + 1} of {subsections.length}
      </div>
      
      <Button
        variant="outline"
        className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        onClick={() => nextSubsection && navigateToSubsection(nextSubsection)}
        disabled={!nextSubsection}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default SubsectionsNavigation;
