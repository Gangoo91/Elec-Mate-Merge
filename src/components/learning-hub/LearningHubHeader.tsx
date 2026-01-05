
import React from 'react';
import { BookOpen } from 'lucide-react';

const LearningHubHeader = () => {
  return (
    <div className="text-center space-y-3 sm:space-y-4 px-3 sm:px-4">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-elec-yellow" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Inspection & Testing Hub</h1>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-foreground/90 max-w-3xl mx-auto break-anywhere hyphens-auto">
        BS7671 guidance, testing procedures and comprehensive safety resources for electrical professionals
      </p>
    </div>
  );
};

export default LearningHubHeader;
