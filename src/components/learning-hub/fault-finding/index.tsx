import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Wrench, CheckCircle2, Calendar, AlertTriangle } from 'lucide-react';

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

  // Get page title based on current view
  const getPageTitle = (): string => {
    switch (viewState.view) {
      case 'overview':
        return 'Fault Finding';
      case 'common-faults':
        return 'Common Faults';
      case 'common-fault-detail':
        return 'Fault Details';
      case 'real-world':
        return 'Real-World Cases';
      case 'case-detail':
        return 'Case Study';
      case 'diagnostics':
        return 'Diagnostics';
      case 'diagnostic-detail':
        return 'Diagnostic Details';
      case 'methodology':
        return 'Methodology';
      case 'safety':
        return 'Safety Protocols';
      case 'safety-detail':
        return 'Safety Details';
      case 'equipment':
        return 'Equipment Guides';
      case 'equipment-detail':
        return 'Equipment Details';
      default:
        return 'Fault Finding';
    }
  };

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
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">
              {viewState.view === 'overview' ? 'Back to Learning Hub' : 'Back'}
            </span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        {/* Page Header - Only show on overview */}
        {viewState.view === 'overview' && (
          <div className="text-center space-y-3 sm:space-y-4 px-2 sm:px-4">
            {/* Amendment Badges */}
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                BS 7671:2018+A3:2024
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Updated January 2026
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Diagnostic Techniques
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Fault Finding
                </h1>
                <p className="text-sm sm:text-base text-white/80 mt-1">
                  Systematic Diagnostic Procedures
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white max-w-3xl mx-auto">
              Learn systematic approaches to electrical fault diagnosis and resolution aligned with
              BS 7671:2018 Amendment 3:2024. Master the methodical process from initial symptoms to successful repair.
            </p>
          </div>
        )}

        {/* Section Title - Show on non-overview pages */}
        {viewState.view !== 'overview' && (
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              {getPageTitle()}
            </h2>
          </div>
        )}

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default FaultFindingSection;
