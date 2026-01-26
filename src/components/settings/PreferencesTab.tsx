import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import SettingsSection from './SettingsSection';
import SettingsRow from './SettingsRow';
import { motion } from 'framer-motion';
import {
  Bell,
  BellRing,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX,
  FileCheck,
  Smartphone,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Settings2,
  Mic,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// Certificate types for default selection
const CERTIFICATE_TYPES = [
  { value: 'eicr', label: 'EICR (Electrical Installation Condition Report)' },
  { value: 'eic', label: 'EIC (Electrical Installation Certificate)' },
  { value: 'minor_works', label: 'Minor Works Certificate' },
  { value: 'domestic_eic', label: 'Domestic EIC' },
];

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
    unsubscribe: unsubscribeFromPush
  } = usePushNotifications();

  // Notification settings
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [mentorMessages, setMentorMessages] = useState(true);
  const [courseCompletions, setCourseCompletions] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [allMuted, setAllMuted] = useState(false);

  // Certificate preferences
  const [defaultCertType, setDefaultCertType] = useState('eicr');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // AI preferences
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);

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
          data: {}
        }
      });
      if (error) {
        addNotification({
          title: 'Test Failed',
          message: error.message || 'Failed to send test notification',
          type: 'error'
        });
      } else {
        // Debug: log full response
        console.log('[Push Test] Response:', data);

        // Determine the appropriate message based on what happened
        let title = 'Test Sent';
        let message = '';
        let notificationType: 'success' | 'error' | 'info' = 'success';

        if (data?.sent > 0) {
          title = 'Test Sent';
          message = `Notification sent to ${data.sent} device(s)!`;
          notificationType = 'success';
        } else if (data?.foundSubscriptions === false) {
          title = 'No Subscriptions';
          message = `No active push subscriptions found. Try toggling push notifications off and on again.`;
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
    } catch (err) {
      addNotification({
        title: 'Test Failed',
        message: 'An error occurred whilst sending the test notification',
        type: 'error'
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
            type: 'info'
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
            type: 'success'
          });
        }
        // Note: subscribeToPush shows its own error toasts, so no need to show another on failure
      }
    } catch (err) {
      console.error('[Push Toggle] Error:', err);
      addNotification({
        title: 'Error',
        message: 'Failed to update push notification settings',
        type: 'error'
      });
    }
  };

  const handleMuteAll = () => {
    const newMuted = !allMuted;
    setAllMuted(newMuted);
    if (newMuted) {
      setEmailUpdates(false);
      setMentorMessages(false);
      setCourseCompletions(false);
      setExpiryAlerts(false);
      setBillingAlerts(false);
    } else {
      setEmailUpdates(true);
      setMentorMessages(true);
      setCourseCompletions(true);
      setExpiryAlerts(true);
      setBillingAlerts(true);
    }
    addNotification({
      title: newMuted ? 'Notifications Muted' : 'Notifications Enabled',
      message: newMuted ? 'All notifications have been muted' : 'All notifications have been enabled',
      type: 'info'
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Notifications Section */}
      <motion.div variants={itemVariants}>
        <SettingsSection
          title="Notifications"
          icon={Bell}
          iconBg="bg-amber-500/10"
          iconColour="text-amber-400"
          description="Control how you receive updates"
        >
          {/* Push Notifications - Primary */}
          {isPushSupported && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-purple-500/10 border border-elec-yellow/20">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPushSubscribed
                      ? 'bg-green-500/20 ring-2 ring-green-500/30'
                      : 'bg-elec-yellow/20'
                  }`}>
                    {isPushLoading ? (
                      <Loader2 className="h-6 w-6 text-elec-yellow animate-spin" />
                    ) : isPushSubscribed ? (
                      <BellRing className="h-6 w-6 text-green-400" />
                    ) : (
                      <Smartphone className="h-6 w-6 text-elec-yellow" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      {isPushSubscribed
                        ? "Receive notifications when the app is closed"
                        : "Get notified about messages and updates"
                      }
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPushSubscribed}
                  onCheckedChange={handlePushToggle}
                  disabled={isPushLoading}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
              {isPushSubscribed && (
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestNotification}
                    disabled={isTestingSend}
                    className="h-10 touch-manipulation active:scale-[0.98] border-white/20 hover:bg-white/5"
                  >
                    {isTestingSend ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Test
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Mute All */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className={`h-10 touch-manipulation active:scale-[0.98] border-white/20 ${allMuted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'hover:bg-white/5'}`}
              onClick={handleMuteAll}
            >
              {allMuted ? (
                <>
                  <VolumeX className="h-4 w-4 mr-2" />
                  Unmute All
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Mute All
                </>
              )}
            </Button>
          </div>

          <SettingsRow
            icon={Mail}
            iconBg="bg-blue-500/10"
            iconColour="text-blue-400"
            title="Email Updates"
            description="Receive important updates via email"
          >
            <Switch
              checked={emailUpdates}
              onCheckedChange={setEmailUpdates}
              disabled={allMuted}
            />
          </SettingsRow>

          <SettingsRow
            icon={MessageSquare}
            iconBg="bg-green-500/10"
            iconColour="text-green-400"
            title="Messages"
            description="Notifications for new messages"
          >
            <Switch
              checked={mentorMessages}
              onCheckedChange={setMentorMessages}
              disabled={allMuted}
            />
          </SettingsRow>

          <SettingsRow
            icon={GraduationCap}
            iconBg="bg-purple-500/10"
            iconColour="text-purple-400"
            title="Course Completions"
            description="Celebrate when you complete courses"
          >
            <Switch
              checked={courseCompletions}
              onCheckedChange={setCourseCompletions}
              disabled={allMuted}
            />
          </SettingsRow>

          <SettingsRow
            icon={AlertTriangle}
            iconBg="bg-amber-500/10"
            iconColour="text-amber-400"
            title="Expiry Alerts"
            description="Warnings when certifications expire"
          >
            <Switch
              checked={expiryAlerts}
              onCheckedChange={setExpiryAlerts}
              disabled={allMuted}
            />
          </SettingsRow>

          <SettingsRow
            icon={Bell}
            iconBg="bg-emerald-500/10"
            iconColour="text-emerald-400"
            title="Billing Alerts"
            description="Payment and subscription updates"
          >
            <Switch
              checked={billingAlerts}
              onCheckedChange={setBillingAlerts}
              disabled={allMuted}
            />
          </SettingsRow>
        </SettingsSection>
      </motion.div>

      {/* Certificate Preferences */}
      <motion.div variants={itemVariants}>
        <SettingsSection
          title="Certificates"
          icon={FileCheck}
          iconBg="bg-green-500/10"
          iconColour="text-green-400"
          description="Default settings for electrical certificates"
        >
          <SettingsRow
            icon={FileCheck}
            iconBg="bg-blue-500/10"
            iconColour="text-blue-400"
            title="Default Certificate Type"
            description="Pre-selected when creating new certificates"
          >
            <Select value={defaultCertType} onValueChange={setDefaultCertType}>
              <SelectTrigger className="w-full sm:w-56">
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
          </SettingsRow>

          <SettingsRow
            icon={CheckCircle}
            iconBg="bg-purple-500/10"
            iconColour="text-purple-400"
            title="Auto-Save"
            description="Automatically save certificate drafts"
          >
            <Switch
              checked={autoSaveEnabled}
              onCheckedChange={setAutoSaveEnabled}
            />
          </SettingsRow>
        </SettingsSection>
      </motion.div>

      {/* AI Assistant */}
      <motion.div variants={itemVariants}>
        <SettingsSection
          title="AI Assistant"
          icon={Mic}
          iconBg="bg-pink-500/10"
          iconColour="text-pink-400"
          description="Voice and AI features"
        >
          <SettingsRow
            icon={Settings2}
            iconBg="bg-cyan-500/10"
            iconColour="text-cyan-400"
            title="AI Suggestions"
            description="Get smart suggestions whilst working"
          >
            <Switch
              checked={aiSuggestionsEnabled}
              onCheckedChange={setAiSuggestionsEnabled}
            />
          </SettingsRow>
        </SettingsSection>
      </motion.div>
    </motion.div>
  );
};

export default PreferencesTab;
