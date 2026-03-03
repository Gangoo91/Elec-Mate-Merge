import React, { useState } from 'react';
import { Phone, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PhoneVerificationStepProps {
  onComplete: () => void;
  currentNumber?: string | null;
}

function formatDisplayNumber(phone: string): string {
  const clean = phone.replace(/\s/g, '');
  if (clean.length === 13 && clean.startsWith('+44')) {
    return `+44 ${clean.slice(3, 7)} ${clean.slice(7)}`;
  }
  return clean;
}

export function PhoneVerificationStep({ onComplete, currentNumber }: PhoneVerificationStepProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState(currentNumber || '+44');
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // UK phone validation: +44 followed by 10 digits
  const isValid = /^\+44\d{10}$/.test(phone.replace(/\s/g, ''));

  const handleConfirm = async () => {
    if (!user || !isValid) return;

    const cleanPhone = phone.replace(/\s/g, '');

    setSaving(true);
    try {
      // Check for duplicate phone number
      const { data: existing, error: lookupError } = await supabase
        .from('phone_number_routing')
        .select('user_id')
        .eq('phone_number', cleanPhone)
        .neq('user_id', user.id)
        .maybeSingle();

      if (lookupError) throw lookupError;

      if (existing) {
        toast({
          title: 'Number already in use',
          description:
            'This WhatsApp number is already linked to another account. Please use a different number.',
          variant: 'destructive',
        });
        setStep('enter');
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          agent_whatsapp_number: cleanPhone,
          agent_phone_verified: true,
          agent_phone_verified_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSaved(true);
      toast({
        title: 'WhatsApp number saved',
        description: 'Your number has been connected successfully.',
      });

      // Small delay so user sees the success state
      setTimeout(() => onComplete(), 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please try again.';
      toast({
        title: 'Failed to save number',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/10">
            <Phone className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Confirm Your Number</h3>
            <p className="text-sm text-white">
              Make sure this is correct — Mate will message you here
            </p>
          </div>
        </div>

        <div className="glass-premium rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-white tracking-wide">
            {formatDisplayNumber(phone)}
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleConfirm}
            disabled={saving || saved}
            className="w-full h-11 touch-manipulation bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            {saved ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Connected
              </span>
            ) : saving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "That's correct"
            )}
          </Button>
          <Button
            onClick={() => setStep('enter')}
            disabled={saving || saved}
            variant="ghost"
            className="w-full h-11 touch-manipulation text-white hover:text-white hover:bg-white/[0.05]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Change number
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-amber-500/10">
          <Phone className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Connect WhatsApp</h3>
          <p className="text-sm text-white">Enter the WhatsApp number Mate should message you on</p>
        </div>
      </div>

      <div className="space-y-3">
        <Input
          type="tel"
          placeholder="+44 7XXX XXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
          disabled={saving || saved}
        />
        <p className="text-xs text-white">
          UK mobile number with country code (e.g. +447507241303)
        </p>
      </div>

      <Button
        onClick={() => setStep('confirm')}
        disabled={!isValid}
        className="w-full h-11 touch-manipulation bg-amber-500 hover:bg-amber-600 text-black font-semibold"
      >
        Continue
      </Button>
    </div>
  );
}
