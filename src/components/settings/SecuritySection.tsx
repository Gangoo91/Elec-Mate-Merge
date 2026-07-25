import React, { useState } from 'react';
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
              className="w-full h-12 rounded-full text-[14px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation disabled:opacity-50"
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
