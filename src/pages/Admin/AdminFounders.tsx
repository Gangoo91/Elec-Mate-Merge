import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  Crown,
  Upload,
  Send,
  RefreshCw,
  Mail,
  Check,
  Clock,
  AlertTriangle,
  ChevronRight,
  Copy,
  Trash2,
  RotateCw,
  Loader2,
  Users,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface FounderInvite {
  id: string;
  email: string;
  invite_token: string;
  status: "pending" | "sent" | "claimed" | "expired";
  sent_at: string | null;
  claimed_at: string | null;
  expires_at: string;
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  sent: number;
  claimed: number;
  expired: number;
}

export default function AdminFounders() {
  const queryClient = useQueryClient();
  const [showUpload, setShowUpload] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [selectedInvite, setSelectedInvite] = useState<FounderInvite | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmSendTrial, setConfirmSendTrial] = useState(false);
  const [confirmSendChurned, setConfirmSendChurned] = useState(false);
  const [confirmResendUnclaimed, setConfirmResendUnclaimed] = useState(false);

  // Fetch stats - live updates every 30 seconds
  const { data: stats } = useQuery<Stats>({
    queryKey: ["admin-founder-stats"],
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "stats" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data?.stats || { total: 0, pending: 0, sent: 0, claimed: 0, expired: 0 };
    },
  });

  // Fetch invites - live updates every 30 seconds
  const { data: invites, isLoading, refetch } = useQuery<FounderInvite[]>({
    queryKey: ["admin-founder-invites"],
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "list" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data?.invites || [];
    },
  });

  // Fetch cohort stats (trial and churned counts)
  const { data: cohortStats } = useQuery<{ trial: number; churned: number }>({
    queryKey: ["admin-cohort-stats"],
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "get_cohort_stats" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return { trial: data?.trial || 0, churned: data?.churned || 0 };
    },
  });

  // Bulk create mutation - creates invites AND sends them immediately
  const bulkCreateMutation = useMutation({
    mutationFn: async (emails: string[]) => {
      // First create the invites
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "bulk_create", emails },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Immediately send all pending invites
      const { data: sendData, error: sendError } = await supabase.functions.invoke("send-founder-invite", {
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
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
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
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "send_invite", inviteId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
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
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "send_all_pending" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
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
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "resend", inviteId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      toast({ title: "Invite resent", description: `Email sent to ${data.email}` });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "delete", inviteId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
      setDeleteId(null);
      setSelectedInvite(null);
      toast({ title: "Invite deleted" });
    },
  });

  // Send to trial users mutation
  const sendTrialMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "send_to_cohort", cohort: "trial" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-cohort-stats"] });
      setConfirmSendTrial(false);
      toast({
        title: "Founder offers sent!",
        description: `Sent to ${data.sent} trial users${data.skipped > 0 ? ` (${data.skipped} already had invites)` : ""}`,
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Send to churned users mutation
  const sendChurnedMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "send_to_cohort", cohort: "churned" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-cohort-stats"] });
      setConfirmSendChurned(false);
      toast({
        title: "Founder offers sent!",
        description: `Sent to ${data.sent} churned users${data.skipped > 0 ? ` (${data.skipped} already had invites)` : ""}`,
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Resend to all unclaimed invites mutation
  const resendUnclaimedMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "resend_all_unclaimed" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
      setConfirmResendUnclaimed(false);
      toast({
        title: "Reminder emails sent!",
        description: `Resent to ${data.sent} users who haven't claimed their invite yet`,
      });
    },
    onError: (error: any) => {
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
    const url = `${window.location.origin}/founder/claim?token=${token}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link copied" });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { class: string; icon: any }> = {
      pending: { class: "bg-amber-500/20 text-amber-400", icon: Clock },
      sent: { class: "bg-blue-500/20 text-blue-400", icon: Mail },
      claimed: { class: "bg-green-500/20 text-green-400", icon: Check },
      expired: { class: "bg-red-500/20 text-red-400", icon: AlertTriangle },
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return (
      <Badge className={style.class}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-400" />
            Founder Invites
          </h2>
          <p className="text-xs text-muted-foreground">Manage £3.99/month founder subscriptions</p>
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.total || 0}</p>
            <p className="text-xs sm:text-[10px] text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.pending || 0}</p>
            <p className="text-xs sm:text-[10px] text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.sent || 0}</p>
            <p className="text-xs sm:text-[10px] text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-3 pb-3 text-center">
            <p className="text-xl font-bold">{stats?.claimed || 0}</p>
            <p className="text-xs sm:text-[10px] text-muted-foreground">Claimed</p>
          </CardContent>
        </Card>
      </div>

      {/* Resend to Unclaimed Section */}
      {(stats?.sent || 0) > 0 && (
        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <RotateCw className="h-4 w-4 text-yellow-400" />
              Resend to Non-Responders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
              <p className="text-3xl font-bold text-yellow-400">{stats?.sent || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Sent but not yet claimed
              </p>
              <Button
                className="w-full mt-3 h-11 gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black touch-manipulation"
                onClick={() => setConfirmResendUnclaimed(true)}
                disabled={resendUnclaimedMutation.isPending || (stats?.sent || 0) === 0}
              >
                <Mail className="h-4 w-4" />
                Resend Founder Offer to All
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Sends a reminder email with subject "Your £3.99/month Founder Rate is Still Waiting!"
            </p>
          </CardContent>
        </Card>
      )}

      {/* Convert Trials Section */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-orange-400" />
            Convert Trial Users to Founders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* In Trial */}
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
              <p className="text-2xl font-bold text-orange-400">{cohortStats?.trial || 0}</p>
              <p className="text-[11px] text-muted-foreground">In 7-Day Trial</p>
              <Button
                size="sm"
                className="w-full mt-2 h-9 text-xs gap-1 bg-orange-500 hover:bg-orange-600 touch-manipulation"
                onClick={() => setConfirmSendTrial(true)}
                disabled={sendTrialMutation.isPending || (cohortStats?.trial || 0) === 0}
              >
                <Mail className="h-3 w-3" />
                Send Founder Offer
              </Button>
            </div>

            {/* Churned */}
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-2xl font-bold text-red-400">{cohortStats?.churned || 0}</p>
              <p className="text-[11px] text-muted-foreground">Churned</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-2 h-9 text-xs gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation"
                onClick={() => setConfirmSendChurned(true)}
                disabled={sendChurnedMutation.isPending || (cohortStats?.churned || 0) === 0}
              >
                <Mail className="h-3 w-3" />
                Send Founder Offer
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            Users who already received a founder invite won't get duplicates
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          className="flex-1 h-11 gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black touch-manipulation"
          onClick={() => setShowUpload(true)}
        >
          <Upload className="h-4 w-4" />
          Upload Emails
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-11 gap-2 touch-manipulation"
          onClick={() => setConfirmSendAll(true)}
          disabled={(stats?.pending || 0) === 0}
        >
          <Send className="h-4 w-4" />
          Send All ({stats?.pending || 0})
        </Button>
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
              icon={Crown}
              title="No founder invites yet"
              description="Upload founder emails to get started"
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
              <CardContent className="pt-3 pb-3 px-3 sm:px-6">
                <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium line-clamp-1 sm:truncate break-all">{invite.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {invite.sent_at
                        ? `Sent ${formatDistanceToNow(new Date(invite.sent_at), { addSuffix: true })}`
                        : `Created ${formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {getStatusBadge(invite.status)}
                    <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
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
                <Upload className="h-5 w-5 text-yellow-400" />
                Upload Founder Emails
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Paste email addresses below, one per line or separated by commas.
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
              <Card>
                <CardContent className="pt-4 pb-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {selectedInvite && getStatusBadge(selectedInvite.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm">
                      {selectedInvite?.created_at && formatDistanceToNow(new Date(selectedInvite.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  {selectedInvite?.sent_at && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sent</span>
                      <span className="text-sm">{formatDistanceToNow(new Date(selectedInvite.sent_at), { addSuffix: true })}</span>
                    </div>
                  )}
                  {selectedInvite?.claimed_at && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Claimed</span>
                      <span className="text-sm">{formatDistanceToNow(new Date(selectedInvite.claimed_at), { addSuffix: true })}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expires</span>
                    <span className="text-sm">
                      {selectedInvite?.expires_at && formatDistanceToNow(new Date(selectedInvite.expires_at), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Invite Link */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Invite Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-xs bg-muted px-2 py-1 rounded block truncate mb-2">
                    {selectedInvite && `${window.location.origin}/founder/claim?token=${selectedInvite.invite_token}`}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-11 gap-2 touch-manipulation"
                    onClick={() => selectedInvite && copyInviteLink(selectedInvite.invite_token)}
                  >
                    <Copy className="h-4 w-4" /> Copy Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <SheetFooter className="p-4 border-t border-border space-y-2">
              {selectedInvite?.status === "pending" && (
                <Button
                  className="w-full h-11 gap-2 touch-manipulation"
                  onClick={() => sendInviteMutation.mutate(selectedInvite.id)}
                  disabled={sendInviteMutation.isPending}
                >
                  <Send className="h-4 w-4" />
                  {sendInviteMutation.isPending ? "Sending..." : "Send Invite Email"}
                </Button>
              )}
              {selectedInvite?.status === "sent" && (
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
              {selectedInvite?.status !== "claimed" && (
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
              This will send {stats?.pending || 0} emails to founders who haven't received their invite yet.
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

      {/* Send to Trial Users Confirmation */}
      <AlertDialog open={confirmSendTrial} onOpenChange={setConfirmSendTrial}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Founder Offer to Trial Users?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send the £3.99/month founder offer to {cohortStats?.trial || 0} users currently in their 7-day trial.
              Users who already have a founder invite will be skipped.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={sendTrialMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-orange-500 hover:bg-orange-600"
              onClick={() => sendTrialMutation.mutate()}
              disabled={sendTrialMutation.isPending}
            >
              {sendTrialMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Founder Offers"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send to Churned Users Confirmation */}
      <AlertDialog open={confirmSendChurned} onOpenChange={setConfirmSendChurned}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Founder Offer to Churned Users?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a win-back £3.99/month founder offer to {cohortStats?.churned || 0} users whose trial has expired.
              Users who already have a founder invite will be skipped.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={sendChurnedMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => sendChurnedMutation.mutate()}
              disabled={sendChurnedMutation.isPending}
            >
              {sendChurnedMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Founder Offers"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Resend to Unclaimed Confirmation */}
      <AlertDialog open={confirmResendUnclaimed} onOpenChange={setConfirmResendUnclaimed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resend to {stats?.sent || 0} Non-Responders?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a reminder email to everyone who received a founder invite but hasn't claimed it yet.
              They'll get an email with subject "Your £3.99/month Founder Rate is Still Waiting!"
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={resendUnclaimedMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black"
              onClick={() => resendUnclaimedMutation.mutate()}
              disabled={resendUnclaimedMutation.isPending}
            >
              {resendUnclaimedMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend to All"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
