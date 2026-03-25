import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  usePushNotifications,
  useNotificationPreferences,
  useQuietHours,
  type NotificationCategory,
} from '@/hooks/usePushNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Certificate types for default selection
const CERTIFICATE_TYPES = [
  { value: 'eicr', label: 'EICR' },
  { value: 'eic', label: 'EIC' },
  { value: 'minor_works', label: 'Minor Works' },
  { value: 'domestic_eic', label: 'Domestic EIC' },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

/* ─── Inline sub-components ─── */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold text-white uppercase tracking-[0.08em] mb-1 mt-6 px-4">
    {children}
  </p>
);

const Divider = () => <div className="border-t border-white/[0.06] ml-16" />;

interface ToggleRowProps {
  icon: string;
  iconBg: string;
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
  switchClassName?: string;
}

const ToggleRow = ({
  icon,
  iconBg,
  label,
  checked,
  onCheckedChange,
  disabled,
  switchClassName,
}: ToggleRowProps) => (
  <div className="flex items-center min-h-[48px] px-4 touch-manipulation">
    <div
      className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 text-base`}
    >
      {icon}
    </div>
    <span className="text-[15px] font-medium text-white ml-3 flex-1">{label}</span>
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={switchClassName}
    />
  </div>
);

const PreferencesTab = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [isTestingSend, setIsTestingSend] = useState(false);

  // Push notifications
  const {
    isSupported: isPushSupported,
    isSubscribed: isPushSubscribed,
    isLoading: isPushLoading,
    subscribe: subscribeToPush,
    unsubscribe: unsubscribeFromPush,
  } = usePushNotifications();

  // Notification category preferences (Supabase-backed)
  const {
    preferences: notifPrefs,
    updatePreference,
    isLoading: isPrefsLoading,
  } = useNotificationPreferences();
  const { quietHours, updateQuietHours } = useQuietHours();
  const [allMuted, setAllMuted] = useState(false);

  // Certificate preferences
  const [defaultCertType, setDefaultCertType] = useState('eicr');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // AI preferences
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);

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
      // Need to verify password before storing credentials
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
      // Verify the password by signing in (session already exists, this just validates)
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: biometricPassword,
      });

      if (error) {
        setBiometricError('Incorrect password. Please try again.');
        setBiometricVerifying(false);
        return;
      }

      // Password valid — store credentials and enable biometric
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

  // Derived
  const categoryKeys = Object.keys(notifPrefs) as NotificationCategory[];
  const activeCount = categoryKeys.filter((k) => notifPrefs[k]).length;
  const totalCount = categoryKeys.length;

  // Send test notification
  const handleTestNotification = async () => {
    if (!user?.id) return;
    setIsTestingSend(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          userId: user.id,
          title: 'Test Notification',
          body: 'Push notifications are working correctly!',
          type: 'job',
          data: {},
        },
      });
      if (error) {
        addNotification({
          title: 'Test Failed',
          message: error.message || 'Failed to send test notification',
          type: 'error',
        });
      } else {
        console.log('[Push Test] Response:', data);
        let title = 'Test Sent';
        let message = '';
        let notificationType: 'success' | 'error' | 'info' = 'success';

        if (data?.sent > 0) {
          title = 'Test Sent';
          message = `Notification sent to ${data.sent} device(s)!`;
          notificationType = 'success';
        } else if (data?.foundSubscriptions === false) {
          title = 'No Subscriptions';
          message =
            'No active push subscriptions found. Try toggling push notifications off and on again.';
          notificationType = 'info';
        } else if (data?.errors?.length > 0) {
          title = 'Send Failed';
          const firstError = data.errors[0];
          message = `Found ${data.total} subscription(s) but sending failed: ${firstError.error || 'Unknown error'}`;
          notificationType = 'error';
        } else {
          title = 'Unknown Issue';
          message = `Response: ${JSON.stringify(data)}`;
          notificationType = 'info';
        }
        addNotification({ title, message, type: notificationType });
      }
    } catch {
      addNotification({
        title: 'Test Failed',
        message: 'An error occurred whilst sending the test notification',
        type: 'error',
      });
    } finally {
      setIsTestingSend(false);
    }
  };

  const handlePushToggle = async () => {
    console.log('[Push Toggle] Starting...', { isPushSubscribed, isPushSupported, isPushLoading });
    try {
      if (isPushSubscribed) {
        const success = await unsubscribeFromPush();
        if (success) {
          addNotification({
            title: 'Push Notifications Disabled',
            message: "You won't receive notifications when the app is closed",
            type: 'info',
          });
        }
      } else {
        console.log('[Push Toggle] Calling subscribeToPush...');
        const success = await subscribeToPush();
        console.log('[Push Toggle] subscribeToPush returned:', success);
        if (success) {
          addNotification({
            title: 'Push Notifications Enabled',
            message: "You'll now receive notifications even when the app is closed",
            type: 'success',
          });
        }
      }
    } catch (err) {
      console.error('[Push Toggle] Error:', err);
      addNotification({
        title: 'Error',
        message: 'Failed to update push notification settings',
        type: 'error',
      });
    }
  };

  const handleMuteAll = () => {
    const newMuted = !allMuted;
    setAllMuted(newMuted);
    for (const key of categoryKeys) {
      updatePreference(key, !newMuted);
    }
    addNotification({
      title: newMuted ? 'Notifications Muted' : 'Notifications Enabled',
      message: newMuted
        ? 'All notifications have been muted'
        : 'All notifications have been enabled',
      type: 'info',
    });
  };

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="pb-8">
      {/* ─── Notification summary row ─── */}
      <motion.div variants={itemVariants} className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              allMuted ? 'bg-red-400' : activeCount === totalCount ? 'bg-green-400' : 'bg-amber-400'
            }`}
          />
          <span className="text-[14px] font-medium text-white">
            {allMuted ? 'All muted' : `${activeCount} of ${totalCount} active`}
          </span>
        </div>
        <button
          onClick={handleMuteAll}
          className={`text-[13px] font-medium px-3 py-1 rounded-full border touch-manipulation transition-colors ${
            allMuted ? 'border-red-400/40 text-red-400' : 'border-white/20 text-white'
          }`}
        >
          {allMuted ? 'Unmute All' : 'Mute All'}
        </button>
      </motion.div>

      {/* ─── Push Notifications hero row ─── */}
      {isPushSupported && (
        <motion.div variants={itemVariants}>
          <div className="flex items-center min-h-[56px] px-4 touch-manipulation">
            <div className="relative w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">{isPushSubscribed ? '🔔' : '📱'}</span>
              {isPushSubscribed && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              )}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <span className="text-[15px] font-medium text-white block">Push Notifications</span>
              {isPushSubscribed && (
                <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                  Active
                </span>
              )}
            </div>
            {isPushLoading ? (
              <Loader2 className="h-5 w-5 text-white animate-spin" />
            ) : (
              <Switch
                checked={isPushSubscribed}
                onCheckedChange={handlePushToggle}
                disabled={isPushLoading}
                className="data-[state=checked]:bg-green-500"
              />
            )}
          </div>
          {isPushSubscribed && (
            <div className="pl-[68px] pb-2">
              <button
                onClick={handleTestNotification}
                disabled={isTestingSend}
                className="text-[13px] text-white underline underline-offset-2 touch-manipulation disabled:opacity-50"
              >
                {isTestingSend ? 'Sending...' : 'Send Test Notification'}
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── NOTIFICATION CATEGORIES ─── */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Notification Categories</SectionLabel>
        <div className={allMuted || isPrefsLoading ? 'opacity-40' : undefined}>
          <ToggleRow
            icon="🌅"
            iconBg="bg-blue-500/15"
            label="Daily Briefing"
            checked={notifPrefs.daily_briefing}
            onCheckedChange={(v) => updatePreference('daily_briefing', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="📋"
            iconBg="bg-amber-500/15"
            label="Tasks & Projects"
            checked={notifPrefs.tasks_projects}
            onCheckedChange={(v) => updatePreference('tasks_projects', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="💷"
            iconBg="bg-emerald-500/15"
            label="Invoices & Quotes"
            checked={notifPrefs.invoices_quotes}
            onCheckedChange={(v) => updatePreference('invoices_quotes', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="📜"
            iconBg="bg-green-500/15"
            label="Certificates & Compliance"
            checked={notifPrefs.certificates_compliance}
            onCheckedChange={(v) => updatePreference('certificates_compliance', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="📚"
            iconBg="bg-purple-500/15"
            label="Study Centre"
            checked={notifPrefs.study_centre}
            onCheckedChange={(v) => updatePreference('study_centre', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="💙"
            iconBg="bg-pink-500/15"
            label="Mental Health"
            checked={notifPrefs.mental_health}
            onCheckedChange={(v) => updatePreference('mental_health', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="🎓"
            iconBg="bg-amber-500/15"
            label="Apprentice"
            checked={notifPrefs.apprentice}
            onCheckedChange={(v) => updatePreference('apprentice', v)}
            disabled={allMuted || isPrefsLoading}
          />
          <Divider />
          <ToggleRow
            icon="💬"
            iconBg="bg-blue-500/15"
            label="Messages"
            checked={notifPrefs.messages}
            onCheckedChange={(v) => updatePreference('messages', v)}
            disabled={allMuted || isPrefsLoading}
          />
        </div>
      </motion.div>

      {/* ─── QUIET HOURS ─── */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Quiet Hours</SectionLabel>
        <ToggleRow
          icon="🌙"
          iconBg="bg-indigo-500/15"
          label="Quiet Hours"
          checked={quietHours.enabled}
          onCheckedChange={(v) => updateQuietHours({ enabled: v })}
        />
        {quietHours.enabled && (
          <>
            <Divider />
            <div className="flex items-center min-h-[48px] px-4 touch-manipulation">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0 text-base">
                🕘
              </div>
              <span className="text-[15px] font-medium text-white ml-3 flex-1">Start</span>
              <Select
                value={String(quietHours.startHour)}
                onValueChange={(v) => updateQuietHours({ startHour: parseInt(v) })}
              >
                <SelectTrigger className="w-auto min-w-[80px] h-9 border-0 bg-white/[0.06] text-white text-[14px] focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[20, 21, 22, 23].map((h) => (
                    <SelectItem key={h} value={String(h)}>
                      {`${h}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Divider />
            <div className="flex items-center min-h-[48px] px-4 touch-manipulation">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0 text-base">
                🕖
              </div>
              <span className="text-[15px] font-medium text-white ml-3 flex-1">End</span>
              <Select
                value={String(quietHours.endHour)}
                onValueChange={(v) => updateQuietHours({ endHour: parseInt(v) })}
              >
                <SelectTrigger className="w-auto min-w-[80px] h-9 border-0 bg-white/[0.06] text-white text-[14px] focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[6, 7, 8, 9].map((h) => (
                    <SelectItem key={h} value={String(h)}>
                      {`${h}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="px-4 pb-2">
              <p className="text-[12px] text-white/50 ml-11">
                Notifications will be held and delivered with your morning briefing
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* ─── CERTIFICATES ─── */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Certificates</SectionLabel>
        <div className="flex items-center min-h-[48px] px-4 touch-manipulation">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 text-base">
            📄
          </div>
          <span className="text-[15px] font-medium text-white ml-3 flex-1">Default Type</span>
          <Select value={defaultCertType} onValueChange={setDefaultCertType}>
            <SelectTrigger className="w-auto min-w-[100px] h-9 border-0 bg-white/[0.06] text-white text-[14px] focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CERTIFICATE_TYPES.map((cert) => (
                <SelectItem key={cert.value} value={cert.value}>
                  {cert.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Divider />
        <ToggleRow
          icon="💾"
          iconBg="bg-purple-500/15"
          label="Auto-Save Drafts"
          checked={autoSaveEnabled}
          onCheckedChange={setAutoSaveEnabled}
        />
      </motion.div>

      {/* ─── ASSISTANT ─── */}
      <motion.div variants={itemVariants}>
        <SectionLabel>Assistant</SectionLabel>
        <ToggleRow
          icon="✨"
          iconBg="bg-pink-500/15"
          label="Smart Suggestions"
          checked={aiSuggestionsEnabled}
          onCheckedChange={setAiSuggestionsEnabled}
        />
      </motion.div>

      {/* ─── SECURITY (native only, biometric available) ─── */}
      {biometric.isAvailable && (
        <motion.div variants={itemVariants}>
          <SectionLabel>Security</SectionLabel>
          <ToggleRow
            icon="🔒"
            iconBg="bg-blue-500/15"
            label={`${biometric.biometricType} Login`}
            checked={biometric.isEnabled}
            onCheckedChange={handleBiometricToggle}
            disabled={biometric.isChecking}
          />
        </motion.div>
      )}

      {/* Password verification sheet for enabling biometric */}
      <Sheet open={showPasswordSheet} onOpenChange={(v) => !v && setShowPasswordSheet(false)}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0 border-t border-white/10">
          <div className="flex flex-col px-6 pt-8 pb-10 gap-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white">Confirm your password</h2>
              <p className="text-[15px] text-white leading-relaxed">
                Enter your password to enable {biometric.biometricType} login.
              </p>
            </div>

            {biometricError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-[14px] text-red-400 text-center">{biometricError}</p>
              </div>
            )}

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showBioPassword ? 'text' : 'password'}
                value={biometricPassword}
                onChange={(e) => setBiometricPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                onKeyDown={(e) => e.key === 'Enter' && handleBiometricPasswordSubmit()}
                className={cn(
                  'w-full h-14 pl-12 pr-12 rounded-2xl',
                  'bg-input border-2 text-white placeholder:text-muted-foreground [color-scheme:dark]',
                  'text-[16px] outline-none transition-all duration-200',
                  'border-white/20 focus:border-elec-yellow/50 focus:shadow-[0_0_0_4px_rgba(255,209,0,0.1)]'
                )}
              />
              <button
                type="button"
                onClick={() => setShowBioPassword(!showBioPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white h-11 w-11 flex items-center justify-center touch-manipulation rounded-xl"
              >
                {showBioPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button
              onClick={handleBiometricPasswordSubmit}
              disabled={biometricVerifying || !biometricPassword}
              className="w-full h-13 rounded-2xl text-[16px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation disabled:opacity-50"
            >
              {biometricVerifying ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </span>
              ) : (
                `Enable ${biometric.biometricType}`
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default PreferencesTab;
