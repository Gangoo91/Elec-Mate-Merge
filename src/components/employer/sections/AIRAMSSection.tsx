import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { JobPackSelector } from "@/components/employer/smart-docs/JobPackSelector";
import { useJobPacks, useUpdateJobPack } from "@/hooks/useJobPacks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Shield,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  RefreshCw
} from "lucide-react";

interface AIRAMSSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIRAMSSection({ onNavigate }: AIRAMSSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const updateJobPack = useUpdateJobPack();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [generationJobId, setGenerationJobId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Get selected job pack data
  const selectedJobPack = jobPacks.find(jp => jp.id === selectedJobPackId);

  // Auto-populate fields when job pack is selected
  useEffect(() => {
    if (selectedJobPack) {
      const description = [
        selectedJobPack.scope,
        selectedJobPack.hazards?.length ? `Identified hazards: ${selectedJobPack.hazards.join(", ")}` : "",
        additionalNotes
      ].filter(Boolean).join("\n\n");
      setJobDescription(description);
    }
  }, [selectedJobPack]);

  // Poll for generation progress
  useEffect(() => {
    if (!generationJobId || !isGenerating) return;

    const channel = supabase
      .channel(`rams-job-${generationJobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rams_generation_jobs',
          filter: `id=eq.${generationJobId}`
        },
        (payload) => {
          const job = payload.new as any;
          setProgress(job.progress || 0);
          setCurrentStep(job.current_step || "");

          if (job.status === 'complete') {
            setIsGenerating(false);
            setResult({
              ramsData: job.rams_data,
              methodData: job.method_data
            });
            toast({
              title: "RAMS Generated!",
              description: "Your risk assessment has been created successfully.",
            });

            // Update job pack
            if (selectedJobPackId) {
              updateJobPack.mutate({
                id: selectedJobPackId,
                data: { rams_generated: true }
              });
            }
          } else if (job.status === 'failed') {
            setIsGenerating(false);
            setError(job.error_message || "Generation failed");
            toast({
              title: "Generation Failed",
              description: job.error_message || "Something went wrong.",
              variant: "destructive"
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [generationJobId, isGenerating, selectedJobPackId]);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a job description.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep("Creating generation job...");
    setError(null);
    setResult(null);

    try {
      // Create the generation job
      const { data: job, error: createError } = await supabase
        .from('rams_generation_jobs')
        .insert({
          job_description: jobDescription,
          job_scale: 'Medium',
          project_info: {
            projectName: selectedJobPack?.title || "Untitled Project",
            location: selectedJobPack?.location || "",
            contractor: "",
            supervisor: "",
            assessor: "",
            siteManagerName: "",
            siteManagerPhone: "",
            firstAiderName: "",
            firstAiderPhone: "",
            safetyOfficerName: "",
            safetyOfficerPhone: "",
            assemblyPoint: ""
          },
          status: 'pending',
          progress: 0
        })
        .select()
        .single();

      if (createError || !job) {
        throw new Error(createError?.message || "Failed to create job");
      }

      setGenerationJobId(job.id);

      // Trigger the edge function
      const { error: invokeError } = await supabase.functions.invoke('generate-rams', {
        body: { jobId: job.id }
      });

      if (invokeError) {
        throw invokeError;
      }

    } catch (err: any) {
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
    if (!result?.ramsData) return;

    // Create a simple text document for now
    const content = JSON.stringify(result.ramsData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RAMS-${selectedJobPack?.title || 'document'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setProgress(0);
    setCurrentStep("");
    setGenerationJobId(null);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="AI RAMS Generator"
        description="Generate comprehensive risk assessments automatically"
        icon={Shield}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input */}
        <div className="space-y-4">
          {/* Job Pack Selector */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Link to Job Pack
              </CardTitle>
              <CardDescription>
                Select a job pack to auto-populate details and attach the generated RAMS
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

          {/* Job Description */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Job Description</CardTitle>
              <CardDescription>
                Describe the work to be carried out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe the electrical installation work, including scope, location, and any known hazards..."
                className="min-h-[150px] bg-elec-dark border-elec-yellow/20"
                disabled={isGenerating}
              />

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any specific concerns, site access requirements, or special conditions..."
                  className="mt-1 min-h-[80px] bg-elec-dark border-elec-yellow/20"
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !jobDescription.trim()}
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
                    Generate RAMS
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Progress & Results */}
        <div className="space-y-4">
          {/* Progress Card */}
          {isGenerating && (
            <Card className="border-info/20 bg-info/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">Generating RAMS</h3>
                    <Badge variant="secondary" className="bg-info/20 text-info">
                      {progress}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{currentStep}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Card */}
          {error && !isGenerating && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground">Generation Failed</h3>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={handleReset}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Card */}
          {result && !isGenerating && (
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">RAMS Generated!</h3>
                      <p className="text-sm text-muted-foreground">
                        Risk assessment created successfully
                      </p>
                    </div>
                  </div>

                  {result.ramsData && (
                    <div className="p-3 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Hazards: </span>
                          <span className="text-foreground font-medium">
                            {result.ramsData.risks?.length || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">PPE Items: </span>
                          <span className="text-foreground font-medium">
                            {result.ramsData.ppeDetails?.length || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Emergency Procedures: </span>
                          <span className="text-foreground font-medium">
                            {result.ramsData.emergencyProcedures?.length || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Regulations: </span>
                          <span className="text-foreground font-medium">
                            {result.ramsData.complianceRegulations?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={handleDownload}
                      className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="border-elec-yellow/30"
                    >
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

          {/* Info Card */}
          {!isGenerating && !result && !error && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 h-fit">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">AI-Powered RAMS</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your job description and generates a comprehensive
                      Risk Assessment & Method Statement following HSE guidelines and BS 7671.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li>• 12-25 identified hazards with control measures</li>
                      <li>• PPE requirements with EN/BS standards</li>
                      <li>• Emergency procedures specific to electrical work</li>
                      <li>• UK regulation compliance references</li>
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
