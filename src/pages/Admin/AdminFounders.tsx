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
  MailCheck,
  Eye,
  MousePointerClick,
  XCircle,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Megaphone,
  Rocket,
  PenLine,
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
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  bounced_at: string | null;
  bounce_type: string | null;
  send_count: number | null;
}

interface Stats {
  total: number;
  pending: number;
  sent: number;
  claimed: number;
  expired: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
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
  const [resendResults, setResendResults] = useState<{ sent: number; failed: number; remaining: number; total: number; sentEmails?: string[]; errors?: string[] } | null>(null);
  const [showCampaignComposer, setShowCampaignComposer] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState("🚀 We Launch Tomorrow - Last Chance for £3.99/month!");
  const [campaignMessage, setCampaignMessage] = useState(`Hey there,

We're launching Elec-Mate tomorrow and this is your LAST CHANCE to lock in the founder rate of £3.99/month - forever.

After tomorrow, the price goes up to £9.99/month. You were one of the first people we invited, and we'd hate for you to miss out.

Click the button below to claim your founder subscription before it's too late.`);
  const [campaignResults, setCampaignResults] = useState<{ sent: number; failed: number; total: number; errors?: string[] } | null>(null);

  // Fetch stats
  const { data: stats, refetch: refetchStats } = useQuery<Stats & { needsReminder: number; recentlyResent: number }>({
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
      return data?.stats || { total: 0, pending: 0, sent: 0, claimed: 0, expired: 0, needsReminder: 0, recentlyResent: 0 };
    },
  });

  // Fetch invites
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

  // Fetch cohort stats
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

  // Fetch live Stripe stats for founders
  const { data: stripeStats } = useQuery({
    queryKey: ["admin-stripe-founder-stats"],
    refetchInterval: 60000,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-stripe-stats");
      if (error) throw error;
      return data;
    },
  });

  // Mutations
  const bulkCreateMutation = useMutation({
    mutationFn: async (emails: string[]) => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "bulk_create", emails },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const { data: sendData, error: sendError } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "send_all_pending" },
      });
      if (sendError) console.error("Failed to auto-send:", sendError);

      return { ...data, sent: sendData?.sent || 0, sendErrors: sendData?.errors || [] };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
      setShowUpload(false);
      setEmailInput("");
      toast({
        title: "Invites created & sent",
        description: `Created ${data.created} invites, sent ${data.sent} emails${data.skipped > 0 ? `, ${data.skipped} skipped` : ""}`,
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

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
      setResendResults(data);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const sendCampaignMutation = useMutation({
    mutationFn: async ({ subject, message }: { subject: string; message: string }) => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "send_custom_campaign", subject, message },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      queryClient.invalidateQueries({ queryKey: ["admin-founder-stats"] });
      setShowCampaignComposer(false);
      setCampaignResults(data);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const sendTestEmailMutation = useMutation({
    mutationFn: async ({ subject, message, testEmail }: { subject: string; message: string; testEmail: string }) => {
      const { data, error } = await supabase.functions.invoke("send-founder-invite", {
        body: { action: "test_custom_campaign", subject, message, emails: [testEmail] },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-founder-invites"] });
      toast({
        title: "Test email sent!",
        description: `Check ${data.email} inbox`,
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

  const handleRefresh = () => {
    refetch();
    refetchStats();
  };

  // Calculate conversion rate (claimed out of total sent)
  const totalSent = (stats?.sent || 0) + (stats?.claimed || 0);  // Total invites that were sent (both claimed and unclaimed)
  const conversionRate = totalSent > 0
    ? Math.round(((stats?.claimed || 0) / totalSent) * 100)
    : 0;

  // Awaiting signup = invites with status "sent" (they got the invite but haven't signed up)
  // NOTE: stats.sent already means "sent but not claimed" - don't subtract claimed again!
  const awaitingSignup = stats?.sent || 0;

  // Get actual paying founders from Stripe
  const paidFounders = stripeStats?.stripe?.tierCounts?.founder || 0;

  return (
    <div className="space-y-4 pb-20">
      {/* Hero Card - Founder Campaign Stats */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="relative pt-6 pb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Crown className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-orange-100 text-sm font-medium">Founder Campaign</p>
                <p className="text-4xl font-bold text-white tracking-tight">£3.99<span className="text-lg font-normal text-orange-100">/mo</span></p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-white/15 hover:bg-white/25 text-white touch-manipulation backdrop-blur-sm"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>

          {/* Conversion Funnel */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Send className="h-3.5 w-3.5 text-white/80" />
                <span className="text-lg font-bold text-white">{totalSent}</span>
              </div>
              <p className="text-[9px] text-orange-100 uppercase tracking-wide font-medium">Sent</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Clock className="h-3.5 w-3.5 text-amber-200" />
                <span className="text-lg font-bold text-white">{awaitingSignup}</span>
              </div>
              <p className="text-[9px] text-orange-100 uppercase tracking-wide font-medium">Waiting</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-lg font-bold text-white">{stats?.claimed || 0}</span>
              </div>
              <p className="text-[9px] text-orange-100 uppercase tracking-wide font-medium">Claimed</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Sparkles className="h-3.5 w-3.5 text-green-300" />
                <span className="text-lg font-bold text-white">{paidFounders}</span>
              </div>
              <p className="text-[9px] text-orange-100 uppercase tracking-wide font-medium">Paying</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metric Card */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-400">{conversionRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Conversion Rate</p>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-600/5">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-2">
              <Target className="h-6 w-6 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-amber-400">{awaitingSignup}</p>
            <p className="text-xs text-muted-foreground mt-1">Need to Sign Up</p>
          </CardContent>
        </Card>
      </div>

      {/* Email Engagement Stats */}
      {(stats?.sent || 0) > 0 && (
        <Card className="border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 font-semibold">
              <Mail className="h-4 w-4 text-blue-400" />
              Email Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 rounded-xl bg-emerald-500/10">
                <MailCheck className="h-4 w-4 mx-auto mb-1 text-emerald-400" />
                <p className="text-lg font-bold text-emerald-400">{stats?.delivered || 0}</p>
                <p className="text-[9px] text-muted-foreground">Delivered</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-purple-500/10">
                <Eye className="h-4 w-4 mx-auto mb-1 text-purple-400" />
                <p className="text-lg font-bold text-purple-400">{stats?.opened || 0}</p>
                <p className="text-[9px] text-muted-foreground">Opened</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-cyan-500/10">
                <MousePointerClick className="h-4 w-4 mx-auto mb-1 text-cyan-400" />
                <p className="text-lg font-bold text-cyan-400">{stats?.clicked || 0}</p>
                <p className="text-[9px] text-muted-foreground">Clicked</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-red-500/10">
                <XCircle className="h-4 w-4 mx-auto mb-1 text-red-400" />
                <p className="text-lg font-bold text-red-400">{stats?.bounced || 0}</p>
                <p className="text-[9px] text-muted-foreground">Bounced</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Chance Campaign Card */}
      {awaitingSignup > 0 && (
        <Card className="border-red-500/40 bg-gradient-to-r from-red-500/15 via-rose-500/10 to-orange-500/10">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/30 to-rose-500/30 flex items-center justify-center shrink-0 shadow-lg">
                <Megaphone className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-rose-400" />
                  Launch Campaign
                </h3>
                <p className="text-sm text-muted-foreground">{awaitingSignup} people waiting to sign up</p>
              </div>
            </div>
            <Button
              className="w-full h-12 gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold touch-manipulation rounded-xl shadow-lg shadow-red-500/25"
              onClick={() => setShowCampaignComposer(true)}
            >
              <PenLine className="h-5 w-5" />
              Compose "Last Chance" Email
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Send Reminders Card */}
      {awaitingSignup > 0 && (
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <RotateCw className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Chase Non-Responders</h3>
                <p className="text-sm text-muted-foreground">{stats?.needsReminder || 0} people haven't signed up yet</p>
              </div>
            </div>
            <Button
              className="w-full h-12 gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold touch-manipulation rounded-xl shadow-lg shadow-amber-500/20"
              onClick={() => setConfirmResendUnclaimed(true)}
              disabled={resendUnclaimedMutation.isPending || (stats?.needsReminder || 0) === 0}
            >
              <Mail className="h-5 w-5" />
              {(stats?.needsReminder || 0) > 0 ? `Send Reminder to ${stats?.needsReminder}` : "All Reminders Sent ✓"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Convert Trial Users */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 font-semibold">
            <Users className="h-4 w-4 text-blue-400" />
            Convert Users to Founders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* In Trial */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-3xl font-bold text-blue-400">{cohortStats?.trial || 0}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">In 7-Day Trial</p>
              <Button
                size="sm"
                className="w-full h-10 text-sm gap-1.5 bg-blue-500 hover:bg-blue-600 touch-manipulation rounded-xl font-semibold"
                onClick={() => setConfirmSendTrial(true)}
                disabled={sendTrialMutation.isPending || (cohortStats?.trial || 0) === 0}
              >
                <Send className="h-4 w-4" />
                Send Offer
              </Button>
            </div>

            {/* Churned */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                </div>
                <span className="text-3xl font-bold text-rose-400">{cohortStats?.churned || 0}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Churned Users</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full h-10 text-sm gap-1.5 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 touch-manipulation rounded-xl font-semibold"
                onClick={() => setConfirmSendChurned(true)}
                disabled={sendChurnedMutation.isPending || (cohortStats?.churned || 0) === 0}
              >
                <Send className="h-4 w-4" />
                Win Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button
          className="flex-1 h-12 gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold touch-manipulation rounded-xl shadow-lg shadow-amber-500/20"
          onClick={() => setShowUpload(true)}
        >
          <Upload className="h-5 w-5" />
          Upload Emails
        </Button>
        {(stats?.pending || 0) > 0 && (
          <Button
            variant="outline"
            className="h-12 px-4 gap-2 touch-manipulation rounded-xl font-semibold border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            onClick={() => setConfirmSendAll(true)}
          >
            <Send className="h-5 w-5" />
            {stats?.pending || 0}
          </Button>
        )}
      </div>

      {/* Invites List */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-1 mb-2">
          <h3 className="text-sm font-semibold text-foreground">All Invites</h3>
          <span className="text-xs text-muted-foreground">{stats?.total || 0} total</span>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-card rounded-2xl p-4">
                <div className="h-12 bg-muted rounded-xl" />
              </div>
            ))}
          </div>
        ) : invites?.length === 0 ? (
          <Card className="border-border/30">
            <CardContent className="pt-8 pb-8">
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
            {invites?.slice(0, 20).map((invite) => (
              <div
                key={invite.id}
                className="group bg-card hover:bg-muted/50 rounded-2xl p-4 border border-border/30 hover:border-amber-500/30 touch-manipulation cursor-pointer active:scale-[0.98] transition-all"
                onClick={() => setSelectedInvite(invite)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    invite.status === "claimed" ? "bg-emerald-500/20" :
                    invite.status === "sent" ? "bg-blue-500/20" :
                    invite.status === "expired" ? "bg-red-500/20" :
                    "bg-amber-500/20"
                  }`}>
                    {invite.status === "claimed" ? <Check className="h-5 w-5 text-emerald-400" /> :
                     invite.status === "sent" ? <Mail className="h-5 w-5 text-blue-400" /> :
                     invite.status === "expired" ? <XCircle className="h-5 w-5 text-red-400" /> :
                     <Clock className="h-5 w-5 text-amber-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{invite.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {invite.sent_at
                        ? `Sent ${formatDistanceToNow(new Date(invite.sent_at), { addSuffix: true })}`
                        : `Created ${formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}`}
                    </p>
                  </div>
                  <Badge className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    invite.status === "claimed" ? "bg-emerald-500/20 text-emerald-400" :
                    invite.status === "sent" ? "bg-blue-500/20 text-blue-400" :
                    invite.status === "expired" ? "bg-red-500/20 text-red-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {invite.status}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
              </div>
            ))}
            {(invites?.length || 0) > 20 && (
              <p className="text-center text-sm text-muted-foreground py-2">
                Showing 20 of {invites?.length} invites
              </p>
            )}
          </div>
        )}
      </div>

      {/* Upload Sheet */}
      <Sheet open={showUpload} onOpenChange={setShowUpload}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-3xl p-0 border-t border-border/50">
          <div className="flex flex-col h-full bg-background">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="px-6 pb-4 border-b border-border/50">
              <SheetTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-amber-400" />
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
                className="min-h-[200px] font-mono text-sm touch-manipulation rounded-xl border-border/50 focus:border-amber-500 focus:ring-amber-500/20"
              />
              <div className="flex items-center justify-between px-1">
                <p className="text-sm text-muted-foreground">
                  {emailInput.split(/[\n,;]+/).filter((e) => e.trim() && e.includes("@")).length} valid emails
                </p>
              </div>
            </div>
            <SheetFooter className="p-4 border-t border-border/50">
              <Button
                className="w-full h-13 touch-manipulation gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg"
                onClick={handleBulkUpload}
                disabled={bulkCreateMutation.isPending}
              >
                {bulkCreateMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating & Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
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
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0 border-t border-border/50">
          <div className="flex flex-col h-full bg-background">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="px-6 pb-4 border-b border-border/50">
              <SheetTitle className="truncate">{selectedInvite?.email}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <Card className="border-0 bg-muted/30">
                <CardContent className="pt-4 pb-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      selectedInvite?.status === "claimed" ? "bg-emerald-500/20 text-emerald-400" :
                      selectedInvite?.status === "sent" ? "bg-blue-500/20 text-blue-400" :
                      selectedInvite?.status === "expired" ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {selectedInvite?.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">
                      {selectedInvite?.created_at && formatDistanceToNow(new Date(selectedInvite.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  {selectedInvite?.sent_at && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sent</span>
                      <span className="text-sm font-medium">{formatDistanceToNow(new Date(selectedInvite.sent_at), { addSuffix: true })}</span>
                    </div>
                  )}
                  {selectedInvite?.claimed_at && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Claimed</span>
                      <span className="text-sm font-medium text-emerald-400">{formatDistanceToNow(new Date(selectedInvite.claimed_at), { addSuffix: true })}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Email Tracking */}
              {selectedInvite?.status !== "pending" && (
                <Card className="border-0 bg-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-blue-400" />
                      Email Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <MailCheck className="h-3.5 w-3.5 text-emerald-400" />
                        Delivered
                      </span>
                      {selectedInvite?.delivered_at ? (
                        <span className="text-sm text-emerald-400 font-medium">✓</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5 text-purple-400" />
                        Opened
                      </span>
                      {selectedInvite?.opened_at ? (
                        <span className="text-sm text-purple-400 font-medium">✓</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <MousePointerClick className="h-3.5 w-3.5 text-cyan-400" />
                        Clicked
                      </span>
                      {selectedInvite?.clicked_at ? (
                        <span className="text-sm text-cyan-400 font-medium">✓</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </div>
                    {selectedInvite?.bounced_at && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <XCircle className="h-3.5 w-3.5 text-red-400" />
                          Bounced
                        </span>
                        <span className="text-sm text-red-400 font-medium">✗</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Invite Link */}
              <Card className="border-0 bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Invite Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-xs bg-background px-3 py-2 rounded-xl block truncate mb-3 border border-border/50">
                    {selectedInvite && `${window.location.origin}/founder/claim?token=${selectedInvite.invite_token}`}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-11 gap-2 touch-manipulation rounded-xl"
                    onClick={() => selectedInvite && copyInviteLink(selectedInvite.invite_token)}
                  >
                    <Copy className="h-4 w-4" /> Copy Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <SheetFooter className="p-4 border-t border-border/50 space-y-2 bg-background">
              {selectedInvite?.status === "pending" && (
                <Button
                  className="w-full h-12 gap-2 touch-manipulation rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-semibold"
                  onClick={() => sendInviteMutation.mutate(selectedInvite.id)}
                  disabled={sendInviteMutation.isPending}
                >
                  <Send className="h-5 w-5" />
                  {sendInviteMutation.isPending ? "Sending..." : "Send Invite"}
                </Button>
              )}
              {selectedInvite?.status === "sent" && (
                <Button
                  variant="outline"
                  className="w-full h-12 gap-2 touch-manipulation rounded-xl border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-semibold"
                  onClick={() => resendMutation.mutate(selectedInvite.id)}
                  disabled={resendMutation.isPending}
                >
                  <RotateCw className="h-5 w-5" />
                  {resendMutation.isPending ? "Sending..." : "Resend Email"}
                </Button>
              )}
              {selectedInvite?.status !== "claimed" && (
                <Button
                  variant="ghost"
                  className="w-full h-11 gap-2 touch-manipulation rounded-xl text-red-400 hover:bg-red-500/10"
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

      {/* Dialogs */}
      <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Send All Pending Invites?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send {stats?.pending || 0} emails to founders who haven't received their invite yet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl" disabled={sendAllMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-gradient-to-r from-amber-500 to-orange-500"
              onClick={() => sendAllMutation.mutate()}
              disabled={sendAllMutation.isPending}
            >
              {sendAllMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {sendAllMutation.isPending ? "Sending..." : "Send All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invite?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl" disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-red-500 hover:bg-red-600"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmSendTrial} onOpenChange={setConfirmSendTrial}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Send Founder Offer to Trial Users?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send the £3.99/month founder offer to {cohortStats?.trial || 0} users currently in their 7-day trial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl" disabled={sendTrialMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-blue-500 hover:bg-blue-600"
              onClick={() => sendTrialMutation.mutate()}
              disabled={sendTrialMutation.isPending}
            >
              {sendTrialMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {sendTrialMutation.isPending ? "Sending..." : "Send Offers"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmSendChurned} onOpenChange={setConfirmSendChurned}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Send Founder Offer to Churned Users?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a win-back £3.99/month founder offer to {cohortStats?.churned || 0} users whose trial has expired.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl" disabled={sendChurnedMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-rose-500 hover:bg-rose-600"
              onClick={() => sendChurnedMutation.mutate()}
              disabled={sendChurnedMutation.isPending}
            >
              {sendChurnedMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {sendChurnedMutation.isPending ? "Sending..." : "Send Offers"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmResendUnclaimed} onOpenChange={setConfirmResendUnclaimed}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Resend to {stats?.needsReminder || 0} Non-Responders?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a reminder email to everyone who received a founder invite but hasn't claimed it yet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl" disabled={resendUnclaimedMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white"
              onClick={() => resendUnclaimedMutation.mutate()}
              disabled={resendUnclaimedMutation.isPending}
            >
              {resendUnclaimedMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {resendUnclaimedMutation.isPending ? "Sending..." : "Resend All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!resendResults} onOpenChange={() => setResendResults(null)}>
        <AlertDialogContent className="max-h-[85vh] overflow-hidden flex flex-col rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {resendResults?.remaining && resendResults.remaining > 0 ? (
                <Clock className="h-5 w-5 text-amber-400" />
              ) : (
                <Check className="h-5 w-5 text-green-400" />
              )}
              {resendResults?.remaining && resendResults.remaining > 0 ? "Batch Complete" : "Resend Complete"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4 py-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-green-500/10 text-center">
                <p className="text-2xl font-bold text-green-400">{resendResults?.sent || 0}</p>
                <p className="text-[10px] text-muted-foreground">Sent</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 text-center">
                <p className="text-2xl font-bold text-red-400">{resendResults?.failed || 0}</p>
                <p className="text-[10px] text-muted-foreground">Failed</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-center">
                <p className="text-2xl font-bold text-amber-400">{resendResults?.remaining || 0}</p>
                <p className="text-[10px] text-muted-foreground">Remaining</p>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            {resendResults?.remaining && resendResults.remaining > 0 ? (
              <>
                <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">Close</AlertDialogCancel>
                <AlertDialogAction
                  className="h-11 touch-manipulation rounded-xl bg-gradient-to-r from-amber-500 to-orange-500"
                  onClick={() => {
                    setResendResults(null);
                    resendUnclaimedMutation.mutate();
                  }}
                >
                  Send Remaining ({resendResults.remaining})
                </AlertDialogAction>
              </>
            ) : (
              <AlertDialogAction className="h-11 touch-manipulation rounded-xl" onClick={() => setResendResults(null)}>
                Done
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Campaign Composer Sheet */}
      <Sheet open={showCampaignComposer} onOpenChange={setShowCampaignComposer}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 border-t border-red-500/30">
          <div className="flex flex-col h-full bg-background">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="px-6 pb-4 border-b border-border/50">
              <SheetTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold">Compose Campaign Email</p>
                  <p className="text-sm font-normal text-muted-foreground">Sending to {awaitingSignup} people</p>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Preview Stats */}
              <Card className="border-border/30 bg-muted/30">
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Recipients:</span>
                    </div>
                    <span className="text-lg font-bold text-red-400">{awaitingSignup}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    People who received an invite but haven't signed up yet
                  </p>
                </CardContent>
              </Card>

              {/* Subject Line */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Subject
                </label>
                <Input
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  placeholder="Enter email subject line..."
                  className="h-12 text-base touch-manipulation rounded-xl border-border/50 focus:border-red-500 focus:ring-red-500/20"
                />
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-muted-foreground" />
                  Message Body
                </label>
                <Textarea
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  placeholder="Write your message..."
                  className="min-h-[200px] text-base touch-manipulation rounded-xl border-border/50 focus:border-red-500 focus:ring-red-500/20 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  The email will include the founder price (£3.99/mo) and a claim button automatically.
                </p>
              </div>

              {/* Email Preview */}
              <Card className="border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 font-semibold">
                    <Eye className="h-4 w-4 text-purple-400" />
                    Email Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 pb-3 border-b border-slate-700">
                      <span className="bg-slate-800 px-2 py-1 rounded">From: founder@elec-mate.com</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-3">{campaignSubject || "Subject..."}</p>
                    <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {campaignMessage || "Your message..."}
                    </div>
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
                      <p className="text-xs text-amber-200 mb-1">Your Founder Price</p>
                      <p className="text-2xl font-bold text-amber-400">£3.99<span className="text-sm text-slate-400">/mo</span></p>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-center py-3 rounded-xl font-semibold text-sm">
                        🔒 Claim Before It's Gone
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <SheetFooter className="p-4 border-t border-border/50 bg-background space-y-2">
              {/* Test Email Button */}
              <Button
                variant="outline"
                className="w-full h-12 gap-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-semibold touch-manipulation rounded-xl"
                onClick={() => sendTestEmailMutation.mutate({ subject: campaignSubject, message: campaignMessage, testEmail: "founder@elec-mate.com" })}
                disabled={sendTestEmailMutation.isPending || !campaignSubject.trim() || !campaignMessage.trim()}
              >
                {sendTestEmailMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending test...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Send Test to founder@elec-mate.com
                  </>
                )}
              </Button>
              {/* Send to All Button */}
              <Button
                className="w-full h-14 gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold touch-manipulation rounded-xl shadow-lg shadow-red-500/25 text-base"
                onClick={() => sendCampaignMutation.mutate({ subject: campaignSubject, message: campaignMessage })}
                disabled={sendCampaignMutation.isPending || !campaignSubject.trim() || !campaignMessage.trim()}
              >
                {sendCampaignMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending to {awaitingSignup} people...
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5" />
                    Send Campaign to {awaitingSignup} People
                  </>
                )}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Campaign Results Dialog */}
      <AlertDialog open={!!campaignResults} onOpenChange={() => setCampaignResults(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                (campaignResults?.failed || 0) > 0
                  ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20"
                  : "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
              }`}>
                {(campaignResults?.failed || 0) > 0 ? (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                ) : (
                  <Check className="h-5 w-5 text-green-400" />
                )}
              </div>
              {(campaignResults?.failed || 0) > 0 ? "Campaign Partially Sent" : "Campaign Sent!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {(campaignResults?.failed || 0) > 0
                ? `${campaignResults?.sent || 0} emails sent, ${campaignResults?.failed || 0} failed (likely rate limited). You can retry the failed ones.`
                : "Your 'Last Chance' campaign has been sent successfully."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-green-500/10 text-center border border-green-500/20">
                <p className="text-3xl font-bold text-green-400">{campaignResults?.sent || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Emails Sent</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 text-center border border-red-500/20">
                <p className="text-3xl font-bold text-red-400">{campaignResults?.failed || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Failed</p>
              </div>
            </div>
            {(campaignResults?.errors?.length || 0) > 0 && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Errors:</p>
                <div className="text-xs text-muted-foreground max-h-32 overflow-y-auto space-y-1">
                  {campaignResults?.errors?.slice(0, 5).map((err, i) => (
                    <p key={i}>{err}</p>
                  ))}
                  {(campaignResults?.errors?.length || 0) > 5 && (
                    <p className="text-muted-foreground">...and {(campaignResults?.errors?.length || 0) - 5} more</p>
                  )}
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Check the Email Engagement stats to track opens and clicks.
            </p>
          </div>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            {(campaignResults?.failed || 0) > 0 && (
              <Button
                variant="outline"
                className="h-11 touch-manipulation rounded-xl border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-semibold"
                onClick={() => {
                  setCampaignResults(null);
                  // Re-open campaign composer to retry
                  setShowCampaignComposer(true);
                }}
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Retry Failed ({campaignResults?.failed || 0})
              </Button>
            )}
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold"
              onClick={() => setCampaignResults(null)}
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
