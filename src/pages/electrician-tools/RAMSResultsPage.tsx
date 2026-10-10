/**
 * RAMS results — its own route, `/electrician/site-safety/ai-rams/:jobId`.
 *
 * Results used to live inside AIRAMSGenerator behind a `showResults` boolean.
 * That meant a refresh, a shared link or the browser Back button all threw the
 * finished document away, because the only handle on it was React state. The
 * job id is the natural identity for a generated RAMS, so it belongs in the URL.
 *
 * The page loads the job by id, so it is refresh-safe and linkable.
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { RAMSDocumentTabs } from '@/components/electrician-tools/site-safety/ai-rams/RAMSDocumentTabs';
import { useRAMSJobPolling } from '@/hooks/useRAMSJobPolling';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { exportRAMS } from '@/utils/rams-export';
import { attachIssuedRamsToPack } from '@/utils/attachIssuedRamsToPack';
import { safeReturnTo } from '@/utils/safety-launch';
import { buildBriefingFromRams, RAMS_BRIEFING_SEED_KEY } from '@/utils/rams-briefing';
import { useRamsBriefings } from '@/hooks/useRamsBriefings';
import {
  isFirmScope,
  safetyHomePath,
  useFirmRecordAccess,
  useSafetyScope,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';

type Review = { name: string; confirmedAt: string | null };
const reviewOf = (rams?: RAMSData): Review | undefined =>
  (rams as (RAMSData & { review?: Review }) | undefined)?.review;
/** A content edit invalidates the "I have checked this" tick — keep the name. */
const clearReview = (rams?: RAMSData): RAMSData | undefined => {
  const r = reviewOf(rams);
  return rams && r?.confirmedAt
    ? ({ ...rams, review: { ...r, confirmedAt: null } } as RAMSData)
    : rams;
};
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';

const SITE_SAFETY = '/electrician/site-safety';

/**
 * The method agent writes two shapes: a flat `steps[]` and a much richer
 * `method_steps[]` carrying phase, objective, hold points, acceptance criteria,
 * quality checks, named instruments, BS 7671 citations and the hazards each
 * step controls. Flatten the rich fields onto the step the UI renders, keyed by
 * id — without this the cards show a title and a paragraph and discard the rest.
 */
function mergeV2Steps(
  method?: Partial<MethodStatementData>
): Partial<MethodStatementData> | undefined {
  if (!method) return method;
  const v2 = (method as { method_steps?: Array<Record<string, unknown>> }).method_steps;
  if (!Array.isArray(v2) || !method.steps?.length) return method;

  const byId = new Map(v2.filter((s) => s?.id).map((s) => [String(s.id), s]));
  return {
    ...method,
    steps: method.steps.map((step, i) => {
      const rich = byId.get(String(step.id ?? `step-${i + 1}`));
      return rich ? ({ ...rich, ...step } as MethodStep) : step;
    }),
  };
}

interface RAMSResultsPageProps {
  /**
   * The generation job, when the page is mounted inside a hub rather than on
   * its own route (the Employer Hub's Site Safety section).
   */
  jobId?: string;
}

const RAMSResultsPage: React.FC<RAMSResultsPageProps> = ({ jobId: jobIdProp }) => {
  const params = useParams<{ jobId: string }>();
  const jobId = jobIdProp ?? params.jobId;
  const navigate = useNavigate();
  const location = useLocation();
  // Employer Hub (firm scope): the firm's RAMS. Back returns to the hub, and
  // a manager edits only what the firm made — a worker's RAMS is read-only.
  const scope = useSafetyScope();
  const firm = isFirmScope(scope);
  const home = firm ? safetyHomePath(scope) : SITE_SAFETY;
  // Where Back goes. A RAMS started from a job returns to that job; everything
  // else returns to Site Safety. Carried as route state by the generator.
  const requestedReturn =
    (location.state as { returnTo?: string } | null)?.returnTo ||
    new URLSearchParams(location.search).get('returnTo');
  // In-app paths only — this value can arrive in a URL.
  const returnTo = safeReturnTo(requestedReturn) ?? home;

  const { job, status, ramsData, methodData, startPolling } = useRAMSJobPolling(jobId ?? null);
  // Firm records are edited by the firm's owner or co-admins; a worker's RAMS
  // shared through a firm job is the worker's to change (RLS agrees).
  const access = useFirmRecordAccess(job as { user_id?: string | null } | null);
  const readOnly = firm && !access.canEdit;

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [filedVersion, setFiledVersion] = useState<number | null>(null);
  const [filedAtLocal, setFiledAtLocal] = useState<string | null>(null);
  const { data: briefingInfo, refetch: refetchBriefings } = useRamsBriefings(jobId);
  // The version on file: from this session's export if there was one, else the database.
  const currentFiledVersion = filedVersion ?? briefingInfo?.filedVersion ?? null;
  /**
   * Counts edits the user has made. The seed from the job is not an edit, so
   * opening a RAMS never writes; every patch/add/remove bumps this, and the
   * autosave below writes the working copy shortly after the last one.
   * Edits used to be written ONLY when a PDF was exported — change a control
   * measure, tap Back, and the change was gone.
   */
  const [editCount, setEditCount] = useState(0);
  const savedEditCount = useRef(0);
  const dirty = editCount !== savedEditCount.current;

  /**
   * Local working copy. Seeded from the job and then owned here, so edits are
   * immediate. Only adopts an incoming half while the local one is still empty —
   * a late-arriving prop must never overwrite something the user has typed.
   */
  const [doc, setDoc] = useState<{
    rams?: RAMSData;
    method?: Partial<MethodStatementData>;
  }>({});

  // Issued = the review on this copy is the one the filed version was made
  // from. Any edit clears the review; a fresh review after filing is not
  // issued until the PDF is filed again.
  const reviewedAt = reviewOf(doc.rams)?.confirmedAt;
  const filedAt = filedAtLocal ?? briefingInfo?.filedAt;
  const isIssued =
    !!currentFiledVersion &&
    !!reviewedAt &&
    !!filedAt &&
    new Date(reviewedAt).getTime() <= new Date(filedAt).getTime() + 60_000;

  useEffect(() => {
    setDoc((prev) => ({
      rams: prev.rams?.risks?.length ? prev.rams : (ramsData as RAMSData | undefined),
      method: prev.method?.steps?.length
        ? prev.method
        : mergeV2Steps(methodData as Partial<MethodStatementData> | undefined),
    }));
  }, [ramsData, methodData]);

  const patchRisk = useCallback((riskId: string, updates: Record<string, unknown>) => {
    setEditCount((n) => n + 1);
    setDoc((p) => ({ ...p, rams: clearReview(p.rams) }));
    setDoc((p) => ({
      ...p,
      rams: p.rams
        ? {
            ...p.rams,
            risks: (p.rams.risks ?? []).map((r) =>
              r.id === riskId ? ({ ...r, ...updates } as RAMSRisk) : r
            ),
          }
        : p.rams,
    }));
  }, []);

  const removeRisk = useCallback((riskId: string) => {
    setEditCount((n) => n + 1);
    setDoc((p) => ({ ...p, rams: clearReview(p.rams) }));
    setDoc((p) => ({
      ...p,
      rams: p.rams
        ? { ...p.rams, risks: (p.rams.risks ?? []).filter((r) => r.id !== riskId) }
        : p.rams,
    }));
  }, []);

  const addRisk = useCallback(() => {
    setEditCount((n) => n + 1);
    setDoc((p) => ({ ...p, rams: clearReview(p.rams) }));
    setDoc((p) => {
      if (!p.rams) return p;
      const blank = {
        id: `risk-${Date.now()}`,
        hazard: '',
        risk: '',
        controls: '',
        likelihood: 3,
        severity: 3,
        riskRating: 9,
      } as RAMSRisk;
      return { ...p, rams: { ...p.rams, risks: [...(p.rams.risks ?? []), blank] } };
    });
  }, []);

  const patchStep = useCallback((stepId: string, updates: Record<string, unknown>) => {
    setEditCount((n) => n + 1);
    setDoc((p) => ({ ...p, rams: clearReview(p.rams) }));
    setDoc((p) => ({
      ...p,
      method: p.method
        ? {
            ...p.method,
            steps: (p.method.steps ?? []).map((s) =>
              s.id === stepId ? ({ ...s, ...updates } as MethodStep) : s
            ),
          }
        : p.method,
    }));
  }, []);

  const removeStep = useCallback((stepId: string) => {
    setEditCount((n) => n + 1);
    setDoc((p) => ({ ...p, rams: clearReview(p.rams) }));
    setDoc((p) => ({
      ...p,
      method: p.method
        ? { ...p.method, steps: (p.method.steps ?? []).filter((s) => s.id !== stepId) }
        : p.method,
    }));
  }, []);

  const addStep = useCallback(() => {
    setEditCount((n) => n + 1);
    setDoc((p) => ({ ...p, rams: clearReview(p.rams) }));
    setDoc((p) => {
      if (!p.method) return p;
      const n = (p.method.steps ?? []).length + 1;
      const blank = {
        id: `step-${Date.now()}`,
        stepNumber: n,
        title: '',
        description: '',
        estimatedDuration: '15 minutes',
        riskLevel: 'low',
      } as unknown as MethodStep;
      return { ...p, method: { ...p.method, steps: [...(p.method.steps ?? []), blank] } };
    });
  }, []);

  // One fetch on mount. The hook stops polling by itself once the job is in a
  // terminal state, so a finished job costs exactly one request.
  useEffect(() => {
    if (!jobId) return;
    startPolling();
    const t = window.setTimeout(() => setLoadAttempted(true), 1500);
    return () => window.clearTimeout(t);
  }, [jobId, startPolling]);

  /** Returns whether the working copy is now in the database. */
  const handleSave = useCallback(
    async (opts?: { silent?: boolean }): Promise<boolean> => {
      if (!jobId || !doc.rams) return false;
      // Nothing of ours to write: exports still go ahead from the copy shown.
      if (readOnly) return true;
      const editsAtStart = editCount;
      setIsSaving(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not signed in');

        const update = supabase
          .from('rams_generation_jobs')
          // Cast at the boundary only: these are plain JSON documents, but the
          // generated Supabase types model the columns as `Json`, which our
          // domain interfaces don't structurally satisfy.
          .update({
            rams_data: doc.rams as unknown as never,
            method_data: doc.method as unknown as never,
          })
          .eq('id', jobId);
        if (firm) {
          // The firm's RAMS: RLS decides who may write. A blocked update is not
          // an error to PostgREST, so count the rows to say so honestly.
          const { data: rows, error } = await update.select('id');
          if (error) throw error;
          if (!rows?.length) throw new Error('Only the person who made this RAMS can change it.');
        } else {
          const { error } = await update.eq('user_id', user.id);
          if (error) throw error;
        }

        savedEditCount.current = editsAtStart;
        setSaveFailed(false);
        setLastSaved(new Date());
        if (!opts?.silent) toast({ title: 'Saved', description: 'Your changes have been saved.' });
        return true;
      } catch (err) {
        setSaveFailed(true);
        toast({
          title: 'Changes not saved',
          description:
            (err instanceof Error ? err.message : 'Try again in a moment.') +
            ' Your edits are still on this screen.',
          variant: 'destructive',
        });
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [jobId, doc, editCount, firm, readOnly]
  );

  // Autosave ~1.5s after the last edit.
  useEffect(() => {
    if (!dirty || isSaving) return;
    const t = window.setTimeout(() => {
      void handleSave({ silent: true });
    }, 1500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCount, dirty, isSaving]);

  // Browser close / refresh with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  /**
   * Back: write any pending edits first. If that fails (no signal), stay and
   * say so; a second tap leaves anyway rather than trapping the user.
   */
  const backBlocked = useRef(false);
  const handleBack = useCallback(async () => {
    if (dirty && !backBlocked.current) {
      const ok = await handleSave({ silent: true });
      if (!ok) {
        backBlocked.current = true;
        toast({
          title: 'Not saved yet',
          description: 'Tap Back again to leave without your latest changes.',
          variant: 'destructive',
        });
        return;
      }
    }
    navigate(returnTo);
  }, [dirty, handleSave, navigate, returnTo]);

  /** Saves first so the PDF can never be generated from stale data. */
  const runExport = useCallback(
    async (kind: 'combined' | 'rams' | 'method') => {
      if (!doc.rams) return;
      setIsExporting(true);
      try {
        // Never build a PDF from something that is not saved — the filed copy
        // and the database must describe the same document.
        const saved = await handleSave({ silent: true });
        if (!saved) return;
        // Renders the PDFMonkey template, files it under Site Safety, and
        // delivers the file (native filesystem + share sheet, or a download on
        // web). Calling the jsPDF generators directly returned bytes nobody
        // consumed, which is exactly how this screen shipped doing nothing.
        const { filed, fileReason, version } = await exportRAMS(
          kind,
          doc.rams,
          doc.method as MethodStatementData | undefined,
          {
            generationJobId: jobId,
            // Employer Hub: file into the firm's register; a worker's RAMS is
            // downloaded, never filed by the manager.
            ...(isFirmScope(scope) ? { firmEmployerId: scope.employerId } : {}),
            ...(readOnly ? { file: false } : {}),
          }
        );
        if (filed) {
          setFiledVersion(version ?? 1);
          setFiledAtLocal(new Date().toISOString());
          void refetchBriefings();
        }
        // Employer Hub: the issued RAMS goes into the job's pack for crew
        // sign-off by itself (ELE-1941). The Electrical Hub is unchanged.
        let packNote = '';
        if (filed && kind === 'combined' && jobId && isFirmScope(scope) && !readOnly) {
          const res = await attachIssuedRamsToPack(jobId, scope.employerId);
          packNote =
            res === 'attached'
              ? ' Added to the job pack for the crew to sign.'
              : res === 'failed'
                ? ' It could not be added to the job pack; attach it from RAMS.'
                : '';
        }
        toast({
          title: filed ? (version ? `Filed as version ${version}` : 'PDF filed') : 'Downloaded',
          description: filed
            ? (version
                ? 'This replaces the earlier copy in Site Safety. Earlier versions are kept.'
                : 'Saved to your Site Safety documents. Brief the team on it before work starts.') +
              packNote
            : fileReason || 'The document downloaded but was not filed.',
        });
      } catch (err) {
        toast({
          title: 'Export failed',
          description: err instanceof Error ? err.message : 'Could not build the PDF.',
          variant: 'destructive',
        });
      } finally {
        setIsExporting(false);
      }
    },
    [doc, handleSave, jobId, refetchBriefings, scope, readOnly]
  );

  const handleRetryAgent = useCallback(
    async (agent: 'hs' | 'method') => {
      if (!jobId) return;
      const { data, error } = await supabase.functions.invoke('rams-generator', {
        body: { action: 'retry-agent', jobId, agent },
      });
      if (error || !data?.jobId) {
        toast({
          title: 'Retry failed',
          description: error?.message || data?.error || 'Could not retry.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Retrying',
        description:
          agent === 'hs'
            ? 'Regenerating the risk assessment.'
            : 'Regenerating the method statement.',
      });
      startPolling();
    },
    [jobId, startPolling]
  );

  /** Site/emergency details typed on the Issue tab. A content edit — clears the review. */
  const patchDetails = useCallback((patch: Partial<RAMSData>) => {
    setEditCount((n) => n + 1);
    setDoc((p) => (p.rams ? { ...p, rams: clearReview({ ...p.rams, ...patch }) } : p));
  }, []);

  const setReview = useCallback((review: Review) => {
    setEditCount((n) => n + 1);
    setDoc((p) => (p.rams ? { ...p, rams: { ...p.rams, review } as RAMSData } : p));
  }, []);

  /** Next step: a one-page briefing from this RAMS, opened in the briefing wizard. */
  const handleBriefTeam = useCallback(async () => {
    if (!doc.rams) return;
    if (dirty && !(await handleSave({ silent: true }))) return;
    try {
      sessionStorage.setItem(
        RAMS_BRIEFING_SEED_KEY,
        JSON.stringify(
          buildBriefingFromRams(doc.rams, doc.method, {
            generationJobId: jobId,
            version: currentFiledVersion ?? undefined,
          })
        )
      );
    } catch {
      /* storage blocked — the wizard simply opens empty */
    }
    navigate(
      isFirmScope(scope)
        ? '/employer?section=site-safety&tool=team-briefing&from=rams'
        : '/electrician/site-safety?tool=team-briefing&from=rams'
    );
  }, [doc, dirty, handleSave, jobId, currentFiledVersion, navigate, scope]);

  const projectName =
    (ramsData as { projectName?: string } | undefined)?.projectName ||
    (methodData as { jobTitle?: string } | undefined)?.jobTitle ||
    'RAMS';

  const isRunning = status === 'pending' || status === 'processing';
  const hasAnything = !!ramsData || !!methodData;

  // Still loading, or a retry is mid-flight with nothing to show yet.
  if (!hasAnything && (!loadAttempted || isRunning)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        {/* The hook reports 'pending' until its first fetch resolves, so a
            finished job would otherwise read "Still generating…" on load.
            Only claim that once we've actually seen the row. */}
        <p className="text-[13px] text-white">
          {job && isRunning ? 'Still generating…' : 'Loading your RAMS…'}
        </p>
      </div>
    );
  }

  // Employer Hub: only the firm's RAMS open here. A person's own RAMS (which
  // RLS lets them read) belongs to their Electrical Hub, not the firm.
  const notFirms =
    isFirmScope(scope) &&
    !!job &&
    (job as { employer_id?: string | null }).employer_id !== scope.employerId;

  if (!hasAnything || notFirms) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-[20px] font-semibold text-white">
          {notFirms ? 'Not filed with the firm' : 'RAMS not found'}
        </h1>
        {notFirms && (
          <p className="max-w-sm text-[13px] leading-relaxed text-white">
            This RAMS is in your own Site Safety in the Electrical Hub.
          </p>
        )}
        {!notFirms && (
          <p className="max-w-sm text-[13px] leading-relaxed text-white">
            This job either doesn&rsquo;t exist or belongs to another account.
          </p>
        )}
        <button
          type="button"
          onClick={() => navigate(returnTo)}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
        >
          {returnTo === home ? 'Back to Site Safety' : 'Back to job'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-elec-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6 md:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => void handleBack()}
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-white transition-colors hover:text-elec-yellow touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            {returnTo === home ? 'Back' : 'Back to job'}
          </button>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            RAMS
          </span>
          <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
            {projectName}
          </span>
          {/* Save state, not a verdict. This used to read "Complete" in green
              over an AI draft nobody had reviewed. */}
          <span
            role="status"
            aria-live="polite"
            className={cn(
              'shrink-0 text-[11px] font-semibold',
              saveFailed ? 'text-red-400' : status === 'partial' ? 'text-amber-400' : 'text-white'
            )}
          >
            {saveFailed ? (
              <button
                type="button"
                onClick={() => void handleSave()}
                className="min-h-11 underline underline-offset-2 touch-manipulation"
              >
                Not saved · retry
              </button>
            ) : isSaving ? (
              'Saving…'
            ) : dirty ? (
              'Unsaved'
            ) : isIssued ? (
              `Issued v${currentFiledVersion}`
            ) : currentFiledVersion ? (
              `Changed since v${currentFiledVersion}`
            ) : reviewedAt ? (
              'Reviewed · not issued'
            ) : lastSaved ? (
              'Draft saved'
            ) : status === 'partial' ? (
              'Generated with gaps'
            ) : (
              'Draft'
            )}
          </span>
        </div>
      </header>

      {/* Body — enters as a continuation of the generating screen, not a jump cut. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-16"
      >
        <RAMSDocumentTabs
          ramsData={doc.rams}
          methodData={doc.method}
          editable={!readOnly}
          isExporting={isExporting}
          onUpdateRisk={patchRisk}
          onRemoveRisk={removeRisk}
          onAddRisk={addRisk}
          onUpdateStep={patchStep}
          onRemoveStep={removeStep}
          onAddStep={addStep}
          onExportCombined={() => runExport('combined')}
          onExportRams={() => runExport('rams')}
          onExportMethod={() => runExport('method')}
          review={reviewOf(doc.rams) ?? { name: '', confirmedAt: null }}
          onReviewChange={setReview}
          onUpdateDetails={patchDetails}
          // A worker's RAMS (read-only here) is briefed by the worker.
          onBriefTeam={readOnly ? undefined : handleBriefTeam}
          filedVersion={currentFiledVersion}
          briefings={briefingInfo?.briefings}
        />
      </motion.div>
    </div>
  );
};

export default RAMSResultsPage;
