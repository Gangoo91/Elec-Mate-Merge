import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Mail,
  Play,
  Pause,
  Send,
  Eye,
  MousePointerClick,
  Ban,
  BarChart3,
  Copy,
  Trash2,
  Clock,
  UserX,
  CheckCircle2,
  Check,
  X,
  AlertCircle,
  Loader2,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { callOutreach, CAMPAIGN_STATUS_STYLES, type OutreachCampaign } from './shared';

interface CampaignDetailProps {
  campaign: OutreachCampaign;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onRefresh: () => void;
  onCloned: (newCampaign: OutreachCampaign) => void;
}

export default function CampaignDetail({
  campaign,
  open,
  onOpenChange,
  onRefresh,
  onCloned,
}: CampaignDetailProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const batchRunningRef = useRef(false);
  const [localCampaign, setLocalCampaign] = useState(campaign);
  const [confirmStart, setConfirmStart] = useState(false);
  const [testDialog, setTestDialog] = useState(false);
  const [testEmail, setTestEmail] = useState('founder@elec-mate.com');
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [scheduleWhen, setScheduleWhen] = useState<string>(defaultScheduleTime());

  useEffect(() => setLocalCampaign(campaign), [campaign]);

  const { data: liveData, refetch: refetchLive } = useQuery({
    queryKey: ['outreach-campaign-detail', campaign.id],
    queryFn: () => callOutreach('get_campaign', { campaignId: campaign.id }),
    staleTime: 5000,
    refetchInterval: localCampaign.status === 'sending' ? 3000 : false,
  });

  useEffect(() => {
    if (liveData?.campaign) setLocalCampaign(liveData.campaign);
  }, [liveData]);

  const startBatchLoop = useCallback(async () => {
    batchRunningRef.current = true;
    while (batchRunningRef.current) {
      try {
        const result = await callOutreach('send_batch', { campaignId: campaign.id });
        refetchLive();
        if (result.completed || result.remaining === 0) {
          batchRunningRef.current = false;
          toast({ title: 'Campaign completed', description: `${result.sent} final batch` });
          onRefresh();
          break;
        }
        await new Promise((r) => setTimeout(r, 3000));
      } catch (err) {
        batchRunningRef.current = false;
        toast({
          title: 'Batch error',
          description: err instanceof Error ? err.message : 'Unknown',
          variant: 'destructive',
        });
        break;
      }
    }
  }, [campaign.id, refetchLive, onRefresh, toast]);

  const prepareMutation = useMutation({
    mutationFn: () => callOutreach('prepare_send', { campaignId: campaign.id }),
    onSuccess: (data) => {
      toast({ title: `${data.recipients} recipients prepared` });
      if (data.recipients > 0) startBatchLoop();
      onRefresh();
      refetchLive();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const testMutation = useMutation({
    mutationFn: () =>
      callOutreach('send_test', { campaignId: campaign.id, testEmail: testEmail.trim() }),
    onSuccess: () => {
      toast({ title: `Test sent to ${testEmail}` });
      setTestDialog(false);
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const pauseMutation = useMutation({
    mutationFn: () => callOutreach('pause_campaign', { campaignId: campaign.id }),
    onSuccess: () => {
      batchRunningRef.current = false;
      toast({ title: 'Campaign paused' });
      onRefresh();
      refetchLive();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const scheduleMutation = useMutation({
    mutationFn: () =>
      callOutreach('schedule_campaign', {
        campaignId: campaign.id,
        scheduledAt: new Date(scheduleWhen).toISOString(),
      }),
    onSuccess: () => {
      toast({ title: 'Campaign scheduled' });
      setScheduleDialog(false);
      onRefresh();
      refetchLive();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const unscheduleMutation = useMutation({
    mutationFn: () => callOutreach('unschedule_campaign', { campaignId: campaign.id }),
    onSuccess: () => {
      toast({ title: 'Moved back to draft' });
      onRefresh();
      refetchLive();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const cloneMutation = useMutation({
    mutationFn: () => callOutreach('clone_campaign', { campaignId: campaign.id }),
    onSuccess: (res) => {
      toast({ title: 'Cloned as new draft' });
      onRefresh();
      if (res?.campaign) onCloned(res.campaign);
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const followUpMutation = useMutation({
    mutationFn: () => callOutreach('clone_to_non_openers', { campaignId: campaign.id }),
    onSuccess: (res) => {
      toast({
        title: 'Follow-up draft created',
        description: `Targets ${res.targetCount} non-openers`,
      });
      onRefresh();
      if (res?.campaign) onCloned(res.campaign);
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => callOutreach('delete_campaign', { campaignId: campaign.id }),
    onSuccess: () => {
      toast({ title: 'Campaign deleted' });
      onOpenChange(false);
      onRefresh();
      queryClient.invalidateQueries({ queryKey: ['outreach-campaigns'] });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  // Cleanup on close
  useEffect(
    () => () => {
      batchRunningRef.current = false;
    },
    []
  );

  const progress =
    localCampaign.total_recipients > 0
      ? Math.round((localCampaign.sent_count / localCampaign.total_recipients) * 100)
      : 0;
  const openRate =
    localCampaign.sent_count > 0
      ? ((localCampaign.open_count / localCampaign.sent_count) * 100).toFixed(1)
      : '0';
  const clickRate =
    localCampaign.sent_count > 0
      ? ((localCampaign.click_count / localCampaign.sent_count) * 100).toFixed(1)
      : '0';
  const bounceRate =
    localCampaign.sent_count > 0
      ? ((localCampaign.bounce_count / localCampaign.sent_count) * 100).toFixed(1)
      : '0';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 border-t border-border/50">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-5 pb-3 border-b border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-white text-base truncate">{localCampaign.name}</SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${CAMPAIGN_STATUS_STYLES[localCampaign.status] || ''} text-[10px]`}>
                    {localCampaign.status}
                  </Badge>
                  {localCampaign.scheduled_at && (
                    <span className="text-[11px] text-white/60 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(localCampaign.scheduled_at), 'dd MMM HH:mm')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Campaign meta */}
            <Card className="border-border/30">
              <CardContent className="p-4 space-y-3">
                <MetaRow label="Subject" value={localCampaign.subject} />
                <MetaRow
                  label="From"
                  value={`${localCampaign.from_name} <${localCampaign.from_email}>`}
                />
                {localCampaign.preheader && (
                  <MetaRow label="Preheader" value={localCampaign.preheader} muted />
                )}
                {localCampaign.template_slug && (
                  <MetaRow label="Template" value={localCampaign.template_slug} muted />
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            {(localCampaign.status === 'sending' ||
              localCampaign.status === 'completed' ||
              localCampaign.status === 'paused') && (
              <>
                <div>
                  <div className="flex justify-between text-sm text-white mb-1.5">
                    <span>Progress</span>
                    <span className="font-bold">
                      {localCampaign.sent_count} / {localCampaign.total_recipients} ({progress}%)
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MetricTile
                    icon={BarChart3}
                    accent="text-green-400 bg-green-500/10 border-green-500/20"
                    label="Open rate"
                    value={`${openRate}%`}
                    sub={`${localCampaign.open_count} opens`}
                  />
                  <MetricTile
                    icon={MousePointerClick}
                    accent="text-blue-400 bg-blue-500/10 border-blue-500/20"
                    label="Click rate"
                    value={`${clickRate}%`}
                    sub={`${localCampaign.click_count} clicks`}
                  />
                  <MetricTile
                    icon={Ban}
                    accent="text-red-400 bg-red-500/10 border-red-500/20"
                    label="Bounce rate"
                    value={`${bounceRate}%`}
                    sub={`${localCampaign.bounce_count} bounces`}
                  />
                  <MetricTile
                    icon={Send}
                    accent="text-elec-yellow bg-elec-yellow/10 border-elec-yellow/20"
                    label="Delivered"
                    value={localCampaign.sent_count.toLocaleString()}
                    sub={localCampaign.failed_count ? `${localCampaign.failed_count} failed` : 'All successful'}
                  />
                </div>
              </>
            )}

            {/* Draft / Scheduled actions */}
            {(localCampaign.status === 'draft' || localCampaign.status === 'scheduled') && (
              <div className="space-y-2">
                <Button
                  className="w-full h-12 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
                  onClick={() => setConfirmStart(true)}
                  disabled={prepareMutation.isPending}
                >
                  {prepareMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Preparing…
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" /> Send now
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="h-11 gap-2 border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 touch-manipulation rounded-xl"
                    onClick={() => setScheduleDialog(true)}
                  >
                    <Clock className="h-4 w-4" />
                    {localCampaign.status === 'scheduled' ? 'Reschedule' : 'Schedule'}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 gap-2 border-white/20 text-white hover:bg-white/[0.06] touch-manipulation rounded-xl"
                    onClick={() => setTestDialog(true)}
                  >
                    <Eye className="h-4 w-4" />
                    Send test
                  </Button>
                </div>

                {localCampaign.status === 'scheduled' && (
                  <Button
                    variant="ghost"
                    className="w-full h-10 gap-2 text-white/70 hover:bg-white/5 touch-manipulation"
                    onClick={() => unscheduleMutation.mutate()}
                    disabled={unscheduleMutation.isPending}
                  >
                    Unschedule — move back to draft
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full h-10 gap-2 text-red-300 hover:bg-red-500/10 touch-manipulation"
                  onClick={() => {
                    if (confirm('Delete this draft?')) deleteMutation.mutate();
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete draft
                </Button>
              </div>
            )}

            {localCampaign.status === 'sending' && (
              <Button
                variant="outline"
                className="w-full h-12 gap-2 border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 font-semibold touch-manipulation rounded-xl"
                onClick={() => pauseMutation.mutate()}
                disabled={pauseMutation.isPending}
              >
                <Pause className="h-5 w-5" />
                Pause
              </Button>
            )}

            {localCampaign.status === 'paused' && (
              <Button
                className="w-full h-12 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
                onClick={() => prepareMutation.mutate()}
                disabled={prepareMutation.isPending}
              >
                <Play className="h-5 w-5" />
                Resume
              </Button>
            )}

            {/* Completed — follow-up + clone */}
            {localCampaign.status === 'completed' && (
              <>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-green-300 font-semibold text-sm">Campaign complete</p>
                    <p className="text-xs text-white/70">
                      {localCampaign.sent_count} emails sent
                      {localCampaign.completed_at &&
                        ` · ${format(new Date(localCampaign.completed_at), 'dd MMM yyyy HH:mm')}`}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="h-11 gap-2 border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 touch-manipulation rounded-xl"
                    onClick={() => followUpMutation.mutate()}
                    disabled={followUpMutation.isPending}
                  >
                    {followUpMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <UserX className="h-4 w-4" />
                    )}
                    Follow up non-openers
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 gap-2 border-white/20 text-white hover:bg-white/[0.06] touch-manipulation rounded-xl"
                    onClick={() => cloneMutation.mutate()}
                    disabled={cloneMutation.isPending}
                  >
                    {cloneMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    Clone
                  </Button>
                </div>
              </>
            )}

            {/* Recipients */}
            {liveData?.sends && liveData.sends.length > 0 && (
              <Card className="border-border/30">
                <CardContent className="p-0">
                  <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                    <p className="text-sm font-semibold text-white">
                      Recipients ({liveData.sends.length})
                    </p>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-border/20">
                    {liveData.sends.map(
                      (send: { id: string; status: string; email: string }) => (
                        <div
                          key={send.id}
                          className="flex items-center gap-2 px-4 py-2 text-sm"
                        >
                          <RecipientIcon status={send.status} />
                          <span className="text-white truncate flex-1">{send.email}</span>
                          <Badge
                            className={`text-[10px] ${
                              send.status === 'opened' || send.status === 'clicked'
                                ? 'bg-blue-500/20 text-blue-300'
                                : send.status === 'bounced' || send.status === 'failed'
                                  ? 'bg-red-500/20 text-red-300'
                                  : send.status === 'pending'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-green-500/20 text-green-300'
                            }`}
                          >
                            {send.status}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Confirm Start */}
        <AlertDialog open={confirmStart} onOpenChange={setConfirmStart}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                  <Send className="h-5 w-5 text-elec-yellow" />
                </div>
                Start sending?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Recipients are calculated from the campaign's segment filter. Sending happens in
                small batches — you can pause at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                onClick={() => prepareMutation.mutate()}
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Test send dialog */}
        <AlertDialog open={testDialog} onOpenChange={setTestDialog}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Send test email</AlertDialogTitle>
              <AlertDialogDescription>
                Merge tags will be filled with sample data so you can see how the email lands.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <Label className="text-white text-sm">To</Label>
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="h-11 mt-1 touch-manipulation"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                onClick={() => testMutation.mutate()}
                disabled={testMutation.isPending || !testEmail.includes('@')}
              >
                {testMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send test
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Schedule dialog */}
        <AlertDialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Schedule campaign</AlertDialogTitle>
              <AlertDialogDescription>
                Pick a UK time. Campaign stays in "scheduled" status until then — you can
                unschedule at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <Label className="text-white text-sm">Send at</Label>
              <Input
                type="datetime-local"
                value={scheduleWhen}
                onChange={(e) => setScheduleWhen(e.target.value)}
                className="h-11 mt-1 touch-manipulation"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                onClick={() => scheduleMutation.mutate()}
                disabled={scheduleMutation.isPending}
              >
                {scheduleMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Clock className="h-4 w-4 mr-2" />
                )}
                Schedule
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetContent>
    </Sheet>
  );
}

function MetaRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">{label}</p>
      <p className={`text-sm mt-0.5 ${muted ? 'text-white/70' : 'text-white font-medium'}`}>
        {value}
      </p>
    </div>
  );
}

function MetricTile({
  icon: Icon,
  accent,
  label,
  value,
  sub,
}: {
  icon: typeof Mail;
  accent: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className={`rounded-xl border p-3 ${accent}`}>
      <Icon className="h-4 w-4 mb-1" />
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-[10px] text-white/70 uppercase tracking-wider">{label}</p>
      {sub && <p className="text-[10px] text-white/50 mt-0.5">{sub}</p>}
    </div>
  );
}

function RecipientIcon({ status }: { status: string }) {
  if (status === 'sent' || status === 'delivered')
    return <Check className="h-3.5 w-3.5 text-green-400 shrink-0" />;
  if (status === 'opened' || status === 'clicked')
    return <Eye className="h-3.5 w-3.5 text-blue-400 shrink-0" />;
  if (status === 'bounced' || status === 'failed')
    return <X className="h-3.5 w-3.5 text-red-400 shrink-0" />;
  return <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />;
}

function defaultScheduleTime() {
  // Tomorrow at 09:00 local
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
