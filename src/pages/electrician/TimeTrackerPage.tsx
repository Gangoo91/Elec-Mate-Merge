import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  FileText,
  Plus,
  CheckCircle2,
  ArrowLeft,
  Pencil,
  Trash2,
  X,
  Loader2,
  FolderOpen,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import { toast } from '@/hooks/use-toast';
import {
  useTimeTracker,
  formatDuration,
  formatDurationLong,
  calculateValue,
  type TimeSession,
} from '@/hooks/useTimeTracker';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { v4 as uuidv4 } from 'uuid';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { cardCn, chipOff, chipOn, warningPanelCn } from '@/components/shared/surfaceStyles';
import TimeTrackerSummary, {
  type TimeMetrics,
} from '@/components/electrician/time-tracker/TimeTrackerSummary';
import RunningTimerCard from '@/components/electrician/time-tracker/RunningTimerCard';
import StartSessionCard from '@/components/electrician/time-tracker/StartSessionCard';
import SessionRow from '@/components/electrician/time-tracker/SessionRow';

// ─── State machine ───────────────────────────────────────────
type PageState = 'idle' | 'running' | 'summary' | 'success';

/*
 * A single session longer than this is almost certainly a timer someone forgot
 * to stop, not a shift that was actually worked. It matters because these go
 * straight into "To bill": one forgotten timer running since 20 July showed
 * 165h 46m and £9,117 — 99.99% of the entire billable total. Invoicing that by
 * accident is a serious problem with a customer, so it gets called out rather
 * than quietly summed. We flag; we never silently alter the figures.
 */
const RUNAWAY_SESSION_SECONDS = 12 * 60 * 60;

// ─── Helpers ─────────────────────────────────────────────────
const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatStartTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

const formatSessionDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const sessionDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  if (sessionDate.getTime() === today.getTime()) return 'Today';
  if (sessionDate.getTime() === yesterday.getTime()) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const formatCurrency = (amount: number) =>
  `\u00A3${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ISO ↔ datetime-local helpers — datetime-local wants `YYYY-MM-DDTHH:mm`
// in the user's LOCAL timezone (no offset suffix). When we read it back we
// have to call new Date(local) which interprets it as local — perfect.
const toLocalInput = (iso: string | null | undefined): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fromLocalInput = (local: string): string => {
  // new Date(local) interprets local datetime in the browser's local TZ
  const d = new Date(local);
  return d.toISOString();
};

// ─── Component ───────────────────────────────────────────────
const TimeTrackerPage = () => {
  const navigate = useNavigate();
  const {
    activeSession,
    sessions,
    elapsedSeconds,
    hourlyRate,
    startSession,
    stopSession,
    updateLabel,
    updateNotes,
    updateTimes,
    updateProject,
    deleteSession,
    markInvoiced,
    isLoading,
    isStarting,
  } = useTimeTracker();
  const { invoices, saveInvoice } = useInvoiceStorage();
  const { projects } = useSparkProjects('active');

  // Page state
  const [pageState, setPageState] = useState<PageState>('idle');
  const [stoppedSession, setStoppedSession] = useState<TimeSession | null>(null);

  // Inputs
  const [jobLabel, setJobLabel] = useState('');
  const [startProjectId, setStartProjectId] = useState<string | null>(null);
  const [startProjectPickerOpen, setStartProjectPickerOpen] = useState(false);
  const startProject = startProjectId
    ? (projects.find((p) => p.id === startProjectId) ?? null)
    : null;
  const [editingLabel, setEditingLabel] = useState(false);
  const [editLabelValue, setEditLabelValue] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [notesValue, setNotesValue] = useState('');

  // Invoice sheet
  const [invoiceSheetOpen, setInvoiceSheetOpen] = useState(false);

  // Detail sheet
  const [detailSession, setDetailSession] = useState<TimeSession | null>(null);

  // Invoice from detail — "add to existing" sheet + project picker
  const [detailAddToOpen, setDetailAddToOpen] = useState(false);
  const [detailProjectId, setDetailProjectId] = useState<string | null>(null);
  const [projectPickerOpen, setProjectPickerOpen] = useState(false);
  const [isCreatingFromDetail, setIsCreatingFromDetail] = useState(false);

  // Discard confirm
  const [discardOpen, setDiscardOpen] = useState(false);

  // Inline edit-times state for the detail sheet
  const [editingTimes, setEditingTimes] = useState(false);
  const [editStartLocal, setEditStartLocal] = useState('');
  const [editEndLocal, setEditEndLocal] = useState('');
  const [savingTimes, setSavingTimes] = useState(false);

  // Animated value for count-up
  const [animatedValue, setAnimatedValue] = useState(0);

  // Session list filter — toggles "not invoiced only" for batch billing prep
  const [notInvoicedOnly, setNotInvoicedOnly] = useState(false);

  // Multi-select mode for batch invoicing
  const [selectMode, setSelectMode] = useState(false);
  // Physical feedback matters more here than anywhere else in the app: this is
  // used one-handed, on site, often with gloves on, and the user needs to know
  // a timer actually started without stopping to read the screen.
  const haptic = useHaptic();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [billingMulti, setBillingMulti] = useState(false);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelectedIds(new Set());
  }, []);

  // ─── Metrics: today / this week / ready to bill ────────────────
  /*
   * Two corrections here beyond the arithmetic.
   *
   * 1. Unbilled time is SPLIT into what is ready and what looks like a
   *    forgotten timer, instead of being summed into one figure. One session
   *    left running from 20 to 27 July was £9,117.41 of a £9,118.80 total: the
   *    headline was 99.98% phantom and the £1.39 that could actually be
   *    invoiced was invisible. Nothing is hidden — both halves are shown.
   *
   * 2. The RUNNING session now counts towards today and this week. It did not
   *    before, because those totals read `duration_seconds`, which is null
   *    until a session is stopped — so the page showed "Today 0m" to someone
   *    who had been on the clock since breakfast.
   */
  const metrics = useMemo<TimeMetrics>(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayOfWeek = (now.getDay() + 6) % 7; // Monday = 0
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - dayOfWeek);

    let todaySec = 0;
    let todayVal = 0;
    let weekSec = 0;
    let weekVal = 0;
    let readySec = 0;
    let readyVal = 0;
    let readyCount = 0;
    let checkSec = 0;
    let checkVal = 0;
    let checkCount = 0;

    for (const s of sessions) {
      const sec = s.duration_seconds ?? 0;
      const rate = s.hourly_rate ?? hourlyRate;
      const val = calculateValue(sec, rate);
      const start = new Date(s.started_at);
      if (start >= todayStart) {
        todaySec += sec;
        todayVal += val;
      }
      if (start >= weekStart) {
        weekSec += sec;
        weekVal += val;
      }
      if (!s.invoice_id && sec > 0) {
        if (sec >= RUNAWAY_SESSION_SECONDS) {
          checkSec += sec;
          checkVal += val;
          checkCount += 1;
        } else {
          readySec += sec;
          readyVal += val;
          readyCount += 1;
        }
      }
    }

    if (activeSession) {
      const rate = activeSession.hourly_rate ?? hourlyRate;
      const val = calculateValue(elapsedSeconds, rate);
      const start = new Date(activeSession.started_at);
      if (start >= todayStart) {
        todaySec += elapsedSeconds;
        todayVal += val;
      }
      if (start >= weekStart) {
        weekSec += elapsedSeconds;
        weekVal += val;
      }
    }

    return {
      readySec,
      readyVal,
      readyCount,
      checkSec,
      checkVal,
      checkCount,
      todaySec,
      todayVal,
      weekSec,
      weekVal,
    };
  }, [sessions, hourlyRate, activeSession, elapsedSeconds]);

  const filteredSessions = useMemo(
    () => (notInvoicedOnly ? sessions.filter((s) => !s.invoice_id) : sessions),
    [sessions, notInvoicedOnly]
  );

  /* The most recent session's description, offered as a one-tap repeat. The
     same job usually spans several visits, and 17 of the 44 sessions on record
     have no description at all — the cheapest way to fix that is to make
     reusing the last one easier than skipping the field. */
  const lastSessionLabel = useMemo(() => {
    const withLabel = sessions.find((s) => (s.label ?? '').trim().length > 0);
    return withLabel?.label?.trim() ?? null;
  }, [sessions]);

  // Un-invoiced sessions long enough to be a forgotten timer. Surfaced before
  // the user reaches the invoice step, because that is the point at which a
  // phantom figure becomes a real problem with a customer.
  const runawaySessions = useMemo(
    () =>
      sessions.filter(
        (s) => !s.invoice_id && (s.duration_seconds ?? 0) >= RUNAWAY_SESSION_SECONDS
      ),
    [sessions]
  );

  /*
   * The detector above can only see FINISHED sessions, because `duration_seconds`
   * is null until a timer is stopped. So the one case it was built for — a timer
   * still running away right now — was the one case it could never catch. On
   * live data there is a session that has been running since 27 July: ten days,
   * invisible to the warning, and contributing nothing to any total.
   */
  const activeIsRunaway = !!activeSession && elapsedSeconds >= RUNAWAY_SESSION_SECONDS;

  // Cross-page hand-off — Projects page sets `time-tracker-prefill` in
  // sessionStorage when the user taps "Start timer" on a project card. We
  // pick that up here on mount: prefill label + project tag and (when no
  // session is running) auto-start the timer so the user lands in the
  // running state without an extra tap.
  useEffect(() => {
    if (isLoading) return; // wait for active-session query to resolve first
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem('time-tracker-prefill');
    } catch {
      return;
    }
    if (!raw) return;
    sessionStorage.removeItem('time-tracker-prefill');
    try {
      const parsed = JSON.parse(raw) as { projectId?: string | null; label?: string };
      if (parsed.label) setJobLabel(parsed.label);
      if (parsed.projectId) setStartProjectId(parsed.projectId);
      // Auto-start only when nothing is currently running — never interrupt.
      if (!activeSession && parsed.projectId) {
        // Defer to next tick so state updates land before handleStart reads them.
        setTimeout(() => {
          startSession(parsed.label || undefined, parsed.projectId ?? null).catch(() => {
            // Swallow — UI will reflect via the active-session query
          });
        }, 50);
      }
    } catch {
      /* ignore corrupt prefill */
    }
    // Intentionally fires once after the initial load resolves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Sync page state with active session (handles resume after app kill)
  useEffect(() => {
    if (!isLoading) {
      if (activeSession) {
        setPageState('running');
      } else if (pageState === 'running' && !stoppedSession) {
        setPageState('idle');
      }
    }
  }, [activeSession, isLoading, pageState, stoppedSession]);

  // Count-up animation for summary value
  useEffect(() => {
    if (pageState === 'summary' && stoppedSession) {
      const targetValue = calculateValue(
        stoppedSession.duration_seconds ?? 0,
        stoppedSession.hourly_rate ?? hourlyRate
      );
      const duration = 800;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        setAnimatedValue(Math.round(eased * targetValue * 100) / 100);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [pageState, stoppedSession, hourlyRate]);

  // ─── Actions ─────────────────────────────────────────────
  const handleStart = useCallback(async () => {
    try {
      haptic.success();
      await startSession(jobLabel || undefined, startProjectId);
      setJobLabel('');
      setStartProjectId(null);
      // pageState transitions to 'running' via useEffect once activeSession query updates
    } catch {
      // Session may have been created despite a network error response.
      // The useEffect will detect it from the query — only show error if we stay on idle.
      // Small delay lets the invalidateQueries refetch complete before we decide.
      setTimeout(() => {
        setPageState((prev) => {
          if (prev !== 'running') {
            toast({
              title: 'Failed to start session',
              description: 'Check your connection and try again.',
              variant: 'destructive',
            });
          }
          return prev;
        });
      }, 1500);
    }
  }, [startSession, jobLabel, startProjectId, haptic]);

  const handleStop = useCallback(async () => {
    try {
      haptic.heavy();
      const session = await stopSession();
      setStoppedSession(session);
      setPageState('summary');
    } catch {
      toast({
        title: 'Failed to stop session',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  }, [stopSession, haptic]);

  const handleSaveLabel = useCallback(async () => {
    if (!activeSession) return;
    try {
      await updateLabel(editLabelValue);
      setEditingLabel(false);
    } catch {
      // silent
    }
  }, [activeSession, editLabelValue, updateLabel]);

  const handleSaveNotes = useCallback(async () => {
    if (!activeSession) return;
    try {
      await updateNotes(notesValue);
      setShowNotes(false);
      toast({ title: 'Notes saved', variant: 'success', duration: 2000 });
    } catch {
      // silent
    }
  }, [activeSession, notesValue, updateNotes]);

  const handleSaveWithoutInvoicing = useCallback(() => {
    setPageState('success');
    setTimeout(() => {
      setStoppedSession(null);
      setPageState('idle');
    }, 2000);
  }, []);

  const handleDiscard = useCallback(async () => {
    if (!stoppedSession) return;
    try {
      await deleteSession(stoppedSession.id);
      setStoppedSession(null);
      setPageState('idle');
      toast({ title: 'Session discarded', variant: 'success', duration: 2000 });
    } catch {
      toast({ title: 'Failed to discard', variant: 'destructive' });
    }
    setDiscardOpen(false);
  }, [stoppedSession, deleteSession]);

  // ─── Invoice creation ───────────────────────────────────
  const handleNewInvoice = useCallback(async () => {
    if (!stoppedSession) return;
    const sess = stoppedSession;
    const rate = sess.hourly_rate ?? hourlyRate;
    const hours = Math.round(((sess.duration_seconds ?? 0) / 3600) * 100) / 100;
    const total = Math.round(hours * rate * 100) / 100;

    const labourDescription = `Electrical labour${sess.label ? ` \u2014 ${sess.label}` : ''}`;

    const invoiceId = uuidv4();
    const invoiceDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const newInvoice = {
      id: invoiceId,
      invoice_raised: true,
      invoice_number: undefined,
      invoice_date: invoiceDate,
      invoice_due_date: dueDate,
      invoice_status: 'draft' as const,
      additional_invoice_items: [],
      work_completion_date: new Date(sess.ended_at ?? new Date()),
      items: [
        {
          id: uuidv4(),
          description: labourDescription,
          quantity: hours,
          unit: 'hrs',
          unitPrice: rate,
          totalPrice: total,
          category: 'labour' as const,
        },
      ],
      client: { name: '', email: '', phone: '', address: '', postcode: '' },
      jobDetails: {
        title: sess.label || 'Callout',
        description: '',
      },
      settings: {
        labourRate: rate,
        overheadPercentage: 0,
        profitMargin: 0,
        vatRate: 20,
        vatRegistered: false,
        paymentTerms: '30 days',
        dueDate,
      },
      subtotal: total,
      overhead: 0,
      profit: 0,
      vatAmount: 0,
      total,
    };

    try {
      const success = await saveInvoice(newInvoice);
      if (success) {
        // Mark time session as invoiced — use the REAL saved id (audit P0)
        try {
          await markInvoiced(sess.id, typeof success === 'string' ? success : invoiceId);
        } catch {
          /* non-blocking */
        }
        setInvoiceSheetOpen(false);
        setPageState('success');
        setTimeout(() => {
          setStoppedSession(null);
          navigate('/electrician/invoices');
        }, 1500);
      }
    } catch {
      toast({ title: 'Failed to create invoice', variant: 'destructive' });
    }
  }, [stoppedSession, hourlyRate, saveInvoice, markInvoiced, navigate]);

  const handleAddToExisting = useCallback(
    async (existingInvoice: (typeof invoices)[0]) => {
      if (!stoppedSession) return;
      const sess = stoppedSession;
      const rate = sess.hourly_rate ?? hourlyRate;
      const hours = Math.round(((sess.duration_seconds ?? 0) / 3600) * 100) / 100;
      const lineTotal = Math.round(hours * rate * 100) / 100;
      const labourDescription = `Electrical labour${sess.label ? ` \u2014 ${sess.label}` : ''}`;

      const newItem = {
        id: uuidv4(),
        description: labourDescription,
        quantity: hours,
        unit: 'hrs',
        unitPrice: rate,
        totalPrice: lineTotal,
        category: 'labour' as const,
      };

      const updatedItems = [...(existingInvoice.items || []), newItem];
      const newSubtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const vatRate = existingInvoice.settings?.vatRegistered
        ? (existingInvoice.settings?.vatRate ?? 20) / 100
        : 0;
      const newVat = Math.round(newSubtotal * vatRate * 100) / 100;
      const newTotal = Math.round((newSubtotal + newVat) * 100) / 100;

      try {
        const success = await saveInvoice({
          ...existingInvoice,
          items: updatedItems,
          subtotal: newSubtotal,
          vatAmount: newVat,
          total: newTotal,
        });
        if (success) {
          try {
            await markInvoiced(sess.id, existingInvoice.id);
          } catch {
            /* non-blocking */
          }
          setInvoiceSheetOpen(false);
          setPageState('success');
          setTimeout(() => {
            setStoppedSession(null);
            navigate('/electrician/invoices');
          }, 1500);
        }
      } catch {
        toast({ title: 'Failed to add to invoice', variant: 'destructive' });
      }
    },
    [stoppedSession, hourlyRate, saveInvoice, markInvoiced, navigate]
  );

  // ── Open invoice wizard with time session pre-loaded as a labour line ──
  const handleOpenInvoiceWizard = useCallback(() => {
    if (!detailSession) return;
    const sess = detailSession;
    const rate = sess.hourly_rate ?? hourlyRate;
    const hours = Math.round(((sess.duration_seconds ?? 0) / 3600) * 100) / 100;
    const total = Math.round(hours * rate * 100) / 100;
    const labourDescription = `Electrical labour${sess.label ? ` — ${sess.label}` : ''}`;

    const sessionId = `time-invoice-${Date.now()}`;
    sessionStorage.setItem(
      sessionId,
      JSON.stringify({
        certificateData: {
          client: { name: '', email: '', phone: '', address: '', postcode: '' },
          jobDetails: { title: sess.label || 'Callout', description: '', location: '' },
          items: [
            {
              id: uuidv4(),
              description: labourDescription,
              quantity: hours,
              unit: 'hrs',
              unitPrice: rate,
              totalPrice: total,
              category: 'labour',
            },
          ],
        },
      })
    );
    // Mark session as invoiced after wizard completes (wizard navigates to /invoices)
    // Store session id in sessionStorage so InvoiceBuilderCreate can call markInvoiced
    sessionStorage.setItem(`time-session-ref-${sessionId}`, sess.id);
    setDetailSession(null);
    setDetailProjectId(null);
    const projectParam = detailProjectId ? `&projectId=${detailProjectId}` : '';
    navigate(
      `/electrician/invoice-builder/create?certificateSessionId=${sessionId}&timeSessionId=${sess.id}${projectParam}`
    );
  }, [detailSession, hourlyRate, detailProjectId, navigate]);

  const handleAddToExistingFromDetail = useCallback(
    async (existingInvoice: (typeof invoices)[0]) => {
      if (!detailSession) return;
      const sess = detailSession;
      const rate = sess.hourly_rate ?? hourlyRate;
      const hours = Math.round(((sess.duration_seconds ?? 0) / 3600) * 100) / 100;
      const lineTotal = Math.round(hours * rate * 100) / 100;
      const labourDescription = `Electrical labour${sess.label ? ` — ${sess.label}` : ''}`;

      const newItem = {
        id: uuidv4(),
        description: labourDescription,
        quantity: hours,
        unit: 'hrs',
        unitPrice: rate,
        totalPrice: lineTotal,
        category: 'labour' as const,
      };

      const updatedItems = [...(existingInvoice.items || []), newItem];
      const newSubtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const vatRate = existingInvoice.settings?.vatRegistered
        ? (existingInvoice.settings?.vatRate ?? 20) / 100
        : 0;
      const newVat = Math.round(newSubtotal * vatRate * 100) / 100;
      const newTotal = Math.round((newSubtotal + newVat) * 100) / 100;

      setIsCreatingFromDetail(true);
      try {
        const success = await saveInvoice({
          ...existingInvoice,
          items: updatedItems,
          subtotal: newSubtotal,
          vatAmount: newVat,
          total: newTotal,
        });
        if (success) {
          try {
            await markInvoiced(sess.id, existingInvoice.id);
          } catch {
            /* non-blocking */
          }
          setDetailAddToOpen(false);
          setDetailSession(null);
          toast({
            title: '✅ Added to invoice',
            description: 'Labour line item added.',
            duration: 3000,
          });
          navigate('/electrician/invoices');
        }
      } catch {
        toast({ title: 'Failed to add to invoice', variant: 'destructive' });
      } finally {
        setIsCreatingFromDetail(false);
      }
    },
    [detailSession, hourlyRate, saveInvoice, markInvoiced, navigate]
  );

  // Draft invoices for the sheet
  const draftInvoices = invoices.filter((inv) => inv.invoice_status === 'draft');

  // Seed the detail-sheet project state from the row when the sheet opens,
  // so the chip reflects what's currently tagged rather than starting blank.
  useEffect(() => {
    if (detailSession) {
      setDetailProjectId(detailSession.project_id ?? null);
    }
  }, [detailSession]);

  // Persist a project tag change made from the detail sheet
  const handleSetDetailProject = useCallback(
    async (projectId: string | null) => {
      if (!detailSession) return;
      // Optimistic UI — toggle the chip immediately
      setDetailProjectId(projectId);
      try {
        await updateProject(detailSession.id, projectId);
        setDetailSession((cur) => (cur ? { ...cur, project_id: projectId } : cur));
      } catch (err) {
        // Revert on failure
        setDetailProjectId(detailSession.project_id ?? null);
        toast({
          title: 'Could not retag session',
          description: err instanceof Error ? err.message : 'Please try again.',
          variant: 'destructive',
        });
      }
    },
    [detailSession, updateProject]
  );

  // ─── Inline time edit ──────────────────────────────────────────────
  const openEditTimes = useCallback(() => {
    if (!detailSession) return;
    setEditStartLocal(toLocalInput(detailSession.started_at));
    setEditEndLocal(toLocalInput(detailSession.ended_at ?? detailSession.started_at));
    setEditingTimes(true);
  }, [detailSession]);

  const cancelEditTimes = useCallback(() => {
    setEditingTimes(false);
    setEditStartLocal('');
    setEditEndLocal('');
  }, []);

  const saveEditTimes = useCallback(async () => {
    if (!detailSession || savingTimes) return;
    if (!editStartLocal || !editEndLocal) {
      toast({ title: 'Both times are required', variant: 'destructive' });
      return;
    }
    const startISO = fromLocalInput(editStartLocal);
    const endISO = fromLocalInput(editEndLocal);
    if (new Date(endISO) <= new Date(startISO)) {
      toast({ title: 'End time must be after start time', variant: 'destructive' });
      return;
    }
    setSavingTimes(true);
    try {
      await updateTimes(detailSession.id, startISO, endISO);
      // Reflect the change on the open detail sheet without closing it
      const newDuration = Math.floor(
        (new Date(endISO).getTime() - new Date(startISO).getTime()) / 1000
      );
      setDetailSession({
        ...detailSession,
        started_at: startISO,
        ended_at: endISO,
        duration_seconds: newDuration,
      });
      setEditingTimes(false);
      toast({ title: 'Times updated', variant: 'success', duration: 2000 });
    } catch (err) {
      toast({
        title: 'Failed to update times',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSavingTimes(false);
    }
  }, [detailSession, editStartLocal, editEndLocal, updateTimes, savingTimes]);

  // ─── Multi-session billing ─────────────────────────────────────────
  // Total for selected (used by the floating action bar)
  const selectedTotals = useMemo(() => {
    let seconds = 0;
    let value = 0;
    for (const s of sessions) {
      if (!selectedIds.has(s.id)) continue;
      const sec = s.duration_seconds ?? 0;
      const rate = s.hourly_rate ?? hourlyRate;
      seconds += sec;
      value += calculateValue(sec, rate);
    }
    return { seconds, value, count: selectedIds.size };
  }, [selectedIds, sessions, hourlyRate]);

  // Create ONE invoice with a labour line per selected session, then mark all as invoiced.
  const handleBillSelected = useCallback(async () => {
    if (selectedIds.size === 0 || billingMulti) return;
    setBillingMulti(true);
    try {
      const picked = sessions.filter((s) => selectedIds.has(s.id) && !s.invoice_id);
      if (picked.length === 0) {
        toast({ title: 'Nothing to bill — selection is empty or already invoiced.' });
        return;
      }

      const invoiceId = uuidv4();
      const invoiceDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);

      // Latest stop date drives "work_completion_date"
      const latestEndedAt = picked.reduce<Date>((acc, s) => {
        const t = s.ended_at ? new Date(s.ended_at) : new Date(s.started_at);
        return t > acc ? t : acc;
      }, new Date(0));

      const items = picked.map((s) => {
        const rate = s.hourly_rate ?? hourlyRate;
        const hours = Math.round(((s.duration_seconds ?? 0) / 3600) * 100) / 100;
        const lineTotal = Math.round(hours * rate * 100) / 100;
        const dateLabel = formatSessionDate(s.started_at);
        const description = `Electrical labour${s.label ? ` — ${s.label}` : ''} (${dateLabel})`;
        return {
          id: uuidv4(),
          description,
          quantity: hours,
          unit: 'hrs',
          unitPrice: rate,
          totalPrice: lineTotal,
          category: 'labour' as const,
        };
      });

      const subtotal = Math.round(items.reduce((s, i) => s + i.totalPrice, 0) * 100) / 100;

      const newInvoice = {
        id: invoiceId,
        invoice_raised: true,
        invoice_number: undefined,
        invoice_date: invoiceDate,
        invoice_due_date: dueDate,
        invoice_status: 'draft' as const,
        additional_invoice_items: [],
        work_completion_date: latestEndedAt,
        items,
        client: { name: '', email: '', phone: '', address: '', postcode: '' },
        jobDetails: {
          title: picked.length === 1 ? (picked[0].label || 'Callout') : `Labour — ${picked.length} sessions`,
          description: '',
        },
        settings: {
          labourRate: hourlyRate,
          overheadPercentage: 0,
          profitMargin: 0,
          vatRate: 20,
          vatRegistered: false,
          paymentTerms: '30 days',
          dueDate,
        },
        subtotal,
        overhead: 0,
        profit: 0,
        vatAmount: 0,
        total: subtotal,
      };

      const ok = await saveInvoice(newInvoice);
      if (!ok) throw new Error('Save failed');

      // Mark every session as invoiced (best-effort; one failure doesn't unwind)
      for (const s of picked) {
        try {
          await markInvoiced(s.id, invoiceId);
        } catch {
          /* non-blocking */
        }
      }

      toast({
        title: `Drafted invoice for ${picked.length} session${picked.length === 1 ? '' : 's'}`,
        description: `${formatCurrency(subtotal)} ready to send.`,
        variant: 'success',
        duration: 3500,
      });
      exitSelectMode();
      navigate('/electrician/invoices');
    } catch (err) {
      console.error('[TimeTracker] bill selected error', err);
      toast({
        title: 'Failed to draft invoice',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBillingMulti(false);
    }
  }, [
    selectedIds,
    sessions,
    hourlyRate,
    saveInvoice,
    markInvoiced,
    navigate,
    billingMulti,
    exitSelectMode,
  ]);

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background min-h-screen pb-24">
      {/* Sticky header — same construction as the Price Book and the Calendar */}
      <div className="sticky top-0 z-30 border-b border-white/[0.10] bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2 lg:mx-auto lg:max-w-[1200px] lg:px-8">
          <div className="flex h-11 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/business')}
              aria-label="Back to Business Hub"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-[19px] font-semibold tracking-tight text-white">
              Time Tracker
            </h1>
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/[0.10] touch-manipulation"
            >
              {formatCurrency(hourlyRate)}/hr
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 lg:mx-auto lg:max-w-[1200px] lg:px-8">
        <TimeTrackerSummary
          metrics={metrics}
          formatDuration={formatDuration}
          formatCurrency={formatCurrency}
          filtered={notInvoicedOnly}
          onToggleFilter={() => {
            haptic.selection();
            setNotInvoicedOnly((v) => !v);
          }}
          onShowFlagged={() => {
            haptic.selection();
            setNotInvoicedOnly(true);
          }}
        />
      </div>

      {/* Main content area */}
      {/*
        Bottom clearance. The page had none, so the last session row sat under
        the iOS home indicator / Android gesture bar — and when select mode
        raises the fixed action bar, the final row was hidden behind it entirely
        with no way to scroll further. Extra room only while that bar is up.
      */}
      <div
        className="px-4 lg:px-8 lg:max-w-[1200px] lg:mx-auto space-y-5 mt-4"
        style={{
          paddingBottom: selectMode
            ? 'calc(env(safe-area-inset-bottom, 0px) + 7rem)'
            : 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
        }}
      >
        <AnimatePresence mode="wait">
          {/* ═══ SUCCESS STATE ═══ */}
          {pageState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              >
                <CheckCircle2 className="h-20 w-20 text-elec-yellow" />
              </motion.div>
              <p className="text-xl font-bold text-white mt-4">Saved</p>
            </motion.div>
          )}

          {/* ═══ RUNNING STATE ═══ */}
          {pageState === 'running' && activeSession && (
            <motion.div
              key="running"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RunningTimerCard
                elapsedSeconds={elapsedSeconds}
                startedAt={activeSession.started_at}
                label={activeSession.label ?? null}
                notes={activeSession.notes ?? null}
                hourlyRate={activeSession.hourly_rate ?? hourlyRate}
                runawaySeconds={RUNAWAY_SESSION_SECONDS}
                editingLabel={editingLabel}
                editLabelValue={editLabelValue}
                onEditLabelChange={setEditLabelValue}
                onBeginEditLabel={() => {
                  setEditLabelValue(activeSession.label || '');
                  setEditingLabel(true);
                }}
                onSaveLabel={handleSaveLabel}
                onCancelEditLabel={() => setEditingLabel(false)}
                showNotes={showNotes}
                notesValue={notesValue}
                onNotesChange={setNotesValue}
                onBeginNotes={() => {
                  setNotesValue(activeSession.notes || '');
                  setShowNotes(true);
                }}
                onSaveNotes={handleSaveNotes}
                onCancelNotes={() => setShowNotes(false)}
                onStop={handleStop}
                formatTime={formatTime}
                formatStartTime={formatStartTime}
                formatCurrency={formatCurrency}
              />
            </motion.div>
          )}

          {/* ═══ SUMMARY STATE ═══ */}
          {pageState === 'summary' && stoppedSession && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              {/* Duration + rate */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 text-center">
                <p className="text-2xl font-bold text-white">
                  {formatDurationLong(stoppedSession.duration_seconds ?? 0)}
                </p>
                <p className="text-elec-yellow text-sm mt-1">
                  @ {formatCurrency(stoppedSession.hourly_rate ?? hourlyRate)}/hr
                </p>
              </div>

              {/* Value card */}
              <div className="rounded-2xl bg-elec-yellow/[0.10] border border-elec-yellow/30 p-6 text-center">
                <p className="text-5xl sm:text-6xl font-bold text-elec-yellow font-mono tabular-nums">
                  {formatCurrency(animatedValue)}
                </p>
                <p className="text-white text-sm mt-2">
                  {(
                    Math.round(((stoppedSession.duration_seconds ?? 0) / 3600) * 100) / 100
                  ).toFixed(2)}{' '}
                  hrs
                  {' \u00D7 '}
                  {formatCurrency(stoppedSession.hourly_rate ?? hourlyRate)}/hr
                </p>
              </div>

              {/* Label + notes */}
              {stoppedSession.label && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-xs text-white uppercase tracking-wider mb-1">Job</p>
                  <p className="text-white">{stoppedSession.label}</p>
                </div>
              )}
              {stoppedSession.notes && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-xs text-white uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-white text-sm">{stoppedSession.notes}</p>
                </div>
              )}

              {/* Action buttons */}
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setInvoiceSheetOpen(true)}
                  className="w-full h-12 text-[15px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black border-0 rounded-xl touch-manipulation active:scale-[0.98]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Add to invoice
                </Button>
              </motion.div>

              <Button
                variant="outline"
                onClick={handleSaveWithoutInvoicing}
                className="w-full h-12 text-white border-white/[0.12] hover:bg-white/[0.06] hover:text-white rounded-xl touch-manipulation"
              >
                Save without invoicing
              </Button>

              <button
                onClick={() => setDiscardOpen(true)}
                className="w-full text-center text-sm text-white hover:text-red-400 transition-colors py-2 touch-manipulation"
              >
                Discard session
              </button>
            </motion.div>
          )}

          {/* ═══ IDLE STATE ═══ */}
          {pageState === 'idle' && !isLoading && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Rate warning — only when on the default */}
              {hourlyRate === 45 && (
                <div className={warningPanelCn}>
                  <p className="text-[13px] font-semibold text-orange-300">Default rate in use</p>
                  <p className="mt-0.5 text-[12px] text-white">
                    Every session is being costed at {formatCurrency(hourlyRate)}/hr.{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/settings')}
                      className="font-semibold text-elec-yellow underline touch-manipulation"
                    >
                      Set your rate
                    </button>
                    .
                  </p>
                </div>
              )}

              <StartSessionCard
                jobLabel={jobLabel}
                onJobLabelChange={setJobLabel}
                projectTitle={startProject ? startProject.title : null}
                onOpenProjectPicker={() => {
                  haptic.selection();
                  setStartProjectPickerOpen(true);
                }}
                onClearProject={() => setStartProjectId(null)}
                onStart={handleStart}
                isStarting={isStarting}
                lastLabel={lastSessionLabel}
                onRepeatLast={() => lastSessionLabel && setJobLabel(lastSessionLabel)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ SESSIONS LIST ═══ */}
        {pageState !== 'success' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 -mx-4 lg:-mx-0"
          >
            {/* Forgotten-timer warning — before the invoice step, not after.
                Covers the RUNNING timer as well: that case was invisible here,
                because a session has no duration until it is stopped. */}
            {(runawaySessions.length > 0 || activeIsRunaway) && (
              <div className={cn(warningPanelCn, 'mx-4 mb-3 lg:mx-0')}>
                <p className="text-[13px] font-semibold text-orange-300">
                  {activeIsRunaway
                    ? 'A timer is still running'
                    : runawaySessions.length === 1
                      ? 'One session looks like a timer left running'
                      : `${runawaySessions.length} sessions look like timers left running`}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-white">
                  {activeIsRunaway
                    ? `It has been going ${formatDuration(elapsedSeconds)}. Stop it and correct the times before it lands on an invoice.`
                    : runawaySessions.length === 1
                      ? `${formatDuration(runawaySessions[0].duration_seconds ?? 0)} on one session — worth checking before you invoice it. Tap it to edit its times.`
                      : 'Each is over 12 hours — worth checking before you invoice them. Tap one to edit its times.'}
                </p>
              </div>
            )}

            {/* Heading + filter chips + select toggle */}
            <div className="flex items-center gap-3 px-4 lg:px-0 mb-2">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white shrink-0">
                Sessions
              </h2>
              <div className="flex gap-2">
                {(
                  [
                    { key: false, label: 'All' },
                    { key: true, label: 'To bill' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setNotInvoicedOnly(opt.key)}
                    aria-pressed={notInvoicedOnly === opt.key}
                    className={cn(
                      'h-9 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation active:scale-[0.97]',
                      notInvoicedOnly === opt.key ? chipOn : chipOff
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[12px] font-semibold text-white tabular-nums">
                  {filteredSessions.length}
                </span>
                {filteredSessions.some((s) => !s.invoice_id) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (selectMode) exitSelectMode();
                      else setSelectMode(true);
                    }}
                    className="h-9 rounded-full px-3 text-[12.5px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/[0.10] touch-manipulation"
                  >
                    {selectMode ? 'Cancel' : 'Select'}
                  </button>
                )}
              </div>
            </div>

            {filteredSessions.length === 0 ? (
              <div className="px-4 py-14 text-center lg:px-0">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">
                  {notInvoicedOnly ? 'Nothing waiting to be billed' : 'No sessions yet'}
                </h3>
                <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-white">
                  {notInvoicedOnly
                    ? 'Everything you have tracked is on an invoice.'
                    : 'Tap Start when you get to site and the time costs itself.'}
                </p>
              </div>
            ) : (
              <div className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
                {filteredSessions.map((session) => {
                  const linkedProject = session.project_id
                    ? (projects.find((p) => p.id === session.project_id) ?? null)
                    : null;
                  return (
                    <SessionRow
                      key={session.id}
                      session={session}
                      value={calculateValue(
                        session.duration_seconds ?? 0,
                        session.hourly_rate ?? hourlyRate
                      )}
                      projectTitle={linkedProject ? linkedProject.title : null}
                      flagged={(session.duration_seconds ?? 0) >= RUNAWAY_SESSION_SECONDS}
                      selectMode={selectMode}
                      selected={selectedIds.has(session.id)}
                      onTap={() => {
                        if (selectMode) {
                          // A distinct feel for select vs open — the same tap
                          // does two different things depending on mode.
                          if (!session.invoice_id) {
                            haptic.selection();
                            toggleSelect(session.id);
                          }
                          return;
                        }
                        haptic.light();
                        setDetailSession(session);
                      }}
                      formatDuration={formatDuration}
                      formatCurrency={formatCurrency}
                      formatSessionDate={formatSessionDate}
                    />
                  );
                })}
              </div>
            )}
          </motion.section>
        )}
      </div>

      {/* ═══ INVOICE SHEET ═══ */}
      <Sheet open={invoiceSheetOpen} onOpenChange={setInvoiceSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-white/[0.08] bg-[#111113] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-2">
            <SheetTitle className="text-white text-lg font-bold">Add to Invoice</SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-8 space-y-3">
            <button
              onClick={handleNewInvoice}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 flex items-center gap-3 active:bg-white/[0.08] transition-colors touch-manipulation"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-elec-yellow">
                <Plus className="h-5 w-5 text-black" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">New Invoice</p>
                <p className="text-white text-xs">Create with labour line item</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white ml-auto" />
            </button>

            {draftInvoices.length > 0 && (
              <>
                <p className="text-xs text-white uppercase tracking-wider pt-2">
                  Existing Drafts
                </p>
                {draftInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => handleAddToExisting(inv)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 flex items-center gap-3 active:bg-white/[0.08] transition-colors touch-manipulation"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {inv.invoice_number || inv.quoteNumber}
                      </p>
                      <p className="text-white text-xs truncate">
                        {inv.client?.name || 'No client'} · {formatCurrency(inv.total)}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                ))}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ SESSION DETAIL SHEET ═══ */}
      <Sheet
        open={!!detailSession}
        onOpenChange={(open) => {
          if (!open) {
            setDetailSession(null);
            setDetailProjectId(null);
            setEditingTimes(false);
            setEditStartLocal('');
            setEditEndLocal('');
          }
        }}
      >
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-white/[0.08] bg-[#111113] p-0"
        >
          {detailSession && (
            <>
              <SheetHeader className="px-6 pt-6 pb-2">
                <SheetTitle className="text-white text-lg font-bold">
                  {detailSession.label || 'Unnamed job'}
                </SheetTitle>
              </SheetHeader>
              <div className="px-6 pb-8 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white mb-1">Duration</p>
                    <p className="text-white font-mono font-bold tabular-nums">
                      {formatDuration(detailSession.duration_seconds ?? 0)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white mb-1">Value</p>
                    <p className="text-elec-yellow font-mono font-bold tabular-nums">
                      {formatCurrency(
                        calculateValue(
                          detailSession.duration_seconds ?? 0,
                          detailSession.hourly_rate ?? hourlyRate
                        )
                      )}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white mb-1">Started</p>
                    <p className="text-white text-sm">
                      {new Date(detailSession.started_at).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white mb-1">Rate</p>
                    <p className="text-white text-sm">
                      {formatCurrency(detailSession.hourly_rate ?? hourlyRate)}/hr
                    </p>
                  </div>
                </div>

                {/* Inline edit-times — only editable when not invoiced */}
                {!detailSession.invoice_id && (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                    {!editingTimes ? (
                      <button
                        type="button"
                        onClick={openEditTimes}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors"
                      >
                        <span className="flex items-center gap-2 text-[13px] text-white">
                          <Pencil className="h-3.5 w-3.5 text-white" />
                          Edit start &amp; end times
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-white" />
                      </button>
                    ) : (
                      <div className="p-3.5 space-y-3">
                        <div>
                          <label className="text-[11px] uppercase tracking-[0.14em] text-white mb-1.5 block">
                            Start
                          </label>
                          <Input
                            type="datetime-local"
                            value={editStartLocal}
                            onChange={(e) => setEditStartLocal(e.target.value)}
                            className="h-11 text-base touch-manipulation border-white/[0.10] focus:border-elec-yellow focus:ring-0 bg-white/[0.04] text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] uppercase tracking-[0.14em] text-white mb-1.5 block">
                            End
                          </label>
                          <Input
                            type="datetime-local"
                            value={editEndLocal}
                            onChange={(e) => setEditEndLocal(e.target.value)}
                            className="h-11 text-base touch-manipulation border-white/[0.10] focus:border-elec-yellow focus:ring-0 bg-white/[0.04] text-white"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button
                            variant="ghost"
                            onClick={cancelEditTimes}
                            disabled={savingTimes}
                            className="flex-1 h-11 text-white hover:text-white hover:bg-white/[0.06] touch-manipulation"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={saveEditTimes}
                            disabled={savingTimes}
                            className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                          >
                            {savingTimes ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              'Save times'
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {detailSession.notes && (
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white mb-1">Notes</p>
                    <p className="text-white text-sm">{detailSession.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
                      detailSession.invoice_id
                        ? 'bg-white/[0.10] text-white'
                        : 'bg-elec-yellow/20 text-elec-yellow'
                    )}
                  >
                    {detailSession.invoice_id ? 'Invoiced' : 'Not invoiced'}
                  </span>
                </div>

                {!detailSession.invoice_id && (
                  <div className="space-y-2">
                    {/* Optional project tag — persists to the row via updateProject */}
                    <button
                      onClick={() => setProjectPickerOpen(true)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border touch-manipulation transition-colors ${
                        detailProjectId
                          ? 'border-elec-yellow/30 bg-elec-yellow/[0.08] hover:bg-elec-yellow/[0.12]'
                          : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05]'
                      }`}
                    >
                      <FolderOpen
                        className={`h-4 w-4 shrink-0 ${
                          detailProjectId ? 'text-elec-yellow' : 'text-white'
                        }`}
                      />
                      <span className="flex-1 text-left text-sm text-white truncate">
                        {detailProjectId
                          ? (projects.find((p) => p.id === detailProjectId)?.title ?? 'Project')
                          : 'Tag to a project (optional)'}
                      </span>
                      {detailProjectId ? (
                        <X
                          className="h-3.5 w-3.5 text-white hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDetailProject(null);
                          }}
                        />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-white" />
                      )}
                    </button>

                    {/* Primary CTA — Create Invoice → opens full invoice wizard */}
                    <Button
                      onClick={handleOpenInvoiceWizard}
                      className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Create Invoice
                    </Button>

                    {/* Secondary — Add to existing draft */}
                    {draftInvoices.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setDetailAddToOpen(true)}
                        className="w-full h-11 text-white border-white/[0.12] hover:bg-white/[0.06] hover:text-white rounded-xl touch-manipulation"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Existing Invoice
                      </Button>
                    )}

                    {/* Delete */}
                    <Button
                      variant="outline"
                      onClick={async () => {
                        try {
                          await deleteSession(detailSession.id);
                          setDetailSession(null);
                          toast({ title: 'Session deleted', variant: 'success', duration: 2000 });
                        } catch {
                          toast({ title: 'Cannot delete', variant: 'destructive' });
                        }
                      }}
                      className="w-full h-11 text-red-400 border-red-400/30 hover:bg-red-500/10 hover:text-red-300 rounded-xl touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Session
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ═══ ADD TO EXISTING SHEET (from detail) ═══ */}
      <Sheet open={detailAddToOpen} onOpenChange={setDetailAddToOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-white/[0.08] bg-[#111113] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-2">
            <SheetTitle className="text-white text-lg font-bold">Add to Invoice</SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-8 space-y-2 max-h-72 overflow-y-auto">
            {draftInvoices.map((inv) => (
              <button
                key={inv.id}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 flex items-center gap-3 active:bg-white/[0.08] transition-colors touch-manipulation text-left"
                onClick={() => handleAddToExistingFromDetail(inv)}
                disabled={isCreatingFromDetail}
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {inv.client?.name || inv.jobDetails?.title || 'Draft invoice'}
                  </p>
                  <p className="text-white text-xs">
                    {inv.invoice_number || 'No number'} · £{(inv.total ?? 0).toFixed(2)}
                  </p>
                </div>
                {isCreatingFromDetail && (
                  <Loader2 className="h-4 w-4 text-white animate-spin flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ PROJECT PICKER — START FLOW (idle) ═══ */}
      <Sheet open={startProjectPickerOpen} onOpenChange={setStartProjectPickerOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-white/[0.08] bg-[#111113] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-2">
            <SheetTitle className="text-white text-lg font-bold">Tag to project</SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-8 space-y-2 max-h-80 overflow-y-auto">
            {projects.length === 0 ? (
              <p className="text-white text-sm text-center py-6">
                No active projects — create one from the Projects page.
              </p>
            ) : (
              <>
                <button
                  onClick={() => {
                    setStartProjectId(null);
                    setStartProjectPickerOpen(false);
                  }}
                  className={`w-full rounded-xl border p-3.5 flex items-center gap-3 transition-colors touch-manipulation text-left ${
                    !startProjectId
                      ? 'border-white/30 bg-white/[0.04]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">No project</p>
                    <p className="text-white text-xs">Untagged time session</p>
                  </div>
                  {!startProjectId && (
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                  )}
                </button>
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setStartProjectId(proj.id);
                      setStartProjectPickerOpen(false);
                    }}
                    className={`w-full rounded-xl border p-3.5 flex items-center gap-3 transition-colors touch-manipulation text-left ${
                      startProjectId === proj.id
                        ? 'border-elec-yellow/50 bg-elec-yellow/[0.08]'
                        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                      <FolderOpen className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{proj.title}</p>
                      {proj.customerName && (
                        <p className="text-white text-xs truncate">{proj.customerName}</p>
                      )}
                    </div>
                    {startProjectId === proj.id && (
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0" />
                    )}
                  </button>
                ))}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ PROJECT PICKER SHEET ═══ */}
      <Sheet open={projectPickerOpen} onOpenChange={setProjectPickerOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-white/[0.08] bg-[#111113] p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-2">
            <SheetTitle className="text-white text-lg font-bold">Tag to Project</SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-8 space-y-2 max-h-80 overflow-y-auto">
            {projects.length === 0 ? (
              <p className="text-white text-sm text-center py-6">No active projects found</p>
            ) : (
              projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    handleSetDetailProject(proj.id);
                    setProjectPickerOpen(false);
                  }}
                  className={`w-full rounded-xl border p-4 flex items-center gap-3 transition-colors touch-manipulation text-left ${
                    detailProjectId === proj.id
                      ? 'border-elec-yellow/50 bg-elec-yellow/[0.08]'
                      : 'border-white/[0.08] bg-white/[0.04] active:bg-white/[0.08]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{proj.title}</p>
                    {proj.customerName && (
                      <p className="text-white text-xs truncate">{proj.customerName}</p>
                    )}
                  </div>
                  {detailProjectId === proj.id && (
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ MULTI-SELECT FLOATING ACTION BAR ═══ */}
      <AnimatePresence>
        {selectMode && selectedTotals.count > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 bg-gradient-to-t from-background via-background/95 to-background/0 pointer-events-none"
          >
            <div className="max-w-[1200px] mx-auto pointer-events-auto">
              <div className="flex items-center gap-3 rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl shadow-black/40 px-3 py-2">
                <div className="flex-1 min-w-0 px-1">
                  <p className="text-[13px] font-semibold text-white leading-tight tabular-nums">
                    {selectedTotals.count} selected · {formatCurrency(selectedTotals.value)}
                  </p>
                  <p className="text-[11.5px] text-white tabular-nums leading-tight">
                    {formatDuration(selectedTotals.seconds)} of work
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={exitSelectMode}
                  className="h-10 px-3 text-[13px] text-white hover:text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBillSelected}
                  disabled={billingMulti}
                  className="h-10 px-4 text-[13.5px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
                >
                  {billingMulti ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                      Drafting…
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-1.5" />
                      Bill these
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ DISCARD CONFIRM ═══ */}
      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent className="bg-[#111113] border border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Discard session?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete this time session. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white border-white/[0.12] hover:bg-white/[0.08] hover:text-white touch-manipulation">
              Keep
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDiscard}
              className="bg-red-500 text-white hover:bg-red-600 touch-manipulation"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TimeTrackerPage;
