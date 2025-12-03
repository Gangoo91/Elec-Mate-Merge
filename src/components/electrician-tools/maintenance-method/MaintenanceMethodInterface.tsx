import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceEquipmentDetails } from '@/types/maintenance-method';
import { MaintenanceInput } from './MaintenanceInput';
import { MaintenanceMethodProcessingView } from './MaintenanceMethodProcessingView';
import { MaintenanceMethodResults } from './MaintenanceMethodResults';
import { MaintenanceSuccess } from './MaintenanceSuccess';
import { useMaintenanceMethodJobPolling } from '@/hooks/useMaintenanceMethodJobPolling';
import { buildMaintenancePdfPayload } from '@/utils/maintenance-pdf-payload-builder';

type ViewState = 'input' | 'processing' | 'success' | 'results';

export const MaintenanceMethodInterface = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [equipmentDetails, setEquipmentDetails] = useState<MaintenanceEquipmentDetails>({
    equipmentType: '',
    location: '',
    installationType: 'commercial'
  });
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('input');
  const [startTime, setStartTime] = useState<number>(0);

  const { job, isPolling, cancelJob } = useMaintenanceMethodJobPolling(currentJobId);

  // Auto-transition to success when job completes
  useEffect(() => {
    if (viewState === 'processing' && job?.status === 'completed' && job.method_data) {
      setViewState('success');
    }
  }, [viewState, job?.status, job?.method_data]);

  // Handle job failure
  useEffect(() => {
    if (job?.status === 'failed' && viewState !== 'input') {
      toast({
        title: 'Generation Failed',
        description: job.error_message || 'Failed to generate maintenance instructions',
        variant: 'destructive'
      });
      setViewState('input');
      setCurrentJobId(null);
    }
  }, [job?.status, job?.error_message, viewState, toast]);

  const handleGenerate = async () => {
    if (!query.trim()) {
      toast({
        title: 'Query Required',
        description: 'Please describe the equipment requiring maintenance',
        variant: 'destructive'
      });
      return;
    }

    if (!equipmentDetails.equipmentType || !equipmentDetails.location) {
      toast({
        title: 'Missing Information',
        description: 'Please provide equipment type and location',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStartTime(Date.now());

      const { data, error } = await supabase.functions.invoke('create-maintenance-method-job', {
        body: {
          query,
          equipmentDetails,
          detailLevel: 'normal'
        }
      });

      if (error) throw error;

      setCurrentJobId(data.jobId);
      setViewState('processing');
      
      toast({
        title: 'Generation Started',
        description: 'Generating detailed maintenance instructions...'
      });
    } catch (error: any) {
      console.error('Error creating maintenance method job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to start generation',
        variant: 'destructive'
      });
      setViewState('input');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelJob();
      setViewState('input');
      setCurrentJobId(null);
      toast({
        title: 'Cancelled',
        description: 'Maintenance method generation cancelled'
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReset = () => {
    setCurrentJobId(null);
    setQuery('');
    setEquipmentDetails({
      equipmentType: '',
      location: '',
      installationType: 'commercial'
    });
    setViewState('input');
  };

  const handleExportPDF = async () => {
    if (!job?.method_data) {
      toast({
        title: 'No Data',
        description: 'No maintenance data available to export',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      toast({
        title: 'Generating PDF',
        description: 'Creating your maintenance instructions PDF...'
      });

      // Build properly structured payload using the builder
      const payload = buildMaintenancePdfPayload(job.method_data, equipmentDetails);
      
      console.log('[Maintenance PDF] Payload structure:', {
        reportTitle: payload.reportTitle,
        equipmentType: payload.equipmentDetails.equipmentType,
        stepsCount: payload.steps.length,
        hasRecommendations: payload.recommendations.length > 0,
        hasSummary: !!payload.summary
      });

      const { data, error } = await supabase.functions.invoke('generate-maintenance-method-pdf', {
        body: payload
      });

      if (error) throw error;

      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
        toast({
          title: 'PDF Generated',
          description: 'Your maintenance instructions PDF is ready'
        });
      } else {
        throw new Error('No download URL returned');
      }
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Export Failed',
        description: error.message || 'Failed to generate PDF',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewResults = () => {
    setViewState('results');
  };

  // Show results if completed
  if (viewState === 'results' && job?.status === 'completed' && job.method_data) {
    return (
      <MaintenanceMethodResults 
        methodData={job.method_data} 
        onReset={handleReset}
        onExportPDF={handleExportPDF}
      />
    );
  }

  // Show success celebration
  if (viewState === 'success' && job?.status === 'completed' && job.method_data) {
    const generationTime = Date.now() - startTime;
    return (
      <MaintenanceSuccess
        stepCount={job.method_data.steps?.length || 0}
        equipmentType={equipmentDetails.equipmentType}
        generationTimeMs={generationTime}
        onViewResults={handleViewResults}
      />
    );
  }

  // Show processing if job is running
  if (viewState === 'processing' && job && (job.status === 'pending' || job.status === 'processing')) {
    return (
      <MaintenanceMethodProcessingView
        progress={job.progress}
        currentStep={job.current_step}
        originalQuery={query}
        equipmentDetails={equipmentDetails}
        startTime={startTime}
        onCancel={isPolling ? handleCancel : undefined}
        isCancelling={isCancelling}
      />
    );
  }

  // Show input form
  return (
    <MaintenanceInput
      query={query}
      equipmentDetails={equipmentDetails}
      onQueryChange={setQuery}
      onEquipmentDetailsChange={setEquipmentDetails}
      onGenerate={handleGenerate}
      isProcessing={isSubmitting}
    />
  );
};
