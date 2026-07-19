import { useState, useEffect } from 'react';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks, useUpdateJobPack } from '@/hooks/useJobPacks';
import { supabase } from '@/integrations/supabase/client';
import { persistPackDocument } from '@/utils/persistPackDocument';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<Array<{ id: string; title: string; createdAt: string; hazards: number; ramsData: any; methodData: any }>>([]);
  const [attachedToPack, setAttachedToPack] = useState(false);

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);

  // Pre-fill the brief when a pack is picked — keyed on the ID so a background
  // refetch of the packs list never clobbers an edited scope. Notes are merged
  // at generate time, not here (they'd be stale otherwise).
  useEffect(() => {
    const pack = jobPacks.find((jp) => jp.id === selectedJobPackId);
    if (pack) {
      const description = [
        pack.scope,
        pack.hazards?.length ? `Identified hazards: ${pack.hazards.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');
      setJobDescription(description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobPackId]);

  // Durable library — every generation is persisted in rams_generation_jobs
  // (user-scoped), so past RAMS survive reloads and re-open with one tap.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data } = await supabase
        .from('rams_generation_jobs')
        .select('id, project_info, rams_data, method_data, created_at')
        .eq('user_id', user.id)
        .in('status', ['complete', 'partial'])
        .not('rams_data', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);
      if (cancelled || !data) return;
      setHistory(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((j: any) => ({
          id: j.id,
          title: j.project_info?.projectName || 'Untitled RAMS',
          createdAt: j.created_at,
          hazards: j.rams_data?.risks?.length || 0,
          ramsData: j.rams_data,
          methodData: j.method_data,
        }))
      );
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!generationJobId || !isGenerating) return;

    // rams_generation_jobs is NOT in the realtime publication — poll like
    // the electrician generator does
    let cancelled = false;
    const startedAt = Date.now();
    const POLL_DEADLINE_MS = 10 * 60 * 1000; // generation targets ~3 min
    const interval = setInterval(async () => {
      // Safety net: if the worker dies without writing a terminal status,
      // stop polling instead of showing "Generating" forever.
      if (Date.now() - startedAt > POLL_DEADLINE_MS) {
        clearInterval(interval);
        setIsGenerating(false);
        setError('Generation timed out — try again.');
        return;
      }
      const { data: job } = await supabase
        .from('rams_generation_jobs')
        .select('id, status, progress, current_step, rams_data, method_data, error_message')
        .eq('id', generationJobId)
        .maybeSingle();
      if (cancelled || !job) return;

      setProgress(job.progress || 0);
      setCurrentStep(job.current_step || '');

      // Terminal states: complete, partial (one agent succeeded — data may
      // still be usable), failed and cancelled. Anything else keeps polling.
      if (job.status === 'complete' || job.status === 'partial') {
        clearInterval(interval);
        setIsGenerating(false);
        if (!job.rams_data) {
          setError(job.error_message || 'The risk assessment could not be generated — try again.');
          toast({
            title: 'Generation Failed',
            description: job.error_message || 'The risk assessment could not be generated.',
            variant: 'destructive',
          });
          return;
        }
        setResult({
          ramsData: job.rams_data,
          methodData: job.method_data,
        });
        setHistory((prev) => [
          {
            id: job.id,
            title: selectedJobPack?.title || 'Untitled RAMS',
            createdAt: new Date().toISOString(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            hazards: (job.rams_data as any)?.risks?.length || 0,
            ramsData: job.rams_data,
            methodData: job.method_data,
          },
          ...prev,
        ]);
        toast({
          title: job.status === 'partial' ? 'RAMS generated with gaps' : 'RAMS Generated',
          description:
            job.status === 'partial'
              ? 'Part of the document could not be generated — review it carefully before use.'
              : 'Your risk assessment has been created successfully.',
        });
        if (selectedJobPackId) {
          updateJobPack.mutate(
            {
              id: selectedJobPackId,
              updates: { rams_generated: true },
            },
            {
              onError: () =>
                toast({
                  title: 'Job pack not updated',
                  description:
                    'The RAMS was generated but could not be saved against the job pack. Try downloading it — that attaches it too.',
                  variant: 'destructive',
                }),
            }
          );
        }
      } else if (job.status === 'failed' || job.status === 'cancelled') {
        clearInterval(interval);
        setIsGenerating(false);
        const msg =
          job.status === 'cancelled'
            ? 'Generation was cancelled.'
            : job.error_message || 'Generation failed';
        setError(msg);
        if (job.status === 'failed') {
          toast({
            title: 'Generation Failed',
            description: job.error_message || 'Something went wrong.',
            variant: 'destructive',
          });
        }
      }
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
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
    setAttachedToPack(false);

    // Notes live in their own field — merge them into the brief at send time
    // so notes typed after picking a pack still reach the generator.
    const fullDescription = [
      jobDescription.trim(),
      additionalNotes.trim() ? `Additional notes: ${additionalNotes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      // Single call to rams-generator handles auth + insert + background
      // worker via EdgeRuntime.waitUntil. Returns jobId immediately (202).
      const { data, error: invokeError } = await supabase.functions.invoke('rams-generator', {
        body: {
          action: 'create',
          jobDescription: fullDescription,
          projectInfo: {
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
          jobScale: 'commercial',
        },
      });

      if (invokeError || !data?.jobId) {
        throw new Error(invokeError?.message || data?.error || 'Failed to start generation');
      }

      setGenerationJobId(data.jobId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    if (!result?.ramsData) return;
    setIsDownloading(true);
    try {
      // Real branded PDF via the same renderer the site-safety flow uses
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.functions.invoke('generate-rams-pdf', {
        body: { ramsData: result.ramsData, userId: user?.id },
      });
      if (data?.success && data?.downloadUrl) {
        const a = document.createElement('a');
        a.href = data.downloadUrl;
        a.download = `Risk_Assessment_${(selectedJobPack?.title || 'document').replace(/[^a-z0-9]/gi, '_')}.pdf`;
        a.click();

        // Persist DURABLY (renderer URLs expire within the hour)
        let saved = false;
        if (selectedJobPackId) {
          saved = await persistPackDocument({
            jobPackId: selectedJobPackId,
            title: `Risk Assessment — ${selectedJobPack?.title || 'document'}`,
            documentType: 'rams',
            transientUrl: data.downloadUrl,
          });
          setAttachedToPack(saved);
        }
        toast({
          title: 'PDF downloaded',
          description: saved
            ? 'Saved to the job pack for worker sign-off.'
            : selectedJobPackId
              ? 'But it could not be saved to the job pack — run the download again to retry.'
              : undefined,
          variant: selectedJobPackId && !saved ? 'destructive' : undefined,
        });
      } else {
        throw new Error(error?.message || data?.error || 'PDF generation failed');
      }
    } catch (err) {
      toast({
        title: 'Could not generate the PDF',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    // Cancel a live server-side job so abandoned runs don't burn tokens
    if (isGenerating && generationJobId) {
      void supabase.functions
        .invoke('rams-generator', { body: { action: 'cancel', jobId: generationJobId } })
        .catch(() => {});
    }
    setIsGenerating(false);
    setResult(null);
    setError(null);
    setProgress(0);
    setCurrentStep('');
    setGenerationJobId(null);
    setAttachedToPack(false);
  };

  const generatedCount = history.length;
  const hazardsCovered = history.reduce((sum, h) => sum + h.hazards, 0);
  const jobPacksCount = jobPacks.length;

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
          { label: 'Hazards covered', value: hazardsCovered, tone: 'emerald' },
          { label: 'Job packs', value: jobPacksCount, tone: 'blue' },
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
                  Generating the risk assessment and method statement…
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

                <div className="space-y-2 max-h-[360px] overflow-auto">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(result.ramsData?.risks || []).map((risk: any, i: number) => (
                    <div
                      key={i}
                      className="rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3"
                    >
                      <p className="text-[13px] font-medium text-white">
                        {i + 1}. {risk.hazard || risk.title || 'Hazard'}
                      </p>
                      {risk.controlMeasures && (
                        <p className="text-[12px] text-white/60 mt-1">
                          {Array.isArray(risk.controlMeasures)
                            ? risk.controlMeasures.join(' · ')
                            : String(risk.controlMeasures)}
                        </p>
                      )}
                    </div>
                  ))}
                  {(!result.ramsData?.risks || result.ramsData.risks.length === 0) && (
                    <p className="text-[12px] text-white/40">
                      Generated — download the PDF for the full document.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <PrimaryButton onClick={handleDownload} disabled={isDownloading} fullWidth>
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
                    {attachedToPack
                      ? 'Attached to job pack'
                      : 'Downloading attaches the PDF to the job pack'}
                  </p>
                )}
              </div>
            </ListCard>
          )}

          {!isGenerating && !result && !error && (
            <EmptyState
              title="No RAMS yet"
              description="Add the brief on the left, then tap Generate. Output appears here in around three minutes."
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
                    trailing={<Pill tone="emerald">Open</Pill>}
                    onClick={() => {
                      setError(null);
                      setAttachedToPack(false);
                      setResult({ ramsData: entry.ramsData, methodData: entry.methodData });
                    }}
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
