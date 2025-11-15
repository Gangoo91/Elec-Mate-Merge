import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InstallationDesign } from '@/types/installation-design';
import { Download, RotateCcw, FileText } from 'lucide-react';
import { CircuitNavigator } from './CircuitNavigator';
import { ProjectSummaryPanel } from './ProjectSummaryPanel';
import { CircuitDetailsView } from './CircuitDetailsView';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileCircuitResults } from './MobileCircuitResults';

interface DesignReviewEditorProps {
  design: InstallationDesign;
  onReset: () => void;
}

export const DesignReviewEditor = ({ design, onReset }: DesignReviewEditorProps) => {
  const [selectedCircuit, setSelectedCircuit] = useState(0);
  const isMobile = useIsMobile();

  const circuits = design.circuits || [];
  const currentCircuit = circuits[selectedCircuit];

  // Mobile view
  if (isMobile) {
    return <MobileCircuitResults design={design} onReset={onReset} />;
  }

  // Desktop 3-panel layout
  return (
    <div className="min-h-screen bg-background">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{design.projectName}</h1>
              <p className="text-sm text-muted-foreground">{design.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                EIC Schedule
              </Button>
              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-[300px_1fr_350px] gap-6">
          {/* Left Sidebar - Circuit Navigator */}
          <CircuitNavigator
            circuits={circuits}
            selectedCircuitIndex={selectedCircuit}
            onSelectCircuit={setSelectedCircuit}
          />

          {/* Main Content - Circuit Details */}
          <div className="min-h-[600px]">
            {currentCircuit ? (
              <CircuitDetailsView
                circuit={currentCircuit}
                circuitNumber={selectedCircuit + 1}
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No circuit selected
              </div>
            )}
          </div>

          {/* Right Sidebar - Project Summary */}
          <ProjectSummaryPanel design={design} />
        </div>
      </div>
    </div>
  );
};
