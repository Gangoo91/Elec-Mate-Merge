import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Mail,
  Upload,
  Send,
  RefreshCw,
  Check,
  Clock,
  AlertTriangle,
  ChevronRight,
  Copy,
  Trash2,
  RotateCw,
  Loader2,
  Rocket,
  Eye,
  MousePointerClick,
  UserCheck,
  XCircle,
  MailCheck,
  TrendingUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface EarlyAccessInvite {
  id: string;
  email: string;
  invite_token?: string;
  status: "pending" | "sent" | "opened" | "clicked" | "claimed" | "delivered" | "bounced" | "expired";
  raw_status?: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  claimed_at: string | null;
  bounced_at: string | null;
  bounce_type: string | null;
  expires_at: string;
  created_at: string;
  send_count?: number;
  user?: {
    id: string;
    full_name: string;
    role: string;
    signed_up_at: string;
  } | null;
  subscription?: {
    status: string;
    plan_name: string;
    trial_end: string;
  } | null;
}

interface Stats {
  total: number;
  pending: number;
  sent: number;
  delivered: number;
  bounced: number;
  opened: number;
  clicked: number;
  claimed: number;
  expired: number;
  unopened_sent: number;
  failed_sends: number;
  rates: {
    open_rate: string;
    click_rate: string;
    signup_rate: string;
  };
}

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const [showUpload, setShowUpload] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [selectedInvite, setSelectedInvite] = useState<EarlyAccessInvite | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [confirmResendUnopened, setConfirmResendUnopened] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [resendProgress, setResendProgress] = useState<{ sent: number; total: number; isRunning: boolean } | null>(null);

  // Fetch stats
  const { data: stats, refetch: refetchStats } = useQuery<Stats>({
    queryKey: ["admin-early-access-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "stats" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data?.stats || { total: 0, pending: 0, sent: 0, claimed: 0, expired: 0, failed_sends: 0 };
    },
  });

  // Fetch invites with full tracking data
  const { data: invites, isLoading, refetch } = useQuery<EarlyAccessInvite[]>({
    queryKey: ["admin-early-access-invites"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "detailed_list" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data?.invites || [];
    },
  });

  // Bulk create mutation - creates invites AND sends them immediately
  const bulkCreateMutation = useMutation({
    mutationFn: async (emails: string[]) => {
      // First create the invites
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "bulk_create", emails },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Immediately send all pending invites
      const { data: sendData, error: sendError } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "send_all_pending" },
      });
      if (sendError) console.error("Failed to auto-send:", sendError);

      return {
        ...data,
        sent: sendData?.sent || 0,
        sendErrors: sendData?.errors || []
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-stats"] });
      setShowUpload(false);
      setEmailInput("");
      toast({
        title: "Invites created & sent",
        description: `Created ${data.created} invites, sent ${data.sent} emails${data.skipped > 0 ? `, ${data.skipped} skipped (already exist)` : ""}`,
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Send single invite mutation
  const sendInviteMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "send_invite", inviteId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-stats"] });
      setSelectedInvite(null);
      toast({ title: "Invite sent", description: `Email sent to ${data.email}` });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Send all pending mutation
  const sendAllMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "send_all_pending" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-stats"] });
      setConfirmSendAll(false);
      toast({
        title: "Invites sent",
        description: `Sent ${data.sent} emails${data.errors?.length > 0 ? `, ${data.errors.length} failed` : ""}`,
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Resend mutation
  const resendMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "resend", inviteId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      toast({ title: "Invite resent", description: `Email sent to ${data.email}` });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "delete", inviteId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-stats"] });
      setDeleteId(null);
      setSelectedInvite(null);
      toast({ title: "Invite deleted" });
    },
  });

  // Retry failed sends - with batch auto-continue
  const [retryProgress, setRetryProgress] = useState<{ sent: number; total: number; isRunning: boolean } | null>(null);

  const retryFailedMutation = useMutation({
    mutationFn: async () => {
      let totalSent = 0;
      let totalAttempted = 0;
      let allErrors: string[] = [];
      let complete = false;
      let totalFailedCount = 0;

      while (!complete) {
        const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
          body: { action: "retry_failed" },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        totalAttempted += data.attempted || 0;
        totalFailedCount = data.total_failed || totalFailedCount;
        complete = data.complete === true;

        if (data.errors) {
          allErrors = [...allErrors, ...data.errors];
        }

        setRetryProgress({
          sent: totalSent,
          total: totalFailedCount,
          isRunning: !complete,
        });

        if (!complete) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      return {
        sent: totalSent,
        attempted: totalAttempted,
        total_failed: totalFailedCount,
        errors: allErrors.length > 0 ? allErrors : undefined,
        complete: true,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-stats"] });
      setRetryProgress(null);
      toast({
        title: "Failed sends retried!",
        description: `Successfully sent ${data.sent} emails${data.errors?.length ? `, ${data.errors.length} still failed` : ""}`,
      });
    },
    onError: (error: any) => {
      setRetryProgress(null);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Resend all unopened - with batch auto-continue
  const resendUnopenedMutation = useMutation({
    mutationFn: async () => {
      let totalSent = 0;
      let totalAttempted = 0;
      let allErrors: string[] = [];
      let complete = false;
      let totalUnopenedCount = 0;

      // Keep calling until complete
      while (!complete) {
        const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
          body: { action: "resend_all_unopened" },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        totalAttempted += data.attempted || 0;
        totalUnopenedCount = data.total_unopened || totalUnopenedCount;
        complete = data.complete === true;

        if (data.errors) {
          allErrors = [...allErrors, ...data.errors];
        }

        // Update progress
        setResendProgress({
          sent: totalSent,
          total: totalUnopenedCount,
          isRunning: !complete,
        });

        // Small delay between batches to avoid rate limiting
        if (!complete) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      return {
        sent: totalSent,
        attempted: totalAttempted,
        total_unopened: totalUnopenedCount,
        errors: allErrors.length > 0 ? allErrors : undefined,
        complete: true,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-early-access-stats"] });
      setConfirmResendUnopened(false);
      setResendProgress(null);
      toast({
        title: "All reminder emails sent!",
        description: `Successfully sent ${data.sent} emails${data.errors?.length ? `, ${data.errors.length} failed` : ""}`,
      });
    },
    onError: (error: any) => {
      setResendProgress(null);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleBulkUpload = () => {
    const emails = emailInput
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter((e) => e && e.includes("@"));

    if (emails.length === 0) {
      toast({ title: "No valid emails", description: "Please enter valid email addresses", variant: "destructive" });
      return;
    }

    bulkCreateMutation.mutate(emails);
  };

  const copyInviteLink = (token: string) => {
    const url = `${window.location.origin}/auth/signup?ref=early-access&token=${token}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link copied" });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { class: string; icon: any; label?: string }> = {
      pending: { class: "bg-amber-500/20 text-amber-400", icon: Clock },
      sent: { class: "bg-blue-500/20 text-blue-400", icon: Mail },
      delivered: { class: "bg-sky-500/20 text-sky-400", icon: MailCheck },
      opened: { class: "bg-purple-500/20 text-purple-400", icon: Eye },
      clicked: { class: "bg-indigo-500/20 text-indigo-400", icon: MousePointerClick },
      claimed: { class: "bg-green-500/20 text-green-400", icon: UserCheck, label: "signed up" },
      bounced: { class: "bg-red-500/20 text-red-400", icon: XCircle },
      expired: { class: "bg-red-500/20 text-red-400", icon: AlertTriangle },
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return (
      <Badge className={style.class}>
        <Icon className="h-3 w-3 mr-1" />
        {style.label || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-400" />
            Early Access
          </h2>
          <p className="text-xs text-muted-foreground">Send 7-day free trial invites to email subscribers</p>
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation" onClick={() => { refetch(); refetchStats(); }}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats - Main Funnel */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.sent || 0}</p>
            <p className="text-xs text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.opened || 0}</p>
            <p className="text-xs text-muted-foreground">Opened</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.clicked || 0}</p>
            <p className="text-xs text-muted-foreground">Clicked</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.claimed || 0}</p>
            <p className="text-xs text-muted-foreground">Signed Up</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Rates */}
      {stats?.rates && (
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-amber-500/5 border-elec-yellow/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm font-medium">Conversion</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span><span className="text-purple-400 font-semibold">{stats.rates.open_rate}</span> open</span>
                <span><span className="text-indigo-400 font-semibold">{stats.rates.click_rate}</span> click</span>
                <span><span className="text-green-400 font-semibold">{stats.rates.signup_rate}</span> signup</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Secondary Stats */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="border-amber-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-amber-400">{stats?.unopened_sent || 0}</p>
            <p className="text-[10px] text-muted-foreground">Unopened</p>
          </CardContent>
        </Card>
        <Card className="border-orange-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-orange-400">{stats?.failed_sends || 0}</p>
            <p className="text-[10px] text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card className="border-red-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-red-400">{stats?.bounced || 0}</p>
            <p className="text-[10px] text-muted-foreground">Bounced</p>
          </CardContent>
        </Card>
        <Card className="border-muted">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold">{stats?.total || 0}</p>
            <p className="text-[10px] text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          className="flex-1 h-11 gap-2 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white touch-manipulation"
          onClick={() => setShowUpload(true)}
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
        {(stats?.pending || 0) > 0 && (
          <Button
            variant="outline"
            className="flex-1 h-11 gap-2 touch-manipulation"
            onClick={() => setConfirmSendAll(true)}
          >
            <Send className="h-4 w-4" />
            Send ({stats?.pending || 0})
          </Button>
        )}
        {(stats?.failed_sends || 0) > 0 && (
          <Button
            variant="outline"
            className="flex-1 h-11 gap-2 touch-manipulation border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
            onClick={() => retryFailedMutation.mutate()}
            disabled={retryFailedMutation.isPending}
          >
            {retryFailedMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {retryProgress ? `${retryProgress.sent}/${retryProgress.total}` : "Starting..."}
              </>
            ) : (
              <>
                <RotateCw className="h-4 w-4" />
                Retry Failed ({stats?.failed_sends || 0})
              </>
            )}
          </Button>
        )}
      </div>

      {/* Invites List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-12 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : invites?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={Rocket}
              title="No early access invites yet"
              description="Upload subscriber emails to get started"
              action={{
                label: "Upload Emails",
                onClick: () => setShowUpload(true),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {invites?.map((invite) => (
            <Card
              key={invite.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedInvite(invite)}
            >
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{invite.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {invite.sent_at
                        ? `Sent ${formatDistanceToNow(new Date(invite.sent_at), { addSuffix: true })}`
                        : `Created ${formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {getStatusBadge(invite.status)}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Sheet */}
      <Sheet open={showUpload} onOpenChange={setShowUpload}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-400" />
                Upload Subscriber Emails
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Paste email addresses below, one per line or separated by commas.
                These subscribers will receive a 7-day free trial invitation.
              </p>
              <Textarea
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="john@example.com&#10;jane@example.com&#10;..."
                className="min-h-[200px] font-mono text-sm touch-manipulation"
              />
              <p className="text-xs text-muted-foreground">
                {emailInput.split(/[\n,;]+/).filter((e) => e.trim() && e.includes("@")).length} valid emails detected
              </p>
            </div>
            <SheetFooter className="p-4 border-t border-border">
              <Button
                className="w-full h-12 touch-manipulation gap-2"
                onClick={handleBulkUpload}
                disabled={bulkCreateMutation.isPending}
              >
                {bulkCreateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating & Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Create & Send Invites
                  </>
                )}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Invite Detail Sheet */}
      <Sheet open={!!selectedInvite} onOpenChange={() => setSelectedInvite(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle>{selectedInvite?.email}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status & Tracking */}
              <Card>
                <CardContent className="pt-4 pb-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {selectedInvite && getStatusBadge(selectedInvite.status)}
                  </div>
                  {selectedInvite?.send_count && selectedInvite.send_count > 1 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Times Sent</span>
                      <span className="text-sm font-medium">{selectedInvite.send_count}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-elec-yellow" />
                    Tracking Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-3 w-3" /> Sent
                    </span>
                    <span className="text-sm">
                      {selectedInvite?.sent_at
                        ? formatDistanceToNow(new Date(selectedInvite.sent_at), { addSuffix: true })
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <MailCheck className="h-3 w-3" /> Delivered
                    </span>
                    <span className="text-sm">
                      {selectedInvite?.delivered_at
                        ? formatDistanceToNow(new Date(selectedInvite.delivered_at), { addSuffix: true })
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Eye className="h-3 w-3" /> Opened
                    </span>
                    <span className="text-sm">
                      {selectedInvite?.opened_at
                        ? <span className="text-purple-400">{formatDistanceToNow(new Date(selectedInvite.opened_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <MousePointerClick className="h-3 w-3" /> Clicked
                    </span>
                    <span className="text-sm">
                      {selectedInvite?.clicked_at
                        ? <span className="text-indigo-400">{formatDistanceToNow(new Date(selectedInvite.clicked_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <UserCheck className="h-3 w-3" /> Signed Up
                    </span>
                    <span className="text-sm">
                      {selectedInvite?.claimed_at
                        ? <span className="text-green-400">{formatDistanceToNow(new Date(selectedInvite.claimed_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  {selectedInvite?.bounced_at && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-400 flex items-center gap-2">
                        <XCircle className="h-3 w-3" /> Bounced ({selectedInvite.bounce_type})
                      </span>
                      <span className="text-sm text-red-400">
                        {formatDistanceToNow(new Date(selectedInvite.bounced_at), { addSuffix: true })}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* User Info (if signed up) */}
              {selectedInvite?.user && (
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-green-400">
                      <UserCheck className="h-4 w-4" />
                      User Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name</span>
                      <span className="text-sm font-medium">{selectedInvite.user.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Role</span>
                      <span className="text-sm">{selectedInvite.user.role}</span>
                    </div>
                    {selectedInvite.subscription && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Subscription</span>
                        <Badge className={
                          selectedInvite.subscription.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          selectedInvite.subscription.status === 'trialing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-muted text-muted-foreground'
                        }>
                          {selectedInvite.subscription.status}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Invite Link */}
              {selectedInvite?.invite_token && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Invite Link</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="text-xs bg-muted px-2 py-1 rounded block truncate mb-2">
                      {`${window.location.origin}/auth/signup?ref=early-access&token=${selectedInvite.invite_token}`}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-11 gap-2 touch-manipulation"
                      onClick={() => selectedInvite.invite_token && copyInviteLink(selectedInvite.invite_token)}
                    >
                      <Copy className="h-4 w-4" /> Copy Link
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions */}
            <SheetFooter className="p-4 border-t border-border space-y-2">
              {(selectedInvite?.raw_status === "pending" || selectedInvite?.status === "pending") && (
                <Button
                  className="w-full h-11 gap-2 touch-manipulation"
                  onClick={() => sendInviteMutation.mutate(selectedInvite.id)}
                  disabled={sendInviteMutation.isPending}
                >
                  <Send className="h-4 w-4" />
                  {sendInviteMutation.isPending ? "Sending..." : "Send Invite Email"}
                </Button>
              )}
              {selectedInvite?.raw_status === "sent" && !selectedInvite?.claimed_at && (
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 touch-manipulation"
                  onClick={() => resendMutation.mutate(selectedInvite.id)}
                  disabled={resendMutation.isPending}
                >
                  <RotateCw className="h-4 w-4" />
                  {resendMutation.isPending ? "Sending..." : "Resend Email"}
                </Button>
              )}
              {!selectedInvite?.claimed_at && (
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 touch-manipulation text-red-400 hover:bg-red-500/10"
                  onClick={() => setDeleteId(selectedInvite?.id || null)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Invite
                </Button>
              )}
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Send All Confirmation */}
      <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send All Pending Invites?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send {stats?.pending || 0} emails to subscribers who haven't received their invite yet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={sendAllMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation"
              onClick={() => sendAllMutation.mutate()}
              disabled={sendAllMutation.isPending}
            >
              {sendAllMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send All"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invite?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Resend Unopened Confirmation */}
      <AlertDialog open={confirmResendUnopened} onOpenChange={(open) => {
        // Don't allow closing while sending
        if (!resendUnopenedMutation.isPending) {
          setConfirmResendUnopened(open);
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {resendProgress?.isRunning ? "Sending Reminder Emails..." : "Resend to Unopened Recipients?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {resendProgress?.isRunning ? (
                <div className="space-y-3">
                  <p>Sending emails in batches of 50 to avoid timeouts...</p>
                  <div className="bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full transition-all duration-300"
                      style={{
                        width: `${resendProgress.total > 0 ? (resendProgress.sent / resendProgress.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-center font-medium text-amber-400">
                    {resendProgress.sent} / {resendProgress.total} sent
                  </p>
                </div>
              ) : (
                <>
                  This will send reminder emails to {stats?.unopened_sent || 0} people who received the invite but haven't opened it yet.
                  The subject will be "Reminder: Your Early Access is Waiting!"
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {!resendProgress?.isRunning && (
              <AlertDialogCancel className="h-11 touch-manipulation" disabled={resendUnopenedMutation.isPending}>
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              className="h-11 touch-manipulation bg-amber-500 hover:bg-amber-600 text-black"
              onClick={(e) => {
                if (resendUnopenedMutation.isPending) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                resendUnopenedMutation.mutate();
              }}
              disabled={resendUnopenedMutation.isPending}
            >
              {resendUnopenedMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {resendProgress ? `Sending batch...` : "Starting..."}
                </>
              ) : (
                <>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Resend All
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
