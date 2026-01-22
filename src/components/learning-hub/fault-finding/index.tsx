import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wrench } from 'lucide-react';

// Import all components
import FaultFindingOverview, { ViewMode } from './FaultFindingOverview';
import CommonFaultsGrid from './common-faults/CommonFaultsGrid';
import CommonFaultDetail from './common-faults/CommonFaultDetail';
import SafetyGrid from './safety/SafetyGrid';
import SafetyDetail from './safety/SafetyDetail';
import EquipmentGrid from './equipment/EquipmentGrid';
import EquipmentDetail from './equipment/EquipmentDetail';
import RealWorldGrid from './real-world/RealWorldGrid';
import CaseStudyDetail from './real-world/CaseStudyDetail';
import DiagnosticsHub from './diagnostics/DiagnosticsHub';
import DiagnosticDetail from './diagnostics/DiagnosticDetail';
import MethodologyWizard from './methodology/MethodologyWizard';

interface FaultFindingSectionProps {
  onBack: () => void;
}

interface ViewState {
  view: ViewMode;
  selectedId?: string;
  selectedIndex?: number;
}

const FaultFindingSection = ({ onBack }: FaultFindingSectionProps) => {
  const [viewState, setViewState] = useState<ViewState>({ view: 'overview' });

  // Handle back navigation
  const handleBack = () => {
    switch (viewState.view) {
      case 'overview':
        onBack();
        break;
      case 'common-fault-detail':
        setViewState({ view: 'common-faults' });
        break;
      case 'safety-detail':
        setViewState({ view: 'safety' });
        break;
      case 'equipment-detail':
        setViewState({ view: 'equipment' });
        break;
      case 'case-detail':
        setViewState({ view: 'real-world' });
        break;
      case 'diagnostic-detail':
        setViewState({ view: 'diagnostics' });
        break;
      default:
        setViewState({ view: 'overview' });
    }
  };

  // Render the current view content
  const renderContent = () => {
    switch (viewState.view) {
      case 'overview':
        return (
          <FaultFindingOverview
            onNavigate={(view) => setViewState({ view })}
          />
        );

      case 'common-faults':
        return (
          <CommonFaultsGrid
            onSelectFault={(faultId) =>
              setViewState({ view: 'common-fault-detail', selectedId: faultId })
            }
          />
        );

      case 'common-fault-detail':
        return viewState.selectedId ? (
          <CommonFaultDetail faultId={viewState.selectedId} />
        ) : null;

      case 'safety':
        return (
          <SafetyGrid
            onSelectTopic={(topicId) =>
              setViewState({ view: 'safety-detail', selectedId: topicId })
            }
          />
        );

      case 'safety-detail':
        return viewState.selectedId ? (
          <SafetyDetail topicId={viewState.selectedId} />
        ) : null;

      case 'equipment':
        return (
          <EquipmentGrid
            onSelectEquipment={(equipmentId) =>
              setViewState({ view: 'equipment-detail', selectedId: equipmentId })
            }
          />
        );

      case 'equipment-detail':
        return viewState.selectedId ? (
          <EquipmentDetail equipmentId={viewState.selectedId} />
        ) : null;

      case 'real-world':
        return (
          <RealWorldGrid
            onSelectCategory={(categoryId) =>
              setViewState({ view: 'case-detail', selectedId: categoryId })
            }
          />
        );

      case 'case-detail':
        return viewState.selectedId ? (
          <CaseStudyDetail categoryId={viewState.selectedId} />
        ) : null;

      case 'diagnostics':
        return (
          <DiagnosticsHub
            onSelectDiagnostic={(categoryId, diagnosticIndex) =>
              setViewState({
                view: 'diagnostic-detail',
                selectedId: categoryId,
                selectedIndex: diagnosticIndex
              })
            }
          />
        );

      case 'diagnostic-detail':
        return viewState.selectedId !== undefined && viewState.selectedIndex !== undefined ? (
          <DiagnosticDetail
            categoryId={viewState.selectedId}
            diagnosticIndex={viewState.selectedIndex}
          />
        ) : null;

      case 'methodology':
        return (
          <MethodologyWizard
            onComplete={() => setViewState({ view: 'overview' })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* iOS-style header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 mb-4">
        <div className="flex items-center gap-3 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center">
            <Wrench className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">
              Fault Finding
            </h1>
            <p className="text-[11px] text-white/50">
              Diagnostic Procedures
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};

export default FaultFindingSection;
