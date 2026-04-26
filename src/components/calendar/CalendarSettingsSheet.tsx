import { copyToClipboard } from '@/utils/clipboard';
import { useState, useCallback, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  RefreshCw,
  Unplug,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Apple,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  defaultView: CalendarView;
  onDefaultViewChange: (view: CalendarView) => void;
  workingHoursStart: number;
  workingHoursEnd: number;
  onWorkingHoursChange: (start: number, end: number) => void;
  defaultReminderMinutes: number;
  onDefaultReminderChange: (minutes: number) => void;
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
  defaultView,
  onDefaultViewChange,
  workingHoursStart,
  workingHoursEnd,
  onWorkingHoursChange,
  defaultReminderMinutes,
  onDefaultReminderChange,
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
            <SheetTitle className="text-white text-lg font-bold">Calendar Settings</SheetTitle>
            <SheetDescription className="sr-only">
              Manage calendar sync and preferences
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            {/* ──────────────────────────────────────────────────────
                Sync to Your Phone
               ────────────────────────────────────────────────────── */}
            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white">Sync to Your Phone</h3>
                <p className="text-xs text-white mt-0.5">
                  See your Elec-Mate events in your phone's calendar app
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                {syncStep === 'idle' && (
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-white">
                      This creates a live link between Elec-Mate and your phone's calendar. Events
                      you add here will automatically appear in your calendar app.
                    </p>
                    <Button
                      onClick={handleGetFeedUrl}
                      className="h-12 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                    >
                      Set Up Phone Sync
                    </Button>
                  </div>
                )}

                {syncStep === 'generating' && (
                  <div className="p-4 flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
                    <span className="text-sm text-white">Generating your link...</span>
                  </div>
                )}

                {syncStep === 'ready' && (
                  <div className="divide-y divide-white/[0.06]">
                    {/* Primary action — platform-aware */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-white">
                        {platform === 'ios'
                          ? 'Tap the button below — iOS will prompt you to subscribe in Apple Calendar. No copy-paste needed.'
                          : platform === 'android'
                            ? 'Tap to add the feed to your Google Calendar in one step.'
                            : "Pick the calendar app you use. We'll open it with the link ready to add."}
                      </p>

                      {/* iOS / iPadOS / macOS — webcal:// one-tap */}
                      {platform === 'ios' ? (
                        <>
                          <Button
                            onClick={handleSubscribeApple}
                            className="h-12 w-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                          >
                            <Apple className="h-4 w-4 mr-2" />
                            Subscribe in Apple Calendar
                          </Button>
                          <Button
                            onClick={handleSubscribeGoogle}
                            variant="outline"
                            className="h-11 w-full bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/[0.1] font-medium rounded-xl touch-manipulation active:scale-[0.98]"
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            Or add to Google Calendar
                          </Button>
                        </>
                      ) : platform === 'android' ? (
                        <>
                          <Button
                            onClick={handleSubscribeGoogle}
                            className="h-12 w-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            Add to Google Calendar
                          </Button>
                          <Button
                            onClick={handleSubscribeApple}
                            variant="outline"
                            className="h-11 w-full bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/[0.1] font-medium rounded-xl touch-manipulation active:scale-[0.98]"
                          >
                            <Apple className="h-4 w-4 mr-2" />
                            Or open in Apple Calendar
                          </Button>
                        </>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={handleSubscribeApple}
                            className="h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                          >
                            <Apple className="h-4 w-4 mr-2" />
                            Apple
                          </Button>
                          <Button
                            onClick={handleSubscribeGoogle}
                            className="h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            Google
                          </Button>
                        </div>
                      )}

                      {/* Copy fallback — always available */}
                      <Button
                        onClick={handleCopyFeedUrl}
                        variant="outline"
                        className={cn(
                          'h-11 w-full font-medium rounded-xl touch-manipulation active:scale-[0.98] border-white/[0.1]',
                          copied
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-white/[0.02] hover:bg-white/[0.06] text-white'
                        )}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied ? 'Link copied' : 'Copy link instead'}
                      </Button>
                    </div>

                    {/* Per-platform manual instructions (collapsed) */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-white/70">
                          Manual setup (if the buttons don't work)
                        </span>
                      </div>
                      <InstructionRow
                        title="iPhone (Apple Calendar)"
                        steps="Settings → Calendar → Accounts → Add Account → Other → Add Subscribed Calendar → Paste link"
                      />
                      <InstructionRow
                        title="Google Calendar"
                        steps="Open Google Calendar → Settings → Add calendar → From URL → Paste link"
                      />
                      <InstructionRow
                        title="Samsung Calendar"
                        steps="Menu → Manage calendars → Add account → Add subscription → Paste link"
                      />
                      <InstructionRow
                        title="Outlook"
                        steps="Settings → View all Outlook settings → Calendar → Shared calendars → Subscribe from web → Paste link"
                      />
                    </div>

                    {/* Done note */}
                    <div className="px-4 py-3 bg-emerald-500/5">
                      <p className="text-xs text-emerald-400">
                        Once subscribed, new events will sync automatically every few hours. Most
                        calendar apps update on their own schedule — Apple Calendar refreshes by
                        default; you can tighten this in Settings → Calendar → Accounts → your
                        Elec-Mate subscription → Refresh Calendars.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────
                Google Calendar (Two-Way)
               ────────────────────────────────────────────────────── */}
            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white">Google Calendar</h3>
                <p className="text-xs text-white mt-0.5">Two-way sync — changes go both ways</p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                {syncLoading ? (
                  <div className="p-4 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span className="text-sm text-white">Checking...</span>
                  </div>
                ) : googleStatus.connected ? (
                  <div className="divide-y divide-white/[0.06]">
                    <div className="p-4 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">Connected</p>
                        {googleStatus.email && (
                          <p className="text-xs text-white truncate">{googleStatus.email}</p>
                        )}
                      </div>
                    </div>
                    {googleStatus.lastSyncAt && (
                      <div className="px-4 py-2">
                        <p className="text-xs text-white">
                          Last synced {new Date(googleStatus.lastSyncAt).toLocaleString('en-GB')}
                        </p>
                      </div>
                    )}
                    <div className="flex">
                      <button
                        type="button"
                        onClick={onSyncNow}
                        disabled={syncing}
                        className="flex-1 h-12 flex items-center justify-center gap-2 text-sm font-semibold text-white touch-manipulation active:bg-white/[0.04]"
                      >
                        {syncing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        Sync Now
                      </button>
                      <div className="w-px bg-white/[0.06]" />
                      <button
                        type="button"
                        onClick={onDisconnect}
                        className="flex-1 h-12 flex items-center justify-center gap-2 text-sm font-semibold text-red-400 touch-manipulation active:bg-white/[0.04]"
                      >
                        <Unplug className="h-4 w-4" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-white">
                      Connect your Google account to sync events both ways. Events you create in
                      either app will appear in both.
                    </p>
                    <Button
                      onClick={onConnect}
                      disabled={connecting}
                      className="h-12 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                    >
                      {connecting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      Connect Google Calendar
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────
                Preferences
               ────────────────────────────────────────────────────── */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-white">Preferences</h3>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
                {/* Default view */}
                <div className="flex items-center justify-between h-12 px-4">
                  <Label className="text-sm text-white">Default view</Label>
                  <Select
                    value={defaultView}
                    onValueChange={(v) => onDefaultViewChange(v as CalendarView)}
                  >
                    <SelectTrigger className="h-9 w-28 touch-manipulation bg-transparent border-0 text-sm font-semibold text-elec-yellow text-right justify-end gap-1 focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Work starts */}
                <div className="flex items-center justify-between h-12 px-4">
                  <Label className="text-sm text-white">Work starts</Label>
                  <Select
                    value={String(workingHoursStart)}
                    onValueChange={(v) => onWorkingHoursChange(parseInt(v, 10), workingHoursEnd)}
                  >
                    <SelectTrigger className="h-9 w-24 touch-manipulation bg-transparent border-0 text-sm font-semibold text-elec-yellow text-right justify-end gap-1 focus:ring-0">
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
                </div>

                {/* Work ends */}
                <div className="flex items-center justify-between h-12 px-4">
                  <Label className="text-sm text-white">Work ends</Label>
                  <Select
                    value={String(workingHoursEnd)}
                    onValueChange={(v) => onWorkingHoursChange(workingHoursStart, parseInt(v, 10))}
                  >
                    <SelectTrigger className="h-9 w-24 touch-manipulation bg-transparent border-0 text-sm font-semibold text-elec-yellow text-right justify-end gap-1 focus:ring-0">
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
                </div>

                {/* Default reminder */}
                <div className="flex items-center justify-between h-12 px-4">
                  <Label className="text-sm text-white">Default reminder</Label>
                  <Select
                    value={String(defaultReminderMinutes)}
                    onValueChange={(v) => onDefaultReminderChange(parseInt(v, 10))}
                  >
                    <SelectTrigger className="h-9 w-28 touch-manipulation bg-transparent border-0 text-sm font-semibold text-elec-yellow text-right justify-end gap-1 focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="1440">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/** Collapsible instruction row for each calendar platform */
function InstructionRow({ title, steps }: { title: string; steps: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden touch-manipulation"
    >
      <div className="flex items-center justify-between h-11 px-3">
        <span className="text-sm font-semibold text-white">{title}</span>
        <ChevronRight
          className={cn('h-4 w-4 text-white transition-transform', expanded && 'rotate-90')}
        />
      </div>
      {expanded && (
        <div className="px-3 pb-3">
          <p className="text-xs text-white leading-relaxed">{steps}</p>
        </div>
      )}
    </button>
  );
}

export default CalendarSettingsSheet;
