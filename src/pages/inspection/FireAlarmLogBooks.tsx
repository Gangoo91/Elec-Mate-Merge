/**
 * Fire Alarm Log Books — "the round" (ELE-1396).
 *
 * Dashboard: one row per building with an 8-week test strip. Creation is a
 * three-step wizard (Building → System → Weekly rhythm) with visible labels
 * and plain-English category descriptions — only the building name is
 * required, everything else can be added later from Manage.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import {
  useFireAlarmLogBooks,
  nextCallPoint,
  localIsoDate,
  type CallPoint,
  type FireAlarmLogBook,
  type LogBookStatus,
} from '@/hooks/useFireAlarmLogBook';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FireAlarmPanelAutocomplete } from '@/components/inspection/fire-alarm/FireAlarmPanelAutocomplete';

export const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

/** BS 5839-1 categories with plain-English scope lines. */
export const SYSTEM_CATEGORIES: { code: string; scope: string }[] = [
  { code: 'M', scope: 'Manual only — call points and sounders, no automatic detection' },
  { code: 'L1', scope: 'Life — automatic detection throughout the whole building' },
  { code: 'L2', scope: 'Life — escape routes, adjoining rooms and high-risk rooms (includes sleeping rooms from the 2025 edition)' },
  { code: 'L3', scope: 'Life — escape routes and rooms opening onto them' },
  { code: 'L4', scope: 'Life — escape routes only' },
  { code: 'L5', scope: 'Life — engineered to the specific risk in the fire strategy' },
  { code: 'P1', scope: 'Property — automatic detection throughout' },
  { code: 'P2', scope: 'Property — defined high-risk areas only' },
];

export const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/** Labelled input — placeholders vanish while typing; labels don't. */
export const Field = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-[11.5px] font-medium text-white mb-1.5">{label}</p>
    {children}
    {hint && <p className="mt-1 text-[11px] text-white leading-relaxed">{hint}</p>}
  </div>
);

/** Eight small squares, oldest week first. Filled = tested that week. */
export const TestStrip = ({ record, className }: { record: boolean[]; className?: string }) => (
  <div className={cn('flex items-center gap-1', className)} aria-label="Last 8 weeks of tests">
    {record.map((tested, i) => (
      <span
        key={i}
        className={cn(
          'h-2 w-2 rounded-[2px]',
          tested ? 'bg-elec-yellow' : 'bg-white/[0.1]',
          i === record.length - 1 && !tested && 'ring-1 ring-elec-yellow/60'
        )}
      />
    ))}
  </div>
);

const BuildingRow = ({
  book,
  status,
  nextCp,
  onOpen,
  onQuickPass,
  quickPassBusy,
}: {
  book: FireAlarmLogBook;
  status: LogBookStatus | undefined;
  nextCp: CallPoint | null;
  onOpen: () => void;
  onQuickPass: () => void;
  quickPassBusy: boolean;
}) => {
  const statusBits: { text: string; tone?: 'warn' }[] = [];
  if (status) {
    // Due buildings carry the action strip below instead of a text bit
    // Not "Add call points to start the rotation" as flat text — that named the
    // problem and offered nothing, on the one card the user was looking at. The
    // card now carries the action instead (see needsSetup below).
    if (status.testedThisWeek) statusBits.push({ text: 'Tested this week' });
    if (status.serviceDue)
      statusBits.push({
        text: `${status.serviceOverdue ? 'Service overdue' : 'Service due'} ${new Date(
          status.serviceDue + 'T00:00:00'
        ).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`,
        tone: status.serviceOverdue ? 'warn' : undefined,
      });
    if (status.falseAlarmInvestigationDue)
      statusBits.push({ text: 'False alarm rate needs investigating', tone: 'warn' });
  }

  const due = !!status && !status.testedThisWeek && !!nextCp;
  /**
   * A building with no call points cannot start its rotation, so it is not
   * "due" — it is unfinished. That is a different state and needs a different
   * prompt: telling someone their log book is waiting on them is only useful if
   * the next step is one tap away.
   */
  const needsSetup = !!status && !nextCp;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group w-full h-full flex flex-col text-left px-5 sm:px-6 py-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.14] hover:bg-[hsl(0_0%_14%)] hover:border-white/[0.14] transition-colors touch-manipulation cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50 active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <span className="text-[15.5px] font-semibold tracking-tight text-white group-hover:text-elec-yellow transition-colors truncate">
              {book.building_name}
            </span>
            {status && status.openFaults > 0 && (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-300 border border-orange-500/40 bg-orange-500/10 rounded px-1.5 py-0.5">
                {status.openFaults} fault{status.openFaults > 1 ? 's' : ''}
              </span>
            )}
          </div>
          {book.building_address && (
            <div className="mt-0.5 text-[12px] text-white truncate">{book.building_address}</div>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {statusBits.map((bit, i) => (
              <span
                key={i}
                className={cn(
                  'text-[12px]',
                  bit.tone === 'warn' ? 'text-orange-300' : 'text-white'
                )}
              >
                {bit.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
          {book.system_category && (
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white border border-white/[0.14] rounded px-1.5 py-0.5">
              {book.system_category}
            </span>
          )}
          {status && <TestStrip record={status.weeklyRecord} />}
        </div>
      </div>

      {/* Unfinished setup gets the same weight as a due test — it is the only
          thing standing between this building and a working log. */}
      {needsSetup && (
        <div className="mt-3 pt-3 border-t border-white/[0.14] flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-yellow-400 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Add call points
          </button>
          <span className="text-[11.5px] text-white">
            BS 5839-1 wants a different call point tested each week — add them once and the
            rotation runs itself.
          </span>
        </div>
      )}

      {/* Work the round without leaving it — one tap logs this week's test */}
      {due && (
        <div className="mt-3 pt-3 border-t border-white/[0.14] flex items-center gap-2.5">
          <button
            type="button"
            disabled={quickPassBusy}
            onClick={(e) => {
              e.stopPropagation();
              onQuickPass();
            }}
            className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-yellow-400 touch-manipulation disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {quickPassBusy ? 'Logging…' : `Record pass — CP ${nextCp!.number}`}
          </button>
          <span className="text-[11.5px] text-white truncate">
            {[nextCp!.zone && `Zone ${nextCp!.zone}`, nextCp!.location]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Self-playing demo of the weekly test flow: the app suggests CP 7, the
 * button presses itself, the log entry appears and the strip fills. A real
 * feel for the product with zero reading. Static "done" frame under
 * prefers-reduced-motion.
 */
const ExampleLog = ({ className }: { className?: string }) => {
  const reduced = useReducedMotion();
  // 0 = due, 1 = tap indicator lands, 2 = button pressed, 3 = logged
  const [phase, setPhase] = useState(reduced ? 3 : 0);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      if (cancelled) return;
      setPhase(0);
      timers.push(setTimeout(() => !cancelled && setPhase(1), 2400));
      timers.push(setTimeout(() => !cancelled && setPhase(2), 2900));
      timers.push(setTimeout(() => !cancelled && setPhase(3), 3250));
      timers.push(setTimeout(run, 8600));
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const logged = phase === 3;
  const strip = [true, true, false, true, true, true, true, logged];

  return (
    <div aria-hidden className={cn('select-none lg:sticky lg:top-24', className)}>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-2.5">
        What a live log looks like
      </p>
      <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.14] ring-1 ring-white/[0.04] shadow-2xl shadow-black/50 overflow-hidden">
        {/* Building row */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-[15.5px] font-semibold tracking-tight text-white">
                Harbour House
              </span>
              <div className="mt-0.5 text-[12px] text-white">12 Quay Street, Bristol</div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={logged ? 'done' : 'due'}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      'text-[12px] font-medium',
                      logged ? 'text-white' : 'text-elec-yellow'
                    )}
                  >
                    {logged ? 'Tested this week' : 'Test CP 7 this week'}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[12px] text-white">Service due 12 Sep</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white border border-white/[0.14] rounded px-1.5 py-0.5">
                L2
              </span>
              <div className="flex items-center gap-1">
                {strip.map((tested, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      backgroundColor: tested ? '#ffc800' : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      'h-2 w-2 rounded-[2px]',
                      i === strip.length - 1 && !tested && 'ring-1 ring-elec-yellow/60'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* This week panel */}
        <div className="border-t border-white/[0.14] px-5 py-4 min-h-[168px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
            This week
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {!logged ? (
              <motion.div
                key="due"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mt-1 text-[16px] font-semibold text-white tracking-tight">
                  Test call point 7
                </p>
                <p className="mt-0.5 text-[12.5px] text-white">Zone 2 · Stairwell B</p>
                <motion.div
                  animate={phase === 2 ? { scale: 0.95 } : { scale: 1 }}
                  transition={{ duration: 0.16 }}
                  className="relative mt-3 h-11 rounded-xl bg-elec-yellow flex items-center justify-center text-[13.5px] font-semibold text-black"
                >
                  Record pass
                  {/* Ghost tap — makes the self-press legible */}
                  <AnimatePresence>
                    {phase >= 1 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.6 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-8 top-1/2 -mt-3 h-6 w-6 rounded-full border-2 border-black/40 bg-white/40"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mt-1 text-[16px] font-semibold text-white tracking-tight">
                  Tested — all done
                </p>
                <p className="mt-0.5 text-[12.5px] text-white">
                  Next rotation: CP 8 — Reception
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="mt-3 flex items-baseline gap-3 rounded-xl bg-white/[0.04] border border-white/[0.14] px-3.5 py-2.5"
                >
                  <span className="text-[11px] text-white tabular-nums shrink-0">Today</span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
                      Weekly call point test
                    </span>
                    <span className="block text-[12.5px] text-white truncate">
                      CP 7 — Zone 2, Stairwell B — Pass
                    </span>
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="mt-2 text-[11px] text-white"
                >
                  Next reminder — Monday, if CP 8 isn't logged.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compliance */}
        <div className="border-t border-white/[0.14] px-5 py-4 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              False alarm rate
            </span>
            <span className="text-[13.5px] font-bold tabular-nums text-white">
              2.1
              <span className="text-[10.5px] font-medium text-white"> / 100 detectors / yr</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Rotation coverage
            </span>
            <span className="text-[13.5px] font-bold tabular-nums text-white">
              {logged ? 12 : 11}
              <span className="text-[10.5px] font-medium text-white"> of 12 in 12 mo</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Last export
            </span>
            <span className="text-[12px] text-white">Annex H PDF · 6 months</span>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-[11px] text-white text-right">Live example</p>
    </div>
  );
};

const emptyCallPoint = (): CallPoint => ({ number: '', zone: '', location: '' });

const STEPS = ['Building', 'System', 'Weekly rhythm'];

const FireAlarmLogBooks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const haptic = useHaptic();
  const { books, statuses, entriesByBook, loading, createBook, refresh } = useFireAlarmLogBooks();
  const { user } = useAuth();
  const [quickPassId, setQuickPassId] = useState<string | null>(null);

  const quickPass = async (book: FireAlarmLogBook) => {
    const nextCp = nextCallPoint(book, entriesByBook[book.id] ?? []);
    if (!nextCp || !user?.id) return;
    setQuickPassId(book.id);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('fire_alarm_log_entries').insert({
        log_book_id: book.id,
        user_id: user.id,
        entry_type: 'weekly_test',
        entry_date: localIsoDate(),
        tester_name:
          (user.user_metadata?.full_name as string | undefined) ||
          (user.user_metadata?.name as string | undefined) ||
          '',
        data: {
          call_point: nextCp.number,
          zone: nextCp.zone,
          location: nextCp.location,
          result: 'Pass',
        },
      });
      if (error) throw error;
      haptic.success();
      toast.success(`${book.building_name} — CP ${nextCp.number} logged`);
      await refresh();
    } catch (e) {
      haptic.error();
      toast.error(e instanceof Error ? e.message : 'Could not log the test');
    } finally {
      setQuickPassId(null);
    }
  };

  const [createOpen, setCreateOpen] = useState(false);
  const [step, setStep] = useState(0);
  // ELE-1464 — land each wizard step at the top. The steps live inside the
  // sheet's own scroll container, so window.scrollTo would be a no-op here.
  const stepScrollRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => stepScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  // Step 1 — building
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [responsible, setResponsible] = useState('');
  // Step 2 — system
  const [category, setCategory] = useState('');
  const [panelId, setPanelId] = useState('');
  const [panelMake, setPanelMake] = useState('');
  const [panelLocation, setPanelLocation] = useState('');
  const [detectorCount, setDetectorCount] = useState('');
  const [arcConnected, setArcConnected] = useState(false);
  const [servicingOrg, setServicingOrg] = useState('');
  const [lastService, setLastService] = useState('');
  // Step 3 — rhythm
  const [testDay, setTestDay] = useState('monday');
  const [callPoints, setCallPoints] = useState<CallPoint[]>([emptyCallPoint()]);

  // Cert → log book funnel: arriving with prefill state opens the wizard filled in
  useEffect(() => {
    const prefill = (location.state as { prefill?: Record<string, string> } | null)?.prefill;
    if (!prefill) return;
    setName(prefill.building_name || '');
    setAddress(prefill.building_address || '');
    setCategory((prefill.system_category || '').toUpperCase());
    setPanelMake(prefill.panel_make || '');
    setPanelLocation(prefill.panel_location || '');
    setCreateOpen(true);
    window.history.replaceState({}, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = useMemo(() => {
    const total = books.length;
    const tested = books.filter((b) => statuses[b.id]?.testedThisWeek).length;
    const faults = books.reduce((n, b) => n + (statuses[b.id]?.openFaults ?? 0), 0);
    return { total, tested, faults };
  }, [books, statuses]);

  /**
   * True while any building still has no call points, so its weekly rotation
   * cannot start. Drives the explainer below the list — it earns its place only
   * while there is setup left to do, and gets out of the way once every
   * building is running.
   */
  const anyNeedsSetup = useMemo(
    () => books.some((b) => !nextCallPoint(b, entriesByBook[b.id] ?? [])),
    [books, entriesByBook]
  );

  // Still-to-test buildings lead the round; tested ones settle to the bottom.
  const orderedBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? books.filter(
          (b) =>
            b.building_name.toLowerCase().includes(q) ||
            b.building_address.toLowerCase().includes(q)
        )
      : books;
    return [...filtered].sort(
      (a, b) =>
        Number(statuses[a.id]?.testedThisWeek ?? false) -
          Number(statuses[b.id]?.testedThisWeek ?? false) ||
        a.building_name.localeCompare(b.building_name)
    );
  }, [books, statuses, search]);

  const resetForm = () => {
    setStep(0);
    setName('');
    setAddress('');
    setResponsible('');
    setCategory('');
    setPanelId('');
    setPanelMake('');
    setPanelLocation('');
    setDetectorCount('');
    setArcConnected(false);
    setServicingOrg('');
    setLastService('');
    setTestDay('monday');
    setCallPoints([emptyCallPoint()]);
  };

  const addCallPoint = () => {
    setCallPoints((prev) => {
      const lastNum = parseInt(prev[prev.length - 1]?.number ?? '');
      return [
        ...prev,
        { number: Number.isFinite(lastNum) ? String(lastNum + 1) : '', zone: '', location: '' },
      ];
    });
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Give the building a name');
      setStep(0);
      return;
    }
    setSaving(true);
    try {
      const created = await createBook({
        building_name: name.trim(),
        building_address: address.trim(),
        responsible_person: responsible.trim(),
        system_category: category,
        panel_make: panelMake.trim(),
        panel_location: panelLocation.trim(),
        detector_count: detectorCount ? parseInt(detectorCount) || null : null,
        arc_connected: arcConnected,
        servicing_org: servicingOrg.trim(),
        last_service_date: lastService || null,
        weekly_test_day: testDay,
        call_points: callPoints.filter((cp) => cp.number.trim()),
      } as Partial<FireAlarmLogBook> & { building_name: string });
      haptic.success();
      toast.success('Log book created');
      setCreateOpen(false);
      resetForm();
      navigate(`/electrician/inspection-testing/fire-alarm-log-books/${created.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not create log book');
    } finally {
      setSaving(false);
    }
  };

  const updateCallPoint = (i: number, field: keyof CallPoint, value: string) => {
    setCallPoints((prev) => prev.map((cp, idx) => (idx === i ? { ...cp, [field]: value } : cp)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Fire Alarm Log Books | Elec-Mate</title>
      </Helmet>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/[0.14]">
        <div className="px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <button
              type="button"
              onClick={() => navigate('/electrician/inspection-testing')}
              className="flex items-center justify-center h-11 w-11 rounded-xl text-white hover:bg-white/10 mr-3 touch-manipulation active:scale-[0.98]"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-[15px] font-semibold text-white tracking-tight flex-1">
              Fire Alarm Log Books
            </h1>
            <Button
              onClick={() => setCreateOpen(true)}
              className="h-11 px-4 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Building
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 pb-24 mx-auto max-w-5xl">
        {/* This week — only once there's a round to report on */}
        {(loading || books.length > 0) && (
          <div className="pt-8 pb-6 lg:flex lg:items-end lg:justify-between lg:gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                This week
              </p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em] tabular-nums">
                {loading
                  ? '…'
                  : `${summary.tested} of ${summary.total} building${summary.total === 1 ? '' : 's'} tested`}
                {!loading && summary.faults > 0 && (
                  <span className="text-orange-300">
                    {' '}
                    · {summary.faults} fault{summary.faults > 1 ? 's' : ''} open
                  </span>
                )}
              </h2>
              <p className="mt-2 text-[13px] text-white max-w-md leading-relaxed">
                BS 5839-1:2025 permits a digital log book as the system record. One building, one
                live log — weekly call point rotation, faults, services and the Annex H export,
                all kept for you.
              </p>
            </div>
            {/* Only shown once it can say something. "1 building · 0 tested ·
                0 faults" is three zeros in a box: it takes up the top-right of
                the screen to report that nothing has happened yet, which the
                headline already says. */}
            {!loading && (summary.total > 1 || summary.tested > 0 || summary.faults > 0) && (
              <div className="hidden lg:flex items-stretch divide-x divide-white/[0.08] rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.14] shrink-0">
                {(
                  [
                    [String(summary.total), summary.total === 1 ? 'Building' : 'Buildings'],
                    [String(summary.tested), 'Tested this week'],
                    [String(summary.faults), 'Open faults'],
                  ] as [string, string][]
                ).map(([value, label]) => (
                  <div key={label} className="px-6 py-4 text-center">
                    <p
                      className={cn(
                        'text-[22px] font-bold tabular-nums leading-none',
                        label === 'Open faults' && summary.faults > 0
                          ? 'text-orange-300'
                          : 'text-white'
                      )}
                    >
                      {value}
                    </p>
                    <p className="mt-1.5 text-[11px] text-white">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Buildings */}
        {loading ? (
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.14] h-40 animate-pulse" />
        ) : books.length === 0 ? (
          <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-[1fr_420px] lg:grid-rows-[auto_1fr] gap-8 lg:gap-12 items-start">
            {/* Pitch */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                BS 5839-1:2025 · Clause 48
              </p>
              <h2 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.04]">
                The log book,
                <br />
                off the wall
              </h2>
              <p className="mt-3 text-[13.5px] text-white max-w-md leading-relaxed">
                The 2025 edition lets the dog-eared book by the panel go digital. One live log per
                building — and the parts everyone gets wrong, the app does for you.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <Button
                  onClick={() => setCreateOpen(true)}
                  className="h-12 px-6 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                >
                  Set up your first building
                </Button>
                <p className="text-[11.5px] text-white">
                  Under a minute — only the name is required.
                </p>
              </div>
            </div>

            {/* Example of a live log — second thing you see on mobile, sticky on desktop */}
            <ExampleLog className="lg:col-start-2 lg:row-start-1 lg:row-span-2" />

            <div className="lg:col-start-1 lg:row-start-2">
              <div className="space-y-0 max-w-md divide-y divide-white/[0.06] border-y border-white/[0.14]">
                {[
                  {
                    n: '01',
                    title: 'The rotation runs itself',
                    body: 'A different call point every week, suggested automatically. On test day it says which one — you tap once to log the pass.',
                  },
                  {
                    n: '02',
                    title: 'Compliance, computed',
                    body: 'False alarm rate per 100 detectors with the Annex F investigation trigger, 12-month call point coverage, and the 5-7 month service window — all worked out live.',
                  },
                  {
                    n: '03',
                    title: 'Annex H export in one tap',
                    body: 'The full record laid out on the model log book, ready for the client, risk assessor or fire authority.',
                  },
                ].map((f) => (
                  <div key={f.n} className="flex gap-4 py-4">
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80 pt-1 tabular-nums">
                      {f.n}
                    </span>
                    <div>
                      <p className="text-[14.5px] font-semibold text-white tracking-tight">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-white leading-relaxed">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-md text-[11px] text-white leading-relaxed">
                BS 5839-1:2025 Clause 48.2 recognises a digital log book as the system record —
                the export follows the Annex H model, so risk assessors and the fire authority see
                the format they already know.
              </p>
            </div>
          </div>
        ) : (
          <>
          {books.length > 8 && (
            <Input
              className={cn(inputCn, 'mb-3 lg:max-w-sm')}
              placeholder="Search buildings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4"
          >
            {orderedBooks.length === 0 && (
              <p className="col-span-full px-5 py-8 text-center text-[13px] text-white">
                No buildings match "{search}".
              </p>
            )}
            {orderedBooks.map((book) => (
              <motion.div key={book.id} variants={itemVariants} className="h-full">
                <BuildingRow
                  book={book}
                  status={statuses[book.id]}
                  nextCp={nextCallPoint(book, entriesByBook[book.id] ?? [])}
                  onOpen={() =>
                    navigate(`/electrician/inspection-testing/fire-alarm-log-books/${book.id}`)
                  }
                  onQuickPass={() => quickPass(book)}
                  quickPassBusy={quickPassId === book.id}
                />
              </motion.div>
            ))}
          </motion.div>
          </>
        )}

        {books.length > 0 && (
          <div className="mt-4 flex items-center gap-2 px-1">
            <TestStrip
              record={[true, true, true, true, true, true, true, true]}
              className="opacity-60 [&>span]:h-1.5 [&>span]:w-1.5"
            />
            <span className="text-[11px] text-white">
              Last 8 weeks — filled squares are weeks with a logged test
            </span>
          </div>
        )}

        {/* Shown only while a building is still waiting on its call points.
            With one unfinished building the page otherwise ended after a single
            card and left two thirds of the screen empty — which reads as a
            product with nothing in it rather than one waiting on five minutes
            of setup. This is not filler: it shows exactly what finishing buys,
            and disappears the moment every building has its rotation. */}
        {!loading && books.length > 0 && anyNeedsSetup && (
          <section className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                Once the call points are in
              </p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em] leading-[1.1]">
                The weekly round
                <br />
                becomes one tap
              </h2>
              <p className="mt-3 text-[13.5px] text-white max-w-md leading-relaxed">
                Add the call points once and the rotation runs itself — the app names the one
                due this week, you log the pass on the spot, and the Annex H record builds as
                you go.
              </p>
              <div className="mt-6 space-y-0 max-w-md divide-y divide-white/[0.06] border-y border-white/[0.14]">
                {[
                  {
                    n: '01',
                    title: 'A different call point each week',
                    body: 'BS 5839-1 wants the rotation spread across every point. The app tracks where you are in it, so nobody has to keep count.',
                  },
                  {
                    n: '02',
                    title: 'The compliance maths, done',
                    body: 'False alarm rate per 100 detectors against the Annex F investigation trigger, and the service window, worked out live.',
                  },
                  {
                    n: '03',
                    title: 'Annex H export when asked',
                    body: 'The full record laid out on the model log book — branded, saved, and emailable to the responsible person.',
                  },
                ].map((f) => (
                  <div key={f.n} className="flex gap-4 py-4">
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80 pt-1 tabular-nums">
                      {f.n}
                    </span>
                    <div>
                      <p className="text-[14.5px] font-semibold text-white tracking-tight">
                        {f.title}
                      </p>
                      <p className="mt-1 text-[13px] text-white leading-relaxed">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ExampleLog />
          </section>
        )}
      </main>

      {/* Create wizard */}
      <Sheet
        open={createOpen}
        onOpenChange={(o) => {
          setCreateOpen(o);
          if (!o) resetForm();
        }}
      >
        <SheetContent
          side="bottom"
          className="max-h-[90vh] p-0 rounded-t-2xl overflow-hidden flex flex-col"
        >
          <div className="flex flex-col min-h-0 bg-background">
            <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.14]">
              <div className="max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                    New log book · Step {step + 1} of {STEPS.length}
                  </p>
                  <div className="flex gap-1.5">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          'h-1.5 rounded-full transition-all',
                          i === step ? 'w-6 bg-elec-yellow' : 'w-1.5 bg-white/[0.15]'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight">
                  {STEPS[step]}
                </h3>
              </div>
            </div>

            <div ref={stepScrollRef} className="overflow-y-auto overscroll-contain min-h-0 px-5 py-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                  className="max-w-5xl mx-auto w-full space-y-5"
                >
                {step === 0 && (
                  <>
                    <Field label="Building name" hint="The only thing you have to fill in now — everything else can wait.">
                      <Input
                        className={inputCn}
                        placeholder="e.g. Harbour House"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                      />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Field label="Address">
                        <Input
                          className={inputCn}
                          placeholder="Street, town, postcode"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Field>
                      <Field
                        label="Responsible person"
                        hint="Named on the Annex H front sheet — keeps the log at the premises."
                      >
                        <Input
                          className={inputCn}
                          placeholder="Name"
                          value={responsible}
                          onChange={(e) => setResponsible(e.target.value)}
                        />
                      </Field>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div>
                      <p className="text-[11.5px] font-medium text-white mb-1.5">
                        System category
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SYSTEM_CATEGORIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => setCategory(category === c.code ? '' : c.code)}
                            className={cn(
                              'flex flex-col items-start gap-1 px-3.5 py-3 rounded-xl text-left touch-manipulation transition-colors border min-h-[44px]',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                              category === c.code
                                ? 'bg-elec-yellow/10 border-elec-yellow/50'
                                : 'bg-gradient-to-b from-white/[0.08] to-white/[0.04] border-white/[0.14] hover:bg-white/[0.1]'
                            )}
                          >
                            <span
                              className={cn(
                                'text-[14px] font-bold tabular-nums',
                                category === c.code ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              {c.code}
                            </span>
                            <span className="text-[11.5px] text-white leading-snug">
                              {c.scope}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80 border-t border-white/[0.14] pt-4">
                      Panel &amp; detection
                    </p>
                    <Field
                      label="Control panel"
                      hint="Search the panel database — or type make and model below if it's not listed."
                    >
                      <FireAlarmPanelAutocomplete
                        value={panelId}
                        onValueChange={setPanelId}
                        onPanelSelect={(panel) => {
                          if (panel) setPanelMake(`${panel.manufacturer} ${panel.model}`);
                        }}
                        placeholder="Search panels (Kentec, C-TEC, Advanced…)"
                        showAutoFillBadge={false}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Make / model">
                        <Input
                          className={inputCn}
                          placeholder="e.g. Kentec Syncro"
                          value={panelMake}
                          onChange={(e) => setPanelMake(e.target.value)}
                        />
                      </Field>
                      <Field label="Panel location">
                        <Input
                          className={inputCn}
                          placeholder="e.g. Main entrance"
                          value={panelLocation}
                          onChange={(e) => setPanelLocation(e.target.value)}
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 sm:items-start">
                      <Field
                        label="Automatic detectors on system"
                        hint="Powers the automatic Annex F false alarm rate check (investigation over 4 per 100 detectors a year)."
                      >
                        <Input
                          type="number"
                          inputMode="numeric"
                          className={inputCn}
                          placeholder="e.g. 24"
                          value={detectorCount}
                          onChange={(e) => setDetectorCount(e.target.value)}
                        />
                      </Field>
                      <div className="sm:mt-[22px] flex items-center gap-4 px-4 h-12 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14]">
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-white truncate">
                            Alarm receiving centre
                          </p>
                          <p className="text-[10.5px] text-white truncate">
                            Signals go to an ARC / fire service
                          </p>
                        </div>
                        <Switch checked={arcConnected} onCheckedChange={setArcConnected} />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80 border-t border-white/[0.14] pt-4">
                      Servicing
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Servicing organisation">
                        <Input
                          className={inputCn}
                          placeholder="Who maintains it"
                          value={servicingOrg}
                          onChange={(e) => setServicingOrg(e.target.value)}
                        />
                      </Field>
                      <Field label="Last service visit" hint="Sets the six-monthly reminder clock.">
                        <Input
                          type="date"
                          className={cn(inputCn, '[color-scheme:dark]')}
                          value={lastService}
                          onChange={(e) => setLastService(e.target.value)}
                        />
                      </Field>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <p className="text-[11.5px] font-medium text-white mb-1.5">
                        Weekly test day
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {WEEKDAYS.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setTestDay(d)}
                            className={cn(
                              'h-11 px-4 rounded-lg text-[13px] font-medium capitalize touch-manipulation transition-colors',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                              testDay === d
                                ? 'bg-elec-yellow text-black'
                                : 'bg-gradient-to-b from-white/[0.08] to-white/[0.04] text-white border border-white/[0.16] hover:bg-white/[0.12]'
                            )}
                          >
                            {d.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                      <p className="mt-1.5 text-[11px] text-white">
                        Test at roughly the same time each week, during normal working hours.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[11.5px] font-medium text-white">
                          Manual call points, in rotation order
                        </p>
                        <button
                          type="button"
                          onClick={addCallPoint}
                          className="text-[12px] font-medium text-elec-yellow touch-manipulation min-h-[44px] px-2"
                        >
                          + Add call point
                        </button>
                      </div>
                      <div className="space-y-2">
                        {callPoints.map((cp, i) => (
                          <div key={i} className="grid grid-cols-[64px_1fr_1.4fr] gap-2">
                            <Input
                              inputMode="numeric"
                              className={inputCn}
                              placeholder="No."
                              value={cp.number}
                              onChange={(e) => updateCallPoint(i, 'number', e.target.value)}
                            />
                            <Input
                              className={inputCn}
                              placeholder="Zone"
                              value={cp.zone}
                              onChange={(e) => updateCallPoint(i, 'zone', e.target.value)}
                            />
                            <Input
                              className={inputCn}
                              placeholder="Location (e.g. Stairwell B)"
                              value={cp.location}
                              onChange={(e) => updateCallPoint(i, 'location', e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-white leading-relaxed">
                        A different call point is tested each week so every one is covered inside 12
                        months. Numbers auto-increment as you add — the app tracks whose turn it is.
                      </p>
                    </div>
                  </>
                )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="shrink-0 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-white/[0.14] bg-background">
              <div className="max-w-5xl mx-auto w-full flex gap-2.5">
                {step > 0 && (
                  <Button
                    onClick={() => {
                      setStep((s) => s - 1);
                      scrollToTop();
                    }}
                    variant="outline"
                    className="h-12 px-5 rounded-xl border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] text-white hover:bg-white/[0.1] touch-manipulation"
                  >
                    Back
                  </Button>
                )}
                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={() => {
                      if (step === 0 && !name.trim()) {
                        toast.error('Give the building a name');
                        return;
                      }
                      setStep((s) => s + 1);
                      scrollToTop();
                    }}
                    className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleCreate}
                    disabled={saving}
                    className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                  >
                    {saving ? 'Creating…' : 'Create log book'}
                  </Button>
                )}
              </div>
              {step > 0 && (
                <p className="max-w-5xl mx-auto w-full mt-2 text-center text-[11px] text-white">
                  Everything here is optional — you can fill it in later under Manage.
                </p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FireAlarmLogBooks;
