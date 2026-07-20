/**
 * JobSafetyPack — the one-screen "everything for THIS site" view a contractor
 * shows a principal contractor before the crew starts. Pick a job and see, on
 * live data only: assigned crew and their site-readiness (judged against the
 * employer's saved requirement set and the job start date), job-linked RAMS,
 * briefing sign-off registers, and job-linked compliance documents — plus a
 * branded PDF summary export.
 *
 * Every number on this screen is real. Nothing is fabricated: an empty area
 * says so and links to where the records are created.
 */
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Download, Loader2 } from 'lucide-react';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs } from '@/hooks/useJobs';
import { useJobAssignments } from '@/hooks/useJobAssignments';
import { useElecIdProfiles } from '@/hooks/useElecId';
import { useCertifications } from '@/hooks/useCertifications';
import { useRAMSDocuments } from '@/hooks/useRAMSDocuments';
import { useComplianceDocuments } from '@/hooks/useComplianceDocuments';
import {
  buildCompetenceMatrix,
  assessSiteReadiness,
  gapSentence,
  requirementLabel,
  REQUIREMENT_PRESETS,
} from '@/utils/competenceMatrix';
import {
  generateJobSafetyPackPdf,
  type JobSafetyPackPdfData,
  type PackStatusKind,
} from '@/utils/generateJobSafetyPackPdf';
import {
  PageFrame,
  Eyebrow,
  Pill,
  Dot,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  EmptyState,
  LoadingBlocks,
  Field,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

interface JobSafetyPackProps {
  onNavigate: (section: Section) => void;
  onBack: () => void;
}

interface PackBriefing {
  id: string;
  title: string;
  date: string;
  total: number;
  /** Attendees with a captured signature (signature_url set) */
  signed: number;
}

interface PackGap {
  area: 'crew' | 'rams' | 'briefings' | 'compliance';
  text: string;
}

const fmt = (iso: string | null | undefined): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

/** RAMS status → pill copy + tone. Live values: draft / generated / approved
 *  (plus submitted / rejected in the app's status model). */
const ramsStatusMeta = (
  status: string
): { label: string; tone: Tone; kind: PackStatusKind } => {
  switch (status) {
    case 'approved':
      return { label: 'Approved', tone: 'emerald', kind: 'good' };
    case 'submitted':
      return { label: 'Awaiting sign-off', tone: 'amber', kind: 'warn' };
    case 'generated':
      return { label: 'Generated — review', tone: 'amber', kind: 'warn' };
    case 'rejected':
      return { label: 'Rejected', tone: 'red', kind: 'bad' };
    default:
      return { label: 'Draft', tone: 'orange', kind: 'warn' };
  }
};

/** Compliance doc status judged from the recorded expiry first, then the
 *  stored status — an out-of-date status field must not hide a lapsed doc. */
const complianceStatusMeta = (doc: {
  status: string;
  expiry_date?: string | null;
}): { label: string; tone: Tone; kind: PackStatusKind } => {
  const today = new Date().toISOString().slice(0, 10);
  if ((doc.expiry_date && doc.expiry_date < today) || doc.status === 'Expired') {
    return { label: 'Expired', tone: 'red', kind: 'bad' };
  }
  if (doc.expiry_date) {
    const days = Math.ceil((new Date(doc.expiry_date).getTime() - Date.now()) / 86_400_000);
    if (days <= 30) return { label: `Expires in ${days}d`, tone: 'amber', kind: 'warn' };
  }
  if (doc.status === 'Draft' || doc.status === 'Pending') {
    return { label: doc.status, tone: 'amber', kind: 'warn' };
  }
  return { label: 'Current', tone: 'emerald', kind: 'good' };
};

export function JobSafetyPack({ onNavigate, onBack }: JobSafetyPackProps) {
  const [jobId, setJobId] = useState<string>('');
  const [exporting, setExporting] = useState(false);

  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const job = useMemo(() => jobs.find((j) => j.id === jobId) ?? null, [jobs, jobId]);

  const { data: assignments = [], isLoading: assignmentsLoading } = useJobAssignments(jobId);
  const { data: profiles = [], isLoading: profilesLoading } = useElecIdProfiles();
  const { data: certifications = [], isLoading: certsLoading } = useCertifications();
  const { data: ramsDocs = [], isLoading: ramsLoading } = useRAMSDocuments();
  const { data: complianceDocs = [], isLoading: complianceLoading } = useComplianceDocuments();

  // Employer's saved requirement set (single 'Default' row, newest first —
  // mirrors the Competence Matrix read). Falls back to the Commercial preset
  // when the employer hasn't set their own yet.
  const { data: reqSet, isLoading: reqSetLoading } = useQuery({
    queryKey: ['job-safety-pack', 'requirement-set'],
    queryFn: async (): Promise<{ keys: string[]; horizonDays: number } | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase
        .from('competence_requirement_sets' as never)
        .select('credential_keys, horizon_days')
        .eq('employer_id', user.id)
        .eq('name', 'Default')
        .order('updated_at', { ascending: false })
        .limit(1);
      if (error) throw error;
      const row = (
        data as unknown as { credential_keys: unknown; horizon_days: number | null }[] | null
      )?.[0];
      if (!row) return null;
      const keys = Array.isArray(row.credential_keys)
        ? row.credential_keys.filter((k): k is string => typeof k === 'string')
        : [];
      if (keys.length === 0) return null;
      return { keys, horizonDays: row.horizon_days ?? 60 };
    },
  });

  // Job-linked briefings with their sign-off registers. Signed = attendee has
  // a captured signature (signature_url), matching the sign-off flow.
  const { data: briefings = [], isLoading: briefingsLoading } = useQuery({
    queryKey: ['job-safety-pack', 'briefings', jobId],
    enabled: !!jobId,
    queryFn: async (): Promise<PackBriefing[]> => {
      const { data: rows, error } = await supabase
        .from('briefings')
        .select('id, title, date')
        .eq('job_id', jobId)
        .order('date', { ascending: false });
      if (error) throw error;
      const list = rows ?? [];
      if (list.length === 0) return [];
      const { data: attendees, error: attError } = await supabase
        .from('briefing_attendees')
        .select('briefing_id, signature_url')
        .in(
          'briefing_id',
          list.map((r) => r.id)
        );
      if (attError) throw attError;
      const counts = new Map<string, { total: number; signed: number }>();
      for (const a of attendees ?? []) {
        const c = counts.get(a.briefing_id) ?? { total: 0, signed: 0 };
        c.total += 1;
        if (a.signature_url) c.signed += 1;
        counts.set(a.briefing_id, c);
      }
      return list.map((r) => ({
        id: r.id,
        title: r.title,
        date: r.date,
        total: counts.get(r.id)?.total ?? 0,
        signed: counts.get(r.id)?.signed ?? 0,
      }));
    },
  });

  // ── Crew competence, judged against the requirement set + job start ──
  const usingPresetFallback = !reqSetLoading && !reqSet;
  const requiredKeys = useMemo(
    () => reqSet?.keys ?? REQUIREMENT_PRESETS.find((p) => p.id === 'commercial')?.keys ?? [],
    [reqSet]
  );
  const horizonDays = reqSet?.horizonDays ?? 60;

  const crew = useMemo(
    () => assignments.filter((a) => a.status !== 'declined'),
    [assignments]
  );
  const crewIds = useMemo(() => new Set(crew.map((a) => a.employee_id)), [crew]);
  const crewProfiles = useMemo(
    () => profiles.filter((p) => crewIds.has(p.employee_id)),
    [profiles, crewIds]
  );
  const unprofiledCrew = useMemo(
    () => crew.filter((a) => !profiles.some((p) => p.employee_id === a.employee_id)),
    [crew, profiles]
  );

  const matrix = useMemo(
    () => buildCompetenceMatrix(crewProfiles, certifications, { horizonDays }),
    [crewProfiles, certifications, horizonDays]
  );
  const readiness = useMemo(
    () =>
      crewProfiles.length > 0
        ? assessSiteReadiness(matrix, requiredKeys, job?.start_date ?? null)
        : null,
    [matrix, requiredKeys, crewProfiles.length, job?.start_date]
  );
  const requiredLabels = useMemo(
    () => requiredKeys.map((k) => requirementLabel(k, matrix.columns)),
    [requiredKeys, matrix.columns]
  );

  // Workers without an Elec-ID profile can't have their competence verified —
  // they count as not site-ready rather than silently disappearing.
  const readyCount = readiness?.readyCount ?? 0;
  const crewTotal = crew.length;

  const jobRams = useMemo(
    () => ramsDocs.filter((d) => d.employer_job_id === jobId),
    [ramsDocs, jobId]
  );
  const jobCompliance = useMemo(
    () => complianceDocs.filter((d) => d.job_id === jobId),
    [complianceDocs, jobId]
  );

  // ── Honest verdict — every gap traces to a record (or its absence) above ──
  const gaps = useMemo((): PackGap[] => {
    if (!job) return [];
    const out: PackGap[] = [];
    if (crewTotal === 0) {
      out.push({ area: 'crew', text: 'No crew assigned to this job' });
    } else {
      for (const w of readiness?.workers ?? []) {
        if (!w.ready) {
          out.push({ area: 'crew', text: `${w.name}: ${w.gaps.map(gapSentence).join('; ')}` });
        }
      }
      for (const a of unprofiledCrew) {
        out.push({
          area: 'crew',
          text: `${a.employee?.name ?? 'Crew member'}: no Elec-ID profile — competence cannot be verified`,
        });
      }
    }
    if (jobRams.length === 0) {
      out.push({ area: 'rams', text: 'No RAMS linked to this job' });
    } else if (!jobRams.some((d) => d.status === 'approved')) {
      out.push({ area: 'rams', text: 'No approved RAMS for this job yet' });
    }
    if (briefings.length === 0) {
      out.push({ area: 'briefings', text: 'No briefings linked to this job' });
    } else {
      for (const b of briefings) {
        if (b.total === 0) {
          out.push({ area: 'briefings', text: `${b.title}: no attendees on the register` });
        } else if (b.signed < b.total) {
          out.push({ area: 'briefings', text: `${b.title}: ${b.total - b.signed} unsigned` });
        }
      }
    }
    for (const d of jobCompliance) {
      if (complianceStatusMeta(d).kind === 'bad') {
        out.push({ area: 'compliance', text: `${d.title} has expired` });
      }
    }
    return out;
  }, [job, crewTotal, readiness, unprofiledCrew, jobRams, briefings, jobCompliance]);

  const packLoading =
    !!jobId &&
    (assignmentsLoading ||
      profilesLoading ||
      certsLoading ||
      ramsLoading ||
      briefingsLoading ||
      complianceLoading ||
      reqSetLoading);

  const ready = gaps.length === 0;

  const handleExport = async () => {
    if (!job || exporting) return;
    setExporting(true);
    try {
      const readinessByEmployee = new Map(
        (readiness?.workers ?? []).map((w) => [w.employeeId, w])
      );
      const pdfData: JobSafetyPackPdfData = {
        job: {
          title: job.title,
          client: job.client,
          location: job.location,
          startDate: job.start_date,
        },
        ready,
        gaps: gaps.map((g) => g.text),
        requiredLabels,
        referenceNote: readiness
          ? readiness.referenceIsJobStart
            ? `Expiries judged against the job start date (${fmt(readiness.referenceDate)}).`
            : 'Expiries judged against today.'
          : '',
        crew: crew.map((a) => {
          const w = readinessByEmployee.get(a.employee_id);
          const name = a.employee?.name ?? 'Crew member';
          const role = a.role_on_job || a.employee?.role || 'Electrician';
          if (!w) {
            return {
              name,
              role,
              ready: false,
              detail: 'No Elec-ID profile — competence cannot be verified',
            };
          }
          return {
            name,
            role,
            ready: w.ready,
            detail: w.ready ? '' : w.gaps.map(gapSentence).join('; '),
          };
        }),
        rams: jobRams.map((d) => ({
          title: d.project_name,
          status: ramsStatusMeta(d.status).label,
          statusKind: ramsStatusMeta(d.status).kind,
          date: `Updated ${fmt(d.updated_at)}`,
        })),
        briefings: briefings.map((b) => ({
          title: b.title,
          date: b.date,
          signed: b.signed,
          total: b.total,
        })),
        compliance: jobCompliance.map((d) => {
          const meta = complianceStatusMeta(d);
          return {
            title: d.title,
            status: meta.label,
            statusKind: meta.kind,
            expiry: d.expiry_date ?? null,
          };
        }),
      };
      const doc = await generateJobSafetyPackPdf(pdfData);
      const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      doc.save(`job-safety-pack-${slug || 'job'}.pdf`);
    } catch {
      toast({
        title: 'Export failed',
        description: 'Could not build the pack PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <PageFrame>
      {/* Header */}
      <div className="space-y-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 h-11 -ml-2 px-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Safety
        </button>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <Eyebrow>For the principal contractor</Eyebrow>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Job safety pack
            </h1>
            <p className="mt-2 text-[13px] text-white/60 max-w-xl leading-relaxed">
              Crew competence, RAMS, briefings and compliance for one site — built entirely from
              your live records.
            </p>
          </div>
          {job && (
            <button
              onClick={handleExport}
              disabled={exporting || packLoading}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 disabled:opacity-50 transition-colors touch-manipulation"
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Download className="h-4 w-4" aria-hidden />
              )}
              Export pack summary (PDF)
            </button>
          )}
        </div>

        {/* Job picker */}
        {jobsLoading ? (
          <div className="h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No jobs yet"
            description="Create a job first — the safety pack pulls everything linked to it into one screen."
            action="Go to Jobs"
            onAction={() => onNavigate('jobs')}
          />
        ) : (
          <Field label="Job">
            <Select value={jobId} onValueChange={setJobId}>
              <SelectTrigger className={`${selectTriggerClass} w-full sm:max-w-md`}>
                <SelectValue placeholder="Choose a job to build its pack" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {jobs.map((j) => (
                  <SelectItem key={j.id} value={j.id} className="py-3">
                    {j.title}
                    {j.client ? ` — ${j.client}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>

      {/* No job selected — what this screen is for */}
      {!jobId && !jobsLoading && jobs.length > 0 && (
        <EmptyState
          title="Pick a job to build its safety pack"
          description="You'll get one screen per site: who's on the crew and whether they're site-ready, the RAMS covering the work, briefing sign-off registers, and any compliance documents — with a branded PDF summary to hand to the principal contractor."
        />
      )}

      {/* Loading the selected job's records */}
      {jobId && packLoading && <LoadingBlocks />}

      {jobId && !packLoading && job && (
        <>
          {/* Pack status header */}
          <ListCard>
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl font-semibold text-white leading-tight">
                    {job.title}
                  </div>
                  <div className="mt-1 text-[12.5px] text-white/60">
                    {[job.client, job.location].filter(Boolean).join(' · ')}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-white/60">
                    {job.start_date ? `Starts ${fmt(job.start_date)}` : 'No start date set'}
                  </div>
                </div>
                <Pill tone={ready ? 'emerald' : 'red'} className="text-[12px] px-3 py-1">
                  {ready
                    ? 'Ready for site'
                    : `${gaps.length} gap${gaps.length === 1 ? '' : 's'}`}
                </Pill>
              </div>
              {ready ? (
                <p className="text-[12.5px] text-white/55 leading-relaxed">
                  No gaps found in the linked records — crew, RAMS, briefings and compliance are
                  all in order for this job.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {gaps.slice(0, 8).map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12.5px] text-white/70">
                      <Dot tone="red" className="mt-1.5" />
                      <span className="min-w-0">{g.text}</span>
                    </li>
                  ))}
                  {gaps.length > 8 && (
                    <li className="text-[12px] text-white/45 pl-3.5">
                      +{gaps.length - 8} more — all listed in the PDF export
                    </li>
                  )}
                </ul>
              )}
            </div>
          </ListCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Crew competence */}
            <ListCard>
              <ListCardHeader
                title="Crew competence"
                tone="yellow"
                meta={
                  crewTotal > 0 ? (
                    <Pill tone={readyCount === crewTotal ? 'emerald' : 'amber'}>
                      {readyCount}/{crewTotal} site-ready
                    </Pill>
                  ) : undefined
                }
                action="Full matrix"
                onAction={() => onNavigate('elecid')}
              />
              {crewTotal === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-[13px] text-white/60">No crew assigned to this job yet.</p>
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="mt-3 inline-flex h-11 items-center text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Assign workers in Jobs →
                  </button>
                </div>
              ) : (
                <>
                  <ListBody>
                    {crew.map((a) => {
                      const w = readiness?.workers.find(
                        (r) => r.employeeId === a.employee_id
                      );
                      const name = a.employee?.name ?? 'Crew member';
                      const role = a.role_on_job || a.employee?.role || 'Electrician';
                      if (!w) {
                        return (
                          <ListRow
                            key={a.id}
                            accent="red"
                            title={name}
                            subtitle="No Elec-ID profile — competence cannot be verified"
                            trailing={<Pill tone="red">Not verified</Pill>}
                          />
                        );
                      }
                      return (
                        <ListRow
                          key={a.id}
                          accent={w.ready ? 'emerald' : 'red'}
                          title={name}
                          subtitle={
                            w.ready ? role : w.gaps.map(gapSentence).join('; ')
                          }
                          trailing={
                            <Pill tone={w.ready ? 'emerald' : 'red'}>
                              {w.ready ? 'Ready' : `${w.gaps.length} gap${w.gaps.length === 1 ? '' : 's'}`}
                            </Pill>
                          }
                        />
                      );
                    })}
                  </ListBody>
                  <div className="px-5 py-3 border-t border-white/[0.06] text-[11px] text-white/45 leading-relaxed">
                    Required: {requiredLabels.join(', ')}.{' '}
                    {readiness?.referenceIsJobStart
                      ? `Expiries judged against the job start (${fmt(readiness.referenceDate)}).`
                      : 'Expiries judged against today.'}
                    {usingPresetFallback &&
                      ' Using the Commercial site preset — set your own requirements in the competence matrix.'}
                  </div>
                </>
              )}
            </ListCard>

            {/* RAMS */}
            <ListCard>
              <ListCardHeader
                title="RAMS"
                tone="orange"
                meta={
                  jobRams.length > 0 ? (
                    <Pill tone={jobRams.some((d) => d.status === 'approved') ? 'emerald' : 'amber'}>
                      {jobRams.length} linked
                    </Pill>
                  ) : (
                    <Pill tone="red">None linked</Pill>
                  )
                }
                action="Open RAMS"
                onAction={() => onNavigate('rams')}
              />
              {jobRams.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-[13px] text-white/60">No RAMS linked to this job.</p>
                  <button
                    onClick={() => onNavigate('rams')}
                    className="mt-3 inline-flex h-11 items-center text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Link or create RAMS →
                  </button>
                </div>
              ) : (
                <ListBody>
                  {jobRams.map((d) => {
                    const meta = ramsStatusMeta(d.status);
                    return (
                      <ListRow
                        key={d.id}
                        title={d.project_name}
                        subtitle={`Updated ${fmt(d.updated_at)}`}
                        trailing={<Pill tone={meta.tone}>{meta.label}</Pill>}
                      />
                    );
                  })}
                </ListBody>
              )}
            </ListCard>

            {/* Briefings */}
            <ListCard>
              <ListCardHeader
                title="Briefings & toolbox talks"
                tone="amber"
                meta={
                  briefings.length > 0 ? (
                    <Pill
                      tone={
                        briefings.every((b) => b.total > 0 && b.signed >= b.total)
                          ? 'emerald'
                          : 'amber'
                      }
                    >
                      {briefings.length} linked
                    </Pill>
                  ) : undefined
                }
                action="Open briefings"
                onAction={() => onNavigate('briefings')}
              />
              {briefings.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-[13px] text-white/60">
                    No briefings linked to this job yet.
                  </p>
                  <button
                    onClick={() => onNavigate('briefings')}
                    className="mt-3 inline-flex h-11 items-center text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Run a briefing for this job →
                  </button>
                </div>
              ) : (
                <ListBody>
                  {briefings.map((b) => {
                    const fullySigned = b.total > 0 && b.signed >= b.total;
                    return (
                      <ListRow
                        key={b.id}
                        title={b.title}
                        subtitle={fmt(b.date)}
                        trailing={
                          <Pill tone={fullySigned ? 'emerald' : 'amber'}>
                            {b.total === 0 ? 'No register' : `${b.signed}/${b.total} signed`}
                          </Pill>
                        }
                      />
                    );
                  })}
                </ListBody>
              )}
            </ListCard>

            {/* Compliance documents */}
            <ListCard>
              <ListCardHeader
                title="Compliance documents"
                tone="cyan"
                meta={
                  jobCompliance.length > 0 ? (
                    <Pill
                      tone={
                        jobCompliance.some((d) => complianceStatusMeta(d).kind === 'bad')
                          ? 'red'
                          : 'emerald'
                      }
                    >
                      {jobCompliance.length} linked
                    </Pill>
                  ) : undefined
                }
                action="Open compliance"
                onAction={() => onNavigate('compliance')}
              />
              {jobCompliance.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-[13px] text-white/60">
                    No compliance documents linked to this job.
                  </p>
                  <button
                    onClick={() => onNavigate('compliance')}
                    className="mt-3 inline-flex h-11 items-center text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Add permits & inductions →
                  </button>
                </div>
              ) : (
                <ListBody>
                  {jobCompliance.map((d) => {
                    const meta = complianceStatusMeta(d);
                    return (
                      <ListRow
                        key={d.id}
                        title={d.title}
                        subtitle={
                          d.expiry_date ? `Expires ${fmt(d.expiry_date)}` : 'No expiry recorded'
                        }
                        trailing={<Pill tone={meta.tone}>{meta.label}</Pill>}
                      />
                    );
                  })}
                </ListBody>
              )}
            </ListCard>
          </div>

          {/* Bottom export for thumb reach on mobile */}
          <div className="sm:hidden">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold disabled:opacity-50 transition-colors touch-manipulation"
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Download className="h-4 w-4" aria-hidden />
              )}
              Export pack summary (PDF)
            </button>
          </div>
        </>
      )}
    </PageFrame>
  );
}
