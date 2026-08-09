import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Input } from '@/components/ui/input';
import { RefreshCw, Send, Eye, Loader2, ChevronDown } from 'lucide-react';
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
  EmptyState,
  LoadingBlocks,
  IconButton,
  TextAction,
  Eyebrow,
  Divider,
  Dot,
} from '@/components/admin/editorial';

/* ────────────────────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────────────────────── */

interface SegmentUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  /**
   * NOT a real trial end date.
   *
   * `send-winback-offer/get_segments` synthesises this as `created_at + 7 days`
   * for every single person it returns — there is no per-user trial record
   * behind it. For the 127 targets who actually held a subscription that is
   * simply wrong: someone who signed up in January, paid until July and then
   * cancelled came back from the edge function with a "trial ended" date in
   * January, and the old page rendered "200d ago" beside their name. The
   * freshest, most recoverable churn in the list was being presented as the
   * stalest. Real churn dates come from `subscription_end` via
   * `useAdminUsersBase()` below; this field is only the fallback.
   */
  trial_ended_at: string;
  stripe_customer_id: string | null;
}

interface Segments {
  neverSubscribed: SegmentUser[];
  cancelled: SegmentUser[];
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string;
  created_at: string;
  winback_offer_sent_at: string;
  subscribed: boolean;
  email: string | null;
  email_version: string;
}

/** A target enriched with the money and the dates the raw segment lacks. */
interface Target extends SegmentUser {
  /** What this person was paying per month before they left. 0 = unknown. */
  mrr: number;
  tier: string | null;
  /** True when a subscription actually existed — not merely a Stripe customer. */
  paidBefore: boolean;
  /** Best available churn date: `subscription_end`, else inferred trial end. */
  churnAt: Date;
  /** True when `churnAt` is the inferred `created_at + 7d`, not a real date. */
  churnInferred: boolean;
  daysSinceChurn: number;
}

/** A previous recipient enriched with money and post-send behaviour. */
interface SentRow extends SentUser {
  mrr: number;
  daysSinceSent: number;
  /** Signed in AFTER the offer landed but still has not subscribed. */
  returned: boolean;
}

type Cohort = 'todo' | 'paid' | 'trial' | 'sent';
type AgeKey = 'any' | 'm1' | 'm3' | 'm6' | 'old';
type SortKey = 'value' | 'recent' | 'oldest' | 'name';

const BATCH_SIZE = 40;
const EMAIL_VERSION = 'v11';

/** The win-back price, from `send-winback-offer/index.ts` (`monthlyPrice: 7.99`). */
const OFFER_PRICE = 7.99;
/** The list price, from `src/data/stripePrices.ts` — £19.99, not the £14.99 the
    old preview mock claimed. */
const STANDARD_PRICE = 19.99;

/**
 * What each tier bills per month. Same map the rest of admin uses. An unmapped
 * or missing tier contributes nothing — never a guessed average, because 236 of
 * the 333 current targets have no tier recorded at all and inventing a figure
 * for them would triple the headline.
 */
const TIER_MRR: Record<string, number> = {
  founder: 3.99,
  apprentice: 6.99,
  apprentice_yearly: 69.99 / 12,
  electrician: 19.99,
  electrician_yearly: 199.99 / 12,
  business_ai: 39.99,
  business_ai_yearly: 399.99 / 12,
  employer: 49.99,
  employer_yearly: 499.99 / 12,
};
const tierValue = (tier?: string | null) => TIER_MRR[(tier ?? '').toLowerCase()] ?? 0;

/* Validated dark-surface series. Freshest churn green, oldest red, so the bar
   reads as "how much of this list is still warm" at a glance. */
const AGE_SERIES = ['#199E70', '#3987E5', '#9085E9', '#E66767'] as const;

const AGE_BUCKETS: { key: Exclude<AgeKey, 'any'>; label: string; maxDays: number; fill: string }[] =
  [
    { key: 'm1', label: 'under a month', maxDays: 30, fill: AGE_SERIES[0] },
    { key: 'm3', label: '1–3 months', maxDays: 90, fill: AGE_SERIES[1] },
    { key: 'm6', label: '3–6 months', maxDays: 180, fill: AGE_SERIES[2] },
    { key: 'old', label: 'over 6 months', maxDays: Infinity, fill: AGE_SERIES[3] },
  ];

const bucketFor = (days: number) =>
  AGE_BUCKETS.find((b) => days < b.maxDays) ?? AGE_BUCKETS[AGE_BUCKETS.length - 1];

const DAY_MS = 24 * 60 * 60 * 1000;

function gbp(n: number, dp = 0) {
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;
}

/** "12 days", "4 months" — plain English, no "about". */
function ageLabel(days: number): string {
  if (days <= 0) return 'today';
  if (days < 14) return `${days} day${days === 1 ? '' : 's'}`;
  if (days < 60) return `${Math.floor(days / 7)} weeks`;
  if (days < 365) return `${Math.floor(days / 30)} months`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'}`;
}

function getInitials(name: string | null | undefined, fallback: string | null | undefined) {
  const source = (name || fallback || '').trim();
  if (!source) return '??';
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** How many rows to draw before "Show all". See the select-all bug note below. */
const PAGE_SIZE = 60;

export default function AdminWinback() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [cohort, setCohort] = useState<Cohort>('todo');
  const [ageFilter, setAgeFilter] = useState<AgeKey>('any');
  const [sortBy, setSortBy] = useState<SortKey>('value');
  const [showAll, setShowAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<Target | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  /** Ids queued behind the confirm dialog, plus the wording for it. */
  const [pendingSend, setPendingSend] = useState<{ ids: string[]; label: string } | null>(null);

  const [batchSending, setBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    sent: 0,
    failed: 0,
    total: 0,
    batch: 0,
    totalBatches: 0,
  });

  const {
    data: segments,
    isLoading: segmentsLoading,
    refetch,
  } = useQuery<Segments>({
    queryKey: ['admin-winback-segments'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'get_segments' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as Segments;
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  /*
    The `get_stats` query is gone.

    It fetched a fourth copy of the profiles table on a 60-second interval and
    every field it returned was either unused or wrong:

      • `conversions` was known-dead and already worked around further down the
        old file ("was never wired and always reported 0").
      • `conversionRate` was derived from that zero, so it was never read.
      • `totalEligible` was never read — the page used the segment arrays.
      • `offersSent` WAS read, as `totalSent`, and it is the wrong denominator.
        `get_stats` counts `winback_offer_sent_at` with `.eq('role','electrician')`
        while `get_sent_history` counts it with no role filter and a `.limit(500)`.
        Every numerator on the old performance strip (opened / clicked /
        recovered) was computed by iterating the `get_sent_history` rows, so
        open rate was "events for all roles ÷ electricians only" and would
        exceed 100% the moment a single apprentice was sent an offer, and would
        under-report the moment sends passed 500.

    `sentUsers.length` is now the one denominator, so numerator and denominator
    are drawn from the same set of people by construction.
  */

  const { data: sentUsers, isLoading: sentLoading } = useQuery<SentUser[]>({
    queryKey: ['admin-winback-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'get_sent_history' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as SentUser[];
    },
    staleTime: 30 * 1000,
  });

  /*
    The `email_tracking_events` query is gone, and with it the Opened and
    Clicked cards it fed.

    Both were structurally zero and could never have been anything else:

      1. The table has never recorded a single open or click. Across all 53,148
         rows the only event types present are email.sent (25,148),
         email.delivered (23,428), email.bounced (2,101),
         email.delivery_delayed (1,602), unsubscribe (674), email.suppressed
         (193) and email.complained (2). Open and click tracking is not switched
         on at Resend, so `has('email.opened')` was matching against a value
         that does not exist in the column.
      2. Even if it were switched on, the query read the newest 5,000 rows of
         53,148, which spans 17 Apr – 8 May 2026. The v11 campaign was sent
         2–17 May, and its last send is nine days past the end of that window,
         so no recipient of this campaign could ever appear in the map.

    So the page pulled 5,000 rows over the wire every 30 seconds to render
    "Opened 0 · 0% open rate · Clicked 0 · 0% click rate" for ever.

    What replaces them is real and comes from data already loaded: whether the
    recipient signed in AFTER the offer landed. 29 of the 379 people sent v11
    came back into the app and still have not subscribed — that is the warm
    list this page never showed, and it is four times bigger than the 16 who
    converted.
  */

  /*
    `profiles` has no email column, and no tier, and no cancellation date.

    The segment payload carries an email only because the edge function joins
    `get_auth_user_emails` server-side; it carries no `subscription_tier` and no
    `subscription_end` at all, which is why the old page could not rank anybody
    by money and fell back to alphabetical-ish Map order. `useAdminUsersBase()`
    is the one hook that returns the auth.users join (`get_admin_users` selects
    au.email, au.last_sign_in_at plus p.subscription_tier / _start / _end), and
    the admin app already has it cached, so joining to it here costs nothing.
  */
  const { data: adminUsers } = useAdminUsersBase();
  const adminById = useMemo(() => {
    const m = new Map<string, NonNullable<typeof adminUsers>[number]>();
    (adminUsers ?? []).forEach((u) => m.set(u.id, u));
    return m;
  }, [adminUsers]);

  /*
    One list of targets, correctly labelled.

    The edge function splits people on `stripe_customer_id` alone and the page
    printed that split as fact: "Cancelled · Previously paying" versus "Never
    subscribed · Trial lapsed". A Stripe customer id is created the moment
    someone opens a checkout page, and it is never created for an App Store or
    Play Store subscriber, so the split is close to noise. Measured against the
    live table, of the 333 current targets:

      • 93 sit in "Never subscribed" and actually held a subscription — almost
        all of them App Store subscribers, tier `electrician`, £19.99/mo. The
        most valuable names on the page were filed under "never paid us".
      • 84 sit in "Cancelled — previously paying" with no subscription_start,
        no subscription_end and no tier: they opened a checkout and never
        finished it. They have never paid a penny.

    That is 177 of 333, 53%, labelled backwards. `paidBefore` is therefore
    derived from evidence a subscription existed — a start date, an end date, or
    a surviving tier — rather than from the customer id.
  */
  const targets = useMemo<Target[]>(() => {
    const raw = [...(segments?.neverSubscribed ?? []), ...(segments?.cancelled ?? [])];
    const now = Date.now();
    return raw.map((u) => {
      const admin = adminById.get(u.id);
      const tier = admin?.subscription_tier ?? null;
      const end = admin?.subscription_end ?? null;
      const paidBefore = !!(tier || end || admin?.subscription_start);
      // A cancelled-but-not-yet-expired subscription has an end date in the
      // future; 2 of the 333 do. Clamp so they read "0 days" rather than a
      // negative age that would sort them to the top of "longest lapsed".
      const churnAt = end ? parseISO(end) : parseISO(u.trial_ended_at);
      const daysSinceChurn = Math.max(0, Math.floor((now - churnAt.getTime()) / DAY_MS));
      return {
        ...u,
        tier,
        mrr: tierValue(tier),
        paidBefore,
        churnAt,
        churnInferred: !end,
        daysSinceChurn,
      };
    });
  }, [segments, adminById]);

  /* Everyone already sent the offer, with what happened next. */
  const sentRows = useMemo<SentRow[]>(() => {
    const now = Date.now();
    return (sentUsers ?? []).map((u) => {
      const admin = adminById.get(u.id);
      const sentAt = parseISO(u.winback_offer_sent_at).getTime();
      const lastSignIn = admin?.last_sign_in ? parseISO(admin.last_sign_in).getTime() : 0;
      return {
        ...u,
        // get_sent_history can return a null email when the auth lookup misses;
        // the admin join is a second chance at it rather than a blank subtitle.
        email: u.email ?? admin?.email ?? null,
        mrr: tierValue(admin?.subscription_tier),
        daysSinceSent: Math.max(0, Math.floor((now - sentAt) / DAY_MS)),
        returned: !u.subscribed && lastSignIn > sentAt,
      };
    });
  }, [sentUsers, adminById]);

  /* ── Headline figures ─────────────────────────────────────────────────── */

  const totalTargets = targets.length;
  const paidBeforeCount = targets.filter((t) => t.paidBefore).length;
  const trialOnlyCount = totalTargets - paidBeforeCount;
  const valueAtStake = targets.reduce((sum, t) => sum + t.mrr, 0);
  const pricedCount = targets.filter((t) => t.mrr > 0).length;
  const freshCount = targets.filter((t) => t.daysSinceChurn < 30).length;

  const totalSent = sentRows.length;
  const converted = sentRows.filter((u) => u.subscribed).length;
  const returnedNotConverted = sentRows.filter((u) => u.returned).length;
  const convRate = totalSent > 0 ? Math.round((converted / totalSent) * 100) : 0;

  /* Distribution of the target list by how long ago each person churned. */
  const ageBuckets = useMemo(() => {
    const counts = AGE_BUCKETS.map((b) => ({ ...b, count: 0, value: 0 }));
    targets.forEach((t) => {
      const b = bucketFor(t.daysSinceChurn);
      const slot = counts.find((c) => c.key === b.key)!;
      slot.count += 1;
      slot.value += t.mrr;
    });
    return counts;
  }, [targets]);

  /* ── Filtering, ranking ───────────────────────────────────────────────── */

  const visibleTargets = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = targets;
    if (cohort === 'paid') list = list.filter((t) => t.paidBefore);
    else if (cohort === 'trial') list = list.filter((t) => !t.paidBefore);
    if (ageFilter !== 'any')
      list = list.filter((t) => bucketFor(t.daysSinceChurn).key === ageFilter);
    if (q) {
      list = list.filter(
        (t) =>
          t.full_name?.toLowerCase().includes(q) ||
          t.username?.toLowerCase().includes(q) ||
          t.email?.toLowerCase().includes(q)
      );
    }
    /*
      Ranked by money at stake, not by nothing.

      The old list had no sort clause anywhere — `[...neverSubscribed,
      ...cancelled]` in whatever order PostgREST returned them — so the £49.99
      employer and the £0 never-paid trial sat wherever they happened to fall,
      and the first 100 rows (the only ones rendered) were an arbitrary slice.
    */
    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return a.daysSinceChurn - b.daysSinceChurn;
        case 'oldest':
          return b.daysSinceChurn - a.daysSinceChurn;
        case 'name':
          return (a.full_name || a.username || '').localeCompare(b.full_name || b.username || '');
        case 'value':
        default:
          // Value first; a tie (and 236 of 333 tie on £0) breaks to the freshest
          // churn, which is the one still worth chasing.
          return b.mrr - a.mrr || a.daysSinceChurn - b.daysSinceChurn;
      }
    });
    return sorted;
  }, [targets, cohort, ageFilter, search, sortBy]);

  const visibleSent = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = sentRows;
    if (q) {
      list = list.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q) ||
          u.username?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      // Converted first (the wins), then the people who came back and stalled,
      // then everyone else by value and recency of send.
      const rank = (u: SentRow) => (u.subscribed ? 0 : u.returned ? 1 : 2);
      return rank(a) - rank(b) || b.mrr - a.mrr || a.daysSinceSent - b.daysSinceSent;
    });
    return sorted;
  }, [sentRows, search]);

  /*
    Select-all now matches what is actually drawn.

    The old page rendered `visibleUsers.slice(0, 100)` but `toggleSelectAll`
    built its Set from the unsliced `visibleUsers`. With 333 eligible people the
    "Select all visible" checkbox selected 333 while 100 were on screen, the
    counter read "333 selected", and pressing send emailed 233 people the
    operator had never seen. `renderedTargets` is the single source for both the
    rows and the selection.
  */
  const renderedTargets = showAll ? visibleTargets : visibleTargets.slice(0, PAGE_SIZE);
  const renderedSent = showAll ? visibleSent : visibleSent.slice(0, PAGE_SIZE);

  const selectableIds = renderedTargets.map((u) => u.id);
  const allRenderedSelected =
    selectableIds.length > 0 && selectableIds.every((id) => selectedUsers.has(id));

  const selectedValue = targets
    .filter((t) => selectedUsers.has(t.id))
    .reduce((sum, t) => sum + t.mrr, 0);

  /* ── Mutations ────────────────────────────────────────────────────────── */

  const sendSingleMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_single', userId, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: `${EMAIL_VERSION.toUpperCase()} sent`, variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-segments'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
      setSelectedUser(null);
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_test', testEmail: email, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent — check your inbox', variant: 'success' });
      setTestEmail('');
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Test send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_manual', manualEmail: email, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: `${EMAIL_VERSION.toUpperCase()} sent to that address`, variant: 'success' });
      setManualEmail('');
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const resetSentMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'reset_sent', userIds },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({
        title: `Reset ${data.resetCount ?? data.reset ?? 0} users — ready to re-send`,
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-segments'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendBatchedEmails = async (userIds: string[]) => {
    if (userIds.length === 0) return;
    const batches: string[][] = [];
    for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
      batches.push(userIds.slice(i, i + BATCH_SIZE));
    }

    setBatchSending(true);
    setBatchProgress({
      sent: 0,
      failed: 0,
      total: userIds.length,
      batch: 0,
      totalBatches: batches.length,
    });

    let totalOk = 0;
    let totalFailed = 0;

    for (let i = 0; i < batches.length; i++) {
      setBatchProgress((prev) => ({ ...prev, batch: i + 1 }));

      try {
        const { data, error } = await supabase.functions.invoke('send-winback-offer', {
          body: {
            action: 'send_bulk',
            userIds: batches[i],
            email_version: EMAIL_VERSION,
          },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalOk += data.sent || 0;
        totalFailed += data.failed || 0;
        setBatchProgress((prev) => ({ ...prev, sent: totalOk, failed: totalFailed }));
      } catch {
        totalFailed += batches[i].length;
        setBatchProgress((prev) => ({ ...prev, failed: totalFailed }));
      }

      if (i < batches.length - 1) await new Promise((r) => setTimeout(r, 2000));
    }

    haptic.success();
    toast({
      title:
        totalFailed === 0
          ? `Sent ${totalOk} of ${userIds.length} emails`
          : `Sent ${totalOk} of ${userIds.length} (${totalFailed} failed)`,
      variant: totalFailed === 0 ? 'success' : 'warning',
    });
    setBatchSending(false);
    setBatchProgress({ sent: 0, failed: 0, total: 0, batch: 0, totalBatches: 0 });
    setSelectedUsers(new Set());
    queryClient.invalidateQueries({ queryKey: ['admin-winback-segments'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedUsers((prev) => {
      if (allRenderedSelected) {
        const next = new Set(prev);
        selectableIds.forEach((id) => next.delete(id));
        return next;
      }
      return new Set([...prev, ...selectableIds]);
    });
  };

  const refreshAll = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
    queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
  };

  const switchCohort = (next: Cohort) => {
    setCohort(next);
    setSelectedUsers(new Set());
    setShowAll(false);
  };

  /* Money at stake behind whatever the confirm dialog is about to send to. */
  const pendingValue = pendingSend
    ? targets.filter((t) => pendingSend.ids.includes(t.id)).reduce((sum, t) => sum + t.mrr, 0)
    : 0;

  const isSentView = cohort === 'sent';

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Campaigns"
          title="Win-Back"
          description="Reactivate lapsed electricians with the v11 offer."
          tone="red"
          actions={
            <IconButton onClick={refreshAll} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        {segmentsLoading && !segments ? (
          <LoadingBlocks />
        ) : (
          <>
            {/*
              What is at stake, and how much of it is still warm.

              The old strip led with "Churned 333 · This Month 196 · Targeted
              379 · Recovered 16". Two of those four were wrong on their face:
              "This Month" was labelled "Cancelled subscribers" but showed the
              entire cancelled segment with no month filter anywhere in
              `get_segments` — 196 people going back to February presented as a
              month's churn; and "Targeted" counted electricians while the tab
              beside it counted all roles. None of the four said what the list
              was worth, which is the only number that decides whether a
              campaign is worth sending.
            */}
            <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
                <div className="min-w-0">
                  <Eyebrow>Monthly revenue at stake</Eyebrow>
                  <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                    {gbp(valueAtStake)}
                  </div>
                  <div className="mt-2 text-[13px] text-white">
                    {totalTargets === 0
                      ? 'Nobody is waiting to be contacted. Every lapsed account has had the offer.'
                      : `${totalTargets} lapsed electricians have never had the ${EMAIL_VERSION} offer. ${pricedCount} have a plan on record; the other ${totalTargets - pricedCount} have no tier recorded and count as nothing.`}
                  </div>

                  {totalTargets > 0 && (
                    <div className="mt-5">
                      {/* Time since churn, proportionally. A fortnight-old
                          cancellation and a two-year-dead trial were the same
                          grey "Nd ago" pill before. */}
                      <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                        {ageBuckets
                          .filter((b) => b.count > 0)
                          .map((b, i, seg) => (
                            <div
                              key={b.key}
                              title={`${b.label}: ${b.count}`}
                              style={{
                                width: `calc(${(b.count / Math.max(totalTargets, 1)) * 100}% - ${
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
                            <button
                              key={b.key}
                              type="button"
                              onClick={() => {
                                setAgeFilter(ageFilter === b.key ? 'any' : b.key);
                                if (cohort === 'sent') switchCohort('todo');
                                setShowAll(false);
                              }}
                              className={cn(
                                'flex touch-manipulation items-center gap-2 rounded-full px-1 py-0.5 transition-opacity',
                                ageFilter !== 'any' && ageFilter !== b.key && 'opacity-45'
                              )}
                            >
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ background: b.fill }}
                              />
                              <span className="font-medium tabular-nums text-white">{b.count}</span>
                              <span className="text-white">{b.label}</span>
                              <span className="tabular-nums text-white/60">{gbp(b.value)}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Each cell is the filter it describes — the numbers were
                    previously decorative and the filters lived on a separate
                    rail further down the page. */}
                <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                  {[
                    {
                      label: 'To contact',
                      value: totalTargets,
                      sub: `never sent ${EMAIL_VERSION}`,
                      accent: true,
                      onClick: () => {
                        switchCohort('todo');
                        setAgeFilter('any');
                      },
                    },
                    {
                      label: 'Paid us before',
                      value: paidBeforeCount,
                      sub: `${gbp(valueAtStake)}/mo lost`,
                      onClick: () => switchCohort('paid'),
                    },
                    {
                      label: 'Churned under 30d',
                      value: freshCount,
                      sub: 'most recoverable',
                      onClick: () => {
                        if (cohort === 'sent') switchCohort('todo');
                        setAgeFilter(ageFilter === 'm1' ? 'any' : 'm1');
                      },
                    },
                    {
                      label: 'Already emailed',
                      value: totalSent,
                      sub: totalSent > 0 ? `${converted} recovered · ${convRate}%` : 'no sends yet',
                      onClick: () => switchCohort('sent'),
                    },
                  ].map((c) => (
                    <button
                      key={c.label}
                      onClick={c.onClick}
                      className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
                    >
                      <div
                        className={cn(
                          'text-[22px] font-semibold leading-none sm:text-[26px]',
                          c.accent && totalTargets > 0 ? 'text-elec-yellow' : 'text-white'
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

              There were two stacked rails: a FilterBar with Target/Sent pill
              tabs, and beneath it a second horizontally-scrolling rail of
              All / Never subscribed / Cancelled segment pills — about 96px of
              chrome to express four states, and the two rails could disagree
              (the segment rail stayed on "Cancelled" while the view showed
              Sent). Cohort is now the only chip group; age and sort are compact
              selects on the same line with search at the end.

              The counts reconcile: To contact = Paid us before + Trial only, by
              construction, because `paidBefore` partitions the same array.
              "Already emailed" is a disjoint cohort — `get_segments` filters on
              `winback_offer_sent_at IS NULL`, so nobody can be in both — and is
              labelled as a separate group rather than implying it is a subset.
            */}
            <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                  {(
                    [
                      { value: 'todo', label: 'To contact', count: totalTargets },
                      { value: 'paid', label: 'Paid us before', count: paidBeforeCount },
                      { value: 'trial', label: 'Trial only', count: trialOnlyCount },
                      { value: 'sent', label: 'Already emailed', count: totalSent },
                    ] as { value: Cohort; label: string; count: number }[]
                  ).map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => switchCohort(f.value)}
                      className={cn(
                        'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                        cohort === f.value
                          ? 'bg-elec-yellow text-black'
                          : 'text-white hover:bg-white/[0.08]'
                      )}
                    >
                      {f.label}
                      <span
                        className={cn(
                          'ml-1.5 tabular-nums text-[11px]',
                          cohort === f.value ? 'text-black/60' : 'text-white/60'
                        )}
                      >
                        {f.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <select
                    value={ageFilter}
                    onChange={(e) => {
                      setAgeFilter(e.target.value as AgeKey);
                      setShowAll(false);
                    }}
                    disabled={isSentView}
                    aria-label="Filter by time since churn"
                    className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none disabled:opacity-40"
                  >
                    <option value="any">Any age</option>
                    {AGE_BUCKETS.map((b) => (
                      <option key={b.key} value={b.key}>
                        Churned {b.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    disabled={isSentView}
                    aria-label="Sort targets"
                    className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none disabled:opacity-40"
                  >
                    <option value="value">Value at stake</option>
                    <option value="recent">Newest churn</option>
                    <option value="oldest">Longest lapsed</option>
                    <option value="name">Name</option>
                  </select>

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowAll(false);
                    }}
                    placeholder="Search name or email…"
                    aria-label="Search people"
                    className="h-9 w-[10rem] touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 text-[12px] text-white caret-elec-yellow placeholder:text-white/40 focus:border-elec-yellow focus:outline-none sm:w-56"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{EMAIL_VERSION.toUpperCase()} · Win-back email</Eyebrow>
                <Pill tone="yellow">{gbp(OFFER_PRICE, 2)}/mo</Pill>
                <span className="text-[11px] text-white/60">
                  from {gbp(STANDARD_PRICE, 2)} standard
                </span>
              </div>
              <TextAction onClick={() => setShowPreview(true)}>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Preview template
                </span>
              </TextAction>
            </div>

            {batchSending && (
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
                <div className="space-y-3 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                      <span className="text-sm font-semibold text-white">
                        Sending batch {batchProgress.batch}/{batchProgress.totalBatches}
                      </span>
                    </div>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {batchProgress.sent}/{batchProgress.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                      style={{
                        width: `${
                          batchProgress.total > 0
                            ? (batchProgress.sent / batchProgress.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  {batchProgress.failed > 0 && (
                    <div className="flex items-center gap-2">
                      <Dot tone="red" />
                      <span className="text-[12px] text-white">{batchProgress.failed} failed</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── The list ────────────────────────────────────────────────── */}

            {isSentView ? (
              sentLoading ? (
                <LoadingBlocks />
              ) : visibleSent.length === 0 ? (
                <EmptyState
                  title="Nothing sent yet"
                  description={`Send ${EMAIL_VERSION.toUpperCase()} to the target list to start tracking results here.`}
                  action="Back to targets"
                  onAction={() => switchCohort('todo')}
                />
              ) : (
                <ListCard>
                  <ListCardHeader
                    tone="emerald"
                    title="Already emailed"
                    meta={
                      <span className="flex flex-wrap items-center gap-1.5">
                        <Pill tone="emerald">{converted} recovered</Pill>
                        {/* Replaces the dead Opened/Clicked pair. This is the
                            follow-up list: they read it, came back, and stopped
                            at the paywall. */}
                        <Pill tone="blue">{returnedNotConverted} came back</Pill>
                        <Pill tone="purple">{convRate}% conversion</Pill>
                      </span>
                    }
                  />
                  <ListBody>
                    {renderedSent.map((u) => (
                      <ListRow
                        key={u.id}
                        lead={
                          <Avatar
                            initials={getInitials(u.full_name, u.username)}
                            online={u.subscribed}
                          />
                        }
                        title={
                          <span className="flex items-baseline gap-2">
                            <span className="truncate">{u.full_name || u.username}</span>
                            <span
                              className={cn(
                                'ml-auto shrink-0 text-[13px] font-semibold tabular-nums',
                                u.mrr > 0 ? 'text-white' : 'text-white/60'
                              )}
                              title={
                                u.mrr > 0
                                  ? `Was paying ${gbp(u.mrr, 2)} a month`
                                  : 'No tier on record'
                              }
                            >
                              {u.mrr > 0 ? `${gbp(u.mrr, 2)}/mo` : '—'}
                            </span>
                          </span>
                        }
                        subtitle={
                          <span className="flex items-baseline gap-1.5">
                            <span className="truncate text-white">{u.email ?? 'No email'}</span>
                            <span className="ml-auto shrink-0 text-white/60">
                              Sent{' '}
                              {formatDistanceToNow(parseISO(u.winback_offer_sent_at), {
                                addSuffix: true,
                              })}{' '}
                              · {u.email_version?.toUpperCase() || 'V1'}
                            </span>
                          </span>
                        }
                        trailing={
                          u.subscribed ? (
                            <Pill tone="emerald">Recovered</Pill>
                          ) : u.returned ? (
                            <Pill tone="blue">Came back, no sub</Pill>
                          ) : (
                            <Pill tone="red">Silent</Pill>
                          )
                        }
                      />
                    ))}
                  </ListBody>
                  {!showAll && visibleSent.length > renderedSent.length && (
                    <div className="border-t border-white/[0.06] px-4 py-3 text-center sm:px-5">
                      <TextAction onClick={() => setShowAll(true)}>
                        Show all {visibleSent.length}
                      </TextAction>
                    </div>
                  )}
                </ListCard>
              )
            ) : visibleTargets.length === 0 ? (
              <EmptyState
                title={totalTargets === 0 ? 'Nothing to target' : 'No matches'}
                description={
                  totalTargets === 0
                    ? 'Every lapsed electrician has already had the offer. Reset a cohort under Advanced to send again.'
                    : 'No lapsed accounts match these filters.'
                }
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="red"
                  title={
                    cohort === 'paid'
                      ? 'Paid us before'
                      : cohort === 'trial'
                        ? 'Trial only'
                        : 'To contact'
                  }
                  meta={
                    <span className="flex flex-wrap items-center gap-1.5">
                      <Pill tone="red">{visibleTargets.length}</Pill>
                      <Pill tone="yellow">
                        {gbp(visibleTargets.reduce((s, t) => s + t.mrr, 0))}/mo
                      </Pill>
                    </span>
                  }
                />

                <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
                  <label className="flex touch-manipulation items-center gap-3">
                    <Checkbox
                      checked={allRenderedSelected}
                      onCheckedChange={toggleSelectAll}
                      disabled={batchSending}
                      className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                    />
                    <span className="text-[13px] text-white">
                      {selectedUsers.size > 0
                        ? `${selectedUsers.size} selected · ${gbp(selectedValue)}/mo`
                        : `Select these ${renderedTargets.length}`}
                    </span>
                  </label>
                  {!batchSending && (
                    <TextAction
                      onClick={() =>
                        setPendingSend(
                          selectedUsers.size > 0
                            ? {
                                ids: Array.from(selectedUsers),
                                label: `${selectedUsers.size} selected`,
                              }
                            : {
                                ids: visibleTargets.map((t) => t.id),
                                label: `all ${visibleTargets.length} in this filter`,
                              }
                        )
                      }
                    >
                      {selectedUsers.size > 0
                        ? `Send to ${selectedUsers.size}`
                        : `Send to all ${visibleTargets.length}`}
                    </TextAction>
                  )}
                </div>

                <ListBody>
                  {renderedTargets.map((u) => {
                    const selected = selectedUsers.has(u.id);
                    const bucket = bucketFor(u.daysSinceChurn);
                    return (
                      <div
                        key={u.id}
                        className={cn(
                          'group flex w-full items-center gap-3 px-4 py-3 sm:px-5',
                          selected && 'bg-white/[0.04]'
                        )}
                      >
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleUserSelection(u.id)}
                          disabled={batchSending}
                          aria-label={`Select ${u.full_name || u.username}`}
                          className="border-white/40 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                        />
                        {/* A dot carrying the churn age. The whole point of the
                            page is that a two-week-old cancellation is a
                            different job from a two-year-old dead trial, and
                            both used to render as an identical pill. */}
                        <span
                          aria-hidden
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: bucket.fill }}
                          title={`Churned ${bucket.label} ago`}
                        />
                        <Avatar initials={getInitials(u.full_name, u.username)} />
                        <button
                          type="button"
                          onClick={() => setSelectedUser(u)}
                          className="min-w-0 flex-1 touch-manipulation text-left"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="truncate text-[14px] font-medium text-white">
                              {u.full_name || u.username || 'Unknown'}
                            </span>
                            {/* Money leads the row: it is what decides who gets
                                chased first, and it was not on the page at all. */}
                            <span
                              className={cn(
                                'ml-auto shrink-0 text-[13px] font-semibold tabular-nums',
                                u.mrr > 0 ? 'text-white' : 'text-white/60'
                              )}
                              title={
                                u.mrr > 0
                                  ? `Was paying ${gbp(u.mrr, 2)} a month on ${u.tier}`
                                  : 'No tier on record — counts as £0, not a guess'
                              }
                            >
                              {u.mrr > 0 ? `${gbp(u.mrr, 2)}/mo` : '—'}
                            </span>
                          </div>
                          <div className="mt-0.5 flex items-baseline gap-1.5 text-[11.5px]">
                            <span className="truncate text-white">{u.email}</span>
                            <span className="ml-auto shrink-0 text-white/60">
                              {u.paidBefore ? 'Paid before' : 'Trial only'} ·{' '}
                              {u.churnInferred ? '~' : ''}
                              {ageLabel(u.daysSinceChurn)} ago
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </ListBody>

                {!showAll && visibleTargets.length > renderedTargets.length && (
                  <div className="border-t border-white/[0.06] px-4 py-3 text-center sm:px-5">
                    <TextAction onClick={() => setShowAll(true)}>
                      Show all {visibleTargets.length}
                    </TextAction>
                  </div>
                )}
              </ListCard>
            )}

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Send test email"
                meta={<Pill tone="yellow">[TEST]</Pill>}
              />
              <div className="space-y-3 px-5 py-4 sm:px-6">
                <p className="text-[12.5px] text-white">
                  Preview {EMAIL_VERSION.toUpperCase()} end-to-end. Subject prefixed [TEST]. Nobody
                  is marked as sent.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 flex-1 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_10%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <Button
                    onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                    disabled={!testEmail || sendTestMutation.isPending}
                    className="h-11 gap-1.5 touch-manipulation bg-elec-yellow px-4 font-semibold text-black hover:bg-elec-yellow/90"
                  >
                    {sendTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Test
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </ListCard>

            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 w-full touch-manipulation items-center justify-between rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 transition-colors hover:bg-[hsl(0_0%_15%)]"
                >
                  <span className="text-[13px] font-semibold text-white">Advanced</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform',
                      advancedOpen && 'rotate-180'
                    )}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-5 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5 sm:p-6">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[13px] font-semibold text-white">
                        Send real {EMAIL_VERSION.toUpperCase()} to a specific address
                      </div>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-white">
                        Full send — goes through the suppression check, is logged, and counts as
                        sent. For testing, use the Test box above.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        value={manualEmail}
                        onChange={(e) => setManualEmail(e.target.value)}
                        placeholder="recipient@example.com"
                        className="h-11 flex-1 touch-manipulation border-white/[0.08] bg-[hsl(0_0%_10%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                      <Button
                        onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                        disabled={!manualEmail || sendManualMutation.isPending}
                        className="h-11 touch-manipulation bg-elec-yellow px-4 font-semibold text-black hover:bg-elec-yellow/90"
                      >
                        {sendManualMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {totalSent > 0 && (
                    <div className="border-t border-white/[0.06] pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const allSentIds = sentRows.map((u) => u.id);
                          if (
                            confirm(
                              `Reset all ${allSentIds.length} sent users so they can be re-sent?`
                            )
                          ) {
                            resetSentMutation.mutate(allSentIds);
                          }
                        }}
                        disabled={resetSentMutation.isPending}
                        className="h-11 w-full touch-manipulation gap-2 border-white/[0.08] bg-transparent text-white hover:bg-white/[0.04] hover:text-white"
                      >
                        {resetSentMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        Reset all {totalSent} sent users
                      </Button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}

        {/* ── Single-person sheet ──────────────────────────────────────────── */}

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-5 pb-4">
                <SheetTitle asChild>
                  <div className="flex items-center gap-3 text-left">
                    <Avatar
                      initials={getInitials(selectedUser?.full_name, selectedUser?.username)}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[15px] font-semibold text-white">
                        {selectedUser?.full_name || selectedUser?.username || 'Unknown'}
                      </div>
                      <div className="truncate text-[12px] text-white">{selectedUser?.email}</div>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedUser?.paidBefore ? (
                      <Pill tone="emerald">Paid us before</Pill>
                    ) : (
                      <Pill tone="red">Trial only, never paid</Pill>
                    )}
                    {selectedUser && selectedUser.mrr > 0 && (
                      <Pill tone="yellow">
                        {gbp(selectedUser.mrr, 2)}/mo · {selectedUser.tier}
                      </Pill>
                    )}
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] text-white">Signed up</span>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {selectedUser?.created_at &&
                        format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* Says which date this is. The old sheet printed the
                        synthesised "trial ended" as if it were recorded fact,
                        for people who had in fact cancelled a paid plan months
                        later. */}
                    <span className="text-[12.5px] text-white">
                      {selectedUser?.churnInferred
                        ? 'Trial lapsed (estimated)'
                        : 'Subscription ended'}
                    </span>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {selectedUser && format(selectedUser.churnAt, 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] text-white">Gone for</span>
                    <Pill tone="red">
                      {selectedUser ? ageLabel(selectedUser.daysSinceChurn) : '—'}
                    </Pill>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] text-white">At stake</span>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {selectedUser && selectedUser.mrr > 0
                        ? `${gbp(selectedUser.mrr, 2)}/mo`
                        : 'No tier on record'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] text-white">Recovers at</span>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {gbp(OFFER_PRICE, 2)}/mo
                    </span>
                  </div>
                </div>

                <Button
                  className="h-12 w-full touch-manipulation gap-2 bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90"
                  onClick={() => selectedUser && sendSingleMutation.mutate(selectedUser.id)}
                  disabled={sendSingleMutation.isPending}
                >
                  {sendSingleMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send {EMAIL_VERSION.toUpperCase()} to this person
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ── Confirm bulk send ────────────────────────────────────────────── */}

        <AlertDialog open={!!pendingSend} onOpenChange={(open) => !open && setPendingSend(null)}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:max-w-lg sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base leading-tight text-white sm:text-lg">
                Send {EMAIL_VERSION.toUpperCase()} to {pendingSend?.ids.length ?? 0} electricians?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-2 text-sm leading-relaxed text-white">
                  {/* The dialog used to name a segment ("333 eligible
                      electricians") that no longer matched what was on screen
                      once search or a segment pill had been applied. It now
                      names the exact set being sent to, and what it is worth. */}
                  <p>
                    {pendingSend?.label} — {gbp(pendingValue)}/mo of lapsed revenue between them.
                  </p>
                  <p className="text-[12px]">
                    Sends in batches of {BATCH_SIZE} with a 2s gap. Suppressed and bounced addresses
                    are skipped server-side, so fewer than {pendingSend?.ids.length ?? 0} may
                    actually leave. Each recipient is marked as sent and drops out of this list
                    until reset.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row">
              <AlertDialogCancel className="mt-0 h-12 w-full touch-manipulation border-white/[0.08] bg-transparent text-base text-white hover:bg-white/[0.04] hover:text-white sm:h-11 sm:w-auto sm:text-sm">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const ids = pendingSend?.ids ?? [];
                  setPendingSend(null);
                  if (ids.length) sendBatchedEmails(ids);
                }}
                className="h-12 w-full touch-manipulation gap-2 bg-elec-yellow text-base font-semibold text-black hover:bg-elec-yellow/90 sm:h-11 sm:w-auto sm:text-sm"
              >
                <Send className="h-4 w-4" />
                Send {pendingSend?.ids.length ?? 0}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ── Template preview ─────────────────────────────────────────────── */}

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
                <SheetTitle asChild>
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-[13px] font-semibold text-white">
                      {EMAIL_VERSION.toUpperCase()} preview
                    </span>
                    <Pill tone="yellow">{EMAIL_VERSION.toUpperCase()}</Pill>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-black">
                {/*
                  The mock quoted a price that does not exist.

                  It read "£7/mo off normal £14.99". The offer is £7.99
                  (`monthlyPrice: 7.99` in send-winback-offer) and the standard
                  monthly electrician price is £19.99 (src/data/stripePrices.ts).
                  £14.99 appears in neither, so the discount shown to the admin
                  was £7 against an invented list price.
                */}
                <iframe
                  title={`${EMAIL_VERSION} email preview`}
                  sandbox="allow-same-origin"
                  className="h-full w-full border-0"
                  srcDoc={`<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fff;margin:12px 0 8px;font-size:28px;letter-spacing:-0.5px}.eyebrow{color:#fbbf24;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:800;margin-bottom:6px}p{color:#fff;font-size:14px;line-height:1.6;max-width:340px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:#fbbf24;border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}.price{font-size:36px;color:#fff;font-weight:700;margin-top:18px;letter-spacing:-1px}.discount{color:#fbbf24;font-size:13px;font-weight:600;margin-top:4px}.mut{color:#fff;opacity:0.6;font-size:12px;margin-top:14px}.gift{margin-top:20px;padding:14px 18px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);border-radius:14px;font-size:12px;color:#fff;max-width:300px}</style></head><body><div class="badge">${EMAIL_VERSION.toUpperCase()} &middot; Win-back</div><div class="eyebrow">BS 7671:2018 + A4:2026</div><h2>A4:2026 is here.</h2><p>Free A4 cheatsheet hero &middot; 16 certificates A4-ready &middot; calculations updated &middot; Study Centre rebuilt &middot; Elec-AI grounded on the new amendment.</p><div class="gift">Free 4-page A4:2026 changes cheatsheet &mdash; no email gate</div><div class="price">&pound;${OFFER_PRICE.toFixed(2)}<span style="font-size:14px;opacity:0.6;font-weight:400">/mo</span></div><div class="discount">Down from &pound;${STANDARD_PRICE.toFixed(2)}/mo standard</div><p class="mut">Send a test email to preview the full rendered template.</p></body></html>`}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
