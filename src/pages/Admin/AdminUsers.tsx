import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminPagination from '@/components/admin/AdminPagination';
import {
  RefreshCw,
  Shield,
  ShieldOff,
  Trash2,
  Gift,
  AlertTriangle,
  XCircle,
  Loader2,
  MessageSquare,
  Download,
  X,
  MoreHorizontal,
  Send,
} from 'lucide-react';
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
import { format, differenceInDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  ROLE_COLORS,
  SCORE_COLOR_MAP,
  calculateEngagementScore,
  formatTimeShort,
  getScoreColor,
} from '@/utils/adminUtils';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import SwipeableAdminRow from '@/components/admin/SwipeableAdminRow';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { PageFrame, IconButton, EmptyState } from '@/components/admin/editorial';
import {
  AQUA,
  BLUE,
  GOOD,
  ORANGE,
  SERIOUS,
  VIOLET,
  YELLOW,
  DE_EMPHASIS,
  Delta,
  KpiTile,
  Legend,
  Panel,
  SectionHead,
  Sparkline,
  StackBar,
  StateDot,
} from '@/components/admin/overview/primitives';
import { useAdminOverviewSeries } from '@/hooks/useAdminOverviewSeries';

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
  admin_role: string | null;
  subscribed: boolean;
  subscription_tier: string | null;
  stripe_customer_id?: string | null;
  free_access_granted?: boolean;
  created_at: string;
  updated_at: string | null;
  elec_id_enabled: boolean;
  onboarding_completed: boolean;
  last_seen?: string;
  isOnline?: boolean;
  email?: string | null;
  email_confirmed?: boolean;
  last_sign_in?: string | null;
  elec_id_profile?: {
    id: string;
    elec_id_number: string | null;
    is_verified: boolean;
    activated: boolean;
    ecs_card_type: string | null;
  } | null;
}


/** One hue per role, fixed — the same hues the overview gives the plans. */
const ROLES: Array<{ key: string; label: string; color: string }> = [
  { key: 'electrician', label: 'Electricians', color: ORANGE },
  { key: 'apprentice', label: 'Apprentices', color: BLUE },
  { key: 'employer', label: 'Employers', color: AQUA },
  { key: 'college', label: 'College', color: YELLOW },
  { key: 'visitor', label: 'Visitors', color: VIOLET },
];
const roleColor = (role: string | null | undefined) =>
  ROLES.find((r) => r.key === (role || 'visitor').toLowerCase())?.color ?? VIOLET;
const roleLabel = (role: string | null | undefined) => {
  const r = (role || 'visitor').toLowerCase();
  return r.charAt(0).toUpperCase() + r.slice(1);
};

const roleFilters = [
  { value: 'all', label: 'All roles' },
  { value: 'electrician', label: 'Electricians' },
  { value: 'apprentice', label: 'Apprentices' },
  { value: 'employer', label: 'Employers' },
];

/*
  Two kinds of filter. Status describes people; attention says what to do.
  "Trials" used to mean "not paying" — 920 people, most of whom finished a
  trial months ago. It now means a live trial in Stripe or the stores.
*/
const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active_today', label: 'Active today' },
  { value: 'subscribed', label: 'Paying' },
  { value: 'trials', label: 'On trial' },
  { value: 'free', label: 'Comped' },
  { value: 'not_paying', label: 'Not paying' },
  { value: 'not_onboarded', label: 'Never set up' },
  { value: 'never_logged_in', label: 'Never opened' },
  { value: 'most_engaged', label: 'Most engaged' },
];
const attentionViews = [
  { value: 'trial_ending', label: 'Trial ends in 3 days' },
  { value: 'paying_quiet', label: 'Paying, quiet 30 days+' },
  { value: 'new_not_setup', label: 'New, never set up' },
  { value: 'abandoned', label: 'Abandoned checkout' },
];
const quickFilters = [...statusFilters, ...attentionViews];
const joinedWindows = [
  { value: 'all', label: 'Any time' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];
type SortKey = 'name' | 'joined' | 'last_active' | 'engagement' | 'value';
const SORTS: Array<{ value: SortKey; label: string }> = [
  { value: 'joined', label: 'Newest first' },
  { value: 'name', label: 'By name' },
  { value: 'last_active', label: 'Last active' },
  { value: 'engagement', label: 'Most engaged' },
  { value: 'value', label: 'Most valuable' },
];
/** What a paying account is worth a month at list price. Comped accounts are £0 — they are cost, not revenue. */
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
const gbp = (v: number, dp = 0) =>
  '£' + v.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp });

function untilTime(dateStr: string | undefined | null): string {
  if (!dateStr) return '';
  const ms = new Date(dateStr).getTime() - Date.now();
  if (ms <= 0) return 'now';
  if (ms < 3_600_000) return `in ${Math.max(1, Math.floor(ms / 60_000))}m`;
  if (ms < 86_400_000) return `in ${Math.floor(ms / 3_600_000)}h`;
  return `in ${Math.floor(ms / 86_400_000)}d`;
}
function relativeTime(dateStr: string | undefined | null): string {
  if (!dateStr) return 'never';
  const ms = Date.now() - new Date(dateStr).getTime();
  if (ms < 60_000) return 'just now';
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}h ago`;
  const days = Math.floor(ms / 86_400_000);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/* Same validated dark-surface steps as the other admin pages:
     node scripts/validate_palette.js "#3987E5,#E66767,#199E70" \
       --mode dark --surface "#1C1C1C"  -> all checks pass */
const USER_SERIES = ['#3987E5', '#199E70', '#E66767'] as const;

function BulkMessageSheet({
  open,
  onOpenChange,
  count,
  sending,
  onSend,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  sending: boolean;
  onSend: (subject: string, message: string, messageType: 'in_app' | 'both') => void;
}) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'in_app' | 'both'>('both');
  const ready = subject.trim().length > 0 && message.trim().length > 0 && count > 0;
  return (
    <Sheet open={open} onOpenChange={(o) => !sending && onOpenChange(o)}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="border-b border-white/[0.1] px-4 py-3">
            <div className="text-[15px] font-semibold text-white">
              Message {count.toLocaleString('en-GB')} {count === 1 ? 'person' : 'people'}
            </div>
            <div className="text-[12px] text-white">
              Everyone selected gets the same message. It lands in their inbox
              {messageType === 'both' ? ' and by email' : ''}.
            </div>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What it is about"
                className="input-underline h-11 w-full touch-manipulation rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Write it as you would to one person."
                className="input-underline min-h-[140px] w-full touch-manipulation resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white">Send as</label>
              <div className="flex gap-2">
                {(
                  [
                    { v: 'both', l: 'Email and in-app' },
                    { v: 'in_app', l: 'In-app only' },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setMessageType(o.v)}
                    className={cn(
                      'h-11 touch-manipulation rounded-full border px-4 text-[13px] transition-colors',
                      messageType === o.v
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                    )}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.1] px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
            <button
              type="button"
              disabled={!ready || sending}
              onClick={() => onSend(subject.trim(), message.trim(), messageType)}
              className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-opacity disabled:opacity-50"
            >
              {sending
                ? 'Sending…'
                : `Send to ${count.toLocaleString('en-GB')} ${count === 1 ? 'person' : 'people'}`}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function AdminUsers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [searchParams, setSearchParams] = useSearchParams();
  // The view is the address: "electricians, never set up, newest first" is a link.
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '');
  const [roleFilter, setRoleFilter] = useState(() => {
    const r = searchParams.get('role');
    return r && roleFilters.some((f) => f.value === r) ? r : 'all';
  });
  const [quickFilter, setQuickFilter] = useState(() => {
    const f = searchParams.get('filter');
    return f && quickFilters.some((q) => q.value === f) ? f : 'all';
  });
  const [joinedWindow, setJoinedWindow] = useState(() => {
    const j = searchParams.get('joined');
    return j && joinedWindows.some((w) => w.value === j) ? j : 'all';
  });
  const [bulkMessageOpen, setBulkMessageOpen] = useState(false);
  const [rowActionsUser, setRowActionsUser] = useState<UserProfile | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Two-step inline confirm for revoking comped access — the old revoke
  // button lived in a display:hidden div and was unreachable.
  const [revokeArmed, setRevokeArmed] = useState(false);
  const [messageUser, setMessageUser] = useState<{
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionPending, setBulkActionPending] = useState(false);

  const [grantSheetUser, setGrantSheetUser] = useState<UserProfile | null>(null);
  const [grantTier, setGrantTier] = useState('');
  const [grantDuration, setGrantDuration] = useState('7');
  const [sortBy, setSortBy] = useState<SortKey>(() => {
    const v = searchParams.get('sort');
    return v && SORTS.some((o) => o.value === v) ? (v as SortKey) : 'joined';
  });
  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    const put = (k: string, v: string, def: string) => (v === def ? p.delete(k) : p.set(k, v));
    put('filter', quickFilter, 'all');
    put('role', roleFilter, 'all');
    put('sort', sortBy, 'joined');
    put('joined', joinedWindow, 'all');
    put('q', search, '');
    if (p.toString() !== searchParams.toString()) setSearchParams(p, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickFilter, roleFilter, sortBy, joinedWindow, search]);

  // Links from other pages (?filter=active_today) arrive after mount.
  useEffect(() => {
    const f = searchParams.get('filter');
    if (f && f !== quickFilter && quickFilters.some((q) => q.value === f)) setQuickFilter(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const isSuperAdmin = profile?.admin_role === 'super_admin';
  const { data: series } = useAdminOverviewSeries();
  const signupsDaily = series?.signups_daily ?? [];
  const signups30 = signupsDaily.slice(-30).reduce((t, d) => t + d.n, 0);
  const signupsPrev30 = signupsDaily.slice(-60, -30).reduce((t, d) => t + d.n, 0);
  const signupsPct =
    signupsDaily.length >= 60 && signupsPrev30 > 0
      ? Math.round(((signups30 - signupsPrev30) / signupsPrev30) * 100)
      : null;

  const {
    data: baseUsers,
    isLoading: baseLoading,
    refetch: refetchBase,
    isFetching: baseFetching,
  } = useAdminUsersBase();

  /*
    Enrich once, filter in memory.

    This query used to carry the search text, role and status in its key, so
    every keystroke re-ran two batched queries over all 1,788 accounts. The
    join with presence and Elec-ID depends only on the account list; filters
    are a useMemo below and cost nothing.
  */
  const {
    data: enriched,
    isLoading: enrichmentLoading,
    refetch: refetchEnrichment,
    isFetching: enrichmentFetching,
  } = useQuery({
    queryKey: ['admin-users-enriched', baseUsers?.length ?? 0],
    enabled: !!baseUsers,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    queryFn: async () => {
      const allUsers = [...(baseUsers || [])] as UserProfile[];
      const userIds = allUsers.map((u) => u.id);
      const [presenceData, elecIdData] = await Promise.all([
        batchedInQuery('user_presence', 'user_id', userIds, 'user_id, last_seen'),
        batchedInQuery(
          'employer_elec_id_profiles',
          'employee_id',
          userIds,
          'id, employee_id, elec_id_number, is_verified, activated, ecs_card_type'
        ),
      ]);
      const presenceMap = new Map(presenceData?.map((p) => [p.user_id, p.last_seen]) || []);
      const elecIdMap = new Map(
        elecIdData?.map((p) => [
          p.employee_id,
          {
            id: p.id,
            elec_id_number: p.elec_id_number,
            is_verified: p.is_verified,
            activated: p.activated,
            ecs_card_type: p.ecs_card_type,
          },
        ]) || []
      );
      return allUsers.map((user) => ({
        ...user,
        last_seen: presenceMap.get(user.id) || user.last_seen,
        isOnline:
          !!presenceMap.get(user.id) &&
          new Date(presenceMap.get(user.id)!).getTime() > Date.now() - 5 * 60 * 1000,
        elec_id_profile: elecIdMap.get(user.id) || null,
      })) as UserProfile[];
    },
  });
  // Rows appear from the base list at once; presence and Elec-ID fill in when the join lands.
  const enrichmentPending = !!baseUsers && !enriched;
  const everyone = useMemo<UserProfile[]>(
    () => enriched ?? ((baseUsers ?? []) as UserProfile[]),
    [enriched, baseUsers]
  );

  /*
    Live trials from the billing rails, not a guess from profile flags.
    Stripe reports trialing subscriptions by customer email; RevenueCat by
    account id. Both carry the trial end, which "Trial ends in 3 days" needs.
  */
  const { data: liveSubs } = useQuery({
    queryKey: ['admin-users-live-subs'],
    staleTime: 60_000,
    refetchInterval: 60_000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return null;
      const headers = { Authorization: `Bearer ${session.access_token}` };
      const [stripeRes, rcRes] = await Promise.all([
        supabase.functions.invoke('admin-stripe-stats', { headers }),
        supabase.functions.invoke('admin-revenuecat-stats', { headers }),
      ]);
      const stripe = stripeRes.data as {
        stripe?: { activeSubscriptions?: number };
        trialingList?: Array<{ customerEmail: string; trialEnd: string | null }>;
        subscriptions?: Array<{ customerEmail: string; monthlyAmount: number; status: string }>;
      } | null;
      const rc = rcRes.data as {
        subscribersBySource?: { app_store?: number; play_store?: number };
        revenuecat?: { activeSubscriptions?: number };
        trialUsers?: Array<{ id: string; trial_end: string | null; is_cancelled: boolean }>;
        paidUsers?: Array<{ id: string; subscription_tier: string }>;
      } | null;
      const playStore = rc?.subscribersBySource?.play_store ?? 0;
      const appStoreDb = rc?.subscribersBySource?.app_store ?? 0;
      const rcLivePaid = rc?.revenuecat?.activeSubscriptions ?? 0;
      const appStore = rcLivePaid > 0 ? Math.max(rcLivePaid - playStore, appStoreDb) : appStoreDb;
      const trialByEmail = new Map<string, string | null>();
      for (const t of stripe?.trialingList ?? []) {
        if (t.customerEmail) trialByEmail.set(t.customerEmail.toLowerCase(), t.trialEnd);
      }
      const trialById = new Map<string, string | null>();
      for (const t of rc?.trialUsers ?? []) {
        if (!t.is_cancelled) trialById.set(t.id, t.trial_end);
      }
      // Who is actually billing, and for how much. profiles.subscribed
      // overcounts (stale rows, trials), so value comes from the rails.
      const paidByEmail = new Map<string, number>();
      for (const sub of stripe?.subscriptions ?? []) {
        if (sub.customerEmail && sub.status === 'active') {
          const e = sub.customerEmail.toLowerCase();
          paidByEmail.set(e, (paidByEmail.get(e) ?? 0) + (sub.monthlyAmount || 0));
        }
      }
      const paidById = new Map<string, number>();
      for (const u of rc?.paidUsers ?? []) {
        paidById.set(u.id, TIER_MRR[(u.subscription_tier ?? '').toLowerCase()] ?? 0);
      }
      return {
        paying: (stripe?.stripe?.activeSubscriptions ?? 0) + appStore + playStore,
        trialByEmail,
        trialById,
        paidByEmail,
        paidById,
      };
    },
  });
  const realPaying = liveSubs?.paying;
  /** Monthly value from the billing rails; 0 when not billing. undefined while the rails load. */
  const liveValue = useCallback(
    (u: UserProfile): number | undefined => {
      if (!liveSubs) return undefined;
      if (u.free_access_granted) return 0;
      if (liveSubs.paidById.has(u.id)) return liveSubs.paidById.get(u.id) ?? 0;
      const e = u.email?.toLowerCase();
      if (e && liveSubs.paidByEmail.has(e)) return liveSubs.paidByEmail.get(e) ?? 0;
      return 0;
    },
    [liveSubs]
  );
  const trialEnd = useCallback(
    (u: UserProfile): string | null | undefined => {
      if (!liveSubs) return undefined;
      if (liveSubs.trialById.has(u.id)) return liveSubs.trialById.get(u.id) ?? null;
      const e = u.email?.toLowerCase();
      if (e && liveSubs.trialByEmail.has(e)) return liveSubs.trialByEmail.get(e) ?? null;
      return undefined;
    },
    [liveSubs]
  );

  const users = useMemo<UserProfile[]>(() => {
    let list = everyone;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q) ||
          u.username?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    }
    if (roleFilter !== 'all') list = list.filter((u) => u.role === roleFilter);
    if (joinedWindow !== 'all') {
      const since = Date.now() - Number(joinedWindow) * 86400 * 1000;
      list = list.filter((u) => u.created_at && new Date(u.created_at).getTime() >= since);
    }
    const now = Date.now();
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const sevenDaysAgo = now - 7 * 86400 * 1000;
    const thirtyDaysAgo = now - 30 * 86400 * 1000;
    const in3d = now + 3 * 86400 * 1000;
    switch (quickFilter) {
      case 'active_today':
        list = list.filter((u) => u.last_seen && new Date(u.last_seen).getTime() >= todayStart);
        break;
      case 'subscribed':
        list = list.filter((u) => (liveValue(u) ?? (u.subscribed && !u.free_access_granted ? 1 : 0)) > 0);
        break;
      case 'trials':
        list = list.filter((u) => trialEnd(u) !== undefined);
        break;
      case 'free':
        list = list.filter((u) => u.free_access_granted);
        break;
      case 'not_paying':
        list = list.filter(
          (u) => !u.free_access_granted && (liveValue(u) ?? 0) === 0 && trialEnd(u) === undefined
        );
        break;
      case 'not_onboarded':
        list = list.filter((u) => !u.onboarding_completed);
        break;
      case 'never_logged_in':
        // profiles.last_sign_in is a dead column — no presence record is the real signal.
        list = list.filter((u) => !u.last_seen);
        break;
      case 'trial_ending':
        list = list.filter((u) => {
          const end = trialEnd(u);
          if (!end) return false;
          const t = new Date(end).getTime();
          return t >= now && t <= in3d;
        });
        break;
      case 'paying_quiet':
        list = list.filter(
          (u) =>
            (liveValue(u) ?? 0) > 0 &&
            (!u.last_seen || new Date(u.last_seen).getTime() < thirtyDaysAgo)
        );
        break;
      case 'new_not_setup':
        list = list.filter(
          (u) => !u.onboarding_completed && new Date(u.created_at).getTime() >= sevenDaysAgo
        );
        break;
      case 'abandoned':
        list = list.filter(
          (u) =>
            !!u.stripe_customer_id &&
            !u.subscribed &&
            !u.free_access_granted &&
            new Date(u.created_at).getTime() >= sevenDaysAgo
        );
        break;
    }
    return list;
  }, [everyone, search, roleFilter, joinedWindow, quickFilter, trialEnd, liveValue]);
  const isLoading = baseLoading;
  void enrichmentLoading;
  const isFetching = baseFetching || enrichmentFetching;
  const refetch = async () => {
    await refetchBase();
    await refetchEnrichment();
  };

  const needsFullEngagement = sortBy === 'engagement' || quickFilter === 'most_engaged';
  const allUserIds = useMemo(() => users?.map((u) => u.id) || [], [users]);
  const { data: engagementData } = useQuery({
    queryKey: ['admin-users-engagement', needsFullEngagement ? allUserIds : 'deferred'],
    enabled: needsFullEngagement && allUserIds.length > 0,
    staleTime: 60000,
    queryFn: async () => {
      const rows = await batchedInQuery(
        'user_activity_summary',
        'user_id',
        allUserIds,
        'user_id, login_count, page_view_count, total_seconds_tracked, feature_use_count, active_days, unique_pages_visited'
      );
      const scoreMap = new Map<string, number>();
      const rawMap = new Map<
        string,
        {
          login_count: number;
          page_view_count: number;
          total_seconds_tracked: number;
          unique_pages_visited: number;
        }
      >();
      for (const row of rows || []) {
        scoreMap.set(row.user_id, calculateEngagementScore(row));
        rawMap.set(row.user_id, {
          login_count: row.login_count || 0,
          page_view_count: row.page_view_count || 0,
          total_seconds_tracked: row.total_seconds_tracked || 0,
          unique_pages_visited: row.unique_pages_visited || 0,
        });
      }
      return { scoreMap, rawMap };
    },
  });
  const engagementMap = engagementData?.scoreMap;
  const engagementRawMap = engagementData?.rawMap;

  const allUsersCount = useMemo(() => {
    return users?.length || 0;
  }, [users]);

  const stats = useMemo(
    () => ({
      total: users?.length || 0,
      online: users?.filter((u) => u.isOnline).length || 0,
      subscribed: users?.filter((u) => u.subscribed).length || 0,
      admins: users?.filter((u) => u.admin_role).length || 0,
      notOnboarded: users?.filter((u) => !u.onboarding_completed).length || 0,
      elecIds: users?.filter((u) => u.elec_id_profile).length || 0,
      thisWeek:
        users?.filter((u) => {
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return u.created_at && new Date(u.created_at) >= weekAgo;
        }).length || 0,
      byRole: ROLES.map((r) => ({
        ...r,
        count: everyone.filter((u) => (u.role || 'visitor').toLowerCase() === r.key).length,
      })).filter((r) => r.count > 0),
    }),
    [users, everyone]
  );

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    let filtered = [...users];

    if (quickFilter === 'most_engaged') {
      filtered = filtered.filter((u) => {
        const score = engagementMap?.get(u.id);
        return score !== undefined && score > 55;
      });
    }

    const sorted = filtered;
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''));
        break;
      case 'joined':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'last_active':
        sorted.sort((a, b) => {
          const aTime = a.last_seen ? new Date(a.last_seen).getTime() : 0;
          const bTime = b.last_seen ? new Date(b.last_seen).getTime() : 0;
          return bTime - aTime;
        });
        break;
      case 'engagement':
        sorted.sort((a, b) => (engagementMap?.get(b.id) || 0) - (engagementMap?.get(a.id) || 0));
        break;
      case 'value':
        sorted.sort((a, b) => (liveValue(b) ?? 0) - (liveValue(a) ?? 0));
        break;
    }
    return sorted;
  }, [users, sortBy, engagementMap, quickFilter, liveValue]);
  // What the people in view bring in a month, and what the trialists among them would.
  const filteredValue = useMemo(
    () => sortedUsers.reduce((t, u) => t + (liveValue(u) ?? 0), 0),
    [sortedUsers, liveValue]
  );
  const filteredTrials = useMemo(
    () =>
      sortedUsers.reduce(
        (acc, u) => {
          if (trialEnd(u) === undefined) return acc;
          acc.count += 1;
          acc.value += TIER_MRR[(u.subscription_tier ?? '').toLowerCase()] ?? 0;
          return acc;
        },
        { count: 0, value: 0 }
      ),
    [sortedUsers, trialEnd]
  );

  const totalPages = Math.ceil((sortedUsers.length || 0) / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    if (!sortedUsers.length) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(start, start + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  const paginatedUserIds = useMemo(() => paginatedUsers.map((u) => u.id), [paginatedUsers]);
  const { data: pageEngagementData } = useQuery({
    queryKey: ['admin-users-engagement-page', paginatedUserIds],
    enabled: !needsFullEngagement && paginatedUserIds.length > 0,
    staleTime: 60000,
    queryFn: async () => {
      const rows = await batchedInQuery(
        'user_activity_summary',
        'user_id',
        paginatedUserIds,
        'user_id, login_count, page_view_count, total_seconds_tracked, feature_use_count, active_days, unique_pages_visited'
      );
      const scoreMap = new Map<string, number>();
      const rawMap = new Map<
        string,
        {
          login_count: number;
          page_view_count: number;
          total_seconds_tracked: number;
          unique_pages_visited: number;
        }
      >();
      for (const row of rows || []) {
        scoreMap.set(row.user_id, calculateEngagementScore(row));
        rawMap.set(row.user_id, {
          login_count: row.login_count || 0,
          page_view_count: row.page_view_count || 0,
          total_seconds_tracked: row.total_seconds_tracked || 0,
          unique_pages_visited: row.unique_pages_visited || 0,
        });
      }
      return { scoreMap, rawMap };
    },
  });

  const effectiveEngagementMap = engagementMap || pageEngagementData?.scoreMap;
  const effectiveEngagementRawMap = engagementRawMap || pageEngagementData?.rawMap;

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [search, roleFilter, quickFilter, sortBy, joinedWindow]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedUsers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const isAllSelected = paginatedUsers.length > 0 && selectedIds.size === paginatedUsers.length;

  const bulkGrantMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      setBulkActionPending(true);
      const results = await Promise.allSettled(
        userIds.map((userId) =>
          supabase.functions.invoke('admin-grant-subscription', {
            body: { userId, tier: 'Employer' },
          })
        )
      );
      const failures = results.filter((r) => r.status === 'rejected').length;
      if (failures > 0) {
        throw new Error(`${failures} of ${userIds.length} grants failed`);
      }
      return results;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
      setSelectedIds(new Set());
      toast({
        title: 'Access granted',
        description: `Granted access to ${selectedIds.size} users`,
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setBulkActionPending(false);
    },
  });

  const bulkRevokeMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      setBulkActionPending(true);
      const results = await Promise.allSettled(
        userIds.map((userId) =>
          supabase.functions.invoke('admin-manage-subscription', {
            body: { action: 'revoke_free_access', target_user_id: userId },
          })
        )
      );
      const failures = results.filter((r) => r.status === 'rejected').length;
      if (failures > 0) {
        throw new Error(`${failures} of ${userIds.length} revokes failed`);
      }
      return results;
    },
    onSuccess: () => {
      haptic.warning();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
      setSelectedIds(new Set());
      toast({
        title: 'Access revoked',
        description: `Revoked access from ${selectedIds.size} users`,
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setBulkActionPending(false);
    },
  });

  const grantAdminMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | null }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-role', {
        body: { userId, adminRole: role },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: role ? 'grant_admin' : 'revoke_admin',
        entity_type: 'profile',
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      setSelectedUser(null);
      toast({ title: 'Admin access updated' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const grantSubscriptionMutation = useMutation({
    mutationFn: async ({
      userId,
      tier,
      expiresAt,
    }: {
      userId: string;
      tier: string;
      expiresAt: string | null;
    }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-subscription', {
        body: {
          action: 'grant_free_access',
          target_user_id: userId,
          subscription_tier: tier,
          expires_at: expiresAt,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'grant_subscription',
        entity_type: 'profile',
        entity_id: userId,
        new_values: { tier, expires_at: expiresAt },
      });

      return data;
    },
    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: ['admin-users-enriched'] });
      const previousUsers = queryClient.getQueryData(['admin-users-enriched', baseUsers?.length ?? 0]);

      queryClient.setQueryData(
        ['admin-users-enriched', baseUsers?.length ?? 0],
        (old: UserProfile[] | undefined) =>
          old?.map((u) =>
            u.id === userId ? { ...u, subscribed: true, free_access_granted: true } : u
          )
      );

      if (selectedUser?.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, subscribed: true, free_access_granted: true } : null
        );
      }

      toast({ title: 'Granting access...', description: 'Please wait' });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          ['admin-users-enriched', baseUsers?.length ?? 0],
          context.previousUsers
        );
      }
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSuccess: () => {
      haptic.success();
      setSelectedUser(null);
      setGrantSheetUser(null);
      toast({ title: 'Subscription granted', description: 'User now has free access' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
    },
  });

  const revokeSubscriptionMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-subscription', {
        body: { action: 'revoke_free_access', target_user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'revoke_subscription',
        entity_type: 'profile',
        entity_id: userId,
      });

      return data;
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ['admin-users-enriched'] });
      const previousUsers = queryClient.getQueryData(['admin-users-enriched', baseUsers?.length ?? 0]);

      queryClient.setQueryData(
        ['admin-users-enriched', baseUsers?.length ?? 0],
        (old: UserProfile[] | undefined) =>
          old?.map((u) =>
            u.id === userId ? { ...u, subscribed: false, free_access_granted: false } : u
          )
      );

      if (selectedUser?.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, subscribed: false, free_access_granted: false } : null
        );
      }

      toast({ title: 'Revoking access...', description: 'Please wait' });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          ['admin-users-enriched', baseUsers?.length ?? 0],
          context.previousUsers
        );
      }
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSuccess: () => {
      haptic.warning();
      setSelectedUser(null);
      toast({ title: 'Access revoked', description: 'User subscription removed' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId },
      });
      if (error) {
        const errObj = error as Record<string, unknown> | undefined;
        const ctx = errObj?.context as Record<string, unknown> | undefined;
        const realMessage =
          (ctx?.error as string) || (errObj?.message as string) || 'Delete failed';
        throw new Error(realMessage);
      }
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'delete_user',
        entity_type: 'profile',
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      haptic.error();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      setSelectedUser(null);
      setDeleteDialogOpen(false);
      toast({ title: 'User deleted', description: 'The user has been permanently removed' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });


  const handleUserClick = useCallback((user: UserProfile) => {
    setSelectedUser(user);
  }, []);

  const openGrantSheet = useCallback((user: UserProfile) => {
    setGrantTier(
      user.role === 'apprentice'
        ? 'Apprentice'
        : user.role === 'employer'
          ? 'Employer'
          : 'Electrician'
    );
    setGrantDuration('7');
    setGrantSheetUser(user);
  }, []);

  const handleConfirmGrant = useCallback(() => {
    if (!grantSheetUser) return;
    const days = grantDuration === 'never' ? null : parseInt(grantDuration, 10);
    const expiresAt = days ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString() : null;
    grantSubscriptionMutation.mutate({
      userId: grantSheetUser.id,
      tier: grantTier,
      expiresAt,
    });
  }, [grantSheetUser, grantTier, grantDuration, grantSubscriptionMutation]);

  /*
    One message to many. Rows go in as a single array insert — the same
    shape the single-message sheet uses, so email delivery and in-app
    notifications behave identically — and the audit log records the batch.
  */
  const bulkMessageMutation = useMutation({
    mutationFn: async ({
      recipientIds,
      subject,
      message,
      messageType,
    }: {
      recipientIds: string[];
      subject: string;
      message: string;
      messageType: 'in_app' | 'both';
    }) => {
      if (!profile?.id) throw new Error('Not signed in');
      for (let i = 0; i < recipientIds.length; i += 100) {
        const chunk = recipientIds.slice(i, i + 100);
        const { error } = await supabase.from('admin_messages').insert(
          chunk.map((recipient_id) => ({
            sender_id: profile.id,
            recipient_id,
            subject,
            message,
            message_type: messageType,
          }))
        );
        if (error) throw error;
      }
      // admin_audit_logs has no `details` column — old_values / new_values only.
      // The generated types lag the table, hence the cast.
      await supabase.from('admin_audit_logs').insert({
        user_id: profile.id,
        action: 'bulk_message',
        entity_type: 'profile',
        entity_id: profile.id,
        new_values: { recipients: recipientIds.length, subject, message_type: messageType },
      } as never);
      return recipientIds.length;
    },
    onSuccess: (n) => {
      haptic.success();
      setBulkMessageOpen(false);
      setSelectedIds(new Set());
      toast({ title: `Sent to ${n} ${n === 1 ? 'person' : 'people'}` });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Failed to send', description: error.message, variant: 'destructive' });
    },
  });

  const exportCSV = () => {
    if (!users || users.length === 0) return;
    const headers = ['Name', 'Email', 'Role', 'Subscribed', 'Free Access', 'Created At'];
    const rows = users.map((u) => [
      u.full_name || '',
      u.email || '',
      u.role || '',
      u.subscribed ? 'Yes' : 'No',
      u.free_access_granted ? 'Yes' : 'No',
      u.created_at ? format(new Date(u.created_at), 'yyyy-MM-dd HH:mm') : '',
    ]);

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csv = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear, non-redundant status (role is already shown separately, so don't
  // repeat the tier name here). Comped takes priority over the subscribed flag.
  // A trialist carries subscribed=true in profiles; the billing rail knows better.
  const billing = (user: UserProfile): { label: string; color: string } => {
    if (user.free_access_granted) return { label: 'Comped', color: YELLOW };
    if (trialEnd(user) !== undefined) return { label: 'On trial', color: BLUE };
    const v = liveValue(user);
    if (v === undefined) return { label: user.subscribed ? 'Paying' : 'Free', color: DE_EMPHASIS };
    if (v > 0) return { label: 'Paying', color: GOOD };
    // profiles.subscribed says yes, neither rail is billing them: worth a look.
    if (user.subscribed) return { label: 'Flag, not billing', color: SERIOUS };
    return { label: 'Free', color: DE_EMPHASIS };
  };
  const setQuick = (value: string) => {
    setQuickFilter(value);
    if (value === 'all') searchParams.delete('filter');
    else searchParams.set('filter', value);
    setSearchParams(searchParams);
  };
  const total = stats.total;
  const setUpNotPaying = Math.max(0, total - (realPaying ?? 0) - stats.notOnboarded);
  const filtered = users?.length !== allUsersCount || quickFilter !== 'all' || roleFilter !== 'all' || !!search;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Users
            </h1>
            <div className="mt-0.5 text-[12px] text-white">
              {baseLoading ? 'Loading accounts…' : `${(baseUsers?.length ?? 0).toLocaleString('en-GB')} accounts · every electrician, apprentice and employer`}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <IconButton onClick={exportCSV} aria-label="Export CSV" className="h-9 w-9">
              <Download className="h-4 w-4" />
            </IconButton>
            <IconButton
              onClick={() => refetch()}
              disabled={isFetching}
              aria-label="Refresh"
              className="hidden h-9 w-9 lg:flex"
            >
              <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            </IconButton>
          </div>
        </div>

        {/* The base: how many, how they split, how fast it grows */}
        <Panel tone="accent">
          <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-10">
            <div className="flex min-w-0 flex-col gap-2 text-white">
              <div className="text-[13px] font-medium leading-4">Registered accounts</div>
              <div className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] lg:text-[56px] lg:leading-[56px]">
                {baseLoading ? <span className="opacity-40">—</span> : total.toLocaleString('en-GB')}
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
                {signupsDaily.length > 0 ? (
                  <>
                    <Delta dir="up" tone="good" size={13}>
                      {signups30} in 30 days
                    </Delta>
                    {signupsPct != null && (
                      <span>
                        {signupsPct >= 0 ? '+' : ''}
                        {signupsPct}% on the 30 before
                      </span>
                    )}
                  </>
                ) : (
                  <span>loading history</span>
                )}
              </div>

              <div className="mt-2">
                <StackBar
                  segments={[
                    { value: realPaying ?? 0, color: GOOD, label: 'Paying' },
                    { value: setUpNotPaying, color: DE_EMPHASIS, label: 'Set up, not paying' },
                    { value: stats.notOnboarded, color: SERIOUS, label: 'Never set up' },
                  ]}
                  height={8}
                />
                <Legend
                  items={[
                    { label: 'Paying', value: realPaying ?? '…', color: GOOD },
                    { label: 'Set up, not paying', value: setUpNotPaying, color: DE_EMPHASIS },
                    { label: 'Never set up', value: stats.notOnboarded, color: SERIOUS },
                  ]}
                />
              </div>

              {stats.byRole.length > 0 && (
                <div className="mt-4 border-t border-white/[0.1] pt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-[13px] font-semibold">Who they are</div>
                    <div className="text-[12px]">tap a role to filter</div>
                  </div>
                  <div className="mt-2.5">
                    <StackBar
                      segments={stats.byRole.map((r) => ({
                        value: r.count,
                        color: r.color,
                        label: `${r.label} ${r.count}`,
                      }))}
                    />
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {stats.byRole.map((r) => {
                      const on = roleFilter === r.key;
                      return (
                        <button
                          key={r.key}
                          onClick={() => setRoleFilter(on ? 'all' : r.key)}
                          className={cn(
                            'inline-flex min-h-8 touch-manipulation items-center gap-1.5 rounded-full px-2 text-[12px] text-white transition-colors -ml-2',
                            on ? 'bg-white/[0.12]' : 'hover:bg-white/[0.06] active:bg-white/[0.1]'
                          )}
                        >
                          <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: r.color }} />
                          {r.label} <b className="font-semibold tabular-nums">{r.count}</b>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 self-start [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-white/[0.08] [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.08] [&>*:nth-child(odd)]:pr-4 [&>*:nth-child(even)]:pl-4">
              <KpiTile
                label="Paying"
                value={realPaying ?? '—'}
                definition="Stripe + App Store + Play Store"
                onClick={() => setQuick('subscribed')}
              />
              <KpiTile
                label="New this week"
                value={stats.thisWeek}
                definition="joined in the last 7 days"
                viz={<Sparkline series={signupsDaily.slice(-30).map((d) => d.n)} accent={BLUE} />}
                onClick={() => {
                  setSortBy('joined');
                  setQuick('all');
                }}
              />
              <KpiTile
                label="Online now"
                value={stats.online}
                definition="seen in the last 5 minutes"
                delta={
                  stats.online > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: GOOD }} />
                      live
                    </span>
                  ) : undefined
                }
                onClick={() => setQuick('active_today')}
              />
              <KpiTile
                label="Never set up"
                value={stats.notOnboarded}
                definition={`${Math.round((stats.notOnboarded / Math.max(1, total)) * 100)}% of all accounts`}
                onClick={() => setQuick('not_onboarded')}
              />
            </div>
          </div>
        </Panel>

        {/* Find people */}
        <Panel padded={false} className="px-4 py-3 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 lg:w-72">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email or username"
                aria-label="Search users"
                className="input-underline h-11 w-full touch-manipulation rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow placeholder:text-white/25 transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 [color-scheme:dark]"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:-mx-5 sm:px-5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                {statusFilters.map((f) => {
                  const on = quickFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setQuick(f.value)}
                      className={cn(
                        'h-11 shrink-0 touch-manipulation whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium transition-colors lg:h-9 lg:px-3 lg:text-[12px]',
                        on
                          ? 'bg-elec-yellow font-semibold text-black'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.1] active:bg-white/[0.14]'
                      )}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <div className="-mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:-mx-5 sm:px-5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                <span className="shrink-0 pr-1 text-[12px] font-semibold text-white">Needs you</span>
                {attentionViews.map((f) => {
                  const on = quickFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setQuick(on ? 'all' : f.value)}
                      className={cn(
                        'inline-flex h-11 shrink-0 touch-manipulation items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium transition-colors lg:h-9 lg:px-3 lg:text-[12px]',
                        on
                          ? 'bg-elec-yellow font-semibold text-black'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.1] active:bg-white/[0.14]'
                      )}
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: on ? '#000' : SERIOUS }}
                      />
                      {f.label}
                    </button>
                  );
                })}
                <span className="shrink-0 pl-2 pr-1 text-[12px] font-semibold text-white">Joined</span>
                {joinedWindows.map((w) => {
                  const on = joinedWindow === w.value;
                  return (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => setJoinedWindow(w.value)}
                      className={cn(
                        'h-11 shrink-0 touch-manipulation whitespace-nowrap rounded-full px-3 text-[13px] font-medium transition-colors lg:h-9 lg:px-2.5 lg:text-[12px]',
                        on
                          ? 'bg-white/[0.16] font-semibold text-white'
                          : 'text-white hover:bg-white/[0.08] active:bg-white/[0.12]'
                      )}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                aria-label="Filter by role"
                className="h-11 flex-1 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none lg:h-9 lg:flex-none lg:text-[12px]"
              >
                {roleFilters.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort by"
                className="h-11 flex-1 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none lg:h-9 lg:flex-none lg:text-[12px]"
              >
                {SORTS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Panel>

        {selectedIds.size > 0 && (
          <div className="sticky top-2 z-10">
            <Panel padded={false} className="px-4 py-2.5 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="border-white/30 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-[13px] font-semibold tabular-nums text-white">
                    {selectedIds.size} selected
                  </span>
                  {sortedUsers.length > selectedIds.size && (
                    <button
                      onClick={() => setSelectedIds(new Set(sortedUsers.map((u) => u.id)))}
                      className="hidden h-9 touch-manipulation text-[12px] font-semibold text-elec-yellow sm:inline"
                    >
                      Select all {sortedUsers.length.toLocaleString('en-GB')} matching
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-10 touch-manipulation rounded-full bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90"
                    onClick={() => setBulkMessageOpen(true)}
                  >
                    <Send className="mr-1.5 h-4 w-4" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 touch-manipulation rounded-full text-white hover:bg-white/[0.06] hover:text-white"
                    onClick={() => bulkGrantMutation.mutate([...selectedIds])}
                    disabled={bulkActionPending}
                  >
                    {bulkActionPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Gift className="mr-1.5 h-4 w-4" />
                    )}
                    Grant
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 touch-manipulation rounded-full text-white hover:bg-white/[0.06] hover:text-white"
                    onClick={() => bulkRevokeMutation.mutate([...selectedIds])}
                    disabled={bulkActionPending}
                  >
                    <XCircle className="mr-1.5 h-4 w-4" />
                    Revoke
                  </Button>
                  <IconButton onClick={() => setSelectedIds(new Set())} aria-label="Clear selection" className="h-9 w-9">
                    <X className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {/* The people */}
        <Panel padded={false} className="px-4 pb-2 pt-2 sm:px-5 lg:px-6">
          <SectionHead
            title={filtered ? 'Matching people' : 'Everyone'}
            meta={
              isLoading
                ? 'loading'
                : `${
                    filtered
                      ? `${(users?.length ?? 0).toLocaleString('en-GB')} of ${(baseUsers?.length ?? 0).toLocaleString('en-GB')}`
                      : (users?.length ?? 0).toLocaleString('en-GB')
                  }${filteredValue > 0 ? ` · ${gbp(filteredValue)} a month` : ''}${
                    filteredTrials.count > 0
                      ? ` · ${filteredTrials.count} on trial, ${gbp(filteredTrials.value)} if they convert`
                      : ''
                  }`
            }
            action={paginatedUsers.length > 0 ? (isAllSelected ? 'Deselect page' : 'Select page') : undefined}
            onAction={toggleSelectAll}
          />
          {/* Column heads — desktop only; the phone card carries its own labels */}
          {paginatedUsers.length > 0 && (
            <div className="hidden items-center gap-3 border-b border-white/[0.08] pb-2 pl-[38px] text-[11px] font-medium text-white lg:flex">
              <span className="min-w-0 flex-1">Name</span>
              <span className="w-24 shrink-0">Role</span>
              <span className="w-20 shrink-0">Joined</span>
              <span className="w-[5.5rem] shrink-0">Last active</span>
              <span className="w-[4.5rem] shrink-0">Engagement</span>
              <span className="w-[8.5rem] shrink-0">Billing</span>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-px py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-lg bg-white/[0.04]" />
              ))}
            </div>
          ) : users?.length === 0 ? (
            <EmptyState title="No one matches" description="Try a different filter or search." />
          ) : (
            <div>
              {paginatedUsers.map((user) => {
                const joinedDays = user.created_at
                  ? differenceInDays(new Date(), new Date(user.created_at))
                  : null;
                const state = billing(user);
                const endsAt = trialEnd(user);
                const value =
                  endsAt !== undefined
                    ? (TIER_MRR[(user.subscription_tier ?? '').toLowerCase()] ?? 0)
                    : (liveValue(user) ?? 0);
                const engagementScore = effectiveEngagementMap?.get(user.id);
                const isSelected = selectedIds.has(user.id);
                const rc = roleColor(user.role);
                return (
                  <SwipeableAdminRow
                    key={user.id}
                    actions={[
                      {
                        icon: <MessageSquare className="h-4 w-4" />,
                        label: 'Message',
                        colour: 'bg-blue-500',
                        onClick: () => {
                          setMessageUser({
                            id: user.id,
                            full_name: user.full_name || undefined,
                            email: user.email || undefined,
                            role: user.role || undefined,
                          });
                        },
                      },
                      {
                        icon: <Gift className="h-4 w-4" />,
                        label: 'Grant',
                        colour: 'bg-emerald-500',
                        onClick: () => {
                          openGrantSheet(user);
                        },
                      },
                    ]}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleUserClick(user)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleUserClick(user);
                        }
                      }}
                      className={cn(
                        'group flex min-h-[60px] w-full cursor-pointer touch-manipulation items-center gap-2.5 border-t border-white/[0.08] py-2 text-left text-white transition-colors hover:bg-white/[0.03] active:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60 lg:min-h-14',
                        isSelected && 'bg-white/[0.04]'
                      )}
                    >
                      <span
                        role="button"
                        tabIndex={0}
                        className="-my-2 flex min-h-11 min-w-[28px] shrink-0 cursor-pointer touch-manipulation items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelection(user.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSelection(user.id);
                          }
                        }}
                        aria-label={isSelected ? 'Deselect' : 'Select'}
                      >
                        <Checkbox
                          checked={isSelected}
                          className="pointer-events-none h-4 w-4 border-white/30 data-[state=checked]:border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                        />
                      </span>

                      <div className="flex min-w-0 flex-1 items-center gap-x-3">
                        <div className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-[14px] font-medium leading-[18px]">
                              {user.full_name || 'No name'}
                            </span>
                            {user.admin_role && (
                              <Shield className="h-3 w-3 shrink-0 text-elec-yellow" />
                            )}
                            {user.isOnline && (
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ background: GOOD }}
                                title="Online now"
                              />
                            )}
                          </span>
                          <p className="truncate text-[12px] leading-4">
                            {user.email || (user.username ? `@${user.username}` : '—')}
                          </p>
                          {/* Phone: the columns below fold into one line here */}
                          <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-1.5 text-[11.5px] leading-4 lg:hidden">
                            <span className="inline-flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-[2px]" style={{ background: rc }} />
                              {roleLabel(user.role)}
                            </span>
                            <span aria-hidden>·</span>
                            <span>
                              {joinedDays === 0
                                ? 'joined today'
                                : joinedDays != null
                                  ? `joined ${joinedDays}d ago`
                                  : '—'}
                            </span>
                            {enrichmentPending ? null : user.isOnline ? (
                              <>
                                <span aria-hidden>·</span>
                                <span>online</span>
                              </>
                            ) : user.last_seen ? (
                              <>
                                <span aria-hidden>·</span>
                                <span>{relativeTime(user.last_seen)}</span>
                              </>
                            ) : (
                              <>
                                <span aria-hidden>·</span>
                                <span>never opened</span>
                              </>
                            )}
                            {endsAt && (
                              <>
                                <span aria-hidden>·</span>
                                <span>trial ends {untilTime(endsAt)}</span>
                              </>
                            )}
                            {!user.onboarding_completed && (
                              <>
                                <span aria-hidden>·</span>
                                <span style={{ color: SERIOUS }}>never set up</span>
                              </>
                            )}
                          </div>
                        </div>

                        <span className="hidden w-24 shrink-0 items-center gap-1.5 text-[12px] lg:inline-flex">
                          <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: rc }} />
                          <span className="truncate">{roleLabel(user.role)}</span>
                        </span>
                        <span className="hidden w-20 shrink-0 text-[12px] tabular-nums lg:block">
                          {joinedDays !== null ? (joinedDays === 0 ? 'Today' : `${joinedDays}d ago`) : '—'}
                        </span>
                        <span className="hidden w-[5.5rem] shrink-0 text-[12px] tabular-nums lg:block">
                          {enrichmentPending ? (
                            <span className="opacity-40">…</span>
                          ) : user.isOnline ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOOD }} />
                              Online
                            </span>
                          ) : user.last_seen ? (
                            relativeTime(user.last_seen)
                          ) : (
                            'Never'
                          )}
                        </span>
                        <span className="hidden w-[4.5rem] shrink-0 items-center gap-2 lg:flex">
                          {engagementScore !== undefined ? (
                            <>
                              <span
                                className="h-1 w-10 overflow-hidden rounded-full bg-white/[0.1]"
                                title={`Engagement ${engagementScore} of 100`}
                              >
                                <span
                                  className="block h-full rounded-full"
                                  style={{
                                    width: `${Math.max(4, Math.min(100, engagementScore))}%`,
                                    background: BLUE,
                                  }}
                                />
                              </span>
                              <span className="text-[12px] font-semibold tabular-nums">{engagementScore}</span>
                            </>
                          ) : (
                            <span className="text-[12px]">—</span>
                          )}
                        </span>
                        <span className="flex shrink-0 items-center justify-between gap-1.5 lg:w-[8.5rem]">
                          <span className="hidden items-center gap-2 lg:inline-flex">
                            <StateDot label={state.label} color={state.color} />
                            {value > 0 && (
                              <span className="text-[12px] tabular-nums text-white">
                                {gbp(value, 2)}
                              </span>
                            )}
                          </span>
                          <span className="inline-flex flex-col items-end gap-0.5 lg:hidden">
                            <StateDot label={state.label} color={state.color} />
                            {value > 0 && (
                              <span className="text-[11px] tabular-nums text-white">
                                {gbp(value, 2)}
                              </span>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openGrantSheet(user);
                            }}
                            className="-mr-1 hidden h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.08] active:bg-white/[0.12] touch-manipulation lg:flex"
                            aria-label={`Grant free access to ${user.full_name || 'user'}`}
                            title="Grant free access"
                          >
                            <Gift className="h-4 w-4" />
                          </button>
                          {/* Swipe is invisible; a phone gets a button. */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRowActionsUser(user);
                            }}
                            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white active:bg-white/[0.12] touch-manipulation lg:hidden"
                            aria-label={`Actions for ${user.full_name || 'user'}`}
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </SwipeableAdminRow>
                );
              })}
            </div>
          )}
        </Panel>

        {totalPages > 1 && !isLoading && users && users.length > 0 && (
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={users?.length || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        )}
        <UserManagementSheet
          user={
            selectedUser
              ? {
                  id: selectedUser.id,
                  full_name: selectedUser.full_name,
                  email: selectedUser.email || undefined,
                  role: selectedUser.role || undefined,
                  subscribed: selectedUser.subscribed,
                  subscription_tier: selectedUser.subscription_tier || undefined,
                  subscription_end: (selectedUser as Record<string, unknown>).subscription_end as
                    string | undefined,
                  stripe_customer_id: selectedUser.stripe_customer_id || undefined,
                  free_access_granted: selectedUser.free_access_granted,
                  free_access_expires_at: (selectedUser as Record<string, unknown>)
                    .free_access_expires_at as string | undefined,
                  free_access_reason: (selectedUser as Record<string, unknown>)
                    .free_access_reason as string | undefined,
                  created_at: selectedUser.created_at,
                  last_sign_in: selectedUser.last_sign_in || undefined,
                }
              : null
          }
          open={!!selectedUser}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedUser(null);
              setRevokeArmed(false);
            }
          }}
          extraActions={
            isSuperAdmin && selectedUser?.admin_role !== 'super_admin' ? (
              <div className="space-y-2">
                {selectedUser?.free_access_granted &&
                  (revokeArmed ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 h-11 touch-manipulation rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        onClick={() => setRevokeArmed(false)}
                        disabled={revokeSubscriptionMutation.isPending}
                      >
                        Keep access
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-11 touch-manipulation rounded-full bg-red-500/15 border-red-500/30 text-red-300 hover:bg-red-500/25"
                        onClick={() => {
                          if (selectedUser) revokeSubscriptionMutation.mutate(selectedUser.id);
                          setRevokeArmed(false);
                        }}
                        disabled={revokeSubscriptionMutation.isPending}
                      >
                        {revokeSubscriptionMutation.isPending ? 'Revoking…' : 'Confirm revoke'}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full h-11 touch-manipulation rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-white/[0.06]"
                      onClick={() => setRevokeArmed(true)}
                      disabled={revokeSubscriptionMutation.isPending}
                    >
                      <Gift className="h-4 w-4 mr-2 text-red-400" />
                      Revoke free access
                    </Button>
                  ))}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-11 touch-manipulation rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-white/[0.06]"
                    onClick={() =>
                      selectedUser &&
                      grantAdminMutation.mutate({
                        userId: selectedUser.id,
                        role: selectedUser.admin_role ? null : 'admin',
                      })
                    }
                    disabled={grantAdminMutation.isPending}
                  >
                    {selectedUser?.admin_role ? (
                      <>
                        <ShieldOff className="h-4 w-4 mr-2" />
                        Remove admin
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Make admin
                      </>
                    )}
                  </Button>
                  <IconButton onClick={() => setDeleteDialogOpen(true)} aria-label="Delete user">
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            ) : undefined
          }
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="rounded-2xl bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Delete user permanently?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will permanently delete{' '}
                <strong className="text-white">
                  {selectedUser?.full_name || selectedUser?.email}
                </strong>{' '}
                and all their data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() => selectedUser && deleteUserMutation.mutate(selectedUser.id)}
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? 'Deleting…' : 'Delete user'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <MessageUserSheet
          open={!!messageUser}
          onOpenChange={(open) => {
            if (!open) setMessageUser(null);
          }}
          user={messageUser}
        />

        {/* Phone row actions */}
        <Sheet open={!!rowActionsUser} onOpenChange={(o) => !o && setRowActionsUser(null)}>
          <SheetContent side="bottom" className="h-auto rounded-t-2xl border-t border-white/[0.06] bg-[hsl(0_0%_10%)] p-0">
            <div className="px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/15" />
              <div className="text-[15px] font-semibold text-white">{rowActionsUser?.full_name || 'No name'}</div>
              <div className="text-[12px] text-white">{rowActionsUser?.email || ''}</div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-semibold text-black active:opacity-80"
                  onClick={() => {
                    const u = rowActionsUser;
                    setRowActionsUser(null);
                    if (u) handleUserClick(u);
                  }}
                >
                  Open profile
                </button>
                <button
                  className="h-12 w-full touch-manipulation rounded-xl bg-white/[0.08] text-[15px] font-semibold text-white active:bg-white/[0.14]"
                  onClick={() => {
                    const u = rowActionsUser;
                    setRowActionsUser(null);
                    if (u)
                      setMessageUser({
                        id: u.id,
                        full_name: u.full_name || undefined,
                        email: u.email || undefined,
                        role: u.role || undefined,
                      });
                  }}
                >
                  Message
                </button>
                <button
                  className="h-12 w-full touch-manipulation rounded-xl bg-white/[0.08] text-[15px] font-semibold text-white active:bg-white/[0.14]"
                  onClick={() => {
                    const u = rowActionsUser;
                    setRowActionsUser(null);
                    if (u) openGrantSheet(u);
                  }}
                >
                  Grant free access
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Message the selection */}
        <BulkMessageSheet
          open={bulkMessageOpen}
          onOpenChange={setBulkMessageOpen}
          count={selectedIds.size}
          sending={bulkMessageMutation.isPending}
          onSend={(subject, message, messageType) =>
            bulkMessageMutation.mutate({
              recipientIds: [...selectedIds],
              subject,
              message,
              messageType,
            })
          }
        />

        <Sheet
          open={!!grantSheetUser}
          onOpenChange={(open) => {
            if (!open) setGrantSheetUser(null);
          }}
        >
          <SheetContent
            side="bottom"
            className="h-auto max-h-[60vh] rounded-t-3xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_10%)]"
          >
            <div className="flex flex-col">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/15" />
              </div>

              <div className="px-6 pb-6 pt-2 space-y-5">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    Grant
                  </div>
                  <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Free access
                  </h3>
                  <p className="mt-1 text-[13px] text-white">
                    {grantSheetUser?.full_name || 'User'} · {grantSheetUser?.role || 'visitor'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                    Tier
                  </label>
                  <Select value={grantTier} onValueChange={setGrantTier}>
                    <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_14%)] border-white/[0.08] focus:border-elec-yellow/60 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] text-white">
                      <SelectItem value="Apprentice">Apprentice</SelectItem>
                      <SelectItem value="Electrician">Electrician</SelectItem>
                      <SelectItem value="Employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                    Duration
                  </label>
                  <Select value={grantDuration} onValueChange={setGrantDuration}>
                    <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_14%)] border-white/[0.08] focus:border-elec-yellow/60 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] text-white">
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="never">Never expires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full h-12 touch-manipulation rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-base"
                  onClick={handleConfirmGrant}
                  disabled={grantSubscriptionMutation.isPending}
                >
                  {grantSubscriptionMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Gift className="h-5 w-5 mr-2" />
                  )}
                  Grant access
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
