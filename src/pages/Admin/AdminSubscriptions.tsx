/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RefreshCw, Download } from 'lucide-react';
import { format, formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Divider,
  type Tone,
} from '@/components/admin/editorial';

interface SubscribedUser {
  id: string;
  full_name: string;
  username: string;
  role: string;
  subscribed: boolean;
  created_at: string;
  subscription_source?: string | null;
  offer_code?: string;
  offer_price?: number;
}

interface PromoOffer {
  id: string;
  name: string;
  code: string;
  price: number;
  plan_id: string;
  redemptions: number;
  max_redemptions: number | null;
  is_active: boolean;
}

interface RCTrialUser {
  id: string;
  full_name: string;
  username: string;
  role: string;
  subscription_tier: string;
  subscription_source: string;
  trial_end: string | null;
  is_cancelled: boolean;
  created_at: string;
}

interface RCPaidUser {
  id: string;
  full_name: string;
  username: string;
  role: string;
  subscription_tier: string;
  subscription_source: string;
  subscription_end: string | null;
  created_at: string;
}

interface RCStats {
  subscribersBySource: Record<string, number>;
  tiersBySource: Record<string, Record<string, number>>;
  totalSubscribers: number;
  revenuecat: {
    mrr: number;
    revenue: number;
    activeSubscriptions: number;
    activeTrials: number;
  };
  trialUsers: RCTrialUser[];
  paidUsers: RCPaidUser[];
  generatedAt: string;
}

const getInitials = (name?: string | null) => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const sourceLabel = (s?: string | null) => {
  if (s === 'stripe') return 'Stripe';
  if (s === 'app_store') return 'App Store';
  if (s === 'play_store') return 'Play Store';
  return 'Stripe';
};

const sourceTone = (s?: string | null): Tone => {
  if (s === 'app_store') return 'blue';
  if (s === 'play_store') return 'green';
  return 'purple';
};

const tierTone = (role?: string | null): Tone => {
  if (role === 'employer') return 'blue';
  if (role === 'electrician') return 'yellow';
  if (role === 'apprentice') return 'amber';
  return 'yellow';
};

export default function AdminSubscriptions() {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('active');
  const [selectedUser, setSelectedUser] = useState<SubscribedUser | null>(null);

  const { data: stripeStats } = useQuery<{
    stripe: {
      activeSubscriptions: number;
      trialingSubscriptions: number;
      mrr: number;
      projectedMrr: number;
      tierCounts: Record<string, number>;
      subscriptionsByPrice?: Record<string, number>;
    };
    supabase: { subscribedUsers: number };
    generatedAt: string;
  }>({
    queryKey: ['admin-stripe-live-stats'],
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 30000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-stripe-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      return data;
    },
  });

  const { data: rcStats } = useQuery<RCStats>({
    queryKey: ['admin-revenuecat-stats'],
    refetchInterval: 60000,
    staleTime: 30000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-revenuecat-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      return data;
    },
  });

  const { data: totalUserCount } = useQuery({
    queryKey: ['admin-total-users-count'],
    queryFn: async () => {
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      return count || 0;
    },
    staleTime: 2 * 60 * 1000,
  });

  const stripeMrr = stripeStats?.stripe.mrr || 0;
  const rcMrr = rcStats?.revenuecat?.mrr || 0;
  const combinedMrr = stripeMrr + rcMrr;
  const stripeActive = stripeStats?.stripe.activeSubscriptions || 0;
  const appStoreActive = rcStats?.subscribersBySource?.app_store || 0;
  const playStoreActive = rcStats?.subscribersBySource?.play_store || 0;
  const rcActiveTrials = (rcStats?.trialUsers || []).filter((t) => !t.is_cancelled).length;
  const rcCancelledTrials = (rcStats?.trialUsers || []).filter((t) => t.is_cancelled).length;
  const stripeTrials = stripeStats?.stripe.trialingSubscriptions || 0;
  const totalTrials = rcActiveTrials + stripeTrials;
  const totalActive = stripeActive + appStoreActive + playStoreActive;
  const arr = combinedMrr * 12;

  const rcTiers = rcStats?.tiersBySource || {};
  const appStoreTiers = rcTiers.app_store || {};
  const playStoreTiers = rcTiers.play_store || {};

  const stats = {
    mrr: combinedMrr,
    stripeMrr,
    rcMrr,
    subscribed: totalActive,
    stripeActive,
    appStoreActive,
    playStoreActive,
    total: totalUserCount || 0,
    apprentice:
      (stripeStats?.stripe.tierCounts?.apprentice || 0) +
      (appStoreTiers.apprentice || 0) +
      (playStoreTiers.apprentice || 0),
    electrician:
      (stripeStats?.stripe.tierCounts?.electrician || 0) +
      (appStoreTiers.electrician || 0) +
      (playStoreTiers.electrician || 0),
    employer:
      (stripeStats?.stripe.tierCounts?.employer || 0) +
      (appStoreTiers.employer || 0) +
      (playStoreTiers.employer || 0),
    conversionRate: totalUserCount ? ((totalActive / totalUserCount) * 100).toFixed(1) : '0',
  };

  const {
    data: users,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-subscribed-users', search, sourceFilter],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('id, full_name, username, role, subscribed, created_at, subscription_source')
        .eq('subscribed', true)
        .order('created_at', { ascending: false });
      if (sourceFilter !== 'all') query = query.eq('subscription_source', sourceFilter);
      const { data, error } = await query;
      if (error) throw error;
      let filtered = data as SubscribedUser[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (u) => u.full_name?.toLowerCase().includes(s) || u.username?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
    staleTime: 2 * 60 * 1000,
  });

  const { data: offers } = useQuery({
    queryKey: ['admin-promo-offers-summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promo_offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as PromoOffer[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const exportCSV = () => {
    if (!users || users.length === 0) return;
    const headers = ['Name', 'Username', 'Role', 'Source', 'Subscribed', 'Created At'];
    const rows = users.map((u) => [
      u.full_name || '',
      u.username || '',
      u.role || '',
      u.subscription_source || 'stripe',
      u.subscribed ? 'Yes' : 'No',
      u.created_at ? format(new Date(u.created_at), 'yyyy-MM-dd HH:mm') : '',
    ]);
    const escapeCsv = (val: string) =>
      val.includes(',') || val.includes('"') || val.includes('\n')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
    const csv = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-revenue-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fmtGBP = (v: number) =>
    `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const activeTrialList = useMemo(
    () => (rcStats?.trialUsers || []).filter((t) => !t.is_cancelled),
    [rcStats]
  );
  const cancelledTrialList = useMemo(
    () => (rcStats?.trialUsers || []).filter((t) => t.is_cancelled),
    [rcStats]
  );

  const visibleUsers = useMemo(() => {
    if (!users) return [];
    if (statusFilter === 'active') return users;
    if (statusFilter === 'trialing') return [];
    if (statusFilter === 'cancelled') return [];
    return users;
  }, [users, statusFilter]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Billing"
          title="Subscriptions"
          description="All active subscriptions across Stripe, App Store and Play Store."
          tone="emerald"
          actions={
            <>
              <IconButton onClick={exportCSV} aria-label="Export CSV">
                <Download className="h-4 w-4" />
              </IconButton>
              <IconButton
                onClick={() => refetch()}
                disabled={isFetching}
                aria-label="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active', value: stats.subscribed, tone: 'emerald', sub: fmtGBP(stats.mrr) + ' MRR' },
            { label: 'Trialing', value: totalTrials, tone: 'blue', sub: `${rcActiveTrials} mobile · ${stripeTrials} web` },
            { label: 'Past Due', value: rcCancelledTrials, tone: 'orange', sub: 'Cancelled trials' },
            { label: 'Cancelled', value: 0, tone: 'red', sub: `${stats.conversionRate}% conversion` },
          ]}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Combined MRR', value: fmtGBP(stats.mrr), accent: true, sub: `ARR ${fmtGBP(arr)}` },
            { label: 'Stripe', value: fmtGBP(stats.stripeMrr), tone: 'purple', sub: `${stats.stripeActive} active` },
            { label: 'App Store', value: fmtGBP(stats.rcMrr), tone: 'blue', sub: `${stats.appStoreActive} active` },
            { label: 'Play Store', value: fmtGBP(0), tone: 'green', sub: `${stats.playStoreActive} active` },
          ]}
        />

        <StatStrip
          columns={3}
          stats={[
            { label: 'Apprentices', value: stats.apprentice, tone: 'amber' },
            { label: 'Electricians', value: stats.electrician, tone: 'yellow' },
            { label: 'Employers', value: stats.employer, tone: 'blue' },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All sources' },
            { value: 'stripe', label: 'Stripe' },
            { value: 'app_store', label: 'App Store' },
            { value: 'play_store', label: 'Play Store' },
          ]}
          activeTab={sourceFilter}
          onTabChange={setSourceFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search subscribers…"
        />

        <FilterBar
          tabs={[
            { value: 'active', label: 'Active', count: stats.subscribed },
            { value: 'trialing', label: 'Trialing', count: totalTrials },
            { value: 'cancelled', label: 'Cancelled', count: rcCancelledTrials },
          ]}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
        />

        {stripeStats?.stripe?.subscriptionsByPrice &&
          Object.keys(stripeStats.stripe.subscriptionsByPrice).length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="purple"
                title="Active prices"
                meta={
                  <Pill tone="purple">
                    {Object.values(stripeStats.stripe.subscriptionsByPrice).reduce(
                      (a, b) => a + (b as number),
                      0
                    )}
                  </Pill>
                }
              />
              <ListBody>
                {Object.entries(stripeStats.stripe.subscriptionsByPrice)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([price, count]) => (
                    <ListRow
                      key={`stripe-${price}`}
                      accent="purple"
                      title={price}
                      subtitle="Stripe"
                      trailing={
                        <>
                          <Pill tone="purple">Stripe</Pill>
                          <span className="text-[13px] font-semibold text-white tabular-nums w-8 text-right">
                            {count as number}
                          </span>
                        </>
                      }
                    />
                  ))}
                {Object.entries(appStoreTiers).length > 0 ? (
                  Object.entries(appStoreTiers)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([tier, count]) => (
                      <ListRow
                        key={`ios-${tier}`}
                        accent="blue"
                        title={<span className="capitalize">{tier.replace('_', ' ')}</span>}
                        subtitle="App Store"
                        trailing={
                          <>
                            <Pill tone="blue">iOS</Pill>
                            <span className="text-[13px] font-semibold text-white tabular-nums w-8 text-right">
                              {count as number}
                            </span>
                          </>
                        }
                      />
                    ))
                ) : (
                  <ListRow
                    accent="blue"
                    title="App Store"
                    subtitle="iOS"
                    trailing={
                      <>
                        <Pill tone="blue">iOS</Pill>
                        <span className="text-[13px] font-semibold text-white tabular-nums w-8 text-right">
                          {stats.appStoreActive}
                        </span>
                      </>
                    }
                  />
                )}
              </ListBody>
            </ListCard>
          )}

        {offers && offers.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Active promos"
              meta={<Pill tone="yellow">{offers.length}</Pill>}
            />
            <ListBody>
              {offers.map((offer) => (
                <ListRow
                  key={offer.id}
                  title={offer.name}
                  subtitle={<span className="font-mono">{offer.code}</span>}
                  trailing={
                    <>
                      <span className="text-[13px] font-semibold text-white tabular-nums">
                        £{offer.price}/mo
                      </span>
                      <Pill tone="yellow">
                        {offer.redemptions}
                        {offer.max_redemptions ? `/${offer.max_redemptions}` : ''}
                      </Pill>
                    </>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        {totalTrials > 0 && (
          <ListCard>
            <ListCardHeader
              tone="orange"
              title="Trials"
              meta={
                <>
                  <Pill tone="green">{rcActiveTrials + stripeTrials} active</Pill>
                  {rcCancelledTrials > 0 && (
                    <Pill tone="red">{rcCancelledTrials} cancelled</Pill>
                  )}
                </>
              }
            />
            <ListBody>
              {stripeTrials > 0 && (
                <ListRow
                  accent="purple"
                  title="Stripe trials"
                  subtitle="Web"
                  trailing={
                    <span className="text-[13px] font-semibold text-white tabular-nums">
                      {stripeTrials}
                    </span>
                  }
                />
              )}
              {activeTrialList.map((t) => {
                const daysLeft = t.trial_end
                  ? differenceInDays(parseISO(t.trial_end), new Date())
                  : null;
                const trialTone: Tone =
                  daysLeft !== null && daysLeft <= 1
                    ? 'orange'
                    : daysLeft !== null && daysLeft <= 3
                      ? 'amber'
                      : 'green';
                return (
                  <ListRow
                    key={t.id}
                    accent="orange"
                    lead={<Avatar initials={getInitials(t.full_name)} />}
                    title={t.full_name || t.username}
                    subtitle={`${(t.subscription_tier || '').replace('_', ' ')} · ${
                      t.subscription_source === 'app_store' ? 'iOS' : 'Android'
                    }`}
                    trailing={
                      daysLeft !== null ? (
                        <Pill tone={trialTone}>
                          {daysLeft <= 0 ? 'Expires today' : `${daysLeft}d left`}
                        </Pill>
                      ) : (
                        <Pill tone="green">Trial</Pill>
                      )
                    }
                  />
                );
              })}
              {cancelledTrialList.map((t) => (
                <ListRow
                  key={t.id}
                  accent="red"
                  lead={<Avatar initials={getInitials(t.full_name)} />}
                  title={t.full_name || t.username}
                  subtitle={`${(t.subscription_tier || '').replace('_', ' ')} · ${
                    t.subscription_source === 'app_store' ? 'iOS' : 'Android'
                  }`}
                  trailing={<Pill tone="red">Cancelled</Pill>}
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        {(rcStats?.paidUsers || []).length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Mobile paid subscribers"
              meta={<Pill tone="blue">{rcStats?.paidUsers?.length || 0}</Pill>}
            />
            <ListBody>
              {(rcStats?.paidUsers || []).map((u) => (
                <ListRow
                  key={u.id}
                  accent="emerald"
                  lead={<Avatar initials={getInitials(u.full_name)} />}
                  title={u.full_name || u.username}
                  subtitle={`${(u.subscription_tier || '').replace('_', ' ')} · ${
                    u.subscription_source === 'app_store' ? 'iOS' : 'Android'
                  }`}
                  trailing={<Pill tone="emerald">Paid</Pill>}
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        <Divider label="Subscribers" />

        {isLoading ? (
          <LoadingBlocks />
        ) : !visibleUsers || visibleUsers.length === 0 ? (
          <EmptyState
            title={
              statusFilter === 'trialing'
                ? 'No trialing subscribers in list'
                : statusFilter === 'cancelled'
                  ? 'No cancelled subscribers'
                  : 'No subscribers yet'
            }
            description={
              statusFilter === 'trialing'
                ? 'Trialing users appear in the Trials card above.'
                : 'Subscribed users will appear here once they sign up.'
            }
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="Subscriptions"
              meta={<Pill tone="emerald">{visibleUsers.length}</Pill>}
            />
            <ListBody>
              {visibleUsers.map((user) => (
                <ListRow
                  key={user.id}
                  lead={<Avatar initials={getInitials(user.full_name)} />}
                  title={user.full_name || 'Unknown'}
                  subtitle={`@${user.username}`}
                  trailing={
                    <>
                      <Pill tone={tierTone(user.role)}>
                        <span className="capitalize">{user.role || 'visitor'}</span>
                      </Pill>
                      <Pill tone={sourceTone(user.subscription_source)}>
                        {sourceLabel(user.subscription_source)}
                      </Pill>
                    </>
                  }
                  onClick={() => setSelectedUser(user)}
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3 text-white text-left">
                  <Avatar initials={getInitials(selectedUser?.full_name)} size="md" />
                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold text-white truncate">
                      {selectedUser?.full_name || 'Unknown'}
                    </p>
                    <p className="text-[12px] text-white truncate">@{selectedUser?.username}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-auto p-5 space-y-4">
                <StatStrip
                  columns={2}
                  stats={[
                    { label: 'Status', value: <span className="text-[20px]">Active</span>, tone: 'emerald' },
                    {
                      label: 'Plan',
                      value: (
                        <span className="text-[20px] capitalize">
                          {selectedUser?.role || 'Standard'}
                        </span>
                      ),
                    },
                    {
                      label: 'Source',
                      value: (
                        <span className="text-[20px]">
                          {sourceLabel(selectedUser?.subscription_source)}
                        </span>
                      ),
                      tone: sourceTone(selectedUser?.subscription_source),
                    },
                    {
                      label: 'Member since',
                      value: (
                        <span className="text-[15px]">
                          {selectedUser?.created_at
                            ? formatDistanceToNow(new Date(selectedUser.created_at), {
                                addSuffix: true,
                              })
                            : 'Unknown'}
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
