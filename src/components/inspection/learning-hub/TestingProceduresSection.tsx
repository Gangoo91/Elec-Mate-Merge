import React, { useState } from 'react';
import TestingProceduresHeader from './testing-procedures/TestingProceduresHeader';
import TestingProceduresGrid from './testing-procedures/TestingProceduresGrid';
import TestProcedureWizard from './testing-procedures/TestProcedureWizard';
import SafeIsolationProcedure from './safe-isolation/SafeIsolationProcedure';
import CertificateGuideProcedure from './supplementary-testing/CertificateGuideProcedure';
import ScheduleGuideProcedure from './supplementary-testing/ScheduleGuideProcedure';
import ContinuityTestingProcedure from './ContinuityTestingProcedure';
import InsulationTestingProcedure from './insulation-testing/InsulationTestingProcedure';
import PolarityTestingProcedure from './polarity-testing/PolarityTestingProcedure';
import ZsTestingProcedure from './zs-testing/ZsTestingProcedure';
import RcdTestingProcedure from './rcd-testing/RcdTestingProcedure';
import PfcTestingProcedure from './pfc-testing/PfcTestingProcedure';
import FunctionalTestingProcedure from './functional-testing/FunctionalTestingProcedure';
import SupplementaryTestingProcedure from './supplementary-testing/SupplementaryTestingProcedure';
import TestSequencePage from './test-sequence/TestSequencePage';
import QuickReferencePage from './quick-reference/QuickReferencePage';
import { testingProceduresData, TestingProcedure } from './testing-procedures/TestingProcedureData';

interface TestingProceduresSectionProps {
  onBack: () => void;
}

type ViewMode =
  | 'grid'
  | 'procedure'
  | 'isolation'
  | 'continuity'
  | 'insulation'
  | 'polarity'
  | 'zs'
  | 'rcd'
  | 'pfc'
  | 'functional'
  | 'supplementary'
  | 'certificate-guide'
  | 'schedule-guide'
  | 'test-sequence'
  | 'quick-reference';

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

  const handleStartTestSequence = () => {
    setCurrentView('test-sequence');
  };

  const handleStartQuickReference = () => {
    setCurrentView('quick-reference');
  };

  const handleBackToProcedures = () => {
    setSelectedProcedure(null);
    setCurrentView('grid');
  };

  const procedureComponents = {
    'safe-isolation': <SafeIsolationProcedure onBack={() => setCurrentView('grid')} />,
    'continuity-testing': <ContinuityTestingProcedure onBack={() => setCurrentView('grid')} />,
    'insulation-resistance': <InsulationTestingProcedure onBack={() => setCurrentView('grid')} />,
    'polarity-testing': <PolarityTestingProcedure onBack={() => setCurrentView('grid')} />,
    'zs-testing': <ZsTestingProcedure onBack={() => setCurrentView('grid')} />,
    'rcd-testing': <RcdTestingProcedure onBack={() => setCurrentView('grid')} />,
    'functional-testing': <FunctionalTestingProcedure onBack={() => setCurrentView('grid')} />,
  };

  if (currentView === 'isolation') {
    return <SafeIsolationProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'continuity') {
    return <ContinuityTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'insulation') {
    return <InsulationTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'polarity') {
    return <PolarityTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'zs') {
    return <ZsTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'rcd') {
    return <RcdTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'pfc') {
    return <PfcTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'functional') {
    return <FunctionalTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'supplementary') {
    return <SupplementaryTestingProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'certificate-guide') {
    return <CertificateGuideProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'schedule-guide') {
    return <ScheduleGuideProcedure onBack={handleBackToProcedures} />;
  }

  if (currentView === 'test-sequence') {
    return <TestSequencePage onBack={handleBackToProcedures} />;
  }

  if (currentView === 'quick-reference') {
    return <QuickReferencePage onBack={handleBackToProcedures} />;
  }

  if (currentView === 'procedure' && selectedProcedure) {
    return <TestProcedureWizard procedure={selectedProcedure} onBack={handleBackToProcedures} />;
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
        onStartTestSequence={handleStartTestSequence}
        onStartQuickReference={handleStartQuickReference}
        onPreviewProcedure={handleStartProcedure}
        onClearFilters={() => {}}
      />
    </div>
  );
};

export default TestingProceduresSection;
