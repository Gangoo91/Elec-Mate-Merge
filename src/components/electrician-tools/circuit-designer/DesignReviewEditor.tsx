import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InstallationDesign } from '@/types/installation-design';
import { Download, RotateCcw, FileText } from 'lucide-react';
import { CircuitNavigator } from './CircuitNavigator';
import { ProjectSummaryPanel } from './ProjectSummaryPanel';
import { CircuitDetailsView } from './CircuitDetailsView';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileCircuitResults } from './MobileCircuitResults';
import { toast } from 'sonner';

interface DesignReviewEditorProps {
  design: InstallationDesign;
  onReset: () => void;
}

export const DesignReviewEditor = ({ design, onReset }: DesignReviewEditorProps) => {
  const [selectedCircuit, setSelectedCircuit] = useState(0);
  const isMobile = useIsMobile();

  const circuits = design.circuits || [];
  const currentCircuit = circuits[selectedCircuit];

  const handleExportPDF = async () => {
    toast.info('Generating PDF...');
    
    const pdfContent = {
      title: design.projectName,
      location: design.location,
      circuits: design.circuits?.map(c => ({
        name: c.name,
        cable: `${c.cableSize}mm² ${c.cpcSize}mm²`,
        protection: `${c.protectionDevice.rating}A Type ${c.protectionDevice.curve}`,
        voltageDrop: `${c.calculations.voltageDrop.percent.toFixed(2)}%`,
        compliant: c.calculations.voltageDrop.compliant
      }))
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pdfContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${design.projectName.replace(/\s+/g, '_')}_design.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    toast.success('Design exported!');
  };

  const handleExportEIC = () => {
    toast.info('Generating EIC Schedule...');
    
    const eicData = design.circuits?.map(c => ({
      circuitNo: c.circuitNumber,
      description: c.name,
      type: c.protectionDevice.type,
      rating: c.protectionDevice.rating,
      cableSize: `${c.cableSize}/${c.cpcSize}`,
      maxZs: c.calculations.maxZs,
      r1r2: c.expectedTestResults?.r1r2.at20C || 'TBC',
      zs: c.expectedTestResults?.zs.calculated || 'TBC',
      insulation: c.expectedTestResults?.insulationResistance.minResistance || 'TBC'
    }));
    
    console.log('EIC Schedule:', eicData);
    toast.success('EIC schedule ready for export');
  };

  // Mobile view
  if (isMobile) {
    return <MobileCircuitResults design={design} onReset={onReset} onExport={() => {}} />;
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
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportEIC}>
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
