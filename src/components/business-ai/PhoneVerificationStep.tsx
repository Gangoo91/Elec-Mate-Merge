import React, { useState, useRef, useEffect } from 'react';
import { Phone, Loader2, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
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
  const [step, setStep] = useState<'enter' | 'otp' | 'done'>('enter');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // UK phone validation: +44 followed by 10 digits
  const isValid = /^\+44\d{10}$/.test(phone.replace(/\s/g, ''));

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSendOtp = async () => {
    if (!user || !isValid) return;

    const cleanPhone = phone.replace(/\s/g, '');
    setSending(true);
    setOtpError(null);

    try {
      // Check for duplicate phone number first
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
        setSending(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-phone-otp', {
        body: { phone_number: cleanPhone },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      setStep('otp');
      setResendCooldown(60);
      setOtpDigits(['', '', '', '', '', '']);
      toast({
        title: 'Code sent',
        description: `We've sent a 6-digit code to ${formatDisplayNumber(cleanPhone)}`,
      });

      // Focus first OTP input after render
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please try again.';
      toast({
        title: 'Failed to send code',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    if (!user) return;

    const cleanPhone = phone.replace(/\s/g, '');
    setVerifying(true);
    setOtpError(null);

    try {
      const { data, error } = await supabase.functions.invoke('verify-phone-otp', {
        body: { phone_number: cleanPhone, code },
      });

      if (error) throw new Error(error.message);

      if (data?.error) {
        setOtpError(data.error);
        // Clear the OTP inputs on failure
        setOtpDigits(['', '', '', '', '', '']);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
        setVerifying(false);
        return;
      }

      if (data?.verified) {
        setVerified(true);
        setStep('done');
        toast({
          title: 'Number verified',
          description: 'Your WhatsApp number has been connected successfully.',
        });

        // Small delay so user sees the success state
        setTimeout(() => onComplete(), 800);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please try again.';
      setOtpError(message);
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } finally {
      setVerifying(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setOtpError(null);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (digit && index === 5) {
      const code = newDigits.join('');
      if (code.length === 6) {
        handleVerifyOtp(code);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newDigits = pasted.split('');
      setOtpDigits(newDigits);
      inputRefs.current[5]?.focus();
      handleVerifyOtp(pasted);
    }
  };

  // Step: OTP input
  if (step === 'otp') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/10">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Enter Verification Code</h3>
            <p className="text-sm text-white">Sent to {formatDisplayNumber(phone)}</p>
          </div>
        </div>

        {/* OTP inputs */}
        <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
          {otpDigits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              disabled={verifying}
              className={`w-11 h-14 text-center text-xl font-bold rounded-xl border-2 bg-white/[0.03] text-white touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                otpError ? 'border-red-500/50' : digit ? 'border-amber-500/50' : 'border-white/20'
              }`}
            />
          ))}
        </div>

        {otpError && <p className="text-sm text-red-400 text-center">{otpError}</p>}

        {verifying && (
          <div className="flex items-center justify-center gap-2 text-sm text-white">
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Button
            onClick={handleSendOtp}
            disabled={resendCooldown > 0 || sending}
            variant="ghost"
            className="w-full h-11 touch-manipulation text-white hover:text-white hover:bg-white/[0.05]"
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : resendCooldown > 0 ? (
              `Resend code (${resendCooldown}s)`
            ) : (
              'Resend code'
            )}
          </Button>
          <Button
            onClick={() => {
              setStep('enter');
              setOtpDigits(['', '', '', '', '', '']);
              setOtpError(null);
            }}
            disabled={verifying}
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

  // Step: Done (success state)
  if (step === 'done') {
    return (
      <div className="space-y-4 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-base font-semibold text-white">Number Verified</h3>
        <p className="text-sm text-white">{formatDisplayNumber(phone)} is connected</p>
      </div>
    );
  }

  // Step: Enter phone number
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
          disabled={sending}
        />
        <p className="text-xs text-white">
          UK mobile number with country code (e.g. +447XXXXXXXXX)
        </p>
      </div>

      <Button
        onClick={handleSendOtp}
        disabled={!isValid || sending}
        className="w-full h-11 touch-manipulation bg-amber-500 hover:bg-amber-600 text-black font-semibold"
      >
        {sending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending code...
          </span>
        ) : (
          'Send Verification Code'
        )}
      </Button>
    </div>
  );
}
