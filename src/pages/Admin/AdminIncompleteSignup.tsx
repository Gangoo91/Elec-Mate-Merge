import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
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
import PullToRefresh from '@/components/admin/PullToRefresh';
import { RefreshCw, Send, Loader2, Eye, RotateCcw } from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Eyebrow,
  type Tone,
} from '@/components/admin/editorial';

type CampaignId = 'v9' | 'v10' | 'v11';
type RoleFilter = 'all' | 'electrician' | 'apprentice';
type StatusFilter = 'all' | 'pending' | 'emailed';
type SortKey = 'action' | 'newest' | 'oldest';

/*
  Validated dark-surface series. The old page carried its whole visual language
  in `tone="amber"` — hero, card headers, every pill and the campaign cards were
  the same amber wash, so a person emailed six months ago and a person who
  abandoned an hour ago were rendered identically. These four are drawn from the
  validated admin series; elec-yellow stays reserved for "needs action" so it
  never reads as just another category.
*/
const SERIES = {
  blue: '#3987E5',
  red: '#E66767',
  green: '#199E70',
  purple: '#9085E9',
} as const;

/*
  How stale an abandoned checkout is.

  This is the single most decisive fact on the page and it was nowhere on it:
  the list showed "7 months ago" as 11px grey text on the right, the same weight
  as "2 hours ago". Against live data the 526 outstanding checkouts split
  18 / 68 / 411 / 29 across these four bands — i.e. 78% of the list is between
  one and six months old, which is the thing that decides whether the campaign
  is worth sending at all, and it was invisible.
*/
const AGE_BANDS = [
  { key: 'w1', label: 'under a week', max: 7 * 86400000, fill: SERIES.green },
  { key: 'm1', label: 'under a month', max: 30 * 86400000, fill: SERIES.blue },
  { key: 'm6', label: 'one to six months', max: 180 * 86400000, fill: SERIES.purple },
  { key: 'old', label: 'over six months', max: Infinity, fill: SERIES.red },
] as const;

function bandFor(ageMs: number) {
  return AGE_BANDS.find((b) => ageMs < b.max) ?? AGE_BANDS[AGE_BANDS.length - 1];
}

/** Age in words, short enough to sit inline on a phone: "6d", "3 weeks", "7 months". */
function ageLabel(ms: number): string {
  const days = Math.floor(ms / 86400000);
  if (days < 1) return 'today';
  if (days < 14) return `${days}d`;
  if (days < 60) return `${Math.floor(days / 7)} weeks`;
  return `${Math.floor(days / 30)} months`;
}

/**
 * A member of the abandoned-checkout cohort, joined to its campaign state.
 *
 * `email` is required and always populated because it comes from
 * `useAdminUsersBase()` (auth.users), never from `profiles` — see the cohort
 * comment below for why reading it off profiles cannot work.
 */
interface RosterUser {
  id: string;
  full_name: string | null;
  username: string | null;
  email: string;
  role: string | null;
  created_at: string;
  ageMs: number;
  /** 'pending' = never sent this campaign's email. 'emailed' = sent, no subscription since. */
  status: 'pending' | 'emailed';
  /** Only known for the 200 most recent sends the backend returns — may be null on older rows. */
  sentAt: string | null;
}

interface Stats {
  totalEligible: number;
  sent: number;
  totalAbandoned: number;
  conversions: number;
  /*
    Deliberately never rendered.

    `get_v3_stats` returns a bare number as a string ('6.4') while
    `get_v10_stats` returns it already formatted ('6.4%'), and the page printed
    whichever it got straight into the "Conversion" cell — so switching campaign
    silently switched the units and V9 read "6.4" where V10 read "6.4%". It is
    also computed against the wrong denominator; see `recoveryRate` below.
  */
  conversionRate: string;
}

const CAMPAIGNS: Record<
  CampaignId,
  {
    id: CampaignId;
    label: string;
    short: string;
    subject: string;
    tagline: string;
    tone: Tone;
    /** Strikethrough list price shown on the price grid, per role. */
    pricing?: { electrician: [was: string, now: string]; apprentice: [was: string, now: string] };
    actions: {
      stats: string;
      eligible: string;
      sent: string;
      test: string;
      manual: string;
      campaign: string;
      reset: string;
      /** Day-3 follow-up. Only V11 has one; normally fired by cron. */
      nudge?: string;
      /** Renders the real template server-side so the preview can't drift. */
      preview?: string;
    };
  }
> = {
  v9: {
    id: 'v9',
    label: 'V9 — Quick Question',
    short: 'V9',
    subject: 'Quick question',
    tagline: 'Personal, curious, asks why they didn’t finish.',
    tone: 'amber',
    actions: {
      stats: 'get_v3_stats',
      eligible: 'get_v3_eligible',
      sent: 'get_v3_sent',
      test: 'send_v3_test',
      manual: 'send_manual',
      campaign: 'send_v3_campaign',
      reset: 'reset_sent',
    },
  },
  v10: {
    id: 'v10',
    label: 'V10 — Launch Price (retired)',
    short: 'V10',
    subject: 'Your launch price, just for you.',
    tagline:
      'RETIRED — its deadline is the hardcoded string “Sunday 26 April”, so every send since then has carried a dead date. Use V11.',
    tone: 'emerald',
    pricing: { electrician: ['£14.99', '£9.99'], apprentice: ['£6.99', '£4.99'] },
    actions: {
      stats: 'get_v10_stats',
      eligible: 'get_v10_eligible',
      sent: 'get_v10_sent',
      test: 'send_v10_test',
      manual: 'send_v10_manual',
      campaign: 'send_v10_campaign',
      reset: 'reset_v10_sent',
    },
  },
  v11: {
    id: 'v11',
    label: 'V11 — Come on then',
    short: 'V11',
    subject: 'Come on then. Let’s get you in.',
    tagline:
      'Half price against the true £19.99, closes 30 September, plus an automatic day-3 nudge.',
    tone: 'amber',
    pricing: { electrician: ['£19.99', '£9.99'], apprentice: ['£6.99', '£4.99'] },
    actions: {
      stats: 'get_v11_stats',
      eligible: 'get_v11_eligible',
      sent: 'get_v11_sent',
      test: 'send_v11_test',
      manual: 'send_v11_manual',
      campaign: 'send_v11_campaign',
      reset: 'reset_v11_sent',
      nudge: 'send_v11_nudge',
      preview: 'get_v11_preview',
    },
  },
};

function getInitials(name: string | null | undefined, fallback: string = '?'): string {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return fallback;
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const selectCn =
  'h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 ' +
  'text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none';

export default function AdminIncompleteSignup() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [campaign, setCampaign] = useState<CampaignId>('v11');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortKey>('action');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const [testEmail, setTestEmail] = useState('');
  const [testRole, setTestRole] = useState<'electrician' | 'apprentice'>('electrician');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RosterUser | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [batchSending, setBatchSending] = useState(false);
  /** Live tally while a multi-run campaign send is in flight. */
  const [batchProgress, setBatchProgress] = useState<{ sent: number; remaining: number } | null>(
    null
  );

  const C = CAMPAIGNS[campaign];

  const invoke = async <T,>(action: string, body: Record<string, unknown> = {}) => {
    const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
      body: { action, ...body },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data as T;
  };

  /*
    The whole abandoned-checkout population, derived on the client.

    The four headline cells used to read "Abandoned 0 · Last 24h 0 · Emailed 427
    · Recovered 27", and the first two were wrong for two separate reasons.

    1. `get_v10_stats` builds its total with
         .select('id', { count: 'exact', head: true })
       and then reads `data.count`. With `head: true` PostgREST returns no body
       at all: `data` is null, the row count arrives on the sibling `count`
       property, and `(v10Total)?.count ?? 0` therefore evaluated to 0 on every
       single call. "Abandoned" was not low, it was structurally nailed to nought
       — the real figure against live data is 526. The same expression feeds
       `totalEligible`, which came back as 0 − 427 = −427.
    2. "Last 24h" was never a 24-hour figure. It rendered `totalAbandoned`, the
       very same variable as the cell beside it, under a different label.

    The edge function is not ours to change from this page, so the cohort is
    rebuilt here from `useAdminUsersBase()` using the identical predicate the
    backend uses (electrician/apprentice, has a Stripe customer, not subscribed,
    no free access). That hook is also the only source of email addresses that
    works: `profiles` has no email column — it lives on auth.users — so any
    query selecting `profiles.email` answers 42703 and yields null.
  */
  const { data: allUsers, isLoading: baseLoading, refetch: refetchBase } = useAdminUsersBase();

  const cohort = useMemo(
    () =>
      (allUsers ?? []).filter(
        (u) =>
          (u.role === 'electrician' || u.role === 'apprentice') &&
          !!u.stripe_customer_id &&
          !u.subscribed &&
          !u.free_access_granted &&
          !!u.email
      ),
    [allUsers]
  );

  const { data: stats } = useQuery<Stats>({
    queryKey: ['admin-incomplete-stats', campaign],
    queryFn: () => invoke<Stats>(C.actions.stats),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const {
    data: eligibleUsers,
    isLoading: eligibleLoading,
    isFetching,
    refetch,
  } = useQuery<{ id: string }[]>({
    queryKey: ['admin-incomplete-eligible', campaign],
    queryFn: async () => {
      const data = await invoke<{ users: { id: string }[] }>(C.actions.eligible);
      return data?.users || [];
    },
    staleTime: 30 * 1000,
  });

  const { data: sentUsers } = useQuery<
    {
      id: string;
      incomplete_signup_v3_sent_at?: string;
      incomplete_signup_v10_sent_at?: string;
      incomplete_signup_v11_sent_at?: string;
      incomplete_signup_v11_nudge_sent_at?: string;
    }[]
  >({
    queryKey: ['admin-incomplete-sent', campaign],
    queryFn: async () => {
      const data = await invoke<{ users: { id: string }[] }>(C.actions.sent);
      return data?.users || [];
    },
    staleTime: 30 * 1000,
  });

  /*
    The preview, rendered by the same code that sends.

    Only fetched while the sheet is open, and only for campaigns that expose a
    preview action — V9 and V10 keep their hand-written placeholders.
  */
  const { data: previewData, isLoading: previewLoading } = useQuery<{
    subject: string;
    deadline: string;
    html: string;
  }>({
    queryKey: ['admin-incomplete-preview', campaign, testRole],
    queryFn: async () =>
      invoke<{ subject: string; deadline: string; html: string }>(C.actions.preview as string, {
        role: testRole,
      }),
    enabled: showPreview && !!C.actions.preview,
    staleTime: 5 * 60 * 1000,
  });

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-eligible'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-sent'] });
    refetchBase();
  };

  /*
    Send timestamps, for the rows that have one.

    `get_v10_sent` / `get_v3_sent` are capped at `.limit(200)` while 427 people
    have actually been sent V10, so this map covers only the most recent 200
    sends. That cap is also why "Recovered" is a hero figure and not a list
    filter: 27 people subscribed after the email but only 10 of them fall inside
    the newest 200 rows, so a list built from this endpoint would have shown 10
    and quietly called it all of them. The exact 27 comes from `stats`, which
    counts server-side without a limit.

    `get_v11_sent` raises its own cap to 1000 — enough to cover the whole 617
    cohort — so the V11 map is complete rather than a most-recent slice.
  */
  const sentAtById = useMemo(() => {
    const m = new Map<string, string>();
    (sentUsers ?? []).forEach((u) => {
      const at =
        (campaign === 'v11'
          ? u.incomplete_signup_v11_sent_at
          : campaign === 'v10'
            ? u.incomplete_signup_v10_sent_at
            : u.incomplete_signup_v3_sent_at) ?? null;
      if (at) m.set(u.id, at);
    });
    return m;
  }, [sentUsers, campaign]);

  /** Who has already had the day-3 nudge — V11 only. */
  const nudgedIds = useMemo(() => {
    const s = new Set<string>();
    if (campaign !== 'v11') return s;
    (sentUsers ?? []).forEach((u) => {
      if (u.incomplete_signup_v11_nudge_sent_at) s.add(u.id);
    });
    return s;
  }, [sentUsers, campaign]);

  /*
    One roster instead of two lists.

    The page had an "Abandoned Checkouts" card and, four hundred pixels lower
    under a divider, a "Recently Emailed" card — the same people, split by a
    boolean, with no way to see them together, search across them or tell from
    the first list that 397 of the 526 had already been contacted. They are one
    population with a status, so they are now one list with a status chip.

    Membership comes from the cohort (complete, 526) and the status from the
    eligible endpoint's id set, so "not emailed" + "emailed" is a partition of
    the cohort by construction and the chip counts cannot fail to sum to All.
    That was the other reconciliation bug: the old tabs counted the eligible
    list only, so "All 129" sat under a headline claiming 427 had been emailed.
  */
  const eligibleReady = Array.isArray(eligibleUsers);
  const roster = useMemo<RosterUser[]>(() => {
    if (!eligibleReady) return [];
    const pendingIds = new Set(eligibleUsers.map((u) => u.id));
    const now = Date.now();
    return cohort.map((u) => {
      const created = u.created_at;
      return {
        id: u.id,
        full_name: u.full_name,
        username: u.username ?? null,
        email: u.email as string,
        role: u.role ?? null,
        created_at: created,
        ageMs: Math.max(0, now - new Date(created).getTime()),
        status: pendingIds.has(u.id) ? 'pending' : 'emailed',
        sentAt: sentAtById.get(u.id) ?? null,
      };
    });
  }, [cohort, eligibleUsers, eligibleReady, sentAtById]);

  /*
    `get_v10_eligible` caps at `.limit(500)`. Under that cap the partition above
    is exact (129 pending today). If it ever saturates, everyone past row 500
    would be mis-labelled "emailed" and the counts would look healthier than
    they are, so say so rather than render a confident wrong number.
  */
  const eligibleTruncated = (eligibleUsers?.length ?? 0) >= 500;

  const counts = useMemo(() => {
    const pending = roster.filter((r) => r.status === 'pending').length;
    return { all: roster.length, pending, emailed: roster.length - pending };
  }, [roster]);

  /*
    Recovery rate against the right denominator.

    The backend divides conversions by `sent` — a count of every profile with a
    sent timestamp, taken with no role filter and no Stripe filter at all, which
    is why "Emailed" read 427 while the cohort it was supposedly a slice of read
    0. Three of those 427 are not in the checkout cohort. The people the email
    could possibly have converted are the cohort members who received it: the
    397 still unsubscribed plus the 27 who since subscribed = 424.
  */
  const recovered = stats?.conversions ?? 0;
  const everEmailed = counts.emailed + recovered;
  const recoveryRate = everEmailed > 0 ? (recovered / everEmailed) * 100 : 0;

  /** Replaces the fake "Last 24h" cell — a real seven-day window, currently 18. */
  const newThisWeek = useMemo(() => roster.filter((r) => r.ageMs < 7 * 86400000).length, [roster]);

  const ageBuckets = useMemo(() => {
    const out = AGE_BANDS.map((b) => ({ ...b, count: 0 }));
    roster.forEach((r) => {
      const band = bandFor(r.ageMs);
      const slot = out.find((b) => b.key === band.key);
      if (slot) slot.count += 1;
    });
    return out;
  }, [roster]);

  const filtered = useMemo(() => {
    let list = roster;
    if (statusFilter !== 'all') list = list.filter((u) => u.status === statusFilter);
    if (roleFilter !== 'all') list = list.filter((u) => u.role === roleFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (u) =>
          (u.full_name || '').toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.username || '').toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sortBy === 'newest') sorted.sort((a, b) => a.ageMs - b.ageMs);
    else if (sortBy === 'oldest') sorted.sort((a, b) => b.ageMs - a.ageMs);
    else {
      // Default: the people you still have to do something about, freshest
      // first, because a checkout abandoned this week is the one worth chasing.
      sorted.sort((a, b) => {
        if (a.status !== b.status) return a.status === 'pending' ? -1 : 1;
        return a.ageMs - b.ageMs;
      });
    }
    return sorted;
  }, [roster, statusFilter, roleFilter, searchQuery, sortBy]);

  /*
    Only unsent rows are selectable, and only unsent rows are counted in the
    send button. The backend re-filters to `incomplete_signup_*_sent_at is null`
    before it sends anything, so a selection containing already-emailed people
    was harmless but the confirmation dialog still promised to email all of
    them — "Send to all 526 filtered" when the true send was 129.
  */
  const pendingInView = useMemo(() => filtered.filter((u) => u.status === 'pending'), [filtered]);
  const allPendingSelected =
    pendingInView.length > 0 && pendingInView.every((u) => selectedIds.has(u.id));

  const toggleUser = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllPending = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPendingSelected) pendingInView.forEach((u) => next.delete(u.id));
      else pendingInView.forEach((u) => next.add(u.id));
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const sendTestMutation = useMutation({
    mutationFn: async () =>
      invoke(C.actions.test, {
        testEmail,
        ...(campaign === 'v10' || campaign === 'v11'
          ? { role: testRole, recipientName: 'Test User' }
          : {}),
      }),
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent! Check your inbox.', variant: 'success' });
      setTestEmail('');
      setShowTestEmail(false);
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => invoke(C.actions.manual, { manualEmail: email }),
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Email sent!', variant: 'success' });
      setManualEmail('');
      refreshAll();
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const resetMutation = useMutation({
    mutationFn: async () => invoke<{ reset: number }>(C.actions.reset),
    onSuccess: (data) => {
      haptic.success();
      toast({ title: `Reset ${data?.reset ?? 0} users — ready to re-send`, variant: 'success' });
      refreshAll();
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const selectedCount = selectedIds.size;
  const sendTargetCount = selectedCount > 0 ? selectedCount : pendingInView.length;

  /*
    Drive the campaign to completion across however many invocations it takes.

    V11 caps each edge-function run at 200 sends and reports `remaining`, because
    a single invocation cannot sit through 617 provider round-trips inside the
    runtime's wall clock — the V10 path tried to and would have been killed
    part-way with no record of where it stopped. Every recipient is stamped the
    instant their own send succeeds, so re-invoking resumes cleanly and nobody
    is emailed twice.

    The loop is bounded by MAX_RUNS rather than `while (!complete)` so a backend
    that stops making progress can't spin the browser forever.
  */
  const sendCampaign = async () => {
    setConfirmSend(false);
    setBatchSending(true);

    const MAX_RUNS = 12;
    let totalSent = 0;

    try {
      /*
        Only send explicit ids when the admin actually ticked people.

        This used to pass `pendingInView.map(u => u.id)` whenever nothing was
        selected — all 617 UUIDs, ~23KB of query string once the backend put
        them through a single `.in('id', …)`. PostgREST rejected the request and
        the campaign 400'd before a single email went out. With no selection the
        server already knows the eligible set; asking it to filter to a list of
        everyone was redundant as well as fatal.
      */
      const ids = selectedCount > 0 ? Array.from(selectedIds) : [];

      for (let run = 0; run < MAX_RUNS; run++) {
        const data = await invoke<{
          sent: number;
          remaining: number;
          complete?: boolean;
          message?: string;
        }>(C.actions.campaign, ids.length > 0 ? { userIds: ids } : {});

        totalSent += data?.sent ?? 0;
        setBatchProgress({ sent: totalSent, remaining: data?.remaining ?? 0 });

        // Done, or the backend stopped making progress — either way, stop.
        if (data?.complete || !data?.remaining || (data?.sent ?? 0) === 0) break;
      }

      haptic.success();
      toast({ title: `Sent ${totalSent} ${C.short} emails`, variant: 'success' });
      clearSelection();
    } catch (err: unknown) {
      haptic.error();
      toast({
        title:
          totalSent > 0
            ? `Stopped after ${totalSent} sent: ${err instanceof Error ? err.message : 'Unknown error'}`
            : `Failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setBatchSending(false);
      setBatchProgress(null);
      refreshAll();
    }
  };

  /** Fire the day-3 nudge by hand. Normally cron does this at 08:20 daily. */
  const sendNudgeMutation = useMutation({
    mutationFn: async () => {
      if (!C.actions.nudge) throw new Error('This campaign has no follow-up nudge.');
      return invoke<{ sent: number; fatigued: number; suppressed: number }>(C.actions.nudge);
    },
    onSuccess: (data) => {
      haptic.success();
      toast({
        title: data?.sent ? `Nudged ${data.sent}` : 'No nudges due',
        description:
          data?.fatigued || data?.suppressed
            ? `${data.fatigued ?? 0} skipped for email fatigue, ${data.suppressed ?? 0} unsubscribed.`
            : undefined,
        variant: 'success',
      });
      refreshAll();
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Nudge failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const loading = baseLoading || eligibleLoading;

  const statusChips: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'pending', label: 'Not emailed', count: counts.pending },
    { value: 'emailed', label: 'Emailed', count: counts.emailed },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([refetch(), refetchBase()]);
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Campaigns"
          title="Incomplete Signup"
          description="Users who entered card details but never subscribed."
          tone="yellow"
          actions={
            <IconButton
              onClick={refreshAll}
              aria-label="Refresh"
              className={cn(isFetching && 'animate-pulse')}
            >
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        {/*
          The size of the list, and how stale it is.

          What stood here was a four-cell StatStrip reading "Abandoned 0 ·
          Last 24h 0 · Emailed 427 · Recovered 27": two structural zeroes (see
          the cohort comment for the `head: true` bug that produced them) and a
          427 that belonged to a different population from the 0 beside it. The
          true shape is 526 outstanding, of which 129 have never been contacted,
          and four fifths of them abandoned between one and six months ago.
        */}
        <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Eyebrow>Abandoned checkouts</Eyebrow>
              <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                {counts.all}
              </div>
              <div className="mt-2 text-[13px] text-white">
                {counts.all === 0
                  ? loading
                    ? 'Loading the checkout cohort…'
                    : 'Nobody has an unfinished checkout.'
                  : counts.pending === 0
                    ? `Everyone has had the ${C.short} email. ${recovered} came back and subscribed.`
                    : `${counts.pending} of them have never had the ${C.short} email.`}
              </div>

              {counts.all > 0 && (
                <div className="mt-5">
                  {/* Proportional, so "mostly ancient" is legible at a glance
                      rather than something you work out row by row. */}
                  <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                    {ageBuckets
                      .filter((b) => b.count > 0)
                      .map((b, i, seg) => (
                        <div
                          key={b.key}
                          title={`${b.label}: ${b.count}`}
                          style={{
                            width: `calc(${(b.count / Math.max(counts.all, 1)) * 100}% - ${
                              (2 * (seg.length - 1)) / seg.length
                            }px)`,
                            background: b.fill,
                            borderTopLeftRadius: i === 0 ? 999 : 2,
                            borderBottomLeftRadius: i === 0 ? 999 : 2,
                            borderTopRightRadius: i === seg.length - 1 ? 999 : 2,
                            borderBottomRightRadius: i === seg.length - 1 ? 999 : 2,
                          }}
                        />
                      ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
                    {ageBuckets
                      .filter((b) => b.count > 0)
                      .map((b) => (
                        <span key={b.key} className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: b.fill }}
                          />
                          <span className="font-medium tabular-nums text-white">{b.count}</span>{' '}
                          {b.label}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {eligibleTruncated && (
                <p className="mt-4 text-[12px] text-white/60">
                  The eligible endpoint returns at most 500 rows and it is full, so the
                  emailed/not-emailed split below understates how many are still to contact.
                </p>
              )}
            </div>

            {/*
              Campaign state, and each cell is the filter it describes.
              "Recovered" is the one cell that is not a filter: those people are
              subscribed, so they have left the abandoned cohort entirely — making
              it a chip would have produced a rail whose parts exceeded its whole.
            */}
            <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              <button
                onClick={() => setStatusFilter('pending')}
                className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
              >
                <div
                  className={cn(
                    'text-[22px] font-semibold leading-none sm:text-[26px]',
                    counts.pending > 0 ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {counts.pending}
                </div>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Not emailed
                </div>
                <div className="mt-1 text-[11px] text-white/60">no {C.short} email yet</div>
              </button>

              <button
                onClick={() => setStatusFilter('emailed')}
                className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
              >
                <div className="text-[22px] font-semibold leading-none text-white sm:text-[26px]">
                  {counts.emailed}
                </div>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Emailed
                </div>
                <div className="mt-1 text-[11px] text-white/60">still not subscribed</div>
              </button>

              <div className="bg-[hsl(0_0%_9%)] px-4 py-5">
                <div
                  className="text-[22px] font-semibold leading-none sm:text-[26px]"
                  style={{ color: recovered > 0 ? SERIES.green : undefined }}
                >
                  {recovered}
                </div>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Recovered
                </div>
                <div className="mt-1 text-[11px] text-white/60">
                  {everEmailed > 0
                    ? `${recoveryRate.toFixed(1)}% of ${everEmailed} emailed`
                    : 'subscribed after the email'}
                </div>
              </div>

              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSortBy('newest');
                }}
                className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
              >
                <div className="text-[22px] font-semibold leading-none text-white sm:text-[26px]">
                  {newThisWeek}
                </div>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  New this week
                </div>
                <div className="mt-1 text-[11px] text-white/60">abandoned in last 7 days</div>
              </button>
            </div>
          </div>
        </section>

        {/*
          One filter row.

          There were two full-width rails plus a pair of 100px campaign cards
          above them: a v9/v10 card grid, then a FilterBar carrying role chips
          and search — roughly 200px of chrome before a single name appeared.
          Status is what you actually switch between so it stays as chips;
          campaign, role and sort collapse into compact selects on the same line
          with search at the end. The campaign's subject and tagline moved into
          the send card below, which is where they matter.
        */}
        <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {statusChips.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setStatusFilter(f.value)}
                  className={cn(
                    'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                    statusFilter === f.value
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.08]'
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      'ml-1.5 tabular-nums text-[11px]',
                      statusFilter === f.value ? 'text-black/60' : 'text-white/60'
                    )}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <select
                value={campaign}
                onChange={(e) => {
                  setCampaign(e.target.value as CampaignId);
                  clearSelection();
                }}
                aria-label="Campaign"
                className={selectCn}
              >
                <option value="v11">V11 — Come on then</option>
                <option value="v10">V10 — Launch Price (retired)</option>
                <option value="v9">V9 — Quick Question</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
                aria-label="Filter by role"
                className={selectCn}
              >
                <option value="all">All roles</option>
                <option value="electrician">Electrician</option>
                <option value="apprentice">Apprentice</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort by"
                className={selectCn}
              >
                <option value="action">Needs action</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or email…"
                aria-label="Search abandoned checkouts"
                className="h-9 w-[10rem] touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 text-[12px] text-white caret-elec-yellow placeholder:text-white/40 focus:border-elec-yellow focus:outline-none sm:w-56"
              />
            </div>
          </div>
        </div>

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Send controls"
            meta={<Pill tone={C.tone}>{C.label}</Pill>}
            action="Preview"
            onAction={() => setShowPreview(true)}
          />
          <div className="space-y-4 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <Eyebrow>Subject</Eyebrow>
                <p className="mt-1.5 truncate text-[14px] font-medium text-white">{C.subject}</p>
                <p className="mt-1 text-[12px] text-white">{C.tagline}</p>
                {/*
                  The backend's lifetime send count, labelled as exactly that.
                  It is 427 while the cohort shows 397 emailed, because it counts
                  every profile carrying a sent timestamp with no role or Stripe
                  filter — including the 27 who have since subscribed. Shown here
                  as campaign history, not as a slice of the 526 above.
                */}
                <p className="mt-1 text-[11px] text-white/60">
                  {stats?.sent ?? 0} {C.short} emails sent all time
                </p>
              </div>
              <button
                onClick={() => setShowTestEmail(!showTestEmail)}
                className="h-11 touch-manipulation whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-4 text-[13px] font-medium text-white hover:bg-white/[0.08]"
              >
                {showTestEmail ? 'Hide test' : 'Send test'}
              </button>
            </div>

            {C.pricing && (
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06]">
                {(['electrician', 'apprentice'] as const).map((r) => {
                  const [was, now] = C.pricing![r];
                  return (
                    <div key={r} className="bg-[hsl(0_0%_10%)] px-4 py-3">
                      <Eyebrow>{r === 'electrician' ? 'Electrician' : 'Apprentice'}</Eyebrow>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-[20px] font-semibold tabular-nums text-white">
                          {now}
                        </span>
                        <span className="text-[11px] text-white line-through">{was}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {showTestEmail && (
              <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4">
                <Eyebrow>Send test email</Eyebrow>
                {campaign === 'v10' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTestRole('electrician')}
                      className={cn(
                        'h-11 flex-1 touch-manipulation rounded-full text-[13px] font-semibold transition-colors',
                        testRole === 'electrician'
                          ? 'bg-elec-yellow text-black'
                          : 'border border-white/[0.08] bg-white/[0.04] text-white'
                      )}
                    >
                      Electrician £9.99
                    </button>
                    <button
                      onClick={() => setTestRole('apprentice')}
                      className={cn(
                        'h-11 flex-1 touch-manipulation rounded-full text-[13px] font-semibold transition-colors',
                        testRole === 'apprentice'
                          ? 'bg-elec-yellow text-black'
                          : 'border border-white/[0.08] bg-white/[0.04] text-white'
                      )}
                    >
                      Apprentice £4.99
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 flex-1 touch-manipulation rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] px-4 text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/60 focus:outline-none"
                  />
                  <button
                    onClick={() => testEmail && sendTestMutation.mutate()}
                    disabled={!testEmail || sendTestMutation.isPending}
                    aria-label="Send test email"
                    className="h-11 touch-manipulation rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black disabled:bg-white/[0.08] disabled:text-white/70"
                  >
                    {sendTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <div>
              <Eyebrow>Send manually to any email</Eyebrow>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="someone@example.com"
                  className="h-11 flex-1 touch-manipulation rounded-full border border-white/[0.08] bg-[hsl(0_0%_10%)] px-4 text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/60 focus:outline-none"
                />
                <button
                  onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                  disabled={!manualEmail || sendManualMutation.isPending}
                  aria-label="Send email manually"
                  className="h-11 touch-manipulation rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black disabled:bg-white/[0.08] disabled:text-white/70"
                >
                  {sendManualMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {batchSending && (
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                <span className="text-[13px] font-medium text-white">
                  {batchProgress
                    ? `Sent ${batchProgress.sent}${batchProgress.remaining > 0 ? ` · ${batchProgress.remaining} to go` : ''}…`
                    : 'Sending campaign…'}
                </span>
              </div>
            )}

            {C.actions.nudge && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Eyebrow>Day-3 nudge</Eyebrow>
                    <p className="mt-1 text-[12px] leading-relaxed text-white">
                      Runs automatically each morning for anyone emailed 3–7 days ago who still
                      hasn&rsquo;t subscribed. {nudgedIds.size} nudged so far.
                    </p>
                  </div>
                  <button
                    onClick={() => sendNudgeMutation.mutate()}
                    disabled={sendNudgeMutation.isPending}
                    className="h-11 shrink-0 touch-manipulation whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-4 text-[13px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-50"
                  >
                    {sendNudgeMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Run now'
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  if (confirm(`Reset all sent ${C.label} users so they can be re-sent?`)) {
                    resetMutation.mutate();
                  }
                }}
                disabled={resetMutation.isPending}
                className="inline-flex h-11 touch-manipulation items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-40"
              >
                {resetMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Reset all sent
              </button>
              {/*
                Counts only people who have not had the email. The old button
                read `filteredEligible.length`, which was the whole eligible
                list, and the new roster contains emailed people too — sending
                "all 526" would have been a promise the backend never keeps.
              */}
              <button
                onClick={() => setConfirmSend(true)}
                disabled={batchSending || sendTargetCount === 0}
                className="inline-flex h-11 touch-manipulation items-center justify-center gap-2 rounded-full bg-elec-yellow text-[13px] font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white/70"
              >
                <Send className="h-4 w-4" />
                {selectedCount > 0 ? `Send (${selectedCount})` : `Send all (${sendTargetCount})`}
              </button>
            </div>
          </div>
        </ListCard>

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title={
              statusFilter === 'pending'
                ? 'Not yet emailed'
                : statusFilter === 'emailed'
                  ? 'Already emailed'
                  : 'Abandoned checkouts'
            }
            meta={<Pill tone="yellow">{filtered.length}</Pill>}
            action={
              selectedCount > 0
                ? 'Clear selection'
                : pendingInView.length > 0
                  ? allPendingSelected
                    ? 'Deselect all'
                    : `Select ${pendingInView.length} unsent`
                  : undefined
            }
            onAction={
              selectedCount > 0
                ? clearSelection
                : pendingInView.length > 0
                  ? toggleAllPending
                  : undefined
            }
          />
          {loading ? (
            <div className="p-5">
              <LoadingBlocks />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Nothing here"
              description={
                counts.all === 0
                  ? 'No accounts have an unfinished checkout.'
                  : 'No one matches these filters. Clear the search or switch status.'
              }
            />
          ) : (
            <ListBody>
              {filtered.map((user) => {
                const selected = selectedIds.has(user.id);
                const displayName = user.full_name || user.username || 'Unknown';
                const band = bandFor(user.ageMs);
                /*
                  The row's signal is how long this checkout has been dead and
                  whether we have written to them — not a generic avatar and a
                  name. It previously showed initials, name, email, a role pill
                  and "7 months ago" in 11px grey identical to "2 hours ago", so
                  the fresh leads were indistinguishable from the fossils. The
                  age now carries the band colour used in the bar above, so the
                  list and the chart read as one thing.
                */
                return (
                  <ListRow
                    key={user.id}
                    accent={selected ? 'yellow' : undefined}
                    lead={<Avatar initials={getInitials(displayName, 'U')} online={selected} />}
                    title={
                      <span className="flex items-baseline gap-2">
                        <span className="truncate">{displayName}</span>
                        <span
                          className="ml-auto shrink-0 text-[13px] font-semibold tabular-nums"
                          style={{ color: band.fill }}
                          title={`Signed up ${formatDistanceToNow(parseISO(user.created_at), {
                            addSuffix: true,
                          })}`}
                        >
                          {ageLabel(user.ageMs)}
                        </span>
                      </span>
                    }
                    subtitle={
                      <span className="flex items-baseline gap-1.5">
                        {user.status === 'pending' && (
                          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                            Not emailed
                          </span>
                        )}
                        <span className="truncate text-white">{user.email}</span>
                        <span className="ml-auto hidden shrink-0 text-[10px] uppercase tracking-[0.12em] text-white/60 sm:inline">
                          {user.status === 'emailed'
                            ? user.sentAt
                              ? `sent ${formatDistanceToNow(parseISO(user.sentAt))} ago`
                              : 'sent'
                            : user.role || 'unknown'}
                        </span>
                      </span>
                    }
                    trailing={
                      user.status === 'pending' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleUser(user.id);
                          }}
                          className={cn(
                            'h-7 touch-manipulation rounded-full border px-2.5 text-[11px] font-medium transition-colors',
                            selected
                              ? 'border-elec-yellow bg-elec-yellow text-black'
                              : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                          )}
                        >
                          {selected ? 'Selected' : 'Select'}
                        </button>
                      ) : undefined
                    }
                    onClick={() => setSelectedUser(user)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent
            side="bottom"
            className="h-[50vh] rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <Avatar initials={getInitials(selectedUser?.full_name, 'U')} />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-white">
                      {selectedUser?.full_name || 'Unknown'}
                    </p>
                    <p className="truncate text-[12px] font-normal text-white">
                      {selectedUser?.email}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                <ListCard>
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Role</span>
                      <span className="text-[12px] capitalize text-white">
                        {selectedUser?.role || 'unknown'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Abandoned</span>
                      <span className="text-[12px] tabular-nums text-white">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    {/* Was missing entirely: the one thing you need before
                        deciding to send is whether they have already had it. */}
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">{C.short} email</span>
                      <span className="text-[12px] text-white">
                        {selectedUser?.status === 'pending'
                          ? 'Never sent'
                          : selectedUser?.sentAt
                            ? format(parseISO(selectedUser.sentAt), 'dd MMM yyyy')
                            : 'Sent'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Username</span>
                      <span className="max-w-[60%] truncate text-[12px] text-white">
                        {selectedUser?.username || '—'}
                      </span>
                    </div>
                  </div>
                </ListCard>
                {selectedUser?.status === 'pending' && (
                  <button
                    onClick={() => {
                      toggleUser(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="h-11 w-full touch-manipulation rounded-full bg-elec-yellow text-[13px] font-semibold text-black"
                  >
                    {selectedIds.has(selectedUser.id)
                      ? 'Remove from selection'
                      : 'Add to selection'}
                  </button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5 sm:max-w-lg sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base leading-tight text-white sm:text-lg">
                Send {C.label} to {sendTargetCount} {sendTargetCount === 1 ? 'person' : 'people'}?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="text-white">
                    {selectedCount > 0
                      ? `${selectedCount} selected, all of whom have never had this email.`
                      : `Everyone in the current filter who has not had it yet${
                          roleFilter !== 'all' ? ` (${roleFilter}s only)` : ''
                        }.`}
                  </p>
                  {/*
                    The dialog never mentioned suppression. The edge function
                    drops any address in `email_suppressions` before sending —
                    4 of today's 129 — so the number sent is legitimately lower
                    than the number promised here, and that used to look like a
                    failure rather than PECR compliance working.
                  */}
                  <p className="text-xs text-white">
                    {campaign === 'v11'
                      ? 'Sent 5 at a time, up to 200 per run, resuming automatically until the list is clear. Unsubscribed and bounced addresses are skipped, so the number actually sent may be lower.'
                      : 'Batched 10 at a time, 2s between batches. Unsubscribed and bounced addresses are skipped, so the number actually sent may be lower.'}
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row sm:gap-2">
              <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-full border border-white/[0.08] bg-white/[0.04] text-sm text-white hover:bg-white/[0.08] sm:w-auto">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={sendCampaign}
                className="h-11 w-full touch-manipulation rounded-full bg-elec-yellow text-sm font-semibold text-black hover:bg-elec-yellow/90 sm:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                Send to {sendTargetCount}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-3">
                <SheetTitle className="flex items-center gap-2 text-[13px] text-white">
                  <Eye className="h-4 w-4 text-white" />
                  Preview: {previewData?.subject ?? C.subject}
                  <Pill tone={C.tone}>{C.label}</Pill>
                </SheetTitle>
              </SheetHeader>
              {/*
                V11 previews the REAL email: `get_v11_preview` runs the same
                generator the send path runs and returns its HTML. The V9/V10
                blocks below are hand-written lookalikes, which is exactly how
                V10's preview ended up still advertising £14.99 and a deadline
                in April — nothing forced it to track the template.
              */}
              <div className="flex-1 overflow-hidden bg-black">
                {C.actions.preview && previewLoading && (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
                  </div>
                )}
                <iframe
                  title="Email Preview"
                  sandbox="allow-same-origin"
                  className={cn(
                    'h-full w-full border-0',
                    C.actions.preview && previewLoading && 'hidden'
                  )}
                  srcDoc={
                    C.actions.preview
                      ? (previewData?.html ??
                        '<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"></head><body style="margin:0;padding:40px;background:#000;color:#fff;font-family:-apple-system,system-ui,sans-serif;font-size:14px">Could not load the preview. Send a test email instead.</body></html>')
                      : campaign === 'v10'
                        ? `<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:48px 24px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;min-height:90vh}.pill{padding:6px 14px;background:rgba(16,185,129,0.14);border:1px solid rgba(16,185,129,0.4);border-radius:999px;color:#34d399;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.4px}h1{margin:8px 0 4px;font-size:28px;font-weight:800;line-height:1.1}h1 span{color:#34d399}.card{width:100%;max-width:340px;padding:20px;background:linear-gradient(180deg,rgba(16,185,129,0.08),rgba(16,185,129,0.02));border:1px solid rgba(16,185,129,0.28);border-radius:18px;margin-top:12px}.old{font-size:13px;opacity:0.55;text-decoration:line-through;text-decoration-color:#f87171}.new{font-size:44px;font-weight:800;color:#34d399;letter-spacing:-1px;margin:4px 0 2px}.mo{font-size:16px;color:#fff;opacity:0.7;font-weight:600}.cta{display:inline-block;margin-top:20px;padding:14px 28px;background:#34d399;border-radius:12px;font-weight:800;color:#000;text-decoration:none;font-size:14px}p.note{margin-top:12px;font-size:11px;color:#fff;opacity:0.5}</style></head><body><div class="pill">Ends Sunday 26 April</div><h1>Your launch price,<br><span>just for you.</span></h1><p style="opacity:0.7;font-size:13px;max-width:320px;margin:0">Send a test email to see the real template rendered in your inbox.</p><div class="card"><div style="font-size:11px;color:#34d399;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px">Elec-Mate Electrician</div><span class="old">£14.99/mo normally</span><div class="new">£9.99<span class="mo">/mo</span></div><div style="font-size:10px;opacity:0.5;letter-spacing:0.4px;text-transform:uppercase;margin-top:10px">Locked in &middot; Cancel anytime</div></div><a class="cta" href="#">Claim £9.99/month &rarr;</a><p class="note">Secure checkout via Stripe &middot; No code to enter</p></body></html>`
                        : `<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#e2e8f0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin-bottom:8px;font-size:24px}p{color:#fff;font-size:14px;line-height:1.6;max-width:300px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}</style></head><body><div class="badge">V9 &mdash; Quick Question</div><h2>We&rsquo;re on the App Store.</h2><p>Send a test email to preview the full rendered template in your inbox.</p></body></html>`
                  }
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
