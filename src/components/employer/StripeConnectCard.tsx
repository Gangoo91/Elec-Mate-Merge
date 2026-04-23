import { useState, useEffect } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Unplug,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { PrimaryButton, SecondaryButton, DestructiveButton } from './editorial';
import { cn } from '@/lib/utils';
import {
  getStripeConnectStatus,
  createStripeConnectAccount,
  getStripeOnboardingLink,
  disconnectStripeConnect,
  type StripeConnectStatus,
} from '@/services/financeService';
import { getCompanySettings } from '@/services/settingsService';
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

export function StripeConnectCard() {
  const [status, setStatus] = useState<StripeConnectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await getStripeConnectStatus();
      setStatus(data);
    } catch (error) {
      console.error('Error fetching Stripe status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Check URL params for Stripe redirect status
    const urlParams = new URLSearchParams(window.location.search);
    const stripeStatus = urlParams.get('stripe');

    if (stripeStatus === 'success') {
      toast({
        title: 'Stripe Setup',
        description: 'Stripe account setup updated. Refreshing status...',
      });
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
      fetchStatus();
    } else if (stripeStatus === 'refresh') {
      toast({
        title: 'Setup Incomplete',
        description: 'Please complete your Stripe account setup.',
        variant: 'destructive',
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleConnect = async () => {
    setActionLoading(true);
    try {
      const companySettings = await getCompanySettings();
      const result = await createStripeConnectAccount(
        companySettings.company_name || 'My Company',
        companySettings.company_email || null
      );

      // Open Stripe onboarding in system browser
      await openExternalUrl(result.onboardingUrl);
    } catch (error: any) {
      console.error('Error creating Stripe account:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to start Stripe setup',
        variant: 'destructive',
      });
      setActionLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    setActionLoading(true);
    try {
      const result = await getStripeOnboardingLink('onboarding');
      await openExternalUrl(result.url);
    } catch (error: any) {
      console.error('Error getting onboarding link:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to get setup link',
        variant: 'destructive',
      });
      setActionLoading(false);
    }
  };

  const handleManageAccount = async () => {
    setActionLoading(true);
    try {
      const result = await getStripeOnboardingLink('dashboard');
      await openExternalUrl(result.url);
    } catch (error: any) {
      console.error('Error getting dashboard link:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to open Stripe dashboard',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setActionLoading(true);
    try {
      await disconnectStripeConnect();
      toast({ title: 'Disconnected', description: 'Stripe account has been disconnected.' });
      fetchStatus();
    } catch (error: any) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to disconnect',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
      setShowDisconnectDialog(false);
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden border border-purple-500/20 bg-[hsl(0_0%_12%)]">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
          <CardTitle className="flex items-center gap-2 text-white">
            <CreditCard className="h-5 w-5 text-purple-400" />
            Stripe Payments
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isConnected = status?.connected && status?.account?.chargesEnabled;
  const isPending = status?.connected && !status?.account?.chargesEnabled;

  return (
    <>
      <Card className="overflow-hidden border border-purple-500/20 bg-[hsl(0_0%_12%)]">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <CreditCard className="h-5 w-5 text-purple-400" />
                Stripe Payments
              </CardTitle>
              <CardDescription className="text-white">
                Accept card payments on invoices
              </CardDescription>
            </div>
            {isConnected && (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            )}
            {isPending && (
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                <AlertCircle className="h-3 w-3 mr-1" />
                Setup Incomplete
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {!status?.stripeConfigured ? (
            // Stripe not configured at platform level
            <div className="text-center py-4">
              <AlertCircle className="h-10 w-10 text-white mx-auto mb-3" />
              <p className="text-white">
                Stripe payments are not configured for this platform.
              </p>
            </div>
          ) : !status?.connected ? (
            // Not connected - show connect button
            <div className="space-y-4">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-white">Accept online payments</p>
                <p className="text-sm text-white">
                  Connect your Stripe account to receive payments directly from clients when they
                  view invoices online.
                </p>
              </div>

              <PrimaryButton
                onClick={handleConnect}
                disabled={actionLoading}
                size="lg"
                fullWidth
                className="bg-purple-500 text-white hover:bg-purple-500/90"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4 mr-2" />
                )}
                Connect Stripe Account
              </PrimaryButton>

              <p className="text-xs text-white text-center">
                1% platform fee + Stripe processing fees apply to each transaction
              </p>
            </div>
          ) : isPending ? (
            // Connected but setup incomplete
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Complete your Stripe setup</p>
                </div>
                <p className="text-sm text-white">
                  Your Stripe account needs additional information before you can accept payments.
                </p>
              </div>

              <PrimaryButton
                onClick={handleCompleteSetup}
                disabled={actionLoading}
                size="lg"
                fullWidth
                className="bg-amber-500 text-black hover:bg-amber-500/90"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Complete Setup
              </PrimaryButton>
            </div>
          ) : (
            // Fully connected
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Business</span>
                  <span className="text-sm font-medium text-white">
                    {status.account?.businessName || 'Your Business'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Status</span>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Payments</span>
                  <span className="text-sm font-medium text-white">
                    {status.account?.chargesEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Payouts</span>
                  <span className="text-sm font-medium text-white">
                    {status.account?.payoutsEnabled ? 'Enabled' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <SecondaryButton
                  onClick={handleManageAccount}
                  disabled={actionLoading}
                  className="flex-1"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4 mr-2" />
                  )}
                  Manage Account
                </SecondaryButton>
                <button
                  type="button"
                  onClick={fetchStatus}
                  className="h-11 w-11 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] touch-manipulation disabled:opacity-40"
                  disabled={loading}
                >
                  <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
                </button>
              </div>

              <DestructiveButton
                onClick={() => setShowDisconnectDialog(true)}
                fullWidth
              >
                <Unplug className="h-4 w-4 mr-2" />
                Disconnect Stripe
              </DestructiveButton>

              <p className="text-xs text-white text-center">
                1% platform fee + Stripe processing fees apply to each transaction
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <AlertDialogContent className="bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Disconnect Stripe Account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will remove the connection to your Stripe account. You won't be able to accept
              card payments on invoices until you reconnect. Your Stripe account itself will not be
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnect}
              className="bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/20"
            >
              {actionLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
