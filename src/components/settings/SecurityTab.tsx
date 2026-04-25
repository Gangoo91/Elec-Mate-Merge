import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  ListCard,
  ListRow,
  SectionHeader,
  Eyebrow,
  TextAction,
  containerVariants,
  itemVariants,
  toneText,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface SecurityDevice {
  id: string;
  name: string;
  kind: 'desktop' | 'mobile';
  location: string;
  lastActive: string;
  current: boolean;
}

const SecurityTab = () => {
  const { addNotification } = useNotifications();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    securityUpdates: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const devices: SecurityDevice[] = [
    {
      id: '1',
      name: 'Windows PC',
      kind: 'desktop',
      location: 'London, UK',
      lastActive: 'Active now',
      current: true,
    },
    {
      id: '2',
      name: 'iPhone 14',
      kind: 'mobile',
      location: 'London, UK',
      lastActive: '2 hours ago',
      current: false,
    },
  ];

  const handleSecurityChange = (key: keyof typeof securitySettings, value: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }));
    addNotification({
      title: 'Security Setting Updated',
      message: `${
        key === 'twoFactorAuth'
          ? 'Two-factor authentication'
          : key === 'loginNotifications'
            ? 'Login notifications'
            : 'Security updates'
      } ${value ? 'enabled' : 'disabled'}`,
      type: 'success',
    });
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addNotification({
        title: 'Password Mismatch',
        message: 'New passwords do not match',
        type: 'info',
      });
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      addNotification({
        title: 'Password Too Short',
        message: 'Password must be at least 8 characters',
        type: 'info',
      });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addNotification({
      title: 'Password Updated',
      message: 'Your password has been changed successfully',
      type: 'success',
    });
  };

  const handleSignOutDevice = (_deviceId: string) => {
    addNotification({
      title: 'Device Signed Out',
      message: 'The device has been signed out of your account',
      type: 'info',
    });
  };

  const handleSignOutAllDevices = () => {
    addNotification({
      title: 'All Devices Signed Out',
      message: 'All other devices have been signed out',
      type: 'info',
    });
  };

  const securityScore = securitySettings.twoFactorAuth
    ? 100
    : securitySettings.loginNotifications
      ? 70
      : 40;

  const scoreTone: Tone =
    securityScore >= 80 ? 'green' : securityScore >= 50 ? 'amber' : 'red';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Security overview */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="01" title="Security Score" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Eyebrow>Overall</Eyebrow>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-semibold text-white tabular-nums">
                  {securityScore}%
                </span>
                <span
                  className={cn(
                    'text-[11px] font-medium uppercase tracking-[0.15em]',
                    toneText[scoreTone]
                  )}
                >
                  {securityScore >= 80
                    ? 'Strong'
                    : securityScore >= 50
                      ? 'Moderate'
                      : 'Weak'}
                </span>
              </div>
              <p className="mt-2 text-[13px] text-white leading-relaxed max-w-md">
                {securityScore >= 80
                  ? 'Your account is well protected.'
                  : securityScore >= 50
                    ? 'Your account security could be improved.'
                    : 'Your account needs better protection.'}
              </p>
            </div>
          </div>
          <div className="mt-4 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                scoreTone === 'green'
                  ? 'bg-green-400'
                  : scoreTone === 'amber'
                    ? 'bg-amber-400'
                    : 'bg-red-400'
              }`}
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </div>

        {!securitySettings.twoFactorAuth && (
          <div className="bg-[hsl(0_0%_12%)] border border-amber-500/20 rounded-2xl p-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400">
                Recommended
              </span>
              <div className="mt-2 text-[15px] font-medium text-white">
                Enable Two-Factor Authentication
              </div>
              <p className="mt-1 text-[12.5px] text-white leading-relaxed">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Button
              onClick={() => handleSecurityChange('twoFactorAuth', true)}
              className="h-11 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold touch-manipulation shrink-0"
            >
              Enable
            </Button>
          </div>
        )}
      </motion.section>

      {/* Security settings */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="02" title="Security Settings" />
        <ListCard>
          <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium text-white truncate">
                Two-Factor Authentication
              </div>
              <div className="mt-0.5 text-[11.5px] text-white/65 truncate">
                Secure your account with a verification code
              </div>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
            />
          </div>
          <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium text-white truncate">
                Login Notifications
              </div>
              <div className="mt-0.5 text-[11.5px] text-white/65 truncate">
                Get notified of new login attempts
              </div>
            </div>
            <Switch
              checked={securitySettings.loginNotifications}
              onCheckedChange={(checked) => handleSecurityChange('loginNotifications', checked)}
            />
          </div>
          <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium text-white truncate">Security Updates</div>
              <div className="mt-0.5 text-[11.5px] text-white/65 truncate">
                Receive emails about security enhancements
              </div>
            </div>
            <Switch
              checked={securitySettings.securityUpdates}
              onCheckedChange={(checked) => handleSecurityChange('securityUpdates', checked)}
            />
          </div>
        </ListCard>
      </motion.section>

      {/* Password */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="03"
          title="Password"
          action={!isChangingPassword ? 'Change Password' : undefined}
          onAction={() => setIsChangingPassword(true)}
        />
        {!isChangingPassword ? (
          <ListCard>
            <ListRow
              title="Last changed"
              subtitle="3 months ago"
              trailing={
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-400">
                  Review
                </span>
              }
              accent="yellow"
            />
          </ListCard>
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                  }
                  className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 pr-14 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-3 text-[12px] font-medium text-white/65 hover:text-white touch-manipulation"
                >
                  {showCurrentPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 pr-14 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-3 text-[12px] font-medium text-white/65 hover:text-white touch-manipulation"
                >
                  {showNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">
                Confirm New Password
              </Label>
              <Input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                className="h-11 text-[15px] bg-[#0a0a0a] border-white/[0.08] rounded-xl px-4 focus:border-elec-yellow/50 focus:ring-0 touch-manipulation text-white"
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
                disabled={isLoading}
                className="h-11 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium touch-manipulation"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword}
                className="h-11 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-50"
              >
                {isLoading ? 'Updating…' : 'Update Password'}
              </Button>
            </div>
          </div>
        )}
      </motion.section>

      {/* Devices */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="04"
          title={`Active Devices (${devices.length})`}
          action="Sign Out All"
          onAction={handleSignOutAllDevices}
        />
        <ListCard>
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center gap-4 px-5 sm:px-6 py-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-white truncate">
                    {device.name}
                  </span>
                  {device.current && (
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                      This device
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[11.5px] text-white/65 truncate">
                  {device.location} · {device.kind === 'desktop' ? 'Desktop' : 'Mobile'}
                </div>
              </div>
              <span
                className={`text-[11.5px] tabular-nums whitespace-nowrap ${
                  device.current ? 'text-emerald-400' : 'text-white/65'
                }`}
              >
                {device.lastActive}
              </span>
              {!device.current && (
                <TextAction onClick={() => handleSignOutDevice(device.id)}>
                  <span className="text-red-400">Sign out</span>
                </TextAction>
              )}
            </div>
          ))}
        </ListCard>
      </motion.section>
    </motion.div>
  );
};

export default SecurityTab;
