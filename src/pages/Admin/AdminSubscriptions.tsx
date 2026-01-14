import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CreditCard,
  TrendingUp,
  Users,
  Crown,
  Zap,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Calendar,
  PoundSterling,
  Target,
  Gift,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

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
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<SubscribedUser | null>(null);

  // Fetch subscription stats
  const { data: stats } = useQuery({
    queryKey: ["admin-subscription-stats"],
    queryFn: async () => {
      const [
        totalRes,
        subscribedRes,
        apprenticeRes,
        electricianRes,
        employerRes,
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("subscribed", true),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "apprentice").eq("subscribed", true),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "electrician").eq("subscribed", true),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "employer").eq("subscribed", true),
      ]);

      // Get promo offers for MRR calculation
      const { data: offers } = await supabase.from("promo_offers").select("*");

      // Calculate potential MRR based on offer redemptions
      let estimatedMRR = 0;
      offers?.forEach((offer: PromoOffer) => {
        estimatedMRR += (offer.redemptions || 0) * (offer.price || 0);
      });

      return {
        total: totalRes.count || 0,
        subscribed: subscribedRes.count || 0,
        apprentice: apprenticeRes.count || 0,
        electrician: electricianRes.count || 0,
        employer: employerRes.count || 0,
        estimatedMRR,
        conversionRate: totalRes.count ? ((subscribedRes.count || 0) / totalRes.count * 100).toFixed(1) : "0",
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 30000,
  });

  // Fetch subscribed users
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-subscribed-users", search, roleFilter],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("id, full_name, username, role, subscribed, created_at")
        .eq("subscribed", true)
        .order("created_at", { ascending: false });

      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
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
    queryKey: ["admin-promo-offers-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promo_offers")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PromoOffer[];
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "apprentice":
        return <GraduationCap className="h-4 w-4 text-purple-400" />;
      case "electrician":
        return <Zap className="h-4 w-4 text-yellow-400" />;
      case "employer":
        return <Briefcase className="h-4 w-4 text-blue-400" />;
      default:
        return <Users className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "apprentice":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "electrician":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "employer":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
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
            <div className="text-center p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <GraduationCap className="h-6 w-6 text-purple-400 mx-auto mb-1" />
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
                      {offer.redemptions}{offer.max_redemptions ? `/${offer.max_redemptions}` : ""} used
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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 touch-manipulation"
              />
            </div>
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
          <CardContent className="pt-6 text-center py-12">
            <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No subscribers yet</h3>
            <p className="text-sm text-muted-foreground">
              Subscribed users will appear here.
            </p>
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
                      <p className="font-medium truncate">{user.full_name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={`${getRoleBadgeColor(user.role)} text-xs`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1 capitalize">{user.role || "visitor"}</span>
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
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
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
                    <Badge className={getRoleBadgeColor(selectedUser?.role || "")}>
                      <span className="capitalize">{selectedUser?.role || "Unknown"}</span>
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm">
                      {selectedUser?.created_at && format(new Date(selectedUser.created_at), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm">
                      {selectedUser?.created_at && formatDistanceToNow(new Date(selectedUser.created_at))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
