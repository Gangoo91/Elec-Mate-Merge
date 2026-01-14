import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Search,
  IdCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  ShieldX,
  Award,
  User,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string | null;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  verification_status: string;
  verification_notes: string | null;
  rejection_reason: string | null;
  is_verified: boolean;
  created_at: string;
  profiles?: { full_name: string; username: string; role: string };
}

export default function AdminVerificationQueue() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Fetch verification queue
  const { data: queue, isLoading, refetch } = useQuery({
    queryKey: ["admin-verification-queue", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("employer_elec_id_profiles")
        .select(`*, profiles:employee_id (full_name, username, role)`)
        .order("created_at", { ascending: true });

      if (statusFilter !== "all") {
        query = query.eq("verification_status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as ElecIdProfile[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.profiles?.full_name?.toLowerCase().includes(s) ||
            p.elec_id_number?.toLowerCase().includes(s) ||
            p.ecs_card_number?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("employer_elec_id_profiles")
        .update({
          verification_status: "approved",
          is_verified: true,
          verified_at: new Date().toISOString(),
          reviewed_by: profile?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;

      // Log the action
      await supabase.from("elec_id_verification_history").insert({
        elec_id_profile_id: id,
        action: "approved",
        performed_by: profile?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-verification-queue"] });
      setSelectedProfile(null);
      toast({ title: "Profile approved", description: "Elec-ID has been verified." });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { error } = await supabase
        .from("employer_elec_id_profiles")
        .update({
          verification_status: "rejected",
          is_verified: false,
          rejection_reason: reason,
          reviewed_by: profile?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("elec_id_verification_history").insert({
        elec_id_profile_id: id,
        action: "rejected",
        performed_by: profile?.id,
        notes: reason,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-verification-queue"] });
      setSelectedProfile(null);
      setShowRejectDialog(false);
      setRejectReason("");
      toast({ title: "Profile rejected" });
    },
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { class: string; icon: any }> = {
      pending: { class: "bg-amber-500/20 text-amber-400", icon: Clock },
      under_review: { class: "bg-blue-500/20 text-blue-400", icon: Eye },
      approved: { class: "bg-green-500/20 text-green-400", icon: CheckCircle },
      rejected: { class: "bg-red-500/20 text-red-400", icon: XCircle },
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return (
      <Badge className={style.class}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace("_", " ")}
      </Badge>
    );
  };

  const stats = {
    pending: queue?.filter((p) => p.verification_status === "pending").length || 0,
    approved: queue?.filter((p) => p.verification_status === "approved").length || 0,
    rejected: queue?.filter((p) => p.verification_status === "rejected").length || 0,
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="pt-4 pb-4">
            <p className="text-xl font-bold">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-4 pb-4">
            <p className="text-xl font-bold">{stats.approved}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="pt-4 pb-4">
            <p className="text-xl font-bold">{stats.rejected}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 touch-manipulation"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-11 touch-manipulation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Queue List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-16 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : queue?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <IdCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No profiles to verify</h3>
            <p className="text-sm text-muted-foreground">Verification requests will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {queue?.map((item) => (
            <Card
              key={item.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedProfile(item)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <IdCard className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{item.profiles?.full_name || "Unknown"}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground font-mono">
                          {item.elec_id_number || "No ID"}
                        </span>
                        {item.ecs_card_type && (
                          <Badge variant="outline" className="text-[10px]">{item.ecs_card_type}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {getStatusBadge(item.verification_status)}
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
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <IdCard className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-left">{selectedProfile?.profiles?.full_name}</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {selectedProfile?.elec_id_number || "No Elec-ID"}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Verification Status</span>
                    {selectedProfile && getStatusBadge(selectedProfile.verification_status)}
                  </div>
                </CardContent>
              </Card>

              {/* User Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    User Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm">{selectedProfile?.profiles?.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Username</span>
                    <span className="text-sm">@{selectedProfile?.profiles?.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <Badge variant="outline">{selectedProfile?.profiles?.role}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* ECS Card */}
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
                      <span className="text-sm">{selectedProfile.ecs_card_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Number</span>
                      <span className="text-sm font-mono">{selectedProfile.ecs_card_number}</span>
                    </div>
                    {selectedProfile.ecs_expiry_date && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expires</span>
                        <span className="text-sm">{format(new Date(selectedProfile.ecs_expiry_date), "dd MMM yyyy")}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Rejection reason if rejected */}
              {selectedProfile?.rejection_reason && (
                <Card className="border-red-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-400">Rejection Reason</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedProfile.rejection_reason}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            {selectedProfile?.verification_status === "pending" && (
              <SheetFooter className="p-4 border-t border-border">
                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 touch-manipulation gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => setShowRejectDialog(true)}
                  >
                    <ShieldX className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    className="flex-1 h-12 touch-manipulation gap-2 bg-green-500 hover:bg-green-600"
                    onClick={() => selectedProfile && approveMutation.mutate(selectedProfile.id)}
                    disabled={approveMutation.isPending}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Approve
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
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => selectedProfile && rejectMutation.mutate({ id: selectedProfile.id, reason: rejectReason })}
              disabled={!rejectReason.trim()}
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
