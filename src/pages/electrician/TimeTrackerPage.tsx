import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Play,
  Square,
  Clock,
  PoundSterling,
  ChevronRight,
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Pencil,
  Trash2,
  X,
  StickyNote,
  Loader2,
  FolderOpen,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

// ─── State machine ───────────────────────────────────────────
type PageState = 'idle' | 'running' | 'summary' | 'success';

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

  // Animated value for count-up
  const [animatedValue, setAnimatedValue] = useState(0);

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
      await startSession(jobLabel || undefined);
      setJobLabel('');
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
  }, [startSession, jobLabel]);

  const handleStop = useCallback(async () => {
    try {
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
  }, [stopSession]);

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
        // Mark time session as invoiced
        try {
          await markInvoiced(sess.id, invoiceId);
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

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/business')}
            className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Timer className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Time Tracker</h1>
              <p className="text-xs text-white/60">Log your hours on site</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="px-4 space-y-5 mt-2">
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
                <CheckCircle2 className="h-20 w-20 text-emerald-400" />
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
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                <div className="p-6 sm:p-8 flex flex-col items-center">
                  {/* Elapsed time */}
                  <div className="relative">
                    <p className="font-mono text-6xl sm:text-7xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
                      {formatTime(elapsedSeconds)}
                    </p>
                  </div>

                  <p className="text-white/60 text-sm mt-2">
                    Started at {formatStartTime(activeSession.started_at)}
                  </p>

                  {/* Editable label */}
                  <div className="mt-4 w-full max-w-xs">
                    {editingLabel ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editLabelValue}
                          onChange={(e) => setEditLabelValue(e.target.value)}
                          placeholder="Job description"
                          className="h-11 text-base touch-manipulation border-white/[0.12] focus:border-elec-yellow focus:ring-elec-yellow bg-white/[0.04] text-white"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveLabel();
                            if (e.key === 'Escape') setEditingLabel(false);
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={handleSaveLabel}
                          className="h-11 w-11 text-amber-400 hover:text-amber-300 hover:bg-white/10 touch-manipulation"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditLabelValue(activeSession.label || '');
                          setEditingLabel(true);
                        }}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mx-auto touch-manipulation"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="text-sm">
                          {activeSession.label || 'Add job description'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="mt-3 w-full max-w-xs">
                    {showNotes ? (
                      <div className="space-y-2">
                        <Textarea
                          value={notesValue}
                          onChange={(e) => setNotesValue(e.target.value)}
                          placeholder="Add notes..."
                          className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/[0.12] focus:border-elec-yellow bg-white/[0.04] text-white"
                          autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowNotes(false)}
                            className="text-white/60 hover:text-white hover:bg-white/10 touch-manipulation h-9"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveNotes}
                            className="bg-amber-500 text-black hover:bg-amber-400 touch-manipulation h-9"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setNotesValue(activeSession.notes || '');
                          setShowNotes(true);
                        }}
                        className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto text-sm touch-manipulation"
                      >
                        <StickyNote className="h-3.5 w-3.5" />
                        <span>{activeSession.notes ? 'Edit notes' : 'Add notes'}</span>
                      </button>
                    )}
                  </div>

                  {/* Stop button */}
                  <motion.div className="w-full mt-8" whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={handleStop}
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-0 rounded-xl touch-manipulation"
                    >
                      <Square className="h-5 w-5 mr-2 fill-white" />
                      Stop
                    </Button>
                  </motion.div>
                </div>

                {/* Pulsing ring indicator */}
                <div className="flex justify-center pb-4">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
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
                <p className="text-amber-400 text-sm mt-1">
                  @ {formatCurrency(stoppedSession.hourly_rate ?? hourlyRate)}/hr
                </p>
              </div>

              {/* Value card */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-6 text-center">
                <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent font-mono">
                  {formatCurrency(animatedValue)}
                </p>
                <p className="text-white/60 text-sm mt-2">
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
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Job</p>
                  <p className="text-white">{stoppedSession.label}</p>
                </div>
              )}
              {stoppedSession.notes && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-white/80 text-sm">{stoppedSession.notes}</p>
                </div>
              )}

              {/* Action buttons */}
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setInvoiceSheetOpen(true)}
                  className="w-full h-14 text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black border-0 rounded-xl touch-manipulation"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Add to Invoice
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
                className="w-full text-center text-sm text-white/40 hover:text-red-400 transition-colors py-2 touch-manipulation"
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
              {/* Rate warning */}
              {hourlyRate === 45 && (
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-orange-300 font-medium">Default rate in use</p>
                    <p className="text-white/60 mt-0.5">
                      Set your hourly rate in{' '}
                      <button
                        onClick={() => navigate('/settings')}
                        className="text-amber-400 underline touch-manipulation"
                      >
                        Business Settings
                      </button>{' '}
                      to see accurate job values.
                    </p>
                  </div>
                </div>
              )}

              {/* Job label input */}
              <Input
                value={jobLabel}
                onChange={(e) => setJobLabel(e.target.value)}
                placeholder="What's the job? (optional)"
                className="h-12 text-base touch-manipulation border-white/[0.12] focus:border-elec-yellow focus:ring-elec-yellow bg-white/[0.04] text-white placeholder:text-white/40 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStart();
                }}
              />

              {/* START button */}
              <motion.div whileTap={{ scale: isStarting ? 1 : 0.97 }}>
                <Button
                  onClick={handleStart}
                  disabled={isStarting}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 rounded-xl touch-manipulation shadow-lg shadow-emerald-500/20 disabled:opacity-70"
                >
                  {isStarting ? (
                    <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                  ) : (
                    <Play className="h-6 w-6 mr-2 fill-white" />
                  )}
                  {isStarting ? 'Starting…' : 'Start'}
                </Button>
              </motion.div>

              {/* Rate hint */}
              <p className="text-center text-xs text-white/40">
                Your hourly rate: {formatCurrency(hourlyRate)}/hr
                {' \u00B7 '}
                <button
                  onClick={() => navigate('/settings')}
                  className="text-amber-400/70 hover:text-amber-400 underline touch-manipulation"
                >
                  Edit in Settings
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ RECENT SESSIONS ═══ */}
        {pageState !== 'success' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h2 className="text-[11px] font-bold text-white uppercase tracking-widest mb-3">
              Recent Sessions
            </h2>

            {sessions.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 text-center">
                <Clock className="h-10 w-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/50 text-sm">
                  No sessions yet — tap Start when you arrive on site
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sessions.map((session) => {
                  const value = calculateValue(
                    session.duration_seconds ?? 0,
                    session.hourly_rate ?? hourlyRate
                  );
                  const isInvoiced = !!session.invoice_id;

                  return (
                    <button
                      key={session.id}
                      onClick={() => setDetailSession(session)}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 flex items-center gap-3 active:bg-white/[0.07] transition-colors touch-manipulation text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs text-white/50">
                            {formatSessionDate(session.started_at)}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                              isInvoiced
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {isInvoiced ? 'Invoiced' : 'Not invoiced'}
                          </span>
                        </div>
                        <p className="text-white text-sm font-medium truncate">
                          {session.label || 'Unnamed job'}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white text-sm font-mono">
                          {formatDuration(session.duration_seconds ?? 0)}
                        </p>
                        <p className="text-amber-400 text-xs">{formatCurrency(value)}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
                    </button>
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">New Invoice</p>
                <p className="text-white/50 text-xs">Create with labour line item</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/30 ml-auto" />
            </button>

            {draftInvoices.length > 0 && (
              <>
                <p className="text-xs text-white/40 uppercase tracking-wider pt-2">
                  Existing Drafts
                </p>
                {draftInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => handleAddToExisting(inv)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 flex items-center gap-3 active:bg-white/[0.08] transition-colors touch-manipulation"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-white/60" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {inv.invoice_number || inv.quoteNumber}
                      </p>
                      <p className="text-white/50 text-xs truncate">
                        {inv.client?.name || 'No client'} · {formatCurrency(inv.total)}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/30" />
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
                    <p className="text-xs text-white/50 mb-1">Duration</p>
                    <p className="text-white font-mono font-bold">
                      {formatDuration(detailSession.duration_seconds ?? 0)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white/50 mb-1">Value</p>
                    <p className="text-amber-400 font-mono font-bold">
                      {formatCurrency(
                        calculateValue(
                          detailSession.duration_seconds ?? 0,
                          detailSession.hourly_rate ?? hourlyRate
                        )
                      )}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white/50 mb-1">Started</p>
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
                    <p className="text-xs text-white/50 mb-1">Rate</p>
                    <p className="text-white text-sm">
                      {formatCurrency(detailSession.hourly_rate ?? hourlyRate)}/hr
                    </p>
                  </div>
                </div>

                {detailSession.notes && (
                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-white/50 mb-1">Notes</p>
                    <p className="text-white/80 text-sm">{detailSession.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                      detailSession.invoice_id
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {detailSession.invoice_id ? 'Invoiced' : 'Not invoiced'}
                  </span>
                </div>

                {!detailSession.invoice_id && (
                  <div className="space-y-2">
                    {/* Optional project tag */}
                    <button
                      onClick={() => setProjectPickerOpen(true)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] touch-manipulation active:bg-white/[0.06] transition-colors"
                    >
                      <FolderOpen className="h-4 w-4 text-white/50 flex-shrink-0" />
                      <span className="flex-1 text-left text-sm text-white/70">
                        {detailProjectId
                          ? (projects.find((p) => p.id === detailProjectId)?.title ?? 'Project')
                          : 'Tag to a project (optional)'}
                      </span>
                      {detailProjectId ? (
                        <X
                          className="h-3.5 w-3.5 text-white/40"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailProjectId(null);
                          }}
                        />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-white/30" />
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
                  <FileText className="h-5 w-5 text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {inv.client?.name || inv.jobDetails?.title || 'Draft invoice'}
                  </p>
                  <p className="text-white/50 text-xs">
                    {inv.invoice_number || 'No number'} · £{(inv.total ?? 0).toFixed(2)}
                  </p>
                </div>
                {isCreatingFromDetail && (
                  <Loader2 className="h-4 w-4 text-white/40 animate-spin flex-shrink-0" />
                )}
              </button>
            ))}
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
              <p className="text-white/50 text-sm text-center py-6">No active projects found</p>
            ) : (
              projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setDetailProjectId(proj.id);
                    setProjectPickerOpen(false);
                  }}
                  className={`w-full rounded-xl border p-4 flex items-center gap-3 transition-colors touch-manipulation text-left ${
                    detailProjectId === proj.id
                      ? 'border-elec-yellow/50 bg-elec-yellow/[0.06]'
                      : 'border-white/[0.08] bg-white/[0.04] active:bg-white/[0.08]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{proj.title}</p>
                    {proj.customerName && (
                      <p className="text-white/50 text-xs truncate">{proj.customerName}</p>
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

      {/* ═══ DISCARD CONFIRM ═══ */}
      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent className="bg-[#111113] border border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Discard session?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
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
