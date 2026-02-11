import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';

// Static role styles - extracted to module scope for performance
const ROLE_BADGE_COLORS: Record<string, string> = {
  apprentice: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  electrician: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  employer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  default: 'bg-gray-500/20 text-gray-400',
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

export default function AdminSubscriptions() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<SubscribedUser | null>(null);

  // Fetch subscription stats - consolidated from 5 queries to 1
  const { data: stats } = useQuery({
    queryKey: ['admin-subscription-stats'],
    queryFn: async () => {
      // Single query to get all profile data needed for stats
      const [profilesRes, offersRes] = await Promise.all([
        supabase.from('profiles').select('role, subscribed', { count: 'exact' }),
        supabase.from('promo_offers').select('redemptions, price'),
      ]);

      const profiles = profilesRes.data || [];
      const total = profilesRes.count || 0;
      const subscribed = profiles.filter((p) => p.subscribed);

      // Calculate potential MRR based on offer redemptions
      let estimatedMRR = 0;
      offersRes.data?.forEach((offer: { redemptions: number; price: number }) => {
        estimatedMRR += (offer.redemptions || 0) * (offer.price || 0);
      });

      return {
        total,
        subscribed: subscribed.length,
        apprentice: subscribed.filter((p) => p.role === 'apprentice').length,
        electrician: subscribed.filter((p) => p.role === 'electrician').length,
        employer: subscribed.filter((p) => p.role === 'employer').length,
        estimatedMRR,
        conversionRate: total ? ((subscribed.length / total) * 100).toFixed(1) : '0',
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 30000,
  });

  // Fetch subscribed users
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-subscribed-users', search, roleFilter],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('id, full_name, username, role, subscribed, created_at')
        .eq('subscribed', true)
        .order('created_at', { ascending: false });

      if (roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as SubscribedUser[];
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.full_name?.toLowerCase().includes(searchLower) ||
            u.username?.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  // Fetch active promo offers
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
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  const exportCSV = () => {
    if (!users || users.length === 0) return;
    const headers = ['Name', 'Username', 'Role', 'Subscribed', 'Created At'];
    const rows = users.map((u) => [
      u.full_name || '',
      u.username || '',
      u.role || '',
      u.subscribed ? 'Yes' : 'No',
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
    a.download = `admin-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
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
        return <Users className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Subscriptions</h1>
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

        {/* Revenue Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 col-span-2 md:col-span-1">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">£{(stats?.estimatedMRR || 0).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Est. MRR</p>
                </div>
                <PoundSterling className="h-6 w-6 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats?.subscribed || 0}</p>
                  <p className="text-xs text-muted-foreground">Subscribed</p>
                </div>
                <Crown className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats?.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion</p>
                </div>
                <Target className="h-6 w-6 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats?.total || 0}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown by Role */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              Subscribers by Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <GraduationCap className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{stats?.apprentice || 0}</p>
                <p className="text-xs text-muted-foreground">Apprentices</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{stats?.electrician || 0}</p>
                <p className="text-xs text-muted-foreground">Electricians</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Briefcase className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{stats?.employer || 0}</p>
                <p className="text-xs text-muted-foreground">Employers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Promo Offers */}
        {offers && offers.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Gift className="h-4 w-4 text-red-400" />
                Active Promo Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-sm">{offer.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{offer.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">£{offer.price}/mo</p>
                      <p className="text-xs text-muted-foreground">
                        {offer.redemptions}
                        {offer.max_redemptions ? `/${offer.max_redemptions}` : ''} used
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search subscribers..."
                className="flex-1"
              />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="apprentice">Apprentice</SelectItem>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers List */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-4 pb-4">
                  <div className="h-14 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : users?.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <AdminEmptyState
                icon={Crown}
                title="No subscribers yet"
                description="Subscribed users will appear here."
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {users?.map((user) => (
              <Card
                key={user.id}
                className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center shrink-0">
                        <Crown className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{user.full_name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`${getRoleBadgeColor(user.role)} text-xs`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1 capitalize">{user.role || 'visitor'}</span>
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* User Detail Sheet */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-left">{selectedUser?.full_name}</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      @{selectedUser?.username}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-400" />
                      Subscription Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Plan</span>
                      <Badge className={getRoleBadgeColor(selectedUser?.role || '')}>
                        <span className="capitalize">{selectedUser?.role || 'Unknown'}</span>
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(new Date(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          formatDistanceToNow(new Date(selectedUser.created_at))}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}
