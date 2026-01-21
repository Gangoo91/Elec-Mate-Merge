import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, FileText, XCircle, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import DefectObservationsList from './DefectObservationsList';
import PDFExportProgress from './PDFExportProgress';
import { exportObservationsToPDF, exportCompleteEICRToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

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
  defaultOpen?: boolean;
}

const DefectObservationsSection = React.forwardRef<HTMLDivElement, DefectObservationsSectionProps>(
  ({ defectObservations, reportId, onAddObservation, onUpdateObservation, onRemoveObservation, formData, onUpdateFormData, defaultOpen = true }, ref) => {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const haptics = useHaptics();
    const [isOpen, setIsOpen] = useState(defaultOpen);
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

    const handleAddObservation = () => {
      haptics.tap();
      onAddObservation();
    };

    // Calculate stats
    const c1Count = defectObservations.filter(obs => obs.defectCode === 'C1').length;
    const c2Count = defectObservations.filter(obs => obs.defectCode === 'C2').length;
    const c3Count = defectObservations.filter(obs => obs.defectCode === 'C3').length;
    const rectifiedCount = defectObservations.filter(obs => obs.rectified).length;
    const totalCount = defectObservations.length;

    // Determine severity for header styling
    const hasCritical = c1Count > 0;
    const hasPotentiallyDangerous = c2Count > 0;

    return (
      <div ref={ref} className={cn(isMobile && "-mx-4")}>
        <Collapsible open={isOpen} onOpenChange={(open) => { haptics.tap(); setIsOpen(open); }}>
          {/* Header */}
          <CollapsibleTrigger className="w-full" asChild>
            <button className={cn(
              "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
              "bg-card/50 border-y border-border/30",
              isOpen && "bg-card/80",
              "active:bg-card/90"
            )}>
              {/* Icon Badge */}
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
                hasCritical ? "bg-red-500/20" :
                hasPotentiallyDangerous ? "bg-orange-500/20" :
                totalCount > 0 ? "bg-elec-yellow/20" :
                "bg-white/10"
              )}>
                <FileText className={cn(
                  "h-5 w-5",
                  hasCritical ? "text-red-500" :
                  hasPotentiallyDangerous ? "text-orange-500" :
                  totalCount > 0 ? "text-elec-yellow" :
                  "text-white/50"
                )} />
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Observations & Defects</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {totalCount === 0 ? 'No observations recorded' : `${totalCount} observation${totalCount !== 1 ? 's' : ''} recorded`}
                </p>
              </div>

              {/* Stats Badges */}
              {totalCount > 0 && (
                <div className="flex items-center gap-1">
                  {c1Count > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400">
                      {c1Count}
                    </span>
                  )}
                  {c2Count > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-orange-500/20 text-orange-400">
                      {c2Count}
                    </span>
                  )}
                  {c3Count > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400">
                      {c3Count}
                    </span>
                  )}
                </div>
              )}

              {/* Chevron */}
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )} />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {/* Stats Row */}
            {totalCount > 0 && (
              <div className={cn(
                "flex flex-wrap items-center gap-2 p-3 bg-card/30 border-b border-border/20",
                isMobile ? "px-4" : ""
              )}>
                {c1Count > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30">
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-xs font-medium text-red-400">{c1Count} C1</span>
                  </div>
                )}
                {c2Count > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-500/15 border border-orange-500/30">
                    <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-xs font-medium text-orange-400">{c2Count} C2</span>
                  </div>
                )}
                {c3Count > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-500/15 border border-yellow-500/30">
                    <AlertCircle className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="text-xs font-medium text-yellow-400">{c3Count} C3</span>
                  </div>
                )}
                {rectifiedCount > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-500/15 border border-green-500/30">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-xs font-medium text-green-400">{rectifiedCount} Rectified</span>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className={cn(
              "bg-card/30",
              isMobile ? "p-4" : "p-4"
            )}>
              {totalCount === 0 ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-7 w-7 text-white/30" />
                  </div>
                  <p className="text-sm text-white/50 mb-1">No observations yet</p>
                  <p className="text-xs text-white/30 mb-5 max-w-[250px] mx-auto">
                    Observations are auto-created when you mark inspection items as C1, C2, or C3
                  </p>
                  <Button
                    onClick={handleAddObservation}
                    className="h-12 px-5 bg-elec-yellow/20 border border-elec-yellow/30 text-elec-yellow
                               hover:bg-elec-yellow/30 hover:border-elec-yellow/50 touch-manipulation"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Manual Observation
                  </Button>
                </div>
              ) : (
                <>
                  <DefectObservationsList
                    defectObservations={defectObservations}
                    reportId={reportId}
                    onAddObservation={handleAddObservation}
                    onUpdateObservation={onUpdateObservation}
                    onRemoveObservation={onRemoveObservation}
                  />

                  {/* Add Another Button */}
                  <Button
                    onClick={handleAddObservation}
                    variant="outline"
                    className="w-full h-12 mt-4 border-dashed border-white/20 text-white/60
                               hover:bg-white/5 hover:text-white touch-manipulation"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Observation
                  </Button>
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

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
