import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LearningHubOverview from './learning-hub/LearningHubOverview';
import RegulationsProcedure from '@/components/inspection/learning-hub/regulations/RegulationsProcedure';
import FaultFindingProcedure from '@/components/inspection/learning-hub/fault-finding/FaultFindingProcedure';
import TestingProceduresSection from './learning-hub/TestingProceduresSection';
import QuizAssessmentSection from './learning-hub/QuizAssessmentSection';

interface LearningHubProps {
  onBack: () => void;
}

export type LearningSection = 'overview' | 'fault-finding' | 'regulations' | 'testing' | 'quiz';

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
        return <FaultFindingProcedure onBack={handleBackToOverview} />;
      case 'regulations':
        return <RegulationsProcedure onBack={handleBackToOverview} />;
      case 'testing':
        return <TestingProceduresSection onBack={handleBackToOverview} />;
      case 'quiz':
        return <QuizAssessmentSection onBack={handleBackToOverview} />;
      default:
        return <LearningHubOverview onNavigateToSection={handleSectionChange} />;
    }
  };

  if (currentSection !== 'overview') {
    return (
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
        <div className="px-4">
          {renderCurrentSection()}
        </div>
      </div>
    );
  }

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
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
              <h1 className="text-base font-semibold text-white">Inspection &amp; Testing</h1>
              <p className="text-[10px] text-white/50">BS 7671:2018+A3:2024</p>
            </div>
          </div>
        </div>
      </div>

      {renderCurrentSection()}
    </div>
  );
};

export default LearningHub;
