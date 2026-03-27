/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CreditCard,
  TrendingUp,
  Users,
  Crown,
  Zap,
  Briefcase,
  GraduationCap,
  ChevronRight,
  PoundSterling,
  Target,
  Gift,
  RefreshCw,
  Download,
  Smartphone,
  Globe,
  ShoppingBag,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { cn } from '@/lib/utils';

const ROLE_BADGE_COLORS: Record<string, string> = {
  apprentice: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  electrician: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  employer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  default: 'bg-white/10 text-white',
};

const getRoleBadgeColor = (role: string): string =>
  ROLE_BADGE_COLORS[role] || ROLE_BADGE_COLORS.default;

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

const SOURCE_BADGES: Record<string, { label: string; color: string }> = {
  stripe: { label: 'Stripe', color: 'bg-purple-500/20 text-purple-400' },
  app_store: { label: 'App Store', color: 'bg-blue-500/20 text-blue-400' },
  play_store: { label: 'Play Store', color: 'bg-green-500/20 text-green-400' },
};

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

// App Store IAP prices
const APP_STORE_PRICES = [
  { name: '£4.99/month', label: 'Apprentice Monthly' },
  { name: '£9.99/month', label: 'Electrician Monthly' },
  { name: '£7.99/month', label: 'Mate Monthly' },
  { name: '£49.99/year', label: 'Apprentice Yearly' },
  { name: '£99.99/year', label: 'Electrician Yearly' },
];

export default function AdminSubscriptions() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
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

  const { data: totalUserCount } = useQuery({
    queryKey: ['admin-total-users-count'],
    queryFn: async () => {
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      return count || 0;
    },
    staleTime: 2 * 60 * 1000,
  });

  // Source breakdown now comes from admin-stripe-stats (merged)
  const subscribersBySource = (stripeStats as any)?.subscribersBySource as
    | Record<string, number>
    | undefined;

  const stripeMrr = stripeStats?.stripe.mrr || 0;
  const rcMrr = 0; // Will populate when RevenueCat API key is set
  const combinedMrr = stripeMrr + rcMrr;
  const stripeActive = stripeStats?.stripe.activeSubscriptions || 0;
  const appStoreActive = subscribersBySource?.app_store || 0;
  const playStoreActive = subscribersBySource?.play_store || 0;
  const totalActive = stripeActive + appStoreActive + playStoreActive;
  const arr = combinedMrr * 12;

  const stats = {
    mrr: combinedMrr,
    stripeMrr,
    rcMrr,
    subscribed: totalActive,
    stripeActive,
    appStoreActive,
    playStoreActive,
    total: totalUserCount || 0,
    apprentice: stripeStats?.stripe.tierCounts?.apprentice || 0,
    electrician: stripeStats?.stripe.tierCounts?.electrician || 0,
    employer: stripeStats?.stripe.tierCounts?.employer || 0,
    conversionRate: totalUserCount ? ((totalActive / totalUserCount) * 100).toFixed(1) : '0',
  };

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-subscribed-users', search, roleFilter, sourceFilter],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('id, full_name, username, role, subscribed, created_at, subscription_source')
        .eq('subscribed', true)
        .order('created_at', { ascending: false });
      if (roleFilter !== 'all') query = query.eq('role', roleFilter);
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'apprentice':
        return <GraduationCap className="h-4 w-4 text-yellow-400" />;
      case 'electrician':
        return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'employer':
        return <Briefcase className="h-4 w-4 text-blue-400" />;
      default:
        return <Users className="h-4 w-4 text-white" />;
    }
  };

  const fmtGBP = (v: number) =>
    `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-5 pb-24">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Revenue</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 touch-manipulation"
              onClick={exportCSV}
              title="Export CSV"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 touch-manipulation"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── Hero Revenue Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative p-5">
            <div className="flex items-center gap-2 mb-3">
              <PoundSterling className="h-4 w-4 text-white" />
              <span className="text-white text-xs font-medium uppercase tracking-wider">
                Combined MRR
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white uppercase tracking-wider">
                Live
              </span>
            </div>

            <p className="text-4xl font-bold text-white tracking-tight mb-4">{fmtGBP(stats.mrr)}</p>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center">
                <p className="text-xl font-bold text-white">{stats.subscribed}</p>
                <p className="text-white text-[10px] uppercase tracking-wider">Active</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center">
                <p className="text-xl font-bold text-white">
                  £{arr >= 10000 ? `${(arr / 1000).toFixed(0)}k` : `${(arr / 1000).toFixed(1)}k`}
                </p>
                <p className="text-white text-[10px] uppercase tracking-wider">ARR</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center">
                <p className="text-xl font-bold text-white">{stats.conversionRate}%</p>
                <p className="text-white text-[10px] uppercase tracking-wider">Conv.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Revenue by Source ── */}
        <div>
          <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3 px-0.5">
            Revenue by Source
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Stripe */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08]">
              <div className="w-1 self-stretch rounded-full bg-purple-500 opacity-60" />
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <Globe className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-purple-400">{fmtGBP(stats.stripeMrr)}</p>
                <p className="text-[11px] text-white">Stripe · {stats.stripeActive} active</p>
              </div>
            </div>
            {/* App Store */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08]">
              <div className="w-1 self-stretch rounded-full bg-blue-500 opacity-60" />
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-blue-400">{fmtGBP(stats.rcMrr)}</p>
                <p className="text-[11px] text-white">App Store · {stats.appStoreActive} active</p>
              </div>
            </div>
            {/* Play Store */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08]">
              <div className="w-1 self-stretch rounded-full bg-green-500 opacity-60" />
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-green-400">£0.00</p>
                <p className="text-[11px] text-white">
                  Play Store · {stats.playStoreActive} active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subscribers by Role ── */}
        <div>
          <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3 px-0.5">
            By Role
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <GraduationCap className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{stats.apprentice}</p>
              <p className="text-[10px] text-white uppercase">Apprentices</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <Zap className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{stats.electrician}</p>
              <p className="text-[10px] text-white uppercase">Electricians</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
              <Briefcase className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{stats.employer}</p>
              <p className="text-[10px] text-white uppercase">Employers</p>
            </div>
          </div>
        </div>

        {/* ── Active Prices ── */}
        <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Active Prices</span>
          </div>
          <div className="p-3 space-y-1.5">
            {/* Stripe prices */}
            {stripeStats?.stripe?.subscriptionsByPrice &&
              Object.entries(stripeStats.stripe.subscriptionsByPrice)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([price, count]) => (
                  <div
                    key={price}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.04]"
                  >
                    <div className="w-1 h-8 rounded-full bg-purple-500 opacity-60" />
                    <span className="text-[13px] text-white font-medium flex-1">{price}</span>
                    <Badge className="bg-purple-500/15 text-purple-400 border-0 text-[10px] font-semibold">
                      Stripe
                    </Badge>
                    <span className="text-[13px] font-bold text-white w-8 text-right">
                      {count as number}
                    </span>
                  </div>
                ))}
            {/* App Store prices */}
            {APP_STORE_PRICES.map((iap) => (
              <div
                key={iap.name}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.04]"
              >
                <div className="w-1 h-8 rounded-full bg-blue-500 opacity-60" />
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-white font-medium">{iap.name}</span>
                  <span className="text-[10px] text-white ml-2">{iap.label}</span>
                </div>
                <Badge className="bg-blue-500/15 text-blue-400 border-0 text-[10px] font-semibold">
                  iOS
                </Badge>
                <span className="text-[13px] font-bold text-white w-8 text-right">
                  {stats.appStoreActive}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Promo Offers ── */}
        {offers && offers.length > 0 && (
          <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
              <Gift className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Active Promos</span>
            </div>
            <div className="p-3 space-y-1.5">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04]"
                >
                  <div>
                    <p className="text-[13px] font-medium text-white">{offer.name}</p>
                    <p className="text-[10px] text-white font-mono">{offer.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-white">£{offer.price}/mo</p>
                    <p className="text-[10px] text-white">
                      {offer.redemptions}
                      {offer.max_redemptions ? `/${offer.max_redemptions}` : ''} used
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-2">
          <AdminSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search subscribers..."
            className="flex-1"
          />
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[130px] h-11 touch-manipulation">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="apprentice">Apprentice</SelectItem>
                <SelectItem value="electrician">Electrician</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full sm:w-[130px] h-11 touch-manipulation">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="app_store">App Store</SelectItem>
                <SelectItem value="play_store">Play Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Subscriber List ── */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : users?.length === 0 ? (
          <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] p-8">
            <AdminEmptyState
              icon={Crown}
              title="No subscribers yet"
              description="Subscribed users will appear here."
            />
          </div>
        ) : (
          <div className="space-y-2">
            {users?.map((user) => (
              <button
                key={user.id}
                className="w-full text-left rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] p-3 active:bg-white/[0.08] transition-colors touch-manipulation"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <Crown className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-white truncate">
                      {user.full_name || 'Unknown'}
                    </p>
                    <p className="text-[11px] text-white">@{user.username}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {user.subscription_source && SOURCE_BADGES[user.subscription_source] && (
                      <Badge
                        className={`${SOURCE_BADGES[user.subscription_source].color} text-[9px] border-0 px-1.5`}
                      >
                        {SOURCE_BADGES[user.subscription_source].label}
                      </Badge>
                    )}
                    <Badge className={`${getRoleBadgeColor(user.role)} text-[10px]`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1 capitalize">{user.role || 'visitor'}</span>
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── User Detail Sheet ── */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold">
                      {selectedUser?.full_name || 'Unknown'}
                    </p>
                    <p className="text-[12px] text-white">@{selectedUser?.username}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-auto p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                    <p className="text-[10px] text-white uppercase tracking-wider mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[14px] font-semibold text-emerald-400">Active</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                    <p className="text-[10px] text-white uppercase tracking-wider mb-1">Plan</p>
                    <p className="text-[14px] font-semibold text-white capitalize">
                      {selectedUser?.role || 'Standard'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                    <p className="text-[10px] text-white uppercase tracking-wider mb-1">Source</p>
                    <p className="text-[14px] font-semibold text-white capitalize">
                      {(selectedUser?.subscription_source || 'stripe').replace('_', ' ')}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                    <p className="text-[10px] text-white uppercase tracking-wider mb-1">
                      Member Since
                    </p>
                    <p className="text-[14px] font-semibold text-white">
                      {selectedUser?.created_at
                        ? formatDistanceToNow(new Date(selectedUser.created_at), {
                            addSuffix: true,
                          })
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
