
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface TestProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const TestProgressIndicator = ({ totalSteps, currentStep }: TestProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
            index === currentStep 
              ? 'bg-elec-yellow text-black border-elec-yellow' 
              : index < currentStep
              ? 'bg-green-500 text-foreground border-green-500'
              : 'bg-muted text-gray-400 border-border'
          }`}>
            {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <ArrowRight className={`h-4 w-4 mx-2 ${
              index < currentStep ? 'text-green-500' : 'text-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TestProgressIndicator;
