
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { TestingProcedure } from './TestingProcedureData';

interface TestingProcedureCardProps {
  procedure: TestingProcedure;
  onStart: (procedure: TestingProcedure) => void;
  onPreview: (procedure: TestingProcedure) => void;
}

const TestingProcedureCard = ({ procedure, onStart, onPreview }: TestingProcedureCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-400/20';
      case 'Essential': return 'bg-orange-500/10 text-orange-400 border-orange-400/20';
      case 'Required': return 'bg-blue-500/10 text-blue-400 border-blue-400/20';
      default: return 'bg-muted/50 text-neutral-400 border-border';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'continuity': return <Zap className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'insulation': return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'impedance': return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return <Play className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getBorderAccent = (difficulty: string) => {
    switch (difficulty) {
      case 'Critical': return 'border-l-red-500';
      case 'Essential': return 'border-l-orange-500';
      case 'Required': return 'border-l-blue-500';
      default: return 'border-l-neutral-600';
    }
  };

  return (
    <Card className={`bg-card/50 border-border border-l-4 ${getBorderAccent(procedure.difficulty)} hover:bg-card hover:border-border transition-all touch-manipulation active:scale-[0.98]`}>
      <CardHeader className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getCategoryIcon(procedure.category)}
            <CardTitle className="text-foreground text-base sm:text-lg md:text-xl truncate">
              {procedure.title}
            </CardTitle>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Badge className={`text-xs ${getDifficultyColor(procedure.difficulty)}`}>
              {procedure.difficulty}
            </Badge>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400/20 text-xs w-fit mb-2">
          {procedure.regulation}
        </Badge>
        <CardDescription className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
          {procedure.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-5 md:p-6 pt-0">
        {/* Key Equipment */}
        <div>
          <p className="text-xs text-neutral-400 mb-2 font-medium">Key Equipment:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {procedure.equipment.slice(0, 3).map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-muted/50 border-border">
                {item}
              </Badge>
            ))}
            {procedure.equipment.length > 3 && (
              <Badge variant="outline" className="text-xs bg-muted/50 border-border">
                +{procedure.equipment.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Real World Examples Preview */}
        {procedure.realWorldExamples.length > 0 && (
          <div className="p-3 bg-muted/50 rounded-lg text-xs sm:text-sm">
            <p className="text-neutral-400 mb-1.5 font-medium">Example scenario:</p>
            <p className="text-foreground leading-relaxed line-clamp-2">{procedure.realWorldExamples[0].scenario}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button 
            className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation text-sm sm:text-base"
            onClick={() => onStart(procedure)}
          >
            <Play className="h-4 w-4 mr-2" />
            Start Interactive Guide
          </Button>
          <Button 
            variant="outline" 
            className="sm:w-auto border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation text-sm sm:text-base"
            onClick={() => onPreview(procedure)}
          >
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestingProcedureCard;
