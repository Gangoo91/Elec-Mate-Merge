
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      {/* Native-style sticky header */}
      {currentSection === 'overview' && (
        <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-elec-yellow to-amber-600 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white truncate">
                I&T Hub
              </h1>
              <p className="text-[11px] text-white/50">
                BS 7671:2018+A3:2024
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default LearningHub;
