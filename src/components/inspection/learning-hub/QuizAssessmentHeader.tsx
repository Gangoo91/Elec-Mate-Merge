
import React from 'react';
import { GraduationCap } from 'lucide-react';

const QuizAssessmentHeader = () => {
  return (
    <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
        <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-anywhere hyphens-auto">Inspection & Testing Knowledge Assessment</h1>
      </div>
      <p className="text-sm sm:text-base md:text-base lg:text-lg text-foreground/90 max-w-3xl mx-auto px-2 sm:px-4 break-anywhere hyphens-auto">
        Master the essential inspection and testing procedures required for electrical installations. 
        Each assessment covers specific BS 7671 requirements with practical scenarios and real-world applications.
      </p>
    </div>
  );
};

export default QuizAssessmentHeader;
