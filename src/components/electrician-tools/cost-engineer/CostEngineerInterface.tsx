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
  

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
    toast({
      title: "Example loaded",
      description: "You can edit this or generate directly",
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
      const { data, error } = await supabase.functions.invoke('cost-engineer-v3', {
        body: { 
          query: prompt,
          region: location || 'UK',
          projectContext: {
            projectType: projectType,
            projectName: projectName,
            clientInfo: clientInfo,
            additionalInfo: additionalInfo
          }
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to invoke cost-engineer-v3');
      }

      if (!data || !data.success) {
        throw new Error(data?.error || 'Cost Engineer returned unsuccessful response');
      }

      // V3 returns both narrative text AND structured data
      const aiResponse = data.response;
      const structuredData = data.structuredData;

      // Store structured data for enhanced panels
      setStructuredData(structuredData);

      // Use structured data if available, otherwise parse markdown
      if (structuredData && structuredData.summary) {
        setParsedResults({
          totalCost: structuredData.summary.grandTotal,
          materialsTotal: structuredData.materials?.subtotal || 0,
          labourTotal: structuredData.labour?.subtotal || 0,
          materials: structuredData.materials?.items || [],
          labour: {
            hours: structuredData.labour?.tasks?.reduce((sum: number, t: any) => sum + (t.hours || 0), 0) || 0,
            rate: 50,
            total: structuredData.labour?.subtotal || 0,
            description: structuredData.labour?.tasks?.[0]?.description || 'Installation labour'
          },
          additionalCosts: [],
          vatAmount: structuredData.summary.vat,
          vatRate: 20,
          subtotal: structuredData.summary.subtotal,
          rawText: aiResponse
        });
      } else {
        // Fallback to parsing markdown
        const parsed = parseCostAnalysis(aiResponse);
        setParsedResults(parsed);
      }
      
      setTimeout(() => {
        setViewState('results');
        toast({
          title: "Analysis complete!",
          description: "Your cost breakdown is ready",
        });
      }, 2000);

    } catch (error: any) {
      console.error('Cost analysis error:', error);
      setViewState('input');
      
      toast({
        title: "Analysis failed",
        description: error.message || 'Failed to generate cost analysis. Please try again.',
        variant: "destructive"
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

  if (viewState === 'processing') {
    return <CostAnalysisProcessingView onCancel={handleCancel} />;
  }

  if (viewState === 'results' && parsedResults) {
    return (
      <CostAnalysisResults 
        analysis={parsedResults}
        projectName={projectName}
        onNewAnalysis={handleNewAnalysis}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
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

          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold h-14 sm:h-16 text-base sm:text-lg touch-manipulation"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Generate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostEngineerInterface;
