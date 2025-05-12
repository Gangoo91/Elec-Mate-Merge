
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
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
  console.log("ElectricalTheorySection - Rendering section:", sectionId);
  console.log("ElectricalTheorySection - Section data:", sectionData);
  
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
        
        {/* Subsection Grid - Similar to Unit 1 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sectionData.content.subsections.map((subsection) => (
            <Card 
              key={subsection.id}
              className="border border-elec-yellow/20 bg-elec-dark/80 hover:bg-elec-dark/60 cursor-pointer transition-colors"
              onClick={() => navigateToSubsection(subsection.id)}
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
