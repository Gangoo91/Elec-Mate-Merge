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

          {/* Mobile-first responsive layout */}
          <div className="space-y-6 lg:grid lg:grid-cols-1 xl:grid-cols-3 lg:gap-6 lg:space-y-0">
            {/* Input Panel - Full width on mobile, 2 cols on xl */}
            <div className="xl:col-span-2 space-y-4 mobile-section-spacing">
              {/* Smart Input Section */}
              <Card className="mobile-card border-border/50 bg-card/50">
                <CardHeader className="mobile-padding">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-elec-yellow" />
                      <CardTitle className="mobile-heading">Client Explanation Tool</CardTitle>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="mobile-button-secondary flex-1 sm:flex-none touch-target"
                      >
                        <Lightbulb className="h-4 w-4 mr-1" />
                        Templates
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="mobile-button-secondary flex-1 sm:flex-none touch-target"
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mobile-padding space-y-6">
                  {/* Client Type Selector */}
                  <div className="space-y-3">
                    <Label className="mobile-subheading text-foreground">Who are you explaining this to?</Label>
                    <ClientTypeSelector
                      selected={clientType}
                      onSelect={setClientType}
                    />
                  </div>

                  {/* Templates Collapsible */}
                  <Collapsible open={showTemplates} onOpenChange={setShowTemplates}>
                    <CollapsibleContent className="space-y-4 mt-4">
                      <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Technical Notes Input */}
                  <div className="space-y-3">
                    <Label htmlFor="technical-notes" className="mobile-subheading text-foreground">
                      Technical Findings or Electrical Work
                    </Label>
                    <Textarea
                      id="technical-notes"
                      placeholder="Describe your electrical findings, test results, work completed, or safety concerns. Include specific details like circuit numbers, test readings, or regulation references..."
                      value={technicalNotes}
                      onChange={(e) => setTechnicalNotes(e.target.value)}
                      className="mobile-input-spacing min-h-[120px] resize-none text-foreground"
                      rows={6}
                    />
                    <p className="mobile-small-text text-foreground/70">
                      Be specific about findings. Include BS 7671 regulation references, test readings, and safety classifications (C1/C2/C3) where applicable.
                    </p>
                  </div>

                  {/* Basic Settings */}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="mobile-small-text font-medium text-foreground">Communication Style</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="touch-target mobile-focus text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                          <SelectItem value="reassuring">Reassuring & Calm</SelectItem>
                          <SelectItem value="urgent">Direct & Urgent</SelectItem>
                          <SelectItem value="technical">Technical Detail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="mobile-small-text font-medium text-foreground">Complexity Level</Label>
                      <Select value={readingLevel} onValueChange={setReadingLevel}>
                        <SelectTrigger className="touch-target mobile-focus text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple Language</SelectItem>
                          <SelectItem value="standard">Standard Explanation</SelectItem>
                          <SelectItem value="technical">Technical Detail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                      <Label className="mobile-small-text font-medium text-foreground">Priority Level</Label>
                      <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                        <SelectTrigger className="touch-target mobile-focus text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Routine Work</SelectItem>
                          <SelectItem value="medium">Important Issue</SelectItem>
                          <SelectItem value="high">Safety Concern</SelectItem>
                          <SelectItem value="immediate">Immediate Action Required</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleContent className="space-y-4 mt-4">
                      <div className="space-y-3">
                        <Label className="mobile-small-text font-medium text-foreground">Additional Options</Label>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="mobile-card-compact mobile-interactive flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="space-y-1">
                              <Label className="mobile-small-text font-medium text-foreground">Include Analogies</Label>
                              <p className="text-xs text-foreground/70">Use everyday comparisons to explain technical concepts</p>
                            </div>
                            <Switch
                              checked={includeAnalogy}
                              onCheckedChange={setIncludeAnalogy}
                              className="ml-3"
                            />
                          </div>

                          <div className="mobile-card-compact mobile-interactive flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="space-y-1">
                              <Label className="mobile-small-text font-medium text-foreground">Cost Information</Label>
                              <p className="text-xs text-foreground/70">Include pricing context and potential costs</p>
                            </div>
                            <Switch
                              checked={includeCostInfo}
                              onCheckedChange={setIncludeCostInfo}
                              className="ml-3"
                            />
                          </div>

                          <div className="mobile-card-compact mobile-interactive flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="space-y-1">
                              <Label className="mobile-small-text font-medium text-foreground">Safety Emphasis</Label>
                              <p className="text-xs text-foreground/70">Highlight safety concerns and importance</p>
                            </div>
                            <Switch
                              checked={emphasizeSafety}
                              onCheckedChange={setEmphasizeSafety}
                              className="ml-3"
                            />
                          </div>

                          <div className="mobile-card-compact mobile-interactive flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="space-y-1">
                              <Label className="mobile-small-text font-medium text-foreground">BS 7671 References</Label>
                              <p className="text-xs text-foreground/70">Include UK electrical regulation references</p>
                            </div>
                            <Switch
                              checked={includeBS7671}
                              onCheckedChange={setIncludeBS7671}
                              className="ml-3"
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Generate Button */}
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !technicalNotes.trim()}
                    className="mobile-button-primary w-full touch-target bg-gradient-to-r from-elec-yellow to-elec-yellow/90 hover:from-elec-yellow/90 hover:to-elec-yellow/80 text-black font-semibold h-14 sm:h-16 text-base sm:text-lg shadow-lg shadow-elec-yellow/25 border-0 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        <span className="text-base sm:text-lg">Generating Professional Explanation...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="mr-3 h-6 w-6" />
                        <span className="text-base sm:text-lg">Generate Professional Explanation</span>
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Output Section - Full width on mobile, right column on xl */}
            <div className="space-y-6 mobile-section-spacing">
              {/* Live Preview - Hidden on mobile when no content */}
              <div className="hidden sm:block">
                <LivePreview
                  content={technicalNotes}
                  tone={tone}
                  readingLevel={readingLevel}
                  clientType={clientType}
                  includeAnalogy={includeAnalogy}
                  emphasizeSafety={emphasizeSafety}
                />
              </div>

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