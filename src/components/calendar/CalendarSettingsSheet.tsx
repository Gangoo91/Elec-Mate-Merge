import { copyToClipboard } from '@/utils/clipboard';
import { useState, useCallback } from 'react';
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
import { RefreshCw, Unplug, Loader2, CheckCircle2, Copy, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { GoogleCalendarStatus, CalendarView } from '@/types/calendar';

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
                    {/* Step 1: Copy */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">1</span>
                        </div>
                        <span className="text-sm font-semibold text-white">
                          Copy your sync link
                        </span>
                      </div>
                      <Button
                        onClick={handleCopyFeedUrl}
                        className={cn(
                          'h-12 w-full font-bold rounded-xl touch-manipulation active:scale-[0.98]',
                          copied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        )}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </Button>
                    </div>

                    {/* Step 2: Instructions per platform */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">2</span>
                        </div>
                        <span className="text-sm font-semibold text-white">
                          Open your calendar app and subscribe
                        </span>
                      </div>

                      <div className="space-y-2">
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
                    </div>

                    {/* Done note */}
                    <div className="px-4 py-3 bg-emerald-500/5">
                      <p className="text-xs text-emerald-400">
                        Once subscribed, your events will sync automatically. No need to do anything
                        else.
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
