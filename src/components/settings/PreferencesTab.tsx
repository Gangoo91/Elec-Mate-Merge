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
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  ListCard,
  SectionHeader,
  TextAction,
  Dot,
  Eyebrow,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';

const CERTIFICATE_TYPES = [
  { value: 'eicr', label: 'EICR' },
  { value: 'eic', label: 'EIC' },
  { value: 'minor_works', label: 'Minor Works' },
  { value: 'domestic_eic', label: 'Domestic EIC' },
];

/* ── Row primitive — toggle inside a ListCard ── */
interface ToggleRowProps {
  label: string;
  subtitle?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
  trailing?: React.ReactNode;
}
const ToggleRow = ({
  label,
  subtitle,
  checked,
  onCheckedChange,
  disabled,
  trailing,
}: ToggleRowProps) => (
  <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-medium text-white truncate">{label}</div>
      {subtitle && <div className="mt-0.5 text-[11.5px] text-white/65 truncate">{subtitle}</div>}
    </div>
    {trailing && <div className="shrink-0">{trailing}</div>}
    <Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
  </div>
);

/* ── Row primitive — select inside a ListCard ── */
interface SelectRowProps {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}
const SelectRow = ({ label, value, onValueChange, options, placeholder }: SelectRowProps) => (
  <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-medium text-white truncate">{label}</div>
    </div>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-auto min-w-[110px] h-10 bg-white/[0.04] border-white/[0.08] rounded-full px-4 text-[13px] text-white touch-manipulation">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const PreferencesTab = () => {
  const { user, profile } = useAuth();
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

  // Notification category preferences
  const {
    preferences: notifPrefs,
    updatePreference,
    isLoading: isPrefsLoading,
  } = useNotificationPreferences();
  const { quietHours, updateQuietHours } = useQuietHours();
  const [allMuted, setAllMuted] = useState(false);

  // Dashboard hubs
  const { isHubVisible, toggleHub } = useDashboardPreferences();
  const userRole = profile?.role || '';

  const dashboardHubs = [
    { id: 'apprentice', label: 'Apprentice Hub', locked: false },
    { id: 'electrician', label: 'Electrical Hub', locked: true },
    { id: 'study-centre', label: 'Study Centre', locked: false },
    ...(userRole === 'admin' || userRole === 'college'
      ? [{ id: 'college', label: 'College Hub', locked: false }]
      : []),
    { id: 'wellbeing', label: 'Wellbeing Hub', locked: false },
  ];

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

  const categoryKeys = Object.keys(notifPrefs) as NotificationCategory[];
  const activeCount = categoryKeys.filter((k) => notifPrefs[k]).length;
  const totalCount = categoryKeys.length;

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
        let title = 'Test Sent';
        let message = '';
        let notificationType: 'success' | 'error' | 'info' = 'success';

        if (data?.sent > 0) {
          title = 'Test Sent';
          message = `Notification sent to ${data.sent} device(s).`;
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
        const success = await subscribeToPush();
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

  const notificationCategories: { key: NotificationCategory; label: string }[] = [
    { key: 'daily_briefing', label: 'Daily Briefing' },
    { key: 'tasks_projects', label: 'Tasks and Projects' },
    { key: 'invoices_quotes', label: 'Invoices and Quotes' },
    { key: 'certificates_compliance', label: 'Certificates and Compliance' },
    { key: 'study_centre', label: 'Study Centre' },
    { key: 'mental_health', label: 'Mental Health' },
    { key: 'apprentice', label: 'Apprentice' },
    { key: 'messages', label: 'Messages' },
  ];

  const muteToneClass = allMuted
    ? 'red'
    : activeCount === totalCount
      ? 'green'
      : 'amber';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ── DASHBOARD HUBS ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="01"
          title="Dashboard"
        />
        <div className="text-[12.5px] text-white leading-relaxed">
          Show or hide hubs on your home screen.
        </div>
        <ListCard>
          {dashboardHubs.map((hub) => (
            <ToggleRow
              key={hub.id}
              label={hub.label}
              subtitle={hub.locked ? 'Always visible' : undefined}
              checked={hub.locked || isHubVisible(hub.id)}
              onCheckedChange={(v) => {
                toggleHub({ hubId: hub.id, visible: v });
                toast(
                  v
                    ? `${hub.label} added to dashboard`
                    : `${hub.label} hidden from dashboard`
                );
              }}
              disabled={hub.locked}
            />
          ))}
        </ListCard>
      </motion.section>

      {/* ── NOTIFICATIONS ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="02" title="Notifications" />

        {/* Summary row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dot tone={muteToneClass as 'red' | 'green' | 'amber'} />
            <span className="text-[13px] font-medium text-white">
              {allMuted ? 'All muted' : `${activeCount} of ${totalCount} active`}
            </span>
          </div>
          <TextAction onClick={handleMuteAll}>
            {allMuted ? 'Unmute all' : 'Mute all'}
          </TextAction>
        </div>

        {/* Push notifications hero */}
        {isPushSupported && (
          <ListCard>
            <ToggleRow
              label="Push Notifications"
              subtitle={
                isPushSubscribed
                  ? 'Active — delivered when the app is closed'
                  : 'Off — enable to receive alerts'
              }
              checked={isPushSubscribed}
              onCheckedChange={handlePushToggle}
              disabled={isPushLoading}
              trailing={
                isPushSubscribed ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                    Active
                  </span>
                ) : null
              }
            />
            {isPushSubscribed && (
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3">
                <span className="text-[12.5px] text-white/65">Delivery test</span>
                <TextAction onClick={handleTestNotification}>
                  {isTestingSend ? 'Sending…' : 'Send Test Notification'}
                </TextAction>
              </div>
            )}
          </ListCard>
        )}

        {/* Categories */}
        <div className="space-y-3">
          <Eyebrow>Categories</Eyebrow>
          <ListCard className={cn(allMuted || isPrefsLoading ? 'opacity-40' : '')}>
            {notificationCategories.map((cat) => (
              <ToggleRow
                key={cat.key}
                label={cat.label}
                checked={notifPrefs[cat.key]}
                onCheckedChange={(v) => updatePreference(cat.key, v)}
                disabled={allMuted || isPrefsLoading}
              />
            ))}
          </ListCard>
        </div>
      </motion.section>

      {/* ── QUIET HOURS ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="03" title="Quiet Hours" />
        <ListCard>
          <ToggleRow
            label="Quiet Hours"
            subtitle="Pause alerts overnight"
            checked={quietHours.enabled}
            onCheckedChange={(v) => updateQuietHours({ enabled: v })}
          />
          {quietHours.enabled && (
            <>
              <SelectRow
                label="Start"
                value={String(quietHours.startHour)}
                onValueChange={(v) => updateQuietHours({ startHour: parseInt(v) })}
                options={[20, 21, 22, 23].map((h) => ({ value: String(h), label: `${h}:00` }))}
              />
              <SelectRow
                label="End"
                value={String(quietHours.endHour)}
                onValueChange={(v) => updateQuietHours({ endHour: parseInt(v) })}
                options={[6, 7, 8, 9].map((h) => ({ value: String(h), label: `${h}:00` }))}
              />
              <div className="px-5 sm:px-6 pb-4 text-[11.5px] text-white/65 leading-relaxed">
                Notifications will be held and delivered with your morning briefing.
              </div>
            </>
          )}
        </ListCard>
      </motion.section>

      {/* ── CERTIFICATES ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="04" title="Certificates" />
        <ListCard>
          <SelectRow
            label="Default Type"
            value={defaultCertType}
            onValueChange={setDefaultCertType}
            options={CERTIFICATE_TYPES}
          />
          <ToggleRow
            label="Auto-Save Drafts"
            checked={autoSaveEnabled}
            onCheckedChange={setAutoSaveEnabled}
          />
        </ListCard>
      </motion.section>

      {/* ── ASSISTANT ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="05" title="Assistant" />
        <ListCard>
          <ToggleRow
            label="Smart Suggestions"
            subtitle="AI-powered inline tips"
            checked={aiSuggestionsEnabled}
            onCheckedChange={setAiSuggestionsEnabled}
          />
        </ListCard>
      </motion.section>

      {/* ── SECURITY (biometric) ── */}
      {biometric.isAvailable && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader eyebrow="06" title="Security" />
          <ListCard>
            <ToggleRow
              label={`${biometric.biometricType} Login`}
              subtitle="Unlock with biometrics"
              checked={biometric.isEnabled}
              onCheckedChange={handleBiometricToggle}
              disabled={biometric.isChecking}
            />
          </ListCard>
        </motion.section>
      )}

      {/* ── BIOMETRIC PASSWORD CONFIRM SHEET ── */}
      <Sheet open={showPasswordSheet} onOpenChange={(v) => !v && setShowPasswordSheet(false)}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_12%)]"
        >
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
                  'bg-[#0a0a0a] border text-white placeholder:text-white [color-scheme:dark]',
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
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default PreferencesTab;
