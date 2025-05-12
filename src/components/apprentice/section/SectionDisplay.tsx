
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Book, ChevronRight } from "lucide-react";
import SectionSubsectionCard from "@/components/apprentice/SectionSubsectionCard";
import type { SectionData, Subsection } from "@/data/healthAndSafety/types";
import ElectricalTheorySection from "./ElectricalTheorySection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  
  // Check if we're in the electrical theory unit
  const isElectricalTheory = effectiveUnitSlug === 'elec2-04';
  
  console.log("SectionDisplay - Is electrical theory:", isElectricalTheory);
  console.log("SectionDisplay - Section data:", sectionData);
  
  // For electrical theory sections, use specialized components
  if (isElectricalTheory) {
    return (
      <ElectricalTheorySection 
        sectionId={sectionId || ""} 
        isCompleted={isCompleted} 
        markAsComplete={markAsComplete} 
      />
    );
  }
  
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

  // Check which subsections have been completed
  const isSubsectionCompleted = (subsectionId: string) => {
    const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
    return localStorage.getItem(storageKey) === 'true';
  };

  return (
    <div className="bg-gradient-to-b from-elec-dark to-elec-dark/90 border border-elec-yellow/20 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-elec-yellow/10 p-6 border-b border-elec-yellow/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-2.5 bg-gradient-to-r from-elec-yellow to-amber-500 rounded-md shadow">
              <Book className="h-5 w-5 text-elec-dark" />
            </div>
            <h1 className="text-2xl font-bold text-white">{sectionData.title}</h1>
          </div>
          
          {isCompleted && (
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Completed</span>
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground ml-11">
          {sectionData.description}
        </p>
      </div>
      
      {/* Display subsections */}
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-elec-yellow mb-4">Section Content</h2>
        
        {subsections.map((subsection, index) => (
          <Card 
            key={subsection.id}
            className={`border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all cursor-pointer group ${
              isSubsectionCompleted(subsection.id) ? 'bg-gradient-to-br from-elec-dark to-green-950/30' : 'bg-elec-dark/50'
            }`}
            onClick={() => navigateToSubsection(subsection)}
          >
            <CardHeader className="pb-2 flex flex-row items-start">
              <div className="bg-elec-yellow/10 text-elec-yellow rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <CardTitle className="text-lg group-hover:text-elec-yellow transition-colors">
                    {subsection.title}
                  </CardTitle>
                  {isSubsectionCompleted(subsection.id) && (
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  )}
                </div>
                <CardDescription className="mt-1 line-clamp-2 text-muted-foreground">
                  {subsection.content}
                </CardDescription>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
            </CardHeader>
          </Card>
        ))}
      </div>
      
      {/* Completion button */}
      <div className="flex justify-between items-center p-6 pt-4 border-t border-elec-yellow/20 bg-elec-dark/40">
        <Button
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10 flex items-center gap-2"
          onClick={() => navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Unit
        </Button>
        
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className={`${
            isCompleted 
              ? 'bg-green-600/20 border-green-500/50 text-green-400' 
              : 'bg-elec-yellow hover:bg-amber-500 text-elec-dark'
          } flex items-center gap-2`}
        >
          {isCompleted ? 'Section Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SectionDisplay;
