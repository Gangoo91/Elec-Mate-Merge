import { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
import { Input } from '@/components/ui/input';
import { RefreshCw, Loader2, Play, Pause, Send, Timer, RotateCcw, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { useAdminUsersBase, type AdminUser } from '@/hooks/useAdminUsersBase';
import { useAdminStripeStats, ADMIN_STRIPE_STATS_QUERY_KEY } from '@/hooks/useAdminStripeStats';
import {
  PageFrame,
  PageHero,
  Eyebrow,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  TextAction,
} from '@/components/admin/editorial';

/* ────────────────────────────────────────────────────────
   Palette

   The validated dark-surface series, in its published order. The ORDER is the
   colourblind-safety mechanism, not decoration — see the note in AdminRevenue.
   Every segment below is labelled in the legend as well as coloured, so colour
   never carries the meaning on its own.
   ──────────────────────────────────────────────────────── */
const SERIES = {
  active: '#199E70',
  quiet: '#3987E5',
  dormant: '#E66767',
  unlinked: '#9085E9',
} as const;

/** Status is a reserved pair — never a categorical slot. */
const STATUS = { good: '#0CA30C', warning: '#FAB219' } as const;

/** The live founder price. Legacy founder-classified prices exist (£6.99 and
 *  £5.99 test subscriptions), which is exactly why nothing on this page
 *  multiplies a head-count by 3.99 any more — see `founderMrr`. */
const FOUNDER_PRICE = 3.99;

/** Stripe price id for the live £3.99 founder plan. Held here so a row can say
 *  "legacy price" honestly rather than printing £3.99 over a £6.99 charge. */
const FOUNDER_PRICE_ID = 'price_1SPK8c2RKw5t5RAmRGJxXfjc';

const DAY = 86400000;

interface CampaignStatus {
  totalProspects: number;
  sent: number;
  remaining: number;
  sentEmails: string[];
  remainingEmails: string[];
}

type Bucket = 'active' | 'quiet' | 'dormant' | 'unlinked';

interface FounderRow {
  key: string;
  email: string | null;
  name: string | null;
  /** What this person actually pays each month, from Stripe. */
  monthly: number;
  priceAmount: number;
  interval: string;
  legacyPrice: boolean;
  /** How long they have been a founder, from the Stripe subscription start. */
  tenureMs: number;
  account: AdminUser | null;
  daysSinceSeen: number | null;
  bucket: Bucket;
  /** Stripe bills them on the founder price but the app's own tier field does
   *  not say "founder". See the reconciliation card for why this happens. */
  mislabelled: boolean;
  accountTier: string | null;
}

function getInitials(name?: string | null, email?: string | null) {
  const src = (name && name.trim()) || email || '?';
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return (parts[0]?.[0] ?? '?').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
}

/** "3 weeks", "7 months", "2 years" — tenure in words. */
function tenureLabel(ms: number): string {
  const days = Math.max(0, Math.floor(ms / DAY));
  if (days < 14) return `${days} day${days === 1 ? '' : 's'}`;
  if (days < 60) return `${Math.floor(days / 7)} weeks`;
  if (days < 730) return `${Math.floor(days / 30)} months`;
  return `${(days / 365).toFixed(1)} years`;
}

/** "Today", "12 days ago", "5 months ago", or an explicit "never". */
function seenLabel(days: number | null): string {
  if (days === null) return 'never signed in';
  if (days <= 0) return 'seen today';
  if (days === 1) return 'seen yesterday';
  if (days < 30) return `seen ${days} days ago`;
  if (days < 365) return `seen ${Math.floor(days / 30)} months ago`;
  return `seen ${(days / 365).toFixed(1)} years ago`;
}

const money = (n: number, dp = 2) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

export default function AdminFounders() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [isSending, setIsSending] = useState(false);
  const [showProspectList, setShowProspectList] = useState(false);
  const [confirmSendBatch, setConfirmSendBatch] = useState(false);
  const [confirmSendTest, setConfirmSendTest] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [autoSending, setAutoSending] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [search, setSearch] = useState('');
  const [bucketFilter, setBucketFilter] = useState<'all' | Bucket>('all');
  const [labelFilter, setLabelFilter] = useState<'all' | 'mislabelled' | 'labelled'>('all');
  const [lastBatchResult, setLastBatchResult] = useState<{
    sent: number;
    failed: number;
    remaining: number;
    sentEmails?: string[];
    errors?: string[];
  } | null>(null);

  /*
    Three data sources, each doing exactly one job.

    1. `admin-stripe-stats` — the only source that knows who is actually paying.
       Shared with AdminRevenue through one query key so the two pages cannot
       report different founder counts (see useAdminStripeStats).
    2. `admin-get-users` — the only source with an email address per account.
       `profiles` has NO email column (it lives on auth.users), so any attempt
       to match a Stripe customer to an account by querying profiles.email
       returns PostgREST 42703 and silently yields null for every row. The
       `get_admin_users` RPC joins auth.users and hands back `email` plus a real
       `last_sign_in` from `auth.users.last_sign_in_at` — not the dead
       `profiles.last_sign_in` column.
    3. `founder-final-push` — the invite campaign. Note what it returns: its
       filter drops every address that already has an auth account, so its list
       is people who are NOT founders. The old page rendered that list under a
       heading of "Founders" — see the campaign card below.
  */
  const {
    data: stripeStats,
    isLoading: stripeLoading,
    error: stripeError,
    refetch: refetchStripe,
  } = useAdminStripeStats();
  const { data: adminUsers, isLoading: usersLoading } = useAdminUsersBase();

  const {
    data: status,
    isLoading: campaignLoading,
    refetch: refetchCampaign,
  } = useQuery<CampaignStatus>({
    queryKey: ['founder-final-push-status'],
    refetchInterval: isSending ? 3000 : 30000,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'get_status' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  const isLoading = stripeLoading || usersLoading;

  /*
    Every account, indexed by lower-cased email.

    Stripe customer emails and account emails differ in case often enough that
    an exact-match join drops people, and there is no other stable key: the
    subscription's `customerId` is only mirrored onto `profiles.stripe_customer_id`
    for accounts that checked out through the web flow.
  */
  const accountsByEmail = useMemo(() => {
    const map = new Map<string, AdminUser>();
    (adminUsers ?? []).forEach((u) => {
      if (u.email) map.set(u.email.toLowerCase(), u);
    });
    return map;
  }, [adminUsers]);

  /*
    The founder roster, built from what Stripe bills — not from a tier label.

    The page used to show a head-count read from `tierCounts.founder` while the
    list underneath rendered something completely unrelated (email prospects).
    Deriving both the headline and the rows from this one array means the number
    at the top and the rows below it cannot disagree.
  */
  const founders = useMemo<FounderRow[]>(() => {
    const subs = (stripeStats?.subscriptions ?? []).filter((s) => s.tier === 'founder');
    const now = Date.now();

    return subs.map((s) => {
      const email = s.customerEmail?.toLowerCase() ?? null;
      const account = email ? (accountsByEmail.get(email) ?? null) : null;

      const lastSeen = account?.last_sign_in ? new Date(account.last_sign_in).getTime() : null;
      const daysSinceSeen = lastSeen === null ? null : Math.floor((now - lastSeen) / DAY);

      /*
        Risk bands. They partition the roster exactly once each, so the filter
        chips below always sum to the All count — the previous rail did not:
        it labelled "sent an email" as Active and "not yet emailed" as Pending,
        two states of a mailing list, over a heading that said Founders.
      */
      const bucket: Bucket = !account
        ? 'unlinked'
        : daysSinceSeen === null || daysSinceSeen > 90
          ? 'dormant'
          : daysSinceSeen > 30
            ? 'quiet'
            : 'active';

      const accountTier = account?.subscription_tier ?? null;
      /*
        Case-insensitive, always.

        `subscription_tier` is not normalised in the database: both
        `electrician` (320 rows) and `Electrician` (9 rows) exist, as do
        `Employer` (6) and `Apprentice` (2). A `=== 'founder'` or a
        `.eq('subscription_tier', 'founder')` silently misses every capitalised
        row, so anything comparing this column lower-cases both sides first.
      */
      const mislabelled = !!account && !(accountTier ?? '').toLowerCase().includes('founder');

      const since = new Date(s.created).getTime();

      return {
        key: s.subscriptionId,
        email: s.customerEmail,
        name: s.customerName,
        monthly: s.monthlyAmount,
        priceAmount: s.priceAmount,
        interval: s.interval,
        legacyPrice: s.priceId !== FOUNDER_PRICE_ID,
        tenureMs: Math.max(0, now - since),
        account,
        daysSinceSeen,
        bucket,
        mislabelled,
        accountTier,
      };
    });
  }, [stripeStats, accountsByEmail]);

  /*
    Headline figures.

    Everything here is a sum over the roster above, never a multiplication of a
    head-count by the list price. The old strip printed
    `£${activeFounders * 3.99}` as "Founder MRR", which is wrong the moment a
    founder sits on one of the legacy founder-classified prices (£6.99 and £5.99
    both map to tier `founder` in admin-stripe-stats), and it stayed wrong
    silently because nothing ever compared it to Stripe's own MRR.
  */
  const founderMrr = useMemo(() => founders.reduce((sum, f) => sum + f.monthly, 0), [founders]);

  const bucketTotals = useMemo(() => {
    const t: Record<Bucket, number> = { active: 0, quiet: 0, dormant: 0, unlinked: 0 };
    founders.forEach((f) => (t[f.bucket] += 1));
    return t;
  }, [founders]);

  const mislabelledCount = useMemo(() => founders.filter((f) => f.mislabelled).length, [founders]);

  /** The single longest-standing founder — the most expensive person to lose. */
  const longest = useMemo(
    () =>
      founders.reduce<FounderRow | null>(
        (best, f) => (!best || f.tenureMs > best.tenureMs ? f : best),
        null
      ),
    [founders]
  );

  /*
    What the app's own tier field thinks, counted the only safe way.

    Lower-cased `includes('founder')` rather than `=== 'founder'`, for the
    case-inconsistency described above.
  */
  const profilesFounderCount = useMemo(
    () =>
      (adminUsers ?? []).filter((u) =>
        (u.subscription_tier ?? '').toLowerCase().includes('founder')
      ).length,
    [adminUsers]
  );

  /** Accounts whose tier is stored with a capital letter — the rows a
   *  lowercase-only comparison anywhere in the admin app would drop. */
  const oddCaseTierCount = useMemo(
    () =>
      (adminUsers ?? []).filter(
        (u) => u.subscription_tier && u.subscription_tier !== u.subscription_tier.toLowerCase()
      ).length,
    [adminUsers]
  );

  /** Founders billed on the founder price but tagged Employer by the app. */
  const taggedEmployerCount = useMemo(
    () => founders.filter((f) => (f.accountTier ?? '').toLowerCase().startsWith('employer')).length,
    [founders]
  );

  /*
    Search and the two orthogonal filters run FIRST; the chip counts are then
    computed over that same base. That is what makes the rail reconcile —
    All is by construction the sum of the four bands under every combination of
    search text and label filter.
  */
  const searchAndLabelFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return founders.filter((f) => {
      if (labelFilter === 'mislabelled' && !f.mislabelled) return false;
      if (labelFilter === 'labelled' && f.mislabelled) return false;
      if (!q) return true;
      return (
        (f.email ?? '').toLowerCase().includes(q) ||
        (f.name ?? '').toLowerCase().includes(q) ||
        (f.account?.full_name ?? '').toLowerCase().includes(q)
      );
    });
  }, [founders, search, labelFilter]);

  const chipCounts = useMemo(() => {
    const t: Record<Bucket, number> = { active: 0, quiet: 0, dormant: 0, unlinked: 0 };
    searchAndLabelFiltered.forEach((f) => (t[f.bucket] += 1));
    return t;
  }, [searchAndLabelFiltered]);

  /*
    Ranked by risk, never alphabetically and never by insertion order.

    Read top-down this is "who am I about to lose, worst first": people we
    cannot even resolve to an account, then the dormant, then the quiet, and
    inside each band the longest-standing first — a two-year founder going
    quiet costs more than a two-week one doing the same.
  */
  const visibleFounders = useMemo(() => {
    const rank: Record<Bucket, number> = { unlinked: 3, dormant: 2, quiet: 1, active: 0 };
    return searchAndLabelFiltered
      .filter((f) => bucketFilter === 'all' || f.bucket === bucketFilter)
      .sort((a, b) => rank[b.bucket] - rank[a.bucket] || b.tenureMs - a.tenureMs);
  }, [searchAndLabelFiltered, bucketFilter]);

  /* ── Campaign mutations (unchanged behaviour, honest labels) ───────────── */

  const sendTestMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'send_test', testEmail: 'founder@elec-mate.com' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      setConfirmSendTest(false);
      toast({ title: 'Test email sent', description: 'Check founder@elec-mate.com inbox' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const sendInviteMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data: createData, error: createError } = await supabase.functions.invoke(
        'send-founder-invite',
        { body: { action: 'bulk_create', emails: [email] } }
      );
      if (createError) throw createError;
      if (createData?.error) throw new Error(createData.error);

      const { data: listData, error: listError } = await supabase.functions.invoke(
        'send-founder-invite',
        { body: { action: 'list' } }
      );
      if (listError) throw listError;
      const invite = listData?.invites?.find(
        (i: { email: string }) => i.email === email.trim().toLowerCase()
      );
      if (!invite) throw new Error('Invite created but could not find it to send');

      const { data: sendData, error: sendError } = await supabase.functions.invoke(
        'send-founder-invite',
        { body: { action: 'send_invite', inviteId: invite.id } }
      );
      if (sendError) throw sendError;
      if (sendData?.error) throw new Error(sendData.error);

      return sendData;
    },
    onSuccess: (data) => {
      haptic.success();
      setInviteEmail('');
      queryClient.invalidateQueries({ queryKey: ['founder-final-push-status'] });
      toast({ title: 'Founder invite sent', description: `Email sent to ${data.email}` });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Failed to send invite', description: error.message, variant: 'destructive' });
    },
  });

  const sendBatchMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'send_batch', batchSize: 7 },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['founder-final-push-status'] });
      setLastBatchResult(data);

      if (data.remaining > 0) {
        toast({
          title: `Batch sent (${data.sent} emails)`,
          description: `${data.remaining} remaining — next batch in 10s`,
        });
        if (autoSending) setCountdown(10);
      } else {
        setIsSending(false);
        setAutoSending(false);
        setCountdown(0);
        toast({ title: 'All emails sent', description: 'Campaign complete' });
      }
    },
    onError: (error: Error) => {
      haptic.error();
      setIsSending(false);
      setAutoSending(false);
      setCountdown(0);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            countdownRef.current = null;
            sendBatchMutation.mutate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [countdown > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetCampaignMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'reset_campaign' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      setConfirmReset(false);
      setLastBatchResult(null);
      queryClient.invalidateQueries({ queryKey: ['founder-final-push-status'] });
      toast({ title: 'Campaign reset', description: `${data.reset} invites ready to re-send` });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleStartCampaign = () => {
    setConfirmSendBatch(false);
    setIsSending(true);
    setAutoSending(true);
    sendBatchMutation.mutate();
  };

  const handlePause = () => {
    setIsSending(false);
    setAutoSending(false);
    setCountdown(0);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const totalProspects = status?.totalProspects ?? 0;
  const sentCount = status?.sent ?? 0;
  const remainingCount = status?.remaining ?? 0;
  const progressPercent = totalProspects > 0 ? Math.round((sentCount / totalProspects) * 100) : 0;
  const sentEmails = status?.sentEmails ?? [];
  const remainingEmails = status?.remainingEmails ?? [];

  /* What the invite email promises. It lived in its own six-row card on a page
     about paying customers; it belongs with the thing that sends it. */
  const perks = [
    '£3.99/month locked for life',
    'Full inspection, testing, quotes and invoices',
    'AI circuit designer, cost engineer and RAMS',
    'Elec-ID verification',
    'Study centre — Level 2, Level 3 and upskilling',
    'Employer Hub access',
  ];

  /* One definition of the four risk bands, consumed by the stacked bar, the
     legend, the filter chips and the row colouring — so a band cannot be
     described one way in the hero and another way in the rail. */
  const bands: { key: Bucket; label: string; chip: string; sub: string; fill: string }[] = [
    {
      key: 'active',
      label: 'active',
      chip: 'Active',
      sub: 'signed in within 30 days',
      fill: SERIES.active,
    },
    {
      key: 'quiet',
      label: 'quiet',
      chip: 'Quiet',
      sub: '1–3 months since a sign-in',
      fill: SERIES.quiet,
    },
    {
      key: 'dormant',
      label: 'dormant',
      chip: 'Dormant',
      sub: 'no sign-in for over 3 months',
      fill: SERIES.dormant,
    },
    {
      key: 'unlinked',
      label: 'no account found',
      chip: 'Unlinked',
      sub: 'paying, but no Elec-Mate login matches the Stripe email',
      fill: SERIES.unlinked,
    },
  ];

  const atRisk = bucketTotals.dormant + bucketTotals.unlinked;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([refetchStripe(), refetchCampaign()]);
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Community"
          title="Founders"
          description="Everyone paying the £3.99 lifetime founder price, ranked by who is closest to leaving."
          tone="yellow"
          actions={
            <IconButton
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ADMIN_STRIPE_STATS_QUERY_KEY });
                refetchCampaign();
              }}
              aria-label="Refresh"
            >
              <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
            </IconButton>
          }
        />

        {/*
          An unreadable Stripe means NO number, not a zero.

          Every founder figure on this page comes from `admin-stripe-stats`. If
          that call fails — an expired admin session 401s it — `subscriptions`
          is undefined, `founders` is an empty array, and the hero would
          confidently render "0 paying founders / £0.00 a month" over a business
          with 62 of them. This is the one thing the page must never do, so the
          failure is stated instead of averaged into a nought.
        */}
        {stripeError && !stripeLoading && (
          <ListCard>
            <ListCardHeader tone="red" title="Founder figures unavailable" />
            <div className="px-4 py-4 sm:px-5">
              <p className="text-[12.5px] leading-relaxed text-white">
                Stripe could not be read, so the roster, the headline count and the reconciliation
                are hidden rather than shown as noughts. The invite campaign below is unaffected.{' '}
                {stripeError instanceof Error ? stripeError.message : String(stripeError)}
              </p>
            </div>
          </ListCard>
        )}

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            {/* Gated on `!stripeError` for the reason given above: with no
                Stripe response every founder figure collapses to zero, and a
                confident "0 founders, £0.00 MRR" is worse than no answer. */}
            {!stripeError && (
              <>
                {/*
              The hero.

              What stood here was a four-cell StatStrip whose first two cells —
              "Prospects 34" and "Invites sent 34 (100% of list)" — were counts
              from a finished mailing campaign, not counts of founders, and
              whose fourth cell invented "Founder MRR" by multiplying a
              head-count by 3.99. The one honest cell, "Subscribed", sat third.
              The number that matters is how many people pay us £3.99 a month
              for ever, and how many of them have stopped turning up.
            */}
                <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
                    <div className="min-w-0">
                      <Eyebrow>Paying founders (Stripe)</Eyebrow>
                      <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                        {founders.length}
                      </div>
                      <div className="mt-2 text-[13px] text-white">
                        {founders.length === 0
                          ? 'No live subscriptions on the founder price.'
                          : atRisk === 0
                            ? `${money(founderMrr)} a month, locked for life. Every one of them has signed in recently.`
                            : `${money(founderMrr)} a month, locked for life. ${atRisk} of them — ${money(
                                founders
                                  .filter((f) => f.bucket === 'dormant' || f.bucket === 'unlinked')
                                  .reduce((s, f) => s + f.monthly, 0)
                              )} a month — have not opened the app in three months.`}
                      </div>

                      {founders.length > 0 && (
                        <div className="mt-5">
                          {/* How the roster splits by how recently they signed in.
                          The same partition the filter chips use, so the bar
                          and the rail can never tell different stories. */}
                          <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                            {bands
                              .filter((b) => bucketTotals[b.key] > 0)
                              .map((b, i, seg) => (
                                <div
                                  key={b.key}
                                  title={`${bucketTotals[b.key]} ${b.label} — ${b.sub}`}
                                  style={{
                                    width: `calc(${
                                      (bucketTotals[b.key] / Math.max(founders.length, 1)) * 100
                                    }% - ${(2 * (seg.length - 1)) / seg.length}px)`,
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
                            {bands
                              .filter((b) => bucketTotals[b.key] > 0)
                              .map((b) => (
                                <span key={b.key} className="flex items-center gap-2" title={b.sub}>
                                  <span
                                    className="h-2 w-2 shrink-0 rounded-full"
                                    style={{ background: b.fill }}
                                  />
                                  <span className="font-medium tabular-nums text-white">
                                    {bucketTotals[b.key]}
                                  </span>{' '}
                                  {b.label}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                      {[
                        {
                          label: 'Founder MRR',
                          value: money(founderMrr, 0),
                          sub: `summed from Stripe, not ×${FOUNDER_PRICE}`,
                          onClick: () => {
                            setBucketFilter('all');
                            setLabelFilter('all');
                          },
                          colour: undefined as string | undefined,
                        },
                        {
                          label: 'Dormant',
                          value: bucketTotals.dormant,
                          sub: 'paying, not signing in',
                          onClick: () => setBucketFilter('dormant'),
                          colour: bucketTotals.dormant > 0 ? STATUS.warning : undefined,
                        },
                        {
                          /*
                        Replaces "New this month", which was structurally zero:
                        it was fed by the same invites-sent figure as the cell
                        beside it and had nothing to do with new founders.
                      */
                          label: 'Mislabelled',
                          value: mislabelledCount,
                          sub: 'app tier is not "founder"',
                          onClick: () => {
                            setBucketFilter('all');
                            setLabelFilter('mislabelled');
                          },
                          colour: mislabelledCount > 0 ? STATUS.warning : undefined,
                        },
                        {
                          label: 'Longest-standing',
                          value: longest ? tenureLabel(longest.tenureMs) : '—',
                          sub: longest?.name || longest?.email || 'no founders yet',
                          onClick: () => {
                            setBucketFilter('all');
                            setLabelFilter('all');
                          },
                          colour: undefined as string | undefined,
                        },
                      ].map((c) => (
                        <button
                          key={c.label}
                          onClick={c.onClick}
                          className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
                        >
                          <div
                            className="text-[22px] font-semibold leading-none text-white sm:text-[26px]"
                            style={c.colour ? { color: c.colour } : undefined}
                          >
                            {c.value}
                          </div>
                          <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                            {c.label}
                          </div>
                          <div className="mt-1 truncate text-[11px] text-white/60">{c.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/*
              One filter row.

              The page carried a full FilterBar whose three tabs — All / Active /
              Pending — were states of an email campaign, and "Pending" is
              structurally 0 because every one of the 34 prospects has already
              been emailed. Chips now partition the founders themselves by how
              recently they signed in, the label mismatch becomes an orthogonal
              select, and search sits on the same line.
            */}
                <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                      {(
                        [
                          /*
                        All is literally the sum of the four bands: every chip
                        count is computed over `searchAndLabelFiltered`, the same
                        array All reports, partitioned by a bucket each founder
                        holds exactly one of. The old rail could not add up — it
                        showed "All 34 · Active 34 · Pending 0" where Active was
                        the count of emails sent, not of anything active.
                      */
                          {
                            value: 'all' as const,
                            label: 'All',
                            count: searchAndLabelFiltered.length,
                          },
                          ...bands.map((b) => ({
                            value: b.key,
                            label: b.chip,
                            count: chipCounts[b.key],
                          })),
                        ] as { value: 'all' | Bucket; label: string; count: number }[]
                      ).map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setBucketFilter(t.value)}
                          className={cn(
                            'h-11 touch-manipulation rounded-full px-3.5 text-[12.5px] font-medium transition-colors',
                            bucketFilter === t.value
                              ? 'bg-elec-yellow text-black'
                              : 'text-white hover:bg-white/[0.08]'
                          )}
                        >
                          {t.label}
                          <span className="ml-1.5 text-[11px] tabular-nums opacity-70">
                            {t.count}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* w-full below sm so the search box never overflows a 375px
                    screen, auto-width from sm up where the chips share the row. */}
                    <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
                      <select
                        value={labelFilter}
                        onChange={(e) =>
                          setLabelFilter(e.target.value as 'all' | 'mislabelled' | 'labelled')
                        }
                        aria-label="Filter by tier label"
                        className="h-11 shrink-0 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12.5px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                      >
                        <option value="all">Any tier label</option>
                        <option value="mislabelled">Mislabelled ({mislabelledCount})</option>
                        <option value="labelled">
                          Labelled founder ({founders.length - mislabelledCount})
                        </option>
                      </select>

                      <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search founders…"
                        aria-label="Search founders by name or email"
                        className="h-11 min-w-0 flex-1 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-[12.5px] text-white placeholder:text-white/25 focus:border-elec-yellow focus:outline-none sm:w-64 sm:flex-none"
                      />
                    </div>
                  </div>
                </div>

                {/*
              The roster.

              What this list used to contain: email addresses from
              `founder-final-push`, whose server-side filter drops every address
              that already has an auth account. By construction not one row was a
              founder — yet each carried a yellow "Founder" pill, "£3.99" beside
              it, a green online dot and the subtitle "Activated" if an email had
              been sent to it. Thirty-four people who pay nothing were presented
              as thirty-four paying founders.
            */}
                <ListCard>
                  <ListCardHeader
                    tone="yellow"
                    title="Founder roster"
                    meta={
                      <>
                        <Pill tone="yellow">{visibleFounders.length}</Pill>
                        {atRisk > 0 && <Pill tone="red">{atRisk} at risk</Pill>}
                      </>
                    }
                  />
                  <ListBody>
                    {visibleFounders.length === 0 ? (
                      <div className="px-5 py-10">
                        <EmptyState
                          title="No founders match"
                          description={
                            founders.length === 0
                              ? 'Stripe reports no live subscriptions on the founder price.'
                              : 'Clear the filters or the search box to see the full roster.'
                          }
                        />
                      </div>
                    ) : (
                      visibleFounders.map((f) => {
                        const band = bands.find((b) => b.key === f.bucket)!;
                        const displayName = f.account?.full_name || f.name || f.email || 'Unknown';
                        return (
                          <ListRow
                            key={f.key}
                            // The accent marks "needs attention", not "is a founder"
                            // — every row here is a founder, so a pill saying so on
                            // each one, as before, carried no information at all.
                            accent={
                              f.bucket === 'unlinked'
                                ? 'purple'
                                : f.bucket === 'dormant'
                                  ? 'red'
                                  : undefined
                            }
                            lead={
                              <Avatar
                                initials={getInitials(displayName, f.email)}
                                online={f.bucket === 'active'}
                              />
                            }
                            subtitleWrap
                            /*
                          Everything lives in title/subtitle, nothing in
                          `trailing`. ListRow's trailing slot is shrink-0 while
                          the text block is flex-1 min-w-0, so a pill plus a
                          price in trailing ate the row on a phone and the email
                          — the only identifier most of these rows have —
                          collapsed to a few characters.
                        */
                            title={
                              <span className="flex items-baseline gap-2">
                                <span className="truncate font-semibold">{displayName}</span>
                                <span
                                  className="ml-auto shrink-0 text-[13px] font-semibold tabular-nums text-white"
                                  title={
                                    f.legacyPrice
                                      ? `Legacy founder price: ${money(f.priceAmount)} per ${f.interval}`
                                      : `Founder price: ${money(FOUNDER_PRICE)} per month`
                                  }
                                >
                                  {money(f.monthly)}/mo
                                </span>
                              </span>
                            }
                            subtitle={
                              <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                <span className="truncate text-white">
                                  {f.email ?? 'no email on the Stripe customer'}
                                </span>
                                <span className="text-white/60">·</span>
                                {/* How long they have been a founder — the whole
                                point of the tier, and absent before. */}
                                <span className="text-white">
                                  Founder {tenureLabel(f.tenureMs)}
                                </span>
                                <span className="text-white/60">·</span>
                                <span
                                  className="font-medium"
                                  style={{
                                    color: f.bucket === 'active' ? STATUS.good : band.fill,
                                  }}
                                >
                                  {f.bucket === 'unlinked'
                                    ? 'no app account found'
                                    : seenLabel(f.daysSinceSeen)}
                                </span>
                                {f.mislabelled && (
                                  <Pill tone="amber">app says {f.accountTier ?? 'no tier'}</Pill>
                                )}
                                {f.legacyPrice && <Pill tone="purple">legacy price</Pill>}
                              </span>
                            }
                          />
                        );
                      })
                    )}
                  </ListBody>
                </ListCard>

                {/*
              The discrepancy, stated rather than hidden.

              Stripe bills N people on the founder price. `subscription_tier`
              recognises far fewer, because `check-subscription` maps the live
              founder price id to the string 'employer' (founders get Employer
              Hub access, and the tier field was used to grant it). Any founder
              count taken from profiles is therefore an undercount — this card
              exists so nobody reads the roster above and then wonders why the
              users page disagrees.
            */}
                <ListCard>
                  <ListCardHeader
                    tone="amber"
                    title="Why the founder count disagrees"
                    meta={
                      <Pill tone={founders.length === profilesFounderCount ? 'emerald' : 'amber'}>
                        {founders.length === profilesFounderCount
                          ? 'reconciled'
                          : `${Math.abs(founders.length - profilesFounderCount)} apart`}
                      </Pill>
                    }
                  />
                  <ListBody>
                    <ListRow
                      title="Stripe — live subscriptions on a founder price"
                      subtitle="The source this page counts. Includes the legacy £6.99 and £5.99 founder-classified test prices."
                      trailing={
                        <span className="text-[15px] font-semibold text-white">
                          {founders.length}
                        </span>
                      }
                    />
                    <ListRow
                      title={'App accounts whose tier says "founder"'}
                      subtitle="Matched case-insensitively, so both 'founder' and 'Founder' are counted."
                      trailing={
                        <span className="text-[15px] font-semibold text-white">
                          {profilesFounderCount}
                        </span>
                      }
                    />
                    <ListRow
                      accent="amber"
                      title="Founders the app tags as Employer instead"
                      subtitle="check-subscription maps the live founder price id to the tier string 'employer', because founders are entitled to the Employer Hub. The tier field then reads as their plan everywhere else in the admin app."
                      subtitleWrap
                      trailing={
                        <span
                          className="text-[15px] font-semibold"
                          style={{ color: STATUS.warning }}
                        >
                          {taggedEmployerCount}
                        </span>
                      }
                    />
                    <ListRow
                      title="Accounts storing a capitalised tier"
                      subtitle="subscription_tier is not normalised — 'Electrician', 'Employer' and 'Apprentice' all exist alongside their lowercase twins. Any equality match on this column drops these rows silently."
                      subtitleWrap
                      trailing={
                        <span className="text-[15px] font-semibold text-white">
                          {oddCaseTierCount}
                        </span>
                      }
                    />
                  </ListBody>
                </ListCard>
              </>
            )}

            {/*
              Invites: one card, not three.

              "Send individual invite", "Perks & benefits" and "Batch campaign"
              were three separate full-width cards saying one thing — this is
              how we recruit founders and this is what we promise them. The
              progress bar has also gone: with 34 of 34 prospects emailed it is
              a permanently full bar reporting 100%, which is decoration.
            */}
            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Recruit founders"
                meta={
                  campaignLoading ? (
                    <Pill tone="yellow">loading…</Pill>
                  ) : remainingCount > 0 ? (
                    <Pill tone="yellow">{remainingCount} left to email</Pill>
                  ) : (
                    <Pill tone="emerald">list exhausted</Pill>
                  )
                }
                action="View prospects"
                onAction={() => setShowProspectList(true)}
              />
              <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
                {/*
                  Says what the campaign list actually is.

                  It was labelled "Prospects" and its rows were labelled
                  "Founders". `founder-final-push` excludes every address that
                  already has an account, so this list is by definition people
                  who have never signed up.
                */}
                <p className="text-[12.5px] leading-relaxed text-white">
                  {totalProspects} addresses on the invite list, none of which has an Elec-Mate
                  account — the campaign filters out anyone who already signed up.{' '}
                  {remainingCount > 0
                    ? `${sentCount} emailed, ${remainingCount} still to go.`
                    : `All ${sentCount} have been emailed (${progressPercent}% of the list); there is nobody left to send to.`}
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inviteEmail.trim() && inviteEmail.includes('@')) {
                        sendInviteMutation.mutate(inviteEmail.trim());
                      }
                    }}
                    className="h-11 flex-1 touch-manipulation rounded-full border-white/[0.08] bg-[hsl(0_0%_10%)] px-4 text-[13px] text-white placeholder:text-white/25 focus-visible:border-elec-yellow/60 focus-visible:ring-0"
                    disabled={sendInviteMutation.isPending}
                  />
                  <button
                    onClick={() => sendInviteMutation.mutate(inviteEmail.trim())}
                    disabled={
                      sendInviteMutation.isPending ||
                      !inviteEmail.trim() ||
                      !inviteEmail.includes('@')
                    }
                    className="inline-flex h-11 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black disabled:opacity-50"
                  >
                    {sendInviteMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send invite
                  </button>
                </div>

                <div className="border-t border-white/[0.08] pt-4">
                  {remainingCount > 0 ? (
                    <div className="space-y-2">
                      {!isSending ? (
                        <button
                          onClick={() => setConfirmSendBatch(true)}
                          className="inline-flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-white/[0.06] text-[13px] font-semibold text-white"
                        >
                          <Play className="h-4 w-4" />
                          {sentCount > 0
                            ? 'Continue the batch campaign'
                            : 'Start the batch campaign'}
                        </button>
                      ) : sendBatchMutation.isPending ? (
                        <div className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] text-[13px] font-semibold text-white">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending batch…
                        </div>
                      ) : countdown > 0 ? (
                        <div className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] text-[13px] font-semibold text-white">
                          <Timer className="h-4 w-4" />
                          Next batch in {countdown}s
                        </div>
                      ) : (
                        <button
                          onClick={() => sendBatchMutation.mutate()}
                          className="inline-flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-elec-yellow text-[13px] font-semibold text-black"
                        >
                          <Send className="h-4 w-4" />
                          Send next 7
                        </button>
                      )}
                      {isSending && (
                        <button
                          onClick={handlePause}
                          disabled={sendBatchMutation.isPending}
                          className="inline-flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] font-semibold text-white disabled:opacity-50"
                        >
                          <Pause className="h-4 w-4" />
                          Pause
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmReset(true)}
                      disabled={resetCampaignMutation.isPending || totalProspects === 0}
                      className="inline-flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] font-semibold text-white disabled:opacity-50"
                    >
                      {resetCampaignMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RotateCcw className="h-4 w-4" />
                      )}
                      Reset and re-send to all {totalProspects}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-white">Test email</div>
                    <div className="text-[11.5px] text-white">
                      Preview the invite before sending it to anybody
                    </div>
                  </div>
                  <TextAction onClick={() => setConfirmSendTest(true)}>Send test →</TextAction>
                </div>

                <div className="border-t border-white/[0.08] pt-4">
                  <Eyebrow>What the invite promises</Eyebrow>
                  <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                    {perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[12.5px] text-white">
                        <span
                          aria-hidden
                          className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: STATUS.good }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ListCard>

            {lastBatchResult && (
              <ListCard>
                <ListCardHeader
                  tone={lastBatchResult.failed > 0 ? 'red' : 'emerald'}
                  title="Last batch"
                  meta={
                    <Pill tone={lastBatchResult.failed > 0 ? 'red' : 'emerald'}>
                      {lastBatchResult.sent} sent
                      {lastBatchResult.failed > 0 && ` · ${lastBatchResult.failed} failed`}
                    </Pill>
                  }
                />
                <ListBody>
                  {lastBatchResult.sentEmails?.map((email, i) => (
                    <ListRow
                      key={`sent-${i}`}
                      lead={<Avatar initials={getInitials(null, email)} size="sm" online />}
                      title={email}
                      trailing={<Pill tone="emerald">Sent</Pill>}
                    />
                  ))}
                  {lastBatchResult.errors?.map((err, i) => (
                    <ListRow
                      key={`err-${i}`}
                      title={err}
                      trailing={<Pill tone="red">Failed</Pill>}
                      accent="red"
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}
          </>
        )}

        {/* Prospects, named as prospects. The sheet's title said
            "All 34 founders" over a list of people with no account. */}
        <Sheet open={showProspectList} onOpenChange={setShowProspectList}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-3xl border-t border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1.5 w-12 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="border-b border-white/[0.06] px-6 pb-4">
                <SheetTitle className="flex items-center gap-2 text-white">
                  Invite prospects
                  <Pill tone="yellow">{totalProspects}</Pill>
                </SheetTitle>
                <p className="text-left text-[12px] text-white">
                  None of these addresses has an Elec-Mate account. They are not founders.
                </p>
              </SheetHeader>
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {sentEmails.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="emerald"
                      title="Already emailed"
                      meta={<Pill tone="emerald">{sentEmails.length}</Pill>}
                    />
                    <ListBody>
                      {sentEmails.map((email, i) => (
                        <ListRow
                          key={`s-${i}`}
                          lead={<Avatar initials={getInitials(null, email)} size="sm" />}
                          title={email}
                          trailing={<Pill tone="emerald">Emailed</Pill>}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {remainingEmails.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="amber"
                      title="Not emailed yet"
                      meta={<Pill tone="amber">{remainingEmails.length}</Pill>}
                    />
                    <ListBody>
                      {remainingEmails.map((email, i) => (
                        <ListRow
                          key={`r-${i}`}
                          lead={<Avatar initials={getInitials(null, email)} size="sm" />}
                          title={email}
                          trailing={<Pill tone="amber">Queued</Pill>}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {sentEmails.length === 0 && remainingEmails.length === 0 && (
                  <EmptyState
                    title="No prospects"
                    description="Invite addresses appear here once created and sent."
                  />
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmSendBatch} onOpenChange={setConfirmSendBatch}>
          <AlertDialogContent className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Start campaign?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will email {remainingCount} prospects in batches of 7 with a 10-second pause
                between each batch. You can pause at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-full border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-full bg-elec-yellow font-semibold text-black"
                onClick={handleStartCampaign}
              >
                <Play className="mr-2 h-4 w-4" />
                Start sending
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
          <AlertDialogContent className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Reset campaign?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This clears the sent flag on every invite so all {totalProspects} prospects receive
                the email again. Anyone who has since created an account is still filtered out
                automatically.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-full border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-full bg-elec-yellow font-semibold text-black"
                onClick={() => resetCampaignMutation.mutate()}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset and re-send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={confirmSendTest} onOpenChange={setConfirmSendTest}>
          <AlertDialogContent className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Send test email?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This sends the founder invite to founder@elec-mate.com so you can preview it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation rounded-full border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                disabled={sendTestMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-full bg-elec-yellow font-semibold text-black"
                onClick={() => sendTestMutation.mutate()}
                disabled={sendTestMutation.isPending}
              >
                {sendTestMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send test
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
