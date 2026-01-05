
import React, { useState } from 'react';
import TestingProceduresHeader from './testing-procedures/TestingProceduresHeader';
import TestingProceduresGrid from './testing-procedures/TestingProceduresGrid';
import TestProcedureWizard from './testing-procedures/TestProcedureWizard';
import SafeIsolationCard from './safe-isolation/SafeIsolationCard';
import CertificateGuideTab from './supplementary-testing/CertificateGuideTab';
import ScheduleGuideTab from './supplementary-testing/ScheduleGuideTab';
import ContinuityTestingProcedure from './ContinuityTestingProcedure';
import EnhancedInsulationResistanceTestCard from './EnhancedInsulationResistanceTestCard';
import EnhancedPolarityTestCard from './EnhancedPolarityTestCard';
import ZsTestCard from './ZsTestCard';
import RcdTestCard from './RcdTestCard';
import PfcTestCard from './PfcTestCard';
import FunctionalTestCard from './FunctionalTestCard';
import SupplementaryTestCard from './SupplementaryTestCard';
import { testingProceduresData, TestingProcedure } from './testing-procedures/TestingProcedureData';

interface TestingProceduresSectionProps {
  onBack: () => void;
}

type ViewMode = 'grid' | 'procedure' | 'isolation' | 'continuity' | 'insulation' | 'polarity' | 'zs' | 'rcd' | 'pfc' | 'functional' | 'supplementary' | 'certificate-guide' | 'schedule-guide';

const TestingProceduresSection = ({ onBack }: TestingProceduresSectionProps) => {
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [selectedProcedure, setSelectedProcedure] = useState<TestingProcedure | null>(null);

  const handleStartProcedure = (procedure: TestingProcedure) => {
    setSelectedProcedure(procedure);
    setCurrentView('procedure');
  };

  const handleStartSafeIsolation = () => {
    setCurrentView('isolation');
  };

  const handleStartContinuityTesting = () => {
    setCurrentView('continuity');
  };

  const handleStartInsulationTesting = () => {
    setCurrentView('insulation');
  };

  const handleStartPolarityTesting = () => {
    setCurrentView('polarity');
  };

  const handleStartZsTesting = () => {
    setCurrentView('zs');
  };

  const handleStartRcdTesting = () => {
    setCurrentView('rcd');
  };

  const handleStartPfcTesting = () => {
    setCurrentView('pfc');
  };

  const handleStartFunctionalTesting = () => {
    setCurrentView('functional');
  };

  const handleStartSupplementaryTesting = () => {
    setCurrentView('supplementary');
  };

  const handleStartCertificateGuide = () => {
    setCurrentView('certificate-guide');
  };

  const handleStartScheduleGuide = () => {
    setCurrentView('schedule-guide');
  };

  const handleBackToProcedures = () => {
    setSelectedProcedure(null);
    setCurrentView('grid');
  };

  const procedureComponents = {
    'safe-isolation': <SafeIsolationCard onBack={() => setCurrentView('grid')} />,
    'continuity-testing': <ContinuityTestingProcedure onBack={() => setCurrentView('grid')} />,
    'insulation-resistance': <EnhancedInsulationResistanceTestCard />,
    'polarity-testing': <EnhancedPolarityTestCard />,
    'zs-testing': <ZsTestCard />,
    'rcd-testing': <RcdTestCard />,
    'functional-testing': <FunctionalTestCard />
  };

  if (currentView === 'isolation') {
    return (
      <SafeIsolationCard 
        onBack={handleBackToProcedures}
      />
    );
  }

  if (currentView === 'continuity') {
    return (
      <ContinuityTestingProcedure 
        onBack={handleBackToProcedures}
      />
    );
  }

  if (currentView === 'insulation') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <EnhancedInsulationResistanceTestCard />
      </div>
    );
  }

  if (currentView === 'polarity') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <EnhancedPolarityTestCard />
      </div>
    );
  }

  if (currentView === 'zs') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <ZsTestCard />
      </div>
    );
  }

  if (currentView === 'rcd') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <RcdTestCard />
      </div>
    );
  }

  if (currentView === 'pfc') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <PfcTestCard />
      </div>
    );
  }

  if (currentView === 'functional') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <FunctionalTestCard />
      </div>
    );
  }

  if (currentView === 'supplementary') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <SupplementaryTestCard />
      </div>
    );
  }

  if (currentView === 'certificate-guide') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <CertificateGuideTab />
      </div>
    );
  }

  if (currentView === 'schedule-guide') {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button 
            onClick={handleBackToProcedures}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card text-foreground rounded-lg hover:bg-muted transition-colors text-sm min-h-[44px] touch-manipulation"
          >
            ← <span className="hidden sm:inline">Back to Testing Procedures</span><span className="sm:hidden">Back</span>
          </button>
        </div>
        <ScheduleGuideTab />
      </div>
    );
  }

  if (currentView === 'procedure' && selectedProcedure) {
    return (
      <TestProcedureWizard 
        procedure={selectedProcedure} 
        onBack={handleBackToProcedures}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
      <TestingProceduresHeader onBack={onBack} />
      
      <TestingProceduresGrid
        procedures={testingProceduresData}
        onStartProcedure={handleStartProcedure}
        onStartSafeIsolation={handleStartSafeIsolation}
        onStartContinuityTesting={handleStartContinuityTesting}
        onStartInsulationTesting={handleStartInsulationTesting}
        onStartPolarityTesting={handleStartPolarityTesting}
        onStartZsTesting={handleStartZsTesting}
        onStartRcdTesting={handleStartRcdTesting}
        onStartPfcTesting={handleStartPfcTesting}
        onStartFunctionalTesting={handleStartFunctionalTesting}
        onStartSupplementaryTesting={handleStartSupplementaryTesting}
        onStartCertificateGuide={handleStartCertificateGuide}
        onStartScheduleGuide={handleStartScheduleGuide}
        onPreviewProcedure={handleStartProcedure}
        onClearFilters={() => {}}
      />
    </div>
  );
};

export default TestingProceduresSection;
