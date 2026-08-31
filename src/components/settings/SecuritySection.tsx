import React, { useEffect, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from './SettingsSheetContent';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { ActionRow, ToggleRow, SettingsCard } from './rows';

interface SecuritySectionProps {
  eyebrow: string;
}

const SecuritySection = ({ eyebrow }: SecuritySectionProps) => {
  const { user } = useAuth();

  // Account security — password change + global sign-out
  const [showChangePasswordSheet, setShowChangePasswordSheet] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [signingOutAll, setSigningOutAll] = useState(false);

  const handleChangePassword = async () => {
    if (passwordChanging) return;
    if (newPassword.length < 8) {
      setPasswordChangeError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }
    setPasswordChanging(true);
    setPasswordChangeError(null);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordChanging(false);
    if (error) {
      setPasswordChangeError(error.message);
      return;
    }
    setShowChangePasswordSheet(false);
    toast.success('Password updated');
  };

  const handleSignOutAllDevices = async () => {
    if (signingOutAll) return;
    setSigningOutAll(true);
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) {
      setSigningOutAll(false);
      toast.error('Could not sign out everywhere', { description: error.message });
    }
    // On success the auth listener redirects to login — no local cleanup needed here.
  };

  // Biometric auth
  const biometric = useBiometricAuth();
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);
  const [biometricPassword, setBiometricPassword] = useState('');
  const [showBioPassword, setShowBioPassword] = useState(false);
  const [biometricVerifying, setBiometricVerifying] = useState(false);
  const [biometricError, setBiometricError] = useState<string | null>(null);

  const handleBiometricToggle = async (enabled: boolean) => {
    if (!enabled) {
      await biometric.disableBiometric();
      toast.success(`${biometric.biometricType} login disabled`);
    } else {
      setBiometricPassword('');
      setBiometricError(null);
      setShowPasswordSheet(true);
    }
  };

  const handleBiometricPasswordSubmit = async () => {
    if (!biometricPassword || !user?.email) return;
    setBiometricVerifying(true);
    setBiometricError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: biometricPassword,
      });

      if (error) {
        setBiometricError('Incorrect password. Please try again.');
        setBiometricVerifying(false);
        return;
      }

      await biometric.enableBiometric(user.email, biometricPassword);
      setShowPasswordSheet(false);
      setBiometricPassword('');
      toast.success(`${biometric.biometricType} login enabled`);
    } catch {
      setBiometricError('Something went wrong. Please try again.');
    } finally {
      setBiometricVerifying(false);
    }
  };

  // Two-factor authentication (TOTP via Supabase MFA)
  const [totpFactorId, setTotpFactorId] = useState<string | null>(null);
  const [mfaLoading, setMfaLoading] = useState(true);
  const [showEnrollSheet, setShowEnrollSheet] = useState(false);
  const [enrollQr, setEnrollQr] = useState('');
  const [enrollSecret, setEnrollSecret] = useState('');
  const [enrollFactorId, setEnrollFactorId] = useState('');
  const [enrollCode, setEnrollCode] = useState('');
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [enrollBusy, setEnrollBusy] = useState(false);
  const [confirmDisable2fa, setConfirmDisable2fa] = useState(false);

  const loadFactors = React.useCallback(async () => {
    const { data } = await supabase.auth.mfa.listFactors();
    const verified = data?.totp?.find((f) => f.status === 'verified');
    setTotpFactorId(verified?.id ?? null);
    setMfaLoading(false);
  }, []);

  useEffect(() => {
    loadFactors();
  }, [loadFactors]);

  const startEnroll = async () => {
    setEnrollError(null);
    setEnrollCode('');
    setEnrollBusy(true);
    try {
      // Clear any abandoned unverified factor first — Supabase blocks a second
      // enrolment while one is pending.
      const { data: existing } = await supabase.auth.mfa.listFactors();
      for (const f of existing?.totp ?? []) {
        if (f.status !== 'verified') await supabase.auth.mfa.unenroll({ factorId: f.id });
      }
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Elec-Mate',
      });
      if (error) throw error;
      setEnrollFactorId(data.id);
      setEnrollQr(data.totp.qr_code);
      setEnrollSecret(data.totp.secret);
      setShowEnrollSheet(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not start 2FA setup');
    } finally {
      setEnrollBusy(false);
    }
  };

  const verifyEnroll = async () => {
    if (enrollCode.trim().length !== 6) {
      setEnrollError('Enter the 6-digit code from your authenticator app.');
      return;
    }
    setEnrollBusy(true);
    setEnrollError(null);
    try {
      const { data: challenge, error: chErr } = await supabase.auth.mfa.challenge({
        factorId: enrollFactorId,
      });
      if (chErr) throw chErr;
      const { error: vErr } = await supabase.auth.mfa.verify({
        factorId: enrollFactorId,
        challengeId: challenge.id,
        code: enrollCode.trim(),
      });
      if (vErr) throw vErr;
      setShowEnrollSheet(false);
      await loadFactors();
      toast.success('Two-factor authentication enabled');
    } catch (e) {
      setEnrollError(
        e instanceof Error && /invalid/i.test(e.message)
          ? "That code didn't match — check your authenticator app and try again."
          : e instanceof Error
            ? e.message
            : 'Verification failed'
      );
    } finally {
      setEnrollBusy(false);
    }
  };

  const cancelEnroll = async () => {
    setShowEnrollSheet(false);
    if (enrollFactorId) {
      await supabase.auth.mfa.unenroll({ factorId: enrollFactorId }).catch(() => {});
    }
  };

  const disable2fa = async () => {
    if (!totpFactorId) return;
    if (!confirmDisable2fa) {
      setConfirmDisable2fa(true);
      setTimeout(() => setConfirmDisable2fa(false), 4000);
      return;
    }
    const { error } = await supabase.auth.mfa.unenroll({ factorId: totpFactorId });
    if (error) {
      toast.error(error.message);
      return;
    }
    setConfirmDisable2fa(false);
    await loadFactors();
    toast.success('Two-factor authentication disabled');
  };

  return (
    <motion.section variants={itemVariants} className="h-full">
      <SettingsCard eyebrow={eyebrow} title="Security">
        <ActionRow
          label="Password"
          subtitle="Change your account password"
          actionLabel="Change"
          onAction={() => {
            setNewPassword('');
            setConfirmPassword('');
            setPasswordChangeError(null);
            setShowChangePasswordSheet(true);
          }}
        />
        <ActionRow
          label="Two-Factor Authentication"
          subtitle={
            mfaLoading
              ? 'Checking…'
              : totpFactorId
                ? 'On — an authenticator code is required at sign-in'
                : 'Add an authenticator app code at sign-in'
          }
          actionLabel={
            mfaLoading
              ? '…'
              : totpFactorId
                ? confirmDisable2fa
                  ? 'Tap to confirm'
                  : 'Turn off'
                : enrollBusy
                  ? 'Starting…'
                  : 'Set up'
          }
          onAction={() => (totpFactorId ? disable2fa() : startEnroll())}
          disabled={mfaLoading || enrollBusy}
          destructive={!!totpFactorId}
        />
        <ActionRow
          label="Sign Out All Devices"
          subtitle="Ends every session, including this one"
          actionLabel={signingOutAll ? 'Signing out…' : 'Sign out'}
          onAction={handleSignOutAllDevices}
          disabled={signingOutAll}
          destructive
        />
        {biometric.isAvailable && (
          <ToggleRow
            label={`${biometric.biometricType} Login`}
            subtitle="Unlock with biometrics"
            checked={biometric.isEnabled}
            onCheckedChange={handleBiometricToggle}
            disabled={biometric.isChecking}
          />
        )}
      </SettingsCard>

      {/* ── 2FA ENROL SHEET ── */}
      <Sheet open={showEnrollSheet} onOpenChange={(v) => !v && cancelEnroll()}>
        <SettingsSheetContent mobileAuto className="bg-[hsl(0_0%_12%)]">
          <div className="flex flex-col px-6 pt-8 pb-10 gap-5 max-w-md mx-auto w-full">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Set up two-factor authentication
              </h2>
              <p className="text-[13px] text-white/75 leading-relaxed">
                Scan the code with Google Authenticator, 1Password, Authy or any authenticator
                app, then enter the 6-digit code it shows.
              </p>
            </div>

            {enrollQr && (
              <div className="mx-auto rounded-2xl bg-white p-3">
                <img src={enrollQr} alt="Authenticator QR code" className="h-44 w-44" />
              </div>
            )}

            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(enrollSecret);
                toast.success('Secret copied — paste it into your authenticator app');
              }}
              className="mx-auto text-[11.5px] text-white/70 hover:text-white touch-manipulation min-h-[44px] px-3"
            >
              Can't scan? Copy the secret key instead
            </button>

            {enrollError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-[13px] text-red-400 text-center">{enrollError}</p>
              </div>
            )}

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={enrollCode}
              onChange={(e) => setEnrollCode(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && verifyEnroll()}
              placeholder="123456"
              className={cn(
                'w-full h-14 px-4 rounded-xl text-center tracking-[0.5em] text-[20px] font-semibold tabular-nums',
                'bg-white/[0.08] border text-white placeholder:text-white/40 placeholder:tracking-[0.5em]',
                'outline-none transition-all border-white/[0.16] focus:border-elec-yellow/60'
              )}
            />

            <Button
              onClick={verifyEnroll}
              disabled={enrollBusy || enrollCode.length !== 6}
              className="h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              {enrollBusy ? 'Verifying…' : 'Verify & enable'}
            </Button>
          </div>
        </SettingsSheetContent>
      </Sheet>

      {/* ── CHANGE PASSWORD SHEET ── */}
      <Sheet
        open={showChangePasswordSheet}
        onOpenChange={(v) => !v && setShowChangePasswordSheet(false)}
      >
        <SettingsSheetContent mobileAuto className="bg-[hsl(0_0%_12%)]">
          <div className="flex flex-col px-6 pt-8 pb-10 gap-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-white tracking-tight">Change password</h2>
              <p className="text-[13px] text-white leading-relaxed">
                At least 8 characters. You stay signed in on this device.
              </p>
            </div>

            {passwordChangeError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-[13px] text-red-400 text-center">{passwordChangeError}</p>
              </div>
            )}

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              autoComplete="new-password"
              className={cn(
                'w-full h-12 px-4 rounded-xl',
                'bg-white/[0.06] border text-white placeholder:text-white/50 [color-scheme:dark]',
                'text-[15px] outline-none transition-all',
                'border-white/[0.08] focus:border-elec-yellow/50'
              )}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              onKeyDown={(e) => e.key === 'Enter' && handleChangePassword()}
              className={cn(
                'w-full h-12 px-4 rounded-xl',
                'bg-white/[0.06] border text-white placeholder:text-white/50 [color-scheme:dark]',
                'text-[15px] outline-none transition-all',
                'border-white/[0.08] focus:border-elec-yellow/50'
              )}
            />

            <Button
              onClick={handleChangePassword}
              disabled={passwordChanging || !newPassword || !confirmPassword}
              className="h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              {passwordChanging ? 'Updating…' : 'Update Password'}
            </Button>
          </div>
        </SettingsSheetContent>
      </Sheet>

      {/* ── BIOMETRIC PASSWORD CONFIRM SHEET ── */}
      <Sheet open={showPasswordSheet} onOpenChange={(v) => !v && setShowPasswordSheet(false)}>
        <SettingsSheetContent mobileAuto className="bg-[hsl(0_0%_12%)]">
          <div className="flex flex-col px-6 pt-8 pb-10 gap-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Confirm your password
              </h2>
              <p className="text-[13px] text-white leading-relaxed">
                Enter your password to enable {biometric.biometricType} login.
              </p>
            </div>

            {biometricError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-[13px] text-red-400 text-center">{biometricError}</p>
              </div>
            )}

            <div className="relative">
              <input
                type={showBioPassword ? 'text' : 'password'}
                value={biometricPassword}
                onChange={(e) => setBiometricPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                onKeyDown={(e) => e.key === 'Enter' && handleBiometricPasswordSubmit()}
                className={cn(
                  'w-full h-12 px-4 pr-14 rounded-xl',
                  'bg-white/[0.06] border text-white placeholder:text-white/50 [color-scheme:dark]',
                  'text-[15px] outline-none transition-all',
                  'border-white/[0.08] focus:border-elec-yellow/50'
                )}
              />
              <button
                type="button"
                onClick={() => setShowBioPassword(!showBioPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-11 px-3 flex items-center justify-center text-[12px] font-medium text-white hover:text-white touch-manipulation rounded-lg"
              >
                {showBioPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <Button
              onClick={handleBiometricPasswordSubmit}
              disabled={biometricVerifying || !biometricPassword}
              className="w-full h-12 rounded-full text-[14px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
            >
              {biometricVerifying ? 'Verifying…' : `Enable ${biometric.biometricType}`}
            </Button>
          </div>
        </SettingsSheetContent>
      </Sheet>
    </motion.section>
  );
};

export default SecuritySection;
