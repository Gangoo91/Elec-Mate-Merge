import { useState } from 'react';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks } from '@/hooks/useJobPacks';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { RefreshCw } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  Dot,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Eyebrow,
  Divider,
  SplitLayout,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
  checkboxClass,
} from '@/components/employer/editorial';

interface AIDesignSpecSectionProps {
  onNavigate: (section: Section) => void;
}

type FilterTab = 'all' | 'draft' | 'approved' | 'sent';

const PROPERTY_TYPES: Array<{ value: string; label: string }> = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];

export function AIDesignSpecSection({ onNavigate }: AIDesignSpecSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [designQuery, setDesignQuery] = useState('');
  const [propertyType, setPropertyType] = useState('domestic');
  const [includeStandards, setIncludeStandards] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);

  const refresh = () => {
    setResult(null);
    setError(null);
    setProgress(0);
    setCurrentStep('');
  };

  const handleGenerate = async () => {
    if (!designQuery.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please describe what you need to design.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep('Creating design job...');
    setError(null);
    setResult(null);

    try {
      const { data: job, error: createError } = await supabase
        .from('circuit_design_jobs')
        .insert({
          query: designQuery,
          property_type: propertyType,
          status: 'pending',
          progress: 0,
        })
        .select()
        .single();

      if (createError || !job) {
        throw new Error(createError?.message || 'Failed to create design job');
      }

      const channel = supabase
        .channel(`design-job-${job.id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'circuit_design_jobs',
            filter: `id=eq.${job.id}`,
          },
          (payload) => {
            const jobData = payload.new as any;
            setProgress(jobData.progress || 0);
            setCurrentStep(jobData.current_step || '');

            if (jobData.status === 'complete') {
              setIsGenerating(false);
              setResult(jobData.result);
              supabase.removeChannel(channel);
              toast({
                title: 'Design spec generated',
                description: 'Your circuit design has been created successfully.',
              });
            } else if (jobData.status === 'failed') {
              setIsGenerating(false);
              setError(jobData.error_message || 'Design generation failed');
              supabase.removeChannel(channel);
              toast({
                title: 'Generation failed',
                description: jobData.error_message || 'Something went wrong.',
                variant: 'destructive',
              });
            }
          }
        )
        .subscribe();

      const { error: invokeError } = await supabase.functions.invoke('create-circuit-design-job', {
        body: { jobId: job.id },
      });

      if (invokeError) {
        supabase.removeChannel(channel);
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

  const generated30d = '12';
  const hoursSaved = '34';
  const templateCount = '6';

  const history: Array<{
    id: string;
    title: string;
    subtitle: string;
    status: FilterTab;
    statusLabel: string;
  }> = [];

  const filteredHistory = history.filter((row) => {
    const matchesTab = activeTab === 'all' || row.status === activeTab;
    const matchesSearch =
      !search ||
      row.title.toLowerCase().includes(search.toLowerCase()) ||
      row.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI Design Spec"
        description="Circuit design specs drafted from a short brief — you approve before sending."
        tone="indigo"
        actions={
          <>
            <PrimaryButton onClick={refresh}>New spec</PrimaryButton>
            <IconButton onClick={refresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
        meta={<Pill tone="purple">AI</Pill>}
      />

      <StatStrip
        columns={3}
        stats={[
          { label: 'Generated 30d', value: generated30d, tone: 'indigo' },
          { label: 'Hours saved', value: hoursSaved, tone: 'emerald', accent: true },
          { label: 'Templates', value: templateCount, tone: 'blue' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'all', label: 'All' },
          { value: 'draft', label: 'Draft' },
          { value: 'approved', label: 'Approved' },
          { value: 'sent', label: 'Sent' },
        ]}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as FilterTab)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search specs…"
      />

      <SplitLayout
        ratio="3-2"
        primary={
          <ListCard>
            <ListCardHeader
              tone="indigo"
              title="New design brief"
              meta={
                isGenerating ? (
                  <Pill tone="amber">{progress}%</Pill>
                ) : (
                  <Pill tone="indigo">Draft</Pill>
                )
              }
            />
            <div className="p-5 sm:p-6 space-y-5">
              <div className="space-y-2">
                <Eyebrow>Job pack</Eyebrow>
                <JobPackSelector
                  selectedJobPackId={selectedJobPackId}
                  onSelect={setSelectedJobPackId}
                  onCreateNew={() => onNavigate('jobpacks')}
                  showStatus={false}
                />
              </div>

              <div className="space-y-2">
                <Eyebrow>Property type</Eyebrow>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((type) => {
                    const isActive = propertyType === type.value;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setPropertyType(type.value)}
                        disabled={isGenerating}
                        className={[
                          'h-11 px-4 rounded-full text-[13px] font-medium touch-manipulation transition-colors disabled:opacity-50',
                          isActive
                            ? 'bg-elec-yellow text-black'
                            : 'bg-[hsl(0_0%_15%)] text-white border border-white/[0.08] hover:bg-[hsl(0_0%_18%)]',
                        ].join(' ')}
                      >
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Eyebrow>Brief</Eyebrow>
                <textarea
                  value={designQuery}
                  onChange={(e) => setDesignQuery(e.target.value)}
                  placeholder="e.g., Consumer unit for a 3-bed house with EV charger; kitchen circuits for a commercial kitchen with 3-phase supply…"
                  disabled={isGenerating}
                  className={`${textareaClass} min-h-[160px]`}
                />
              </div>

              <label className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.08] cursor-pointer touch-manipulation">
                <input
                  type="checkbox"
                  checked={includeStandards}
                  onChange={(e) => setIncludeStandards(e.target.checked)}
                  disabled={isGenerating}
                  className="mt-0.5 h-5 w-5 rounded accent-elec-yellow touch-manipulation"
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-medium text-white">
                    Include BS 7671 standards references
                  </span>
                  <span className="mt-0.5 block text-[11.5px] text-white">
                    Adds regulation citations and amendment references to the output.
                  </span>
                </span>
              </label>

              <Divider />

              <PrimaryButton
                onClick={handleGenerate}
                disabled={isGenerating || !designQuery.trim()}
                fullWidth
              >
                {isGenerating ? `Generating… ${progress}%` : 'Generate with AI'}
              </PrimaryButton>

              {isGenerating && (
                <div className="space-y-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full bg-elec-yellow transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {currentStep && (
                    <div className="flex items-center gap-2">
                      <Dot tone="indigo" />
                      <span className="text-[12px] text-white">{currentStep}</span>
                    </div>
                  )}
                </div>
              )}

              {error && !isGenerating && (
                <div className="px-4 py-3 rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.08] flex items-start gap-3">
                  <Dot tone="red" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white">Generation failed</div>
                    <div className="mt-0.5 text-[12px] text-white">{error}</div>
                  </div>
                </div>
              )}

              {result && !isGenerating && (
                <div className="rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Dot tone="emerald" />
                      <span className="text-[13px] font-medium text-white">Spec ready</span>
                    </div>
                    <Pill tone="emerald">Complete</Pill>
                  </div>
                  {result.circuits && (
                    <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
                      <div className="bg-[hsl(0_0%_12%)] px-4 py-3">
                        <Eyebrow>Circuits</Eyebrow>
                        <div className="mt-1.5 text-xl font-semibold text-white tabular-nums">
                          {result.circuits?.length || 0}
                        </div>
                      </div>
                      <div className="bg-[hsl(0_0%_12%)] px-4 py-3">
                        <Eyebrow>Property</Eyebrow>
                        <div className="mt-1.5 text-xl font-semibold text-white capitalize">
                          {propertyType}
                        </div>
                      </div>
                    </div>
                  )}
                  <PrimaryButton onClick={handleDownload} fullWidth>
                    Download PDF
                  </PrimaryButton>
                </div>
              )}
            </div>
          </ListCard>
        }
        secondary={
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="History"
              meta={<Pill tone="blue">{filteredHistory.length}</Pill>}
            />
            {isGenerating && history.length === 0 ? (
              <div className="p-5">
                <LoadingBlocks />
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  title="No prior specs"
                  description="Drafts you generate will land here. Approve or send when they're ready."
                />
              </div>
            ) : (
              <ListBody>
                {filteredHistory.map((row) => {
                  const tone =
                    row.status === 'approved'
                      ? 'emerald'
                      : row.status === 'sent'
                        ? 'blue'
                        : 'amber';
                  return (
                    <ListRow
                      key={row.id}
                      title={row.title}
                      subtitle={row.subtitle}
                      trailing={<Pill tone={tone}>{row.statusLabel}</Pill>}
                      accent={tone}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>
        }
      />
    </PageFrame>
  );
}
