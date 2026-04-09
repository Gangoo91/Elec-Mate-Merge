import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TestingProceduresHeaderProps {
  onBack: () => void;
}

const TestingProceduresHeader = ({ onBack }: TestingProceduresHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2">
        <div className="flex items-center gap-3 h-11">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-base font-semibold text-white">Testing Procedures</h1>
            <p className="text-[10px] text-white">BS 7671 Part 6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingProceduresHeader;
