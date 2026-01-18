
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import QuizAssessmentHeader from './QuizAssessmentHeader';
import QuizProgressOverview from './QuizProgressOverview';
import QuizAssessmentsGrid from './QuizAssessmentsGrid';
import QuizAchievements from './QuizAchievements';
import QuizPerformanceAnalytics from './QuizPerformanceAnalytics';
import QuizCustomBuilder from './QuizCustomBuilder';

interface QuizAssessmentSectionProps {
  onBack: () => void;
}

const QuizAssessmentSection = ({ onBack }: QuizAssessmentSectionProps) => {
  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Learning Hub</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <QuizAssessmentHeader />

      <QuizAssessmentsGrid />

      {/* Achievements and Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <QuizAchievements />
        <QuizPerformanceAnalytics />
      </div>
    </div>
  );
};

export default QuizAssessmentSection;
