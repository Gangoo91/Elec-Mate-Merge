import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { JobPackSelector } from "@/components/employer/smart-docs/JobPackSelector";
import { useJobPacks } from "@/hooks/useJobPacks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Sparkles,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  RefreshCw,
  Zap,
  Settings
} from "lucide-react";

interface AIDesignSpecSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIDesignSpecSection({ onNavigate }: AIDesignSpecSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [designQuery, setDesignQuery] = useState("");
  const [propertyType, setPropertyType] = useState("domestic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedJobPack = jobPacks.find(jp => jp.id === selectedJobPackId);

  const handleGenerate = async () => {
    if (!designQuery.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe what you need to design.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep("Creating design job...");
    setError(null);
    setResult(null);

    try {
      // Create design job
      const { data: job, error: createError } = await supabase
        .from('circuit_design_jobs')
        .insert({
          query: designQuery,
          property_type: propertyType,
          status: 'pending',
          progress: 0
        })
        .select()
        .single();

      if (createError || !job) {
        throw new Error(createError?.message || "Failed to create design job");
      }

      // Subscribe to updates
      const channel = supabase
        .channel(`design-job-${job.id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'circuit_design_jobs',
            filter: `id=eq.${job.id}`
          },
          (payload) => {
            const jobData = payload.new as any;
            setProgress(jobData.progress || 0);
            setCurrentStep(jobData.current_step || "");

            if (jobData.status === 'complete') {
              setIsGenerating(false);
              setResult(jobData.result);
              supabase.removeChannel(channel);
              toast({
                title: "Design Spec Generated!",
                description: "Your circuit design has been created successfully.",
              });
            } else if (jobData.status === 'failed') {
              setIsGenerating(false);
              setError(jobData.error_message || "Design generation failed");
              supabase.removeChannel(channel);
              toast({
                title: "Generation Failed",
                description: jobData.error_message || "Something went wrong.",
                variant: "destructive"
              });
            }
          }
        )
        .subscribe();

      // Trigger the edge function
      const { error: invokeError } = await supabase.functions.invoke('create-circuit-design-job', {
        body: { jobId: job.id }
      });

      if (invokeError) {
        supabase.removeChannel(channel);
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
    if (!result) return;
    const content = JSON.stringify(result, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DesignSpec-${selectedJobPack?.title || 'circuit'}.json`;
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
        title="AI Design Spec"
        description="Generate circuit designs and installation guidance"
        icon={Sparkles}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Link to Job Pack (Optional)
              </CardTitle>
              <CardDescription>
                Attach the design to a job pack for documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobPackSelector
                selectedJobPackId={selectedJobPackId}
                onSelect={setSelectedJobPackId}
                onCreateNew={() => onNavigate("jobpacks")}
                showStatus={false}
              />
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Design Requirements</CardTitle>
              <CardDescription>
                Describe the circuit or installation you need designed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Property Type</Label>
                <div className="flex gap-2 mt-2">
                  {['domestic', 'commercial', 'industrial'].map((type) => (
                    <Button
                      key={type}
                      variant={propertyType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPropertyType(type)}
                      className={propertyType === type ? "bg-elec-yellow text-black" : ""}
                      disabled={isGenerating}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="query">What do you need designed?</Label>
                <Textarea
                  id="query"
                  value={designQuery}
                  onChange={(e) => setDesignQuery(e.target.value)}
                  placeholder="e.g., Consumer unit for 3-bed house with EV charger, kitchen circuit for commercial kitchen with 3-phase supply..."
                  className="mt-1 min-h-[150px] bg-elec-dark border-elec-yellow/20"
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !designQuery.trim()}
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
                    Generate Design Spec
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
                    <h3 className="font-medium text-foreground">Generating Design</h3>
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
                      <h3 className="font-medium text-foreground">Design Spec Generated!</h3>
                      <p className="text-sm text-muted-foreground">
                        Circuit design created successfully
                      </p>
                    </div>
                  </div>

                  {result.circuits && (
                    <div className="p-3 rounded-lg bg-elec-dark/50 border border-elec-yellow/10">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Circuits: </span>
                          <span className="text-foreground font-medium">
                            {result.circuits?.length || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Property: </span>
                          <span className="text-foreground font-medium capitalize">
                            {propertyType}
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
                    <Button variant="outline" onClick={handleReset} className="border-elec-yellow/30">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isGenerating && !result && !error && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 h-fit">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">AI Circuit Designer</h3>
                    <p className="text-sm text-muted-foreground">
                      Get BS 7671 compliant circuit designs with cable sizing, protective devices, and installation guidance.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li>• Circuit schedules and specifications</li>
                      <li>• Cable sizing calculations</li>
                      <li>• MCB/RCBO recommendations</li>
                      <li>• Installation guidance</li>
                      <li>• BS 7671 regulation references</li>
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
