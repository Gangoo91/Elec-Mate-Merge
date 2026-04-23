import React, { useEffect, useState } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CompanyProfile } from '@/types/company';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
}

interface StripeConnectStatus {
  connected: boolean;
  status: 'not_connected' | 'pending' | 'active' | 'restricted';
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}

interface PaymentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const formatSortCode = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 6);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

const PaymentSheet = ({ open, onOpenChange, profile, onSave }: PaymentSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: '',
    bankName: '',
    accountNumber: '',
    sortCode: '',
  });
  const [stripeStatus, setStripeStatus] = useState<StripeConnectStatus | null>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (profile && open) {
      setBankDetails({
        accountName: profile.bank_details?.accountName || '',
        bankName: profile.bank_details?.bankName || '',
        accountNumber: profile.bank_details?.accountNumber || '',
        sortCode: profile.bank_details?.sortCode || '',
      });
    }
  }, [profile, open]);

  useEffect(() => {
    if (!open) return;
    const checkStripeStatus = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          setStripeStatus({
            connected: false,
            status: 'not_connected',
            chargesEnabled: false,
            payoutsEnabled: false,
          });
          setStripeLoading(false);
          return;
        }
        const response = await supabase.functions.invoke('get-stripe-connect-status', {
          headers: { Authorization: `Bearer ${session.session.access_token}` },
        });
        if (response.error) throw response.error;
        setStripeStatus(response.data as StripeConnectStatus);
      } catch {
        setStripeStatus({
          connected: false,
          status: 'not_connected',
          chargesEnabled: false,
          payoutsEnabled: false,
        });
      } finally {
        setStripeLoading(false);
      }
    };
    checkStripeStatus();
  }, [open]);

  const handleConnectStripe = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast.error('Please log in to connect Stripe');
        return;
      }
      const response = await supabase.functions.invoke('stripe-connect-oauth', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { action: 'get_oauth_url', returnUrl: window.location.href },
      });
      if (response.error) throw response.error;
      if (response.data?.url) await openExternalUrl(response.data.url);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to connect Stripe');
    } finally {
      setConnecting(false);
    }
  };

  const handleOpenStripeDashboard = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;
      const response = await supabase.functions.invoke('create-stripe-connect-account', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { returnUrl: window.location.href },
      });
      if (response.data?.url) await openExternalUrl(response.data.url);
    } catch {
      toast.error('Failed to open Stripe dashboard');
    } finally {
      setConnecting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({ bank_details: bankDetails });
      if (success) {
        toast.success('Payment details saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Finance</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Payment & banking
            </h2>
            <p className="mt-1 text-[13px] text-white">Stripe Connect and bank details</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            {/* Stripe Connect */}
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#635BFF] flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      loading="lazy"
                      src="/logos/stripe.svg"
                      alt="Stripe"
                      className="h-6 w-auto brightness-0 invert"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">Stripe payments</p>
                    {stripeLoading ? (
                      <p className="text-[12.5px] text-white/65">Checking status…</p>
                    ) : stripeStatus?.status === 'active' ? (
                      <div className="mt-0.5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                          Connected
                        </span>
                      </div>
                    ) : stripeStatus?.status === 'pending' ? (
                      <div className="mt-0.5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-400">
                          Setup incomplete
                        </span>
                      </div>
                    ) : (
                      <p className="text-[12.5px] text-white/65">Accept card payments</p>
                    )}
                  </div>
                </div>
                {stripeStatus?.status === 'active' ? (
                  <button
                    type="button"
                    onClick={handleOpenStripeDashboard}
                    disabled={connecting}
                    className="h-11 px-4 rounded-xl border border-white/[0.08] bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation disabled:opacity-50 shrink-0"
                  >
                    Dashboard <span aria-hidden>↗</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConnectStripe}
                    disabled={connecting || stripeLoading}
                    className="h-11 px-5 rounded-xl bg-[#635BFF] hover:bg-[#7A73FF] text-white text-[13px] font-semibold transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    {connecting ? 'Working…' : 'Connect Stripe'}
                  </button>
                )}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Bank details */}
            <div className="space-y-4">
              <div>
                <Eyebrow>Bank transfer details</Eyebrow>
                <p className="mt-1.5 text-[12.5px] text-white">
                  Appears on invoices for clients paying by BACS
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Account name</Label>
                  <Input
                    value={bankDetails.accountName}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, accountName: e.target.value })
                    }
                    placeholder="ABC Electrical Ltd"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Bank name</Label>
                  <Input
                    value={bankDetails.bankName}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, bankName: e.target.value })
                    }
                    placeholder="e.g. Barclays"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Sort code</Label>
                  <Input
                    value={bankDetails.sortCode}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, sortCode: formatSortCode(e.target.value) })
                    }
                    placeholder="12-34-56"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Account number</Label>
                  <Input
                    value={bankDetails.accountNumber}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        accountNumber: e.target.value.replace(/\D/g, '').slice(0, 8),
                      })
                    }
                    placeholder="12345678"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentSheet;
