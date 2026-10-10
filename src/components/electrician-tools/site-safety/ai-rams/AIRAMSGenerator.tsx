import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Sparkles,
  Clock,
  AlertCircle,
  Cloud,
  CloudOff,
  Check,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { AIRAMSInput } from './AIRAMSInput';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { safeReturnTo, type SafetyToolLaunch } from '@/utils/safety-launch';
import { isFirmScope, ramsResultPath, safetyHomePath, useSafetyScope } from '../common/SafetyScope';
import { copyRamsForNewJob } from '@/utils/rams-copy';
import { AgentProcessingView } from './AgentProcessingView';
import { RAMSReviewEditor } from './RAMSReviewEditor';
import { CompletionCelebration } from './CompletionCelebration';
import { triggerHaptic } from '@/utils/animation-helpers';
import { supabase } from '@/integrations/supabase/client';
import { useRAMSJobPolling } from '@/hooks/useRAMSJobPolling';
import { useRAMSNotifications } from '@/hooks/useRAMSNotifications';
import { toast } from '@/hooks/use-toast';
import {
  storageGetSync,
  storageSetSync,
  storageRemoveSync,
  storageGetJSONSync,
} from '@/utils/storage';

// Median completion is ~85s measured across real jobs (ELE-1386). This was 180,
// which produced "~2:24 to go" on a run that finishes in well under two minutes
// — an estimate that is wrong in the direction that makes the product feel slow.
const EXPECTED_TOTAL_SECONDS = 95;
const RAMS_LOCAL_DRAFT_KEY = 'rams-local-draft';
// Mirrors INPUT_DRAFT_KEY in AIRAMSInput — the autosaved input-form draft.
// Written/read there via raw localStorage, so clear it the same way (not
// storageRemoveSync, which targets Preferences/cache on native).
const RAMS_INPUT_DRAFT_KEY = 'rams-input-draft-v1';
const SAVE_RETRY_DELAYS = [5000, 15000, 30000]; // Exponential backoff: 5s, 15s, 30s

interface AIRAMSGeneratorProps {
  onBack?: () => void;
  /**
   * Employer Hub only (firm scope): the firm job and job pack this RAMS is
   * started from, and the details to fill in. Ignored in personal scope.
   */
  firmLaunch?: SafetyToolLaunch;
}

/**
 * File a generation job with the firm. The trigger on rams_generation_jobs
 * checks the caller belongs to the firm (or is on the job's crew) and derives
 * employer_id from the job, so this cannot tag a RAMS to someone else's firm.
 */
async function fileWithFirm(
  generationJobId: string,
  employerId: string,
  launch?: SafetyToolLaunch
): Promise<boolean> {
  const { error } = await supabase
    .from('rams_generation_jobs')
    .update({
      employer_id: employerId,
      ...(launch?.employerJobId ? { employer_job_id: launch.employerJobId } : {}),
    } as never)
    .eq('id', generationJobId);
  if (error) return false;
  if (launch?.jobPackId) {
    // The pack's ticks, as the Employer Hub generators set them: one
    // generation writes both the RAMS and its method statement.
    await supabase
      .from('employer_job_packs')
      .update({ rams_generated: true, method_statement_generated: true })
      .eq('id', launch.jobPackId);
  }
  return true;
}

/** A firm run already made for this job from the same brief (ELE-1941). */
interface EarlierFirmRun {
  id: string;
  status: string;
  createdAt: string;
}

const sameText = (a: unknown, b: unknown) =>
  String(a ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase() ===
  String(b ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

/**
 * Employer Hub only. A generation costs the same every time, so a second run
 * for the same job, brief, site and project name is offered back instead of
 * being paid for again. Read-only: the person can still choose to run it again.
 */
async function findEarlierFirmRun(
  employerId: string,
  employerJobId: string,
  jobDescription: string,
  projectInfo: { projectName: string; location: string }
): Promise<EarlierFirmRun | null> {
  const since = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from('rams_generation_jobs')
    .select('id, status, created_at, job_description, project_info')
    .eq('employer_id' as never, employerId as never)
    .eq('employer_job_id' as never, employerJobId as never)
    .in('status', ['complete', 'partial', 'pending', 'processing'])
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(10);
  if (error || !data) return null;
  type Row = {
    id: string;
    status: string;
    created_at: string;
    job_description: string | null;
    project_info: { projectName?: string; location?: string } | null;
  };
  const hit = (data as unknown as Row[]).find(
    (r) =>
      sameText(r.job_description, jobDescription) &&
      sameText(r.project_info?.projectName, projectInfo.projectName) &&
      sameText(r.project_info?.location, projectInfo.location)
  );
  return hit ? { id: hit.id, status: hit.status, createdAt: hit.created_at } : null;
}

/**
 * Where this RAMS was started from. A RAMS opened from a job carries the job
 * id (so the generated RAMS is filed against it) and the path back to it.
 * AIRAMSInput clears route state once it has applied the seed, so this is
 * captured on first render and kept in sessionStorage to survive a refresh
 * during generation.
 */
const LAUNCH_KEY = 'rams-launch-context';
type LaunchContext = { projectId?: string; returnTo?: string; fromStorage?: boolean };
function readLaunchContext(state: unknown, search: string): LaunchContext {
  const st = (state as LaunchContext | null) ?? null;
  const q = new URLSearchParams(search);
  const fromUrl: LaunchContext = {
    projectId: q.get('projectId') || undefined,
    returnTo: safeReturnTo(q.get('returnTo')) || undefined,
  };
  const s = fromUrl.projectId || fromUrl.returnTo ? fromUrl : st;
  if (s?.projectId || s?.returnTo) {
    const ctx = { projectId: s.projectId, returnTo: safeReturnTo(s.returnTo) || undefined };
    try {
      sessionStorage.setItem(LAUNCH_KEY, JSON.stringify(ctx));
    } catch {
      /* private mode — context just won't survive a refresh */
    }
    return ctx;
  }
  try {
    // Only reuse a stored context while a generation it started is still
    // running (a refresh mid-generation). Otherwise a RAMS started later from
    // the hub would be silently filed against the earlier job.
    if (sessionStorage.getItem('rams-generation-active') === 'true') {
      const stored = JSON.parse(sessionStorage.getItem(LAUNCH_KEY) || '{}') as LaunchContext;
      return { ...stored, fromStorage: true };
    }
    sessionStorage.removeItem(LAUNCH_KEY);
  } catch {
    /* ignore */
  }
  return {};
}

export const AIRAMSGenerator: React.FC<AIRAMSGeneratorProps> = ({ onBack, firmLaunch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Firm scope (Employer Hub): the RAMS is filed with the firm and opens in the
  // hub. Personal scope behaves exactly as before.
  const scope = useSafetyScope();
  const firm = isFirmScope(scope);
  const [launch, setLaunch] = useState<LaunchContext>(() =>
    readLaunchContext(location.state, location.search)
  );

  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);
  const [generationEndTime, setGenerationEndTime] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [resumedJob, setResumedJob] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [currentJobDescription, setCurrentJobDescription] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [showDraftRecovery, setShowDraftRecovery] = useState(false);
  const [recoveredDraft, setRecoveredDraft] = useState<{
    ramsData: any;
    methodData: any;
    jobId: string;
    timestamp: number;
    projectName: string;
  } | null>(null);

  // Employer Hub: an earlier run for the same job and brief, offered back
  // before paying for the same generation again (ELE-1941).
  const [earlierRun, setEarlierRun] = useState<{
    run: EarlierFirmRun;
    retry: () => void;
  } | null>(null);

  const lastErrorNotifiedJobRef = useRef<string | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    job,
    startPolling,
    stopPolling,
    progress,
    hsAgentProgress,
    installerAgentProgress,
    hsAgentStatus,
    installerAgentStatus,
    status,
    currentStep,
    ramsData,
    methodData,
    error,
  } = useRAMSJobPolling(currentJobId);

  const { requestPermission, showCompletionNotification, showErrorNotification } =
    useRAMSNotifications();

  /** Forget a job context that only came from storage (not this visit's URL). */
  const dropStoredLaunch = () => {
    try {
      sessionStorage.removeItem(LAUNCH_KEY);
    } catch {
      /* ignore */
    }
    setLaunch((l) => (l.fromStorage ? {} : l));
  };

  // Check for in-progress jobs on mount (only if user initiated in this session)
  useEffect(() => {
    const checkForInProgressJobs = async () => {
      // Only check if user has initiated a generation in this session
      const hasActiveSession = sessionStorage.getItem('rams-generation-active') === 'true';
      if (!hasActiveSession) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: jobs } = await supabase
        .from('rams_generation_jobs')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'processing'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (jobs && jobs.length > 0) {
        const job = jobs[0];
        setCurrentJobId(job.id);
        setShowResults(true);
        setResumedJob(true);
        startPolling();

        toast({
          title: 'Resuming generation',
          description: `Your RAMS document is ${job.progress}% complete`,
          variant: 'default',
        });
      } else {
        // Check for recently completed job
        const { data: completedJobs } = await supabase
          .from('rams_generation_jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(1);

        if (completedJobs && completedJobs.length > 0) {
          const completedJob = completedJobs[0];
          const completedAt = new Date(completedJob.completed_at);
          const now = new Date();
          const minutesAgo = (now.getTime() - completedAt.getTime()) / 1000 / 60;

          // If completed in last 10 minutes, show it
          if (minutesAgo < 10) {
            setCurrentJobId(completedJob.id);
            setShowResults(true);
            startPolling();

            toast({
              title: 'Your RAMS is ready!',
              description: `Completed ${Math.floor(minutesAgo)} minute${Math.floor(minutesAgo) !== 1 ? 's' : ''} ago`,
              variant: 'success',
            });
          } else {
            // No active or recent job found, clear stale session flag — and
            // the job context stored with it, or the next RAMS started here
            // would be filed against that earlier job.
            sessionStorage.removeItem('rams-generation-active');
            dropStoredLaunch();
          }
        } else {
          // No jobs found at all, clear stale session flag
          sessionStorage.removeItem('rams-generation-active');
          dropStoredLaunch();
        }
      }
    };

    checkForInProgressJobs();
  }, []);

  // Request notification permission on first generation
  useEffect(() => {
    if (showResults && !resumedJob) {
      requestPermission();
    }
  }, [showResults, resumedJob]);

  // Show notification when job completes
  useEffect(() => {
    if (status === 'complete' && ramsData && !celebrationShown) {
      showCompletionNotification({
        jobId: currentJobId || '',
        projectName: ramsData.projectName,
        onNotificationClick: () => {
          window.focus();
          document.getElementById('rams-results')?.scrollIntoView({ behavior: 'smooth' });
        },
      });
    }
  }, [status, ramsData, celebrationShown, currentJobId]);

  // ELE-1116: clear the autosaved input-form draft only once a generation has
  // genuinely SUCCEEDED. A failed generation keeps the draft so "Try Again"
  // (which routes through handleStartOver) can restore the form. Guarded by
  // currentJobId so a stale 'complete' status after Start Over can't wipe a
  // freshly-typed draft.
  useEffect(() => {
    if (status === 'complete' && currentJobId) {
      try {
        localStorage.removeItem(RAMS_INPUT_DRAFT_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [status, currentJobId]);

  /**
   * Hand off to the results route once the job reaches a terminal state with
   * something to show.
   *
   * Results used to render inline behind `showResults`, which meant a refresh
   * or the Back button discarded the finished document — React state was the
   * only handle on it. The job id is the natural identity, so it goes in the
   * URL and the results page loads from it.
   *
   * `replace` so Back returns to Site Safety rather than to a generating screen
   * for a job that has already finished.
   */
  useEffect(() => {
    if (!currentJobId) return;
    if (status !== 'complete' && status !== 'partial') return;
    if (!ramsData && !methodData) return;
    try {
      sessionStorage.removeItem(LAUNCH_KEY);
    } catch {
      /* ignore */
    }
    // returnTo rides in the URL so a refresh on the results page keeps it.
    const qs = launch.returnTo && !firm ? `?returnTo=${encodeURIComponent(launch.returnTo)}` : '';
    navigate(`${ramsResultPath(scope, currentJobId)}${qs}`, { replace: true });
  }, [status, currentJobId, ramsData, methodData, navigate, launch.returnTo, firm, scope]);

  // Show error notification (prevent duplicate toasts for old jobs)
  useEffect(() => {
    if (
      status === 'failed' &&
      error &&
      currentJobId &&
      lastErrorNotifiedJobRef.current !== currentJobId
    ) {
      lastErrorNotifiedJobRef.current = currentJobId;
      showErrorNotification({
        jobId: currentJobId,
        errorMessage: error,
      });
    }
  }, [status, error, currentJobId]);

  // PHASE 4 & 5: Trigger celebration or toast for partial completions
  useEffect(() => {
    // PHASE 3 FIX: Celebration trigger (check object presence, not array length)
    const hasFullData = ramsData && methodData && status === 'complete';

    const hasPartialData =
      (ramsData || methodData) && (status === 'partial' || status === 'complete') && !hasFullData;

    // Show celebration for full data
    if (hasFullData && showResults && !celebrationShown) {
      sessionStorage.removeItem('rams-generation-active');

      setGenerationEndTime(Date.now());
      setShowResults(true); // Ensure results stay visible
      setShowCelebration(true);
      setCelebrationShown(true);
      triggerHaptic([100, 50, 100, 50, 200]);

      // Auto-close celebration after 3 seconds
      setTimeout(() => setShowCelebration(false), 3000);
    } else if (status === 'complete' && !celebrationShown) {
      // Fallback: show toast if celebration doesn't trigger
      setTimeout(() => {
        if (!showCelebration) {
          toast({
            title: 'RAMS Complete! 🎉',
            description: 'Your document is ready for review',
            variant: 'default',
          });
          setCelebrationShown(true);
        }
      }, 2000);
    }

    // For partial completion, show a toast that names whichever half is
    // missing so the user knows what to retry.
    if (hasPartialData && showResults && !celebrationShown) {
      sessionStorage.removeItem('rams-generation-active');
      setGenerationEndTime(Date.now());
      setCelebrationShown(true);
      setShowResults(true);

      const missingHs = !ramsData;
      const missingMethod = !methodData;
      const description = missingHs
        ? 'Method statement is ready. The risk assessment didn\u2019t generate \u2014 retry the hazard register to fill it in.'
        : missingMethod
          ? 'Risk assessment is ready. The method statement didn\u2019t generate \u2014 retry it to complete the document.'
          : 'Document generated with gaps.';

      toast({
        title: 'RAMS generated with gaps',
        description,
        variant: 'default',
      });
    }
  }, [ramsData, methodData, status, currentStep, showResults, celebrationShown]);

  // === Improvement 1: Write to localStorage on every data change ===
  useEffect(() => {
    if (!ramsData || !currentJobId) return;
    try {
      const draft = {
        ramsData,
        methodData,
        jobId: currentJobId,
        timestamp: Date.now(),
        projectName: ramsData.projectName || 'Untitled',
      };
      storageSetSync(RAMS_LOCAL_DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Failed to save RAMS draft to localStorage:', e);
    }
  }, [ramsData, methodData, currentJobId]);

  // === Improvement 2: Draft recovery on mount ===
  useEffect(() => {
    try {
      const draft = storageGetJSONSync<any>(RAMS_LOCAL_DRAFT_KEY, null);
      if (!draft) return;
      const ageHours = (Date.now() - draft.timestamp) / (1000 * 60 * 60);
      // Offer recovery if draft is <24h old and we're not already viewing results
      if (ageHours < 24 && !showResults && !currentJobId && draft.ramsData) {
        setRecoveredDraft(draft);
        setShowDraftRecovery(true);
      } else if (ageHours >= 24) {
        storageRemoveSync(RAMS_LOCAL_DRAFT_KEY);
      }
    } catch (e) {
      console.warn('Failed to read RAMS draft from localStorage:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === Improvement 5a: beforeunload writes to localStorage (sync, reliable) ===
  useEffect(() => {
    if (!ramsData || !currentJobId) return;
    const handleBeforeUnload = () => {
      storageSetSync(
        RAMS_LOCAL_DRAFT_KEY,
        JSON.stringify({
          ramsData,
          methodData,
          jobId: currentJobId,
          timestamp: Date.now(),
          projectName: ramsData.projectName || 'Untitled',
        })
      );
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [ramsData, methodData, currentJobId]);

  // === Improvement 3: Auto-save to cloud every 30s when generation is complete ===
  useEffect(() => {
    if (!ramsData || !currentJobId || status !== 'complete') {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
      return;
    }
    // Initial save after 10s, then every 30s
    const initialTimeout = setTimeout(() => {
      saveToDatabaseSilent();
      autoSaveTimerRef.current = setInterval(() => {
        saveToDatabaseSilent();
      }, 30000);
    }, 10000);
    return () => {
      clearTimeout(initialTimeout);
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ramsData, methodData, currentJobId, status]);

  // Restore a recovered draft
  const handleRestoreDraft = () => {
    if (!recoveredDraft) return;
    setCurrentJobId(recoveredDraft.jobId);
    setShowResults(true);
    setShowDraftRecovery(false);
    startPolling();
    toast({
      title: 'Draft restored',
      description: `Recovered "${recoveredDraft.projectName}" from local backup`,
      variant: 'success',
    });
  };

  const handleDismissDraft = () => {
    setShowDraftRecovery(false);
    setRecoveredDraft(null);
    storageRemoveSync(RAMS_LOCAL_DRAFT_KEY);
  };

  const handleGenerate = async (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
    },
    jobScale: 'domestic' | 'commercial' | 'industrial',
    attachments?: Array<{ path: string; name: string; type: string; size: number }>,
    opts?: { force?: boolean }
  ) => {
    // Employer Hub: the same job, brief and site were generated already. Offer
    // that run back rather than paying for it twice. Personal scope: unchanged.
    if (
      isFirmScope(scope) &&
      firmLaunch?.employerJobId &&
      !opts?.force &&
      !(attachments && attachments.length)
    ) {
      const run = await findEarlierFirmRun(
        scope.employerId,
        firmLaunch.employerJobId,
        jobDescription,
        projectInfo
      );
      if (run) {
        setEarlierRun({
          run,
          retry: () =>
            void handleGenerate(jobDescription, projectInfo, jobScale, attachments, {
              force: true,
            }),
        });
        return;
      }
    }

    // Mark session as having active generation
    sessionStorage.setItem('rams-generation-active', 'true');

    // Reset error notification tracker for new generation
    lastErrorNotifiedJobRef.current = null;

    setCurrentJobDescription(jobDescription);
    setGenerationStartTime(Date.now());
    setShowResults(true);
    setShowCelebration(false);
    setCelebrationShown(false);

    // Strip previewUrl (blob URL) before sending — backend only needs path/name/type/size.
    const cleanAttachments = (attachments ?? []).map(({ path, name, type, size }) => ({
      path,
      name,
      type,
      size,
    }));

    const { data, error } = await supabase.functions.invoke('rams-generator', {
      body: {
        action: 'create',
        jobDescription,
        projectInfo,
        jobScale,
        attachments: cleanAttachments,
      },
    });

    if (error || !data?.jobId) {
      console.error('Failed to create job:', error);
      sessionStorage.removeItem('rams-generation-active');
      setShowResults(false);
      setGenerationStartTime(0);
      toast({
        title: 'Could not start generation',
        description:
          error?.message ||
          data?.error ||
          'Something went wrong setting up the RAMS job. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    // Started from a job: file the RAMS against it now, the same update the
    // job page's "Link RAMS" makes. Without this only 7 of 527 generated RAMS
    // ever reached a job. Best-effort — a failure is said out loud, and the
    // RAMS can still be linked from the job afterwards.
    if (launch.projectId) {
      const { error: linkError } = await supabase
        .from('rams_generation_jobs')
        .update({ project_id: launch.projectId })
        .eq('id', data.jobId);
      if (linkError) {
        toast({
          title: 'Not linked to the job',
          description: 'The RAMS is generating, but link it from the job page when it is done.',
          variant: 'destructive',
        });
      }
    }

    if (isFirmScope(scope)) {
      const filed = await fileWithFirm(data.jobId, scope.employerId, firmLaunch);
      if (!filed) {
        toast({
          title: 'Not filed with the firm',
          description: 'The RAMS is generating, but it is saved to your own documents only.',
          variant: 'destructive',
        });
      }
    }

    setCurrentJobId(data.jobId);
    startPolling();
  };

  /** Copy an earlier RAMS for this job (filed against it when started from one). */
  const handleStartFromPrevious = async (
    sourceId: string,
    target: { projectName: string; location: string }
  ) => {
    const res = await copyRamsForNewJob(sourceId, {
      projectName: target.projectName,
      location: target.location,
      projectId: launch.projectId,
    });
    if ('error' in res) {
      toast({ title: 'Could not copy that RAMS', description: res.error, variant: 'destructive' });
      return;
    }
    if (isFirmScope(scope)) await fileWithFirm(res.id, scope.employerId, firmLaunch);
    try {
      sessionStorage.removeItem(LAUNCH_KEY);
    } catch {
      /* ignore */
    }
    toast({
      title: 'Copied into a new RAMS',
      description:
        'Set the site details and emergency contacts for this site, check every hazard, then review and issue.',
    });
    const qs = launch.returnTo && !firm ? `?returnTo=${encodeURIComponent(launch.returnTo)}` : '';
    navigate(`${ramsResultPath(scope, res.id)}${qs}`);
  };

  /**
   * Retry just the failed agent on the current job — keeps the half that
   * succeeded intact and patches in the missing piece. Used by the
   * partial-completion banners so the user doesn't pay another full
   * generation when only one half failed.
   */
  const handleRetryAgent = async (agent: 'hs' | 'method') => {
    if (!currentJobId) return;
    // Reset completion state so the celebration / toast fires again when the
    // retried half lands. Without this, celebrationShown is stuck at true
    // from the partial completion and the user gets no feedback on success.
    setShowCelebration(false);
    setCelebrationShown(false);
    setGenerationStartTime(Date.now());
    setGenerationEndTime(0);
    setShowResults(true);
    sessionStorage.setItem('rams-generation-active', 'true');
    lastErrorNotifiedJobRef.current = null;

    const { data, error } = await supabase.functions.invoke('rams-generator', {
      body: { action: 'retry-agent', jobId: currentJobId, agent },
    });
    if (error || !data?.jobId) {
      toast({
        title: 'Retry failed',
        description: error?.message || data?.error || 'Could not retry',
        variant: 'destructive',
      });
      return;
    }
    startPolling();
  };

  const handleCancel = async () => {
    if (!currentJobId) return;

    setIsCancelling(true);

    try {
      const { data, error } = await supabase.functions.invoke('rams-generator', {
        body: { action: 'cancel', jobId: currentJobId },
      });

      if (error || !data?.success) {
        toast({
          title: 'Cancellation failed',
          description: error?.message || data?.error || 'Could not cancel generation',
          variant: 'destructive',
        });
        setIsCancelling(false);
        return;
      }

      // Stop polling and clear state
      stopPolling();
      sessionStorage.removeItem('rams-generation-active');

      toast({
        title: 'Generation cancelled',
        description: 'You can start a new generation with corrected input',
        variant: 'default',
      });

      // Reset to input form
      setCurrentJobId(null);
      setShowResults(false);
      setShowCelebration(false);
      setCelebrationShown(false);
      setGenerationStartTime(0);
      setGenerationEndTime(0);
      setResumedJob(false);
    } catch (err: any) {
      console.error('Cancel error:', err);

      // Extract error message from edge function response
      const errorMessage = err?.message || 'An unexpected error occurred';

      // If job is already in terminal state, treat as successful cancellation
      if (
        errorMessage.includes('already failed') ||
        errorMessage.includes('already completed') ||
        errorMessage.includes('already cancelled')
      ) {
        // Clear session and reset UI
        sessionStorage.removeItem('rams-generation-active');
        setCurrentJobId(null);
        setShowResults(false);
        setShowCelebration(false);
        setCelebrationShown(false);
        setGenerationStartTime(0);
        setGenerationEndTime(0);
        setResumedJob(false);

        toast({
          title: 'Job already ended',
          description: 'This generation has already finished. You can start a new one.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Cancellation failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const handleStartOver = () => {
    // Clear session flag and localStorage draft
    sessionStorage.removeItem('rams-generation-active');
    storageRemoveSync(RAMS_LOCAL_DRAFT_KEY);

    setCurrentJobId(null);
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setGenerationStartTime(0);
    setGenerationEndTime(0);
    setResumedJob(false);
    setCurrentJobDescription('');
    setSaveStatus('idle');
  };

  // === Improvement 4: Cloud save with retry and exponential backoff ===
  const saveToCloudWithRetry = useCallback(
    async (silent: boolean = false, maxRetries: number = 3): Promise<boolean> => {
      if (!currentJobId || !ramsData) {
        if (!silent) {
          toast({
            title: 'Cannot Save',
            description: 'No data to save',
            variant: 'destructive',
          });
        }
        return false;
      }

      setIsSaving(true);
      setSaveStatus('saving');

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const { error: updateError } = await supabase
            .from('rams_generation_jobs')
            .update({
              rams_data: ramsData,
              method_data: methodData,
            })
            .eq('id', currentJobId)
            .eq('user_id', user.id);

          if (updateError) throw updateError;

          setLastSaved(new Date());
          setSaveStatus('saved');
          setIsSaving(false);

          if (!silent) {
            toast({
              title: 'Saved Successfully',
              description: 'Your changes have been saved',
              variant: 'success',
            });
          }
          return true;
        } catch (err) {
          console.error(`Save attempt ${attempt + 1}/${maxRetries} failed:`, err);

          if (attempt < maxRetries - 1) {
            // Wait before retrying (exponential backoff)
            await new Promise((r) => setTimeout(r, SAVE_RETRY_DELAYS[attempt] || 5000));
          }
        }
      }

      // All retries exhausted
      setSaveStatus('failed');
      setIsSaving(false);

      if (!silent) {
        toast({
          title: 'Save Failed',
          description: 'Could not save after multiple attempts. Tap the save indicator to retry.',
          variant: 'destructive',
        });
      }
      return false;
    },
    [currentJobId, ramsData, methodData]
  );

  // Explicit save (user-triggered, shows toast)
  const saveToDatabase = async () => {
    await saveToCloudWithRetry(false, 3);
  };

  // Silent save (auto-save, no toast)
  const saveToDatabaseSilent = async () => {
    await saveToCloudWithRetry(true, 2);
  };

  // === Improvement 5b: Save before navigating away ===
  const handleBack = useCallback(async () => {
    // Save to localStorage immediately
    if (ramsData && currentJobId) {
      storageSetSync(
        RAMS_LOCAL_DRAFT_KEY,
        JSON.stringify({
          ramsData,
          methodData,
          jobId: currentJobId,
          timestamp: Date.now(),
          projectName: ramsData.projectName || 'Untitled',
        })
      );
      // Quick cloud save (1 retry, shorter timeout)
      if (saveStatus !== 'saved') {
        await saveToCloudWithRetry(true, 1);
      }
    }
    if (launch.returnTo) navigate(launch.returnTo);
    else if (onBack) onBack();
    else navigate(safetyHomePath(scope));
  }, [
    scope,
    ramsData,
    methodData,
    currentJobId,
    saveStatus,
    saveToCloudWithRetry,
    onBack,
    navigate,
    launch.returnTo,
  ]);

  // Calculate stats for celebration
  const hazardCount = ramsData?.risks?.length || 0;
  const controlMeasuresCount =
    ramsData?.risks?.reduce((sum, risk) => {
      return sum + (risk.controls?.split('.').filter((c) => c.trim()).length || 1);
    }, 0) || 0;
  const methodStepsCount = methodData?.steps?.length || 0;
  const generationTimeSeconds =
    generationEndTime && generationStartTime ? (generationEndTime - generationStartTime) / 1000 : 0;

  // Editorial header state machine — the right-side action and status
  // dot tone follow the orchestrator's current view state.
  const headerStatus: 'input' | 'processing' | 'complete' | 'failed' = !showResults
    ? 'input'
    : status === 'complete'
      ? 'complete'
      : status === 'failed'
        ? 'failed'
        : 'processing';

  const headerProjectName =
    ramsData?.projectName || currentJobDescription
      ? ramsData?.projectName ||
        currentJobDescription.slice(0, 60) + (currentJobDescription.length > 60 ? '…' : '')
      : null;

  return (
    <div className="min-h-screen bg-elec-dark -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
      <header className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-3 sm:gap-4">
            {/*
                ELE-1564 — this was a 16x16px tap target on a phone.
                The label is `hidden sm:inline`, so below `sm` the button
                collapsed to the bare 4x4 icon: measured at 16px against a
                44px minimum, and it is the only way back out of the
                generator. `-ml-2 px-2` buys the height back without
                indenting the icon — the tap area grows left into the
                container padding, the same trick HubMasthead uses.
            */}
            {!showResults && (
              <button
                type="button"
                onClick={() => handleBack()}
                aria-label="Back"
                className="-ml-2 inline-flex h-11 items-center gap-1.5 px-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            {showResults && (
              <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    headerStatus === 'complete'
                      ? 'bg-emerald-400'
                      : headerStatus === 'failed'
                        ? 'bg-red-400'
                        : 'bg-elec-yellow animate-pulse'
                  }`}
                />
                {headerStatus === 'complete'
                  ? 'Complete'
                  : headerStatus === 'failed'
                    ? 'Failed'
                    : 'Generating'}
              </span>
            )}
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
                AI RAMS
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {showResults && headerProjectName ? headerProjectName : 'RAMS Generator'}
              </h1>
            </div>
            {showResults && status === 'complete' && (
              <button
                type="button"
                onClick={handleStartOver}
                className="-mr-2 inline-flex h-11 items-center gap-1.5 px-2 text-[12.5px] font-medium text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation whitespace-nowrap"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>New</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-6">
        {/* Draft recovery banner. The bottom margin matches the form grid's gap
            (gap-4 sm:gap-5) so the banner sits in the same rhythm as the cards
            below rather than butting straight up against the first one. */}
        {showDraftRecovery && recoveredDraft && !showResults && (
          <section className="mt-3 mb-4 sm:mb-5 bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-elec-yellow/30 rounded-2xl p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-elec-yellow shrink-0">
                Draft
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[14.5px] font-semibold text-white">Unsaved RAMS found</div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white">
                  <span className="font-medium">{recoveredDraft.projectName}</span> was saved
                  locally {Math.floor((Date.now() - recoveredDraft.timestamp) / (1000 * 60))}{' '}
                  minutes ago. Restore to pick up where you left off.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleRestoreDraft}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.98] touch-manipulation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Restore draft
                  </button>
                  <button
                    type="button"
                    onClick={handleDismissDraft}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-white/20 transition-colors active:scale-[0.98] touch-manipulation"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {!showResults ? (
          <AIRAMSInput
            seed={
              firm && firmLaunch
                ? {
                    title: firmLaunch.siteName,
                    location: firmLaunch.siteAddress,
                    description: firmLaunch.description,
                    people: firmLaunch.people,
                  }
                : undefined
            }
            onStartFromPrevious={handleStartFromPrevious}
            onGenerate={handleGenerate}
            isProcessing={!!currentJobId && (status === 'pending' || status === 'processing')}
          />
        ) : (
          <>
            {/* Resuming banner — editorial */}
            {resumedJob && status !== 'complete' && (
              <section className="bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-elec-yellow/30 rounded-2xl p-5 mb-4 sm:mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-elec-yellow shrink-0">
                    Resuming
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14.5px] font-semibold text-white">
                      Picking up where you left off
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-white tabular-nums">
                      Current progress: {progress}%
                    </p>
                  </div>
                </div>
              </section>
            )}

            {(status === 'pending' || status === 'processing') && (
              <AgentProcessingView
                jobId={currentJobId}
                overallProgress={progress}
                currentStep={currentStep}
                elapsedTime={
                  generationStartTime > 0
                    ? Math.floor((Date.now() - generationStartTime) / 1000)
                    : 0
                }
                estimatedTimeRemaining={Math.max(
                  0,
                  Math.floor((EXPECTED_TOTAL_SECONDS * (100 - progress)) / 100)
                )}
                onCancel={
                  status === 'processing' || status === 'pending' ? handleCancel : undefined
                }
                isCancelling={isCancelling}
                jobDescription={currentJobDescription}
                hsAgentProgress={hsAgentProgress}
                installerAgentProgress={installerAgentProgress}
                hsAgentStatus={hsAgentStatus}
                installerAgentStatus={installerAgentStatus}
                agentSteps={[
                  {
                    name: 'health-safety',
                    status: hsAgentStatus as 'pending' | 'processing' | 'complete',
                    progress: hsAgentProgress,
                    currentStep:
                      hsAgentStatus === 'complete'
                        ? 'Risk assessment complete'
                        : currentStep.includes('Health & Safety')
                          ? currentStep
                          : 'Analysing hazards...',
                    reasoning:
                      hsAgentStatus === 'complete'
                        ? '✅ Risk assessment complete'
                        : currentStep.includes('Health & Safety')
                          ? currentStep
                          : 'Analysing hazards...',
                  },
                  {
                    name: 'installer',
                    status: installerAgentStatus as 'pending' | 'processing' | 'complete',
                    progress: installerAgentProgress,
                    currentStep:
                      installerAgentStatus === 'complete'
                        ? 'Method statement complete'
                        : currentStep.includes('Installer')
                          ? currentStep
                          : installerAgentStatus === 'pending'
                            ? 'Waiting...'
                            : 'Generating steps...',
                    reasoning:
                      installerAgentStatus === 'complete'
                        ? '✅ Method statement complete'
                        : currentStep.includes('Installer')
                          ? currentStep
                          : installerAgentStatus === 'pending'
                            ? 'Waiting for health & safety analysis...'
                            : 'Generating steps...',
                  },
                ]}
              />
            )}

            {(error || status === 'cancelled') && (
              <div
                className={`p-4 border rounded-lg ${
                  status === 'cancelled'
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <p
                  className={
                    status === 'cancelled'
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-red-600 dark:text-red-400'
                  }
                >
                  {status === 'cancelled' ? 'Generation was cancelled' : error}
                </p>
                <Button variant="outline" onClick={handleStartOver} className="mt-3">
                  {status === 'cancelled' ? 'Start New Generation' : 'Try Again'}
                </Button>
              </div>
            )}

            {ramsData && (
              <div id="rams-results">
                {/* Show warning if method data is missing — offer agent-only retry */}
                {!methodData && (
                  <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-orange-400">
                          Method statement didn't generate
                        </p>
                        <p className="text-xs text-orange-400/70 mt-1">
                          Your risk assessment is complete. Retry just the method statement to patch
                          this RAMS without regenerating the hazards.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleRetryAgent('method')}
                            className="border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/10 text-orange-400"
                            size="sm"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Retry method statement
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={handleStartOver}
                            className="text-orange-400/70 hover:text-orange-400"
                            size="sm"
                          >
                            Start over instead
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Show info banner if risks are empty */}
                {(!ramsData.risks || ramsData.risks.length === 0) && (
                  <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-400">
                          AI could not identify specific hazards from your input
                        </p>
                        <p className="text-xs text-blue-400/70 mt-1">
                          You can add hazards manually below or try again with more detail about the
                          work being carried out.
                        </p>
                        <Button
                          variant="outline"
                          onClick={handleStartOver}
                          className="mt-3 border-blue-500/40 hover:border-blue-500 hover:bg-blue-500/10 text-blue-400"
                          size="sm"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <RAMSReviewEditor
                  ramsData={ramsData}
                  methodData={methodData}
                  isSaving={isSaving}
                  lastSaved={lastSaved}
                  onSave={() => saveToDatabase()}
                  onUpdate={(rams, method) => {
                    // Update handled by internal state
                  }}
                  onRegenerate={handleStartOver}
                  onRetryAgent={handleRetryAgent}
                  isPartial={status === 'partial'}
                  rawHSResponse={job?.raw_hs_response}
                  rawInstallerResponse={job?.raw_installer_response}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Employer Hub: same job and brief generated already (ELE-1941) */}
      <AlertDialog open={!!earlierRun} onOpenChange={(o) => !o && setEarlierRun(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {earlierRun && ['pending', 'processing'].includes(earlierRun.run.status)
                ? 'This job is already being generated'
                : 'This job already has these documents'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              {earlierRun
                ? `The same brief for this job was generated on ${new Date(
                    earlierRun.run.createdAt
                  ).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}. Open it to review and issue, or generate a fresh copy.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              className="h-11 touch-manipulation"
              onClick={() => {
                const retry = earlierRun?.retry;
                setEarlierRun(null);
                retry?.();
              }}
            >
              Generate again
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={() => {
                const id = earlierRun?.run.id;
                setEarlierRun(null);
                if (id) navigate(ramsResultPath(scope, id));
              }}
            >
              Open it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Celebration Modal */}
      {showCelebration && ramsData && methodData && (
        <CompletionCelebration
          hazardCount={hazardCount}
          controlMeasuresCount={controlMeasuresCount}
          methodStepsCount={methodStepsCount}
          generationTimeSeconds={generationTimeSeconds}
          onClose={() => {
            setShowCelebration(false);
            setShowResults(true);
          }}
        />
      )}
    </div>
  );
};
