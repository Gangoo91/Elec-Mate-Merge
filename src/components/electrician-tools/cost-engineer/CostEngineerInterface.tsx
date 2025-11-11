import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calculator, Lightbulb, Sparkles } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProjectTypeSelector from "./ProjectTypeSelector";
import CostAnalysisProcessingView from "./CostAnalysisProcessingView";
import CostAnalysisResults from "./CostAnalysisResults";
import { parseCostAnalysis, ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { BusinessSettingsDialog, BusinessSettings, DEFAULT_BUSINESS_SETTINGS } from "./BusinessSettingsDialog";

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
  

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
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
    setPrompt("Complete rewire of a 3-bedroom semi-detached house built in 1970s. Property requires:\n\n- New 18th Edition consumer unit with RCBO protection\n- Complete rewire including new cables and back boxes\n- 12x LED downlights in kitchen (dimmable)\n- 8x LED downlights in living room\n- New sockets throughout (minimum 2 double sockets per bedroom)\n- Outdoor double socket with RCD protection\n- Garden lighting circuit with 4x spike lights\n- Smoke and heat detector system linked to consumer unit\n- All work to comply with BS 7671:2018+A2:2022\n\nProperty is occupied, dustsheets and daily cleanup required.");
    
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

    try {
      // PHASE 1: Get core estimate (fast, <120s to avoid 150s gateway timeout)
      const { data, error } = await supabase.functions.invoke('cost-engineer-v3', {
        body: { 
          query: prompt,
          region: location || 'UK',
          projectContext: {
            projectType: projectType,
            projectName: projectName,
            clientInfo: clientInfo,
            additionalInfo: additionalInfo
          },
          businessSettings: businessSettings,
          skipProfitability: true // Skip profitability in first call
        }
      });

      if (error) {
        console.error('Core estimate error:', error);
        throw new Error(error.message || 'Failed to get core estimate');
      }

      if (!data || !data.success) {
        throw new Error(data?.error || 'Cost Engineer returned unsuccessful response');
      }

      // Store original query from response
      if (data.originalQuery) {
        setOriginalQueryFromResponse(data.originalQuery);
      }

      // Store core estimate data
      const coreStructuredData = data.structuredData;
      setStructuredData(coreStructuredData);

      // Parse core results
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
        const parsed = parseCostAnalysis(data.response);
        setParsedResults(parsed);
      }

      // Show results immediately
      setViewState('results');
      toast({
        title: "Core estimate ready!",
        description: "Fetching profitability analysis...",
      });

      // PHASE 2: Get profitability analysis in background (only if business settings exist)
      if (businessSettings && Object.keys(businessSettings).length > 0) {
        try {
          const { data: profData, error: profError } = await supabase.functions.invoke('cost-engineer-v3', {
            body: {
              query: prompt,
              region: location || 'UK',
              projectContext: {
                projectType: projectType,
                projectName: projectName,
                clientInfo: clientInfo,
                additionalInfo: additionalInfo
              },
              businessSettings: businessSettings,
              skipProfitability: false // Get profitability this time
            }
          });

          if (!profError && profData?.success && profData.structuredData) {
            // Merge profitability data into existing structured data
            setStructuredData({
              ...coreStructuredData,
              profitabilityAnalysis: profData.structuredData.profitabilityAnalysis
            });

            toast({
              title: "Profitability analysis complete!",
              description: "Full analysis with break-even pricing ready",
            });
          }
        } catch (profError: any) {
          console.warn('Profitability fetch failed:', profError);
          toast({
            title: "Note",
            description: "Core estimate ready. Profitability analysis unavailable.",
          });
        }
      }

    } catch (error: any) {
      console.error('Cost analysis error:', error);
      setViewState('input');
      
      // Handle timeout specifically
      if (error.name === 'AbortError') {
        toast({
          title: "Analysis timeout",
          description: "Request took longer than expected. Try a simpler query or contact support.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Analysis failed",
          description: error.message || 'Failed to generate cost analysis. Please try again.',
          variant: "destructive"
        });
      }
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

  if (viewState === 'processing') {
    return <CostAnalysisProcessingView onCancel={handleCancel} />;
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
    <div className="mobile-section-spacing">
      {/* Business Settings - Top Priority */}
      <Card className="mobile-card border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-dark/50">
        <CardHeader className="space-y-2 px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 flex-wrap">
            <span className="text-2xl">💰</span>
            <span>Business Profitability Settings</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base leading-relaxed">
            Configure your overheads and profit targets to get accurate break-even and quote recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          <BusinessSettingsDialog 
            onSettingsChange={setBusinessSettings}
            currentSettings={businessSettings}
          />
        </CardContent>
      </Card>

      {/* Project Information - Always Visible at Top */}
      <Card className="mobile-card border-elec-yellow/20 bg-elec-card/50">
        <CardHeader className="space-y-2">
          <CardTitle className="mobile-heading flex items-center gap-2">
            Project Information
            <span className="text-xs font-normal px-2 py-1 rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
              +15% accuracy
            </span>
          </CardTitle>
          <CardDescription className="mobile-text">
            Add project details for more precise pricing and professional reports
          </CardDescription>
        </CardHeader>
        <CardContent className="mobile-input-spacing">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileInputWrapper
              label="Project Name"
              value={projectName}
              onChange={setProjectName}
              placeholder="e.g., Smith Residence Rewire"
              hint="Client or property name"
              inputMode="text"
            />
            <MobileInputWrapper
              label="Client Name"
              value={clientInfo}
              onChange={setClientInfo}
              placeholder="e.g., Mr & Mrs Smith"
              hint="Customer contact name"
              inputMode="text"
            />
          </div>

          <MobileInputWrapper
            label="Location/Postcode"
            value={location}
            onChange={setLocation}
            placeholder="e.g., Manchester, M1 1AA"
            hint="Project location for regional pricing"
            inputMode="text"
          />

          <div className="space-y-2">
            <Label className="mobile-small-text font-semibold">
              Additional Requirements
            </Label>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g., Access restrictions, parking arrangements, special requirements..."
              className="min-h-[120px] text-base resize-none"
              style={{ fontSize: '16px' }}
            />
            <p className="mobile-small-text text-muted-foreground">
              Optional: Access, parking, working hours, special conditions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Project Type Selector */}
      <Card className="mobile-card border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-dark/50">
        <CardHeader className="space-y-2">
          <CardTitle className="mobile-heading flex items-center gap-2">
            <Calculator className="h-6 w-6 text-elec-yellow" />
            Select Project Type
          </CardTitle>
          <CardDescription className="mobile-text">
            Choose your project category and browse examples for inspiration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectTypeSelector
            selectedType={projectType}
            onTypeChange={setProjectType}
            onExampleSelect={handleExampleSelect}
          />
        </CardContent>
      </Card>

      {/* Describe Your Project */}
      <Card className="mobile-card border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-dark/50">
        <CardHeader className="space-y-2">
          <CardTitle className="mobile-heading flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            Describe Your Project
          </CardTitle>
          <CardDescription className="mobile-text">
            Be specific about the work required for accurate material pricing and labour estimates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="project-description" className="mobile-text font-semibold">
                Project Description
              </Label>
              <span className={`mobile-small-text font-medium px-2 py-1 rounded ${
                prompt.length >= 100 && prompt.length <= 300 
                  ? 'text-green-500 bg-green-500/10' 
                  : prompt.length < 100 
                  ? 'text-yellow-500 bg-yellow-500/10' 
                  : 'text-orange-500 bg-orange-500/10'
              }`}>
                {prompt.length} chars
                {prompt.length >= 100 && prompt.length <= 300 ? ' ✓' : ''}
              </span>
            </div>
            <Textarea
              id="project-description"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Complete rewire of 3-bedroom house including new consumer unit, LED downlights throughout, outdoor power and garden lighting..."
              className="min-h-[200px] sm:min-h-[220px] text-base resize-none"
              style={{ fontSize: '16px' }}
            />
            <p className="mobile-small-text text-muted-foreground">
              💡 Tip: Include property type, number of rooms, specific requirements, and special features
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <MobileButton
              variant="outline"
              size="default"
              onClick={handleFillTestData}
              className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Fill Test Data
            </MobileButton>
            
            <MobileButton 
              variant="elec"
              size="lg"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="w-full font-semibold text-lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Cost Analysis
            </MobileButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostEngineerInterface;
