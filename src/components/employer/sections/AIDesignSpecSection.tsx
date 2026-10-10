/**
 * AI design in the Employer Hub (ELE-1943): the full circuit-design engine,
 * designing for one of the firm's jobs.
 *
 * - The design is the firm's: filed with the firm (and the job) the moment it
 *   starts, so co-admins see it and it shows on the job in Smart Docs.
 * - From a design: put its PDF in the job's pack, start a quote for the job
 *   with its cable and devices as priced lines, or move it to another job.
 * - The crew on the job read it in Worker Tools (JobDesignPanel).
 *
 * The wizard, the streaming and the results are the Electrical Hub's own
 * (AIInstallationDesigner variant="employer"); nothing about the electrician's
 * designer changes. Reads of the firm's designs go through definer functions
 * (get_firm_designs, get_design_detail) rather than widening the table's RLS.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  AIInstallationDesigner,
  mapDesignJobToResults,
} from '@/components/electrician-tools/circuit-designer/AIInstallationDesigner';
import { recommendBoardLayout } from '@/components/electrician-tools/circuit-designer/board-recommender';
import { computeInstallationCost } from '@/components/electrician-tools/circuit-designer/cost-calculator';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroSecondary,
  TwoColumn,
  Row,
  PanelHead,
  PlainEmpty,
  Tag,
  panel,
  rowBtnSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { AI_DESIGN_HELP } from '@/components/employer/help/clients';
import { FirmJobPicker, useFirmJobTitle } from '@/components/employer/smart-docs/FirmJobPicker';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { useActingFirmId } from '@/hooks/useEmployerHome';
import { useJobs } from '@/hooks/useJobs';
import {
  fileDesignWithFirm,
  useDesignDetail,
  useFirmDesigns,
  type FirmDesign,
} from '@/hooks/useFirmSafetyDocs';
import { designQuoteLines } from '@/utils/designMaterials';
import { persistPackDocument } from '@/utils/persistPackDocument';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { DesignInputs } from '@/types/installation-design';

interface AIDesignSpecSectionProps {
  onNavigate: (section: Section) => void;
}

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

const running = (s: string) => s === 'pending' || s === 'processing';

export function AIDesignSpecSection({ onNavigate }: AIDesignSpecSectionProps) {
  const [params, setParams] = useSearchParams();
  const jobId = params.get('job');
  const designId = params.get('design');
  const { data: firmId } = useActingFirmId();
  const { data: designs = [], isLoading } = useFirmDesigns(null);
  const jobTitle = useFirmJobTitle(jobId);
  const qc = useQueryClient();
  const { toast } = useToast();

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: key === 'job' });
  };

  const forJob = jobId ? designs.filter((d) => d.job_id === jobId) : [];
  const others = jobId ? designs.filter((d) => d.job_id !== jobId) : designs;
  const statusLine = designId
    ? 'A saved design. Put it in the job pack, quote from it, or start a new one.'
    : jobId
      ? forJob.length
        ? `${plural(forJob.length, 'design')} for ${jobTitle ?? 'this job'}. Open one, or design again below.`
        : `Designing for ${jobTitle ?? 'this job'}. It is saved to the job as it starts.`
      : designs.length
        ? `${plural(designs.length, 'design')} for the firm. Pick a job to design for it.`
        : 'Pick a job, then design the installation. Every circuit sized, protected and checked.';

  /** File a design with the firm, and the job when one is picked, as soon as it starts. */
  const fileNew = async (newId: string) => {
    if (!firmId) return;
    try {
      await fileDesignWithFirm(newId, firmId, jobId);
      void qc.invalidateQueries({ queryKey: ['firm-designs'] });
      void qc.invalidateQueries({ queryKey: ['firm-documents'] });
    } catch (err) {
      toast({
        title: 'Not saved to the job',
        description:
          err instanceof Error
            ? `${err.message}. The design is still running; move it to the job when it is done.`
            : 'The design is still running; move it to the job when it is done.',
        variant: 'destructive',
      });
    }
  };

  const designRow = (d: FirmDesign, showJob: boolean) => (
    <Row
      key={d.id}
      title={d.title}
      detail={[
        showJob ? (d.job_title ?? 'No job') : null,
        d.circuits ? plural(d.circuits, 'circuit') : null,
        `${d.mine ? 'You' : d.made_by}, ${day(d.created_at)}`,
      ]
        .filter(Boolean)
        .join(' · ')}
      status={
        running(d.status) ? (
          <Tag tone="outline">Designing</Tag>
        ) : d.status === 'complete' ? undefined : (
          <Tag tone="red">{d.status === 'cancelled' ? 'Cancelled' : 'Failed'}</Tag>
        )
      }
      onClick={d.status === 'complete' ? () => setParam('design', d.id) : undefined}
    />
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="AI design"
        description={statusLine}
        actions={
          <HeroActions>
            {designId ? (
              <HeroSecondary
                label="New design"
                labelOnPhone
                onClick={() => setParam('design', null)}
              >
                New design
              </HeroSecondary>
            ) : (
              <HeroSecondary
                label="All documents"
                labelOnPhone
                onClick={() => onNavigate('smartdocs')}
              >
                All documents
              </HeroSecondary>
            )}
            <PageHelpButton help={AI_DESIGN_HELP} askContext={{ page: 'aidesignspec' }} />
          </HeroActions>
        }
      />
      <HowItWorks help={AI_DESIGN_HELP} askContext={{ page: 'aidesignspec' }} />

      {designId ? (
        <SavedDesign
          key={designId}
          designId={designId}
          firmId={firmId ?? null}
          onBack={() => setParam('design', null)}
        />
      ) : (
        <>
          <TwoColumn
            main={
              <section className={panel} data-help="aidesign.job">
                <PanelHead title="The job" />
                <div className="space-y-2 px-4 py-4 sm:px-5">
                  <FirmJobPicker
                    value={jobId}
                    onChange={(id) => setParam('job', id)}
                    allowNone="No job yet"
                  />
                  <p className="text-[13px] leading-snug text-white">
                    {jobId
                      ? 'The design below is saved to this job, so the office, the job pack and the crew all see it.'
                      : 'Pick the job this design is for. Without one it is saved to the firm only.'}
                  </p>
                </div>
                {jobId && forJob.length > 0 && (
                  <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
                    {forJob.map((d) => designRow(d, false))}
                  </div>
                )}
              </section>
            }
            side={
              <section className={panel} data-help="aidesign.list">
                <PanelHead title={jobId ? 'Other designs' : 'The firm’s designs'} />
                {isLoading ? (
                  <div className="px-4 py-4 sm:px-5">
                    <LoadingBlocks />
                  </div>
                ) : others.length === 0 ? (
                  <PlainEmpty
                    bare
                    stacked
                    text="Designs made here are the firm’s. They show here, on the job, and to the crew on it."
                  />
                ) : (
                  <div className="divide-y divide-white/[0.07]">
                    {others.slice(0, 8).map((d) => designRow(d, true))}
                  </div>
                )}
              </section>
            }
          />
          <div data-help="aidesign.wizard">
            <NewDesign key={jobId ?? 'none'} jobId={jobId} onStarted={fileNew} />
          </div>
        </>
      )}
    </PageFrame>
  );
}

/** The wizard, started with the picked job's details. */
function NewDesign({
  jobId,
  onStarted,
}: {
  jobId: string | null;
  onStarted: (designId: string) => void;
}) {
  const { data: jobs = [] } = useJobs();
  const job = jobs.find((j) => j.id === jobId);
  const initialData = useMemo<Partial<DesignInputs> | undefined>(
    () =>
      job
        ? {
            projectName: job.title || undefined,
            location: job.location || undefined,
            clientName: job.client || undefined,
          }
        : undefined,
    [job]
  );
  return (
    <AIInstallationDesigner
      variant="employer"
      initialData={initialData}
      onDesignStarted={onStarted}
    />
  );
}

/** A saved design: its results, and what the office does with it next. */
function SavedDesign({
  designId,
  firmId,
  onBack,
}: {
  designId: string;
  firmId: string | null;
  onBack: () => void;
}) {
  const { data, isLoading, error } = useDesignDetail(designId);
  const { data: jobs = [] } = useJobs();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const design = useMemo(() => {
    const dd = data?.design_data as { circuits?: unknown[] } | null | undefined;
    if (!dd || !Array.isArray(dd.circuits)) return null;
    return mapDesignJobToResults(dd, data?.job_inputs ?? null);
  }, [data]);
  const lines = useMemo(() => designQuoteLines(design), [design]);
  const job = jobs.find((j) => j.id === data?.job_id);

  if (isLoading) return <LoadingBlocks />;
  if (error || !data || !design) {
    return (
      <PlainEmpty
        text="This design could not be opened. It may belong to someone else, or not be finished."
        action="Back to designs"
        onAction={onBack}
      />
    );
  }

  const moveToJob = async (newJob: string | null) => {
    if (!data.mine || !firmId) return;
    setBusy('job');
    try {
      await fileDesignWithFirm(designId, firmId, newJob);
      void qc.invalidateQueries({ queryKey: ['design-detail', designId] });
      void qc.invalidateQueries({ queryKey: ['firm-designs'] });
      void qc.invalidateQueries({ queryKey: ['firm-documents'] });
      toast({ title: newJob ? 'Saved to the job' : 'Taken off the job' });
    } catch (err) {
      toast({
        title: 'Not changed',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  /** Build the design's PDF and put it in the job's pack for the crew. */
  const toPack = async () => {
    if (!data.job_id || !firmId) return;
    setBusy('pack');
    try {
      const { data: pack } = await supabase
        .from('employer_job_packs')
        .select('id')
        .eq('job_id', data.job_id)
        .eq('employer_id', firmId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!pack) {
        toast({
          title: 'This job has no pack yet',
          description: 'Make a job pack for it in Job packs, then add the design.',
        });
        return;
      }
      const layout = recommendBoardLayout(design);
      const cost = computeInstallationCost(design, layout, 'standard');
      const d = design as {
        totalLoad?: number;
        diversifiedLoad?: number;
        diversityFactor?: number;
      };
      const { data: pdf, error: pdfErr } = await supabase.functions.invoke(
        'generate-circuit-design-pdf',
        {
          body: {
            design,
            layout,
            cost,
            stats: {
              totalLoad: d.totalLoad ?? 0,
              diversifiedLoad: d.diversifiedLoad ?? 0,
              diversityFactor: d.diversityFactor ?? null,
            },
            a4: [],
            // The firm's branding on the PDF (the owner's company profile).
            userId: firmId,
          },
        }
      );
      const url =
        (pdf as { downloadUrl?: string; url?: string } | null)?.downloadUrl ??
        (pdf as { url?: string } | null)?.url;
      if (pdfErr || !url) throw new Error('The design PDF could not be built. Try again.');
      const ok = await persistPackDocument({
        jobPackId: pack.id,
        title: `Design: ${(design as { projectName?: string }).projectName ?? 'Installation design'}`,
        documentType: 'design_spec',
        transientUrl: url,
      });
      if (!ok) throw new Error('It could not be saved to the job pack. Try again.');
      toast({ title: 'Added to the job pack', description: 'The crew see it with the pack.' });
    } catch (err) {
      toast({
        title: 'Not added',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const projectName = (design as { projectName?: string }).projectName;

  return (
    <div className="space-y-6 sm:space-y-8">
      <TwoColumn
        main={
          <section className={panel}>
            <PanelHead title={projectName ?? 'Design'} action="Back to designs" onAction={onBack} />
            <div className="divide-y divide-white/[0.07]">
              <Row
                title={data.job_title ?? 'Not on a job'}
                detail={
                  data.job_title
                    ? 'The crew on this job can read it in Worker Tools.'
                    : 'Save it to a job so the crew and the job pack get it.'
                }
                action={
                  data.job_id ? (
                    <button
                      type="button"
                      className={rowBtnSecondary}
                      disabled={!!busy}
                      onClick={() => void toPack()}
                    >
                      {busy === 'pack' ? 'Adding…' : 'Add to job pack'}
                    </button>
                  ) : undefined
                }
              />
              <Row
                title="Quote from it"
                detail={
                  lines.length
                    ? `${plural(lines.length, 'line')} of cable and devices, priced from the design. You check every price.`
                    : 'No cable or devices to quote from.'
                }
                action={
                  lines.length ? (
                    <button
                      type="button"
                      className={rowBtnSecondary}
                      onClick={() => setQuoteOpen(true)}
                    >
                      Start a quote
                    </button>
                  ) : undefined
                }
              />
            </div>
          </section>
        }
        side={
          data.mine ? (
            <section className={panel}>
              <PanelHead title="Job" />
              <div className="space-y-2 px-4 py-4 sm:px-5">
                <FirmJobPicker
                  value={data.job_id}
                  onChange={(id) => void moveToJob(id)}
                  allowNone="Not on a job"
                />
                <p className="text-[13px] leading-snug text-white">
                  {busy === 'job' ? 'Saving…' : 'Move the design to another job, or take it off.'}
                </p>
              </div>
            </section>
          ) : undefined
        }
      />

      <AIInstallationDesigner key={designId} variant="employer" initialDesign={design} />

      <CreateQuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        jobId={data.job_id ?? undefined}
        prefillClient={job?.client || undefined}
        prefillAddress={job?.location || undefined}
        prefillTitle={projectName || job?.title || undefined}
        prefillLines={quoteOpen ? lines : undefined}
      />
    </div>
  );
}
