
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SubsectionData = {
  id: string;
  title: string;
};

type SubsectionsNavigationProps = {
  subsections: SubsectionData[];
  currentSubsectionId: string;
  navigateToSubsection: (subsectionId: string) => void;
};

const SubsectionsNavigation = ({ 
  subsections, 
  currentSubsectionId,
  navigateToSubsection 
}: SubsectionsNavigationProps) => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  
  console.log("SubsectionsNavigation params:", { courseSlug, unitSlug, sectionId, currentSubsectionId });
  console.log("Available subsections:", subsections.map(s => s.id));
  
  // Find current subsection index
  const currentIndex = subsections.findIndex(sub => sub.id === currentSubsectionId);
  console.log("Current subsection index:", currentIndex);
  
  const prevSubsection = currentIndex > 0 ? subsections[currentIndex - 1] : null;
  const nextSubsection = currentIndex < subsections.length - 1 ? subsections[currentIndex + 1] : null;
  
  // Determine the "All Subsections" link based on the unit type
  const isElectricalTheoryUnit = unitSlug?.includes('elec2-01') || unitSlug?.includes('elec2-04');
  const allSubsectionsLink = isElectricalTheoryUnit
    ? `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}`
    : `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/installation-method/${sectionId}`;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
      <div className="w-full sm:w-1/3">
        {prevSubsection && (
          <Button 
            variant="outline" 
            className="w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10"
            onClick={() => navigateToSubsection(prevSubsection.id)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous: {prevSubsection.title}
          </Button>
        )}
      </div>
      
      <div className="w-full sm:w-1/3 text-center">
        <Button 
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          asChild
        >
          <Link to={allSubsectionsLink}>All Subsections</Link>
        </Button>
      </div>
      
      <div className="w-full sm:w-1/3">
        {nextSubsection && (
          <Button 
            variant="outline" 
            className="w-full justify-end border-elec-yellow/30 hover:bg-elec-yellow/10"
            onClick={() => navigateToSubsection(nextSubsection.id)}
          >
            Next: {nextSubsection.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubsectionsNavigation;
