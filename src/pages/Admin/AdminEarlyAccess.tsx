import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  ChevronRight,
  ChevronDown,
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
  Flame,
  Thermometer,
  Snowflake,
  Users,
  PartyPopper,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface SegmentedLead {
  id: string;
  email: string;
  invite_token?: string;
  status: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  claimed_at: string | null;
  bounced_at: string | null;
  bounce_type: string | null;
  created_at: string;
  send_count?: number;
  launch_email_sent_at?: string | null;
  launch_email_opened_at?: string | null;
  launch_email_clicked_at?: string | null;
  last_activity: {
    type: "signed_up" | "clicked" | "clicked_launch" | "opened" | "opened_launch" | "delivered" | "sent" | "created";
    date: string;
  };
  user?: {
    id: string;
    full_name: string;
    role: string;
    signed_up_at: string;
  } | null;
}

interface SegmentedData {
  segments: {
    signed_up: SegmentedLead[];
    hot: SegmentedLead[];
    warm: SegmentedLead[];
    cold: SegmentedLead[];
    bounced: SegmentedLead[];
  };
  stats: {
    total: number;
    total_unconverted: number;
    signed_up: number;
    bounced: number;
    hot_count: number;
    warm_count: number;
    cold_count: number;
    conversion_rate: string;
  };
}

type SegmentType = "signed_up" | "hot" | "warm" | "cold" | "bounced";

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const [showUpload, setShowUpload] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [selectedLead, setSelectedLead] = useState<SegmentedLead | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmSendSegment, setConfirmSendSegment] = useState<"hot" | "warm" | "cold" | null>(null);

  // Collapsible state for each segment
  const [signedUpOpen, setSignedUpOpen] = useState(true);
  const [hotOpen, setHotOpen] = useState(true);
  const [warmOpen, setWarmOpen] = useState(false);
  const [coldOpen, setColdOpen] = useState(false);
  const [bouncedOpen, setBouncedOpen] = useState(false);

  // Fetch segmented leads
  const { data: segmentedData, isLoading, refetch } = useQuery<SegmentedData>({
    queryKey: ["admin-segmented-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "get_segmented_leads" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  // Bulk create mutation
  const bulkCreateMutation = useMutation({
    mutationFn: async (emails: string[]) => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "bulk_create", emails },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Auto-send pending invites
      const { data: sendData, error: sendError } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "send_all_pending" },
      });
      if (sendError) console.error("Failed to auto-send:", sendError);

      return { ...data, sent: sendData?.sent || 0 };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-segmented-leads"] });
      setShowUpload(false);
      setEmailInput("");
      toast({
        title: "Invites created & sent",
        description: `Created ${data.created} invites, sent ${data.sent} emails`,
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Track batch sending progress
  const [batchProgress, setBatchProgress] = useState<{
    segment: string;
    totalSent: number;
    remaining: number;
  } | null>(null);

  // Send to segment mutation - handles batched sending
  const sendToSegmentMutation = useMutation({
    mutationFn: async (segment: "hot" | "warm" | "cold") => {
      const { data, error } = await supabase.functions.invoke("send-early-access-invite", {
        body: { action: "send_to_segment", segment },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-segmented-leads"] });

      // Update progress tracking
      const newTotalSent = (batchProgress?.totalSent || 0) + data.sent;

      if (data.complete) {
        // All done - close dialog and show success
        setConfirmSendSegment(null);
        setBatchProgress(null);
        toast({
          title: "All emails sent!",
          description: `Successfully sent ${newTotalSent} emails to ${data.segment} leads`,
        });
      } else {
        // More to send - update progress and show toast
        setBatchProgress({
          segment: data.segment,
          totalSent: newTotalSent,
          remaining: data.remaining,
        });
        toast({
          title: `Batch sent (${newTotalSent} so far)`,
          description: `${data.remaining} remaining - click "Send Next Batch" to continue`,
        });
      }
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Resend single invite mutation
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
      queryClient.invalidateQueries({ queryKey: ["admin-segmented-leads"] });
      setSelectedLead(null);
      toast({ title: "Email resent", description: `Sent to ${data.email}` });
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
      queryClient.invalidateQueries({ queryKey: ["admin-segmented-leads"] });
      setDeleteId(null);
      setSelectedLead(null);
      toast({ title: "Lead deleted" });
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

  const getActivityDescription = (activity: SegmentedLead["last_activity"]) => {
    const timeAgo = formatDistanceToNow(new Date(activity.date), { addSuffix: true });
    switch (activity.type) {
      case "signed_up":
        return `signed up ${timeAgo}`;
      case "clicked":
        return `clicked ${timeAgo}`;
      case "clicked_launch":
        return `clicked launch ${timeAgo}`;
      case "opened":
        return `opened ${timeAgo}`;
      case "opened_launch":
        return `opened launch ${timeAgo}`;
      case "delivered":
        return `delivered ${timeAgo}`;
      case "sent":
        return `sent ${timeAgo}`;
      default:
        return `added ${timeAgo}`;
    }
  };

  const getSegmentConfig = (segment: SegmentType) => {
    const configs = {
      signed_up: {
        emoji: "🎉",
        title: "SIGNED UP",
        description: "Converted to users",
        borderClass: "border-green-500/30",
        bgClass: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
        badgeClass: "bg-green-500/20 text-green-400",
        canEmail: false,
      },
      hot: {
        emoji: "🔥",
        title: "HOT LEADS",
        description: "Clicked at least one email",
        borderClass: "border-orange-500/30",
        bgClass: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
        badgeClass: "bg-orange-500/20 text-orange-400",
        canEmail: true,
      },
      warm: {
        emoji: "🟠",
        title: "WARM LEADS",
        description: "Opened but didn't click",
        borderClass: "border-amber-500/30",
        bgClass: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
        badgeClass: "bg-amber-500/20 text-amber-400",
        canEmail: true,
      },
      cold: {
        emoji: "❄️",
        title: "COLD LEADS",
        description: "Never opened any email",
        borderClass: "border-blue-500/30",
        bgClass: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
        badgeClass: "bg-blue-500/20 text-blue-400",
        canEmail: true,
      },
      bounced: {
        emoji: "⚠️",
        title: "BOUNCED",
        description: "Email delivery failed",
        borderClass: "border-red-500/30",
        bgClass: "bg-gradient-to-br from-red-500/10 to-rose-500/10",
        badgeClass: "bg-red-500/20 text-red-400",
        canEmail: false,
      },
    };
    return configs[segment];
  };

  const SegmentCard = ({
    segment,
    leads,
    isOpen,
    onOpenChange,
  }: {
    segment: SegmentType;
    leads: SegmentedLead[];
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
  }) => {
    const config = getSegmentConfig(segment);

    return (
      <Card className={`${config.bgClass} ${config.borderClass}`}>
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer touch-manipulation pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{config.emoji}</span>
                  <div>
                    <CardTitle className="text-sm font-bold tracking-wide flex items-center gap-2">
                      {config.title}
                      <Badge className={config.badgeClass}>{leads.length}</Badge>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{config.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {config.canEmail && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 gap-1.5 touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmSendSegment(segment as "hot" | "warm" | "cold");
                      }}
                      disabled={leads.length === 0}
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Email</span>
                    </Button>
                  )}
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4">
              {leads.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No leads in this segment</p>
              ) : (
                <div className="space-y-1.5">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 cursor-pointer touch-manipulation transition-colors"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{lead.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {lead.user?.full_name ? (
                            <span className="text-green-400">{lead.user.full_name} · </span>
                          ) : null}
                          {getActivityDescription(lead.last_activity)}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  const stats = segmentedData?.stats;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-400" />
            Early Access Leads
          </h2>
          <p className="text-xs text-muted-foreground">
            {stats?.total || 0} total · {stats?.signed_up || 0} signed up ({stats?.conversion_rate || "0%"})
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 touch-manipulation"
          onClick={() => refetch()}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-2">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-green-400">{stats?.signed_up || 0}</p>
            <p className="text-[10px] text-muted-foreground">Signed Up</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-orange-400">{stats?.hot_count || 0}</p>
            <p className="text-[10px] text-muted-foreground">Hot</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-amber-400">{stats?.warm_count || 0}</p>
            <p className="text-[10px] text-muted-foreground">Warm</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-blue-400">{stats?.cold_count || 0}</p>
            <p className="text-[10px] text-muted-foreground">Cold</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/20">
          <CardContent className="pt-2 pb-2 text-center">
            <p className="text-lg font-bold text-red-400">{stats?.bounced || 0}</p>
            <p className="text-[10px] text-muted-foreground">Bounced</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Rate Banner */}
      {stats && (
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-amber-500/5 border-elec-yellow/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm font-medium">Conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  <span className="text-green-400 font-semibold">{stats.signed_up}</span>
                  <span className="text-muted-foreground"> / {stats.total} total</span>
                  <span className="text-muted-foreground ml-2">·</span>
                  <span className="text-elec-yellow font-semibold ml-2">{stats.conversion_rate}</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4">
                <div className="h-16 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !segmentedData || stats?.total === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={Rocket}
              title="No early access leads yet"
              description="Upload subscriber emails to get started"
              action={{
                label: "Upload Emails",
                onClick: () => setShowUpload(true),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        /* Segmented Lead Cards */
        <div className="space-y-3">
          <SegmentCard
            segment="signed_up"
            leads={segmentedData.segments.signed_up}
            isOpen={signedUpOpen}
            onOpenChange={setSignedUpOpen}
          />
          <SegmentCard
            segment="hot"
            leads={segmentedData.segments.hot}
            isOpen={hotOpen}
            onOpenChange={setHotOpen}
          />
          <SegmentCard
            segment="warm"
            leads={segmentedData.segments.warm}
            isOpen={warmOpen}
            onOpenChange={setWarmOpen}
          />
          <SegmentCard
            segment="cold"
            leads={segmentedData.segments.cold}
            isOpen={coldOpen}
            onOpenChange={setColdOpen}
          />
          {segmentedData.segments.bounced.length > 0 && (
            <SegmentCard
              segment="bounced"
              leads={segmentedData.segments.bounced}
              isOpen={bouncedOpen}
              onOpenChange={setBouncedOpen}
            />
          )}
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

      {/* Lead Detail Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle>{selectedLead?.email}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* User Info (if signed up) */}
              {selectedLead?.user && (
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-green-400">
                      <UserCheck className="h-4 w-4" />
                      Signed Up!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name</span>
                      <span className="text-sm font-medium">{selectedLead.user.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Role</span>
                      <span className="text-sm">{selectedLead.user.role}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                      {selectedLead?.sent_at
                        ? formatDistanceToNow(new Date(selectedLead.sent_at), { addSuffix: true })
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <MailCheck className="h-3 w-3" /> Delivered
                    </span>
                    <span className="text-sm">
                      {selectedLead?.delivered_at
                        ? <span className="text-sky-400">{formatDistanceToNow(new Date(selectedLead.delivered_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Eye className="h-3 w-3" /> Opened
                    </span>
                    <span className="text-sm">
                      {selectedLead?.opened_at
                        ? <span className="text-purple-400">{formatDistanceToNow(new Date(selectedLead.opened_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <MousePointerClick className="h-3 w-3" /> Clicked
                    </span>
                    <span className="text-sm">
                      {selectedLead?.clicked_at
                        ? <span className="text-indigo-400">{formatDistanceToNow(new Date(selectedLead.clicked_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <UserCheck className="h-3 w-3" /> Signed Up
                    </span>
                    <span className="text-sm">
                      {selectedLead?.claimed_at
                        ? <span className="text-green-400">{formatDistanceToNow(new Date(selectedLead.claimed_at), { addSuffix: true })}</span>
                        : <span className="text-muted-foreground">—</span>}
                    </span>
                  </div>
                  {selectedLead?.bounced_at && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-400 flex items-center gap-2">
                        <XCircle className="h-3 w-3" /> Bounced ({selectedLead.bounce_type})
                      </span>
                      <span className="text-sm text-red-400">
                        {formatDistanceToNow(new Date(selectedLead.bounced_at), { addSuffix: true })}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Launch Campaign Tracking */}
              {selectedLead?.launch_email_sent_at && (
                <Card className="border-green-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <PartyPopper className="h-4 w-4 text-green-400" />
                      Launch Campaign
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" /> Sent
                      </span>
                      <span className="text-sm text-green-400">
                        {formatDistanceToNow(new Date(selectedLead.launch_email_sent_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Eye className="h-3 w-3" /> Opened
                      </span>
                      <span className="text-sm">
                        {selectedLead?.launch_email_opened_at
                          ? <span className="text-purple-400">{formatDistanceToNow(new Date(selectedLead.launch_email_opened_at), { addSuffix: true })}</span>
                          : <span className="text-muted-foreground">—</span>}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <MousePointerClick className="h-3 w-3" /> Clicked
                      </span>
                      <span className="text-sm">
                        {selectedLead?.launch_email_clicked_at
                          ? <span className="text-blue-400">{formatDistanceToNow(new Date(selectedLead.launch_email_clicked_at), { addSuffix: true })}</span>
                          : <span className="text-muted-foreground">—</span>}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Invite Link */}
              {selectedLead?.invite_token && !selectedLead?.claimed_at && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Invite Link</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="text-xs bg-muted px-2 py-1 rounded block truncate mb-2">
                      {`${window.location.origin}/auth/signup?ref=early-access&token=${selectedLead.invite_token}`}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-11 gap-2 touch-manipulation"
                      onClick={() => selectedLead.invite_token && copyInviteLink(selectedLead.invite_token)}
                    >
                      <Copy className="h-4 w-4" /> Copy Link
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions - only show for unconverted leads */}
            {!selectedLead?.claimed_at && (
              <SheetFooter className="p-4 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 touch-manipulation"
                  onClick={() => selectedLead && resendMutation.mutate(selectedLead.id)}
                  disabled={resendMutation.isPending}
                >
                  <RotateCw className="h-4 w-4" />
                  {resendMutation.isPending ? "Sending..." : "Resend Email"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 touch-manipulation text-red-400 hover:bg-red-500/10"
                  onClick={() => setDeleteId(selectedLead?.id || null)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Lead
                </Button>
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead?</AlertDialogTitle>
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

      {/* Send to Segment Confirmation */}
      <AlertDialog
        open={!!confirmSendSegment}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmSendSegment(null);
            setBatchProgress(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {confirmSendSegment && (
                <>
                  <span className="text-xl">{getSegmentConfig(confirmSendSegment).emoji}</span>
                  {batchProgress
                    ? `Sending to ${confirmSendSegment.charAt(0).toUpperCase() + confirmSendSegment.slice(1)} Leads...`
                    : `Send to ${confirmSendSegment.charAt(0).toUpperCase() + confirmSendSegment.slice(1)} Leads?`
                  }
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {batchProgress ? (
                <div className="space-y-2">
                  <p>
                    <strong>{batchProgress.totalSent}</strong> emails sent so far.{" "}
                    <strong>{batchProgress.remaining}</strong> remaining.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sending in batches of 10 with 6-second delays to avoid rate limits.
                    Click "Send Next Batch" to continue.
                  </p>
                </div>
              ) : (
                <>
                  This will send the launch campaign email to all {confirmSendSegment} leads who haven't received it yet.
                  Emails are sent in batches of 10 to avoid rate limits.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="h-11 touch-manipulation"
              disabled={sendToSegmentMutation.isPending}
              onClick={() => setBatchProgress(null)}
            >
              {batchProgress ? "Done for now" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation"
              onClick={() => confirmSendSegment && sendToSegmentMutation.mutate(confirmSendSegment)}
              disabled={sendToSegmentMutation.isPending}
            >
              {sendToSegmentMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending batch...
                </>
              ) : batchProgress ? (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Next Batch ({batchProgress.remaining} left)
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Start Sending
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
