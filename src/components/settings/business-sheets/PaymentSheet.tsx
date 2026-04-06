import React, { useState, useEffect } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Landmark, Loader2, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { CompanyProfile } from '@/types/company';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
          setStripeStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false });
          setStripeLoading(false);
          return;
        }
        const response = await supabase.functions.invoke('get-stripe-connect-status', {
          headers: { Authorization: `Bearer ${session.session.access_token}` },
        });
        if (response.error) throw response.error;
        setStripeStatus(response.data as StripeConnectStatus);
      } catch {
        setStripeStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false });
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
      if (!session.session) { toast.error('Please log in to connect Stripe'); return; }
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Payment & Banking</h2>
              <p className="text-xs text-white">Stripe Connect and bank details</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            {/* Stripe Connect */}
            <div className="rounded-xl bg-gradient-to-br from-[#635BFF]/10 to-[#635BFF]/5 border border-[#635BFF]/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#635BFF] flex items-center justify-center overflow-hidden">
                    <img loading="lazy" src="/logos/stripe.svg" alt="Stripe" className="h-6 w-auto brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-white">Stripe Payments</p>
                    {stripeLoading ? (
                      <p className="text-[13px] text-white">Checking status...</p>
                    ) : stripeStatus?.status === 'active' ? (
                      <p className="text-[13px] text-green-400 flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> Stripe Connected
                      </p>
                    ) : stripeStatus?.status === 'pending' ? (
                      <p className="text-[13px] text-amber-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> Setup incomplete
                      </p>
                    ) : (
                      <p className="text-[13px] text-white">Accept card payments</p>
                    )}
                  </div>
                </div>
                {stripeStatus?.status === 'active' ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleOpenStripeDashboard}
                    disabled={connecting}
                    className="text-[13px] text-[#635BFF] hover:text-[#7A73FF] hover:bg-[#635BFF]/10"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" /> Dashboard
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleConnectStripe}
                    disabled={connecting || stripeLoading}
                    className="h-10 px-5 text-[13px] bg-[#635BFF] hover:bg-[#7A73FF] text-white rounded-xl"
                  >
                    {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Connect Stripe'}
                  </Button>
                )}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Bank Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-cyan-400" />
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Bank Transfer Details</Label>
              </div>
              <p className="text-[12px] text-white -mt-2">Appears on invoices for clients paying by BACS</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-white uppercase tracking-wider">Account Name</Label>
                  <Input
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                    placeholder="ABC Electrical Ltd"
                    className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-white uppercase tracking-wider">Bank Name</Label>
                  <Input
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                    placeholder="e.g. Barclays"
                    className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-white uppercase tracking-wider">Sort Code</Label>
                  <Input
                    value={bankDetails.sortCode}
                    onChange={(e) => setBankDetails({ ...bankDetails, sortCode: formatSortCode(e.target.value) })}
                    placeholder="12-34-56"
                    className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-white uppercase tracking-wider">Account Number</Label>
                  <Input
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                    placeholder="12345678"
                    className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              {isSaving ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-5 w-5" /> Save</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentSheet;
