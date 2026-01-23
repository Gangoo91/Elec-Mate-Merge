import { useState, useEffect, useMemo } from "react";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCostEngineerGeneration } from "@/hooks/useCostEngineerGeneration";
import CostAnalysisProcessingView from "./CostAnalysisProcessingView";
import CostAnalysisResults from "./CostAnalysisResults";
import { parseCostAnalysis, ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { BusinessSettings, DEFAULT_BUSINESS_SETTINGS, BusinessSettingsDialog } from "./BusinessSettingsDialog";
import { AgentSuccessDialog } from "@/components/agents/shared/AgentSuccessDialog";
import { CostEngineerInput } from "./CostEngineerInput";
import { getStoredCircuitContext, clearStoredCircuitContext, type StoredCircuitContext } from "@/utils/circuit-context-generator";
import { ImportedContextBanner } from "@/components/electrician-tools/shared/ImportedContextBanner";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

// Generate user-scoped storage key for business settings
const getStorageKey = (userId?: string) =>
  userId
    ? `electrician_business_settings_${userId}`
    : 'electrician_business_settings_guest';

type ViewState = 'input' | 'processing' | 'results';
type ProjectType = 'domestic' | 'commercial' | 'industrial';

const CostEngineerInterface = () => {
  const { user } = useAuth();
  const storageKey = useMemo(() => getStorageKey(user?.id), [user?.id]);

  const [viewState, setViewState] = useState<ViewState>('input');
  const [projectType, setProjectType] = useState<ProjectType>('domestic');
  const [prompt, setPrompt] = useState("");
  const [originalQueryFromResponse, setOriginalQueryFromResponse] = useState<string>("");
  const [parsedResults, setParsedResults] = useState<ParsedCostAnalysis | null>(null);
  const [structuredData, setStructuredData] = useState<any>(null);
  const [projectName, setProjectName] = useState("");
  const [clientInfo, setClientInfo] = useState("");
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(DEFAULT_BUSINESS_SETTINGS);
  const [hasConfiguredSettings, setHasConfiguredSettings] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [importedContext, setImportedContext] = useState<StoredCircuitContext | null>(null);
  // Track last inputs for retry functionality
  const [lastJobInputs, setLastJobInputs] = useState<{
    query: string;
    region: string;
    projectContext: any;
    businessSettings: BusinessSettings;
  } | null>(null);
  const [jobError, setJobError] = useState<string | null>(null);

  // Check for imported circuit context on mount
  useEffect(() => {
    const storedContext = getStoredCircuitContext();
    if (storedContext && storedContext.agentType === 'cost-engineer') {
      setImportedContext(storedContext);
      // Clear after pickup (one-time use)
      clearStoredCircuitContext();
    }
  }, []);

  const handleUseImportedContext = () => {
    if (importedContext) {
      setPrompt(importedContext.formattedPrompt);
      setProjectName(importedContext.sourceDesign);
      setImportedContext(null);
    }
  };

  const handleDismissImportedContext = () => {
    setImportedContext(null);
  };

  // Load business settings from localStorage on mount or when user changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBusinessSettings(parsed);
        setHasConfiguredSettings(true);
      } catch (e) {
        console.error('Failed to parse business settings:', e);
      }
    } else {
      // Reset to defaults when switching to a user without saved settings
      setBusinessSettings(DEFAULT_BUSINESS_SETTINGS);
      setHasConfiguredSettings(false);
    }
  }, [storageKey]);

  const handleSettingsChange = (newSettings: BusinessSettings) => {
    setBusinessSettings(newSettings);
    setHasConfiguredSettings(true);
  };

  // Use job queue pattern with polling
  const { job, isPolling, cancelJob } = useCostEngineerGeneration({
    jobId,
    onComplete: (data) => {
      setJobError(null);
      handleJobComplete(data);
    },
    onError: (error) => {
      // Keep in processing view to show error state with retry option
      setJobError(error);
      toast({
        title: "Generation failed",
        description: error,
        variant: "destructive"
      });
    }
  });


  const handleJobComplete = (data: any) => {
    // Store original query from response
    if (data.originalQuery) {
      setOriginalQueryFromResponse(data.originalQuery);
    }

    // Store structured data
    const coreStructuredData = data.structuredData;
    setStructuredData(coreStructuredData);

    // Parse results
    if (coreStructuredData && coreStructuredData.summary) {
      setParsedResults({
        totalCost: coreStructuredData.summary.grandTotal,
        materialsTotal: coreStructuredData.materials?.subtotal || 0,
        labourTotal: coreStructuredData.labour?.subtotal || 0,
        materials: coreStructuredData.materials?.items?.map((m: any) => ({
          item: m.description || m.item || 'Unknown item',
          quantity: m.quantity,
          unit: m.unit,
          unitPrice: m.unitPrice,
          total: m.total,
          supplier: m.supplier
        })) || [],
        labour: {
          hours: coreStructuredData.labour?.tasks?.reduce((sum: number, t: any) => sum + (t.hours || 0), 0) || 0,
          rate: 50,
          total: coreStructuredData.labour?.subtotal || 0,
          description: coreStructuredData.labour?.tasks?.[0]?.description || 'Installation labour'
        },
        additionalCosts: [],
        vatAmount: coreStructuredData.summary.vat,
        vatRate: 20,
        subtotal: coreStructuredData.summary.subtotal,
        rawText: data.response
      });
    } else {
      // Fallback to text parsing
      const parsed = parseCostAnalysis(data.response);
      setParsedResults(parsed);
    }

    // Show success dialog first
    setShowSuccessDialog(true);
  };

  const handleViewResults = () => {
    setShowSuccessDialog(false);
    setViewState('results');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Description required",
        description: "Please describe your electrical project",
        variant: "destructive"
      });
      return;
    }

    setViewState('processing');
    setJobError(null);

    // Store inputs for potential retry
    const inputs = {
      query: prompt,
      region: location || 'UK',
      projectContext: {
        projectType: projectType,
        projectName: projectName,
        clientInfo: clientInfo,
        additionalInfo: additionalInfo
      },
      businessSettings: businessSettings
    };
    setLastJobInputs(inputs);

    try {
      // Create job using new job queue pattern
      const { data, error } = await supabase.functions.invoke('create-cost-engineer-job', {
        body: inputs
      });

      if (error) throw error;

      // Set job ID to start polling
      setJobId(data.jobId);

      toast({
        title: "Analysis started",
        description: "Generating cost estimate...",
      });
    } catch (error: any) {
      console.error('Error creating job:', error);
      setViewState('input');
      toast({
        title: "Failed to start analysis",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleCancel = async () => {
    if (jobId) {
      await cancelJob();
    }
    setViewState('input');
    setJobId(null);
    setJobError(null);
  };

  const handleRetry = async () => {
    if (!lastJobInputs) {
      // No inputs to retry with, go back to input view
      setViewState('input');
      setJobError(null);
      return;
    }

    setJobError(null);
    setJobId(null);

    try {
      // Create job using stored inputs
      const { data, error } = await supabase.functions.invoke('create-cost-engineer-job', {
        body: lastJobInputs
      });

      if (error) throw error;

      setJobId(data.jobId);

      toast({
        title: "Retrying analysis",
        description: "Generating cost estimate...",
      });
    } catch (error: any) {
      console.error('Error retrying job:', error);
      setJobError(error.message);
      toast({
        title: "Retry failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleNewAnalysis = () => {
    setViewState('input');
    setPrompt("");
    setParsedResults(null);
    setProjectName("");
    setClientInfo("");
    setLocation("");
    setAdditionalInfo("");
    setJobId(null);
    setShowSuccessDialog(false);
  };

  if (viewState === 'processing' && (isPolling || jobError)) {
    // Map job status to stage
    let stage: 'initializing' | 'rag' | 'ai' | 'validation' | 'complete' = 'initializing';
    if (job) {
      if (job.progress < 25) stage = 'initializing';
      else if (job.progress < 70) stage = 'rag';
      else if (job.progress < 100) stage = 'ai';
      else stage = 'complete';
    }

    return (
      <CostAnalysisProcessingView
        progress={{
          stage,
          message: job?.current_step || 'Initializing...'
        }}
        onCancel={handleCancel}
        status={jobError ? 'failed' : 'processing'}
        error={jobError}
        onRetry={handleRetry}
      />
    );
  }

  if (viewState === 'results' && parsedResults) {
    return (
      <CostAnalysisResults
        analysis={parsedResults}
        projectName={projectName}
        originalQuery={originalQueryFromResponse || prompt}
        onNewAnalysis={handleNewAnalysis}
        structuredData={structuredData}
        projectContext={{
          projectName,
          clientInfo,
          location,
          additionalInfo,
          projectType
        }}
      />
    );
  }

  return (
    <>
      {/* Imported Circuit Context Banner */}
      <AnimatePresence>
        {importedContext && (
          <div className="px-4 pt-4">
            <ImportedContextBanner
              source={importedContext.sourceDesign}
              circuitCount={importedContext.context.circuitSummaries.length}
              onUseContext={handleUseImportedContext}
              onDismiss={handleDismissImportedContext}
            />
          </div>
        )}
      </AnimatePresence>

      <CostEngineerInput
        prompt={prompt}
        projectType={projectType}
        projectName={projectName}
        clientInfo={clientInfo}
        location={location}
        additionalInfo={additionalInfo}
        onPromptChange={setPrompt}
        onProjectTypeChange={setProjectType}
        onProjectNameChange={setProjectName}
        onClientInfoChange={setClientInfo}
        onLocationChange={setLocation}
        onAdditionalInfoChange={setAdditionalInfo}
        onGenerate={handleGenerate}
        isProcessing={viewState === 'processing'}
        businessSettings={businessSettings}
        onOpenSettings={() => setShowSettingsDialog(true)}
        hasConfiguredSettings={hasConfiguredSettings}
      />

      {/* Business Settings Dialog - Controlled from Hero button */}
      <BusinessSettingsDialog
        onSettingsChange={handleSettingsChange}
        currentSettings={businessSettings}
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        hideButton={true}
        userId={user?.id}
      />

      {/* Success Dialog */}
      <AgentSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        agentType="cost-engineer"
        onViewResults={handleViewResults}
        timeSavedMinutes={30}
      />
    </>
  );
};

export default CostEngineerInterface;
