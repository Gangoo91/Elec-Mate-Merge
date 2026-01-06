import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Loader2, Lightbulb, Zap, Megaphone, Brain,
  ChevronDown, Settings2, Sparkles, Users, Shield, BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ClientTypeSelector, { ClientType } from "@/components/electrician-tools/ai-tools/client-explainer/ClientTypeSelector";
import TemplateSelector, { Template } from "@/components/electrician-tools/ai-tools/client-explainer/TemplateSelector";
import OutputPanel from "@/components/electrician-tools/ai-tools/client-explainer/OutputPanel";
import { cn } from "@/lib/utils";

const ClientExplainerPage = () => {
  const navigate = useNavigate();
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

  const toggleOptions = [
    { key: 'includeAnalogy', label: 'Include Analogies', desc: 'Use everyday comparisons', icon: Lightbulb, value: includeAnalogy, onChange: setIncludeAnalogy },
    { key: 'emphasizeSafety', label: 'Safety Emphasis', desc: 'Highlight safety concerns', icon: Shield, value: emphasizeSafety, onChange: setEmphasizeSafety },
    { key: 'includeCostInfo', label: 'Cost Information', desc: 'Include pricing context', icon: Zap, value: includeCostInfo, onChange: setIncludeCostInfo },
    { key: 'includeBS7671', label: 'BS 7671 References', desc: 'Include regulation refs', icon: BookOpen, value: includeBS7671, onChange: setIncludeBS7671 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('/electrician-tools/ai-tooling')}
            className="flex items-center gap-2 text-foreground active:opacity-70 transition-opacity touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">AI Tools</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl p-5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.03] via-transparent to-rose-500/[0.02] pointer-events-none" />

          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/20">
              <Megaphone className="h-7 w-7 text-pink-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Client Explainer</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Convert technical findings to client-friendly explanations</p>
            </div>
          </div>
        </div>

        {/* Client Type Selector */}
        <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            <h2 className="font-semibold text-foreground">Who are you explaining to?</h2>
          </div>
          <ClientTypeSelector
            selected={clientType}
            onSelect={setClientType}
          />
        </div>

        {/* Templates Section (Collapsible) */}
        <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl overflow-hidden">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full flex items-center justify-between p-4 min-h-[56px] touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <Lightbulb className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Templates</h3>
                <p className="text-xs text-muted-foreground">Quick-start with common scenarios</p>
              </div>
            </div>
            <motion.div animate={{ rotate: showTemplates ? 180 : 0 }}>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showTemplates && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-border/30 pt-4">
                  <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Notes Input */}
        <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            <h2 className="font-semibold text-foreground">Technical Findings</h2>
          </div>

          <Textarea
            placeholder="Describe your electrical findings, test results, work completed, or safety concerns. Include specific details like circuit numbers, test readings, or regulation references..."
            value={technicalNotes}
            onChange={(e) => setTechnicalNotes(e.target.value)}
            className="min-h-[140px] resize-none text-base bg-background/50 border-border/30 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
            style={{ fontSize: '16px' }}
          />

          <p className="text-xs text-muted-foreground">
            Be specific about findings. Include BS 7671 regulation references, test readings, and safety classifications (C1/C2/C3) where applicable.
          </p>
        </div>

        {/* Tone & Settings Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Style</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="h-12 bg-background/50 border-border/30 text-foreground">
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

          <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Complexity</Label>
            <Select value={readingLevel} onValueChange={setReadingLevel}>
              <SelectTrigger className="h-12 bg-background/50 border-border/30 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priority</Label>
            <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
              <SelectTrigger className={cn(
                "h-12 bg-background/50 border-border/30 text-foreground",
                urgencyLevel === 'high' && "border-red-500/30",
                urgencyLevel === 'immediate' && "border-red-500/50"
              )}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Routine</SelectItem>
                <SelectItem value="medium">Important</SelectItem>
                <SelectItem value="high">Safety Concern</SelectItem>
                <SelectItem value="immediate">Immediate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Options (Collapsible) */}
        <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl overflow-hidden">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-4 min-h-[56px] touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <Settings2 className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Advanced Options</h3>
                <p className="text-xs text-muted-foreground">Customize output style</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(includeAnalogy || emphasizeSafety || includeCostInfo || includeBS7671) && (
                <Badge variant="secondary" className="text-xs">
                  {[includeAnalogy, emphasizeSafety, includeCostInfo, includeBS7671].filter(Boolean).length} active
                </Badge>
              )}
              <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-border/30 pt-4 space-y-2">
                  {toggleOptions.map(({ key, label, desc, icon: Icon, value, onChange }) => (
                    <button
                      key={key}
                      onClick={() => onChange(!value)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl",
                        "min-h-[60px] touch-manipulation transition-all",
                        value
                          ? "bg-elec-yellow/10 border border-elec-yellow/30"
                          : "bg-background/50 border border-border/30 hover:bg-accent/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-5 w-5", value ? "text-elec-yellow" : "text-muted-foreground")} />
                        <div className="text-left">
                          <p className="font-medium text-foreground text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        className="pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !technicalNotes.trim()}
          className={cn(
            "w-full h-14 text-base font-semibold rounded-xl transition-all duration-300",
            "bg-gradient-to-r from-elec-yellow to-elec-yellow/90",
            "hover:from-elec-yellow/90 hover:to-elec-yellow/80",
            "text-black shadow-lg shadow-elec-yellow/25",
            "hover:scale-[1.02] active:scale-[0.98]",
            "disabled:opacity-50 disabled:hover:scale-100"
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-3 h-6 w-6" />
              Generate Explanation
            </>
          )}
        </Button>

        {/* Output Panel */}
        <OutputPanel
          content={generatedExplanation}
          settings={getCurrentSettings()}
        />
      </main>
    </div>
  );
};

export default ClientExplainerPage;
