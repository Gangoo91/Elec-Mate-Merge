import { useState } from "react";
import { Calculator, ChevronDown, Home, Building2, Factory, Sparkles, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCostEngineerGeneration } from "@/hooks/useCostEngineerGeneration";
import CostAnalysisProcessingView from "./CostAnalysisProcessingView";
import CostAnalysisResults from "./CostAnalysisResults";
import { parseCostAnalysis, ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { BusinessSettingsDialog, BusinessSettings, DEFAULT_BUSINESS_SETTINGS } from "./BusinessSettingsDialog";
import ProjectTypeSelector from "./ProjectTypeSelector";
import { AgentSuccessDialog } from "@/components/agents/shared/AgentSuccessDialog";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOSTextarea } from "@/components/ui/ios-textarea";
import { IOSInput } from "@/components/ui/ios-input";
import { IOSSegmentedControl, SegmentOption } from "@/components/ui/ios-segmented-control";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ViewState = 'input' | 'processing' | 'results';
type ProjectType = 'domestic' | 'commercial' | 'industrial';

const PROJECT_TYPE_OPTIONS: SegmentOption<ProjectType>[] = [
  { value: 'domestic', label: 'Domestic', icon: <Home className="h-4 w-4" /> },
  { value: 'commercial', label: 'Commercial', icon: <Building2 className="h-4 w-4" /> },
  { value: 'industrial', label: 'Industrial', icon: <Factory className="h-4 w-4" /> },
];

const CostEngineerInterface = () => {
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
  const [showExamples, setShowExamples] = useState(false);
  const [showOptionalSettings, setShowOptionalSettings] = useState(false);
  const [showBusinessSettings, setShowBusinessSettings] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Use job queue pattern with polling
  const { job, isPolling, cancelJob } = useCostEngineerGeneration({
    jobId,
    onComplete: (data) => {
      handleJobComplete(data);
    },
    onError: (error) => {
      setViewState('input');
      toast({
        title: "Generation failed",
        description: error,
        variant: "destructive"
      });
    }
  });

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
    setShowExamples(false);
    toast({
      title: "Example loaded",
      description: "You can edit this or generate directly",
    });
  };

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

    try {
      // Create job using new job queue pattern
      const { data, error } = await supabase.functions.invoke('create-cost-engineer-job', {
        body: {
          query: prompt,
          region: location || 'UK',
          projectContext: {
            projectType: projectType,
            projectName: projectName,
            clientInfo: clientInfo,
            additionalInfo: additionalInfo
          },
          businessSettings: businessSettings
        }
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

  if (viewState === 'processing' && isPolling) {
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

  const isValid = prompt.trim().length > 0;
  const hasBusinessSettings = businessSettings && Object.keys(businessSettings).length > 0;

  return (
    <>
      <div className="flex-1 flex flex-col px-4 pb-32">
        {/* Hero Section */}
        <div className="text-center py-6 ios-stagger-children">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 mb-4"
          >
            <Calculator className="h-8 w-8 text-elec-yellow" />
          </motion.div>
          <h1 className="text-ios-title-1 text-white mb-1">Cost Engineer</h1>
          <p className="text-ios-body text-white/60">Material pricing & labour analysis</p>
        </div>

        {/* Main Form */}
        <div className="space-y-4 ios-stagger-children">
          {/* Project Description Card */}
          <Card variant="ios-elevated" className="p-5">
            <CardContent className="p-0 space-y-4">
              <IOSTextarea
                label="Describe Your Project"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the electrical work needed in detail. Include scope, specifications, and any special requirements..."
                showCharCount
                minChars={100}
                hint="100+ characters recommended for accurate pricing"
                rows={5}
              />
            </CardContent>
          </Card>

          {/* Project Type Card */}
          <Card variant="ios" className="p-5">
            <CardContent className="p-0 space-y-4">
              <label className="block text-ios-subhead font-medium text-white/80">
                Project Type
              </label>
              <IOSSegmentedControl
                options={PROJECT_TYPE_OPTIONS}
                value={projectType}
                onChange={setProjectType}
                size="large"
              />

              {/* Examples Toggle */}
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="flex items-center gap-1.5 text-ios-footnote font-medium text-elec-yellow ios-pressable"
              >
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  showExamples && "rotate-180"
                )} />
                {showExamples ? 'Hide examples' : 'View example projects'}
              </button>
            </CardContent>
          </Card>

          {/* Examples Dropdown */}
          <AnimatePresence>
            {showExamples && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectTypeSelector
                  selectedType={projectType}
                  onTypeChange={setProjectType}
                  onExampleSelect={handleExampleSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Optional Project Details */}
          <Collapsible open={showOptionalSettings} onOpenChange={setShowOptionalSettings}>
            <Card variant="ios" className="overflow-hidden">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between touch-manipulation ios-pressable">
                <div className="flex items-center gap-3">
                  <span className="text-ios-body font-medium text-white">Project Details</span>
                  <span className="text-ios-caption-1 px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                    Optional
                  </span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-white/40 transition-transform duration-200",
                  showOptionalSettings && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="p-4 pt-0 space-y-4 border-t border-white/5">
                  <p className="text-ios-caption-1 text-white/50 pb-1">
                    Add details for +15% accuracy
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <IOSInput
                      label="Project Name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g., Smith Residence"
                    />
                    <IOSInput
                      label="Client Name"
                      value={clientInfo}
                      onChange={(e) => setClientInfo(e.target.value)}
                      placeholder="e.g., Mr & Mrs Smith"
                    />
                  </div>

                  <IOSInput
                    label="Location / Postcode"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Manchester, M1 1AA"
                  />

                  <IOSTextarea
                    label="Additional Requirements"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Access restrictions, parking, special conditions..."
                    rows={3}
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Business Settings */}
          <Collapsible open={showBusinessSettings} onOpenChange={setShowBusinessSettings}>
            <Card variant="ios" className="overflow-hidden">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between touch-manipulation ios-pressable">
                <div className="flex items-center gap-3">
                  <Settings2 className="h-5 w-5 text-white/60" />
                  <span className="text-ios-body font-medium text-white">Business Settings</span>
                  <span className={cn(
                    "text-ios-caption-1 px-2 py-0.5 rounded-full",
                    hasBusinessSettings ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                  )}>
                    {hasBusinessSettings ? "Configured" : "Optional"}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-white/40 transition-transform duration-200",
                  showBusinessSettings && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="p-4 pt-0 border-t border-white/5">
                  <p className="text-ios-caption-1 text-white/50 pb-3">
                    Configure profitability analysis
                  </p>
                  <BusinessSettingsDialog
                    onSettingsChange={setBusinessSettings}
                    currentSettings={businessSettings}
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>

      {/* Sticky Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 safe-bottom bg-gradient-to-t from-black via-black/95 to-transparent z-40">
        <div className="max-w-md mx-auto">
          <Button
            variant="ios-primary"
            size="ios-large"
            className="w-full"
            onClick={handleGenerate}
            disabled={!isValid}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Generate Cost Analysis
          </Button>

          {!isValid && (
            <p className="text-ios-caption-1 text-white/40 text-center mt-2">
              Describe your project to continue
            </p>
          )}
        </div>
      </div>

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
