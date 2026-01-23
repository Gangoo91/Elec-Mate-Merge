import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IdCard,
  ShieldCheck,
  ShieldX,
  Eye,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Loader2,
  RefreshCw,
  CheckSquare,
  Square,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

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
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkApproveDialog, setShowBulkApproveDialog] = useState(false);
  const [showBulkRejectDialog, setShowBulkRejectDialog] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState("");

  // Fetch Elec-ID profiles
  const { data: elecIds, isLoading, refetch } = useQuery({
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

  // Approve mutation via edge function
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke("admin-verify-elecid", {
        body: { action: "approve", profileId: id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-elec-ids"] });
      queryClient.invalidateQueries({ queryKey: ["admin-elec-id-stats"] });
      setSelectedProfile(null);
      toast({ title: "Profile approved", description: "Elec-ID has been verified." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Reject mutation via edge function
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { data, error } = await supabase.functions.invoke("admin-verify-elecid", {
        body: { action: "reject", profileId: id, reason },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-elec-ids"] });
      queryClient.invalidateQueries({ queryKey: ["admin-elec-id-stats"] });
      setSelectedProfile(null);
      setShowRejectDialog(false);
      setRejectReason("");
      toast({ title: "Profile rejected" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Bulk approve mutation
  const bulkApproveMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(
        ids.map((id) =>
          supabase.functions.invoke("admin-verify-elecid", {
            body: { action: "approve", profileId: id },
          })
        )
      );
      const failures = results.filter((r) => r.status === "rejected");
      if (failures.length > 0) {
        throw new Error(`${failures.length} of ${ids.length} approvals failed`);
      }
      return { approved: ids.length };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-elec-ids"] });
      queryClient.invalidateQueries({ queryKey: ["admin-elec-id-stats"] });
      setSelectedIds(new Set());
      setShowBulkApproveDialog(false);
      toast({ title: "Bulk approval complete", description: `${data.approved} profiles verified.` });
    },
    onError: (error: any) => {
      toast({ title: "Bulk approval failed", description: error.message, variant: "destructive" });
    },
  });

  // Bulk reject mutation
  const bulkRejectMutation = useMutation({
    mutationFn: async ({ ids, reason }: { ids: string[]; reason: string }) => {
      const results = await Promise.allSettled(
        ids.map((id) =>
          supabase.functions.invoke("admin-verify-elecid", {
            body: { action: "reject", profileId: id, reason },
          })
        )
      );
      const failures = results.filter((r) => r.status === "rejected");
      if (failures.length > 0) {
        throw new Error(`${failures.length} of ${ids.length} rejections failed`);
      }
      return { rejected: ids.length };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-elec-ids"] });
      queryClient.invalidateQueries({ queryKey: ["admin-elec-id-stats"] });
      setSelectedIds(new Set());
      setShowBulkRejectDialog(false);
      setBulkRejectReason("");
      toast({ title: "Bulk rejection complete", description: `${data.rejected} profiles rejected.` });
    },
    onError: (error: any) => {
      toast({ title: "Bulk rejection failed", description: error.message, variant: "destructive" });
    },
  });

  // Selection helpers
  const pendingProfiles = elecIds?.filter((p) => !p.is_verified) || [];
  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };
  const selectAllPending = () => {
    setSelectedIds(new Set(pendingProfiles.map((p) => p.id)));
  };
  const clearSelection = () => {
    setSelectedIds(new Set());
  };

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
            <AdminSearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search name, Elec-ID, ECS..."
              className="flex-1"
            />
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
            <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation shrink-0" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions Bar */}
      {pendingProfiles.length > 0 && (
        <Card className={selectedIds.size > 0 ? "border-cyan-500/30 bg-cyan-500/5" : ""}>
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 touch-manipulation gap-2"
                  onClick={selectedIds.size === pendingProfiles.length ? clearSelection : selectAllPending}
                >
                  {selectedIds.size === pendingProfiles.length ? (
                    <>
                      <CheckSquare className="h-4 w-4" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <Square className="h-4 w-4" />
                      Select All Pending ({pendingProfiles.length})
                    </>
                  )}
                </Button>
                {selectedIds.size > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {selectedIds.size} selected
                  </span>
                )}
              </div>
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 touch-manipulation gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => setShowBulkRejectDialog(true)}
                    disabled={bulkRejectMutation.isPending}
                  >
                    <ShieldX className="h-4 w-4" />
                    Reject ({selectedIds.size})
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 touch-manipulation gap-2 bg-green-500 hover:bg-green-600"
                    onClick={() => setShowBulkApproveDialog(true)}
                    disabled={bulkApproveMutation.isPending}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Approve ({selectedIds.size})
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={IdCard}
              title="No Elec-ID profiles found"
              description="Elec-ID profiles will appear here as users create them."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {elecIds?.map((profile) => (
            <Card
              key={profile.id}
              className={`touch-manipulation active:scale-[0.99] transition-transform cursor-pointer ${
                selectedIds.has(profile.id) ? "border-cyan-500/50 bg-cyan-500/5" : ""
              }`}
              onClick={() => setSelectedProfile(profile)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Checkbox for pending profiles */}
                    {!profile.is_verified && (
                      <Checkbox
                        checked={selectedIds.has(profile.id)}
                        onCheckedChange={() => toggleSelect(profile.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 border-cyan-500/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                    )}
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

            {/* Action Buttons for pending profiles */}
            {selectedProfile && !selectedProfile.is_verified && (
              <SheetFooter className="p-4 border-t border-border">
                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 touch-manipulation gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => setShowRejectDialog(true)}
                    disabled={approveMutation.isPending}
                  >
                    <ShieldX className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    className="flex-1 h-12 touch-manipulation gap-2 bg-green-500 hover:bg-green-600"
                    onClick={() => selectedProfile && approveMutation.mutate(selectedProfile.id)}
                    disabled={approveMutation.isPending}
                  >
                    {approveMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-4 w-4" />
                    )}
                    {approveMutation.isPending ? "Approving..." : "Verify"}
                  </Button>
                </div>
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Verification?</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejection. This will be sent to the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter rejection reason..."
            className="min-h-[100px]"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={rejectMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => selectedProfile && rejectMutation.mutate({ id: selectedProfile.id, reason: rejectReason })}
              disabled={!rejectReason.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rejecting...
                </>
              ) : (
                "Reject"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Approve Dialog */}
      <AlertDialog open={showBulkApproveDialog} onOpenChange={setShowBulkApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bulk Approve {selectedIds.size} Profiles?</AlertDialogTitle>
            <AlertDialogDescription>
              This will verify {selectedIds.size} Elec-ID profiles. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={bulkApproveMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-green-500 hover:bg-green-600"
              onClick={() => bulkApproveMutation.mutate(Array.from(selectedIds))}
              disabled={bulkApproveMutation.isPending}
            >
              {bulkApproveMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Approve All
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Reject Dialog */}
      <AlertDialog open={showBulkRejectDialog} onOpenChange={setShowBulkRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bulk Reject {selectedIds.size} Profiles?</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejection. This will be sent to all {selectedIds.size} users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={bulkRejectReason}
            onChange={(e) => setBulkRejectReason(e.target.value)}
            placeholder="Enter rejection reason..."
            className="min-h-[100px]"
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={bulkRejectMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => bulkRejectMutation.mutate({ ids: Array.from(selectedIds), reason: bulkRejectReason })}
              disabled={!bulkRejectReason.trim() || bulkRejectMutation.isPending}
            >
              {bulkRejectMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <ShieldX className="h-4 w-4 mr-2" />
                  Reject All
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
