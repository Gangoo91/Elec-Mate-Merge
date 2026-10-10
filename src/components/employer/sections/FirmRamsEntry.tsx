/**
 * "Safety documents for this job" (ELE-1941): the Employer Hub's one way into
 * the shared AI RAMS generator. AI RAMS and AI method statement used to be two
 * entries; one run has always produced both, so there is now one, and it always
 * starts from a job.
 *
 * Picking a job fills in its site, client, dates, the firm (contractor), the
 * supervisor and a first-aider from the roster and competence records. The run
 * is filed against the job from the start (so it is never lost), and when it is
 * issued the PDF goes into the job's pack for crew sign-off by itself (see
 * RAMSResultsPage). A second run with the same brief for the same job is
 * offered back instead of being paid for twice (AIRAMSGenerator).
 *
 * The generator itself is the Electrical Hub's, opened in the firm's scope
 * (Site Safety section), on the same rows as everything else in Site Safety.
 */
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { useRecentGeneratedRams } from '@/hooks/useRecentGeneratedRams';
import { useJobSafetyPeople } from '@/hooks/useFirmSafetyDocs';
import {
  useSafetyScope,
  isFirmScope,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';
import { attachIssuedRamsToPack } from '@/utils/attachIssuedRamsToPack';
import { useToast } from '@/hooks/use-toast';
import { useJobs } from '@/hooks/useJobs';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import { FirmJobPicker } from '@/components/employer/smart-docs/FirmJobPicker';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { SAFETY_DOCS_HELP } from '@/components/employer/help/safetyDocs';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  TwoColumn,
  Row,
  KeyValue,
  PanelHead,
  PlainEmpty,
  Tag,
  panel,
  rowBtnSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

const running = (s: string) => s === 'pending' || s === 'processing';

export function FirmRamsEntry({ onNavigate }: { onNavigate: (section: Section) => void }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const scope = useSafetyScope();
  const [params, setParams] = useSearchParams();
  const jobId = params.get('job');
  const [attaching, setAttaching] = useState<string | null>(null);
  const { data: jobs = [] } = useJobs();
  const jobTitle = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);
  const { data: firmRams = [], isLoading } = useRecentGeneratedRams(40);
  const { data: people, isLoading: peopleLoading } = useJobSafetyPeople(jobId);

  const pickJob = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('job', id);
    else next.delete('job');
    setParams(next, { replace: true });
  };

  const start = () => {
    if (!jobId) {
      toast({ title: 'Pick the job first', description: 'Every RAMS is made for a job.' });
      document.querySelector('[data-help="safetydocs.job"]')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    navigate(`/employer?section=site-safety&tool=ai-rams&job=${jobId}`);
  };
  const open = (id: string) => navigate(`/employer?section=site-safety&tool=rams-result&id=${id}`);

  /** Put an issued RAMS into its job's pack (runs made before this was automatic). */
  const attach = async (generationJobId: string) => {
    if (!isFirmScope(scope)) return;
    setAttaching(generationJobId);
    const res = await attachIssuedRamsToPack(generationJobId, scope.employerId);
    setAttaching(null);
    toast(
      res === 'attached'
        ? { title: 'Added to the job pack', description: 'Ready for the crew to sign.' }
        : res === 'already'
          ? { title: 'Already in the job pack' }
          : res === 'no-pack'
            ? {
                title: 'This job has no pack yet',
                description: 'Make a job pack for it, then add the RAMS.',
              }
            : res === 'no-job'
              ? { title: 'Not filed against a job', description: 'Only job RAMS go into a pack.' }
              : {
                  title: 'Not added',
                  description: 'Open the RAMS and issue the PDF first, then try again.',
                  variant: 'destructive',
                }
    );
  };

  const forJob = jobId ? firmRams.filter((r) => r.employerJobId === jobId) : [];
  const others = jobId ? firmRams.filter((r) => r.employerJobId !== jobId) : firmRams;
  const notIssued = firmRams.filter((r) => !r.issuedVersion && !running(r.status)).length;
  const job = people?.job;

  const statusLine = jobId
    ? forJob.length
      ? `${plural(forJob.length, 'run')} for ${job?.title ?? 'this job'}. Open one, or generate again.`
      : `Nothing generated for ${job?.title ?? 'this job'} yet. One run gives the RAMS and its method statement.`
    : isLoading
      ? 'Loading the firm’s safety documents'
      : notIssued
        ? `${plural(notIssued, 'run')} waiting to be checked and issued. Pick a job to start another.`
        : 'Pick a job. One run gives its RAMS and method statement, filled in with your people.';

  const runRow = (r: (typeof firmRams)[number], showJob: boolean) => (
    <Row
      key={r.id}
      title={r.title}
      detail={[
        showJob
          ? r.employerJobId
            ? (jobTitle.get(r.employerJobId) ?? 'A firm job')
            : 'No job'
          : null,
        `Generated ${fmtDate(r.createdAt)}`,
      ]
        .filter(Boolean)
        .join(' · ')}
      status={
        running(r.status) ? (
          <Tag tone="outline">Generating</Tag>
        ) : r.issuedVersion ? (
          <Tag tone="done">Issued v{r.issuedVersion}</Tag>
        ) : (
          <Tag tone="yellow">Not issued</Tag>
        )
      }
      action={
        r.issuedVersion && r.employerJobId ? (
          <button
            type="button"
            className={rowBtnSecondary}
            disabled={attaching === r.id}
            onClick={(e) => {
              e.stopPropagation();
              void attach(r.id);
            }}
          >
            {attaching === r.id ? 'Adding…' : 'Add to pack'}
          </button>
        ) : undefined
      }
      onClick={() => open(r.id)}
    />
  );

  const missing = (label: string) => (
    <span className="text-[13px] font-medium text-white">{label}</span>
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Safety documents"
        description={statusLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={start} data-help="safetydocs.start">
              {forJob.length ? 'Generate again' : 'Generate'}
            </HeroPrimary>
            <HeroSecondary
              onClick={() => navigate('/employer?section=site-safety&tool=method-statement')}
            >
              Write by hand
            </HeroSecondary>
            <PageHelpButton help={SAFETY_DOCS_HELP} askContext={{ page: 'airams' }} />
          </HeroActions>
        }
      />
      <HowItWorks help={SAFETY_DOCS_HELP} askContext={{ page: 'airams' }} />

      <TwoColumn
        main={
          <>
            <section className={panel} data-help="safetydocs.job">
              <PanelHead title="The job" />
              <div className="space-y-2 px-4 py-4 sm:px-5">
                <FirmJobPicker value={jobId} onChange={pickJob} />
                <p className="text-[13px] leading-snug text-white">
                  {jobId
                    ? 'Filled in from the job and your team. Every run is saved to the job.'
                    : 'Every RAMS starts from a job, so it is saved to that job and its pack.'}
                </p>
              </div>
            </section>

            {jobId && (
              <section className={panel}>
                <PanelHead title="For this job" />
                {isLoading ? (
                  <div className="px-4 py-4 sm:px-5">
                    <LoadingBlocks />
                  </div>
                ) : forJob.length === 0 ? (
                  <PlainEmpty
                    bare
                    text="Nothing generated for this job yet."
                    action="Generate"
                    onAction={start}
                  />
                ) : (
                  <div className="divide-y divide-white/[0.07]">
                    {forJob.map((r) => runRow(r, false))}
                  </div>
                )}
              </section>
            )}

            <section className={panel}>
              <PanelHead
                title={jobId ? 'Other jobs' : 'The firm’s safety documents'}
                action="RAMS register"
                onAction={() => onNavigate('rams')}
              />
              {isLoading ? (
                <div className="px-4 py-4 sm:px-5">
                  <LoadingBlocks />
                </div>
              ) : others.length === 0 ? (
                <PlainEmpty
                  bare
                  text="Each run gives a RAMS and its method statement, saved to the job it was made for."
                />
              ) : (
                <div className="divide-y divide-white/[0.07]">
                  {others.map((r) => runRow(r, true))}
                </div>
              )}
            </section>
          </>
        }
        side={
          <section className={panel} data-help="safetydocs.people">
            <PanelHead title="Filled in for you" />
            {!jobId ? (
              <PlainEmpty
                bare
                stacked
                text="Pick a job to see who goes on the documents: your company, the supervisor, a first-aider and the site contact."
              />
            ) : peopleLoading ? (
              <div className="px-4 py-4 sm:px-5">
                <LoadingBlocks />
              </div>
            ) : (
              <div className="divide-y divide-white/[0.07]">
                <KeyValue
                  label="Contractor"
                  value={people?.contractor ?? missing('Add it in Settings')}
                />
                <KeyValue
                  label="Supervisor"
                  value={people?.supervisor?.name ?? missing('Nobody named')}
                />
                <KeyValue
                  label="First-aider"
                  value={people?.first_aider?.name ?? missing('None on the crew’s records')}
                />
                <KeyValue
                  label="Site contact"
                  value={job?.site_contact_name ?? missing('Not on the job')}
                />
                <KeyValue
                  label="Crew"
                  value={plural(people?.crew.length ?? 0, 'person', 'people')}
                />
                <KeyValue
                  label="Job pack"
                  value={people?.pack?.title ? 'Gets the issued PDF' : missing('No pack yet')}
                />
                <p className="px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
                  {people?.first_aider
                    ? `${people.first_aider.name} holds ${people.first_aider.cert}.`
                    : 'A first-aider comes from an in-date first aid certificate on someone in the crew.'}{' '}
                  You can change any name before you generate.
                </p>
              </div>
            )}
          </section>
        }
      />
    </PageFrame>
  );
}
