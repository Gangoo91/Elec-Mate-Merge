
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { legislationSection } from '@/data/electricalTheory/section1-legislation';

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
  
  // Get section data based on section ID
  const sectionData = legislationSection;
  
  const navigateToSubsection = (subsectionId: string) => {
    navigate(`/apprentice/study/eal/level-2-diploma/unit/elec2-04/section/${sectionId}/subsection/${subsectionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
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
        
        <div className="mb-6">
          <p className="text-muted-foreground">
            {sectionData.description}
          </p>
        </div>
        
        {/* Subsection Grid - Use the exact same layout as shown in the image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sectionData.content.subsections.map((subsection) => (
            <Card 
              key={subsection.id}
              className="border border-elec-yellow/20 bg-elec-dark/80 hover:bg-elec-dark/60 cursor-pointer transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow">
                      {subsection.id.split('.')[1]}
                    </div>
                    <h3 className="text-lg font-medium">{subsection.title}</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-elec-yellow/30 hover:bg-elec-yellow hover:text-elec-dark"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSubsection(subsection.id);
                    }}
                  >
                    View
                  </Button>
                </div>
                
                {/* Show brief content description */}
                <p className="mt-2 text-sm text-muted-foreground">
                  {subsection.content.substring(0, 100)}...
                </p>
                
                {/* Show key points if available */}
                {subsection.keyPoints && subsection.keyPoints.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                    <h4 className="text-sm font-semibold text-elec-yellow mb-2">Key Points</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-elec-light/80">
                      {subsection.keyPoints.slice(0, 2).map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                      {subsection.keyPoints.length > 2 && <li>...</li>}
                    </ul>
                  </div>
                )}
                
                {/* View Full Content button */}
                <div className="mt-3 pt-3 border-t border-elec-yellow/20 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-elec-yellow hover:bg-elec-yellow/10"
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
        <div className="flex justify-between items-center pt-4 border-t border-elec-yellow/20">
          <Button
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            onClick={() => navigate(`/apprentice/study/eal/level-2-diploma/unit/elec2-04`)}
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
    </div>
  );
};

export default ElectricalTheorySection;
