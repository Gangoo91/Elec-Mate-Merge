import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, X, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { openExternalUrl } from '@/utils/open-external-url';
import { storageGetSync, storageSetSync } from '@/utils/storage';

interface StripeConnectBannerProps {
  className?: string;
  refreshKey?: number;
  /** Total unpaid £ across invoices — makes the pitch concrete. */
  outstandingAmount?: number;
}

const StripeConnectBanner: React.FC<StripeConnectBannerProps> = ({ className, refreshKey = 0, outstandingAmount = 0 }) => {
  const [status, setStatus] = useState<
    'loading' | 'not_connected' | 'pending' | 'active' | 'dismissed'
  >('loading');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, [refreshKey]);

  const checkStatus = async () => {
    // Dismiss = snooze, not kill. (The old permanent-dismiss key is retired
    // deliberately — one X months ago shouldn't hide card payments forever.)
    const snoozedUntil = storageGetSync('stripe_connect_banner_snooze_until');
    if (snoozedUntil && new Date(snoozedUntil) > new Date()) {
      setStatus('dismissed');
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        setStatus('dismissed');
        return;
      }

      // Call edge function to check actual Stripe status and sync database
      const { data, error } = await supabase.functions.invoke('get-stripe-connect-status', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking Stripe status via edge function:', error);
        // Fallback to database read
        const { data: profile } = await supabase
          .from('company_profiles')
          .select('stripe_account_id, stripe_account_status')
          .eq('user_id', session.session.user.id)
          .single();

        if (profile?.stripe_account_status === 'active') {
          setStatus('active');
        } else if (profile?.stripe_account_id) {
          setStatus('pending');
        } else {
          setStatus('not_connected');
        }
        return;
      }

      // Edge function syncs with Stripe and updates DB
      if (data?.status === 'active') {
        setStatus('active');
      } else if (data?.connected) {
        setStatus('pending');
      } else {
        setStatus('not_connected');
      }
    } catch (error) {
      console.error('Error checking Stripe status:', error);
      setStatus('dismissed');
    }
  };

  // Connect existing Stripe via OAuth (instant)
  const handleConnectOAuth = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        toast.error('Please log in first');
        return;
      }

      const response = await supabase.functions.invoke('stripe-connect-oauth', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: {
          action: 'get_oauth_url',
          returnUrl: window.location.href,
        },
      });

      if (response.error) throw response.error;

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      const { url } = response.data || {};
      if (url) {
        await openExternalUrl(url);
      }
    } catch (error: any) {
      console.error('Error connecting Stripe OAuth:', error);
      toast.error(error.message || 'Failed to connect Stripe');
    } finally {
      setConnecting(false);
    }
  };

  // Create new Express account (for users without Stripe)
  const handleConnectExpress = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        toast.error('Please log in first');
        return;
      }

      const response = await supabase.functions.invoke('create-stripe-connect-account', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: { returnUrl: window.location.href },
      });

      if (response.error) {
        const errorDetails = response.error.message || 'Failed to connect Stripe';
        throw new Error(errorDetails);
      }

      const { url, type } = response.data;
      if (url) {
        if (type === 'dashboard') {
          toast.success('Opening Stripe Dashboard');
        }
        await openExternalUrl(url);
      }
    } catch (error: any) {
      console.error('Error connecting Stripe:', error);
      if (error.message?.includes('coming soon') || error.message?.includes('being set up')) {
        toast.info(error.message);
      } else {
        toast.error(error.message || 'Failed to connect Stripe');
      }
    } finally {
      setConnecting(false);
    }
  };

  const handleConnect = handleConnectOAuth; // Default to OAuth for existing accounts

  const handleDismiss = () => {
    const until = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    storageSetSync('stripe_connect_banner_snooze_until', until);
    setStatus('dismissed');
  };

  // Don't show if loading, active, or dismissed
  if (status === 'loading' || status === 'active' || status === 'dismissed') {
    return null;
  }

  const hasOutstanding = outstandingAmount > 0;
  const fmtMoney = (n: number) =>
    `£${n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden',
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-14 bg-gradient-to-b to-transparent pointer-events-none',
          status === 'pending' ? 'from-amber-500/[0.10]' : 'from-elec-yellow/[0.08]'
        )}
      />
      <div className="relative flex items-center gap-3 p-3.5 pr-10">
        <div
          className={cn(
            'h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 border',
            status === 'pending'
              ? 'bg-amber-500/[0.12] border-amber-500/[0.2]'
              : 'bg-elec-yellow/[0.12] border-elec-yellow/[0.2]'
          )}
        >
          <CreditCard
            className={cn('h-5 w-5', status === 'pending' ? 'text-amber-400' : 'text-elec-yellow')}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-white">
            {status === 'pending'
              ? 'Finish Stripe setup — you\u2019re minutes away'
              : hasOutstanding
                ? `${fmtMoney(outstandingAmount)} waiting to be paid`
                : 'Get paid by card'}
          </p>
          <p className="text-[12px] text-white/60 mt-0.5">
            {status === 'pending'
              ? 'Complete setup and every invoice gets a Pay now button'
              : 'Card and Apple Pay on every invoice — clients pay the same day'}
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className={cn(
            'flex items-center gap-1.5 px-4 h-11 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.97] touch-manipulation whitespace-nowrap',
            status === 'pending'
              ? 'bg-amber-500 hover:bg-amber-400 text-black'
              : 'bg-elec-yellow hover:bg-elec-yellow/90 text-black'
          )}
        >
          {connecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {status === 'pending' ? 'Continue' : 'Set up'}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Snooze (14 days) */}
      <button
        onClick={handleDismiss}
        aria-label="Hide for two weeks"
        className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-3.5 w-3.5 text-white/60" />
      </button>
    </div>
  );
};

export default StripeConnectBanner;
