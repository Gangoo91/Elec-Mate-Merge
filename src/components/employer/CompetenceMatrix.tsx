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
 *  - Certificate numbers + verified-document counts for auditors.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Download,
  FileSpreadsheet,
  Send,
  Loader2,
  Share2,
  ClipboardCheck,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCertifications } from '@/hooks/useCertifications';
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
import {
  ListCard,
  ListCardHeader,
  Pill,
  EmptyState,
  SecondaryButton,
  PrimaryButton,
} from '@/components/employer/editorial';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const fmtShort = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
    : '';

const cellClasses: Record<MatrixCell['status'], string> = {
  valid: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  expiring: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  expired: 'bg-red-500/15 text-red-300 border-red-500/25',
  none: 'text-white/25',
};

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
    return { presetId: parsed.presetId ?? null, keys: parsed.keys.filter((k) => typeof k === 'string') };
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
}

export function CompetenceMatrix({ profiles }: CompetenceMatrixProps) {
  const navigate = useNavigate();
  const { data: certifications = [] } = useCertifications();
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

  const matrix = useMemo(
    () => buildCompetenceMatrix(scopedProfiles, certifications, { horizonDays }),
    [scopedProfiles, certifications, horizonDays]
  );

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
          .eq('employer_id', user.id)
          .eq('name', 'Default')
          .order('updated_at', { ascending: false })
          .limit(1);
        if (error) throw error;
        if (cancelled) return;
        const row = ((data as unknown as RequirementSetRow[] | null)?.[0] ?? null);
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
                employer_id: user.id,
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
            .eq('employer_id', user.id)
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
            .insert({ employer_id: user.id, name: 'Default', ...payload } as never)
            .select('id')
            .single();
          if (error) throw error;
          reqSetIdRef.current = (inserted as unknown as { id: string }).id;
        }
        lastSavedRef.current = snapshot;
      } catch {
        toast({
          title: 'Could not save your settings',
          description:
            'Requirements and horizon are kept on this device and will sync next time.',
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

  // ── Verified documents per worker (worker-level, never per-cell guesswork) ──
  const profileIds = useMemo(() => profiles.map((p) => p.id), [profiles]);
  const { data: verifiedDocCounts = new Map<string, number>() } = useQuery({
    queryKey: ['elec-id-verified-doc-counts', profileIds],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('elec_id_documents')
        .select('profile_id')
        .eq('verification_status', 'verified')
        .in('profile_id', profileIds);
      if (error) throw error;
      const byProfile = new Map<string, number>();
      for (const row of data ?? []) {
        byProfile.set(row.profile_id, (byProfile.get(row.profile_id) ?? 0) + 1);
      }
      // Re-key by employee id — the matrix's worker key
      const byEmployee = new Map<string, number>();
      for (const p of profiles) {
        const n = byProfile.get(p.id) ?? 0;
        if (n > 0) byEmployee.set(p.employee_id, n);
      }
      return byEmployee;
    },
    enabled: profileIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

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
      ? `-${selectedJob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40)}`
      : '';
    return `competence-matrix${jobSlug}-${new Date().toISOString().slice(0, 10)}.${ext}`;
  };

  const handleExportPdf = async () => {
    setExporting('pdf');
    try {
      const { generateCompetenceMatrixPdf } = await import('@/utils/generateCompetenceMatrixPdf');
      const doc = await generateCompetenceMatrixPdf(matrix, { scope, readiness });
      doc.save(exportFilename('pdf'));
      toast({ title: 'Matrix exported', description: 'Branded PDF downloaded — ready to send.' });
    } catch {
      toast({ title: 'Export failed', description: 'Could not generate the PDF.', variant: 'destructive' });
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
          description: 'Sharing is not available in this browser — attach the PDF to your email.',
        });
      }
    } catch (err) {
      // User dismissing the share sheet is not an error
      if (err instanceof Error && err.name === 'AbortError') return;
      toast({ title: 'Share failed', description: 'Could not share the PDF.', variant: 'destructive' });
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
      toast({ title: 'Nudge failed', description: 'Message was not sent.', variant: 'destructive' });
    } finally {
      setNudgingId(null);
    }
  };

  if (profiles.length === 0) {
    return (
      <EmptyState
        title="No credentials to chart yet"
        description="Add Elec-ID profiles and record certifications to build your competence matrix."
      />
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

  const controls = (
    <div className="space-y-3">
      {/* Scope + horizon */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Select value={scopeJobId} onValueChange={setScopeJobId}>
          <SelectTrigger
            aria-label="Scope"
            className="h-11 w-full sm:w-72 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2"
          >
            <SelectValue placeholder="All workers" />
          </SelectTrigger>
          <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
            <SelectItem value="all">All workers</SelectItem>
            {jobs.map((j) => (
              <SelectItem key={j.id} value={j.id}>
                {j.title}
                {j.client ? ` — ${j.client}` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <div
            className="inline-flex rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] p-1"
            role="group"
            aria-label="Amber expiry horizon"
          >
            {HORIZON_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setHorizonDays(d)}
                className={`h-9 min-w-[52px] px-3 rounded-full text-[12px] font-semibold touch-manipulation transition-colors ${
                  horizonDays === d ? 'bg-elec-yellow text-black' : 'text-white/60'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-[11px] text-white/45">
            Amber = expires within {horizonDays} days
          </span>
        </div>
      </div>
      <p className="sm:hidden text-[11px] text-white/45 -mt-1">
        Amber = expires within {horizonDays} days
      </p>

      {/* Site requirements */}
      <div className="flex flex-wrap items-center gap-2">
        <SecondaryButton onClick={openRequirementsSheet}>
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Site requirements
          {requirements ? ` (${requirements.keys.length})` : ''}
        </SecondaryButton>
        {readiness && (
          <>
            <Pill tone={readiness.readyCount === readiness.total ? 'emerald' : 'amber'}>
              {readiness.readyCount} of {readiness.total} site-ready
            </Pill>
            {readiness.referenceIsJobStart && (
              <span className="text-[11px] text-white/45">
                judged against job start {fmtShort(readiness.referenceDate)}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );

  const exportBar = (
    <div className="flex flex-wrap items-center gap-2">
      <SecondaryButton onClick={handleExportPdf} disabled={exporting !== null}>
        {exporting === 'pdf' ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        Export PDF
      </SecondaryButton>
      <SecondaryButton onClick={handleShare} disabled={exporting !== null}>
        {exporting === 'share' ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Share2 className="h-4 w-4 mr-2" />
        )}
        Share
      </SecondaryButton>
      <SecondaryButton onClick={handleExportCsv} disabled={exporting !== null}>
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        CSV
      </SecondaryButton>
      {dueCount > 0 && <Pill tone="amber">{dueCount} renewal{dueCount === 1 ? '' : 's'} due</Pill>}
    </div>
  );

  const requirementsSheet = (
    <Sheet open={reqSheetOpen} onOpenChange={setReqSheetOpen}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-white/10 bg-[hsl(0_0%_8%)] px-4 pb-8 pt-2"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" aria-hidden />
        <SheetHeader className="text-left">
          <SheetTitle className="text-white">Site requirements</SheetTitle>
          <p className="text-[12.5px] text-white/55">
            Pick what the site demands — every worker is judged ready or not against it. A
            requirement nobody holds shows honestly as missing.
          </p>
        </SheetHeader>

        <div className="mt-4 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {REQUIREMENT_PRESETS.map((preset) => {
              const active = draftReq?.presetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setDraftReq({ presetId: preset.id, keys: [...preset.keys] })}
                  className={`min-h-[44px] rounded-xl border px-3 py-3 text-left touch-manipulation transition-colors ${
                    active
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-white/[0.08] bg-[hsl(0_0%_12%)]'
                  }`}
                >
                  <div className={`text-[13px] font-semibold ${active ? 'text-elec-yellow' : 'text-white'}`}>
                    {preset.label}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-white/50">
                    {preset.keys.map((k) => requirementLabel(k, matrix.columns)).join(' · ')}
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 mb-2">
              Custom — from your recorded credentials
            </div>
            <div className="space-y-1">
              {matrix.columns.map((col) => {
                const checked = draftReq?.keys.includes(col.key) ?? false;
                return (
                  <label
                    key={col.key}
                    className="flex min-h-[44px] items-center gap-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-3 touch-manipulation cursor-pointer"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleDraftKey(col.key)}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <span className="text-[13px] text-white">{col.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <PrimaryButton fullWidth onClick={applyRequirements} disabled={!draftReq?.keys.length}>
              Apply requirements
            </PrimaryButton>
            {requirements && (
              <button
                onClick={() => {
                  setRequirements(null);
                  setReqSheetOpen(false);
                }}
                className="h-11 w-full rounded-full border border-red-500/25 bg-red-500/10 text-[13px] font-semibold text-red-300 touch-manipulation"
              >
                Clear requirements
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Honest empty state: a crew job with nobody assigned yet
  if (selectedJob && matrix.workers.length === 0) {
    return (
      <div className="space-y-4">
        {controls}
        <EmptyState
          title="No workers assigned to this job yet"
          description={`Assign workers to “${selectedJob.title}” and their credentials will appear here, ready to send as a crew competence pack.`}
          action="Go to Jobs"
          onAction={() => navigate('/employer?section=jobs')}
        />
        {requirementsSheet}
      </div>
    );
  }

  const gapDetails =
    readiness && readiness.workers.some((w) => !w.ready) ? (
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3 space-y-1.5">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300/80">
          Requirement gaps
        </div>
        {readiness.workers
          .filter((w) => !w.ready)
          .map((w) => (
            <p key={w.employeeId} className="text-[12.5px] leading-snug text-white/80">
              <span className="font-semibold text-white">{w.name}</span>
              {' — '}
              {w.gaps.map(gapSentence).join('; ')}
            </p>
          ))}
      </div>
    ) : null;

  return (
    <div className="space-y-4">
      {controls}
      {exportBar}
      {gapDetails}

      {/* Desktop — the full grid, sticky worker column */}
      <div className="hidden lg:block rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="sticky left-0 z-10 bg-[hsl(0_0%_10%)] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 min-w-[180px]">
                  Worker
                </th>
                {matrix.columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 py-3 text-[10px] font-medium uppercase tracking-wider text-white/60 text-center min-w-[104px]"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-3 py-3 min-w-[90px]" aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {matrix.workers.map((w) => {
                const needsNudge = w.expiringCount + w.expiredCount > 0;
                const ready = readinessByWorker.get(w.employeeId);
                const verifiedDocs = verifiedDocCounts.get(w.employeeId) ?? 0;
                return (
                  <tr key={w.employeeId} className="border-b border-white/[0.04] last:border-b-0">
                    <td className="sticky left-0 z-10 bg-[hsl(0_0%_10%)] px-4 py-2.5">
                      <div className="text-[13px] font-semibold text-white leading-tight">
                        {w.name}
                      </div>
                      <div className="text-[11px] text-white/50">{w.role}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-1">
                        {ready && (
                          <Pill tone={ready.ready ? 'emerald' : 'red'}>
                            {ready.ready ? 'Site-ready' : 'Not ready'}
                          </Pill>
                        )}
                        {verifiedDocs > 0 && (
                          <span
                            title={`${verifiedDocs} verified document${verifiedDocs === 1 ? '' : 's'} on file`}
                            className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-300"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {verifiedDocs} verified
                          </span>
                        )}
                      </div>
                    </td>
                    {matrix.columns.map((col) => {
                      const cell = w.cells[col.key];
                      if (!cell || cell.status === 'none') {
                        return (
                          <td key={col.key} className="px-2 py-2.5 text-center">
                            <span className={`text-[12px] ${cellClasses.none}`}>—</span>
                          </td>
                        );
                      }
                      const tooltip = [
                        cell.label,
                        cell.certNumber ? `No. ${cell.certNumber}` : null,
                      ]
                        .filter(Boolean)
                        .join(' — ');
                      return (
                        <td key={col.key} className="px-1.5 py-2 text-center">
                          <span
                            title={tooltip || undefined}
                            className={`inline-flex flex-col items-center justify-center w-full rounded-lg border px-1.5 py-1.5 text-[11px] font-semibold tabular-nums leading-tight ${cellClasses[cell.status]}`}
                          >
                            {cell.expiry ? fmtShort(cell.expiry) : 'Held'}
                            {cell.status === 'expired' && (
                              <span className="text-[9px] font-medium uppercase tracking-wider">
                                Expired
                              </span>
                            )}
                            {cell.status === 'expiring' && cell.daysLeft !== null && (
                              <span className="text-[9px] font-medium">{cell.daysLeft}d left</span>
                            )}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2.5 text-right">
                      {needsNudge && (
                        <button
                          onClick={() => nudgeWorker(w.employeeId, w.name)}
                          disabled={nudgingId === w.employeeId}
                          className="h-9 px-3 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-[12px] font-semibold touch-manipulation hover:bg-amber-500/25 transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                        >
                          {nudgingId === w.employeeId ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Send className="h-3.5 w-3.5" />
                          )}
                          Nudge
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile — per-worker credential card, renewals surfaced first */}
      <div className="lg:hidden space-y-3">
        {matrix.workers.map((w) => {
          const due = renewalItemsFor(w, matrix.columns);
          const held = matrix.columns.filter(
            (c) => w.cells[c.key] && w.cells[c.key].status === 'valid'
          );
          const ready = readinessByWorker.get(w.employeeId);
          const verifiedDocs = verifiedDocCounts.get(w.employeeId) ?? 0;
          const numbered = matrix.columns
            .map((c) => ({ col: c, cell: w.cells[c.key] }))
            .filter(({ cell }) => cell && cell.status !== 'none' && cell.certNumber);
          const numbersOpen = openNumbers.has(w.employeeId);
          return (
            <ListCard key={w.employeeId}>
              <ListCardHeader
                tone={w.expiredCount > 0 ? 'red' : w.expiringCount > 0 ? 'amber' : 'emerald'}
                title={w.name}
                meta={
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ready && (
                      <Pill tone={ready.ready ? 'emerald' : 'red'}>
                        {ready.ready ? 'Site-ready' : 'Not ready'}
                      </Pill>
                    )}
                    {w.expiredCount > 0 && <Pill tone="red">{w.expiredCount} expired</Pill>}
                    {w.expiringCount > 0 && <Pill tone="amber">{w.expiringCount} expiring</Pill>}
                    {w.expiredCount === 0 && w.expiringCount === 0 && (
                      <Pill tone="emerald">All valid</Pill>
                    )}
                    {verifiedDocs > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-300">
                        <ShieldCheck className="h-3 w-3" />
                        {verifiedDocs} verified doc{verifiedDocs === 1 ? '' : 's'}
                      </span>
                    )}
                  </div>
                }
              />
              <div className="px-4 py-3 space-y-3">
                {ready && !ready.ready && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-red-300/80">
                      Site requirements
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-white/80">
                      {ready.gaps.map(gapSentence).join('; ')}
                    </p>
                  </div>
                )}
                {due.length > 0 && (
                  <div className="space-y-1.5">
                    {due.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${
                          item.status === 'expired'
                            ? 'bg-red-500/10 border-red-500/20'
                            : 'bg-amber-500/10 border-amber-500/20'
                        }`}
                      >
                        <span className="text-[12.5px] text-white truncate">{item.label}</span>
                        <span
                          className={`text-[11px] font-semibold tabular-nums shrink-0 ${
                            item.status === 'expired' ? 'text-red-300' : 'text-amber-300'
                          }`}
                        >
                          {item.status === 'expired'
                            ? `Expired ${fmtShort(item.expiry)}`
                            : `${fmtShort(item.expiry)}`}
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={() => nudgeWorker(w.employeeId, w.name)}
                      disabled={nudgingId === w.employeeId}
                      className="h-11 w-full rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {nudgingId === w.employeeId ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Nudge to renew
                    </button>
                  </div>
                )}
                {held.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {held.map((c) => (
                      <span
                        key={c.key}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] text-emerald-300"
                      >
                        {c.label}
                        {w.cells[c.key].expiry && (
                          <span className="text-emerald-300/60 tabular-nums">
                            {fmtShort(w.cells[c.key].expiry)}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {numbered.length > 0 && (
                  <div>
                    <button
                      onClick={() => toggleNumbers(w.employeeId)}
                      className="flex min-h-[44px] w-full items-center justify-between touch-manipulation text-[12px] font-medium text-white/60"
                      aria-expanded={numbersOpen}
                    >
                      Certificate numbers ({numbered.length})
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${numbersOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {numbersOpen && (
                      <div className="space-y-1 pb-1">
                        {numbered.map(({ col, cell }) => (
                          <div
                            key={col.key}
                            className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-1.5"
                          >
                            <span className="text-[11.5px] text-white/70 truncate">{col.label}</span>
                            <span className="text-[11.5px] font-medium tabular-nums text-white shrink-0">
                              {cell.certNumber}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {due.length === 0 && held.length === 0 && (
                  <p className="text-[12.5px] text-white/50">No credentials recorded yet.</p>
                )}
              </div>
            </ListCard>
          );
        })}
      </div>

      {requirementsSheet}
    </div>
  );
}
