import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks, useUpdateJobPack } from '@/hooks/useJobPacks';
import { supabase } from '@/integrations/supabase/client';
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
import { RefreshCw, Download, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    if (selectedJobPack) {
      setScopeDescription(selectedJobPack.scope || '');
    }
  }, [selectedJobPack]);

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

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke(
        'generate-method-statement-pdf',
        {
          body: {
            jobDescription: scopeDescription,
            projectInfo: {
              projectName: selectedJobPack?.title || 'Untitled Project',
              location: selectedJobPack?.location || '',
              contractor: '',
              supervisor: '',
            },
          },
        }
      );

      clearInterval(progressInterval);

      if (invokeError) {
        throw invokeError;
      }

      setProgress(100);
      setResult(data);
      setIsGenerating(false);

      toast({
        title: 'Method statement generated',
        description: 'Your method statement has been created successfully.',
      });

      if (selectedJobPackId) {
        updateJobPack.mutate({
          id: selectedJobPackId,
          data: { method_statement_generated: true },
        });
      }
    } catch (err: any) {
      clearInterval(progressInterval);
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
        columns={3}
        stats={[
          { label: 'Generated', value: String(generatedCount), tone: 'emerald' },
          { label: 'Avg time', value: '~2 min' },
          { label: 'Templates', value: String(jobPacks.length), tone: 'blue' },
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
                      {selectedJobPackId ? ' and attached to job pack.' : '.'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <PrimaryButton onClick={handleDownload} fullWidth>
                      <Download className="h-4 w-4 mr-2" />
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
