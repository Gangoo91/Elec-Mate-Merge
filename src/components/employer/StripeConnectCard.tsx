/**
 * Card payments — Stripe Connect (ELE-1986 restyle).
 *
 * What it enables: a "Pay now" link on every invoice you send, so clients pay
 * by card and the money lands in your own Stripe account. Editorial list card;
 * disconnect confirms in a bottom sheet (no centred dialog).
 *
 * Connection is per account (company_profiles.stripe_account_id), so a manager
 * sees a read-only note: only the owner connects the firm's payments.
 */
import { useState, useEffect } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { ExternalLink, Loader2, Unplug, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployerCoAdmin } from '@/hooks/useEmployerCoAdmin';
import {
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  SheetShell,
} from './editorial';
import {
  getStripeConnectStatus,
  createStripeConnectAccount,
  getStripeOnboardingLink,
  disconnectStripeConnect,
  type StripeConnectStatus,
} from '@/services/financeService';
import { getCompanySettings } from '@/services/settingsService';
import { trackStripeConnectCompleted, trackStripeConnectStarted } from '@/lib/analytics-events';

const FEE_LINE = '1% platform fee plus Stripe processing fees on each card payment.';

function Benefits() {
  return (
    <div className="px-5 sm:px-6 py-4 space-y-2.5">
      <p className="text-[13px] text-white leading-relaxed">
        Connect Stripe and every invoice you send carries a <strong>Pay now</strong> link. Your
        client pays by card from the email, the invoice marks itself paid, and the money goes to
        your own Stripe account.
      </p>
      <p className="text-[12px] text-white leading-relaxed">{FEE_LINE}</p>
    </div>
  );
}

export function StripeConnectCard() {
  const { user } = useAuth();
  const { data: isCoAdmin } = useEmployerCoAdmin(user?.id);
  const [status, setStatus] = useState<StripeConnectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDisconnect, setShowDisconnect] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      setStatus(await getStripeConnectStatus());
    } catch (error) {
      console.error('Error fetching Stripe status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isCoAdmin !== false) return;
    fetchStatus();

    // Back from Stripe's hosted onboarding
    const urlParams = new URLSearchParams(window.location.search);
    const stripeStatus = urlParams.get('stripe');
    if (stripeStatus === 'success') {
      toast({ title: 'Stripe updated', description: 'Checking your account status.' });
      window.history.replaceState({}, '', window.location.pathname);
      // Funnel (ELE-1823): back from Stripe with the account taking payments.
      getStripeConnectStatus()
        .then((st) => {
          setStatus(st);
          if (st.account?.chargesEnabled) trackStripeConnectCompleted();
        })
        .catch(() => fetchStatus());
    } else if (stripeStatus === 'refresh') {
      toast({
        title: 'Setup not finished',
        description: 'Stripe still needs a few details before you can take card payments.',
        variant: 'destructive',
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [isCoAdmin]);

  const handleConnect = async () => {
    setActionLoading(true);
    try {
      trackStripeConnectStarted({ source: 'employer_settings', method: 'express' });
      const companySettings = await getCompanySettings();
      const result = await createStripeConnectAccount(
        companySettings.company_name || 'My Company',
        companySettings.company_email || null
      );
      await openExternalUrl(result.onboardingUrl);
    } catch (error) {
      console.error('Error creating Stripe account:', error);
      toast({
        title: 'Could not start Stripe setup',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    setActionLoading(true);
    try {
      const result = await getStripeOnboardingLink('onboarding');
      await openExternalUrl(result.url);
    } catch (error) {
      console.error('Error getting onboarding link:', error);
      toast({
        title: 'Could not open Stripe',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleManageAccount = async () => {
    setActionLoading(true);
    try {
      const result = await getStripeOnboardingLink('dashboard');
      await openExternalUrl(result.url);
    } catch (error) {
      console.error('Error getting dashboard link:', error);
      toast({
        title: 'Could not open Stripe',
        description: error instanceof Error ? error.message : 'Please try again.',
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
      toast({
        title: 'Stripe disconnected',
        description: 'New invoices go out without a Pay now link.',
      });
      setShowDisconnect(false);
      fetchStatus();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Could not disconnect',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const isConnected = !!(status?.connected && status?.account?.chargesEnabled);
  const isPending = !!(status?.connected && !status?.account?.chargesEnabled);

  const statusPill = isCoAdmin
    ? null
    : loading
      ? null
      : isConnected
        ? <Pill tone="emerald">Connected</Pill>
        : isPending
          ? <Pill tone="orange">Setup not finished</Pill>
          : status?.stripeConfigured
            ? <Pill tone="purple">Not connected</Pill>
            : null;

  return (
    <>
      <ListCard>
        <ListCardHeader tone="purple" title="Card payments" meta={statusPill} />

        {isCoAdmin ? (
          <div className="px-5 sm:px-6 py-4">
            <p className="text-[13px] text-white leading-relaxed">
              Card payments let clients pay invoices with a Pay now link. Only the account owner can
              connect or change the firm's Stripe account.
            </p>
          </div>
        ) : loading && !status ? (
          <div className="px-5 sm:px-6 py-6 flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span className="text-[13px] text-white">Checking your Stripe account…</span>
          </div>
        ) : !status?.stripeConfigured ? (
          <div className="px-5 sm:px-6 py-4">
            <p className="text-[13px] text-white leading-relaxed">
              Card payments are not available right now. Invoices still go out with your bank
              details.
            </p>
          </div>
        ) : !status.connected ? (
          <>
            <Benefits />
            <div className="px-5 sm:px-6 pb-4">
              <PrimaryButton onClick={handleConnect} disabled={actionLoading} fullWidth>
                {actionLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Connect Stripe
              </PrimaryButton>
            </div>
          </>
        ) : isPending ? (
          <>
            <div className="px-5 sm:px-6 py-4 space-y-2">
              <p className="text-[14px] font-medium text-white">Stripe needs a few more details</p>
              <p className="text-[13px] text-white leading-relaxed">
                Until it has them, invoices go out without a Pay now link. It usually takes a couple
                of minutes: business details, ID and the bank account to pay into.
              </p>
            </div>
            <div className="px-5 sm:px-6 pb-4">
              <PrimaryButton onClick={handleCompleteSetup} disabled={actionLoading} fullWidth>
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Finish setup in Stripe
              </PrimaryButton>
            </div>
          </>
        ) : (
          <>
            <div className="px-5 sm:px-6 pt-4">
              <p className="text-[13px] text-white leading-relaxed">
                Every invoice you send carries a Pay now link. Card payments mark the invoice paid
                and go to this Stripe account.
              </p>
            </div>
            <ListBody>
              <ListRow
                title="Business"
                trailing={
                  <span className="text-[13px] font-medium text-white truncate max-w-[180px]">
                    {status.account?.businessName || 'Your business'}
                  </span>
                }
              />
              <ListRow
                title="Card payments"
                trailing={
                  <Pill tone={status.account?.chargesEnabled ? 'emerald' : 'orange'}>
                    {status.account?.chargesEnabled ? 'On' : 'Off'}
                  </Pill>
                }
              />
              <ListRow
                title="Payouts to your bank"
                trailing={
                  <Pill tone={status.account?.payoutsEnabled ? 'emerald' : 'orange'}>
                    {status.account?.payoutsEnabled ? 'On' : 'Pending'}
                  </Pill>
                }
              />
            </ListBody>
            <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06] space-y-3">
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
                  Open Stripe
                </SecondaryButton>
                <button
                  type="button"
                  onClick={fetchStatus}
                  aria-label="Refresh Stripe status"
                  className="h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] touch-manipulation disabled:opacity-40"
                  disabled={loading}
                >
                  <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowDisconnect(true)}
                className="h-11 w-full text-[13px] font-medium text-white underline underline-offset-4 touch-manipulation"
              >
                Disconnect Stripe
              </button>
              <p className="text-[12px] text-white">{FEE_LINE}</p>
            </div>
          </>
        )}
      </ListCard>

      <Sheet open={showDisconnect} onOpenChange={setShowDisconnect}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
          <SheetShell
            eyebrow="Card payments"
            title="Disconnect Stripe?"
            description="Your Stripe account itself is not closed or deleted."
            footer={
              <>
                <SecondaryButton
                  className="flex-1"
                  onClick={() => setShowDisconnect(false)}
                  disabled={actionLoading}
                >
                  Keep connected
                </SecondaryButton>
                <DestructiveButton
                  className="flex-1"
                  onClick={handleDisconnect}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Unplug className="h-4 w-4 mr-2" />
                  )}
                  Disconnect
                </DestructiveButton>
              </>
            }
          >
            <div className="space-y-3">
              <p className="text-[14px] text-white leading-relaxed">
                Once disconnected, new invoices go out without a Pay now link. Clients can still pay
                by bank transfer using the details on the invoice.
              </p>
              <p className="text-[14px] text-white leading-relaxed">
                Pay now links in invoices you have already sent may stop working. Payments that have
                already gone through are not affected and stay in your Stripe account.
              </p>
              <p className="text-[14px] text-white leading-relaxed">
                You can reconnect at any time from here.
              </p>
            </div>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}
