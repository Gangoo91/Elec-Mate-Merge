
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';

interface TestingProceduresHeaderProps {
  onBack: () => void;
}

const TestingProceduresHeader = ({ onBack }: TestingProceduresHeaderProps) => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 px-3 sm:px-4">
      {/* Back Button */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="bg-muted border-border hover:bg-muted/80 min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Apprentice Hub</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      {/* Title Section */}
      <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Electrical Testing Procedures</h1>
        </div>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
          Interactive step-by-step guides for essential electrical testing procedures. 
          Each procedure follows BS 7671 regulations and includes safety requirements.
        </p>
      </div>
    </div>
  );
};

export default TestingProceduresHeader;
