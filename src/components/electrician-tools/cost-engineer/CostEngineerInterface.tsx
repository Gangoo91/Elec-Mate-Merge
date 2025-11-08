import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Lightbulb, Sparkles } from "lucide-react";

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
    <div className="space-y-4 sm:space-y-6">
      {/* Business Settings - Top Priority */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            💰 Business Profitability Settings
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Configure your overheads and profit targets to get accurate break-even and quote recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessSettingsDialog 
            onSettingsChange={setBusinessSettings}
            currentSettings={businessSettings}
          />
        </CardContent>
      </Card>

      {/* Project Information - Always Visible at Top */}
      <Card className="border-elec-yellow/20 bg-elec-card/50">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            Project Information
            <span className="text-xs font-normal px-2 py-1 rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
              +15% accuracy
            </span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Add project details for more precise pricing and professional reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Smith Residence Rewire"
                className="touch-manipulation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-info">Client Name</Label>
              <Input
                id="client-info"
                value={clientInfo}
                onChange={(e) => setClientInfo(e.target.value)}
                placeholder="e.g., Mr & Mrs Smith"
                className="touch-manipulation"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location/Postcode</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Manchester, M1 1AA"
              className="touch-manipulation"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-info">Additional Requirements</Label>
            <Textarea
              id="additional-info"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g., Access restrictions, parking arrangements, special requirements..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Type Selector */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Calculator className="h-6 w-6 text-elec-yellow" />
            Select Project Type
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
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
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            Describe Your Project
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Be specific about the work required for accurate material pricing and labour estimates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="project-description" className="text-base font-semibold">
                Project Description
              </Label>
              <span className={`text-xs ${prompt.length >= 100 && prompt.length <= 300 ? 'text-green-500' : prompt.length < 100 ? 'text-yellow-500' : 'text-orange-500'}`}>
                {prompt.length} characters {prompt.length >= 100 && prompt.length <= 300 ? '✓' : prompt.length < 100 ? '(add more detail)' : '(very detailed)'}
              </span>
            </div>
            <Textarea
              id="project-description"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Complete rewire of 3-bedroom house including new consumer unit, LED downlights throughout, outdoor power and garden lighting..."
              className="min-h-[180px] sm:min-h-[200px] text-base"
            />
            <p className="text-xs text-muted-foreground">
              💡 Tip: Include property type, number of rooms, specific requirements, and special features
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleFillTestData}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 h-12 sm:h-14 text-sm sm:text-base touch-manipulation"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Fill Test Data
            </Button>
            
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold h-14 sm:h-16 text-base sm:text-lg touch-manipulation"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Cost Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostEngineerInterface;
