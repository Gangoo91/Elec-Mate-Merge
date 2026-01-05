import { useState, useEffect } from "react";
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
  ClipboardList,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  RefreshCw
} from "lucide-react";

interface AIMethodStatementSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIMethodStatementSection({ onNavigate }: AIMethodStatementSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const updateJobPack = useUpdateJobPack();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [scopeDescription, setScopeDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedJobPack = jobPacks.find(jp => jp.id === selectedJobPackId);

  useEffect(() => {
    if (selectedJobPack) {
      setScopeDescription(selectedJobPack.scope || "");
    }
  }, [selectedJobPack]);

  const handleGenerate = async () => {
    if (!scopeDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a scope description.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep("Generating method statement...");
    setError(null);
    setResult(null);

    // Simulate progress for method statement generation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: {
          jobDescription: scopeDescription,
          projectInfo: {
            projectName: selectedJobPack?.title || "Untitled Project",
            location: selectedJobPack?.location || "",
            contractor: "",
            supervisor: ""
          }
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
        title: "Method Statement Generated!",
        description: "Your method statement has been created successfully.",
      });

      if (selectedJobPackId) {
        updateJobPack.mutate({
          id: selectedJobPackId,
          data: { method_statement_generated: true }
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
    a.download = `MethodStatement-${selectedJobPack?.title || 'document'}.json`;
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
        title="AI Method Statement"
        description="Generate step-by-step installation procedures"
        icon={ClipboardList}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Link to Job Pack
              </CardTitle>
              <CardDescription>
                Select a job pack to auto-populate scope and attach the method statement
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

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Scope of Work</CardTitle>
              <CardDescription>
                Describe the installation work to generate step-by-step procedures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={scopeDescription}
                onChange={(e) => setScopeDescription(e.target.value)}
                placeholder="Describe the electrical installation work in detail..."
                className="min-h-[200px] bg-elec-dark border-elec-yellow/20"
                disabled={isGenerating}
              />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !scopeDescription.trim()}
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
                    Generate Method Statement
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {isGenerating && (
            <Card className="border-info/20 bg-info/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">Generating Method Statement</h3>
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
                      <h3 className="font-medium text-foreground">Method Statement Generated!</h3>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step procedures created
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
                    <h3 className="font-medium text-foreground mb-1">AI Method Statement</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate detailed installation procedures following BS 7671 standards.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li>• 8-14 detailed installation steps</li>
                      <li>• Tools and materials per step</li>
                      <li>• Testing procedures with pass/fail criteria</li>
                      <li>• Linked hazards and safety notes</li>
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
