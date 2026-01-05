
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { TestingStep } from './TestingProcedureData';

interface InteractiveTestStepProps {
  step: TestingStep;
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onActivate: () => void;
}

const InteractiveTestStep = ({ 
  step, 
  stepNumber, 
  isActive, 
  isCompleted, 
  onComplete, 
  onActivate 
}: InteractiveTestStepProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [userNotes, setUserNotes] = useState('');

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="h-5 w-5 text-green-400" />;
    if (isActive) return <Play className="h-5 w-5 text-elec-yellow" />;
    return <Pause className="h-5 w-5 text-white/80" />;
  };

  const getCardStyle = () => {
    if (isCompleted) return 'border-green-500/30 bg-green-500/5';
    if (isActive) return 'border-elec-yellow/50 bg-elec-yellow/5';
    return 'border-border bg-card';
  };

  return (
    <Card className={`${getCardStyle()} transition-all duration-300`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">
              {stepNumber}
            </div>
            <div>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                {step.title}
                {getStatusIcon()}
              </CardTitle>
              <p className="text-sm text-white mt-1">{step.description}</p>
            </div>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400">
            {step.regulation}
          </Badge>
        </div>

        {step.safetyNote && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-300">{step.safetyNote}</p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Required Equipment</h4>
            <div className="flex flex-wrap gap-2">
              {step.equipment.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Expected Result</h4>
            <p className="text-sm text-green-400">{step.expectedResult}</p>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div>
              <h4 className="font-medium text-foreground mb-2">Common Issues</h4>
              <ul className="space-y-1">
                {step.commonIssues.map((issue, index) => (
                  <li key={index} className="text-sm text-yellow-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {step.isInteractive && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Notes</h4>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Add your notes for this step..."
                  className="w-full p-2 bg-muted border border-border rounded text-foreground text-sm"
                  rows={3}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-4">
          {!isActive && !isCompleted && (
            <Button
              onClick={onActivate}
              size="sm"
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Step
            </Button>
          )}
          
          {isActive && !isCompleted && (
            <Button
              onClick={onComplete}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-foreground"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Step
            </Button>
          )}

          <Button
            onClick={() => setShowDetails(!showDetails)}
            size="sm"
            variant="outline"
            className="border-border"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </Button>

          {isCompleted && (
            <Button
              onClick={() => onComplete()}
              size="sm"
              variant="outline"
              className="border-green-500 text-green-400"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveTestStep;
