
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LearningHubOverview from './learning-hub/LearningHubOverview';
import RegulationReferenceSection from './learning-hub/RegulationReferenceSection';
import FaultFindingSection from './learning-hub/FaultFindingSection';
import TestingProceduresSection from './learning-hub/TestingProceduresSection';

import QuizAssessmentSection from './learning-hub/QuizAssessmentSection';

interface LearningHubProps {
  onBack: () => void;
}

export type LearningSection = 
  | 'overview'
  | 'fault-finding'
  | 'regulations'
  | 'testing'
  | 'quiz';

const LearningHub = ({ onBack }: LearningHubProps) => {
  const [currentSection, setCurrentSection] = useState<LearningSection>('overview');

  const handleSectionChange = (section: LearningSection) => {
    setCurrentSection(section);
  };

  const handleBackToOverview = () => {
    setCurrentSection('overview');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'fault-finding':
        return <FaultFindingSection onBack={handleBackToOverview} />;
      case 'regulations':
        return <RegulationReferenceSection onBack={handleBackToOverview} />;
      case 'testing':
        return <TestingProceduresSection onBack={handleBackToOverview} />;
      case 'quiz':
        return <QuizAssessmentSection onBack={handleBackToOverview} />;
      default:
        return <LearningHubOverview onNavigateToSection={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="md:max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {currentSection === 'overview' && (
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        )}

        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default LearningHub;
