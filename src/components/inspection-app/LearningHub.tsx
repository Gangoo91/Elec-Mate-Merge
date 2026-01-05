
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
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
    <div className="min-h-screen mobile-safe-area">
      <div className="space-y-6 md:space-y-8 animate-fade-in px-4 sm:px-6 md:px-8 pb-8 md:pb-12 max-w-7xl mx-auto pt-4 md:pt-6">
        {currentSection === 'overview' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Learning Hub
                </h1>
              </div>
              <Button variant="outline" onClick={onBack} className="h-10 gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </div>
            <p className="text-base text-muted-foreground max-w-2xl">
              BS7671 guidance, testing procedures and safety resources
            </p>
          </div>
        )}

        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default LearningHub;
