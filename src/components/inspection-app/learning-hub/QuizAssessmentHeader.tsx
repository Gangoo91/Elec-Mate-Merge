
import React from 'react';
import { GraduationCap, CheckCircle2, Calendar, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const QuizAssessmentHeader = () => {
  return (
    <div className="text-center space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
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
        <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
          <Brain className="h-3 w-3 mr-1" />
          2391 Style Questions
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 bg-elec-yellow/10 rounded-2xl border border-elec-yellow/20">
          <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Knowledge Assessment
          </h1>
          <p className="text-sm sm:text-base text-white/80 mt-1">
            Inspection & Testing Quiz Centre
          </p>
        </div>
      </div>
      <p className="text-sm sm:text-base text-white max-w-3xl mx-auto px-2 sm:px-4">
        Master the essential inspection and testing procedures required for electrical installations.
        Each assessment covers BS 7671:2018 Amendment 3:2024 requirements with practical scenarios and real-world applications.
      </p>
    </div>
  );
};

export default QuizAssessmentHeader;
