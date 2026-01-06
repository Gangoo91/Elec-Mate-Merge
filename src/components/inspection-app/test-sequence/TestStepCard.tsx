
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, AlertTriangle, Target } from 'lucide-react';

interface TestStepCardProps {
  step: {
    step: number;
    title: string;
    regulation: string;
    description: string;
    method: string;
    acceptance: string;
    safety: string;
    icon: string;
    priority: string;
    testType: string;
  };
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const TestStepCard = ({ step, onPrevious, onNext, canGoPrevious, canGoNext }: TestStepCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      default: return 'bg-white/15';
    }
  };

  const getTestTypeColor = (testType: string) => {
    switch (testType) {
      case 'isolation': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'dead': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'live': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  return (
    <Card className={`border-2 ${
      step.priority === 'CRITICAL' 
        ? 'border-red-500/50 bg-red-500/5' 
        : 'border-border'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{step.icon}</div>
            <div>
              <CardTitle className="text-foreground text-xl">
                Step {step.step + 1}: {step.title}
              </CardTitle>
              <CardDescription className="text-elec-yellow font-semibold">
                BS7671 Regulation {step.regulation}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className={`${getPriorityColor(step.priority)} text-foreground font-bold`}>
              {step.priority}
            </Badge>
            <Badge className={getTestTypeColor(step.testType)}>
              {step.testType.toUpperCase()} TEST
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earth to Line Priority Warning */}
        {step.step === 6 && (
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-orange-400" />
              <span className="font-semibold text-orange-400">Priority Testing Method</span>
            </div>
            <p className="text-white/80 text-sm">
              <strong>Always test EARTH TO LINE first</strong> when measuring loop impedance. This provides maximum safety by ensuring the earth path is tested before line to neutral measurements.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/30 min-h-[6rem]">
              <h4 className="font-semibold text-blue-400 mb-2">Description</h4>
              <p className="text-white/80 text-sm">{step.description}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border border-green-500/30 min-h-[6rem]">
              <h4 className="font-semibold text-green-400 mb-2">Test Method</h4>
              <p className="text-white/80 text-sm">{step.method}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 rounded-lg border border-yellow-500/30 min-h-[6rem]">
              <h4 className="font-semibold text-yellow-400 mb-2">Acceptance Criteria</h4>
              <p className="text-white/80 text-sm">{step.acceptance}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border border-red-500/30 min-h-[6rem]">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Safety Notes
              </h4>
              <p className="text-white/80 text-sm">{step.safety}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="border-white/20 text-white/80 hover:bg-white/10"
          >
            Previous Step
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Next Step
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestStepCard;
