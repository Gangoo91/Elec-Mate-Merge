import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Lightbulb, Zap, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ElectricalHeroSection from "@/components/electrician-tools/ai-tools/client-explainer/ElectricalHeroSection";
import ClientTypeSelector, { ClientType } from "@/components/electrician-tools/ai-tools/client-explainer/ClientTypeSelector";
import TemplateSelector, { Template } from "@/components/electrician-tools/ai-tools/client-explainer/TemplateSelector";
import LivePreview from "@/components/electrician-tools/ai-tools/client-explainer/LivePreview";
import OutputPanel from "@/components/electrician-tools/ai-tools/client-explainer/OutputPanel";

const ClientExplainerPage = () => {
  const { toast } = useToast();
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [tone, setTone] = useState("professional");
  const [readingLevel, setReadingLevel] = useState("standard");
  const [clientType, setClientType] = useState<ClientType>("homeowner");
  const [urgencyLevel, setUrgencyLevel] = useState("medium");
  const [includeAnalogy, setIncludeAnalogy] = useState(true);
  const [includeCostInfo, setIncludeCostInfo] = useState(false);
  const [emphasizeSafety, setEmphasizeSafety] = useState(true);
  const [includeBS7671, setIncludeBS7671] = useState(false);
  const [generatedExplanation, setGeneratedExplanation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSelectTemplate = (template: Template) => {
    setTechnicalNotes(template.sample);
    // Set appropriate settings based on template
    switch (template.urgency) {
      case "high":
        setTone("urgent");
        setEmphasizeSafety(true);
        break;
      case "medium":
        setTone("professional");
        break;
      case "low":
        setTone("friendly");
        break;
    }
    setUrgencyLevel(template.urgency);
    setShowTemplates(false);
  };

  const handleGenerate = async () => {
    if (!technicalNotes.trim()) {
      toast({
        title: "Error",
        description: "Please enter technical notes to explain",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-electrical-report', {
        body: {
          template: 'client-explainer',
          formData: {
            technicalNotes,
            tone,
            readingLevel,
            clientType,
            urgencyLevel,
            includeAnalogy,
            includeCostInfo,
            emphasizeSafety,
            includeBS7671
          }
        }
      });

      if (error) throw error;

      setGeneratedExplanation(data.report);
      toast({
        title: "Success",
        description: "Client explanation generated successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error generating explanation:', error);
      toast({
        title: "Error",
        description: "Failed to generate explanation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getCurrentSettings = () => ({
    tone,
    readingLevel,
    clientType,
    includeAnalogy,
    emphasizeSafety,
    includeCostInfo
  });

  return (
    <div className="min-h-screen bg-elec-grey">
      <div className="mobile-padding py-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link to="/electrician-tools/ai-tooling">
              <Button 
                variant="outline" 
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to AI Tools
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <ElectricalHeroSection />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            {/* Input Panel - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2 space-y-6">
              {/* Smart Input Section */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-elec-yellow" />
                      <CardTitle>Smart Input Assistant</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="text-xs"
                      >
                        <Lightbulb className="h-3 w-3 mr-1" />
                        Templates
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="text-xs"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Advanced
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Client Type Selector */}
                  <ClientTypeSelector
                    selected={clientType}
                    onSelect={setClientType}
                  />

                  {/* Templates Collapsible */}
                  <Collapsible open={showTemplates} onOpenChange={setShowTemplates}>
                    <CollapsibleContent className="space-y-4">
                      <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Technical Notes Input */}
                  <div className="space-y-3">
                    <Label htmlFor="technical-notes" className="text-sm font-medium">
                      Technical Notes or Findings
                    </Label>
                    <Textarea
                      id="technical-notes"
                      placeholder="Enter your technical findings, test results, issues discovered, or use a template above..."
                      value={technicalNotes}
                      onChange={(e) => setTechnicalNotes(e.target.value)}
                      className="min-h-[120px] resize-none"
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Be specific about what you found. Include test results, observations, and any safety concerns.
                    </p>
                  </div>

                  {/* Basic Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="reassuring">Reassuring</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Reading Level</Label>
                      <Select value={readingLevel} onValueChange={setReadingLevel}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple (Grade 6-8)</SelectItem>
                          <SelectItem value="standard">Standard (Grade 9-12)</SelectItem>
                          <SelectItem value="technical">Technical (Professional)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Urgency</Label>
                      <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="immediate">Immediate Action</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Include Analogies</Label>
                            <p className="text-xs text-muted-foreground">Use everyday comparisons</p>
                          </div>
                          <Switch
                            checked={includeAnalogy}
                            onCheckedChange={setIncludeAnalogy}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Cost Information</Label>
                            <p className="text-xs text-muted-foreground">Include pricing context</p>
                          </div>
                          <Switch
                            checked={includeCostInfo}
                            onCheckedChange={setIncludeCostInfo}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Safety Emphasis</Label>
                            <p className="text-xs text-muted-foreground">Highlight safety concerns</p>
                          </div>
                          <Switch
                            checked={emphasizeSafety}
                            onCheckedChange={setEmphasizeSafety}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">BS 7671 References</Label>
                            <p className="text-xs text-muted-foreground">Include regulation references</p>
                          </div>
                          <Switch
                            checked={includeBS7671}
                            onCheckedChange={setIncludeBS7671}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Generate Button */}
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !technicalNotes.trim()}
                    className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium h-12"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Professional Explanation...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-5 w-5" />
                        Generate Client Explanation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview and Output */}
            <div className="space-y-6">
              {/* Live Preview */}
              <LivePreview
                content={technicalNotes}
                tone={tone}
                readingLevel={readingLevel}
                clientType={clientType}
                includeAnalogy={includeAnalogy}
                emphasizeSafety={emphasizeSafety}
              />

              {/* Output Panel */}
              <OutputPanel
                content={generatedExplanation}
                settings={getCurrentSettings()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientExplainerPage;