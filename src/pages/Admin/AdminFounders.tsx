import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
  Send,
  RefreshCw,
  Mail,
  Check,
  Clock,
  ChevronRight,
  Loader2,
  MailCheck,
  Eye,
  Zap,
  Play,
  Pause,
  CheckCircle2,
  Circle,
  Target,
  TrendingUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Prospect {
  id: string;
  email: string;
  send_count: number;
  invite_token: string;
  last_campaign_sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
}

interface CampaignStatus {
  totalProspects: number;
  sent: number;
  remaining: number;
  sentEmails: string[];
  remainingEmails: string[];
}

export default function AdminFounders() {
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);
  const [showProspectList, setShowProspectList] = useState(false);
  const [confirmSendBatch, setConfirmSendBatch] = useState(false);
  const [confirmSendTest, setConfirmSendTest] = useState(false);
  const [lastBatchResult, setLastBatchResult] = useState<{
    sent: number;
    failed: number;
    remaining: number;
    sentEmails?: string[];
    errors?: string[];
  } | null>(null);

  // Fetch campaign status
  const { data: status, isLoading, refetch } = useQuery<CampaignStatus>({
    queryKey: ["founder-final-push-status"],
    refetchInterval: isSending ? 3000 : 30000,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("founder-final-push", {
        body: { action: "get_status" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  // Send test email mutation
  const sendTestMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("founder-final-push", {
        body: { action: "send_test", testEmail: "founder@elec-mate.com" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      setConfirmSendTest(false);
      toast({
        title: "Test email sent!",
        description: "Check founder@elec-mate.com inbox",
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Send batch mutation
  const sendBatchMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("founder-final-push", {
        body: { action: "send_batch", batchSize: 5 },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["founder-final-push-status"] });
      setLastBatchResult(data);

      if (data.remaining > 0) {
        toast({
          title: `Batch sent! (${data.sent} emails)`,
          description: `${data.remaining} remaining`,
        });
      } else {
        setIsSending(false);
        toast({
          title: "All emails sent!",
          description: `Campaign complete - ${status?.sent || 0 + data.sent} emails delivered`,
        });
      }
    },
    onError: (error: any) => {
      setIsSending(false);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleStartCampaign = () => {
    setConfirmSendBatch(false);
    setIsSending(true);
    sendBatchMutation.mutate();
  };

  const handleSendNextBatch = () => {
    sendBatchMutation.mutate();
  };

  const handlePause = () => {
    setIsSending(false);
  };

  const handleRefresh = () => {
    refetch();
  };

  const totalProspects = status?.totalProspects || 0;
  const sentCount = status?.sent || 0;
  const remainingCount = status?.remaining || 0;
  const progressPercent = totalProspects > 0 ? Math.round((sentCount / totalProspects) * 100) : 0;

  return (
    <div className="space-y-4 pb-20">
      {/* Hero Card - Final Push Campaign */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="relative pt-6 pb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Crown className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-yellow-100 text-sm font-medium">Final Push Campaign</p>
                <p className="text-3xl font-bold text-white tracking-tight">52 Prospects</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-white/15 hover:bg-white/25 text-white touch-manipulation backdrop-blur-sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-white/80 mb-2">
              <span>Campaign Progress</span>
              <span className="font-bold text-white">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-white/20" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-300" />
                <span className="text-2xl font-bold text-white">{sentCount}</span>
              </div>
              <p className="text-[10px] text-yellow-100 uppercase tracking-wide font-medium">Sent</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock className="h-4 w-4 text-amber-200" />
                <span className="text-2xl font-bold text-white">{remainingCount}</span>
              </div>
              <p className="text-[10px] text-yellow-100 uppercase tracking-wide font-medium">Remaining</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Target className="h-4 w-4 text-white" />
                <span className="text-2xl font-bold text-white">{totalProspects}</span>
              </div>
              <p className="text-[10px] text-yellow-100 uppercase tracking-wide font-medium">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Controls */}
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Send in Batches of 5</h3>
              <p className="text-sm text-muted-foreground">
                {remainingCount > 0
                  ? `${remainingCount} emails left to send`
                  : 'All emails have been sent!'}
              </p>
            </div>
          </div>

          {remainingCount > 0 ? (
            <div className="space-y-3">
              {!isSending ? (
                <Button
                  className="w-full h-14 gap-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold touch-manipulation rounded-xl shadow-lg shadow-yellow-500/25 text-lg"
                  onClick={() => setConfirmSendBatch(true)}
                >
                  <Play className="h-6 w-6" />
                  {sentCount > 0 ? 'Continue Sending' : 'Start Campaign'}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full h-14 gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold touch-manipulation rounded-xl shadow-lg text-lg"
                    onClick={handleSendNextBatch}
                    disabled={sendBatchMutation.isPending}
                  >
                    {sendBatchMutation.isPending ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Sending batch...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        Send Next 5
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 gap-2 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 font-semibold touch-manipulation rounded-xl"
                    onClick={handlePause}
                    disabled={sendBatchMutation.isPending}
                  >
                    <Pause className="h-5 w-5" />
                    Pause
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-semibold">Campaign Complete!</p>
              <p className="text-sm text-muted-foreground">All 52 emails have been sent</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Last Batch Result */}
      {lastBatchResult && (
        <Card className={`border-${lastBatchResult.failed > 0 ? 'red' : 'green'}-500/30 bg-${lastBatchResult.failed > 0 ? 'red' : 'green'}-500/5`}>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${lastBatchResult.failed > 0 ? 'bg-amber-500/20' : 'bg-green-500/20'} flex items-center justify-center`}>
                <MailCheck className={`h-5 w-5 ${lastBatchResult.failed > 0 ? 'text-amber-400' : 'text-green-400'}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Last Batch Sent</p>
                <p className="text-sm text-muted-foreground">
                  {lastBatchResult.sent} sent{lastBatchResult.failed > 0 && `, ${lastBatchResult.failed} failed`}
                </p>
              </div>
            </div>
            {lastBatchResult.sentEmails && lastBatchResult.sentEmails.length > 0 && (
              <div className="bg-background/50 rounded-xl p-3 space-y-1 mb-3">
                {lastBatchResult.sentEmails.map((email, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-muted-foreground truncate">{email}</span>
                  </div>
                ))}
              </div>
            )}
            {lastBatchResult.errors && lastBatchResult.errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 space-y-1">
                <p className="text-xs font-semibold text-red-400 mb-2">Failed to send:</p>
                {lastBatchResult.errors.map((error, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-red-400">✗</span>
                    <span className="text-red-300 truncate text-xs">{error}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Test Email */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Test Email</p>
                <p className="text-sm text-muted-foreground">Preview before sending</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-11 gap-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-semibold touch-manipulation rounded-xl"
              onClick={() => setConfirmSendTest(true)}
              disabled={sendTestMutation.isPending}
            >
              {sendTestMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              Send Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prospect List */}
      <Card className="border-border/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              Prospect Tracking
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
              onClick={() => setShowProspectList(true)}
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {/* Sent */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-400">{sentCount}</p>
              <p className="text-xs text-muted-foreground">Emails Sent</p>
            </div>
            {/* Remaining */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-2">
                <Circle className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-400">{remainingCount}</p>
              <p className="text-xs text-muted-foreground">To Send</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Preview Card */}
      <Card className="border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-400" />
            Email Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-sm">
            <div className="text-slate-400 text-xs mb-3 pb-2 border-b border-slate-700">
              Subject: <span className="text-white">You're missing out on £3.99/month forever</span>
            </div>
            <div className="text-slate-300 space-y-3">
              <p>Hey,</p>
              <p>Quick one - you signed up for the Elec-Mate founder offer but never activated it.</p>
              <p className="text-white font-medium">300+ people are already using the app and you're missing out.</p>
              <div className="space-y-2 pl-2">
                <p>⚡ <strong>Full platform access</strong> - Inspection & testing, quotes/invoices, everything</p>
                <p>⚡ <strong>AI-powered features</strong> - Circuit designer, cost engineer, health & safety</p>
                <p>⚡ <strong>Elec-ID verification</strong> - Stand out to employers and clients</p>
                <p>⚡ <strong>Study centre</strong> - Level 2, 3 & electrical upskilling courses</p>
                <p>⚡ <strong>Employer Hub access</strong> - Worth £39.99/month on its own</p>
                <p>⚡ <strong>Price locked forever</strong> - You'll never pay more than £3.99/month</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-500 text-black text-center py-3 rounded-xl font-bold text-sm">
              Claim Your Founder Spot
            </div>
            <p className="text-slate-400 text-xs text-center mt-2">
              💡 If you see a red error page, just hit refresh and it'll take you through.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Prospect List Sheet */}
      <Sheet open={showProspectList} onOpenChange={setShowProspectList}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 border-t border-border/50">
          <div className="flex flex-col h-full bg-background">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="px-6 pb-4 border-b border-border/50">
              <SheetTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                All 52 Prospects
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Sent Emails */}
              {status?.sentEmails && status.sentEmails.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Sent ({status.sentEmails.length})
                  </h3>
                  <div className="space-y-2">
                    {status.sentEmails.map((email, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
                      >
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="text-sm truncate flex-1">{email}</span>
                        <Badge className="bg-green-500/20 text-green-400 text-[10px]">Sent</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining Emails */}
              {status?.remainingEmails && status.remainingEmails.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                    <Circle className="h-4 w-4" />
                    To Send ({status.remainingEmails.length})
                  </h3>
                  <div className="space-y-2">
                    {status.remainingEmails.map((email, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-sm truncate flex-1 text-muted-foreground">{email}</span>
                        <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">Pending</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Confirm Send Batch Dialog */}
      <AlertDialog open={confirmSendBatch} onOpenChange={setConfirmSendBatch}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Send className="h-5 w-5 text-yellow-400" />
              </div>
              Start Campaign?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will send emails to {remainingCount} prospects in batches of 5.
              You can pause at any time between batches.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold"
              onClick={handleStartCampaign}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Sending
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Send Test Dialog */}
      <AlertDialog open={confirmSendTest} onOpenChange={setConfirmSendTest}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Send Test Email?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a test email to founder@elec-mate.com so you can preview how it looks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation rounded-xl" disabled={sendTestMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation rounded-xl bg-purple-500 hover:bg-purple-600"
              onClick={() => sendTestMutation.mutate()}
              disabled={sendTestMutation.isPending}
            >
              {sendTestMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Test
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
