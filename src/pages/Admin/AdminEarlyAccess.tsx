/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Send, Users, Mail, Loader2, TestTube, RotateCcw, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const [testEmail, setTestEmail] = useState('');
  const [showSendAllConfirm, setShowSendAllConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSendingAll, setIsSendingAll] = useState(false);
  const [sendProgress, setSendProgress] = useState({ sent: 0, total: 0 });

  // Stats query
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['ea-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'get_ea_offer_status' },
      });
      if (error) throw error;
      return data as {
        total: number;
        sent: number;
        remaining: number;
        opened: number;
        clicked: number;
        converted: number;
      };
    },
    refetchInterval: 10000,
  });

  // Send test email
  const testMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_ea_offer_test', testEmail: email, email_version: 'v8' },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success(`Test email sent to ${testEmail}`);
      setTestEmail('');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to send test'),
  });

  // Send to all remaining
  const handleSendAll = async () => {
    setShowSendAllConfirm(false);
    setIsSendingAll(true);
    setSendProgress({ sent: 0, total: stats?.remaining || 0 });

    let totalSent = 0;
    let hasMore = true;

    while (hasMore) {
      try {
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/send-early-access-invite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
            apikey: SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ action: 'send_ea_offer_campaign', email_version: 'v8' }),
        });

        const data = await resp.json();
        totalSent += data.sent || 0;
        setSendProgress({ sent: totalSent, total: stats?.remaining || totalSent });

        if (data.complete || (data.sent === 0 && data.remaining === 0)) {
          hasMore = false;
        }

        // Small delay between batches
        if (hasMore) await new Promise((r) => setTimeout(r, 1000));
      } catch (err) {
        toast.error('Batch failed — stopping');
        hasMore = false;
      }
    }

    setIsSendingAll(false);
    toast.success(`Campaign complete — ${totalSent} emails sent`);
    queryClient.invalidateQueries({ queryKey: ['ea-stats'] });
  };

  // Reset campaign
  const resetMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'reset_ea_offer_campaign' },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data: any) => {
      toast.success(`Campaign reset — ${data.remaining || 0} recipients ready`);
      queryClient.invalidateQueries({ queryKey: ['ea-stats'] });
    },
    onError: (err: any) => toast.error(err.message || 'Reset failed'),
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-4 text-center">
            <Users className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? '...' : stats?.total || 0}
            </p>
            <p className="text-xs text-white mt-1">Total</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-4 text-center">
            <Mail className="h-5 w-5 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? '...' : stats?.sent || 0}
            </p>
            <p className="text-xs text-white mt-1">Sent</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {statsLoading ? '...' : stats?.remaining || 0}
            </p>
            <p className="text-xs text-white mt-1">Remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Template indicator */}
      <div className="flex items-center gap-2 px-1">
        <CheckCircle className="h-4 w-4 text-elec-yellow" />
        <span className="text-sm text-white font-medium">Template: V8 App Store Launch</span>
        <span className="text-xs text-white/40">Subject: "We're on the App Store."</span>
      </div>

      {/* Send test */}
      <Card className="border-white/10 bg-white/[0.03]">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-semibold text-white">Send Test Email</p>
          <div className="flex gap-2">
            <Input
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@example.com"
              type="email"
              className="h-11 text-base touch-manipulation flex-1"
            />
            <Button
              onClick={() => testMutation.mutate(testEmail)}
              disabled={!testEmail || testMutation.isPending}
              className="h-11 px-5 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              {testMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-1.5" />
                  Test
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Send progress */}
      {isSendingAll && (
        <Card className="border-elec-yellow/30 bg-elec-yellow/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-elec-yellow animate-spin flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  Sending... {sendProgress.sent} / {sendProgress.total}
                </p>
                <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                    style={{
                      width: `${sendProgress.total > 0 ? (sendProgress.sent / sendProgress.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={() => setShowSendAllConfirm(true)}
          disabled={isSendingAll || !stats?.remaining}
          className="w-full h-14 rounded-2xl text-[16px] font-bold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation"
        >
          <Send className="h-5 w-5 mr-2" />
          Send to All ({stats?.remaining || 0} remaining)
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowResetConfirm(true)}
          disabled={isSendingAll || resetMutation.isPending}
          className="w-full h-11 rounded-xl text-sm font-medium border-white/10 text-white hover:bg-white/5 touch-manipulation"
        >
          {resetMutation.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RotateCcw className="h-4 w-4 mr-2" />
          )}
          Reset Campaign (re-send to everyone)
        </Button>
      </div>

      {/* Send All Confirm */}
      <AlertDialog open={showSendAllConfirm} onOpenChange={setShowSendAllConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send V8 to all remaining?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send the App Store launch email to {stats?.remaining || 0} people who
              haven't received it yet. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendAll}>
              Send {stats?.remaining || 0} emails
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Confirm */}
      <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear all sent flags so every early access signup can receive the email
              again. Use this if you want to re-send V8 to everyone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => resetMutation.mutate()}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
