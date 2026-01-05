import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DefectObservationsHeader from './DefectObservationsHeader';
import DefectObservationsActions from './DefectObservationsActions';
import DefectObservationsList from './DefectObservationsList';
import PDFExportProgress from './PDFExportProgress';
import { exportObservationsToPDF, exportCompleteEICRToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';

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

    // Note: Auto-save is now handled by EICRFormProvider via useCloudSync

    const handleExportObservationsPDF = async () => {
      setPdfExportState({
        isExporting: true,
        exportType: 'observations',
        progress: 0,
        status: 'preparing'
      });

      try {
        // Simulate progress updates for better UX
        setPdfExportState(prev => ({ ...prev, progress: 25, status: 'preparing' }));
        
        await new Promise(resolve => setTimeout(resolve, 500)); // Allow UI to update
        
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

    const handleExportCompleteEICR = async () => {
      setPdfExportState({
        isExporting: true,
        exportType: 'complete',
        progress: 0,
        status: 'preparing'
      });

      try {
        setPdfExportState(prev => ({ ...prev, progress: 20, status: 'preparing' }));
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setPdfExportState(prev => ({ ...prev, progress: 60, status: 'generating' }));
        
        await exportCompleteEICRToPDF(
          formData || {},
          formData?.inspectionItems || [],
          defectObservations
        );
        
        setPdfExportState(prev => ({ ...prev, progress: 100, status: 'complete' }));
        
        toast({
          title: "Complete professional EICR exported",
          description: "Your complete EICR has been exported as a professional BS7671 compliant document.",
        });
      } catch (error) {
        console.error('Complete EICR export error:', error);
        setPdfExportState(prev => ({ ...prev, status: 'error' }));
        toast({
          title: "Export failed",
          description: "Failed to export complete EICR. Please try again.",
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

    const handleLoadSavePoint = (data: any) => {
      if (data.defectObservations) {
        // Update observations through parent component
        data.defectObservations.forEach((obs: DefectObservation, index: number) => {
          if (index < defectObservations.length) {
            Object.keys(obs).forEach(key => {
              onUpdateObservation(defectObservations[index].id, key as keyof DefectObservation, obs[key as keyof DefectObservation]);
            });
          }
        });
      }
      if (data.formData && onUpdateFormData) {
        onUpdateFormData(data.formData);
      }
    };

    const criticalIssues = defectObservations.filter(obs => ['C1', 'C2'].includes(obs.defectCode)).length;
    const improvements = defectObservations.filter(obs => obs.defectCode === 'C3').length;

    return (
      <div ref={ref}>
        <Card>
          <CardHeader>
          <DefectObservationsHeader
            hasUnsavedChanges={false}
            criticalIssues={criticalIssues}
            improvements={improvements}
          />
          <DefectObservationsActions
            onAddObservation={onAddObservation}
            onManualSave={() => {}}
          />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Critical issues (C1/C2/C3) are automatically added here. Professional PDF exports include full BS7671 compliance formatting.
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                Auto-saved to cloud
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-3 sm:p-4 md:p-6">
            <DefectObservationsList
              defectObservations={defectObservations}
              reportId={reportId}
              onAddObservation={onAddObservation}
              onUpdateObservation={onUpdateObservation}
              onRemoveObservation={onRemoveObservation}
            />
          </CardContent>
        </Card>

        <PDFExportProgress
          isOpen={pdfExportState.isExporting}
          onClose={handleClosePDFDialog}
          exportType={pdfExportState.exportType}
          progress={pdfExportState.progress}
          status={pdfExportState.status}
          formData={formData}
          onEmailClick={() => {
            handleClosePDFDialog();
            // Trigger email dialog - we need to add this functionality
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
