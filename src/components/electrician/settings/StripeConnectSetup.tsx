import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from "framer-motion";
import {
  CreditCard,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  ArrowRight,
  Banknote,
  Shield,
} from "lucide-react";

interface StripeConnectStatus {
  connected: boolean;
  status: 'not_connected' | 'pending' | 'active' | 'restricted';
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  accountId?: string;
  requirements?: string[];
  disabledReason?: string | null;
}

const StripeConnectSetup: React.FC = () => {
  const [status, setStatus] = useState<StripeConnectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      setLoading(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        setStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false, detailsSubmitted: false });
        return;
      }

      const response = await supabase.functions.invoke('get-stripe-connect-status', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (response.error) throw response.error;

      setStatus(response.data as StripeConnectStatus);
    } catch (error: any) {
      console.error('Error checking Stripe status:', error);
      setStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false, detailsSubmitted: false });
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStripe = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        toast.error('Please log in to connect Stripe');
        return;
      }

      const response = await supabase.functions.invoke('create-stripe-connect-account', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (response.error) throw response.error;

      const { url, type } = response.data;

      if (url) {
        if (type === 'dashboard') {
          toast.success('Opening Stripe Dashboard');
        } else {
          toast.success('Redirecting to Stripe onboarding...');
        }
        window.open(url, '_blank');
      }
    } catch (error: any) {
      console.error('Error connecting Stripe:', error);
      toast.error(error.message || 'Failed to connect Stripe');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 p-6">
        <div className="flex items-center justify-center gap-3 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Checking payment setup...</span>
        </div>
      </div>
    );
  }

  // Not connected state
  if (!status?.connected || status.status === 'not_connected') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 overflow-hidden"
      >
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Banknote className="h-7 w-7 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Accept Card Payments</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Let your clients pay invoices online with secure card payments via Stripe.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    Direct to your bank
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-blue-400" />
                    Secure payments
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs text-muted-foreground">
                    <CreditCard className="h-3 w-3 text-purple-400" />
                    All major cards
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConnectStripe}
              disabled={connecting}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold whitespace-nowrap"
            >
              {connecting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              Connect with Stripe
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-muted-foreground">
              <strong>Fees:</strong> ~4% per transaction (2.9% Stripe + 1.1% platform fee). You receive payment within 2-7 business days.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Pending state
  if (status.status === 'pending') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-amber-500/10 border border-amber-500/20 overflow-hidden"
      >
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="h-7 w-7 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Stripe Setup In Progress</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete your Stripe onboarding to start accepting card payments.
                </p>
                {status.requirements && status.requirements.length > 0 && (
                  <p className="text-xs text-amber-400 mt-2">
                    {status.requirements.length} step(s) remaining
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleConnectStripe}
              disabled={connecting}
              variant="outline"
              className="border-amber-500/30 hover:bg-amber-500/10 whitespace-nowrap"
            >
              {connecting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4 mr-2" />
              )}
              Continue Setup
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Restricted state
  if (status.status === 'restricted') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-red-500/10 border border-red-500/20 overflow-hidden"
      >
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Stripe Account Restricted</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your Stripe account needs attention. Please update your information to continue accepting payments.
                </p>
                {status.disabledReason && (
                  <p className="text-xs text-red-400 mt-2">
                    Reason: {status.disabledReason}
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleConnectStripe}
              disabled={connecting}
              variant="outline"
              className="border-red-500/30 hover:bg-red-500/10 whitespace-nowrap"
            >
              {connecting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4 mr-2" />
              )}
              Fix Issues
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Active state
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-green-500/10 border border-green-500/20 overflow-hidden"
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-7 w-7 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Card Payments Active</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your Stripe account is fully set up. Clients can pay invoices with card payments.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Charges enabled
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Payouts enabled
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleConnectStripe}
            disabled={connecting}
            variant="outline"
            className="border-green-500/30 hover:bg-green-500/10 whitespace-nowrap"
          >
            {connecting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4 mr-2" />
            )}
            Open Dashboard
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StripeConnectSetup;
