import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  PoundSterling,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  Clock,
  AlertTriangle,
  MapPin,
  Flag,
  User,
  Briefcase,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface PricingSubmission {
  id: string;
  user_id: string;
  postcode_district: string | null;
  job_type: string;
  actual_price: number;
  job_description: string | null;
  completion_date: string | null;
  materials_cost: number | null;
  labour_hours: number | null;
  complexity_notes: string | null;
  verification_status: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  profiles?: { full_name: string; username: string; role: string };
}

export default function AdminPricingModeration() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedSubmission, setSelectedSubmission] = useState<PricingSubmission | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Fetch pricing submissions
  const { data: submissions, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-pricing-submissions", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("community_pricing_submissions")
        .select(`*, profiles:user_id (full_name, username, role)`)
        .order("created_at", { ascending: false })
        .limit(200);

      if (statusFilter !== "all") {
        if (statusFilter === "pending") {
          query = query.or("verification_status.is.null,verification_status.eq.pending");
        } else {
          query = query.eq("verification_status", statusFilter);
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as PricingSubmission[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.job_type?.toLowerCase().includes(s) ||
            p.postcode_district?.toLowerCase().includes(s) ||
            p.profiles?.full_name?.toLowerCase().includes(s) ||
            p.job_description?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Get stats
  const { data: stats } = useQuery({
    queryKey: ["admin-pricing-stats"],
    queryFn: async () => {
      const [pendingRes, approvedRes, rejectedRes, totalRes] = await Promise.all([
        supabase.from("community_pricing_submissions").select("*", { count: "exact", head: true })
          .or("verification_status.is.null,verification_status.eq.pending"),
        supabase.from("community_pricing_submissions").select("*", { count: "exact", head: true })
          .eq("verification_status", "approved"),
        supabase.from("community_pricing_submissions").select("*", { count: "exact", head: true })
          .eq("verification_status", "rejected"),
        supabase.from("community_pricing_submissions").select("*", { count: "exact", head: true }),
      ]);

      // Get average prices for comparison
      const { data: avgData } = await supabase
        .from("community_pricing_submissions")
        .select("job_type, actual_price")
        .eq("verification_status", "approved");

      const avgByType: Record<string, { total: number; count: number }> = {};
      avgData?.forEach((item) => {
        if (!avgByType[item.job_type]) {
          avgByType[item.job_type] = { total: 0, count: 0 };
        }
        avgByType[item.job_type].total += Number(item.actual_price);
        avgByType[item.job_type].count += 1;
      });

      return {
        pending: pendingRes.count || 0,
        approved: approvedRes.count || 0,
        rejected: rejectedRes.count || 0,
        total: totalRes.count || 0,
        avgByType,
      };
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("community_pricing_submissions")
        .update({
          verification_status: "approved",
          verified_by: profile?.id,
          verified_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "pricing_approved",
        entity_type: "community_pricing_submissions",
        entity_id: id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-stats"] });
      setSelectedSubmission(null);
      toast({ title: "Price approved", description: "Submission has been verified." });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { error } = await supabase
        .from("community_pricing_submissions")
        .update({
          verification_status: "rejected",
          verified_by: profile?.id,
          verified_at: new Date().toISOString(),
          complexity_notes: reason, // Using this field to store rejection reason
        })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "pricing_rejected",
        entity_type: "community_pricing_submissions",
        entity_id: id,
        new_values: { reason },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-stats"] });
      setSelectedSubmission(null);
      setShowRejectDialog(false);
      setRejectReason("");
      toast({ title: "Price rejected" });
    },
  });

  // Flag as suspicious
  const flagMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("community_pricing_submissions")
        .update({
          verification_status: "flagged",
          verified_by: profile?.id,
          verified_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;

      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "pricing_flagged",
        entity_type: "community_pricing_submissions",
        entity_id: id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-stats"] });
      setSelectedSubmission(null);
      toast({ title: "Price flagged for review" });
    },
  });

  const getStatusBadge = (status: string | null) => {
    const styles: Record<string, string> = {
      approved: "bg-green-500/20 text-green-400",
      rejected: "bg-red-500/20 text-red-400",
      flagged: "bg-amber-500/20 text-amber-400",
      pending: "bg-blue-500/20 text-blue-400",
    };
    const s = status || "pending";
    return <Badge className={styles[s] || styles.pending}>{s}</Badge>;
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4 text-green-400" />;
      case "rejected":
        return <X className="h-4 w-4 text-red-400" />;
      case "flagged":
        return <Flag className="h-4 w-4 text-amber-400" />;
      default:
        return <Clock className="h-4 w-4 text-blue-400" />;
    }
  };

  // Check if price is suspicious (>50% deviation from average)
  const isPriceSuspicious = (submission: PricingSubmission) => {
    const avgData = stats?.avgByType[submission.job_type];
    if (!avgData || avgData.count < 3) return null;
    const avg = avgData.total / avgData.count;
    const deviation = Math.abs(submission.actual_price - avg) / avg;
    return deviation > 0.5 ? { avg, deviation } : null;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Pricing Moderation</h2>
          <p className="text-xs text-muted-foreground">{stats?.pending || 0} pending review</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 touch-manipulation"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-2">
        <Card
          className={`bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 touch-manipulation cursor-pointer ${statusFilter === "pending" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => setStatusFilter("pending")}
        >
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-lg font-bold">{stats?.pending || 0}</p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 touch-manipulation cursor-pointer ${statusFilter === "approved" ? "ring-2 ring-green-500" : ""}`}
          onClick={() => setStatusFilter("approved")}
        >
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-lg font-bold">{stats?.approved || 0}</p>
                <p className="text-[10px] text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 touch-manipulation cursor-pointer ${statusFilter === "rejected" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter("rejected")}
        >
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-lg font-bold">{stats?.rejected || 0}</p>
                <p className="text-[10px] text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 touch-manipulation cursor-pointer ${statusFilter === "all" ? "ring-2 ring-purple-500" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-lg font-bold">{stats?.total || 0}</p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by job type, postcode, user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-11 touch-manipulation"
        />
      </div>

      {/* Submissions List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-16 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : submissions?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <PoundSterling className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No pricing submissions</h3>
            <p className="text-sm text-muted-foreground">
              {statusFilter === "pending" ? "All caught up!" : "No submissions match this filter."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {submissions?.map((submission) => {
            const suspicious = isPriceSuspicious(submission);
            return (
              <Card
                key={submission.id}
                className={`touch-manipulation active:scale-[0.99] transition-transform cursor-pointer ${suspicious ? "border-amber-500/50" : ""}`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        submission.verification_status === "approved" ? "bg-green-500/10" :
                        submission.verification_status === "rejected" ? "bg-red-500/10" :
                        suspicious ? "bg-amber-500/10" :
                        "bg-blue-500/10"
                      }`}>
                        {suspicious ? (
                          <AlertTriangle className="h-5 w-5 text-amber-400" />
                        ) : (
                          getStatusIcon(submission.verification_status)
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{submission.job_type}</p>
                          <span className="text-green-400 font-bold">£{Number(submission.actual_price).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <User className="h-3 w-3" />
                          <span className="truncate">{submission.profiles?.full_name || "Unknown"}</span>
                          {submission.postcode_district && (
                            <>
                              <span>·</span>
                              <MapPin className="h-3 w-3" />
                              <span>{submission.postcode_district}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {suspicious && (
                        <Badge variant="outline" className="text-[10px] border-amber-500 text-amber-400">
                          {suspicious.deviation > 1 ? "Very High" : suspicious.deviation > 0.5 ? "High" : ""}
                        </Badge>
                      )}
                      {getStatusBadge(submission.verification_status)}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Submission Detail Sheet */}
      <Sheet open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <PoundSterling className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-left">
                  <p>{selectedSubmission?.job_type}</p>
                  <p className="text-2xl font-bold text-green-400">
                    £{Number(selectedSubmission?.actual_price || 0).toLocaleString()}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Price Comparison */}
              {selectedSubmission && (() => {
                const suspicious = isPriceSuspicious(selectedSubmission);
                const avgData = stats?.avgByType[selectedSubmission.job_type];
                if (avgData && avgData.count >= 3) {
                  const avg = avgData.total / avgData.count;
                  const diff = selectedSubmission.actual_price - avg;
                  const pct = (diff / avg) * 100;
                  return (
                    <Card className={suspicious ? "border-amber-500/50 bg-amber-500/5" : "border-green-500/30 bg-green-500/5"}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          {suspicious ? (
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                          ) : (
                            <Check className="h-4 w-4 text-green-400" />
                          )}
                          Price Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <p className="text-lg font-bold">£{avg.toFixed(0)}</p>
                            <p className="text-xs text-muted-foreground">Average</p>
                          </div>
                          <div>
                            <p className={`text-lg font-bold flex items-center justify-center gap-1 ${diff > 0 ? "text-red-400" : "text-green-400"}`}>
                              {diff > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                              {pct > 0 ? "+" : ""}{pct.toFixed(0)}%
                            </p>
                            <p className="text-xs text-muted-foreground">Difference</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{avgData.count}</p>
                            <p className="text-xs text-muted-foreground">Samples</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
                return null;
              })()}

              {/* Submitter Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Submitted By
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm">{selectedSubmission?.profiles?.full_name || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Username</span>
                    <span className="text-sm">@{selectedSubmission?.profiles?.username || "unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <Badge variant="outline">{selectedSubmission?.profiles?.role || "unknown"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Submitted</span>
                    <span className="text-sm">
                      {selectedSubmission?.created_at && formatDistanceToNow(new Date(selectedSubmission.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Job Details */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Job Type</span>
                    <span className="text-sm">{selectedSubmission?.job_type}</span>
                  </div>
                  {selectedSubmission?.postcode_district && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Postcode</span>
                      <span className="text-sm">{selectedSubmission.postcode_district}</span>
                    </div>
                  )}
                  {selectedSubmission?.completion_date && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="text-sm">{format(new Date(selectedSubmission.completion_date), "dd MMM yyyy")}</span>
                    </div>
                  )}
                  {selectedSubmission?.materials_cost && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Materials</span>
                      <span className="text-sm">£{Number(selectedSubmission.materials_cost).toLocaleString()}</span>
                    </div>
                  )}
                  {selectedSubmission?.labour_hours && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Labour Hours</span>
                      <span className="text-sm">{selectedSubmission.labour_hours}h</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Description */}
              {selectedSubmission?.job_description && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{selectedSubmission.job_description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Status */}
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Verification Status</span>
                    {selectedSubmission && getStatusBadge(selectedSubmission.verification_status)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            {(!selectedSubmission?.verification_status || selectedSubmission?.verification_status === "pending") && (
              <SheetFooter className="p-4 border-t border-border">
                <div className="grid grid-cols-3 gap-2 w-full">
                  <Button
                    className="h-12 touch-manipulation bg-green-600 hover:bg-green-700"
                    onClick={() => selectedSubmission && approveMutation.mutate(selectedSubmission.id)}
                    disabled={approveMutation.isPending}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 touch-manipulation border-amber-500 text-amber-500"
                    onClick={() => selectedSubmission && flagMutation.mutate(selectedSubmission.id)}
                    disabled={flagMutation.isPending}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Flag
                  </Button>
                  <Button
                    variant="destructive"
                    className="h-12 touch-manipulation"
                    onClick={() => setShowRejectDialog(true)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
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
            <AlertDialogTitle>Reject Pricing?</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejection (e.g., unrealistic price, spam, etc.)
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
              onClick={() => selectedSubmission && rejectMutation.mutate({ id: selectedSubmission.id, reason: rejectReason })}
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
