import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow, parseISO, format, differenceInDays } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  PageFrame,
  PageHero,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Eyebrow,
  Divider,
  EmptyState,
  LoadingBlocks,
  IconButton,
} from '@/components/admin/editorial';
import { RefreshCw, Send, Loader2, Mail, RotateCcw, Wrench } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   Shapes returned by the `send-apprentice-campaign` edge function.

   `last_sign_in` and `apprentice_campaign_sent_at` were declared optional
   (`?: string`) but the function emits them as `string | null` on every row —
   `last_sign_in: lastSignInMap.get(p.id) || null`. TypeScript therefore let
   `parseISO(user.last_sign_in)` typecheck against a value that is null for a
   user who has never signed in, and the only thing standing between that and a
   crash was a truthiness guard someone happened to write. Declared honestly so
   the compiler enforces the guard instead of the author remembering it.
   ──────────────────────────────────────────────────────────────────────────── */
interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string | null;
  /* Sourced from auth.users via the `get_auth_user_emails` RPC inside the edge
     function, NOT from profiles — profiles has no email column at all. The
     function then drops any row where the join produced nothing, which is the
     origin of the count mismatch documented on `audience` below. */
  email: string;
  created_at: string;
  last_sign_in: string | null;
  apprentice_campaign_sent_at: string | null;
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string | null;
  created_at: string;
  apprentice_campaign_sent_at: string;
  apprentice_campaign_type: string;
  subscribed: boolean;
}

interface CampaignStats {
  totalEligible: number;
  offersSent: number;
  conversions: number;
  /** The edge function returns `.toFixed(1)`, i.e. a string such as "12.1". */
  conversionRate: string;
}

const EMAIL_VERSIONS = {
  v1: { label: 'v1 — Full feature list', description: 'Comprehensive breakdown of every feature' },
  v2: { label: 'v2 — Short and punchy', description: 'Quick pitch with pricing upfront' },
  v3: {
    label: 'v3 — Personal from Andrew',
    description: "Friendly, personal tone acknowledging they've been away",
  },
} as const;

type EmailVersion = keyof typeof EMAIL_VERSIONS;

/* The validated dark-surface series, in the same order and with the same
   severity reading as the sibling admin pages (AdminUserMessages). Green is
   best, red is worst. No orange or brown anywhere on this page: the previous
   build used `Pill tone="orange"` for "Pending" in the sent history and for
   "days since trial" in the detail sheet, both off-palette. */
const SERIES = ['#199E70', '#3987E5', '#FAB219', '#E66767'] as const;

const DAY_MS = 86_400_000;

/**
 * How recently the apprentice actually opened the app.
 *
 * This is the single most decision-relevant fact on the page and it was being
 * thrown away. `get_eligible` returns `last_sign_in` on every row; the old page
 * rendered it in exactly one place — an optional line inside the per-user
 * detail sheet — and never sorted, filtered, counted or coloured by it. So the
 * list put someone who was in the app yesterday and someone who has not opened
 * it since February side by side, in the same weight, in signup order.
 */
const ENGAGEMENT_BANDS = [
  { key: 'week', label: 'in the app this week', maxDays: 7, fill: SERIES[0] },
  { key: 'month', label: 'in the past month', maxDays: 30, fill: SERIES[1] },
  { key: 'quarter', label: 'in the past 3 months', maxDays: 90, fill: SERIES[2] },
  {
    key: 'dormant',
    label: 'gone over 3 months',
    maxDays: Number.POSITIVE_INFINITY,
    fill: SERIES[3],
  },
] as const;

type EngagementBand = (typeof ENGAGEMENT_BANDS)[number];

/**
 * How long ago their 7-day trial ran out. The second axis: engagement says
 * whether they are reachable, lapse says how long the offer has been on the
 * table. The old page split this into two tabs at an arbitrary 30 days, which
 * is neither of the two edges that matter (a fortnight, and a quarter).
 */
const LAPSE_BANDS = [
  { value: 'all', label: 'Any time since trial', min: 0, max: Number.POSITIVE_INFINITY },
  { value: 'fresh', label: 'Lapsed under 2 weeks', min: 0, max: 14 },
  { value: 'mid', label: 'Lapsed 2–6 weeks', min: 15, max: 45 },
  { value: 'old', label: 'Lapsed 6 weeks–3 months', min: 46, max: 90 },
  { value: 'stale', label: 'Lapsed over 3 months', min: 91, max: Number.POSITIVE_INFINITY },
] as const;

type LapseValue = (typeof LAPSE_BANDS)[number]['value'];

/** A row with every derived figure computed once, rather than three times per
    render inside JSX as the old list did (it recomputed `differenceInDays`
    twice per row in the body and again for every row in `tabCounts`). */
interface AudienceRow extends EligibleUser {
  /** Days since the 7-day trial ended. Clamped at 0. */
  lapsedDays: number;
  /** Days since last sign-in; Infinity when they have never signed in. */
  seenDays: number;
  band: EngagementBand;
}

function getInitials(name: string | null | undefined, fallback = '?') {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Compact age in words: "3d", "5w", "7mo". */
function ageLabel(days: number): string {
  if (!Number.isFinite(days)) return 'never';
  if (days < 1) return 'today';
  if (days < 14) return `${days}d`;
  if (days < 60) return `${Math.floor(days / 7)}w`;
  return `${Math.floor(days / 30)}mo`;
}

export default function AdminApprenticeCampaigns() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState<'all' | 'warm' | 'cold'>('all');
  const [lapseFilter, setLapseFilter] = useState<LapseValue>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<AudienceRow | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showSentHistory, setShowSentHistory] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [emailVersion, setEmailVersion] = useState<EmailVersion>('v3');

  const campaignType = 'trial_winback' as const;

  const {
    data: stats,
    isFetching: statsFetching,
    refetch,
  } = useQuery<CampaignStats>({
    queryKey: ['apprentice-campaign-stats', campaignType],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_stats', campaignType },
      });
      if (error) throw error;
      return data as CampaignStats;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const { data: eligibleUsers, isLoading: usersLoading } = useQuery<EligibleUser[]>({
    queryKey: ['apprentice-campaign-eligible', campaignType],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_eligible', campaignType },
      });
      if (error) throw error;
      return (data?.users ?? []) as EligibleUser[];
    },
    staleTime: 30000,
  });

  /*
    Loaded up front rather than only when the history sheet is opened.

    It used to carry `enabled: showSentHistory`, so nothing on the page could
    reconcile the sent side against anything: the "Campaign history" card
    reported `offersSent` straight from get_stats and had no idea whether the
    rows behind it agreed. One 100-row call on page load buys the date of the
    last send, the client-side campaign-type filter below, and the truncation
    warning — all of which the page previously could not compute.
  */
  const { data: sentUsersRaw, isLoading: sentLoading } = useQuery<SentUser[]>({
    queryKey: ['apprentice-campaign-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_sent_history' },
      });
      if (error) throw error;
      return (data?.users ?? []) as SentUser[];
    },
    staleTime: 30000,
  });

  /*
    The sent history and the number above it counted different populations.

    `get_sent_history` filters on nothing but `apprentice_campaign_sent_at IS
    NOT NULL` — no campaign-type predicate — and caps the result at 100 rows.
    Live that is 162 people (140 trial_winback + 22 feature_spotlight) sliced to
    100, displayed under a header pill reading `offersSent`, which get_stats
    computes as `apprentice_campaign_type === ct` and is therefore 140. Three
    numbers, one of them shown, none of them describing the list underneath.

    Filtering client-side to the campaign this page manages makes the list and
    its count describe the same set. The 100-row server cap cannot be fixed from
    here, so it is surfaced rather than hidden.
  */
  const sentUsers = useMemo(
    () => (sentUsersRaw ?? []).filter((u) => u.apprentice_campaign_type === campaignType),
    [sentUsersRaw]
  );
  const sentHistoryTruncated = (sentUsersRaw?.length ?? 0) >= 100;

  /*
    Email addresses for the sent-history rows.

    `get_sent_history` selects `id, full_name, username, created_at,
    apprentice_campaign_sent_at, apprentice_campaign_type, subscribed` from
    profiles — and cannot select email, because profiles has no email column;
    it lives on auth.users. So the history sheet identified people by display
    name alone, and two apprentices called "Josh" were indistinguishable rows.
    `admin-get-users` is the one call that joins profiles to auth.users, and the
    admin app already holds it in cache, so this reads that rather than issuing
    a `profiles.email` query that would silently answer null.
  */
  const { data: allAdminUsers } = useAdminUsersBase();
  const adminUserById = useMemo(() => {
    const map = new Map<string, { email?: string; tier?: string }>();
    (allAdminUsers ?? []).forEach((u) =>
      map.set(u.id, { email: u.email, tier: u.subscription_tier })
    );
    return map;
  }, [allAdminUsers]);

  const campaignParams = {
    campaignType,
    email_version: emailVersion,
  };

  const sendSingleMutation = useMutation({
    mutationFn: async (uid: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_single', userId: uid, ...campaignParams },
      });
      if (error) throw error;
      return data as { success: boolean; email: string };
    },
    /*
      Second argument is the user id the mutation was called with.

      This used to clear the selection with `next.delete(data.email)` — deleting
      an email address from a Set that only ever contains user ids
      (`toggleUserSelection(user.id)`, `filteredUsers.map((u) => u.id)`), and
      `send_single` returns `{ success, email }` with no id in it at all. The
      delete therefore matched nothing, every time. A person you emailed
      individually stayed ticked, and the next "Send to N" bulk send emailed
      them a second copy of the same win-back. Keyed on the id now.
    */
    onSuccess: (data, uid) => {
      haptic.success();
      toast({ title: `Win-back email sent to ${data.email}`, variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] });
      setSelectedUser(null);
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        next.delete(uid);
        return next;
      });
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to send email', variant: 'destructive' });
    },
  });

  const sendBulkMutation = useMutation({
    mutationFn: async (uids: string[]) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_bulk', userIds: uids, ...campaignParams },
      });
      if (error) throw error;
      return data as { sent: number; failed?: number; skipped?: number };
    },
    onSuccess: (data) => {
      haptic.success();
      const attempted = data.sent + (data.failed ?? 0);
      toast({
        title: `Sent ${data.sent} of ${attempted} emails${data.failed ? ` (${data.failed} failed)` : ''}`,
        variant: data.failed ? 'warning' : 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] });
      setSelectedUsers(new Set());
      setConfirmSendAll(false);
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Bulk send failed', variant: 'destructive' });
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_test', testEmail: email, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent', variant: 'success' });
      setTestEmail('');
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to send test email', variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_manual', manualEmail: email, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Email sent', variant: 'success' });
      setManualEmail('');
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to send email', variant: 'destructive' });
    },
  });

  const resetSentMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'reset_sent' },
      });
      if (error) throw error;
      return data as { reset: number; message?: string };
    },
    onSuccess: (data) => {
      haptic.success();
      toast({ title: data.message || `${data.reset} users reset`, variant: 'success' });
      setConfirmReset(false);
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] });
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to reset sent status', variant: 'destructive' });
      setConfirmReset(false);
    },
  });

  /* ── Derived audience ─────────────────────────────────────────────────── */

  const rows = useMemo<AudienceRow[]>(() => {
    const now = Date.now();
    return (eligibleUsers ?? []).map((u) => {
      const lapsedDays = Math.max(0, differenceInDays(now, parseISO(u.created_at)) - 7);
      const seenDays = u.last_sign_in
        ? Math.max(0, differenceInDays(now, parseISO(u.last_sign_in)))
        : Number.POSITIVE_INFINITY;
      const band =
        ENGAGEMENT_BANDS.find((b) => seenDays <= b.maxDays) ??
        ENGAGEMENT_BANDS[ENGAGEMENT_BANDS.length - 1];
      return { ...u, lapsedDays, seenDays, band };
    });
  }, [eligibleUsers]);

  /*
    Every figure on this page now comes from `rows` — the list you can actually
    tick and send to — except the two the list genuinely cannot know (how many
    have already been emailed, and how many of those subscribed afterwards).

    They used to come from two sources that count two different populations.
    get_stats counts eligible profiles straight out of `profiles`; get_eligible
    runs the identical predicate but then maps through the auth-email join and
    drops every row the join missed (`.filter((u) => u.email)`). The headline
    "Apprentices 137" and the All tab beside it were therefore two different
    numbers for the same thing, and only ever agreed by luck. Deriving both from
    the list makes them reconcile by construction, and `countsDisagree` below
    surfaces the gap instead of letting the page quietly show a figure it cannot
    send to.
  */
  const audience = useMemo(() => {
    const total = rows.length;
    const warm = rows.filter((r) => r.seenDays <= 30).length;
    // warm + cold === total, by construction. The chip rail depends on it.
    const cold = total - warm;
    const previouslyContacted = rows.filter((r) => r.apprentice_campaign_sent_at).length;

    const bands = ENGAGEMENT_BANDS.map((b) => ({
      ...b,
      count: rows.filter((r) => r.band.key === b.key).length,
    }));

    const lapseCounts = Object.fromEntries(
      LAPSE_BANDS.map((b) => [
        b.value,
        b.value === 'all'
          ? total
          : rows.filter((r) => r.lapsedDays >= b.min && r.lapsedDays <= b.max).length,
      ])
    ) as Record<LapseValue, number>;

    /* Signup window, by reduce rather than `Math.min(...dates)` — the spread
       form blows the argument limit once the eligible list gets long, and this
       list is unbounded (get_eligible applies no LIMIT). */
    let earliest = Number.POSITIVE_INFINITY;
    let latest = 0;
    rows.forEach((r) => {
      const t = new Date(r.created_at).getTime();
      if (t < earliest) earliest = t;
      if (t > latest) latest = t;
    });

    return {
      total,
      warm,
      cold,
      previouslyContacted,
      bands,
      lapseCounts,
      window: total > 0 ? { earliest: new Date(earliest), latest: new Date(latest) } : null,
    };
  }, [rows]);

  const offersSent = stats?.offersSent ?? 0;
  const conversions = stats?.conversions ?? 0;
  const conversionRate = stats?.conversionRate ?? '0';
  /* Non-zero only when the auth-email join drops somebody — i.e. exactly the
     mismatch described on `audience`. Shown, never silently absorbed. */
  const countsDisagree =
    !usersLoading && stats ? Math.max(0, stats.totalEligible - audience.total) : 0;

  const lastSentAt = sentUsers[0]?.apprentice_campaign_sent_at ?? null;

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const lapse = LAPSE_BANDS.find((b) => b.value === lapseFilter) ?? LAPSE_BANDS[0];

    const filtered = rows.filter((r) => {
      if (segment === 'warm' && r.seenDays > 30) return false;
      if (segment === 'cold' && r.seenDays <= 30) return false;
      if (lapse.value !== 'all' && (r.lapsedDays < lapse.min || r.lapsedDays > lapse.max))
        return false;
      if (q) {
        const hit =
          r.full_name?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.username?.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });

    /*
      Most recently active first.

      There was no client sort at all, so the order fell out of the edge
      function's `order('created_at', { ascending: false })` — newest signup
      first. That is the opposite of useful for a win-back: the person who
      opened the app yesterday and never paid is the likeliest conversion on the
      page and could be sitting six screens down because they joined in March.
    */
    return filtered.sort((a, b) => a.seenDays - b.seenDays);
  }, [rows, search, segment, lapseFilter]);

  const visibleIds = useMemo(() => new Set(visible.map((r) => r.id)), [visible]);
  /* Filters can hide a ticked row. "Send to 40" while 3 rows are on screen is
     alarming unless the page says where the other 37 went. */
  const selectedHidden = useMemo(
    () => Array.from(selectedUsers).filter((id) => !visibleIds.has(id)).length,
    [selectedUsers, visibleIds]
  );
  const allVisibleSelected = visible.length > 0 && visible.every((r) => selectedUsers.has(r.id));

  const toggleUserSelection = (uid: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      // Scoped to what is on screen: the old version replaced the whole
      // selection, so ticking "select all" under a filter silently discarded
      // everything you had picked under the previous filter.
      if (allVisibleSelected) visible.forEach((r) => next.delete(r.id));
      else visible.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const clearFilters = () => {
    setSegment('all');
    setLapseFilter('all');
    setSearch('');
  };

  const heroCells = [
    {
      label: 'Ready to contact',
      value: usersLoading ? '—' : audience.total,
      sub: 'trial over, never emailed',
      accent: true,
      onClick: clearFilters,
    },
    {
      /*
        Replaces "Active", which read `Math.max(0, totalEligible - offersSent)`.

        get_stats excludes anyone with `apprentice_campaign_type ===
        'trial_winback'` from its eligible count, so eligible and sent are
        disjoint sets and subtracting one from the other measures nothing. On
        live data it is max(0, 137 − 140) — the cell renders a hard 0, and once
        you have sent more emails than there are people left to email it is
        pinned at 0 for ever. Replaced with the segment that actually decides
        who to email first: apprentices who are still opening the app.
      */
      label: 'Still active',
      value: usersLoading ? '—' : audience.warm,
      sub: 'opened the app in 30 days',
      onClick: () => setSegment('warm'),
    },
    {
      label: 'Emails sent',
      value: offersSent,
      sub: lastSentAt ? `last ${format(parseISO(lastSentAt), 'd MMM')}` : 'all time',
      onClick: () => setShowSentHistory(true),
    },
    {
      /* Was rendered as `${conversionRate}` with no unit — "12.1" beside three
         plain counts reads as twelve people, not twelve per cent. */
      label: 'Subscribed after',
      value: `${conversionRate}%`,
      sub: `${conversions} of ${offersSent} emailed`,
      onClick: () => setShowSentHistory(true),
    },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] }),
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] }),
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] }),
        ]);
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Campaigns"
          title="Apprentice Campaigns"
          description="Win-back outreach to apprentices whose 7-day trial ran out."
          tone="yellow"
          actions={
            <IconButton onClick={() => refetch()} disabled={statsFetching} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', statsFetching && 'animate-spin')} />
            </IconButton>
          }
        />

        {/*
          The audience, and how reachable it still is.

          The page used to open with a four-cell StatStrip (Apprentices /
          Active / Campaigns Sent / Conversion) followed by a separate
          "Audience window" prose card, followed by a filter bar, followed by a
          whole ListCard of three radio rows for picking one of three email
          versions — four stacked blocks before the first name appeared. Two of
          the four figures were wrong: "Active" was a subtraction of disjoint
          sets that evaluates to 0, and "Conversion" printed a percentage
          without its sign. The window prose said "137 apprentices signed up
          between …" using a count from one query and dates from another.

          One block now: the number, the sentence, the reachability split, and
          four cells that are also the filters.
        */}
        <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Eyebrow>Ready to contact</Eyebrow>
              <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                {usersLoading ? '—' : audience.total}
              </div>
              <div className="mt-2 text-[13px] leading-relaxed text-white">
                {usersLoading
                  ? 'Loading the audience…'
                  : audience.total === 0
                    ? 'Nobody is waiting on a win-back. Everyone whose trial has lapsed has been emailed.'
                    : `${audience.total} apprentice${audience.total === 1 ? '' : 's'} finished the 7-day trial without subscribing${
                        audience.window
                          ? `, signing up between ${format(audience.window.earliest, 'd MMM')} and ${format(audience.window.latest, 'd MMM yyyy')}`
                          : ''
                      }. ${audience.warm} of them still opened the app in the last 30 days.`}
              </div>

              {countsDisagree > 0 && (
                /* See `audience` — get_stats counted profiles, get_eligible
                   counted profiles that survived the auth-email join. */
                <div className="mt-2 text-[12px] text-white/60">
                  {countsDisagree} further apprentice{countsDisagree === 1 ? '' : 's'} match the
                  criteria but have no email address on their account, so they cannot be contacted
                  and are not listed.
                </div>
              )}

              {audience.total > 0 && (
                <div className="mt-5">
                  {/* Reachability, proportionally. Someone who was in the app
                      this morning and someone last seen in February were
                      identical rows in identical order before this. */}
                  <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                    {audience.bands
                      .filter((b) => b.count > 0)
                      .map((b, i, seg) => (
                        <div
                          key={b.key}
                          title={`${b.label}: ${b.count}`}
                          style={{
                            width: `calc(${(b.count / Math.max(audience.total, 1)) * 100}% - ${
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
                    {audience.bands
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
            </div>

            <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {heroCells.map((c) => (
                <button
                  key={c.label}
                  onClick={c.onClick}
                  className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
                >
                  <div
                    className={cn(
                      'text-[22px] font-semibold leading-none sm:text-[26px]',
                      c.accent && audience.total > 0 ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {c.value}
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[11px] text-white/60">{c.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/*
          One filter row.

          Before: a FilterBar with three tabs, then a `Divider` labelled with
          the current email version, then a full ListCard containing three radio
          rows to change it — three separate horizontal bands of controls, one
          of which was a whole card spent on a three-way choice. Segment chips
          (which partition the audience exactly: warm + cold = all), a lapse
          select and the search box now share a single line; the email version
          moved down to the send bar, where it is actually applied.
        */}
        <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {(
                [
                  { value: 'all', label: 'All', count: audience.total },
                  { value: 'warm', label: 'Still active', count: audience.warm },
                  { value: 'cold', label: 'Gone quiet', count: audience.cold },
                ] as const
              ).map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setSegment(t.value)}
                  className={cn(
                    'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                    segment === t.value
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.08]'
                  )}
                >
                  {t.label}
                  <span className="ml-1.5 text-[11px] tabular-nums opacity-70">{t.count}</span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <select
                value={lapseFilter}
                onChange={(e) => setLapseFilter(e.target.value as LapseValue)}
                aria-label="Filter by how long ago the trial lapsed"
                className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
              >
                {LAPSE_BANDS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label} ({audience.lapseCounts[b.value] ?? 0})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowTools(true)}
                className="flex h-9 shrink-0 touch-manipulation items-center gap-1.5 rounded-full border border-white/[0.12] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                <Wrench className="h-3.5 w-3.5" />
                Tools
              </button>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or email…"
                aria-label="Search apprentices"
                className="h-9 w-[9.5rem] touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 text-[12px] text-white caret-elec-yellow placeholder:text-white/40 focus:border-elec-yellow focus:outline-none sm:w-52"
              />
            </div>
          </div>
        </div>

        {usersLoading ? (
          <LoadingBlocks />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Win-back audience"
              meta={
                <Pill tone="yellow">
                  {visible.length}
                  {visible.length !== audience.total ? ` of ${audience.total}` : ''}
                </Pill>
              }
              action="Sent history"
              onAction={() => setShowSentHistory(true)}
            />

            {visible.length > 0 && (
              /*
                Select-all, email version and send, on one bar.

                The old page put select-all here, the send button here AND in
                the card header, and the email version in a separate card two
                sections up — so the version being applied was off-screen at the
                moment you pressed Send. Everything that determines what gets
                sent is now within one line of the button that sends it.
              */
              <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-4 py-2.5 sm:px-5">
                <label className="flex h-11 cursor-pointer touch-manipulation items-center gap-3">
                  <Checkbox
                    checked={allVisibleSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all shown"
                    className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-[12px] font-medium text-white">
                    {selectedUsers.size > 0
                      ? `${selectedUsers.size} selected${selectedHidden > 0 ? ` · ${selectedHidden} hidden by filters` : ''}`
                      : 'Select all shown'}
                  </span>
                </label>

                <div className="ml-auto flex items-center gap-2">
                  <select
                    value={emailVersion}
                    onChange={(e) => setEmailVersion(e.target.value as EmailVersion)}
                    aria-label="Email version to send"
                    className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                  >
                    {(Object.keys(EMAIL_VERSIONS) as EmailVersion[]).map((v) => (
                      <option key={v} value={v}>
                        {EMAIL_VERSIONS[v].label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => selectedUsers.size > 0 && setConfirmSendAll(true)}
                    disabled={selectedUsers.size === 0 || sendBulkMutation.isPending}
                    className="inline-flex h-9 shrink-0 touch-manipulation items-center gap-1.5 rounded-full border border-elec-yellow/30 bg-elec-yellow/10 px-3 text-[12px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/20 disabled:opacity-40"
                  >
                    {sendBulkMutation.isPending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    Send {selectedUsers.size > 0 ? selectedUsers.size : ''}
                  </button>
                </div>
              </div>
            )}

            {visible.length === 0 ? (
              <div className="p-4 sm:p-6">
                <EmptyState
                  title={audience.total === 0 ? 'Nobody to win back' : 'No apprentices match'}
                  description={
                    audience.total === 0
                      ? 'Every apprentice whose trial has lapsed has already had a win-back email.'
                      : 'No one matches the current segment, lapse window and search.'
                  }
                  action={audience.total === 0 ? undefined : 'Clear filters'}
                  onAction={audience.total === 0 ? undefined : clearFilters}
                />
              </div>
            ) : (
              <ListBody>
                {visible.map((user) => {
                  /*
                    The row carries the two facts that decide whether to email
                    this person and the one that says whether we already have.

                    It used to be avatar + name + "email · signup date" + a
                    "47d lapsed" pill — a generic contact row that said nothing
                    about the campaign. Last-seen leads (coloured by band, same
                    scale as the hero bar), lapse and prior contact sit under
                    it, and the avatar is gone: initials add nothing when every
                    row is a stranger being cold-emailed.
                  */
                  const contacted = user.apprentice_campaign_sent_at;
                  return (
                    <ListRow
                      key={user.id}
                      accent={user.seenDays <= 30 ? 'yellow' : undefined}
                      lead={
                        <Checkbox
                          checked={selectedUsers.has(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select ${user.full_name || user.username || 'apprentice'}`}
                          className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                        />
                      }
                      // Everything in title/subtitle, nothing in `trailing`:
                      // ListRow's trailing slot is shrink-0 while the text block
                      // is flex-1 min-w-0, so a pill there eats the row on a
                      // phone and the name and address collapse to ellipses.
                      title={
                        <span className="flex items-baseline gap-2">
                          <span className="truncate font-medium">
                            {user.full_name || user.username || 'Unknown'}
                          </span>
                          <span
                            className="ml-auto shrink-0 text-[13px] font-semibold tabular-nums"
                            style={{ color: user.band.fill }}
                            title={
                              Number.isFinite(user.seenDays)
                                ? `Last opened the app ${ageLabel(user.seenDays)} ago`
                                : 'Has never signed in'
                            }
                          >
                            {Number.isFinite(user.seenDays)
                              ? `seen ${ageLabel(user.seenDays)}`
                              : 'never seen'}
                          </span>
                        </span>
                      }
                      subtitle={
                        <span className="flex items-baseline gap-1.5">
                          <span className="truncate text-white">{user.email}</span>
                          <span className="ml-auto shrink-0 text-[11px] text-white/60">
                            {contacted
                              ? `contacted ${format(parseISO(contacted), 'd MMM')}`
                              : `${ageLabel(user.lapsedDays)} lapsed`}
                          </span>
                        </span>
                      }
                      onClick={() => setSelectedUser(user)}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>
        )}

        {/* ── Tools ─────────────────────────────────────────────────────── */}
        <Sheet open={showTools} onOpenChange={setShowTools}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl bg-[hsl(0_0%_10%)] p-0">
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                {/* Was labelled "New Campaign", which it never was — nothing in
                    here creates a campaign. It sends a test, sends to one
                    address, or resets the sent flags. */}
                <SheetTitle className="text-left text-white">Campaign tools</SheetTitle>
                <p className="text-left text-[12.5px] text-white">
                  Sending {EMAIL_VERSIONS[emailVersion].label}.{' '}
                  {EMAIL_VERSIONS[emailVersion].description}.
                </p>
              </SheetHeader>
              <div className="flex-1 space-y-6 overflow-y-auto p-5">
                <div>
                  <Eyebrow>Send test email</Eyebrow>
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="h-11 flex-1 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    <Button
                      onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                      disabled={!testEmail || sendTestMutation.isPending}
                      aria-label="Send test email"
                      className="h-11 touch-manipulation bg-elec-yellow px-4 text-black hover:bg-elec-yellow/90"
                    >
                      {sendTestMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="mt-2 text-[11.5px] text-white/60">
                    Preview it in your own inbox. Does not mark anybody as contacted.
                  </p>
                </div>

                <Divider />

                <div>
                  <Eyebrow>Send to any address</Eyebrow>
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="anyone@email.com"
                      className="h-11 flex-1 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_12%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    <Button
                      onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                      disabled={!manualEmail || sendManualMutation.isPending}
                      aria-label="Send to this address"
                      className="h-11 touch-manipulation bg-elec-yellow px-4 text-black hover:bg-elec-yellow/90"
                    >
                      {sendManualMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Divider />

                <div>
                  <Eyebrow>Reset sent status</Eyebrow>
                  <p className="mt-2 text-[12px] leading-relaxed text-white">
                    Clears the sent flag on every unsubscribed apprentice emailed more than 24 hours
                    ago, putting all {offersSent} of them back into the audience so a new template
                    can go out.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setConfirmReset(true)}
                    disabled={resetSentMutation.isPending}
                    className="mt-3 h-11 w-full touch-manipulation gap-2 border-white/[0.08] bg-transparent text-white hover:bg-white/[0.04]"
                  >
                    {resetSentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                    Reset sent status
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ── Sent history ──────────────────────────────────────────────── */}
        <Sheet open={showSentHistory} onOpenChange={setShowSentHistory}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl bg-[hsl(0_0%_10%)] p-0">
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle className="text-left text-white">Sent history</SheetTitle>
                <p className="text-left text-[12.5px] text-white">
                  {sentUsers.length} win-back email{sentUsers.length === 1 ? '' : 's'} ·{' '}
                  {conversions} subscribed afterwards ({conversionRate}%)
                  {sentHistoryTruncated
                    ? ' · showing the 100 most recent sends only, the server caps the list'
                    : ''}
                </p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5">
                {sentLoading ? (
                  <LoadingBlocks />
                ) : sentUsers.length === 0 ? (
                  <EmptyState
                    title="No emails sent yet"
                    description="Send the win-back email to see results here."
                  />
                ) : (
                  <ListCard>
                    <ListBody>
                      {sentUsers.map((user) => {
                        // Email comes from admin-get-users (auth.users join),
                        // never from profiles — see `adminUserById` above.
                        const extra = adminUserById.get(user.id);
                        return (
                          <ListRow
                            key={user.id}
                            accent={user.subscribed ? 'emerald' : undefined}
                            title={
                              <span className="flex items-baseline gap-2">
                                <span className="truncate font-medium">
                                  {user.full_name || user.username || 'Unknown'}
                                </span>
                                <span className="ml-auto shrink-0 text-[12px] text-white/60">
                                  {formatDistanceToNow(parseISO(user.apprentice_campaign_sent_at), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </span>
                            }
                            subtitle={
                              <span className="flex items-baseline gap-1.5">
                                <span className="truncate text-white">
                                  {extra?.email ?? 'No email on account'}
                                </span>
                                <span className="ml-auto shrink-0 text-[11px]">
                                  {user.subscribed ? (
                                    /* Green means converted. "Pending" was a
                                       `Pill tone="orange"` — off-palette, and
                                       loud enough to read as a failure when it
                                       only means "has not subscribed yet". */
                                    <span className="font-semibold" style={{ color: SERIES[0] }}>
                                      Subscribed{extra?.tier ? ` · ${extra.tier}` : ''}
                                    </span>
                                  ) : (
                                    <span className="text-white/60">No subscription yet</span>
                                  )}
                                </span>
                              </span>
                            }
                          />
                        );
                      })}
                    </ListBody>
                  </ListCard>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ── Single apprentice ─────────────────────────────────────────── */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl bg-[hsl(0_0%_10%)] p-0">
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle className="flex items-center gap-3 text-white">
                  <Avatar
                    initials={getInitials(selectedUser?.full_name ?? selectedUser?.username)}
                  />
                  <div className="min-w-0 text-left">
                    <div className="truncate text-[15px] font-semibold text-white">
                      {selectedUser?.full_name || selectedUser?.username || 'Unknown'}
                    </div>
                    <div className="truncate text-[12px] font-normal text-white">
                      {selectedUser?.email}
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 space-y-5 overflow-y-auto p-5">
                <ListCard>
                  <ListCardHeader tone="yellow" title="Why they are on this list" />
                  <ListBody>
                    <ListRow
                      title="Signed up"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {selectedUser && format(parseISO(selectedUser.created_at), 'd MMM yyyy')}
                        </span>
                      }
                    />
                    <ListRow
                      title="Trial ended"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {selectedUser &&
                            format(
                              new Date(new Date(selectedUser.created_at).getTime() + 7 * DAY_MS),
                              'd MMM yyyy'
                            )}
                        </span>
                      }
                    />
                    <ListRow
                      title="Lapsed for"
                      trailing={
                        /* Was `Pill tone="orange"`. Off-palette, and it framed
                           a neutral duration as an alert. */
                        <span className="text-[13px] font-semibold text-white tabular-nums">
                          {selectedUser ? `${selectedUser.lapsedDays} days` : '—'}
                        </span>
                      }
                    />
                    <ListRow
                      // Promoted out of the "only rendered if truthy" footnote
                      // it used to be: this is the field that decides whether
                      // the email is worth sending.
                      title="Last opened the app"
                      trailing={
                        <span
                          className="text-[13px] font-semibold tabular-nums"
                          style={{ color: selectedUser?.band.fill }}
                        >
                          {selectedUser && Number.isFinite(selectedUser.seenDays)
                            ? `${ageLabel(selectedUser.seenDays)} ago`
                            : 'Never'}
                        </span>
                      }
                    />
                    {selectedUser?.apprentice_campaign_sent_at && (
                      <ListRow
                        title="Previously contacted"
                        trailing={
                          <span className="text-[13px] text-white">
                            {formatDistanceToNow(
                              parseISO(selectedUser.apprentice_campaign_sent_at),
                              { addSuffix: true }
                            )}
                          </span>
                        }
                      />
                    )}
                  </ListBody>
                </ListCard>

                <div>
                  <Button
                    className="h-12 w-full touch-manipulation bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90"
                    onClick={() => selectedUser && sendSingleMutation.mutate(selectedUser.id)}
                    disabled={sendSingleMutation.isPending}
                  >
                    {sendSingleMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send {EMAIL_VERSIONS[emailVersion].label}
                      </>
                    )}
                  </Button>
                  <p className="mt-2 text-center text-[11.5px] text-white/60">
                    Change the version in the send bar on the list.
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent className="border-white/[0.08] bg-[hsl(0_0%_12%)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Send to {selectedUsers.size} apprentice{selectedUsers.size === 1 ? '' : 's'}?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                {EMAIL_VERSIONS[emailVersion].label} goes to {selectedUsers.size} lapsed apprentice
                {selectedUsers.size === 1 ? '' : 's'}
                {selectedHidden > 0
                  ? `, ${selectedHidden} of whom are currently hidden by your filters`
                  : ''}
                . Emails cannot be recalled.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation border-white/[0.08] bg-transparent text-white hover:bg-white/[0.04]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => sendBulkMutation.mutate(Array.from(selectedUsers))}
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {sendBulkMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send to {selectedUsers.size}
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/*
          Reset used to fire the moment you touched the button.

          `reset_sent` nulls `apprentice_campaign_sent_at` for every
          unsubscribed apprentice emailed more than 24 hours ago — on live data
          that is well over a hundred people dropped back into the audience in
          one unconfirmed tap, and the very next "Send to all" re-emails the lot.
          Bulk send has always had a confirmation; the more destructive of the
          two did not.
        */}
        <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
          <AlertDialogContent className="border-white/[0.08] bg-[hsl(0_0%_12%)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Reset sent status?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Every unsubscribed apprentice emailed more than 24 hours ago goes back into the
                win-back audience and can be emailed again. Only do this when you are about to send
                a genuinely different template — otherwise people receive the same email twice.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation border-white/[0.08] bg-transparent text-white hover:bg-white/[0.04]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => resetSentMutation.mutate()}
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {resetSentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting…
                  </>
                ) : (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}
