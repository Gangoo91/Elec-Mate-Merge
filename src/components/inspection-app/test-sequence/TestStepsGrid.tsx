
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestStep {
  step: number;
  title: string;
  regulation: string;
  icon: string;
  priority: string;
  testType: string;
}

interface TestStepsGridProps {
  steps: TestStep[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const TestStepsGrid = ({ steps, currentStep, onStepClick }: TestStepsGridProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTestTypeColor = (testType: string) => {
    switch (testType) {
      case 'isolation': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'dead': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'live': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {steps.map((step, index) => (
        <Card 
          key={index}
          className={`cursor-pointer transition-all duration-200 h-36 ${
            index === currentStep
              ? 'bg-elec-yellow/10 border-elec-yellow/50 scale-[1.02]'
              : 'bg-card border-border hover:bg-muted/50'
          }`}
          onClick={() => onStepClick(index)}
        >
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xl">{step.icon}</div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === currentStep 
                  ? 'bg-elec-yellow text-black' 
                  : 'bg-muted text-foreground'
              }`}>
                {step.step + 1}
              </div>
              <Badge className={`${getPriorityColor(step.priority)} text-foreground text-xs ml-auto`}>
                {step.priority}
              </Badge>
            </div>
            <h4 className="font-semibold text-foreground text-sm mb-1 flex-1">{step.title}</h4>
            <p className="text-xs text-gray-400 mb-2">{step.regulation}</p>
            <Badge className={`${getTestTypeColor(step.testType)} text-xs self-start`}>
              {step.testType.toUpperCase()}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestStepsGrid;
