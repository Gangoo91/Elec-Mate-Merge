
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Subsection } from "@/data/healthAndSafety/types";

interface SubsectionsNavigationProps {
  subsections: Subsection[];
  currentSubsectionId: string;
  navigateToSubsection: (subsectionId: string) => void;
}

const SubsectionsNavigation = ({ 
  subsections, 
  currentSubsectionId,
  navigateToSubsection 
}: SubsectionsNavigationProps) => {
  const otherSubsections = subsections.filter(sub => sub.id !== currentSubsectionId);
  
  if (otherSubsections.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Other Sections</h3>
      <div className="space-y-2">
        {otherSubsections.map((subsection) => (
          <div 
            key={subsection.id}
            className="border border-elec-yellow/20 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-all group bg-[#1a1a1a]"
            onClick={() => navigateToSubsection(subsection.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-elec-yellow font-semibold">{subsection.id}</span>
              <h3 className="font-medium">{subsection.title}</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-elec-yellow hover:bg-elec-yellow/10"
            >
              <BookOpen className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsectionsNavigation;
