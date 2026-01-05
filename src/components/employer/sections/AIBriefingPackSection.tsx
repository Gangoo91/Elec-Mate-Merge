import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { JobPackSelector } from "@/components/employer/smart-docs/JobPackSelector";
import { useJobPacks, useUpdateJobPack } from "@/hooks/useJobPacks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Users,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  RefreshCw,
  Shield,
  ClipboardList
} from "lucide-react";

interface AIBriefingPackSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIBriefingPackSection({ onNavigate }: AIBriefingPackSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const updateJobPack = useUpdateJobPack();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedJobPack = jobPacks.find(jp => jp.id === selectedJobPackId);

  // Check prerequisites
  const hasRAMS = selectedJobPack?.rams_generated;
  const hasMethodStatement = selectedJobPack?.method_statement_generated;
  const canGenerate = hasRAMS && hasMethodStatement;

  const handleGenerate = async () => {
    if (!selectedJobPackId) {
      toast({
        title: "Select a Job Pack",
        description: "Please select a job pack to generate a briefing for.",
        variant: "destructive"
      });
      return;
    }

    if (!canGenerate) {
      toast({
        title: "Prerequisites Missing",
        description: "RAMS and Method Statement must be generated first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep("Generating briefing pack...");
    setError(null);
    setResult(null);

    const progressInterval = setInterval(() => {
      setProgress(prev => prev >= 90 ? prev : prev + Math.random() * 15);
    }, 400);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('generate-briefing-content', {
        body: {
          jobPackId: selectedJobPackId,
          projectInfo: {
            projectName: selectedJobPack?.title,
            location: selectedJobPack?.location,
            scope: selectedJobPack?.scope
          },
          additionalNotes
        }
      });

      clearInterval(progressInterval);

      if (invokeError) {
        throw invokeError;
      }

      setProgress(100);
      setResult(data);
      setIsGenerating(false);

      toast({
        title: "Briefing Pack Generated!",
        description: "Worker briefing has been created successfully.",
      });

      if (selectedJobPackId) {
        updateJobPack.mutate({
          id: selectedJobPackId,
          data: { briefing_pack_generated: true }
        });
      }

    } catch (err: any) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const content = JSON.stringify(result, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BriefingPack-${selectedJobPack?.title || 'document'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setProgress(0);
    setCurrentStep("");
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="AI Briefing Pack"
        description="Generate pre-job worker briefings from RAMS & Method Statement"
        icon={Users}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Select Job Pack
              </CardTitle>
              <CardDescription>
                Choose a job pack with RAMS and Method Statement to generate briefing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobPackSelector
                selectedJobPackId={selectedJobPackId}
                onSelect={setSelectedJobPackId}
                onCreateNew={() => onNavigate("jobpacks")}
              />
            </CardContent>
          </Card>

          {/* Prerequisites Status */}
          {selectedJobPack && (
            <Card className={`border-${canGenerate ? 'success' : 'warning'}/20 bg-${canGenerate ? 'success' : 'warning'}/5`}>
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3">Prerequisites</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">RAMS</span>
                    </div>
                    {hasRAMS ? (
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate("airams")}
                        className="text-xs"
                      >
                        Generate
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Method Statement</span>
                    </div>
                    {hasMethodStatement ? (
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate("aimethodstatement")}
                        className="text-xs"
                      >
                        Generate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Additional Notes</CardTitle>
              <CardDescription>
                Add any extra information for the briefing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Site access codes, parking instructions, specific safety concerns..."
                className="min-h-[100px] bg-elec-dark border-elec-yellow/20"
                disabled={isGenerating}
              />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !canGenerate}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Briefing Pack
                  </>
                )}
              </Button>

              {!canGenerate && selectedJobPack && (
                <p className="text-xs text-warning text-center">
                  Generate RAMS and Method Statement first
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {isGenerating && (
            <Card className="border-info/20 bg-info/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">Generating Briefing</h3>
                    <Badge variant="secondary" className="bg-info/20 text-info">
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{currentStep}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {error && !isGenerating && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground">Generation Failed</h3>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result && !isGenerating && (
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Briefing Pack Ready!</h3>
                      <p className="text-sm text-muted-foreground">
                        Worker briefing created from RAMS & Method Statement
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleDownload}
                      className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="border-elec-yellow/30">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </div>

                  {selectedJobPackId && (
                    <p className="text-xs text-muted-foreground text-center">
                      ✓ Attached to Job Pack
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {!isGenerating && !result && !error && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 h-fit">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">AI Briefing Pack</h3>
                    <p className="text-sm text-muted-foreground">
                      Combines your RAMS and Method Statement into a worker-friendly briefing document.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li>• Key hazards and controls summary</li>
                      <li>• PPE requirements</li>
                      <li>• Emergency procedures</li>
                      <li>• Step-by-step work overview</li>
                      <li>• Ready for digital sign-off</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
