import React, { useState, useEffect } from 'react';
import { CreditCard, Landmark, CheckCircle, Clock, AlertCircle, ExternalLink, Loader2, Zap, ChevronRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CompanyProfile } from '@/types/company';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface StripeConnectStatus {
  connected: boolean;
  status: 'not_connected' | 'pending' | 'active' | 'restricted';
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}

interface PaymentBankingCardProps {
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

const PaymentBankingCard: React.FC<PaymentBankingCardProps> = ({
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<StripeConnectStatus | null>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const [formData, setFormData] = useState({
    accountName: companyProfile?.bank_details?.accountName || '',
    bankName: companyProfile?.bank_details?.bankName || '',
    accountNumber: companyProfile?.bank_details?.accountNumber || '',
    sortCode: companyProfile?.bank_details?.sortCode || '',
  });

  // Check Stripe status
  useEffect(() => {
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
      } catch (error) {
        console.error('Error checking Stripe status:', error);
        setStripeStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false });
      } finally {
        setStripeLoading(false);
      }
    };

    checkStripeStatus();

    // Re-check when window gains focus
    const handleFocus = () => checkStripeStatus();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

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
      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      console.error('Error connecting Stripe:', error);
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

      if (response.data?.url) {
        window.open(response.data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening Stripe dashboard:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave({
      bank_details: formData,
    });
    setIsSaving(false);
    if (success) {
      setShowSuccess(true);
      toast.success('Bank details saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    }
  };

  const handleOpen = () => {
    setFormData({
      accountName: companyProfile?.bank_details?.accountName || '',
      bankName: companyProfile?.bank_details?.bankName || '',
      accountNumber: companyProfile?.bank_details?.accountNumber || '',
      sortCode: companyProfile?.bank_details?.sortCode || '',
    });
    setIsEditing(true);
  };

  const formatSortCode = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
  };

  const maskAccountNumber = (num: string) => {
    if (!num || num.length < 4) return num;
    return `****${num.slice(-4)}`;
  };

  return (
    <>
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <button
          onClick={handleOpen}
          className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="font-semibold text-[15px] text-white">Payment & Banking</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          {/* Stripe Connect Status */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Card Payments</p>
              {stripeLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-white/40" />
                  <span className="text-[15px] text-white/50">Checking...</span>
                </div>
              ) : stripeStatus?.status === 'active' ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-[15px] text-green-400">Stripe Connected</span>
                </div>
              ) : stripeStatus?.status === 'pending' ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span className="text-[15px] text-amber-400">Setup incomplete</span>
                </div>
              ) : stripeStatus?.status === 'restricted' ? (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-[15px] text-red-400">Needs attention</span>
                </div>
              ) : (
                <span className="text-[15px] text-white">Not connected</span>
              )}
            </div>
            {stripeStatus?.status === 'active' && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenStripeDashboard();
                }}
                disabled={connecting}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-[13px] text-white/70 active:bg-white/[0.1] touch-manipulation"
              >
                <ExternalLink className="h-3.5 w-3.5 inline mr-1" />
                Dashboard
              </motion.button>
            )}
          </div>

          {/* Bank Details */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
              <Landmark className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Bank Transfer</p>
              {companyProfile?.bank_details?.accountNumber ? (
                <>
                  <p className="text-[15px] text-white">{companyProfile.bank_details.accountName || 'Account'}</p>
                  <p className="text-[13px] text-white/50">
                    {companyProfile.bank_details.bankName && `${companyProfile.bank_details.bankName} • `}
                    {maskAccountNumber(companyProfile.bank_details.accountNumber)}
                    {companyProfile.bank_details.sortCode && ` • ${companyProfile.bank_details.sortCode}`}
                  </p>
                </>
              ) : (
                <p className="text-[15px] text-white">Not set</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col">
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Bank Details</h2>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-[17px] text-blue-400 font-semibold active:opacity-50 touch-manipulation disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : showSuccess ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                  <Check className="h-5 w-5 text-green-400" />
                </motion.div>
              ) : (
                'Save'
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 pb-8">
            {/* Stripe Connect CTA */}
            {stripeStatus?.status !== 'active' && (
              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnectStripe}
                  disabled={connecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/30 active:bg-indigo-500/25 transition-colors touch-manipulation"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    {connecting ? (
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                    ) : (
                      <Zap className="h-5 w-5 text-indigo-400" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium text-white">Accept Card Payments</p>
                    <p className="text-[13px] text-white/50">Connect Stripe to take payments on invoices</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/30" />
                </motion.button>

                {/* Fee breakdown */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[13px] font-medium text-white/70 mb-3">Payment Processing Fees</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-white/50">Stripe (UK cards)</span>
                      <span className="text-[13px] text-white/70">1.5% + 20p</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-white/50">Elec-Mate</span>
                      <span className="text-[13px] text-white/70">1%</span>
                    </div>
                    <div className="border-t border-white/[0.06] pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-white/70">Total</span>
                        <span className="text-[13px] font-semibold text-white">2.5% + 20p</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/40 mt-3">
                    EU cards: 2.5% + 20p • International: 3.25% + 20p
                  </p>
                </div>
              </div>
            )}

            <p className="text-[13px] text-white/50">
              These details appear on your invoices for customers paying by bank transfer.
            </p>

            {/* Account Name */}
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Account Name
              </Label>
              <Input
                placeholder="ABC Electrical Ltd"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            {/* Bank Name */}
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Bank Name
              </Label>
              <Input
                placeholder="e.g. Lloyds Bank"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
              />
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Account Number
              </Label>
              <Input
                placeholder="12345678"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                inputMode="numeric"
              />
            </div>

            {/* Sort Code */}
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-white/50 uppercase tracking-wide px-1">
                Sort Code
              </Label>
              <Input
                placeholder="12-34-56"
                value={formData.sortCode}
                onChange={(e) => setFormData({ ...formData, sortCode: formatSortCode(e.target.value) })}
                className="h-[50px] text-[17px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                inputMode="numeric"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PaymentBankingCard;
