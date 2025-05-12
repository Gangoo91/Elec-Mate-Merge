
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { legislationSection } from '@/data/electricalTheory/section1-legislation';
import { useIsMobile } from '@/hooks/use-mobile';

interface ElectricalTheorySectionProps {
  sectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const ElectricalTheorySection = ({ 
  sectionId, 
  isCompleted, 
  markAsComplete 
}: ElectricalTheorySectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Get section data based on section ID
  const sectionData = legislationSection;
  
  const navigateToSubsection = (subsectionId: string) => {
    navigate(`/apprentice/study/eal/level-2-diploma/unit/elec2-04/section/${sectionId}/subsection/${subsectionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-elec-gray border border-elec-yellow/30 rounded-lg p-5 md:p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 md:p-3 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-lg md:text-xl">{sectionData.sectionNumber}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">{sectionData.title}</h1>
          </div>
          
          {isCompleted && (
            <div className="flex items-center text-green-500 gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-base font-medium">Completed</span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <p className="text-base md:text-lg text-elec-light/90">
            {sectionData.description}
          </p>
        </div>
        
        {/* Subsection Grid - Balanced sizing for better mobile appearance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {sectionData.content.subsections.map((subsection) => (
            <Card 
              key={subsection.id}
              className="border border-elec-yellow/30 bg-elec-dark/80 hover:bg-elec-dark/60 cursor-pointer transition-colors shadow-lg"
              onClick={() => navigateToSubsection(subsection.id)}
            >
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-base font-semibold">
                      {subsection.id.split('.')[1]}
                    </div>
                    <h3 className="text-lg font-semibold text-elec-yellow">{subsection.title}</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-elec-yellow/30 hover:bg-elec-yellow hover:text-elec-dark text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSubsection(subsection.id);
                    }}
                  >
                    View
                  </Button>
                </div>
                
                {/* Show brief content description - Balanced font size */}
                <p className="mt-2 text-base text-elec-light/90 line-clamp-3">
                  {subsection.content.substring(0, isMobile ? 80 : 120)}...
                </p>
                
                {/* Show key points if available */}
                {subsection.keyPoints && subsection.keyPoints.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-elec-yellow/20">
                    <h4 className="text-base font-semibold text-elec-yellow mb-2">Key Points</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-elec-light/90">
                      {subsection.keyPoints.slice(0, 2).map((point, index) => (
                        <li key={index} className="leading-relaxed">{point}</li>
                      ))}
                      {subsection.keyPoints.length > 2 && <li className="text-elec-yellow">...</li>}
                    </ul>
                  </div>
                )}
                
                {/* View Full Content button */}
                <div className="mt-3 pt-2 border-t border-elec-yellow/20 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-elec-yellow hover:bg-elec-yellow/10 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSubsection(subsection.id);
                    }}
                  >
                    View Full Content
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Completion button */}
        <div className="flex justify-between items-center pt-4 border-t border-elec-yellow/30">
          <Button
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-base"
            onClick={() => navigate(`/apprentice/study/eal/level-2-diploma/unit/elec2-04`)}
          >
            Back to Unit
          </Button>
          
          <Button
            onClick={markAsComplete}
            disabled={isCompleted}
            className={`text-base px-5 py-2 h-auto ${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          >
            {isCompleted ? 'Section Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTheorySection;
