import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calculator, ChevronDown } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { cn } from "@/lib/utils";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCostEngineerGeneration } from "@/hooks/useCostEngineerGeneration";
import CostAnalysisProcessingView from "./CostAnalysisProcessingView";
import CostAnalysisResults from "./CostAnalysisResults";
import { parseCostAnalysis, ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { BusinessSettingsDialog, BusinessSettings, DEFAULT_BUSINESS_SETTINGS } from "./BusinessSettingsDialog";
import { InlineProjectTypeSelector } from "./InlineProjectTypeSelector";
import ProjectTypeSelector from "./ProjectTypeSelector";
import { StickySubmitButton } from "@/components/agents/shared/StickySubmitButton";
import { AgentSuccessDialog } from "@/components/agents/shared/AgentSuccessDialog";
import { AGENT_CONFIG } from "@/components/agents/shared/AgentConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ViewState = 'input' | 'processing' | 'results';

const CostEngineerInterface = () => {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [projectType, setProjectType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
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

  const config = AGENT_CONFIG['cost-engineer'];

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

  const handleFillTestData = () => {
    setProjectName("Smith Residence Full Rewire");
    setClientInfo("Mr & Mrs John Smith");
    setLocation("Manchester, M15 4AA");
    setAdditionalInfo("Limited parking on street. Access to loft required. Working hours: 8am-5pm weekdays only.");
    setProjectType("domestic");
    setPrompt("Complete rewire of a 3-bedroom semi-detached house built in 1970s. Property requires:\n\n- New 18th Edition consumer unit with RCBO protection\n- Complete rewire including new cables and back boxes\n- 12x LED downlights in kitchen (dimmable)\n- 8x LED downlights in living room\n- New sockets throughout (minimum 2 double sockets per bedroom)\n- Outdoor double socket with RCD protection\n- Garden lighting circuit with 4x spike lights\n- Smoke and heat detector system linked to consumer unit\n- All work to comply with BS7671:2018+A3:2024\n\nProperty is occupied, dustsheets and daily cleanup required.");
    
    toast({
      title: "Test data loaded",
      description: "All fields populated with sample project data",
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

  // Character count styling
  const getCharCountClass = () => {
    if (prompt.length < 100) return 'text-white/40';
    if (prompt.length < 500) return 'text-emerald-400';
    return 'text-amber-400';
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
      <div className="space-y-4 pb-24 sm:pb-6">
        {/* Main Project Description */}
        <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <div className="p-1.5 rounded-lg" style={{ background: `${config.gradientFrom}20` }}>
                  <Calculator className="h-4 w-4" style={{ color: config.gradientFrom }} />
                </div>
                Describe Your Project
              </Label>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-lg transition-colors",
                getCharCountClass(),
                prompt.length >= 100 && "bg-white/5"
              )}>
                {prompt.length} {prompt.length >= 100 && '✓'}
              </span>
            </div>

            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the electrical work needed in detail..."
              className="agent-input"
              rows={5}
              autoComplete="off"
              spellCheck={true}
            />

            <p className="text-xs sm:text-sm text-white/50">
              100+ characters recommended for accurate pricing
            </p>
          </div>
        </div>

        {/* Project Type */}
        <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
          <div className="space-y-3">
            <Label className="text-base sm:text-lg font-semibold">Project Type</Label>
            <InlineProjectTypeSelector
              selectedType={projectType}
              onTypeChange={setProjectType}
              agentType="cost-engineer"
            />
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="text-sm font-medium flex items-center gap-1 touch-manipulation"
              style={{ color: config.gradientFrom }}
            >
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                showExamples && "rotate-180"
              )} />
              {showExamples ? 'Hide examples' : 'Show examples'}
            </button>
          </div>
        </div>

        {/* Examples - Collapsible */}
        {showExamples && (
          <div className="animate-slide-up">
            <ProjectTypeSelector
              selectedType={projectType}
              onTypeChange={setProjectType}
              onExampleSelect={handleExampleSelect}
            />
          </div>
        )}

        {/* Optional Project Details */}
        <Collapsible open={showOptionalSettings} onOpenChange={setShowOptionalSettings}>
          <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-medium">Project Details</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                  Optional
                </span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showOptionalSettings && "rotate-180"
              )} />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0 space-y-4">
              <p className="text-xs text-white/50 pb-2">
                Add details for +15% accuracy
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MobileInputWrapper
                  label="Project Name"
                  value={projectName}
                  onChange={setProjectName}
                  placeholder="e.g., Smith Residence"
                  inputMode="text"
                />
                <MobileInputWrapper
                  label="Client Name"
                  value={clientInfo}
                  onChange={setClientInfo}
                  placeholder="e.g., Mr & Mrs Smith"
                  inputMode="text"
                />
              </div>

              <MobileInputWrapper
                label="Location/Postcode"
                value={location}
                onChange={setLocation}
                placeholder="e.g., Manchester, M1 1AA"
                inputMode="text"
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-white/80">Additional Requirements</Label>
                <Textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Access, parking, special conditions..."
                  className="agent-input min-h-[80px]"
                  rows={3}
                  autoComplete="off"
                  spellCheck={true}
                />
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Business Settings */}
        <Collapsible open={showBusinessSettings} onOpenChange={setShowBusinessSettings}>
          <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-medium">Business Settings</span>
                <span className={cn(
                  "text-[10px] sm:text-xs px-2 py-0.5 rounded-full",
                  hasBusinessSettings ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
                )}>
                  {hasBusinessSettings ? "✓ Configured" : "Optional"}
                </span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showBusinessSettings && "rotate-180"
              )} />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <p className="text-xs text-white/50 pb-3">
                Configure profitability analysis
              </p>
              <BusinessSettingsDialog
                onSettingsChange={setBusinessSettings}
                currentSettings={businessSettings}
              />
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Sticky Generate Button */}
        <StickySubmitButton
          agentType="cost-engineer"
          onClick={handleGenerate}
          isDisabled={!isValid}
        />
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
