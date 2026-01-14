import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  IdCard,
  Shield,
  ShieldCheck,
  Eye,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string | null;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  bio: string | null;
  specialisations: string[] | null;
  profile_views: number;
  is_verified: boolean;
  verified_at: string | null;
  verification_tier: string | null;
  activated: boolean;
  activated_at: string | null;
  available_for_hire: boolean;
  created_at: string;
  profiles?: {
    full_name: string;
    username: string;
    role: string;
  };
}

export default function AdminElecIds() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);

  // Fetch Elec-ID profiles
  const { data: elecIds, isLoading } = useQuery({
    queryKey: ["admin-elec-ids", search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("employer_elec_id_profiles")
        .select(`
          *,
          profiles:employee_id (
            full_name,
            username,
            role
          )
        `)
        .order("created_at", { ascending: false });

      if (statusFilter === "verified") {
        query = query.eq("is_verified", true);
      } else if (statusFilter === "pending") {
        query = query.eq("is_verified", false);
      } else if (statusFilter === "activated") {
        query = query.eq("activated", true);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Filter by search
      let filtered = data as ElecIdProfile[];
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.profiles?.full_name?.toLowerCase().includes(searchLower) ||
            p.elec_id_number?.toLowerCase().includes(searchLower) ||
            p.ecs_card_number?.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["admin-elec-id-stats"],
    queryFn: async () => {
      const [totalRes, verifiedRes, activatedRes, hireableRes] = await Promise.all([
        supabase.from("employer_elec_id_profiles").select("*", { count: "exact", head: true }),
        supabase.from("employer_elec_id_profiles").select("*", { count: "exact", head: true }).eq("is_verified", true),
        supabase.from("employer_elec_id_profiles").select("*", { count: "exact", head: true }).eq("activated", true),
        supabase.from("employer_elec_id_profiles").select("*", { count: "exact", head: true }).eq("available_for_hire", true),
      ]);

      return {
        total: totalRes.count || 0,
        verified: verifiedRes.count || 0,
        activated: activatedRes.count || 0,
        hireable: hireableRes.count || 0,
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  const getVerificationBadge = (profile: ElecIdProfile) => {
    if (profile.is_verified) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const getTierBadge = (tier: string | null) => {
    switch (tier) {
      case "gold":
        return <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Gold</Badge>;
      case "silver":
        return <Badge className="bg-gray-400/20 text-gray-300 text-xs">Silver</Badge>;
      case "bronze":
        return <Badge className="bg-orange-600/20 text-orange-400 text-xs">Bronze</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Standard</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.total || 0}</p>
                <p className="text-xs text-muted-foreground">Total Profiles</p>
              </div>
              <IdCard className="h-6 w-6 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.verified || 0}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.activated || 0}</p>
                <p className="text-xs text-muted-foreground">Activated</p>
              </div>
              <CheckCircle className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.hireable || 0}</p>
                <p className="text-xs text-muted-foreground">For Hire</p>
              </div>
              <Briefcase className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, Elec-ID, ECS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 touch-manipulation"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="activated">Activated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Elec-ID List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4">
                <div className="h-16 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : elecIds?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <IdCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No Elec-ID profiles found</h3>
            <p className="text-sm text-muted-foreground">
              Elec-ID profiles will appear here as users create them.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {elecIds?.map((profile) => (
            <Card
              key={profile.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedProfile(profile)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                      <IdCard className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">
                        {profile.profiles?.full_name || "Unknown"}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground font-mono">
                          {profile.elec_id_number || "No ID"}
                        </span>
                        {profile.ecs_card_type && (
                          <Badge variant="outline" className="text-[10px] py-0">
                            {profile.ecs_card_type}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col items-end gap-1">
                      {getVerificationBadge(profile)}
                      {profile.verification_tier && getTierBadge(profile.verification_tier)}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Profile Detail Sheet */}
      <Sheet open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <IdCard className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-left">{selectedProfile?.profiles?.full_name}</p>
                  <p className="text-sm font-normal text-muted-foreground font-mono">
                    {selectedProfile?.elec_id_number || "No Elec-ID"}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card className={selectedProfile?.is_verified ? "border-green-500/30" : "border-amber-500/30"}>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center gap-2">
                      {selectedProfile?.is_verified ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {selectedProfile?.is_verified ? "Verified" : "Pending"}
                        </p>
                        {selectedProfile?.verified_at && (
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(selectedProfile.verified_at), "dd MMM yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={selectedProfile?.activated ? "border-purple-500/30" : "border-muted"}>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center gap-2">
                      {selectedProfile?.activated ? (
                        <CheckCircle className="h-5 w-5 text-purple-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {selectedProfile?.activated ? "Activated" : "Not Active"}
                        </p>
                        {selectedProfile?.activated_at && (
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(selectedProfile.activated_at), "dd MMM yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ECS Card Details */}
              {selectedProfile?.ecs_card_number && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-400" />
                      ECS Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="text-sm font-medium">{selectedProfile.ecs_card_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Number</span>
                      <span className="text-sm font-mono">{selectedProfile.ecs_card_number}</span>
                    </div>
                    {selectedProfile.ecs_expiry_date && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expires</span>
                        <span className="text-sm">
                          {format(new Date(selectedProfile.ecs_expiry_date), "dd MMM yyyy")}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Profile Stats */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-400" />
                    Profile Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profile Views</span>
                    <span className="text-sm font-medium">{selectedProfile?.profile_views || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Available for Hire</span>
                    <span className="text-sm">
                      {selectedProfile?.available_for_hire ? (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">Yes</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">No</Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm">
                      {selectedProfile?.created_at && formatDistanceToNow(new Date(selectedProfile.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Specialisations */}
              {selectedProfile?.specialisations && selectedProfile.specialisations.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                      Specialisations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.specialisations.map((spec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bio */}
              {selectedProfile?.bio && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedProfile.bio}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
