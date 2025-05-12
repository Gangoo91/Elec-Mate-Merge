
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, CheckCircle, FileText, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { legislationSection } from "@/data/electricalTheory/section1-legislation";
import SectionHeader from "@/components/apprentice/SectionHeader";
import { Badge } from "@/components/ui/badge";

interface ElectricalTheorySectionProps {
  sectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const ElectricalTheorySection: React.FC<ElectricalTheorySectionProps> = ({
  sectionId,
  isCompleted,
  markAsComplete
}) => {
  const navigate = useNavigate();
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);

  const handleNavigateToSubsection = (subsectionId: string) => {
    // Get base path from current URL
    const basePath = window.location.pathname.split('/section')[0];
    navigate(`${basePath}/section/1/subsection/${subsectionId}`);
  };

  // Check which subsections have been completed
  const getCompletionStatus = (subsectionId: string) => {
    const storageKey = `completion_elec_1_${subsectionId}`;
    return localStorage.getItem(storageKey) === 'true';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Introduction */}
      <div className="bg-gradient-to-r from-elec-dark to-elec-dark/80 border border-elec-yellow/30 rounded-lg p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <FileText className="w-full h-full text-elec-yellow" />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-elec-yellow rounded-full p-2 flex items-center justify-center">
            <Book className="h-5 w-5 text-elec-dark" />
          </div>
          <h1 className="text-2xl font-bold text-elec-yellow">
            {legislationSection.title}
          </h1>
          
          {isCompleted && (
            <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-400 border-green-500/30">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground ml-12 mb-6">
          {legislationSection.description}
        </p>
        
        <div className="ml-12 pl-4 border-l-2 border-elec-yellow/30 text-sm text-muted-foreground">
          <p>{legislationSection.content.introduction}</p>
        </div>
      </div>

      {/* Subsections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {legislationSection.content.subsections.map((subsection) => {
          const isSubsectionCompleted = getCompletionStatus(subsection.id);
          
          return (
            <Card 
              key={subsection.id}
              className={`border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all cursor-pointer group ${
                isSubsectionCompleted ? 'bg-gradient-to-br from-elec-dark to-green-950/30' : 'bg-elec-dark/90'
              }`}
              onClick={() => handleNavigateToSubsection(subsection.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                    {subsection.id}
                  </Badge>
                  {isSubsectionCompleted && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <CardTitle className="text-lg mt-2 group-hover:text-elec-yellow transition-colors">
                  {subsection.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                  {subsection.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {subsection.keyPoints.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="truncate">{point}</li>
                  ))}
                  {subsection.keyPoints.length > 2 && (
                    <li className="text-elec-yellow/70">+ {subsection.keyPoints.length - 2} more topics</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Button */}
      <div className="flex items-center justify-between pt-6 border-t border-elec-yellow/20 mt-8">
        <Button
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={() => {
            // Navigate back to unit
            const pathParts = window.location.pathname.split('/');
            const unitPath = pathParts.slice(0, pathParts.indexOf('section')).join('/');
            navigate(unitPath);
          }}
        >
          Back to Unit
        </Button>
        
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className={`${
            isCompleted 
              ? 'bg-green-600/20 border-green-500/50 text-green-400' 
              : 'bg-elec-yellow/10 border border-elec-yellow/30 hover:bg-elec-yellow hover:text-elec-dark'
          } flex items-center gap-2`}
        >
          {isCompleted ? 'Section Completed' : 'Mark Section as Complete'}
          {isCompleted && <CheckCircle className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ElectricalTheorySection;
