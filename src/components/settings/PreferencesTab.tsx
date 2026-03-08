import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  usePushNotifications,
  useNotificationPreferences,
  type NotificationCategory,
} from '@/hooks/usePushNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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
  const [allMuted, setAllMuted] = useState(false);

  // Certificate preferences
  const [defaultCertType, setDefaultCertType] = useState('eicr');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // AI preferences
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);

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
    </motion.div>
  );
};

export default PreferencesTab;
