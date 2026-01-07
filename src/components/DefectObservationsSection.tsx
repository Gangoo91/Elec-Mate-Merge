import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, FileText, XCircle, AlertCircle, CheckCircle } from 'lucide-react';
import DefectObservationsList from './DefectObservationsList';
import PDFExportProgress from './PDFExportProgress';
import { exportObservationsToPDF, exportCompleteEICRToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface DefectObservationsSectionProps {
  defectObservations: DefectObservation[];
  reportId: string;
  onAddObservation: () => void;
  onUpdateObservation: (id: string, field: keyof DefectObservation, value: any) => void;
  onRemoveObservation: (id: string) => void;
  formData?: any;
  onUpdateFormData?: (data: any) => void;
}

const DefectObservationsSection = React.forwardRef<HTMLDivElement, DefectObservationsSectionProps>(
  ({ defectObservations, reportId, onAddObservation, onUpdateObservation, onRemoveObservation, formData, onUpdateFormData }, ref) => {
    const { toast } = useToast();
    const [pdfExportState, setPdfExportState] = useState({
      isExporting: false,
      exportType: null as 'observations' | 'complete' | null,
      progress: 0,
      status: 'preparing' as 'preparing' | 'generating' | 'complete' | 'error'
    });

    const handleExportObservationsPDF = async () => {
      setPdfExportState({
        isExporting: true,
        exportType: 'observations',
        progress: 0,
        status: 'preparing'
      });

      try {
        setPdfExportState(prev => ({ ...prev, progress: 25, status: 'preparing' }));
        await new Promise(resolve => setTimeout(resolve, 500));
        setPdfExportState(prev => ({ ...prev, progress: 50, status: 'generating' }));
        await exportObservationsToPDF(defectObservations, formData || {});
        setPdfExportState(prev => ({ ...prev, progress: 100, status: 'complete' }));

        toast({
          title: "Professional PDF exported",
          description: "Your observations have been exported as a professional EICR document.",
        });
      } catch (error) {
        console.error('PDF export error:', error);
        setPdfExportState(prev => ({ ...prev, status: 'error' }));
        toast({
          title: "Export failed",
          description: "Failed to export observations PDF. Please try again.",
          variant: "destructive",
        });
      }
    };

    const handleClosePDFDialog = () => {
      setPdfExportState({
        isExporting: false,
        exportType: null,
        progress: 0,
        status: 'preparing'
      });
    };

    // Calculate stats
    const c1Count = defectObservations.filter(obs => obs.defectCode === 'C1').length;
    const c2Count = defectObservations.filter(obs => obs.defectCode === 'C2').length;
    const c3Count = defectObservations.filter(obs => obs.defectCode === 'C3').length;
    const rectifiedCount = defectObservations.filter(obs => obs.rectified).length;
    const totalCount = defectObservations.length;

    return (
      <div ref={ref} className="eicr-section-card">
        {/* Golden accent line */}
        <div className={cn(
          "h-0.5 w-full",
          totalCount > 0 ? "eicr-section-accent" : "bg-white/10"
        )} />

        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="eicr-section-number">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Observations & Defects</h3>
                <p className="text-xs text-white/50 mt-0.5">
                  {totalCount === 0 ? 'No observations recorded' : `${totalCount} observation${totalCount !== 1 ? 's' : ''} recorded`}
                </p>
              </div>
            </div>

            <Button
              onClick={onAddObservation}
              size="sm"
              className="h-9 bg-elec-yellow/20 border border-elec-yellow/30 text-elec-yellow
                         hover:bg-elec-yellow/30 hover:border-elec-yellow/50"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add
            </Button>
          </div>

          {/* Stats Row */}
          {totalCount > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/5">
              {c1Count > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30">
                  <XCircle className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs font-medium text-red-400">{c1Count} C1</span>
                </div>
              )}
              {c2Count > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-xs font-medium text-orange-400">{c2Count} C2</span>
                </div>
              )}
              {c3Count > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30">
                  <AlertCircle className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-400">{c3Count} C3</span>
                </div>
              )}
              {rectifiedCount > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30">
                  <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-xs font-medium text-green-400">{rectifiedCount} Rectified</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {totalCount === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-white/30" />
              </div>
              <p className="text-sm text-white/50 mb-1">No observations yet</p>
              <p className="text-xs text-white/30">
                Observations are auto-created when you mark items as C1, C2, or C3
              </p>
              <Button
                onClick={onAddObservation}
                variant="outline"
                size="sm"
                className="mt-4 border-white/10 text-white/70 hover:bg-white/5"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add Manual Observation
              </Button>
            </div>
          ) : (
            <DefectObservationsList
              defectObservations={defectObservations}
              reportId={reportId}
              onAddObservation={onAddObservation}
              onUpdateObservation={onUpdateObservation}
              onRemoveObservation={onRemoveObservation}
            />
          )}
        </div>

        <PDFExportProgress
          isOpen={pdfExportState.isExporting}
          onClose={handleClosePDFDialog}
          exportType={pdfExportState.exportType}
          progress={pdfExportState.progress}
          status={pdfExportState.status}
          formData={formData}
          onEmailClick={() => {
            handleClosePDFDialog();
            const emailButton = document.querySelector('[data-email-eicr]') as HTMLButtonElement;
            if (emailButton) emailButton.click();
          }}
        />
      </div>
    );
  }
);

DefectObservationsSection.displayName = 'DefectObservationsSection';

export default DefectObservationsSection;
