import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Smartphone,
  Monitor,
  AlertTriangle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Mail,
  LogOut,
  Loader2,
  CheckCircle2,
  Clock,
} from "lucide-react";

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

  const devices = [
    {
      id: '1',
      name: 'Windows PC',
      icon: Monitor,
      location: 'London, UK',
      lastActive: 'Active now',
      current: true,
    },
    {
      id: '2',
      name: 'iPhone 14',
      icon: Smartphone,
      location: 'London, UK',
      lastActive: '2 hours ago',
      current: false,
    },
  ];

  const handleSecurityChange = (key: keyof typeof securitySettings, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    addNotification({
      title: 'Security Setting Updated',
      message: `${key === 'twoFactorAuth' ? 'Two-factor authentication' : key === 'loginNotifications' ? 'Login notifications' : 'Security updates'} ${value ? 'enabled' : 'disabled'}`,
      type: 'success'
    });
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addNotification({
        title: 'Password Mismatch',
        message: 'New passwords do not match',
        type: 'info'
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      addNotification({
        title: 'Password Too Short',
        message: 'Password must be at least 8 characters',
        type: 'info'
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addNotification({
      title: 'Password Updated',
      message: 'Your password has been changed successfully',
      type: 'success'
    });
  };

  const handleSignOutDevice = (deviceId: string) => {
    addNotification({
      title: 'Device Signed Out',
      message: 'The device has been signed out of your account',
      type: 'info'
    });
  };

  const handleSignOutAllDevices = () => {
    addNotification({
      title: 'All Devices Signed Out',
      message: 'All other devices have been signed out',
      type: 'info'
    });
  };

  const securityScore = securitySettings.twoFactorAuth ? 100 : securitySettings.loginNotifications ? 70 : 40;

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              securityScore >= 80 ? 'bg-green-500/10' : securityScore >= 50 ? 'bg-amber-500/10' : 'bg-red-500/10'
            }`}>
              {securityScore >= 80 ? (
                <ShieldCheck className="h-7 w-7 text-green-400" />
              ) : securityScore >= 50 ? (
                <Shield className="h-7 w-7 text-amber-400" />
              ) : (
                <ShieldAlert className="h-7 w-7 text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Security Score</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {securityScore >= 80 ? 'Your account is well protected' :
                 securityScore >= 50 ? 'Your account security could be improved' :
                 'Your account needs better protection'}
              </p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    securityScore >= 80 ? 'bg-green-400' : securityScore >= 50 ? 'bg-amber-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${securityScore}%` }}
                />
              </div>
            </div>
            <span className={`text-2xl font-bold ${
              securityScore >= 80 ? 'text-green-400' : securityScore >= 50 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {securityScore}%
            </span>
          </div>
        </div>

        {/* 2FA Alert */}
        {!securitySettings.twoFactorAuth && (
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Enable Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-foreground flex-shrink-0">
                Enable
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Security Settings */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Security Settings</h3>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          {/* 2FA */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                securitySettings.twoFactorAuth ? 'bg-green-500/10' : 'bg-white/10'
              }`}>
                {securitySettings.twoFactorAuth ? (
                  <Lock className="h-5 w-5 text-green-400" />
                ) : (
                  <Unlock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Secure your account with a verification code</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
            />
          </div>

          {/* Login Notifications */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Login Notifications</p>
                <p className="text-xs text-muted-foreground">Get notified of new login attempts</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.loginNotifications}
              onCheckedChange={(checked) => handleSecurityChange('loginNotifications', checked)}
            />
          </div>

          {/* Security Updates */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Security Updates</p>
                <p className="text-xs text-muted-foreground">Receive emails about security enhancements</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.securityUpdates}
              onCheckedChange={(checked) => handleSecurityChange('securityUpdates', checked)}
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">Password</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Last changed 3 months ago
            </p>
          </div>
          {!isChangingPassword && (
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 hover:bg-white/5"
              onClick={() => setIsChangingPassword(true)}
            >
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <div className="p-4 md:p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              <Label className="text-foreground">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="bg-white/5 border-white/10 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="bg-white/5 border-white/10 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Confirm New Password</Label>
              <Input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-white/5 border-white/10"
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                className="border-white/20"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Device Management */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">Active Devices</h3>
            <p className="text-xs text-muted-foreground">{devices.length} devices currently signed in</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            onClick={handleSignOutAllDevices}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out All
          </Button>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{device.name}</p>
                      {device.current && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">
                          This device
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{device.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs ${device.current ? 'text-green-400' : 'text-muted-foreground'}`}>
                    {device.lastActive}
                  </span>
                  {!device.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => handleSignOutDevice(device.id)}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
