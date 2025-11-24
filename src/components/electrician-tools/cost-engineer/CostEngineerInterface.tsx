import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";

import { toast } from "@/hooks/use-toast";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";
import CostAnalysisProcessingView from "./CostAnalysisProcessingView";
import CostAnalysisResults from "./CostAnalysisResults";
import { parseCostAnalysis, ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { BusinessSettingsDialog, BusinessSettings, DEFAULT_BUSINESS_SETTINGS } from "./BusinessSettingsDialog";
import { CostEngineerFormSection } from "./CostEngineerFormSection";
import { InlineProjectTypeSelector } from "./InlineProjectTypeSelector";
import { CollapsibleSection } from "./CollapsibleSection";
import { StickyGenerateButton } from "./StickyGenerateButton";
import ProjectTypeSelector from "./ProjectTypeSelector";

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

  // Use the proven useSimpleAgent hook (same as all other working agents)
  const { callAgent, isLoading, progress } = useSimpleAgent();

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

    // Simple call using the proven useSimpleAgent pattern
    const response = await callAgent('cost-engineer', {
      query: prompt,
      region: location || 'UK',
      projectContext: {
        projectType: projectType,
        projectName: projectName,
        clientInfo: clientInfo,
        additionalInfo: additionalInfo
      },
      businessSettings: businessSettings,
      skipProfitability: false
    });

    // Handle response - same pattern as all other working agents
    if (response?.success && response.data) {
      const data = response.data;

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

      setViewState('results');
      toast({
        title: "Analysis complete!",
        description: "Cost estimate ready to view",
      });
    }
  };

  const handleCancel = () => {
    setViewState('input');
    toast({
      title: "Analysis cancelled",
      description: "You can start a new analysis anytime",
    });
  };

  const handleNewAnalysis = () => {
    setViewState('input');
    setPrompt("");
    setParsedResults(null);
    setProjectName("");
    setClientInfo("");
    setLocation("");
    setAdditionalInfo("");
  };

  if (viewState === 'processing' && isLoading) {
    return <CostAnalysisProcessingView progress={progress} onCancel={handleCancel} />;
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
    <div className="space-y-4 pb-24 sm:pb-6">
      {/* Main Project Description */}
      <CostEngineerFormSection className="bg-elec-grey/5 border-elec-grey/20">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="project-description" className="text-lg sm:text-xl font-semibold">
              ✨ Describe Your Project
            </Label>
            <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded ${
              prompt.length >= 100 && prompt.length <= 300 
                ? 'text-green-500 bg-green-500/10' 
                : prompt.length < 100 
                ? 'text-muted-foreground bg-muted' 
                : 'text-orange-500 bg-orange-500/10'
            }`}>
              {prompt.length} chars {prompt.length >= 100 ? '✓' : ''}
            </span>
          </div>
          <Textarea
            id="project-description"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the electrical work needed..."
            className="min-h-[120px] text-base resize-none"
            rows={4}
            autoComplete="off"
            spellCheck={true}
            style={{ fontSize: '16px' }}
          />
          <p className="text-sm text-muted-foreground">
            💡 100+ characters recommended for accurate pricing
          </p>
        </div>
      </CostEngineerFormSection>

      {/* Project Type - Inline */}
      <CostEngineerFormSection className="bg-elec-grey/5 border-elec-grey/20">
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold">🏗️ Project Type</Label>
          <InlineProjectTypeSelector 
            selectedType={projectType}
            onTypeChange={setProjectType}
          />
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="text-sm text-elec-yellow hover:underline"
          >
            {showExamples ? '↑ Hide examples' : '↓ Show 8 examples'}
          </button>
        </div>
      </CostEngineerFormSection>

      {/* Examples - Collapsible */}
      {showExamples && (
        <div className="animate-in fade-in duration-200">
          <ProjectTypeSelector
            selectedType={projectType}
            onTypeChange={setProjectType}
            onExampleSelect={handleExampleSelect}
          />
        </div>
      )}

      {/* Optional Settings - Collapsed by default */}
      <CostEngineerFormSection className="bg-elec-grey/5 border-elec-grey/20">
        <CollapsibleSection
          title="Optional Settings"
          subtitle="Add project details for +15% accuracy"
          badge="Optional"
          defaultOpen={false}
        >
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
            <Label className="text-sm font-semibold">Additional Requirements</Label>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Access, parking, special conditions..."
              className="min-h-[80px] sm:min-h-[100px] text-base resize-none"
              rows={3}
              autoComplete="off"
              spellCheck={true}
              style={{ fontSize: '16px' }}
            />
          </div>
        </CollapsibleSection>
      </CostEngineerFormSection>

      {/* Business Settings - Collapsed by default */}
      <CostEngineerFormSection className="bg-elec-grey/5 border-elec-grey/20">
        <CollapsibleSection
          title="Business Settings"
          subtitle={hasBusinessSettings ? "Profitability analysis configured" : "Configure profitability analysis"}
          badge={hasBusinessSettings ? "✓ Configured" : "Optional"}
          badgeVariant={hasBusinessSettings ? "configured" : "optional"}
          defaultOpen={false}
        >
          <BusinessSettingsDialog 
            onSettingsChange={setBusinessSettings}
            currentSettings={businessSettings}
          />
        </CollapsibleSection>
      </CostEngineerFormSection>

      {/* Sticky Generate Button */}
      <StickyGenerateButton>
        <MobileButton 
          variant="elec"
          size="lg"
          onClick={handleGenerate}
          disabled={!isValid}
          className="w-full font-semibold text-base sm:text-lg h-14"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Generate Cost Analysis
        </MobileButton>
      </StickyGenerateButton>

      {/* Test Data Button - Desktop only */}
      <div className="hidden sm:block">
        <MobileButton
          variant="outline"
          size="default"
          onClick={handleFillTestData}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Fill Test Data
        </MobileButton>
      </div>
    </div>
  );
};

export default CostEngineerInterface;
