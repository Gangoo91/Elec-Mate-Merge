
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';

interface TestingProceduresHeaderProps {
  onBack: () => void;
}

const TestingProceduresHeader = ({ onBack }: TestingProceduresHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 mb-4">
      <div className="flex items-center gap-3 h-14">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-white truncate">
            Testing Procedures
          </h1>
          <p className="text-[11px] text-white/50">
            BS 7671 Part 6
          </p>
        </div>
      </div>
    </header>
  );
};

export default TestingProceduresHeader;
