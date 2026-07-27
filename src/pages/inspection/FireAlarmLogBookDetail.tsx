/**
 * Fire Alarm Log Book — building ledger (ELE-1396).
 *
 * The weekly test is the hero: "This week — CP 7, Zone 2, Stairwell B" with a
 * one-tap Record pass. Below it, one chronological ledger stream with filter
 * chips instead of seven separate tables. Call points, reminders and export
 * live in bottom sheets so the page stays the object you use at the panel.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptic } from '@/hooks/useHaptic';
import { supabase } from '@/integrations/supabase/client';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import FireLogSelect from '@/components/inspection/fire-alarm/FireLogSelect';
import {
  useFireAlarmLogBook,
  nextCallPoint,
  computeStatus,
  localIsoDate,
  ENTRY_TYPE_LABELS,
  FALSE_ALARM_CATEGORIES,
  type CallPoint,
  type FireAlarmLogEntry,
  type LogEntryType,
} from '@/hooks/useFireAlarmLogBook';
import { exportFireAlarmLogBookPdf } from '@/utils/fireAlarmLogBookPdf';
import { TestStrip } from './FireAlarmLogBooks';

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.08] border-white/[0.16] text-white placeholder:text-white/45 focus:border-yellow-500 focus:ring-yellow-500';
const textareaCn =
  'touch-manipulation text-base min-h-[90px] bg-white/[0.08] border-white/[0.16] text-white placeholder:text-white/45 focus:border-yellow-500 focus:ring-2 focus:ring-elec-yellow/20';

const FILTERS: { key: string; label: string; types: LogEntryType[] | null }[] = [
  { key: 'all', label: 'All', types: null },
  { key: 'tests', label: 'Tests', types: ['weekly_test', 'monthly_check'] },
  { key: 'faults', label: 'Faults', types: ['fault'] },
  { key: 'alarms', label: 'Alarms & drills', types: ['false_alarm', 'fire_event', 'drill'] },
  { key: 'service', label: 'Service', types: ['service', 'battery'] },
  { key: 'panel', label: 'Panel', types: ['panel_event'] },
  { key: 'variations', label: 'Variations', types: ['variation'] },
];

/** Device vocabulary shared with the cert forms (FAZonesDevices detector list + field devices). */
const DEVICE_TYPES = [
  'Manual call point',
  'Optical smoke detector',
  'Ionisation smoke detector',
  'Heat detector (fixed)',
  'Heat detector (rate of rise)',
  'Multi-sensor detector',
  'Beam detector',
  'Aspirating detector',
  'Flame detector',
  'CO detector',
  'Duct detector',
  'Sounder',
  'Beacon / VAD',
  'Interface unit',
  'Control panel',
];

const FALSE_ALARM_CAUSES = [
  'Cooking fumes',
  'Dust / construction work',
  'Contractor work',
  'Steam / humidity',
  'Detector contamination',
  'System fault',
  'Malicious activation',
  'Accidental damage',
  'Unknown',
];

const BATTERY_TYPES = [
  'Sealed lead-acid (VRLA)',
  'Nickel-cadmium (NiCd)',
  'Nickel-metal hydride (NiMH)',
  'Lithium',
  'Alkaline',
];

/** Ordered field definitions per entry type — drives the add-entry form. */
const ENTRY_FIELDS: Record<
  LogEntryType,
  {
    key: string;
    label: string;
    long?: boolean;
    date?: boolean;
    choices?: string[];
    options?: string[];
  }[]
> = {
  weekly_test: [
    { key: 'call_point', label: 'Call point number' },
    { key: 'zone', label: 'Zone' },
    { key: 'location', label: 'Location' },
    { key: 'result', label: 'Result', choices: ['Pass', 'Fail', 'No response'] },
  ],
  fault: [
    { key: 'description', label: 'Fault description', long: true },
    { key: 'device', label: 'Device affected', options: DEVICE_TYPES },
    { key: 'zone', label: 'Zone' },
    { key: 'cause', label: 'Cause (if known)' },
    { key: 'remedial_action', label: 'Remedial action', long: true },
  ],
  false_alarm: [
    { key: 'zone', label: 'Zone / device' },
    { key: 'category', label: 'Category', choices: FALSE_ALARM_CATEGORIES },
    { key: 'cause', label: 'Cause', options: FALSE_ALARM_CAUSES },
    { key: 'action', label: 'Action taken / investigation', long: true },
  ],
  fire_event: [
    { key: 'zone', label: 'Zone / area of origin' },
    { key: 'description', label: 'What happened', long: true },
    { key: 'action', label: 'Action taken (evacuation, brigade attendance…)', long: true },
  ],
  drill: [
    { key: 'description', label: 'Drill details (areas, duration…)', long: true },
    { key: 'outcome', label: 'Outcome / lessons', long: true },
  ],
  monthly_check: [
    { key: 'checks', label: 'Checks carried out (panel, indicators, standby supply…)', long: true },
    { key: 'defects', label: 'Defects found (if any)' },
  ],
  service: [
    { key: 'contractor', label: 'Contractor / engineer' },
    { key: 'scope', label: 'Scope of work', long: true },
    { key: 'outcome', label: 'Outcome' },
    { key: 'next_due', label: 'Next service due', date: true },
  ],
  battery: [
    { key: 'battery_type', label: 'Battery type', options: BATTERY_TYPES },
    { key: 'location', label: 'Location (panel, device…)' },
  ],
  panel_event: [
    { key: 'description', label: 'Event description', long: true },
    { key: 'action', label: 'Action taken' },
  ],
  variation: [
    { key: 'description', label: 'Variation description', long: true },
    { key: 'authorised_by', label: 'Authorised by' },
  ],
};

function entrySummary(e: FireAlarmLogEntry): string {
  switch (e.entry_type) {
    case 'weekly_test':
      return [
        e.data.call_point ? `CP ${e.data.call_point}` : null,
        [e.data.zone, e.data.location].filter(Boolean).join(', ') || null,
        e.data.result || null,
      ]
        .filter(Boolean)
        .join(' — ');
    case 'fault':
      return [e.data.description, e.data.device, e.data.zone && `Zone ${e.data.zone}`]
        .filter(Boolean)
        .join(' — ');
    case 'service':
      return [e.data.contractor, e.data.scope].filter(Boolean).join(' — ');
    case 'battery':
      return [e.data.battery_type, e.data.location].filter(Boolean).join(' — ');
    case 'false_alarm':
      return [e.data.zone, e.data.category, e.data.cause].filter(Boolean).join(' — ');
    case 'fire_event':
      return [e.data.zone, e.data.description].filter(Boolean).join(' — ');
    case 'drill':
      return e.data.description || '';
    case 'monthly_check':
      return [e.data.checks, e.data.defects && `Defects: ${e.data.defects}`]
        .filter(Boolean)
        .join(' — ');
    default:
      return e.data.description || '';
  }
}

const today = () => localIsoDate();

const FireAlarmLogBookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { book, entries, loading, updateBook, addEntry, resolveFault, deleteEntry, archiveBook } =
    useFireAlarmLogBook(id);
  const haptic = useHaptic();

  const defaultTester =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    '';

  const [filter, setFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState<LogEntryType | null>(null);
  const [addDate, setAddDate] = useState(today());
  const [addTester, setAddTester] = useState(defaultTester);
  const [addData, setAddData] = useState<Record<string, string>>({});
  const [addPhoto, setAddPhoto] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handlePhotoPick = async (file: File | undefined) => {
    if (!file) return;
    try {
      const compressed = await compressImageForUpload(file, 220);
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = () => reject(new Error('Could not read photo'));
        r.readAsDataURL(compressed);
      });
      setAddPhoto(dataUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Photo failed');
    }
  };
  const [exportOpen, setExportOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [viewEntry, setViewEntry] = useState<FireAlarmLogEntry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [delivery, setDelivery] = useState<'download' | 'email'>('download');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sendingExport, setSendingExport] = useState(false);

  // Prefill the export recipient once the book loads
  useEffect(() => {
    if (book?.responsible_email && !recipientEmail) setRecipientEmail(book.responsible_email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book?.responsible_email]);

  const status = useMemo(() => (book ? computeStatus(book, entries) : null), [book, entries]);
  const nextCp = useMemo(() => (book ? nextCallPoint(book, entries) : null), [book, entries]);
  const openFaults = entries.filter((e) => e.entry_type === 'fault' && e.resolved !== true);

  const visibleEntries = useMemo(() => {
    const spec = FILTERS.find((f) => f.key === filter);
    if (!spec?.types) return entries;
    return entries.filter((e) => spec.types!.includes(e.entry_type));
  }, [entries, filter]);

  const recordPass = async () => {
    if (!nextCp) return;
    try {
      await addEntry({
        entry_type: 'weekly_test',
        entry_date: today(),
        tester_name: defaultTester,
        data: {
          call_point: nextCp.number,
          zone: nextCp.zone,
          location: nextCp.location,
          result: 'Pass',
        },
      });
      haptic.success();
      toast.success(`Call point ${nextCp.number} logged — pass`);
    } catch (e) {
      haptic.error();
      toast.error(e instanceof Error ? e.message : 'Could not log the test');
    }
  };

  const openAdd = (type: LogEntryType, prefill: Record<string, string> = {}) => {
    setAddType(type);
    setAddDate(today());
    setAddTester(defaultTester);
    setAddData(prefill);
    setAddPhoto('');
    setAddOpen(true);
  };

  const saveEntry = async () => {
    if (!addType) return;
    setSaving(true);
    try {
      await addEntry({
        entry_type: addType,
        entry_date: addDate,
        tester_name: addTester,
        data: addPhoto ? { ...addData, photo: addPhoto } : addData,
        ...(addType === 'fault' ? { resolved: false } : {}),
      });
      haptic.success();
      toast.success(`${ENTRY_TYPE_LABELS[addType]} logged`);
      setAddOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save entry');
    } finally {
      setSaving(false);
    }
  };

  const runExport = async (months: number | null, periodLabel: string) => {
    if (!book) return;
    const from = months
      ? localIsoDate(new Date(new Date().setMonth(new Date().getMonth() - months)))
      : undefined;
    try {
      if (delivery === 'email') {
        const to = recipientEmail.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
          toast.error('Enter a valid email address first');
          return;
        }
        setSendingExport(true);
        const pdfBase64 = (await exportFireAlarmLogBookPdf({
          book,
          entries,
          from,
          output: 'base64',
        })) as string;
        const { data: fn, error } = await supabase.functions.invoke('send-certificate-resend', {
          body: {
            fireLogMode: true,
            recipientEmail: to,
            buildingName: book.building_name,
            periodLabel,
            pdfBase64,
          },
        });
        if (error) throw new Error(error.message);
        if (!fn?.success) throw new Error(fn?.error || 'Send failed');
        if (book.responsible_email !== to) {
          updateBook({ responsible_email: to }).catch(() => {});
        }
        toast.success(`Log book emailed to ${to}`);
      } else {
        await exportFireAlarmLogBookPdf({ book, entries, from });
        toast.success('Annex H log exported');
      }
      setExportOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Export failed');
    } finally {
      setSendingExport(false);
    }
  };

  if (!loading && !book) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white/80 text-sm">Log book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>{book ? `${book.building_name} — Fire Alarm Log` : 'Fire Alarm Log'} | Elec-Mate</title>
      </Helmet>

      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16 gap-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/inspection-testing/fire-alarm-log-books')}
              className="flex items-center justify-center h-11 w-11 rounded-xl text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="flex-1 text-[15px] font-semibold text-white tracking-tight truncate">
              Log book
            </h1>
            <button
              type="button"
              onClick={() => setManageOpen(true)}
              className="h-11 px-3 rounded-xl text-[13px] font-medium text-white/80 hover:bg-white/10 touch-manipulation"
            >
              Manage
            </button>
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              disabled={entries.length === 0}
              className={cn(
                'h-11 px-3.5 rounded-xl text-[13px] font-semibold touch-manipulation',
                entries.length === 0
                  ? 'text-white/30'
                  : 'text-elec-yellow hover:bg-elec-yellow/10'
              )}
            >
              Export
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 pb-24 max-w-3xl mx-auto lg:max-w-5xl">
        {/* Building hero */}
        {book && (
          <div className="pt-7 sm:pt-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
              Fire alarm log book
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em] leading-[1.08]">
              {book.building_name}
            </h2>
            {book.building_address && (
              <p className="mt-1 text-[13px] text-white/75">{book.building_address}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              {book.system_category && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white border border-white/[0.15] rounded px-2 py-1">
                  Category {book.system_category}
                </span>
              )}
              {(() => {
                const facts = [
                  book.panel_make,
                  book.panel_location && `panel at ${book.panel_location}`,
                  book.detector_count != null && `${book.detector_count} detectors`,
                  book.weekly_test_day &&
                    `tests ${book.weekly_test_day[0].toUpperCase() + book.weekly_test_day.slice(1)}s`,
                ].filter(Boolean);
                return facts.length ? (
                  <span className="text-[11.5px] text-white/70 tabular-nums">
                    {facts.join(' · ')}
                  </span>
                ) : null;
              })()}
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-6 lg:items-start">
          {/* Left column: this week + status */}
          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:pb-4">
            {/* This week's test */}
            <div className="mt-5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden">
              <div className="px-5 pt-5 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                  This week
                </p>
                {status?.testedThisWeek ? (
                  <>
                    <h2 className="mt-1.5 text-[19px] font-semibold text-white tracking-tight">
                      Tested — all done
                    </h2>
                    <p className="mt-1 text-[12.5px] text-white/75">
                      Next rotation: CP {nextCp?.number ?? '—'}
                      {nextCp?.location ? ` — ${nextCp.location}` : ''}
                    </p>
                  </>
                ) : nextCp ? (
                  <>
                    <h2 className="mt-1.5 text-[19px] font-semibold text-white tracking-tight">
                      Test call point {nextCp.number}
                    </h2>
                    <p className="mt-1 text-[13px] text-white/80">
                      {[nextCp.zone && `Zone ${nextCp.zone}`, nextCp.location]
                        .filter(Boolean)
                        .join(' · ') || 'No zone details recorded'}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="mt-1.5 text-[19px] font-semibold text-white tracking-tight">
                      No call points yet
                    </h2>
                    <p className="mt-1 text-[12.5px] text-white/75">
                      Add the building's call points to start the weekly rotation.
                    </p>
                  </>
                )}
              </div>
              {status && !status.testedThisWeek && nextCp && (
                <div className="px-5 pb-5 flex gap-2.5">
                  <Button
                    onClick={recordPass}
                    className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                  >
                    Record pass
                  </Button>
                  <Button
                    onClick={() =>
                      openAdd('weekly_test', {
                        call_point: nextCp.number,
                        zone: nextCp.zone,
                        location: nextCp.location,
                      })
                    }
                    variant="outline"
                    className="h-12 px-4 rounded-xl border-white/[0.15] bg-white/[0.05] text-white hover:bg-white/[0.1] touch-manipulation"
                  >
                    Record issue…
                  </Button>
                </div>
              )}
              {status && !nextCp && (
                <div className="px-5 pb-5">
                  <Button
                    onClick={() => setManageOpen(true)}
                    className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                  >
                    Add call points
                  </Button>
                </div>
              )}
            </div>

            {/* Status — one card, hairline rows */}
            {status && (
              <div className="mt-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
                <div className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      Test record
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/80 tabular-nums truncate">
                      {status.lastWeeklyTest
                        ? `Last test ${format(new Date(status.lastWeeklyTest + 'T00:00:00'), 'EEE d MMM')}`
                        : 'First test starts the record'}
                    </p>
                  </div>
                  <TestStrip record={status.weeklyRecord} className="shrink-0" />
                </div>
                {status.serviceDue && (
                  <div className="px-5 py-3.5 flex items-baseline justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      Service
                    </p>
                    <p
                      className={cn(
                        'text-[12.5px] font-medium tabular-nums',
                        status.serviceOverdue ? 'text-orange-300' : 'text-white'
                      )}
                    >
                      {status.serviceOverdue ? 'Overdue since ' : 'Due '}
                      {format(new Date(status.serviceDue + 'T00:00:00'), 'd MMM yyyy')}
                    </p>
                  </div>
                )}
                {status.falseAlarmRate !== null && (
                  <div className="px-5 py-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                        False alarm rate
                      </p>
                      <p
                        className={cn(
                          'text-[14px] font-bold tabular-nums',
                          status.falseAlarmInvestigationDue ? 'text-orange-300' : 'text-white'
                        )}
                      >
                        {status.falseAlarmRate}
                        <span className="text-[10.5px] font-medium text-white/70">
                          {' '}
                          / 100 detectors / yr
                        </span>
                      </p>
                    </div>
                    {status.falseAlarmInvestigationDue && (
                      <p className="mt-0.5 text-[11px] leading-relaxed text-orange-300/90">
                        Over the Annex F trigger of 4 — arrange a preliminary investigation.
                      </p>
                    )}
                  </div>
                )}
                {(book?.call_points?.length ?? 0) > 0 && (
                  <div className="px-5 py-3.5 flex items-baseline justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      Rotation coverage
                    </p>
                    <p className="text-[14px] font-bold tabular-nums text-white">
                      {status.callPointsCovered12mo}
                      <span className="text-[10.5px] font-medium text-white/70">
                        {' '}
                        of {book!.call_points.length} in 12 mo
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Open faults */}
            {openFaults.length > 0 && (
              <div className="mt-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-orange-500/30 overflow-hidden">
                <div className="px-5 pt-4 pb-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-300">
                    Open faults ({openFaults.length})
                  </p>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {openFaults.map((f) => (
                    <div key={f.id} className="px-5 py-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] text-white truncate">
                          {f.data.description || 'Fault'}
                        </p>
                        <p className="text-[11.5px] text-white/70 tabular-nums">
                          {format(new Date(f.entry_date + 'T00:00:00'), 'd MMM yyyy')}
                          {f.data.zone ? ` · ${f.data.zone}` : ''}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={f.pending}
                        onClick={async () => {
                          await resolveFault(f.id, today());
                          haptic.light();
                          toast.success('Fault marked resolved');
                        }}
                        className={cn(
                          'shrink-0 h-10 px-3 rounded-lg text-[12px] font-semibold touch-manipulation',
                          f.pending
                            ? 'text-white/30'
                            : 'text-elec-yellow hover:bg-elec-yellow/10'
                        )}
                      >
                        {f.pending ? 'Syncing…' : 'Resolve'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: the ledger — one card, level with the left column */}
          <div className="mt-5">
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden">
              <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <h3 className="text-[15px] font-semibold text-white tracking-tight">Log</h3>
                  {entries.length > 0 && (
                    <span className="text-[11.5px] text-white/70 tabular-nums">
                      {entries.length} entr{entries.length === 1 ? 'y' : 'ies'}
                      {entries.some((e) => e.pending) &&
                        ` · ${entries.filter((e) => e.pending).length} syncing when back online`}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => {
                    setAddType(null);
                    setAddOpen(true);
                  }}
                  className="h-10 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-[13px] font-medium hover:bg-white/[0.1] touch-manipulation shrink-0"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Log entry
                </Button>
              </div>

              {/* Filter chips — only once there's something to filter */}
              {entries.length > 0 && (
                <div
                  className="flex gap-1.5 overflow-x-auto overscroll-x-contain px-4 sm:px-5 py-2.5 border-b border-white/[0.06]"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFilter(f.key)}
                      className={cn(
                        'h-11 px-3 rounded-lg text-[12.5px] font-medium whitespace-nowrap touch-manipulation transition-colors',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                        filter === f.key
                          ? 'bg-white/[0.1] text-white border border-white/[0.2]'
                          : 'text-white/75 border border-transparent hover:text-white'
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}

              <div>
              {loading ? (
                <div className="h-40 animate-pulse" />
              ) : entries.length === 0 ? (
                <div className="px-5 sm:px-6 py-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                    How this log works
                  </p>
                  <div className="mt-3 space-y-0 divide-y divide-white/[0.06]">
                    {[
                      {
                        n: '01',
                        title: 'Add the call points',
                        body: 'List them once in Manage — the weekly rotation starts from there and the app tracks whose turn it is.',
                      },
                      {
                        n: '02',
                        title: 'One tap a week',
                        body: 'On test day the panel above names the call point. Record pass and the entry is written, timestamped and kept.',
                      },
                      {
                        n: '03',
                        title: 'Everything else, as it happens',
                        body: 'Faults, false alarms, services, drills — log them from the button above. The Annex H PDF is ready whenever anyone asks.',
                      },
                    ].map((f) => (
                      <div key={f.n} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80 pt-0.5 tabular-nums">
                          {f.n}
                        </span>
                        <div>
                          <p className="text-[13.5px] font-semibold text-white tracking-tight">
                            {f.title}
                          </p>
                          <p className="mt-0.5 text-[12px] text-white/75 leading-relaxed">
                            {f.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : visibleEntries.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[13.5px] text-white/80">
                    No {FILTERS.find((f) => f.key === filter)?.label.toLowerCase()} logged.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {visibleEntries.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => {
                        setViewEntry(e);
                        setConfirmDelete(false);
                      }}
                      className="w-full text-left px-5 py-3.5 flex items-baseline gap-4 hover:bg-white/[0.03] transition-colors touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50">
                      <span className="shrink-0 w-[74px] text-[11.5px] text-white/70 tabular-nums">
                        {format(new Date(e.entry_date + 'T00:00:00'), 'd MMM yy')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70 border border-white/[0.12] rounded px-1.5 py-0.5">
                            {ENTRY_TYPE_LABELS[e.entry_type]}
                          </span>
                          {e.entry_type === 'fault' && e.resolved !== true && (
                            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-orange-300">
                              Open
                            </span>
                          )}
                          {e.pending && (
                            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-elec-yellow/80">
                              Waiting to sync
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[13.5px] text-white leading-snug">
                          {entrySummary(e) || '—'}
                        </p>
                        {e.tester_name && (
                          <p className="mt-0.5 text-[11.5px] text-white/70">{e.tester_name}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add entry sheet */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] p-0 rounded-t-2xl overflow-hidden flex flex-col"
        >
          <div className="flex flex-col min-h-0 bg-[#0a0a0a]">
            <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.06]">
              <div className="max-w-2xl mx-auto w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                  {book?.building_name}
                </p>
                <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight">
                  {addType ? ENTRY_TYPE_LABELS[addType] : 'Log an entry'}
                </h3>
              </div>
            </div>

            <div className="overflow-y-auto overscroll-contain min-h-0 px-5 py-5">
              <div className="max-w-2xl mx-auto w-full">
              {!addType ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(ENTRY_TYPE_LABELS) as LogEntryType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => openAdd(t)}
                      className="w-full flex items-center justify-between px-4 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] text-left hover:bg-white/[0.08] touch-manipulation"
                    >
                      <span className="text-[14.5px] font-medium text-white">
                        {ENTRY_TYPE_LABELS[t]}
                      </span>
                      <span className="text-elec-yellow text-[13px]">{'→'}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] font-medium text-white/75 mb-1.5">Date</p>
                      <Input
                        type="date"
                        className={cn(inputCn, '[color-scheme:dark]')}
                        value={addDate}
                        onChange={(e) => setAddDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-white/75 mb-1.5">Recorded by</p>
                      <Input
                        className={inputCn}
                        placeholder="Name"
                        value={addTester}
                        onChange={(e) => setAddTester(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-white/75 mb-1.5">
                      Photo (optional)
                    </p>
                    {addPhoto ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={addPhoto}
                          alt="Attached"
                          className="h-16 w-16 rounded-lg object-cover border border-white/[0.12]"
                        />
                        <button
                          type="button"
                          onClick={() => setAddPhoto('')}
                          className="h-11 px-3 rounded-lg text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/[0.08] touch-manipulation"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center h-12 rounded-xl bg-white/[0.04] border border-dashed border-white/[0.15] text-[13px] text-white/80 touch-manipulation cursor-pointer hover:bg-white/[0.07]">
                        Take or choose a photo
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => handlePhotoPick(e.target.files?.[0])}
                        />
                      </label>
                    )}
                  </div>
                  {ENTRY_FIELDS[addType].map((f) => (
                    <div key={f.key}>
                      <p className="text-[11px] font-medium text-white/75 mb-1.5">{f.label}</p>
                      {f.options ? (
                        <FireLogSelect
                          value={addData[f.key] ?? ''}
                          onChange={(v) => setAddData((prev) => ({ ...prev, [f.key]: v }))}
                          options={f.options}
                          placeholder={f.label}
                        />
                      ) : f.choices ? (
                        <div className="flex flex-wrap gap-2">
                          {f.choices.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() =>
                                setAddData((prev) => ({
                                  ...prev,
                                  [f.key]: prev[f.key] === c ? '' : c,
                                }))
                              }
                              className={cn(
                                'h-11 px-3.5 rounded-lg text-[12.5px] font-medium touch-manipulation transition-colors',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                                addData[f.key] === c
                                  ? 'bg-elec-yellow text-black'
                                  : 'bg-white/[0.06] text-white border border-white/[0.12] hover:bg-white/[0.1]'
                              )}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      ) : f.long ? (
                        <Textarea
                          className={textareaCn}
                          value={addData[f.key] ?? ''}
                          onChange={(e) =>
                            setAddData((prev) => ({ ...prev, [f.key]: e.target.value }))
                          }
                        />
                      ) : (
                        <Input
                          type={f.date ? 'date' : 'text'}
                          className={inputCn}
                          value={addData[f.key] ?? ''}
                          onChange={(e) =>
                            setAddData((prev) => ({ ...prev, [f.key]: e.target.value }))
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>

            {addType && (
              <div className="shrink-0 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-white/[0.06]">
                <div className="max-w-2xl mx-auto w-full flex gap-2.5">
                  <Button
                    onClick={() => setAddType(null)}
                    variant="outline"
                    className="h-12 px-4 rounded-xl border-white/[0.15] bg-white/[0.05] text-white hover:bg-white/[0.1] touch-manipulation"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={saveEntry}
                    disabled={saving}
                    className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                  >
                    {saving ? 'Saving…' : 'Save to log'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Entry detail sheet — read the full record, correct a mis-tap */}
      <Sheet open={!!viewEntry} onOpenChange={(o) => !o && setViewEntry(null)}>
        <SheetContent side="bottom" className="max-h-[85vh] p-0 rounded-t-2xl overflow-hidden flex flex-col">
          {viewEntry && (
            <div className="bg-[#0a0a0a] pb-[max(1rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain min-h-0">
              <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
                <div className="max-w-xl mx-auto w-full">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                    {format(new Date(viewEntry.entry_date + 'T00:00:00'), 'EEEE d MMMM yyyy')}
                  </p>
                  <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight">
                    {ENTRY_TYPE_LABELS[viewEntry.entry_type]}
                  </h3>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="max-w-xl mx-auto w-full space-y-3">
                  <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] divide-y divide-white/[0.08]">
                    {ENTRY_FIELDS[viewEntry.entry_type]
                      .filter((f) => viewEntry.data[f.key])
                      .map((f) => (
                        <div key={f.key} className="px-4 py-2.5">
                          <p className="text-[10.5px] font-medium text-white/70">{f.label}</p>
                          <p className="mt-0.5 text-[13.5px] text-white leading-snug">
                            {f.date ? format(new Date(viewEntry.data[f.key] + 'T00:00:00'), 'd MMM yyyy') : viewEntry.data[f.key]}
                          </p>
                        </div>
                      ))}
                    {viewEntry.data.photo && (
                      <div className="px-4 py-2.5">
                        <p className="text-[10.5px] font-medium text-white/70 mb-1.5">Photo</p>
                        <img
                          src={viewEntry.data.photo}
                          alt="Entry evidence"
                          className="w-full max-h-56 rounded-lg object-contain bg-black/40"
                        />
                      </div>
                    )}
                    {viewEntry.tester_name && (
                      <div className="px-4 py-2.5">
                        <p className="text-[10.5px] font-medium text-white/70">Recorded by</p>
                        <p className="mt-0.5 text-[13.5px] text-white">{viewEntry.tester_name}</p>
                      </div>
                    )}
                    {viewEntry.entry_type === 'fault' && (
                      <div className="px-4 py-2.5">
                        <p className="text-[10.5px] font-medium text-white/70">Status</p>
                        <p
                          className={cn(
                            'mt-0.5 text-[13.5px] font-medium',
                            viewEntry.resolved ? 'text-green-400' : 'text-orange-300'
                          )}
                        >
                          {viewEntry.resolved
                            ? `Resolved ${viewEntry.resolved_date ? format(new Date(viewEntry.resolved_date + 'T00:00:00'), 'd MMM yyyy') : ''}`
                            : 'Open'}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] text-white/65 leading-relaxed flex-1">
                      Logged {format(new Date(viewEntry.created_at), 'd MMM yyyy HH:mm')}. Entries
                      can't be edited — delete a mistake and re-log it.
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirmDelete) {
                          setConfirmDelete(true);
                          setTimeout(() => setConfirmDelete(false), 4000);
                          return;
                        }
                        await deleteEntry(viewEntry.id);
                        haptic.medium();
                        setViewEntry(null);
                        toast.success('Entry deleted');
                      }}
                      className={cn(
                        'shrink-0 h-11 px-4 rounded-xl text-[12.5px] font-semibold touch-manipulation border transition-colors',
                        confirmDelete
                          ? 'bg-red-500/15 text-red-400 border-red-500/40'
                          : 'bg-white/[0.05] text-white/70 border-white/[0.12] hover:bg-white/[0.1]'
                      )}
                    >
                      {confirmDelete ? 'Tap again to delete' : 'Delete entry'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Export sheet */}
      <Sheet open={exportOpen} onOpenChange={setExportOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] p-0 rounded-t-2xl overflow-hidden flex flex-col">
          <div className="bg-[#0a0a0a] pb-[max(1rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain min-h-0">
            <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
              <div className="max-w-xl mx-auto w-full">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                Annex H export
              </p>
              <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight">
                Export the log as PDF
              </h3>
              <p className="mt-1 text-[12.5px] text-white/75">
                Laid out on the BS 5839-1:2025 Annex H model — ready for the client, risk assessor
                or fire authority.
              </p>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="max-w-xl mx-auto w-full space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ['download', 'Download / share'],
                      ['email', 'Email it'],
                    ] as ['download' | 'email', string][]
                  ).map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDelivery(mode)}
                      className={cn(
                        'h-11 rounded-xl text-[13px] font-medium touch-manipulation border transition-colors',
                        delivery === mode
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'bg-white/[0.06] text-white border-white/[0.12] hover:bg-white/[0.1]'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {delivery === 'email' && (
                  <div>
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className={inputCn}
                      placeholder="Responsible person's email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                    <p className="mt-1 text-[11px] text-white/65">
                      Sent under your company name with the PDF attached — replies come to you.
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  {[
                    { label: 'Last 6 months', months: 6, hint: 'What assessors usually ask for' },
                    { label: 'Last 12 months', months: 12, hint: 'Full annual record' },
                    { label: 'Everything', months: null, hint: 'The complete log' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      disabled={sendingExport}
                      onClick={() => runExport(opt.months, opt.label.toLowerCase())}
                      className="w-full flex items-center justify-between px-4 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] text-left hover:bg-white/[0.08] touch-manipulation disabled:opacity-50"
                    >
                      <span>
                        <span className="block text-[14.5px] font-medium text-white">
                          {opt.label}
                        </span>
                        <span className="block text-[11.5px] text-white/70">{opt.hint}</span>
                      </span>
                      <span className="text-elec-yellow text-[13px]">
                        {sendingExport ? '…' : delivery === 'email' ? 'Send →' : '→'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Manage sheet */}
      {book && (
        <ManageSheet
          open={manageOpen}
          onOpenChange={setManageOpen}
          book={book}
          onSave={async (fields) => {
            await updateBook(fields);
            toast.success('Saved');
          }}
          onArchive={async () => {
            await archiveBook();
            toast.success(`${book.building_name} archived — the record is kept, not deleted`);
            navigate('/electrician/inspection-testing/fire-alarm-log-books');
          }}
        />
      )}
    </div>
  );
};

const ManageSheet = ({
  open,
  onOpenChange,
  book,
  onSave,
  onArchive,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  book: NonNullable<ReturnType<typeof useFireAlarmLogBook>['book']>;
  onSave: (fields: Record<string, unknown>) => Promise<void>;
  onArchive: () => Promise<void>;
}) => {
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [callPoints, setCallPoints] = useState<CallPoint[]>(book.call_points ?? []);
  const [testDay, setTestDay] = useState(book.weekly_test_day);
  const [weeklyOn, setWeeklyOn] = useState(book.weekly_reminder_enabled);
  const [serviceOn, setServiceOn] = useState(book.service_reminder_enabled);
  const [serviceMonths, setServiceMonths] = useState(String(book.service_interval_months));
  const [lastService, setLastService] = useState(book.last_service_date ?? '');
  const [responsible, setResponsible] = useState(book.responsible_person);
  const [responsibleEmail, setResponsibleEmail] = useState(book.responsible_email);
  const [detectorCount, setDetectorCount] = useState(
    book.detector_count != null ? String(book.detector_count) : ''
  );
  const [arcConnected, setArcConnected] = useState(book.arc_connected);
  const [arcPhone, setArcPhone] = useState(book.arc_phone);
  const [servicingOrg, setServicingOrg] = useState(book.servicing_org);
  const [servicingPhone, setServicingPhone] = useState(book.servicing_org_phone);
  const [certRef, setCertRef] = useState(book.commissioning_cert_ref);
  const [shareEnabled, setShareEnabled] = useState(book.share_enabled);
  const [saving, setSaving] = useState(false);

  // Canonical domain, not window.origin — on the native app origin is capacitor://localhost
  const shareUrl = `https://www.elec-mate.com/fire-log/${book.share_token}`;

  const save = async () => {
    setSaving(true);
    try {
      await onSave({
        call_points: callPoints.filter((cp) => cp.number.trim()),
        weekly_test_day: testDay,
        weekly_reminder_enabled: weeklyOn,
        service_reminder_enabled: serviceOn,
        service_interval_months: parseInt(serviceMonths) || 6,
        last_service_date: lastService || null,
        responsible_person: responsible,
        responsible_email: responsibleEmail.trim(),
        detector_count: detectorCount ? parseInt(detectorCount) || null : null,
        arc_connected: arcConnected,
        arc_phone: arcPhone,
        servicing_org: servicingOrg,
        servicing_org_phone: servicingPhone,
        commissioning_cert_ref: certRef,
        share_enabled: shareEnabled,
      });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
          side="bottom"
          className="max-h-[85vh] p-0 rounded-t-2xl overflow-hidden flex flex-col"
        >
        <div className="flex flex-col min-h-0 bg-[#0a0a0a]">
          <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/[0.06]">
            <div className="max-w-5xl mx-auto w-full">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                {book.building_name}
              </p>
              <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight">
                Call points & reminders
              </h3>
            </div>
          </div>

          <div className="overflow-y-auto overscroll-contain min-h-0 px-5 py-5">
            <div className="max-w-5xl mx-auto w-full lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start space-y-6 lg:space-y-0">
            <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
              Rotation
            </p>
            <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  Call points (rotation order)
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setCallPoints((prev) => [...prev, { number: '', zone: '', location: '' }])
                  }
                  className="text-[12px] font-medium text-elec-yellow touch-manipulation min-h-[44px] px-2"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {callPoints.length === 0 && (
                  <p className="text-[12.5px] text-white/70">No call points yet — add the first.</p>
                )}
                {callPoints.map((cp, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      inputMode="numeric"
                      className={cn(inputCn, 'w-16')}
                      placeholder="No."
                      value={cp.number}
                      onChange={(e) =>
                        setCallPoints((prev) =>
                          prev.map((p, idx) => (idx === i ? { ...p, number: e.target.value } : p))
                        )
                      }
                    />
                    <Input
                      className={cn(inputCn, 'flex-1')}
                      placeholder="Zone"
                      value={cp.zone}
                      onChange={(e) =>
                        setCallPoints((prev) =>
                          prev.map((p, idx) => (idx === i ? { ...p, zone: e.target.value } : p))
                        )
                      }
                    />
                    <Input
                      className={cn(inputCn, 'flex-[1.4]')}
                      placeholder="Location"
                      value={cp.location}
                      onChange={(e) =>
                        setCallPoints((prev) =>
                          prev.map((p, idx) => (idx === i ? { ...p, location: e.target.value } : p))
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setCallPoints((prev) => prev.filter((_, idx) => idx !== i))}
                      className="shrink-0 w-11 h-12 rounded-lg text-white/65 hover:text-white hover:bg-white/[0.08] touch-manipulation"
                      aria-label="Remove call point"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 mb-2">
                Weekly test day
              </p>
              <div className="flex flex-wrap gap-2">
                {WEEKDAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTestDay(d)}
                    className={cn(
                      'h-11 px-3.5 rounded-lg text-[13px] font-medium capitalize touch-manipulation transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                      testDay === d
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.06] text-white border border-white/[0.12] hover:bg-white/[0.1]'
                    )}
                  >
                    {d.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] divide-y divide-white/[0.08]">
              <div className="flex items-center gap-4 px-4 py-3.5">
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white">
                    Responsible person access
                  </p>
                  <p className="text-[11.5px] text-white/70 leading-relaxed">
                    Share a link so the premises records their own weekly tests and reports
                    faults — you stay the supervisor and see everything.
                  </p>
                </div>
                <Switch checked={shareEnabled} onCheckedChange={setShareEnabled} />
              </div>
              {shareEnabled && (
                <div className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <Input readOnly value={shareUrl} className={cn(inputCn, 'text-[12px]')} />
                    <Button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(shareUrl);
                        toast.success('Link copied — send it to the responsible person');
                      }}
                      className="shrink-0 h-12 px-4 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
                    >
                      Copy
                    </Button>
                  </div>
                  {!book.share_enabled && (
                    <p className="mt-1.5 text-[11px] text-white/65">
                      Save changes to activate the link.
                    </p>
                  )}
                </div>
              )}
            </div>

            </div>
            <div className="space-y-6 pt-6 lg:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
              Reminders &amp; details
            </p>
            <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] divide-y divide-white/[0.08]">
              <div className="flex items-center gap-4 px-4 py-3.5">
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white">Weekly test reminder</p>
                  <p className="text-[11.5px] text-white/70">
                    Nudge on {testDay[0].toUpperCase() + testDay.slice(1)}s if untested
                  </p>
                </div>
                <Switch checked={weeklyOn} onCheckedChange={setWeeklyOn} />
              </div>
              <div className="flex items-center gap-4 px-4 py-3.5">
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white">Service due reminder</p>
                  <p className="text-[11.5px] text-white/70">14 days before the interval lapses</p>
                </div>
                <Switch checked={serviceOn} onCheckedChange={setServiceOn} />
              </div>
              <div className="grid grid-cols-2 gap-3 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-medium text-white/75 mb-1.5">
                    Service interval (months)
                  </p>
                  <Input
                    type="number"
                    inputMode="numeric"
                    className={inputCn}
                    value={serviceMonths}
                    onChange={(e) => setServiceMonths(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white/75 mb-1.5">Last service</p>
                  <Input
                    type="date"
                    className={cn(inputCn, '[color-scheme:dark]')}
                    value={lastService}
                    onChange={(e) => setLastService(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] font-medium text-white/75 mb-1.5">
                  Responsible person (premises)
                </p>
                <Input
                  className={inputCn}
                  placeholder="Name"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                />
              </div>
              <div>
                <p className="text-[11px] font-medium text-white/75 mb-1.5">Their email</p>
                <Input
                  type="email"
                  className={inputCn}
                  placeholder="Prefills the Annex H email"
                  value={responsibleEmail}
                  onChange={(e) => setResponsibleEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.06] border border-white/[0.12] divide-y divide-white/[0.08]">
              <div className="px-4 py-3.5">
                <p className="text-[11px] font-medium text-white/75 mb-1.5">
                  Automatic detectors on system
                </p>
                <Input
                  type="number"
                  className={inputCn}
                  placeholder="e.g. 24"
                  value={detectorCount}
                  onChange={(e) => setDetectorCount(e.target.value)}
                />
                <p className="mt-1 text-[11px] text-white/65">
                  Powers the automatic Annex F false alarm rate check.
                </p>
              </div>
              <div className="flex items-center gap-4 px-4 py-3.5">
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white">ARC connected</p>
                  <p className="text-[11.5px] text-white/70">
                    Signals transmitted to an alarm receiving centre
                  </p>
                </div>
                <Switch checked={arcConnected} onCheckedChange={setArcConnected} />
              </div>
              {arcConnected && (
                <div className="px-4 py-3.5">
                  <p className="text-[11px] font-medium text-white/75 mb-1.5">ARC telephone</p>
                  <Input
                    className={inputCn}
                    placeholder="For the false alarm notice by the panel"
                    value={arcPhone}
                    onChange={(e) => setArcPhone(e.target.value)}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-medium text-white/75 mb-1.5">
                    Servicing organisation
                  </p>
                  <Input
                    className={inputCn}
                    value={servicingOrg}
                    onChange={(e) => setServicingOrg(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white/75 mb-1.5">Their phone</p>
                  <Input
                    className={inputCn}
                    value={servicingPhone}
                    onChange={(e) => setServicingPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="px-4 py-3.5">
                <p className="text-[11px] font-medium text-white/75 mb-1.5">
                  Commissioning certificate reference
                </p>
                <Input
                  className={inputCn}
                  placeholder="Cert number / reference"
                  value={certRef}
                  onChange={(e) => setCertRef(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] px-4 py-3.5">
              <p className="text-[14px] font-medium text-white">Archive this building</p>
              <p className="mt-0.5 text-[11.5px] text-white/70 leading-relaxed">
                Removes it from the round but keeps the full record — log books should be retained,
                not destroyed. Reminders stop.
              </p>
              <button
                type="button"
                onClick={async () => {
                  if (!confirmArchive) {
                    setConfirmArchive(true);
                    setTimeout(() => setConfirmArchive(false), 4000);
                    return;
                  }
                  await onArchive();
                }}
                className={cn(
                  'mt-3 h-11 px-4 rounded-xl text-[13px] font-semibold touch-manipulation transition-colors border',
                  confirmArchive
                    ? 'bg-orange-500/15 text-orange-300 border-orange-500/40'
                    : 'bg-white/[0.05] text-white/80 border-white/[0.12] hover:bg-white/[0.1]'
                )}
              >
                {confirmArchive ? 'Tap again to confirm archive' : 'Archive building'}
              </button>
            </div>
            </div>
            </div>
          </div>

          <div className="shrink-0 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-white/[0.06]">
            <div className="max-w-5xl mx-auto w-full">
              <Button
                onClick={save}
                disabled={saving}
                className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FireAlarmLogBookDetail;
