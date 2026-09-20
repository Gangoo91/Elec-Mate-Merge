import { copyToClipboard } from '@/utils/clipboard';
import { useState, useCallback, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { chipBase, chipOff, chipOn, ghostButtonCn, primaryButtonCn, labelCn } from './calendarStyles';
import { selectTriggerCn } from '@/components/forms/fieldStyles';
import { IconRow, ROW_TONE } from './IconRow';
import type { GoogleCalendarStatus, CalendarView } from '@/types/calendar';

type Platform = 'ios' | 'android' | 'web';

function detectPlatform(): Platform {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'web';
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Macintosh/.test(ua) && 'ontouchend' in document) return 'ios'; // iPadOS
  if (/Android/i.test(ua)) return 'android';
  return 'web';
}

// Open a URL — uses Capacitor Browser if running natively to avoid the in-app
// WebView swallowing webcal:// links. Falls back to window.open on web.
async function openExternal(url: string) {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.isNativePlatform()) {
      // window.location is the most reliable trigger for webcal:// on iOS
      // (the system handles the protocol and prompts to subscribe).
      window.location.href = url;
      return;
    }
  } catch {
    // not Capacitor — fall through
  }
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';

// Outlook calendar sync is fully built server-side, but the Azure app is
// still single-tenant so outside users can't connect. Hidden until Andrew
// flips the app registration (multitenant + calendar redirect URI).
const OUTLOOK_CALENDAR_ENABLED = false;

/** Realistic for a firm running off one diary; more than this needs a rota. */
const JOBS_AT_ONCE_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

interface CalendarSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  googleStatus: GoogleCalendarStatus;
  syncLoading: boolean;
  syncing: boolean;
  connecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSyncNow: () => void;
  outlookStatus: GoogleCalendarStatus;
  outlookSyncing: boolean;
  outlookConnecting: boolean;
  onOutlookConnect: () => void;
  onOutlookDisconnect: () => void;
  onOutlookSyncNow: () => void;
  defaultView: CalendarView;
  onDefaultViewChange: (view: CalendarView) => void;
  workingHoursStart: number;
  workingHoursEnd: number;
  onWorkingHoursChange: (start: number, end: number) => void;
  defaultReminderMinutes: number;
  /** How many jobs can run at once — what "full" means on a day. */
  jobsAtOnce: number;
  onJobsAtOnceChange: (jobs: number) => void;
  onDefaultReminderChange: (minutes: number) => void;
  /** Days worked, 0 = Sunday … 6 = Saturday. */
  workingDays: number[];
  onWorkingDaysChange: (days: number[]) => void;
}

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  value: String(i),
  label: `${String(i).padStart(2, '0')}:00`,
}));

type SyncStep = 'idle' | 'generating' | 'ready';

const CalendarSettingsSheet = ({
  open,
  onOpenChange,
  googleStatus,
  syncLoading,
  syncing,
  connecting,
  onConnect,
  onDisconnect,
  onSyncNow,
  outlookStatus,
  outlookSyncing,
  outlookConnecting,
  onOutlookConnect,
  onOutlookDisconnect,
  onOutlookSyncNow,
  defaultView,
  onDefaultViewChange,
  workingHoursStart,
  workingHoursEnd,
  onWorkingHoursChange,
  defaultReminderMinutes,
  jobsAtOnce,
  onJobsAtOnceChange,
  onDefaultReminderChange,
  workingDays,
  onWorkingDaysChange,
}: CalendarSettingsSheetProps) => {
  const [feedUrl, setFeedUrl] = useState<string | null>(null);
  const [syncStep, setSyncStep] = useState<SyncStep>('idle');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const platform = useMemo(() => detectPlatform(), []);

  // Convert https:// feed URL to webcal:// — iOS handles webcal natively and
  // prompts to subscribe in Apple Calendar with a single tap.
  const webcalUrl = useMemo(() => {
    if (!feedUrl) return null;
    return feedUrl.replace(/^https?:\/\//, 'webcal://');
  }, [feedUrl]);

  // Google Calendar deep link — drops the user straight into "Add by URL".
  const googleCalUrl = useMemo(() => {
    if (!feedUrl) return null;
    return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(feedUrl)}`;
  }, [feedUrl]);

  const handleSubscribeApple = useCallback(async () => {
    if (!webcalUrl) return;
    await openExternal(webcalUrl);
  }, [webcalUrl]);

  const handleSubscribeGoogle = useCallback(async () => {
    if (!googleCalUrl) return;
    await openExternal(googleCalUrl);
  }, [googleCalUrl]);

  const handleGetFeedUrl = useCallback(async () => {
    try {
      setSyncStep('generating');
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`${SUPABASE_URL}/functions/v1/calendar-get-feed-url`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to get feed URL');
      const data = await response.json();
      setFeedUrl(data.feedUrl);
      setSyncStep('ready');
    } catch (error) {
      toast({ title: 'Failed to generate link', variant: 'destructive' });
      setSyncStep('idle');
    }
  }, [toast]);

  const handleCopyFeedUrl = useCallback(async () => {
    if (!feedUrl) return;
    const ok = await copyToClipboard(feedUrl);
    if (ok) {
      setCopied(true);
      toast({ title: 'Link copied — now paste it in your calendar app' });
      setTimeout(() => setCopied(false), 3000);
    } else {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  }, [feedUrl, toast]);

  const connectedPill = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-green-400">
      Connected
    </span>
  );

  const chip = (on: boolean, extra = '') =>
    cn(chipBase, on ? chipOn : chipOff, 'px-4 touch-manipulation', extra);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl p-0 sm:mx-auto sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-[640px]"
      >
        <div className="flex h-full max-h-[85vh] flex-col bg-background">
          <SheetHeader className="shrink-0 px-4 py-3 sm:px-5">
            <SheetTitle className="text-left text-[19px] font-semibold leading-tight tracking-tight text-white">
              Calendar settings
            </SheetTitle>
            <SheetDescription className="sr-only">Sync and preferences</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto pb-6">
            {/* ── Google Calendar, two-way ── */}
            <IconRow tone={ROW_TONE.sync} label="Google Calendar">
              {syncLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking…
                </span>
              ) : googleStatus.connected ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {connectedPill}
                    {googleStatus.email && <span className="truncate">{googleStatus.email}</span>}
                  </div>
                  <p className="text-[12px] text-white">
                    Changes go both ways.
                    {googleStatus.lastSyncAt &&
                      ` Last synced ${format(new Date(googleStatus.lastSyncAt), 'EEE d MMM, HH:mm')}.`}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onSyncNow}
                      disabled={syncing}
                      className={cn(ghostButtonCn, 'h-11 flex-1 text-[13px]')}
                    >
                      {syncing && <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />}
                      Sync now
                    </button>
                    <button
                      type="button"
                      onClick={onDisconnect}
                      className="h-11 flex-1 rounded-xl border border-red-500/25 bg-red-500/10 text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/15 touch-manipulation active:scale-[0.98]"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>
                    Connect your Google account and bookings go both ways — what Gaynor puts in
                    Google lands here, what you start here lands in Google.
                  </p>
                  <button
                    type="button"
                    onClick={onConnect}
                    disabled={connecting}
                    className="h-12 w-full rounded-xl text-[14px] font-semibold text-white transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-60"
                    style={{ backgroundColor: ROW_TONE.sync }}
                  >
                    {connecting && <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />}
                    Connect Google Calendar
                  </button>
                </div>
              )}
            </IconRow>

            {/* ── Outlook, two-way. Hidden until the Azure app registration is
                multitenant with the calendar redirect URI — the backend
                (oauth + sync-outlook-calendar) is live and waiting. ── */}
            {OUTLOOK_CALENDAR_ENABLED && (
              <IconRow tone="#0078D4" label="Outlook Calendar">
                {syncLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking…
                  </span>
                ) : outlookStatus.connected ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {connectedPill}
                      {outlookStatus.email && <span className="truncate">{outlookStatus.email}</span>}
                    </div>
                    {outlookStatus.lastSyncAt && (
                      <p className="text-[12px] text-white">
                        Last synced {format(new Date(outlookStatus.lastSyncAt), 'EEE d MMM, HH:mm')}.
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={onOutlookSyncNow}
                        disabled={outlookSyncing}
                        className={cn(ghostButtonCn, 'h-11 flex-1 text-[13px]')}
                      >
                        {outlookSyncing && <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />}
                        Sync now
                      </button>
                      <button
                        type="button"
                        onClick={onOutlookDisconnect}
                        className="h-11 flex-1 rounded-xl border border-red-500/25 bg-red-500/10 text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/15 touch-manipulation active:scale-[0.98]"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p>Connect a Microsoft 365 or Outlook.com account and bookings go both ways.</p>
                    <button
                      type="button"
                      onClick={onOutlookConnect}
                      disabled={outlookConnecting}
                      className="h-12 w-full rounded-xl bg-[#0078D4] text-[14px] font-semibold text-white transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-60"
                    >
                      {outlookConnecting && <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />}
                      Connect Outlook Calendar
                    </button>
                  </div>
                )}
              </IconRow>
            )}

            {/* ── The phone's own calendar app, one-way feed ── */}
            <IconRow tone={ROW_TONE.phone} label="Your phone's calendar">
              {syncStep === 'idle' && (
                <div className="space-y-3">
                  <p>
                    A live feed of your bookings into Apple Calendar or Google Calendar, next to
                    your other diaries. One way: the app reads, it never writes.
                  </p>
                  <button
                    type="button"
                    onClick={handleGetFeedUrl}
                    className={cn(ghostButtonCn, 'h-11 w-full text-[13px]')}
                  >
                    Set up phone sync
                  </button>
                </div>
              )}

              {syncStep === 'generating' && (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Making your link…
                </span>
              )}

              {syncStep === 'ready' && (
                <div className="space-y-3">
                  <p className="text-[12px]">
                    {platform === 'ios'
                      ? 'Tap the button and iOS asks to subscribe in Apple Calendar. Nothing to paste.'
                      : platform === 'android'
                        ? 'Tap to add the feed to Google Calendar in one step.'
                        : 'Pick the calendar you use. It opens with the link ready to add.'}
                  </p>

                  {platform === 'ios' ? (
                    <div className="space-y-2">
                      <button type="button" onClick={handleSubscribeApple} className={primaryButtonCn}>
                        Subscribe in Apple Calendar
                      </button>
                      <button
                        type="button"
                        onClick={handleSubscribeGoogle}
                        className={cn(ghostButtonCn, 'h-11 w-full text-[13px]')}
                      >
                        Or add to Google Calendar
                      </button>
                    </div>
                  ) : platform === 'android' ? (
                    <div className="space-y-2">
                      <button type="button" onClick={handleSubscribeGoogle} className={primaryButtonCn}>
                        Add to Google Calendar
                      </button>
                      <button
                        type="button"
                        onClick={handleSubscribeApple}
                        className={cn(ghostButtonCn, 'h-11 w-full text-[13px]')}
                      >
                        Or open in Apple Calendar
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={handleSubscribeApple} className={primaryButtonCn}>
                        Apple
                      </button>
                      <button type="button" onClick={handleSubscribeGoogle} className={primaryButtonCn}>
                        Google
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyFeedUrl}
                    className={cn(
                      ghostButtonCn,
                      'h-11 w-full text-[13px]',
                      copied && 'border-green-500/30 bg-green-500/10 text-green-300'
                    )}
                  >
                    {copied ? 'Link copied' : 'Copy the link instead'}
                  </button>

                  <div className="space-y-1.5">
                    <p className="text-[12px] font-medium">If the buttons do nothing, add it by hand</p>
                    <InstructionRow
                      title="iPhone (Apple Calendar)"
                      steps="Settings → Calendar → Accounts → Add Account → Other → Add Subscribed Calendar → paste the link"
                    />
                    <InstructionRow
                      title="Google Calendar"
                      steps="Open Google Calendar → Settings → Add calendar → From URL → paste the link"
                    />
                    <InstructionRow
                      title="Samsung Calendar"
                      steps="Menu → Manage calendars → Add account → Add subscription → paste the link"
                    />
                    <InstructionRow
                      title="Outlook"
                      steps="Settings → View all Outlook settings → Calendar → Shared calendars → Subscribe from web → paste the link"
                    />
                  </div>

                  <p className="text-[12px] leading-snug">
                    Once subscribed, new bookings arrive on the phone every few hours — each
                    calendar app refreshes on its own schedule. Apple Calendar lets you tighten
                    it under Settings → Calendar → Accounts → your Elec-Mate subscription.
                  </p>
                </div>
              )}
            </IconRow>

            {/* ── Preferences ── */}
            <IconRow tone={ROW_TONE.view} label="Opens on">
              <div className="mt-1.5 grid grid-cols-4 gap-2">
                {(['day', 'three', 'week', 'month'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={defaultView === v}
                    onClick={() => onDefaultViewChange(v as CalendarView)}
                    className={chip(defaultView === v, 'px-0')}
                  >
                    {v === 'three' ? '3 days' : v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </IconRow>

            <IconRow tone={ROW_TONE.hours} label="Working hours">
              <div className="mt-1 grid grid-cols-2 gap-x-4">
                <label className="block">
                  <span className={labelCn}>From</span>
                  <Select
                    value={String(workingHoursStart)}
                    onValueChange={(v) => onWorkingHoursChange(parseInt(v, 10), workingHoursEnd)}
                  >
                    <SelectTrigger className={cn(selectTriggerCn, 'w-full')}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      {HOUR_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
                <label className="block">
                  <span className={labelCn}>Until</span>
                  <Select
                    value={String(workingHoursEnd)}
                    onValueChange={(v) => onWorkingHoursChange(workingHoursStart, parseInt(v, 10))}
                  >
                    <SelectTrigger className={cn(selectTriggerCn, 'w-full')}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      {HOUR_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              </div>
              <p className="mt-2 text-[12px]">
                The grid opens here each morning and the hours outside are dimmed.
              </p>
            </IconRow>

            {/* Monday-first, matching the grid. At least one stays on — a
                zero-day week would make "next free day" never. */}
            <IconRow tone={ROW_TONE.days} label="Days you work">
              <div className="mt-1.5 flex gap-1.5">
                {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                  const on = workingDays.includes(d);
                  const label = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d];
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={on}
                      aria-label={
                        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d]
                      }
                      onClick={() => {
                        const next = on ? workingDays.filter((x) => x !== d) : [...workingDays, d];
                        if (next.length > 0) onWorkingDaysChange(next);
                      }}
                      className={cn(
                        'flex h-11 min-w-0 flex-1 items-center justify-center rounded-full border text-[13px] touch-manipulation active:scale-[0.96]',
                        on ? chipOn : chipOff
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[12px]">Days off are shaded and skipped when finding your next free day.</p>
            </IconRow>

            <IconRow tone={ROW_TONE.capacity} label="Jobs at once">
              <div className="mt-1.5 flex flex-wrap gap-2">
                {JOBS_AT_ONCE_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={jobsAtOnce === n}
                    onClick={() => onJobsAtOnceChange(n)}
                    className={chip(jobsAtOnce === n)}
                  >
                    {n === 1 ? 'Just me' : String(n)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[12px] leading-snug">
                How many jobs can run at the same time. A day only counts as full once it hits
                this — below it, overlapping bookings are normal, not a clash.
              </p>
            </IconRow>

            <IconRow tone={ROW_TONE.reminder} label="Default reminder">
              <div className="mt-1.5 flex flex-wrap gap-2">
                {(
                  [
                    { v: 0, label: 'None' },
                    { v: 5, label: '5 min' },
                    { v: 15, label: '15 min' },
                    { v: 30, label: '30 min' },
                    { v: 60, label: '1 hour' },
                    { v: 1440, label: '1 day' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    aria-pressed={defaultReminderMinutes === opt.v}
                    onClick={() => onDefaultReminderChange(opt.v)}
                    className={chip(defaultReminderMinutes === opt.v)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </IconRow>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/** One platform's manual steps, folded until tapped. */
function InstructionRow({ title, steps }: { title: string; steps: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
      className="w-full overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04] text-left touch-manipulation"
    >
      <div className="flex h-11 items-center justify-between px-3">
        <span className="text-[13px] font-medium text-white">{title}</span>
        <ChevronRight
          className={cn('h-4 w-4 text-white transition-transform', expanded && 'rotate-90')}
        />
      </div>
      {expanded && (
        <div className="px-3 pb-3">
          <p className="text-[12px] leading-relaxed text-white">{steps}</p>
        </div>
      )}
    </button>
  );
}

export default CalendarSettingsSheet;
