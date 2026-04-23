import { useState, useEffect } from 'react';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks, useUpdateJobPack } from '@/hooks/useJobPacks';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { RefreshCw, Sparkles, Download } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  IconButton,
  Pill,
  Dot,
  EmptyState,
  LoadingBlocks,
  Divider,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';

interface AIRAMSSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIRAMSSection({ onNavigate }: AIRAMSSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const updateJobPack = useUpdateJobPack();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [generationJobId, setGenerationJobId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ id: string; title: string; createdAt: string; hazards: number }>>([]);

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);

  useEffect(() => {
    if (selectedJobPack) {
      const description = [
        selectedJobPack.scope,
        selectedJobPack.hazards?.length
          ? `Identified hazards: ${selectedJobPack.hazards.join(', ')}`
          : '',
        additionalNotes,
      ]
        .filter(Boolean)
        .join('\n\n');
      setJobDescription(description);
    }
  }, [selectedJobPack]);

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
          filter: `id=eq.${generationJobId}`,
        },
        (payload) => {
          const job = payload.new as any;
          setProgress(job.progress || 0);
          setCurrentStep(job.current_step || '');

          if (job.status === 'complete') {
            setIsGenerating(false);
            setResult({
              ramsData: job.rams_data,
              methodData: job.method_data,
            });
            setHistory((prev) => [
              {
                id: job.id,
                title: selectedJobPack?.title || 'Untitled RAMS',
                createdAt: new Date().toISOString(),
                hazards: job.rams_data?.risks?.length || 0,
              },
              ...prev,
            ]);
            toast({
              title: 'RAMS Generated',
              description: 'Your risk assessment has been created successfully.',
            });

            if (selectedJobPackId) {
              updateJobPack.mutate({
                id: selectedJobPackId,
                data: { rams_generated: true },
              });
            }
          } else if (job.status === 'failed') {
            setIsGenerating(false);
            setError(job.error_message || 'Generation failed');
            toast({
              title: 'Generation Failed',
              description: job.error_message || 'Something went wrong.',
              variant: 'destructive',
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
        title: 'Missing Information',
        description: 'Please provide a job description.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep('Creating generation job…');
    setError(null);
    setResult(null);

    try {
      const { data: job, error: createError } = await supabase
        .from('rams_generation_jobs')
        .insert({
          job_description: jobDescription,
          job_scale: 'Medium',
          project_info: {
            projectName: selectedJobPack?.title || 'Untitled Project',
            location: selectedJobPack?.location || '',
            contractor: '',
            supervisor: '',
            assessor: '',
            siteManagerName: '',
            siteManagerPhone: '',
            firstAiderName: '',
            firstAiderPhone: '',
            safetyOfficerName: '',
            safetyOfficerPhone: '',
            assemblyPoint: '',
          },
          status: 'pending',
          progress: 0,
        })
        .select()
        .single();

      if (createError || !job) {
        throw new Error(createError?.message || 'Failed to create job');
      }

      setGenerationJobId(job.id);

      const { error: invokeError } = await supabase.functions.invoke('generate-rams', {
        body: { jobId: job.id },
      });

      if (invokeError) {
        throw invokeError;
      }
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    if (!result?.ramsData) return;
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
    setCurrentStep('');
    setGenerationJobId(null);
  };

  const generatedCount = history.length;
  const templatesCount = jobPacks.length;

  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI RAMS"
        description="Full Risk Assessment + Method Statement in ~3 minutes."
        tone="orange"
        actions={
          <IconButton onClick={handleReset} aria-label="Reset">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
        meta={<Pill tone="purple">AI</Pill>}
      />

      <StatStrip
        columns={3}
        stats={[
          { label: 'Generated', value: generatedCount, tone: 'orange' },
          { label: 'Avg time', value: '3 min', tone: 'emerald' },
          { label: 'Templates', value: templatesCount, tone: 'blue' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6 min-w-0">
          <ListCard>
            <ListCardHeader
              tone="orange"
              title="Briefing"
              meta={<Pill tone="orange">Step 1</Pill>}
            />
            <div className="p-5 sm:p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  Linked job pack
                </label>
                <JobPackSelector
                  selectedJobPackId={selectedJobPackId}
                  onSelect={setSelectedJobPackId}
                  onCreateNew={() => onNavigate('jobpacks')}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rams-scope"
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Scope of works
                </label>
                <textarea
                  id="rams-scope"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the electrical installation work, including scope, location, and any known hazards…"
                  disabled={isGenerating}
className={`${textareaClass} min-h-[160px]`}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rams-notes"
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Hazards / additional notes
                </label>
                <textarea
                  id="rams-notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any specific concerns, site access requirements, or special conditions…"
                  disabled={isGenerating}
className={`${textareaClass} min-h-[110px]`}
                />
              </div>

              {selectedJobPack?.hazards && selectedJobPack.hazards.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedJobPack.hazards.slice(0, 8).map((h: string) => (
                    <Pill key={h} tone="amber">
                      {h}
                    </Pill>
                  ))}
                </div>
              )}

              <PrimaryButton
                onClick={handleGenerate}
                disabled={isGenerating || !jobDescription.trim()}
                fullWidth
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating…' : 'Generate RAMS'}
              </PrimaryButton>
            </div>
          </ListCard>
        </div>

        <div className="space-y-6 min-w-0">
          {isGenerating && (
            <ListCard>
              <ListCardHeader
                tone="purple"
                title="Generating"
                meta={<Pill tone="purple">{progress}%</Pill>}
              />
              <div className="p-5 sm:p-6 space-y-5">
                <p className="text-[13px] text-white">
                  Running H&amp;S agent + Install Planner in parallel…
                </p>
                {currentStep && (
                  <div className="flex items-center gap-2">
                    <Dot tone="purple" />
                    <span className="text-[12.5px] text-white">{currentStep}</span>
                  </div>
                )}
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-elec-yellow transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <LoadingBlocks />
              </div>
            </ListCard>
          )}

          {error && !isGenerating && (
            <ListCard>
              <ListCardHeader
                tone="red"
                title="Generation failed"
                meta={<Pill tone="red">Error</Pill>}
              />
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-[13px] text-white">{error}</p>
                <SecondaryButton onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
                </SecondaryButton>
              </div>
            </ListCard>
          )}

          {result && !isGenerating && (
            <ListCard>
              <ListCardHeader
                tone="emerald"
                title="RAMS preview"
                meta={<Pill tone="emerald">Ready</Pill>}
                action="Download"
                onAction={handleDownload}
              />
              <div className="p-5 sm:p-6 space-y-5">
                {result.ramsData && (
                  <StatStrip
                    columns={4}
                    stats={[
                      { label: 'Hazards', value: result.ramsData.risks?.length || 0, tone: 'orange' },
                      { label: 'PPE', value: result.ramsData.ppeDetails?.length || 0, tone: 'blue' },
                      { label: 'Procedures', value: result.ramsData.emergencyProcedures?.length || 0, tone: 'amber' },
                      { label: 'Regs', value: result.ramsData.complianceRegulations?.length || 0, tone: 'purple' },
                    ]}
                  />
                )}

                <Divider label="Document" />

                <pre className="font-mono text-[12px] leading-relaxed text-white whitespace-pre-wrap break-words bg-[hsl(0_0%_8%)] border border-white/[0.06] rounded-xl p-4 max-h-[360px] overflow-auto">
                  {JSON.stringify(result.ramsData, null, 2)}
                </pre>

                <div className="flex flex-col sm:flex-row gap-2">
                  <PrimaryButton onClick={handleDownload} fullWidth>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </PrimaryButton>
                  <SecondaryButton onClick={handleReset}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New
                  </SecondaryButton>
                </div>

                {selectedJobPackId && (
                  <p className="text-[11.5px] text-white text-center">
                    Attached to job pack
                  </p>
                )}
              </div>
            </ListCard>
          )}

          {!isGenerating && !result && !error && (
            <EmptyState
              title="No RAMS yet"
              description="Brief the agents on the left, then tap Generate. Output appears here in around three minutes."
            />
          )}

          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Library"
              meta={<Pill tone="blue">{history.length}</Pill>}
            />
            {history.length === 0 ? (
              <div className="p-5 sm:p-6">
                <p className="text-[13px] text-white">
                  Recently generated RAMS will appear here for one-tap re-download.
                </p>
              </div>
            ) : (
              <ListBody>
                {history.map((entry) => (
                  <ListRow
                    key={entry.id}
                    title={entry.title}
                    subtitle={`${entry.hazards} hazards · ${new Date(entry.createdAt).toLocaleString('en-GB')}`}
                    trailing={<Pill tone="emerald">Saved</Pill>}
                  />
                ))}
              </ListBody>
            )}
          </ListCard>
        </div>
      </div>
    </PageFrame>
  );
}
