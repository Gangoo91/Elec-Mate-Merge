/**
 * CompetenceMatrix — the workforce competence grid principal contractors and
 * clients ask every electrical contractor for: workers × credential types,
 * each cell showing the governing expiry with red/amber/green status.
 *
 * Desktop renders the full grid (sticky worker column). Mobile renders a
 * per-worker credential card — no horizontal-scrolling tables on a phone.
 * One-tap branded PDF + CSV exports, and a per-worker "nudge to renew" that
 * rides the existing comms rails (recipients get the push the DB triggers
 * already deliver) — the amber glow finally reaches the worker's phone.
 *
 * On top of the base grid:
 *  - Crew scope: filter to one job's assigned workers, threading the job into
 *    the PDF/CSV — the pack you send a principal contractor for THAT site.
 *  - Site requirements: preset or custom credential checklists with a
 *    site-ready verdict per worker; expiries judged against the job start
 *    date when a crew job is selected.
 *  - Expiry horizon: 30/60/90-day amber threshold to match what the client
 *    demands, reflected in the legend and exports.
 *  - Certificate numbers for auditors, and how each cell was checked
 *    (self-declared / document seen / verified at source — ELE-1950).
 *
 * Data: the person's own Elec-ID store, resolved per roster member by
 * get_team_credentials() (via useElecIdProfiles in the parent).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  FileSpreadsheet,
  Send,
  Loader2,
  Share2,
  ClipboardCheck,
  ChevronDown,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCreateCommunication } from '@/hooks/useCommunications';
import { useJobs } from '@/hooks/useJobs';
import { useJobAssignments } from '@/hooks/useJobAssignments';
import type { ElecIdProfile } from '@/services/elecIdService';
import {
  buildCompetenceMatrix,
  buildCompetenceMatrixCsv,
  renewalItemsFor,
  assessSiteReadiness,
  gapSentence,
  requirementLabel,
  REQUIREMENT_PRESETS,
  type MatrixCell,
  type MatrixScope,
} from '@/utils/competenceMatrix';
import { verificationLabel, verificationShortLabel } from '@/services/credentialsService';
import { PrimaryButton } from '@/components/employer/editorial';
import FormSheet from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import {
  panel,
  PanelTitle,
  Row,
  RowList,
  rowsClass,
  StatusPill,
  PlainEmpty,
  Segments,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { getActingEmployerId } from '@/lib/actingEmployer';
import {
  AssignCourseSheet,
  type AssignCoursePerson,
} from '@/components/employer/AssignCourseSheet';
import { CourseAssignmentsList } from '@/components/employer/CourseAssignmentsList';
import { courseForCredential } from '@/data/assignableCourses';
import {
  useTeamTrainingEvidence,
  trainingEvidenceLine,
  hoursLabel,
} from '@/hooks/useTeamTrainingEvidence';

const fmtShort = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
    : '';

const HORIZON_KEY = 'elecmate:competence-matrix:horizon';
const REQUIREMENTS_KEY = 'elecmate:competence-matrix:requirements';
const HORIZON_OPTIONS = [30, 60, 90] as const;

interface StoredRequirements {
  presetId: string | null;
  keys: string[];
}

const loadHorizon = (): number => {
  try {
    const v = Number(localStorage.getItem(HORIZON_KEY));
    return HORIZON_OPTIONS.includes(v as (typeof HORIZON_OPTIONS)[number]) ? v : 60;
  } catch {
    return 60;
  }
};

const loadRequirements = (): StoredRequirements | null => {
  try {
    const raw = localStorage.getItem(REQUIREMENTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRequirements;
    if (!Array.isArray(parsed?.keys) || parsed.keys.length === 0) return null;
    return {
      presetId: parsed.presetId ?? null,
      keys: parsed.keys.filter((k) => typeof k === 'string'),
    };
  } catch {
    return null;
  }
};

/** DB shape of the employer's single 'Default' requirement set. The table is
 *  live but not yet in the generated Supabase types, hence the casts. */
interface RequirementSetRow {
  id: string;
  preset_id: string | null;
  credential_keys: string[];
  horizon_days: number;
}

const serialiseReqState = (req: StoredRequirements | null, horizon: number): string =>
  JSON.stringify({ presetId: req?.presetId ?? null, keys: req?.keys ?? [], horizon });

interface CompetenceMatrixProps {
  profiles: ElecIdProfile[];
  /** The whole roster (ELE-2086): people without an Elec-ID still get a row. */
  roster?: { employeeId: string; name: string; role: string }[];
  /** Opens "Create Elec-ID" for someone on the roster who has none. */
  onCreateElecId?: (person: { id: string; name: string }) => void;
}

export function CompetenceMatrix({ profiles, roster, onCreateElecId }: CompetenceMatrixProps) {
  const navigate = useNavigate();
  const { data: jobs = [] } = useJobs();
  const createCommunication = useCreateCommunication();
  const [exporting, setExporting] = useState<'pdf' | 'csv' | 'share' | null>(null);
  const [nudgingId, setNudgingId] = useState<string | null>(null);

  // ── Crew scope ──
  const [scopeJobId, setScopeJobId] = useState<string>('all');
  const selectedJob = useMemo(
    () => (scopeJobId === 'all' ? null : (jobs.find((j) => j.id === scopeJobId) ?? null)),
    [jobs, scopeJobId]
  );
  const { data: assignments = [] } = useJobAssignments(scopeJobId === 'all' ? '' : scopeJobId);
  const crewEmployeeIds = useMemo(
    () => new Set(assignments.filter((a) => a.status !== 'declined').map((a) => a.employee_id)),
    [assignments]
  );
  const scopedProfiles = useMemo(
    () => (selectedJob ? profiles.filter((p) => crewEmployeeIds.has(p.employee_id)) : profiles),
    [profiles, selectedJob, crewEmployeeIds]
  );
  const scopedRoster = useMemo(
    () =>
      roster && selectedJob ? roster.filter((r) => crewEmployeeIds.has(r.employeeId)) : roster,
    [roster, selectedJob, crewEmployeeIds]
  );
  const scope: MatrixScope | null = selectedJob
    ? {
        jobTitle: selectedJob.title,
        client: selectedJob.client,
        startDate: selectedJob.start_date,
      }
    : null;

  // ── Expiry horizon (30/60/90-day amber threshold) ──
  // localStorage seeds the first paint; the DB row is the source of truth
  // once hydrated (localStorage stays as an offline fallback cache only).
  const [horizonDays, setHorizonDays] = useState<number>(loadHorizon);
  useEffect(() => {
    try {
      localStorage.setItem(HORIZON_KEY, String(horizonDays));
    } catch {
      /* private browsing */
    }
  }, [horizonDays]);

  // ELE-1834: briefings signed and attested training hours, beside the grid.
  const { data: training } = useTeamTrainingEvidence();

  // One store per person (ELE-1950): every record is on the profile already.
  const matrix = useMemo(
    () =>
      buildCompetenceMatrix(scopedProfiles, [], { horizonDays, training, roster: scopedRoster }),
    [scopedProfiles, horizonDays, training, scopedRoster]
  );
  const showTraining = matrix.workers.some((w) => w.training);

  // ── Site requirements ──
  const [requirements, setRequirements] = useState<StoredRequirements | null>(loadRequirements);
  const [reqSheetOpen, setReqSheetOpen] = useState(false);
  const [draftReq, setDraftReq] = useState<StoredRequirements | null>(null);
  useEffect(() => {
    try {
      if (requirements) localStorage.setItem(REQUIREMENTS_KEY, JSON.stringify(requirements));
      else localStorage.removeItem(REQUIREMENTS_KEY);
    } catch {
      /* private browsing */
    }
  }, [requirements]);

  // ── Persistence: competence_requirement_sets (single 'Default' row) ──
  const reqSetIdRef = useRef<string | null>(null);
  const hydratedRef = useRef(false);
  const lastSavedRef = useRef<string>('');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from the employer's row; if none exists yet, seed it once from
  // the localStorage values so an existing setup survives the migration.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || cancelled) return;
        // limit(1) + newest-first rather than maybeSingle(): there is no DB
        // unique constraint on (employer_id, name), so a historic race could
        // leave two 'Default' rows — maybeSingle() would then error forever
        // and kill persistence. Reading the newest keeps working regardless.
        const { data, error } = await supabase
          .from('competence_requirement_sets' as never)
          .select('id, preset_id, credential_keys, horizon_days')
          .eq('employer_id', (await getActingEmployerId(user.id)) ?? user.id)
          .eq('name', 'Default')
          .order('updated_at', { ascending: false })
          .limit(1);
        if (error) throw error;
        if (cancelled) return;
        const row = (data as unknown as RequirementSetRow[] | null)?.[0] ?? null;
        if (row) {
          const keys = Array.isArray(row.credential_keys)
            ? row.credential_keys.filter((k) => typeof k === 'string')
            : [];
          const req: StoredRequirements | null =
            keys.length > 0 ? { presetId: row.preset_id ?? null, keys } : null;
          const horizon = HORIZON_OPTIONS.includes(
            row.horizon_days as (typeof HORIZON_OPTIONS)[number]
          )
            ? row.horizon_days
            : 60;
          reqSetIdRef.current = row.id;
          lastSavedRef.current = serialiseReqState(req, horizon);
          setRequirements(req);
          setHorizonDays(horizon);
        } else {
          // One-time seed: write the local values up so they become the row
          const localReq = loadRequirements();
          const localHorizon = loadHorizon();
          if (localReq || localHorizon !== 60) {
            const { data: inserted, error: insertError } = await supabase
              .from('competence_requirement_sets' as never)
              .insert({
                employer_id: (await getActingEmployerId(user.id)) ?? user.id,
                name: 'Default',
                preset_id: localReq?.presetId ?? null,
                credential_keys: localReq?.keys ?? [],
                horizon_days: localHorizon,
              } as never)
              .select('id')
              .single();
            if (!insertError && inserted && !cancelled) {
              reqSetIdRef.current = (inserted as unknown as { id: string }).id;
              lastSavedRef.current = serialiseReqState(localReq, localHorizon);
            }
          } else {
            lastSavedRef.current = serialiseReqState(null, 60);
          }
        }
      } catch {
        /* offline / RLS hiccup — localStorage fallback keeps everything working */
      } finally {
        if (!cancelled) hydratedRef.current = true;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced write-through on change (requirements applied, horizon toggled).
  // Errors surface as a toast; local state (and the localStorage cache) keep
  // the matrix working regardless.
  useEffect(() => {
    if (!hydratedRef.current) return;
    const snapshot = serialiseReqState(requirements, horizonDays);
    if (snapshot === lastSavedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const payload = {
          preset_id: requirements?.presetId ?? null,
          credential_keys: requirements?.keys ?? [],
          horizon_days: horizonDays,
        };
        if (!reqSetIdRef.current) {
          // Re-check before inserting — hydration may have failed transiently
          // while a row already exists (no unique constraint backs us up, so a
          // blind insert here would create a duplicate 'Default' row).
          const { data: existing } = await supabase
            .from('competence_requirement_sets' as never)
            .select('id')
            .eq('employer_id', (await getActingEmployerId(user.id)) ?? user.id)
            .eq('name', 'Default')
            .order('updated_at', { ascending: false })
            .limit(1);
          const existingId = (existing as unknown as { id: string }[] | null)?.[0]?.id;
          if (existingId) reqSetIdRef.current = existingId;
        }
        if (reqSetIdRef.current) {
          const { error } = await supabase
            .from('competence_requirement_sets' as never)
            .update({ ...payload, updated_at: new Date().toISOString() } as never)
            .eq('id', reqSetIdRef.current);
          if (error) throw error;
        } else {
          const { data: inserted, error } = await supabase
            .from('competence_requirement_sets' as never)
            .insert({
              employer_id: (await getActingEmployerId(user.id)) ?? user.id,
              name: 'Default',
              ...payload,
            } as never)
            .select('id')
            .single();
          if (error) throw error;
          reqSetIdRef.current = (inserted as unknown as { id: string }).id;
        }
        lastSavedRef.current = snapshot;
      } catch {
        toast({
          title: 'Could not save your settings',
          description: 'Requirements and horizon are kept on this device and will sync next time.',
          variant: 'destructive',
        });
      }
    }, 600);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [requirements, horizonDays]);

  const readiness = useMemo(
    () =>
      requirements && requirements.keys.length > 0 && matrix.workers.length > 0
        ? assessSiteReadiness(matrix, requirements.keys, selectedJob?.start_date ?? null)
        : null,
    [matrix, requirements, selectedJob?.start_date]
  );
  const readinessByWorker = useMemo(
    () => new Map((readiness?.workers ?? []).map((w) => [w.employeeId, w])),
    [readiness]
  );

  // ── Assigned learning (ELE-1834) ──
  // The course that fixes this person's most pressing gap: an expired or
  // expiring ticket first, then a site requirement they're missing.
  const [assignFor, setAssignFor] = useState<{
    person: AssignCoursePerson;
    courseKey: string | null;
    reason: string | null;
  } | null>(null);
  const openAssign = (employeeId: string) => {
    const w = matrix.workers.find((x) => x.employeeId === employeeId);
    if (!w) return;
    const linked = profiles.find((p) => p.employee_id === employeeId)?.linked_account;
    let courseKey: string | null = null;
    let reason: string | null = null;
    for (const col of matrix.columns) {
      const cell = w.cells[col.key];
      const course = courseForCredential(col.key);
      if (!course || !cell || (cell.status !== 'expired' && cell.status !== 'expiring')) continue;
      courseKey = course.key;
      reason = `Your ${col.label} ${cell.status === 'expired' ? 'has expired' : `expires ${fmtShort(cell.expiry)}`}`;
      break;
    }
    if (!courseKey) {
      const gap = readinessByWorker
        .get(employeeId)
        ?.gaps.find((g) => g.reason === 'missing' && courseForCredential(g.key));
      if (gap) {
        courseKey = courseForCredential(gap.key)!.key;
        reason = `${gap.label} is needed for site work`;
      }
    }
    setAssignFor({ person: { id: employeeId, name: w.name, linked }, courseKey, reason });
  };

  // Mobile: per-worker certificate-number disclosure
  const [openNumbers, setOpenNumbers] = useState<Set<string>>(new Set());
  const toggleNumbers = (id: string) =>
    setOpenNumbers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const dueCount = useMemo(
    () => matrix.workers.reduce((s, w) => s + w.expiringCount + w.expiredCount, 0),
    [matrix]
  );

  const exportFilename = (ext: 'pdf' | 'csv') => {
    const jobSlug = selectedJob
      ? `-${selectedJob.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 40)}`
      : '';
    return `competence-matrix${jobSlug}-${new Date().toISOString().slice(0, 10)}.${ext}`;
  };

  const handleExportPdf = async () => {
    setExporting('pdf');
    try {
      const { generateCompetenceMatrixPdf } = await import('@/utils/generateCompetenceMatrixPdf');
      const doc = await generateCompetenceMatrixPdf(matrix, { scope, readiness });
      doc.save(exportFilename('pdf'));
      toast({ title: 'Matrix exported', description: 'Branded PDF downloaded. Ready to send.' });
    } catch {
      toast({
        title: 'Export failed',
        description: 'Could not generate the PDF.',
        variant: 'destructive',
      });
    } finally {
      setExporting(null);
    }
  };

  /** Share the branded PDF straight into Mail/WhatsApp via the native share
   *  sheet — how a contractor actually gets the matrix to a principal
   *  contractor from a phone. Falls back to a plain download on desktop
   *  browsers without file-share support. */
  const handleShare = async () => {
    setExporting('share');
    try {
      const { generateCompetenceMatrixPdf } = await import('@/utils/generateCompetenceMatrixPdf');
      const doc = await generateCompetenceMatrixPdf(matrix, { scope, readiness });
      const filename = exportFilename('pdf');
      const blob = doc.output('blob');
      const file = new File([blob], filename, { type: 'application/pdf' });

      if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Workforce competence matrix',
        });
      } else {
        doc.save(filename);
        toast({
          title: 'Matrix downloaded',
          description: 'Sharing is not available in this browser. Attach the PDF to your email.',
        });
      }
    } catch (err) {
      // User dismissing the share sheet is not an error
      if (err instanceof Error && err.name === 'AbortError') return;
      toast({
        title: 'Share failed',
        description: 'Could not share the PDF.',
        variant: 'destructive',
      });
    } finally {
      setExporting(null);
    }
  };

  const handleExportCsv = () => {
    setExporting('csv');
    try {
      const csv = buildCompetenceMatrixCsv(matrix, { scope });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exportFilename('csv');
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported' });
    } finally {
      setExporting(null);
    }
  };

  /** One-tap renewal nudge — a targeted high-priority message listing exactly
   *  what this worker needs to renew, delivered via the existing comms rails.
   *  Tells the worker exactly where in the app to record the renewal so the
   *  matrix goes green without the office chasing paperwork. */
  const nudgeWorker = async (employeeId: string, name: string) => {
    const worker = matrix.workers.find((w) => w.employeeId === employeeId);
    if (!worker) return;
    const items = renewalItemsFor(worker, matrix.columns);
    if (items.length === 0) return;
    setNudgingId(employeeId);
    try {
      const lines = items.map((i) =>
        i.status === 'expired'
          ? `• ${i.label} — EXPIRED${i.expiry ? ` on ${fmtShort(i.expiry)}` : ''}`
          : `• ${i.label} — expires ${fmtShort(i.expiry)}${
              i.daysLeft !== null ? ` (${i.daysLeft} days)` : ''
            }`
      );
      await createCommunication.mutateAsync({
        type: 'message',
        title: 'Credential renewal needed',
        content: `The following need renewing so you stay site-ready:\n\n${lines.join(
          '\n'
        )}\n\nOnce renewed, add the new expiry date yourself in Elec-Mate: open Settings → Elec-ID → Qualifications and update the record (or upload the new certificate under Documents). Your record updates the company competence matrix automatically.`,
        priority: 'high',
        target_audience: 'specific',
        target_employee_ids: [employeeId],
        is_pinned: false,
        expires_at: null,
        sender_id: null,
        attachments: null,
      });
      toast({
        title: 'Renewal nudge sent',
        description: `${name} has been asked to renew ${items.length} credential${items.length === 1 ? '' : 's'}.`,
      });
    } catch {
      toast({
        title: 'Nudge failed',
        description: 'Message was not sent.',
        variant: 'destructive',
      });
    } finally {
      setNudgingId(null);
    }
  };

  if (profiles.length === 0) {
    return (
      <PlainEmpty text="No credentials to chart yet. When your team have an Elec-ID, their qualifications show here. You can also add qualifications and training for them from the Workers tab." />
    );
  }

  const openRequirementsSheet = () => {
    setDraftReq(requirements ? { ...requirements, keys: [...requirements.keys] } : null);
    setReqSheetOpen(true);
  };

  const applyRequirements = () => {
    setRequirements(draftReq && draftReq.keys.length > 0 ? draftReq : null);
    setReqSheetOpen(false);
  };

  const toggleDraftKey = (key: string) => {
    setDraftReq((prev) => {
      const keys = prev?.keys ?? [];
      const next = keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key];
      return next.length > 0 ? { presetId: null, keys: next } : null;
    });
  };

  const workerCount = matrix.workers.length;
  const summaryParts: string[] = [`${workerCount} ${workerCount === 1 ? 'person' : 'people'}`];
  if (dueCount > 0) summaryParts.push(`${dueCount} renewal${dueCount === 1 ? '' : 's'} due`);
  if (readiness) summaryParts.push(`${readiness.readyCount} of ${readiness.total} site-ready`);

  const controls = (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <Select value={scopeJobId} onValueChange={setScopeJobId}>
          <SelectTrigger
            aria-label="Scope"
            className="h-11 w-full rounded-xl border-white/[0.12] bg-white/[0.04] text-[14px] text-white touch-manipulation focus:ring-0 data-[state=open]:border-elec-yellow lg:w-72"
          >
            <SelectValue placeholder="All workers" />
          </SelectTrigger>
          <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
            <SelectItem value="all">All workers</SelectItem>
            {jobs.map((j) => (
              <SelectItem key={j.id} value={j.id}>
                {j.title}
                {j.client ? `, ${j.client}` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2" aria-label="Expiry warning window">
          <Segments
            quiet
            className="flex-1 lg:flex-none"
            items={HORIZON_OPTIONS.map((d) => ({ value: String(d), label: `${d} days` }))}
            value={String(horizonDays)}
            onChange={(v) => setHorizonDays(Number(v))}
          />
        </div>

        <div className="flex gap-2 lg:ml-auto">
          <button
            type="button"
            onClick={openRequirementsSheet}
            className={cn(rowBtnSecondary, 'flex-1 lg:flex-none')}
          >
            <ClipboardCheck className="h-4 w-4" />
            Site requirements
            {requirements ? ` (${requirements.keys.length})` : ''}
          </button>
        </div>
      </div>
      <p className="text-[13px] leading-snug text-white">
        Yellow means it runs out within {horizonDays} days
        {readiness?.referenceIsJobStart
          ? ` of the job start (${fmtShort(readiness.referenceDate)})`
          : ''}
        . Self, Doc seen and Source say how each one was checked: self-declared, certificate seen,
        or verified with the awarding body or card scheme.
      </p>
    </div>
  );

  const exportBar = (
    <div data-help="elecid.matrix-export" className="flex gap-2">
      <button
        type="button"
        onClick={handleExportPdf}
        disabled={exporting !== null}
        className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
      >
        {exporting === 'pdf' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        PDF
      </button>
      <button
        type="button"
        onClick={handleShare}
        disabled={exporting !== null}
        className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
      >
        {exporting === 'share' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        Share
      </button>
      <button
        type="button"
        onClick={handleExportCsv}
        disabled={exporting !== null}
        className={cn(rowBtnSecondary, 'flex-1 sm:flex-none')}
      >
        <FileSpreadsheet className="h-4 w-4" />
        CSV
      </button>
    </div>
  );

  const requirementsSheet = (
    <FormSheet
      open={reqSheetOpen}
      onOpenChange={setReqSheetOpen}
      width="wide"
      title="Site requirements"
      description="Pick what the site demands. Every worker is judged ready or not against it. A requirement nobody holds shows as missing."
      footer={
        <div className="flex gap-2">
          {requirements && (
            <button
              type="button"
              onClick={() => {
                setRequirements(null);
                setReqSheetOpen(false);
              }}
              className="h-12 flex-1 rounded-xl border border-red-500/40 text-[14px] font-semibold text-red-400 touch-manipulation lg:flex-none lg:px-5"
            >
              Clear
            </button>
          )}
          <PrimaryButton
            className="h-12 flex-[2] rounded-xl text-[15px] lg:flex-none lg:px-8"
            onClick={applyRequirements}
            disabled={!draftReq?.keys.length}
          >
            Apply requirements
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <section>
          <PanelTitle title="Start from a preset" />
          <div className={cn(panel, 'overflow-hidden')}>
            <div className={rowsClass}>
              {REQUIREMENT_PRESETS.map((preset) => {
                const active = draftReq?.presetId === preset.id;
                return (
                  <Row
                    key={preset.id}
                    onClick={() => setDraftReq({ presetId: preset.id, keys: [...preset.keys] })}
                    chevron={false}
                    title={preset.label}
                    detail={preset.keys.map((k) => requirementLabel(k, matrix.columns)).join(' · ')}
                    trailing={active ? <StatusPill tone="volt">Chosen</StatusPill> : undefined}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <PanelTitle title="Or pick your own" meta="From your recorded credentials" />
          {matrix.columns.length === 0 ? (
            <PlainEmpty text="Nothing recorded on the team yet." />
          ) : (
            <div className={cn(panel, 'overflow-hidden')}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {matrix.columns.map((col) => {
                  const checked = draftReq?.keys.includes(col.key) ?? false;
                  return (
                    <label
                      key={col.key}
                      className="flex min-h-[52px] cursor-pointer items-center gap-3 border-b border-white/[0.07] px-4 touch-manipulation sm:px-5"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleDraftKey(col.key)}
                        className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                      />
                      <span className="text-[14px] text-white">{col.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </FormSheet>
  );

  // Honest empty state: a crew job with nobody assigned yet
  if (selectedJob && matrix.workers.length === 0) {
    return (
      <div className="space-y-6">
        {controls}
        <PlainEmpty
          text={`Nobody is assigned to ${selectedJob.title} yet. Assign people to the job and their credentials show here, ready to send as a crew competence pack.`}
          action="Go to Jobs"
          onAction={() => navigate('/employer?section=jobs')}
        />
        {requirementsSheet}
      </div>
    );
  }

  const gapWorkers = readiness ? readiness.workers.filter((w) => !w.ready) : [];

  const cellBox = (cell: MatrixCell) =>
    cn(
      'inline-flex w-full flex-col items-center justify-center rounded-lg border px-1.5 py-1.5 text-[12px] font-semibold tabular-nums leading-tight',
      cell.status === 'valid' && 'border-emerald-500/40 text-emerald-400',
      cell.status === 'expiring' && 'border-elec-yellow/60 text-elec-yellow',
      cell.status === 'expired' && 'border-red-500/50 text-red-400'
    );

  return (
    <div className="space-y-6 sm:space-y-8">
      {controls}

      {gapWorkers.length > 0 && (
        <section>
          <PanelTitle title="Not site-ready" meta={`${gapWorkers.length}`} />
          <RowList>
            {gapWorkers.map((w) => (
              <Row
                key={w.employeeId}
                title={w.name}
                detail={w.gaps.map(gapSentence).join('; ')}
                trailing={<StatusPill tone="red">Not ready</StatusPill>}
              />
            ))}
          </RowList>
        </section>
      )}

      <CourseAssignmentsList hideWhenEmpty />

      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-baseline gap-2">
            <h2 className="text-[16px] font-semibold tracking-tight text-white">
              {selectedJob ? `Crew for ${selectedJob.title}` : 'Competence matrix'}
            </h2>
            <span className="truncate text-[13px] text-white">{summaryParts.join(' · ')}</span>
          </div>
          {exportBar}
        </div>

        {/* Desktop: the full grid with a sticky worker column */}
        <div className={cn(panel, 'hidden overflow-hidden bg-none bg-[hsl(0_0%_12%)] lg:block')}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="sticky left-0 z-10 min-w-[200px] bg-[hsl(0_0%_12%)] px-5 py-3 text-[12px] font-semibold text-white">
                    Worker
                  </th>
                  {matrix.columns.map((col) => (
                    <th
                      key={col.key}
                      className="min-w-[104px] px-2 py-3 text-center text-[12px] font-semibold text-white"
                    >
                      {col.label}
                    </th>
                  ))}
                  {showTraining && (
                    <th
                      className="min-w-[150px] border-l border-white/[0.07] px-3 py-3 text-left text-[12px] font-semibold text-white"
                      title="Briefings signed and apprentice training hours. Evidence of training, never a ticket."
                    >
                      Training
                    </th>
                  )}
                  <th className="min-w-[90px] px-3 py-3" aria-label="Actions" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07]">
                {matrix.workers.map((w) => {
                  const needsNudge = w.expiringCount + w.expiredCount > 0;
                  const ready = readinessByWorker.get(w.employeeId);
                  return (
                    <tr key={w.employeeId}>
                      <td className="sticky left-0 z-10 bg-[hsl(0_0%_12%)] px-5 py-3">
                        <div className="text-[15px] font-semibold leading-tight text-white">
                          {w.name}
                        </div>
                        <div className="mt-0.5 text-[13px] text-white">
                          {w.role}
                          {w.noElecId ? ' · No Elec-ID yet' : ''}
                          {w.uncheckedCount > 0 ? ` · ${w.uncheckedCount} self-declared` : ''}
                        </div>
                        {ready && (
                          <div className="mt-1.5">
                            <StatusPill tone={ready.ready ? 'green' : 'red'}>
                              {ready.ready ? 'Site-ready' : 'Not ready'}
                            </StatusPill>
                          </div>
                        )}
                      </td>
                      {matrix.columns.map((col) => {
                        const cell = w.cells[col.key];
                        if (!cell || cell.status === 'none') {
                          return (
                            <td key={col.key} className="px-2 py-3 text-center">
                              {cell?.course ? (
                                <span
                                  title={`${cell.course.label}: Study Centre course passed${cell.course.date ? ` ${fmtShort(cell.course.date)}` : ''}. Not the qualification itself.`}
                                  className="inline-flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/25 px-1.5 py-1.5 text-[11.5px] font-medium leading-tight text-white"
                                >
                                  Course done
                                  {cell.course.date && (
                                    <span className="text-[11px] tabular-nums">
                                      {fmtShort(cell.course.date)}
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="text-[13px] text-white">–</span>
                              )}
                            </td>
                          );
                        }
                        const tooltip = [
                          cell.label,
                          cell.certNumber ? `No. ${cell.certNumber}` : null,
                          verificationLabel(cell.verification),
                        ]
                          .filter(Boolean)
                          .join(', ');
                        return (
                          <td key={col.key} className="px-1.5 py-2.5 text-center">
                            <span title={tooltip || undefined} className={cellBox(cell)}>
                              {cell.expiry ? fmtShort(cell.expiry) : 'Held'}
                              {cell.status === 'expired' && (
                                <span className="text-[11px] font-medium">Expired</span>
                              )}
                              {cell.status === 'expiring' && cell.daysLeft !== null && (
                                <span className="text-[11px] font-medium">
                                  {cell.daysLeft} days left
                                </span>
                              )}
                              <span className="mt-0.5 text-[11px] font-medium text-white">
                                {verificationShortLabel(cell.verification)}
                              </span>
                              {cell.course && (
                                <span className="mt-0.5 text-[11px] font-medium text-white">
                                  Course {cell.course.date ? fmtShort(cell.course.date) : 'done'}
                                </span>
                              )}
                            </span>
                          </td>
                        );
                      })}
                      {showTraining && (
                        <td className="border-l border-white/[0.07] px-3 py-3 text-left align-middle">
                          {w.training ? (
                            <div className="space-y-0.5 text-[12.5px] leading-snug text-white">
                              {w.training.briefingsSigned > 0 && (
                                <div>
                                  {w.training.briefingsSigned}{' '}
                                  {w.training.briefingsSigned === 1 ? 'briefing' : 'briefings'}{' '}
                                  signed
                                </div>
                              )}
                              {w.training.otjAttestedMinutes > 0 && (
                                <div>{hoursLabel(w.training.otjAttestedMinutes)} attested</div>
                              )}
                              {w.training.otjCollegeVerifiedMinutes > 0 && (
                                <div>
                                  {hoursLabel(w.training.otjCollegeVerifiedMinutes)} college
                                  verified
                                </div>
                              )}
                              {w.training.otjWaiting > 0 && (
                                <div className="font-semibold text-elec-yellow">
                                  {w.training.otjWaiting} waiting for you
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-[13px] text-white">–</span>
                          )}
                        </td>
                      )}
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {w.noElecId && onCreateElecId && (
                            <button
                              type="button"
                              onClick={() => onCreateElecId({ id: w.employeeId, name: w.name })}
                              className={rowBtnSecondary}
                            >
                              Create Elec-ID
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openAssign(w.employeeId)}
                            className={rowBtnSecondary}
                          >
                            Assign course
                          </button>
                          {needsNudge && (
                            <button
                              type="button"
                              onClick={() => nudgeWorker(w.employeeId, w.name)}
                              disabled={nudgingId === w.employeeId}
                              className={rowBtnSecondary}
                            >
                              {nudgingId === w.employeeId ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                              Nudge
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phone and tablet: one panel per worker, renewals first, the rest folded away */}
        <div className="space-y-4 lg:hidden">
          {matrix.workers.map((w) => {
            const due = renewalItemsFor(w, matrix.columns);
            const held = matrix.columns.filter(
              (c) => w.cells[c.key] && w.cells[c.key].status === 'valid'
            );
            const coursesDone = matrix.columns.filter(
              (c) => w.cells[c.key]?.course && w.cells[c.key].status === 'none'
            );
            const ready = readinessByWorker.get(w.employeeId);
            const open = openNumbers.has(w.employeeId);
            const foldCount = held.length + coursesDone.length;
            const headPill =
              ready && !ready.ready ? (
                <StatusPill tone="red">Not ready</StatusPill>
              ) : w.expiredCount > 0 ? (
                <StatusPill tone="red">{w.expiredCount} expired</StatusPill>
              ) : w.expiringCount > 0 ? (
                <StatusPill tone="volt">{w.expiringCount} expiring</StatusPill>
              ) : ready?.ready ? (
                <StatusPill tone="green">Site-ready</StatusPill>
              ) : held.length > 0 ? (
                <StatusPill tone="green">All in date</StatusPill>
              ) : undefined;
            return (
              <div key={w.employeeId} className={cn(panel, 'overflow-hidden')}>
                <div className={rowsClass}>
                  <Row
                    title={w.name}
                    detail={`${w.role}${w.uncheckedCount > 0 ? ` · ${w.uncheckedCount} self-declared` : ''}`}
                    trailing={w.noElecId && !headPill ? <StatusPill>No Elec-ID yet</StatusPill> : headPill}
                  />
                  {ready && !ready.ready && (
                    <div className="px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
                      <span className="font-semibold text-red-400">Missing for this site: </span>
                      {ready.gaps.map(gapSentence).join('; ')}
                    </div>
                  )}
                  {due.map((item, i) => (
                    <Row
                      key={i}
                      title={item.label}
                      detail={
                        item.status === 'expired'
                          ? `Expired ${fmtShort(item.expiry)}`
                          : `Runs out ${fmtShort(item.expiry)}`
                      }
                      trailing={
                        <StatusPill tone={item.status === 'expired' ? 'red' : 'volt'}>
                          {item.status === 'expired' ? 'Expired' : 'Expiring'}
                        </StatusPill>
                      }
                    />
                  ))}
                  {due.length === 0 && foldCount === 0 && (
                    <div className="px-4 py-3 text-[13px] text-white sm:px-5">
                      {w.noElecId
                        ? 'No Elec-ID yet. Create one so their cards and tickets show here.'
                        : 'No credentials recorded yet.'}
                    </div>
                  )}
                  {w.training && trainingEvidenceLine(w.training) && (
                    <Row
                      title="Training"
                      wrapDetail
                      detail={`${trainingEvidenceLine(w.training)}. Evidence of training, not a ticket.`}
                      trailing={
                        w.training.otjWaiting > 0 ? (
                          <StatusPill tone="volt">To attest</StatusPill>
                        ) : undefined
                      }
                    />
                  )}
                  {foldCount > 0 && (
                    <button
                      type="button"
                      onClick={() => toggleNumbers(w.employeeId)}
                      aria-expanded={open}
                      className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 text-left text-[14px] font-semibold text-white touch-manipulation sm:px-5"
                    >
                      In date and courses ({foldCount})
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
                      />
                    </button>
                  )}
                  {open &&
                    held.map((c) => {
                      const cell = w.cells[c.key];
                      return (
                        <Row
                          key={c.key}
                          title={c.label}
                          detail={[
                            cell.expiry ? `Runs out ${fmtShort(cell.expiry)}` : 'No expiry',
                            verificationShortLabel(cell.verification),
                            cell.certNumber ? `No. ${cell.certNumber}` : null,
                            cell.course
                              ? `Course ${cell.course.date ? fmtShort(cell.course.date) : 'done'}`
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                          trailing={<StatusPill tone="green">In date</StatusPill>}
                        />
                      );
                    })}
                  {open &&
                    coursesDone.map((c) => (
                      <Row
                        key={c.key}
                        title={c.label}
                        detail={`Study Centre course passed${w.cells[c.key].course?.date ? ` ${fmtShort(w.cells[c.key].course!.date)}` : ''}. Not the qualification itself.`}
                        trailing={<StatusPill>Course done</StatusPill>}
                      />
                    ))}
                  <div className="flex gap-2 px-4 py-3 sm:px-5">
                    {w.noElecId && onCreateElecId && (
                      <button
                        type="button"
                        onClick={() => onCreateElecId({ id: w.employeeId, name: w.name })}
                        className={cn(rowBtnSecondary, 'flex-1')}
                      >
                        Create Elec-ID
                      </button>
                    )}
                    {due.length > 0 && (
                      <button
                        type="button"
                        onClick={() => nudgeWorker(w.employeeId, w.name)}
                        disabled={nudgingId === w.employeeId}
                        className={cn(rowBtnSecondary, 'flex-1')}
                      >
                        {nudgingId === w.employeeId ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Nudge to renew
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => openAssign(w.employeeId)}
                      className={cn(rowBtnSecondary, 'flex-1')}
                    >
                      Assign a course
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {requirementsSheet}
      <AssignCourseSheet
        open={!!assignFor}
        onOpenChange={(o) => !o && setAssignFor(null)}
        person={assignFor?.person ?? null}
        initialCourseKey={assignFor?.courseKey}
        initialReason={assignFor?.reason}
      />
    </div>
  );
}
