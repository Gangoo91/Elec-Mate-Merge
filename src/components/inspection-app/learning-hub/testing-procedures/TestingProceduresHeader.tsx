
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Zap, CheckCircle2, Calendar } from 'lucide-react';

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
          <span className="hidden sm:inline">Back to Hub</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      {/* Title Section */}
      <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
        {/* Amendment Badges */}
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            BS 7671:2018+A3:2024
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Updated January 2026
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-elec-yellow/10 rounded-2xl border border-elec-yellow/20">
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Electrical Testing Procedures
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-1">
              18th Edition Part 6 Compliant
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-white max-w-2xl mx-auto px-2 sm:px-4">
          Interactive step-by-step guides for essential electrical testing procedures aligned with
          BS 7671:2018 Amendment 3:2024 requirements including safety protocols.
        </p>
      </div>
    </div>
  );
};

export default TestingProceduresHeader;
