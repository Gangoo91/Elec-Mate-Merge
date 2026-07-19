import { useState, useEffect, useMemo, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks, useUpdateJobPack } from '@/hooks/useJobPacks';
import { supabase } from '@/integrations/supabase/client';
import { persistPackDocument } from '@/utils/persistPackDocument';
import { useToast } from '@/hooks/use-toast';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Pill,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';
import { RefreshCw, Download, Sparkles, Loader2 } from 'lucide-react';

interface AIMethodStatementSectionProps {
  onNavigate: (section: Section) => void;
}

export function AIMethodStatementSection({ onNavigate }: AIMethodStatementSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const updateJobPack = useUpdateJobPack();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [scopeDescription, setScopeDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);

  // Keyed on the ID so a background refetch of the packs list never
  // clobbers an edited scope.
  useEffect(() => {
    const pack = jobPacks.find((jp) => jp.id === selectedJobPackId);
    if (pack) {
      setScopeDescription(pack.scope || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobPackId]);

  const generatedCount = useMemo(
    () => jobPacks.filter((jp: any) => jp.method_statement_generated).length,
    [jobPacks]
  );

  const handleGenerate = async () => {
    if (!scopeDescription.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide a scope description.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep('Drafting method statement…');
    setError(null);
    setResult(null);

    try {
      // The real AI is rams-generator's method agent (generate-method-
      // statement-pdf is just a renderer and 400s without method data).
      // Create the job, then poll — the table is not in the realtime
      // publication.
      const { data, error: invokeError } = await supabase.functions.invoke('rams-generator', {
        body: {
          action: 'create',
          jobDescription: scopeDescription,
          projectInfo: {
            projectName: selectedJobPack?.title || 'Untitled Project',
            location: selectedJobPack?.location || '',
          },
          jobScale: 'commercial',
        },
      });
      if (invokeError || !data?.jobId) {
        throw new Error(invokeError?.message || data?.error || 'Could not start generation');
      }

      const jobId = data.jobId as string;
      jobIdRef.current = jobId;
      if (pollRef.current) clearInterval(pollRef.current);
      const startedAt = Date.now();
      const POLL_DEADLINE_MS = 10 * 60 * 1000; // generation targets ~2 min
      const poll = setInterval(async () => {
        // Safety net: if the worker dies without writing a terminal status,
        // stop polling instead of showing "Generating" forever.
        if (Date.now() - startedAt > POLL_DEADLINE_MS) {
          clearInterval(poll);
          pollRef.current = null;
          jobIdRef.current = null;
          setIsGenerating(false);
          setError('Generation timed out — try again.');
          return;
        }
        const { data: job } = await supabase
          .from('rams_generation_jobs')
          .select('status, progress, current_step, method_data, error_message')
          .eq('id', jobId)
          .maybeSingle();
        if (!job) return;
        setProgress(job.progress || 0);
        setCurrentStep(job.current_step || 'Working…');

        // Terminal states: complete, partial (one agent succeeded — the
        // method data may still be there), failed and cancelled.
        if (job.status === 'complete' || job.status === 'partial') {
          clearInterval(poll);
          pollRef.current = null;
          jobIdRef.current = null;
          setIsGenerating(false);
          if (!job.method_data) {
            setError(job.error_message || 'The method statement could not be generated — try again.');
            toast({
              title: 'Error',
              description: job.error_message || 'The method statement could not be generated.',
              variant: 'destructive',
            });
            return;
          }
          setProgress(100);
          setResult(job.method_data);
          toast({
            title:
              job.status === 'partial'
                ? 'Method statement generated with gaps'
                : 'Method statement generated',
            description:
              job.status === 'partial'
                ? 'Part of the run failed — review the document carefully before use.'
                : 'Your method statement has been created successfully.',
          });
          if (selectedJobPackId) {
            updateJobPack.mutate(
              {
                id: selectedJobPackId,
                updates: { method_statement_generated: true },
              },
              {
                onError: () =>
                  toast({
                    title: 'Job pack not updated',
                    description:
                      'The method statement was generated but could not be saved against the job pack. Downloading it attaches the PDF too.',
                    variant: 'destructive',
                  }),
              }
            );
          }
        } else if (job.status === 'failed' || job.status === 'cancelled') {
          clearInterval(poll);
          pollRef.current = null;
          jobIdRef.current = null;
          setIsGenerating(false);
          const msg =
            job.status === 'cancelled'
              ? 'Generation was cancelled.'
              : job.error_message || 'Generation failed';
          setError(msg);
          if (job.status === 'failed') {
            toast({
              title: 'Error',
              description: job.error_message || 'Generation failed',
              variant: 'destructive',
            });
          }
        }
      }, 3000);
      pollRef.current = poll;
    } catch (err) {
      setIsGenerating(false);
      const msg = err instanceof Error ? err.message : 'Generation failed';
      setError(msg);
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    }
  };

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const jobIdRef = useRef<string | null>(null);
  useEffect(
    () => () => {
      if (pollRef.current) clearInterval(pollRef.current);
    },
    []
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    if (!result) return;
    setIsDownloading(true);
    try {
      // Real branded PDF via the renderer (the same one site-safety uses)
      const { data, error } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: {
          methodData: {
            ...result,
            projectName: selectedJobPack?.title || 'Method Statement',
          },
        },
      });
      if (data?.success && data?.downloadUrl) {
        const a = document.createElement('a');
        a.href = data.downloadUrl;
        a.download = `Method_Statement_${(selectedJobPack?.title || 'document').replace(/[^a-z0-9]/gi, '_')}.pdf`;
        a.click();

        // Persist DURABLY (renderer URLs expire within the hour)
        let saved = false;
        if (selectedJobPackId) {
          saved = await persistPackDocument({
            jobPackId: selectedJobPackId,
            title: `Method Statement — ${selectedJobPack?.title || 'document'}`,
            documentType: 'method_statement',
            transientUrl: data.downloadUrl,
          });
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
    // Stop the poll and cancel a live server-side job so abandoned runs
    // don't burn tokens (and the page never sticks in "Generating").
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (isGenerating && jobIdRef.current) {
      void supabase.functions
        .invoke('rams-generator', { body: { action: 'cancel', jobId: jobIdRef.current } })
        .catch(() => {});
      jobIdRef.current = null;
    }
    setIsGenerating(false);
    setResult(null);
    setError(null);
    setProgress(0);
    setCurrentStep('');
  };

  const recentGenerated = useMemo(
    () => jobPacks.filter((jp: any) => jp.method_statement_generated).slice(0, 6),
    [jobPacks]
  );

  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI Method Statement"
        description="Drafts a full method statement from a short brief."
        tone="emerald"
        actions={
          <IconButton onClick={handleReset} aria-label="Reset">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
        meta={<Pill tone="purple">AI</Pill>}
      />

      <StatStrip
        columns={2}
        stats={[
          { label: 'Generated', value: String(generatedCount), tone: 'emerald' },
          { label: 'Job packs', value: String(jobPacks.length), tone: 'blue' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="Brief"
              meta={<Pill tone="emerald">Step 1</Pill>}
            />
            <div className="p-5 sm:p-6 space-y-5">
              <div className="space-y-2">
                <Eyebrow>Link to job pack</Eyebrow>
                <JobPackSelector
                  selectedJobPackId={selectedJobPackId}
                  onSelect={setSelectedJobPackId}
                  onCreateNew={() => onNavigate('jobpacks')}
                />
              </div>

              <div className="space-y-2">
                <Eyebrow>Scope of work</Eyebrow>
                <Textarea
                  value={scopeDescription}
                  onChange={(e) => setScopeDescription(e.target.value)}
                  placeholder="Describe the electrical installation work in detail…"
                  className={`${textareaClass} min-h-[200px]`}
                  disabled={isGenerating}
                />
              </div>

              <PrimaryButton
                onClick={handleGenerate}
                disabled={isGenerating || !scopeDescription.trim()}
                fullWidth
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating…' : 'Generate'}
              </PrimaryButton>
            </div>
          </ListCard>

          <ListCard>
            <ListCardHeader title="What you get" />
            <div className="px-5 sm:px-6 py-5 space-y-3">
              {[
                '8 to 14 detailed installation steps',
                'Tools and materials per step',
                'Testing procedures with pass / fail criteria',
                'Linked hazards and safety notes',
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-elec-yellow shrink-0" />
                  <span className="text-[13px] text-white leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </ListCard>
        </div>

        <div className="space-y-6">
          <ListCard>
            <ListCardHeader
              tone="purple"
              title="Result"
              meta={
                isGenerating ? (
                  <Pill tone="amber">{Math.round(progress)}%</Pill>
                ) : result ? (
                  <Pill tone="emerald">Ready</Pill>
                ) : error ? (
                  <Pill tone="red">Failed</Pill>
                ) : (
                  <Pill tone="blue">Idle</Pill>
                )
              }
            />
            <div className="p-5 sm:p-6">
              {isGenerating && (
                <div className="space-y-4">
                  <LoadingBlocks />
                  <p className="text-[12px] text-white text-center">{currentStep}</p>
                </div>
              )}

              {!isGenerating && error && (
                <EmptyState
                  title="Generation failed"
                  description={error}
                  action="Try again"
                  onAction={handleReset}
                />
              )}

              {!isGenerating && result && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5">
                    <Eyebrow>Status</Eyebrow>
                    <div className="mt-3 text-[28px] sm:text-[34px] font-semibold text-white tracking-tight leading-none tabular-nums">
                      Ready
                    </div>
                    <p className="mt-2 text-[12.5px] text-white">
                      Step-by-step procedures created
                      {selectedJobPackId
                        ? ' — download to attach the PDF to the job pack.'
                        : '.'}
                    </p>
                  </div>

                  {Array.isArray(result?.steps) && result.steps.length > 0 && (
                    <div className="space-y-2 max-h-[320px] overflow-auto">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {result.steps.map((step: any, i: number) => (
                        <div
                          key={i}
                          className="rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3"
                        >
                          <p className="text-[13px] font-medium text-white">
                            {i + 1}. {step.title || step.stepTitle || step.name || `Step ${i + 1}`}
                          </p>
                          {(step.description || step.details) && (
                            <p className="text-[12px] text-white/60 mt-1 line-clamp-3">
                              {String(step.description || step.details)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <PrimaryButton onClick={handleDownload} disabled={isDownloading} fullWidth>
                      {isDownloading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Download
                    </PrimaryButton>
                    <SecondaryButton onClick={handleReset}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New
                    </SecondaryButton>
                  </div>
                </div>
              )}

              {!isGenerating && !result && !error && (
                <EmptyState
                  title="No method statement yet"
                  description="Add a brief and tap Generate to draft a full method statement following BS 7671."
                />
              )}
            </div>
          </ListCard>

          <ListCard>
            <ListCardHeader
              tone="blue"
              title="History"
              meta={<Pill tone="blue">{recentGenerated.length}</Pill>}
            />
            {recentGenerated.length === 0 ? (
              <div className="p-5 sm:p-6">
                <EmptyState
                  title="No previous statements"
                  description="Generated method statements will appear here once attached to a job pack."
                />
              </div>
            ) : (
              <ListBody>
                {recentGenerated.map((jp: any) => (
                  <ListRow
                    key={jp.id}
                    title={jp.title || 'Untitled job pack'}
                    subtitle={jp.location || 'No location'}
                    trailing={<Pill tone="emerald">Done</Pill>}
                    onClick={() => setSelectedJobPackId(jp.id)}
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
