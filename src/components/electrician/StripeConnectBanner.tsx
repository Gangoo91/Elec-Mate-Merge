import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, X, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface StripeConnectBannerProps {
  className?: string;
  refreshKey?: number;
}

const StripeConnectBanner: React.FC<StripeConnectBannerProps> = ({ className, refreshKey = 0 }) => {
  const [status, setStatus] = useState<'loading' | 'not_connected' | 'pending' | 'active' | 'dismissed'>('loading');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, [refreshKey]);

  const checkStatus = async () => {
    // Check if user dismissed the banner
    const dismissed = localStorage.getItem('stripe_connect_banner_dismissed');
    if (dismissed) {
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

  const handleConnect = async () => {
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

      console.log('Stripe Connect full response:', JSON.stringify(response, null, 2));

      // Handle error responses - try to get details from response body
      if (response.error) {
        // Try to parse the context which might contain the actual error
        let errorDetails = 'Unknown error';
        try {
          // The error context might contain the response body
          if (response.error.context) {
            const body = await response.error.context.json?.() || response.error.context;
            console.error('Error context:', body);
            errorDetails = body?.error || body?.message || response.error.message;
          } else {
            errorDetails = response.error.message;
          }
        } catch (e) {
          errorDetails = response.error.message || 'Failed to connect Stripe';
        }
        console.error('Stripe Connect error details:', errorDetails);
        throw new Error(errorDetails);
      }

      const { url, type } = response.data;
      if (url) {
        if (type === 'dashboard') {
          toast.success('Opening Stripe Dashboard');
          window.open(url, '_blank');
        } else {
          // Redirect to Stripe onboarding - will return to same page with ?stripe=success
          window.location.href = url;
        }
      }
    } catch (error: any) {
      console.error('Error connecting Stripe:', error);
      // Check if this is a platform setup message (not a real error for users)
      if (error.message?.includes('coming soon') || error.message?.includes('being set up')) {
        toast.info(error.message);
      } else {
        toast.error(error.message || 'Failed to connect Stripe');
      }
    } finally {
      setConnecting(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('stripe_connect_banner_dismissed', 'true');
    setStatus('dismissed');
  };

  // Don't show if loading, active, or dismissed
  if (status === 'loading' || status === 'active' || status === 'dismissed') {
    return null;
  }

  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden",
      status === 'pending'
        ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/20"
        : "bg-gradient-to-r from-indigo-500/15 to-purple-500/10 border border-indigo-500/20",
      className
    )}>
      <div className="flex items-center gap-3 p-3 pr-10">
        <div className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
          status === 'pending' ? "bg-amber-500/20" : "bg-indigo-500/20"
        )}>
          <CreditCard className={cn(
            "h-5 w-5",
            status === 'pending' ? "text-amber-400" : "text-indigo-400"
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {status === 'pending'
              ? 'Finish Stripe setup'
              : 'Enable card payments'}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {status === 'pending'
              ? 'Complete setup to accept payments'
              : 'Let clients pay invoices online'}
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] touch-manipulation whitespace-nowrap",
            status === 'pending'
              ? "bg-amber-500 hover:bg-amber-600 text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          )}
        >
          {connecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {status === 'pending' ? 'Continue' : 'Enable'}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default StripeConnectBanner;
